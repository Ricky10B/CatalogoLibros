# Catalogo de libros

Una prueba técnica para desarrollar un catalogo de libros propuesta por midudev, [Ir a la prueba](https://github.com/midudev/pruebas-tecnicas/blob/main/pruebas/01-reading-list/README.md)

url del proyecto desplegado: https://catalogo-libros.vercel.app/

### Iniciar el proyecto

```bash
npm install ó npm i
npm run dev
```

## Tests

### Tests e2e

La aplicación debe estar ejecutándose para que cypress pueda realizar los tests.

Puedes ejecutar la aplicación con el siguiente comando

```bash
npm run dev
```

Ejecutar tests

```bash
npm run cypress:open # Test visuales
npm run cypress:e2e # Tests en modo headless
```

### Tests unitarios y de integración

Tests con react-testing-library y con jest

Ejecutar tests

```bash
npm test
```
