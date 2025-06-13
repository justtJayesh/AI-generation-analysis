import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const FollowerGrowthChart = ({ data }) => {
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
                    title: (context) => `Day ${context[0].dataIndex + 1}`,
                    label: (context) =>
                        `Followers: ${context.parsed.y.toLocaleString()}`,
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
                    callback: (value) => value.toLocaleString(),
                },
            },
        },
        elements: {
            point: {
                radius: 4,
                hoverRadius: 6,
            },
            line: {
                tension: 0.3,
            },
        },
    };

    return (
        <div className="h-80">
            <Line data={data} options={options} />
        </div>
    );
};

export default FollowerGrowthChart;
