import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PaginaCategorias from '@/pages/inventario/PaginaCategorias';
import '@/assets/styles/inventario/estilosInventario.css';
import { URL } from '@/constants/url'; // Constante de la URL
import useFetch from '@/hooks/useFetch'; // Importar el hook personalizado

const ContenedorCategorias = () => {
  const [paginaActual, setPaginaActual] = useState(0);
  const [pageSize, setPageSize] = useState(10); // Estado para manejar el tamaño de la página
  const navigate = useNavigate();

  // Usamos el hook personalizado useFetch para obtener los datos de la API
  const { data, loading, error } = useFetch(
    `${URL}api/v1/categorias?page=${paginaActual}&size=${pageSize}`, 
    {}, 
    [paginaActual, pageSize]
  );

  const manejarCrear = () => {
    navigate('/categoria/crear');
  };

  const manejarActualizar = (categoria) => {
    if (categoria && categoria.id) {
      navigate(`/categoria/actualizar/${categoria.id}`);
    } else {
      toast.error('No se puede actualizar la categoría porque no tiene un ID válido.');
    }
  };

  const manejarEliminar = (categoria) => {
    toast.success(`Categoría ${categoria.nombre} eliminada correctamente`);
    if (data) {
      const categoriasFiltradas = data.data.content.filter(c => c.id !== categoria.id);
      // Aquí podrías actualizar el estado local si decides gestionar las categorías filtradas localmente.
    }
  };

  const columnas = [
    { field: 'nombre', headerName: 'Nombre', flex: 2 },
    { field: 'descripcion', headerName: 'Descripción', flex: 3 },
    { field: 'activo', headerName: 'Estado', flex: 1, renderCell: (params) => (
        <span className={`estado-label ${params.value ? 'activo' : 'inactivo'}`}>
          {params.value ? 'Activo' : 'Inactivo'}
        </span>
      ),
    },
    { field: 'acciones', headerName: 'Acciones', flex: 1, sortable: false },
  ];

  return (
    <>
      <PaginaCategorias
        columnas={columnas}
        datos={data ? data.data.content : []}
        cargando={loading}
        error={error}
        manejarCrear={manejarCrear}
        totalPaginas={data ? data.data.totalPages : 1}
        paginaActual={paginaActual}
        setPaginaActual={setPaginaActual}
        pageSize={pageSize} // Pasar pageSize como prop
        setPageSize={setPageSize} // Permitir cambiar el tamaño de página
        manejarActualizar={manejarActualizar}
        manejarEliminar={manejarEliminar}
      />
    </>
  );
};

export default ContenedorCategorias;