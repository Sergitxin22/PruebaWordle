from bs4 import BeautifulSoup
import requests
import json
import random
from datetime import datetime

# Encabezado para simular una solicitud de un navegador real
HEADER = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'}

def leer_palabras():
    try:
        with open('src/data/spanish/sin-tildes/5.json', 'r', encoding='utf-8') as file:
            data = json.load(file)
            # Asegúrate de que el archivo JSON sea una lista de palabras
            if isinstance(data, list) and len(data) > 0:
                return data
            else:
                print('El archivo JSON no contiene suficientes palabras o no es una lista.')
                return []
    except Exception as e:
        print(f"Error al leer el archivo JSON: {e}")
        return []

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

def guardar_definiciones(palabras_definiciones):
    try:
        with open('./src/data/spanish/sin-tildes/5-definiciones.json', 'w', encoding='utf-8') as file:
            json.dump(palabras_definiciones, file, ensure_ascii=False, indent=4)
        print(f'\nDefiniciones guardadas en "5-definiciones.json".')
    except Exception as e:
        print(f"Error al guardar las definiciones en el archivo JSON: {e}")

def main():
    palabras = leer_palabras()
    if not palabras:
        print('No se pudieron obtener las palabras del archivo.')
        return
    
    palabras_definiciones = []
    
    for palabra in palabras:
        print(f'Obteniendo definición de {palabra}...')
        aceps = acepciones(palabra)
        palabras_definiciones.append({
            'palabra': palabra,
            'acepciones': aceps[:2]  # Limita las acepciones a las dos primeras
        })
    
    guardar_definiciones(palabras_definiciones)

if __name__ == '__main__':
    main()
