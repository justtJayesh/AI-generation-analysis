import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Brain, BarChart3, Home, Sparkles } from "lucide-react";

const Layout = ({ children }) => {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation */}
            <nav className="bg-white border-b border-gray-200 sticky top-0">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                <Sparkles className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-blue-600">
                                Creator Platform
                            </span>
                        </Link>

                        {/* Navigation Links */}
                        <div className="flex gap-2">
                            <Link
                                to="/"
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                                    isActive("/")
                                        ? "bg-blue-100 text-blue-700"
                                        : "text-gray-600 hover:bg-blue-50"
                                }`}
                            >
                                <Home className="w-4 h-4" />
                                <span>Home</span>
                            </Link>
                            <Link
                                to="/content-assistant"
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                                    isActive("/content-assistant")
                                        ? "bg-blue-100 text-blue-700"
                                        : "text-gray-600 hover:bg-blue-50"
                                }`}
                            >
                                <Brain className="w-4 h-4" />
                                <span>AI Assistant</span>
                            </Link>
                            <Link
                                to="/analytics"
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                                    isActive("/analytics")
                                        ? "bg-blue-100 text-blue-700"
                                        : "text-gray-600 hover:bg-blue-50"
                                }`}
                            >
                                <BarChart3 className="w-4 h-4" />
                                <span>Analytics</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-6">{children}</main>
        </div>
    );
};

export default Layout;
