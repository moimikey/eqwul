;(function ($) {
  $.fn.eqwul = function (options) {
    var heights = [];
    var opts    = $.extend({}, $.fn.eqwul.defaults, options);

    function getheight(images, width) {
      width -= images.length * 6;
      var h = 0;
      for (var i = 0; i < images.length; ++i) {
        h += $(images[i]).data('width') / $(images[i]).data('height');
      }
      return width / h;
    }

    function setheight(images, height) {
      heights.push(height);
      for (var i = 0; i < images.length; ++i) {
        $(images[i]).css({
          width:  height * $(images[i]).data('width') / $(images[i]).data('height'),
          height: height
        });
      }
    }

    function resize(images, width) {
      setheight(images, getheight(images, width));
    }

    function run(max_height) {
      var size = window.innerWidth - 50;
      var n = 0;
      var images = o.el;
      var slice;
      var h;
      w: while (images.length > 0) {
        for (var i = 1; i < images.length + 1; ++i) {
          slice = images.slice(0, i);
          h = getheight(slice, size);
          if (h < max_height) {
            setheight(slice, h);
            n++;
            images = images.slice(i);
            continue w;
          }
        }
        setheight(slice, Math.min(max_height, h));
        n++;
        break;
      }
      heights.length = 0;
    }

    var $this = $(this);
    var o = $.extend({}, opts, $this.data());

    window.addEventListener('resize', function () {
      run(o.maxHeight);
    });

    run(o.maxHeight);
  };

  $.fn.eqwul.defaults = {
    el: null,
    maxHeight: 222
  };
})(jQuery);
