# Pasos para desplegar

# Version de Angular 11

1. Tener instalado angular CLI
- https://cli.angular.io/

2. Ejecutar 
- npm install

3. Ejecutar 
- ng build

4. Crear la carpeta contenedora
- sudo mkdir -p /var/www/html/ag-no-pain

5. Copiar el contenido de la carpeta dist a la ruta creada
- sudo cp -R dist/ag-no-pain/* /var/www/html/ag-no-pain/

6. Navegar 
- http://127.0.0.1/

7. Usuario administrador
- Usuario: 1152
- Contraseña: 2021