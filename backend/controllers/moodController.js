const Mood = require("../models/mood");

const addMood = async (req, res) => {
    try {
        const { mood, note, tags, energy } = req.body;
        const newMood = new Mood({
            userId: req.user,
            mood,
            note,
            tags,
            energy,
        })
        await newMood.save();
        res.status(201).json({ message: 'Mood added successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

const getMoods = async (req, res) => {
    try {
        const moods = await Mood.find({
            userId: req.user
        }).sort({ date: -1 });
        res.status(200).json(moods);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

const deleteMood = async (req, res) => {
    try {
        const moodId = req.params.id;
        const mood = await Mood.findById(moodId);
        if (!mood) {
            return res.status(404).json({ message: 'Mood not found' });
        }
        if (mood.userId.toString() !== req.user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        await Mood.findByIdAndDelete(moodId);
        res.status(200).json({ message: 'Mood deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = { addMood, getMoods, deleteMood };
