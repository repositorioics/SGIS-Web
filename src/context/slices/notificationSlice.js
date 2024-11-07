// src/context/slices/notificationSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    count: 0, // Cantidad de notificaciones no leídas
    items: [], // Lista de notificaciones
};

const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        addNotification: (state, action) => {
            state.count += 1;
            state.items.push(action.payload);
        },
        resetNotifications: (state) => {
            state.count = 0;
        },
    },
});

export const { addNotification, resetNotifications } = notificationSlice.actions;

export default notificationSlice.reducer;