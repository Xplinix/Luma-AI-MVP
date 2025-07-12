import React, { useState } from "react";

const questions = [
  { id: 1, question: "What is 5 + 3?", options: ["6", "8", "9"], answer: "8" },
  { id: 2, question: "Which number comes after 14?", options: ["13", "15", "16"], answer: "15" },
  { id: 3, question: "What is 10 - 4?", options: ["6", "7", "5"], answer: "6" }
];

const content = {
  foundational: {
    video: "https://youtu.be/1W5aYi3lkho",
    game: "https://www.education.com/game/counting-clouds/"
  },
  developing: {
    video: "https://youtu.be/QkPa9V2wtZs",
    game: "https://wordwall.net/resource/23976467/patterns"
  },
  proficient: {
    video: "https://youtu.be/h3-VsTgDnbE",
    game: "https://www.education.com/game/multiplication-mountain/"
  }
};

export default function LumaApp() {
  const [step, setStep] = useState("quiz");
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);

  const handleAnswer = (option) => {
    if (option === questions[currentQ].answer) {
      setScore(score + 1);
    }
    if (currentQ + 1 < questions.length) {
      setCurrentQ(currentQ + 1);
    } else {
      setStep("result");
    }
  };

  const getLearningPath = () => {
    if (score <= 1) return "foundational";
    if (score === 2) return "developing";
    return "proficient";
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 20, fontFamily: "Arial" }}>
      <h1 style={{ textAlign: "center" }}>Luma AI - Math Helper</h1>
      {step === "quiz" && (
        <div>
          <p>{questions[currentQ].question}</p>
          {questions[currentQ].options.map((opt) => (
            <button
              key={opt}
              onClick={() => handleAnswer(opt)}
              style={{ display: "block", margin: "10px 0" }}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
      {step === "result" && (
        <div style={{ textAlign: "center" }}>
          <p>Quiz Complete!</p>
          <p>Your score: {score} / {questions.length}</p>
          <p><strong>Recommended Path:</strong> {getLearningPath()}</p>
          <div style={{ marginTop: 20 }}>
            <p><strong>Video Lesson:</strong></p>
            <a href={content[getLearningPath()].video} target="_blank">Watch</a>
            <p><strong>Game:</strong></p>
            <a href={content[getLearningPath()].game} target="_blank">Play Now</a>
          </div>
        </div>
      )}
    </div>
  );
}