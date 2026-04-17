import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function CreateNote() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const validate = () => {
        let tempErrors = {};

        if (!title.trim()) {
            tempErrors.title = "Title is required";
        }

        if (!content.trim()) {
            tempErrors.content = "Content is required";
        }

        setErrors(tempErrors);

        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        try {
            await API.post("/", { title, content });

            toast.success("Note created successfully"); 
            navigate("/");
        } catch (error) {
            toast.error("Failed to create note");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-lg">

                <h2 className="text-2xl font-bold mb-6">Create Note</h2>

                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* TITLE */}
                    <div>
                        <input
                            type="text"
                            placeholder="Title"
                            className={`w-full p-3 border rounded-xl focus:outline-none ${errors.title ? "border-red-500" : "border-gray-300"
                                }`}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />

                        {errors.title && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.title}
                            </p>
                        )}
                    </div>

                    {/* CONTENT */}
                    <div>
                        <textarea
                            placeholder="Content"
                            className={`w-full p-3 border rounded-xl h-32 focus:outline-none ${errors.content ? "border-red-500" : "border-gray-300"
                                }`}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />

                        {errors.content && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.content}
                            </p>
                        )}
                    </div>

                    {/* BUTTON */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700"
                    >
                        Save Note
                    </button>

                </form>
            </div>
        </div>
    );
}

export default CreateNote;