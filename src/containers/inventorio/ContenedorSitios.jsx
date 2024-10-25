import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PaginaSitios from '@/pages/inventario/PaginaSitios';
import '@/assets/styles/inventario/estilosInventario.css';
import { URL } from '@/constants/url';
import useFetch from '@/hooks/useFetch';
import { useTranslation } from 'react-i18next'; // Importar hook de traducción

const ContenedorSitios = () => {
  const [paginaActual, setPaginaActual] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const navigate = useNavigate();
  const { t } = useTranslation(); // Usar hook de traducción

  // Hook personalizado para obtener los datos
  const { data, loading, error } = useFetch(
    `${URL}api/v1/sitios?page=${paginaActual}&size=${pageSize}`,
    {},
    [paginaActual, pageSize]
  );

  const manejarCrear = () => {
    navigate('/inventario/sitios/crear');
  };

  const manejarActualizar = (sitio) => {
    if (sitio && sitio.id) {
      navigate(`/inventario/sitios/actualizar/${sitio.id}`);
    } else {
      toast.error(t('contenedorSitios.errorActualizar'));
    }
  };

  const manejarEliminar = (sitio) => {
    toast.success(t('contenedorSitios.sitioEliminado', { nombre: sitio.nombre }));
    if (data) {
      const sitiosFiltrados = data.data.content.filter(s => s.id !== sitio.id);
    }
  };

  const columnas = [
    { field: 'nombre', headerName: t('contenedorSitios.nombre'), flex: 2 },
    { field: 'abreviatura', headerName: t('contenedorSitios.abreviatura'), flex: 1 },
    { field: 'direccion', headerName: t('contenedorSitios.direccion'), flex: 3 },
    { field: 'activo', headerName: t('contenedorSitios.estado'), flex: 1 },
    { field: 'acciones', headerName: t('contenedorSitios.acciones'), flex: 1, sortable: false },
  ];

  return (
    <>
      <PaginaSitios
        columnas={columnas}
        datos={data ? data.data.content : []}
        cargando={loading}
        error={error}
        manejarCrear={manejarCrear}
        totalPaginas={data ? data.data.totalPages : 1}
        paginaActual={paginaActual}
        setPaginaActual={setPaginaActual}
        pageSize={pageSize}
        setPageSize={setPageSize}
        manejarActualizar={manejarActualizar}
        manejarEliminar={manejarEliminar}
      />
    </>
  );
};

export default ContenedorSitios;