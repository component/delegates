
/**
 * Module dependencies.
 */

var Manager = require('event-manager')
  , inherit = require('inherit')
  , delegate = require('delegate')
  , unbind = Manager.prototype.unbind
  , bind = Manager.prototype.bind


/**
 * Expose `DelegateManager`.
 */

module.exports = DelegateManager;

/**
 * Initialize a new DelegateManager.
 *
 * TODO: this abstract isn't great at all,
 * gets pretty leaky once we need to introduce
 * some additional logic to .bind(), rework this
 *
 * @api public
 */

function DelegateManager(target, obj) {
  if (!(this instanceof DelegateManager)) return new DelegateManager(target, obj);
  Manager.call(this, target, obj);

  this.onbind(function(name, fn){
    fn.callback = delegate.bind(target, fn.selector, name, fn);
  });

  this.onunbind(function(name, fn){
    // TODO: selector support here as well...
    // needs updating in delegate
    delegate.unbind(target, name, fn.callback);
  });
}

/**
 * Inherit from `Manager.prototype`.
 */

inherit(DelegateManager, Manager);

/**
 * Onbind event to expose selector.
 */

DelegateManager.prototype._onbind = function(event, method, fn){
  fn.selector = this.event.selector;
};

/**
 * Onunbind event to expose selector.
 */

DelegateManager.prototype._onunbind = function(event, method, fn){
  fn.selector = this.event.selector;
};

/**
 * Proxy bind to allow "<event> <selector>" syntax.
 */

DelegateManager.prototype.bind = function(str, method){
  var event = this.event = parse(str);
  var args = [event.name].concat([].slice.call(arguments, 1));
  var fn = bind.apply(this, args);
};

/**
 * Parse event / selector string.
 *
 * @param {String} string
 * @return {Object}
 * @api private
 */

function parse(str) {
  var parts = str.split(' ');
  var event = parts.shift();
  var selector = parts.join(' ');
  return { name: event, selector: selector };
}
