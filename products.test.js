const {
  resetProducts,
  addProduct,
  removeProduct,
  getProducts,
  getProduct,
  updateProduct,
} = require('./methods');

beforeEach(() => {
  resetProducts();
});

describe('Adding Products', () => {
  it('should add a product', () => {
    const product = addProduct('Laptop', 1000);

    expect(product).toEqual({
      id: 1,
      name: 'Laptop',
      price: 1000,
    });

    expect(getProducts().length).toBe(1);
  });

  it('should increment id each time a product is added', () => {
    const p1 = addProduct('Phone', 500);
    const p2 = addProduct('Tablet', 800);

    expect(p1.id).toBe(1);
    expect(p2.id).toBe(2);
  });

  it('should throw error if name is not defined', () => {
    expect(() => addProduct(undefined, 100)).toThrow();
  });

  it('should throw error if price is not defined', () => {
    expect(() => addProduct('Mouse', undefined)).toThrow();
  });

  it('should throw error if product already exists', () => {
    addProduct('Keyboard', 50);
    expect(() => addProduct('Keyboard', 60)).toThrow();
  });
});

describe('Removing Products', () => {
  it('should remove a product', () => {
    const product = addProduct('Monitor', 300);
    removeProduct(product.id);

    expect(getProducts().length).toBe(0);
  });

  it('should throw error if product does not exist', () => {
    expect(() => removeProduct(999)).toThrow();
  });
});

describe('Getting a single product', () => {
  it('should get a product by id', () => {
    const product = addProduct('Desk', 200);
    const found = getProduct(product.id);

    expect(found).toEqual(product);
  });

  it('should throw error if product does not exist', () => {
    expect(() => getProduct(123)).toThrow();
  });
});

describe('Updating Products', () => {
  it('should update a product', () => {
    const product = addProduct('Chair', 80);
    const updated = updateProduct(product.id, 'Office Chair', 120);

    expect(updated).toEqual({
      id: product.id,
      name: 'Office Chair',
      price: 120,
    });
  });

  it('should throw error if product does not exist', () => {
    expect(() => updateProduct(999, 'X', 10)).toThrow();
  });

  it('should only update the price', () => {
    const product = addProduct('Lamp', 40);
    const updated = updateProduct(product.id, undefined, 60);

    expect(updated.name).toBe('Lamp');
    expect(updated.price).toBe(60);
  });

  it('should only update the name', () => {
    const product = addProduct('Sofa', 500);
    const updated = updateProduct(product.id, 'Big Sofa', undefined);

    expect(updated.name).toBe('Big Sofa');
    expect(updated.price).toBe(500);
  });
});
