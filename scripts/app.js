(function() {
  'use strict';

  window.onload = function() {
    let message = localStorage.getItem("message") || 'Your message will display here';
    $('#message').html(message);
    $('#display').html(message);
  }

  $('#button').click(() => {
    console.log('click')
    let message = $('#message').val();
    console.log(message);
    $('#display').html(message);
    localStorage.setItem("message", message);
  });

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('./service-worker.js')
             .then(function() { console.log('Service Worker Registered'); });
  }
})();

$(".getData").click(function(e) {
  e.preventDefault();
  $.ajax({
    url: "https://free.currencyconverterapi.com/api/v6/convert?q=USD_MMK,MMK_USD&compact=ultra",
    type:"GET",
    dataType:"json",
    beforeSend: function(){
      $('#img').show(); 
    },

    success:function(data) {
        $('.append_data').append(Math.floor(data.USD_MMK)+ 'ကျပ်');
    },
    complete: function(){
      $('#img').hide();
    }
});
});

