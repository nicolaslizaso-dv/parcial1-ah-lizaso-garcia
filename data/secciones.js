
export const secciones = [
    { nombre: "Entradas", slug: "entradas" },
    { nombre: "Minutas", slug: "minutas" },
    { nombre: "Pastas", slug: "pastas" },
    { nombre: "Postres", slug: "postres" },
    { nombre: "Bebidas", slug: "bebidas" }
]

export function obtenerSeccion(slug) {
    return secciones.find(seccion => seccion.slug == slug)
}
