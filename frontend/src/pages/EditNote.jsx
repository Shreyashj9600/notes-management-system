import { useEffect, useState } from "react";
import API from "../services/api";
import { useParams, useNavigate } from "react-router-dom";

function EditNote() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        loadNote();
    }, []);

    const loadNote = async () => {
        const res = await API.get(`/notes/${id}`);
        setTitle(res.data.title);
        setContent(res.data.content);
    };

   const handleUpdate = async (e) => {
    e.preventDefault();

    try {
        await API.put(`/notes/${id}`, { title, content });

        navigate("/", {
            state: { message: "Note updated successfully" }
        });

    } catch (error) {
        console.log(error);
    }
};
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-lg">

                <h2 className="text-2xl font-bold mb-6">Edit Note</h2>

                <form onSubmit={handleUpdate} className="space-y-4">

                    <input
                        className="w-full p-3 border rounded-xl"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <textarea
                        className="w-full p-3 border rounded-xl h-32"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />

                    <button className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700">
                        Update Note
                    </button>

                </form>

            </div>
        </div>
    );
}

export default EditNote;