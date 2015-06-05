System.register(['aurelia-templating', './animator'], function (_export) {
  'use strict';

  var Animator, GreensockAnimator;

  _export('configure', configure);

  function configure(aurelia, cb) {
    var animator = aurelia.container.get(GreensockAnimator);
    Animator.configureDefault(aurelia.container, animator);
    if (cb !== undefined && typeof cb === 'function') cb(animator);
  }

  return {
    setters: [function (_aureliaTemplating) {
      Animator = _aureliaTemplating.Animator;
    }, function (_animator) {
      GreensockAnimator = _animator.GreensockAnimator;

      _export('GreensockAnimator', _animator.GreensockAnimator);
    }],
    execute: function () {}
  };
});
//# sourceMappingURL=index.js.map