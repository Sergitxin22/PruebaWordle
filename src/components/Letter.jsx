import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";

function getNumOfOccurrencesInWord(word, letter) {
  return word.split("").filter((l) => l === letter).length;
}

function Letter({ letterPos, attemptVal }) {
  const { board, correctWord, currAttempt, disabledLetters, setDisabledLetters, correctLetters, setCorrectLetters, almostLetters, setAlmostLetters } = useContext(AppContext);
  const letter = board[attemptVal][letterPos];
  const [letterState, setLetterState] = useState("");

  useEffect(() => {
    // No mostrar nada si el intento actual no es mayor que el intento de la letra
    if (currAttempt.attempt <= attemptVal) {
      return;
    }

    const correctWordArray = correctWord.split("");
    const attemptArray = board[attemptVal];

    let state = "error";
    const tempStates = Array(5).fill("error");

    // 1. Marcar las letras correctas y restar del conteo de ocurrencias restantes
    attemptArray.forEach((char, index) => {
      if (char === correctWordArray[index]) {
        tempStates[index] = "correct";
      }
    });

    // 2. Marcar letras 'almost' para aquellas que no son correctas
    attemptArray.forEach((char, index) => {
      if (tempStates[index] !== "correct") {
        const totalOccurrencesInWord = getNumOfOccurrencesInWord(correctWord, char);
        const occurrencesSoFar = tempStates.reduce(
          (count, state, idx) => count + (state !== "error" && attemptArray[idx] === char ? 1 : 0),
          0
        );

        if (occurrencesSoFar < totalOccurrencesInWord) {
          tempStates[index] = "almost";
        }
      }
    });

    // Asignar el estado final al letterState del componente actual
    setLetterState(tempStates[letterPos]);

    // Agregar letra a correctLetters si está en la palabra correcta y en la posición correcta
    if (currAttempt.attempt > attemptVal && letter !== "" && getNumOfOccurrencesInWord(correctWord, letter) > 0) {
      if (tempStates[letterPos] === "correct") {
        setCorrectLetters((prev) => [...new Set([...prev, letter])]);
      } else if (tempStates[letterPos] === "almost") {
        setAlmostLetters((prev) => [...new Set([...prev, letter])]);
      }
    }

    // console.log({ correctLetters });
    // console.log({ almostLetters });

  }, [letter, correctWord, letterPos, board, attemptVal, currAttempt]);

  useEffect(() => {
    if (currAttempt.attempt > attemptVal && letter !== "" && getNumOfOccurrencesInWord(correctWord, letter) === 0) {
      setDisabledLetters((prev) => [...prev, letter]);
    }
  }, [currAttempt.attempt, letter, letterState, attemptVal, setDisabledLetters]);

  // console.log(disabledLetters);

  const baseClasses = "inline-flex justify-center items-center text-2xl tiny:text-4xl uppercase font-bold select-none border-2 border-neutral-300 dark:border-neutral-700";
  const letterClasses = letterState ? `text-white ${letterState} border-none` : baseClasses;
  const letterActiveClasses = letter ? `border-neutral-500 dark:border-neutral-600` : '';

  // Retornar la letra con su estado correspondiente
  return (
    // <div className={`inline-flex justify-center items-center text-2xl tiny:text-4xl uppercase font-bold select-none border-2 border-neutral-300 dark:border-neutral-700 letter ${letterState}`} id={`box${attemptVal}${letterPos}`}>
    <div className={`${baseClasses} ${letterClasses} ${letterActiveClasses}`} id={`box${attemptVal}${letterPos}`}>
      {letter}
    </div>
  );
}

export default Letter;
