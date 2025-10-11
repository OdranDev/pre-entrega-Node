// Aqui vamos a importar las funciones desde ./fakestoreapi.js
import {
    deleteOneProduct,
    getAllProducts,
    getOneProduct,
    patchOneProduct,
    postOneProduct,
    putOneProduct,
} from "./fakestoreapi.js";

/* 
args[0] -> id
args[1] -> title
args[2] -> price
args[3] -> category
*/

const [, , comando, ...args] = process.argv;

const comprobarID = !args[0] || isNaN(args[0]) || args[0] < 0;
const mostrarError = `Error:\n -Debes proporcionar el ID del producto.\n -El ID debe ser un numero entero mayor a 0. `;

async function main() {
    if (!comando || comando == null) {
        console.log(`
USO DEL PROGRAMA:
    
  npm start getAll                                       - Obtener todos los productos
  npm start getOne <id>                                  - Obtener un producto por ID
  npm start post "<título>" <precio> "<categoria>"       - Crear un nuevo producto
  npm start delete <id>                                  - Eliminar un producto por ID
  npm start put <id> "<título>" <precio> "<categoria>"   - Editar un producto por ID
  npm start put <id> "<campo>" <valor>                   - Edita el campo o propiedad de un producto por ID

Ejemplos:
  npm start getAll
  npm start getOne 3
  npm start post "Laptop Gaming" 1299.99 "electronics"
  npm start delete 5
  npm start put 1 "Laptop Actualizada" 999.99 "electronics"
  npm start patch 9 Precio 369.99
    `);
        return;
    }
    const comandoMinusculas = (null || undefined) ?? comando.toLowerCase();
    switch (comandoMinusculas) {
        case "getall":
            // Ingresar por consola -> npm start getall para mostrar todos los productos
            console.log(
                `Obteniendo todos los productos...\n por favor espere un momento`
            );
            await getAllProducts();
            break;
        case "getone":
            if (comprobarID) {
                console.log(mostrarError);
            } else {
                // ingresar por consola -> npm start getOne <id>
                console.log(`🔍 Obteniendo producto con ID ${args[0]}...\n`);
                await getOneProduct(args[0]);
            }
            break;
        case "post":
            if (args.length < 3) {
                console.error(
                    `Error: Debes proporcionar "<título>" <precio> "<categoria>" `
                );
            } else {
                // Ingresar por consola -> npm start post "<título>" <precio> "<categoria>"
                const nuevoProducto = {
                    title: args[0],
                    price: parseFloat(args[1]),
                    category: args[2],
                };
                console.log(`Creando nuevo producto...\n`);
                await postOneProduct(nuevoProducto);
            }
            break;
        case "delete":
            if (comprobarID) {
                console.log(mostrarError);
            } else {
                // Ingresar por consola -> npm start delete <id>
                console.log(`Eliminando producto con ID ${args[0]}`);
                await deleteOneProduct(args[0]);
            }
            break;
        case "put":
            if (args.length < 4 || isNaN(args[2])) {
                console.error(`Error: Debes proporcionar todos los campos\n`, {
                    id: "Numero de ID del producto",
                    title: "Nombre o titulo del producto",
                    price: "Unicamente numerico",
                    Category: "Categoria a la que pertenece el producto",
                });
            } else {
                // Ingresa -> npm start put <id> "<título>" <precio> "<categoría>"
                const productoActualizado = {
                    title: args[1],
                    price: args[2],
                    category: args[3],
                };
                console.log(`Editando producto con ID ${args[0]}...\n`);
                await putOneProduct(args[0], productoActualizado);
            }
            break;
        case "patch":
            const id = args[0];
            const campo = args[1];
            const valor = args[2];

            const cambios = { [campo]: isNaN(valor) ? valor : +valor };

            if (comprobarID || args.length < 3) {
                console.log(
                    mostrarError,
                    `\n-Campo a modificar\n-Nuevo Valor\n`,
                    `Ejemplo: npm start patch 3 price 99.99`
                );
            } else {
                console.log(`Actualizando producto con ID ${id}, campo ${campo}...\n`);
                await patchOneProduct(id, cambios);
            }

            break;
        default:
            console.error(`Comando desconocido: "${comando}"`);
            break;
    }
}
main().catch((error) => {
    console.error(`Error en el programa: ${error.message}`);
});
