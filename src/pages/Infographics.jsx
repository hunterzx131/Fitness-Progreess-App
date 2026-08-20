import { useState } from "react";
import { Flame, TrendingUp, Apple, ChevronLeft, ChevronRight } from "lucide-react";

const TOPICS = [
  {
    icon: Flame,
    color: "text-rose-600",
    bg: "bg-rose-50",
    title: "Fat Loss",
    summary: "Losing fat comes down to a consistent calorie deficit over time.",
    points: [
      "Eat below your TDEE (check the calculator) — a 300–500 kcal daily deficit is a sustainable starting point",
      "Keep protein high to preserve muscle while losing fat",
      "Weight fluctuates day to day — track weekly averages, not single days",
      "Very aggressive deficits often backfire: more muscle loss, more fatigue, harder to sustain",
    ],
  },
  {
    icon: TrendingUp,
    color: "text-blue-600",
    bg: "bg-blue-50",
    title: "Progressive Overload",
    summary: "Muscles grow by gradually doing more than they're used to.",
    points: [
      "Add small amounts of weight, reps, or sets over time — not every session",
      "Track your lifts so you actually know if you're progressing",
      "Form breaking down isn't progress — it's just a heavier bad rep",
      "Progress isn't linear — some weeks are flat or dip, especially with poor sleep or stress",
    ],
  },
  {
    icon: Apple,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    title: "Diet Basics",
    summary: "Total calories matter most, but food quality shapes how you feel doing it.",
    points: [
      "Protein: roughly 1.6–2.2g per kg of bodyweight supports muscle retention/growth",
      "Whole foods help with fullness — easier to hit your calorie target without feeling starved",
      "No food is strictly 'off limits' — consistency beats perfection",
      "Hydration and fiber both affect digestion and energy more than people expect",
    ],
  },
];

function Infographics() {
  const [index, setIndex] = useState(0);

  const topic = TOPICS[index];
  const Icon = topic.icon;

  function goNext() {
    setIndex((prev) => (prev + 1) % TOPICS.length);
  }

  function goPrev() {
    setIndex((prev) => (prev - 1 + TOPICS.length) % TOPICS.length);
  }

  return (
    <div className="min-h-screen w-full bg-slate-200 py-10 px-4">
      <div className="max-w-lg mx-auto flex flex-col gap-6">
        <div>
          <h1 className="font-mono text-2xl font-bold text-slate-800">Learn</h1>
          <p className="text-slate-500 text-sm mt-1">
            A quick reference on the fundamentals — not a substitute for professional advice.
          </p>
        </div>

        
        <div className="flex items-center gap-3">
          <button
            onClick={goPrev}
            className="shrink-0 bg-white rounded-full shadow p-2 hover:bg-slate-50"
            aria-label="Previous topic"
          >
            <ChevronLeft size={20} className="text-slate-600" />
          </button>

          <div className="bg-white rounded-lg shadow p-6 flex-1 min-h-85">
            <div className="flex items-center gap-3 mb-3">
              <div className={`${topic.bg} ${topic.color} p-2.5 rounded-lg`}>
                <Icon size={22} strokeWidth={2} />
              </div>
              <h2 className="text-lg font-semibold text-slate-800">{topic.title}</h2>
            </div>

            <p className="text-slate-600 text-sm mb-4">{topic.summary}</p>

            <ul className="flex flex-col gap-2">
              {topic.points.map((point, i) => (
                <li key={i} className="flex gap-2 text-sm text-slate-700">
                  <span className={`${topic.color} mt-0.5`}>•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={goNext}
            className="shrink-0 bg-white rounded-full shadow p-2 hover:bg-slate-50"
            aria-label="Next topic"
          >
            <ChevronRight size={20} className="text-slate-600" />
          </button>
        </div>

        
        <div className="flex justify-center gap-2">
          {TOPICS.map((t, i) => (
            <button
              key={t.title}
              onClick={() => setIndex(i)}
              aria-label={`Go to ${t.title}`}
              className={`h-2 rounded-full transition-all ${
                i === index ? "w-6 bg-blue-600" : "w-2 bg-slate-300 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Infographics;