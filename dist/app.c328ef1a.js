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
})({"chat.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Chat = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Chat = /*#__PURE__*/function () {
  function Chat() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$position = _ref.position,
        position = _ref$position === void 0 ? 'bottom-right' : _ref$position;

    _classCallCheck(this, Chat);

    this.position = this.getPosition(position);
    this.open = false;
    this.initialize();
    this.createStyles(position);
  }

  _createClass(Chat, [{
    key: "getPosition",
    value: function getPosition(position) {
      var _ref2;

      var _position$split = position.split('-'),
          _position$split2 = _slicedToArray(_position$split, 2),
          vertical = _position$split2[0],
          horizontal = _position$split2[1];

      this.vertical = [vertical];
      this.horizontal = [horizontal];
      return _ref2 = {}, _defineProperty(_ref2, vertical, '30px'), _defineProperty(_ref2, horizontal, '30px'), _ref2;
    }
  }, {
    key: "initialize",
    value: function initialize() {
      var _this = this;

      var widgetContainer = document.createElement('div');
      widgetContainer.style.position = 'fixed';
      Object.keys(this.position).forEach(function (key) {
        widgetContainer.style[key] = _this.position[key];
      });
      document.body.appendChild(widgetContainer);
      var buttonContainer = document.createElement('div');
      buttonContainer.classList.add('button-container');
      var chatIcon = document.createElement('img');
      chatIcon.src = 'assets/chat.svg';
      chatIcon.classList.add('icon');
      this.chatIcon = chatIcon;
      var closeIcon = document.createElement('img');
      closeIcon.src = 'assets/cross.svg';
      closeIcon.classList.add('icon', 'hidden');
      this.closeIcon = closeIcon;
      this.messageContainer = document.createElement('div');
      this.messageContainer.classList.add('hidden', 'message-container');
      this.createMessageContainerContent();
      buttonContainer.appendChild(chatIcon);
      buttonContainer.appendChild(closeIcon);
      buttonContainer.addEventListener('click', this.toggleOpen.bind(this));
      widgetContainer.appendChild(buttonContainer);
      widgetContainer.appendChild(this.messageContainer);
    }
  }, {
    key: "createStyles",
    value: function createStyles(position) {
      var styleTag = document.createElement('style');
      document.head.appendChild(styleTag);
      styleTag.innerHTML = ".message-container {\n            width: 400px;\n            max-height: 400px;\n            box-shadow: 0 0 18px 8px rgba(0, 0, 0, 0.1);\n            transition: max-height 0.2 ease;\n            font-family: Helvetica, Arial, sans-serif;\n            ".concat(this.horizontal, ": -25px;\n            ").concat(this.vertical, ": 75px;\n            position: absolute;\n        }\n        .message-container.hidden {\n            max-height: 0px;\n        }\n        .button-container {\n            width: 70px;\n            height: 70px;\n            background-color: #04b73f;\n            border-radius: 50%;            \n        }\n        .hidden {\n            transform: scale(0);\n        }\n         .icon {\n            cursor: pointer;\n            width: 70%;\n            position: absolute;\n            top: 9px;\n            left: 9px;\n            transition: transform .3s ease;\n        }\n         .message-container h2 {\n           margin: 0;\n           padding: 20px;\n           color: #fff;\n           background-color: #04b73f;\n        }\n         .message-container .content {\n           margin: 20px 10px;\n           border: 1px solid #dbdbdb;\n           padding: 10px;\n           display: flex;\n           background-color: white;\n           flex-direction: column;\n        }   \n          .message-container form * {\n               margin: 5px 0;\n            }\n            \n            .message-container form input {\n               padding: 10px;\n            }\n            \n            .message-container form textarea {\n               height: 100px;\n               padding: 10px;\n            }\n            \n            .message-container form textarea::placeholder {\n               font-family: Helvetica, Arial, sans-serif;\n            }\n            \n            .message-container form button {\n               cursor: pointer;\n               background-color: #04b73f;\n               color: white;\n               border: 0;\n               border-radius: 4px;\n               padding: 10px;\n            }\n            .message-container form button:hover {\n               background-color: #16632f;\n            }\n        ");
    }
  }, {
    key: "createMessageContainerContent",
    value: function createMessageContainerContent() {
      this.messageContainer.innerHTML = '';
      var title = document.createElement('h2');
      title.textContent = 'Send us your feedback';
      var form = document.createElement('form');
      form.classList.add('content');
      var email = document.createElement('input');
      email.required = 'true';
      email.id = 'email';
      email.type = 'email';
      email.placeholder = 'Enter your email address';
      var message = document.createElement('textarea');
      message.required = 'true';
      message.id = 'message';
      message.placeholder = 'Your message';
      var btn = document.createElement('button');
      btn.textContent = 'Submit';
      form.appendChild(email);
      form.appendChild(message);
      form.appendChild(btn);
      form.addEventListener('submit', this.submit.bind(this));
      this.messageContainer.appendChild(title);
      this.messageContainer.appendChild(form);
    }
  }, {
    key: "submit",
    value: function submit(e) {
      e.preventDefault();
      var formSubmission = {
        email: e.srcElement.querySelector('#email').value,
        message: e.srcElement.querySelector('#message').value
      };
      this.messageContainer.innerHTML = '<h2> Thanks for your submission! </h2>';
      console.log(formSubmission);
    }
  }, {
    key: "toggleOpen",
    value: function toggleOpen() {
      this.open = !this.open;

      if (this.open) {
        this.chatIcon.classList.add('hidden');
        this.closeIcon.classList.remove('hidden');
        this.messageContainer.classList.remove('hidden');
      } else {
        this.createMessageContainerContent();
        this.chatIcon.classList.remove('hidden');
        this.closeIcon.classList.add('hidden');
        this.messageContainer.classList.add('hidden');
      }
    }
  }]);

  return Chat;
}();

exports.Chat = Chat;
},{}],"app.js":[function(require,module,exports) {
"use strict";

var _chat = require("./chat.js");

var chat = new _chat.Chat({
  position: 'bottom-right'
});
},{"./chat.js":"chat.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49912" + '/');

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
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","app.js"], null)
//# sourceMappingURL=/app.c328ef1a.js.map