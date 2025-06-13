import React from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import HomePage from "./Pages/HomePage";
import ContentAssistant from "./Pages/ContentAssistant";
import Analytics from "./Pages/Analytics";

function App() {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route
                    path="/content-assistant"
                    element={<ContentAssistant />}
                />
                <Route path="/analytics" element={<Analytics />} />
            </Routes>
        </Layout>
    );
}

export default App;
