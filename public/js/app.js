!function i(a,l,c){function d(t,e){if(!l[t]){if(!a[t]){var n="function"==typeof require&&require;if(!e&&n)return n(t,!0);if(u)return u(t,!0);var o=new Error("Cannot find module '"+t+"'");throw o.code="MODULE_NOT_FOUND",o}var r=l[t]={exports:{}};a[t][0].call(r.exports,function(e){return d(a[t][1][e]||e)},r,r.exports,i,a,l,c)}return l[t].exports}for(var u="function"==typeof require&&require,e=0;e<c.length;e++)d(c[e]);return d}({1:[function(e,t,n){"use strict";window.LazyLoad=e("./modules/LazyLoad"),window.Admin=e("./modules/Admin"),window.Alert=e("./modules/Alert"),document.addEventListener("DOMContentLoaded",function(){LazyLoad.observe()}),window.addEventListener("load",function(){navigator.serviceWorker&&!location.href.includes("localhost")&&navigator.serviceWorker.register("/sw.js")})},{"./modules/Admin":4,"./modules/Alert":5,"./modules/LazyLoad":6}],2:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.isArray=n.isNodeList=n.isElement=void 0;n.isElement=function(e){return e instanceof Element||e instanceof HTMLDocument||window.self===e};n.isNodeList=function(e){return e instanceof NodeList&&0<e.length};n.isArray=function(e){return e instanceof Array&&0<e.length}},{}],3:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.on=void 0;var a=e("./DomManipulation");n.on=function(e,t,n,o){var r=!(3<arguments.length&&void 0!==o)||o,i=e;"string"==typeof i&&(i=[i]),i.forEach(function(e){(0,a.isNodeList)(t)||(0,a.isArray)(t)?t.forEach(function(t){t.addEventListener(e,function(e){return n(t,e)},{passive:r})}):(0,a.isElement)(t)&&t.addEventListener(e,function(e){return n(e)},{passive:r})})}},{"./DomManipulation":2}],4:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.modal=n.phoneInput=n.preview=n.tinyMCE=n.navbar=void 0;var o=e("../functions/EventHandler"),r=e("./Alert");n.navbar=function(){document.querySelectorAll(".navbar__link").forEach(function(e){window.location.href.includes(e.href)&&e.classList.add("navbar__link--active")})};n.tinyMCE=function(){tinymce.init({selector:"textarea",language:"pt_BR",plugins:"image imagetools advlist code media link colorpicker paste table textcolor fullscreen preview",images_upload_url:"/admin/upload",entity_encoding:"raw",height:450,mobile:{theme:"mobile"}})};n.preview=function(){var e=document.querySelector(".default__file"),t=document.querySelector(".default__image");(0,o.on)("change",e,function(){t.src=URL.createObjectURL(e.files[0]),e.dataset.placeholder="ALTERAR IMAGEM"})};n.phoneInput=function(){var n=document.querySelector(".button--small"),e=document.querySelectorAll(".button--orange");i(e),(0,o.on)("click",n,function(){var e=document.querySelector(".default__group").cloneNode(!0),t=e.querySelector("button");e.querySelector("input").value=null,e.querySelector("select").selectedIndex=0,n.parentNode.insertBefore(e,n),i([t])})};var i=function(e){(0,o.on)("click",e,function(e){1<document.querySelectorAll(".default__group").length?e.parentNode.remove():(0,r.showAlert)("Erro!","É necessário ter ao menos um telefone cadastrado!")})};n.modal=function(){var e=document.querySelectorAll("[data-modal]"),t=document.querySelectorAll(".modal__close");(0,o.on)("click",t,function(e){e.parentElement.parentElement.classList.remove("modal--visible")}),(0,o.on)("click",e,function(e){document.getElementById(e.dataset.modal).classList.add("modal--visible")})}},{"../functions/EventHandler":3,"./Alert":5}],5:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.showAlert=void 0;var l=e("../functions/EventHandler");n.showAlert=function(e,t){var n=document.createElement("div"),o=document.createElement("div"),r=document.createElement("div"),i=document.createElement("div"),a=document.createElement("button");r.innerHTML=e,i.innerHTML=t,a.innerText="OK!",n.classList.add("alert"),o.classList.add("alert__modal"),r.classList.add("alert__title"),i.classList.add("alert__content"),a.classList.add("alert__close"),n.appendChild(o),o.appendChild(r),o.appendChild(i),o.appendChild(a),document.body.appendChild(n),(0,l.on)("click",a,function(){return n.parentNode.removeChild(n)})}},{"../functions/EventHandler":3}],6:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.observe=void 0;n.observe=function(){var e=document.querySelectorAll('*[loading="lazy"]'),t=new IntersectionObserver(function(e){e.forEach(function(e){e.isIntersecting&&o(e.target)})});e.forEach(function(e){t.observe(e)})};var o=function(e){""===e.src&&e.dataset.src&&(e.src=e.dataset.src,delete e.dataset.src)}},{}]},{},[1]);
//# sourceMappingURL=tmp/app.js.map
