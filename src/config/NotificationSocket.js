import { Stomp } from '@stomp/stompjs';
import store from '@/context/store';
import { addNotification } from '@/context/slices/notificationSlice';

const notificationSocket = () => {
    // Configura el cliente STOMP y heartbeats
    const stompClient = Stomp.client('ws://localhost:8080/ws-notifications');
    stompClient.heartbeat.incoming = 10000; // 10 segundos para recibir
    stompClient.heartbeat.outgoing = 10000; // 10 segundos para enviar

    // Función para conectar y gestionar reconexión automática
    const connectWebSocket = () => {
        stompClient.connect({}, () => {
            console.log("Connected to WebSocket");
            stompClient.subscribe("/topic/notifications", (message) => {
                store.dispatch(addNotification(JSON.parse(message.body)));
            });
        }, (error) => {
            console.error("WebSocket connection error", error);
            setTimeout(() => {
                connectWebSocket(); // Intento de reconexión
            }, 5000); // Reconectar después de 5 segundos
        });
    };

    // Llama a la función de conexión inicial
    connectWebSocket();

    // Retorna una función para desconectar el socket
    return () => {
        if (stompClient) stompClient.disconnect();
    };
};

export default notificationSocket;