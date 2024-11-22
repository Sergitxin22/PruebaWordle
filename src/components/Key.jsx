import { useContext } from "react";
import { AppContext } from "../App";

function Key({ keyVal, bigKey, disabled, almost, correct }) {
  const { onSelectLetter, onEnter, disabledLetters } = useContext(AppContext);

  const selectLetter = () => {
    if (keyVal === "ENVIAR") {
      onEnter()
    } else {
      // if (disabledLetters.includes(keyVal)) return
      onSelectLetter(keyVal)
    }
  }

  const keyClasses = [
    "flex-1 rounded uppercase font-bold p-1 sm:p-2 h-16 text-xs tiny:text-base bg-key",
    almost ? "almost" : "",
    correct ? "correct" : ""
  ].join(" ");

  return (
    <button
      className={keyClasses}
      id={disabled ? "disabled" : undefined}
      aria-label={keyVal}
      onClick={selectLetter}>
      {keyVal}
    </button>
  )
}

export default Key