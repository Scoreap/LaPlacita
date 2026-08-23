# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Acceso de administrador

El panel de administración (`/admin/login`) usa credenciales fijas definidas en `src/pages/AdminLogin.jsx`:

- **Correo:** `admin@laplacita.com`
- **Contraseña:** `admin123`

Desde `/admin` se pueden agregar, editar, eliminar y ocultar/mostrar platillos (el toggle "Visible/Oculto" controla si el platillo aparece en el menú público, útil para manejarlo por temporadas). Los datos se guardan en Firestore (proyecto `la-placita-bd`), configurado en `src/firebase.js`.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
