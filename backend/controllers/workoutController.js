const Workout = require("../models/workoutModel");

// Get all workouts
const getWorkouts = async (req, res) => {
    try {
        const workouts = await Workout.find({}).sort({ createdAt: -1 });
        res.status(200).json(workouts);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch workouts" });
    }
};

// Get single workout
const getWorkout = async (req, res) => {
    const { id } = req.params;
    try {
        const workout = await Workout.findById(id);
        if (!workout) return res.status(404).json({ error: "Workout not found" });
        res.status(200).json(workout);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch workout" });
    }
};

// Create new workout
const createWorkout = async (req, res) => {
    const { title, reps, load, category } = req.body;
    try {
        const workout = await Workout.create({ title, reps, load, category });
        res.status(201).json(workout);
    } catch (error) {
        res.status(400).json({ error: "Failed to create workout" });
    }
};

// Delete a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params;
    try {
        const workout = await Workout.findByIdAndDelete(id);
        if (!workout) return res.status(404).json({ error: "Workout not found" });
        res.status(200).json({ message: "Workout deleted", id });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete workout" });
    }
};

// Update a workout
const updateWorkout = async (req, res) => {
    const { id } = req.params;
    try {
        const workout = await Workout.findByIdAndUpdate(id, req.body, { new: true });
        if (!workout) return res.status(404).json({ error: "Workout not found" });
        res.status(200).json(workout);
    } catch (error) {
        res.status(500).json({ error: "Failed to update workout" });
    }
};

module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
};
