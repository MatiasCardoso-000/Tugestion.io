# Backend

Este directorio contiene el código del servidor de la aplicación de gestión de gastos.

## Estructura de Carpetas

-   `src/`
    -   `config/`: Contiene la configuración de la aplicación, como las variables de entorno.
    -   `controllers/`: Lógica de negocio para manejar las peticiones HTTP.
    -   `database/`: Configuración y conexión con la base de datos PostgreSQL.
    -   `middleware/`: Middlewares de Express para la autenticación, validación, etc.
    -   `models/`: Modelos de datos de la base de datos.
    -   `routes/`: Definición de las rutas de la API.
    -   `schemas/`: Esquemas de validación de datos con Zod.
    -   `types/`: Definiciones de tipos de TypeScript.
    -   `utils/`: Funciones de utilidad, como la generación de JWT.
    -   `index.ts`: Punto de entrada de la aplicación.

## Scripts

-   `npm run dev`: Inicia el servidor en modo de desarrollo con recarga automática.
-   `npm run build`: Compila el código de TypeScript a JavaScript.
-   `npm run start`: Inicia el servidor en modo de producción.
-   `npm test`: Ejecuta los tests.
-   `npm test:watch`: Ejecuta los tests en modo de escucha.

## Endpoints de la API

(Aquí se pueden documentar los endpoints de la API, por ejemplo)

-   **Autenticación**
    -   `POST /api/register`: Registrar un nuevo usuario.
    -   `POST /api/login`: Iniciar sesión.
    -   `POST /api/logout`: Cerrar sesión.
-   **Categorías**
    -   `GET /api/categories`: Obtener todas las categorías.
    -   `POST /api/categories`: Crear una nueva categoría.
-   **Gastos**
    -   `GET /api/expenses`: Obtener todos los gastos.
    -   `POST /api/expenses`: Crear un nuevo gasto.
