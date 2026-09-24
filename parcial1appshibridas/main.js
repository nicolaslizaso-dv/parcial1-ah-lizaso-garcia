import express from "express"
import cartaRoutes from "./routes/carta.routes.js"
import platosApiRoutes from "./api/routes/platos.routes.js"
import resenasApiRoutes from "./api/routes/resenas.routes.js"

const app = express()

app.use("/", express.static("public"))          
app.use(express.urlencoded({ extended: true }))  
app.use(express.json())                     

app.use(cartaRoutes)       
app.use(platosApiRoutes)  
app.use(resenasApiRoutes) 
app.listen(3333, () => console.log("Bodegón abierto en http://localhost:3333"))
