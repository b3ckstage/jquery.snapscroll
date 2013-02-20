// Generated by CoffeeScript 1.4.0
(function() {

  (function($, window, document, undefined_) {
    var Plugin, defaults, pluginName;
    pluginName = "snapscroll";
    defaults = {
      scrollSpeed: 300,
      scrollEndSpeed: 100
    };
    Plugin = function(element, options) {
      this.container = $(element);
      this.options = $.extend({}, defaults, options);
      return this.init();
    };
    Plugin.prototype = {
      init: function() {
        return this.scrollInit();
      },
      scrollInit: function() {
        var $children, autoscrolling, end_scroll, prev_position, sa, scroll_end_speed, scroll_speed, timer;
        sa = this;
        $children = this.container.children();
        scroll_speed = this.options.scrollSpeed;
        scroll_end_speed = this.options.scrollEndSpeed;
        prev_position = $(document).scrollTop();
        timer = null;
        end_scroll = false;
        autoscrolling = false;
        return $(window).on("scroll.snapscroll", function() {
          var $child, cur_position, direction;
          if (!autoscrolling) {
            cur_position = $(document).scrollTop();
            direction = sa.getDirection(prev_position, cur_position);
            $child = sa.getTargetChild($children, direction, cur_position);
            clearTimeout(timer);
            timer = setTimeout(function() {
              $(window).scrollTo($child, scroll_speed);
              autoscrolling = true;
              return setTimeout(function() {
                prev_position = $(document).scrollTop();
                return autoscrolling = false;
              }, scroll_speed + 20);
            }, scroll_end_speed);
            return prev_position = cur_position;
          }
        });
      },
      getDirection: function(a, b) {
        if (a > b) {
          return "up";
        } else {
          return "down";
        }
      },
      getTargetChild: function($children, direction, position) {
        var $target, bottom_position, fc_offset, lc_offset, snap_padding, window_height;
        window_height = $(window).height();
        bottom_position = position + window_height;
        snap_padding = 20;
        fc_offset = $children.first().offset().top;
        lc_offset = $children.last().offset().top + window_height;
        $target = null;
        if (position + snap_padding > fc_offset && bottom_position - snap_padding < lc_offset) {
          $children.each(function(i) {
            var object_offset;
            object_offset = $(this).offset().top;
            if (direction === "down") {
              if (bottom_position > object_offset) {
                return $target = $(this);
              }
            } else {
              if (position < object_offset + window_height) {
                $target = $(this);
                return false;
              }
            }
          });
        }
        return $target;
      }
    };
    return $.fn[pluginName] = function(options) {
      return this.each(function() {
        if (!$.data(this, "plugin_" + pluginName)) {
          return $.data(this, "plugin_" + pluginName, new Plugin(this, options));
        }
      });
    };
  })(jQuery, window, document);

}).call(this);
