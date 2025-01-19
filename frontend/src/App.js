import React, { useState, useEffect } from "react";
import WorkoutForm from "./components/WorkoutForm";
import WorkoutList from "./components/WorkoutList";
import { fetchWorkouts } from "./api";
import "./App.css";

function App() {
    const [workouts, setWorkouts] = useState([]);

    useEffect(() => {
        fetchWorkouts().then((data) => setWorkouts(data || []));
    }, []);

    return (
        <div className="app-container">
            <h1>Workout Management</h1>
            <WorkoutForm setWorkouts={setWorkouts} />
            <WorkoutList workouts={workouts} setWorkouts={setWorkouts} />
        </div>
    );
}

export default App;
