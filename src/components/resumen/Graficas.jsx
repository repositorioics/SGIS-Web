import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import '@/assets/styles/resumen/graficas.css';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement);

const Graficas = () => {
  const datosBarras = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
    datasets: [
      {
        label: 'Compras',
        data: [65, 59, 80, 81, 56],
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  };

  const datosLineas = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
    datasets: [
      {
        label: 'Requisas',
        data: [28, 48, 40, 19, 86],
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  return (
    <div className="graficas">
      <div className="grafica">
        <h3 className="grafica__titulo">Compras Mensuales</h3>
        <Bar data={datosBarras} options={{ responsive: true }} />
      </div>
      <div className="grafica">
        <h3 className="grafica__titulo">Requisas Mensuales</h3>
        <Line data={datosLineas} options={{ responsive: true }} />
      </div>
    </div>
  );
};

export default Graficas;