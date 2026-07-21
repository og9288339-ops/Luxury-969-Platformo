import{A as t,D as n,M as r,x as o,B as e,a as s,f as c,F as a,c as u}from"./createLucideIcon-C5HK8XQ-.js";import{r as i}from"./router-vendor-Ce71gl-f.js";function f(o){const e=t(()=>n(o)),{isStatic:s}=i.useContext(r);if(s){const[,t]=i.useState(o);i.useEffect(()=>e.on("change",t),[])}return e}function p(t,n){const r=f(n()),o=()=>r.set(n());return o(),e(()=>{const n=()=>c.update(o,!1,!0),r=t.map(t=>t.on("change",n));return()=>{r.forEach(t=>t()),s(o)}}),r}function y(t,n,r,e){if("function"==typeof t)return function(t){a.current=[],t();const n=p(a.current,t);return a.current=void 0,n}(t);const s="function"==typeof n?n:function(...t){const n=!Array.isArray(t[0]),r=n?0:-1,e=t[0+r],s=t[1+r],c=t[2+r],a=t[3+r],u=o(s,c,{mixer:(i=c[0],(t=>t&&"object"==typeof t&&t.mix)(i)?i.mix:void 0),...a});var i;return n?u(e):u}(n,r,e);return Array.isArray(t)?m(t,s):m([t],([t])=>s(t))}function m(n,r){const o=t(()=>[]);return p(n,()=>{o.length=0;const t=n.length;for(let r=0;r<t;r++)o[r]=n[r].get();return r(o)})}
/**
 * @license lucide-react v0.300.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=u("Zap",[["polygon",{points:"13 2 3 14 12 14 11 22 21 10 12 10 13 2",key:"45s27k"}]]);export{g as Z,f as a,y as u};
