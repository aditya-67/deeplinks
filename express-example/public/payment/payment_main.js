function getOrderData(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const reference = urlParams.get('reference');
    const xhttp = new XMLHttpRequest();
    const url = request_url+'/orders/' + reference;

    xhttp.open("GET", url, false);
    xhttp.send();

    console.log(xhttp.responseText);
    const order = JSON.parse(xhttp.responseText);

    return order;
}

function apiKey() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", request_url+'/api-key', false);
    xhttp.send();

    const key = JSON.parse(xhttp.responseText);

    return key;
}

// const order_data = getOrderData();

// $('#cod').val(order_data["reference_code"]);

// // Include below code in a script tag
// const maesh = Maesh();
// maesh.create({
//   api_key: apiKey(),
//   dom_element_id: "maesh",
//   currency: "SGD",
//   amount: parseInt(order_data["amount"]),
//   gotoUrl: request_url+'/redirect',
//   referenceCode: order_data["reference_code"],
// });

// payment Tabs
$(".cards .card").click(function () { // Add active class to active link
    $(this).addClass("active").siblings().removeClass("active"); // Hide all divs on click
    $(".action > div").hide(); //show div
    $('.' + $(this).data("class")).show();
    //$('.action').slideUp();
    //$('.action').delay(0).slideDown();
    //$('.action').stop();
});

// hide show edit card
$('.editcardForm').on('click', function () {
    if ($('.editCard').hasClass('hide')) {
        $('.editCard').removeClass('hide').addClass('show');
    } else {
        $('.editCard').addClass('hide').removeClass('show');
    }
});

$('#upi-pay').on('click', function () {
    $.post(request_url + "/upi-pay",
    {
        amount: 100,
    },
function(data,status){
    $('#upi-links').show();
    $('#upi-pay').hide();
    $('#payment-link').text(JSON.stringify(data['data'], null, 4));
    $('#click-to-pay').attr('href', data['data']['data']['paymentLink']['shortURL']);
    $('#payment-status').text(JSON.stringify(data['status'], null, 4));

});
})