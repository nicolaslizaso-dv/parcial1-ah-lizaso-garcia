import { secciones } from "../data/secciones.js"

const NOMBRE_BODEGON = "Bodegón Don Ramón"

// head, menú de la carta y contenido
export function armarPagina(titulo, contenido) {
    return `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${titulo} | ${NOMBRE_BODEGON}</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Bitter:wght@400;700&display=swap" rel="stylesheet">
    <link href="/estilos.css" rel="stylesheet">
</head>
<body>
    ${armarMenu()}
    <main class="container py-4">
        <h1 class="titulo">${titulo}</h1>
        ${contenido}
    </main>
</body>
</html>`
}

// links a la carta + el acceso al panel de platos
function armarMenu() {
    let links = ""
    secciones.forEach(seccion => {
        links += `<li class="nav-item"><a class="nav-link" href="/carta/${seccion.slug}">${seccion.nombre}</a></li>`
    })
    return `
    <header class="encabezado">
        <div class="container">
        <nav class="navbar navbar-expand flex-wrap">
            <a class="navbar-brand marca" href="/">${NOMBRE_BODEGON}</a>
            <ul class="navbar-nav flex-wrap">
                ${links}
                <li class="nav-item"><a class="nav-link panel-link" href="/platos">Panel</a></li>
            </ul>
        </nav>
        </div>
    </header>
    <div class="mantel"></div>`
}

// armar cada carta
export function armarItemCarta(plato) {
    return `
    <article class="item-carta">
        <img src="${plato.imagen}" alt="${plato.nombre}" class="item-carta__img">
        <div class="item-carta__texto">
            <div class="item-carta__cabecera">
                <h2 class="item-carta__nombre">${plato.nombre}</h2>
                <span class="item-carta__puntos"></span>
                <span class="item-carta__precio">$${plato.precio}</span>
            </div>
            <p class="mb-2">${plato.descripcion}</p>
            <p class="mb-1">${armarEtiquetas(plato.etiquetas)}</p>
            <a href="${plato.link}" target="_blank" class="item-carta__link">Ver la receta</a>
        </div>
    </article>`
}

export function armarEtiquetas(etiquetas) {
    let html = ""
    etiquetas.forEach(etiqueta => html += `<span class="etiqueta">${etiqueta}</span>`)
    return html
}
