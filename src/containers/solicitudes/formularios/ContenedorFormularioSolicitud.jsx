import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import PaginaFormularioSolicitud from '@/pages/solicitudes/formularios/PaginaFormularioSolicitud';
import { URL } from '@/constants/url';
import useFetch from '@/hooks/useFetch';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { obtenerToken } from '@/utils/almacenamiento';

const ContenedorFormularioSolicitud = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const username = useSelector((state) => state.autenticacion.usuario);

  const [usuarioNombre, setUsuarioNombre] = useState('');
  const [proximoNumeroSolicitud, setProximoNumeroSolicitud] = useState('');
  const [detalles, setDetalles] = useState([]);
  const [detalleActual, setDetalleActual] = useState({
    id: '',
    insumoId: '',
    marcaId: '',
    distribuidorId: '',
    presentacionId: '',
    cantidadPresentaciones: 1,
    estudioId: '',
    bioanalistaId: '',
    observacion: '',
    unidadMedida: '',
    categoria: '',
    cantidadUnidad: 0
  });
  const [detalleErrors, setDetalleErrors] = useState({});
  const [detalleTouched, setDetalleTouched] = useState({});
  const [insumoIdSeleccionado, setInsumoIdSeleccionado] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);

  const [marcas, setMarcas] = useState([]);
  const [distribuidores, setDistribuidores] = useState([]);
  const [presentaciones, setPresentaciones] = useState([]);
  const [estudios, setEstudios] = useState([]);
  const [bioanalistas, setBioanalistas] = useState([]);

  const columns = [
    { header: 'pedido.insumo', field: 'insumoNombre' },
    { header: 'pedido.marca', field: 'marcaNombre' },
    { header: 'pedido.distribuidor', field: 'distribuidorNombre' },
    { header: 'pedido.presentacion', field: 'presentacionNombre' },
    { header: 'pedido.cantidadPresentaciones', field: 'cantidadPresentaciones' },
    { header: 'pedido.estudio', field: 'estudioNombre' },
    { header: 'pedido.bioanalista', field: 'bioanalistaNombre' },
    { header: 'pedido.observacion', field: 'observacion' },
  ];

  const { data: numeroSolicitudData } = useFetch(`${URL}api/v1/solicitudes/proximo-numero-solicitud`, {}, []);
  const { data: donantesData } = useFetch(`${URL}api/v1/donantes?page=0&size=1000`, {}, []);
  const { data: insumosData } = useFetch(`${URL}api/v1/insumos/activos?page=0&size=1000`, {}, []);
  const { data: usuarioData } = useFetch(username ? `${URL}api/v1/usuarios/username/${username}` : null, {}, [username]);
  const { data: detalleInsumoData } = useFetch(insumoIdSeleccionado ? `${URL}api/v1/insumos/${insumoIdSeleccionado}/detalle` : null, {}, [insumoIdSeleccionado]);
  const { data: estudiosData } = useFetch(`${URL}api/v1/estudios?page=0&size=100`, {}, []);
  const { data: bioanalistasData } = useFetch(`${URL}api/v1/bioanalistas?page=0&size=100`, {}, []);

  useEffect(() => {
    if (numeroSolicitudData?.data) setProximoNumeroSolicitud(numeroSolicitudData.data);
  }, [numeroSolicitudData]);

  useEffect(() => {
    if (usuarioData?.data) setUsuarioNombre(`${usuarioData.data.nombre} ${usuarioData.data.apellido}`);
  }, [usuarioData]);

  useEffect(() => {
    if (detalleInsumoData?.data && insumoIdSeleccionado) {
      setMarcas(detalleInsumoData.data.marcas || []);
      setDistribuidores(detalleInsumoData.data.distribuidores || []);
      setPresentaciones(detalleInsumoData.data.presentaciones || []);

      setDetalleActual((prevDetalle) => ({
        ...prevDetalle,
        unidadMedida: detalleInsumoData.data.unidadMedida?.nombre || '',
        categoria: detalleInsumoData.data.categoria?.nombre || '',
        cantidadUnidad: detalleInsumoData.data.valorUnidadMedida || 0
      }));
    } else {
      setMarcas([]);
      setDistribuidores([]);
      setPresentaciones([]);
    }
  }, [detalleInsumoData, insumoIdSeleccionado]);

  useEffect(() => {
    if (estudiosData?.data) setEstudios(estudiosData.data.content || []);
  }, [estudiosData]);

  useEffect(() => {
    if (bioanalistasData?.data) setBioanalistas(bioanalistasData.data.content || []);
  }, [bioanalistasData]);

  const solicitudValidationSchema = Yup.object({
    donanteId: Yup.string().required(t('contenedorFormularioSolicitud.donanteObligatorio')).nullable(),
    observaciones: Yup.string()
      .max(500, t('contenedorFormularioSolicitud.observacionesMax'))
      .required(t('contenedorFormularioSolicitud.observacionesObligatorio')),
  });

  const detalleValidationSchema = Yup.object({
    insumoId: Yup.string().required(t('contenedorFormularioSolicitud.insumoObligatorio')),
    marcaId: Yup.string().required(t('contenedorFormularioSolicitud.marcaObligatoria')),
    distribuidorId: Yup.string().required(t('contenedorFormularioSolicitud.distribuidorObligatorio')),
    presentacionId: Yup.string().required(t('contenedorFormularioSolicitud.presentacionObligatoria')),
    estudioId: Yup.string().required(t('contenedorFormularioSolicitud.estudioObligatorio')),
    cantidadPresentaciones: Yup.number()
      .min(1, t('contenedorFormularioSolicitud.cantidadMinima'))
      .required(t('contenedorFormularioSolicitud.cantidadObligatoria')),
    bioanalistaId: Yup.string().required(t('contenedorFormularioSolicitud.analistaObligatorio')),
    observacion: Yup.string().max(300, t('contenedorFormularioSolicitud.observacionMaxima')),
  });

  const formik = useFormik({
    initialValues: {
      numeroSolicitud: '',
      usuarioId: '',
      donanteId: '',
      estadoNombre: 'solicitado',
      observaciones: '',
    },
    enableReinitialize: true,
    validationSchema: solicitudValidationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      if (detalles.length === 0) {
        toast.error(t('contenedorFormularioSolicitud.errorSinDetalles'));
        return;
      }

      const nuevaSolicitud = {
        ...values,
        detalles: detalles.map((detalle) => ({
          ...detalle,
          cantidadPresentaciones: Number(detalle.cantidadPresentaciones),
        }))
      };

      try {
        const token = obtenerToken('accessToken');
        const response = await fetch(`${URL}api/v1/solicitudes`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(nuevaSolicitud),
        });

        if (response.ok) {
          toast.success(t('contenedorFormularioSolicitud.creacionExitosa'));
          navigate('/solicitudes/consolidar-solicitud');
        } else {
          const result = await response.json();
          toast.error(result.message || t('contenedorFormularioSolicitud.errorCrear'));
        }
      } catch (error) {
        toast.error(t('contenedorFormularioSolicitud.errorCrear'));
      }
    },
  });

  const handleDetalleChange = (e) => {
    const { name, value } = e.target;
    setDetalleActual({
      ...detalleActual,
      [name]: name === 'cantidadPresentaciones' ? Number(value) : value,
    });

    if (name === 'insumoId') setInsumoIdSeleccionado(value);
  };

  const agregarDetalle = async () => {
    try {
      await detalleValidationSchema.validate(detalleActual, { abortEarly: false });
      const detalleConNombres = {
        ...detalleActual,
        cantidadPresentaciones: Number(detalleActual.cantidadPresentaciones),
        insumoNombre: insumosData?.data?.content.find(insumo => insumo.id === detalleActual.insumoId)?.nombre || '',
        marcaNombre: marcas.find(marca => marca.id === detalleActual.marcaId)?.nombre || '',
        distribuidorNombre: distribuidores.find(distribuidor => distribuidor.id === detalleActual.distribuidorId)?.nombre || '',
        presentacionNombre: presentaciones.find(presentacion => presentacion.id === detalleActual.presentacionId)?.nombre || '',
        estudioNombre: estudios.find(estudio => estudio.id === detalleActual.estudioId)?.nombre || '',
        bioanalistaNombre: bioanalistas.find(analista => analista.id === detalleActual.bioanalistaId)?.nombre || '',
      };
      setDetalles([...detalles, { ...detalleConNombres, id: detalles.length + 1 }]);
      setDetalleActual({
        insumoId: '',
        marcaId: '',
        distribuidorId: '',
        presentacionId: '',
        cantidadPresentaciones: 1,
        bioanalistaId: '',
        observacion: '',
        unidadMedida: '',
        categoria: '',
        cantidadUnidad: 0
      });
      setDetalleErrors({});
      setDetalleTouched({});
      setInsumoIdSeleccionado(null); // Limpiar insumoIdSeleccionado después de agregar el detalle
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

  const handleGuardarSolicitud = async () => {
    formik.setTouched({
      numeroSolicitud: true,
      usuarioId: true,
      donanteId: true,
      estadoNombre: true,
      observaciones: true,
    });

    const valid = await formik.validateForm();
    if (Object.keys(valid).length === 0) {
      formik.handleSubmit();
    } else {
      toast.error(t('contenedorFormularioSolicitud.errorCamposObligatorios'));
    }
  };

  return (
    <PaginaFormularioSolicitud
      solicitud={formik.values}
      detalleActual={detalleActual}
      insumoIdSeleccionado={insumoIdSeleccionado}
      detalles={detalles}
      usuarios={[{ id: username, nombre: usuarioNombre }]}
      donantes={donantesData?.data?.content || []}
      insumos={insumosData?.data?.content || []}
      marcas={marcas}
      distribuidores={distribuidores}
      presentaciones={presentaciones}
      estudios={estudios}
      bioanalistas={bioanalistas}
      onInputChange={formik.handleChange}
      onDetalleChange={handleDetalleChange}
      onAgregarDetalle={agregarDetalle}
      onEliminarSeleccionados={eliminarSeleccionados} 
      onGuardarSolicitud={handleGuardarSolicitud}
      selectedRows={selectedRows}
      setSelectedRows={setSelectedRows}
      columns={columns}
      errors={{ ...formik.errors, ...detalleErrors }}
      touched={{ ...formik.touched, ...detalleTouched }}
      usuarioNombre={usuarioNombre}
      proximoNumeroSolicitud={proximoNumeroSolicitud}
      estadoDeshabilitado={true}
    />
  );
};

export default ContenedorFormularioSolicitud;