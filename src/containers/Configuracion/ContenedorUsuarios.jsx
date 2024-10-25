import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PaginaUsuarios from '@/pages/configuracion/PaginaUsuarios';
import '@/assets/styles/inventario/estilosInventario.css';
import { URL } from '@/constants/url'; 
import useFetch from '@/hooks/useFetch'; 
import { useTranslation } from 'react-i18next'; // Importar traducción

/**
 * Controlar la lógica de la página de usuarios, incluyendo la creación, actualización y desactivación de usuarios.
 */
const ContenedorUsuarios = () => {
  const [paginaActual, setPaginaActual] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation(); // Usar hook de traducción

  // Obtener datos de usuarios desde la API con paginación
  const { data, loading, error } = useFetch(
    `${URL}api/v1/usuarios?page=${paginaActual}&size=${pageSize}`, 
    {}, 
    [paginaActual, pageSize]
  );

  /**
   * Navegar a la página de creación de un nuevo usuario.
   */
  const manejarCrear = () => {
    navigate('/configuraciones/usuarios/crear');
  };

  /**
   * Navegar a la página de actualización de un usuario si tiene un ID válido.
   * @param {object} usuario - El usuario seleccionado para actualizar.
   */
  const manejarActualizar = (usuario) => {
    if (usuario && usuario.id) {
      navigate(`/configuraciones/usuarios/actualizar/${usuario.id}`);
    } else {
      // Mostrar mensaje de error si no hay un ID válido
      toast.error(t('contenedorUsuarios.errorActualizar'));
    }
  };

  /**
   * Desactivar un usuario seleccionado y mostrar un mensaje de éxito.
   * @param {object} usuario - El usuario seleccionado para desactivar.
   */
  const manejarEliminar = (usuario) => {
    toast.success(t('contenedorUsuarios.usuarioDesactivado', { nombre: usuario.nombre }));
    if (data) {
      const usuariosFiltrados = data.data.content.filter(u => u.id !== usuario.id);
    }
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setUsuarioSeleccionado(null);
  };

  // Definir las columnas de la tabla
  const columnas = [
    { field: 'nombre', headerName: t('paginaUsuarios.columnaNombre'), flex: 2 },
    { field: 'apellido', headerName: t('paginaUsuarios.columnaApellido'), flex: 2 },
    { field: 'usuario', headerName: t('paginaUsuarios.columnaUsuario'), flex: 2 },
    { field: 'correo', headerName: t('paginaUsuarios.columnaCorreo'), flex: 3 },
    { field: 'ultimo_acceso', headerName: t('paginaUsuarios.columnaUltimoAcceso'), flex: 3 },
    { field: 'activo', headerName: t('paginaUsuarios.columnaEstado'), flex: 1 },
    { field: 'acciones', headerName: t('paginaUsuarios.columnaAcciones'), flex: 1, sortable: false },
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
        pageSize={pageSize} 
        setPageSize={setPageSize} 
        manejarActualizar={manejarActualizar}
        manejarEliminar={manejarEliminar}
      />
    </>
  );
};

export default ContenedorUsuarios;