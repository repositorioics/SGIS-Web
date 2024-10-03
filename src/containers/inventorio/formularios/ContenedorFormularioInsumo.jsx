import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PaginaFormularioInsumo from '@/pages/inventario/formularios/PaginaFormularioInsumo';
import { URL } from '@/constants/url';
import useFetch from '@/hooks/useFetch';
import { obtenerToken } from '@/utils/almacenamiento';

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
    marcaId: '',
    distribuidorId: '',
    presentacionId: '',
    codigoBarra: '',
    modeloMarca: '',
  });

  const [variantes, setVariantes] = useState([]);
  const navigate = useNavigate();

  const maxSize = 1000;

  // Obtén los datos necesarios para los selects, accediendo a data.content
  const { data: categoriasData, error: categoriasError } = useFetch(`${URL}api/v1/categorias?page=0&size=${maxSize}`, {}, []);
  const { data: unidadesMedidaData, error: unidadesMedidaError } = useFetch(`${URL}api/v1/unidadesmedida?page=0&size=${maxSize}`, {}, []);
  const { data: marcasData, error: marcasError } = useFetch(`${URL}api/v1/marcas?page=0&size=${maxSize}`, {}, []);
  const { data: distribuidoresData, error: distribuidoresError } = useFetch(`${URL}api/v1/distribuidores?page=0&size=${maxSize}`, {}, []);
  const { data: presentacionesData, error: presentacionesError } = useFetch(`${URL}api/v1/presentaciones?page=0&size=${maxSize}`, {}, []);

  // Muestra los datos en consola para depuración
  console.log(categoriasData?.content);
  console.log(unidadesMedidaData?.content);
  console.log(marcasData?.content);
  console.log(distribuidoresData?.content);
  console.log(presentacionesData?.content);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInsumo({
      ...insumo,
      [name]: value
    });
  };

  const handleVarianteChange = (e) => {
    const { name, value } = e.target;
    setVarianteActual({
      ...varianteActual,
      [name]: value
    });
  };

  const agregarVariante = () => {
    setVariantes([...variantes, varianteActual]);
    setVarianteActual({
      marcaId: '',
      distribuidorId: '',
      presentacionId: '',
      codigoBarra: '',
      modeloMarca: '',
    });
  };

  const manejarCrear = async () => {
    const nuevoInsumo = { ...insumo, variantes };

    try {
      const token = obtenerToken("accessToken");
      const response = await fetch(`${URL}api/v1/insumos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
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

  if (categoriasError || unidadesMedidaError || marcasError || distribuidoresError || presentacionesError) {
    return <p>Error al cargar los datos</p>;
  }

  // Pasamos los datos al componente de formulario de insumos
  return (
    <PaginaFormularioInsumo
      insumo={insumo}
      varianteActual={varianteActual}
      variantes={variantes}
      categorias={categoriasData?.data?.content || []}
      unidadesMedida={unidadesMedidaData?.data?.content || []}
      marcas={marcasData?.data?.content || []}
      distribuidores={distribuidoresData?.data?.content || []}
      presentaciones={presentacionesData?.data?.content || []}
      onInputChange={handleInputChange}
      onVarianteChange={handleVarianteChange}
      onAgregarVariante={agregarVariante}
      onGuardarInsumo={manejarCrear}
    />
  );
};

export default ContenedorFormularioInsumo;