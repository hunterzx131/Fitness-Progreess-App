import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

let nextId = 4;

function Dashboard() {
  const [workouts, setWorkouts] = useState(() => {
    const saved = localStorage.getItem("workouts");
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            date: "2026-08-10",
            exercise: "Bench Press",
            muscleGroup: "Chest",
            sets: 2,
            reps: 8,
            weight: 65,
          },
          {
            id: 2,
            date: "2026-08-10",
            exercise: "Lat Pulldown",
            muscleGroup: "Back",
            sets: 2,
            reps: 8,
            weight: 70,
          },
          {
            id: 3,
            date: "2026-08-11",
            exercise: "Leg Extension",
            muscleGroup: "Legs",
            sets: 2,
            reps: 8,
            weight: 220,
          },
        ];
  });

  useEffect(() => {
    localStorage.setItem("workouts", JSON.stringify(workouts));
  }, [workouts]);

  const [date, setDate] = useState("");
  const [exercise, setExercise] = useState("");
  const [muscleGroup, setMuscleGroup] = useState("Chest");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");

  const [filter, setFilter] = useState("All");

  const [editingId, setEditingId] = useState(null);

  const [sortField, setSortField] = useState("date");
  const [sortDirection, setSortDirection] = useState("desc");

  function handleSaveWorkout() {
    const trimmedExercise = exercise.trim();

    if (
      !date ||
      !trimmedExercise ||
      Number(sets) <= 0 ||
      Number(reps) <= 0 ||
      Number(weight) <= 0
    ) {
      alert("Please fill in all fields with valid positive numbers.");
      return;
    }

    if (editingId) {
      setWorkouts(
        workouts.map((w) =>
          w.id === editingId
            ? {
                ...w,
                date,
                exercise: trimmedExercise,
                muscleGroup,
                sets: Number(sets),
                reps: Number(reps),
                weight: Number(weight),
              }
            : w,
        ),
      );
      setEditingId(null);
    } else {
      const newWorkout = {
        id: nextId++,
        date,
        exercise: trimmedExercise,
        muscleGroup,
        sets: Number(sets),
        reps: Number(reps),
        weight: Number(weight),
      };

      setWorkouts([...workouts, newWorkout]);
    }
    setDate("");
    setExercise("");
    setSets("");
    setReps("");
    setWeight("");
  }

  function handleDeleteWorkout(id) {
    const confirmed = window.confirm("Delete this workout? This can't be undone.")
    if (!confirmed) reeturn;
    
    setWorkouts(workouts.filter((w) => w.id !== id));
  }

  function handleStartEdit(workout) {
    setEditingId(workout.id);
    setDate(workout.date);
    setExercise(workout.exercise);
    setMuscleGroup(workout.muscleGroup);
    setSets(String(workout.sets));
    setReps(String(workout.reps));
    setWeight(String(workout.weight));
  }

  function handleCancelEdit() {
    setEditingId(null);
    setDate("");
    setExercise("");
    setSets("");
    setReps("");
    setWeight("");
  }

  function handleSort(field) {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  }

  const filteredWorkouts =
    filter === "All"
      ? workouts
      : workouts.filter((w) => w.muscleGroup === filter);

  const sortedWorkouts = [...filteredWorkouts].sort((a, b) => {
    let valueA = a[sortField];
    let valueB = b[sortField];

    if (sortField === "date") {
      valueA = new Date(valueA);
      valueB = new Date(valueB);
    }

    if (valueA < valueB) return sortDirection === "asc" ? -1 : 1;
    if (valueA > valueB) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const chartData = [...filteredWorkouts]
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map((w) => ({
      date: w.date,
      volume: w.sets * w.reps * w.weight,
    }));

  const totalWorkouts = workouts.length;

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const workoutsThisWeek = workouts.filter(
    (w) => new Date(w.date) >= oneWeekAgo,
  );

  const weeklyGroupCounts = {};
  workouts.forEach((w) => {
    weeklyGroupCounts[w.muscleGroup] =
      (weeklyGroupCounts[w.muscleGroup] || 0) + 1;
  });

  const groupCounts = {};
  workouts.forEach((w) => {
    groupCounts[w.muscleGroup] = (groupCounts[w.muscleGroup] || 0) + 1;
  });

  let mostTrainedGroup = "-";
  let highestCount = 0;
  for (const group in groupCounts) {
    if (groupCounts[group] > highestCount) {
      mostTrainedGroup = group;
      highestCount = groupCounts[group];
    }
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-slate-200 py-10 px-4">
      <div className="max-w-3xl mx-auto flex flex-col gap-6">
        <h1 className="font-mono text-2xl font-bold text-slate-800">
          Fitness Progress Dashboard
        </h1>

        <div className="bg-slate-100 rounded-lg shadow p-6">
          <h1 className="text-lg font-semibold text-slate-700 mb-4">
            {editingId ? "Edit Workout" : "Log a workout"}
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <div className="bg-white rounded-lg shadow p-5">
              <p className="text-sm text-slate-500 mb-1">Total Workouts</p>
              <p className="text-2xl font-bold text-slate-800">
                {totalWorkouts}
              </p>
            </div>

            <div className="bg-white rounded-lg shadow p-5">
              <p className="text-sm text-slate-500 mb-1">This Week By Group</p>
              {Object.keys(weeklyGroupCounts).length === 0 ? (
                <p className="text-slate-400 text-sm">No workouts yet</p>
              ) : (
                <div className="flex flex-col gap-1">
                  {Object.entries(weeklyGroupCounts).map(([group, count]) => (
                    <div key={group} className="flex justify-between text-sm">
                      <span className="text-slate-700">{group}</span>
                      <span className="font-semibold text-slate-800">
                        {count}x
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white rounded-lg shadow p-5">
              <p className="text-sm text-slate-500 mb-1">Most Trained</p>
              <p className="text-2xl font-bold text-slate-800">
                {mostTrainedGroup}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border border-slate-300 rounded px-3 py-2 outline-none focus:border-blue-500"
            />
            <input
              type="text"
              placeholder="Exercise (e.g. Bench Press)"
              value={exercise}
              onChange={(e) => setExercise(e.target.value)}
              className="col-span-2 sm:col-span-1 border border-slate-300 rounded px-3 py-2 outline-none focus:border-blue-500"
            />
            <select
              value={muscleGroup}
              onChange={(e) => setMuscleGroup(e.target.value)}
              className="border border-slate-300 rounded px-3 py-2 outline-none focus:border-blue-500"
            >
              <option value="Chest">Chest</option>
              <option value="Back">Back</option>
              <option value="Legs">Legs</option>
              <option value="Shoulders">Shoulders</option>
              <option value="Arms">Arms</option>
            </select>
            <input
              type="number"
              min="1"
              placeholder="Sets"
              value={sets}
              onChange={(e) => setSets(e.target.value)}
              className="border border-slate-300 rounded px-3 py-2 outline-none focus:border-blue-500"
            />
            <input
              type="number"
              min="1"
              placeholder="Reps"
              value={reps}
              onChange={(e) => setReps(e.target.value)}
              className="border border-slate-300 rounded px-3 py-2 outline-none focus:border-blue-500"
            />
            <input
              type="number"
              min="1"
              placeholder="Weight (kg)"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="border border-slate-300 rounded px-3 py-2 outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex items-center gap-3">
            <label className="text-sm text-slate-600">
              Filter by muscle group:
            </label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border border-slate-300 rounded px-3 py-1.5 outline-none focus:border-blue-500"
            >
              <option value="All">All</option>
              <option value="Chest">Chest</option>
              <option value="Back">Back</option>
              <option value="Legs">Legs</option>
              <option value="Shoulders">Shoulders</option>
              <option value="Arms">Arms</option>
            </select>
          </div>
          <div className="flex flex-row gap-1 mt-2">
            <button
              onClick={handleSaveWorkout}
              className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700"
            >
              {editingId ? "Update Workout" : "Add Workout"}
            </button>

            {editingId && (
              <button
                onClick={handleCancelEdit}
                className="bg-slate-200 text-slate-700 rounded px-4 py-2 hover:bg-slate-300"
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-slate-700 mb-4">
            Volume Over Time (Sets x Reps x Weight)
          </h2>

          {chartData.length === 0 ? (
            <p className="text-slate-400 text-sm">
              No Data for this filter yet
            </p>
          ) : (
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="volume"
                  stroke="#2563eb"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="txt-lg font-semibold text-slate-700 mb-4">
            Workout History
          </h2>

          {sortedWorkouts.length === 0 ? (
            <p className=" text-slate-400 text-sm">No Workouts logged yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500">
                    <th
                      onClick={() => handleSort("date")}
                      className="py-2 pr-2 cursor-pointer select-none hover:text-slate-700"
                    >
                      Date{" "}
                      {sortField === "date" &&
                        (sortDirection === "asc" ? "▲" : "▼")}
                    </th>
                    <th
                      onClick={() => handleSort("exercise")}
                      className="py-2 pr-2 cursor-pointer select-none hover:text-slate-700"
                    >
                      Exercise{" "}
                      {sortField === "exercise" &&
                        (sortDirection === "asc" ? "▲" : "▼")}
                    </th>
                    <th
                      onClick={() => handleSort("muscleGroup")}
                      className="py-2 pr-2 cursor-pointer select-none hover:text-slate-700"
                    >
                      Group{" "}
                      {sortField === "muscleGroup" &&
                        (sortDirection === "asc" ? "▲" : "▼")}
                    </th>
                    <th
                      onClick={() => handleSort("sets")}
                      className="py-2 pr-2 cursor-pointer select-none hover:text-slate-700"
                    >
                      Sets{" "}
                      {sortField === "sets" &&
                        (sortDirection === "asc" ? "▲" : "▼")}
                    </th>
                    <th
                      onClick={() => handleSort("reps")}
                      className="py-2 pr-2 cursor-pointer select-none hover:text-slate-700"
                    >
                      Reps{" "}
                      {sortField === "reps" &&
                        (sortDirection === "asc" ? "▲" : "▼")}
                    </th>
                    <th
                      onClick={() => handleSort("weight")}
                      className="py-2 pr-2 cursor-pointer select-none hover:text-slate-700"
                    >
                      Weight{" "}
                      {sortField === "weight" &&
                        (sortDirection === "asc" ? "▲" : "▼")}
                    </th>
                    <th className="py-2 pr-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {sortedWorkouts.map((w) => (
                    <tr key={w.id} className="border-b border-slate-100">
                      <td className="py-2 pr-2 text-slate-700">{w.date}</td>
                      <td className="py-2 pr-2 text-slate-700">{w.exercise}</td>
                      <td className="py-2 pr-2 text-slate-700">
                        {w.muscleGroup}
                      </td>
                      <td className="py-2 pr-2 text-slate-700">{w.sets}</td>
                      <td className="py-2 pr-2 text-slate-700">{w.reps}</td>
                      <td className="py-2 pr-2 text-slate-700">{w.weight}</td>
                      <td className="py-2 pr-2 flex gap-3">
                        <button
                          onClick={() => handleStartEdit(w)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteWorkout(w.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
