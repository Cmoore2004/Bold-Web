#!/usr/bin/env python3
"""
Simple HTTP Server for BOLD (Black Outreach Leadership Directive) Website
Runs locally without dependencies.
"""
import http.server
import socketserver
import os
import sys

PORT = 8080

class Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Enable caching-control for development and smooth loading
        self.send_header('Cache-Control', 'no-store, must-revalidate')
        super().end_headers()

def main():
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"================================================================")
        print(f" BOLD — Black Outreach Leadership Directive Website Server")
        print(f" Serving live at: http://localhost:{PORT}")
        print(f" Press Ctrl+C to stop the server.")
        print(f"================================================================")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer gracefully stopped.")
            sys.exit(0)

if __name__ == "__main__":
    main()
