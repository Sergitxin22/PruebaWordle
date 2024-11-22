from bs4 import BeautifulSoup
import requests
import json

# Encabezado para simular una solicitud de un navegador real
HEADER = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'}

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
                # Reemplaza la coma por una coma seguida de un espacio
                acepcion_texto = acepcion_texto.replace(',', ', ')

                # Capitaliza la primera letra
                acepcion_texto = acepcion_texto.capitalize()
                acepciones.append(acepcion_texto)



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
