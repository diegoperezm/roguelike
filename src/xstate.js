!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e(t.XState={})}(this,function(t){"use strict";var e,n,i=function(){return(i=Object.assign||function(t){for(var e,n=1,i=arguments.length;n<i;n++)for(var r in e=arguments[n])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t}).apply(this,arguments)};function r(t,e){var n={};for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&e.indexOf(i)<0&&(n[i]=t[i]);if(null!=t&&"function"==typeof Object.getOwnPropertySymbols){var r=0;for(i=Object.getOwnPropertySymbols(t);r<i.length;r++)e.indexOf(i[r])<0&&(n[i[r]]=t[i[r]])}return n}function o(t){var e="function"==typeof Symbol&&t[Symbol.iterator],n=0;return e?e.call(t):{next:function(){return t&&n>=t.length&&(t=void 0),{value:t&&t[n++],done:!t}}}}function s(t,e){var n="function"==typeof Symbol&&t[Symbol.iterator];if(!n)return t;var i,r,o=n.call(t),s=[];try{for(;(void 0===e||e-- >0)&&!(i=o.next()).done;)s.push(i.value)}catch(t){r={error:t}}finally{try{i&&!i.done&&(n=o.return)&&n.call(o)}finally{if(r)throw r.error}}return s}function a(){for(var t=[],e=0;e<arguments.length;e++)t=t.concat(s(arguments[e]));return t}(e=t.ActionTypes||(t.ActionTypes={})).Start="xstate.start",e.Stop="xstate.stop",e.Raise="xstate.raise",e.Send="xstate.send",e.Cancel="xstate.cancel",e.NullEvent="",e.Assign="xstate.assign",e.After="xstate.after",e.DoneState="done.state",e.DoneInvoke="done.invoke",e.Log="xstate.log",e.Init="xstate.init",e.Invoke="xstate.invoke",e.ErrorExecution="error.execution",e.ErrorCommunication="error.communication",(n=t.SpecialTargets||(t.SpecialTargets={})).Parent="#_parent",n.Internal="#_internal";var u=".",c={};function h(t){return"string"!=typeof t&&("value"in t&&"tree"in t&&"history"in t)}function f(t){return Object.keys(t)}function p(t,e,n){void 0===n&&(n=u);var i=y(t,n),r=y(e,n);return"string"==typeof r?"string"==typeof i&&r===i:"string"==typeof i?i in r:f(i).every(function(t){return t in r&&p(i[t],r[t])})}function d(t){try{return"string"==typeof t||"number"==typeof t?""+t:t.type}catch(t){throw new Error("Events must be strings or objects with a string event.type property.")}}function l(t,e){try{return Array.isArray(t)?t:t.toString().split(e)}catch(e){throw new Error("'"+t+"' is not a valid state path.")}}function y(t,e){return h(t)?t.value:Array.isArray(t)?v(t):"string"==typeof t||h(t)?v(l(t,e)):t}function v(t){if(1===t.length)return t[0];for(var e={},n=e,i=0;i<t.length-1;i++)i===t.length-2?n[t[i]]=t[i+1]:(n[t[i]]={},n=n[t[i]]);return e}function g(t,e){var n={};return f(t).forEach(function(i,r){n[i]=e(t[i],i,t,r)}),n}function m(t,e,n){var i={};return f(t).forEach(function(r){var o=t[r];n(o)&&(i[r]=e(o,r,t))}),i}var S=function(t){return function(e){var n,i,r=e;try{for(var s=o(t),a=s.next();!a.done;a=s.next()){r=r[a.value]}}catch(t){n={error:t}}finally{try{a&&!a.done&&(i=s.return)&&i.call(s)}finally{if(n)throw n.error}}return r}};var w=function(t){return t?"string"==typeof t?[[t]]:b(f(t).map(function(e){var n=t[e];return"string"==typeof n||Object.keys(n).length?w(t[e]).map(function(t){return[e].concat(t)}):[[e]]})):[[]]};function b(t){var e;return(e=[]).concat.apply(e,a(t))}function x(t){return Array.isArray(t)?t:void 0===t?[]:[t]}function E(t,e,n){return"function"==typeof t?t(e,n):f(t).reduce(function(i,r){var o=t[r];return i[r]="function"==typeof o?o(e,n):o,i},{})}var N=function(){function e(t){this.actions=[],this.activities=c,this.meta={},this.events=[],this.value=t.value,this.context=t.context,this.event=t.event,this.historyValue=t.historyValue,this.history=t.history,this.actions=t.actions||[],this.activities=t.activities||c,this.meta=t.meta||{},this.events=t.events||[],Object.defineProperty(this,"tree",{value:t.tree,enumerable:!1})}return e.from=function(n,i){return n instanceof e?n.context!==i?new e({value:n.value,context:i,event:n.event,historyValue:n.historyValue,history:n.history,actions:[],activities:n.activities,meta:{},events:[],tree:n.tree}):n:new e({value:n,context:i,event:{type:t.ActionTypes.Init},historyValue:void 0,history:void 0,actions:[],activities:void 0,meta:void 0,events:[]})},e.create=function(t){return new e(t)},e.inert=function(n,i){if(n instanceof e){if(!n.actions.length)return n;var r={type:t.ActionTypes.Init};return new e({value:n.value,context:i,event:r,historyValue:n.historyValue,history:n.history,activities:n.activities,tree:n.tree})}return e.from(n,i)},Object.defineProperty(e.prototype,"inert",{get:function(){return e.inert(this,this.context)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"nextEvents",{get:function(){return this.tree?this.tree.nextEvents:[]},enumerable:!0,configurable:!0}),e.prototype.toStrings=function(t,e){var n=this;if(void 0===t&&(t=this.value),void 0===e&&(e="."),"string"==typeof t)return[t];var i=f(t);return i.concat.apply(i,a(i.map(function(i){return n.toStrings(t[i]).map(function(t){return i+e+t})})))},e.prototype.matches=function(t){return p(t,this.value)},Object.defineProperty(e.prototype,"changed",{get:function(){if(this.history)return!!this.actions.length||typeof this.history.value!=typeof this.value||!function t(e,n){if(e===n)return!0;if("string"==typeof e||"string"==typeof n)return e===n;var i=f(e),r=f(n);return i.length===r.length&&i.every(function(i){return t(e[i],n[i])})}(this.value,this.history.value)},enumerable:!0,configurable:!0}),e}(),T=t.ActionTypes.Start,A=t.ActionTypes.Stop,O=t.ActionTypes.Raise,P=t.ActionTypes.Send,j=t.ActionTypes.Cancel,k=t.ActionTypes.NullEvent,V=t.ActionTypes.Assign,_=(t.ActionTypes.After,t.ActionTypes.DoneState,t.ActionTypes.Log),L=t.ActionTypes.Init,C=t.ActionTypes.Invoke,I=t.ActionTypes.ErrorExecution,D={type:L};function R(t){return"string"==typeof t||"number"==typeof t?{type:t}:t}function M(t,e){if(e){var n=e[t];if(n)return n}}function F(t,e){var n;if("string"==typeof t||"number"==typeof t){var o=M(t,e);n="function"==typeof o?{type:t,exec:o}:o||{type:t,exec:void 0}}else if("function"==typeof t)n={type:t.name||t.toString(),exec:t};else{if("function"==typeof(o=M(t.type,e)))n=i({},t,{exec:o});else if(o){var s=t.type,a=r(t,["type"]);n=i({type:s},o,a)}else n=t}return Object.defineProperty(n,"toString",{value:function(){return n.type},enumerable:!1,configurable:!0}),n}function H(t){var e=F(t);return i({id:"string"==typeof t?t:e.id},e,{type:e.type})}function U(t){return{type:O,event:t}}function z(t,e){return{to:e?e.to:void 0,type:P,event:"function"==typeof t?t:R(t),delay:e?e.delay:void 0,id:e&&void 0!==e.id?e.id:"function"==typeof t?t.name:d(t)}}function B(e,n){return z(e,i({},n,{to:t.SpecialTargets.Parent}))}var Q=function(t){return{type:j,sendId:t}};function X(e){var n=H(e);return{type:t.ActionTypes.Start,activity:n,exec:void 0}}function G(e){var n=H(e);return{type:t.ActionTypes.Stop,activity:n,exec:void 0}}var J=function(t){return{type:V,assignment:t}};function q(e,n){var i=n?"#"+n:"";return t.ActionTypes.After+"("+e+")"+i}function K(e,n){var i=t.ActionTypes.DoneState+"."+e,r={type:i,data:n,toString:function(){return i}};return r}function W(e,n){var i=t.ActionTypes.DoneInvoke+"."+e,r={type:i,data:n,toString:function(){return i}};return r}function Y(e,n){return{src:n,type:t.ActionTypes.ErrorExecution,data:e}}var Z={resolved:!1},$=function(){function t(e,n,r){var o;void 0===r&&(r=Z),this.stateNode=e,this.stateValue=n,this.nodes=n?"string"==typeof n?((o={})[n]=new t(e.getStateNode(n),void 0),o):g(n,function(n,i){return new t(e.getStateNode(i),n)}):{};var s=i({},Z,r);this.isResolved=s.resolved}return Object.defineProperty(t.prototype,"done",{get:function(){var t=this;switch(this.stateNode.type){case"final":return!0;case"compound":return"final"===this.nodes[f(this.nodes)[0]].stateNode.type;case"parallel":return f(this.nodes).every(function(e){return t.nodes[e].done});default:return!1}},enumerable:!0,configurable:!0}),t.prototype.getDoneData=function(t,e){if(this.done&&"compound"===this.stateNode.type){var n=this.nodes[f(this.nodes)[0]];if(!n.stateNode.data)return;return E(n.stateNode.data,t,e)}},Object.defineProperty(t.prototype,"atomicNodes",{get:function(){var t=this;return"atomic"===this.stateNode.type||"final"===this.stateNode.type?[this.stateNode]:b(f(this.value).map(function(e){return t.value[e].atomicNodes}))},enumerable:!0,configurable:!0}),t.prototype.getDoneEvents=function(t){var e=this;if(!t||!t.size)return[];if(t.has(this.stateNode)&&"final"===this.stateNode.type)return[K(this.stateNode.id,this.stateNode.data)];var n=b(f(this.nodes).map(function(n){return e.nodes[n].getDoneEvents(t)}));if("parallel"===this.stateNode.type){var i=f(this.nodes).every(function(t){return e.nodes[t].done});return n&&i?n.concat(K(this.stateNode.id)):n}if(!this.done||!n.length)return n;var r=1===n.length?n[0].data:void 0;return n.concat(K(this.stateNode.id,r))},Object.defineProperty(t.prototype,"resolved",{get:function(){return new t(this.stateNode,this.stateNode.resolve(this.value),{resolved:!0})},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"paths",{get:function(){return w(this.value)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"absolute",{get:function(){var e=this,n=this.stateValue,i={},r=i;return this.stateNode.path.forEach(function(t,i){i===e.stateNode.path.length-1?r[t]=n:(r[t]={},r=r[t])}),new t(this.stateNode.machine,i)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"nextEvents",{get:function(){var t=this,e=this.stateNode.ownEvents,n=b(f(this.nodes).map(function(e){return t.nodes[e].nextEvents}));return a(new Set(n.concat(e)))},enumerable:!0,configurable:!0}),t.prototype.clone=function(){return new t(this.stateNode,this.value)},t.prototype.combine=function(t){var e,n=this;if(t.stateNode!==this.stateNode)throw new Error("Cannot combine distinct trees");if("compound"===this.stateNode.type){var i=void 0;if(f(this.nodes).length&&f(t.nodes).length){var r=f(this.nodes)[0];return(e={})[r]=this.nodes[r].combine(t.nodes[r]),i=e,(o=this.clone()).nodes=i,o}return i=Object.assign({},this.nodes,t.nodes),(o=this.clone()).nodes=i,o}if("parallel"===this.stateNode.type){var o,s=new Set(a(f(this.nodes),f(t.nodes))),u={};return s.forEach(function(e){n.nodes[e]&&t.nodes[e]?u[e]=n.nodes[e].combine(t.nodes[e]):u[e]=n.nodes[e]||t.nodes[e]}),(o=this.clone()).nodes=u,o}return this},Object.defineProperty(t.prototype,"value",{get:function(){if("atomic"===this.stateNode.type||"final"===this.stateNode.type)return{};if("parallel"===this.stateNode.type)return g(this.nodes,function(t){return t.value});if("compound"===this.stateNode.type){if(0===f(this.nodes).length)return{};var t=this.nodes[f(this.nodes)[0]].stateNode;return"atomic"===t.type||"final"===t.type?t.key:g(this.nodes,function(t){return t.value})}return{}},enumerable:!0,configurable:!0}),t.prototype.matches=function(t){return p(t,this.value)},t.prototype.getEntryExitStates=function(t,e){var n=this;if(t.stateNode!==this.stateNode)throw new Error("Cannot compare distinct trees");switch(this.stateNode.type){case"compound":var i={exit:[],entry:[]},r=f(this.nodes)[0],o=f(t.nodes)[0];return r!==o?(i.exit=t.nodes[o].getExitStates(),i.entry=this.nodes[r].getEntryStates()):i=this.nodes[r].getEntryExitStates(t.nodes[o],e),e&&e.has(this.stateNode)&&(i.exit.push(this.stateNode),i.entry.unshift(this.stateNode)),i;case"parallel":var s=f(this.nodes).map(function(i){return n.nodes[i].getEntryExitStates(t.nodes[i],e)}),u={exit:[],entry:[]};return s.forEach(function(t){u.exit=a(u.exit,t.exit),u.entry=a(u.entry,t.entry)}),e&&e.has(this.stateNode)&&(u.exit.push(this.stateNode),u.entry.unshift(this.stateNode)),u;case"atomic":default:return e&&e.has(this.stateNode)?{exit:[this.stateNode],entry:[this.stateNode]}:{exit:[],entry:[]}}},t.prototype.getEntryStates=function(){var t=this;return this.nodes?[this.stateNode].concat(b(f(this.nodes).map(function(e){return t.nodes[e].getEntryStates()}))):[this.stateNode]},t.prototype.getExitStates=function(){var t=this;return this.nodes?b(f(this.nodes).map(function(e){return t.nodes[e].getExitStates()})).concat(this.stateNode):[this.stateNode]},t}(),tt=".",et="",nt={},it=function(t){return"#"===t[0]},rt=function(){return{guards:nt}},ot=!0,st=function(){function e(t,n,r){void 0===n&&(n=rt());var o=this;this._config=t,this.options=n,this.context=r,this.__cache={events:void 0,relativeValue:new Map,initialState:void 0},this.idMap={},this.key=t.key||t.id||"(machine)",this.parent=t.parent,this.machine=this.parent?this.parent.machine:this,this.path=this.parent?this.parent.path.concat(this.key):[],this.delimiter=t.delimiter||(this.parent?this.parent.delimiter:tt),this.id=t.id||(this.machine?a([this.machine.key],this.path).join(this.delimiter):this.key),this.type=t.type||(t.parallel?"parallel":t.states&&f(t.states).length?"compound":t.history?"history":"atomic"),!ot&&"parallel"in t&&console.warn('The "parallel" property is deprecated and will be removed in version 4.1. '+(t.parallel?"Replace with `type: 'parallel'`":"Use `type: '"+this.type+"'`")+" in the config for state node '"+this.id+"' instead."),this.initial=t.initial,this.order=t.order||-1,this.states=t.states?g(t.states,function(t,n,r,s){var a,u=new e(i({},t,{key:n,order:void 0===t.order?s:t.order,parent:o}));return Object.assign(o.idMap,i(((a={})[u.id]=u,a),u.idMap)),u}):nt,this.history=!0===t.history?"shallow":t.history||!1,this.transient=!(!t.on||!t.on[et]),this.strict=!!t.strict,this.onEntry=x(t.onEntry).map(function(t){return F(t)}),this.onExit=x(t.onExit).map(function(t){return F(t)}),this.meta=t.meta,this.data="final"===this.type?t.data:void 0,this.invoke=x(t.invoke).map(function(t,n){var r,s;if(t instanceof e)return(o.parent||o).options.services=i(((r={})[t.id]=t,r),(o.parent||o).options.services),{type:C,src:t.id,id:t.id};if("string"!=typeof t.src){var a=o.id+":invocation["+n+"]";return(o.parent||o).options.services=i(((s={})[a]=t.src,s),(o.parent||o).options.services),i({type:C,id:a},t,{src:a})}return i({},t,{type:C,id:t.id||t.src,src:t.src})}),this.activities=x(t.activities).concat(this.invoke).map(function(t){return o.resolveActivity(t)})}return e.prototype.withConfig=function(t,n){void 0===n&&(n=this.context);var r=this.options,o=r.actions,s=r.activities,a=r.guards,u=r.services;return new e(this.definition,{actions:i({},o,t.actions),activities:i({},s,t.activities),guards:i({},a,t.guards),services:i({},u,t.services)},n)},e.prototype.withContext=function(t){return new e(this.definition,this.options,t)},Object.defineProperty(e.prototype,"definition",{get:function(){return{id:this.id,key:this.key,type:this.type,initial:this.initial,history:this.history,states:g(this.states,function(t){return t.definition}),on:this.on,onEntry:this.onEntry,onExit:this.onExit,activities:this.activities||[],meta:this.meta,order:this.order||-1,data:this.data}},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"config",{get:function(){var t=this._config;t.parent;return r(t,["parent"])},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"on",{get:function(){return this.formatTransitions()},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"transitions",{get:function(){var t=this;return b(f(this.on).map(function(e){return t.on[e]}))},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"after",{get:function(){var t=this,e=this.config.after;if(!e)return[];if(Array.isArray(e))return e.map(function(e){return i({event:q(e.delay,t.id)},e,{actions:x(e.actions).map(function(t){return F(t)})})});var n=b(f(e).map(function(n){var r=e[n],o=+n,s=q(o,t.id);return"string"==typeof r?[{target:r,delay:o,event:s,actions:[]}]:x(r).map(function(t){return i({event:s,delay:o},t,{actions:x(t.actions).map(function(t){return F(t)})})})}));return n.sort(function(t,e){return t.delay-e.delay}),n},enumerable:!0,configurable:!0}),e.prototype.getStateNodes=function(t){var e,n=this;if(!t)return[];var i=t instanceof N?t.value:y(t,this.delimiter);if("string"==typeof i){var r=this.getStateNode(i).initial;return void 0!==r?this.getStateNodes(((e={})[i]=r,e)):[this.states[i]]}var o=f(i);return o.map(function(t){return n.getStateNode(t)}).concat(o.reduce(function(t,e){var r=n.getStateNode(e).getStateNodes(i[e]);return t.concat(r)},[]))},e.prototype.handles=function(t){var e=d(t);return-1!==this.events.indexOf(e)},e.prototype.transitionLeafNode=function(t,e,n,i){var r=this.getStateNode(t).next(e,n,i);if(!r.tree){var o=this.next(e,n,i),s=o.reentryStates,a=o.actions;return{tree:o.tree,source:e,reentryStates:s,actions:a}}return r},e.prototype.transitionCompoundNode=function(t,e,n,i){var r=f(t),o=this.getStateNode(r[0])._transition(t[r[0]],e,n,i);if(!o.tree){var s=this.next(e,n,i),a=s.reentryStates,u=s.actions;return{tree:s.tree,source:e,reentryStates:a,actions:u}}return o},e.prototype.transitionParallelNode=function(t,e,n,i){var r=this,o={};if(f(t).forEach(function(s){var a=t[s];if(a){var u=r.getStateNode(s)._transition(a,e,n,i);u.tree,o[s]=u}}),!f(o).some(function(t){return void 0!==o[t].tree})){var s=this.next(e,n,i),u=s.reentryStates,c=s.actions;return{tree:s.tree,source:e,reentryStates:u,actions:c}}var h=f(o).map(function(t){return o[t].tree}).filter(function(t){return void 0!==t}).reduce(function(t,e){return t.combine(e)});return 1!==h.paths.length||p(y(this.path,this.delimiter),h.value)?{tree:f(o).map(function(t){var n=o[t],i=S(r.path)(n.tree?n.tree.value:e.value||e.value)[t];return new $(r.getStateNode(t),i).absolute}).reduce(function(t,e){return t.combine(e)}),source:e,reentryStates:f(o).reduce(function(t,e){var n=o[e],i=n.tree,r=n.reentryStates;return i&&r?new Set(a(Array.from(t),Array.from(r))):t},new Set),actions:b(f(o).map(function(t){return o[t].actions}))}:{tree:h,source:e,reentryStates:f(o).map(function(t){return o[t].reentryStates}).reduce(function(t,e){return new Set(a(Array.from(t||[]),Array.from(e||[])))},new Set),actions:b(f(o).map(function(t){return o[t].actions}))}},e.prototype._transition=function(t,e,n,i){return"string"==typeof t?this.transitionLeafNode(t,e,n,i):1===f(t).length?this.transitionCompoundNode(t,e,n,i):this.transitionParallelNode(t,e,n,i)},e.prototype.next=function(t,e,n){var i,r,s=this,u=e.type,c=this.on[u],h=this.transient?[{type:k}]:[];if(!c||!c.length)return{tree:void 0,source:t,reentryStates:void 0,actions:h};var f,d=[];try{for(var l=o(c),v=l.next();!v.done;v=l.next()){var g=v.value,m=g,w=m.cond,E=m.in,N=n||nt,T=!E||("string"==typeof E&&it(E)?t.matches(y(this.getStateNodeById(E).path,this.delimiter)):p(y(E,this.delimiter),S(this.path.slice(0,-2))(t.value)));if((!w||this.evaluateGuard(w,N,e,t.value))&&T){d=x(g.target),h.push.apply(h,a(x(g.actions))),f=g;break}}}catch(t){i={error:t}}finally{try{v&&!v.done&&(r=l.return)&&r.call(l)}finally{if(i)throw i.error}}if(f&&0===d.length)return{tree:t.value?this.machine.getStateTree(t.value):void 0,source:t,reentryStates:void 0,actions:h};if(!f&&0===d.length)return{tree:void 0,source:t,reentryStates:void 0,actions:h};var A=b(d.map(function(e){return s.getRelativeStateNodes(e,t.historyValue)})),O=!!f.internal?[]:b(A.map(function(t){return s.nodesFromChild(t)}));return{tree:A.map(function(t){return t.tree}).reduce(function(t,e){return t.combine(e)}),source:t,reentryStates:new Set(O),actions:h}},Object.defineProperty(e.prototype,"tree",{get:function(){var t=y(this.path,this.delimiter);return new $(this.machine,t)},enumerable:!0,configurable:!0}),e.prototype.nodesFromChild=function(t){if(t.escapes(this))return[];for(var e=[],n=t;n&&n!==this;)e.push(n),n=n.parent;return e.push(this),e},e.prototype.getStateTree=function(t){return new $(this,t)},e.prototype.escapes=function(t){if(this===t)return!1;for(var e=this.parent;e;){if(e===t)return!1;e=e.parent}return!0},e.prototype.evaluateGuard=function(t,e,n,i){var r,o=this.machine.options.guards;if("string"==typeof t){if(!o||!o[t])throw new Error("Condition '"+t+"' is not implemented on machine '"+this.machine.id+"'.");r=o[t]}else r=t;return r(e,n,i)},Object.defineProperty(e.prototype,"delays",{get:function(){var t=this;return Array.from(new Set(this.transitions.map(function(t){return t.delay}).filter(function(t){return void 0!==t}))).map(function(e){return{id:t.id,delay:e}})},enumerable:!0,configurable:!0}),e.prototype.getActions=function(t,e){var n=this,i=t.tree?t.tree.resolved.getEntryExitStates(this.getStateTree(e.value),t.reentryStates?t.reentryStates:void 0):{entry:[],exit:[]},r=t.tree?t.tree.getDoneEvents(new Set(i.entry)):[];t.source||(i.exit=[],i.entry.unshift(this));var o={entry:b(Array.from(new Set(i.entry)).map(function(t){return a(t.activities.map(function(t){return X(t)}),t.onEntry,t.delays.map(function(t){var e=t.delay;return z(q(e,t.id),{delay:e})}))})).concat(r.map(U)),exit:b(Array.from(new Set(i.exit)).map(function(t){return a(t.onExit,t.activities.map(function(t){return G(t)}),t.delays.map(function(t){var e=t.delay,n=t.id;return Q(q(e,n))}))}))};return o.exit.concat(t.actions).concat(o.entry).map(function(t){return n.resolveAction(t)})},e.prototype.resolveAction=function(t){return F(t,this.machine.options.actions)},e.prototype.resolveActivity=function(t){return H(t)},e.prototype.getActivities=function(t,e){if(!t)return nt;var n=i({},e);return t.exit.forEach(function(t){t.activities.forEach(function(t){n[t.type]=!1})}),t.entry.forEach(function(t){t.activities.forEach(function(t){n[t.type]=!0})}),n},e.prototype.transition=function(e,n,r){var o="string"==typeof e?this.resolve(v(this.getResolvedPath(e))):e instanceof N?e:this.resolve(e),s=r||(e instanceof N?e.context:this.machine.context),a=R(n),u=a.type;if(this.strict&&-1===this.events.indexOf(u)&&!function(e){return 0===e.indexOf(t.ActionTypes.DoneState)||0===e.indexOf(t.ActionTypes.DoneInvoke)||e===t.ActionTypes.ErrorCommunication||e===t.ActionTypes.ErrorCommunication}(u))throw new Error("Machine '"+this.id+"' does not accept event '"+u+"'");var c=N.from(o,s),h=this._transition(c.value,c,a,s),f=i({},h,{tree:h.tree?h.tree.resolved:void 0});return this.resolveTransition(f,c,a)},e.prototype.resolveTransition=function(n,r,o){var s,u=this,c=n.tree?n.tree.value:void 0,h=r.historyValue?r.historyValue:n.source?this.machine.historyValue(r.value):void 0;if(!ot&&n.tree)try{this.ensureValidPaths(n.tree.paths)}catch(t){throw new Error("Event '"+(o?o.type:"none")+"' leads to an invalid configuration: "+t.message)}var f=this.getActions(n,r),p=n.tree?n.tree.getEntryExitStates(this.getStateTree(r.value)):{entry:[],exit:[]},d=n.tree?this.getActivities({entry:new Set(p.entry),exit:new Set(p.exit)},r.activities):{},l=f.filter(function(t){return t.type===O||t.type===k}),y=f.filter(function(t){return t.type!==O&&t.type!==k&&t.type!==V}),v=f.filter(function(t){return t.type===V}),g=e.updateContext(r.context,o,v),m=y.map(function(e){var n=F(e);return n.type===P?function(t,e,n){var r="function"==typeof t.event?R(t.event(e,n)):R(t.event),o="function"==typeof t.delay?t.delay(e,n):t.delay;return i({},t,{event:r,delay:o})}(n,g,o||{type:t.ActionTypes.Init}):F(n,u.options.actions)}),S=c?this.getStateNodes(c):[];S.some(function(t){return t.transient})&&l.push({type:k});var w=a([this],S).reduce(function(t,e){return void 0!==e.meta&&(t[e.id]=e.meta),t},{}),b=c?new N({value:c,context:g,event:o||D,historyValue:h?e.updateHistoryValue(h,c):void 0,history:n.source?r:void 0,actions:m,activities:d,meta:w,events:l,tree:n.tree}):void 0;if(!b)return new N({value:r.value,context:g,event:o,historyValue:r.historyValue,history:r,actions:[],activities:r.activities,meta:r.meta,events:[],tree:r.tree});b.history&&delete b.history.history;for(var x=b.history,E=b;l.length;){var T=E.actions,A=l.shift();(s=(E=this.transition(E,A.type===k?et:A.event,E.context)).actions).unshift.apply(s,a(T))}return E.historyValue=b.historyValue,E.history=x,E},e.updateContext=function(e,n,i){return e?i.reduce(function(e,i){var r=i.assignment,o={};return"function"==typeof r?o=r(e,n||{type:t.ActionTypes.Init}):f(r).forEach(function(t){var i=r[t];o[t]="function"==typeof i?i(e,n):i}),Object.assign({},e,o)},e):e},e.prototype.ensureValidPaths=function(t){var e,n,i=this,r=new Map,s=b(t.map(function(t){return i.getRelativeStateNodes(t)}));try{t:for(var a=o(s),u=a.next();!u.done;u=a.next())for(var c=u.value,h=c;h.parent;){if(r.has(h.parent)){if("parallel"===h.parent.type)continue t;throw new Error("State node '"+c.id+"' shares parent '"+h.parent.id+"' with state node '"+r.get(h.parent).map(function(t){return t.id})+"'")}r.get(h.parent)?r.get(h.parent).push(c):r.set(h.parent,[c]),h=h.parent}}catch(t){e={error:t}}finally{try{u&&!u.done&&(n=a.return)&&n.call(a)}finally{if(e)throw e.error}}},e.prototype.getStateNode=function(t){if(it(t))return this.machine.getStateNodeById(t);if(!this.states)throw new Error("Unable to retrieve child state '"+t+"' from '"+this.id+"'; no child states exist.");var e=this.states[t];if(!e)throw new Error("Child state '"+t+"' does not exist on '"+this.id+"'");return e},e.prototype.getStateNodeById=function(t){var e=it(t)?t.slice("#".length):t;if(e===this.id)return this;var n=this.machine.idMap[e];if(!n)throw new Error("Substate '#"+e+"' does not exist on '"+this.id+"'");return n},e.prototype.getStateNodeByPath=function(t){for(var e=l(t,this.delimiter).slice(),n=this;e.length;){var i=e.shift();n=n.getStateNode(i)}return n},e.prototype.resolve=function(t){var e,n=this;if(!t)return this.initialStateValue||nt;switch(this.type){case"parallel":return g(this.initialStateValue,function(e,i){return e?n.getStateNode(i).resolve(t[i]||e):nt});case"compound":if("string"==typeof t){var i=this.getStateNode(t);return"parallel"===i.type||"compound"===i.type?((e={})[t]=i.initialStateValue,e):t}return f(t).length?g(t,function(t,e){return t?n.getStateNode(e).resolve(t):nt}):this.initialStateValue||{};default:return t||nt}},Object.defineProperty(e.prototype,"resolvedStateValue",{get:function(){var t,e,n=this.key;if("parallel"===this.type)return(t={})[n]=m(this.states,function(t){return t.resolvedStateValue[t.key]},function(t){return!("history"===t.type)}),t;if(void 0===this.initial)return n;if(!this.states[this.initial])throw new Error("Initial state '"+this.initial+"' not found on '"+n+"'");return(e={})[n]=this.states[this.initial].resolvedStateValue,e},enumerable:!0,configurable:!0}),e.prototype.getResolvedPath=function(t){if(it(t)){var e=this.machine.idMap[t.slice("#".length)];if(!e)throw new Error("Unable to find state node '"+t+"'");return e.path}return l(t,this.delimiter)},Object.defineProperty(e.prototype,"initialStateValue",{get:function(){if(this.__cache.initialState)return this.__cache.initialState;var t="parallel"===this.type?m(this.states,function(t){return t.initialStateValue||nt},function(t){return!("history"===t.type)}):"string"==typeof this.resolvedStateValue?void 0:this.resolvedStateValue[this.key];return this.__cache.initialState=t,this.__cache.initialState},enumerable:!0,configurable:!0}),e.prototype.getInitialState=function(t,n){void 0===n&&(n=this.machine.context);var i={},r=[];this.getStateNodes(t).forEach(function(t){t.onEntry&&r.push.apply(r,a(t.onEntry)),t.activities&&t.activities.forEach(function(t){i[d(t)]=!0,r.push(X(t))})});var o=r.filter(function(t){return"object"==typeof t&&t.type===V}),s=e.updateContext(n,void 0,o);return new N({value:t,context:s,event:D,activities:i})},Object.defineProperty(e.prototype,"initialState",{get:function(){var e=this.initialStateValue;if(!e)throw new Error("Cannot retrieve initial state from simple state '"+this.id+"'.");var n=this.getInitialState(e);return this.resolveTransition({tree:this.getStateTree(e),source:void 0,reentryStates:new Set(this.getStateNodes(e)),actions:[]},n,{type:t.ActionTypes.Init})},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"target",{get:function(){var t;if("history"===this.type){var e=this.config;t=e.target&&"string"==typeof e.target&&it(e.target)?v(this.machine.getStateNodeById(e.target).path.slice(this.path.length-1)):e.target}return t},enumerable:!0,configurable:!0}),e.prototype.getStates=function(t){var e=this;if("string"==typeof t)return[this.states[t]];var n=[];return f(t).forEach(function(i){n.push.apply(n,a(e.states[i].getStates(t[i])))}),n},e.prototype.getRelativeStateNodes=function(t,e,n){if(void 0===n&&(n=!0),"string"==typeof t&&it(t)){var i=this.getStateNodeById(t);return n?"history"===i.type?i.resolveHistory(e):i.initialStateNodes:[i]}var r=l(t,this.delimiter),o=(this.parent||this).getFromRelativePath(r,e);return n?b(o.map(function(t){return t.initialStateNodes})):o},Object.defineProperty(e.prototype,"initialStateNodes",{get:function(){var t=this;return"atomic"===this.type||"final"===this.type?[this]:"compound"!==this.type||this.initial?b(w(this.initialStateValue).map(function(e){return t.getFromRelativePath(e)})):(ot||console.warn("Compound state node '"+this.id+"' has no initial state."),[this])},enumerable:!0,configurable:!0}),e.prototype.getFromRelativePath=function(t,e){if(!t.length)return[this];var n=s(t),i=n[0],r=n.slice(1);if(!this.states)throw new Error("Cannot retrieve subPath '"+i+"' from node with no states");var o=this.getStateNode(i);if("history"===o.type)return o.resolveHistory(e);if(!this.states[i])throw new Error("Child state '"+i+"' does not exist on '"+this.id+"'");return this.states[i].getFromRelativePath(r,e)},e.updateHistoryStates=function(t,n){return g(t.states,function(t,i){if(t){var r=("string"==typeof n?void 0:n[i])||(t?t.current:void 0);if(r)return{current:r,states:e.updateHistoryStates(t,r)}}})},e.updateHistoryValue=function(t,n){return{current:n,states:e.updateHistoryStates(t,n)}},e.prototype.historyValue=function(t){if(f(this.states).length)return{current:t||this.initialStateValue,states:m(this.states,function(e,n){if(!t)return e.historyValue();var i="string"==typeof t?void 0:t[n];return e.historyValue(i||e.initialStateValue)},function(t){return!t.history})}},e.prototype.resolveHistory=function(t){var e=this;if("history"!==this.type)return[this];var n=this.parent;if(!t)return this.target?b(w(this.target).map(function(t){return n.getFromRelativePath(t)})):n.initialStateNodes;var i,r,s=(i=n.path,r="states",function(t){var e,n,s=t;try{for(var a=o(i),u=a.next();!u.done;u=a.next()){var c=u.value;s=s[r][c]}}catch(t){e={error:t}}finally{try{u&&!u.done&&(n=a.return)&&n.call(a)}finally{if(e)throw e.error}}return s})(t).current;return"string"==typeof s?[n.getStateNode(s)]:b(w(s).map(function(t){return"deep"===e.history?n.getFromRelativePath(t):[n.states[t[0]]]}))},Object.defineProperty(e.prototype,"stateIds",{get:function(){var t=this,e=b(f(this.states).map(function(e){return t.states[e].stateIds}));return[this.id].concat(e)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"events",{get:function(){if(this.__cache.events)return this.__cache.events;var t=this.states,e=new Set(this.ownEvents);return t&&f(t).forEach(function(n){var i,r,s=t[n];if(s.states)try{for(var a=o(s.events),u=a.next();!u.done;u=a.next()){var c=u.value;e.add(""+c)}}catch(t){i={error:t}}finally{try{u&&!u.done&&(r=a.return)&&r.call(a)}finally{if(i)throw i.error}}}),this.__cache.events=Array.from(e)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"ownEvents",{get:function(){var t=this,e=new Set(f(this.on).filter(function(e){return t.on[e].some(function(t){return!(!t.target&&!t.actions.length&&t.internal)})}));return Array.from(e)},enumerable:!0,configurable:!0}),e.prototype.formatTransition=function(t,n,r){var o=this,s=!!n&&n.internal;if(void 0===t||""===t)return i({},n,{actions:n?x(n.actions).map(function(t){return F(t)}):[],target:void 0,internal:!n||(void 0===n.internal||n.internal),event:r});var a=x(t).map(function(t){if(t instanceof e)return"#"+t.id;var n="string"==typeof t&&t[0]===o.delimiter;return s=s||n,n&&!o.parent?t.slice(1):n?o.key+t:""+t});return i({},n,{actions:n?x(n.actions).map(function(t){return F(t)}):[],target:a,internal:s,event:r})},e.prototype.formatTransitions=function(){var t,n=this,r=this.config.on||nt,o=this.config.onDone?((t={})[""+K(this.id)]=this.config.onDone,t):void 0,s=this.invoke.reduce(function(t,e){return e.onDone&&(t[W(e.id)]=e.onDone),e.onError&&(t[I]=e.onError),t},{}),a=this.after,u=g(i({},r,o,s),function(t,i){return void 0===t?[{target:void 0,event:i,actions:[],internal:!0}]:Array.isArray(t)?t.map(function(t){return n.formatTransition(t.target,t,i)}):"string"==typeof t||t instanceof e?[n.formatTransition([t],void 0,i)]:(ot||f(t).forEach(function(t){if(-1===["target","actions","internal","in","cond","event"].indexOf(t))throw new Error("State object mapping of transitions is deprecated. Check the config for event '"+i+"' on state '"+n.id+"'.")}),[n.formatTransition(t.target,t,i)])});return a.forEach(function(t){u[t.event]=u[t.event]||[],u[t.event].push(t)}),u},e}();var at=function(){function e(n,r){void 0===r&&(r=e.defaultOptions);var o=this;this.machine=n,this.eventQueue=[],this.delayedEventsMap={},this.listeners=new Set,this.contextListeners=new Set,this.stopListeners=new Set,this.doneListeners=new Set,this.eventListeners=new Set,this.sendListeners=new Set,this.initialized=!1,this.children=new Map,this.forwardTo=new Set,this.init=this.start,this.send=function(t){var e=R(t),n=o.nextState(e);return o.update(n,t),o.forward(e),n},this.sender=function(t){return function(){return this.send(t)}.bind(o)},this.sendTo=function(e,n){var i=n===t.SpecialTargets.Parent,r=i?o.parent:o.children.get(n);if(r)setTimeout(function(){r.send(e)});else{if(!i)throw new Error("Unable to send event to child '"+n+"' from service '"+o.id+"'.");console.warn("Service '"+o.id+"' has no parent: unable to send event "+e.type)}};var s=i({},e.defaultOptions,r),a=s.clock,u=s.logger,c=s.parent,h=s.id,f=void 0!==h?h:n.id;Object.assign(this,{clock:a,logger:u,parent:c,id:f}),this.options=s}return Object.defineProperty(e.prototype,"initialState",{get:function(){return this.machine.initialState},enumerable:!0,configurable:!0}),e.prototype.execute=function(t){var e=this;t.actions.forEach(function(n){e.exec(n,t.context,t.event)})},e.prototype.update=function(t,e){var n=this;if(this.state=t,this.options.execute&&this.execute(this.state),this.devTools&&this.devTools.send(e,t),t.event&&this.eventListeners.forEach(function(e){return e(t.event)}),this.listeners.forEach(function(e){return e(t,t.event)}),this.contextListeners.forEach(function(t){return t(n.state.context,n.state.history?n.state.history.context:void 0)}),this.state.tree&&this.state.tree.done){var i=this.state.tree.getDoneData(this.state.context,R(e));this.doneListeners.forEach(function(t){return t(W(n.id,i))}),this.stop()}this.flushEventQueue()},e.prototype.onTransition=function(t){return this.listeners.add(t),this},e.prototype.onEvent=function(t){return this.eventListeners.add(t),this},e.prototype.onSend=function(t){return this.sendListeners.add(t),this},e.prototype.onChange=function(t){return this.contextListeners.add(t),this},e.prototype.onStop=function(t){return this.stopListeners.add(t),this},e.prototype.onDone=function(t){return this.doneListeners.add(t),this},e.prototype.off=function(t){return this.listeners.delete(t),this.eventListeners.delete(t),this.sendListeners.delete(t),this.stopListeners.delete(t),this.doneListeners.delete(t),this.contextListeners.delete(t),this},e.prototype.start=function(t){return void 0===t&&(t=this.machine.initialState),this.initialized=!0,this.options.devTools&&this.attachDev(),this.update(t,{type:L}),this},e.prototype.stop=function(){var t=this;return this.listeners.forEach(function(e){return t.listeners.delete(e)}),this.stopListeners.forEach(function(e){e(),t.stopListeners.delete(e)}),this.contextListeners.forEach(function(e){return t.contextListeners.delete(e)}),this.doneListeners.forEach(function(e){return t.doneListeners.delete(e)}),this.children.forEach(function(t){"function"==typeof t.stop&&t.stop()}),this.initialized=!1,this},e.prototype.nextState=function(t){var e=R(t);if(!this.initialized)throw new Error('Unable to send event "'+e.type+'" to an uninitialized service (ID: '+this.machine.id+"). Make sure .start() is called for this service.\nEvent: "+JSON.stringify(t));if(e.type===I&&-1===this.state.nextEvents.indexOf(I))throw e.data;return this.machine.transition(this.state,e,this.state.context)},e.prototype.forward=function(t){var e=this;this.forwardTo.forEach(function(n){var i=e.children.get(n);if(!i)throw new Error("Unable to forward event '"+t+"' from interpreter '"+e.id+"' to nonexistant child '"+n+"'.");i.send(t)})},e.prototype.defer=function(t){var e=this;return this.clock.setTimeout(function(){t.to?e.sendTo(t.event,t.to):e.send(t.event)},t.delay||0)},e.prototype.cancel=function(t){this.clock.clearTimeout(this.delayedEventsMap[t]),delete this.delayedEventsMap[t]},e.prototype.exec=function(e,n,i){if(e.exec)return e.exec(n,i,{action:e});switch(e.type){case P:var r=e;if(r.delay)return void(this.delayedEventsMap[r.id]=this.defer(r));r.to?this.sendTo(r.event,r.to):this.eventQueue.push(r.event);break;case j:this.cancel(e.sendId);break;case T:var o=e.activity;if(o.type===t.ActionTypes.Invoke){var s=this.machine.options.services?this.machine.options.services[o.src]:void 0,a=o.id,u=o.data,c=!!o.forward;if(!s)return void console.warn("No service found for invocation '"+o.src+"' in machine '"+this.machine.id+"'.");var h="function"==typeof s?s(n,i):s;h instanceof Promise?this.spawnPromise(a,h):"function"==typeof h?this.spawnCallback(a,h):"string"!=typeof h&&this.spawn(u?h.withContext(E(u,n,i)):h,{id:a,autoForward:c})}else{var f=this.machine.options&&this.machine.options.activities?this.machine.options.activities[o.type]:void 0;if(!f)return void console.warn("No implementation found for activity '"+o.type+"'");var p=f(n,o);this.spawnEffect(o.id,p)}break;case A:this.stopChild(e.activity.id);break;case _:var d=e.expr?e.expr(n,i):void 0;e.label?this.logger(e.label,d):this.logger(d);break;default:console.warn("No implementation found for action type '"+e.type+"'")}},e.prototype.stopChild=function(t){var e=this.children.get(t);e&&"function"==typeof e.stop&&(e.stop(),this.children.delete(t),this.forwardTo.delete(t))},e.prototype.spawn=function(t,n){var i=this;void 0===n&&(n={});var r=new e(t,{parent:this,id:n.id||t.id});return r.onDone(function(t){i.send(t)}).start(),this.children.set(r.id,r),n.autoForward&&this.forwardTo.add(r.id),r},e.prototype.spawnPromise=function(t,e){var n=this,i=!1;e.then(function(e){i||n.send(W(t,e))}).catch(function(e){n.send(Y(e,t))}),this.children.set(t,{send:function(){},stop:function(){i=!0}})},e.prototype.spawnCallback=function(t,e){var n,i=this,r=function(e){ot||console.warn("Event '"+e.type+"' sent to callback service '"+t+"' but was not handled by a listener.")};try{(n=e(function(t){return i.send(t)},function(t){r=t}))instanceof Promise&&n.catch(function(e){return i.send(Y(e,t))})}catch(e){this.send(Y(e,t))}this.children.set(t,{send:r,stop:n})},e.prototype.spawnEffect=function(t,e){this.children.set(t,{send:function(){},stop:e})},e.prototype.flushEventQueue=function(){var t=this.eventQueue.shift();t&&this.send(t)},e.prototype.attachDev=function(){this.options.devTools&&"undefined"!=typeof window&&window.__REDUX_DEVTOOLS_EXTENSION__&&(this.devTools=window.__REDUX_DEVTOOLS_EXTENSION__.connect({name:this.id,features:{jump:!1,skip:!1}}),this.devTools.init(this.state))},e.defaultOptions=function(t){return{execute:!0,clock:{setTimeout:function(e,n){return t.setTimeout.call(null,e,n)},clearTimeout:function(e){return t.clearTimeout.call(null,e)}},logger:t.console.log.bind(console),devTools:!0}}("undefined"==typeof window?global:window),e.interpret=ut,e}();function ut(t,e){return new at(t,e)}var ct={raise:U,send:z,sendParent:B,log:function(t,e){return void 0===t&&(t=function(t,e){return{context:t,event:e}}),{type:_,label:e,expr:t}},cancel:Q,start:X,stop:G,assign:J,after:q,done:K};t.Machine=function(t,e,n){return void 0===n&&(n=t.context),new st(t,e,n)},t.StateNode=st,t.State=N,t.matchesState=p,t.mapState=function(t,e){var n;return f(t).forEach(function(t){p(t,e)&&(!n||e.length>n.length)&&(n=t)}),t[n]},t.actions=ct,t.assign=J,t.send=z,t.sendParent=B,t.interpret=ut,Object.defineProperty(t,"__esModule",{value:!0})});