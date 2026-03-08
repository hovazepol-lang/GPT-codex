# Creador de Criaturas para RPG

Mini app web (HTML/CSS/JS) para generar criaturas con:

- Tipo de criatura (bestia, no muerto, elemental, feérico).
- Nivel de desafío (1-20).
- Nombre personalizado opcional.
- Estadísticas automáticas (PV, ataque, defensa, velocidad).
- Dos habilidades aleatorias.

## Ejecutar en local (recomendado)

```bash
python3 server.py
```

Después abre:

- `http://localhost:8000`
- o `http://127.0.0.1:8000`

## Si te aparece "Not Found"

Ese error suele pasar cuando el servidor se inicia desde otra carpeta.

- Asegúrate de ejecutar `python3 server.py` **dentro de este proyecto**, o
- ejecuta el archivo por ruta absoluta (ejemplo):

```bash
python3 /ruta/a/GPT-codex/server.py
```

Como alternativa también puedes usar:

```bash
python3 -m http.server 8000
```

pero **solo** si estás parado en esta carpeta (`/workspace/GPT-codex`).
