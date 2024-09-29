import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PaginaRoles from '@/pages/configuracion/PaginaRoles';
import '@/assets/styles/inventario/estilosInventario.css';
import { URL } from '@/constants/url';
import useFetch from '@/hooks/useFetch';

const ContenedorRoles = () => {
  const [paginaActual, setPaginaActual] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const navigate = useNavigate();

  const { data, loading, error } = useFetch(
    `${URL}api/v1/roles?page=${paginaActual}&size=${pageSize}`,
    {},
    [paginaActual, pageSize]
  );

  const manejarCrear = () => {
    navigate('/roles/crear');
  };

  const manejarActualizar = (rol) => {
    if (rol && rol.id) {
      navigate(`/roles/actualizar/${rol.id}`);
    } else {
      toast.error('No se puede actualizar el rol porque no tiene un ID válido.');
    }
  };

  const manejarEliminar = (rol) => {
    toast.success(`Rol ${rol.nombre} desactivado correctamente`);
    if (data) {
      const rolesFiltrados = data.data.content.filter(r => r.id !== rol.id);
    }
  };

  const columnas = [
    { field: 'nombre', headerName: 'Nombre', flex: 2 },
    { field: 'descripcion', headerName: 'Descripción', flex: 3 },
    { field: 'activo', headerName: 'Estado', flex: 1 },
    { field: 'acciones', headerName: 'Acciones', flex: 1, sortable: false },
  ];

  return (
    <>
      <PaginaRoles
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

export default ContenedorRoles;