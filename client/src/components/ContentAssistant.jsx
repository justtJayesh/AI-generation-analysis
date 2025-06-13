import { useState } from "react";
import { Loader2, Copy, Check } from "lucide-react";

const ContentAssistant = () => {
    const [topic, setTopic] = useState("");
    const [niche, setNiche] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [content, setContent] = useState(null);
    const [copied, setCopied] = useState({
        hook: false,
        reelIdea: false,
        caption: false,
        hashtags: false,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setContent(null);

        try {
            const response = await fetch("http://localhost:3000/api/generate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ topic, niche }),
            });

            const data = await response.json();
            if (!data.success) {
                throw new Error(data.error || "Failed to generate content");
            }
            setContent(data.data);
        } catch (err) {
            setError(err.message);
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
        <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="mb-8">
                <div className="mb-4">
                    <label htmlFor="topic" className="block mb-2">
                        Topic
                    </label>
                    <input
                        type="text"
                        id="topic"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className="w-full p-2 border rounded"
                        placeholder="Enter your topic"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="niche" className="block mb-2">
                        Niche
                    </label>
                    <input
                        type="text"
                        id="niche"
                        value={niche}
                        onChange={(e) => setNiche(e.target.value)}
                        className="w-full p-2 border rounded"
                        placeholder="Enter your niche"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white p-2 rounded disabled:opacity-50"
                >
                    {loading ? (
                        <div className="flex items-center justify-center">
                            <Loader2 className="animate-spin mr-2" />
                            Generating...
                        </div>
                    ) : (
                        "Generate Content"
                    )}
                </button>
            </form>

            {error && (
                <div className="mb-6 p-4 bg-red-100 border border-red-200 rounded">
                    <p className="text-red-600">{error}</p>
                </div>
            )}

            {content && (
                <div className="space-y-6">
                    <div className="p-4 bg-white border rounded">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-lg font-medium">Hook</h3>
                            <button
                                onClick={() =>
                                    copyToClipboard(content.hook, "hook")
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
                        <p className="text-gray-600">{content.hook}</p>
                    </div>

                    <div className="p-4 bg-white border rounded">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-lg font-medium">Reel Idea</h3>
                            <button
                                onClick={() =>
                                    copyToClipboard(
                                        content.reelIdea,
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
                        <p className="text-gray-600">{content.reelIdea}</p>
                    </div>

                    <div className="p-4 bg-white border rounded">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-lg font-medium">Caption</h3>
                            <button
                                onClick={() =>
                                    copyToClipboard(content.caption, "caption")
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
                        <p className="text-gray-600 whitespace-pre-line">
                            {content.caption}
                        </p>
                    </div>

                    <div className="p-4 bg-white border rounded">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-lg font-medium">Hashtags</h3>
                            <button
                                onClick={() =>
                                    copyToClipboard(
                                        content.hashtags.join(" "),
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
                            {content.hashtags.map((tag, index) => (
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
    );
};

export default ContentAssistant;
