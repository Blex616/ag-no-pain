# Pasos para desplegar

1. Tener instalado angular CLI
- https://cli.angular.io/

2. Ejecutar ng build

3. Crear la carpeta contenedora
- sudo mkdir -p /var/www/html/ag-no-pain

4. Copiar el contenido de la carpeta dist a la ruta creada
- sudo cp -R dist/ag-no-pain/* /var/www/html/ag-no-pain/

5. Navegar 
- http://127.0.0.1/