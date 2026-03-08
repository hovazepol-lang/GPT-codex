#!/usr/bin/env python3
"""Servidor local para el creador de criaturas.

Sirve siempre los archivos desde la carpeta del proyecto, incluso si se ejecuta
el comando desde otro directorio.
"""

from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path

HOST = "0.0.0.0"
PORT = 8000
ROOT_DIR = Path(__file__).resolve().parent


class AppHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT_DIR), **kwargs)

    def do_GET(self):
        # Alias amable por si alguien navega a /index
        if self.path == "/index":
            self.path = "/index.html"
        return super().do_GET()


if __name__ == "__main__":
    httpd = ThreadingHTTPServer((HOST, PORT), AppHandler)
    print(f"Servidor listo en http://localhost:{PORT}")
    print(f"Sirviendo archivos desde: {ROOT_DIR}")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServidor detenido.")
