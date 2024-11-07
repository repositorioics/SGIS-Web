import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Checkbox,
  TextField,
  MenuItem,
  Select,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTranslation } from 'react-i18next';

/**
 * Obtiene el valor anidado de un objeto usando una cadena de campo.
 * @param {Object} obj - El objeto desde el cual obtener el valor.
 * @param {string} path - La cadena que representa la ruta al valor.
 * @returns {any} - El valor en la ruta especificada, o un texto de ejemplo si no se encuentra.
 */
const obtenerValor = (obj, path, textoEjemplo) => {
  return path.split('.').reduce((acc, key) => acc && acc[key], obj) || textoEjemplo;
};

/**
 * TablaDetalles - Componente para mostrar detalles en una tabla reutilizable.
 *
 * @param {Array} detalles - Lista de detalles para mostrar en la tabla.
 * @param {Array} columns - Definición de las columnas, incluyendo header y field.
 * @param {Function} handleRemoveDetail - Función para manejar la eliminación de una fila.
 * @param {Function} onSelectRow - Función para manejar la selección de una fila (cuando seleccionMultiple es true).
 * @param {Function} onUpdateDetail - Función para manejar la actualización de los valores de clasificación y observación.
 * @param {boolean} seleccionMultiple - Define si se muestra la selección múltiple (checkboxes) o el botón de eliminar.
 */
const TablaDetalles = ({ detalles = [], columns = [], handleRemoveDetail, onSelectRow, onUpdateDetail, seleccionMultiple = false }) => {
  const { t } = useTranslation();

  return (
    <TableContainer component={Paper} sx={{ mt: 3 }}>
      <Table aria-label="Detalles de la solicitud">
        <TableHead>
          <TableRow>
            {seleccionMultiple && <TableCell>{t("accionesTable.seleccionar")}</TableCell>}
            {columns.map((col, index) => (
              <TableCell key={index}>{t(col.header)}</TableCell>
            ))}
            {!seleccionMultiple && <TableCell>{t("accionesTable.eliminar")}</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {detalles.length > 0 ? (
            detalles.map((detalle, index) => (
              <TableRow key={index} hover>
                {seleccionMultiple && (
                  <TableCell>
                    <Checkbox
                      onChange={(e) => onSelectRow(detalle, e.target.checked)}
                      inputProps={{ 'aria-label': 'select-row' }}
                    />
                  </TableCell>
                )}
                {columns.map((col, colIndex) => (
                  <TableCell key={colIndex}>
                    {/* Campo editable para Clasificación */}
                    {col.field === 'clasificacion' ? (
                      <Select
                        value={detalle.clasificacion || 'PROGRAMADO'}
                        onChange={(e) => onUpdateDetail(index, 'clasificacion', e.target.value)}
                        fullWidth
                        variant="standard" // Cambia a "standard" para eliminar borde adicional
                        disableUnderline // Quita la línea inferior
                      >
                        <MenuItem value="PROGRAMADO">{t('pedido.urgente')}</MenuItem>
                        <MenuItem value="URGENTE">{t('pedido.normal')}</MenuItem>
                      </Select>
                    ) : col.field === 'observacion' ? (
                      // Campo editable para Observación
                      <TextField
                        value={detalle.observacion || ''}
                        onChange={(e) => onUpdateDetail(index, 'observacion', e.target.value)}
                        fullWidth
                        variant="standard" // Cambia a "standard" para quitar borde extra
                        InputProps={{ disableUnderline: true }} // Elimina la línea inferior
                      />
                    ) : (
                      obtenerValor(detalle, col.field, t('formularioInsumo.textoEjemplo'))
                    )}
                  </TableCell>
                ))}
                {!seleccionMultiple && (
                  <TableCell>
                    <IconButton
                      color="error"
                      onClick={() => handleRemoveDetail(index)}
                      aria-label={t("acciones.eliminar")}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                )}
              </TableRow>
            ))
          ) : (
            <TableRow>
              {seleccionMultiple && <TableCell />}
              {columns.map((_, index) => (
                <TableCell key={index}>{t('formularioInsumo.sinDatos')}</TableCell>
              ))}
              {!seleccionMultiple && <TableCell>{t('formularioInsumo.sinDatos')}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TablaDetalles;