import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import PaginaFormularioRequisa from '@/pages/requisas/formularios/PaginaFormularioRequisa';
import { URL } from '@/constants/url';
import useFetch from '@/hooks/useFetch';
import { obtenerToken } from '@/utils/almacenamiento';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import { useFormik } from 'formik';

/**
 * Controla la lógica del formulario de requisa, incluyendo la creación y manejo de detalles.
 */
const ContenedorFormularioRequisa = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const username = useSelector((state) => state.autenticacion.usuario);

  const [usuarioNombre, setUsuarioNombre] = useState('');
  const [codigoUnico, setCodigoUnico] = useState('');
  const [detalles, setDetalles] = useState([]);
  const [detalleActual, setDetalleActual] = useState({
    insumoId: '',
    presentacionId: '',
    cantidadPresentacionesSolicitada: 0,
    observacion: '',
  });
  const [detalleErrors, setDetalleErrors] = useState({});
  const [detalleTouched, setDetalleTouched] = useState({});
  const [insumoIdSeleccionado, setInsumoIdSeleccionado] = useState(null);

  const maxSize = 1000;

  // Obtener los datos necesarios para los selectores y los valores predeterminados
  const { data: sitiosData } = useFetch(`${URL}api/v1/sitios?page=0&size=${maxSize}`, {}, []);
  const { data: insumosData } = useFetch(`${URL}api/v1/insumos/activos?page=0&size=${maxSize}`, {}, []);
  const { data: usuarioData } = useFetch(username ? `${URL}api/v1/usuarios/username/${username}` : null, {}, [username]);
  const { data: detalleInsumoData } = useFetch(insumoIdSeleccionado ? `${URL}api/v1/insumos/${insumoIdSeleccionado}/detalle` : null, {}, [insumoIdSeleccionado]);

  useEffect(() => {
    if (usuarioData?.data) setUsuarioNombre(`${usuarioData.data.nombre} ${usuarioData.data.apellido}`);
  }, [usuarioData]);

  useEffect(() => {
    if (detalleInsumoData?.data && insumoIdSeleccionado) {
      setDetalleActual((prevDetalle) => ({
        ...prevDetalle,
        unidadMedida: detalleInsumoData.data.unidadMedida?.nombre || '',
        categoria: detalleInsumoData.data.categoria?.nombre || '',
      }));
    }
  }, [detalleInsumoData, insumoIdSeleccionado]);

  const requisaValidationSchema = Yup.object({
    sitioId: Yup.string().required(t('contenedorFormularioRequisa.sitioObligatorio')).nullable(),
    observaciones: Yup.string()
      .max(500, t('contenedorFormularioRequisa.observacionesMax'))
      .required(t('contenedorFormularioRequisa.observacionesObligatorio')),
  });

  const detalleValidationSchema = Yup.object({
    insumoId: Yup.string().required(t('contenedorFormularioRequisa.insumoObligatorio')),
    presentacionId: Yup.string().required(t('contenedorFormularioRequisa.presentacionObligatoria')),
    cantidadPresentacionesSolicitada: Yup.number()
      .min(1, t('contenedorFormularioRequisa.cantidadMinima'))
      .required(t('contenedorFormularioRequisa.cantidadObligatoria')),
    observacion: Yup.string().max(300, t('contenedorFormularioRequisa.observacionMaxima')),
  });

  const formik = useFormik({
    initialValues: {
      codigoUnico: '',
      usuarioId: '',
      sitioId: '',
      estadoNombre: 'solicitado',
      observaciones: '',
    },
    enableReinitialize: true,
    validationSchema: requisaValidationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      if (detalles.length === 0) {
        toast.error(t('contenedorFormularioRequisa.errorSinDetalles'));
        return;
      }

      const nuevaRequisa = {
        ...values,
        detalles: detalles.map((detalle) => ({
          ...detalle,
          cantidadPresentacionesSolicitada: Number(detalle.cantidadPresentacionesSolicitada),
        })),
      };

      try {
        const token = obtenerToken('accessToken');
        const response = await fetch(`${URL}api/v1/requisas`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(nuevaRequisa),
        });

        if (response.ok) {
          toast.success(t('contenedorFormularioRequisa.creacionExitosa'));
          navigate('/requisas');
        } else {
          const result = await response.json();
          toast.error(result.message || t('contenedorFormularioRequisa.errorCrear'));
        }
      } catch (error) {
        toast.error(t('contenedorFormularioRequisa.errorCrear'));
      }
    },
  });

  const handleDetalleChange = (e) => {
    const { name, value } = e.target;
    setDetalleActual({
      ...detalleActual,
      [name]: name === 'cantidadPresentacionesSolicitada' ? Number(value) : value,
    });

    if (name === 'insumoId') setInsumoIdSeleccionado(value);
  };

  const agregarDetalle = async () => {
    try {
      await detalleValidationSchema.validate(detalleActual, { abortEarly: false });
      const detalleConNombres = {
        ...detalleActual,
        cantidadPresentacionesSolicitada: Number(detalleActual.cantidadPresentacionesSolicitada),
        insumoNombre: insumosData?.data?.content.find(insumo => insumo.id === detalleActual.insumoId)?.nombre || '',
        presentacionNombre: detalleActual.presentacionId || '',
      };
      setDetalles([...detalles, { ...detalleConNombres, id: detalles.length + 1 }]);
      setDetalleActual({
        insumoId: '',
        presentacionId: '',
        cantidadPresentacionesSolicitada: 0,
        observacion: '',
      });
      setDetalleErrors({});
      setDetalleTouched({});
      setInsumoIdSeleccionado(null);
    } catch (error) {
      const validationErrors = {};
      const touchedFields = {};
      error.inner.forEach((err) => {
        validationErrors[err.path] = err.message;
        touchedFields[err.path] = true;
      });
      setDetalleErrors(validationErrors);
      setDetalleTouched(touchedFields);
    }
  };

  const eliminarSeleccionados = () => {
    setDetalles(detalles.filter((detalle) => !selectedRows.includes(detalle.id)));
    setSelectedRows([]);
  };

  const handleGuardarRequisa = async () => {
    formik.setTouched({
      codigoUnico: true,
      usuarioId: true,
      sitioId: true,
      estadoNombre: true,
      observaciones: true,
    });

    const valid = await formik.validateForm();
    if (Object.keys(valid).length === 0) {
      formik.handleSubmit();
    } else {
      toast.error(t('contenedorFormularioRequisa.errorCamposObligatorios'));
    }
  };

  return (
    <PaginaFormularioRequisa
      requisa={formik.values}
      detalleActual={detalleActual}
      insumoIdSeleccionado={insumoIdSeleccionado}
      detalles={detalles}
      sitios={sitiosData?.data?.content || []}
      insumos={insumosData?.data?.content || []}
      onInputChange={formik.handleChange}
      onDetalleChange={handleDetalleChange}
      onAgregarDetalle={agregarDetalle}
      onEliminarSeleccionados={eliminarSeleccionados}
      onGuardarRequisa={handleGuardarRequisa}
      errors={{ ...formik.errors, ...detalleErrors }}
      touched={{ ...formik.touched, ...detalleTouched }}
      usuarioNombre={usuarioNombre}
      codigoUnico={codigoUnico}
      estadoDeshabilitado={true}
    />
  );
};

export default ContenedorFormularioRequisa;