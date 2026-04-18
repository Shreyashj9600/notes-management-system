import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate, useLocation } from "react-router-dom";

import { FiPlus, FiEdit3, FiTrash2, FiSearch, FiEye } from "react-icons/fi";
import { FaRegStickyNote } from "react-icons/fa";
import { toast } from "react-toastify";

function Home() {
    const [notes, setNotes] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const location = useLocation();

    const fetchNotes = async (query = "") => {
        try {
            setLoading(true);

            const res = await API.get(`/notes?search=${query}`);

            const data = res.data;

            if (Array.isArray(data)) {
                setNotes(data);
            } else if (Array.isArray(data?.notes)) {
                setNotes(data.notes);
            } else {
                setNotes([]);
            }

        } catch (error) {
            console.log(error);
            setNotes([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    useEffect(() => {
        const message = location.state?.message;

        if (message) {
            toast.success(message);
            navigate(location.pathname, { replace: true, state: {} });
        }
    }, [location, navigate]);

    const deleteNote = async (id) => {
        if (!window.confirm("Are you sure you want to delete this note?")) return;

        try {
            await API.delete(`/notes/${id}`);
            toast.success("Note deleted successfully");
            fetchNotes(search);
        } catch (error) {
            toast.error("Failed to delete note");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold flex items-center gap-2">
                    <FaRegStickyNote />
                    Notes Manager
                </h1>

                <button
                    onClick={() => navigate("/create")}
                    className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
                >
                    <FiPlus />
                    New Note
                </button>
            </div>

            {/* SEARCH */}
            <div className="mb-6 relative">
                <FiSearch className="absolute top-3 left-3 text-gray-400" />

                <input
                    className="w-full pl-10 p-3 border rounded"
                    placeholder="Search notes..."
                    value={search}
                    onChange={(e) => {
                        const value = e.target.value;
                        setSearch(value);
                        fetchNotes(value);
                    }}
                />
            </div>

            {/* EMPTY STATE */}
            {loading ? (
                <div className="flex flex-col items-center justify-center mt-20">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

                    <p className="mt-3 text-gray-600 text-sm">
                        Loading your notes...
                    </p>
                </div>
            ) : notes.length === 0 ? (
                <p className="text-center text-gray-500 mt-10">
                    No notes found
                </p>
            ) : (
                <div className="grid md:grid-cols-3 gap-4">

                    {notes.map((note) => (
                        <div
                            key={note._id}
                            className="bg-white p-4 rounded shadow flex flex-col justify-between"
                        >

                            {/* TITLE */}
                            <h2 className="font-bold text-lg mb-2">
                                {note.title}
                            </h2>

                            {/* CONTENT */}
                            <p className="text-gray-600 mb-3">
                                {note.content}
                            </p>

                            {/* TIME */}
                            <div className="text-xs text-gray-500 mb-3 border-t border-b py-5 flex justify-between">
                                <p>
                                    Created:{" "}
                                    {note.createdAt
                                        ? new Date(note.createdAt).toLocaleString()
                                        : "N/A"}
                                </p>

                                <p>
                                    Updated:{" "}
                                    {note.updatedAt
                                        ? new Date(note.updatedAt).toLocaleString()
                                        : "N/A"}
                                </p>
                            </div>

                            {/* ACTIONS */}
                            <div className="flex justify-between">

                                <button
                                    onClick={() => navigate(`/note/${note._id}`)}
                                    className="text-green-600 flex items-center gap-1"
                                >
                                    <FiEye />
                                    View
                                </button>

                                <button
                                    onClick={() => navigate(`/edit/${note._id}`)}
                                    className="text-blue-600 flex items-center gap-1"
                                >
                                    <FiEdit3 />
                                    Edit
                                </button>

                                <button
                                    onClick={() => deleteNote(note._id)}
                                    className="text-red-600 flex items-center gap-1"
                                >
                                    <FiTrash2 />
                                    Delete
                                </button>

                            </div>

                        </div>
                    ))}

                </div>
            )}
        </div>
    );
}

export default Home;