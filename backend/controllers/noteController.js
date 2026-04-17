const Note = require("../models/Note");

//
// CREATE NOTE
//
exports.createNote = async (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({
                message: "Title and Content are required",
            });
        }

        const note = await Note.create({ title, content });

        res.status(201).json(note);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//
// GET ALL NOTES + SEARCH
//
exports.getNotes = async (req, res) => {
    try {
        const search = req.query.search || "";

        const notes = await Note.find({
            $or: [
                { title: { $regex: search, $options: "i" } },
                { content: { $regex: search, $options: "i" } },
            ],
        }).sort({ updatedAt: -1 });

        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//
// GET SINGLE NOTE
//
exports.getNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }

        res.json(note);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//
// UPDATE NOTE
//
exports.updateNote = async (req, res) => {
    try {
        const { title, content } = req.body;

        const note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }

        note.title = title || note.title;
        note.content = content || note.content;

        const updatedNote = await note.save();

        res.json(updatedNote);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//
// DELETE NOTE
//
exports.deleteNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }

        await note.deleteOne();

        res.json({ message: "Note deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};