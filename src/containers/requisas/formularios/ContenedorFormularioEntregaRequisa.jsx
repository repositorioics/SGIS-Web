import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PaginaFormularioEntregaRequisa from "@/pages/requisas/formularios/PaginaFormularioEntregaRequisa";
import { URL } from "@/constants/url";
import useFetch from "@/hooks/useFetch";
import { obtenerToken } from "@/utils/almacenamiento";
import { useTranslation } from "react-i18next";
import Cargador from "@/components/Cargador"; // Componente de carga
import MensajeError from "@/components/MensajeError"; // Componente de error

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

  // Fetch de datos de la requisa por ID
  const { data: requisaData, loading, error } = useFetch(`${URL}api/v1/requisas/${id}`, {}, [id]);

  useEffect(() => {
    if (requisaData?.data) {
      const { id, codigoUnico, nombreSitio, nombreEstado, observaciones, detalles } =
        requisaData.data;

      console.log("Datos de la requisa cargados:", requisaData.data);

      setEntrega({
        requisaId: id,
        codigoUnico,
        nombreSitio,
        nombreEstado,
        observacionesEntrega: "",
      });

      // Mapear detalles para que las claves coincidan con las columnas de la tabla
      const mappedDetalles = detalles.map((detalle) => ({
        id: detalle.id,
        nombreInsumo: detalle.insumoNombre || "Insumo desconocido",
        nombrePresentacion: detalle.presentacionNombre || "Presentación desconocida",
        nombreMarca: detalle.marcaNombre || "Marca desconocida",
        cantidadEntregada: 0,
        observacion: "",
      }));

      setDetalles(mappedDetalles);
    }
  }, [requisaData]);

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
   * @param {number} id - id del detalle.
   * @param {string} field - Campo a actualizar.
   * @param {any} value - Nuevo valor.
   */
  const handleUpdateDetalle = (id, field, value) => {
    setDetalles((prev) =>
      prev.map((detalle) =>
        detalle.id === id ? { ...detalle, [field]: value } : detalle
      )
    );
  };  

  /**
   * Guardar los cambios en la entrega.
   */
  const handleGuardarEntrega = async () => {
    const token = obtenerToken("accessToken");

    // Preparar el payload para el PUT
    const payload = {
      requisaId: entrega.requisaId,
      observacionesEntrega: entrega.observacionesEntrega,
      detalles: detalles.map(({ id, cantidadEntregada, observacion }) => ({
        detalleRequisaId: id,
        cantidadEntregada,
        observacionesEntrega: observacion,
      })),
    };

    console.log("Payload enviado al servidor:", payload);

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

  // Usar el componente Cargador mientras los datos se cargan
  if (loading) return <Cargador />;

  // Usar el componente MensajeError si hay un error
  if (error) return <MensajeError mensaje={error.message} />;

  return (
    <PaginaFormularioEntregaRequisa
      entrega={entrega}
      detalles={detalles}
      onInputChange={handleInputChange}
      onUpdateDetalle={handleUpdateDetalle}
      onGuardarEntrega={handleGuardarEntrega}
    />
  );
};

export default ContenedorFormularioEntregaRequisa;