Commerce PayPal
=====

This project integrates Backdrop Commerce with various PayPal payment solutions. The primary integration method is [PayPal Checkout](https://developer.paypal.com/docs/checkout/standard/), which supports payment via PayPal account, Pay Later, Venmo, and credit or debit card.

Pay Later, formerly known as PayPal Credit, lets merchants extend financing opportunities to their customers, which can be advertised on Add to Cart forms or through a custom block defined by this module. See how it works in the [PayPal documentation](https://developer.paypal.com/docs/checkout/pay-later/us/commerce-platforms/centarro/).

Adding the PayPal funding source to order pages
--------

PayPal Checkout displays payment buttons based on your Backdrop Commerce configuration, the merchant's PayPal account configuration, and the customer's device. The option selected by the customer will be saved to an order's data property as the funding source. However, there is no default place in the user interface to display such information.

To show this to your customer or store managers, you will need to edit the relevant theme templates and print the order.funding_source added to the list of available variables by this module. To see if you're eligible to accept Venmo as a funding source, consult the latest [PayPal documentation](https://developer.paypal.com/docs/checkout/pay-with-venmo/#link-eligibility).

Development notes
-----------------

If you have unanswered questions about how PayPal's services work or want to contribute to the development of this project, you can find PDF guides and HTML resource pages for every PayPal service on their [developer network](https://developer.paypal.com/). Before requesting a feature or code change, please ensure it is supported by PayPal and provide a link to the documentation backing up your request.

If your PayPal API requests are failing due to SSL certificate verification, refer to the comments in the cURL request preparation of commerce_paypal_api_request() to read how to specify a local CA certificate bundle file.


Installation
------------

* Install this module using the official Backdrop CMS instructions at 
https://backdropcms.org/guide/modules


License
-------

This project is GPL v2 software. See the LICENSE.txt file in this directory for complete text.

## Maintainers

Seeking.


Credits
-------

### Ported to Backdrop CMS by:

* [argiepiano](https://github.com/argiepiano)

### Drupal version maintained by:

* [jsacksick](https://www.drupal.org/u/jsacksick)
* [tomtech](https://www.drupal.org/u/tomtech)
* [centarro](https://www.drupal.org/u/centarro)
* [rszama](https://www.drupal.org/u/rszrama)

### Supporting organizations for Drupal version: 

[Centarro](https://www.drupal.org/centarro) Development and Support