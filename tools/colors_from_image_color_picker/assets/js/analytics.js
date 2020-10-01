// $('body').attr('oncontextmenu', 'return false');
// $(document).keydown(function(e) {
//     if (e.which === 123) {
//         return false;
//     }
// });
// var isCtrl = false;
// document.onkeyup = function(e) {
//     if (e.which == 17)
//         isCtrl = false;
// }
// document.onkeydown = function(e) {
//     if (e.which == 17)
//         isCtrl = true;
//     if ((e.which == 85) || (e.which == 67) && isCtrl == true) {
//         return false;
//     }
// }
// var isNS = (navigator.appName == "Netscape") ? 1 : 0;
// if (navigator.appName == "Netscape") document.captureEvents(Event.MOUSEDOWN || Event.MOUSEUP);
//
// function mischandler() {
//     return false;
// }
//
// function mousehandler(e) {
//     var myevent = (isNS) ? e : event;
//     var eventbutton = (isNS) ? myevent.which : myevent.button;
//     if ((eventbutton == 2) || (eventbutton == 3)) return false;
// }
// document.oncontextmenu = mischandler;
// document.onmousedown = mousehandler;
// document.onmouseup = mousehandler;
// (function(exportName) {
//     var exports = exports || {};
//
//     function create(options) {
//         if (typeof options === "function") {
//             options = {
//                 onchange: options
//             };
//         }
//         options = options || {};
//         var delay = options.delay || 1000;
//         var instance = {};
//         instance.onchange = options.onchange;
//         var status = "unknown";
//
//         function getStatus() {
//             return status;
//         }
//         instance.getStatus = getStatus;
//
//         function checkHandler() {
//             if (
//                 window.Firebug &&
//                 window.Firebug.chrome &&
//                 window.Firebug.chrome.isInitialized
//             ) {
//                 setStatus("on");
//                 return;
//             }
//             var r = /./;
//             r.toString = function() {
//                 checkStatus = "on";
//                 setStatus("on");
//             };
//             checkStatus = "off";
//             console.log("%c", r, options.label || "");
//             if (!options.once) {
//                 if (console.clear) {
//                     console.clear();
//                 }
//             }
//             setStatus(checkStatus);
//         }
//
//         function setStatus(value) {
//             if (status !== value) {
//                 status = value;
//                 if (typeof instance.onchange === "function") {
//                     instance.onchange(value);
//                 }
//             }
//         }
//         var timer;
//         if (!options.once) {
//             setInterval(checkHandler, delay);
//             window.addEventListener("resize", checkHandler);
//         } else {
//             checkHandler();
//         }
//         var freed;
//
//         function free() {
//             if (freed) {
//                 return;
//             }
//             freed = true;
//             if (!options.once) {
//                 window.removeEventListener("resize", checkHandler);
//                 clearInterval(timer);
//             }
//         }
//         instance.free = free;
//         return instance;
//     }
//     exports.create = create;
//     if (typeof define === "function") {
//         if (define.amd || define.cmd) {
//             define(function() {
//                 return exports;
//             });
//         }
//     } else if (typeof module !== "undefined" && module.exports) {
//         module.exports = exports;
//     } else {
//         window[exportName] = exports;
//     }
// })("jdetects");
// jdetects.create(function(status) {
//     if (status == "on") {
//         window.location.replace("error.html");
//     }
// });
