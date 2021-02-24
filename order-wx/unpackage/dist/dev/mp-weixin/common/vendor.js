(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],[
/* 0 */,
/* 1 */
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

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
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
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

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


// import navigateTo from 'uni-helpers/navigate-to'

function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}
var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: {
    returnValue: addSafeAreaInsets },

  getSystemInfoSync: {
    returnValue: addSafeAreaInsets } };


var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_NAME":"order-wx","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // 用于字节跳动小程序模拟抽象节点
    properties.generic = {
      type: Object,
      value: null };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          // eslint-disable-next-line no-sparse-arrays
          ret.push(handler.apply(handlerCtx, (Array.isArray(params) ? params : []).concat([,,,,,,,,,, event])));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector);
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || component;
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

var eventChannels = {};

var eventChannelStack = [];

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

function createApp(vm) {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),
/* 2 */
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2020 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
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
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
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
});

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
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
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
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
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
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
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

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
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
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
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
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
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
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
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
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
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
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
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
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
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
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
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
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
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
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
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
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
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

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
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

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
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
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
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
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
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

function nextTick (cb, ctx) {
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
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
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
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
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
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
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

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
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
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
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
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i++, i)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
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
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
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

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
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
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
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
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
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
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
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
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
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
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
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

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
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
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
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
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
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
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
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
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
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
    return vm
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
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
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

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
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
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
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

function callHook (vm, hook) {
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
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
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
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
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
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
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
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
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
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
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
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
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
Watcher.prototype.cleanupDeps = function cleanupDeps () {
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
Watcher.prototype.update = function update () {
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
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
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
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
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

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
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

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
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

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
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

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
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
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
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

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
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

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
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
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
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
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_NAME":"order-wx","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_NAME":"order-wx","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_NAME":"order-wx","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_NAME":"order-wx","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

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
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),
/* 3 */
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 4 */
/*!************************************************************!*\
  !*** C:/Users/15277/Desktop/order-app/order-wx/pages.json ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 11 */
/*!******************************************************************************!*\
  !*** C:/Users/15277/Desktop/order-app/order-wx/static/iconfont/iconfont.css ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),
/* 12 */
/*!**************************************************************!*\
  !*** C:/Users/15277/Desktop/order-app/order-wx/http/http.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}var request = function request(url, type) {var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var header = arguments.length > 3 ? arguments[3] : undefined;
  return new Promise(function (resolve, reject) {
    uni.request({
      method: type,
      url: url,
      data: data,
      header: header,
      dataType: 'json' }).
    then(function (response) {var _response = _slicedToArray(
      response, 2),error = _response[0],res = _response[1];
      resolve(res.data);
    }).catch(function (error) {var _error = _slicedToArray(
      error, 2),err = _error[0],res = _error[1];
      reject(err);
    });
  });
};var _default =
request;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 13 */
/*!********************************************************************************!*\
  !*** C:/Users/15277/Desktop/order-app/order-wx/node_modules/uview-ui/index.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
var _mixin = _interopRequireDefault(__webpack_require__(/*! ./libs/mixin/mixin.js */ 14));



var _request = _interopRequireDefault(__webpack_require__(/*! ./libs/request */ 15));




















var _queryParams = _interopRequireDefault(__webpack_require__(/*! ./libs/function/queryParams.js */ 19));

var _route = _interopRequireDefault(__webpack_require__(/*! ./libs/function/route.js */ 20));

var _timeFormat = _interopRequireDefault(__webpack_require__(/*! ./libs/function/timeFormat.js */ 24));

var _timeFrom = _interopRequireDefault(__webpack_require__(/*! ./libs/function/timeFrom.js */ 25));

var _colorGradient = _interopRequireDefault(__webpack_require__(/*! ./libs/function/colorGradient.js */ 26));

var _guid = _interopRequireDefault(__webpack_require__(/*! ./libs/function/guid.js */ 27));

var _color = _interopRequireDefault(__webpack_require__(/*! ./libs/function/color.js */ 28));

var _type2icon = _interopRequireDefault(__webpack_require__(/*! ./libs/function/type2icon.js */ 29));

var _randomArray = _interopRequireDefault(__webpack_require__(/*! ./libs/function/randomArray.js */ 30));

var _deepClone = _interopRequireDefault(__webpack_require__(/*! ./libs/function/deepClone.js */ 17));

var _deepMerge = _interopRequireDefault(__webpack_require__(/*! ./libs/function/deepMerge.js */ 16));

var _addUnit = _interopRequireDefault(__webpack_require__(/*! ./libs/function/addUnit.js */ 31));


var _test = _interopRequireDefault(__webpack_require__(/*! ./libs/function/test.js */ 18));

var _random = _interopRequireDefault(__webpack_require__(/*! ./libs/function/random.js */ 32));

var _trim = _interopRequireDefault(__webpack_require__(/*! ./libs/function/trim.js */ 33));

var _toast = _interopRequireDefault(__webpack_require__(/*! ./libs/function/toast.js */ 34));

var _getParent = _interopRequireDefault(__webpack_require__(/*! ./libs/function/getParent.js */ 35));

var _$parent = _interopRequireDefault(__webpack_require__(/*! ./libs/function/$parent.js */ 36));



var _sys = __webpack_require__(/*! ./libs/function/sys.js */ 37);

var _debounce = _interopRequireDefault(__webpack_require__(/*! ./libs/function/debounce.js */ 38));

var _throttle = _interopRequireDefault(__webpack_require__(/*! ./libs/function/throttle.js */ 39));



var _config = _interopRequireDefault(__webpack_require__(/*! ./libs/config/config.js */ 40));

var _zIndex = _interopRequireDefault(__webpack_require__(/*! ./libs/config/zIndex.js */ 41));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // 引入全局mixin
// 引入关于是否mixin集成小程序分享的配置
// import wxshare from './libs/mixin/mpShare.js'
// 全局挂载引入http相关请求拦截插件
function wranning(str) {// 开发环境进行信息输出,主要是一些报错信息
  // 这个环境的来由是在程序编写时候,点击hx编辑器运行调试代码的时候,详见:
  // 	https://uniapp.dcloud.io/frame?id=%e5%bc%80%e5%8f%91%e7%8e%af%e5%a2%83%e5%92%8c%e7%94%9f%e4%ba%a7%e7%8e%af%e5%a2%83
  if (true) {console.warn(str);}} // 尝试判断在根目录的/store中是否有$u.mixin.js，此文件uView默认为需要挂在到全局的vuex的state变量
// HX2.6.11版本,放到try中,控制台依然会警告,暂时不用此方式，
// let vuexStore = {};
// try {
// 	vuexStore = require("@/store/$u.mixin.js");
// } catch (e) {
// 	//TODO handle the exception
// }
// post类型对象参数转为get类型url参数
var $u = { queryParams: _queryParams.default, route: _route.default, timeFormat: _timeFormat.default, date: _timeFormat.default, // 另名date
  timeFrom: _timeFrom.default, colorGradient: _colorGradient.default.colorGradient, colorToRgba: _colorGradient.default.colorToRgba, guid: _guid.default, color: _color.default, sys: _sys.sys, os: _sys.os, type2icon: _type2icon.default, randomArray: _randomArray.default, wranning: wranning, get: _request.default.get,
  post: _request.default.post,
  put: _request.default.put,
  'delete': _request.default.delete,
  hexToRgb: _colorGradient.default.hexToRgb,
  rgbToHex: _colorGradient.default.rgbToHex,
  test: _test.default,
  random: _random.default,
  deepClone: _deepClone.default,
  deepMerge: _deepMerge.default,
  getParent: _getParent.default,
  $parent: _$parent.default,
  addUnit: _addUnit.default,
  trim: _trim.default,
  type: ['primary', 'success', 'error', 'warning', 'info'],
  http: _request.default,
  toast: _toast.default,
  config: _config.default, // uView配置信息相关，比如版本号
  zIndex: _zIndex.default,
  debounce: _debounce.default,
  throttle: _throttle.default };


// $u挂载到uni对象上
uni.$u = $u;

var install = function install(Vue) {
  Vue.mixin(_mixin.default);
  if (Vue.prototype.openShare) {
    Vue.mixin(mpShare);
  }
  // Vue.mixin(vuexStore);
  // 时间格式化，同时两个名称，date和timeFormat
  Vue.filter('timeFormat', function (timestamp, format) {
    return (0, _timeFormat.default)(timestamp, format);
  });
  Vue.filter('date', function (timestamp, format) {
    return (0, _timeFormat.default)(timestamp, format);
  });
  // 将多久以前的方法，注入到全局过滤器
  Vue.filter('timeFrom', function (timestamp, format) {
    return (0, _timeFrom.default)(timestamp, format);
  });
  Vue.prototype.$u = $u;
};var _default =

{
  install: install };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 14 */
/*!*******************************************************************************************!*\
  !*** C:/Users/15277/Desktop/order-app/order-wx/node_modules/uview-ui/libs/mixin/mixin.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni) {module.exports = {
  data: function data() {
    return {};
  },
  onLoad: function onLoad() {
    // getRect挂载到$u上，因为这方法需要使用in(this)，所以无法把它独立成一个单独的文件导出
    this.$u.getRect = this.$uGetRect;
  },
  methods: {
    // 查询节点信息
    // 目前此方法在支付宝小程序中无法获取组件跟接点的尺寸，为支付宝的bug(2020-07-21)
    // 解决办法为在组件根部再套一个没有任何作用的view元素
    $uGetRect: function $uGetRect(selector, all) {var _this = this;
      return new Promise(function (resolve) {
        uni.createSelectorQuery().
        in(_this)[all ? 'selectAll' : 'select'](selector).
        boundingClientRect(function (rect) {
          if (all && Array.isArray(rect) && rect.length) {
            resolve(rect);
          }
          if (!all && rect) {
            resolve(rect);
          }
        }).
        exec();
      });
    },
    getParentData: function getParentData() {var _this2 = this;var parentName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      // 避免在created中去定义parent变量
      if (!this.parent) this.parent = false;
      // 这里的本质原理是，通过获取父组件实例(也即u-radio-group的this)
      // 将父组件this中对应的参数，赋值给本组件(u-radio的this)的parentData对象中对应的属性
      // 之所以需要这么做，是因为所有端中，头条小程序不支持通过this.parent.xxx去监听父组件参数的变化
      this.parent = this.$u.$parent.call(this, parentName);
      if (this.parent) {
        // 历遍parentData中的属性，将parent中的同名属性赋值给parentData
        Object.keys(this.parentData).map(function (key) {
          _this2.parentData[key] = _this2.parent[key];
        });
      }
    },
    // 阻止事件冒泡
    preventEvent: function preventEvent(e) {
      e && e.stopPropagation && e.stopPropagation();
    } },

  onReachBottom: function onReachBottom() {
    uni.$emit('uOnReachBottom');
  },
  beforeDestroy: function beforeDestroy() {var _this3 = this;
    // 判断当前页面是否存在parent和chldren，一般在checkbox和checkbox-group父子联动的场景会有此情况
    // 组件销毁时，移除子组件在父组件children数组中的实例，释放资源，避免数据混乱
    if (this.parent && uni.$u.test.array(this.parent.children)) {
      // 组件销毁时，移除父组件中的children数组中对应的实例
      var childrenList = this.parent.children;
      childrenList.map(function (child, index) {
        // 如果相等，则移除
        if (child === _this3) {
          childrenList.splice(index, 1);
        }
      });
    }
  } };
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 15 */
/*!*********************************************************************************************!*\
  !*** C:/Users/15277/Desktop/order-app/order-wx/node_modules/uview-ui/libs/request/index.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _deepMerge = _interopRequireDefault(__webpack_require__(/*! ../function/deepMerge */ 16));
var _test = _interopRequireDefault(__webpack_require__(/*! ../function/test */ 18));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var
Request = /*#__PURE__*/function () {_createClass(Request, [{ key: "setConfig",
    // 设置全局默认配置
    value: function setConfig(customConfig) {
      // 深度合并对象，否则会造成对象深层属性丢失
      this.config = (0, _deepMerge.default)(this.config, customConfig);
    }

    // 主要请求部分
  }, { key: "request", value: function request() {var _this = this;var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      // 检查请求拦截
      if (this.interceptor.request && typeof this.interceptor.request === 'function') {
        var tmpConfig = {};
        var interceptorRequest = this.interceptor.request(options);
        if (interceptorRequest === false) {
          // 返回一个处于pending状态中的Promise，来取消原promise，避免进入then()回调
          return new Promise(function () {});
        }
        this.options = interceptorRequest;
      }
      options.dataType = options.dataType || this.config.dataType;
      options.responseType = options.responseType || this.config.responseType;
      options.url = options.url || '';
      options.params = options.params || {};
      options.header = Object.assign({}, this.config.header, options.header);
      options.method = options.method || this.config.method;

      return new Promise(function (resolve, reject) {
        options.complete = function (response) {
          // 请求返回后，隐藏loading(如果请求返回快的话，可能会没有loading)
          uni.hideLoading();
          // 清除定时器，如果请求回来了，就无需loading
          clearTimeout(_this.config.timer);
          _this.config.timer = null;
          // 判断用户对拦截返回数据的要求，如果originalData为true，返回所有的数据(response)到拦截器，否则只返回response.data
          if (_this.config.originalData) {
            // 判断是否存在拦截器
            if (_this.interceptor.response && typeof _this.interceptor.response === 'function') {
              var resInterceptors = _this.interceptor.response(response);
              // 如果拦截器不返回false，就将拦截器返回的内容给this.$u.post的then回调
              if (resInterceptors !== false) {
                resolve(resInterceptors);
              } else {
                // 如果拦截器返回false，意味着拦截器定义者认为返回有问题，直接接入catch回调
                reject(response);
              }
            } else {
              // 如果要求返回原始数据，就算没有拦截器，也返回最原始的数据
              resolve(response);
            }
          } else {
            if (response.statusCode == 200) {
              if (_this.interceptor.response && typeof _this.interceptor.response === 'function') {
                var _resInterceptors = _this.interceptor.response(response.data);
                if (_resInterceptors !== false) {
                  resolve(_resInterceptors);
                } else {
                  reject(response.data);
                }
              } else {
                // 如果不是返回原始数据(originalData=false)，且没有拦截器的情况下，返回纯数据给then回调
                resolve(response.data);
              }
            } else {
              // 不返回原始数据的情况下，服务器状态码不为200，modal弹框提示
              // if(response.errMsg) {
              // 	uni.showModal({
              // 		title: response.errMsg
              // 	});
              // }
              reject(response);
            }
          }
        };

        // 判断用户传递的URL是否/开头,如果不是,加上/，这里使用了uView的test.js验证库的url()方法
        options.url = _test.default.url(options.url) ? options.url : _this.config.baseUrl + (options.url.indexOf('/') == 0 ?
        options.url : '/' + options.url);

        // 是否显示loading
        // 加一个是否已有timer定时器的判断，否则有两个同时请求的时候，后者会清除前者的定时器id
        // 而没有清除前者的定时器，导致前者超时，一直显示loading
        if (_this.config.showLoading && !_this.config.timer) {
          _this.config.timer = setTimeout(function () {
            uni.showLoading({
              title: _this.config.loadingText,
              mask: _this.config.loadingMask });

            _this.config.timer = null;
          }, _this.config.loadingTime);
        }
        uni.request(options);
      });
      // .catch(res => {
      // 	// 如果返回reject()，不让其进入this.$u.post().then().catch()后面的catct()
      // 	// 因为很多人都会忘了写后面的catch()，导致报错捕获不到catch
      // 	return new Promise(()=>{});
      // })
    } }]);

  function Request() {var _this2 = this;_classCallCheck(this, Request);
    this.config = {
      baseUrl: '', // 请求的根域名
      // 默认的请求头
      header: {},
      method: 'POST',
      // 设置为json，返回后uni.request会对数据进行一次JSON.parse
      dataType: 'json',
      // 此参数无需处理，因为5+和支付宝小程序不支持，默认为text即可
      responseType: 'text',
      showLoading: true, // 是否显示请求中的loading
      loadingText: '请求中...',
      loadingTime: 800, // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
      timer: null, // 定时器
      originalData: false, // 是否在拦截器中返回服务端的原始数据，见文档说明
      loadingMask: true // 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透
    };

    // 拦截器
    this.interceptor = {
      // 请求前的拦截
      request: null,
      // 请求后的拦截
      response: null };


    // get请求
    this.get = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        method: 'GET',
        url: url,
        header: header,
        data: data });

    };

    // post请求
    this.post = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        url: url,
        method: 'POST',
        header: header,
        data: data });

    };

    // put请求，不支持支付宝小程序(HX2.6.15)
    this.put = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        url: url,
        method: 'PUT',
        header: header,
        data: data });

    };

    // delete请求，不支持支付宝和头条小程序(HX2.6.15)
    this.delete = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        url: url,
        method: 'DELETE',
        header: header,
        data: data });

    };
  }return Request;}();var _default =

new Request();exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 16 */
/*!**************************************************************************************************!*\
  !*** C:/Users/15277/Desktop/order-app/order-wx/node_modules/uview-ui/libs/function/deepMerge.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _deepClone = _interopRequireDefault(__webpack_require__(/*! ./deepClone */ 17));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

// JS对象深度合并
function deepMerge() {var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var source = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  target = (0, _deepClone.default)(target);
  if (typeof target !== 'object' || typeof source !== 'object') return false;
  for (var prop in source) {
    if (!source.hasOwnProperty(prop)) continue;
    if (prop in target) {
      if (typeof target[prop] !== 'object') {
        target[prop] = source[prop];
      } else {
        if (typeof source[prop] !== 'object') {
          target[prop] = source[prop];
        } else {
          if (target[prop].concat && source[prop].concat) {
            target[prop] = target[prop].concat(source[prop]);
          } else {
            target[prop] = deepMerge(target[prop], source[prop]);
          }
        }
      }
    } else {
      target[prop] = source[prop];
    }
  }
  return target;
}var _default =

deepMerge;exports.default = _default;

/***/ }),
/* 17 */
/*!**************************************************************************************************!*\
  !*** C:/Users/15277/Desktop/order-app/order-wx/node_modules/uview-ui/libs/function/deepClone.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
  return Object.prototype.toString.call(arr) === '[object Array]';
}

// 深度克隆
function deepClone(obj) {
  // 对常见的“非”值，直接返回原来值
  if ([null, undefined, NaN, false].includes(obj)) return obj;
  if (typeof obj !== "object" && typeof obj !== 'function') {
    //原始类型直接返回
    return obj;
  }
  var o = isArray(obj) ? [] : {};
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      o[i] = typeof obj[i] === "object" ? deepClone(obj[i]) : obj[i];
    }
  }
  return o;
}var _default =

deepClone;exports.default = _default;

/***/ }),
/* 18 */
/*!*********************************************************************************************!*\
  !*** C:/Users/15277/Desktop/order-app/order-wx/node_modules/uview-ui/libs/function/test.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 验证电子邮箱格式
                                                                                                      */
function email(value) {
  return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(value);
}

/**
   * 验证手机格式
   */
function mobile(value) {
  return /^1[23456789]\d{9}$/.test(value);
}

/**
   * 验证URL格式
   */
function url(value) {
  return /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?/.test(value);
}

/**
   * 验证日期格式
   */
function date(value) {
  return !/Invalid|NaN/.test(new Date(value).toString());
}

/**
   * 验证ISO类型的日期格式
   */
function dateISO(value) {
  return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value);
}

/**
   * 验证十进制数字
   */
function number(value) {
  return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
}

/**
   * 验证整数
   */
function digits(value) {
  return /^\d+$/.test(value);
}

/**
   * 验证身份证号码
   */
function idCard(value) {
  return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(
  value);
}

/**
   * 是否车牌号
   */
function carNo(value) {
  // 新能源车牌
  var xreg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;
  // 旧车牌
  var creg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
  if (value.length === 7) {
    return creg.test(value);
  } else if (value.length === 8) {
    return xreg.test(value);
  } else {
    return false;
  }
}

/**
   * 金额,只允许2位小数
   */
function amount(value) {
  //金额，只允许保留两位小数
  return /^[1-9]\d*(,\d{3})*(\.\d{1,2})?$|^0\.\d{1,2}$/.test(value);
}

/**
   * 中文
   */
function chinese(value) {
  var reg = /^[\u4e00-\u9fa5]+$/gi;
  return reg.test(value);
}

/**
   * 只能输入字母
   */
function letter(value) {
  return /^[a-zA-Z]*$/.test(value);
}

/**
   * 只能是字母或者数字
   */
function enOrNum(value) {
  //英文或者数字
  var reg = /^[0-9a-zA-Z]*$/g;
  return reg.test(value);
}

/**
   * 验证是否包含某个值
   */
function contains(value, param) {
  return value.indexOf(param) >= 0;
}

/**
   * 验证一个值范围[min, max]
   */
function range(value, param) {
  return value >= param[0] && value <= param[1];
}

/**
   * 验证一个长度范围[min, max]
   */
function rangeLength(value, param) {
  return value.length >= param[0] && value.length <= param[1];
}

/**
   * 是否固定电话
   */
function landline(value) {
  var reg = /^\d{3,4}-\d{7,8}(-\d{3,4})?$/;
  return reg.test(value);
}

/**
   * 判断是否为空
   */
function empty(value) {
  switch (typeof value) {
    case 'undefined':
      return true;
    case 'string':
      if (value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length == 0) return true;
      break;
    case 'boolean':
      if (!value) return true;
      break;
    case 'number':
      if (0 === value || isNaN(value)) return true;
      break;
    case 'object':
      if (null === value || value.length === 0) return true;
      for (var i in value) {
        return false;
      }
      return true;}

  return false;
}

/**
   * 是否json字符串
   */
function jsonString(value) {
  if (typeof value == 'string') {
    try {
      var obj = JSON.parse(value);
      if (typeof obj == 'object' && obj) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }
  return false;
}


/**
   * 是否数组
   */
function array(value) {
  if (typeof Array.isArray === "function") {
    return Array.isArray(value);
  } else {
    return Object.prototype.toString.call(value) === "[object Array]";
  }
}

/**
   * 是否对象
   */
function object(value) {
  return Object.prototype.toString.call(value) === '[object Object]';
}

/**
   * 是否短信验证码
   */
function code(value) {var len = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 6;
  return new RegExp("^\\d{".concat(len, "}$")).test(value);
}var _default =


{
  email: email,
  mobile: mobile,
  url: url,
  date: date,
  dateISO: dateISO,
  number: number,
  digits: digits,
  idCard: idCard,
  carNo: carNo,
  amount: amount,
  chinese: chinese,
  letter: letter,
  enOrNum: enOrNum,
  contains: contains,
  range: range,
  rangeLength: rangeLength,
  empty: empty,
  isEmpty: empty,
  jsonString: jsonString,
  landline: landline,
  object: object,
  array: array,
  code: code };exports.default = _default;

/***/ }),
/* 19 */
/*!****************************************************************************************************!*\
  !*** C:/Users/15277/Desktop/order-app/order-wx/node_modules/uview-ui/libs/function/queryParams.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 对象转url参数
                                                                                                      * @param {*} data,对象
                                                                                                      * @param {*} isPrefix,是否自动加上"?"
                                                                                                      */
function queryParams() {var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var isPrefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;var arrayFormat = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'brackets';
  var prefix = isPrefix ? '?' : '';
  var _result = [];
  if (['indices', 'brackets', 'repeat', 'comma'].indexOf(arrayFormat) == -1) arrayFormat = 'brackets';var _loop = function _loop(
  key) {
    var value = data[key];
    // 去掉为空的参数
    if (['', undefined, null].indexOf(value) >= 0) {
      return "continue";
    }
    // 如果值为数组，另行处理
    if (value.constructor === Array) {
      // e.g. {ids: [1, 2, 3]}
      switch (arrayFormat) {
        case 'indices':
          // 结果: ids[0]=1&ids[1]=2&ids[2]=3
          for (var i = 0; i < value.length; i++) {
            _result.push(key + '[' + i + ']=' + value[i]);
          }
          break;
        case 'brackets':
          // 结果: ids[]=1&ids[]=2&ids[]=3
          value.forEach(function (_value) {
            _result.push(key + '[]=' + _value);
          });
          break;
        case 'repeat':
          // 结果: ids=1&ids=2&ids=3
          value.forEach(function (_value) {
            _result.push(key + '=' + _value);
          });
          break;
        case 'comma':
          // 结果: ids=1,2,3
          var commaStr = "";
          value.forEach(function (_value) {
            commaStr += (commaStr ? "," : "") + _value;
          });
          _result.push(key + '=' + commaStr);
          break;
        default:
          value.forEach(function (_value) {
            _result.push(key + '[]=' + _value);
          });}

    } else {
      _result.push(key + '=' + value);
    }};for (var key in data) {var _ret = _loop(key);if (_ret === "continue") continue;
  }
  return _result.length ? prefix + _result.join('&') : '';
}var _default =

queryParams;exports.default = _default;

/***/ }),
/* 20 */
/*!**********************************************************************************************!*\
  !*** C:/Users/15277/Desktop/order-app/order-wx/node_modules/uview-ui/libs/function/route.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 21));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;} /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * 路由跳转方法，该方法相对于直接使用uni.xxx的好处是使用更加简单快捷
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * 并且带有路由拦截功能
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */var

Router = /*#__PURE__*/function () {
  function Router() {_classCallCheck(this, Router);
    // 原始属性定义
    this.config = {
      type: 'navigateTo',
      url: '',
      delta: 1, // navigateBack页面后退时,回退的层数
      params: {}, // 传递的参数
      animationType: 'pop-in', // 窗口动画,只在APP有效
      animationDuration: 300, // 窗口动画持续时间,单位毫秒,只在APP有效
      intercept: false // 是否需要拦截
    };
    // 因为route方法是需要对外赋值给另外的对象使用，同时route内部有使用this，会导致route失去上下文
    // 这里在构造函数中进行this绑定
    this.route = this.route.bind(this);
  }

  // 判断url前面是否有"/"，如果没有则加上，否则无法跳转
  _createClass(Router, [{ key: "addRootPath", value: function addRootPath(url) {
      return url[0] === '/' ? url : "/".concat(url);
    }

    // 整合路由参数
  }, { key: "mixinParam", value: function mixinParam(url, params) {
      url = url && this.addRootPath(url);

      // 使用正则匹配，主要依据是判断是否有"/","?","="等，如“/page/index/index?name=mary"
      // 如果有url中有get参数，转换后无需带上"?"
      var query = '';
      if (/.*\/.*\?.*=.*/.test(url)) {
        // object对象转为get类型的参数
        query = uni.$u.queryParams(params, false);
        // 因为已有get参数,所以后面拼接的参数需要带上"&"隔开
        return url += "&" + query;
      } else {
        // 直接拼接参数，因为此处url中没有后面的query参数，也就没有"?/&"之类的符号
        query = uni.$u.queryParams(params);
        return url += query;
      }
    }

    // 对外的方法名称
  }, { key: "route", value: function () {var _route = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {var options,params,mergeConfig,isNext,_args = arguments;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:options = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};params = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
                // 合并用户的配置和内部的默认配置
                mergeConfig = {};

                if (typeof options === 'string') {
                  // 如果options为字符串，则为route(url, params)的形式
                  mergeConfig.url = this.mixinParam(options, params);
                  mergeConfig.type = 'navigateTo';
                } else {
                  mergeConfig = uni.$u.deepClone(options, this.config);
                  // 否则正常使用mergeConfig中的url和params进行拼接
                  mergeConfig.url = this.mixinParam(options.url, options.params);
                }

                if (params.intercept) {
                  this.config.intercept = params.intercept;
                }
                // params参数也带给拦截器
                mergeConfig.params = params;
                // 合并内外部参数
                mergeConfig = uni.$u.deepMerge(this.config, mergeConfig);
                // 判断用户是否定义了拦截器
                if (!(typeof uni.$u.routeIntercept === 'function')) {_context.next = 14;break;}_context.next = 10;return (

                  new Promise(function (resolve, reject) {
                    uni.$u.routeIntercept(mergeConfig, resolve);
                  }));case 10:isNext = _context.sent;
                // 如果isNext为true，则执行路由跳转
                isNext && this.openPage(mergeConfig);_context.next = 15;break;case 14:

                this.openPage(mergeConfig);case 15:case "end":return _context.stop();}}}, _callee, this);}));function route() {return _route.apply(this, arguments);}return route;}()



    // 执行路由跳转
  }, { key: "openPage", value: function openPage(config) {
      // 解构参数
      var
      url =




      config.url,type = config.type,delta = config.delta,animationType = config.animationType,animationDuration = config.animationDuration;
      if (config.type == 'navigateTo' || config.type == 'to') {
        uni.navigateTo({
          url: url,
          animationType: animationType,
          animationDuration: animationDuration });

      }
      if (config.type == 'redirectTo' || config.type == 'redirect') {
        uni.redirectTo({
          url: url });

      }
      if (config.type == 'switchTab' || config.type == 'tab') {
        uni.switchTab({
          url: url });

      }
      if (config.type == 'reLaunch' || config.type == 'launch') {
        uni.reLaunch({
          url: url });

      }
      if (config.type == 'navigateBack' || config.type == 'back') {
        uni.navigateBack({
          delta: delta });

      }
    } }]);return Router;}();var _default =


new Router().route;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 21 */
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 22);

/***/ }),
/* 22 */
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 23);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),
/* 23 */
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),
/* 24 */
/*!***************************************************************************************************!*\
  !*** C:/Users/15277/Desktop/order-app/order-wx/node_modules/uview-ui/libs/function/timeFormat.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // padStart 的 polyfill，因为某些机型或情况，还无法支持es7的padStart，比如电脑版的微信小程序
// 所以这里做一个兼容polyfill的兼容处理
if (!String.prototype.padStart) {
  // 为了方便表示这里 fillString 用了ES6 的默认参数，不影响理解
  String.prototype.padStart = function (maxLength) {var fillString = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ' ';
    if (Object.prototype.toString.call(fillString) !== "[object String]") throw new TypeError(
    'fillString must be String');
    var str = this;
    // 返回 String(str) 这里是为了使返回的值是字符串字面量，在控制台中更符合直觉
    if (str.length >= maxLength) return String(str);

    var fillLength = maxLength - str.length,
    times = Math.ceil(fillLength / fillString.length);
    while (times >>= 1) {
      fillString += fillString;
      if (times === 1) {
        fillString += fillString;
      }
    }
    return fillString.slice(0, fillLength) + str;
  };
}

// 其他更多是格式化有如下:
// yyyy:mm:dd|yyyy:mm|yyyy年mm月dd日|yyyy年mm月dd日 hh时MM分等,可自定义组合
function timeFormat() {var dateTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;var fmt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy-mm-dd';
  // 如果为null,则格式化当前时间
  if (!dateTime) dateTime = Number(new Date());
  // 如果dateTime长度为10或者13，则为秒和毫秒的时间戳，如果超过13位，则为其他的时间格式
  if (dateTime.toString().length == 10) dateTime *= 1000;
  var date = new Date(dateTime);
  var ret;
  var opt = {
    "y+": date.getFullYear().toString(), // 年
    "m+": (date.getMonth() + 1).toString(), // 月
    "d+": date.getDate().toString(), // 日
    "h+": date.getHours().toString(), // 时
    "M+": date.getMinutes().toString(), // 分
    "s+": date.getSeconds().toString() // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (var k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(ret[1], ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0"));
    };
  };
  return fmt;
}var _default =

timeFormat;exports.default = _default;

/***/ }),
/* 25 */
/*!*************************************************************************************************!*\
  !*** C:/Users/15277/Desktop/order-app/order-wx/node_modules/uview-ui/libs/function/timeFrom.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _timeFormat = _interopRequireDefault(__webpack_require__(/*! ../../libs/function/timeFormat.js */ 24));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
                                                                                                                                                                                                                                                                                          * 时间戳转为多久之前
                                                                                                                                                                                                                                                                                          * @param String timestamp 时间戳
                                                                                                                                                                                                                                                                                          * @param String | Boolean format 如果为时间格式字符串，超出一定时间范围，返回固定的时间格式；
                                                                                                                                                                                                                                                                                          * 如果为布尔值false，无论什么时间，都返回多久以前的格式
                                                                                                                                                                                                                                                                                          */
function timeFrom() {var dateTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy-mm-dd';
  // 如果为null,则格式化当前时间
  if (!dateTime) dateTime = Number(new Date());
  // 如果dateTime长度为10或者13，则为秒和毫秒的时间戳，如果超过13位，则为其他的时间格式
  if (dateTime.toString().length == 10) dateTime *= 1000;
  var timestamp = +new Date(Number(dateTime));

  var timer = (Number(new Date()) - timestamp) / 1000;
  // 如果小于5分钟,则返回"刚刚",其他以此类推
  var tips = '';
  switch (true) {
    case timer < 300:
      tips = '刚刚';
      break;
    case timer >= 300 && timer < 3600:
      tips = parseInt(timer / 60) + '分钟前';
      break;
    case timer >= 3600 && timer < 86400:
      tips = parseInt(timer / 3600) + '小时前';
      break;
    case timer >= 86400 && timer < 2592000:
      tips = parseInt(timer / 86400) + '天前';
      break;
    default:
      // 如果format为false，则无论什么时间戳，都显示xx之前
      if (format === false) {
        if (timer >= 2592000 && timer < 365 * 86400) {
          tips = parseInt(timer / (86400 * 30)) + '个月前';
        } else {
          tips = parseInt(timer / (86400 * 365)) + '年前';
        }
      } else {
        tips = (0, _timeFormat.default)(timestamp, format);
      }}

  return tips;
}var _default =

timeFrom;exports.default = _default;

/***/ }),
/* 26 */
/*!******************************************************************************************************!*\
  !*** C:/Users/15277/Desktop/order-app/order-wx/node_modules/uview-ui/libs/function/colorGradient.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 求两个颜色之间的渐变值
                                                                                                      * @param {string} startColor 开始的颜色
                                                                                                      * @param {string} endColor 结束的颜色
                                                                                                      * @param {number} step 颜色等分的份额
                                                                                                      * */
function colorGradient() {var startColor = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'rgb(0, 0, 0)';var endColor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'rgb(255, 255, 255)';var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
  var startRGB = hexToRgb(startColor, false); //转换为rgb数组模式
  var startR = startRGB[0];
  var startG = startRGB[1];
  var startB = startRGB[2];

  var endRGB = hexToRgb(endColor, false);
  var endR = endRGB[0];
  var endG = endRGB[1];
  var endB = endRGB[2];

  var sR = (endR - startR) / step; //总差值
  var sG = (endG - startG) / step;
  var sB = (endB - startB) / step;
  var colorArr = [];
  for (var i = 0; i < step; i++) {
    //计算每一步的hex值 
    var hex = rgbToHex('rgb(' + Math.round(sR * i + startR) + ',' + Math.round(sG * i + startG) + ',' + Math.round(sB *
    i + startB) + ')');
    colorArr.push(hex);
  }
  return colorArr;
}

// 将hex表示方式转换为rgb表示方式(这里返回rgb数组模式)
function hexToRgb(sColor) {var str = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  sColor = sColor.toLowerCase();
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      var sColorNew = "#";
      for (var i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    //处理六位的颜色值
    var sColorChange = [];
    for (var _i = 1; _i < 7; _i += 2) {
      sColorChange.push(parseInt("0x" + sColor.slice(_i, _i + 2)));
    }
    if (!str) {
      return sColorChange;
    } else {
      return "rgb(".concat(sColorChange[0], ",").concat(sColorChange[1], ",").concat(sColorChange[2], ")");
    }
  } else if (/^(rgb|RGB)/.test(sColor)) {
    var arr = sColor.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
    return arr.map(function (val) {return Number(val);});
  } else {
    return sColor;
  }
};

// 将rgb表示方式转换为hex表示方式
function rgbToHex(rgb) {
  var _this = rgb;
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  if (/^(rgb|RGB)/.test(_this)) {
    var aColor = _this.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
    var strHex = "#";
    for (var i = 0; i < aColor.length; i++) {
      var hex = Number(aColor[i]).toString(16);
      hex = String(hex).length == 1 ? 0 + '' + hex : hex; // 保证每个rgb的值为2位
      if (hex === "0") {
        hex += hex;
      }
      strHex += hex;
    }
    if (strHex.length !== 7) {
      strHex = _this;
    }
    return strHex;
  } else if (reg.test(_this)) {
    var aNum = _this.replace(/#/, "").split("");
    if (aNum.length === 6) {
      return _this;
    } else if (aNum.length === 3) {
      var numHex = "#";
      for (var _i2 = 0; _i2 < aNum.length; _i2 += 1) {
        numHex += aNum[_i2] + aNum[_i2];
      }
      return numHex;
    }
  } else {
    return _this;
  }
}


/**
  * JS颜色十六进制转换为rgb或rgba,返回的格式为 rgba（255，255，255，0.5）字符串
  * sHex为传入的十六进制的色值
  * alpha为rgba的透明度
  */
function colorToRgba(color) {var alpha = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.3;
  color = rgbToHex(color);
  // 十六进制颜色值的正则表达式
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  /* 16进制颜色转为RGB格式 */
  var sColor = color.toLowerCase();
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      var sColorNew = '#';
      for (var i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    // 处理六位的颜色值
    var sColorChange = [];
    for (var _i3 = 1; _i3 < 7; _i3 += 2) {
      sColorChange.push(parseInt('0x' + sColor.slice(_i3, _i3 + 2)));
    }
    // return sColorChange.join(',')
    return 'rgba(' + sColorChange.join(',') + ',' + alpha + ')';
  } else
  {
    return sColor;
  }
}var _default =

{
  colorGradient: colorGradient,
  hexToRgb: hexToRgb,
  rgbToHex: rgbToHex,
  colorToRgba: colorToRgba };exports.default = _default;

/***/ }),
/* 27 */
/*!*********************************************************************************************!*\
  !*** C:/Users/15277/Desktop/order-app/order-wx/node_modules/uview-ui/libs/function/guid.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 本算法来源于简书开源代码，详见：https://www.jianshu.com/p/fdbf293d0a85
                                                                                                      * 全局唯一标识符（uuid，Globally Unique Identifier）,也称作 uuid(Universally Unique IDentifier) 
                                                                                                      * 一般用于多个组件之间,给它一个唯一的标识符,或者v-for循环的时候,如果使用数组的index可能会导致更新列表出现问题
                                                                                                      * 最可能的情况是左滑删除item或者对某条信息流"不喜欢"并去掉它的时候,会导致组件内的数据可能出现错乱
                                                                                                      * v-for的时候,推荐使用后端返回的id而不是循环的index
                                                                                                      * @param {Number} len uuid的长度
                                                                                                      * @param {Boolean} firstU 将返回的首字母置为"u"
                                                                                                      * @param {Nubmer} radix 生成uuid的基数(意味着返回的字符串都是这个基数),2-二进制,8-八进制,10-十进制,16-十六进制
                                                                                                      */
function guid() {var len = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 32;var firstU = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;var radix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  var uuid = [];
  radix = radix || chars.length;

  if (len) {
    // 如果指定uuid长度,只是取随机的字符,0|x为位运算,能去掉x的小数位,返回整数位
    for (var i = 0; i < len; i++) {uuid[i] = chars[0 | Math.random() * radix];}
  } else {
    var r;
    // rfc4122标准要求返回的uuid中,某些位为固定的字符
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';

    for (var _i = 0; _i < 36; _i++) {
      if (!uuid[_i]) {
        r = 0 | Math.random() * 16;
        uuid[_i] = chars[_i == 19 ? r & 0x3 | 0x8 : r];
      }
    }
  }
  // 移除第一个字符,并用u替代,因为第一个字符为数值时,该guuid不能用作id或者class
  if (firstU) {
    uuid.shift();
    return 'u' + uuid.join('');
  } else {
    return uuid.join('');
  }
}var _default =

guid;exports.default = _default;

/***/ }),
/* 28 */
/*!**********************************************************************************************!*\
  !*** C:/Users/15277/Desktop/order-app/order-wx/node_modules/uview-ui/libs/function/color.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 为了让用户能够自定义主题，会逐步弃用此文件，各颜色通过css提供
// 为了给某些特殊场景使用和向后兼容，无需删除此文件(2020-06-20)
var color = {
  primary: "#2979ff",
  primaryDark: "#2b85e4",
  primaryDisabled: "#a0cfff",
  primaryLight: "#ecf5ff",
  bgColor: "#f3f4f6",

  info: "#909399",
  infoDark: "#82848a",
  infoDisabled: "#c8c9cc",
  infoLight: "#f4f4f5",

  warning: "#ff9900",
  warningDark: "#f29100",
  warningDisabled: "#fcbd71",
  warningLight: "#fdf6ec",

  error: "#fa3534",
  errorDark: "#dd6161",
  errorDisabled: "#fab6b6",
  errorLight: "#fef0f0",

  success: "#19be6b",
  successDark: "#18b566",
  successDisabled: "#71d5a1",
  successLight: "#dbf1e1",

  mainColor: "#303133",
  contentColor: "#606266",
  tipsColor: "#909399",
  lightColor: "#c0c4cc",
  borderColor: "#e4e7ed" };var _default =


color;exports.default = _default;

/***/ }),
/* 29 */
/*!**************************************************************************************************!*\
  !*** C:/Users/15277/Desktop/order-app/order-wx/node_modules/uview-ui/libs/function/type2icon.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 根据主题type值,获取对应的图标
                                                                                                      * @param String type 主题名称,primary|info|error|warning|success
                                                                                                      * @param String fill 是否使用fill填充实体的图标  
                                                                                                      */
function type2icon() {var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'success';var fill = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  // 如果非预置值,默认为success
  if (['primary', 'info', 'error', 'warning', 'success'].indexOf(type) == -1) type = 'success';
  var iconName = '';
  // 目前(2019-12-12),info和primary使用同一个图标
  switch (type) {
    case 'primary':
      iconName = 'info-circle';
      break;
    case 'info':
      iconName = 'info-circle';
      break;
    case 'error':
      iconName = 'close-circle';
      break;
    case 'warning':
      iconName = 'error-circle';
      break;
    case 'success':
      iconName = 'checkmark-circle';
      break;
    default:
      iconName = 'checkmark-circle';}

  // 是否是实体类型,加上-fill,在icon组件库中,实体的类名是后面加-fill的
  if (fill) iconName += '-fill';
  return iconName;
}var _default =

type2icon;exports.default = _default;

/***/ }),
/* 30 */
/*!****************************************************************************************************!*\
  !*** C:/Users/15277/Desktop/order-app/order-wx/node_modules/uview-ui/libs/function/randomArray.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 打乱数组
function randomArray() {var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  // 原理是sort排序,Math.random()产生0<= x < 1之间的数,会导致x-0.05大于或者小于0
  return array.sort(function () {return Math.random() - 0.5;});
}var _default =

randomArray;exports.default = _default;

/***/ }),
/* 31 */
/*!************************************************************************************************!*\
  !*** C:/Users/15277/Desktop/order-app/order-wx/node_modules/uview-ui/libs/function/addUnit.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = addUnit;var _test = _interopRequireDefault(__webpack_require__(/*! ./test.js */ 18));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

// 添加单位，如果有rpx，%，px等单位结尾或者值为auto，直接返回，否则加上rpx单位结尾
function addUnit() {var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'auto';var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'rpx';
  value = String(value);
  // 用uView内置验证规则中的number判断是否为数值
  return _test.default.number(value) ? "".concat(value).concat(unit) : value;
}

/***/ }),
/* 32 */
/*!***********************************************************************************************!*\
  !*** C:/Users/15277/Desktop/order-app/order-wx/node_modules/uview-ui/libs/function/random.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function random(min, max) {
  if (min >= 0 && max > 0 && max >= min) {
    var gab = max - min + 1;
    return Math.floor(Math.random() * gab + min);
  } else {
    return 0;
  }
}var _default =

random;exports.default = _default;

/***/ }),
/* 33 */
/*!*********************************************************************************************!*\
  !*** C:/Users/15277/Desktop/order-app/order-wx/node_modules/uview-ui/libs/function/trim.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function trim(str) {var pos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'both';
  if (pos == 'both') {
    return str.replace(/^\s+|\s+$/g, "");
  } else if (pos == "left") {
    return str.replace(/^\s*/, '');
  } else if (pos == 'right') {
    return str.replace(/(\s*$)/g, "");
  } else if (pos == 'all') {
    return str.replace(/\s+/g, "");
  } else {
    return str;
  }
}var _default =

trim;exports.default = _default;

/***/ }),
/* 34 */
/*!**********************************************************************************************!*\
  !*** C:/Users/15277/Desktop/order-app/order-wx/node_modules/uview-ui/libs/function/toast.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function toast(title) {var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1500;
  uni.showToast({
    title: title,
    icon: 'none',
    duration: duration });

}var _default =

toast;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 35 */
/*!**************************************************************************************************!*\
  !*** C:/Users/15277/Desktop/order-app/order-wx/node_modules/uview-ui/libs/function/getParent.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = getParent; // 获取父组件的参数，因为支付宝小程序不支持provide/inject的写法
// this.$parent在非H5中，可以准确获取到父组件，但是在H5中，需要多次this.$parent.$parent.xxx
function getParent(name, keys) {
  var parent = this.$parent;
  // 通过while历遍，这里主要是为了H5需要多层解析的问题
  while (parent) {
    // 父组件
    if (parent.$options.name !== name) {
      // 如果组件的name不相等，继续上一级寻找
      parent = parent.$parent;
    } else {var _ret = function () {
        var data = {};
        // 判断keys是否数组，如果传过来的是一个数组，那么直接使用数组元素值当做键值去父组件寻找
        if (Array.isArray(keys)) {
          keys.map(function (val) {
            data[val] = parent[val] ? parent[val] : '';
          });
        } else {
          // 历遍传过来的对象参数
          for (var i in keys) {
            // 如果子组件有此值则用，无此值则用父组件的值
            // 判断是否空数组，如果是，则用父组件的值，否则用子组件的值
            if (Array.isArray(keys[i])) {
              if (keys[i].length) {
                data[i] = keys[i];
              } else {
                data[i] = parent[i];
              }
            } else if (keys[i].constructor === Object) {
              // 判断是否对象，如果是对象，且有属性，那么使用子组件的值，否则使用父组件的值
              if (Object.keys(keys[i]).length) {
                data[i] = keys[i];
              } else {
                data[i] = parent[i];
              }
            } else {
              // 只要子组件有传值，即使是false值，也是“传值”了，也需要覆盖父组件的同名参数
              data[i] = keys[i] || keys[i] === false ? keys[i] : parent[i];
            }
          }
        }
        return { v: data };}();if (typeof _ret === "object") return _ret.v;
    }
  }

  return {};
}

/***/ }),
/* 36 */
/*!************************************************************************************************!*\
  !*** C:/Users/15277/Desktop/order-app/order-wx/node_modules/uview-ui/libs/function/$parent.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = $parent; // 获取父组件的参数，因为支付宝小程序不支持provide/inject的写法
// this.$parent在非H5中，可以准确获取到父组件，但是在H5中，需要多次this.$parent.$parent.xxx
// 这里默认值等于undefined有它的含义，因为最顶层元素(组件)的$parent就是undefined，意味着不传name
// 值(默认为undefined)，就是查找最顶层的$parent
function $parent() {var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
  var parent = this.$parent;
  // 通过while历遍，这里主要是为了H5需要多层解析的问题
  while (parent) {
    // 父组件
    if (parent.$options && parent.$options.name !== name) {
      // 如果组件的name不相等，继续上一级寻找
      parent = parent.$parent;
    } else {
      return parent;
    }
  }
  return false;
}

/***/ }),
/* 37 */
/*!********************************************************************************************!*\
  !*** C:/Users/15277/Desktop/order-app/order-wx/node_modules/uview-ui/libs/function/sys.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.os = os;exports.sys = sys;function os() {
  return uni.getSystemInfoSync().platform;
};

function sys() {
  return uni.getSystemInfoSync();
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 38 */
/*!*************************************************************************************************!*\
  !*** C:/Users/15277/Desktop/order-app/order-wx/node_modules/uview-ui/libs/function/debounce.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var timeout = null;

/**
                                                                                                                         * 防抖原理：一定时间内，只有最后一次操作，再过wait毫秒后才执行函数
                                                                                                                         * 
                                                                                                                         * @param {Function} func 要执行的回调函数 
                                                                                                                         * @param {Number} wait 延时的时间
                                                                                                                         * @param {Boolean} immediate 是否立即执行 
                                                                                                                         * @return null
                                                                                                                         */
function debounce(func) {var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  // 清除定时器
  if (timeout !== null) clearTimeout(timeout);
  // 立即执行，此类情况一般用不到
  if (immediate) {
    var callNow = !timeout;
    timeout = setTimeout(function () {
      timeout = null;
    }, wait);
    if (callNow) typeof func === 'function' && func();
  } else {
    // 设置定时器，当最后一次操作后，timeout不会再被清除，所以在延时wait毫秒后执行func回调方法
    timeout = setTimeout(function () {
      typeof func === 'function' && func();
    }, wait);
  }
}var _default =

debounce;exports.default = _default;

/***/ }),
/* 39 */
/*!*************************************************************************************************!*\
  !*** C:/Users/15277/Desktop/order-app/order-wx/node_modules/uview-ui/libs/function/throttle.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var timer, flag;
/**
                                                                                                                      * 节流原理：在一定时间内，只能触发一次
                                                                                                                      * 
                                                                                                                      * @param {Function} func 要执行的回调函数 
                                                                                                                      * @param {Number} wait 延时的时间
                                                                                                                      * @param {Boolean} immediate 是否立即执行
                                                                                                                      * @return null
                                                                                                                      */
function throttle(func) {var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  if (immediate) {
    if (!flag) {
      flag = true;
      // 如果是立即执行，则在wait毫秒内开始时执行
      typeof func === 'function' && func();
      timer = setTimeout(function () {
        flag = false;
      }, wait);
    }
  } else {
    if (!flag) {
      flag = true;
      // 如果是非立即执行，则在wait毫秒内的结束处执行
      timer = setTimeout(function () {
        flag = false;
        typeof func === 'function' && func();
      }, wait);
    }

  }
};var _default =
throttle;exports.default = _default;

/***/ }),
/* 40 */
/*!*********************************************************************************************!*\
  !*** C:/Users/15277/Desktop/order-app/order-wx/node_modules/uview-ui/libs/config/config.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 此版本发布于2020-12-17
var version = '1.8.3';var _default =

{
  v: version,
  version: version,
  // 主题名称
  type: [
  'primary',
  'success',
  'info',
  'error',
  'warning'] };exports.default = _default;

/***/ }),
/* 41 */
/*!*********************************************************************************************!*\
  !*** C:/Users/15277/Desktop/order-app/order-wx/node_modules/uview-ui/libs/config/zIndex.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // uniapp在H5中各API的z-index值如下：
/**
 * actionsheet: 999
 * modal: 999
 * navigate: 998
 * tabbar: 998
 * toast: 999
 */var _default =

{
  toast: 10090,
  noNetwork: 10080,
  // popup包含popup，actionsheet，keyboard，picker的值
  popup: 10075,
  mask: 10070,
  navbar: 980,
  topTips: 975,
  sticky: 970,
  indexListSticky: 965 };exports.default = _default;

/***/ }),
/* 42 */
/*!****************************************************************!*\
  !*** C:/Users/15277/Desktop/order-app/order-wx/store/index.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _vuex = _interopRequireDefault(__webpack_require__(/*! vuex */ 43));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
_vue.default.use(_vuex.default);

var store = new _vuex.default.Store({
  state: {},
  mutations: {},
  actions: {} });var _default =


store;exports.default = _default;

/***/ }),
/* 43 */
/*!********************************************!*\
  !*** ./node_modules/vuex/dist/vuex.esm.js ***!
  \********************************************/
/*! exports provided: default, Store, createNamespacedHelpers, install, mapActions, mapGetters, mapMutations, mapState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Store", function() { return Store; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createNamespacedHelpers", function() { return createNamespacedHelpers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "install", function() { return install; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapActions", function() { return mapActions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapGetters", function() { return mapGetters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapMutations", function() { return mapMutations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapState", function() { return mapState; });
/*!
 * vuex v3.4.0
 * (c) 2020 Evan You
 * @license MIT
 */
function applyMixin (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
}

var target = typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
    ? global
    : {};
var devtoolHook = target.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  }, { prepend: true });

  store.subscribeAction(function (action, state) {
    devtoolHook.emit('vuex:action', action, state);
  }, { prepend: true });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */

/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

function partial (fn, arg) {
  return function () {
    return fn(arg)
  }
}

// Base data struct for store's module, package with some attribute and method
var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  // Store some children item
  this._children = Object.create(null);
  // Store the origin module object which passed by programmer
  this._rawModule = rawModule;
  var rawState = rawModule.state;

  // Store the origin module's state
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors = { namespaced: { configurable: true } };

prototypeAccessors.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.hasChild = function hasChild (key) {
  return key in this._children
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if ((true)) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) { return }

  parent.removeChild(key);
};

ModuleCollection.prototype.isRegistered = function isRegistered (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];

  return parent.hasChild(key)
};

function update (path, targetModule, newModule) {
  if ((true)) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if ((true)) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if ((true)) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();
  this._makeLocalGettersCache = Object.create(null);

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  var state = this._modules.root.state;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  var useDevtools = options.devtools !== undefined ? options.devtools : Vue.config.devtools;
  if (useDevtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors$1 = { state: { configurable: true } };

prototypeAccessors$1.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors$1.state.set = function (v) {
  if ((true)) {
    assert(false, "use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });

  this._subscribers
    .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
    .forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
    ( true) &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  try {
    this._actionSubscribers
      .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
      .filter(function (sub) { return sub.before; })
      .forEach(function (sub) { return sub.before(action, this$1.state); });
  } catch (e) {
    if ((true)) {
      console.warn("[vuex] error in before action subscribers: ");
      console.error(e);
    }
  }

  var result = entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload);

  return new Promise(function (resolve, reject) {
    result.then(function (res) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.after; })
          .forEach(function (sub) { return sub.after(action, this$1.state); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in after action subscribers: ");
          console.error(e);
        }
      }
      resolve(res);
    }, function (error) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.error; })
          .forEach(function (sub) { return sub.error(action, this$1.state, error); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in error action subscribers: ");
          console.error(e);
        }
      }
      reject(error);
    });
  })
};

Store.prototype.subscribe = function subscribe (fn, options) {
  return genericSubscribe(fn, this._subscribers, options)
};

Store.prototype.subscribeAction = function subscribeAction (fn, options) {
  var subs = typeof fn === 'function' ? { before: fn } : fn;
  return genericSubscribe(subs, this._actionSubscribers, options)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if ((true)) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hasModule = function hasModule (path) {
  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  return this._modules.isRegistered(path)
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors$1 );

function genericSubscribe (fn, subs, options) {
  if (subs.indexOf(fn) < 0) {
    options && options.prepend
      ? subs.unshift(fn)
      : subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  // reset local getters cache
  store._makeLocalGettersCache = Object.create(null);
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    // direct inline function use will lead to closure preserving oldVm.
    // using partial to return function with only arguments preserved in closure environment.
    computed[key] = partial(fn, store);
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    if (store._modulesNamespaceMap[namespace] && ("development" !== 'production')) {
      console.error(("[vuex] duplicate namespace " + namespace + " for the namespaced module " + (path.join('/'))));
    }
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      if ((true)) {
        if (moduleName in parentState) {
          console.warn(
            ("[vuex] state field \"" + moduleName + "\" was overridden by a module with the same name at \"" + (path.join('.')) + "\"")
          );
        }
      }
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  if (!store._makeLocalGettersCache[namespace]) {
    var gettersProxy = {};
    var splitPos = namespace.length;
    Object.keys(store.getters).forEach(function (type) {
      // skip if the target getter is not match this namespace
      if (type.slice(0, splitPos) !== namespace) { return }

      // extract local getter type
      var localType = type.slice(splitPos);

      // Add a port to the getters proxy.
      // Define as getter property because
      // we do not want to evaluate the getters in this time.
      Object.defineProperty(gettersProxy, localType, {
        get: function () { return store.getters[type]; },
        enumerable: true
      });
    });
    store._makeLocalGettersCache[namespace] = gettersProxy;
  }

  return store._makeLocalGettersCache[namespace]
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if ((true)) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if ((true)) {
      assert(store._committing, "do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.reduce(function (state, key) { return state[key]; }, state)
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if ((true)) {
    assert(typeof type === 'string', ("expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if ((true)) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

/**
 * Reduce the code which written in Vue.js for getting the state.
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} states # Object's item can be a function which accept state and getters for param, you can do something for state and getters in it.
 * @param {Object}
 */
var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  if (( true) && !isValidMap(states)) {
    console.error('[vuex] mapState: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for committing the mutation
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} mutations # Object's item can be a function which accept `commit` function as the first param, it can accept anthor params. You can commit mutation and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  if (( true) && !isValidMap(mutations)) {
    console.error('[vuex] mapMutations: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // Get the commit method from store
      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for getting the getters
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} getters
 * @return {Object}
 */
var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  if (( true) && !isValidMap(getters)) {
    console.error('[vuex] mapGetters: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    // The namespace has been mutated by normalizeNamespace
    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if (( true) && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for dispatch the action
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} actions # Object's item can be a function which accept `dispatch` function as the first param, it can accept anthor params. You can dispatch action and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  if (( true) && !isValidMap(actions)) {
    console.error('[vuex] mapActions: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // get dispatch function from store
      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Rebinding namespace param for mapXXX function in special scoped, and return them by simple object
 * @param {String} namespace
 * @return {Object}
 */
var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

/**
 * Normalize the map
 * normalizeMap([1, 2, 3]) => [ { key: 1, val: 1 }, { key: 2, val: 2 }, { key: 3, val: 3 } ]
 * normalizeMap({a: 1, b: 2, c: 3}) => [ { key: 'a', val: 1 }, { key: 'b', val: 2 }, { key: 'c', val: 3 } ]
 * @param {Array|Object} map
 * @return {Object}
 */
function normalizeMap (map) {
  if (!isValidMap(map)) {
    return []
  }
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

/**
 * Validate whether given map is valid or not
 * @param {*} map
 * @return {Boolean}
 */
function isValidMap (map) {
  return Array.isArray(map) || isObject(map)
}

/**
 * Return a function expect two param contains namespace and map. it will normalize the namespace and then the param's function will handle the new namespace and the map.
 * @param {Function} fn
 * @return {Function}
 */
function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

/**
 * Search a special module from store by namespace. if module not exist, print error message.
 * @param {Object} store
 * @param {String} helper
 * @param {String} namespace
 * @return {Object}
 */
function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if (( true) && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

var index = {
  Store: Store,
  install: install,
  version: '3.4.0',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers
};

/* harmony default export */ __webpack_exports__["default"] = (index);


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ 3)))

/***/ }),
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */
/*!******************************************************************!*\
  !*** C:/Users/15277/Desktop/order-app/order-wx/config/config.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var appConfig = {
  appid: 'wx9feb1ff9c3261472',
  secret: '88dd6ed9e3ff8eb58a6af1eb5bf4646a' };var _default =


appConfig;exports.default = _default;

/***/ }),
/* 51 */
/*!************************************************************************!*\
  !*** C:/Users/15277/Desktop/order-app/order-wx/static/images/card.png ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 52 */
/*!*************************************************************************!*\
  !*** C:/Users/15277/Desktop/order-app/order-wx/static/images/order.png ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 53 */
/*!************************************************************************!*\
  !*** C:/Users/15277/Desktop/order-app/order-wx/static/images/mall.png ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 54 */
/*!****************************************************************************!*\
  !*** C:/Users/15277/Desktop/order-app/order-wx/static/images/recharge.png ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 55 */
/*!***************************************************************************!*\
  !*** C:/Users/15277/Desktop/order-app/order-wx/static/images/contact.png ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 56 */
/*!****************************************************************************!*\
  !*** C:/Users/15277/Desktop/order-app/order-wx/static/images/take_out.png ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 57 */
/*!************************************************************************!*\
  !*** C:/Users/15277/Desktop/order-app/order-wx/static/images/more.png ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */
/*!**************************************************************************!*\
  !*** C:/Users/15277/Desktop/order-app/order-wx/static/images/food_1.png ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAZZklEQVR4Xu1dC1Bcx5U9/YDhDwIEQggkgfjoh0BCsiUxSJbjbOLE2U12y8462ciM8tmqpHYTx/HajLwbZ2MG27uVzTqVrU0lZrDz23Wq8l87dpzIEoP+XyQkIWEkgQRCQnyH7zCvt+7we+/NG5iZ92Y0MnOrKMvQfbv79unu27fvvY8hTAtaAmxBjz48eIQBsMBBEAZAGAALXAILfPjhHSAMgAUugQU+/PAOEAbAApfAAh9+eAcIA2CBS2CBDz+8A4QBsMAlsMCHH94BwgBY4BII0PBtr7+wmTsjcgUgXRTFjIrP730+QE1pYhveATSJz71yQ92LH+dc/ByATyv/KsTHxG1/7OsjOjepiV0YAJrEN1v54GuWR0SRfQngn/DIkvEfGSv3flGnJnVhEwaADmKst9Y8ysDfmI8VB6oqTOYX5ysXzL+HAaCQ9oEfVm+INLDlXEQKGFJEJ08VBNzhTOiBU+xxCFGndpn+6eZ0tQZr9T9wsFfmnTTGbA4e8ai07rx1glAgDAAAtlerH4bAHgbHw2DI90Lu73HgbSYwO0T+PbXyHPx3ALvMOVpYBLtc8UTVu17wDXqRBQ2Ag9YXi0WITwF4wh/JM8Y459xNhiLwqR0m86/94RnsOgsWAPWvVj/PGHsKDAl6Ct2B8ZRdpuf79OQZSF4LEgA2q+U/AHwtAIL9pdFk/psA8A0YywUHAJvVcgHAajWJijHxcCZnYGJxNsTYRIiGWHBDDNj4CISxEQj2XkT2diKypxNsYlx9Uhh7y1hZ9bGAzZjOjBcUAOprLe2MIVspQzEmAePZRRjPVsWFm8iFsWHEXDqGyDvXPU3Hi0aTuUrnuQoIuw8cAGyvvpTII3kKJpACwZEyOh516sN//2x/g9XyBgceVUpxPKsAYys3uFa6rxQx2IPYiwchDPW7VeUceyr2mK2+8gx2+Q8EAOprLY8wgf0VgE+C88VKITKGG5xjmfL3YyuLXZOvlRKO/V4VBE4ulu/c89xBrfwDWf+eBkBDncXEOfYCWOWrkCZSszC8YZev1TyW9wCCkFcK71kANFhrvsnB/XphcyamYqjsYd0mnxjRMZBw4i1AdMr4ChA+u9307M90bUxHZvckAGzWmhsAz/JXDrTyaQfQm6KvnUP0lTNKtkeMJvNWvdvSi989BwCb1dLiacuPimTITI+akY19yIneAfmKdGTmYWT1Nr3kJ+PDnBOIP/k2hCG5HYgLKKp4wnwpII1qZHpPAcBWW/1LMPYp5ZijDQzLlhiwVDL5VKbl2hi67jhkxYc2fRTOpDSNYvNc3XD9ImJaTsiBAfaVclPVfwWsUQ2M7xkAuEy3AvumcqwZaZHIy4lGhOA+lKONQ3BM8JkqYlwS7Pd5fq7XIMeZqi5d4Njv5awY+5Wxsuqv9eCvN497AgCX33wluuuWvREchVIBpCRFYG1+rKpMxh0cx84Oyf5Gxp7R/M16y9CNn9uNgKPFuMdcEPCG/WjgngDA1HWvVjq+hDgBJavjPA653+7EuUty76ux3FJMpC0FGx0GWfOY0wGyAorRseDRcRANcYAg+CFGeZXYpnpE3W6T/dJoMoekrEOyU8oZsNXV/BGcPyT9Pa182gE8UVe3Ay1tYz5NJlkDHUtyXT/OhBSf6koLx1w+DsONZll9IZIVbP9cFSmwIUUhD4ADtZZ0geGWVGoZqZEoWDm36dYfAEjbcGSscAFhIs3NgDjvBNJVkK6EcorYZjQ9c3jeykEucA8AoHqTwJhMrS4ujEVSgufVPzYuulZ/n+IK6I9sx3PWYnTVRp+qxjQfgaFTsdjFiGXGzz/T4ROjIBQOeQDY6ix/CY7fSGVRti4OMdHqZ/XgkBONzfp6XjuT0zG08S+8no64c/sR2S15KWSYMFaaZw0UXnMKfMGQB0BDneUfOcd/SkWxtTRe9drX1jmO9k4P7/QAUpcsQVxCAuISk5CQnAxDTAyGBwYwNDiAoYFBDPb1YWjA/WVvuu2BBz7r1YwkHPkNhBG7tGyr0WT2+b3Cq8Y0FgppANhefSmLCc6nOPD1+QBwp28CF1tHVcVBE5+Vm4vk1LkNQKIoouPKFXRcaYVj3B1IEymZ9uGSD83pQhbVcRmxl44q+/Ge0WTW7+VJ46RLq4cMAPZZa1ZGgX8SAD3rLgfDcnBEqo01PTXSZfmLj508BkbHRJxoGnYrGhufgJz8fKQv802RGx0edoGg89o1N57j2atPj+aXlU7/IerWVUR1tEAYtUMYldsdJJUbwVgd47CVm6qO6Th/mlnddQA0WGsqwfjjnMP7Q3Zq2KQHkPmXVv+AXfEKFxGB9ffdj8QU/69zrU1N6Lx21U3IY8vX/VwYH3k86marPxPwpgj+ix2mvXX+VNa7zl0DwKHXX1rjdDqfA/AZvQdF/ApLSn1e+Wr9uHjiBO50zcSB6NZVBvwa4N8qN+09rRtTPxjdFQBMKXY0+el+9HneKiuKViN7lT46l2NsDOePH4O937NyOG+HPBfoA1iV0VT13xp4aKoadADUW2u+zMC/P1evYxMSkLhoEeISEl1a+8SEAyNDQ66fwd5ejI14vuaRZr9px05ERKqqD34Jq7uzE82nTnqsyxhDSnoGYuLiEBMfD3t/H0iPiDIYMD46huHBATid8iNKyoyL/Ft3K3w8qACYjKDF79QkGZ+UhNSMDKQuyXRd0eaim21tuH3jBgZ6e9yKLV2xEnnr1vk10XNVOnXgAIbtg7IihuhoZOfnIy1zKejfnmh8bAw3266hq60N9G814mAPV5iq/qB7x+dhGDQATIVh/R+AHGWfslbmIqegAJFRvtlKzh0+jP6eOzJ26+6/H4vS3PxCNcu17fIltF++LONTtHETFi9d6jXvaSBcb2kB57PP1NMMRM7LduzZ63mr8bol7wsGDQANtdU/4Izi5+VUtHEjFi/1zz3r2J/ela2ohEWLULK93PvR+1By2G7HqQP7ZTUylmWjoKTEBy6TRXtu3cLlM6cx4ZA7qwD4g9Fk1tdZMRR2gPq6mjLG+XFlX/LWrsPSlSt9FiBVGB8dxbE//0lWN3P5Cqxav94vft5UOlV/AMODs8cAHVulxgpvqrqVGejtdYGAdAUpcSY8UVH57Ot+MfWjUlB2gHpr9fcZ2Jel/aMtf3mBzL/Dp+73dHXhwgk5platL0bm8uU+8fGl8KXTp3C7Y/Y9h5S/+z70ECINBl/YzJSlm8WZBpuy7jGjyXyfXwz9qBRwAEw95zZJr3x01tPKiY5V9+bxZhxtly6hvUV+Jm/YXu66PQSKrr/fgmvN8nf+9fdvRXKa/z6GF0+ewJ2bbnaGjxtN5jcDNQ4p34ADoMFa82WuuPaR0pe7dq2m8Z0/dhS9t2/P8IiIiMB9D30YQoTnZ2JNDbrO7i5cOC7fdbQcY9QfmnwCgZxYndFUZdLaX2/qBxwA9bWWnzGGx6WdodVP56cWOvqnd0FGmmlKSk1F8dbAuHtPtzE6MowT+/bJur0kJwf5xdrCy+gYUBiarhpN5lwt8vG2buABYLU0M8w6c9Idv6Tc6G3/VMuRIej4vj/L/kbKJK3GQNOJ9/bJFDc6cujo0UKqbw5MWG+sfJaOzoBSQAFQ/5qlkImQHZqkpJGypoXUtk1ahbQaA02keJICOk105Gx58EM+2zCk/exqb0fL2UZZ1zmwu8Jk/nGgxxNYANTWPM4Yl8XF5RcXY0mONk39WvNFXH//fZlsaFeZz4KoWZi9/bjWchnXb88CgHhu2LZd06vj0MAATtvqld37rtFkflJzn+dhEGAAVP+7Kw+PhEqMRiQkzW3qnW/QTUePoK+7e6YYEwRs+8hHQdeygNGVdqDtBronxtA8JvP2waqi1cjU+PikNGoxxg6UV1btDNh4phgHUGKArc7yZ3DMeMLQQw1tl1pJKSy6htF1LCA0aAdOznr4johOnByRx/4tTc9A3pYtmpqnF8feWxLnZwZ7ohCVWbL7aY9eJpoaDDQA9n3/+YSoOANdcOOnO0quWWvKtEXmkOWMFDEpkbtX7hpt10qPwjxwBFDY7Y8O98LBxZkqetxA1OwaHM5dFaZ/fk+PifbEI2A7wIFay06BQdb55YWFyMnXFiHV3dmB5lOnZOMp2FCCjGy31D/a5dZ4Aeh19wNoGrejzzF7BSXD1uYHH0REhP9P0OR0Qs4nUmLAU+Um83e0D8Qzh4ABwFZX8yQ4l3V+7ZYtrndzLXT14gXcaJW7YulhV3DrU3sH0CoP73KVWZmNK8MDLudRKdEjFD1G+Uv0UkhHm4J+ajSZ/85fnt7UCxwArJafAJjxo6br0uYHdiFqjndzbzqsVACpTvnHPu5NVe/L2IeA0+cBpRNHWgqwvghd19vR0ii/thWkZyKjsBAwRAHRBr9iDJU+B4yxC+WVVQE62ybFETAA1FtrLjHwmf1eD4MJddhNAUxNw/qtOiuATc1Ad68cMDSpWze5fjfc349TikecrKgY5Bpm1J0pIERPgiEmGoiNARLigQTPAaiXzpx2ObrIjgGnuLL8C8+5uyd7D+c5SwYEAAd/XJMvTnDZS03mihVYtU7bU+2I3Y6Tijf5ZXl5WLl6jU7iAHD7DnBe/sjkYr6+CKAdgMjhwOF3/winRDlcFBGFdTFemrfjYoFFSZP86L9TEcl0rFy5cF42Fg7xsQrTc7/Qb4ByTgEBgK225tNg/H+kTeVv2IAl2dosdbQ6aJVIqbC0FOlZvvn9zynM001Av9z1C3nLgRy500rj/v0YHJq1B0QxAZvjFkHwdVMlL6jFKcCSdAyIEzh7yC2rXECTTgYGANaalwH+tFTQpUuXIz41BVjhv7Z+5fx5dFyVK18bK3YgLjFRnwXS3gm0KnZbWqEl7sfw++fOgnwTpVQSm4wEwf+bABan4nB7K5zyTGPvGE3mj+gzQHcuAQHAIWvNcSd42XRzsUIENsVOachJiZPbaZTvggqoAkjXPbr2Kal4NZDqrt1TwAg94sh2o5wVSI+Jp1AlgF4qR8fdFcl5ZvLs6AAGnBJXMca6jZVVAXGfp67oDoDjP3g+biza0M8lYV1pkQasjlas0o3rgSTfMrWTCxi5gk0TRf2QHV4z3bgJtLhHACEzAyjKU2VPAaWn6+X2e4pFoJgEGdFNYmx8EhCu/44Dnbcn/1+FWseH0OmQxzhyxjZXVFYpnQY0DzsgALBZLeQkd0DauxWGOGRHqXj/bCkBSCHygsgXj3zypKQqcC94wSm6FDmMO4COLqBr1rFkpnpK8uRONUfKmINvvSnz7k3JyMDazV6ahHv6gFvdQNfsmwa1fWtiDJcVbw0c4lcqTM8FJMuY7juAzWqhPPyUj3+G1mVkYdGQCuJp8tcVegWCW9ev43KjPAnjnB7FtPIGhwC604+Mzm7JtPImPAdpzHR6W9nkVW4Oohc8esmbpuiYWJTt2uXbo9TwyOTNo60DEEU4OMfRYXm8Q0JElK1099P+eZ/OsyACAYCfSuP9KDpm446diLrVA7yvts2mA0Xzh3GpKYAUAURRRC6iFU3nOP2QFk+T7i9tWg8kzn88qd3b/bZK0qMTgaC7B8eHezEmeWuIFQR72RPP6qTpyoUSCACQmj7j6y17qfN01m5YA9CWOwd5VABp9dA2SluqSrCFTxgggw2BkTR/L0jt3l5UuhGLs/yLc3A1efM2Lpw9gx7JW4ML3wH6FI2uAGio+/YqziNkyXHcHEDPXpycLClNmVjnkrlSAUyIi0dJ8mJgQP4278W8uRcht+6sDGBpBuCDi7d9oB9nbHK3bnrsokcvLdTW1IR2RVi6yPlHd+zZ+7YWvmp1dQWAra76MXD2v9KG3F7qaGs+qhIRvbYASFd3r1bzmFkWFYuVlNfPFyKjC5lm6WfaZp+cBCTGA356Eze8SdFus5S2JBOry2ZuwL70bqYspappPNggr8vxTeMe87/6xXCOSjoDwPJv4PjGdHvkoUNnopuhRu0oSE4EStWdOtV85uhaSddLVSJ7e/ri2cmennQdkkAq2zux/z2MDs36bFCEcNkD2rPBKIEFjt8a95gpe4qupC8ArBbaD2dcZOcMnTpzHuib1aBdo8rNAZa7m3XJPq58fi2LXYQYQRIDEBkBsqS57u4EpiCRWmDHxh07XKHtWohsDGRrmCbOcb1ij1mbLV2lQ7oB4OAb34nlQ6N2Dszkb5szeJL0ANIHlFSYN3kWS6hp/370Sezu9Kfy+Knjgl7ZsjMnV7wf1kUtk0R1yTeBfBSk5GvUsFof6MpLV18pOZysYNcX9M02qhsA6l99wcgEQWYao1c6eq3zSM2twE1ZEtDJonkrgJzZsOvjb70luxbFC5EojU0GspdOPtLMc1/XOslz1bf39eGM4rymmEeKfdRC3R0daD4t93wKxNdHdAOArbb6STAm8wBad9/9WLR4jlh9MtacOgcMqWT8oGthWgrsohNnzsqVxqWxCcgrLZ336qhlAnypqzyvKWcA7QJaaGJiAkfekSv9jOGV8krzV7XwVdbVDQDKz7JR4CcpgPMmffB0K5jqadfEGFoUptHV64qRtkJbbIGeQlReUSmtDRm/tNLhd96Gc2Jilg3HIeMesw6PH7Ms9QNAnaWd89mPMlK6lzXe2sXJckfv8Cp0ZXwYHQ75DrF514OaIou1ToyyvjJQlf6+aedOUJ5CLaTMgMI5xir2mH3/wOEcndAFAPW1NXmMcVmoTvaqfKwoKvJ+/I4J4FKryxQqpfOjA+iVPo8GwgfQ+16qlqQoJYpWktLqTWVIy8zUxLm9pQVtl+Th6BER2Lptt/mIJsaSyroAwFb7wqfBBJkHkN+pX+70Ap23XDZ9Loo4obCL67W96iVA4kOZyxoVnjzLC4tcWUq1kJqlkTF8tbzS/IoWvtK6ugCg3lrzXQY+o5xQijZyk555qPGnt6KIwY5ONDbKFcBAp4Hxp6tUR6kIpmdlobDUtzTzam27GYSAnxlNZu+yVnsxGJ0AYDnCgJm0JkkpKSjWwVFDzf1a82OLF0Lxp8iRP74jS/qkJX+QtH0Kg5fmRWRgl8tNVdoeG/Q8AvZZn4+JgkGmpem1StWCQCi2kGIMQ43cAlYZcymCMXESV3E/Ok3xB7QQpBQTbUjf/JlvyD1J/OBNVTTvAPWvvWhkoigzAJH7N7mBa6Xzx46h97bcUKR7EIjWTk7VV1PYKA6S4iG1UPfNTjSflKcOZEx4pLzyWfkrlJ+NaAaAzVrzNMBflrZfvG0bklJS/ezSZDXR6XTFAEi3P0rDWrbzAU18A1V5oKcHZw8fkrHXI2cxpZg9/LYygSj/ttG091/0GItmANRbLb9i9Nn2KSLFjxRArbl61UyseuTj0UNonngoFbaMZctQUDLzaQG/m1ZRBHVzFdcMAJvVQiHgM/ucHmZQkpSaDyBl5aQHplClg394y3V1nSY98iERr3OHD6G/R2Yf6TOazP5/CEEiQE0AUDMArSgsciVQ1kpqCmCoWQCVYzx35DD678zmLqaA2E07diA61kfHFQXj663v49pFuaFJANZsN5lVnlN9k/y8AKi31jwKUVT11GACo2xPsm/iJqdpO/unu09p1ik9vJT04u2biHwr3X9HbsnUq89Kvpw+OCFyt2/VT/c2wiD8xJsPVc4JAOUDj2+iCJe+2xLgYI9VmKrmDCz1CIAGa/XfcrCf3+1BhNvXIgHWZDRVzRmS7REANmv1hwH2jpbmw3XvugTmzTg65xFgs1a/DDBZlO9dH1K4A15LgHP2mYo9VXPu4vMqgQ11lt9xjkekrRqiGApzQ88c67VkPkAF6VO51264f+SSg3+twrRX9sVVtWHPC4B9P3wpOyrSSZ/KkDn3JcZHYEORd4GdHyB5h9RQunsn0HxFNQTOYjSZ93rT2XkBQEzqrS98gkH4rZIhfcGzcJ7PuHvTiXAZ3yXg8SPZjP3IWFn1RW85egUAYtZgrXmGg7+oZJyTacDyLP++mOFtJ8Pl5BIYd3AcO+ueQJQDDRUms0+p2L0GAHXBVlvzGhjfrZyQ1XkxSFvke8aP8MT6J4FDp+wQlR8d43yYRRpyy3c/reJn77kdnwDgAoHVQp/GdsuCsKU4HqQchimwEjjZNIyRsdn3hunWWAQvLt+9dzapsZfd8GvG6q0WO5PkAJ5ua/P6eEQb/GLpZXcXdrHG5hHQ2a8k0ckf2vGFvfJPqHkpKr9m60CtZa3AoOrHXZQbg8Up4ePAS/l7VWxkVMTF1lEMj7qvfABPGk3m73rFSKWQXwBwHQV1NZ8F55QO1o1SkyMRGyMgPk4IHwt+zgy9KtPE06QP2p3qk8/568Y9e5/wswlXNb8BMAUCt4TQWjoTruuTBN4zmsya49A1AYC6S8/FDPwNn7oeLqxVArplEdcMAAkIngGgLTWGVrF84OvzHi7ie3p+al4XAEzLvb6u5kuMc/pAdBgI+oPxe0Ike8UbJw9fmtYVANMNu7KFj4sFTEC+KML/76r6MpIPWFnO2DAYLkWAXx2H4+ou0/OKzFr6DDggANCna2EuwZBAGADBkHIItxEGQAhPTjC6FgZAMKQcwm2EARDCkxOMroUBEAwph3AbYQCE8OQEo2thAARDyiHcRhgAITw5wehaGADBkHIItxEGQAhPTjC6FgZAMKQcwm2EARDCkxOMroUBEAwph3AbYQCE8OQEo2thAARDyiHcRhgAITw5weja/wOXIIn5ibqBUQAAAABJRU5ErkJggg=="

/***/ }),
/* 67 */
/*!**************************************************************************!*\
  !*** C:/Users/15277/Desktop/order-app/order-wx/static/images/food_2.png ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 68 */
/*!**************************************************************************!*\
  !*** C:/Users/15277/Desktop/order-app/order-wx/static/images/food_3.png ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAgAElEQVR4Xu19CXQU15nud6sX7QsgAUIgCbHvYLCNUWNMnNgOM/EkecezxLFDYzs+ic9k3vFxJlYrzlNerJYz8UwmnsSJxzatPE8mMyTzkoxjHAcn2EgCs5h9R2hhEYhNAqTW0t113/lLalFVXdV9q9USylP/53Cw6f/+d/vrv//9t8uQhDG9AmxMzz45eSQZYIwzQZIBkgwwxldgjE8/KQGSDDDGV2CMTz8pAZIMMMZXYIxPPykBRhEDbH+remYwxCdJIduVQLD76tqnK68M9/CSDDDcKxyF/p63qgq6+/A0Y+xhMMwBkB6Jzt4Gw1bG5a1l7or9iR5ukgESvaKC9GrfrKpkkvQUwKcINukA8G2X2/PPgvhCaEkGEFqmxCLV+7ybOPBIXFQ5/5VrQ8Xn42pr0CjJAIlaSUE6db6qqwAbL4huhnba5fbMHCINpXmSARKxioI06nzeBgAzjNCdKSmYVFSk+elCczOCgYAJddbqcpcXCnZtipZkgKGuoGD7uo1V/xeMfU6PPi5/IiZMnoxJ06YZUrp45gzazp5B5/XrBvoh+75rffmzgkMwREsywFBWT7Dt9p96/1yW8bYefXJREWYsXCRE5cS+vbhy4UIkLmdPuTaUvyFEJKkDxLtMQ2tX56v+b4B/Rk1l6owZKJ4z1xJhEyaod7k9LkuEVMhJCRDvygm22/PvL+f19PZdVqPnTJiAhXevFKSgRTu6exfaL2vIQeL8oVUbKt6Lh2CSAeJZNQttan3VjzDwTeomMxctwqRpWoVPlCQpho1Hj+jQ2W9c7vLPitJQ4yUZIJ5Vs9CmfmPVa5yxL6ubrHzgQdjsdgtUbqEG+vqw6/0tEW0DLX2OtZWVQatEkwxgdcUs4tf5vHsALA83yxk/AQtXxif+wzSOfbwH19raNCORQqkTVj357DWLw0vaAawumFX8Op+Xa87/BDDAmVMncfbUKc1QQsFQ6ZqnXmiyOr6kBLC6Yhbx63zV59X2/kRIACMG4HZp6erHnj9gcXhJCWB1waziD8cRYMQAjElrytY/v83q+JISwOqKWcSvq6l+C5x/MVFKINExYgCFPsPLqTb+TyseqzCwGBkPPMkAFjfUKnqdz/s/AXxf3W4o10Ci03buLBoOHjQcCge6IPOXVz9RUSky1v+vGGDzK6+kZGV2FTLGCzlnUxl4IRgKOcdUxjCeMfjB0S1z3h3+bwb4OWMUeXOGM9aS5nS0rPjCcwmLxKnzVX0KYL/XKIJDMAQRnY4rV3DywH4EentN95hx/q9lGyqejsUEf7IMsHVrpd15xnmnzHEnk/mdjLEVHLBmWzVfHT9jrIXL/JDE8POOmxfeXfe1fzFf7RirXOfz/gHAJ9RoMxYuxOSi4lj7Y/p7X08PzjacwqVz5yDLsgke/5bLXfGdaJ38yTDA1tcq82wOx0OMsXsZcCeApXGvnvWGPZzh5yzEf5eaZXtvxV8+b+CaMydaV+N9Ahwah01qRgaWr7nP+kh0Lbo7O3Hp/DmFEfoMJIIMfPlet+d1s45GNQPUvvmiS7JJD8oyPsUY7h7yaiWGwFXO8Use4q/e+1SF8UGs6qduo/dpJuE5zhERwLHUtRoZ2dkJGZW/sxMn9u6Fv/NmBD2bDSvvedyz06ijUcUAA2f455mET3DO72fA9ISszjAQ4Ry9DOxVScarq54sp0APDezwVZeEGH8OHM8YdU8bTwyQSDBjAsbw87L1ni+MWgaor/nODC7bHuUMjzJgdjyLkp4mISvdhrRUBrudwWFnsNsG/h74fzO6Pb0yevs46O+ePo7eXhldPTL83WZnq4ZSO+PsVc6lV11PfKOVftnhe+kzIcj/bdaf3eHArMVLMH7SpHimGrUNMcGhHdsjIolCMntwzRPlGmWUCN1WCbBto3cNo03n/FEwZhASbTzX1BQJGWkSMtL7Nz0rQ4LNlvipdPfIuHY9iKsdIdzsCsXarEbY+AssxB7nwINmyBT9U7pgISgEbLjg5P79uNx6Xkue4+uuDZ6X9X0mftUEZlVXU/0oZJk2/dMC6ApKTpYNufQn247MdEm0WcLwOv39zNB2JYC+gMa8L9SHMzUVU2fMREFx/Jq/UEcArl68gON79+rQWY3LXe6+rQxQW1P9ZcY5uUYHvWNmk6IvWtlwZdNtoK9+NABt/sUrAUuMkD+lEFNnzkR6ZuaITWHnlt9rjwGOHa4NnlW3hQGsbDxtdv44O8bl2JVzfLRCmBHOXewDNxEIaZmZmFIyHRT7N9Jw+KOPcP3aVXW3zS63J0KpHtYVFt142ui8cXblT3ambaTXakj90bFwqrkXwVAkF2SPH49FK+8ZEv14GxswQJ/L7YlQPIaFAUQ3PivDpmw6ffEOx7AMJd71s9SObg+HTnYb6gbT589XpMBIgwEDtLvcnoiElISu+vaNL62SmVwBYF20CY/PtWPSBDvG58QXFjXSiyna396jftDNQQ02mw1LXKuRlpEhRKbrxg0FV7INTRLqGYAxdqxsffn8YdEBjmyqdLb7nRXg+Fa0WZJCVzDRkZiN72PAFTtwUwLsHMiSgQkhwGZdQxfaGUGkXQe7EAhqx5BfWIjZS6JbrlubGnG+sVEx52bl5ipRw/EyASWRHKiv04/4A5fbszbhDFDvq67k4C8AEFbTSfSTspedMYQ7/FkH4Nd1mcqB4j7BrRoeNJIA+475IxTD2UuXgm4DerjRfg3nGhoiQr2nzZqFollx2cRw+vAhUEaRGjjjz61eX/GPCWOAuje9D0NCDYBxQ1lKp4Nh4gQHJk6wI030qtclAeccxt1ODQAZQha8W+1JmjhVXy01P+/o/zeilWmN3pkLfTh7QcuI6ZlZmH/nnUhJS1P65bKsePPONkRYkZXfGWOYu3wFxk+caGl5u7vIErgDFD2sYQAJc1Z/yXMyIQxQ+6b3XSbhIUsji4EsScAkhREcsQ09HTagzUR/yA8C42Na7fpHQxtPdEiSpA0cISRFGpy3RkvHywzrUuXAcT/IeKQGUgZJKaSI3pYTJwwdN2p8MhnPW3EnsseJfWO06RQxfLO9XdNvtNgAy0pgnc/7EwAxAw3iZQ7GgIJ8BybnO8wlAm0YHQFGMC0ApAt+se024JKOkUiHCOmWpaQPSLGmW3R1yyAm0NsIJhZOVdy3opCano45y+5AZk5OzCZHd+9G++VLEXicsRWr15d/bETAEgPU1VS/Ds6fNCLkcDoxYXIB8gomI2dCngaFxFJ3Zxfob1JQbnZ0oLe7O+qEyJFDjFA42QGbZDDMy3bgmk5TzgkBky3kRhjpEUajmtVrQcO5ReBkcw8uXxMeTz0H+4E+iyhMjXwIBSUloKhiNQQDfbh07rzCVHSDMACvy+2hm5khCDNAfY333znH3+ip0DUnf+pUzFiwMCaHqhHIa3X14kUlkKHH32XalhTGkkKnsYGIGODGABPQWZ0bAhwWvlQSFKdiOGXygv23izhh58EuBHW3Aj0pxvAPPGT7AXkTjVLJ1Ph6BtBZ+/SkYyaOCjFAnc/rAVClpz4uLx/z77orzqXpbxYKBRUmaDt71oyDQcdCSWEKpkw0EftDGUGAAc1OwOzUoM0nJogTokkBDr6LMVblWu/RuI5jMYHQUDgaXBs8s2LhxmSA2prq5YxzijfXuGsLiktQumBBLPrCv4dCIZw/3YBzp0+DmxjXJ463Y0ZRKkhhTCiQLaE1CnORdCHlMqwHkOJIgoakTQzpcL0zhMMnDY47hpcDvX3fNSsFN8AEdG0zrhwRfQH+xeX2fE1kjWIyQJ3P+18ANEWJps2ciaLZVNUs8XCzo11hAn3uW7gncgXPLU1DijPm0I0HF2T9hqMw0P+fVmn9ZlMi5TA/BFzUKY0CCuJHB7oQ0voKWlxuT0ms1av9WfU4KcAf4zIeA8OKWPgU+cNk+YerNnxzeyzc8O9RV3HApv+amljWuHFYfE+EV1G0P2E8soqdOXnCMOKVXMWLZqcpQSHCcNXWbzkkoCtfXqj/tnDBfkuPCBMjsoIXCUwK9useUeBoQzfab9zCoXvGarfHkh28bmP1X4HJjwFSCSAXACwNDKfA0SAx1iIztsX1peffFV6PAURTBtiz6aWcni6Zcs00EQxmFi2rHYvg03225eQJXL+qcWsONiUmEPYe6jV+mnl2CLiuu0nQv9NV0j9gao41UAHDU+PZXly4rC32FEJo9hr3C9oMz1h9DcPvpgxgVNcmNy8fC4ao9MUzh1MHDpjenZfNT0d6qoAkaHL2G35igdqQRBZHsgiaXSxIJ6AjIAacvxRA8zltWgGH9PBq9/MRdYNi0Ur076YrUuer+geAfV3d4bwVZJpMfCCjyKQajxzBhZZmQ1QhJqAvXX9+66mRskdftBpIR2i1A90mTEa2B9INojihrnYEcbyxR9cb+3uXu/x7InMfTpwoDFC9A+CDlQyoosVd938ybg9VIiZxubUVJ/fviyCVlkqKYWpsSRCLCSYGgXG685ysgmrTsNFESBJMCWj9CSo845vAKGaArb7KXAecGoNybn4+Ftw5tDt/IpiADB/k69ZDZoYN82ekxg4joyvfhShiXe9LMFISjSZCCiXpDgZgwgBfcbnLyax+W8FQAmzzeT8rAb9Sj4yufXT9Gw1AFsTjeyNN2xRdNGd6avQh0jGgV/z0LcIm5c4BHUD9O60YbTbpB2qwygAy+6LrifKf3e71NGSA+prqFznnGvvxkrIyZObk3u7xDvZP+gDpBXqYOtmJ4ikm9/poTiQ9Iboq9kmA/oYXNg2TGZr8EWEoCvRfLwUlwKhWAvUePyZJWPWQcAj/iDFJ8/HjON94OqK/mcUpims5Aoy8fxRJRMeCCOi/ctIPelm/hTCKEth+PYijp7VKIEdo7Wr3Cx+IdDucOIYSoM5X9UuA/Y9wxympaVjxCU1283COyRJto4pZZChaOCstMq6AJABp9GF3L20+KW/073Q0kF8gGlhxNavoUOh4S6tYgIalyScA2YQBvFsBDOYuky96SVnc1UiVYZLyRme3/8at7NWUtFTFxTmUo6Wn24+ju3YrrmY1UMjZgpn90TcaoC+WAkrooyeFLwy0+WTj15/tg1/BQLiZgClB36WhQ0i2Zbue+EZkKm8CNtUKCWMG2Og9BIZB/+64iRMxfwWl5FsHKnBMJt3uLnOXL1XMzisowMSpU613ACjxdFRCVQ/TJjtRZKYPmPXU4gR6THaZooUmBywHh1CMoC7R9KbL7UlMXnhcK3arkTED1HhbwVEQRqNS5jMXLbbcFW0+FTgWhdy8PBSWzgD9bRUovu7MyYiQN+VqSFlGQiCiJJLkKAhYihOs36uVTgBOutye4fGmCU00FgP4vHRgDWpRlNRYPMfaeHv8fhzcvh2BPuuVVcjVXFhaOhhAKTqnI7t3oUNXSJm8h4vnpCsxBTGBzL509YsFpO2T1i8ANzpDStKIDgxDtAXIJRzFTAegEiiDImrK9OmYPi8ipyDqYJqOHkVrs7ZwJfnxU5wSnHamxM77dUkUaoLpWVnKsROOohWZeef1DsVIRLEFapg+VTCYpNGpVQTD2r0+/JyIzxFjbEMF0CREW2SOicYxY4BGqKpziCQ2qAdmVtB48Zw0UIhXGDr9IVxpDyqeMqM6RxQNS6HRFG8oCq1NTWg6dlSDTrEDS+amx7YSql3GRKFwIMScAkdJcQxD+PYgMKgTTT3KHNXATUK0BcglHMVMB9gNfisAYVx+PuZbMAMbmWsn5zkwo8g4/u76zRDIZWokEajvuXcst+SDoLh4SrhQQ1QDkRqRNprsAnTnV0f7kPWQbggk/vX+gijb8vERv1J5RAU7XW7P0KpFJ5ANjC2BPu/v1FUurF4DL7S0oPHIYc0wRXz3DS29aLsaebZStPHcO+4QnraR8km2gSVz0kCOo5ECo/Ofy/zbokUcR2KcZkcA2agHiwrRObxirbghyKiU6dJ56UIRPEZZNbQQ02bOQtFs8VSp4x9/jKttFzVrSLkGM6YNX2kW/YY1n+/F+TYtQ3OOlas3GFfsGokN1/dhJgFe4cDfhpEpSfGeB8UTgYwYYMXCDOE4PrKakfKkhznLliGvQOyhTYoiOrxT6zUkJXTZvPQRqTZCca37KFt4FIt/Wl9DBuh/1pT9L/UGLL9vLShLRQSMGGDl0gzjBA8TgkbWM6qzQy5puiGIQMOhg0q4uRrIUUT6wHCDURDIaBP/pgxQ5/NSATtN6XF63ky01AkFdDYfP6ZZ47uXZChl20SBrolHGrrRpcuvsxKWRjGFB3doA2QpkJSOo+GGU809uKTLChpt4t+UAbZWVtodxSl+gA8ag6woYu2XLuHont2aNZ5XmgoqDGEFKJDi6KluyLqYvJJ581A4vVSIFMUNkA9CDRQ9NMHiWIQ6G0CipFDKC9TBqNL+w2Mz/STrdTcBCgm7+1MPKGnLsYDy/vZs/aMGjbJ6yCBjFchGQFdENVCNvUX3rBI6kii/gDyGahAKHDEYKG1sf1FJWSkHQ8Ul6aynyOTMjP7ahSTlTp/pVSqJqWE0in9TCUA/bPN5PZIuHWzBXXcL2+npZSt1jvpQRO+x0z1KjT41UL09KrgoAoc+2oEb17R2gTvmpwtfCalvSvLUG3T0fdO3QRHKlBmsBdaaapdXWHnIQWReicAx/Zy31VTdL3H2vroTK69dkh2A7AFqsLLo6na0AcQEarDbHbhjzRo4BCpukiJICqEaKOG0cFJ0ZfByexAXLwdA9/mhwGj9+qNKgK0/qsx0pDup3uigTyAzNxdLVpUJrYWR6J1W4ERRQXwauJEUEH15g17g/viDrZrCiSS2yThlBq2XAmjSxfILTTxSLHSn2uQZo/Hrj8oA9GOdz/uOvuIXJYaQJh4LaNH3fviB5higcjBkk6e/rYKRFKAcBcpVEAGj+rlm1kkjA05EH5INwew8SN03IfVGKHy6E4C/4Vpf8ZTIOEcaJ+pO1Nd43Zxjo3pQVl68NipWlGgpQMdAWkbsEqxUPJmYQA10BNBRoAYj503491BGLgKTSxHKGo9Q7q0EGRboheS/AeeFBjgukh/NAJjxU++1G713M4aHKfVUAvLBkA6ONs7QJjF8uOpLnt8OJ1NEZYC6N7+bBSlEobeDKcrkmVt27xohD13Hlcs4sksbqZNoKVAyd64SRBILjI4B8guQXhIG4wweQE5JR1/hHPRNnQNI0ev32dsvwnnuBOxXjcrAsO+43OXf2vNWVUF3H55mEvvz2HWTWSvA/4sz9lOzMi+x5h7t95iyuM7npRev6OWrQbBiFDqwvR6dHR2aMcQrBSjFevchP0IqwwC5jOlKKAJGx4A6rcyosJOckQP//NWgv61A2pFaOC7rSrX1h6P+BGCfUz8mKUqXij2B4cdl7gqtKBMlYCSYYrXdVuMtkzg0VQetWOOo+sepg9oHLUkK0PkbTwXww6e6Qe5jNZCfQqSo4sUzLTh9WOulpEQSsgsY2Rvi3fzw2IyYINZ6C/zewRieLVvv8QngxkSJKQGIQr3P+z4H7ldTo9sA3QpEgJwy+hTveI0xRo4i0bd3jEzDk/IcyEqX0HiuNyIopWv5QwhlaYsyicw3jCP1dCFj9ztgIbHwMSu0E3W1FGKAbRu9X5EYXlUPkMqdzVqyRGjMZqlcwqFaql46boZw5JQ2xm7O0mXImxLbS0ihYrvf3xIRMmY0iWDeVPgXrhGaXzSk1BM7FeXQDIJ50xDKzEUocxzkjHHgzlRInddgu3kNts522K+cBQsaM1AikktEGSBfYqC0XE2tU6p8SSHdImAYI8iABbMsFHkY6EgfZStaVpVqD5GJmt7ciwXd810ITBz66x4Z+7fA1mFQu8+Zip4ZdyAwKXolcWKElKYDsF9TniPSAWtlNvnBsscrtOdarMmpfhdiAMKv9XmfZ0C1mrYVXYDaHduzB9cuad+9J9PpHJHU7oGOqS7/zgPaHAMRBiCzdMPBA7h2KXIz9OsVzJ0E/9JPWlhGY1RnawNST0a+1hYcVwD/EvEAG6Juv3oe6YciM8lEXwg1m4wwA9CVkLPgTsbYPDWxmYsXY9JUsUJW5CSiapb6t+2sMAE5YyjOTg2xGIDqEO7bti3KC5u3qAUnFKJ32jzNPT9eTsj4+F1FlKtBzhx3rXPFuoi6/SJ90JGQsWdzBGq0SqCx6AozQL8UqP4qA/+RmmhGVhYWryoT0sKpHSmDxASyrNXkiQlmT0+NGTZm5GqNxgBGnsnw+LndicDk6QjkF4E705T7fqx7fqwFDf/uuNSMtKP1GnR62Nm/8i+eDaVmagpvidIkvNTTe+E8q421YGA/KHOXa67qojQtMQARrfNpK4fQv1HSCCWPiIKRVY7a0tMxxYVO48zeAeJG17XZS5ch30QJ3PvhhxF5g0Sqb9o89E2d27/pwwBpJ3bCEaH88UcD6z2bupvO7FOn3lnpXrlZ7P0dWJ9Kj+E47NrgWWSFThjXMgNs21j1RYmxt9SdUVVrMsZYeRXL6E4epkk1gil+wMhOsOdwl+KHV4PZNbDx6BFcaI6sK+RfdB9I1A8nZH70G0g9mpSw0y63R/lK3m1qeZ7r9CkrY0k7th2ONm3STQBs+lp3uXERpSjELTNAvxTwvgfgATVdegyBSshZAaPQsUHOZFBeFqEoInoYkupFt10NRtThpzhBeoRZbwii1LR9tdsg67KE+ormo6d0mZVhWsZloSCyav9T247zX7k2VCgFN99tairhzEYlUeOKUU85cwQpjTpjIGd/7dpQrus09tDjYoBa30ufYQZPo8ZTQ9AogDT2sG9hlMydp+QR6oFe4aAag2oITCxB93wxd7aVMehxpe5OZO78jeaf9Yabdxubf8gZM3xXOFbf5G9IP0Av0msgalVwM5pxMQARq/VVvcTAvqEmTK9iLLrnHtCRYAUok+jsyVP6d+5iksjMzsHiVatAFUz0QF+//6Y2/b5r2QMI5cR2ZcfsOAaC7fplZOzTPtPLJfb51V8qH6y79O7pFheXUBtPX2RZzKrdpGvK33G5K8i5ZAniZoBNmx6xTelaRhFDg4UkqOd4joLwiK1IA0oZo5R1OgL0QOKfAkDUQBY3/8J7LS1OvMgs2IfMHb9WmYD5NZe7IsKmvLm55X1wrYldpE+KQcjcqXubmuFN13qP4VsO0WjGzQBEdOCZOJJFml2wEjOgH1z4HQEyH3fdoCRlLVBA6KSiIkybMdPwyyfsjitXcGSX1gDTM/tu9E0Rv6mIbEQ0nNRTe/qtd5KEUM7EI2sffCQigHFz05m/Avh/WO3LcakFaUe1r4Ixhr8rW+95xSqtITEAdVbr8z7LgIjXqMzOZisDJGbw37yBHn83bHYbnCmpoGLVsV7eNspN7Fr+aSWQ47YBwy/WlRT/pb7/zU3NFwA22cq4SAEkRVAN8foFhswANIi6mqrXwVmE+Fm4cmXEEydWJhovLlUOowpiarhx36PxkktcO4ZfrispfkRNcHNjcwUYe9FKJ+kH/wj7tQvqJnGXnEkIA2zf9E9pclcP2Sg1+gCN8HYwQdu5s2g4qI0Cvrnq84q173YD5/jNn5UWfzY8jrfPni20BWXhV6ScZ48i9bS2XC4DflHm9kRIF5G5JoQBqKNtr1ctluyMmCDCwjLSTGAUkXzbjwDVbnCOd/6stHhQY9/cfOZn4HwwGzvaxmVv+w9AZ0bnjD29en35v4psuB4nYQygHAU+Lxk66IWRCBhJJqDXs/bXaW9YI60ECmzGe+umFysp179taF4l2ZjWcWBAgHwL5GPQwccut0csNNqAZkIZgOjX1lQ9wzj7oSET3L0SORPij7ARWNRBlJ1bfq/JAyDTL5mARxVw/GFdabHid36nqXk/AzOMsKGAEDL/GgWaDuXrp34TzgAKExikl4cXftaSpZhYOLx2eOrLqIIo+eDJFz+6gH24bnrRfe80Nj/JGHtdPzZHW7MSU0DmZQPx/esyt+dzQ5nPsDBALCYonjMXlGY2nGBkVKKwK//iTyhhV/ECuWPtl1oQys5Dz8zl4InwJjLUryspdv1+/54A6+myS/7rSjiY1HVd71BSD7vD5faIvSkbZbLDxgDUZ53PSz5qCiuPAEo3L549G2mZsZM64tmsUDCo1AbQm4PJ99+9gMofWAd9lG8gfxq6FyTGupi5622/5L8h6Jtmb7vc5Q9bn0Fki2FlAOpux0+rPxmS+RajwZJBh94hoEqkwwH0nCq9N6QHq0xAvvfUU7sj4vyJbveclQgUDE2akWuXzngRoIcmy9aXf1MEVwRn2BmgXxK8uJKD/R8GZviSJQVzUECJaOkXkYmFcfZt+xBkUdQDiXDK9CEPYTRwnjuuZProfPuDTeT0bJCTiTus1z4gIkwOIX3ve4rIjwFbAP49l7vC8GOK1djs9xFhAOp86xtVCx0SewUMa40GQwUoiAkSqRtEe2gqPAZSCikBhMzEFCIm9XaD9fn7w7JvXgPri/7INdGxKlHU809pPoiU5kOG+8OBJsbYH7iMP67eUP7zeDc5WrsRYwAaxOZX/jYlJ7vg+5zjK2aDoqgieimb/mRkW0vHCtPs6+1VahRdPk/Z7SMDVpmAGKv/WNEWsVKkAvjX+vwB39pnKiNFV4KnM6IMEB57ra/q7xjYP8eaC7l8s8dPwPhJk4TCzWjjKdSs7cwZ0H8bAIXRWAtb0hFh4N/lkOYD/DMRx0rWeAQKZkX1OtKd3tHWCEdrA2xd2pxJhR4b2VTy28IANM9tb7x4lyTZngHjj8diBPqdgk0yc3OUv0lKUJIHVSKneH/S9OmcpzcJ9CFgg7Q5fuza4Pnqdl/1QzL4/wZg9QGEDzhnVas3lL+/57XK9J6UlPfAueErGnScyBm5kNOylawfKiQk9dHR0g3HxaZoV7sDLCT/RdmT39SWVhFZoDhxbhsDhMe7vabqfhnSM+B8SAaN6PNn33O5y/9ejVP3ZnizXqUAAAGhSURBVNWnITFyEUZxE7IjXJZ/CUn+QP++T/0bLxZzm/TroUqUW2Ni7wRSHOvXfuG5K3HuZVzNbjsDDDICfZmcu8EQl1fLcPYM7TzEX4lVm3fra5V5DnvaBNkWyrMz5reHQlekQPDqiqcro5b+GHhfkQpqxhWTPzhmhh+71nu+GtcODrHRqGGA8DyUdHTw9eBsHYDYGZ8GC8CAPs7xJnjoB64nXtBGhg5xwYyaD7yz6InjWNksg//iXndFzTAMS4jkqGMAjZj2fXcleMgFxlwMKOXgxBCm3iQOHGTAb0PB0L+teeoFbfqM0HIMDam+pvoBzjl5ROmPWfTpfoBt6ffhl2uraQ6t+7haj2oGMJrRkU2VzktdKVOcEi+Q5ZBifZFg7+q02Y8++PjXzV+mimt54mvU5KtMbePOUtmGUs5RKoP1QOYHHM7eYyu/+O0b8VEdnlZ/cgwwPMswdqkmGWDs7r0y8yQDJBlgjK/AGJ9+UgIkGWCMr8AYn35SAiQZYIyvwBifflICJBlgjK/AGJ9+UgIkGWCMr8AYn35SAoxxBvh/Q/XtNRJsm3AAAAAASUVORK5CYII="

/***/ }),
/* 69 */
/*!**************************************************************************!*\
  !*** C:/Users/15277/Desktop/order-app/order-wx/static/images/food_4.png ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 70 */
/*!**************************************************************************!*\
  !*** C:/Users/15277/Desktop/order-app/order-wx/static/images/food_5.png ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 71 */
/*!**************************************************************************!*\
  !*** C:/Users/15277/Desktop/order-app/order-wx/static/images/food_6.png ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAdAklEQVR4Xu1dCXhU5bl+/zOTHQg7hB3ZkcUFEUki0lb72Gu9t1XitYtm4oJor219KiUJ3mI1E7XttdXWGJRMbL1WQ+1yr9rqrVolQVBcQEB2QoCQsCSE7JmZ893nO0PCnJlzZs6ZOZOEMt/zzDOB+Zfv/773/Mu3/EcgThe0BMQFPfr44BEHwAUOgjgA4gC4wCVwgQ8/PgPEAXCBS+ACH358BogD4AKXwAU+/PgMEAfABS6BC3z48RkgDoD+KwGqWHsJQAUAlgEoAfCYyFle0385Pv84i9kMQOtLl4HgAHA9SH5Y3LJijRnxUMVzXwLk1wEk99SLoB0zfV6IZWMCgLPKr1ALVHaInBXlRoRMr5SsgZB+ElRWiH+IZXcvNdJGvIwxCVgOgGiVp1ufxyPoJrHsnj8aG1q8lBEJWAqAaJVHFWtvBOgv2ozTnSLnnnVGBhUvY1wClgHACuXR+tK/g/DlYPbpYpFzz07jw4qXNCoB6wAQpfJofemdIDwXxLhXnixuXVFtdEDxcuYkYAkArFAeVZT+FsB3VewTnhC3LP+xuSHFS5uRgDUAsEB5VFF6EMAkP+bfFjnLv2JmMPGy5iVgFQCiUh6tWzcQAz1nAth/SeQs/7b5IcVrmJFA1ACwQnn08trpkGi3inGBX4ply39oZjB9WXbDuiKfocsubc2+Pf9PfcmLmb6jB4AFyqPfl1wDm/Tu+QqAqnLn40RY2cM/oUKSReHiO/P3mVFGX5SNHgAWKI/+5BoMd1djgAA+EznLL+0LoZjts9LlZPBeE1CvBkIUZOXm/7fZ9nqzfPQAsEh5VFH6KYBL1IP3zhQ596qXht6UjsG+Kl3OIwDGahYX+LXd3lm46DsPB+5xDLYe22JRA4DZs0J5OlbE9SJneU5sRRBd6xsr/itFbu1oC9WKAD4iUGGWo/D/ouvN+tpWAeAJAA8GsGdKefRqaQa8YgtAY6Jpx3oRhW7x/eeK5kl2sdVYv+I/sxz5jxgr2zulrAHAy2uvgEQfarBsDgT6XsANkDy54qZ7D/SOWIz3UulyfhPAq+oNrASQrNOIeJ1kUZh9xyqDoDHOSyQlLQHA2WXgDwBuCmJCCFPKo4q1rwP0Nc3BSPJl4uYVvFfoN1RV7lxJhMf9GWq9/Hok1B9A4hHd7cspEAqz8gpK+3oglgHgLAg2ArgqWuVRRen/APi6RjttcHvHiW/fG3hi6DM5VpYXPQcSd3YzQAlJaFn4dfC3raURqdvegejq0OSPBFxko8Krv1t4rK8GYCkAzoLAEuVRxdpfAvR9DcG8KnKW39xXAgvsN/AI6B04FDwD+FNS9TYkVX+ux/JOCShc7Cj4s1aBTWXO2bKcXLf4zgcaYjFmywHgA4E1yqP1pT8A4cmggRN9S9xyz+9jIRCtNrf8riijSxaXez20QBLIICFlADgFYDNAPwUworuee8QEtF+cHdSM/eQRJB/4FFKbzmlQpq9l3VH4V/+KVS5nBfniIZmeToTdudCxss7KcccEAAoILFIerV/7IxD9LGDQm0XO8kVWCkKrrffWFV9nl+g7FOilDNFx1/hZ6JhymfYq2NEKng0S6oL3siTTw9l3FPbETVauK7oeknhD1RBhn5DgzMwtcFk19pgBwAcCa5RH69duB9HFqkFL0nxx813brBKEfzuVLme2b/kRwZvaMB16hmagfVamsgfwJ7MzQKWr6KeAeEirOwGsJyE9nJW7ake0448pAM6CIFh5Hmm0+NZd9UaZp4pnnwfEHery4jaRc/fvjLZhtBw7dYQkggNSjTYAQE4ZiK5xM9E1drpSK8weAIFPP9epdDmLAazS7ZbQAkk4s3LzuVzEFHsAaCnP5NNLr6y9CYL4mHmOhCgQy+6OavCBUrNC+f5tdk6cg8SjeyA8XXoKOmUnXL0oryAo3G2Dy/kLATxgQLMbAHlllmP1JgNlg4rEHgBayvPKS8WtK/5hlGFNAMB4mLmRfipdxfcAxMknQWRPSEDGpElITk1D6gD+DERHezuaGxvRfLoRJ2prIXu9RrrpKcPTeKajQNfMXelyPgXgP/wQz4tqqD6eznIU3G+KCQ60NlvBbHmqKL0bgNrgYRoApfdB4NfqGQBfFcuWv2WWH63yG8seXSxL0psgDAj8nRU/ZuIkJKel6XbV2d6O2uqDOFZdDaKQSmKJHyMS38925K8PxXulq6gEEPf0lJFsypKSePgL/WqEfRB0rxmfQ28A4GkA31NxbRoAGokiXs8Ecet9h6MFwJaKx9I7WulvAAWdKmZdvgBDR40y3EVLUxN2ffIxGBBaRKCXsh2FhqKcKl3O5wH07HvInojmrGWwN9QisWYn7Kf1t1DhZhd/3noBAGvfAuhatUA8A0XOfS1GJEt/KLkUsvRJQNlqkbN8spH64cpUlTvLyJfCpqK5i67CoKFDw1UP+v1MQwO2b94UNBNobfRCzgDlxS+A6LbuMpSYjObF5w4lSYe2I/HwTgiPW7sZQotkE7ctDhOdFFMA0Ctr8yAoMJnjryJnubatX2MoVFHKT/m4gJ9KRM7ye01rJ6BCpav4QYDYk2mJ8rsbObJ/Pw7t3qVulKg4K6+QE10N0QaX8/cC+PfuwnJSKlqu+oaqrq25AYk125FwIuRE+E6Wo0Aj18LXVMwAQC+VDoedKgExQ8W1JFaIm+9+NpwU6KmnkjA6eTtAUwPKNgLeq6INFNn4gvMGWcb/BvIxedZsjJkc/eTCs0DTKTYW9tABKS15zuKcB7TXhyBwFv3B3w7BR8uWK2/UFFti7T4k1uyA1KE/qZKQbs/OXcWh9yqKCQDoz2Xj0eVZFzz1Yz/guSTc9E/r194AohcBpAeN2IIM4XefL56aYKO9gW0Pz8jAjEu1rXjhABv4+/GjR7B3a5DH91+yHAVvbP3tz9KavfJcAe9cAuaCP0I0CkIj+CPkQ0TiGxDoSYSV09LRcsUNumyIrnbF3sBg0CMh8GFmbsGV/r9bDgCqePZaENZBiPGRKM8XGAI+Fw8Oqm9w9ginrEqXk5/Cc2nnACRJwqjx45E2KB0jxo5V/h0tffDm31THQ5nwE0kSyUTkEMBoM+1rOZm06ttPHVWAwMuDFgVuEC0FgBXKo5dLfwBJywFk/o4BLQFUupwasYfqkpLNhtETJmLYqFERbQS7W/vonbfR1aFyBfOOLcGM4rvL8imgfdZieIZphx4GthnK+khCLMjOzf+Y61gLAAuUp8wgEOrzvQXTPg92g6toj4CYZkYBw8eMAe8LEpPUtn0jbXy64X20NTcbKWq4jHvEeLRffLV2ednrMzsf3hUiIglwQ0xe6shX8i2tBYBFyqNXnn0RggNCxHsQ4hWx7O6oQqvffuHRsUle8RmEGG5Y0n4FeUZgEIyeMMFU9S3vvqNrEwh6YhMF7HaB1ja9ULJzNbwDhqJ1wbmYAzY187EwoXYvhNejyyMBdYJEUVZefo9RzVIAcM9WK8+UxDUKV7qKeEbh3X7QI5w2aJBi1m09cwZtLeGf1CEjRmL2FVcYYmn3p5/g5DH9QJ+h6XYMHmRDSrKEtBQJCXafKrxeQnOrjDOtXpw67UFbuzYgeEloWXiDEnaWyIrX9zdws6dBVGJPtD+z6Ds/5hD2HrIcAIak00uF3nc575KAtVrdDRs9GjMvu7znJ7beMRBazjSBz/Ekawt+/LRpmDDN5+XTIzYLH9ypfZ0BK37UcDv42wjVn3LjaL0b7R0a/AgBhDA9E6FTSOIZL3lKljgeCjr1WL4EGBlQb5WpcjkfIOAXWv2xff+i2erwAv9yzadP48j+fWioDza3Tpt/CUaO1d+ItTSdxtaqqqBukxIFLhqfZFjx/g24PYQDhztxslF/eg8eJz0rwfbMYscq3Vi0f0oAbHx+zVCvSLhfz6c/aeZMjL1oiiEc1tXUKEDotu0PHDwYc65cBN4T6NHmt96CJ8A8yw/qxdNSkD5Av54RhvZUd+BEQzgQiHJZ8pZcfftqrTD9oG7+qZaAyrLi70HIqwER5MERQmDa/PkYMcbYMapbUh63G40njsNmsytHQnYN69H2TZvQ1KCy/ilFp01MwshhEZ3+grradaBD2Rto0B+FkH6VmbvqfSNg6i7zTwGADWXFtwoh3w+IkHGCA4cMQcbEiaZBYESgvObz2h9IE8ckYtzoRCNNGC6zZXsrOrvUbmdBuDczr0AzniFUw+c1AHiHL4S4nwj6NlKN0Q8ePgIZkyZi6Ejjrt5QQjx+5Aj2bgtO9Bk1LAFTJ5q3H4RDQkubF1t3BbgUBFVm5RYGhyOHaey8BMDGFx5dKMsSewNvDyesUL9PnTtPMf9GQ63NzdixeRPcXeqwr0EDbJg9NRk2KTYi3rm/HY1N6igkIcRXM3PzTQXJxIa7aCSqU/c91yPTJFm6UZLE1wlYEqoLXucTU5LRduYMGk+cCMnN5NmzMWZS5N6/HR9uxumTJ4P6uGRmKtJSo/cn6DF//JQbew91qn4WEKsyHfmqNLVwqujXANj8gnOYh3AjCDcS8K/hLJdDRo5UlDl4+DmDX0drqwIC3sjpgWHC9OkYP9WUhViRa/WuL3D0QHCM/4zJyRg+xNg5P5yC9H7nPQDvBVREqMjKK7jFTJsRA+C9skfH2yXbLC/JYyTOlBFoFsTxbtJRSXIfXnz76qNmGHn3N2sGJKXY58nCNg+Q5xOkeULQPK04vcB2B6SnK4pnL14oqt61C0cP7NcsctmSa5ASIu4vsFLN3j04vFfTtoLEBKF8Bg+yY/RwO5ISYzMTfPZFG1r9LIUCYm+mIz+0lSpgIKYAsKG8+HJJlu8mIa4LuNItWKgEGQJ8tTuHq3R/QwikEiGNCKlCUCogUgHwQjzTDGC4LB/t2Fkzbd585W8jVH/4MA7s3BEUxXv5kmtCBn76tx1K+Vo8jBhqx4ghdgwxaP0zMg4uc+BIJ44d9wsJI3iy8gpMnTeNSY0TFcqdPwPhR0aZ681yHMTBwRxGic/q1V98AQ7iZBoyYgRmX7HQUHWzyvdvdECqpBwJhw22ZnkIAgBwIstRMNLQQM4WCgsAzk71SniSCPzU9wmx8SUpJUWx1euRWRBwO2zqdbu7kD5kqKGnPxrl+/M9ekQCpoyP/ni4+2BHoHl4T5ajQB2CF0ZjIQHAyvcIUQEE5OXFGAYJiYlgo03awEFgj136sGGKBe5UXR1q9uxGW4t27JvZMG4zwwilfD7r83GPN2adXbLyfabFC49XP0cgJUnC3BkpPV5AM7x0l92+px1NLaqj4OYsR4GppFldAFSVPzKFyP4XPeXzhmnkuHGKorqJPWhdHZ1KFExnZ4fyrfz77N8cZiXreNnYwcIGmrT0dKQOCMrPUMnn4Bc7UXsw2OrGYGFbfShzbSSCDqX8OdP1bfxssj3e4EGDtulWYeXS2alITY5sk/jhtlawo6ibBPBypqPgVjNj1AVAZVnRHyGEOg6ZozSHDVPCpcysuf4MHd63FzV79gTxyEpb+JVrDW/muIGqN/iNMmri0wCf7a2g9tZW5ain5RXkJ37W1GRDDp6WNhmHj3WhoSnYhs8OIgaRWWrvlPHJDvXlZATkZzsKHjPTliYA9JIkJ86YgXFTAqO0zXTnK6vnL2erHFvnjBKf63d+FOz0smIp4GAOVr5Wlg8f8aZPNqZ8/7EcqetCzbEulQs/UgDUnXRjf43aEEQQ12c78v9mVH5cLggAlesemQGb7QMQzs3tAC5euFCZoq0iPo7t+zw4vd9IwIU/D3yk45w8f0ofOgxzFplaClX1OamDg0K0iCN42Ls3MC0y1y7vDXg2ON3sVdrg/UMkS8DWXW3gmcWf3LBnLDV5g0gwAMqcz0BghX/D7DSZtWCBVbrvaYefMg6d8ife7V9+zVLDS0FXZyc+3/QB2OLXTWwRnL3AWOiWf98cwMlOne7jYeCA2brH3r3kpMjWbP/2ePMWaXyA1tMviNZm5hUuN6skFQC2lJYmdCSeYgtez6PO0bBsJbPZrTm7BjK448MPcfqk2l7P0ToctWOUAr1xZmcR7qf+cI2yN2FAadGQdBsmZCSBz/J9SWz527G3XbX5Y378Q73N8KcCQFVZ8ZdI0Nv+DUycMRPjphiLoDHTcXfZk7W12P2Z+uq/1IEDcWm2TuizTic8m3Bg54BB6aYyejmDp+7QIXAYmBEaPTwBo4Yn9AkQeL+/c2+7snz4U6RPP7ehAkBlWZETQuT7Nx6JgcWIIP3LbPtgo3LZgj/xGs5reazo5LFaRfFNDZHdvtYXQDh4pBO1/qZfnwLrbRJdt+j2wojuS1IDwFXsAijXX+jzM7PAzpZYktaGMFYAOFVfh7pDNUHLjuqJCh1sqxLFtEnJGDk0Nsujf0da7l/f1E+3Z+cWBiV9GtVXAACcbwJqk++V115nuWFFiznefPFazmS1QYePcg3H69F43OcWDkUcxTNyuB2yF0psfrPykZV4fT1isy6bd2NFvNvfsa8dHj+jj9IX0ZNZeYVG7hHSZS0AAOqUZK7Fxhk2zfYG8TrO1kSO2Q8VeWuEF97MNR6vRwMr/Xh92KtbeIfPStTamXe5Cbzzrj/pBv+tRZPGJmHsKOtBIJNv3Q8w+TIL79SmTb0uJyfH3OVEAcwH7AGcT0Oor3OZe9ViDPIz9xoRfl+V4QjehuPH0ah86uE1cHHTkEE2ZIxIMOSq7QYCG3S08jHGZyRiQoa1DwvnAxw7EXgLCDWQkK7rTvCMRt7qU4Cr+F4C/ca/wanz5mHUOPNxc+wH6Ghvg92eoCwhtgS7ElptFXncXeB4vLYzzb5v5XPGkNKZB47ZY8VHErnDJl0OxwqakgEsmJNqWQCI1nmfeZcg7ljsyC+zQpYqAGhdnGDUPMseOt5Zs8u2takJneq0aIVXdgaxocf3SVW+k3v+7ft/foq9Ho/yzQkWXve5v/n/WNHcR0dbyJd06MrGbhOK0qdMiM4dyxa9vdWd6OhSW+OsAgDvPXbs69Dae0R0HZyeQIItga7iDwJvzOKESE6M1CJet0/VHQuZCGkFUq1uw4rpmo0yBw939qzPVrTJ4/TKhJ37OhSXsj8JId7vos6vLnWs0b5/PgIhaQCg6EFAqC5OYg8gu1n9iaf4/ds/V9bc/khsX7fZhLKL1yOrFMZHNPYRROof8OeP9xYc6KGR/XOGg3Ky8wo2WynvIAC86yqelADazqcx/478zatsNeNYeCObLCuZDdUWB1gMSPOlWqel2JTUaybePdfWuzVdsfy7VSCwYpwcKsHK13Ibg3BPLN4woukODr6m1Dc8BgGTXjRstxA4113Lw8URMhzAwN86cSGG5MhP9sA03xPHtnlWOGffhiJOqjxS36WZb98fQMB2BlZ+4xmNGUugJCu3IOpr8bTkoym1D11PjO4izwYIGHb+cxIEn6GHDrYb8nIxAPwBwTtq5eMlJc4t0NXZzfzc6SnKDj4S4iAK3rhpLQsXT03pmTUiaTuaOjxuVn6gjZ/bjCTKxwwvuo/NxvLiW2Wil4w0NnlcEsaMtNYIsv9wJ+qCzr8+bhZfOoDDyyMinoE4zfp0wJOWPtCGOdPMR+ZExIRfJbebsLu6A00BDh6liBAvZuXmfzfaPkLVDynGSpfzB4DGjV1nW+SpmIMjrApzDmSUN0KcDh1IHGc/fZLqljdTMuKN1i5eawNi9WIB5FCMcfAogzFwt++rQ+VZjsKgK2xNDdRA4bDPkQ8E4jGAVAdn3vVOn5iEARFGxhjgTSnCS8LmrQEpUJyVEqXplZeYz/e0qfYivHfhSF3eUMaaOjpl7NFZjgh4LttRwLesx5zCAmBDWfFFELRNBJwKeiP/rXv0vGZv2x18w+rsKcmGTLh6UmST7qFadVYvWwf5KpdYEu9F9hzs0N7nEEqy8mKz4dMaU1gAVJU7HyHCav/KbEljAPQm1dR24XCdWll86wYvQdHQdna0+K2/fHnTrCmxGxsbj3ja17r9iwhPZecVaL0qL5ohhqwbFgCVrmK+sLnnRiW+QXXe9NimPmtxzNaxz/e0q+7RY14umx2d7Z3XX263m2I5s7HBqPpoV1A4F/ctSPwiMy+/11PvDGQGQfVmqr48M3M0DEfF+NOksYkYOyo6D1xbh6wcPQelnTMgWfnI8ZG3+qiWV8/XC4Eez3YU6r8gykpmAtoKfQooK74Tgp7zrxPNOTzacfARjlOi/X3ybAiaP5MTjPsn8QzDT72eSVoIPJqZW6D5erjeGFG4YyC/FZvfjq0Qe9KunK//7pzeYJiFebRevReYPTUF7Nfvb8Qz1qHaTj2rJ4GwMiuv4Od9yXc4AGwB0HOdJtvX2WLWl8SbKJ4F/KkvlyUtWfAMxYo/fkr7Tj8h8Kksi5XZefl/70tZKnuPUAxUupycHnNRd5loDTBWDdY/SoZ9DnwJI6dr9Qfii5uqazt17/hlA49MYuXVeQWhLy/qpcGEAwDHTPekiLG5l61l/YHYacLGFDbhRpJaFYsx8DGVj6s65JZADy52FP4qFn1H2mY4AKgiIDnokS1wcVJLgP0KHLen6cb1Ff2I4F2Z7XjI8Msye0vG4QCg2gNwetTsKX27B+gtwRjph3f2rPiQ9/cSPe8WqQ8udfzQWOqRkY4tLBMSAFVlRaUkRI9Nmn3uC+b07SnAwrFH3BRb8VjxHLSpRwJokwWtzM4tVAXZRtxpjCqGBkC5k69hVa1Zfek3j5EMDDfL3jtW/LETXaEDWggf2CQ8eFVuQfC98YZ7652CYZYA5W0bqqtH+8tJoHfE4+uFPZI+xbvB/nv9x55OglDibnM/sfS+NYbejNqb49DqK+zZqbK8aANIZPlXZstbX6dJ94bgOG5AmepPuMEevBDzfQtIlHg9npIldz0UfHlRbzAbYR9hAVBV5lxBAs/4t89hX7Muip3HLMKxWFaNX8/CwSj80QtNO9uZVwDPSDZbyVW3/TjEa70tY83yhsICYEvpY+kdiTKnHqtemdXb0TOWjzygQQ7KPNXkVaKEdF7IoK4h6HlZRsnVeYWBL7aONauWth8WANybXmhYLF2nlo4yRGNsUGps8ildL/HTv7oQ4kUhe0sW563e2Fs8xrIfQwBgBqpczj8R8G+BzJyPIOhWerc10ZiA6VVB0jOZefnvGCt/fpQyAYCiSwjiXa13+vbFbRlmxMtrOq/lbLgxp3Tw3bSvCUEvZeYWBl9KaIaJflrWMACUWaC8+DoicgEYozUeDhXjZA22GPZGYKUWD5ysyYYaVji/hZNfr2Jkaj/XlnAT6HUh8Jqbul5f6lhT1091ZwlbpgDAPX7w28dnybL8LBGFvMWJI2w5cpgdNfzd/Xe4DJ5wo+LQMCW7yMP38hI4moefcFY6H9UizTgSwJte0Otkk19bctv5dZQLJ7NQv5sGADe26cWfDPK6k58kUJ7ZzrlDSRLgeD6+bpW/JZuALQQnSgaR16f0SBWsw+cGftJtMl5blFeg/apPswM8z8pHBIDuMVa6nN8UwCoCzN/K2DeCqhcCH8le+liAXsu6YzU7uy5oigoALLm9bzyVVHesOV/YpC+DSGUx7HPJEu2GEJWA2OIBPl6Su2qLECKELbfPOe51BqIGgD/HW35XlNHpEV8hAX79xkwBzCTCuN4bldhEJFeBqEoW2LIkbzW/riZOISRgKQC0+uGXQSUk22fKQsy0SYLfZjGTIEYDxLZk5SOAZIJI7vk/AgfT8ftcmoTAaSI0kUCTIP6I0/w3ETXZJOk0yWiShbvpWJp3Y07OGt1wnDgKtCUQcwDEBd+/JRAHQP/WT8y5iwMg5iLu3x3EAdC/9RNz7uIAiLmI+3cHcQD0b/3EnLs4AGIu4v7dQRwA/Vs/MecuDoCYi7h/dxAHQP/WT8y5iwMg5iLu3x3EAdC/9RNz7uIAiLmI+3cHcQD0b/3EnLs4AGIu4v7dQRwA/Vs/Mefu/wE+3t0mb7WhJQAAAABJRU5ErkJggg=="

/***/ }),
/* 72 */
/*!**************************************************************************!*\
  !*** C:/Users/15277/Desktop/order-app/order-wx/static/images/food_7.png ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 73 */
/*!**************************************************************************!*\
  !*** C:/Users/15277/Desktop/order-app/order-wx/static/images/food_8.png ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */
/*!********************************************************************************!*\
  !*** C:/Users/15277/Desktop/order-app/order-wx/static/images/personal_tam.png ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 107 */
/*!*********************************************************************************!*\
  !*** C:/Users/15277/Desktop/order-app/order-wx/static/images/personal_info.png ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */,
/* 158 */,
/* 159 */,
/* 160 */,
/* 161 */,
/* 162 */,
/* 163 */,
/* 164 */,
/* 165 */,
/* 166 */,
/* 167 */,
/* 168 */,
/* 169 */,
/* 170 */,
/* 171 */,
/* 172 */,
/* 173 */,
/* 174 */,
/* 175 */,
/* 176 */,
/* 177 */,
/* 178 */,
/* 179 */,
/* 180 */
/*!********************************************************************************************!*\
  !*** C:/Users/15277/Desktop/order-app/order-wx/node_modules/uview-ui/libs/util/emitter.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 递归使用 call 方式this指向
                                                                                                      * @param componentName // 需要找的组件的名称
                                                                                                      * @param eventName // 事件名称
                                                                                                      * @param params // 需要传递的参数
                                                                                                      */
function _broadcast(componentName, eventName, params) {
  // 循环子节点找到名称一样的子节点 否则 递归 当前子节点
  this.$children.map(function (child) {
    if (componentName === child.$options.name) {
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      _broadcast.apply(child, [componentName, eventName].concat(params));
    }
  });
}var _default =
{
  methods: {
    /**
              * 派发 (向上查找) (一个)
              * @param componentName // 需要找的组件的名称
              * @param eventName // 事件名称
              * @param params // 需要传递的参数
              */
    dispatch: function dispatch(componentName, eventName, params) {
      var parent = this.$parent || this.$root; //$parent 找到最近的父节点 $root 根节点
      var name = parent.$options.name; // 获取当前组件实例的name
      // 如果当前有节点 && 当前没名称 且 当前名称等于需要传进来的名称的时候就去查找当前的节点
      // 循环出当前名称的一样的组件实例
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;
        if (parent) {
          name = parent.$options.name;
        }
      }
      // 有节点表示当前找到了name一样的实例
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },
    /**
        * 广播 (向下查找) (广播多个)
        * @param componentName // 需要找的组件的名称
        * @param eventName // 事件名称
        * @param params // 需要传递的参数
        */
    broadcast: function broadcast(componentName, eventName, params) {
      _broadcast.call(this, componentName, eventName, params);
    } } };exports.default = _default;

/***/ }),
/* 181 */
/*!****************************************************************************************************!*\
  !*** C:/Users/15277/Desktop/order-app/order-wx/node_modules/uview-ui/libs/util/async-validator.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

/* eslint no-console:0 */
var formatRegExp = /%[sdj%]/g;
var warning = function warning() {}; // don't print warning message when in production env or node runtime

if (typeof process !== 'undefined' && Object({"VUE_APP_NAME":"order-wx","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}) && "development" !== 'production' && typeof window !==
'undefined' && typeof document !== 'undefined') {
  warning = function warning(type, errors) {
    if (typeof console !== 'undefined' && console.warn) {
      if (errors.every(function (e) {
        return typeof e === 'string';
      })) {
        console.warn(type, errors);
      }
    }
  };
}

function convertFieldsError(errors) {
  if (!errors || !errors.length) return null;
  var fields = {};
  errors.forEach(function (error) {
    var field = error.field;
    fields[field] = fields[field] || [];
    fields[field].push(error);
  });
  return fields;
}

function format() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var i = 1;
  var f = args[0];
  var len = args.length;

  if (typeof f === 'function') {
    return f.apply(null, args.slice(1));
  }

  if (typeof f === 'string') {
    var str = String(f).replace(formatRegExp, function (x) {
      if (x === '%%') {
        return '%';
      }

      if (i >= len) {
        return x;
      }

      switch (x) {
        case '%s':
          return String(args[i++]);

        case '%d':
          return Number(args[i++]);

        case '%j':
          try {
            return JSON.stringify(args[i++]);
          } catch (_) {
            return '[Circular]';
          }

          break;

        default:
          return x;}

    });

    for (var arg = args[i]; i < len; arg = args[++i]) {
      str += " " + arg;
    }

    return str;
  }

  return f;
}

function isNativeStringType(type) {
  return type === 'string' || type === 'url' || type === 'hex' || type === 'email' || type === 'pattern';
}

function isEmptyValue(value, type) {
  if (value === undefined || value === null) {
    return true;
  }

  if (type === 'array' && Array.isArray(value) && !value.length) {
    return true;
  }

  if (isNativeStringType(type) && typeof value === 'string' && !value) {
    return true;
  }

  return false;
}

function asyncParallelArray(arr, func, callback) {
  var results = [];
  var total = 0;
  var arrLength = arr.length;

  function count(errors) {
    results.push.apply(results, errors);
    total++;

    if (total === arrLength) {
      callback(results);
    }
  }

  arr.forEach(function (a) {
    func(a, count);
  });
}

function asyncSerialArray(arr, func, callback) {
  var index = 0;
  var arrLength = arr.length;

  function next(errors) {
    if (errors && errors.length) {
      callback(errors);
      return;
    }

    var original = index;
    index = index + 1;

    if (original < arrLength) {
      func(arr[original], next);
    } else {
      callback([]);
    }
  }

  next([]);
}

function flattenObjArr(objArr) {
  var ret = [];
  Object.keys(objArr).forEach(function (k) {
    ret.push.apply(ret, objArr[k]);
  });
  return ret;
}

function asyncMap(objArr, option, func, callback) {
  if (option.first) {
    var _pending = new Promise(function (resolve, reject) {
      var next = function next(errors) {
        callback(errors);
        return errors.length ? reject({
          errors: errors,
          fields: convertFieldsError(errors) }) :
        resolve();
      };

      var flattenArr = flattenObjArr(objArr);
      asyncSerialArray(flattenArr, func, next);
    });

    _pending["catch"](function (e) {
      return e;
    });

    return _pending;
  }

  var firstFields = option.firstFields || [];

  if (firstFields === true) {
    firstFields = Object.keys(objArr);
  }

  var objArrKeys = Object.keys(objArr);
  var objArrLength = objArrKeys.length;
  var total = 0;
  var results = [];
  var pending = new Promise(function (resolve, reject) {
    var next = function next(errors) {
      results.push.apply(results, errors);
      total++;

      if (total === objArrLength) {
        callback(results);
        return results.length ? reject({
          errors: results,
          fields: convertFieldsError(results) }) :
        resolve();
      }
    };

    if (!objArrKeys.length) {
      callback(results);
      resolve();
    }

    objArrKeys.forEach(function (key) {
      var arr = objArr[key];

      if (firstFields.indexOf(key) !== -1) {
        asyncSerialArray(arr, func, next);
      } else {
        asyncParallelArray(arr, func, next);
      }
    });
  });
  pending["catch"](function (e) {
    return e;
  });
  return pending;
}

function complementError(rule) {
  return function (oe) {
    if (oe && oe.message) {
      oe.field = oe.field || rule.fullField;
      return oe;
    }

    return {
      message: typeof oe === 'function' ? oe() : oe,
      field: oe.field || rule.fullField };

  };
}

function deepMerge(target, source) {
  if (source) {
    for (var s in source) {
      if (source.hasOwnProperty(s)) {
        var value = source[s];

        if (typeof value === 'object' && typeof target[s] === 'object') {
          target[s] = _extends({}, target[s], {}, value);
        } else {
          target[s] = value;
        }
      }
    }
  }

  return target;
}

/**
   *  Rule for validating required fields.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param source The source object being validated.
   *  @param errors An array of errors that this rule may add
   *  validation errors to.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function required(rule, value, source, errors, options, type) {
  if (rule.required && (!source.hasOwnProperty(rule.field) || isEmptyValue(value, type || rule.type))) {
    errors.push(format(options.messages.required, rule.fullField));
  }
}

/**
   *  Rule for validating whitespace.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param source The source object being validated.
   *  @param errors An array of errors that this rule may add
   *  validation errors to.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function whitespace(rule, value, source, errors, options) {
  if (/^\s+$/.test(value) || value === '') {
    errors.push(format(options.messages.whitespace, rule.fullField));
  }
}

/* eslint max-len:0 */

var pattern = {
  // http://emailregex.com/
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  url: new RegExp(
  "^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$",
  'i'),
  hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i };

var types = {
  integer: function integer(value) {
    return types.number(value) && parseInt(value, 10) === value;
  },
  "float": function _float(value) {
    return types.number(value) && !types.integer(value);
  },
  array: function array(value) {
    return Array.isArray(value);
  },
  regexp: function regexp(value) {
    if (value instanceof RegExp) {
      return true;
    }

    try {
      return !!new RegExp(value);
    } catch (e) {
      return false;
    }
  },
  date: function date(value) {
    return typeof value.getTime === 'function' && typeof value.getMonth === 'function' && typeof value.getYear ===
    'function';
  },
  number: function number(value) {
    if (isNaN(value)) {
      return false;
    }

    // 修改源码，将字符串数值先转为数值
    return typeof +value === 'number';
  },
  object: function object(value) {
    return typeof value === 'object' && !types.array(value);
  },
  method: function method(value) {
    return typeof value === 'function';
  },
  email: function email(value) {
    return typeof value === 'string' && !!value.match(pattern.email) && value.length < 255;
  },
  url: function url(value) {
    return typeof value === 'string' && !!value.match(pattern.url);
  },
  hex: function hex(value) {
    return typeof value === 'string' && !!value.match(pattern.hex);
  } };

/**
        *  Rule for validating the type of a value.
        *
        *  @param rule The validation rule.
        *  @param value The value of the field on the source object.
        *  @param source The source object being validated.
        *  @param errors An array of errors that this rule may add
        *  validation errors to.
        *  @param options The validation options.
        *  @param options.messages The validation messages.
        */

function type(rule, value, source, errors, options) {
  if (rule.required && value === undefined) {
    required(rule, value, source, errors, options);
    return;
  }

  var custom = ['integer', 'float', 'array', 'regexp', 'object', 'method', 'email', 'number', 'date', 'url', 'hex'];
  var ruleType = rule.type;

  if (custom.indexOf(ruleType) > -1) {
    if (!types[ruleType](value)) {
      errors.push(format(options.messages.types[ruleType], rule.fullField, rule.type));
    } // straight typeof check

  } else if (ruleType && typeof value !== rule.type) {
    errors.push(format(options.messages.types[ruleType], rule.fullField, rule.type));
  }
}

/**
   *  Rule for validating minimum and maximum allowed values.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param source The source object being validated.
   *  @param errors An array of errors that this rule may add
   *  validation errors to.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function range(rule, value, source, errors, options) {
  var len = typeof rule.len === 'number';
  var min = typeof rule.min === 'number';
  var max = typeof rule.max === 'number'; // 正则匹配码点范围从U+010000一直到U+10FFFF的文字（补充平面Supplementary Plane）

  var spRegexp = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
  var val = value;
  var key = null;
  var num = typeof value === 'number';
  var str = typeof value === 'string';
  var arr = Array.isArray(value);

  if (num) {
    key = 'number';
  } else if (str) {
    key = 'string';
  } else if (arr) {
    key = 'array';
  } // if the value is not of a supported type for range validation
  // the validation rule rule should use the
  // type property to also test for a particular type


  if (!key) {
    return false;
  }

  if (arr) {
    val = value.length;
  }

  if (str) {
    // 处理码点大于U+010000的文字length属性不准确的bug，如"𠮷𠮷𠮷".lenght !== 3
    val = value.replace(spRegexp, '_').length;
  }

  if (len) {
    if (val !== rule.len) {
      errors.push(format(options.messages[key].len, rule.fullField, rule.len));
    }
  } else if (min && !max && val < rule.min) {
    errors.push(format(options.messages[key].min, rule.fullField, rule.min));
  } else if (max && !min && val > rule.max) {
    errors.push(format(options.messages[key].max, rule.fullField, rule.max));
  } else if (min && max && (val < rule.min || val > rule.max)) {
    errors.push(format(options.messages[key].range, rule.fullField, rule.min, rule.max));
  }
}

var ENUM = 'enum';
/**
                    *  Rule for validating a value exists in an enumerable list.
                    *
                    *  @param rule The validation rule.
                    *  @param value The value of the field on the source object.
                    *  @param source The source object being validated.
                    *  @param errors An array of errors that this rule may add
                    *  validation errors to.
                    *  @param options The validation options.
                    *  @param options.messages The validation messages.
                    */

function enumerable(rule, value, source, errors, options) {
  rule[ENUM] = Array.isArray(rule[ENUM]) ? rule[ENUM] : [];

  if (rule[ENUM].indexOf(value) === -1) {
    errors.push(format(options.messages[ENUM], rule.fullField, rule[ENUM].join(', ')));
  }
}

/**
   *  Rule for validating a regular expression pattern.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param source The source object being validated.
   *  @param errors An array of errors that this rule may add
   *  validation errors to.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function pattern$1(rule, value, source, errors, options) {
  if (rule.pattern) {
    if (rule.pattern instanceof RegExp) {
      // if a RegExp instance is passed, reset `lastIndex` in case its `global`
      // flag is accidentally set to `true`, which in a validation scenario
      // is not necessary and the result might be misleading
      rule.pattern.lastIndex = 0;

      if (!rule.pattern.test(value)) {
        errors.push(format(options.messages.pattern.mismatch, rule.fullField, value, rule.pattern));
      }
    } else if (typeof rule.pattern === 'string') {
      var _pattern = new RegExp(rule.pattern);

      if (!_pattern.test(value)) {
        errors.push(format(options.messages.pattern.mismatch, rule.fullField, value, rule.pattern));
      }
    }
  }
}

var rules = {
  required: required,
  whitespace: whitespace,
  type: type,
  range: range,
  "enum": enumerable,
  pattern: pattern$1 };


/**
                         *  Performs validation for string types.
                         *
                         *  @param rule The validation rule.
                         *  @param value The value of the field on the source object.
                         *  @param callback The callback function.
                         *  @param source The source object being validated.
                         *  @param options The validation options.
                         *  @param options.messages The validation messages.
                         */

function string(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value, 'string') && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options, 'string');

    if (!isEmptyValue(value, 'string')) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
      rules.pattern(rule, value, source, errors, options);

      if (rule.whitespace === true) {
        rules.whitespace(rule, value, source, errors, options);
      }
    }
  }

  callback(errors);
}

/**
   *  Validates a function.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function method(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates a number.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function number(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (value === '') {
      value = undefined;
    }

    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates a boolean.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function _boolean(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates the regular expression type.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function regexp(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (!isEmptyValue(value)) {
      rules.type(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates a number is an integer.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function integer(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates a number is a floating point number.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function floatFn(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates an array.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function array(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value, 'array') && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options, 'array');

    if (!isEmptyValue(value, 'array')) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates an object.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function object(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

var ENUM$1 = 'enum';
/**
                      *  Validates an enumerable list.
                      *
                      *  @param rule The validation rule.
                      *  @param value The value of the field on the source object.
                      *  @param callback The callback function.
                      *  @param source The source object being validated.
                      *  @param options The validation options.
                      *  @param options.messages The validation messages.
                      */

function enumerable$1(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules[ENUM$1](rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates a regular expression pattern.
   *
   *  Performs validation when a rule only contains
   *  a pattern property but is not declared as a string type.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function pattern$2(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value, 'string') && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (!isEmptyValue(value, 'string')) {
      rules.pattern(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

function date(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (!isEmptyValue(value)) {
      var dateObject;

      if (typeof value === 'number') {
        dateObject = new Date(value);
      } else {
        dateObject = value;
      }

      rules.type(rule, dateObject, source, errors, options);

      if (dateObject) {
        rules.range(rule, dateObject.getTime(), source, errors, options);
      }
    }
  }

  callback(errors);
}

function required$1(rule, value, callback, source, options) {
  var errors = [];
  var type = Array.isArray(value) ? 'array' : typeof value;
  rules.required(rule, value, source, errors, options, type);
  callback(errors);
}

function type$1(rule, value, callback, source, options) {
  var ruleType = rule.type;
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value, ruleType) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options, ruleType);

    if (!isEmptyValue(value, ruleType)) {
      rules.type(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Performs validation for any type.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function any(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);
  }

  callback(errors);
}

var validators = {
  string: string,
  method: method,
  number: number,
  "boolean": _boolean,
  regexp: regexp,
  integer: integer,
  "float": floatFn,
  array: array,
  object: object,
  "enum": enumerable$1,
  pattern: pattern$2,
  date: date,
  url: type$1,
  hex: type$1,
  email: type$1,
  required: required$1,
  any: any };


function newMessages() {
  return {
    "default": 'Validation error on field %s',
    required: '%s is required',
    "enum": '%s must be one of %s',
    whitespace: '%s cannot be empty',
    date: {
      format: '%s date %s is invalid for format %s',
      parse: '%s date could not be parsed, %s is invalid ',
      invalid: '%s date %s is invalid' },

    types: {
      string: '%s is not a %s',
      method: '%s is not a %s (function)',
      array: '%s is not an %s',
      object: '%s is not an %s',
      number: '%s is not a %s',
      date: '%s is not a %s',
      "boolean": '%s is not a %s',
      integer: '%s is not an %s',
      "float": '%s is not a %s',
      regexp: '%s is not a valid %s',
      email: '%s is not a valid %s',
      url: '%s is not a valid %s',
      hex: '%s is not a valid %s' },

    string: {
      len: '%s must be exactly %s characters',
      min: '%s must be at least %s characters',
      max: '%s cannot be longer than %s characters',
      range: '%s must be between %s and %s characters' },

    number: {
      len: '%s must equal %s',
      min: '%s cannot be less than %s',
      max: '%s cannot be greater than %s',
      range: '%s must be between %s and %s' },

    array: {
      len: '%s must be exactly %s in length',
      min: '%s cannot be less than %s in length',
      max: '%s cannot be greater than %s in length',
      range: '%s must be between %s and %s in length' },

    pattern: {
      mismatch: '%s value %s does not match pattern %s' },

    clone: function clone() {
      var cloned = JSON.parse(JSON.stringify(this));
      cloned.clone = this.clone;
      return cloned;
    } };

}
var messages = newMessages();

/**
                               *  Encapsulates a validation schema.
                               *
                               *  @param descriptor An object declaring validation rules
                               *  for this schema.
                               */

function Schema(descriptor) {
  this.rules = null;
  this._messages = messages;
  this.define(descriptor);
}

Schema.prototype = {
  messages: function messages(_messages) {
    if (_messages) {
      this._messages = deepMerge(newMessages(), _messages);
    }

    return this._messages;
  },
  define: function define(rules) {
    if (!rules) {
      throw new Error('Cannot configure a schema with no rules');
    }

    if (typeof rules !== 'object' || Array.isArray(rules)) {
      throw new Error('Rules must be an object');
    }

    this.rules = {};
    var z;
    var item;

    for (z in rules) {
      if (rules.hasOwnProperty(z)) {
        item = rules[z];
        this.rules[z] = Array.isArray(item) ? item : [item];
      }
    }
  },
  validate: function validate(source_, o, oc) {
    var _this = this;

    if (o === void 0) {
      o = {};
    }

    if (oc === void 0) {
      oc = function oc() {};
    }

    var source = source_;
    var options = o;
    var callback = oc;

    if (typeof options === 'function') {
      callback = options;
      options = {};
    }

    if (!this.rules || Object.keys(this.rules).length === 0) {
      if (callback) {
        callback();
      }

      return Promise.resolve();
    }

    function complete(results) {
      var i;
      var errors = [];
      var fields = {};

      function add(e) {
        if (Array.isArray(e)) {
          var _errors;

          errors = (_errors = errors).concat.apply(_errors, e);
        } else {
          errors.push(e);
        }
      }

      for (i = 0; i < results.length; i++) {
        add(results[i]);
      }

      if (!errors.length) {
        errors = null;
        fields = null;
      } else {
        fields = convertFieldsError(errors);
      }

      callback(errors, fields);
    }

    if (options.messages) {
      var messages$1 = this.messages();

      if (messages$1 === messages) {
        messages$1 = newMessages();
      }

      deepMerge(messages$1, options.messages);
      options.messages = messages$1;
    } else {
      options.messages = this.messages();
    }

    var arr;
    var value;
    var series = {};
    var keys = options.keys || Object.keys(this.rules);
    keys.forEach(function (z) {
      arr = _this.rules[z];
      value = source[z];
      arr.forEach(function (r) {
        var rule = r;

        if (typeof rule.transform === 'function') {
          if (source === source_) {
            source = _extends({}, source);
          }

          value = source[z] = rule.transform(value);
        }

        if (typeof rule === 'function') {
          rule = {
            validator: rule };

        } else {
          rule = _extends({}, rule);
        }

        rule.validator = _this.getValidationMethod(rule);
        rule.field = z;
        rule.fullField = rule.fullField || z;
        rule.type = _this.getType(rule);

        if (!rule.validator) {
          return;
        }

        series[z] = series[z] || [];
        series[z].push({
          rule: rule,
          value: value,
          source: source,
          field: z });

      });
    });
    var errorFields = {};
    return asyncMap(series, options, function (data, doIt) {
      var rule = data.rule;
      var deep = (rule.type === 'object' || rule.type === 'array') && (typeof rule.fields === 'object' || typeof rule.defaultField ===
      'object');
      deep = deep && (rule.required || !rule.required && data.value);
      rule.field = data.field;

      function addFullfield(key, schema) {
        return _extends({}, schema, {
          fullField: rule.fullField + "." + key });

      }

      function cb(e) {
        if (e === void 0) {
          e = [];
        }

        var errors = e;

        if (!Array.isArray(errors)) {
          errors = [errors];
        }

        if (!options.suppressWarning && errors.length) {
          Schema.warning('async-validator:', errors);
        }

        if (errors.length && rule.message) {
          errors = [].concat(rule.message);
        }

        errors = errors.map(complementError(rule));

        if (options.first && errors.length) {
          errorFields[rule.field] = 1;
          return doIt(errors);
        }

        if (!deep) {
          doIt(errors);
        } else {
          // if rule is required but the target object
          // does not exist fail at the rule level and don't
          // go deeper
          if (rule.required && !data.value) {
            if (rule.message) {
              errors = [].concat(rule.message).map(complementError(rule));
            } else if (options.error) {
              errors = [options.error(rule, format(options.messages.required, rule.field))];
            } else {
              errors = [];
            }

            return doIt(errors);
          }

          var fieldsSchema = {};

          if (rule.defaultField) {
            for (var k in data.value) {
              if (data.value.hasOwnProperty(k)) {
                fieldsSchema[k] = rule.defaultField;
              }
            }
          }

          fieldsSchema = _extends({}, fieldsSchema, {}, data.rule.fields);

          for (var f in fieldsSchema) {
            if (fieldsSchema.hasOwnProperty(f)) {
              var fieldSchema = Array.isArray(fieldsSchema[f]) ? fieldsSchema[f] : [fieldsSchema[f]];
              fieldsSchema[f] = fieldSchema.map(addFullfield.bind(null, f));
            }
          }

          var schema = new Schema(fieldsSchema);
          schema.messages(options.messages);

          if (data.rule.options) {
            data.rule.options.messages = options.messages;
            data.rule.options.error = options.error;
          }

          schema.validate(data.value, data.rule.options || options, function (errs) {
            var finalErrors = [];

            if (errors && errors.length) {
              finalErrors.push.apply(finalErrors, errors);
            }

            if (errs && errs.length) {
              finalErrors.push.apply(finalErrors, errs);
            }

            doIt(finalErrors.length ? finalErrors : null);
          });
        }
      }

      var res;

      if (rule.asyncValidator) {
        res = rule.asyncValidator(rule, data.value, cb, data.source, options);
      } else if (rule.validator) {
        res = rule.validator(rule, data.value, cb, data.source, options);

        if (res === true) {
          cb();
        } else if (res === false) {
          cb(rule.message || rule.field + " fails");
        } else if (res instanceof Array) {
          cb(res);
        } else if (res instanceof Error) {
          cb(res.message);
        }
      }

      if (res && res.then) {
        res.then(function () {
          return cb();
        }, function (e) {
          return cb(e);
        });
      }
    }, function (results) {
      complete(results);
    });
  },
  getType: function getType(rule) {
    if (rule.type === undefined && rule.pattern instanceof RegExp) {
      rule.type = 'pattern';
    }

    if (typeof rule.validator !== 'function' && rule.type && !validators.hasOwnProperty(rule.type)) {
      throw new Error(format('Unknown rule type %s', rule.type));
    }

    return rule.type || 'string';
  },
  getValidationMethod: function getValidationMethod(rule) {
    if (typeof rule.validator === 'function') {
      return rule.validator;
    }

    var keys = Object.keys(rule);
    var messageIndex = keys.indexOf('message');

    if (messageIndex !== -1) {
      keys.splice(messageIndex, 1);
    }

    if (keys.length === 1 && keys[0] === 'required') {
      return validators.required;
    }

    return validators[this.getType(rule)] || false;
  } };


Schema.register = function register(type, validator) {
  if (typeof validator !== 'function') {
    throw new Error('Cannot register a validator by type, validator is not a function');
  }

  validators[type] = validator;
};

Schema.warning = warning;
Schema.messages = messages;var _default =

Schema;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/node-libs-browser/mock/process.js */ 182)))

/***/ }),
/* 182 */
/*!********************************************************!*\
  !*** ./node_modules/node-libs-browser/mock/process.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports.nextTick = function nextTick(fn) {
    var args = Array.prototype.slice.call(arguments);
    args.shift();
    setTimeout(function () {
        fn.apply(null, args);
    }, 0);
};

exports.platform = exports.arch = 
exports.execPath = exports.title = 'browser';
exports.pid = 1;
exports.browser = true;
exports.env = {};
exports.argv = [];

exports.binding = function (name) {
	throw new Error('No such module. (Possibly not yet loaded)')
};

(function () {
    var cwd = '/';
    var path;
    exports.cwd = function () { return cwd };
    exports.chdir = function (dir) {
        if (!path) path = __webpack_require__(/*! path */ 183);
        cwd = path.resolve(dir, cwd);
    };
})();

exports.exit = exports.kill = 
exports.umask = exports.dlopen = 
exports.uptime = exports.memoryUsage = 
exports.uvCounters = function() {};
exports.features = {};


/***/ }),
/* 183 */
/*!***********************************************!*\
  !*** ./node_modules/path-browserify/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// .dirname, .basename, and .extname methods are extracted from Node.js v8.11.1,
// backported and transplited with Babel, with backwards-compat fixes

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function (path) {
  if (typeof path !== 'string') path = path + '';
  if (path.length === 0) return '.';
  var code = path.charCodeAt(0);
  var hasRoot = code === 47 /*/*/;
  var end = -1;
  var matchedSlash = true;
  for (var i = path.length - 1; i >= 1; --i) {
    code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        if (!matchedSlash) {
          end = i;
          break;
        }
      } else {
      // We saw the first non-path separator
      matchedSlash = false;
    }
  }

  if (end === -1) return hasRoot ? '/' : '.';
  if (hasRoot && end === 1) {
    // return '//';
    // Backwards-compat fix:
    return '/';
  }
  return path.slice(0, end);
};

function basename(path) {
  if (typeof path !== 'string') path = path + '';

  var start = 0;
  var end = -1;
  var matchedSlash = true;
  var i;

  for (i = path.length - 1; i >= 0; --i) {
    if (path.charCodeAt(i) === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          start = i + 1;
          break;
        }
      } else if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // path component
      matchedSlash = false;
      end = i + 1;
    }
  }

  if (end === -1) return '';
  return path.slice(start, end);
}

// Uses a mixed approach for backwards-compatibility, as ext behavior changed
// in new Node.js versions, so only basename() above is backported here
exports.basename = function (path, ext) {
  var f = basename(path);
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};

exports.extname = function (path) {
  if (typeof path !== 'string') path = path + '';
  var startDot = -1;
  var startPart = 0;
  var end = -1;
  var matchedSlash = true;
  // Track the state of characters (if any) we see before our first dot and
  // after any path separator we find
  var preDotState = 0;
  for (var i = path.length - 1; i >= 0; --i) {
    var code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }
        continue;
      }
    if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // extension
      matchedSlash = false;
      end = i + 1;
    }
    if (code === 46 /*.*/) {
        // If this is our first dot, mark it as the start of our extension
        if (startDot === -1)
          startDot = i;
        else if (preDotState !== 1)
          preDotState = 1;
    } else if (startDot !== -1) {
      // We saw a non-dot and non-path separator before our dot, so we should
      // have a good chance at having a non-empty extension
      preDotState = -1;
    }
  }

  if (startDot === -1 || end === -1 ||
      // We saw a non-dot character immediately before the dot
      preDotState === 0 ||
      // The (right-most) trimmed path component is exactly '..'
      preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    return '';
  }
  return path.slice(startDot, end);
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node-libs-browser/mock/process.js */ 182)))

/***/ })
]]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map