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
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");

  function handleAddWorkout () {
    if (!date || !exercise || !sets || !reps || !weight){
      alert("Please fill in all fields");
      return;
    }

    const newWorkout = {
    id: nextId++,
    date,
    exercise,
    muscleGroup,
    sets: Number(sets),
    reps: Number(reps),
    weight: Number(weight),

  };

  setWorkouts([...workouts, newWorkout]);

  setDate("");
  setExercise("");
  setSets("");
  setReps("");
  setWeight("");

  }

  function handleDeleteWorkout (id) {
    setWorkouts(workouts.filter((w) => w.id !== id));
  }

  


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
            <input
              type="number"
              placeholder="Sets"
              value={sets}
              onChange={(e) => setSets(e.target.value)}
              className="border border-slate-300 rounded px-3 py-2 outline-none focus:border-blue-500"
            />
            <input
              type="number"
              placeholder="Reps"
              value={reps}
              onChange={(e) => setReps(e.target.value)}
              className="border border-slate-300 rounded px-3 py-2 outline-none focus:border-blue-500"
            />
            <input
              type="number"
              placeholder="Weight (kg)"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="border border-slate-300 rounded px-3 py-2 outline-none focus:border-blue-500"
            />
          </div>
          
          <button
            onClick={handleAddWorkout}
            className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700"
          >
            Add Workout
          </button>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="txt-lg font-semibold text-slate-700 mb-4">Workout History</h2>

          {workouts.length === 0 ? (
            <p className=" text-slate-400 text-sm">No Workouts logged yet.</p>
          ) : (
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500">
                  <th className="py-2 pr-2">Date</th>
                  <th className="py-2 pr-2">Exercise</th>
                  <th className="py-2 pr-2">Group</th>
                  <th className="py-2 pr-2">Sets</th>
                  <th className="py-2 pr-2">Reps</th>
                  <th className="py-2 pr-2">Weight</th>
                  <th className="py-2 pr-2"></th>
                </tr>
              </thead>
              <tbody>
                {workouts.map((w) => (
                  <tr key={w.id} className="border-b border-slate-100">
                    <td className="py-2 pr-2 text-slate-700">{w.date}</td>
                    <td className="py-2 pr-2 text-slate-700">{w.exercise}</td>
                    <td className="py-2 pr-2 text-slate-700">{w.muscleGroup}</td>
                    <td className="py-2 pr-2 text-slate-700">{w.sets}</td>
                    <td className="py-2 pr-2 text-slate-700">{w.reps}</td>
                    <td className="py-2 pr-2 text-slate-700">{w.weight}</td>
                    <td className="py-2 pr-2">
                      <button 
                        onClick={() => handleDeleteWorkout(w.id)}
                        className="text-red-500 hover:text-red-700">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
