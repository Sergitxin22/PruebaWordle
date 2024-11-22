// Importaciones estáticas de definiciones en distintos idiomas
import spanishDefinitions from './data/hoy/5/spanish/definiciones.json';
import englishDefinitions from './data/hoy/5/english/definiciones.json';
import basqueDefinitions from './data/hoy/5/euskera/definiciones.json';

// Importaciones estáticas de palabras válidas en distintos idiomas
import spanishWords from './data/spanish/sin-tildes/5.json';
import englishWords from './data/english/5.json';
import basqueWords from './data/euskara/5.json';

export const boardDefault = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', '']
]

export const generateWordSet = async (language) => {
    let wordSet
    let todaysWord
    let todaysWordDefinitions

    // Seleccionar el archivo JSON adecuado según el idioma
    let todaysWordJson;
    switch (language) {
        case 'en':
            todaysWordJson = englishDefinitions;
            break;
        case 'eu':
            todaysWordJson = basqueDefinitions;
            break;
        case 'es':
        default:
            todaysWordJson = spanishDefinitions;
            break;
    }

    console.log(language);
    console.log(todaysWordJson);



    // await fetch(wordBank)
    //     .then((response) => response.text())
    //     .then((result) => {
    //         // Dividimos el resultado por las líneas y eliminamos los espacios innecesarios
    //         const wordArr = result.split("\n").map(word => word.trim());
    //         todaysWord = wordArr[Math.floor(Math.floor(Math.random() * wordArr.length))];
    //         // Creamos un Set con las palabras ya limpiadas
    //         wordSet = new Set(wordArr);
    //     });
    switch (language) {
        case 'en':
            wordSet = new Set(englishWords);
            break;
        case 'eu':
            wordSet = new Set(basqueWords);
            break;
        case 'es':
        default:
            wordSet = new Set(spanishWords);
            break;
    }

    todaysWord = todaysWordJson.palabra
    wordSet.add(todaysWord)

    todaysWordDefinitions = todaysWordJson.acepciones

    console.log('hola:', { wordSet, todaysWord, todaysWordDefinitions });

    return { wordSet, todaysWord, todaysWordDefinitions }
}