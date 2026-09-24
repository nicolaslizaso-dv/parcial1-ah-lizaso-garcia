# Bodegón Don Ramón

Parcial 1 - Aplicaciones Híbridas

## Para correrlo

npm install
npm run seed  (carga los platos y las reseñas de ejemplo)
npm run dev

Queda en http://localhost:3333

## API

GET     /api/platos          filtros: ?seccion= y ?etiqueta=
GET     /api/platos/:id
POST    /api/platos
PUT     /api/platos/:id
PATCH   /api/platos/:id
DELETE  /api/platos/:id

GET     /api/resenas
POST    /api/resenas

Las fotos de los platos son de Wikimedia Commons.