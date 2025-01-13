import React from "react";
import { Box, Grid } from "@mui/material";
import CustomTextField from "@/components/comun/CustomTextField";
import CustomButton from "@/components/comun/CustomButton";
import CustomTypography from "@/components/comun/CustomTypography";
import TablaEditableDetalles from "@/components/comun/TablaEditableDetalles";
import { useTranslation } from "react-i18next";

/**
 * Página para gestionar el formulario de entrega de requisas.
 */
const PaginaFormularioEntregaRequisa = ({
  entrega,
  detalles,
  columns, // Recibe las columnas como prop
  onInputChange,
  onUpdateDetalle,
  onGuardarEntrega,
}) => {
  const { t } = useTranslation();

  return (
    <Box className="formulario-container">
      <CustomTypography variant="h4" className="formulario-titulo" textAlign="left">
        {t("formularioEntrega.titulo")}
      </CustomTypography>

      {/* Datos generales */}
      <Grid container spacing={2} className="formulario-grid">
        <Grid item xs={12} sm={4}>
          <CustomTextField
            label={t("formularioEntrega.requisaId")}
            name="requisaId"
            value={entrega.requisaId}
            fullWidth
            InputProps={{ readOnly: true }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <CustomTextField
            label={t("formularioEntrega.codigoUnico")}
            name="codigoUnico"
            value={entrega.codigoUnico}
            fullWidth
            InputProps={{ readOnly: true }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <CustomTextField
            label={t("formularioEntrega.sitio")}
            name="nombreSitio"
            value={entrega.nombreSitio}
            fullWidth
            InputProps={{ readOnly: true }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <CustomTextField
            label={t("formularioEntrega.estado")}
            name="nombreEstado"
            value={entrega.nombreEstado}
            fullWidth
            InputProps={{ readOnly: true }}
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <CustomTextField
            label={t("formularioEntrega.observacionesEntrega")}
            name="observacionesEntrega"
            value={entrega.observacionesEntrega}
            onChange={onInputChange}
            fullWidth
            multiline
            rows={3}
          />
        </Grid>
      </Grid>

      <CustomTypography variant="h5" className="formulario-titulo" mt={7} textAlign="left">
        {t("formularioEntrega.detalles")}
      </CustomTypography>

      {/* Tabla de detalles */}
      <Box>
        <TablaEditableDetalles
          detalles={detalles}
          columns={columns} // Utiliza las columnas proporcionadas
          onUpdateDetalle={onUpdateDetalle}
        />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <CustomButton
          variant="contained"
          color="primary"
          onClick={onGuardarEntrega}
          label={t("formularioEntrega.guardar")}
        />
      </Box>
    </Box>
  );
};

export default PaginaFormularioEntregaRequisa;