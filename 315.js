(self["webpackChunk_lenna_project_mobilenet"] = self["webpackChunk_lenna_project_mobilenet"] || []).push([[315],{

/***/ 509:
/***/ ((module, exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(645);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, "\n.plugin-config[data-v-2cf59766] {\n  margin: 5px;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 645:
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),

/***/ 744:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
// runtime helper for setting properties on components
// in a tree-shakable way
exports.Z = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
        target[key] = val;
    }
    return target;
};


/***/ }),

/***/ 315:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ Widget)
});

// EXTERNAL MODULE: consume shared module (default) vue@^3.2 (strict) (fallback: ./node_modules/@vue/runtime-dom/dist/runtime-dom.esm-bundler.js)
var runtime_dom_esm_bundler_js_ = __webpack_require__(617);
;// CONCATENATED MODULE: ./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[1]!./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[4].use[0]!./src/Widget.vue?vue&type=template&id=2cf59766&scoped=true


const _withScopeId = n => ((0,runtime_dom_esm_bundler_js_.pushScopeId)("data-v-2cf59766"),n=n(),(0,runtime_dom_esm_bundler_js_.popScopeId)(),n)
const _hoisted_1 = { class: "plugin-config" }
const _hoisted_2 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/(0,runtime_dom_esm_bundler_js_.createElementVNode)("label", null, "x: ", -1))
const _hoisted_3 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/(0,runtime_dom_esm_bundler_js_.createElementVNode)("label", null, "y: ", -1))
const _hoisted_4 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/(0,runtime_dom_esm_bundler_js_.createElementVNode)("label", null, "size: ", -1))

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return ((0,runtime_dom_esm_bundler_js_.openBlock)(), (0,runtime_dom_esm_bundler_js_.createElementBlock)("div", _hoisted_1, [
    (0,runtime_dom_esm_bundler_js_.createElementVNode)("div", null, [
      _hoisted_2,
      (0,runtime_dom_esm_bundler_js_.withDirectives)((0,runtime_dom_esm_bundler_js_.createElementVNode)("input", {
        type: "number",
        width: "5ch",
        "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((_ctx.x) = $event)),
        onChange: _cache[1] || (_cache[1] = $event => (_ctx.updateConfig()))
      }, null, 544), [
        [
          runtime_dom_esm_bundler_js_.vModelText,
          _ctx.x,
          void 0,
          { number: true }
        ]
      ]),
      _hoisted_3,
      (0,runtime_dom_esm_bundler_js_.withDirectives)((0,runtime_dom_esm_bundler_js_.createElementVNode)("input", {
        type: "number",
        width: "5ch",
        "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => ((_ctx.y) = $event)),
        onChange: _cache[3] || (_cache[3] = $event => (_ctx.updateConfig()))
      }, null, 544), [
        [
          runtime_dom_esm_bundler_js_.vModelText,
          _ctx.y,
          void 0,
          { number: true }
        ]
      ]),
      _hoisted_4,
      (0,runtime_dom_esm_bundler_js_.withDirectives)((0,runtime_dom_esm_bundler_js_.createElementVNode)("input", {
        type: "number",
        width: "10ch",
        "onUpdate:modelValue": _cache[4] || (_cache[4] = $event => ((_ctx.size) = $event)),
        onChange: _cache[5] || (_cache[5] = $event => (_ctx.updateConfig()))
      }, null, 544), [
        [
          runtime_dom_esm_bundler_js_.vModelText,
          _ctx.size,
          void 0,
          { number: true }
        ]
      ])
    ])
  ]))
}
;// CONCATENATED MODULE: ./src/Widget.vue?vue&type=template&id=2cf59766&scoped=true

;// CONCATENATED MODULE: ./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[4].use[0]!./src/Widget.vue?vue&type=script&lang=js


/* harmony default export */ const Widgetvue_type_script_lang_js = ((0,runtime_dom_esm_bundler_js_.defineComponent)({
  name: "MobileNetWidget",
  props: {
    defaultConfig: Object,
  },
  data() {
    return {
      x: 0,
      y: 0,
      size: 12.5
    };
  },
  methods: {
    async updateConfig() {
      let config = {
        x: this.x,
        y: this.y,
        size: this.size
      };
      this.$emit("changeConfig", config);
    },
  },
  created() {
    this.x = this.defaultConfig.x;
    this.y = this.defaultConfig.y;
    this.size = this.defaultConfig.size;
    this.updateConfig();
  },
}));

;// CONCATENATED MODULE: ./src/Widget.vue?vue&type=script&lang=js
 
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[4].use[0]!./src/Widget.vue?vue&type=style&index=0&id=2cf59766&scoped=true&lang=css
var Widgetvue_type_style_index_0_id_2cf59766_scoped_true_lang_css = __webpack_require__(509);
;// CONCATENATED MODULE: ./src/Widget.vue?vue&type=style&index=0&id=2cf59766&scoped=true&lang=css

// EXTERNAL MODULE: ./node_modules/vue-loader/dist/exportHelper.js
var exportHelper = __webpack_require__(744);
;// CONCATENATED MODULE: ./src/Widget.vue




;


const __exports__ = /*#__PURE__*/(0,exportHelper/* default */.Z)(Widgetvue_type_script_lang_js, [['render',render],['__scopeId',"data-v-2cf59766"]])

/* harmony default export */ const Widget = (__exports__);

/***/ })

}]);
//# sourceMappingURL=315.js.map