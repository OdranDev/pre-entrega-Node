// Aqui las funciones que vamos a exportar con node modules para usar desde el index.js
const url = "https://fakestoreapi.com/products"
async function getAllProducts() {
    try {
        const response = await fetch(url, {method: "GET"})
        if(!response.ok){ throw new Error(`HTTP status: ${response.status}`) }
        const data = await response.json()
        const todosLosProductos = data.map((todos) => ({
            titulo: todos.title,
            precio: todos.price,
            catgoria: todos.category
        }))
        console.table(todosLosProductos)
        
    } catch (error) {
        console.error(`${error.message}`)
    } finally {
        console.log(`Final`)
    }
}

async function getOneProduct(searchID) {
  try {
    const response = await fetch(`${url}/${searchID}`, {method: "GET",});
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.table({
      id: data.id,
      title: data.title,
      price: data.price,
    });
  } catch (error) {
    console.error(`${error.message}`);
  } finally {
    console.log(`Fin`);
  }
}

async function postOneProduct(producto) {
    try {
        const response = await fetch(url, {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(producto)
        })
        if(!response.ok){
            throw new Error(`HTTP ERROR, Status: ${response.status}`)
        }
        const data = await response.json()
        console.log(`Nuevo Producto creado con éxito:\n`)
        console.table(({
            id: data.id,
            Titulo: data.title,
            Precio: +data.price.toFixed(2),
            Categoria: data.category
        }))
    } catch (error) {
      console.error(error.message)  
    } finally {
        console.log('Fin')
    }    
}

export {getAllProducts, getOneProduct, postOneProduct}