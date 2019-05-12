/**
 * @file
 * Renders the PayPal Smart payment buttons.
 */

(function($) {
  Drupal.paypalCheckout = {
    makeCall: function(url, settings) {
      var deferred = $.Deferred();
      settings = settings || {};

      var ajaxSettings = {
        dataType: 'json',
        url: url,
        success: function(data) {
          deferred.resolve(data);
        }
      };
      $.extend(ajaxSettings, settings);
      $.ajax(ajaxSettings);

      return deferred.promise();
    },
    renderButtons: function(settings) {
      $('.paypal-buttons-container').once('rendered').each(function() {
        paypal.Buttons({
          createOrder: function() {
            return Drupal.paypalCheckout.makeCall(settings.createOrderUri).then(function(data) {
              return data.id;
            });
          },
          onApprove: function (data) {
            var ajaxSettings = {
              type: 'POST',
              contentType: "application/json; charset=utf-8",
              data: JSON.stringify({
                id: data.orderID
              })
            };
            return Drupal.paypalCheckout.makeCall(settings.onApproveUri, ajaxSettings).then(function(data) {
              if (data.hasOwnProperty('redirectUri')) {
                window.location.href = data.redirectUri;
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
          Drupal.paypalCheckout.renderButtons(settings);
        }
        else {
          setTimeout(function() {
            waitForSdk(settings)
          }, 100);
        }
      };
      waitForSdk(settings);
    }
  };

  Drupal.behaviors.commercePaypalCheckout = {
    attach: function(context, settings) {
      Drupal.paypalCheckout.initialize(context, settings.paypalCheckout);
    }
  };

}(jQuery));
