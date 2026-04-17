import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate, useLocation } from "react-router-dom";

import { FiPlus, FiEdit3, FiTrash2, FiSearch, FiEye } from "react-icons/fi";
import { FaRegStickyNote } from "react-icons/fa";
import { toast } from "react-toastify";

function Home() {
    const [notes, setNotes] = useState([]);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    // FETCH NOTES
    const fetchNotes = async (query = "") => {
        try {
            const res = await API.get(`?search=${query}`);
            setNotes(res.data);
        } catch (error) {
            toast.error("Failed to load notes");
        }
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    useEffect(() => {
        const message = location.state?.message;

        if (message) {
            toast.success(message);

            // clear state safely
            navigate(location.pathname, { replace: true, state: {} });
        }
    }, []);

    // DELETE NOTE
    const deleteNote = async (id) => {
        const ok = window.confirm("Are you sure you want to delete this note?");
        if (!ok) return;

        try {
            await API.delete(`/${id}`);
            toast.success("Note deleted successfully");
            fetchNotes();
        } catch (error) {
            toast.error("Failed to delete note");
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-200 p-6">

            {/* HEADER */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">

                <h1 className="text-4xl font-extrabold text-gray-800 flex items-center gap-3">
                    <FaRegStickyNote className="text-blue-600" />
                    Notes Manager
                </h1>

                <button
                    onClick={() => navigate("/create")}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl shadow-md transition"
                >
                    <FiPlus />
                    New Note
                </button>
            </div>

            {/* SEARCH */}
            <div className="relative mb-8">
                <FiSearch className="absolute top-4 left-4 text-gray-400" />

                <input
                    type="text"
                    placeholder="Search notes..."
                    className="w-full pl-10 p-4 rounded-2xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        fetchNotes(e.target.value);
                    }}
                />
            </div>

            {/* EMPTY STATE */}
            {notes.length === 0 ? (
                <div className="text-center mt-20 text-gray-500">
                    <p className="text-lg">No notes found</p>
                </div>
            ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

                    {notes.map((note) => (
                        <div
                            key={note._id}
                            className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-5 flex flex-col justify-between"
                        >

                            <h2 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">
                                {note.title}
                            </h2>

                            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                {note.content}
                            </p>

                            <div className="text-xs text-gray-500 mb-4 space-y-1 border-t pt-3">
                                <p>Created: {new Date(note.createdAt).toLocaleDateString()}</p>
                                <p>Updated: {new Date(note.updatedAt).toLocaleDateString()}</p>
                            </div>

                            <div className="flex items-center justify-between gap-2 pt-3 border-t">

                                <button
                                    onClick={() => navigate(`/note/${note._id}`)}
                                    className="flex items-center gap-1 flex-1 py-2 rounded-lg text-green-600 hover:bg-green-50 text-sm font-medium"
                                >
                                    <FiEye />
                                    View
                                </button>

                                <button
                                    onClick={() => navigate(`/edit/${note._id}`)}
                                    className="flex items-center gap-1 flex-1 py-2 rounded-lg text-blue-600 hover:bg-blue-50 text-sm font-medium"
                                >
                                    <FiEdit3 />
                                    Edit
                                </button>

                                <button
                                    onClick={() => deleteNote(note._id)}
                                    className="flex items-center gap-1 flex-1 py-2 rounded-lg text-red-600 hover:bg-red-50 text-sm font-medium"
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