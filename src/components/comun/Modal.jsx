import React, { useState } from 'react';
import { Modal, Box, Typography, Button, TextField, Alert } from '@mui/material';

const GeneralModal = ({
  open,
  onClose,
  title,
  subtitle,
  fields,
  onSave,
  validationSchema,
  errorMessage,
  successMessage
}) => {
  const [formValues, setFormValues] = useState({});
  const [errors, setErrors] = useState({});
  const [alertMessage, setAlertMessage] = useState(null);

  const handleChange = (fieldName, value) => {
    setFormValues({ ...formValues, [fieldName]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar los campos con el schema
    const validationErrors = validationSchema ? validationSchema(formValues) : {};
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      const result = await onSave(formValues);
      if (result.success) {
        setAlertMessage({ type: 'success', message: successMessage });
      } else {
        setAlertMessage({ type: 'error', message: errorMessage });
      }
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ ...styles.modal }}>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="subtitle1">{subtitle}</Typography>
        
        {alertMessage && (
          <Alert severity={alertMessage.type}>
            {alertMessage.message}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          {fields.map((field, index) => (
            <Box key={index} sx={{ marginBottom: '1rem' }}>
              <TextField
                label={field.label}
                value={formValues[field.name] || ''}
                onChange={(e) => handleChange(field.name, e.target.value)}
                error={!!errors[field.name]}
                helperText={errors[field.name]}
                {...field.props} // Puedes pasar cualquier otra propiedad como "type", "select", etc.
              />
            </Box>
          ))}
          <Button type="submit">Guardar</Button>
        </form>
      </Box>
    </Modal>
  );
};

// Este en prueba.