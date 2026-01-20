// product.js

// Array donde se guardan los productos
let products = [];

// Id que se va incrementando
let id = 0;

// Reinicia los productos y el id
function resetProducts() {
  products = [];
  id = 0;
}

// Devuelve todos los productos
function getProducts() {
  return [...products];
}

// Añade un producto
function addProduct(name, price) {
  // Si no hay nombre o precio, error
  if (name === undefined || price === undefined) {
    throw new Error('name and price must be defined');
  }

  // Si el producto ya existe, error
  const exists = products.some((p) => p.name === name);
  if (exists) {
    throw new Error('product already exists');
  }

  // Aumentamos el id
  id++;

  // Creamos el producto
  const newProduct = {
    id,
    name,
    price,
  };

  // Lo añadimos al array
  products.push(newProduct);

  return newProduct;
}

// Elimina un producto por id
function removeProduct(productId) {
  const index = products.findIndex((p) => p.id === productId);

  // Si no existe, error
  if (index === -1) {
    throw new Error('product does not exist');
  }

  // Eliminamos el producto
  return products.splice(index, 1)[0];
}

// Devuelve un producto por id
function getProduct(productId) {
  const product = products.find((p) => p.id === productId);

  // Si no existe, error
  if (!product) {
    throw new Error('product does not exist');
  }

  return product;
}

// Actualiza un producto
function updateProduct(productId, name, price) {
  const product = products.find((p) => p.id === productId);

  // Si no existe, error
  if (!product) {
    throw new Error('product does not exist');
  }

  // Si hay nombre, lo actualizamos
  if (name !== undefined) {
    const nameTaken = products.some(
      (p) => p.name === name && p.id !== productId
    );
    if (nameTaken) {
      throw new Error('product already exists');
    }
    product.name = name;
  }

  // Si hay precio, lo actualizamos
  if (price !== undefined) {
    product.price = price;
  }

  return product;
}

// Exportamos las funciones
module.exports = {
  resetProducts,
  addProduct,
  removeProduct,
  getProducts,
  getProduct,
  updateProduct,
};
