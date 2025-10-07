// Aqui vamos a importar las funciones desde ./fakestoreapi.js
import { getAllProducts, getOneProduct } from "./fakestoreapi.js"

const [,, comando, ...args] = process.argv
const comandoMinusculas = comando.toLowerCase();
async function main(){
    switch (comandoMinusculas) {
        case "getall":
            // Hay que ingresar por consola -> npm start getall para mostrar todos los productos
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

        default:
            console.error(`Comando desconocido: "${comando}"`)
            break;
    }
}
main().catch(error => {console.error(`Error en el programa: ${error.message}`)})