# Discordia Perceptiva

Galería artística inmersiva de **Gonzalo Cid Anglés**, con cinco ilustraciones originales y sus relatos procedentes del documento *Discordia perceptiva*.

## Publicación en GitHub Pages

1. Crea un repositorio público llamado `discordia-perceptiva`.
2. Sube **el contenido de esta carpeta** a la raíz del repositorio (no la carpeta contenedora).
3. En GitHub, abre **Settings → Pages → Build and deployment**.
4. Selecciona **Deploy from a branch**, rama **main** y carpeta **/(root)**. Guarda.
5. La web aparecerá en `https://TU_USUARIO.github.io/discordia-perceptiva/` tras el despliegue.

## Probar en tu computador

No abras `index.html` directamente con doble clic: `fetch` no carga JSON desde `file://` en muchos navegadores.

Desde esta carpeta ejecuta:

```bash
python -m http.server 8000
```

Luego visita `http://localhost:8000`.

## Agregar obras

1. Guarda la ilustración en `assets/images/`.
2. Agrega un nuevo objeto al arreglo `data/obras.json` con `id`, `titulo`, `imagen`, `tema`, `poema`, `introduccion`, `relato`, `dimensiones`, `materiales` y `autor`.
3. Sube los cambios a GitHub. La galería se actualizará automáticamente.

## Notas editoriales

- Las ilustraciones se extrajeron directamente del PDF original, sin redibujarlas.
- Los relatos se extrajeron como texto, uniendo los saltos de línea producidos por la maquetación del PDF. Se recomienda cotejar las transcripciones con el original antes de publicar.
- Las dimensiones y materiales no se muestran cuando no constan en la ficha original.
- Las descripciones breves y los textos de navegación de la web son editoriales, no citas del autor.
- Asegúrate de contar con la autorización del titular de derechos antes de publicar las obras en un repositorio público.
