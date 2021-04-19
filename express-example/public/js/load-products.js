function createProductFromTemplate(item) {
  const template = document.querySelector('#product');
  const product = template.content.cloneNode(true);

  product.querySelector('h2').innerText = item.name;
  product.querySelector('.description').innerText = item.description;
  product.querySelector('.form').action = "./checkout"
  product.querySelector('[name=sku]').value = item.sku;
  product.querySelector('#quantity').max = item.quantity;
  product.querySelector('.items_left').innerText = 'Items left: ' + item.quantity;
  if(item.quantity < 1){
    product.querySelector('#buy').innerText = 'Out of Stock';
    product.querySelector('#buy').disabled = true;
  }
  product.querySelector('.price').innerText = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: item.currency,
  }).format((item.amount / 100).toFixed(2));

  const img = product.querySelector('img');
  img.src = item.image;
  img.alt = item.name;

  return product;
}

export async function loadProducts() {
  console.log(request_url);
  const data = await fetch(request_url+'/products')
    .then((res) => res.json())
    .catch((err) => console.error(err));

  const container = document.querySelector('.products');

  console.log(data);

  data.forEach((item) => {
    const product = createProductFromTemplate(item);

    container.appendChild(product);
  });

}