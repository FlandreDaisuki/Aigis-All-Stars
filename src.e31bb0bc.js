// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/vue/dist/vue.runtime.esm.js":[function(require,module,exports) {
var global = arguments[3];
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/*!
 * Vue.js v2.6.10
 * (c) 2014-2019 Evan You
 * Released under the MIT License.
 */

/*  */
var emptyObject = Object.freeze({}); // These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.

function isUndef(v) {
  return v === undefined || v === null;
}

function isDef(v) {
  return v !== undefined && v !== null;
}

function isTrue(v) {
  return v === true;
}

function isFalse(v) {
  return v === false;
}
/**
 * Check if value is primitive.
 */


function isPrimitive(value) {
  return typeof value === 'string' || typeof value === 'number' || // $flow-disable-line
  typeof value === 'symbol' || typeof value === 'boolean';
}
/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */


function isObject(obj) {
  return obj !== null && typeof obj === 'object';
}
/**
 * Get the raw type string of a value, e.g., [object Object].
 */


var _toString = Object.prototype.toString;

function toRawType(value) {
  return _toString.call(value).slice(8, -1);
}
/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */


function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function isRegExp(v) {
  return _toString.call(v) === '[object RegExp]';
}
/**
 * Check if val is a valid array index.
 */


function isValidArrayIndex(val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val);
}

function isPromise(val) {
  return isDef(val) && typeof val.then === 'function' && typeof val.catch === 'function';
}
/**
 * Convert a value to a string that is actually rendered.
 */


function toString(val) {
  return val == null ? '' : Array.isArray(val) || isPlainObject(val) && val.toString === _toString ? JSON.stringify(val, null, 2) : String(val);
}
/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */


function toNumber(val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n;
}
/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */


function makeMap(str, expectsLowerCase) {
  var map = Object.create(null);
  var list = str.split(',');

  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }

  return expectsLowerCase ? function (val) {
    return map[val.toLowerCase()];
  } : function (val) {
    return map[val];
  };
}
/**
 * Check if a tag is a built-in tag.
 */


var isBuiltInTag = makeMap('slot,component', true);
/**
 * Check if an attribute is a reserved attribute.
 */

var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');
/**
 * Remove an item from an array.
 */

function remove(arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);

    if (index > -1) {
      return arr.splice(index, 1);
    }
  }
}
/**
 * Check whether an object has the property.
 */


var hasOwnProperty = Object.prototype.hasOwnProperty;

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}
/**
 * Create a cached version of a pure function.
 */


function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}
/**
 * Camelize a hyphen-delimited string.
 */


var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {
    return c ? c.toUpperCase() : '';
  });
});
/**
 * Capitalize a string.
 */

var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
});
/**
 * Hyphenate a camelCase string.
 */

var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase();
});
/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */

function polyfillBind(fn, ctx) {
  function boundFn(a) {
    var l = arguments.length;
    return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx);
  }

  boundFn._length = fn.length;
  return boundFn;
}

function nativeBind(fn, ctx) {
  return fn.bind(ctx);
}

var bind = Function.prototype.bind ? nativeBind : polyfillBind;
/**
 * Convert an Array-like object to a real Array.
 */

function toArray(list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);

  while (i--) {
    ret[i] = list[i + start];
  }

  return ret;
}
/**
 * Mix properties into target object.
 */


function extend(to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }

  return to;
}
/**
 * Merge an Array of Objects into a single Object.
 */


function toObject(arr) {
  var res = {};

  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }

  return res;
}
/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */


function noop(a, b, c) {}
/**
 * Always return false.
 */


var no = function (a, b, c) {
  return false;
};
/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */


var identity = function (_) {
  return _;
};
/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */


function looseEqual(a, b) {
  if (a === b) {
    return true;
  }

  var isObjectA = isObject(a);
  var isObjectB = isObject(b);

  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);

      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i]);
        });
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime();
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key]);
        });
      } else {
        /* istanbul ignore next */
        return false;
      }
    } catch (e) {
      /* istanbul ignore next */
      return false;
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b);
  } else {
    return false;
  }
}
/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */


function looseIndexOf(arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) {
      return i;
    }
  }

  return -1;
}
/**
 * Ensure a function is called only once.
 */


function once(fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  };
}

var SSR_ATTR = 'data-server-rendered';
var ASSET_TYPES = ['component', 'directive', 'filter'];
var LIFECYCLE_HOOKS = ['beforeCreate', 'created', 'beforeMount', 'mounted', 'beforeUpdate', 'updated', 'beforeDestroy', 'destroyed', 'activated', 'deactivated', 'errorCaptured', 'serverPrefetch'];
/*  */

var config = {
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
};
/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */

var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;
/**
 * Check if a string starts with $ or _
 */

function isReserved(str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F;
}
/**
 * Define a property.
 */


function def(obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}
/**
 * Parse simple path.
 */


var bailRE = new RegExp("[^" + unicodeRegExp.source + ".$_\\d]");

function parsePath(path) {
  if (bailRE.test(path)) {
    return;
  }

  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) {
        return;
      }

      obj = obj[segments[i]];
    }

    return obj;
  };
}
/*  */
// can we use __proto__?


var hasProto = '__proto__' in {}; // Browser environment sniffing

var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = UA && UA.indexOf('android') > 0 || weexPlatform === 'android';
var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA) || weexPlatform === 'ios';
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/); // Firefox has a "watch" function on Object.prototype...

var nativeWatch = {}.watch;
var supportsPassive = false;

if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', {
      get: function get() {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    }); // https://github.com/facebook/flow/issues/285

    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
} // this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV


var _isServer;

var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }

  return _isServer;
}; // detect devtools


var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;
/* istanbul ignore next */

function isNative(Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString());
}

var hasSymbol = typeof Symbol !== 'undefined' && isNative(Symbol) && typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */
// $flow-disable-line


if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set =
  /*@__PURE__*/
  function () {
    function Set() {
      this.set = Object.create(null);
    }

    Set.prototype.has = function has(key) {
      return this.set[key] === true;
    };

    Set.prototype.add = function add(key) {
      this.set[key] = true;
    };

    Set.prototype.clear = function clear() {
      this.set = Object.create(null);
    };

    return Set;
  }();
}
/*  */


var warn = noop;
var tip = noop;
var generateComponentTrace = noop; // work around flow check

var formatComponentName = noop;

if ("development" !== 'production') {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;

  var classify = function (str) {
    return str.replace(classifyRE, function (c) {
      return c.toUpperCase();
    }).replace(/[-_]/g, '');
  };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && !config.silent) {
      console.error("[Vue warn]: " + msg + trace);
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && !config.silent) {
      console.warn("[Vue tip]: " + msg + (vm ? generateComponentTrace(vm) : ''));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      return '<Root>';
    }

    var options = typeof vm === 'function' && vm.cid != null ? vm.options : vm._isVue ? vm.$options || vm.constructor.options : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;

    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (name ? "<" + classify(name) + ">" : "<Anonymous>") + (file && includeFile !== false ? " at " + file : '');
  };

  var repeat = function (str, n) {
    var res = '';

    while (n) {
      if (n % 2 === 1) {
        res += str;
      }

      if (n > 1) {
        str += str;
      }

      n >>= 1;
    }

    return res;
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;

      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];

          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue;
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }

        tree.push(vm);
        vm = vm.$parent;
      }

      return '\n\nfound in\n\n' + tree.map(function (vm, i) {
        return "" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm) ? formatComponentName(vm[0]) + "... (" + vm[1] + " recursive calls)" : formatComponentName(vm));
      }).join('\n');
    } else {
      return "\n\n(found in " + formatComponentName(vm) + ")";
    }
  };
}
/*  */


var uid = 0;
/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */

var Dep = function Dep() {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub(sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub(sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend() {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify() {
  // stabilize the subscriber list first
  var subs = this.subs.slice();

  if ("development" !== 'production' && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) {
      return a.id - b.id;
    });
  }

  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
}; // The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.


Dep.target = null;
var targetStack = [];

function pushTarget(target) {
  targetStack.push(target);
  Dep.target = target;
}

function popTarget() {
  targetStack.pop();
  Dep.target = targetStack[targetStack.length - 1];
}
/*  */


var VNode = function VNode(tag, data, children, text, elm, context, componentOptions, asyncFactory) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = {
  child: {
    configurable: true
  }
}; // DEPRECATED: alias for componentInstance for backwards compat.

/* istanbul ignore next */

prototypeAccessors.child.get = function () {
  return this.componentInstance;
};

Object.defineProperties(VNode.prototype, prototypeAccessors);

var createEmptyVNode = function (text) {
  if (text === void 0) text = '';
  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node;
};

function createTextVNode(val) {
  return new VNode(undefined, undefined, undefined, String(val));
} // optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.


function cloneVNode(vnode) {
  var cloned = new VNode(vnode.tag, vnode.data, // #7975
  // clone children array to avoid mutating original in case of cloning
  // a child.
  vnode.children && vnode.children.slice(), vnode.text, vnode.elm, vnode.context, vnode.componentOptions, vnode.asyncFactory);
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned;
}
/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */


var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);
var methodsToPatch = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];
/**
 * Intercept mutating methods and emit events
 */

methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator() {
    var args = [],
        len = arguments.length;

    while (len--) args[len] = arguments[len];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;

    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break;

      case 'splice':
        inserted = args.slice(2);
        break;
    }

    if (inserted) {
      ob.observeArray(inserted);
    } // notify change


    ob.dep.notify();
    return result;
  });
});
/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);
/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */

var shouldObserve = true;

function toggleObserving(value) {
  shouldObserve = value;
}
/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */


var Observer = function Observer(value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);

  if (Array.isArray(value)) {
    if (hasProto) {
      protoAugment(value, arrayMethods);
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }

    this.observeArray(value);
  } else {
    this.walk(value);
  }
};
/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */


Observer.prototype.walk = function walk(obj) {
  var keys = Object.keys(obj);

  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};
/**
 * Observe a list of Array items.
 */


Observer.prototype.observeArray = function observeArray(items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
}; // helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */


function protoAugment(target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}
/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */

/* istanbul ignore next */


function copyAugment(target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}
/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */


function observe(value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return;
  }

  var ob;

  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (shouldObserve && !isServerRendering() && (Array.isArray(value) || isPlainObject(value)) && Object.isExtensible(value) && !value._isVue) {
    ob = new Observer(value);
  }

  if (asRootData && ob) {
    ob.vmCount++;
  }

  return ob;
}
/**
 * Define a reactive property on an Object.
 */


function defineReactive$$1(obj, key, val, customSetter, shallow) {
  var dep = new Dep();
  var property = Object.getOwnPropertyDescriptor(obj, key);

  if (property && property.configurable === false) {
    return;
  } // cater for pre-defined getter/setters


  var getter = property && property.get;
  var setter = property && property.set;

  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      var value = getter ? getter.call(obj) : val;

      if (Dep.target) {
        dep.depend();

        if (childOb) {
          childOb.dep.depend();

          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }

      return value;
    },
    set: function reactiveSetter(newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */

      if (newVal === value || newVal !== newVal && value !== value) {
        return;
      }
      /* eslint-enable no-self-compare */


      if ("development" !== 'production' && customSetter) {
        customSetter();
      } // #7981: for accessor properties without setter


      if (getter && !setter) {
        return;
      }

      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }

      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}
/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */


function set(target, key, val) {
  if ("development" !== 'production' && (isUndef(target) || isPrimitive(target))) {
    warn("Cannot set reactive property on undefined, null, or primitive value: " + target);
  }

  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val;
  }

  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val;
  }

  var ob = target.__ob__;

  if (target._isVue || ob && ob.vmCount) {
    "development" !== 'production' && warn('Avoid adding reactive properties to a Vue instance or its root $data ' + 'at runtime - declare it upfront in the data option.');
    return val;
  }

  if (!ob) {
    target[key] = val;
    return val;
  }

  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val;
}
/**
 * Delete a property and trigger change if necessary.
 */


function del(target, key) {
  if ("development" !== 'production' && (isUndef(target) || isPrimitive(target))) {
    warn("Cannot delete reactive property on undefined, null, or primitive value: " + target);
  }

  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return;
  }

  var ob = target.__ob__;

  if (target._isVue || ob && ob.vmCount) {
    "development" !== 'production' && warn('Avoid deleting properties on a Vue instance or its root $data ' + '- just set it to null.');
    return;
  }

  if (!hasOwn(target, key)) {
    return;
  }

  delete target[key];

  if (!ob) {
    return;
  }

  ob.dep.notify();
}
/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */


function dependArray(value) {
  for (var e = void 0, i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();

    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}
/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */


var strats = config.optionMergeStrategies;
/**
 * Options with restrictions
 */

if ("development" !== 'production') {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn("option \"" + key + "\" can only be used during instance " + 'creation with the `new` keyword.');
    }

    return defaultStrat(parent, child);
  };
}
/**
 * Helper that recursively merges two data objects together.
 */


function mergeData(to, from) {
  if (!from) {
    return to;
  }

  var key, toVal, fromVal;
  var keys = hasSymbol ? Reflect.ownKeys(from) : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i]; // in case the object is already observed...

    if (key === '__ob__') {
      continue;
    }

    toVal = to[key];
    fromVal = from[key];

    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (toVal !== fromVal && isPlainObject(toVal) && isPlainObject(fromVal)) {
      mergeData(toVal, fromVal);
    }
  }

  return to;
}
/**
 * Data
 */


function mergeDataOrFn(parentVal, childVal, vm) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal;
    }

    if (!parentVal) {
      return childVal;
    } // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.


    return function mergedDataFn() {
      return mergeData(typeof childVal === 'function' ? childVal.call(this, this) : childVal, typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal);
    };
  } else {
    return function mergedInstanceDataFn() {
      // instance merge
      var instanceData = typeof childVal === 'function' ? childVal.call(vm, vm) : childVal;
      var defaultData = typeof parentVal === 'function' ? parentVal.call(vm, vm) : parentVal;

      if (instanceData) {
        return mergeData(instanceData, defaultData);
      } else {
        return defaultData;
      }
    };
  }
}

strats.data = function (parentVal, childVal, vm) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
      "development" !== 'production' && warn('The "data" option should be a function ' + 'that returns a per-instance value in component ' + 'definitions.', vm);
      return parentVal;
    }

    return mergeDataOrFn(parentVal, childVal);
  }

  return mergeDataOrFn(parentVal, childVal, vm);
};
/**
 * Hooks and props are merged as arrays.
 */


function mergeHook(parentVal, childVal) {
  var res = childVal ? parentVal ? parentVal.concat(childVal) : Array.isArray(childVal) ? childVal : [childVal] : parentVal;
  return res ? dedupeHooks(res) : res;
}

function dedupeHooks(hooks) {
  var res = [];

  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }

  return res;
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});
/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */

function mergeAssets(parentVal, childVal, vm, key) {
  var res = Object.create(parentVal || null);

  if (childVal) {
    "development" !== 'production' && assertObjectType(key, childVal, vm);
    return extend(res, childVal);
  } else {
    return res;
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});
/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */

strats.watch = function (parentVal, childVal, vm, key) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) {
    parentVal = undefined;
  }

  if (childVal === nativeWatch) {
    childVal = undefined;
  }
  /* istanbul ignore if */


  if (!childVal) {
    return Object.create(parentVal || null);
  }

  if ("development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }

  if (!parentVal) {
    return childVal;
  }

  var ret = {};
  extend(ret, parentVal);

  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];

    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }

    ret[key$1] = parent ? parent.concat(child) : Array.isArray(child) ? child : [child];
  }

  return ret;
};
/**
 * Other object hashes.
 */


strats.props = strats.methods = strats.inject = strats.computed = function (parentVal, childVal, vm, key) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }

  if (!parentVal) {
    return childVal;
  }

  var ret = Object.create(null);
  extend(ret, parentVal);

  if (childVal) {
    extend(ret, childVal);
  }

  return ret;
};

strats.provide = mergeDataOrFn;
/**
 * Default strategy.
 */

var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined ? parentVal : childVal;
};
/**
 * Validate component names
 */


function checkComponents(options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName(name) {
  if (!new RegExp("^[a-zA-Z][\\-\\.0-9_" + unicodeRegExp.source + "]*$").test(name)) {
    warn('Invalid component name: "' + name + '". Component names ' + 'should conform to valid custom element name in html5 specification.');
  }

  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn('Do not use built-in or reserved HTML elements as component ' + 'id: ' + name);
  }
}
/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */


function normalizeProps(options, vm) {
  var props = options.props;

  if (!props) {
    return;
  }

  var res = {};
  var i, val, name;

  if (Array.isArray(props)) {
    i = props.length;

    while (i--) {
      val = props[i];

      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = {
          type: null
        };
      } else if ("development" !== 'production') {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val) ? val : {
        type: val
      };
    }
  } else if ("development" !== 'production') {
    warn("Invalid value for option \"props\": expected an Array or an Object, " + "but got " + toRawType(props) + ".", vm);
  }

  options.props = res;
}
/**
 * Normalize all injections into Object-based format
 */


function normalizeInject(options, vm) {
  var inject = options.inject;

  if (!inject) {
    return;
  }

  var normalized = options.inject = {};

  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = {
        from: inject[i]
      };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val) ? extend({
        from: key
      }, val) : {
        from: val
      };
    }
  } else if ("development" !== 'production') {
    warn("Invalid value for option \"inject\": expected an Array or an Object, " + "but got " + toRawType(inject) + ".", vm);
  }
}
/**
 * Normalize raw function directives into object format.
 */


function normalizeDirectives(options) {
  var dirs = options.directives;

  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];

      if (typeof def$$1 === 'function') {
        dirs[key] = {
          bind: def$$1,
          update: def$$1
        };
      }
    }
  }
}

function assertObjectType(name, value, vm) {
  if (!isPlainObject(value)) {
    warn("Invalid value for option \"" + name + "\": expected an Object, " + "but got " + toRawType(value) + ".", vm);
  }
}
/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */


function mergeOptions(parent, child, vm) {
  if ("development" !== 'production') {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child); // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.

  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }

    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;

  for (key in parent) {
    mergeField(key);
  }

  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }

  function mergeField(key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }

  return options;
}
/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */


function resolveAsset(options, type, id, warnMissing) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return;
  }

  var assets = options[type]; // check local registration variations first

  if (hasOwn(assets, id)) {
    return assets[id];
  }

  var camelizedId = camelize(id);

  if (hasOwn(assets, camelizedId)) {
    return assets[camelizedId];
  }

  var PascalCaseId = capitalize(camelizedId);

  if (hasOwn(assets, PascalCaseId)) {
    return assets[PascalCaseId];
  } // fallback to prototype chain


  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];

  if ("development" !== 'production' && warnMissing && !res) {
    warn('Failed to resolve ' + type.slice(0, -1) + ': ' + id, options);
  }

  return res;
}
/*  */


function validateProp(key, propOptions, propsData, vm) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key]; // boolean casting

  var booleanIndex = getTypeIndex(Boolean, prop.type);

  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);

      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  } // check default value


  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key); // since the default value is a fresh copy,
    // make sure to observe it.

    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }

  if ("development" !== 'production' && // skip validation for weex recycle-list child component props
  !false) {
    assertProp(prop, key, value, vm, absent);
  }

  return value;
}
/**
 * Get the default value of a prop.
 */


function getPropDefaultValue(vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined;
  }

  var def = prop.default; // warn against non-factory defaults for Object & Array

  if ("development" !== 'production' && isObject(def)) {
    warn('Invalid default value for prop "' + key + '": ' + 'Props with type Object/Array must use a factory function ' + 'to return the default value.', vm);
  } // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger


  if (vm && vm.$options.propsData && vm.$options.propsData[key] === undefined && vm._props[key] !== undefined) {
    return vm._props[key];
  } // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context


  return typeof def === 'function' && getType(prop.type) !== 'Function' ? def.call(vm) : def;
}
/**
 * Assert whether a prop is valid.
 */


function assertProp(prop, name, value, vm, absent) {
  if (prop.required && absent) {
    warn('Missing required prop: "' + name + '"', vm);
    return;
  }

  if (value == null && !prop.required) {
    return;
  }

  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];

  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }

    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(getInvalidTypeMessage(name, value, expectedTypes), vm);
    return;
  }

  var validator = prop.validator;

  if (validator) {
    if (!validator(value)) {
      warn('Invalid prop: custom validator check failed for prop "' + name + '".', vm);
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType(value, type) {
  var valid;
  var expectedType = getType(type);

  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase(); // for primitive wrapper objects

    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }

  return {
    valid: valid,
    expectedType: expectedType
  };
}
/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */


function getType(fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : '';
}

function isSameType(a, b) {
  return getType(a) === getType(b);
}

function getTypeIndex(type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1;
  }

  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i;
    }
  }

  return -1;
}

function getInvalidTypeMessage(name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." + " Expected " + expectedTypes.map(capitalize).join(', ');
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType); // check if we need to specify expected value

  if (expectedTypes.length === 1 && isExplicable(expectedType) && !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }

  message += ", got " + receivedType + " "; // check if we need to specify received value

  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }

  return message;
}

function styleValue(value, type) {
  if (type === 'String') {
    return "\"" + value + "\"";
  } else if (type === 'Number') {
    return "" + Number(value);
  } else {
    return "" + value;
  }
}

function isExplicable(value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) {
    return value.toLowerCase() === elem;
  });
}

function isBoolean() {
  var args = [],
      len = arguments.length;

  while (len--) args[len] = arguments[len];

  return args.some(function (elem) {
    return elem.toLowerCase() === 'boolean';
  });
}
/*  */


function handleError(err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();

  try {
    if (vm) {
      var cur = vm;

      while (cur = cur.$parent) {
        var hooks = cur.$options.errorCaptured;

        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;

              if (capture) {
                return;
              }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }

    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling(handler, context, args, vm, info) {
  var res;

  try {
    res = args ? handler.apply(context, args) : handler.call(context);

    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) {
        return handleError(e, vm, info + " (Promise/async)");
      }); // issue #9511
      // avoid catch triggering multiple times when nested calls

      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }

  return res;
}

function globalHandleError(err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info);
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }

  logError(err, vm, info);
}

function logError(err, vm, info) {
  if ("development" !== 'production') {
    warn("Error in " + info + ": \"" + err.toString() + "\"", vm);
  }
  /* istanbul ignore else */


  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err;
  }
}
/*  */


var isUsingMicroTask = false;
var callbacks = [];
var pending = false;

function flushCallbacks() {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;

  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
} // Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).


var timerFunc; // The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:

/* istanbul ignore next, $flow-disable-line */

if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();

  timerFunc = function () {
    p.then(flushCallbacks); // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.

    if (isIOS) {
      setTimeout(noop);
    }
  };

  isUsingMicroTask = true;
} else if (!isIE && typeof MutationObserver !== 'undefined' && (isNative(MutationObserver) || // PhantomJS and iOS 7.x
MutationObserver.toString() === '[object MutationObserverConstructor]')) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });

  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };

  isUsingMicroTask = true;
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Techinically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick(cb, ctx) {
  var _resolve;

  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });

  if (!pending) {
    pending = true;
    timerFunc();
  } // $flow-disable-line


  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    });
  }
}
/*  */

/* not type checking this file because flow doesn't play well with Proxy */


var initProxy;

if ("development" !== 'production') {
  var allowedGlobals = makeMap('Infinity,undefined,NaN,isFinite,isNaN,' + 'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' + 'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' + 'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn("Property or method \"" + key + "\" is not defined on the instance but " + 'referenced during render. Make sure that this property is reactive, ' + 'either in the data option, or for class-based components, by ' + 'initializing the property. ' + 'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.', target);
  };

  var warnReservedPrefix = function (target, key) {
    warn("Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " + 'properties starting with "$" or "_" are not proxied in the Vue instance to ' + 'prevent conflicts with Vue internals' + 'See: https://vuejs.org/v2/api/#data', target);
  };

  var hasProxy = typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set(target, key, value) {
        if (isBuiltInModifier(key)) {
          warn("Avoid overwriting built-in modifier in config.keyCodes: ." + key);
          return false;
        } else {
          target[key] = value;
          return true;
        }
      }
    });
  }

  var hasHandler = {
    has: function has(target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) || typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data);

      if (!has && !isAllowed) {
        if (key in target.$data) {
          warnReservedPrefix(target, key);
        } else {
          warnNonPresent(target, key);
        }
      }

      return has || !isAllowed;
    }
  };
  var getHandler = {
    get: function get(target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) {
          warnReservedPrefix(target, key);
        } else {
          warnNonPresent(target, key);
        }
      }

      return target[key];
    }
  };

  initProxy = function initProxy(vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped ? getHandler : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}
/*  */


var seenObjects = new _Set();
/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */

function traverse(val) {
  _traverse(val, seenObjects);

  seenObjects.clear();
}

function _traverse(val, seen) {
  var i, keys;
  var isA = Array.isArray(val);

  if (!isA && !isObject(val) || Object.isFrozen(val) || val instanceof VNode) {
    return;
  }

  if (val.__ob__) {
    var depId = val.__ob__.dep.id;

    if (seen.has(depId)) {
      return;
    }

    seen.add(depId);
  }

  if (isA) {
    i = val.length;

    while (i--) {
      _traverse(val[i], seen);
    }
  } else {
    keys = Object.keys(val);
    i = keys.length;

    while (i--) {
      _traverse(val[keys[i]], seen);
    }
  }
}

var mark;
var measure;

if ("development" !== 'production') {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */

  if (perf && perf.mark && perf.measure && perf.clearMarks && perf.clearMeasures) {
    mark = function (tag) {
      return perf.mark(tag);
    };

    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag); // perf.clearMeasures(name)
    };
  }
}
/*  */


var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first

  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  };
});

function createFnInvoker(fns, vm) {
  function invoker() {
    var arguments$1 = arguments;
    var fns = invoker.fns;

    if (Array.isArray(fns)) {
      var cloned = fns.slice();

      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler");
    }
  }

  invoker.fns = fns;
  return invoker;
}

function updateListeners(on, oldOn, add, remove$$1, createOnceHandler, vm) {
  var name, def$$1, cur, old, event;

  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);

    if (isUndef(cur)) {
      "development" !== 'production' && warn("Invalid handler for event \"" + event.name + "\": got " + String(cur), vm);
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }

      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }

      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }

  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}
/*  */


function mergeVNodeHook(def, hookKey, hook) {
  if (def instanceof VNode) {
    def = def.data.hook || (def.data.hook = {});
  }

  var invoker;
  var oldHook = def[hookKey];

  function wrappedHook() {
    hook.apply(this, arguments); // important: remove merged hook to ensure it's called only once
    // and prevent memory leak

    remove(invoker.fns, wrappedHook);
  }

  if (isUndef(oldHook)) {
    // no existing hook
    invoker = createFnInvoker([wrappedHook]);
  } else {
    /* istanbul ignore if */
    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
      // already a merged invoker
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      // existing plain hook
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }

  invoker.merged = true;
  def[hookKey] = invoker;
}
/*  */


function extractPropsFromVNodeData(data, Ctor, tag) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;

  if (isUndef(propOptions)) {
    return;
  }

  var res = {};
  var attrs = data.attrs;
  var props = data.props;

  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);

      if ("development" !== 'production') {
        var keyInLowerCase = key.toLowerCase();

        if (key !== keyInLowerCase && attrs && hasOwn(attrs, keyInLowerCase)) {
          tip("Prop \"" + keyInLowerCase + "\" is passed to component " + formatComponentName(tag || Ctor) + ", but the declared prop name is" + " \"" + key + "\". " + "Note that HTML attributes are case-insensitive and camelCased " + "props need to use their kebab-case equivalents when using in-DOM " + "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\".");
        }
      }

      checkProp(res, props, key, altKey, true) || checkProp(res, attrs, key, altKey, false);
    }
  }

  return res;
}

function checkProp(res, hash, key, altKey, preserve) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];

      if (!preserve) {
        delete hash[key];
      }

      return true;
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];

      if (!preserve) {
        delete hash[altKey];
      }

      return true;
    }
  }

  return false;
}
/*  */
// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:
// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.


function simpleNormalizeChildren(children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children);
    }
  }

  return children;
} // 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.


function normalizeChildren(children) {
  return isPrimitive(children) ? [createTextVNode(children)] : Array.isArray(children) ? normalizeArrayChildren(children) : undefined;
}

function isTextNode(node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment);
}

function normalizeArrayChildren(children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;

  for (i = 0; i < children.length; i++) {
    c = children[i];

    if (isUndef(c) || typeof c === 'boolean') {
      continue;
    }

    lastIndex = res.length - 1;
    last = res[lastIndex]; //  nested

    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, (nestedIndex || '') + "_" + i); // merge adjacent text nodes

        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + c[0].text);
          c.shift();
        }

        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) && isDef(c.tag) && isUndef(c.key) && isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }

        res.push(c);
      }
    }
  }

  return res;
}
/*  */


function initProvide(vm) {
  var provide = vm.$options.provide;

  if (provide) {
    vm._provided = typeof provide === 'function' ? provide.call(vm) : provide;
  }
}

function initInjections(vm) {
  var result = resolveInject(vm.$options.inject, vm);

  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if ("development" !== 'production') {
        defineReactive$$1(vm, key, result[key], function () {
          warn("Avoid mutating an injected value directly since the changes will be " + "overwritten whenever the provided component re-renders. " + "injection being mutated: \"" + key + "\"", vm);
        });
      } else {
        defineReactive$$1(vm, key, result[key]);
      }
    });
    toggleObserving(true);
  }
}

function resolveInject(inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol ? Reflect.ownKeys(inject) : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i]; // #6574 in case the inject object is observed...

      if (key === '__ob__') {
        continue;
      }

      var provideKey = inject[key].from;
      var source = vm;

      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break;
        }

        source = source.$parent;
      }

      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function' ? provideDefault.call(vm) : provideDefault;
        } else if ("development" !== 'production') {
          warn("Injection \"" + key + "\" not found", vm);
        }
      }
    }

    return result;
  }
}
/*  */

/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */


function resolveSlots(children, context) {
  if (!children || !children.length) {
    return {};
  }

  var slots = {};

  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data; // remove slot attribute if the node is resolved as a Vue slot node

    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    } // named slots should only be respected if the vnode was rendered in the
    // same context.


    if ((child.context === context || child.fnContext === context) && data && data.slot != null) {
      var name = data.slot;
      var slot = slots[name] || (slots[name] = []);

      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      (slots.default || (slots.default = [])).push(child);
    }
  } // ignore slots that contains only whitespace


  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }

  return slots;
}

function isWhitespace(node) {
  return node.isComment && !node.asyncFactory || node.text === ' ';
}
/*  */


function normalizeScopedSlots(slots, normalSlots, prevSlots) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;

  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized;
  } else if (isStable && prevSlots && prevSlots !== emptyObject && key === prevSlots.$key && !hasNormalSlots && !prevSlots.$hasNormal) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots;
  } else {
    res = {};

    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  } // expose normal slots on scopedSlots


  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  } // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error


  if (slots && Object.isExtensible(slots)) {
    slots._normalized = res;
  }

  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res;
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res) ? [res] // single vnode
    : normalizeChildren(res);
    return res && (res.length === 0 || res.length === 1 && res[0].isComment // #9658
    ) ? undefined : res;
  }; // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.


  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }

  return normalized;
}

function proxyNormalSlot(slots, key) {
  return function () {
    return slots[key];
  };
}
/*  */

/**
 * Runtime helper for rendering v-for lists.
 */


function renderList(val, render) {
  var ret, i, l, keys, key;

  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);

    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);

    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();

      while (!result.done) {
        ret.push(render(result.value, ret.length));
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);

      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i);
      }
    }
  }

  if (!isDef(ret)) {
    ret = [];
  }

  ret._isVList = true;
  return ret;
}
/*  */

/**
 * Runtime helper for rendering <slot>
 */


function renderSlot(name, fallback, props, bindObject) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;

  if (scopedSlotFn) {
    // scoped slot
    props = props || {};

    if (bindObject) {
      if ("development" !== 'production' && !isObject(bindObject)) {
        warn('slot v-bind without argument expects an Object', this);
      }

      props = extend(extend({}, bindObject), props);
    }

    nodes = scopedSlotFn(props) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;

  if (target) {
    return this.$createElement('template', {
      slot: target
    }, nodes);
  } else {
    return nodes;
  }
}
/*  */

/**
 * Runtime helper for resolving filters
 */


function resolveFilter(id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity;
}
/*  */


function isKeyNotMatch(expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1;
  } else {
    return expect !== actual;
  }
}
/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */


function checkKeyCodes(eventKeyCode, key, builtInKeyCode, eventKeyName, builtInKeyName) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;

  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName);
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode);
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key;
  }
}
/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */


function bindObjectProps(data, tag, value, asProp, isSync) {
  if (value) {
    if (!isObject(value)) {
      "development" !== 'production' && warn('v-bind without argument expects an Object or Array value', this);
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }

      var hash;

      var loop = function (key) {
        if (key === 'class' || key === 'style' || isReservedAttribute(key)) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key) ? data.domProps || (data.domProps = {}) : data.attrs || (data.attrs = {});
        }

        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);

        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});

            on["update:" + key] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop(key);
    }
  }

  return data;
}
/*  */

/**
 * Runtime helper for rendering static trees.
 */


function renderStatic(index, isInFor) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index]; // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.

  if (tree && !isInFor) {
    return tree;
  } // otherwise, render a fresh tree.


  tree = cached[index] = this.$options.staticRenderFns[index].call(this._renderProxy, null, this // for render fns generated for functional component templates
  );
  markStatic(tree, "__static__" + index, false);
  return tree;
}
/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */


function markOnce(tree, index, key) {
  markStatic(tree, "__once__" + index + (key ? "_" + key : ""), true);
  return tree;
}

function markStatic(tree, key, isOnce) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], key + "_" + i, isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode(node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}
/*  */


function bindObjectListeners(data, value) {
  if (value) {
    if (!isPlainObject(value)) {
      "development" !== 'production' && warn('v-on without argument expects an Object value', this);
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};

      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }

  return data;
}
/*  */


function resolveScopedSlots(fns, // see flow/vnode
res, // the following are added in 2.6
hasDynamicKeys, contentHashKey) {
  res = res || {
    $stable: !hasDynamicKeys
  };

  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];

    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }

      res[slot.key] = slot.fn;
    }
  }

  if (contentHashKey) {
    res.$key = contentHashKey;
  }

  return res;
}
/*  */


function bindDynamicKeys(baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];

    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ("development" !== 'production' && key !== '' && key !== null) {
      // null is a speical value for explicitly removing a binding
      warn("Invalid value for dynamic directive argument (expected string or null): " + key, this);
    }
  }

  return baseObj;
} // helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.


function prependModifier(value, symbol) {
  return typeof value === 'string' ? symbol + value : value;
}
/*  */


function installRenderHelpers(target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}
/*  */


function FunctionalRenderContext(data, props, children, parent, Ctor) {
  var this$1 = this;
  var options = Ctor.options; // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check

  var contextVm;

  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent); // $flow-disable-line

    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent; // $flow-disable-line

    parent = parent._original;
  }

  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;
  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);

  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(data.scopedSlots, this$1.$slots = resolveSlots(children, parent));
    }

    return this$1.$slots;
  };

  Object.defineProperty(this, 'scopedSlots', {
    enumerable: true,
    get: function get() {
      return normalizeScopedSlots(data.scopedSlots, this.slots());
    }
  }); // support for compiled functional template

  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options; // pre-resolve slots for renderSlot()

    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);

      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }

      return vnode;
    };
  } else {
    this._c = function (a, b, c, d) {
      return createElement(contextVm, a, b, c, d, needNormalization);
    };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent(Ctor, propsData, data, contextVm, children) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;

  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) {
      mergeProps(props, data.attrs);
    }

    if (isDef(data.props)) {
      mergeProps(props, data.props);
    }
  }

  var renderContext = new FunctionalRenderContext(data, props, children, contextVm, Ctor);
  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext);
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);

    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }

    return res;
  }
}

function cloneAndMarkFunctionalResult(vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;

  if ("development" !== 'production') {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }

  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }

  return clone;
}

function mergeProps(to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}
/*  */

/*  */

/*  */

/*  */
// inline hooks to be invoked on component VNodes during patch


var componentVNodeHooks = {
  init: function init(vnode, hydrating) {
    if (vnode.componentInstance && !vnode.componentInstance._isDestroyed && vnode.data.keepAlive) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow

      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(vnode, activeInstance);
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },
  prepatch: function prepatch(oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(child, options.propsData, // updated props
    options.listeners, // updated listeners
    vnode, // new parent vnode
    options.children // new children
    );
  },
  insert: function insert(vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;

    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }

    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true
        /* direct */
        );
      }
    }
  },
  destroy: function destroy(vnode) {
    var componentInstance = vnode.componentInstance;

    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true
        /* direct */
        );
      }
    }
  }
};
var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent(Ctor, data, context, children, tag) {
  if (isUndef(Ctor)) {
    return;
  }

  var baseCtor = context.$options._base; // plain options object: turn it into a constructor

  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  } // if at this stage it's not a constructor or an async component factory,
  // reject.


  if (typeof Ctor !== 'function') {
    if ("development" !== 'production') {
      warn("Invalid Component definition: " + String(Ctor), context);
    }

    return;
  } // async component


  var asyncFactory;

  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);

    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(asyncFactory, data, context, children, tag);
    }
  }

  data = data || {}; // resolve constructor options in case global mixins are applied after
  // component constructor creation

  resolveConstructorOptions(Ctor); // transform component v-model data into props & events

  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  } // extract props


  var propsData = extractPropsFromVNodeData(data, Ctor, tag); // functional component

  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children);
  } // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners


  var listeners = data.on; // replace with listeners with .native modifier
  // so it gets processed during parent component patch.

  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot
    // work around flow
    var slot = data.slot;
    data = {};

    if (slot) {
      data.slot = slot;
    }
  } // install component management hooks onto the placeholder node


  installComponentHooks(data); // return a placeholder vnode

  var name = Ctor.options.name || tag;
  var vnode = new VNode("vue-component-" + Ctor.cid + (name ? "-" + name : ''), data, undefined, undefined, undefined, context, {
    Ctor: Ctor,
    propsData: propsData,
    listeners: listeners,
    tag: tag,
    children: children
  }, asyncFactory);
  return vnode;
}

function createComponentInstanceForVnode(vnode, // we know it's MountedComponentVNode but flow doesn't
parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  }; // check inline-template render functions

  var inlineTemplate = vnode.data.inlineTemplate;

  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }

  return new vnode.componentOptions.Ctor(options);
}

function installComponentHooks(data) {
  var hooks = data.hook || (data.hook = {});

  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];

    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1(f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };

  merged._merged = true;
  return merged;
} // transform component v-model info (value and callback) into
// prop and event handler respectively.


function transformModel(options, data) {
  var prop = options.model && options.model.prop || 'value';
  var event = options.model && options.model.event || 'input';
  (data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;

  if (isDef(existing)) {
    if (Array.isArray(existing) ? existing.indexOf(callback) === -1 : existing !== callback) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}
/*  */


var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2; // wrapper function for providing a more flexible interface
// without getting yelled at by flow

function createElement(context, tag, data, children, normalizationType, alwaysNormalize) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }

  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }

  return _createElement(context, tag, data, children, normalizationType);
}

function _createElement(context, tag, data, children, normalizationType) {
  if (isDef(data) && isDef(data.__ob__)) {
    "development" !== 'production' && warn("Avoid using observed data object as vnode data: " + JSON.stringify(data) + "\n" + 'Always create fresh vnode data objects in each render!', context);
    return createEmptyVNode();
  } // object syntax in v-bind


  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }

  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode();
  } // warn against non-primitive key


  if ("development" !== 'production' && isDef(data) && isDef(data.key) && !isPrimitive(data.key)) {
    {
      warn('Avoid using non-primitive value as key, ' + 'use string/number value instead.', context);
    }
  } // support single function children as default scoped slot


  if (Array.isArray(children) && typeof children[0] === 'function') {
    data = data || {};
    data.scopedSlots = {
      default: children[0]
    };
    children.length = 0;
  }

  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }

  var vnode, ns;

  if (typeof tag === 'string') {
    var Ctor;
    ns = context.$vnode && context.$vnode.ns || config.getTagNamespace(tag);

    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(config.parsePlatformTagName(tag), data, children, undefined, undefined, context);
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(tag, data, children, undefined, undefined, context);
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }

  if (Array.isArray(vnode)) {
    return vnode;
  } else if (isDef(vnode)) {
    if (isDef(ns)) {
      applyNS(vnode, ns);
    }

    if (isDef(data)) {
      registerDeepBindings(data);
    }

    return vnode;
  } else {
    return createEmptyVNode();
  }
}

function applyNS(vnode, ns, force) {
  vnode.ns = ns;

  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }

  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];

      if (isDef(child.tag) && (isUndef(child.ns) || isTrue(force) && child.tag !== 'svg')) {
        applyNS(child, ns, force);
      }
    }
  }
} // ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes


function registerDeepBindings(data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }

  if (isObject(data.class)) {
    traverse(data.class);
  }
}
/*  */


function initRender(vm) {
  vm._vnode = null; // the root of the child tree

  vm._staticTrees = null; // v-once cached trees

  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree

  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject; // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates

  vm._c = function (a, b, c, d) {
    return createElement(vm, a, b, c, d, false);
  }; // normalization is always applied for the public version, used in
  // user-written render functions.


  vm.$createElement = function (a, b, c, d) {
    return createElement(vm, a, b, c, d, true);
  }; // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated


  var parentData = parentVnode && parentVnode.data;
  /* istanbul ignore else */

  if ("development" !== 'production') {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, null, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, null, true);
  }
}

var currentRenderingInstance = null;

function renderMixin(Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this);
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(_parentVnode.data.scopedSlots, vm.$slots, vm.$scopedSlots);
    } // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.


    vm.$vnode = _parentVnode; // render self

    var vnode;

    try {
      // There's no need to maintain a stack becaues all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render"); // return error render result,
      // or previous vnode to prevent render error causing blank component

      /* istanbul ignore else */

      if ("development" !== 'production' && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    } // if the returned array contains only a single node, allow it


    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    } // return empty vnode in case the render function errored out


    if (!(vnode instanceof VNode)) {
      if ("development" !== 'production' && Array.isArray(vnode)) {
        warn('Multiple root nodes returned from render function. Render function ' + 'should return a single root node.', vm);
      }

      vnode = createEmptyVNode();
    } // set parent


    vnode.parent = _parentVnode;
    return vnode;
  };
}
/*  */


function ensureCtor(comp, base) {
  if (comp.__esModule || hasSymbol && comp[Symbol.toStringTag] === 'Module') {
    comp = comp.default;
  }

  return isObject(comp) ? base.extend(comp) : comp;
}

function createAsyncPlaceholder(factory, data, context, children, tag) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = {
    data: data,
    context: context,
    children: children,
    tag: tag
  };
  return node;
}

function resolveAsyncComponent(factory, baseCtor) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp;
  }

  if (isDef(factory.resolved)) {
    return factory.resolved;
  }

  var owner = currentRenderingInstance;

  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp;
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null;
    owner.$on('hook:destroyed', function () {
      return remove(owners, owner);
    });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        owners[i].$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;

        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }

        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor); // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)

      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });
    var reject = once(function (reason) {
      "development" !== 'production' && warn("Failed to resolve async component: " + String(factory) + (reason ? "\nReason: " + reason : ''));

      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });
    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);

          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;

              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;

            if (isUndef(factory.resolved)) {
              reject("development" !== 'production' ? "timeout (" + res.timeout + "ms)" : null);
            }
          }, res.timeout);
        }
      }
    }

    sync = false; // return in case resolved synchronously

    return factory.loading ? factory.loadingComp : factory.resolved;
  }
}
/*  */


function isAsyncPlaceholder(node) {
  return node.isComment && node.asyncFactory;
}
/*  */


function getFirstComponentChild(children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];

      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c;
      }
    }
  }
}
/*  */

/*  */


function initEvents(vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false; // init parent attached events

  var listeners = vm.$options._parentListeners;

  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add(event, fn) {
  target.$on(event, fn);
}

function remove$1(event, fn) {
  target.$off(event, fn);
}

function createOnceHandler(event, fn) {
  var _target = target;
  return function onceHandler() {
    var res = fn.apply(null, arguments);

    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  };
}

function updateComponentListeners(vm, listeners, oldListeners) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin(Vue) {
  var hookRE = /^hook:/;

  Vue.prototype.$on = function (event, fn) {
    var vm = this;

    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn); // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup

      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }

    return vm;
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;

    function on() {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }

    on.fn = fn;
    vm.$on(event, on);
    return vm;
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this; // all

    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm;
    } // array of events


    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }

      return vm;
    } // specific event


    var cbs = vm._events[event];

    if (!cbs) {
      return vm;
    }

    if (!fn) {
      vm._events[event] = null;
      return vm;
    } // specific handler


    var cb;
    var i = cbs.length;

    while (i--) {
      cb = cbs[i];

      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break;
      }
    }

    return vm;
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;

    if ("development" !== 'production') {
      var lowerCaseEvent = event.toLowerCase();

      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip("Event \"" + lowerCaseEvent + "\" is emitted in component " + formatComponentName(vm) + " but the handler is registered for \"" + event + "\". " + "Note that HTML attributes are case-insensitive and you cannot use " + "v-on to listen to camelCase events when using in-DOM templates. " + "You should probably use \"" + hyphenate(event) + "\" instead of \"" + event + "\".");
      }
    }

    var cbs = vm._events[event];

    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";

      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }

    return vm;
  };
}
/*  */


var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  };
}

function initLifecycle(vm) {
  var options = vm.$options; // locate first non-abstract parent

  var parent = options.parent;

  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }

    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;
  vm.$children = [];
  vm.$refs = {};
  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin(Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode; // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.

    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false
      /* removeOnly */
      );
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }

    restoreActiveInstance(); // update __vue__ reference

    if (prevEl) {
      prevEl.__vue__ = null;
    }

    if (vm.$el) {
      vm.$el.__vue__ = vm;
    } // if parent is an HOC, update its $el as well


    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    } // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.

  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;

    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;

    if (vm._isBeingDestroyed) {
      return;
    }

    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true; // remove self from parent

    var parent = vm.$parent;

    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    } // teardown watchers


    if (vm._watcher) {
      vm._watcher.teardown();
    }

    var i = vm._watchers.length;

    while (i--) {
      vm._watchers[i].teardown();
    } // remove reference from data ob
    // frozen object may not have observer.


    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    } // call the last hook...


    vm._isDestroyed = true; // invoke destroy hooks on current rendered tree

    vm.__patch__(vm._vnode, null); // fire destroyed hook


    callHook(vm, 'destroyed'); // turn off all instance listeners.

    vm.$off(); // remove __vue__ reference

    if (vm.$el) {
      vm.$el.__vue__ = null;
    } // release circular reference (#6759)


    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function mountComponent(vm, el, hydrating) {
  vm.$el = el;

  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;

    if ("development" !== 'production') {
      /* istanbul ignore if */
      if (vm.$options.template && vm.$options.template.charAt(0) !== '#' || vm.$options.el || el) {
        warn('You are using the runtime-only build of Vue where the template ' + 'compiler is not available. Either pre-compile the templates into ' + 'render functions, or use the compiler-included build.', vm);
      } else {
        warn('Failed to mount component: template or render function not defined.', vm);
      }
    }
  }

  callHook(vm, 'beforeMount');
  var updateComponent;
  /* istanbul ignore if */

  if ("development" !== 'production' && config.performance && mark) {
    updateComponent = function () {
      var name = vm._name;
      var id = vm._uid;
      var startTag = "vue-perf-start:" + id;
      var endTag = "vue-perf-end:" + id;
      mark(startTag);

      var vnode = vm._render();

      mark(endTag);
      measure("vue " + name + " render", startTag, endTag);
      mark(startTag);

      vm._update(vnode, hydrating);

      mark(endTag);
      measure("vue " + name + " patch", startTag, endTag);
    };
  } else {
    updateComponent = function () {
      vm._update(vm._render(), hydrating);
    };
  } // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined


  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true
  /* isRenderWatcher */
  );
  hydrating = false; // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook

  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }

  return vm;
}

function updateChildComponent(vm, propsData, listeners, parentVnode, renderChildren) {
  if ("development" !== 'production') {
    isUpdatingChildComponent = true;
  } // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.
  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.


  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(newScopedSlots && !newScopedSlots.$stable || oldScopedSlots !== emptyObject && !oldScopedSlots.$stable || newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key); // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.

  var needsForceUpdate = !!(renderChildren || // has new static slots
  vm.$options._renderChildren || // has old static slots
  hasDynamicScopedSlot);
  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) {
    // update child tree's parent
    vm._vnode.parent = parentVnode;
  }

  vm.$options._renderChildren = renderChildren; // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render

  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject; // update props

  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];

    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?

      props[key] = validateProp(key, propOptions, propsData, vm);
    }

    toggleObserving(true); // keep a copy of raw propsData

    vm.$options.propsData = propsData;
  } // update listeners


  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners); // resolve slots + force update if has children

  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if ("development" !== 'production') {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree(vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) {
      return true;
    }
  }

  return false;
}

function activateChildComponent(vm, direct) {
  if (direct) {
    vm._directInactive = false;

    if (isInInactiveTree(vm)) {
      return;
    }
  } else if (vm._directInactive) {
    return;
  }

  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;

    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }

    callHook(vm, 'activated');
  }
}

function deactivateChildComponent(vm, direct) {
  if (direct) {
    vm._directInactive = true;

    if (isInInactiveTree(vm)) {
      return;
    }
  }

  if (!vm._inactive) {
    vm._inactive = true;

    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }

    callHook(vm, 'deactivated');
  }
}

function callHook(vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";

  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }

  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }

  popTarget();
}
/*  */


var MAX_UPDATE_COUNT = 100;
var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;
/**
 * Reset the scheduler's state.
 */

function resetSchedulerState() {
  index = queue.length = activatedChildren.length = 0;
  has = {};

  if ("development" !== 'production') {
    circular = {};
  }

  waiting = flushing = false;
} // Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.


var currentFlushTimestamp = 0; // Async edge case fix requires storing an event listener's attach timestamp.

var getNow = Date.now; // Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)

if (inBrowser && !isIE) {
  var performance = window.performance;

  if (performance && typeof performance.now === 'function' && getNow() > document.createEvent('Event').timeStamp) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () {
      return performance.now();
    };
  }
}
/**
 * Flush both queues and run the watchers.
 */


function flushSchedulerQueue() {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id; // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.

  queue.sort(function (a, b) {
    return a.id - b.id;
  }); // do not cache length because more watchers might be pushed
  // as we run existing watchers

  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];

    if (watcher.before) {
      watcher.before();
    }

    id = watcher.id;
    has[id] = null;
    watcher.run(); // in dev build, check and stop circular updates.

    if ("development" !== 'production' && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;

      if (circular[id] > MAX_UPDATE_COUNT) {
        warn('You may have an infinite update loop ' + (watcher.user ? "in watcher with expression \"" + watcher.expression + "\"" : "in a component render function."), watcher.vm);
        break;
      }
    }
  } // keep copies of post queues before resetting state


  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();
  resetSchedulerState(); // call component updated and activated hooks

  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue); // devtool hook

  /* istanbul ignore if */

  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks(queue) {
  var i = queue.length;

  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;

    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}
/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */


function queueActivatedComponent(vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks(queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true
    /* true */
    );
  }
}
/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */


function queueWatcher(watcher) {
  var id = watcher.id;

  if (has[id] == null) {
    has[id] = true;

    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;

      while (i > index && queue[i].id > watcher.id) {
        i--;
      }

      queue.splice(i + 1, 0, watcher);
    } // queue the flush


    if (!waiting) {
      waiting = true;

      if ("development" !== 'production' && !config.async) {
        flushSchedulerQueue();
        return;
      }

      nextTick(flushSchedulerQueue);
    }
  }
}
/*  */


var uid$2 = 0;
/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */

var Watcher = function Watcher(vm, expOrFn, cb, options, isRenderWatcher) {
  this.vm = vm;

  if (isRenderWatcher) {
    vm._watcher = this;
  }

  vm._watchers.push(this); // options


  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }

  this.cb = cb;
  this.id = ++uid$2; // uid for batching

  this.active = true;
  this.dirty = this.lazy; // for lazy watchers

  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression = "development" !== 'production' ? expOrFn.toString() : ''; // parse expression for getter

  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);

    if (!this.getter) {
      this.getter = noop;
      "development" !== 'production' && warn("Failed watching path: \"" + expOrFn + "\" " + 'Watcher only accepts simple dot-delimited paths. ' + 'For full control, use a function instead.', vm);
    }
  }

  this.value = this.lazy ? undefined : this.get();
};
/**
 * Evaluate the getter, and re-collect dependencies.
 */


Watcher.prototype.get = function get() {
  pushTarget(this);
  var value;
  var vm = this.vm;

  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, "getter for watcher \"" + this.expression + "\"");
    } else {
      throw e;
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }

    popTarget();
    this.cleanupDeps();
  }

  return value;
};
/**
 * Add a dependency to this directive.
 */


Watcher.prototype.addDep = function addDep(dep) {
  var id = dep.id;

  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);

    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};
/**
 * Clean up for dependency collection.
 */


Watcher.prototype.cleanupDeps = function cleanupDeps() {
  var i = this.deps.length;

  while (i--) {
    var dep = this.deps[i];

    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }

  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};
/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */


Watcher.prototype.update = function update() {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};
/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */


Watcher.prototype.run = function run() {
  if (this.active) {
    var value = this.get();

    if (value !== this.value || // Deep watchers and watchers on Object/Arrays should fire even
    // when the value is the same, because the value may
    // have mutated.
    isObject(value) || this.deep) {
      // set new value
      var oldValue = this.value;
      this.value = value;

      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, "callback for watcher \"" + this.expression + "\"");
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};
/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */


Watcher.prototype.evaluate = function evaluate() {
  this.value = this.get();
  this.dirty = false;
};
/**
 * Depend on all deps collected by this watcher.
 */


Watcher.prototype.depend = function depend() {
  var i = this.deps.length;

  while (i--) {
    this.deps[i].depend();
  }
};
/**
 * Remove self from all dependencies' subscriber list.
 */


Watcher.prototype.teardown = function teardown() {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }

    var i = this.deps.length;

    while (i--) {
      this.deps[i].removeSub(this);
    }

    this.active = false;
  }
};
/*  */


var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy(target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter() {
    return this[sourceKey][key];
  };

  sharedPropertyDefinition.set = function proxySetter(val) {
    this[sourceKey][key] = val;
  };

  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState(vm) {
  vm._watchers = [];
  var opts = vm.$options;

  if (opts.props) {
    initProps(vm, opts.props);
  }

  if (opts.methods) {
    initMethods(vm, opts.methods);
  }

  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true
    /* asRootData */
    );
  }

  if (opts.computed) {
    initComputed(vm, opts.computed);
  }

  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps(vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {}; // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.

  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent; // root instance props should be converted

  if (!isRoot) {
    toggleObserving(false);
  }

  var loop = function (key) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */

    if ("development" !== 'production') {
      var hyphenatedKey = hyphenate(key);

      if (isReservedAttribute(hyphenatedKey) || config.isReservedAttr(hyphenatedKey)) {
        warn("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop.", vm);
      }

      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          warn("Avoid mutating a prop directly since the value will be " + "overwritten whenever the parent component re-renders. " + "Instead, use a data or computed property based on the prop's " + "value. Prop being mutated: \"" + key + "\"", vm);
        }
      });
    } else {
      defineReactive$$1(props, key, value);
    } // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.


    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop(key);

  toggleObserving(true);
}

function initData(vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function' ? getData(data, vm) : data || {};

  if (!isPlainObject(data)) {
    data = {};
    "development" !== 'production' && warn('data functions should return an object:\n' + 'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function', vm);
  } // proxy data on instance


  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;

  while (i--) {
    var key = keys[i];

    if ("development" !== 'production') {
      if (methods && hasOwn(methods, key)) {
        warn("Method \"" + key + "\" has already been defined as a data property.", vm);
      }
    }

    if (props && hasOwn(props, key)) {
      "development" !== 'production' && warn("The data property \"" + key + "\" is already declared as a prop. " + "Use prop default value instead.", vm);
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  } // observe data


  observe(data, true
  /* asRootData */
  );
}

function getData(data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();

  try {
    return data.call(vm, vm);
  } catch (e) {
    handleError(e, vm, "data()");
    return {};
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = {
  lazy: true
};

function initComputed(vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null); // computed properties are just getters during SSR

  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;

    if ("development" !== 'production' && getter == null) {
      warn("Getter is missing for computed property \"" + key + "\".", vm);
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(vm, getter || noop, noop, computedWatcherOptions);
    } // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.


    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if ("development" !== 'production') {
      if (key in vm.$data) {
        warn("The computed property \"" + key + "\" is already defined in data.", vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn("The computed property \"" + key + "\" is already defined as a prop.", vm);
      }
    }
  }
}

function defineComputed(target, key, userDef) {
  var shouldCache = !isServerRendering();

  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache ? createComputedGetter(key) : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get ? shouldCache && userDef.cache !== false ? createComputedGetter(key) : createGetterInvoker(userDef.get) : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }

  if ("development" !== 'production' && sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn("Computed property \"" + key + "\" was assigned to but it has no setter.", this);
    };
  }

  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter(key) {
  return function computedGetter() {
    var watcher = this._computedWatchers && this._computedWatchers[key];

    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }

      if (Dep.target) {
        watcher.depend();
      }

      return watcher.value;
    }
  };
}

function createGetterInvoker(fn) {
  return function computedGetter() {
    return fn.call(this, this);
  };
}

function initMethods(vm, methods) {
  var props = vm.$options.props;

  for (var key in methods) {
    if ("development" !== 'production') {
      if (typeof methods[key] !== 'function') {
        warn("Method \"" + key + "\" has type \"" + typeof methods[key] + "\" in the component definition. " + "Did you reference the function correctly?", vm);
      }

      if (props && hasOwn(props, key)) {
        warn("Method \"" + key + "\" has already been defined as a prop.", vm);
      }

      if (key in vm && isReserved(key)) {
        warn("Method \"" + key + "\" conflicts with an existing Vue instance method. " + "Avoid defining component methods that start with _ or $.");
      }
    }

    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch(vm, watch) {
  for (var key in watch) {
    var handler = watch[key];

    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher(vm, expOrFn, handler, options) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }

  if (typeof handler === 'string') {
    handler = vm[handler];
  }

  return vm.$watch(expOrFn, handler, options);
}

function stateMixin(Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};

  dataDef.get = function () {
    return this._data;
  };

  var propsDef = {};

  propsDef.get = function () {
    return this._props;
  };

  if ("development" !== 'production') {
    dataDef.set = function () {
      warn('Avoid replacing instance root $data. ' + 'Use nested data properties instead.', this);
    };

    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }

  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);
  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (expOrFn, cb, options) {
    var vm = this;

    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options);
    }

    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);

    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, "callback for immediate watcher \"" + watcher.expression + "\"");
      }
    }

    return function unwatchFn() {
      watcher.teardown();
    };
  };
}
/*  */


var uid$3 = 0;

function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    var vm = this; // a uid

    vm._uid = uid$3++;
    var startTag, endTag;
    /* istanbul ignore if */

    if ("development" !== 'production' && config.performance && mark) {
      startTag = "vue-perf-start:" + vm._uid;
      endTag = "vue-perf-end:" + vm._uid;
      mark(startTag);
    } // a flag to avoid this being observed


    vm._isVue = true; // merge options

    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(resolveConstructorOptions(vm.constructor), options || {}, vm);
    }
    /* istanbul ignore else */


    if ("development" !== 'production') {
      initProxy(vm);
    } else {
      vm._renderProxy = vm;
    } // expose real self


    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props

    initState(vm);
    initProvide(vm); // resolve provide after data/props

    callHook(vm, 'created');
    /* istanbul ignore if */

    if ("development" !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure("vue " + vm._name + " init", startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent(vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options); // doing this because it's faster than dynamic enumeration.

  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;
  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions(Ctor) {
  var options = Ctor.options;

  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;

    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions; // check if there are any late-modified/attached options (#4976)

      var modifiedOptions = resolveModifiedOptions(Ctor); // update base extend options

      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }

      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);

      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }

  return options;
}

function resolveModifiedOptions(Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;

  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) {
        modified = {};
      }

      modified[key] = latest[key];
    }
  }

  return modified;
}

function Vue(options) {
  if ("development" !== 'production' && !(this instanceof Vue)) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }

  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);
/*  */

function initUse(Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = this._installedPlugins || (this._installedPlugins = []);

    if (installedPlugins.indexOf(plugin) > -1) {
      return this;
    } // additional parameters


    var args = toArray(arguments, 1);
    args.unshift(this);

    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }

    installedPlugins.push(plugin);
    return this;
  };
}
/*  */


function initMixin$1(Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this;
  };
}
/*  */


function initExtend(Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;
  /**
   * Class inheritance
   */

  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});

    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId];
    }

    var name = extendOptions.name || Super.options.name;

    if ("development" !== 'production' && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent(options) {
      this._init(options);
    };

    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(Super.options, extendOptions);
    Sub['super'] = Super; // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.

    if (Sub.options.props) {
      initProps$1(Sub);
    }

    if (Sub.options.computed) {
      initComputed$1(Sub);
    } // allow further extension/mixin/plugin usage


    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use; // create asset registers, so extended classes
    // can have their private assets too.

    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    }); // enable recursive self-lookup

    if (name) {
      Sub.options.components[name] = Sub;
    } // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.


    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options); // cache constructor

    cachedCtors[SuperId] = Sub;
    return Sub;
  };
}

function initProps$1(Comp) {
  var props = Comp.options.props;

  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1(Comp) {
  var computed = Comp.options.computed;

  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}
/*  */


function initAssetRegisters(Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (id, definition) {
      if (!definition) {
        return this.options[type + 's'][id];
      } else {
        /* istanbul ignore if */
        if ("development" !== 'production' && type === 'component') {
          validateComponentName(id);
        }

        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }

        if (type === 'directive' && typeof definition === 'function') {
          definition = {
            bind: definition,
            update: definition
          };
        }

        this.options[type + 's'][id] = definition;
        return definition;
      }
    };
  });
}
/*  */


function getComponentName(opts) {
  return opts && (opts.Ctor.options.name || opts.tag);
}

function matches(pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1;
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1;
  } else if (isRegExp(pattern)) {
    return pattern.test(name);
  }
  /* istanbul ignore next */


  return false;
}

function pruneCache(keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;

  for (var key in cache) {
    var cachedNode = cache[key];

    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);

      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry(cache, key, keys, current) {
  var cached$$1 = cache[key];

  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }

  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];
var KeepAlive = {
  name: 'keep-alive',
  abstract: true,
  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },
  created: function created() {
    this.cache = Object.create(null);
    this.keys = [];
  },
  destroyed: function destroyed() {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },
  mounted: function mounted() {
    var this$1 = this;
    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) {
        return matches(val, name);
      });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) {
        return !matches(val, name);
      });
    });
  },
  render: function render() {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;

    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;

      if ( // not included
      include && (!name || !matches(include, name)) || // excluded
      exclude && name && matches(exclude, name)) {
        return vnode;
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null // same constructor may get registered as different local components
      // so cid alone is not enough (#3269)
      ? componentOptions.Ctor.cid + (componentOptions.tag ? "::" + componentOptions.tag : '') : vnode.key;

      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance; // make current key freshest

        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key); // prune oldest entry

        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }

    return vnode || slot && slot[0];
  }
};
var builtInComponents = {
  KeepAlive: KeepAlive
};
/*  */

function initGlobalAPI(Vue) {
  // config
  var configDef = {};

  configDef.get = function () {
    return config;
  };

  if ("development" !== 'production') {
    configDef.set = function () {
      warn('Do not replace the Vue.config object, set individual fields instead.');
    };
  }

  Object.defineProperty(Vue, 'config', configDef); // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.

  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };
  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick; // 2.6 explicit observable API

  Vue.observable = function (obj) {
    observe(obj);
    return obj;
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  }); // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.

  Vue.options._base = Vue;
  extend(Vue.options.components, builtInComponents);
  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);
Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});
Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get() {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext;
  }
}); // expose FunctionalRenderContext for ssr runtime helper installation

Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});
Vue.version = '2.6.10';
/*  */
// these are reserved for web because they are directly compiled away
// during template compilation

var isReservedAttr = makeMap('style,class'); // attributes that should be using props for binding

var acceptValue = makeMap('input,textarea,option,select,progress');

var mustUseProp = function (tag, type, attr) {
  return attr === 'value' && acceptValue(tag) && type !== 'button' || attr === 'selected' && tag === 'option' || attr === 'checked' && tag === 'input' || attr === 'muted' && tag === 'video';
};

var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');
var isValidContentEditableValue = makeMap('events,caret,typing,plaintext-only');

var convertEnumeratedValue = function (key, value) {
  return isFalsyAttrValue(value) || value === 'false' ? 'false' // allow arbitrary string value for contenteditable
  : key === 'contenteditable' && isValidContentEditableValue(value) ? value : 'true';
};

var isBooleanAttr = makeMap('allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' + 'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' + 'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' + 'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' + 'required,reversed,scoped,seamless,selected,sortable,translate,' + 'truespeed,typemustmatch,visible');
var xlinkNS = 'http://www.w3.org/1999/xlink';

var isXlink = function (name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink';
};

var getXlinkProp = function (name) {
  return isXlink(name) ? name.slice(6, name.length) : '';
};

var isFalsyAttrValue = function (val) {
  return val == null || val === false;
};
/*  */


function genClassForVnode(vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;

  while (isDef(childNode.componentInstance)) {
    childNode = childNode.componentInstance._vnode;

    if (childNode && childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }

  while (isDef(parentNode = parentNode.parent)) {
    if (parentNode && parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }

  return renderClass(data.staticClass, data.class);
}

function mergeClassData(child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: isDef(child.class) ? [child.class, parent.class] : parent.class
  };
}

function renderClass(staticClass, dynamicClass) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass));
  }
  /* istanbul ignore next */


  return '';
}

function concat(a, b) {
  return a ? b ? a + ' ' + b : a : b || '';
}

function stringifyClass(value) {
  if (Array.isArray(value)) {
    return stringifyArray(value);
  }

  if (isObject(value)) {
    return stringifyObject(value);
  }

  if (typeof value === 'string') {
    return value;
  }
  /* istanbul ignore next */


  return '';
}

function stringifyArray(value) {
  var res = '';
  var stringified;

  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) {
        res += ' ';
      }

      res += stringified;
    }
  }

  return res;
}

function stringifyObject(value) {
  var res = '';

  for (var key in value) {
    if (value[key]) {
      if (res) {
        res += ' ';
      }

      res += key;
    }
  }

  return res;
}
/*  */


var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML'
};
var isHTMLTag = makeMap('html,body,base,head,link,meta,style,title,' + 'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' + 'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' + 'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' + 's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' + 'embed,object,param,source,canvas,script,noscript,del,ins,' + 'caption,col,colgroup,table,thead,tbody,td,th,tr,' + 'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' + 'output,progress,select,textarea,' + 'details,dialog,menu,menuitem,summary,' + 'content,element,shadow,template,blockquote,iframe,tfoot'); // this map is intentionally selective, only covering SVG elements that may
// contain child elements.

var isSVG = makeMap('svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' + 'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' + 'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view', true);

var isReservedTag = function (tag) {
  return isHTMLTag(tag) || isSVG(tag);
};

function getTagNamespace(tag) {
  if (isSVG(tag)) {
    return 'svg';
  } // basic support for MathML
  // note it doesn't support other MathML elements being component roots


  if (tag === 'math') {
    return 'math';
  }
}

var unknownElementCache = Object.create(null);

function isUnknownElement(tag) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return true;
  }

  if (isReservedTag(tag)) {
    return false;
  }

  tag = tag.toLowerCase();
  /* istanbul ignore if */

  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag];
  }

  var el = document.createElement(tag);

  if (tag.indexOf('-') > -1) {
    // http://stackoverflow.com/a/28210364/1070244
    return unknownElementCache[tag] = el.constructor === window.HTMLUnknownElement || el.constructor === window.HTMLElement;
  } else {
    return unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString());
  }
}

var isTextInputType = makeMap('text,number,password,search,email,tel,url');
/*  */

/**
 * Query an element selector if it's not an element already.
 */

function query(el) {
  if (typeof el === 'string') {
    var selected = document.querySelector(el);

    if (!selected) {
      "development" !== 'production' && warn('Cannot find element: ' + el);
      return document.createElement('div');
    }

    return selected;
  } else {
    return el;
  }
}
/*  */


function createElement$1(tagName, vnode) {
  var elm = document.createElement(tagName);

  if (tagName !== 'select') {
    return elm;
  } // false or null will remove the attribute but undefined will not


  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple');
  }

  return elm;
}

function createElementNS(namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName);
}

function createTextNode(text) {
  return document.createTextNode(text);
}

function createComment(text) {
  return document.createComment(text);
}

function insertBefore(parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild(node, child) {
  node.removeChild(child);
}

function appendChild(node, child) {
  node.appendChild(child);
}

function parentNode(node) {
  return node.parentNode;
}

function nextSibling(node) {
  return node.nextSibling;
}

function tagName(node) {
  return node.tagName;
}

function setTextContent(node, text) {
  node.textContent = text;
}

function setStyleScope(node, scopeId) {
  node.setAttribute(scopeId, '');
}

var nodeOps =
/*#__PURE__*/
Object.freeze({
  createElement: createElement$1,
  createElementNS: createElementNS,
  createTextNode: createTextNode,
  createComment: createComment,
  insertBefore: insertBefore,
  removeChild: removeChild,
  appendChild: appendChild,
  parentNode: parentNode,
  nextSibling: nextSibling,
  tagName: tagName,
  setTextContent: setTextContent,
  setStyleScope: setStyleScope
});
/*  */

var ref = {
  create: function create(_, vnode) {
    registerRef(vnode);
  },
  update: function update(oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy(vnode) {
    registerRef(vnode, true);
  }
};

function registerRef(vnode, isRemoval) {
  var key = vnode.data.ref;

  if (!isDef(key)) {
    return;
  }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;

  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (!Array.isArray(refs[key])) {
        refs[key] = [ref];
      } else if (refs[key].indexOf(ref) < 0) {
        // $flow-disable-line
        refs[key].push(ref);
      }
    } else {
      refs[key] = ref;
    }
  }
}
/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */


var emptyNode = new VNode('', {}, []);
var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function sameVnode(a, b) {
  return a.key === b.key && (a.tag === b.tag && a.isComment === b.isComment && isDef(a.data) === isDef(b.data) && sameInputType(a, b) || isTrue(a.isAsyncPlaceholder) && a.asyncFactory === b.asyncFactory && isUndef(b.asyncFactory.error));
}

function sameInputType(a, b) {
  if (a.tag !== 'input') {
    return true;
  }

  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB);
}

function createKeyToOldIdx(children, beginIdx, endIdx) {
  var i, key;
  var map = {};

  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;

    if (isDef(key)) {
      map[key] = i;
    }
  }

  return map;
}

function createPatchFunction(backend) {
  var i, j;
  var cbs = {};
  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];

    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
    }
  }

  function emptyNodeAt(elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm);
  }

  function createRmCb(childElm, listeners) {
    function remove$$1() {
      if (--remove$$1.listeners === 0) {
        removeNode(childElm);
      }
    }

    remove$$1.listeners = listeners;
    return remove$$1;
  }

  function removeNode(el) {
    var parent = nodeOps.parentNode(el); // element may have already been removed due to v-html / v-text

    if (isDef(parent)) {
      nodeOps.removeChild(parent, el);
    }
  }

  function isUnknownElement$$1(vnode, inVPre) {
    return !inVPre && !vnode.ns && !(config.ignoredElements.length && config.ignoredElements.some(function (ignore) {
      return isRegExp(ignore) ? ignore.test(vnode.tag) : ignore === vnode.tag;
    })) && config.isUnknownElement(vnode.tag);
  }

  var creatingElmInVPre = 0;

  function createElm(vnode, insertedVnodeQueue, parentElm, refElm, nested, ownerArray, index) {
    if (isDef(vnode.elm) && isDef(ownerArray)) {
      // This vnode was used in a previous render!
      // now it's used as a new node, overwriting its elm would cause
      // potential patch errors down the road when it's used as an insertion
      // reference node. Instead, we clone the node on-demand before creating
      // associated DOM element for it.
      vnode = ownerArray[index] = cloneVNode(vnode);
    }

    vnode.isRootInsert = !nested; // for transition enter check

    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return;
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;

    if (isDef(tag)) {
      if ("development" !== 'production') {
        if (data && data.pre) {
          creatingElmInVPre++;
        }

        if (isUnknownElement$$1(vnode, creatingElmInVPre)) {
          warn('Unknown custom element: <' + tag + '> - did you ' + 'register the component correctly? For recursive components, ' + 'make sure to provide the "name" option.', vnode.context);
        }
      }

      vnode.elm = vnode.ns ? nodeOps.createElementNS(vnode.ns, tag) : nodeOps.createElement(tag, vnode);
      setScope(vnode);
      /* istanbul ignore if */

      {
        createChildren(vnode, children, insertedVnodeQueue);

        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }

        insert(parentElm, vnode.elm, refElm);
      }

      if ("development" !== 'production' && data && data.pre) {
        creatingElmInVPre--;
      }
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;

    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;

      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false
        /* hydrating */
        );
      } // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.


      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        insert(parentElm, vnode.elm, refElm);

        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }

        return true;
      }
    }
  }

  function initComponent(vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
      vnode.data.pendingInsert = null;
    }

    vnode.elm = vnode.componentInstance.$el;

    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode); // make sure to invoke the insert hook

      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
    var i; // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.

    var innerNode = vnode;

    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;

      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }

        insertedVnodeQueue.push(innerNode);
        break;
      }
    } // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself


    insert(parentElm, vnode.elm, refElm);
  }

  function insert(parent, elm, ref$$1) {
    if (isDef(parent)) {
      if (isDef(ref$$1)) {
        if (nodeOps.parentNode(ref$$1) === parent) {
          nodeOps.insertBefore(parent, elm, ref$$1);
        }
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren(vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      if ("development" !== 'production') {
        checkDuplicateKeys(children);
      }

      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true, children, i);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)));
    }
  }

  function isPatchable(vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }

    return isDef(vnode.tag);
  }

  function invokeCreateHooks(vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }

    i = vnode.data.hook; // Reuse variable

    if (isDef(i)) {
      if (isDef(i.create)) {
        i.create(emptyNode, vnode);
      }

      if (isDef(i.insert)) {
        insertedVnodeQueue.push(vnode);
      }
    }
  } // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.


  function setScope(vnode) {
    var i;

    if (isDef(i = vnode.fnScopeId)) {
      nodeOps.setStyleScope(vnode.elm, i);
    } else {
      var ancestor = vnode;

      while (ancestor) {
        if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
          nodeOps.setStyleScope(vnode.elm, i);
        }

        ancestor = ancestor.parent;
      }
    } // for slot content they should also get the scopeId from the host instance.


    if (isDef(i = activeInstance) && i !== vnode.context && i !== vnode.fnContext && isDef(i = i.$options._scopeId)) {
      nodeOps.setStyleScope(vnode.elm, i);
    }
  }

  function addVnodes(parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm, false, vnodes, startIdx);
    }
  }

  function invokeDestroyHook(vnode) {
    var i, j;
    var data = vnode.data;

    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) {
        i(vnode);
      }

      for (i = 0; i < cbs.destroy.length; ++i) {
        cbs.destroy[i](vnode);
      }
    }

    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];

      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else {
          // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook(vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var i;
      var listeners = cbs.remove.length + 1;

      if (isDef(rm)) {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      } else {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      } // recursively invoke hooks on child component root node


      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }

      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }

      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, vnodeToMove, refElm; // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions

    var canMove = !removeOnly;

    if ("development" !== 'production') {
      checkDuplicateKeys(newCh);
    }

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) {
        // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) {
        // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) {
          oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
        }

        idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);

        if (isUndef(idxInOld)) {
          // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
        } else {
          vnodeToMove = oldCh[idxInOld];

          if (sameVnode(vnodeToMove, newStartVnode)) {
            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
          }
        }

        newStartVnode = newCh[++newStartIdx];
      }
    }

    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function checkDuplicateKeys(children) {
    var seenKeys = {};

    for (var i = 0; i < children.length; i++) {
      var vnode = children[i];
      var key = vnode.key;

      if (isDef(key)) {
        if (seenKeys[key]) {
          warn("Duplicate keys detected: '" + key + "'. This may cause an update error.", vnode.context);
        } else {
          seenKeys[key] = true;
        }
      }
    }
  }

  function findIdxInOld(node, oldCh, start, end) {
    for (var i = start; i < end; i++) {
      var c = oldCh[i];

      if (isDef(c) && sameVnode(node, c)) {
        return i;
      }
    }
  }

  function patchVnode(oldVnode, vnode, insertedVnodeQueue, ownerArray, index, removeOnly) {
    if (oldVnode === vnode) {
      return;
    }

    if (isDef(vnode.elm) && isDef(ownerArray)) {
      // clone reused vnode
      vnode = ownerArray[index] = cloneVNode(vnode);
    }

    var elm = vnode.elm = oldVnode.elm;

    if (isTrue(oldVnode.isAsyncPlaceholder)) {
      if (isDef(vnode.asyncFactory.resolved)) {
        hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
      } else {
        vnode.isAsyncPlaceholder = true;
      }

      return;
    } // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.


    if (isTrue(vnode.isStatic) && isTrue(oldVnode.isStatic) && vnode.key === oldVnode.key && (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))) {
      vnode.componentInstance = oldVnode.componentInstance;
      return;
    }

    var i;
    var data = vnode.data;

    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }

    var oldCh = oldVnode.children;
    var ch = vnode.children;

    if (isDef(data) && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) {
        cbs.update[i](oldVnode, vnode);
      }

      if (isDef(i = data.hook) && isDef(i = i.update)) {
        i(oldVnode, vnode);
      }
    }

    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) {
          updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly);
        }
      } else if (isDef(ch)) {
        if ("development" !== 'production') {
          checkDuplicateKeys(ch);
        }

        if (isDef(oldVnode.text)) {
          nodeOps.setTextContent(elm, '');
        }

        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }

    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) {
        i(oldVnode, vnode);
      }
    }
  }

  function invokeInsertHook(vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var hydrationBailed = false; // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  // Note: style is excluded because it relies on initial clone for future
  // deep updates (#7063).

  var isRenderedModule = makeMap('attrs,class,staticClass,staticStyle,key'); // Note: this is a browser-only function so we can assume elms are DOM nodes.

  function hydrate(elm, vnode, insertedVnodeQueue, inVPre) {
    var i;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    inVPre = inVPre || data && data.pre;
    vnode.elm = elm;

    if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
      vnode.isAsyncPlaceholder = true;
      return true;
    } // assert node match


    if ("development" !== 'production') {
      if (!assertNodeMatch(elm, vnode, inVPre)) {
        return false;
      }
    }

    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) {
        i(vnode, true
        /* hydrating */
        );
      }

      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true;
      }
    }

    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          // v-html and domProps: innerHTML
          if (isDef(i = data) && isDef(i = i.domProps) && isDef(i = i.innerHTML)) {
            if (i !== elm.innerHTML) {
              /* istanbul ignore if */
              if ("development" !== 'production' && typeof console !== 'undefined' && !hydrationBailed) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('server innerHTML: ', i);
                console.warn('client innerHTML: ', elm.innerHTML);
              }

              return false;
            }
          } else {
            // iterate and compare children lists
            var childrenMatch = true;
            var childNode = elm.firstChild;

            for (var i$1 = 0; i$1 < children.length; i$1++) {
              if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue, inVPre)) {
                childrenMatch = false;
                break;
              }

              childNode = childNode.nextSibling;
            } // if childNode is not null, it means the actual childNodes list is
            // longer than the virtual children list.


            if (!childrenMatch || childNode) {
              /* istanbul ignore if */
              if ("development" !== 'production' && typeof console !== 'undefined' && !hydrationBailed) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
              }

              return false;
            }
          }
        }
      }

      if (isDef(data)) {
        var fullInvoke = false;

        for (var key in data) {
          if (!isRenderedModule(key)) {
            fullInvoke = true;
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break;
          }
        }

        if (!fullInvoke && data['class']) {
          // ensure collecting deps for deep class bindings for future updates
          traverse(data['class']);
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }

    return true;
  }

  function assertNodeMatch(node, vnode, inVPre) {
    if (isDef(vnode.tag)) {
      return vnode.tag.indexOf('vue-component') === 0 || !isUnknownElement$$1(vnode, inVPre) && vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase());
    } else {
      return node.nodeType === (vnode.isComment ? 8 : 3);
    }
  }

  return function patch(oldVnode, vnode, hydrating, removeOnly) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) {
        invokeDestroyHook(oldVnode);
      }

      return;
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);

      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }

          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode;
            } else if ("development" !== 'production') {
              warn('The client-side rendered virtual DOM tree is not matching ' + 'server-rendered content. This is likely caused by incorrect ' + 'HTML markup, for example nesting block-level elements inside ' + '<p>, or missing <tbody>. Bailing hydration and performing ' + 'full client-side render.');
            }
          } // either not server-rendered, or hydration failed.
          // create an empty node and replace it


          oldVnode = emptyNodeAt(oldVnode);
        } // replacing existing element


        var oldElm = oldVnode.elm;
        var parentElm = nodeOps.parentNode(oldElm); // create new node

        createElm(vnode, insertedVnodeQueue, // extremely rare edge case: do not insert if old element is in a
        // leaving transition. Only happens when combining transition +
        // keep-alive + HOCs. (#4590)
        oldElm._leaveCb ? null : parentElm, nodeOps.nextSibling(oldElm)); // update parent placeholder node element, recursively

        if (isDef(vnode.parent)) {
          var ancestor = vnode.parent;
          var patchable = isPatchable(vnode);

          while (ancestor) {
            for (var i = 0; i < cbs.destroy.length; ++i) {
              cbs.destroy[i](ancestor);
            }

            ancestor.elm = vnode.elm;

            if (patchable) {
              for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
                cbs.create[i$1](emptyNode, ancestor);
              } // #6513
              // invoke insert hooks that may have been merged by create hooks.
              // e.g. for directives that uses the "inserted" hook.


              var insert = ancestor.data.hook.insert;

              if (insert.merged) {
                // start at index 1 to avoid re-invoking component mounted hook
                for (var i$2 = 1; i$2 < insert.fns.length; i$2++) {
                  insert.fns[i$2]();
                }
              }
            } else {
              registerRef(ancestor);
            }

            ancestor = ancestor.parent;
          }
        } // destroy old node


        if (isDef(parentElm)) {
          removeVnodes(parentElm, [oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm;
  };
}
/*  */


var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives(vnode) {
    updateDirectives(vnode, emptyNode);
  }
};

function updateDirectives(oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}

function _update(oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);
  var dirsWithInsert = [];
  var dirsWithPostpatch = [];
  var key, oldDir, dir;

  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];

    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode);

      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      dir.oldArg = oldDir.arg;
      callHook$1(dir, 'update', vnode, oldVnode);

      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function () {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };

    if (isCreate) {
      mergeVNodeHook(vnode, 'insert', callInsert);
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode, 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    });
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
      }
    }
  }
}

var emptyModifiers = Object.create(null);

function normalizeDirectives$1(dirs, vm) {
  var res = Object.create(null);

  if (!dirs) {
    // $flow-disable-line
    return res;
  }

  var i, dir;

  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];

    if (!dir.modifiers) {
      // $flow-disable-line
      dir.modifiers = emptyModifiers;
    }

    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  } // $flow-disable-line


  return res;
}

function getRawDirName(dir) {
  return dir.rawName || dir.name + "." + Object.keys(dir.modifiers || {}).join('.');
}

function callHook$1(dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];

  if (fn) {
    try {
      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
    } catch (e) {
      handleError(e, vnode.context, "directive " + dir.name + " " + hook + " hook");
    }
  }
}

var baseModules = [ref, directives];
/*  */

function updateAttrs(oldVnode, vnode) {
  var opts = vnode.componentOptions;

  if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
    return;
  }

  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
    return;
  }

  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {}; // clone observed objects, as the user probably wants to mutate it

  if (isDef(attrs.__ob__)) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];

    if (old !== cur) {
      setAttr(elm, key, cur);
    }
  } // #4391: in IE9, setting type can reset value for input[type=radio]
  // #6666: IE/Edge forces progress value down to 1 before setting a max

  /* istanbul ignore if */


  if ((isIE || isEdge) && attrs.value !== oldAttrs.value) {
    setAttr(elm, 'value', attrs.value);
  }

  for (key in oldAttrs) {
    if (isUndef(attrs[key])) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}

function setAttr(el, key, value) {
  if (el.tagName.indexOf('-') > -1) {
    baseSetAttr(el, key, value);
  } else if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      // technically allowfullscreen is a boolean attribute for <iframe>,
      // but Flash expects a value of "true" when used on <embed> tag
      value = key === 'allowfullscreen' && el.tagName === 'EMBED' ? 'true' : key;
      el.setAttribute(key, value);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, convertEnumeratedValue(key, value));
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    baseSetAttr(el, key, value);
  }
}

function baseSetAttr(el, key, value) {
  if (isFalsyAttrValue(value)) {
    el.removeAttribute(key);
  } else {
    // #7138: IE10 & 11 fires input event when setting placeholder on
    // <textarea>... block the first input event and remove the blocker
    // immediately.

    /* istanbul ignore if */
    if (isIE && !isIE9 && el.tagName === 'TEXTAREA' && key === 'placeholder' && value !== '' && !el.__ieph) {
      var blocker = function (e) {
        e.stopImmediatePropagation();
        el.removeEventListener('input', blocker);
      };

      el.addEventListener('input', blocker); // $flow-disable-line

      el.__ieph = true;
      /* IE placeholder patched */
    }

    el.setAttribute(key, value);
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs
};
/*  */

function updateClass(oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (isUndef(data.staticClass) && isUndef(data.class) && (isUndef(oldData) || isUndef(oldData.staticClass) && isUndef(oldData.class))) {
    return;
  }

  var cls = genClassForVnode(vnode); // handle transition classes

  var transitionClass = el._transitionClasses;

  if (isDef(transitionClass)) {
    cls = concat(cls, stringifyClass(transitionClass));
  } // set the class


  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}

var klass = {
  create: updateClass,
  update: updateClass
};
/*  */

/*  */

/*  */

/*  */
// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.

var RANGE_TOKEN = '__r';
var CHECKBOX_RADIO_TOKEN = '__c';
/*  */
// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.

function normalizeEvents(on) {
  /* istanbul ignore if */
  if (isDef(on[RANGE_TOKEN])) {
    // IE input[type=range] only supports `change` event
    var event = isIE ? 'change' : 'input';
    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
    delete on[RANGE_TOKEN];
  } // This was originally intended to fix #4521 but no longer necessary
  // after 2.5. Keeping it for backwards compat with generated code from < 2.4

  /* istanbul ignore if */


  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
    on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || []);
    delete on[CHECKBOX_RADIO_TOKEN];
  }
}

var target$1;

function createOnceHandler$1(event, handler, capture) {
  var _target = target$1; // save current target element in closure

  return function onceHandler() {
    var res = handler.apply(null, arguments);

    if (res !== null) {
      remove$2(event, onceHandler, capture, _target);
    }
  };
} // #9446: Firefox <= 53 (in particular, ESR 52) has incorrect Event.timeStamp
// implementation and does not fire microtasks in between event propagation, so
// safe to exclude.


var useMicrotaskFix = isUsingMicroTask && !(isFF && Number(isFF[1]) <= 53);

function add$1(name, handler, capture, passive) {
  // async edge case #6566: inner click event triggers patch, event handler
  // attached to outer element during patch, and triggered again. This
  // happens because browsers fire microtask ticks between event propagation.
  // the solution is simple: we save the timestamp when a handler is attached,
  // and the handler would only fire if the event passed to it was fired
  // AFTER it was attached.
  if (useMicrotaskFix) {
    var attachedTimestamp = currentFlushTimestamp;
    var original = handler;

    handler = original._wrapper = function (e) {
      if ( // no bubbling, should always fire.
      // this is just a safety net in case event.timeStamp is unreliable in
      // certain weird environments...
      e.target === e.currentTarget || // event is fired after handler attachment
      e.timeStamp >= attachedTimestamp || // bail for environments that have buggy event.timeStamp implementations
      // #9462 iOS 9 bug: event.timeStamp is 0 after history.pushState
      // #9681 QtWebEngine event.timeStamp is negative value
      e.timeStamp <= 0 || // #9448 bail if event is fired in another document in a multi-page
      // electron/nw.js app, since event.timeStamp will be using a different
      // starting reference
      e.target.ownerDocument !== document) {
        return original.apply(this, arguments);
      }
    };
  }

  target$1.addEventListener(name, handler, supportsPassive ? {
    capture: capture,
    passive: passive
  } : capture);
}

function remove$2(name, handler, capture, _target) {
  (_target || target$1).removeEventListener(name, handler._wrapper || handler, capture);
}

function updateDOMListeners(oldVnode, vnode) {
  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
    return;
  }

  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$1 = vnode.elm;
  normalizeEvents(on);
  updateListeners(on, oldOn, add$1, remove$2, createOnceHandler$1, vnode.context);
  target$1 = undefined;
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
};
/*  */

var svgContainer;

function updateDOMProps(oldVnode, vnode) {
  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
    return;
  }

  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {}; // clone observed objects, as the user probably wants to mutate it

  if (isDef(props.__ob__)) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (!(key in props)) {
      elm[key] = '';
    }
  }

  for (key in props) {
    cur = props[key]; // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)

    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) {
        vnode.children.length = 0;
      }

      if (cur === oldProps[key]) {
        continue;
      } // #6601 work around Chrome version <= 55 bug where single textNode
      // replaced by innerHTML/textContent retains its parentNode property


      if (elm.childNodes.length === 1) {
        elm.removeChild(elm.childNodes[0]);
      }
    }

    if (key === 'value' && elm.tagName !== 'PROGRESS') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur; // avoid resetting cursor position when value is the same

      var strCur = isUndef(cur) ? '' : String(cur);

      if (shouldUpdateValue(elm, strCur)) {
        elm.value = strCur;
      }
    } else if (key === 'innerHTML' && isSVG(elm.tagName) && isUndef(elm.innerHTML)) {
      // IE doesn't support innerHTML for SVG elements
      svgContainer = svgContainer || document.createElement('div');
      svgContainer.innerHTML = "<svg>" + cur + "</svg>";
      var svg = svgContainer.firstChild;

      while (elm.firstChild) {
        elm.removeChild(elm.firstChild);
      }

      while (svg.firstChild) {
        elm.appendChild(svg.firstChild);
      }
    } else if ( // skip the update if old and new VDOM state is the same.
    // `value` is handled separately because the DOM value may be temporarily
    // out of sync with VDOM state due to focus, composition and modifiers.
    // This  #4521 by skipping the unnecesarry `checked` update.
    cur !== oldProps[key]) {
      // some property updates can throw
      // e.g. `value` on <progress> w/ non-finite value
      try {
        elm[key] = cur;
      } catch (e) {}
    }
  }
} // check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue(elm, checkVal) {
  return !elm.composing && (elm.tagName === 'OPTION' || isNotInFocusAndDirty(elm, checkVal) || isDirtyWithModifiers(elm, checkVal));
}

function isNotInFocusAndDirty(elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is
  // not equal to the updated value
  var notInFocus = true; // #6157
  // work around IE bug when accessing document.activeElement in an iframe

  try {
    notInFocus = document.activeElement !== elm;
  } catch (e) {}

  return notInFocus && elm.value !== checkVal;
}

function isDirtyWithModifiers(elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers; // injected by v-model runtime

  if (isDef(modifiers)) {
    if (modifiers.number) {
      return toNumber(value) !== toNumber(newVal);
    }

    if (modifiers.trim) {
      return value.trim() !== newVal.trim();
    }
  }

  return value !== newVal;
}

var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
};
/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res;
}); // merge static and dynamic style data on the same vnode

function normalizeStyleData(data) {
  var style = normalizeStyleBinding(data.style); // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it

  return data.staticStyle ? extend(data.staticStyle, style) : style;
} // normalize possible array / string values into Object


function normalizeStyleBinding(bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle);
  }

  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle);
  }

  return bindingStyle;
}
/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */


function getStyle(vnode, checkChild) {
  var res = {};
  var styleData;

  if (checkChild) {
    var childNode = vnode;

    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;

      if (childNode && childNode.data && (styleData = normalizeStyleData(childNode.data))) {
        extend(res, styleData);
      }
    }
  }

  if (styleData = normalizeStyleData(vnode.data)) {
    extend(res, styleData);
  }

  var parentNode = vnode;

  while (parentNode = parentNode.parent) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData);
    }
  }

  return res;
}
/*  */


var cssVarRE = /^--/;
var importantRE = /\s*!important$/;

var setProp = function (el, name, val) {
  /* istanbul ignore if */
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(hyphenate(name), val.replace(importantRE, ''), 'important');
  } else {
    var normalizedName = normalize(name);

    if (Array.isArray(val)) {
      // Support values array created by autoprefixer, e.g.
      // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
      // Set them one by one, and the browser will only set those it can recognize
      for (var i = 0, len = val.length; i < len; i++) {
        el.style[normalizedName] = val[i];
      }
    } else {
      el.style[normalizedName] = val;
    }
  }
};

var vendorNames = ['Webkit', 'Moz', 'ms'];
var emptyStyle;
var normalize = cached(function (prop) {
  emptyStyle = emptyStyle || document.createElement('div').style;
  prop = camelize(prop);

  if (prop !== 'filter' && prop in emptyStyle) {
    return prop;
  }

  var capName = prop.charAt(0).toUpperCase() + prop.slice(1);

  for (var i = 0; i < vendorNames.length; i++) {
    var name = vendorNames[i] + capName;

    if (name in emptyStyle) {
      return name;
    }
  }
});

function updateStyle(oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (isUndef(data.staticStyle) && isUndef(data.style) && isUndef(oldData.staticStyle) && isUndef(oldData.style)) {
    return;
  }

  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldData.staticStyle;
  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {}; // if static style exists, stylebinding already merged into it when doing normalizeStyleData

  var oldStyle = oldStaticStyle || oldStyleBinding;
  var style = normalizeStyleBinding(vnode.data.style) || {}; // store normalized style under a different key for next diff
  // make sure to clone it if it's reactive, since the user likely wants
  // to mutate it.

  vnode.data.normalizedStyle = isDef(style.__ob__) ? extend({}, style) : style;
  var newStyle = getStyle(vnode, true);

  for (name in oldStyle) {
    if (isUndef(newStyle[name])) {
      setProp(el, name, '');
    }
  }

  for (name in newStyle) {
    cur = newStyle[name];

    if (cur !== oldStyle[name]) {
      // ie9 setting to null has no effect, must use empty string
      setProp(el, name, cur == null ? '' : cur);
    }
  }
}

var style = {
  create: updateStyle,
  update: updateStyle
};
/*  */

var whitespaceRE = /\s+/;
/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */

function addClass(el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return;
  }
  /* istanbul ignore else */


  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(whitespaceRE).forEach(function (c) {
        return el.classList.add(c);
      });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";

    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}
/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */


function removeClass(el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return;
  }
  /* istanbul ignore else */


  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(whitespaceRE).forEach(function (c) {
        return el.classList.remove(c);
      });
    } else {
      el.classList.remove(cls);
    }

    if (!el.classList.length) {
      el.removeAttribute('class');
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    var tar = ' ' + cls + ' ';

    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }

    cur = cur.trim();

    if (cur) {
      el.setAttribute('class', cur);
    } else {
      el.removeAttribute('class');
    }
  }
}
/*  */


function resolveTransition(def$$1) {
  if (!def$$1) {
    return;
  }
  /* istanbul ignore else */


  if (typeof def$$1 === 'object') {
    var res = {};

    if (def$$1.css !== false) {
      extend(res, autoCssTransition(def$$1.name || 'v'));
    }

    extend(res, def$$1);
    return res;
  } else if (typeof def$$1 === 'string') {
    return autoCssTransition(def$$1);
  }
}

var autoCssTransition = cached(function (name) {
  return {
    enterClass: name + "-enter",
    enterToClass: name + "-enter-to",
    enterActiveClass: name + "-enter-active",
    leaveClass: name + "-leave",
    leaveToClass: name + "-leave-to",
    leaveActiveClass: name + "-leave-active"
  };
});
var hasTransition = inBrowser && !isIE9;
var TRANSITION = 'transition';
var ANIMATION = 'animation'; // Transition property/event sniffing

var transitionProp = 'transition';
var transitionEndEvent = 'transitionend';
var animationProp = 'animation';
var animationEndEvent = 'animationend';

if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined && window.onwebkittransitionend !== undefined) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }

  if (window.onanimationend === undefined && window.onwebkitanimationend !== undefined) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }
} // binding to window is necessary to make hot reload work in IE in strict mode


var raf = inBrowser ? window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : setTimeout :
/* istanbul ignore next */
function (fn) {
  return fn();
};

function nextFrame(fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass(el, cls) {
  var transitionClasses = el._transitionClasses || (el._transitionClasses = []);

  if (transitionClasses.indexOf(cls) < 0) {
    transitionClasses.push(cls);
    addClass(el, cls);
  }
}

function removeTransitionClass(el, cls) {
  if (el._transitionClasses) {
    remove(el._transitionClasses, cls);
  }

  removeClass(el, cls);
}

function whenTransitionEnds(el, expectedType, cb) {
  var ref = getTransitionInfo(el, expectedType);
  var type = ref.type;
  var timeout = ref.timeout;
  var propCount = ref.propCount;

  if (!type) {
    return cb();
  }

  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;

  var end = function () {
    el.removeEventListener(event, onEnd);
    cb();
  };

  var onEnd = function (e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };

  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}

var transformRE = /\b(transform|all)(,|$)/;

function getTransitionInfo(el, expectedType) {
  var styles = window.getComputedStyle(el); // JSDOM may return undefined for transition properties

  var transitionDelays = (styles[transitionProp + 'Delay'] || '').split(', ');
  var transitionDurations = (styles[transitionProp + 'Duration'] || '').split(', ');
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = (styles[animationProp + 'Delay'] || '').split(', ');
  var animationDurations = (styles[animationProp + 'Duration'] || '').split(', ');
  var animationTimeout = getTimeout(animationDelays, animationDurations);
  var type;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */

  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0 ? transitionTimeout > animationTimeout ? TRANSITION : ANIMATION : null;
    propCount = type ? type === TRANSITION ? transitionDurations.length : animationDurations.length : 0;
  }

  var hasTransform = type === TRANSITION && transformRE.test(styles[transitionProp + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  };
}

function getTimeout(delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i]);
  }));
} // Old versions of Chromium (below 61.0.3163.100) formats floating pointer numbers
// in a locale-dependent way, using a comma instead of a dot.
// If comma is not replaced with a dot, the input will be rounded down (i.e. acting
// as a floor function) causing unexpected behaviors


function toMs(s) {
  return Number(s.slice(0, -1).replace(',', '.')) * 1000;
}
/*  */


function enter(vnode, toggleDisplay) {
  var el = vnode.elm; // call leave callback now

  if (isDef(el._leaveCb)) {
    el._leaveCb.cancelled = true;

    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);

  if (isUndef(data)) {
    return;
  }
  /* istanbul ignore if */


  if (isDef(el._enterCb) || el.nodeType !== 1) {
    return;
  }

  var css = data.css;
  var type = data.type;
  var enterClass = data.enterClass;
  var enterToClass = data.enterToClass;
  var enterActiveClass = data.enterActiveClass;
  var appearClass = data.appearClass;
  var appearToClass = data.appearToClass;
  var appearActiveClass = data.appearActiveClass;
  var beforeEnter = data.beforeEnter;
  var enter = data.enter;
  var afterEnter = data.afterEnter;
  var enterCancelled = data.enterCancelled;
  var beforeAppear = data.beforeAppear;
  var appear = data.appear;
  var afterAppear = data.afterAppear;
  var appearCancelled = data.appearCancelled;
  var duration = data.duration; // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.

  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;

  while (transitionNode && transitionNode.parent) {
    context = transitionNode.context;
    transitionNode = transitionNode.parent;
  }

  var isAppear = !context._isMounted || !vnode.isRootInsert;

  if (isAppear && !appear && appear !== '') {
    return;
  }

  var startClass = isAppear && appearClass ? appearClass : enterClass;
  var activeClass = isAppear && appearActiveClass ? appearActiveClass : enterActiveClass;
  var toClass = isAppear && appearToClass ? appearToClass : enterToClass;
  var beforeEnterHook = isAppear ? beforeAppear || beforeEnter : beforeEnter;
  var enterHook = isAppear ? typeof appear === 'function' ? appear : enter : enter;
  var afterEnterHook = isAppear ? afterAppear || afterEnter : afterEnter;
  var enterCancelledHook = isAppear ? appearCancelled || enterCancelled : enterCancelled;
  var explicitEnterDuration = toNumber(isObject(duration) ? duration.enter : duration);

  if ("development" !== 'production' && explicitEnterDuration != null) {
    checkDuration(explicitEnterDuration, 'enter', vnode);
  }

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(enterHook);
  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }

    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }

      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }

    el._enterCb = null;
  });

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode, 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];

      if (pendingNode && pendingNode.tag === vnode.tag && pendingNode.elm._leaveCb) {
        pendingNode.elm._leaveCb();
      }

      enterHook && enterHook(el, cb);
    });
  } // start enter transition


  beforeEnterHook && beforeEnterHook(el);

  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      removeTransitionClass(el, startClass);

      if (!cb.cancelled) {
        addTransitionClass(el, toClass);

        if (!userWantsControl) {
          if (isValidDuration(explicitEnterDuration)) {
            setTimeout(cb, explicitEnterDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      }
    });
  }

  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }

  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}

function leave(vnode, rm) {
  var el = vnode.elm; // call enter callback now

  if (isDef(el._enterCb)) {
    el._enterCb.cancelled = true;

    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);

  if (isUndef(data) || el.nodeType !== 1) {
    return rm();
  }
  /* istanbul ignore if */


  if (isDef(el._leaveCb)) {
    return;
  }

  var css = data.css;
  var type = data.type;
  var leaveClass = data.leaveClass;
  var leaveToClass = data.leaveToClass;
  var leaveActiveClass = data.leaveActiveClass;
  var beforeLeave = data.beforeLeave;
  var leave = data.leave;
  var afterLeave = data.afterLeave;
  var leaveCancelled = data.leaveCancelled;
  var delayLeave = data.delayLeave;
  var duration = data.duration;
  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(leave);
  var explicitLeaveDuration = toNumber(isObject(duration) ? duration.leave : duration);

  if ("development" !== 'production' && isDef(explicitLeaveDuration)) {
    checkDuration(explicitLeaveDuration, 'leave', vnode);
  }

  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }

    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }

    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }

      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }

    el._leaveCb = null;
  });

  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }

  function performLeave() {
    // the delayed leave may have already been cancelled
    if (cb.cancelled) {
      return;
    } // record leaving element


    if (!vnode.data.show && el.parentNode) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[vnode.key] = vnode;
    }

    beforeLeave && beforeLeave(el);

    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        removeTransitionClass(el, leaveClass);

        if (!cb.cancelled) {
          addTransitionClass(el, leaveToClass);

          if (!userWantsControl) {
            if (isValidDuration(explicitLeaveDuration)) {
              setTimeout(cb, explicitLeaveDuration);
            } else {
              whenTransitionEnds(el, type, cb);
            }
          }
        }
      });
    }

    leave && leave(el, cb);

    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
} // only used in dev mode


function checkDuration(val, name, vnode) {
  if (typeof val !== 'number') {
    warn("<transition> explicit " + name + " duration is not a valid number - " + "got " + JSON.stringify(val) + ".", vnode.context);
  } else if (isNaN(val)) {
    warn("<transition> explicit " + name + " duration is NaN - " + 'the duration expression might be incorrect.', vnode.context);
  }
}

function isValidDuration(val) {
  return typeof val === 'number' && !isNaN(val);
}
/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */


function getHookArgumentsLength(fn) {
  if (isUndef(fn)) {
    return false;
  }

  var invokerFns = fn.fns;

  if (isDef(invokerFns)) {
    // invoker
    return getHookArgumentsLength(Array.isArray(invokerFns) ? invokerFns[0] : invokerFns);
  } else {
    return (fn._length || fn.length) > 1;
  }
}

function _enter(_, vnode) {
  if (vnode.data.show !== true) {
    enter(vnode);
  }
}

var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove$$1(vnode, rm) {
    /* istanbul ignore else */
    if (vnode.data.show !== true) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {};
var platformModules = [attrs, klass, events, domProps, style, transition];
/*  */
// the directive module should be applied last, after all
// built-in modules have been applied.

var modules = platformModules.concat(baseModules);
var patch = createPatchFunction({
  nodeOps: nodeOps,
  modules: modules
});
/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

/* istanbul ignore if */

if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', function () {
    var el = document.activeElement;

    if (el && el.vmodel) {
      trigger(el, 'input');
    }
  });
}

var directive = {
  inserted: function inserted(el, binding, vnode, oldVnode) {
    if (vnode.tag === 'select') {
      // #6903
      if (oldVnode.elm && !oldVnode.elm._vOptions) {
        mergeVNodeHook(vnode, 'postpatch', function () {
          directive.componentUpdated(el, binding, vnode);
        });
      } else {
        setSelected(el, binding, vnode.context);
      }

      el._vOptions = [].map.call(el.options, getValue);
    } else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
      el._vModifiers = binding.modifiers;

      if (!binding.modifiers.lazy) {
        el.addEventListener('compositionstart', onCompositionStart);
        el.addEventListener('compositionend', onCompositionEnd); // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.

        el.addEventListener('change', onCompositionEnd);
        /* istanbul ignore if */

        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },
  componentUpdated: function componentUpdated(el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context); // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matching
      // option in the DOM.

      var prevOptions = el._vOptions;
      var curOptions = el._vOptions = [].map.call(el.options, getValue);

      if (curOptions.some(function (o, i) {
        return !looseEqual(o, prevOptions[i]);
      })) {
        // trigger change event if
        // no matching option found for at least one value
        var needReset = el.multiple ? binding.value.some(function (v) {
          return hasNoMatchingOption(v, curOptions);
        }) : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions);

        if (needReset) {
          trigger(el, 'change');
        }
      }
    }
  }
};

function setSelected(el, binding, vm) {
  actuallySetSelected(el, binding, vm);
  /* istanbul ignore if */

  if (isIE || isEdge) {
    setTimeout(function () {
      actuallySetSelected(el, binding, vm);
    }, 0);
  }
}

function actuallySetSelected(el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;

  if (isMultiple && !Array.isArray(value)) {
    "development" !== 'production' && warn("<select multiple v-model=\"" + binding.expression + "\"> " + "expects an Array value for its binding, but got " + Object.prototype.toString.call(value).slice(8, -1), vm);
    return;
  }

  var selected, option;

  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];

    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;

      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }

        return;
      }
    }
  }

  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}

function hasNoMatchingOption(value, options) {
  return options.every(function (o) {
    return !looseEqual(o, value);
  });
}

function getValue(option) {
  return '_value' in option ? option._value : option.value;
}

function onCompositionStart(e) {
  e.target.composing = true;
}

function onCompositionEnd(e) {
  // prevent triggering an input event for no reason
  if (!e.target.composing) {
    return;
  }

  e.target.composing = false;
  trigger(e.target, 'input');
}

function trigger(el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}
/*  */
// recursively search for possible transition defined inside the component root


function locateNode(vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition) ? locateNode(vnode.componentInstance._vnode) : vnode;
}

var show = {
  bind: function bind(el, ref, vnode) {
    var value = ref.value;
    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay = el.style.display === 'none' ? '' : el.style.display;

    if (value && transition$$1) {
      vnode.data.show = true;
      enter(vnode, function () {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : 'none';
    }
  },
  update: function update(el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;
    /* istanbul ignore if */

    if (!value === !oldValue) {
      return;
    }

    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;

    if (transition$$1) {
      vnode.data.show = true;

      if (value) {
        enter(vnode, function () {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function () {
          el.style.display = 'none';
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none';
    }
  },
  unbind: function unbind(el, binding, vnode, oldVnode, isDestroy) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
};
var platformDirectives = {
  model: directive,
  show: show
};
/*  */

var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
}; // in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered

function getRealChild(vnode) {
  var compOptions = vnode && vnode.componentOptions;

  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children));
  } else {
    return vnode;
  }
}

function extractTransitionData(comp) {
  var data = {};
  var options = comp.$options; // props

  for (var key in options.propsData) {
    data[key] = comp[key];
  } // events.
  // extract listeners and pass them directly to the transition methods


  var listeners = options._parentListeners;

  for (var key$1 in listeners) {
    data[camelize(key$1)] = listeners[key$1];
  }

  return data;
}

function placeholder(h, rawChild) {
  if (/\d-keep-alive$/.test(rawChild.tag)) {
    return h('keep-alive', {
      props: rawChild.componentOptions.propsData
    });
  }
}

function hasParentTransition(vnode) {
  while (vnode = vnode.parent) {
    if (vnode.data.transition) {
      return true;
    }
  }
}

function isSameChild(child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag;
}

var isNotTextNode = function (c) {
  return c.tag || isAsyncPlaceholder(c);
};

var isVShowDirective = function (d) {
  return d.name === 'show';
};

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,
  render: function render(h) {
    var this$1 = this;
    var children = this.$slots.default;

    if (!children) {
      return;
    } // filter out text nodes (possible whitespaces)


    children = children.filter(isNotTextNode);
    /* istanbul ignore if */

    if (!children.length) {
      return;
    } // warn multiple elements


    if ("development" !== 'production' && children.length > 1) {
      warn('<transition> can only be used on a single element. Use ' + '<transition-group> for lists.', this.$parent);
    }

    var mode = this.mode; // warn invalid mode

    if ("development" !== 'production' && mode && mode !== 'in-out' && mode !== 'out-in') {
      warn('invalid <transition> mode: ' + mode, this.$parent);
    }

    var rawChild = children[0]; // if this is a component root node and the component's
    // parent container node also has transition, skip.

    if (hasParentTransition(this.$vnode)) {
      return rawChild;
    } // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive


    var child = getRealChild(rawChild);
    /* istanbul ignore if */

    if (!child) {
      return rawChild;
    }

    if (this._leaving) {
      return placeholder(h, rawChild);
    } // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.


    var id = "__transition-" + this._uid + "-";
    child.key = child.key == null ? child.isComment ? id + 'comment' : id + child.tag : isPrimitive(child.key) ? String(child.key).indexOf(id) === 0 ? child.key : id + child.key : child.key;
    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild); // mark v-show
    // so that the transition module can hand over the control to the directive

    if (child.data.directives && child.data.directives.some(isVShowDirective)) {
      child.data.show = true;
    }

    if (oldChild && oldChild.data && !isSameChild(child, oldChild) && !isAsyncPlaceholder(oldChild) && // #6687 component root is a comment node
    !(oldChild.componentInstance && oldChild.componentInstance._vnode.isComment)) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild.data.transition = extend({}, data); // handle transition mode

      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          this$1._leaving = false;
          this$1.$forceUpdate();
        });
        return placeholder(h, rawChild);
      } else if (mode === 'in-out') {
        if (isAsyncPlaceholder(child)) {
          return oldRawChild;
        }

        var delayedLeave;

        var performLeave = function () {
          delayedLeave();
        };

        mergeVNodeHook(data, 'afterEnter', performLeave);
        mergeVNodeHook(data, 'enterCancelled', performLeave);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) {
          delayedLeave = leave;
        });
      }
    }

    return rawChild;
  }
};
/*  */

var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);
delete props.mode;
var TransitionGroup = {
  props: props,
  beforeMount: function beforeMount() {
    var this$1 = this;
    var update = this._update;

    this._update = function (vnode, hydrating) {
      var restoreActiveInstance = setActiveInstance(this$1); // force removing pass

      this$1.__patch__(this$1._vnode, this$1.kept, false, // hydrating
      true // removeOnly (!important, avoids unnecessary moves)
      );

      this$1._vnode = this$1.kept;
      restoreActiveInstance();
      update.call(this$1, vnode, hydrating);
    };
  },
  render: function render(h) {
    var tag = this.tag || this.$vnode.data.tag || 'span';
    var map = Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);

    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];

      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c);
          map[c.key] = c;
          (c.data || (c.data = {})).transition = transitionData;
        } else if ("development" !== 'production') {
          var opts = c.componentOptions;
          var name = opts ? opts.Ctor.options.name || opts.tag || '' : c.tag;
          warn("<transition-group> children must be keyed: <" + name + ">");
        }
      }
    }

    if (prevChildren) {
      var kept = [];
      var removed = [];

      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
        var c$1 = prevChildren[i$1];
        c$1.data.transition = transitionData;
        c$1.data.pos = c$1.elm.getBoundingClientRect();

        if (map[c$1.key]) {
          kept.push(c$1);
        } else {
          removed.push(c$1);
        }
      }

      this.kept = h(tag, null, kept);
      this.removed = removed;
    }

    return h(tag, null, children);
  },
  updated: function updated() {
    var children = this.prevChildren;
    var moveClass = this.moveClass || (this.name || 'v') + '-move';

    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return;
    } // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.


    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation); // force reflow to put everything in position
    // assign to this to avoid being removed in tree-shaking
    // $flow-disable-line

    this._reflow = document.body.offsetHeight;
    children.forEach(function (c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el.addEventListener(transitionEndEvent, el._moveCb = function cb(e) {
          if (e && e.target !== el) {
            return;
          }

          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent, cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        });
      }
    });
  },
  methods: {
    hasMove: function hasMove(el, moveClass) {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false;
      }
      /* istanbul ignore if */


      if (this._hasMove) {
        return this._hasMove;
      } // Detect whether an element with the move class applied has
      // CSS transitions. Since the element may be inside an entering
      // transition at this very moment, we make a clone of it and remove
      // all other transition classes applied to ensure only the move class
      // is applied.


      var clone = el.cloneNode();

      if (el._transitionClasses) {
        el._transitionClasses.forEach(function (cls) {
          removeClass(clone, cls);
        });
      }

      addClass(clone, moveClass);
      clone.style.display = 'none';
      this.$el.appendChild(clone);
      var info = getTransitionInfo(clone);
      this.$el.removeChild(clone);
      return this._hasMove = info.hasTransform;
    }
  }
};

function callPendingCbs(c) {
  /* istanbul ignore if */
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  /* istanbul ignore if */


  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}

function recordPosition(c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}

function applyTranslation(c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;

  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    s.transitionDuration = '0s';
  }
}

var platformComponents = {
  Transition: Transition,
  TransitionGroup: TransitionGroup
};
/*  */
// install platform specific utils

Vue.config.mustUseProp = mustUseProp;
Vue.config.isReservedTag = isReservedTag;
Vue.config.isReservedAttr = isReservedAttr;
Vue.config.getTagNamespace = getTagNamespace;
Vue.config.isUnknownElement = isUnknownElement; // install platform runtime directives & components

extend(Vue.options.directives, platformDirectives);
extend(Vue.options.components, platformComponents); // install platform patch function

Vue.prototype.__patch__ = inBrowser ? patch : noop; // public mount method

Vue.prototype.$mount = function (el, hydrating) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating);
}; // devtools global hook

/* istanbul ignore next */


if (inBrowser) {
  setTimeout(function () {
    if (config.devtools) {
      if (devtools) {
        devtools.emit('init', Vue);
      } else if ("development" !== 'production' && "development" !== 'test') {
        console[console.info ? 'info' : 'log']('Download the Vue Devtools extension for a better development experience:\n' + 'https://github.com/vuejs/vue-devtools');
      }
    }

    if ("development" !== 'production' && "development" !== 'test' && config.productionTip !== false && typeof console !== 'undefined') {
      console[console.info ? 'info' : 'log']("You are running Vue in development mode.\n" + "Make sure to turn on production mode when deploying for production.\n" + "See more tips at https://vuejs.org/guide/deployment.html");
    }
  }, 0);
}
/*  */


var _default = Vue;
exports.default = _default;
},{}],"../node_modules/clipboard/dist/clipboard.min.js":[function(require,module,exports) {
var define;
/*!
 * clipboard.js v2.0.4
 * https://zenorocha.github.io/clipboard.js
 * 
 * Licensed MIT © Zeno Rocha
 */
!function (t, e) {
  "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? exports.ClipboardJS = e() : t.ClipboardJS = e();
}(this, function () {
  return function (n) {
    var o = {};

    function r(t) {
      if (o[t]) return o[t].exports;
      var e = o[t] = {
        i: t,
        l: !1,
        exports: {}
      };
      return n[t].call(e.exports, e, e.exports, r), e.l = !0, e.exports;
    }

    return r.m = n, r.c = o, r.d = function (t, e, n) {
      r.o(t, e) || Object.defineProperty(t, e, {
        enumerable: !0,
        get: n
      });
    }, r.r = function (t) {
      "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
        value: "Module"
      }), Object.defineProperty(t, "__esModule", {
        value: !0
      });
    }, r.t = function (e, t) {
      if (1 & t && (e = r(e)), 8 & t) return e;
      if (4 & t && "object" == typeof e && e && e.__esModule) return e;
      var n = Object.create(null);
      if (r.r(n), Object.defineProperty(n, "default", {
        enumerable: !0,
        value: e
      }), 2 & t && "string" != typeof e) for (var o in e) r.d(n, o, function (t) {
        return e[t];
      }.bind(null, o));
      return n;
    }, r.n = function (t) {
      var e = t && t.__esModule ? function () {
        return t.default;
      } : function () {
        return t;
      };
      return r.d(e, "a", e), e;
    }, r.o = function (t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }, r.p = "", r(r.s = 0);
  }([function (t, e, n) {
    "use strict";

    var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
      return typeof t;
    } : function (t) {
      return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
    },
        i = function () {
      function o(t, e) {
        for (var n = 0; n < e.length; n++) {
          var o = e[n];
          o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o);
        }
      }

      return function (t, e, n) {
        return e && o(t.prototype, e), n && o(t, n), t;
      };
    }(),
        a = o(n(1)),
        c = o(n(3)),
        u = o(n(4));

    function o(t) {
      return t && t.__esModule ? t : {
        default: t
      };
    }

    var l = function (t) {
      function o(t, e) {
        !function (t, e) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }(this, o);

        var n = function (t, e) {
          if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return !e || "object" != typeof e && "function" != typeof e ? t : e;
        }(this, (o.__proto__ || Object.getPrototypeOf(o)).call(this));

        return n.resolveOptions(e), n.listenClick(t), n;
      }

      return function (t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
          constructor: {
            value: t,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
      }(o, c.default), i(o, [{
        key: "resolveOptions",
        value: function () {
          var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
          this.action = "function" == typeof t.action ? t.action : this.defaultAction, this.target = "function" == typeof t.target ? t.target : this.defaultTarget, this.text = "function" == typeof t.text ? t.text : this.defaultText, this.container = "object" === r(t.container) ? t.container : document.body;
        }
      }, {
        key: "listenClick",
        value: function (t) {
          var e = this;
          this.listener = (0, u.default)(t, "click", function (t) {
            return e.onClick(t);
          });
        }
      }, {
        key: "onClick",
        value: function (t) {
          var e = t.delegateTarget || t.currentTarget;
          this.clipboardAction && (this.clipboardAction = null), this.clipboardAction = new a.default({
            action: this.action(e),
            target: this.target(e),
            text: this.text(e),
            container: this.container,
            trigger: e,
            emitter: this
          });
        }
      }, {
        key: "defaultAction",
        value: function (t) {
          return s("action", t);
        }
      }, {
        key: "defaultTarget",
        value: function (t) {
          var e = s("target", t);
          if (e) return document.querySelector(e);
        }
      }, {
        key: "defaultText",
        value: function (t) {
          return s("text", t);
        }
      }, {
        key: "destroy",
        value: function () {
          this.listener.destroy(), this.clipboardAction && (this.clipboardAction.destroy(), this.clipboardAction = null);
        }
      }], [{
        key: "isSupported",
        value: function () {
          var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : ["copy", "cut"],
              e = "string" == typeof t ? [t] : t,
              n = !!document.queryCommandSupported;
          return e.forEach(function (t) {
            n = n && !!document.queryCommandSupported(t);
          }), n;
        }
      }]), o;
    }();

    function s(t, e) {
      var n = "data-clipboard-" + t;
      if (e.hasAttribute(n)) return e.getAttribute(n);
    }

    t.exports = l;
  }, function (t, e, n) {
    "use strict";

    var o,
        r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
      return typeof t;
    } : function (t) {
      return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
    },
        i = function () {
      function o(t, e) {
        for (var n = 0; n < e.length; n++) {
          var o = e[n];
          o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o);
        }
      }

      return function (t, e, n) {
        return e && o(t.prototype, e), n && o(t, n), t;
      };
    }(),
        a = n(2),
        c = (o = a) && o.__esModule ? o : {
      default: o
    };

    var u = function () {
      function e(t) {
        !function (t, e) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }(this, e), this.resolveOptions(t), this.initSelection();
      }

      return i(e, [{
        key: "resolveOptions",
        value: function () {
          var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
          this.action = t.action, this.container = t.container, this.emitter = t.emitter, this.target = t.target, this.text = t.text, this.trigger = t.trigger, this.selectedText = "";
        }
      }, {
        key: "initSelection",
        value: function () {
          this.text ? this.selectFake() : this.target && this.selectTarget();
        }
      }, {
        key: "selectFake",
        value: function () {
          var t = this,
              e = "rtl" == document.documentElement.getAttribute("dir");
          this.removeFake(), this.fakeHandlerCallback = function () {
            return t.removeFake();
          }, this.fakeHandler = this.container.addEventListener("click", this.fakeHandlerCallback) || !0, this.fakeElem = document.createElement("textarea"), this.fakeElem.style.fontSize = "12pt", this.fakeElem.style.border = "0", this.fakeElem.style.padding = "0", this.fakeElem.style.margin = "0", this.fakeElem.style.position = "absolute", this.fakeElem.style[e ? "right" : "left"] = "-9999px";
          var n = window.pageYOffset || document.documentElement.scrollTop;
          this.fakeElem.style.top = n + "px", this.fakeElem.setAttribute("readonly", ""), this.fakeElem.value = this.text, this.container.appendChild(this.fakeElem), this.selectedText = (0, c.default)(this.fakeElem), this.copyText();
        }
      }, {
        key: "removeFake",
        value: function () {
          this.fakeHandler && (this.container.removeEventListener("click", this.fakeHandlerCallback), this.fakeHandler = null, this.fakeHandlerCallback = null), this.fakeElem && (this.container.removeChild(this.fakeElem), this.fakeElem = null);
        }
      }, {
        key: "selectTarget",
        value: function () {
          this.selectedText = (0, c.default)(this.target), this.copyText();
        }
      }, {
        key: "copyText",
        value: function () {
          var e = void 0;

          try {
            e = document.execCommand(this.action);
          } catch (t) {
            e = !1;
          }

          this.handleResult(e);
        }
      }, {
        key: "handleResult",
        value: function (t) {
          this.emitter.emit(t ? "success" : "error", {
            action: this.action,
            text: this.selectedText,
            trigger: this.trigger,
            clearSelection: this.clearSelection.bind(this)
          });
        }
      }, {
        key: "clearSelection",
        value: function () {
          this.trigger && this.trigger.focus(), window.getSelection().removeAllRanges();
        }
      }, {
        key: "destroy",
        value: function () {
          this.removeFake();
        }
      }, {
        key: "action",
        set: function () {
          var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "copy";
          if (this._action = t, "copy" !== this._action && "cut" !== this._action) throw new Error('Invalid "action" value, use either "copy" or "cut"');
        },
        get: function () {
          return this._action;
        }
      }, {
        key: "target",
        set: function (t) {
          if (void 0 !== t) {
            if (!t || "object" !== (void 0 === t ? "undefined" : r(t)) || 1 !== t.nodeType) throw new Error('Invalid "target" value, use a valid Element');
            if ("copy" === this.action && t.hasAttribute("disabled")) throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
            if ("cut" === this.action && (t.hasAttribute("readonly") || t.hasAttribute("disabled"))) throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');
            this._target = t;
          }
        },
        get: function () {
          return this._target;
        }
      }]), e;
    }();

    t.exports = u;
  }, function (t, e) {
    t.exports = function (t) {
      var e;
      if ("SELECT" === t.nodeName) t.focus(), e = t.value;else if ("INPUT" === t.nodeName || "TEXTAREA" === t.nodeName) {
        var n = t.hasAttribute("readonly");
        n || t.setAttribute("readonly", ""), t.select(), t.setSelectionRange(0, t.value.length), n || t.removeAttribute("readonly"), e = t.value;
      } else {
        t.hasAttribute("contenteditable") && t.focus();
        var o = window.getSelection(),
            r = document.createRange();
        r.selectNodeContents(t), o.removeAllRanges(), o.addRange(r), e = o.toString();
      }
      return e;
    };
  }, function (t, e) {
    function n() {}

    n.prototype = {
      on: function (t, e, n) {
        var o = this.e || (this.e = {});
        return (o[t] || (o[t] = [])).push({
          fn: e,
          ctx: n
        }), this;
      },
      once: function (t, e, n) {
        var o = this;

        function r() {
          o.off(t, r), e.apply(n, arguments);
        }

        return r._ = e, this.on(t, r, n);
      },
      emit: function (t) {
        for (var e = [].slice.call(arguments, 1), n = ((this.e || (this.e = {}))[t] || []).slice(), o = 0, r = n.length; o < r; o++) n[o].fn.apply(n[o].ctx, e);

        return this;
      },
      off: function (t, e) {
        var n = this.e || (this.e = {}),
            o = n[t],
            r = [];
        if (o && e) for (var i = 0, a = o.length; i < a; i++) o[i].fn !== e && o[i].fn._ !== e && r.push(o[i]);
        return r.length ? n[t] = r : delete n[t], this;
      }
    }, t.exports = n;
  }, function (t, e, n) {
    var d = n(5),
        h = n(6);

    t.exports = function (t, e, n) {
      if (!t && !e && !n) throw new Error("Missing required arguments");
      if (!d.string(e)) throw new TypeError("Second argument must be a String");
      if (!d.fn(n)) throw new TypeError("Third argument must be a Function");
      if (d.node(t)) return s = e, f = n, (l = t).addEventListener(s, f), {
        destroy: function () {
          l.removeEventListener(s, f);
        }
      };
      if (d.nodeList(t)) return a = t, c = e, u = n, Array.prototype.forEach.call(a, function (t) {
        t.addEventListener(c, u);
      }), {
        destroy: function () {
          Array.prototype.forEach.call(a, function (t) {
            t.removeEventListener(c, u);
          });
        }
      };
      if (d.string(t)) return o = t, r = e, i = n, h(document.body, o, r, i);
      throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList");
      var o, r, i, a, c, u, l, s, f;
    };
  }, function (t, n) {
    n.node = function (t) {
      return void 0 !== t && t instanceof HTMLElement && 1 === t.nodeType;
    }, n.nodeList = function (t) {
      var e = Object.prototype.toString.call(t);
      return void 0 !== t && ("[object NodeList]" === e || "[object HTMLCollection]" === e) && "length" in t && (0 === t.length || n.node(t[0]));
    }, n.string = function (t) {
      return "string" == typeof t || t instanceof String;
    }, n.fn = function (t) {
      return "[object Function]" === Object.prototype.toString.call(t);
    };
  }, function (t, e, n) {
    var a = n(7);

    function i(t, e, n, o, r) {
      var i = function (e, n, t, o) {
        return function (t) {
          t.delegateTarget = a(t.target, n), t.delegateTarget && o.call(e, t);
        };
      }.apply(this, arguments);

      return t.addEventListener(n, i, r), {
        destroy: function () {
          t.removeEventListener(n, i, r);
        }
      };
    }

    t.exports = function (t, e, n, o, r) {
      return "function" == typeof t.addEventListener ? i.apply(null, arguments) : "function" == typeof n ? i.bind(null, document).apply(null, arguments) : ("string" == typeof t && (t = document.querySelectorAll(t)), Array.prototype.map.call(t, function (t) {
        return i(t, e, n, o, r);
      }));
    };
  }, function (t, e) {
    if ("undefined" != typeof Element && !Element.prototype.matches) {
      var n = Element.prototype;
      n.matches = n.matchesSelector || n.mozMatchesSelector || n.msMatchesSelector || n.oMatchesSelector || n.webkitMatchesSelector;
    }

    t.exports = function (t, e) {
      for (; t && 9 !== t.nodeType;) {
        if ("function" == typeof t.matches && t.matches(e)) return t;
        t = t.parentNode;
      }
    };
  }]);
});
},{}],"../node_modules/vue-clipboard2/vue-clipboard.js":[function(require,module,exports) {
var define;
var Clipboard = require('clipboard/dist/clipboard.min.js') // FIXME: workaround for browserify

var VueClipboardConfig = {
  autoSetContainer: false,
  appendToBody: true // This fixes IE, see #50
}

var VueClipboard = {
  install: function (Vue) {
    Vue.prototype.$clipboardConfig = VueClipboardConfig
    Vue.prototype.$copyText = function (text, container) {
      return new Promise(function (resolve, reject) {
        var fakeElement = document.createElement('button')
        var clipboard = new Clipboard(fakeElement, {
          text: function () { return text },
          action: function () { return 'copy' },
          container: typeof container === 'object' ? container : document.body
        })
        clipboard.on('success', function (e) {
          clipboard.destroy()
          resolve(e)
        })
        clipboard.on('error', function (e) {
          clipboard.destroy()
          reject(e)
        })
        if (VueClipboardConfig.appendToBody) document.body.appendChild(fakeElement)
        fakeElement.click()
        if (VueClipboardConfig.appendToBody) document.body.removeChild(fakeElement)
      })
    }

    Vue.directive('clipboard', {
      bind: function (el, binding, vnode) {
        if (binding.arg === 'success') {
          el._vClipboard_success = binding.value
        } else if (binding.arg === 'error') {
          el._vClipboard_error = binding.value
        } else {
          var clipboard = new Clipboard(el, {
            text: function () { return binding.value },
            action: function () { return binding.arg === 'cut' ? 'cut' : 'copy' },
            container: VueClipboardConfig.autoSetContainer ? el : undefined
          })
          clipboard.on('success', function (e) {
            var callback = el._vClipboard_success
            callback && callback(e)
          })
          clipboard.on('error', function (e) {
            var callback = el._vClipboard_error
            callback && callback(e)
          })
          el._vClipboard = clipboard
        }
      },
      update: function (el, binding) {
        if (binding.arg === 'success') {
          el._vClipboard_success = binding.value
        } else if (binding.arg === 'error') {
          el._vClipboard_error = binding.value
        } else {
          el._vClipboard.text = function () { return binding.value }
          el._vClipboard.action = function () { return binding.arg === 'cut' ? 'cut' : 'copy' }
        }
      },
      unbind: function (el, binding) {
        if (binding.arg === 'success') {
          delete el._vClipboard_success
        } else if (binding.arg === 'error') {
          delete el._vClipboard_error
        } else {
          el._vClipboard.destroy()
          delete el._vClipboard
        }
      }
    })
  },
  config: VueClipboardConfig
}

if (typeof exports === 'object') {
  module.exports = VueClipboard
} else if (typeof define === 'function' && define.amd) {
  define([], function () {
    return VueClipboard
  })
}

},{"clipboard/dist/clipboard.min.js":"../node_modules/clipboard/dist/clipboard.min.js"}],"../node_modules/vue-material/dist/components/index.js":[function(require,module,exports) {
var define;
/*!
 * vue-material v1.0.0-beta-10.2
 * Made with <3 by marcosmoura 2019
 * Released under the MIT License.
 */
!function (e, t) {
  var n, i;
  if ("object" == typeof exports && "object" == typeof module) module.exports = t(require("vue"));else if ("function" == typeof define && define.amd) define(["vue"], t);else {
    n = t("object" == typeof exports ? require("vue") : e.Vue);

    for (i in n) ("object" == typeof exports ? exports : e)[i] = n[i];
  }
}("undefined" != typeof self ? self : this, function (e) {
  return function (e) {
    function t(i) {
      if (n[i]) return n[i].exports;
      var r = n[i] = {
        i: i,
        l: !1,
        exports: {}
      };
      return e[i].call(r.exports, r, r.exports, t), r.l = !0, r.exports;
    }

    var n = {};
    return t.m = e, t.c = n, t.d = function (e, n, i) {
      t.o(e, n) || Object.defineProperty(e, n, {
        configurable: !1,
        enumerable: !0,
        get: i
      });
    }, t.n = function (e) {
      var n = e && e.__esModule ? function () {
        return e.default;
      } : function () {
        return e;
      };
      return t.d(n, "a", n), n;
    }, t.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }, t.p = "", t(t.s = 504);
  }([function (e, t) {
    e.exports = function (e, t, n, i, r, a) {
      var o,
          s,
          u,
          l,
          d,
          c = e = e || {},
          f = typeof e.default;
      return "object" !== f && "function" !== f || (o = e, c = e.default), s = "function" == typeof c ? c.options : c, t && (s.render = t.render, s.staticRenderFns = t.staticRenderFns, s._compiled = !0), n && (s.functional = !0), r && (s._scopeId = r), a ? (u = function (e) {
        e = e || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, e || "undefined" == typeof __VUE_SSR_CONTEXT__ || (e = __VUE_SSR_CONTEXT__), i && i.call(this, e), e && e._registeredComponents && e._registeredComponents.add(a);
      }, s._ssrRegister = u) : i && (u = i), u && (l = s.functional, d = l ? s.render : s.beforeCreate, l ? (s._injectStyles = u, s.render = function (e, t) {
        return u.call(t), d(e, t);
      }) : s.beforeCreate = d ? [].concat(d, u) : [u]), {
        esModule: o,
        exports: c,
        options: s
      };
    };
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    var r, a, o, s;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = function (e) {
      var t = {
        props: {
          mdTheme: null
        },
        computed: {
          $mdActiveTheme: function () {
            var e = a.default.enabled,
                t = a.default.getThemeName,
                n = a.default.getAncestorTheme;
            return e && !1 !== this.mdTheme ? t(this.mdTheme || n(this)) : null;
          }
        }
      };
      return (0, s.default)(t, e);
    }, r = n(4), a = i(r), o = n(6), s = i(o);
  }, function (t, n) {
    t.exports = e;
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    var r, a, o, s, u;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), n(7), r = n(5), a = i(r), o = n(4), s = i(o), u = function () {
      var e = new a.default({
        ripple: !0,
        theming: {},
        locale: {
          startYear: 1900,
          endYear: 2099,
          dateFormat: "yyyy-MM-dd",
          days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          shorterDays: ["S", "M", "T", "W", "T", "F", "S"],
          months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
          shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
          shorterMonths: ["J", "F", "M", "A", "M", "Ju", "Ju", "A", "Se", "O", "N", "D"],
          firstDayOfAWeek: 0
        },
        router: {
          linkActiveClass: "router-link-active"
        }
      });
      return Object.defineProperties(e.theming, {
        metaColors: {
          get: function () {
            return s.default.metaColors;
          },
          set: function (e) {
            s.default.metaColors = e;
          }
        },
        theme: {
          get: function () {
            return s.default.theme;
          },
          set: function (e) {
            s.default.theme = e;
          }
        },
        enabled: {
          get: function () {
            return s.default.enabled;
          },
          set: function (e) {
            s.default.enabled = e;
          }
        }
      }), e;
    }, t.default = function (e) {
      e.material || (e.material = u(), e.prototype.$material = e.material);
    };
  }, function (e, t, n) {
    "use strict";

    var i, r, a, o, s;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), i = n(2), r = function (e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }(i), a = null, o = null, s = null, t.default = new r.default({
      data: function () {
        return {
          prefix: "md-theme-",
          theme: "default",
          enabled: !0,
          metaColors: !1
        };
      },
      computed: {
        themeTarget: function () {
          return !this.$isServer && document.documentElement;
        },
        fullThemeName: function () {
          return this.getThemeName();
        }
      },
      watch: {
        enabled: {
          immediate: !0,
          handler: function () {
            var e = this.fullThemeName,
                t = this.themeTarget,
                n = this.enabled;
            t && (n ? (t.classList.add(e), this.metaColors && this.setHtmlMetaColors(e)) : (t.classList.remove(e), this.metaColors && this.setHtmlMetaColors()));
          }
        },
        theme: function (e, t) {
          var n = this.getThemeName,
              i = this.themeTarget;
          e = n(e), i.classList.remove(n(t)), i.classList.add(e), this.metaColors && this.setHtmlMetaColors(e);
        },
        metaColors: function (e) {
          e ? this.setHtmlMetaColors(this.fullThemeName) : this.setHtmlMetaColors();
        }
      },
      methods: {
        getAncestorTheme: function (e) {
          var t,
              n = this;
          return e ? (t = e.mdTheme, function e(i) {
            if (i) {
              var r = i.mdTheme,
                  a = i.$parent;
              return r && r !== t ? r : e(a);
            }

            return n.theme;
          }(e.$parent)) : null;
        },
        getThemeName: function (e) {
          var t = e || this.theme;
          return this.prefix + t;
        },
        setMicrosoftColors: function (e) {
          a && a.setAttribute("content", e);
        },
        setThemeColors: function (e) {
          o && o.setAttribute("content", e);
        },
        setMaskColors: function (e) {
          s && s.setAttribute("color", e);
        },
        setHtmlMetaColors: function (e) {
          var t,
              n = "#fff";
          e && (t = window.getComputedStyle(document.documentElement), n = t.getPropertyValue("--" + e + "-primary")), n && (this.setMicrosoftColors(n), this.setThemeColors(n), this.setMaskColors(n));
        }
      },
      mounted: function () {
        var e = this;
        a = document.querySelector('[name="msapplication-TileColor"]'), o = document.querySelector('[name="theme-color"]'), s = document.querySelector('[rel="mask-icon"]'), this.enabled && this.metaColors && window.addEventListener("load", function () {
          e.setHtmlMetaColors(e.fullThemeName);
        });
      }
    });
  }, function (e, t, n) {
    "use strict";

    var i, r;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = function (e) {
      var t = {};
      return r.default.util.defineReactive(t, "reactive", e), t.reactive;
    }, i = n(2), r = function (e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }(i);
  }, function (e, t, n) {
    !function (t, n) {
      e.exports = n();
    }(0, function () {
      "use strict";

      function e(e) {
        return !!e && "object" == typeof e;
      }

      function t(e) {
        var t = Object.prototype.toString.call(e);
        return "[object RegExp]" === t || "[object Date]" === t || n(e);
      }

      function n(e) {
        return e.$$typeof === c;
      }

      function i(e) {
        return Array.isArray(e) ? [] : {};
      }

      function r(e, t) {
        return !1 !== t.clone && t.isMergeableObject(e) ? u(i(e), e, t) : e;
      }

      function a(e, t, n) {
        return e.concat(t).map(function (e) {
          return r(e, n);
        });
      }

      function o(e, t) {
        if (!t.customMerge) return u;
        var n = t.customMerge(e);
        return "function" == typeof n ? n : u;
      }

      function s(e, t, n) {
        var i = {};
        return n.isMergeableObject(e) && Object.keys(e).forEach(function (t) {
          i[t] = r(e[t], n);
        }), Object.keys(t).forEach(function (a) {
          n.isMergeableObject(t[a]) && e[a] ? i[a] = o(a, n)(e[a], t[a], n) : i[a] = r(t[a], n);
        }), i;
      }

      function u(e, t, n) {
        var i, o, u;
        return n = n || {}, n.arrayMerge = n.arrayMerge || a, n.isMergeableObject = n.isMergeableObject || l, i = Array.isArray(t), o = Array.isArray(e), u = i === o, u ? i ? n.arrayMerge(e, t, n) : s(e, t, n) : r(t, n);
      }

      var l = function (n) {
        return e(n) && !t(n);
      },
          d = "function" == typeof Symbol && Symbol.for,
          c = d ? Symbol.for("react.element") : 60103;

      return u.all = function (e, t) {
        if (!Array.isArray(e)) throw Error("first argument should be an array");
        return e.reduce(function (e, n) {
          return u(e, n, t);
        }, {});
      }, u;
    });
  }, function (e, t) {}, function (e, t, n) {
    "use strict";

    var i, r;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), i = n(2), r = function (e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }(i), t.default = function (e, t) {
      return {
        validator: function (n) {
          return !!t.includes(n) || (r.default.util.warn("The " + e + " prop is invalid. Given value: " + n + ". Available options: " + t.join(", ") + ".", void 0), !1);
        }
      };
    };
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      if (arguments.length < 1) throw new TypeError("1 argument required, but only " + arguments.length + " present");
      var t = Object.prototype.toString.call(e);
      return e instanceof Date || "object" == typeof e && "[object Date]" === t ? new Date(e.getTime()) : "number" == typeof e || "[object Number]" === t ? new Date(e) : ("string" != typeof e && "[object String]" !== t || "undefined" == typeof console || (console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as arguments. Please use `parseISO` to parse strings. See: https://git.io/fpAk2"), console.warn(Error().stack)), new Date(NaN));
    }

    t.a = i;
  }, function (e, t, n) {
    (function (t) {
      var i,
          r,
          a,
          o,
          s,
          u = n(14),
          l = "undefined" == typeof window ? t : window,
          d = ["moz", "webkit"],
          c = "AnimationFrame",
          f = l["request" + c],
          h = l["cancel" + c] || l["cancelRequest" + c];

      for (i = 0; !f && i < d.length; i++) f = l[d[i] + "Request" + c], h = l[d[i] + "Cancel" + c] || l[d[i] + "CancelRequest" + c];

      f && h || (r = 0, a = 0, o = [], s = 1e3 / 60, f = function (e) {
        if (0 === o.length) {
          var t = u(),
              n = Math.max(0, s - (t - r));
          r = n + t, setTimeout(function () {
            var e,
                t = o.slice(0);

            for (o.length = 0, e = 0; e < t.length; e++) if (!t[e].cancelled) try {
              t[e].callback(r);
            } catch (e) {
              setTimeout(function () {
                throw e;
              }, 0);
            }
          }, Math.round(n));
        }

        return o.push({
          handle: ++a,
          callback: e,
          cancelled: !1
        }), a;
      }, h = function (e) {
        for (var t = 0; t < o.length; t++) o[t].handle === e && (o[t].cancelled = !0);
      }), e.exports = function (e) {
        return f.call(l, e);
      }, e.exports.cancel = function () {
        h.apply(l, arguments);
      }, e.exports.polyfill = function (e) {
        e || (e = l), e.requestAnimationFrame = f, e.cancelAnimationFrame = h;
      };
    }).call(t, n(12));
  }, function (e, t, n) {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: !0
    });

    var i = function () {
      return Math.random().toString(36).slice(4);
    };

    t.default = i;
  }, function (e, t) {
    var n;

    n = function () {
      return this;
    }();

    try {
      n = n || Function("return this")() || (0, eval)("this");
    } catch (e) {
      "object" == typeof window && (n = window);
    }

    e.exports = n;
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      n(33);
    }

    var r, a, o, s, u, l, d, c, f, h;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(20), a = n.n(r);

    for (o in r) "default" !== o && function (e) {
      n.d(t, e, function () {
        return r[e];
      });
    }(o);

    s = n(37), u = n(0), l = !1, d = i, c = null, f = null, h = u(a.a, s.a, l, d, c, f), t.default = h.exports;
  }, function (e, t, n) {
    (function (t) {
      (function () {
        var n, i, r, a, o, s;
        "undefined" != typeof performance && null !== performance && performance.now ? e.exports = function () {
          return performance.now();
        } : void 0 !== t && null !== t && t.hrtime ? (e.exports = function () {
          return (n() - o) / 1e6;
        }, i = t.hrtime, n = function () {
          var e;
          return e = i(), 1e9 * e[0] + e[1];
        }, a = n(), s = 1e9 * t.uptime(), o = a - s) : Date.now ? (e.exports = function () {
          return Date.now() - r;
        }, r = Date.now()) : (e.exports = function () {
          return new Date().getTime() - r;
        }, r = new Date().getTime());
      }).call(this);
    }).call(t, n(15));
  }, function (e, t) {
    function n() {
      throw Error("setTimeout has not been defined");
    }

    function i() {
      throw Error("clearTimeout has not been defined");
    }

    function r(e) {
      if (d === setTimeout) return setTimeout(e, 0);
      if ((d === n || !d) && setTimeout) return d = setTimeout, setTimeout(e, 0);

      try {
        return d(e, 0);
      } catch (t) {
        try {
          return d.call(null, e, 0);
        } catch (t) {
          return d.call(this, e, 0);
        }
      }
    }

    function a(e) {
      if (c === clearTimeout) return clearTimeout(e);
      if ((c === i || !c) && clearTimeout) return c = clearTimeout, clearTimeout(e);

      try {
        return c(e);
      } catch (t) {
        try {
          return c.call(null, e);
        } catch (t) {
          return c.call(this, e);
        }
      }
    }

    function o() {
      h && m && (h = !1, m.length ? f = m.concat(f) : p = -1, f.length && s());
    }

    function s() {
      var e, t;

      if (!h) {
        for (e = r(o), h = !0, t = f.length; t;) {
          for (m = f, f = []; ++p < t;) m && m[p].run();

          p = -1, t = f.length;
        }

        m = null, h = !1, a(e);
      }
    }

    function u(e, t) {
      this.fun = e, this.array = t;
    }

    function l() {}

    var d,
        c,
        f,
        h,
        m,
        p,
        v = e.exports = {};
    !function () {
      try {
        d = "function" == typeof setTimeout ? setTimeout : n;
      } catch (e) {
        d = n;
      }

      try {
        c = "function" == typeof clearTimeout ? clearTimeout : i;
      } catch (e) {
        c = i;
      }
    }(), f = [], h = !1, p = -1, v.nextTick = function (e) {
      var t,
          n = Array(arguments.length - 1);
      if (arguments.length > 1) for (t = 1; t < arguments.length; t++) n[t - 1] = arguments[t];
      f.push(new u(e, n)), 1 !== f.length || h || r(s);
    }, u.prototype.run = function () {
      this.fun.apply(null, this.array);
    }, v.title = "browser", v.browser = !0, v.env = {}, v.argv = [], v.version = "", v.versions = {}, v.on = l, v.addListener = l, v.once = l, v.off = l, v.removeListener = l, v.removeAllListeners = l, v.emit = l, v.prependListener = l, v.prependOnceListener = l, v.listeners = function (e) {
      return [];
    }, v.binding = function (e) {
      throw Error("process.binding is not supported");
    }, v.cwd = function () {
      return "/";
    }, v.chdir = function (e) {
      throw Error("process.chdir is not supported");
    }, v.umask = function () {
      return 0;
    };
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      n(23);
    }

    var r, a, o, s, u, l, d, c, f, h;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(18), a = n.n(r);

    for (o in r) "default" !== o && function (e) {
      n.d(t, e, function () {
        return r[e];
      });
    }(o);

    s = n(26), u = n(0), l = !1, d = i, c = null, f = null, h = u(a.a, s.a, l, d, c, f), t.default = h.exports;
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      if (null === e || !0 === e || !1 === e) return NaN;
      var t = +e;
      return isNaN(t) ? t : t < 0 ? Math.ceil(t) : Math.floor(t);
    }

    t.a = i;
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    var r, a, o, s, u, l, d, c, f;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = Object.assign || function (e) {
      var t, n, i;

      for (t = 1; t < arguments.length; t++) {
        n = arguments[t];

        for (i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i]);
      }

      return e;
    }, a = n(10), o = i(a), s = n(1), u = i(s), l = n(11), d = i(l), c = n(22), f = i(c), t.default = new u.default({
      name: "MdRipple",
      components: {
        MdWave: f.default
      },
      props: {
        mdActive: null,
        mdDisabled: Boolean,
        mdCentered: Boolean,
        mdEventTrigger: {
          type: Boolean,
          default: !0
        }
      },
      data: function () {
        return {
          ripples: [],
          touchTimeout: null,
          eventType: null
        };
      },
      computed: {
        isDisabled: function () {
          return !this.$material.ripple || this.mdDisabled;
        },
        rippleClasses: function () {
          return {
            "md-disabled": this.isDisabled
          };
        },
        waveClasses: function () {
          return {
            "md-centered": this.mdCentered
          };
        }
      },
      watch: {
        mdActive: function (e) {
          var t = "boolean" == typeof e,
              n = "mouseevent" === ("" + e.constructor).match(/function (\w*)/)[1].toLowerCase();
          t && this.mdCentered && e ? this.startRipple({
            type: "mousedown"
          }) : n && this.startRipple(e), this.$emit("update:mdActive", !1);
        }
      },
      methods: {
        touchMoveCheck: function () {
          window.clearTimeout(this.touchTimeout);
        },
        touchStartCheck: function (e) {
          var t = this;
          this.touchTimeout = window.setTimeout(function () {
            t.startRipple(e);
          }, 100);
        },
        startRipple: function (e) {
          var t = this;
          (0, o.default)(function () {
            var n,
                i,
                r = t.eventType,
                a = t.isDisabled,
                o = t.mdCentered;
            a || r && r !== e.type || (n = t.getSize(), i = null, i = o ? t.getCenteredPosition(n) : t.getHitPosition(e, n), t.eventType = e.type, t.ripples.push({
              waveStyles: t.applyStyles(i, n),
              uuid: (0, d.default)()
            }));
          });
        },
        applyStyles: function (e, t) {
          return t += "px", r({}, e, {
            width: t,
            height: t
          });
        },
        clearWave: function (e) {
          this.ripples = e ? this.ripples.filter(function (t) {
            return t.uuid !== e;
          }) : [];
        },
        getSize: function () {
          var e = this.$el,
              t = e.offsetWidth,
              n = e.offsetHeight;
          return Math.round(Math.max(t, n));
        },
        getCenteredPosition: function (e) {
          var t = -e / 2 + "px";
          return {
            "margin-top": t,
            "margin-left": t
          };
        },
        getHitPosition: function (e, t) {
          var n = this.$el.getBoundingClientRect(),
              i = e.pageY,
              r = e.pageX;
          return "touchstart" === e.type && (i = e.changedTouches[0].pageY, r = e.changedTouches[0].pageX), {
            top: i - n.top - t / 2 - document.documentElement.scrollTop + "px",
            left: r - n.left - t / 2 - document.documentElement.scrollLeft + "px"
          };
        }
      }
    });
  }, function (e, t, n) {
    "use strict";

    var i, r;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), i = n(1), r = function (e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }(i), t.default = new r.default({
      name: "MdWave",
      data: function () {
        return {
          animating: !1
        };
      },
      props: {
        waveClasses: null,
        waveStyles: null
      },
      mounted: function () {
        this.animating = !0;
      },
      methods: {
        end: function () {
          this.animating = !1, this.$emit("md-end");
        }
      }
    });
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    var r, a, o, s;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(1), a = i(r), o = n(34), s = i(o), t.default = new a.default({
      name: "MdIcon",
      components: {
        MdSvgLoader: s.default
      },
      props: {
        mdSrc: String
      }
    });
  }, function (e, t, n) {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var i = {};
    t.default = {
      name: "MdSVGLoader",
      props: {
        mdSrc: {
          type: String,
          required: !0
        }
      },
      data: function () {
        return {
          html: null,
          error: null
        };
      },
      watch: {
        mdSrc: function () {
          this.html = null, this.loadSVG();
        }
      },
      methods: {
        isSVG: function (e) {
          return "string" == typeof e && e.indexOf("svg") >= 0;
        },
        setHtml: function (e) {
          var t = this;
          i[this.mdSrc].then(function (e) {
            return t.html = e, t.$nextTick();
          }).then(function () {
            return t.$emit("md-loaded");
          });
        },
        unexpectedError: function (e) {
          this.error = "Something bad happened trying to fetch " + this.mdSrc + ".", e(this.error);
        },
        loadSVG: function () {
          var e = this;
          i.hasOwnProperty(this.mdSrc) ? this.setHtml() : i[this.mdSrc] = new Promise(function (t, n) {
            var i = new window.XMLHttpRequest();
            i.open("GET", e.mdSrc, !0), i.onload = function () {
              var r = i.getResponseHeader("content-type");
              200 === i.status ? e.isSVG(r) ? (t(i.response), e.setHtml()) : (e.error = "The file " + e.mdSrc + " is not a valid SVG.", n(e.error)) : i.status >= 400 && i.status < 500 ? (e.error = "The file " + e.mdSrc + " do not exists.", n(e.error)) : e.unexpectedError(n);
            }, i.onerror = function () {
              return e.unexpectedError(n);
            }, i.onabort = function () {
              return e.unexpectedError(n);
            }, i.send();
          });
        }
      },
      mounted: function () {
        this.loadSVG();
      }
    };
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      n(24);
    }

    var r, a, o, s, u, l, d, c, f, h;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(19), a = n.n(r);

    for (o in r) "default" !== o && function (e) {
      n.d(t, e, function () {
        return r[e];
      });
    }(o);

    s = n(25), u = n(0), l = !1, d = i, c = null, f = null, h = u(a.a, s.a, l, d, c, f), t.default = h.exports;
  }, function (e, t) {}, function (e, t) {}, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement,
          n = e._self._c || t;
      return n("transition", {
        attrs: {
          name: "md-ripple",
          appear: ""
        },
        on: {
          "after-enter": e.end
        }
      }, [e.animating ? n("span") : e._e()]);
    },
        r = [],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement,
          n = e._self._c || t;
      return n("div", {
        class: ["md-ripple", e.rippleClasses],
        on: {
          "&touchstart": function (t) {
            return function (t) {
              return e.mdEventTrigger && e.touchStartCheck(t);
            }(t);
          },
          "&touchmove": function (t) {
            return function (t) {
              return e.mdEventTrigger && e.touchMoveCheck(t);
            }(t);
          },
          "&mousedown": function (t) {
            return function (t) {
              return e.mdEventTrigger && e.startRipple(t);
            }(t);
          }
        }
      }, [e._t("default"), e._v(" "), e._l(e.ripples, function (t) {
        return e.isDisabled ? e._e() : n("md-wave", {
          key: t.uuid,
          class: ["md-ripple-wave", e.waveClasses],
          style: t.waveStyles,
          on: {
            "md-end": function (n) {
              return e.clearWave(t.uuid);
            }
          }
        });
      })], 2);
    },
        r = [],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    var r, a, o, s;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(2), a = i(r), o = n(10), s = i(o), t.default = {
      name: "MdPortal",
      abstract: !0,
      props: {
        mdAttachToParent: Boolean,
        mdTarget: {
          type: null,
          validator: function (e) {
            return !!(HTMLElement && e && e instanceof HTMLElement) || (a.default.util.warn("The md-target-el prop is invalid. You should pass a valid HTMLElement.", this), !1);
          }
        }
      },
      data: function () {
        return {
          leaveTimeout: null,
          originalParentEl: null
        };
      },
      computed: {
        transitionName: function () {
          var e,
              t,
              n = this._vnode.componentOptions.children[0];

          if (n) {
            if (e = n.data.transition) return e.name;
            if (t = n.componentOptions.propsData.name) return t;
          }

          return "v";
        },
        leaveClass: function () {
          return this.transitionName + "-leave";
        },
        leaveActiveClass: function () {
          return this.transitionName + "-leave-active";
        },
        leaveToClass: function () {
          return this.transitionName + "-leave-to";
        }
      },
      watch: {
        mdTarget: function (e, t) {
          this.changeParentEl(e), t && this.$forceUpdate();
        }
      },
      methods: {
        getTransitionDuration: function (e) {
          var t = window.getComputedStyle(e).transitionDuration,
              n = parseFloat(t, 10),
              i = t.match(/m?s/);
          return i && (i = i[0]), "s" === i ? 1e3 * n : "ms" === i ? n : 0;
        },
        killGhostElement: function (e) {
          e.parentNode && (this.changeParentEl(this.originalParentEl), this.$options._parentElm = this.originalParentEl, e.parentNode.removeChild(e));
        },
        initDestroy: function (e) {
          var t = this,
              n = this.$el;
          e && this.$el.nodeType === Node.COMMENT_NODE && (n = this.$vnode.elm), n.classList.add(this.leaveClass), n.classList.add(this.leaveActiveClass), this.$nextTick().then(function () {
            n.classList.add(t.leaveToClass), clearTimeout(t.leaveTimeout), t.leaveTimeout = setTimeout(function () {
              t.destroyElement(n);
            }, t.getTransitionDuration(n));
          });
        },
        destroyElement: function (e) {
          var t = this;
          (0, s.default)(function () {
            e.classList.remove(t.leaveClass), e.classList.remove(t.leaveActiveClass), e.classList.remove(t.leaveToClass), t.$emit("md-destroy"), t.killGhostElement(e);
          });
        },
        changeParentEl: function (e) {
          e && e.appendChild(this.$el);
        }
      },
      mounted: function () {
        this.originalParentEl || (this.originalParentEl = this.$el.parentNode, this.$emit("md-initial-parent", this.$el.parentNode)), this.mdAttachToParent && this.$el.parentNode.parentNode ? this.changeParentEl(this.$el.parentNode.parentNode) : document && this.changeParentEl(this.mdTarget || document.body);
      },
      beforeDestroy: function () {
        this.$el.classList ? this.initDestroy() : this.killGhostElement(this.$el);
      },
      render: function (e) {
        var t = this.$slots.default;
        if (t && t[0]) return t[0];
      }
    };
  }, function (e, t, n) {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = {
      props: {
        to: [String, Object],
        replace: Boolean,
        append: Boolean,
        activeClass: String,
        exact: Boolean,
        event: [String, Array],
        exactActiveClass: String
      }
    };
  }, function (e, t, n) {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: !0
    });

    var i = Object.assign || function (e) {
      var t, n, i;

      for (t = 1; t < arguments.length; t++) {
        n = arguments[t];

        for (i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i]);
      }

      return e;
    };

    t.default = function (e, t) {
      var n = e.$options.components.RouterLink || e.$options.components["router-link"];
      return i({}, t, n.options.props);
    };
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    var r, a, o, s;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(38), a = i(r), o = n(179), s = i(o), t.default = {
      mixins: [a.default],
      components: {
        MdListItemContent: s.default
      },
      props: {
        disabled: Boolean
      },
      computed: {
        isDisabled: function () {
          return !this.mdRipple || this.disabled;
        }
      }
    };
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    var r, a, o, s, u, l, d, c, f, h, m, p, v;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = Object.assign || function (e) {
      var t, n, i;

      for (t = 1; t < arguments.length; t++) {
        n = arguments[t];

        for (i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i]);
      }

      return e;
    }, a = n(1), o = i(a), s = n(41), u = i(s), l = n(38), d = i(l), c = n(28), f = i(c), h = n(29), m = i(h), p = n(45), v = i(p), t.default = new o.default({
      name: "MdButton",
      data: function () {
        return {
          rippleActive: !1
        };
      },
      components: {
        MdButtonContent: v.default
      },
      mixins: [d.default, u.default, f.default],
      props: {
        href: String,
        type: {
          type: String,
          default: "button"
        },
        disabled: Boolean
      },
      computed: {
        rippleWorks: function () {
          return this.mdRipple && !this.disabled;
        },
        isRouterLink: function () {
          return this.$router && this.to;
        }
      },
      render: function (e) {
        var t,
            n,
            i = this,
            a = e("md-button-content", {
          attrs: {
            mdRipple: this.mdRipple,
            disabled: this.disabled
          },
          props: {
            mdRippleActive: this.rippleActive
          },
          on: {
            "update:mdRippleActive": function (e) {
              return i.rippleActive = e;
            }
          }
        }, this.$slots.default),
            o = {
          staticClass: "md-button",
          class: [this.$mdActiveTheme, {
            "md-ripple-off": !this.mdRipple,
            "md-focused": this.mdHasFocus
          }],
          attrs: r({}, this.attrs, {
            href: this.href,
            disabled: this.disabled,
            type: !this.href && (this.type || "button")
          }),
          on: r({}, this.$listeners, {
            touchstart: function (e) {
              i.rippleWorks && (i.rippleActive = e), i.$listeners.touchstart && i.$listeners.touchstart(e);
            },
            touchmove: function (e) {
              i.rippleWorks && (i.rippleActive = e), i.$listeners.touchmove && i.$listeners.touchmove(e);
            },
            mousedown: function (e) {
              i.rippleWorks && (i.rippleActive = e), i.$listeners.mousedown && i.$listeners.mousedown(e);
            }
          })
        },
            s = "button";
        return this.href ? s = "a" : this.isRouterLink && (this.$options.props = (0, m.default)(this, this.$options.props), s = "router-link", t = this.$props.exactActiveClass, n = (this.$props.activeClass || this.$material.router.linkActiveClass) + " md-active", o.props = r({}, this.$props, {
          exactActiveClass: t,
          activeClass: n
        }), delete o.props.type, delete o.attrs.type, delete o.props.href, delete o.attrs.href), e(s, o, [a]);
      }
    });
  }, function (e, t, n) {
    "use strict";

    var i, r;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), i = n(16), r = function (e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }(i), t.default = {
      name: "MdButtonContent",
      components: {
        MdRipple: r.default
      },
      props: {
        mdRipple: Boolean,
        mdRippleActive: null,
        disabled: Boolean
      }
    };
  }, function (e, t) {}, function (e, t, n) {
    "use strict";

    function i(e) {
      n(35);
    }

    var r, a, o, s, u, l, d, c, f, h;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(21), a = n.n(r);

    for (o in r) "default" !== o && function (e) {
      n.d(t, e, function () {
        return r[e];
      });
    }(o);

    s = n(36), u = n(0), l = !1, d = i, c = null, f = null, h = u(a.a, s.a, l, d, c, f), t.default = h.exports;
  }, function (e, t) {}, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement;
      return (e._self._c || t)("i", {
        staticClass: "md-svg-loader",
        domProps: {
          innerHTML: e._s(e.html)
        }
      });
    },
        r = [],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement,
          n = e._self._c || t;
      return e.mdSrc ? n("md-svg-loader", {
        staticClass: "md-icon md-icon-image",
        class: [e.$mdActiveTheme],
        attrs: {
          "md-src": e.mdSrc
        },
        on: {
          "md-loaded": function (t) {
            return e.$emit("md-loaded");
          }
        }
      }) : n("i", {
        staticClass: "md-icon md-icon-font",
        class: [e.$mdActiveTheme]
      }, [e._t("default")], 2);
    },
        r = [],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t, n) {
    "use strict";

    var i, r;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), i = n(16), r = function (e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }(i), t.default = {
      components: {
        MdRipple: r.default
      },
      props: {
        mdRipple: {
          type: Boolean,
          default: !0
        }
      }
    };
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      n(44);
    }

    var r, a, o, s, u, l, d, c, f, h;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(31), a = n.n(r);

    for (o in r) "default" !== o && function (e) {
      n.d(t, e, function () {
        return r[e];
      });
    }(o);

    s = n(0), u = null, l = !1, d = i, c = null, f = null, h = s(a.a, u, l, d, c, f), t.default = h.exports;
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    var r, a, o, s, u, l, d;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = Object.assign || function (e) {
      var t, n, i;

      for (t = 1; t < arguments.length; t++) {
        n = arguments[t];

        for (i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i]);
      }

      return e;
    }, a = n(67), o = i(a), s = n(6), u = i(s), l = n(27), d = i(l), t.default = {
      name: "MdPopover",
      abstract: !0,
      components: {
        MdPortal: d.default
      },
      props: {
        mdActive: Boolean,
        mdSettings: {
          type: Object,
          default: function () {
            return {};
          }
        }
      },
      data: function () {
        return {
          popperInstance: null,
          originalParentEl: null,
          shouldRender: !1,
          shouldActivate: !1
        };
      },
      computed: {
        popoverClasses: function () {
          return this.shouldActivate ? "md-active" : this.shouldRender ? "md-rendering" : void 0;
        }
      },
      watch: {
        mdActive: {
          immediate: !0,
          handler: function (e) {
            this.shouldRender = e, e ? this.bindPopper() : this.shouldActivate = !1;
          }
        },
        mdSettings: function () {
          this.popperInstance && this.createPopper();
        }
      },
      methods: {
        getPopperOptions: function () {
          var e = this;
          return {
            placement: "bottom",
            modifiers: {
              preventOverflow: {
                boundariesElement: "viewport",
                padding: 16
              },
              computeStyle: {
                gpuAcceleration: !1
              }
            },
            onCreate: function () {
              e.shouldActivate = !0, e.$emit("md-active");
            }
          };
        },
        setOriginalParent: function (e) {
          this.originalParentEl || (this.originalParentEl = e);
        },
        killPopper: function () {
          this.popperInstance && (this.popperInstance.destroy(), this.popperInstance = null);
        },
        bindPopper: function () {
          var e = this;
          this.$nextTick().then(function () {
            e.originalParentEl && e.createPopper();
          });
        },
        createPopper: function () {
          if (this.mdSettings) {
            var e = (0, u.default)(this.getPopperOptions(), this.mdSettings);
            this.$el.nodeType !== Node.COMMENT_NODE && (this.popperInstance = new o.default(this.originalParentEl, this.$el, e));
          }
        },
        resetPopper: function () {
          this.popperInstance && (this.killPopper(), this.createPopper());
        }
      },
      beforeDestroy: function () {
        this.killPopper();
      },
      mounted: function () {
        this.resetPopper();
      },
      render: function (e) {
        return e(d.default, {
          props: r({}, this.$attrs),
          on: r({}, this.$listeners, {
            "md-initial-parent": this.setOriginalParent,
            "md-destroy": this.killPopper
          })
        }, this.$slots.default);
      }
    };
  }, function (e, t, n) {
    "use strict";

    function i() {
      try {
        var e = Object.defineProperty({}, "passive", {
          get: function () {
            v = {
              passive: !0
            };
          }
        });
        window.addEventListener("ghost", null, e);
      } catch (e) {}
    }

    function r(e) {
      var t = (e.keyCode, e.target);
      b.currentElement = t;
    }

    function a(e) {
      b.currentElement = null;
    }

    function o() {
      p.addEventListener("keyup", r);
    }

    function s() {
      p.addEventListener("pointerup", a);
    }

    function u() {
      p.addEventListener("MSPointerUp", a);
    }

    function l() {
      p.addEventListener("mouseup", a), "ontouchend" in window && p.addEventListener("touchend", a, v);
    }

    function d() {
      window.PointerEvent ? s() : window.MSPointerEvent ? u() : l(), o();
    }

    function c() {
      m || (p = document.body, i(), d(), m = !0);
    }

    var f, h, m, p, v, b;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), f = n(5), h = function (e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }(f), m = !1, p = null, v = !1, b = new h.default({
      currentElement: null
    }), t.default = {
      data: function () {
        return {
          mdHasFocus: !1
        };
      },
      computed: {
        focusedElement: function () {
          return b.currentElement;
        }
      },
      watch: {
        focusedElement: function (e) {
          this.mdHasFocus = e === this.$el;
        }
      },
      mounted: function () {
        c();
      }
    };
  }, function (e, t, n) {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: !0
    });

    var i = Object.assign || function (e) {
      var t, n, i;

      for (t = 1; t < arguments.length; t++) {
        n = arguments[t];

        for (i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i]);
      }

      return e;
    };

    t.default = {
      props: {
        value: {},
        placeholder: String,
        name: String,
        maxlength: [String, Number],
        readonly: Boolean,
        required: Boolean,
        disabled: Boolean,
        mdCounter: [String, Number]
      },
      data: function () {
        return {
          localValue: this.value,
          textareaHeight: !1
        };
      },
      computed: {
        model: {
          get: function () {
            return this.localValue;
          },
          set: function (e) {
            var t = this;
            "inputevent" !== ("" + e.constructor).match(/function (\w*)/)[1].toLowerCase() && this.$nextTick(function () {
              t.localValue = e;
            });
          }
        },
        clear: function () {
          return this.MdField.clear;
        },
        attributes: function () {
          return i({}, this.$attrs, {
            type: this.type,
            id: this.id,
            name: this.name,
            disabled: this.disabled,
            required: this.required,
            placeholder: this.placeholder,
            readonly: this.readonly,
            maxlength: this.maxlength
          });
        }
      },
      watch: {
        model: function () {
          this.setFieldValue();
        },
        clear: function (e) {
          e && this.clearField();
        },
        placeholder: function () {
          this.setPlaceholder();
        },
        disabled: function () {
          this.setDisabled();
        },
        required: function () {
          this.setRequired();
        },
        maxlength: function () {
          this.setMaxlength();
        },
        mdCounter: function () {
          this.setMaxlength();
        },
        localValue: function (e) {
          this.$emit("input", e);
        },
        value: function (e) {
          this.localValue = e;
        }
      },
      methods: {
        clearField: function () {
          this.$el.value = "", this.model = "", this.setFieldValue();
        },
        setLabelFor: function () {
          var e, t;
          this.$el.parentNode && (e = this.$el.parentNode.querySelector("label")) && (!(t = e.getAttribute("for")) || t.indexOf("md-") >= 0) && e.setAttribute("for", this.id);
        },
        setFieldValue: function () {
          this.MdField.value = this.model;
        },
        setPlaceholder: function () {
          this.MdField.placeholder = !!this.placeholder;
        },
        setDisabled: function () {
          this.MdField.disabled = !!this.disabled;
        },
        setRequired: function () {
          this.MdField.required = !!this.required;
        },
        setMaxlength: function () {
          this.mdCounter ? this.MdField.counter = parseInt(this.mdCounter, 10) : this.MdField.maxlength = parseInt(this.maxlength, 10);
        },
        onFocus: function () {
          this.MdField.focused = !0;
        },
        onBlur: function () {
          this.MdField.focused = !1;
        }
      },
      created: function () {
        this.setFieldValue(), this.setPlaceholder(), this.setDisabled(), this.setRequired(), this.setMaxlength();
      },
      mounted: function () {
        this.setLabelFor();
      }
    };
  }, function (e, t, n) {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = {
      methods: {
        isAssetIcon: function (e) {
          return /\w+[\/\\.]\w+/.test(e);
        }
      }
    };
  }, function (e, t) {}, function (e, t, n) {
    "use strict";

    function i(e) {
      n(46);
    }

    var r, a, o, s, u, l, d, c, f, h;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(32), a = n.n(r);

    for (o in r) "default" !== o && function (e) {
      n.d(t, e, function () {
        return r[e];
      });
    }(o);

    s = n(47), u = n(0), l = !1, d = i, c = null, f = null, h = u(a.a, s.a, l, d, c, f), t.default = h.exports;
  }, function (e, t) {}, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement,
          n = e._self._c || t;
      return n("md-ripple", {
        attrs: {
          "md-disabled": !e.mdRipple || e.disabled,
          "md-event-trigger": !1,
          "md-active": e.mdRippleActive
        },
        on: {
          "update:mdActive": function (t) {
            return e.$emit("update:mdRippleActive", t);
          }
        }
      }, [n("div", {
        staticClass: "md-button-content"
      }, [e._t("default")], 2)]);
    },
        r = [],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t, n) {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = function (e, t, n) {
      if ("MutationObserver" in window) {
        var i = new window.MutationObserver(n);
        return i.observe(e, t), {
          disconnect: function () {
            i.disconnect();
          }
        };
      }
    };
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    var r, a, o, s, u, l, d, c;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(1), a = i(r), o = n(63), s = i(o), u = n(87), l = i(u), d = n(89), c = i(d), t.default = new a.default({
      name: "MdField",
      components: {
        MdClearIcon: s.default,
        MdPasswordOffIcon: l.default,
        MdPasswordOnIcon: c.default
      },
      props: {
        mdInline: Boolean,
        mdClearable: Boolean,
        mdCounter: {
          type: Boolean,
          default: !0
        },
        mdTogglePassword: {
          type: Boolean,
          default: !0
        }
      },
      data: function () {
        return {
          showPassword: !1,
          MdField: {
            value: null,
            focused: !1,
            highlighted: !1,
            disabled: !1,
            required: !1,
            placeholder: !1,
            textarea: !1,
            autogrow: !1,
            maxlength: null,
            counter: null,
            password: null,
            togglePassword: !1,
            clear: !1,
            file: !1
          }
        };
      },
      provide: function () {
        return {
          MdField: this.MdField
        };
      },
      computed: {
        stringValue: function () {
          return (this.MdField.value || 0 === this.MdField.value) && "" + this.MdField.value;
        },
        hasCounter: function () {
          return this.mdCounter && (this.MdField.maxlength || this.MdField.counter);
        },
        hasPasswordToggle: function () {
          return this.mdTogglePassword && this.MdField.password;
        },
        hasValue: function () {
          return this.stringValue && this.stringValue.length > 0;
        },
        valueLength: function () {
          return this.stringValue ? this.stringValue.length : 0;
        },
        fieldClasses: function () {
          return {
            "md-inline": this.mdInline,
            "md-clearable": this.mdClearable,
            "md-focused": this.MdField.focused,
            "md-highlight": this.MdField.highlighted,
            "md-disabled": this.MdField.disabled,
            "md-required": this.MdField.required,
            "md-has-value": this.hasValue,
            "md-has-placeholder": this.MdField.placeholder,
            "md-has-textarea": this.MdField.textarea,
            "md-has-password": this.MdField.password,
            "md-has-file": this.MdField.file,
            "md-has-select": this.MdField.select,
            "md-autogrow": this.MdField.autogrow
          };
        }
      },
      methods: {
        clearInput: function () {
          var e = this;
          this.MdField.clear = !0, this.$emit("md-clear"), this.$nextTick().then(function () {
            e.MdField.clear = !1;
          });
        },
        togglePassword: function () {
          this.MdField.togglePassword = !this.MdField.togglePassword;
        },
        onBlur: function () {
          this.MdField.highlighted = !1;
        }
      }
    });
  }, function (e, t, n) {
    "use strict";

    var i, r;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), i = n(13), r = function (e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }(i), t.default = {
      name: "MdClearIcon",
      components: {
        MdIcon: r.default
      }
    };
  }, function (e, t, n) {
    "use strict";

    var i, r;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), i = n(13), r = function (e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }(i), t.default = {
      name: "MdPasswordOffIcon",
      components: {
        MdIcon: r.default
      }
    };
  }, function (e, t, n) {
    "use strict";

    var i, r;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), i = n(13), r = function (e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }(i), t.default = {
      name: "MdPasswordOnIcon",
      components: {
        MdIcon: r.default
      }
    };
  }, function (e, t, n) {
    "use strict";

    var i, r, a, o, s, u, l, d, c, f;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), i = n(54), r = n.n(i);

    for (a in i) "default" !== a && function (e) {
      n.d(t, e, function () {
        return i[e];
      });
    }(a);

    o = n(92), s = n(0), u = !1, l = null, d = null, c = null, f = s(r.a, o.a, u, l, d, c), t.default = f.exports;
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    var r, a, o, s, u, l, d;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = Object.assign || function (e) {
      var t, n, i;

      for (t = 1; t < arguments.length; t++) {
        n = arguments[t];

        for (i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i]);
      }

      return e;
    }, a = n(1), o = i(a), s = n(11), u = i(s), l = n(42), d = i(l), t.default = new o.default({
      name: "MdInput",
      mixins: [d.default],
      inject: ["MdField"],
      props: {
        id: {
          type: String,
          default: function () {
            return "md-input-" + (0, u.default)();
          }
        },
        type: {
          type: String,
          default: "text"
        }
      },
      computed: {
        toggleType: function () {
          return this.MdField.togglePassword;
        },
        isPassword: function () {
          return "password" === this.type;
        },
        listeners: function () {
          var e = r({}, this.$listeners);
          return delete e.input, e;
        }
      },
      watch: {
        type: function (e) {
          this.setPassword(this.isPassword);
        },
        toggleType: function (e) {
          e ? this.setTypeText() : this.setTypePassword();
        }
      },
      methods: {
        setPassword: function (e) {
          this.MdField.password = e, this.MdField.togglePassword = !1;
        },
        setTypePassword: function () {
          this.$el.type = "password";
        },
        setTypeText: function () {
          this.$el.type = "text";
        }
      },
      created: function () {
        this.setPassword(this.isPassword);
      },
      beforeDestroy: function () {
        this.setPassword(!1);
      }
    });
  }, function (e, t, n) {
    "use strict";

    var i, r;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), i = n(27), r = function (e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }(i), t.default = {
      name: "MdOverlay",
      components: {
        MdPortal: r.default
      },
      props: {
        mdActive: Boolean,
        mdAttachToParent: Boolean,
        mdFixed: Boolean
      },
      computed: {
        overlayClasses: function () {
          return {
            "md-fixed": this.mdFixed
          };
        }
      }
    };
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      n(66);
    }

    var r, a, o, s, u, l, d, c, f, h;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(40), a = n.n(r);

    for (o in r) "default" !== o && function (e) {
      n.d(t, e, function () {
        return r[e];
      });
    }(o);

    s = n(0), u = null, l = !1, d = i, c = null, f = null, h = s(a.a, u, l, d, c, f), t.default = h.exports;
  }, function (e, t, n) {
    "use strict";

    var i, r;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), i = n(1), r = function (e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }(i), t.default = new r.default({
      name: "MdList",
      data: function () {
        return {
          MdList: {
            expandable: [],
            expandATab: this.expandATab,
            pushExpandable: this.pushExpandable,
            removeExpandable: this.removeExpandable
          }
        };
      },
      provide: function () {
        return {
          MdList: this.MdList
        };
      },
      props: {
        mdExpandSingle: {
          default: !1
        }
      },
      methods: {
        expandATab: function (e) {
          if (this.mdExpandSingle && e) {
            this.MdList.expandable.filter(function (t) {
              return t !== e;
            }).forEach(function (e) {
              return e.close();
            });
          }
        },
        pushExpandable: function (e) {
          var t = this.MdList.expandable;
          t.find(function (t) {
            return t === e;
          }) || (this.MdList.expandable = t.concat([e]));
        },
        removeExpandable: function (e) {
          var t = this.MdList.expandable;
          t.find(function (t) {
            return t === e;
          }) && (this.MdList.expandable = t.filter(function (t) {
            return t !== e;
          }));
        }
      }
    });
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      n(94);
    }

    var r, a, o, s, u, l, d, c, f, h;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(55), a = n.n(r);

    for (o in r) "default" !== o && function (e) {
      n.d(t, e, function () {
        return r[e];
      });
    }(o);

    s = n(95), u = n(0), l = !1, d = i, c = null, f = null, h = u(a.a, s.a, l, d, c, f), t.default = h.exports;
  }, function (e, t, n) {
    "use strict";

    var i, r;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), i = n(2), r = function (e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }(i), t.default = {
      name: "MdFocusTrap",
      abstract: !0,
      methods: {
        setFocus: function () {
          var e = this;
          window.setTimeout(function () {
            e.$el.tagName && (e.$el.setAttribute("tabindex", "-1"), e.$el.focus());
          }, 20);
        }
      },
      mounted: function () {
        this.setFocus();
      },
      render: function () {
        try {
          var e = this.$slots.default;
          if (!e) return null;
          if (e.length > 1) throw Error();
          return e[0];
        } catch (e) {
          r.default.util.warn("MdFocusTrap can only render one, and exactly one child component.", this);
        }

        return null;
      }
    };
  }, function (e, t, n) {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = function (e, t, n, i) {
      function r() {
        e.removeEventListener(t, n);
      }

      return t && t.indexOf("click") >= 0 && /iP/i.test(navigator.userAgent) && (e.style.cursor = "pointer"), e.addEventListener(t, n, i || !1), {
        destroy: r
      };
    };
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    var r, a, o, s;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(10), a = i(r), o = n(60), s = i(o), t.default = function () {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : window,
          t = arguments[1];
      return {
        destroy: (0, s.default)(e, "resize", function () {
          (0, a.default)(t);
        }, {
          passive: !0
        }).destroy
      };
    };
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      n(85);
    }

    var r, a, o, s, u, l, d, c, f, h;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(49), a = n.n(r);

    for (o in r) "default" !== o && function (e) {
      n.d(t, e, function () {
        return r[e];
      });
    }(o);

    s = n(91), u = n(0), l = !1, d = i, c = null, f = null, h = u(a.a, s.a, l, d, c, f), t.default = h.exports;
  }, function (e, t, n) {
    "use strict";

    var i, r, a, o, s, u, l, d, c, f;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), i = n(50), r = n.n(i);

    for (a in i) "default" !== a && function (e) {
      n.d(t, e, function () {
        return i[e];
      });
    }(a);

    o = n(86), s = n(0), u = !1, l = null, d = null, c = null, f = s(r.a, o.a, u, l, d, c), t.default = f.exports;
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      var t, n, i, a;
      if (arguments.length < 1) throw new TypeError("1 argument required, but only " + arguments.length + " present");
      return t = 1, n = Object(r.a)(e), i = n.getUTCDay(), a = (i < t ? 7 : 0) + i - t, n.setUTCDate(n.getUTCDate() - a), n.setUTCHours(0, 0, 0, 0), n;
    }

    t.a = i;
    var r = n(9);
  }, function (e, t, n) {
    "use strict";

    function i(e, t) {
      var n, i, o, s, u, l, d, c;
      if (arguments.length < 1) throw new TypeError("1 argument required, but only " + arguments.length + " present");
      if (n = t || {}, i = n.locale, o = i && i.options && i.options.weekStartsOn, s = null == o ? 0 : Object(r.a)(o), !((u = null == n.weekStartsOn ? s : Object(r.a)(n.weekStartsOn)) >= 0 && u <= 6)) throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
      return l = Object(a.a)(e), d = l.getUTCDay(), c = (d < u ? 7 : 0) + d - u, l.setUTCDate(l.getUTCDate() - c), l.setUTCHours(0, 0, 0, 0), l;
    }

    var r, a;
    t.a = i, r = n(17), a = n(9);
  }, function (e, t) {}, function (e, t, n) {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: !0
    }), function (e) {
      function n(e) {
        var t = !1;
        return function () {
          t || (t = !0, window.Promise.resolve().then(function () {
            t = !1, e();
          }));
        };
      }

      function i(e) {
        var t = !1;
        return function () {
          t || (t = !0, setTimeout(function () {
            t = !1, e();
          }, Pe));
        };
      }

      function r(e) {
        var t = {};
        return e && "[object Function]" === t.toString.call(e);
      }

      function a(e, t) {
        var n, i;
        return 1 !== e.nodeType ? [] : (n = e.ownerDocument.defaultView, i = n.getComputedStyle(e, null), t ? i[t] : i);
      }

      function o(e) {
        return "HTML" === e.nodeName ? e : e.parentNode || e.host;
      }

      function s(e) {
        if (!e) return document.body;

        switch (e.nodeName) {
          case "HTML":
          case "BODY":
            return e.ownerDocument.body;

          case "#document":
            return e.body;
        }

        var t = a(e),
            n = t.overflow,
            i = t.overflowX;
        return /(auto|scroll|overlay)/.test(n + t.overflowY + i) ? e : s(o(e));
      }

      function u(e) {
        return 11 === e ? he : 10 === e ? me : he || me;
      }

      function l(e) {
        var t, n, i;
        if (!e) return document.documentElement;

        for (t = u(10) ? document.body : null, n = e.offsetParent || null; n === t && e.nextElementSibling;) n = (e = e.nextElementSibling).offsetParent;

        return i = n && n.nodeName, i && "BODY" !== i && "HTML" !== i ? -1 !== ["TH", "TD", "TABLE"].indexOf(n.nodeName) && "static" === a(n, "position") ? l(n) : n : e ? e.ownerDocument.documentElement : document.documentElement;
      }

      function d(e) {
        var t = e.nodeName;
        return "BODY" !== t && ("HTML" === t || l(e.firstElementChild) === e);
      }

      function c(e) {
        return null !== e.parentNode ? c(e.parentNode) : e;
      }

      function f(e, t) {
        var n, i, r, a, o, s;
        return e && e.nodeType && t && t.nodeType ? (n = e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING, i = n ? e : t, r = n ? t : e, a = document.createRange(), a.setStart(i, 0), a.setEnd(r, 0), o = a.commonAncestorContainer, e !== o && t !== o || i.contains(r) ? d(o) ? o : l(o) : (s = c(e), s.host ? f(s.host, t) : f(e, c(t).host))) : document.documentElement;
      }

      function h(e) {
        var t,
            n,
            i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "top",
            r = "top" === i ? "scrollTop" : "scrollLeft",
            a = e.nodeName;
        return "BODY" === a || "HTML" === a ? (t = e.ownerDocument.documentElement, n = e.ownerDocument.scrollingElement || t, n[r]) : e[r];
      }

      function m(e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
            i = h(t, "top"),
            r = h(t, "left"),
            a = n ? -1 : 1;
        return e.top += i * a, e.bottom += i * a, e.left += r * a, e.right += r * a, e;
      }

      function p(e, t) {
        var n = "x" === t ? "Left" : "Top",
            i = "Left" === n ? "Right" : "Bottom";
        return parseFloat(e["border" + n + "Width"], 10) + parseFloat(e["border" + i + "Width"], 10);
      }

      function v(e, t, n, i) {
        return Math.max(t["offset" + e], t["scroll" + e], n["client" + e], n["offset" + e], n["scroll" + e], u(10) ? parseInt(n["offset" + e]) + parseInt(i["margin" + ("Height" === e ? "Top" : "Left")]) + parseInt(i["margin" + ("Height" === e ? "Bottom" : "Right")]) : 0);
      }

      function b(e) {
        var t = e.body,
            n = e.documentElement,
            i = u(10) && getComputedStyle(n);
        return {
          height: v("Height", t, n, i),
          width: v("Width", t, n, i)
        };
      }

      function g(e) {
        return ge({}, e, {
          right: e.left + e.width,
          bottom: e.top + e.height
        });
      }

      function y(e) {
        var t,
            n,
            i,
            r,
            o,
            s,
            l,
            d,
            c,
            f = {};

        try {
          u(10) ? (f = e.getBoundingClientRect(), t = h(e, "top"), n = h(e, "left"), f.top += t, f.left += n, f.bottom += t, f.right += n) : f = e.getBoundingClientRect();
        } catch (e) {}

        return i = {
          left: f.left,
          top: f.top,
          width: f.right - f.left,
          height: f.bottom - f.top
        }, r = "HTML" === e.nodeName ? b(e.ownerDocument) : {}, o = r.width || e.clientWidth || i.right - i.left, s = r.height || e.clientHeight || i.bottom - i.top, l = e.offsetWidth - o, d = e.offsetHeight - s, (l || d) && (c = a(e), l -= p(c, "x"), d -= p(c, "y"), i.width -= l, i.height -= d), g(i);
      }

      function M(e, t) {
        var n,
            i,
            r,
            o = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
            l = u(10),
            d = "HTML" === t.nodeName,
            c = y(e),
            f = y(t),
            h = s(e),
            p = a(t),
            v = parseFloat(p.borderTopWidth, 10),
            b = parseFloat(p.borderLeftWidth, 10);
        return o && d && (f.top = Math.max(f.top, 0), f.left = Math.max(f.left, 0)), n = g({
          top: c.top - f.top - v,
          left: c.left - f.left - b,
          width: c.width,
          height: c.height
        }), n.marginTop = 0, n.marginLeft = 0, !l && d && (i = parseFloat(p.marginTop, 10), r = parseFloat(p.marginLeft, 10), n.top -= v - i, n.bottom -= v - i, n.left -= b - r, n.right -= b - r, n.marginTop = i, n.marginLeft = r), (l && !o ? t.contains(h) : t === h && "BODY" !== h.nodeName) && (n = m(n, t)), n;
      }

      function _(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
            n = e.ownerDocument.documentElement,
            i = M(e, n),
            r = Math.max(n.clientWidth, window.innerWidth || 0),
            a = Math.max(n.clientHeight, window.innerHeight || 0),
            o = t ? 0 : h(n),
            s = t ? 0 : h(n, "left");
        return g({
          top: o - i.top + i.marginTop,
          left: s - i.left + i.marginLeft,
          width: r,
          height: a
        });
      }

      function w(e) {
        var t,
            n = e.nodeName;
        return "BODY" !== n && "HTML" !== n && ("fixed" === a(e, "position") || !!(t = o(e)) && w(t));
      }

      function S(e) {
        if (!e || !e.parentElement || u()) return document.documentElement;

        for (var t = e.parentElement; t && "none" === a(t, "transform");) t = t.parentElement;

        return t || document.documentElement;
      }

      function C(e, t, n, i) {
        var r,
            a,
            u,
            l,
            d,
            c,
            h = arguments.length > 4 && void 0 !== arguments[4] && arguments[4],
            m = {
          top: 0,
          left: 0
        },
            p = h ? S(e) : f(e, t);
        return "viewport" === i ? m = _(p, h) : (r = void 0, "scrollParent" === i ? (r = s(o(t)), "BODY" === r.nodeName && (r = e.ownerDocument.documentElement)) : r = "window" === i ? e.ownerDocument.documentElement : i, a = M(r, p, h), "HTML" !== r.nodeName || w(p) ? m = a : (u = b(e.ownerDocument), l = u.height, d = u.width, m.top += a.top - a.marginTop, m.bottom = l + a.top, m.left += a.left - a.marginLeft, m.right = d + a.left)), n = n || 0, c = "number" == typeof n, m.left += c ? n : n.left || 0, m.top += c ? n : n.top || 0, m.right -= c ? n : n.right || 0, m.bottom -= c ? n : n.bottom || 0, m;
      }

      function x(e) {
        return e.width * e.height;
      }

      function O(e, t, n, i, r) {
        var a,
            o,
            s,
            u,
            l,
            d,
            c = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0;
        return -1 === e.indexOf("auto") ? e : (a = C(n, i, c, r), o = {
          top: {
            width: a.width,
            height: t.top - a.top
          },
          right: {
            width: a.right - t.right,
            height: a.height
          },
          bottom: {
            width: a.width,
            height: a.bottom - t.bottom
          },
          left: {
            width: t.left - a.left,
            height: a.height
          }
        }, s = Object.keys(o).map(function (e) {
          return ge({
            key: e
          }, o[e], {
            area: x(o[e])
          });
        }).sort(function (e, t) {
          return t.area - e.area;
        }), u = s.filter(function (e) {
          var t = e.width,
              i = e.height;
          return t >= n.clientWidth && i >= n.clientHeight;
        }), l = u.length > 0 ? u[0].key : s[0].key, d = e.split("-")[1], l + (d ? "-" + d : ""));
      }

      function T(e, t, n) {
        var i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null;
        return M(n, i ? S(t) : f(t, n), i);
      }

      function P(e) {
        var t = e.ownerDocument.defaultView,
            n = t.getComputedStyle(e),
            i = parseFloat(n.marginTop || 0) + parseFloat(n.marginBottom || 0),
            r = parseFloat(n.marginLeft || 0) + parseFloat(n.marginRight || 0);
        return {
          width: e.offsetWidth + r,
          height: e.offsetHeight + i
        };
      }

      function D(e) {
        var t = {
          left: "right",
          right: "left",
          bottom: "top",
          top: "bottom"
        };
        return e.replace(/left|right|bottom|top/g, function (e) {
          return t[e];
        });
      }

      function j(e, t, n) {
        var i, r, a, o, s, u, l;
        return n = n.split("-")[0], i = P(e), r = {
          width: i.width,
          height: i.height
        }, a = -1 !== ["right", "left"].indexOf(n), o = a ? "top" : "left", s = a ? "left" : "top", u = a ? "height" : "width", l = a ? "width" : "height", r[o] = t[o] + t[u] / 2 - i[u] / 2, r[s] = n === s ? t[s] - i[l] : t[D(s)], r;
      }

      function k(e, t) {
        return Array.prototype.find ? e.find(t) : e.filter(t)[0];
      }

      function $(e, t, n) {
        if (Array.prototype.findIndex) return e.findIndex(function (e) {
          return e[t] === n;
        });
        var i = k(e, function (e) {
          return e[t] === n;
        });
        return e.indexOf(i);
      }

      function E(e, t, n) {
        return (void 0 === n ? e : e.slice(0, $(e, "name", n))).forEach(function (e) {
          e.function && console.warn("`modifier.function` is deprecated, use `modifier.fn`!");
          var n = e.function || e.fn;
          e.enabled && r(n) && (t.offsets.popper = g(t.offsets.popper), t.offsets.reference = g(t.offsets.reference), t = n(t, e));
        }), t;
      }

      function A() {
        if (!this.state.isDestroyed) {
          var e = {
            instance: this,
            styles: {},
            arrowStyles: {},
            attributes: {},
            flipped: !1,
            offsets: {}
          };
          e.offsets.reference = T(this.state, this.popper, this.reference, this.options.positionFixed), e.placement = O(this.options.placement, e.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding), e.originalPlacement = e.placement, e.positionFixed = this.options.positionFixed, e.offsets.popper = j(this.popper, e.offsets.reference, e.placement), e.offsets.popper.position = this.options.positionFixed ? "fixed" : "absolute", e = E(this.modifiers, e), this.state.isCreated ? this.options.onUpdate(e) : (this.state.isCreated = !0, this.options.onCreate(e));
        }
      }

      function I(e, t) {
        return e.some(function (e) {
          var n = e.name;
          return e.enabled && n === t;
        });
      }

      function F(e) {
        var t,
            n,
            i,
            r = [!1, "ms", "Webkit", "Moz", "O"],
            a = e.charAt(0).toUpperCase() + e.slice(1);

        for (t = 0; t < r.length; t++) if (n = r[t], i = n ? "" + n + a : e, void 0 !== document.body.style[i]) return i;

        return null;
      }

      function B() {
        return this.state.isDestroyed = !0, I(this.modifiers, "applyStyle") && (this.popper.removeAttribute("x-placement"), this.popper.style.position = "", this.popper.style.top = "", this.popper.style.left = "", this.popper.style.right = "", this.popper.style.bottom = "", this.popper.style.willChange = "", this.popper.style[F("transform")] = ""), this.disableEventListeners(), this.options.removeOnDestroy && this.popper.parentNode.removeChild(this.popper), this;
      }

      function L(e) {
        var t = e.ownerDocument;
        return t ? t.defaultView : window;
      }

      function R(e, t, n, i) {
        var r = "BODY" === e.nodeName,
            a = r ? e.ownerDocument.defaultView : e;
        a.addEventListener(t, n, {
          passive: !0
        }), r || R(s(a.parentNode), t, n, i), i.push(a);
      }

      function N(e, t, n, i) {
        n.updateBound = i, L(e).addEventListener("resize", n.updateBound, {
          passive: !0
        });
        var r = s(e);
        return R(r, "scroll", n.updateBound, n.scrollParents), n.scrollElement = r, n.eventsEnabled = !0, n;
      }

      function H() {
        this.state.eventsEnabled || (this.state = N(this.reference, this.options, this.state, this.scheduleUpdate));
      }

      function V(e, t) {
        return L(e).removeEventListener("resize", t.updateBound), t.scrollParents.forEach(function (e) {
          e.removeEventListener("scroll", t.updateBound);
        }), t.updateBound = null, t.scrollParents = [], t.scrollElement = null, t.eventsEnabled = !1, t;
      }

      function q() {
        this.state.eventsEnabled && (cancelAnimationFrame(this.scheduleUpdate), this.state = V(this.reference, this.state));
      }

      function z(e) {
        return "" !== e && !isNaN(parseFloat(e)) && isFinite(e);
      }

      function U(e, t) {
        Object.keys(t).forEach(function (n) {
          var i = "";
          -1 !== ["width", "height", "top", "right", "bottom", "left"].indexOf(n) && z(t[n]) && (i = "px"), e.style[n] = t[n] + i;
        });
      }

      function W(e, t) {
        Object.keys(t).forEach(function (n) {
          !1 !== t[n] ? e.setAttribute(n, t[n]) : e.removeAttribute(n);
        });
      }

      function Y(e) {
        return U(e.instance.popper, e.styles), W(e.instance.popper, e.attributes), e.arrowElement && Object.keys(e.arrowStyles).length && U(e.arrowElement, e.arrowStyles), e;
      }

      function X(e, t, n, i, r) {
        var a = T(r, t, e, n.positionFixed),
            o = O(n.placement, a, t, e, n.modifiers.flip.boundariesElement, n.modifiers.flip.padding);
        return t.setAttribute("x-placement", o), U(t, {
          position: n.positionFixed ? "fixed" : "absolute"
        }), n;
      }

      function G(e, t) {
        var n = e.offsets,
            i = n.popper,
            r = n.reference,
            a = Math.round,
            o = Math.floor,
            s = function (e) {
          return e;
        },
            u = a(r.width),
            l = a(i.width),
            d = -1 !== ["left", "right"].indexOf(e.placement),
            c = -1 !== e.placement.indexOf("-"),
            f = u % 2 == l % 2,
            h = u % 2 == 1 && l % 2 == 1,
            m = t ? d || c || f ? a : o : s,
            p = t ? a : s;

        return {
          left: m(h && !c && t ? i.left - 1 : i.left),
          top: p(i.top),
          bottom: p(i.bottom),
          right: m(i.right)
        };
      }

      function Q(e, t) {
        var n,
            i,
            r,
            a,
            o,
            s,
            u,
            d,
            c,
            f,
            h,
            m,
            p,
            v = t.x,
            b = t.y,
            g = e.offsets.popper,
            M = k(e.instance.modifiers, function (e) {
          return "applyStyle" === e.name;
        }).gpuAcceleration;
        return void 0 !== M && console.warn("WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!"), n = void 0 !== M ? M : t.gpuAcceleration, i = l(e.instance.popper), r = y(i), a = {
          position: g.position
        }, o = G(e, window.devicePixelRatio < 2 || !ye), s = "bottom" === v ? "top" : "bottom", u = "right" === b ? "left" : "right", d = F("transform"), c = void 0, f = void 0, f = "bottom" === s ? "HTML" === i.nodeName ? -i.clientHeight + o.bottom : -r.height + o.bottom : o.top, c = "right" === u ? "HTML" === i.nodeName ? -i.clientWidth + o.right : -r.width + o.right : o.left, n && d ? (a[d] = "translate3d(" + c + "px, " + f + "px, 0)", a[s] = 0, a[u] = 0, a.willChange = "transform") : (h = "bottom" === s ? -1 : 1, m = "right" === u ? -1 : 1, a[s] = f * h, a[u] = c * m, a.willChange = s + ", " + u), p = {
          "x-placement": e.placement
        }, e.attributes = ge({}, p, e.attributes), e.styles = ge({}, a, e.styles), e.arrowStyles = ge({}, e.offsets.arrow, e.arrowStyles), e;
      }

      function K(e, t, n) {
        var i,
            r,
            a = k(e, function (e) {
          return e.name === t;
        }),
            o = !!a && e.some(function (e) {
          return e.name === n && e.enabled && e.order < a.order;
        });
        return o || (i = "`" + t + "`", r = "`" + n + "`", console.warn(r + " modifier is required by " + i + " modifier in order to work, be sure to include it before " + i + "!")), o;
      }

      function J(e, t) {
        var n, i, r, o, s, u, l, d, c, f, h, m, p, v, b, y, M, _;

        if (!K(e.instance.modifiers, "arrow", "keepTogether")) return e;

        if ("string" == typeof (i = t.element)) {
          if (!(i = e.instance.popper.querySelector(i))) return e;
        } else if (!e.instance.popper.contains(i)) return console.warn("WARNING: `arrow.element` must be child of its popper element!"), e;

        return r = e.placement.split("-")[0], o = e.offsets, s = o.popper, u = o.reference, l = -1 !== ["left", "right"].indexOf(r), d = l ? "height" : "width", c = l ? "Top" : "Left", f = c.toLowerCase(), h = l ? "left" : "top", m = l ? "bottom" : "right", p = P(i)[d], u[m] - p < s[f] && (e.offsets.popper[f] -= s[f] - (u[m] - p)), u[f] + p > s[m] && (e.offsets.popper[f] += u[f] + p - s[m]), e.offsets.popper = g(e.offsets.popper), v = u[f] + u[d] / 2 - p / 2, b = a(e.instance.popper), y = parseFloat(b["margin" + c], 10), M = parseFloat(b["border" + c + "Width"], 10), _ = v - e.offsets.popper[f] - y - M, _ = Math.max(Math.min(s[d] - p, _), 0), e.arrowElement = i, e.offsets.arrow = (n = {}, be(n, f, Math.round(_)), be(n, h, ""), n), e;
      }

      function Z(e) {
        return "end" === e ? "start" : "start" === e ? "end" : e;
      }

      function ee(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
            n = _e.indexOf(e),
            i = _e.slice(n + 1).concat(_e.slice(0, n));

        return t ? i.reverse() : i;
      }

      function te(e, t) {
        var n, i, r, a, o;
        if (I(e.instance.modifiers, "inner")) return e;
        if (e.flipped && e.placement === e.originalPlacement) return e;

        switch (n = C(e.instance.popper, e.instance.reference, t.padding, t.boundariesElement, e.positionFixed), i = e.placement.split("-")[0], r = D(i), a = e.placement.split("-")[1] || "", o = [], t.behavior) {
          case we.FLIP:
            o = [i, r];
            break;

          case we.CLOCKWISE:
            o = ee(i);
            break;

          case we.COUNTERCLOCKWISE:
            o = ee(i, !0);
            break;

          default:
            o = t.behavior;
        }

        return o.forEach(function (s, u) {
          var l, d, c, f, h, m, p, v, b, g, y, M, _;

          if (i !== s || o.length === u + 1) return e;
          i = e.placement.split("-")[0], r = D(i), l = e.offsets.popper, d = e.offsets.reference, c = Math.floor, f = "left" === i && c(l.right) > c(d.left) || "right" === i && c(l.left) < c(d.right) || "top" === i && c(l.bottom) > c(d.top) || "bottom" === i && c(l.top) < c(d.bottom), h = c(l.left) < c(n.left), m = c(l.right) > c(n.right), p = c(l.top) < c(n.top), v = c(l.bottom) > c(n.bottom), b = "left" === i && h || "right" === i && m || "top" === i && p || "bottom" === i && v, g = -1 !== ["top", "bottom"].indexOf(i), y = !!t.flipVariations && (g && "start" === a && h || g && "end" === a && m || !g && "start" === a && p || !g && "end" === a && v), M = !!t.flipVariationsByContent && (g && "start" === a && m || g && "end" === a && h || !g && "start" === a && v || !g && "end" === a && p), _ = y || M, (f || b || _) && (e.flipped = !0, (f || b) && (i = o[u + 1]), _ && (a = Z(a)), e.placement = i + (a ? "-" + a : ""), e.offsets.popper = ge({}, e.offsets.popper, j(e.instance.popper, e.offsets.reference, e.placement)), e = E(e.instance.modifiers, e, "flip"));
        }), e;
      }

      function ne(e) {
        var t = e.offsets,
            n = t.popper,
            i = t.reference,
            r = e.placement.split("-")[0],
            a = Math.floor,
            o = -1 !== ["top", "bottom"].indexOf(r),
            s = o ? "right" : "bottom",
            u = o ? "left" : "top",
            l = o ? "width" : "height";
        return n[s] < a(i[u]) && (e.offsets.popper[u] = a(i[u]) - n[l]), n[u] > a(i[s]) && (e.offsets.popper[u] = a(i[s])), e;
      }

      function ie(e, t, n, i) {
        var r,
            a,
            o = e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),
            s = +o[1],
            u = o[2];
        if (!s) return e;

        if (0 === u.indexOf("%")) {
          switch (r = void 0, u) {
            case "%p":
              r = n;
              break;

            case "%":
            case "%r":
            default:
              r = i;
          }

          return a = g(r), a[t] / 100 * s;
        }

        return "vh" === u || "vw" === u ? (void 0, ("vh" === u ? Math.max(document.documentElement.clientHeight, window.innerHeight || 0) : Math.max(document.documentElement.clientWidth, window.innerWidth || 0)) / 100 * s) : s;
      }

      function re(e, t, n, i) {
        var r,
            a,
            o = [0, 0],
            s = -1 !== ["right", "left"].indexOf(i),
            u = e.split(/(\+|\-)/).map(function (e) {
          return e.trim();
        }),
            l = u.indexOf(k(u, function (e) {
          return -1 !== e.search(/,|\s/);
        }));
        return u[l] && -1 === u[l].indexOf(",") && console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead."), r = /\s*,\s*|\s+/, a = -1 !== l ? [u.slice(0, l).concat([u[l].split(r)[0]]), [u[l].split(r)[1]].concat(u.slice(l + 1))] : [u], a = a.map(function (e, i) {
          var r = (1 === i ? !s : s) ? "height" : "width",
              a = !1;
          return e.reduce(function (e, t) {
            return "" === e[e.length - 1] && -1 !== ["+", "-"].indexOf(t) ? (e[e.length - 1] = t, a = !0, e) : a ? (e[e.length - 1] += t, a = !1, e) : e.concat(t);
          }, []).map(function (e) {
            return ie(e, r, t, n);
          });
        }), a.forEach(function (e, t) {
          e.forEach(function (n, i) {
            z(n) && (o[t] += n * ("-" === e[i - 1] ? -1 : 1));
          });
        }), o;
      }

      function ae(e, t) {
        var n = t.offset,
            i = e.placement,
            r = e.offsets,
            a = r.popper,
            o = r.reference,
            s = i.split("-")[0],
            u = void 0;
        return u = z(+n) ? [+n, 0] : re(n, a, o, s), "left" === s ? (a.top += u[0], a.left -= u[1]) : "right" === s ? (a.top += u[0], a.left += u[1]) : "top" === s ? (a.left += u[0], a.top -= u[1]) : "bottom" === s && (a.left += u[0], a.top += u[1]), e.popper = a, e;
      }

      function oe(e, t) {
        var n,
            i,
            r,
            a,
            o,
            s,
            u,
            d,
            c,
            f = t.boundariesElement || l(e.instance.popper);
        return e.instance.reference === f && (f = l(f)), n = F("transform"), i = e.instance.popper.style, r = i.top, a = i.left, o = i[n], i.top = "", i.left = "", i[n] = "", s = C(e.instance.popper, e.instance.reference, t.padding, f, e.positionFixed), i.top = r, i.left = a, i[n] = o, t.boundaries = s, u = t.priority, d = e.offsets.popper, c = {
          primary: function (e) {
            var n = d[e];
            return d[e] < s[e] && !t.escapeWithReference && (n = Math.max(d[e], s[e])), be({}, e, n);
          },
          secondary: function (e) {
            var n = "right" === e ? "left" : "top",
                i = d[n];
            return d[e] > s[e] && !t.escapeWithReference && (i = Math.min(d[n], s[e] - ("right" === e ? d.width : d.height))), be({}, n, i);
          }
        }, u.forEach(function (e) {
          var t = -1 !== ["left", "top"].indexOf(e) ? "primary" : "secondary";
          d = ge({}, d, c[t](e));
        }), e.offsets.popper = d, e;
      }

      function se(e) {
        var t,
            n,
            i,
            r,
            a,
            o,
            s,
            u = e.placement,
            l = u.split("-")[0],
            d = u.split("-")[1];
        return d && (t = e.offsets, n = t.reference, i = t.popper, r = -1 !== ["bottom", "top"].indexOf(l), a = r ? "left" : "top", o = r ? "width" : "height", s = {
          start: be({}, a, n[a]),
          end: be({}, a, n[a] + n[o] - i[o])
        }, e.offsets.popper = ge({}, i, s[d])), e;
      }

      function ue(e) {
        var t, n;
        if (!K(e.instance.modifiers, "hide", "preventOverflow")) return e;

        if (t = e.offsets.reference, n = k(e.instance.modifiers, function (e) {
          return "preventOverflow" === e.name;
        }).boundaries, t.bottom < n.top || t.left > n.right || t.top > n.bottom || t.right < n.left) {
          if (!0 === e.hide) return e;
          e.hide = !0, e.attributes["x-out-of-boundaries"] = "";
        } else {
          if (!1 === e.hide) return e;
          e.hide = !1, e.attributes["x-out-of-boundaries"] = !1;
        }

        return e;
      }

      function le(e) {
        var t = e.placement,
            n = t.split("-")[0],
            i = e.offsets,
            r = i.popper,
            a = i.reference,
            o = -1 !== ["left", "right"].indexOf(n),
            s = -1 === ["top", "left"].indexOf(n);
        return r[o ? "left" : "top"] = a[n] - (s ? r[o ? "width" : "height"] : 0), e.placement = D(t), e.offsets.popper = g(r), e;
      }

      var de,
          ce,
          fe,
          he,
          me,
          pe,
          ve,
          be,
          ge,
          ye,
          Me,
          _e,
          we,
          Se,
          Ce,
          xe,
          Oe = "undefined" != typeof window && "undefined" != typeof document,
          Te = ["Edge", "Trident", "Firefox"],
          Pe = 0;

      for (de = 0; de < Te.length; de += 1) if (Oe && navigator.userAgent.indexOf(Te[de]) >= 0) {
        Pe = 1;
        break;
      }

      ce = Oe && window.Promise, fe = ce ? n : i, he = Oe && !(!window.MSInputMethodContext || !document.documentMode), me = Oe && /MSIE 10/.test(navigator.userAgent), pe = function (e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
      }, ve = function () {
        function e(e, t) {
          var n, i;

          for (n = 0; n < t.length; n++) i = t[n], i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i);
        }

        return function (t, n, i) {
          return n && e(t.prototype, n), i && e(t, i), t;
        };
      }(), be = function (e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0
        }) : e[t] = n, e;
      }, ge = Object.assign || function (e) {
        var t, n, i;

        for (t = 1; t < arguments.length; t++) {
          n = arguments[t];

          for (i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i]);
        }

        return e;
      }, ye = Oe && /Firefox/i.test(navigator.userAgent), Me = ["auto-start", "auto", "auto-end", "top-start", "top", "top-end", "right-start", "right", "right-end", "bottom-end", "bottom", "bottom-start", "left-end", "left", "left-start"], _e = Me.slice(3), we = {
        FLIP: "flip",
        CLOCKWISE: "clockwise",
        COUNTERCLOCKWISE: "counterclockwise"
      }, Se = {
        shift: {
          order: 100,
          enabled: !0,
          fn: se
        },
        offset: {
          order: 200,
          enabled: !0,
          fn: ae,
          offset: 0
        },
        preventOverflow: {
          order: 300,
          enabled: !0,
          fn: oe,
          priority: ["left", "right", "top", "bottom"],
          padding: 5,
          boundariesElement: "scrollParent"
        },
        keepTogether: {
          order: 400,
          enabled: !0,
          fn: ne
        },
        arrow: {
          order: 500,
          enabled: !0,
          fn: J,
          element: "[x-arrow]"
        },
        flip: {
          order: 600,
          enabled: !0,
          fn: te,
          behavior: "flip",
          padding: 5,
          boundariesElement: "viewport",
          flipVariations: !1,
          flipVariationsByContent: !1
        },
        inner: {
          order: 700,
          enabled: !1,
          fn: le
        },
        hide: {
          order: 800,
          enabled: !0,
          fn: ue
        },
        computeStyle: {
          order: 850,
          enabled: !0,
          fn: Q,
          gpuAcceleration: !0,
          x: "bottom",
          y: "right"
        },
        applyStyle: {
          order: 900,
          enabled: !0,
          fn: Y,
          onLoad: X,
          gpuAcceleration: void 0
        }
      }, Ce = {
        placement: "bottom",
        positionFixed: !1,
        eventsEnabled: !0,
        removeOnDestroy: !1,
        onCreate: function () {},
        onUpdate: function () {},
        modifiers: Se
      }, xe = function () {
        function e(t, n) {
          var i,
              a = this,
              o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
          pe(this, e), this.scheduleUpdate = function () {
            return requestAnimationFrame(a.update);
          }, this.update = fe(this.update.bind(this)), this.options = ge({}, e.Defaults, o), this.state = {
            isDestroyed: !1,
            isCreated: !1,
            scrollParents: []
          }, this.reference = t && t.jquery ? t[0] : t, this.popper = n && n.jquery ? n[0] : n, this.options.modifiers = {}, Object.keys(ge({}, e.Defaults.modifiers, o.modifiers)).forEach(function (t) {
            a.options.modifiers[t] = ge({}, e.Defaults.modifiers[t] || {}, o.modifiers ? o.modifiers[t] : {});
          }), this.modifiers = Object.keys(this.options.modifiers).map(function (e) {
            return ge({
              name: e
            }, a.options.modifiers[e]);
          }).sort(function (e, t) {
            return e.order - t.order;
          }), this.modifiers.forEach(function (e) {
            e.enabled && r(e.onLoad) && e.onLoad(a.reference, a.popper, a.options, e, a.state);
          }), this.update(), i = this.options.eventsEnabled, i && this.enableEventListeners(), this.state.eventsEnabled = i;
        }

        return ve(e, [{
          key: "update",
          value: function () {
            return A.call(this);
          }
        }, {
          key: "destroy",
          value: function () {
            return B.call(this);
          }
        }, {
          key: "enableEventListeners",
          value: function () {
            return H.call(this);
          }
        }, {
          key: "disableEventListeners",
          value: function () {
            return q.call(this);
          }
        }]), e;
      }(), xe.Utils = ("undefined" != typeof window ? window : e).PopperUtils, xe.placements = Me, xe.Defaults = Ce, t.default = xe;
    }.call(t, n(12));
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      n(154);
    }

    var r, a, o, s, u, l, d, c, f, h;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(70), a = n.n(r);

    for (o in r) "default" !== o && function (e) {
      n.d(t, e, function () {
        return r[e];
      });
    }(o);

    s = n(155), u = n(0), l = !1, d = i, c = null, f = null, h = u(a.a, s.a, l, d, c, f), t.default = h.exports;
  }, function (e, t, n) {
    "use strict";

    var i, r;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), i = n(1), r = function (e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }(i), t.default = new r.default({
      name: "MdContent",
      props: {
        mdTag: {
          type: String,
          default: "div"
        }
      },
      render: function (e) {
        return e(this.mdTag, {
          staticClass: "md-content",
          class: [this.$mdActiveTheme],
          attrs: this.$attrs,
          on: this.$listeners
        }, this.$slots.default);
      }
    });
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    var r, a, o, s, u, l, d, c;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(1), a = i(r), o = n(27), s = i(o), u = n(58), l = i(u), d = n(59), c = i(d), t.default = new a.default({
      name: "MdDialog",
      components: {
        MdPortal: s.default,
        MdOverlay: l.default,
        MdFocusTrap: c.default
      },
      props: {
        mdActive: Boolean,
        mdBackdrop: {
          type: Boolean,
          default: !0
        },
        mdBackdropClass: {
          type: String,
          default: "md-dialog-overlay"
        },
        mdCloseOnEsc: {
          type: Boolean,
          default: !0
        },
        mdClickOutsideToClose: {
          type: Boolean,
          default: !0
        },
        mdFullscreen: {
          type: Boolean,
          default: !0
        },
        mdAnimateFromSource: Boolean
      },
      computed: {
        dialogClasses: function () {
          return {
            "md-dialog-fullscreen": this.mdFullscreen
          };
        }
      },
      watch: {
        mdActive: function (e) {
          var t = this;
          this.$nextTick().then(function () {
            e ? t.$emit("md-opened") : t.$emit("md-closed");
          });
        }
      },
      methods: {
        closeDialog: function () {
          this.$emit("update:mdActive", !1);
        },
        onClick: function () {
          this.mdClickOutsideToClose && this.closeDialog(), this.$emit("md-clicked-outside");
        },
        onEsc: function () {
          this.mdCloseOnEsc && this.closeDialog();
        }
      }
    });
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    var r, a, o, s, u, l;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(1), a = i(r), o = n(97), s = i(o), u = n(43), l = i(u), t.default = new a.default({
      name: "MdEmptyState",
      mixins: [l.default],
      props: s.default,
      computed: {
        emptyStateClasses: function () {
          return {
            "md-rounded": this.mdRounded
          };
        },
        emptyStateStyles: function () {
          if (this.mdRounded) {
            var e = this.mdSize + "px";
            return {
              width: e,
              height: e
            };
          }
        }
      }
    });
  }, function (e, t, n) {
    "use strict";

    var i, r, a;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), i = Object.assign || function (e) {
      var t, n, i;

      for (t = 1; t < arguments.length; t++) {
        n = arguments[t];

        for (i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i]);
      }

      return e;
    }, r = n(8), a = function (e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }(r), t.default = {
      name: "MdMenu",
      props: {
        mdActive: Boolean,
        mdAlignTrigger: Boolean,
        mdOffsetX: Number,
        mdOffsetY: Number,
        mdFullWidth: Boolean,
        mdDense: Boolean,
        mdDirection: i({
          type: String,
          default: "bottom-start"
        }, (0, a.default)("md-direction", ["top-end", "top-start", "bottom-end", "bottom-start"])),
        mdCloseOnSelect: {
          type: Boolean,
          default: !0
        },
        mdCloseOnClick: {
          type: Boolean,
          default: !1
        },
        mdSize: i({
          type: String,
          default: "small"
        }, (0, a.default)("md-size", ["auto", "small", "medium", "big", "huge"]))
      },
      data: function () {
        return {
          triggerEl: null,
          MdMenu: {
            instance: this,
            active: this.mdActive,
            direction: this.mdDirection,
            size: this.mdSize,
            alignTrigger: this.mdAlignTrigger,
            offsetX: this.mdOffsetX,
            offsetY: this.mdOffsetY,
            fullWidth: this.mdFullWidth,
            dense: this.mdDense,
            closeOnSelect: this.mdCloseOnSelect,
            closeOnClick: this.mdCloseOnClick,
            bodyClickObserver: null,
            windowResizeObserver: null,
            $el: this.$el
          }
        };
      },
      provide: function () {
        return {
          MdMenu: this.MdMenu
        };
      },
      computed: {
        isActive: function () {
          return this.MdMenu.active;
        }
      },
      watch: {
        mdActive: {
          immediate: !0,
          handler: function (e) {
            this.MdMenu.active = e;
          }
        },
        mdDirection: function (e) {
          this.MdMenu.direction = e;
        },
        mdSize: function (e) {
          this.MdMenu.size = e;
        },
        mdAlignTrigger: function (e) {
          this.MdMenu.alignTrigger = e;
        },
        mdOffsetX: function (e) {
          this.MdMenu.offsetX = e;
        },
        mdOffsetY: function (e) {
          this.MdMenu.offsetY = e;
        },
        isActive: function (e) {
          this.$emit("update:mdActive", e), e ? this.$emit("md-opened") : this.$emit("md-closed");
        },
        mdCloseOnSelect: function () {
          this.MdMenu.closeOnSelect = this.mdCloseOnSelect;
        },
        mdCloseOnClick: function () {
          this.MdMenu.closeOnClick = this.mdCloseOnClick;
        }
      },
      methods: {
        toggleContent: function (e) {
          this.MdMenu.active = !this.MdMenu.active;
        }
      },
      mounted: function () {
        var e = this;
        this.MdMenu.$el = this.$el, this.$nextTick().then(function () {
          e.triggerEl = e.$el.querySelector("[md-menu-trigger]"), e.triggerEl && e.triggerEl.addEventListener("click", e.toggleContent);
        });
      },
      beforeDestroy: function () {
        this.triggerEl && this.triggerEl.removeEventListener("click", this.toggleContent);
      }
    };
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    function r(e, t, n) {
      return t in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }) : e[t] = n, e;
    }

    var a, o, s, u, l, d, c, f, h, m, p, v, b, g;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), a = Object.assign || function (e) {
      var t, n, i;

      for (t = 1; t < arguments.length; t++) {
        n = arguments[t];

        for (i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i]);
      }

      return e;
    }, o = n(1), s = i(o), u = n(8), i(u), l = n(60), d = i(l), c = n(61), f = i(c), h = n(56), m = i(h), p = n(59), v = i(p), b = n(74), g = i(b), t.default = new s.default({
      name: "MdMenuContent",
      components: {
        MdPopover: m.default,
        MdFocusTrap: v.default,
        MdList: g.default
      },
      props: {
        mdListClass: [String, Boolean],
        mdContentClass: [String, Boolean]
      },
      inject: ["MdMenu"],
      data: function () {
        return {
          highlightIndex: -1,
          didMount: !1,
          highlightItems: [],
          popperSettings: null,
          menuStyles: ""
        };
      },
      computed: {
        filteredAttrs: function () {
          var e = this.$attrs;
          return delete e.id, e;
        },
        highlightedItem: function () {
          return this.highlightItems[this.highlightIndex];
        },
        shouldRender: function () {
          return this.MdMenu.active;
        },
        menuClasses: function () {
          var e,
              t = "md-menu-content-";
          return e = {}, r(e, t + this.MdMenu.direction, !0), r(e, t + this.MdMenu.size, !0), r(e, "md-menu-content", this.didMount), r(e, "md-shallow", !this.didMount), e;
        },
        listClasses: function () {
          return a({
            "md-dense": this.MdMenu.dense
          }, this.mdListClass);
        }
      },
      watch: {
        shouldRender: function (e) {
          var t = this;
          e && (this.setPopperSettings(), this.$nextTick().then(function () {
            t.setInitialHighlightIndex(), t.createClickEventObserver(), t.createResizeObserver(), t.createKeydownListener();
          }));
        }
      },
      methods: {
        setPopperSettings: function () {
          var e = this.MdMenu,
              t = e.direction,
              n = (e.alignTrigger, this.getOffsets()),
              i = n.offsetX,
              r = n.offsetY;
          this.hasCustomOffsets() || (this.MdMenu.instance.$el && this.MdMenu.instance.$el.offsetHeight && (r = -this.MdMenu.instance.$el.offsetHeight - 11), t.includes("start") ? i = -8 : t.includes("end") && (i = 8)), this.popperSettings = {
            placement: t,
            modifiers: {
              keepTogether: {
                enabled: !0
              },
              flip: {
                enabled: !1
              },
              offset: {
                offset: i + ", " + r
              }
            }
          };
        },
        setInitialHighlightIndex: function () {
          var e = this;
          this.setHighlightItems(), this.highlightItems.forEach(function (t, n) {
            t.classList.contains("md-selected") && (e.highlightIndex = n - 1);
          });
        },
        setHighlightItems: function () {
          if (this.$el.querySelectorAll) {
            var e = this.$el.querySelectorAll(".md-list-item-container:not(.md-list-item-default):not([disabled])");
            this.highlightItems = Array.from(e);
          }
        },
        setHighlight: function (e) {
          this.setHighlightItems(), this.highlightItems.length && ("down" === e ? this.highlightIndex === this.highlightItems.length - 1 ? this.highlightIndex = 0 : this.highlightIndex++ : 0 === this.highlightIndex ? this.highlightIndex = this.highlightItems.length - 1 : this.highlightIndex--, this.clearAllHighlights(), this.setItemHighlight());
        },
        clearAllHighlights: function () {
          this.highlightItems.forEach(function (e) {
            e.parentNode.__vue__.highlighted = !1;
          });
        },
        setItemHighlight: function () {
          this.highlightedItem && (this.highlightedItem.parentNode.__vue__.highlighted = !0, this.$parent.$parent.setOffsets && this.$parent.$parent.setOffsets(this.highlightedItem.parentNode));
        },
        setSelection: function () {
          this.highlightedItem && this.highlightedItem.parentNode.click();
        },
        onEsc: function () {
          this.MdMenu.active = !1, this.destroyKeyDownListener();
        },
        getOffsets: function () {
          var e = this.getBodyPosition(),
              t = this.MdMenu.offsetX || 0,
              n = this.MdMenu.offsetY || 0;
          return {
            offsetX: t - e.x,
            offsetY: n - e.y
          };
        },
        hasCustomOffsets: function () {
          var e = this.MdMenu,
              t = e.offsetX,
              n = e.offsetY;
          return !!(e.alignTrigger || n || t);
        },
        isMenu: function (e) {
          var t = e.target;
          return !!this.MdMenu.$el && this.MdMenu.$el.contains(t);
        },
        isMenuContentEl: function (e) {
          var t = e.target;
          return !!this.$refs.menu && this.$refs.menu.contains(t);
        },
        isBackdropExpectMenu: function (e) {
          return !this.$el.contains(e.target) && !this.isMenu(e);
        },
        createClickEventObserver: function () {
          var e = this;
          document && (this.MdMenu.bodyClickObserver = new d.default(document.body, "click", function (t) {
            t.stopPropagation(), e.isMenu(t) || !e.MdMenu.closeOnClick && !e.isBackdropExpectMenu(t) || (e.MdMenu.active = !1, e.MdMenu.bodyClickObserver.destroy(), e.MdMenu.windowResizeObserver.destroy(), e.destroyKeyDownListener());
          }));
        },
        createKeydownListener: function () {
          window.addEventListener("keydown", this.keyNavigation);
        },
        destroyKeyDownListener: function () {
          window.removeEventListener("keydown", this.keyNavigation);
        },
        keyNavigation: function (e) {
          switch (e.key) {
            case "ArrowUp":
              e.preventDefault(), this.setHighlight("up");
              break;

            case "ArrowDown":
              e.preventDefault(), this.setHighlight("down");
              break;

            case "Enter":
            case "Space":
              this.setSelection();
              break;

            case "Escape":
              this.onEsc();
          }
        },
        createResizeObserver: function () {
          this.MdMenu.windowResizeObserver = new f.default(window, this.setStyles);
        },
        setupWatchers: function () {
          this.$watch("MdMenu.direction", this.setPopperSettings), this.$watch("MdMenu.alignTrigger", this.setPopperSettings), this.$watch("MdMenu.offsetX", this.setPopperSettings), this.$watch("MdMenu.offsetY", this.setPopperSettings);
        },
        setStyles: function () {
          this.MdMenu.fullWidth && (this.menuStyles = "\n          width: " + this.MdMenu.instance.$el.offsetWidth + "px;\n          max-width: " + this.MdMenu.instance.$el.offsetWidth + "px\n        ");
        },
        getBodyPosition: function () {
          var e = document.body,
              t = e.getBoundingClientRect(),
              n = t.top;
          return {
            x: t.left + (void 0 !== window.pageXOffset ? window.pageXOffset : e.scrollLeft),
            y: n + (void 0 !== window.pageYOffset ? window.pageYOffset : e.scrollTop)
          };
        }
      },
      mounted: function () {
        var e = this;
        this.$nextTick().then(function () {
          e.setHighlightItems(), e.setupWatchers(), e.setStyles(), e.didMount = !0;
        });
      },
      beforeDestroy: function () {
        this.MdMenu.bodyClickObserver && this.MdMenu.bodyClickObserver.destroy(), this.MdMenu.windowResizeObserver && this.MdMenu.windowResizeObserver.destroy(), this.destroyKeyDownListener();
      }
    });
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      n(98);
    }

    var r, a, o, s, u, l, d, c, f, h;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(57), a = n.n(r);

    for (o in r) "default" !== o && function (e) {
      n.d(t, e, function () {
        return r[e];
      });
    }(o);

    s = n(99), u = n(0), l = !1, d = i, c = null, f = null, h = u(a.a, s.a, l, d, c, f), t.default = h.exports;
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    function r(e) {
      return e.hasOwnProperty("mdExpand") && !1 !== e.mdExpand;
    }

    function a(e, t) {
      if (r(e)) return {
        "md-expand": function () {
          return t["md-expand"][0];
        }
      };
    }

    function o(e) {
      return e.default.some(function (e) {
        return e.componentOptions && "md-button" === e.componentOptions.tag;
      });
    }

    function s(e) {
      var t = Object.keys(e),
          n = !1;
      return t.forEach(function (e) {
        h.default.includes(e) && (n = !0);
      }), n;
    }

    function u(e, t) {
      return e && e.$router && t.to;
    }

    function l(e, t, n, i) {
      return r(e) ? T.default : e.disabled ? _.default : u(t, e) ? (x.default.props = (0, p.default)(t, {
        target: String
      }), delete x.default.props.href, x.default) : e.href ? S.default : s(n) ? d(i) : b.default;
    }

    function d(e) {
      return o(e) ? y.default : _.default;
    }

    var c, f, h, m, p, v, b, g, y, M, _, w, S, C, x, O, T, P, D;

    Object.defineProperty(t, "__esModule", {
      value: !0
    }), c = Object.assign || function (e) {
      var t, n, i;

      for (t = 1; t < arguments.length; t++) {
        n = arguments[t];

        for (i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i]);
      }

      return e;
    }, f = n(100), h = i(f), m = n(29), p = i(m), v = n(178), b = i(v), g = n(182), y = i(g), M = n(184), _ = i(M), w = n(186), S = i(w), C = n(188), x = i(C), O = n(190), T = i(O), P = n(39), D = i(P), t.default = {
      name: "MdListItem",
      functional: !0,
      components: {
        MdButton: D.default
      },
      render: function (e, t) {
        var n = t.parent,
            i = t.props,
            r = t.listeners,
            o = t.data,
            s = t.slots,
            u = s(),
            d = l(i, n, r, u),
            f = "md-list-item";
        return o.staticClass && (f += " " + o.staticClass), e("li", c({}, o, {
          staticClass: f,
          on: r
        }), [e(d, {
          props: i,
          scopedSlots: a(i, u),
          staticClass: "md-list-item-container md-button-clean",
          on: r
        }, u.default)]);
      }
    };
  }, function (e, t, n) {
    "use strict";

    var i, r;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), i = n(30), r = function (e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }(i), t.default = {
      name: "MdListItemDefault",
      mixins: [r.default],
      methods: {
        toggleControl: function () {
          var e = this.$el.querySelector(".md-checkbox-container, .md-switch-container, .md-radio-container");
          e && e.click();
        }
      }
    };
  }, function (e, t, n) {
    "use strict";

    var i, r;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), i = n(16), r = function (e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }(i), t.default = {
      name: "MdListItemContent",
      components: {
        MdRipple: r.default
      },
      props: {
        mdDisabled: Boolean
      }
    };
  }, function (e, t, n) {
    "use strict";

    var i, r;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), i = n(30), r = function (e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }(i), t.default = {
      name: "MdListItemFakeButton",
      mixins: [r.default]
    };
  }, function (e, t, n) {
    "use strict";

    var i, r;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), i = n(30), r = function (e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }(i), t.default = {
      name: "MdListItemButton",
      mixins: [r.default]
    };
  }, function (e, t, n) {
    "use strict";

    var i, r;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), i = n(30), r = function (e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }(i), t.default = {
      name: "MdListItemLink",
      mixins: [r.default],
      props: {
        download: String,
        href: String,
        hreflang: String,
        ping: String,
        rel: String,
        target: String,
        type: String
      }
    };
  }, function (e, t, n) {
    "use strict";

    var i, r;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), i = n(30), r = function (e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }(i), t.default = {
      name: "MdListItemRouter",
      mixins: [r.default],
      computed: {
        routerProps: function () {
          return this.$props;
        }
      }
    };
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    var r, a, o, s, u, l;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(10), a = i(r), o = n(192), s = i(o), u = n(30), l = i(u), t.default = {
      name: "MdListItemExpand",
      components: {
        MdArrowDownIcon: s.default
      },
      mixins: [l.default],
      inject: ["MdList"],
      data: function () {
        return {
          expandStyles: {},
          showContent: !1
        };
      },
      props: {
        mdExpanded: Boolean
      },
      computed: {
        expandClasses: function () {
          return {
            "md-active": this.showContent
          };
        }
      },
      methods: {
        getChildrenSize: function () {
          var e = this.$refs.listExpand,
              t = 0;
          return Array.from(e.children).forEach(function (e) {
            t += e.offsetHeight;
          }), t;
        },
        fetchStyle: function () {
          var e = this;
          return new Promise(function (t) {
            (0, a.default)(function () {
              var n = 0;
              e.showContent || (n = "auto"), e.expandStyles = {
                height: n
              }, t();
            });
          });
        },
        toggleExpand: function () {
          var e = this;
          this.fetchStyle().then(function () {
            e.showContent = !e.showContent;
          });
        },
        open: function () {
          var e = this;
          if (this.showContent) return !1;
          this.fetchStyle().then(function () {
            return [e.showContent = !0];
          });
        },
        close: function () {
          var e = this;
          if (!this.showContent) return !1;
          this.fetchStyle().then(function () {
            e.showContent = !1;
          });
        }
      },
      watch: {
        mdExpanded: function () {
          this.mdExpanded ? this.open() : this.close();
        },
        showContent: function () {
          var e = this,
              t = this.showContent;
          this.$emit("update:mdExpanded", t), this.$nextTick(function () {
            return e.$emit(t ? "md-expanded" : "md-collapsed");
          }), t && this.MdList.expandATab(this);
        }
      },
      created: function () {
        this.MdList.pushExpandable(this);
      },
      mounted: function () {
        this.mdExpanded && this.open();
      },
      beforeDestroy: function () {
        this.MdList.removeExpandable(this);
      }
    };
  }, function (e, t, n) {
    "use strict";

    var i, r;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), i = n(13), r = function (e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }(i), t.default = {
      name: "MdArrowDownIcon",
      components: {
        MdIcon: r.default
      }
    };
  }, function (e, t, n) {
    "use strict";

    var i, r;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), i = n(1), r = function (e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }(i), t.default = new r.default({
      name: "MdToolbar",
      props: {
        mdElevation: {
          type: [String, Number],
          default: 4
        }
      }
    });
  }, function (e, t) {}, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement;
      e._self._c;
      return e._m(1);
    },
        r = [function () {
      var e = this,
          t = e.$createElement,
          n = e._self._c || t;
      return n("svg", {
        attrs: {
          height: "24",
          viewBox: "0 0 24 24",
          width: "24",
          xmlns: "http://www.w3.org/2000/svg"
        }
      }, [n("path", {
        attrs: {
          d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
        }
      }), e._v(" "), n("path", {
        attrs: {
          d: "M0 0h24v24H0z",
          fill: "none"
        }
      })]);
    }, function () {
      var e = this,
          t = e.$createElement;
      return (e._self._c || t)("md-icon", {
        staticClass: "md-icon-image"
      }, [e._m(0)]);
    }],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t, n) {
    "use strict";

    var i, r, a, o, s, u, l, d, c, f;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), i = n(51), r = n.n(i);

    for (a in i) "default" !== a && function (e) {
      n.d(t, e, function () {
        return i[e];
      });
    }(a);

    o = n(88), s = n(0), u = !1, l = null, d = null, c = null, f = s(r.a, o.a, u, l, d, c), t.default = f.exports;
  }, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement;
      e._self._c;
      return e._m(0);
    },
        r = [function () {
      var e = this,
          t = e.$createElement,
          n = e._self._c || t;
      return n("md-icon", {
        staticClass: "md-icon-image"
      }, [n("svg", {
        attrs: {
          height: "24",
          viewBox: "0 0 24 24",
          width: "24",
          xmlns: "http://www.w3.org/2000/svg"
        }
      }, [n("path", {
        attrs: {
          d: "M0 0h24v24H0zm0 0h24v24H0zm0 0h24v24H0zm0 0h24v24H0z",
          fill: "none"
        }
      }), e._v(" "), n("path", {
        attrs: {
          d: "M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"
        }
      })])]);
    }],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t, n) {
    "use strict";

    var i, r, a, o, s, u, l, d, c, f;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), i = n(52), r = n.n(i);

    for (a in i) "default" !== a && function (e) {
      n.d(t, e, function () {
        return i[e];
      });
    }(a);

    o = n(90), s = n(0), u = !1, l = null, d = null, c = null, f = s(r.a, o.a, u, l, d, c), t.default = f.exports;
  }, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement;
      e._self._c;
      return e._m(0);
    },
        r = [function () {
      var e = this,
          t = e.$createElement,
          n = e._self._c || t;
      return n("md-icon", {
        staticClass: "md-icon-image"
      }, [n("svg", {
        attrs: {
          height: "24",
          viewBox: "0 0 24 24",
          width: "24",
          xmlns: "http://www.w3.org/2000/svg"
        }
      }, [n("path", {
        attrs: {
          d: "M0 0h24v24H0z",
          fill: "none"
        }
      }), e._v(" "), n("path", {
        attrs: {
          d: "M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
        }
      })])]);
    }],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement,
          n = e._self._c || t;
      return n("div", {
        staticClass: "md-field",
        class: [e.$mdActiveTheme, e.fieldClasses],
        on: {
          blur: e.onBlur
        }
      }, [e._t("default"), e._v(" "), e.hasCounter ? n("span", {
        staticClass: "md-count"
      }, [e._v(e._s(e.valueLength) + " / " + e._s(e.MdField.maxlength || e.MdField.counter))]) : e._e(), e._v(" "), n("transition", {
        attrs: {
          name: "md-input-action",
          appear: ""
        }
      }, [e.hasValue && e.mdClearable ? n("md-button", {
        staticClass: "md-icon-button md-dense md-input-action md-clear",
        attrs: {
          tabindex: "-1",
          disabled: e.MdField.disabled
        },
        on: {
          click: e.clearInput
        }
      }, [n("md-clear-icon")], 1) : e._e()], 1), e._v(" "), n("transition", {
        attrs: {
          name: "md-input-action",
          appear: ""
        }
      }, [e.hasPasswordToggle ? n("md-button", {
        staticClass: "md-icon-button md-dense md-input-action md-toggle-password",
        attrs: {
          tabindex: "-1"
        },
        on: {
          click: e.togglePassword
        }
      }, [n(e.MdField.togglePassword ? "md-password-on-icon" : "md-password-off-icon")], 1) : e._e()], 1)], 2);
    },
        r = [],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement,
          n = e._self._c || t;
      return "checkbox" === e.attributes.type ? n("input", e._g(e._b({
        directives: [{
          name: "model",
          rawName: "v-model",
          value: e.model,
          expression: "model"
        }],
        staticClass: "md-input",
        attrs: {
          type: "checkbox"
        },
        domProps: {
          checked: Array.isArray(e.model) ? e._i(e.model, null) > -1 : e.model
        },
        on: {
          focus: e.onFocus,
          blur: e.onBlur,
          change: function (t) {
            var n,
                i,
                r = e.model,
                a = t.target,
                o = !!a.checked;
            Array.isArray(r) ? (n = null, i = e._i(r, n), a.checked ? i < 0 && (e.model = r.concat([n])) : i > -1 && (e.model = r.slice(0, i).concat(r.slice(i + 1)))) : e.model = o;
          }
        }
      }, "input", e.attributes, !1), e.listeners)) : "radio" === e.attributes.type ? n("input", e._g(e._b({
        directives: [{
          name: "model",
          rawName: "v-model",
          value: e.model,
          expression: "model"
        }],
        staticClass: "md-input",
        attrs: {
          type: "radio"
        },
        domProps: {
          checked: e._q(e.model, null)
        },
        on: {
          focus: e.onFocus,
          blur: e.onBlur,
          change: function (t) {
            e.model = null;
          }
        }
      }, "input", e.attributes, !1), e.listeners)) : n("input", e._g(e._b({
        directives: [{
          name: "model",
          rawName: "v-model",
          value: e.model,
          expression: "model"
        }],
        staticClass: "md-input",
        attrs: {
          type: e.attributes.type
        },
        domProps: {
          value: e.model
        },
        on: {
          focus: e.onFocus,
          blur: e.onBlur,
          input: function (t) {
            t.target.composing || (e.model = t.target.value);
          }
        }
      }, "input", e.attributes, !1), e.listeners));
    },
        r = [],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t, n) {
    "use strict";

    function i(e, t) {
      var n, i, s, u, l, d, c, f, h, m, p;
      if (arguments.length < 1) throw new TypeError("1 argument required, but only " + arguments.length + " present");
      if (n = Object(a.a)(e, t), i = n.getUTCFullYear(), s = t || {}, u = s.locale, l = u && u.options && u.options.firstWeekContainsDate, d = null == l ? 1 : Object(r.a)(l), !((c = null == s.firstWeekContainsDate ? d : Object(r.a)(s.firstWeekContainsDate)) >= 1 && c <= 7)) throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");
      return f = new Date(0), f.setUTCFullYear(i + 1, 0, c), f.setUTCHours(0, 0, 0, 0), h = Object(o.a)(f, t), m = new Date(0), m.setUTCFullYear(i, 0, c), m.setUTCHours(0, 0, 0, 0), p = Object(o.a)(m, t), n.getTime() >= h.getTime() ? i + 1 : n.getTime() >= p.getTime() ? i : i - 1;
    }

    var r, a, o;
    t.a = i, r = n(17), a = n(9), o = n(65);
  }, function (e, t) {}, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement,
          n = e._self._c || t;
      return n("md-portal", {
        attrs: {
          "md-attach-to-parent": e.mdAttachToParent
        }
      }, [n("transition", {
        attrs: {
          name: "md-overlay"
        }
      }, [e.mdActive ? n("div", e._g({
        staticClass: "md-overlay",
        class: e.overlayClasses
      }, e.$listeners)) : e._e()])], 1);
    },
        r = [],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      var t, n, i, a;
      if (arguments.length < 1) throw new TypeError("1 argument required, but only " + arguments.length + " present");
      return t = Object(r.a)(e), n = t.getFullYear(), i = t.getMonth(), a = new Date(0), a.setFullYear(n, i + 1, 0), a.setHours(0, 0, 0, 0), a.getDate();
    }

    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = i;
    var r = n(9);
  }, function (e, t, n) {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = {
      mdRounded: Boolean,
      mdSize: {
        type: Number,
        default: 420
      },
      mdIcon: String,
      mdLabel: String,
      mdDescription: String
    };
  }, function (e, t) {}, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement;
      return (e._self._c || t)("ul", e._g(e._b({
        staticClass: "md-list",
        class: [e.$mdActiveTheme]
      }, "ul", e.$attrs, !1), e.$listeners), [e._t("default")], 2);
    },
        r = [],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t, n) {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = ["click", "dblclick", "mousedown", "mouseup"];
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      n(463);
    }

    var r, a, o, s, u, l, d, c, f, h;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(216), a = n.n(r);

    for (o in r) "default" !== o && function (e) {
      n.d(t, e, function () {
        return r[e];
      });
    }(o);

    s = n(466), u = n(0), l = !1, d = i, c = null, f = null, h = u(a.a, s.a, l, d, c, f), t.default = h.exports;
  }, function (e, t, n) {
    "use strict";

    var i, r, a;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
      return typeof e;
    } : function (e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
    }, r = n(16), a = function (e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }(r), t.default = {
      components: {
        MdRipple: a.default
      },
      props: {
        model: [String, Boolean, Object, Number, Array],
        value: {
          type: [String, Boolean, Object, Number]
        },
        name: [String, Number],
        required: Boolean,
        disabled: Boolean,
        indeterminate: Boolean,
        trueValue: {
          default: !0
        },
        falseValue: {
          default: !1
        }
      },
      model: {
        prop: "model",
        event: "change"
      },
      data: function () {
        return {
          rippleActive: !1
        };
      },
      computed: {
        attrs: function () {
          var e = {
            id: this.id,
            name: this.name,
            disabled: this.disabled,
            required: this.required,
            "true-value": this.trueValue,
            "false-value": this.falseValue
          };
          return this.$options.propsData.hasOwnProperty("value") && (null !== this.value && "object" === i(this.value) || (e.value = null === this.value || void 0 === this.value ? "" : this.value + "")), e;
        },
        isSelected: function () {
          return this.isModelArray ? this.model.includes(this.value) : this.hasValue ? this.model === this.value : this.model === this.trueValue;
        },
        isModelArray: function () {
          return Array.isArray(this.model);
        },
        checkClasses: function () {
          return {
            "md-checked": this.isSelected,
            "md-disabled": this.disabled,
            "md-required": this.required,
            "md-indeterminate": this.indeterminate
          };
        },
        hasValue: function () {
          return this.$options.propsData.hasOwnProperty("value");
        }
      },
      methods: {
        removeItemFromModel: function (e) {
          var t = e.indexOf(this.value);
          -1 !== t && e.splice(t, 1);
        },
        handleArrayCheckbox: function () {
          var e = this.model;
          this.isSelected ? this.removeItemFromModel(e) : e.push(this.value), this.$emit("change", e);
        },
        handleSingleSelectCheckbox: function () {
          this.$emit("change", this.isSelected ? null : this.value);
        },
        handleSimpleCheckbox: function () {
          this.$emit("change", this.isSelected ? this.falseValue : this.trueValue);
        },
        toggleCheck: function () {
          this.disabled || (this.rippleActive = !0, this.isModelArray ? this.handleArrayCheckbox() : this.hasValue ? this.handleSingleSelectCheckbox() : this.handleSimpleCheckbox());
        }
      }
    };
  }, function (e, t, n) {
    "use strict";

    var i, r, a, o, s, u, l, d, c, f;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), i = n(69), r = n.n(i);

    for (a in i) "default" !== a && function (e) {
      n.d(t, e, function () {
        return i[e];
      });
    }(a);

    o = n(0), s = null, u = !1, l = null, d = null, c = null, f = o(r.a, s, u, l, d, c), t.default = f.exports;
  }, function (e, t, n) {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = {
      props: {
        mdSwipeable: Boolean,
        mdSwipeThreshold: {
          type: Number,
          default: 150
        },
        mdSwipeRestraint: {
          type: Number,
          default: 100
        },
        mdSwipeTime: {
          type: Number,
          default: 300
        }
      },
      data: function () {
        return {
          swipeStart: !1,
          swipeStartTime: null,
          swiped: null,
          touchPosition: {
            startX: 0,
            startY: 0
          }
        };
      },
      computed: {
        getSwipeElement: function () {
          return this.mdSwipeElement || window;
        }
      },
      methods: {
        handleTouchStart: function (e) {
          this.touchPosition.startX = e.touches[0].screenX, this.touchPosition.startY = e.touches[0].screenY, this.swipeStartTime = new Date(), this.swipeStart = !0;
        },
        handleTouchMove: function (e) {
          var t, n, i, r;
          this.swipeStart && (t = e.touches[0].screenX, n = e.touches[0].screenY, i = t - this.touchPosition.startX, r = n - this.touchPosition.startY, new Date() - this.swipeStartTime <= this.mdSwipeTime && (Math.abs(i) >= this.mdSwipeThreshold && Math.abs(r) <= this.mdSwipeRestraint ? this.swiped = i < 0 ? "left" : "right" : Math.abs(r) >= this.mdSwipeThreshold && Math.abs(i) <= this.mdSwipeRestraint && (this.swiped = r < 0 ? "up" : "down")));
        },
        handleTouchEnd: function () {
          this.touchPosition = {
            startX: 0,
            startY: 0
          }, this.swiped = null, this.swipeStart = !1;
        }
      },
      mounted: function () {
        this.mdSwipeable && (this.getSwipeElement.addEventListener("touchstart", this.handleTouchStart, !1), this.getSwipeElement.addEventListener("touchend", this.handleTouchEnd, !1), this.getSwipeElement.addEventListener("touchmove", this.handleTouchMove, !1));
      },
      beforeDestroy: function () {
        this.mdSwipeable && (this.getSwipeElement.removeEventListener("touchstart", this.handleTouchStart, !1), this.getSwipeElement.removeEventListener("touchend", this.handleTouchEnd, !1), this.getSwipeElement.removeEventListener("touchmove", this.handleTouchMove, !1));
      }
    };
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      n(162);
    }

    var r, a, o, s, u, l, d, c, f, h;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(71), a = n.n(r);

    for (o in r) "default" !== o && function (e) {
      n.d(t, e, function () {
        return r[e];
      });
    }(o);

    s = n(163), u = n(0), l = !1, d = i, c = null, f = null, h = u(a.a, s.a, l, d, c, f), t.default = h.exports;
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    var r, a, o, s;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(3), a = i(r), o = n(13), s = i(o), t.default = function (e) {
      (0, a.default)(e), e.component(s.default.name, s.default);
    };
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      n(166);
    }

    var r, a, o, s, u, l, d, c, f, h;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(72), a = n.n(r);

    for (o in r) "default" !== o && function (e) {
      n.d(t, e, function () {
        return r[e];
      });
    }(o);

    s = n(167), u = n(0), l = !1, d = i, c = null, f = null, h = u(a.a, s.a, l, d, c, f), t.default = h.exports;
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      n(168);
    }

    var r, a, o, s, u, l, d, c, f, h;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(73), a = n.n(r);

    for (o in r) "default" !== o && function (e) {
      n.d(t, e, function () {
        return r[e];
      });
    }(o);

    s = n(169), u = n(0), l = !1, d = i, c = null, f = null, h = u(a.a, s.a, l, d, c, f), t.default = h.exports;
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      n(177);
    }

    var r, a, o, s, u, l, d, c, f, h;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(75), a = n.n(r);

    for (o in r) "default" !== o && function (e) {
      n.d(t, e, function () {
        return r[e];
      });
    }(o);

    s = n(0), u = null, l = !1, d = i, c = null, f = null, h = s(a.a, u, l, d, c, f), t.default = h.exports;
  }, function (e, t, n) {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: !0
    });

    var i = function (e, t) {
      return !e || !1 !== e[t];
    };

    t.default = function (e, t, n) {
      var r = i(n, "leading"),
          a = (i(n, "trailing"), null),
          o = !1;
      return function () {
        var t = this,
            n = arguments,
            i = function () {
          return e.apply(t, n);
        };

        if (a) return o = !0, !1;
        r && i();
      };
    };
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      n(226);
    }

    var r, a, o, s, u, l, d, c, f, h;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(84), a = n.n(r);

    for (o in r) "default" !== o && function (e) {
      n.d(t, e, function () {
        return r[e];
      });
    }(o);

    s = n(227), u = n(0), l = !1, d = i, c = null, f = null, h = u(a.a, s.a, l, d, c, f), t.default = h.exports;
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    function r(e) {
      return e.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
    }

    function a(e) {
      return e && _.includes(r(e.tag));
    }

    function o(e) {
      return !!e && ("" === e.mdRight || !!e.mdRight);
    }

    function s(e, t) {
      return e && _.includes(e.slot) || a(t);
    }

    function u(e) {
      return JSON.stringify({
        persistent: e && e["md-persistent"],
        permanent: e && e["md-permanent"]
      });
    }

    function l(e, t, n, i, a) {
      var l = [],
          d = !1;
      return e && e.forEach(function (e) {
        var c,
            h,
            p,
            v = e.data,
            b = e.componentOptions;

        if (s(v, b)) {
          if (c = v.slot || r(b.tag), e.data.slot = c, "md-app-drawer" === c) {
            if (h = o(b.propsData), d) return void m.default.util.warn("There shouldn't be more than one drawer in a MdApp at one time.");
            d = !0, e.data.slot += "-" + (h ? "right" : "left"), e.key = u(v.attrs), h && (p = a(M.default, {
              props: f({}, e.data.attrs)
            }), p.data.slot = "md-app-drawer-right-previous", l.push(p));
          }

          e.data.provide = i.Ctor.options.provide, e.context = t, e.functionalContext = n, l.push(e);
        }
      }), l;
    }

    function d(e) {
      var t = e.filter(function (e) {
        return "md-app-drawer" === (e.data.slot || r(e.componentOptions.tag));
      });
      return t.length ? t : [];
    }

    function c(e) {
      var t = e && e["md-permanent"];
      return t && ("clipped" === t || "card" === t);
    }

    var f, h, m, p, v, b, g, y, M, _;

    Object.defineProperty(t, "__esModule", {
      value: !0
    }), f = Object.assign || function (e) {
      var t, n, i;

      for (t = 1; t < arguments.length; t++) {
        n = arguments[t];

        for (i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i]);
      }

      return e;
    }, h = n(2), m = i(h), p = n(237), v = i(p), b = n(240), g = i(b), y = n(243), M = i(y), _ = ["md-app-toolbar", "md-app-drawer", "md-app-content"], t.default = {
      name: "MdApp",
      functional: !0,
      render: function (e, t) {
        var n,
            i = t.children,
            r = t.props,
            a = t.data,
            o = v.default,
            s = e(o),
            u = s.context,
            h = s.functionalContext,
            m = s.componentOptions,
            p = l(i, u, h, m, e);
        return d(p).forEach(function (e) {
          e && c(e.data.attrs) && (o = g.default);
        }), n = {}, a.staticClass && a.staticClass.split(/\s+/).forEach(function (e) {
          0 !== e.length && (n[e] = !0);
        }), e(o, {
          attrs: r,
          class: f({}, n, a.class),
          style: f({}, a.staticStyle, a.style)
        }, p);
      }
    };
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    var r, a, o, s;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(1), a = i(r), o = n(114), s = i(o), t.default = new a.default({
      name: "MdAppSideDrawer",
      mixins: [s.default]
    });
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    function r(e, t, n) {
      return t in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }) : e[t] = n, e;
    }

    var a, o, s, u, l, d;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), a = Object.assign || function (e) {
      var t, n, i;

      for (t = 1; t < arguments.length; t++) {
        n = arguments[t];

        for (i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i]);
      }

      return e;
    }, o = n(10), s = i(o), u = n(8), l = i(u), d = ["fixed", "fixed-last", "reveal", "overlap", "flexible"], t.default = {
      props: {
        mdMode: a({
          type: String
        }, (0, l.default)("md-mode", d)),
        mdWaterfall: Boolean,
        mdScrollbar: {
          type: Boolean,
          default: !0
        }
      },
      data: function () {
        return {
          revealTimer: null,
          revealLastPos: 0,
          manualTick: !1,
          MdApp: {
            options: {
              mode: null,
              waterfall: !1,
              flexible: !1
            },
            toolbar: {
              element: null,
              titleElement: null,
              height: "0px",
              initialHeight: 0,
              top: 0,
              titleSize: 20,
              hasElevation: !0,
              revealActive: !1,
              fixedLastActive: !1,
              fixedLastHeight: !1,
              overlapOff: !1
            },
            drawer: {
              initialWidth: 0,
              active: !1,
              mode: "temporary",
              submode: null,
              width: 0,
              right: !1
            }
          }
        };
      },
      provide: function () {
        return {
          MdApp: this.MdApp
        };
      },
      computed: {
        isFixed: function () {
          return this.mdMode && "fixed" !== this.mdMode;
        },
        isDrawerMini: function () {
          return "persistent" === this.MdApp.drawer.mode && "mini" === this.MdApp.drawer.submode;
        },
        contentPadding: function () {
          this.MdApp.drawer;
          return this.MdApp.drawer.active && "persistent" === this.MdApp.drawer.mode && "full" === this.MdApp.drawer.submode ? this.MdApp.drawer.width : 0;
        },
        contentStyles: function () {
          return r({}, "padding-" + (this.MdApp.drawer.right ? "right" : "left"), this.contentPadding);
        },
        containerStyles: function () {
          var e = {};
          return this.isFixed && (e["margin-top"] = this.MdApp.toolbar.initialHeight + "px"), this.isDrawerMini && (e["padding-" + (this.MdApp.drawer.right ? "right" : "left")] = this.MdApp.drawer.active ? 0 : this.MdApp.drawer.initialWidth + "px"), e;
        },
        scrollerClasses: function () {
          if (this.mdScrollbar) return "md-scrollbar";
        },
        appClasses: function () {
          return {
            "md-waterfall": this.mdWaterfall,
            "md-flexible": "flexible" === this.mdMode,
            "md-fixed": "fixed" === this.mdMode,
            "md-fixed-last": "fixed-last" === this.mdMode,
            "md-reveal": "reveal" === this.mdMode,
            "md-overlap": "overlap" === this.mdMode,
            "md-drawer-active": this.MdApp.drawer.active
          };
        }
      },
      watch: {
        mdMode: function (e) {
          this.MdApp.options.mode = e;
        },
        mdWaterfall: function (e) {
          this.MdApp.options.waterfall = e, this.setToolbarElevation();
        }
      },
      methods: {
        setToolbarElevation: function () {
          this.MdApp.toolbar.hasElevation = !this.mdWaterfall;
        },
        setToolbarTimer: function (e) {
          var t = this;
          window.clearTimeout(this.revealTimer), this.revealTimer = window.setTimeout(function () {
            t.revealLastPos = e;
          }, 100);
        },
        setToolbarMarginAndHeight: function (e, t) {
          this.MdApp.toolbar.top = e, this.MdApp.toolbar.height = t;
        },
        getToolbarConstrants: function (e) {
          var t = this.MdApp.toolbar.element.offsetHeight,
              n = 10,
              i = t + n,
              r = e.target.scrollTop;
          return this.MdApp.toolbar.initialHeight || (this.MdApp.toolbar.initialHeight = t), {
            toolbarHeight: t,
            safeAmount: n,
            threshold: i,
            scrollTop: r,
            initialHeight: this.MdApp.toolbar.initialHeight
          };
        },
        handleWaterfallScroll: function (e) {
          var t = this.getToolbarConstrants(e),
              n = t.threshold,
              i = t.scrollTop,
              r = 4;
          "reveal" === this.mdMode && (r = n), this.MdApp.toolbar.hasElevation = i >= r;
        },
        handleFlexibleMode: function (e) {
          var t,
              n,
              i,
              r,
              a,
              o,
              s,
              u = this.getToolbarConstrants(e),
              l = u.scrollTop,
              d = u.initialHeight,
              c = this.MdApp.toolbar.element,
              f = c.querySelector(".md-toolbar-row:first-child"),
              h = f.offsetHeight,
              m = d - l,
              p = l < d - h;
          h && (c.style.height = p ? m + "px" : h + "px"), t = this.MdApp.toolbar.titleElement, t && (n = 20, i = this.MdApp.toolbar.titleSize, p ? (r = Math.max(0, 1 - (l - i) / (m + i + 1e-6)) * (i - n) + n, t.style.fontSize = r + "px") : t.style.fontSize = "20px"), a = this.getToolbarConstrants(e), o = a.threshold, s = a.toolbarHeight, this.setToolbarMarginAndHeight(l - o, s);
        },
        handleRevealMode: function (e) {
          var t = this.getToolbarConstrants(e),
              n = t.toolbarHeight,
              i = t.safeAmount,
              r = t.threshold,
              a = t.scrollTop;
          this.setToolbarTimer(a), this.setToolbarMarginAndHeight(a - r, n), this.MdApp.toolbar.revealActive = !(a >= r) || this.revealLastPos > a + i;
        },
        handleFixedLastMode: function (e) {
          var t = this.getToolbarConstrants(e),
              n = t.scrollTop,
              i = t.toolbarHeight,
              r = t.safeAmount,
              a = this.MdApp.toolbar.element,
              o = a.querySelector(".md-toolbar-row:first-child"),
              s = o.offsetHeight;
          this.setToolbarTimer(n), this.setToolbarMarginAndHeight(n - s, i), this.MdApp.toolbar.fixedLastHeight = s, this.MdApp.toolbar.fixedLastActive = !(n >= s) || this.revealLastPos > n + r;
        },
        handleOverlapMode: function (e) {
          var t = this.getToolbarConstrants(e),
              n = t.toolbarHeight,
              i = t.scrollTop,
              r = t.initialHeight,
              a = this.MdApp.toolbar.element,
              o = a.querySelector(".md-toolbar-row:first-child"),
              s = o.offsetHeight,
              u = r - i - 100 * i / (r - s - s / 1.5);
          s && (i < r - s && u >= s ? (this.MdApp.toolbar.overlapOff = !1, a.style.height = u + "px") : (this.MdApp.toolbar.overlapOff = !0, a.style.height = s + "px")), this.setToolbarMarginAndHeight(i, n);
        },
        handleModeScroll: function (e) {
          "reveal" === this.mdMode ? this.handleRevealMode(e) : "fixed-last" === this.mdMode ? this.handleFixedLastMode(e) : "overlap" === this.mdMode ? this.handleOverlapMode(e) : "flexible" === this.mdMode && this.handleFlexibleMode(e);
        },
        handleScroll: function (e) {
          var t = this;
          this.MdApp.toolbar.element && (0, s.default)(function () {
            t.mdWaterfall && t.handleWaterfallScroll(e), t.mdMode && t.handleModeScroll(e);
          });
        }
      },
      created: function () {
        this.MdApp.options.mode = this.mdMode, this.MdApp.options.waterfall = this.mdWaterfall, this.setToolbarElevation();
      },
      mounted: function () {
        var e = {
          target: {
            scrollTop: 0
          }
        };
        "reveal" === this.mdMode && (this.MdApp.toolbar.revealActive = !0, this.handleRevealMode(e)), "flexible" === this.mdMode && (this.MdApp.toolbar.revealActive = !0, this.handleFlexibleMode(e)), "fixed-last" === this.mdMode && (this.MdApp.toolbar.fixedLastActive = !0, this.handleFixedLastMode(e)), "overlap" === this.mdMode && this.handleOverlapMode(e);
      }
    };
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    var r, a, o, s;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(1), a = i(r), o = n(114), s = i(o), t.default = new a.default({
      name: "MdAppInternalDrawer",
      mixins: [s.default]
    });
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    var r, a, o, s, u;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = Object.assign || function (e) {
      var t, n, i;

      for (t = 1; t < arguments.length; t++) {
        n = arguments[t];

        for (i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i]);
      }

      return e;
    }, a = n(1), o = i(a), s = n(8), u = i(s), t.default = new o.default({
      name: "MdDrawer",
      props: {
        mdPermanent: r({
          type: String
        }, (0, u.default)("md-permanent", ["full", "clipped", "card"])),
        mdPersistent: r({
          type: String
        }, (0, u.default)("md-persistent", ["mini", "full"])),
        mdActive: Boolean,
        mdFixed: Boolean
      },
      computed: {
        drawerClasses: function () {
          var e = {
            "md-temporary": this.isTemporary,
            "md-persistent": this.mdPersistent,
            "md-permanent": this.mdPermanent,
            "md-active": this.mdActive,
            "md-fixed": this.mdFixed
          };
          return this.mdPermanent && (e["md-permanent-" + this.mdPermanent] = !0), this.mdPersistent && (e["md-persistent-" + this.mdPersistent] = !0), e;
        },
        isTemporary: function () {
          return !this.mdPermanent && !this.mdPersistent;
        }
      }
    });
  }, function (e, t, n) {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = {
      name: "MdAppToolbar",
      inject: ["MdApp"],
      computed: {
        toolbarClasses: function () {
          return {
            "md-no-elevation": !this.MdApp.toolbar.hasElevation,
            "md-reveal-active": this.MdApp.toolbar.revealActive,
            "md-fixed-last-active": this.MdApp.toolbar.fixedLastActive,
            "md-overlap-off": this.MdApp.toolbar.overlapOff
          };
        },
        toolbarStyles: function () {
          var e = {
            top: this.MdApp.toolbar.top + "px"
          };
          return this.MdApp.toolbar.fixedLastActive && (e.transform = "translate3D(0, " + this.MdApp.toolbar.fixedLastHeight + "px, 0)"), e;
        }
      },
      mounted: function () {
        var e = this.$el.querySelector(".md-title, .md-display-1, .md-display-2");
        this.MdApp.toolbar.element = this.$el, this.MdApp.toolbar.titleElement = e, e && (this.MdApp.toolbar.titleSize = parseInt(window.getComputedStyle(e).fontSize, 10));
      }
    };
  }, function (e, t, n) {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = {
      name: "MdAppContent",
      inject: ["MdApp"],
      computed: {
        showCard: function () {
          return this.MdApp.options && "overlap" === this.MdApp.options.mode;
        }
      }
    };
  }, function (e, t, n) {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = {
      name: "MdAppDrawer",
      inject: ["MdApp"],
      data: function () {
        return {
          drawerElement: {
            mdActive: null,
            mode: null,
            submode: null
          },
          initialized: !1
        };
      },
      props: {
        mdRight: {
          type: Boolean,
          default: !1
        },
        mdActive: {
          type: Boolean,
          default: !1
        }
      },
      computed: {
        visible: function () {
          return this.drawerElement.mdActive;
        },
        mode: function () {
          return this.drawerElement.mode;
        },
        submode: function () {
          return this.drawerElement.submode;
        }
      },
      watch: {
        visible: function (e) {
          this.MdApp.drawer.width = this.getDrawerWidth(), this.MdApp.drawer.active = e;
        },
        mode: function (e) {
          this.MdApp.drawer.mode = e;
        },
        submode: function (e) {
          this.MdApp.drawer.submode = e;
        },
        mdRight: function (e) {
          this.MdApp.drawer.right = e;
        }
      },
      methods: {
        getDrawerWidth: function () {
          return this.$el ? window.getComputedStyle(this.$el).width : 0;
        },
        updateDrawerData: function () {
          this.MdApp.drawer.width = this.getDrawerWidth(), this.MdApp.drawer.active = this.visible, this.MdApp.drawer.mode = this.mode, this.MdApp.drawer.submode = this.submode, this.MdApp.drawer.right = this.mdRight;
        },
        clearDrawerData: function () {
          this.MdApp.drawer.width = 0, this.MdApp.drawer.active = !1, this.MdApp.drawer.mode = "temporary", this.MdApp.drawer.submode = null, this.MdApp.drawer.initialWidth = 0;
        }
      },
      mounted: function () {
        var e = this;
        this.$nextTick().then(function () {
          e.MdApp.drawer.initialWidth = e.$el.offsetWidth, e.drawerElement = e.$refs.drawer, e.updateDrawerData(), e.initialized = !0;
        });
      },
      updated: function () {
        this.drawerElement = this.$refs.drawer;
      },
      beforeDestroy: function () {
        this.clearDrawerData();
      }
    };
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    function r(e, t, n) {
      return t in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }) : e[t] = n, e;
    }

    var a, o, s, u, l, d, c;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), a = Object.assign || function (e) {
      var t, n, i;

      for (t = 1; t < arguments.length; t++) {
        n = arguments[t];

        for (i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i]);
      }

      return e;
    }, o = n(1), s = i(o), u = n(8), l = i(u), d = n(256), c = i(d), t.default = new s.default({
      name: "MdBadge",
      components: {
        MdBadgeStandalone: c.default
      },
      props: {
        mdContent: [String, Number],
        mdPosition: a({
          type: String,
          default: "top"
        }, (0, l.default)("md-position", ["top", "bottom"])),
        mdDense: Boolean
      },
      computed: {
        hasDefaultSlot: function () {
          return !!this.$slots.default;
        },
        badgeClasses: function () {
          var e,
              t = this.getStaticClass(),
              n = this.$vnode.data.class;
          return a((e = {}, r(e, "md-position-" + this.mdPosition, !0), r(e, "md-dense", this.mdDense), e), t, n);
        },
        styles: function () {
          var e = this.$vnode.data.staticStyle,
              t = this.$vnode.data.style;
          return a({}, e, t);
        }
      },
      methods: {
        getStaticClass: function () {
          var e = this.$vnode.data.staticClass;
          return e ? function () {
            return e.split(" ").filter(function (e) {
              return e;
            }).reduce(function (e, t) {
              return e[t] = !0, e;
            }, {});
          }() : {};
        }
      }
    });
  }, function (e, t, n) {
    "use strict";

    var i, r;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), i = n(1), r = function (e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }(i), t.default = new r.default({
      name: "MdBadgeStandalone"
    });
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    var r, a, o, s, u, l, d, c;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
      return typeof e;
    } : function (e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
    }, a = Object.assign || function (e) {
      var t, n, i;

      for (t = 1; t < arguments.length; t++) {
        n = arguments[t];

        for (i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i]);
      }

      return e;
    }, o = n(263), s = i(o), u = n(264), l = i(u), d = n(8), c = i(d), t.default = {
      name: "MdAutocomplete",
      props: {
        value: {
          type: null,
          required: !0
        },
        mdDense: Boolean,
        mdLayout: a({
          type: String,
          default: "floating"
        }, (0, c.default)("md-layout", ["floating", "box"])),
        mdOpenOnFocus: {
          type: Boolean,
          default: !0
        },
        mdFuzzySearch: {
          type: Boolean,
          default: !0
        },
        mdOptions: {
          type: [Array, Promise],
          required: !0
        },
        mdInputName: String,
        mdInputId: String,
        mdInputMaxlength: [String, Number],
        mdInputPlaceholder: [String, Number]
      },
      data: function () {
        return {
          searchTerm: this.value,
          showMenu: !1,
          triggerPopover: !1,
          isPromisePending: !1,
          filteredAsyncOptions: []
        };
      },
      computed: {
        isBoxLayout: function () {
          return "box" === this.mdLayout;
        },
        fieldClasses: function () {
          if (this.isBoxLayout) return "md-autocomplete-box";
        },
        contentClasses: function () {
          if (this.isBoxLayout) return "md-autocomplete-box-content";
        },
        shouldFilter: function () {
          return this.mdOptions[0] && this.searchTerm;
        },
        filteredStaticOptions: function () {
          if (this.isPromise(this.mdOptions)) return !1;
          var e = this.mdOptions[0];

          if (this.shouldFilter) {
            if ("string" == typeof e) return this.filterByString();
            if ("object" === (void 0 === e ? "undefined" : r(e))) return this.filterByObject();
          }

          return this.mdOptions;
        },
        hasFilteredItems: function () {
          return this.filteredStaticOptions.length > 0 || this.filteredAsyncOptions.length > 0;
        },
        hasScopedEmptySlot: function () {
          return this.$scopedSlots["md-autocomplete-empty"];
        }
      },
      watch: {
        mdOptions: {
          deep: !0,
          immediate: !0,
          handler: function () {
            var e = this;
            this.isPromise(this.mdOptions) && (this.isPromisePending = !0, this.mdOptions.then(function (t) {
              e.filteredAsyncOptions = t, e.isPromisePending = !1;
            }));
          }
        },
        value: function (e) {
          this.searchTerm = e;
        }
      },
      methods: {
        getOptions: function () {
          return this.isPromise(this.mdOptions) ? this.filteredAsyncOptions : this.filteredStaticOptions;
        },
        isPromise: function (e) {
          return (0, l.default)(e);
        },
        matchText: function (e) {
          var t = e.toLowerCase(),
              n = this.searchTerm.toLowerCase();
          return this.mdFuzzySearch ? (0, s.default)(n, t) : t.includes(n);
        },
        filterByString: function () {
          var e = this;
          return this.mdOptions.filter(function (t) {
            return e.matchText(t);
          });
        },
        filterByObject: function () {
          var e = this;
          return this.mdOptions.filter(function (t) {
            var n,
                i = Object.values(t),
                r = i.length;

            for (n = 0; n <= r; n++) if ("string" == typeof i[n] && e.matchText(i[n])) return !0;
          });
        },
        openOnFocus: function () {
          this.mdOpenOnFocus && this.showOptions();
        },
        onInput: function (e) {
          this.$emit("input", e), this.mdOpenOnFocus || this.showOptions(), "inputevent" !== ("" + this.searchTerm.constructor).match(/function (\w*)/)[1].toLowerCase() && this.$emit("md-changed", this.searchTerm);
        },
        showOptions: function () {
          var e = this;
          if (this.showMenu) return !1;
          this.showMenu = !0, this.$nextTick(function () {
            e.triggerPopover = !0, e.$emit("md-opened");
          });
        },
        hideOptions: function () {
          var e = this;
          this.$nextTick(function () {
            e.triggerPopover = !1, e.$emit("md-closed");
          });
        },
        selectItem: function (e, t) {
          var n = t.target.textContent.trim();
          this.searchTerm = n, this.$emit("input", e), this.$emit("md-selected", e), this.hideOptions();
        }
      }
    };
  }, function (e, t, n) {
    "use strict";

    var i, r;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), i = n(1), r = function (e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }(i), t.default = new r.default({
      name: "MdAvatar"
    });
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    function r(e, t, n) {
      return t in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }) : e[t] = n, e;
    }

    var a, o, s, u, l, d, c;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), a = Object.assign || function (e) {
      var t, n, i;

      for (t = 1; t < arguments.length; t++) {
        n = arguments[t];

        for (i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i]);
      }

      return e;
    }, o = n(1), s = i(o), u = n(8), l = i(u), d = n(16), c = i(d), t.default = new s.default({
      name: "MdBottomBar",
      components: {
        MdRipple: c.default
      },
      props: {
        mdSyncRoute: Boolean,
        mdActiveItem: [String, Number],
        mdType: a({
          type: String,
          default: "fixed"
        }, (0, l.default)("md-type", ["fixed", "shift"]))
      },
      data: function () {
        return {
          MdBottomBar: {
            mouseEvent: null,
            activeItem: null,
            items: {},
            syncRoute: this.mdSyncRoute
          }
        };
      },
      provide: function () {
        return {
          MdBottomBar: this.MdBottomBar
        };
      },
      computed: {
        activeItem: function () {
          return this.MdBottomBar.activeItem;
        },
        barClasses: function () {
          return r({}, "md-type-" + this.mdType, !0);
        }
      },
      watch: {
        activeItem: function () {
          this.$emit("md-changed", this.activeItem);
        },
        mdSyncRoute: function (e) {
          function t() {
            return e.apply(this, arguments);
          }

          return t.toString = function () {
            return "" + e;
          }, t;
        }(function () {
          this.MdBottomBar.syncRoute = mdSyncRoute;
        })
      },
      methods: {
        hasActiveItem: function () {
          return this.MdBottomBar.activeItem || this.mdActiveItem;
        },
        getItemsAndKeys: function () {
          var e = this.MdBottomBar.items;
          return {
            items: e,
            keys: Object.keys(e)
          };
        },
        setActiveItemByIndex: function (e) {
          var t = this.getItemsAndKeys(),
              n = t.keys;
          this.mdActiveItem ? this.MdBottomBar.activeItem = this.mdActiveItem : this.MdBottomBar.activeItem = n[e];
        }
      },
      created: function () {
        this.MdBottomBar.type = this.mdType;
      },
      mounted: function () {
        var e = this;
        this.$nextTick().then(function () {
          e.mdSyncRoute || e.setActiveItemByIndex(0);
        });
      }
    });
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    var r, a, o, s, u, l, d, c, f, h;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = Object.assign || function (e) {
      var t, n, i;

      for (t = 1; t < arguments.length; t++) {
        n = arguments[t];

        for (i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i]);
      }

      return e;
    }, a = n(43), o = i(a), s = n(28), u = i(s), l = n(11), d = i(l), c = n(29), f = i(c), h = ["id", "mdLabel", "mdIcon", "mdDisabled"], t.default = {
      name: "MdBottomBarItem",
      mixins: [o.default, u.default],
      props: {
        id: {
          type: String,
          default: function () {
            return "md-bottom-bar-item-" + (0, d.default)();
          }
        },
        mdLabel: String,
        mdIcon: String,
        mdDisabled: Boolean
      },
      inject: ["MdBottomBar"],
      watch: {
        $props: {
          deep: !0,
          handler: function () {
            this.setItemData();
          }
        },
        $attrs: {
          deep: !0,
          handler: function () {
            this.setItemData();
          }
        }
      },
      computed: {
        itemClasses: function () {
          return {
            "md-active": this.id === this.MdBottomBar.activeItem
          };
        },
        attrs: function () {
          var e = this,
              t = r({}, this.$attrs);
          return Object.keys(this.$options.propsData).forEach(function (n) {
            h.includes(n) || (t[n] = e[n]);
          }), t;
        }
      },
      methods: {
        getPropValues: function () {
          var e = this,
              t = Object.keys(this.$options.props),
              n = {};
          return t.forEach(function (t) {
            h.includes(t) || (e[t] ? n[t] = e[t] : e.$attrs && e.$attrs.hasOwnProperty(t) && (n[t] = !t || e.$attrs[t]));
          }), n;
        },
        setItemData: function () {
          this.$set(this.MdBottomBar.items, this.id, {
            disabled: this.mdDisabled,
            options: this.mdTemplateOptions,
            props: this.getPropValues()
          });
        },
        setActiveItem: function (e) {
          this.MdBottomBar.syncRoute || (this.MdBottomBar.activeItem = this.id), "shift" === this.MdBottomBar.type && (this.MdBottomBar.mouseEvent = e);
        }
      },
      beforeCreate: function () {
        if (this.$router && this.$options.propsData.to) {
          var e = (0, f.default)(this, this.$options.props);
          this.$options.props = e;
        }
      },
      created: function () {
        this.setItemData();
      },
      beforeDestroy: function () {
        this.$delete(this.MdBottomBar.items, this.id);
      }
    };
  }, function (e, t, n) {
    "use strict";

    var i, r;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), i = n(1), r = function (e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }(i), t.default = new r.default({
      name: "MdCard",
      props: {
        mdWithHover: Boolean
      },
      data: function () {
        return {
          MdCard: {
            expand: !1
          }
        };
      },
      provide: function () {
        return {
          MdCard: this.MdCard
        };
      },
      computed: {
        cardClasses: function () {
          return {
            "md-with-hover": this.mdWithHover,
            "md-expand-active": this.MdCard.expand
          };
        }
      }
    });
  }, function (e, t, n) {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = {
      name: "MdCardArea",
      props: {
        mdInset: Boolean
      },
      computed: {
        areaClasses: function () {
          return {
            "md-inset": this.mdInset
          };
        }
      }
    };
  }, function (e, t, n) {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = {
      name: "MdCardHeader"
    };
  }, function (e, t, n) {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = {
      name: "MdCardHeaderText",
      data: function () {
        return {
          parentClasses: null
        };
      },
      mounted: function () {
        this.parentClasses = this.$parent.$el.classList, this.parentClasses.contains("md-card-header") && this.parentClasses.add("md-card-header-flex");
      },
      beforeDestroy: function () {
        this.parentClasses.remove("md-card-header-flex");
      }
    };
  }, function (e, t, n) {
    "use strict";

    var i, r, a, o;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), i = function () {
      function e(e, t) {
        var n,
            i,
            r = [],
            a = !0,
            o = !1,
            s = void 0;

        try {
          for (n = e[Symbol.iterator](); !(a = (i = n.next()).done) && (r.push(i.value), !t || r.length !== t); a = !0);
        } catch (e) {
          o = !0, s = e;
        } finally {
          try {
            !a && n.return && n.return();
          } finally {
            if (o) throw s;
          }
        }

        return r;
      }

      return function (t, n) {
        if (Array.isArray(t)) return t;
        if (Symbol.iterator in Object(t)) return e(t, n);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      };
    }(), r = Object.assign || function (e) {
      var t, n, i;

      for (t = 1; t < arguments.length; t++) {
        n = arguments[t];

        for (i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i]);
      }

      return e;
    }, a = n(8), o = function (e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }(a), t.default = {
      name: "MdCardMedia",
      props: {
        mdRatio: r({
          type: String
        }, (0, o.default)("md-ratio", ["16-9", "16/9", "16:9", "4-3", "4/3", "4:3", "1-1", "1/1", "1:1"])),
        mdMedium: Boolean,
        mdBig: Boolean
      },
      computed: {
        mediaClasses: function () {
          var e,
              t,
              n,
              r,
              a = {};
          return this.mdRatio && (e = this.getAspectRatio()) && (t = i(e, 2), n = t[0], r = t[1], a["md-ratio-" + n + "-" + r] = !0), (this.mdMedium || this.mdBig) && (a = {
            "md-medium": this.mdMedium,
            "md-big": this.mdBig
          }), a;
        }
      },
      methods: {
        getAspectRatio: function () {
          var e = [];
          return -1 !== this.mdRatio.indexOf(":") ? e = this.mdRatio.split(":") : -1 !== this.mdRatio.indexOf("/") ? e = this.mdRatio.split("/") : -1 !== this.mdRatio.indexOf("-") && (e = this.mdRatio.split("-")), 2 === e.length ? e : null;
        }
      }
    };
  }, function (e, t, n) {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = {
      name: "MdCardMediaActions"
    };
  }, function (e, t, n) {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = {
      name: "MdCardMediaCover",
      props: {
        mdTextScrim: Boolean,
        mdSolid: Boolean
      },
      data: function () {
        return {
          backdropBackground: {}
        };
      },
      computed: {
        coverClasses: function () {
          return {
            "md-text-scrim": this.mdTextScrim,
            "md-solid": this.mdSolid
          };
        },
        coverStyles: function () {
          return {
            background: this.backdropBackground
          };
        }
      },
      methods: {
        applyScrimColor: function (e) {
          this.$refs.backdrop && (this.backdropBackground = "linear-gradient(to bottom, rgba(0, 0, 0, 0) 20%, rgba(0, 0, 0, " + e / 2 + ") 66%, rgba(0, 0, 0, " + e + ") 100%)");
        },
        applySolidColor: function (e) {
          var t = this.$el.querySelector(".md-card-area");
          t && (t.style.background = "rgba(0, 0, 0, " + e + ")");
        },
        getImageLightness: function (e, t, n) {
          var i = document.createElement("canvas");
          e.crossOrigin = "Anonymous", e.onload = function () {
            var e,
                n,
                r = 0,
                a = void 0,
                o = void 0,
                s = void 0,
                u = void 0,
                l = void 0,
                d = void 0,
                c = void 0;

            for (i.width = this.width, i.height = this.height, a = i.getContext("2d"), a.drawImage(this, 0, 0), o = a.getImageData(0, 0, i.width, i.height), s = o.data, e = 0, n = s.length; e < n; e += 4) u = s[e], l = s[e + 1], d = s[e + 2], c = Math.floor((u + l + d) / 3), r += c;

            t(Math.floor(r / (this.width * this.height)));
          }, e.onerror = n;
        }
      },
      mounted: function () {
        var e = this,
            t = function () {
          var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : .6;
          e.mdTextScrim ? e.applyScrimColor(t) : e.mdSolid && e.applySolidColor(t);
        },
            n = this.$el.querySelector("img");

        n && (this.mdTextScrim || this.mdSolid) && this.getImageLightness(n, function (e) {
          var n = 256,
              i = (100 * Math.abs(n - e) / n + 15) / 100;
          i >= .7 && (i = .7), t(i);
        }, t);
      }
    };
  }, function (e, t, n) {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = {
      name: "MdCardContent"
    };
  }, function (e, t, n) {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = {
      name: "MdCardExpand",
      inject: ["MdCard"]
    };
  }, function (e, t, n) {
    "use strict";

    var i, r;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), i = Object.assign || function (e) {
      var t, n, i;

      for (t = 1; t < arguments.length; t++) {
        n = arguments[t];

        for (i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i]);
      }

      return e;
    }, r = function () {
      function e(e, t) {
        var n,
            i,
            r = [],
            a = !0,
            o = !1,
            s = void 0;

        try {
          for (n = e[Symbol.iterator](); !(a = (i = n.next()).done) && (r.push(i.value), !t || r.length !== t); a = !0);
        } catch (e) {
          o = !0, s = e;
        } finally {
          try {
            !a && n.return && n.return();
          } finally {
            if (o) throw s;
          }
        }

        return r;
      }

      return function (t, n) {
        if (Array.isArray(t)) return t;
        if (Symbol.iterator in Object(t)) return e(t, n);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      };
    }(), t.default = {
      name: "MdCardExpandTrigger",
      inject: ["MdCard"],
      render: function (e) {
        var t = this,
            n = r(this.$slots.default, 1),
            a = n[0],
            o = " md-card-expand-trigger",
            s = {
          click: function () {
            t.MdCard.expand = !t.MdCard.expand;
          }
        };
        return a ? (a.componentOptions.listeners = i({}, a.componentOptions.listeners, s), a.data.staticClass += o, a) : e("div", {
          staticClass: o,
          on: s
        });
      }
    };
  }, function (e, t, n) {
    "use strict";

    var i, r;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), i = n(48), r = function (e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }(i), t.default = {
      name: "MdCardExpandContent",
      inject: ["MdCard"],
      data: function () {
        return {
          marginTop: 0,
          resizeObserver: null,
          transitionEnabled: !0
        };
      },
      computed: {
        expand: function () {
          return this.MdCard.expand;
        },
        contentStyles: function () {
          return {
            "margin-top": "-" + this.marginTop + "px",
            opacity: 0 === this.marginTop ? 1 : 0,
            "transition-property": this.transitionEnabled ? null : "none"
          };
        }
      },
      methods: {
        calculateMarginTop: function () {
          this.expand ? this.marginTop = 0 : this.marginTop = this.$el.children[0].offsetHeight;
        },
        calculateMarginTopImmediately: function () {
          var e = this;
          this.expand || (this.transitionEnabled = !1, this.$nextTick(function () {
            e.calculateMarginTop(), e.$nextTick(function () {
              e.$el.offsetHeight, e.transitionEnabled = !0;
            });
          }));
        }
      },
      watch: {
        expand: function () {
          this.calculateMarginTop();
        }
      },
      mounted: function () {
        this.calculateMarginTopImmediately(), this.resizeObserver = (0, r.default)(this.$el, {
          childList: !0,
          characterData: !0,
          subtree: !0
        }, this.calculateMarginTopImmediately);
      },
      beforeDestroy: function () {
        this.resizeObserver.disconnect();
      }
    };
  }, function (e, t, n) {
    "use strict";

    var i, r, a, o;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), i = Object.assign || function (e) {
      var t, n, i;

      for (t = 1; t < arguments.length; t++) {
        n = arguments[t];

        for (i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i]);
      }

      return e;
    }, r = n(8), a = function (e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }(r), o = ["left", "right", "space-between"], t.default = {
      name: "MdCardActions",
      props: {
        mdAlignment: i({
          type: String,
          default: "right"
        }, (0, a.default)("md-alignment", o))
      }
    };
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    var r, a, o, s, u, l;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(1), a = i(r), o = n(102), s = i(o), u = n(11), l = i(u), t.default = new a.default({
      name: "MdCheckbox",
      mixins: [s.default],
      props: {
        id: {
          type: String,
          default: function () {
            return "md-checkbox-" + (0, l.default)();
          }
        }
      }
    });
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    var r, a, o, s, u, l, d, c, f, h, m;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = Object.assign || function (e) {
      var t, n, i;

      for (t = 1; t < arguments.length; t++) {
        n = arguments[t];

        for (i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i]);
      }

      return e;
    }, a = n(1), o = i(a), s = n(62), u = i(s), l = n(53), d = i(l), c = n(11), f = i(c), h = n(8), m = i(h), t.default = new o.default({
      name: "MdChips",
      components: {
        MdField: u.default,
        MdInput: d.default
      },
      props: {
        value: Array,
        id: {
          type: [String, Number],
          default: function () {
            return "md-chips-" + (0, f.default)();
          }
        },
        mdInputType: r({
          type: [String, Number]
        }, (0, m.default)("md-input-type", ["email", "number", "password", "search", "tel", "text", "url"])),
        mdPlaceholder: [String, Number],
        mdStatic: Boolean,
        mdLimit: Number,
        mdCheckDuplicated: {
          type: Boolean,
          default: !1
        },
        mdFormat: {
          type: Function
        }
      },
      data: function () {
        return {
          inputValue: "",
          duplicatedChip: null
        };
      },
      computed: {
        chipsClasses: function () {
          return {
            "md-has-value": this.value && this.value.length
          };
        },
        modelRespectLimit: function () {
          return !this.mdLimit || this.value.length < this.mdLimit;
        },
        formattedInputValue: function () {
          return this.mdFormat ? this.mdFormat(this.inputValue) : this.inputValue;
        }
      },
      methods: {
        insertChip: function (e) {
          var t = this,
              n = (e.target, this.formattedInputValue);

          if (n && this.modelRespectLimit) {
            if (this.value.includes(n)) return this.duplicatedChip = null, void this.$nextTick(function () {
              t.duplicatedChip = n;
            });
            this.value.push(n), this.$emit("input", this.value), this.$emit("md-insert", n), this.inputValue = "";
          }
        },
        removeChip: function (e) {
          var t = this,
              n = this.value.indexOf(e);
          this.value.splice(n, 1), this.$emit("input", this.value), this.$emit("md-delete", e, n), this.$nextTick(function () {
            return t.$refs.input.$el.focus();
          });
        },
        handleBackRemove: function () {
          this.inputValue || this.removeChip(this.value[this.value.length - 1]);
        },
        handleInput: function () {
          this.mdCheckDuplicated ? this.checkDuplicated() : this.duplicatedChip = null;
        },
        checkDuplicated: function () {
          return this.value.includes(this.formattedInputValue) ? !!this.mdCheckDuplicated && void (this.duplicatedChip = this.formattedInputValue) : (this.duplicatedChip = null, !1);
        }
      },
      watch: {
        value: function () {
          this.checkDuplicated();
        }
      }
    });
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    var r, a, o, s, u, l, d, c, f, h;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(1), a = i(r), o = n(41), s = i(o), u = n(38), l = i(u), d = n(63), c = i(d), f = n(39), h = i(f), t.default = new a.default({
      name: "MdChip",
      components: {
        MdButton: h.default,
        MdClearIcon: c.default
      },
      mixins: [s.default, l.default],
      props: {
        mdDisabled: Boolean,
        mdDeletable: Boolean,
        mdClickable: Boolean,
        mdDuplicated: {
          type: Boolean,
          default: !1
        }
      },
      computed: {
        chipClasses: function () {
          return {
            "md-disabled": this.mdDisabled,
            "md-deletable": this.mdDeletable,
            "md-clickable": this.mdClickable,
            "md-focused": this.mdHasFocus,
            "md-duplicated": this.mdDuplicated
          };
        }
      }
    });
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    var r, a, o, s, u, l, d, c, f, h, m, p, v, b, g, y, M, _, w, S, C, x, O, T, P, D;

    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
      return typeof e;
    } : function (e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
    }, a = Object.assign || function (e) {
      var t, n, i;

      for (t = 1; t < arguments.length; t++) {
        n = arguments[t];

        for (i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i]);
      }

      return e;
    }, o = n(2), s = i(o), u = n(327), l = i(u), d = n(328), c = i(d), f = n(329), h = i(f), m = n(143), p = i(m), v = n(8), b = i(v), g = n(58), y = i(g), M = n(330), _ = i(M), w = n(348), S = i(w), C = n(350), x = i(C), O = n(62), T = i(O), P = n(53), D = i(P), t.default = {
      name: "MdDatepicker",
      components: {
        MdOverlay: y.default,
        MdDateIcon: S.default,
        MdField: T.default,
        MdInput: D.default,
        MdDatepickerDialog: _.default
      },
      props: {
        value: [String, Number, Date],
        mdDisabledDates: [Array, Function],
        mdOpenOnFocus: {
          type: Boolean,
          default: !0
        },
        mdOverrideNative: {
          type: Boolean,
          default: !0
        },
        mdImmediately: {
          type: Boolean,
          default: !1
        },
        mdModelType: a({
          type: Function,
          default: Date
        }, (0, b.default)("md-model-type", [Date, String, Number])),
        MdDebounce: {
          type: Number,
          default: 1e3
        }
      },
      data: function () {
        return {
          showDialog: !1,
          inputDate: "",
          localDate: null
        };
      },
      computed: {
        locale: function () {
          return this.$material.locale;
        },
        type: function () {
          return this.mdOverrideNative ? "text" : "date";
        },
        dateFormat: function () {
          return this.locale.dateFormat || "yyyy-MM-dd";
        },
        modelType: function () {
          return this.isModelTypeString ? String : this.isModelTypeNumber ? Number : this.isModelTypeDate ? Date : this.mdModelType;
        },
        isModelNull: function () {
          return null === this.value || void 0 === this.value;
        },
        isModelTypeString: function () {
          return "string" == typeof this.value;
        },
        isModelTypeNumber: function () {
          return Number.isInteger(this.value) && this.value >= 0;
        },
        isModelTypeDate: function () {
          return "object" === r(this.value) && this.value instanceof Date && (0, p.default)(this.value);
        },
        localString: function () {
          return this.localDate && (0, c.default)(this.localDate, this.dateFormat);
        },
        localNumber: function () {
          return this.localDate && +this.localDate;
        },
        parsedInputDate: function () {
          var e = (0, h.default)(this.inputDate, this.dateFormat, new Date());
          return e && (0, p.default)(e) ? e : null;
        },
        pattern: function () {
          return this.dateFormat.replace(/yyyy|MM|dd/g, function (e) {
            switch (e) {
              case "yyyy":
                return "[0-9]{4}";

              case "MM":
              case "dd":
                return "[0-9]{2}";
            }
          });
        }
      },
      watch: {
        inputDate: function (e) {
          this.inputDateToLocalDate();
        },
        localDate: function () {
          this.inputDate = this.localString, this.modelType === Date && this.$emit("input", this.localDate);
        },
        localString: function () {
          this.modelType === String && this.$emit("input", this.localString);
        },
        localNumber: function () {
          this.modelType === Number && this.$emit("input", this.localNumber);
        },
        value: {
          immediate: !0,
          handler: function () {
            this.valueDateToLocalDate();
          }
        },
        mdModelType: function (e) {
          switch (e) {
            case Date:
              this.$emit("input", this.localDate);
              break;

            case String:
              this.$emit("input", this.localString);
              break;

            case Number:
              this.$emit("input", this.localNumber);
          }
        },
        dateFormat: function () {
          this.localDate && (this.inputDate = (0, c.default)(this.localDate, this.dateFormat));
        }
      },
      methods: {
        toggleDialog: function () {
          !l.default || this.mdOverrideNative ? (this.showDialog = !this.showDialog, this.showDialog ? this.$emit("md-opened") : this.$emit("md-closed")) : this.$refs.input.$el.click();
        },
        onFocus: function () {
          this.mdOpenOnFocus && this.toggleDialog();
        },
        inputDateToLocalDate: function () {
          this.inputDate ? this.parsedInputDate && (this.localDate = this.parsedInputDate) : this.localDate = null;
        },
        valueDateToLocalDate: function () {
          if (this.isModelNull) this.localDate = null;else if (this.isModelTypeNumber) this.localDate = new Date(this.value);else if (this.isModelTypeDate) this.localDate = this.value;else if (this.isModelTypeString) {
            var e = (0, h.default)(this.value, this.dateFormat, new Date());
            (0, p.default)(e) ? this.localDate = (0, h.default)(this.value, this.dateFormat, new Date()) : s.default.util.warn("The datepicker value is not a valid date. Given value: " + this.value + ", format: " + this.dateFormat);
          } else s.default.util.warn("The datepicker value is not a valid date. Given value: " + this.value);
        }
      },
      created: function () {
        this.inputDateToLocalDate = (0, x.default)(this.inputDateToLocalDate, this.MdDebounce);
      }
    };
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      var t,
          n = new Date(e.getTime()),
          i = n.getTimezoneOffset();
      return n.setSeconds(0, 0), t = n.getTime() % r, i * r + t;
    }

    t.a = i;
    var r = 6e4;
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      if (arguments.length < 1) throw new TypeError("1 argument required, but only " + arguments.length + " present");
      var t = Object(r.a)(e);
      return !isNaN(t);
    }

    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = i;
    var r = n(9);
  }, function (e, t, n) {
    "use strict";

    function i(e, t, n) {
      n = n || {};
      var i;
      return i = "string" == typeof d[e] ? d[e] : 1 === t ? d[e].one : d[e].other.replace("{{count}}", t), n.addSuffix ? n.comparison > 0 ? "in " + i : i + " ago" : i;
    }

    function r(e) {
      return function (t) {
        var n = t || {},
            i = n.width ? n.width + "" : e.defaultWidth;
        return e.formats[i] || e.formats[e.defaultWidth];
      };
    }

    function a(e, t, n, i) {
      return v[e];
    }

    function o(e) {
      return function (t, n) {
        var i,
            r,
            a = n || {},
            o = a.width ? a.width + "" : e.defaultWidth;
        return i = "formatting" == (a.context ? a.context + "" : "standalone") && e.formattingValues ? e.formattingValues[o] || e.formattingValues[e.defaultFormattingWidth] : e.values[o] || e.values[e.defaultWidth], r = e.argumentCallback ? e.argumentCallback(t) : t, i[r];
      };
    }

    function s(e, t) {
      var n = +e,
          i = n % 100;
      if (i > 20 || i < 10) switch (i % 10) {
        case 1:
          return n + "st";

        case 2:
          return n + "nd";

        case 3:
          return n + "rd";
      }
      return n + "th";
    }

    function u(e) {
      return function (t, n) {
        var i,
            r,
            a,
            o = t + "",
            s = n || {},
            u = s.width,
            d = u && e.matchPatterns[u] || e.matchPatterns[e.defaultMatchWidth],
            c = o.match(d);
        return c ? (i = c[0], r = u && e.parsePatterns[u] || e.parsePatterns[e.defaultParseWidth], a = "[object Array]" === Object.prototype.toString.call(r) ? r.findIndex(function (e) {
          return e.test(o);
        }) : l(r, function (e) {
          return e.test(o);
        }), a = e.valueCallback ? e.valueCallback(a) : a, a = s.valueCallback ? s.valueCallback(a) : a, {
          value: a,
          rest: o.slice(i.length)
        }) : null;
      };
    }

    function l(e, t) {
      for (var n in e) if (e.hasOwnProperty(n) && t(e[n])) return n;
    }

    var d = {
      lessThanXSeconds: {
        one: "less than a second",
        other: "less than {{count}} seconds"
      },
      xSeconds: {
        one: "1 second",
        other: "{{count}} seconds"
      },
      halfAMinute: "half a minute",
      lessThanXMinutes: {
        one: "less than a minute",
        other: "less than {{count}} minutes"
      },
      xMinutes: {
        one: "1 minute",
        other: "{{count}} minutes"
      },
      aboutXHours: {
        one: "about 1 hour",
        other: "about {{count}} hours"
      },
      xHours: {
        one: "1 hour",
        other: "{{count}} hours"
      },
      xDays: {
        one: "1 day",
        other: "{{count}} days"
      },
      aboutXMonths: {
        one: "about 1 month",
        other: "about {{count}} months"
      },
      xMonths: {
        one: "1 month",
        other: "{{count}} months"
      },
      aboutXYears: {
        one: "about 1 year",
        other: "about {{count}} years"
      },
      xYears: {
        one: "1 year",
        other: "{{count}} years"
      },
      overXYears: {
        one: "over 1 year",
        other: "over {{count}} years"
      },
      almostXYears: {
        one: "almost 1 year",
        other: "almost {{count}} years"
      }
    },
        c = {
      full: "EEEE, MMMM do, y",
      long: "MMMM do, y",
      medium: "MMM d, y",
      short: "MM/dd/yyyy"
    },
        f = {
      full: "h:mm:ss a zzzz",
      long: "h:mm:ss a z",
      medium: "h:mm:ss a",
      short: "h:mm a"
    },
        h = {
      full: "{{date}} 'at' {{time}}",
      long: "{{date}} 'at' {{time}}",
      medium: "{{date}}, {{time}}",
      short: "{{date}}, {{time}}"
    },
        m = {
      date: r({
        formats: c,
        defaultWidth: "full"
      }),
      time: r({
        formats: f,
        defaultWidth: "full"
      }),
      dateTime: r({
        formats: h,
        defaultWidth: "full"
      })
    },
        p = m,
        v = {
      lastWeek: "'last' eeee 'at' p",
      yesterday: "'yesterday at' p",
      today: "'today at' p",
      tomorrow: "'tomorrow at' p",
      nextWeek: "eeee 'at' p",
      other: "P"
    },
        b = {
      narrow: ["B", "A"],
      abbreviated: ["BC", "AD"],
      wide: ["Before Christ", "Anno Domini"]
    },
        g = {
      narrow: ["1", "2", "3", "4"],
      abbreviated: ["Q1", "Q2", "Q3", "Q4"],
      wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
    },
        y = {
      narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
      abbreviated: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      wide: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    },
        M = {
      narrow: ["S", "M", "T", "W", "T", "F", "S"],
      short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
      abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      wide: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    },
        _ = {
      narrow: {
        am: "a",
        pm: "p",
        midnight: "mi",
        noon: "n",
        morning: "morning",
        afternoon: "afternoon",
        evening: "evening",
        night: "night"
      },
      abbreviated: {
        am: "AM",
        pm: "PM",
        midnight: "midnight",
        noon: "noon",
        morning: "morning",
        afternoon: "afternoon",
        evening: "evening",
        night: "night"
      },
      wide: {
        am: "a.m.",
        pm: "p.m.",
        midnight: "midnight",
        noon: "noon",
        morning: "morning",
        afternoon: "afternoon",
        evening: "evening",
        night: "night"
      }
    },
        w = {
      narrow: {
        am: "a",
        pm: "p",
        midnight: "mi",
        noon: "n",
        morning: "in the morning",
        afternoon: "in the afternoon",
        evening: "in the evening",
        night: "at night"
      },
      abbreviated: {
        am: "AM",
        pm: "PM",
        midnight: "midnight",
        noon: "noon",
        morning: "in the morning",
        afternoon: "in the afternoon",
        evening: "in the evening",
        night: "at night"
      },
      wide: {
        am: "a.m.",
        pm: "p.m.",
        midnight: "midnight",
        noon: "noon",
        morning: "in the morning",
        afternoon: "in the afternoon",
        evening: "in the evening",
        night: "at night"
      }
    },
        S = {
      ordinalNumber: s,
      era: o({
        values: b,
        defaultWidth: "wide"
      }),
      quarter: o({
        values: g,
        defaultWidth: "wide",
        argumentCallback: function (e) {
          return +e - 1;
        }
      }),
      month: o({
        values: y,
        defaultWidth: "wide"
      }),
      day: o({
        values: M,
        defaultWidth: "wide"
      }),
      dayPeriod: o({
        values: _,
        defaultWidth: "wide",
        formattingValues: w,
        defaultFormattingWidth: "wide"
      })
    },
        C = S,
        x = /^(\d+)(th|st|nd|rd)?/i,
        O = /\d+/i,
        T = {
      narrow: /^(b|a)/i,
      abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
      wide: /^(before christ|before common era|anno domini|common era)/i
    },
        P = {
      any: [/^b/i, /^(a|c)/i]
    },
        D = {
      narrow: /^[1234]/i,
      abbreviated: /^q[1234]/i,
      wide: /^[1234](th|st|nd|rd)? quarter/i
    },
        j = {
      any: [/1/i, /2/i, /3/i, /4/i]
    },
        k = {
      narrow: /^[jfmasond]/i,
      abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
      wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
    },
        $ = {
      narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
      any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^may/i, /^jun/i, /^jul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
    },
        E = {
      narrow: /^[smtwf]/i,
      short: /^(su|mo|tu|we|th|fr|sa)/i,
      abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
      wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
    },
        A = {
      narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
      any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
    },
        I = {
      narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
      any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
    },
        F = {
      any: {
        am: /^a/i,
        pm: /^p/i,
        midnight: /^mi/i,
        noon: /^no/i,
        morning: /morning/i,
        afternoon: /afternoon/i,
        evening: /evening/i,
        night: /night/i
      }
    },
        B = {
      ordinalNumber: function (e) {
        return function (t, n) {
          var i,
              r,
              a,
              o = t + "",
              s = n || {},
              u = o.match(e.matchPattern);
          return u ? (i = u[0], (r = o.match(e.parsePattern)) ? (a = e.valueCallback ? e.valueCallback(r[0]) : r[0], a = s.valueCallback ? s.valueCallback(a) : a, {
            value: a,
            rest: o.slice(i.length)
          }) : null) : null;
        };
      }({
        matchPattern: x,
        parsePattern: O,
        valueCallback: function (e) {
          return parseInt(e, 10);
        }
      }),
      era: u({
        matchPatterns: T,
        defaultMatchWidth: "wide",
        parsePatterns: P,
        defaultParseWidth: "any"
      }),
      quarter: u({
        matchPatterns: D,
        defaultMatchWidth: "wide",
        parsePatterns: j,
        defaultParseWidth: "any",
        valueCallback: function (e) {
          return e + 1;
        }
      }),
      month: u({
        matchPatterns: k,
        defaultMatchWidth: "wide",
        parsePatterns: $,
        defaultParseWidth: "any"
      }),
      day: u({
        matchPatterns: E,
        defaultMatchWidth: "wide",
        parsePatterns: A,
        defaultParseWidth: "any"
      }),
      dayPeriod: u({
        matchPatterns: I,
        defaultMatchWidth: "any",
        parsePatterns: F,
        defaultParseWidth: "any"
      })
    },
        L = B,
        R = {
      formatDistance: i,
      formatLong: p,
      formatRelative: a,
      localize: C,
      match: L,
      options: {
        weekStartsOn: 0,
        firstWeekContainsDate: 1
      }
    };
    t.a = R;
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      var t, n;
      if (arguments.length < 1) throw new TypeError("1 argument required, but only " + arguments.length + " present");
      return t = Object(u.a)(e), n = new Date(0), n.setUTCFullYear(t, 0, 4), n.setUTCHours(0, 0, 0, 0), Object(s.a)(n);
    }

    function r(e) {
      var t, n;
      if (arguments.length < 1) throw new TypeError("1 argument required, but only " + arguments.length + " present");
      return t = Object(o.a)(e), n = Object(s.a)(t).getTime() - i(t).getTime(), Math.round(n / a) + 1;
    }

    var a,
        o = n(9),
        s = n(64),
        u = n(146);
    t.a = r, a = 6048e5;
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      var t, n, i, o, s, u;
      if (arguments.length < 1) throw new TypeError("1 argument required, but only " + arguments.length + " present");
      return t = Object(r.a)(e), n = t.getUTCFullYear(), i = new Date(0), i.setUTCFullYear(n + 1, 0, 4), i.setUTCHours(0, 0, 0, 0), o = Object(a.a)(i), s = new Date(0), s.setUTCFullYear(n, 0, 4), s.setUTCHours(0, 0, 0, 0), u = Object(a.a)(s), t.getTime() >= o.getTime() ? n + 1 : t.getTime() >= u.getTime() ? n : n - 1;
    }

    var r, a;
    t.a = i, r = n(9), a = n(64);
  }, function (e, t, n) {
    "use strict";

    function i(e, t) {
      var n, i, r, a, o, d, c;
      if (arguments.length < 1) throw new TypeError("1 argument required, but only " + arguments.length + " present");
      return n = t || {}, i = n.locale, r = i && i.options && i.options.firstWeekContainsDate, a = null == r ? 1 : Object(u.a)(r), o = null == n.firstWeekContainsDate ? a : Object(u.a)(n.firstWeekContainsDate), d = Object(l.a)(e, t), c = new Date(0), c.setUTCFullYear(d, 0, o), c.setUTCHours(0, 0, 0, 0), Object(s.a)(c, t);
    }

    function r(e, t) {
      var n, r;
      if (arguments.length < 1) throw new TypeError("1 argument required, but only " + arguments.length + " present");
      return n = Object(o.a)(e), r = Object(s.a)(n, t).getTime() - i(n, t).getTime(), Math.round(r / a) + 1;
    }

    var a,
        o = n(9),
        s = n(65),
        u = n(17),
        l = n(93);
    t.a = r, a = 6048e5;
  }, function (e, t, n) {
    "use strict";

    function i(e, t) {
      var n, i;
      if (arguments.length < 2) throw new TypeError("2 arguments required, but only " + arguments.length + " present");
      return n = Object(o.a)(e).getTime(), i = Object(a.a)(t), new Date(n + i);
    }

    function r(e, t) {
      if (arguments.length < 2) throw new TypeError("2 arguments required, but only " + arguments.length + " present");
      return i(e, -Object(a.a)(t));
    }

    var a = n(17),
        o = n(9);
    t.a = r;
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      return -1 !== a.indexOf(e);
    }

    function r(e) {
      throw new RangeError("`options.awareOfUnicodeTokens` must be set to `true` to use `" + e + "` token; see: https://git.io/fxCyr");
    }

    t.a = i, t.b = r;
    var a = ["D", "DD", "YY", "YYYY"];
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    var r, a, o, s, u, l, d, c, f, h, m, p, v, b, g, y, M, _, w, S, C, x, O, T, P, D, j, k, $, E, A, I, F, B, L, R, N, H;

    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(151), a = i(r), o = n(332), s = i(o), u = n(333), l = i(u), d = n(334), c = i(d), f = n(335), h = i(f), m = n(96), p = i(m), v = n(336), b = i(v), g = n(337), y = i(g), M = n(338), _ = i(M), w = n(339), S = i(w), C = n(340), x = i(C), O = n(341), T = i(O), P = n(342), D = i(P), j = n(1), k = i(j), $ = n(56), E = i($), A = n(343), I = i(A), F = n(345), B = i(F), L = n(68), R = i(L), N = 7, H = function (e, t) {
      return !(!e || !e.querySelector) && e.querySelectorAll(t);
    }, t.default = new k.default({
      name: "MdDatepickerDialog",
      components: {
        MdPopover: E.default,
        MdArrowRightIcon: I.default,
        MdArrowLeftIcon: B.default,
        MdDialog: R.default
      },
      props: {
        mdDate: Date,
        mdDisabledDates: [Array, Function],
        mdImmediately: {
          type: Boolean,
          default: !1
        }
      },
      data: function () {
        return {
          currentDate: null,
          selectedDate: null,
          showDialog: !1,
          monthAction: null,
          currentView: "day",
          contentStyles: {},
          availableYears: null
        };
      },
      computed: {
        firstDayOfAWeek: function () {
          var e = +this.locale.firstDayOfAWeek;
          return Number.isNaN(e) || !Number.isFinite(e) ? 0 : (e = Math.floor(e) % N, e += e < 0 ? N : 0, e);
        },
        locale: function () {
          return this.$material.locale;
        },
        popperSettings: function () {
          return {
            placement: "bottom-start",
            modifiers: {
              keepTogether: {
                enabled: !0
              },
              flip: {
                enabled: !1
              }
            }
          };
        },
        calendarClasses: function () {
          return "next" === this.monthAction ? "md-next" : "md-previous";
        },
        firstDayOfMonth: function () {
          return (0, s.default)(this.currentDate).getDay();
        },
        prefixEmptyDays: function () {
          var e = this.firstDayOfMonth - this.firstDayOfAWeek;
          return e += e < 0 ? N : 0, e;
        },
        daysInMonth: function () {
          return (0, p.default)(this.currentDate);
        },
        currentDay: function () {
          return this.selectedDate ? (0, c.default)(this.selectedDate) : (0, c.default)(this.currentDate);
        },
        currentMonth: function () {
          return (0, b.default)(this.currentDate);
        },
        currentMonthName: function () {
          return this.locale.months[this.currentMonth];
        },
        currentYear: function () {
          return (0, y.default)(this.currentDate);
        },
        selectedYear: function () {
          return this.selectedDate ? (0, y.default)(this.selectedDate) : (0, y.default)(this.currentDate);
        },
        shortDayName: function () {
          return this.selectedDate ? this.locale.shortDays[(0, h.default)(this.selectedDate)] : this.locale.shortDays[(0, h.default)(this.currentDate)];
        },
        shortMonthName: function () {
          return this.selectedDate ? this.locale.shortMonths[(0, b.default)(this.selectedDate)] : this.locale.shortMonths[(0, b.default)(this.currentDate)];
        }
      },
      watch: {
        mdDate: function () {
          this.currentDate = this.mdDate || new Date(), this.selectedDate = this.mdDate;
        },
        currentDate: function (e, t) {
          var n = this;
          this.$nextTick().then(function () {
            t && n.setContentStyles();
          });
        },
        currentView: function () {
          var e = this;
          this.$nextTick().then(function () {
            if ("year" === e.currentView) {
              var t = H(e.$el, ".md-datepicker-year-button.md-datepicker-selected");
              t.length && t[0].scrollIntoView({
                behavior: "instant",
                block: "center",
                inline: "center"
              });
            }
          });
        }
      },
      methods: {
        setContentStyles: function () {
          var e,
              t = H(this.$el, ".md-datepicker-month");
          t.length && (e = t[t.length - 1], this.contentStyles = {
            height: e.offsetHeight + 10 + "px"
          });
        },
        setAvailableYears: function () {
          for (var e = this.locale, t = e.startYear, n = e.endYear, i = t, r = []; i <= n;) r.push(i++);

          this.availableYears = r;
        },
        handleDisabledDateByArray: function (e) {
          return this.mdDisabledDates.some(function (t) {
            return (0, S.default)(t, e);
          });
        },
        isDisabled: function (e) {
          if (this.mdDisabledDates) {
            var t = (0, x.default)(this.currentDate, e);
            if (Array.isArray(this.mdDisabledDates)) return this.handleDisabledDateByArray(t);
            if ("function" == typeof this.mdDisabledDates) return this.mdDisabledDates(t);
          }
        },
        isSelectedDay: function (e) {
          return (0, _.default)(this.selectedDate, (0, x.default)(this.currentDate, e));
        },
        isToday: function (e) {
          return (0, S.default)(new Date(), (0, x.default)(this.currentDate, e));
        },
        previousMonth: function () {
          this.monthAction = "previous", this.currentDate = (0, l.default)(this.currentDate, 1);
        },
        nextMonth: function () {
          this.monthAction = "next", this.currentDate = (0, a.default)(this.currentDate, 1);
        },
        switchMonth: function (e) {
          this.currentDate = (0, T.default)(this.currentDate, e), this.currentView = "day";
        },
        switchYear: function (e) {
          this.currentDate = (0, D.default)(this.currentDate, e), this.currentView = "month";
        },
        selectDate: function (e) {
          this.currentDate = (0, x.default)(this.currentDate, e), this.selectedDate = this.currentDate, this.mdImmediately && (this.$emit("update:mdDate", this.selectedDate), this.closeDialog());
        },
        closeDialog: function () {
          this.$emit("md-closed");
        },
        onClose: function () {
          this.closeDialog();
        },
        onCancel: function () {
          this.closeDialog();
        },
        onConfirm: function () {
          this.$emit("update:mdDate", this.selectedDate), this.closeDialog();
        },
        resetDate: function () {
          this.currentDate = this.mdDate || new Date(), this.selectedDate = this.mdDate, this.currentView = "day";
        }
      },
      created: function () {
        this.setAvailableYears(), this.resetDate();
      }
    });
  }, function (e, t, n) {
    "use strict";

    function i(e, t) {
      var n, i, s, u, l;
      if (arguments.length < 2) throw new TypeError("2 arguments required, but only " + arguments.length + " present");
      return n = Object(a.a)(e), i = Object(r.a)(t), s = n.getMonth() + i, u = new Date(0), u.setFullYear(n.getFullYear(), s, 1), u.setHours(0, 0, 0, 0), l = Object(o.default)(u), n.setMonth(s, Math.min(l, n.getDate())), n;
    }

    var r, a, o;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = i, r = n(17), a = n(9), o = n(96);
  }, function (e, t, n) {
    "use strict";

    var i, r;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), i = n(13), r = function (e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }(i), t.default = {
      name: "MdArrowRightIcon",
      components: {
        MdIcon: r.default
      }
    };
  }, function (e, t, n) {
    "use strict";

    var i, r;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), i = n(13), r = function (e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }(i), t.default = {
      name: "MdArrowLeftIcon",
      components: {
        MdIcon: r.default
      }
    };
  }, function (e, t) {}, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement,
          n = e._self._c || t;
      return n("md-portal", [n("transition", {
        attrs: {
          name: "md-dialog"
        }
      }, [e.mdActive ? n("div", e._g({
        staticClass: "md-dialog",
        class: [e.dialogClasses, e.$mdActiveTheme],
        on: {
          keydown: function (t) {
            return !t.type.indexOf("key") && e._k(t.keyCode, "esc", 27, t.key, ["Esc", "Escape"]) ? null : e.onEsc(t);
          }
        }
      }, e.$listeners), [n("md-focus-trap", [n("div", {
        staticClass: "md-dialog-container"
      }, [e._t("default"), e._v(" "), n("keep-alive", [e.mdBackdrop ? n("md-overlay", {
        class: e.mdBackdropClass,
        attrs: {
          "md-fixed": "",
          "md-active": e.mdActive
        },
        on: {
          click: e.onClick
        }
      }) : e._e()], 1)], 2)])], 1) : e._e()])], 1);
    },
        r = [],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t, n) {
    "use strict";

    var i, r;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), i = n(13), r = function (e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }(i), t.default = {
      name: "MdDateIcon",
      components: {
        MdIcon: r.default
      }
    };
  }, function (e, t, n) {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = {
      name: "MdDialogTitle"
    };
  }, function (e, t, n) {
    "use strict";

    var i, r;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), i = n(1), r = function (e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }(i), t.default = new r.default({
      name: "MdDialogContent"
    });
  }, function (e, t, n) {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = {
      name: "MdDialogActions"
    };
  }, function (e, t, n) {
    "use strict";

    var i, r;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), i = n(1), r = function (e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }(i), t.default = new r.default({
      name: "MdDivider",
      computed: {
        insideList: function () {
          return "md-list" === this.$parent.$options._componentTag;
        }
      }
    });
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    var r, a, o, s, u, l, d, c, f;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = Object.assign || function (e) {
      var t, n, i;

      for (t = 1; t < arguments.length; t++) {
        n = arguments[t];

        for (i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i]);
      }

      return e;
    }, a = n(1), o = i(a), s = n(58), u = i(s), l = n(8), d = i(l), c = n(104), f = i(c), t.default = new o.default({
      name: "MdDrawer",
      mixins: [f.default],
      components: {
        MdOverlay: u.default
      },
      props: {
        mdRight: Boolean,
        mdPermanent: r({
          type: String
        }, (0, d.default)("md-permanent", ["full", "clipped", "card"])),
        mdPersistent: r({
          type: String
        }, (0, d.default)("md-persistent", ["mini", "full"])),
        mdActive: Boolean,
        mdFixed: Boolean
      },
      watch: {
        mdActive: function (e) {
          e ? this.$emit("md-opened") : this.$emit("md-closed");
        },
        swiped: function (e) {
          "right" !== e && "left" !== e || this.$emit("update:mdActive", "right" === e);
        }
      },
      computed: {
        drawerClasses: function () {
          var e = {
            "md-left": !this.mdRight,
            "md-right": this.mdRight,
            "md-temporary": this.isTemporary,
            "md-persistent": this.mdPersistent,
            "md-permanent": this.mdPermanent,
            "md-active": this.mdActive,
            "md-fixed": this.mdFixed
          };
          return this.mdPermanent && (e["md-permanent-" + this.mdPermanent] = !0), this.mdPersistent && (e["md-persistent-" + this.mdPersistent] = !0), e;
        },
        isTemporary: function () {
          return !this.mdPermanent && !this.mdPersistent;
        },
        mode: function () {
          return this.mdPersistent ? "persistent" : this.mdPermanent ? "permanent" : "temporary";
        },
        submode: function () {
          return this.mdPersistent ? this.mdPersistent : this.mdPermanent ? this.mdPermanent : void 0;
        },
        mdSwipeElement: function () {
          return this.$el.parentNode;
        }
      },
      methods: {
        closeDrawer: function () {
          this.$emit("update:mdActive", !1);
        }
      }
    });
  }, function (e, t) {}, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement,
          n = e._self._c || t;
      return n("transition", {
        attrs: {
          name: "md-empty-state",
          appear: ""
        }
      }, [n("div", {
        staticClass: "md-empty-state",
        class: [e.emptyStateClasses, e.$mdActiveTheme],
        style: e.emptyStateStyles
      }, [n("div", {
        staticClass: "md-empty-state-container"
      }, [e.mdIcon ? [e.isAssetIcon(e.mdIcon) ? n("md-icon", {
        staticClass: "md-empty-state-icon",
        attrs: {
          "md-src": e.mdIcon
        }
      }) : n("md-icon", {
        staticClass: "md-empty-state-icon"
      }, [e._v(e._s(e.mdIcon))])] : e._e(), e._v(" "), e.mdLabel ? n("strong", {
        staticClass: "md-empty-state-label"
      }, [e._v(e._s(e.mdLabel))]) : e._e(), e._v(" "), e.mdDescription ? n("p", {
        staticClass: "md-empty-state-description"
      }, [e._v(e._s(e.mdDescription))]) : e._e(), e._v(" "), e._t("default")], 2)])]);
    },
        r = [],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    var r, a, o, s, u, l, d, c, f, h, m, p, v, b;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = Object.assign || function (e) {
      var t, n, i;

      for (t = 1; t < arguments.length; t++) {
        n = arguments[t];

        for (i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i]);
      }

      return e;
    }, a = n(10), i(a), o = n(1), i(o), s = n(377), u = i(s), l = n(107), d = i(l), c = n(108), f = i(c), h = n(53), m = i(h), p = n(42), v = i(p), b = {
      x: -15,
      y: -48
    }, t.default = {
      name: "MdSelect",
      components: {
        MdInput: m.default,
        MdMenu: d.default,
        MdMenuContent: f.default,
        MdDropDownIcon: u.default
      },
      mixins: [v.default],
      props: {
        mdDense: Boolean,
        mdClass: String,
        multiple: Boolean,
        id: String,
        name: String
      },
      inject: ["MdField"],
      data: function () {
        return {
          menuStyles: {},
          offset: {
            x: b.x,
            y: 0
          },
          showSelect: !0,
          didMount: !1,
          MdSelect: {
            items: {},
            label: null,
            multiple: !1,
            modelValue: this.localValue,
            setValue: this.setValue,
            setContent: this.setContent,
            setMultipleValue: this.setMultipleValue,
            setMultipleContent: this.setMultipleContent
          }
        };
      },
      provide: function () {
        return {
          MdSelect: this.MdSelect
        };
      },
      computed: {
        attrs: function () {
          return r({}, this.$attrs, {
            name: this.name,
            id: void 0
          });
        },
        inputListeners: function () {
          return r({}, this.$listeners, {
            input: void 0
          });
        }
      },
      watch: {
        localValue: {
          immediate: !0,
          handler: function (e) {
            this.setFieldContent(), this.MdSelect.modelValue = this.localValue, this.didMount && this.emitSelected(e);
          }
        },
        multiple: {
          immediate: !0,
          handler: function (e) {
            this.MdSelect.multiple = e, this.$nextTick(this.initialLocalValueByDefault);
          }
        }
      },
      methods: {
        elHasScroll: function (e) {
          return e.scrollHeight > e.offsetHeight;
        },
        scrollToSelectedOption: function (e, t) {
          var n = e.offsetTop,
              i = e.offsetHeight,
              r = t.offsetHeight;
          t.scrollTop = n - (r - i) / 2;
        },
        setOffsets: function (e) {
          var t, n;
          this.$isServer || (t = this.$refs.menu.$refs.container) && (n = e || t.querySelector(".md-selected"), n ? (this.scrollToSelectedOption(n, t), this.offset.y = b.y - n.offsetTop + t.scrollTop + 8, this.menuStyles = {
            "transform-origin": "0 " + Math.abs(this.offset.y) + "px"
          }) : (this.offset.y = b.y + 1, this.menuStyles = {}));
        },
        onMenuEnter: function () {
          this.didMount && (this.setOffsets(), this.MdField.focused = !0, this.$emit("md-opened"));
        },
        applyHighlight: function () {
          this.MdField.focused = !1, this.MdField.highlighted = !0, this.$refs.input.$el.focus();
        },
        onClose: function () {
          this.$emit("md-closed"), this.didMount && this.applyHighlight();
        },
        onFocus: function () {
          this.didMount && this.applyHighlight();
        },
        removeHighlight: function () {
          this.MdField.highlighted = !1;
        },
        openSelect: function () {
          this.disabled || (this.showSelect = !0);
        },
        arrayAccessorRemove: function (e, t) {
          var n = e.slice(0, t),
              i = e.slice(t + 1, e.length);
          return n.concat(i);
        },
        toggleArrayValue: function (e) {
          var t = this.localValue.indexOf(e),
              n = t > -1;
          this.localValue = n ? this.arrayAccessorRemove(this.localValue, t) : this.localValue.concat([e]);
        },
        setValue: function (e) {
          this.model = e, this.setFieldValue(), this.showSelect = !1;
        },
        setContent: function (e) {
          this.MdSelect.label = e;
        },
        setContentByValue: function () {
          var e = this.MdSelect.items[this.localValue];
          e ? this.setContent(e) : this.setContent("");
        },
        setMultipleValue: function (e) {
          var t = e;
          this.toggleArrayValue(t), this.setFieldValue();
        },
        setMultipleContentByValue: function () {
          var e,
              t = this;
          this.localValue || this.initialLocalValueByDefault(), e = [], this.localValue.forEach(function (n) {
            var i = t.MdSelect.items[n];
            i && e.push(i);
          }), this.setContent(e.join(", "));
        },
        setFieldContent: function () {
          this.multiple ? this.setMultipleContentByValue() : this.setContentByValue();
        },
        isLocalValueSet: function () {
          return void 0 !== this.localValue && null !== this.localValue;
        },
        setLocalValueIfMultiple: function () {
          this.isLocalValueSet() ? this.localValue = [this.localValue] : this.localValue = [];
        },
        setLocalValueIfNotMultiple: function () {
          this.localValue.length > 0 ? this.localValue = this.localValue[0] : this.localValue = null;
        },
        initialLocalValueByDefault: function () {
          var e = Array.isArray(this.localValue);
          this.multiple && !e ? this.setLocalValueIfMultiple() : !this.multiple && e && this.setLocalValueIfNotMultiple();
        },
        emitSelected: function (e) {
          this.$emit("md-selected", e);
        }
      },
      mounted: function () {
        var e = this;
        this.showSelect = !1, this.setFieldContent(), this.$nextTick().then(function () {
          e.didMount = !0;
        });
      },
      updated: function () {
        this.setFieldContent();
      }
    };
  }, function (e, t, n) {
    "use strict";

    var i, r;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), i = n(13), r = function (e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }(i), t.default = {
      name: "MdDropDownIcon",
      components: {
        MdIcon: r.default
      }
    };
  }, function (e, t) {}, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement;
      return (e._self._c || t)("div", e._g({
        staticClass: "md-menu"
      }, e.$listeners), [e._t("default")], 2);
    },
        r = [],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t) {}, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement,
          n = e._self._c || t;
      return n("md-popover", {
        attrs: {
          "md-settings": e.popperSettings,
          "md-active": e.shouldRender
        }
      }, [e.shouldRender ? n("transition", e._g({
        attrs: {
          name: "md-menu-content",
          css: e.didMount
        }
      }, e.$listeners), [n("div", {
        ref: "menu",
        class: [e.menuClasses, e.mdContentClass, e.$mdActiveTheme],
        style: e.menuStyles
      }, [n("div", {
        ref: "container",
        staticClass: "md-menu-content-container md-scrollbar",
        class: e.$mdActiveTheme
      }, [n("md-list", e._b({
        class: e.listClasses
      }, "md-list", e.filteredAttrs, !1), [e._t("default")], 2)], 1)])]) : e._e()], 1);
    },
        r = [],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t, n) {
    "use strict";

    var i, r;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), i = n(11), r = function (e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }(i), t.default = {
      name: "MdOption",
      props: {
        value: [String, Number, Boolean],
        disabled: Boolean
      },
      inject: {
        MdSelect: {},
        MdOptgroup: {
          default: {}
        }
      },
      data: function () {
        return {
          uniqueId: "md-option-" + (0, r.default)(),
          isSelected: !1,
          isChecked: !1
        };
      },
      computed: {
        selectValue: function () {
          return this.MdSelect.modelValue;
        },
        isMultiple: function () {
          return this.MdSelect.multiple;
        },
        isDisabled: function () {
          return this.MdOptgroup.disabled || this.disabled;
        },
        key: function () {
          return this.value || 0 === this.value ? this.value : this.uniqueId;
        },
        inputLabel: function () {
          return this.MdSelect.label;
        },
        optionClasses: function () {
          return {
            "md-selected": this.isSelected || this.isChecked
          };
        }
      },
      watch: {
        selectValue: function () {
          this.setIsSelected();
        },
        isChecked: function (e) {
          e !== this.isSelected && this.setSelection();
        },
        isSelected: function (e) {
          this.isChecked = e;
        }
      },
      methods: {
        getTextContent: function () {
          if (this.$el) return this.$el.textContent.trim();
          var e = this.$slots.default;
          return e ? e[0].text.trim() : "";
        },
        setIsSelected: function () {
          return this.isMultiple ? void 0 === this.selectValue ? void (this.isSelected = !1) : void (this.isSelected = this.selectValue.includes(this.value)) : void (this.isSelected = this.selectValue === this.value);
        },
        setSingleSelection: function () {
          this.MdSelect.setValue(this.value);
        },
        setMultipleSelection: function () {
          this.MdSelect.setMultipleValue(this.value);
        },
        setSelection: function () {
          this.isDisabled || (this.isMultiple ? this.setMultipleSelection() : this.setSingleSelection());
        },
        setItem: function () {
          this.$set(this.MdSelect.items, this.key, this.getTextContent());
        }
      },
      updated: function () {
        this.setItem();
      },
      created: function () {
        this.setItem(), this.setIsSelected();
      }
    };
  }, function (e, t, n) {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = {
      name: "MdOptgroup",
      props: {
        label: String,
        disabled: Boolean
      },
      provide: function () {
        return {
          MdOptgroup: {
            disabled: this.disabled
          }
        };
      }
    };
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    function r(e) {
      if (Array.isArray(e)) {
        for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];

        return n;
      }

      return Array.from(e);
    }

    var a, o, s, u, l, d;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), a = n(11), o = i(a), s = n(388), u = i(s), l = n(42), d = i(l), t.default = {
      name: "MdFile",
      components: {
        MdFileIcon: u.default
      },
      props: {
        id: {
          type: String,
          default: function () {
            return "md-file-" + (0, o.default)();
          }
        },
        name: String
      },
      computed: {
        iconClass: function () {
          return {
            "md-disabled": this.disabled
          };
        }
      },
      mixins: [d.default],
      inject: ["MdField"],
      methods: {
        getMultipleName: function (e) {
          var t = [];
          return [].concat(r(e)).forEach(function (e) {
            var n = e.name;
            return t.push(n);
          }), t.join(", ");
        },
        getFileName: function (e, t) {
          return e && 0 !== e.length ? e.length > 1 ? this.getMultipleName(e) : 1 === e.length ? e[0].name : null : t.value.split("\\").pop();
        },
        openPicker: function () {
          this.onFocus(), this.$refs.inputFile.click();
        },
        onChange: function (e) {
          this.onFileSelected(e);
        },
        onFileSelected: function (e) {
          var t = e.target,
              n = e.dataTransfer,
              i = t.files || n.files;
          this.model = this.getFileName(i, t), this.$emit("md-change", i || t.value);
        }
      },
      created: function () {
        this.MdField.file = !0;
      },
      beforeDestroy: function () {
        this.MdField.file = !1;
      }
    };
  }, function (e, t, n) {
    "use strict";

    var i, r;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), i = n(13), r = function (e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }(i), t.default = {
      name: "MdFileIcon",
      components: {
        MdIcon: r.default
      }
    };
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    function r(e, t) {
      var n = e.style.height,
          i = e.offsetHeight,
          r = e.scrollHeight;
      return e.style.overflow = "hidden", i >= r && (e.style.height = i + t + "px", r < e.scrollHeight) ? (e.style.height = n, i) : r;
    }

    var a, o, s, u, l, d, c;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), a = Object.assign || function (e) {
      var t, n, i;

      for (t = 1; t < arguments.length; t++) {
        n = arguments[t];

        for (i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i]);
      }

      return e;
    }, o = n(1), s = i(o), u = n(11), l = i(u), d = n(42), c = i(d), t.default = new s.default({
      name: "MdTextarea",
      mixins: [c.default],
      inject: ["MdField"],
      props: {
        id: {
          type: String,
          default: function () {
            return "md-textarea-" + (0, l.default)();
          }
        },
        mdAutogrow: Boolean
      },
      computed: {
        listeners: function () {
          return a({}, this.$listeners, {
            input: this.onInput
          });
        },
        textareaStyles: function () {
          return {
            height: this.textareaHeight
          };
        }
      },
      methods: {
        getTextAreaLineSize: function () {
          var e = window.getComputedStyle(this.$el);
          return parseInt(e.lineHeight, 10);
        },
        setTextAreaSize: function (e) {
          var t,
              n = e;
          e || (t = this.getTextAreaLineSize(), n = r(this.$el, t)), this.textareaHeight = n + "px";
        },
        applyStyles: function () {
          var e = this;
          this.mdAutogrow && (this.setTextAreaSize(32), this.$nextTick().then(function () {
            e.setTextAreaSize(), window.setTimeout(function () {
              e.$el.style.overflow = "auto";
            }, 10);
          }));
        },
        setTextarea: function () {
          this.MdField.textarea = !0;
        },
        setAutogrow: function () {
          this.MdField.autogrow = this.mdAutogrow;
        },
        onInput: function () {
          this.setFieldValue();
        }
      },
      watch: {
        localValue: function () {
          this.applyStyles();
        }
      },
      created: function () {
        this.setTextarea(), this.setAutogrow();
      },
      mounted: function () {
        this.$nextTick().then(this.applyStyles);
      },
      beforeDestroy: function () {
        this.setTextarea(!1);
      }
    });
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    function r(e) {
      var t = e;
      return t || (t = "$&"), '<span class="md-highlight-text-match">' + t + "</span>";
    }

    function a(e, t) {
      var n, i, o, s, u, l;
      if (0 === t.length) return e;
      if (-1 === (n = e.toLowerCase().indexOf(t[0].toLowerCase()))) return "";

      for (i = 0, o = 1; o < t.length && e[n + o] === t[o]; o++) i = o;

      return s = e.slice(0, n), u = r(e.slice(n, n + i + 1)), l = a(e.slice(n + i + 1), t.slice(i + 1)), s + u + l;
    }

    function o(e, t) {
      var n = RegExp(t + "(?!([^<]+)?<)", "gi");
      return e.replace(n, r());
    }

    function s(e, t, n) {
      var i = e.text;
      return i && t && t[0] ? n ? a(i, t) || i : o(i, t) : i;
    }

    var u, l, d, c;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), u = n(2), l = i(u), d = n(1), c = i(d), t.default = new c.default({
      name: "MdHighlightText",
      abstract: !0,
      props: {
        mdTerm: String,
        mdFuzzySearch: {
          type: Boolean,
          default: !0
        }
      },
      render: function (e) {
        var t, n;

        try {
          if (!(t = this.$slots.default)) return null;
          if (t.length > 1 || t[0].tag) throw Error();
          return n = s(t[0], this.mdTerm, this.mdFuzzySearch), e("div", {
            staticClass: "md-highlight-text",
            class: this.$mdActiveTheme,
            domProps: {
              innerHTML: n
            }
          });
        } catch (e) {
          l.default.util.warn("MdHighlightText can only render text nodes.", this);
        }

        return null;
      }
    });
  }, function (e, t, n) {
    "use strict";

    var i, r;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), i = n(1), r = function (e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }(i), t.default = new r.default({
      name: "MdImage",
      props: {
        mdSrc: String
      }
    });
  }, function (e, t) {}, function (e, t, n) {
    "use strict";

    var i, r, a, o, s, u, l, d, c, f;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), i = n(76), r = n.n(i);

    for (a in i) "default" !== a && function (e) {
      n.d(t, e, function () {
        return i[e];
      });
    }(a);

    o = n(181), s = n(0), u = !1, l = null, d = null, c = null, f = s(r.a, o.a, u, l, d, c), t.default = f.exports;
  }, function (e, t, n) {
    "use strict";

    var i, r, a, o, s, u, l, d, c, f;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), i = n(77), r = n.n(i);

    for (a in i) "default" !== a && function (e) {
      n.d(t, e, function () {
        return i[e];
      });
    }(a);

    o = n(180), s = n(0), u = !1, l = null, d = null, c = null, f = s(r.a, o.a, u, l, d, c), t.default = f.exports;
  }, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement;
      return (e._self._c || t)("md-ripple", {
        staticClass: "md-list-item-content",
        attrs: {
          "md-disabled": e.mdDisabled
        }
      }, [e._t("default")], 2);
    },
        r = [],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement,
          n = e._self._c || t;
      return n("div", {
        staticClass: "md-list-item-default",
        on: {
          click: e.toggleControl
        }
      }, [n("md-list-item-content", {
        attrs: {
          "md-disabled": ""
        }
      }, [e._t("default")], 2)], 1);
    },
        r = [],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t, n) {
    "use strict";

    var i, r, a, o, s, u, l, d, c, f;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), i = n(78), r = n.n(i);

    for (a in i) "default" !== a && function (e) {
      n.d(t, e, function () {
        return i[e];
      });
    }(a);

    o = n(183), s = n(0), u = !1, l = null, d = null, c = null, f = s(r.a, o.a, u, l, d, c), t.default = f.exports;
  }, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement,
          n = e._self._c || t;
      return n("div", {
        staticClass: "md-list-item-fake-button",
        attrs: {
          disabled: e.disabled
        }
      }, [n("md-list-item-content", {
        attrs: {
          "md-disabled": e.isDisabled
        }
      }, [e._t("default")], 2)], 1);
    },
        r = [],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t, n) {
    "use strict";

    var i, r, a, o, s, u, l, d, c, f;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), i = n(79), r = n.n(i);

    for (a in i) "default" !== a && function (e) {
      n.d(t, e, function () {
        return i[e];
      });
    }(a);

    o = n(185), s = n(0), u = !1, l = null, d = null, c = null, f = s(r.a, o.a, u, l, d, c), t.default = f.exports;
  }, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement,
          n = e._self._c || t;
      return n("button", {
        staticClass: "md-list-item-button",
        attrs: {
          type: "button",
          disabled: e.disabled
        }
      }, [n("md-list-item-content", {
        attrs: {
          "md-disabled": e.isDisabled
        }
      }, [e._t("default")], 2)], 1);
    },
        r = [],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t, n) {
    "use strict";

    var i, r, a, o, s, u, l, d, c, f;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), i = n(80), r = n.n(i);

    for (a in i) "default" !== a && function (e) {
      n.d(t, e, function () {
        return i[e];
      });
    }(a);

    o = n(187), s = n(0), u = !1, l = null, d = null, c = null, f = s(r.a, o.a, u, l, d, c), t.default = f.exports;
  }, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement,
          n = e._self._c || t;
      return n("a", e._b({
        staticClass: "md-list-item-link"
      }, "a", e.$props, !1), [n("md-list-item-content", {
        attrs: {
          "md-disabled": e.isDisabled
        }
      }, [e._t("default")], 2)], 1);
    },
        r = [],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t, n) {
    "use strict";

    var i, r, a, o, s, u, l, d, c, f;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), i = n(81), r = n.n(i);

    for (a in i) "default" !== a && function (e) {
      n.d(t, e, function () {
        return i[e];
      });
    }(a);

    o = n(189), s = n(0), u = !1, l = null, d = null, c = null, f = s(r.a, o.a, u, l, d, c), t.default = f.exports;
  }, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement,
          n = e._self._c || t;
      return n("router-link", e._b({
        staticClass: "md-list-item-router"
      }, "router-link", e.routerProps, !1), [n("md-list-item-content", {
        attrs: {
          "md-disabled": e.isDisabled
        }
      }, [e._t("default")], 2)], 1);
    },
        r = [],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      n(191);
    }

    var r, a, o, s, u, l, d, c, f, h;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(82), a = n.n(r);

    for (o in r) "default" !== o && function (e) {
      n.d(t, e, function () {
        return r[e];
      });
    }(o);

    s = n(194), u = n(0), l = !1, d = i, c = null, f = null, h = u(a.a, s.a, l, d, c, f), t.default = h.exports;
  }, function (e, t) {}, function (e, t, n) {
    "use strict";

    var i, r, a, o, s, u, l, d, c, f;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), i = n(83), r = n.n(i);

    for (a in i) "default" !== a && function (e) {
      n.d(t, e, function () {
        return i[e];
      });
    }(a);

    o = n(193), s = n(0), u = !1, l = null, d = null, c = null, f = s(r.a, o.a, u, l, d, c), t.default = f.exports;
  }, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement;
      e._self._c;
      return e._m(0);
    },
        r = [function () {
      var e = this,
          t = e.$createElement,
          n = e._self._c || t;
      return n("md-icon", {
        staticClass: "md-icon-image"
      }, [n("svg", {
        attrs: {
          height: "24",
          viewBox: "0 0 24 24",
          width: "24",
          xmlns: "http://www.w3.org/2000/svg"
        }
      }, [n("path", {
        attrs: {
          d: "M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"
        }
      }), e._v(" "), n("path", {
        attrs: {
          d: "M0-.75h24v24H0z",
          fill: "none"
        }
      })])]);
    }],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement,
          n = e._self._c || t;
      return n("div", {
        staticClass: "md-list-item-expand",
        class: e.expandClasses
      }, [n("md-list-item-content", {
        attrs: {
          "md-disabled": e.isDisabled
        },
        nativeOn: {
          click: function (t) {
            return e.toggleExpand(t);
          }
        }
      }, [e._t("default"), e._v(" "), n("md-arrow-down-icon", {
        staticClass: "md-list-expand-icon"
      })], 2), e._v(" "), n("div", {
        ref: "listExpand",
        staticClass: "md-list-expand",
        style: e.expandStyles
      }, [e._t("md-expand")], 2)], 1);
    },
        r = [],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    var r, a, o, s, u;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(1), a = i(r), o = n(100), s = i(o), u = n(109), i(u), t.default = new a.default({
      name: "MdMenuItem",
      props: {
        disabled: Boolean
      },
      inject: ["MdMenu"],
      data: function () {
        return {
          highlighted: !1
        };
      },
      computed: {
        itemClasses: function () {
          return {
            "md-highlight": this.highlighted
          };
        },
        listeners: function () {
          var e,
              t,
              n = this;
          return this.disabled ? {} : this.MdMenu.closeOnSelect ? (e = {}, t = Object.keys(this.$listeners), t.forEach(function (t) {
            s.default.includes(t) ? e[t] = function (e) {
              n.$listeners[t](e), n.closeMenu();
            } : e[t] = n.$listeners[t];
          }), e) : this.$listeners;
        }
      },
      methods: {
        closeMenu: function () {
          this.MdMenu.active = !1, this.MdMenu.eventObserver && this.MdMenu.eventObserver.destroy();
        },
        triggerCloseMenu: function () {
          this.disabled || this.closeMenu();
        }
      },
      mounted: function () {
        if (this.$el.children && this.$el.children[0]) {
          "A" === this.$el.children[0].tagName.toUpperCase() && this.$el.addEventListener("click", this.triggerCloseMenu);
        }
      },
      beforeDestroy: function () {
        this.$el.removeEventListener("click", this.triggerCloseMenu);
      }
    });
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    var r, a, o, s, u;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = Object.assign || function (e) {
      var t, n, i;

      for (t = 1; t < arguments.length; t++) {
        n = arguments[t];

        for (i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i]);
      }

      return e;
    }, a = n(1), o = i(a), s = n(8), u = i(s), t.default = new o.default({
      name: "MdProgressBar",
      props: {
        mdValue: {
          type: Number,
          default: 0
        },
        mdBuffer: {
          type: Number,
          default: 0
        },
        mdMode: r({
          type: String,
          default: "determinate"
        }, (0, u.default)("md-mode", ["determinate", "indeterminate", "query", "buffer"]))
      },
      computed: {
        isDeterminate: function () {
          return "determinate" === this.mdMode;
        },
        isBuffer: function () {
          return "buffer" === this.mdMode;
        },
        hasAmountFill: function () {
          return this.isBuffer || this.isDeterminate;
        },
        progressClasses: function () {
          return "md-" + this.mdMode;
        },
        progressValueStyle: function () {
          if (this.hasAmountFill) return "width: " + this.mdValue + "%";
        },
        progressTrackStyle: function () {
          if (this.hasAmountFill) return "width: " + this.mdBuffer + "%";
        },
        progressBufferStyle: function () {
          if (this.hasAmountFill) return "left: calc(" + this.mdBuffer + "% + 8px)";
        }
      }
    });
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    function r(e, t, n) {
      return t in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }) : e[t] = n, e;
    }

    var a, o, s, u, l;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), a = Object.assign || function (e) {
      var t, n, i;

      for (t = 1; t < arguments.length; t++) {
        n = arguments[t];

        for (i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i]);
      }

      return e;
    }, o = n(1), s = i(o), u = n(8), l = i(u), new Set(), t.default = new s.default({
      name: "MdProgressSpinner",
      props: {
        mdValue: {
          type: Number,
          default: 0
        },
        mdDiameter: {
          type: Number,
          default: 60
        },
        mdStroke: {
          type: Number,
          default: 6
        },
        mdMode: a({
          type: String,
          default: "determinate"
        }, (0, l.default)("md-mode", ["determinate", "indeterminate"]))
      },
      computed: {
        isDeterminate: function () {
          return "determinate" === this.mdMode;
        },
        isIndeterminate: function () {
          return "indeterminate" === this.mdMode;
        },
        isIE: function () {
          return !this.$isServer && navigator.userAgent.toLowerCase().includes("trident");
        },
        progressClasses: function () {
          var e,
              t = "md-progress-spinner-indeterminate";
          return this.isIE && (t += "-fallback"), e = {}, r(e, t, !0), r(e, "md-" + this.mdMode, !0), e;
        },
        circleRadius: function () {
          return (this.mdDiameter - this.mdStroke) / 2;
        },
        circleStrokeWidth: function () {
          return this.mdStroke + "px";
        },
        circleCircumference: function () {
          return 2 * Math.PI * this.circleRadius;
        },
        circleStrokeDashArray: function () {
          return this.circleCircumference + "px";
        },
        circleStrokeDashOffset: function () {
          return this.isDeterminate ? this.circleCircumference * (100 - this.mdValue) / 100 + "px" : this.isIndeterminate && this.isIE ? .2 * this.circleCircumference + "px" : null;
        }
      },
      watch: {
        mdValue: function () {
          this.attachCircleStyle();
        },
        mdDiameter: function () {
          this.attachSvgStyle(), this.attachCircleStyle();
        },
        mdStroke: function () {
          this.attachCircleStyle();
        }
      },
      methods: {
        attachSvgStyle: function () {
          var e = this.$refs["md-progress-spinner-draw"],
              t = this.mdDiameter + "px";
          e.style.width = t, e.style.height = t;
        },
        attachCircleStyle: function () {
          var e = this.$refs["md-progress-spinner-circle"];
          e.style.strokeDashoffset = this.circleStrokeDashOffset, e.style.strokeDasharray = this.circleStrokeDashArray, e.style.strokeWidth = this.circleStrokeWidth, e.style.setProperty("--md-progress-spinner-start-value", .95 * this.circleCircumference), e.style.setProperty("--md-progress-spinner-end-value", .2 * this.circleCircumference);
        }
      },
      mounted: function () {
        this.attachSvgStyle(), this.attachCircleStyle();
      }
    });
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    var r, a, o, s, u, l;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(1), a = i(r), o = n(11), s = i(o), u = n(16), l = i(u), t.default = new a.default({
      name: "MdRadio",
      components: {
        MdRipple: l.default
      },
      props: {
        model: [String, Number, Boolean, Object],
        value: {
          type: [String, Number, Boolean, Object],
          default: "on"
        },
        id: {
          type: String,
          default: function () {
            return "md-radio-" + (0, s.default)();
          }
        },
        name: [String, Number],
        required: Boolean,
        disabled: Boolean
      },
      model: {
        prop: "model",
        event: "change"
      },
      data: function () {
        return {
          rippleActive: !1
        };
      },
      computed: {
        isSelected: function () {
          return this.model === this.value;
        },
        radioClasses: function () {
          return {
            "md-checked": this.isSelected,
            "md-disabled": this.disabled,
            "md-required": this.required
          };
        }
      },
      methods: {
        toggleCheck: function () {
          this.disabled || (this.rippleActive = !0, this.$emit("change", this.value));
        }
      }
    });
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    function r(e, t, n) {
      return t in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }) : e[t] = n, e;
    }

    var a, o, s, u, l, d, c, f, h, m;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), a = Object.assign || function (e) {
      var t, n, i;

      for (t = 1; t < arguments.length; t++) {
        n = arguments[t];

        for (i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i]);
      }

      return e;
    }, o = n(1), s = i(o), u = n(8), l = i(u), d = n(27), c = i(d), f = n(421), h = i(f), m = n(423), t.default = new s.default({
      name: "MdSnackbar",
      components: {
        MdPortal: c.default,
        MdSnackbarContent: h.default
      },
      props: {
        mdActive: Boolean,
        mdPersistent: Boolean,
        mdDuration: {
          type: Number,
          default: 4e3
        },
        mdPosition: a({
          type: String,
          default: "center"
        }, (0, l.default)("md-position", ["center", "left"]))
      },
      computed: {
        snackbarClasses: function () {
          return r({}, "md-position-" + this.mdPosition, !0);
        }
      },
      watch: {
        mdActive: function (e) {
          var t = this;
          e ? (0, m.createSnackbar)(this.mdDuration, this.mdPersistent, this).then(function () {
            t.$emit("update:mdActive", !1), t.$emit("md-opened");
          }) : ((0, m.destroySnackbar)(), this.$emit("md-closed"));
        }
      }
    });
  }, function (e, t, n) {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = {
      name: "MdSnackbarContent",
      props: {
        mdClasses: Array
      }
    };
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    function r(e, t, n) {
      return t in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }) : e[t] = n, e;
    }

    var a, o, s, u, l;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), a = Object.assign || function (e) {
      var t, n, i;

      for (t = 1; t < arguments.length; t++) {
        n = arguments[t];

        for (i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i]);
      }

      return e;
    }, o = n(1), s = i(o), u = n(8), l = i(u), t.default = new s.default({
      name: "MdSpeedDial",
      props: {
        mdEvent: a({
          type: String,
          default: "hover"
        }, (0, l.default)("md-event", ["click", "hover"])),
        mdDirection: a({
          type: String,
          default: "top"
        }, (0, l.default)("md-direction", ["top", "bottom"])),
        mdEffect: a({
          type: String,
          default: "fling"
        }, (0, l.default)("md-effect", ["fling", "scale", "opacity"]))
      },
      data: function () {
        return {
          MdSpeedDial: {
            active: !1,
            event: this.mdEvent,
            direction: this.mdDirection
          }
        };
      },
      provide: function () {
        return {
          MdSpeedDial: this.MdSpeedDial
        };
      },
      computed: {
        speedDialClasses: function () {
          var e;
          return e = {
            "md-active": this.MdSpeedDial.active,
            "md-with-hover": "hover" === this.mdEvent
          }, r(e, "md-direction-" + this.mdDirection, !0), r(e, "md-effect-" + this.mdEffect, !0), e;
        }
      }
    });
  }, function (e, t, n) {
    "use strict";

    var i, r;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), i = n(39), r = function (e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }(i), t.default = {
      name: "MdSpeedDialTarget",
      components: {
        MdButton: r.default
      },
      inject: ["MdSpeedDial"],
      methods: {
        handleClick: function () {
          "click" === this.MdSpeedDial.event && (this.MdSpeedDial.active = !this.MdSpeedDial.active);
        }
      }
    };
  }, function (e, t, n) {
    "use strict";

    function i(e, t, n) {
      return "top" === e ? n - t - 1 : t;
    }

    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = {
      name: "MdSpeedDialContent",
      inject: ["MdSpeedDial"],
      methods: {
        setChildrenIndexes: function () {
          var e = this;
          this.$nextTick().then(function () {
            var t = e.$children.length;
            e.$children.forEach(function (n, r) {
              if ("button" === n._vnode.tag) {
                var a = i(e.MdSpeedDial.direction, r, t);
                n.$el.setAttribute("md-button-index", a), n.$el.classList.add("md-raised");
              }
            });
          });
        }
      },
      mounted: function () {
        this.setChildrenIndexes();
      },
      updated: function () {
        this.setChildrenIndexes();
      }
    };
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    var r, a, o, s, u, l, d, c;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(1), a = i(r), o = n(48), s = i(o), u = n(110), l = i(u), d = n(205), c = i(d), t.default = new a.default({
      name: "MdSteppers",
      components: {
        MdStepHeader: c.default
      },
      props: {
        mdSyncRoute: Boolean,
        mdDynamicHeight: Boolean,
        mdVertical: Boolean,
        mdLinear: Boolean,
        mdAlternative: Boolean,
        mdActiveStep: [String, Number]
      },
      data: function () {
        return {
          activeStepIndex: 0,
          noTransition: !0,
          contentStyles: {},
          activeButtonEl: null,
          MdSteppers: {
            activeStep: 0,
            isLinear: !1,
            isVertical: !1,
            items: {},
            syncRoute: this.mdSyncRoute,
            getStepperNumber: this.getStepperNumber,
            setActiveStep: this.setActiveStep,
            isPreviousStepperDone: this.isPreviousStepperDone
          }
        };
      },
      provide: function () {
        return {
          MdSteppers: this.MdSteppers
        };
      },
      computed: {
        steppersClasses: function () {
          return {
            "md-no-transition": this.noTransition,
            "md-alternative": this.mdAlternative,
            "md-horizontal": !this.mdVertical,
            "md-vertical": this.mdVertical,
            "md-dynamic-height": this.mdDynamicHeight
          };
        },
        activeIndex: function () {
          return this.MdSteppers.activeStep;
        },
        containerStyles: function () {
          return {
            transform: !this.mdVertical && "translate3D(" + 100 * -this.activeStepIndex + "%, 0, 0)"
          };
        }
      },
      watch: {
        mdActiveStep: function (e) {
          this.MdSteppers.activeStep = e, this.$emit("md-changed", e);
        },
        mdLinear: function (e) {
          this.MdSteppers.isLinear = e;
        },
        mdVertical: function (e) {
          this.MdSteppers.isVertical = e;
        },
        activeIndex: function () {
          this.$nextTick(this.setActiveButtonEl);
        },
        activeStepIndex: function () {
          this.onActiveStepIndex(), this.$nextTick(this.calculateStepperPos);
        },
        activeButtonEl: function (e) {
          this.activeStepIndex = e ? [].indexOf.call(e.parentNode.childNodes, e) : 0;
        },
        $route: function () {
          this.$nextTick(this.setActiveButtonEl);
        }
      },
      methods: {
        hasActiveStep: function () {
          return this.MdSteppers.activeStep || this.mdActiveStep;
        },
        getItemsAndKeys: function () {
          var e = this.MdSteppers.items;
          return {
            items: e,
            keys: Object.keys(e)
          };
        },
        getStepperNumber: function (e) {
          return Object.keys(this.MdSteppers.items).indexOf(e) + 1;
        },
        isStepperDone: function (e) {
          return this.MdSteppers.items[e].done;
        },
        isPreviousStepperDone: function (e) {
          var t = this.MdSteppers.items,
              n = Object.keys(t),
              i = this.getStepperNumber(e) - 2,
              r = n[i];
          return !r || t[r].done;
        },
        isStepperEditable: function (e) {
          return this.MdSteppers.items[e].editable;
        },
        setStepperAsDone: function (e) {
          this.MdSteppers.items[e].done = !0;
        },
        setPreviousStepperAsDone: function (e) {
          var t = this.getStepperNumber(this.MdSteppers.activeStep);
          this.getStepperNumber(e) > t && this.setStepperAsDone(this.MdSteppers.activeStep);
        },
        setActiveStep: function (e) {
          if (this.mdLinear && !this.isPreviousStepperDone(e)) return !1;
          e === this.MdSteppers.activeStep || !this.isStepperEditable(e) && this.isStepperDone(e) || (this.setPreviousStepperAsDone(e), this.MdSteppers.activeStep = e, this.$emit("md-changed", e), this.$emit("update:mdActiveStep", e), this.MdSteppers.items[e].error = null);
        },
        setActiveButtonEl: function () {
          this.activeButtonEl = this.$el.querySelector(".md-stepper-header.md-button.md-active");
        },
        setActiveStepByIndex: function (e) {
          var t = this.getItemsAndKeys(),
              n = t.keys;
          this.hasActiveStep() || (this.MdSteppers.activeStep = n[e]);
        },
        setupObservers: function () {
          var e = this.$el.querySelector(".md-steppers-wrapper");
          "ResizeObserver" in window ? (this.resizeObserver = new window.ResizeObserver(this.calculateStepperPos), this.resizeObserver.observe(this.$el)) : window.addEventListener("resize", this.calculateStepperPos), e && (this.resizeObserver = (0, s.default)(this.$el.querySelector(".md-steppers-wrapper"), {
            childList: !0,
            characterData: !0,
            subtree: !0
          }, this.calculateStepperPos));
        },
        calculateStepperPos: function () {
          if (!this.mdVertical) {
            var e = this.$el.querySelector(".md-stepper:nth-child(" + (this.activeStepIndex + 1) + ")");
            this.contentStyles = {
              height: e.offsetHeight + "px"
            };
          }
        },
        onActiveStepIndex: function () {
          var e,
              t = this.getItemsAndKeys(),
              n = (t.items, t.keys);
          if (this.hasActiveStep() || this.activeStepIndex) for (this.MdSteppers.activeStep = n[this.activeStepIndex], e = 0; e < this.activeStepIndex; e++) this.setStepperAsDone(n[e]);else this.MdSteppers.activeStep = n[0];
        }
      },
      created: function () {
        this.calculateStepperPos = (0, l.default)(this.calculateStepperPos, 300), this.MdSteppers.activeStep = this.mdActiveStep, this.MdSteppers.isLinear = this.mdLinear, this.MdSteppers.isVertical = this.mdVertical;
      },
      mounted: function () {
        var e = this;
        this.$nextTick().then(function () {
          return e.mdSyncRoute ? e.onActiveStepIndex() : e.setActiveStepByIndex(0), e.$nextTick();
        }).then(function () {
          e.setActiveButtonEl(), e.calculateStepperPos(), window.setTimeout(function () {
            e.noTransition = !1, e.setupObservers();
          }, 100);
        });
      },
      beforeDestroy: function () {
        "ResizeObserver" in window || window.removeEventListener("resize", this.calculateStepperPos);
      }
    });
  }, function (e, t, n) {
    "use strict";

    var i, r, a, o, s, u, l, d, c, f;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), i = n(206), r = n.n(i);

    for (a in i) "default" !== a && function (e) {
      n.d(t, e, function () {
        return i[e];
      });
    }(a);

    o = n(444), s = n(0), u = !1, l = null, d = null, c = null, f = s(r.a, o.a, u, l, d, c), t.default = f.exports;
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    var r, a, o, s, u, l;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(438), a = i(r), o = n(440), s = i(o), u = n(442), l = i(u), t.default = {
      name: "MdStepperHeader",
      components: {
        MdWarningIcon: a.default,
        MdCheckIcon: s.default,
        MdEditIcon: l.default
      },
      props: {
        index: {
          type: String,
          required: !0
        }
      },
      inject: ["MdSteppers"],
      computed: {
        data: function () {
          return this.MdSteppers.items[this.index];
        },
        shouldDisable: function () {
          var e = this.data,
              t = this.index,
              n = this.MdSteppers;
          return !(!e.done || e.editable) || n.isLinear && !n.isPreviousStepperDone(t);
        },
        classes: function () {
          return {
            "md-active": !this.MdSteppers.syncRoute && this.index === this.MdSteppers.activeStep,
            "md-error": this.data.error,
            "md-done": this.data.done
          };
        }
      }
    };
  }, function (e, t, n) {
    "use strict";

    var i, r;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), i = n(13), r = function (e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }(i), t.default = {
      name: "MdWarningIcon",
      components: {
        MdIcon: r.default
      }
    };
  }, function (e, t, n) {
    "use strict";

    var i, r;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), i = n(13), r = function (e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }(i), t.default = {
      name: "MdCheckIcon",
      components: {
        MdIcon: r.default
      }
    };
  }, function (e, t, n) {
    "use strict";

    var i, r;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), i = n(13), r = function (e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }(i), t.default = {
      name: "MdEditIcon",
      components: {
        MdIcon: r.default
      }
    };
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    var r, a, o, s, u, l, d;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = Object.assign || function (e) {
      var t, n, i;

      for (t = 1; t < arguments.length; t++) {
        n = arguments[t];

        for (i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i]);
      }

      return e;
    }, a = n(11), o = i(a), s = n(28), u = i(s), l = n(205), d = i(l), t.default = {
      name: "MdStep",
      components: {
        MdStepHeader: d.default
      },
      mixins: [u.default],
      props: {
        id: {
          type: String,
          default: function () {
            return "md-stepper-" + (0, o.default)();
          }
        },
        href: [String, Number],
        mdLabel: String,
        mdDescription: String,
        mdError: String,
        mdDone: Boolean,
        mdEditable: {
          type: Boolean,
          default: !0
        }
      },
      inject: ["MdSteppers"],
      watch: {
        $props: {
          deep: !0,
          handler: function () {
            this.setStepperData();
          }
        }
      },
      methods: {
        getPropValues: function () {
          var e = this,
              t = Object.keys(this.$options.props),
              n = ["id", "mdLabel", "mdDescription", "mdError", "mdEditable"],
              i = {};
          return t.forEach(function (t) {
            n.includes(t) || (e[t] ? i[t] = e[t] : e.$attrs.hasOwnProperty(t) && (i[t] = !t || e.$attrs[t]));
          }), i;
        },
        setStepperData: function () {
          this.$set(this.MdSteppers.items, this.id, {
            label: this.mdLabel,
            description: this.mdDescription,
            error: this.mdError,
            done: this.mdDone,
            editable: this.mdEditable,
            props: this.getPropValues(),
            events: this.$listeners
          });
        },
        setupWatchers: function () {
          var e = this,
              t = function (t) {
            if (e.MdSteppers.items[e.id]) return e.MdSteppers.items[e.id][t];
          };

          this.$watch(function () {
            return t("error");
          }, function () {
            return e.$emit("update:mdError", t("error"));
          }), this.$watch(function () {
            return t("done");
          }, function () {
            return e.$emit("update:mdDone", t("done"));
          });
        }
      },
      created: function () {
        this.setStepperData(), this.setupWatchers();
      },
      beforeDestroy: function () {
        this.$delete(this.MdSteppers.items, this.id);
      },
      render: function (e) {
        var t = {
          staticClass: "md-stepper",
          attrs: r({}, this.$attrs, {
            id: this.id
          }),
          on: this.$listeners
        };
        return this.href ? this.buttonProps = this.$options.props : this.$router && this.to && (this.$options.props = MdRouterLinkProps(this, this.$options.props), t.props = this.$props), e("div", t, this.$slots.default);
      }
    };
  }, function (e, t, n) {
    "use strict";

    var i, r;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), i = n(1), r = function (e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }(i), t.default = new r.default({
      name: "MdSubheader",
      computed: {
        insideList: function () {
          return "md-list" === this.$parent.$options._componentTag;
        }
      }
    });
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    var r, a, o, s, u, l;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(1), a = i(r), o = n(102), s = i(o), u = n(11), l = i(u), t.default = new a.default({
      name: "MdSwitch",
      mixins: [s.default],
      props: {
        id: {
          type: String,
          default: function () {
            return "md-switch-" + (0, l.default)();
          }
        }
      }
    });
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    var r, a, o, s, u, l, d, c, f, h, m, p, v, b, g, y, M, _, w, S, C, x;

    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = Object.assign || function (e) {
      var t, n, i;

      for (t = 1; t < arguments.length; t++) {
        n = arguments[t];

        for (i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i]);
      }

      return e;
    }, a = n(10), o = i(a), s = n(461), u = i(s), l = n(11), d = i(l), c = n(8), f = i(c), h = n(462), m = i(h), p = n(470), v = i(p), b = n(220), g = i(b), y = n(477), M = i(y), _ = n(222), w = i(_), S = n(61), C = i(S), x = function (e, t) {
      var n,
          i,
          r,
          a = e,
          o = !0,
          s = !1,
          u = void 0;

      try {
        for (n = t.split(".")[Symbol.iterator](); !(o = (i = n.next()).done); o = !0) r = i.value, a = a[r];
      } catch (e) {
        s = !0, u = e;
      } finally {
        try {
          !o && n.return && n.return();
        } finally {
          if (s) throw u;
        }
      }

      return a;
    }, t.default = {
      name: "MdTable",
      components: {
        MdTagSwitcher: u.default,
        MdTableAlternateHeader: v.default,
        MdTableThead: m.default,
        MdTableRow: g.default,
        MdTableRowGhost: M.default,
        MdTableCellSelection: w.default
      },
      props: {
        value: [Array, Object],
        mdModelId: {
          type: String,
          default: "id"
        },
        mdCard: Boolean,
        mdFixedHeader: Boolean,
        mdHeight: {
          type: [Number, String],
          default: 400
        },
        mdSort: String,
        mdSortOrder: r({
          type: String,
          default: "asc"
        }, (0, f.default)("md-sort-order", ["asc", "desc"])),
        mdSortFn: {
          type: Function,
          default: function (e) {
            var t = this;
            return e.sort(function (e, n) {
              var i = t.MdTable.sort,
                  r = x(e, i),
                  a = x(n, i),
                  o = "asc" === t.MdTable.sortOrder,
                  s = "number" == typeof r;
              return r ? a ? s ? o ? r - a : a - r : o ? r.localeCompare(a) : a.localeCompare(r) : -1 : 1;
            });
          }
        },
        mdSelectedValue: {
          type: [Array, Object]
        }
      },
      data: function () {
        return {
          windowResizeObserver: null,
          fixedHeaderTableWidth: 0,
          fixedHeaderPadding: 0,
          hasContentScroll: !1,
          MdTable: {
            items: {},
            sort: null,
            sortOrder: null,
            singleSelection: null,
            selectedItems: [],
            selectable: [],
            fixedHeader: null,
            contentPadding: null,
            contentEl: null,
            hasValue: this.hasValue,
            emitEvent: this.emitEvent,
            sortTable: this.sortTable,
            manageItemSelection: this.manageItemSelection,
            getModel: this.getModel,
            getModelItem: this.getModelItem,
            selectingMode: null
          },
          itemsUuidMap: new WeakMap()
        };
      },
      computed: {
        contentTag: function () {
          return this.mdCard ? "md-card" : "md-content";
        },
        headerCount: function () {
          return Object.keys(this.MdTable.items).length;
        },
        selectedCount: function () {
          return this.MdTable.selectedItems.length;
        },
        headerStyles: function () {
          if (this.mdFixedHeader) return "padding-right: " + this.fixedHeaderPadding + "px";
        },
        hasValue: function () {
          return this.value && 0 !== this.value.length;
        },
        headerClasses: function () {
          if (this.mdFixedHeader && this.hasContentScroll || !this.hasValue) return "md-table-fixed-header-active";
        },
        contentStyles: function () {
          if (this.mdFixedHeader) {
            var e = "number" == typeof this.mdHeight ? this.mdHeight + "px" : this.mdHeight;
            return "height: " + e + ";max-height: " + e;
          }
        },
        contentClasses: function () {
          if (this.mdFixedHeader && 0 === this.value.length) return "md-table-empty";
        },
        fixedHeaderTableStyles: function () {
          return {
            width: this.fixedHeaderTableWidth + "px"
          };
        }
      },
      provide: function () {
        return {
          MdTable: this.MdTable
        };
      },
      watch: {
        mdSort: {
          immediate: !0,
          handler: function () {
            this.MdTable.sort = this.mdSort;
          }
        },
        mdSortOrder: {
          immediate: !0,
          handler: function () {
            this.MdTable.sortOrder = this.mdSortOrder;
          }
        },
        mdFixedHeader: {
          immediate: !0,
          handler: function () {
            this.MdTable.fixedHeader = this.mdFixedHeader;
          }
        },
        hasValue: {
          immediate: !0,
          handler: function () {
            this.MdTable.hasValue = this.hasValue;
          }
        },
        "MdTable.selectedItems": function (e, t) {
          var n = this;
          (function () {
            var i = n.isEmpty(e),
                r = n.isEmpty(t),
                a = i && r;
            return !a && (!!a || e.length !== t.length || !e.every(function (e, n) {
              return e == t[n];
            }));
          })() && this.select(e);
        },
        "MdTable.singleSelection": function (e, t) {
          e != t && this.select(e);
        },
        mdSelectedValue: function () {
          this.syncSelectedValue();
        },
        value: function () {
          this.syncSelectedValue(), this.setWidth();
        }
      },
      methods: {
        isEmpty: function (e) {
          return !e || 0 === e.length;
        },
        emitEvent: function (e, t) {
          this.$emit(e, t);
        },
        getRowId: function (e, t) {
          var n = e[t];
          return n || (n = this.itemsUuidMap.get(e), n || (n = "md-row-" + (0, d.default)(), this.itemsUuidMap.set(e, n)), n);
        },
        setScroll: function (e) {
          var t = this;
          (0, o.default)(function () {
            t.mdFixedHeader && (t.$refs.fixedHeaderContainer.scrollLeft = e.target.scrollLeft), t.hasContentScroll = e.target.scrollTop > 0;
          });
        },
        setHeaderScroll: function (e) {
          var t = this;
          (0, o.default)(function () {
            t.MdTable.contentEl.scrollLeft = e.target.scrollLeft;
          });
        },
        getContentEl: function () {
          return this.$el.querySelector(".md-table-content");
        },
        setContentEl: function () {
          this.MdTable.contentEl = this.getContentEl();
        },
        setHeaderPadding: function () {
          var e, t;
          this.setContentEl(), e = this.MdTable.contentEl, t = e.childNodes[0], this.fixedHeaderPadding = e.offsetWidth - t.offsetWidth;
        },
        getModel: function () {
          return this.value;
        },
        getModelItem: function (e) {
          return this.value[e];
        },
        manageItemSelection: function (e) {
          this.MdTable.selectedItems.includes(e) ? this.MdTable.selectedItems = this.MdTable.selectedItems.filter(function (t) {
            return t !== e;
          }) : this.MdTable.selectedItems = this.MdTable.selectedItems.concat([e]);
        },
        sortTable: function () {
          Array.isArray(this.value) && this.$emit("input", this.mdSortFn(this.value));
        },
        select: function (e) {
          this.$emit("update:mdSelectedValue", e), this.$emit("md-selected", e);
        },
        syncSelectedValue: function () {
          var e = this;
          this.$nextTick().then(function () {
            "single" === e.MdTable.selectingMode ? e.MdTable.singleSelection = e.mdSelectedValue : "multiple" === e.MdTable.selectingMode && (e.MdTable.selectedItems = e.mdSelectedValue || []);
          });
        },
        setWidth: function () {
          this.mdFixedHeader && (this.fixedHeaderTableWidth = this.$refs.contentTable.offsetWidth);
        }
      },
      created: function () {
        this.mdSort && this.sortTable(), this.syncSelectedValue();
      },
      mounted: function () {
        this.setContentEl(), this.$nextTick().then(this.setWidth), this.mdFixedHeader && (this.setHeaderPadding(), this.windowResizeObserver = new C.default(window, this.setWidth));
      },
      beforeDestroy: function () {
        this.windowResizeObserver && this.windowResizeObserver.destroy();
      }
    };
  }, function (e, t, n) {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: !0
    });

    var i = Object.assign || function (e) {
      var t, n, i;

      for (t = 1; t < arguments.length; t++) {
        n = arguments[t];

        for (i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i]);
      }

      return e;
    };

    t.default = {
      functional: !0,
      props: {
        mdTag: {
          type: String,
          default: "div"
        }
      },
      render: function (e, t) {
        var n = t.props,
            r = t.children,
            a = t.data,
            o = t.listeners;
        return e(n.mdTag, i({}, a, {
          on: o
        }), r);
      }
    };
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    var r, a, o, s;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(101), a = i(r), o = n(467), s = i(o), t.default = {
      name: "MdTableThead",
      inject: ["MdTable"],
      components: {
        MdTableHead: a.default,
        MdTableHeadSelection: s.default
      }
    };
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    var r, a, o, s;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(464), a = i(r), o = n(61), s = i(o), t.default = {
      name: "MdTableHead",
      components: {
        MdUpwardIcon: a.default
      },
      props: {
        mdNumeric: Boolean,
        numeric: Boolean,
        id: [String, Number],
        label: String,
        tooltip: String,
        sortBy: String
      },
      inject: ["MdTable"],
      data: function () {
        return {
          width: null,
          windowResizeObserver: null
        };
      },
      computed: {
        hasSort: function () {
          return this.MdTable.sort && this.sortBy;
        },
        isSorted: function () {
          if (this.MdTable.sort) return this.MdTable.sort === this.sortBy;
        },
        isDescSorted: function () {
          return this.isSorted && "desc" === this.MdTable.sortOrder;
        },
        isAscSorted: function () {
          return this.isSorted && "asc" === this.MdTable.sortOrder;
        },
        headStyles: function () {
          return {
            width: this.width + "px"
          };
        },
        headClasses: function () {
          return {
            "md-numeric": this.numeric || this.mdNumeric,
            "md-sortable": this.hasSort,
            "md-sorted": this.isSorted,
            "md-sorted-desc": this.isDescSorted
          };
        }
      },
      methods: {
        changeSort: function () {
          this.hasSort && (this.isAscSorted ? this.MdTable.sortOrder = "desc" : this.MdTable.sortOrder = "asc", this.MdTable.sort = this.sortBy, this.MdTable.emitEvent("md-sorted", this.MdTable.sort), this.MdTable.emitEvent("update:mdSort", this.MdTable.sort), this.MdTable.emitEvent("update:mdSortOrder", this.MdTable.sortOrder), this.MdTable.sortTable());
        },
        getChildNodesBySelector: function (e, t) {
          return Array.from(e.childNodes).filter(function (e) {
            var n = e.classList;
            return n && n.contains(t);
          });
        },
        getNodeIndex: function (e, t) {
          return [].indexOf.call(e, t);
        },
        setWidth: function () {
          var e, t, n, i;
          this.MdTable.fixedHeader && (e = "md-table-cell", t = this.getChildNodesBySelector(this.$el.parentNode, "md-table-head"), n = this.MdTable.contentEl.querySelectorAll("tr:first-child ." + e), i = this.getNodeIndex(t, this.$el), this.width = n[i].offsetWidth);
        }
      },
      updated: function () {
        this.$nextTick().then(this.setWidth);
      },
      mounted: function () {
        this.$nextTick().then(this.setWidth), this.MdTable.fixedHeader && (this.windowResizeObserver = new s.default(window, this.setWidth));
      },
      beforeDestroy: function () {
        this.windowResizeObserver && this.windowResizeObserver.destroy();
      }
    };
  }, function (e, t, n) {
    "use strict";

    var i, r;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), i = n(13), r = function (e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }(i), t.default = {
      name: "MdUpwardIcon",
      components: {
        MdIcon: r.default
      }
    };
  }, function (e, t, n) {
    "use strict";

    var i, r;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), i = n(101), r = function (e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }(i), t.default = {
      name: "MdTableHeadSelection",
      components: {
        MdTableHead: r.default
      },
      inject: ["MdTable"],
      computed: {
        selectableCount: function () {
          return Object.keys(this.selectable).length;
        },
        isDisabled: function () {
          return !this.selectableCount;
        },
        selectable: function () {
          return this.MdTable.selectable;
        },
        selectedItems: function () {
          return this.MdTable.selectedItems;
        },
        allSelected: function () {
          var e = this;
          return 0 !== this.selectableCount && this.selectable.every(function (t) {
            return e.selectedItems.includes(t);
          });
        }
      },
      methods: {
        onChange: function (e) {
          var t = this;
          this.MdTable.selectedItems = e ? this.selectedItems.concat(this.selectable.filter(function (e) {
            return !t.selectedItems.includes(e);
          })) : this.selectedItems.filter(function (e) {
            return !t.selectable.includes(e);
          });
        }
      }
    };
  }, function (e, t, n) {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = {
      name: "MdTableAlternateHeader"
    };
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      n(473);
    }

    var r, a, o, s, u, l, d, c, f, h;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(221), a = n.n(r);

    for (o in r) "default" !== o && function (e) {
      n.d(t, e, function () {
        return r[e];
      });
    }(o);

    s = n(476), u = n(0), l = !1, d = i, c = null, f = null, h = u(a.a, s.a, l, d, c, f), t.default = h.exports;
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    var r, a, o, s, u;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = Object.assign || function (e) {
      var t, n, i;

      for (t = 1; t < arguments.length; t++) {
        n = arguments[t];

        for (i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i]);
      }

      return e;
    }, a = n(8), o = i(a), s = n(222), u = i(s), t.default = {
      name: "MdTableRow",
      components: {
        MdTableCellSelection: u.default
      },
      props: {
        mdIndex: [Number, String],
        mdId: [Number, String],
        mdSelectable: r({
          type: [String]
        }, (0, o.default)("md-selectable", ["multiple", "single"])),
        mdDisabled: Boolean,
        mdAutoSelect: Boolean,
        mdItem: [Array, Object]
      },
      inject: ["MdTable"],
      data: function () {
        return {
          index: null
        };
      },
      computed: {
        selectableCount: function () {
          return this.MdTable.selectable.length;
        },
        isMultipleSelected: function () {
          return this.MdTable.selectedItems.includes(this.mdItem);
        },
        isSingleSelected: function () {
          return this.MdTable.singleSelection === this.mdItem;
        },
        hasMultipleSelection: function () {
          return this.MdTable.hasValue && "multiple" === this.mdSelectable;
        },
        hasSingleSelection: function () {
          return this.MdTable.hasValue && "single" === this.mdSelectable;
        },
        rowClasses: function () {
          if (this.MdTable.hasValue) return {
            "md-has-selection": !this.mdDisabled && (this.mdAutoSelect || this.hasSingleSelection),
            "md-selected": this.isMultipleSelected,
            "md-selected-single": this.isSingleSelected
          };
        },
        isInSelectedItems: function () {
          return this.MdTable.selectedItems.includes(this.mdItem);
        }
      },
      watch: {
        mdDisabled: function () {
          this.mdDisabled ? this.removeSelectableItem() : this.addSelectableItem();
        },
        mdSelectable: function () {
          this.MdTable.selectingMode = this.mdSelectable;
        },
        mdItem: function (e, t) {
          this.removeSelectableItem(t), this.$nextTick(this.addSelectableItem);
        }
      },
      methods: {
        onClick: function () {
          this.MdTable.hasValue && !this.mdDisabled && (this.hasMultipleSelection ? this.selectRowIfMultiple() : this.hasSingleSelection && this.selectRowIfSingle());
        },
        toggleSelection: function () {
          this.MdTable.manageItemSelection(this.mdItem);
        },
        addSelection: function () {
          this.isMultipleSelected || (this.MdTable.selectedItems = this.MdTable.selectedItems.concat([this.mdItem]));
        },
        removeSelection: function () {
          var e = this;
          this.isMultipleSelected && (this.MdTable.selectedItems = this.MdTable.selectedItems.filter(function (t) {
            return t !== e.mdItem;
          }));
        },
        selectRowIfSingle: function () {
          this.MdTable.singleSelection === this.mdItem ? this.MdTable.singleSelection = null : this.MdTable.singleSelection = this.mdItem;
        },
        selectRowIfMultiple: function () {
          this.mdAutoSelect && this.toggleSelection();
        },
        addSelectableItem: function () {
          return !(!this.hasMultipleSelection || this.mdDisabled) && !this.MdTable.selectable.includes(this.mdItem) && void (this.MdTable.selectable = this.MdTable.selectable.concat([this.mdItem]));
        },
        removeSelectableItem: function () {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.mdItem;
          "multiple" === this.mdSelectable && (this.MdTable.selectable = this.MdTable.selectable.filter(function (t) {
            return t !== e;
          }));
        }
      },
      created: function () {
        var e = this;
        this.$nextTick(function () {
          e.addSelectableItem(), e.MdTable.selectingMode = e.mdSelectable;
        });
      },
      beforeDestroy: function () {
        this.removeSelectableItem();
      }
    };
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      n(474);
    }

    var r, a, o, s, u, l, d, c, f, h;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(223), a = n.n(r);

    for (o in r) "default" !== o && function (e) {
      n.d(t, e, function () {
        return r[e];
      });
    }(o);

    s = n(475), u = n(0), l = !1, d = i, c = null, f = null, h = u(a.a, s.a, l, d, c, f), t.default = h.exports;
  }, function (e, t, n) {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = {
      name: "MdTableCellSelection",
      props: {
        value: Boolean,
        mdRowId: [Number, String],
        mdSelectable: Boolean,
        mdDisabled: Boolean
      },
      inject: ["MdTable"],
      data: function () {
        return {
          isSelected: !1
        };
      },
      watch: {
        value: {
          immediate: !0,
          handler: function (e) {
            this.isSelected = e;
          }
        }
      },
      methods: {
        onChange: function () {
          this.$emit("input", this.isSelected);
        }
      }
    };
  }, function (e, t, n) {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = {
      name: "MdTableRowGhost",
      props: {
        mdIndex: [String, Number],
        mdId: [String, Number],
        mdItem: [Array, Object]
      },
      render: function () {
        return this.$slots.default[0].componentOptions.propsData.mdIndex = this.mdIndex, this.$slots.default[0].componentOptions.propsData.mdId = this.mdId, this.$slots.default[0].componentOptions.propsData.mdItem = this.mdItem, this.$slots.default[0];
      }
    };
  }, function (e, t, n) {
    "use strict";

    var i, r;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), i = n(111), r = function (e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }(i), t.default = {
      name: "MdTableToolbar",
      components: {
        MdToolbar: r.default
      },
      inject: ["MdTable"]
    };
  }, function (e, t) {}, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement;
      return (e._self._c || t)("div", {
        staticClass: "md-toolbar",
        class: [e.$mdActiveTheme, "md-elevation-" + e.mdElevation]
      }, [e._t("default")], 2);
    },
        r = [],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    var r, a, o;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(105), i(r), a = n(97), o = i(a), t.default = {
      name: "MdTableEmptyState",
      props: o.default,
      inject: ["MdTable"]
    };
  }, function (e, t, n) {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = {
      name: "MdTableCell",
      props: {
        mdId: [String, Number],
        mdLabel: String,
        mdNumeric: Boolean,
        mdTooltip: String,
        mdSortBy: String
      },
      inject: ["MdTable"],
      data: function () {
        return {
          index: null,
          parentNode: null
        };
      },
      computed: {
        cellClasses: function () {
          return {
            "md-numeric": this.mdNumeric
          };
        }
      },
      watch: {
        mdSortBy: function () {
          this.setCellData();
        },
        mdNumeric: function () {
          this.setCellData();
        },
        mdLabel: function () {
          this.setCellData();
        },
        mdTooltip: function () {
          this.setCellData();
        }
      },
      methods: {
        setCellData: function () {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this;
          this.$set(this.MdTable.items, e.index, {
            id: e.mdId,
            label: e.mdLabel,
            numeric: e.mdNumeric,
            tooltip: e.mdTooltip,
            sortBy: e.mdSortBy
          });
        },
        updateAllCellData: function () {
          var e,
              t = this;
          this.MdTable.items = {}, e = Array.from(this.parentNode.childNodes).filter(function (e) {
            var t = e.tagName,
                n = e.classList,
                i = n && n.contains("md-table-cell-selection");
            return t && "td" === t.toLowerCase() && !i;
          }), e.forEach(function (e, n) {
            var i = e.__vue__;
            i.index = n, t.setCellData(i);
          });
        }
      },
      mounted: function () {
        this.parentNode = this.$el.parentNode, this.updateAllCellData();
      },
      destroyed: function () {
        if (null !== this.$el.parentNode) return !1;
        this.updateAllCellData();
      }
    };
  }, function (e, t, n) {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = {
      name: "MdTablePagination",
      inject: ["MdTable"],
      props: {
        mdPageSize: {
          type: [String, Number],
          default: 10
        },
        mdPageOptions: {
          type: Array,
          default: function () {
            return [10, 25, 50, 100];
          }
        },
        mdPage: {
          type: Number,
          default: 1
        },
        mdTotal: {
          type: [String, Number],
          default: "Many"
        },
        mdLabel: {
          type: String,
          default: "Rows per page:"
        },
        mdSeparator: {
          type: String,
          default: "of"
        }
      },
      data: function () {
        return {
          currentPageSize: 0
        };
      },
      computed: {
        currentItemCount: function () {
          return (this.mdPage - 1) * this.mdPageSize + 1;
        },
        currentPageCount: function () {
          return this.mdPage * this.mdPageSize;
        }
      },
      watch: {
        mdPageSize: {
          immediate: !0,
          handler: function (e) {
            this.currentPageSize = this.pageSize;
          }
        }
      },
      methods: {
        setPageSize: function () {
          this.$emit("update:mdPageSize", this.currentPageSize);
        },
        goToPrevious: function () {},
        goToNext: function () {}
      },
      created: function () {
        this.currentPageSize = this.mdPageSize;
      }
    };
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    function r(e, t, n) {
      return t in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }) : e[t] = n, e;
    }

    var a, o, s, u, l, d, c, f, h, m, p, v, b, g, y, M, _;

    Object.defineProperty(t, "__esModule", {
      value: !0
    }), a = Object.assign || function (e) {
      var t, n, i;

      for (t = 1; t < arguments.length; t++) {
        n = arguments[t];

        for (i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i]);
      }

      return e;
    }, o = n(10), s = i(o), u = n(1), l = i(u), d = n(43), c = i(d), f = n(8), h = i(f), m = n(48), p = i(m), v = n(110), b = i(v), g = n(103), y = i(g), M = n(104), _ = i(M), t.default = new l.default({
      name: "MdTabs",
      mixins: [c.default, _.default],
      components: {
        MdContent: y.default
      },
      props: {
        mdAlignment: a({
          type: String,
          default: "left"
        }, (0, h.default)("md-alignment", ["left", "right", "centered", "fixed"])),
        mdElevation: {
          type: [Number, String],
          default: 0
        },
        mdSyncRoute: Boolean,
        mdDynamicHeight: Boolean,
        mdActiveTab: [String, Number]
      },
      data: function () {
        return {
          resizeObserver: null,
          activeTab: 0,
          activeTabIndex: 0,
          indicatorStyles: {},
          indicatorClass: null,
          noTransition: !0,
          containerStyles: {},
          contentStyles: {
            height: "0px"
          },
          hasContent: !1,
          MdTabs: {
            items: {}
          },
          activeButtonEl: null
        };
      },
      provide: function () {
        return {
          MdTabs: this.MdTabs
        };
      },
      computed: {
        tabsClasses: function () {
          var e;
          return e = {}, r(e, "md-alignment-" + this.mdAlignment, !0), r(e, "md-no-transition", this.noTransition), r(e, "md-dynamic-height", this.mdDynamicHeight), e;
        },
        navigationClasses: function () {
          return "md-elevation-" + this.mdElevation;
        },
        mdSwipeElement: function () {
          return this.$refs.tabsContent.$el;
        }
      },
      watch: {
        MdTabs: {
          deep: !0,
          handler: function () {
            this.setHasContent();
          }
        },
        activeTab: function (e) {
          var t = this;
          this.$emit("md-changed", e), this.$nextTick().then(function () {
            t.setIndicatorStyles(), t.setActiveButtonEl();
          });
        },
        mdActiveTab: function (e) {
          this.activeTab = e, this.$emit("md-changed", e);
        },
        activeButtonEl: function (e) {
          this.activeTabIndex = e ? [].indexOf.call(e.parentNode.childNodes, e) : -1;
        },
        activeTabIndex: function (e) {
          this.setIndicatorStyles(), this.calculateTabPos();
        },
        $route: function () {
          this.$nextTick(this.setActiveButtonEl);
        },
        swiped: function (e) {
          var t = this.getItemsAndKeys(),
              n = t.keys,
              i = n.length || 0;
          this.activeTabIndex < i && "right" === e ? this.setSwipeActiveTabByIndex(this.activeTabIndex + 1) : this.activeTabIndex > 0 && "left" === e && this.setSwipeActiveTabByIndex(this.activeTabIndex - 1);
        }
      },
      methods: {
        hasActiveTab: function () {
          return this.activeTab || this.mdActiveTab;
        },
        getItemsAndKeys: function () {
          var e = this.MdTabs.items;
          return {
            items: e,
            keys: Object.keys(e)
          };
        },
        setActiveTab: function (e) {
          this.mdSyncRoute || (this.activeTab = e);
        },
        setActiveButtonEl: function () {
          this.activeButtonEl = this.$refs.navigation.querySelector(".md-tab-nav-button.md-active");
        },
        setSwipeActiveTabByIndex: function (e) {
          var t = this.getItemsAndKeys(),
              n = t.keys;
          n && (this.activeTab = n[e]);
        },
        setActiveTabByIndex: function (e) {
          var t = this.getItemsAndKeys(),
              n = t.keys;
          this.hasActiveTab() || (this.activeTab = n[e]);
        },
        setHasContent: function () {
          var e = this.getItemsAndKeys(),
              t = e.items,
              n = e.keys;
          this.hasContent = n.some(function (e) {
            return t[e].hasContent;
          });
        },
        setIndicatorStyles: function () {
          var e = this;
          (0, s.default)(function () {
            e.$nextTick().then(function () {
              var t, n, i;
              e.activeButtonEl && e.$refs.indicator ? (t = e.activeButtonEl.offsetWidth, n = e.activeButtonEl.offsetLeft, i = e.$refs.indicator.offsetLeft, e.indicatorClass = i < n ? "md-tabs-indicator-right" : "md-tabs-indicator-left", e.indicatorStyles = {
                left: n + "px",
                right: "calc(100% - " + (t + n) + "px)"
              }) : e.indicatorStyles = {
                left: "100%",
                right: "100%"
              };
            });
          });
        },
        calculateTabPos: function () {
          if (this.hasContent) {
            var e = this.$el.querySelector(".md-tab:nth-child(" + (this.activeTabIndex + 1) + ")");
            this.contentStyles = {
              height: e ? e.offsetHeight + "px" : 0
            }, this.containerStyles = {
              transform: "translate3D(" + 100 * -this.activeTabIndex + "%, 0, 0)"
            };
          }
        },
        callResizeFunctions: function () {
          this.setIndicatorStyles(), this.calculateTabPos();
        },
        setupObservers: function () {
          var e = this;
          this.resizeObserver = (0, p.default)(this.$el.querySelector(".md-tabs-content"), {
            childList: !0,
            characterData: !0,
            subtree: !0
          }, function () {
            e.callResizeFunctions();
          }), window.addEventListener("resize", this.callResizeFunctions);
        }
      },
      created: function () {
        this.setIndicatorStyles = (0, b.default)(this.setIndicatorStyles, 300), this.setHasContent(), this.activeTab = this.mdActiveTab;
      },
      mounted: function () {
        var e = this;
        this.setupObservers(), this.$nextTick().then(function () {
          return e.mdSyncRoute || e.setActiveTabByIndex(0), e.$nextTick();
        }).then(function () {
          e.setActiveButtonEl(), e.calculateTabPos(), window.setTimeout(function () {
            e.noTransition = !1, e.setupObservers();
          }, 100);
        }), this.$refs.navigation.addEventListener("transitionend", this.setIndicatorStyles);
      },
      beforeDestroy: function () {
        this.resizeObserver && this.resizeObserver.disconnect(), window.removeEventListener("resize", this.callResizeFunctions), this.$refs.navigation.removeEventListener("transitionend", this.setIndicatorStyles);
      }
    });
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    var r, a, o, s, u, l, d, c, f;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = Object.assign || function (e) {
      var t, n, i;

      for (t = 1; t < arguments.length; t++) {
        n = arguments[t];

        for (i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i]);
      }

      return e;
    }, a = n(11), o = i(a), s = n(28), u = i(s), l = n(48), d = i(l), c = n(29), f = i(c), t.default = {
      name: "MdTab",
      mixins: [u.default],
      props: {
        id: {
          type: String,
          default: function () {
            return "md-tab-" + (0, o.default)();
          }
        },
        href: [String, Number],
        mdDisabled: Boolean,
        mdLabel: [String, Number],
        mdIcon: String,
        mdTemplateData: {
          type: Object,
          default: function () {
            return {};
          }
        }
      },
      inject: ["MdTabs"],
      data: function () {
        return {
          observer: null
        };
      },
      watch: {
        $props: {
          deep: !0,
          handler: function () {
            this.setTabData();
          }
        },
        $attrs: {
          deep: !0,
          handler: function () {
            this.setTabData();
          }
        }
      },
      methods: {
        setTabContent: function () {
          this.$set(this.MdTabs.items[this.id], "hasContent", !!this.$slots.default);
        },
        setupObserver: function () {
          this.observer = (0, d.default)(this.$el, {
            childList: !0
          }, this.setTabContent);
        },
        setTabData: function () {
          this.$set(this.MdTabs.items, this.id, {
            hasContent: !!this.$slots.default,
            label: this.mdLabel,
            icon: this.mdIcon,
            disabled: this.mdDisabled,
            data: this.mdTemplateData,
            props: this.getPropValues(),
            events: this.$listeners
          });
        },
        getPropValues: function () {
          var e = this,
              t = Object.keys(this.$options.props),
              n = ["id", "mdLabel", "mdDisabled", "mdTemplateData"],
              i = {};
          return t.forEach(function (t) {
            n.includes(t) || (e[t] ? i[t] = e[t] : e.$attrs.hasOwnProperty(t) && (i[t] = !t || e.$attrs[t]));
          }), i;
        }
      },
      mounted: function () {
        this.setupObserver(), this.setTabData();
      },
      beforeDestroy: function () {
        this.observer && this.observer.disconnect(), this.$delete(this.MdTabs.items, this.id);
      },
      render: function (e) {
        var t = {
          staticClass: "md-tab",
          attrs: r({}, this.$attrs, {
            id: this.id
          }),
          on: this.$listeners
        };
        return this.href ? this.buttonProps = this.$options.props : this.$router && this.to && (this.$options.props = (0, f.default)(this, this.$options.props), t.props = this.$props), e("div", t, this.$slots.default);
      }
    };
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    var r, a, o, s, u, l, d;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = Object.assign || function (e) {
      var t, n, i;

      for (t = 1; t < arguments.length; t++) {
        n = arguments[t];

        for (i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i]);
      }

      return e;
    }, a = n(1), o = i(a), s = n(8), u = i(s), l = n(56), d = i(l), t.default = new o.default({
      name: "MdTooltip",
      components: {
        MdPopover: d.default
      },
      props: {
        mdActive: Boolean,
        mdDelay: {
          type: [String, Number],
          default: 0
        },
        mdDirection: r({
          type: String,
          default: "bottom"
        }, (0, u.default)("md-direction", ["top", "right", "bottom", "left"]))
      },
      data: function () {
        return {
          shouldRender: !1,
          targetEl: null
        };
      },
      computed: {
        tooltipClasses: function () {
          return "md-tooltip-" + this.mdDirection;
        },
        tooltipStyles: function () {
          return "transition-delay: " + this.mdDelay + "ms";
        },
        popperSettings: function () {
          return {
            placement: this.mdDirection,
            modifiers: {
              offset: {
                offset: "0, 16"
              }
            }
          };
        }
      },
      watch: {
        mdActive: function () {
          this.shouldRender = this.mdActive;
        },
        shouldRender: function (e) {
          this.$emit("update:mdActive", e);
        }
      },
      methods: {
        show: function () {
          this.shouldRender = !0;
        },
        hide: function () {
          this.shouldRender = !1;
        }
      },
      mounted: function () {
        var e = this;
        this.$nextTick().then(function () {
          e.shouldRender = e.mdActive, e.targetEl = e._vnode.componentInstance.originalParentEl, e.targetEl && (e.targetEl.addEventListener("mouseenter", e.show, !1), e.targetEl.addEventListener("mouseleave", e.hide, !1));
        });
      },
      beforeDestroy: function () {
        this.targetEl && (this.targetEl.removeEventListener("mouseenter", this.show), this.targetEl.removeEventListener("mouseleave", this.hide));
      }
    });
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    var r, a, o, s, u, l, d, c, f, h;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(3), a = i(r), o = n(235), s = i(o), u = n(245), l = i(u), d = n(248), c = i(d), f = n(251), h = i(f), t.default = function (e) {
      (0, a.default)(e), e.component(s.default.name, s.default), e.component(l.default.name, l.default), e.component(c.default.name, c.default), e.component(h.default.name, h.default);
    };
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      n(236);
    }

    var r, a, o, s, u, l, d, c, f, h;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(112), a = n.n(r);

    for (o in r) "default" !== o && function (e) {
      n.d(t, e, function () {
        return r[e];
      });
    }(o);

    s = n(0), u = null, l = !1, d = i, c = null, f = null, h = s(a.a, u, l, d, c, f), t.default = h.exports;
  }, function (e, t) {}, function (e, t, n) {
    "use strict";

    function i(e) {
      n(238);
    }

    var r, a, o, s, u, l, d, c, f, h;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(113), a = n.n(r);

    for (o in r) "default" !== o && function (e) {
      n.d(t, e, function () {
        return r[e];
      });
    }(o);

    s = n(239), u = n(0), l = !1, d = i, c = null, f = null, h = u(a.a, s.a, l, d, c, f), t.default = h.exports;
  }, function (e, t) {}, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement,
          n = e._self._c || t;
      return n("div", {
        staticClass: "md-app md-app-side-drawer md-layout-row",
        class: [e.appClasses, e.$mdActiveTheme]
      }, [e._t("md-app-drawer-left"), e._v(" "), e._t("md-app-drawer-right-previous"), e._v(" "), n("main", {
        staticClass: "md-app-container md-flex md-layout-column",
        class: [e.$mdActiveTheme, e.scrollerClasses],
        style: e.contentStyles,
        on: {
          "&scroll": function (t) {
            return e.handleScroll(t);
          }
        }
      }, [e._t("md-app-toolbar"), e._v(" "), n("div", {
        staticClass: "md-app-scroller md-layout-column md-flex",
        class: [e.$mdActiveTheme, e.scrollerClasses],
        style: e.containerStyles,
        on: {
          "&scroll": function (t) {
            return e.handleScroll(t);
          }
        }
      }, [e._t("md-app-content")], 2)], 2), e._v(" "), e._t("md-app-drawer-right")], 2);
    },
        r = [],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      n(241);
    }

    var r, a, o, s, u, l, d, c, f, h;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(115), a = n.n(r);

    for (o in r) "default" !== o && function (e) {
      n.d(t, e, function () {
        return r[e];
      });
    }(o);

    s = n(242), u = n(0), l = !1, d = i, c = null, f = null, h = u(a.a, s.a, l, d, c, f), t.default = h.exports;
  }, function (e, t) {}, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement,
          n = e._self._c || t;
      return n("div", {
        staticClass: "md-app md-app-internal-drawer md-layout-column",
        class: [e.appClasses, e.$mdActiveTheme]
      }, [e._t("md-app-toolbar"), e._v(" "), n("main", {
        staticClass: "md-app-container md-flex md-layout-row",
        class: [e.$mdActiveTheme, e.scrollerClasses],
        style: [e.containerStyles, e.contentStyles]
      }, [e._t("md-app-drawer-left"), e._v(" "), e._t("md-app-drawer-right-previous"), e._v(" "), n("div", {
        staticClass: "md-app-scroller md-layout-column md-flex",
        class: [e.$mdActiveTheme, e.scrollerClasses]
      }, [e._t("md-app-content")], 2), e._v(" "), e._t("md-app-drawer-right")], 2)], 2);
    },
        r = [],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t, n) {
    "use strict";

    var i, r, a, o, s, u, l, d, c, f;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), i = n(116), r = n.n(i);

    for (a in i) "default" !== a && function (e) {
      n.d(t, e, function () {
        return i[e];
      });
    }(a);

    o = n(244), s = n(0), u = !1, l = null, d = null, c = null, f = s(r.a, o.a, u, l, d, c), t.default = f.exports;
  }, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement;
      return (e._self._c || t)("div", {
        directives: [{
          name: "show",
          rawName: "v-show",
          value: !1,
          expression: "false"
        }],
        staticClass: "md-drawer md-right-previous",
        class: e.drawerClasses
      });
    },
        r = [],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      n(246);
    }

    var r, a, o, s, u, l, d, c, f, h;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(117), a = n.n(r);

    for (o in r) "default" !== o && function (e) {
      n.d(t, e, function () {
        return r[e];
      });
    }(o);

    s = n(247), u = n(0), l = !1, d = i, c = null, f = null, h = u(a.a, s.a, l, d, c, f), t.default = h.exports;
  }, function (e, t) {}, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement;
      return (e._self._c || t)("md-toolbar", e._g(e._b({
        staticClass: "md-app-toolbar",
        class: e.toolbarClasses,
        style: e.toolbarStyles
      }, "md-toolbar", e.$attrs, !1), e.$listeners), [e._t("default")], 2);
    },
        r = [],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      n(249);
    }

    var r, a, o, s, u, l, d, c, f, h;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(118), a = n.n(r);

    for (o in r) "default" !== o && function (e) {
      n.d(t, e, function () {
        return r[e];
      });
    }(o);

    s = n(250), u = n(0), l = !1, d = i, c = null, f = null, h = u(a.a, s.a, l, d, c, f), t.default = h.exports;
  }, function (e, t) {}, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement,
          n = e._self._c || t;
      return e.showCard ? n("md-card", e._g(e._b({
        staticClass: "md-app-content md-flex"
      }, "md-card", e.$attrs, !1), e.$listeners), [e._t("default")], 2) : n("md-content", e._g(e._b({
        staticClass: "md-app-content md-flex"
      }, "md-content", e.$attrs, !1), e.$listeners), [e._t("default")], 2);
    },
        r = [],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t, n) {
    "use strict";

    var i, r, a, o, s, u, l, d, c, f;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), i = n(119), r = n.n(i);

    for (a in i) "default" !== a && function (e) {
      n.d(t, e, function () {
        return i[e];
      });
    }(a);

    o = n(252), s = n(0), u = !1, l = null, d = null, c = null, f = s(r.a, o.a, u, l, d, c), t.default = f.exports;
  }, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement;
      return (e._self._c || t)("md-drawer", e._g(e._b({
        ref: "drawer",
        staticClass: "md-app-drawer",
        attrs: {
          "md-active": e.mdActive && e.initialized,
          "md-right": e.mdRight
        }
      }, "md-drawer", e.$attrs, !1), e.$listeners), [e._t("default")], 2);
    },
        r = [],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    var r, a, o, s;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(3), a = i(r), o = n(254), s = i(o), t.default = function (e) {
      (0, a.default)(e), e.component(s.default.name, s.default);
    };
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      n(255);
    }

    var r, a, o, s, u, l, d, c, f, h;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(120), a = n.n(r);

    for (o in r) "default" !== o && function (e) {
      n.d(t, e, function () {
        return r[e];
      });
    }(o);

    s = n(259), u = n(0), l = !1, d = i, c = null, f = null, h = u(a.a, s.a, l, d, c, f), t.default = h.exports;
  }, function (e, t) {}, function (e, t, n) {
    "use strict";

    function i(e) {
      n(257);
    }

    var r, a, o, s, u, l, d, c, f, h;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(121), a = n.n(r);

    for (o in r) "default" !== o && function (e) {
      n.d(t, e, function () {
        return r[e];
      });
    }(o);

    s = n(258), u = n(0), l = !1, d = i, c = null, f = null, h = u(a.a, s.a, l, d, c, f), t.default = h.exports;
  }, function (e, t) {}, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement;
      return (e._self._c || t)("div", {
        staticClass: "md-badge",
        class: [e.$mdActiveTheme]
      }, [e._t("default")], 2);
    },
        r = [],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement,
          n = e._self._c || t;
      return e.hasDefaultSlot ? n("div", {
        staticClass: "md-badge-content"
      }, [e._t("default"), e._v(" "), n("md-badge-standalone", {
        class: e.badgeClasses,
        style: e.styles
      }, [n("div", [e._v("\n      " + e._s(e.mdContent) + "\n    ")])])], 2) : n("md-badge-standalone", {
        class: e.badgeClasses,
        style: e.styles
      }, [e._v("\n  " + e._s(e.mdContent) + "\n")]);
    },
        r = [],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    var r, a, o, s;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(3), a = i(r), o = n(261), s = i(o), t.default = function (e) {
      (0, a.default)(e), e.component(s.default.name, s.default);
    };
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      n(262);
    }

    var r, a, o, s, u, l, d, c, f, h;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(122), a = n.n(r);

    for (o in r) "default" !== o && function (e) {
      n.d(t, e, function () {
        return r[e];
      });
    }(o);

    s = n(265), u = n(0), l = !1, d = i, c = null, f = null, h = u(a.a, s.a, l, d, c, f), t.default = h.exports;
  }, function (e, t) {}, function (e, t, n) {
    "use strict";

    function i(e, t) {
      var n,
          i,
          r,
          a = t.length,
          o = e.length;
      if (o > a) return !1;
      if (o === a) return e === t;

      e: for (n = 0, i = 0; n < o; n++) {
        for (r = e.charCodeAt(n); i < a;) if (t.charCodeAt(i++) === r) continue e;

        return !1;
      }

      return !0;
    }

    e.exports = i;
  }, function (e, t) {
    function n(e) {
      return !!e && ("object" == typeof e || "function" == typeof e) && "function" == typeof e.then;
    }

    e.exports = n;
  }, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement,
          n = e._self._c || t;
      return n("md-field", {
        staticClass: "md-autocomplete",
        class: e.fieldClasses,
        attrs: {
          "md-clearable": "",
          "md-inline": e.isBoxLayout
        }
      }, [n("md-menu", {
        attrs: {
          "md-direction": "bottom-start",
          "md-dense": e.mdDense,
          "md-align-trigger": "",
          "md-full-width": "",
          "md-active": e.showMenu
        },
        on: {
          "update:mdActive": function (t) {
            e.showMenu = t;
          },
          "update:md-active": function (t) {
            e.showMenu = t;
          }
        }
      }, [n("md-input", e._b({
        attrs: {
          id: e.mdInputId,
          name: e.mdInputName,
          maxlength: e.mdInputMaxlength,
          placeholder: e.mdInputPlaceholder
        },
        on: {
          focus: function (t) {
            return t.stopPropagation(), e.openOnFocus(t);
          },
          blur: e.hideOptions,
          input: e.onInput,
          click: function (t) {
            return t.stopPropagation(), t.preventDefault(), e.openOnFocus(t);
          }
        },
        model: {
          value: e.searchTerm,
          callback: function (t) {
            e.searchTerm = t;
          },
          expression: "searchTerm"
        }
      }, "md-input", e.$attrs, !1)), e._v(" "), n("md-menu-content", {
        directives: [{
          name: "show",
          rawName: "v-show",
          value: e.hasScopedEmptySlot || e.hasFilteredItems,
          expression: "hasScopedEmptySlot || hasFilteredItems"
        }],
        class: e.contentClasses
      }, [e.isPromisePending ? n("div", {
        staticClass: "md-autocomplete-loading"
      }, [n("md-progress-spinner", {
        attrs: {
          "md-diameter": 40,
          "md-stroke": 4,
          "md-mode": "indeterminate"
        }
      })], 1) : e._e(), e._v(" "), e.hasFilteredItems ? n("div", {
        staticClass: "md-autocomplete-items"
      }, e._l(e.getOptions(), function (t, i) {
        return n("md-menu-item", {
          key: i,
          on: {
            click: function (n) {
              return e.selectItem(t, n);
            }
          }
        }, [e.$scopedSlots["md-autocomplete-item"] ? e._t("md-autocomplete-item", null, {
          item: t,
          term: e.searchTerm
        }) : [e._v(e._s(t))]], 2);
      }), 1) : e.hasScopedEmptySlot ? n("md-menu-item", [n("div", {
        staticClass: "md-autocomplete-empty"
      }, [e._t("md-autocomplete-empty", null, {
        term: e.searchTerm
      })], 2)]) : e._e()], 1)], 1), e._v(" "), e._t("default")], 2);
    },
        r = [],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    var r, a, o, s;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(3), a = i(r), o = n(267), s = i(o), t.default = function (e) {
      (0, a.default)(e), e.component(s.default.name, s.default);
    };
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      n(268);
    }

    var r, a, o, s, u, l, d, c, f, h;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(123), a = n.n(r);

    for (o in r) "default" !== o && function (e) {
      n.d(t, e, function () {
        return r[e];
      });
    }(o);

    s = n(269), u = n(0), l = !1, d = i, c = null, f = null, h = u(a.a, s.a, l, d, c, f), t.default = h.exports;
  }, function (e, t) {}, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement;
      return (e._self._c || t)("div", {
        staticClass: "md-avatar",
        class: [e.$mdActiveTheme]
      }, [e._t("default")], 2);
    },
        r = [],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    var r, a, o, s, u, l;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(3), a = i(r), o = n(271), s = i(o), u = n(274), l = i(u), t.default = function (e) {
      (0, a.default)(e), e.component(s.default.name, s.default), e.component(l.default.name, l.default);
    };
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      n(272);
    }

    var r, a, o, s, u, l, d, c, f, h;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(124), a = n.n(r);

    for (o in r) "default" !== o && function (e) {
      n.d(t, e, function () {
        return r[e];
      });
    }(o);

    s = n(273), u = n(0), l = !1, d = i, c = null, f = null, h = u(a.a, s.a, l, d, c, f), t.default = h.exports;
  }, function (e, t) {}, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement,
          n = e._self._c || t;
      return n("div", {
        staticClass: "md-bottom-bar",
        class: [e.$mdActiveTheme, e.barClasses]
      }, [n("md-ripple", {
        attrs: {
          "md-disabled": "fixed" === e.mdType,
          "md-active": e.MdBottomBar.mouseEvent
        }
      }, [e._t("default")], 2)], 1);
    },
        r = [],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t, n) {
    "use strict";

    var i, r, a, o, s, u, l, d, c, f;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), i = n(125), r = n.n(i);

    for (a in i) "default" !== a && function (e) {
      n.d(t, e, function () {
        return i[e];
      });
    }(a);

    o = n(275), s = n(0), u = !1, l = null, d = null, c = null, f = s(r.a, o.a, u, l, d, c), t.default = f.exports;
  }, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement,
          n = e._self._c || t;
      return n("md-button", e._g(e._b({
        staticClass: "md-bottom-bar-item",
        class: e.itemClasses,
        attrs: {
          id: e.id,
          disabled: e.mdDisabled,
          "md-ripple": "fixed" === e.MdBottomBar.type
        },
        on: {
          click: e.setActiveItem
        }
      }, "md-button", e.attrs, !1), e.$listeners), [e.$slots.default ? e._t("default") : [e.isAssetIcon(e.mdIcon) ? n("md-icon", {
        staticClass: "md-bottom-bar-icon",
        attrs: {
          "md-src": e.mdIcon
        }
      }) : n("md-icon", {
        staticClass: "md-bottom-bar-icon"
      }, [e._v(e._s(e.mdIcon))]), e._v(" "), n("span", {
        staticClass: "md-bottom-bar-label"
      }, [e._v(e._s(e.mdLabel))])]], 2);
    },
        r = [],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    var r, a, o, s;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(3), a = i(r), o = n(39), s = i(o), t.default = function (e) {
      (0, a.default)(e), e.component(s.default.name, s.default);
    };
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    var r, a, o, s, u, l, d, c, f, h, m, p, v, b, g, y, M, _, w, S, C, x, O, T, P, D;

    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(3), a = i(r), o = n(278), s = i(o), u = n(281), l = i(u), d = n(284), c = i(d), f = n(287), h = i(f), m = n(289), p = i(m), v = n(292), b = i(v), g = n(295), y = i(g), M = n(298), _ = i(M), w = n(301), S = i(w), C = n(304), x = i(C), O = n(306), T = i(O), P = n(309), D = i(P), t.default = function (e) {
      (0, a.default)(e), e.component(s.default.name, s.default), e.component(l.default.name, l.default), e.component(c.default.name, c.default), e.component(h.default.name, h.default), e.component(p.default.name, p.default), e.component(b.default.name, b.default), e.component(y.default.name, y.default), e.component(_.default.name, _.default), e.component(S.default.name, S.default), e.component(x.default.name, x.default), e.component(T.default.name, T.default), e.component(D.default.name, D.default);
    };
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      n(279);
    }

    var r, a, o, s, u, l, d, c, f, h;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(126), a = n.n(r);

    for (o in r) "default" !== o && function (e) {
      n.d(t, e, function () {
        return r[e];
      });
    }(o);

    s = n(280), u = n(0), l = !1, d = i, c = null, f = null, h = u(a.a, s.a, l, d, c, f), t.default = h.exports;
  }, function (e, t) {}, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement;
      return (e._self._c || t)("div", {
        staticClass: "md-card",
        class: [e.$mdActiveTheme, e.cardClasses]
      }, [e._t("default")], 2);
    },
        r = [],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      n(282);
    }

    var r, a, o, s, u, l, d, c, f, h;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(127), a = n.n(r);

    for (o in r) "default" !== o && function (e) {
      n.d(t, e, function () {
        return r[e];
      });
    }(o);

    s = n(283), u = n(0), l = !1, d = i, c = null, f = null, h = u(a.a, s.a, l, d, c, f), t.default = h.exports;
  }, function (e, t) {}, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement;
      return (e._self._c || t)("div", {
        staticClass: "md-card-area",
        class: e.areaClasses
      }, [e._t("default")], 2);
    },
        r = [],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      n(285);
    }

    var r, a, o, s, u, l, d, c, f, h;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(128), a = n.n(r);

    for (o in r) "default" !== o && function (e) {
      n.d(t, e, function () {
        return r[e];
      });
    }(o);

    s = n(286), u = n(0), l = !1, d = i, c = null, f = null, h = u(a.a, s.a, l, d, c, f), t.default = h.exports;
  }, function (e, t) {}, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement;
      return (e._self._c || t)("div", {
        staticClass: "md-card-header"
      }, [e._t("default")], 2);
    },
        r = [],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t, n) {
    "use strict";

    var i, r, a, o, s, u, l, d, c, f;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), i = n(129), r = n.n(i);

    for (a in i) "default" !== a && function (e) {
      n.d(t, e, function () {
        return i[e];
      });
    }(a);

    o = n(288), s = n(0), u = !1, l = null, d = null, c = null, f = s(r.a, o.a, u, l, d, c), t.default = f.exports;
  }, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement;
      return (e._self._c || t)("div", {
        staticClass: "md-card-header-text"
      }, [e._t("default")], 2);
    },
        r = [],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      n(290);
    }

    var r, a, o, s, u, l, d, c, f, h;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(130), a = n.n(r);

    for (o in r) "default" !== o && function (e) {
      n.d(t, e, function () {
        return r[e];
      });
    }(o);

    s = n(291), u = n(0), l = !1, d = i, c = null, f = null, h = u(a.a, s.a, l, d, c, f), t.default = h.exports;
  }, function (e, t) {}, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement;
      return (e._self._c || t)("div", {
        staticClass: "md-card-media",
        class: e.mediaClasses
      }, [e._t("default")], 2);
    },
        r = [],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      n(293);
    }

    var r, a, o, s, u, l, d, c, f, h;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(131), a = n.n(r);

    for (o in r) "default" !== o && function (e) {
      n.d(t, e, function () {
        return r[e];
      });
    }(o);

    s = n(294), u = n(0), l = !1, d = i, c = null, f = null, h = u(a.a, s.a, l, d, c, f), t.default = h.exports;
  }, function (e, t) {}, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement;
      return (e._self._c || t)("div", {
        staticClass: "md-card-media-actions"
      }, [e._t("default")], 2);
    },
        r = [],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      n(296);
    }

    var r, a, o, s, u, l, d, c, f, h;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(132), a = n.n(r);

    for (o in r) "default" !== o && function (e) {
      n.d(t, e, function () {
        return r[e];
      });
    }(o);

    s = n(297), u = n(0), l = !1, d = i, c = null, f = null, h = u(a.a, s.a, l, d, c, f), t.default = h.exports;
  }, function (e, t) {}, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement,
          n = e._self._c || t;
      return n("div", {
        staticClass: "md-card-media-cover",
        class: e.coverClasses
      }, [e._t("default"), e._v(" "), e.mdTextScrim ? n("div", {
        ref: "backdrop",
        staticClass: "md-card-backdrop",
        style: e.coverStyles
      }) : e._e()], 2);
    },
        r = [],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      n(299);
    }

    var r, a, o, s, u, l, d, c, f, h;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(133), a = n.n(r);

    for (o in r) "default" !== o && function (e) {
      n.d(t, e, function () {
        return r[e];
      });
    }(o);

    s = n(300), u = n(0), l = !1, d = i, c = null, f = null, h = u(a.a, s.a, l, d, c, f), t.default = h.exports;
  }, function (e, t) {}, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement;
      return (e._self._c || t)("div", {
        staticClass: "md-card-content"
      }, [e._t("default")], 2);
    },
        r = [],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      n(302);
    }

    var r, a, o, s, u, l, d, c, f, h;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(134), a = n.n(r);

    for (o in r) "default" !== o && function (e) {
      n.d(t, e, function () {
        return r[e];
      });
    }(o);

    s = n(303), u = n(0), l = !1, d = i, c = null, f = null, h = u(a.a, s.a, l, d, c, f), t.default = h.exports;
  }, function (e, t) {}, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement;
      return (e._self._c || t)("div", {
        staticClass: "md-card-expand"
      }, [e._t("default")], 2);
    },
        r = [],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      n(305);
    }

    var r, a, o, s, u, l, d, c, f, h;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(135), a = n.n(r);

    for (o in r) "default" !== o && function (e) {
      n.d(t, e, function () {
        return r[e];
      });
    }(o);

    s = n(0), u = null, l = !1, d = i, c = null, f = null, h = s(a.a, u, l, d, c, f), t.default = h.exports;
  }, function (e, t) {}, function (e, t, n) {
    "use strict";

    function i(e) {
      n(307);
    }

    var r, a, o, s, u, l, d, c, f, h;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(136), a = n.n(r);

    for (o in r) "default" !== o && function (e) {
      n.d(t, e, function () {
        return r[e];
      });
    }(o);

    s = n(308), u = n(0), l = !1, d = i, c = null, f = null, h = u(a.a, s.a, l, d, c, f), t.default = h.exports;
  }, function (e, t) {}, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement;
      return (e._self._c || t)("div", {
        staticClass: "md-card-expand-content",
        style: e.contentStyles
      }, [e._t("default")], 2);
    },
        r = [],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      n(310);
    }

    var r, a, o, s, u, l, d, c, f, h;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(137), a = n.n(r);

    for (o in r) "default" !== o && function (e) {
      n.d(t, e, function () {
        return r[e];
      });
    }(o);

    s = n(311), u = n(0), l = !1, d = i, c = null, f = null, h = u(a.a, s.a, l, d, c, f), t.default = h.exports;
  }, function (e, t) {}, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement;
      return (e._self._c || t)("div", {
        staticClass: "md-card-actions",
        class: "md-alignment-" + e.mdAlignment
      }, [e._t("default")], 2);
    },
        r = [],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    var r, a, o, s;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(3), a = i(r), o = n(313), s = i(o), t.default = function (e) {
      (0, a.default)(e), e.component(s.default.name, s.default);
    };
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      n(314);
    }

    var r, a, o, s, u, l, d, c, f, h;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(138), a = n.n(r);

    for (o in r) "default" !== o && function (e) {
      n.d(t, e, function () {
        return r[e];
      });
    }(o);

    s = n(315), u = n(0), l = !1, d = i, c = null, f = null, h = u(a.a, s.a, l, d, c, f), t.default = h.exports;
  }, function (e, t) {}, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement,
          n = e._self._c || t;
      return n("div", {
        staticClass: "md-checkbox",
        class: [e.$mdActiveTheme, e.checkClasses]
      }, [n("div", {
        staticClass: "md-checkbox-container",
        on: {
          click: function (t) {
            return t.stopPropagation(), e.toggleCheck(t);
          }
        }
      }, [n("md-ripple", {
        attrs: {
          "md-centered": "",
          "md-active": e.rippleActive,
          "md-disabled": e.disabled
        },
        on: {
          "update:mdActive": function (t) {
            e.rippleActive = t;
          },
          "update:md-active": function (t) {
            e.rippleActive = t;
          }
        }
      }, [n("input", e._b({
        attrs: {
          id: e.id,
          type: "checkbox"
        },
        domProps: {
          indeterminate: e.indeterminate
        }
      }, "input", e.attrs, !1))])], 1), e._v(" "), e.$slots.default ? n("label", {
        staticClass: "md-checkbox-label",
        attrs: {
          for: e.id
        },
        on: {
          click: function (t) {
            return t.preventDefault(), e.toggleCheck(t);
          }
        }
      }, [e._t("default")], 2) : e._e()]);
    },
        r = [],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    var r, a, o, s, u, l;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(3), a = i(r), o = n(317), s = i(o), u = n(320), l = i(u), t.default = function (e) {
      (0, a.default)(e), e.component(s.default.name, s.default), e.component(l.default.name, l.default);
    };
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      n(318);
    }

    var r, a, o, s, u, l, d, c, f, h;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(139), a = n.n(r);

    for (o in r) "default" !== o && function (e) {
      n.d(t, e, function () {
        return r[e];
      });
    }(o);

    s = n(319), u = n(0), l = !1, d = i, c = null, f = null, h = u(a.a, s.a, l, d, c, f), t.default = h.exports;
  }, function (e, t) {}, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement,
          n = e._self._c || t;
      return n("md-field", {
        staticClass: "md-chips",
        class: [e.$mdActiveTheme, e.chipsClasses]
      }, [e._t("default"), e._v(" "), e._l(e.value, function (t, i) {
        return n("md-chip", {
          key: t,
          attrs: {
            "md-deletable": !e.mdStatic,
            "md-clickable": !e.mdStatic,
            "md-duplicated": e.duplicatedChip === t
          },
          on: {
            keydown: function (n) {
              return !n.type.indexOf("key") && e._k(n.keyCode, "enter", 13, n.key, "Enter") ? null : e.$emit("md-click", t, i);
            },
            "md-delete": function (n) {
              return n.stopPropagation(), e.removeChip(t);
            }
          },
          nativeOn: {
            click: function (n) {
              return e.$emit("md-click", t, i);
            }
          }
        }, [e.$scopedSlots["md-chip"] ? e._t("md-chip", [e._v(e._s(t))], {
          chip: t
        }) : [e._v(e._s(t))]], 2);
      }), e._v(" "), !e.mdStatic && e.modelRespectLimit ? n("md-input", {
        ref: "input",
        attrs: {
          type: e.mdInputType,
          id: e.id,
          placeholder: e.mdPlaceholder
        },
        on: {
          input: e.handleInput,
          keydown: [function (t) {
            return !t.type.indexOf("key") && e._k(t.keyCode, "enter", 13, t.key, "Enter") ? null : e.insertChip(t);
          }, function (t) {
            return t.type.indexOf("key") || 8 === t.keyCode ? e.handleBackRemove(t) : null;
          }]
        },
        model: {
          value: e.inputValue,
          callback: function (t) {
            e.inputValue = "string" == typeof t ? t.trim() : t;
          },
          expression: "inputValue"
        }
      }) : e._e()], 2);
    },
        r = [],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      n(321);
    }

    var r, a, o, s, u, l, d, c, f, h;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(140), a = n.n(r);

    for (o in r) "default" !== o && function (e) {
      n.d(t, e, function () {
        return r[e];
      });
    }(o);

    s = n(322), u = n(0), l = !1, d = i, c = null, f = null, h = u(a.a, s.a, l, d, c, f), t.default = h.exports;
  }, function (e, t) {}, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement,
          n = e._self._c || t;
      return n("transition", {
        attrs: {
          name: "md-chip",
          appear: ""
        }
      }, [n("div", e._g({
        staticClass: "md-chip",
        class: [e.$mdActiveTheme, e.chipClasses],
        attrs: {
          tabindex: "0"
        }
      }, e.$listeners), [e.mdClickable || !e.mdRipple ? n("md-ripple", {
        attrs: {
          "md-disabled": e.mdDisabled
        }
      }, [e._t("default")], 2) : e._t("default"), e._v(" "), n("transition", {
        attrs: {
          name: "md-input-action",
          appear: ""
        }
      }, [e.mdDeletable ? n("md-button", {
        staticClass: "md-icon-button md-dense md-input-action md-clear",
        attrs: {
          tabindex: "-1"
        },
        on: {
          click: function (t) {
            return e.$emit("md-delete", t);
          }
        }
      }, [n("md-clear-icon")], 1) : e._e()], 1)], 2)]);
    },
        r = [],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    var r, a, o, s;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(3), a = i(r), o = n(103), s = i(o), t.default = function (e) {
      (0, a.default)(e), e.component(s.default.name, s.default);
    };
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    var r, a, o, s;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(3), a = i(r), o = n(325), s = i(o), t.default = function (e) {
      (0, a.default)(e), e.component(s.default.name, s.default);
    };
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      n(326);
    }

    var r, a, o, s, u, l, d, c, f, h;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(141), a = n.n(r);

    for (o in r) "default" !== o && function (e) {
      n.d(t, e, function () {
        return r[e];
      });
    }(o);

    s = n(351), u = n(0), l = !1, d = i, c = null, f = null, h = u(a.a, s.a, l, d, c, f), t.default = h.exports;
  }, function (e, t) {}, function (e, t, n) {
    "use strict";

    e.exports = "undefined" != typeof navigator && /^(?!.*Seamonkey)(?=.*Firefox).*/i.test(navigator.userAgent);
  }, function (e, t, n) {
    "use strict";

    function i(e, t) {
      for (var n = e < 0 ? "-" : "", i = "" + Math.abs(e); i.length < t;) i = "0" + i;

      return n + i;
    }

    function r(e) {
      var t, n, i, r;
      if (arguments.length < 1) throw new TypeError("1 argument required, but only " + arguments.length + " present");
      return t = Object(p.a)(e), n = t.getTime(), t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0), i = t.getTime(), r = n - i, Math.floor(r / M) + 1;
    }

    function a(e, t) {
      var n,
          r = e > 0 ? "-" : "+",
          a = Math.abs(e),
          o = Math.floor(a / 60),
          s = a % 60;
      return 0 === s ? r + (o + "") : (n = t || "", r + (o + "") + n + i(s, 2));
    }

    function o(e, t) {
      if (e % 60 == 0) {
        return (e > 0 ? "-" : "+") + i(Math.abs(e) / 60, 2);
      }

      return s(e, t);
    }

    function s(e, t) {
      var n = t || "",
          r = e > 0 ? "-" : "+",
          a = Math.abs(e);
      return r + i(Math.floor(a / 60), 2) + n + i(a % 60, 2);
    }

    function u(e, t) {
      switch (e) {
        case "P":
          return t.date({
            width: "short"
          });

        case "PP":
          return t.date({
            width: "medium"
          });

        case "PPP":
          return t.date({
            width: "long"
          });

        case "PPPP":
        default:
          return t.date({
            width: "full"
          });
      }
    }

    function l(e, t) {
      switch (e) {
        case "p":
          return t.time({
            width: "short"
          });

        case "pp":
          return t.time({
            width: "medium"
          });

        case "ppp":
          return t.time({
            width: "long"
          });

        case "pppp":
        default:
          return t.time({
            width: "full"
          });
      }
    }

    function d(e, t) {
      var n,
          i = e.match(/(P+)(p+)?/),
          r = i[1],
          a = i[2];
      if (!a) return u(e, t);

      switch (r) {
        case "P":
          n = t.dateTime({
            width: "short"
          });
          break;

        case "PP":
          n = t.dateTime({
            width: "medium"
          });
          break;

        case "PPP":
          n = t.dateTime({
            width: "long"
          });
          break;

        case "PPPP":
        default:
          n = t.dateTime({
            width: "full"
          });
      }

      return n.replace("{{date}}", u(r, t)).replace("{{time}}", l(a, t));
    }

    function c(e, t, n) {
      var i, r, a, o, s, u, l, d, c, g, y, M, _;

      if (arguments.length < 2) throw new TypeError("2 arguments required, but only " + arguments.length + " present");
      if (i = t + "", r = n || {}, a = r.locale || b.a, o = a.options && a.options.firstWeekContainsDate, s = null == o ? 1 : Object(h.a)(o), !((u = null == r.firstWeekContainsDate ? s : Object(h.a)(r.firstWeekContainsDate)) >= 1 && u <= 7)) throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");
      if (l = a.options && a.options.weekStartsOn, d = null == l ? 0 : Object(h.a)(l), !((c = null == r.weekStartsOn ? d : Object(h.a)(r.weekStartsOn)) >= 0 && c <= 6)) throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
      if (!a.localize) throw new RangeError("locale must contain localize property");
      if (!a.formatLong) throw new RangeError("locale must contain formatLong property");
      if (g = Object(p.a)(e), !Object(v.default)(g)) throw new RangeError("Invalid time value");
      return y = Object(m.a)(g), M = Object(j.a)(g, y), _ = {
        firstWeekContainsDate: u,
        weekStartsOn: c,
        locale: a,
        _originalDate: g
      }, i.match(E).map(function (e) {
        var t = e[0];
        return "p" === t || "P" === t ? (0, D[t])(e, a.formatLong, _) : e;
      }).join("").match($).map(function (e) {
        var t, n;
        return "''" === e ? "'" : "'" === (t = e[0]) ? f(e) : (n = T[t], n ? (!r.awareOfUnicodeTokens && Object(k.a)(e) && Object(k.b)(e), n(M, e, a.localize, _)) : e);
      }).join("");
    }

    function f(e) {
      return e.match(A)[1].replace(I, "'");
    }

    var h, m, p, v, b, g, y, M, _, w, S, C, x, O, T, P, D, j, k, $, E, A, I;

    Object.defineProperty(t, "__esModule", {
      value: !0
    }), h = n(17), m = n(142), p = n(9), v = n(143), b = n(144), g = {
      y: function (e, t) {
        var n = e.getUTCFullYear(),
            r = n > 0 ? n : 1 - n;
        return i("yy" === t ? r % 100 : r, t.length);
      },
      M: function (e, t) {
        var n = e.getUTCMonth();
        return "M" === t ? n + 1 + "" : i(n + 1, 2);
      },
      d: function (e, t) {
        return i(e.getUTCDate(), t.length);
      },
      a: function (e, t) {
        var n = e.getUTCHours() / 12 >= 1 ? "pm" : "am";

        switch (t) {
          case "a":
          case "aa":
          case "aaa":
            return n.toUpperCase();

          case "aaaaa":
            return n[0];

          case "aaaa":
          default:
            return "am" === n ? "a.m." : "p.m.";
        }
      },
      h: function (e, t) {
        return i(e.getUTCHours() % 12 || 12, t.length);
      },
      H: function (e, t) {
        return i(e.getUTCHours(), t.length);
      },
      m: function (e, t) {
        return i(e.getUTCMinutes(), t.length);
      },
      s: function (e, t) {
        return i(e.getUTCSeconds(), t.length);
      }
    }, y = g, M = 864e5, _ = n(145), w = n(146), S = n(147), C = n(93), x = {
      am: "am",
      pm: "pm",
      midnight: "midnight",
      noon: "noon",
      morning: "morning",
      afternoon: "afternoon",
      evening: "evening",
      night: "night"
    }, O = {
      G: function (e, t, n) {
        var i = e.getUTCFullYear() > 0 ? 1 : 0;

        switch (t) {
          case "G":
          case "GG":
          case "GGG":
            return n.era(i, {
              width: "abbreviated"
            });

          case "GGGGG":
            return n.era(i, {
              width: "narrow"
            });

          case "GGGG":
          default:
            return n.era(i, {
              width: "wide"
            });
        }
      },
      y: function (e, t, n) {
        var i, r;
        return "yo" === t ? (i = e.getUTCFullYear(), r = i > 0 ? i : 1 - i, n.ordinalNumber(r, {
          unit: "year"
        })) : y.y(e, t);
      },
      Y: function (e, t, n, r) {
        var a,
            o = Object(C.a)(e, r),
            s = o > 0 ? o : 1 - o;
        return "YY" === t ? (a = s % 100, i(a, 2)) : "Yo" === t ? n.ordinalNumber(s, {
          unit: "year"
        }) : i(s, t.length);
      },
      R: function (e, t) {
        return i(Object(w.a)(e), t.length);
      },
      u: function (e, t) {
        return i(e.getUTCFullYear(), t.length);
      },
      Q: function (e, t, n) {
        var r = Math.ceil((e.getUTCMonth() + 1) / 3);

        switch (t) {
          case "Q":
            return r + "";

          case "QQ":
            return i(r, 2);

          case "Qo":
            return n.ordinalNumber(r, {
              unit: "quarter"
            });

          case "QQQ":
            return n.quarter(r, {
              width: "abbreviated",
              context: "formatting"
            });

          case "QQQQQ":
            return n.quarter(r, {
              width: "narrow",
              context: "formatting"
            });

          case "QQQQ":
          default:
            return n.quarter(r, {
              width: "wide",
              context: "formatting"
            });
        }
      },
      q: function (e, t, n) {
        var r = Math.ceil((e.getUTCMonth() + 1) / 3);

        switch (t) {
          case "q":
            return r + "";

          case "qq":
            return i(r, 2);

          case "qo":
            return n.ordinalNumber(r, {
              unit: "quarter"
            });

          case "qqq":
            return n.quarter(r, {
              width: "abbreviated",
              context: "standalone"
            });

          case "qqqqq":
            return n.quarter(r, {
              width: "narrow",
              context: "standalone"
            });

          case "qqqq":
          default:
            return n.quarter(r, {
              width: "wide",
              context: "standalone"
            });
        }
      },
      M: function (e, t, n) {
        var i = e.getUTCMonth();

        switch (t) {
          case "M":
          case "MM":
            return y.M(e, t);

          case "Mo":
            return n.ordinalNumber(i + 1, {
              unit: "month"
            });

          case "MMM":
            return n.month(i, {
              width: "abbreviated",
              context: "formatting"
            });

          case "MMMMM":
            return n.month(i, {
              width: "narrow",
              context: "formatting"
            });

          case "MMMM":
          default:
            return n.month(i, {
              width: "wide",
              context: "formatting"
            });
        }
      },
      L: function (e, t, n) {
        var r = e.getUTCMonth();

        switch (t) {
          case "L":
            return r + 1 + "";

          case "LL":
            return i(r + 1, 2);

          case "Lo":
            return n.ordinalNumber(r + 1, {
              unit: "month"
            });

          case "LLL":
            return n.month(r, {
              width: "abbreviated",
              context: "standalone"
            });

          case "LLLLL":
            return n.month(r, {
              width: "narrow",
              context: "standalone"
            });

          case "LLLL":
          default:
            return n.month(r, {
              width: "wide",
              context: "standalone"
            });
        }
      },
      w: function (e, t, n, r) {
        var a = Object(S.a)(e, r);
        return "wo" === t ? n.ordinalNumber(a, {
          unit: "week"
        }) : i(a, t.length);
      },
      I: function (e, t, n) {
        var r = Object(_.a)(e);
        return "Io" === t ? n.ordinalNumber(r, {
          unit: "week"
        }) : i(r, t.length);
      },
      d: function (e, t, n) {
        return "do" === t ? n.ordinalNumber(e.getUTCDate(), {
          unit: "date"
        }) : y.d(e, t);
      },
      D: function (e, t, n) {
        var a = r(e);
        return "Do" === t ? n.ordinalNumber(a, {
          unit: "dayOfYear"
        }) : i(a, t.length);
      },
      E: function (e, t, n) {
        var i = e.getUTCDay();

        switch (t) {
          case "E":
          case "EE":
          case "EEE":
            return n.day(i, {
              width: "abbreviated",
              context: "formatting"
            });

          case "EEEEE":
            return n.day(i, {
              width: "narrow",
              context: "formatting"
            });

          case "EEEEEE":
            return n.day(i, {
              width: "short",
              context: "formatting"
            });

          case "EEEE":
          default:
            return n.day(i, {
              width: "wide",
              context: "formatting"
            });
        }
      },
      e: function (e, t, n, r) {
        var a = e.getUTCDay(),
            o = (a - r.weekStartsOn + 8) % 7 || 7;

        switch (t) {
          case "e":
            return o + "";

          case "ee":
            return i(o, 2);

          case "eo":
            return n.ordinalNumber(o, {
              unit: "day"
            });

          case "eee":
            return n.day(a, {
              width: "abbreviated",
              context: "formatting"
            });

          case "eeeee":
            return n.day(a, {
              width: "narrow",
              context: "formatting"
            });

          case "eeeeee":
            return n.day(a, {
              width: "short",
              context: "formatting"
            });

          case "eeee":
          default:
            return n.day(a, {
              width: "wide",
              context: "formatting"
            });
        }
      },
      c: function (e, t, n, r) {
        var a = e.getUTCDay(),
            o = (a - r.weekStartsOn + 8) % 7 || 7;

        switch (t) {
          case "c":
            return o + "";

          case "cc":
            return i(o, t.length);

          case "co":
            return n.ordinalNumber(o, {
              unit: "day"
            });

          case "ccc":
            return n.day(a, {
              width: "abbreviated",
              context: "standalone"
            });

          case "ccccc":
            return n.day(a, {
              width: "narrow",
              context: "standalone"
            });

          case "cccccc":
            return n.day(a, {
              width: "short",
              context: "standalone"
            });

          case "cccc":
          default:
            return n.day(a, {
              width: "wide",
              context: "standalone"
            });
        }
      },
      i: function (e, t, n) {
        var r = e.getUTCDay(),
            a = 0 === r ? 7 : r;

        switch (t) {
          case "i":
            return a + "";

          case "ii":
            return i(a, t.length);

          case "io":
            return n.ordinalNumber(a, {
              unit: "day"
            });

          case "iii":
            return n.day(r, {
              width: "abbreviated",
              context: "formatting"
            });

          case "iiiii":
            return n.day(r, {
              width: "narrow",
              context: "formatting"
            });

          case "iiiiii":
            return n.day(r, {
              width: "short",
              context: "formatting"
            });

          case "iiii":
          default:
            return n.day(r, {
              width: "wide",
              context: "formatting"
            });
        }
      },
      a: function (e, t, n) {
        var i = e.getUTCHours(),
            r = i / 12 >= 1 ? "pm" : "am";

        switch (t) {
          case "a":
          case "aa":
          case "aaa":
            return n.dayPeriod(r, {
              width: "abbreviated",
              context: "formatting"
            });

          case "aaaaa":
            return n.dayPeriod(r, {
              width: "narrow",
              context: "formatting"
            });

          case "aaaa":
          default:
            return n.dayPeriod(r, {
              width: "wide",
              context: "formatting"
            });
        }
      },
      b: function (e, t, n) {
        var i,
            r = e.getUTCHours();

        switch (i = 12 === r ? x.noon : 0 === r ? x.midnight : r / 12 >= 1 ? "pm" : "am", t) {
          case "b":
          case "bb":
          case "bbb":
            return n.dayPeriod(i, {
              width: "abbreviated",
              context: "formatting"
            });

          case "bbbbb":
            return n.dayPeriod(i, {
              width: "narrow",
              context: "formatting"
            });

          case "bbbb":
          default:
            return n.dayPeriod(i, {
              width: "wide",
              context: "formatting"
            });
        }
      },
      B: function (e, t, n) {
        var i,
            r = e.getUTCHours();

        switch (i = r >= 17 ? x.evening : r >= 12 ? x.afternoon : r >= 4 ? x.morning : x.night, t) {
          case "B":
          case "BB":
          case "BBB":
            return n.dayPeriod(i, {
              width: "abbreviated",
              context: "formatting"
            });

          case "BBBBB":
            return n.dayPeriod(i, {
              width: "narrow",
              context: "formatting"
            });

          case "BBBB":
          default:
            return n.dayPeriod(i, {
              width: "wide",
              context: "formatting"
            });
        }
      },
      h: function (e, t, n) {
        if ("ho" === t) {
          var i = e.getUTCHours() % 12;
          return 0 === i && (i = 12), n.ordinalNumber(i, {
            unit: "hour"
          });
        }

        return y.h(e, t);
      },
      H: function (e, t, n) {
        return "Ho" === t ? n.ordinalNumber(e.getUTCHours(), {
          unit: "hour"
        }) : y.H(e, t);
      },
      K: function (e, t, n) {
        var r = e.getUTCHours() % 12;
        return "Ko" === t ? n.ordinalNumber(r, {
          unit: "hour"
        }) : i(r, t.length);
      },
      k: function (e, t, n) {
        var r = e.getUTCHours();
        return 0 === r && (r = 24), "ko" === t ? n.ordinalNumber(r, {
          unit: "hour"
        }) : i(r, t.length);
      },
      m: function (e, t, n) {
        return "mo" === t ? n.ordinalNumber(e.getUTCMinutes(), {
          unit: "minute"
        }) : y.m(e, t);
      },
      s: function (e, t, n) {
        return "so" === t ? n.ordinalNumber(e.getUTCSeconds(), {
          unit: "second"
        }) : y.s(e, t);
      },
      S: function (e, t) {
        var n = t.length,
            r = e.getUTCMilliseconds();
        return i(Math.floor(r * Math.pow(10, n - 3)), n);
      },
      X: function (e, t, n, i) {
        var r = i._originalDate || e,
            a = r.getTimezoneOffset();
        if (0 === a) return "Z";

        switch (t) {
          case "X":
            return o(a);

          case "XXXX":
          case "XX":
            return s(a);

          case "XXXXX":
          case "XXX":
          default:
            return s(a, ":");
        }
      },
      x: function (e, t, n, i) {
        var r = i._originalDate || e,
            a = r.getTimezoneOffset();

        switch (t) {
          case "x":
            return o(a);

          case "xxxx":
          case "xx":
            return s(a);

          case "xxxxx":
          case "xxx":
          default:
            return s(a, ":");
        }
      },
      O: function (e, t, n, i) {
        var r = i._originalDate || e,
            o = r.getTimezoneOffset();

        switch (t) {
          case "O":
          case "OO":
          case "OOO":
            return "GMT" + a(o, ":");

          case "OOOO":
          default:
            return "GMT" + s(o, ":");
        }
      },
      z: function (e, t, n, i) {
        var r = i._originalDate || e,
            o = r.getTimezoneOffset();

        switch (t) {
          case "z":
          case "zz":
          case "zzz":
            return "GMT" + a(o, ":");

          case "zzzz":
          default:
            return "GMT" + s(o, ":");
        }
      },
      t: function (e, t, n, r) {
        var a = r._originalDate || e;
        return i(Math.floor(a.getTime() / 1e3), t.length);
      },
      T: function (e, t, n, r) {
        return i((r._originalDate || e).getTime(), t.length);
      }
    }, T = O, P = {
      p: l,
      P: d
    }, D = P, j = n(148), k = n(149), t.default = c, $ = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, E = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, A = /^'(.*?)'?$/, I = /''/g;
  }, function (e, t, n) {
    "use strict";

    function i(e, t) {
      if (null == e) throw new TypeError("assign requires that input parameter not be null or undefined");
      t = t || {};

      for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);

      return e;
    }

    function r(e, t, n) {
      var i, r, a, o, s, u, l, d, c, f, h;
      if (arguments.length < 2) throw new TypeError("2 arguments required, but only " + arguments.length + " present");
      if (i = n || {}, r = i.locale, a = r && r.options && r.options.weekStartsOn, o = null == a ? 0 : Object(y.a)(a), !((s = null == i.weekStartsOn ? o : Object(y.a)(i.weekStartsOn)) >= 0 && s <= 6)) throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
      return u = Object(_.a)(e), l = Object(y.a)(t), d = u.getUTCDay(), c = l % 7, f = (c + 7) % 7, h = (f < s ? 7 : 0) + l - d, u.setUTCDate(u.getUTCDate() + h), u;
    }

    function a(e, t, n) {
      var i, r, a;
      if (arguments.length < 2) throw new TypeError("2 arguments required, but only " + arguments.length + " present");
      return i = Object(_.a)(e), r = Object(y.a)(t), a = Object(x.a)(i, n) - r, i.setUTCDate(i.getUTCDate() - 7 * a), i;
    }

    function o(e, t) {
      var n, i, r, a, o, s, u;
      if (arguments.length < 2) throw new TypeError("2 arguments required, but only " + arguments.length + " present");
      return n = Object(y.a)(t), n % 7 == 0 && (n -= 7), i = 1, r = Object(_.a)(e), a = r.getUTCDay(), o = n % 7, s = (o + 7) % 7, u = (s < i ? 7 : 0) + n - a, r.setUTCDate(r.getUTCDate() + u), r;
    }

    function s(e, t) {
      var n, i, r;
      if (arguments.length < 2) throw new TypeError("2 arguments required, but only " + arguments.length + " present");
      return n = Object(_.a)(e), i = Object(y.a)(t), r = Object(T.a)(n) - i, n.setUTCDate(n.getUTCDate() - 7 * r), n;
    }

    function u(e, t, n) {
      var i,
          r = t.match(e);
      return r ? (i = parseInt(r[0], 10), {
        value: n ? n(i) : i,
        rest: t.slice(r[0].length)
      }) : null;
    }

    function l(e, t) {
      var n,
          i,
          r,
          a,
          o = t.match(e);
      return o ? "Z" === o[0] ? {
        value: 0,
        rest: t.slice(1)
      } : (n = "+" === o[1] ? 1 : -1, i = o[2] ? parseInt(o[2], 10) : 0, r = o[3] ? parseInt(o[3], 10) : 0, a = o[5] ? parseInt(o[5], 10) : 0, {
        value: n * (i * D + r * j + a * k),
        rest: t.slice(o[0].length)
      }) : null;
    }

    function d(e, t) {
      return u($.anyDigitsSigned, e, t);
    }

    function c(e, t, n) {
      switch (e) {
        case 1:
          return u($.singleDigit, t, n);

        case 2:
          return u($.twoDigits, t, n);

        case 3:
          return u($.threeDigits, t, n);

        case 4:
          return u($.fourDigits, t, n);

        default:
          return u(RegExp("^\\d{1," + e + "}"), t, n);
      }
    }

    function f(e, t, n) {
      switch (e) {
        case 1:
          return u($.singleDigitSigned, t, n);

        case 2:
          return u($.twoDigitsSigned, t, n);

        case 3:
          return u($.threeDigitsSigned, t, n);

        case 4:
          return u($.fourDigitsSigned, t, n);

        default:
          return u(RegExp("^-?\\d{1," + e + "}"), t, n);
      }
    }

    function h(e) {
      switch (e) {
        case "morning":
          return 4;

        case "evening":
          return 17;

        case "pm":
        case "noon":
        case "afternoon":
          return 12;

        case "am":
        case "midnight":
        case "night":
        default:
          return 0;
      }
    }

    function m(e, t) {
      var n,
          i,
          r,
          a,
          o = t > 0,
          s = o ? t : 1 - t;
      return s <= 50 ? n = e || 100 : (i = s + 50, r = 100 * Math.floor(i / 100), a = e >= i % 100, n = e + r - (a ? 100 : 0)), o ? n : 1 - n;
    }

    function p(e) {
      return e % 400 == 0 || e % 4 == 0 && e % 100 != 0;
    }

    function v(e, t, n, r) {
      var a, o, s, u, l, d, c, f, h, m, p, v, C, x, O, T, P, D, j, k, $, E, A, I;
      if (arguments.length < 3) throw new TypeError("3 arguments required, but only " + arguments.length + " present");
      if (a = e + "", o = t + "", s = r || {}, u = s.locale || S.a, !u.match) throw new RangeError("locale must contain match property");
      if (l = u.options && u.options.firstWeekContainsDate, d = null == l ? 1 : Object(y.a)(l), !((c = null == s.firstWeekContainsDate ? d : Object(y.a)(s.firstWeekContainsDate)) >= 1 && c <= 7)) throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");
      if (f = u.options && u.options.weekStartsOn, h = null == f ? 0 : Object(y.a)(f), !((m = null == s.weekStartsOn ? h : Object(y.a)(s.weekStartsOn)) >= 0 && m <= 6)) throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
      if ("" === o) return "" === a ? Object(_.a)(n) : new Date(NaN);

      for (p = {
        firstWeekContainsDate: c,
        weekStartsOn: m,
        locale: u
      }, v = [{
        priority: R,
        set: b,
        index: 0
      }], x = o.match(N), C = 0; C < x.length; C++) if (O = x[C], !s.awareOfUnicodeTokens && Object(L.a)(O) && Object(L.b)(O), T = O[0], P = B[T]) {
        if (!(D = P.parse(a, O, u.match, p))) return new Date(NaN);
        v.push({
          priority: P.priority,
          set: P.set,
          validate: P.validate,
          value: D.value,
          index: v.length
        }), a = D.rest;
      } else {
        if ("''" === O ? O = "'" : "'" === T && (O = g(O)), 0 !== a.indexOf(O)) return new Date(NaN);
        a = a.slice(O.length);
      }

      if (a.length > 0 && q.test(a)) return new Date(NaN);
      if (j = v.map(function (e) {
        return e.priority;
      }).sort(function (e, t) {
        return t - e;
      }).filter(function (e, t, n) {
        return n.indexOf(e) === t;
      }).map(function (e) {
        return v.filter(function (t) {
          return t.priority === e;
        }).reverse();
      }).map(function (e) {
        return e[0];
      }), k = Object(_.a)(n), isNaN(k)) return new Date(NaN);

      for ($ = Object(w.a)(k, Object(M.a)(k)), E = {}, C = 0; C < j.length; C++) {
        if (A = j[C], A.validate && !A.validate($, A.value, p)) return new Date(NaN);
        I = A.set($, E, A.value, p), I[0] ? ($ = I[0], i(E, I[1])) : $ = I;
      }

      return $;
    }

    function b(e, t) {
      if (t.timestampIsSet) return e;
      var n = new Date(0);
      return n.setFullYear(e.getUTCFullYear(), e.getUTCMonth(), e.getUTCDate()), n.setHours(e.getUTCHours(), e.getUTCMinutes(), e.getUTCSeconds(), e.getUTCMilliseconds()), n;
    }

    function g(e) {
      return e.match(H)[1].replace(V, "'");
    }

    var y, M, _, w, S, C, x, O, T, P, D, j, k, $, E, A, I, F, B, L, R, N, H, V, q;

    Object.defineProperty(t, "__esModule", {
      value: !0
    }), y = n(17), M = n(142), _ = n(9), w = n(148), S = n(144), C = n(93), x = n(147), O = n(65), T = n(145), P = n(64), D = 36e5, j = 6e4, k = 1e3, $ = {
      month: /^(1[0-2]|0?\d)/,
      date: /^(3[0-1]|[0-2]?\d)/,
      dayOfYear: /^(36[0-6]|3[0-5]\d|[0-2]?\d?\d)/,
      week: /^(5[0-3]|[0-4]?\d)/,
      hour23h: /^(2[0-3]|[0-1]?\d)/,
      hour24h: /^(2[0-4]|[0-1]?\d)/,
      hour11h: /^(1[0-1]|0?\d)/,
      hour12h: /^(1[0-2]|0?\d)/,
      minute: /^[0-5]?\d/,
      second: /^[0-5]?\d/,
      singleDigit: /^\d/,
      twoDigits: /^\d{1,2}/,
      threeDigits: /^\d{1,3}/,
      fourDigits: /^\d{1,4}/,
      anyDigitsSigned: /^-?\d+/,
      singleDigitSigned: /^-?\d/,
      twoDigitsSigned: /^-?\d{1,2}/,
      threeDigitsSigned: /^-?\d{1,3}/,
      fourDigitsSigned: /^-?\d{1,4}/
    }, E = {
      basicOptionalMinutes: /^([+-])(\d{2})(\d{2})?|Z/,
      basic: /^([+-])(\d{2})(\d{2})|Z/,
      basicOptionalSeconds: /^([+-])(\d{2})(\d{2})((\d{2}))?|Z/,
      extended: /^([+-])(\d{2}):(\d{2})|Z/,
      extendedOptionalSeconds: /^([+-])(\d{2}):(\d{2})(:(\d{2}))?|Z/
    }, A = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], I = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], F = {
      G: {
        priority: 140,
        parse: function (e, t, n, i) {
          switch (t) {
            case "G":
            case "GG":
            case "GGG":
              return n.era(e, {
                width: "abbreviated"
              }) || n.era(e, {
                width: "narrow"
              });

            case "GGGGG":
              return n.era(e, {
                width: "narrow"
              });

            case "GGGG":
            default:
              return n.era(e, {
                width: "wide"
              }) || n.era(e, {
                width: "abbreviated"
              }) || n.era(e, {
                width: "narrow"
              });
          }
        },
        set: function (e, t, n, i) {
          return e.setUTCFullYear(1 === n ? 10 : -9, 0, 1), e.setUTCHours(0, 0, 0, 0), e;
        }
      },
      y: {
        priority: 130,
        parse: function (e, t, n, i) {
          var r = function (e) {
            return {
              year: e,
              isTwoDigitYear: "yy" === t
            };
          };

          switch (t) {
            case "y":
              return c(4, e, r);

            case "yo":
              return n.ordinalNumber(e, {
                unit: "year",
                valueCallback: r
              });

            default:
              return c(t.length, e, r);
          }
        },
        validate: function (e, t, n) {
          return t.isTwoDigitYear || t.year > 0;
        },
        set: function (e, t, n, i) {
          var r,
              a,
              o = Object(C.a)(e, i);
          return n.isTwoDigitYear ? (r = m(n.year, o), e.setUTCFullYear(r, 0, 1), e.setUTCHours(0, 0, 0, 0), e) : (a = o > 0 ? n.year : 1 - n.year, e.setUTCFullYear(a, 0, 1), e.setUTCHours(0, 0, 0, 0), e);
        }
      },
      Y: {
        priority: 130,
        parse: function (e, t, n, i) {
          var r = function (e) {
            return {
              year: e,
              isTwoDigitYear: "YY" === t
            };
          };

          switch (t) {
            case "Y":
              return c(4, e, r);

            case "Yo":
              return n.ordinalNumber(e, {
                unit: "year",
                valueCallback: r
              });

            default:
              return c(t.length, e, r);
          }
        },
        validate: function (e, t, n) {
          return t.isTwoDigitYear || t.year > 0;
        },
        set: function (e, t, n, i) {
          var r,
              a,
              o = e.getUTCFullYear();
          return n.isTwoDigitYear ? (r = m(n.year, o), e.setUTCFullYear(r, 0, i.firstWeekContainsDate), e.setUTCHours(0, 0, 0, 0), Object(O.a)(e, i)) : (a = o > 0 ? n.year : 1 - n.year, e.setUTCFullYear(a, 0, i.firstWeekContainsDate), e.setUTCHours(0, 0, 0, 0), Object(O.a)(e, i));
        }
      },
      R: {
        priority: 130,
        parse: function (e, t, n, i) {
          return "R" === t ? f(4, e) : f(t.length, e);
        },
        set: function (e, t, n, i) {
          var r = new Date(0);
          return r.setUTCFullYear(n, 0, 4), r.setUTCHours(0, 0, 0, 0), Object(P.a)(r);
        }
      },
      u: {
        priority: 130,
        parse: function (e, t, n, i) {
          return "u" === t ? f(4, e) : f(t.length, e);
        },
        set: function (e, t, n, i) {
          return e.setUTCFullYear(n, 0, 1), e.setUTCHours(0, 0, 0, 0), e;
        }
      },
      Q: {
        priority: 120,
        parse: function (e, t, n, i) {
          switch (t) {
            case "Q":
            case "QQ":
              return c(t.length, e);

            case "Qo":
              return n.ordinalNumber(e, {
                unit: "quarter"
              });

            case "QQQ":
              return n.quarter(e, {
                width: "abbreviated",
                context: "formatting"
              }) || n.quarter(e, {
                width: "narrow",
                context: "formatting"
              });

            case "QQQQQ":
              return n.quarter(e, {
                width: "narrow",
                context: "formatting"
              });

            case "QQQQ":
            default:
              return n.quarter(e, {
                width: "wide",
                context: "formatting"
              }) || n.quarter(e, {
                width: "abbreviated",
                context: "formatting"
              }) || n.quarter(e, {
                width: "narrow",
                context: "formatting"
              });
          }
        },
        validate: function (e, t, n) {
          return t >= 1 && t <= 4;
        },
        set: function (e, t, n, i) {
          return e.setUTCMonth(3 * (n - 1), 1), e.setUTCHours(0, 0, 0, 0), e;
        }
      },
      q: {
        priority: 120,
        parse: function (e, t, n, i) {
          switch (t) {
            case "q":
            case "qq":
              return c(t.length, e);

            case "qo":
              return n.ordinalNumber(e, {
                unit: "quarter"
              });

            case "qqq":
              return n.quarter(e, {
                width: "abbreviated",
                context: "standalone"
              }) || n.quarter(e, {
                width: "narrow",
                context: "standalone"
              });

            case "qqqqq":
              return n.quarter(e, {
                width: "narrow",
                context: "standalone"
              });

            case "qqqq":
            default:
              return n.quarter(e, {
                width: "wide",
                context: "standalone"
              }) || n.quarter(e, {
                width: "abbreviated",
                context: "standalone"
              }) || n.quarter(e, {
                width: "narrow",
                context: "standalone"
              });
          }
        },
        validate: function (e, t, n) {
          return t >= 1 && t <= 4;
        },
        set: function (e, t, n, i) {
          return e.setUTCMonth(3 * (n - 1), 1), e.setUTCHours(0, 0, 0, 0), e;
        }
      },
      M: {
        priority: 110,
        parse: function (e, t, n, i) {
          var r = function (e) {
            return e - 1;
          };

          switch (t) {
            case "M":
              return u($.month, e, r);

            case "MM":
              return c(2, e, r);

            case "Mo":
              return n.ordinalNumber(e, {
                unit: "month",
                valueCallback: r
              });

            case "MMM":
              return n.month(e, {
                width: "abbreviated",
                context: "formatting"
              }) || n.month(e, {
                width: "narrow",
                context: "formatting"
              });

            case "MMMMM":
              return n.month(e, {
                width: "narrow",
                context: "formatting"
              });

            case "MMMM":
            default:
              return n.month(e, {
                width: "wide",
                context: "formatting"
              }) || n.month(e, {
                width: "abbreviated",
                context: "formatting"
              }) || n.month(e, {
                width: "narrow",
                context: "formatting"
              });
          }
        },
        validate: function (e, t, n) {
          return t >= 0 && t <= 11;
        },
        set: function (e, t, n, i) {
          return e.setUTCMonth(n, 1), e.setUTCHours(0, 0, 0, 0), e;
        }
      },
      L: {
        priority: 110,
        parse: function (e, t, n, i) {
          var r = function (e) {
            return e - 1;
          };

          switch (t) {
            case "L":
              return u($.month, e, r);

            case "LL":
              return c(2, e, r);

            case "Lo":
              return n.ordinalNumber(e, {
                unit: "month",
                valueCallback: r
              });

            case "LLL":
              return n.month(e, {
                width: "abbreviated",
                context: "standalone"
              }) || n.month(e, {
                width: "narrow",
                context: "standalone"
              });

            case "LLLLL":
              return n.month(e, {
                width: "narrow",
                context: "standalone"
              });

            case "LLLL":
            default:
              return n.month(e, {
                width: "wide",
                context: "standalone"
              }) || n.month(e, {
                width: "abbreviated",
                context: "standalone"
              }) || n.month(e, {
                width: "narrow",
                context: "standalone"
              });
          }
        },
        validate: function (e, t, n) {
          return t >= 0 && t <= 11;
        },
        set: function (e, t, n, i) {
          return e.setUTCMonth(n, 1), e.setUTCHours(0, 0, 0, 0), e;
        }
      },
      w: {
        priority: 100,
        parse: function (e, t, n, i) {
          switch (t) {
            case "w":
              return u($.week, e);

            case "wo":
              return n.ordinalNumber(e, {
                unit: "week"
              });

            default:
              return c(t.length, e);
          }
        },
        validate: function (e, t, n) {
          return t >= 1 && t <= 53;
        },
        set: function (e, t, n, i) {
          return Object(O.a)(a(e, n, i), i);
        }
      },
      I: {
        priority: 100,
        parse: function (e, t, n, i) {
          switch (t) {
            case "I":
              return u($.week, e);

            case "Io":
              return n.ordinalNumber(e, {
                unit: "week"
              });

            default:
              return c(t.length, e);
          }
        },
        validate: function (e, t, n) {
          return t >= 1 && t <= 53;
        },
        set: function (e, t, n, i) {
          return Object(P.a)(s(e, n, i), i);
        }
      },
      d: {
        priority: 90,
        parse: function (e, t, n, i) {
          switch (t) {
            case "d":
              return u($.date, e);

            case "do":
              return n.ordinalNumber(e, {
                unit: "date"
              });

            default:
              return c(t.length, e);
          }
        },
        validate: function (e, t, n) {
          var i = e.getUTCFullYear(),
              r = p(i),
              a = e.getUTCMonth();
          return r ? t >= 1 && t <= I[a] : t >= 1 && t <= A[a];
        },
        set: function (e, t, n, i) {
          return e.setUTCDate(n), e.setUTCHours(0, 0, 0, 0), e;
        }
      },
      D: {
        priority: 90,
        parse: function (e, t, n, i) {
          switch (t) {
            case "D":
            case "DD":
              return u($.dayOfYear, e);

            case "Do":
              return n.ordinalNumber(e, {
                unit: "date"
              });

            default:
              return c(t.length, e);
          }
        },
        validate: function (e, t, n) {
          return p(e.getUTCFullYear()) ? t >= 1 && t <= 366 : t >= 1 && t <= 365;
        },
        set: function (e, t, n, i) {
          return e.setUTCMonth(0, n), e.setUTCHours(0, 0, 0, 0), e;
        }
      },
      E: {
        priority: 90,
        parse: function (e, t, n, i) {
          switch (t) {
            case "E":
            case "EE":
            case "EEE":
              return n.day(e, {
                width: "abbreviated",
                context: "formatting"
              }) || n.day(e, {
                width: "short",
                context: "formatting"
              }) || n.day(e, {
                width: "narrow",
                context: "formatting"
              });

            case "EEEEE":
              return n.day(e, {
                width: "narrow",
                context: "formatting"
              });

            case "EEEEEE":
              return n.day(e, {
                width: "short",
                context: "formatting"
              }) || n.day(e, {
                width: "narrow",
                context: "formatting"
              });

            case "EEEE":
            default:
              return n.day(e, {
                width: "wide",
                context: "formatting"
              }) || n.day(e, {
                width: "abbreviated",
                context: "formatting"
              }) || n.day(e, {
                width: "short",
                context: "formatting"
              }) || n.day(e, {
                width: "narrow",
                context: "formatting"
              });
          }
        },
        validate: function (e, t, n) {
          return t >= 0 && t <= 6;
        },
        set: function (e, t, n, i) {
          return e = r(e, n, i), e.setUTCHours(0, 0, 0, 0), e;
        }
      },
      e: {
        priority: 90,
        parse: function (e, t, n, i) {
          var r = function (e) {
            var t = 7 * Math.floor((e - 1) / 7);
            return (e + i.weekStartsOn + 6) % 7 + t;
          };

          switch (t) {
            case "e":
            case "ee":
              return c(t.length, e, r);

            case "eo":
              return n.ordinalNumber(e, {
                unit: "day",
                valueCallback: r
              });

            case "eee":
              return n.day(e, {
                width: "abbreviated",
                context: "formatting"
              }) || n.day(e, {
                width: "short",
                context: "formatting"
              }) || n.day(e, {
                width: "narrow",
                context: "formatting"
              });

            case "eeeee":
              return n.day(e, {
                width: "narrow",
                context: "formatting"
              });

            case "eeeeee":
              return n.day(e, {
                width: "short",
                context: "formatting"
              }) || n.day(e, {
                width: "narrow",
                context: "formatting"
              });

            case "eeee":
            default:
              return n.day(e, {
                width: "wide",
                context: "formatting"
              }) || n.day(e, {
                width: "abbreviated",
                context: "formatting"
              }) || n.day(e, {
                width: "short",
                context: "formatting"
              }) || n.day(e, {
                width: "narrow",
                context: "formatting"
              });
          }
        },
        validate: function (e, t, n) {
          return t >= 0 && t <= 6;
        },
        set: function (e, t, n, i) {
          return e = r(e, n, i), e.setUTCHours(0, 0, 0, 0), e;
        }
      },
      c: {
        priority: 90,
        parse: function (e, t, n, i) {
          var r = function (e) {
            var t = 7 * Math.floor((e - 1) / 7);
            return (e + i.weekStartsOn + 6) % 7 + t;
          };

          switch (t) {
            case "c":
            case "cc":
              return c(t.length, e, r);

            case "co":
              return n.ordinalNumber(e, {
                unit: "day",
                valueCallback: r
              });

            case "ccc":
              return n.day(e, {
                width: "abbreviated",
                context: "standalone"
              }) || n.day(e, {
                width: "short",
                context: "standalone"
              }) || n.day(e, {
                width: "narrow",
                context: "standalone"
              });

            case "ccccc":
              return n.day(e, {
                width: "narrow",
                context: "standalone"
              });

            case "cccccc":
              return n.day(e, {
                width: "short",
                context: "standalone"
              }) || n.day(e, {
                width: "narrow",
                context: "standalone"
              });

            case "cccc":
            default:
              return n.day(e, {
                width: "wide",
                context: "standalone"
              }) || n.day(e, {
                width: "abbreviated",
                context: "standalone"
              }) || n.day(e, {
                width: "short",
                context: "standalone"
              }) || n.day(e, {
                width: "narrow",
                context: "standalone"
              });
          }
        },
        validate: function (e, t, n) {
          return t >= 0 && t <= 6;
        },
        set: function (e, t, n, i) {
          return e = r(e, n, i), e.setUTCHours(0, 0, 0, 0), e;
        }
      },
      i: {
        priority: 90,
        parse: function (e, t, n, i) {
          var r = function (e) {
            return 0 === e ? 7 : e;
          };

          switch (t) {
            case "i":
            case "ii":
              return c(t.length, e);

            case "io":
              return n.ordinalNumber(e, {
                unit: "day"
              });

            case "iii":
              return n.day(e, {
                width: "abbreviated",
                context: "formatting",
                valueCallback: r
              }) || n.day(e, {
                width: "short",
                context: "formatting",
                valueCallback: r
              }) || n.day(e, {
                width: "narrow",
                context: "formatting",
                valueCallback: r
              });

            case "iiiii":
              return n.day(e, {
                width: "narrow",
                context: "formatting",
                valueCallback: r
              });

            case "iiiiii":
              return n.day(e, {
                width: "short",
                context: "formatting",
                valueCallback: r
              }) || n.day(e, {
                width: "narrow",
                context: "formatting",
                valueCallback: r
              });

            case "iiii":
            default:
              return n.day(e, {
                width: "wide",
                context: "formatting",
                valueCallback: r
              }) || n.day(e, {
                width: "abbreviated",
                context: "formatting",
                valueCallback: r
              }) || n.day(e, {
                width: "short",
                context: "formatting",
                valueCallback: r
              }) || n.day(e, {
                width: "narrow",
                context: "formatting",
                valueCallback: r
              });
          }
        },
        validate: function (e, t, n) {
          return t >= 1 && t <= 7;
        },
        set: function (e, t, n, i) {
          return e = o(e, n, i), e.setUTCHours(0, 0, 0, 0), e;
        }
      },
      a: {
        priority: 80,
        parse: function (e, t, n, i) {
          switch (t) {
            case "a":
            case "aa":
            case "aaa":
              return n.dayPeriod(e, {
                width: "abbreviated",
                context: "formatting"
              }) || n.dayPeriod(e, {
                width: "narrow",
                context: "formatting"
              });

            case "aaaaa":
              return n.dayPeriod(e, {
                width: "narrow",
                context: "formatting"
              });

            case "aaaa":
            default:
              return n.dayPeriod(e, {
                width: "wide",
                context: "formatting"
              }) || n.dayPeriod(e, {
                width: "abbreviated",
                context: "formatting"
              }) || n.dayPeriod(e, {
                width: "narrow",
                context: "formatting"
              });
          }
        },
        set: function (e, t, n, i) {
          return e.setUTCHours(h(n), 0, 0, 0), e;
        }
      },
      b: {
        priority: 80,
        parse: function (e, t, n, i) {
          switch (t) {
            case "b":
            case "bb":
            case "bbb":
              return n.dayPeriod(e, {
                width: "abbreviated",
                context: "formatting"
              }) || n.dayPeriod(e, {
                width: "narrow",
                context: "formatting"
              });

            case "bbbbb":
              return n.dayPeriod(e, {
                width: "narrow",
                context: "formatting"
              });

            case "bbbb":
            default:
              return n.dayPeriod(e, {
                width: "wide",
                context: "formatting"
              }) || n.dayPeriod(e, {
                width: "abbreviated",
                context: "formatting"
              }) || n.dayPeriod(e, {
                width: "narrow",
                context: "formatting"
              });
          }
        },
        set: function (e, t, n, i) {
          return e.setUTCHours(h(n), 0, 0, 0), e;
        }
      },
      B: {
        priority: 80,
        parse: function (e, t, n, i) {
          switch (t) {
            case "B":
            case "BB":
            case "BBB":
              return n.dayPeriod(e, {
                width: "abbreviated",
                context: "formatting"
              }) || n.dayPeriod(e, {
                width: "narrow",
                context: "formatting"
              });

            case "BBBBB":
              return n.dayPeriod(e, {
                width: "narrow",
                context: "formatting"
              });

            case "BBBB":
            default:
              return n.dayPeriod(e, {
                width: "wide",
                context: "formatting"
              }) || n.dayPeriod(e, {
                width: "abbreviated",
                context: "formatting"
              }) || n.dayPeriod(e, {
                width: "narrow",
                context: "formatting"
              });
          }
        },
        set: function (e, t, n, i) {
          return e.setUTCHours(h(n), 0, 0, 0), e;
        }
      },
      h: {
        priority: 70,
        parse: function (e, t, n, i) {
          switch (t) {
            case "h":
              return u($.hour12h, e);

            case "ho":
              return n.ordinalNumber(e, {
                unit: "hour"
              });

            default:
              return c(t.length, e);
          }
        },
        validate: function (e, t, n) {
          return t >= 1 && t <= 12;
        },
        set: function (e, t, n, i) {
          var r = e.getUTCHours() >= 12;
          return r && n < 12 ? e.setUTCHours(n + 12, 0, 0, 0) : r || 12 !== n ? e.setUTCHours(n, 0, 0, 0) : e.setUTCHours(0, 0, 0, 0), e;
        }
      },
      H: {
        priority: 70,
        parse: function (e, t, n, i) {
          switch (t) {
            case "H":
              return u($.hour23h, e);

            case "Ho":
              return n.ordinalNumber(e, {
                unit: "hour"
              });

            default:
              return c(t.length, e);
          }
        },
        validate: function (e, t, n) {
          return t >= 0 && t <= 23;
        },
        set: function (e, t, n, i) {
          return e.setUTCHours(n, 0, 0, 0), e;
        }
      },
      K: {
        priority: 70,
        parse: function (e, t, n, i) {
          switch (t) {
            case "K":
              return u($.hour11h, e);

            case "Ko":
              return n.ordinalNumber(e, {
                unit: "hour"
              });

            default:
              return c(t.length, e);
          }
        },
        validate: function (e, t, n) {
          return t >= 0 && t <= 11;
        },
        set: function (e, t, n, i) {
          return e.getUTCHours() >= 12 && n < 12 ? e.setUTCHours(n + 12, 0, 0, 0) : e.setUTCHours(n, 0, 0, 0), e;
        }
      },
      k: {
        priority: 70,
        parse: function (e, t, n, i) {
          switch (t) {
            case "k":
              return u($.hour24h, e);

            case "ko":
              return n.ordinalNumber(e, {
                unit: "hour"
              });

            default:
              return c(t.length, e);
          }
        },
        validate: function (e, t, n) {
          return t >= 1 && t <= 24;
        },
        set: function (e, t, n, i) {
          var r = n <= 24 ? n % 24 : n;
          return e.setUTCHours(r, 0, 0, 0), e;
        }
      },
      m: {
        priority: 60,
        parse: function (e, t, n, i) {
          switch (t) {
            case "m":
              return u($.minute, e);

            case "mo":
              return n.ordinalNumber(e, {
                unit: "minute"
              });

            default:
              return c(t.length, e);
          }
        },
        validate: function (e, t, n) {
          return t >= 0 && t <= 59;
        },
        set: function (e, t, n, i) {
          return e.setUTCMinutes(n, 0, 0), e;
        }
      },
      s: {
        priority: 50,
        parse: function (e, t, n, i) {
          switch (t) {
            case "s":
              return u($.second, e);

            case "so":
              return n.ordinalNumber(e, {
                unit: "second"
              });

            default:
              return c(t.length, e);
          }
        },
        validate: function (e, t, n) {
          return t >= 0 && t <= 59;
        },
        set: function (e, t, n, i) {
          return e.setUTCSeconds(n, 0), e;
        }
      },
      S: {
        priority: 30,
        parse: function (e, t, n, i) {
          var r = function (e) {
            return Math.floor(e * Math.pow(10, 3 - t.length));
          };

          return c(t.length, e, r);
        },
        set: function (e, t, n, i) {
          return e.setUTCMilliseconds(n), e;
        }
      },
      X: {
        priority: 10,
        parse: function (e, t, n, i) {
          switch (t) {
            case "X":
              return l(E.basicOptionalMinutes, e);

            case "XX":
              return l(E.basic, e);

            case "XXXX":
              return l(E.basicOptionalSeconds, e);

            case "XXXXX":
              return l(E.extendedOptionalSeconds, e);

            case "XXX":
            default:
              return l(E.extended, e);
          }
        },
        set: function (e, t, n, i) {
          return t.timestampIsSet ? e : new Date(e.getTime() - n);
        }
      },
      x: {
        priority: 10,
        parse: function (e, t, n, i) {
          switch (t) {
            case "x":
              return l(E.basicOptionalMinutes, e);

            case "xx":
              return l(E.basic, e);

            case "xxxx":
              return l(E.basicOptionalSeconds, e);

            case "xxxxx":
              return l(E.extendedOptionalSeconds, e);

            case "xxx":
            default:
              return l(E.extended, e);
          }
        },
        set: function (e, t, n, i) {
          return t.timestampIsSet ? e : new Date(e.getTime() - n);
        }
      },
      t: {
        priority: 40,
        parse: function (e, t, n, i) {
          return d(e);
        },
        set: function (e, t, n, i) {
          return [new Date(1e3 * n), {
            timestampIsSet: !0
          }];
        }
      },
      T: {
        priority: 20,
        parse: function (e, t, n, i) {
          return d(e);
        },
        set: function (e, t, n, i) {
          return [new Date(n), {
            timestampIsSet: !0
          }];
        }
      }
    }, B = F, L = n(149), t.default = v, R = 10, N = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, H = /^'(.*?)'?$/, V = /''/g, q = /\S/;
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      n(331);
    }

    var r, a, o, s, u, l, d, c, f, h;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(150), a = n.n(r);

    for (o in r) "default" !== o && function (e) {
      n.d(t, e, function () {
        return r[e];
      });
    }(o);

    s = n(347), u = n(0), l = !1, d = i, c = null, f = null, h = u(a.a, s.a, l, d, c, f), t.default = h.exports;
  }, function (e, t) {}, function (e, t, n) {
    "use strict";

    function i(e) {
      if (arguments.length < 1) throw new TypeError("1 argument required, but only " + arguments.length + " present");
      var t = Object(r.a)(e);
      return t.setDate(1), t.setHours(0, 0, 0, 0), t;
    }

    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = i;
    var r = n(9);
  }, function (e, t, n) {
    "use strict";

    function i(e, t) {
      if (arguments.length < 2) throw new TypeError("2 arguments required, but only " + arguments.length + " present");
      var n = Object(r.a)(t);
      return Object(a.default)(e, -n);
    }

    var r, a;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = i, r = n(17), a = n(151);
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      var t;
      if (arguments.length < 1) throw new TypeError("1 argument required, but only " + arguments.length + " present");
      return t = Object(r.a)(e), t.getDate();
    }

    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = i;
    var r = n(9);
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      var t;
      if (arguments.length < 1) throw new TypeError("1 argument required, but only " + arguments.length + " present");
      return t = Object(r.a)(e), t.getDay();
    }

    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = i;
    var r = n(9);
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      var t;
      if (arguments.length < 1) throw new TypeError("1 argument required, but only " + arguments.length + " present");
      return t = Object(r.a)(e), t.getMonth();
    }

    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = i;
    var r = n(9);
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      var t;
      if (arguments.length < 1) throw new TypeError("1 argument required, but only " + arguments.length + " present");
      return t = Object(r.a)(e), t.getFullYear();
    }

    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = i;
    var r = n(9);
  }, function (e, t, n) {
    "use strict";

    function i(e, t) {
      var n, i;
      if (arguments.length < 2) throw new TypeError("2 arguments required, but only " + arguments.length + " present");
      return n = Object(r.a)(e), i = Object(r.a)(t), n.getTime() === i.getTime();
    }

    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = i;
    var r = n(9);
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      if (arguments.length < 1) throw new TypeError("1 argument required, but only " + arguments.length + " present");
      var t = Object(a.a)(e);
      return t.setHours(0, 0, 0, 0), t;
    }

    function r(e, t) {
      var n, r;
      if (arguments.length < 2) throw new TypeError("2 arguments required, but only " + arguments.length + " present");
      return n = i(e), r = i(t), n.getTime() === r.getTime();
    }

    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var a = n(9);
    t.default = r;
  }, function (e, t, n) {
    "use strict";

    function i(e, t) {
      var n, i;
      if (arguments.length < 2) throw new TypeError("2 arguments required, but only " + arguments.length + " present");
      return n = Object(a.a)(e), i = Object(r.a)(t), n.setDate(i), n;
    }

    var r, a;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = i, r = n(17), a = n(9);
  }, function (e, t, n) {
    "use strict";

    function i(e, t) {
      var n, i, s, u, l, d;
      if (arguments.length < 2) throw new TypeError("2 arguments required, but only " + arguments.length + " present");
      return n = Object(a.a)(e), i = Object(r.a)(t), s = n.getFullYear(), u = n.getDate(), l = new Date(0), l.setFullYear(s, i, 15), l.setHours(0, 0, 0, 0), d = Object(o.default)(l), n.setMonth(i, Math.min(u, d)), n;
    }

    var r, a, o;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = i, r = n(17), a = n(9), o = n(96);
  }, function (e, t, n) {
    "use strict";

    function i(e, t) {
      var n, i;
      if (arguments.length < 2) throw new TypeError("2 arguments required, but only " + arguments.length + " present");
      return n = Object(a.a)(e), i = Object(r.a)(t), isNaN(n) ? new Date(NaN) : (n.setFullYear(i), n);
    }

    var r, a;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = i, r = n(17), a = n(9);
  }, function (e, t, n) {
    "use strict";

    var i, r, a, o, s, u, l, d, c, f;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), i = n(152), r = n.n(i);

    for (a in i) "default" !== a && function (e) {
      n.d(t, e, function () {
        return i[e];
      });
    }(a);

    o = n(344), s = n(0), u = !1, l = null, d = null, c = null, f = s(r.a, o.a, u, l, d, c), t.default = f.exports;
  }, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement;
      e._self._c;
      return e._m(0);
    },
        r = [function () {
      var e = this,
          t = e.$createElement,
          n = e._self._c || t;
      return n("md-icon", {
        staticClass: "md-icon-image"
      }, [n("svg", {
        attrs: {
          height: "24",
          viewBox: "0 0 24 24",
          width: "24",
          xmlns: "http://www.w3.org/2000/svg"
        }
      }, [n("path", {
        attrs: {
          d: "M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"
        }
      }), e._v(" "), n("path", {
        attrs: {
          d: "M0-.25h24v24H0z",
          fill: "none"
        }
      })])]);
    }],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t, n) {
    "use strict";

    var i, r, a, o, s, u, l, d, c, f;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), i = n(153), r = n.n(i);

    for (a in i) "default" !== a && function (e) {
      n.d(t, e, function () {
        return i[e];
      });
    }(a);

    o = n(346), s = n(0), u = !1, l = null, d = null, c = null, f = s(r.a, o.a, u, l, d, c), t.default = f.exports;
  }, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement;
      e._self._c;
      return e._m(0);
    },
        r = [function () {
      var e = this,
          t = e.$createElement,
          n = e._self._c || t;
      return n("md-icon", {
        staticClass: "md-icon-image"
      }, [n("svg", {
        attrs: {
          height: "24",
          viewBox: "0 0 24 24",
          width: "24",
          xmlns: "http://www.w3.org/2000/svg"
        }
      }, [n("path", {
        attrs: {
          d: "M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"
        }
      }), e._v(" "), n("path", {
        attrs: {
          d: "M0-.5h24v24H0z",
          fill: "none"
        }
      })])]);
    }],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement,
          n = e._self._c || t;
      return n("md-popover", {
        attrs: {
          "md-settings": e.popperSettings,
          "md-active": ""
        }
      }, [n("transition", {
        attrs: {
          name: "md-datepicker-dialog",
          appear: ""
        },
        on: {
          enter: e.setContentStyles,
          "after-leave": e.resetDate
        }
      }, [n("div", {
        staticClass: "md-datepicker-dialog",
        class: [e.$mdActiveTheme]
      }, [n("div", {
        staticClass: "md-datepicker-header"
      }, [n("span", {
        staticClass: "md-datepicker-year-select",
        class: {
          "md-selected": "year" === e.currentView
        },
        on: {
          click: function (t) {
            e.currentView = "year";
          }
        }
      }, [e._v(e._s(e.selectedYear))]), e._v(" "), n("div", {
        staticClass: "md-datepicker-date-select",
        class: {
          "md-selected": "year" !== e.currentView
        },
        on: {
          click: function (t) {
            e.currentView = "day";
          }
        }
      }, [n("strong", {
        staticClass: "md-datepicker-dayname"
      }, [e._v(e._s(e.shortDayName) + ", ")]), e._v(" "), n("strong", {
        staticClass: "md-datepicker-monthname"
      }, [e._v(e._s(e.shortMonthName))]), e._v(" "), n("strong", {
        staticClass: "md-datepicker-day"
      }, [e._v(e._s(e.currentDay))])])]), e._v(" "), n("div", {
        staticClass: "md-datepicker-body"
      }, [n("transition", {
        attrs: {
          name: "md-datepicker-body-header"
        }
      }, ["day" === e.currentView ? n("div", {
        staticClass: "md-datepicker-body-header"
      }, [n("md-button", {
        staticClass: "md-dense md-icon-button",
        on: {
          click: e.previousMonth
        }
      }, [n("md-arrow-left-icon")], 1), e._v(" "), n("md-button", {
        staticClass: "md-dense md-icon-button",
        on: {
          click: e.nextMonth
        }
      }, [n("md-arrow-right-icon")], 1)], 1) : e._e()]), e._v(" "), n("div", {
        staticClass: "md-datepicker-body-content",
        style: e.contentStyles
      }, [n("transition", {
        attrs: {
          name: "md-datepicker-view"
        }
      }, ["day" === e.currentView ? n("transition-group", {
        staticClass: "md-datepicker-panel md-datepicker-calendar",
        class: e.calendarClasses,
        attrs: {
          tag: "div",
          name: "md-datepicker-month"
        }
      }, e._l([e.currentDate], function (t) {
        return n("div", {
          key: t.getMonth(),
          staticClass: "md-datepicker-panel md-datepicker-month"
        }, [n("md-button", {
          staticClass: "md-dense md-datepicker-month-trigger",
          on: {
            click: function (t) {
              e.currentView = "month";
            }
          }
        }, [e._v(e._s(e.currentMonthName) + " " + e._s(e.currentYear))]), e._v(" "), n("div", {
          staticClass: "md-datepicker-week"
        }, [e._l(e.locale.shorterDays, function (t, i) {
          return i >= e.firstDayOfAWeek ? n("span", {
            key: i
          }, [e._v(e._s(t))]) : e._e();
        }), e._v(" "), e._l(e.locale.shorterDays, function (t, i) {
          return i < e.firstDayOfAWeek ? n("span", {
            key: i
          }, [e._v(e._s(t))]) : e._e();
        })], 2), e._v(" "), n("div", {
          staticClass: "md-datepicker-days"
        }, [e._l(e.prefixEmptyDays, function (e) {
          return n("span", {
            key: "day-empty-" + e,
            staticClass: "md-datepicker-empty"
          });
        }), e._v(" "), e._l(e.daysInMonth, function (t) {
          return n("div", {
            key: "day-" + t,
            staticClass: "md-datepicker-day"
          }, [n("span", {
            staticClass: "md-datepicker-day-button",
            class: {
              "md-datepicker-selected": e.isSelectedDay(t),
              "md-datepicker-today": e.isToday(t),
              "md-datepicker-disabled": e.isDisabled(t)
            },
            on: {
              click: function (n) {
                return e.selectDate(t);
              }
            }
          }, [e._v(e._s(t))])]);
        })], 2)], 1);
      }), 0) : "month" === e.currentView ? n("div", {
        staticClass: "md-datepicker-panel md-datepicker-month-selector"
      }, [n("md-button", {
        staticClass: "md-datepicker-year-trigger",
        on: {
          click: function (t) {
            e.currentView = "year";
          }
        }
      }, [e._v(e._s(e.currentYear))]), e._v(" "), e._l(e.locale.months, function (t, i) {
        return n("span", {
          key: t,
          staticClass: "md-datepicker-month-button",
          class: {
            "md-datepicker-selected": e.currentMonthName === t
          },
          on: {
            click: function (t) {
              return e.switchMonth(i);
            }
          }
        }, [e._v(e._s(t))]);
      })], 2) : "year" === e.currentView ? n("keep-alive", [n("md-content", {
        staticClass: "md-datepicker-panel md-datepicker-year-selector md-scrollbar"
      }, e._l(e.availableYears, function (t) {
        return n("span", {
          key: t,
          staticClass: "md-datepicker-year-button",
          class: {
            "md-datepicker-selected": e.currentYear === t
          },
          on: {
            click: function (n) {
              return e.switchYear(t);
            }
          }
        }, [e._v(e._s(t))]);
      }), 0)], 1) : e._e()], 1)], 1), e._v(" "), n("md-dialog-actions", {
        staticClass: "md-datepicker-body-footer"
      }, [n("md-button", {
        staticClass: "md-primary",
        on: {
          click: e.onCancel
        }
      }, [e._v("Cancel")]), e._v(" "), e.mdImmediately ? e._e() : n("md-button", {
        staticClass: "md-primary",
        on: {
          click: e.onConfirm
        }
      }, [e._v("Ok")])], 1)], 1)])])], 1);
    },
        r = [],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t, n) {
    "use strict";

    var i, r, a, o, s, u, l, d, c, f;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), i = n(156), r = n.n(i);

    for (a in i) "default" !== a && function (e) {
      n.d(t, e, function () {
        return i[e];
      });
    }(a);

    o = n(349), s = n(0), u = !1, l = null, d = null, c = null, f = s(r.a, o.a, u, l, d, c), t.default = f.exports;
  }, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement;
      e._self._c;
      return e._m(0);
    },
        r = [function () {
      var e = this,
          t = e.$createElement,
          n = e._self._c || t;
      return n("md-icon", {
        staticClass: "md-icon-image"
      }, [n("svg", {
        attrs: {
          height: "24",
          viewBox: "0 0 24 24",
          width: "24",
          xmlns: "http://www.w3.org/2000/svg"
        }
      }, [n("path", {
        attrs: {
          d: "M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"
        }
      }), e._v(" "), n("path", {
        attrs: {
          d: "M0 0h24v24H0z",
          fill: "none"
        }
      })])]);
    }],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t, n) {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = function (e, t) {
      var n = void 0;
      return function () {
        var i = this,
            r = arguments,
            a = function () {
          return e.apply(i, r);
        };

        clearTimeout(n), n = setTimeout(a, t);
      };
    };
  }, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement,
          n = e._self._c || t;
      return n("md-field", {
        class: ["md-datepicker", {
          "md-native": !this.mdOverrideNative
        }],
        attrs: {
          "md-clearable": ""
        }
      }, [n("md-date-icon", {
        staticClass: "md-date-icon",
        nativeOn: {
          click: function (t) {
            return e.toggleDialog(t);
          }
        }
      }), e._v(" "), n("md-input", {
        ref: "input",
        attrs: {
          type: e.type,
          pattern: e.pattern
        },
        nativeOn: {
          focus: function (t) {
            return e.onFocus(t);
          }
        },
        model: {
          value: e.inputDate,
          callback: function (t) {
            e.inputDate = t;
          },
          expression: "inputDate"
        }
      }), e._v(" "), e._t("default"), e._v(" "), n("keep-alive", [e.showDialog ? n("md-datepicker-dialog", {
        attrs: {
          "md-date": e.localDate,
          "md-disabled-dates": e.mdDisabledDates,
          mdImmediately: e.mdImmediately
        },
        on: {
          "update:mdDate": function (t) {
            e.localDate = t;
          },
          "update:md-date": function (t) {
            e.localDate = t;
          },
          "md-closed": e.toggleDialog
        }
      }) : e._e()], 1), e._v(" "), n("md-overlay", {
        staticClass: "md-datepicker-overlay",
        attrs: {
          "md-fixed": "",
          "md-active": e.showDialog
        },
        on: {
          click: e.toggleDialog
        }
      })], 2);
    },
        r = [],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    var r, a, o, s, u, l, d, c, f, h;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(3), a = i(r), o = n(68), s = i(o), u = n(353), l = i(u), d = n(356), c = i(d), f = n(359), h = i(f), t.default = function (e) {
      (0, a.default)(e), e.component(s.default.name, s.default), e.component(l.default.name, l.default), e.component(c.default.name, c.default), e.component(h.default.name, h.default);
    };
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      n(354);
    }

    var r, a, o, s, u, l, d, c, f, h;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(157), a = n.n(r);

    for (o in r) "default" !== o && function (e) {
      n.d(t, e, function () {
        return r[e];
      });
    }(o);

    s = n(355), u = n(0), l = !1, d = i, c = null, f = null, h = u(a.a, s.a, l, d, c, f), t.default = h.exports;
  }, function (e, t) {}, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement;
      return (e._self._c || t)("span", {
        staticClass: "md-dialog-title md-title"
      }, [e._t("default")], 2);
    },
        r = [],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      n(357);
    }

    var r, a, o, s, u, l, d, c, f, h;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(158), a = n.n(r);

    for (o in r) "default" !== o && function (e) {
      n.d(t, e, function () {
        return r[e];
      });
    }(o);

    s = n(358), u = n(0), l = !1, d = i, c = null, f = null, h = u(a.a, s.a, l, d, c, f), t.default = h.exports;
  }, function (e, t) {}, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement;
      return (e._self._c || t)("div", {
        class: ["md-dialog-content", e.$mdActiveTheme]
      }, [e._t("default")], 2);
    },
        r = [],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      n(360);
    }

    var r, a, o, s, u, l, d, c, f, h;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(159), a = n.n(r);

    for (o in r) "default" !== o && function (e) {
      n.d(t, e, function () {
        return r[e];
      });
    }(o);

    s = n(361), u = n(0), l = !1, d = i, c = null, f = null, h = u(a.a, s.a, l, d, c, f), t.default = h.exports;
  }, function (e, t) {}, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement;
      return (e._self._c || t)("div", {
        staticClass: "md-dialog-actions"
      }, [e._t("default")], 2);
    },
        r = [],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    var r, a, o, s;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(3), a = i(r), o = n(363), s = i(o), t.default = function (e) {
      (0, a.default)(e), e.component(s.default.name, s.default);
    };
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      n(364);
    }

    var r, a, o, s, u, l, d, c, f, h;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(160), a = n.n(r);

    for (o in r) "default" !== o && function (e) {
      n.d(t, e, function () {
        return r[e];
      });
    }(o);

    s = n(365), u = n(0), l = !1, d = i, c = null, f = null, h = u(a.a, s.a, l, d, c, f), t.default = h.exports;
  }, function (e, t) {}, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement,
          n = e._self._c || t;
      return e.insideList ? n("li", {
        staticClass: "md-divider",
        class: [e.$mdActiveTheme]
      }) : n("hr", {
        staticClass: "md-divider",
        class: [e.$mdActiveTheme]
      });
    },
        r = [],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    var r, a, o, s;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(3), a = i(r), o = n(367), s = i(o), t.default = function (e) {
      (0, a.default)(e), e.component(s.default.name, s.default);
    };
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      n(368);
    }

    var r, a, o, s, u, l, d, c, f, h;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(161), a = n.n(r);

    for (o in r) "default" !== o && function (e) {
      n.d(t, e, function () {
        return r[e];
      });
    }(o);

    s = n(369), u = n(0), l = !1, d = i, c = null, f = null, h = u(a.a, s.a, l, d, c, f), t.default = h.exports;
  }, function (e, t) {}, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement,
          n = e._self._c || t;
      return n("div", {
        staticClass: "md-drawer",
        class: [e.$mdActiveTheme, e.drawerClasses]
      }, [e._t("default"), e._v(" "), e.mdFixed ? n("md-overlay", {
        attrs: {
          "md-active": e.mdActive
        },
        on: {
          click: e.closeDrawer
        }
      }) : n("md-overlay", {
        attrs: {
          "md-active": e.mdActive,
          "md-attach-to-parent": ""
        },
        on: {
          click: e.closeDrawer
        }
      })], 2);
    },
        r = [],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t, n) {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: !0
    }), n(371), t.default = function (e) {};
  }, function (e, t) {}, function (e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    var r, a, o, s;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(3), a = i(r), o = n(105), s = i(o), t.default = function (e) {
      (0, a.default)(e), e.component(s.default.name, s.default);
    };
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    var r, a, o, s, u, l, d, c, f, h, m, p, v, b;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(3), a = i(r), o = n(106), s = i(o), u = n(374), l = i(u), d = n(62), c = i(d), f = n(386), h = i(f), m = n(53), p = i(m), v = n(391), b = i(v), t.default = function (e) {
      (0, a.default)(e), e.use(s.default), e.use(l.default), e.component(c.default.name, c.default), e.component(h.default.name, h.default), e.component(p.default.name, p.default), e.component(b.default.name, b.default);
    };
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    var r, a, o, s, u, l, d, c;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(3), a = i(r), o = n(375), s = i(o), u = n(380), l = i(u), d = n(383), c = i(d), t.default = function (e) {
      (0, a.default)(e), e.component(s.default.name, s.default), e.component(l.default.name, l.default), e.component(c.default.name, c.default);
    };
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      n(376);
    }

    var r, a, o, s, u, l, d, c, f, h;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(164), a = n.n(r);

    for (o in r) "default" !== o && function (e) {
      n.d(t, e, function () {
        return r[e];
      });
    }(o);

    s = n(379), u = n(0), l = !1, d = i, c = null, f = null, h = u(a.a, s.a, l, d, c, f), t.default = h.exports;
  }, function (e, t) {}, function (e, t, n) {
    "use strict";

    var i, r, a, o, s, u, l, d, c, f;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), i = n(165), r = n.n(i);

    for (a in i) "default" !== a && function (e) {
      n.d(t, e, function () {
        return i[e];
      });
    }(a);

    o = n(378), s = n(0), u = !1, l = null, d = null, c = null, f = s(r.a, o.a, u, l, d, c), t.default = f.exports;
  }, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement;
      e._self._c;
      return e._m(0);
    },
        r = [function () {
      var e = this,
          t = e.$createElement,
          n = e._self._c || t;
      return n("md-icon", {
        staticClass: "md-icon-image"
      }, [n("svg", {
        attrs: {
          height: "24",
          viewBox: "0 0 24 24",
          width: "24",
          xmlns: "http://www.w3.org/2000/svg"
        }
      }, [n("path", {
        attrs: {
          d: "M7 10l5 5 5-5z"
        }
      }), e._v(" "), n("path", {
        attrs: {
          d: "M0 0h24v24H0z",
          fill: "none"
        }
      })])]);
    }],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement,
          n = e._self._c || t;
      return n("md-menu", {
        staticClass: "md-select",
        class: {
          "md-disabled": e.disabled
        },
        attrs: {
          "md-close-on-select": !1,
          "md-active": e.showSelect,
          "md-offset-x": e.offset.x,
          "md-offset-y": e.offset.y,
          "md-dense": e.mdDense
        },
        on: {
          "update:mdActive": function (t) {
            e.showSelect = t;
          },
          "update:md-active": function (t) {
            e.showSelect = t;
          },
          "md-closed": e.onClose
        }
      }, [n("md-input", e._g(e._b({
        ref: "input",
        staticClass: "md-input md-select-value",
        attrs: {
          readonly: "",
          disabled: e.disabled,
          required: e.required,
          placeholder: e.placeholder
        },
        on: {
          focus: function (t) {
            return t.preventDefault(), e.onFocus(t);
          },
          blur: function (t) {
            return t.preventDefault(), e.removeHighlight(t);
          },
          click: e.openSelect,
          keydown: [function (t) {
            return !t.type.indexOf("key") && e._k(t.keyCode, "down", 40, t.key, ["Down", "ArrowDown"]) ? null : e.openSelect(t);
          }, function (t) {
            return !t.type.indexOf("key") && e._k(t.keyCode, "enter", 13, t.key, "Enter") ? null : e.openSelect(t);
          }, function (t) {
            return !t.type.indexOf("key") && e._k(t.keyCode, "space", 32, t.key, [" ", "Spacebar"]) ? null : e.openSelect(t);
          }]
        },
        model: {
          value: e.MdSelect.label,
          callback: function (t) {
            e.$set(e.MdSelect, "label", t);
          },
          expression: "MdSelect.label"
        }
      }, "md-input", e.attrs, !1), e.inputListeners)), e._v(" "), n("md-drop-down-icon", {
        nativeOn: {
          click: function (t) {
            return e.openSelect(t);
          }
        }
      }), e._v(" "), n("keep-alive", [n("md-menu-content", {
        ref: "menu",
        staticClass: "md-select-menu",
        style: e.menuStyles,
        attrs: {
          "md-content-class": e.mdClass
        },
        on: {
          enter: e.onMenuEnter
        }
      }, [e.showSelect ? e._t("default") : e._e()], 2)], 1), e._v(" "), e.showSelect ? e._e() : n("div", {
        directives: [{
          name: "show",
          rawName: "v-show",
          value: !1,
          expression: "false"
        }]
      }, [e._t("default")], 2), e._v(" "), n("input", {
        directives: [{
          name: "model",
          rawName: "v-model",
          value: e.model,
          expression: "model"
        }],
        staticClass: "md-input-fake",
        attrs: {
          disabled: e.disabled,
          readonly: "",
          tabindex: "-1"
        },
        domProps: {
          value: e.model
        },
        on: {
          input: function (t) {
            t.target.composing || (e.model = t.target.value);
          }
        }
      }), e._v(" "), n("select", e._b({
        directives: [{
          name: "model",
          rawName: "v-model",
          value: e.model,
          expression: "model"
        }],
        attrs: {
          readonly: "",
          tabindex: "-1"
        },
        on: {
          change: function (t) {
            var n = Array.prototype.filter.call(t.target.options, function (e) {
              return e.selected;
            }).map(function (e) {
              return "_value" in e ? e._value : e.value;
            });
            e.model = t.target.multiple ? n : n[0];
          }
        }
      }, "select", e.attributes, !1))], 1);
    },
        r = [],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      n(381);
    }

    var r, a, o, s, u, l, d, c, f, h;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(170), a = n.n(r);

    for (o in r) "default" !== o && function (e) {
      n.d(t, e, function () {
        return r[e];
      });
    }(o);

    s = n(382), u = n(0), l = !1, d = i, c = null, f = null, h = u(a.a, s.a, l, d, c, f), t.default = h.exports;
  }, function (e, t) {}, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement,
          n = e._self._c || t;
      return n("md-menu-item", {
        class: e.optionClasses,
        attrs: {
          disabled: e.isDisabled
        },
        on: {
          click: e.setSelection
        }
      }, [e.MdSelect.multiple ? n("md-checkbox", {
        staticClass: "md-primary",
        attrs: {
          disabled: e.isDisabled
        },
        model: {
          value: e.isChecked,
          callback: function (t) {
            e.isChecked = t;
          },
          expression: "isChecked"
        }
      }) : e._e(), e._v(" "), n("span", {
        ref: "text",
        staticClass: "md-list-item-text"
      }, [e._t("default")], 2)], 1);
    },
        r = [],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      n(384);
    }

    var r, a, o, s, u, l, d, c, f, h;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(171), a = n.n(r);

    for (o in r) "default" !== o && function (e) {
      n.d(t, e, function () {
        return r[e];
      });
    }(o);

    s = n(385), u = n(0), l = !1, d = i, c = null, f = null, h = u(a.a, s.a, l, d, c, f), t.default = h.exports;
  }, function (e, t) {}, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement,
          n = e._self._c || t;
      return n("div", {
        staticClass: "md-optgroup"
      }, [n("md-subheader", [e._v(e._s(e.label))]), e._v(" "), e._t("default")], 2);
    },
        r = [],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      n(387);
    }

    var r, a, o, s, u, l, d, c, f, h;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(172), a = n.n(r);

    for (o in r) "default" !== o && function (e) {
      n.d(t, e, function () {
        return r[e];
      });
    }(o);

    s = n(390), u = n(0), l = !1, d = i, c = null, f = null, h = u(a.a, s.a, l, d, c, f), t.default = h.exports;
  }, function (e, t) {}, function (e, t, n) {
    "use strict";

    var i, r, a, o, s, u, l, d, c, f;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), i = n(173), r = n.n(i);

    for (a in i) "default" !== a && function (e) {
      n.d(t, e, function () {
        return i[e];
      });
    }(a);

    o = n(389), s = n(0), u = !1, l = null, d = null, c = null, f = s(r.a, o.a, u, l, d, c), t.default = f.exports;
  }, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement;
      e._self._c;
      return e._m(0);
    },
        r = [function () {
      var e = this,
          t = e.$createElement,
          n = e._self._c || t;
      return n("md-icon", {
        staticClass: "md-icon-image"
      }, [n("svg", {
        attrs: {
          height: "24",
          viewBox: "0 0 24 24",
          width: "24",
          xmlns: "http://www.w3.org/2000/svg"
        }
      }, [n("path", {
        attrs: {
          d: "M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z"
        }
      }), e._v(" "), n("path", {
        attrs: {
          d: "M0 0h24v24H0z",
          fill: "none"
        }
      })])]);
    }],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement,
          n = e._self._c || t;
      return n("div", {
        staticClass: "md-file"
      }, [n("md-file-icon", {
        staticClass: "md-file-icon",
        class: e.iconClass,
        nativeOn: {
          click: function (t) {
            return e.openPicker(t);
          }
        }
      }), e._v(" "), "checkbox" === {
        disabled: e.disabled,
        required: e.required,
        placeholder: e.placeholder
      }.type ? n("input", e._b({
        directives: [{
          name: "model",
          rawName: "v-model",
          value: e.model,
          expression: "model"
        }],
        staticClass: "md-input",
        attrs: {
          readonly: "",
          type: "checkbox"
        },
        domProps: {
          checked: Array.isArray(e.model) ? e._i(e.model, null) > -1 : e.model
        },
        on: {
          click: e.openPicker,
          blur: e.onBlur,
          change: function (t) {
            var n,
                i,
                r = e.model,
                a = t.target,
                o = !!a.checked;
            Array.isArray(r) ? (n = null, i = e._i(r, n), a.checked ? i < 0 && (e.model = r.concat([n])) : i > -1 && (e.model = r.slice(0, i).concat(r.slice(i + 1)))) : e.model = o;
          }
        }
      }, "input", {
        disabled: e.disabled,
        required: e.required,
        placeholder: e.placeholder
      }, !1)) : "radio" === {
        disabled: e.disabled,
        required: e.required,
        placeholder: e.placeholder
      }.type ? n("input", e._b({
        directives: [{
          name: "model",
          rawName: "v-model",
          value: e.model,
          expression: "model"
        }],
        staticClass: "md-input",
        attrs: {
          readonly: "",
          type: "radio"
        },
        domProps: {
          checked: e._q(e.model, null)
        },
        on: {
          click: e.openPicker,
          blur: e.onBlur,
          change: function (t) {
            e.model = null;
          }
        }
      }, "input", {
        disabled: e.disabled,
        required: e.required,
        placeholder: e.placeholder
      }, !1)) : n("input", e._b({
        directives: [{
          name: "model",
          rawName: "v-model",
          value: e.model,
          expression: "model"
        }],
        staticClass: "md-input",
        attrs: {
          readonly: "",
          type: {
            disabled: e.disabled,
            required: e.required,
            placeholder: e.placeholder
          }.type
        },
        domProps: {
          value: e.model
        },
        on: {
          click: e.openPicker,
          blur: e.onBlur,
          input: function (t) {
            t.target.composing || (e.model = t.target.value);
          }
        }
      }, "input", {
        disabled: e.disabled,
        required: e.required,
        placeholder: e.placeholder
      }, !1)), e._v(" "), n("input", e._g(e._b({
        ref: "inputFile",
        attrs: {
          type: "file"
        },
        on: {
          change: e.onChange
        }
      }, "input", e.attributes, !1), e.$listeners))], 1);
    },
        r = [],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t, n) {
    "use strict";

    var i, r, a, o, s, u, l, d, c, f;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), i = n(174), r = n.n(i);

    for (a in i) "default" !== a && function (e) {
      n.d(t, e, function () {
        return i[e];
      });
    }(a);

    o = n(392), s = n(0), u = !1, l = null, d = null, c = null, f = s(r.a, o.a, u, l, d, c), t.default = f.exports;
  }, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement;
      return (e._self._c || t)("textarea", e._g(e._b({
        directives: [{
          name: "model",
          rawName: "v-model",
          value: e.model,
          expression: "model"
        }],
        staticClass: "md-textarea",
        style: e.textareaStyles,
        domProps: {
          value: e.model
        },
        on: {
          focus: e.onFocus,
          blur: e.onBlur,
          input: function (t) {
            t.target.composing || (e.model = t.target.value);
          }
        }
      }, "textarea", e.attributes, !1), e.listeners));
    },
        r = [],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    var r, a, o, s;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(3), a = i(r), o = n(394), s = i(o), t.default = function (e) {
      (0, a.default)(e), e.component(s.default.name, s.default);
    };
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      n(395);
    }

    var r, a, o, s, u, l, d, c, f, h;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(175), a = n.n(r);

    for (o in r) "default" !== o && function (e) {
      n.d(t, e, function () {
        return r[e];
      });
    }(o);

    s = n(0), u = null, l = !1, d = i, c = null, f = null, h = s(a.a, u, l, d, c, f), t.default = h.exports;
  }, function (e, t) {}, function (e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    var r, a, o, s;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(3), a = i(r), o = n(397), s = i(o), t.default = function (e) {
      (0, a.default)(e), e.component(s.default.name, s.default);
    };
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      n(398);
    }

    var r, a, o, s, u, l, d, c, f, h;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(176), a = n.n(r);

    for (o in r) "default" !== o && function (e) {
      n.d(t, e, function () {
        return r[e];
      });
    }(o);

    s = n(399), u = n(0), l = !1, d = i, c = null, f = null, h = u(a.a, s.a, l, d, c, f), t.default = h.exports;
  }, function (e, t) {}, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement;
      return (e._self._c || t)("div", {
        staticClass: "md-image",
        class: [e.$mdActiveTheme]
      }, [e._t("default")], 2);
    },
        r = [],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t, n) {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: !0
    }), n(401), t.default = function (e) {};
  }, function (e, t) {}, function (e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    var r, a, o, s, u, l;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(3), a = i(r), o = n(74), s = i(o), u = n(109), l = i(u), t.default = function (e) {
      (0, a.default)(e), e.component(s.default.name, s.default), e.component(l.default.name, l.default);
    };
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    var r, a, o, s, u, l, d, c;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(3), a = i(r), o = n(107), s = i(o), u = n(108), l = i(u), d = n(404), c = i(d), t.default = function (e) {
      (0, a.default)(e), e.component(s.default.name, s.default), e.component(l.default.name, l.default), e.component(c.default.name, c.default);
    };
  }, function (e, t, n) {
    "use strict";

    var i, r, a, o, s, u, l, d, c, f;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), i = n(195), r = n.n(i);

    for (a in i) "default" !== a && function (e) {
      n.d(t, e, function () {
        return i[e];
      });
    }(a);

    o = n(405), s = n(0), u = !1, l = null, d = null, c = null, f = s(r.a, o.a, u, l, d, c), t.default = f.exports;
  }, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement;
      return (e._self._c || t)("md-list-item", e._g(e._b({
        staticClass: "md-menu-item",
        class: [e.itemClasses, e.$mdActiveTheme],
        attrs: {
          disabled: e.disabled,
          tabindex: e.highlighted && -1
        }
      }, "md-list-item", e.$attrs, !1), e.listeners), [e._t("default")], 2);
    },
        r = [],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    var r, a, o, s, u, l;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(3), a = i(r), o = n(407), s = i(o), u = n(410), l = i(u), t.default = function (e) {
      (0, a.default)(e), e.component(s.default.name, s.default), e.component(l.default.name, l.default);
    };
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      n(408);
    }

    var r, a, o, s, u, l, d, c, f, h;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(196), a = n.n(r);

    for (o in r) "default" !== o && function (e) {
      n.d(t, e, function () {
        return r[e];
      });
    }(o);

    s = n(409), u = n(0), l = !1, d = i, c = null, f = null, h = u(a.a, s.a, l, d, c, f), t.default = h.exports;
  }, function (e, t) {}, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement,
          n = e._self._c || t;
      return n("transition", {
        attrs: {
          name: "md-progress-bar",
          appear: ""
        }
      }, [n("div", {
        staticClass: "md-progress-bar",
        class: [e.progressClasses, e.$mdActiveTheme]
      }, [n("div", {
        staticClass: "md-progress-bar-track",
        style: e.progressTrackStyle
      }), e._v(" "), n("div", {
        staticClass: "md-progress-bar-fill",
        style: e.progressValueStyle
      }), e._v(" "), n("div", {
        staticClass: "md-progress-bar-buffer",
        attrs: {
          Style: e.progressBufferStyle
        }
      })])]);
    },
        r = [],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      n(411);
    }

    var r, a, o, s, u, l, d, c, f, h;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(197), a = n.n(r);

    for (o in r) "default" !== o && function (e) {
      n.d(t, e, function () {
        return r[e];
      });
    }(o);

    s = n(412), u = n(0), l = !1, d = i, c = null, f = null, h = u(a.a, s.a, l, d, c, f), t.default = h.exports;
  }, function (e, t) {}, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement,
          n = e._self._c || t;
      return n("transition", {
        attrs: {
          name: "md-progress-spinner",
          appear: ""
        }
      }, [n("div", {
        staticClass: "md-progress-spinner",
        class: [e.progressClasses, e.$mdActiveTheme]
      }, [n("svg", {
        ref: "md-progress-spinner-draw",
        staticClass: "md-progress-spinner-draw",
        attrs: {
          preserveAspectRatio: "xMidYMid meet",
          focusable: "false",
          viewBox: "0 0 " + e.mdDiameter + " " + e.mdDiameter
        }
      }, [n("circle", {
        ref: "md-progress-spinner-circle",
        staticClass: "md-progress-spinner-circle",
        attrs: {
          cx: "50%",
          cy: "50%",
          r: e.circleRadius
        }
      })])])]);
    },
        r = [],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    var r, a, o, s;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(3), a = i(r), o = n(414), s = i(o), t.default = function (e) {
      (0, a.default)(e), e.component(s.default.name, s.default);
    };
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      n(415);
    }

    var r, a, o, s, u, l, d, c, f, h;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(198), a = n.n(r);

    for (o in r) "default" !== o && function (e) {
      n.d(t, e, function () {
        return r[e];
      });
    }(o);

    s = n(416), u = n(0), l = !1, d = i, c = null, f = null, h = u(a.a, s.a, l, d, c, f), t.default = h.exports;
  }, function (e, t) {}, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement,
          n = e._self._c || t;
      return n("div", {
        staticClass: "md-radio",
        class: [e.$mdActiveTheme, e.radioClasses]
      }, [n("div", {
        staticClass: "md-radio-container",
        on: {
          click: function (t) {
            return t.stopPropagation(), e.toggleCheck(t);
          }
        }
      }, [n("md-ripple", {
        attrs: {
          "md-centered": "",
          "md-active": e.rippleActive,
          "md-disabled": e.disabled
        },
        on: {
          "update:mdActive": function (t) {
            e.rippleActive = t;
          },
          "update:md-active": function (t) {
            e.rippleActive = t;
          }
        }
      }, [n("input", e._b({
        attrs: {
          type: "radio"
        }
      }, "input", {
        id: e.id,
        name: e.name,
        disabled: e.disabled,
        required: e.required,
        value: e.value
      }, !1))])], 1), e._v(" "), e.$slots.default ? n("label", {
        staticClass: "md-radio-label",
        attrs: {
          for: e.id
        },
        on: {
          click: function (t) {
            return t.preventDefault(), e.toggleCheck(t);
          }
        }
      }, [e._t("default")], 2) : e._e()]);
    },
        r = [],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    var r, a, o, s, u, l;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(3), a = i(r), o = n(16), s = i(o), u = n(22), l = i(u), t.default = function (e) {
      (0, a.default)(e), e.component(s.default.name, s.default), e.component(l.default.name, l.default);
    };
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    var r, a, o, s;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(3), a = i(r), o = n(419), s = i(o), t.default = function (e) {
      (0, a.default)(e), e.component(s.default.name, s.default);
    };
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      n(420);
    }

    var r, a, o, s, u, l, d, c, f, h;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(199), a = n.n(r);

    for (o in r) "default" !== o && function (e) {
      n.d(t, e, function () {
        return r[e];
      });
    }(o);

    s = n(424), u = n(0), l = !1, d = i, c = null, f = null, h = u(a.a, s.a, l, d, c, f), t.default = h.exports;
  }, function (e, t) {}, function (e, t, n) {
    "use strict";

    var i, r, a, o, s, u, l, d, c, f;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), i = n(200), r = n.n(i);

    for (a in i) "default" !== a && function (e) {
      n.d(t, e, function () {
        return i[e];
      });
    }(a);

    o = n(422), s = n(0), u = !0, l = null, d = null, c = null, f = s(r.a, o.a, u, l, d, c), t.default = f.exports;
  }, function (e, t, n) {
    "use strict";

    var i = function (e, t) {
      var n = t._c;
      return n("transition", {
        attrs: {
          name: "md-snackbar",
          appear: ""
        }
      }, [n("div", {
        staticClass: "md-snackbar",
        class: t.props.mdClasses
      }, [n("div", {
        staticClass: "md-snackbar-content"
      }, [t._t("default")], 2)])]);
    },
        r = [],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t, n) {
    "use strict";

    function i(e, t, n) {
      return new Promise(function (i) {
        r = {
          destroy: function () {
            r = null, i();
          }
        }, e !== 1 / 0 && (a = window.setTimeout(function () {
          o(), t || n._vnode.componentInstance.initDestroy(!0);
        }, e));
      });
    }

    var r, a, o;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = null, a = null, o = t.destroySnackbar = function () {
      return new Promise(function (e) {
        r ? (window.clearTimeout(a), r.destroy(), window.setTimeout(e, 400)) : e();
      });
    }, t.createSnackbar = function (e, t, n) {
      return r ? o().then(function () {
        return i(e, t, n);
      }) : i(e, t, n);
    };
  }, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement,
          n = e._self._c || t;
      return e.mdPersistent && e.mdDuration !== 1 / 0 ? n("md-portal", [n("keep-alive", [e.mdActive ? n("md-snackbar-content", {
        attrs: {
          "md-classes": [e.snackbarClasses, e.$mdActiveTheme]
        }
      }, [e._t("default")], 2) : e._e()], 1)], 1) : n("md-portal", [e.mdActive ? n("md-snackbar-content", {
        attrs: {
          "md-classes": [e.snackbarClasses, e.$mdActiveTheme]
        }
      }, [e._t("default")], 2) : e._e()], 1);
    },
        r = [],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    var r, a, o, s, u, l, d, c;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(3), a = i(r), o = n(426), s = i(o), u = n(429), l = i(u), d = n(432), c = i(d), t.default = function (e) {
      (0, a.default)(e), e.component(s.default.name, s.default), e.component(l.default.name, l.default), e.component(c.default.name, c.default);
    };
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      n(427);
    }

    var r, a, o, s, u, l, d, c, f, h;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(201), a = n.n(r);

    for (o in r) "default" !== o && function (e) {
      n.d(t, e, function () {
        return r[e];
      });
    }(o);

    s = n(428), u = n(0), l = !1, d = i, c = null, f = null, h = u(a.a, s.a, l, d, c, f), t.default = h.exports;
  }, function (e, t) {}, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement;
      return (e._self._c || t)("div", {
        staticClass: "md-speed-dial",
        class: [e.$mdActiveTheme, e.speedDialClasses]
      }, [e._t("default")], 2);
    },
        r = [],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      n(430);
    }

    var r, a, o, s, u, l, d, c, f, h;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(202), a = n.n(r);

    for (o in r) "default" !== o && function (e) {
      n.d(t, e, function () {
        return r[e];
      });
    }(o);

    s = n(431), u = n(0), l = !1, d = i, c = null, f = null, h = u(a.a, s.a, l, d, c, f), t.default = h.exports;
  }, function (e, t) {}, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement;
      return (e._self._c || t)("md-button", e._g(e._b({
        staticClass: "md-speed-dial-target md-fab",
        on: {
          click: e.handleClick
        }
      }, "md-button", e.$attrs, !1), e.$listeners), [e._t("default")], 2);
    },
        r = [],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      n(433);
    }

    var r, a, o, s, u, l, d, c, f, h;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(203), a = n.n(r);

    for (o in r) "default" !== o && function (e) {
      n.d(t, e, function () {
        return r[e];
      });
    }(o);

    s = n(434), u = n(0), l = !1, d = i, c = null, f = null, h = u(a.a, s.a, l, d, c, f), t.default = h.exports;
  }, function (e, t) {}, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement;
      return (e._self._c || t)("div", {
        staticClass: "md-speed-dial-content"
      }, [e._t("default")], 2);
    },
        r = [],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    var r, a, o, s, u, l;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(3), a = i(r), o = n(436), s = i(o), u = n(446), l = i(u), t.default = function (e) {
      (0, a.default)(e), e.component(s.default.name, s.default), e.component(l.default.name, l.default);
    };
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      n(437);
    }

    var r, a, o, s, u, l, d, c, f, h;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(204), a = n.n(r);

    for (o in r) "default" !== o && function (e) {
      n.d(t, e, function () {
        return r[e];
      });
    }(o);

    s = n(445), u = n(0), l = !1, d = i, c = null, f = null, h = u(a.a, s.a, l, d, c, f), t.default = h.exports;
  }, function (e, t) {}, function (e, t, n) {
    "use strict";

    var i, r, a, o, s, u, l, d, c, f;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), i = n(207), r = n.n(i);

    for (a in i) "default" !== a && function (e) {
      n.d(t, e, function () {
        return i[e];
      });
    }(a);

    o = n(439), s = n(0), u = !1, l = null, d = null, c = null, f = s(r.a, o.a, u, l, d, c), t.default = f.exports;
  }, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement;
      e._self._c;
      return e._m(0);
    },
        r = [function () {
      var e = this,
          t = e.$createElement,
          n = e._self._c || t;
      return n("md-icon", {
        staticClass: "md-icon-image"
      }, [n("svg", {
        attrs: {
          height: "24",
          viewBox: "0 0 24 24",
          width: "24",
          xmlns: "http://www.w3.org/2000/svg"
        }
      }, [n("path", {
        attrs: {
          d: "M0 0h24v24H0z",
          fill: "none"
        }
      }), e._v(" "), n("path", {
        attrs: {
          d: "M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"
        }
      })])]);
    }],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t, n) {
    "use strict";

    var i, r, a, o, s, u, l, d, c, f;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), i = n(208), r = n.n(i);

    for (a in i) "default" !== a && function (e) {
      n.d(t, e, function () {
        return i[e];
      });
    }(a);

    o = n(441), s = n(0), u = !1, l = null, d = null, c = null, f = s(r.a, o.a, u, l, d, c), t.default = f.exports;
  }, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement;
      e._self._c;
      return e._m(0);
    },
        r = [function () {
      var e = this,
          t = e.$createElement,
          n = e._self._c || t;
      return n("md-icon", {
        staticClass: "md-icon-image"
      }, [n("svg", {
        attrs: {
          height: "24",
          viewBox: "0 0 24 24",
          width: "24",
          xmlns: "http://www.w3.org/2000/svg"
        }
      }, [n("path", {
        attrs: {
          d: "M0 0h24v24H0z",
          fill: "none"
        }
      }), e._v(" "), n("path", {
        attrs: {
          d: "M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
        }
      })])]);
    }],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t, n) {
    "use strict";

    var i, r, a, o, s, u, l, d, c, f;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), i = n(209), r = n.n(i);

    for (a in i) "default" !== a && function (e) {
      n.d(t, e, function () {
        return i[e];
      });
    }(a);

    o = n(443), s = n(0), u = !1, l = null, d = null, c = null, f = s(r.a, o.a, u, l, d, c), t.default = f.exports;
  }, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement;
      e._self._c;
      return e._m(0);
    },
        r = [function () {
      var e = this,
          t = e.$createElement,
          n = e._self._c || t;
      return n("md-icon", {
        staticClass: "md-icon-image"
      }, [n("svg", {
        attrs: {
          height: "24",
          viewBox: "0 0 24 24",
          width: "24",
          xmlns: "http://www.w3.org/2000/svg"
        }
      }, [n("path", {
        attrs: {
          d: "M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
        }
      }), e._v(" "), n("path", {
        attrs: {
          d: "M0 0h24v24H0z",
          fill: "none"
        }
      })])]);
    }],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement,
          n = e._self._c || t;
      return n("md-button", e._g(e._b({
        staticClass: "md-stepper-header",
        class: e.classes,
        attrs: {
          disabled: e.shouldDisable
        },
        nativeOn: {
          click: function (t) {
            !e.MdSteppers.syncRoute && e.MdSteppers.setActiveStep(e.index);
          }
        }
      }, "md-button", e.data.props, !1), e.data.events), [e.data.error ? n("md-warning-icon", {
        staticClass: "md-stepper-icon"
      }) : n("div", {
        staticClass: "md-stepper-number"
      }, [e.data.done && e.data.editable ? n("md-edit-icon", {
        staticClass: "md-stepper-editable"
      }) : e.data.done ? n("md-check-icon", {
        staticClass: "md-stepper-done"
      }) : [e._v(e._s(e.MdSteppers.getStepperNumber(e.index)))]], 2), e._v(" "), n("div", {
        staticClass: "md-stepper-text"
      }, [n("span", {
        staticClass: "md-stepper-label"
      }, [e._v(e._s(e.data.label))]), e._v(" "), e.data.error ? n("span", {
        staticClass: "md-stepper-error"
      }, [e._v(e._s(e.data.error))]) : e.data.description ? n("span", {
        staticClass: "md-stepper-description"
      }, [e._v(e._s(e.data.description))]) : e._e()])], 1);
    },
        r = [],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement,
          n = e._self._c || t;
      return n("div", {
        staticClass: "md-steppers",
        class: [e.steppersClasses, e.$mdActiveTheme]
      }, [e.mdVertical ? e._e() : n("div", {
        staticClass: "md-steppers-navigation"
      }, e._l(e.MdSteppers.items, function (e, t) {
        return n("md-step-header", {
          key: t,
          attrs: {
            index: t
          }
        });
      }), 1), e._v(" "), n("div", {
        staticClass: "md-steppers-wrapper",
        style: e.contentStyles
      }, [n("div", {
        staticClass: "md-steppers-container",
        style: e.containerStyles
      }, [e._t("default")], 2)])]);
    },
        r = [],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      n(447);
    }

    var r, a, o, s, u, l, d, c, f, h;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(210), a = n.n(r);

    for (o in r) "default" !== o && function (e) {
      n.d(t, e, function () {
        return r[e];
      });
    }(o);

    s = n(448), u = n(0), l = !1, d = i, c = null, f = null, h = u(a.a, s.a, l, d, c, f), t.default = h.exports;
  }, function (e, t) {}, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement,
          n = e._self._c || t;
      return n("div", {
        staticClass: "md-stepper"
      }, [e.MdSteppers.isVertical ? n("md-step-header", {
        attrs: {
          index: e.id
        }
      }) : e._e(), e._v(" "), n("div", {
        staticClass: "md-stepper-content",
        class: {
          "md-active": !e.MdSteppers.syncRoute && e.id === e.MdSteppers.activeStep
        }
      }, [e._t("default")], 2)], 1);
    },
        r = [],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    var r, a, o, s;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(3), a = i(r), o = n(450), s = i(o), t.default = function (e) {
      (0, a.default)(e), e.component(s.default.name, s.default);
    };
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      n(451);
    }

    var r, a, o, s, u, l, d, c, f, h;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(211), a = n.n(r);

    for (o in r) "default" !== o && function (e) {
      n.d(t, e, function () {
        return r[e];
      });
    }(o);

    s = n(452), u = n(0), l = !1, d = i, c = null, f = null, h = u(a.a, s.a, l, d, c, f), t.default = h.exports;
  }, function (e, t) {}, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement,
          n = e._self._c || t;
      return e.insideList ? n("li", {
        staticClass: "md-subheader",
        class: [e.$mdActiveTheme]
      }, [e._t("default")], 2) : n("div", {
        staticClass: "md-subheader",
        class: [e.$mdActiveTheme]
      }, [e._t("default")], 2);
    },
        r = [],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    var r, a, o, s;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(3), a = i(r), o = n(454), s = i(o), t.default = function (e) {
      (0, a.default)(e), e.component(s.default.name, s.default);
    };
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      n(455);
    }

    var r, a, o, s, u, l, d, c, f, h;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(212), a = n.n(r);

    for (o in r) "default" !== o && function (e) {
      n.d(t, e, function () {
        return r[e];
      });
    }(o);

    s = n(456), u = n(0), l = !1, d = i, c = null, f = null, h = u(a.a, s.a, l, d, c, f), t.default = h.exports;
  }, function (e, t) {}, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement,
          n = e._self._c || t;
      return n("div", {
        staticClass: "md-switch",
        class: [e.$mdActiveTheme, e.checkClasses]
      }, [n("div", {
        staticClass: "md-switch-container",
        on: {
          click: function (t) {
            return t.stopPropagation(), e.toggleCheck(t);
          }
        }
      }, [n("div", {
        staticClass: "md-switch-thumb"
      }, [n("md-ripple", {
        attrs: {
          "md-centered": "",
          "md-active": e.rippleActive,
          "md-disabled": e.disabled
        },
        on: {
          "update:mdActive": function (t) {
            e.rippleActive = t;
          },
          "update:md-active": function (t) {
            e.rippleActive = t;
          }
        }
      }, [n("input", e._b({
        attrs: {
          id: e.id,
          type: "checkbox"
        }
      }, "input", {
        id: e.id,
        name: e.name,
        disabled: e.disabled,
        required: e.required,
        value: e.value
      }, !1))])], 1)]), e._v(" "), e.$slots.default ? n("label", {
        staticClass: "md-switch-label",
        attrs: {
          for: e.id
        },
        on: {
          click: function (t) {
            return t.preventDefault(), e.toggleCheck(t);
          }
        }
      }, [e._t("default")], 2) : e._e()]);
    },
        r = [],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    var r, a, o, s, u, l, d, c, f, h, m, p, v, b, g, y;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(3), a = i(r), o = n(458), s = i(o), u = n(479), l = i(u), d = n(482), c = i(d), f = n(220), h = i(f), m = n(101), p = i(m), v = n(485), b = i(v), g = n(488), y = i(g), t.default = function (e) {
      (0, a.default)(e), e.component("MdTable", s.default), e.component(l.default.name, l.default), e.component(c.default.name, c.default), e.component(h.default.name, h.default), e.component(p.default.name, p.default), e.component(b.default.name, b.default), e.component(y.default.name, y.default);
    };
  }, function (e, t, n) {
    "use strict";

    function i(e, t) {
      function n(e) {
        var t = e.componentOptions;
        return t && t.tag;
      }

      var i = ["md-table-toolbar", "md-table-empty-state", "md-table-pagination"],
          r = Array.from(e),
          a = {};
      return r.forEach(function (e, t) {
        if (e && e.tag) {
          var o = n(e);
          o && i.includes(o) && (e.data.slot = o, e.data.attrs = e.data.attrs || {}, a[o] = function () {
            return e;
          }, r.splice(t, 1));
        }
      }), {
        childNodes: r,
        slots: a
      };
    }

    var r, a, o;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = Object.assign || function (e) {
      var t, n, i;

      for (t = 1; t < arguments.length; t++) {
        n = arguments[t];

        for (i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i]);
      }

      return e;
    }, a = n(459), o = function (e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }(a), t.default = {
      name: "MdTableContainer",
      functional: !0,
      render: function (e, t) {
        var n,
            a,
            s,
            u = t.data,
            l = t.props,
            d = t.children,
            c = [],
            f = u.scopedSlots;
        return d && (n = i(d, e), a = n.childNodes, s = n.slots, c = a, f = r({}, f, s)), e(o.default, r({}, u, {
          props: l,
          scopedSlots: f
        }), [c]);
      }
    };
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      n(460);
    }

    var r, a, o, s, u, l, d, c, f, h;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(213), a = n.n(r);

    for (o in r) "default" !== o && function (e) {
      n.d(t, e, function () {
        return r[e];
      });
    }(o);

    s = n(478), u = n(0), l = !1, d = i, c = null, f = null, h = u(a.a, s.a, l, d, c, f), t.default = h.exports;
  }, function (e, t) {}, function (e, t, n) {
    "use strict";

    var i, r, a, o, s, u, l, d, c, f;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), i = n(214), r = n.n(i);

    for (a in i) "default" !== a && function (e) {
      n.d(t, e, function () {
        return i[e];
      });
    }(a);

    o = n(0), s = null, u = !1, l = null, d = null, c = null, f = o(r.a, s, u, l, d, c), t.default = f.exports;
  }, function (e, t, n) {
    "use strict";

    var i, r, a, o, s, u, l, d, c, f;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), i = n(215), r = n.n(i);

    for (a in i) "default" !== a && function (e) {
      n.d(t, e, function () {
        return i[e];
      });
    }(a);

    o = n(469), s = n(0), u = !1, l = null, d = null, c = null, f = s(r.a, o.a, u, l, d, c), t.default = f.exports;
  }, function (e, t) {}, function (e, t, n) {
    "use strict";

    var i, r, a, o, s, u, l, d, c, f;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), i = n(217), r = n.n(i);

    for (a in i) "default" !== a && function (e) {
      n.d(t, e, function () {
        return i[e];
      });
    }(a);

    o = n(465), s = n(0), u = !1, l = null, d = null, c = null, f = s(r.a, o.a, u, l, d, c), t.default = f.exports;
  }, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement;
      e._self._c;
      return e._m(0);
    },
        r = [function () {
      var e = this,
          t = e.$createElement,
          n = e._self._c || t;
      return n("md-icon", {
        staticClass: "md-icon-image"
      }, [n("svg", {
        attrs: {
          height: "24",
          viewBox: "0 0 24 24",
          width: "24",
          xmlns: "http://www.w3.org/2000/svg"
        }
      }, [n("path", {
        attrs: {
          d: "M0 0h24v24H0V0z",
          fill: "none"
        }
      }), e._v(" "), n("path", {
        attrs: {
          d: "M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"
        }
      })])]);
    }],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement,
          n = e._self._c || t;
      return n("th", {
        staticClass: "md-table-head",
        class: e.headClasses,
        style: e.headStyles,
        attrs: {
          id: e.id
        },
        on: {
          click: e.changeSort
        }
      }, [e.$slots.default ? n("div", {
        staticClass: "md-table-head-container"
      }, [n("div", {
        staticClass: "md-table-head-label"
      }, [e._t("default")], 2)]) : n("md-ripple", {
        staticClass: "md-table-head-container",
        attrs: {
          "md-disabled": !e.hasSort
        }
      }, [n("div", {
        staticClass: "md-table-head-label"
      }, [e.hasSort ? n("md-upward-icon", {
        staticClass: "md-table-sortable-icon"
      }, [e._v("arrow_upward")]) : e._e(), e._v("\n\n      " + e._s(e.label) + "\n\n      "), e.tooltip ? n("md-tooltip", [e._v(e._s(e.tooltip))]) : e._e()], 1)])], 1);
    },
        r = [],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t, n) {
    "use strict";

    var i, r, a, o, s, u, l, d, c, f;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), i = n(218), r = n.n(i);

    for (a in i) "default" !== a && function (e) {
      n.d(t, e, function () {
        return i[e];
      });
    }(a);

    o = n(468), s = n(0), u = !1, l = null, d = null, c = null, f = s(r.a, o.a, u, l, d, c), t.default = f.exports;
  }, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement,
          n = e._self._c || t;
      return e.selectableCount ? n("md-table-head", {
        staticClass: "md-table-cell-selection"
      }, [n("div", {
        staticClass: "md-table-cell-container"
      }, [n("md-checkbox", {
        attrs: {
          model: e.allSelected,
          disabled: e.isDisabled
        },
        on: {
          change: e.onChange
        }
      })], 1)]) : e._e();
    },
        r = [],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement,
          n = e._self._c || t;
      return n("thead", [n("tr", [n("md-table-head-selection"), e._v(" "), e._l(e.MdTable.items, function (t, i) {
        return n("md-table-head", e._b({
          key: i
        }, "md-table-head", t, !1));
      })], 2)]);
    },
        r = [],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      n(471);
    }

    var r, a, o, s, u, l, d, c, f, h;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(219), a = n.n(r);

    for (o in r) "default" !== o && function (e) {
      n.d(t, e, function () {
        return r[e];
      });
    }(o);

    s = n(472), u = n(0), l = !1, d = i, c = null, f = null, h = u(a.a, s.a, l, d, c, f), t.default = h.exports;
  }, function (e, t) {}, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement,
          n = e._self._c || t;
      return n("transition", {
        attrs: {
          name: "md-table-alternate-header"
        }
      }, [n("div", {
        staticClass: "md-table-alternate-header"
      }, [e._t("default")], 2)]);
    },
        r = [],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t) {}, function (e, t) {}, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement,
          n = e._self._c || t;
      return e.mdSelectable ? n("td", {
        staticClass: "md-table-cell md-table-cell-selection"
      }, [n("div", {
        staticClass: "md-table-cell-container"
      }, [n("md-checkbox", {
        attrs: {
          disabled: !e.mdSelectable || e.mdDisabled
        },
        on: {
          change: e.onChange
        },
        model: {
          value: e.isSelected,
          callback: function (t) {
            e.isSelected = t;
          },
          expression: "isSelected"
        }
      })], 1)]) : e._e();
    },
        r = [],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement,
          n = e._self._c || t;
      return n("tr", e._g({
        staticClass: "md-table-row",
        class: e.rowClasses,
        on: {
          click: e.onClick
        }
      }, e.$listeners), [e.selectableCount ? n("md-table-cell-selection", {
        attrs: {
          value: e.isMultipleSelected,
          "md-disabled": e.mdDisabled,
          "md-selectable": "multiple" === e.mdSelectable,
          "md-row-id": e.mdIndex
        },
        on: {
          input: function (t) {
            return t ? e.addSelection() : e.removeSelection();
          }
        }
      }) : e._e(), e._v(" "), e._t("default")], 2);
    },
        r = [],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t, n) {
    "use strict";

    var i, r, a, o, s, u, l, d, c, f;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), i = n(224), r = n.n(i);

    for (a in i) "default" !== a && function (e) {
      n.d(t, e, function () {
        return i[e];
      });
    }(a);

    o = n(0), s = null, u = !1, l = null, d = null, c = null, f = o(r.a, s, u, l, d, c), t.default = f.exports;
  }, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement,
          n = e._self._c || t;
      return n("md-tag-switcher", {
        staticClass: "md-table",
        attrs: {
          "md-tag": e.contentTag
        }
      }, [e._t("md-table-toolbar"), e._v(" "), n("keep-alive", [e.$scopedSlots["md-table-alternate-header"] && e.selectedCount ? n("md-table-alternate-header", [e._t("md-table-alternate-header", null, {
        count: e.selectedCount
      })], 2) : e._e()], 1), e._v(" "), e.mdFixedHeader ? n("div", {
        staticClass: "md-table-fixed-header",
        class: e.headerClasses,
        style: e.headerStyles
      }, [n("div", {
        ref: "fixedHeaderContainer",
        staticClass: "md-table-fixed-header-container",
        on: {
          scroll: e.setHeaderScroll
        }
      }, [n("table", {
        style: e.fixedHeaderTableStyles
      }, [n("md-table-thead")], 1)])]) : e._e(), e._v(" "), n("md-content", {
        staticClass: "md-table-content md-scrollbar",
        class: e.contentClasses,
        style: e.contentStyles,
        on: {
          scroll: e.setScroll
        }
      }, [n("table", {
        ref: "contentTable"
      }, [!e.mdFixedHeader && e.$scopedSlots["md-table-row"] ? n("md-table-thead", {
        class: e.headerClasses
      }) : e._e(), e._v(" "), e.$scopedSlots["md-table-row"] ? e.value.length ? n("tbody", e._l(e.value, function (t, i) {
        return n("md-table-row-ghost", {
          key: e.getRowId(t, e.mdModelId),
          attrs: {
            "md-id": e.getRowId(t, e.mdModelId),
            "md-index": i,
            "md-item": t
          }
        }, [e._t("md-table-row", null, {
          item: t,
          index: i
        })], 2);
      }), 1) : e.$scopedSlots["md-table-empty-state"] ? n("tbody", [n("tr", [n("td", {
        attrs: {
          colspan: e.headerCount
        }
      }, [e._t("md-table-empty-state")], 2)])]) : e._e() : n("tbody", [e._t("default")], 2)], 1), e._v(" "), e._t("md-table-pagination")], 2), e._v(" "), !e.hasValue && e.$scopedSlots["md-table-row"] ? e._t("default") : e._e()], 2);
    },
        r = [],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      n(480);
    }

    var r, a, o, s, u, l, d, c, f, h;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(225), a = n.n(r);

    for (o in r) "default" !== o && function (e) {
      n.d(t, e, function () {
        return r[e];
      });
    }(o);

    s = n(481), u = n(0), l = !1, d = i, c = null, f = null, h = u(a.a, s.a, l, d, c, f), t.default = h.exports;
  }, function (e, t) {}, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement;
      return (e._self._c || t)("md-toolbar", {
        staticClass: "md-table-toolbar md-transparent",
        attrs: {
          "md-elevation": 0
        }
      }, [e._t("default")], 2);
    },
        r = [],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      n(483);
    }

    var r, a, o, s, u, l, d, c, f, h;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(228), a = n.n(r);

    for (o in r) "default" !== o && function (e) {
      n.d(t, e, function () {
        return r[e];
      });
    }(o);

    s = n(484), u = n(0), l = !1, d = i, c = null, f = null, h = u(a.a, s.a, l, d, c, f), t.default = h.exports;
  }, function (e, t) {}, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement;
      return (e._self._c || t)("md-empty-state", e._b({
        staticClass: "md-table-empty-state"
      }, "md-empty-state", e.$props, !1), [e._t("default")], 2);
    },
        r = [],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      n(486);
    }

    var r, a, o, s, u, l, d, c, f, h;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(229), a = n.n(r);

    for (o in r) "default" !== o && function (e) {
      n.d(t, e, function () {
        return r[e];
      });
    }(o);

    s = n(487), u = n(0), l = !1, d = i, c = null, f = null, h = u(a.a, s.a, l, d, c, f), t.default = h.exports;
  }, function (e, t) {}, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement,
          n = e._self._c || t;
      return n("td", {
        staticClass: "md-table-cell",
        class: e.cellClasses
      }, [n("div", {
        staticClass: "md-table-cell-container"
      }, [e._t("default")], 2)]);
    },
        r = [],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      n(489);
    }

    var r, a, o, s, u, l, d, c, f, h;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(230), a = n.n(r);

    for (o in r) "default" !== o && function (e) {
      n.d(t, e, function () {
        return r[e];
      });
    }(o);

    s = n(490), u = n(0), l = !1, d = i, c = null, f = null, h = u(a.a, s.a, l, d, c, f), t.default = h.exports;
  }, function (e, t) {}, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement,
          n = e._self._c || t;
      return n("div", {
        staticClass: "md-table-pagination"
      }, [!1 !== e.mdPageOptions ? [n("span", {
        staticClass: "md-table-pagination-label"
      }, [e._v(e._s(e.mdLabel))]), e._v(" "), n("md-field", [n("md-select", {
        attrs: {
          "md-dense": "",
          "md-class": "md-pagination-select"
        },
        on: {
          changed: e.setPageSize
        },
        model: {
          value: e.currentPageSize,
          callback: function (t) {
            e.currentPageSize = t;
          },
          expression: "currentPageSize"
        }
      }, e._l(e.mdPageOptions, function (t) {
        return n("md-option", {
          key: t,
          attrs: {
            value: t
          }
        }, [e._v(e._s(t))]);
      }), 1)], 1)] : e._e(), e._v(" "), n("span", [e._v(e._s(e.currentItemCount) + "-" + e._s(e.currentPageCount) + " " + e._s(e.mdSeparator) + " " + e._s(e.mdTotal))]), e._v(" "), n("md-button", {
        staticClass: "md-icon-button md-table-pagination-previous",
        attrs: {
          disabled: 1 === e.mdPage
        },
        on: {
          click: function (t) {
            return e.goToPrevious();
          }
        }
      }, [n("md-icon", [e._v("keyboard_arrow_left")])], 1), e._v(" "), n("md-button", {
        staticClass: "md-icon-button md-table-pagination-next",
        on: {
          click: function (t) {
            return e.goToNext();
          }
        }
      }, [n("md-icon", [e._v("keyboard_arrow_right")])], 1)], 2);
    },
        r = [],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    var r, a, o, s, u, l;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(3), a = i(r), o = n(492), s = i(o), u = n(495), l = i(u), t.default = function (e) {
      (0, a.default)(e), e.component(s.default.name, s.default), e.component(l.default.name, l.default);
    };
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      n(493);
    }

    var r, a, o, s, u, l, d, c, f, h;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(231), a = n.n(r);

    for (o in r) "default" !== o && function (e) {
      n.d(t, e, function () {
        return r[e];
      });
    }(o);

    s = n(494), u = n(0), l = !1, d = i, c = null, f = null, h = u(a.a, s.a, l, d, c, f), t.default = h.exports;
  }, function (e, t) {}, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement,
          n = e._self._c || t;
      return n("div", {
        staticClass: "md-tabs",
        class: [e.tabsClasses, e.$mdActiveTheme]
      }, [n("div", {
        ref: "navigation",
        staticClass: "md-tabs-navigation",
        class: e.navigationClasses
      }, [e._l(e.MdTabs.items, function (t, i) {
        var r = t.label,
            a = t.props,
            o = t.icon,
            s = t.disabled,
            u = t.data,
            l = t.events;
        return n("md-button", e._g(e._b({
          key: i,
          staticClass: "md-tab-nav-button",
          class: {
            "md-active": !e.mdSyncRoute && i === e.activeTab,
            "md-icon-label": o && r
          },
          attrs: {
            disabled: s
          },
          nativeOn: {
            click: function (t) {
              return e.setActiveTab(i);
            }
          }
        }, "md-button", a, !1), l), [e.$scopedSlots["md-tab"] ? e._t("md-tab", null, {
          tab: {
            label: r,
            icon: o,
            data: u
          }
        }) : [o ? [e.isAssetIcon(o) ? n("md-icon", {
          staticClass: "md-tab-icon",
          attrs: {
            "md-src": o
          }
        }) : n("md-icon", {
          staticClass: "md-tab-icon"
        }, [e._v(e._s(o))]), e._v(" "), n("span", {
          staticClass: "md-tab-label"
        }, [e._v(e._s(r))])] : [e._v(e._s(r))]]], 2);
      }), e._v(" "), n("span", {
        ref: "indicator",
        staticClass: "md-tabs-indicator",
        class: e.indicatorClass,
        style: e.indicatorStyles
      })], 2), e._v(" "), n("md-content", {
        directives: [{
          name: "show",
          rawName: "v-show",
          value: e.hasContent,
          expression: "hasContent"
        }],
        ref: "tabsContent",
        staticClass: "md-tabs-content",
        style: e.contentStyles
      }, [n("div", {
        staticClass: "md-tabs-container",
        style: e.containerStyles
      }, [e._t("default")], 2)])], 1);
    },
        r = [],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t, n) {
    "use strict";

    var i, r, a, o, s, u, l, d, c, f;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), i = n(232), r = n.n(i);

    for (a in i) "default" !== a && function (e) {
      n.d(t, e, function () {
        return i[e];
      });
    }(a);

    o = n(0), s = null, u = !1, l = null, d = null, c = null, f = o(r.a, s, u, l, d, c), t.default = f.exports;
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    var r, a, o, s;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(3), a = i(r), o = n(111), s = i(o), t.default = function (e) {
      (0, a.default)(e), e.component(s.default.name, s.default);
    };
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    var r, a, o, s;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(3), a = i(r), o = n(498), s = i(o), t.default = function (e) {
      (0, a.default)(e), e.component(s.default.name, s.default);
    };
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      n(499);
    }

    var r, a, o, s, u, l, d, c, f, h;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(233), a = n.n(r);

    for (o in r) "default" !== o && function (e) {
      n.d(t, e, function () {
        return r[e];
      });
    }(o);

    s = n(500), u = n(0), l = !1, d = i, c = null, f = null, h = u(a.a, s.a, l, d, c, f), t.default = h.exports;
  }, function (e, t) {}, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement,
          n = e._self._c || t;
      return n("md-popover", {
        attrs: {
          "md-settings": e.popperSettings,
          "md-active": e.shouldRender
        }
      }, [e.shouldRender ? n("transition", {
        attrs: {
          name: "md-tooltip"
        }
      }, [n("div", {
        staticClass: "md-tooltip",
        class: [e.tooltipClasses, e.$mdActiveTheme],
        style: e.tooltipStyles
      }, [e._t("default")], 2)]) : e._e()], 1);
    },
        r = [],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t, n) {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = {
      name: "MdDialogAlert",
      props: {
        mdTitle: String,
        mdContent: String,
        mdConfirmText: {
          type: String,
          default: "Ok"
        }
      }
    };
  }, function (e, t, n) {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = {
      name: "MdDialogConfirm",
      props: {
        mdTitle: String,
        mdContent: String,
        mdConfirmText: {
          type: String,
          default: "Ok"
        },
        mdCancelText: {
          type: String,
          default: "Cancel"
        }
      },
      methods: {
        onCancel: function () {
          this.$emit("md-cancel"), this.$emit("update:mdActive", !1);
        },
        onConfirm: function () {
          this.$emit("md-confirm"), this.$emit("update:mdActive", !1);
        }
      }
    };
  }, function (e, t, n) {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = {
      name: "MdDialogPrompt",
      props: {
        value: {},
        mdTitle: String,
        mdInputName: String,
        mdInputId: String,
        mdInputMaxlength: [String, Number],
        mdInputPlaceholder: [String, Number],
        mdContent: String,
        mdConfirmText: {
          type: String,
          default: "Ok"
        },
        mdCancelText: {
          type: String,
          default: "Cancel"
        }
      },
      data: function () {
        return {
          inputValue: null
        };
      },
      watch: {
        value: function () {
          this.inputValue = this.value;
        }
      },
      methods: {
        onCancel: function () {
          this.$emit("md-cancel"), this.$emit("update:mdActive", !1);
        },
        onConfirm: function () {
          this.$emit("input", this.inputValue), this.$emit("md-confirm", this.inputValue), this.$emit("update:mdActive", !1);
        },
        setInputFocus: function () {
          var e = this;
          window.setTimeout(function () {
            e.$refs.input.$el.focus();
          }, 50);
        }
      },
      created: function () {
        this.inputValue = this.value;
      }
    };
  }, function (e, t, n) {
    e.exports = n(505);
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    var r, a, o, s, u, l, d, c, f, h, m, p, v, b, g, y, M, _, w, S, C, x, O, T, P, D, j, k, $, E, A, I, F, B, L, R, N, H, V, q, z, U, W, Y, X, G, Q, K, J, Z, ee, te, ne, ie, re, ae, oe, se, ue, le, de, ce, fe, he, me, pe, ve, be, ge, ye, Me, _e, we, Se, Ce, xe;

    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.MdTooltip = t.MdToolbar = t.MdTabs = t.MdTable = t.MdSwitch = t.MdSubheader = t.MdSteppers = t.MdSpeedDial = t.MdSnackbar = t.MdRipple = t.MdRadio = t.MdProgress = t.MdMenu = t.MdList = t.MdLayout = t.MdImage = t.MdIcon = t.MdHighlightText = t.MdField = t.MdEmptyState = t.MdElevation = t.MdDrawer = t.MdDivider = t.MdDialogPrompt = t.MdDialogConfirm = t.MdDialogAlert = t.MdDialog = t.MdDatepicker = t.MdContent = t.MdChips = t.MdCheckbox = t.MdCard = t.MdButton = t.MdBottomBar = t.MdAvatar = t.MdAutocomplete = t.MdApp = t.MdBadge = void 0, r = n(234), a = i(r), o = n(253), s = i(o), u = n(260), l = i(u), d = n(266), c = i(d), f = n(270), h = i(f), m = n(276), p = i(m), v = n(277), b = i(v), g = n(312), y = i(g), M = n(316), _ = i(M), w = n(323), S = i(w), C = n(324), x = i(C), O = n(352), T = i(O), P = n(506), D = i(P), j = n(509), k = i(j), $ = n(512), E = i($), A = n(362), I = i(A), F = n(366), B = i(F), L = n(370), R = i(L), N = n(372), H = i(N), V = n(373), q = i(V), z = n(393), U = i(z), W = n(106), Y = i(W), X = n(396), G = i(X), Q = n(400), K = i(Q), J = n(402), Z = i(J), ee = n(403), te = i(ee), ne = n(406), ie = i(ne), re = n(413), ae = i(re), oe = n(417), se = i(oe), ue = n(418), le = i(ue), de = n(425), ce = i(de), fe = n(435), he = i(fe), me = n(449), pe = i(me), ve = n(453), be = i(ve), ge = n(457), ye = i(ge), Me = n(491), _e = i(Me), we = n(496), Se = i(we), Ce = n(497), xe = i(Ce), t.MdBadge = s.default, t.MdApp = a.default, t.MdAutocomplete = l.default, t.MdAvatar = c.default, t.MdBottomBar = h.default, t.MdButton = p.default, t.MdCard = b.default, t.MdCheckbox = y.default, t.MdChips = _.default, t.MdContent = S.default, t.MdDatepicker = x.default, t.MdDialog = T.default, t.MdDialogAlert = D.default, t.MdDialogConfirm = k.default, t.MdDialogPrompt = E.default, t.MdDivider = I.default, t.MdDrawer = B.default, t.MdElevation = R.default, t.MdEmptyState = H.default, t.MdField = q.default, t.MdHighlightText = U.default, t.MdIcon = Y.default, t.MdImage = G.default, t.MdLayout = K.default, t.MdList = Z.default, t.MdMenu = te.default, t.MdProgress = ie.default, t.MdRadio = ae.default, t.MdRipple = se.default, t.MdSnackbar = le.default, t.MdSpeedDial = ce.default, t.MdSteppers = he.default, t.MdSubheader = pe.default, t.MdSwitch = be.default, t.MdTable = ye.default, t.MdTabs = _e.default, t.MdToolbar = Se.default, t.MdTooltip = xe.default;
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    var r, a, o, s, u, l;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(3), a = i(r), o = n(68), s = i(o), u = n(507), l = i(u), t.default = function (e) {
      (0, a.default)(e), e.component(s.default.name, s.default), e.component(l.default.name, l.default);
    };
  }, function (e, t, n) {
    "use strict";

    var i, r, a, o, s, u, l, d, c, f;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), i = n(501), r = n.n(i);

    for (a in i) "default" !== a && function (e) {
      n.d(t, e, function () {
        return i[e];
      });
    }(a);

    o = n(508), s = n(0), u = !1, l = null, d = null, c = null, f = s(r.a, o.a, u, l, d, c), t.default = f.exports;
  }, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement,
          n = e._self._c || t;
      return n("md-dialog", e._g(e._b({
        attrs: {
          "md-fullscreen": !1
        }
      }, "md-dialog", e.$attrs, !1), e.$listeners), [e.mdTitle ? n("md-dialog-title", [e._v(e._s(e.mdTitle))]) : e._e(), e._v(" "), e.mdContent ? n("md-dialog-content", {
        domProps: {
          innerHTML: e._s(e.mdContent)
        }
      }) : e._e(), e._v(" "), n("md-dialog-actions", [n("md-button", {
        staticClass: "md-primary",
        on: {
          click: function (t) {
            return e.$emit("update:mdActive", !1);
          }
        }
      }, [e._v(e._s(e.mdConfirmText))])], 1)], 1);
    },
        r = [],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    var r, a, o, s, u, l;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(3), a = i(r), o = n(68), s = i(o), u = n(510), l = i(u), t.default = function (e) {
      (0, a.default)(e), e.component(s.default.name, s.default), e.component(l.default.name, l.default);
    };
  }, function (e, t, n) {
    "use strict";

    var i, r, a, o, s, u, l, d, c, f;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), i = n(502), r = n.n(i);

    for (a in i) "default" !== a && function (e) {
      n.d(t, e, function () {
        return i[e];
      });
    }(a);

    o = n(511), s = n(0), u = !1, l = null, d = null, c = null, f = s(r.a, o.a, u, l, d, c), t.default = f.exports;
  }, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement,
          n = e._self._c || t;
      return n("md-dialog", e._g(e._b({
        attrs: {
          "md-fullscreen": !1
        }
      }, "md-dialog", e.$attrs, !1), e.$listeners), [e.mdTitle ? n("md-dialog-title", [e._v(e._s(e.mdTitle))]) : e._e(), e._v(" "), e.mdContent ? n("md-dialog-content", {
        domProps: {
          innerHTML: e._s(e.mdContent)
        }
      }) : e._e(), e._v(" "), n("md-dialog-actions", [n("md-button", {
        on: {
          click: e.onCancel
        }
      }, [e._v(e._s(e.mdCancelText))]), e._v(" "), n("md-button", {
        staticClass: "md-primary",
        on: {
          click: e.onConfirm
        }
      }, [e._v(e._s(e.mdConfirmText))])], 1)], 1);
    },
        r = [],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }, function (e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    var r, a, o, s, u, l;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), r = n(3), a = i(r), o = n(68), s = i(o), u = n(513), l = i(u), t.default = function (e) {
      (0, a.default)(e), e.component(s.default.name, s.default), e.component(l.default.name, l.default);
    };
  }, function (e, t, n) {
    "use strict";

    var i, r, a, o, s, u, l, d, c, f;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), i = n(503), r = n.n(i);

    for (a in i) "default" !== a && function (e) {
      n.d(t, e, function () {
        return i[e];
      });
    }(a);

    o = n(514), s = n(0), u = !1, l = null, d = null, c = null, f = s(r.a, o.a, u, l, d, c), t.default = f.exports;
  }, function (e, t, n) {
    "use strict";

    var i = function () {
      var e = this,
          t = e.$createElement,
          n = e._self._c || t;
      return n("md-dialog", e._b({
        attrs: {
          "md-fullscreen": !1
        },
        on: {
          "md-opened": e.setInputFocus
        }
      }, "md-dialog", e.$attrs, !1), [e.mdTitle ? n("md-dialog-title", [e._v(e._s(e.mdTitle))]) : e._e(), e._v(" "), e.mdContent ? n("md-dialog-content", {
        domProps: {
          innerHTML: e._s(e.mdContent)
        }
      }) : e._e(), e._v(" "), n("md-dialog-content", [n("md-field", [n("md-input", {
        ref: "input",
        attrs: {
          id: e.mdInputId,
          name: e.mdInputName,
          maxlength: e.mdInputMaxlength,
          placeholder: e.mdInputPlaceholder
        },
        nativeOn: {
          keydown: function (t) {
            return !t.type.indexOf("key") && e._k(t.keyCode, "enter", 13, t.key, "Enter") ? null : e.onConfirm(t);
          }
        },
        model: {
          value: e.inputValue,
          callback: function (t) {
            e.inputValue = t;
          },
          expression: "inputValue"
        }
      })], 1)], 1), e._v(" "), n("md-dialog-actions", [n("md-button", {
        staticClass: "md-primary",
        on: {
          click: e.onCancel
        }
      }, [e._v(e._s(e.mdCancelText))]), e._v(" "), n("md-button", {
        staticClass: "md-primary",
        on: {
          click: e.onConfirm
        }
      }, [e._v(e._s(e.mdConfirmText))])], 1)], 1);
    },
        r = [],
        a = {
      render: i,
      staticRenderFns: r
    };

    t.a = a;
  }]);
});
},{"vue":"../node_modules/vue/dist/vue.runtime.esm.js"}],"../node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"../node_modules/vue-material/dist/vue-material.min.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../node_modules/vue-material/dist/theme/default.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../all-stars.json":[function(require,module,exports) {
module.exports = {
  "lastUpdateTimestamp": 1572016207124,
  "allStars": [["王子", [["▇ ランク", 1, 553, 741], ["▇ ミッション", 309, 552, 762], ["▇ 大総力戦", 554, 600, 642, 701, 757]]], ["アンナ", [188, 352, 437, 541, 606]], ["コラボ", [["▇ アルスラーン戦記【©講談社】　(2017/07)", 497, 498, 499, 501], ["▇ ランス10-決戦-【©ALICESOFT】　(2018/02)", 581], ["▇ 真・恋姫†夢想-革命【©BaseSon/NEXTON】　(2018/07) (2019/08)", ["▼ 第一回：孫呉の血脈(2018/07)", 648, 650, 651, 649, 652], ["▼ 第二回：劉旗の大望(2019/08)", 812, 814, 815, 813, 816]], ["▇ 七つの大罪【©講談社】　(2018/10)", 684, 685, 686, 687, 688], ["▇ 封緘のグラセスタ【©エウシュリー】　(2018/12)", 719, 720], ["▇ ガールズ・ブック・メイカー【©ユメミル/NEXTON】　(2019/6)", 787, 788, 789, 790]]], ["節分", [["▇ お正月(1月)", ["▼ 2017", 438, 439], ["▼ 2018", 573, 574, 575], ["▼ 2019", 730, 731, 729]], ["▇ バレンタイン(2~3月)", ["▼ 2018", 589, 590, 591], ["▼ 2019", 744, 742, 743]], ["▇ 学園(3~4月)", ["▼ 2018", 609, 610, 611], ["▼ 2019", 766, 765, 763, 764]], ["▇ ジューンブライド(6~7月)", ["▼ 2018", 639, 640], ["▼ 2019", 793, 794, 795]], ["▇ サマー(7~8月)", ["▼ 2017", 519, 506, 517, 518, 524], ["▼ 2018", 657, 646, 658], ["▼ 2019", 799, 800, 801, 802, 803, 804, 805, 819, 820, 806, 821]], ["▇ ハロウィン(10~11月)", ["▼ 2018", 682, 681], ["▼ 2019", 836, 837, 838]], ["▇ 聖夜(12~1月)", ["▼ 2016", 432], ["▼ 2017", 556, 557, 565], ["▼ 2018", 725, 724, 726]]]], ["ちび", [["▇ 名声", 534, 535, 545, 546, 559, 560, 576, 577, 584, 585, 597, 598, 612, 613, 619, 620, 627, 626, 631, 632, 654, 655, 665, 666, 673, 674, 689, 690, 714, 715, 732, 733, 745, 746, 755, 756, 768, 767, 777, 778, 785, 786, 797, 796, 810, 811, 823, 824, 834, 835], ["▇ イベント", 703, 818]]], ["帝国(ボリス、サファイアを除く)", [["▇ 皇帝", 418], ["▇ 女性", 427, 429, 430, 465, 526, 527, 624, 711, 773, 286, 305, 412, 428, 464, 530, 566, 622, 623, 709, 311, 371, 373, 426, 463, 528, 710, 774, 775, 423, 621, 462, 708, 776, 420, 529, 461], ["▇ 男性", 388, 424, 425, 772, 348, 422, 419, 421, 287]]], ["サファイア", [168, 191, 216, 233, 260, 262, 273, 280, 322, 347, 356, 387, 393, 402, 417, 443, 452, 466, 531, 540, 595, 628, 751]], ["ブラック(女性)(近接)", [22, 39, 46, 52, 90, 99, 106, 115, 146, 187, 201, 209, 213, 223, 244, 251, 261, 271, 288, 297, 306, 323, 325, 339, 346, 358, 386, 389, 401, 403, 435, 442, 451, 476, 487, 511, 522, 523, 539, 549, 550, 564, 572, 582, 607, 616, 617, 630, 679, 699, 713, 717, 718, 752, 761, 784, 822, 832]], ["ブラック(女性)(遠距離)", [17, 29, 49, 91, 130, 158, 181, 219, 232, 240, 245, 298, 329, 336, 351, 357, 362, 376, 391, 392, 408, 436, 450, 458, 486, 496, 536, 538, 555, 571, 594, 662, 675, 704, 716, 740]], ["ブラック(男性)(近接)", [80, 308]], ["ブラック(男性)(遠距離)", [["N/A"]]], ["プラチナ(女性)(近接)", [20, 27, 37, 47, 51, 81, 84, 89, 92, 93, 94, 101, 105, 107, 111, 121, 122, 125, 128, 137, 145, 149, 152, 160, 162, 163, 164, 176, 177, 179, 182, 185, 193, 200, 207, 211, 214, 222, 224, 239, 243, 246, 248, 252, 255, 259, 265, 268, 285, 292, 294, 304, 307, 313, 315, 317, 324, 326, 327, 337, 340, 341, 344, 354, 365, 368, 372, 380, 382, 396, 405, 409, 413, 440, 445, 446, 448, 449, 457, 470, 474, 480, 481, 493, 505, 507, 510, 521, 525, 532, 547, 548, 551, 579, 580, 586, 587, 593, 599, 603, 605, 615, 629, 633, 634, 635, 638, 644, 645, 663, 672, 702, 705, 712, 736, 738, 739, 750, 753, 754, 758, 759, 769, 770, 771, 779, 782, 783, 791, 792, 798, 807, 808, 809, 825, 829, 833, 839]], ["プラチナ(女性)(遠距離)", [18, 28, 32, 33, 34, 76, 79, 86, 88, 98, 100, 104, 108, 113, 120, 127, 134, 138, 143, 151, 154, 155, 157, 161, 171, 178, 183, 184, 186, 195, 198, 212, 218, 221, 225, 227, 247, 253, 258, 264, 266, 267, 272, 275, 281, 289, 291, 316, 328, 332, 343, 355, 359, 364, 370, 375, 378, 381, 390, 398, 400, 404, 410, 414, 441, 453, 454, 471, 472, 477, 492, 502, 544, 558, 592, 602, 614, 618, 636, 647, 656, 659, 661, 667, 670, 678, 691, 698, 723, 735, 737, 747, 748, 760, 780, 781, 817, 826, 827, 830, 831]], ["プラチナ(男性)(近接)", [62, 83, 367]], ["プラチナ(男性)(遠距離)", [116, 366]], ["ゴールド(女性)(近接)", [26, 35, 38, 41, 53, 75, 114, 131, 132, 148, 156, 159, 202, 208, 217, 249, 256, 314, 342, 374, 395]], ["ゴールド(女性)(遠距離)", [16, 30, 31, 45, 48, 78, 87, 110, 142, 165, 180, 197, 199, 203, 228, 231, 254, 257, 276, 330, 350, 749, 828]], ["ゴールド(男性)(近接)", [7, 9, 61, 102, 112, 175, 241, 360, 385, 479, 625]], ["ゴールド(男性)(遠距離)", [13, 63, 82, 103, 109]], ["シルバー(女性)(近接)", [19, 21, 25, 36, 40, 50, 117, 139, 172, 206, 215, 242, 274, 282, 299, 300, 310, 361, 490, 671]], ["シルバー(女性)(遠距離)", [23, 24, 42, 43, 44, 129, 135, 150, 174, 192, 235, 283, 295, 296, 338, 434, 596]], ["シルバー(男性)(近接)", [8, 10, 14, 15, 96, 126, 153, 173, 204, 205, 237, 345, 369]], ["シルバー(男性)(遠距離)", [12, 85, 118, 123, 238]], ["ブロンズ(近接)", [3, 68, 72, 74, 95, 119, 140, 170, 236]], ["ブロンズ(遠距離)", [5, 11, 73, 124, 284, 302, 407]], ["アイアン(近接)", [4, 6, 64, 65, 67, 69, 141, 147, 169]], ["アイアン(遠距離)", [2, 66, 70, 71, 144, 301]]]
};
},{}],"utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDiffList = getDiffList;
exports.accDiffList = accDiffList;
exports.encode = encode;
exports.decode = decode;
exports.parseHex = exports.toHex = exports.last = exports.divmod = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var divmod = function divmod(x, y) {
  return [Math.floor(x / y), x % y];
};

exports.divmod = divmod;

var last = function last(a) {
  return a.length ? a[a.length - 1] : null;
};

exports.last = last;

var toHex = function toHex(n) {
  return n.toString(16);
};

exports.toHex = toHex;

var parseHex = function parseHex(s) {
  return parseInt(s, 16);
};

exports.parseHex = parseHex;

function getDiffList(a) {
  return a.slice(1).reduce(function (prev, curr, idx) {
    prev.push(curr - a[idx]);
    return prev;
  }, []);
}

function accDiffList(p, a) {
  return a.reduce(function (prev, curr) {
    prev.push(last(prev) + curr);
    return prev;
  }, [p]);
}

function encode(ownedSet) {
  if (!ownedSet.size) {
    return '';
  }

  var owned = _toConsumableArray(ownedSet).sort(function (a, b) {
    return a - b;
  });

  var pivot = owned.shift();

  var saved = _defineProperty({}, pivot, [pivot]);

  while (owned.length) {
    var first = owned.shift();

    if (first - last(saved[pivot]) < 16) {
      saved[pivot].push(first);
    } else {
      saved[first] = [first];
      pivot = first;
    }
  }

  return Object.values(saved).map(function (a) {
    var diff = getDiffList(a).map(toHex).join('');
    return diff ? "".concat(a[0], ".").concat(diff) : String(a[0]);
  }).join('|');
}

function decode(decoded) {
  if (!decoded) {
    return [];
  }

  return decoded.split('|').map(function (g) {
    var t = g.split('.');
    return t[1] ? accDiffList(Number(t[0]), t[1].split('').map(parseHex)) : [Number(t[0])];
  }).reduce(function (prev, curr) {
    return prev.concat(curr);
  });
}
},{}],"../icon_groups/g0.png":[function(require,module,exports) {
module.exports = "/g0.409b6ec0.png";
},{}],"../icon_groups/g1.png":[function(require,module,exports) {
module.exports = "/g1.9db998d5.png";
},{}],"../icon_groups/g2.png":[function(require,module,exports) {
module.exports = "/g2.23cf9cd9.png";
},{}],"../icon_groups/g3.png":[function(require,module,exports) {
module.exports = "/g3.5b004571.png";
},{}],"../icon_groups/g4.png":[function(require,module,exports) {
module.exports = "/g4.576d6b9c.png";
},{}],"../icon_groups/g5.png":[function(require,module,exports) {
module.exports = "/g5.62c078e7.png";
},{}],"../icon_groups/g6.png":[function(require,module,exports) {
module.exports = "/g6.3f03a6e6.png";
},{}],"../icon_groups/g7.png":[function(require,module,exports) {
module.exports = "/g7.d7971cf9.png";
},{}],"../icon_groups/g8.png":[function(require,module,exports) {
module.exports = "/g8.9595fd0e.png";
},{}],"../icon_groups/*.png":[function(require,module,exports) {
module.exports = {
  "g0": require("./g0.png"),
  "g1": require("./g1.png"),
  "g2": require("./g2.png"),
  "g3": require("./g3.png"),
  "g4": require("./g4.png"),
  "g5": require("./g5.png"),
  "g6": require("./g6.png"),
  "g7": require("./g7.png"),
  "g8": require("./g8.png")
};
},{"./g0.png":"../icon_groups/g0.png","./g1.png":"../icon_groups/g1.png","./g2.png":"../icon_groups/g2.png","./g3.png":"../icon_groups/g3.png","./g4.png":"../icon_groups/g4.png","./g5.png":"../icon_groups/g5.png","./g6.png":"../icon_groups/g6.png","./g7.png":"../icon_groups/g7.png","./g8.png":"../icon_groups/g8.png"}],"../node_modules/vue-hot-reload-api/dist/index.js":[function(require,module,exports) {
var Vue // late bind
var version
var map = Object.create(null)
if (typeof window !== 'undefined') {
  window.__VUE_HOT_MAP__ = map
}
var installed = false
var isBrowserify = false
var initHookName = 'beforeCreate'

exports.install = function (vue, browserify) {
  if (installed) { return }
  installed = true

  Vue = vue.__esModule ? vue.default : vue
  version = Vue.version.split('.').map(Number)
  isBrowserify = browserify

  // compat with < 2.0.0-alpha.7
  if (Vue.config._lifecycleHooks.indexOf('init') > -1) {
    initHookName = 'init'
  }

  exports.compatible = version[0] >= 2
  if (!exports.compatible) {
    console.warn(
      '[HMR] You are using a version of vue-hot-reload-api that is ' +
        'only compatible with Vue.js core ^2.0.0.'
    )
    return
  }
}

/**
 * Create a record for a hot module, which keeps track of its constructor
 * and instances
 *
 * @param {String} id
 * @param {Object} options
 */

exports.createRecord = function (id, options) {
  if(map[id]) { return }

  var Ctor = null
  if (typeof options === 'function') {
    Ctor = options
    options = Ctor.options
  }
  makeOptionsHot(id, options)
  map[id] = {
    Ctor: Ctor,
    options: options,
    instances: []
  }
}

/**
 * Check if module is recorded
 *
 * @param {String} id
 */

exports.isRecorded = function (id) {
  return typeof map[id] !== 'undefined'
}

/**
 * Make a Component options object hot.
 *
 * @param {String} id
 * @param {Object} options
 */

function makeOptionsHot(id, options) {
  if (options.functional) {
    var render = options.render
    options.render = function (h, ctx) {
      var instances = map[id].instances
      if (ctx && instances.indexOf(ctx.parent) < 0) {
        instances.push(ctx.parent)
      }
      return render(h, ctx)
    }
  } else {
    injectHook(options, initHookName, function() {
      var record = map[id]
      if (!record.Ctor) {
        record.Ctor = this.constructor
      }
      record.instances.push(this)
    })
    injectHook(options, 'beforeDestroy', function() {
      var instances = map[id].instances
      instances.splice(instances.indexOf(this), 1)
    })
  }
}

/**
 * Inject a hook to a hot reloadable component so that
 * we can keep track of it.
 *
 * @param {Object} options
 * @param {String} name
 * @param {Function} hook
 */

function injectHook(options, name, hook) {
  var existing = options[name]
  options[name] = existing
    ? Array.isArray(existing) ? existing.concat(hook) : [existing, hook]
    : [hook]
}

function tryWrap(fn) {
  return function (id, arg) {
    try {
      fn(id, arg)
    } catch (e) {
      console.error(e)
      console.warn(
        'Something went wrong during Vue component hot-reload. Full reload required.'
      )
    }
  }
}

function updateOptions (oldOptions, newOptions) {
  for (var key in oldOptions) {
    if (!(key in newOptions)) {
      delete oldOptions[key]
    }
  }
  for (var key$1 in newOptions) {
    oldOptions[key$1] = newOptions[key$1]
  }
}

exports.rerender = tryWrap(function (id, options) {
  var record = map[id]
  if (!options) {
    record.instances.slice().forEach(function (instance) {
      instance.$forceUpdate()
    })
    return
  }
  if (typeof options === 'function') {
    options = options.options
  }
  if (record.Ctor) {
    record.Ctor.options.render = options.render
    record.Ctor.options.staticRenderFns = options.staticRenderFns
    record.instances.slice().forEach(function (instance) {
      instance.$options.render = options.render
      instance.$options.staticRenderFns = options.staticRenderFns
      // reset static trees
      // pre 2.5, all static trees are cached together on the instance
      if (instance._staticTrees) {
        instance._staticTrees = []
      }
      // 2.5.0
      if (Array.isArray(record.Ctor.options.cached)) {
        record.Ctor.options.cached = []
      }
      // 2.5.3
      if (Array.isArray(instance.$options.cached)) {
        instance.$options.cached = []
      }

      // post 2.5.4: v-once trees are cached on instance._staticTrees.
      // Pure static trees are cached on the staticRenderFns array
      // (both already reset above)

      // 2.6: temporarily mark rendered scoped slots as unstable so that
      // child components can be forced to update
      var restore = patchScopedSlots(instance)
      instance.$forceUpdate()
      instance.$nextTick(restore)
    })
  } else {
    // functional or no instance created yet
    record.options.render = options.render
    record.options.staticRenderFns = options.staticRenderFns

    // handle functional component re-render
    if (record.options.functional) {
      // rerender with full options
      if (Object.keys(options).length > 2) {
        updateOptions(record.options, options)
      } else {
        // template-only rerender.
        // need to inject the style injection code for CSS modules
        // to work properly.
        var injectStyles = record.options._injectStyles
        if (injectStyles) {
          var render = options.render
          record.options.render = function (h, ctx) {
            injectStyles.call(ctx)
            return render(h, ctx)
          }
        }
      }
      record.options._Ctor = null
      // 2.5.3
      if (Array.isArray(record.options.cached)) {
        record.options.cached = []
      }
      record.instances.slice().forEach(function (instance) {
        instance.$forceUpdate()
      })
    }
  }
})

exports.reload = tryWrap(function (id, options) {
  var record = map[id]
  if (options) {
    if (typeof options === 'function') {
      options = options.options
    }
    makeOptionsHot(id, options)
    if (record.Ctor) {
      if (version[1] < 2) {
        // preserve pre 2.2 behavior for global mixin handling
        record.Ctor.extendOptions = options
      }
      var newCtor = record.Ctor.super.extend(options)
      // prevent record.options._Ctor from being overwritten accidentally
      newCtor.options._Ctor = record.options._Ctor
      record.Ctor.options = newCtor.options
      record.Ctor.cid = newCtor.cid
      record.Ctor.prototype = newCtor.prototype
      if (newCtor.release) {
        // temporary global mixin strategy used in < 2.0.0-alpha.6
        newCtor.release()
      }
    } else {
      updateOptions(record.options, options)
    }
  }
  record.instances.slice().forEach(function (instance) {
    if (instance.$vnode && instance.$vnode.context) {
      instance.$vnode.context.$forceUpdate()
    } else {
      console.warn(
        'Root or manually mounted instance modified. Full reload required.'
      )
    }
  })
})

// 2.6 optimizes template-compiled scoped slots and skips updates if child
// only uses scoped slots. We need to patch the scoped slots resolving helper
// to temporarily mark all scoped slots as unstable in order to force child
// updates.
function patchScopedSlots (instance) {
  if (!instance._u) { return }
  // https://github.com/vuejs/vue/blob/dev/src/core/instance/render-helpers/resolve-scoped-slots.js
  var original = instance._u
  instance._u = function (slots) {
    try {
      // 2.6.4 ~ 2.6.6
      return original(slots, true)
    } catch (e) {
      // 2.5 / >= 2.6.7
      return original(slots, null, true)
    }
  }
  return function () {
    instance._u = original
  }
}

},{}],"icon.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ = _interopRequireDefault(require("../icon_groups/*.png"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _default = {
  props: {
    id: {
      type: Number,
      default: 0
    },
    ownedSet: {
      type: Set,
      default: function _default() {
        return new Set();
      }
    }
  },
  computed: {
    style: function style() {
      var _divmod = (0, _utils.divmod)(this.id, 10),
          _divmod2 = _slicedToArray(_divmod, 2),
          t = _divmod2[0],
          y = _divmod2[1];

      var _divmod3 = (0, _utils.divmod)(t, 10),
          _divmod4 = _slicedToArray(_divmod3, 2),
          g = _divmod4[0],
          x = _divmod4[1];

      return {
        backgroundImage: "url(".concat(_.default["g".concat(g)], ")"),
        backgroundPosition: "-".concat(y * 50, "px -").concat(x * 50, "px")
      };
    },
    className: function className() {
      return {
        'owned': this.ownedSet.has(this.id)
      };
    }
  },
  methods: {
    toggleOwned: function toggleOwned() {
      console.log('toggleOwned');

      if (this.ownedSet.has(this.id)) {
        console.log('toggleOwned:delete-id');
        this.$emit('delete-id', this.id);
      } else {
        console.log('toggleOwned:add-id');
        this.$emit('add-id', this.id);
      }
    }
  }
};
exports.default = _default;
        var $6b0b55 = exports.default || module.exports;
      
      if (typeof $6b0b55 === 'function') {
        $6b0b55 = $6b0b55.options;
      }
    
        /* template */
        Object.assign($6b0b55, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("a", {
    staticClass: "icon",
    class: _vm.className,
    style: _vm.style,
    attrs: { "data-id": _vm.id },
    on: {
      "&click": function($event) {
        if (
          !$event.type.indexOf("key") &&
          _vm._k($event.keyCode, "left", 37, $event.key, ["Left", "ArrowLeft"])
        ) {
          return null
        }
        if ("button" in $event && $event.button !== 0) {
          return null
        }
        return _vm.toggleOwned($event)
      }
    }
  })
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: "data-v-6b0b55",
            functional: undefined
          };
        })());
      
    /* hot reload */
    (function () {
      if (module.hot) {
        var api = require('vue-hot-reload-api');
        api.install(require('vue'));
        if (api.compatible) {
          module.hot.accept();
          if (!module.hot.data) {
            api.createRecord('$6b0b55', $6b0b55);
          } else {
            api.reload('$6b0b55', $6b0b55);
          }
        }

        
        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
      }
    })();
},{"../icon_groups/*.png":"../icon_groups/*.png","./utils":"utils.js","_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js","vue-hot-reload-api":"../node_modules/vue-hot-reload-api/dist/index.js","vue":"../node_modules/vue/dist/vue.runtime.esm.js"}],"index.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _allStars = require("../all-stars.json");

var _utils = require("./utils");

var _icon = _interopRequireDefault(require("./icon.vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var STORAGE_KEY = 'owned';
var _default = {
  components: {
    Icon: _icon.default
  },
  data: function data() {
    return {
      allStars: _allStars.allStars,
      lastUpdateTimestamp: _allStars.lastUpdateTimestamp,
      owned: new Set(),
      promptActive: false,
      exportSuccessfulActive: false,
      exportFailedActive: false,
      importValue: '',
      copyTextArea: ''
    };
  },
  computed: {
    totalCount: function totalCount() {
      return this.allStars.flat(Infinity).filter(Number).length;
    },
    ownedCount: function ownedCount() {
      return this.owned.size;
    },
    ownedRate: function ownedRate() {
      return (this.ownedCount * 100 / this.totalCount).toFixed(2);
    },
    encodedOwned: function encodedOwned() {
      return (0, _utils.encode)(this.owned);
    },
    lastUpdateTime: function lastUpdateTime() {
      return new Date(this.lastUpdateTimestamp).toLocaleString(this.$i18n.locale);
    }
  },
  mounted: function mounted() {
    this.loadFromLocal();
    this.saveToLocal();
  },
  methods: {
    addId: function addId(id) {
      this.owned.add(id);
      this.owned = new Set(this.owned);
      this.saveToLocal();
    },
    deleteId: function deleteId(id) {
      this.owned.delete(id);
      this.owned = new Set(this.owned);
      this.saveToLocal();
    },
    saveToLocal: function saveToLocal() {
      localStorage.setItem(STORAGE_KEY, this.encodedOwned);
    },
    loadFromLocal: function loadFromLocal() {
      var stored = localStorage.getItem(STORAGE_KEY) || '';
      this.owned = new Set((0, _utils.decode)(stored));
    },
    exportData: function exportData() {
      var _this = this;

      var resolve = function resolve() {
        _this.exportSuccessfulActive = true;
      };

      var reject = function reject() {
        _this.exportFailedActive = true;
        _this.copyTextArea = _this.encodedOwned;
      };

      this.$copyText(this.encodedOwned).then(resolve, reject);
    },
    importData: function importData() {
      this.owned = new Set((0, _utils.decode)(this.importValue));
      this.importValue = '';
      this.saveToLocal();
    },
    cleanup: function cleanup() {
      this.owned = new Set();
      this.saveToLocal();
    }
  }
};
exports.default = _default;
        var $9938e2 = exports.default || module.exports;
      
      if (typeof $9938e2 === 'function') {
        $9938e2 = $9938e2.options;
      }
    
        /* template */
        Object.assign($9938e2, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { attrs: { id: "app" } },
    [
      _c(
        "md-toolbar",
        { staticClass: "title-bar md-medium", attrs: { "md-elevation": "1" } },
        [
          _c("div", { staticClass: "md-toolbar-row" }, [
            _c("h3", { staticClass: "md-title" }, [
              _vm._v("\n        所有率: "),
              _c("span", [_vm._v(_vm._s(_vm.ownedRate))]),
              _vm._v(
                "％（" +
                  _vm._s(_vm.ownedCount) +
                  "/" +
                  _vm._s(_vm.totalCount) +
                  "）\n      "
              )
            ])
          ]),
          _vm._v(" "),
          _c(
            "md-button",
            {
              staticClass: "export md-raised md-primary",
              attrs: { disabled: !_vm.encodedOwned.length },
              on: { click: _vm.exportData }
            },
            [_vm._v("\n      " + _vm._s(_vm.$t("export")) + "\n    ")]
          ),
          _vm._v(" "),
          _c(
            "md-button",
            {
              staticClass: "import md-raised md-primary",
              on: {
                click: function($event) {
                  _vm.promptActive = true
                }
              }
            },
            [_vm._v("\n      " + _vm._s(_vm.$t("import")) + "\n    ")]
          ),
          _vm._v(" "),
          _c(
            "md-button",
            {
              staticClass: "clear md-raised md-accent",
              on: { click: _vm.cleanup }
            },
            [_vm._v("\n      " + _vm._s(_vm.$t("clear")) + "\n    ")]
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "section",
        _vm._l(_vm.allStars, function(group) {
          return _c(
            "div",
            { key: group[0] },
            [
              _c("h2", [_vm._v(_vm._s(group[0]))]),
              _vm._v(" "),
              typeof group[1][0] === "number"
                ? _c(
                    "ul",
                    { staticClass: "icon-list" },
                    _vm._l(group[1], function(groupId) {
                      return _c(
                        "li",
                        { key: groupId, staticClass: "icon-list-item" },
                        [
                          _c("Icon", {
                            attrs: { id: groupId, "owned-set": _vm.owned },
                            on: {
                              "add-id": _vm.addId,
                              "delete-id": _vm.deleteId
                            }
                          })
                        ],
                        1
                      )
                    }),
                    0
                  )
                : _vm._l(group[1], function(subgroup, index) {
                    return _c(
                      "div",
                      { key: index },
                      [
                        _c("h3", [_vm._v(_vm._s(subgroup[0]))]),
                        _vm._v(" "),
                        typeof subgroup[1] === "number"
                          ? _c(
                              "ul",
                              { staticClass: "icon-list" },
                              _vm._l(subgroup.slice(1), function(subgroupId) {
                                return _c(
                                  "li",
                                  {
                                    key: subgroupId,
                                    staticClass: "icon-list-item"
                                  },
                                  [
                                    _c("Icon", {
                                      attrs: {
                                        id: subgroupId,
                                        "owned-set": _vm.owned
                                      },
                                      on: {
                                        "add-id": _vm.addId,
                                        "delete-id": _vm.deleteId
                                      }
                                    })
                                  ],
                                  1
                                )
                              }),
                              0
                            )
                          : _vm._l(subgroup.slice(1), function(
                              subsubgroup,
                              subindex
                            ) {
                              return _c("div", { key: subindex }, [
                                _c("h4", [_vm._v(_vm._s(subsubgroup[0]))]),
                                _vm._v(" "),
                                _c(
                                  "ul",
                                  { staticClass: "icon-list" },
                                  _vm._l(subsubgroup.slice(1), function(
                                    subsubgroupId
                                  ) {
                                    return _c(
                                      "li",
                                      {
                                        key: subsubgroupId,
                                        staticClass: "icon-list-item"
                                      },
                                      [
                                        _c("Icon", {
                                          attrs: {
                                            id: subsubgroupId,
                                            "owned-set": _vm.owned
                                          },
                                          on: {
                                            "add-id": _vm.addId,
                                            "delete-id": _vm.deleteId
                                          }
                                        })
                                      ],
                                      1
                                    )
                                  }),
                                  0
                                )
                              ])
                            })
                      ],
                      2
                    )
                  })
            ],
            2
          )
        }),
        0
      ),
      _vm._v(" "),
      _c("footer", [
        _c("p", [_vm._v("Last Update: " + _vm._s(_vm.lastUpdateTime))]),
        _vm._v(" "),
        _vm._m(0),
        _vm._v(" "),
        _vm._m(1),
        _vm._v(" "),
        _vm._m(2)
      ]),
      _vm._v(" "),
      _c(
        "md-dialog",
        {
          attrs: { "md-active": _vm.exportSuccessfulActive },
          on: {
            "update:mdActive": function($event) {
              _vm.exportSuccessfulActive = $event
            },
            "update:md-active": function($event) {
              _vm.exportSuccessfulActive = $event
            }
          }
        },
        [_c("md-dialog-title", [_vm._v(_vm._s(_vm.$t("copied")))])],
        1
      ),
      _vm._v(" "),
      _c(
        "md-dialog",
        {
          attrs: { "md-active": _vm.exportFailedActive },
          on: {
            "update:mdActive": function($event) {
              _vm.exportFailedActive = $event
            },
            "update:md-active": function($event) {
              _vm.exportFailedActive = $event
            }
          }
        },
        [
          _c("md-dialog-title", [
            _vm._v(_vm._s(_vm.$t("copy-following-encoded-string")))
          ]),
          _vm._v(" "),
          _c(
            "md-field",
            [
              _c("md-input", {
                attrs: { readonly: "" },
                model: {
                  value: _vm.copyTextArea,
                  callback: function($$v) {
                    _vm.copyTextArea = $$v
                  },
                  expression: "copyTextArea"
                }
              })
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c("md-dialog-prompt", {
        attrs: {
          "md-active": _vm.promptActive,
          "md-input-placeholder": _vm.$t("input-encoded-string"),
          "md-confirm-text": _vm.$t("confirm-text"),
          "md-cancel-text": _vm.$t("cancel-text")
        },
        on: {
          "update:mdActive": function($event) {
            _vm.promptActive = $event
          },
          "update:md-active": function($event) {
            _vm.promptActive = $event
          },
          "md-confirm": _vm.importData
        },
        model: {
          value: _vm.importValue,
          callback: function($$v) {
            _vm.importValue = $$v
          },
          expression: "importValue"
        }
      })
    ],
    1
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("p", [
      _vm._v("\n      All data are from\n      "),
      _c(
        "a",
        {
          attrs: {
            href:
              "http://usashoya.web.fc2.com/aigis/checklist/aigis_checklist.html"
          }
        },
        [_vm._v("[非公式]千年戦争アイギス - ユニット所持チェッカー")]
      )
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("p", [
      _vm._v("Copyright © "),
      _c("a", { attrs: { href: "https://flandre.tw/github" } }, [
        _vm._v("FlandreDaisuki")
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("p", [
      _vm._v("License is "),
      _c("a", { attrs: { href: "https://opensource.org/licenses/MIT" } }, [
        _vm._v("MIT")
      ])
    ])
  }
]
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: "data-v-9938e2",
            functional: undefined
          };
        })());
      
    /* hot reload */
    (function () {
      if (module.hot) {
        var api = require('vue-hot-reload-api');
        api.install(require('vue'));
        if (api.compatible) {
          module.hot.accept();
          if (!module.hot.data) {
            api.createRecord('$9938e2', $9938e2);
          } else {
            api.reload('$9938e2', $9938e2);
          }
        }

        
        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
      }
    })();
},{"../all-stars.json":"../all-stars.json","./utils":"utils.js","./icon.vue":"icon.vue","_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js","vue-hot-reload-api":"../node_modules/vue-hot-reload-api/dist/index.js","vue":"../node_modules/vue/dist/vue.runtime.esm.js"}],"../node_modules/vue-i18n/dist/vue-i18n.esm.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/*!
 * vue-i18n v8.15.0 
 * (c) 2019 kazuya kawaguchi
 * Released under the MIT License.
 */

/*  */

/**
 * constants
 */
var numberFormatKeys = ['style', 'currency', 'currencyDisplay', 'useGrouping', 'minimumIntegerDigits', 'minimumFractionDigits', 'maximumFractionDigits', 'minimumSignificantDigits', 'maximumSignificantDigits', 'localeMatcher', 'formatMatcher'];
/**
 * utilities
 */

function warn(msg, err) {
  if (typeof console !== 'undefined') {
    console.warn('[vue-i18n] ' + msg);
    /* istanbul ignore if */

    if (err) {
      console.warn(err.stack);
    }
  }
}

function error(msg, err) {
  if (typeof console !== 'undefined') {
    console.error('[vue-i18n] ' + msg);
    /* istanbul ignore if */

    if (err) {
      console.error(err.stack);
    }
  }
}

function isObject(obj) {
  return obj !== null && typeof obj === 'object';
}

var toString = Object.prototype.toString;
var OBJECT_STRING = '[object Object]';

function isPlainObject(obj) {
  return toString.call(obj) === OBJECT_STRING;
}

function isNull(val) {
  return val === null || val === undefined;
}

function parseArgs() {
  var args = [],
      len = arguments.length;

  while (len--) args[len] = arguments[len];

  var locale = null;
  var params = null;

  if (args.length === 1) {
    if (isObject(args[0]) || Array.isArray(args[0])) {
      params = args[0];
    } else if (typeof args[0] === 'string') {
      locale = args[0];
    }
  } else if (args.length === 2) {
    if (typeof args[0] === 'string') {
      locale = args[0];
    }
    /* istanbul ignore if */


    if (isObject(args[1]) || Array.isArray(args[1])) {
      params = args[1];
    }
  }

  return {
    locale: locale,
    params: params
  };
}

function looseClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function remove(arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);

    if (index > -1) {
      return arr.splice(index, 1);
    }
  }
}

var hasOwnProperty = Object.prototype.hasOwnProperty;

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function merge(target) {
  var arguments$1 = arguments;
  var output = Object(target);

  for (var i = 1; i < arguments.length; i++) {
    var source = arguments$1[i];

    if (source !== undefined && source !== null) {
      var key = void 0;

      for (key in source) {
        if (hasOwn(source, key)) {
          if (isObject(source[key])) {
            output[key] = merge(output[key], source[key]);
          } else {
            output[key] = source[key];
          }
        }
      }
    }
  }

  return output;
}

function looseEqual(a, b) {
  if (a === b) {
    return true;
  }

  var isObjectA = isObject(a);
  var isObjectB = isObject(b);

  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);

      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i]);
        });
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key]);
        });
      } else {
        /* istanbul ignore next */
        return false;
      }
    } catch (e) {
      /* istanbul ignore next */
      return false;
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b);
  } else {
    return false;
  }
}
/*  */


function extend(Vue) {
  if (!Vue.prototype.hasOwnProperty('$i18n')) {
    // $FlowFixMe
    Object.defineProperty(Vue.prototype, '$i18n', {
      get: function get() {
        return this._i18n;
      }
    });
  }

  Vue.prototype.$t = function (key) {
    var values = [],
        len = arguments.length - 1;

    while (len-- > 0) values[len] = arguments[len + 1];

    var i18n = this.$i18n;
    return i18n._t.apply(i18n, [key, i18n.locale, i18n._getMessages(), this].concat(values));
  };

  Vue.prototype.$tc = function (key, choice) {
    var values = [],
        len = arguments.length - 2;

    while (len-- > 0) values[len] = arguments[len + 2];

    var i18n = this.$i18n;
    return i18n._tc.apply(i18n, [key, i18n.locale, i18n._getMessages(), this, choice].concat(values));
  };

  Vue.prototype.$te = function (key, locale) {
    var i18n = this.$i18n;
    return i18n._te(key, i18n.locale, i18n._getMessages(), locale);
  };

  Vue.prototype.$d = function (value) {
    var ref;
    var args = [],
        len = arguments.length - 1;

    while (len-- > 0) args[len] = arguments[len + 1];

    return (ref = this.$i18n).d.apply(ref, [value].concat(args));
  };

  Vue.prototype.$n = function (value) {
    var ref;
    var args = [],
        len = arguments.length - 1;

    while (len-- > 0) args[len] = arguments[len + 1];

    return (ref = this.$i18n).n.apply(ref, [value].concat(args));
  };
}
/*  */


var mixin = {
  beforeCreate: function beforeCreate() {
    var options = this.$options;
    options.i18n = options.i18n || (options.__i18n ? {} : null);

    if (options.i18n) {
      if (options.i18n instanceof VueI18n) {
        // init locale messages via custom blocks
        if (options.__i18n) {
          try {
            var localeMessages = {};

            options.__i18n.forEach(function (resource) {
              localeMessages = merge(localeMessages, JSON.parse(resource));
            });

            Object.keys(localeMessages).forEach(function (locale) {
              options.i18n.mergeLocaleMessage(locale, localeMessages[locale]);
            });
          } catch (e) {
            if ("development" !== 'production') {
              warn("Cannot parse locale messages via custom blocks.", e);
            }
          }
        }

        this._i18n = options.i18n;
        this._i18nWatcher = this._i18n.watchI18nData();
      } else if (isPlainObject(options.i18n)) {
        // component local i18n
        if (this.$root && this.$root.$i18n && this.$root.$i18n instanceof VueI18n) {
          options.i18n.root = this.$root;
          options.i18n.formatter = this.$root.$i18n.formatter;
          options.i18n.fallbackLocale = this.$root.$i18n.fallbackLocale;
          options.i18n.formatFallbackMessages = this.$root.$i18n.formatFallbackMessages;
          options.i18n.silentTranslationWarn = this.$root.$i18n.silentTranslationWarn;
          options.i18n.silentFallbackWarn = this.$root.$i18n.silentFallbackWarn;
          options.i18n.pluralizationRules = this.$root.$i18n.pluralizationRules;
          options.i18n.preserveDirectiveContent = this.$root.$i18n.preserveDirectiveContent;
        } // init locale messages via custom blocks


        if (options.__i18n) {
          try {
            var localeMessages$1 = {};

            options.__i18n.forEach(function (resource) {
              localeMessages$1 = merge(localeMessages$1, JSON.parse(resource));
            });

            options.i18n.messages = localeMessages$1;
          } catch (e) {
            if ("development" !== 'production') {
              warn("Cannot parse locale messages via custom blocks.", e);
            }
          }
        }

        var ref = options.i18n;
        var sharedMessages = ref.sharedMessages;

        if (sharedMessages && isPlainObject(sharedMessages)) {
          options.i18n.messages = merge(options.i18n.messages, sharedMessages);
        }

        this._i18n = new VueI18n(options.i18n);
        this._i18nWatcher = this._i18n.watchI18nData();

        if (options.i18n.sync === undefined || !!options.i18n.sync) {
          this._localeWatcher = this.$i18n.watchLocale();
        }
      } else {
        if ("development" !== 'production') {
          warn("Cannot be interpreted 'i18n' option.");
        }
      }
    } else if (this.$root && this.$root.$i18n && this.$root.$i18n instanceof VueI18n) {
      // root i18n
      this._i18n = this.$root.$i18n;
    } else if (options.parent && options.parent.$i18n && options.parent.$i18n instanceof VueI18n) {
      // parent i18n
      this._i18n = options.parent.$i18n;
    }
  },
  beforeMount: function beforeMount() {
    var options = this.$options;
    options.i18n = options.i18n || (options.__i18n ? {} : null);

    if (options.i18n) {
      if (options.i18n instanceof VueI18n) {
        // init locale messages via custom blocks
        this._i18n.subscribeDataChanging(this);

        this._subscribing = true;
      } else if (isPlainObject(options.i18n)) {
        this._i18n.subscribeDataChanging(this);

        this._subscribing = true;
      } else {
        if ("development" !== 'production') {
          warn("Cannot be interpreted 'i18n' option.");
        }
      }
    } else if (this.$root && this.$root.$i18n && this.$root.$i18n instanceof VueI18n) {
      this._i18n.subscribeDataChanging(this);

      this._subscribing = true;
    } else if (options.parent && options.parent.$i18n && options.parent.$i18n instanceof VueI18n) {
      this._i18n.subscribeDataChanging(this);

      this._subscribing = true;
    }
  },
  beforeDestroy: function beforeDestroy() {
    if (!this._i18n) {
      return;
    }

    var self = this;
    this.$nextTick(function () {
      if (self._subscribing) {
        self._i18n.unsubscribeDataChanging(self);

        delete self._subscribing;
      }

      if (self._i18nWatcher) {
        self._i18nWatcher();

        self._i18n.destroyVM();

        delete self._i18nWatcher;
      }

      if (self._localeWatcher) {
        self._localeWatcher();

        delete self._localeWatcher;
      }

      self._i18n = null;
    });
  }
};
/*  */

var interpolationComponent = {
  name: 'i18n',
  functional: true,
  props: {
    tag: {
      type: String
    },
    path: {
      type: String,
      required: true
    },
    locale: {
      type: String
    },
    places: {
      type: [Array, Object]
    }
  },
  render: function render(h, ref) {
    var data = ref.data;
    var parent = ref.parent;
    var props = ref.props;
    var slots = ref.slots;
    var $i18n = parent.$i18n;

    if (!$i18n) {
      if ("development" !== 'production') {
        warn('Cannot find VueI18n instance!');
      }

      return;
    }

    var path = props.path;
    var locale = props.locale;
    var places = props.places;
    var params = slots();
    var children = $i18n.i(path, locale, onlyHasDefaultPlace(params) || places ? useLegacyPlaces(params.default, places) : params);
    var tag = props.tag || 'span';
    return tag ? h(tag, data, children) : children;
  }
};

function onlyHasDefaultPlace(params) {
  var prop;

  for (prop in params) {
    if (prop !== 'default') {
      return false;
    }
  }

  return Boolean(prop);
}

function useLegacyPlaces(children, places) {
  var params = places ? createParamsFromPlaces(places) : {};

  if (!children) {
    return params;
  } // Filter empty text nodes


  children = children.filter(function (child) {
    return child.tag || child.text.trim() !== '';
  });
  var everyPlace = children.every(vnodeHasPlaceAttribute);

  if ("development" !== 'production' && everyPlace) {
    warn('`place` attribute is deprecated in next major version. Please switch to Vue slots.');
  }

  return children.reduce(everyPlace ? assignChildPlace : assignChildIndex, params);
}

function createParamsFromPlaces(places) {
  if ("development" !== 'production') {
    warn('`places` prop is deprecated in next major version. Please switch to Vue slots.');
  }

  return Array.isArray(places) ? places.reduce(assignChildIndex, {}) : Object.assign({}, places);
}

function assignChildPlace(params, child) {
  if (child.data && child.data.attrs && child.data.attrs.place) {
    params[child.data.attrs.place] = child;
  }

  return params;
}

function assignChildIndex(params, child, index) {
  params[index] = child;
  return params;
}

function vnodeHasPlaceAttribute(vnode) {
  return Boolean(vnode.data && vnode.data.attrs && vnode.data.attrs.place);
}
/*  */


var numberComponent = {
  name: 'i18n-n',
  functional: true,
  props: {
    tag: {
      type: String,
      default: 'span'
    },
    value: {
      type: Number,
      required: true
    },
    format: {
      type: [String, Object]
    },
    locale: {
      type: String
    }
  },
  render: function render(h, ref) {
    var props = ref.props;
    var parent = ref.parent;
    var data = ref.data;
    var i18n = parent.$i18n;

    if (!i18n) {
      if ("development" !== 'production') {
        warn('Cannot find VueI18n instance!');
      }

      return null;
    }

    var key = null;
    var options = null;

    if (typeof props.format === 'string') {
      key = props.format;
    } else if (isObject(props.format)) {
      if (props.format.key) {
        key = props.format.key;
      } // Filter out number format options only


      options = Object.keys(props.format).reduce(function (acc, prop) {
        var obj;

        if (numberFormatKeys.includes(prop)) {
          return Object.assign({}, acc, (obj = {}, obj[prop] = props.format[prop], obj));
        }

        return acc;
      }, null);
    }

    var locale = props.locale || i18n.locale;

    var parts = i18n._ntp(props.value, locale, key, options);

    var values = parts.map(function (part, index) {
      var obj;
      var slot = data.scopedSlots && data.scopedSlots[part.type];
      return slot ? slot((obj = {}, obj[part.type] = part.value, obj.index = index, obj.parts = parts, obj)) : part.value;
    });
    return h(props.tag, {
      attrs: data.attrs,
      'class': data['class'],
      staticClass: data.staticClass
    }, values);
  }
};
/*  */

function bind(el, binding, vnode) {
  if (!assert(el, vnode)) {
    return;
  }

  t(el, binding, vnode);
}

function update(el, binding, vnode, oldVNode) {
  if (!assert(el, vnode)) {
    return;
  }

  var i18n = vnode.context.$i18n;

  if (localeEqual(el, vnode) && looseEqual(binding.value, binding.oldValue) && looseEqual(el._localeMessage, i18n.getLocaleMessage(i18n.locale))) {
    return;
  }

  t(el, binding, vnode);
}

function unbind(el, binding, vnode, oldVNode) {
  var vm = vnode.context;

  if (!vm) {
    warn('Vue instance does not exists in VNode context');
    return;
  }

  var i18n = vnode.context.$i18n || {};

  if (!binding.modifiers.preserve && !i18n.preserveDirectiveContent) {
    el.textContent = '';
  }

  el._vt = undefined;
  delete el['_vt'];
  el._locale = undefined;
  delete el['_locale'];
  el._localeMessage = undefined;
  delete el['_localeMessage'];
}

function assert(el, vnode) {
  var vm = vnode.context;

  if (!vm) {
    warn('Vue instance does not exists in VNode context');
    return false;
  }

  if (!vm.$i18n) {
    warn('VueI18n instance does not exists in Vue instance');
    return false;
  }

  return true;
}

function localeEqual(el, vnode) {
  var vm = vnode.context;
  return el._locale === vm.$i18n.locale;
}

function t(el, binding, vnode) {
  var ref$1, ref$2;
  var value = binding.value;
  var ref = parseValue(value);
  var path = ref.path;
  var locale = ref.locale;
  var args = ref.args;
  var choice = ref.choice;

  if (!path && !locale && !args) {
    warn('value type not supported');
    return;
  }

  if (!path) {
    warn('`path` is required in v-t directive');
    return;
  }

  var vm = vnode.context;

  if (choice) {
    el._vt = el.textContent = (ref$1 = vm.$i18n).tc.apply(ref$1, [path, choice].concat(makeParams(locale, args)));
  } else {
    el._vt = el.textContent = (ref$2 = vm.$i18n).t.apply(ref$2, [path].concat(makeParams(locale, args)));
  }

  el._locale = vm.$i18n.locale;
  el._localeMessage = vm.$i18n.getLocaleMessage(vm.$i18n.locale);
}

function parseValue(value) {
  var path;
  var locale;
  var args;
  var choice;

  if (typeof value === 'string') {
    path = value;
  } else if (isPlainObject(value)) {
    path = value.path;
    locale = value.locale;
    args = value.args;
    choice = value.choice;
  }

  return {
    path: path,
    locale: locale,
    args: args,
    choice: choice
  };
}

function makeParams(locale, args) {
  var params = [];
  locale && params.push(locale);

  if (args && (Array.isArray(args) || isPlainObject(args))) {
    params.push(args);
  }

  return params;
}

var Vue;

function install(_Vue) {
  /* istanbul ignore if */
  if ("development" !== 'production' && install.installed && _Vue === Vue) {
    warn('already installed.');
    return;
  }

  install.installed = true;
  Vue = _Vue;
  var version = Vue.version && Number(Vue.version.split('.')[0]) || -1;
  /* istanbul ignore if */

  if ("development" !== 'production' && version < 2) {
    warn("vue-i18n (" + install.version + ") need to use Vue 2.0 or later (Vue: " + Vue.version + ").");
    return;
  }

  extend(Vue);
  Vue.mixin(mixin);
  Vue.directive('t', {
    bind: bind,
    update: update,
    unbind: unbind
  });
  Vue.component(interpolationComponent.name, interpolationComponent);
  Vue.component(numberComponent.name, numberComponent); // use simple mergeStrategies to prevent i18n instance lose '__proto__'

  var strats = Vue.config.optionMergeStrategies;

  strats.i18n = function (parentVal, childVal) {
    return childVal === undefined ? parentVal : childVal;
  };
}
/*  */


var BaseFormatter = function BaseFormatter() {
  this._caches = Object.create(null);
};

BaseFormatter.prototype.interpolate = function interpolate(message, values) {
  if (!values) {
    return [message];
  }

  var tokens = this._caches[message];

  if (!tokens) {
    tokens = parse(message);
    this._caches[message] = tokens;
  }

  return compile(tokens, values);
};

var RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
var RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;

function parse(format) {
  var tokens = [];
  var position = 0;
  var text = '';

  while (position < format.length) {
    var char = format[position++];

    if (char === '{') {
      if (text) {
        tokens.push({
          type: 'text',
          value: text
        });
      }

      text = '';
      var sub = '';
      char = format[position++];

      while (char !== undefined && char !== '}') {
        sub += char;
        char = format[position++];
      }

      var isClosed = char === '}';
      var type = RE_TOKEN_LIST_VALUE.test(sub) ? 'list' : isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ? 'named' : 'unknown';
      tokens.push({
        value: sub,
        type: type
      });
    } else if (char === '%') {
      // when found rails i18n syntax, skip text capture
      if (format[position] !== '{') {
        text += char;
      }
    } else {
      text += char;
    }
  }

  text && tokens.push({
    type: 'text',
    value: text
  });
  return tokens;
}

function compile(tokens, values) {
  var compiled = [];
  var index = 0;
  var mode = Array.isArray(values) ? 'list' : isObject(values) ? 'named' : 'unknown';

  if (mode === 'unknown') {
    return compiled;
  }

  while (index < tokens.length) {
    var token = tokens[index];

    switch (token.type) {
      case 'text':
        compiled.push(token.value);
        break;

      case 'list':
        compiled.push(values[parseInt(token.value, 10)]);
        break;

      case 'named':
        if (mode === 'named') {
          compiled.push(values[token.value]);
        } else {
          if ("development" !== 'production') {
            warn("Type of token '" + token.type + "' and format of value '" + mode + "' don't match!");
          }
        }

        break;

      case 'unknown':
        if ("development" !== 'production') {
          warn("Detect 'unknown' type of token!");
        }

        break;
    }

    index++;
  }

  return compiled;
}
/*  */

/**
 *  Path parser
 *  - Inspired:
 *    Vue.js Path parser
 */
// actions


var APPEND = 0;
var PUSH = 1;
var INC_SUB_PATH_DEPTH = 2;
var PUSH_SUB_PATH = 3; // states

var BEFORE_PATH = 0;
var IN_PATH = 1;
var BEFORE_IDENT = 2;
var IN_IDENT = 3;
var IN_SUB_PATH = 4;
var IN_SINGLE_QUOTE = 5;
var IN_DOUBLE_QUOTE = 6;
var AFTER_PATH = 7;
var ERROR = 8;
var pathStateMachine = [];
pathStateMachine[BEFORE_PATH] = {
  'ws': [BEFORE_PATH],
  'ident': [IN_IDENT, APPEND],
  '[': [IN_SUB_PATH],
  'eof': [AFTER_PATH]
};
pathStateMachine[IN_PATH] = {
  'ws': [IN_PATH],
  '.': [BEFORE_IDENT],
  '[': [IN_SUB_PATH],
  'eof': [AFTER_PATH]
};
pathStateMachine[BEFORE_IDENT] = {
  'ws': [BEFORE_IDENT],
  'ident': [IN_IDENT, APPEND],
  '0': [IN_IDENT, APPEND],
  'number': [IN_IDENT, APPEND]
};
pathStateMachine[IN_IDENT] = {
  'ident': [IN_IDENT, APPEND],
  '0': [IN_IDENT, APPEND],
  'number': [IN_IDENT, APPEND],
  'ws': [IN_PATH, PUSH],
  '.': [BEFORE_IDENT, PUSH],
  '[': [IN_SUB_PATH, PUSH],
  'eof': [AFTER_PATH, PUSH]
};
pathStateMachine[IN_SUB_PATH] = {
  "'": [IN_SINGLE_QUOTE, APPEND],
  '"': [IN_DOUBLE_QUOTE, APPEND],
  '[': [IN_SUB_PATH, INC_SUB_PATH_DEPTH],
  ']': [IN_PATH, PUSH_SUB_PATH],
  'eof': ERROR,
  'else': [IN_SUB_PATH, APPEND]
};
pathStateMachine[IN_SINGLE_QUOTE] = {
  "'": [IN_SUB_PATH, APPEND],
  'eof': ERROR,
  'else': [IN_SINGLE_QUOTE, APPEND]
};
pathStateMachine[IN_DOUBLE_QUOTE] = {
  '"': [IN_SUB_PATH, APPEND],
  'eof': ERROR,
  'else': [IN_DOUBLE_QUOTE, APPEND]
};
/**
 * Check if an expression is a literal value.
 */

var literalValueRE = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;

function isLiteral(exp) {
  return literalValueRE.test(exp);
}
/**
 * Strip quotes from a string
 */


function stripQuotes(str) {
  var a = str.charCodeAt(0);
  var b = str.charCodeAt(str.length - 1);
  return a === b && (a === 0x22 || a === 0x27) ? str.slice(1, -1) : str;
}
/**
 * Determine the type of a character in a keypath.
 */


function getPathCharType(ch) {
  if (ch === undefined || ch === null) {
    return 'eof';
  }

  var code = ch.charCodeAt(0);

  switch (code) {
    case 0x5B: // [

    case 0x5D: // ]

    case 0x2E: // .

    case 0x22: // "

    case 0x27:
      // '
      return ch;

    case 0x5F: // _

    case 0x24: // $

    case 0x2D:
      // -
      return 'ident';

    case 0x09: // Tab

    case 0x0A: // Newline

    case 0x0D: // Return

    case 0xA0: // No-break space

    case 0xFEFF: // Byte Order Mark

    case 0x2028: // Line Separator

    case 0x2029:
      // Paragraph Separator
      return 'ws';
  }

  return 'ident';
}
/**
 * Format a subPath, return its plain form if it is
 * a literal string or number. Otherwise prepend the
 * dynamic indicator (*).
 */


function formatSubPath(path) {
  var trimmed = path.trim(); // invalid leading 0

  if (path.charAt(0) === '0' && isNaN(path)) {
    return false;
  }

  return isLiteral(trimmed) ? stripQuotes(trimmed) : '*' + trimmed;
}
/**
 * Parse a string path into an array of segments
 */


function parse$1(path) {
  var keys = [];
  var index = -1;
  var mode = BEFORE_PATH;
  var subPathDepth = 0;
  var c;
  var key;
  var newChar;
  var type;
  var transition;
  var action;
  var typeMap;
  var actions = [];

  actions[PUSH] = function () {
    if (key !== undefined) {
      keys.push(key);
      key = undefined;
    }
  };

  actions[APPEND] = function () {
    if (key === undefined) {
      key = newChar;
    } else {
      key += newChar;
    }
  };

  actions[INC_SUB_PATH_DEPTH] = function () {
    actions[APPEND]();
    subPathDepth++;
  };

  actions[PUSH_SUB_PATH] = function () {
    if (subPathDepth > 0) {
      subPathDepth--;
      mode = IN_SUB_PATH;
      actions[APPEND]();
    } else {
      subPathDepth = 0;

      if (key === undefined) {
        return false;
      }

      key = formatSubPath(key);

      if (key === false) {
        return false;
      } else {
        actions[PUSH]();
      }
    }
  };

  function maybeUnescapeQuote() {
    var nextChar = path[index + 1];

    if (mode === IN_SINGLE_QUOTE && nextChar === "'" || mode === IN_DOUBLE_QUOTE && nextChar === '"') {
      index++;
      newChar = '\\' + nextChar;
      actions[APPEND]();
      return true;
    }
  }

  while (mode !== null) {
    index++;
    c = path[index];

    if (c === '\\' && maybeUnescapeQuote()) {
      continue;
    }

    type = getPathCharType(c);
    typeMap = pathStateMachine[mode];
    transition = typeMap[type] || typeMap['else'] || ERROR;

    if (transition === ERROR) {
      return; // parse error
    }

    mode = transition[0];
    action = actions[transition[1]];

    if (action) {
      newChar = transition[2];
      newChar = newChar === undefined ? c : newChar;

      if (action() === false) {
        return;
      }
    }

    if (mode === AFTER_PATH) {
      return keys;
    }
  }
}

var I18nPath = function I18nPath() {
  this._cache = Object.create(null);
};
/**
 * External parse that check for a cache hit first
 */


I18nPath.prototype.parsePath = function parsePath(path) {
  var hit = this._cache[path];

  if (!hit) {
    hit = parse$1(path);

    if (hit) {
      this._cache[path] = hit;
    }
  }

  return hit || [];
};
/**
 * Get path value from path string
 */


I18nPath.prototype.getPathValue = function getPathValue(obj, path) {
  if (!isObject(obj)) {
    return null;
  }

  var paths = this.parsePath(path);

  if (paths.length === 0) {
    return null;
  } else {
    var length = paths.length;
    var last = obj;
    var i = 0;

    while (i < length) {
      var value = last[paths[i]];

      if (value === undefined) {
        return null;
      }

      last = value;
      i++;
    }

    return last;
  }
};
/*  */


var htmlTagMatcher = /<\/?[\w\s="/.':;#-\/]+>/;
var linkKeyMatcher = /(?:@(?:\.[a-z]+)?:(?:[\w\-_|.]+|\([\w\-_|.]+\)))/g;
var linkKeyPrefixMatcher = /^@(?:\.([a-z]+))?:/;
var bracketsMatcher = /[()]/g;
var defaultModifiers = {
  'upper': function (str) {
    return str.toLocaleUpperCase();
  },
  'lower': function (str) {
    return str.toLocaleLowerCase();
  }
};
var defaultFormatter = new BaseFormatter();

var VueI18n = function VueI18n(options) {
  var this$1 = this;
  if (options === void 0) options = {}; // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #290

  /* istanbul ignore if */

  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  var locale = options.locale || 'en-US';
  var fallbackLocale = options.fallbackLocale || 'en-US';
  var messages = options.messages || {};
  var dateTimeFormats = options.dateTimeFormats || {};
  var numberFormats = options.numberFormats || {};
  this._vm = null;
  this._formatter = options.formatter || defaultFormatter;
  this._modifiers = options.modifiers || {};
  this._missing = options.missing || null;
  this._root = options.root || null;
  this._sync = options.sync === undefined ? true : !!options.sync;
  this._fallbackRoot = options.fallbackRoot === undefined ? true : !!options.fallbackRoot;
  this._formatFallbackMessages = options.formatFallbackMessages === undefined ? false : !!options.formatFallbackMessages;
  this._silentTranslationWarn = options.silentTranslationWarn === undefined ? false : options.silentTranslationWarn;
  this._silentFallbackWarn = options.silentFallbackWarn === undefined ? false : !!options.silentFallbackWarn;
  this._dateTimeFormatters = {};
  this._numberFormatters = {};
  this._path = new I18nPath();
  this._dataListeners = [];
  this._preserveDirectiveContent = options.preserveDirectiveContent === undefined ? false : !!options.preserveDirectiveContent;
  this.pluralizationRules = options.pluralizationRules || {};
  this._warnHtmlInMessage = options.warnHtmlInMessage || 'off';

  this._exist = function (message, key) {
    if (!message || !key) {
      return false;
    }

    if (!isNull(this$1._path.getPathValue(message, key))) {
      return true;
    } // fallback for flat key


    if (message[key]) {
      return true;
    }

    return false;
  };

  if (this._warnHtmlInMessage === 'warn' || this._warnHtmlInMessage === 'error') {
    Object.keys(messages).forEach(function (locale) {
      this$1._checkLocaleMessage(locale, this$1._warnHtmlInMessage, messages[locale]);
    });
  }

  this._initVM({
    locale: locale,
    fallbackLocale: fallbackLocale,
    messages: messages,
    dateTimeFormats: dateTimeFormats,
    numberFormats: numberFormats
  });
};

var prototypeAccessors = {
  vm: {
    configurable: true
  },
  messages: {
    configurable: true
  },
  dateTimeFormats: {
    configurable: true
  },
  numberFormats: {
    configurable: true
  },
  availableLocales: {
    configurable: true
  },
  locale: {
    configurable: true
  },
  fallbackLocale: {
    configurable: true
  },
  formatFallbackMessages: {
    configurable: true
  },
  missing: {
    configurable: true
  },
  formatter: {
    configurable: true
  },
  silentTranslationWarn: {
    configurable: true
  },
  silentFallbackWarn: {
    configurable: true
  },
  preserveDirectiveContent: {
    configurable: true
  },
  warnHtmlInMessage: {
    configurable: true
  }
};

VueI18n.prototype._checkLocaleMessage = function _checkLocaleMessage(locale, level, message) {
  var paths = [];

  var fn = function (level, locale, message, paths) {
    if (isPlainObject(message)) {
      Object.keys(message).forEach(function (key) {
        var val = message[key];

        if (isPlainObject(val)) {
          paths.push(key);
          paths.push('.');
          fn(level, locale, val, paths);
          paths.pop();
          paths.pop();
        } else {
          paths.push(key);
          fn(level, locale, val, paths);
          paths.pop();
        }
      });
    } else if (Array.isArray(message)) {
      message.forEach(function (item, index) {
        if (isPlainObject(item)) {
          paths.push("[" + index + "]");
          paths.push('.');
          fn(level, locale, item, paths);
          paths.pop();
          paths.pop();
        } else {
          paths.push("[" + index + "]");
          fn(level, locale, item, paths);
          paths.pop();
        }
      });
    } else if (typeof message === 'string') {
      var ret = htmlTagMatcher.test(message);

      if (ret) {
        var msg = "Detected HTML in message '" + message + "' of keypath '" + paths.join('') + "' at '" + locale + "'. Consider component interpolation with '<i18n>' to avoid XSS. See https://bit.ly/2ZqJzkp";

        if (level === 'warn') {
          warn(msg);
        } else if (level === 'error') {
          error(msg);
        }
      }
    }
  };

  fn(level, locale, message, paths);
};

VueI18n.prototype._initVM = function _initVM(data) {
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  this._vm = new Vue({
    data: data
  });
  Vue.config.silent = silent;
};

VueI18n.prototype.destroyVM = function destroyVM() {
  this._vm.$destroy();
};

VueI18n.prototype.subscribeDataChanging = function subscribeDataChanging(vm) {
  this._dataListeners.push(vm);
};

VueI18n.prototype.unsubscribeDataChanging = function unsubscribeDataChanging(vm) {
  remove(this._dataListeners, vm);
};

VueI18n.prototype.watchI18nData = function watchI18nData() {
  var self = this;
  return this._vm.$watch('$data', function () {
    var i = self._dataListeners.length;

    while (i--) {
      Vue.nextTick(function () {
        self._dataListeners[i] && self._dataListeners[i].$forceUpdate();
      });
    }
  }, {
    deep: true
  });
};

VueI18n.prototype.watchLocale = function watchLocale() {
  /* istanbul ignore if */
  if (!this._sync || !this._root) {
    return null;
  }

  var target = this._vm;
  return this._root.$i18n.vm.$watch('locale', function (val) {
    target.$set(target, 'locale', val);
    target.$forceUpdate();
  }, {
    immediate: true
  });
};

prototypeAccessors.vm.get = function () {
  return this._vm;
};

prototypeAccessors.messages.get = function () {
  return looseClone(this._getMessages());
};

prototypeAccessors.dateTimeFormats.get = function () {
  return looseClone(this._getDateTimeFormats());
};

prototypeAccessors.numberFormats.get = function () {
  return looseClone(this._getNumberFormats());
};

prototypeAccessors.availableLocales.get = function () {
  return Object.keys(this.messages).sort();
};

prototypeAccessors.locale.get = function () {
  return this._vm.locale;
};

prototypeAccessors.locale.set = function (locale) {
  this._vm.$set(this._vm, 'locale', locale);
};

prototypeAccessors.fallbackLocale.get = function () {
  return this._vm.fallbackLocale;
};

prototypeAccessors.fallbackLocale.set = function (locale) {
  this._vm.$set(this._vm, 'fallbackLocale', locale);
};

prototypeAccessors.formatFallbackMessages.get = function () {
  return this._formatFallbackMessages;
};

prototypeAccessors.formatFallbackMessages.set = function (fallback) {
  this._formatFallbackMessages = fallback;
};

prototypeAccessors.missing.get = function () {
  return this._missing;
};

prototypeAccessors.missing.set = function (handler) {
  this._missing = handler;
};

prototypeAccessors.formatter.get = function () {
  return this._formatter;
};

prototypeAccessors.formatter.set = function (formatter) {
  this._formatter = formatter;
};

prototypeAccessors.silentTranslationWarn.get = function () {
  return this._silentTranslationWarn;
};

prototypeAccessors.silentTranslationWarn.set = function (silent) {
  this._silentTranslationWarn = silent;
};

prototypeAccessors.silentFallbackWarn.get = function () {
  return this._silentFallbackWarn;
};

prototypeAccessors.silentFallbackWarn.set = function (silent) {
  this._silentFallbackWarn = silent;
};

prototypeAccessors.preserveDirectiveContent.get = function () {
  return this._preserveDirectiveContent;
};

prototypeAccessors.preserveDirectiveContent.set = function (preserve) {
  this._preserveDirectiveContent = preserve;
};

prototypeAccessors.warnHtmlInMessage.get = function () {
  return this._warnHtmlInMessage;
};

prototypeAccessors.warnHtmlInMessage.set = function (level) {
  var this$1 = this;
  var orgLevel = this._warnHtmlInMessage;
  this._warnHtmlInMessage = level;

  if (orgLevel !== level && (level === 'warn' || level === 'error')) {
    var messages = this._getMessages();

    Object.keys(messages).forEach(function (locale) {
      this$1._checkLocaleMessage(locale, this$1._warnHtmlInMessage, messages[locale]);
    });
  }
};

VueI18n.prototype._getMessages = function _getMessages() {
  return this._vm.messages;
};

VueI18n.prototype._getDateTimeFormats = function _getDateTimeFormats() {
  return this._vm.dateTimeFormats;
};

VueI18n.prototype._getNumberFormats = function _getNumberFormats() {
  return this._vm.numberFormats;
};

VueI18n.prototype._warnDefault = function _warnDefault(locale, key, result, vm, values) {
  if (!isNull(result)) {
    return result;
  }

  if (this._missing) {
    var missingRet = this._missing.apply(null, [locale, key, vm, values]);

    if (typeof missingRet === 'string') {
      return missingRet;
    }
  } else {
    if ("development" !== 'production' && !this._isSilentTranslationWarn(key)) {
      warn("Cannot translate the value of keypath '" + key + "'. " + 'Use the value of keypath as default.');
    }
  }

  if (this._formatFallbackMessages) {
    var parsedArgs = parseArgs.apply(void 0, values);
    return this._render(key, 'string', parsedArgs.params, key);
  } else {
    return key;
  }
};

VueI18n.prototype._isFallbackRoot = function _isFallbackRoot(val) {
  return !val && !isNull(this._root) && this._fallbackRoot;
};

VueI18n.prototype._isSilentFallbackWarn = function _isSilentFallbackWarn(key) {
  return this._silentFallbackWarn instanceof RegExp ? this._silentFallbackWarn.test(key) : this._silentFallbackWarn;
};

VueI18n.prototype._isSilentFallback = function _isSilentFallback(locale, key) {
  return this._isSilentFallbackWarn(key) && (this._isFallbackRoot() || locale !== this.fallbackLocale);
};

VueI18n.prototype._isSilentTranslationWarn = function _isSilentTranslationWarn(key) {
  return this._silentTranslationWarn instanceof RegExp ? this._silentTranslationWarn.test(key) : this._silentTranslationWarn;
};

VueI18n.prototype._interpolate = function _interpolate(locale, message, key, host, interpolateMode, values, visitedLinkStack) {
  if (!message) {
    return null;
  }

  var pathRet = this._path.getPathValue(message, key);

  if (Array.isArray(pathRet) || isPlainObject(pathRet)) {
    return pathRet;
  }

  var ret;

  if (isNull(pathRet)) {
    /* istanbul ignore else */
    if (isPlainObject(message)) {
      ret = message[key];

      if (typeof ret !== 'string') {
        if ("development" !== 'production' && !this._isSilentTranslationWarn(key) && !this._isSilentFallback(locale, key)) {
          warn("Value of key '" + key + "' is not a string!");
        }

        return null;
      }
    } else {
      return null;
    }
  } else {
    /* istanbul ignore else */
    if (typeof pathRet === 'string') {
      ret = pathRet;
    } else {
      if ("development" !== 'production' && !this._isSilentTranslationWarn(key) && !this._isSilentFallback(locale, key)) {
        warn("Value of key '" + key + "' is not a string!");
      }

      return null;
    }
  } // Check for the existence of links within the translated string


  if (ret.indexOf('@:') >= 0 || ret.indexOf('@.') >= 0) {
    ret = this._link(locale, message, ret, host, 'raw', values, visitedLinkStack);
  }

  return this._render(ret, interpolateMode, values, key);
};

VueI18n.prototype._link = function _link(locale, message, str, host, interpolateMode, values, visitedLinkStack) {
  var ret = str; // Match all the links within the local
  // We are going to replace each of
  // them with its translation

  var matches = ret.match(linkKeyMatcher);

  for (var idx in matches) {
    // ie compatible: filter custom array
    // prototype method
    if (!matches.hasOwnProperty(idx)) {
      continue;
    }

    var link = matches[idx];
    var linkKeyPrefixMatches = link.match(linkKeyPrefixMatcher);
    var linkPrefix = linkKeyPrefixMatches[0];
    var formatterName = linkKeyPrefixMatches[1]; // Remove the leading @:, @.case: and the brackets

    var linkPlaceholder = link.replace(linkPrefix, '').replace(bracketsMatcher, '');

    if (visitedLinkStack.includes(linkPlaceholder)) {
      if ("development" !== 'production') {
        warn("Circular reference found. \"" + link + "\" is already visited in the chain of " + visitedLinkStack.reverse().join(' <- '));
      }

      return ret;
    }

    visitedLinkStack.push(linkPlaceholder); // Translate the link

    var translated = this._interpolate(locale, message, linkPlaceholder, host, interpolateMode === 'raw' ? 'string' : interpolateMode, interpolateMode === 'raw' ? undefined : values, visitedLinkStack);

    if (this._isFallbackRoot(translated)) {
      if ("development" !== 'production' && !this._isSilentTranslationWarn(linkPlaceholder)) {
        warn("Fall back to translate the link placeholder '" + linkPlaceholder + "' with root locale.");
      }
      /* istanbul ignore if */


      if (!this._root) {
        throw Error('unexpected error');
      }

      var root = this._root.$i18n;
      translated = root._translate(root._getMessages(), root.locale, root.fallbackLocale, linkPlaceholder, host, interpolateMode, values);
    }

    translated = this._warnDefault(locale, linkPlaceholder, translated, host, Array.isArray(values) ? values : [values]);

    if (this._modifiers.hasOwnProperty(formatterName)) {
      translated = this._modifiers[formatterName](translated);
    } else if (defaultModifiers.hasOwnProperty(formatterName)) {
      translated = defaultModifiers[formatterName](translated);
    }

    visitedLinkStack.pop(); // Replace the link with the translated

    ret = !translated ? ret : ret.replace(link, translated);
  }

  return ret;
};

VueI18n.prototype._render = function _render(message, interpolateMode, values, path) {
  var ret = this._formatter.interpolate(message, values, path); // If the custom formatter refuses to work - apply the default one


  if (!ret) {
    ret = defaultFormatter.interpolate(message, values, path);
  } // if interpolateMode is **not** 'string' ('row'),
  // return the compiled data (e.g. ['foo', VNode, 'bar']) with formatter


  return interpolateMode === 'string' ? ret.join('') : ret;
};

VueI18n.prototype._translate = function _translate(messages, locale, fallback, key, host, interpolateMode, args) {
  var res = this._interpolate(locale, messages[locale], key, host, interpolateMode, args, [key]);

  if (!isNull(res)) {
    return res;
  }

  res = this._interpolate(fallback, messages[fallback], key, host, interpolateMode, args, [key]);

  if (!isNull(res)) {
    if ("development" !== 'production' && !this._isSilentTranslationWarn(key) && !this._isSilentFallbackWarn(key)) {
      warn("Fall back to translate the keypath '" + key + "' with '" + fallback + "' locale.");
    }

    return res;
  } else {
    return null;
  }
};

VueI18n.prototype._t = function _t(key, _locale, messages, host) {
  var ref;
  var values = [],
      len = arguments.length - 4;

  while (len-- > 0) values[len] = arguments[len + 4];

  if (!key) {
    return '';
  }

  var parsedArgs = parseArgs.apply(void 0, values);
  var locale = parsedArgs.locale || _locale;

  var ret = this._translate(messages, locale, this.fallbackLocale, key, host, 'string', parsedArgs.params);

  if (this._isFallbackRoot(ret)) {
    if ("development" !== 'production' && !this._isSilentTranslationWarn(key) && !this._isSilentFallbackWarn(key)) {
      warn("Fall back to translate the keypath '" + key + "' with root locale.");
    }
    /* istanbul ignore if */


    if (!this._root) {
      throw Error('unexpected error');
    }

    return (ref = this._root).$t.apply(ref, [key].concat(values));
  } else {
    return this._warnDefault(locale, key, ret, host, values);
  }
};

VueI18n.prototype.t = function t(key) {
  var ref;
  var values = [],
      len = arguments.length - 1;

  while (len-- > 0) values[len] = arguments[len + 1];

  return (ref = this)._t.apply(ref, [key, this.locale, this._getMessages(), null].concat(values));
};

VueI18n.prototype._i = function _i(key, locale, messages, host, values) {
  var ret = this._translate(messages, locale, this.fallbackLocale, key, host, 'raw', values);

  if (this._isFallbackRoot(ret)) {
    if ("development" !== 'production' && !this._isSilentTranslationWarn(key)) {
      warn("Fall back to interpolate the keypath '" + key + "' with root locale.");
    }

    if (!this._root) {
      throw Error('unexpected error');
    }

    return this._root.$i18n.i(key, locale, values);
  } else {
    return this._warnDefault(locale, key, ret, host, [values]);
  }
};

VueI18n.prototype.i = function i(key, locale, values) {
  /* istanbul ignore if */
  if (!key) {
    return '';
  }

  if (typeof locale !== 'string') {
    locale = this.locale;
  }

  return this._i(key, locale, this._getMessages(), null, values);
};

VueI18n.prototype._tc = function _tc(key, _locale, messages, host, choice) {
  var ref;
  var values = [],
      len = arguments.length - 5;

  while (len-- > 0) values[len] = arguments[len + 5];

  if (!key) {
    return '';
  }

  if (choice === undefined) {
    choice = 1;
  }

  var predefined = {
    'count': choice,
    'n': choice
  };
  var parsedArgs = parseArgs.apply(void 0, values);
  parsedArgs.params = Object.assign(predefined, parsedArgs.params);
  values = parsedArgs.locale === null ? [parsedArgs.params] : [parsedArgs.locale, parsedArgs.params];
  return this.fetchChoice((ref = this)._t.apply(ref, [key, _locale, messages, host].concat(values)), choice);
};

VueI18n.prototype.fetchChoice = function fetchChoice(message, choice) {
  /* istanbul ignore if */
  if (!message && typeof message !== 'string') {
    return null;
  }

  var choices = message.split('|');
  choice = this.getChoiceIndex(choice, choices.length);

  if (!choices[choice]) {
    return message;
  }

  return choices[choice].trim();
};
/**
 * @param choice {number} a choice index given by the input to $tc: `$tc('path.to.rule', choiceIndex)`
 * @param choicesLength {number} an overall amount of available choices
 * @returns a final choice index
*/


VueI18n.prototype.getChoiceIndex = function getChoiceIndex(choice, choicesLength) {
  // Default (old) getChoiceIndex implementation - english-compatible
  var defaultImpl = function (_choice, _choicesLength) {
    _choice = Math.abs(_choice);

    if (_choicesLength === 2) {
      return _choice ? _choice > 1 ? 1 : 0 : 1;
    }

    return _choice ? Math.min(_choice, 2) : 0;
  };

  if (this.locale in this.pluralizationRules) {
    return this.pluralizationRules[this.locale].apply(this, [choice, choicesLength]);
  } else {
    return defaultImpl(choice, choicesLength);
  }
};

VueI18n.prototype.tc = function tc(key, choice) {
  var ref;
  var values = [],
      len = arguments.length - 2;

  while (len-- > 0) values[len] = arguments[len + 2];

  return (ref = this)._tc.apply(ref, [key, this.locale, this._getMessages(), null, choice].concat(values));
};

VueI18n.prototype._te = function _te(key, locale, messages) {
  var args = [],
      len = arguments.length - 3;

  while (len-- > 0) args[len] = arguments[len + 3];

  var _locale = parseArgs.apply(void 0, args).locale || locale;

  return this._exist(messages[_locale], key);
};

VueI18n.prototype.te = function te(key, locale) {
  return this._te(key, this.locale, this._getMessages(), locale);
};

VueI18n.prototype.getLocaleMessage = function getLocaleMessage(locale) {
  return looseClone(this._vm.messages[locale] || {});
};

VueI18n.prototype.setLocaleMessage = function setLocaleMessage(locale, message) {
  if (this._warnHtmlInMessage === 'warn' || this._warnHtmlInMessage === 'error') {
    this._checkLocaleMessage(locale, this._warnHtmlInMessage, message);

    if (this._warnHtmlInMessage === 'error') {
      return;
    }
  }

  this._vm.$set(this._vm.messages, locale, message);
};

VueI18n.prototype.mergeLocaleMessage = function mergeLocaleMessage(locale, message) {
  if (this._warnHtmlInMessage === 'warn' || this._warnHtmlInMessage === 'error') {
    this._checkLocaleMessage(locale, this._warnHtmlInMessage, message);

    if (this._warnHtmlInMessage === 'error') {
      return;
    }
  }

  this._vm.$set(this._vm.messages, locale, merge(this._vm.messages[locale] || {}, message));
};

VueI18n.prototype.getDateTimeFormat = function getDateTimeFormat(locale) {
  return looseClone(this._vm.dateTimeFormats[locale] || {});
};

VueI18n.prototype.setDateTimeFormat = function setDateTimeFormat(locale, format) {
  this._vm.$set(this._vm.dateTimeFormats, locale, format);
};

VueI18n.prototype.mergeDateTimeFormat = function mergeDateTimeFormat(locale, format) {
  this._vm.$set(this._vm.dateTimeFormats, locale, merge(this._vm.dateTimeFormats[locale] || {}, format));
};

VueI18n.prototype._localizeDateTime = function _localizeDateTime(value, locale, fallback, dateTimeFormats, key) {
  var _locale = locale;
  var formats = dateTimeFormats[_locale]; // fallback locale

  if (isNull(formats) || isNull(formats[key])) {
    if ("development" !== 'production' && !this._isSilentTranslationWarn(key) && !this._isSilentFallbackWarn(key)) {
      warn("Fall back to '" + fallback + "' datetime formats from '" + locale + "' datetime formats.");
    }

    _locale = fallback;
    formats = dateTimeFormats[_locale];
  }

  if (isNull(formats) || isNull(formats[key])) {
    return null;
  } else {
    var format = formats[key];
    var id = _locale + "__" + key;
    var formatter = this._dateTimeFormatters[id];

    if (!formatter) {
      formatter = this._dateTimeFormatters[id] = new Intl.DateTimeFormat(_locale, format);
    }

    return formatter.format(value);
  }
};

VueI18n.prototype._d = function _d(value, locale, key) {
  /* istanbul ignore if */
  if ("development" !== 'production' && !VueI18n.availabilities.dateTimeFormat) {
    warn('Cannot format a Date value due to not supported Intl.DateTimeFormat.');
    return '';
  }

  if (!key) {
    return new Intl.DateTimeFormat(locale).format(value);
  }

  var ret = this._localizeDateTime(value, locale, this.fallbackLocale, this._getDateTimeFormats(), key);

  if (this._isFallbackRoot(ret)) {
    if ("development" !== 'production' && !this._isSilentTranslationWarn(key) && !this._isSilentFallbackWarn(key)) {
      warn("Fall back to datetime localization of root: key '" + key + "'.");
    }
    /* istanbul ignore if */


    if (!this._root) {
      throw Error('unexpected error');
    }

    return this._root.$i18n.d(value, key, locale);
  } else {
    return ret || '';
  }
};

VueI18n.prototype.d = function d(value) {
  var args = [],
      len = arguments.length - 1;

  while (len-- > 0) args[len] = arguments[len + 1];

  var locale = this.locale;
  var key = null;

  if (args.length === 1) {
    if (typeof args[0] === 'string') {
      key = args[0];
    } else if (isObject(args[0])) {
      if (args[0].locale) {
        locale = args[0].locale;
      }

      if (args[0].key) {
        key = args[0].key;
      }
    }
  } else if (args.length === 2) {
    if (typeof args[0] === 'string') {
      key = args[0];
    }

    if (typeof args[1] === 'string') {
      locale = args[1];
    }
  }

  return this._d(value, locale, key);
};

VueI18n.prototype.getNumberFormat = function getNumberFormat(locale) {
  return looseClone(this._vm.numberFormats[locale] || {});
};

VueI18n.prototype.setNumberFormat = function setNumberFormat(locale, format) {
  this._vm.$set(this._vm.numberFormats, locale, format);
};

VueI18n.prototype.mergeNumberFormat = function mergeNumberFormat(locale, format) {
  this._vm.$set(this._vm.numberFormats, locale, merge(this._vm.numberFormats[locale] || {}, format));
};

VueI18n.prototype._getNumberFormatter = function _getNumberFormatter(value, locale, fallback, numberFormats, key, options) {
  var _locale = locale;
  var formats = numberFormats[_locale]; // fallback locale

  if (isNull(formats) || isNull(formats[key])) {
    if ("development" !== 'production' && !this._isSilentTranslationWarn(key) && !this._isSilentFallbackWarn(key)) {
      warn("Fall back to '" + fallback + "' number formats from '" + locale + "' number formats.");
    }

    _locale = fallback;
    formats = numberFormats[_locale];
  }

  if (isNull(formats) || isNull(formats[key])) {
    return null;
  } else {
    var format = formats[key];
    var formatter;

    if (options) {
      // If options specified - create one time number formatter
      formatter = new Intl.NumberFormat(_locale, Object.assign({}, format, options));
    } else {
      var id = _locale + "__" + key;
      formatter = this._numberFormatters[id];

      if (!formatter) {
        formatter = this._numberFormatters[id] = new Intl.NumberFormat(_locale, format);
      }
    }

    return formatter;
  }
};

VueI18n.prototype._n = function _n(value, locale, key, options) {
  /* istanbul ignore if */
  if (!VueI18n.availabilities.numberFormat) {
    if ("development" !== 'production') {
      warn('Cannot format a Number value due to not supported Intl.NumberFormat.');
    }

    return '';
  }

  if (!key) {
    var nf = !options ? new Intl.NumberFormat(locale) : new Intl.NumberFormat(locale, options);
    return nf.format(value);
  }

  var formatter = this._getNumberFormatter(value, locale, this.fallbackLocale, this._getNumberFormats(), key, options);

  var ret = formatter && formatter.format(value);

  if (this._isFallbackRoot(ret)) {
    if ("development" !== 'production' && !this._isSilentTranslationWarn(key) && !this._isSilentFallbackWarn(key)) {
      warn("Fall back to number localization of root: key '" + key + "'.");
    }
    /* istanbul ignore if */


    if (!this._root) {
      throw Error('unexpected error');
    }

    return this._root.$i18n.n(value, Object.assign({}, {
      key: key,
      locale: locale
    }, options));
  } else {
    return ret || '';
  }
};

VueI18n.prototype.n = function n(value) {
  var args = [],
      len = arguments.length - 1;

  while (len-- > 0) args[len] = arguments[len + 1];

  var locale = this.locale;
  var key = null;
  var options = null;

  if (args.length === 1) {
    if (typeof args[0] === 'string') {
      key = args[0];
    } else if (isObject(args[0])) {
      if (args[0].locale) {
        locale = args[0].locale;
      }

      if (args[0].key) {
        key = args[0].key;
      } // Filter out number format options only


      options = Object.keys(args[0]).reduce(function (acc, key) {
        var obj;

        if (numberFormatKeys.includes(key)) {
          return Object.assign({}, acc, (obj = {}, obj[key] = args[0][key], obj));
        }

        return acc;
      }, null);
    }
  } else if (args.length === 2) {
    if (typeof args[0] === 'string') {
      key = args[0];
    }

    if (typeof args[1] === 'string') {
      locale = args[1];
    }
  }

  return this._n(value, locale, key, options);
};

VueI18n.prototype._ntp = function _ntp(value, locale, key, options) {
  /* istanbul ignore if */
  if (!VueI18n.availabilities.numberFormat) {
    if ("development" !== 'production') {
      warn('Cannot format to parts a Number value due to not supported Intl.NumberFormat.');
    }

    return [];
  }

  if (!key) {
    var nf = !options ? new Intl.NumberFormat(locale) : new Intl.NumberFormat(locale, options);
    return nf.formatToParts(value);
  }

  var formatter = this._getNumberFormatter(value, locale, this.fallbackLocale, this._getNumberFormats(), key, options);

  var ret = formatter && formatter.formatToParts(value);

  if (this._isFallbackRoot(ret)) {
    if ("development" !== 'production' && !this._isSilentTranslationWarn(key)) {
      warn("Fall back to format number to parts of root: key '" + key + "' .");
    }
    /* istanbul ignore if */


    if (!this._root) {
      throw Error('unexpected error');
    }

    return this._root.$i18n._ntp(value, locale, key, options);
  } else {
    return ret || [];
  }
};

Object.defineProperties(VueI18n.prototype, prototypeAccessors);
var availabilities; // $FlowFixMe

Object.defineProperty(VueI18n, 'availabilities', {
  get: function get() {
    if (!availabilities) {
      var intlDefined = typeof Intl !== 'undefined';
      availabilities = {
        dateTimeFormat: intlDefined && typeof Intl.DateTimeFormat !== 'undefined',
        numberFormat: intlDefined && typeof Intl.NumberFormat !== 'undefined'
      };
    }

    return availabilities;
  }
});
VueI18n.install = install;
VueI18n.version = '8.15.0';
var _default = VueI18n;
exports.default = _default;
},{}],"_locales/ja_JP.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  'confirm-text': '決定',
  'cancel-text': 'キャンセル',
  'input-encoded-string': 'エンコードされた文字列を入力',
  'copied': 'コピーした',
  'copy-following-encoded-string': '以下のエンコードされた文字列をコピーしてください',
  'import': '導入',
  'export': '導出',
  'clear': 'クリア'
};
exports.default = _default;
},{}],"_locales/zh_TW.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  'confirm-text': '確定',
  'cancel-text': '取消',
  'input-encoded-string': '輸入編碼字串',
  'copied': '已複製到剪貼簿',
  'copy-following-encoded-string': '請複製以下編碼字串',
  'import': '匯入',
  'export': '匯出',
  'clear': '清空'
};
exports.default = _default;
},{}],"i18n.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueI18n = _interopRequireDefault(require("vue-i18n"));

var _ja_JP = _interopRequireDefault(require("./_locales/ja_JP"));

var _zh_TW = _interopRequireDefault(require("./_locales/zh_TW"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue.default.use(_vueI18n.default);

var _default = new _vueI18n.default({
  locale: 'ja-JP',
  fallbackLocale: 'ja-JP',
  messages: {
    'ja-JP': _ja_JP.default,
    'zh-TW': _zh_TW.default
  }
});

exports.default = _default;
},{"vue":"../node_modules/vue/dist/vue.runtime.esm.js","vue-i18n":"../node_modules/vue-i18n/dist/vue-i18n.esm.js","./_locales/ja_JP":"_locales/ja_JP.js","./_locales/zh_TW":"_locales/zh_TW.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _vueClipboard = _interopRequireDefault(require("vue-clipboard2"));

var _components = require("vue-material/dist/components");

require("vue-material/dist/vue-material.min.css");

require("vue-material/dist/theme/default.css");

var _index = _interopRequireDefault(require("./index.vue"));

var _i18n = _interopRequireDefault(require("./i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue.default.use(_vueClipboard.default);

_vue.default.use(_components.MdField);

_vue.default.use(_components.MdDialog);

_vue.default.use(_components.MdButton);

_vue.default.use(_components.MdToolbar);

_vue.default.use(_components.MdDialogAlert);

_vue.default.use(_components.MdDialogPrompt);

new _vue.default({
  i18n: _i18n.default,
  mounted: function mounted() {
    this.$i18n.locale = navigator.language;
  },
  render: function render(h) {
    return h(_index.default);
  }
}).$mount('#app');
},{"vue":"../node_modules/vue/dist/vue.runtime.esm.js","vue-clipboard2":"../node_modules/vue-clipboard2/vue-clipboard.js","vue-material/dist/components":"../node_modules/vue-material/dist/components/index.js","vue-material/dist/vue-material.min.css":"../node_modules/vue-material/dist/vue-material.min.css","vue-material/dist/theme/default.css":"../node_modules/vue-material/dist/theme/default.css","./index.vue":"index.vue","./i18n":"i18n.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "46247" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/src.e31bb0bc.js.map