import { useContext } from "react";
import { AppContext } from "../App";

import Key from "./Key"
import DeleteKey from "./DeleteKey";
import { useCallback, useEffect } from "react";

function Keyboard() {
  const { onSelectLetter, onEnter, onDelete, disabledLetters, almostLetters, correctLetters, language } = useContext(AppContext);

  const keys1 = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P']
  const keys2 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ñ']
  const keys3 = ['Z', 'X', 'C', 'V', 'B', 'N', 'M']

  if (language.toLowerCase() != "es") {
    console.log(language.toLowerCase());

    keys2.pop();
  }

  const handleKeyboard = useCallback((event) => {
    if (event.key === 'Enter') {
      onEnter()
    } else if (event.key === 'Backspace') {
      onDelete()
    } else {
      keys1.forEach((key) => {
        // if (key === event.key.toUpperCase() && !disabledLetters.includes(key)) {
        if (key === event.key.toUpperCase()) {
          onSelectLetter(key)
        }
      })

      keys2.forEach((key) => {
        // if (key === event.key.toUpperCase() && !disabledLetters.includes(key)) {
        if (key === event.key.toUpperCase()) {
          onSelectLetter(key)
        }
      })

      keys3.forEach((key) => {
        // if (key === event.key.toUpperCase() && !disabledLetters.includes(key)) {
        if (key === event.key.toUpperCase()) {
          onSelectLetter(key)
        }
      })
    }

    // Elimina el foco del botón después de hacer clic
    event.target.blur();
  })

  useEffect(() => {
    document.addEventListener('keydown', handleKeyboard)

    return () => {
      document.removeEventListener('keydown', handleKeyboard)
    }
  }, [handleKeyboard])

  return (
    <div className="flex flex-col container w-full max-w-lg pb-2 md:pb-5 px-2 mx-auto gap-2">
      <div className="flex gap-1">
        {keys1.map((key) => (
          <Key key={key} keyVal={key} disabled={disabledLetters.includes(key)} almost={almostLetters.includes(key)} correct={correctLetters.includes(key)} />
        ))}
      </div>
      <div className="flex gap-1">
        {keys2.map((key) => (
          <Key key={key} keyVal={key} disabled={disabledLetters.includes(key)} almost={almostLetters.includes(key)} correct={correctLetters.includes(key)} />
        ))}
      </div>
      <div className="flex gap-1">
        <Key key="enter" keyVal="ENVIAR" bigKey />
        {keys3.map((key) => (
          <Key key={key} keyVal={key} disabled={disabledLetters.includes(key)} almost={almostLetters.includes(key)} correct={correctLetters.includes(key)} />
        ))}
        <DeleteKey />
      </div>
    </div>
  )
}

export default Keyboard