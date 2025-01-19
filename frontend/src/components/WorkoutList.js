import React, { useState, useEffect } from "react";
import { deleteWorkout, updateWorkout } from "../api";
import { motion, AnimatePresence } from "framer-motion";

function WorkoutList({ workouts, setWorkouts }) {
    const [filterCategory, setFilterCategory] = useState("All");
    const [search, setSearch] = useState("");
    const [editId, setEditId] = useState(null);
    const [editData, setEditData] = useState({ title: "", reps: "", load: "", category: "" });

    // Animate Progress Bar
    const completedCount = workouts.filter((w) => w.completed).length;
    const progress = workouts.length > 0 ? (completedCount / workouts.length) * 100 : 0;

    useEffect(() => {
        const progressFill = document.querySelector(".progress-fill");
        if (progressFill) {
            progressFill.style.width = `${progress}%`;
        }
    }, [progress]);

    const handleDelete = async (id) => {
        await deleteWorkout(id);
        setWorkouts((prev) => prev.filter((workout) => workout._id !== id));
    };

    const handleEdit = (workout) => {
        setEditId(workout._id);
        setEditData({ title: workout.title, reps: workout.reps, load: workout.load, category: workout.category });
    };

    const handleSaveEdit = async (id) => {
        const updatedWorkout = await updateWorkout(id, editData);
        setWorkouts((prev) => prev.map((w) => (w._id === id ? updatedWorkout : w)));
        setEditId(null);
    };

    const handleComplete = async (id, completed) => {
        const updatedWorkout = await updateWorkout(id, { completed });
        setWorkouts((prev) => prev.map((w) => (w._id === id ? updatedWorkout : w)));
    };

    const handleCategoryChange = (e) => {
        setFilterCategory(e.target.value);
    };

    const filteredWorkouts = workouts
        .filter((w) => filterCategory === "All" || w.category === filterCategory)
        .filter((w) => w.title.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="workout-list">
            <h2>Workout List</h2>
            <div className="progress-container">
                <div className="progress-bar">
                    <div className="progress-fill"></div>
                </div>
                <p>{Math.round(progress)}%</p>
            </div>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search Workouts..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select onChange={handleCategoryChange}>
                    <option value="All">All Categories</option>
                    <option value="Strength">Strength</option>
                    <option value="Cardio">Cardio</option>
                    <option value="Endurance">Endurance</option>
                </select>
            </div>

            {/* Show message if no workouts */}
            {filteredWorkouts.length === 0 ? (
                <p className="no-workouts">No workouts currently.</p>
            ) : (
                <AnimatePresence>
                    {filteredWorkouts.map((workout) => (
                        <motion.div
                            key={workout._id}
                            className="workout-card"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                        >
                            {editId === workout._id ? (
                                <div>
                                    <input type="text" value={editData.title} onChange={(e) => setEditData({ ...editData, title: e.target.value })} />
                                    <input type="number" value={editData.reps} onChange={(e) => setEditData({ ...editData, reps: e.target.value })} />
                                    <input type="number" value={editData.load} onChange={(e) => setEditData({ ...editData, load: e.target.value })} />
                                    <select value={editData.category} onChange={(e) => setEditData({ ...editData, category: e.target.value })}>
                                        <option value="Strength">Strength</option>
                                        <option value="Cardio">Cardio</option>
                                        <option value="Endurance">Endurance</option>
                                    </select>
                                    <button className="edit-btn" onClick={() => handleSaveEdit(workout._id)}>Save</button>
                                </div>
                            ) : (
                                <div>
                                    <h3>{workout.title}</h3>
                                    <p>Reps: {workout.reps}</p>
                                    <p>Load: {workout.load} kg</p>
                                    <p>Category: {workout.category}</p>
                                    <div className="button-container">
                                        <button className="complete-btn" onClick={() => handleComplete(workout._id, !workout.completed)}>
                                            {workout.completed ? "Undo" : "Complete"}
                                        </button>
                                        <button className="edit-btn" onClick={() => handleEdit(workout)}>Edit</button>
                                        <button className="delete-btn" onClick={() => handleDelete(workout._id)}>Delete</button>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>
            )}
        </div>
    );
}

export default WorkoutList;
