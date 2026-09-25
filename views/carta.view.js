import { armarPagina, armarItemCarta, armarEtiquetas } from "../page/layout.js"
import { secciones } from "../data/secciones.js"

// portada
export function portada(resenas) {
    let indice = ""
    secciones.forEach(seccion => {
        indice += `<a class="indice__link" href="/carta/${seccion.slug}">${seccion.nombre}</a>`
    })

    let tarjetas = ""
    resenas.forEach(resena => tarjetas += armarResena(resena))
    if (resenas.length == 0) tarjetas = `<p>Todavía no hay reseñas.</p>`

    const html = `
    <section class="presentacion">
        <p class="presentacion__texto">
            Milanesas que no entran en el plato, pastas amasadas a mano y el flan de siempre.
            Cocina porteña para ir con la familia, los amigos o solo, a la barra.
        </p>
        <a class="btn btn-vino btn-lg" href="#carta">Ver la carta</a>
    </section>

    <section id="carta" class="bloque">
        <h2 class="bloque__titulo">La carta</h2>
        <div class="indice">${indice}</div>
    </section>

    <section class="bloque">
        <h2 class="bloque__titulo">Lo que dicen los que vinieron</h2>
        <div class="resenas">${tarjetas}</div>
    </section>`
    return armarPagina("Bienvenidos", html)
}

// card de reseña
function armarResena(resena) {
    const estrellas = "★".repeat(resena.puntaje) + "☆".repeat(5 - resena.puntaje)
    return `
    <article class="resena">
        <div class="resena__autor">
            <img src="${resena.foto}" alt="${resena.nombre}" class="resena__foto">
            <div>
                <p class="resena__nombre">${resena.nombre}</p>
                <p class="resena__estrellas" aria-label="${resena.puntaje} de 5">${estrellas}</p>
            </div>
        </div>
        <p class="mb-0">${resena.descripcion}</p>
    </article>`
}

// platos x seccion
export function cartaSeccion(seccion, platos) {
    let html = ""
    if (platos.length == 0) {
        html = `<p>Por ahora no hay platos en esta sección. <a href="/platos/nuevo">Agregar uno</a></p>`
    } else {
        platos.forEach(plato => html += armarItemCarta(plato))
    }
    return armarPagina(seccion.nombre, html)
}

// ABM para platos
export function panelPlatos(platos) {
    let filas = ""
    platos.forEach(plato => {
        filas += `
        <tr>
            <td><img src="${plato.imagen}" alt="" class="miniatura"></td>
            <td>${plato.nombre}</td>
            <td>${plato.seccion}</td>
            <td>$${plato.precio}</td>
            <td class="text-nowrap">
                <a class="btn btn-sm btn-outline-dark" href="/platos/${plato._id}">Ver</a>
                <a class="btn btn-sm btn-outline-dark" href="/platos/editar/${plato._id}">Editar</a>
                <a class="btn btn-sm btn-outline-danger" href="/platos/eliminar/${plato._id}">Eliminar</a>
            </td>
        </tr>`
    })

    const html = `
    <a class="btn btn-vino mb-3" href="/platos/nuevo">Agregar plato</a>
    <div class="table-responsive">
        <table class="table align-middle">
            <thead><tr><th>Foto</th><th>Plato</th><th>Sección</th><th>Precio</th><th></th></tr></thead>
            <tbody>${filas}</tbody>
        </table>
    </div>`
    return armarPagina("Panel de platos", html)
}

export function fichaPlato(plato) {
    const html = `
    <div class="row g-4">
        <div class="col-md-6"><img src="${plato.imagen}" alt="${plato.nombre}" class="img-fluid rounded"></div>
        <div class="col-md-6">
            <p class="precio-grande">$${plato.precio}</p>
            <p>${plato.descripcion}</p>
            <p>${armarEtiquetas(plato.etiquetas)}</p>
            <p><a href="${plato.link}" target="_blank">Ver la receta</a></p>
            <a class="btn btn-outline-dark" href="/carta/${plato.seccion}">Volver a la carta</a>
        </div>
    </div>`
    return armarPagina(plato.nombre, html)
}

// form de alta y edicion
export function formularioPlato(titulo, accion, plato = {}, errores = []) {
    let etiquetas = plato.etiquetas || ""
    if (Array.isArray(etiquetas)) etiquetas = etiquetas.join(", ")

    let avisos = ""
    if (errores.length > 0) {
        avisos = `<div class="alert alert-danger"><ul class="mb-0">`
        errores.forEach(error => avisos += `<li>${error}</li>`)
        avisos += `</ul></div>`
    }

    let opciones = ""
    secciones.forEach(seccion => {
        const marcada = seccion.slug == plato.seccion ? "selected" : ""
        opciones += `<option value="${seccion.slug}" ${marcada}>${seccion.nombre}</option>`
    })

    const html = `
    ${avisos}
    <form action="${accion}" method="post" class="col-lg-8">
        ${campo("Nombre del plato", "nombre", plato.nombre)}
        <div class="mb-3">
            <label class="form-label" for="descripcion">Descripción</label>
            <textarea class="form-control" id="descripcion" name="descripcion" rows="3">${plato.descripcion || ""}</textarea>
        </div>
        ${campo("Precio", "precio", plato.precio)}
        ${campo("Etiquetas (separadas por coma, ej: veggie, sin tacc)", "etiquetas", etiquetas)}
        ${campo("Link a la receta", "link", plato.link)}
        ${campo("URL de la imagen (ej: https://picsum.photos/400/300)", "imagen", plato.imagen)}
        <div class="mb-3">
            <label class="form-label" for="seccion">Sección</label>
            <select class="form-select" id="seccion" name="seccion">${opciones}</select>
        </div>
        <button type="submit" class="btn btn-vino">Guardar</button>
        <a href="/platos" class="btn btn-link">Cancelar</a>
    </form>`
    return armarPagina(titulo, html)
}

function campo(etiqueta, nombre, valor) {
    return `
        <div class="mb-3">
            <label class="form-label" for="${nombre}">${etiqueta}</label>
            <input class="form-control" type="text" id="${nombre}" name="${nombre}" value="${valor || ""}">
        </div>`
}

export function confirmarBaja(plato) {
    const html = `
    <p>Vas a sacar <strong>${plato.nombre}</strong> de la carta. ¿Seguro?</p>
    <form action="/platos/eliminar/${plato._id}" method="post">
        <button type="submit" class="btn btn-danger">Sí, eliminar</button>
        <a href="/platos" class="btn btn-link">Cancelar</a>
    </form>`
    return armarPagina("Eliminar plato", html)
}

export function paginaError(mensaje) {
    return armarPagina("Algo salió mal", `<p>${mensaje}</p><a href="/">Volver a la carta</a>`)
}
