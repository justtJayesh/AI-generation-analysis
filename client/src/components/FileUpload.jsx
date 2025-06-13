import React, { useState, useRef } from "react";
import { Upload, X, FileJson } from "lucide-react";

// interface FileUploadProps {
//   onFileUpload: (data: any) => void;
//   onError: (error: string) => void;
// }

const FileUpload = ({ onUpload, onError }) => {
    const [dragActive, setDragActive] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const inputRef = useRef(null);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const handleFile = (file) => {
        if (file.type !== "application/json") {
            onError("Please upload a JSON file");
            return;
        }

        setSelectedFile(file);
        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const jsonData = JSON.parse(e.target.result);
                validateAndProcessData(jsonData);
            } catch (error) {
                onError("Invalid JSON file format");
            }
        };

        reader.onerror = () => {
            onError("Error reading file");
        };

        reader.readAsText(file);
    };

    const validateAndProcessData = (data) => {
        // Validate the structure of the uploaded data
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
            onError(`Missing required fields: ${missingFields.join(", ")}`);
            return;
        }

        // Validate followers array
        if (!Array.isArray(data.followers)) {
            onError("Followers data must be an array");
            return;
        }

        if (data.followers.length === 0) {
            onError("Followers array cannot be empty");
            return;
        }

        // Validate engagement array
        if (!Array.isArray(data.engagement)) {
            onError("Engagement data must be an array");
            return;
        }

        if (data.engagement.length === 0) {
            onError("Engagement array cannot be empty");
            return;
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
            onError(
                `Invalid engagement data in posts: ${invalidPosts
                    .map((p) => p.post)
                    .join(
                        ", "
                    )}. Each post must have numeric 'post', 'likes', and 'comments' fields.`
            );
            return;
        }

        // Validate dates array
        if (!Array.isArray(data.dates)) {
            onError("Dates must be an array");
            return;
        }

        if (data.dates.length !== data.followers.length) {
            onError("Dates array length must match followers array length");
            return;
        }

        // Validate bestPostTime
        if (typeof data.bestPostTime !== "string") {
            onError("Best post time must be a string");
            return;
        }

        // Process and upload the data
        onUpload(data);
    };

    const removeFile = () => {
        setSelectedFile(null);
        if (inputRef.current) {
            inputRef.current.value = "";
        }
    };

    return (
        <div className="bg-white rounded-lg shadow p-4">
            <div
                className={`relative border-2 border-dashed rounded-lg p-6 ${
                    dragActive
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                <input
                    ref={inputRef}
                    type="file"
                    accept=".json"
                    onChange={handleChange}
                    className="hidden"
                />

                {selectedFile ? (
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <FileJson className="w-6 h-6 text-blue-500" />
                            <div>
                                <p className="font-medium">
                                    {selectedFile.name}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {(selectedFile.size / 1024).toFixed(2)} KB
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={removeFile}
                            className="text-gray-400 hover:text-gray-500"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                ) : (
                    <div className="text-center">
                        <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-600 mb-2">
                            Drag and drop your JSON file here, or{" "}
                            <button
                                type="button"
                                onClick={() => inputRef.current?.click()}
                                className="text-blue-600 hover:text-blue-700 font-medium"
                            >
                                browse
                            </button>
                        </p>
                        <p className="text-sm text-gray-500">
                            Only JSON files are supported
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FileUpload;
