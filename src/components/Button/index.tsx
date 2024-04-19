"use client";

import useQuiz from "../../../store";
import React from "react";

export default function Button() {
  const addStatus = useQuiz((state) => state.addStatus);

  return (
    <button
      type="button"
      onClick={() => addStatus("start")}
      className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
    >
      Start Quiz
    </button>
  );
}
