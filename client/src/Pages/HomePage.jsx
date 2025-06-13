import React from "react";
import { Link } from "react-router-dom";
import { Brain, BarChart3, ArrowRight } from "lucide-react";

const HomePage = () => {
    return (
        <div>
            {/* Features Section */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">
                            Everything You Need to Succeed
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Powerful tools designed to help creators build,
                            grow, and monetize their audience
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* AI Content Assistant Card */}
                        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                            <div className="flex items-center mb-6">
                                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                                    <Brain className="w-6 h-6 text-white" />
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-xl font-bold">
                                        AI Content Assistant
                                    </h3>
                                    <p className="text-gray-600">
                                        Generate viral content ideas instantly
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-3 mb-6">
                                <div className="flex items-center text-gray-700">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                                    <span>
                                        AI-generated reel and post ideas
                                    </span>
                                </div>
                                <div className="flex items-center text-gray-700">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                                    <span>Engaging captions and hooks</span>
                                </div>
                                <div className="flex items-center text-gray-700">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                                    <span>Trending hashtag suggestions</span>
                                </div>
                                <div className="flex items-center text-gray-700">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                                    <span>
                                        Niche-specific content strategies
                                    </span>
                                </div>
                            </div>

                            <Link
                                to="/content-assistant"
                                className="flex items-center justify-center w-full px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700"
                            >
                                Start Creating
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                        </div>

                        {/* Analytics Dashboard Card */}
                        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                            <div className="flex items-center mb-6">
                                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                                    <BarChart3 className="w-6 h-6 text-white" />
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-xl font-bold">
                                        Analytics Dashboard
                                    </h3>
                                    <p className="text-gray-600">
                                        Track performance and growth
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-3 mb-6">
                                <div className="flex items-center text-gray-700">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                                    <span>
                                        Real-time follower growth tracking
                                    </span>
                                </div>
                                <div className="flex items-center text-gray-700">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                                    <span>Engagement rate analysis</span>
                                </div>
                                <div className="flex items-center text-gray-700">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                                    <span>Optimal posting time insights</span>
                                </div>
                                <div className="flex items-center text-gray-700">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                                    <span>Content performance metrics</span>
                                </div>
                            </div>

                            <Link
                                to="/analytics"
                                className="flex items-center justify-center w-full px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700"
                            >
                                View Analytics
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
