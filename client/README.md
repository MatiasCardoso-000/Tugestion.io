# Frontend (Cliente)

Este directorio contiene el código del cliente de la aplicación de gestión de gastos, construido con React y Vite.

## Estructura de Carpetas

-   `src/`
    -   `api/`: Funciones para realizar peticiones a la API del backend.
    -   `assets/`: Archivos estáticos como imágenes y SVGs.
    -   `components/`: Componentes de React reutilizables.
    -   `context/`: Contextos de React para el manejo del estado global.
    -   `hooks/`: Hooks de React personalizados.
    -   `pages/`: Páginas principales de la aplicación.
    -   `router/`: Configuración de las rutas de la aplicación.
    -   `types/`: Definiciones de tipos de TypeScript.
    -   `App.tsx`: Componente principal de la aplicación.
    -   `main.tsx`: Punto de entrada de la aplicación.

## Scripts

-   `npm run dev`: Inicia el servidor de desarrollo de Vite.
-   `npm run build`: Compila la aplicación para producción.
-   `npm run lint`: Ejecuta el linter de ESLint.
-   `npm run preview`: Sirve la aplicación compilada localmente.

## Componentes Principales

-   **`Header`**: Barra de navegación superior.
-   **`Aside`**: Barra lateral con las categorías.
-   **`ExpensesList`**: Lista de gastos.
-   **`ExpenseForm`**: Formulario para añadir nuevos gastos.
-   **`CategoriesList`**: Lista de categorías.
-   **`LoginComponent` / `RegisterComponent`**: Formularios de autenticación.