module.exports.patch = function() {
  var _ = require('underscore');

  Object.prototype.extend = function(protoProps, staticProps) {
    var parent = this;
    var child;

    // The constructor function for the new subclass is either defined by you
    // (the "constructor" property in your `extend` definition), or defaulted
    // by us to simply call the parent's constructor.
    if (protoProps && _.has(protoProps, 'constructor')) {
      child = protoProps.constructor;
    } else {
      child = function(){ 
        if(parent.apply)
          return parent.apply(this, arguments); 
      };
    }

    // Add static properties to the constructor function, if supplied.
    _.extend(child, parent, staticProps);

    // Set the prototype chain to inherit from `parent`, without calling
    // `parent`'s constructor function.
    var Surrogate = function(){ this.constructor = child; };
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate;

    // Add prototype properties (instance properties) to the subclass,
    // if supplied.
    if (protoProps) _.extend(child.prototype, protoProps);

    // Set a convenience property in case the parent's prototype is needed
    // later.
    child.__super__ = parent.prototype;

    return child;
  };

  Object.prototype['__op+'] = function(x) { return this + x; }
  Object.prototype['__op*'] = function(x) { return this * x; }
  Object.prototype['__op-'] = function(x) { return this - x; }


  Number.prototype.times = function(fn) {
    for(var i = 0; i < this; i++) fn();
  };

  Array.prototype.step = function(step) {
    var ret = [];
    for(var i = 0; i < this.length; i += Math.abs(step)) {
      var next = this[i];
      if(step < 0) {
        next = this[this.length-1-i];
      }
      ret.push(next);
    }
    return ret;
  };

  Array.prototype.each = function(it) {
    for(var i = 0; i < this.length; i++) {
      it(this[i]);
    }
  };

  Array.prototype.map = function(m) {
    var ret = [];
    this.each(function(it) { ret.push(m(it)); });
    return ret;
  };

  Array.prototype.filter = function(f) {
    var ret = [];
    this.each(function(it) { if(f(it)) ret.push(it); });
    return ret;
  };

  Array.prototype.reduce = function(it, memo, context) {
    if(memo === undefined && typeof this[0] === 'number')
      memo = Number(0);

    return _.reduce(this, it, memo, context);
  };
};
