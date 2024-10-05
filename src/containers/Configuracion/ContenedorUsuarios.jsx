import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PaginaUsuarios from '@/pages/configuracion/PaginaUsuarios';
import '@/assets/styles/inventario/estilosInventario.css';
import { URL } from '@/constants/url'; // Constante de la URL
import useFetch from '@/hooks/useFetch'; // Importar el hook personalizado

const ContenedorUsuarios = () => {
  const [paginaActual, setPaginaActual] = useState(0);
  const [pageSize, setPageSize] = useState(10); // Estado para manejar el tamaño de la página
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null); // Usuario para mostrar en el modal
  const [modalAbierto, setModalAbierto] = useState(false); // Controlar si el modal está abierto
  const navigate = useNavigate();

  // Usamos el hook personalizado useFetch para obtener los datos de la API
  const { data, loading, error } = useFetch(
    `${URL}api/v1/usuarios?page=${paginaActual}&size=${pageSize}`, 
    {}, 
    [paginaActual, pageSize]
  );

  const manejarCrear = () => {
    navigate('/configuraciones/usuarios/crear');
  };

  const manejarActualizar = (usuario) => {
    if (usuario && usuario.id) {
      navigate(`/configuraciones/usuarios/actualizar/${usuario.id}`);
    } else {
      toast.error('No se puede actualizar el usuario porque no tiene un ID válido.');
    }
  };

  const manejarEliminar = (usuario) => {
    toast.success(`Usuario ${usuario.nombre} desactivado correctamente`);
    if (data) {
      const usuariosFiltrados = data.data.content.filter(u => u.id !== usuario.id);
      // Aquí podrías actualizar el estado local si decides gestionar los usuarios filtrados localmente.
    }
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setUsuarioSeleccionado(null);
  };

  const columnas = [
    { field: 'nombre', headerName: 'Nombre', flex: 2 },
    { field: 'apellido', headerName: 'Apellido', flex: 2 },
    { field: 'usuario', headerName: 'Usuario', flex: 2 },
    { field: 'correo', headerName: 'Correo', flex: 3 },
    { field: 'ultimo_acceso', headerName: 'Último Acceso', flex: 3 },
    { field: 'activo', headerName: 'Estado', flex: 1 },
    { field: 'acciones', headerName: 'Acciones', flex: 1, sortable: false },
  ];

  return (
    <>
      <PaginaUsuarios
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

export default ContenedorUsuarios;