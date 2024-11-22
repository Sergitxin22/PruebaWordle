from bs4 import BeautifulSoup
import requests
import json
import os
import time
import random

# Encabezado para simular una solicitud de un navegador real
HEADER = {
    'User-Agent': random.choice([
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Safari/605.1.15',
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Gecko/20100101 Firefox/85.0',
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    ])
}

def leer_palabras():
    try:
        with open('./src/data/english/5.json', 'r', encoding='utf-8') as file:
            data = json.load(file)
            if isinstance(data, list) and len(data) > 0:
                return data
            else:
                print('El archivo JSON no contiene suficientes palabras o no es una lista.')
                return []
    except Exception as e:
        print(f"Error al leer el archivo JSON: {e}")
        return []

def leer_english_json():
    try:
        with open('./5-english.json', 'r', encoding='utf-8') as file:
            return json.load(file)
    except Exception as e:
        print(f"Error al leer 5-english.json: {e}")
        return []

def guardar_english_json(palabra, palabras_existentes):
    try:
        if palabra not in palabras_existentes:
            palabras_existentes.append(palabra)
            with open('./5-english.json', 'w', encoding='utf-8') as file:
                json.dump(palabras_existentes, file, ensure_ascii=False, indent=4)
            print(f'La palabra "{palabra}" se ha añadido a 5-english.json.')
    except Exception as e:
        print(f"Error al guardar la palabra en 5-english.json: {e}")

def acepciones(palabra):
    try:
        url = f'https://dictionary.cambridge.org/es/diccionario/ingles-espanol/{palabra}'
        request = requests.get(url, headers=HEADER)
        request.raise_for_status()
        soup = BeautifulSoup(request.text, 'lxml')

        acepciones = []
        
        # Buscar todos los elementos <span> con las clases "trans dtrans dtrans-se"
        for span in soup.find_all('span', class_='trans dtrans dtrans-se'):
            acepcion_texto = span.get_text(strip=True)
            if acepcion_texto:
                acepcion_texto = acepcion_texto.replace(',', ', ')
                acepcion_texto = acepcion_texto.capitalize()
                acepciones.append(acpcion_texto)

        if not acepciones:
            return ['La palabra que has indicado no está recogida en el diccionario.']

        return acepciones

    except requests.exceptions.RequestException as e:
        print(f"Error en la petición HTTP: {e}")
        return ['No se pudo obtener la definición.']
    except Exception as e:
        print(f"Error al procesar la palabra '{palabra}': {e}")
        return ['Ocurrió un error inesperado al obtener la definición.']

def guardar_definiciones(palabras_definiciones):
    try:
        with open('./5-definiciones-cambridge.json', 'w', encoding='utf-8') as file:
            json.dump(palabras_definiciones, file, ensure_ascii=False, indent=4)
        print(f'\nDefiniciones guardadas en "5-definiciones-cambridge.json".')
    except Exception as e:
        print(f"Error al guardar las definiciones en el archivo JSON: {e}")

def main():
    palabras = leer_palabras()
    if not palabras:
        print('No se pudieron obtener las palabras del archivo.')
        return
    
    palabras_definiciones = []
    palabras_existentes = leer_english_json()

    for palabra in palabras:
        print(f'Obteniendo definición de {palabra}...')
        aceps = acepciones(palabra)
        palabras_definiciones.append({
            'palabra': palabra,
            'acepciones': aceps[:2]  # Limita las acepciones a las dos primeras
        })

        # Si la palabra existe, añadirla a 5-english.json
        if 'La palabra que has indicado no está recogida en el diccionario.' not in aceps:
            guardar_english_json(palabra, palabras_existentes)

        # Esperar un tiempo aleatorio entre 1 y 3 segundos para evitar bloqueos
        time.sleep(random.uniform(1, 3))
    
    guardar_definiciones(palabras_definiciones)

if __name__ == '__main__':
    main()
