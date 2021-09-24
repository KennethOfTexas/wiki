var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.arrayIteratorImpl=function(a){var b=0;return function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}}};$jscomp.arrayIterator=function(a){return{next:$jscomp.arrayIteratorImpl(a)}};$jscomp.makeIterator=function(a){var b="undefined"!=typeof Symbol&&Symbol.iterator&&a[Symbol.iterator];return b?b.call(a):$jscomp.arrayIterator(a)};
$jscomp.getGlobal=function(a){a=["object"==typeof globalThis&&globalThis,a,"object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof global&&global];for(var b=0;b<a.length;++b){var c=a[b];if(c&&c.Math==Math)return c}throw Error("Cannot find global object");};$jscomp.global=$jscomp.getGlobal(this);$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.SIMPLE_FROUND_POLYFILL=!1;$jscomp.ISOLATE_POLYFILLS=!1;
$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){if(a==Array.prototype||a==Object.prototype)return a;a[b]=c.value;return a};$jscomp.IS_SYMBOL_NATIVE="function"===typeof Symbol&&"symbol"===typeof Symbol("x");$jscomp.TRUST_ES6_POLYFILLS=!$jscomp.ISOLATE_POLYFILLS||$jscomp.IS_SYMBOL_NATIVE;$jscomp.polyfills={};$jscomp.propertyToPolyfillSymbol={};$jscomp.POLYFILL_PREFIX="$jscp$";
var $jscomp$lookupPolyfilledValue=function(a,b){var c=$jscomp.propertyToPolyfillSymbol[b];if(null==c)return a[b];c=a[c];return void 0!==c?c:a[b]};$jscomp.polyfill=function(a,b,c,d){b&&($jscomp.ISOLATE_POLYFILLS?$jscomp.polyfillIsolated(a,b,c,d):$jscomp.polyfillUnisolated(a,b,c,d))};
$jscomp.polyfillUnisolated=function(a,b,c,d){c=$jscomp.global;a=a.split(".");for(d=0;d<a.length-1;d++){var e=a[d];e in c||(c[e]={});c=c[e]}a=a[a.length-1];d=c[a];b=b(d);b!=d&&null!=b&&$jscomp.defineProperty(c,a,{configurable:!0,writable:!0,value:b})};
$jscomp.polyfillIsolated=function(a,b,c,d){var e=a.split(".");a=1===e.length;d=e[0];d=!a&&d in $jscomp.polyfills?$jscomp.polyfills:$jscomp.global;for(var f=0;f<e.length-1;f++){var g=e[f];g in d||(d[g]={});d=d[g]}e=e[e.length-1];c=$jscomp.IS_SYMBOL_NATIVE&&"es6"===c?d[e]:null;b=b(c);null!=b&&(a?$jscomp.defineProperty($jscomp.polyfills,e,{configurable:!0,writable:!0,value:b}):b!==c&&($jscomp.propertyToPolyfillSymbol[e]=$jscomp.IS_SYMBOL_NATIVE?$jscomp.global.Symbol(e):$jscomp.POLYFILL_PREFIX+e,e=$jscomp.propertyToPolyfillSymbol[e],
$jscomp.defineProperty(d,e,{configurable:!0,writable:!0,value:b})))};$jscomp.FORCE_POLYFILL_PROMISE=!1;
$jscomp.polyfill("Promise",function(a){function b(){this.batch_=null}function c(a){return a instanceof e?a:new e(function(b,c){b(a)})}if(a&&!$jscomp.FORCE_POLYFILL_PROMISE)return a;b.prototype.asyncExecute=function(a){if(null==this.batch_){this.batch_=[];var b=this;this.asyncExecuteFunction(function(){b.executeBatch_()})}this.batch_.push(a)};var d=$jscomp.global.setTimeout;b.prototype.asyncExecuteFunction=function(a){d(a,0)};b.prototype.executeBatch_=function(){for(;this.batch_&&this.batch_.length;){var a=
this.batch_;this.batch_=[];for(var b=0;b<a.length;++b){var c=a[b];a[b]=null;try{c()}catch(l){this.asyncThrow_(l)}}}this.batch_=null};b.prototype.asyncThrow_=function(a){this.asyncExecuteFunction(function(){throw a;})};var e=function(a){this.state_=0;this.result_=void 0;this.onSettledCallbacks_=[];var b=this.createResolveAndReject_();try{a(b.resolve,b.reject)}catch(k){b.reject(k)}};e.prototype.createResolveAndReject_=function(){function a(a){return function(d){c||(c=!0,a.call(b,d))}}var b=this,c=!1;
return{resolve:a(this.resolveTo_),reject:a(this.reject_)}};e.prototype.resolveTo_=function(a){if(a===this)this.reject_(new TypeError("A Promise cannot resolve to itself"));else if(a instanceof e)this.settleSameAsPromise_(a);else{a:switch(typeof a){case "object":var b=null!=a;break a;case "function":b=!0;break a;default:b=!1}b?this.resolveToNonPromiseObj_(a):this.fulfill_(a)}};e.prototype.resolveToNonPromiseObj_=function(a){var b=void 0;try{b=a.then}catch(k){this.reject_(k);return}"function"==typeof b?
this.settleSameAsThenable_(b,a):this.fulfill_(a)};e.prototype.reject_=function(a){this.settle_(2,a)};e.prototype.fulfill_=function(a){this.settle_(1,a)};e.prototype.settle_=function(a,b){if(0!=this.state_)throw Error("Cannot settle("+a+", "+b+"): Promise already settled in state"+this.state_);this.state_=a;this.result_=b;this.executeOnSettledCallbacks_()};e.prototype.executeOnSettledCallbacks_=function(){if(null!=this.onSettledCallbacks_){for(var a=0;a<this.onSettledCallbacks_.length;++a)f.asyncExecute(this.onSettledCallbacks_[a]);
this.onSettledCallbacks_=null}};var f=new b;e.prototype.settleSameAsPromise_=function(a){var b=this.createResolveAndReject_();a.callWhenSettled_(b.resolve,b.reject)};e.prototype.settleSameAsThenable_=function(a,b){var c=this.createResolveAndReject_();try{a.call(b,c.resolve,c.reject)}catch(l){c.reject(l)}};e.prototype.then=function(a,b){function c(a,b){return"function"==typeof a?function(b){try{d(a(b))}catch(r){f(r)}}:b}var d,f,g=new e(function(a,b){d=a;f=b});this.callWhenSettled_(c(a,d),c(b,f));return g};
e.prototype.catch=function(a){return this.then(void 0,a)};e.prototype.callWhenSettled_=function(a,b){function c(){switch(d.state_){case 1:a(d.result_);break;case 2:b(d.result_);break;default:throw Error("Unexpected state: "+d.state_);}}var d=this;null==this.onSettledCallbacks_?f.asyncExecute(c):this.onSettledCallbacks_.push(c)};e.resolve=c;e.reject=function(a){return new e(function(b,c){c(a)})};e.race=function(a){return new e(function(b,d){for(var e=$jscomp.makeIterator(a),f=e.next();!f.done;f=e.next())c(f.value).callWhenSettled_(b,
d)})};e.all=function(a){var b=$jscomp.makeIterator(a),d=b.next();return d.done?c([]):new e(function(a,e){function f(b){return function(c){g[b]=c;n--;0==n&&a(g)}}var g=[],n=0;do g.push(void 0),n++,c(d.value).callWhenSettled_(f(g.length-1),e),d=b.next();while(!d.done)})};return e},"es6","es3");
$jscomp.polyfill("Array.prototype.copyWithin",function(a){function b(a){a=Number(a);return Infinity===a||-Infinity===a?a:a|0}return a?a:function(a,d,e){var c=this.length;a=b(a);d=b(d);e=void 0===e?c:b(e);a=0>a?Math.max(c+a,0):Math.min(a,c);d=0>d?Math.max(c+d,0):Math.min(d,c);e=0>e?Math.max(c+e,0):Math.min(e,c);if(a<d)for(;d<e;)d in this?this[a++]=this[d++]:(delete this[a++],d++);else for(e=Math.min(e,c+d-a),a+=e-d;e>d;)--e in this?this[--a]=this[e]:delete this[--a];return this}},"es6","es3");
var Module="undefined"!==typeof Module?Module:{},moduleOverrides={},key;for(key in Module)Module.hasOwnProperty(key)&&(moduleOverrides[key]=Module[key]);var arguments_=[],thisProgram="./this.program",quit_=function(a,b){throw b;},ENVIRONMENT_IS_WEB=!1,ENVIRONMENT_IS_WORKER=!1,ENVIRONMENT_IS_NODE=!1,ENVIRONMENT_IS_SHELL=!1;ENVIRONMENT_IS_WEB="object"===typeof window;ENVIRONMENT_IS_WORKER="function"===typeof importScripts;
ENVIRONMENT_IS_NODE="object"===typeof process&&"object"===typeof process.versions&&"string"===typeof process.versions.node;ENVIRONMENT_IS_SHELL=!ENVIRONMENT_IS_WEB&&!ENVIRONMENT_IS_NODE&&!ENVIRONMENT_IS_WORKER;var scriptDirectory="";function locateFile(a){return Module.locateFile?Module.locateFile(a,scriptDirectory):scriptDirectory+a}var read_,readAsync,readBinary,setWindowTitle,nodeFS,nodePath;
if(ENVIRONMENT_IS_NODE)scriptDirectory=ENVIRONMENT_IS_WORKER?require("path").dirname(scriptDirectory)+"/":__dirname+"/",read_=function(a,b){nodeFS||(nodeFS=require("fs"));nodePath||(nodePath=require("path"));a=nodePath.normalize(a);return nodeFS.readFileSync(a,b?null:"utf8")},readBinary=function(a){a=read_(a,!0);a.buffer||(a=new Uint8Array(a));assert(a.buffer);return a},1<process.argv.length&&(thisProgram=process.argv[1].replace(/\\/g,"/")),arguments_=process.argv.slice(2),"undefined"!==typeof module&&
(module.exports=Module),process.on("uncaughtException",function(a){if(!(a instanceof ExitStatus))throw a;}),process.on("unhandledRejection",abort),quit_=function(a){process.exit(a)},Module.inspect=function(){return"[Emscripten Module object]"};else if(ENVIRONMENT_IS_SHELL)"undefined"!=typeof read&&(read_=function(a){return read(a)}),readBinary=function(a){if("function"===typeof readbuffer)return new Uint8Array(readbuffer(a));a=read(a,"binary");assert("object"===typeof a);return a},"undefined"!=typeof scriptArgs?
arguments_=scriptArgs:"undefined"!=typeof arguments&&(arguments_=arguments),"function"===typeof quit&&(quit_=function(a){quit(a)}),"undefined"!==typeof print&&("undefined"===typeof console&&(console={}),console.log=print,console.warn=console.error="undefined"!==typeof printErr?printErr:print);else if(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER)ENVIRONMENT_IS_WORKER?scriptDirectory=self.location.href:document.currentScript&&(scriptDirectory=document.currentScript.src),scriptDirectory=0!==scriptDirectory.indexOf("blob:")?
scriptDirectory.substr(0,scriptDirectory.lastIndexOf("/")+1):"",read_=function(a){var b=new XMLHttpRequest;b.open("GET",a,!1);b.send(null);return b.responseText},ENVIRONMENT_IS_WORKER&&(readBinary=function(a){var b=new XMLHttpRequest;b.open("GET",a,!1);b.responseType="arraybuffer";b.send(null);return new Uint8Array(b.response)}),readAsync=function(a,b,c){var d=new XMLHttpRequest;d.open("GET",a,!0);d.responseType="arraybuffer";d.onload=function(){200==d.status||0==d.status&&d.response?b(d.response):
c()};d.onerror=c;d.send(null)},setWindowTitle=function(a){document.title=a};var out=Module.print||console.log.bind(console),err=Module.printErr||console.warn.bind(console);for(key in moduleOverrides)moduleOverrides.hasOwnProperty(key)&&(Module[key]=moduleOverrides[key]);moduleOverrides=null;Module.arguments&&(arguments_=Module.arguments);Module.thisProgram&&(thisProgram=Module.thisProgram);Module.quit&&(quit_=Module.quit);var wasmBinary;Module.wasmBinary&&(wasmBinary=Module.wasmBinary);var noExitRuntime;
Module.noExitRuntime&&(noExitRuntime=Module.noExitRuntime);"object"!==typeof WebAssembly&&err("no native wasm support detected");var wasmMemory,wasmTable=new WebAssembly.Table({initial:209,maximum:209,element:"anyfunc"}),ABORT=!1,EXITSTATUS=0;function assert(a,b){a||abort("Assertion failed: "+b)}function getCFunc(a){var b=Module["_"+a];assert(b,"Cannot call unknown function "+a+", make sure it is exported");return b}
function ccall(a,b,c,d,e){e={string:function(a){var b=0;if(null!==a&&void 0!==a&&0!==a){var c=(a.length<<2)+1;b=stackAlloc(c);stringToUTF8(a,b,c)}return b},array:function(a){var b=stackAlloc(a.length);writeArrayToMemory(a,b);return b}};var f=getCFunc(a),g=[];a=0;if(d)for(var h=0;h<d.length;h++){var k=e[c[h]];k?(0===a&&(a=stackSave()),g[h]=k(d[h])):g[h]=d[h]}c=f.apply(null,g);c=function(a){return"string"===b?UTF8ToString(a):"boolean"===b?!!a:a}(c);0!==a&&stackRestore(a);return c}
var UTF8Decoder="undefined"!==typeof TextDecoder?new TextDecoder("utf8"):void 0;
function UTF8ArrayToString(a,b,c){var d=b+c;for(c=b;a[c]&&!(c>=d);)++c;if(16<c-b&&a.subarray&&UTF8Decoder)return UTF8Decoder.decode(a.subarray(b,c));for(d="";b<c;){var e=a[b++];if(e&128){var f=a[b++]&63;if(192==(e&224))d+=String.fromCharCode((e&31)<<6|f);else{var g=a[b++]&63;e=224==(e&240)?(e&15)<<12|f<<6|g:(e&7)<<18|f<<12|g<<6|a[b++]&63;65536>e?d+=String.fromCharCode(e):(e-=65536,d+=String.fromCharCode(55296|e>>10,56320|e&1023))}}else d+=String.fromCharCode(e)}return d}
function UTF8ToString(a,b){return a?UTF8ArrayToString(HEAPU8,a,b):""}
function stringToUTF8Array(a,b,c,d){if(!(0<d))return 0;var e=c;d=c+d-1;for(var f=0;f<a.length;++f){var g=a.charCodeAt(f);if(55296<=g&&57343>=g){var h=a.charCodeAt(++f);g=65536+((g&1023)<<10)|h&1023}if(127>=g){if(c>=d)break;b[c++]=g}else{if(2047>=g){if(c+1>=d)break;b[c++]=192|g>>6}else{if(65535>=g){if(c+2>=d)break;b[c++]=224|g>>12}else{if(c+3>=d)break;b[c++]=240|g>>18;b[c++]=128|g>>12&63}b[c++]=128|g>>6&63}b[c++]=128|g&63}}b[c]=0;return c-e}
function stringToUTF8(a,b,c){return stringToUTF8Array(a,HEAPU8,b,c)}function lengthBytesUTF8(a){for(var b=0,c=0;c<a.length;++c){var d=a.charCodeAt(c);55296<=d&&57343>=d&&(d=65536+((d&1023)<<10)|a.charCodeAt(++c)&1023);127>=d?++b:b=2047>=d?b+2:65535>=d?b+3:b+4}return b}function allocateUTF8(a){var b=lengthBytesUTF8(a)+1,c=_malloc(b);c&&stringToUTF8Array(a,HEAP8,c,b);return c}function writeArrayToMemory(a,b){HEAP8.set(a,b)}var WASM_PAGE_SIZE=65536;function alignUp(a,b){0<a%b&&(a+=b-a%b);return a}
var buffer,HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64;function updateGlobalBufferAndViews(a){buffer=a;Module.HEAP8=HEAP8=new Int8Array(a);Module.HEAP16=HEAP16=new Int16Array(a);Module.HEAP32=HEAP32=new Int32Array(a);Module.HEAPU8=HEAPU8=new Uint8Array(a);Module.HEAPU16=HEAPU16=new Uint16Array(a);Module.HEAPU32=HEAPU32=new Uint32Array(a);Module.HEAPF32=HEAPF32=new Float32Array(a);Module.HEAPF64=HEAPF64=new Float64Array(a)}
var DYNAMIC_BASE=5252848,DYNAMICTOP_PTR=9808,INITIAL_INITIAL_MEMORY=Module.INITIAL_MEMORY||16777216;if(wasmMemory=Module.wasmMemory?Module.wasmMemory:new WebAssembly.Memory({initial:INITIAL_INITIAL_MEMORY/WASM_PAGE_SIZE,maximum:2147483648/WASM_PAGE_SIZE}))buffer=wasmMemory.buffer;INITIAL_INITIAL_MEMORY=buffer.byteLength;updateGlobalBufferAndViews(buffer);HEAP32[DYNAMICTOP_PTR>>2]=DYNAMIC_BASE;
function callRuntimeCallbacks(a){for(;0<a.length;){var b=a.shift();if("function"==typeof b)b(Module);else{var c=b.func;"number"===typeof c?void 0===b.arg?Module.dynCall_v(c):Module.dynCall_vi(c,b.arg):c(void 0===b.arg?null:b.arg)}}}var __ATPRERUN__=[],__ATINIT__=[],__ATMAIN__=[],__ATPOSTRUN__=[],runtimeInitialized=!1,runtimeExited=!1;
function preRun(){if(Module.preRun)for("function"==typeof Module.preRun&&(Module.preRun=[Module.preRun]);Module.preRun.length;)addOnPreRun(Module.preRun.shift());callRuntimeCallbacks(__ATPRERUN__)}function initRuntime(){runtimeInitialized=!0;callRuntimeCallbacks(__ATINIT__)}function preMain(){callRuntimeCallbacks(__ATMAIN__)}function exitRuntime(){runtimeExited=!0}
function postRun(){if(Module.postRun)for("function"==typeof Module.postRun&&(Module.postRun=[Module.postRun]);Module.postRun.length;)addOnPostRun(Module.postRun.shift());callRuntimeCallbacks(__ATPOSTRUN__)}function addOnPreRun(a){__ATPRERUN__.unshift(a)}function addOnPostRun(a){__ATPOSTRUN__.unshift(a)}var runDependencies=0,runDependencyWatcher=null,dependenciesFulfilled=null;
function addRunDependency(a){runDependencies++;Module.monitorRunDependencies&&Module.monitorRunDependencies(runDependencies)}function removeRunDependency(a){runDependencies--;Module.monitorRunDependencies&&Module.monitorRunDependencies(runDependencies);0==runDependencies&&(null!==runDependencyWatcher&&(clearInterval(runDependencyWatcher),runDependencyWatcher=null),dependenciesFulfilled&&(a=dependenciesFulfilled,dependenciesFulfilled=null,a()))}Module.preloadedImages={};Module.preloadedAudios={};
function abort(a){if(Module.onAbort)Module.onAbort(a);a+="";out(a);err(a);ABORT=!0;EXITSTATUS=1;throw new WebAssembly.RuntimeError("abort("+a+"). Build with -s ASSERTIONS=1 for more info.");}function hasPrefix(a,b){return String.prototype.startsWith?a.startsWith(b):0===a.indexOf(b)}var dataURIPrefix="data:application/octet-stream;base64,";function isDataURI(a){return hasPrefix(a,dataURIPrefix)}var fileURIPrefix="file://";function isFileURI(a){return hasPrefix(a,fileURIPrefix)}var wasmBinaryFile="easyw.wasm";
isDataURI(wasmBinaryFile)||(wasmBinaryFile=locateFile(wasmBinaryFile));function getBinary(){try{if(wasmBinary)return new Uint8Array(wasmBinary);if(readBinary)return readBinary(wasmBinaryFile);throw"both async and sync fetching of the wasm failed";}catch(a){abort(a)}}
function getBinaryPromise(){return wasmBinary||!ENVIRONMENT_IS_WEB&&!ENVIRONMENT_IS_WORKER||"function"!==typeof fetch||isFileURI(wasmBinaryFile)?new Promise(function(a,b){a(getBinary())}):fetch(wasmBinaryFile,{credentials:"same-origin"}).then(function(a){if(!a.ok)throw"failed to load wasm binary file at '"+wasmBinaryFile+"'";return a.arrayBuffer()}).catch(function(){return getBinary()})}
function createWasm(){function a(a,b){Module.asm=a.exports;removeRunDependency("wasm-instantiate")}function b(b){a(b.instance)}function c(a){return getBinaryPromise().then(function(a){return WebAssembly.instantiate(a,d)}).then(a,function(a){err("failed to asynchronously prepare wasm: "+a);abort(a)})}var d={a:asmLibraryArg};addRunDependency("wasm-instantiate");if(Module.instantiateWasm)try{return Module.instantiateWasm(d,a)}catch(e){return err("Module.instantiateWasm callback failed with error: "+
e),!1}(function(){if(wasmBinary||"function"!==typeof WebAssembly.instantiateStreaming||isDataURI(wasmBinaryFile)||isFileURI(wasmBinaryFile)||"function"!==typeof fetch)return c(b);fetch(wasmBinaryFile,{credentials:"same-origin"}).then(function(a){return WebAssembly.instantiateStreaming(a,d).then(b,function(a){err("wasm streaming compile failed: "+a);err("falling back to ArrayBuffer instantiation");c(b)})})})();return{}}
var ASM_CONSTS={1758:function(){update()},1767:function(a){postMessage(["timer",a])},1797:function(a){postMessage(["init",a])},1827:function(a){postMessage(["ide","info",a])},1864:function(a){postMessage(["ide","selline",a])},1904:function(a){postMessage(["ide","output",UTF8ToString(a)])},1956:function(a){postMessage(["print",UTF8ToString(a)+"\n"])},2008:function(a){postMessage(["print",UTF8ToString(a)])},2053:function(a,b,c){push([9,a,b,c])},2078:function(a){push([6,UTF8ToString(a)])},2109:function(a,
b){push([1,a,b])},2130:function(a,b){push([2,a,b])},2151:function(a,b){push([4,a,b])},2172:function(a){push([3,a])},2189:function(a){push([8,a])},2206:function(a){push([7,a])},2223:function(a){push([10,a])},2241:function(a){push([11,a])},2259:function(){update();postMessage(["exit"])},2291:function(){list=[]},2301:function(a,b){list.push([a,b])},2325:function(){push([5,list])},2341:function(){push([12,list])},2358:function(){postMessage(["sound",list]);list=[]},2398:function(){step()},2405:function(){input()},
3406:function(){postMessage(["started"])},4150:function(){return lang.charCodeAt(0)+256*lang.charCodeAt(1)}};function _emscripten_asm_const_iii(a,b,c){b=readAsmConstArgs(b,c);return ASM_CONSTS[a].apply(null,b)}__ATINIT__.push({func:function(){___wasm_call_ctors()}});function _emscripten_memcpy_big(a,b,c){HEAPU8.copyWithin(a,b,b+c)}function _emscripten_random(){return Math.random()}function _emscripten_get_heap_size(){return HEAPU8.length}
function emscripten_realloc_buffer(a){try{return wasmMemory.grow(a-buffer.byteLength+65535>>>16),updateGlobalBufferAndViews(wasmMemory.buffer),1}catch(b){}}function _emscripten_resize_heap(a){a>>>=0;var b=_emscripten_get_heap_size();if(2147483648<a)return!1;for(var c=1;4>=c;c*=2){var d=b*(1+.2/c);d=Math.min(d,a+100663296);d=Math.min(2147483648,alignUp(Math.max(16777216,a,d),65536));if(emscripten_realloc_buffer(d))return!0}return!1}function _exit(a){exit(a)}
var PATH={splitPath:function(a){return/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec(a).slice(1)},normalizeArray:function(a,b){for(var c=0,d=a.length-1;0<=d;d--){var e=a[d];"."===e?a.splice(d,1):".."===e?(a.splice(d,1),c++):c&&(a.splice(d,1),c--)}if(b)for(;c;c--)a.unshift("..");return a},normalize:function(a){var b="/"===a.charAt(0),c="/"===a.substr(-1);(a=PATH.normalizeArray(a.split("/").filter(function(a){return!!a}),!b).join("/"))||b||(a=".");a&&c&&(a+="/");return(b?"/":"")+
a},dirname:function(a){var b=PATH.splitPath(a);a=b[0];b=b[1];if(!a&&!b)return".";b&&(b=b.substr(0,b.length-1));return a+b},basename:function(a){if("/"===a)return"/";var b=a.lastIndexOf("/");return-1===b?a:a.substr(b+1)},extname:function(a){return PATH.splitPath(a)[3]},join:function(){var a=Array.prototype.slice.call(arguments,0);return PATH.normalize(a.join("/"))},join2:function(a,b){return PATH.normalize(a+"/"+b)}},SYSCALLS={mappings:{},buffers:[null,[],[]],printChar:function(a,b){var c=SYSCALLS.buffers[a];
0===b||10===b?((1===a?out:err)(UTF8ArrayToString(c,0)),c.length=0):c.push(b)},varargs:void 0,get:function(){SYSCALLS.varargs+=4;return HEAP32[SYSCALLS.varargs-4>>2]},getStr:function(a){return UTF8ToString(a)},get64:function(a,b){return a}};function _fd_close(a){return 0}function _fd_seek(a,b,c,d,e){}function _fd_write(a,b,c,d){for(var e=0,f=0;f<c;f++){for(var g=HEAP32[b+8*f>>2],h=HEAP32[b+(8*f+4)>>2],k=0;k<h;k++)SYSCALLS.printChar(a,HEAPU8[g+k]);e+=h}HEAP32[d>>2]=e;return 0}
function _gettimeofday(a){var b=Date.now();HEAP32[a>>2]=b/1E3|0;HEAP32[a+4>>2]=b%1E3*1E3|0;return 0}var ___tm_current=9824,___tm_timezone=(stringToUTF8("GMT",9872,4),9872);
function _tzset(){function a(a){return(a=a.toTimeString().match(/\(([A-Za-z ]+)\)$/))?a[1]:"GMT"}if(!_tzset.called){_tzset.called=!0;HEAP32[__get_timezone()>>2]=60*(new Date).getTimezoneOffset();var b=(new Date).getFullYear(),c=new Date(b,0,1);b=new Date(b,6,1);HEAP32[__get_daylight()>>2]=Number(c.getTimezoneOffset()!=b.getTimezoneOffset());var d=a(c),e=a(b);d=allocateUTF8(d);e=allocateUTF8(e);b.getTimezoneOffset()<c.getTimezoneOffset()?(HEAP32[__get_tzname()>>2]=d,HEAP32[__get_tzname()+4>>2]=e):
(HEAP32[__get_tzname()>>2]=e,HEAP32[__get_tzname()+4>>2]=d)}}
function _localtime_r(a,b){_tzset();a=new Date(1E3*HEAP32[a>>2]);HEAP32[b>>2]=a.getSeconds();HEAP32[b+4>>2]=a.getMinutes();HEAP32[b+8>>2]=a.getHours();HEAP32[b+12>>2]=a.getDate();HEAP32[b+16>>2]=a.getMonth();HEAP32[b+20>>2]=a.getFullYear()-1900;HEAP32[b+24>>2]=a.getDay();var c=new Date(a.getFullYear(),0,1),d=(a.getTime()-c.getTime())/864E5|0;HEAP32[b+28>>2]=d;HEAP32[b+36>>2]=-(60*a.getTimezoneOffset());d=(new Date(a.getFullYear(),6,1)).getTimezoneOffset();c=c.getTimezoneOffset();a=(d!=c&&a.getTimezoneOffset()==
Math.min(c,d))|0;HEAP32[b+32>>2]=a;a=HEAP32[__get_tzname()+(a?4:0)>>2];HEAP32[b+40>>2]=a;return b}function _localtime(a){return _localtime_r(a,___tm_current)}var _emscripten_get_now;_emscripten_get_now=ENVIRONMENT_IS_NODE?function(){var a=process.hrtime();return 1E3*a[0]+a[1]/1E6}:"undefined"!==typeof dateNow?dateNow:function(){return performance.now()};function _usleep(a){for(var b=_emscripten_get_now();_emscripten_get_now()-b<a/1E3;);}Module._usleep=_usleep;
function setErrNo(a){return HEAP32[___errno_location()>>2]=a}function _nanosleep(a,b){if(0===a)return setErrNo(28),-1;var c=HEAP32[a>>2];a=HEAP32[a+4>>2];if(0>a||999999999<a||0>c)return setErrNo(28),-1;0!==b&&(HEAP32[b>>2]=0,HEAP32[b+4>>2]=0);return _usleep(1E6*c+a/1E3)}function __isLeapYear(a){return 0===a%4&&(0!==a%100||0===a%400)}function __arraySum(a,b){for(var c=0,d=0;d<=b;c+=a[d++]);return c}
var __MONTH_DAYS_LEAP=[31,29,31,30,31,30,31,31,30,31,30,31],__MONTH_DAYS_REGULAR=[31,28,31,30,31,30,31,31,30,31,30,31];function __addDays(a,b){for(a=new Date(a.getTime());0<b;){var c=__isLeapYear(a.getFullYear()),d=a.getMonth();c=(c?__MONTH_DAYS_LEAP:__MONTH_DAYS_REGULAR)[d];if(b>c-a.getDate())b-=c-a.getDate()+1,a.setDate(1),11>d?a.setMonth(d+1):(a.setMonth(0),a.setFullYear(a.getFullYear()+1));else{a.setDate(a.getDate()+b);break}}return a}
function _strftime(a,b,c,d){function e(a,b,c){for(a="number"===typeof a?a.toString():a||"";a.length<b;)a=c[0]+a;return a}function f(a,b){return e(a,b,"0")}function g(a,b){function c(a){return 0>a?-1:0<a?1:0}var d;0===(d=c(a.getFullYear()-b.getFullYear()))&&0===(d=c(a.getMonth()-b.getMonth()))&&(d=c(a.getDate()-b.getDate()));return d}function h(a){switch(a.getDay()){case 0:return new Date(a.getFullYear()-1,11,29);case 1:return a;case 2:return new Date(a.getFullYear(),0,3);case 3:return new Date(a.getFullYear(),
0,2);case 4:return new Date(a.getFullYear(),0,1);case 5:return new Date(a.getFullYear()-1,11,31);case 6:return new Date(a.getFullYear()-1,11,30)}}function k(a){a=__addDays(new Date(a.tm_year+1900,0,1),a.tm_yday);var b=new Date(a.getFullYear(),0,4),c=new Date(a.getFullYear()+1,0,4);b=h(b);c=h(c);return 0>=g(b,a)?0>=g(c,a)?a.getFullYear()+1:a.getFullYear():a.getFullYear()-1}var l=HEAP32[d+40>>2];d={tm_sec:HEAP32[d>>2],tm_min:HEAP32[d+4>>2],tm_hour:HEAP32[d+8>>2],tm_mday:HEAP32[d+12>>2],tm_mon:HEAP32[d+
16>>2],tm_year:HEAP32[d+20>>2],tm_wday:HEAP32[d+24>>2],tm_yday:HEAP32[d+28>>2],tm_isdst:HEAP32[d+32>>2],tm_gmtoff:HEAP32[d+36>>2],tm_zone:l?UTF8ToString(l):""};c=UTF8ToString(c);l={"%c":"%a %b %d %H:%M:%S %Y","%D":"%m/%d/%y","%F":"%Y-%m-%d","%h":"%b","%r":"%I:%M:%S %p","%R":"%H:%M","%T":"%H:%M:%S","%x":"%m/%d/%y","%X":"%H:%M:%S","%Ec":"%c","%EC":"%C","%Ex":"%m/%d/%y","%EX":"%H:%M:%S","%Ey":"%y","%EY":"%Y","%Od":"%d","%Oe":"%e","%OH":"%H","%OI":"%I","%Om":"%m","%OM":"%M","%OS":"%S","%Ou":"%u","%OU":"%U",
"%OV":"%V","%Ow":"%w","%OW":"%W","%Oy":"%y"};for(var m in l)c=c.replace(new RegExp(m,"g"),l[m]);var q="Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),p="January February March April May June July August September October November December".split(" ");l={"%a":function(a){return q[a.tm_wday].substring(0,3)},"%A":function(a){return q[a.tm_wday]},"%b":function(a){return p[a.tm_mon].substring(0,3)},"%B":function(a){return p[a.tm_mon]},"%C":function(a){return f((a.tm_year+1900)/100|
0,2)},"%d":function(a){return f(a.tm_mday,2)},"%e":function(a){return e(a.tm_mday,2," ")},"%g":function(a){return k(a).toString().substring(2)},"%G":function(a){return k(a)},"%H":function(a){return f(a.tm_hour,2)},"%I":function(a){a=a.tm_hour;0==a?a=12:12<a&&(a-=12);return f(a,2)},"%j":function(a){return f(a.tm_mday+__arraySum(__isLeapYear(a.tm_year+1900)?__MONTH_DAYS_LEAP:__MONTH_DAYS_REGULAR,a.tm_mon-1),3)},"%m":function(a){return f(a.tm_mon+1,2)},"%M":function(a){return f(a.tm_min,2)},"%n":function(){return"\n"},
"%p":function(a){return 0<=a.tm_hour&&12>a.tm_hour?"AM":"PM"},"%S":function(a){return f(a.tm_sec,2)},"%t":function(){return"\t"},"%u":function(a){return a.tm_wday||7},"%U":function(a){var b=new Date(a.tm_year+1900,0,1),c=0===b.getDay()?b:__addDays(b,7-b.getDay());a=new Date(a.tm_year+1900,a.tm_mon,a.tm_mday);return 0>g(c,a)?(b=__arraySum(__isLeapYear(a.getFullYear())?__MONTH_DAYS_LEAP:__MONTH_DAYS_REGULAR,a.getMonth()-1)-31,c=31-c.getDate()+b+a.getDate(),f(Math.ceil(c/7),2)):0===g(c,b)?"01":"00"},
"%V":function(a){var b=new Date(a.tm_year+1901,0,4),c=h(new Date(a.tm_year+1900,0,4));b=h(b);var d=__addDays(new Date(a.tm_year+1900,0,1),a.tm_yday);if(0>g(d,c))return"53";if(0>=g(b,d))return"01";a=c.getFullYear()<a.tm_year+1900?a.tm_yday+32-c.getDate():a.tm_yday+1-c.getDate();return f(Math.ceil(a/7),2)},"%w":function(a){return a.tm_wday},"%W":function(a){var b=new Date(a.tm_year,0,1),c=1===b.getDay()?b:__addDays(b,0===b.getDay()?1:7-b.getDay()+1);a=new Date(a.tm_year+1900,a.tm_mon,a.tm_mday);return 0>
g(c,a)?(b=__arraySum(__isLeapYear(a.getFullYear())?__MONTH_DAYS_LEAP:__MONTH_DAYS_REGULAR,a.getMonth()-1)-31,c=31-c.getDate()+b+a.getDate(),f(Math.ceil(c/7),2)):0===g(c,b)?"01":"00"},"%y":function(a){return(a.tm_year+1900).toString().substring(2)},"%Y":function(a){return a.tm_year+1900},"%z":function(a){a=a.tm_gmtoff;var b=0<=a;a=Math.abs(a)/60;return(b?"+":"-")+String("0000"+(a/60*100+a%60)).slice(-4)},"%Z":function(a){return a.tm_zone},"%%":function(){return"%"}};for(m in l)0<=c.indexOf(m)&&(c=
c.replace(new RegExp(m,"g"),l[m](d)));m=intArrayFromString(c,!1);if(m.length>b)return 0;writeArrayToMemory(m,a);return m.length-1}function _time(a){var b=Date.now()/1E3|0;a&&(HEAP32[a>>2]=b);return b}function readAsmConstArgs(a,b){readAsmConstArgs.array||(readAsmConstArgs.array=[]);var c=readAsmConstArgs.array;c.length=0;for(var d;d=HEAPU8[a++];)100===d||102===d?(b=b+7&-8,c.push(HEAPF64[b>>3]),b+=8):(b=b+3&-4,c.push(HEAP32[b>>2]),b+=4);return c}
function intArrayFromString(a,b,c){c=0<c?c:lengthBytesUTF8(a)+1;c=Array(c);a=stringToUTF8Array(a,c,0,c.length);b&&(c.length=a);return c}var asmLibraryArg={a:_emscripten_asm_const_iii,m:_emscripten_memcpy_big,f:_emscripten_random,n:_emscripten_resize_heap,b:_exit,g:_fd_close,l:_fd_seek,d:_fd_write,e:_gettimeofday,j:_localtime,memory:wasmMemory,h:_nanosleep,i:_strftime,table:wasmTable,k:_time,c:_usleep},asm=createWasm();Module.asm=asm;
var ___wasm_call_ctors=Module.___wasm_call_ctors=function(){return(___wasm_call_ctors=Module.___wasm_call_ctors=Module.asm.o).apply(null,arguments)},_errstr=Module._errstr=function(){return(_errstr=Module._errstr=Module.asm.p).apply(null,arguments)},_malloc=Module._malloc=function(){return(_malloc=Module._malloc=Module.asm.q).apply(null,arguments)},_evt_func=Module._evt_func=function(){return(_evt_func=Module._evt_func=Module.asm.r).apply(null,arguments)},_evt_mouse=Module._evt_mouse=function(){return(_evt_mouse=
Module._evt_mouse=Module.asm.s).apply(null,arguments)},_parse=Module._parse=function(){return(_parse=Module._parse=Module.asm.t).apply(null,arguments)},_format=Module._format=function(){return(_format=Module._format=Module.asm.u).apply(null,arguments)},_caret=Module._caret=function(){return(_caret=Module._caret=Module.asm.v).apply(null,arguments)},_k_free=Module._k_free=function(){return(_k_free=Module._k_free=Module.asm.w).apply(null,arguments)},_exec=Module._exec=function(){return(_exec=Module._exec=
Module.asm.x).apply(null,arguments)},_main=Module._main=function(){return(_main=Module._main=Module.asm.y).apply(null,arguments)},___errno_location=Module.___errno_location=function(){return(___errno_location=Module.___errno_location=Module.asm.z).apply(null,arguments)},__get_tzname=Module.__get_tzname=function(){return(__get_tzname=Module.__get_tzname=Module.asm.A).apply(null,arguments)},__get_daylight=Module.__get_daylight=function(){return(__get_daylight=Module.__get_daylight=Module.asm.B).apply(null,
arguments)},__get_timezone=Module.__get_timezone=function(){return(__get_timezone=Module.__get_timezone=Module.asm.C).apply(null,arguments)},stackSave=Module.stackSave=function(){return(stackSave=Module.stackSave=Module.asm.D).apply(null,arguments)},stackAlloc=Module.stackAlloc=function(){return(stackAlloc=Module.stackAlloc=Module.asm.E).apply(null,arguments)},stackRestore=Module.stackRestore=function(){return(stackRestore=Module.stackRestore=Module.asm.F).apply(null,arguments)},dynCall_vi=Module.dynCall_vi=
function(){return(dynCall_vi=Module.dynCall_vi=Module.asm.G).apply(null,arguments)},dynCall_v=Module.dynCall_v=function(){return(dynCall_v=Module.dynCall_v=Module.asm.H).apply(null,arguments)};Module.asm=asm;Module.ccall=ccall;var calledRun;function ExitStatus(a){this.name="ExitStatus";this.message="Program terminated with exit("+a+")";this.status=a}var calledMain=!1;dependenciesFulfilled=function runCaller(){calledRun||run();calledRun||(dependenciesFulfilled=runCaller)};
function callMain(a){a=Module._main;try{var b=a(0,0);exit(b,!0)}catch(c){c instanceof ExitStatus||("unwind"==c?noExitRuntime=!0:((b=c)&&"object"===typeof c&&c.stack&&(b=[c,c.stack]),err("exception thrown: "+b),quit_(1,c)))}finally{calledMain=!0}}
function run(a){function b(){if(!calledRun&&(calledRun=!0,Module.calledRun=!0,!ABORT)){initRuntime();preMain();if(Module.onRuntimeInitialized)Module.onRuntimeInitialized();shouldRunNow&&callMain(a);postRun()}}a=a||arguments_;0<runDependencies||(preRun(),0<runDependencies||(Module.setStatus?(Module.setStatus("Running..."),setTimeout(function(){setTimeout(function(){Module.setStatus("")},1);b()},1)):b()))}Module.run=run;
function exit(a,b){if(!b||!noExitRuntime||0!==a){if(!noExitRuntime&&(ABORT=!0,EXITSTATUS=a,exitRuntime(),Module.onExit))Module.onExit(a);quit_(a,new ExitStatus(a))}}if(Module.preInit)for("function"==typeof Module.preInit&&(Module.preInit=[Module.preInit]);0<Module.preInit.length;)Module.preInit.pop()();var shouldRunNow=!0;Module.noInitialRun&&(shouldRunNow=!1);noExitRuntime=!0;run();function update(){0<cmds.length&&(postMessage(["list",cmds]),cmds=[])}
function push(a){cmds.push(a);1E4<cmds.length&&update()}
onmessage=function(a){a=a.data;var b=a[0];if("mouse"==b)Module.ccall("evt_mouse","null",["int","float","float"],[a[1],a[2],a[3]]),update();else if("animate"==b)Module.ccall("evt_func","null",["int","string"],[1,null]),update();else if("timer"==b)Module.ccall("evt_func","null",["int","string"],[2,null]),update();else if("key"==b)Module.ccall("evt_func","null",["int","string"],[0,a[1]]),update();else if("stop_ping"==b)Module.ccall("k_free","null",null,null),postMessage(["stop_pong"]);else if("init"==
b)sab=a[1],lang=a[2];else if("run"==b){b=Module.ccall("parse","int",["string","int","int"],[a[1],a[2],a[3]]);var c=Module.ccall("format","string",null,null),d=Module.ccall("caret","int",null,null);0<=b?(a=Module.ccall("errstr","string",null,null),postMessage(["ide","src_err",c,b,d,a])):(postMessage(["ide","src",c,b,d]),cmds=[],a=Module.ccall("exec",null,["int","string"],[a[2],a[4]]),update(),0==a&&postMessage(["done"]))}else"runx"==b?(b=Module.ccall("parse","int",["string","int","int"],[a[1],a[2],
a[3]]),0<=b?postMessage(["done"]):(cmds=[],a=Module.ccall("exec",null,["int","string"],[a[2],a[4]]),update(),0==a&&postMessage(["done"]))):"format"==b?(b=Module.ccall("parse","int",["string","int","int"],[a[1],14,0]),c=Module.ccall("format","string",null,null),d=Module.ccall("caret","int",null,null),a=Module.ccall("errstr","string",null,null),postMessage(["ide","src_nl",c,b,d,a])):"formatID"==b?(Module.ccall("parse","int",["string","int","int"],[a[1],6,0]),c=Module.ccall("format","string",null,null),
postMessage(["ide","src2",c,a[2]])):"error"==b&&(a=Module.ccall("error","string",null,null),postMessage(["ide","error",a]))};
function input(){if(null==sab){var a="ERROR: 'input' does not work, because 'SharedArrayBuffer' is disabled in your browser\n";console.log(a);postMessage(["ide","print",a])}else update(),postMessage(["ide","input"]),a=new Int32Array(sab),Atomics.wait(a,1,0),Atomics.store(a,1,0),a=new Uint16Array(sab),0!=a[4]?(a=String.fromCharCode.apply(null,a.slice(5,a[4]+4)),Module.ccall("evt_func","null",["int","string"],[3,a])):Module.ccall("evt_func","null",["int","string"],[4,""])}
function step(){update();postMessage(["ide","step"]);var a=new Int32Array(sab);Atomics.wait(a,0,0);Atomics.store(a,0,0);Module.ccall("evt_func","null",["int"],[5+a[2]])};