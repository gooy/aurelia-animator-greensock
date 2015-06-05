System.register(['greensock', 'jsol'], function (_export) {
  'use strict';

  var TweenLite, JSOL, GreensockAnimator;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_greensock) {
      TweenLite = _greensock['default'];
    }, function (_jsol) {
      JSOL = _jsol['default'];
    }],
    execute: function () {
      GreensockAnimator = (function () {
        function GreensockAnimator() {
          _classCallCheck(this, GreensockAnimator);

          this.effects = {};
          this.timelines = {};
          this.options = {
            duration: 500
          };
          this.enterAnimation = { properties: 'fadeIn', options: { duration: 200 } };
          this.leaveAnimation = { properties: 'fadeOut', options: { duration: 200 } };
          this.isAnimating = false;

          this.registerEffect('fadeIn', { opacity: 1, left: 0 });
          this.registerEffect('fadeOut', { opacity: 0, left: 100 });
        }

        _createClass(GreensockAnimator, [{
          key: 'animate',
          value: function animate(element, effectName, options) {
            var _this = this;

            this.isAnimating = true;

            return new Promise(function (resolve, reject) {

              var defaults = {
                onComplete: function onComplete(elements) {
                  _this.isAnimating = false;
                  resolve(true);
                }
              };
              options = Object.assign({}, _this.options, defaults, options);

              var properties = _this.effects[effectName];
              options = Object.assign(options, properties);

              var duration = options.duration / 1000;
              delete options.duration;

              if (effectName === 'fadeIn') {
                element.style.opacity = 0;
              }

              TweenLite.to(element, duration, options);
            });
          }
        }, {
          key: 'enter',
          value: function enter(element) {
            return this._runElementAnimation(element, 'enter');
          }
        }, {
          key: 'leave',
          value: function leave(element) {
            return this._runElementAnimation(element, 'leave');
          }
        }, {
          key: 'runSequence',
          value: function runSequence(sequence) {
            return Promise.resolve(false);
          }
        }, {
          key: 'registerEffect',
          value: function registerEffect(effectName, properties) {
            this.effects[effectName] = properties;
          }
        }, {
          key: 'unregisterEffect',
          value: function unregisterEffect(effectName, properties) {
            delete this.effects[effectName];
          }
        }, {
          key: '_runElementAnimation',
          value: function _runElementAnimation(element, name) {
            var properties = {};
            var options = {};

            if (!element.animations) this._parseAnimations(element);

            if (element.animations[name]) {
              properties = element.animations[name].properties;
              options = element.animations[name].options;
            }

            if (!properties) return Promise.resolve(false);

            return this.animate(element, properties, options);
          }
        }, {
          key: '_parseAnimations',
          value: function _parseAnimations(element) {
            element.animations = {};
            element.animations.enter = this.parseAttributeValue(element.getAttribute('animation-enter')) || this.enterAnimation;
            element.animations.leave = this.parseAttributeValue(element.getAttribute('animation-leave')) || this.leaveAnimation;
          }
        }, {
          key: 'parseAttributeValue',
          value: function parseAttributeValue(value) {
            if (!value) return value;
            var p = value.split(';');
            var properties = p[0];
            var options = {};
            if (properties[0] == '{' && properties[properties.length - 1] == '}') properties = JSOL.parse(properties);

            if (p.length > 1) {
              options = p[1];
              options = JSOL.parse(options);
            }
            return { properties: properties, options: options };
          }
        }]);

        return GreensockAnimator;
      })();

      _export('GreensockAnimator', GreensockAnimator);
    }
  };
});
//# sourceMappingURL=animator.js.map