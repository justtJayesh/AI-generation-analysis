/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#4F46E5",
                secondary: "#10B981",
                background: "#F9FAFB",
                surface: "#FFFFFF",
                text: "#1F2937",
            },
        },
    },
    plugins: [],
};
