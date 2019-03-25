/**
 * @file
 * Output PayPal Smart payment buttons.
 */

(function($) {

  Drupal.paypalCheckout = {
    renderButtons: function(settings) {
      $('.paypal-buttons-container').once('rendered').each(function() {
        paypal.Buttons().render('#' + $(this).attr('id'));
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
