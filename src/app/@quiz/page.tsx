"use client";

import React, { useEffect, useState } from "react";
import useQuiz from "../../../store";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Player } from "@lottiefiles/react-lottie-player";

interface Question {
  question: string;
  incorrect_answers: any[];
  correct_answer: any;
  answers: any[];
}
export default function quiz() {
  const [question, setQuestion] = useState<Question[]>([]);
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const config = useQuiz((state) => state.config);
  console.log("this is config", config);

  const addScore = useQuiz((state) => state.addScore);

  useEffect(() => {
    async function getQuestion() {
      setLoading(true);
      try {
        const response = await fetch(
          `https://opentdb.com/api.php?amount=${config.numberOfQuestion}&category=${config.category.id}&difficulty=${config.level}&type=multiple`
        );
        const data = await response.json();
        if (Array.isArray(data.results)) {
          let shuffledResult = data.results.map(
            (e: {
              incorrect_answers: any;
              correct_answer: any;
              answers: any[];
            }) => {
              let value = [...e.incorrect_answers, e.correct_answer]
                .map((value) => ({ value, sort: Math.random() }))
                .sort((a, b) => a.sort - b.sort)
                .map(({ value }) => value);
              e.answers = [...value];
              return e;
            }
          );
          setQuestion([...shuffledResult]);
        } else {
          console.error("Unexpected data structure:", data);
          // Handle the case where data.results is not an array
          // For example, you might want to set an empty array or a default value
          setQuestion([]);
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
        // Handle the error, e.g., by setting an empty array or a default value
        setQuestion([]);
      } finally {
        setLoading(false);
      }
    }
    getQuestion();
  }, [config.numberOfQuestion, config.category, config.level, config.type]);

  const handleNext = () => {
    let remaingQuestion = [...question];
    remaingQuestion.shift();
    setQuestion([...remaingQuestion]);
    setAnswer("");
  };
  const checkAnswer = (answer: string) => {
    if (answer === question[0].correct_answer) {
      addScore(0);
    }
    setAnswer(question[0].correct_answer);
  };
  return (
    <section className="flex flex-col justify-center items-center mt-10">
      {question.length ? (
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Question No
          {question?.length ? (
            <span className="text-blue-600 dark:text-blue-500">
              {" "}
              #{config.numberOfQuestion - question.length + 1}
            </span>
          ) : null}
        </h1>
      ) : null}

      {loading && (
        <div className="flex flex-col">
          <Skeleton className="w-[600px] h-[60px] my-10 rounded-sm" />
          <Skeleton className="w-[600px] h-[500px] rounded-sm" />
        </div>
      )}

      {!loading && !!question.length && (
        <p className="text-2xl">Score : {config.score}</p>
      )}
      <section className="shadow-2xl my-10 p-10 w-[90%] rounded-lg flex flex-col justify-center items-center shadow-blue-200">
        <h1 className="mb-4 text-2xl text-center font-extrabold leading-none tracking-tight text-blue-600 dark:text-blue-500 md:text-3xl lg:text-3xl">
          {question.length ? question[0].question : null}
        </h1>

        {!question.length && !loading && (
          <div className="flex flex-col justify-center items-center">
            {question.length&&!loading ? (
              <Player
                src="https://assets5.lottiefiles.com/packages/lf20_touohxv0.json"
                className="player"
                loop
                autoplay
                style={{ height: "400px", width: "400px" }}
              />
            ) : (
              <Player
                src="https://assets5.lottiefiles.com/packages/lf20_touohxv0.json"
                className="player"
                loop
                autoplay
                style={{ height: "600px", width: "600px" }}
              />
            )}

            <h6 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
              YOUR SCORE :{config.score}
            </h6>
            <button
              type="button"
              onClick={() => window.location.reload}
              className="  py-2.5 px-5 me-2 mb-2 text-lg font-bold text-yellow-700 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-green-400 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Take Another QUIZ
            </button>
          </div>
        )}

        <div className="flex justify-center items-center my-10 flex-wrap w-[90%]]">
          {question.length
            ? question[0].answers.map((ans) => (
                <button
                  type="button"
                  onClick={() => checkAnswer(ans)}
                  key={ans}
                  className={cn(
                    " w-[33%] border-0 my-4 py-3.5 px-5 me-2 mb-2 text-lg font-medium text-gray-900 focus:outline-none bg-white rounded-full border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700",
                    {
                      "bg-red-400": answer && ans !== answer,
                      "bg-green-500": answer && ans === answer,
                      "hover:bg-red-500": answer && ans !== answer,
                      "hover:bg-green-500": answer && ans === answer,
                      "text-white-900": answer,
                    }
                  )}
                >
                  {ans}
                </button>
              ))
            : null}
        </div>
        {question.length ? (
          <button
            type="button"
            onClick={() => handleNext()}
            className=" w-[33%] py-2.5 px-5 me-2 mb-2 text-lg font-bold text-yellow-700 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-green-400 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Next
          </button>
        ) : null}
      </section>
    </section>
  );
}
