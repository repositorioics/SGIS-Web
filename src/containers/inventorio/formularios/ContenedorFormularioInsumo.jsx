import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PaginaFormularioInsumo from '@/pages/inventario/formularios/PaginaFormularioInsumo';
import { URL } from '@/constants/url';
import useFetch from '@/hooks/useFetch';

const ContenedorFormularioInsumo = () => {
  const [insumo, setInsumo] = useState({
    nombre: '',
    descripcion: '',
    categoriaId: '',
    unidadMedidaId: '',
    valorUnidadMedida: 0,
    activo: true,
    variantes: []
  });

  const [varianteActual, setVarianteActual] = useState({
    insumoId: '', // Este campo probablemente no sea necesario aquí
    marcaId: '',
    distribuidorId: '',
    presentacionId: '',
    codigoBarra: '',
    modeloMarca: '',
    existencias: 0
  });

  const [variantes, setVariantes] = useState([]);
  const navigate = useNavigate();

  const maxSize = 1000; // Para obtener la mayor cantidad de datos
  const { data: categoriasData, error: categoriasError } = useFetch(`${URL}api/v1/categorias?page=0&size=${maxSize}`, {}, []);
  const { data: unidadesMedidaData, error: unidadesMedidaError } = useFetch(`${URL}api/v1/unidadesmedida?page=0&size=${maxSize}`, {}, []);
  const { data: marcasData, error: marcasError } = useFetch(`${URL}api/v1/marcas?page=0&size=${maxSize}`, {}, []);
  const { data: distribuidoresData, error: distribuidoresError } = useFetch(`${URL}api/v1/distribuidores?page=0&size=${maxSize}`, {}, []);
  const { data: presentacionesData, error: presentacionesError } = useFetch(`${URL}api/v1/presentaciones?page=0&size=${maxSize}`, {}, []);

  // Manejar cambios en el formulario de insumo
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInsumo({
      ...insumo,
      [name]: value
    });
  };

  // Manejar cambios en el formulario de variantes
  const handleVarianteChange = (e) => {
    const { name, value } = e.target;
    setVarianteActual({
      ...varianteActual,
      [name]: value
    });
  };

  // Agregar variante a la lista de variantes
  const agregarVariante = () => {
    setVariantes([...variantes, varianteActual]);
    setVarianteActual({
      marcaId: '',
      distribuidorId: '',
      presentacionId: '',
      codigoBarra: '',
      modeloMarca: '',
      existencias: 0
    });
  };

  // Manejar la creación del insumo
  const manejarCrear = async () => {
    const nuevoInsumo = { ...insumo, variantes };

    try {
      const response = await fetch(`${URL}api/v1/insumos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoInsumo),
      });
      if (response.ok) {
        toast.success('Insumo creado con éxito');
        navigate('/insumos');
      } else {
        toast.error('Error al crear el insumo');
      }
    } catch (error) {
      toast.error('Error al crear el insumo');
    }
  };

  // Verificar errores en las peticiones
  if (categoriasError || unidadesMedidaError || marcasError || distribuidoresError || presentacionesError) {
    return <p>Error al cargar los datos</p>;
  }

  return (
    <PaginaFormularioInsumo
      insumo={insumo}
      varianteActual={varianteActual}
      variantes={variantes}
      categorias={categoriasData?.data || []}
      unidadesMedida={unidadesMedidaData?.data || []}
      marcas={marcasData?.data || []}
      distribuidores={distribuidoresData?.data || []}
      presentaciones={presentacionesData?.data || []}
      onInputChange={handleInputChange}
      onVarianteChange={handleVarianteChange}
      onAgregarVariante={agregarVariante}
      onGuardarInsumo={manejarCrear}
    />
  );
};

export default ContenedorFormularioInsumo;