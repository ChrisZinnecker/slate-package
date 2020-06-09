(window.webpackJsonp=window.webpackJsonp||[]).push([[3,7],{1121:function(t,e,n){"use strict";n.r(e);var r=n(11),a={name:"editableVoidElement",components:{RichText:n(53).default},data:function(){return{inputValue:""}}},o=(n(56),n(5)),i=Object(o.a)(a,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{contenteditable:"false"}},[n("div",{staticClass:"editableVoidElement"},[n("h4",[t._v("Name:")]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.inputValue,expression:"inputValue"}],staticClass:"editableVoidElement__input",attrs:{type:"text"},domProps:{value:t.inputValue},on:{input:function(e){e.target.composing||(t.inputValue=e.target.value)}}}),t._v(" "),n("h4",[t._v("Left or right handed:")]),t._v(" "),n("input",{staticClass:"unset",attrs:{type:"radio",name:"handedness",value:"left"}}),t._v("Left"),n("br"),t._v(" "),n("input",{staticClass:"unset",attrs:{type:"radio",name:"handedness",value:"right"}}),t._v("Right\n    "),n("h4",[t._v("Tell us about yourself:")]),t._v(" "),n("div",{staticClass:"editableVoidElement__richtext"},[n("RichText")],1)]),t._v(" "),t._t("default")],2)}),[],!1,null,"1b970042",null).exports;function l(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function s(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?l(Object(n),!0).forEach((function(e){u(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function u(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var c=function(t){var e=t.attributes,n=t.children,r=t.element;return{components:{EditableVoidElement:i},render:function(){var t=arguments[0];switch(r.type){case"editable-void":return t(i,{attrs:s({},e,{element:r})},[n]);default:return t("p",{attrs:s({},e)},[n])}}}},d=n(34),f=n(33),p=n(12),b={name:"insertEditableVoidButton",components:{Button:f.a,Icon:p.a},methods:{onMouseDown:function(t){var e,n;t.preventDefault(),e=this.$editor,n={type:"editable-void",children:[{text:""}]},r.h.insertNodes(e,n)}}},m=Object(o.a)(b,(function(){var t=this.$createElement,e=this._self._c||t;return e("Button",{on:{mouseDown:this.onMouseDown}},[e("Icon",{attrs:{icon:"add"}})],1)}),[],!1,null,"507c1db0",null).exports,v=[{type:"paragraph",children:[{text:"In addition to nodes that contain editable text, you can insert void nodes, which can also contain editable elements, inputs, or an entire other Slate editor."}]},{type:"editable-void",children:[{text:""}]},{type:"paragraph",children:[{text:""}]}],h={name:"editable-voids",components:{Slate:r.e,Editable:r.a,Toolbar:d.a,InsertEditableVoidButton:m},data:function(){return{initialValue:v,renderElement:c}},created:function(){var t,e;t=this.$editor,e=t.isVoid,t.isVoid=function(t){return"editable-void"===t.type||e(t)}}},y=Object(o.a)(h,(function(){var t=this.$createElement,e=this._self._c||t;return e("Slate",{attrs:{value:JSON.stringify(this.initialValue)}},[e("Toolbar",[e("InsertEditableVoidButton")],1),this._v(" "),e("Editable",{attrs:{placeholder:"Enter some plain text...",renderElement:this.renderElement}})],1)}),[],!1,null,"22ae1808",null);e.default=y.exports},30:function(t,e,n){var r=n(9),a=n(36);"string"==typeof(a=a.__esModule?a.default:a)&&(a=[[t.i,a,""]]);var o={insert:"head",singleton:!1},i=(r(a,o),a.locals?a.locals:{});t.exports=i},31:function(t,e,n){var r=n(9),a=n(38);"string"==typeof(a=a.__esModule?a.default:a)&&(a=[[t.i,a,""]]);var o={insert:"head",singleton:!1},i=(r(a,o),a.locals?a.locals:{});t.exports=i},33:function(t,e,n){"use strict";var r={name:"s-button",props:{active:Boolean,reversed:Boolean},computed:{color:function(){return this.reversed?this.active?"white":"#aaa":this.active?"black":"#ccc"}}},a=(n(35),n(5)),o=Object(a.a)(r,(function(){var t=this,e=t.$createElement;return(t._self._c||e)("span",{staticClass:"button",style:{color:t.color},on:{mousedown:function(e){return t.$emit("mouseDown",e)}}},[t._t("default")],2)}),[],!1,null,"152f4f5a",null);e.a=o.exports},34:function(t,e,n){"use strict";var r={name:"toolbar"},a=(n(37),n(5)),o=Object(a.a)(r,(function(){var t=this.$createElement;return(this._self._c||t)("div",{staticClass:"toolbar"},[this._t("default")],2)}),[],!1,null,"f9a1b270",null);e.a=o.exports},35:function(t,e,n){"use strict";var r=n(30);n.n(r).a},36:function(t,e,n){(e=n(10)(!1)).push([t.i,".button[data-v-152f4f5a] {\n  cursor: pointer;\n}\n",""]),t.exports=e},37:function(t,e,n){"use strict";var r=n(31);n.n(r).a},38:function(t,e,n){(e=n(10)(!1)).push([t.i,".toolbar[data-v-f9a1b270] {\n  position: relative;\n  padding: 1px 18px 17px;\n  margin: 0 -20px;\n  border-bottom: 2px solid #eee;\n  margin-bottom: 20px;\n}\n",""]),t.exports=e},41:function(t,e,n){var r=n(9),a=n(57);"string"==typeof(a=a.__esModule?a.default:a)&&(a=[[t.i,a,""]]);var o={insert:"head",singleton:!1},i=(r(a,o),a.locals?a.locals:{});t.exports=i},53:function(t,e,n){"use strict";n.r(e);var r=n(11);function a(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function o(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?a(Object(n),!0).forEach((function(e){i(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function i(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var l=function(t){var e=t.attributes,n=t.children,r=t.leaf;return{render:function(){var t=arguments[0];return r.bold&&(n=t("strong",[n])),r.code&&(n=t("code",[n])),r.italic&&(n=t("em",[n])),r.underline&&(n=t("u",[n])),t("span",{attrs:o({},e)},[n])}}},s=function(t){var e=t.attributes,n=t.children,r=t.element;return{render:function(){var t=arguments[0];switch(r.type){case"block-quote":return t("blockquote",{attrs:o({},e)},[n]);case"bulleted-list":return t("ul",{attrs:o({},e)},[n]);case"heading-one":return t("h1",{attrs:o({},e)},[n]);case"heading-two":return t("h2",{attrs:o({},e)},[n]);case"list-item":return t("li",{attrs:o({},e)},[n]);case"numbered-list":return t("ol",{attrs:o({},e)},[n]);default:return t("p",{attrs:o({},e)},[n])}}}},u=n(33),c=n(12),d=n(0),f=function(t,e){var n=d.a.marks(t);return!!n&&!0===n[e]},p=function(t,e){f(t,e)?d.a.removeMark(t,e):d.a.addMark(t,e,!0)},b={name:"markButton",mixins:[r.f],components:{Button:u.a,Icon:c.a},props:{format:String,icon:String},render:function(){var t=this,e=arguments[0],n=this.$editor;return e(u.a,{attrs:{active:f(n,this.format)},on:{mouseDown:function(e){e.preventDefault(),p(n,t.format)}}},[e(c.a,{attrs:{icon:this.icon}})])}},m=n(5),v=Object(m.a)(b,void 0,void 0,!1,null,"a1684a00",null).exports;function h(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(t)))return;var n=[],r=!0,a=!1,o=void 0;try{for(var i,l=t[Symbol.iterator]();!(r=(i=l.next()).done)&&(n.push(i.value),!e||n.length!==e);r=!0);}catch(t){a=!0,o=t}finally{try{r||null==l.return||l.return()}finally{if(a)throw o}}return n}(t,e)||function(t,e){if(!t)return;if("string"==typeof t)return y(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return y(t,e)}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function y(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}var _=["numbered-list","bulleted-list"],g=function(t,e){return!!h(d.a.nodes(t,{match:function(t){return t.type===e}}),1)[0]},x=function(t,e){var n=g(t,e),r=_.includes(e);if(d.i.unwrapNodes(t,{match:function(t){return _.includes(t.type)},split:!0}),d.i.setNodes(t,{type:n?"paragraph":r?"list-item":e}),!n&&r){var a={type:e,children:[]};d.i.wrapNodes(t,a)}},O={name:"blockButton",mixins:[r.f],components:{Button:u.a,Icon:c.a},props:{format:String,icon:String},render:function(){var t=this,e=arguments[0],n=this.$editor;return e(u.a,{attrs:{active:g(n,this.format)},on:{mouseDown:function(e){e.preventDefault(),x(n,t.format)}}},[e(c.a,{attrs:{icon:this.icon}})])}},w=Object(m.a)(O,void 0,void 0,!1,null,"11ce2d77",null).exports,j=n(34),E=[{type:"paragraph",children:[{text:"This is editable "},{text:"rich",bold:!0,italic:!0},{text:" text, "},{text:"much",italic:!0},{text:" better than a "},{text:"<textarea>",code:!0},{text:"!"}]},{type:"paragraph",children:[{text:"Since it's rich text, you can do things like turn a selection of text "},{text:"bold",bold:!0},{text:", or add a semantically rendered block quote in the middle of the page, like this:"}]},{type:"block-quote",children:[{text:"A wise quote."}]},{type:"paragraph",children:[{text:"Try it out for yourself!"}]}],k={name:"richtext",components:{Slate:r.e,Editable:r.a,Toolbar:j.a,MarkButton:v,BlockButton:w},data:function(){return{initialValue:E,renderLeaf:l,renderElement:s}}},B=Object(m.a)(k,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("Slate",{attrs:{value:JSON.stringify(t.initialValue)}},[n("Toolbar",[n("MarkButton",{attrs:{format:"bold",icon:"format_bold"}}),t._v(" "),n("MarkButton",{attrs:{format:"italic",icon:"format_italic"}}),t._v(" "),n("MarkButton",{attrs:{format:"underline",icon:"format_underlined"}}),t._v(" "),n("MarkButton",{attrs:{format:"code",icon:"code"}}),t._v(" "),n("BlockButton",{attrs:{format:"heading-one",icon:"looks_one"}}),t._v(" "),n("BlockButton",{attrs:{format:"heading-two",icon:"looks_two"}}),t._v(" "),n("BlockButton",{attrs:{format:"block-quote",icon:"format_quote"}}),t._v(" "),n("BlockButton",{attrs:{format:"numbered-list",icon:"format_list_numbered"}}),t._v(" "),n("BlockButton",{attrs:{format:"bulleted-list",icon:"format_list_bulleted"}})],1),t._v(" "),n("Editable",{attrs:{placeholder:"Enter some rich text…",renderLeaf:t.renderLeaf,renderElement:t.renderElement}})],1)}),[],!1,null,"316c5356",null);e.default=B.exports},56:function(t,e,n){"use strict";var r=n(41);n.n(r).a},57:function(t,e,n){(e=n(10)(!1)).push([t.i,".editableVoidElement[data-v-1b970042] {\n  box-shadow: 0 0 0 3px #ddd;\n  padding: 8px;\n}\n.editableVoidElement__input[data-v-1b970042] {\n  margin: 8px 0;\n}\n.editableVoidElement__richtext[data-v-1b970042] {\n  padding: 20px;\n  border: 2px solid #ddd;\n}\n.unset[data-v-1b970042] {\n  width: unset;\n}\n",""]),t.exports=e}}]);