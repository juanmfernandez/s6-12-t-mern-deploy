# At Tempo Backend

## Iniciando el proyecto:

### Dev Local:
1. Clonar el proyecto
2. Copiar el archivo example.env con el nombre .env
3. Configurar las variables de entorno del nuevo .env creado
4. Ejecutar el comando `npm i`
5. Instalar sequelize-cli de manera global: `npm i sequelize-cli -g`
6. Instalar mysql2 de manera global: `npm i mysql2 -g`
7. Iniciar la base de datos con el comando `sequelize db:create` 
8. Ejecutar el comando `npm run dev` para ejecutar con nodemon

### Contenedor de docker:
1. Clonar el proyecto
2. Copiar el archivo example.env con el nombre .env
3. Configurar las variables de entorno del nuevo .env creado
4. Ejecutar el comando `docker-compose up -d`