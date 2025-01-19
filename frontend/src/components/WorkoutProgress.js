import React from "react";

function WorkoutProgress({ workouts }) {
    const completedCount = workouts.filter(w => w.completed).length;
    const totalCount = workouts.length;
    const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

    return (
        <div>
            <h3>Workout Progress</h3>
            <div className="progress-container">
                <div className="progress-bar" style={{ width: `${progress}%` }}>{`${Math.round(progress)}%`}</div>
            </div>
        </div>
    );
}

export default WorkoutProgress;
