function createOrderFromTemplate(item) {
  const template = document.querySelector('#order');
  const order = template.content.cloneNode(true);

  order.querySelector('.reference').innerText = item.reference_code;
  order.querySelector('.customer').innerHTML = item.name + '<br />' + item.email + '<br />' + item.landmark + '<br />'+ item.city;
  order.querySelector('.product').innerHTML = item.sku + ' (' + item.quantity + ')';
  order.querySelector('.amount').innerText = item.amount;
  order.querySelector('.payment').innerText = item.payment;
  order.querySelector('.status').innerText = item.status;
  order.querySelector('.payment-method').innerText = item.payment_method;



  return order;
}

export async function loadOrders() {
  const data = await fetch(request_url+'/orders')
    .then((res) => res.json())
    .catch((err) => console.error(err));

  const container = document.querySelector('.orders');

  data.forEach((item) => {
    const order = createOrderFromTemplate(item);

    container.appendChild(order);
  });

}