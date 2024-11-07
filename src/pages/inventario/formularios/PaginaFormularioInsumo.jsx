import React from "react";
import { Box, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import "@/assets/styles/formularios.css";
import CustomTextField from "@/components/comun/CustomTextField";
import CustomSelect from "@/components/comun/CustomSelect";
import CustomButton from "@/components/comun/CustomButton";
import CustomTypography from "@/components/comun/CustomTypography";
import TablaDetalles from "@/components/TablaDetalles";

const PaginaFormularioInsumo = ({
  insumo,
  categorias,
  unidadesMedida,
  marcas,
  distribuidores,
  presentaciones,
  onInputChange,
  onGuardarInsumo,
  isEditing,
  errors,
  touched,
  handleAddDetail,
  handleRemoveDetail
}) => {
  const { t } = useTranslation();

  return (
    <Box className="formulario-container">
      <CustomTypography variant="h4" className="formulario-titulo" mb={1}>
        {isEditing ? t("formularioInsumo.actualizarTitulo") : t("formularioInsumo.crearTitulo")}
      </CustomTypography>

      <CustomTypography
        variant="subtitle1"
        color="textSecondary"
        className="formulario-subtitulo"
        mb={3}
        textAlign="left"
      >
        {isEditing ? t('formularioInsumo.actualizarSubtitulo') : t('formularioInsumo.crearSubtitulo')}
      </CustomTypography>

      <Grid container spacing={2} className="formulario-grid">
        {/* Campos de texto principales */}
        <Grid item xs={12} sm={6}>
          <CustomTextField
            label={t("formularioInsumo.nombreLabel")}
            name="nombre"
            value={insumo.nombre}
            onChange={onInputChange}
            error={touched.nombre && Boolean(errors.nombre)}
            helperText={touched.nombre && errors.nombre}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <CustomTextField
            label={t("formularioInsumo.descripcionLabel")}
            name="descripcion"
            value={insumo.descripcion}
            onChange={onInputChange}
            error={touched.descripcion && Boolean(errors.descripcion)}
            helperText={touched.descripcion && errors.descripcion}
          />
        </Grid>

        {/* Selectores para categoría y unidad de medida */}
        <Grid item xs={12} sm={6}>
          <CustomSelect
            label={t("formularioInsumo.categoriaLabel")}
            name="categoriaId"
            value={insumo.categoriaId}
            onChange={onInputChange}
            options={categorias.map((categoria) => ({ id: categoria.id, nombre: categoria.nombre }))}
            error={touched.categoriaId && Boolean(errors.categoriaId)}
            helperText={touched.categoriaId && errors.categoriaId}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <CustomSelect
            label={t("formularioInsumo.unidadMedidaLabel")}
            name="unidadMedidaId"
            value={insumo.unidadMedidaId}
            onChange={onInputChange}
            options={unidadesMedida.map((unidad) => ({ id: unidad.id, nombre: unidad.nombre }))}
            error={touched.unidadMedidaId && Boolean(errors.unidadMedidaId)}
            helperText={touched.unidadMedidaId && errors.unidadMedidaId}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <CustomTextField
            label={t("formularioInsumo.valorUnidadMedidaLabel")}
            name="valorUnidadMedida"
            type="number"
            value={insumo.valorUnidadMedida}
            onChange={onInputChange}
            error={touched.valorUnidadMedida && Boolean(errors.valorUnidadMedida)}
            helperText={touched.valorUnidadMedida && errors.valorUnidadMedida}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <CustomSelect
            label={t("formularioInsumo.presentacionesLabel")}
            name="presentaciones"
            value={insumo.presentaciones} // Asegúrate de que Formik maneje este valor como un array
            onChange={onInputChange}
            options={presentaciones.map((presentacion) => ({
              id: presentacion.id,
              nombre: presentacion.nombre,
            }))}
            multiple={true} // Activar selección múltiple
            error={touched.presentaciones && Boolean(errors.presentaciones)}
            helperText={touched.presentaciones && errors.presentaciones}
          />
        </Grid>


        {/* Sección para agregar marcas y códigos */}
        <Grid item xs={12}>
          <CustomTypography variant="h6" className="formulario-titulo" mt={2}>
            {t("formularioInsumo.seccionMarcas")}
          </CustomTypography>

          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={4}>
              <CustomSelect
                label={t("formularioInsumo.marcaLabel")}
                name="marcaId"
                value={insumo.marcaId || ''}
                onChange={onInputChange}
                options={marcas.map((m) => ({ id: m.id, nombre: m.nombre }))}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <CustomTextField
                label={t("formularioInsumo.codigoMarcaLabel")}
                name="codigoMarca"
                value={insumo.codigoMarca || ''}
                onChange={onInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <CustomButton
                color="secondary"
                label={t("acciones.agregar")}
                onClick={() => handleAddDetail("marcas")}
              />
            </Grid>
          </Grid>

          <TablaDetalles
            detalles={insumo.detallesMarcas}
            columns={[
              { header: t("formularioInsumo.marcaLabel"), field: "nombreMarca" },
              { header: t("formularioInsumo.codigoMarcaLabel"), field: "codigoMarca" },
            ]}
            handleRemoveDetail={(index) => handleRemoveDetail("detallesMarcas", index)}
          />
        </Grid>

        {/* Sección para agregar distribuidores y códigos */}
        <Grid item xs={12}>
          <CustomTypography variant="h6" className="formulario-titulo" mt={2}>
            {t("formularioInsumo.seccionDistribuidores")}
          </CustomTypography>

          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={4}>
              <CustomSelect
                label={t("formularioInsumo.distribuidorLabel")}
                name="distribuidorId"
                value={insumo.distribuidorId || ''}
                onChange={onInputChange}
                options={distribuidores.map((d) => ({ id: d.id, nombre: d.nombre }))}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <CustomTextField
                label={t("formularioInsumo.codigoDistribuidorLabel")}
                name="codigoDistribuidor"
                value={insumo.codigoDistribuidor || ''}
                onChange={onInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <CustomButton
                color="secondary"
                label={t("acciones.agregar")}
                onClick={() => handleAddDetail("distribuidores")}
              />
            </Grid>
          </Grid>

          <TablaDetalles
            detalles={insumo.detallesDistribuidores}
            columns={[
              { header: t("formularioInsumo.distribuidorLabel"), field: "nombreDistribuidor" },
              { header: t("formularioInsumo.codigoDistribuidorLabel"), field: "codigoDistribuidor" },
            ]}
            handleRemoveDetail={(index) => handleRemoveDetail("detallesDistribuidores", index)}
          />
        </Grid>
      </Grid>

      {/* Botón de creación/actualización */}
      <Box mt={2} mb={4} display="flex" justifyContent="center">
        <CustomButton
          label={isEditing ? t("formularioInsumo.botonActualizar") : t("formularioInsumo.botonCrear")}
          onClick={onGuardarInsumo}
        />
      </Box>
    </Box>
  );
};

export default PaginaFormularioInsumo;
