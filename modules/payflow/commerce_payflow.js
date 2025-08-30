(function($) {

/**
 * Escapes from an iframe if the completion page is displayed within an iframe.
 */
Backdrop.behaviors.commercePayflowEscapeIframe = {
  attach: function (context, settings) {
    if (top !== self) {
      if (typeof Backdrop.settings.commercePayflow != 'undefined' &&
        typeof Backdrop.settings.commercePayflow.page != 'undefined' &&
        Backdrop.settings.commercePayflow.page == 'review') {
        window.parent.location.href = window.location.href + '?payflow-page=review';
      }
      else {
        window.parent.location.href = window.location.href;
      }
    }
  }
}

})(jQuery);
