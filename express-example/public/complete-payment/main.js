
$('#complete-payment').on('click', function(){
	$.post(request_url + "/complete-payment",
{
  upi_id: $('#upiID').val(),
  amount: $('#amount').val()
},
function(data,status){
	$('#status').show();
	$('#payment-link').text(JSON.stringify(data['data'], null, 4));
    $('#payment-status').text(JSON.stringify(data['status'], null, 4));

});
});