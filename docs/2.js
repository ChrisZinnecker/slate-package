(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{1111:function(t){t.exports=JSON.parse('["ase","art","bmp","blp","cd5","cit","cpt","cr2","cut","dds","dib","djvu","egt","exif","gif","gpl","grf","icns","ico","iff","jng","jpeg","jpg","jfif","jp2","jps","lbm","max","miff","mng","msp","nitf","ota","pbm","pc1","pc2","pc3","pcf","pcx","pdn","pgm","PI1","PI2","PI3","pict","pct","pnm","pns","ppm","psb","psd","pdd","psp","px","pxm","pxr","qfx","raw","rle","sct","sgi","rgb","int","bw","tga","tiff","tif","vtf","xbm","xcf","xpm","3dv","amf","ai","awg","cgm","cdr","cmx","dxf","e2d","egt","eps","fs","gbr","odg","svg","stl","vrml","x3d","sxd","v2d","vnd","wmf","emf","art","xar","png","webp","jxr","hdp","wdp","cur","ecw","iff","lbm","liff","nrrd","pam","pcx","pgf","sgi","rgb","rgba","bw","int","inta","sid","ras","sun","tga"]')},1124:function(t,e,n){"use strict";n.r(e);var r=n(11),a=n(51),i=n(0);function o(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function s(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?o(Object(n),!0).forEach((function(e){c(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function c(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var l=function(t){var e=t.attributes,n=t.children,r=t.element;return{components:{ImageElement:a.a},render:function(){var t=arguments[0];switch(r.type){case"image":return t(a.a,{attrs:s({element:r},e)},[n]);default:return t("p",{attrs:s({},e)},[n])}}}},u=function(t,e){var n={type:"image",url:e,children:[{text:""}]};i.i.insertNodes(t,n)},f=n(33),p=n(12),d={name:"insertImageButton",render:function(){var t=arguments[0],e=this.$editor;return t(f.a,{on:{mouseDown:function(t){t.preventDefault();var n=window.prompt("Enter the URL of the image:");n&&u(e,n)}}},[t(p.a,{attrs:{icon:"image"}})])}},m=n(5),b=Object(m.a)(d,void 0,void 0,!1,null,"9870e80e",null).exports,v=n(34),h=n(47),g=n.n(h),y=n(1111);function x(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(t)))return;var n=[],r=!0,a=!1,i=void 0;try{for(var o,s=t[Symbol.iterator]();!(r=(o=s.next()).done)&&(n.push(o.value),!e||n.length!==e);r=!0);}catch(t){a=!0,i=t}finally{try{r||null==s.return||s.return()}finally{if(a)throw i}}return n}(t,e)||w(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function w(t,e){if(t){if("string"==typeof t)return j(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(n):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?j(t,e):void 0}}function j(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}var O=[{type:"paragraph",children:[{text:"In addition to nodes that contain editable text, you can also create other types of nodes, like images or videos."}]},{type:"image",url:"https://source.unsplash.com/kFrdX5IeQzI",children:[{text:""}]},{type:"paragraph",children:[{text:"This example shows images in action. It features two ways to add images. You can either add an image via the toolbar icon above, or if you want in on a little secret, copy an image URL to your keyboard and paste it anywhere in the editor!"}]}],S=function(t){var e=t.insertData,n=t.isVoid;return t.isVoid=function(t){return"image"===t.type||n(t)},t.insertData=function(n){var r=n.getData("text/plain"),a=n.files;if(a&&a.length>0){var i,o=function(t){if("undefined"==typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(t=w(t))){var e=0,n=function(){};return{s:n,n:function(){return e>=t.length?{done:!0}:{done:!1,value:t[e++]}},e:function(t){throw t},f:n}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var r,a,i=!0,o=!1;return{s:function(){r=t[Symbol.iterator]()},n:function(){var t=r.next();return i=t.done,t},e:function(t){o=!0,a=t},f:function(){try{i||null==r.return||r.return()}finally{if(o)throw a}}}}(a);try{var s=function(){var e=i.value,n=new FileReader;"image"===x(e.type.split("/"),1)[0]&&(n.addEventListener("load",(function(){var e=n.result;u(t,e)})),n.readAsDataURL(e))};for(o.s();!(i=o.n()).done;)s()}catch(t){o.e(t)}finally{o.f()}}else!function(t){if(!t)return!1;if(!g()(t))return!1;var e=new URL(t).pathname.split(".").pop();return y.includes(e)}(r)?e(n):u(t,r)},t},E={name:"links",components:{Slate:r.e,Editable:r.a,InsertImageButton:b,Toolbar:v.a},data:function(){return{initialValue:O,renderElement:l}},beforeCreate:function(){S(this.$editor)}},I=Object(m.a)(E,(function(){var t=this.$createElement,e=this._self._c||t;return e("Slate",{attrs:{value:JSON.stringify(this.initialValue)}},[e("Toolbar",[e("InsertImageButton")],1),this._v(" "),e("Editable",{attrs:{placeholder:"Enter some plain text...",renderElement:this.renderElement}})],1)}),[],!1,null,"a4247b98",null);e.default=I.exports},30:function(t,e,n){var r=n(9),a=n(36);"string"==typeof(a=a.__esModule?a.default:a)&&(a=[[t.i,a,""]]);var i={insert:"head",singleton:!1},o=(r(a,i),a.locals?a.locals:{});t.exports=o},31:function(t,e,n){var r=n(9),a=n(38);"string"==typeof(a=a.__esModule?a.default:a)&&(a=[[t.i,a,""]]);var i={insert:"head",singleton:!1},o=(r(a,i),a.locals?a.locals:{});t.exports=o},33:function(t,e,n){"use strict";var r={name:"s-button",props:{active:Boolean,reversed:Boolean},computed:{color:function(){return this.reversed?this.active?"white":"#aaa":this.active?"black":"#ccc"}}},a=(n(35),n(5)),i=Object(a.a)(r,(function(){var t=this,e=t.$createElement;return(t._self._c||e)("span",{staticClass:"button",style:{color:t.color},on:{mousedown:function(e){return t.$emit("mouseDown",e)}}},[t._t("default")],2)}),[],!1,null,"152f4f5a",null);e.a=i.exports},34:function(t,e,n){"use strict";var r={name:"toolbar"},a=(n(37),n(5)),i=Object(a.a)(r,(function(){var t=this.$createElement;return(this._self._c||t)("div",{staticClass:"toolbar"},[this._t("default")],2)}),[],!1,null,"f9a1b270",null);e.a=i.exports},35:function(t,e,n){"use strict";var r=n(30);n.n(r).a},36:function(t,e,n){(e=n(10)(!1)).push([t.i,".button[data-v-152f4f5a] {\n  cursor: pointer;\n}\n",""]),t.exports=e},37:function(t,e,n){"use strict";var r=n(31);n.n(r).a},38:function(t,e,n){(e=n(10)(!1)).push([t.i,".toolbar[data-v-f9a1b270] {\n  position: relative;\n  padding: 1px 18px 17px;\n  margin: 0 -20px;\n  border-bottom: 2px solid #eee;\n  margin-bottom: 20px;\n}\n",""]),t.exports=e},39:function(t,e,n){var r=n(9),a=n(46);"string"==typeof(a=a.__esModule?a.default:a)&&(a=[[t.i,a,""]]);var i={insert:"head",singleton:!1},o=(r(a,i),a.locals?a.locals:{});t.exports=o},45:function(t,e,n){"use strict";var r=n(39);n.n(r).a},46:function(t,e,n){(e=n(10)(!1)).push([t.i,"img[data-v-37c82c64] {\n  display: block;\n  max-width: 100%;\n  max-height: 20em;\n}\n",""]),t.exports=e},47:function(t,e){t.exports=function(t){if("string"!=typeof t)return!1;var e=t.match(n);if(!e)return!1;var i=e[1];if(!i)return!1;if(r.test(i)||a.test(i))return!0;return!1};var n=/^(?:\w+:)?\/\/(\S+)$/,r=/^localhost[\:?\d]*(?:[^\:?\d]\S*)?$/,a=/^[^\s\.]+\.\S{2,}$/},51:function(t,e,n){"use strict";var r=n(11),a={name:"imageElement",mixins:[r.d,r.b],props:{element:Object}},i=(n(45),n(5)),o=Object(i.a)(a,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("div",{attrs:{contentEditable:"false"}},[e("img",{style:{boxShadow:this.selected&&this.focused?"0 0 0 3px #B4D5FF":"none"},attrs:{src:this.element.url}})]),this._t("default")],2)}),[],!1,null,"37c82c64",null);e.a=o.exports}}]);