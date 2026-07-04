const Gratitude = require("../models/gratitude");

async function addGratitude(req, res) {
    try {
        const { text, color, xOffset, rotation } = req.body;
        const userId = req.user;

        if (!text) {
            return res.status(400).json({ message: "Text is required" });
        }

        const gratitude = new Gratitude({
            userId,
            text,
            color,
            xOffset,
            rotation
        });

        const savedGratitude = await gratitude.save();

        return res.status(201).json(savedGratitude);
    } catch (error) {
        console.error("Error adding gratitude:", error);
        return res.status(500).json({ message: "Server error" });
    }
}

async function getGratitudes(req, res) {
    try {
        const gratitudes = await Gratitude.find({ userId: req.user }).sort({ date: 1 });
        return res.status(200).json(gratitudes);
    } catch (error) {
        console.error("Error fetching gratitudes:", error);
        return res.status(500).json({ message: "Server error" });
    }
}

module.exports = { addGratitude, getGratitudes };
