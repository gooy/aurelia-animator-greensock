import {Animator} from 'aurelia-templating';
import {GreensockAnimator} from './animator';
export {GreensockAnimator} from './animator';

export function configure(aurelia, cb){
  var animator = aurelia.container.get(GreensockAnimator);
  Animator.configureDefault(aurelia.container, animator);
  if(cb !== undefined && typeof(cb) === 'function') cb(animator);
}
