import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const EngagementChart = ({ data }) => {
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                titleColor: "white",
                bodyColor: "white",
                displayColors: false,
                callbacks: {
                    title: (context) => `Post ${context[0].dataIndex + 1}`,
                    label: (context) => `Total Engagement: ${context.parsed.y}`,
                },
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    color: "#6B7280",
                },
            },
            y: {
                grid: {
                    color: "rgba(0, 0, 0, 0.05)",
                },
                ticks: {
                    color: "#6B7280",
                },
            },
        },
    };

    return (
        <div className="h-80">
            <Bar data={data} options={options} />
        </div>
    );
};

export default EngagementChart;
