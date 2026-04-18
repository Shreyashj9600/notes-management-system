import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import { FiArrowLeft } from "react-icons/fi";

function ViewNote() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [note, setNote] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchNote = async () => {
        try {
            setLoading(true);
            const res = await API.get(`/notes/${id}`);
            setNote(res.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNote();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-gray-500">
 
                <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>

                <p className="mt-4 text-sm font-medium">Loading note...</p>
            </div>
        );
    }

    if (!note) {
        return (
            <div className="min-h-screen flex items-center justify-center text-red-500">
                Note not found
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-gray-100 p-6">

            {/* BACK BUTTON */}
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-indigo-600 font-medium hover:text-indigo-800 mb-6 transition"
            >
                <FiArrowLeft />
                Back
            </button>

            {/* CENTER */}
            <div className="flex justify-center">
                <div className="w-full max-w-2xl">

                    {/* MAIN CARD */}
                    <div className="bg-white/80 backdrop-blur-lg border border-gray-200 shadow-xl rounded-3xl p-8 transition hover:shadow-2xl">

                        {/* TITLE */}
                        <h1 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight">
                            {note.title}
                        </h1>

                        {/* META INFO */}
                        <div className="bg-linear-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-2xl p-5 mb-6 text-sm text-gray-600 space-y-2">
                            <p>
                                <span className="font-semibold text-gray-800">Created:</span>{" "}
                                {new Date(note.createdAt).toLocaleString()}
                            </p>
                            <p>
                                <span className="font-semibold text-gray-800">Updated:</span>{" "}
                                {new Date(note.updatedAt).toLocaleString()}
                            </p>
                        </div>

                        {/* CONTENT */}
                        <div className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">
                            {note.content}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewNote;