import{i as e,n as t,t as n}from"./timberPkComponents-04gl55Zt.js";var r=globalThis,i=r.ShadowRoot&&(r.ShadyCSS===void 0||r.ShadyCSS.nativeShadow)&&`adoptedStyleSheets`in Document.prototype&&`replace`in CSSStyleSheet.prototype,a=Symbol(),o=new WeakMap,s=class{constructor(e,t,n){if(this._$cssResult$=!0,n!==a)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(i&&e===void 0){let n=t!==void 0&&t.length===1;n&&(e=o.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),n&&o.set(t,e))}return e}toString(){return this.cssText}},c=e=>new s(typeof e==`string`?e:e+``,void 0,a),l=(e,...t)=>new s(e.length===1?e[0]:t.reduce((t,n,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if(typeof e==`number`)return e;throw Error(`Value passed to 'css' function must be a 'css' function result: `+e+`. Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.`)})(n)+e[r+1],e[0]),e,a),u=(e,t)=>{if(i)e.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let n of t){let t=document.createElement(`style`),i=r.litNonce;i!==void 0&&t.setAttribute(`nonce`,i),t.textContent=n.cssText,e.appendChild(t)}},d=i?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t=``;for(let n of e.cssRules)t+=n.cssText;return c(t)})(e):e,{is:f,defineProperty:p,getOwnPropertyDescriptor:m,getOwnPropertyNames:h,getOwnPropertySymbols:g,getPrototypeOf:_}=Object,v=globalThis,y=v.trustedTypes,b=y?y.emptyScript:``,x=v.reactiveElementPolyfillSupport,S=(e,t)=>e,C={toAttribute(e,t){switch(t){case Boolean:e=e?b:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=e!==null;break;case Number:n=e===null?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch{n=null}}return n}},w=(e,t)=>!f(e,t),T={attribute:!0,type:String,converter:C,reflect:!1,useDefault:!1,hasChanged:w};Symbol.metadata??=Symbol(`metadata`),v.litPropertyMetadata??=new WeakMap;var E=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=T){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let n=Symbol(),r=this.getPropertyDescriptor(e,n,t);r!==void 0&&p(this.prototype,e,r)}}static getPropertyDescriptor(e,t,n){let{get:r,set:i}=m(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:r,set(t){let a=r?.call(this);i?.call(this,t),this.requestUpdate(e,a,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??T}static _$Ei(){if(this.hasOwnProperty(S(`elementProperties`)))return;let e=_(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(S(`finalized`)))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(S(`properties`))){let e=this.properties,t=[...h(e),...g(e)];for(let n of t)this.createProperty(n,e[n])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[e,n]of t)this.elementProperties.set(e,n)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let n=this._$Eu(e,t);n!==void 0&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let n=new Set(e.flat(1/0).reverse());for(let e of n)t.unshift(d(e))}else e!==void 0&&t.push(d(e));return t}static _$Eu(e,t){let n=t.attribute;return!1===n?void 0:typeof n==`string`?n:typeof e==`string`?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let n of t.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return u(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,n){this._$AK(e,n)}_$ET(e,t){let n=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,n);if(r!==void 0&&!0===n.reflect){let i=(n.converter?.toAttribute===void 0?C:n.converter).toAttribute(t,n.type);this._$Em=e,i==null?this.removeAttribute(r):this.setAttribute(r,i),this._$Em=null}}_$AK(e,t){let n=this.constructor,r=n._$Eh.get(e);if(r!==void 0&&this._$Em!==r){let e=n.getPropertyOptions(r),i=typeof e.converter==`function`?{fromAttribute:e.converter}:e.converter?.fromAttribute===void 0?C:e.converter;this._$Em=r;let a=i.fromAttribute(t,e.type);this[r]=a??this._$Ej?.get(r)??a,this._$Em=null}}requestUpdate(e,t,n,r=!1,i){if(e!==void 0){let a=this.constructor;if(!1===r&&(i=this[e]),n??=a.getPropertyOptions(e),!((n.hasChanged??w)(i,t)||n.useDefault&&n.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(a._$Eu(e,n))))return;this.C(e,t,n)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:n,reflect:r,wrapped:i},a){n&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,a??t??this[e]),!0!==i||a!==void 0)||(this._$AL.has(e)||(this.hasUpdated||n||(t=void 0),this._$AL.set(e,t)),!0===r&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}let e=this.constructor.elementProperties;if(e.size>0)for(let[t,n]of e){let{wrapped:e}=n,r=this[t];!0!==e||this._$AL.has(t)||r===void 0||this.C(t,void 0,n,r)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};E.elementStyles=[],E.shadowRootOptions={mode:`open`},E[S(`elementProperties`)]=new Map,E[S(`finalized`)]=new Map,x?.({ReactiveElement:E}),(v.reactiveElementVersions??=[]).push(`2.1.2`);var ee=globalThis,te=e=>e,D=ee.trustedTypes,ne=D?D.createPolicy(`lit-html`,{createHTML:e=>e}):void 0,re=`$lit$`,O=`lit$${Math.random().toFixed(9).slice(2)}$`,ie=`?`+O,ae=`<${ie}>`,oe=document,se=()=>oe.createComment(``),ce=e=>e===null||typeof e!=`object`&&typeof e!=`function`,le=Array.isArray,ue=e=>le(e)||typeof e?.[Symbol.iterator]==`function`,de=`[ 	
\f\r]`,fe=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,pe=/-->/g,me=/>/g,he=RegExp(`>|${de}(?:([^\\s"'>=/]+)(${de}*=${de}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,`g`),ge=/'/g,_e=/"/g,ve=/^(?:script|style|textarea|title)$/i,k=(e=>(t,...n)=>({_$litType$:e,strings:t,values:n}))(1),A=Symbol.for(`lit-noChange`),j=Symbol.for(`lit-nothing`),ye=new WeakMap,be=oe.createTreeWalker(oe,129);function xe(e,t){if(!le(e)||!e.hasOwnProperty(`raw`))throw Error(`invalid template strings array`);return ne===void 0?t:ne.createHTML(t)}var Se=(e,t)=>{let n=e.length-1,r=[],i,a=t===2?`<svg>`:t===3?`<math>`:``,o=fe;for(let t=0;t<n;t++){let n=e[t],s,c,l=-1,u=0;for(;u<n.length&&(o.lastIndex=u,c=o.exec(n),c!==null);)u=o.lastIndex,o===fe?c[1]===`!--`?o=pe:c[1]===void 0?c[2]===void 0?c[3]!==void 0&&(o=he):(ve.test(c[2])&&(i=RegExp(`</`+c[2],`g`)),o=he):o=me:o===he?c[0]===`>`?(o=i??fe,l=-1):c[1]===void 0?l=-2:(l=o.lastIndex-c[2].length,s=c[1],o=c[3]===void 0?he:c[3]===`"`?_e:ge):o===_e||o===ge?o=he:o===pe||o===me?o=fe:(o=he,i=void 0);let d=o===he&&e[t+1].startsWith(`/>`)?` `:``;a+=o===fe?n+ae:l>=0?(r.push(s),n.slice(0,l)+re+n.slice(l)+O+d):n+O+(l===-2?t:d)}return[xe(e,a+(e[n]||`<?>`)+(t===2?`</svg>`:t===3?`</math>`:``)),r]},Ce=class e{constructor({strings:t,_$litType$:n},r){let i;this.parts=[];let a=0,o=0,s=t.length-1,c=this.parts,[l,u]=Se(t,n);if(this.el=e.createElement(l,r),be.currentNode=this.el.content,n===2||n===3){let e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;(i=be.nextNode())!==null&&c.length<s;){if(i.nodeType===1){if(i.hasAttributes())for(let e of i.getAttributeNames())if(e.endsWith(re)){let t=u[o++],n=i.getAttribute(e).split(O),r=/([.?@])?(.*)/.exec(t);c.push({type:1,index:a,name:r[2],strings:n,ctor:r[1]===`.`?Oe:r[1]===`?`?ke:r[1]===`@`?Ae:De}),i.removeAttribute(e)}else e.startsWith(O)&&(c.push({type:6,index:a}),i.removeAttribute(e));if(ve.test(i.tagName)){let e=i.textContent.split(O),t=e.length-1;if(t>0){i.textContent=D?D.emptyScript:``;for(let n=0;n<t;n++)i.append(e[n],se()),be.nextNode(),c.push({type:2,index:++a});i.append(e[t],se())}}}else if(i.nodeType===8)if(i.data===ie)c.push({type:2,index:a});else{let e=-1;for(;(e=i.data.indexOf(O,e+1))!==-1;)c.push({type:7,index:a}),e+=O.length-1}a++}}static createElement(e,t){let n=oe.createElement(`template`);return n.innerHTML=e,n}};function we(e,t,n=e,r){if(t===A)return t;let i=r===void 0?n._$Cl:n._$Co?.[r],a=ce(t)?void 0:t._$litDirective$;return i?.constructor!==a&&(i?._$AO?.(!1),a===void 0?i=void 0:(i=new a(e),i._$AT(e,n,r)),r===void 0?n._$Cl=i:(n._$Co??=[])[r]=i),i!==void 0&&(t=we(e,i._$AS(e,t.values),i,r)),t}var Te=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:n}=this._$AD,r=(e?.creationScope??oe).importNode(t,!0);be.currentNode=r;let i=be.nextNode(),a=0,o=0,s=n[0];for(;s!==void 0;){if(a===s.index){let t;s.type===2?t=new Ee(i,i.nextSibling,this,e):s.type===1?t=new s.ctor(i,s.name,s.strings,this,e):s.type===6&&(t=new je(i,this,e)),this._$AV.push(t),s=n[++o]}a!==s?.index&&(i=be.nextNode(),a++)}return be.currentNode=oe,r}p(e){let t=0;for(let n of this._$AV)n!==void 0&&(n.strings===void 0?n._$AI(e[t]):(n._$AI(e,n,t),t+=n.strings.length-2)),t++}},Ee=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,r){this.type=2,this._$AH=j,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=we(this,e,t),ce(e)?e===j||e==null||e===``?(this._$AH!==j&&this._$AR(),this._$AH=j):e!==this._$AH&&e!==A&&this._(e):e._$litType$===void 0?e.nodeType===void 0?ue(e)?this.k(e):this._(e):this.T(e):this.$(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==j&&ce(this._$AH)?this._$AA.nextSibling.data=e:this.T(oe.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:n}=e,r=typeof n==`number`?this._$AC(e):(n.el===void 0&&(n.el=Ce.createElement(xe(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===r)this._$AH.p(t);else{let e=new Te(r,this),n=e.u(this.options);e.p(t),this.T(n),this._$AH=e}}_$AC(e){let t=ye.get(e.strings);return t===void 0&&ye.set(e.strings,t=new Ce(e)),t}k(t){le(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,i=0;for(let a of t)i===n.length?n.push(r=new e(this.O(se()),this.O(se()),this,this.options)):r=n[i],r._$AI(a),i++;i<n.length&&(this._$AR(r&&r._$AB.nextSibling,i),n.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let t=te(e).nextSibling;te(e).remove(),e=t}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},De=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,r,i){this.type=1,this._$AH=j,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=i,n.length>2||n[0]!==``||n[1]!==``?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=j}_$AI(e,t=this,n,r){let i=this.strings,a=!1;if(i===void 0)e=we(this,e,t,0),a=!ce(e)||e!==this._$AH&&e!==A,a&&(this._$AH=e);else{let r=e,o,s;for(e=i[0],o=0;o<i.length-1;o++)s=we(this,r[n+o],t,o),s===A&&(s=this._$AH[o]),a||=!ce(s)||s!==this._$AH[o],s===j?e=j:e!==j&&(e+=(s??``)+i[o+1]),this._$AH[o]=s}a&&!r&&this.j(e)}j(e){e===j?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??``)}},Oe=class extends De{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===j?void 0:e}},ke=class extends De{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==j)}},Ae=class extends De{constructor(e,t,n,r,i){super(e,t,n,r,i),this.type=5}_$AI(e,t=this){if((e=we(this,e,t,0)??j)===A)return;let n=this._$AH,r=e===j&&n!==j||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,i=e!==j&&(n===j||r);r&&this.element.removeEventListener(this.name,this,n),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH==`function`?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},je=class{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){we(this,e)}},Me={M:re,P:O,A:ie,C:1,L:Se,R:Te,D:ue,V:we,I:Ee,H:De,N:ke,U:Ae,B:Oe,F:je},Ne=ee.litHtmlPolyfillSupport;Ne?.(Ce,Ee),(ee.litHtmlVersions??=[]).push(`3.3.3`);var Pe=(e,t,n)=>{let r=n?.renderBefore??t,i=r._$litPart$;if(i===void 0){let e=n?.renderBefore??null;r._$litPart$=i=new Ee(t.insertBefore(se(),e),e,void 0,n??{})}return i._$AI(e),i},Fe=globalThis,Ie=class extends E{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Pe(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return A}};Ie._$litElement$=!0,Ie.finalized=!0,Fe.litElementHydrateSupport?.({LitElement:Ie});var Le=Fe.litElementPolyfillSupport;Le?.({LitElement:Ie}),(Fe.litElementVersions??=[]).push(`4.2.2`);var Re=new Map;function ze(e,t,n){let r=t.flatMap(e=>Array.isArray(e)?e:[e]).map(e=>`cssText`in e&&typeof e.cssText==`string`?e.cssText:c(e).cssText).join(`
`);if(!(`adoptedStyleSheets`in Document.prototype)||typeof CSSStyleSheet>`u`){let i=n??String(t.length);if(!e.querySelector(`style[data-pk-adopted-styles="${i}"]`)){let t=document.createElement(`style`);t.dataset.pkAdoptedStyles=i,t.textContent=r,e.prepend(t)}return}let i=n??r,a=Re.get(i);a||(a=new CSSStyleSheet,a.replaceSync(r),Re.set(i,a)),e.adoptedStyleSheets=[...e.adoptedStyleSheets,a]}var Be=l`
    @layer pk-component {
        :host {
            display: inline-block;
            vertical-align: middle;
        }
    }
`;l`
    .pk-focus-ring:focus {
        outline: none;
    }

    .pk-focus-ring:focus-visible {
        box-shadow: var(--pk-shadow-focus);
    }
`;var Ve=l`
    @layer pk-reset {
        :host {
            box-sizing: border-box;
        }

        :host *,
        :host *::before,
        :host *::after {
            box-sizing: border-box;
        }

        :host(:not([hidden])) {
            /* Prevent UA / CP margin on unstyled custom element hosts in light DOM. */
            margin: 0;
        }
    }
`,M=class extends Ie{constructor(...e){super(...e),this.pkRenderFailed=!1}static{this.shadowRootOptions={mode:`open`,delegatesFocus:!0}}connectedCallback(){super.connectedCallback(),this.hasAttribute(`data-pk`)||this.setAttribute(`data-pk`,``)}createRenderRoot(){let e=super.createRenderRoot();return ze(e,[Ve],`pk-shadow-reset`),e}performUpdate(){if(!this.pkRenderFailed)try{let e=super.performUpdate();e instanceof Promise&&e.catch(e=>{this.handleRenderFailure(e)})}catch(e){this.handleRenderFailure(e)}}handleRenderFailure(e){let t=e instanceof Error?e:Error(String(e));this.pkRenderFailed=!0,this.dispatchEvent(new CustomEvent(`pk-error`,{detail:{tagName:this.localName||this.tagName.toLowerCase(),message:t.message,stack:t.stack},bubbles:!0,composed:!0}));try{let e=this.renderRoot;if(e){e.textContent=``;let t=document.createElement(`div`);t.setAttribute(`part`,`error`),t.setAttribute(`role`,`alert`),t.textContent=`This control failed to load.`,e.appendChild(t)}}catch{}}};function N(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a}function He(e=`default`){return e===`xxs`||e===`xs`?`xxs`:e===`lg`||e===`xl`?`sm`:`xs`}function Ue(e=`default`,t){return t||(e===`primary`||e===`secondary`||e===`dashed`||e===`outline`||e===`transparent`?e:`default`)}var P=e=>(t,n)=>{n===void 0?customElements.define(e,t):n.addInitializer(()=>{customElements.define(e,t)})},We={attribute:!0,type:String,converter:C,reflect:!1,hasChanged:w},Ge=(e=We,t,n)=>{let{kind:r,metadata:i}=n,a=globalThis.litPropertyMetadata.get(i);if(a===void 0&&globalThis.litPropertyMetadata.set(i,a=new Map),r===`setter`&&((e=Object.create(e)).wrapped=!0),a.set(n.name,e),r===`accessor`){let{name:r}=n;return{set(n){let i=t.get.call(this);t.set.call(this,n),this.requestUpdate(r,i,e,!0,n)},init(t){return t!==void 0&&this.C(r,void 0,e,t),t}}}if(r===`setter`){let{name:r}=n;return function(n){let i=this[r];t.call(this,n),this.requestUpdate(r,i,e,!0,n)}}throw Error(`Unsupported decorator location: `+r)};function F(e){return(t,n)=>typeof n==`object`?Ge(e,t,n):((e,t,n)=>{let r=t.hasOwnProperty(n);return t.constructor.createProperty(n,e),r?Object.getOwnPropertyDescriptor(t,n):void 0})(e,t,n)}function I(e){return F({...e,state:!0,attribute:!1})}var Ke=(e,t,n)=>(n.configurable=!0,n.enumerable=!0,Reflect.decorate&&typeof t!=`object`&&Object.defineProperty(e,t,n),n);function L(e,t){return(n,r,i)=>{let a=t=>t.renderRoot?.querySelector(e)??null;if(t){let{get:e,set:t}=typeof r==`object`?n:i??(()=>{let e=Symbol();return{get(){return this[e]},set(t){this[e]=t}}})();return Ke(n,r,{get(){let n=e.call(this);return n===void 0&&(n=a(this),(n!==null||this.hasUpdated)&&t.call(this,n)),n}})}return Ke(n,r,{get(){return a(this)}})}}var qe=[Be,l`
        @layer pk-component {
            :host {
                display: block;
                box-sizing: border-box;
            }

            :host([centered]) {
                position: absolute;
                top: 50%;
                left: 50%;
                display: block;
                width: fit-content;
                height: fit-content;
                margin: 0;
                transform: translate(-50%, -50%);
            }

            .spinner {
                display: block;
                box-sizing: border-box;
                margin-inline: auto;
                border-style: solid;
                border-bottom-color: transparent;
                border-left-color: transparent;
                border-radius: 50%;
                animation: pk-spinner-spin 0.5s linear infinite;
            }

            /* Sizes */
            :host([size='xxs']) .spinner {
                width: 0.75rem;
                height: 0.75rem;
                border-width: 1px;
            }

            :host([size='xs']) .spinner {
                width: 1rem;
                height: 1rem;
                border-width: 2px;
            }

            :host([size='sm']) .spinner,
            :host(:not([size])) .spinner {
                width: 1.5rem;
                height: 1.5rem;
                border-width: 2px;
            }

            :host([size='md']) .spinner {
                width: 2rem;
                height: 2rem;
                border-width: 2px;
            }

            :host([size='lg']) .spinner {
                width: 3rem;
                height: 3rem;
                border-width: 2px;
            }

            :host([size='xl']) .spinner {
                width: 4rem;
                height: 4rem;
                border-width: 2px;
            }

            /* Variants — matched to button loading contrast */
            :host([variant='default']:not([tone])) .spinner {
                border-top-color: var(--pk-color-red-500);
                border-right-color: var(--pk-color-red-500);
            }

            :host([variant='primary']:not([tone])) .spinner,
            :host([variant='secondary']:not([tone])) .spinner {
                border-top-color: var(--pk-color-white);
                border-right-color: var(--pk-color-white);
            }

            :host([variant='dashed']:not([tone])) .spinner,
            :host([variant='outline']:not([tone])) .spinner,
            :host([variant='transparent']:not([tone])) .spinner {
                border-top-color: var(--pk-color-gray-700);
                border-right-color: var(--pk-color-gray-700);
            }

            /* Standalone tone overrides */
            :host([tone='sky']) .spinner {
                border-top-color: var(--pk-color-sky-600);
                border-right-color: var(--pk-color-sky-600);
            }

            :host([tone='emerald']) .spinner {
                border-top-color: var(--pk-color-emerald-600);
                border-right-color: var(--pk-color-emerald-600);
            }

            :host([tone='violet']) .spinner {
                border-top-color: var(--pk-color-violet-600);
                border-right-color: var(--pk-color-violet-600);
            }

            :host([tone='amber']) .spinner {
                border-top-color: var(--pk-color-amber-500);
                border-right-color: var(--pk-color-amber-500);
            }

            @keyframes pk-spinner-spin {
                to {
                    transform: rotate(360deg);
                }
            }
        }
    `],Je=class extends M{constructor(...e){super(...e),this.variant=`default`,this.size=`sm`,this.centered=!1}static{this.styles=qe}render(){return k`
            <div part="base" class="spinner" aria-hidden="true"></div>
        `}};N([F({reflect:!0})],Je.prototype,`variant`,void 0),N([F({reflect:!0})],Je.prototype,`size`,void 0),N([F({reflect:!0})],Je.prototype,`tone`,void 0),N([F({type:Boolean,reflect:!0})],Je.prototype,`centered`,void 0),Je=N([P(`pk-spinner`)],Je);var Ye=l`
    @layer pk-component {
        slot[name='start']::slotted(svg),
        slot[name='end']::slotted(svg) {
            display: block;
            width: 1em;
            height: 1em;
            flex-shrink: 0;
            pointer-events: none;
            vertical-align: middle;
            overflow: visible;
        }
    }
`;function Xe(e,t=`var(--pk-btn-radius, var(--pk-radius-lg))`){let n=c(e),r=c(t);return l`
        ${n} {
            border-top-left-radius: var(--pk-bg-start-start-radius, ${r});
            border-top-right-radius: var(--pk-bg-start-end-radius, ${r});
            border-bottom-left-radius: var(--pk-bg-end-start-radius, ${r});
            border-bottom-right-radius: var(--pk-bg-end-end-radius, ${r});
        }
    `}function Ze(){return l`
        :host([data-pk-group-orientation='horizontal']:not([data-pk-group-item-first]):not([data-pk-group-item-last])) {
            --pk-bg-start-start-radius: 0;
            --pk-bg-start-end-radius: 0;
            --pk-bg-end-start-radius: 0;
            --pk-bg-end-end-radius: 0;
        }

        :host([data-pk-group-orientation='horizontal'][data-pk-group-item-first]:not([data-pk-group-item-last])) {
            --pk-bg-start-end-radius: 0;
            --pk-bg-end-end-radius: 0;
        }

        :host([data-pk-group-orientation='horizontal'][data-pk-group-item-last]:not([data-pk-group-item-first])) {
            --pk-bg-start-start-radius: 0;
            --pk-bg-end-start-radius: 0;
        }

        :host([data-pk-group-orientation='vertical']:not([data-pk-group-item-first]):not([data-pk-group-item-last])) {
            --pk-bg-start-start-radius: 0;
            --pk-bg-start-end-radius: 0;
            --pk-bg-end-start-radius: 0;
            --pk-bg-end-end-radius: 0;
        }

        :host([data-pk-group-orientation='vertical'][data-pk-group-item-first]:not([data-pk-group-item-last])) {
            --pk-bg-end-start-radius: 0;
            --pk-bg-end-end-radius: 0;
        }

        :host([data-pk-group-orientation='vertical'][data-pk-group-item-last]:not([data-pk-group-item-first])) {
            --pk-bg-start-start-radius: 0;
            --pk-bg-start-end-radius: 0;
        }
    `}function Qe(){return l`
        :host([data-pk-group-orientation='horizontal'][data-pk-group-join][variant='outline']),
        :host([data-pk-group-orientation='horizontal'][data-pk-group-join][variant='dashed']) {
            margin-inline-start: var(--pk-bg-horizontal-indent-outlined, 0);
            margin-block-start: 0;
        }

        :host([data-pk-group-orientation='vertical'][data-pk-group-join][variant='outline']),
        :host([data-pk-group-orientation='vertical'][data-pk-group-join][variant='dashed']) {
            margin-block-start: var(--pk-bg-vertical-indent-outlined, 0);
            margin-inline-start: 0;
        }

        :host([data-pk-group-orientation='horizontal'][data-pk-group-join]:not([variant='outline']):not([variant='dashed']):not([variant='link']):not([variant='none'])) {
            margin-inline-start: var(--pk-bg-horizontal-indent, 0);
            margin-block-start: 0;
        }

        :host([data-pk-group-orientation='vertical'][data-pk-group-join]:not([variant='outline']):not([variant='dashed']):not([variant='link']):not([variant='none'])) {
            margin-block-start: var(--pk-bg-vertical-indent, 0);
            margin-inline-start: 0;
        }

        :host([data-pk-group-orientation='horizontal'][data-pk-group-divider][data-pk-group-join][variant='primary']),
        :host([data-pk-group-orientation='horizontal'][data-pk-group-divider][data-pk-group-join][variant='secondary']),
        :host([data-pk-group-orientation='horizontal'][data-pk-group-divider][data-pk-group-join][variant='default']) {
            margin-inline-start: 0;
            margin-block-start: 0;
        }

        :host([data-pk-group-orientation='vertical'][data-pk-group-divider][data-pk-group-join][variant='primary']),
        :host([data-pk-group-orientation='vertical'][data-pk-group-divider][data-pk-group-join][variant='secondary']),
        :host([data-pk-group-orientation='vertical'][data-pk-group-divider][data-pk-group-join][variant='default']) {
            margin-block-start: 0;
            margin-inline-start: 0;
        }

        /* Filled variants — Craft margin gap; parent background shows through.
         * !important: outer preflight/utilities beat non-important :host margin
         * (revert-layer cannot restore shadow host values — it still specifies outer 0).
         */
        :host([data-pk-group-orientation='horizontal'][data-pk-group-internal-trail][variant='primary']),
        :host([data-pk-group-orientation='horizontal'][data-pk-group-internal-trail][variant='secondary']),
        :host([data-pk-group-orientation='horizontal'][data-pk-group-internal-trail][variant='default']) {
            margin-inline-end: var(--pk-btn-group-gap, 1px) !important;
        }

        :host([data-pk-group-orientation='vertical'][data-pk-group-internal-trail][variant='primary']),
        :host([data-pk-group-orientation='vertical'][data-pk-group-internal-trail][variant='secondary']),
        :host([data-pk-group-orientation='vertical'][data-pk-group-internal-trail][variant='default']) {
            margin-block-end: var(--pk-btn-group-gap, 1px) !important;
        }
    `}function $e(e){let t=c(e);return l`
        :host([data-pk-group-orientation='horizontal'][data-pk-group-join]:not([data-pk-group-divider])) ${t} {
            border-left-width: 0;
        }

        :host([data-pk-group-orientation='vertical'][data-pk-group-join]:not([data-pk-group-divider])) ${t} {
            border-top-width: 0;
        }

        :host([data-pk-group-orientation='horizontal'][data-pk-group-divider]:not([variant='outline']):not([variant='dashed'])) ${t} {
            border-left-width: 0;
        }

        :host([data-pk-group-orientation='vertical'][data-pk-group-divider]:not([variant='outline']):not([variant='dashed'])) ${t} {
            border-top-width: 0;
        }

        :host([data-pk-group-orientation='horizontal'][data-pk-group-internal-trail][variant='outline']) ${t},
        :host([data-pk-group-orientation='horizontal'][data-pk-group-internal-trail][variant='dashed']) ${t} {
            border-right-width: 0;
        }

        :host([data-pk-group-orientation='vertical'][data-pk-group-internal-trail][variant='outline']) ${t},
        :host([data-pk-group-orientation='vertical'][data-pk-group-internal-trail][variant='dashed']) ${t} {
            border-bottom-width: 0;
        }
    `}var et={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},tt=e=>(...t)=>({_$litDirective$:e,values:t}),nt=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,n){this._$Ct=e,this._$AM=t,this._$Ci=n}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}},R=tt(class extends nt{constructor(e){if(super(e),e.type!==et.ATTRIBUTE||e.name!==`class`||e.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(e){return` `+Object.keys(e).filter(t=>e[t]).join(` `)+` `}update(e,[t]){if(this.st===void 0){this.st=new Set,e.strings!==void 0&&(this.nt=new Set(e.strings.join(` `).split(/\s/).filter(e=>e!==``)));for(let e in t)t[e]&&!this.nt?.has(e)&&this.st.add(e);return this.render(t)}let n=e.element.classList;for(let e of this.st)e in t||(n.remove(e),this.st.delete(e));for(let e in t){let r=!!t[e];r===this.st.has(e)||this.nt?.has(e)||(r?(n.add(e),this.st.add(e)):(n.remove(e),this.st.delete(e)))}return A}}),rt=class extends nt{constructor(e){if(super(e),this.it=j,e.type!==et.CHILD)throw Error(this.constructor.directiveName+`() can only be used in child bindings`)}render(e){if(e===j||e==null)return this._t=void 0,this.it=e;if(e===A)return e;if(typeof e!=`string`)throw Error(this.constructor.directiveName+`() called with a non-string value`);if(e===this.it)return this._t;this.it=e;let t=[e];return t.raw=t,this._t={_$litType$:this.constructor.resultType,strings:t,values:[]}}};rt.directiveName=`unsafeHTML`,rt.resultType=1;var it=class extends rt{};it.directiveName=`unsafeSVG`,it.resultType=2;var z=tt(it),at={width:448,height:512,path:`M352 64c0-17.7-14.3-32-32-32L128 32c-17.7 0-32 14.3-32 32s14.3 32 32 32l192 0c17.7 0 32-14.3 32-32zm96 128c0-17.7-14.3-32-32-32L32 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l384 0c17.7 0 32-14.3 32-32zM0 448c0 17.7 14.3 32 32 32l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L32 416c-17.7 0-32 14.3-32 32zM352 320c0-17.7-14.3-32-32-32l-192 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l192 0c17.7 0 32-14.3 32-32z`},ot={width:448,height:512,path:`M448 64c0-17.7-14.3-32-32-32L32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32zm0 256c0-17.7-14.3-32-32-32L32 288c-17.7 0-32 14.3-32 32s14.3 32 32 32l384 0c17.7 0 32-14.3 32-32zM0 192c0 17.7 14.3 32 32 32l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L32 160c-17.7 0-32 14.3-32 32zM448 448c0-17.7-14.3-32-32-32L32 416c-17.7 0-32 14.3-32 32s14.3 32 32 32l384 0c17.7 0 32-14.3 32-32z`},st={width:448,height:512,path:`M288 64c0 17.7-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l224 0c17.7 0 32 14.3 32 32zm0 256c0 17.7-14.3 32-32 32L32 352c-17.7 0-32-14.3-32-32s14.3-32 32-32l224 0c17.7 0 32 14.3 32 32zM0 192c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 224c-17.7 0-32-14.3-32-32zM448 448c0 17.7-14.3 32-32 32L32 480c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z`},ct={width:448,height:512,path:`M448 64c0 17.7-14.3 32-32 32L192 96c-17.7 0-32-14.3-32-32s14.3-32 32-32l224 0c17.7 0 32 14.3 32 32zm0 256c0 17.7-14.3 32-32 32l-224 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l224 0c17.7 0 32 14.3 32 32zM0 192c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 224c-17.7 0-32-14.3-32-32zM448 448c0 17.7-14.3 32-32 32L32 480c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z`},lt={width:384,height:512,path:`M169.4 502.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 402.7 224 32c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 370.7-105.4-105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z`},ut={width:512,height:512,path:`M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288 480 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-370.7 0 105.4-105.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z`},dt={width:512,height:512,path:`M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-105.4 105.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z`},ft={width:512,height:512,path:`M256 64c-56.8 0-107.9 24.7-143.1 64l47.1 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 192c-17.7 0-32-14.3-32-32L0 32C0 14.3 14.3 0 32 0S64 14.3 64 32l0 54.7C110.9 33.6 179.5 0 256 0 397.4 0 512 114.6 512 256S397.4 512 256 512c-87 0-163.9-43.4-210.1-109.7-10.1-14.5-6.6-34.4 7.9-44.6s34.4-6.6 44.6 7.9c34.8 49.8 92.4 82.3 157.6 82.3 106 0 192-86 192-192S362 64 256 64z`},pt={width:512,height:512,path:`M436.7 74.7L448 85.4 448 32c0-17.7 14.3-32 32-32s32 14.3 32 32l0 128c0 17.7-14.3 32-32 32l-128 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l47.9 0-7.6-7.2c-.2-.2-.4-.4-.6-.6-75-75-196.5-75-271.5 0s-75 196.5 0 271.5 196.5 75 271.5 0c8.2-8.2 15.5-16.9 21.9-26.1 10.1-14.5 30.1-18 44.6-7.9s18 30.1 7.9 44.6c-8.5 12.2-18.2 23.8-29.1 34.7-100 100-262.1 100-362 0S-25 175 75 75c99.9-99.9 261.7-100 361.7-.3z`},mt={width:384,height:512,path:`M214.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 109.3 160 480c0 17.7 14.3 32 32 32s32-14.3 32-32l0-370.7 105.4 105.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z`},ht={width:512,height:512,path:`M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l82.7 0-201.4 201.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3 448 192c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160c0-17.7-14.3-32-32-32L320 0zM80 96C35.8 96 0 131.8 0 176L0 432c0 44.2 35.8 80 80 80l256 0c44.2 0 80-35.8 80-80l0-80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 80c0 8.8-7.2 16-16 16L80 448c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l80 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L80 96z`},gt={width:448,height:512,path:`M224 0c17.7 0 32 14.3 32 32l0 168.6 144-83.1c15.3-8.8 34.9-3.6 43.7 11.7s3.6 34.9-11.7 43.7L288 256 432 339.1c15.3 8.8 20.6 28.4 11.7 43.7s-28.4 20.6-43.7 11.7L256 311.4 256 480c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-168.6-144 83.1c-15.3 8.8-34.9 3.6-43.7-11.7S.7 348 16 339.1L160 256 16 172.9C.7 164-4.5 144.5 4.3 129.1S32.7 108.6 48 117.4L192 200.6 192 32c0-17.7 14.3-32 32-32z`},_t={width:384,height:512,path:`M32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l32 0 0 320-32 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l224 0c70.7 0 128-57.3 128-128 0-46.5-24.8-87.3-62-109.7 18.7-22.3 30-51 30-82.3 0-70.7-57.3-128-128-128L32 32zM288 160c0 35.3-28.7 64-64 64l-96 0 0-128 96 0c35.3 0 64 28.7 64 64zM128 416l0-128 128 0c35.3 0 64 28.7 64 64s-28.7 64-64 64l-128 0z`},vt={width:576,height:512,path:`M416 32l-32 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l32 0c17.7 0 32 14.3 32 32l0 37.5c0 25.5 10.1 49.9 28.1 67.9l22.6 22.6-22.6 22.6c-18 18-28.1 42.4-28.1 67.9l0 37.5c0 17.7-14.3 32-32 32l-32 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l32 0c53 0 96-43 96-96l0-37.5c0-8.5 3.4-16.6 9.4-22.6l45.3-45.3c12.5-12.5 12.5-32.8 0-45.3l-45.3-45.3c-6-6-9.4-14.1-9.4-22.6l0-37.5c0-53-43-96-96-96zM160 32c-53 0-96 43-96 96l0 37.5c0 8.5-3.4 16.6-9.4 22.6L9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l45.3 45.3c6 6 9.4 14.1 9.4 22.6L64 384c0 53 43 96 96 96l32 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-32 0c-17.7 0-32-14.3-32-32l0-37.5c0-25.5-10.1-49.9-28.1-67.9L77.3 256 99.9 233.4c18-18 28.1-42.4 28.1-67.9l0-37.5c0-17.7 14.3-32 32-32l32 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-32 0z`},yt={width:448,height:512,path:`M128 0C110.3 0 96 14.3 96 32l0 32-32 0C28.7 64 0 92.7 0 128l0 48 448 0 0-48c0-35.3-28.7-64-64-64l-32 0 0-32c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 32-128 0 0-32c0-17.7-14.3-32-32-32zM0 224L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-192-448 0z`},bt={width:320,height:512,path:`M140.3 376.8c12.6 10.2 31.1 9.5 42.8-2.2l128-128c9.2-9.2 11.9-22.9 6.9-34.9S301.4 192 288.5 192l-256 0c-12.9 0-24.6 7.8-29.6 19.8S.7 237.5 9.9 246.6l128 128 2.4 2.2z`},xt={width:320,height:512,path:`M140.3 135.2c12.6-10.3 31.1-9.5 42.8 2.2l128 128c9.2 9.2 11.9 22.9 6.9 34.9S301.4 320 288.5 320l-256 0c-12.9 0-24.6-7.8-29.6-19.8S.7 274.5 9.9 265.4l128-128 2.4-2.2z`},St={width:448,height:512,path:`M434.8 70.1c14.3 10.4 17.5 30.4 7.1 44.7l-256 352c-5.5 7.6-14 12.3-23.4 13.1s-18.5-2.7-25.1-9.3l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l101.5 101.5 234-321.7c10.4-14.3 30.4-17.5 44.7-7.1z`},Ct={width:448,height:512,path:`M201.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 338.7 54.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z`},wt={width:320,height:512,path:`M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z`},Tt={width:320,height:512,path:`M311.1 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L243.2 256 73.9 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z`},Et={width:448,height:512,path:`M201.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 173.3 54.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z`},Dt={width:512,height:512,path:`M0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0z`},Ot={width:512,height:512,path:`M256 512a256 256 0 1 1 0-512 256 256 0 1 1 0 512zM374 145.7c-10.7-7.8-25.7-5.4-33.5 5.3L221.1 315.2 169 263.1c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l72 72c5 5 11.8 7.5 18.8 7s13.4-4.1 17.5-9.8L379.3 179.2c7.8-10.7 5.4-25.7-5.3-33.5z`},kt={width:512,height:512,path:`M256 512a256 256 0 1 1 0-512 256 256 0 1 1 0 512zm0-192a32 32 0 1 0 0 64 32 32 0 1 0 0-64zm0-192c-18.2 0-32.7 15.5-31.4 33.7l7.4 104c.9 12.6 11.4 22.3 23.9 22.3 12.6 0 23-9.7 23.9-22.3l7.4-104c1.3-18.2-13.1-33.7-31.4-33.7z`},At={width:512,height:512,path:`M256 512a256 256 0 1 0 0-512 256 256 0 1 0 0 512zM224 160a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm-8 64l48 0c13.3 0 24 10.7 24 24l0 88 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-80 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l24 0 0-64-24 0c-13.3 0-24-10.7-24-24s10.7-24 24-24z`},jt={width:384,height:512,path:`M320 32l-8.6 0C300.4 12.9 279.7 0 256 0L128 0C104.3 0 83.6 12.9 72.6 32L64 32C28.7 32 0 60.7 0 96L0 448c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-352c0-35.3-28.7-64-64-64zM136 112c-13.3 0-24-10.7-24-24s10.7-24 24-24l112 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-112 0z`},Mt={width:512,height:512,path:`M256 0a256 256 0 1 1 0 512 256 256 0 1 1 0-512zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24z`},Nt={width:512,height:512,path:`M288 448l-224 0 0-224 48 0 0-64-48 0c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l224 0c35.3 0 64-28.7 64-64l0-48-64 0 0 48zm-64-96l224 0c35.3 0 64-28.7 64-64l0-224c0-35.3-28.7-64-64-64L224 0c-35.3 0-64 28.7-64 64l0 224c0 35.3 28.7 64 64 64z`},Pt={width:576,height:512,path:`M360.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm64.6 136.1c-12.5 12.5-12.5 32.8 0 45.3l73.4 73.4-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l96-96c12.5-12.5 12.5-32.8 0-45.3l-96-96c-12.5-12.5-32.8-12.5-45.3 0zm-274.7 0c-12.5-12.5-32.8-12.5-45.3 0l-96 96c-12.5 12.5-12.5 32.8 0 45.3l96 96c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 150.6 182.6c12.5-12.5 12.5-32.8 0-45.3z`},Ft={width:448,height:512,path:`M192 0c-35.3 0-64 28.7-64 64l0 256c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-200.6c0-17.4-7.1-34.1-19.7-46.2L370.6 17.8C358.7 6.4 342.8 0 326.3 0L192 0zM64 128c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-16-64 0 0 16-192 0 0-256 16 0 0-64-16 0z`},It={width:448,height:512,path:`M256 32c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 210.7-41.4-41.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l96 96c12.5 12.5 32.8 12.5 45.3 0l96-96c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 242.7 256 32zM64 320c-35.3 0-64 28.7-64 64l0 32c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-32c0-35.3-28.7-64-64-64l-46.9 0-56.6 56.6c-31.2 31.2-81.9 31.2-113.1 0L110.9 320 64 320zm304 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z`},Lt={width:448,height:512,path:`M0 256a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm168 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm224-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z`},Rt={width:576,height:512,path:`M288 32c-80.8 0-145.5 36.8-192.6 80.6-46.8 43.5-78.1 95.4-93 131.1-3.3 7.9-3.3 16.7 0 24.6 14.9 35.7 46.2 87.7 93 131.1 47.1 43.7 111.8 80.6 192.6 80.6s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1 3.3-7.9 3.3-16.7 0-24.6-14.9-35.7-46.2-87.7-93-131.1-47.1-43.7-111.8-80.6-192.6-80.6zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64-11.5 0-22.3-3-31.7-8.4-1 10.9-.1 22.1 2.9 33.2 13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-12.2-45.7-55.5-74.8-101.1-70.8 5.3 9.3 8.4 20.1 8.4 31.7z`},zt={width:576,height:512,path:`M272 48L160 48c-8.8 0-16 7.2-16 16l0 176-48 0 0-176c0-35.3 28.7-64 64-64L293.5 0c17 0 33.3 6.7 45.3 18.7L461.3 141.3c12 12 18.7 28.3 18.7 45.3l0 53.5-48 0 0-32-88 0c-39.8 0-72-32.2-72-72l0-88zM96 384l48 0 0 64c0 8.8 7.2 16 16 16l256 0c8.8 0 16-7.2 16-16l0-64 48 0 0 64c0 35.3-28.7 64-64 64l-256 0c-35.3 0-64-28.7-64-64l0-64zM412.1 160L320 67.9 320 136c0 13.3 10.7 24 24 24l68.1 0zM24 288l112 0c13.3 0 24 10.7 24 24s-10.7 24-24 24L24 336c-13.3 0-24-10.7-24-24s10.7-24 24-24zm208 0l112 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-112 0c-13.3 0-24-10.7-24-24s10.7-24 24-24zm208 0l112 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-112 0c-13.3 0-24-10.7-24-24s10.7-24 24-24z`},Bt={width:448,height:512,path:`M32 0C49.7 0 64 14.3 64 32l0 16 69-17.2c38.1-9.5 78.3-5.1 113.5 12.5 46.3 23.2 100.8 23.2 147.1 0l9.6-4.8C423.8 28.1 448 43.1 448 66.1l0 279.7c0 13.3-8.3 25.3-20.8 30l-34.7 13c-46.2 17.3-97.6 14.6-141.7-7.4-37.9-19-81.4-23.7-122.5-13.4L64 384 64 480c0 17.7-14.3 32-32 32S0 497.7 0 480L0 32C0 14.3 14.3 0 32 0zM64 187.1l64-13.9 0 65.5-64 13.9 0 65.5 48.8-12.2c5.1-1.3 10.1-2.4 15.2-3.3l0-63.9 38.9-8.4c8.3-1.8 16.7-2.5 25.1-2.1l0-64c13.6 .4 27.2 2.6 40.4 6.4l23.6 6.9 0 66.7-41.7-12.3c-7.3-2.1-14.8-3.4-22.3-3.8l0 71.4c21.8 1.9 43.3 6.7 64 14.4l0-69.8 22.7 6.7c13.5 4 27.3 6.4 41.3 7.4l0-64.2c-7.8-.8-15.6-2.3-23.2-4.5l-40.8-12 0-62c-13-3.8-25.8-8.8-38.2-15-8.2-4.1-16.9-7-25.8-8.8l0 72.4c-13-.4-26 .8-38.7 3.6l-25.3 5.5 0-75.2-64 16 0 73.1zM320 335.7c16.8 1.5 33.9-.7 50-6.8l14-5.2 0-71.7-7.9 1.8c-18.4 4.3-37.3 5.7-56.1 4.5l0 77.4zm64-149.4l0-70.8c-20.9 6.1-42.4 9.1-64 9.1l0 69.4c13.9 1.4 28 .5 41.7-2.6l22.3-5.2z`},Vt={width:448,height:512,path:`M71.3 295.6c-21.9-21.9-21.9-57.3 0-79.2s57.3-21.9 79.2 0 21.9 57.3 0 79.2s-57.4 21.9-79.2 0zM184.4 182.5c-21.9-21.9-21.9-57.3 0-79.2s57.3-21.9 79.2 0 21.9 57.3 0 79.2-57.3 21.8-79.2 0zm0 147c21.9-21.9 57.3-21.9 79.2 0s21.9 57.3 0 79.2s-57.3 21.9-79.2 0c-21.9-21.8-21.9-57.3 0-79.2zM297.5 216.4c21.9-21.9 57.3-21.9 79.2 0s21.9 57.3 0 79.2s-57.3 21.9-79.2 0c-21.8-21.9-21.8-57.3 0-79.2z`},Ht={width:512,height:512,path:`M64 224a64 64 0 1 1 0-128 64 64 0 1 1 0 128zM256 96a64 64 0 1 1 0 128 64 64 0 1 1 0-128zm192 0a64 64 0 1 1 0 128 64 64 0 1 1 0-128zm0 192a64 64 0 1 1 0 128 64 64 0 1 1 0-128zM256 416a64 64 0 1 1 0-128 64 64 0 1 1 0 128zM64 288a64 64 0 1 1 0 128 64 64 0 1 1 0-128z`},Ut={width:320,height:512,path:`M128 64A64 64 0 1 0 0 64 64 64 0 1 0 128 64zm0 192a64 64 0 1 0 -128 0 64 64 0 1 0 128 0zM0 448c0 35.3 28.7 64 64 64s64-28.7 64-64-28.7-64-64-64-64 28.7-64 64zM320 64a64 64 0 1 0 -128 0 64 64 0 1 0 128 0zM192 256a64 64 0 1 0 128 0 64 64 0 1 0 -128 0zM320 448c0-35.3-28.7-64-64-64s-64 28.7-64 64 28.7 64 64 64 64-28.7 64-64z`},Wt={width:512,height:512,path:`M448 96c0-11.1-5.7-21.4-15.2-27.2s-21.2-6.4-31.1-1.4l-64 32c-15.8 7.9-22.2 27.1-14.3 42.9s27.1 22.2 42.9 14.3l17.7-8.8 0 236.2-32 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l128 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-32 0 0-288zM64 96c0-17.7-14.3-32-32-32S0 78.3 0 96L0 416c0 17.7 14.3 32 32 32s32-14.3 32-32l0-128 128 0 0 128c0 17.7 14.3 32 32 32s32-14.3 32-32l0-320c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 128-128 0 0-128z`},Gt={width:576,height:512,path:`M96 96c0-17.7-14.3-32-32-32S32 78.3 32 96l0 320c0 17.7 14.3 32 32 32s32-14.3 32-32l0-128 96 0 0 128c0 17.7 14.3 32 32 32s32-14.3 32-32l0-320c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 128-96 0 0-128zM368 64c-17.7 0-32 14.3-32 32s14.3 32 32 32l81.1 0c21.5 0 38.9 17.4 38.9 38.9 0 13.9-7.5 26.8-19.6 33.8l-76.3 43.6C347.5 269.7 320 317.1 320 368.5l0 47.5c0 17.7 14.3 32 32 32l160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-128 0 0-15.5c0-28.4 15.2-54.6 39.9-68.7l76.3-43.6C532.2 237.9 552 203.8 552 166.9 552 110.1 505.9 64 449.1 64L368 64z`},Kt={width:576,height:512,path:`M96 96c0-17.7-14.3-32-32-32S32 78.3 32 96l0 320c0 17.7 14.3 32 32 32s32-14.3 32-32l0-128 96 0 0 128c0 17.7 14.3 32 32 32s32-14.3 32-32l0-320c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 128-96 0 0-128zM352 256c0 17.7 14.3 32 32 32l56 0c26.5 0 48 21.5 48 48s-21.5 48-48 48l-88 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l88 0c61.9 0 112-50.1 112-112 0-31.3-12.9-59.7-33.6-80 20.7-20.3 33.6-48.7 33.6-80 0-61.9-50.1-112-112-112l-88 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l88 0c26.5 0 48 21.5 48 48s-21.5 48-48 48l-56 0c-17.7 0-32 14.3-32 32z`},qt={width:512,height:512,path:`M64 96c0-17.7-14.3-32-32-32S0 78.3 0 96L0 416c0 17.7 14.3 32 32 32s32-14.3 32-32l0-128 96 0 0 128c0 17.7 14.3 32 32 32s32-14.3 32-32l0-320c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 128-96 0 0-128zm288 0c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 112c0 44.2 35.8 80 80 80l80 0 0 128c0 17.7 14.3 32 32 32s32-14.3 32-32l0-320c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 128-80 0c-8.8 0-16-7.2-16-16l0-112z`},Jt={width:576,height:512,path:`M96 96c0-17.7-14.3-32-32-32S32 78.3 32 96l0 320c0 17.7 14.3 32 32 32s32-14.3 32-32l0-128 96 0 0 128c0 17.7 14.3 32 32 32s32-14.3 32-32l0-320c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 128-96 0 0-128zM352 64c-17.7 0-32 14.3-32 32l0 144c0 17.7 14.3 32 32 32l80 0c30.9 0 56 25.1 56 56s-25.1 56-56 56l-80 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l80 0c66.3 0 120-53.7 120-120S498.3 208 432 208l-48 0 0-80 120 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L352 64z`},Yt={width:512,height:512,path:`M32 64c17.7 0 32 14.3 32 32l0 128 96 0 0-128c0-17.7 14.3-32 32-32s32 14.3 32 32l0 320c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-128-96 0 0 128c0 17.7-14.3 32-32 32S0 433.7 0 416L0 96C0 78.3 14.3 64 32 64zm352 64c-17.7 0-32 14.3-32 32l0 53.5c10-3.5 20.8-5.5 32-5.5l32 0c53 0 96 43 96 96l0 48c0 53-43 96-96 96l-32 0c-53 0-96-43-96-96l0-192c0-53 43-96 96-96l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0zM352 304l0 48c0 17.7 14.3 32 32 32l32 0c17.7 0 32-14.3 32-32l0-48c0-17.7-14.3-32-32-32l-32 0c-17.7 0-32 14.3-32 32z`},Xt={width:576,height:512,path:`M315 315L473.4 99.9 444.1 70.6 229 229 315 315zm-187 5l0 0 0-71.7c0-15.3 7.2-29.6 19.5-38.6L420.6 8.4C428 2.9 437 0 446.2 0 457.6 0 468.5 4.5 476.6 12.6l54.8 54.8c8.1 8.1 12.6 19 12.6 30.5 0 9.2-2.9 18.2-8.4 25.6L334.4 396.5c-9 12.3-23.4 19.5-38.6 19.5l-71.7 0-25.4 25.4c-12.5 12.5-32.8 12.5-45.3 0l-50.7-50.7c-12.5-12.5-12.5-32.8 0-45.3L128 320zM7 466.3l51.7-51.7 70.6 70.6-19.7 19.7c-4.5 4.5-10.6 7-17 7L24 512c-13.3 0-24-10.7-24-24l0-4.7c0-6.4 2.5-12.5 7-17z`},Zt={width:512,height:512,path:`M277.8 8.6c-12.3-11.4-31.3-11.4-43.5 0l-224 208c-9.6 9-12.8 22.9-8 35.1S18.8 272 32 272l16 0 0 176c0 35.3 28.7 64 64 64l288 0c35.3 0 64-28.7 64-64l0-176 16 0c13.2 0 25-8.1 29.8-20.3s1.6-26.2-8-35.1l-224-208zM240 320l32 0c26.5 0 48 21.5 48 48l0 96-128 0 0-96c0-26.5 21.5-48 48-48z`},Qt={width:384,height:512,path:`M128 64c0-17.7 14.3-32 32-32l192 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-58.7 0-133.3 320 64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 480c-17.7 0-32-14.3-32-32s14.3-32 32-32l58.7 0 133.3-320-64 0c-17.7 0-32-14.3-32-32z`},$t={width:384,height:512,path:`M292.9 384c7.3-22.3 21.9-42.5 38.4-59.9 32.7-34.4 52.7-80.9 52.7-132.1 0-106-86-192-192-192S0 86 0 192c0 51.2 20 97.7 52.7 132.1 16.5 17.4 31.2 37.6 38.4 59.9l201.7 0zM288 432l-192 0 0 16c0 44.2 35.8 80 80 80l32 0c44.2 0 80-35.8 80-80l0-16zM184 112c-39.8 0-72 32.2-72 72 0 13.3-10.7 24-24 24s-24-10.7-24-24c0-66.3 53.7-120 120-120 13.3 0 24 10.7 24 24s-10.7 24-24 24z`},en={width:576,height:512,path:`M419.5 96c-16.6 0-32.7 4.5-46.8 12.7-15.8-16-34.2-29.4-54.5-39.5 28.2-24 64.1-37.2 101.3-37.2 86.4 0 156.5 70 156.5 156.5 0 41.5-16.5 81.3-45.8 110.6l-71.1 71.1c-29.3 29.3-69.1 45.8-110.6 45.8-86.4 0-156.5-70-156.5-156.5 0-1.5 0-3 .1-4.5 .5-17.7 15.2-31.6 32.9-31.1s31.6 15.2 31.1 32.9c0 .9 0 1.8 0 2.6 0 51.1 41.4 92.5 92.5 92.5 24.5 0 48-9.7 65.4-27.1l71.1-71.1c17.3-17.3 27.1-40.9 27.1-65.4 0-51.1-41.4-92.5-92.5-92.5zM275.2 173.3c-1.9-.8-3.8-1.9-5.5-3.1-12.6-6.5-27-10.2-42.1-10.2-24.5 0-48 9.7-65.4 27.1L91.1 258.2c-17.3 17.3-27.1 40.9-27.1 65.4 0 51.1 41.4 92.5 92.5 92.5 16.5 0 32.6-4.4 46.7-12.6 15.8 16 34.2 29.4 54.6 39.5-28.2 23.9-64 37.2-101.3 37.2-86.4 0-156.5-70-156.5-156.5 0-41.5 16.5-81.3 45.8-110.6l71.1-71.1c29.3-29.3 69.1-45.8 110.6-45.8 86.6 0 156.5 70.6 156.5 156.9 0 1.3 0 2.6 0 3.9-.4 17.7-15.1 31.6-32.8 31.2s-31.6-15.1-31.2-32.8c0-.8 0-1.5 0-2.3 0-33.7-18-63.3-44.8-79.6z`},tn={width:384,height:512,path:`M128 96l0 64 128 0 0-64c0-35.3-28.7-64-64-64s-64 28.7-64 64zM64 160l0-64C64 25.3 121.3-32 192-32S320 25.3 320 96l0 64c35.3 0 64 28.7 64 64l0 224c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 224c0-35.3 28.7-64 64-64z`},nn={width:512,height:512,path:`M40 48C26.7 48 16 58.7 16 72l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24L40 48zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L192 64zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-288 0zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-288 0zM16 232l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24l-48 0c-13.3 0-24 10.7-24 24zM40 368c-13.3 0-24 10.7-24 24l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24l-48 0z`},rn={width:512,height:512,path:`M0 72C0 58.8 10.7 48 24 48l48 0c13.3 0 24 10.7 24 24l0 104 24 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-96 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l24 0 0-80-24 0C10.7 96 0 85.3 0 72zM30.4 301.2C41.8 292.6 55.7 288 70 288l4.9 0c33.7 0 61.1 27.4 61.1 61.1 0 19.6-9.4 37.9-25.2 49.4l-24 17.5 33.2 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-90.7 0C13.1 464 0 450.9 0 434.7 0 425.3 4.5 416.5 12.1 411l70.5-51.3c3.4-2.5 5.4-6.4 5.4-10.6 0-7.2-5.9-13.1-13.1-13.1L70 336c-3.9 0-7.7 1.3-10.8 3.6L38.4 355.2c-10.6 8-25.6 5.8-33.6-4.8S-1 324.8 9.6 316.8l20.8-15.6zM224 64l256 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-256 0c-17.7 0-32-14.3-32-32s14.3-32 32-32zm0 160l256 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-256 0c-17.7 0-32-14.3-32-32s14.3-32 32-32zm0 160l256 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-256 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z`},an={width:512,height:512,path:`M48 144a48 48 0 1 0 0-96 48 48 0 1 0 0 96zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L192 64zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-288 0zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-288 0zM48 464a48 48 0 1 0 0-96 48 48 0 1 0 0 96zM96 256a48 48 0 1 0 -96 0 48 48 0 1 0 96 0z`},on={width:448,height:512,path:`M0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32z`},sn={width:448,height:512,path:`M0 64C0 46.3 14.3 32 32 32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-16 0 0 112 224 0 0-112-16 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-16 0 0 320 16 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-96 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l16 0 0-144-224 0 0 144 16 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-96 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l16 0 0-320-16 0C14.3 96 0 81.7 0 64z`},cn={width:448,height:512,path:`M160 0L416 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-32 0 0 416c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-416-48 0 0 416c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-160-48 0C71.6 320 0 248.4 0 160S71.6 0 160 0z`},ln={width:512,height:512,path:`M352.9 21.2L308 66.1 445.9 204 490.8 159.1C504.4 145.6 512 127.2 512 108s-7.6-37.6-21.2-51.1L455.1 21.2C441.6 7.6 423.2 0 404 0s-37.6 7.6-51.1 21.2zM274.1 100L58.9 315.1c-10.7 10.7-18.5 24.1-22.6 38.7L.9 481.6c-2.3 8.3 0 17.3 6.2 23.4s15.1 8.5 23.4 6.2l127.8-35.5c14.6-4.1 27.9-11.8 38.7-22.6L412 237.9 274.1 100z`},un={width:448,height:512,path:`M256 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 160-160 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l160 0 0 160c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160 160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-160 0 0-160z`},dn={width:512,height:512,path:`M256 512a256 256 0 1 0 0-512 256 256 0 1 0 0 512zM232 344l0-64-64 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l64 0 0-64c0-13.3 10.7-24 24-24s24 10.7 24 24l0 64 64 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-64 0 0 64c0 13.3-10.7 24-24 24s-24-10.7-24-24z`},fn={width:448,height:512,path:`M448 296c0 66.3-53.7 120-120 120l-8 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l8 0c30.9 0 56-25.1 56-56l0-8-64 0c-35.3 0-64-28.7-64-64l0-64c0-35.3 28.7-64 64-64l64 0c35.3 0 64 28.7 64 64l0 136zm-256 0c0 66.3-53.7 120-120 120l-8 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l8 0c30.9 0 56-25.1 56-56l0-8-64 0c-35.3 0-64-28.7-64-64l0-64c0-35.3 28.7-64 64-64l64 0c35.3 0 64 28.7 64 64l0 136z`},pn={width:512,height:512,path:`M65.9 228.5c13.3-93 93.4-164.5 190.1-164.5 53 0 101 21.5 135.8 56.2 .2 .2 .4 .4 .6 .6l7.6 7.2-47.9 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l128 0c17.7 0 32-14.3 32-32l0-128c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 53.4-11.3-10.7C390.5 28.6 326.5 0 256 0 127 0 20.3 95.4 2.6 219.5 .1 237 12.2 253.2 29.7 255.7s33.7-9.7 36.2-27.1zm443.5 64c2.5-17.5-9.7-33.7-27.1-36.2s-33.7 9.7-36.2 27.1c-13.3 93-93.4 164.5-190.1 164.5-53 0-101-21.5-135.8-56.2-.2-.2-.4-.4-.6-.6l-7.6-7.2 47.9 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L32 320c-8.5 0-16.7 3.4-22.7 9.5S-.1 343.7 0 352.3l1 127c.1 17.7 14.6 31.9 32.3 31.7S65.2 496.4 65 478.7l-.4-51.5 10.7 10.1c46.3 46.1 110.2 74.7 180.7 74.7 129 0 235.7-95.4 253.4-219.5z`},mn={width:512,height:512,path:`M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376C296.3 401.1 253.9 416 208 416 93.1 416 0 322.9 0 208S93.1 0 208 0 416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z`},hn={width:512,height:512,path:`M307.8 18.4c-12 5-19.8 16.6-19.8 29.6l0 80-112 0c-97.2 0-176 78.8-176 176 0 113.3 81.5 163.9 100.2 174.1 2.5 1.4 5.3 1.9 8.1 1.9 10.9 0 19.7-8.9 19.7-19.7 0-7.5-4.3-14.4-9.8-19.5-9.4-8.8-22.2-26.4-22.2-56.7 0-53 43-96 96-96l96 0 0 80c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-9.2-9.2-22.9-11.9-34.9-6.9z`},gn={width:512,height:512,path:`M32 64C14.3 64 0 78.3 0 96s14.3 32 32 32l86.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 128c17.7 0 32-14.3 32-32s-14.3-32-32-32L265.3 64C253 35.7 224.8 16 192 16s-61 19.7-73.3 48L32 64zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l246.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48l54.7 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-54.7 0c-12.3-28.3-40.5-48-73.3-48s-61 19.7-73.3 48L32 224zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l54.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 448c17.7 0 32-14.3 32-32s-14.3-32-32-32l-246.7 0c-12.3-28.3-40.5-48-73.3-48s-61 19.7-73.3 48L32 384z`},_n={width:512,height:512,path:`M96 157.5C96 88.2 152.2 32 221.5 32L368 32c17.7 0 32 14.3 32 32s-14.3 32-32 32L221.5 96c-34 0-61.5 27.5-61.5 61.5 0 31 23.1 57.2 53.9 61l44.1 5.5 222 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l83.1 0C103 204.6 96 181.8 96 157.5zM349.2 336l65.5 0c.9 6.1 1.4 12.2 1.4 18.5 0 69.3-56.2 125.5-125.5 125.5L144 480c-17.7 0-32-14.3-32-32s14.3-32 32-32l146.5 0c34 0 61.5-27.5 61.5-61.5 0-6.4-1-12.7-2.8-18.5z`},vn={width:576,height:512,path:`M96 64C78.3 64 64 78.3 64 96s14.3 32 32 32l15.3 0 89.6 128-89.6 128-15.3 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l32 0c10.4 0 20.2-5.1 26.2-13.6L240 311.8 325.8 434.4c6 8.6 15.8 13.6 26.2 13.6l32 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-15.3 0-89.6-128 89.6-128 15.3 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-32 0c-10.4 0-20.2 5.1-26.2 13.6L240 200.2 154.2 77.6C148.2 69.1 138.4 64 128 64L96 64zM544 320c0-11.1-5.7-21.4-15.2-27.2s-21.2-6.4-31.1-1.4l-32 16c-15.8 7.9-22.2 27.1-14.3 42.9 5.6 11.2 16.9 17.7 28.6 17.7l0 80c-17.7 0-32 14.3-32 32s14.3 32 32 32l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l0-128z`},yn={width:576,height:512,path:`M544 32c0-11.1-5.7-21.4-15.2-27.2s-21.2-6.4-31.1-1.4l-32 16C449.9 27.3 443.5 46.5 451.4 62.3 457 73.5 468.3 80 480 80l0 80c-17.7 0-32 14.3-32 32s14.3 32 32 32l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l0-128zM96 64C78.3 64 64 78.3 64 96s14.3 32 32 32l15.3 0 89.6 128-89.6 128-15.3 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l32 0c10.4 0 20.2-5.1 26.2-13.6L240 311.8 325.8 434.4c6 8.6 15.8 13.6 26.2 13.6l32 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-15.3 0-89.6-128 89.6-128 15.3 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-32 0c-10.4 0-20.2 5.1-26.2 13.6L240 200.2 154.2 77.6C148.2 69.1 138.4 64 128 64L96 64z`},bn={width:448,height:512,path:`M384 32c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64l-320 0-6.5-.3C25.2 476.4 0 449.1 0 416L0 96C0 60.7 28.7 32 64 32l320 0zM64 320l0 96 128 0 0-96-128 0zm192 0l0 96 128 0 0-96-128 0zM64 256l128 0 0-96-128 0 0 96zm192 0l128 0 0-96-128 0 0 96z`},xn={width:576,height:512,path:`M41-24.9c-9.4-9.4-24.6-9.4-33.9 0S-2.3-.3 7 9.1l528 528c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9L322.7 256.9 368.2 96 471 96 465 120.2c-4.3 17.1 6.1 34.5 23.3 38.8s34.5-6.1 38.8-23.3l11-44.1C545.6 61.3 522.7 32 491.5 32l-319 0c-19.8 0-37.3 12.1-44.5 30.1l-87-87zM180.4 114.5l4.6-18.5 116.7 0-30.8 109-90.5-90.5zM241 310.8L211.3 416 160 416c-17.7 0-32 14.3-32 32s14.3 32 32 32l160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-42.2 0 15.1-53.3-51.9-51.9z`},Sn={width:512,height:512,path:`M256 0c14.7 0 28.2 8.1 35.2 21l216 400c6.7 12.4 6.4 27.4-.8 39.5S486.1 480 472 480L40 480c-14.1 0-27.2-7.4-34.4-19.5s-7.5-27.1-.8-39.5l216-400c7-12.9 20.5-21 35.2-21zm0 352a32 32 0 1 0 0 64 32 32 0 1 0 0-64zm0-192c-18.2 0-32.7 15.5-31.4 33.7l7.4 104c.9 12.5 11.4 22.3 23.9 22.3 12.6 0 23-9.7 23.9-22.3l7.4-104c1.3-18.2-13.1-33.7-31.4-33.7z`},Cn={width:384,height:512,path:`M0 32C0 14.3 14.3 0 32 0L96 0c17.7 0 32 14.3 32 32S113.7 64 96 64l0 160c0 53 43 96 96 96s96-43 96-96l0-160c-17.7 0-32-14.3-32-32S270.3 0 288 0l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l0 160c0 88.4-71.6 160-160 160S32 312.4 32 224L32 64C14.3 64 0 49.7 0 32zM0 480c0-17.7 14.3-32 32-32l320 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 512c-17.7 0-32-14.3-32-32z`},wn={width:384,height:512,path:`M55.1 73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L147.2 256 9.9 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192.5 301.3 329.9 438.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.8 256 375.1 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192.5 210.7 55.1 73.4z`},Tn={width:128,height:512,path:`M64 144a56 56 0 1 1 0-112 56 56 0 1 1 0 112zm0 224c30.9 0 56 25.1 56 56s-25.1 56-56 56-56-25.1-56-56 25.1-56 56-56zm56-112c0 30.9-25.1 56-56 56s-56-25.1-56-56 25.1-56 56-56 56 25.1 56 56z`},En={width:512,height:512,path:`M195.1 9.5C198.1-5.3 211.2-16 226.4-16l59.8 0c15.2 0 28.3 10.7 31.3 25.5L332 79.5c14.1 6 27.3 13.7 39.3 22.8l67.8-22.5c14.4-4.8 30.2 1.2 37.8 14.4l29.9 51.8c7.6 13.2 4.9 29.8-6.5 39.9L447 233.3c.9 7.4 1.3 15 1.3 22.7s-.5 15.3-1.3 22.7l53.4 47.5c11.4 10.1 14 26.8 6.5 39.9l-29.9 51.8c-7.6 13.1-23.4 19.2-37.8 14.4l-67.8-22.5c-12.1 9.1-25.3 16.7-39.3 22.8l-14.4 69.9c-3.1 14.9-16.2 25.5-31.3 25.5l-59.8 0c-15.2 0-28.3-10.7-31.3-25.5l-14.4-69.9c-14.1-6-27.2-13.7-39.3-22.8L73.5 432.3c-14.4 4.8-30.2-1.2-37.8-14.4L5.8 366.1c-7.6-13.2-4.9-29.8 6.5-39.9l53.4-47.5c-.9-7.4-1.3-15-1.3-22.7s.5-15.3 1.3-22.7L12.3 185.8c-11.4-10.1-14-26.8-6.5-39.9L35.7 94.1c7.6-13.2 23.4-19.2 37.8-14.4l67.8 22.5c12.1-9.1 25.3-16.7 39.3-22.8L195.1 9.5zM256.3 336a80 80 0 1 0 -.6-160 80 80 0 1 0 .6 160z`},Dn={width:512,height:512,path:`M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L368 46.1 465.9 144 490.3 119.6c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L432 177.9 334.1 80 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z`},On={width:448,height:512,path:`M136.7 5.9L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-8.7-26.1C306.9-7.2 294.7-16 280.9-16L167.1-16c-13.8 0-26 8.8-30.4 21.9zM416 144L32 144 53.1 467.1C54.7 492.4 75.7 512 101 512L347 512c25.3 0 46.3-19.6 47.9-44.9L416 144z`},kn={alignCenter:at,alignJustify:ot,alignLeft:st,alignRight:ct,arrowDown:lt,arrowLeft:ut,arrowRight:dt,arrowRotateLeft:ft,arrowRotateRight:pt,arrowUp:mt,arrowUpRightFromSquare:ht,asterisk:gt,bold:_t,bracketsCurly:vt,calendar:yt,caretDown:bt,caretUp:xt,check:St,chevronDown:Ct,chevronLeft:wt,chevronRight:Tt,chevronUp:Et,circle:Dt,circleCheck:Ot,circleExclamation:kt,circleInfo:At,clipboard:jt,clock:Mt,clone:Nt,code:Pt,copy:Ft,download:It,ellipsis:Lt,ellipsisVertical:Tn,eye:Rt,fileDashedLine:zt,flagCheckered:Bt,gear:En,gripDots:Ht,gripDotsVertical:Ut,gripMove:Vt,h1:Wt,h2:Gt,h3:Kt,h4:qt,h5:Jt,h6:Yt,heading:sn,highlighter:Xt,house:Zt,italic:Qt,lightbulb:$t,link:en,lock:tn,list:nn,listOl:rn,listUl:an,minus:on,paragraph:cn,pen:ln,penToSquare:Dn,plus:un,circlePlus:dn,quoteRight:fn,arrowsRotate:pn,magnifyingGlass:mn,share:hn,sliders:gn,strikethrough:_n,subscript:vn,superscript:yn,table:bn,textSlash:xn,trash:On,triangleExclamation:Sn,underline:Cn,xmark:wn},An=e=>e.replace(/([a-z0-9])([A-Z])/g,`$1-$2`).toLowerCase(),jn=e=>{let t=e.trim();return t&&(/[A-Z]/.test(t)?An(t):t.toLowerCase())},Mn={},Nn=()=>Object.keys(Mn).sort(),Pn=e=>{if(e)return Mn[jn(e)]??Mn[e]},Fn=(e,t)=>{let n=jn(e);if(!n)throw Error(`registerIcon: name must be a non-empty string`);if(!t?.path||!t.width||!t.height)throw Error(`registerIcon: icon "${n}" must include width, height, and path`);Mn[n]=t},In=e=>{for(let[t,n]of Object.entries(e))Fn(t,n)},Ln=e=>e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`),Rn=e=>{let{width:t,height:n}=e;if(t===n)return`0 0 ${t} ${n}`;let r=Math.max(t,n);return`${(t-r)/2} ${(n-r)/2} ${r} ${r}`},zn=(e,t={})=>{let{title:n,className:r,attributes:i={}}=t,a={xmlns:`http://www.w3.org/2000/svg`,viewBox:Rn(e),overflow:`visible`,...i};return r&&(a.class=r),n?a.role=`img`:(a[`aria-hidden`]=`true`,a.focusable=`false`),`<svg ${Object.entries(a).map(([e,t])=>`${e}="${Ln(t)}"`).join(` `)}>${n?`<title>${Ln(n)}</title>`:``}<path fill="currentColor" d="${Ln(e.path)}"/></svg>`},Bn=e({alignCenter:()=>at,alignJustify:()=>ot,alignLeft:()=>st,alignRight:()=>ct,arrowDown:()=>lt,arrowLeft:()=>ut,arrowRight:()=>dt,arrowRotateLeft:()=>ft,arrowRotateRight:()=>pt,arrowUp:()=>mt,arrowUpRightFromSquare:()=>ht,arrowsRotate:()=>pn,asterisk:()=>gt,bold:()=>_t,bracketsCurly:()=>vt,calendar:()=>yt,caretDown:()=>bt,caretUp:()=>xt,check:()=>St,chevronDown:()=>Ct,chevronLeft:()=>wt,chevronRight:()=>Tt,chevronUp:()=>Et,circle:()=>Dt,circleCheck:()=>Ot,circleExclamation:()=>kt,circleInfo:()=>At,circlePlus:()=>dn,clipboard:()=>jt,clock:()=>Mt,clone:()=>Nt,code:()=>Pt,copy:()=>Ft,download:()=>It,ellipsis:()=>Lt,ellipsisVertical:()=>Tn,eye:()=>Rt,fileDashedLine:()=>zt,flagCheckered:()=>Bt,gear:()=>En,getIcon:()=>Pn,getIconNames:()=>Nn,gripDots:()=>Ht,gripDotsVertical:()=>Ut,gripMove:()=>Vt,h1:()=>Wt,h2:()=>Gt,h3:()=>Kt,h4:()=>qt,h5:()=>Jt,h6:()=>Yt,heading:()=>sn,highlighter:()=>Xt,house:()=>Zt,iconToSvg:()=>zn,iconViewBox:()=>Rn,icons:()=>kn,italic:()=>Qt,lightbulb:()=>$t,link:()=>en,list:()=>nn,listOl:()=>rn,listUl:()=>an,lock:()=>tn,magnifyingGlass:()=>mn,minus:()=>on,normalizeIconName:()=>jn,paragraph:()=>cn,pen:()=>ln,penToSquare:()=>Dn,plus:()=>un,quoteRight:()=>fn,registerIcon:()=>Fn,registerIcons:()=>In,share:()=>hn,sliders:()=>gn,strikethrough:()=>_n,subscript:()=>vn,superscript:()=>yn,table:()=>bn,textSlash:()=>xn,trash:()=>On,triangleExclamation:()=>Sn,underline:()=>Cn,xmark:()=>wn}),Vn=[Be,Ye,Ze(),Xe(`.button`),Qe(),$e(`.button`),l`
        @layer pk-component {
            :host {
                font-family: var(--pk-font-family);
                cursor: pointer;
                --pk-btn-height: var(--pk-btn-height-default);
                --pk-btn-font: var(--pk-btn-font-default);
                --pk-btn-padding-inline: var(--pk-btn-padding-inline-default);
                --pk-btn-icon-size: var(--pk-btn-icon-size-default);
                --pk-btn-icon-gap: var(--pk-btn-icon-gap-default);
                --pk-btn-caret-size: var(--pk-btn-caret-size-default);
                --pk-btn-radius: var(--pk-btn-radius-default);
                /*
                 * Slotted labels inherit from the host — pin the size-token font
                 * (and button line-height) so Craft CP / Tailwind hosts match.
                 */
                font-size: var(--pk-btn-font);
                line-height: 1.2;
            }

            :host([disabled]) {
                cursor: not-allowed;
                pointer-events: none;
            }

            :host([loading]):not([disabled]) {
                pointer-events: none;
            }

            .button {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                gap: var(--pk-btn-icon-gap);
                box-sizing: border-box;
                width: auto;
                margin: 0;
                /* Every button carries a 1px border (transparent for fill/plain variants) so the box
                 * model is identical across variants and states. Prevents width shift when swapping a
                 * button between filled and outline/dashed, or toggling states. Matches Bootstrap
                 * (transparent baseline) and  (border always present, only color changes).
                 */
                border: 1px solid transparent;
                border-radius: var(--pk-btn-radius);
                font: inherit;
                font-size: var(--pk-btn-font);
                font-weight: 400;
                line-height: 1.2;
                text-decoration: none;
                white-space: nowrap;
                /* Inherit host cursor so className/style (e.g. cursor-move) pierce shadow. */
                cursor: inherit;
                user-select: none;
                vertical-align: middle;
                appearance: none;
                background: var(--pk-btn-fill, var(--pk-action-fill));
                color: var(--pk-btn-on, var(--pk-action-on));
                height: var(--pk-btn-height);
                min-height: var(--pk-btn-height);
                /* Block padding defaults to 0 (height tokens center content). Override for nav rows. */
                padding-block: var(--pk-btn-padding-block, 0);
                padding-inline: var(--pk-btn-padding-inline);
                transition: background-color 0.12s ease, box-shadow 0.12s ease, color 0.12s ease;
            }

            .button:disabled {
                opacity: 0.5;
            }

            .icon-slot {
                display: none;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
                line-height: 0;
            }

            .icon-slot--has-content {
                display: inline-flex;
            }

            /* Fixed token sizes for all icons (labeled or icon-only) — matches plugin-kit-react Button. */
            .icon-slot slot::slotted(svg),
            slot[name='start']::slotted(svg),
            slot[name='end']::slotted(svg) {
                display: block;
                width: var(--pk-btn-icon-size);
                height: var(--pk-btn-icon-size);
                flex-shrink: 0;
                pointer-events: none;
            }

            .icon-slot slot::slotted(img),
            slot[name='start']::slotted(img),
            slot[name='end']::slotted(img) {
                display: block;
                width: var(--pk-btn-icon-size);
                height: var(--pk-btn-icon-size);
                object-fit: contain;
                flex-shrink: 0;
                pointer-events: none;
            }

            /* pk-icon sizes itself from font-size (1em), so scale it to the
             * icon token. This keeps the idiomatic slotted pk-icon usage in
             * sync with raw slotted svg. Set width/height explicitly — %/size-full
             * collapses when the icon-slot has no definite box.
             */
            .icon-slot slot::slotted(pk-icon),
            slot[name='start']::slotted(pk-icon),
            slot[name='end']::slotted(pk-icon) {
                font-size: var(--pk-btn-icon-size);
                width: var(--pk-btn-icon-size);
                height: var(--pk-btn-icon-size);
                /* Kill pk-icon's text-baseline nudge (-0.125em) — flex slots center optically. */
                vertical-align: 0;
                flex-shrink: 0;
                pointer-events: none;
            }

            .label {
                display: inline-flex;
                align-items: center;
                min-width: 0;
                line-height: 1.2;
            }

            /* Trailing slot (status): grow + clip the label so end sits at the far edge
             * and long titles truncate instead of colliding with the indicator.
             */
            .button:has(.icon-slot--end.icon-slot--has-content) .label:not(.is-empty) {
                flex: 1 1 auto;
                overflow: hidden;
            }

            .label.is-empty {
                display: none;
            }

            /* Icon-only (no label): square hit box = size height. Button owns the target;
             * glyph size comes from --pk-btn-icon-size. Do not Tailwind-size the Icon.
             * Opt out with icon (compact), size=none, or group-trigger (narrow disclosure cap).
             */
            :host(:not([icon]):not([size='none']):not([group-trigger])) .button:not(.has-label) {
                width: var(--pk-btn-height);
                min-width: var(--pk-btn-height);
                padding-inline: 0;
            }

            /* Compact density (icon attr): padless box that hugs the glyph.
             * size still drives --pk-btn-icon-size; height/width tiers do not apply.
             * Use for dense x / ellipsis in cells — not for table action rows (prefer square above).
             * line-height: 0 collapses whitespace flex-struts so the glyph sits dead-center.
             */
            :host([icon]) {
                display: inline-flex;
                line-height: 0;
                vertical-align: middle;
            }

            :host([icon]) .button {
                display: flex;
                width: auto;
                min-width: 0;
                height: auto;
                min-height: 0;
                padding-inline: 0.25rem;
                padding-block: 0;
                line-height: 0;
                align-items: center;
                justify-content: center;
            }

            /* Keep label space while loading even before slotchange runs. */
            .button.loading .label.is-empty {
                display: inline-flex;
                visibility: hidden;
            }

            /* Sizes — token-driven scale (see tokens.css) */
            :host([size='xxs']) {
                --pk-btn-height: var(--pk-btn-height-xxs);
                --pk-btn-font: var(--pk-btn-font-xxs);
                --pk-btn-padding-inline: var(--pk-btn-padding-inline-xxs);
                --pk-btn-icon-size: var(--pk-btn-icon-size-xxs);
                --pk-btn-icon-gap: var(--pk-btn-icon-gap-xxs);
                --pk-btn-caret-size: var(--pk-btn-caret-size-xxs);
                --pk-btn-radius: var(--pk-btn-radius-xxs);
            }

            :host([size='xs']) {
                --pk-btn-height: var(--pk-btn-height-xs);
                --pk-btn-font: var(--pk-btn-font-xs);
                --pk-btn-padding-inline: var(--pk-btn-padding-inline-xs);
                --pk-btn-icon-size: var(--pk-btn-icon-size-xs);
                --pk-btn-icon-gap: var(--pk-btn-icon-gap-xs);
                --pk-btn-caret-size: var(--pk-btn-caret-size-xs);
                --pk-btn-radius: var(--pk-btn-radius-xs);
            }

            :host([size='sm']) {
                --pk-btn-height: var(--pk-btn-height-sm);
                --pk-btn-font: var(--pk-btn-font-sm);
                --pk-btn-padding-inline: var(--pk-btn-padding-inline-sm);
                --pk-btn-icon-size: var(--pk-btn-icon-size-sm);
                --pk-btn-icon-gap: var(--pk-btn-icon-gap-sm);
                --pk-btn-caret-size: var(--pk-btn-caret-size-sm);
                --pk-btn-radius: var(--pk-btn-radius-sm);
            }

            :host([size='default']) {
                --pk-btn-height: var(--pk-btn-height-default);
                --pk-btn-font: var(--pk-btn-font-default);
                --pk-btn-padding-inline: var(--pk-btn-padding-inline-default);
                --pk-btn-icon-size: var(--pk-btn-icon-size-default);
                --pk-btn-icon-gap: var(--pk-btn-icon-gap-default);
                --pk-btn-caret-size: var(--pk-btn-caret-size-default);
                --pk-btn-radius: var(--pk-btn-radius-default);
            }

            :host([size='lg']) {
                --pk-btn-height: var(--pk-btn-height-lg);
                --pk-btn-font: var(--pk-btn-font-lg);
                --pk-btn-padding-inline: var(--pk-btn-padding-inline-lg);
                --pk-btn-icon-size: var(--pk-btn-icon-size-lg);
                --pk-btn-icon-gap: var(--pk-btn-icon-gap-lg);
                --pk-btn-caret-size: var(--pk-btn-caret-size-lg);
                --pk-btn-radius: var(--pk-btn-radius-lg);
            }

            :host([size='xl']) {
                --pk-btn-height: var(--pk-btn-height-xl);
                --pk-btn-font: var(--pk-btn-font-xl);
                --pk-btn-padding-inline: var(--pk-btn-padding-inline-xl);
                --pk-btn-icon-size: var(--pk-btn-icon-size-xl);
                --pk-btn-icon-gap: var(--pk-btn-icon-gap-xl);
                --pk-btn-caret-size: var(--pk-btn-caret-size-xl);
                --pk-btn-radius: var(--pk-btn-radius-xl);
            }

            /* No preset scale — size to content or set --pk-btn-* on the host for one-off dimensions
             * (height, padding, font, icon, radius) without fighting a named size tier.
             * Pair with icon for a padless glyph host, or set --pk-btn-padding-inline / --pk-btn-height yourself.
             */
            :host([size='none']) {
                --pk-btn-height: auto;
                --pk-btn-font: inherit;
                --pk-btn-padding-inline: 0px;
                --pk-btn-padding-block: 0px;
                --pk-btn-icon-size: 1em;
                --pk-btn-icon-gap: 0px;
                --pk-btn-caret-size: 1em;
                --pk-btn-radius: 0px;
            }

            :host([size='none']) .button {
                height: auto;
                min-height: auto;
                width: 100%;
            }

            /* Variants */
            :host([variant='default']) {
                --pk-btn-fill: var(--pk-action-fill);
                --pk-btn-fill-hover: var(--pk-action-fill-hover);
                --pk-btn-fill-active: var(--pk-action-fill-active);
                --pk-btn-on: var(--pk-action-on);
            }

            :host([variant='primary']) {
                --pk-btn-fill: var(--pk-action-primary-fill);
                --pk-btn-fill-hover: var(--pk-action-primary-fill-hover);
                --pk-btn-fill-active: var(--pk-action-primary-fill-active);
                --pk-btn-on: var(--pk-action-primary-on);
            }

            :host([variant='primary']) .button,
            :host([variant='secondary']) .button {
                -moz-osx-font-smoothing: grayscale;
                -webkit-font-smoothing: antialiased;
            }

            :host([variant='secondary']) {
                --pk-btn-fill: var(--pk-color-gray-500);
                --pk-btn-fill-hover: var(--pk-color-gray-550);
                --pk-btn-fill-active: var(--pk-color-gray-600);
                --pk-btn-on: var(--pk-color-white);
            }

            :host([variant='outline']) .button {
                background: transparent;
                border-color: var(--pk-color-slate-400);
                color: var(--pk-color-gray-700);
            }

            :host([variant='transparent']) .button {
                background: transparent;
                color: var(--pk-color-gray-700);
            }

            /* link/none opt out of the shared transparent 1px border: they never render a border, so
             * carrying one only pads the box by 2px inline (and 2px block at size='none', where height
             * is auto). These are the "inline text" / "no chrome" variants — content-sized is the point,
             * and neither participates in button-group border joins. Other variants keep the stable box.
             */
            /*
             * Craft CP sets --link-color on :root (inherits into shadow). Prefer that,
             * then kit --pk-color-link — not sky-700 (reads as a different “CP blue”).
             * Color on :host so consumer utilities (e.g. text-[var(--link-color)]) can override.
             * Height must be content-sized — default --pk-btn-height (34px) bloated table rows.
             */
            :host([variant='link']) {
                color: var(--link-color, var(--pk-color-link));
                --pk-btn-height: auto;
                --pk-btn-padding-inline: 0;
                --pk-btn-padding-block: 0;
            }

            :host([variant='link']) .button {
                background: transparent;
                border-width: 0;
                border-radius: 0;
                color: inherit;
                width: auto;
                height: auto;
                min-height: 0;
                padding: 0;
                text-underline-offset: 2px;
            }

            :host([variant='dashed']) .button {
                background: transparent;
                border-style: dashed;
                border-color: var(--pk-color-slate-500);
                color: var(--pk-color-gray-700);
            }

            :host([variant='none']) .button {
                border-width: 0;
                border-radius: 0;
                background: transparent;
                color: inherit;
            }

            /* Interaction — pseudo-classes only; playground matrices use dev/pk-button-demo-states.css */
            .button:hover:not(:disabled) {
                background: var(--pk-btn-fill-hover, var(--pk-btn-fill));
            }

            :host([variant='outline']) .button:hover:not(:disabled),
            :host([variant='transparent']) .button:hover:not(:disabled),
            :host([variant='dashed']) .button:hover:not(:disabled) {
                background: var(--pk-color-slate-150);
            }

            :host([variant='link']) .button:hover:not(:disabled) {
                background: transparent;
                text-decoration: underline;
            }

            :host([variant='none']) .button:hover:not(:disabled) {
                background: transparent;
            }

            .button:active:not(:disabled) {
                background: var(--pk-btn-fill-active, var(--pk-btn-fill-hover, var(--pk-btn-fill)));
            }

            :host([variant='outline']) .button:active:not(:disabled),
            :host([variant='transparent']) .button:active:not(:disabled),
            :host([variant='dashed']) .button:active:not(:disabled) {
                background: var(--pk-color-slate-200);
            }

            :host([variant='link']) .button:active:not(:disabled),
            :host([variant='none']) .button:active:not(:disabled) {
                background: transparent;
            }

            .button:focus {
                outline: none;
            }

            .button:focus-visible {
                box-shadow: var(--pk-shadow-focus);
            }

            /* Bordered variants: fold the button's own border into the focus ring by recoloring it to
             * the accent (and solidifying dashed) so focus reads as one cohesive ring instead of a
             * doubled border. The ring is thinned to 1px here because the recolored 1px border already
             * supplies the other half — total 2px, matching the filled variants' ring weight.
             */
            :host([variant='outline']) .button:focus-visible,
            :host([variant='dashed']) .button:focus-visible {
                border-color: var(--pk-color-sky-600);
                box-shadow: 0 0 0 1px var(--pk-color-sky-600), 0 0 5px 1px hsl(from var(--pk-color-sky-600) h s l / 0.7);
            }

            :host([variant='dashed']) .button:focus-visible {
                border-style: solid;
            }

            :host(.pk-dialog__close) .button:focus-visible {
                box-shadow: 0 0 0 2px var(--pk-color-gray-600);
            }

            :host-context(pk-button-group) {
                position: relative;
            }

            :host-context(pk-button-group[orientation='vertical']) {
                display: block;
                width: 100%;
                max-width: 100%;
                box-sizing: border-box;
            }

            :host-context(pk-button-group[orientation='vertical']) .button {
                width: 100%;
                box-sizing: border-box;
            }

            :host-context(pk-button-group:focus-visible) {
                z-index: 2;
            }

            /* Bordered variants — matching border divider (filled uses margin gap via buttonGroupIndentStyles) */

            :host([variant='primary']) .button:focus-visible,
            :host([variant='secondary']) .button:focus-visible {
                box-shadow: var(--pk-shadow-focus-inset);
            }

            :host-context(pk-button-group[exclusive]):host([aria-pressed='true']) .button {
                background: var(--pk-color-gray-500);
                color: var(--pk-color-white);
            }

            :host-context(pk-button-group[exclusive]):host([aria-pressed='true']) .button:hover:not(:disabled) {
                background: var(--pk-color-gray-550);
            }

            :host-context(pk-button-group[exclusive]):host([aria-pressed='true']) .button:active:not(:disabled) {
                background: var(--pk-color-gray-600);
            }

            :host-context(pk-button-group[exclusive]):host([aria-pressed='true']) .button:focus-visible {
                box-shadow: var(--pk-shadow-focus);
            }

            :host([variant='link']) .button:focus-visible {
                box-shadow: none;
                text-decoration: underline;
            }

            .button.loading {
                position: relative;
                cursor: default;
                pointer-events: none;
            }

            .label.loading {
                visibility: hidden;
            }

            .button.loading .icon-slot,
            .button.loading slot[name='start']::slotted(*),
            .button.loading slot[name='end']::slotted(*) {
                visibility: hidden;
            }

            .button.caret .icon-slot--end.icon-slot--has-content {
                display: none;
            }

            /* Scope to the caret span — the button host also gets class caret when
               with-caret is set; an unscoped .caret rule was adding 2px margin
               to the whole button and shifting dropdown anchors left. */
            .button > .caret {
                display: inline-flex;
                align-self: center;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
                line-height: 0;
                /* Sits slightly further from the label than the flex gap alone. */
                margin-inline-start: 2px;
            }

            /* Caret has its own per-size token (--pk-btn-caret-size), kept deliberately smaller than
             * --pk-btn-icon-size so it reads as a subordinate dropdown affordance next to real icons.
             */
            .button > .caret svg {
                display: block;
                width: var(--pk-btn-caret-size);
                height: var(--pk-btn-caret-size);
            }

            :host([group-trigger]) .button {
                padding-inline: 6px;
            }

            /* Compact disclosure cap — hide content, keep only the shared SVG caret (centered). */
            :host([group-trigger]) .label,
            :host([group-trigger]) .icon-slot {
                display: none;
            }

            :host([group-trigger]) .button > .caret {
                margin-inline-start: 0;
            }

            :host([size='sm'][group-trigger]) .button,
            :host([size='xs'][group-trigger]) .button,
            :host([size='xxs'][group-trigger]) .button {
                padding-inline: 6px;
            }

            :host([size='lg'][group-trigger]) .button {
                padding-inline: 10px;
            }

            :host([size='xl'][group-trigger]) .button {
                padding-inline: 12px;
            }

            :host-context(pk-button-group[orientation='horizontal']):host([data-pk-group-join]:not([data-pk-group-divider])[variant='outline']) .button,
            :host-context(pk-button-group[orientation='horizontal']):host([data-pk-group-join]:not([data-pk-group-divider])[variant='dashed']) .button,
            :host-context(pk-button-group[orientation='horizontal']):host([data-pk-group-join]:not([data-pk-group-divider])[variant='transparent']) .button {
                border-left-width: 0;
            }

            :host-context(pk-button-group[orientation='vertical']):host([data-pk-group-join]:not([data-pk-group-divider])[variant='outline']) .button,
            :host-context(pk-button-group[orientation='vertical']):host([data-pk-group-join]:not([data-pk-group-divider])[variant='dashed']) .button,
            :host-context(pk-button-group[orientation='vertical']):host([data-pk-group-join]:not([data-pk-group-divider])[variant='transparent']) .button {
                border-top-width: 0;
            }

            :host([data-pk-group-orientation='horizontal'][data-pk-group-join]:not([data-pk-group-divider])[variant='outline']) .button,
            :host([data-pk-group-orientation='horizontal'][data-pk-group-join]:not([data-pk-group-divider])[variant='dashed']) .button,
            :host([data-pk-group-orientation='horizontal'][data-pk-group-join]:not([data-pk-group-divider])[variant='transparent']) .button {
                border-left-width: 0;
            }

            :host([data-pk-group-orientation='vertical'][data-pk-group-join]:not([data-pk-group-divider])[variant='outline']) .button,
            :host([data-pk-group-orientation='vertical'][data-pk-group-join]:not([data-pk-group-divider])[variant='dashed']) .button,
            :host([data-pk-group-orientation='vertical'][data-pk-group-join]:not([data-pk-group-divider])[variant='transparent']) .button {
                border-top-width: 0;
            }

            :host([data-pk-group-orientation='horizontal'][data-pk-group-divider][variant='outline']) .button {
                box-shadow: none;
                border-left-width: 1px;
                border-left-style: solid;
                border-left-color: var(--pk-btn-group-divider-color-outline, var(--pk-color-slate-400));
            }

            :host([data-pk-group-orientation='vertical'][data-pk-group-divider][variant='outline']) .button {
                box-shadow: none;
                border-top-width: 1px;
                border-top-style: solid;
                border-top-color: var(--pk-btn-group-divider-color-outline, var(--pk-color-slate-400));
            }

            :host([data-pk-group-orientation='horizontal'][data-pk-group-divider][variant='dashed']) .button {
                box-shadow: none;
                border-left-width: 1px;
                border-left-style: dashed;
                border-left-color: var(--pk-btn-group-divider-color-dashed, var(--pk-color-slate-500));
            }

            :host([data-pk-group-orientation='vertical'][data-pk-group-divider][variant='dashed']) .button {
                box-shadow: none;
                border-top-width: 1px;
                border-top-style: dashed;
                border-top-color: var(--pk-btn-group-divider-color-dashed, var(--pk-color-slate-500));
            }

            :host([data-pk-group-orientation='horizontal'][data-pk-group-divider][variant='outline']) .button:focus-visible,
            :host([data-pk-group-orientation='horizontal'][data-pk-group-divider][variant='dashed']) .button:focus-visible {
                box-shadow: var(--pk-shadow-focus);
            }

            :host([data-pk-group-orientation='vertical'][data-pk-group-divider][variant='outline']) .button:focus-visible,
            :host([data-pk-group-orientation='vertical'][data-pk-group-divider][variant='dashed']) .button:focus-visible {
                box-shadow: var(--pk-shadow-focus);
            }

            :host([data-pk-group-orientation='horizontal'][data-pk-group-internal-trail][variant='outline']) .button,
            :host([data-pk-group-orientation='horizontal'][data-pk-group-internal-trail][variant='dashed']) .button {
                border-right-width: 0;
            }

            :host([data-pk-group-orientation='vertical'][data-pk-group-internal-trail][variant='outline']) .button,
            :host([data-pk-group-orientation='vertical'][data-pk-group-internal-trail][variant='dashed']) .button {
                border-bottom-width: 0;
            }
        }
    `],Hn=zn(Ct),B=class extends M{constructor(...e){super(...e),this.variant=`default`,this.size=`default`,this.disabled=!1,this.loading=!1,this.withCaret=!1,this.groupTrigger=!1,this.icon=!1,this.title=``,this.type=`button`,this.hasDefaultSlotContent=!1,this.hasStartSlotContent=!1,this.hasEndSlotContent=!1,this.startSlotChanged=e=>{this.iconSlotChanged(e,`start`)},this.endSlotChanged=e=>{this.iconSlotChanged(e,`end`)},this.handleHostClick=e=>{if(this.disabled||this.loading||this.href||this.type!==`submit`&&this.type!==`reset`)return;let t=this.resolveAssociatedForm();if(t){if(e.preventDefault(),e.stopPropagation(),this.type===`reset`){t.reset();return}if(typeof t.requestSubmit==`function`){t.requestSubmit();return}t.dispatchEvent(new Event(`submit`,{bubbles:!0,cancelable:!0}))}}}static{this.shadowRootOptions={mode:`open`,delegatesFocus:!0}}static{this.styles=Vn}defaultSlotChanged(e){let t=e.target;this.hasDefaultSlotContent=t.assignedNodes({flatten:!0}).some(e=>e.nodeType===Node.TEXT_NODE?e.textContent?.trim():e.nodeType===Node.ELEMENT_NODE)}iconSlotChanged(e,t){let n=e.target.assignedNodes({flatten:!0}).some(e=>e.nodeType===Node.TEXT_NODE?e.textContent?.trim():e.nodeType===Node.ELEMENT_NODE);t===`start`?this.hasStartSlotContent=n:this.hasEndSlotContent=n}buttonClasses(){return R({button:!0,"has-label":this.hasDefaultSlotContent,loading:this.loading,caret:this.withCaret,"group-trigger":this.groupTrigger})}connectedCallback(){super.connectedCallback(),this.setAttribute(`data-slot`,`button`),this.addEventListener(`click`,this.handleHostClick)}disconnectedCallback(){this.removeEventListener(`click`,this.handleHostClick),super.disconnectedCallback()}resolveAssociatedForm(){let e=(this.form||this.getAttribute(`form`)||``).trim();if(e){let t=this.ownerDocument?.getElementById(e);if(t instanceof HTMLFormElement&&t.id!==`main`)return t}let t=this.closest(`form`);return t&&t.id!==`main`?t:null}render(){let e=this.spinnerSize||He(this.size),t=Ue(this.variant,this.spinnerVariant);return k`
            ${this.href?k`
                    <a
                        part="base"
                        class=${this.buttonClasses()}
                        href=${this.href}
                        target=${this.target??j}
                        rel=${this.rel??j}
                        title=${this.title||j}
                    >
                        ${this.renderInner(e,t)}
                    </a>
                `:k`
                    <button
                        part="base"
                        class=${this.buttonClasses()}
                        type=${this.type}
                        ?disabled=${this.disabled}
                        aria-disabled=${this.disabled?`true`:j}
                        aria-busy=${this.loading?`true`:j}
                        name=${this.name??j}
                        value=${this.value??j}
                        title=${this.title||j}
                    >
                        ${this.renderInner(e,t)}
                    </button>
                `}
        `}renderInner(e,t){return k`
            <span
                class=${R({"icon-slot":!0,"icon-slot--start":!0,"icon-slot--has-content":this.hasStartSlotContent})}
            >
                <slot name="start" @slotchange=${this.startSlotChanged}></slot>
            </span>
            ${this.loading?k`
                    <pk-spinner
                        variant=${t}
                        size=${e}
                        tone=${this.spinnerTone??j}
                        centered
                    ></pk-spinner>
                `:j}
            <span
                class=${R({label:!0,"is-empty":!this.hasDefaultSlotContent,loading:this.loading})}
            >
                <slot @slotchange=${this.defaultSlotChanged}></slot>
            </span>
            <span
                class=${R({"icon-slot":!0,"icon-slot--end":!0,"icon-slot--has-content":this.hasEndSlotContent})}
            >
                <slot name="end" @slotchange=${this.endSlotChanged}></slot>
            </span>
            ${this.withCaret||this.groupTrigger?k`<span part="caret" class="caret">${z(Hn)}</span>`:j}
        `}};N([F({reflect:!0})],B.prototype,`variant`,void 0),N([F({reflect:!0})],B.prototype,`size`,void 0),N([F({type:Boolean,reflect:!0})],B.prototype,`disabled`,void 0),N([F({type:Boolean,reflect:!0})],B.prototype,`loading`,void 0),N([F({reflect:!0,attribute:`spinner-size`})],B.prototype,`spinnerSize`,void 0),N([F({reflect:!0,attribute:`spinner-variant`})],B.prototype,`spinnerVariant`,void 0),N([F({reflect:!0,attribute:`spinner-tone`})],B.prototype,`spinnerTone`,void 0),N([F({type:Boolean,reflect:!0,attribute:`with-caret`})],B.prototype,`withCaret`,void 0),N([F({type:Boolean,reflect:!0,attribute:`group-trigger`})],B.prototype,`groupTrigger`,void 0),N([F({type:Boolean,reflect:!0})],B.prototype,`icon`,void 0),N([F()],B.prototype,`href`,void 0),N([F()],B.prototype,`target`,void 0),N([F()],B.prototype,`rel`,void 0),N([F()],B.prototype,`name`,void 0),N([F()],B.prototype,`value`,void 0),N([F()],B.prototype,`title`,void 0),N([F()],B.prototype,`type`,void 0),N([F({reflect:!0})],B.prototype,`form`,void 0),N([I()],B.prototype,`hasDefaultSlotContent`,void 0),N([I()],B.prototype,`hasStartSlotContent`,void 0),N([I()],B.prototype,`hasEndSlotContent`,void 0),B=N([P(`pk-button`)],B);var Un=(e,t={})=>zn(e,{title:t.title}),Wn=(e,t={})=>{let n=document.createElement(`template`);n.innerHTML=Un(e,t);let r=n.content.firstElementChild;if(!(r instanceof SVGSVGElement))throw Error(`Icon render did not produce an SVG element.`);return r},Gn=Object.defineProperty,Kn=Object.getOwnPropertyDescriptor,qn=Object.getOwnPropertyNames,Jn=Object.prototype.hasOwnProperty,Yn=(e,t)=>{let n={};for(var r in e)Gn(n,r,{get:e[r],enumerable:!0});return t||Gn(n,Symbol.toStringTag,{value:`Module`}),n},Xn=(e,t,n,r)=>{if(t&&typeof t==`object`||typeof t==`function`)for(var i=qn(t),a=0,o=i.length,s;a<o;a++)s=i[a],!Jn.call(e,s)&&s!==n&&Gn(e,s,{get:(e=>t[e]).bind(null,s),enumerable:!(r=Kn(t,s))||r.enumerable});return e},Zn=(e,t,n)=>(Xn(e,t,`default`),n&&Xn(n,t,`default`)),Qn=`M64 64C28.7 64 0 92.7 0 128L0 384c0 35.3 28.7 64 64 64l208 0 32 0 16 0 256 0c35.3 0 64-28.7 64-64l0-256c0-35.3-28.7-64-64-64L320 64l-16 0-32 0L64 64zm512 48c8.8 0 16 7.2 16 16l0 256c0 8.8-7.2 16-16 16l-256 0 0-288 256 0zM178.3 175.9l64 144c4.5 10.1-.1 21.9-10.2 26.4s-21.9-.1-26.4-10.2L196.8 316l-73.6 0-8.9 20.1c-4.5 10.1-16.3 14.6-26.4 10.2s-14.6-16.3-10.2-26.4l64-144c3.2-7.2 10.4-11.9 18.3-11.9s15.1 4.7 18.3 11.9zM179 276l-19-42.8L141 276l38 0zM456 164c-11 0-20 9-20 20l0 4-52 0c-11 0-20 9-20 20s9 20 20 20l72 0 35.1 0c-7.3 16.7-17.4 31.9-29.8 45l-.5-.5-14.6-14.6c-7.8-7.8-20.5-7.8-28.3 0s-7.8 20.5 0 28.3L430 298.3c-5.9 3.6-12.1 6.9-18.5 9.8l-3.6 1.6c-10.1 4.5-14.6 16.3-10.2 26.4s16.3 14.6 26.4 10.2l3.6-1.6c12-5.3 23.4-11.8 34-19.4c4.3 3 8.6 5.8 13.1 8.5l18.9 11.3c9.5 5.7 21.8 2.6 27.4-6.9s2.6-21.8-6.9-27.4l-18.9-11.3c-.9-.5-1.8-1.1-2.7-1.6c17.2-18.8 30.7-40.9 39.6-65.4L534 228l2 0c11 0 20-9 20-20s-9-20-20-20l-16 0-44 0 0-4c0-11-9-20-20-20z`,$n=()=>{let e=document.createElementNS(`http://www.w3.org/2000/svg`,`svg`);e.setAttribute(`aria-hidden`,`true`),e.setAttribute(`xmlns`,`http://www.w3.org/2000/svg`),e.setAttribute(`viewBox`,`0 0 640 512`);let t=document.createElementNS(`http://www.w3.org/2000/svg`,`path`);return t.setAttribute(`d`,Qn),e.append(t),e},er=Yn({createIconElement:()=>Wn,createTranslationIconElement:()=>$n,renderIconHtml:()=>Un});Zn(er,Bn);var tr=[`aria-labelledby`,`aria-describedby`,`aria-invalid`,`aria-errormessage`,`aria-required`,`aria-label`];function nr(e){return e.hasAttribute(`aria-labelledby`)||e.hasAttribute(`aria-describedby`)||e.hasAttribute(`aria-errormessage`)}function rr(e,t){for(let n of tr){let r=e.getAttribute(n);r===null?t.removeAttribute(n):t.setAttribute(n,r)}}function ir({control:e,labelId:t,instructionsId:n,hasLabel:r,hasInstructions:i,required:a=!1,invalid:o=!1}){r&&t?e.setAttribute(`aria-labelledby`,t):e.removeAttribute(`aria-labelledby`),i&&n?e.setAttribute(`aria-describedby`,n):e.removeAttribute(`aria-describedby`),a?e.setAttribute(`aria-required`,`true`):e.removeAttribute(`aria-required`),o?e.setAttribute(`aria-invalid`,`true`):e.removeAttribute(`aria-invalid`),e.removeAttribute(`aria-errormessage`)}var ar=class{constructor(e,t,n){this.host=e,this.getTarget=t,this.onSync=n}connect(){this.sync(),this.observer=new MutationObserver(()=>{this.sync()}),this.observer.observe(this.host,{attributes:!0,attributeFilter:[...tr]})}disconnect(){this.observer?.disconnect(),this.observer=void 0}sync(){if(!nr(this.host)){this.onSync?.();return}let e=this.getTarget();e&&rr(this.host,e)}},or=class extends Event{constructor(){super(`pk-invalid`,{bubbles:!0,cancelable:!1,composed:!0})}};function sr(){return{observedAttributes:[`custom-error`],checkValidity(e){let t={message:``,isValid:!0,invalidKeys:[]};return e.customError&&(t.message=e.customError,t.isValid=!1,t.invalidKeys.push(`customError`)),t}}}var cr=class extends M{static{this.formAssociated=!0}static get validators(){return[sr()]}static get observedAttributes(){let e=new Set(super.observedAttributes??[]);for(let t of this.validators)for(let n of t.observedAttributes??[])e.add(n);return[...e]}constructor(){super(),this.internals=this.attachInternals(),this.assumeInteractionOn=[`input`],this.validators=[],this.name=null,this.disabled=!1,this.required=!1,this.customError=null,this.valueHasChanged=!1,this.hasInteracted=!1,this.emittedEvents=[],this.emitInvalid=e=>{e.target===this&&(this.hasInteracted=!0,this.dispatchEvent(new or))},this.handleInteraction=e=>{this.emittedEvents.includes(e.type)||this.emittedEvents.push(e.type),this.emittedEvents.length>=this.assumeInteractionOn.length&&(this.hasInteracted=!0,this.updateValidity())},this.addEventListener(`invalid`,this.emitInvalid)}connectedCallback(){super.connectedCallback();for(let e of this.assumeInteractionOn)this.addEventListener(e,this.handleInteraction);this.updateValidity()}disconnectedCallback(){this.hostAriaMirror?.disconnect(),this.hostAriaMirror=void 0;for(let e of this.assumeInteractionOn)this.removeEventListener(e,this.handleInteraction);this.removeEventListener(`invalid`,this.emitInvalid),super.disconnectedCallback()}updated(e){e.has(`customError`)&&this.setCustomValidity(this.customError??``),e.has(`disabled`)&&this.setState(`disabled`,!!this.disabled),(e.has(`value`)||e.has(`disabled`)||e.has(`required`)||e.has(`name`))&&this.syncFormValue(),this.updateValidity(),super.updated(e),this.syncHostAriaMirror()}firstUpdated(e){super.firstUpdated(e),this.connectHostAriaMirror()}getAriaMirrorTarget(){return this.input??null}syncStandaloneAria(){}connectHostAriaMirror(){this.hostAriaMirror?.disconnect(),this.hostAriaMirror=new ar(this,()=>this.getAriaMirrorTarget(),()=>this.syncStandaloneAria()),this.hostAriaMirror.connect()}syncHostAriaMirror(){this.hostAriaMirror?.sync()}formResetCallback(){this.resetValidity(),this.hasInteracted=!1,this.valueHasChanged=!1,this.emittedEvents=[],this.resetToDefaultValue(),this.syncFormValue(),this.updateValidity()}formDisabledCallback(e){this.disabled=e,this.updateValidity()}formStateRestoreCallback(e,t){this.restoreFormState(e),this.syncFormValue(),this.updateValidity()}set form(e){e?this.setAttribute(`form`,e):this.removeAttribute(`form`)}get form(){return this.internals.form}get labels(){return this.internals.labels}get validity(){return this.internals.validity}get willValidate(){return this.internals.willValidate}get validationMessage(){return this.internals.validationMessage}getForm(){return this.internals.form}checkValidity(){return this.updateValidity(),this.internals.checkValidity()}reportValidity(){return this.updateValidity(),this.hasInteracted=!0,this.internals.reportValidity()}resetValidity(){this.setCustomValidity(``),this.internals.setValidity({}),this.syncCustomStates()}setCustomValidity(e){if(!e){this.customError=null,this.internals.setValidity({}),this.syncCustomStates();return}this.customError=e;let t=this.validationTarget;t instanceof HTMLElement?this.internals.setValidity({customError:!0},e,t):this.internals.setValidity({customError:!0},e),this.syncCustomStates()}get validationTarget(){return this.input}get allValidators(){return[...this.constructor.validators??[],...this.validators??[]]}setFormValue(e,t){this.internals.setFormValue(e,t??e)}setValue(e,t){this.setFormValue(e,t??e)}updateValidity(){if(this.disabled||this.hasAttribute(`disabled`)||!this.willValidate){this.internals.setValidity({}),this.syncCustomStates();return}let e=this.allValidators;if(!e.length)return;let t={customError:!!this.customError},n=``,r=this.validationTarget;for(let r of e){let{isValid:e,message:i,invalidKeys:a}=r.checkValidity(this);if(!e){n||=i;for(let e of a)t[e]=!0}}n||=this.validationMessage,r instanceof HTMLElement?this.internals.setValidity(t,n,r):this.internals.setValidity(t,n),this.syncCustomStates()}syncCustomStates(){let e=this.internals.validity.valid;this.setState(`required`,this.required),this.setState(`optional`,!this.required),this.setState(`invalid`,!e),this.setState(`valid`,e),this.setState(`user-invalid`,!e&&this.hasInteracted),this.setState(`user-valid`,e&&this.hasInteracted)}setState(e,t){let n=this.internals.states;n&&(t?n.add(e):n.delete(e))}syncFormValue(){}resetToDefaultValue(){}restoreFormState(e){}};N([F({reflect:!0})],cr.prototype,`name`,void 0),N([F({type:Boolean,reflect:!0})],cr.prototype,`disabled`,void 0),N([F({type:Boolean,reflect:!0})],cr.prototype,`required`,void 0),N([F({attribute:`custom-error`,reflect:!0})],cr.prototype,`customError`,void 0),N([F({attribute:!1,state:!0})],cr.prototype,`valueHasChanged`,void 0),N([F({attribute:!1,state:!0})],cr.prototype,`hasInteracted`,void 0);function lr(){return{checkValidity(e){let t=e.input,n={message:``,isValid:!0,invalidKeys:[]};if(!t)return n;let r=!0;if(`checkValidity`in t&&typeof t.checkValidity==`function`&&(r=t.checkValidity()),r)return n;if(n.isValid=!1,`validationMessage`in t&&typeof t.validationMessage==`string`&&(n.message=t.validationMessage),!(`validity`in t)||!t.validity)return n.invalidKeys.push(`customError`),n;for(let e of Object.keys(t.validity)){if(e===`valid`)continue;let r=e;t.validity[r]&&n.invalidKeys.push(r)}return n}}}var ur=class{constructor(e,...t){this.host=e,this.boundSlots=new Set,this.lastHasContent=new Map,this.handleSlotChange=()=>{let e=!1;for(let t of this.slotNames){let n=this.test(t);this.lastHasContent.get(t)!==n&&(this.lastHasContent.set(t,n),e=!0)}e&&this.host.requestUpdate()},this.slotNames=t,e.addController(this)}hostConnected(){this.bindSlotListeners()}hostUpdated(){this.bindSlotListeners()}hostDisconnected(){for(let e of this.boundSlots)e.removeEventListener(`slotchange`,this.handleSlotChange);this.boundSlots.clear()}bindSlotListeners(){for(let e of this.slotNames){let t=this.findSlot(e);!t||this.boundSlots.has(t)||(this.boundSlots.add(t),t.addEventListener(`slotchange`,this.handleSlotChange),this.lastHasContent.has(e)||this.lastHasContent.set(e,this.test(e)))}}findSlot(e){return this.host.shadowRoot?e?this.host.shadowRoot.querySelector(`slot[name="${e}"]`):this.host.shadowRoot.querySelector(`slot:not([name])`):null}test(e,t=!1){if(t||this.hasLightDomSlotContent(e))return!0;let n=this.findSlot(e);return n?n.assignedNodes({flatten:!0}).some(e=>e.nodeType===Node.TEXT_NODE?!!e.textContent?.trim():e.nodeType===Node.ELEMENT_NODE):!1}hasLightDomSlotContent(e){return[...this.host.children].some(t=>t.getAttribute(`slot`)===e)}};function*dr(e=document.activeElement){e!=null&&(yield e,`shadowRoot`in e&&e.shadowRoot&&e.shadowRoot.mode!==`closed`&&(yield*dr(e.shadowRoot.activeElement)))}var fr=0;function pr(e=`pk`){return fr+=1,`${e}-${fr}`}[`a[href]`,`button:not([disabled])`,`input:not([disabled])`,`select:not([disabled])`,`textarea:not([disabled])`,`[tabindex]:not([tabindex="-1"])`].join(`,`),[`a[href]`,`button`,`input`,`select`,`textarea`,`[tabindex]:not([tabindex="-1"])`].join(`,`);var mr=class{constructor(e=`polite`){this.element=document.createElement(`div`),this.element.setAttribute(`aria-live`,e),this.element.setAttribute(`aria-atomic`,`true`),this.element.className=`pk-visually-hidden`,this.element.style.cssText=`position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;`,document.body.append(this.element)}announce(e){this.element.textContent=``,requestAnimationFrame(()=>{this.element.textContent=e})}destroy(){this.element.remove()}},hr=[];function gr(e){hr.push(e)}function _r(e){for(let t=hr.length-1;t>=0;--t)if(hr[t]===e){hr.splice(t,1);break}}function vr(e){return hr.length>0&&hr[hr.length-1]===e}function yr(e,t){return{top:Math.round(e.getBoundingClientRect().top-t.getBoundingClientRect().top),left:Math.round(e.getBoundingClientRect().left-t.getBoundingClientRect().left)}}function br(e,t,n=`vertical`,r=`smooth`){let i=yr(e,t),a=i.top+t.scrollTop,o=i.left+t.scrollLeft,s=t.scrollLeft,c=t.scrollLeft+t.offsetWidth,l=t.scrollTop,u=t.scrollTop+t.offsetHeight;(n===`horizontal`||n===`both`)&&(o<s?t.scrollTo({left:o,behavior:r}):o+e.clientWidth>c&&t.scrollTo({left:o-t.offsetWidth+e.clientWidth,behavior:r})),(n===`vertical`||n===`both`)&&(a<l?t.scrollTo({top:a,behavior:r}):a+e.clientHeight>u&&t.scrollTo({top:a-t.offsetHeight+e.clientHeight,behavior:r}))}var xr=class extends Event{constructor(){super(`pk-clear`,{bubbles:!0,cancelable:!1,composed:!0})}},Sr=class extends Event{constructor(){super(`pk-show`,{bubbles:!0,cancelable:!1,composed:!0})}},Cr=class extends Event{constructor(){super(`pk-after-show`,{bubbles:!0,cancelable:!1,composed:!0})}},wr=class extends Event{constructor(e=`unknown`){super(`pk-hide`,{bubbles:!0,cancelable:!0,composed:!0}),this.detail={source:e}}},Tr=class extends Event{constructor(){super(`pk-after-hide`,{bubbles:!0,cancelable:!1,composed:!0})}};function Er(e){let t=e.split(`-`)[0];return t===`inline-start`?`left`:t===`inline-end`?`right`:t===`top`||t===`bottom`||t===`left`||t===`right`?t:`bottom`}function Dr(e,t,n,r,i){let a=Er(e),o=t.x+t.width/2-n.x,s=t.y+t.height/2-n.y;return Math.abs(i?.y??0)>r&&(a===`top`||a===`bottom`)?`${o}px ${t.y+t.height/2-n.y}px`:{top:`${o}px calc(100% + ${r}px)`,bottom:`${o}px ${-r}px`,left:`calc(100% + ${r}px) ${s}px`,right:`${-r}px ${s}px`}[a]}function Or(e,t){if(!t){e.removeAttribute(`data-side`);return}e.setAttribute(`data-side`,Er(t))}function kr(e,t,n=100,r){let i=()=>e.getAttribute(`data-current-placement`)??t;return!r?.requireEvent&&e.hasAttribute(`data-current-placement`)?Promise.resolve(i()):new Promise(t=>{let a=!1,o=()=>{a||(a=!0,t(i()))};e.addEventListener(`pk-reposition`,o,{once:!0}),r?.requireEvent||requestAnimationFrame(()=>{requestAnimationFrame(()=>{e.hasAttribute(`data-current-placement`)&&o()})}),window.setTimeout(o,n)})}var Ar=Math.min,jr=Math.max,Mr=Math.round,Nr=Math.floor,V=e=>({x:e,y:e}),Pr={left:`right`,right:`left`,bottom:`top`,top:`bottom`};function Fr(e,t,n){return jr(e,Ar(t,n))}function Ir(e,t){return typeof e==`function`?e(t):e}function Lr(e){return e.split(`-`)[0]}function Rr(e){return e.split(`-`)[1]}function zr(e){return e===`x`?`y`:`x`}function Br(e){return e===`y`?`height`:`width`}function H(e){let t=e[0];return t===`t`||t===`b`?`y`:`x`}function Vr(e){return zr(H(e))}function Hr(e,t,n){n===void 0&&(n=!1);let r=Rr(e),i=Vr(e),a=Br(i),o=i===`x`?r===(n?`end`:`start`)?`right`:`left`:r===`start`?`bottom`:`top`;return t.reference[a]>t.floating[a]&&(o=Zr(o)),[o,Zr(o)]}function Ur(e){let t=Zr(e);return[Wr(e),t,Wr(t)]}function Wr(e){return e.includes(`start`)?e.replace(`start`,`end`):e.replace(`end`,`start`)}var Gr=[`left`,`right`],Kr=[`right`,`left`],qr=[`top`,`bottom`],Jr=[`bottom`,`top`];function Yr(e,t,n){switch(e){case`top`:case`bottom`:return n?t?Kr:Gr:t?Gr:Kr;case`left`:case`right`:return t?qr:Jr;default:return[]}}function Xr(e,t,n,r){let i=Rr(e),a=Yr(Lr(e),n===`start`,r);return i&&(a=a.map(e=>e+`-`+i),t&&(a=a.concat(a.map(Wr)))),a}function Zr(e){let t=Lr(e);return Pr[t]+e.slice(t.length)}function Qr(e){return{top:e.top??0,right:e.right??0,bottom:e.bottom??0,left:e.left??0}}function $r(e){return typeof e==`number`?{top:e,right:e,bottom:e,left:e}:Qr(e)}function ei(e){let{x:t,y:n,width:r,height:i}=e;return{width:r,height:i,top:n,left:t,right:t+r,bottom:n+i,x:t,y:n}}function ti(e,t,n){let{reference:r,floating:i}=e,a=H(t),o=Vr(t),s=Br(o),c=Lr(t),l=a===`y`,u=r.x+r.width/2-i.width/2,d=r.y+r.height/2-i.height/2,f=r[s]/2-i[s]/2,p;switch(c){case`top`:p={x:u,y:r.y-i.height};break;case`bottom`:p={x:u,y:r.y+r.height};break;case`right`:p={x:r.x+r.width,y:d};break;case`left`:p={x:r.x-i.width,y:d};break;default:p={x:r.x,y:r.y}}let m=Rr(t);return m&&(p[o]+=f*(m===`end`?1:-1)*(n&&l?-1:1)),p}async function ni(e,t){t===void 0&&(t={});let{x:n,y:r,platform:i,rects:a,elements:o,strategy:s}=e,{boundary:c=`clippingAncestors`,rootBoundary:l=`viewport`,elementContext:u=`floating`,altBoundary:d=!1,padding:f=0}=Ir(t,e),p=$r(f),m=o[d?u===`floating`?`reference`:`floating`:u],h=ei(await i.getClippingRect({element:await(i.isElement==null?void 0:i.isElement(m))??!0?m:m.contextElement||await(i.getDocumentElement==null?void 0:i.getDocumentElement(o.floating)),boundary:c,rootBoundary:l,strategy:s})),g=u===`floating`?{x:n,y:r,width:a.floating.width,height:a.floating.height}:a.reference,_=await(i.getOffsetParent==null?void 0:i.getOffsetParent(o.floating)),v=await(i.isElement==null?void 0:i.isElement(_))&&await(i.getScale==null?void 0:i.getScale(_))||{x:1,y:1},y=ei(i.convertOffsetParentRelativeRectToViewportRelativeRect?await i.convertOffsetParentRelativeRectToViewportRelativeRect({elements:o,rect:g,offsetParent:_,strategy:s}):g);return{top:(h.top-y.top+p.top)/v.y,bottom:(y.bottom-h.bottom+p.bottom)/v.y,left:(h.left-y.left+p.left)/v.x,right:(y.right-h.right+p.right)/v.x}}var ri=50,ii=async(e,t,n)=>{let{placement:r=`bottom`,strategy:i=`absolute`,middleware:a=[],platform:o}=n,s=o.detectOverflow?o:{...o,detectOverflow:ni},c=await(o.isRTL==null?void 0:o.isRTL(t)),l=await o.getElementRects({reference:e,floating:t,strategy:i}),{x:u,y:d}=ti(l,r,c),f=r,p=0,m={};for(let n=0;n<a.length;n++){let h=a[n];if(!h)continue;let{name:g,fn:_}=h,{x:v,y,data:b,reset:x}=await _({x:u,y:d,initialPlacement:r,placement:f,strategy:i,middlewareData:m,rects:l,platform:s,elements:{reference:e,floating:t}});u=v??u,d=y??d,m[g]={...m[g],...b},x&&p<ri&&(p++,typeof x==`object`&&(x.placement&&(f=x.placement),x.rects&&(l=x.rects===!0?await o.getElementRects({reference:e,floating:t,strategy:i}):x.rects),{x:u,y:d}=ti(l,f,c)),n=-1)}return{x:u,y:d,placement:f,strategy:i,middlewareData:m}},ai=e=>({name:`arrow`,options:e,async fn(t){let{x:n,y:r,placement:i,rects:a,platform:o,elements:s,middlewareData:c}=t,{element:l,padding:u=0}=Ir(e,t)||{};if(l==null)return{};let d=$r(u),f={x:n,y:r},p=Vr(i),m=Br(p),h=await o.getDimensions(l),g=p===`y`,_=g?`top`:`left`,v=g?`bottom`:`right`,y=g?`clientHeight`:`clientWidth`,b=a.reference[m]+a.reference[p]-f[p]-a.floating[m],x=f[p]-a.reference[p],S=await(o.getOffsetParent==null?void 0:o.getOffsetParent(l)),C=S?S[y]:0;(!C||!await(o.isElement==null?void 0:o.isElement(S)))&&(C=s.floating[y]||a.floating[m]);let w=b/2-x/2,T=C/2-h[m]/2-1,E=Ar(d[_],T),ee=Ar(d[v],T),te=C-h[m]-ee,D=C/2-h[m]/2+w,ne=Fr(E,D,te),re=!c.arrow&&Rr(i)!=null&&D!==ne&&a.reference[m]/2-(D<E?E:ee)-h[m]/2<0,O=re?D<E?D-E:D-te:0;return{[p]:f[p]+O,data:{[p]:ne,centerOffset:D-ne-O,...re&&{alignmentOffset:O}},reset:re}}}),oi=function(e){return e===void 0&&(e={}),{name:`flip`,options:e,async fn(t){var n;let{placement:r,middlewareData:i,rects:a,initialPlacement:o,platform:s,elements:c}=t,{mainAxis:l=!0,crossAxis:u=!0,fallbackPlacements:d,fallbackStrategy:f=`bestFit`,fallbackAxisSideDirection:p=`none`,flipAlignment:m=!0,...h}=Ir(e,t);if((n=i.arrow)!=null&&n.alignmentOffset)return{};let g=Lr(r),_=H(o),v=Lr(o)===o,y=await(s.isRTL==null?void 0:s.isRTL(c.floating)),b=d||(v||!m?[Zr(o)]:Ur(o)),x=p!==`none`;!d&&x&&b.push(...Xr(o,m,p,y));let S=[o,...b],C=await s.detectOverflow(t,h),w=[],T=i.flip?.overflows||[];if(l&&w.push(C[g]),u){let e=Hr(r,a,y);w.push(C[e[0]],C[e[1]])}if(T=[...T,{placement:r,overflows:w}],!w.every(e=>e<=0)){let e=(i.flip?.index||0)+1,t=S[e];if(t&&(!(u===`alignment`&&_!==H(t))||T.every(e=>H(e.placement)!==_||e.overflows[0]>0)))return{data:{index:e,overflows:T},reset:{placement:t}};let n=T.filter(e=>e.overflows[0]<=0).sort((e,t)=>e.overflows[1]-t.overflows[1])[0]?.placement;if(!n)switch(f){case`bestFit`:{let e=T.filter(e=>{if(x){let t=H(e.placement);return t===_||t===`y`}return!0}).map(e=>[e.placement,e.overflows.filter(e=>e>0).reduce((e,t)=>e+t,0)]).sort((e,t)=>e[1]-t[1])[0]?.[0];e&&(n=e);break}case`initialPlacement`:n=o;break}if(r!==n)return{reset:{placement:n}}}return{}}}},si=new Set([`left`,`top`]);async function ci(e,t){let{placement:n,platform:r,elements:i}=e,a=await(r.isRTL==null?void 0:r.isRTL(i.floating)),o=Lr(n),s=Rr(n),c=H(n)===`y`,l=si.has(o)?-1:1,u=a&&c?-1:1,d=Ir(t,e),{mainAxis:f,crossAxis:p,alignmentAxis:m}=typeof d==`number`?{mainAxis:d,crossAxis:0,alignmentAxis:null}:{mainAxis:d.mainAxis||0,crossAxis:d.crossAxis||0,alignmentAxis:d.alignmentAxis};return s&&typeof m==`number`&&(p=s===`end`?m*-1:m),c?{x:p*u,y:f*l}:{x:f*l,y:p*u}}var li=function(e){return e===void 0&&(e=0),{name:`offset`,options:e,async fn(t){var n;let{x:r,y:i,placement:a,middlewareData:o}=t,s=await ci(t,e);return a===o.offset?.placement&&(n=o.arrow)!=null&&n.alignmentOffset?{}:{x:r+s.x,y:i+s.y,data:{...s,placement:a}}}}},ui=function(e){return e===void 0&&(e={}),{name:`shift`,options:e,async fn(t){let{x:n,y:r,placement:i,platform:a}=t,{mainAxis:o=!0,crossAxis:s=!1,limiter:c={fn:e=>{let{x:t,y:n}=e;return{x:t,y:n}}},...l}=Ir(e,t),u={x:n,y:r},d=await a.detectOverflow(t,l),f=H(i),p=zr(f),m=u[p],h=u[f],g=(e,t)=>Fr(t+d[e===`y`?`top`:`left`],t,t-d[e===`y`?`bottom`:`right`]);o&&(m=g(p,m)),s&&(h=g(f,h));let _=c.fn({...t,[p]:m,[f]:h});return{..._,data:{x:_.x-n,y:_.y-r,enabled:{[p]:o,[f]:s}}}}}},di=function(e){return e===void 0&&(e={}),{name:`size`,options:e,async fn(t){let{placement:n,rects:r,platform:i,elements:a}=t,{apply:o=()=>{},...s}=Ir(e,t),c=await i.detectOverflow(t,s),l=Lr(n),u=Rr(n),d=H(n)===`y`,{width:f,height:p}=r.floating,m,h;l===`top`||l===`bottom`?(m=l,h=u===(await(i.isRTL==null?void 0:i.isRTL(a.floating))?`start`:`end`)?`left`:`right`):(h=l,m=u===`end`?`top`:`bottom`);let g=p-c.top-c.bottom,_=f-c.left-c.right,v=Ar(p-c[m],g),y=Ar(f-c[h],_),b=t.middlewareData.shift,x=!b,S=v,C=y;b!=null&&b.enabled.x&&(C=_),b!=null&&b.enabled.y&&(S=g),x&&!u&&(d?C=f-2*jr(c.left,c.right):S=p-2*jr(c.top,c.bottom)),await o({...t,availableWidth:C,availableHeight:S});let w=await i.getDimensions(a.floating);return f!==w.width||p!==w.height?{reset:{rects:!0}}:{}}}};function fi(){return typeof window<`u`}function pi(e){return mi(e)?(e.nodeName||``).toLowerCase():`#document`}function U(e){var t;return(e==null||(t=e.ownerDocument)==null?void 0:t.defaultView)||window}function W(e){return((mi(e)?e.ownerDocument:e.document)||window.document)?.documentElement}function mi(e){return fi()?e instanceof Node||e instanceof U(e).Node:!1}function G(e){return fi()?e instanceof Element||e instanceof U(e).Element:!1}function hi(e){return fi()?e instanceof HTMLElement||e instanceof U(e).HTMLElement:!1}function gi(e){return!fi()||typeof ShadowRoot>`u`?!1:e instanceof ShadowRoot||e instanceof U(e).ShadowRoot}function _i(e){let{overflow:t,overflowX:n,overflowY:r,display:i}=K(e);return/auto|scroll|overlay|hidden|clip/.test(t+r+n)&&i!==`inline`&&i!==`contents`}function vi(e){return/^(table|td|th)$/.test(pi(e))}function yi(e){try{if(e.matches(`:popover-open`))return!0}catch{}try{return e.matches(`:modal`)}catch{return!1}}var bi=/transform|translate|scale|rotate|perspective|filter/,xi=/paint|layout|strict|content/,Si=e=>!!e&&e!==`none`,Ci;function wi(e){let t=G(e)?K(e):e;return Si(t.transform)||Si(t.translate)||Si(t.scale)||Si(t.rotate)||Si(t.perspective)||!Ei()&&(Si(t.backdropFilter)||Si(t.filter))||bi.test(t.willChange||``)||xi.test(t.contain||``)}function Ti(e){let t=ki(e);for(;hi(t)&&!Di(t);){if(wi(t))return t;if(yi(t))return null;t=ki(t)}return null}function Ei(){return Ci??=typeof CSS<`u`&&CSS.supports&&CSS.supports(`-webkit-backdrop-filter`,`none`),Ci}function Di(e){return/^(html|body|#document)$/.test(pi(e))}function K(e){return U(e).getComputedStyle(e)}function Oi(e){return G(e)?{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}:{scrollLeft:e.scrollX,scrollTop:e.scrollY}}function ki(e){if(pi(e)===`html`)return e;let t=e.assignedSlot||e.parentNode||gi(e)&&e.host||W(e);return gi(t)?t.host:t}function Ai(e){let t=ki(e);return Di(t)?(e.ownerDocument||e).body:hi(t)&&_i(t)?t:Ai(t)}function ji(e,t,n){t===void 0&&(t=[]),n===void 0&&(n=!0);let r=Ai(e),i=r===e.ownerDocument?.body,a=U(r);if(i){let e=Mi(a);return t.concat(a,a.visualViewport||[],_i(r)?r:[],e&&n?ji(e):[])}else return t.concat(r,ji(r,[],n))}function Mi(e){return e.parent&&Object.getPrototypeOf(e.parent)?e.frameElement:null}function Ni(e){let t=K(e),n=parseFloat(t.width)||0,r=parseFloat(t.height)||0,i=hi(e),a=i?e.offsetWidth:n,o=i?e.offsetHeight:r,s=Mr(n)!==a||Mr(r)!==o;return s&&(n=a,r=o),{width:n,height:r,$:s}}function Pi(e){return G(e)?e:e.contextElement}function Fi(e){let t=Pi(e);if(!hi(t))return V(1);let n=t.getBoundingClientRect(),{width:r,height:i,$:a}=Ni(t),o=(a?Mr(n.width):n.width)/r,s=(a?Mr(n.height):n.height)/i;return(!o||!Number.isFinite(o))&&(o=1),(!s||!Number.isFinite(s))&&(s=1),{x:o,y:s}}var Ii=V(0);function Li(e){let t=U(e);return!Ei()||!t.visualViewport?Ii:{x:t.visualViewport.offsetLeft,y:t.visualViewport.offsetTop}}function Ri(e,t,n){return t===void 0&&(t=!1),!!n&&t&&n===U(e)}function zi(e,t,n,r){t===void 0&&(t=!1),n===void 0&&(n=!1);let i=e.getBoundingClientRect(),a=Pi(e),o=V(1);t&&(r?G(r)&&(o=Fi(r)):o=Fi(e));let s=Ri(a,n,r)?Li(a):V(0),c=(i.left+s.x)/o.x,l=(i.top+s.y)/o.y,u=i.width/o.x,d=i.height/o.y;if(a&&r){let e=U(a),t=G(r)?U(r):r,n=e,i=Mi(n);for(;i&&t!==n;){let e=Fi(i),t=i.getBoundingClientRect(),r=K(i),a=t.left+(i.clientLeft+parseFloat(r.paddingLeft))*e.x,o=t.top+(i.clientTop+parseFloat(r.paddingTop))*e.y;c*=e.x,l*=e.y,u*=e.x,d*=e.y,c+=a,l+=o,n=U(i),i=Mi(n)}}return ei({width:u,height:d,x:c,y:l})}function Bi(e,t){let n=Oi(e).scrollLeft;return t?t.left+n:zi(W(e)).left+n}function Vi(e,t){let n=e.getBoundingClientRect();return{x:n.left+t.scrollLeft-Bi(e,n),y:n.top+t.scrollTop}}function Hi(e){let{elements:t,rect:n,offsetParent:r,strategy:i}=e,a=i===`fixed`,o=W(r),s=t?yi(t.floating):!1;if(r===o||s&&a)return n;let c={scrollLeft:0,scrollTop:0},l=V(1),u=V(0),d=hi(r);if((d||!a)&&((pi(r)!==`body`||_i(o))&&(c=Oi(r)),d)){let e=zi(r);l=Fi(r),u.x=e.x+r.clientLeft,u.y=e.y+r.clientTop}let f=o&&!d&&!a?Vi(o,c):V(0);return{width:n.width*l.x,height:n.height*l.y,x:n.x*l.x-c.scrollLeft*l.x+u.x+f.x,y:n.y*l.y-c.scrollTop*l.y+u.y+f.y}}function Ui(e){return e.getClientRects?Array.from(e.getClientRects()):[]}function Wi(e){let t=Oi(e),n=e.ownerDocument.body,r=jr(e.scrollWidth,e.clientWidth,n.scrollWidth,n.clientWidth),i=jr(e.scrollHeight,e.clientHeight,n.scrollHeight,n.clientHeight),a=-t.scrollLeft+Bi(e),o=-t.scrollTop;return K(n).direction===`rtl`&&(a+=jr(e.clientWidth,n.clientWidth)-r),{width:r,height:i,x:a,y:o}}var Gi=25;function Ki(e,t,n){n===void 0&&(n=`viewport`);let r=n===`layoutViewport`,i=U(e),a=W(e),o=i.visualViewport,s=a.clientWidth,c=a.clientHeight,l=0,u=0;if(o){let e=!Ei()||t===`fixed`;r?e||(l=-o.offsetLeft,u=-o.offsetTop):(s=o.width,c=o.height,e&&(l=o.offsetLeft,u=o.offsetTop))}if(Bi(a)<=0){let e=a.ownerDocument,t=e.body,n=getComputedStyle(t),r=e.compatMode===`CSS1Compat`&&parseFloat(n.marginLeft)+parseFloat(n.marginRight)||0,i=Math.abs(a.clientWidth-t.clientWidth-r),o=getComputedStyle(a).scrollbarGutter===`stable both-edges`?i/2:i;o<=Gi&&(s-=o)}return{width:s,height:c,x:l,y:u}}function qi(e,t){let n=zi(e,!0,t===`fixed`),r=n.top+e.clientTop,i=n.left+e.clientLeft,a=Fi(e);return{width:e.clientWidth*a.x,height:e.clientHeight*a.y,x:i*a.x,y:r*a.y}}function Ji(e,t,n){let r;if(t===`viewport`||t===`layoutViewport`)r=Ki(e,n,t);else if(t===`document`)r=Wi(W(e));else if(G(t))r=qi(t,n);else{let n=Li(e);r={x:t.x-n.x,y:t.y-n.y,width:t.width,height:t.height}}return ei(r)}function Yi(e,t){let n=t.get(e);if(n)return n;let r=ji(e,[],!1).filter(e=>G(e)&&pi(e)!==`body`),i=null,a=K(e).position===`fixed`,o=a?ki(e):e;for(;G(o)&&!Di(o);){let e=K(o),t=wi(o),n=i?i.position:a?`fixed`:``;!t&&(n===`fixed`||n===`absolute`&&e.position===`static`)?r=r.filter(e=>e!==o):i=e,o=ki(o)}return t.set(e,r),r}function Xi(e){let{element:t,boundary:n,rootBoundary:r,strategy:i}=e,a=[...n===`clippingAncestors`?yi(t)?[]:Yi(t,this._c):[].concat(n),r],o=Ji(t,a[0],i),s=o.top,c=o.right,l=o.bottom,u=o.left;for(let e=1;e<a.length;e++){let n=Ji(t,a[e],i);s=jr(n.top,s),c=Ar(n.right,c),l=Ar(n.bottom,l),u=jr(n.left,u)}return{width:c-u,height:l-s,x:u,y:s}}function Zi(e){let{width:t,height:n}=Ni(e);return{width:t,height:n}}function Qi(e,t,n){let r=hi(t),i=W(t),a=n===`fixed`,o=zi(e,!0,a,t),s={scrollLeft:0,scrollTop:0},c=V(0);if((r||!a)&&((pi(t)!==`body`||_i(i))&&(s=Oi(t)),r)){let e=zi(t,!0,a,t);c.x=e.x+t.clientLeft,c.y=e.y+t.clientTop}!r&&i&&(c.x=Bi(i));let l=i&&!r&&!a?Vi(i,s):V(0);return{x:o.left+s.scrollLeft-c.x-l.x,y:o.top+s.scrollTop-c.y-l.y,width:o.width,height:o.height}}function $i(e){return K(e).position===`static`}function ea(e,t){if(!hi(e)||K(e).position===`fixed`)return null;if(t)return t(e);let n=e.offsetParent;return W(e)===n&&(n=n.ownerDocument.body),n}function ta(e,t){let n=U(e);if(yi(e))return n;if(!hi(e)){let t=ki(e);for(;t&&!Di(t);){if(G(t)&&!$i(t))return t;t=ki(t)}return n}let r=ea(e,t);for(;r&&vi(r)&&$i(r);)r=ea(r,t);return r&&Di(r)&&$i(r)&&!wi(r)?n:r||Ti(e)||n}var na=async function(e){let t=this.getOffsetParent||ta,n=this.getDimensions,r=await n(e.floating);return{reference:Qi(e.reference,await t(e.floating),e.strategy),floating:{x:0,y:0,width:r.width,height:r.height}}};function ra(e){return K(e).direction===`rtl`}var ia={convertOffsetParentRelativeRectToViewportRelativeRect:Hi,getDocumentElement:W,getClippingRect:Xi,getOffsetParent:ta,getElementRects:na,getClientRects:Ui,getDimensions:Zi,getScale:Fi,isElement:G,isRTL:ra};function aa(e,t){return e.x===t.x&&e.y===t.y&&e.width===t.width&&e.height===t.height}function oa(e,t,n){let r=null,i,a=W(e);function o(){var e;clearTimeout(i),(e=r)==null||e.disconnect(),r=null}function s(n,c){n===void 0&&(n=!1),c===void 0&&(c=1),o();let l=e.getBoundingClientRect(),{left:u,top:d,width:f,height:p}=l;if(n||t(),!f||!p)return;let m=Nr(d),h=Nr(a.clientWidth-(u+f)),g=Nr(a.clientHeight-(d+p)),_=Nr(u),v={rootMargin:-m+`px `+-h+`px `+-g+`px `+-_+`px`,threshold:jr(0,Ar(1,c))||1},y=!0;function b(t){let n=t[0].intersectionRatio;if(!aa(l,e.getBoundingClientRect()))return s();if(n!==c){if(!y)return s();n?s(!1,n):i=setTimeout(()=>{s(!1,1e-7)},1e3)}y=!1}try{r=new IntersectionObserver(b,{...v,root:a.ownerDocument})}catch{r=new IntersectionObserver(b,v)}r.observe(e)}let c=U(e),l=()=>s(n);return c.addEventListener(`resize`,l),s(!0),()=>{c.removeEventListener(`resize`,l),o()}}function sa(e,t,n,r){r===void 0&&(r={});let{ancestorScroll:i=!0,ancestorResize:a=!0,elementResize:o=typeof ResizeObserver==`function`,layoutShift:s=typeof IntersectionObserver==`function`,animationFrame:c=!1}=r,l=Pi(e),u=i||a?[...l?ji(l):[],...t?ji(t):[]]:[];u.forEach(e=>{i&&e.addEventListener(`scroll`,n),a&&e.addEventListener(`resize`,n)});let d=l&&s?oa(l,n,a):null,f=-1,p=null;o&&(p=new ResizeObserver(e=>{let[r]=e;r&&r.target===l&&p&&t&&(p.unobserve(t),cancelAnimationFrame(f),f=requestAnimationFrame(()=>{var e;(e=p)==null||e.observe(t)})),n()}),l&&!c&&p.observe(l),t&&p.observe(t));let m,h=c?zi(e):null;c&&g();function g(){let t=zi(e);h&&!aa(h,t)&&n(),h=t,m=requestAnimationFrame(g)}return n(),()=>{var e;u.forEach(e=>{i&&e.removeEventListener(`scroll`,n),a&&e.removeEventListener(`resize`,n)}),d?.(),(e=p)==null||e.disconnect(),p=null,c&&cancelAnimationFrame(m)}}var ca=li,la=ui,ua=oi,da=di,fa=ai,pa=(e,t,n)=>{let r=new Map,i=n??{},a={...ia,...i.platform,_c:r};return ii(e,t,{...i,platform:a})};function ma(e){return ga(e)}function ha(e){return e.assignedSlot?e.assignedSlot:e.parentNode instanceof ShadowRoot?e.parentNode.host:e.parentNode}function ga(e){for(let t=e;t;t=ha(t))if(t instanceof Element&&getComputedStyle(t).display===`none`)return null;for(let t=ha(e);t;t=ha(t)){if(!(t instanceof Element))continue;let e=getComputedStyle(t);if(e.display!==`contents`&&(e.position!==`static`||wi(e)||t.tagName===`BODY`))return t}return null}function _a(e,t){if(!t)return null;let n=e.getRootNode();if(n instanceof Document||n instanceof ShadowRoot){let e=n.getElementById(t);if(e)return e}return e.ownerDocument.getElementById(t)}var va=class extends Event{constructor(){super(`pk-reposition`,{bubbles:!0,cancelable:!1,composed:!0})}},ya=l`
    @layer pk-component {
        :host {
            display: contents;
        }

        .popup {
            position: absolute;
            isolation: isolate;
            width: max-content;
            z-index: var(--pk-popup-z-index, 1000);
            /* Never transition coordinates — flip would animate the jump. */
            transition: none;

            /* Reset UA styles for [popover] — see  pk-popup. */
            inset: unset;
            padding: unset;
            margin: unset;
            height: unset;
            color: unset;
            background: unset;
            border: unset;
            overflow: unset;
        }

        .popup-fixed {
            position: fixed;
        }

        .popup:not(.active) {
            display: none;
        }

        /* Prefer visibility over opacity so enter animations are not fighting a
         * 0→1 fade. Matches base-ui isPositioned / hide-until-placed.
         */
        .popup.active:not(.positioned) {
            visibility: hidden;
            pointer-events: none;
        }

        .popup.show {
            animation: pk-popup-surface-in 100ms ease-out;
        }

        .popup.hide {
            animation: pk-popup-surface-out 100ms ease-in forwards;
        }

        @keyframes pk-popup-surface-in {
            from {
                opacity: 0;
                transform: scale(0.95);
            }

            to {
                opacity: 1;
                transform: scale(1);
            }
        }

        @keyframes pk-popup-surface-out {
            from {
                opacity: 1;
                transform: scale(1);
            }

            to {
                opacity: 0;
                transform: scale(0.95);
            }
        }

        .arrow {
            position: absolute;
            width: var(--pk-popup-arrow-size, 6px);
            height: var(--pk-popup-arrow-size, 6px);
            rotate: 45deg;
            background: var(--pk-popup-arrow-color, var(--pk-color-white));
            z-index: 1;
        }

        .hover-bridge {
            position: fixed;
            z-index: calc(var(--pk-popup-z-index, 1000) - 1);
            inset: 0;
            clip-path: polygon(
                var(--pk-hover-bridge-top-left-x, 0) var(--pk-hover-bridge-top-left-y, 0),
                var(--pk-hover-bridge-top-right-x, 0) var(--pk-hover-bridge-top-right-y, 0),
                var(--pk-hover-bridge-bottom-right-x, 0) var(--pk-hover-bridge-bottom-right-y, 0),
                var(--pk-hover-bridge-bottom-left-x, 0) var(--pk-hover-bridge-bottom-left-y, 0)
            );
            pointer-events: auto;
        }

        .hover-bridge:not(.hover-bridge-visible) {
            display: none;
        }
    }
`;function ba(e){return typeof e==`object`&&!!e&&`getBoundingClientRect`in e}function xa(e){return e||(t?`absolute`:`fixed`)}function Sa(e,n){if(!(!t||ba(e)||n!==`scroll`))return ji(e).filter(e=>e instanceof Element)}var q=class extends M{constructor(...e){super(...e),this.anchor=``,this.active=!1,this.boundary=`viewport`,this.placement=`bottom-start`,this.distance=4,this.skidding=0,this.flip=!0,this.flipFallbackPlacements=``,this.flipFallbackStrategy=`best-fit`,this.flipPadding=8,this.shift=!0,this.shiftPadding=8,this.arrow=!1,this.arrowPlacement=`anchor`,this.arrowPadding=10,this.anchorTracking=!0,this.hoverBridge=!1,this.anchorElement=null,this.settlingInitialPosition=!1,this.settleGeneration=0}static{this.styles=ya}disconnectedCallback(){this.stop(),super.disconnectedCallback()}updated(e){super.updated(e),e.has(`active`)&&(this.active?(this.resolveAnchor(),this.start()):this.stop()),e.has(`anchor`)&&this.handleAnchorChange(),this.active&&!e.has(`active`)&&this.reposition()}reposition(){this.settlingInitialPosition||this.repositionAsync()}async repositionAsync(e=!0){let n=this.popupElement,r=this.arrow?this.arrowElement:null;if(!this.active||!this.anchorElement||!n)return!1;let i=Sa(this.anchorElement,this.boundary),a=[ca({mainAxis:this.distance,crossAxis:this.skidding})];this.sync?a.push(da({apply:({rects:e})=>{let t=this.sync===`width`||this.sync===`both`,r=this.sync===`height`||this.sync===`both`;n.style.width=t?`${e.reference.width}px`:``,n.style.height=r?`${e.reference.height}px`:``}})):(n.style.width=``,n.style.height=``),this.flip&&a.push(ua({boundary:i,fallbackPlacements:this.flipFallbackPlacements?this.flipFallbackPlacements.split(` `).map(e=>e.trim()).filter(Boolean):void 0,fallbackStrategy:this.flipFallbackStrategy===`best-fit`?`bestFit`:`initialPlacement`,padding:this.flipPadding})),this.shift&&a.push(la({boundary:i,padding:this.shiftPadding})),this.arrow&&r&&a.push(fa({element:r,padding:this.arrowPadding}));let o=xa(this.positionMethod),s=o===`fixed`;n.classList.toggle(`popup-fixed`,s);let c=t?e=>ia.getOffsetParent(e,ma):ia.getOffsetParent,{x:l,y:u,middlewareData:d,placement:f}=await pa(this.anchorElement,n,{placement:this.placement,middleware:a,strategy:o,platform:{...ia,getOffsetParent:c}});if(!this.active||!n.isConnected)return!1;let p={top:`bottom`,right:`left`,bottom:`top`,left:`right`}[f.split(`-`)[0]];if(this.setAttribute(`data-current-placement`,f),Object.assign(n.style,{left:`${l}px`,top:`${u}px`,...s?{position:`fixed`}:{position:``}}),this.anchorElement){let e=this.anchorElement.getBoundingClientRect(),t=n.getBoundingClientRect();n.style.setProperty(`--pk-anchor-width`,`${e.width}px`),n.style.setProperty(`--pk-anchor-height`,`${e.height}px`);let r=Dr(f,e,t,this.distance,d.shift);n.style.setProperty(`--pk-transform-origin`,r)}if(this.arrow&&r){let e=d.arrow?.x,t=d.arrow?.y,n=``,i=``,a=``,o=``;if(this.arrowPlacement===`start`){let r=typeof e==`number`?`${this.arrowPadding}px`:``;n=typeof t==`number`?`${this.arrowPadding}px`:``,o=r}else this.arrowPlacement===`end`?(i=typeof e==`number`?`${this.arrowPadding}px`:``,a=typeof t==`number`?`${this.arrowPadding}px`:``):this.arrowPlacement===`center`?(o=typeof e==`number`?`50%`:``,n=typeof t==`number`?`50%`:``):(o=typeof e==`number`?`${e}px`:``,n=typeof t==`number`?`${t}px`:``);Object.assign(r.style,{top:n,right:i,bottom:a,left:o,transform:``,[p]:`calc(-1 * var(--pk-popup-arrow-size, 6px) / 2)`})}return requestAnimationFrame(()=>this.updateHoverBridge()),e&&this.dispatchEvent(new va),!0}frames(e){return new Promise(t=>{let n=e=>{if(e<=0){t();return}requestAnimationFrame(()=>n(e-1))};n(e)})}async settleInitialPosition(){let e=++this.settleGeneration,t=this.popupElement;if(!t){this.settlingInitialPosition=!1;return}await this.frames(2),!(!this.active||e!==this.settleGeneration)&&(await this.repositionAsync(!1),t.offsetHeight,await this.frames(1),!(!this.active||e!==this.settleGeneration)&&(await this.repositionAsync(!1),!(!this.active||e!==this.settleGeneration)&&(t.classList.add(`positioned`),this.settlingInitialPosition=!1,requestAnimationFrame(()=>this.updateHoverBridge()),this.dispatchEvent(new va))))}resolveAnchor(){if(typeof this.anchor==`string`&&this.anchor){this.anchorElement=_a(this,this.anchor);return}if(this.anchor instanceof Element||ba(this.anchor)){this.anchorElement=this.anchor;return}let e=this.querySelector(`[slot="anchor"]`);e instanceof HTMLSlotElement&&(e=e.assignedElements({flatten:!0})[0]??null),this.anchorElement=e}async handleAnchorChange(){await this.stop(),this.resolveAnchor(),this.anchorElement&&this.active&&this.start()}usesPopoverTopLayer(){return t&&this.positionMethod!==`fixed`}stop(){return new Promise(e=>{let t=this.popupElement;this.settleGeneration+=1,this.settlingInitialPosition=!1,t?.classList.remove(`positioned`),this.usesPopoverTopLayer()&&t?.hidePopover?.(),this.cleanup?(this.cleanup(),this.cleanup=void 0,t?.style.removeProperty(`--pk-transform-origin`),requestAnimationFrame(()=>e())):e(),this.removeAttribute(`data-current-placement`)})}releasePositioning(){this.cleanup&&=(this.cleanup(),void 0)}async awaitHidden(){await this.stop()}start(){!this.anchorElement||!this.active||!this.isConnected||!this.popupElement||(this.popupElement.classList.remove(`positioned`),this.settlingInitialPosition=!0,this.usesPopoverTopLayer()&&this.popupElement.showPopover?.(),this.anchorTracking&&(this.cleanup=sa(this.anchorElement,this.popupElement,()=>{this.settlingInitialPosition||this.reposition()})),this.settleInitialPosition())}getContentElement(){let e=((this.shadowRoot?.querySelector(`slot:not([name])`))?.assignedElements({flatten:!0})??[]).find(e=>e instanceof HTMLElement);if(e)return e;for(let e of this.childNodes)if(e instanceof HTMLElement&&e.getAttribute(`slot`)!==`anchor`)return e;return null}updateHoverBridge(){let e=this.popupElement;if(!this.hoverBridge||!this.anchorElement||!e)return;let t=this.anchorElement.getBoundingClientRect(),n=e.getBoundingClientRect(),r=this.placement.includes(`top`)||this.placement.includes(`bottom`),i=0,a=0,o=0,s=0,c=0,l=0,u=0,d=0;r?t.top<n.top?(i=t.left,a=t.bottom,o=t.right,s=t.bottom,c=n.left,l=n.top,u=n.right,d=n.top):(i=n.left,a=n.bottom,o=n.right,s=n.bottom,c=t.left,l=t.top,u=t.right,d=t.top):t.left<n.left?(i=t.right,a=t.top,o=n.left,s=n.top,c=t.right,l=t.bottom,u=n.left,d=n.bottom):(i=n.right,a=n.top,o=t.left,s=t.top,c=n.right,l=n.bottom,u=t.left,d=t.bottom),this.style.setProperty(`--pk-hover-bridge-top-left-x`,`${i}px`),this.style.setProperty(`--pk-hover-bridge-top-left-y`,`${a}px`),this.style.setProperty(`--pk-hover-bridge-top-right-x`,`${o}px`),this.style.setProperty(`--pk-hover-bridge-top-right-y`,`${s}px`),this.style.setProperty(`--pk-hover-bridge-bottom-left-x`,`${c}px`),this.style.setProperty(`--pk-hover-bridge-bottom-left-y`,`${l}px`),this.style.setProperty(`--pk-hover-bridge-bottom-right-x`,`${u}px`),this.style.setProperty(`--pk-hover-bridge-bottom-right-y`,`${d}px`)}render(){let e=!t||this.positionMethod===`fixed`,n=this.usesPopoverTopLayer();return k`
            <slot name="anchor" @slotchange=${()=>{this.handleAnchorChange()}}></slot>
            ${this.hoverBridge?k`
                <div
                    part="hover-bridge"
                    class=${R({"hover-bridge":!0,"hover-bridge-visible":this.active})}
                    aria-hidden="true"
                ></div>
            `:j}
            <div
                popover=${n?`manual`:j}
                part="popup"
                class=${R({popup:!0,active:this.active,"popup-fixed":e})}
            >
                ${this.arrow?k`<div part="arrow" class="arrow"></div>`:j}
                <slot></slot>
            </div>
        `}};N([F()],q.prototype,`anchor`,void 0),N([F({type:Boolean,reflect:!0})],q.prototype,`active`,void 0),N([F({attribute:`position-method`})],q.prototype,`positionMethod`,void 0),N([F({reflect:!0})],q.prototype,`boundary`,void 0),N([F({reflect:!0})],q.prototype,`placement`,void 0),N([F({type:Number})],q.prototype,`distance`,void 0),N([F({type:Number})],q.prototype,`skidding`,void 0),N([F({type:Boolean})],q.prototype,`flip`,void 0),N([F({attribute:`flip-fallback-placements`})],q.prototype,`flipFallbackPlacements`,void 0),N([F({attribute:`flip-fallback-strategy`})],q.prototype,`flipFallbackStrategy`,void 0),N([F({attribute:`flip-padding`,type:Number})],q.prototype,`flipPadding`,void 0),N([F({type:Boolean})],q.prototype,`shift`,void 0),N([F({attribute:`shift-padding`,type:Number})],q.prototype,`shiftPadding`,void 0),N([F({type:Boolean})],q.prototype,`arrow`,void 0),N([F({attribute:`arrow-placement`})],q.prototype,`arrowPlacement`,void 0),N([F({attribute:`arrow-padding`,type:Number})],q.prototype,`arrowPadding`,void 0),N([F()],q.prototype,`sync`,void 0),N([F({attribute:`anchor-tracking`,type:Boolean})],q.prototype,`anchorTracking`,void 0),N([F({attribute:`hover-bridge`,type:Boolean})],q.prototype,`hoverBridge`,void 0),N([L(`.popup`)],q.prototype,`popupElement`,void 0),N([L(`.arrow`)],q.prototype,`arrowElement`,void 0),q=N([P(`pk-popup`)],q);var Ca=new Set([`ArrowDown`,`ArrowUp`,`ArrowLeft`,`ArrowRight`,`Home`,`End`,`Enter`,` `,`Escape`]);function wa(e){return e.key.length===1&&!e.ctrlKey&&!e.metaKey&&!e.altKey}function Ta(e){return e.filter(e=>!e.hasAttribute(`disabled`)&&!e.hasAttribute(`hidden`)&&e.getAttribute(`aria-disabled`)!==`true`&&e.getAttribute(`aria-hidden`)!==`true`)}function Ea(e,t,n){if(n){n(t);return}let r=e[t];if(r instanceof HTMLElement&&`focusControl`in r&&typeof r.focusControl==`function`){r.focusControl();return}r?.focus()}function Da(e){if(!e)return;let t=e.shadowRoot?.querySelector(`.option`);if(t instanceof HTMLButtonElement){t.click();return}e.click()}function Oa(e,t){let n=Ta(t.items),r=t.loop===!0;if(n.length===0)return t.currentIndex;let i=Math.max(0,t.currentIndex),a=n[i]??n[0];switch(i=n.indexOf(a),i<0&&(i=0),e.key){case`ArrowDown`:case`ArrowRight`:return e.preventDefault(),i=r&&i>=n.length-1?0:Math.min(i+1,n.length-1),Ea(n,i,t.focusItem),t.onSelect(i),i;case`ArrowUp`:case`ArrowLeft`:return e.preventDefault(),i=r&&i<=0?n.length-1:Math.max(i-1,0),Ea(n,i,t.focusItem),t.onSelect(i),i;case`Home`:return e.preventDefault(),i=0,Ea(n,i,t.focusItem),t.onSelect(i),i;case`End`:return e.preventDefault(),i=n.length-1,Ea(n,i,t.focusItem),t.onSelect(i),i;case`Enter`:case` `:return t.multiselect||(e.preventDefault(),Da(n[i])),i;case`Escape`:return e.preventDefault(),t.onClose?.(),i;default:return i}}var ka=e=>e.hidden||e.hasAttribute(`data-pk-filter-empty`),Aa=e=>{let t=[...e.querySelectorAll(`:scope > pk-option, :scope > pk-option-group, :scope > pk-separator`)],n=(e,n)=>{for(let r=e+n;n<0?r>=0:r<t.length;r+=n){let e=t[r];if(!(!e||e.localName===`pk-separator`))return e}return null};for(let e=0;e<t.length;e+=1){let r=t[e];if(!r||r.localName!==`pk-separator`)continue;let i=n(e,-1),a=n(e,1);r.hidden=!i||!a||ka(i)||ka(a)}};function ja(e){if(e.panel instanceof Element){let t=e.panel.closest(`pk-popup`);if(t)return t;let n=e.panel.getRootNode();if(n instanceof ShadowRoot&&n.host.localName===`pk-popup`)return n.host}return e.host instanceof HTMLElement?e.host.shadowRoot?.querySelector(`pk-popup`)??e.host.querySelector(`:scope > pk-popup`)??e.host.querySelector(`pk-popup`):null}function Ma(e,t={}){let n=e.composedPath();if(t.host&&n.includes(t.host)||t.anchor&&n.includes(t.anchor)||t.panel&&n.includes(t.panel))return!0;let r=ja(t);return r&&n.includes(r)?!0:n.some(e=>e instanceof HTMLElement?r&&e.classList.contains(`popup`)&&(e===r||r.contains(e))?!0:t.extraMatches?.(e)??!1:!1)}function Na(e,t={}){return Ma(e,t)}var Pa=l`
    @layer pk-component {
        .pk-popup-content {
            transform-origin: var(--pk-transform-origin, top);
        }

        .pk-popup-content[data-open] {
            animation: pk-popup-content-in 100ms ease-out;
        }

        .pk-popup-content[data-open][data-side='bottom'] {
            animation-name: pk-popup-content-in-bottom;
        }

        .pk-popup-content[data-open][data-side='top'] {
            animation-name: pk-popup-content-in-top;
        }

        .pk-popup-content[data-open][data-side='left'] {
            animation-name: pk-popup-content-in-left;
        }

        .pk-popup-content[data-open][data-side='right'] {
            animation-name: pk-popup-content-in-right;
        }

        /* Exit: fade + zoom only — matches tw-animate animate-out / tooltip motion. */
        .pk-popup-content.closing {
            animation: pk-popup-content-out 100ms ease-in forwards;
        }
    }

    @keyframes pk-popup-content-in {
        from {
            opacity: 0;
            transform: scale(0.95);
        }

        to {
            opacity: 1;
            transform: scale(1);
        }
    }

    @keyframes pk-popup-content-out {
        from {
            opacity: 1;
            transform: scale(1);
        }

        to {
            opacity: 0;
            transform: scale(0.95);
        }
    }

    @keyframes pk-popup-content-in-bottom {
        from {
            opacity: 0;
            transform: scale(0.95) translateY(-0.5rem);
        }

        to {
            opacity: 1;
            transform: scale(1) translateY(0);
        }
    }

    @keyframes pk-popup-content-in-top {
        from {
            opacity: 0;
            transform: scale(0.95) translateY(0.5rem);
        }

        to {
            opacity: 1;
            transform: scale(1) translateY(0);
        }
    }

    @keyframes pk-popup-content-in-left {
        from {
            opacity: 0;
            transform: scale(0.95) translateX(0.5rem);
        }

        to {
            opacity: 1;
            transform: scale(1) translateX(0);
        }
    }

    @keyframes pk-popup-content-in-right {
        from {
            opacity: 0;
            transform: scale(0.95) translateX(-0.5rem);
        }

        to {
            opacity: 1;
            transform: scale(1) translateX(0);
        }
    }
`,Fa=class extends Event{constructor(e){super(`pk-create`,{bubbles:!0,cancelable:!0,composed:!0}),this.inputValue=e}},Ia=[Pa,l`
    ${Ye}
    @layer pk-component {
        :host {
            display: inline-block;
            position: relative;
            width: fit-content;
            max-width: 100%;
            align-self: flex-start;
            flex: none;
            color: var(--pk-color-gray-700);
            font-family: var(--pk-font-family);
            font-size: var(--pk-font-size-base);
            line-height: var(--pk-line-height);
            --pk-combobox-min-height: 0;
            --pk-combobox-trigger-min-height: var(--pk-btn-height-default);
            --pk-combobox-padding-block: 6px;
            --pk-combobox-padding-inline: 10px;
            --pk-combobox-font-size: var(--pk-font-size-base);
            --pk-combobox-line-height: var(--pk-input-control-line-height, 1.25rem);
            --pk-combobox-decoration-size: 0.875rem;
            --pk-select-item-min-height: 0;
            --pk-select-item-padding-block: 6px;
            --pk-select-item-padding-inline: 10px;
            --pk-select-item-padding-inline-end: 2rem;
            --pk-select-item-font-size: 14px;
            --pk-select-item-line-height: 1.4;
            --pk-select-item-indicator-size: 0.75rem;
            --pk-select-item-indicator-inset: 0.5rem;
            /* v1 ComboboxLabel default: text-xs → 12px (was 11px). */
            --pk-select-group-label-font-size: 12px;
        }

        :host([width='full']) {
            display: block;
            width: 100%;
        }

        :host([width='full']) .control {
            width: 100%;
        }

        .control {
            display: inline-flex;
            align-items: center;
            --pk-combobox-control-gap: 0.5rem;
            gap: var(--pk-combobox-control-gap);
            /* Fill the host — consumers set min-width/width on :host; fit-content here
               left a dead hit strip beside the painted field (same class of bug as dropdown). */
            width: 100%;
            max-width: 100%;
            min-width: 0;
            min-height: var(--pk-combobox-min-height);
            margin: 0;
            padding: var(--pk-combobox-padding-block) var(--pk-combobox-padding-inline);
            border: 1px solid transparent;
            border-radius: var(--pk-radius-lg);
            --pk-combobox-fill: var(--pk-color-slate-250);
            --pk-combobox-fill-hover: var(--pk-color-slate-300);
            background: var(--pk-combobox-fill);
            color: var(--pk-color-gray-700);
            font: inherit;
            font-size: var(--pk-combobox-font-size);
            line-height: var(--pk-input-control-line-height, 1.25rem);
            white-space: nowrap;
            cursor: text;
            outline: none;
            box-sizing: border-box;
            transition: border-color 0.12s ease, box-shadow 0.12s ease, background 0.12s ease;
        }

        .control[data-popup-open] {
            border-color: var(--pk-color-sky-600);
            box-shadow: var(--pk-input-focus-shadow);
            background: var(--pk-color-white);
        }

        :host(:not([disabled])) .control:hover:not(.is-disabled) {
            background: var(--pk-combobox-fill-hover);
        }

        :host(:not([disabled])) .control[data-popup-open]:hover:not(.is-disabled),
        :host(:not([disabled])) .control[data-popup-open]:focus-within:not(.is-disabled) {
            border-color: var(--pk-color-sky-600);
            box-shadow: var(--pk-input-focus-shadow);
            background: var(--pk-color-white);
        }

        :host(:not([invalid]):not(:state(user-invalid))) .control:focus-within,
        :host(:not([invalid]):not(:state(user-invalid))[data-state='focus-visible']) .control {
            border-color: var(--pk-color-sky-600);
            box-shadow: var(--pk-input-focus-shadow);
            background: var(--pk-color-white);
        }

        .control.is-disabled {
            cursor: not-allowed;
            opacity: 0.5;
        }

        .control-start,
        .control-end {
            display: inline-flex;
            align-items: center;
            flex-shrink: 0;
            line-height: 0;
            color: var(--pk-color-gray-600);
        }

        slot[name='start']::slotted(svg),
        slot[name='end']::slotted(svg) {
            width: var(--pk-combobox-decoration-size);
            height: var(--pk-combobox-decoration-size);
        }

        .combobox-input {
            flex: 1 1 auto;
            width: 100%;
            min-width: 0;
            margin: 0;
            padding: 0;
            border: 0;
            background: transparent;
            color: inherit;
            font: inherit;
            line-height: var(--pk-input-control-line-height, 1.25rem);
            outline: none;
        }

        .combobox-input::placeholder {
            color: currentColor;
        }

        :host([data-has-value]) .combobox-input::placeholder,
        .control[data-popup-open] .combobox-input::placeholder,
        .control:focus-within .combobox-input::placeholder {
            color: var(--pk-color-gray-400);
        }

        /* Expand/clear: the button box IS the hit target. Negative margins cancel the
           control padding / half-gap in layout, while matching extra width/height keeps
           the painted (and clickable) box flush to the field edge — so flex centering
           places the glyph in the middle of the real hit area. */
        .icon-button,
        .clear-button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            align-self: stretch;
            box-sizing: border-box;
            width: calc(var(--pk-combobox-decoration-size) + var(--pk-combobox-control-gap));
            height: auto;
            min-height: var(--pk-combobox-decoration-size);
            margin-block: calc(-1 * var(--pk-combobox-padding-block));
            margin-inline: calc(-0.5 * var(--pk-combobox-control-gap));
            padding: 0;
            border: 0;
            border-radius: 0;
            background: transparent;
            color: var(--pk-color-gray-600);
            cursor: pointer;
            outline: none;
        }

        /* Trailing control absorbs the control's inline-end padding into its hit box. */
        .control > .expand-button,
        .control > .clear-button:last-child {
            width: calc(
                var(--pk-combobox-decoration-size) + (0.5 * var(--pk-combobox-control-gap)) +
                    var(--pk-combobox-padding-inline)
            );
            margin-inline-start: calc(-0.5 * var(--pk-combobox-control-gap));
            margin-inline-end: calc(-1 * var(--pk-combobox-padding-inline));
        }

        .icon-button:disabled,
        .clear-button:disabled {
            cursor: not-allowed;
            opacity: 0.5;
        }

        .icon {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            line-height: 0;
            pointer-events: none;
            color: var(--pk-color-gray-600);
        }

        .icon svg {
            display: block;
            width: 0.75rem;
            height: 0.75rem;
        }

        .clear-button-icon {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            line-height: 0;
            pointer-events: none;
        }

        .clear-button-icon svg {
            display: block;
            width: 0.75rem;
            height: 0.75rem;
        }

        .control--multiple {
            --pk-combobox-control-gap: 0.25rem;
            flex-wrap: wrap;
            align-items: center;
            align-content: center;
            width: 100%;
            max-width: 100%;
            height: auto;
            min-height: 0;
            padding: var(--pk-combobox-padding-block) var(--pk-combobox-padding-inline);
            gap: var(--pk-combobox-control-gap);
            border: var(--pk-input-border);
            border-radius: var(--pk-input-border-radius);
            background: var(--pk-input-bg);
            cursor: text;
        }

        :host([multiple][width='full']) .control--multiple {
            width: 100%;
        }

        :host([multiple]) .control:hover:not(.is-disabled) {
            background: var(--pk-input-bg);
        }

        :host([multiple]:not([invalid]):not(:state(user-invalid))) .control[data-popup-open],
        :host([multiple]:not([invalid]):not(:state(user-invalid))) .control:focus-within,
        :host([multiple]:not([invalid]):not(:state(user-invalid))[data-state='focus-visible']) .control {
            border-color: var(--pk-color-sky-600);
            box-shadow: var(--pk-input-focus-shadow);
            background: var(--pk-input-bg);
        }

        .chips {
            display: flex;
            flex: 0 1 auto;
            flex-wrap: wrap;
            gap: 0.25rem;
            align-items: center;
            min-width: 0;
        }

        .tag {
            /* v1 ComboboxChip: text-xs + py-[2px] → 20px; face color gray-700. */
            --pk-combobox-tag-height: 20px;
            --pk-combobox-tag-padding-inline-start: 6px;
            --pk-combobox-tag-remove-width: 1.25rem;
            display: inline-flex;
            box-sizing: border-box;
            align-items: center;
            justify-content: center;
            gap: 0.125rem;
            max-width: 100%;
            height: var(--pk-combobox-tag-height);
            padding-block: 0;
            padding-inline: var(--pk-combobox-tag-padding-inline-start) 0;
            border-radius: var(--pk-radius-sm);
            background: var(--pk-color-slate-200);
            color: var(--pk-color-gray-700);
            font-size: 12px;
            font-weight: 500;
            line-height: 1rem;
            white-space: nowrap;
        }

        .tag-label {
            overflow: hidden;
            text-overflow: ellipsis;
        }

        /* Chip remove: fill the chip end so the glyph centers in the real target. */
        .tag-remove {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            align-self: stretch;
            box-sizing: border-box;
            width: var(--pk-combobox-tag-remove-width);
            height: auto;
            min-height: 0;
            margin: 0;
            padding: 0;
            border: 0;
            border-radius: 0;
            background: transparent;
            color: inherit;
            cursor: pointer;
            opacity: 0.5;
            outline: none;
        }

        .tag-remove:hover {
            opacity: 1;
        }

        .tag-remove-icon {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            line-height: 0;
            pointer-events: none;
        }

        .tag-remove-icon svg {
            display: block;
            width: 0.625rem;
            height: 0.625rem;
        }

        .combobox-input--inline {
            flex: 1 1 4rem;
            width: auto;
            min-width: 4rem;
            padding: 0;
        }

        :host([multiple]) .control:not([data-popup-open]):not(:focus-within) {
            background: var(--pk-input-bg);
        }

        :host([multiple]) .combobox-input::placeholder {
            color: var(--pk-color-gray-400);
        }

        .create-option {
            display: flex;
            align-items: center;
            width: 100%;
            margin: 0;
            min-height: var(--pk-select-item-min-height);
            padding-block: var(--pk-select-item-padding-block);
            padding-inline: var(--pk-select-item-padding-inline);
            border: 0;
            background: transparent;
            color: var(--pk-color-gray-700);
            font: inherit;
            font-size: var(--pk-select-item-font-size);
            line-height: var(--pk-select-item-line-height);
            text-align: left;
            cursor: pointer;
            outline: none;
            box-sizing: border-box;
        }

        .create-option:hover,
        .create-option.is-highlighted {
            background: var(--pk-color-slate-100);
        }

        .value-input {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
        }

        .panel ::slotted(pk-separator) {
            margin: 4px 0;
        }

        .panel {
            width: max-content;
            min-width: var(--pk-combobox-anchor-width, 8rem);
            padding: 0;
            border: 0;
            border-radius: var(--pk-radius-md);
            background: var(--pk-color-white);
            box-shadow: var(--pk-shadow-popup);
            color: var(--pk-color-gray-700);
            outline: none;
        }

        .panel-body {
            max-height: 16rem;
            overflow: auto;
        }

        .panel--popup {
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }

        .panel--popup .panel-body {
            flex: 1 1 auto;
            min-height: 0;
        }

        :host([popup-mode]) .control--popup {
            display: inline-flex;
            width: 100%;
            max-width: 100%;
            min-height: 0;
            padding: 0;
            border: 0;
            border-radius: 0;
            background: transparent;
            gap: 0;
            cursor: default;
        }

        :host([popup-mode]) .control--popup:hover:not(.is-disabled) {
            background: transparent;
        }

        /* Popup mode paints chrome on the trigger / panel input — do not keep the
           shared .control[data-popup-open] focus ring around the closed-state button. */
        :host([popup-mode]) .control--popup[data-popup-open],
        :host([popup-mode]) .control--popup[data-popup-open]:hover:not(.is-disabled),
        :host([popup-mode]) .control--popup[data-popup-open]:focus-within:not(.is-disabled),
        :host([popup-mode]:not([invalid]):not(:state(user-invalid))) .control--popup:focus-within,
        :host([popup-mode]:not([invalid]):not(:state(user-invalid))[data-state='focus-visible']) .control--popup {
            border: 0;
            box-shadow: none;
            background: transparent;
        }

        .popup-trigger {
            display: inline-flex;
            align-items: center;
            justify-content: space-between;
            gap: 0.75rem;
            width: 100%;
            min-width: 12rem;
            max-width: 100%;
            min-height: var(--pk-combobox-trigger-min-height);
            margin: 0;
            padding: var(--pk-combobox-padding-block) var(--pk-combobox-padding-inline);
            border: 1px solid transparent;
            border-radius: var(--pk-input-border-radius);
            /* Match input-mode fill / v1 default Button — not a white outlined field. */
            background: var(--pk-combobox-fill, var(--pk-color-slate-250));
            color: var(--pk-color-gray-700);
            font: inherit;
            font-size: var(--pk-combobox-font-size);
            font-weight: 400;
            line-height: var(--pk-combobox-line-height);
            text-align: left;
            white-space: nowrap;
            cursor: pointer;
            outline: none;
            box-sizing: border-box;
            transition: border-color 0.12s ease, box-shadow 0.12s ease, background 0.12s ease;
        }

        .popup-trigger:hover:not(:disabled) {
            background: var(--pk-combobox-fill-hover, var(--pk-color-slate-300));
        }

        .popup-trigger:active:not(:disabled),
        .control--popup[data-popup-open] .popup-trigger:not(:disabled) {
            background: var(--pk-combobox-fill-hover, var(--pk-color-slate-300));
        }

        .control--popup[data-popup-open] .popup-trigger:not(:disabled) {
            border-color: transparent;
            box-shadow: none;
        }

        .control--popup:not([data-popup-open]) .popup-trigger:focus-visible,
        :host([data-state='focus-visible']) .control--popup:not([data-popup-open]) .popup-trigger {
            border-color: var(--pk-color-sky-600);
            box-shadow: var(--pk-input-focus-shadow);
            background: var(--pk-color-white);
        }

        .popup-trigger:disabled {
            cursor: not-allowed;
            opacity: 0.5;
        }

        .popup-trigger-value {
            flex: 1 1 auto;
            min-width: 0;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .popup-trigger-value.is-placeholder {
            /* Trigger label is button text, not an input placeholder — keep it readable. */
            color: var(--pk-color-gray-700);
        }

        .popup-trigger-icon {
            flex-shrink: 0;
            display: inline-flex;
            align-items: center;
            line-height: 0;
        }

        .popup-trigger-icon svg {
            display: block;
            width: 0.75rem;
            height: 0.75rem;
        }

        .panel-search {
            flex: none;
            padding: 0.25rem;
        }

        .panel-input {
            display: block;
            width: 100%;
            min-width: 0;
            margin: 0;
            padding: 6px 8px;
            border: var(--pk-input-border);
            border-radius: var(--pk-input-border-radius);
            background: color-mix(in srgb, var(--pk-input-bg) 30%, transparent);
            color: var(--pk-color-gray-700);
            font: inherit;
            font-size: var(--pk-combobox-font-size);
            line-height: 1.4;
            outline: none;
            box-sizing: border-box;
        }

        .panel-input::placeholder {
            color: var(--pk-color-gray-400);
        }

        .panel-input:focus {
            border-color: var(--pk-color-sky-600);
            box-shadow: var(--pk-input-focus-shadow);
            background: var(--pk-color-white);
        }

        :host([popup-mode][size='xs']) .popup-trigger-icon svg {
            width: 0.625rem;
            height: 0.625rem;
        }

        :host([popup-mode][size='xs']) .panel-input {
            padding: 4px 8px;
            font-size: 11px;
        }

        :host([popup-mode][size='sm']) .panel-input {
            font-size: 12px;
        }

        :host([popup-mode][size='lg']) .panel-input {
            padding-block: 8px;
            padding-inline: 12px;
        }

        :host([popup-mode][width='full']) .popup-trigger {
            width: 100%;
        }

        .panel:not([data-open]):not(.closing) {
            opacity: 0;
            pointer-events: none;
        }

        .panel[data-open]:not(.closing) {
            opacity: 1;
            pointer-events: auto;
        }

        .panel[hidden] {
            display: none !important;
        }

        .empty {
            display: flex;
            align-items: center;
            margin: 0;
            min-height: var(--pk-select-item-min-height, var(--pk-input-height));
            padding-block: var(--pk-select-item-padding-block);
            padding-inline: var(--pk-select-item-padding-inline);
            border: var(--pk-select-trigger-border-width, 1px) solid transparent;
            box-sizing: border-box;
            color: var(--pk-color-gray-500);
            font-size: var(--pk-select-item-font-size);
            line-height: var(--pk-select-item-line-height);
        }

        .async-status {
            display: flex;
            align-items: center;
            margin: 0;
            min-height: var(--pk-select-item-min-height, var(--pk-input-height));
            padding-block: var(--pk-select-item-padding-block);
            padding-inline: var(--pk-select-item-padding-inline);
            border: var(--pk-select-trigger-border-width, 1px) solid transparent;
            box-sizing: border-box;
            color: var(--pk-color-gray-500);
            font-size: var(--pk-select-item-font-size);
            line-height: var(--pk-select-item-line-height);
        }

        :host([invalid]) .control,
        :host(:state(user-invalid)) .control {
            border-color: var(--pk-color-rose-600);
        }

        :host([multiple][invalid]) .control,
        :host([multiple]:state(user-invalid)) .control {
            border-color: var(--pk-color-rose-600);
        }

        :host([invalid]) .control:focus-within,
        :host([invalid][data-state='focus-visible']) .control,
        :host(:state(user-invalid)) .control:focus-within,
        :host(:state(user-invalid)[data-state='focus-visible']) .control {
            border-color: var(--pk-color-rose-600);
            box-shadow: var(--pk-input-invalid-focus-shadow);
        }

        :host([size='xs']) {
            --pk-combobox-min-height: 0;
            --pk-combobox-trigger-min-height: var(--pk-btn-height-xs);
            --pk-combobox-padding-block: 4px;
            --pk-combobox-padding-inline: 8px;
            --pk-combobox-font-size: 11px;
            --pk-combobox-decoration-size: 0.625rem;
            --pk-select-item-min-height: 0;
            --pk-select-item-padding-block: 4px;
            --pk-select-item-padding-inline: 8px;
            --pk-select-item-padding-inline-end: 1.75rem;
            --pk-select-item-font-size: 11px;
            --pk-select-item-indicator-size: 0.75rem;
            --pk-select-item-indicator-inset: 0.5rem;
            /* v1 ComboboxLabel xs: text-[11px] */
            --pk-select-group-label-font-size: 11px;
        }

        :host([size='xs']) .control {
            border-radius: var(--pk-radius-sm);
        }

        :host([size='xs']) .icon svg,
        :host([size='xs']) .clear-button-icon svg {
            width: 0.625rem;
            height: 0.625rem;
        }

        :host([size='sm']) {
            --pk-combobox-min-height: 0;
            --pk-combobox-trigger-min-height: var(--pk-btn-height-sm);
            --pk-combobox-padding-block: 6px;
            --pk-combobox-padding-inline: 10px;
            --pk-combobox-font-size: 12px;
            --pk-combobox-decoration-size: 0.6875rem;
            --pk-select-item-min-height: 0;
            --pk-select-item-padding-block: 6px;
            --pk-select-item-padding-inline: 10px;
            --pk-select-item-padding-inline-end: 1.75rem;
            --pk-select-item-font-size: 12px;
            --pk-select-item-indicator-inset: 0.625rem;
            /* v1 ComboboxLabel sm: text-[12px] — empty dropzone field picker uses sm. */
            --pk-select-group-label-font-size: 12px;
        }

        :host([size='sm']) .control {
            border-radius: var(--pk-radius-md);
        }

        :host([size='sm']) .popup-trigger {
            border-radius: var(--pk-radius-md);
        }

        :host([size='sm']) .icon svg,
        :host([size='sm']) .clear-button-icon svg {
            width: 0.6875rem;
            height: 0.6875rem;
        }

        :host([size='lg']) {
            --pk-combobox-trigger-min-height: var(--pk-btn-height-lg);
            --pk-combobox-padding-block: 8px;
            --pk-combobox-padding-inline: 12px;
            --pk-combobox-font-size: var(--pk-font-size-base);
            --pk-combobox-decoration-size: 1rem;
            --pk-select-item-padding-block: 8px;
            --pk-select-item-padding-inline: 12px;
            --pk-select-item-font-size: 14px;
            --pk-select-item-indicator-inset: 0.75rem;
            /* v1 ComboboxLabel lg: text-sm → 14px */
            --pk-select-group-label-font-size: 14px;
        }

        :host([size='xl']) {
            --pk-combobox-trigger-min-height: var(--pk-btn-height-xl);
            --pk-combobox-padding-block: 10px;
            --pk-combobox-padding-inline: 14px;
            --pk-combobox-font-size: var(--pk-font-size-base);
            --pk-combobox-decoration-size: 1.125rem;
            --pk-select-item-padding-block: 10px;
            --pk-select-item-padding-inline: 14px;
            --pk-select-item-padding-inline-end: 2.25rem;
            --pk-select-item-font-size: 14px;
            --pk-select-item-indicator-inset: 0.875rem;
            /* v1 ComboboxLabel xl: text-base → 16px */
            --pk-select-group-label-font-size: 16px;
        }

        :host([size='xl']) .icon svg,
        :host([size='xl']) .clear-button-icon svg {
            width: 0.875rem;
            height: 0.875rem;
        }
    }
`],La=Un(er.chevronDown),Ra=Un(er.xmark),J=class extends cr{constructor(...e){super(...e),this.assumeInteractionOn=[`blur`,`input`],this.open=!1,this.multiple=!1,this.placement=`bottom-start`,this.sideOffset=6,this.clearable=!1,this.withClear=!1,this.allowCreate=!1,this.allowCustomValue=!1,this.autoHighlight=!1,this.popupMode=!1,this.searchPlaceholder=`Search`,this.invalid=!1,this.size=`default`,this.placeholder=``,this.emptyMessage=`No options found.`,this.value=``,this.defaultValue=``,this.values=[],this.defaultValues=[],this.label=``,this.instructions=``,this.ariaLabel=null,this.loopFocus=!0,this.filter=null,this.async=!1,this.loadingMessage=`Searching…`,this.startTypingMessage=`Start typing to search…`,this.fetchOptions=null,this.hasSlotController=new ur(this,`start`,`end`),this.listboxId=pr(`pk-combobox-listbox`),this.inputId=pr(`pk-combobox-input`),this.createOptionId=pr(`pk-combobox-create`),this.options=[],this.inputValue=``,this.hasInputSinceOpening=!1,this.highlightedIndex=-1,this.createOptionHighlighted=!1,this.closing=!1,this.panelAnimated=!1,this.dismissRegistered=!1,this.panelEventTarget=null,this.asyncFetchRequestId=0,this.selectedOptionMeta=null,this.asyncLoading=!1,this.asyncError=null,this.handleOptionsMutation=(e={})=>{let t=this.getOptionElements(),n=t.length!==this.options.length||t.some((e,t)=>e!==this.options[t]);this.options=t,this.applySelection(),e.render!==!1&&n&&this.requestUpdate()},this.syncOptions=()=>{this.handleOptionsMutation({render:!0})},this.togglePanel=e=>{e?.preventDefault(),e?.stopPropagation(),!this.disabled&&(this.open||this.closing?this.closePanel(`api`):this.openPanel())},this.onDocumentPointerDown=e=>{this.isPointerInside(e)||this.closePanel(`light-dismiss`)},this.onDocumentKeyDown=e=>{if(!this.open)return;if(e.key===`Escape`){if(!vr(this))return;e.preventDefault(),e.stopPropagation(),this.closePanel(`escape`);return}let t=this.panelInput;if(t&&e.composedPath().includes(t)||!(Ca.has(e.key)||wa(e)))return;let n=this.panelElement,r=e.composedPath();n&&r.includes(n)&&Ma(e,{anchor:this.controlElement,panel:n})&&(e.preventDefault(),e.stopPropagation(),this.onListboxKeyDown(e))},this.handleOptionSelect=e=>{let{value:t}=e.detail;if(this.multiple){this.values=this.values.includes(t)?this.values.filter(e=>e!==t):[...this.values,t],this.inputValue=``,this.applySelection(),this.emitValueChange(),this.activeInput?.focus({preventScroll:!0});return}this.value=t,this.syncSelectedOptionMeta(),this.applySelection(),this.closePanel(`api`),this.emitValueChange()},this.handleOptionHighlight=e=>{if(!this.open)return;let t=this.getEnabledVisibleOptions().findIndex(t=>t.value===e.detail.value);t===-1||t===this.highlightedIndex||(this.highlightedIndex=t,this.syncHighlight())},this.handleControlMouseDown=e=>{if(this.disabled||this.usesPopupMode||e.composedPath().some(e=>e instanceof HTMLElement?e.classList.contains(`icon-button`)||e.classList.contains(`clear-button`)||e.classList.contains(`tag-remove`):!1))return;let t=e.target===this.activeInput;if(!this.open&&!this.closing){t||e.preventDefault(),this.activeInput?.focus({preventScroll:!0}),this.openPanel();return}t||(e.preventDefault(),this.activeInput?.focus({preventScroll:!0}))},this.handleTriggerKeyDown=e=>{if(!this.disabled){if(e.key===`Enter`||e.key===` `){e.preventDefault(),this.togglePanel(e);return}e.key===`ArrowDown`&&!this.open&&(e.preventDefault(),this.openPanel())}},this.handleListboxKeyDownEvent=e=>{this.open&&this.onListboxKeyDown(e.detail.keyboardEvent)},this.handleCreateMouseEnter=()=>{if(!this.open)return;let e=this.getEnabledVisibleOptions();this.highlightedIndex=e.length,this.syncHighlight()},this.handleCreateKeyDown=e=>{e.preventDefault(),e.stopPropagation(),this.onListboxKeyDown(e)}}static{this.styles=Ia}static get validators(){return[...super.validators,lr(),{observedAttributes:[`required`],checkValidity:e=>{let t=e,n={message:`Please select an item in the list.`,isValid:!0,invalidKeys:[]};return!t.required||!(t.multiple?t.values.length===0:!t.value)?n:(n.isValid=!1,n.invalidKeys.push(`valueMissing`),n)}}]}get panelElement(){return this.popupElement?.getContentElement()??null}get panelInput(){return this.panelElement?.querySelector(`.panel-input`)}get panelBodyElement(){return this.panelElement?.querySelector(`.panel-body`)}get usesPopupMode(){return this.popupMode&&!this.multiple}get activeInput(){return this.usesPopupMode?this.panelInput:this.controlInput}keepsFocusOnInput(){return!!this.activeInput}maintainInputFocus(){this.activeInput?.focus({preventScroll:!0})}get listScrollContainer(){return this.panelBodyElement??this.panelElement??this}connectedCallback(){this.instructions=this.getAttribute(`hint`)??this.instructions,this.refreshOptions(),super.connectedCallback(),this.syncHasValueAttribute(),this.addEventListener(`pk-listbox-keydown`,this.handleListboxKeyDownEvent),this.optionsObserver=new MutationObserver(()=>{this.handleOptionsMutation({render:!0})}),this.optionsObserver.observe(this,{childList:!0,subtree:!0})}disconnectedCallback(){this.unbindPanelEvents(),this.removeEventListener(`pk-listbox-keydown`,this.handleListboxKeyDownEvent),this.optionsObserver?.disconnect(),this.liveRegion?.destroy(),this.liveRegion=void 0,window.clearTimeout(this.asyncFetchTimer),this.fetchAbortController?.abort(),this.closePanel(`api`),super.disconnectedCallback()}updated(e){(e.has(`value`)||e.has(`values`)||e.has(`multiple`))&&(this.syncHasValueAttribute(),this.syncSelectedOptionMeta(),this.applySelection()),super.updated(e)}get validationTarget(){return this.activeInput??this.popupTrigger??this.controlElement}getAriaMirrorTarget(){return this.activeInput??this.popupTrigger??this.controlElement??null}syncFormValue(){if(!this.name){this.setFormValue(null);return}if(this.multiple){let e=new FormData;for(let t of this.values)e.append(this.name,t);this.setFormValue(e);return}this.setFormValue(this.value||``)}resetToDefaultValue(){this.multiple?this.values=[...this.defaultValues]:this.value=this.defaultValue,this.inputValue=``,this.applySelection()}restoreFormState(e){if(e instanceof FormData&&this.name){this.values=e.getAll(this.name).map(String);return}typeof e==`string`&&(this.value=e)}syncHasValueAttribute(){this.toggleAttribute(`data-has-value`,this.hasSelection())}getOptionElements(){let e=this.popupElement?.getContentElement()?.querySelectorAll(`pk-option`);return e&&e.length>0?[...e]:[...this.querySelectorAll(`pk-option`)]}refreshOptions(){this.handleOptionsMutation({render:!1})}bindPanelEvents(){let e=this.panelElement;!e||e===this.panelEventTarget||(this.unbindPanelEvents(),this.panelEventTarget=e,e.addEventListener(`pk-option-select`,this.handleOptionSelect),e.addEventListener(`pk-option-highlight`,this.handleOptionHighlight),e.addEventListener(`pk-listbox-keydown`,this.handleListboxKeyDownEvent))}unbindPanelEvents(){this.panelEventTarget&&=(this.panelEventTarget.removeEventListener(`pk-option-select`,this.handleOptionSelect),this.panelEventTarget.removeEventListener(`pk-option-highlight`,this.handleOptionHighlight),this.panelEventTarget.removeEventListener(`pk-listbox-keydown`,this.handleListboxKeyDownEvent),null)}isOptionInHiddenGroup(e){return!!e.closest(`pk-option-group`)?.hidden}defaultFilter(e,t){let n=e.getLabel().toLowerCase(),r=e.value.toLowerCase(),i=(e.getSearchText?.()??n).toLowerCase();return n.includes(t)||r.includes(t)||i.includes(t)}matchesFilter(e,t){return this.filter?this.filter(e,t):this.defaultFilter(e,t)}getFilterQuery(){return!this.open||!this.multiple&&!this.hasInputSinceOpening&&!this.usesPopupMode?``:this.inputValue.trim().toLowerCase()}getVisibleOptions(){if(this.usesAsyncSearch)return this.options.filter(e=>!this.isOptionInHiddenGroup(e));let e=this.getFilterQuery();return this.options.filter(t=>this.isOptionInHiddenGroup(t)?!1:!e||this.matchesFilter(t,e))}getEnabledVisibleOptions(){return this.getVisibleOptions().filter(e=>!e.disabled)}getSelectedOptions(){if(this.multiple){let e=new Map(this.options.map(e=>[e.value,e]));return this.values.map(t=>e.get(t)).filter(e=>e!==void 0)}let e=this.options.find(e=>e.value===this.value);return e?[e]:[]}getSelectedOption(){return this.options.find(e=>e.value===this.value)}get usesAsyncSearch(){return this.async&&!!this.fetchOptions&&!this.multiple&&!this.usesPopupMode}getSelectedLabel(){return this.getSelectedOption()?.getLabel()??this.selectedOptionMeta?.label??this.value}clearAsyncOptionNodes(){this.querySelectorAll(`:scope > pk-option, :scope > pk-option-group, :scope > pk-separator`).forEach(e=>e.remove())}renderAsyncOptionNodes(e){let t=this.mergeAsyncItems(e);this.clearAsyncOptionNodes();for(let e of t){let t=document.createElement(`pk-option`);t.value=e.value,t.textContent=e.label,this.append(t)}this.handleOptionsMutation({render:!0})}mergeAsyncItems(e){if(!this.value)return e;let t=this.selectedOptionMeta??{value:this.value,label:this.getSelectedOption()?.getLabel()??this.value};return e.some(e=>e.value===t.value)?e:[...e,t]}syncSelectedOptionMeta(){if(!this.value){this.selectedOptionMeta=null;return}let e=this.getSelectedOption();e&&(this.selectedOptionMeta={value:e.value,label:e.getLabel()})}scheduleAsyncFetch(e){window.clearTimeout(this.asyncFetchTimer),this.asyncFetchTimer=window.setTimeout(()=>{this.runAsyncFetch(e)},200)}async runAsyncFetch(e){if(!this.fetchOptions)return;let t=++this.asyncFetchRequestId;if(this.fetchAbortController?.abort(),this.fetchAbortController=new AbortController,!e){this.asyncLoading=!1,this.asyncError=null,this.renderAsyncOptionNodes(this.value&&this.selectedOptionMeta?[this.selectedOptionMeta]:[]);return}this.asyncLoading=!0,this.asyncError=null;try{let n=await this.fetchOptions(e,this.fetchAbortController.signal);if(t!==this.asyncFetchRequestId)return;this.renderAsyncOptionNodes(n)}catch(e){if(this.fetchAbortController?.signal.aborted||t!==this.asyncFetchRequestId||e instanceof DOMException&&e.name===`AbortError`)return;console.error(`Failed to load combobox options:`,e),this.asyncError=`Failed to load options. Please try again.`,this.renderAsyncOptionNodes([])}finally{t===this.asyncFetchRequestId&&(this.asyncLoading=!1)}}getAsyncStatusMessage(){if(!this.usesAsyncSearch||!this.open)return null;if(this.asyncLoading)return this.loadingMessage;if(this.asyncError)return this.asyncError;let e=this.inputValue.trim();return e?this.getEnabledVisibleOptions().length===0&&!this.shouldShowCreateOption()?`No matches for "${e}".`:null:this.value?null:this.startTypingMessage}shouldShowAsyncEmpty(){return!this.usesAsyncSearch||!this.open||!this.inputValue.trim()||this.asyncLoading||this.asyncError?!1:this.getEnabledVisibleOptions().length===0&&!this.shouldShowCreateOption()}isSelected(e){return this.multiple?this.values.includes(e):this.value===e}getDisplayInputValue(){return this.usesPopupMode||this.multiple||this.open?this.inputValue:this.hasSelection()?this.getSelectedLabel():``}getTriggerDisplayValue(){return this.hasSelection()?this.getSelectedLabel():this.placeholder}isTriggerPlaceholder(){return!this.hasSelection()}hasSelection(){return this.multiple?this.values.length>0:!!(this.getSelectedOption()||this.selectedOptionMeta||this.value)}shouldShowCreateOption(){if(!this.allowCreate||!this.open||!this.multiple&&!this.hasInputSinceOpening)return!1;let e=this.inputValue.trim();if(!e)return!1;let t=e.toLowerCase();return!this.options.some(e=>e.getLabel().toLowerCase()===t||e.value.toLowerCase()===t)}getListboxNavItems(){let e=this.getEnabledVisibleOptions();return this.shouldShowCreateOption()&&this.createOptionElement?[...e,this.createOptionElement]:e}applySelection(){let e=this.getVisibleOptions(),t=this.open?this.getFilterQuery():``;for(let n of this.options)n.selected=this.isSelected(n.value),n.hidden=!e.includes(n),n.optionId=`${this.listboxId}-option-${n.value}`,n.matchQuery=t;for(let e of this.querySelectorAll(`pk-option-group`)){let t=[...e.querySelectorAll(`pk-option`)],n=t.length>0&&t.every(e=>e.hidden);e.toggleAttribute(`data-pk-filter-empty`,n)}Aa(this),this.syncValueInput(),this.open&&(this.syncHighlight(),this.announceFilterResults())}syncValueInput(){this.input&&(this.input.value=this.multiple?this.values.join(`,`):this.value,this.input.required=this.required)}syncHighlightedIndexToSelection(){if(this.multiple)return;let e=this.getEnabledVisibleOptions();if(!this.value||e.length===0)return;let t=e.findIndex(e=>e.value===this.value);t>=0&&(this.highlightedIndex=t)}resetHighlightedIndexOnOpen(){if(this.autoHighlight){if(this.value){this.syncHighlightedIndexToSelection();return}this.highlightedIndex=0;return}this.highlightedIndex=-1}syncHighlight(){let e=this.getEnabledVisibleOptions(),t=this.shouldShowCreateOption(),n=e.length+ +!!t;for(let e of this.options)e.highlighted=!1,e.focusIndex=-1;if(this.createOptionHighlighted=!1,n===0||this.highlightedIndex<0)return;if(this.highlightedIndex>=n&&(this.highlightedIndex=n-1),t&&this.highlightedIndex===e.length){this.createOptionHighlighted=!0,this.keepsFocusOnInput()||this.createOptionElement?.focus({preventScroll:!0}),br(this.createOptionElement,this.listScrollContainer,`vertical`,`auto`),this.keepsFocusOnInput()&&this.maintainInputFocus();return}let r=e[this.highlightedIndex];r&&(r.highlighted=!0,r.focusIndex=this.keepsFocusOnInput()?-1:0,br(r,this.listScrollContainer,`vertical`,`auto`),this.keepsFocusOnInput()&&this.maintainInputFocus())}getActiveDescendantId(){let e=this.getEnabledVisibleOptions();return this.shouldShowCreateOption()&&this.highlightedIndex===e.length?this.createOptionId:e[this.highlightedIndex]?.optionId||null}announceFilterResults(){this.liveRegion||=new mr(`polite`);let e=this.getEnabledVisibleOptions().length,t=this.getFilterQuery();if(t){if(this.shouldShowCreateOption()){this.liveRegion.announce(`Create ${t}`);return}this.liveRegion.announce(e===0?`${this.emptyMessage}`:`${e} ${e===1?`result`:`results`} available`)}}async show(){this.open||this.closing||this.disabled||await this.openPanel()}async hide(e=`api`){!this.open||this.closing||await this.closePanel(e)}openPanel(){let e=this.controlElement;if(!e)return Promise.resolve();if(this.open)return this.activeInput?.focus({preventScroll:!0}),Promise.resolve();if(this.closing)return Promise.resolve();this.dispatchEvent(new Sr),this.closing=!1,this.panelAnimated=!1,this.open=!0,this.hasInputSinceOpening=!1,this.inputValue=this.usesPopupMode?``:!this.multiple&&this.hasSelection()?this.getSelectedLabel():``,this.applySelection(),this.resetHighlightedIndexOnOpen(),this.usesAsyncSearch&&(this.syncSelectedOptionMeta(),this.asyncError=null,this.asyncLoading=!1,this.renderAsyncOptionNodes(this.selectedOptionMeta?[this.selectedOptionMeta]:[]));let t=e.getBoundingClientRect().width;return this.style.setProperty(`--pk-combobox-anchor-width`,`${t}px`),this.popupElement.active=!0,this.panelElement&&(this.panelElement.hidden=!1,Or(this.panelElement,this.placement)),this.registerDismissHandlers(),this.syncHighlight(),this.usesPopupMode?this.popupTrigger?.blur():this.activeInput?.focus({preventScroll:!0}),this.updateComplete.then(async()=>{let e=await kr(this.popupElement,this.placement,300,{requireEvent:!0});if(this.panelElement&&Or(this.panelElement,e),this.panelAnimated=!0,this.bindPanelEvents(),this.refreshOptions(),this.activeInput?.focus({preventScroll:!0}),this.highlightedIndex>=0&&!this.keepsFocusOnInput()){let e=this.getEnabledVisibleOptions(),t=this.highlightedIndex;this.shouldShowCreateOption()&&t===e.length?this.createOptionElement?.focus({preventScroll:!0}):e[t]?.focusControl()}this.dispatchEvent(new Cr),this.dispatchEvent(new CustomEvent(`pk-open-change`,{detail:{open:!0},bubbles:!0,composed:!0}))})}commitCustomValueIfAllowed(){if(this.multiple||!this.allowCustomValue)return!1;let e=this.inputValue.trim();if(!e)return!1;let t=this.options.find(t=>t.getLabel().toLowerCase()===e.toLowerCase()||t.value.toLowerCase()===e.toLowerCase())?.value??e;return this.value===t?!1:(this.value=t,!0)}commitInputOnClose(e){return this.multiple||this.usesPopupMode?!1:this.hasInputSinceOpening?this.inputValue.trim()?this.shouldCommitCustomValueOnClose(e)?this.commitCustomValueIfAllowed():!1:this.value?(this.value=``,!0):!1:this.shouldCommitCustomValueOnClose(e)?this.commitCustomValueIfAllowed():!1}shouldCommitCustomValueOnClose(e){return e===`light-dismiss`||e===`pointer-dismiss`}async closePanel(e=`unknown`){if(!this.open||this.closing)return;let t=new wr(e);if(!this.dispatchEvent(t))return;let n=this.commitInputOnClose(e);this.unbindPanelEvents(),this.closing=!0,this.panelAnimated=!1,await this.waitForExitAnimation(),this.open=!1,this.closing=!1,this.panelAnimated=!1,this.hasInputSinceOpening=!1,this.inputValue=``,this.panelElement&&(this.panelElement.hidden=!0,this.panelElement.removeAttribute(`data-side`)),this.popupElement.active=!1,this.unregisterDismissHandlers(),this.applySelection(),this.usesAsyncSearch&&(window.clearTimeout(this.asyncFetchTimer),this.fetchAbortController?.abort(),this.asyncLoading=!1,this.asyncError=null,this.renderAsyncOptionNodes(this.selectedOptionMeta?[this.selectedOptionMeta]:[])),n&&(this.syncHasValueAttribute(),this.emitValueChange()),this.shouldReturnFocusToInput(e)?this.usesPopupMode?this.popupTrigger?.focus({preventScroll:!0}):this.activeInput?.focus({preventScroll:!0}):(this.activeInput?.blur(),this.popupTrigger?.blur()),this.dispatchEvent(new Tr),this.dispatchEvent(new CustomEvent(`pk-open-change`,{detail:{open:!1},bubbles:!0,composed:!0}))}waitForExitAnimation(){let e=this.panelElement;return e?new Promise(t=>{let n=!1,r=()=>{n||(n=!0,e.removeEventListener(`animationend`,i),window.clearTimeout(a),e.classList.remove(`closing`),t())},i=t=>{t.target===e&&t.animationName.startsWith(`pk-popup-content-out`)&&r()};e.classList.add(`closing`),e.addEventListener(`animationend`,i);let a=window.setTimeout(r,150)}):Promise.resolve()}shouldReturnFocusToInput(e){return e!==`light-dismiss`&&e!==`pointer-dismiss`}registerDismissHandlers(){gr(this),this.dismissRegistered=!0,document.addEventListener(`pointerdown`,this.onDocumentPointerDown,!0),document.addEventListener(`keydown`,this.onDocumentKeyDown,!0)}unregisterDismissHandlers(){this.dismissRegistered&&=(_r(this),!1),document.removeEventListener(`pointerdown`,this.onDocumentPointerDown,!0),document.removeEventListener(`keydown`,this.onDocumentKeyDown,!0)}isPointerInside(e){return Na(e,{anchor:this.controlElement,panel:this.panelElement})}handleCreateOption(){let e=this.inputValue.trim();if(!e)return;let t=new Fa(e);if(!this.dispatchEvent(t))return;let n=document.createElement(`pk-option`);if(n.value=e,n.textContent=e,this.append(n),this.multiple){this.values.includes(e)||(this.values=[...this.values,e]),this.inputValue=``,this.applySelection(),this.emitValueChange(),this.activeInput?.focus({preventScroll:!0});return}this.value=e,this.applySelection(),this.closePanel(`api`),this.emitValueChange()}removeTag(e,t){t.preventDefault(),t.stopPropagation(),this.values=this.values.filter(t=>t!==e),this.applySelection(),this.emitValueChange(),this.activeInput?.focus({preventScroll:!0})}handleClear(e){e.preventDefault(),e.stopPropagation(),this.multiple?this.values=[]:this.value=``,this.inputValue=``,this.selectedOptionMeta=null,this.usesAsyncSearch&&this.renderAsyncOptionNodes([]),this.applySelection(),this.dispatchEvent(new xr),this.emitValueChange(),this.activeInput?.focus()}emitValueChange(){this.dispatchEvent(new CustomEvent(`pk-change`,{detail:{value:this.multiple?[...this.values]:this.value},bubbles:!0,composed:!0})),this.dispatchEvent(new Event(`input`,{bubbles:!0,composed:!0})),this.dispatchEvent(new Event(`change`,{bubbles:!0,composed:!0}))}handleInput(e){this.hasInputSinceOpening=!0,this.inputValue=e.target.value,this.highlightedIndex=this.autoHighlight?0:-1,this.applySelection(),this.usesAsyncSearch&&(this.asyncError=null,this.scheduleAsyncFetch(this.inputValue.trim())),this.open||this.openPanel()}handleInputKeyDown(e){if(e.key===`Backspace`&&this.multiple&&!this.inputValue&&this.values.length>0){e.preventDefault(),this.values=this.values.slice(0,-1),this.applySelection(),this.emitValueChange();return}if(e.key===`Escape`&&this.open){if(e.preventDefault(),this.hasInputSinceOpening&&this.inputValue){this.hasInputSinceOpening=!1,this.inputValue=this.usesPopupMode?``:!this.multiple&&this.hasSelection()?this.getSelectedLabel():``,this.highlightedIndex=this.autoHighlight?0:-1,this.applySelection();return}this.closePanel(`escape`);return}if(e.key===`ArrowDown`&&!this.open){e.preventDefault(),this.openPanel();return}if(e.key===`Tab`&&this.open){let e=!1;this.multiple||(e=this.commitCustomValueIfAllowed()),this.closePanel(`api`),e&&(this.syncHasValueAttribute(),this.emitValueChange());return}if(this.open&&e.key===`Enter`&&!this.multiple&&this.getEnabledVisibleOptions().length===0&&this.allowCustomValue&&this.inputValue.trim()&&!this.shouldShowCreateOption()){e.preventDefault();let t=this.commitCustomValueIfAllowed();this.closePanel(`api`),t&&(this.syncHasValueAttribute(),this.emitValueChange());return}this.open&&this.onListboxKeyDown(e)}onListboxKeyDown(e){let t=this.getListboxNavItems(),n=this.getEnabledVisibleOptions();if(this.highlightedIndex<0){if(e.key===`ArrowDown`||e.key===`ArrowRight`){(n.length>0||this.shouldShowCreateOption())&&(e.preventDefault(),this.highlightedIndex=0,this.syncHighlight());return}if(e.key===`ArrowUp`||e.key===`ArrowLeft`){(n.length>0||this.shouldShowCreateOption())&&(e.preventDefault(),this.highlightedIndex=this.shouldShowCreateOption()?n.length:Math.max(n.length-1,0),this.syncHighlight());return}if(e.key===`Enter`||e.key===` `)return}if(e.key===`Enter`&&this.shouldShowCreateOption()&&this.highlightedIndex===n.length){e.preventDefault(),this.handleCreateOption();return}if(this.multiple&&(e.key===`Enter`||e.key===` `)){let t=n[this.highlightedIndex];t&&(e.preventDefault(),t.dispatchEvent(new CustomEvent(`pk-option-select`,{detail:{value:t.value},bubbles:!0,composed:!0})));return}this.highlightedIndex=Oa(e,{items:t,currentIndex:this.highlightedIndex,multiselect:this.multiple,loop:this.loopFocus,onSelect:e=>{this.highlightedIndex=e,this.syncHighlight()},focusItem:e=>{if(!this.keepsFocusOnInput()){if(this.shouldShowCreateOption()&&e===n.length){this.createOptionElement?.focus({preventScroll:!0});return}n[e]?.focusControl()}},onClose:()=>{this.closePanel(`escape`)}})}renderHostDecorationSlot(e){return this.hasSlotController.test(e)?k`
            <span part=${e} class=${e===`start`?`control-start`:`control-end`}>
                <slot name=${e}></slot>
            </span>
        `:k`<slot name=${e} hidden></slot>`}renderChevronButton(){return k`
            <button
                type="button"
                class="icon-button expand-button"
                part="expand-button"
                aria-label="Toggle options"
                ?disabled=${this.disabled}
                @click=${this.togglePanel}
            >
                <span class="icon" aria-hidden="true">${z(La)}</span>
            </button>
        `}renderTags(){return this.getSelectedOptions().map(e=>k`
            <span class="tag" part="tag">
                <span class="tag-label">${e.getLabel()}</span>
                <button
                    type="button"
                    class="tag-remove"
                    part="tag-remove"
                    aria-label=${`Remove ${e.getLabel()}`}
                    ?disabled=${this.disabled}
                    @click=${t=>this.removeTag(e.value,t)}
                >
                    <span class="tag-remove-icon" aria-hidden="true">${z(Ra)}</span>
                </button>
            </span>
        `)}shouldShowPlaceholder(){return!this.inputValue.trim()&&!this.hasSelection()}renderInput(){let e=this.open?this.getActiveDescendantId():null,t=this.shouldShowPlaceholder();return k`
            <input
                part="input"
                class=${R({"combobox-input":!0,"control-input":!0,"combobox-input--inline":this.multiple})}
                type="text"
                role="combobox"
                id=${this.inputId}
                .value=${this.getDisplayInputValue()}
                placeholder=${t?this.placeholder:j}
                ?disabled=${this.disabled}
                aria-label=${this.ariaLabel??j}
                aria-expanded=${this.open?`true`:`false`}
                aria-controls=${this.listboxId}
                aria-autocomplete="list"
                aria-activedescendant=${e??j}
                @input=${this.handleInput}
                @keydown=${this.handleInputKeyDown}
            />
        `}renderPanelInput(){let e=this.open?this.getActiveDescendantId():null;return k`
            <div part="panel-search" class="panel-search">
                <input
                    part="panel-input"
                    class="combobox-input panel-input"
                    type="text"
                    role="combobox"
                    id=${this.inputId}
                    .value=${this.inputValue}
                    placeholder=${this.searchPlaceholder}
                    ?disabled=${this.disabled}
                    aria-label=${this.ariaLabel??this.searchPlaceholder}
                    aria-expanded="true"
                    aria-controls=${this.listboxId}
                    aria-autocomplete="list"
                    aria-activedescendant=${e??j}
                    @input=${this.handleInput}
                    @keydown=${this.handleInputKeyDown}
                />
            </div>
        `}renderPopupTrigger(){return k`
            <button
                type="button"
                part="trigger"
                class="popup-trigger"
                ?disabled=${this.disabled}
                aria-label=${this.ariaLabel??j}
                aria-haspopup="listbox"
                aria-expanded=${this.open?`true`:`false`}
                aria-controls=${this.listboxId}
                @click=${this.togglePanel}
                @keydown=${this.handleTriggerKeyDown}
            >
                <span
                    class=${R({"popup-trigger-value":!0,"is-placeholder":this.isTriggerPlaceholder()})}
                >
                    ${this.getTriggerDisplayValue()}
                </span>
                <span class="icon popup-trigger-icon" aria-hidden="true">${z(La)}</span>
            </button>
        `}renderControlContent(){if(this.usesPopupMode)return this.renderPopupTrigger();let e=(this.clearable||this.withClear)&&this.hasSelection()&&!this.disabled;return this.multiple?k`
                ${this.renderHostDecorationSlot(`start`)}
                <div class="chips" part="tags">
                    ${this.renderTags()}
                    ${this.renderInput()}
                </div>
                ${this.renderHostDecorationSlot(`end`)}
                ${e?k`
                        <button
                            type="button"
                            class="clear-button"
                            part="clear-button"
                            aria-label="Clear selection"
                            ?disabled=${this.disabled}
                            @click=${this.handleClear}
                        >
                            <span class="clear-button-icon" aria-hidden="true">${z(Ra)}</span>
                        </button>
                    `:j}
            `:k`
            ${this.renderHostDecorationSlot(`start`)}
            ${this.renderInput()}
            ${this.renderHostDecorationSlot(`end`)}
            ${e?k`
                    <button
                        type="button"
                        class="clear-button"
                        part="clear-button"
                        aria-label="Clear selection"
                        ?disabled=${this.disabled}
                        @click=${this.handleClear}
                    >
                        <span class="clear-button-icon" aria-hidden="true">${z(Ra)}</span>
                    </button>
                `:j}
            ${this.renderChevronButton()}
        `}render(){let e=this.getEnabledVisibleOptions(),t=this.shouldShowCreateOption(),n=this.open&&(this.usesAsyncSearch?this.shouldShowAsyncEmpty():e.length===0&&!t),r=this.getAsyncStatusMessage(),i=this.inputValue.trim();return k`
            <input
                class="value-input"
                part="value-input"
                tabindex="-1"
                aria-hidden="true"
                .value=${this.multiple?this.values.join(`,`):this.value}
                ?required=${this.required}
                @input=${()=>this.updateValidity()}
            />
            <div
                part="control"
                class=${R({control:!0,"is-disabled":this.disabled,"control--multiple":this.multiple,"control--popup":this.usesPopupMode})}
                data-popup-open=${this.open?``:j}
                @mousedown=${this.handleControlMouseDown}
            >
                ${this.renderControlContent()}
            </div>
            <pk-popup
                .active=${this.open||this.closing}
                .anchor=${this.controlElement??``}
                .placement=${this.placement}
                .distance=${this.sideOffset}
                .sync=${`width`}
                flip
                shift
            >
                <div
                    part="panel"
                    class=${R({panel:!0,"pk-popup-content":!0,closing:this.closing,"panel--popup":this.usesPopupMode})}
                    tabindex="-1"
                    ?hidden=${!this.open&&!this.closing}
                    data-open=${this.panelAnimated&&!this.closing?``:j}
                >
                    ${this.usesPopupMode?this.renderPanelInput():j}
                    <div
                        part="panel-body"
                        class="panel-body"
                        id=${this.listboxId}
                        role="listbox"
                        aria-multiselectable=${this.multiple?`true`:`false`}
                        aria-busy=${this.usesAsyncSearch&&this.asyncLoading?`true`:j}
                        @slotchange=${this.syncOptions}
                    >
                        <slot></slot>
                        ${r?k`
                                <div part="async-status" class="async-status" role="status">${r}</div>
                            `:j}
                        ${t?k`
                                <button
                                    type="button"
                                    part="create-option"
                                    class=${R({"create-option":!0,"is-highlighted":this.createOptionHighlighted})}
                                    id=${this.createOptionId}
                                    role="option"
                                    aria-selected="false"
                                    tabindex="-1"
                                    @click=${this.handleCreateOption}
                                    @mouseenter=${this.handleCreateMouseEnter}
                                    @keydown=${this.handleCreateKeyDown}
                                >
                                    Create "${i}"
                                </button>
                            `:j}
                        ${n?k`
                                <div part="empty" class="empty">${this.emptyMessage}</div>
                            `:j}
                    </div>
                </div>
            </pk-popup>
        `}};N([F({type:Boolean,reflect:!0})],J.prototype,`open`,void 0),N([F({type:Boolean,reflect:!0})],J.prototype,`multiple`,void 0),N([F({reflect:!0})],J.prototype,`placement`,void 0),N([F({attribute:`side-offset`,type:Number})],J.prototype,`sideOffset`,void 0),N([F({type:Boolean,reflect:!0})],J.prototype,`clearable`,void 0),N([F({attribute:`with-clear`,type:Boolean})],J.prototype,`withClear`,void 0),N([F({attribute:`allow-create`,type:Boolean})],J.prototype,`allowCreate`,void 0),N([F({attribute:`allow-custom-value`,type:Boolean})],J.prototype,`allowCustomValue`,void 0),N([F({attribute:`auto-highlight`,type:Boolean})],J.prototype,`autoHighlight`,void 0),N([F({attribute:`popup-mode`,type:Boolean,reflect:!0})],J.prototype,`popupMode`,void 0),N([F({attribute:`search-placeholder`})],J.prototype,`searchPlaceholder`,void 0),N([F({type:Boolean,reflect:!0})],J.prototype,`invalid`,void 0),N([F({reflect:!0})],J.prototype,`size`,void 0),N([F({reflect:!0})],J.prototype,`width`,void 0),N([F()],J.prototype,`placeholder`,void 0),N([F({attribute:`empty-message`})],J.prototype,`emptyMessage`,void 0),N([F()],J.prototype,`value`,void 0),N([F({attribute:`default-value`})],J.prototype,`defaultValue`,void 0),N([F({type:Array,attribute:!1})],J.prototype,`values`,void 0),N([F({attribute:!1})],J.prototype,`defaultValues`,void 0),N([F()],J.prototype,`label`,void 0),N([F()],J.prototype,`instructions`,void 0),N([F({attribute:`aria-label`})],J.prototype,`ariaLabel`,void 0),N([F({attribute:`loop-focus`,type:Boolean})],J.prototype,`loopFocus`,void 0),N([F({attribute:!1})],J.prototype,`filter`,void 0),N([F({type:Boolean,reflect:!0})],J.prototype,`async`,void 0),N([F({attribute:`loading-message`})],J.prototype,`loadingMessage`,void 0),N([F({attribute:`start-typing-message`})],J.prototype,`startTypingMessage`,void 0),N([F({attribute:!1})],J.prototype,`fetchOptions`,void 0),N([L(`pk-popup`)],J.prototype,`popupElement`,void 0),N([L(`.control`)],J.prototype,`controlElement`,void 0),N([L(`.control-input`)],J.prototype,`controlInput`,void 0),N([L(`.popup-trigger`)],J.prototype,`popupTrigger`,void 0),N([L(`.create-option`)],J.prototype,`createOptionElement`,void 0),N([L(`.value-input`)],J.prototype,`input`,void 0),N([I()],J.prototype,`inputValue`,void 0),N([I()],J.prototype,`highlightedIndex`,void 0),N([I()],J.prototype,`createOptionHighlighted`,void 0),N([I()],J.prototype,`closing`,void 0),N([I()],J.prototype,`panelAnimated`,void 0),N([I()],J.prototype,`asyncLoading`,void 0),N([I()],J.prototype,`asyncError`,void 0),J=N([P(`pk-combobox`)],J);var Y={default:l`
        --pk-dropdown-item-padding-block: 8px;
        --pk-dropdown-item-padding-inline: 12px;
        --pk-dropdown-item-gap: 0.625rem;
        --pk-dropdown-item-font-size: var(--pk-font-size-base);
        --pk-dropdown-item-line-height: 1.5;
        --pk-dropdown-item-icon-size: 12px;
        --pk-dropdown-label-padding-inline: 12px;
        --pk-dropdown-label-font-size: 13px;
        --pk-dropdown-details-font-size: var(--pk-font-size-sm);
    `,xs:l`
        --pk-dropdown-item-padding-block: 3px;
        --pk-dropdown-item-padding-inline: 8px;
        --pk-dropdown-item-gap: 0.375rem;
        --pk-dropdown-item-font-size: 12px;
        --pk-dropdown-item-line-height: 1.5;
        --pk-dropdown-item-icon-size: 10px;
        --pk-dropdown-label-padding-inline: 8px;
        --pk-dropdown-label-font-size: 11px;
        --pk-dropdown-details-font-size: 11px;
    `,sm:l`
        --pk-dropdown-item-padding-block: 4px;
        --pk-dropdown-item-padding-inline: 10px;
        --pk-dropdown-item-gap: 0.4375rem;
        --pk-dropdown-item-font-size: 13px;
        --pk-dropdown-item-line-height: 1.5;
        --pk-dropdown-item-icon-size: 12px;
        --pk-dropdown-label-padding-inline: 10px;
        --pk-dropdown-label-font-size: 11px;
        --pk-dropdown-details-font-size: 12px;
    `,lg:l`
        --pk-dropdown-item-padding-block: 10px;
        --pk-dropdown-item-padding-inline: 14px;
        --pk-dropdown-item-gap: 0.75rem;
        --pk-dropdown-item-font-size: 16px;
        --pk-dropdown-item-line-height: 1.5;
        --pk-dropdown-item-icon-size: 14px;
        --pk-dropdown-label-padding-inline: 14px;
        --pk-dropdown-label-font-size: 14px;
        --pk-dropdown-details-font-size: var(--pk-font-size-sm);
    `,xl:l`
        --pk-dropdown-item-padding-block: 12px;
        --pk-dropdown-item-padding-inline: 16px;
        --pk-dropdown-item-gap: 0.75rem;
        --pk-dropdown-item-font-size: 18px;
        --pk-dropdown-item-line-height: 1.5;
        --pk-dropdown-item-icon-size: 16px;
        --pk-dropdown-label-padding-inline: 16px;
        --pk-dropdown-label-font-size: 15px;
        --pk-dropdown-details-font-size: var(--pk-font-size-base);
    `},za=l`
    @layer pk-component {
        :host {
            ${Y.default}
        }

        :host([size='xs']) {
            ${Y.xs}
        }

        :host([size='sm']) {
            ${Y.sm}
        }

        :host([size='lg']) {
            ${Y.lg}
        }

        :host([size='xl']) {
            ${Y.xl}
        }
    }
`,Ba=l`
    @layer pk-component {
        .panel[data-size='default'],
        .submenu-panel[data-size='default'] {
            ${Y.default}
        }

        .panel[data-size='xs'],
        .submenu-panel[data-size='xs'] {
            ${Y.xs}
        }

        .panel[data-size='sm'],
        .submenu-panel[data-size='sm'] {
            ${Y.sm}
        }

        .panel[data-size='lg'],
        .submenu-panel[data-size='lg'] {
            ${Y.lg}
        }

        .panel[data-size='xl'],
        .submenu-panel[data-size='xl'] {
            ${Y.xl}
        }
    }
`;l`
    ${za}
    ${Ba}
`;var Va=[Pa,Ba,l`
    @layer pk-component {
        :host {
            display: block;
            position: relative;
            /*
             * Slotted label text inherits from this host (light DOM), not from
             * shadow .item — pin size-token metrics so Craft CP / Tailwind /
             * bare hosts all get the same item rhythm.
             */
            font-size: var(--pk-dropdown-item-font-size, var(--pk-font-size-base));
            line-height: var(--pk-dropdown-item-line-height, 1.5);
            color: var(--text-color, var(--pk-color-gray-700));
        }

        .item {
            display: flex;
            align-items: center;
            gap: var(--pk-dropdown-item-gap, 0.625rem);
            width: 100%;
            margin: 0;
            padding: var(--pk-dropdown-item-padding-block, 8px) var(--pk-dropdown-item-padding-inline, 12px);
            border: 0;
            background: transparent;
            color: inherit;
            font: inherit;
            font-size: var(--pk-dropdown-item-font-size, var(--pk-font-size-base));
            /* Explicit — do not let font:inherit re-leak page line-height. */
            line-height: var(--pk-dropdown-item-line-height, 1.5);
            font-weight: normal;
            text-align: left;
            white-space: nowrap;
            cursor: default;
            user-select: none;
            outline: none;
            box-sizing: border-box;
        }

        .item:hover:not([disabled]):not([aria-disabled='true']),
        :host([data-highlighted]) .item,
        :host([submenu-open]) .item {
            background: var(--pk-color-slate-100);
        }

        .item:focus-visible {
            background: var(--pk-color-slate-100);
        }

        .item[aria-disabled='true'] {
            pointer-events: none;
            opacity: 0.5;
        }

        .label {
            flex: 1 1 auto;
            min-width: 0;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .prefix {
            display: inline-flex;
            flex: 0 0 auto;
            align-items: center;
            justify-content: center;
            width: var(--pk-dropdown-item-icon-size, 12px);
            height: var(--pk-dropdown-item-icon-size, 12px);
            line-height: 0;
        }

        .prefix--empty {
            display: none;
        }

        .prefix ::slotted(*) {
            display: inline-flex;
            flex: 0 0 auto;
            align-items: center;
            justify-content: center;
            width: var(--pk-dropdown-item-icon-size, 12px);
            height: var(--pk-dropdown-item-icon-size, 12px);
            /* Kill pk-icon text-baseline nudge inside the padded flex row. */
            vertical-align: 0;
        }

        .prefix ::slotted(svg),
        .prefix ::slotted(*) svg,
        .prefix ::slotted(.pk-dropdown-item__prefix-icon) {
            display: block;
            width: var(--pk-dropdown-item-icon-size, 12px) !important;
            height: var(--pk-dropdown-item-icon-size, 12px) !important;
            max-width: var(--pk-dropdown-item-icon-size, 12px);
            max-height: var(--pk-dropdown-item-icon-size, 12px);
            flex-shrink: 0;
            pointer-events: none;
        }

        .details {
            margin-left: auto;
            color: var(--pk-color-gray-500);
            font-size: var(--pk-dropdown-details-font-size, var(--pk-font-size-sm));
            letter-spacing: 0.04em;
        }

        .details:empty {
            display: none;
        }

        .check {
            display: inline-flex;
            flex: 0 0 auto;
            align-items: center;
            justify-content: center;
            width: 12px;
            height: 12px;
            color: var(--pk-color-gray-700);
        }

        .check svg {
            display: block;
            width: 12px;
            height: 12px;
            flex-shrink: 0;
            pointer-events: none;
        }

        .submenu-icon {
            display: inline-flex;
            flex: 0 0 auto;
            align-items: center;
            justify-content: center;
            width: 1rem;
            color: var(--pk-color-gray-700);
        }

        .submenu-icon svg {
            display: block;
            width: 1em;
            height: 1em;
            flex-shrink: 0;
            pointer-events: none;
        }

        .check {
            opacity: 0;
        }

        :host([checked]) .check {
            opacity: 1;
        }

        :host([type='checkbox']) .check,
        :host([type='radio']) .check {
            margin-left: auto;
        }

        :host([type='checkbox'][checked]) .check,
        :host([type='radio'][checked]) .check {
            opacity: 1;
        }

        .submenu-icon:empty {
            display: none;
        }

        :host([destructive]) .item {
            color: var(--pk-color-error);
        }

        :host([destructive]) .item:hover:not([disabled]):not([aria-disabled='true']),
        :host([destructive]) .item:focus-visible {
            color: var(--pk-color-error);
        }

        .submenu-panel {
            width: max-content;
            min-width: 8rem;
            overflow: hidden;
            padding: 4px 0;
            border-radius: var(--pk-radius-md);
            background: var(--pk-color-white);
            box-shadow: var(--pk-shadow-popup);
            /* Match root menu panel — Craft body text, not gray-900. */
            color: var(--text-color, var(--pk-color-gray-700));
        }

        .submenu-panel ::slotted(pk-dropdown-item),
        .submenu-panel ::slotted(pk-dropdown-separator),
        .submenu-panel ::slotted(pk-dropdown-label) {
            display: block;
        }

        .submenu-panel[hidden] {
            display: none !important;
        }
    }
`],Ha,Ua=Un(St),Wa=Un(Tt),X=class extends M{static{Ha=this}constructor(...e){super(...e),this.value=``,this.type=`normal`,this.radioGroup=``,this.disabled=!1,this.destructive=!1,this.checked=!1,this.submenuOpen=!1,this.active=!1,this.submenuAnimated=!1,this.hasSlotController=new ur(this,`submenu`,`details`,`start`,`prefix`),this.handleMouseEnter=()=>{!this.hasSubmenu()||this.disabled||(this.notifyParentOfOpening(),this.submenuOpen=!0)},this.handleHostClick=e=>{this.disabled&&(e.preventDefault(),e.stopImmediatePropagation())}}static{this.styles=Va}connectedCallback(){super.connectedCallback(),this.syncRole(),this.syncSubmenuAria(),this.addEventListener(`click`,this.handleHostClick),this.addEventListener(`mouseenter`,this.handleMouseEnter)}disconnectedCallback(){this.removeEventListener(`click`,this.handleHostClick),this.removeEventListener(`mouseenter`,this.handleMouseEnter),this.closeSubmenu(),super.disconnectedCallback()}updated(e){(e.has(`type`)||e.has(`checked`))&&this.syncRole(),(e.has(`submenuOpen`)||e.size===0)&&this.syncSubmenuAria(),e.has(`submenuOpen`)&&(this.submenuOpen?this.ensureSubmenuSurface():this.submenuAnimated=!1)}hasSubmenu(){return this.hasSlotController.test(`submenu`)}syncSubmenuAria(){let e=this.hasSubmenu();e?this.setAttribute(`aria-haspopup`,`menu`):this.removeAttribute(`aria-haspopup`),this.setAttribute(`aria-expanded`,e&&this.submenuOpen?`true`:`false`)}focusControl(){this.shadowRoot?.querySelector(`.item`)?.focus({preventScroll:!0})}focus(e){let t=this.shadowRoot?.querySelector(`.item`);if(t){t.focus(e);return}super.focus(e)}get submenuElement(){return this.submenuPanelElement??null}closeSubmenu(){this.submenuAnimated=!1,this.submenuOpen=!1}openSubmenu(){!this.hasSubmenu()||this.disabled||!this.isConnected||(this.notifyParentOfOpening(),this.submenuOpen=!0)}notifyParentOfOpening(){this.dispatchEvent(new CustomEvent(`pk-submenu-open`,{bubbles:!0,composed:!0,detail:{item:this}}));let e=this.parentElement;if(e)for(let t of e.children)t!==this&&t instanceof Ha&&t.getAttribute(`slot`)===this.getAttribute(`slot`)&&t.submenuOpen&&(t.submenuOpen=!1)}ensureSubmenuSurface(){!this.hasSubmenu()||this.disabled||(this.submenuAnimated=!0,this.updateComplete.then(()=>{!this.submenuOpen||!this.submenuPanelElement||(this.submenuPanelElement.hidden=!1,Or(this.submenuPanelElement,`right-start`),kr(this.submenuPopupElement,`right-start`).then(e=>{Or(this.submenuPanelElement,e)}))}))}syncRole(){if(this.type===`checkbox`){this.setAttribute(`role`,`menuitemcheckbox`),this.setAttribute(`aria-checked`,this.checked?`true`:`false`);return}if(this.type===`radio`){this.setAttribute(`role`,`menuitemradio`),this.setAttribute(`aria-checked`,this.checked?`true`:`false`);return}this.setAttribute(`role`,`menuitem`),this.removeAttribute(`aria-checked`)}handleClick(e){if(this.disabled){e.preventDefault(),e.stopImmediatePropagation();return}this.hasSubmenu()&&(e.preventDefault(),this.openSubmenu())}render(){let e=this.hasSubmenu(),t=this.type===`checkbox`||this.type===`radio`,n=this.hasSlotController.test(`start`)||this.hasSlotController.test(`prefix`);return k`
            <button
                part="item"
                type="button"
                class="item"
                ?disabled=${this.disabled}
                aria-disabled=${this.disabled?`true`:j}
                @click=${this.handleClick}
            >
                <span
                    part="prefix"
                    class=${n?`prefix`:`prefix prefix--empty`}
                >
                    <slot name="start"></slot>
                    <slot name="prefix"></slot>
                </span>
                <span class="label"><slot></slot></span>
                <span class="details"><slot name="details"></slot></span>
                ${t?k`<span class="check" aria-hidden="true">${z(Ua)}</span>`:j}
                ${e?k`<span class="submenu-icon" aria-hidden="true">${z(Wa)}</span>`:j}
            </button>
            ${e?k`
                <pk-popup
                    .active=${this.submenuOpen}
                    .anchor=${this}
                    placement="right-start"
                    .distance=${0}
                    .skidding=${-4}
                    flip
                    shift
                    hover-bridge
                    style="--pk-popup-z-index: 1001"
                >
                    <div
                        part="submenu"
                        class="submenu-panel pk-popup-content"
                        role="menu"
                        data-size=${Ga(this)}
                        ?hidden=${!this.submenuOpen}
                        data-open=${this.submenuAnimated?``:j}
                        aria-orientation="vertical"
                    >
                        <slot name="submenu"></slot>
                    </div>
                </pk-popup>
            `:j}
        `}};N([F()],X.prototype,`value`,void 0),N([F({reflect:!0})],X.prototype,`type`,void 0),N([F({attribute:`radio-group`})],X.prototype,`radioGroup`,void 0),N([F({type:Boolean,reflect:!0})],X.prototype,`disabled`,void 0),N([F({type:Boolean,reflect:!0})],X.prototype,`destructive`,void 0),N([F({type:Boolean,reflect:!0})],X.prototype,`checked`,void 0),N([F({attribute:`submenu-open`,type:Boolean,reflect:!0})],X.prototype,`submenuOpen`,void 0),N([F({type:Boolean})],X.prototype,`active`,void 0),N([I()],X.prototype,`submenuAnimated`,void 0),N([L(`.submenu-panel`)],X.prototype,`submenuPanelElement`,void 0),N([L(`pk-popup`)],X.prototype,`submenuPopupElement`,void 0),X=Ha=N([P(`pk-dropdown-item`)],X);function Ga(e){let t=e.parentElement?.getAttribute(`data-size`);if(t===`xs`||t===`sm`||t==="default"||t===`lg`||t===`xl`)return t;let n=e.closest(`pk-dropdown-menu`)?.getAttribute(`size`);return n===`xs`||n===`sm`||n===`lg`||n===`xl`?n:`default`}var Ka=l`
    @layer pk-component {
        :host {
            display: block;
            /*
             * Slotted label copy inherits through the flat tree from this host
             * when page metrics would otherwise leak via font:inherit chains.
             */
            font-size: var(--pk-dropdown-label-font-size, 13px);
            line-height: 1.3;
            color: var(--pk-color-slate-700, rgba(96, 125, 159, 0.7));
        }

        /* Match v1 DropdownMenuLabel — text-slate-700, regular weight (not medium). */
        .label {
            margin: 0;
            padding-block-start: 6px;
            padding-block-end: 4px;
            padding-inline: var(--pk-dropdown-label-padding-inline, 12px);
            color: inherit;
            font: inherit;
            font-weight: 400;
            user-select: none;
            pointer-events: none;
        }
    }
`,qa=class extends M{static{this.styles=Ka}connectedCallback(){super.connectedCallback(),this.setAttribute(`role`,`presentation`)}render(){return k`
            <div part="label" class="label">
                <slot></slot>
            </div>
        `}};qa=N([P(`pk-dropdown-label`)],qa);function Ja(e,t,n=500){return new Promise(r=>{let i=new AbortController,{signal:a}=i;if(e.classList.contains(t)){r();return}e.classList.add(t);let o=!1,s=()=>{o||(o=!0,e.classList.remove(t),window.clearTimeout(c),r(),i.abort())};e.addEventListener(`animationend`,s,{once:!0,signal:a}),e.addEventListener(`animationcancel`,s,{once:!0,signal:a});let c=window.setTimeout(s,n);requestAnimationFrame(()=>{!o&&e.getAnimations().length===0&&s()})})}var Ya=[Ze(),za,Ba,l`
        @layer pk-component {
            /* Standalone: keep a real box so the trigger is not a flex-stretched
               child of the page (display:contents flattened pk-button to full card width).
               Button groups override below — same as legacy + React MenuButton inline-flex wrap. */
            :host {
                display: inline-block;
                position: relative;
                width: fit-content;
                max-width: 100%;
                align-self: flex-start;
                vertical-align: middle;
            }

            :host([data-pk-group-orientation]) {
                display: inline-flex;
                vertical-align: middle;
                flex: 0 0 auto;
                width: auto;
                max-width: none;
                align-self: auto;
            }

            /* Belt-and-suspenders if a parent still flattens layout onto the trigger. */
            ::slotted([slot='trigger']) {
                width: fit-content;
                max-width: 100%;
                flex: 0 0 auto;
                align-self: flex-start;
            }

            :host([data-pk-group-orientation]) ::slotted([slot='trigger']) {
                --pk-bg-start-start-radius: inherit;
                --pk-bg-start-end-radius: inherit;
                --pk-bg-end-start-radius: inherit;
                --pk-bg-end-end-radius: inherit;
                align-self: auto;
                max-width: none;
            }

            :host([data-pk-group-orientation='horizontal'][data-pk-group-join]) {
                margin-inline-start: var(--pk-bg-horizontal-indent, 0);
            }

            :host([data-pk-group-orientation='vertical'][data-pk-group-join]) {
                margin-block-start: var(--pk-bg-vertical-indent, 0);
            }

            :host([data-pk-group-orientation='horizontal'][data-pk-group-join]:has([slot='trigger'][variant='outline'], [slot='trigger'][variant='dashed'])) {
                margin-inline-start: var(--pk-bg-horizontal-indent-outlined, 0);
            }

            :host([data-pk-group-orientation='vertical'][data-pk-group-join]:has([slot='trigger'][variant='outline'], [slot='trigger'][variant='dashed'])) {
                margin-block-start: var(--pk-bg-vertical-indent-outlined, 0);
            }

            /* Menu panel — hug content; do not stretch to trigger/anchor width. */
            .panel {
                display: flex;
                flex-direction: column;
                width: max-content;
                min-width: 8rem;
                margin: 0;
                overflow: auto;
                padding: 4px 0;
                border: 0;
                border-radius: var(--pk-radius-md);
                background: var(--pk-color-white);
                box-shadow: var(--pk-shadow-popup);
                /* v1 DropdownMenuItem had no face color — inherited Craft body
                 * (--text-color ≈ gray-700). Do not force gray-900 (too dark). */
                color: var(--text-color, var(--pk-color-gray-700));
                outline: none;
                text-align: start;
                user-select: none;
                /* Match v1 Base UI: popup writes --pk-transform-origin from the
                 * anchor center on the connecting edge (e.g. top-right for
                 * bottom-end). Keyword edge centers made end-aligned menus
                 * scale from the middle of the panel. */
                transform-origin: var(--pk-transform-origin, top);
            }

            .panel.show {
                animation: pk-dropdown-menu-show 100ms ease;
            }

            .panel.hide {
                animation: pk-dropdown-menu-show 100ms ease reverse;
            }

            .panel[hidden] {
                display: none !important;
            }

            ::slotted(pk-dropdown-item),
            ::slotted(pk-dropdown-separator),
            ::slotted(pk-dropdown-label),
            .panel > pk-dropdown-item,
            .panel > pk-dropdown-separator,
            .panel > pk-dropdown-label {
                display: block;
            }

            ::slotted([data-menu-item]) {
                display: flex;
                align-items: center;
                gap: 0.625rem;
                width: 100%;
                margin: 0;
                padding: 8px 12px;
                border: 0;
                background: transparent;
                color: inherit;
                font: inherit;
                font-size: var(--pk-font-size-base);
                text-align: left;
                white-space: nowrap;
                cursor: default;
                user-select: none;
                outline: none;
                box-sizing: border-box;
            }

            ::slotted([data-menu-item]:hover:not([disabled])) {
                background: var(--pk-color-slate-100);
            }

            ::slotted([data-menu-item]:focus-visible) {
                background: var(--pk-color-slate-100);
            }

            ::slotted([data-menu-item][disabled]) {
                pointer-events: none;
                opacity: 0.5;
            }

            ::slotted(pk-dropdown-item[destructive]),
            ::slotted([data-destructive]) {
                color: var(--pk-color-error);
            }

            ::slotted([data-menu-separator]) {
                display: block;
                height: 1px;
                margin: 4px 0;
                background: var(--pk-color-slate-200);
                border: 0;
                padding: 0;
            }
        }

        /* Outside @layer so constructed stylesheets resolve the name reliably. */
        @keyframes pk-dropdown-menu-show {
            from {
                scale: 0.9;
                opacity: 0;
            }

            to {
                scale: 1;
                opacity: 1;
            }
        }
    `],Xa=new Set,Z=class extends M{constructor(...e){super(...e),this.open=!1,this.size=`default`,this.placement=`bottom-start`,this.sideOffset=4,this.distance=4,this.skidding=0,this.for=``,this.userTypedQuery=``,this.userTypedTimeout=0,this.openSubmenuStack=[],this.openedByKeyboard=!1,this.triggerElement=null,this.handleMenuClick=e=>{let t=this.resolveMenuItem(e);if(!(!t||t.disabled)){if(t.hasSubmenu()){t.submenuOpen||(this.closeSiblingSubmenus(t),this.addToSubmenuStack(t),t.openSubmenu()),e.stopPropagation();return}this.makeSelection(t)}},this.handleSubmenuOpening=e=>{let t=e.detail?.item;t instanceof X&&(this.closeSiblingSubmenus(t),this.addToSubmenuStack(t))},this.handleGlobalMouseMove=e=>{let t=this.getCurrentSubmenuItem();if(!t?.submenuOpen||!t.submenuElement)return;let n=t.submenuElement,r=e.composedPath(),i=t.matches(`:hover`),a=!!n.matches(`:hover`),o=i||r.some(e=>e===t),s=a||r.some(e=>e instanceof HTMLElement&&e.closest(`[part="submenu"]`)===n);!o&&!s&&window.setTimeout(()=>{!i&&!a&&(t.submenuOpen=!1)},100)},this.handleTriggerClick=e=>{let t=this.getTrigger();!t||!e.composedPath().includes(t)||(e.preventDefault(),e.stopPropagation(),this.openedByKeyboard=!1,this.open=!this.open)},this.handleExternalTriggerClick=e=>{e.preventDefault(),e.stopPropagation(),this.openedByKeyboard=!1,this.open=!this.open},this.handleTriggerKeyDown=e=>{let t=this.getTrigger();!t||!e.composedPath().includes(t)||this.open||(e.key===`ArrowDown`||e.key===`ArrowUp`)&&(e.preventDefault(),e.stopPropagation(),this.openedByKeyboard=!0,this.open=!0)},this.handleDocumentKeyDown=e=>{let t=this.isRtl();if(e.key===`Escape`&&this.open&&vr(this)){e.preventDefault(),e.stopPropagation(),this.open=!1,this.getTrigger()?.focus({preventScroll:!0});return}if(!this.open)return;let n=[...dr()].find(e=>e.localName===`pk-dropdown-item`),r=n?.localName===`pk-dropdown-item`,i=this.getCurrentSubmenuItem(),a=!!i,o,s,c;a&&i?(o=this.getSubmenuItems(i),s=o.find(e=>e.active||e===n),c=s?o.indexOf(s):-1):(o=this.getItems(),s=o.find(e=>e.active||e===n),c=s?o.indexOf(s):-1);let l;if(e.key===`ArrowUp`&&(e.preventDefault(),e.stopPropagation(),l=c>0?o[c-1]:o[o.length-1]),e.key===`ArrowDown`&&(e.preventDefault(),e.stopPropagation(),l=c!==-1&&c<o.length-1?o[c+1]:o[0]),e.key===(t?`ArrowLeft`:`ArrowRight`)&&r&&s&&s.hasSubmenu()){e.preventDefault(),e.stopPropagation(),this.closeSiblingSubmenus(s),s.openSubmenu(),this.addToSubmenuStack(s),window.setTimeout(()=>{let e=this.getSubmenuItems(s);e.length>0&&this.setActiveItem(e,e[0])},0);return}if(e.key===(t?`ArrowRight`:`ArrowLeft`)&&a){e.preventDefault(),e.stopPropagation();let t=this.removeFromSubmenuStack();t&&(t.submenuOpen=!1,window.setTimeout(()=>{t.focus({preventScroll:!0}),t.active=!0,(t.slot===`submenu`&&t.parentElement instanceof X?this.getSubmenuItems(t.parentElement):this.getItems()).forEach(e=>{e!==t&&(e.active=!1)})},0));return}if((e.key===`Home`||e.key===`End`)&&(e.preventDefault(),e.stopPropagation(),l=e.key===`Home`?o[0]:o[o.length-1]),e.key===`Tab`){this.open=!1;return}if(e.key.length===1&&!(e.metaKey||e.ctrlKey||e.altKey)&&!(e.key===` `&&this.userTypedQuery===``)){window.clearTimeout(this.userTypedTimeout),this.userTypedTimeout=window.setTimeout(()=>{this.userTypedQuery=``},1e3),this.userTypedQuery+=e.key;let t=this.userTypedQuery.trim().toLowerCase();l=o.find(e=>(e.textContent||``).trim().toLowerCase().startsWith(t))}if(l){e.preventDefault(),e.stopPropagation(),this.setActiveItem(o,l);return}(e.key===`Enter`||e.key===` `&&this.userTypedQuery===``)&&r&&s&&(e.preventDefault(),e.stopPropagation(),s.hasSubmenu()?(this.closeSiblingSubmenus(s),s.openSubmenu(),this.addToSubmenuStack(s),window.setTimeout(()=>{let e=this.getSubmenuItems(s);e.length>0&&this.setActiveItem(e,e[0])},0)):this.makeSelection(s))},this.handleDocumentPointerDown=e=>{let t=e.composedPath(),n=this.getTrigger();t.some(e=>e===this||e===n)||(this.open=!1)}}static{this.styles=Ya}get panelElement(){return this.menuElement??null}get popup(){return this.popupElement??null}connectedCallback(){super.connectedCallback(),this.addEventListener(`click`,this.handleTriggerClick,!0),this.addEventListener(`keydown`,this.handleTriggerKeyDown)}firstUpdated(){let e=()=>{if(this.for){this.resolveExternalTrigger();return}this.syncSlottedTrigger()};queueMicrotask(e),requestAnimationFrame(e)}disconnectedCallback(){window.clearTimeout(this.userTypedTimeout),this.removeEventListener(`click`,this.handleTriggerClick,!0),this.removeEventListener(`keydown`,this.handleTriggerKeyDown),this.unbindTrigger(this.triggerElement),this.triggerElement=null,this.closeAllSubmenus(),this.popupElement&&(this.popupElement.active=!1),this.menuElement?.classList.remove(`show`,`hide`),document.removeEventListener(`keydown`,this.handleDocumentKeyDown),document.removeEventListener(`pointerdown`,this.handleDocumentPointerDown,!0),document.removeEventListener(`mousemove`,this.handleGlobalMouseMove),_r(this),Xa.delete(this),super.disconnectedCallback()}async updated(e){if(super.updated(e),e.has(`for`)&&this.resolveExternalTrigger(),e.has(`open`)&&this.syncTriggerExpanded(),!e.has(`open`))return;let t=e.get(`open`);t!==this.open&&(t===void 0&&this.open===!1||(this.open?await this.showMenu():(this.closeAllSubmenus(),await this.hideMenu(`unknown`))))}getItems(e=!1){let t=(this.defaultSlot?.assignedElements({flatten:!0})??[]).filter(e=>e.localName===`pk-dropdown-item`);return e?t:t.filter(e=>!e.disabled)}getSubmenuItems(e,t=!1){let n=((e.shadowRoot?.querySelector(`slot[name="submenu"]`))?.assignedElements({flatten:!0})??[...e.children].filter(e=>e.getAttribute(`slot`)===`submenu`)).filter(e=>e.localName===`pk-dropdown-item`);return t?n:n.filter(e=>!e.disabled)}getTrigger(){return this.for?_a(this,this.for)??this.triggerElement:this.querySelector(`[slot="trigger"]`)??this.triggerElement}getAnchor(){return this.getTrigger()??``}resolveExternalTrigger(){this.unbindTrigger(this.triggerElement),this.triggerElement=this.for?_a(this,this.for):null,this.bindTrigger(this.triggerElement),this.requestUpdate()}onTriggerSlotChange(e){if(this.for)return;let[t]=e.target.assignedElements({flatten:!0});this.unbindTrigger(this.triggerElement),this.triggerElement=t??null,this.bindTrigger(this.triggerElement),this.requestUpdate()}syncSlottedTrigger(){let e=this.renderRoot.querySelector(`slot[name="trigger"]`);e&&this.onTriggerSlotChange({target:e})}bindTrigger(e){e&&(e.setAttribute(`aria-haspopup`,`menu`),this.for&&(e.addEventListener(`click`,this.handleExternalTriggerClick),e.addEventListener(`keydown`,this.handleTriggerKeyDown)),this.syncTriggerExpanded())}unbindTrigger(e){e?.removeEventListener(`click`,this.handleExternalTriggerClick),e?.removeEventListener(`keydown`,this.handleTriggerKeyDown)}syncTriggerExpanded(){this.getTrigger()?.setAttribute(`aria-expanded`,this.open?`true`:`false`)}closeAfterSelect(e=`api`){this.open=!1}makeSelection(e){let t=this.getTrigger();if(e.disabled)return;e.type===`checkbox`&&(e.checked=!e.checked),e.type===`radio`&&!e.checked&&(e.checked=!0);let n={value:e.value,type:e.type,checked:e.checked,radioGroup:e.radioGroup};e.dispatchEvent(new CustomEvent(`pk-select`,{detail:n,bubbles:!1,composed:!1,cancelable:!0}));let r=new CustomEvent(`pk-select`,{detail:n,bubbles:!0,composed:!0,cancelable:!0});this.dispatchEvent(r),r.defaultPrevented||(this.open=!1,t?.focus({preventScroll:!0}))}resolveMenuItem(e){let t=e.target;if(t instanceof X)return t;if(t instanceof Element){let e=t.closest(`pk-dropdown-item`);if(e instanceof X)return e}return e.composedPath().find(e=>e instanceof X)??null}whenClosed(){return this.open?new Promise(e=>{this.addEventListener(`pk-after-hide`,()=>{this.popupElement.stop().then(()=>e())},{once:!0})}):this.popupElement?.active?this.popupElement.stop():Promise.resolve()}forceDismissCleanup(){this.open=!1,this.popupElement.active=!1,this.menuElement?.classList.remove(`show`,`hide`),this.closeAllSubmenus(),document.removeEventListener(`keydown`,this.handleDocumentKeyDown),document.removeEventListener(`pointerdown`,this.handleDocumentPointerDown,!0),document.removeEventListener(`mousemove`,this.handleGlobalMouseMove),_r(this),Xa.delete(this)}isRtl(){return getComputedStyle(this).direction===`rtl`}addToSubmenuStack(e){let t=this.openSubmenuStack.indexOf(e);t===-1?this.openSubmenuStack.push(e):this.openSubmenuStack=this.openSubmenuStack.slice(0,t+1)}removeFromSubmenuStack(){return this.openSubmenuStack.pop()}getCurrentSubmenuItem(){return this.openSubmenuStack.length>0?this.openSubmenuStack[this.openSubmenuStack.length-1]:void 0}closeAllSubmenus(){this.getItems(!0).forEach(e=>{e.submenuOpen=!1,e.active=!1}),this.openSubmenuStack=[]}closeSiblingSubmenus(e){let t=e.closest(`pk-dropdown-item:not([slot="submenu"])`);(t instanceof X?this.getSubmenuItems(t,!0):this.getItems(!0)).forEach(t=>{t!==e&&t.submenuOpen&&(t.submenuOpen=!1)}),this.openSubmenuStack.includes(e)||this.openSubmenuStack.push(e)}setActiveItem(e,t){e.forEach(e=>{e.active=e===t,e===t?e.setAttribute(`data-highlighted`,``):e.removeAttribute(`data-highlighted`)}),t.focus({preventScroll:!0}),t.scrollIntoView({block:`nearest`})}async showMenu(){if(!this.popupElement||!this.menuElement)return;this.for&&!this.triggerElement?.isConnected&&this.resolveExternalTrigger();let e=new Sr;if(!this.dispatchEvent(e)){this.open=!1;return}if(this.popupElement.active&&(this.popupElement.active=!1,this.menuElement.classList.remove(`show`,`hide`),await this.updateComplete),Xa.forEach(e=>{e!==this&&(e.open=!1)}),this.popupElement.active=!0,this.open=!0,Xa.add(this),gr(this),document.addEventListener(`keydown`,this.handleDocumentKeyDown),document.addEventListener(`pointerdown`,this.handleDocumentPointerDown,!0),document.addEventListener(`mousemove`,this.handleGlobalMouseMove),await this.updateComplete,await kr(this.popupElement,this.placement,100,{requireEvent:!0}),!this.open){this.popupElement.active=!1,Xa.delete(this),_r(this),document.removeEventListener(`keydown`,this.handleDocumentKeyDown),document.removeEventListener(`pointerdown`,this.handleDocumentPointerDown,!0),document.removeEventListener(`mousemove`,this.handleGlobalMouseMove);return}this.menuElement.classList.remove(`hide`),await Ja(this.menuElement,`show`);let t=this.getItems();t.length>0&&(this.openedByKeyboard?this.setActiveItem(t,t[0]):(t.forEach(e=>{e.active=!1,e.removeAttribute(`data-highlighted`)}),this.menuElement.focus({preventScroll:!0}))),this.openedByKeyboard=!1,this.dispatchEvent(new Cr),this.dispatchEvent(new CustomEvent(`pk-open-change`,{detail:{open:!0},bubbles:!0,composed:!0}))}async hideMenu(e){if(!this.popupElement||!this.menuElement)return;let t=new wr(e);if(!this.dispatchEvent(t)){this.open=!0;return}this.open=!1,Xa.delete(this),_r(this),document.removeEventListener(`keydown`,this.handleDocumentKeyDown),document.removeEventListener(`pointerdown`,this.handleDocumentPointerDown,!0),document.removeEventListener(`mousemove`,this.handleGlobalMouseMove),this.userTypedQuery=``,window.clearTimeout(this.userTypedTimeout),this.getItems(!0).forEach(e=>{e.active=!1,e.removeAttribute(`data-highlighted`)}),this.menuElement.classList.remove(`show`),await Ja(this.menuElement,`hide`),this.popupElement.active=!1,this.dispatchEvent(new Tr),this.dispatchEvent(new CustomEvent(`pk-open-change`,{detail:{open:!1},bubbles:!0,composed:!0}))}render(){let e=this.hasUpdated?this.popupElement?.active:this.open;return k`
            <pk-popup
                .anchor=${this.for?this.getAnchor():``}
                placement=${this.placement}
                .distance=${this.distance||this.sideOffset}
                .skidding=${this.skidding}
                ?active=${e}
                flip
                shift
                .shiftPadding=${10}
                auto-size="vertical"
                .autoSizePadding=${10}
            >
                <slot
                    name="trigger"
                    slot="anchor"
                    @slotchange=${this.onTriggerSlotChange}
                ></slot>

                <div
                    id="menu"
                    part="panel"
                    class="panel"
                    role="menu"
                    tabindex="-1"
                    aria-orientation="vertical"
                    data-size=${this.size}
                    @click=${this.handleMenuClick}
                    @pk-submenu-open=${this.handleSubmenuOpening}
                >
                    <slot></slot>
                </div>
            </pk-popup>
        `}};N([F({type:Boolean,reflect:!0})],Z.prototype,`open`,void 0),N([F({reflect:!0})],Z.prototype,`size`,void 0),N([F({reflect:!0})],Z.prototype,`placement`,void 0),N([F({attribute:`side-offset`,type:Number})],Z.prototype,`sideOffset`,void 0),N([F({type:Number})],Z.prototype,`distance`,void 0),N([F({type:Number})],Z.prototype,`skidding`,void 0),N([F({reflect:!0})],Z.prototype,`for`,void 0),N([L(`slot:not([name])`)],Z.prototype,`defaultSlot`,void 0),N([L(`#menu`)],Z.prototype,`menuElement`,void 0),N([L(`pk-popup`)],Z.prototype,`popupElement`,void 0),Z=N([P(`pk-dropdown-menu`)],Z);var Za=class extends M{static{this.styles=l`
        @layer pk-component {
            :host {
                display: block;
            }

            hr {
                display: block;
                height: 1px;
                margin: 4px 0;
                border: 0;
                padding: 0;
                background: var(--pk-color-slate-200);
            }
        }
    `}connectedCallback(){super.connectedCallback(),this.setAttribute(`role`,`separator`)}render(){return k`<hr part="base" />`}};Za=N([P(`pk-dropdown-separator`)],Za);var Qa=class extends M{constructor(...e){super(...e),this.icon=``,this.name=``}static{this.styles=l`
        :host {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            flex: none;
            /* Square em box + slight baseline nudge for inline text. Flex
             * parents (e.g. button slots) should zero vertical-align. */
            width: 1em;
            height: 1em;
            line-height: 1;
            vertical-align: -0.125em;
        }

        svg {
            display: block;
            width: 100%;
            height: 100%;
            fill: currentColor;
            /* Allow intentional path overhang past the icon canvas. */
            overflow: visible;
        }
    `}render(){let e=Pn(this.icon||this.name);return e?k`${z(zn(e,{title:this.label}))}`:j}};N([F()],Qa.prototype,`icon`,void 0),N([F()],Qa.prototype,`name`,void 0),N([F()],Qa.prototype,`label`,void 0),Qa=N([P(`pk-icon`)],Qa);function $a(e={}){let{validationElement:t,validationProperty:n}=e;!t&&typeof document<`u`&&(t=Object.assign(document.createElement(`input`),{required:!0})),n||=`value`;let r={observedAttributes:[`required`],message:t?.validationMessage??`Please fill out this field.`,checkValidity(e){let t={message:``,isValid:!0,invalidKeys:[]};if(!e.required)return t;let i=e[n];return i==null||i===!1||i===``?(t.isValid=!1,t.message=typeof r.message==`function`?r.message(e):r.message??``,t.invalidKeys.push(`valueMissing`),t):t}};return r}var eo=l`
    @layer pk-component {
        .form-control {
            display: flex;
            flex-direction: column;
            gap: 0.375rem;
            width: 100%;
        }

        .form-control__header {
            display: flex;
            flex-direction: column;
            gap: 0.125rem;
            min-width: 0;
        }

        .form-control__label {
            display: inline-flex;
            align-items: center;
            gap: 0.25rem;
            margin: 0;
            color: var(--pk-color-gray-700);
            font-family: var(--pk-font-family);
            font-size: var(--pk-font-size-base);
            font-weight: 700;
            line-height: var(--pk-line-height);
        }

        .form-control__instructions,
        .form-control__hint {
            margin: 0;
            color: var(--pk-color-gray-500);
            font-family: var(--pk-font-family);
            font-size: var(--pk-font-size-base);
            line-height: var(--pk-line-height);
        }

        .form-control__instructions:empty,
        .form-control__hint:empty {
            display: none;
        }

        .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
        }

        .form-control__input {
            display: flex;
            align-items: stretch;
            position: relative;
            width: 100%;
        }

        .form-control__start,
        .form-control__end {
            display: inline-flex;
            align-items: center;
            flex-shrink: 0;
        }

        .form-control__start {
            margin-inline-end: 6px;
        }

        .form-control__end {
            margin-inline-start: 6px;
        }

        .icon-button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            margin: 0;
            padding: 0;
            border: 0;
            background: transparent;
            color: var(--pk-color-gray-500);
            cursor: pointer;
            line-height: 0;
        }

        .icon-button:focus-visible {
            outline: none;
            box-shadow: var(--pk-shadow-focus);
            border-radius: var(--pk-radius-sm);
        }

        .icon-button:disabled {
            cursor: not-allowed;
            opacity: 0.5;
        }
    }
`;function to(e,t){return t||(e.getAttribute(`hint`)??``)}function no(e,t,n=!1){return!!t||e(`instructions`,n)||e(`hint`)}var ro=e=>e??j,{I:io}=Me,ao=e=>e.strings===void 0,oo={},so=(e,t=oo)=>e._$AH=t,co=tt(class extends nt{constructor(e){if(super(e),e.type!==et.PROPERTY&&e.type!==et.ATTRIBUTE&&e.type!==et.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!ao(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===A||t===j)return t;let n=e.element,r=e.name;if(e.type===et.PROPERTY){if(t===n[r])return A}else if(e.type===et.BOOLEAN_ATTRIBUTE){if(!!t===n.hasAttribute(r))return A}else if(e.type===et.ATTRIBUTE&&n.getAttribute(r)===t+``)return A;return so(e),t}}),lo=new Set([`button`,`submit`,`reset`,`checkbox`,`radio`,`file`,`image`,`hidden`]),uo=`pk-implicit-submit`,fo=(e,t)=>{if(e.key!==`Enter`||e.defaultPrevented||e.isComposing||e.altKey||e.ctrlKey||e.metaKey||e.shiftKey)return!1;let n=(t||`text`).toLowerCase();return!lo.has(n)},po=e=>{let t=e.closest?.(`pk-dialog`);if(t){let e=t.querySelector(`form`);if(e)return e}let n=e.form;return n&&n.id===`main`?e.closest?.(`form`)===n?null:e.closest(`form`):n},mo=(e,t,n)=>{if(e.disabled||e.readonly||!fo(t,n))return!1;let r=po(e);return!r||r.id===`main`?!1:(t.preventDefault(),t.stopPropagation(),r.dispatchEvent(new CustomEvent(uo,{bubbles:!1,cancelable:!0})),!0)},ho=l`
    @layer pk-component {
        :host {
            display: block;
            width: 100%;
            font-family: var(--pk-font-family);
            font-size: var(--pk-font-size-base);
            line-height: var(--pk-line-height);
        }

        :host([data-pk-group-orientation]) {
            display: flex;
            flex-direction: column;
            width: auto;
            flex: 0 1 auto;
            align-self: stretch;
        }

        :host([data-pk-group-orientation]) .form-control {
            gap: 0;
            height: 100%;
        }

        :host([data-pk-group-orientation]) .form-control__input {
            min-height: var(--pk-btn-height-default);
            height: 100%;
        }

        :host([data-pk-group-orientation]) .form-control__start,
        :host([data-pk-group-orientation]) .form-control__end {
            display: none;
        }

        :host([data-pk-group-orientation]) .form-control__input {
            width: 100%;
        }

        :host([data-pk-group-orientation]) .input {
            width: 100%;
        }

        :host([data-pk-group-orientation]) .input {
            min-height: var(--pk-btn-height-default);
            height: 100%;
        }

        :host([data-pk-group-orientation='vertical']) {
            width: 100%;
        }

        :host([data-pk-group-orientation='horizontal'][data-pk-group-join]:not([data-pk-group-divider])) {
            margin-inline-start: var(--pk-bg-horizontal-indent-outlined, 0);
        }

        :host([data-pk-group-orientation='vertical'][data-pk-group-join]:not([data-pk-group-divider])) {
            margin-block-start: var(--pk-bg-vertical-indent-outlined, 0);
        }

        :host([data-pk-group-orientation='horizontal'][data-pk-group-divider][data-pk-group-join]) {
            margin-inline-start: var(--pk-bg-horizontal-indent-outlined, 0);
        }

        :host([data-pk-group-orientation='vertical'][data-pk-group-divider][data-pk-group-join]) {
            margin-block-start: var(--pk-bg-vertical-indent-outlined, 0);
        }

        :host([data-pk-group-orientation='horizontal'][data-pk-group-divider]) .form-control__input {
            border-left-width: 1px;
            border-left-style: solid;
            border-left-color: var(--pk-btn-group-divider-color-outline, var(--pk-input-border-color));
            box-shadow: none;
        }

        :host([data-pk-group-orientation='vertical'][data-pk-group-divider]) .form-control__input {
            border-top-width: 1px;
            border-top-style: solid;
            border-top-color: var(--pk-btn-group-divider-color-outline, var(--pk-input-border-color));
            box-shadow: none;
        }

        :host([data-pk-group-divider]) .form-control__input:focus-within,
        :host([data-pk-group-divider][data-state='focus-visible']) .form-control__input {
            box-shadow: var(--pk-input-focus-shadow);
        }

        :host([data-pk-group-orientation='vertical'][data-pk-group-divider]) .form-control__input:focus-within,
        :host([data-pk-group-orientation='vertical'][data-pk-group-divider][data-state='focus-visible']) .form-control__input {
            box-shadow: var(--pk-input-focus-shadow);
        }

        /* Chrome lives on the flex shell (part=base) so slot=start/end adornments sit
         * inside the border — same visual contract as pk-input-group / v1 InputGroup.
         * Height is content-sized (v1): padding-block + --pk-input-control-line-height + border.
         */
        .form-control__input {
            align-items: center;
            gap: 6px;
            padding-inline: 8px;
            border: var(--pk-input-border);
            border-radius: var(--pk-input-border-radius, var(--pk-radius-sm));
            background: var(--pk-input-bg);
            background-clip: padding-box;
            box-sizing: border-box;
            transition: border-color 0.12s ease, box-shadow 0.12s ease;
        }

        .form-control__start,
        .form-control__end {
            margin: 0;
            color: var(--pk-color-gray-400);
            line-height: 0;
        }

        .form-control__start ::slotted(*),
        .form-control__end ::slotted(*) {
            display: block;
            max-width: 1.25rem;
            max-height: 1.25rem;
        }

        .input {
            display: block;
            width: 100%;
            margin: 0;
            /* v1 Input default: py-1.5 + text-sm (14px / 1.25rem lh) → 34px with border. */
            padding-block: 6px;
            padding-inline: 0;
            border: 0;
            border-radius: 0;
            background: transparent;
            /* Craft CP body / field value text. */
            color: var(--pk-color-gray-700);
            font: inherit;
            line-height: var(--pk-input-control-line-height, 1.25rem);
            appearance: none;
            box-sizing: border-box;
            outline: none;
        }

        .form-control__input .input {
            flex: 1 1 auto;
            min-width: 0;
        }

        .input::placeholder {
            color: var(--pk-input-placeholder-color, var(--pk-color-gray-400));
        }

        /*
         * Craft text:focus-visible only sets box-shadow (--focus-ring); resting border stays.
         * Do not also set border-color — --pk-input-focus-shadow already includes 0 0 0 1px,
         * so border-color + that ring reads as a double focus treatment.
         */
        :host(:not([invalid]):not(:state(user-invalid))) .form-control__input:focus-within,
        :host([data-state='focus-visible']:not([invalid]):not(:state(user-invalid))) .form-control__input {
            box-shadow: var(--pk-input-focus-shadow);
        }

        .form-control__input:has(.input:disabled) {
            cursor: not-allowed;
            opacity: 0.5;
        }

        .input:disabled {
            cursor: not-allowed;
        }

        :host([invalid]) .form-control__input,
        :host(:state(user-invalid)) .form-control__input {
            border-color: var(--pk-color-rose-600);
        }

        /* Invalid + focus: rose ring (same token as select/combobox), not sky over rose border. */
        :host([invalid]) .form-control__input:focus-within,
        :host([invalid][data-state='focus-visible']) .form-control__input,
        :host(:state(user-invalid)) .form-control__input:focus-within {
            box-shadow: var(--pk-input-invalid-focus-shadow);
        }

        :host([size='xs']) .form-control__input {
            gap: 4px;
            padding-inline: 6px;
        }

        :host([size='xs']) .input {
            padding-block: 4px;
            font-size: 11px;
        }

        :host([size='sm']) .form-control__input {
            gap: 4px;
            padding-inline: 8px;
        }

        :host([size='sm']) .input {
            padding-block: 4px;
            font-size: 12px;
        }

        :host([size='lg']) .form-control__input {
            gap: 8px;
            padding-inline: 12px;
        }

        :host([size='lg']) .input {
            padding-block: 8px;
            font-size: var(--pk-font-size-base);
        }

        :host([size='xl']) .form-control__input {
            gap: 8px;
            padding-inline: 16px;
        }

        :host([size='xl']) .input {
            padding-block: 10px;
            font-size: 16px;
        }

        /*
         * Mono face + 0.9× optical size + line-height 1.5. The taller line-height
         * offsets the smaller face so padding + content height stays aligned with
         * stock inputs (1.25rem ≈ 1.5 × 12.6px). Scale the size's face, not
         * the parent em, so xs/sm/xl mono stay proportional.
         */
        :host([mono]) .input {
            font-family: var(--pk-input-mono-font-family);
            font-size: calc(var(--pk-font-size-base) * 0.9);
            line-height: var(--pk-input-mono-line-height, 1.5);
        }

        :host([mono][size='xs']) .input {
            font-size: calc(11px * 0.9);
        }

        :host([mono][size='sm']) .input {
            font-size: calc(12px * 0.9);
        }

        :host([mono][size='lg']) .input {
            font-size: calc(var(--pk-font-size-base) * 0.9);
        }

        :host([mono][size='xl']) .input {
            font-size: calc(16px * 0.9);
        }

        /* Editable-table cells (v1): flush into the row — no chrome border/radius.
         * Prefer reflected fit-cell (Lit property); data-editable-table-input is a legacy alias.
         * Fill host → form-control → input so the control spans the full td.
         */
        :host([fit-cell]),
        :host([data-editable-table-input]) {
            display: block;
            height: 100%;
            min-height: 100%;
            box-sizing: border-box;
        }

        :host([fit-cell]) .form-control,
        :host([data-editable-table-input]) .form-control {
            height: 100%;
            min-height: 100%;
            gap: 0;
        }

        :host([fit-cell]) .form-control__input,
        :host([data-editable-table-input]) .form-control__input {
            height: 100%;
            min-height: 100%;
            flex: 1 1 auto;
            padding-inline: 0;
            border: none;
            border-radius: 0;
            background: transparent;
            box-shadow: none;
        }

        :host([fit-cell]) .input,
        :host([data-editable-table-input]) .input {
            height: 100%;
            min-height: 100%;
        }

        :host([fit-cell]:not([invalid]):not(:state(user-invalid))) .form-control__input:focus-within,
        :host([fit-cell][data-state='focus-visible']:not([invalid]):not(:state(user-invalid))) .form-control__input,
        :host([data-editable-table-input]:not([invalid]):not(:state(user-invalid))) .form-control__input:focus-within,
        :host([data-editable-table-input][data-state='focus-visible']:not([invalid]):not(:state(user-invalid))) .form-control__input {
            border: none;
            box-shadow: inset 0 0 0 1px var(--pk-color-gray-200);
        }

        :host([fit-cell][invalid]) .form-control__input,
        :host([fit-cell]:state(user-invalid)) .form-control__input,
        :host([data-editable-table-input][invalid]) .form-control__input,
        :host([data-editable-table-input]:state(user-invalid)) .form-control__input {
            border: none;
            box-shadow: inset 0 0 0 1px var(--pk-color-rose-600);
        }

        :host([fit-cell][invalid]) .form-control__input:focus-within,
        :host([fit-cell][invalid][data-state='focus-visible']) .form-control__input,
        :host([fit-cell]:state(user-invalid)) .form-control__input:focus-within,
        :host([data-editable-table-input][invalid]) .form-control__input:focus-within,
        :host([data-editable-table-input][invalid][data-state='focus-visible']) .form-control__input,
        :host([data-editable-table-input]:state(user-invalid)) .form-control__input:focus-within {
            border: none;
            box-shadow: inset 0 0 0 1px var(--pk-color-rose-600);
        }

        :host([data-pk-group-orientation='horizontal'][data-pk-group-join]:not([data-pk-group-divider])) .form-control__input {
            border-left-width: 0;
        }

        :host([data-pk-group-orientation='vertical'][data-pk-group-join]:not([data-pk-group-divider])) .form-control__input {
            border-top-width: 0;
        }

        :host([data-pk-group-orientation='horizontal'][data-pk-group-divider]) .form-control__input {
            border-left-width: 1px;
            border-left-style: solid;
            border-left-color: var(--pk-btn-group-divider-color-outline, var(--pk-input-border-color));
        }

        :host([data-pk-group-orientation='vertical'][data-pk-group-divider]) .form-control__input {
            border-top-width: 1px;
            border-top-style: solid;
            border-top-color: var(--pk-btn-group-divider-color-outline, var(--pk-input-border-color));
        }

        :host([data-pk-group-orientation='horizontal'][data-pk-group-internal-trail]) .form-control__input {
            border-right-width: 0;
        }

        :host([data-pk-group-orientation='vertical'][data-pk-group-internal-trail]) .form-control__input {
            border-bottom-width: 0;
        }

        .clear-button {
            position: absolute;
            inset-inline-end: 6px;
            inset-block-start: 50%;
            translate: 0 -50%;
        }

        .form-control__input:has(.clear-button) .input {
            padding-inline-end: 20px;
        }
    }
`,Q=class extends cr{constructor(...e){super(...e),this.assumeInteractionOn=[`blur`,`input`],this.hasSlotController=new ur(this,`instructions`,`hint`,`label`,`start`,`end`),this.inputId=pr(`pk-input`),this.type=`text`,this._value=null,this.defaultValue=null,this.size=`default`,this.label=``,this.instructions=``,this.withClear=!1,this.placeholder=``,this.readonly=!1,this.invalid=!1,this.fitCell=!1,this.mono=!1,this.autofocus=!1,this.withLabel=!1,this.withInstructions=!1}static{this.styles=[eo,Ze(),Xe(`.input`,`var(--pk-input-border-radius, var(--pk-radius-sm))`),$e(`.input`),ho]}static get validators(){return[...super.validators,lr(),$a()]}get value(){return this.valueHasChanged?this._value??``:this._value??this.defaultValue??``}set value(e){let t=e??``;this._value!==t&&(this.valueHasChanged=!0,this._value=t)}connectedCallback(){this.instructions=to(this,this.instructions),this.hasAttribute(`with-hint`)&&(this.withInstructions=!0),super.connectedCallback()}syncFormValue(){this.setValue(this.value||``)}resetToDefaultValue(){this.valueHasChanged=!1,this._value=null}restoreFormState(e){typeof e==`string`&&(this.value=e)}formResetCallback(){this.valueHasChanged=!1,this._value=null,this.input&&(this.input.value=this.defaultValue??``),super.formResetCallback()}updated(e){(e.has(`value`)||e.has(`defaultValue`))&&this.setState(`blank`,!this.value),super.updated(e)}syncStandaloneAria(){if(!this.input)return;let e=!!this.label||this.hasSlotController.test(`label`,this.withLabel),t=no((e,t)=>this.hasSlotController.test(e,t),this.instructions,this.withInstructions);ir({control:this.input,labelId:`${this.inputId}-label`,instructionsId:`${this.inputId}-instructions`,hasLabel:e,hasInstructions:t,required:this.required,invalid:this.invalid||!this.internals.validity.valid})}hasLabelContent(){return!!this.label||this.hasSlotController.test(`label`,this.withLabel)}hasInstructionsContent(){return no((e,t)=>this.hasSlotController.test(e,t),this.instructions,this.withInstructions)}focus(e){this.input?.focus(e)}blur(){this.input?.blur()}select(){this.input?.select()}handleInput(){this.value=this.input.value,this.dispatchEvent(new Event(`input`,{bubbles:!0,composed:!0}))}handleChange(e){this.value=this.input.value,e.stopPropagation(),this.dispatchEvent(new Event(`change`,{bubbles:!0,composed:!0}))}handleKeyDown(e){mo(this,e,this.type)}handleClearClick(e){e.preventDefault(),this.value!==``&&(this.value=``,this.dispatchEvent(new xr),this.dispatchEvent(new Event(`input`,{bubbles:!0,composed:!0})),this.dispatchEvent(new Event(`change`,{bubbles:!0,composed:!0})),this.input.focus())}render(){let e=this.hasLabelContent(),t=this.hasInstructionsContent(),n=this.withClear&&!this.disabled&&!this.readonly&&this.value.length>0,r=this.hasSlotController.test(`start`),i=this.hasSlotController.test(`end`);return k`
            <div part="form-control" class="form-control">
                ${e||t?k`
                        <div part="header" class="form-control__header">
                            ${e?k`
                                    <label
                                        part="label"
                                        class="form-control__label"
                                        id=${`${this.inputId}-label`}
                                        for=${`${this.inputId}-control`}
                                    >
                                        <slot name="label">${this.label}</slot>
                                    </label>
                                `:j}

                            ${t?k`
                                    <p
                                        part="instructions"
                                        class="form-control__instructions"
                                        id=${`${this.inputId}-instructions`}
                                    >
                                        <slot name="instructions">${this.instructions}</slot>
                                        <slot name="hint"></slot>
                                    </p>
                                `:j}
                        </div>
                    `:j}

                <div part="base" class="form-control__input">
                    ${r?k`
                            <span part="start" class="form-control__start">
                                <slot name="start"></slot>
                            </span>
                        `:k`<slot name="start" hidden></slot>`}

                    <input
                        part="input"
                        class="input"
                        id=${e?`${this.inputId}-control`:j}
                        type=${this.type}
                        .value=${co(this.value)}
                        placeholder=${this.placeholder||j}
                        pattern=${ro(this.pattern)}
                        minlength=${ro(this.minlength)}
                        maxlength=${ro(this.maxlength)}
                        min=${ro(this.min)}
                        max=${ro(this.max)}
                        step=${ro(this.step)}
                        autocomplete=${ro(this.autocomplete)}
                        ?disabled=${this.disabled}
                        ?readonly=${this.readonly}
                        ?required=${this.required}
                        ?autofocus=${this.autofocus}
                        @input=${this.handleInput}
                        @change=${this.handleChange}
                        @keydown=${this.handleKeyDown}
                        @focus=${()=>this.dispatchEvent(new Event(`focus`,{bubbles:!0,composed:!0}))}
                        @blur=${()=>this.dispatchEvent(new Event(`blur`,{bubbles:!0,composed:!0}))}
                    />

                    ${n?k`
                            <button
                                part="clear-button"
                                class="icon-button clear-button"
                                type="button"
                                tabindex="-1"
                                aria-label="Clear"
                                @click=${this.handleClearClick}
                            >
                                <slot name="clear-icon">×</slot>
                            </button>
                        `:j}

                    ${i?k`
                            <span part="end" class="form-control__end">
                                <slot name="end"></slot>
                            </span>
                        `:k`<slot name="end" hidden></slot>`}
                </div>
            </div>
        `}};N([L(`input`)],Q.prototype,`input`,void 0),N([F({reflect:!0})],Q.prototype,`type`,void 0),N([I()],Q.prototype,`value`,null),N([F({attribute:`value`,reflect:!0})],Q.prototype,`defaultValue`,void 0),N([F({reflect:!0})],Q.prototype,`size`,void 0),N([F()],Q.prototype,`label`,void 0),N([F()],Q.prototype,`instructions`,void 0),N([F({attribute:`with-clear`,type:Boolean})],Q.prototype,`withClear`,void 0),N([F()],Q.prototype,`placeholder`,void 0),N([F({type:Boolean,reflect:!0})],Q.prototype,`readonly`,void 0),N([F({type:Boolean,reflect:!0})],Q.prototype,`invalid`,void 0),N([F({type:Boolean,reflect:!0,attribute:`fit-cell`})],Q.prototype,`fitCell`,void 0),N([F({type:Boolean,reflect:!0})],Q.prototype,`mono`,void 0),N([F()],Q.prototype,`pattern`,void 0),N([F({type:Number})],Q.prototype,`minlength`,void 0),N([F({type:Number})],Q.prototype,`maxlength`,void 0),N([F()],Q.prototype,`min`,void 0),N([F()],Q.prototype,`max`,void 0),N([F()],Q.prototype,`step`,void 0),N([F()],Q.prototype,`autocomplete`,void 0),N([F({type:Boolean,reflect:!0})],Q.prototype,`autofocus`,void 0),N([F({attribute:`with-label`,type:Boolean})],Q.prototype,`withLabel`,void 0),N([F({attribute:`with-instructions`,type:Boolean})],Q.prototype,`withInstructions`,void 0),Q=N([P(`pk-input`)],Q);function go(e,t){let n=String(e??``),r=String(t??``).trim();if(!r)return[{text:n,match:!1}];let i=n.toLowerCase(),a=r.toLowerCase(),o=[],s=0,c=i.indexOf(a);for(;c!==-1;)c>s&&o.push({text:n.slice(s,c),match:!1}),o.push({text:n.slice(c,c+r.length),match:!0}),s=c+r.length,c=i.indexOf(a,s);return s<n.length&&o.push({text:n.slice(s),match:!1}),o.length>0?o:[{text:n,match:!1}]}var _o=l`
    @layer pk-component {
        :host {
            display: block;
            /*
             * Slotted option labels inherit type metrics from this host (same
             * Craft-vs-Tailwind trap as pk-dropdown-item). Size tokens arrive via
             * pk-select ::slotted(pk-option) custom properties.
             */
            font-family: var(--pk-font-family);
            font-size: var(--pk-select-item-font-size, var(--pk-font-size-base));
            line-height: var(--pk-select-item-line-height, 1.4);
            color: var(--pk-color-gray-700);
        }

        .option {
            position: relative;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            width: 100%;
            margin: 0;
            min-height: var(--pk-select-item-min-height, var(--pk-input-height));
            padding-block: var(--pk-select-item-padding-block, 6px);
            padding-inline-start: var(--pk-select-item-padding-inline, 10px);
            padding-inline-end: var(--pk-select-item-padding-inline-end, 2rem);
            border: var(--pk-select-trigger-border-width, 1px) solid transparent;
            background: transparent;
            color: inherit;
            font: inherit;
            font-family: var(--pk-font-family);
            font-size: var(--pk-select-item-font-size, var(--pk-font-size-base));
            line-height: var(--pk-select-item-line-height, 1.4);
            text-align: left;
            white-space: nowrap;
            cursor: default;
            user-select: none;
            outline: none;
            box-sizing: border-box;
        }

        .start {
            display: none;
            flex: 0 0 auto;
            align-items: center;
        }

        :host([data-has-start]) .start {
            display: inline-flex;
        }

        :host([hidden]) {
            display: none !important;
        }

        .option:focus-visible,
        :host([highlighted]) .option {
            background: var(--pk-color-slate-100);
        }

        :host([disabled]) .option,
        .option[aria-disabled='true'] {
            pointer-events: none;
            opacity: 0.5;
        }

        .check {
            position: absolute;
            inset-inline-end: var(--pk-select-item-indicator-inset, 0.5rem);
            top: 50%;
            display: none;
            align-items: center;
            justify-content: center;
            width: var(--pk-select-item-indicator-size, 0.75rem);
            height: var(--pk-select-item-indicator-size, 0.75rem);
            color: var(--pk-color-gray-700);
            pointer-events: none;
            transform: translateY(-50%);
            line-height: 0;
        }

        :host([selected]) .check {
            display: inline-flex;
        }

        .check svg {
            display: block;
            width: var(--pk-select-item-indicator-size, 0.75rem);
            height: var(--pk-select-item-indicator-size, 0.75rem);
            flex-shrink: 0;
            pointer-events: none;
        }

        .label {
            flex: 1;
            min-width: 0;
            overflow: hidden;
            text-overflow: ellipsis;
            /* Allow custom multi-line option layouts (title + subtitle) to stack. */
            white-space: normal;
        }

        .match {
            padding: 0;
            border-radius: 2px;
            background: var(--pk-color-blue-100);
            color: inherit;
        }
    }
`,vo=Un(er.check),$=class extends M{constructor(...e){super(...e),this.value=``,this.label=``,this.disabled=!1,this.selected=!1,this.highlighted=!1,this.hidden=!1,this.focusIndex=-1,this.optionId=``,this.matchQuery=``}static{this.styles=_o}focusControl(e=!0){this.shadowRoot?.querySelector(`.option`)?.focus({preventScroll:e})}getLabel(){if(this.label.trim())return this.label.trim();let e=this.shadowRoot?.querySelector(`slot:not([name])`);return e?e.assignedNodes().map(e=>(e.textContent??``).trim()).filter(Boolean).join(` `).trim():this.textContent?.trim()??this.value}getSearchText(){let e=this.shadowRoot?.querySelector(`slot:not([name])`);return e&&e.assignedNodes().map(e=>(e.textContent??``).trim()).filter(Boolean).join(` `).trim()||this.getLabel()}hasRichLabelContent(){return[...this.children].some(e=>e instanceof HTMLElement?!e.slot||e.slot===``:!1)}getStartElements(){return[...this.querySelectorAll(`:scope > [slot="start"]`)].filter(e=>e instanceof HTMLElement)}firstUpdated(){(this.shadowRoot?.querySelector(`slot[name="start"]`))?.addEventListener(`slotchange`,()=>this.syncStartDecoration()),this.syncStartDecoration()}syncStartDecoration(){this.toggleAttribute(`data-has-start`,this.getStartElements().length>0)}handleClick(){this.disabled||this.dispatchEvent(new CustomEvent(`pk-option-select`,{detail:{value:this.value},bubbles:!0,composed:!0}))}handleMouseEnter(){this.disabled||this.hidden||this.dispatchEvent(new CustomEvent(`pk-option-highlight`,{detail:{value:this.value},bubbles:!0,composed:!0}))}handleKeyDown(e){if(!new Set([`ArrowDown`,`ArrowUp`,`ArrowLeft`,`ArrowRight`,`Home`,`End`,`Enter`,` `,`Escape`]).has(e.key))return;let t=this.closest(`pk-select, pk-combobox`),n=t?null:this.closest(`[role="listbox"]`);if(!t&&!n)return;e.preventDefault(),e.stopPropagation();let r=new CustomEvent(`pk-listbox-keydown`,{detail:{keyboardEvent:e},bubbles:!0});if(t){t.dispatchEvent(r);return}n.dispatchEvent(r)}renderLabel(){let e=this.matchQuery.trim();return!e||this.hasRichLabelContent()?k`
                <span part="label" class="label">
                    <slot></slot>
                </span>
            `:k`
            <span part="label" class="label">
                ${go(this.getLabel(),e).map(e=>e.match?k`<mark class="match">${e.text}</mark>`:k`<span>${e.text}</span>`)}
            </span>
        `}render(){return k`
            <button
                part="option"
                type="button"
                class="option"
                role="option"
                id=${this.optionId||j}
                ?disabled=${this.disabled}
                aria-disabled=${this.disabled?`true`:j}
                aria-selected=${this.selected?`true`:`false`}
                tabindex=${this.focusIndex}
                @click=${this.handleClick}
                @mouseenter=${this.handleMouseEnter}
                @keydown=${this.handleKeyDown}
            >
                <span part="start" class="start">
                    <slot name="start"></slot>
                </span>
                ${this.renderLabel()}
                <span part="check" class="check" aria-hidden="true">${z(vo)}</span>
            </button>
        `}};N([F()],$.prototype,`value`,void 0),N([F()],$.prototype,`label`,void 0),N([F({type:Boolean,reflect:!0})],$.prototype,`disabled`,void 0),N([F({type:Boolean,reflect:!0})],$.prototype,`selected`,void 0),N([F({type:Boolean,reflect:!0})],$.prototype,`highlighted`,void 0),N([F({type:Boolean,reflect:!0})],$.prototype,`hidden`,void 0),N([F({type:Number,attribute:`focus-index`})],$.prototype,`focusIndex`,void 0),N([F()],$.prototype,`optionId`,void 0),N([F({attribute:!1})],$.prototype,`matchQuery`,void 0),$=N([P(`pk-option`)],$),In({arrowsRotate:pn,check:St,chevronDown:Ct,circle:Dt,circleInfo:At,download:It,ellipsis:Lt,gear:En,magnifyingGlass:mn,trash:On,triangleExclamation:Sn,xmark:wn});var yo=[B,J,X,qa,Z,Za,Qa,Q,$,Je],bo=!1;async function xo(){if(!bo){for(let e of yo)if(typeof e!=`function`)throw Error(`Timber Plugin Kit constructor missing from bundle`);await Promise.all(n.map(e=>customElements.whenDefined(e))),bo=!0}}await xo();
//# sourceMappingURL=pluginKit-DlZXssMy.js.map