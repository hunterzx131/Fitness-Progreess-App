import { useState } from "react";

function Tdee() {
  const activityLevels = [
    { label: "Sedentary (little/no exercise)", multiplier: 1.2 },
    { label: "Light (exercise 1–3 days/week)", multiplier: 1.375 },
    { label: "Moderate (exercise 3–5 days/week)", multiplier: 1.55 },
    { label: "Active (exercise 6–7 days/week)", multiplier: 1.725 },
    { label: "Very Active (hard exercise + physical job)", multiplier: 1.9 },
  ];

  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [activityMultiplier, setActivityMultiplier] = useState(1.2);

  const [result, setResult] = useState(null);

  function handleCalculate() {
    if (!age || !height || !weight) {
      alert("Please fill in all fields");
      return;
    }

    let bmr;
    if (gender === "male") {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    const tdee = bmr * activityMultiplier;

    setResult({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
    });
  }

  return (
    <div className="min-h-screen w-full bg-slate-200 py-10 px-4">
      <div className="max-w-lg mx-auto flex flex-col gap-6">
        <h1 className="font-mono text-2xl font-bold text-slate-800">
          TDEE Calculator
        </h1>
        <p className="text-slate-500 text-sm mt-2">
          Estimate your Total Daily Energy Expenditure — how many calories you
          burn per day.
        </p>
        <div className="bg-white rounded-lg shadow p-6 flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            <input
              type="number"
              min="1"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="border border-slate-300 rounded px-3 py-2 outline-none focus:border-blue-500"
            />

            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="border border-slate-300 rounded px-3 py-2 outline-none focus:border-blue-500"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            <input
              type="number"
              min="1"
              placeholder="Height (cm)"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
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

          <select
            value={activityMultiplier}
            onChange={(e) => setActivityMultiplier(Number(e.target.value))}
            className="border border-slate-300 rounded px-3 py-2 outline-none focus:border-blue-500"
          >
            {activityLevels.map((level) => (
              <option key={level.label} value={level.multiplier}>
                {level.label}
              </option>
            ))}
          </select>

          <button
            onClick={handleCalculate}
            className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700"
          >
            Calculate
          </button>
        </div>

        {result && (
          <div className="bg-white rounded-lg shadow p-6 flex flex-col gap-3">
            <div>
              <p className="text-sm text-slate-500">BMR (at rest)</p>
              <p className="text-2xl font-bold text-slate-800">
                {result.bmr.toLocaleString()} kcal/day
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-500">
                TDEE (maintenance calories)
              </p>
              <p className="text-2xl font-bold text-slate-800">
                {result.tdee.toLocaleString()} kcal/day
              </p>
            </div>
            <p className="text-sm text-slate-400 mt-1">
              To lose weight, eat below this number. To gain, eat above it.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Tdee;
