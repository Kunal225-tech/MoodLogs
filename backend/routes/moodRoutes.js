const express = require("express");
const router = express.Router();

const { addMood,getMoods , deleteMood } = require("../controllers/moodController");
const { protect } = require("../middlewares/authMiddleware");

router.post("/add", protect, addMood);

router.get("/", protect, getMoods);

router.delete("/:id", protect, deleteMood);

module.exports = router;