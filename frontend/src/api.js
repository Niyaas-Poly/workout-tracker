const API_URL = "http://localhost:4000/api/workouts";

export const fetchWorkouts = async () => {
    const res = await fetch(API_URL);
    return res.json();
};

export const createWorkout = async (workout) => {
    const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(workout),
    });
    return res.json();
};

export const deleteWorkout = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    return id;
};

export const updateWorkout = async (id, updatedData) => {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
    });
    return res.json();
};
