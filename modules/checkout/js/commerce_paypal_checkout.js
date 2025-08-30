/**
 * @file
 * Renders the PayPal Smart payment buttons.
 */

(function($) {
  Backdrop.paypalCheckout = {
    makeCall: function(url, settings) {
      settings = settings || {};
      var ajaxSettings = {
        dataType: 'json',
        url: url
      };
      $.extend(ajaxSettings, settings);
      return $.ajax(ajaxSettings);
    },
    renderButtons: function(settings) {
      $('.paypal-buttons-container').once('rendered').each(function() {
        paypal.Buttons({
          createOrder: function() {
            var ajaxSettings = {
              dataType: 'text',
            };
            return Backdrop.paypalCheckout.makeCall(settings.createOrderUri, ajaxSettings);
          },
          onApprove: function (data) {
            Backdrop.paypalCheckout.addLoader();
            var ajaxSettings = {
              type: 'POST',
              contentType: "application/json; charset=utf-8",
              data: JSON.stringify({
                id: data.orderID
              })
            };
            return Backdrop.paypalCheckout.makeCall(settings.onApproveUri, ajaxSettings).then(function(data) {
              if (data.hasOwnProperty('redirectUri')) {
                window.location.assign(data.redirectUri);
              }
            });
          },
          style: settings['style']
        }).render('#' + $(this).attr('id'));
      });
    },
    initialize: function (context, settings) {
      if (context === document) {
        var script = document.createElement('script');
        script.src = settings.src;
        script.type = 'text/javascript';
        script.setAttribute('data-partner-attribution-id', 'CommerceGuys_Cart_SPB');
        document.getElementsByTagName('head')[0].appendChild(script);
      }
      var waitForSdk = function(settings) {
        if (typeof paypal !== 'undefined') {
          Backdrop.paypalCheckout.renderButtons(settings);
        }
        else {
          setTimeout(function() {
            waitForSdk(settings)
          }, 100);
        }
      };
      waitForSdk(settings);
    },
    addLoader: function() {
      var $background = $('<div id="paypal-background-overlay"></div>');
      var $loader = $('<div class="paypal-background-overlay-loader"></div>');
      $background.append($loader);
      $('body').append($background);
    }
  };

  Backdrop.behaviors.commercePaypalCheckout = {
    attach: function(context, settings) {
      Backdrop.paypalCheckout.initialize(context, settings.paypalCheckout);
    }
  };

}(jQuery));
