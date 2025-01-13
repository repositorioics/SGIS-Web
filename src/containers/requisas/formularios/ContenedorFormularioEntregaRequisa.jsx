import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PaginaFormularioEntregaRequisa from "@/pages/requisas/formularios/PaginaFormularioEntregaRequisa";
import { URL } from "@/constants/url";
import useFetch from "@/hooks/useFetch";
import { obtenerToken } from "@/utils/almacenamiento";
import { useTranslation } from "react-i18next";
import Cargador from "@/components/Cargador";
import MensajeError from "@/components/MensajeError";
import CustomTextField from "@/components/comun/CustomTextField";
/**
 * Contenedor para gestionar la lógica del formulario de entrega de requisas.
 */
const ContenedorFormularioEntregaRequisa = () => {
  const { id } = useParams(); // ID de la requisa
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [entrega, setEntrega] = useState({
    requisaId: "",
    codigoUnico: "",
    nombreSitio: "",
    nombreEstado: "",
    observacionesEntrega: "",
  });

  const [detalles, setDetalles] = useState([]);

  // Configuración de las columnas de la tabla de detalles
  const columns = [
    { field: "nombreInsumo", header: t("formularioEntrega.insumo"), flex: 2 },
    { field: "nombrePresentacion", header: t("formularioEntrega.presentacion"), flex: 2 },
    { field: "nombreMarca", header: t("formularioEntrega.marca"), flex: 2 },
    {
      field: "cantidadEntregada",
      header: t("formularioEntrega.cantidadEntregada"),
      flex: 1,
      editable: true,
      renderCell: (params) => (
        <CustomTextField
          type="number"
          value={params.row.cantidadEntregada}
          onChange={(e) =>
            handleUpdateDetalle(params.id, "cantidadEntregada", Math.max(0, Number(e.target.value) || 0))
          }
          fullWidth
        />
      ),
    },
    {
      field: "observacion",
      header: t("formularioEntrega.observaciones"),
      flex: 2,
      editable: true,
      renderCell: (params) => (
        <CustomTextField
          value={params.row.observacion || ""}
          onChange={(e) =>
            handleUpdateDetalle(params.id, "observacion", e.target.value.trim() || "")
          }
          fullWidth
        />
      ),
    },
  ];

  // Fetch de datos de la requisa por ID
  const { data: requisaData, loading, error } = useFetch(`${URL}api/v1/entregas-requisas/${id}`, {}, [id]);

  useEffect(() => {
    if (requisaData?.data) {
      const {
        requisaId,
        codigoUnico,
        sitio,
        estado,
        observacionesEntrega,
        detalles,
      } = requisaData.data;

      setEntrega({
        requisaId,
        codigoUnico,
        nombreSitio: sitio,
        nombreEstado: estado,
        observacionesEntrega: observacionesEntrega || "",
      });

      // Mapear detalles para incluir los campos necesarios
      const mappedDetalles = detalles.map((detalle) => ({
        id: detalle.detalleRequisaId,
        insumoId: detalle.insumoId,
        nombreInsumo: detalle.nombreInsumo || t("formularioEntrega.insumoDesconocido"),
        nombrePresentacion: detalle.nombrePresentacion || t("formularioEntrega.presentacionDesconocida"),
        nombreMarca: detalle.nombreMarca || t("formularioEntrega.marcaDesconocida"),
        cantidadEntregada: detalle.cantidadEntregada || 0,
        observacion: detalle.observacionesEntrega || "",
      }));

      setDetalles(mappedDetalles);
    }
  }, [requisaData, t]);

  /**
   * Manejar el cambio en los datos generales de la entrega.
   * @param {Event} e - Evento de cambio.
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEntrega((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * Manejar la actualización de los detalles en la tabla.
   * @param {number} id - ID del detalle.
   * @param {string} field - Campo a actualizar.
   * @param {any} value - Nuevo valor.
   */
  const handleUpdateDetalle = (id, field, value) => {
    setDetalles((prev) =>
      prev.map((detalle) =>
        detalle.id === id
          ? {
              ...detalle,
              [field]: field === "cantidadEntregada" ? Math.max(0, Number(value)) : value,
            }
          : detalle
      )
    );
  };

  /**
   * Guardar los cambios en la entrega.
   */
  const handleGuardarEntrega = async () => {
    const token = obtenerToken("accessToken");

    // Validar los campos antes de enviar
    const camposInvalidos = detalles.some(
      (detalle) =>
        isNaN(detalle.cantidadEntregada) || detalle.cantidadEntregada < 0
    );

    if (camposInvalidos) {
      toast.error(t("formularioEntrega.errorCamposNumericos"));
      return;
    }

    console.log("Hola")

    // Preparar el payload para el PUT
    const payload = {
      requisaId: entrega.requisaId,
      observacionesEntrega: entrega.observacionesEntrega,
      detalles: detalles.map(({ id, insumoId, cantidadEntregada, observacion }) => ({
        detalleRequisaId: id,
        insumoId: Number(insumoId),
        cantidadEntregada: Number(cantidadEntregada),
        observacionesEntrega: observacion,
      })),
    };

    console.log("Data del payload: " + JSON.stringify(payload))
    try {
      const response = await fetch(`${URL}api/v1/entregas-requisas`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast.success(t("formularioEntrega.exitoGuardar"));
        navigate("/requisas/entregas");
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || t("formularioEntrega.errorGuardar"));
      }
    } catch (err) {
      toast.error(t("formularioEntrega.errorGeneral"));
    }
  };

  if (loading) return <Cargador />;
  if (error) return <MensajeError mensaje={error.message} />;

  return (
    <PaginaFormularioEntregaRequisa
      entrega={entrega}
      detalles={detalles}
      columns={columns}
      onInputChange={handleInputChange}
      onUpdateDetalle={handleUpdateDetalle}
      onGuardarEntrega={handleGuardarEntrega}
    />
  );
};

export default ContenedorFormularioEntregaRequisa;