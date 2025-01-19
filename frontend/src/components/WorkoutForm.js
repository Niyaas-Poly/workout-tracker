import React, { useState } from "react";
import { createWorkout } from "../api";

function WorkoutForm({ setWorkouts }) {
    const [title, setTitle] = useState("");
    const [reps, setReps] = useState("");
    const [load, setLoad] = useState("");
    const [category, setCategory] = useState("Strength");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newWorkout = await createWorkout({ title, reps, load, category });
        setWorkouts((prev) => [...prev, newWorkout]);
        setTitle("");
        setReps("");
        setLoad("");
    };

    return (
        <div className="form-container">
            <h2>Workout Management</h2>
            <form onSubmit={handleSubmit}>
                <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
                <input value={reps} onChange={(e) => setReps(e.target.value)} placeholder="Reps" required />
                <input value={load} onChange={(e) => setLoad(e.target.value)} placeholder="Load (kg)" required />
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option>Strength</option>
                    <option>Cardio</option>
                    <option>Endurance</option>
                </select>
                <button type="submit">Add Workout</button>
            </form>
        </div>
    );
}

export default WorkoutForm;
