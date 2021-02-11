# Pasos para desplegar

# Version de Angular 11

# Version de Node requerida 12.18

1. Tener instalado angular CLI
- https://cli.angular.io/

2. Tener instalado NPM (Recomendado ultima versión)
- https://www.npmjs.com/get-npm

3. Ejecutar en la raiz de este proyecto
- npm install

4. Ejecutar en la raiz de este proyecto
- ng build

5. Crear la carpeta contenedora
- sudo mkdir -p /var/www/html/ag-no-pain

6. Copiar el contenido de la carpeta dist a la ruta creada
- sudo cp -R dist/ag-no-pain/* /var/www/html/ag-no-pain/

7. Navegar 
- http://127.0.0.1/

8. Usuario administrador
- Usuario: 1152
- Contraseña: 2021