export const cartProduct = {
  id: '1',
  title: 'Product 1',
  price: '100',
  description: 'Description 1',
  category: 'Category 1',
  count: 1,
  image: '',
  rating: {
    rate: 2,
    count: 4,
  },
};

export const mockProducts = [
  {id: '1', title: 'Product 1', price: 100, description: 'Description 1', category: 'Category 1', count: 1},
  {id: '2', title: 'Product 2', price: 200, description: 'Description 2', category: 'Category 2', count: 1},
];

export function nameValidator(control: any) {
  const nameRegex = /^[a-zA-Z\s]*$/;
  if (!nameRegex.test(control.value)) {
    return {invalidName: true};
  }
  return null;
}
