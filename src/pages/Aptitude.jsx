import React, { useState, useEffect } from "react";

// ---------------- Questions ----------------
const allQuestions = [
  {
    question: "What is 15 + 28?",
    options: ["33", "43", "42", "44"],
    answer: "43",
  },
  {
    question: "Find the next number in the series: 2, 4, 8, 16, ?",
    options: ["24", "32", "34", "36"],
    answer: "32",
  },
  {
    question: "If TRAIN is coded as 812945, then how is BUS coded?",
    options: ["213", "325", "237", "314"],
    answer: "237",
  },
  {
    question: "The average of 10, 20, 30, 40, 50 is?",
    options: ["25", "30", "35", "40"],
    answer: "30",
  },
  {
    question: "If A = 1, B = 2, ..., Z = 26, then value of CAT is?",
    options: ["24", "27", "29", "31"],
    answer: "24",
  },
  {
    question: "The opposite of 'Transparent' is?",
    options: ["Opaque", "Clear", "Visible", "Translucent"],
    answer: "Opaque",
  },
  {
    question: "A clock shows 3:15. What is the angle between the hands?",
    options: ["0°", "7.5°", "30°", "45°"],
    answer: "7.5°",
  },
  {
    question: "Which number is a prime?",
    options: ["21", "29", "35", "51"],
    answer: "29",
  },
];

// ---------------- Question Card ----------------
function QuestionCard({ question, index, onAnswer }) {
  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold text-purple-900 mb-2">
        Q{index + 1}. {question.question}
      </h2>
      <div className="flex flex-col gap-3 mb-6">
        {question.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => onAnswer(opt)}
            className="p-3 text-lg text-left border-2 border-gray-300 rounded-lg bg-gray-100 cursor-pointer hover:bg-gray-200 transition"
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

// ---------------- Helper: Randomly pick 5 ----------------
function getRandomQuestions(arr, count) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// ---------------- Main Component ----------------
export default function Aptitude({ onComplete }) {
  const [questions, setQuestions] = useState([]);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    setQuestions(getRandomQuestions(allQuestions, 5));
  }, []);

  const handleAnswer = (ans) => {
    setAnswers([...answers, ans]);
    setStep(step + 1);
  };

  const handleComplete = () => {
    const score = answers.filter(
      (ans, i) => ans === questions[i].answer
    ).length;
    if (onComplete) onComplete(score);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 font-sans p-4">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-purple-900 mb-6">
          Aptitude Test
        </h1>

        {step < questions.length ? (
          <>
            <QuestionCard
              question={questions[step]}
              index={step}
              onAnswer={handleAnswer}
            />
            <div className="w-full h-2 bg-gray-300 rounded-lg overflow-hidden mb-4">
              <div
                className="h-full bg-purple-900 transition-all"
                style={{ width: `${((step + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-purple-900 mb-4">
              Test Completed 🎉
            </h2>
            <p className="text-lg mb-6">
              You scored{" "}
              <strong>
                {answers.filter((ans, i) => ans === questions[i].answer).length}
              </strong>{" "}
              out of <strong>{questions.length}</strong>
            </p>
            <button
              className="w-full p-4 text-lg rounded-lg bg-purple-900 text-white hover:bg-purple-950 transition"
              onClick={handleComplete}
            >
              Back to Suggestions
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
