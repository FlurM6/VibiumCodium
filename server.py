#!/usr/bin/env python3
"""Simple HTTP server for Cosmic Quest frontend"""
import http.server
import socketserver
import os

os.chdir(r"c:\Users\astle\OneDrive\Desktop\Projects\M6_Floor Game")

PORT = 8000
Handler = http.server.SimpleHTTPRequestHandler

try:
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"🎮 Cosmic Quest server running at http://localhost:{PORT}")
        print("Press Ctrl+C to stop")
        httpd.serve_forever()
except KeyboardInterrupt:
    print("\nServer stopped")
except OSError as e:
    print(f"Error: {e}")
    print(f"Port {PORT} might be in use. Try a different port.")
