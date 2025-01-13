import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

/**
 * TablaEditableDetalles - Componente para gestionar la edición de cantidad entregada y observaciones.
 *
 * @param {Array} detalles - Lista de detalles a mostrar y editar.
 * @param {Array} columns - Configuración de las columnas de la tabla.
 * @param {Function} onUpdateDetalle - Función para manejar la actualización de los valores de cada fila.
 */
const TablaEditableDetalles = ({ detalles = [], columns = [], onUpdateDetalle }) => {
  const { t } = useTranslation();

  return (
    <TableContainer component={Paper} sx={{ mt: 3 }}>
      <Table aria-label="Detalles de entrega">
        <TableHead>
          <TableRow>
            {columns.map((column, index) => (
              <TableCell key={index} style={{ flex: column.flex }}>
                {column.header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {detalles.length > 0 ? (
            detalles.map((detalle, index) => (
              <TableRow key={index} hover>
                {columns.map((column, colIndex) => (
                  <TableCell key={colIndex}>
                    {column.editable ? (
                      column.renderCell
                        ? column.renderCell({
                            row: detalle,
                            id: detalle.id,
                            index,
                          })
                        : (
                          <TextField
                            type={column.type || "text"}
                            value={detalle[column.field] || ""}
                            onChange={(e) =>
                              onUpdateDetalle(index, column.field, e.target.value)
                            }
                            fullWidth
                            variant="standard"
                            inputProps={{ min: 0 }}
                          />
                        )
                    ) : (
                      detalle[column.field] || t("formularioEntrega.datoDesconocido")
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} align="center">
                {t("formularioEntrega.sinDatos")}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TablaEditableDetalles;