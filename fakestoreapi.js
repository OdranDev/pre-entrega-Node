// Aqui las funciones que vamos a exportar con node modules para usar desde el index.js
const url = "https://fakestoreapi.com/products"
async function getAllProducts() {
    try {
        const response = await fetch(url, {method: "GET"})
        if(!response.ok){ throw new Error(`HTTP status: ${response.status}`) }
        const data = await response.json()
        console.log(data)
    } catch (error) {
        console.error(`${error.message}`)
    } finally {
        console.log(`Final`)
    }
}
export {getAllProducts}