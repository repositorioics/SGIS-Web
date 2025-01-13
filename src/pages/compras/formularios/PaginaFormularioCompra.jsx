import React from "react";
import { Box, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import "@/assets/styles/formularios.css";
import CustomTextField from "@/components/comun/CustomTextField";
import CustomButton from "@/components/comun/CustomButton";
import CustomTypography from "@/components/comun/CustomTypography";
import CustomSelect from "@/components/comun/CustomSelect";
import CustomDatePicker from "@/components/comun/CustomDatePicker";
import TablaDetalles from "@/components/TablaDetalles";
import dayjs from 'dayjs';

const PaginaFormularioCompra = ({
  compra,
  detalleActual,
  detalles,
  insumos,
  marcas,
  distribuidores,
  presentaciones,
  onDetalleChange,
  onDateChange,
  onAgregarDetalle,
  onEliminarSeleccionados,
  onGuardarCompra,
  selectedRows,
  setSelectedRows,
  columns,
  errors,
  touched,
  totalNeto,
  totalBruto,
  impuestos,
  descuentos,
  setDetalleActual,
  setDescuentos,
  fechaCompra,
  setFechaCompra,
  mostrarConfirmacion,
  setMostrarConfirmacion,
  estados,
  handleDetalleChange
}) => {
  const { t } = useTranslation();

  const insumoSeleccionado = Boolean(detalleActual.insumoId);

  return (
    <Box sx={{ padding: 5 }}>
      <CustomTypography
        variant="h4"
        className="formulario-titulo"
        textAlign="left"
      >
        {t("formularioCompra.crearCompra")}
      </CustomTypography>

      <CustomTypography
        variant="subtitle1"
        color="textSecondary"
        className="formulario-subtitulo"
        textAlign="left"
      >
        {t("formularioCompra.ingreseDatosGenerales")}
      </CustomTypography>

      {/* Sección de datos generales */}
      <Grid container spacing={2} mt={2}>
        <Grid item xs={12} sm={4}>
          <CustomTextField
            label={t("formularioCompra.codigoCompra")}
            name="codigoCompra"
            value={compra.codigoCompra}
            fullWidth
            margin="normal"
            InputProps={{ readOnly: true }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <CustomTextField
            label={t("formularioCompra.totalBruto")}
            name="totalBruto"
            value={totalBruto.toFixed(2)}
            fullWidth
            margin="normal"
            InputProps={{ readOnly: true }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <CustomTextField
            label={t("formularioCompra.impuestos")}
            name="impuestos"
            value={impuestos.toFixed(2)}
            fullWidth
            margin="normal"
            InputProps={{ readOnly: true }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <CustomTextField
            label={t("formularioCompra.descuentos")}
            name="descuentos"
            value={descuentos.toFixed(2)}
            fullWidth
            margin="normal"
            onChange={(e) => setDescuentos(parseFloat(e.target.value) || 0)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <CustomTextField
            label={t("formularioCompra.totalNeto")}
            name="totalNeto"
            value={totalNeto.toFixed(2)}
            fullWidth
            margin="normal"
            InputProps={{ readOnly: true }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
  <CustomTextField
    label={t("formularioCompra.fechaCompra")}
    name="fechaCompra"
    value={
      fechaCompra
        ? dayjs(fechaCompra).format("DD/MM/YYYY") // Mostrar formato DD/MM/YYYY
        : "" // Mostrar vacío si no hay fecha
    }
    onChange={(e) => {
      const { value } = e.target;
      setFechaCompra(value); // No cambia el valor almacenado
    }}
    fullWidth
    margin="normal"
    error={false} // Cambia según tu lógica de validación
    helperText={t("formularioCompra.formatoEsperado", { formato: "DD/MM/YYYY" })}
  />
</Grid>

        <Grid item xs={12} sm={4}>
          <CustomTextField
            label={t("formularioCompra.estado")}
            name="estadoId"
            value={compra.estadoId}
            fullWidth
            margin="normal"
            InputProps={{ readOnly: true }}
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <CustomTextField
            label={t("formularioCompra.observaciones")}
            name="observaciones"
            value={compra.observaciones}
            onChange={onDetalleChange}
            fullWidth
            margin="normal"
            error={Boolean(errors.observaciones)}
            helperText={errors.observaciones}
            touched={touched.observaciones}
          />
        </Grid>
      </Grid>

      <CustomTypography
        variant="h5"
        className="formulario-titulo"
        mt={2}
        textAlign="left"
      >
        {t("formularioCompra.agregarDetalles")}
      </CustomTypography>

      <CustomTypography
        variant="subtitle1"
        color="textSecondary"
        className="formulario-subtitulo"
        textAlign="left"
      >
        {t("formularioCompra.ingreseDatosDetalle")}
      </CustomTypography>

      <Grid
        container
        spacing={2}
        className="formulario-grid"
        sx={{ width: "100%" }}
      >
        <Grid item xs={12} sm={4}>
          <CustomSelect
            label={t("formularioCompra.esDonacion")}
            name="esDonacion"
            value={
              detalleActual.esDonacion !== null
                ? detalleActual.esDonacion.toString()
                : ""
            }
            onChange={onDetalleChange}
            options={[
              // { id: '', nombre: t('formularioCompra.seleccioneEsDonacion') },
              { id: "true", nombre: t("formularioCompra.si") },
              { id: "false", nombre: t("formularioCompra.no") },
            ]}
            error={errors.esDonacion}
            touched={touched.esDonacion}
            renderOption={(option) => (
              <MenuItem
                key={option.id}
                value={option.id}
                disabled={option.id === ""}
              >
                {option.nombre}
              </MenuItem>
            )}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <CustomTextField
            label={t("formularioCompra.numeroLote")}
            name="numeroLote"
            value={detalleActual.numeroLote}
            onChange={onDetalleChange}
            fullWidth
            margin="normal"
            error={Boolean(errors.numeroLote)}
            helperText={errors.numeroLote}
            touched={touched.numeroLote}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
  <CustomTextField
    label={t("formularioCompra.fechaVencimiento")}
    name="fechaVencimiento"
    value={detalleActual.fechaVencimiento || ""}
    onChange={(e) => {
      const { value } = e.target;
      setDetalleActual((prevDetalle) => ({
        ...prevDetalle,
        fechaVencimiento: value, // Guardar directamente como string
      }));
    }}
    fullWidth
    margin="normal"
    error={Boolean(errors.fechaVencimiento)}
    helperText={errors.fechaVencimiento || "Formato esperado: DD/MM/YYYY"}
  />
</Grid>



        <Grid item xs={12} sm={4}>
          <CustomSelect
            label={t("formularioCompra.insumo")}
            name="insumoId"
            value={detalleActual.insumoId}
            onChange={onDetalleChange}
            options={insumos.map((insumo) => ({
              id: insumo.id,
              nombre: `${insumo.nombre} - ${insumo.unidadMedida.nombre}`,
            }))}
            error={errors.insumoId}
            touched={touched.insumoId}
            placeholder={t("formularioCompra.seleccioneInsumo")}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <CustomSelect
            label={t("formularioCompra.marca")}
            name="marcaId"
            value={detalleActual.marcaId}
            onChange={onDetalleChange}
            options={(insumoSeleccionado ? marcas : []).map((marca) => ({
              id: marca.id,
              nombre: marca.nombre,
            }))}
            error={errors.marcaId}
            touched={touched.marcaId}
            disabled={!insumoSeleccionado}
            placeholder={
              !insumoSeleccionado
                ? t("formularioCompra.seleccioneInsumoPrimero")
                : ""
            }
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <CustomSelect
            label={t("formularioCompra.distribuidor")}
            name="distribuidorId"
            value={detalleActual.distribuidorId}
            onChange={onDetalleChange}
            options={(insumoSeleccionado ? distribuidores : []).map(
              (distribuidor) => ({
                id: distribuidor.id,
                nombre: distribuidor.nombre,
              })
            )}
            error={errors.distribuidorId}
            touched={touched.distribuidorId}
            disabled={!insumoSeleccionado}
            placeholder={
              !insumoSeleccionado
                ? t("formularioCompra.seleccioneInsumoPrimero")
                : ""
            }
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <CustomSelect
            label={t("formularioCompra.presentacion")}
            name="presentacionId"
            value={detalleActual.presentacionId}
            onChange={onDetalleChange}
            options={(insumoSeleccionado ? presentaciones : []).map(
              (presentacion) => ({
                id: presentacion.id,
                nombre: presentacion.nombre,
              })
            )}
            error={errors.presentacionId}
            touched={touched.presentacionId}
            disabled={!insumoSeleccionado}
            placeholder={
              !insumoSeleccionado
                ? t("formularioCompra.seleccioneInsumoPrimero")
                : ""
            }
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <CustomTextField
            label={t("formularioCompra.cantidad")}
            name="cantidad"
            type="number"
            value={detalleActual.cantidad}
            onChange={onDetalleChange}
            fullWidth
            inputProps={{ min: 1 }}
            margin="normal"
            error={Boolean(errors.cantidad)}
            helperText={errors.cantidad}
            touched={touched.cantidad}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <CustomTextField
            label={t("formularioCompra.precioUnitario")}
            name="precioUnitario"
            type="number"
            value={detalleActual.precioUnitario}
            onChange={onDetalleChange}
            fullWidth
            margin="normal"
            error={Boolean(errors.precioUnitario)}
            helperText={errors.precioUnitario}
            touched={touched.precioUnitario}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <CustomTextField
            label={t("formularioCompra.tasaImpuestos")}
            name="tasaImpuestos"
            type="number"
            value={detalleActual.tasaImpuestos || 0}
            onChange={onDetalleChange}
            fullWidth
            margin="normal"
            error={Boolean(errors.tasaImpuestos)}
            helperText={errors.tasaImpuestos}
            touched={touched.tasaImpuestos}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <CustomTextField
            label={t("formularioCompra.observacionesDetalle")}
            name="observaciones"
            value={detalleActual.observaciones || ""}
            onChange={onDetalleChange}
            fullWidth
            margin="normal"
            error={Boolean(errors.observaciones)}
            helperText={errors.observaciones}
            touched={touched.observaciones}
          />
        </Grid>

        <Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{ mb: 2 }}
        >
          <CustomButton
            variant="contained"
            color="secondary"
            onClick={onAgregarDetalle}
            className="formulario-boton"
            label={t("formularioCompra.agregarDetalle")}
            sx={{ mb: 2 }}
          />
        </Grid>
      </Grid>

      <CustomTypography variant="h5" mt={2} textAlign="left">
        {t("formularioCompra.detallesAgregados")}
      </CustomTypography>

      <CustomTypography
        variant="subtitle1"
        color="textSecondary"
        className="formulario-subtitulo"
        textAlign="left"
      >
        {t("formularioCompra.ingreseDatosTabla")}
      </CustomTypography>
      <TablaDetalles
        detalles={detalles}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        columns={columns}
        onEliminarSeleccionados={onEliminarSeleccionados}
      />

      <Box sx={{ mb: 4, width: "100%" }}>
        <CustomButton
          variant="contained"
          color="primary"
          onClick={onGuardarCompra}
          label={t("formularioCompra.crearCompra")}
        />
      </Box>
    </Box>
  );
};

export default PaginaFormularioCompra;
