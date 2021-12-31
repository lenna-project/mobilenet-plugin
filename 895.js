(self["webpackChunk_lenna_project_mobilenet"] = self["webpackChunk_lenna_project_mobilenet"] || []).push([[895],{

/***/ 530:
/***/ (() => {

// extracted by mini-css-extract-plugin

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

/***/ 895:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ Widget)
});

// EXTERNAL MODULE: consume shared module (default) vue@^3.0.11 (strict) (fallback: ./node_modules/@vue/runtime-dom/dist/runtime-dom.esm-bundler.js)
var runtime_dom_esm_bundler_js_ = __webpack_require__(748);
;// CONCATENATED MODULE: ./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[1]!./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[4].use[0]!./src/Widget.vue?vue&type=template&id=a77c06c8&scoped=true


const _withScopeId = n => ((0,runtime_dom_esm_bundler_js_.pushScopeId)("data-v-a77c06c8"),n=n(),(0,runtime_dom_esm_bundler_js_.popScopeId)(),n)
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
;// CONCATENATED MODULE: ./src/Widget.vue?vue&type=template&id=a77c06c8&scoped=true

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
 
// EXTERNAL MODULE: ./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[4].use[0]!./src/Widget.vue?vue&type=style&index=0&id=a77c06c8&scoped=true&lang=css
var Widgetvue_type_style_index_0_id_a77c06c8_scoped_true_lang_css = __webpack_require__(530);
;// CONCATENATED MODULE: ./src/Widget.vue?vue&type=style&index=0&id=a77c06c8&scoped=true&lang=css

// EXTERNAL MODULE: ./node_modules/vue-loader/dist/exportHelper.js
var exportHelper = __webpack_require__(744);
;// CONCATENATED MODULE: ./src/Widget.vue




;


const __exports__ = /*#__PURE__*/(0,exportHelper/* default */.Z)(Widgetvue_type_script_lang_js, [['render',render],['__scopeId',"data-v-a77c06c8"]])

/* harmony default export */ const Widget = (__exports__);

/***/ })

}]);
//# sourceMappingURL=895.js.map