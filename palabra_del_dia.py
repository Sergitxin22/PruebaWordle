import json
import random

def leer_definiciones():
    try:
        with open('src/data/spanish/sin-tildes/5-definiciones.json', 'r', encoding='utf-8') as file:
            data = json.load(file)
            return data if isinstance(data, list) else []
    except Exception as e:
        print(f"Error al leer el archivo JSON: {e}")
        return []

def guardar_definicion_hoy(definicion):
    try:
        with open('src/data/hoy/5/spanish/definiciones.json', 'w', encoding='utf-8') as file:
            json.dump(definicion, file, ensure_ascii=False, indent=4)
        print(f'Definición guardada en "data/hoy/5/spanish/definiciones.json".')
    except Exception as e:
        print(f"Error al guardar la definición en el archivo JSON: {e}")

def main():
    definiciones = leer_definiciones()
    if not definiciones:
        print('No se pudieron obtener las definiciones del archivo.')
        return
    
    # Selecciona una definición aleatoria
    definicion_aleatoria = random.choice(definiciones)
    
    # Guarda la definición seleccionada en el archivo de hoy
    guardar_definicion_hoy(definicion_aleatoria)

if __name__ == '__main__':
    main()
