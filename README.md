# Archivo Anto Marino

Sitio estatico en HTML/CSS/JS para mostrar proyectos de diseno.

## Estructura

- `index.html`
- `assets/css/styles.css`
- `assets/js/app.js`
- `assets/img/`
- `assets/pdf/`

## Ejecutar localmente

Opcion recomendada para previsualizar PDF con PDF.js:

```bash
python3 -m http.server 8123
```

Abrir en el navegador:

- `http://127.0.0.1:8123/`

## Publicar en GitHub

```bash
git init
git add .
git commit -m "feat: preparar sitio estatico"
git branch -M main
git remote add origin <TU_REPO_GITHUB>
git push -u origin main
```

## Deploy en Vercel

1. Entra a Vercel y elige `Add New Project`.
2. Importa el repositorio de GitHub.
3. Framework Preset: `Other`.
4. Build Command: vacio.
5. Output Directory: vacio (raiz).
6. Deploy.

Vercel detecta este proyecto como estatico y sirve `index.html` automaticamente.

## Nota sobre PDF

Si abres con `file://`, la previsualizacion del PDF puede fallar por restricciones del navegador.
Usa servidor local o deploy para validar PDF.js correctamente.
