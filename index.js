// Aqui vamos a importar las funciones desde ./fakestoreapi.js

import { getAllProducts } from "./fakestoreapi.js"

const [,, comando] = process.argv

async function main(){
    switch (comando.toLowerCase()) {
        case "getall":
            // Hay que ingresar por consola -> npm start getall para mostrar todos los productos
            console.log(`Obteniendo todos los productos...\n `)
            await getAllProducts()
            break;
    
        default:
            console.error(`Comando desconocido: "${comando}"`)
            break;
    }
}
main().catch(error => {console.error(`Error en el programa: ${error.message}`)})