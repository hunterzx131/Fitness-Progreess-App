import { useState } from "react";

let nextId = 4;

function App() {
  const [workouts, setWorkouts] = useState([
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
      muscleGroup: "Lats",
      sets: 2,
      reps: 8,
      weight: 70,
    },
    {
      id: 3,
      date: "2026-08-11",
      exercise: "Leg Extension",
      muscleGroup: "Quads",
      sets: 2,
      reps: 8,
      weight: 220,
    },
  ]);

  const [date, setDate] = useState("");
  const [exercise, setExercise] = useState("");
  const [muscleGroup, setMuscleGroup] = useState ("");

  return (
    <div className="min-h-screen w-full bg-slate-200 py-10 px-4">
      <div className="max-w-3xl mx-auto flex flex-col gap-6">
        <h1 className="font-mono text-2xl font-bold text-slate-800">
          Fitness Progress Dashboard
        </h1>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-slate-700 mb-4">
            Log a workout
          </h2>

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
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
