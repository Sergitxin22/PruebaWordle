from bs4 import BeautifulSoup
import requests
import sys
import json
import random
from datetime import datetime

# Encabezado para simular una solicitud de un navegador real
HEADER = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'}

def main():
    if len(sys.argv) > 1:
        palabra = sys.argv[1]
        print(f'\nDefinición de {palabra}:\n')
    else:
        palabra = palabra_del_dia()
        if not palabra:
            print('No se pudo obtener la palabra del día.')
            return
        elif len(palabra) != 5:
            print(f'\nLa palabra del día, "{palabra}", no tiene exactamente 5 letras.')
            segunda_palabra = leer_palabra_aleatoria()
            if segunda_palabra:
                print(f'Utilizando la palabra aleatoria del archivo JSON: {segunda_palabra}')
                palabra = segunda_palabra
            else:
                print('No se pudo obtener una palabra aleatoria del archivo JSON.')
                return
        print(f'\nDefinición de {palabra} (palabra del día {datetime.now().strftime("%d/%m/%Y")}):\n')
    
    try:
        aceps = acepciones(palabra)
        for acepcion in aceps:
            print(acepcion)
        guardar_definicion(palabra, aceps)
    except Exception as e:
        print(f"Error al obtener las acepciones de '{palabra}': {e}")

def palabra_del_dia():
    try:
        request = requests.get('https://dle.rae.es/', headers=HEADER)
        soup = BeautifulSoup(request.text, 'lxml')
        # Asegúrate de que el identificador 'wotd' sea correcto
        wotd = soup.find(attrs={'id': 'wotd'})
        return wotd.text.strip() if wotd else None
    except Exception as e:
        print(f"Error al obtener la palabra del día: {e}")
        return None

def leer_palabra_aleatoria():
    try:
        with open('src/data/spanish/sin-tildes/5.json', 'r', encoding='utf-8') as file:
            data = json.load(file)
            # Asegúrate de que el archivo JSON sea una lista de palabras
            if isinstance(data, list) and len(data) > 1:
                return random.choice(data)
            else:
                print('El archivo JSON no contiene suficientes palabras o no es una lista.')
                return None
    except Exception as e:
        print(f"Error al leer el archivo JSON: {e}")
        return None

def acepciones(palabra):
    try:
        url = f'https://dle.rae.es/{palabra}'
        request = requests.get(url, headers=HEADER)
        soup = BeautifulSoup(request.text, 'lxml')
        # Asegúrate de que la clase 'j' sea correcta
        aceps_text = [a.text for a in soup.find_all(attrs={'class': 'j'})]
        return aceps_text if aceps_text else ['La palabra que has indicado no está recogida en la RAE.']
    except Exception as e:
        print(f"Error al obtener las acepciones de '{palabra}': {e}")
        return ['No se pudo obtener la definición.']

def guardar_definicion(palabra, acepciones):
    try:
        # Limita las acepciones a las dos primeras
        acepciones = acepciones[:2]
        definiciones = {'palabra': palabra, 'acepciones': acepciones}
        with open('./definiciones.json', 'w', encoding='utf-8') as file:
            json.dump(definiciones, file, ensure_ascii=False, indent=4)
        print(f'\nDefinición guardada en "definiciones.json".')
    except Exception as e:
        print(f"Error al guardar la definición en el archivo JSON: {e}")

if __name__ == '__main__':
    main()
    print('\n')
