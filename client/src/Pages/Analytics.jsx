import React, { useState } from "react";
import {
    BarChart3,
    TrendingUp,
    Users,
    Heart,
    MessageCircle,
    Clock,
    RefreshCw,
    Download,
    Upload,
    AlertCircle,
    Check,
} from "lucide-react";
import FileUpload from "../components/FileUpload";
import FollowerGrowthChart from "../components/charts/FollowerGrowthChart";
import { mockAnalyticsData } from "../data/mockAnalytics";
import EngagementChart from "../components/charts/EngagementChart";

const Analytics = () => {
    const [analyticsData, setAnalyticsData] = useState(mockAnalyticsData);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showUpload, setShowUpload] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);

    const generateChartData = (data) => {
        // Generate follower growth chart data
        const followerData = {
            labels:
                data.dates ||
                data.followers.map((_, index) => `Day ${index + 1}`),
            datasets: [
                {
                    label: "Followers",
                    data: data.followers,
                    borderColor: "#3B82F6",
                    backgroundColor: "rgba(59, 130, 246, 0.1)",
                    tension: 0.3,
                    fill: true,
                },
            ],
        };

        // Generate engagement chart data
        const engagementData = {
            labels: data.engagement.map(
                (post) => post.title || `Post ${post.post}`
            ),
            datasets: [
                {
                    label: "Total Engagement",
                    data: data.engagement.map(
                        (post) => post.likes + post.comments
                    ),
                    backgroundColor: "rgba(59, 130, 246, 0.8)",
                    borderColor: "rgba(59, 130, 246, 1)",
                    borderWidth: 1,
                },
            ],
        };

        return { followerData, engagementData };
    };

    const { followerData, engagementData } = generateChartData(analyticsData);

    const validateDataStructure = (data) => {
        // Check if all required fields exist
        const requiredFields = [
            "followers",
            "engagement",
            "bestPostTime",
            "dates",
        ];
        const missingFields = requiredFields.filter(
            (field) => !(field in data)
        );

        if (missingFields.length > 0) {
            setError(`Missing required fields: ${missingFields.join(", ")}`);
            return false;
        }

        // Validate followers array
        if (!Array.isArray(data.followers)) {
            setError("Followers data must be an array");
            return false;
        }

        if (data.followers.length === 0) {
            setError("Followers array cannot be empty");
            return false;
        }

        // Validate engagement array
        if (!Array.isArray(data.engagement)) {
            setError("Engagement data must be an array");
            return false;
        }

        if (data.engagement.length === 0) {
            setError("Engagement array cannot be empty");
            return false;
        }

        // Validate each engagement item
        const invalidPosts = data.engagement.filter((post) => {
            const hasRequiredFields =
                "post" in post && "likes" in post && "comments" in post;
            const hasValidTypes =
                typeof post.post === "number" &&
                typeof post.likes === "number" &&
                typeof post.comments === "number";
            return !hasRequiredFields || !hasValidTypes;
        });

        if (invalidPosts.length > 0) {
            setError(
                `Invalid engagement data in posts: ${invalidPosts
                    .map((p) => p.post)
                    .join(
                        ", "
                    )}. Each post must have numeric 'post', 'likes', and 'comments' fields.`
            );
            return false;
        }

        // Validate dates array
        if (!Array.isArray(data.dates)) {
            setError("Dates must be an array");
            return false;
        }

        if (data.dates.length !== data.followers.length) {
            setError("Dates array length must match followers array length");
            return false;
        }

        // Validate bestPostTime
        if (typeof data.bestPostTime !== "string") {
            setError("Best post time must be a string");
            return false;
        }

        return true;
    };

    const handleFileUpload = (newData) => {
        setLoading(true);
        setError(null);
        setUploadSuccess(false);

        try {
            if (!validateDataStructure(newData)) {
                setLoading(false);
                return;
            }

            setTimeout(() => {
                setAnalyticsData(newData);
                setShowUpload(false);
                setLoading(false);
                setUploadSuccess(true);

                setTimeout(() => {
                    setUploadSuccess(false);
                }, 3000);
            }, 1000);
        } catch (error) {
            setError(`Error processing data: ${error.message}`);
            setLoading(false);
        }
    };

    const handleError = (errorMessage) => {
        setError(errorMessage);
        setLoading(false);
    };

    const downloadSampleData = () => {
        const sampleData = {
            followers: [980, 1020, 1055, 1100, 1125, 1170, 1210],
            engagement: [
                {
                    post: 1,
                    likes: 280,
                    comments: 22,
                    title: "City Lights at Night",
                    date: "2024-01-20",
                },
                {
                    post: 2,
                    likes: 360,
                    comments: 35,
                    title: "Morning Coffee Routine",
                    date: "2024-01-19",
                },
                {
                    post: 3,
                    likes: 245,
                    comments: 18,
                    title: "Hiking Adventures",
                    date: "2024-01-18",
                },
            ],
            bestPostTime: "Friday 6 PM",
            dates: [
                "2024-01-14",
                "2024-01-15",
                "2024-01-16",
                "2024-01-17",
                "2024-01-18",
                "2024-01-19",
                "2024-01-20",
            ],
        };

        const dataStr = JSON.stringify(sampleData, null, 2);
        const dataUri =
            "data:application/json;charset=utf-8," +
            encodeURIComponent(dataStr);
        const exportFileDefaultName = "sample-analytics-data.json";

        const linkElement = document.createElement("a");
        linkElement.setAttribute("href", dataUri);
        linkElement.setAttribute("download", exportFileDefaultName);
        linkElement.click();
    };

    const StatCard = ({ title, value, change, icon, color }) => (
        <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                    <div
                        className={`w-8 h-8 ${color} rounded-lg flex items-center justify-center mr-2`}
                    >
                        {icon}
                    </div>
                    <h3 className="font-medium">{title}</h3>
                </div>
                <div
                    className={`text-sm ${
                        change >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                >
                    {change >= 0 ? "+" : ""}
                    {change}%
                </div>
            </div>
            <div className="text-2xl font-bold">{value}</div>
        </div>
    );

    return (
        <div className="py-8 bg-gray-50">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">
                            Analytics Dashboard
                        </h1>
                        <p className="text-gray-600">
                            Track your social media performance
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setShowUpload(true)}
                            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            <Upload className="w-4 h-4 mr-2" />
                            Upload Data
                        </button>
                        <button
                            onClick={downloadSampleData}
                            className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                        >
                            <Download className="w-4 h-4 mr-2" />
                            Sample Data
                        </button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid md:grid-cols-4 gap-4 mb-8">
                    <StatCard
                        title="Total Followers"
                        value={
                            analyticsData.followers[
                                analyticsData.followers.length - 1
                            ]
                        }
                        change={5.2}
                        icon={<Users className="w-5 h-5 text-white" />}
                        color="bg-blue-600"
                    />
                    <StatCard
                        title="Total Engagement"
                        value={analyticsData.engagement.reduce(
                            (sum, post) => sum + post.likes + post.comments,
                            0
                        )}
                        change={8.4}
                        icon={<Heart className="w-5 h-5 text-white" />}
                        color="bg-red-600"
                    />
                    <StatCard
                        title="Avg. Engagement"
                        value={Math.round(
                            analyticsData.engagement.reduce(
                                (sum, post) => sum + post.likes + post.comments,
                                0
                            ) / analyticsData.engagement.length
                        )}
                        change={-2.1}
                        icon={<MessageCircle className="w-5 h-5 text-white" />}
                        color="bg-green-600"
                    />
                    <StatCard
                        title="Best Post Time"
                        value={analyticsData.bestPostTime}
                        change={0}
                        icon={<Clock className="w-5 h-5 text-white" />}
                        color="bg-purple-600"
                    />
                </div>

                {/* Charts */}
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h2 className="text-lg font-medium mb-4">
                            Follower Growth
                        </h2>
                        <FollowerGrowthChart data={followerData} />
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h2 className="text-lg font-medium mb-4">
                            Engagement Analysis
                        </h2>
                        <EngagementChart data={engagementData} />
                    </div>
                </div>

                {/* Upload Modal */}
                {showUpload && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white p-6 rounded-lg max-w-md w-full">
                            <h2 className="text-xl font-bold mb-4">
                                Upload Analytics Data
                            </h2>
                            <FileUpload
                                onUpload={handleFileUpload}
                                onError={handleError}
                            />
                            <button
                                onClick={() => setShowUpload(false)}
                                className="mt-4 w-full px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}

                {/* Success Message */}
                {uploadSuccess && (
                    <div className="fixed bottom-4 right-4 bg-green-100 border border-green-200 rounded p-4 flex items-center">
                        <Check className="w-5 h-5 text-green-600 mr-2" />
                        <p className="text-green-700">
                            Data uploaded successfully!
                        </p>
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="fixed bottom-4 right-4 bg-red-100 border border-red-200 rounded p-4 flex items-center">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                        <p className="text-red-700">{error}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Analytics;
