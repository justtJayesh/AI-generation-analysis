import React, { useState } from "react";
import axios from "axios";
import {
    Brain,
    Sparkles,
    Copy,
    Loader2,
    Check,
    Video,
    MessageSquare,
    Tag,
    Zap,
} from "lucide-react";

const ContentAssistant = () => {
    const [topic, setTopic] = useState("");
    const [niche, setNiche] = useState("fashion");
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [copied, setCopied] = useState({
        hook: false,
        reelIdea: false,
        caption: false,
        hashtags: false,
    });

    const niches = [
        { value: "fashion", label: "Fashion & Style", icon: "👗" },
        { value: "fitness", label: "Fitness & Health", icon: "💪" },
        { value: "finance", label: "Finance & Business", icon: "💰" },
        { value: "food", label: "Food & Cooking", icon: "🍳" },
        { value: "travel", label: "Travel & Adventure", icon: "✈️" },
        { value: "tech", label: "Technology", icon: "📱" },
        { value: "lifestyle", label: "Lifestyle", icon: "🌟" },
        { value: "beauty", label: "Beauty & Skincare", icon: "💄" },
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!topic.trim()) return;

        setLoading(true);
        setError(null);

        try {
            const res = await axios.post("https://ai-content-generator-backend-i83z.onrender.com/api/generate", {
                topic,
                niche,
            });
            setResponse(res.data.data);
        } catch (err) {
            setError("Failed to generate content. Please try again.");
            console.error("API Error:", err);
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = (text, section) => {
        navigator.clipboard.writeText(text);
        setCopied((prev) => ({ ...prev, [section]: true }));
        setTimeout(() => {
            setCopied((prev) => ({ ...prev, [section]: false }));
        }, 2000);
    };

    return (
        <div className="py-8 bg-gray-50">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm mb-4">
                        <Brain className="w-4 h-4 mr-2" />
                        AI Content Assistant
                    </div>
                    <h1 className="text-3xl font-bold mb-4">
                        Generate Viral Content Ideas
                    </h1>
                    <p className="text-lg text-gray-600">
                        Let AI help you create engaging content that resonates
                        with your audience
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Input Form */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="topic" className="block mb-2">
                                    Content Topic
                                </label>
                                <input
                                    type="text"
                                    id="topic"
                                    value={topic}
                                    onChange={(e) => setTopic(e.target.value)}
                                    placeholder="e.g., summer fashion trends, workout routines, investment tips..."
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-2">
                                    Content Niche
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                    {niches.map((nicheOption) => (
                                        <label
                                            key={nicheOption.value}
                                            className={`flex items-center p-2 rounded border ${
                                                niche === nicheOption.value
                                                    ? "border-blue-500 bg-blue-50"
                                                    : "border-gray-200"
                                            }`}
                                        >
                                            <input
                                                type="radio"
                                                name="niche"
                                                value={nicheOption.value}
                                                checked={
                                                    niche === nicheOption.value
                                                }
                                                onChange={(e) =>
                                                    setNiche(e.target.value)
                                                }
                                                className="sr-only"
                                            />
                                            <span className="text-xl mr-2">
                                                {nicheOption.icon}
                                            </span>
                                            <span className="text-sm">
                                                {nicheOption.label}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading || !topic.trim()}
                                className="w-full flex items-center justify-center p-2 bg-blue-600 text-white rounded disabled:opacity-50"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                        Generating Ideas...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="w-5 h-5 mr-2" />
                                        Generate Content Ideas
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Results */}
                    <div className="space-y-4">
                        {error && (
                            <div className="bg-red-100 border border-red-200 rounded p-4">
                                <div className="flex items-center">
                                    <span className="text-red-600 mr-2">
                                        ⚠️
                                    </span>
                                    <p className="text-red-700">{error}</p>
                                </div>
                            </div>
                        )}

                        {loading && (
                            <div className="bg-white rounded-lg shadow p-6">
                                <div className="flex items-center justify-center">
                                    <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                                </div>
                            </div>
                        )}

                        {response && (
                            <div className="space-y-4">
                                {/* Hook */}
                                <div className="bg-white rounded-lg shadow p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center">
                                            <Zap className="w-5 h-5 text-yellow-500 mr-2" />
                                            <h3 className="font-medium">
                                                Hook
                                            </h3>
                                        </div>
                                        <button
                                            onClick={() =>
                                                copyToClipboard(
                                                    response.hook,
                                                    "hook"
                                                )
                                            }
                                            className="text-gray-500 hover:text-gray-700"
                                        >
                                            {copied.hook ? (
                                                <Check className="w-5 h-5" />
                                            ) : (
                                                <Copy className="w-5 h-5" />
                                            )}
                                        </button>
                                    </div>
                                    <p className="text-gray-700">
                                        {response.hook}
                                    </p>
                                </div>

                                {/* Reel Idea */}
                                <div className="bg-white rounded-lg shadow p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center">
                                            <Video className="w-5 h-5 text-blue-500 mr-2" />
                                            <h3 className="font-medium">
                                                Reel Idea
                                            </h3>
                                        </div>
                                        <button
                                            onClick={() =>
                                                copyToClipboard(
                                                    response.reelIdea,
                                                    "reelIdea"
                                                )
                                            }
                                            className="text-gray-500 hover:text-gray-700"
                                        >
                                            {copied.reelIdea ? (
                                                <Check className="w-5 h-5" />
                                            ) : (
                                                <Copy className="w-5 h-5" />
                                            )}
                                        </button>
                                    </div>
                                    <p className="text-gray-700">
                                        {response.reelIdea}
                                    </p>
                                </div>

                                {/* Caption */}
                                <div className="bg-white rounded-lg shadow p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center">
                                            <MessageSquare className="w-5 h-5 text-blue-500 mr-2" />
                                            <h3 className="font-medium">
                                                Caption
                                            </h3>
                                        </div>
                                        <button
                                            onClick={() =>
                                                copyToClipboard(
                                                    response.caption,
                                                    "caption"
                                                )
                                            }
                                            className="text-gray-500 hover:text-gray-700"
                                        >
                                            {copied.caption ? (
                                                <Check className="w-5 h-5" />
                                            ) : (
                                                <Copy className="w-5 h-5" />
                                            )}
                                        </button>
                                    </div>
                                    <p className="text-gray-700 whitespace-pre-line">
                                        {response.caption}
                                    </p>
                                </div>

                                {/* Hashtags */}
                                <div className="bg-white rounded-lg shadow p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center">
                                            <Tag className="w-5 h-5 text-blue-500 mr-2" />
                                            <h3 className="font-medium">
                                                Hashtags
                                            </h3>
                                        </div>
                                        <button
                                            onClick={() =>
                                                copyToClipboard(
                                                    response.hashtags.join(" "),
                                                    "hashtags"
                                                )
                                            }
                                            className="text-gray-500 hover:text-gray-700"
                                        >
                                            {copied.hashtags ? (
                                                <Check className="w-5 h-5" />
                                            ) : (
                                                <Copy className="w-5 h-5" />
                                            )}
                                        </button>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {response.hashtags.map((tag, index) => (
                                            <span
                                                key={index}
                                                className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-sm"
                                            >
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContentAssistant;
