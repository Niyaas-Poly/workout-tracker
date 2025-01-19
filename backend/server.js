require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const WorkoutSchema = new mongoose.Schema({
    title: String,
    reps: Number,
    load: Number,
    category: String,
    completed: { type: Boolean, default: false }
});

const Workout = mongoose.model("Workout", WorkoutSchema);

app.get("/api/workouts", async (req, res) => {
    const workouts = await Workout.find();
    res.json(workouts);
});

app.post("/api/workouts", async (req, res) => {
    const { title, reps, load, category } = req.body;
    const newWorkout = await Workout.create({ title, reps, load, category });
    res.json(newWorkout);
});

app.delete("/api/workouts/:id", async (req, res) => {
    const { id } = req.params;
    await Workout.findByIdAndDelete(id);
    res.json({ success: true, id });
});

app.patch("/api/workouts/:id", async (req, res) => {
    const { id } = req.params;
    const updatedWorkout = await Workout.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedWorkout);
});

const PORT = process.env.PORT || 4000;
mongoose.connect(process.env.MONGO_URI, {}).then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
