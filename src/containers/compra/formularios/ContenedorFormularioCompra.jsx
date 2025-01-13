import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PaginaFormularioCompra from "@/pages/compras/formularios/PaginaFormularioCompra";
import { URL } from "@/constants/url";
import useFetch from "@/hooks/useFetch";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";
import { obtenerToken } from "@/utils/almacenamiento";
import ESTADOS from "@/constants/estados";
import ModalConfirmacion from "../../../components/comun/ModalConfirmacion";
import dayjs from 'dayjs';

const ContenedorFormularioCompra = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const username = useSelector((state) => state.autenticacion.usuario);
  const [insumoIdSeleccionado, setInsumoIdSeleccionado] = useState(null);
  const [detalles, setDetalles] = useState([]);
  const [detalleActual, setDetalleActual] = useState({
    insumoId: "",
    marcaId: "",
    distribuidorId: "",
    presentacionId: "",
    cantidad: 1,
    precioUnitario: 0,
    tasaImpuestos: 0,
    numeroLote: "",
    fechaVencimiento: null, // Cambiado a null para manejar DatePicker
    observaciones: "",
    esDonacion: false,
  });
  const [detalleErrors, setDetalleErrors] = useState({});
  const [detalleTouched, setDetalleTouched] = useState({});
  const [totalNeto, setTotalNeto] = useState(0);
  const [totalBruto, setTotalBruto] = useState(0);
  const [impuestos, setImpuestos] = useState(0);
  const [descuentos, setDescuentos] = useState(0);
  const [fechaCompra, setFechaCompra] = useState(dayjs());

  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);

  const isNumber = (value) => !isNaN(value) && value !== "";
  const isBoolean = (value) => typeof value === "boolean";

  const columns = [
    { header: "pedido.insumo", field: "insumoNombre" },
    { header: "pedido.marca", field: "marcaNombre" },
    { header: "pedido.distribuidor", field: "distribuidorNombre" },
    { header: "pedido.presentacion", field: "presentacionNombre" },
    { header: "pedido.cantidad", field: "cantidad" },
    { header: "pedido.precioUnitario", field: "precioUnitario" },
    { header: "pedido.tasaImpuestos", field: "tasaImpuestos" },
    { header: "pedido.numeroLote", field: "numeroLote" },
    { header: "pedido.fechaVencimiento", field: "fechaVencimiento" },
    { header: "pedido.observaciones", field: "observaciones" },
    { header: "pedido.subtotal", field: "subtotal" },
    { header: "pedido.total", field: "total" },
  ];

  const { data: numeroCompraData } = useFetch(
    `${URL}api/v1/compras/proximo-numero`,
    {},
    []
  );
  const { data: insumosData } = useFetch(
    `${URL}api/v1/insumos/activos?page=0&size=1000`,
    {},
    []
  );
  const { data: detalleInsumoData } = useFetch(
    insumoIdSeleccionado
      ? `${URL}api/v1/insumos/${insumoIdSeleccionado}/detalle`
      : null,
    {},
    [insumoIdSeleccionado]
  );
  const { data: estadosData } = useFetch(`${URL}api/v1/estados`, {}, []);

  useEffect(() => {
    if (numeroCompraData?.data) {
      formik.setFieldValue("codigoCompra", numeroCompraData.data);
    }
  }, [numeroCompraData]);

  useEffect(() => {
    if (detalleInsumoData?.data && insumoIdSeleccionado) {
      setDetalleActual((prevDetalle) => ({
        ...prevDetalle,
        cantidad: detalleInsumoData.data.cantidad || 1,
        precioUnitario: detalleInsumoData.data.precioUnitario || 0,
        tasaImpuestos: detalleInsumoData.data.tasaImpuestos || 0,
      }));
    }
  }, [detalleInsumoData, insumoIdSeleccionado]);

  useEffect(() => {
    const nuevoTotalBruto = detalles.reduce(
      (sum, detalle) => sum + detalle.cantidad * detalle.precioUnitario,
      0
    );
    const nuevoImpuestos = detalles.reduce(
      (sum, detalle) =>
        sum +
        (detalle.cantidad * detalle.precioUnitario * detalle.tasaImpuestos) /
          100,
      0
    );

    setTotalBruto(nuevoTotalBruto);
    setImpuestos(nuevoImpuestos);
    setTotalNeto(nuevoTotalBruto + nuevoImpuestos - descuentos);
  }, [detalles, descuentos]);

  const compraValidationSchema = Yup.object({
    fechaVencimiento: Yup.date()
  });

  const handleDetalleChange = (e) => {
    const { name, value } = e.target;

    let parsedValue = value;
    if (
      name === "cantidad" ||
      name === "precioUnitario" ||
      name === "tasaImpuestos"
    ) {
      parsedValue = isNumber(value) ? parseFloat(value) : "";
    } else if (name === "esDonacion") {
      parsedValue = value === "true" ? true : value === "false" ? false : "";
    }

    setDetalleActual({
      ...detalleActual,
      [name]: parsedValue,
    });

    if (name === "insumoId") setInsumoIdSeleccionado(parsedValue);
  };

  const agregarDetalle = () => {
    const isValidDate = (date) => {
        const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/; // Formato DD/MM/YYYY
        return dateRegex.test(date);
      };
    
      if (!detalleActual.fechaVencimiento || !isValidDate(detalleActual.fechaVencimiento)) {
        toast.error(t("formularioCompra.fechaVencimientoInvalida"));
        return;
      }
      
      if (
      !detalleActual.insumoId ||
      !detalleActual.marcaId ||
      !detalleActual.distribuidorId ||
    //   !detalleActual.presentacionId ||
      !isNumber(detalleActual.cantidad) ||
      !isNumber(detalleActual.precioUnitario) ||
      !detalleActual.numeroLote
    ) {
      toast.error(t("formularioCompra.errorCamposObligatoriosDetalle"));
      return;
    }

    const tasaImpuestos = detalleActual.tasaImpuestos || 0;
    const subtotal = detalleActual.cantidad * detalleActual.precioUnitario;
    const total = subtotal + subtotal * (tasaImpuestos / 100);

    const detalleConNombres = {
      ...detalleActual,
      tasaImpuestos,
      insumoNombre:
        insumosData?.data?.content.find(
          (insumo) => insumo.id === detalleActual.insumoId
        )?.nombre || "",
      marcaNombre:
        detalleInsumoData?.data?.marcas.find(
          (marca) => marca.id === detalleActual.marcaId
        )?.nombre || "",
      distribuidorNombre:
        detalleInsumoData?.data?.distribuidores.find(
          (distribuidor) => distribuidor.id === detalleActual.distribuidorId
        )?.nombre || "",
      presentacionNombre:
        detalleInsumoData?.data?.presentaciones.find(
          (presentacion) => presentacion.id === detalleActual.presentacionId
        )?.nombre || "",
      subtotal,
      total,
    };

    setDetalles([
      ...detalles,
      { ...detalleConNombres, id: detalles.length + 1 },
    ]);
    setTotalNeto((prevTotal) => prevTotal + total);

    setDetalleActual({
      insumoId: "",
      marcaId: "",
      distribuidorId: "",
      presentacionId: "",
      cantidad: 1,
      precioUnitario: 0,
      tasaImpuestos: 0,
      numeroLote: "",
      fechaVencimiento: null,
      observaciones: "",
      esDonacion: false,
    });
  };

  const eliminarSeleccionados = () => {
    setDetalles(
      detalles.filter((detalle) => !selectedRows.includes(detalle.id))
    );
    setSelectedRows([]);
  };

  const formik = useFormik({
    initialValues: {
      codigoCompra: numeroCompraData?.data?.codigoCompra || "",
      estadoId: ESTADOS.PEDIDO ? 1 : 1
    },
    enableReinitialize: true,
    validationSchema: compraValidationSchema,
    onSubmit: (values) => {
      if (detalles.length === 0) {
        toast.error(t("formularioCompra.errorCamposObligatoriosDetalles"));
        return;
      }
      setMostrarConfirmacion(true);
    },
  });

  const handleGuardarCompra = async () => {
    formik.setTouched({
      codigoCompra: true,
      observaciones: true,
      estadoId: true,
    });
  
    const valid = await formik.validateForm();
    if (Object.keys(valid).length === 0) {
        
      console.log("Datos de la compra antes")
      const nuevaCompra = {
        ...formik.values,
        descuentos: Number(descuentos),
        totalBruto: Number(totalBruto),
        impuestos: Number(impuestos),
        totalNeto: Number(totalNeto),
        fechaCompra: dayjs(fechaCompra).format("YYYY-MM-DDT00:00:00"), // Convertir a formato YYYY-MM-DD
        observaciones: formik.values.observaciones || "",
        detalles: detalles.map((detalle) => ({
          insumoId: Number(detalle.insumoId),
          cantidad: Number(detalle.cantidad),
          precioUnitario: Number(detalle.precioUnitario),
          tasaImpuestos: Number(detalle.tasaImpuestos),
          distribuidorId: Number(detalle.distribuidorId),
          presentacionId: Number(detalle.presentacionId),
          marcaId: Number(detalle.marcaId),
          numeroLote: detalle.numeroLote,
          fechaVencimiento: dayjs(detalle.fechaVencimiento).format("YYYY-MM-DDT00:00:00"), // Convertir a formato YYYY-MM-DD
          esDonacion: Boolean(detalle.esDonacion),
          observacion: detalle.observaciones || "", // Cambiar a observacion
        })),
      };

      console.log("Datos de la compra:" +   JSON.stringify(nuevaCompra))
  
      const token = obtenerToken("accessToken");
      try {
        const response = await fetch(`${URL}api/v1/compras`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(nuevaCompra),
        });
  
        if (response.ok) {
          toast.success(t("formularioCompra.creacionExitosa"));
          navigate("/compras/compras");
        } else {
          const result = await response.json();
          toast.error(result.message || t("formularioCompra.errorCrear"));
        }
      } catch (error) {
        toast.error(t("formularioCompra.errorCrear"));
      }
    } else {
      toast.error(t("formularioCompra.errorCamposObligatorios"));
    }
  };
  

  return (
    <>
      <PaginaFormularioCompra
        compra={formik.values}
        detalleActual={detalleActual}
        detalles={detalles}
        insumos={insumosData?.data?.content || []}
        marcas={detalleInsumoData?.data?.marcas || []}
        distribuidores={detalleInsumoData?.data?.distribuidores || []}
        presentaciones={detalleInsumoData?.data?.presentaciones || []}
        onDetalleChange={handleDetalleChange}
        onAgregarDetalle={agregarDetalle}
        onEliminarSeleccionados={eliminarSeleccionados}
        onGuardarCompra={handleGuardarCompra}
        totalNeto={totalNeto}
        totalBruto={totalBruto} // Agregado para mostrar total bruto
        impuestos={impuestos} // Agregado para mostrar impuestos
        descuentos={descuentos} // Agregado para mostrar descuentos
        setDescuentos={setDescuentos} // Agregado para permitir cambiar descuentos
        fechaCompra={fechaCompra} // Agregado para mostrar la fecha de compra
        setFechaCompra={setFechaCompra} // Agregado para permitir cambiar la fecha de compra
        estadoDeshabilitado={true}
        columns={columns}
        errors={detalleErrors}
        setDetalleActual={setDetalleActual}
        touched={detalleTouched}
        estados={estadosData?.data || []}
        mostrarConfirmacion={mostrarConfirmacion}
        setMostrarConfirmacion={setMostrarConfirmacion}
      />
      <ModalConfirmacion
        abierto={mostrarConfirmacion}
        onCerrar={() => setMostrarConfirmacion(false)}
        onConfirmar={() => {
          setMostrarConfirmacion(false);
          handleGuardarCompra();
        }}
      />
    </>
  );
};

export default ContenedorFormularioCompra;