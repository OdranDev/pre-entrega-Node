// Aqui vamos a importar las funciones desde ./fakestoreapi.js
import { deleteOneProduct, getAllProducts, getOneProduct, postOneProduct } from "./fakestoreapi.js"

const [,, comando, ...args] = process.argv
const comandoMinusculas = comando.toLowerCase();
async function main(){
    switch (comandoMinusculas) {
        case "getall":
            // Ingresar por consola -> npm start getall para mostrar todos los productos
            console.log(`Obteniendo todos los productos...\n por favor espere un momento`)
            await getAllProducts()
            break;
        case 'getone':
            // ingresar por consola -> npm start getOne <id> 
            if (!args[0]) {
            console.error('Error: Debes proporcionar un ID');
            console.log('Uso: npm start getOne <id>');
            return;
            }
            console.log(`🔍 Obteniendo producto con ID ${args[0]}...\n`);
            await getOneProduct(args[0]);
            break;
        case 'post':
            if(args.length < 3){
                console.error(`Error: Debes proporcionar "<título>" <precio> "<categoria>" `)
            }
            // Ingresar por consola -> npm start post "<título>" <precio> "<categoria>"
            const nuevoProducto = {
                title: args[0],
                price: parseFloat(args[1]),
                category: args[2],
            }
            console.log(`Creando nuevo producto...\n`)
            await postOneProduct(nuevoProducto)
            break

        case 'delete':
            // Ingresar por consola -> npm start delete <id>  
            console.log(`Eliminando producto con ID ${args[0]}`)
            await deleteOneProduct(args[0])
            break
        default:
            console.error(`Comando desconocido: "${comando}"`)
            break;
    }
}
main().catch(error => {console.error(`Error en el programa: ${error.message}`)})