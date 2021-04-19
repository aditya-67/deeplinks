const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const quantity = urlParams.get('quantity');
const sku = urlParams.get('sku');
const xhttp = new XMLHttpRequest();

xhttp.open("GET", request_url+'/products', false);
xhttp.send();

const products = JSON.parse(xhttp.responseText);
let product = products.find(o => o.sku === sku);
let amount = product.amount * quantity;

amount = (amount / 100).toFixed(2);

$('#display_amount').text(amount);
$('#sku').val(sku);
$('#quantity').val(quantity);
$('#amount').val(parseInt(amount));

var PrefillMachine = {
  
  init: function() {
    this.bindUIActions();
  },
  
  bindUIActions: function() {
    $("#prefill-correct").on("click", $.proxy(this.prefillCorrectly, this));
  },
  
  prefillCorrectly: function() {

    var id = this._makeId();

    // Prefixing only because would be easier to find in the database and purge.
    $("#name").val("Customer_" + id);
    // The "+" syntax here is for GMail, which means I can use something unique but still receive the email for testing.
    $("#email").val("customer_" + id + "@gmail.com");
    
    $("#address").val(this._rand(1000, 9000) + " Landmark_" + id);
    $("#city").val("City_"+id);
  },

  _makeId: function()  {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i=0; i < 3; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text.toUpperCase();
  },
  
  _rand: function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}

PrefillMachine.init();
