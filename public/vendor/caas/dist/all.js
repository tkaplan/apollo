(function(){var e,t,n,r,i,s={}.hasOwnProperty,o=function(e,t){function r(){this.constructor=e}for(var n in t)s.call(t,n)&&(e[n]=t[n]);return r.prototype=t.prototype,e.prototype=new r,e.__super__=t.prototype,e},u=this;this.Stripe=function(){function e(){}return e.version=2,e.endpoint="https://api.stripe.com/v1",e.setPublishableKey=function(t){e.key=t},e.complete=function(t){return function(n,r,i){var s;if(n!=="success")return s=Math.round((new Date).getTime()/1e3),(new Image).src="https://q.stripe.com?event=stripejs-error&type="+n+"&key="+e.key+"&timestamp="+s,typeof t=="function"?t(500,{error:{code:n,type:n,message:"An unexpected error has occurred submitting your credit\ncard to our secure credit card processor. This may be\ndue to network connectivity issues, so you should try\nagain (you won't be charged twice). If this problem\npersists, please let us know!"}}):void 0}},e}.call(this),e=this.Stripe,this.Stripe.token=function(){function t(){}return t.validate=function(e,t){if(!e)throw t+" required";if(typeof e!="object")throw t+" invalid"},t.formatData=function(t,n){return e.utils.isElement(t)&&(t=e.utils.paramsFromForm(t,n)),e.utils.underscoreKeys(t),t},t.create=function(t,n){return t.key||(t.key=e.key||e.publishableKey),e.utils.validateKey(t.key),e.ajaxJSONP({url:""+e.endpoint+"/tokens",data:t,method:"POST",success:function(e,t){return typeof n=="function"?n(t,e):void 0},complete:e.complete(n),timeout:4e4})},t.get=function(t,n){if(!t)throw"token required";return e.utils.validateKey(e.key),e.ajaxJSONP({url:""+e.endpoint+"/tokens/"+t,data:{key:e.key},success:function(e,t){return typeof n=="function"?n(t,e):void 0},complete:e.complete(n),timeout:4e4})},t}.call(this),this.Stripe.card=function(t){function n(){return n.__super__.constructor.apply(this,arguments)}return o(n,t),n.tokenName="card",n.whitelistedAttrs=["number","cvc","exp_month","exp_year","name","address_line1","address_line2","address_city","address_state","address_zip","address_country"],n.createToken=function(t,r,i){var s;return r==null&&(r={}),e.token.validate(t,"card"),typeof r=="function"?(i=r,r={}):typeof r!="object"&&(s=parseInt(r,10),r={},s>0&&(r.amount=s)),r[n.tokenName]=e.token.formatData(t,n.whitelistedAttrs),e.token.create(r,i)},n.getToken=function(t,n){return e.token.get(t,n)},n.validateCardNumber=function(e){return e=(e+"").replace(/\s+|-/g,""),e.length>=10&&e.length<=16&&n.luhnCheck(e)},n.validateCVC=function(t){return t=e.utils.trim(t),/^\d+$/.test(t)&&t.length>=3&&t.length<=4},n.validateExpiry=function(t,n){var r,i;return t=e.utils.trim(t),n=e.utils.trim(n),/^\d+$/.test(t)?/^\d+$/.test(n)?parseInt(t,10)<=12?(i=new Date(n,t),r=new Date,i.setMonth(i.getMonth()-1),i.setMonth(i.getMonth()+1,1),i>r):!1:!1:!1},n.luhnCheck=function(e){var t,n,r,i,s,o;r=!0,i=0,n=(e+"").split("").reverse();for(s=0,o=n.length;s<o;s++){t=n[s],t=parseInt(t,10);if(r=!r)t*=2;t>9&&(t-=9),i+=t}return i%10===0},n.cardType=function(e){return n.cardTypes[e.slice(0,2)]||"Unknown"},n.cardTypes=function(){var e,t,n,r;t={};for(e=n=40;n<=49;e=++n)t[e]="Visa";for(e=r=50;r<=59;e=++r)t[e]="MasterCard";return t[34]=t[37]="American Express",t[60]=t[62]=t[64]=t[65]="Discover",t[35]="JCB",t[30]=t[36]=t[38]=t[39]="Diners Club",t}(),n}.call(this,this.Stripe.token),this.Stripe.bankAccount=function(t){function n(){return n.__super__.constructor.apply(this,arguments)}return o(n,t),n.tokenName="bank_account",n.whitelistedAttrs=["country","routing_number","account_number"],n.createToken=function(t,r,i){return r==null&&(r={}),e.token.validate(t,"bank account"),typeof r=="function"&&(i=r,r={}),r[n.tokenName]=e.token.formatData(t,n.whitelistedAttrs),e.token.create(r,i)},n.getToken=function(t,n){return e.token.get(t,n)},n.validateRoutingNumber=function(t,r){t=e.utils.trim(t);switch(r){case"US":return/^\d+$/.test(t)&&t.length===9&&n.routingChecksum(t);case"CA":return/\d{5}\-\d{3}/.test(t)&&t.length===9;default:return!0}},n.validateAccountNumber=function(t,n){t=e.utils.trim(t);switch(n){case"US":return/^\d+$/.test(t)&&t.length>=1&&t.length<=17;default:return!0}},n.routingChecksum=function(e){var t,n,r,i,s,o;r=0,t=(e+"").split(""),o=[0,3,6];for(i=0,s=o.length;i<s;i++)n=o[i],r+=parseInt(t[n])*3,r+=parseInt(t[n+1])*7,r+=parseInt(t[n+2]);return r!==0&&r%10===0},n}.call(this,this.Stripe.token),t=["createToken","getToken","cardType","validateExpiry","validateCVC","validateCardNumber"];for(r=0,i=t.length;r<i;r++)n=t[r],this.Stripe[n]=this.Stripe.card[n];typeof module!="undefined"&&module!==null&&(module.exports=this.Stripe),typeof define=="function"&&define("stripe",[],function(){return u.Stripe})}).call(this),function(){var e,t,n,r=[].slice;e=encodeURIComponent,t=(new Date).getTime(),n=function(t,r,i){var s,o;r==null&&(r=[]);for(s in t)o=t[s],i&&(s=""+i+"["+s+"]"),typeof o=="object"?n(o,r,s):r.push(""+s+"="+e(o));return r.join("&").replace(/%20/g,"+")},this.Stripe.ajaxJSONP=function(e){var i,s,o,u,a,f;return e==null&&(e={}),o="sjsonp"+ ++t,a=document.createElement("script"),s=null,i=function(t){var n;return t==null&&(t="abort"),clearTimeout(s),(n=a.parentNode)!=null&&n.removeChild(a),o in window&&(window[o]=function(){}),typeof e.complete=="function"?e.complete(t,f,e):void 0},f={abort:i},a.onerror=function(){return f.abort(),typeof e.error=="function"?e.error(f,e):void 0},window[o]=function(){var t;t=1<=arguments.length?r.call(arguments,0):[],clearTimeout(s),a.parentNode.removeChild(a);try{delete window[o]}catch(n){window[o]=void 0}return typeof e.success=="function"&&e.success.apply(e,t),typeof e.complete=="function"?e.complete("success",f,e):void 0},e.data||(e.data={}),e.data.callback=o,e.method&&(e.data._method=e.method),a.src=e.url+"?"+n(e.data),u=document.getElementsByTagName("head")[0],u.appendChild(a),e.timeout>0&&(s=setTimeout(function(){return f.abort("timeout")},e.timeout)),f}}.call(this),function(){var e=[].indexOf||function(e){for(var t=0,n=this.length;t<n;t++)if(t in this&&this[t]===e)return t;return-1};this.Stripe.utils=function(){function t(){}return t.trim=function(e){return(e+"").replace(/^\s+|\s+$/g,"")},t.underscore=function(e){return(e+"").replace(/([A-Z])/g,function(e){return"_"+e.toLowerCase()}).replace(/-/g,"_")},t.underscoreKeys=function(e){var t,n,r;r=[];for(t in e)n=e[t],delete e[t],r.push(e[this.underscore(t)]=n);return r},t.isElement=function(e){return typeof e!="object"?!1:typeof jQuery!="undefined"&&jQuery!==null&&e instanceof jQuery?!0:e.nodeType===1},t.paramsFromForm=function(t,n){var r,i,s,o,u,a,f,l,c,h;n==null&&(n=[]),typeof jQuery!="undefined"&&jQuery!==null&&t instanceof jQuery&&(t=t[0]),s=t.getElementsByTagName("input"),u=t.getElementsByTagName("select"),a={};for(f=0,c=s.length;f<c;f++){i=s[f],r=this.underscore(i.getAttribute("data-stripe"));if(e.call(n,r)<0)continue;a[r]=i.value}for(l=0,h=u.length;l<h;l++){o=u[l],r=this.underscore(o.getAttribute("data-stripe"));if(e.call(n,r)<0)continue;o.selectedIndex!=null&&(a[r]=o.options[o.selectedIndex].value)}return a},t.validateKey=function(e){if(!e||typeof e!="string")throw new Error("You did not set a valid publishable key. Call Stripe.setPublishableKey() with your publishable key. For more info, see https://stripe.com/docs/stripe.js");if(/\s/g.test(e))throw new Error("Your key is invalid, as it contains whitespace. For more info, see https://stripe.com/docs/stripe.js");if(/^sk_/.test(e))throw new Error("You are using a secret key with Stripe.js, instead of the publishable one. For more info, see https://stripe.com/docs/stripe.js")},t}()}.call(this),function(){var e=[].indexOf||function(e){for(var t=0,n=this.length;t<n;t++)if(t in this&&this[t]===e)return t;return-1};this.Stripe.validator={"boolean":function(e,t){if(t!=="true"&&t!=="false")return"Enter a boolean string (true or false)"},integer:function(e,t){if(!/^\d+$/.test(t))return"Enter an integer"},positive:function(e,t){if(!(!this.integer(e,t)&&parseInt(t,10)>0))return"Enter a positive value"},range:function(t,n){var r;if(r=parseInt(n,10),e.call(t,r)<0)return"Needs to be between "+t[0]+" and "+t[t.length-1]},required:function(e,t){if(e&&(t==null||t===""))return"Required"},year:function(e,t){if(!/^\d{4}$/.test(t))return"Enter a 4-digit year"},birthYear:function(e,t){var n;n=this.year(e,t);if(n)return n;if(parseInt(t,10)>2e3)return"You must be over 18";if(parseInt(t,10)<1900)return"Enter your birth year"},month:function(e,t){if(this.integer(e,t))return"Please enter a month";if(this.range([1,2,3,4,5,6,7,8,9,10,11,12],t))return"Needs to be between 1 and 12"},choices:function(t,n){if(e.call(t,n)<0)return"Not an acceptable value for this field"},email:function(e,t){if(!/^[^@<\s>]+@[^@<\s>]+$/.test(t))return"That doesn't look like an email address"},url:function(e,t){if(!/^https?:\/\/.+\..+/.test(t))return"Not a valid url"},usTaxID:function(e,t){if(!/^\d{2}-?\d{1}-?\d{2}-?\d{4}$/.test(t))return"Not a valid tax ID"},ein:function(e,t){if(!/^\d{2}-?\d{7}$/.test(t))return"Not a valid EIN"},ssnLast4:function(e,t){if(!/^\d{4}$/.test(t))return"Not a valid last 4 digits for an SSN"},ownerPersonalID:function(e,t){var n;n=function(){switch(e){case"CA":return/^\d{3}-?\d{3}-?\d{3}$/.test(t);case"US":return!0}}();if(!n)return"Not a valid ID"},bizTaxID:function(e,t){var n,r,i,s,o,u,a,f;u={CA:["Tax ID",[/^\d{9}$/]],US:["EIN",[/^\d{2}-?\d{7}$/]]},o=u[e];if(o!=null){n=o[0],s=o[1],r=!1;for(a=0,f=s.length;a<f;a++){i=s[a];if(i.test(t)){r=!0;break}}if(!r)return"Not a valid "+n}},zip:function(e,t){var n;n=function(){switch(e.toUpperCase()){case"CA":return/^[\d\w]{6}$/.test(t!=null?t.replace(/\s+/g,""):void 0);case"US":return/^\d{5}$/.test(t)||/^\d{9}$/.test(t)}}();if(!n)return"Not a valid zip"},bankAccountNumber:function(e,t){if(!/^\d{1,17}$/.test(t))return"Invalid bank account number"},usRoutingNumber:function(e){var t,n,r,i,s,o,u;if(!/^\d{9}$/.test(e))return"Routing number must have 9 digits";s=0;for(t=o=0,u=e.length-1;o<=u;t=o+=3)n=parseInt(e.charAt(t),10)*3,r=parseInt(e.charAt(t+1),10)*7,i=parseInt(e.charAt(t+2),10),s+=n+r+i;if(s===0||s%10!==0)return"Invalid routing number"},caRoutingNumber:function(e){if(!/^\d{5}\-\d{3}$/.test(e))return"Invalid transit number"},routingNumber:function(e,t){switch(e.toUpperCase()){case"CA":return this.caRoutingNumber(t);case"US":return this.usRoutingNumber(t)}},phoneNumber:function(e,t){var n;n=t.replace(/[^0-9]/g,"");if(n.length!==10)return"Invalid phone number"},bizDBA:function(e,t){if(!/^.{1,23}$/.test(t))return"Statement descriptors can only have up to 23 characters"},nameLength:function(e,t){if(t.length===1)return"Names need to be longer than one character"}}}.call(this);
// vim:ts=4:sts=4:sw=4:
/*!
 *
 * Copyright 2009-2012 Kris Kowal under the terms of the MIT
 * license found at http://github.com/kriskowal/q/raw/master/LICENSE
 *
 * With parts by Tyler Close
 * Copyright 2007-2009 Tyler Close under the terms of the MIT X license found
 * at http://www.opensource.org/licenses/mit-license.html
 * Forked at ref_send.js version: 2009-05-11
 *
 * With parts by Mark Miller
 * Copyright (C) 2011 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

(function (definition) {
    // Turn off strict mode for this function so we can assign to global.Q
    /* jshint strict: false */

    // This file will function properly as a <script> tag, or a module
    // using CommonJS and NodeJS or RequireJS module formats.  In
    // Common/Node/RequireJS, the module exports the Q API and when
    // executed as a simple <script>, it creates a Q global instead.

    // Montage Require
    if (typeof bootstrap === "function") {
        bootstrap("promise", definition);

    // CommonJS
    } else if (typeof exports === "object") {
        module.exports = definition();

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
        define(definition);

    // SES (Secure EcmaScript)
    } else if (typeof ses !== "undefined") {
        if (!ses.ok()) {
            return;
        } else {
            ses.makeQ = definition;
        }

    // <script>
    } else {
        Q = definition();
    }

})(function () {
"use strict";

var hasStacks = false;
try {
    throw new Error();
} catch (e) {
    hasStacks = !!e.stack;
}

// All code after this point will be filtered from stack traces reported
// by Q.
var qStartingLine = captureLine();
var qFileName;

// shims

// used for fallback in "allResolved"
var noop = function () {};

// Use the fastest possible means to execute a task in a future turn
// of the event loop.
var nextTick =(function () {
    // linked list of tasks (single, with head node)
    var head = {task: void 0, next: null};
    var tail = head;
    var flushing = false;
    var requestTick = void 0;
    var isNodeJS = false;

    function flush() {
        /* jshint loopfunc: true */

        while (head.next) {
            head = head.next;
            var task = head.task;
            head.task = void 0;
            var domain = head.domain;

            if (domain) {
                head.domain = void 0;
                domain.enter();
            }

            try {
                task();

            } catch (e) {
                if (isNodeJS) {
                    // In node, uncaught exceptions are considered fatal errors.
                    // Re-throw them synchronously to interrupt flushing!

                    // Ensure continuation if the uncaught exception is suppressed
                    // listening "uncaughtException" events (as domains does).
                    // Continue in next event to avoid tick recursion.
                    if (domain) {
                        domain.exit();
                    }
                    setTimeout(flush, 0);
                    if (domain) {
                        domain.enter();
                    }

                    throw e;

                } else {
                    // In browsers, uncaught exceptions are not fatal.
                    // Re-throw them asynchronously to avoid slow-downs.
                    setTimeout(function() {
                       throw e;
                    }, 0);
                }
            }

            if (domain) {
                domain.exit();
            }
        }

        flushing = false;
    }

    nextTick = function (task) {
        tail = tail.next = {
            task: task,
            domain: isNodeJS && process.domain,
            next: null
        };

        if (!flushing) {
            flushing = true;
            requestTick();
        }
    };

    if (typeof process !== "undefined" && process.nextTick) {
        // Node.js before 0.9. Note that some fake-Node environments, like the
        // Mocha test runner, introduce a `process` global without a `nextTick`.
        isNodeJS = true;

        requestTick = function () {
            process.nextTick(flush);
        };

    } else if (typeof setImmediate === "function") {
        // In IE10, Node.js 0.9+, or https://github.com/NobleJS/setImmediate
        if (typeof window !== "undefined") {
            requestTick = setImmediate.bind(window, flush);
        } else {
            requestTick = function () {
                setImmediate(flush);
            };
        }

    } else if (typeof MessageChannel !== "undefined") {
        // modern browsers
        // http://www.nonblocking.io/2011/06/windownexttick.html
        var channel = new MessageChannel();
        // At least Safari Version 6.0.5 (8536.30.1) intermittently cannot create
        // working message ports the first time a page loads.
        channel.port1.onmessage = function () {
            requestTick = requestPortTick;
            channel.port1.onmessage = flush;
            flush();
        };
        var requestPortTick = function () {
            // Opera requires us to provide a message payload, regardless of
            // whether we use it.
            channel.port2.postMessage(0);
        };
        requestTick = function () {
            setTimeout(flush, 0);
            requestPortTick();
        };

    } else {
        // old browsers
        requestTick = function () {
            setTimeout(flush, 0);
        };
    }

    return nextTick;
})();

// Attempt to make generics safe in the face of downstream
// modifications.
// There is no situation where this is necessary.
// If you need a security guarantee, these primordials need to be
// deeply frozen anyway, and if you don’t need a security guarantee,
// this is just plain paranoid.
// However, this **might** have the nice side-effect of reducing the size of
// the minified code by reducing x.call() to merely x()
// See Mark Miller’s explanation of what this does.
// http://wiki.ecmascript.org/doku.php?id=conventions:safe_meta_programming
var call = Function.call;
function uncurryThis(f) {
    return function () {
        return call.apply(f, arguments);
    };
}
// This is equivalent, but slower:
// uncurryThis = Function_bind.bind(Function_bind.call);
// http://jsperf.com/uncurrythis

var array_slice = uncurryThis(Array.prototype.slice);

var array_reduce = uncurryThis(
    Array.prototype.reduce || function (callback, basis) {
        var index = 0,
            length = this.length;
        // concerning the initial value, if one is not provided
        if (arguments.length === 1) {
            // seek to the first value in the array, accounting
            // for the possibility that is is a sparse array
            do {
                if (index in this) {
                    basis = this[index++];
                    break;
                }
                if (++index >= length) {
                    throw new TypeError();
                }
            } while (1);
        }
        // reduce
        for (; index < length; index++) {
            // account for the possibility that the array is sparse
            if (index in this) {
                basis = callback(basis, this[index], index);
            }
        }
        return basis;
    }
);

var array_indexOf = uncurryThis(
    Array.prototype.indexOf || function (value) {
        // not a very good shim, but good enough for our one use of it
        for (var i = 0; i < this.length; i++) {
            if (this[i] === value) {
                return i;
            }
        }
        return -1;
    }
);

var array_map = uncurryThis(
    Array.prototype.map || function (callback, thisp) {
        var self = this;
        var collect = [];
        array_reduce(self, function (undefined, value, index) {
            collect.push(callback.call(thisp, value, index, self));
        }, void 0);
        return collect;
    }
);

var object_create = Object.create || function (prototype) {
    function Type() { }
    Type.prototype = prototype;
    return new Type();
};

var object_hasOwnProperty = uncurryThis(Object.prototype.hasOwnProperty);

var object_keys = Object.keys || function (object) {
    var keys = [];
    for (var key in object) {
        if (object_hasOwnProperty(object, key)) {
            keys.push(key);
        }
    }
    return keys;
};

var object_toString = uncurryThis(Object.prototype.toString);

function isObject(value) {
    return value === Object(value);
}

// generator related shims

// FIXME: Remove this function once ES6 generators are in SpiderMonkey.
function isStopIteration(exception) {
    return (
        object_toString(exception) === "[object StopIteration]" ||
        exception instanceof QReturnValue
    );
}

// FIXME: Remove this helper and Q.return once ES6 generators are in
// SpiderMonkey.
var QReturnValue;
if (typeof ReturnValue !== "undefined") {
    QReturnValue = ReturnValue;
} else {
    QReturnValue = function (value) {
        this.value = value;
    };
}

// long stack traces

var STACK_JUMP_SEPARATOR = "From previous event:";

function makeStackTraceLong(error, promise) {
    // If possible, transform the error stack trace by removing Node and Q
    // cruft, then concatenating with the stack trace of `promise`. See #57.
    if (hasStacks &&
        promise.stack &&
        typeof error === "object" &&
        error !== null &&
        error.stack &&
        error.stack.indexOf(STACK_JUMP_SEPARATOR) === -1
    ) {
        var stacks = [];
        for (var p = promise; !!p; p = p.source) {
            if (p.stack) {
                stacks.unshift(p.stack);
            }
        }
        stacks.unshift(error.stack);

        var concatedStacks = stacks.join("\n" + STACK_JUMP_SEPARATOR + "\n");
        error.stack = filterStackString(concatedStacks);
    }
}

function filterStackString(stackString) {
    var lines = stackString.split("\n");
    var desiredLines = [];
    for (var i = 0; i < lines.length; ++i) {
        var line = lines[i];

        if (!isInternalFrame(line) && !isNodeFrame(line) && line) {
            desiredLines.push(line);
        }
    }
    return desiredLines.join("\n");
}

function isNodeFrame(stackLine) {
    return stackLine.indexOf("(module.js:") !== -1 ||
           stackLine.indexOf("(node.js:") !== -1;
}

function getFileNameAndLineNumber(stackLine) {
    // Named functions: "at functionName (filename:lineNumber:columnNumber)"
    // In IE10 function name can have spaces ("Anonymous function") O_o
    var attempt1 = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(stackLine);
    if (attempt1) {
        return [attempt1[1], Number(attempt1[2])];
    }

    // Anonymous functions: "at filename:lineNumber:columnNumber"
    var attempt2 = /at ([^ ]+):(\d+):(?:\d+)$/.exec(stackLine);
    if (attempt2) {
        return [attempt2[1], Number(attempt2[2])];
    }

    // Firefox style: "function@filename:lineNumber or @filename:lineNumber"
    var attempt3 = /.*@(.+):(\d+)$/.exec(stackLine);
    if (attempt3) {
        return [attempt3[1], Number(attempt3[2])];
    }
}

function isInternalFrame(stackLine) {
    var fileNameAndLineNumber = getFileNameAndLineNumber(stackLine);

    if (!fileNameAndLineNumber) {
        return false;
    }

    var fileName = fileNameAndLineNumber[0];
    var lineNumber = fileNameAndLineNumber[1];

    return fileName === qFileName &&
        lineNumber >= qStartingLine &&
        lineNumber <= qEndingLine;
}

// discover own file name and line number range for filtering stack
// traces
function captureLine() {
    if (!hasStacks) {
        return;
    }

    try {
        throw new Error();
    } catch (e) {
        var lines = e.stack.split("\n");
        var firstLine = lines[0].indexOf("@") > 0 ? lines[1] : lines[2];
        var fileNameAndLineNumber = getFileNameAndLineNumber(firstLine);
        if (!fileNameAndLineNumber) {
            return;
        }

        qFileName = fileNameAndLineNumber[0];
        return fileNameAndLineNumber[1];
    }
}

function deprecate(callback, name, alternative) {
    return function () {
        if (typeof console !== "undefined" &&
            typeof console.warn === "function") {
            console.warn(name + " is deprecated, use " + alternative +
                         " instead.", new Error("").stack);
        }
        return callback.apply(callback, arguments);
    };
}

// end of shims
// beginning of real work

/**
 * Constructs a promise for an immediate reference, passes promises through, or
 * coerces promises from different systems.
 * @param value immediate reference or promise
 */
function Q(value) {
    // If the object is already a Promise, return it directly.  This enables
    // the resolve function to both be used to created references from objects,
    // but to tolerably coerce non-promises to promises.
    if (isPromise(value)) {
        return value;
    }

    // assimilate thenables
    if (isPromiseAlike(value)) {
        return coerce(value);
    } else {
        return fulfill(value);
    }
}
Q.resolve = Q;

/**
 * Performs a task in a future turn of the event loop.
 * @param {Function} task
 */
Q.nextTick = nextTick;

/**
 * Controls whether or not long stack traces will be on
 */
Q.longStackSupport = false;

/**
 * Constructs a {promise, resolve, reject} object.
 *
 * `resolve` is a callback to invoke with a more resolved value for the
 * promise. To fulfill the promise, invoke `resolve` with any value that is
 * not a thenable. To reject the promise, invoke `resolve` with a rejected
 * thenable, or invoke `reject` with the reason directly. To resolve the
 * promise to another thenable, thus putting it in the same state, invoke
 * `resolve` with that other thenable.
 */
Q.defer = defer;
function defer() {
    // if "messages" is an "Array", that indicates that the promise has not yet
    // been resolved.  If it is "undefined", it has been resolved.  Each
    // element of the messages array is itself an array of complete arguments to
    // forward to the resolved promise.  We coerce the resolution value to a
    // promise using the `resolve` function because it handles both fully
    // non-thenable values and other thenables gracefully.
    var messages = [], progressListeners = [], resolvedPromise;

    var deferred = object_create(defer.prototype);
    var promise = object_create(Promise.prototype);

    promise.promiseDispatch = function (resolve, op, operands) {
        var args = array_slice(arguments);
        if (messages) {
            messages.push(args);
            if (op === "when" && operands[1]) { // progress operand
                progressListeners.push(operands[1]);
            }
        } else {
            nextTick(function () {
                resolvedPromise.promiseDispatch.apply(resolvedPromise, args);
            });
        }
    };

    // XXX deprecated
    promise.valueOf = function () {
        if (messages) {
            return promise;
        }
        var nearerValue = nearer(resolvedPromise);
        if (isPromise(nearerValue)) {
            resolvedPromise = nearerValue; // shorten chain
        }
        return nearerValue;
    };

    promise.inspect = function () {
        if (!resolvedPromise) {
            return { state: "pending" };
        }
        return resolvedPromise.inspect();
    };

    if (Q.longStackSupport && hasStacks) {
        try {
            throw new Error();
        } catch (e) {
            // NOTE: don't try to use `Error.captureStackTrace` or transfer the
            // accessor around; that causes memory leaks as per GH-111. Just
            // reify the stack trace as a string ASAP.
            //
            // At the same time, cut off the first line; it's always just
            // "[object Promise]\n", as per the `toString`.
            promise.stack = e.stack.substring(e.stack.indexOf("\n") + 1);
        }
    }

    // NOTE: we do the checks for `resolvedPromise` in each method, instead of
    // consolidating them into `become`, since otherwise we'd create new
    // promises with the lines `become(whatever(value))`. See e.g. GH-252.

    function become(newPromise) {
        resolvedPromise = newPromise;
        promise.source = newPromise;

        array_reduce(messages, function (undefined, message) {
            nextTick(function () {
                newPromise.promiseDispatch.apply(newPromise, message);
            });
        }, void 0);

        messages = void 0;
        progressListeners = void 0;
    }

    deferred.promise = promise;
    deferred.resolve = function (value) {
        if (resolvedPromise) {
            return;
        }

        become(Q(value));
    };

    deferred.fulfill = function (value) {
        if (resolvedPromise) {
            return;
        }

        become(fulfill(value));
    };
    deferred.reject = function (reason) {
        if (resolvedPromise) {
            return;
        }

        become(reject(reason));
    };
    deferred.notify = function (progress) {
        if (resolvedPromise) {
            return;
        }

        array_reduce(progressListeners, function (undefined, progressListener) {
            nextTick(function () {
                progressListener(progress);
            });
        }, void 0);
    };

    return deferred;
}

/**
 * Creates a Node-style callback that will resolve or reject the deferred
 * promise.
 * @returns a nodeback
 */
defer.prototype.makeNodeResolver = function () {
    var self = this;
    return function (error, value) {
        if (error) {
            self.reject(error);
        } else if (arguments.length > 2) {
            self.resolve(array_slice(arguments, 1));
        } else {
            self.resolve(value);
        }
    };
};

/**
 * @param resolver {Function} a function that returns nothing and accepts
 * the resolve, reject, and notify functions for a deferred.
 * @returns a promise that may be resolved with the given resolve and reject
 * functions, or rejected by a thrown exception in resolver
 */
Q.Promise = promise; // ES6
Q.promise = promise;
function promise(resolver) {
    if (typeof resolver !== "function") {
        throw new TypeError("resolver must be a function.");
    }
    var deferred = defer();
    try {
        resolver(deferred.resolve, deferred.reject, deferred.notify);
    } catch (reason) {
        deferred.reject(reason);
    }
    return deferred.promise;
}

promise.race = race; // ES6
promise.all = all; // ES6
promise.reject = reject; // ES6
promise.resolve = Q; // ES6

// XXX experimental.  This method is a way to denote that a local value is
// serializable and should be immediately dispatched to a remote upon request,
// instead of passing a reference.
Q.passByCopy = function (object) {
    //freeze(object);
    //passByCopies.set(object, true);
    return object;
};

Promise.prototype.passByCopy = function () {
    //freeze(object);
    //passByCopies.set(object, true);
    return this;
};

/**
 * If two promises eventually fulfill to the same value, promises that value,
 * but otherwise rejects.
 * @param x {Any*}
 * @param y {Any*}
 * @returns {Any*} a promise for x and y if they are the same, but a rejection
 * otherwise.
 *
 */
Q.join = function (x, y) {
    return Q(x).join(y);
};

Promise.prototype.join = function (that) {
    return Q([this, that]).spread(function (x, y) {
        if (x === y) {
            // TODO: "===" should be Object.is or equiv
            return x;
        } else {
            throw new Error("Can't join: not the same: " + x + " " + y);
        }
    });
};

/**
 * Returns a promise for the first of an array of promises to become fulfilled.
 * @param answers {Array[Any*]} promises to race
 * @returns {Any*} the first promise to be fulfilled
 */
Q.race = race;
function race(answerPs) {
    return promise(function(resolve, reject) {
        // Switch to this once we can assume at least ES5
        // answerPs.forEach(function(answerP) {
        //     Q(answerP).then(resolve, reject);
        // });
        // Use this in the meantime
        for (var i = 0, len = answerPs.length; i < len; i++) {
            Q(answerPs[i]).then(resolve, reject);
        }
    });
}

Promise.prototype.race = function () {
    return this.then(Q.race);
};

/**
 * Constructs a Promise with a promise descriptor object and optional fallback
 * function.  The descriptor contains methods like when(rejected), get(name),
 * set(name, value), post(name, args), and delete(name), which all
 * return either a value, a promise for a value, or a rejection.  The fallback
 * accepts the operation name, a resolver, and any further arguments that would
 * have been forwarded to the appropriate method above had a method been
 * provided with the proper name.  The API makes no guarantees about the nature
 * of the returned object, apart from that it is usable whereever promises are
 * bought and sold.
 */
Q.makePromise = Promise;
function Promise(descriptor, fallback, inspect) {
    if (fallback === void 0) {
        fallback = function (op) {
            return reject(new Error(
                "Promise does not support operation: " + op
            ));
        };
    }
    if (inspect === void 0) {
        inspect = function () {
            return {state: "unknown"};
        };
    }

    var promise = object_create(Promise.prototype);

    promise.promiseDispatch = function (resolve, op, args) {
        var result;
        try {
            if (descriptor[op]) {
                result = descriptor[op].apply(promise, args);
            } else {
                result = fallback.call(promise, op, args);
            }
        } catch (exception) {
            result = reject(exception);
        }
        if (resolve) {
            resolve(result);
        }
    };

    promise.inspect = inspect;

    // XXX deprecated `valueOf` and `exception` support
    if (inspect) {
        var inspected = inspect();
        if (inspected.state === "rejected") {
            promise.exception = inspected.reason;
        }

        promise.valueOf = function () {
            var inspected = inspect();
            if (inspected.state === "pending" ||
                inspected.state === "rejected") {
                return promise;
            }
            return inspected.value;
        };
    }

    return promise;
}

Promise.prototype.toString = function () {
    return "[object Promise]";
};

Promise.prototype.then = function (fulfilled, rejected, progressed) {
    var self = this;
    var deferred = defer();
    var done = false;   // ensure the untrusted promise makes at most a
                        // single call to one of the callbacks

    function _fulfilled(value) {
        try {
            return typeof fulfilled === "function" ? fulfilled(value) : value;
        } catch (exception) {
            return reject(exception);
        }
    }

    function _rejected(exception) {
        if (typeof rejected === "function") {
            makeStackTraceLong(exception, self);
            try {
                return rejected(exception);
            } catch (newException) {
                return reject(newException);
            }
        }
        return reject(exception);
    }

    function _progressed(value) {
        return typeof progressed === "function" ? progressed(value) : value;
    }

    nextTick(function () {
        self.promiseDispatch(function (value) {
            if (done) {
                return;
            }
            done = true;

            deferred.resolve(_fulfilled(value));
        }, "when", [function (exception) {
            if (done) {
                return;
            }
            done = true;

            deferred.resolve(_rejected(exception));
        }]);
    });

    // Progress propagator need to be attached in the current tick.
    self.promiseDispatch(void 0, "when", [void 0, function (value) {
        var newValue;
        var threw = false;
        try {
            newValue = _progressed(value);
        } catch (e) {
            threw = true;
            if (Q.onerror) {
                Q.onerror(e);
            } else {
                throw e;
            }
        }

        if (!threw) {
            deferred.notify(newValue);
        }
    }]);

    return deferred.promise;
};

/**
 * Registers an observer on a promise.
 *
 * Guarantees:
 *
 * 1. that fulfilled and rejected will be called only once.
 * 2. that either the fulfilled callback or the rejected callback will be
 *    called, but not both.
 * 3. that fulfilled and rejected will not be called in this turn.
 *
 * @param value      promise or immediate reference to observe
 * @param fulfilled  function to be called with the fulfilled value
 * @param rejected   function to be called with the rejection exception
 * @param progressed function to be called on any progress notifications
 * @return promise for the return value from the invoked callback
 */
Q.when = when;
function when(value, fulfilled, rejected, progressed) {
    return Q(value).then(fulfilled, rejected, progressed);
}

Promise.prototype.thenResolve = function (value) {
    return this.then(function () { return value; });
};

Q.thenResolve = function (promise, value) {
    return Q(promise).thenResolve(value);
};

Promise.prototype.thenReject = function (reason) {
    return this.then(function () { throw reason; });
};

Q.thenReject = function (promise, reason) {
    return Q(promise).thenReject(reason);
};

/**
 * If an object is not a promise, it is as "near" as possible.
 * If a promise is rejected, it is as "near" as possible too.
 * If it’s a fulfilled promise, the fulfillment value is nearer.
 * If it’s a deferred promise and the deferred has been resolved, the
 * resolution is "nearer".
 * @param object
 * @returns most resolved (nearest) form of the object
 */

// XXX should we re-do this?
Q.nearer = nearer;
function nearer(value) {
    if (isPromise(value)) {
        var inspected = value.inspect();
        if (inspected.state === "fulfilled") {
            return inspected.value;
        }
    }
    return value;
}

/**
 * @returns whether the given object is a promise.
 * Otherwise it is a fulfilled value.
 */
Q.isPromise = isPromise;
function isPromise(object) {
    return isObject(object) &&
        typeof object.promiseDispatch === "function" &&
        typeof object.inspect === "function";
}

Q.isPromiseAlike = isPromiseAlike;
function isPromiseAlike(object) {
    return isObject(object) && typeof object.then === "function";
}

/**
 * @returns whether the given object is a pending promise, meaning not
 * fulfilled or rejected.
 */
Q.isPending = isPending;
function isPending(object) {
    return isPromise(object) && object.inspect().state === "pending";
}

Promise.prototype.isPending = function () {
    return this.inspect().state === "pending";
};

/**
 * @returns whether the given object is a value or fulfilled
 * promise.
 */
Q.isFulfilled = isFulfilled;
function isFulfilled(object) {
    return !isPromise(object) || object.inspect().state === "fulfilled";
}

Promise.prototype.isFulfilled = function () {
    return this.inspect().state === "fulfilled";
};

/**
 * @returns whether the given object is a rejected promise.
 */
Q.isRejected = isRejected;
function isRejected(object) {
    return isPromise(object) && object.inspect().state === "rejected";
}

Promise.prototype.isRejected = function () {
    return this.inspect().state === "rejected";
};

//// BEGIN UNHANDLED REJECTION TRACKING

// This promise library consumes exceptions thrown in handlers so they can be
// handled by a subsequent promise.  The exceptions get added to this array when
// they are created, and removed when they are handled.  Note that in ES6 or
// shimmed environments, this would naturally be a `Set`.
var unhandledReasons = [];
var unhandledRejections = [];
var trackUnhandledRejections = true;

function resetUnhandledRejections() {
    unhandledReasons.length = 0;
    unhandledRejections.length = 0;

    if (!trackUnhandledRejections) {
        trackUnhandledRejections = true;
    }
}

function trackRejection(promise, reason) {
    if (!trackUnhandledRejections) {
        return;
    }

    unhandledRejections.push(promise);
    if (reason && typeof reason.stack !== "undefined") {
        unhandledReasons.push(reason.stack);
    } else {
        unhandledReasons.push("(no stack) " + reason);
    }
}

function untrackRejection(promise) {
    if (!trackUnhandledRejections) {
        return;
    }

    var at = array_indexOf(unhandledRejections, promise);
    if (at !== -1) {
        unhandledRejections.splice(at, 1);
        unhandledReasons.splice(at, 1);
    }
}

Q.resetUnhandledRejections = resetUnhandledRejections;

Q.getUnhandledReasons = function () {
    // Make a copy so that consumers can't interfere with our internal state.
    return unhandledReasons.slice();
};

Q.stopUnhandledRejectionTracking = function () {
    resetUnhandledRejections();
    trackUnhandledRejections = false;
};

resetUnhandledRejections();

//// END UNHANDLED REJECTION TRACKING

/**
 * Constructs a rejected promise.
 * @param reason value describing the failure
 */
Q.reject = reject;
function reject(reason) {
    var rejection = Promise({
        "when": function (rejected) {
            // note that the error has been handled
            if (rejected) {
                untrackRejection(this);
            }
            return rejected ? rejected(reason) : this;
        }
    }, function fallback() {
        return this;
    }, function inspect() {
        return { state: "rejected", reason: reason };
    });

    // Note that the reason has not been handled.
    trackRejection(rejection, reason);

    return rejection;
}

/**
 * Constructs a fulfilled promise for an immediate reference.
 * @param value immediate reference
 */
Q.fulfill = fulfill;
function fulfill(value) {
    return Promise({
        "when": function () {
            return value;
        },
        "get": function (name) {
            return value[name];
        },
        "set": function (name, rhs) {
            value[name] = rhs;
        },
        "delete": function (name) {
            delete value[name];
        },
        "post": function (name, args) {
            // Mark Miller proposes that post with no name should apply a
            // promised function.
            if (name === null || name === void 0) {
                return value.apply(void 0, args);
            } else {
                return value[name].apply(value, args);
            }
        },
        "apply": function (thisp, args) {
            return value.apply(thisp, args);
        },
        "keys": function () {
            return object_keys(value);
        }
    }, void 0, function inspect() {
        return { state: "fulfilled", value: value };
    });
}

/**
 * Converts thenables to Q promises.
 * @param promise thenable promise
 * @returns a Q promise
 */
function coerce(promise) {
    var deferred = defer();
    nextTick(function () {
        try {
            promise.then(deferred.resolve, deferred.reject, deferred.notify);
        } catch (exception) {
            deferred.reject(exception);
        }
    });
    return deferred.promise;
}

/**
 * Annotates an object such that it will never be
 * transferred away from this process over any promise
 * communication channel.
 * @param object
 * @returns promise a wrapping of that object that
 * additionally responds to the "isDef" message
 * without a rejection.
 */
Q.master = master;
function master(object) {
    return Promise({
        "isDef": function () {}
    }, function fallback(op, args) {
        return dispatch(object, op, args);
    }, function () {
        return Q(object).inspect();
    });
}

/**
 * Spreads the values of a promised array of arguments into the
 * fulfillment callback.
 * @param fulfilled callback that receives variadic arguments from the
 * promised array
 * @param rejected callback that receives the exception if the promise
 * is rejected.
 * @returns a promise for the return value or thrown exception of
 * either callback.
 */
Q.spread = spread;
function spread(value, fulfilled, rejected) {
    return Q(value).spread(fulfilled, rejected);
}

Promise.prototype.spread = function (fulfilled, rejected) {
    return this.all().then(function (array) {
        return fulfilled.apply(void 0, array);
    }, rejected);
};

/**
 * The async function is a decorator for generator functions, turning
 * them into asynchronous generators.  Although generators are only part
 * of the newest ECMAScript 6 drafts, this code does not cause syntax
 * errors in older engines.  This code should continue to work and will
 * in fact improve over time as the language improves.
 *
 * ES6 generators are currently part of V8 version 3.19 with the
 * --harmony-generators runtime flag enabled.  SpiderMonkey has had them
 * for longer, but under an older Python-inspired form.  This function
 * works on both kinds of generators.
 *
 * Decorates a generator function such that:
 *  - it may yield promises
 *  - execution will continue when that promise is fulfilled
 *  - the value of the yield expression will be the fulfilled value
 *  - it returns a promise for the return value (when the generator
 *    stops iterating)
 *  - the decorated function returns a promise for the return value
 *    of the generator or the first rejected promise among those
 *    yielded.
 *  - if an error is thrown in the generator, it propagates through
 *    every following yield until it is caught, or until it escapes
 *    the generator function altogether, and is translated into a
 *    rejection for the promise returned by the decorated generator.
 */
Q.async = async;
function async(makeGenerator) {
    return function () {
        // when verb is "send", arg is a value
        // when verb is "throw", arg is an exception
        function continuer(verb, arg) {
            var result;

            // Until V8 3.19 / Chromium 29 is released, SpiderMonkey is the only
            // engine that has a deployed base of browsers that support generators.
            // However, SM's generators use the Python-inspired semantics of
            // outdated ES6 drafts.  We would like to support ES6, but we'd also
            // like to make it possible to use generators in deployed browsers, so
            // we also support Python-style generators.  At some point we can remove
            // this block.

            if (typeof StopIteration === "undefined") {
                // ES6 Generators
                try {
                    result = generator[verb](arg);
                } catch (exception) {
                    return reject(exception);
                }
                if (result.done) {
                    return result.value;
                } else {
                    return when(result.value, callback, errback);
                }
            } else {
                // SpiderMonkey Generators
                // FIXME: Remove this case when SM does ES6 generators.
                try {
                    result = generator[verb](arg);
                } catch (exception) {
                    if (isStopIteration(exception)) {
                        return exception.value;
                    } else {
                        return reject(exception);
                    }
                }
                return when(result, callback, errback);
            }
        }
        var generator = makeGenerator.apply(this, arguments);
        var callback = continuer.bind(continuer, "next");
        var errback = continuer.bind(continuer, "throw");
        return callback();
    };
}

/**
 * The spawn function is a small wrapper around async that immediately
 * calls the generator and also ends the promise chain, so that any
 * unhandled errors are thrown instead of forwarded to the error
 * handler. This is useful because it's extremely common to run
 * generators at the top-level to work with libraries.
 */
Q.spawn = spawn;
function spawn(makeGenerator) {
    Q.done(Q.async(makeGenerator)());
}

// FIXME: Remove this interface once ES6 generators are in SpiderMonkey.
/**
 * Throws a ReturnValue exception to stop an asynchronous generator.
 *
 * This interface is a stop-gap measure to support generator return
 * values in older Firefox/SpiderMonkey.  In browsers that support ES6
 * generators like Chromium 29, just use "return" in your generator
 * functions.
 *
 * @param value the return value for the surrounding generator
 * @throws ReturnValue exception with the value.
 * @example
 * // ES6 style
 * Q.async(function* () {
 *      var foo = yield getFooPromise();
 *      var bar = yield getBarPromise();
 *      return foo + bar;
 * })
 * // Older SpiderMonkey style
 * Q.async(function () {
 *      var foo = yield getFooPromise();
 *      var bar = yield getBarPromise();
 *      Q.return(foo + bar);
 * })
 */
Q["return"] = _return;
function _return(value) {
    throw new QReturnValue(value);
}

/**
 * The promised function decorator ensures that any promise arguments
 * are settled and passed as values (`this` is also settled and passed
 * as a value).  It will also ensure that the result of a function is
 * always a promise.
 *
 * @example
 * var add = Q.promised(function (a, b) {
 *     return a + b;
 * });
 * add(Q(a), Q(B));
 *
 * @param {function} callback The function to decorate
 * @returns {function} a function that has been decorated.
 */
Q.promised = promised;
function promised(callback) {
    return function () {
        return spread([this, all(arguments)], function (self, args) {
            return callback.apply(self, args);
        });
    };
}

/**
 * sends a message to a value in a future turn
 * @param object* the recipient
 * @param op the name of the message operation, e.g., "when",
 * @param args further arguments to be forwarded to the operation
 * @returns result {Promise} a promise for the result of the operation
 */
Q.dispatch = dispatch;
function dispatch(object, op, args) {
    return Q(object).dispatch(op, args);
}

Promise.prototype.dispatch = function (op, args) {
    var self = this;
    var deferred = defer();
    nextTick(function () {
        self.promiseDispatch(deferred.resolve, op, args);
    });
    return deferred.promise;
};

/**
 * Gets the value of a property in a future turn.
 * @param object    promise or immediate reference for target object
 * @param name      name of property to get
 * @return promise for the property value
 */
Q.get = function (object, key) {
    return Q(object).dispatch("get", [key]);
};

Promise.prototype.get = function (key) {
    return this.dispatch("get", [key]);
};

/**
 * Sets the value of a property in a future turn.
 * @param object    promise or immediate reference for object object
 * @param name      name of property to set
 * @param value     new value of property
 * @return promise for the return value
 */
Q.set = function (object, key, value) {
    return Q(object).dispatch("set", [key, value]);
};

Promise.prototype.set = function (key, value) {
    return this.dispatch("set", [key, value]);
};

/**
 * Deletes a property in a future turn.
 * @param object    promise or immediate reference for target object
 * @param name      name of property to delete
 * @return promise for the return value
 */
Q.del = // XXX legacy
Q["delete"] = function (object, key) {
    return Q(object).dispatch("delete", [key]);
};

Promise.prototype.del = // XXX legacy
Promise.prototype["delete"] = function (key) {
    return this.dispatch("delete", [key]);
};

/**
 * Invokes a method in a future turn.
 * @param object    promise or immediate reference for target object
 * @param name      name of method to invoke
 * @param value     a value to post, typically an array of
 *                  invocation arguments for promises that
 *                  are ultimately backed with `resolve` values,
 *                  as opposed to those backed with URLs
 *                  wherein the posted value can be any
 *                  JSON serializable object.
 * @return promise for the return value
 */
// bound locally because it is used by other methods
Q.mapply = // XXX As proposed by "Redsandro"
Q.post = function (object, name, args) {
    return Q(object).dispatch("post", [name, args]);
};

Promise.prototype.mapply = // XXX As proposed by "Redsandro"
Promise.prototype.post = function (name, args) {
    return this.dispatch("post", [name, args]);
};

/**
 * Invokes a method in a future turn.
 * @param object    promise or immediate reference for target object
 * @param name      name of method to invoke
 * @param ...args   array of invocation arguments
 * @return promise for the return value
 */
Q.send = // XXX Mark Miller's proposed parlance
Q.mcall = // XXX As proposed by "Redsandro"
Q.invoke = function (object, name /*...args*/) {
    return Q(object).dispatch("post", [name, array_slice(arguments, 2)]);
};

Promise.prototype.send = // XXX Mark Miller's proposed parlance
Promise.prototype.mcall = // XXX As proposed by "Redsandro"
Promise.prototype.invoke = function (name /*...args*/) {
    return this.dispatch("post", [name, array_slice(arguments, 1)]);
};

/**
 * Applies the promised function in a future turn.
 * @param object    promise or immediate reference for target function
 * @param args      array of application arguments
 */
Q.fapply = function (object, args) {
    return Q(object).dispatch("apply", [void 0, args]);
};

Promise.prototype.fapply = function (args) {
    return this.dispatch("apply", [void 0, args]);
};

/**
 * Calls the promised function in a future turn.
 * @param object    promise or immediate reference for target function
 * @param ...args   array of application arguments
 */
Q["try"] =
Q.fcall = function (object /* ...args*/) {
    return Q(object).dispatch("apply", [void 0, array_slice(arguments, 1)]);
};

Promise.prototype.fcall = function (/*...args*/) {
    return this.dispatch("apply", [void 0, array_slice(arguments)]);
};

/**
 * Binds the promised function, transforming return values into a fulfilled
 * promise and thrown errors into a rejected one.
 * @param object    promise or immediate reference for target function
 * @param ...args   array of application arguments
 */
Q.fbind = function (object /*...args*/) {
    var promise = Q(object);
    var args = array_slice(arguments, 1);
    return function fbound() {
        return promise.dispatch("apply", [
            this,
            args.concat(array_slice(arguments))
        ]);
    };
};
Promise.prototype.fbind = function (/*...args*/) {
    var promise = this;
    var args = array_slice(arguments);
    return function fbound() {
        return promise.dispatch("apply", [
            this,
            args.concat(array_slice(arguments))
        ]);
    };
};

/**
 * Requests the names of the owned properties of a promised
 * object in a future turn.
 * @param object    promise or immediate reference for target object
 * @return promise for the keys of the eventually settled object
 */
Q.keys = function (object) {
    return Q(object).dispatch("keys", []);
};

Promise.prototype.keys = function () {
    return this.dispatch("keys", []);
};

/**
 * Turns an array of promises into a promise for an array.  If any of
 * the promises gets rejected, the whole array is rejected immediately.
 * @param {Array*} an array (or promise for an array) of values (or
 * promises for values)
 * @returns a promise for an array of the corresponding values
 */
// By Mark Miller
// http://wiki.ecmascript.org/doku.php?id=strawman:concurrency&rev=1308776521#allfulfilled
Q.all = all;
function all(promises) {
    return when(promises, function (promises) {
        var countDown = 0;
        var deferred = defer();
        array_reduce(promises, function (undefined, promise, index) {
            var snapshot;
            if (
                isPromise(promise) &&
                (snapshot = promise.inspect()).state === "fulfilled"
            ) {
                promises[index] = snapshot.value;
            } else {
                ++countDown;
                when(
                    promise,
                    function (value) {
                        promises[index] = value;
                        if (--countDown === 0) {
                            deferred.resolve(promises);
                        }
                    },
                    deferred.reject,
                    function (progress) {
                        deferred.notify({ index: index, value: progress });
                    }
                );
            }
        }, void 0);
        if (countDown === 0) {
            deferred.resolve(promises);
        }
        return deferred.promise;
    });
}

Promise.prototype.all = function () {
    return all(this);
};

/**
 * Waits for all promises to be settled, either fulfilled or
 * rejected.  This is distinct from `all` since that would stop
 * waiting at the first rejection.  The promise returned by
 * `allResolved` will never be rejected.
 * @param promises a promise for an array (or an array) of promises
 * (or values)
 * @return a promise for an array of promises
 */
Q.allResolved = deprecate(allResolved, "allResolved", "allSettled");
function allResolved(promises) {
    return when(promises, function (promises) {
        promises = array_map(promises, Q);
        return when(all(array_map(promises, function (promise) {
            return when(promise, noop, noop);
        })), function () {
            return promises;
        });
    });
}

Promise.prototype.allResolved = function () {
    return allResolved(this);
};

/**
 * @see Promise#allSettled
 */
Q.allSettled = allSettled;
function allSettled(promises) {
    return Q(promises).allSettled();
}

/**
 * Turns an array of promises into a promise for an array of their states (as
 * returned by `inspect`) when they have all settled.
 * @param {Array[Any*]} values an array (or promise for an array) of values (or
 * promises for values)
 * @returns {Array[State]} an array of states for the respective values.
 */
Promise.prototype.allSettled = function () {
    return this.then(function (promises) {
        return all(array_map(promises, function (promise) {
            promise = Q(promise);
            function regardless() {
                return promise.inspect();
            }
            return promise.then(regardless, regardless);
        }));
    });
};

/**
 * Captures the failure of a promise, giving an oportunity to recover
 * with a callback.  If the given promise is fulfilled, the returned
 * promise is fulfilled.
 * @param {Any*} promise for something
 * @param {Function} callback to fulfill the returned promise if the
 * given promise is rejected
 * @returns a promise for the return value of the callback
 */
Q.fail = // XXX legacy
Q["catch"] = function (object, rejected) {
    return Q(object).then(void 0, rejected);
};

Promise.prototype.fail = // XXX legacy
Promise.prototype["catch"] = function (rejected) {
    return this.then(void 0, rejected);
};

/**
 * Attaches a listener that can respond to progress notifications from a
 * promise's originating deferred. This listener receives the exact arguments
 * passed to ``deferred.notify``.
 * @param {Any*} promise for something
 * @param {Function} callback to receive any progress notifications
 * @returns the given promise, unchanged
 */
Q.progress = progress;
function progress(object, progressed) {
    return Q(object).then(void 0, void 0, progressed);
}

Promise.prototype.progress = function (progressed) {
    return this.then(void 0, void 0, progressed);
};

/**
 * Provides an opportunity to observe the settling of a promise,
 * regardless of whether the promise is fulfilled or rejected.  Forwards
 * the resolution to the returned promise when the callback is done.
 * The callback can return a promise to defer completion.
 * @param {Any*} promise
 * @param {Function} callback to observe the resolution of the given
 * promise, takes no arguments.
 * @returns a promise for the resolution of the given promise when
 * ``fin`` is done.
 */
Q.fin = // XXX legacy
Q["finally"] = function (object, callback) {
    return Q(object)["finally"](callback);
};

Promise.prototype.fin = // XXX legacy
Promise.prototype["finally"] = function (callback) {
    callback = Q(callback);
    return this.then(function (value) {
        return callback.fcall().then(function () {
            return value;
        });
    }, function (reason) {
        // TODO attempt to recycle the rejection with "this".
        return callback.fcall().then(function () {
            throw reason;
        });
    });
};

/**
 * Terminates a chain of promises, forcing rejections to be
 * thrown as exceptions.
 * @param {Any*} promise at the end of a chain of promises
 * @returns nothing
 */
Q.done = function (object, fulfilled, rejected, progress) {
    return Q(object).done(fulfilled, rejected, progress);
};

Promise.prototype.done = function (fulfilled, rejected, progress) {
    var onUnhandledError = function (error) {
        // forward to a future turn so that ``when``
        // does not catch it and turn it into a rejection.
        nextTick(function () {
            makeStackTraceLong(error, promise);
            if (Q.onerror) {
                Q.onerror(error);
            } else {
                throw error;
            }
        });
    };

    // Avoid unnecessary `nextTick`ing via an unnecessary `when`.
    var promise = fulfilled || rejected || progress ?
        this.then(fulfilled, rejected, progress) :
        this;

    if (typeof process === "object" && process && process.domain) {
        onUnhandledError = process.domain.bind(onUnhandledError);
    }

    promise.then(void 0, onUnhandledError);
};

/**
 * Causes a promise to be rejected if it does not get fulfilled before
 * some milliseconds time out.
 * @param {Any*} promise
 * @param {Number} milliseconds timeout
 * @param {String} custom error message (optional)
 * @returns a promise for the resolution of the given promise if it is
 * fulfilled before the timeout, otherwise rejected.
 */
Q.timeout = function (object, ms, message) {
    return Q(object).timeout(ms, message);
};

Promise.prototype.timeout = function (ms, message) {
    var deferred = defer();
    var timeoutId = setTimeout(function () {
        deferred.reject(new Error(message || "Timed out after " + ms + " ms"));
    }, ms);

    this.then(function (value) {
        clearTimeout(timeoutId);
        deferred.resolve(value);
    }, function (exception) {
        clearTimeout(timeoutId);
        deferred.reject(exception);
    }, deferred.notify);

    return deferred.promise;
};

/**
 * Returns a promise for the given value (or promised value), some
 * milliseconds after it resolved. Passes rejections immediately.
 * @param {Any*} promise
 * @param {Number} milliseconds
 * @returns a promise for the resolution of the given promise after milliseconds
 * time has elapsed since the resolution of the given promise.
 * If the given promise rejects, that is passed immediately.
 */
Q.delay = function (object, timeout) {
    if (timeout === void 0) {
        timeout = object;
        object = void 0;
    }
    return Q(object).delay(timeout);
};

Promise.prototype.delay = function (timeout) {
    return this.then(function (value) {
        var deferred = defer();
        setTimeout(function () {
            deferred.resolve(value);
        }, timeout);
        return deferred.promise;
    });
};

/**
 * Passes a continuation to a Node function, which is called with the given
 * arguments provided as an array, and returns a promise.
 *
 *      Q.nfapply(FS.readFile, [__filename])
 *      .then(function (content) {
 *      })
 *
 */
Q.nfapply = function (callback, args) {
    return Q(callback).nfapply(args);
};

Promise.prototype.nfapply = function (args) {
    var deferred = defer();
    var nodeArgs = array_slice(args);
    nodeArgs.push(deferred.makeNodeResolver());
    this.fapply(nodeArgs).fail(deferred.reject);
    return deferred.promise;
};

/**
 * Passes a continuation to a Node function, which is called with the given
 * arguments provided individually, and returns a promise.
 * @example
 * Q.nfcall(FS.readFile, __filename)
 * .then(function (content) {
 * })
 *
 */
Q.nfcall = function (callback /*...args*/) {
    var args = array_slice(arguments, 1);
    return Q(callback).nfapply(args);
};

Promise.prototype.nfcall = function (/*...args*/) {
    var nodeArgs = array_slice(arguments);
    var deferred = defer();
    nodeArgs.push(deferred.makeNodeResolver());
    this.fapply(nodeArgs).fail(deferred.reject);
    return deferred.promise;
};

/**
 * Wraps a NodeJS continuation passing function and returns an equivalent
 * version that returns a promise.
 * @example
 * Q.nfbind(FS.readFile, __filename)("utf-8")
 * .then(console.log)
 * .done()
 */
Q.nfbind =
Q.denodeify = function (callback /*...args*/) {
    var baseArgs = array_slice(arguments, 1);
    return function () {
        var nodeArgs = baseArgs.concat(array_slice(arguments));
        var deferred = defer();
        nodeArgs.push(deferred.makeNodeResolver());
        Q(callback).fapply(nodeArgs).fail(deferred.reject);
        return deferred.promise;
    };
};

Promise.prototype.nfbind =
Promise.prototype.denodeify = function (/*...args*/) {
    var args = array_slice(arguments);
    args.unshift(this);
    return Q.denodeify.apply(void 0, args);
};

Q.nbind = function (callback, thisp /*...args*/) {
    var baseArgs = array_slice(arguments, 2);
    return function () {
        var nodeArgs = baseArgs.concat(array_slice(arguments));
        var deferred = defer();
        nodeArgs.push(deferred.makeNodeResolver());
        function bound() {
            return callback.apply(thisp, arguments);
        }
        Q(bound).fapply(nodeArgs).fail(deferred.reject);
        return deferred.promise;
    };
};

Promise.prototype.nbind = function (/*thisp, ...args*/) {
    var args = array_slice(arguments, 0);
    args.unshift(this);
    return Q.nbind.apply(void 0, args);
};

/**
 * Calls a method of a Node-style object that accepts a Node-style
 * callback with a given array of arguments, plus a provided callback.
 * @param object an object that has the named method
 * @param {String} name name of the method of object
 * @param {Array} args arguments to pass to the method; the callback
 * will be provided by Q and appended to these arguments.
 * @returns a promise for the value or error
 */
Q.nmapply = // XXX As proposed by "Redsandro"
Q.npost = function (object, name, args) {
    return Q(object).npost(name, args);
};

Promise.prototype.nmapply = // XXX As proposed by "Redsandro"
Promise.prototype.npost = function (name, args) {
    var nodeArgs = array_slice(args || []);
    var deferred = defer();
    nodeArgs.push(deferred.makeNodeResolver());
    this.dispatch("post", [name, nodeArgs]).fail(deferred.reject);
    return deferred.promise;
};

/**
 * Calls a method of a Node-style object that accepts a Node-style
 * callback, forwarding the given variadic arguments, plus a provided
 * callback argument.
 * @param object an object that has the named method
 * @param {String} name name of the method of object
 * @param ...args arguments to pass to the method; the callback will
 * be provided by Q and appended to these arguments.
 * @returns a promise for the value or error
 */
Q.nsend = // XXX Based on Mark Miller's proposed "send"
Q.nmcall = // XXX Based on "Redsandro's" proposal
Q.ninvoke = function (object, name /*...args*/) {
    var nodeArgs = array_slice(arguments, 2);
    var deferred = defer();
    nodeArgs.push(deferred.makeNodeResolver());
    Q(object).dispatch("post", [name, nodeArgs]).fail(deferred.reject);
    return deferred.promise;
};

Promise.prototype.nsend = // XXX Based on Mark Miller's proposed "send"
Promise.prototype.nmcall = // XXX Based on "Redsandro's" proposal
Promise.prototype.ninvoke = function (name /*...args*/) {
    var nodeArgs = array_slice(arguments, 1);
    var deferred = defer();
    nodeArgs.push(deferred.makeNodeResolver());
    this.dispatch("post", [name, nodeArgs]).fail(deferred.reject);
    return deferred.promise;
};

/**
 * If a function would like to support both Node continuation-passing-style and
 * promise-returning-style, it can end its internal promise chain with
 * `nodeify(nodeback)`, forwarding the optional nodeback argument.  If the user
 * elects to use a nodeback, the result will be sent there.  If they do not
 * pass a nodeback, they will receive the result promise.
 * @param object a result (or a promise for a result)
 * @param {Function} nodeback a Node.js-style callback
 * @returns either the promise or nothing
 */
Q.nodeify = nodeify;
function nodeify(object, nodeback) {
    return Q(object).nodeify(nodeback);
}

Promise.prototype.nodeify = function (nodeback) {
    if (nodeback) {
        this.then(function (value) {
            nextTick(function () {
                nodeback(null, value);
            });
        }, function (error) {
            nextTick(function () {
                nodeback(error);
            });
        });
    } else {
        return this;
    }
};

// All code before this point will be filtered from stack traces.
var qEndingLine = captureLine();

return Q;

});

/**
 * @license
 * Lo-Dash 2.4.1 (Custom Build) lodash.com/license | Underscore.js 1.5.2 underscorejs.org/LICENSE
 * Build: `lodash modern -o ./dist/lodash.js`
 */
;(function(){function n(n,t,e){e=(e||0)-1;for(var r=n?n.length:0;++e<r;)if(n[e]===t)return e;return-1}function t(t,e){var r=typeof e;if(t=t.l,"boolean"==r||null==e)return t[e]?0:-1;"number"!=r&&"string"!=r&&(r="object");var u="number"==r?e:m+e;return t=(t=t[r])&&t[u],"object"==r?t&&-1<n(t,e)?0:-1:t?0:-1}function e(n){var t=this.l,e=typeof n;if("boolean"==e||null==n)t[n]=true;else{"number"!=e&&"string"!=e&&(e="object");var r="number"==e?n:m+n,t=t[e]||(t[e]={});"object"==e?(t[r]||(t[r]=[])).push(n):t[r]=true
}}function r(n){return n.charCodeAt(0)}function u(n,t){for(var e=n.m,r=t.m,u=-1,o=e.length;++u<o;){var i=e[u],a=r[u];if(i!==a){if(i>a||typeof i=="undefined")return 1;if(i<a||typeof a=="undefined")return-1}}return n.n-t.n}function o(n){var t=-1,r=n.length,u=n[0],o=n[r/2|0],i=n[r-1];if(u&&typeof u=="object"&&o&&typeof o=="object"&&i&&typeof i=="object")return false;for(u=f(),u["false"]=u["null"]=u["true"]=u.undefined=false,o=f(),o.k=n,o.l=u,o.push=e;++t<r;)o.push(n[t]);return o}function i(n){return"\\"+U[n]
}function a(){return h.pop()||[]}function f(){return g.pop()||{k:null,l:null,m:null,"false":false,n:0,"null":false,number:null,object:null,push:null,string:null,"true":false,undefined:false,o:null}}function l(n){n.length=0,h.length<_&&h.push(n)}function c(n){var t=n.l;t&&c(t),n.k=n.l=n.m=n.object=n.number=n.string=n.o=null,g.length<_&&g.push(n)}function p(n,t,e){t||(t=0),typeof e=="undefined"&&(e=n?n.length:0);var r=-1;e=e-t||0;for(var u=Array(0>e?0:e);++r<e;)u[r]=n[t+r];return u}function s(e){function h(n,t,e){if(!n||!V[typeof n])return n;
t=t&&typeof e=="undefined"?t:tt(t,e,3);for(var r=-1,u=V[typeof n]&&Fe(n),o=u?u.length:0;++r<o&&(e=u[r],false!==t(n[e],e,n)););return n}function g(n,t,e){var r;if(!n||!V[typeof n])return n;t=t&&typeof e=="undefined"?t:tt(t,e,3);for(r in n)if(false===t(n[r],r,n))break;return n}function _(n,t,e){var r,u=n,o=u;if(!u)return o;for(var i=arguments,a=0,f=typeof e=="number"?2:i.length;++a<f;)if((u=i[a])&&V[typeof u])for(var l=-1,c=V[typeof u]&&Fe(u),p=c?c.length:0;++l<p;)r=c[l],"undefined"==typeof o[r]&&(o[r]=u[r]);
return o}function U(n,t,e){var r,u=n,o=u;if(!u)return o;var i=arguments,a=0,f=typeof e=="number"?2:i.length;if(3<f&&"function"==typeof i[f-2])var l=tt(i[--f-1],i[f--],2);else 2<f&&"function"==typeof i[f-1]&&(l=i[--f]);for(;++a<f;)if((u=i[a])&&V[typeof u])for(var c=-1,p=V[typeof u]&&Fe(u),s=p?p.length:0;++c<s;)r=p[c],o[r]=l?l(o[r],u[r]):u[r];return o}function H(n){var t,e=[];if(!n||!V[typeof n])return e;for(t in n)me.call(n,t)&&e.push(t);return e}function J(n){return n&&typeof n=="object"&&!Te(n)&&me.call(n,"__wrapped__")?n:new Q(n)
}function Q(n,t){this.__chain__=!!t,this.__wrapped__=n}function X(n){function t(){if(r){var n=p(r);be.apply(n,arguments)}if(this instanceof t){var o=nt(e.prototype),n=e.apply(o,n||arguments);return wt(n)?n:o}return e.apply(u,n||arguments)}var e=n[0],r=n[2],u=n[4];return $e(t,n),t}function Z(n,t,e,r,u){if(e){var o=e(n);if(typeof o!="undefined")return o}if(!wt(n))return n;var i=ce.call(n);if(!K[i])return n;var f=Ae[i];switch(i){case T:case F:return new f(+n);case W:case P:return new f(n);case z:return o=f(n.source,C.exec(n)),o.lastIndex=n.lastIndex,o
}if(i=Te(n),t){var c=!r;r||(r=a()),u||(u=a());for(var s=r.length;s--;)if(r[s]==n)return u[s];o=i?f(n.length):{}}else o=i?p(n):U({},n);return i&&(me.call(n,"index")&&(o.index=n.index),me.call(n,"input")&&(o.input=n.input)),t?(r.push(n),u.push(o),(i?St:h)(n,function(n,i){o[i]=Z(n,t,e,r,u)}),c&&(l(r),l(u)),o):o}function nt(n){return wt(n)?ke(n):{}}function tt(n,t,e){if(typeof n!="function")return Ut;if(typeof t=="undefined"||!("prototype"in n))return n;var r=n.__bindData__;if(typeof r=="undefined"&&(De.funcNames&&(r=!n.name),r=r||!De.funcDecomp,!r)){var u=ge.call(n);
De.funcNames||(r=!O.test(u)),r||(r=E.test(u),$e(n,r))}if(false===r||true!==r&&1&r[1])return n;switch(e){case 1:return function(e){return n.call(t,e)};case 2:return function(e,r){return n.call(t,e,r)};case 3:return function(e,r,u){return n.call(t,e,r,u)};case 4:return function(e,r,u,o){return n.call(t,e,r,u,o)}}return Mt(n,t)}function et(n){function t(){var n=f?i:this;if(u){var h=p(u);be.apply(h,arguments)}return(o||c)&&(h||(h=p(arguments)),o&&be.apply(h,o),c&&h.length<a)?(r|=16,et([e,s?r:-4&r,h,null,i,a])):(h||(h=arguments),l&&(e=n[v]),this instanceof t?(n=nt(e.prototype),h=e.apply(n,h),wt(h)?h:n):e.apply(n,h))
}var e=n[0],r=n[1],u=n[2],o=n[3],i=n[4],a=n[5],f=1&r,l=2&r,c=4&r,s=8&r,v=e;return $e(t,n),t}function rt(e,r){var u=-1,i=st(),a=e?e.length:0,f=a>=b&&i===n,l=[];if(f){var p=o(r);p?(i=t,r=p):f=false}for(;++u<a;)p=e[u],0>i(r,p)&&l.push(p);return f&&c(r),l}function ut(n,t,e,r){r=(r||0)-1;for(var u=n?n.length:0,o=[];++r<u;){var i=n[r];if(i&&typeof i=="object"&&typeof i.length=="number"&&(Te(i)||yt(i))){t||(i=ut(i,t,e));var a=-1,f=i.length,l=o.length;for(o.length+=f;++a<f;)o[l++]=i[a]}else e||o.push(i)}return o
}function ot(n,t,e,r,u,o){if(e){var i=e(n,t);if(typeof i!="undefined")return!!i}if(n===t)return 0!==n||1/n==1/t;if(n===n&&!(n&&V[typeof n]||t&&V[typeof t]))return false;if(null==n||null==t)return n===t;var f=ce.call(n),c=ce.call(t);if(f==D&&(f=q),c==D&&(c=q),f!=c)return false;switch(f){case T:case F:return+n==+t;case W:return n!=+n?t!=+t:0==n?1/n==1/t:n==+t;case z:case P:return n==oe(t)}if(c=f==$,!c){var p=me.call(n,"__wrapped__"),s=me.call(t,"__wrapped__");if(p||s)return ot(p?n.__wrapped__:n,s?t.__wrapped__:t,e,r,u,o);
if(f!=q)return false;if(f=n.constructor,p=t.constructor,f!=p&&!(dt(f)&&f instanceof f&&dt(p)&&p instanceof p)&&"constructor"in n&&"constructor"in t)return false}for(f=!u,u||(u=a()),o||(o=a()),p=u.length;p--;)if(u[p]==n)return o[p]==t;var v=0,i=true;if(u.push(n),o.push(t),c){if(p=n.length,v=t.length,(i=v==p)||r)for(;v--;)if(c=p,s=t[v],r)for(;c--&&!(i=ot(n[c],s,e,r,u,o)););else if(!(i=ot(n[v],s,e,r,u,o)))break}else g(t,function(t,a,f){return me.call(f,a)?(v++,i=me.call(n,a)&&ot(n[a],t,e,r,u,o)):void 0}),i&&!r&&g(n,function(n,t,e){return me.call(e,t)?i=-1<--v:void 0
});return u.pop(),o.pop(),f&&(l(u),l(o)),i}function it(n,t,e,r,u){(Te(t)?St:h)(t,function(t,o){var i,a,f=t,l=n[o];if(t&&((a=Te(t))||Pe(t))){for(f=r.length;f--;)if(i=r[f]==t){l=u[f];break}if(!i){var c;e&&(f=e(l,t),c=typeof f!="undefined")&&(l=f),c||(l=a?Te(l)?l:[]:Pe(l)?l:{}),r.push(t),u.push(l),c||it(l,t,e,r,u)}}else e&&(f=e(l,t),typeof f=="undefined"&&(f=t)),typeof f!="undefined"&&(l=f);n[o]=l})}function at(n,t){return n+he(Re()*(t-n+1))}function ft(e,r,u){var i=-1,f=st(),p=e?e.length:0,s=[],v=!r&&p>=b&&f===n,h=u||v?a():s;
for(v&&(h=o(h),f=t);++i<p;){var g=e[i],y=u?u(g,i,e):g;(r?!i||h[h.length-1]!==y:0>f(h,y))&&((u||v)&&h.push(y),s.push(g))}return v?(l(h.k),c(h)):u&&l(h),s}function lt(n){return function(t,e,r){var u={};e=J.createCallback(e,r,3),r=-1;var o=t?t.length:0;if(typeof o=="number")for(;++r<o;){var i=t[r];n(u,i,e(i,r,t),t)}else h(t,function(t,r,o){n(u,t,e(t,r,o),o)});return u}}function ct(n,t,e,r,u,o){var i=1&t,a=4&t,f=16&t,l=32&t;if(!(2&t||dt(n)))throw new ie;f&&!e.length&&(t&=-17,f=e=false),l&&!r.length&&(t&=-33,l=r=false);
var c=n&&n.__bindData__;return c&&true!==c?(c=p(c),c[2]&&(c[2]=p(c[2])),c[3]&&(c[3]=p(c[3])),!i||1&c[1]||(c[4]=u),!i&&1&c[1]&&(t|=8),!a||4&c[1]||(c[5]=o),f&&be.apply(c[2]||(c[2]=[]),e),l&&we.apply(c[3]||(c[3]=[]),r),c[1]|=t,ct.apply(null,c)):(1==t||17===t?X:et)([n,t,e,r,u,o])}function pt(n){return Be[n]}function st(){var t=(t=J.indexOf)===Wt?n:t;return t}function vt(n){return typeof n=="function"&&pe.test(n)}function ht(n){var t,e;return n&&ce.call(n)==q&&(t=n.constructor,!dt(t)||t instanceof t)?(g(n,function(n,t){e=t
}),typeof e=="undefined"||me.call(n,e)):false}function gt(n){return We[n]}function yt(n){return n&&typeof n=="object"&&typeof n.length=="number"&&ce.call(n)==D||false}function mt(n,t,e){var r=Fe(n),u=r.length;for(t=tt(t,e,3);u--&&(e=r[u],false!==t(n[e],e,n)););return n}function bt(n){var t=[];return g(n,function(n,e){dt(n)&&t.push(e)}),t.sort()}function _t(n){for(var t=-1,e=Fe(n),r=e.length,u={};++t<r;){var o=e[t];u[n[o]]=o}return u}function dt(n){return typeof n=="function"}function wt(n){return!(!n||!V[typeof n])
}function jt(n){return typeof n=="number"||n&&typeof n=="object"&&ce.call(n)==W||false}function kt(n){return typeof n=="string"||n&&typeof n=="object"&&ce.call(n)==P||false}function xt(n){for(var t=-1,e=Fe(n),r=e.length,u=Xt(r);++t<r;)u[t]=n[e[t]];return u}function Ct(n,t,e){var r=-1,u=st(),o=n?n.length:0,i=false;return e=(0>e?Ie(0,o+e):e)||0,Te(n)?i=-1<u(n,t,e):typeof o=="number"?i=-1<(kt(n)?n.indexOf(t,e):u(n,t,e)):h(n,function(n){return++r<e?void 0:!(i=n===t)}),i}function Ot(n,t,e){var r=true;t=J.createCallback(t,e,3),e=-1;
var u=n?n.length:0;if(typeof u=="number")for(;++e<u&&(r=!!t(n[e],e,n)););else h(n,function(n,e,u){return r=!!t(n,e,u)});return r}function Nt(n,t,e){var r=[];t=J.createCallback(t,e,3),e=-1;var u=n?n.length:0;if(typeof u=="number")for(;++e<u;){var o=n[e];t(o,e,n)&&r.push(o)}else h(n,function(n,e,u){t(n,e,u)&&r.push(n)});return r}function It(n,t,e){t=J.createCallback(t,e,3),e=-1;var r=n?n.length:0;if(typeof r!="number"){var u;return h(n,function(n,e,r){return t(n,e,r)?(u=n,false):void 0}),u}for(;++e<r;){var o=n[e];
if(t(o,e,n))return o}}function St(n,t,e){var r=-1,u=n?n.length:0;if(t=t&&typeof e=="undefined"?t:tt(t,e,3),typeof u=="number")for(;++r<u&&false!==t(n[r],r,n););else h(n,t);return n}function Et(n,t,e){var r=n?n.length:0;if(t=t&&typeof e=="undefined"?t:tt(t,e,3),typeof r=="number")for(;r--&&false!==t(n[r],r,n););else{var u=Fe(n),r=u.length;h(n,function(n,e,o){return e=u?u[--r]:--r,t(o[e],e,o)})}return n}function Rt(n,t,e){var r=-1,u=n?n.length:0;if(t=J.createCallback(t,e,3),typeof u=="number")for(var o=Xt(u);++r<u;)o[r]=t(n[r],r,n);
else o=[],h(n,function(n,e,u){o[++r]=t(n,e,u)});return o}function At(n,t,e){var u=-1/0,o=u;if(typeof t!="function"&&e&&e[t]===n&&(t=null),null==t&&Te(n)){e=-1;for(var i=n.length;++e<i;){var a=n[e];a>o&&(o=a)}}else t=null==t&&kt(n)?r:J.createCallback(t,e,3),St(n,function(n,e,r){e=t(n,e,r),e>u&&(u=e,o=n)});return o}function Dt(n,t,e,r){if(!n)return e;var u=3>arguments.length;t=J.createCallback(t,r,4);var o=-1,i=n.length;if(typeof i=="number")for(u&&(e=n[++o]);++o<i;)e=t(e,n[o],o,n);else h(n,function(n,r,o){e=u?(u=false,n):t(e,n,r,o)
});return e}function $t(n,t,e,r){var u=3>arguments.length;return t=J.createCallback(t,r,4),Et(n,function(n,r,o){e=u?(u=false,n):t(e,n,r,o)}),e}function Tt(n){var t=-1,e=n?n.length:0,r=Xt(typeof e=="number"?e:0);return St(n,function(n){var e=at(0,++t);r[t]=r[e],r[e]=n}),r}function Ft(n,t,e){var r;t=J.createCallback(t,e,3),e=-1;var u=n?n.length:0;if(typeof u=="number")for(;++e<u&&!(r=t(n[e],e,n)););else h(n,function(n,e,u){return!(r=t(n,e,u))});return!!r}function Bt(n,t,e){var r=0,u=n?n.length:0;if(typeof t!="number"&&null!=t){var o=-1;
for(t=J.createCallback(t,e,3);++o<u&&t(n[o],o,n);)r++}else if(r=t,null==r||e)return n?n[0]:v;return p(n,0,Se(Ie(0,r),u))}function Wt(t,e,r){if(typeof r=="number"){var u=t?t.length:0;r=0>r?Ie(0,u+r):r||0}else if(r)return r=zt(t,e),t[r]===e?r:-1;return n(t,e,r)}function qt(n,t,e){if(typeof t!="number"&&null!=t){var r=0,u=-1,o=n?n.length:0;for(t=J.createCallback(t,e,3);++u<o&&t(n[u],u,n);)r++}else r=null==t||e?1:Ie(0,t);return p(n,r)}function zt(n,t,e,r){var u=0,o=n?n.length:u;for(e=e?J.createCallback(e,r,1):Ut,t=e(t);u<o;)r=u+o>>>1,e(n[r])<t?u=r+1:o=r;
return u}function Pt(n,t,e,r){return typeof t!="boolean"&&null!=t&&(r=e,e=typeof t!="function"&&r&&r[t]===n?null:t,t=false),null!=e&&(e=J.createCallback(e,r,3)),ft(n,t,e)}function Kt(){for(var n=1<arguments.length?arguments:arguments[0],t=-1,e=n?At(Ve(n,"length")):0,r=Xt(0>e?0:e);++t<e;)r[t]=Ve(n,t);return r}function Lt(n,t){var e=-1,r=n?n.length:0,u={};for(t||!r||Te(n[0])||(t=[]);++e<r;){var o=n[e];t?u[o]=t[e]:o&&(u[o[0]]=o[1])}return u}function Mt(n,t){return 2<arguments.length?ct(n,17,p(arguments,2),null,t):ct(n,1,null,null,t)
}function Vt(n,t,e){function r(){c&&ve(c),i=c=p=v,(g||h!==t)&&(s=Ue(),a=n.apply(l,o),c||i||(o=l=null))}function u(){var e=t-(Ue()-f);0<e?c=_e(u,e):(i&&ve(i),e=p,i=c=p=v,e&&(s=Ue(),a=n.apply(l,o),c||i||(o=l=null)))}var o,i,a,f,l,c,p,s=0,h=false,g=true;if(!dt(n))throw new ie;if(t=Ie(0,t)||0,true===e)var y=true,g=false;else wt(e)&&(y=e.leading,h="maxWait"in e&&(Ie(t,e.maxWait)||0),g="trailing"in e?e.trailing:g);return function(){if(o=arguments,f=Ue(),l=this,p=g&&(c||!y),false===h)var e=y&&!c;else{i||y||(s=f);var v=h-(f-s),m=0>=v;
m?(i&&(i=ve(i)),s=f,a=n.apply(l,o)):i||(i=_e(r,v))}return m&&c?c=ve(c):c||t===h||(c=_e(u,t)),e&&(m=true,a=n.apply(l,o)),!m||c||i||(o=l=null),a}}function Ut(n){return n}function Gt(n,t,e){var r=true,u=t&&bt(t);t&&(e||u.length)||(null==e&&(e=t),o=Q,t=n,n=J,u=bt(t)),false===e?r=false:wt(e)&&"chain"in e&&(r=e.chain);var o=n,i=dt(o);St(u,function(e){var u=n[e]=t[e];i&&(o.prototype[e]=function(){var t=this.__chain__,e=this.__wrapped__,i=[e];if(be.apply(i,arguments),i=u.apply(n,i),r||t){if(e===i&&wt(i))return this;
i=new o(i),i.__chain__=t}return i})})}function Ht(){}function Jt(n){return function(t){return t[n]}}function Qt(){return this.__wrapped__}e=e?Y.defaults(G.Object(),e,Y.pick(G,A)):G;var Xt=e.Array,Yt=e.Boolean,Zt=e.Date,ne=e.Function,te=e.Math,ee=e.Number,re=e.Object,ue=e.RegExp,oe=e.String,ie=e.TypeError,ae=[],fe=re.prototype,le=e._,ce=fe.toString,pe=ue("^"+oe(ce).replace(/[.*+?^${}()|[\]\\]/g,"\\$&").replace(/toString| for [^\]]+/g,".*?")+"$"),se=te.ceil,ve=e.clearTimeout,he=te.floor,ge=ne.prototype.toString,ye=vt(ye=re.getPrototypeOf)&&ye,me=fe.hasOwnProperty,be=ae.push,_e=e.setTimeout,de=ae.splice,we=ae.unshift,je=function(){try{var n={},t=vt(t=re.defineProperty)&&t,e=t(n,n,n)&&t
}catch(r){}return e}(),ke=vt(ke=re.create)&&ke,xe=vt(xe=Xt.isArray)&&xe,Ce=e.isFinite,Oe=e.isNaN,Ne=vt(Ne=re.keys)&&Ne,Ie=te.max,Se=te.min,Ee=e.parseInt,Re=te.random,Ae={};Ae[$]=Xt,Ae[T]=Yt,Ae[F]=Zt,Ae[B]=ne,Ae[q]=re,Ae[W]=ee,Ae[z]=ue,Ae[P]=oe,Q.prototype=J.prototype;var De=J.support={};De.funcDecomp=!vt(e.a)&&E.test(s),De.funcNames=typeof ne.name=="string",J.templateSettings={escape:/<%-([\s\S]+?)%>/g,evaluate:/<%([\s\S]+?)%>/g,interpolate:N,variable:"",imports:{_:J}},ke||(nt=function(){function n(){}return function(t){if(wt(t)){n.prototype=t;
var r=new n;n.prototype=null}return r||e.Object()}}());var $e=je?function(n,t){M.value=t,je(n,"__bindData__",M)}:Ht,Te=xe||function(n){return n&&typeof n=="object"&&typeof n.length=="number"&&ce.call(n)==$||false},Fe=Ne?function(n){return wt(n)?Ne(n):[]}:H,Be={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},We=_t(Be),qe=ue("("+Fe(We).join("|")+")","g"),ze=ue("["+Fe(Be).join("")+"]","g"),Pe=ye?function(n){if(!n||ce.call(n)!=q)return false;var t=n.valueOf,e=vt(t)&&(e=ye(t))&&ye(e);return e?n==e||ye(n)==e:ht(n)
}:ht,Ke=lt(function(n,t,e){me.call(n,e)?n[e]++:n[e]=1}),Le=lt(function(n,t,e){(me.call(n,e)?n[e]:n[e]=[]).push(t)}),Me=lt(function(n,t,e){n[e]=t}),Ve=Rt,Ue=vt(Ue=Zt.now)&&Ue||function(){return(new Zt).getTime()},Ge=8==Ee(d+"08")?Ee:function(n,t){return Ee(kt(n)?n.replace(I,""):n,t||0)};return J.after=function(n,t){if(!dt(t))throw new ie;return function(){return 1>--n?t.apply(this,arguments):void 0}},J.assign=U,J.at=function(n){for(var t=arguments,e=-1,r=ut(t,true,false,1),t=t[2]&&t[2][t[1]]===n?1:r.length,u=Xt(t);++e<t;)u[e]=n[r[e]];
return u},J.bind=Mt,J.bindAll=function(n){for(var t=1<arguments.length?ut(arguments,true,false,1):bt(n),e=-1,r=t.length;++e<r;){var u=t[e];n[u]=ct(n[u],1,null,null,n)}return n},J.bindKey=function(n,t){return 2<arguments.length?ct(t,19,p(arguments,2),null,n):ct(t,3,null,null,n)},J.chain=function(n){return n=new Q(n),n.__chain__=true,n},J.compact=function(n){for(var t=-1,e=n?n.length:0,r=[];++t<e;){var u=n[t];u&&r.push(u)}return r},J.compose=function(){for(var n=arguments,t=n.length;t--;)if(!dt(n[t]))throw new ie;
return function(){for(var t=arguments,e=n.length;e--;)t=[n[e].apply(this,t)];return t[0]}},J.constant=function(n){return function(){return n}},J.countBy=Ke,J.create=function(n,t){var e=nt(n);return t?U(e,t):e},J.createCallback=function(n,t,e){var r=typeof n;if(null==n||"function"==r)return tt(n,t,e);if("object"!=r)return Jt(n);var u=Fe(n),o=u[0],i=n[o];return 1!=u.length||i!==i||wt(i)?function(t){for(var e=u.length,r=false;e--&&(r=ot(t[u[e]],n[u[e]],null,true)););return r}:function(n){return n=n[o],i===n&&(0!==i||1/i==1/n)
}},J.curry=function(n,t){return t=typeof t=="number"?t:+t||n.length,ct(n,4,null,null,null,t)},J.debounce=Vt,J.defaults=_,J.defer=function(n){if(!dt(n))throw new ie;var t=p(arguments,1);return _e(function(){n.apply(v,t)},1)},J.delay=function(n,t){if(!dt(n))throw new ie;var e=p(arguments,2);return _e(function(){n.apply(v,e)},t)},J.difference=function(n){return rt(n,ut(arguments,true,true,1))},J.filter=Nt,J.flatten=function(n,t,e,r){return typeof t!="boolean"&&null!=t&&(r=e,e=typeof t!="function"&&r&&r[t]===n?null:t,t=false),null!=e&&(n=Rt(n,e,r)),ut(n,t)
},J.forEach=St,J.forEachRight=Et,J.forIn=g,J.forInRight=function(n,t,e){var r=[];g(n,function(n,t){r.push(t,n)});var u=r.length;for(t=tt(t,e,3);u--&&false!==t(r[u--],r[u],n););return n},J.forOwn=h,J.forOwnRight=mt,J.functions=bt,J.groupBy=Le,J.indexBy=Me,J.initial=function(n,t,e){var r=0,u=n?n.length:0;if(typeof t!="number"&&null!=t){var o=u;for(t=J.createCallback(t,e,3);o--&&t(n[o],o,n);)r++}else r=null==t||e?1:t||r;return p(n,0,Se(Ie(0,u-r),u))},J.intersection=function(){for(var e=[],r=-1,u=arguments.length,i=a(),f=st(),p=f===n,s=a();++r<u;){var v=arguments[r];
(Te(v)||yt(v))&&(e.push(v),i.push(p&&v.length>=b&&o(r?e[r]:s)))}var p=e[0],h=-1,g=p?p.length:0,y=[];n:for(;++h<g;){var m=i[0],v=p[h];if(0>(m?t(m,v):f(s,v))){for(r=u,(m||s).push(v);--r;)if(m=i[r],0>(m?t(m,v):f(e[r],v)))continue n;y.push(v)}}for(;u--;)(m=i[u])&&c(m);return l(i),l(s),y},J.invert=_t,J.invoke=function(n,t){var e=p(arguments,2),r=-1,u=typeof t=="function",o=n?n.length:0,i=Xt(typeof o=="number"?o:0);return St(n,function(n){i[++r]=(u?t:n[t]).apply(n,e)}),i},J.keys=Fe,J.map=Rt,J.mapValues=function(n,t,e){var r={};
return t=J.createCallback(t,e,3),h(n,function(n,e,u){r[e]=t(n,e,u)}),r},J.max=At,J.memoize=function(n,t){function e(){var r=e.cache,u=t?t.apply(this,arguments):m+arguments[0];return me.call(r,u)?r[u]:r[u]=n.apply(this,arguments)}if(!dt(n))throw new ie;return e.cache={},e},J.merge=function(n){var t=arguments,e=2;if(!wt(n))return n;if("number"!=typeof t[2]&&(e=t.length),3<e&&"function"==typeof t[e-2])var r=tt(t[--e-1],t[e--],2);else 2<e&&"function"==typeof t[e-1]&&(r=t[--e]);for(var t=p(arguments,1,e),u=-1,o=a(),i=a();++u<e;)it(n,t[u],r,o,i);
return l(o),l(i),n},J.min=function(n,t,e){var u=1/0,o=u;if(typeof t!="function"&&e&&e[t]===n&&(t=null),null==t&&Te(n)){e=-1;for(var i=n.length;++e<i;){var a=n[e];a<o&&(o=a)}}else t=null==t&&kt(n)?r:J.createCallback(t,e,3),St(n,function(n,e,r){e=t(n,e,r),e<u&&(u=e,o=n)});return o},J.omit=function(n,t,e){var r={};if(typeof t!="function"){var u=[];g(n,function(n,t){u.push(t)});for(var u=rt(u,ut(arguments,true,false,1)),o=-1,i=u.length;++o<i;){var a=u[o];r[a]=n[a]}}else t=J.createCallback(t,e,3),g(n,function(n,e,u){t(n,e,u)||(r[e]=n)
});return r},J.once=function(n){var t,e;if(!dt(n))throw new ie;return function(){return t?e:(t=true,e=n.apply(this,arguments),n=null,e)}},J.pairs=function(n){for(var t=-1,e=Fe(n),r=e.length,u=Xt(r);++t<r;){var o=e[t];u[t]=[o,n[o]]}return u},J.partial=function(n){return ct(n,16,p(arguments,1))},J.partialRight=function(n){return ct(n,32,null,p(arguments,1))},J.pick=function(n,t,e){var r={};if(typeof t!="function")for(var u=-1,o=ut(arguments,true,false,1),i=wt(n)?o.length:0;++u<i;){var a=o[u];a in n&&(r[a]=n[a])
}else t=J.createCallback(t,e,3),g(n,function(n,e,u){t(n,e,u)&&(r[e]=n)});return r},J.pluck=Ve,J.property=Jt,J.pull=function(n){for(var t=arguments,e=0,r=t.length,u=n?n.length:0;++e<r;)for(var o=-1,i=t[e];++o<u;)n[o]===i&&(de.call(n,o--,1),u--);return n},J.range=function(n,t,e){n=+n||0,e=typeof e=="number"?e:+e||1,null==t&&(t=n,n=0);var r=-1;t=Ie(0,se((t-n)/(e||1)));for(var u=Xt(t);++r<t;)u[r]=n,n+=e;return u},J.reject=function(n,t,e){return t=J.createCallback(t,e,3),Nt(n,function(n,e,r){return!t(n,e,r)
})},J.remove=function(n,t,e){var r=-1,u=n?n.length:0,o=[];for(t=J.createCallback(t,e,3);++r<u;)e=n[r],t(e,r,n)&&(o.push(e),de.call(n,r--,1),u--);return o},J.rest=qt,J.shuffle=Tt,J.sortBy=function(n,t,e){var r=-1,o=Te(t),i=n?n.length:0,p=Xt(typeof i=="number"?i:0);for(o||(t=J.createCallback(t,e,3)),St(n,function(n,e,u){var i=p[++r]=f();o?i.m=Rt(t,function(t){return n[t]}):(i.m=a())[0]=t(n,e,u),i.n=r,i.o=n}),i=p.length,p.sort(u);i--;)n=p[i],p[i]=n.o,o||l(n.m),c(n);return p},J.tap=function(n,t){return t(n),n
},J.throttle=function(n,t,e){var r=true,u=true;if(!dt(n))throw new ie;return false===e?r=false:wt(e)&&(r="leading"in e?e.leading:r,u="trailing"in e?e.trailing:u),L.leading=r,L.maxWait=t,L.trailing=u,Vt(n,t,L)},J.times=function(n,t,e){n=-1<(n=+n)?n:0;var r=-1,u=Xt(n);for(t=tt(t,e,1);++r<n;)u[r]=t(r);return u},J.toArray=function(n){return n&&typeof n.length=="number"?p(n):xt(n)},J.transform=function(n,t,e,r){var u=Te(n);if(null==e)if(u)e=[];else{var o=n&&n.constructor;e=nt(o&&o.prototype)}return t&&(t=J.createCallback(t,r,4),(u?St:h)(n,function(n,r,u){return t(e,n,r,u)
})),e},J.union=function(){return ft(ut(arguments,true,true))},J.uniq=Pt,J.values=xt,J.where=Nt,J.without=function(n){return rt(n,p(arguments,1))},J.wrap=function(n,t){return ct(t,16,[n])},J.xor=function(){for(var n=-1,t=arguments.length;++n<t;){var e=arguments[n];if(Te(e)||yt(e))var r=r?ft(rt(r,e).concat(rt(e,r))):e}return r||[]},J.zip=Kt,J.zipObject=Lt,J.collect=Rt,J.drop=qt,J.each=St,J.eachRight=Et,J.extend=U,J.methods=bt,J.object=Lt,J.select=Nt,J.tail=qt,J.unique=Pt,J.unzip=Kt,Gt(J),J.clone=function(n,t,e,r){return typeof t!="boolean"&&null!=t&&(r=e,e=t,t=false),Z(n,t,typeof e=="function"&&tt(e,r,1))
},J.cloneDeep=function(n,t,e){return Z(n,true,typeof t=="function"&&tt(t,e,1))},J.contains=Ct,J.escape=function(n){return null==n?"":oe(n).replace(ze,pt)},J.every=Ot,J.find=It,J.findIndex=function(n,t,e){var r=-1,u=n?n.length:0;for(t=J.createCallback(t,e,3);++r<u;)if(t(n[r],r,n))return r;return-1},J.findKey=function(n,t,e){var r;return t=J.createCallback(t,e,3),h(n,function(n,e,u){return t(n,e,u)?(r=e,false):void 0}),r},J.findLast=function(n,t,e){var r;return t=J.createCallback(t,e,3),Et(n,function(n,e,u){return t(n,e,u)?(r=n,false):void 0
}),r},J.findLastIndex=function(n,t,e){var r=n?n.length:0;for(t=J.createCallback(t,e,3);r--;)if(t(n[r],r,n))return r;return-1},J.findLastKey=function(n,t,e){var r;return t=J.createCallback(t,e,3),mt(n,function(n,e,u){return t(n,e,u)?(r=e,false):void 0}),r},J.has=function(n,t){return n?me.call(n,t):false},J.identity=Ut,J.indexOf=Wt,J.isArguments=yt,J.isArray=Te,J.isBoolean=function(n){return true===n||false===n||n&&typeof n=="object"&&ce.call(n)==T||false},J.isDate=function(n){return n&&typeof n=="object"&&ce.call(n)==F||false
},J.isElement=function(n){return n&&1===n.nodeType||false},J.isEmpty=function(n){var t=true;if(!n)return t;var e=ce.call(n),r=n.length;return e==$||e==P||e==D||e==q&&typeof r=="number"&&dt(n.splice)?!r:(h(n,function(){return t=false}),t)},J.isEqual=function(n,t,e,r){return ot(n,t,typeof e=="function"&&tt(e,r,2))},J.isFinite=function(n){return Ce(n)&&!Oe(parseFloat(n))},J.isFunction=dt,J.isNaN=function(n){return jt(n)&&n!=+n},J.isNull=function(n){return null===n},J.isNumber=jt,J.isObject=wt,J.isPlainObject=Pe,J.isRegExp=function(n){return n&&typeof n=="object"&&ce.call(n)==z||false
},J.isString=kt,J.isUndefined=function(n){return typeof n=="undefined"},J.lastIndexOf=function(n,t,e){var r=n?n.length:0;for(typeof e=="number"&&(r=(0>e?Ie(0,r+e):Se(e,r-1))+1);r--;)if(n[r]===t)return r;return-1},J.mixin=Gt,J.noConflict=function(){return e._=le,this},J.noop=Ht,J.now=Ue,J.parseInt=Ge,J.random=function(n,t,e){var r=null==n,u=null==t;return null==e&&(typeof n=="boolean"&&u?(e=n,n=1):u||typeof t!="boolean"||(e=t,u=true)),r&&u&&(t=1),n=+n||0,u?(t=n,n=0):t=+t||0,e||n%1||t%1?(e=Re(),Se(n+e*(t-n+parseFloat("1e-"+((e+"").length-1))),t)):at(n,t)
},J.reduce=Dt,J.reduceRight=$t,J.result=function(n,t){if(n){var e=n[t];return dt(e)?n[t]():e}},J.runInContext=s,J.size=function(n){var t=n?n.length:0;return typeof t=="number"?t:Fe(n).length},J.some=Ft,J.sortedIndex=zt,J.template=function(n,t,e){var r=J.templateSettings;n=oe(n||""),e=_({},e,r);var u,o=_({},e.imports,r.imports),r=Fe(o),o=xt(o),a=0,f=e.interpolate||S,l="__p+='",f=ue((e.escape||S).source+"|"+f.source+"|"+(f===N?x:S).source+"|"+(e.evaluate||S).source+"|$","g");n.replace(f,function(t,e,r,o,f,c){return r||(r=o),l+=n.slice(a,c).replace(R,i),e&&(l+="'+__e("+e+")+'"),f&&(u=true,l+="';"+f+";\n__p+='"),r&&(l+="'+((__t=("+r+"))==null?'':__t)+'"),a=c+t.length,t
}),l+="';",f=e=e.variable,f||(e="obj",l="with("+e+"){"+l+"}"),l=(u?l.replace(w,""):l).replace(j,"$1").replace(k,"$1;"),l="function("+e+"){"+(f?"":e+"||("+e+"={});")+"var __t,__p='',__e=_.escape"+(u?",__j=Array.prototype.join;function print(){__p+=__j.call(arguments,'')}":";")+l+"return __p}";try{var c=ne(r,"return "+l).apply(v,o)}catch(p){throw p.source=l,p}return t?c(t):(c.source=l,c)},J.unescape=function(n){return null==n?"":oe(n).replace(qe,gt)},J.uniqueId=function(n){var t=++y;return oe(null==n?"":n)+t
},J.all=Ot,J.any=Ft,J.detect=It,J.findWhere=It,J.foldl=Dt,J.foldr=$t,J.include=Ct,J.inject=Dt,Gt(function(){var n={};return h(J,function(t,e){J.prototype[e]||(n[e]=t)}),n}(),false),J.first=Bt,J.last=function(n,t,e){var r=0,u=n?n.length:0;if(typeof t!="number"&&null!=t){var o=u;for(t=J.createCallback(t,e,3);o--&&t(n[o],o,n);)r++}else if(r=t,null==r||e)return n?n[u-1]:v;return p(n,Ie(0,u-r))},J.sample=function(n,t,e){return n&&typeof n.length!="number"&&(n=xt(n)),null==t||e?n?n[at(0,n.length-1)]:v:(n=Tt(n),n.length=Se(Ie(0,t),n.length),n)
},J.take=Bt,J.head=Bt,h(J,function(n,t){var e="sample"!==t;J.prototype[t]||(J.prototype[t]=function(t,r){var u=this.__chain__,o=n(this.__wrapped__,t,r);return u||null!=t&&(!r||e&&typeof t=="function")?new Q(o,u):o})}),J.VERSION="2.4.1",J.prototype.chain=function(){return this.__chain__=true,this},J.prototype.toString=function(){return oe(this.__wrapped__)},J.prototype.value=Qt,J.prototype.valueOf=Qt,St(["join","pop","shift"],function(n){var t=ae[n];J.prototype[n]=function(){var n=this.__chain__,e=t.apply(this.__wrapped__,arguments);
return n?new Q(e,n):e}}),St(["push","reverse","sort","unshift"],function(n){var t=ae[n];J.prototype[n]=function(){return t.apply(this.__wrapped__,arguments),this}}),St(["concat","slice","splice"],function(n){var t=ae[n];J.prototype[n]=function(){return new Q(t.apply(this.__wrapped__,arguments),this.__chain__)}}),J}var v,h=[],g=[],y=0,m=+new Date+"",b=75,_=40,d=" \t\x0B\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000",w=/\b__p\+='';/g,j=/\b(__p\+=)''\+/g,k=/(__e\(.*?\)|\b__t\))\+'';/g,x=/\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,C=/\w*$/,O=/^\s*function[ \n\r\t]+\w/,N=/<%=([\s\S]+?)%>/g,I=RegExp("^["+d+"]*0+(?=.$)"),S=/($^)/,E=/\bthis\b/,R=/['\n\r\t\u2028\u2029\\]/g,A="Array Boolean Date Function Math Number Object RegExp String _ attachEvent clearTimeout isFinite isNaN parseInt setTimeout".split(" "),D="[object Arguments]",$="[object Array]",T="[object Boolean]",F="[object Date]",B="[object Function]",W="[object Number]",q="[object Object]",z="[object RegExp]",P="[object String]",K={};
K[B]=false,K[D]=K[$]=K[T]=K[F]=K[W]=K[q]=K[z]=K[P]=true;var L={leading:false,maxWait:0,trailing:false},M={configurable:false,enumerable:false,value:null,writable:false},V={"boolean":false,"function":true,object:true,number:false,string:false,undefined:false},U={"\\":"\\","'":"'","\n":"n","\r":"r","\t":"t","\u2028":"u2028","\u2029":"u2029"},G=V[typeof window]&&window||this,H=V[typeof exports]&&exports&&!exports.nodeType&&exports,J=V[typeof module]&&module&&!module.nodeType&&module,Q=J&&J.exports===H&&H,X=V[typeof global]&&global;!X||X.global!==X&&X.window!==X||(G=X);
var Y=s();typeof define=="function"&&typeof define.amd=="object"&&define.amd?(G._=Y, define(function(){return Y})):H&&J?Q?(J.exports=Y)._=Y:H._=Y:G._=Y}).call(this);
/*
 AngularJS v1.3.0-build.2871+sha.63e8952
 (c) 2010-2014 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(N,U,r){'use strict';function L(b){return function(){var a=arguments[0],c,a="["+(b?b+":":"")+a+"] http://errors.angularjs.org/1.3.0-build.2871+sha.63e8952/"+(b?b+"/":"")+a;for(c=1;c<arguments.length;c++)a=a+(1==c?"?":"&")+"p"+(c-1)+"="+encodeURIComponent("function"==typeof arguments[c]?arguments[c].toString().replace(/ \{[\s\S]*$/,""):"undefined"==typeof arguments[c]?"undefined":"string"!=typeof arguments[c]?JSON.stringify(arguments[c]):arguments[c]);return Error(a)}}function db(b){if(null==
b||Oa(b))return!1;var a=b.length;return 1===b.nodeType&&a?!0:v(b)||M(b)||0===a||"number"===typeof a&&0<a&&a-1 in b}function q(b,a,c){var d,e;if(b)if(P(b))for(d in b)"prototype"==d||("length"==d||"name"==d||b.hasOwnProperty&&!b.hasOwnProperty(d))||a.call(c,b[d],d);else if(M(b)||db(b))for(d=0,e=b.length;d<e;d++)a.call(c,b[d],d);else if(b.forEach&&b.forEach!==q)b.forEach(a,c);else for(d in b)b.hasOwnProperty(d)&&a.call(c,b[d],d);return b}function Wb(b){var a=[],c;for(c in b)b.hasOwnProperty(c)&&a.push(c);
return a.sort()}function jd(b,a,c){for(var d=Wb(b),e=0;e<d.length;e++)a.call(c,b[d[e]],d[e]);return d}function Xb(b){return function(a,c){b(c,a)}}function kd(){return++eb}function Yb(b,a){a?b.$$hashKey=a:delete b.$$hashKey}function z(b){var a=b.$$hashKey;q(arguments,function(a){a!==b&&q(a,function(a,c){b[c]=a})});Yb(b,a);return b}function Y(b){return parseInt(b,10)}function Zb(b,a){return z(new (z(function(){},{prototype:b})),a)}function A(){}function Ea(b){return b}function da(b){return function(){return b}}
function y(b){return"undefined"===typeof b}function E(b){return"undefined"!==typeof b}function S(b){return null!=b&&"object"===typeof b}function v(b){return"string"===typeof b}function Fa(b){return"number"===typeof b}function ra(b){return"[object Date]"===za.call(b)}function P(b){return"function"===typeof b}function fb(b){return"[object RegExp]"===za.call(b)}function Oa(b){return b&&b.window===b}function ld(b){return!(!b||!(b.nodeName||b.prop&&b.attr&&b.find))}function md(b){var a={};b=b.split(",");
var c;for(c=0;c<b.length;c++)a[b[c]]=!0;return a}function nd(b,a,c){var d=[];q(b,function(b,f,g){d.push(a.call(c,b,f,g))});return d}function Pa(b,a){if(b.indexOf)return b.indexOf(a);for(var c=0;c<b.length;c++)if(a===b[c])return c;return-1}function Ga(b,a){var c=Pa(b,a);0<=c&&b.splice(c,1);return a}function Aa(b,a,c,d){if(Oa(b)||b&&b.$evalAsync&&b.$watch)throw Qa("cpws");if(a){if(b===a)throw Qa("cpi");c=c||[];d=d||[];if(S(b)){var e=Pa(c,b);if(-1!==e)return d[e];c.push(b);d.push(a)}if(M(b))for(var f=
a.length=0;f<b.length;f++)e=Aa(b[f],null,c,d),S(b[f])&&(c.push(b[f]),d.push(e)),a.push(e);else{var g=a.$$hashKey;q(a,function(b,c){delete a[c]});for(f in b)b.hasOwnProperty(f)&&(e=Aa(b[f],null,c,d),S(b[f])&&(c.push(b[f]),d.push(e)),a[f]=e);Yb(a,g)}}else if(a=b)M(b)?a=Aa(b,[],c,d):ra(b)?a=new Date(b.getTime()):fb(b)?a=RegExp(b.source):S(b)&&(e=Object.create(Object.getPrototypeOf(b)),a=Aa(b,e,c,d));return a}function ka(b,a){var c=0;if(M(b))for(a=a||[];c<b.length;c++)a[c]=b[c];else if(S(b)){a=a||{};
for(var d=Object.keys(b),e=d.length;c<e;c++){var f=d[c];if("$"!==f.charAt(0)||"$"!==f.charAt(1))a[f]=b[f]}}return a||b}function sa(b,a){if(b===a)return!0;if(null===b||null===a)return!1;if(b!==b&&a!==a)return!0;var c=typeof b,d;if(c==typeof a&&"object"==c)if(M(b)){if(!M(a))return!1;if((c=b.length)==a.length){for(d=0;d<c;d++)if(!sa(b[d],a[d]))return!1;return!0}}else{if(ra(b))return ra(a)&&b.getTime()==a.getTime();if(fb(b)&&fb(a))return b.toString()==a.toString();if(b&&b.$evalAsync&&b.$watch||a&&a.$evalAsync&&
a.$watch||Oa(b)||Oa(a)||M(a))return!1;c={};for(d in b)if("$"!==d.charAt(0)&&!P(b[d])){if(!sa(b[d],a[d]))return!1;c[d]=!0}for(d in a)if(!c.hasOwnProperty(d)&&"$"!==d.charAt(0)&&a[d]!==r&&!P(a[d]))return!1;return!0}return!1}function $b(){return U.securityPolicy&&U.securityPolicy.isActive||U.querySelector&&!(!U.querySelector("[ng-csp]")&&!U.querySelector("[data-ng-csp]"))}function Ab(b,a){var c=2<arguments.length?la.call(arguments,2):[];return!P(a)||a instanceof RegExp?a:c.length?function(){return arguments.length?
a.apply(b,c.concat(la.call(arguments,0))):a.apply(b,c)}:function(){return arguments.length?a.apply(b,arguments):a.call(b)}}function od(b,a){var c=a;"string"===typeof b&&"$"===b.charAt(0)&&"$"===b.charAt(1)?c=r:Oa(a)?c="$WINDOW":a&&U===a?c="$DOCUMENT":a&&(a.$evalAsync&&a.$watch)&&(c="$SCOPE");return c}function ta(b,a){return"undefined"===typeof b?r:JSON.stringify(b,od,a?"  ":null)}function ac(b){return v(b)?JSON.parse(b):b}function ha(b){b=C(b).clone();try{b.empty()}catch(a){}var c=C("<div>").append(b).html();
try{return 3===b[0].nodeType?G(c):c.match(/^(<[^>]+>)/)[1].replace(/^<([\w\-]+)/,function(a,b){return"<"+G(b)})}catch(d){return G(c)}}function bc(b){try{return decodeURIComponent(b)}catch(a){}}function cc(b){var a={},c,d;q((b||"").split("&"),function(b){b&&(c=b.split("="),d=bc(c[0]),E(d)&&(b=E(c[1])?bc(c[1]):!0,a[d]?M(a[d])?a[d].push(b):a[d]=[a[d],b]:a[d]=b))});return a}function Bb(b){var a=[];q(b,function(b,d){M(b)?q(b,function(b){a.push(Ba(d,!0)+(!0===b?"":"="+Ba(b,!0)))}):a.push(Ba(d,!0)+(!0===
b?"":"="+Ba(b,!0)))});return a.length?a.join("&"):""}function gb(b){return Ba(b,!0).replace(/%26/gi,"&").replace(/%3D/gi,"=").replace(/%2B/gi,"+")}function Ba(b,a){return encodeURIComponent(b).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,a?"%20":"+")}function pd(b,a){var c,d,e=dc.length;b=C(b);for(d=0;d<e;++d)if(c=dc[d]+a,v(c=b.attr(c)))return c;return null}function qd(b,a){function c(a){a&&d.push(a)}var d=[b],e,f,g={},h=["ng:app","ng-app","x-ng-app",
"data-ng-app"],n=/\sng[:\-]app(:\s*([\w\d_]+);?)?\s/;q(h,function(a){h[a]=!0;c(U.getElementById(a));a=a.replace(":","\\:");b.querySelectorAll&&(q(b.querySelectorAll("."+a),c),q(b.querySelectorAll("."+a+"\\:"),c),q(b.querySelectorAll("["+a+"]"),c))});q(d,function(a){if(!e){var b=n.exec(" "+a.className+" ");b?(e=a,f=(b[2]||"").replace(/\s+/g,",")):q(a.attributes,function(b){!e&&h[b.name]&&(e=a,f=b.value)})}});e&&(g.strictDi=null!==pd(e,"strict-di"),a(e,f?[f]:[],g))}function ec(b,a,c){S(c)||(c={});c=
z({strictDi:!1},c);var d=function(){b=C(b);if(b.injector()){var d=b[0]===U?"document":ha(b);throw Qa("btstrpd",d);}a=a||[];a.unshift(["$provide",function(a){a.value("$rootElement",b)}]);a.unshift("ng");d=Cb(a,c.strictDi);d.invoke(["$rootScope","$rootElement","$compile","$injector",function(a,b,c,d){a.$apply(function(){b.data("$injector",d);c(b)(a)})}]);return d},e=/^NG_DEFER_BOOTSTRAP!/;if(N&&!e.test(N.name))return d();N.name=N.name.replace(e,"");Ra.resumeBootstrap=function(b){q(b,function(b){a.push(b)});
d()}}function hb(b,a){a=a||"_";return b.replace(rd,function(b,d){return(d?a:"")+b.toLowerCase()})}function sd(){var b;(ua=N.jQuery)&&ua.fn.on?(C=ua,z(ua.fn,{scope:Ha.scope,isolateScope:Ha.isolateScope,controller:Ha.controller,injector:Ha.injector,inheritedData:Ha.inheritedData}),b=ua.cleanData,b=b.$$original||b,ua.cleanData=function(a){for(var c=0,d;null!=(d=a[c]);c++)ua(d).triggerHandler("$destroy");b(a)},ua.cleanData.$$original=b):C=Q;Ra.element=C}function Db(b,a,c){if(!b)throw Qa("areq",a||"?",
c||"required");return b}function Sa(b,a,c){c&&M(b)&&(b=b[b.length-1]);Db(P(b),a,"not a function, got "+(b&&"object"===typeof b?b.constructor.name||"Object":typeof b));return b}function Ca(b,a){if("hasOwnProperty"===b)throw Qa("badname",a);}function fc(b,a,c){if(!a)return b;a=a.split(".");for(var d,e=b,f=a.length,g=0;g<f;g++)d=a[g],b&&(b=(e=b)[d]);return!c&&P(b)?Ab(e,b):b}function Eb(b){var a=b[0];b=b[b.length-1];if(a===b)return C(a);var c=[a];do{a=a.nextSibling;if(!a)break;c.push(a)}while(a!==b);
return C(c)}function td(b){var a=L("$injector"),c=L("ng");b=b.angular||(b.angular={});b.$$minErr=b.$$minErr||L;return b.module||(b.module=function(){var b={};return function(e,f,g){if("hasOwnProperty"===e)throw c("badname","module");f&&b.hasOwnProperty(e)&&(b[e]=null);return b[e]||(b[e]=function(){function b(a,d,e,f){f||(f=c);return function(){f[e||"push"]([a,d,arguments]);return k}}if(!f)throw a("nomod",e);var c=[],d=[],m=[],p=b("$injector","invoke","push",d),k={_invokeQueue:c,_configBlocks:d,_runBlocks:m,
requires:f,name:e,provider:b("$provide","provider"),factory:b("$provide","factory"),service:b("$provide","service"),value:b("$provide","value"),constant:b("$provide","constant","unshift"),animation:b("$animateProvider","register"),filter:b("$filterProvider","register"),controller:b("$controllerProvider","register"),directive:b("$compileProvider","directive"),config:p,run:function(a){m.push(a);return this}};g&&p(g);return k}())}}())}function ud(b){z(b,{bootstrap:ec,copy:Aa,extend:z,equals:sa,element:C,
forEach:q,injector:Cb,noop:A,bind:Ab,toJson:ta,fromJson:ac,identity:Ea,isUndefined:y,isDefined:E,isString:v,isFunction:P,isObject:S,isNumber:Fa,isElement:ld,isArray:M,version:vd,isDate:ra,lowercase:G,uppercase:ib,callbacks:{counter:0},$$minErr:L,$$csp:$b});Ta=td(N);try{Ta("ngLocale")}catch(a){Ta("ngLocale",[]).provider("$locale",wd)}Ta("ng",["ngLocale"],["$provide",function(a){a.provider({$$sanitizeUri:xd});a.provider("$compile",gc).directive({a:yd,input:hc,textarea:hc,form:zd,script:Ad,select:Bd,
style:Cd,option:Dd,ngBind:Ed,ngBindHtml:Fd,ngBindTemplate:Gd,ngClass:Hd,ngClassEven:Id,ngClassOdd:Jd,ngCloak:Kd,ngController:Ld,ngForm:Md,ngHide:Nd,ngIf:Od,ngInclude:Pd,ngInit:Qd,ngNonBindable:Rd,ngPluralize:Sd,ngRepeat:Td,ngShow:Ud,ngStyle:Vd,ngSwitch:Wd,ngSwitchWhen:Xd,ngSwitchDefault:Yd,ngOptions:Zd,ngTransclude:$d,ngModel:ae,ngList:be,ngChange:ce,pattern:ic,ngPattern:ic,required:jc,ngRequired:jc,minlength:kc,ngMinlength:kc,maxlength:lc,ngMaxlength:lc,ngValue:de,ngModelOptions:ee}).directive({ngInclude:fe}).directive(jb).directive(mc);
a.provider({$anchorScroll:ge,$animate:he,$browser:ie,$cacheFactory:je,$controller:ke,$document:le,$exceptionHandler:me,$filter:nc,$interpolate:ne,$interval:oe,$http:pe,$httpBackend:qe,$location:re,$log:se,$parse:te,$rootScope:ue,$q:ve,$$q:we,$sce:xe,$sceDelegate:ye,$sniffer:ze,$templateCache:Ae,$timeout:Be,$window:Ce,$$rAF:De,$$asyncCallback:Ee})}])}function Ua(b){return b.replace(Fe,function(a,b,d,e){return e?d.toUpperCase():d}).replace(Ge,"Moz$1")}function He(b,a){var c,d,e=a.createDocumentFragment(),
f=[];if(Fb.test(b)){c=c||e.appendChild(a.createElement("div"));d=(Ie.exec(b)||["",""])[1].toLowerCase();d=fa[d]||fa._default;c.innerHTML=d[1]+b.replace(Je,"<$1></$2>")+d[2];for(d=d[0];d--;)c=c.lastChild;f=f.concat(la.call(c.childNodes,void 0));c=e.firstChild;c.textContent=""}else f.push(a.createTextNode(b));e.textContent="";e.innerHTML="";q(f,function(a){e.appendChild(a)});return e}function Q(b){if(b instanceof Q)return b;v(b)&&(b=aa(b));if(!(this instanceof Q)){if(v(b)&&"<"!=b.charAt(0))throw Gb("nosel");
return new Q(b)}if(v(b)){var a;a=U;var c;b=(c=Ke.exec(b))?[a.createElement(c[1])]:(c=He(b,a))?c.childNodes:[]}oc(this,b)}function Hb(b){return b.cloneNode(!0)}function Ia(b){pc(b);for(var a=0,c=b.children,d=c&&c.length||0;a<d;a++)b=c[a],Ia(b)}function qc(b,a,c,d){if(E(d))throw Gb("offargs");var e=ma(b,"events");ma(b,"handle")&&(y(a)?q(e,function(a,c){Va(b,c,a);delete e[c]}):q(a.split(" "),function(a){y(c)?(Va(b,a,e[a]),delete e[a]):Ga(e[a]||[],c)}))}function pc(b,a){var c=b.ng339,d=Wa[c];d&&(a?delete Wa[c].data[a]:
(d.handle&&(d.events.$destroy&&d.handle({},"$destroy"),qc(b)),delete Wa[c],b.ng339=r))}function ma(b,a,c){var d=b.ng339,d=Wa[d||-1];if(E(c))d||(b.ng339=d=++Le,d=Wa[d]={}),d[a]=c;else return d&&d[a]}function rc(b,a,c){if(!b.nodeType||1===b.nodeType||9===b.nodeType){var d=ma(b,"data"),e=E(c),f=!e&&E(a),g=f&&!S(a);d||g||ma(b,"data",d={});if(e)d[a]=c;else if(f){if(g)return d&&d[a];z(d,a)}else return d}}function Ib(b,a){return b.getAttribute?-1<(" "+(b.getAttribute("class")||"")+" ").replace(/[\n\t]/g,
" ").indexOf(" "+a+" "):!1}function kb(b,a){a&&b.setAttribute&&q(a.split(" "),function(a){b.setAttribute("class",aa((" "+(b.getAttribute("class")||"")+" ").replace(/[\n\t]/g," ").replace(" "+aa(a)+" "," ")))})}function lb(b,a){if(a&&b.setAttribute){var c=(" "+(b.getAttribute("class")||"")+" ").replace(/[\n\t]/g," ");q(a.split(" "),function(a){a=aa(a);-1===c.indexOf(" "+a+" ")&&(c+=a+" ")});b.setAttribute("class",aa(c))}}function oc(b,a){if(a)if(a.nodeType)b[b.length++]=a;else{var c=a.length;"number"===
typeof c&&a.window!==a?c&&(a.item&&(a=la.call(a)),sc.apply(b,a)):b[b.length++]=a}}function tc(b,a){return mb(b,"$"+(a||"ngController")+"Controller")}function mb(b,a,c){b=C(b);9==b[0].nodeType&&(b=b.find("html"));for(a=M(a)?a:[a];b.length;){for(var d=b[0],e=0,f=a.length;e<f;e++)if((c=b.data(a[e]))!==r)return c;b=C(d.parentNode||11===d.nodeType&&d.host)}}function uc(b){for(var a=0,c=b.childNodes;a<c.length;a++)Ia(c[a]);for(;b.firstChild;)b.removeChild(b.firstChild)}function vc(b,a){var c=nb[a.toLowerCase()];
return c&&wc[na(b)]&&c}function Me(b,a){var c=b.nodeName;return("INPUT"===c||"TEXTAREA"===c)&&xc[a]}function Ne(b,a){var c=function(c,e){c.preventDefault||(c.preventDefault=function(){c.returnValue=!1});c.stopPropagation||(c.stopPropagation=function(){c.cancelBubble=!0});c.target||(c.target=c.srcElement||U);if(y(c.defaultPrevented)){var f=c.preventDefault;c.preventDefault=function(){c.defaultPrevented=!0;f.call(c)};c.defaultPrevented=!1}c.isDefaultPrevented=function(){return c.defaultPrevented||!1===
c.returnValue};var g=ka(a[e||c.type]||[]);q(g,function(a){a.call(b,c)});8>=W?(c.preventDefault=null,c.stopPropagation=null,c.isDefaultPrevented=null):(delete c.preventDefault,delete c.stopPropagation,delete c.isDefaultPrevented)};c.elem=b;return c}function Ja(b,a){var c=typeof b,d;"function"==c||"object"==c&&null!==b?"function"==typeof(d=b.$$hashKey)?d=b.$$hashKey():d===r&&(d=b.$$hashKey=(a||kd)()):d=b;return c+":"+d}function Xa(b,a){if(a){var c=0;this.nextUid=function(){return++c}}q(b,this.put,this)}
function Oe(b){return(b=b.toString().replace(yc,"").match(zc))?"function("+(b[1]||"").replace(/[\s\r\n]+/," ")+")":"fn"}function Jb(b,a,c){var d;if("function"===typeof b){if(!(d=b.$inject)){d=[];if(b.length){if(a)throw v(c)&&c||(c=b.name||Oe(b)),Ka("strictdi",c);a=b.toString().replace(yc,"");a=a.match(zc);q(a[1].split(Pe),function(a){a.replace(Qe,function(a,b,c){d.push(c)})})}b.$inject=d}}else M(b)?(a=b.length-1,Sa(b[a],"fn"),d=b.slice(0,a)):Sa(b,"fn",!0);return d}function Cb(b,a){function c(a){return function(b,
c){if(S(b))q(b,Xb(a));else return a(b,c)}}function d(a,b){Ca(a,"service");if(P(b)||M(b))b=k.instantiate(b);if(!b.$get)throw Ka("pget",a);return p[a+n]=b}function e(a,b){return d(a,{$get:b})}function f(a){var b=[],c;q(a,function(a){function d(a){var b,c;b=0;for(c=a.length;b<c;b++){var e=a[b],f=k.get(e[0]);f[e[1]].apply(f,e[2])}}if(!m.get(a)){m.put(a,!0);try{v(a)?(c=Ta(a),b=b.concat(f(c.requires)).concat(c._runBlocks),d(c._invokeQueue),d(c._configBlocks)):P(a)?b.push(k.invoke(a)):M(a)?b.push(k.invoke(a)):
Sa(a,"module")}catch(e){throw M(a)&&(a=a[a.length-1]),e.message&&(e.stack&&-1==e.stack.indexOf(e.message))&&(e=e.message+"\n"+e.stack),Ka("modulerr",a,e.stack||e.message||e);}}});return b}function g(b,c){function d(a){if(b.hasOwnProperty(a)){if(b[a]===h)throw Ka("cdep",a+" <- "+l.join(" <- "));return b[a]}try{return l.unshift(a),b[a]=h,b[a]=c(a)}catch(e){throw b[a]===h&&delete b[a],e;}finally{l.shift()}}function e(b,c,f,g){"string"===typeof f&&(g=f,f=null);var h=[];g=Jb(b,a,g);var n,l,m;l=0;for(n=
g.length;l<n;l++){m=g[l];if("string"!==typeof m)throw Ka("itkn",m);h.push(f&&f.hasOwnProperty(m)?f[m]:d(m))}M(b)&&(b=b[n]);return b.apply(c,h)}return{invoke:e,instantiate:function(a,b,c){var d=function(){};d.prototype=(M(a)?a[a.length-1]:a).prototype;d=new d;a=e(a,d,b,c);return S(a)||P(a)?a:d},get:d,annotate:Jb,has:function(a){return p.hasOwnProperty(a+n)||b.hasOwnProperty(a)}}}a=!0===a;var h={},n="Provider",l=[],m=new Xa([],!0),p={$provide:{provider:c(d),factory:c(e),service:c(function(a,b){return e(a,
["$injector",function(a){return a.instantiate(b)}])}),value:c(function(a,b){return e(a,da(b))}),constant:c(function(a,b){Ca(a,"constant");p[a]=b;t[a]=b}),decorator:function(a,b){var c=k.get(a+n),d=c.$get;c.$get=function(){var a=s.invoke(d,c);return s.invoke(b,null,{$delegate:a})}}}},k=p.$injector=g(p,function(){throw Ka("unpr",l.join(" <- "));},a),t={},s=t.$injector=g(t,function(a){var b=k.get(a+n);return s.invoke(b.$get,b,r,a)},a);q(f(b),function(a){s.invoke(a||A)});return s}function ge(){var b=
!0;this.disableAutoScrolling=function(){b=!1};this.$get=["$window","$location","$rootScope",function(a,c,d){function e(a){var b=null;q(a,function(a){b||"a"!==na(a)||(b=a)});return b}function f(){var b=c.hash(),d;b?(d=g.getElementById(b))?d.scrollIntoView():(d=e(g.getElementsByName(b)))?d.scrollIntoView():"top"===b&&a.scrollTo(0,0):a.scrollTo(0,0)}var g=a.document;b&&d.$watch(function(){return c.hash()},function(){d.$evalAsync(f)});return f}]}function Ee(){this.$get=["$$rAF","$timeout",function(b,
a){return b.supported?function(a){return b(a)}:function(b){return a(b,0,!1)}}]}function Re(b,a,c,d){function e(a){try{a.apply(null,la.call(arguments,1))}finally{if(s--,0===s)for(;I.length;)try{I.pop()()}catch(b){c.error(b)}}}function f(a,b){(function Se(){q(x,function(a){a()});F=b(Se,a)})()}function g(){D=null;B!=h.url()&&(B=h.url(),q(X,function(a){a(h.url())}))}var h=this,n=a[0],l=b.location,m=b.history,p=b.setTimeout,k=b.clearTimeout,t={};h.isMock=!1;var s=0,I=[];h.$$completeOutstandingRequest=
e;h.$$incOutstandingRequestCount=function(){s++};h.notifyWhenNoOutstandingRequests=function(a){q(x,function(a){a()});0===s?a():I.push(a)};var x=[],F;h.addPollFn=function(a){y(F)&&f(100,p);x.push(a);return a};var B=l.href,u=a.find("base"),D=null;h.url=function(a,c){l!==b.location&&(l=b.location);m!==b.history&&(m=b.history);if(a){if(B!=a)return B=a,d.history?c?m.replaceState(null,"",a):(m.pushState(null,"",a),u.attr("href",u.attr("href"))):(D=a,c?l.replace(a):l.href=a),h}else return D||l.href.replace(/%27/g,
"'")};var X=[],O=!1;h.onUrlChange=function(a){if(!O){if(d.history)C(b).on("popstate",g);if(d.hashchange)C(b).on("hashchange",g);else h.addPollFn(g);O=!0}X.push(a);return a};h.baseHref=function(){var a=u.attr("href");return a?a.replace(/^(https?\:)?\/\/[^\/]*/,""):""};var T={},J="",V=h.baseHref();h.cookies=function(a,b){var d,e,f,g;if(a)b===r?n.cookie=escape(a)+"=;path="+V+";expires=Thu, 01 Jan 1970 00:00:00 GMT":v(b)&&(d=(n.cookie=escape(a)+"="+escape(b)+";path="+V).length+1,4096<d&&c.warn("Cookie '"+
a+"' possibly not set or overflowed because it was too large ("+d+" > 4096 bytes)!"));else{if(n.cookie!==J)for(J=n.cookie,d=J.split("; "),T={},f=0;f<d.length;f++)e=d[f],g=e.indexOf("="),0<g&&(a=unescape(e.substring(0,g)),T[a]===r&&(T[a]=unescape(e.substring(g+1))));return T}};h.defer=function(a,b){var c;s++;c=p(function(){delete t[c];e(a)},b||0);t[c]=!0;return c};h.defer.cancel=function(a){return t[a]?(delete t[a],k(a),e(A),!0):!1}}function ie(){this.$get=["$window","$log","$sniffer","$document",
function(b,a,c,d){return new Re(b,d,a,c)}]}function je(){this.$get=function(){function b(b,d){function e(a){a!=p&&(k?k==a&&(k=a.n):k=a,f(a.n,a.p),f(a,p),p=a,p.n=null)}function f(a,b){a!=b&&(a&&(a.p=b),b&&(b.n=a))}if(b in a)throw L("$cacheFactory")("iid",b);var g=0,h=z({},d,{id:b}),n={},l=d&&d.capacity||Number.MAX_VALUE,m={},p=null,k=null;return a[b]={put:function(a,b){if(l<Number.MAX_VALUE){var c=m[a]||(m[a]={key:a});e(c)}if(!y(b))return a in n||g++,n[a]=b,g>l&&this.remove(k.key),b},get:function(a){if(l<
Number.MAX_VALUE){var b=m[a];if(!b)return;e(b)}return n[a]},remove:function(a){if(l<Number.MAX_VALUE){var b=m[a];if(!b)return;b==p&&(p=b.p);b==k&&(k=b.n);f(b.n,b.p);delete m[a]}delete n[a];g--},removeAll:function(){n={};g=0;m={};p=k=null},destroy:function(){m=h=n=null;delete a[b]},info:function(){return z({},h,{size:g})}}}var a={};b.info=function(){var b={};q(a,function(a,e){b[e]=a.info()});return b};b.get=function(b){return a[b]};return b}}function Ae(){this.$get=["$cacheFactory",function(b){return b("templates")}]}
function gc(b,a){var c={},d="Directive",e=/^\s*directive\:\s*([\d\w_\-]+)\s+(.*)$/,f=/(([\d\w_\-]+)(?:\:([^;]+))?;?)/,g=md("ngSrc,ngSrcset,src,srcset"),h=/^(on[a-z]+|formaction)$/;this.directive=function l(a,e){Ca(a,"directive");v(a)?(Db(e,"directiveFactory"),c.hasOwnProperty(a)||(c[a]=[],b.factory(a+d,["$injector","$exceptionHandler",function(b,d){var e=[];q(c[a],function(c,f){try{var g=b.invoke(c);P(g)?g={compile:da(g)}:!g.compile&&g.link&&(g.compile=da(g.link));g.priority=g.priority||0;g.index=
f;g.name=g.name||a;g.require=g.require||g.controller&&g.name;g.restrict=g.restrict||"A";e.push(g)}catch(h){d(h)}});return e}])),c[a].push(e)):q(a,Xb(l));return this};this.aHrefSanitizationWhitelist=function(b){return E(b)?(a.aHrefSanitizationWhitelist(b),this):a.aHrefSanitizationWhitelist()};this.imgSrcSanitizationWhitelist=function(b){return E(b)?(a.imgSrcSanitizationWhitelist(b),this):a.imgSrcSanitizationWhitelist()};this.$get=["$injector","$interpolate","$exceptionHandler","$http","$templateCache",
"$parse","$controller","$rootScope","$document","$sce","$animate","$$sanitizeUri",function(a,b,p,k,t,s,I,x,F,B,u,D){function X(a,b,c,d,e){a instanceof C||(a=C(a));q(a,function(b,c){3==b.nodeType&&b.nodeValue.match(/\S+/)&&(a[c]=C(b).wrap("<span></span>").parent()[0])});var f=T(a,b,a,c,d,e);O(a,"ng-scope");return function(b,c,d,e){Db(b,"scope");var g=c?Ha.clone.call(a):a;q(d,function(a,b){g.data("$"+b+"Controller",a)});g.data("$scope",b);c&&c(g,b);f&&f(b,g,g,e);return g}}function O(a,b){try{a.addClass(b)}catch(c){}}
function T(a,b,c,d,e,f){function g(a,c,d,e){var f,k,l,m,p,t,F;f=c.length;var s=Array(f);for(p=0;p<f;p++)s[p]=c[p];F=p=0;for(t=h.length;p<t;F++)k=s[F],c=h[p++],f=h[p++],l=C(k),c?(c.scope?(m=a.$new(),l.data("$scope",m)):m=a,l=c.transcludeOnThisElement?J(a,c.transclude,e):!c.templateOnThisElement&&e?e:!e&&b?J(a,b):null,c(f,m,k,d,l)):f&&f(a,k.childNodes,r,e)}for(var h=[],k,l,m,p,t=0;t<a.length;t++)k=new Kb,l=V(a[t],[],k,0===t?d:r,e),(f=l.length?K(l,a[t],k,b,c,null,[],[],f):null)&&f.scope&&O(C(a[t]),"ng-scope"),
k=f&&f.terminal||!(m=a[t].childNodes)||!m.length?null:T(m,f?(f.transcludeOnThisElement||!f.templateOnThisElement)&&f.transclude:b),h.push(f,k),p=p||f||k,f=null;return p?g:null}function J(a,b,c){return function(d,e,f){var g=!1;d||(d=a.$new(),g=d.$$transcluded=!0);e=b(d,e,f,c);if(g)e.on("$destroy",function(){d.$destroy()});return e}}function V(a,b,c,d,g){var h=c.$attr,k;switch(a.nodeType){case 1:va(b,pa(na(a)),"E",d,g);for(var l,m,p,t=a.attributes,F=0,s=t&&t.length;F<s;F++){var I=!1,B=!1;l=t[F];if(!W||
8<=W||l.specified){k=l.name;m=aa(l.value);l=pa(k);if(p=Da.test(l))k=hb(l.substr(6),"-");var x=l.replace(/(Start|End)$/,"");l===x+"Start"&&(I=k,B=k.substr(0,k.length-5)+"end",k=k.substr(0,k.length-6));l=pa(k.toLowerCase());h[l]=k;if(p||!c.hasOwnProperty(l))c[l]=m,vc(a,l)&&(c[l]=!0);Z(a,b,m,l);va(b,l,"A",d,g,I,B)}}a=a.className;if(v(a)&&""!==a)for(;k=f.exec(a);)l=pa(k[2]),va(b,l,"C",d,g)&&(c[l]=aa(k[3])),a=a.substr(k.index+k[0].length);break;case 3:L(b,a.nodeValue);break;case 8:try{if(k=e.exec(a.nodeValue))l=
pa(k[1]),va(b,l,"M",d,g)&&(c[l]=aa(k[2]))}catch(u){}}b.sort(y);return b}function w(a,b,c){var d=[],e=0;if(b&&a.hasAttribute&&a.hasAttribute(b)){do{if(!a)throw ia("uterdir",b,c);1==a.nodeType&&(a.hasAttribute(b)&&e++,a.hasAttribute(c)&&e--);d.push(a);a=a.nextSibling}while(0<e)}else d.push(a);return C(d)}function $(a,b,c){return function(d,e,f,g,h){e=w(e[0],b,c);return a(d,e,f,g,h)}}function K(a,c,d,e,f,g,h,l,k){function t(a,b,c,d){if(a){c&&(a=$(a,c,d));a.require=H.require;a.directiveName=z;if(J===
H||H.$$isolateScope)a=Bc(a,{isolateScope:!0});h.push(a)}if(b){c&&(b=$(b,c,d));b.require=H.require;b.directiveName=z;if(J===H||H.$$isolateScope)b=Bc(b,{isolateScope:!0});l.push(b)}}function F(a,b,c,d){var e,f="data",g=!1;if(v(b)){for(;"^"==(e=b.charAt(0))||"?"==e;)b=b.substr(1),"^"==e&&(f="inheritedData"),g=g||"?"==e;e=null;d&&"data"===f&&(e=d[b]);e=e||c[f]("$"+b+"Controller");if(!e&&!g)throw ia("ctreq",b,a);}else M(b)&&(e=[],q(b,function(b){e.push(F(a,b,c,d))}));return e}function B(a,e,f,g,k){function t(a,
b){var c;2>arguments.length&&(b=a,a=r);y&&(c=V);return k(a,b,c)}var x,u,Ac,w,X,K,V={},$;x=c===f?d:ka(d,new Kb(C(f),d.$attr));u=x.$$element;if(J){var Te=/^\s*([@=&])(\??)\s*(\w*)\s*$/;g=C(f);K=e.$new(!0);!T||T!==J&&T!==J.$$originalDirective?g.data("$isolateScopeNoTemplate",K):g.data("$isolateScope",K);O(g,"ng-isolate-scope");q(J.scope,function(a,c){var d=a.match(Te)||[],f=d[3]||c,g="?"==d[2],d=d[1],h,k,l,p;K.$$isolateBindings[c]=d+f;switch(d){case "@":x.$observe(f,function(a){K[c]=a});x.$$observers[f].$$scope=
e;x[f]&&(K[c]=b(x[f])(e));break;case "=":if(g&&!x[f])break;k=s(x[f]);p=k.literal?sa:function(a,b){return a===b};l=k.assign||function(){h=K[c]=k(e);throw ia("nonassign",x[f],J.name);};h=K[c]=k(e);K.$watch(function Ue(){var a=k(e);p(a,K[c])||(p(a,h)?l(e,a=K[c]):K[c]=a);Ue.$$unwatch=k.$$unwatch;return h=a},null,k.literal);break;case "&":k=s(x[f]);K[c]=function(a){return k(e,a)};break;default:throw ia("iscp",J.name,c,a);}})}$=k&&t;D&&q(D,function(a){var b={$scope:a===J||a.$$isolateScope?K:e,$element:u,
$attrs:x,$transclude:$},c;X=a.controller;"@"==X&&(X=x[a.name]);c=I(X,b);V[a.name]=c;y||u.data("$"+a.name+"Controller",c);a.controllerAs&&(b.$scope[a.controllerAs]=c)});g=0;for(Ac=h.length;g<Ac;g++)try{w=h[g],w(w.isolateScope?K:e,u,x,w.require&&F(w.directiveName,w.require,u,V),$)}catch(oa){p(oa,ha(u))}g=e;J&&(J.template||null===J.templateUrl)&&(g=K);a&&a(g,f.childNodes,r,k);for(g=l.length-1;0<=g;g--)try{w=l[g],w(w.isolateScope?K:e,u,x,w.require&&F(w.directiveName,w.require,u,V),$)}catch(R){p(R,ha(u))}}
k=k||{};for(var x=-Number.MAX_VALUE,u,D=k.controllerDirectives,J=k.newIsolateScopeDirective,T=k.templateDirective,K=k.nonTlbTranscludeDirective,va=!1,Ya=!1,y=k.hasElementTranscludeDirective,Z=d.$$element=C(c),H,z,R,L=e,G,N=0,Q=a.length;N<Q;N++){H=a[N];var Da=H.$$start,ob=H.$$end;Da&&(Z=w(c,Da,ob));R=r;if(x>H.priority)break;if(R=H.scope)H.templateUrl||(S(R)?(La("new/isolated scope",J||u,H,Z),J=H):La("new/isolated scope",J,H,Z)),u=u||H;z=H.name;!H.templateUrl&&H.controller&&(R=H.controller,D=D||{},
La("'"+z+"' controller",D[z],H,Z),D[z]=H);if(R=H.transclude)va=!0,H.$$tlb||(La("transclusion",K,H,Z),K=H),"element"==R?(y=!0,x=H.priority,R=w(c,Da,ob),Z=d.$$element=C(U.createComment(" "+z+": "+d[z]+" ")),c=Z[0],pb(f,C(la.call(R,0)),c),L=X(R,e,x,g&&g.name,{nonTlbTranscludeDirective:K})):(R=C(Hb(c)).contents(),Z.empty(),L=X(R,e));if(H.template)if(Ya=!0,La("template",T,H,Z),T=H,R=P(H.template)?H.template(Z,d):H.template,R=Cc(R),H.replace){g=H;R=Fb.test(R)?C(Dc(H.type,aa(R))):[];c=R[0];if(1!=R.length||
1!==c.nodeType)throw ia("tplrt",z,"");pb(f,Z,c);Q={$attr:{}};R=V(c,[],Q);var W=a.splice(N+1,a.length-(N+1));J&&E(R);a=a.concat(R).concat(W);oa(d,Q);Q=a.length}else Z.html(R);if(H.templateUrl)Ya=!0,La("template",T,H,Z),T=H,H.replace&&(g=H),B=A(a.splice(N,a.length-N),Z,d,f,va&&L,h,l,{controllerDirectives:D,newIsolateScopeDirective:J,templateDirective:T,nonTlbTranscludeDirective:K}),Q=a.length;else if(H.compile)try{G=H.compile(Z,d,L),P(G)?t(null,G,Da,ob):G&&t(G.pre,G.post,Da,ob)}catch(Y){p(Y,ha(Z))}H.terminal&&
(B.terminal=!0,x=Math.max(x,H.priority))}B.scope=u&&!0===u.scope;B.transcludeOnThisElement=va;B.templateOnThisElement=Ya;B.transclude=L;k.hasElementTranscludeDirective=y;return B}function E(a){for(var b=0,c=a.length;b<c;b++)a[b]=Zb(a[b],{$$isolateScope:!0})}function va(b,e,f,g,h,k,m){if(e===h)return null;h=null;if(c.hasOwnProperty(e)){var t;e=a.get(e+d);for(var F=0,s=e.length;F<s;F++)try{t=e[F],(g===r||g>t.priority)&&-1!=t.restrict.indexOf(f)&&(k&&(t=Zb(t,{$$start:k,$$end:m})),b.push(t),h=t)}catch(x){p(x)}}return h}
function oa(a,b){var c=b.$attr,d=a.$attr,e=a.$$element;q(a,function(d,e){"$"!=e.charAt(0)&&(b[e]&&b[e]!==d&&(d+=("style"===e?";":" ")+b[e]),a.$set(e,d,!0,c[e]))});q(b,function(b,f){"class"==f?(O(e,b),a["class"]=(a["class"]?a["class"]+" ":"")+b):"style"==f?(e.attr("style",e.attr("style")+";"+b),a.style=(a.style?a.style+";":"")+b):"$"==f.charAt(0)||a.hasOwnProperty(f)||(a[f]=b,d[f]=c[f])})}function A(a,b,c,d,e,f,g,h){var l=[],m,p,F=b[0],s=a.shift(),x=z({},s,{templateUrl:null,transclude:null,replace:null,
$$originalDirective:s}),u=P(s.templateUrl)?s.templateUrl(b,c):s.templateUrl,I=s.type;b.empty();k.get(B.getTrustedResourceUrl(u),{cache:t}).success(function(k){var t,B;k=Cc(k);if(s.replace){k=Fb.test(k)?C(Dc(I,aa(k))):[];t=k[0];if(1!=k.length||1!==t.nodeType)throw ia("tplrt",s.name,u);k={$attr:{}};pb(d,b,t);var D=V(t,[],k);S(s.scope)&&E(D);a=D.concat(a);oa(c,k)}else t=F,b.html(k);a.unshift(x);m=K(a,t,c,e,b,s,f,g,h);q(d,function(a,c){a==t&&(d[c]=b[0])});for(p=T(b[0].childNodes,e);l.length;){k=l.shift();
B=l.shift();var w=l.shift(),X=l.shift(),D=b[0];if(B!==F){var $=B.className;h.hasElementTranscludeDirective&&s.replace||(D=Hb(t));pb(w,C(B),D);O(C(D),$)}B=m.transcludeOnThisElement?J(k,m.transclude,X):X;m(p,k,D,d,B)}l=null}).error(function(a,b,c,d){throw ia("tpload",d.url);});return function(a,b,c,d,e){a=e;l?(l.push(b),l.push(c),l.push(d),l.push(a)):(m.transcludeOnThisElement&&(a=J(b,m.transclude,e)),m(p,b,c,d,a))}}function y(a,b){var c=b.priority-a.priority;return 0!==c?c:a.name!==b.name?a.name<b.name?
-1:1:a.index-b.index}function La(a,b,c,d){if(b)throw ia("multidir",b.name,c.name,a,ha(d));}function L(a,c){var d=b(c,!0);d&&a.push({priority:0,compile:function(a){var e=a.parent().length;e&&O(a.parent(),"ng-binding");return function(a,f){var g=f.parent(),h=g.data("$binding")||[];d=b(c);h.push(d);g.data("$binding",h);e||O(g,"ng-binding");a.$watch(d,function(a){f[0].nodeValue=a})}}})}function Dc(a,b){a=G(a||"html");switch(a){case "svg":case "math":var c=U.createElement("div");c.innerHTML="<"+a+">"+
b+"</"+a+">";return c.childNodes[0].childNodes;default:return b}}function Ya(a,b){if("srcdoc"==b)return B.HTML;var c=na(a);if("xlinkHref"==b||"form"==c&&"action"==b||"img"!=c&&("src"==b||"ngSrc"==b))return B.RESOURCE_URL}function Z(a,c,d,e){var f=b(d,!0);if(f){if("multiple"===e&&"select"===na(a))throw ia("selmulti",ha(a));c.push({priority:100,compile:function(){return{pre:function(c,d,k){d=k.$$observers||(k.$$observers={});if(h.test(e))throw ia("nodomevents");if(f=b(k[e],!0,Ya(a,e),g[e]))k[e]=f(c),
(d[e]||(d[e]=[])).$$inter=!0,(k.$$observers&&k.$$observers[e].$$scope||c).$watch(f,function(a,b){"class"===e&&a!=b?k.$updateClass(a,b):k.$set(e,a)})}}}})}}function pb(a,b,c){var d=b[0],e=b.length,f=d.parentNode,g,h;if(a)for(g=0,h=a.length;g<h;g++)if(a[g]==d){a[g++]=c;h=g+e-1;for(var k=a.length;g<k;g++,h++)h<k?a[g]=a[h]:delete a[g];a.length-=e-1;break}f&&f.replaceChild(c,d);a=U.createDocumentFragment();a.appendChild(d);c[C.expando]=d[C.expando];d=1;for(e=b.length;d<e;d++)f=b[d],C(f).remove(),a.appendChild(f),
delete b[d];b[0]=c;b.length=1}function Bc(a,b){return z(function(){return a.apply(null,arguments)},a,b)}var Kb=function(a,b){this.$$element=a;this.$attr=b||{}};Kb.prototype={$normalize:pa,$addClass:function(a){a&&0<a.length&&u.addClass(this.$$element,a)},$removeClass:function(a){a&&0<a.length&&u.removeClass(this.$$element,a)},$updateClass:function(a,b){var c=Ec(a,b),d=Ec(b,a);0===c.length?u.removeClass(this.$$element,d):0===d.length?u.addClass(this.$$element,c):u.setClass(this.$$element,c,d)},$set:function(a,
b,c,d){var e=this.$$element[0],f=vc(e,a),g=Me(e,a),e=a;f?(this.$$element.prop(a,b),d=f):g&&(this[g]=b,e=g);this[a]=b;d?this.$attr[a]=d:(d=this.$attr[a])||(this.$attr[a]=d=hb(a,"-"));f=na(this.$$element);if("a"===f&&"href"===a||"img"===f&&"src"===a)this[a]=b=D(b,"src"===a);!1!==c&&(null===b||b===r?this.$$element.removeAttr(d):this.$$element.attr(d,b));(a=this.$$observers)&&q(a[e],function(a){try{a(b)}catch(c){p(c)}})},$observe:function(a,b){var c=this,d=c.$$observers||(c.$$observers={}),e=d[a]||(d[a]=
[]);e.push(b);x.$evalAsync(function(){e.$$inter||b(c[a])});return function(){Ga(e,b)}}};var N=b.startSymbol(),Q=b.endSymbol(),Cc="{{"==N||"}}"==Q?Ea:function(a){return a.replace(/\{\{/g,N).replace(/}}/g,Q)},Da=/^ngAttr[A-Z]/;return X}]}function pa(b){return Ua(b.replace(Ve,""))}function Ec(b,a){var c="",d=b.split(/\s+/),e=a.split(/\s+/),f=0;a:for(;f<d.length;f++){for(var g=d[f],h=0;h<e.length;h++)if(g==e[h])continue a;c+=(0<c.length?" ":"")+g}return c}function ke(){var b={},a=/^(\S+)(\s+as\s+(\w+))?$/;
this.register=function(a,d){Ca(a,"controller");S(a)?z(b,a):b[a]=d};this.$get=["$injector","$window",function(c,d){return function(e,f){var g,h,n;v(e)&&(g=e.match(a),h=g[1],n=g[3],e=b.hasOwnProperty(h)?b[h]:fc(f.$scope,h,!0)||fc(d,h,!0),Sa(e,h,!0));g=c.instantiate(e,f,h);if(n){if(!f||"object"!==typeof f.$scope)throw L("$controller")("noscp",h||e.name,n);f.$scope[n]=g}return g}}]}function le(){this.$get=["$window",function(b){return C(b.document)}]}function me(){this.$get=["$log",function(b){return function(a,
c){b.error.apply(b,arguments)}}]}function Fc(b){var a={},c,d,e;if(!b)return a;q(b.split("\n"),function(b){e=b.indexOf(":");c=G(aa(b.substr(0,e)));d=aa(b.substr(e+1));c&&(a[c]=a[c]?a[c]+(", "+d):d)});return a}function Gc(b){var a=S(b)?b:r;return function(c){a||(a=Fc(b));return c?a[G(c)]||null:a}}function Hc(b,a,c){if(P(c))return c(b,a);q(c,function(c){b=c(b,a)});return b}function pe(){var b=/^\s*(\[|\{[^\{])/,a=/[\}\]]\s*$/,c=/^\)\]\}',?\n/,d={"Content-Type":"application/json;charset=utf-8"},e=this.defaults=
{transformResponse:[function(d){v(d)&&(d=d.replace(c,""),b.test(d)&&a.test(d)&&(d=ac(d)));return d}],transformRequest:[function(a){return S(a)&&"[object File]"!==za.call(a)&&"[object Blob]"!==za.call(a)?ta(a):a}],headers:{common:{Accept:"application/json, text/plain, */*"},post:ka(d),put:ka(d),patch:ka(d)},xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN"},f=this.interceptors=[];this.$get=["$httpBackend","$browser","$cacheFactory","$rootScope","$q","$injector",function(a,b,c,d,m,p){function k(a){function b(a){var d=
z({},a,{data:Hc(a.data,a.headers,c.transformResponse)});return 200<=a.status&&300>a.status?d:m.reject(d)}var c={method:"get",transformRequest:e.transformRequest,transformResponse:e.transformResponse},d=function(a){function b(a){var c;q(a,function(b,d){P(b)&&(c=b(),null!=c?a[d]=c:delete a[d])})}var c=e.headers,d=z({},a.headers),f,g,c=z({},c.common,c[G(a.method)]);b(c);b(d);a:for(f in c){a=G(f);for(g in d)if(G(g)===a)continue a;d[f]=c[f]}return d}(a);z(c,a);c.headers=d;c.method=ib(c.method);var f=[function(a){d=
a.headers;var c=Hc(a.data,Gc(d),a.transformRequest);y(c)&&q(d,function(a,b){"content-type"===G(b)&&delete d[b]});y(a.withCredentials)&&!y(e.withCredentials)&&(a.withCredentials=e.withCredentials);return t(a,c,d).then(b,b)},r],g=m.when(c);for(q(x,function(a){(a.request||a.requestError)&&f.unshift(a.request,a.requestError);(a.response||a.responseError)&&f.push(a.response,a.responseError)});f.length;){a=f.shift();var h=f.shift(),g=g.then(a,h)}g.success=function(a){g.then(function(b){a(b.data,b.status,
b.headers,c)});return g};g.error=function(a){g.then(null,function(b){a(b.data,b.status,b.headers,c)});return g};return g}function t(c,f,n){function p(a,b,c,e){V&&(200<=a&&300>a?V.put($,[a,b,Fc(c),e]):V.remove($));t(b,a,c,e);d.$$phase||d.$apply()}function t(a,b,d,e){b=Math.max(b,0);(200<=b&&300>b?q.resolve:q.reject)({data:a,status:b,headers:Gc(d),config:c,statusText:e})}function x(){var a=Pa(k.pendingRequests,c);-1!==a&&k.pendingRequests.splice(a,1)}var q=m.defer(),J=q.promise,V,w,$=s(c.url,c.params);
k.pendingRequests.push(c);J.then(x,x);(c.cache||e.cache)&&(!1!==c.cache&&"GET"==c.method)&&(V=S(c.cache)?c.cache:S(e.cache)?e.cache:I);if(V)if(w=V.get($),E(w)){if(w.then)return w.then(x,x),w;M(w)?t(w[1],w[0],ka(w[2]),w[3]):t(w,200,{},"OK")}else V.put($,J);y(w)&&((w=Lb(c.url)?b.cookies()[c.xsrfCookieName||e.xsrfCookieName]:r)&&(n[c.xsrfHeaderName||e.xsrfHeaderName]=w),a(c.method,$,f,p,n,c.timeout,c.withCredentials,c.responseType));return J}function s(a,b){if(!b)return a;var c=[];jd(b,function(a,b){null===
a||y(a)||(M(a)||(a=[a]),q(a,function(a){S(a)&&(a=ta(a));c.push(Ba(b)+"="+Ba(a))}))});0<c.length&&(a+=(-1==a.indexOf("?")?"?":"&")+c.join("&"));return a}var I=c("$http"),x=[];q(f,function(a){x.unshift(v(a)?p.get(a):p.invoke(a))});k.pendingRequests=[];(function(a){q(arguments,function(a){k[a]=function(b,c){return k(z(c||{},{method:a,url:b}))}})})("get","delete","head","jsonp");(function(a){q(arguments,function(a){k[a]=function(b,c,d){return k(z(d||{},{method:a,url:b,data:c}))}})})("post","put","patch");
k.defaults=e;return k}]}function We(b){if(8>=W&&(!b.match(/^(get|post|head|put|delete|options)$/i)||!N.XMLHttpRequest))return new N.ActiveXObject("Microsoft.XMLHTTP");if(N.XMLHttpRequest)return new N.XMLHttpRequest;throw L("$httpBackend")("noxhr");}function qe(){this.$get=["$browser","$window","$document",function(b,a,c){return Xe(b,We,b.defer,a.angular.callbacks,c[0])}]}function Xe(b,a,c,d,e){function f(a,b,c){var f=e.createElement("script"),g=null;f.type="text/javascript";f.src=a;f.async=!0;g=function(a){Va(f,
"load",g);Va(f,"error",g);e.body.removeChild(f);f=null;var h=-1,s="unknown";a&&("load"!==a.type||d[b].called||(a={type:"error"}),s=a.type,h="error"===a.type?404:200);c&&c(h,s)};qb(f,"load",g);qb(f,"error",g);e.body.appendChild(f);return g}var g=-1;return function(e,n,l,m,p,k,t,s){function I(){F=g;u&&u();D&&D.abort()}function x(a,d,e,f,g){O&&c.cancel(O);u=D=null;0===d&&(d=e?200:"file"==wa(n).protocol?404:0);a(1223===d?204:d,e,f,g||"");b.$$completeOutstandingRequest(A)}var F;b.$$incOutstandingRequestCount();
n=n||b.url();if("jsonp"==G(e)){var B="_"+(d.counter++).toString(36);d[B]=function(a){d[B].data=a;d[B].called=!0};var u=f(n.replace("JSON_CALLBACK","angular.callbacks."+B),B,function(a,b){x(m,a,d[B].data,"",b);d[B]=A})}else{var D=a(e);D.open(e,n,!0);q(p,function(a,b){E(a)&&D.setRequestHeader(b,a)});D.onreadystatechange=function(){if(D&&4==D.readyState){var a=null,b=null,c="";F!==g&&(a=D.getAllResponseHeaders(),b="response"in D?D.response:D.responseText);F===g&&10>W||(c=D.statusText);x(m,F||D.status,
b,a,c)}};t&&(D.withCredentials=!0);if(s)try{D.responseType=s}catch(X){if("json"!==s)throw X;}D.send(l||null)}if(0<k)var O=c(I,k);else k&&k.then&&k.then(I)}}function ne(){var b="{{",a="}}";this.startSymbol=function(a){return a?(b=a,this):b};this.endSymbol=function(b){return b?(a=b,this):a};this.$get=["$parse","$exceptionHandler","$sce",function(c,d,e){function f(a){return"\\\\\\"+a}function g(f,g,t,s){s=!!s;for(var I,x,F=0,B=[],u=[],D=[],X=f.length,O=!1,T=!1,J=[],V={},w={};F<X;)if(-1!=(I=f.indexOf(b,
F))&&-1!=(x=f.indexOf(a,I+h)))F!==I&&(T=!0),B.push(f.substring(F,I)),F=f.substring(I+h,x),u.push(F),D.push(c(F)),F=x+n,O=!0;else{F!==X&&(T=!0,B.push(f.substring(F)));break}q(B,function(c,d){B[d]=B[d].replace(l,b).replace(m,a)});B.length===u.length&&B.push("");if(t&&O&&(T||1<u.length))throw Ic("noconcat",f);if(!g||O){J.length=B.length+u.length;var $=function(a){for(var b=0,c=u.length;b<c;b++)J[2*b]=B[b],J[2*b+1]=a[b];J[2*c]=B[c];return J.join("")},K=function(a){return a=t?e.getTrusted(t,a):e.valueOf(a)},
C=function(a){if(null==a)return"";switch(typeof a){case "string":break;case "number":a=""+a;break;default:a=ta(a)}return a};return z(function oa(a){var b=a&&a.$id||"notAScope",c=V[b],e=w[b],g=0,h=u.length,k=Array(h),n,l=e===r?!0:!1;c||(c=[],l=!0,a&&a.$on&&a.$on("$destroy",function(){V[b]=null;w[b]=null}));try{for(oa.$$unwatch=!0;g<h;g++){n=K(D[g](a));if(s&&y(n)){oa.$$unwatch=r;return}n=C(n);n!==c[g]&&(l=!0);k[g]=n;oa.$$unwatch=oa.$$unwatch&&D[g].$$unwatch}l&&(V[b]=k,w[b]=e=$(k))}catch(t){a=Ic("interr",
f,t.toString()),d(a)}return e},{exp:f,separators:B,expressions:u})}}var h=b.length,n=a.length,l=RegExp(b.replace(/./g,f),"g"),m=RegExp(a.replace(/./g,f),"g");g.startSymbol=function(){return b};g.endSymbol=function(){return a};return g}]}function oe(){this.$get=["$rootScope","$window","$q","$$q",function(b,a,c,d){function e(e,h,n,l){var m=a.setInterval,p=a.clearInterval,k=0,t=E(l)&&!l,s=(t?d:c).defer(),I=s.promise;n=E(n)?n:0;I.then(null,null,e);I.$$intervalId=m(function(){s.notify(k++);0<n&&k>=n&&
(s.resolve(k),p(I.$$intervalId),delete f[I.$$intervalId]);t||b.$apply()},h);f[I.$$intervalId]=s;return I}var f={};e.cancel=function(b){return b&&b.$$intervalId in f?(f[b.$$intervalId].reject("canceled"),a.clearInterval(b.$$intervalId),delete f[b.$$intervalId],!0):!1};return e}]}function wd(){this.$get=function(){return{id:"en-us",NUMBER_FORMATS:{DECIMAL_SEP:".",GROUP_SEP:",",PATTERNS:[{minInt:1,minFrac:0,maxFrac:3,posPre:"",posSuf:"",negPre:"-",negSuf:"",gSize:3,lgSize:3},{minInt:1,minFrac:2,maxFrac:2,
posPre:"\u00a4",posSuf:"",negPre:"(\u00a4",negSuf:")",gSize:3,lgSize:3}],CURRENCY_SYM:"$"},DATETIME_FORMATS:{MONTH:"January February March April May June July August September October November December".split(" "),SHORTMONTH:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),DAY:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),SHORTDAY:"Sun Mon Tue Wed Thu Fri Sat".split(" "),AMPMS:["AM","PM"],medium:"MMM d, y h:mm:ss a","short":"M/d/yy h:mm a",fullDate:"EEEE, MMMM d, y",
longDate:"MMMM d, y",mediumDate:"MMM d, y",shortDate:"M/d/yy",mediumTime:"h:mm:ss a",shortTime:"h:mm a"},pluralCat:function(b){return 1===b?"one":"other"}}}}function Mb(b){b=b.split("/");for(var a=b.length;a--;)b[a]=gb(b[a]);return b.join("/")}function Jc(b,a,c){b=wa(b,c);a.$$protocol=b.protocol;a.$$host=b.hostname;a.$$port=Y(b.port)||Ye[b.protocol]||null}function Kc(b,a,c){var d="/"!==b.charAt(0);d&&(b="/"+b);b=wa(b,c);a.$$path=decodeURIComponent(d&&"/"===b.pathname.charAt(0)?b.pathname.substring(1):
b.pathname);a.$$search=cc(b.search);a.$$hash=decodeURIComponent(b.hash);a.$$path&&"/"!=a.$$path.charAt(0)&&(a.$$path="/"+a.$$path)}function qa(b,a){if(0===a.indexOf(b))return a.substr(b.length)}function Za(b){var a=b.indexOf("#");return-1==a?b:b.substr(0,a)}function Nb(b){return b.substr(0,Za(b).lastIndexOf("/")+1)}function Lc(b,a){this.$$html5=!0;a=a||"";var c=Nb(b);Jc(b,this,b);this.$$parse=function(a){var e=qa(c,a);if(!v(e))throw Ob("ipthprfx",a,c);Kc(e,this,b);this.$$path||(this.$$path="/");this.$$compose()};
this.$$compose=function(){var a=Bb(this.$$search),b=this.$$hash?"#"+gb(this.$$hash):"";this.$$url=Mb(this.$$path)+(a?"?"+a:"")+b;this.$$absUrl=c+this.$$url.substr(1)};this.$$rewrite=function(d){var e;if((e=qa(b,d))!==r)return d=e,(e=qa(a,e))!==r?c+(qa("/",e)||e):b+d;if((e=qa(c,d))!==r)return c+e;if(c==d+"/")return c}}function Pb(b,a){var c=Nb(b);Jc(b,this,b);this.$$parse=function(d){var e=qa(b,d)||qa(c,d),e="#"==e.charAt(0)?qa(a,e):this.$$html5?e:"";if(!v(e))throw Ob("ihshprfx",d,a);Kc(e,this,b);
d=this.$$path;var f=/^\/[A-Z]:(\/.*)/;0===e.indexOf(b)&&(e=e.replace(b,""));f.exec(e)||(d=(e=f.exec(d))?e[1]:d);this.$$path=d;this.$$compose()};this.$$compose=function(){var c=Bb(this.$$search),e=this.$$hash?"#"+gb(this.$$hash):"";this.$$url=Mb(this.$$path)+(c?"?"+c:"")+e;this.$$absUrl=b+(this.$$url?a+this.$$url:"")};this.$$rewrite=function(a){if(Za(b)==Za(a))return a}}function Qb(b,a){this.$$html5=!0;Pb.apply(this,arguments);var c=Nb(b);this.$$rewrite=function(d){var e;if(b==Za(d))return d;if(e=
qa(c,d))return b+a+e;if(c===d+"/")return c};this.$$compose=function(){var c=Bb(this.$$search),e=this.$$hash?"#"+gb(this.$$hash):"";this.$$url=Mb(this.$$path)+(c?"?"+c:"")+e;this.$$absUrl=b+a+this.$$url}}function rb(b){return function(){return this[b]}}function Mc(b,a){return function(c){if(y(c))return this[b];this[b]=a(c);this.$$compose();return this}}function re(){var b="",a=!1;this.hashPrefix=function(a){return E(a)?(b=a,this):b};this.html5Mode=function(b){return E(b)?(a=b,this):a};this.$get=["$rootScope",
"$browser","$sniffer","$rootElement",function(c,d,e,f){function g(a){c.$broadcast("$locationChangeSuccess",h.absUrl(),a)}var h,n,l=d.baseHref(),m=d.url(),p;a?(p=m.substring(0,m.indexOf("/",m.indexOf("//")+2))+(l||"/"),n=e.history?Lc:Qb):(p=Za(m),n=Pb);h=new n(p,"#"+b);h.$$parse(h.$$rewrite(m));f.on("click",function(a){if(!a.ctrlKey&&!a.metaKey&&2!=a.which){for(var e=C(a.target);"a"!==na(e[0]);)if(e[0]===f[0]||!(e=e.parent())[0])return;var g=e.prop("href");S(g)&&"[object SVGAnimatedString]"===g.toString()&&
(g=wa(g.animVal).href);if(n===Qb){var k=e.attr("href")||e.attr("xlink:href");if(0>k.indexOf("://"))if(g="#"+b,"/"==k[0])g=p+g+k;else if("#"==k[0])g=p+g+(h.path()||"/")+k;else{for(var l=h.path().split("/"),k=k.split("/"),m=0;m<k.length;m++)"."!=k[m]&&(".."==k[m]?l.pop():k[m].length&&l.push(k[m]));g=p+g+l.join("/")}}l=h.$$rewrite(g);g&&(!e.attr("target")&&l&&!a.isDefaultPrevented())&&(a.preventDefault(),l!=d.url()&&(h.$$parse(l),c.$apply(),N.angular["ff-684208-preventDefault"]=!0))}});h.absUrl()!=m&&
d.url(h.absUrl(),!0);d.onUrlChange(function(a){h.absUrl()!=a&&(c.$evalAsync(function(){var b=h.absUrl();h.$$parse(a);c.$broadcast("$locationChangeStart",a,b).defaultPrevented?(h.$$parse(b),d.url(b)):g(b)}),c.$$phase||c.$digest())});var k=0;c.$watch(function(){var a=d.url(),b=h.$$replace;k&&a==h.absUrl()||(k++,c.$evalAsync(function(){c.$broadcast("$locationChangeStart",h.absUrl(),a).defaultPrevented?h.$$parse(a):(d.url(h.absUrl(),b),g(a))}));h.$$replace=!1;return k});return h}]}function se(){var b=
!0,a=this;this.debugEnabled=function(a){return E(a)?(b=a,this):b};this.$get=["$window",function(c){function d(a){a instanceof Error&&(a.stack?a=a.message&&-1===a.stack.indexOf(a.message)?"Error: "+a.message+"\n"+a.stack:a.stack:a.sourceURL&&(a=a.message+"\n"+a.sourceURL+":"+a.line));return a}function e(a){var b=c.console||{},e=b[a]||b.log||A;a=!1;try{a=!!e.apply}catch(n){}return a?function(){var a=[];q(arguments,function(b){a.push(d(b))});return e.apply(b,a)}:function(a,b){e(a,null==b?"":b)}}return{log:e("log"),
info:e("info"),warn:e("warn"),error:e("error"),debug:function(){var c=e("debug");return function(){b&&c.apply(a,arguments)}}()}}]}function ea(b,a){if("__defineGetter__"===b||"__defineSetter__"===b||"__lookupGetter__"===b||"__lookupSetter__"===b||"__proto__"===b)throw ja("isecfld",a);return b}function Ma(b,a){if(b){if(b.constructor===b)throw ja("isecfn",a);if(b.window===b)throw ja("isecwindow",a);if(b.children&&(b.nodeName||b.prop&&b.attr&&b.find))throw ja("isecdom",a);if(b===Object)throw ja("isecobj",
a);}return b}function sb(b,a,c,d){a=a.split(".");for(var e,f=0;1<a.length;f++){e=ea(a.shift(),d);var g=b[e];g||(g={},b[e]=g);b=g}e=ea(a.shift(),d);Ma(b,d);Ma(b[e],d);return b[e]=c}function Nc(b,a,c,d,e,f){ea(b,f);ea(a,f);ea(c,f);ea(d,f);ea(e,f);return function(f,h){var n=h&&h.hasOwnProperty(b)?h:f;if(null==n)return n;n=n[b];if(!a)return n;if(null==n)return r;n=n[a];if(!c)return n;if(null==n)return r;n=n[c];if(!d)return n;if(null==n)return r;n=n[d];return e?null==n?r:n=n[e]:n}}function Ze(b,a){ea(b,
a);return function(a,d){return null==a?r:(d&&d.hasOwnProperty(b)?d:a)[b]}}function $e(b,a,c){ea(b,c);ea(a,c);return function(c,e){if(null==c)return r;c=(e&&e.hasOwnProperty(b)?e:c)[b];return null==c?r:c[a]}}function Oc(b,a,c){if(Rb.hasOwnProperty(b))return Rb[b];var d=b.split("."),e=d.length;if(1===e)a=Ze(d[0],c);else if(2===e)a=$e(d[0],d[1],c);else if(a.csp)a=6>e?Nc(d[0],d[1],d[2],d[3],d[4],c):function(a,b){var f=0,l;do l=Nc(d[f++],d[f++],d[f++],d[f++],d[f++],c)(a,b),b=r,a=l;while(f<e);return l};
else{var f="var p;\n";q(d,function(a,b){ea(a,c);f+="if(s == null) return undefined;\ns="+(b?"s":'((k&&k.hasOwnProperty("'+a+'"))?k:s)')+'["'+a+'"];\n'});f+="return s;";a=new Function("s","k",f);a.toString=da(f)}"hasOwnProperty"!==b&&(Rb[b]=a);return a}function te(){var b={},a={csp:!1};this.$get=["$filter","$sniffer",function(c,d){a.csp=d.csp;return function(d){function f(a){function b(e,f){c||(d=a.constant&&d?d:a(e,f),b.$$unwatch=E(d),b.$$unwatch&&(e&&e.$$postDigestQueue)&&e.$$postDigestQueue.push(function(){!(c=
E(d))||null!==d&&d.$$unwrapTrustedValue||(d=Aa(d,null))}));return d}var c=!1,d;b.literal=a.literal;b.constant=a.constant;b.assign=a.assign;return b}var g,h;switch(typeof d){case "string":d=aa(d);":"===d.charAt(0)&&":"===d.charAt(1)&&(h=!0,d=d.substring(2));if(b.hasOwnProperty(d))return h?f(b[d]):b[d];g=new Sb(a);g=(new $a(g,c,a)).parse(d);"hasOwnProperty"!==d&&(b[d]=g);return h||g.constant?f(g):g;case "function":return d;default:return A}}}]}function ve(){this.$get=["$rootScope","$exceptionHandler",
function(b,a){return Pc(function(a){b.$evalAsync(a)},a)}]}function we(){this.$get=["$browser","$exceptionHandler",function(b,a){return Pc(function(a){b.defer(a)},a)}]}function Pc(b,a){function c(a){return a}function d(a){return g(a)}var e=function(){var g=[],l,m;return m={resolve:function(a){if(g){var c=g;g=r;l=f(a);c.length&&b(function(){for(var a,b=0,d=c.length;b<d;b++)a=c[b],l.then(a[0],a[1],a[2])})}},reject:function(a){m.resolve(h(a))},notify:function(a){if(g){var c=g;g.length&&b(function(){for(var b,
d=0,e=c.length;d<e;d++)b=c[d],b[2](a)})}},promise:{then:function(b,f,h){var m=e(),I=function(d){try{m.resolve((P(b)?b:c)(d))}catch(e){m.reject(e),a(e)}},x=function(b){try{m.resolve((P(f)?f:d)(b))}catch(c){m.reject(c),a(c)}},F=function(b){try{m.notify((P(h)?h:c)(b))}catch(d){a(d)}};g?g.push([I,x,F]):l.then(I,x,F);return m.promise},"catch":function(a){return this.then(null,a)},"finally":function(a){function b(a,c){var d=e();c?d.resolve(a):d.reject(a);return d.promise}function d(e,f){var g=null;try{g=
(a||c)()}catch(h){return b(h,!1)}return g&&P(g.then)?g.then(function(){return b(e,f)},function(a){return b(a,!1)}):b(e,f)}return this.then(function(a){return d(a,!0)},function(a){return d(a,!1)})}}}},f=function(a){return a&&P(a.then)?a:{then:function(c){var d=e();b(function(){d.resolve(c(a))});return d.promise}}},g=function(a){var b=e();b.reject(a);return b.promise},h=function(c){return{then:function(f,g){var h=e();b(function(){try{h.resolve((P(g)?g:d)(c))}catch(b){h.reject(b),a(b)}});return h.promise}}};
return{defer:e,reject:g,when:function(h,l,m,p){var k=e(),t,s=function(b){try{return(P(l)?l:c)(b)}catch(d){return a(d),g(d)}},I=function(b){try{return(P(m)?m:d)(b)}catch(c){return a(c),g(c)}},x=function(b){try{return(P(p)?p:c)(b)}catch(d){a(d)}};b(function(){f(h).then(function(a){t||(t=!0,k.resolve(f(a).then(s,I,x)))},function(a){t||(t=!0,k.resolve(I(a)))},function(a){t||k.notify(x(a))})});return k.promise},all:function(a){var b=e(),c=0,d=M(a)?[]:{};q(a,function(a,e){c++;f(a).then(function(a){d.hasOwnProperty(e)||
(d[e]=a,--c||b.resolve(d))},function(a){d.hasOwnProperty(e)||b.reject(a)})});0===c&&b.resolve(d);return b.promise}}}function De(){this.$get=["$window","$timeout",function(b,a){var c=b.requestAnimationFrame||b.webkitRequestAnimationFrame||b.mozRequestAnimationFrame,d=b.cancelAnimationFrame||b.webkitCancelAnimationFrame||b.mozCancelAnimationFrame||b.webkitCancelRequestAnimationFrame,e=!!c,f=e?function(a){var b=c(a);return function(){d(b)}}:function(b){var c=a(b,16.66,!1);return function(){a.cancel(c)}};
f.supported=e;return f}]}function ue(){var b=10,a=L("$rootScope"),c=null;this.digestTtl=function(a){arguments.length&&(b=a);return b};this.$get=["$injector","$exceptionHandler","$parse","$browser",function(d,e,f,g){function h(){this.$id=++eb;this.$$phase=this.$parent=this.$$watchers=this.$$nextSibling=this.$$prevSibling=this.$$childHead=this.$$childTail=null;this["this"]=this.$root=this;this.$$destroyed=!1;this.$$asyncQueue=[];this.$$postDigestQueue=[];this.$$listeners={};this.$$listenerCount={};
this.$$isolateBindings={}}function n(b){if(k.$$phase)throw a("inprog",k.$$phase);k.$$phase=b}function l(a,b){var c=f(a);Sa(c,b);return c}function m(a,b,c){do a.$$listenerCount[c]-=b,0===a.$$listenerCount[c]&&delete a.$$listenerCount[c];while(a=a.$parent)}function p(){}h.prototype={constructor:h,$new:function(a){a?(a=new h,a.$root=this.$root,a.$$asyncQueue=this.$$asyncQueue,a.$$postDigestQueue=this.$$postDigestQueue):(this.$$childScopeClass||(this.$$childScopeClass=function(){this.$$watchers=this.$$nextSibling=
this.$$childHead=this.$$childTail=null;this.$$listeners={};this.$$listenerCount={};this.$id=++eb;this.$$childScopeClass=null},this.$$childScopeClass.prototype=this),a=new this.$$childScopeClass);a["this"]=a;a.$parent=this;a.$$prevSibling=this.$$childTail;this.$$childHead?this.$$childTail=this.$$childTail.$$nextSibling=a:this.$$childHead=this.$$childTail=a;return a},$watch:function(a,b,d){var e=l(a,"watch"),f=this.$$watchers,g={fn:b,last:p,get:e,exp:a,eq:!!d};c=null;if(!P(b)){var h=l(b||A,"listener");
g.fn=function(a,b,c){h(c)}}f||(f=this.$$watchers=[]);f.unshift(g);return function(){Ga(f,g);c=null}},$watchGroup:function(a,b){function c(){return h}var d=Array(a.length),e=Array(a.length),g=[],h=0,k=this,l=Array(a.length),n=a.length;q(a,function(a,b){var c=f(a);g.push(k.$watch(c,function(a,f){e[b]=a;d[b]=f;h++;l[b]&&!c.$$unwatch&&n++;!l[b]&&c.$$unwatch&&n--;l[b]=c.$$unwatch}))},this);g.push(k.$watch(c,function(){b(e,d,k);c.$$unwatch=0===n?!0:!1}));return function(){q(g,function(a){a()})}},$watchCollection:function(a,
b){function c(){e=n(d);var a,b;if(S(e))if(db(e))for(g!==m&&(g=m,w=g.length=0,l++),a=e.length,w!==a&&(l++,g.length=w=a),b=0;b<a;b++)g[b]!==g[b]&&e[b]!==e[b]||g[b]===e[b]||(l++,g[b]=e[b]);else{g!==p&&(g=p={},w=0,l++);a=0;for(b in e)e.hasOwnProperty(b)&&(a++,g.hasOwnProperty(b)?g[b]!==e[b]&&(l++,g[b]=e[b]):(w++,g[b]=e[b],l++));if(w>a)for(b in l++,g)g.hasOwnProperty(b)&&!e.hasOwnProperty(b)&&(w--,delete g[b])}else g!==e&&(g=e,l++);c.$$unwatch=n.$$unwatch;return l}var d=this,e,g,h,k=1<b.length,l=0,n=f(a),
m=[],p={},q=!0,w=0;return this.$watch(c,function(){q?(q=!1,b(e,e,d)):b(e,h,d);if(k)if(S(e))if(db(e)){h=Array(e.length);for(var a=0;a<e.length;a++)h[a]=e[a]}else for(a in h={},e)Qc.call(e,a)&&(h[a]=e[a]);else h=e})},$digest:function(){var d,f,g,h,l=this.$$asyncQueue,m=this.$$postDigestQueue,u,q,r=b,O,T=[],J=[],C,w,E;n("$digest");c=null;do{q=!1;for(O=this;l.length;){try{E=l.shift(),E.scope.$eval(E.expression)}catch(K){k.$$phase=null,e(K)}c=null}a:do{if(h=O.$$watchers)for(u=h.length;u--;)try{if(d=h[u])if((f=
d.get(O))!==(g=d.last)&&!(d.eq?sa(f,g):"number"===typeof f&&"number"===typeof g&&isNaN(f)&&isNaN(g)))q=!0,c=d,d.last=d.eq?Aa(f,null):f,d.fn(f,g===p?f:g,O),5>r&&(C=4-r,T[C]||(T[C]=[]),w=P(d.exp)?"fn: "+(d.exp.name||d.exp.toString()):d.exp,w+="; newVal: "+ta(f)+"; oldVal: "+ta(g),T[C].push(w)),d.get.$$unwatch&&J.push({watch:d,array:h});else if(d===c){q=!1;break a}}catch(z){k.$$phase=null,e(z)}if(!(u=O.$$childHead||O!==this&&O.$$nextSibling))for(;O!==this&&!(u=O.$$nextSibling);)O=O.$parent}while(O=u);
if((q||l.length)&&!r--)throw k.$$phase=null,a("infdig",b,ta(T));}while(q||l.length);for(k.$$phase=null;m.length;)try{m.shift()()}catch(A){e(A)}for(u=J.length-1;0<=u;--u)d=J[u],d.watch.get.$$unwatch&&Ga(d.array,d.watch)},$destroy:function(){if(!this.$$destroyed){var a=this.$parent;this.$broadcast("$destroy");this.$$destroyed=!0;this!==k&&(q(this.$$listenerCount,Ab(null,m,this)),a.$$childHead==this&&(a.$$childHead=this.$$nextSibling),a.$$childTail==this&&(a.$$childTail=this.$$prevSibling),this.$$prevSibling&&
(this.$$prevSibling.$$nextSibling=this.$$nextSibling),this.$$nextSibling&&(this.$$nextSibling.$$prevSibling=this.$$prevSibling),this.$parent=this.$$nextSibling=this.$$prevSibling=this.$$childHead=this.$$childTail=this.$root=null,this.$$listeners={},this.$$watchers=this.$$asyncQueue=this.$$postDigestQueue=[],this.$destroy=this.$digest=this.$apply=A,this.$on=this.$watch=this.$watchGroup=function(){return A})}},$eval:function(a,b){return f(a)(this,b)},$evalAsync:function(a){k.$$phase||k.$$asyncQueue.length||
g.defer(function(){k.$$asyncQueue.length&&k.$digest()});this.$$asyncQueue.push({scope:this,expression:a})},$$postDigest:function(a){this.$$postDigestQueue.push(a)},$apply:function(a){try{return n("$apply"),this.$eval(a)}catch(b){e(b)}finally{k.$$phase=null;try{k.$digest()}catch(c){throw e(c),c;}}},$on:function(a,b){var c=this.$$listeners[a];c||(this.$$listeners[a]=c=[]);c.push(b);var d=this;do d.$$listenerCount[a]||(d.$$listenerCount[a]=0),d.$$listenerCount[a]++;while(d=d.$parent);var e=this;return function(){c[Pa(c,
b)]=null;m(e,1,a)}},$emit:function(a,b){var c=[],d,f=this,g=!1,h={name:a,targetScope:f,stopPropagation:function(){g=!0},preventDefault:function(){h.defaultPrevented=!0},defaultPrevented:!1},k=[h].concat(la.call(arguments,1)),l,n;do{d=f.$$listeners[a]||c;h.currentScope=f;l=0;for(n=d.length;l<n;l++)if(d[l])try{d[l].apply(null,k)}catch(m){e(m)}else d.splice(l,1),l--,n--;if(g)return h.currentScope=null,h;f=f.$parent}while(f);h.currentScope=null;return h},$broadcast:function(a,b){for(var c=this,d=this,
f={name:a,targetScope:this,preventDefault:function(){f.defaultPrevented=!0},defaultPrevented:!1},g=[f].concat(la.call(arguments,1)),h,k;c=d;){f.currentScope=c;d=c.$$listeners[a]||[];h=0;for(k=d.length;h<k;h++)if(d[h])try{d[h].apply(null,g)}catch(l){e(l)}else d.splice(h,1),h--,k--;if(!(d=c.$$listenerCount[a]&&c.$$childHead||c!==this&&c.$$nextSibling))for(;c!==this&&!(d=c.$$nextSibling);)c=c.$parent}f.currentScope=null;return f}};var k=new h;return k}]}function xd(){var b=/^\s*(https?|ftp|mailto|tel|file):/,
a=/^\s*(https?|ftp|file|blob):|data:image\//;this.aHrefSanitizationWhitelist=function(a){return E(a)?(b=a,this):b};this.imgSrcSanitizationWhitelist=function(b){return E(b)?(a=b,this):a};this.$get=function(){return function(c,d){var e=d?a:b,f;if(!W||8<=W)if(f=wa(c).href,""!==f&&!f.match(e))return"unsafe:"+f;return c}}}function af(b){if("self"===b)return b;if(v(b)){if(-1<b.indexOf("***"))throw xa("iwcard",b);b=b.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g,"\\$1").replace(/\x08/g,"\\x08").replace("\\*\\*",
".*").replace("\\*","[^:/.?&;]*");return RegExp("^"+b+"$")}if(fb(b))return RegExp("^"+b.source+"$");throw xa("imatcher");}function Rc(b){var a=[];E(b)&&q(b,function(b){a.push(af(b))});return a}function ye(){this.SCE_CONTEXTS=ga;var b=["self"],a=[];this.resourceUrlWhitelist=function(a){arguments.length&&(b=Rc(a));return b};this.resourceUrlBlacklist=function(b){arguments.length&&(a=Rc(b));return a};this.$get=["$injector",function(c){function d(a){var b=function(a){this.$$unwrapTrustedValue=function(){return a}};
a&&(b.prototype=new a);b.prototype.valueOf=function(){return this.$$unwrapTrustedValue()};b.prototype.toString=function(){return this.$$unwrapTrustedValue().toString()};return b}var e=function(a){throw xa("unsafe");};c.has("$sanitize")&&(e=c.get("$sanitize"));var f=d(),g={};g[ga.HTML]=d(f);g[ga.CSS]=d(f);g[ga.URL]=d(f);g[ga.JS]=d(f);g[ga.RESOURCE_URL]=d(g[ga.URL]);return{trustAs:function(a,b){var c=g.hasOwnProperty(a)?g[a]:null;if(!c)throw xa("icontext",a,b);if(null===b||b===r||""===b)return b;if("string"!==
typeof b)throw xa("itype",a);return new c(b)},getTrusted:function(c,d){if(null===d||d===r||""===d)return d;var f=g.hasOwnProperty(c)?g[c]:null;if(f&&d instanceof f)return d.$$unwrapTrustedValue();if(c===ga.RESOURCE_URL){var f=wa(d.toString()),m,p,k=!1;m=0;for(p=b.length;m<p;m++)if("self"===b[m]?Lb(f):b[m].exec(f.href)){k=!0;break}if(k)for(m=0,p=a.length;m<p;m++)if("self"===a[m]?Lb(f):a[m].exec(f.href)){k=!1;break}if(k)return d;throw xa("insecurl",d.toString());}if(c===ga.HTML)return e(d);throw xa("unsafe");
},valueOf:function(a){return a instanceof f?a.$$unwrapTrustedValue():a}}}]}function xe(){var b=!0;this.enabled=function(a){arguments.length&&(b=!!a);return b};this.$get=["$parse","$sniffer","$sceDelegate",function(a,c,d){if(b&&c.msie&&8>c.msieDocumentMode)throw xa("iequirks");var e=ka(ga);e.isEnabled=function(){return b};e.trustAs=d.trustAs;e.getTrusted=d.getTrusted;e.valueOf=d.valueOf;b||(e.trustAs=e.getTrusted=function(a,b){return b},e.valueOf=Ea);e.parseAs=function(b,c){var d=a(c);return d.literal&&
d.constant?d:function k(a,c){var f=e.getTrusted(b,d(a,c));k.$$unwatch=d.$$unwatch;return f}};var f=e.parseAs,g=e.getTrusted,h=e.trustAs;q(ga,function(a,b){var c=G(b);e[Ua("parse_as_"+c)]=function(b){return f(a,b)};e[Ua("get_trusted_"+c)]=function(b){return g(a,b)};e[Ua("trust_as_"+c)]=function(b){return h(a,b)}});return e}]}function ze(){this.$get=["$window","$document",function(b,a){var c={},d=Y((/android (\d+)/.exec(G((b.navigator||{}).userAgent))||[])[1]),e=/Boxee/i.test((b.navigator||{}).userAgent),
f=a[0]||{},g=f.documentMode,h,n=/^(Moz|webkit|O|ms)(?=[A-Z])/,l=f.body&&f.body.style,m=!1,p=!1;if(l){for(var k in l)if(m=n.exec(k)){h=m[0];h=h.substr(0,1).toUpperCase()+h.substr(1);break}h||(h="WebkitOpacity"in l&&"webkit");m=!!("transition"in l||h+"Transition"in l);p=!!("animation"in l||h+"Animation"in l);!d||m&&p||(m=v(f.body.style.webkitTransition),p=v(f.body.style.webkitAnimation))}return{history:!(!b.history||!b.history.pushState||4>d||e),hashchange:"onhashchange"in b&&(!g||7<g),hasEvent:function(a){if("input"==
a&&9==W)return!1;if(y(c[a])){var b=f.createElement("div");c[a]="on"+a in b}return c[a]},csp:$b(),vendorPrefix:h,transitions:m,animations:p,android:d,msie:W,msieDocumentMode:g}}]}function Be(){this.$get=["$rootScope","$browser","$q","$$q","$exceptionHandler",function(b,a,c,d,e){function f(f,n,l){var m=E(l)&&!l,p=(m?d:c).defer(),k=p.promise;n=a.defer(function(){try{p.resolve(f())}catch(a){p.reject(a),e(a)}finally{delete g[k.$$timeoutId]}m||b.$apply()},n);k.$$timeoutId=n;g[n]=p;return k}var g={};f.cancel=
function(b){return b&&b.$$timeoutId in g?(g[b.$$timeoutId].reject("canceled"),delete g[b.$$timeoutId],a.defer.cancel(b.$$timeoutId)):!1};return f}]}function wa(b,a){var c=b;W&&(ba.setAttribute("href",c),c=ba.href);ba.setAttribute("href",c);return{href:ba.href,protocol:ba.protocol?ba.protocol.replace(/:$/,""):"",host:ba.host,search:ba.search?ba.search.replace(/^\?/,""):"",hash:ba.hash?ba.hash.replace(/^#/,""):"",hostname:ba.hostname,port:ba.port,pathname:"/"===ba.pathname.charAt(0)?ba.pathname:"/"+
ba.pathname}}function Lb(b){b=v(b)?wa(b):b;return b.protocol===Sc.protocol&&b.host===Sc.host}function Ce(){this.$get=da(N)}function nc(b){function a(d,e){if(S(d)){var f={};q(d,function(b,c){f[c]=a(c,b)});return f}return b.factory(d+c,e)}var c="Filter";this.register=a;this.$get=["$injector",function(a){return function(b){return a.get(b+c)}}];a("currency",Tc);a("date",Uc);a("filter",bf);a("json",cf);a("limitTo",df);a("lowercase",ef);a("number",Vc);a("orderBy",Wc);a("uppercase",ff)}function bf(){return function(b,
a,c){if(!M(b))return b;var d=typeof c,e=[];e.check=function(a){for(var b=0;b<e.length;b++)if(!e[b](a))return!1;return!0};"function"!==d&&(c="boolean"===d&&c?function(a,b){return Ra.equals(a,b)}:function(a,b){if(a&&b&&"object"===typeof a&&"object"===typeof b){for(var d in a)if("$"!==d.charAt(0)&&Qc.call(a,d)&&c(a[d],b[d]))return!0;return!1}b=(""+b).toLowerCase();return-1<(""+a).toLowerCase().indexOf(b)});var f=function(a,b){if("string"==typeof b&&"!"===b.charAt(0))return!f(a,b.substr(1));switch(typeof a){case "boolean":case "number":case "string":return c(a,
b);case "object":switch(typeof b){case "object":return c(a,b);default:for(var d in a)if("$"!==d.charAt(0)&&f(a[d],b))return!0}return!1;case "array":for(d=0;d<a.length;d++)if(f(a[d],b))return!0;return!1;default:return!1}};switch(typeof a){case "boolean":case "number":case "string":a={$:a};case "object":for(var g in a)(function(b){"undefined"!==typeof a[b]&&e.push(function(c){return f("$"==b?c:c&&c[b],a[b])})})(g);break;case "function":e.push(a);break;default:return b}d=[];for(g=0;g<b.length;g++){var h=
b[g];e.check(h)&&d.push(h)}return d}}function Tc(b){var a=b.NUMBER_FORMATS;return function(b,d){y(d)&&(d=a.CURRENCY_SYM);return Xc(b,a.PATTERNS[1],a.GROUP_SEP,a.DECIMAL_SEP,2).replace(/\u00A4/g,d)}}function Vc(b){var a=b.NUMBER_FORMATS;return function(b,d){return Xc(b,a.PATTERNS[0],a.GROUP_SEP,a.DECIMAL_SEP,d)}}function Xc(b,a,c,d,e){if(null==b||!isFinite(b)||S(b))return"";var f=0>b;b=Math.abs(b);var g=b+"",h="",n=[],l=!1;if(-1!==g.indexOf("e")){var m=g.match(/([\d\.]+)e(-?)(\d+)/);m&&"-"==m[2]&&
m[3]>e+1?(g="0",b=0):(h=g,l=!0)}if(l)0<e&&(-1<b&&1>b)&&(h=b.toFixed(e));else{g=(g.split(Yc)[1]||"").length;y(e)&&(e=Math.min(Math.max(a.minFrac,g),a.maxFrac));b=+(Math.round(+(b.toString()+"e"+e)).toString()+"e"+-e);b=(""+b).split(Yc);g=b[0];b=b[1]||"";var m=0,p=a.lgSize,k=a.gSize;if(g.length>=p+k)for(m=g.length-p,l=0;l<m;l++)0===(m-l)%k&&0!==l&&(h+=c),h+=g.charAt(l);for(l=m;l<g.length;l++)0===(g.length-l)%p&&0!==l&&(h+=c),h+=g.charAt(l);for(;b.length<e;)b+="0";e&&"0"!==e&&(h+=d+b.substr(0,e))}n.push(f?
a.negPre:a.posPre);n.push(h);n.push(f?a.negSuf:a.posSuf);return n.join("")}function tb(b,a,c){var d="";0>b&&(d="-",b=-b);for(b=""+b;b.length<a;)b="0"+b;c&&(b=b.substr(b.length-a));return d+b}function ca(b,a,c,d){c=c||0;return function(e){e=e["get"+b]();if(0<c||e>-c)e+=c;0===e&&-12==c&&(e=12);return tb(e,a,d)}}function ub(b,a){return function(c,d){var e=c["get"+b](),f=ib(a?"SHORT"+b:b);return d[f][e]}}function Zc(b){var a=(new Date(b,0,1)).getDay();return new Date(b,0,(4>=a?5:12)-a)}function $c(b){return function(a){var c=
Zc(a.getFullYear());a=+new Date(a.getFullYear(),a.getMonth(),a.getDate()+(4-a.getDay()))-+c;a=1+Math.round(a/6048E5);return tb(a,b)}}function Uc(b){function a(a){var b;if(b=a.match(c)){a=new Date(0);var f=0,g=0,h=b[8]?a.setUTCFullYear:a.setFullYear,n=b[8]?a.setUTCHours:a.setHours;b[9]&&(f=Y(b[9]+b[10]),g=Y(b[9]+b[11]));h.call(a,Y(b[1]),Y(b[2])-1,Y(b[3]));f=Y(b[4]||0)-f;g=Y(b[5]||0)-g;h=Y(b[6]||0);b=Math.round(1E3*parseFloat("0."+(b[7]||0)));n.call(a,f,g,h,b)}return a}var c=/^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;
return function(c,e){var f="",g=[],h,n;e=e||"mediumDate";e=b.DATETIME_FORMATS[e]||e;v(c)&&(c=gf.test(c)?Y(c):a(c));Fa(c)&&(c=new Date(c));if(!ra(c))return c;for(;e;)(n=hf.exec(e))?(g=g.concat(la.call(n,1)),e=g.pop()):(g.push(e),e=null);q(g,function(a){h=jf[a];f+=h?h(c,b.DATETIME_FORMATS):a.replace(/(^'|'$)/g,"").replace(/''/g,"'")});return f}}function cf(){return function(b){return ta(b,!0)}}function df(){return function(b,a){if(!M(b)&&!v(b))return b;a=Infinity===Math.abs(Number(a))?Number(a):Y(a);
if(v(b))return a?0<=a?b.slice(0,a):b.slice(a,b.length):"";var c=[],d,e;a>b.length?a=b.length:a<-b.length&&(a=-b.length);0<a?(d=0,e=a):(d=b.length+a,e=b.length);for(;d<e;d++)c.push(b[d]);return c}}function Wc(b){return function(a,c,d){function e(a,b){return b?function(b,c){return a(c,b)}:a}function f(a,b){var c=typeof a,d=typeof b;return c==d?("string"==c&&(a=a.toLowerCase(),b=b.toLowerCase()),a===b?0:a<b?-1:1):c<d?-1:1}if(!M(a)||!c)return a;c=M(c)?c:[c];c=nd(c,function(a){var c=!1,d=a||Ea;if(v(a)){if("+"==
a.charAt(0)||"-"==a.charAt(0))c="-"==a.charAt(0),a=a.substring(1);d=b(a);if(d.constant){var g=d();return e(function(a,b){return f(a[g],b[g])},c)}}return e(function(a,b){return f(d(a),d(b))},c)});for(var g=[],h=0;h<a.length;h++)g.push(a[h]);return g.sort(e(function(a,b){for(var d=0;d<c.length;d++){var e=c[d](a,b);if(0!==e)return e}return 0},d))}}function ya(b){P(b)&&(b={link:b});b.restrict=b.restrict||"AC";return da(b)}function ad(b,a,c,d){function e(a,c){c=c?"-"+hb(c,"-"):"";d.removeClass(b,(a?vb:
wb)+c);d.addClass(b,(a?wb:vb)+c)}var f=this,g=b.parent().controller("form")||xb,h=0,n=f.$error={},l=[];f.$name=a.name||a.ngForm;f.$dirty=!1;f.$pristine=!0;f.$valid=!0;f.$invalid=!1;g.$addControl(f);b.addClass(Na);e(!0);f.$rollbackViewValue=function(){q(l,function(a){a.$rollbackViewValue()})};f.$commitViewValue=function(){q(l,function(a){a.$commitViewValue()})};f.$addControl=function(a){Ca(a.$name,"input");l.push(a);a.$name&&(f[a.$name]=a)};f.$removeControl=function(a){a.$name&&f[a.$name]===a&&delete f[a.$name];
q(n,function(b,c){f.$setValidity(c,!0,a)});Ga(l,a)};f.$setValidity=function(a,b,c){var d=n[a];if(b)d&&(Ga(d,c),d.length||(h--,h||(e(b),f.$valid=!0,f.$invalid=!1),n[a]=!1,e(!0,a),g.$setValidity(a,!0,f)));else{h||e(b);if(d){if(-1!=Pa(d,c))return}else n[a]=d=[],h++,e(!1,a),g.$setValidity(a,!1,f);d.push(c);f.$valid=!1;f.$invalid=!0}};f.$setDirty=function(){d.removeClass(b,Na);d.addClass(b,yb);f.$dirty=!0;f.$pristine=!1;g.$setDirty()};f.$setPristine=function(){d.removeClass(b,yb);d.addClass(b,Na);f.$dirty=
!1;f.$pristine=!0;q(l,function(a){a.$setPristine()})}}function Tb(b,a,c,d){b.$setValidity(a,c);return c?d:r}function bd(b,a){var c,d;if(a)for(c=0;c<a.length;++c)if(d=a[c],b[d])return!0;return!1}function kf(b,a,c,d,e){S(e)&&(b.$$hasNativeValidators=!0,b.$parsers.push(function(f){if(b.$error[a]||bd(e,d)||!bd(e,c))return f;b.$setValidity(a,!1)}))}function ab(b,a,c,d,e,f){var g=a.prop(lf),h=a[0].placeholder,n={};d.$$validityState=g;if(!e.android){var l=!1;a.on("compositionstart",function(a){l=!0});a.on("compositionend",
function(){l=!1;m()})}var m=function(e){if(!l){var f=a.val(),k=e&&e.type;if(W&&"input"===(e||n).type&&a[0].placeholder!==h)h=a[0].placeholder;else{c.ngTrim&&"false"===c.ngTrim||(f=aa(f));var m=g&&d.$$hasNativeValidators;if(d.$viewValue!==f||""===f&&m)b.$$phase?d.$setViewValue(f,k,m):b.$apply(function(){d.$setViewValue(f,k,m)})}}};if(e.hasEvent("input"))a.on("input",m);else{var p,k=function(a){p||(p=f.defer(function(){m(a);p=null}))};a.on("keydown",function(a){var b=a.keyCode;91===b||(15<b&&19>b||
37<=b&&40>=b)||k(a)});if(e.hasEvent("paste"))a.on("paste cut",k)}a.on("change",m);d.$render=function(){a.val(d.$isEmpty(d.$viewValue)?"":d.$viewValue)}}function zb(b,a){return function(c){var d;return ra(c)?c:v(c)&&(b.lastIndex=0,c=b.exec(c))?(c.shift(),d={yyyy:0,MM:1,dd:1,HH:0,mm:0},q(c,function(b,c){c<a.length&&(d[a[c]]=+b)}),new Date(d.yyyy,d.MM-1,d.dd,d.HH,d.mm)):NaN}}function bb(b,a,c,d){return function(e,f,g,h,n,l,m){ab(e,f,g,h,n,l);h.$parsers.push(function(d){if(h.$isEmpty(d))return h.$setValidity(b,
!0),null;if(a.test(d))return h.$setValidity(b,!0),c(d);h.$setValidity(b,!1);return r});h.$formatters.push(function(a){return ra(a)?m("date")(a,d):""});g.min&&(e=function(a){var b=h.$isEmpty(a)||c(a)>=c(g.min);h.$setValidity("min",b);return b?a:r},h.$parsers.push(e),h.$formatters.push(e));g.max&&(e=function(a){var b=h.$isEmpty(a)||c(a)<=c(g.max);h.$setValidity("max",b);return b?a:r},h.$parsers.push(e),h.$formatters.push(e))}}function cd(b,a,c,d,e){if(E(d)){b=b(d);if(!b.constant)throw(new L("ngModel"))("constexpr",
"Expected constant expression for `{0}`, but saw `{1}`.",c,d);return b(a)}return e}function Ub(b,a){b="ngClass"+b;return["$animate",function(c){function d(a,b){var c=[],d=0;a:for(;d<a.length;d++){for(var e=a[d],m=0;m<b.length;m++)if(e==b[m])continue a;c.push(e)}return c}function e(a){if(!M(a)){if(v(a))return a.split(" ");if(S(a)){var b=[];q(a,function(a,c){a&&(b=b.concat(c.split(" ")))});return b}}return a}return{restrict:"AC",link:function(f,g,h){function n(a,b){var c=g.data("$classCounts")||{},
d=[];q(a,function(a){if(0<b||c[a])c[a]=(c[a]||0)+b,c[a]===+(0<b)&&d.push(a)});g.data("$classCounts",c);return d.join(" ")}function l(b){if(!0===a||f.$index%2===a){var k=e(b||[]);if(!m){var l=n(k,1);h.$addClass(l)}else if(!sa(b,m)){var q=e(m),l=d(k,q),k=d(q,k),k=n(k,-1),l=n(l,1);0===l.length?c.removeClass(g,k):0===k.length?c.addClass(g,l):c.setClass(g,l,k)}}m=ka(b)}var m;f.$watch(h[b],l,!0);h.$observe("class",function(a){l(f.$eval(h[b]))});"ngClass"!==b&&f.$watch("$index",function(c,d){var g=c&1;if(g!==
(d&1)){var l=e(f.$eval(h[b]));g===a?(g=n(l,1),h.$addClass(g)):(g=n(l,-1),h.$removeClass(g))}})}}}]}var mf=/^\/(.+)\/([a-z]*)$/,lf="validity",G=function(b){return v(b)?b.toLowerCase():b},Qc=Object.prototype.hasOwnProperty,ib=function(b){return v(b)?b.toUpperCase():b},W,C,ua,la=[].slice,sc=[].push,za=Object.prototype.toString,Qa=L("ng"),Ra=N.angular||(N.angular={}),Ta,na,eb=0;W=Y((/msie (\d+)/.exec(G(navigator.userAgent))||[])[1]);isNaN(W)&&(W=Y((/trident\/.*; rv:(\d+)/.exec(G(navigator.userAgent))||
[])[1]));A.$inject=[];Ea.$inject=[];var M=function(){return P(Array.isArray)?Array.isArray:function(b){return"[object Array]"===za.call(b)}}(),aa=function(){return String.prototype.trim?function(b){return v(b)?b.trim():b}:function(b){return v(b)?b.replace(/^\s\s*/,"").replace(/\s\s*$/,""):b}}();na=9>W?function(b){b=b.nodeName?b:b[0];return G(b.scopeName&&"HTML"!=b.scopeName?b.scopeName+":"+b.nodeName:b.nodeName)}:function(b){return G(b.nodeName?b.nodeName:b[0].nodeName)};var dc=["ng-","data-ng-",
"ng:","x-ng-"],rd=/[A-Z]/g,vd={full:"1.3.0-build.2871+sha.63e8952",major:1,minor:3,dot:0,codeName:"snapshot"};Q.expando="ng339";var Wa=Q.cache={},Le=1,qb=N.document.addEventListener?function(b,a,c){b.addEventListener(a,c,!1)}:function(b,a,c){b.attachEvent("on"+a,c)},Va=N.document.removeEventListener?function(b,a,c){b.removeEventListener(a,c,!1)}:function(b,a,c){b.detachEvent("on"+a,c)};Q._data=function(b){return this.cache[b[this.expando]]||{}};var Fe=/([\:\-\_]+(.))/g,Ge=/^moz([A-Z])/,Gb=L("jqLite"),
Ke=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,Fb=/<|&#?\w+;/,Ie=/<([\w:]+)/,Je=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,fa={option:[1,'<select multiple="multiple">',"</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};fa.optgroup=fa.option;fa.tbody=fa.tfoot=fa.colgroup=fa.caption=fa.thead;fa.th=fa.td;var Ha=Q.prototype={ready:function(b){function a(){c||
(c=!0,b())}var c=!1;"complete"===U.readyState?setTimeout(a):(this.on("DOMContentLoaded",a),Q(N).on("load",a))},toString:function(){var b=[];q(this,function(a){b.push(""+a)});return"["+b.join(", ")+"]"},eq:function(b){return 0<=b?C(this[b]):C(this[this.length+b])},length:0,push:sc,sort:[].sort,splice:[].splice},nb={};q("multiple selected checked disabled readOnly required open".split(" "),function(b){nb[G(b)]=b});var wc={};q("input select option textarea button form details".split(" "),function(b){wc[b]=
!0});var xc={ngMinlength:"minlength",ngMaxlength:"maxlength",ngPattern:"pattern"};q({data:rc,inheritedData:mb,scope:function(b){return C(b).data("$scope")||mb(b.parentNode||b,["$isolateScope","$scope"])},isolateScope:function(b){return C(b).data("$isolateScope")||C(b).data("$isolateScopeNoTemplate")},controller:tc,injector:function(b){return mb(b,"$injector")},removeAttr:function(b,a){b.removeAttribute(a)},hasClass:Ib,css:function(b,a,c){a=Ua(a);if(E(c))b.style[a]=c;else{var d;8>=W&&(d=b.currentStyle&&
b.currentStyle[a],""===d&&(d="auto"));d=d||b.style[a];8>=W&&(d=""===d?r:d);return d}},attr:function(b,a,c){var d=G(a);if(nb[d])if(E(c))c?(b[a]=!0,b.setAttribute(a,d)):(b[a]=!1,b.removeAttribute(d));else return b[a]||(b.attributes.getNamedItem(a)||A).specified?d:r;else if(E(c))b.setAttribute(a,c);else if(b.getAttribute)return b=b.getAttribute(a,2),null===b?r:b},prop:function(b,a,c){if(E(c))b[a]=c;else return b[a]},text:function(){function b(a,b){if(y(b)){var d=a.nodeType;return 1===d||3===d?a.textContent:
""}a.textContent=b}b.$dv="";return b}(),val:function(b,a){if(y(a)){if(b.multiple&&"select"===na(b)){var c=[];q(b.options,function(a){a.selected&&c.push(a.value||a.text)});return 0===c.length?null:c}return b.value}b.value=a},html:function(b,a){if(y(a))return b.innerHTML;for(var c=0,d=b.childNodes;c<d.length;c++)Ia(d[c]);b.innerHTML=a},empty:uc},function(b,a){Q.prototype[a]=function(a,d){var e,f,g=this.length;if(b!==uc&&(2==b.length&&b!==Ib&&b!==tc?a:d)===r){if(S(a)){for(e=0;e<g;e++)if(b===rc)b(this[e],
a);else for(f in a)b(this[e],f,a[f]);return this}e=b.$dv;g=e===r?Math.min(g,1):g;for(f=0;f<g;f++){var h=b(this[f],a,d);e=e?e+h:h}return e}for(e=0;e<g;e++)b(this[e],a,d);return this}});q({removeData:pc,dealoc:Ia,on:function a(c,d,e,f){if(E(f))throw Gb("onargs");if(!c.nodeType||1===c.nodeType||9===c.nodeType){var g=ma(c,"events"),h=ma(c,"handle");g||ma(c,"events",g={});h||ma(c,"handle",h=Ne(c,g));q(d.split(" "),function(d){var f=g[d];if(!f){if("mouseenter"==d||"mouseleave"==d){var m=U.body.contains||
U.body.compareDocumentPosition?function(a,c){var d=9===a.nodeType?a.documentElement:a,e=c&&c.parentNode;return a===e||!!(e&&1===e.nodeType&&(d.contains?d.contains(e):a.compareDocumentPosition&&a.compareDocumentPosition(e)&16))}:function(a,c){if(c)for(;c=c.parentNode;)if(c===a)return!0;return!1};g[d]=[];a(c,{mouseleave:"mouseout",mouseenter:"mouseover"}[d],function(a){var c=a.relatedTarget;c&&(c===this||m(this,c))||h(a,d)})}else qb(c,d,h),g[d]=[];f=g[d]}f.push(e)})}},off:qc,one:function(a,c,d){a=C(a);
a.on(c,function f(){a.off(c,d);a.off(c,f)});a.on(c,d)},replaceWith:function(a,c){var d,e=a.parentNode;Ia(a);q(new Q(c),function(c){d?e.insertBefore(c,d.nextSibling):e.replaceChild(c,a);d=c})},children:function(a){var c=[];q(a.childNodes,function(a){1===a.nodeType&&c.push(a)});return c},contents:function(a){return a.contentDocument||a.childNodes||[]},append:function(a,c){q(new Q(c),function(c){1!==a.nodeType&&11!==a.nodeType||a.appendChild(c)})},prepend:function(a,c){if(1===a.nodeType){var d=a.firstChild;
q(new Q(c),function(c){a.insertBefore(c,d)})}},wrap:function(a,c){c=C(c)[0];var d=a.parentNode;d&&d.replaceChild(c,a);c.appendChild(a)},remove:function(a){Ia(a);var c=a.parentNode;c&&c.removeChild(a)},after:function(a,c){var d=a,e=a.parentNode;q(new Q(c),function(a){e.insertBefore(a,d.nextSibling);d=a})},addClass:lb,removeClass:kb,toggleClass:function(a,c,d){c&&q(c.split(" "),function(c){var f=d;y(f)&&(f=!Ib(a,c));(f?lb:kb)(a,c)})},parent:function(a){return(a=a.parentNode)&&11!==a.nodeType?a:null},
next:function(a){if(a.nextElementSibling)return a.nextElementSibling;for(a=a.nextSibling;null!=a&&1!==a.nodeType;)a=a.nextSibling;return a},find:function(a,c){return a.getElementsByTagName?a.getElementsByTagName(c):[]},clone:Hb,triggerHandler:function(a,c,d){c=(ma(a,"events")||{})[c];d=d||[];var e=[{preventDefault:function(){this.defaultPrevented=!0},isDefaultPrevented:function(){return!0===this.defaultPrevented},stopPropagation:A}];q(c,function(c){c.apply(a,e.concat(d))})}},function(a,c){Q.prototype[c]=
function(c,e,f){for(var g,h=0;h<this.length;h++)y(g)?(g=a(this[h],c,e,f),E(g)&&(g=C(g))):oc(g,a(this[h],c,e,f));return E(g)?g:this};Q.prototype.bind=Q.prototype.on;Q.prototype.unbind=Q.prototype.off});Xa.prototype={put:function(a,c){this[Ja(a,this.nextUid)]=c},get:function(a){return this[Ja(a,this.nextUid)]},remove:function(a){var c=this[a=Ja(a,this.nextUid)];delete this[a];return c}};var zc=/^function\s*[^\(]*\(\s*([^\)]*)\)/m,Pe=/,/,Qe=/^\s*(_?)(\S+?)\1\s*$/,yc=/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg,
Ka=L("$injector");Cb.$$annotate=Jb;var nf=L("$animate"),he=["$provide",function(a){this.$$selectors={};this.register=function(c,d){var e=c+"-animation";if(c&&"."!=c.charAt(0))throw nf("notcsel",c);this.$$selectors[c.substr(1)]=e;a.factory(e,d)};this.classNameFilter=function(a){1===arguments.length&&(this.$$classNameFilter=a instanceof RegExp?a:null);return this.$$classNameFilter};this.$get=["$timeout","$$asyncCallback",function(a,d){return{enter:function(a,c,g,h){g?g.after(a):c.prepend(a);h&&d(h);
return A},leave:function(a,c){a.remove();c&&d(c);return A},move:function(a,c,d,h){return this.enter(a,c,d,h)},addClass:function(a,c,g){c=v(c)?c:M(c)?c.join(" "):"";q(a,function(a){lb(a,c)});g&&d(g);return A},removeClass:function(a,c,g){c=v(c)?c:M(c)?c.join(" "):"";q(a,function(a){kb(a,c)});g&&d(g);return A},setClass:function(a,c,g,h){q(a,function(a){lb(a,c);kb(a,g)});h&&d(h);return A},enabled:A}}]}],ia=L("$compile");gc.$inject=["$provide","$$sanitizeUriProvider"];var Ve=/^(x[\:\-_]|data[\:\-_])/i,
Ic=L("$interpolate"),of=/^([^\?#]*)(\?([^#]*))?(#(.*))?$/,Ye={http:80,https:443,ftp:21},Ob=L("$location");Qb.prototype=Pb.prototype=Lc.prototype={$$html5:!1,$$replace:!1,absUrl:rb("$$absUrl"),url:function(a,c){if(y(a))return this.$$url;var d=of.exec(a);d[1]&&this.path(decodeURIComponent(d[1]));(d[2]||d[1])&&this.search(d[3]||"");this.hash(d[5]||"",c);return this},protocol:rb("$$protocol"),host:rb("$$host"),port:rb("$$port"),path:Mc("$$path",function(a){return"/"==a.charAt(0)?a:"/"+a}),search:function(a,
c){switch(arguments.length){case 0:return this.$$search;case 1:if(v(a))this.$$search=cc(a);else if(S(a))q(a,function(c,e){null==c&&delete a[e]}),this.$$search=a;else throw Ob("isrcharg");break;default:y(c)||null===c?delete this.$$search[a]:this.$$search[a]=c}this.$$compose();return this},hash:Mc("$$hash",Ea),replace:function(){this.$$replace=!0;return this}};var ja=L("$parse"),pf=Function.prototype.call,qf=Function.prototype.apply,rf=Function.prototype.bind,cb={"null":function(){return null},"true":function(){return!0},
"false":function(){return!1},undefined:A,"+":function(a,c,d,e){d=d(a,c);e=e(a,c);return E(d)?E(e)?d+e:d:E(e)?e:r},"-":function(a,c,d,e){d=d(a,c);e=e(a,c);return(E(d)?d:0)-(E(e)?e:0)},"*":function(a,c,d,e){return d(a,c)*e(a,c)},"/":function(a,c,d,e){return d(a,c)/e(a,c)},"%":function(a,c,d,e){return d(a,c)%e(a,c)},"^":function(a,c,d,e){return d(a,c)^e(a,c)},"=":A,"===":function(a,c,d,e){return d(a,c)===e(a,c)},"!==":function(a,c,d,e){return d(a,c)!==e(a,c)},"==":function(a,c,d,e){return d(a,c)==e(a,
c)},"!=":function(a,c,d,e){return d(a,c)!=e(a,c)},"<":function(a,c,d,e){return d(a,c)<e(a,c)},">":function(a,c,d,e){return d(a,c)>e(a,c)},"<=":function(a,c,d,e){return d(a,c)<=e(a,c)},">=":function(a,c,d,e){return d(a,c)>=e(a,c)},"&&":function(a,c,d,e){return d(a,c)&&e(a,c)},"||":function(a,c,d,e){return d(a,c)||e(a,c)},"&":function(a,c,d,e){return d(a,c)&e(a,c)},"|":function(a,c,d,e){return e(a,c)(a,c,d(a,c))},"!":function(a,c,d){return!d(a,c)}},sf={n:"\n",f:"\f",r:"\r",t:"\t",v:"\v","'":"'",'"':'"'},
Sb=function(a){this.options=a};Sb.prototype={constructor:Sb,lex:function(a){this.text=a;this.index=0;this.ch=r;for(this.tokens=[];this.index<this.text.length;)if(this.ch=this.text.charAt(this.index),this.is("\"'"))this.readString(this.ch);else if(this.isNumber(this.ch)||this.is(".")&&this.isNumber(this.peek()))this.readNumber();else if(this.isIdent(this.ch))this.readIdent();else if(this.is("(){}[].,;:?"))this.tokens.push({index:this.index,text:this.ch}),this.index++;else if(this.isWhitespace(this.ch))this.index++;
else{a=this.ch+this.peek();var c=a+this.peek(2),d=cb[this.ch],e=cb[a],f=cb[c];f?(this.tokens.push({index:this.index,text:c,fn:f}),this.index+=3):e?(this.tokens.push({index:this.index,text:a,fn:e}),this.index+=2):d?(this.tokens.push({index:this.index,text:this.ch,fn:d}),this.index+=1):this.throwError("Unexpected next character ",this.index,this.index+1)}return this.tokens},is:function(a){return-1!==a.indexOf(this.ch)},peek:function(a){a=a||1;return this.index+a<this.text.length?this.text.charAt(this.index+
a):!1},isNumber:function(a){return"0"<=a&&"9">=a},isWhitespace:function(a){return" "===a||"\r"===a||"\t"===a||"\n"===a||"\v"===a||"\u00a0"===a},isIdent:function(a){return"a"<=a&&"z">=a||"A"<=a&&"Z">=a||"_"===a||"$"===a},isExpOperator:function(a){return"-"===a||"+"===a||this.isNumber(a)},throwError:function(a,c,d){d=d||this.index;c=E(c)?"s "+c+"-"+this.index+" ["+this.text.substring(c,d)+"]":" "+d;throw ja("lexerr",a,c,this.text);},readNumber:function(){for(var a="",c=this.index;this.index<this.text.length;){var d=
G(this.text.charAt(this.index));if("."==d||this.isNumber(d))a+=d;else{var e=this.peek();if("e"==d&&this.isExpOperator(e))a+=d;else if(this.isExpOperator(d)&&e&&this.isNumber(e)&&"e"==a.charAt(a.length-1))a+=d;else if(!this.isExpOperator(d)||e&&this.isNumber(e)||"e"!=a.charAt(a.length-1))break;else this.throwError("Invalid exponent")}this.index++}a*=1;this.tokens.push({index:c,text:a,constant:!0,fn:function(){return a}})},readIdent:function(){for(var a=this,c="",d=this.index,e,f,g,h;this.index<this.text.length;){h=
this.text.charAt(this.index);if("."===h||this.isIdent(h)||this.isNumber(h))"."===h&&(e=this.index),c+=h;else break;this.index++}if(e)for(f=this.index;f<this.text.length;){h=this.text.charAt(f);if("("===h){g=c.substr(e-d+1);c=c.substr(0,e-d);this.index=f;break}if(this.isWhitespace(h))f++;else break}d={index:d,text:c};if(cb.hasOwnProperty(c))d.fn=cb[c],d.constant=!0;else{var n=Oc(c,this.options,this.text);d.fn=z(function(a,c){return n(a,c)},{assign:function(d,e){return sb(d,c,e,a.text)}})}this.tokens.push(d);
g&&(this.tokens.push({index:e,text:"."}),this.tokens.push({index:e+1,text:g}))},readString:function(a){var c=this.index;this.index++;for(var d="",e=a,f=!1;this.index<this.text.length;){var g=this.text.charAt(this.index),e=e+g;if(f)"u"===g?(g=this.text.substring(this.index+1,this.index+5),g.match(/[\da-f]{4}/i)||this.throwError("Invalid unicode escape [\\u"+g+"]"),this.index+=4,d+=String.fromCharCode(parseInt(g,16))):d=(f=sf[g])?d+f:d+g,f=!1;else if("\\"===g)f=!0;else{if(g===a){this.index++;this.tokens.push({index:c,
text:e,string:d,constant:!0,fn:function(){return d}});return}d+=g}this.index++}this.throwError("Unterminated quote",c)}};var $a=function(a,c,d){this.lexer=a;this.$filter=c;this.options=d};$a.ZERO=z(function(){return 0},{constant:!0});$a.prototype={constructor:$a,parse:function(a){this.text=a;this.tokens=this.lexer.lex(a);a=this.statements();0!==this.tokens.length&&this.throwError("is an unexpected token",this.tokens[0]);a.literal=!!a.literal;a.constant=!!a.constant;return a},primary:function(){var a;
if(this.expect("("))a=this.filterChain(),this.consume(")");else if(this.expect("["))a=this.arrayDeclaration();else if(this.expect("{"))a=this.object();else{var c=this.expect();(a=c.fn)||this.throwError("not a primary expression",c);c.constant&&(a.constant=!0,a.literal=!0)}for(var d;c=this.expect("(","[",".");)"("===c.text?(a=this.functionCall(a,d),d=null):"["===c.text?(d=a,a=this.objectIndex(a)):"."===c.text?(d=a,a=this.fieldAccess(a)):this.throwError("IMPOSSIBLE");return a},throwError:function(a,
c){throw ja("syntax",c.text,a,c.index+1,this.text,this.text.substring(c.index));},peekToken:function(){if(0===this.tokens.length)throw ja("ueoe",this.text);return this.tokens[0]},peek:function(a,c,d,e){if(0<this.tokens.length){var f=this.tokens[0],g=f.text;if(g===a||g===c||g===d||g===e||!(a||c||d||e))return f}return!1},expect:function(a,c,d,e){return(a=this.peek(a,c,d,e))?(this.tokens.shift(),a):!1},consume:function(a){this.expect(a)||this.throwError("is unexpected, expecting ["+a+"]",this.peek())},
unaryFn:function(a,c){return z(function(d,e){return a(d,e,c)},{constant:c.constant})},ternaryFn:function(a,c,d){return z(function(e,f){return a(e,f)?c(e,f):d(e,f)},{constant:a.constant&&c.constant&&d.constant})},binaryFn:function(a,c,d){return z(function(e,f){return c(e,f,a,d)},{constant:a.constant&&d.constant})},statements:function(){for(var a=[];;)if(0<this.tokens.length&&!this.peek("}",")",";","]")&&a.push(this.filterChain()),!this.expect(";"))return 1===a.length?a[0]:function(c,d){for(var e,f=
0;f<a.length;f++){var g=a[f];g&&(e=g(c,d))}return e}},filterChain:function(){for(var a=this.expression(),c;;)if(c=this.expect("|"))a=this.binaryFn(a,c.fn,this.filter());else return a},filter:function(){for(var a=this.expect(),c=this.$filter(a.text),d=[];this.expect(":");)d.push(this.expression());return da(function(a,f,g){g=[g];for(var h=0;h<d.length;h++)g.push(d[h](a,f));return c.apply(a,g)})},expression:function(){return this.assignment()},assignment:function(){var a=this.ternary(),c,d;return(d=
this.expect("="))?(a.assign||this.throwError("implies assignment but ["+this.text.substring(0,d.index)+"] can not be assigned to",d),c=this.ternary(),function(d,f){return a.assign(d,c(d,f),f)}):a},ternary:function(){var a=this.logicalOR(),c,d;if(this.expect("?")){c=this.ternary();if(d=this.expect(":"))return this.ternaryFn(a,c,this.ternary());this.throwError("expected :",d)}else return a},logicalOR:function(){for(var a=this.logicalAND(),c;;)if(c=this.expect("||"))a=this.binaryFn(a,c.fn,this.logicalAND());
else return a},logicalAND:function(){var a=this.equality(),c;if(c=this.expect("&&"))a=this.binaryFn(a,c.fn,this.logicalAND());return a},equality:function(){var a=this.relational(),c;if(c=this.expect("==","!=","===","!=="))a=this.binaryFn(a,c.fn,this.equality());return a},relational:function(){var a=this.additive(),c;if(c=this.expect("<",">","<=",">="))a=this.binaryFn(a,c.fn,this.relational());return a},additive:function(){for(var a=this.multiplicative(),c;c=this.expect("+","-");)a=this.binaryFn(a,
c.fn,this.multiplicative());return a},multiplicative:function(){for(var a=this.unary(),c;c=this.expect("*","/","%");)a=this.binaryFn(a,c.fn,this.unary());return a},unary:function(){var a;return this.expect("+")?this.primary():(a=this.expect("-"))?this.binaryFn($a.ZERO,a.fn,this.unary()):(a=this.expect("!"))?this.unaryFn(a.fn,this.unary()):this.primary()},fieldAccess:function(a){var c=this,d=this.expect().text,e=Oc(d,this.options,this.text);return z(function(c,d,h){return e(h||a(c,d))},{assign:function(e,
g,h){return sb(a(e,h),d,g,c.text)}})},objectIndex:function(a){var c=this,d=this.expression();this.consume("]");return z(function(e,f){var g=a(e,f),h=d(e,f);ea(h,c.text);return g?Ma(g[h],c.text):r},{assign:function(e,f,g){var h=d(e,g);return Ma(a(e,g),c.text)[h]=f}})},functionCall:function(a,c){var d=[];if(")"!==this.peekToken().text){do d.push(this.expression());while(this.expect(","))}this.consume(")");var e=this;return function(f,g){for(var h=[],n=c?c(f,g):f,l=0;l<d.length;l++)h.push(d[l](f,g));
l=a(f,g,n)||A;Ma(n,e.text);var m=e.text;if(l){if(l.constructor===l)throw ja("isecfn",m);if(l===pf||l===qf||l===rf)throw ja("isecff",m);}h=l.apply?l.apply(n,h):l(h[0],h[1],h[2],h[3],h[4]);return Ma(h,e.text)}},arrayDeclaration:function(){var a=[],c=!0;if("]"!==this.peekToken().text){do{if(this.peek("]"))break;var d=this.expression();a.push(d);d.constant||(c=!1)}while(this.expect(","))}this.consume("]");return z(function(c,d){for(var g=[],h=0;h<a.length;h++)g.push(a[h](c,d));return g},{literal:!0,constant:c})},
object:function(){var a=[],c=!0;if("}"!==this.peekToken().text){do{if(this.peek("}"))break;var d=this.expect(),d=d.string||d.text;this.consume(":");var e=this.expression();a.push({key:d,value:e});e.constant||(c=!1)}while(this.expect(","))}this.consume("}");return z(function(c,d){for(var e={},n=0;n<a.length;n++){var l=a[n];e[l.key]=l.value(c,d)}return e},{literal:!0,constant:c})}};var Rb={},xa=L("$sce"),ga={HTML:"html",CSS:"css",URL:"url",RESOURCE_URL:"resourceUrl",JS:"js"},ba=U.createElement("a"),
Sc=wa(N.location.href,!0);nc.$inject=["$provide"];Tc.$inject=["$locale"];Vc.$inject=["$locale"];var Yc=".",jf={yyyy:ca("FullYear",4),yy:ca("FullYear",2,0,!0),y:ca("FullYear",1),MMMM:ub("Month"),MMM:ub("Month",!0),MM:ca("Month",2,1),M:ca("Month",1,1),dd:ca("Date",2),d:ca("Date",1),HH:ca("Hours",2),H:ca("Hours",1),hh:ca("Hours",2,-12),h:ca("Hours",1,-12),mm:ca("Minutes",2),m:ca("Minutes",1),ss:ca("Seconds",2),s:ca("Seconds",1),sss:ca("Milliseconds",3),EEEE:ub("Day"),EEE:ub("Day",!0),a:function(a,c){return 12>
a.getHours()?c.AMPMS[0]:c.AMPMS[1]},Z:function(a){a=-1*a.getTimezoneOffset();return a=(0<=a?"+":"")+(tb(Math[0<a?"floor":"ceil"](a/60),2)+tb(Math.abs(a%60),2))},ww:$c(2),w:$c(1)},hf=/((?:[^yMdHhmsaZEw']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z|w+))(.*)/,gf=/^\-?\d+$/;Uc.$inject=["$locale"];var ef=da(G),ff=da(ib);Wc.$inject=["$parse"];var yd=da({restrict:"E",compile:function(a,c){8>=W&&(c.href||c.name||c.$set("href",""),a.append(U.createComment("IE fix")));if(!c.href&&!c.xlinkHref&&!c.name)return function(a,
c){var f="[object SVGAnimatedString]"===za.call(c.prop("href"))?"xlink:href":"href";c.on("click",function(a){c.attr(f)||a.preventDefault()})}}}),jb={};q(nb,function(a,c){if("multiple"!=a){var d=pa("ng-"+c);jb[d]=function(){return{priority:100,link:function(a,f,g){a.$watch(g[d],function(a){g.$set(c,!!a)})}}}}});q(xc,function(a,c){jb[c]=function(){return{priority:100,link:function(a,e,f){if("ngPattern"===c&&"/"==f.ngPattern.charAt(0)&&(e=f.ngPattern.match(mf))){f.$set("ngPattern",RegExp(e[1],e[2]));
return}a.$watch(f[c],function(a){f.$set(c,a)})}}}});q(["src","srcset","href"],function(a){var c=pa("ng-"+a);jb[c]=function(){return{priority:99,link:function(d,e,f){var g=a,h=a;"href"===a&&"[object SVGAnimatedString]"===za.call(e.prop("href"))&&(h="xlinkHref",f.$attr[h]="xlink:href",g=null);f.$observe(c,function(a){a&&(f.$set(h,a),W&&g&&e.prop(g,f[h]))})}}}});var xb={$addControl:A,$removeControl:A,$setValidity:A,$setDirty:A,$setPristine:A};ad.$inject=["$element","$attrs","$scope","$animate"];var dd=
function(a){return["$timeout",function(c){return{name:"form",restrict:a?"EAC":"E",controller:ad,compile:function(){return{pre:function(a,e,f,g){if(!f.action){var h=function(c){a.$apply(function(){g.$commitViewValue()});c.preventDefault?c.preventDefault():c.returnValue=!1};qb(e[0],"submit",h);e.on("$destroy",function(){c(function(){Va(e[0],"submit",h)},0,!1)})}var n=e.parent().controller("form"),l=f.name||f.ngForm;l&&sb(a,l,g,l);if(n)e.on("$destroy",function(){n.$removeControl(g);l&&sb(a,l,r,l);z(g,
xb)})}}}}}]},zd=dd(),Md=dd(!0),tf=/^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,uf=/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*$/i,vf=/^\s*(\-|\+)?(\d+|(\d*(\.\d*)))\s*$/,ed=/^(\d{4})-(\d{2})-(\d{2})$/,fd=/^(\d{4})-(\d\d)-(\d\d)T(\d\d):(\d\d)$/,Vb=/^(\d{4})-W(\d\d)$/,gd=/^(\d{4})-(\d\d)$/,hd=/^(\d\d):(\d\d)$/,wf=/(\s+|^)default(\s+|$)/,id={text:ab,date:bb("date",ed,zb(ed,["yyyy","MM","dd"]),"yyyy-MM-dd"),"datetime-local":bb("datetimelocal",fd,
zb(fd,["yyyy","MM","dd","HH","mm"]),"yyyy-MM-ddTHH:mm"),time:bb("time",hd,zb(hd,["HH","mm"]),"HH:mm"),week:bb("week",Vb,function(a){if(ra(a))return a;if(v(a)){Vb.lastIndex=0;var c=Vb.exec(a);if(c){a=+c[1];var d=+c[2],c=Zc(a),d=7*(d-1);return new Date(a,0,c.getDate()+d)}}return NaN},"yyyy-Www"),month:bb("month",gd,zb(gd,["yyyy","MM"]),"yyyy-MM"),number:function(a,c,d,e,f,g){ab(a,c,d,e,f,g);e.$parsers.push(function(a){var c=e.$isEmpty(a);if(c||vf.test(a))return e.$setValidity("number",!0),""===a?null:
c?a:parseFloat(a);e.$setValidity("number",!1);return r});kf(e,"number",xf,null,e.$$validityState);e.$formatters.push(function(a){return e.$isEmpty(a)?"":""+a});d.min&&(a=function(a){var c=parseFloat(d.min);return Tb(e,"min",e.$isEmpty(a)||a>=c,a)},e.$parsers.push(a),e.$formatters.push(a));d.max&&(a=function(a){var c=parseFloat(d.max);return Tb(e,"max",e.$isEmpty(a)||a<=c,a)},e.$parsers.push(a),e.$formatters.push(a));e.$formatters.push(function(a){return Tb(e,"number",e.$isEmpty(a)||Fa(a),a)})},url:function(a,
c,d,e,f,g){ab(a,c,d,e,f,g);e.$validators.url=function(a,c){var d=a||c;return e.$isEmpty(d)||tf.test(d)}},email:function(a,c,d,e,f,g){ab(a,c,d,e,f,g);e.$validators.email=function(a,c){var d=a||c;return e.$isEmpty(d)||uf.test(d)}},radio:function(a,c,d,e){y(d.name)&&c.attr("name",++eb);c.on("click",function(f){c[0].checked&&a.$apply(function(){e.$setViewValue(d.value,f&&f.type)})});e.$render=function(){c[0].checked=d.value==e.$viewValue};d.$observe("value",e.$render)},checkbox:function(a,c,d,e,f,g,h,
n){var l=cd(n,a,"ngTrueValue",d.ngTrueValue,!0),m=cd(n,a,"ngFalseValue",d.ngFalseValue,!1);c.on("click",function(d){a.$apply(function(){e.$setViewValue(c[0].checked,d&&d.type)})});e.$render=function(){c[0].checked=e.$viewValue};e.$isEmpty=function(a){return a!==l};e.$formatters.push(function(a){return sa(a,l)});e.$parsers.push(function(a){return a?l:m})},hidden:A,button:A,submit:A,reset:A,file:A},xf=["badInput"],hc=["$browser","$sniffer","$filter","$parse",function(a,c,d,e){return{restrict:"E",require:["?ngModel"],
link:function(f,g,h,n){n[0]&&(id[G(h.type)]||id.text)(f,g,h,n[0],c,a,d,e)}}}],wb="ng-valid",vb="ng-invalid",Na="ng-pristine",yb="ng-dirty",yf=["$scope","$exceptionHandler","$attrs","$element","$parse","$animate","$timeout",function(a,c,d,e,f,g,h){function n(a,c){c=c?"-"+hb(c,"-"):"";g.removeClass(e,(a?vb:wb)+c);g.addClass(e,(a?wb:vb)+c)}this.$modelValue=this.$viewValue=Number.NaN;this.$validators={};this.$parsers=[];this.$formatters=[];this.$viewChangeListeners=[];this.$untouched=!0;this.$touched=
!1;this.$pristine=!0;this.$dirty=!1;this.$valid=!0;this.$invalid=!1;this.$name=d.name;var l=f(d.ngModel),m=l.assign,p=null,k=this;if(!m)throw L("ngModel")("nonassign",d.ngModel,ha(e));this.$render=A;this.$isEmpty=function(a){return y(a)||""===a||null===a||a!==a};var t=e.inheritedData("$formController")||xb,s=0,I=this.$error={};e.addClass(Na).addClass("ng-untouched");n(!0);this.$setValidity=function(a,c){I[a]!==!c&&(c?(I[a]&&s--,s||(n(!0),k.$valid=!0,k.$invalid=!1)):(n(!1),k.$invalid=!0,k.$valid=!1,
s++),I[a]=!c,n(c,a),t.$setValidity(a,c,k))};this.$setPristine=function(){k.$dirty=!1;k.$pristine=!0;g.removeClass(e,yb);g.addClass(e,Na)};this.$setUntouched=function(){k.$touched=!1;k.$untouched=!0;g.setClass(e,"ng-untouched","ng-touched")};this.$setTouched=function(){k.$touched=!0;k.$untouched=!1;g.setClass(e,"ng-touched","ng-untouched")};this.$rollbackViewValue=function(){h.cancel(p);k.$viewValue=k.$$lastCommittedViewValue;k.$render()};this.$validate=function(){this.$$runValidators(k.$modelValue,
k.$viewValue)};this.$$runValidators=function(a,c){q(k.$validators,function(d,e){k.$setValidity(e,d(a,c))})};this.$commitViewValue=function(d){var f=k.$viewValue;h.cancel(p);if(d||k.$$lastCommittedViewValue!==f){k.$$lastCommittedViewValue=f;k.$pristine&&(k.$dirty=!0,k.$pristine=!1,g.removeClass(e,Na),g.addClass(e,yb),t.$setDirty());var l=f;q(k.$parsers,function(a){l=a(l)});k.$modelValue===l||!y(k.$$invalidModelValue)&&k.$$invalidModelValue==l||(k.$$runValidators(l,f),k.$modelValue=k.$valid?l:r,k.$$invalidModelValue=
k.$valid?r:l,m(a,k.$modelValue),q(k.$viewChangeListeners,function(a){try{a()}catch(d){c(d)}}))}};this.$setViewValue=function(a,c,d){k.$viewValue=a;k.$options&&!k.$options.updateOnDefault||k.$$debounceViewValueCommit(c,d)};this.$$debounceViewValueCommit=function(a,c){var d=0,e=k.$options;e&&E(e.debounce)&&(e=e.debounce,Fa(e)?d=e:Fa(e[a])?d=e[a]:Fa(e["default"])&&(d=e["default"]));h.cancel(p);d?p=h(function(){k.$commitViewValue(c)},d):k.$commitViewValue(c)};a.$watch(function(){var c=l(a);if(k.$modelValue!==
c&&(y(k.$$invalidModelValue)||k.$$invalidModelValue!=c)){for(var d=k.$formatters,e=d.length,f=c;e--;)f=d[e](f);k.$$runValidators(c,f);k.$modelValue=k.$valid?c:r;k.$$invalidModelValue=k.$valid?r:c;k.$viewValue!==f&&(k.$viewValue=k.$$lastCommittedViewValue=f,k.$render())}return c})}],ae=function(){return{require:["ngModel","^?form","^?ngModelOptions"],controller:yf,link:{pre:function(a,c,d,e){e[2]&&(e[0].$options=e[2].$options);var f=e[0],g=e[1]||xb;g.$addControl(f);a.$on("$destroy",function(){g.$removeControl(f)})},
post:function(a,c,d,e){var f=e[0];if(f.$options&&f.$options.updateOn)c.on(f.$options.updateOn,function(c){a.$apply(function(){f.$$debounceViewValueCommit(c&&c.type)})});c.on("blur",function(c){a.$apply(function(){f.$setTouched()})})}}}},ce=da({require:"ngModel",link:function(a,c,d,e){e.$viewChangeListeners.push(function(){a.$eval(d.ngChange)})}}),jc=function(){return{require:"?ngModel",link:function(a,c,d,e){e&&(d.required=!0,e.$validators.required=function(a,c){return!d.required||!e.$isEmpty(c)},
d.$observe("required",function(){e.$validate()}))}}},ic=function(){return{require:"?ngModel",link:function(a,c,d,e){if(e){var f,g=d.ngPattern||d.pattern;d.$observe("pattern",function(a){v(a)&&0<a.length&&(a=RegExp(a));if(a&&!a.test)throw L("ngPattern")("noregexp",g,a,ha(c));f=a||r;e.$validate()});e.$validators.pattern=function(a){return e.$isEmpty(a)||y(f)||f.test(a)}}}}},lc=function(){return{require:"?ngModel",link:function(a,c,d,e){if(e){var f=0;d.$observe("maxlength",function(a){f=Y(a)||0;e.$validate()});
e.$validators.maxlength=function(a){return e.$isEmpty(a)||a.length<=f}}}}},kc=function(){return{require:"?ngModel",link:function(a,c,d,e){if(e){var f=0;d.$observe("minlength",function(a){f=Y(a)||0;e.$validate()});e.$validators.minlength=function(a){return e.$isEmpty(a)||a.length>=f}}}}},be=function(){return{require:"ngModel",link:function(a,c,d,e){var f=(a=/\/(.*)\//.exec(d.ngList))&&RegExp(a[1])||d.ngList||",";e.$parsers.push(function(a){if(!y(a)){var c=[];a&&q(a.split(f),function(a){a&&c.push(aa(a))});
return c}});e.$formatters.push(function(a){return M(a)?a.join(", "):r});e.$isEmpty=function(a){return!a||!a.length}}}},zf=/^(true|false|\d+)$/,de=function(){return{priority:100,compile:function(a,c){return zf.test(c.ngValue)?function(a,c,f){f.$set("value",a.$eval(f.ngValue))}:function(a,c,f){a.$watch(f.ngValue,function(a){f.$set("value",a)})}}}},ee=function(){return{controller:["$scope","$attrs",function(a,c){var d=this;this.$options=a.$eval(c.ngModelOptions);this.$options.updateOn!==r?(this.$options.updateOnDefault=
!1,this.$options.updateOn=aa(this.$options.updateOn.replace(wf,function(){d.$options.updateOnDefault=!0;return" "}))):this.$options.updateOnDefault=!0}]}},Ed=ya({compile:function(a){a.addClass("ng-binding");return function(a,d,e){d.data("$binding",e.ngBind);a.$watch(e.ngBind,function(a){d.text(a==r?"":a)})}}}),Gd=["$interpolate",function(a){return function(c,d,e){c=a(d.attr(e.$attr.ngBindTemplate));d.addClass("ng-binding").data("$binding",c);e.$observe("ngBindTemplate",function(a){d.text(a)})}}],
Fd=["$sce","$parse",function(a,c){return function(d,e,f){function g(){var a=h(d);g.$$unwatch=h.$$unwatch;return(a||"").toString()}e.addClass("ng-binding").data("$binding",f.ngBindHtml);var h=c(f.ngBindHtml);d.$watch(g,function(c){e.html(a.getTrustedHtml(h(d))||"")})}}],Hd=Ub("",!0),Jd=Ub("Odd",0),Id=Ub("Even",1),Kd=ya({compile:function(a,c){c.$set("ngCloak",r);a.removeClass("ng-cloak")}}),Ld=[function(){return{scope:!0,controller:"@",priority:500}}],mc={};q("click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste".split(" "),
function(a){var c=pa("ng-"+a);mc[c]=["$parse",function(d){return{compile:function(e,f){var g=d(f[c]);return function(c,d){d.on(G(a),function(a){c.$apply(function(){g(c,{$event:a})})})}}}}]});var Od=["$animate",function(a){return{transclude:"element",priority:600,terminal:!0,restrict:"A",$$tlb:!0,link:function(c,d,e,f,g){var h,n,l;c.$watch(e.ngIf,function(c){c?n||g(function(c,f){n=f;c[c.length++]=U.createComment(" end ngIf: "+e.ngIf+" ");h={clone:c};a.enter(c,d.parent(),d)}):(l&&(l.remove(),l=null),
n&&(n.$destroy(),n=null),h&&(l=Eb(h.clone),a.leave(l,function(){l=null}),h=null))})}}}],Pd=["$http","$templateCache","$anchorScroll","$animate","$sce",function(a,c,d,e,f){return{restrict:"ECA",priority:400,terminal:!0,transclude:"element",controller:Ra.noop,compile:function(g,h){var n=h.ngInclude||h.src,l=h.onload||"",m=h.autoscroll;return function(g,h,q,s,I){var x=0,r,B,u,D=function(){B&&(B.remove(),B=null);r&&(r.$destroy(),r=null);u&&(e.leave(u,function(){B=null}),B=u,u=null)};g.$watch(f.parseAsResourceUrl(n),
function(f){var n=function(){!E(m)||m&&!g.$eval(m)||d()},q=++x;f?(a.get(f,{cache:c}).success(function(a){if(q===x){var c=g.$new();s.template=a;a=I(c,function(a){D();e.enter(a,null,h,n)});r=c;u=a;r.$emit("$includeContentLoaded");g.$eval(l)}}).error(function(){q===x&&(D(),g.$emit("$includeContentError"))}),g.$emit("$includeContentRequested")):(D(),s.template=null)})}}}}],fe=["$compile",function(a){return{restrict:"ECA",priority:-400,require:"ngInclude",link:function(c,d,e,f){d.html(f.template);a(d.contents())(c)}}}],
Qd=ya({priority:450,compile:function(){return{pre:function(a,c,d){a.$eval(d.ngInit)}}}}),Rd=ya({terminal:!0,priority:1E3}),Sd=["$locale","$interpolate",function(a,c){var d=/{}/g;return{restrict:"EA",link:function(e,f,g){var h=g.count,n=g.$attr.when&&f.attr(g.$attr.when),l=g.offset||0,m=e.$eval(n)||{},p={},k=c.startSymbol(),t=c.endSymbol(),s=/^when(Minus)?(.+)$/;q(g,function(a,c){s.test(c)&&(m[G(c.replace("when","").replace("Minus","-"))]=f.attr(g.$attr[c]))});q(m,function(a,e){p[e]=c(a.replace(d,
k+h+"-"+l+t))});e.$watch(function(){var c=parseFloat(e.$eval(h));if(isNaN(c))return"";c in m||(c=a.pluralCat(c-l));return p[c](e)},function(a){f.text(a)})}}}],Td=["$parse","$animate",function(a,c){var d=L("ngRepeat");return{transclude:"element",priority:1E3,terminal:!0,$$tlb:!0,link:function(e,f,g,h,n){var l=g.ngRepeat,m=l.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?\s*$/),p,k,t,s,r,x,F={$id:Ja};if(!m)throw d("iexp",l);g=m[1];h=m[2];(m=m[3])?(p=a(m),k=function(a,c,d){x&&
(F[x]=a);F[r]=c;F.$index=d;return p(e,F)}):(t=function(a,c){return Ja(c)},s=function(a){return a});m=g.match(/^(?:([\$\w]+)|\(([\$\w]+)\s*,\s*([\$\w]+)\))$/);if(!m)throw d("iidexp",g);r=m[3]||m[1];x=m[2];var B={};e.$watchCollection(h,function(a){var e,g,h=f[0],m,p={},F,w,E,K,z,A,y,v=[],R=function(a,c){a[r]=E;x&&(a[x]=w);a.$index=c;a.$first=0===c;a.$last=c===F-1;a.$middle=!(a.$first||a.$last);a.$odd=!(a.$even=0===(c&1))};if(db(a))A=a,z=k||t;else{z=k||s;A=[];for(g in a)a.hasOwnProperty(g)&&"$"!=g.charAt(0)&&
A.push(g);A.sort()}F=A.length;g=v.length=A.length;for(e=0;e<g;e++)if(w=a===A?e:A[e],E=a[w],K=z(w,E,e),Ca(K,"`track by` id"),B.hasOwnProperty(K))y=B[K],delete B[K],p[K]=y,v[e]=y;else{if(p.hasOwnProperty(K))throw q(v,function(a){a&&a.scope&&(B[a.id]=a)}),d("dupes",l,K);v[e]={id:K};p[K]=!1}for(m in B)B.hasOwnProperty(m)&&(y=B[m],g=Eb(y.clone),c.leave(g),q(g,function(a){a.$$NG_REMOVED=!0}),y.scope.$destroy());e=0;for(g=A.length;e<g;e++)if(w=a===A?e:A[e],E=a[w],y=v[e],v[e-1]&&(h=v[e-1].clone[v[e-1].clone.length-
1]),y.scope){m=h;do m=m.nextSibling;while(m&&m.$$NG_REMOVED);y.clone[0]!=m&&c.move(Eb(y.clone),null,C(h));h=y.clone[y.clone.length-1];R(y.scope,e)}else n(function(a,d){y.scope=d;a[a.length++]=U.createComment(" end ngRepeat: "+l+" ");c.enter(a,null,C(h));h=a;y.clone=a;p[y.id]=y;R(y.scope,e)});B=p})}}}],Ud=["$animate",function(a){return function(c,d,e){c.$watch(e.ngShow,function(c){a[c?"removeClass":"addClass"](d,"ng-hide")})}}],Nd=["$animate",function(a){return function(c,d,e){c.$watch(e.ngHide,function(c){a[c?
"addClass":"removeClass"](d,"ng-hide")})}}],Vd=ya(function(a,c,d){a.$watch(d.ngStyle,function(a,d){d&&a!==d&&q(d,function(a,d){c.css(d,"")});a&&c.css(a)},!0)}),Wd=["$animate",function(a){return{restrict:"EA",require:"ngSwitch",controller:["$scope",function(){this.cases={}}],link:function(c,d,e,f){var g=[],h=[],n=[],l=[];c.$watch(e.ngSwitch||e.on,function(d){var p,k;p=0;for(k=n.length;p<k;++p)n[p].remove();p=n.length=0;for(k=l.length;p<k;++p){var t=h[p];l[p].$destroy();n[p]=t;a.leave(t,function(){n.splice(p,
1)})}h.length=0;l.length=0;if(g=f.cases["!"+d]||f.cases["?"])c.$eval(e.change),q(g,function(d){var e=c.$new();l.push(e);d.transclude(e,function(c){var e=d.element;h.push(c);a.enter(c,e.parent(),e)})})})}}}],Xd=ya({transclude:"element",priority:800,require:"^ngSwitch",link:function(a,c,d,e,f){e.cases["!"+d.ngSwitchWhen]=e.cases["!"+d.ngSwitchWhen]||[];e.cases["!"+d.ngSwitchWhen].push({transclude:f,element:c})}}),Yd=ya({transclude:"element",priority:800,require:"^ngSwitch",link:function(a,c,d,e,f){e.cases["?"]=
e.cases["?"]||[];e.cases["?"].push({transclude:f,element:c})}}),$d=ya({link:function(a,c,d,e,f){if(!f)throw L("ngTransclude")("orphan",ha(c));f(function(a){c.empty();c.append(a)})}}),Ad=["$templateCache",function(a){return{restrict:"E",terminal:!0,compile:function(c,d){"text/ng-template"==d.type&&a.put(d.id,c[0].text)}}}],Af=L("ngOptions"),Zd=da({terminal:!0}),Bd=["$compile","$parse",function(a,c){var d=/^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/,
e={$setViewValue:A};return{restrict:"E",require:["select","?ngModel"],controller:["$element","$scope","$attrs",function(a,c,d){var n=this,l={},m=e,p;n.databound=d.ngModel;n.init=function(a,c,d){m=a;p=d};n.addOption=function(c){Ca(c,'"option value"');l[c]=!0;m.$viewValue==c&&(a.val(c),p.parent()&&p.remove())};n.removeOption=function(a){this.hasOption(a)&&(delete l[a],m.$viewValue==a&&this.renderUnknownOption(a))};n.renderUnknownOption=function(c){c="? "+Ja(c)+" ?";p.val(c);a.prepend(p);a.val(c);p.prop("selected",
!0)};n.hasOption=function(a){return l.hasOwnProperty(a)};c.$on("$destroy",function(){n.renderUnknownOption=A})}],link:function(e,g,h,n){function l(a,c,d,e){d.$render=function(){var a=d.$viewValue;e.hasOption(a)?(u.parent()&&u.remove(),c.val(a),""===a&&x.prop("selected",!0)):y(a)&&x?c.val(""):e.renderUnknownOption(a)};c.on("change",function(){a.$apply(function(){u.parent()&&u.remove();d.$setViewValue(c.val())})})}function m(a,c,d){var e;d.$render=function(){var a=new Xa(d.$viewValue);q(c.find("option"),
function(c){c.selected=E(a.get(c.value))})};a.$watch(function(){sa(e,d.$viewValue)||(e=ka(d.$viewValue),d.$render())});c.on("change",function(){a.$apply(function(){var a=[];q(c.find("option"),function(c){c.selected&&a.push(c.value)});d.$setViewValue(a)})})}function p(e,f,g){function h(){var a={"":[]},c=[""],d,k,r,s,w;s=g.$modelValue;w=x(e)||[];var C=n?Wb(w):w,D,v,z;v={};r=!1;var G,L;if(t)if(u&&M(s))for(r=new Xa([]),z=0;z<s.length;z++)v[m]=s[z],r.put(u(e,v),s[z]);else r=new Xa(s);for(z=0;D=C.length,
z<D;z++){k=z;if(n){k=C[z];if("$"===k.charAt(0))continue;v[n]=k}v[m]=w[k];d=p(e,v)||"";(k=a[d])||(k=a[d]=[],c.push(d));t?d=E(r.remove(u?u(e,v):q(e,v))):(u?(d={},d[m]=s,d=u(e,d)===u(e,v)):d=s===q(e,v),r=r||d);G=l(e,v);G=E(G)?G:"";k.push({id:u?u(e,v):n?C[z]:z,label:G,selected:d})}t||(A||null===s?a[""].unshift({id:"",label:"",selected:!r}):r||a[""].unshift({id:"?",label:"",selected:!0}));v=0;for(C=c.length;v<C;v++){d=c[v];k=a[d];y.length<=v?(s={element:B.clone().attr("label",d),label:k.label},w=[s],y.push(w),
f.append(s.element)):(w=y[v],s=w[0],s.label!=d&&s.element.attr("label",s.label=d));G=null;z=0;for(D=k.length;z<D;z++)r=k[z],(d=w[z+1])?(G=d.element,d.label!==r.label&&G.text(d.label=r.label),d.id!==r.id&&G.val(d.id=r.id),d.selected!==r.selected&&G.prop("selected",d.selected=r.selected)):(""===r.id&&A?L=A:(L=F.clone()).val(r.id).prop("selected",r.selected).text(r.label),w.push({element:L,label:r.label,id:r.id,selected:r.selected}),G?G.after(L):s.element.append(L),G=L);for(z++;w.length>z;)w.pop().element.remove()}for(;y.length>
v;)y.pop()[0].element.remove()}var k;if(!(k=s.match(d)))throw Af("iexp",s,ha(f));var l=c(k[2]||k[1]),m=k[4]||k[6],n=k[5],p=c(k[3]||""),q=c(k[2]?k[1]:m),x=c(k[7]),u=k[8]?c(k[8]):null,y=[[{element:f,label:""}]];A&&(a(A)(e),A.removeClass("ng-scope"),A.remove());f.empty();f.on("change",function(){e.$apply(function(){var a,c=x(e)||[],d={},h,k,l,p,s,w,v;if(t)for(k=[],p=0,w=y.length;p<w;p++)for(a=y[p],l=1,s=a.length;l<s;l++){if((h=a[l].element)[0].selected){h=h.val();n&&(d[n]=h);if(u)for(v=0;v<c.length&&
(d[m]=c[v],u(e,d)!=h);v++);else d[m]=c[h];k.push(q(e,d))}}else{h=f.val();if("?"==h)k=r;else if(""===h)k=null;else if(u)for(v=0;v<c.length;v++){if(d[m]=c[v],u(e,d)==h){k=q(e,d);break}}else d[m]=c[h],n&&(d[n]=h),k=q(e,d);1<y[0].length&&y[0][1].id!==h&&(y[0][1].selected=!1)}g.$setViewValue(k)})});g.$render=h;e.$watch(h)}if(n[1]){var k=n[0];n=n[1];var t=h.multiple,s=h.ngOptions,A=!1,x,F=C(U.createElement("option")),B=C(U.createElement("optgroup")),u=F.clone();h=0;for(var D=g.children(),v=D.length;h<v;h++)if(""===
D[h].value){x=A=D.eq(h);break}k.init(n,A,u);t&&(n.$isEmpty=function(a){return!a||0===a.length});s?p(e,g,n):t?m(e,g,n):l(e,g,n,k)}}}}],Dd=["$interpolate",function(a){var c={addOption:A,removeOption:A};return{restrict:"E",priority:100,compile:function(d,e){if(y(e.value)){var f=a(d.text(),!0);f||e.$set("value",d.text())}return function(a,d,e){var l=d.parent(),m=l.data("$selectController")||l.parent().data("$selectController");m&&m.databound?d.prop("selected",!1):m=c;f?a.$watch(f,function(a,c){e.$set("value",
a);c!==a&&m.removeOption(c);m.addOption(a)}):m.addOption(e.value);d.on("$destroy",function(){m.removeOption(e.value)})}}}}],Cd=da({restrict:"E",terminal:!1});N.angular.bootstrap?console.log("WARNING: Tried to load angular more than once."):(sd(),ud(Ra),C(U).ready(function(){qd(U,ec)}))})(window,document);!window.angular.$$csp()&&window.angular.element(document).find("head").prepend('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide:not(.ng-animate){display:none !important;}ng\\:form{display:block;}</style>');
//# sourceMappingURL=angular.min.js.map

/*
 AngularJS v1.3.0-build.2871+sha.63e8952
 (c) 2010-2014 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(H,d,A){'use strict';function C(g,q){q=q||{};d.forEach(q,function(d,h){delete q[h]});for(var h in g)!g.hasOwnProperty(h)||"$"===h.charAt(0)&&"$"===h.charAt(1)||(q[h]=g[h]);return q}var w=d.$$minErr("$resource"),B=/^(\.[a-zA-Z_$][0-9a-zA-Z_$]*)+$/;d.module("ngResource",["ng"]).provider("$resource",function(){var g=this;this.defaults={stripTrailingSlashes:!0,actions:{get:{method:"GET"},save:{method:"POST"},query:{method:"GET",isArray:!0},remove:{method:"DELETE"},"delete":{method:"DELETE"}}};
this.$get=["$http","$q",function(q,h){function t(d,k){this.template=d;this.defaults=s({},g.defaults,k);this.urlParams={}}function v(x,k,l,m){function f(b,c){var f={};c=s({},k,c);r(c,function(a,c){u(a)&&(a=a());var d;if(a&&a.charAt&&"@"==a.charAt(0)){d=b;var e=a.substr(1);if(null==e||""===e||"hasOwnProperty"===e||!B.test("."+e))throw w("badmember",e);for(var e=e.split("."),n=0,k=e.length;n<k&&d!==A;n++){var h=e[n];d=null!==d?d[h]:A}}else d=a;f[c]=d});return f}function E(b){return b.resource}function e(b){C(b||
{},this)}var F=new t(x,m);l=s({},g.defaults.actions,l);e.prototype.toJSON=function(){var b=s({},this);delete b.$promise;delete b.$resolved;return b};r(l,function(b,c){var k=/^(POST|PUT|PATCH)$/i.test(b.method);e[c]=function(a,c,m,x){var n={},g,l,y;switch(arguments.length){case 4:y=x,l=m;case 3:case 2:if(u(c)){if(u(a)){l=a;y=c;break}l=c;y=m}else{n=a;g=c;l=m;break}case 1:u(a)?l=a:k?g=a:n=a;break;case 0:break;default:throw w("badargs",arguments.length);}var t=this instanceof e,p=t?g:b.isArray?[]:new e(g),
z={},v=b.interceptor&&b.interceptor.response||E,B=b.interceptor&&b.interceptor.responseError||A;r(b,function(b,a){"params"!=a&&("isArray"!=a&&"interceptor"!=a)&&(z[a]=G(b))});k&&(z.data=g);F.setUrlParams(z,s({},f(g,b.params||{}),n),b.url);n=q(z).then(function(a){var c=a.data,f=p.$promise;if(c){if(d.isArray(c)!==!!b.isArray)throw w("badcfg",b.isArray?"array":"object",d.isArray(c)?"array":"object");b.isArray?(p.length=0,r(c,function(a){"object"===typeof a?p.push(new e(a)):p.push(a)})):(C(c,p),p.$promise=
f)}p.$resolved=!0;a.resource=p;return a},function(a){p.$resolved=!0;(y||D)(a);return h.reject(a)});n=n.then(function(a){var b=v(a);(l||D)(b,a.headers);return b},B);return t?n:(p.$promise=n,p.$resolved=!1,p)};e.prototype["$"+c]=function(a,b,d){u(a)&&(d=b,b=a,a={});a=e[c].call(this,a,this,b,d);return a.$promise||a}});e.bind=function(b){return v(x,s({},k,b),l)};return e}var D=d.noop,r=d.forEach,s=d.extend,G=d.copy,u=d.isFunction;t.prototype={setUrlParams:function(g,k,l){var m=this,f=l||m.template,h,
e,q=m.urlParams={};r(f.split(/\W/),function(b){if("hasOwnProperty"===b)throw w("badname");!/^\d+$/.test(b)&&(b&&RegExp("(^|[^\\\\]):"+b+"(\\W|$)").test(f))&&(q[b]=!0)});f=f.replace(/\\:/g,":");k=k||{};r(m.urlParams,function(b,c){h=k.hasOwnProperty(c)?k[c]:m.defaults[c];d.isDefined(h)&&null!==h?(e=encodeURIComponent(h).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"%20").replace(/%26/gi,"&").replace(/%3D/gi,"=").replace(/%2B/gi,"+"),f=f.replace(RegExp(":"+
c+"(\\W|$)","g"),function(b,a){return e+a})):f=f.replace(RegExp("(/?):"+c+"(\\W|$)","g"),function(b,a,c){return"/"==c.charAt(0)?c:a+c})});m.defaults.stripTrailingSlashes&&(f=f.replace(/\/+$/,"")||"/");f=f.replace(/\/\.(?=\w+($|\?))/,".");g.url=f.replace(/\/\\\./,"/.");r(k,function(b,c){m.urlParams[c]||(g.params=g.params||{},g.params[c]=b)})}};return v}]})})(window,window.angular);
//# sourceMappingURL=angular-resource.min.js.map

/*
 * angular-ui-bootstrap
 * http://angular-ui.github.io/bootstrap/

 * Version: 0.11.0 - 2014-05-01
 * License: MIT
 */
angular.module("ui.bootstrap",["ui.bootstrap.tpls","ui.bootstrap.transition","ui.bootstrap.collapse","ui.bootstrap.accordion","ui.bootstrap.alert","ui.bootstrap.bindHtml","ui.bootstrap.buttons","ui.bootstrap.carousel","ui.bootstrap.dateparser","ui.bootstrap.position","ui.bootstrap.datepicker","ui.bootstrap.dropdown","ui.bootstrap.modal","ui.bootstrap.pagination","ui.bootstrap.tooltip","ui.bootstrap.popover","ui.bootstrap.progressbar","ui.bootstrap.rating","ui.bootstrap.tabs","ui.bootstrap.timepicker","ui.bootstrap.typeahead"]),angular.module("ui.bootstrap.tpls",["template/accordion/accordion-group.html","template/accordion/accordion.html","template/alert/alert.html","template/carousel/carousel.html","template/carousel/slide.html","template/datepicker/datepicker.html","template/datepicker/day.html","template/datepicker/month.html","template/datepicker/popup.html","template/datepicker/year.html","template/modal/backdrop.html","template/modal/window.html","template/pagination/pager.html","template/pagination/pagination.html","template/tooltip/tooltip-html-unsafe-popup.html","template/tooltip/tooltip-popup.html","template/popover/popover.html","template/progressbar/bar.html","template/progressbar/progress.html","template/progressbar/progressbar.html","template/rating/rating.html","template/tabs/tab.html","template/tabs/tabset.html","template/timepicker/timepicker.html","template/typeahead/typeahead-match.html","template/typeahead/typeahead-popup.html"]),angular.module("ui.bootstrap.transition",[]).factory("$transition",["$q","$timeout","$rootScope",function(a,b,c){function d(a){for(var b in a)if(void 0!==f.style[b])return a[b]}var e=function(d,f,g){g=g||{};var h=a.defer(),i=e[g.animation?"animationEndEventName":"transitionEndEventName"],j=function(){c.$apply(function(){d.unbind(i,j),h.resolve(d)})};return i&&d.bind(i,j),b(function(){angular.isString(f)?d.addClass(f):angular.isFunction(f)?f(d):angular.isObject(f)&&d.css(f),i||h.resolve(d)}),h.promise.cancel=function(){i&&d.unbind(i,j),h.reject("Transition cancelled")},h.promise},f=document.createElement("trans"),g={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd",transition:"transitionend"},h={WebkitTransition:"webkitAnimationEnd",MozTransition:"animationend",OTransition:"oAnimationEnd",transition:"animationend"};return e.transitionEndEventName=d(g),e.animationEndEventName=d(h),e}]),angular.module("ui.bootstrap.collapse",["ui.bootstrap.transition"]).directive("collapse",["$transition",function(a){return{link:function(b,c,d){function e(b){function d(){j===e&&(j=void 0)}var e=a(c,b);return j&&j.cancel(),j=e,e.then(d,d),e}function f(){k?(k=!1,g()):(c.removeClass("collapse").addClass("collapsing"),e({height:c[0].scrollHeight+"px"}).then(g))}function g(){c.removeClass("collapsing"),c.addClass("collapse in"),c.css({height:"auto"})}function h(){if(k)k=!1,i(),c.css({height:0});else{c.css({height:c[0].scrollHeight+"px"});{c[0].offsetWidth}c.removeClass("collapse in").addClass("collapsing"),e({height:0}).then(i)}}function i(){c.removeClass("collapsing"),c.addClass("collapse")}var j,k=!0;b.$watch(d.collapse,function(a){a?h():f()})}}}]),angular.module("ui.bootstrap.accordion",["ui.bootstrap.collapse"]).constant("accordionConfig",{closeOthers:!0}).controller("AccordionController",["$scope","$attrs","accordionConfig",function(a,b,c){this.groups=[],this.closeOthers=function(d){var e=angular.isDefined(b.closeOthers)?a.$eval(b.closeOthers):c.closeOthers;e&&angular.forEach(this.groups,function(a){a!==d&&(a.isOpen=!1)})},this.addGroup=function(a){var b=this;this.groups.push(a),a.$on("$destroy",function(){b.removeGroup(a)})},this.removeGroup=function(a){var b=this.groups.indexOf(a);-1!==b&&this.groups.splice(b,1)}}]).directive("accordion",function(){return{restrict:"EA",controller:"AccordionController",transclude:!0,replace:!1,templateUrl:"template/accordion/accordion.html"}}).directive("accordionGroup",function(){return{require:"^accordion",restrict:"EA",transclude:!0,replace:!0,templateUrl:"template/accordion/accordion-group.html",scope:{heading:"@",isOpen:"=?",isDisabled:"=?"},controller:function(){this.setHeading=function(a){this.heading=a}},link:function(a,b,c,d){d.addGroup(a),a.$watch("isOpen",function(b){b&&d.closeOthers(a)}),a.toggleOpen=function(){a.isDisabled||(a.isOpen=!a.isOpen)}}}}).directive("accordionHeading",function(){return{restrict:"EA",transclude:!0,template:"",replace:!0,require:"^accordionGroup",link:function(a,b,c,d,e){d.setHeading(e(a,function(){}))}}}).directive("accordionTransclude",function(){return{require:"^accordionGroup",link:function(a,b,c,d){a.$watch(function(){return d[c.accordionTransclude]},function(a){a&&(b.html(""),b.append(a))})}}}),angular.module("ui.bootstrap.alert",[]).controller("AlertController",["$scope","$attrs",function(a,b){a.closeable="close"in b}]).directive("alert",function(){return{restrict:"EA",controller:"AlertController",templateUrl:"template/alert/alert.html",transclude:!0,replace:!0,scope:{type:"@",close:"&"}}}),angular.module("ui.bootstrap.bindHtml",[]).directive("bindHtmlUnsafe",function(){return function(a,b,c){b.addClass("ng-binding").data("$binding",c.bindHtmlUnsafe),a.$watch(c.bindHtmlUnsafe,function(a){b.html(a||"")})}}),angular.module("ui.bootstrap.buttons",[]).constant("buttonConfig",{activeClass:"active",toggleEvent:"click"}).controller("ButtonsController",["buttonConfig",function(a){this.activeClass=a.activeClass||"active",this.toggleEvent=a.toggleEvent||"click"}]).directive("btnRadio",function(){return{require:["btnRadio","ngModel"],controller:"ButtonsController",link:function(a,b,c,d){var e=d[0],f=d[1];f.$render=function(){b.toggleClass(e.activeClass,angular.equals(f.$modelValue,a.$eval(c.btnRadio)))},b.bind(e.toggleEvent,function(){var d=b.hasClass(e.activeClass);(!d||angular.isDefined(c.uncheckable))&&a.$apply(function(){f.$setViewValue(d?null:a.$eval(c.btnRadio)),f.$render()})})}}}).directive("btnCheckbox",function(){return{require:["btnCheckbox","ngModel"],controller:"ButtonsController",link:function(a,b,c,d){function e(){return g(c.btnCheckboxTrue,!0)}function f(){return g(c.btnCheckboxFalse,!1)}function g(b,c){var d=a.$eval(b);return angular.isDefined(d)?d:c}var h=d[0],i=d[1];i.$render=function(){b.toggleClass(h.activeClass,angular.equals(i.$modelValue,e()))},b.bind(h.toggleEvent,function(){a.$apply(function(){i.$setViewValue(b.hasClass(h.activeClass)?f():e()),i.$render()})})}}}),angular.module("ui.bootstrap.carousel",["ui.bootstrap.transition"]).controller("CarouselController",["$scope","$timeout","$transition",function(a,b,c){function d(){e();var c=+a.interval;!isNaN(c)&&c>=0&&(g=b(f,c))}function e(){g&&(b.cancel(g),g=null)}function f(){h?(a.next(),d()):a.pause()}var g,h,i=this,j=i.slides=a.slides=[],k=-1;i.currentSlide=null;var l=!1;i.select=a.select=function(e,f){function g(){if(!l){if(i.currentSlide&&angular.isString(f)&&!a.noTransition&&e.$element){e.$element.addClass(f);{e.$element[0].offsetWidth}angular.forEach(j,function(a){angular.extend(a,{direction:"",entering:!1,leaving:!1,active:!1})}),angular.extend(e,{direction:f,active:!0,entering:!0}),angular.extend(i.currentSlide||{},{direction:f,leaving:!0}),a.$currentTransition=c(e.$element,{}),function(b,c){a.$currentTransition.then(function(){h(b,c)},function(){h(b,c)})}(e,i.currentSlide)}else h(e,i.currentSlide);i.currentSlide=e,k=m,d()}}function h(b,c){angular.extend(b,{direction:"",active:!0,leaving:!1,entering:!1}),angular.extend(c||{},{direction:"",active:!1,leaving:!1,entering:!1}),a.$currentTransition=null}var m=j.indexOf(e);void 0===f&&(f=m>k?"next":"prev"),e&&e!==i.currentSlide&&(a.$currentTransition?(a.$currentTransition.cancel(),b(g)):g())},a.$on("$destroy",function(){l=!0}),i.indexOfSlide=function(a){return j.indexOf(a)},a.next=function(){var b=(k+1)%j.length;return a.$currentTransition?void 0:i.select(j[b],"next")},a.prev=function(){var b=0>k-1?j.length-1:k-1;return a.$currentTransition?void 0:i.select(j[b],"prev")},a.isActive=function(a){return i.currentSlide===a},a.$watch("interval",d),a.$on("$destroy",e),a.play=function(){h||(h=!0,d())},a.pause=function(){a.noPause||(h=!1,e())},i.addSlide=function(b,c){b.$element=c,j.push(b),1===j.length||b.active?(i.select(j[j.length-1]),1==j.length&&a.play()):b.active=!1},i.removeSlide=function(a){var b=j.indexOf(a);j.splice(b,1),j.length>0&&a.active?i.select(b>=j.length?j[b-1]:j[b]):k>b&&k--}}]).directive("carousel",[function(){return{restrict:"EA",transclude:!0,replace:!0,controller:"CarouselController",require:"carousel",templateUrl:"template/carousel/carousel.html",scope:{interval:"=",noTransition:"=",noPause:"="}}}]).directive("slide",function(){return{require:"^carousel",restrict:"EA",transclude:!0,replace:!0,templateUrl:"template/carousel/slide.html",scope:{active:"=?"},link:function(a,b,c,d){d.addSlide(a,b),a.$on("$destroy",function(){d.removeSlide(a)}),a.$watch("active",function(b){b&&d.select(a)})}}}),angular.module("ui.bootstrap.dateparser",[]).service("dateParser",["$locale","orderByFilter",function(a,b){function c(a,b,c){return 1===b&&c>28?29===c&&(a%4===0&&a%100!==0||a%400===0):3===b||5===b||8===b||10===b?31>c:!0}this.parsers={};var d={yyyy:{regex:"\\d{4}",apply:function(a){this.year=+a}},yy:{regex:"\\d{2}",apply:function(a){this.year=+a+2e3}},y:{regex:"\\d{1,4}",apply:function(a){this.year=+a}},MMMM:{regex:a.DATETIME_FORMATS.MONTH.join("|"),apply:function(b){this.month=a.DATETIME_FORMATS.MONTH.indexOf(b)}},MMM:{regex:a.DATETIME_FORMATS.SHORTMONTH.join("|"),apply:function(b){this.month=a.DATETIME_FORMATS.SHORTMONTH.indexOf(b)}},MM:{regex:"0[1-9]|1[0-2]",apply:function(a){this.month=a-1}},M:{regex:"[1-9]|1[0-2]",apply:function(a){this.month=a-1}},dd:{regex:"[0-2][0-9]{1}|3[0-1]{1}",apply:function(a){this.date=+a}},d:{regex:"[1-2]?[0-9]{1}|3[0-1]{1}",apply:function(a){this.date=+a}},EEEE:{regex:a.DATETIME_FORMATS.DAY.join("|")},EEE:{regex:a.DATETIME_FORMATS.SHORTDAY.join("|")}};this.createParser=function(a){var c=[],e=a.split("");return angular.forEach(d,function(b,d){var f=a.indexOf(d);if(f>-1){a=a.split(""),e[f]="("+b.regex+")",a[f]="$";for(var g=f+1,h=f+d.length;h>g;g++)e[g]="",a[g]="$";a=a.join(""),c.push({index:f,apply:b.apply})}}),{regex:new RegExp("^"+e.join("")+"$"),map:b(c,"index")}},this.parse=function(b,d){if(!angular.isString(b))return b;d=a.DATETIME_FORMATS[d]||d,this.parsers[d]||(this.parsers[d]=this.createParser(d));var e=this.parsers[d],f=e.regex,g=e.map,h=b.match(f);if(h&&h.length){for(var i,j={year:1900,month:0,date:1,hours:0},k=1,l=h.length;l>k;k++){var m=g[k-1];m.apply&&m.apply.call(j,h[k])}return c(j.year,j.month,j.date)&&(i=new Date(j.year,j.month,j.date,j.hours)),i}}}]),angular.module("ui.bootstrap.position",[]).factory("$position",["$document","$window",function(a,b){function c(a,c){return a.currentStyle?a.currentStyle[c]:b.getComputedStyle?b.getComputedStyle(a)[c]:a.style[c]}function d(a){return"static"===(c(a,"position")||"static")}var e=function(b){for(var c=a[0],e=b.offsetParent||c;e&&e!==c&&d(e);)e=e.offsetParent;return e||c};return{position:function(b){var c=this.offset(b),d={top:0,left:0},f=e(b[0]);f!=a[0]&&(d=this.offset(angular.element(f)),d.top+=f.clientTop-f.scrollTop,d.left+=f.clientLeft-f.scrollLeft);var g=b[0].getBoundingClientRect();return{width:g.width||b.prop("offsetWidth"),height:g.height||b.prop("offsetHeight"),top:c.top-d.top,left:c.left-d.left}},offset:function(c){var d=c[0].getBoundingClientRect();return{width:d.width||c.prop("offsetWidth"),height:d.height||c.prop("offsetHeight"),top:d.top+(b.pageYOffset||a[0].documentElement.scrollTop),left:d.left+(b.pageXOffset||a[0].documentElement.scrollLeft)}},positionElements:function(a,b,c,d){var e,f,g,h,i=c.split("-"),j=i[0],k=i[1]||"center";e=d?this.offset(a):this.position(a),f=b.prop("offsetWidth"),g=b.prop("offsetHeight");var l={center:function(){return e.left+e.width/2-f/2},left:function(){return e.left},right:function(){return e.left+e.width}},m={center:function(){return e.top+e.height/2-g/2},top:function(){return e.top},bottom:function(){return e.top+e.height}};switch(j){case"right":h={top:m[k](),left:l[j]()};break;case"left":h={top:m[k](),left:e.left-f};break;case"bottom":h={top:m[j](),left:l[k]()};break;default:h={top:e.top-g,left:l[k]()}}return h}}}]),angular.module("ui.bootstrap.datepicker",["ui.bootstrap.dateparser","ui.bootstrap.position"]).constant("datepickerConfig",{formatDay:"dd",formatMonth:"MMMM",formatYear:"yyyy",formatDayHeader:"EEE",formatDayTitle:"MMMM yyyy",formatMonthTitle:"yyyy",datepickerMode:"day",minMode:"day",maxMode:"year",showWeeks:!0,startingDay:0,yearRange:20,minDate:null,maxDate:null}).controller("DatepickerController",["$scope","$attrs","$parse","$interpolate","$timeout","$log","dateFilter","datepickerConfig",function(a,b,c,d,e,f,g,h){var i=this,j={$setViewValue:angular.noop};this.modes=["day","month","year"],angular.forEach(["formatDay","formatMonth","formatYear","formatDayHeader","formatDayTitle","formatMonthTitle","minMode","maxMode","showWeeks","startingDay","yearRange"],function(c,e){i[c]=angular.isDefined(b[c])?8>e?d(b[c])(a.$parent):a.$parent.$eval(b[c]):h[c]}),angular.forEach(["minDate","maxDate"],function(d){b[d]?a.$parent.$watch(c(b[d]),function(a){i[d]=a?new Date(a):null,i.refreshView()}):i[d]=h[d]?new Date(h[d]):null}),a.datepickerMode=a.datepickerMode||h.datepickerMode,a.uniqueId="datepicker-"+a.$id+"-"+Math.floor(1e4*Math.random()),this.activeDate=angular.isDefined(b.initDate)?a.$parent.$eval(b.initDate):new Date,a.isActive=function(b){return 0===i.compare(b.date,i.activeDate)?(a.activeDateId=b.uid,!0):!1},this.init=function(a){j=a,j.$render=function(){i.render()}},this.render=function(){if(j.$modelValue){var a=new Date(j.$modelValue),b=!isNaN(a);b?this.activeDate=a:f.error('Datepicker directive: "ng-model" value must be a Date object, a number of milliseconds since 01.01.1970 or a string representing an RFC2822 or ISO 8601 date.'),j.$setValidity("date",b)}this.refreshView()},this.refreshView=function(){if(this.element){this._refreshView();var a=j.$modelValue?new Date(j.$modelValue):null;j.$setValidity("date-disabled",!a||this.element&&!this.isDisabled(a))}},this.createDateObject=function(a,b){var c=j.$modelValue?new Date(j.$modelValue):null;return{date:a,label:g(a,b),selected:c&&0===this.compare(a,c),disabled:this.isDisabled(a),current:0===this.compare(a,new Date)}},this.isDisabled=function(c){return this.minDate&&this.compare(c,this.minDate)<0||this.maxDate&&this.compare(c,this.maxDate)>0||b.dateDisabled&&a.dateDisabled({date:c,mode:a.datepickerMode})},this.split=function(a,b){for(var c=[];a.length>0;)c.push(a.splice(0,b));return c},a.select=function(b){if(a.datepickerMode===i.minMode){var c=j.$modelValue?new Date(j.$modelValue):new Date(0,0,0,0,0,0,0);c.setFullYear(b.getFullYear(),b.getMonth(),b.getDate()),j.$setViewValue(c),j.$render()}else i.activeDate=b,a.datepickerMode=i.modes[i.modes.indexOf(a.datepickerMode)-1]},a.move=function(a){var b=i.activeDate.getFullYear()+a*(i.step.years||0),c=i.activeDate.getMonth()+a*(i.step.months||0);i.activeDate.setFullYear(b,c,1),i.refreshView()},a.toggleMode=function(b){b=b||1,a.datepickerMode===i.maxMode&&1===b||a.datepickerMode===i.minMode&&-1===b||(a.datepickerMode=i.modes[i.modes.indexOf(a.datepickerMode)+b])},a.keys={13:"enter",32:"space",33:"pageup",34:"pagedown",35:"end",36:"home",37:"left",38:"up",39:"right",40:"down"};var k=function(){e(function(){i.element[0].focus()},0,!1)};a.$on("datepicker.focus",k),a.keydown=function(b){var c=a.keys[b.which];if(c&&!b.shiftKey&&!b.altKey)if(b.preventDefault(),b.stopPropagation(),"enter"===c||"space"===c){if(i.isDisabled(i.activeDate))return;a.select(i.activeDate),k()}else!b.ctrlKey||"up"!==c&&"down"!==c?(i.handleKeyDown(c,b),i.refreshView()):(a.toggleMode("up"===c?1:-1),k())}}]).directive("datepicker",function(){return{restrict:"EA",replace:!0,templateUrl:"template/datepicker/datepicker.html",scope:{datepickerMode:"=?",dateDisabled:"&"},require:["datepicker","?^ngModel"],controller:"DatepickerController",link:function(a,b,c,d){var e=d[0],f=d[1];f&&e.init(f)}}}).directive("daypicker",["dateFilter",function(a){return{restrict:"EA",replace:!0,templateUrl:"template/datepicker/day.html",require:"^datepicker",link:function(b,c,d,e){function f(a,b){return 1!==b||a%4!==0||a%100===0&&a%400!==0?i[b]:29}function g(a,b){var c=new Array(b),d=new Date(a),e=0;for(d.setHours(12);b>e;)c[e++]=new Date(d),d.setDate(d.getDate()+1);return c}function h(a){var b=new Date(a);b.setDate(b.getDate()+4-(b.getDay()||7));var c=b.getTime();return b.setMonth(0),b.setDate(1),Math.floor(Math.round((c-b)/864e5)/7)+1}b.showWeeks=e.showWeeks,e.step={months:1},e.element=c;var i=[31,28,31,30,31,30,31,31,30,31,30,31];e._refreshView=function(){var c=e.activeDate.getFullYear(),d=e.activeDate.getMonth(),f=new Date(c,d,1),i=e.startingDay-f.getDay(),j=i>0?7-i:-i,k=new Date(f);j>0&&k.setDate(-j+1);for(var l=g(k,42),m=0;42>m;m++)l[m]=angular.extend(e.createDateObject(l[m],e.formatDay),{secondary:l[m].getMonth()!==d,uid:b.uniqueId+"-"+m});b.labels=new Array(7);for(var n=0;7>n;n++)b.labels[n]={abbr:a(l[n].date,e.formatDayHeader),full:a(l[n].date,"EEEE")};if(b.title=a(e.activeDate,e.formatDayTitle),b.rows=e.split(l,7),b.showWeeks){b.weekNumbers=[];for(var o=h(b.rows[0][0].date),p=b.rows.length;b.weekNumbers.push(o++)<p;);}},e.compare=function(a,b){return new Date(a.getFullYear(),a.getMonth(),a.getDate())-new Date(b.getFullYear(),b.getMonth(),b.getDate())},e.handleKeyDown=function(a){var b=e.activeDate.getDate();if("left"===a)b-=1;else if("up"===a)b-=7;else if("right"===a)b+=1;else if("down"===a)b+=7;else if("pageup"===a||"pagedown"===a){var c=e.activeDate.getMonth()+("pageup"===a?-1:1);e.activeDate.setMonth(c,1),b=Math.min(f(e.activeDate.getFullYear(),e.activeDate.getMonth()),b)}else"home"===a?b=1:"end"===a&&(b=f(e.activeDate.getFullYear(),e.activeDate.getMonth()));e.activeDate.setDate(b)},e.refreshView()}}}]).directive("monthpicker",["dateFilter",function(a){return{restrict:"EA",replace:!0,templateUrl:"template/datepicker/month.html",require:"^datepicker",link:function(b,c,d,e){e.step={years:1},e.element=c,e._refreshView=function(){for(var c=new Array(12),d=e.activeDate.getFullYear(),f=0;12>f;f++)c[f]=angular.extend(e.createDateObject(new Date(d,f,1),e.formatMonth),{uid:b.uniqueId+"-"+f});b.title=a(e.activeDate,e.formatMonthTitle),b.rows=e.split(c,3)},e.compare=function(a,b){return new Date(a.getFullYear(),a.getMonth())-new Date(b.getFullYear(),b.getMonth())},e.handleKeyDown=function(a){var b=e.activeDate.getMonth();if("left"===a)b-=1;else if("up"===a)b-=3;else if("right"===a)b+=1;else if("down"===a)b+=3;else if("pageup"===a||"pagedown"===a){var c=e.activeDate.getFullYear()+("pageup"===a?-1:1);e.activeDate.setFullYear(c)}else"home"===a?b=0:"end"===a&&(b=11);e.activeDate.setMonth(b)},e.refreshView()}}}]).directive("yearpicker",["dateFilter",function(){return{restrict:"EA",replace:!0,templateUrl:"template/datepicker/year.html",require:"^datepicker",link:function(a,b,c,d){function e(a){return parseInt((a-1)/f,10)*f+1}var f=d.yearRange;d.step={years:f},d.element=b,d._refreshView=function(){for(var b=new Array(f),c=0,g=e(d.activeDate.getFullYear());f>c;c++)b[c]=angular.extend(d.createDateObject(new Date(g+c,0,1),d.formatYear),{uid:a.uniqueId+"-"+c});a.title=[b[0].label,b[f-1].label].join(" - "),a.rows=d.split(b,5)},d.compare=function(a,b){return a.getFullYear()-b.getFullYear()},d.handleKeyDown=function(a){var b=d.activeDate.getFullYear();"left"===a?b-=1:"up"===a?b-=5:"right"===a?b+=1:"down"===a?b+=5:"pageup"===a||"pagedown"===a?b+=("pageup"===a?-1:1)*d.step.years:"home"===a?b=e(d.activeDate.getFullYear()):"end"===a&&(b=e(d.activeDate.getFullYear())+f-1),d.activeDate.setFullYear(b)},d.refreshView()}}}]).constant("datepickerPopupConfig",{datepickerPopup:"yyyy-MM-dd",currentText:"Today",clearText:"Clear",closeText:"Done",closeOnDateSelection:!0,appendToBody:!1,showButtonBar:!0}).directive("datepickerPopup",["$compile","$parse","$document","$position","dateFilter","dateParser","datepickerPopupConfig",function(a,b,c,d,e,f,g){return{restrict:"EA",require:"ngModel",scope:{isOpen:"=?",currentText:"@",clearText:"@",closeText:"@",dateDisabled:"&"},link:function(h,i,j,k){function l(a){return a.replace(/([A-Z])/g,function(a){return"-"+a.toLowerCase()})}function m(a){if(a){if(angular.isDate(a)&&!isNaN(a))return k.$setValidity("date",!0),a;if(angular.isString(a)){var b=f.parse(a,n)||new Date(a);return isNaN(b)?void k.$setValidity("date",!1):(k.$setValidity("date",!0),b)}return void k.$setValidity("date",!1)}return k.$setValidity("date",!0),null}var n,o=angular.isDefined(j.closeOnDateSelection)?h.$parent.$eval(j.closeOnDateSelection):g.closeOnDateSelection,p=angular.isDefined(j.datepickerAppendToBody)?h.$parent.$eval(j.datepickerAppendToBody):g.appendToBody;h.showButtonBar=angular.isDefined(j.showButtonBar)?h.$parent.$eval(j.showButtonBar):g.showButtonBar,h.getText=function(a){return h[a+"Text"]||g[a+"Text"]},j.$observe("datepickerPopup",function(a){n=a||g.datepickerPopup,k.$render()});var q=angular.element("<div datepicker-popup-wrap><div datepicker></div></div>");q.attr({"ng-model":"date","ng-change":"dateSelection()"});var r=angular.element(q.children()[0]);j.datepickerOptions&&angular.forEach(h.$parent.$eval(j.datepickerOptions),function(a,b){r.attr(l(b),a)}),angular.forEach(["minDate","maxDate"],function(a){j[a]&&(h.$parent.$watch(b(j[a]),function(b){h[a]=b}),r.attr(l(a),a))}),j.dateDisabled&&r.attr("date-disabled","dateDisabled({ date: date, mode: mode })"),k.$parsers.unshift(m),h.dateSelection=function(a){angular.isDefined(a)&&(h.date=a),k.$setViewValue(h.date),k.$render(),o&&(h.isOpen=!1,i[0].focus())},i.bind("input change keyup",function(){h.$apply(function(){h.date=k.$modelValue})}),k.$render=function(){var a=k.$viewValue?e(k.$viewValue,n):"";i.val(a),h.date=m(k.$modelValue)};var s=function(a){h.isOpen&&a.target!==i[0]&&h.$apply(function(){h.isOpen=!1})},t=function(a){h.keydown(a)};i.bind("keydown",t),h.keydown=function(a){27===a.which?(a.preventDefault(),a.stopPropagation(),h.close()):40!==a.which||h.isOpen||(h.isOpen=!0)},h.$watch("isOpen",function(a){a?(h.$broadcast("datepicker.focus"),h.position=p?d.offset(i):d.position(i),h.position.top=h.position.top+i.prop("offsetHeight"),c.bind("click",s)):c.unbind("click",s)}),h.select=function(a){if("today"===a){var b=new Date;angular.isDate(k.$modelValue)?(a=new Date(k.$modelValue),a.setFullYear(b.getFullYear(),b.getMonth(),b.getDate())):a=new Date(b.setHours(0,0,0,0))}h.dateSelection(a)},h.close=function(){h.isOpen=!1,i[0].focus()};var u=a(q)(h);p?c.find("body").append(u):i.after(u),h.$on("$destroy",function(){u.remove(),i.unbind("keydown",t),c.unbind("click",s)})}}}]).directive("datepickerPopupWrap",function(){return{restrict:"EA",replace:!0,transclude:!0,templateUrl:"template/datepicker/popup.html",link:function(a,b){b.bind("click",function(a){a.preventDefault(),a.stopPropagation()})}}}),angular.module("ui.bootstrap.dropdown",[]).constant("dropdownConfig",{openClass:"open"}).service("dropdownService",["$document",function(a){var b=null;this.open=function(e){b||(a.bind("click",c),a.bind("keydown",d)),b&&b!==e&&(b.isOpen=!1),b=e},this.close=function(e){b===e&&(b=null,a.unbind("click",c),a.unbind("keydown",d))};var c=function(a){a&&a.isDefaultPrevented()||b.$apply(function(){b.isOpen=!1})},d=function(a){27===a.which&&(b.focusToggleElement(),c())}}]).controller("DropdownController",["$scope","$attrs","$parse","dropdownConfig","dropdownService","$animate",function(a,b,c,d,e,f){var g,h=this,i=a.$new(),j=d.openClass,k=angular.noop,l=b.onToggle?c(b.onToggle):angular.noop;this.init=function(d){h.$element=d,b.isOpen&&(g=c(b.isOpen),k=g.assign,a.$watch(g,function(a){i.isOpen=!!a}))},this.toggle=function(a){return i.isOpen=arguments.length?!!a:!i.isOpen},this.isOpen=function(){return i.isOpen},i.focusToggleElement=function(){h.toggleElement&&h.toggleElement[0].focus()},i.$watch("isOpen",function(b,c){f[b?"addClass":"removeClass"](h.$element,j),b?(i.focusToggleElement(),e.open(i)):e.close(i),k(a,b),angular.isDefined(b)&&b!==c&&l(a,{open:!!b})}),a.$on("$locationChangeSuccess",function(){i.isOpen=!1}),a.$on("$destroy",function(){i.$destroy()})}]).directive("dropdown",function(){return{restrict:"CA",controller:"DropdownController",link:function(a,b,c,d){d.init(b)}}}).directive("dropdownToggle",function(){return{restrict:"CA",require:"?^dropdown",link:function(a,b,c,d){if(d){d.toggleElement=b;var e=function(e){e.preventDefault(),b.hasClass("disabled")||c.disabled||a.$apply(function(){d.toggle()})};b.bind("click",e),b.attr({"aria-haspopup":!0,"aria-expanded":!1}),a.$watch(d.isOpen,function(a){b.attr("aria-expanded",!!a)}),a.$on("$destroy",function(){b.unbind("click",e)})}}}}),angular.module("ui.bootstrap.modal",["ui.bootstrap.transition"]).factory("$$stackedMap",function(){return{createNew:function(){var a=[];return{add:function(b,c){a.push({key:b,value:c})},get:function(b){for(var c=0;c<a.length;c++)if(b==a[c].key)return a[c]},keys:function(){for(var b=[],c=0;c<a.length;c++)b.push(a[c].key);return b},top:function(){return a[a.length-1]},remove:function(b){for(var c=-1,d=0;d<a.length;d++)if(b==a[d].key){c=d;break}return a.splice(c,1)[0]},removeTop:function(){return a.splice(a.length-1,1)[0]},length:function(){return a.length}}}}}).directive("modalBackdrop",["$timeout",function(a){return{restrict:"EA",replace:!0,templateUrl:"template/modal/backdrop.html",link:function(b){b.animate=!1,a(function(){b.animate=!0})}}}]).directive("modalWindow",["$modalStack","$timeout",function(a,b){return{restrict:"EA",scope:{index:"@",animate:"="},replace:!0,transclude:!0,templateUrl:function(a,b){return b.templateUrl||"template/modal/window.html"},link:function(c,d,e){d.addClass(e.windowClass||""),c.size=e.size,b(function(){c.animate=!0,d[0].focus()}),c.close=function(b){var c=a.getTop();c&&c.value.backdrop&&"static"!=c.value.backdrop&&b.target===b.currentTarget&&(b.preventDefault(),b.stopPropagation(),a.dismiss(c.key,"backdrop click"))}}}}]).factory("$modalStack",["$transition","$timeout","$document","$compile","$rootScope","$$stackedMap",function(a,b,c,d,e,f){function g(){for(var a=-1,b=n.keys(),c=0;c<b.length;c++)n.get(b[c]).value.backdrop&&(a=c);return a}function h(a){var b=c.find("body").eq(0),d=n.get(a).value;n.remove(a),j(d.modalDomEl,d.modalScope,300,function(){d.modalScope.$destroy(),b.toggleClass(m,n.length()>0),i()})}function i(){if(k&&-1==g()){var a=l;j(k,l,150,function(){a.$destroy(),a=null}),k=void 0,l=void 0}}function j(c,d,e,f){function g(){g.done||(g.done=!0,c.remove(),f&&f())}d.animate=!1;var h=a.transitionEndEventName;if(h){var i=b(g,e);c.bind(h,function(){b.cancel(i),g(),d.$apply()})}else b(g,0)}var k,l,m="modal-open",n=f.createNew(),o={};return e.$watch(g,function(a){l&&(l.index=a)}),c.bind("keydown",function(a){var b;27===a.which&&(b=n.top(),b&&b.value.keyboard&&(a.preventDefault(),e.$apply(function(){o.dismiss(b.key,"escape key press")})))}),o.open=function(a,b){n.add(a,{deferred:b.deferred,modalScope:b.scope,backdrop:b.backdrop,keyboard:b.keyboard});var f=c.find("body").eq(0),h=g();h>=0&&!k&&(l=e.$new(!0),l.index=h,k=d("<div modal-backdrop></div>")(l),f.append(k));var i=angular.element("<div modal-window></div>");i.attr({"template-url":b.windowTemplateUrl,"window-class":b.windowClass,size:b.size,index:n.length()-1,animate:"animate"}).html(b.content);var j=d(i)(b.scope);n.top().value.modalDomEl=j,f.append(j),f.addClass(m)},o.close=function(a,b){var c=n.get(a).value;c&&(c.deferred.resolve(b),h(a))},o.dismiss=function(a,b){var c=n.get(a).value;c&&(c.deferred.reject(b),h(a))},o.dismissAll=function(a){for(var b=this.getTop();b;)this.dismiss(b.key,a),b=this.getTop()},o.getTop=function(){return n.top()},o}]).provider("$modal",function(){var a={options:{backdrop:!0,keyboard:!0},$get:["$injector","$rootScope","$q","$http","$templateCache","$controller","$modalStack",function(b,c,d,e,f,g,h){function i(a){return a.template?d.when(a.template):e.get(a.templateUrl,{cache:f}).then(function(a){return a.data})}function j(a){var c=[];return angular.forEach(a,function(a){(angular.isFunction(a)||angular.isArray(a))&&c.push(d.when(b.invoke(a)))}),c}var k={};return k.open=function(b){var e=d.defer(),f=d.defer(),k={result:e.promise,opened:f.promise,close:function(a){h.close(k,a)},dismiss:function(a){h.dismiss(k,a)}};if(b=angular.extend({},a.options,b),b.resolve=b.resolve||{},!b.template&&!b.templateUrl)throw new Error("One of template or templateUrl options is required.");var l=d.all([i(b)].concat(j(b.resolve)));return l.then(function(a){var d=(b.scope||c).$new();d.$close=k.close,d.$dismiss=k.dismiss;var f,i={},j=1;b.controller&&(i.$scope=d,i.$modalInstance=k,angular.forEach(b.resolve,function(b,c){i[c]=a[j++]}),f=g(b.controller,i)),h.open(k,{scope:d,deferred:e,content:a[0],backdrop:b.backdrop,keyboard:b.keyboard,windowClass:b.windowClass,windowTemplateUrl:b.windowTemplateUrl,size:b.size})},function(a){e.reject(a)}),l.then(function(){f.resolve(!0)},function(){f.reject(!1)}),k},k}]};return a}),angular.module("ui.bootstrap.pagination",[]).controller("PaginationController",["$scope","$attrs","$parse",function(a,b,c){var d=this,e={$setViewValue:angular.noop},f=b.numPages?c(b.numPages).assign:angular.noop;this.init=function(f,g){e=f,this.config=g,e.$render=function(){d.render()},b.itemsPerPage?a.$parent.$watch(c(b.itemsPerPage),function(b){d.itemsPerPage=parseInt(b,10),a.totalPages=d.calculateTotalPages()}):this.itemsPerPage=g.itemsPerPage},this.calculateTotalPages=function(){var b=this.itemsPerPage<1?1:Math.ceil(a.totalItems/this.itemsPerPage);return Math.max(b||0,1)},this.render=function(){a.page=parseInt(e.$viewValue,10)||1},a.selectPage=function(b){a.page!==b&&b>0&&b<=a.totalPages&&(e.$setViewValue(b),e.$render())},a.getText=function(b){return a[b+"Text"]||d.config[b+"Text"]},a.noPrevious=function(){return 1===a.page},a.noNext=function(){return a.page===a.totalPages},a.$watch("totalItems",function(){a.totalPages=d.calculateTotalPages()}),a.$watch("totalPages",function(b){f(a.$parent,b),a.page>b?a.selectPage(b):e.$render()})}]).constant("paginationConfig",{itemsPerPage:10,boundaryLinks:!1,directionLinks:!0,firstText:"First",previousText:"Previous",nextText:"Next",lastText:"Last",rotate:!0}).directive("pagination",["$parse","paginationConfig",function(a,b){return{restrict:"EA",scope:{totalItems:"=",firstText:"@",previousText:"@",nextText:"@",lastText:"@"},require:["pagination","?ngModel"],controller:"PaginationController",templateUrl:"template/pagination/pagination.html",replace:!0,link:function(c,d,e,f){function g(a,b,c){return{number:a,text:b,active:c}}function h(a,b){var c=[],d=1,e=b,f=angular.isDefined(k)&&b>k;f&&(l?(d=Math.max(a-Math.floor(k/2),1),e=d+k-1,e>b&&(e=b,d=e-k+1)):(d=(Math.ceil(a/k)-1)*k+1,e=Math.min(d+k-1,b)));for(var h=d;e>=h;h++){var i=g(h,h,h===a);c.push(i)}if(f&&!l){if(d>1){var j=g(d-1,"...",!1);c.unshift(j)}if(b>e){var m=g(e+1,"...",!1);c.push(m)}}return c}var i=f[0],j=f[1];if(j){var k=angular.isDefined(e.maxSize)?c.$parent.$eval(e.maxSize):b.maxSize,l=angular.isDefined(e.rotate)?c.$parent.$eval(e.rotate):b.rotate;c.boundaryLinks=angular.isDefined(e.boundaryLinks)?c.$parent.$eval(e.boundaryLinks):b.boundaryLinks,c.directionLinks=angular.isDefined(e.directionLinks)?c.$parent.$eval(e.directionLinks):b.directionLinks,i.init(j,b),e.maxSize&&c.$parent.$watch(a(e.maxSize),function(a){k=parseInt(a,10),i.render()});var m=i.render;i.render=function(){m(),c.page>0&&c.page<=c.totalPages&&(c.pages=h(c.page,c.totalPages))}}}}}]).constant("pagerConfig",{itemsPerPage:10,previousText:"« Previous",nextText:"Next »",align:!0}).directive("pager",["pagerConfig",function(a){return{restrict:"EA",scope:{totalItems:"=",previousText:"@",nextText:"@"},require:["pager","?ngModel"],controller:"PaginationController",templateUrl:"template/pagination/pager.html",replace:!0,link:function(b,c,d,e){var f=e[0],g=e[1];g&&(b.align=angular.isDefined(d.align)?b.$parent.$eval(d.align):a.align,f.init(g,a))}}}]),angular.module("ui.bootstrap.tooltip",["ui.bootstrap.position","ui.bootstrap.bindHtml"]).provider("$tooltip",function(){function a(a){var b=/[A-Z]/g,c="-";
return a.replace(b,function(a,b){return(b?c:"")+a.toLowerCase()})}var b={placement:"top",animation:!0,popupDelay:0},c={mouseenter:"mouseleave",click:"click",focus:"blur"},d={};this.options=function(a){angular.extend(d,a)},this.setTriggers=function(a){angular.extend(c,a)},this.$get=["$window","$compile","$timeout","$parse","$document","$position","$interpolate",function(e,f,g,h,i,j,k){return function(e,l,m){function n(a){var b=a||o.trigger||m,d=c[b]||b;return{show:b,hide:d}}var o=angular.extend({},b,d),p=a(e),q=k.startSymbol(),r=k.endSymbol(),s="<div "+p+'-popup title="'+q+"tt_title"+r+'" content="'+q+"tt_content"+r+'" placement="'+q+"tt_placement"+r+'" animation="tt_animation" is-open="tt_isOpen"></div>';return{restrict:"EA",scope:!0,compile:function(){var a=f(s);return function(b,c,d){function f(){b.tt_isOpen?m():k()}function k(){(!y||b.$eval(d[l+"Enable"]))&&(b.tt_popupDelay?v||(v=g(p,b.tt_popupDelay,!1),v.then(function(a){a()})):p()())}function m(){b.$apply(function(){q()})}function p(){return v=null,u&&(g.cancel(u),u=null),b.tt_content?(r(),t.css({top:0,left:0,display:"block"}),w?i.find("body").append(t):c.after(t),z(),b.tt_isOpen=!0,b.$digest(),z):angular.noop}function q(){b.tt_isOpen=!1,g.cancel(v),v=null,b.tt_animation?u||(u=g(s,500)):s()}function r(){t&&s(),t=a(b,function(){}),b.$digest()}function s(){u=null,t&&(t.remove(),t=null)}var t,u,v,w=angular.isDefined(o.appendToBody)?o.appendToBody:!1,x=n(void 0),y=angular.isDefined(d[l+"Enable"]),z=function(){var a=j.positionElements(c,t,b.tt_placement,w);a.top+="px",a.left+="px",t.css(a)};b.tt_isOpen=!1,d.$observe(e,function(a){b.tt_content=a,!a&&b.tt_isOpen&&q()}),d.$observe(l+"Title",function(a){b.tt_title=a}),d.$observe(l+"Placement",function(a){b.tt_placement=angular.isDefined(a)?a:o.placement}),d.$observe(l+"PopupDelay",function(a){var c=parseInt(a,10);b.tt_popupDelay=isNaN(c)?o.popupDelay:c});var A=function(){c.unbind(x.show,k),c.unbind(x.hide,m)};d.$observe(l+"Trigger",function(a){A(),x=n(a),x.show===x.hide?c.bind(x.show,f):(c.bind(x.show,k),c.bind(x.hide,m))});var B=b.$eval(d[l+"Animation"]);b.tt_animation=angular.isDefined(B)?!!B:o.animation,d.$observe(l+"AppendToBody",function(a){w=angular.isDefined(a)?h(a)(b):w}),w&&b.$on("$locationChangeSuccess",function(){b.tt_isOpen&&q()}),b.$on("$destroy",function(){g.cancel(u),g.cancel(v),A(),s()})}}}}}]}).directive("tooltipPopup",function(){return{restrict:"EA",replace:!0,scope:{content:"@",placement:"@",animation:"&",isOpen:"&"},templateUrl:"template/tooltip/tooltip-popup.html"}}).directive("tooltip",["$tooltip",function(a){return a("tooltip","tooltip","mouseenter")}]).directive("tooltipHtmlUnsafePopup",function(){return{restrict:"EA",replace:!0,scope:{content:"@",placement:"@",animation:"&",isOpen:"&"},templateUrl:"template/tooltip/tooltip-html-unsafe-popup.html"}}).directive("tooltipHtmlUnsafe",["$tooltip",function(a){return a("tooltipHtmlUnsafe","tooltip","mouseenter")}]),angular.module("ui.bootstrap.popover",["ui.bootstrap.tooltip"]).directive("popoverPopup",function(){return{restrict:"EA",replace:!0,scope:{title:"@",content:"@",placement:"@",animation:"&",isOpen:"&"},templateUrl:"template/popover/popover.html"}}).directive("popover",["$tooltip",function(a){return a("popover","popover","click")}]),angular.module("ui.bootstrap.progressbar",[]).constant("progressConfig",{animate:!0,max:100}).controller("ProgressController",["$scope","$attrs","progressConfig",function(a,b,c){var d=this,e=angular.isDefined(b.animate)?a.$parent.$eval(b.animate):c.animate;this.bars=[],a.max=angular.isDefined(b.max)?a.$parent.$eval(b.max):c.max,this.addBar=function(b,c){e||c.css({transition:"none"}),this.bars.push(b),b.$watch("value",function(c){b.percent=+(100*c/a.max).toFixed(2)}),b.$on("$destroy",function(){c=null,d.removeBar(b)})},this.removeBar=function(a){this.bars.splice(this.bars.indexOf(a),1)}}]).directive("progress",function(){return{restrict:"EA",replace:!0,transclude:!0,controller:"ProgressController",require:"progress",scope:{},templateUrl:"template/progressbar/progress.html"}}).directive("bar",function(){return{restrict:"EA",replace:!0,transclude:!0,require:"^progress",scope:{value:"=",type:"@"},templateUrl:"template/progressbar/bar.html",link:function(a,b,c,d){d.addBar(a,b)}}}).directive("progressbar",function(){return{restrict:"EA",replace:!0,transclude:!0,controller:"ProgressController",scope:{value:"=",type:"@"},templateUrl:"template/progressbar/progressbar.html",link:function(a,b,c,d){d.addBar(a,angular.element(b.children()[0]))}}}),angular.module("ui.bootstrap.rating",[]).constant("ratingConfig",{max:5,stateOn:null,stateOff:null}).controller("RatingController",["$scope","$attrs","ratingConfig",function(a,b,c){var d={$setViewValue:angular.noop};this.init=function(e){d=e,d.$render=this.render,this.stateOn=angular.isDefined(b.stateOn)?a.$parent.$eval(b.stateOn):c.stateOn,this.stateOff=angular.isDefined(b.stateOff)?a.$parent.$eval(b.stateOff):c.stateOff;var f=angular.isDefined(b.ratingStates)?a.$parent.$eval(b.ratingStates):new Array(angular.isDefined(b.max)?a.$parent.$eval(b.max):c.max);a.range=this.buildTemplateObjects(f)},this.buildTemplateObjects=function(a){for(var b=0,c=a.length;c>b;b++)a[b]=angular.extend({index:b},{stateOn:this.stateOn,stateOff:this.stateOff},a[b]);return a},a.rate=function(b){!a.readonly&&b>=0&&b<=a.range.length&&(d.$setViewValue(b),d.$render())},a.enter=function(b){a.readonly||(a.value=b),a.onHover({value:b})},a.reset=function(){a.value=d.$viewValue,a.onLeave()},a.onKeydown=function(b){/(37|38|39|40)/.test(b.which)&&(b.preventDefault(),b.stopPropagation(),a.rate(a.value+(38===b.which||39===b.which?1:-1)))},this.render=function(){a.value=d.$viewValue}}]).directive("rating",function(){return{restrict:"EA",require:["rating","ngModel"],scope:{readonly:"=?",onHover:"&",onLeave:"&"},controller:"RatingController",templateUrl:"template/rating/rating.html",replace:!0,link:function(a,b,c,d){var e=d[0],f=d[1];f&&e.init(f)}}}),angular.module("ui.bootstrap.tabs",[]).controller("TabsetController",["$scope",function(a){var b=this,c=b.tabs=a.tabs=[];b.select=function(a){angular.forEach(c,function(b){b.active&&b!==a&&(b.active=!1,b.onDeselect())}),a.active=!0,a.onSelect()},b.addTab=function(a){c.push(a),1===c.length?a.active=!0:a.active&&b.select(a)},b.removeTab=function(a){var d=c.indexOf(a);if(a.active&&c.length>1){var e=d==c.length-1?d-1:d+1;b.select(c[e])}c.splice(d,1)}}]).directive("tabset",function(){return{restrict:"EA",transclude:!0,replace:!0,scope:{type:"@"},controller:"TabsetController",templateUrl:"template/tabs/tabset.html",link:function(a,b,c){a.vertical=angular.isDefined(c.vertical)?a.$parent.$eval(c.vertical):!1,a.justified=angular.isDefined(c.justified)?a.$parent.$eval(c.justified):!1}}}).directive("tab",["$parse",function(a){return{require:"^tabset",restrict:"EA",replace:!0,templateUrl:"template/tabs/tab.html",transclude:!0,scope:{active:"=?",heading:"@",onSelect:"&select",onDeselect:"&deselect"},controller:function(){},compile:function(b,c,d){return function(b,c,e,f){b.$watch("active",function(a){a&&f.select(b)}),b.disabled=!1,e.disabled&&b.$parent.$watch(a(e.disabled),function(a){b.disabled=!!a}),b.select=function(){b.disabled||(b.active=!0)},f.addTab(b),b.$on("$destroy",function(){f.removeTab(b)}),b.$transcludeFn=d}}}}]).directive("tabHeadingTransclude",[function(){return{restrict:"A",require:"^tab",link:function(a,b){a.$watch("headingElement",function(a){a&&(b.html(""),b.append(a))})}}}]).directive("tabContentTransclude",function(){function a(a){return a.tagName&&(a.hasAttribute("tab-heading")||a.hasAttribute("data-tab-heading")||"tab-heading"===a.tagName.toLowerCase()||"data-tab-heading"===a.tagName.toLowerCase())}return{restrict:"A",require:"^tabset",link:function(b,c,d){var e=b.$eval(d.tabContentTransclude);e.$transcludeFn(e.$parent,function(b){angular.forEach(b,function(b){a(b)?e.headingElement=b:c.append(b)})})}}}),angular.module("ui.bootstrap.timepicker",[]).constant("timepickerConfig",{hourStep:1,minuteStep:1,showMeridian:!0,meridians:null,readonlyInput:!1,mousewheel:!0}).controller("TimepickerController",["$scope","$attrs","$parse","$log","$locale","timepickerConfig",function(a,b,c,d,e,f){function g(){var b=parseInt(a.hours,10),c=a.showMeridian?b>0&&13>b:b>=0&&24>b;return c?(a.showMeridian&&(12===b&&(b=0),a.meridian===p[1]&&(b+=12)),b):void 0}function h(){var b=parseInt(a.minutes,10);return b>=0&&60>b?b:void 0}function i(a){return angular.isDefined(a)&&a.toString().length<2?"0"+a:a}function j(a){k(),o.$setViewValue(new Date(n)),l(a)}function k(){o.$setValidity("time",!0),a.invalidHours=!1,a.invalidMinutes=!1}function l(b){var c=n.getHours(),d=n.getMinutes();a.showMeridian&&(c=0===c||12===c?12:c%12),a.hours="h"===b?c:i(c),a.minutes="m"===b?d:i(d),a.meridian=n.getHours()<12?p[0]:p[1]}function m(a){var b=new Date(n.getTime()+6e4*a);n.setHours(b.getHours(),b.getMinutes()),j()}var n=new Date,o={$setViewValue:angular.noop},p=angular.isDefined(b.meridians)?a.$parent.$eval(b.meridians):f.meridians||e.DATETIME_FORMATS.AMPMS;this.init=function(c,d){o=c,o.$render=this.render;var e=d.eq(0),g=d.eq(1),h=angular.isDefined(b.mousewheel)?a.$parent.$eval(b.mousewheel):f.mousewheel;h&&this.setupMousewheelEvents(e,g),a.readonlyInput=angular.isDefined(b.readonlyInput)?a.$parent.$eval(b.readonlyInput):f.readonlyInput,this.setupInputEvents(e,g)};var q=f.hourStep;b.hourStep&&a.$parent.$watch(c(b.hourStep),function(a){q=parseInt(a,10)});var r=f.minuteStep;b.minuteStep&&a.$parent.$watch(c(b.minuteStep),function(a){r=parseInt(a,10)}),a.showMeridian=f.showMeridian,b.showMeridian&&a.$parent.$watch(c(b.showMeridian),function(b){if(a.showMeridian=!!b,o.$error.time){var c=g(),d=h();angular.isDefined(c)&&angular.isDefined(d)&&(n.setHours(c),j())}else l()}),this.setupMousewheelEvents=function(b,c){var d=function(a){a.originalEvent&&(a=a.originalEvent);var b=a.wheelDelta?a.wheelDelta:-a.deltaY;return a.detail||b>0};b.bind("mousewheel wheel",function(b){a.$apply(d(b)?a.incrementHours():a.decrementHours()),b.preventDefault()}),c.bind("mousewheel wheel",function(b){a.$apply(d(b)?a.incrementMinutes():a.decrementMinutes()),b.preventDefault()})},this.setupInputEvents=function(b,c){if(a.readonlyInput)return a.updateHours=angular.noop,void(a.updateMinutes=angular.noop);var d=function(b,c){o.$setViewValue(null),o.$setValidity("time",!1),angular.isDefined(b)&&(a.invalidHours=b),angular.isDefined(c)&&(a.invalidMinutes=c)};a.updateHours=function(){var a=g();angular.isDefined(a)?(n.setHours(a),j("h")):d(!0)},b.bind("blur",function(){!a.invalidHours&&a.hours<10&&a.$apply(function(){a.hours=i(a.hours)})}),a.updateMinutes=function(){var a=h();angular.isDefined(a)?(n.setMinutes(a),j("m")):d(void 0,!0)},c.bind("blur",function(){!a.invalidMinutes&&a.minutes<10&&a.$apply(function(){a.minutes=i(a.minutes)})})},this.render=function(){var a=o.$modelValue?new Date(o.$modelValue):null;isNaN(a)?(o.$setValidity("time",!1),d.error('Timepicker directive: "ng-model" value must be a Date object, a number of milliseconds since 01.01.1970 or a string representing an RFC2822 or ISO 8601 date.')):(a&&(n=a),k(),l())},a.incrementHours=function(){m(60*q)},a.decrementHours=function(){m(60*-q)},a.incrementMinutes=function(){m(r)},a.decrementMinutes=function(){m(-r)},a.toggleMeridian=function(){m(720*(n.getHours()<12?1:-1))}}]).directive("timepicker",function(){return{restrict:"EA",require:["timepicker","?^ngModel"],controller:"TimepickerController",replace:!0,scope:{},templateUrl:"template/timepicker/timepicker.html",link:function(a,b,c,d){var e=d[0],f=d[1];f&&e.init(f,b.find("input"))}}}),angular.module("ui.bootstrap.typeahead",["ui.bootstrap.position","ui.bootstrap.bindHtml"]).factory("typeaheadParser",["$parse",function(a){var b=/^\s*(.*?)(?:\s+as\s+(.*?))?\s+for\s+(?:([\$\w][\$\w\d]*))\s+in\s+(.*)$/;return{parse:function(c){var d=c.match(b);if(!d)throw new Error('Expected typeahead specification in form of "_modelValue_ (as _label_)? for _item_ in _collection_" but got "'+c+'".');return{itemName:d[3],source:a(d[4]),viewMapper:a(d[2]||d[1]),modelMapper:a(d[1])}}}}]).directive("typeahead",["$compile","$parse","$q","$timeout","$document","$position","typeaheadParser",function(a,b,c,d,e,f,g){var h=[9,13,27,38,40];return{require:"ngModel",link:function(i,j,k,l){var m,n=i.$eval(k.typeaheadMinLength)||1,o=i.$eval(k.typeaheadWaitMs)||0,p=i.$eval(k.typeaheadEditable)!==!1,q=b(k.typeaheadLoading).assign||angular.noop,r=b(k.typeaheadOnSelect),s=k.typeaheadInputFormatter?b(k.typeaheadInputFormatter):void 0,t=k.typeaheadAppendToBody?i.$eval(k.typeaheadAppendToBody):!1,u=b(k.ngModel).assign,v=g.parse(k.typeahead),w=i.$new();i.$on("$destroy",function(){w.$destroy()});var x="typeahead-"+w.$id+"-"+Math.floor(1e4*Math.random());j.attr({"aria-autocomplete":"list","aria-expanded":!1,"aria-owns":x});var y=angular.element("<div typeahead-popup></div>");y.attr({id:x,matches:"matches",active:"activeIdx",select:"select(activeIdx)",query:"query",position:"position"}),angular.isDefined(k.typeaheadTemplateUrl)&&y.attr("template-url",k.typeaheadTemplateUrl);var z=function(){w.matches=[],w.activeIdx=-1,j.attr("aria-expanded",!1)},A=function(a){return x+"-option-"+a};w.$watch("activeIdx",function(a){0>a?j.removeAttr("aria-activedescendant"):j.attr("aria-activedescendant",A(a))});var B=function(a){var b={$viewValue:a};q(i,!0),c.when(v.source(i,b)).then(function(c){var d=a===l.$viewValue;if(d&&m)if(c.length>0){w.activeIdx=0,w.matches.length=0;for(var e=0;e<c.length;e++)b[v.itemName]=c[e],w.matches.push({id:A(e),label:v.viewMapper(w,b),model:c[e]});w.query=a,w.position=t?f.offset(j):f.position(j),w.position.top=w.position.top+j.prop("offsetHeight"),j.attr("aria-expanded",!0)}else z();d&&q(i,!1)},function(){z(),q(i,!1)})};z(),w.query=void 0;var C;l.$parsers.unshift(function(a){return m=!0,a&&a.length>=n?o>0?(C&&d.cancel(C),C=d(function(){B(a)},o)):B(a):(q(i,!1),z()),p?a:a?void l.$setValidity("editable",!1):(l.$setValidity("editable",!0),a)}),l.$formatters.push(function(a){var b,c,d={};return s?(d.$model=a,s(i,d)):(d[v.itemName]=a,b=v.viewMapper(i,d),d[v.itemName]=void 0,c=v.viewMapper(i,d),b!==c?b:a)}),w.select=function(a){var b,c,e={};e[v.itemName]=c=w.matches[a].model,b=v.modelMapper(i,e),u(i,b),l.$setValidity("editable",!0),r(i,{$item:c,$model:b,$label:v.viewMapper(i,e)}),z(),d(function(){j[0].focus()},0,!1)},j.bind("keydown",function(a){0!==w.matches.length&&-1!==h.indexOf(a.which)&&(a.preventDefault(),40===a.which?(w.activeIdx=(w.activeIdx+1)%w.matches.length,w.$digest()):38===a.which?(w.activeIdx=(w.activeIdx?w.activeIdx:w.matches.length)-1,w.$digest()):13===a.which||9===a.which?w.$apply(function(){w.select(w.activeIdx)}):27===a.which&&(a.stopPropagation(),z(),w.$digest()))}),j.bind("blur",function(){m=!1});var D=function(a){j[0]!==a.target&&(z(),w.$digest())};e.bind("click",D),i.$on("$destroy",function(){e.unbind("click",D)});var E=a(y)(w);t?e.find("body").append(E):j.after(E)}}}]).directive("typeaheadPopup",function(){return{restrict:"EA",scope:{matches:"=",query:"=",active:"=",position:"=",select:"&"},replace:!0,templateUrl:"template/typeahead/typeahead-popup.html",link:function(a,b,c){a.templateUrl=c.templateUrl,a.isOpen=function(){return a.matches.length>0},a.isActive=function(b){return a.active==b},a.selectActive=function(b){a.active=b},a.selectMatch=function(b){a.select({activeIdx:b})}}}}).directive("typeaheadMatch",["$http","$templateCache","$compile","$parse",function(a,b,c,d){return{restrict:"EA",scope:{index:"=",match:"=",query:"="},link:function(e,f,g){var h=d(g.templateUrl)(e.$parent)||"template/typeahead/typeahead-match.html";a.get(h,{cache:b}).success(function(a){f.replaceWith(c(a.trim())(e))})}}}]).filter("typeaheadHighlight",function(){function a(a){return a.replace(/([.?*+^$[\]\\(){}|-])/g,"\\$1")}return function(b,c){return c?(""+b).replace(new RegExp(a(c),"gi"),"<strong>$&</strong>"):b}}),angular.module("template/accordion/accordion-group.html",[]).run(["$templateCache",function(a){a.put("template/accordion/accordion-group.html",'<div class="panel panel-default">\n  <div class="panel-heading">\n    <h4 class="panel-title">\n      <a class="accordion-toggle" ng-click="toggleOpen()" accordion-transclude="heading"><span ng-class="{\'text-muted\': isDisabled}">{{heading}}</span></a>\n    </h4>\n  </div>\n  <div class="panel-collapse" collapse="!isOpen">\n	  <div class="panel-body" ng-transclude></div>\n  </div>\n</div>')}]),angular.module("template/accordion/accordion.html",[]).run(["$templateCache",function(a){a.put("template/accordion/accordion.html",'<div class="panel-group" ng-transclude></div>')}]),angular.module("template/alert/alert.html",[]).run(["$templateCache",function(a){a.put("template/alert/alert.html",'<div class="alert" ng-class="{\'alert-{{type || \'warning\'}}\': true, \'alert-dismissable\': closeable}" role="alert">\n    <button ng-show="closeable" type="button" class="close" ng-click="close()">\n        <span aria-hidden="true">&times;</span>\n        <span class="sr-only">Close</span>\n    </button>\n    <div ng-transclude></div>\n</div>\n')}]),angular.module("template/carousel/carousel.html",[]).run(["$templateCache",function(a){a.put("template/carousel/carousel.html",'<div ng-mouseenter="pause()" ng-mouseleave="play()" class="carousel" ng-swipe-right="prev()" ng-swipe-left="next()">\n    <ol class="carousel-indicators" ng-show="slides.length > 1">\n        <li ng-repeat="slide in slides track by $index" ng-class="{active: isActive(slide)}" ng-click="select(slide)"></li>\n    </ol>\n    <div class="carousel-inner" ng-transclude></div>\n    <a class="left carousel-control" ng-click="prev()" ng-show="slides.length > 1"><span class="glyphicon glyphicon-chevron-left"></span></a>\n    <a class="right carousel-control" ng-click="next()" ng-show="slides.length > 1"><span class="glyphicon glyphicon-chevron-right"></span></a>\n</div>\n')}]),angular.module("template/carousel/slide.html",[]).run(["$templateCache",function(a){a.put("template/carousel/slide.html","<div ng-class=\"{\n    'active': leaving || (active && !entering),\n    'prev': (next || active) && direction=='prev',\n    'next': (next || active) && direction=='next',\n    'right': direction=='prev',\n    'left': direction=='next'\n  }\" class=\"item text-center\" ng-transclude></div>\n")}]),angular.module("template/datepicker/datepicker.html",[]).run(["$templateCache",function(a){a.put("template/datepicker/datepicker.html",'<div ng-switch="datepickerMode" role="application" ng-keydown="keydown($event)">\n  <daypicker ng-switch-when="day" tabindex="0"></daypicker>\n  <monthpicker ng-switch-when="month" tabindex="0"></monthpicker>\n  <yearpicker ng-switch-when="year" tabindex="0"></yearpicker>\n</div>')}]),angular.module("template/datepicker/day.html",[]).run(["$templateCache",function(a){a.put("template/datepicker/day.html",'<table role="grid" aria-labelledby="{{uniqueId}}-title" aria-activedescendant="{{activeDateId}}">\n  <thead>\n    <tr>\n      <th><button type="button" class="btn btn-default btn-sm pull-left" ng-click="move(-1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-left"></i></button></th>\n      <th colspan="{{5 + showWeeks}}"><button id="{{uniqueId}}-title" role="heading" aria-live="assertive" aria-atomic="true" type="button" class="btn btn-default btn-sm" ng-click="toggleMode()" tabindex="-1" style="width:100%;"><strong>{{title}}</strong></button></th>\n      <th><button type="button" class="btn btn-default btn-sm pull-right" ng-click="move(1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-right"></i></button></th>\n    </tr>\n    <tr>\n      <th ng-show="showWeeks" class="text-center"></th>\n      <th ng-repeat="label in labels track by $index" class="text-center"><small aria-label="{{label.full}}">{{label.abbr}}</small></th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr ng-repeat="row in rows track by $index">\n      <td ng-show="showWeeks" class="text-center h6"><em>{{ weekNumbers[$index] }}</em></td>\n      <td ng-repeat="dt in row track by dt.date" class="text-center" role="gridcell" id="{{dt.uid}}" aria-disabled="{{!!dt.disabled}}">\n        <button type="button" style="width:100%;" class="btn btn-default btn-sm" ng-class="{\'btn-info\': dt.selected, active: isActive(dt)}" ng-click="select(dt.date)" ng-disabled="dt.disabled" tabindex="-1"><span ng-class="{\'text-muted\': dt.secondary, \'text-info\': dt.current}">{{dt.label}}</span></button>\n      </td>\n    </tr>\n  </tbody>\n</table>\n')}]),angular.module("template/datepicker/month.html",[]).run(["$templateCache",function(a){a.put("template/datepicker/month.html",'<table role="grid" aria-labelledby="{{uniqueId}}-title" aria-activedescendant="{{activeDateId}}">\n  <thead>\n    <tr>\n      <th><button type="button" class="btn btn-default btn-sm pull-left" ng-click="move(-1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-left"></i></button></th>\n      <th><button id="{{uniqueId}}-title" role="heading" aria-live="assertive" aria-atomic="true" type="button" class="btn btn-default btn-sm" ng-click="toggleMode()" tabindex="-1" style="width:100%;"><strong>{{title}}</strong></button></th>\n      <th><button type="button" class="btn btn-default btn-sm pull-right" ng-click="move(1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-right"></i></button></th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr ng-repeat="row in rows track by $index">\n      <td ng-repeat="dt in row track by dt.date" class="text-center" role="gridcell" id="{{dt.uid}}" aria-disabled="{{!!dt.disabled}}">\n        <button type="button" style="width:100%;" class="btn btn-default" ng-class="{\'btn-info\': dt.selected, active: isActive(dt)}" ng-click="select(dt.date)" ng-disabled="dt.disabled" tabindex="-1"><span ng-class="{\'text-info\': dt.current}">{{dt.label}}</span></button>\n      </td>\n    </tr>\n  </tbody>\n</table>\n')}]),angular.module("template/datepicker/popup.html",[]).run(["$templateCache",function(a){a.put("template/datepicker/popup.html",'<ul class="dropdown-menu" ng-style="{display: (isOpen && \'block\') || \'none\', top: position.top+\'px\', left: position.left+\'px\'}" ng-keydown="keydown($event)">\n	<li ng-transclude></li>\n	<li ng-if="showButtonBar" style="padding:10px 9px 2px">\n		<span class="btn-group">\n			<button type="button" class="btn btn-sm btn-info" ng-click="select(\'today\')">{{ getText(\'current\') }}</button>\n			<button type="button" class="btn btn-sm btn-danger" ng-click="select(null)">{{ getText(\'clear\') }}</button>\n		</span>\n		<button type="button" class="btn btn-sm btn-success pull-right" ng-click="close()">{{ getText(\'close\') }}</button>\n	</li>\n</ul>\n')}]),angular.module("template/datepicker/year.html",[]).run(["$templateCache",function(a){a.put("template/datepicker/year.html",'<table role="grid" aria-labelledby="{{uniqueId}}-title" aria-activedescendant="{{activeDateId}}">\n  <thead>\n    <tr>\n      <th><button type="button" class="btn btn-default btn-sm pull-left" ng-click="move(-1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-left"></i></button></th>\n      <th colspan="3"><button id="{{uniqueId}}-title" role="heading" aria-live="assertive" aria-atomic="true" type="button" class="btn btn-default btn-sm" ng-click="toggleMode()" tabindex="-1" style="width:100%;"><strong>{{title}}</strong></button></th>\n      <th><button type="button" class="btn btn-default btn-sm pull-right" ng-click="move(1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-right"></i></button></th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr ng-repeat="row in rows track by $index">\n      <td ng-repeat="dt in row track by dt.date" class="text-center" role="gridcell" id="{{dt.uid}}" aria-disabled="{{!!dt.disabled}}">\n        <button type="button" style="width:100%;" class="btn btn-default" ng-class="{\'btn-info\': dt.selected, active: isActive(dt)}" ng-click="select(dt.date)" ng-disabled="dt.disabled" tabindex="-1"><span ng-class="{\'text-info\': dt.current}">{{dt.label}}</span></button>\n      </td>\n    </tr>\n  </tbody>\n</table>\n')}]),angular.module("template/modal/backdrop.html",[]).run(["$templateCache",function(a){a.put("template/modal/backdrop.html",'<div class="modal-backdrop fade"\n     ng-class="{in: animate}"\n     ng-style="{\'z-index\': 1040 + (index && 1 || 0) + index*10}"\n></div>\n')}]),angular.module("template/modal/window.html",[]).run(["$templateCache",function(a){a.put("template/modal/window.html",'<div tabindex="-1" role="dialog" class="modal fade" ng-class="{in: animate}" ng-style="{\'z-index\': 1050 + index*10, display: \'block\'}" ng-click="close($event)">\n    <div class="modal-dialog" ng-class="{\'modal-sm\': size == \'sm\', \'modal-lg\': size == \'lg\'}"><div class="modal-content" ng-transclude></div></div>\n</div>')}]),angular.module("template/pagination/pager.html",[]).run(["$templateCache",function(a){a.put("template/pagination/pager.html",'<ul class="pager">\n  <li ng-class="{disabled: noPrevious(), previous: align}"><a href ng-click="selectPage(page - 1)">{{getText(\'previous\')}}</a></li>\n  <li ng-class="{disabled: noNext(), next: align}"><a href ng-click="selectPage(page + 1)">{{getText(\'next\')}}</a></li>\n</ul>')}]),angular.module("template/pagination/pagination.html",[]).run(["$templateCache",function(a){a.put("template/pagination/pagination.html",'<ul class="pagination">\n  <li ng-if="boundaryLinks" ng-class="{disabled: noPrevious()}"><a href ng-click="selectPage(1)">{{getText(\'first\')}}</a></li>\n  <li ng-if="directionLinks" ng-class="{disabled: noPrevious()}"><a href ng-click="selectPage(page - 1)">{{getText(\'previous\')}}</a></li>\n  <li ng-repeat="page in pages track by $index" ng-class="{active: page.active}"><a href ng-click="selectPage(page.number)">{{page.text}}</a></li>\n  <li ng-if="directionLinks" ng-class="{disabled: noNext()}"><a href ng-click="selectPage(page + 1)">{{getText(\'next\')}}</a></li>\n  <li ng-if="boundaryLinks" ng-class="{disabled: noNext()}"><a href ng-click="selectPage(totalPages)">{{getText(\'last\')}}</a></li>\n</ul>')}]),angular.module("template/tooltip/tooltip-html-unsafe-popup.html",[]).run(["$templateCache",function(a){a.put("template/tooltip/tooltip-html-unsafe-popup.html",'<div class="tooltip {{placement}}" ng-class="{ in: isOpen(), fade: animation() }">\n  <div class="tooltip-arrow"></div>\n  <div class="tooltip-inner" bind-html-unsafe="content"></div>\n</div>\n')}]),angular.module("template/tooltip/tooltip-popup.html",[]).run(["$templateCache",function(a){a.put("template/tooltip/tooltip-popup.html",'<div class="tooltip {{placement}}" ng-class="{ in: isOpen(), fade: animation() }">\n  <div class="tooltip-arrow"></div>\n  <div class="tooltip-inner" ng-bind="content"></div>\n</div>\n')}]),angular.module("template/popover/popover.html",[]).run(["$templateCache",function(a){a.put("template/popover/popover.html",'<div class="popover {{placement}}" ng-class="{ in: isOpen(), fade: animation() }">\n  <div class="arrow"></div>\n\n  <div class="popover-inner">\n      <h3 class="popover-title" ng-bind="title" ng-show="title"></h3>\n      <div class="popover-content" ng-bind="content"></div>\n  </div>\n</div>\n')}]),angular.module("template/progressbar/bar.html",[]).run(["$templateCache",function(a){a.put("template/progressbar/bar.html",'<div class="progress-bar" ng-class="type && \'progress-bar-\' + type" role="progressbar" aria-valuenow="{{value}}" aria-valuemin="0" aria-valuemax="{{max}}" ng-style="{width: percent + \'%\'}" aria-valuetext="{{percent | number:0}}%" ng-transclude></div>')}]),angular.module("template/progressbar/progress.html",[]).run(["$templateCache",function(a){a.put("template/progressbar/progress.html",'<div class="progress" ng-transclude></div>')}]),angular.module("template/progressbar/progressbar.html",[]).run(["$templateCache",function(a){a.put("template/progressbar/progressbar.html",'<div class="progress">\n  <div class="progress-bar" ng-class="type && \'progress-bar-\' + type" role="progressbar" aria-valuenow="{{value}}" aria-valuemin="0" aria-valuemax="{{max}}" ng-style="{width: percent + \'%\'}" aria-valuetext="{{percent | number:0}}%" ng-transclude></div>\n</div>')}]),angular.module("template/rating/rating.html",[]).run(["$templateCache",function(a){a.put("template/rating/rating.html",'<span ng-mouseleave="reset()" ng-keydown="onKeydown($event)" tabindex="0" role="slider" aria-valuemin="0" aria-valuemax="{{range.length}}" aria-valuenow="{{value}}">\n    <i ng-repeat="r in range track by $index" ng-mouseenter="enter($index + 1)" ng-click="rate($index + 1)" class="glyphicon" ng-class="$index < value && (r.stateOn || \'glyphicon-star\') || (r.stateOff || \'glyphicon-star-empty\')">\n        <span class="sr-only">({{ $index < value ? \'*\' : \' \' }})</span>\n    </i>\n</span>')}]),angular.module("template/tabs/tab.html",[]).run(["$templateCache",function(a){a.put("template/tabs/tab.html",'<li ng-class="{active: active, disabled: disabled}">\n  <a ng-click="select()" tab-heading-transclude>{{heading}}</a>\n</li>\n')}]),angular.module("template/tabs/tabset-titles.html",[]).run(["$templateCache",function(a){a.put("template/tabs/tabset-titles.html","<ul class=\"nav {{type && 'nav-' + type}}\" ng-class=\"{'nav-stacked': vertical}\">\n</ul>\n")}]),angular.module("template/tabs/tabset.html",[]).run(["$templateCache",function(a){a.put("template/tabs/tabset.html",'\n<div>\n  <ul class="nav nav-{{type || \'tabs\'}}" ng-class="{\'nav-stacked\': vertical, \'nav-justified\': justified}" ng-transclude></ul>\n  <div class="tab-content">\n    <div class="tab-pane" \n         ng-repeat="tab in tabs" \n         ng-class="{active: tab.active}"\n         tab-content-transclude="tab">\n    </div>\n  </div>\n</div>\n')}]),angular.module("template/timepicker/timepicker.html",[]).run(["$templateCache",function(a){a.put("template/timepicker/timepicker.html",'<table>\n	<tbody>\n		<tr class="text-center">\n			<td><a ng-click="incrementHours()" class="btn btn-link"><span class="glyphicon glyphicon-chevron-up"></span></a></td>\n			<td>&nbsp;</td>\n			<td><a ng-click="incrementMinutes()" class="btn btn-link"><span class="glyphicon glyphicon-chevron-up"></span></a></td>\n			<td ng-show="showMeridian"></td>\n		</tr>\n		<tr>\n			<td style="width:50px;" class="form-group" ng-class="{\'has-error\': invalidHours}">\n				<input type="text" ng-model="hours" ng-change="updateHours()" class="form-control text-center" ng-mousewheel="incrementHours()" ng-readonly="readonlyInput" maxlength="2">\n			</td>\n			<td>:</td>\n			<td style="width:50px;" class="form-group" ng-class="{\'has-error\': invalidMinutes}">\n				<input type="text" ng-model="minutes" ng-change="updateMinutes()" class="form-control text-center" ng-readonly="readonlyInput" maxlength="2">\n			</td>\n			<td ng-show="showMeridian"><button type="button" class="btn btn-default text-center" ng-click="toggleMeridian()">{{meridian}}</button></td>\n		</tr>\n		<tr class="text-center">\n			<td><a ng-click="decrementHours()" class="btn btn-link"><span class="glyphicon glyphicon-chevron-down"></span></a></td>\n			<td>&nbsp;</td>\n			<td><a ng-click="decrementMinutes()" class="btn btn-link"><span class="glyphicon glyphicon-chevron-down"></span></a></td>\n			<td ng-show="showMeridian"></td>\n		</tr>\n	</tbody>\n</table>\n')}]),angular.module("template/typeahead/typeahead-match.html",[]).run(["$templateCache",function(a){a.put("template/typeahead/typeahead-match.html",'<a tabindex="-1" bind-html-unsafe="match.label | typeaheadHighlight:query"></a>')}]),angular.module("template/typeahead/typeahead-popup.html",[]).run(["$templateCache",function(a){a.put("template/typeahead/typeahead-popup.html",'<ul class="dropdown-menu" ng-if="isOpen()" ng-style="{top: position.top+\'px\', left: position.left+\'px\'}" style="display: block;" role="listbox" aria-hidden="{{!isOpen()}}">\n    <li ng-repeat="match in matches track by $index" ng-class="{active: isActive($index) }" ng-mouseenter="selectActive($index)" ng-click="selectMatch($index)" role="option" id="{{match.id}}">\n        <div typeahead-match index="$index" match="match" query="query" template-url="templateUrl"></div>\n    </li>\n</ul>')
}]);
/**
 * State-based routing for AngularJS
 * @version v0.2.10
 * @link http://angular-ui.github.com/
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
"undefined"!=typeof module&&"undefined"!=typeof exports&&module.exports===exports&&(module.exports="ui.router"),function(a,b,c){"use strict";function d(a,b){return I(new(I(function(){},{prototype:a})),b)}function e(a){return H(arguments,function(b){b!==a&&H(b,function(b,c){a.hasOwnProperty(c)||(a[c]=b)})}),a}function f(a,b){var c=[];for(var d in a.path){if(a.path[d]!==b.path[d])break;c.push(a.path[d])}return c}function g(a,b){if(Array.prototype.indexOf)return a.indexOf(b,Number(arguments[2])||0);var c=a.length>>>0,d=Number(arguments[2])||0;for(d=0>d?Math.ceil(d):Math.floor(d),0>d&&(d+=c);c>d;d++)if(d in a&&a[d]===b)return d;return-1}function h(a,b,c,d){var e,h=f(c,d),i={},j=[];for(var k in h)if(h[k].params&&h[k].params.length){e=h[k].params;for(var l in e)g(j,e[l])>=0||(j.push(e[l]),i[e[l]]=a[e[l]])}return I({},i,b)}function i(a,b){var c={};return H(a,function(a){var d=b[a];c[a]=null!=d?String(d):null}),c}function j(a,b,c){if(!c){c=[];for(var d in a)c.push(d)}for(var e=0;e<c.length;e++){var f=c[e];if(a[f]!=b[f])return!1}return!0}function k(a,b){var c={};return H(a,function(a){c[a]=b[a]}),c}function l(a,b){var d=1,f=2,g={},h=[],i=g,j=I(a.when(g),{$$promises:g,$$values:g});this.study=function(g){function k(a,c){if(o[c]!==f){if(n.push(c),o[c]===d)throw n.splice(0,n.indexOf(c)),new Error("Cyclic dependency: "+n.join(" -> "));if(o[c]=d,E(a))m.push(c,[function(){return b.get(a)}],h);else{var e=b.annotate(a);H(e,function(a){a!==c&&g.hasOwnProperty(a)&&k(g[a],a)}),m.push(c,a,e)}n.pop(),o[c]=f}}function l(a){return F(a)&&a.then&&a.$$promises}if(!F(g))throw new Error("'invocables' must be an object");var m=[],n=[],o={};return H(g,k),g=n=o=null,function(d,f,g){function h(){--s||(t||e(r,f.$$values),p.$$values=r,p.$$promises=!0,o.resolve(r))}function k(a){p.$$failure=a,o.reject(a)}function n(c,e,f){function i(a){l.reject(a),k(a)}function j(){if(!C(p.$$failure))try{l.resolve(b.invoke(e,g,r)),l.promise.then(function(a){r[c]=a,h()},i)}catch(a){i(a)}}var l=a.defer(),m=0;H(f,function(a){q.hasOwnProperty(a)&&!d.hasOwnProperty(a)&&(m++,q[a].then(function(b){r[a]=b,--m||j()},i))}),m||j(),q[c]=l.promise}if(l(d)&&g===c&&(g=f,f=d,d=null),d){if(!F(d))throw new Error("'locals' must be an object")}else d=i;if(f){if(!l(f))throw new Error("'parent' must be a promise returned by $resolve.resolve()")}else f=j;var o=a.defer(),p=o.promise,q=p.$$promises={},r=I({},d),s=1+m.length/3,t=!1;if(C(f.$$failure))return k(f.$$failure),p;f.$$values?(t=e(r,f.$$values),h()):(I(q,f.$$promises),f.then(h,k));for(var u=0,v=m.length;v>u;u+=3)d.hasOwnProperty(m[u])?h():n(m[u],m[u+1],m[u+2]);return p}},this.resolve=function(a,b,c,d){return this.study(a)(b,c,d)}}function m(a,b,c){this.fromConfig=function(a,b,c){return C(a.template)?this.fromString(a.template,b):C(a.templateUrl)?this.fromUrl(a.templateUrl,b):C(a.templateProvider)?this.fromProvider(a.templateProvider,b,c):null},this.fromString=function(a,b){return D(a)?a(b):a},this.fromUrl=function(c,d){return D(c)&&(c=c(d)),null==c?null:a.get(c,{cache:b}).then(function(a){return a.data})},this.fromProvider=function(a,b,d){return c.invoke(a,null,d||{params:b})}}function n(a){function b(b){if(!/^\w+(-+\w+)*$/.test(b))throw new Error("Invalid parameter name '"+b+"' in pattern '"+a+"'");if(f[b])throw new Error("Duplicate parameter name '"+b+"' in pattern '"+a+"'");f[b]=!0,j.push(b)}function c(a){return a.replace(/[\\\[\]\^$*+?.()|{}]/g,"\\$&")}var d,e=/([:*])(\w+)|\{(\w+)(?:\:((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g,f={},g="^",h=0,i=this.segments=[],j=this.params=[];this.source=a;for(var k,l,m;(d=e.exec(a))&&(k=d[2]||d[3],l=d[4]||("*"==d[1]?".*":"[^/]*"),m=a.substring(h,d.index),!(m.indexOf("?")>=0));)g+=c(m)+"("+l+")",b(k),i.push(m),h=e.lastIndex;m=a.substring(h);var n=m.indexOf("?");if(n>=0){var o=this.sourceSearch=m.substring(n);m=m.substring(0,n),this.sourcePath=a.substring(0,h+n),H(o.substring(1).split(/[&?]/),b)}else this.sourcePath=a,this.sourceSearch="";g+=c(m)+"$",i.push(m),this.regexp=new RegExp(g),this.prefix=i[0]}function o(){this.compile=function(a){return new n(a)},this.isMatcher=function(a){return F(a)&&D(a.exec)&&D(a.format)&&D(a.concat)},this.$get=function(){return this}}function p(a){function b(a){var b=/^\^((?:\\[^a-zA-Z0-9]|[^\\\[\]\^$*+?.()|{}]+)*)/.exec(a.source);return null!=b?b[1].replace(/\\(.)/g,"$1"):""}function c(a,b){return a.replace(/\$(\$|\d{1,2})/,function(a,c){return b["$"===c?0:Number(c)]})}function d(a,b,c){if(!c)return!1;var d=a.invoke(b,b,{$match:c});return C(d)?d:!0}var e=[],f=null;this.rule=function(a){if(!D(a))throw new Error("'rule' must be a function");return e.push(a),this},this.otherwise=function(a){if(E(a)){var b=a;a=function(){return b}}else if(!D(a))throw new Error("'rule' must be a function");return f=a,this},this.when=function(e,f){var g,h=E(f);if(E(e)&&(e=a.compile(e)),!h&&!D(f)&&!G(f))throw new Error("invalid 'handler' in when()");var i={matcher:function(b,c){return h&&(g=a.compile(c),c=["$match",function(a){return g.format(a)}]),I(function(a,e){return d(a,c,b.exec(e.path(),e.search()))},{prefix:E(b.prefix)?b.prefix:""})},regex:function(a,e){if(a.global||a.sticky)throw new Error("when() RegExp must not be global or sticky");return h&&(g=e,e=["$match",function(a){return c(g,a)}]),I(function(b,c){return d(b,e,a.exec(c.path()))},{prefix:b(a)})}},j={matcher:a.isMatcher(e),regex:e instanceof RegExp};for(var k in j)if(j[k])return this.rule(i[k](e,f));throw new Error("invalid 'what' in when()")},this.$get=["$location","$rootScope","$injector",function(a,b,c){function d(b){function d(b){var d=b(c,a);return d?(E(d)&&a.replace().url(d),!0):!1}if(!b||!b.defaultPrevented){var g,h=e.length;for(g=0;h>g;g++)if(d(e[g]))return;f&&d(f)}}return b.$on("$locationChangeSuccess",d),{sync:function(){d()}}}]}function q(a,e,f){function g(a){return 0===a.indexOf(".")||0===a.indexOf("^")}function l(a,b){var d=E(a),e=d?a:a.name,f=g(e);if(f){if(!b)throw new Error("No reference point given for path '"+e+"'");for(var h=e.split("."),i=0,j=h.length,k=b;j>i;i++)if(""!==h[i]||0!==i){if("^"!==h[i])break;if(!k.parent)throw new Error("Path '"+e+"' not valid for state '"+b.name+"'");k=k.parent}else k=b;h=h.slice(i).join("."),e=k.name+(k.name&&h?".":"")+h}var l=w[e];return!l||!d&&(d||l!==a&&l.self!==a)?c:l}function m(a,b){x[a]||(x[a]=[]),x[a].push(b)}function n(b){b=d(b,{self:b,resolve:b.resolve||{},toString:function(){return this.name}});var c=b.name;if(!E(c)||c.indexOf("@")>=0)throw new Error("State must have a valid name");if(w.hasOwnProperty(c))throw new Error("State '"+c+"'' is already defined");var e=-1!==c.indexOf(".")?c.substring(0,c.lastIndexOf(".")):E(b.parent)?b.parent:"";if(e&&!w[e])return m(e,b.self);for(var f in z)D(z[f])&&(b[f]=z[f](b,z.$delegates[f]));if(w[c]=b,!b[y]&&b.url&&a.when(b.url,["$match","$stateParams",function(a,c){v.$current.navigable==b&&j(a,c)||v.transitionTo(b,a,{location:!1})}]),x[c])for(var g=0;g<x[c].length;g++)n(x[c][g]);return b}function o(a){return a.indexOf("*")>-1}function p(a){var b=a.split("."),c=v.$current.name.split(".");if("**"===b[0]&&(c=c.slice(c.indexOf(b[1])),c.unshift("**")),"**"===b[b.length-1]&&(c.splice(c.indexOf(b[b.length-2])+1,Number.MAX_VALUE),c.push("**")),b.length!=c.length)return!1;for(var d=0,e=b.length;e>d;d++)"*"===b[d]&&(c[d]="*");return c.join("")===b.join("")}function q(a,b){return E(a)&&!C(b)?z[a]:D(b)&&E(a)?(z[a]&&!z.$delegates[a]&&(z.$delegates[a]=z[a]),z[a]=b,this):this}function r(a,b){return F(a)?b=a:b.name=a,n(b),this}function s(a,e,g,m,n,q,r,s,x){function z(){r.url()!==M&&(r.url(M),r.replace())}function A(a,c,d,f,h){var i=d?c:k(a.params,c),j={$stateParams:i};h.resolve=n.resolve(a.resolve,j,h.resolve,a);var l=[h.resolve.then(function(a){h.globals=a})];return f&&l.push(f),H(a.views,function(c,d){var e=c.resolve&&c.resolve!==a.resolve?c.resolve:{};e.$template=[function(){return g.load(d,{view:c,locals:j,params:i,notify:!1})||""}],l.push(n.resolve(e,j,h.resolve,a).then(function(f){if(D(c.controllerProvider)||G(c.controllerProvider)){var g=b.extend({},e,j);f.$$controller=m.invoke(c.controllerProvider,null,g)}else f.$$controller=c.controller;f.$$state=a,f.$$controllerAs=c.controllerAs,h[d]=f}))}),e.all(l).then(function(){return h})}var B=e.reject(new Error("transition superseded")),F=e.reject(new Error("transition prevented")),K=e.reject(new Error("transition aborted")),L=e.reject(new Error("transition failed")),M=r.url(),N=x.baseHref();return u.locals={resolve:null,globals:{$stateParams:{}}},v={params:{},current:u.self,$current:u,transition:null},v.reload=function(){v.transitionTo(v.current,q,{reload:!0,inherit:!1,notify:!1})},v.go=function(a,b,c){return this.transitionTo(a,b,I({inherit:!0,relative:v.$current},c))},v.transitionTo=function(b,c,f){c=c||{},f=I({location:!0,inherit:!1,relative:null,notify:!0,reload:!1,$retry:!1},f||{});var g,k=v.$current,n=v.params,o=k.path,p=l(b,f.relative);if(!C(p)){var s={to:b,toParams:c,options:f};if(g=a.$broadcast("$stateNotFound",s,k.self,n),g.defaultPrevented)return z(),K;if(g.retry){if(f.$retry)return z(),L;var w=v.transition=e.when(g.retry);return w.then(function(){return w!==v.transition?B:(s.options.$retry=!0,v.transitionTo(s.to,s.toParams,s.options))},function(){return K}),z(),w}if(b=s.to,c=s.toParams,f=s.options,p=l(b,f.relative),!C(p)){if(f.relative)throw new Error("Could not resolve '"+b+"' from state '"+f.relative+"'");throw new Error("No such state '"+b+"'")}}if(p[y])throw new Error("Cannot transition to abstract state '"+b+"'");f.inherit&&(c=h(q,c||{},v.$current,p)),b=p;var x,D,E=b.path,G=u.locals,H=[];for(x=0,D=E[x];D&&D===o[x]&&j(c,n,D.ownParams)&&!f.reload;x++,D=E[x])G=H[x]=D.locals;if(t(b,k,G,f))return b.self.reloadOnSearch!==!1&&z(),v.transition=null,e.when(v.current);if(c=i(b.params,c||{}),f.notify&&(g=a.$broadcast("$stateChangeStart",b.self,c,k.self,n),g.defaultPrevented))return z(),F;for(var N=e.when(G),O=x;O<E.length;O++,D=E[O])G=H[O]=d(G),N=A(D,c,D===b,N,G);var P=v.transition=N.then(function(){var d,e,g;if(v.transition!==P)return B;for(d=o.length-1;d>=x;d--)g=o[d],g.self.onExit&&m.invoke(g.self.onExit,g.self,g.locals.globals),g.locals=null;for(d=x;d<E.length;d++)e=E[d],e.locals=H[d],e.self.onEnter&&m.invoke(e.self.onEnter,e.self,e.locals.globals);if(v.transition!==P)return B;v.$current=b,v.current=b.self,v.params=c,J(v.params,q),v.transition=null;var h=b.navigable;return f.location&&h&&(r.url(h.url.format(h.locals.globals.$stateParams)),"replace"===f.location&&r.replace()),f.notify&&a.$broadcast("$stateChangeSuccess",b.self,c,k.self,n),M=r.url(),v.current},function(d){return v.transition!==P?B:(v.transition=null,a.$broadcast("$stateChangeError",b.self,c,k.self,n,d),z(),e.reject(d))});return P},v.is=function(a,d){var e=l(a);return C(e)?v.$current!==e?!1:C(d)&&null!==d?b.equals(q,d):!0:c},v.includes=function(a,d){if(E(a)&&o(a)){if(!p(a))return!1;a=v.$current.name}var e=l(a);if(!C(e))return c;if(!C(v.$current.includes[e.name]))return!1;var f=!0;return b.forEach(d,function(a,b){C(q[b])&&q[b]===a||(f=!1)}),f},v.href=function(a,b,c){c=I({lossy:!0,inherit:!1,absolute:!1,relative:v.$current},c||{});var d=l(a,c.relative);if(!C(d))return null;b=h(q,b||{},v.$current,d);var e=d&&c.lossy?d.navigable:d,g=e&&e.url?e.url.format(i(d.params,b||{})):null;return!f.html5Mode()&&g&&(g="#"+f.hashPrefix()+g),"/"!==N&&(f.html5Mode()?g=N.slice(0,-1)+g:c.absolute&&(g=N.slice(1)+g)),c.absolute&&g&&(g=r.protocol()+"://"+r.host()+(80==r.port()||443==r.port()?"":":"+r.port())+(!f.html5Mode()&&g?"/":"")+g),g},v.get=function(a,b){if(!C(a)){var c=[];return H(w,function(a){c.push(a.self)}),c}var d=l(a,b);return d&&d.self?d.self:null},v}function t(a,b,c,d){return a!==b||(c!==b.locals||d.reload)&&a.self.reloadOnSearch!==!1?void 0:!0}var u,v,w={},x={},y="abstract",z={parent:function(a){if(C(a.parent)&&a.parent)return l(a.parent);var b=/^(.+)\.[^.]+$/.exec(a.name);return b?l(b[1]):u},data:function(a){return a.parent&&a.parent.data&&(a.data=a.self.data=I({},a.parent.data,a.data)),a.data},url:function(a){var b=a.url;if(E(b))return"^"==b.charAt(0)?e.compile(b.substring(1)):(a.parent.navigable||u).url.concat(b);if(e.isMatcher(b)||null==b)return b;throw new Error("Invalid url '"+b+"' in state '"+a+"'")},navigable:function(a){return a.url?a:a.parent?a.parent.navigable:null},params:function(a){if(!a.params)return a.url?a.url.parameters():a.parent.params;if(!G(a.params))throw new Error("Invalid params in state '"+a+"'");if(a.url)throw new Error("Both params and url specicified in state '"+a+"'");return a.params},views:function(a){var b={};return H(C(a.views)?a.views:{"":a},function(c,d){d.indexOf("@")<0&&(d+="@"+a.parent.name),b[d]=c}),b},ownParams:function(a){if(!a.parent)return a.params;var b={};H(a.params,function(a){b[a]=!0}),H(a.parent.params,function(c){if(!b[c])throw new Error("Missing required parameter '"+c+"' in state '"+a.name+"'");b[c]=!1});var c=[];return H(b,function(a,b){a&&c.push(b)}),c},path:function(a){return a.parent?a.parent.path.concat(a):[]},includes:function(a){var b=a.parent?I({},a.parent.includes):{};return b[a.name]=!0,b},$delegates:{}};u=n({name:"",url:"^",views:null,"abstract":!0}),u.navigable=null,this.decorator=q,this.state=r,this.$get=s,s.$inject=["$rootScope","$q","$view","$injector","$resolve","$stateParams","$location","$urlRouter","$browser"]}function r(){function a(a,b){return{load:function(c,d){var e,f={template:null,controller:null,view:null,locals:null,notify:!0,async:!0,params:{}};return d=I(f,d),d.view&&(e=b.fromConfig(d.view,d.params,d.locals)),e&&d.notify&&a.$broadcast("$viewContentLoading",d),e}}}this.$get=a,a.$inject=["$rootScope","$templateFactory"]}function s(){var a=!1;this.useAnchorScroll=function(){a=!0},this.$get=["$anchorScroll","$timeout",function(b,c){return a?b:function(a){c(function(){a[0].scrollIntoView()},0,!1)}}]}function t(a,c,d){function e(){return c.has?function(a){return c.has(a)?c.get(a):null}:function(a){try{return c.get(a)}catch(b){return null}}}function f(a,b){var c=function(){return{enter:function(a,b,c){b.after(a),c()},leave:function(a,b){a.remove(),b()}}};if(i)return{enter:function(a,b,c){i.enter(a,null,b,c)},leave:function(a,b){i.leave(a,b)}};if(h){var d=h&&h(b,a);return{enter:function(a,b,c){d.enter(a,null,b),c()},leave:function(a,b){d.leave(a),b()}}}return c()}var g=e(),h=g("$animator"),i=g("$animate"),j={restrict:"ECA",terminal:!0,priority:400,transclude:"element",compile:function(c,e,g){return function(c,e,h){function i(){k&&(k.remove(),k=null),m&&(m.$destroy(),m=null),l&&(q.leave(l,function(){k=null}),k=l,l=null)}function j(f){var h=c.$new(),j=l&&l.data("$uiViewName"),k=j&&a.$current&&a.$current.locals[j];if(f||k!==n){var r=g(h,function(a){q.enter(a,e,function(){(b.isDefined(p)&&!p||c.$eval(p))&&d(a)}),i()});n=a.$current.locals[r.data("$uiViewName")],l=r,m=h,m.$emit("$viewContentLoaded"),m.$eval(o)}}var k,l,m,n,o=h.onload||"",p=h.autoscroll,q=f(h,c);c.$on("$stateChangeSuccess",function(){j(!1)}),c.$on("$viewContentLoading",function(){j(!1)}),j(!0)}}};return j}function u(a,b,c){return{restrict:"ECA",priority:-400,compile:function(d){var e=d.html();return function(d,f,g){var h=g.uiView||g.name||"",i=f.inheritedData("$uiView");h.indexOf("@")<0&&(h=h+"@"+(i?i.state.name:"")),f.data("$uiViewName",h);var j=c.$current,k=j&&j.locals[h];if(k){f.data("$uiView",{name:h,state:k.$$state}),f.html(k.$template?k.$template:e);var l=a(f.contents());if(k.$$controller){k.$scope=d;var m=b(k.$$controller,k);k.$$controllerAs&&(d[k.$$controllerAs]=m),f.data("$ngControllerController",m),f.children().data("$ngControllerController",m)}l(d)}}}}}function v(a){var b=a.replace(/\n/g," ").match(/^([^(]+?)\s*(\((.*)\))?$/);if(!b||4!==b.length)throw new Error("Invalid state ref '"+a+"'");return{state:b[1],paramExpr:b[3]||null}}function w(a){var b=a.parent().inheritedData("$uiView");return b&&b.state&&b.state.name?b.state:void 0}function x(a,c){var d=["location","inherit","reload"];return{restrict:"A",require:"?^uiSrefActive",link:function(e,f,g,h){var i=v(g.uiSref),j=null,k=w(f)||a.$current,l="FORM"===f[0].nodeName,m=l?"action":"href",n=!0,o={relative:k},p=e.$eval(g.uiSrefOpts)||{};b.forEach(d,function(a){a in p&&(o[a]=p[a])});var q=function(b){if(b&&(j=b),n){var c=a.href(i.state,j,o);return h&&h.$$setStateInfo(i.state,j),c?void(f[0][m]=c):(n=!1,!1)}};i.paramExpr&&(e.$watch(i.paramExpr,function(a){a!==j&&q(a)},!0),j=e.$eval(i.paramExpr)),q(),l||f.bind("click",function(b){var d=b.which||b.button;d>1||b.ctrlKey||b.metaKey||b.shiftKey||f.attr("target")||(c(function(){a.go(i.state,j,o)}),b.preventDefault())})}}}function y(a,b,c){return{restrict:"A",controller:["$scope","$element","$attrs",function(d,e,f){function g(){a.$current.self===i&&h()?e.addClass(l):e.removeClass(l)}function h(){return!k||j(k,b)}var i,k,l;l=c(f.uiSrefActive||"",!1)(d),this.$$setStateInfo=function(b,c){i=a.get(b,w(e)),k=c,g()},d.$on("$stateChangeSuccess",g)}]}}function z(a){return function(b){return a.is(b)}}function A(a){return function(b){return a.includes(b)}}function B(a,b){function e(a){this.locals=a.locals.globals,this.params=this.locals.$stateParams}function f(){this.locals=null,this.params=null}function g(c,g){if(null!=g.redirectTo){var h,j=g.redirectTo;if(E(j))h=j;else{if(!D(j))throw new Error("Invalid 'redirectTo' in when()");h=function(a,b){return j(a,b.path(),b.search())}}b.when(c,h)}else a.state(d(g,{parent:null,name:"route:"+encodeURIComponent(c),url:c,onEnter:e,onExit:f}));return i.push(g),this}function h(a,b,d){function e(a){return""!==a.name?a:c}var f={routes:i,params:d,current:c};return b.$on("$stateChangeStart",function(a,c,d,f){b.$broadcast("$routeChangeStart",e(c),e(f))}),b.$on("$stateChangeSuccess",function(a,c,d,g){f.current=e(c),b.$broadcast("$routeChangeSuccess",e(c),e(g)),J(d,f.params)}),b.$on("$stateChangeError",function(a,c,d,f,g,h){b.$broadcast("$routeChangeError",e(c),e(f),h)}),f}var i=[];e.$inject=["$$state"],this.when=g,this.$get=h,h.$inject=["$state","$rootScope","$routeParams"]}var C=b.isDefined,D=b.isFunction,E=b.isString,F=b.isObject,G=b.isArray,H=b.forEach,I=b.extend,J=b.copy;b.module("ui.router.util",["ng"]),b.module("ui.router.router",["ui.router.util"]),b.module("ui.router.state",["ui.router.router","ui.router.util"]),b.module("ui.router",["ui.router.state"]),b.module("ui.router.compat",["ui.router"]),l.$inject=["$q","$injector"],b.module("ui.router.util").service("$resolve",l),m.$inject=["$http","$templateCache","$injector"],b.module("ui.router.util").service("$templateFactory",m),n.prototype.concat=function(a){return new n(this.sourcePath+a+this.sourceSearch)},n.prototype.toString=function(){return this.source},n.prototype.exec=function(a,b){var c=this.regexp.exec(a);if(!c)return null;var d,e=this.params,f=e.length,g=this.segments.length-1,h={};if(g!==c.length-1)throw new Error("Unbalanced capture group in route '"+this.source+"'");for(d=0;g>d;d++)h[e[d]]=c[d+1];for(;f>d;d++)h[e[d]]=b[e[d]];return h},n.prototype.parameters=function(){return this.params},n.prototype.format=function(a){var b=this.segments,c=this.params;if(!a)return b.join("");var d,e,f,g=b.length-1,h=c.length,i=b[0];for(d=0;g>d;d++)f=a[c[d]],null!=f&&(i+=encodeURIComponent(f)),i+=b[d+1];for(;h>d;d++)f=a[c[d]],null!=f&&(i+=(e?"&":"?")+c[d]+"="+encodeURIComponent(f),e=!0);return i},b.module("ui.router.util").provider("$urlMatcherFactory",o),p.$inject=["$urlMatcherFactoryProvider"],b.module("ui.router.router").provider("$urlRouter",p),q.$inject=["$urlRouterProvider","$urlMatcherFactoryProvider","$locationProvider"],b.module("ui.router.state").value("$stateParams",{}).provider("$state",q),r.$inject=[],b.module("ui.router.state").provider("$view",r),b.module("ui.router.state").provider("$uiViewScroll",s),t.$inject=["$state","$injector","$uiViewScroll"],u.$inject=["$compile","$controller","$state"],b.module("ui.router.state").directive("uiView",t),b.module("ui.router.state").directive("uiView",u),x.$inject=["$state","$timeout"],y.$inject=["$state","$stateParams","$interpolate"],b.module("ui.router.state").directive("uiSref",x).directive("uiSrefActive",y),z.$inject=["$state"],A.$inject=["$state"],b.module("ui.router.state").filter("isState",z).filter("includedByState",A),B.$inject=["$stateProvider","$urlRouterProvider"],b.module("ui.router.compat").provider("$route",B).directive("ngView",t)}(window,window.angular);
/*
 AngularJS v1.2.19
 (c) 2010-2014 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(p,f,n){'use strict';f.module("ngCookies",["ng"]).factory("$cookies",["$rootScope","$browser",function(e,b){var c={},g={},h,k=!1,l=f.copy,m=f.isUndefined;b.addPollFn(function(){var a=b.cookies();h!=a&&(h=a,l(a,g),l(a,c),k&&e.$apply())})();k=!0;e.$watch(function(){var a,d,e;for(a in g)m(c[a])&&b.cookies(a,n);for(a in c)d=c[a],f.isString(d)||(d=""+d,c[a]=d),d!==g[a]&&(b.cookies(a,d),e=!0);if(e)for(a in d=b.cookies(),c)c[a]!==d[a]&&(m(d[a])?delete c[a]:c[a]=d[a])});return c}]).factory("$cookieStore",
["$cookies",function(e){return{get:function(b){return(b=e[b])?f.fromJson(b):b},put:function(b,c){e[b]=f.toJson(c)},remove:function(b){delete e[b]}}}])})(window,window.angular);
//# sourceMappingURL=angular-cookies.min.js.map

/*! angular-payments 31-01-2014 */
angular.module("angularPayments",[]),angular.module("angularPayments").factory("Common",[function(){var a={};return a.parseExpiry=function(a){var b,c,d,e;return a=a||"",a=a.replace(/\s/g,""),e=a.split("/",2),b=e[0],d=e[1],2===(null!=d?d.length:void 0)&&/^\d+$/.test(d)&&(c=(new Date).getFullYear(),c=c.toString().slice(0,2),d=c+d),b=parseInt(b,10),d=parseInt(d,10),{month:b,year:d}},a}]),angular.module("angularPayments").factory("Cards",[function(){var a=/(\d{1,4})/g,b=/(?:^|\s)(\d{4})$/,c=[{type:"maestro",pattern:/^(5018|5020|5038|6304|6759|676[1-3])/,format:a,inputFormat:b,length:[12,13,14,15,16,17,18,19],cvcLength:[3],luhn:!0},{type:"dinersclub",pattern:/^(36|38|30[0-5])/,format:a,inputFormat:b,length:[14],cvcLength:[3],luhn:!0},{type:"laser",pattern:/^(6706|6771|6709)/,format:a,inputFormat:b,length:[16,17,18,19],cvcLength:[3],luhn:!0},{type:"jcb",pattern:/^35/,format:a,inputFormat:b,length:[16],cvcLength:[3],luhn:!0},{type:"unionpay",pattern:/^62/,format:a,inputFormat:b,length:[16,17,18,19],cvcLength:[3],luhn:!1},{type:"discover",pattern:/^(6011|65|64[4-9]|622)/,format:a,inputFormat:b,length:[16],cvcLength:[3],luhn:!0},{type:"mastercard",pattern:/^5[1-5]/,format:a,inputFormat:b,length:[16],cvcLength:[3],luhn:!0},{type:"amex",pattern:/^3[47]/,format:/(\d{1,4})(\d{1,6})?(\d{1,5})?/,inputFormat:/^(\d{4}|\d{4}\s\d{6})$/,length:[15],cvcLength:[3,4],luhn:!0},{type:"visa",pattern:/^4/,format:a,inputFormat:b,length:[13,14,15,16],cvcLength:[3],luhn:!0}],d=function(a){var b,d,e;for(a=(a+"").replace(/\D/g,""),d=0,e=c.length;e>d;d++)if(b=c[d],b.pattern.test(a))return b},e=function(a){var b,d,e;for(d=0,e=c.length;e>d;d++)if(b=c[d],b.type===a)return b};return{fromNumber:function(a){return d(a)},fromType:function(a){return e(a)},defaultFormat:function(){return a},defaultInputFormat:function(){return b}}}]),angular.module("angularPayments").factory("_Format",["Cards","Common","$filter",function(a,b,c){var d={},e=function(a){var b;return null!=a.prop("selectionStart")&&a.prop("selectionStart")!==a.prop("selectionEnd")?!0:("undefined"!=typeof document&&null!==document?null!=(b=document.selection)?"function"==typeof b.createRange?b.createRange().text:void 0:void 0:void 0)?!0:!1},f=function(b){var c,d,e,f,g,h,i;if(e=String.fromCharCode(b.which),c=angular.element(b.currentTarget),i=c.val(),d=a.fromNumber(i+e),f=(i.replace(/\D/g,"")+e).length,h=16,d&&(h=d.length[d.length.length-1]),!(f>=h)){if(!/^\d+$/.test(e)&&!b.meta&&b.keyCode>=46)return void b.preventDefault();if(null==c.prop("selectionStart")||c.prop("selectionStart")===i.length)return g=a.defaultInputFormat(),d&&(g=d.inputFormat),g.test(i)?(b.preventDefault(),c.val(i+" "+e)):g.test(i+e)?(b.preventDefault(),c.val(i+e+" ")):void 0}},g=function(b){var c,d,f,g;c=angular.element(b.currentTarget),f=String.fromCharCode(b.which),/^\d+$/.test(f)&&(e(c)||(g=(c.val()+f).replace(/\D/g,""),d=a.fromNumber(g),d?g.length<=d.length[d.length.length-1]||b.preventDefault():g.length<=16||b.preventDefault()))},h=function(a){var b,c;return b=angular.element(a.currentTarget),c=b.val(),a.meta||8!==a.which||null!=b.prop("selectionStart")&&b.prop("selectionStart")!==c.length?void 0:/\d\s$/.test(c)&&!a.meta&&a.keyCode>=46?(a.preventDefault(),b.val(c.replace(/\d\s$/,""))):/\s\d?$/.test(c)?(a.preventDefault(),b.val(c.replace(/\s\d?$/,""))):void 0},i=function(b){var c,d,e,f;return(c=a.fromNumber(b))?(e=c.length[c.length.length-1],b=b.replace(/\D/g,""),b=b.slice(0,+e+1||9e9),c.format.global?null!=(f=b.match(c.format))?f.join(" "):void 0:(d=c.format.exec(b),null!=d&&d.shift(),null!=d?d.join(" "):void 0)):b},j=function(a){return setTimeout(function(){var b,c;return b=angular.element(a.target),c=b.val(),c=i(c),b.val(c)})},k=function(a){return null!=a?a.replace(/\s/g,""):a};d.card=function(a,b){a.bind("keypress",g),a.bind("keypress",f),a.bind("keydown",h),a.bind("paste",j),b.$parsers.push(k),b.$formatters.push(i)},_formatCVC=function(a){return $target=angular.element(a.currentTarget),digit=String.fromCharCode(a.which),!/^\d+$/.test(digit)&&!a.meta&&a.keyCode>=46?void a.preventDefault():(val=$target.val()+digit,val.length<=4?void 0:void a.preventDefault())},d.cvc=function(a){a.bind("keypress",_formatCVC)},_restrictExpiry=function(a){var b,c,d;return b=angular.element(a.currentTarget),c=String.fromCharCode(a.which),!/^\d+$/.test(c)&&!a.meta&&a.keyCode>=46?void a.preventDefault():e(b)?void 0:(d=b.val()+c,d=d.replace(/\D/g,""),d.length>6?void a.preventDefault():void 0)},_formatExpiry=function(a){var b,c,d;return c=String.fromCharCode(a.which),!/^\d+$/.test(c)&&!a.meta&&a.keyCode>=46?void a.preventDefault():(b=angular.element(a.currentTarget),d=b.val()+c,/^\d$/.test(d)&&"0"!==d&&"1"!==d?(a.preventDefault(),b.val("0"+d+" / ")):/^\d\d$/.test(d)?(a.preventDefault(),b.val(""+d+" / ")):void 0)},_formatForwardExpiry=function(a){var b,c,d;return c=String.fromCharCode(a.which),!/^\d+$/.test(c)&&!a.meta&&a.keyCode>=46?void 0:(b=angular.element(a.currentTarget),d=b.val(),/^\d\d$/.test(d)?b.val(""+d+" / "):void 0)},_formatForwardSlash=function(a){var b,c,d;return c=String.fromCharCode(a.which),"/"===c?(b=angular.element(a.currentTarget),d=b.val(),/^\d$/.test(d)&&"0"!==d?b.val("0"+d+" / "):void 0):void 0},_formatBackExpiry=function(a){var b,c;if(!a.meta&&(b=angular.element(a.currentTarget),c=b.val(),8===a.which&&(null==b.prop("selectionStart")||b.prop("selectionStart")===c.length)))return/\d(\s|\/)+$/.test(c)?(a.preventDefault(),b.val(c.replace(/\d(\s|\/)*$/,""))):/\s\/\s?\d?$/.test(c)?(a.preventDefault(),b.val(c.replace(/\s\/\s?\d?$/,""))):void 0};var l=function(a){if(null!=a){var d=b.parseExpiry(a),e=new Date(d.year,d.month-1);return c("date")(e,"MM/yyyy")}return null},m=function(a){if(null!=a){var d=b.parseExpiry(a),e=new Date(d.year,d.month-1);return c("date")(e,"MM / yyyy")}return null};return d.expiry=function(a,b){a.bind("keypress",_restrictExpiry),a.bind("keypress",_formatExpiry),a.bind("keypress",_formatForwardSlash),a.bind("keypress",_formatForwardExpiry),a.bind("keydown",_formatBackExpiry),b.$parsers.push(l),b.$formatters.push(m)},function(a,b,c){if(!d[a])throw types=Object.keys(d),errstr='Unknown type for formatting: "'+a+'". ',errstr+='Should be one of: "'+types.join('", "')+'"';return d[a](b,c)}}]).directive("paymentsFormat",["$window","_Format",function(a,b){return{restrict:"A",require:"ngModel",link:function(a,c,d,e){b(d.paymentsFormat,c,e)}}}]),angular.module("angularPayments").factory("_Validate",["Cards","Common","$parse",function(a,b,c){var d=[].indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(b in this&&this[b]===a)return b;return-1},e=function(a){var b,c,d,e,f,g;for(d=!0,e=0,c=(a+"").split("").reverse(),f=0,g=c.length;g>f;f++)b=c[f],b=parseInt(b,10),(d=!d)&&(b*=2),b>9&&(b-=9),e+=b;return e%10===0},f={};return f.cvc=function(b,e,f,g){var h,i;if(null==b||0==b.length)return!0;if(!/^\d+$/.test(b))return!1;var j;if(g.paymentsTypeModel){var k=c(g.paymentsTypeModel);j=k(f)}return j?(h=b.length,d.call(null!=(i=a.fromType(j))?i.cvcLength:void 0,h)>=0):b.length>=3&&b.length<=4},f.card=function(b,f,g,h){var i,j,k;h.paymentsTypeModel&&(k=c(h.paymentsTypeModel));var l=function(){k&&k.assign(g,null),f.$card=null};return null==b||0==b.length?(l(),!0):(b=(b+"").replace(/\s+|-/g,""),/^\d+$/.test(b)?(i=a.fromNumber(b))?(f.$card=angular.copy(i),k&&k.assign(g,i.type),j=b.length,ret=d.call(i.length,j)>=0&&(i.luhn===!1||e(b)),ret):(l(),!1):(l(),!1))},f.expiry=function(a){if(null==a||0==a.length)return!0;obj=b.parseExpiry(a),month=obj.month,year=obj.year;var c,d,e;return month&&year?/^\d+$/.test(month)?/^\d+$/.test(year)?parseInt(month,10)<=12?(2===year.length&&(e=(new Date).getFullYear(),e=e.toString().slice(0,2),year=e+year),d=new Date(year,month),c=new Date,d.setMonth(d.getMonth()-1),d.setMonth(d.getMonth()+1,1),d>c):!1:!1:!1:!1},function(a,b,c,d,e){if(!f[a])throw types=Object.keys(f),errstr='Unknown type for validation: "'+a+'". ',errstr+='Should be one of: "'+types.join('", "')+'"';return f[a](b,c,d,e)}}]).factory("_ValidateWatch",["_Validate",function(a){var b={};return b.cvc=function(b,c,d,e){e.paymentsTypeModel&&d.$watch(e.paymentsTypeModel,function(f,g){if(f!=g){var h=a(b,c.$modelValue,c,d,e);c.$setValidity(b,h)}})},function(a,c,d,e){return b[a]?b[a](a,c,d,e):void 0}}]).directive("paymentsValidate",["$window","_Validate","_ValidateWatch",function(a,b,c){return{restrict:"A",require:"ngModel",link:function(a,d,e,f){var g=e.paymentsValidate;c(g,f,a,e);var h=function(c){var d=b(g,c,f,a,e);return f.$setValidity(g,d),d?c:void 0};f.$formatters.push(h),f.$parsers.push(h)}}}]),angular.module("angularPayments").directive("stripeForm",["$window","$parse","Common",function(a,b,c){return _getDataToSend=function(a){var b=["number","expMonth","expYear","cvc","name","addressLine1","addressLine2","addressCity","addressState","addressZip","addressCountry"],c=function(a){return a.replace(/([A-Z])/g,function(a){return"_"+a.toLowerCase()})},d={};for(i in b)b.hasOwnProperty(i)&&(d[c(b[i])]=angular.copy(a[b[i]]));return d.number=(d.number||"").replace(/ /g,""),d},{restrict:"A",link:function(b,d,e){if(!a.Stripe)throw"stripeForm requires that you have stripe.js installed. Include https://js.stripe.com/v2/ into your html.";var f=angular.element(d);f.bind("submit",function(){expMonthUsed=b.expMonth?!0:!1,expYearUsed=b.expYear?!0:!1,expMonthUsed&&expYearUsed||(exp=c.parseExpiry(b.expiry),b.expMonth=exp.month,b.expYear=exp.year);var d=f.find("button");d.prop("disabled",!0),f.hasClass("ng-valid")?a.Stripe.createToken(_getDataToSend(b),function(){var a=arguments;b.$apply(function(){b[e.stripeForm].apply(b,a)}),d.prop("disabled",!1)}):(b.$apply(function(){b[e.stripeForm].apply(b,[400,{error:"Invalid form submitted."}])}),d.prop("disabled",!1)),b.expiryMonth=expMonthUsed?b.expMonth:null,b.expiryYear=expYearUsed?b.expMonth:null})}}}]);
!function(a,b){b["true"]=a,textAngularSetup=angular.module("textAngularSetup",[]),textAngularSetup.value("taOptions",{toolbar:[["h1","h2","h3","h4","h5","h6","p","pre","quote"],["bold","italics","underline","ul","ol","redo","undo","clear"],["justifyLeft","justifyCenter","justifyRight"],["html","insertImage","insertLink","insertVideo"]],classes:{focussed:"focussed",toolbar:"btn-toolbar",toolbarGroup:"btn-group",toolbarButton:"btn btn-default",toolbarButtonActive:"active",disabled:"disabled",textEditor:"form-control",htmlEditor:"form-control"},setup:{textEditorSetup:function(){},htmlEditorSetup:function(){}},defaultFileDropHandler:function(a,b){var c=new FileReader;return"image"===a.type.substring(0,5)?(c.onload=function(){""!==c.result&&b("insertImage",c.result,!0)},c.readAsDataURL(a),!0):!1}}),textAngularSetup.value("taSelectableElements",["a","img"]),textAngularSetup.value("taCustomRenderers",[{selector:"img",customAttribute:"ta-insert-video",renderLogic:function(a){var b=angular.element("<iframe></iframe>"),c=a.prop("attributes");angular.forEach(c,function(a){b.attr(a.name,a.value)}),b.attr("src",b.attr("ta-insert-video")),a.replaceWith(b)}}]),textAngularSetup.constant("taTranslations",{toggleHTML:"Toggle HTML",insertImage:"Please enter a image URL to insert",insertLink:"Please enter a URL to insert",insertVideo:"Please enter a youtube URL to embed"}),textAngularSetup.run(["taRegisterTool","$window","taTranslations","taSelection",function(a,b,c,d){a("html",{buttontext:c.toggleHTML,action:function(){this.$editor().switchView()},activeState:function(){return this.$editor().showHtml}});var e=function(a){return function(){return this.$editor().queryFormatBlockState(a)}},f=function(){return this.$editor().wrapSelection("formatBlock","<"+this.name.toUpperCase()+">")};angular.forEach(["h1","h2","h3","h4","h5","h6"],function(b){a(b.toLowerCase(),{buttontext:b.toUpperCase(),action:f,activeState:e(b.toLowerCase())})}),a("p",{buttontext:"P",action:function(){return this.$editor().wrapSelection("formatBlock","<P>")},activeState:function(){return this.$editor().queryFormatBlockState("p")}}),a("pre",{buttontext:"pre",action:function(){return this.$editor().wrapSelection("formatBlock","<PRE>")},activeState:function(){return this.$editor().queryFormatBlockState("pre")}}),a("ul",{iconclass:"fa fa-list-ul",action:function(){return this.$editor().wrapSelection("insertUnorderedList",null)},activeState:function(){return document.queryCommandState("insertUnorderedList")}}),a("ol",{iconclass:"fa fa-list-ol",action:function(){return this.$editor().wrapSelection("insertOrderedList",null)},activeState:function(){return document.queryCommandState("insertOrderedList")}}),a("quote",{iconclass:"fa fa-quote-right",action:function(){return this.$editor().wrapSelection("formatBlock","<BLOCKQUOTE>")},activeState:function(){return this.$editor().queryFormatBlockState("blockquote")}}),a("undo",{iconclass:"fa fa-undo",action:function(){return this.$editor().wrapSelection("undo",null)}}),a("redo",{iconclass:"fa fa-repeat",action:function(){return this.$editor().wrapSelection("redo",null)}}),a("bold",{iconclass:"fa fa-bold",action:function(){return this.$editor().wrapSelection("bold",null)},activeState:function(){return document.queryCommandState("bold")},commandKeyCode:98}),a("justifyLeft",{iconclass:"fa fa-align-left",action:function(){return this.$editor().wrapSelection("justifyLeft",null)},activeState:function(a){var b=!1;return a&&(b="left"===a.css("text-align")||"left"===a.attr("align")||"right"!==a.css("text-align")&&"center"!==a.css("text-align")&&!document.queryCommandState("justifyRight")&&!document.queryCommandState("justifyCenter")),b=b||document.queryCommandState("justifyLeft")}}),a("justifyRight",{iconclass:"fa fa-align-right",action:function(){return this.$editor().wrapSelection("justifyRight",null)},activeState:function(a){var b=!1;return a&&(b="right"===a.css("text-align")),b=b||document.queryCommandState("justifyRight")}}),a("justifyCenter",{iconclass:"fa fa-align-center",action:function(){return this.$editor().wrapSelection("justifyCenter",null)},activeState:function(a){var b=!1;return a&&(b="center"===a.css("text-align")),b=b||document.queryCommandState("justifyCenter")}}),a("italics",{iconclass:"fa fa-italic",action:function(){return this.$editor().wrapSelection("italic",null)},activeState:function(){return document.queryCommandState("italic")},commandKeyCode:105}),a("underline",{iconclass:"fa fa-underline",action:function(){return this.$editor().wrapSelection("underline",null)},activeState:function(){return document.queryCommandState("underline")},commandKeyCode:117}),a("clear",{iconclass:"fa fa-ban",action:function(a,b){this.$editor().wrapSelection("removeFormat",null);var c=angular.element(d.getSelectionElement()),e=function(a){a=angular.element(a);var b=a;angular.forEach(a.children(),function(a){var c=angular.element("<p></p>");c.html(angular.element(a).html()),b.after(c),b=c}),a.remove()};angular.forEach(c.find("ul"),e),angular.forEach(c.find("ol"),e);var f=this.$editor(),g=function(a){a=angular.element(a),a[0]!==f.displayElements.text[0]&&a.removeAttr("class"),angular.forEach(a.children(),g)};angular.forEach(c,g),"li"!==c[0].tagName.toLowerCase()&&"ol"!==c[0].tagName.toLowerCase()&&"ul"!==c[0].tagName.toLowerCase()&&this.$editor().wrapSelection("formatBlock","<p>"),b()}});var g=function(a,b,c){var d=function(){c.updateTaBindtaTextElement(),c.hidePopover()};a.preventDefault(),c.displayElements.popover.css("width","375px");var e=c.displayElements.popoverContainer;e.empty();var f=angular.element('<div class="btn-group" style="padding-right: 6px;">'),g=angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1">100% </button>');g.on("click",function(a){a.preventDefault(),b.css({width:"100%",height:""}),d()});var h=angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1">50% </button>');h.on("click",function(a){a.preventDefault(),b.css({width:"50%",height:""}),d()});var i=angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1">25% </button>');i.on("click",function(a){a.preventDefault(),b.css({width:"25%",height:""}),d()});var j=angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1">Reset</button>');j.on("click",function(a){a.preventDefault(),b.css({width:"",height:""}),d()}),f.append(g),f.append(h),f.append(i),f.append(j),e.append(f),f=angular.element('<div class="btn-group" style="padding-right: 6px;">');var k=angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1"><i class="fa fa-align-left"></i></button>');k.on("click",function(a){a.preventDefault(),b.css("float","left"),d()});var l=angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1"><i class="fa fa-align-right"></i></button>');l.on("click",function(a){a.preventDefault(),b.css("float","right"),d()});var m=angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1"><i class="fa fa-align-justify"></i></button>');m.on("click",function(a){a.preventDefault(),b.css("float",""),d()}),f.append(k),f.append(m),f.append(l),e.append(f),f=angular.element('<div class="btn-group">');var n=angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1"><i class="fa fa-trash-o"></i></button>');n.on("click",function(a){a.preventDefault(),b.remove(),d()}),f.append(n),e.append(f),c.showPopover(b),c.showResizeOverlay(b)};a("insertImage",{iconclass:"fa fa-picture-o",action:function(){var a;return a=b.prompt(c.insertImage,"http://"),a&&""!==a&&"http://"!==a?this.$editor().wrapSelection("insertImage",a,!0):void 0},onElementSelect:{element:"img",action:g}}),a("insertVideo",{iconclass:"fa fa-youtube-play",action:function(){var a;if(a=b.prompt(c.insertVideo,"http://"),a&&""!==a&&"http://"!==a){var d=a.match(/(\?|&)v=[^&]*/);if(d.length>0){var e="http://www.youtube.com/embed/"+d[0].substring(3),f='<img class="ta-insert-video" ta-insert-video="'+e+'" contenteditable="false" src="" allowfullscreen="true" width="300" frameborder="0" height="250"/>';return this.$editor().wrapSelection("insertHTML",f,!0)}}},onElementSelect:{element:"img",onlyWithAttrs:["ta-insert-video"],action:g}}),a("insertLink",{iconclass:"fa fa-link",action:function(){var a;return a=b.prompt(c.insertLink,"http://"),a&&""!==a&&"http://"!==a?this.$editor().wrapSelection("createLink",a,!0):void 0},activeState:function(a){return a?"A"===a[0].tagName:!1},onElementSelect:{element:"a",action:function(a,d,e){a.preventDefault(),e.displayElements.popover.css("width","305px");var f=e.displayElements.popoverContainer;f.empty(),f.css("line-height","28px");var g=angular.element('<a href="'+d.attr("href")+'" target="_blank">'+d.attr("href")+"</a>");g.css({display:"inline-block","max-width":"200px",overflow:"hidden","text-overflow":"ellipsis","white-space":"nowrap","vertical-align":"middle"}),f.append(g);var h=angular.element('<div class="btn-group pull-right">'),i=angular.element('<button type="button" class="btn btn-default btn-sm btn-small" tabindex="-1" unselectable="on"><i class="fa fa-edit icon-edit"></i></button>');i.on("click",function(a){a.preventDefault();var f=b.prompt(c.insertLink,d.attr("href"));f&&""!==f&&"http://"!==f&&(d.attr("href",f),e.updateTaBindtaTextElement()),e.hidePopover()}),h.append(i);var j=angular.element('<button type="button" class="btn btn-default btn-sm btn-small" tabindex="-1" unselectable="on"><i class="fa fa-unlink icon-unlink"></i></button>');j.on("click",function(a){a.preventDefault(),d.replaceWith(d.contents()),e.updateTaBindtaTextElement(),e.hidePopover()}),h.append(j),f.append(h),e.showPopover(d)}}})}]),function(){"Use Strict";function a(a){try{return 0!==angular.element(a).length}catch(b){return!1}}function b(a,c){var d=[],e=a.children();return e.length&&angular.forEach(e,function(a){d=d.concat(b(angular.element(a),c))}),void 0!==a.attr(c)&&d.push(a),d}function c(b,c){if(!b||""===b||m.hasOwnProperty(b))throw"textAngular Error: A unique name is required for a Tool Definition";if(c.display&&(""===c.display||!a(c.display))||!c.display&&!c.buttontext&&!c.iconclass)throw'textAngular Error: Tool Definition for "'+b+'" does not have a valid display/iconclass/buttontext value';m[b]=c}var d=!1;/AppleWebKit\/([\d.]+)/.exec(navigator.userAgent)&&(document.addEventListener("click",function(){var a=window.event.target;if(d&&null!==a){for(var b=!1,c=a;null!==c&&"html"!==c.tagName.toLowerCase()&&!b;)b="true"===c.contentEditable,c=c.parentNode;b||(document.getElementById("textAngular-editableFix-010203040506070809").setSelectionRange(0,0),a.focus())}d=!1},!1),angular.element(document.body).append('<input id="textAngular-editableFix-010203040506070809" style="width:1px;height:1px;border:none;margin:0;padding:0;position:absolute; top: -10000; left: -10000;" unselectable="on" tabIndex="-1">'));var e=function(){var a,b=-1,c=window.navigator.userAgent,d=c.indexOf("MSIE "),e=c.indexOf("Trident/");if(d>0)b=parseInt(c.substring(d+5,c.indexOf(".",d)),10);else if(e>0){var f=c.indexOf("rv:");b=parseInt(c.substring(f+3,c.indexOf(".",f)),10)}return b>-1?b:a}();"function"!=typeof String.prototype.trim&&(String.prototype.trim=function(){return this.replace(/^\s\s*/,"").replace(/\s\s*$/,"")});var f,g,h;if(e>8||void 0===e){var j=function(){var a=document.createElement("style");return/AppleWebKit\/([\d.]+)/.exec(navigator.userAgent)&&a.appendChild(document.createTextNode("")),document.head.insertBefore(a,document.head.firstChild),a.sheet}();f=function(){var a=document.createElement("style");return/AppleWebKit\/([\d.]+)/.exec(navigator.userAgent)&&a.appendChild(document.createTextNode("")),document.head.appendChild(a),a.sheet}(),g=function(a,b){_addCSSRule(f,a,b)},_addCSSRule=function(a,b,c){var d;return a.rules?d=Math.max(a.rules.length-1,0):a.cssRules&&(d=Math.max(a.cssRules.length-1,0)),a.insertRule?a.insertRule(b+"{"+c+"}",d):a.addRule(b,c,d),d},h=function(a){_removeCSSRule(f,a)},_removeCSSRule=function(a,b){a.removeRule?a.removeRule(b):a.deleteRule(b)},_addCSSRule(j,".ta-scroll-window.form-control","height: 300px; overflow: auto; font-family: inherit; font-size: 100%; position: relative; padding: 0;"),_addCSSRule(j,".ta-root.focussed .ta-scroll-window.form-control","border-color: #66afe9; outline: 0; -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(102, 175, 233, 0.6);"),_addCSSRule(j,".ta-editor.ta-html","min-height: 300px; height: auto; overflow: auto; font-family: inherit; font-size: 100%;"),_addCSSRule(j,".ta-scroll-window .ta-bind","height: auto; min-height: 300px; padding: 6px 12px;"),_addCSSRule(j,".ta-root .ta-resizer-handle-overlay","z-index: 100; position: absolute; display: none;"),_addCSSRule(j,".ta-root .ta-resizer-handle-overlay > .ta-resizer-handle-info","position: absolute; bottom: 16px; right: 16px; border: 1px solid black; background-color: #FFF; padding: 0 4px; opacity: 0.7;"),_addCSSRule(j,".ta-root .ta-resizer-handle-overlay > .ta-resizer-handle-background","position: absolute; bottom: 5px; right: 5px; left: 5px; top: 5px; border: 1px solid black; background-color: rgba(0, 0, 0, 0.2);"),_addCSSRule(j,".ta-root .ta-resizer-handle-overlay > .ta-resizer-handle-corner","width: 10px; height: 10px; position: absolute;"),_addCSSRule(j,".ta-root .ta-resizer-handle-overlay > .ta-resizer-handle-corner-tl","top: 0; left: 0; border-left: 1px solid black; border-top: 1px solid black;"),_addCSSRule(j,".ta-root .ta-resizer-handle-overlay > .ta-resizer-handle-corner-tr","top: 0; right: 0; border-right: 1px solid black; border-top: 1px solid black;"),_addCSSRule(j,".ta-root .ta-resizer-handle-overlay > .ta-resizer-handle-corner-bl","bottom: 0; left: 0; border-left: 1px solid black; border-bottom: 1px solid black;"),_addCSSRule(j,".ta-root .ta-resizer-handle-overlay > .ta-resizer-handle-corner-br","bottom: 0; right: 0; border: 1px solid black; cursor: se-resize; background-color: white;")}var k=!1,l=angular.module("textAngular",["ngSanitize","textAngularSetup"]),m={};l.constant("taRegisterTool",c),l.value("taTools",m),l.config([function(){angular.forEach(m,function(a,b){delete m[b]})}]),l.directive("textAngular",["$compile","$timeout","taOptions","taSanitize","taSelection","taExecCommand","textAngularManager","$window","$document","$animate","$log",function(a,b,c,d,e,f,g,h,i,j,k){return{require:"?ngModel",scope:{},restrict:"EA",link:function(d,l,m,n){var o,p,q,r,s,t,u,v,w,x=Math.floor(1e16*Math.random()),y=m.name?m.name:"textAngularEditor"+x,z=function(a,c,d){b(function(){var b=function(){a.off(c,b),d()};a.on(c,b)},100)};w=f(m.taDefaultWrap),angular.extend(d,angular.copy(c),{wrapSelection:function(a,b,c){w(a,!1,b),c&&d["reApplyOnSelectorHandlerstaTextElement"+x](),d.displayElements.text[0].focus()},showHtml:!1}),m.taFocussedClass&&(d.classes.focussed=m.taFocussedClass),m.taTextEditorClass&&(d.classes.textEditor=m.taTextEditorClass),m.taHtmlEditorClass&&(d.classes.htmlEditor=m.taHtmlEditorClass),m.taTextEditorSetup&&(d.setup.textEditorSetup=d.$parent.$eval(m.taTextEditorSetup)),m.taHtmlEditorSetup&&(d.setup.htmlEditorSetup=d.$parent.$eval(m.taHtmlEditorSetup)),d.fileDropHandler=m.taFileDrop?d.$parent.$eval(m.taFileDrop):d.defaultFileDropHandler,u=l[0].innerHTML,l[0].innerHTML="",d.displayElements={forminput:angular.element("<input type='hidden' tabindex='-1' style='display: none;'>"),html:angular.element("<textarea></textarea>"),text:angular.element("<div></div>"),scrollWindow:angular.element("<div class='ta-scroll-window'></div>"),popover:angular.element('<div class="popover fade bottom" style="max-width: none; width: 305px;"><div class="arrow"></div></div>'),popoverContainer:angular.element('<div class="popover-content"></div>'),resize:{overlay:angular.element('<div class="ta-resizer-handle-overlay"></div>'),background:angular.element('<div class="ta-resizer-handle-background"></div>'),anchors:[angular.element('<div class="ta-resizer-handle-corner ta-resizer-handle-corner-tl"></div>'),angular.element('<div class="ta-resizer-handle-corner ta-resizer-handle-corner-tr"></div>'),angular.element('<div class="ta-resizer-handle-corner ta-resizer-handle-corner-bl"></div>'),angular.element('<div class="ta-resizer-handle-corner ta-resizer-handle-corner-br"></div>')],info:angular.element('<div class="ta-resizer-handle-info"></div>')}},d.displayElements.popover.append(d.displayElements.popoverContainer),d.displayElements.scrollWindow.append(d.displayElements.popover),d.displayElements.popover.on("mousedown",function(a,b){return b&&angular.extend(a,b),a.preventDefault(),!1}),d.showPopover=function(a){d.reflowPopover(a),d.displayElements.popover.css("display","block"),j.addClass(d.displayElements.popover,"in"),z(l,"click keyup",function(){d.hidePopover()})},d.reflowPopover=function(a){d.displayElements.text[0].offsetHeight-51>a[0].offsetTop?(d.displayElements.popover.css("top",a[0].offsetTop+a[0].offsetHeight+"px"),d.displayElements.popover.removeClass("top").addClass("bottom")):(d.displayElements.popover.css("top",a[0].offsetTop-54+"px"),d.displayElements.popover.removeClass("bottom").addClass("top")),d.displayElements.popover.css("left",Math.max(0,Math.min(d.displayElements.text[0].offsetWidth-305,a[0].offsetLeft+a[0].offsetWidth/2-152.5))+"px")},d.hidePopover=function(){j.removeClass(d.displayElements.popover,"in",function(){d.displayElements.popover.css("display",""),d.displayElements.popoverContainer.attr("style",""),d.displayElements.popoverContainer.attr("class","popover-content")})},d.displayElements.resize.overlay.append(d.displayElements.resize.background),angular.forEach(d.displayElements.resize.anchors,function(a){d.displayElements.resize.overlay.append(a)}),d.displayElements.resize.overlay.append(d.displayElements.resize.info),d.displayElements.scrollWindow.append(d.displayElements.resize.overlay),d.reflowResizeOverlay=function(a){a=angular.element(a)[0],d.displayElements.resize.overlay.css({display:"block",left:a.offsetLeft-5+"px",top:a.offsetTop-5+"px",width:a.offsetWidth+10+"px",height:a.offsetHeight+10+"px"}),d.displayElements.resize.info.text(a.offsetWidth+" x "+a.offsetHeight)},d.showResizeOverlay=function(a){var b=function(b){var c={width:parseInt(a.attr("width")),height:parseInt(a.attr("height")),x:b.clientX,y:b.clientY};void 0===c.width&&(c.width=a[0].offsetWidth),void 0===c.height&&(c.height=a[0].offsetHeight),d.hidePopover();var e=c.height/c.width,f=function(b){var f={x:Math.max(0,c.width+(b.clientX-c.x)),y:Math.max(0,c.height+(b.clientY-c.y))},g=function(a,b){a=angular.element(a),"img"===a[0].tagName.toLowerCase()&&(b.height&&(a.attr("height",b.height),delete b.height),b.width&&(a.attr("width",b.width),delete b.width)),a.css(b)};if(b.shiftKey){var h=f.y/f.x;g(a,{width:e>h?f.x:f.y/e,height:e>h?f.x*e:f.y})}else g(a,{width:f.x,height:f.y});d.reflowResizeOverlay(a)};i.find("body").on("mousemove",f),z(d.displayElements.resize.overlay,"mouseup",function(){i.find("body").off("mousemove",f),d.showPopover(a)}),b.stopPropagation(),b.preventDefault()};d.displayElements.resize.anchors[3].on("mousedown",b),d.reflowResizeOverlay(a),z(l,"click",function(){d.hideResizeOverlay()})},d.hideResizeOverlay=function(){d.displayElements.resize.overlay.css("display","")},d.setup.htmlEditorSetup(d.displayElements.html),d.setup.textEditorSetup(d.displayElements.text),d.displayElements.html.attr({id:"taHtmlElement"+x,"ng-show":"showHtml","ta-bind":"ta-bind","ng-model":"html"}),d.displayElements.text.attr({id:"taTextElement"+x,contentEditable:"true","ta-bind":"ta-bind","ng-model":"html"}),d.displayElements.scrollWindow.attr({"ng-hide":"showHtml"}),m.taDefaultWrap&&d.displayElements.text.attr("ta-default-wrap",m.taDefaultWrap),d.displayElements.scrollWindow.append(d.displayElements.text),l.append(d.displayElements.scrollWindow),l.append(d.displayElements.html),d.displayElements.forminput.attr("name",y),l.append(d.displayElements.forminput),m.tabindex&&(l.removeAttr("tabindex"),d.displayElements.text.attr("tabindex",m.tabindex),d.displayElements.html.attr("tabindex",m.tabindex)),m.placeholder&&(d.displayElements.text.attr("placeholder",m.placeholder),d.displayElements.html.attr("placeholder",m.placeholder)),m.taDisabled&&(d.displayElements.text.attr("ta-readonly","disabled"),d.displayElements.html.attr("ta-readonly","disabled"),d.disabled=d.$parent.$eval(m.taDisabled),d.$parent.$watch(m.taDisabled,function(a){d.disabled=a,d.disabled?l.addClass(d.classes.disabled):l.removeClass(d.classes.disabled)})),a(d.displayElements.scrollWindow)(d),a(d.displayElements.html)(d),d.updateTaBindtaTextElement=d["updateTaBindtaTextElement"+x],d.updateTaBindtaHtmlElement=d["updateTaBindtaHtmlElement"+x],l.addClass("ta-root"),d.displayElements.scrollWindow.addClass("ta-text ta-editor "+d.classes.textEditor),d.displayElements.html.addClass("ta-html ta-editor "+d.classes.htmlEditor),d._actionRunning=!1;var A=!1;if(d.startAction=function(){return d._actionRunning=!0,h.rangy&&h.rangy.saveSelection?(A=h.rangy.saveSelection(),function(){A&&h.rangy.restoreSelection(A)}):void 0},d.endAction=function(){d._actionRunning=!1,A&&h.rangy.removeMarkers(A),A=!1,d.updateSelectedStyles(),d.showHtml||d["updateTaBindtaTextElement"+x]()},s=function(){l.addClass(d.classes.focussed),v.focus()},d.displayElements.html.on("focus",s),d.displayElements.text.on("focus",s),t=function(a){return d._actionRunning||i[0].activeElement===d.displayElements.html[0]||i[0].activeElement===d.displayElements.text[0]||(l.removeClass(d.classes.focussed),v.unfocus(),b(function(){l.triggerHandler("blur")},0)),a.preventDefault(),!1},d.displayElements.html.on("blur",t),d.displayElements.text.on("blur",t),d.queryFormatBlockState=function(a){return a.toLowerCase()===i[0].queryCommandValue("formatBlock").toLowerCase()},d.switchView=function(){d.showHtml=!d.showHtml,d.showHtml?b(function(){return d.displayElements.html[0].focus()},100):b(function(){return d.displayElements.text[0].focus()},100)},m.ngModel){var B=!0;n.$render=function(){if(B){B=!1;var a=d.$parent.$eval(m.ngModel);void 0!==a&&null!==a||!u||""===u||n.$setViewValue(u)}d.displayElements.forminput.val(n.$viewValue),d._elementSelectTriggered||i[0].activeElement===d.displayElements.html[0]||i[0].activeElement===d.displayElements.text[0]||(d.html=n.$viewValue||"")}}else d.displayElements.forminput.val(u),d.html=u;if(d.$watch("html",function(a,b){a!==b&&(m.ngModel&&n.$viewValue!==a&&n.$setViewValue(a),d.displayElements.forminput.val(a))}),m.taTargetToolbars)v=g.registerEditor(y,d,m.taTargetToolbars.split(","));else{var C=angular.element('<div text-angular-toolbar name="textAngularToolbar'+x+'">');m.taToolbar&&C.attr("ta-toolbar",m.taToolbar),m.taToolbarClass&&C.attr("ta-toolbar-class",m.taToolbarClass),m.taToolbarGroupClass&&C.attr("ta-toolbar-group-class",m.taToolbarGroupClass),m.taToolbarButtonClass&&C.attr("ta-toolbar-button-class",m.taToolbarButtonClass),m.taToolbarActiveButtonClass&&C.attr("ta-toolbar-active-button-class",m.taToolbarActiveButtonClass),m.taFocussedClass&&C.attr("ta-focussed-class",m.taFocussedClass),l.prepend(C),a(C)(d.$parent),v=g.registerEditor(y,d,["textAngularToolbar"+x])}d.$on("$destroy",function(){g.unregisterEditor(y)}),d.$on("ta-element-select",function(a,b){v.triggerElementSelect(a,b)}),d.$on("ta-drop-event",function(a,b,c,e){d.displayElements.text[0].focus(),e&&e.files&&e.files.length>0&&(angular.forEach(e.files,function(a){try{return d.fileDropHandler(a,d.wrapSelection)||d.fileDropHandler!==d.defaultFileDropHandler&&d.defaultFileDropHandler(a,d.wrapSelection)}catch(b){k.error(b)}}),c.preventDefault(),c.stopPropagation())}),d._bUpdateSelectedStyles=!1,d.updateSelectedStyles=function(){var a;void 0!==(a=e.getSelectionElement())&&a.parentNode!==d.displayElements.text[0]?v.updateSelectedStyles(angular.element(a)):v.updateSelectedStyles(),d._bUpdateSelectedStyles&&b(d.updateSelectedStyles,200)},o=function(){d._bUpdateSelectedStyles||(d._bUpdateSelectedStyles=!0,d.$apply(function(){d.updateSelectedStyles()}))},d.displayElements.html.on("keydown",o),d.displayElements.text.on("keydown",o),p=function(){d._bUpdateSelectedStyles=!1},d.displayElements.html.on("keyup",p),d.displayElements.text.on("keyup",p),q=function(a,b){b&&angular.extend(a,b),d.$apply(function(){return v.sendKeyCommand(a)?(d._bUpdateSelectedStyles||d.updateSelectedStyles(),a.preventDefault(),!1):void 0})},d.displayElements.html.on("keypress",q),d.displayElements.text.on("keypress",q),r=function(){d._bUpdateSelectedStyles=!1,d.$apply(function(){d.updateSelectedStyles()})},d.displayElements.html.on("mouseup",r),d.displayElements.text.on("mouseup",r)}}}]).factory("taBrowserTag",[function(){return function(a){return a?""===a?void 0===e?"div":8>=e?"P":"p":8>=e?a.toUpperCase():a:8>=e?"P":"p"}}]).factory("taExecCommand",["taSelection","taBrowserTag","$document",function(a,b,c){var d=/(address|article|aside|audio|blockquote|canvas|dd|div|dl|fieldset|figcaption|figure|footer|form|h1|h2|h3|h4|h5|h6|header|hgroup|hr|noscript|ol|output|p|pre|section|table|tfoot|ul|video)/gi,e=/(ul|li|ol)/gi,f=function(b,c){var d,e=b.find("li");for(i=e.length-1;i>=0;i--)d=angular.element("<"+c+">"+e[i].innerHTML+"</"+c+">"),b.after(d);b.remove(),a.setSelectionToElementEnd(d[0])},g=function(b,c){var d=angular.element("<"+c+">"+b[0].innerHTML+"</"+c+">");b.after(d),b.remove(),a.setSelectionToElementEnd(d.find("li")[0])},h=function(c,d,e){var f="";for(i=c.length-1;i>=0;i--)f+="<"+b("li")+">"+c[i].innerHTML+"</"+b("li")+">";var g=angular.element("<"+e+">"+f+"</"+e+">");d.after(g),d.remove(),a.setSelectionToElementEnd(g.find("li")[0])};return function(i){return i=b(i),function(j,k,l){var m,n,o,p,q,r=angular.element("<"+i+">"),s=a.getSelectionElement(),t=angular.element(s);if(void 0!==s){var u=s.tagName.toLowerCase();if("insertorderedlist"===j.toLowerCase()||"insertunorderedlist"===j.toLowerCase()){var v=b("insertorderedlist"===j.toLowerCase()?"ol":"ul");if(u===v)return f(t,i);if("li"===u&&t.parent()[0].tagName.toLowerCase()===v&&1===t.parent().children().length)return f(t.parent(),i);if("li"===u&&t.parent()[0].tagName.toLowerCase()!==v&&1===t.parent().children().length)return g(t.parent(),v);if(u.match(d)&&!t.hasClass("ta-bind"))return"ol"===u||"ul"===u?g(t,v):s.innerHTML.match(d)?h(t.children(),t,v):h(angular.element("<div>"+s.innerHTML+"</div>"),t,v);if(u.match(d)){if(p=a.getOnlySelectedElements(),1===p.length&&("ol"===p[0].tagName.toLowerCase()||"ul"===p[0].tagName.toLowerCase()))return p[0].tagName.toLowerCase()===v?f(angular.element(p[0]),i):g(angular.element(p[0]),v);o="";var w=[];for(m=0;m<p.length;m++)if(3!==p[m].nodeType){var x=angular.element(p[m]);o+="<"+b("li")+">"+x[0].innerHTML+"</"+b("li")+">",w.unshift(x)}return n=angular.element("<"+v+">"+o+"</"+v+">"),w.pop().replaceWith(n),angular.forEach(w,function(a){a.remove()}),void a.setSelectionToElementEnd(n[0])}}else if("formatblock"===j.toLowerCase()&&"blockquote"===l.toLowerCase().replace(/[<>]/gi,"")){for(n="li"===u?t.parent():t;!n[0].tagName.match(d);)n=n.parent(),u=n[0].tagName.toLowerCase();if(u===l.toLowerCase().replace(/[<>]/gi,"")){p=n.children();var y=!1;for(m=0;m<p.length;m++)y=y||p[m].tagName.match(d);y?(n.after(p),q=n.next(),n.remove(),n=q):(r.append(n[0].childNodes),n.after(r),n.remove(),n=r)}else if(n.parent()[0].tagName.toLowerCase()!==l.toLowerCase().replace(/[<>]/gi,"")||n.parent().hasClass("ta-bind"))if(u.match(e))n.wrap(l);else{if(p=a.getOnlySelectedElements(),0===p.length&&(p=[n[0]]),o="",1===p.length&&3===p[0].nodeType){for(var z=p[0].parentNode;!z.tagName.match(d);)z=z.parentNode;p=[z]}for(m=0;m<p.length;m++)o+=p[m].outerHTML;n=angular.element(l),n[0].innerHTML=o,p[0].parentNode.insertBefore(n[0],p[0]),angular.forEach(p,function(a){a.parentNode.removeChild(a)})}else{var A=n.parent(),B=A.contents();for(m=0;m<B.length;m++)A.parent().hasClass("ta-bind")&&3===B[m].nodeType&&(r=angular.element("<"+i+">"),r[0].innerHTML=B[m].outerHTML,B[m]=r[0]),A.parent()[0].insertBefore(B[m],A[0]);A.remove()}return void a.setSelectionToElementEnd(n[0])}}try{c[0].execCommand(j,k,l)}catch(C){}}}}]).directive("taBind",["taSanitize","$timeout","$window","$document","taFixChrome","taBrowserTag","taSelection","taSelectableElements","taApplyCustomRenderers",function(a,b,c,f,i,j,l,m,n){return{require:"ngModel",scope:{},link:function(j,o,p,q){var r,s,t=void 0!==o.attr("contenteditable")&&o.attr("contenteditable"),u=t||"textarea"===o[0].tagName.toLowerCase()||"input"===o[0].tagName.toLowerCase(),v=!1,w=!1;void 0===p.taDefaultWrap&&(p.taDefaultWrap="p"),""===p.taDefaultWrap?(r="",s=void 0===e?"<div><br></div>":e>=11?"<p><br></p>":8>=e?"<P>&nbsp;</P>":"<p>&nbsp;</p>"):(r=void 0===e||e>=11?"<"+p.taDefaultWrap+"><br></"+p.taDefaultWrap+">":8>=e?"<"+p.taDefaultWrap.toUpperCase()+"></"+p.taDefaultWrap.toUpperCase()+">":"<"+p.taDefaultWrap+"></"+p.taDefaultWrap+">",s=void 0===e||e>=11?"<"+p.taDefaultWrap+"><br></"+p.taDefaultWrap+">":8>=e?"<"+p.taDefaultWrap.toUpperCase()+">&nbsp;</"+p.taDefaultWrap.toUpperCase()+">":"<"+p.taDefaultWrap+">&nbsp;</"+p.taDefaultWrap+">"),o.addClass("ta-bind");var x=function(){if(t)return o[0].innerHTML;if(u)return o.val();throw"textAngular Error: attempting to update non-editable taBind"};if(j.$parent["updateTaBind"+(p.id||"")]=function(){v||q.$setViewValue(x())},u)if(t){if(o.on("cut",function(a){v?a.preventDefault():b(function(){q.$setViewValue(x())},0)}),o.on("paste",function(a,b){b&&angular.extend(a,b);var d;if(a.clipboardData||a.originalEvent&&a.originalEvent.clipboardData?d=(a.originalEvent||a).clipboardData.getData("text/plain"):c.clipboardData&&(d=c.clipboardData.getData("Text")),!d&&!v)return!0;if(a.preventDefault(),!v){var e=angular.element("<div></div>");if(e[0].innerHTML=d,d=e.text(),f[0].selection){var g=f[0].selection.createRange();g.pasteHTML(d)}else f[0].execCommand("insertText",!1,d);q.$setViewValue(x())}}),o.on("keyup",function(a,b){if(b&&angular.extend(a,b),!v){if(""!==r&&13===a.keyCode&&!a.shiftKey){var c=l.getSelectionElement();if(c.tagName.toLowerCase()!==p.taDefaultWrap&&"li"!==c.tagName.toLowerCase()&&(""===c.innerHTML.trim()||"<br>"===c.innerHTML.trim())){var d=angular.element(r);angular.element(c).replaceWith(d),l.setSelectionToElementStart(d[0])}}var e=x();""!==r&&""===e.trim()&&(o[0].innerHTML=r,l.setSelectionToElementStart(o.children()[0])),q.$setViewValue(e)}}),o.on("blur",function(){w=!1;var a=x();v||q.$setViewValue(a===s?"":x()),q.$render()}),p.placeholder&&(e>8||void 0===e)){var y;if(!p.id)throw"textAngular Error: An unique ID is required for placeholders to work";y=g("#"+p.id+".placeholder-text:before",'content: "'+p.placeholder+'"'),j.$on("$destroy",function(){h(y)})}o.on("focus",function(){w=!0,q.$render()})}else o.on("paste cut",function(){v||b(function(){q.$setViewValue(x())},0)}),o.on("change blur",function(){v||q.$setViewValue(x())});var z=function(b){return q.$oldViewValue=a(i(b),q.$oldViewValue)};q.$parsers.push(z),q.$formatters.push(z);var A=function(a){return j.$emit("ta-element-select",this),a.preventDefault(),!1},B=function(a,c){if(c&&angular.extend(a,c),!k&&!v){k=!0;var d;d=a.originalEvent?a.originalEvent.dataTransfer:a.dataTransfer,j.$emit("ta-drop-event",this,a,d),b(function(){k=!1},100)}};j.$parent["reApplyOnSelectorHandlers"+(p.id||"")]=function(){v||angular.forEach(m,function(a){o.find(a).off("click",A).on("click",A)})},q.$render=function(){var a=q.$viewValue||"";f[0].activeElement!==o[0]?t?(p.placeholder?""===a?(w?o.removeClass("placeholder-text"):o.addClass("placeholder-text"),o[0].innerHTML=r):(o.removeClass("placeholder-text"),o[0].innerHTML=a):o[0].innerHTML=""===a?r:a,v?o.off("drop",B):(angular.forEach(m,function(a){o.find(a).on("click",A)}),o.on("drop",B))):"textarea"!==o[0].tagName.toLowerCase()&&"input"!==o[0].tagName.toLowerCase()?o[0].innerHTML=n(a):o.val(a):t&&o.removeClass("placeholder-text")},p.taReadonly&&(v=j.$parent.$eval(p.taReadonly),v?(o.addClass("ta-readonly"),("textarea"===o[0].tagName.toLowerCase()||"input"===o[0].tagName.toLowerCase())&&o.attr("disabled","disabled"),void 0!==o.attr("contenteditable")&&o.attr("contenteditable")&&o.removeAttr("contenteditable")):(o.removeClass("ta-readonly"),"textarea"===o[0].tagName.toLowerCase()||"input"===o[0].tagName.toLowerCase()?o.removeAttr("disabled"):t&&o.attr("contenteditable","true")),j.$parent.$watch(p.taReadonly,function(a,b){b!==a&&(a?(o.addClass("ta-readonly"),("textarea"===o[0].tagName.toLowerCase()||"input"===o[0].tagName.toLowerCase())&&o.attr("disabled","disabled"),void 0!==o.attr("contenteditable")&&o.attr("contenteditable")&&o.removeAttr("contenteditable"),angular.forEach(m,function(a){o.find(a).on("click",A)
}),o.off("drop",B)):(o.removeClass("ta-readonly"),"textarea"===o[0].tagName.toLowerCase()||"input"===o[0].tagName.toLowerCase()?o.removeAttr("disabled"):t&&o.attr("contenteditable","true"),angular.forEach(m,function(a){o.find(a).off("click",A)}),o.on("drop",B)),v=a)})),t&&!v&&(angular.forEach(m,function(a){o.find(a).on("click",A)}),o.on("drop",B),o.on("blur",function(){/AppleWebKit\/([\d.]+)/.exec(navigator.userAgent)&&(d=!0)}))}}}]).factory("taApplyCustomRenderers",["taCustomRenderers",function(a){return function(c){var d=angular.element("<div></div>");return d[0].innerHTML=c,angular.forEach(a,function(a){var c=[];a.selector&&""!==a.selector?c=d.find(a.selector):a.customAttribute&&""!==a.customAttribute&&(c=b(d,a.customAttribute)),angular.forEach(c,function(b){b=angular.element(b),a.selector&&""!==a.selector&&a.customAttribute&&""!==a.customAttribute?void 0!==b.attr(a.customAttribute)&&a.renderLogic(b):a.renderLogic(b)})}),d[0].innerHTML}}]).directive("taMaxText",function(){return{restrict:"A",require:"ngModel",link:function(a,b,c,d){function e(a){var b=angular.element("<div/>");b.html(a);var c=b.text().length;return f>=c?(d.$setValidity("taMaxText",!0),a):void d.$setValidity("taMaxText",!1)}var f=parseInt(a.$eval(c.taMaxText));if(isNaN(f))throw"Max text must be an integer";c.$observe("taMaxText",function(a){if(f=parseInt(a),isNaN(f))throw"Max text must be an integer";d.$dirty&&d.$setViewValue(d.$viewValue)}),d.$parsers.unshift(e)}}}).factory("taFixChrome",function(){var a=function(a){for(var b=angular.element("<div>"+a+"</div>"),c=angular.element(b).find("span"),d=0;d<c.length;d++){var e=angular.element(c[d]);e.attr("style")&&e.attr("style").match(/line-height: 1.428571429;|color: inherit; line-height: 1.1;/i)&&(e.attr("style",e.attr("style").replace(/( |)font-family: inherit;|( |)line-height: 1.428571429;|( |)line-height:1.1;|( |)color: inherit;/gi,"")),e.attr("style")&&""!==e.attr("style")||(e.next().length>0&&"BR"===e.next()[0].tagName&&e.next().remove(),e.replaceWith(e[0].innerHTML)))}var f=b[0].innerHTML.replace(/style="[^"]*?(line-height: 1.428571429;|color: inherit; line-height: 1.1;)[^"]*"/gi,"");return f!==b[0].innerHTML&&(b[0].innerHTML=f),b[0].innerHTML};return a}).factory("taSanitize",["$sanitize",function(a){return function(c,d){var e=angular.element("<div>"+c+"</div>");angular.forEach(b(e,"align"),function(a){a.css("text-align",a.attr("align")),a.removeAttr("align")}),c=e[0].innerHTML;var f;try{f=a(c)}catch(g){f=d||""}return f}}]).directive("textAngularToolbar",["$compile","textAngularManager","taOptions","taTools","taToolExecuteAction","$window",function(a,b,c,d,e,f){return{scope:{name:"@"},restrict:"EA",link:function(g,h,i){if(!g.name||""===g.name)throw"textAngular Error: A toolbar requires a name";angular.extend(g,angular.copy(c)),i.taToolbar&&(g.toolbar=g.$parent.$eval(i.taToolbar)),i.taToolbarClass&&(g.classes.toolbar=i.taToolbarClass),i.taToolbarGroupClass&&(g.classes.toolbarGroup=i.taToolbarGroupClass),i.taToolbarButtonClass&&(g.classes.toolbarButton=i.taToolbarButtonClass),i.taToolbarActiveButtonClass&&(g.classes.toolbarButtonActive=i.taToolbarActiveButtonClass),i.taFocussedClass&&(g.classes.focussed=i.taFocussedClass),g.disabled=!0,g.focussed=!1,g._$element=h,h[0].innerHTML="",h.addClass("ta-toolbar "+g.classes.toolbar),g.$watch("focussed",function(){g.focussed?h.addClass(g.classes.focussed):h.removeClass(g.classes.focussed)});var j=function(b,c){var d;if(d=angular.element(b&&b.display?b.display:"<button type='button'>"),d.addClass(g.classes.toolbarButton),d.attr("name",c.name),d.attr("unselectable","on"),d.attr("ng-disabled","isDisabled()"),d.attr("tabindex","-1"),d.attr("ng-click","executeAction()"),d.attr("ng-class","displayActiveToolClass(active)"),d.on("mousedown",function(a,b){return b&&angular.extend(a,b),a.preventDefault(),!1}),b&&!b.display&&!c._display&&(d[0].innerHTML="",b.buttontext&&(d[0].innerHTML=b.buttontext),b.iconclass)){var e=angular.element("<i>"),f=d[0].innerHTML;e.addClass(b.iconclass),d[0].innerHTML="",d.append(e),f&&""!==f&&d.append("&nbsp;"+f)}return c._lastToolDefinition=angular.copy(b),a(d)(c)};g.tools={},g._parent={disabled:!0,showHtml:!1,queryFormatBlockState:function(){return!1}};var k={$window:f,$editor:function(){return g._parent},isDisabled:function(){return this.$eval("disabled")||this.$eval("disabled()")||"html"!==this.name&&this.$editor().showHtml||this.$parent.disabled||this.$editor().disabled},displayActiveToolClass:function(a){return a?g.classes.toolbarButtonActive:""},executeAction:e};angular.forEach(g.toolbar,function(a){var b=angular.element("<div>");b.addClass(g.classes.toolbarGroup),angular.forEach(a,function(a){g.tools[a]=angular.extend(g.$new(!0),d[a],k,{name:a}),g.tools[a].$element=j(d[a],g.tools[a]),b.append(g.tools[a].$element)}),h.append(b)}),g.updateToolDisplay=function(a,b,c){var d=g.tools[a];if(d){if(d._lastToolDefinition&&!c&&(b=angular.extend({},d._lastToolDefinition,b)),null===b.buttontext&&null===b.iconclass&&null===b.display)throw'textAngular Error: Tool Definition for updating "'+a+'" does not have a valid display/iconclass/buttontext value';null===b.buttontext&&delete b.buttontext,null===b.iconclass&&delete b.iconclass,null===b.display&&delete b.display;var e=j(b,d);d.$element.replaceWith(e),d.$element=e}},g.addTool=function(a,b,c,e){g.tools[a]=angular.extend(g.$new(!0),d[a],k,{name:a}),g.tools[a].$element=j(d[a],g.tools[a]);var f;void 0===c&&(c=g.toolbar.length-1),f=angular.element(h.children()[c]),void 0===e?(f.append(g.tools[a].$element),g.toolbar[c][g.toolbar[c].length-1]=a):(f.children().eq(e).after(g.tools[a].$element),g.toolbar[c][e]=a)},b.registerToolbar(g),g.$on("$destroy",function(){b.unregisterToolbar(g.name)})}}}]).service("taToolExecuteAction",["$q",function(a){return function(b){void 0!==b&&(this.$editor=function(){return b});var c=a.defer(),d=c.promise,e=this.$editor();d["finally"](function(){e.endAction.call(e)});var f;try{f=this.action(c,e.startAction())}catch(g){}(f||void 0===f)&&c.resolve()}}]).service("textAngularManager",["taToolExecuteAction","taTools","taRegisterTool",function(a,b,c){var d={},e={};return{registerEditor:function(c,f,g){if(!c||""===c)throw"textAngular Error: An editor requires a name";if(!f)throw"textAngular Error: An editor requires a scope";if(e[c])throw'textAngular Error: An Editor with name "'+c+'" already exists';var h=[];return angular.forEach(g,function(a){d[a]&&h.push(d[a])}),e[c]={scope:f,toolbars:g,_registerToolbar:function(a){this.toolbars.indexOf(a.name)>=0&&h.push(a)},editorFunctions:{disable:function(){angular.forEach(h,function(a){a.disabled=!0})},enable:function(){angular.forEach(h,function(a){a.disabled=!1})},focus:function(){angular.forEach(h,function(a){a._parent=f,a.disabled=!1,a.focussed=!0})},unfocus:function(){angular.forEach(h,function(a){a.disabled=!0,a.focussed=!1})},updateSelectedStyles:function(a){angular.forEach(h,function(b){angular.forEach(b.tools,function(b){b.activeState&&(b.active=b.activeState(a))})})},sendKeyCommand:function(c){var d=!1;return(c.ctrlKey||c.metaKey)&&angular.forEach(b,function(b,e){if(b.commandKeyCode&&b.commandKeyCode===c.which)for(var g=0;g<h.length;g++)if(void 0!==h[g].tools[e]){a.call(h[g].tools[e],f),d=!0;break}}),d},triggerElementSelect:function(a,c){var d=function(a,b){for(var c=!0,d=0;d<b.length;d++)c=c&&a.attr(b[d]);return c},e=[],g={},i=!1;c=angular.element(c);var j=!1;if(angular.forEach(b,function(a,b){a.onElementSelect&&a.onElementSelect.element&&a.onElementSelect.element.toLowerCase()===c[0].tagName.toLowerCase()&&(!a.onElementSelect.filter||a.onElementSelect.filter(c))&&(j=j||angular.isArray(a.onElementSelect.onlyWithAttrs)&&d(c,a.onElementSelect.onlyWithAttrs),(!a.onElementSelect.onlyWithAttrs||d(c,a.onElementSelect.onlyWithAttrs))&&(g[b]=a))}),j?(angular.forEach(g,function(a,b){a.onElementSelect.onlyWithAttrs&&d(c,a.onElementSelect.onlyWithAttrs)&&e.push({name:b,tool:a})}),e.sort(function(a,b){return b.tool.onElementSelect.onlyWithAttrs.length-a.tool.onElementSelect.onlyWithAttrs.length})):angular.forEach(g,function(a,b){e.push({name:b,tool:a})}),e.length>0)for(var k=e[0].tool,l=e[0].name,m=0;m<h.length;m++)if(void 0!==h[m].tools[l]){k.onElementSelect.action.call(h[m].tools[l],a,c,f),i=!0;break}return i}}},e[c].editorFunctions},retrieveEditor:function(a){return e[a]},unregisterEditor:function(a){delete e[a]},registerToolbar:function(a){if(!a)throw"textAngular Error: A toolbar requires a scope";if(!a.name||""===a.name)throw"textAngular Error: A toolbar requires a name";if(d[a.name])throw'textAngular Error: A toolbar with name "'+a.name+'" already exists';d[a.name]=a,angular.forEach(e,function(b){b._registerToolbar(a)})},retrieveToolbar:function(a){return d[a]},retrieveToolbarsViaEditor:function(a){var b=[],c=this;return angular.forEach(this.retrieveEditor(a).toolbars,function(a){b.push(c.retrieveToolbar(a))}),b},unregisterToolbar:function(a){delete d[a]},updateToolsDisplay:function(a){var b=this;angular.forEach(a,function(a,c){b.updateToolDisplay(c,a)})},resetToolsDisplay:function(){var a=this;angular.forEach(b,function(b,c){a.resetToolDisplay(c)})},updateToolDisplay:function(a,b){var c=this;angular.forEach(d,function(d,e){c.updateToolbarToolDisplay(e,a,b)})},resetToolDisplay:function(a){var b=this;angular.forEach(d,function(c,d){b.resetToolbarToolDisplay(d,a)})},updateToolbarToolDisplay:function(a,b,c){if(!d[a])throw'textAngular Error: No Toolbar with name "'+a+'" exists';d[a].updateToolDisplay(b,c)},resetToolbarToolDisplay:function(a,c){if(!d[a])throw'textAngular Error: No Toolbar with name "'+a+'" exists';d[a].updateToolDisplay(c,b[c],!0)},removeTool:function(a){delete b[a],angular.forEach(d,function(b){delete b.tools[a];for(var c=0;c<b.toolbar.length;c++){for(var d,e=0;e<b.toolbar[c].length;e++){if(b.toolbar[c][e]===a){d={group:c,index:e};break}if(void 0!==d)break}void 0!==d&&(b.toolbar[d.group].slice(d.index,1),b._$element.children().eq(d.group).children().eq(d.index).remove())}})},addTool:function(a,b,e,f){c(a,b),angular.forEach(d,function(c){c.addTool(a,b,e,f)})},addToolToToolbar:function(a,b,e,f,g){c(a,b),d[e].addTool(a,b,f,g)},refreshEditor:function(a){if(!e[a])throw'textAngular Error: No Editor with name "'+a+'" exists';e[a].scope.updateTaBindtaTextElement(),e[a].scope.$$phase||e[a].scope.$digest()}}}]).service("taSelection",["$window","$document",function(a,b){_document=b[0];var c=function(a){if(a.hasChildNodes())return a.firstChild;for(;a&&!a.nextSibling;)a=a.parentNode;return a?a.nextSibling:null},d=function(a){var b=a.startContainer,d=a.endContainer;if(b===d)return[b];for(var e=[];b&&b!==d;)b=c(b),b.parentNode===a.commonAncestorContainer&&e.push(b);for(b=a.startContainer;b&&b!==a.commonAncestorContainer;)b.parentNode===a.commonAncestorContainer&&e.unshift(b),b=b.parentNode;return e};return{getOnlySelectedElements:function(){if(window.getSelection){var b=a.getSelection();if(!b.isCollapsed)return d(b.getRangeAt(0))}return[]},getSelectionElement:function(){var b,c,d;return _document.selection&&_document.selection.createRange?(b=_document.selection.createRange(),b.parentElement()):a.getSelection&&(c=a.getSelection(),c.getRangeAt?c.rangeCount>0&&(b=c.getRangeAt(0)):(b=_document.createRange(),b.setStart(c.anchorNode,c.anchorOffset),b.setEnd(c.focusNode,c.focusOffset),b.collapsed!==c.isCollapsed&&(b.setStart(c.focusNode,c.focusOffset),b.setEnd(c.anchorNode,c.anchorOffset))),b)?(d=b.commonAncestorContainer,3===d.nodeType?d.parentNode:d):void 0},setSelectionToElementStart:function(b){if(_document.createRange&&a.getSelection){var c=_document.createRange();c.selectNodeContents(b),c.setStart(b,0),c.setEnd(b,0);var d=a.getSelection();d.removeAllRanges(),d.addRange(c)}else if(_document.selection&&_document.body.createTextRange){var e=_document.body.createTextRange();e.moveToElementText(b),e.collapse(!0),e.moveEnd("character",0),e.moveStart("character",0),e.select()}},setSelectionToElementEnd:function(b){if(_document.createRange&&a.getSelection){var c=_document.createRange();c.selectNodeContents(b),c.collapse(!1);var d=a.getSelection();d.removeAllRanges(),d.addRange(c)}else if(_document.selection&&_document.body.createTextRange){var e=_document.body.createTextRange();e.moveToElementText(b),e.collapse(!1),e.select()}}}}])}()}({},function(){return this}());
!function(a,b){b["true"]=a,function(a,b){"use strict";function c(){this.$get=["$$sanitizeUri",function(a){return function(b){var c=[];return f(b,k(c,function(b,c){return!/^unsafe/.test(a(b,c))})),c.join("")}}]}function d(a){var c=[],d=k(c,b.noop);return d.chars(a),c.join("")}function e(a){var b,c={},d=a.split(",");for(b=0;b<d.length;b++)c[d[b]]=!0;return c}function f(a,c){function d(a,d,f,h){if(d=b.lowercase(d),A[d])for(;j.last()&&B[j.last()];)e("",j.last());z[d]&&j.last()==d&&e("",d),h=w[d]||!!h,h||j.push(d);var i={};f.replace(o,function(a,b,c,d,e){var f=c||d||e||"";i[b]=g(f)}),c.start&&c.start(d,i,h)}function e(a,d){var e,f=0;if(d=b.lowercase(d))for(f=j.length-1;f>=0&&j[f]!=d;f--);if(f>=0){for(e=j.length-1;e>=f;e--)c.end&&c.end(j[e]);j.length=f}}var f,h,i,j=[],k=a;for(j.last=function(){return j[j.length-1]};a;){if(h=!0,j.last()&&C[j.last()])a=a.replace(new RegExp("(.*)<\\s*\\/\\s*"+j.last()+"[^>]*>","i"),function(a,b){return b=b.replace(r,"$1").replace(t,"$1"),c.chars&&c.chars(g(b)),""}),e("",j.last());else if(0===a.indexOf("<!--")?(f=a.indexOf("--",4),f>=0&&a.lastIndexOf("-->",f)===f&&(c.comment&&c.comment(a.substring(4,f)),a=a.substring(f+3),h=!1)):s.test(a)?(i=a.match(s),i&&(a=a.replace(i[0],""),h=!1)):q.test(a)?(i=a.match(n),i&&(a=a.substring(i[0].length),i[0].replace(n,e),h=!1)):p.test(a)&&(i=a.match(m),i&&(a=a.substring(i[0].length),i[0].replace(m,d),h=!1)),h){f=a.indexOf("<");var u=0>f?a:a.substring(0,f);a=0>f?"":a.substring(f),c.chars&&c.chars(g(u))}if(a==k)throw l("badparse","The sanitizer was unable to parse the following block of html: {0}",a);k=a}e()}function g(a){if(!a)return"";var b=H.exec(a),c=b[1],d=b[3],e=b[2];return e&&(G.innerHTML=e.replace(/</g,"&lt;"),e="textContent"in G?G.textContent:G.innerText),c+e+d}function h(a){return a.replace(/&/g,"&amp;").replace(u,function(a){var b=a.charCodeAt(0),c=a.charCodeAt(1);return"&#"+(1024*(b-55296)+(c-56320)+65536)+";"}).replace(v,function(a){var b=a.charCodeAt(0);return 159>=b||173==b||b>=1536&&1540>=b||1807==b||6068==b||6069==b||b>=8204&&8207>=b||b>=8232&&8239>=b||b>=8288&&8303>=b||65279==b||b>=65520&&65535>=b?"&#"+b+";":a}).replace(/</g,"&lt;").replace(/>/g,"&gt;")}function i(a){var c="",d=a.split(";");return b.forEach(d,function(a){var d=a.split(":");if(2==d.length){var e=I(b.lowercase(d[0])),a=I(b.lowercase(d[1]));("color"===e&&(a.match(/^rgb\([0-9%,\. ]*\)$/i)||a.match(/^rgba\([0-9%,\. ]*\)$/i)||a.match(/^hsl\([0-9%,\. ]*\)$/i)||a.match(/^hsla\([0-9%,\. ]*\)$/i)||a.match(/^#[0-9a-f]{3,6}$/i)||a.match(/^[a-z]*$/i))||"text-align"===e&&("left"===a||"right"===a||"center"===a||"justify"===a)||"float"===e&&("left"===a||"right"===a||"none"===a)||("width"===e||"height"===e)&&a.match(/[0-9\.]*(px|em|rem|%)/))&&(c+=e+": "+a+";")}}),c}function j(a,b,c,d){return"img"===a&&b["ta-insert-video"]&&("ta-insert-video"===c||"allowfullscreen"===c||"frameborder"===c||"contenteditble"===c&&"false"===d)?!0:!1}function k(a,c){var d=!1,e=b.bind(a,a.push);return{start:function(a,f,g){a=b.lowercase(a),!d&&C[a]&&(d=a),d||D[a]!==!0||(e("<"),e(a),b.forEach(f,function(d,g){var k=b.lowercase(g),l="img"===a&&"src"===k||"background"===k;("style"===k&&""!==(d=i(d))||j(a,f,k,d)||F[k]===!0&&(E[k]!==!0||c(d,l)))&&(e(" "),e(g),e('="'),e(h(d)),e('"'))}),e(g?"/>":">"))},end:function(a){a=b.lowercase(a),d||D[a]!==!0||(e("</"),e(a),e(">")),a==d&&(d=!1)},chars:function(a){d||e(h(a))}}}var l=b.$$minErr("$sanitize"),m=/^<\s*([\w:-]+)((?:\s+[\w:-]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)\s*>/,n=/^<\s*\/\s*([\w:-]+)[^>]*>/,o=/([\w:-]+)(?:\s*=\s*(?:(?:"((?:[^"])*)")|(?:'((?:[^'])*)')|([^>\s]+)))?/g,p=/^</,q=/^<\s*\//,r=/<!--(.*?)-->/g,s=/<!DOCTYPE([^>]*?)>/i,t=/<!\[CDATA\[(.*?)]]>/g,u=/[\uD800-\uDBFF][\uDC00-\uDFFF]/g,v=/([^\#-~| |!])/g,w=e("area,br,col,hr,img,wbr"),x=e("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),y=e("rp,rt"),z=b.extend({},y,x),A=b.extend({},x,e("address,article,aside,blockquote,caption,center,del,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,map,menu,nav,ol,pre,script,section,table,ul")),B=b.extend({},y,e("a,abbr,acronym,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,q,ruby,rp,rt,s,samp,small,span,strike,strong,sub,sup,time,tt,u,var")),C=e("script,style"),D=b.extend({},w,A,B,z),E=e("background,cite,href,longdesc,src,usemap"),F=b.extend({},E,e("abbr,align,alt,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,coords,dir,face,headers,height,hreflang,hspace,ismap,lang,language,nohref,nowrap,rel,rev,rows,rowspan,rules,scope,scrolling,shape,size,span,start,summary,target,title,type,valign,value,vspace,width")),G=document.createElement("pre"),H=/^(\s*)([\s\S]*?)(\s*)$/,I=function(){return String.prototype.trim?function(a){return b.isString(a)?a.trim():a}:function(a){return b.isString(a)?a.replace(/^\s\s*/,"").replace(/\s\s*$/,""):a}}();b.module("ngSanitize",[]).provider("$sanitize",c),b.module("ngSanitize").filter("linky",["$sanitize",function(a){var c=/((ftp|https?):\/\/|(mailto:)?[A-Za-z0-9._%+-]+@)\S*[^\s.;,(){}<>]/,e=/^mailto:/;return function(f,g){function h(a){a&&n.push(d(a))}function i(a,c){n.push("<a "),b.isDefined(g)&&(n.push('target="'),n.push(g),n.push('" ')),n.push('href="'),n.push(a),n.push('">'),h(c),n.push("</a>")}if(!f)return f;for(var j,k,l,m=f,n=[];j=m.match(c);)k=j[0],j[2]==j[3]&&(k="mailto:"+k),l=j.index,h(m.substr(0,l)),i(k,j[0].replace(e,"")),m=m.substring(l+j[0].length);return h(m),a(n.join(""))}}])}(window,window.angular)}({},function(){return this}());
(function() {
  var documentStatusId;

  documentStatusId = setInterval(function() {
    var dependencies, e;
    if (document.readyState === 'complete') {
      apollo.addDom();
      apollo.getDefaultDom();
      if (window.apDependencies == null) {
        window.apDependencies = [];
      }
      dependencies = _.unique(window.apDependencies.concat(['ui.router', 'ui.bootstrap', 'textAngular', 'ngResource', 'ngCookies', 'angularPayments']));
      try {
        apollo.rootInit(dependencies);
        console.log("Starting Apollo CAAS!");
      } catch (_error) {
        e = _error;
        console.log(e);
        console.log('Initialization Aborted');
      }
      return clearInterval(documentStatusId);
    }
  }, 50);

}).call(this);

(function() {
  window.ap_base_uri = 'http://localhost:3000';

  window.s3_base_uri = 'https://s3.amazonaws.com/apollo-caas';

  Stripe.setPublishableKey('pk_test_4Tw8iV5onKraKG9SZJjrdS4Z');

}).call(this);

(function() {
  var Apollo;

  Apollo = (function() {
    function Apollo() {}

    Apollo.prototype.addDom = function() {
      var center, container, footer, login, textNode;
      Element.prototype.prependChild = function(child) {
        this.insertBefore(child, this.firstChild);
      };
      container = document.createElement('div');
      container.setAttribute('style', 'width: 100%');
      container.setAttribute('ui-view', 'container');
      document.getElementsByTagName('body')[0].prependChild(container);
      center = document.createElement('center');
      login = document.createElement('a');
      login.setAttribute('class', 'ap-login-link');
      login.setAttribute('ng-controller', 'CMSEditorLoginCtrl');
      login.setAttribute('ng-show', 'showAdmin');
      login.setAttribute('ui-sref', 'container.view.modal.login');
      textNode = document.createTextNode('Admin Login');
      login.appendChild(textNode);
      center.appendChild(login);
      footer = document.getElementsByTagName('footer');
      if (footer.length > 0) {
        footer[footer.length - 1].appendChild(center);
      } else {
        document.getElementsByTagName('body')[0].appendChild(center);
      }
    };

    Apollo.prototype.getDefaultDom = function() {
      var apBlocks, block, _i, _len, _results;
      window.apBlocks = {};
      apBlocks = document.querySelectorAll('[ap-block]');
      _results = [];
      for (_i = 0, _len = apBlocks.length; _i < _len; _i++) {
        block = apBlocks[_i];
        if ((block.attributes != null) && (block.attributes['block-id'] != null)) {
          _results.push(window.apBlocks[block.attributes['block-id'].value] = block.innerHTML);
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    Apollo.prototype.rootInit = function(dependencies) {
      var app;
      app = angular.module('apollo', dependencies);
      this.dependenciesInit(app);
      angular.bootstrap(document, ['apollo']);
      this.getPage();
    };

    Apollo.prototype.getPage = function() {
      var APGlobalState, UserResource;
      APGlobalState = angular.element(document).injector().get('APGlobalState');
      UserResource = angular.element(document).injector().get('UserResource');
      return UserResource.getPage({
        'success': function(data) {
          var block, blockName, setBlock, _ref, _results;
          _ref = data.blocks;
          _results = [];
          for (blockName in _ref) {
            block = _ref[blockName];
            setBlock = APGlobalState.get('set-block-content');
            _results.push(setBlock[blockName](block.content));
          }
          return _results;
        },
        'fail': function(err) {
          console.log(err.data);
          switch (err.data) {
            case "Page not found":
              APGlobalState.set('createPageOnSignin', true);
              break;
            case "Error: No project found":
              APGlobalState.set('createProjectOnSignin', true);
          }
          APGlobalState = angular.element(document).injector().get('APGlobalState');
          return APGlobalState.set('getPageError', err);
        }
      });
    };

    Apollo.prototype.dependenciesInit = function(app) {
      var callback, key, _ref, _results;
      _ref = window.apInject;
      _results = [];
      for (key in _ref) {
        callback = _ref[key];
        _results.push(callback(app));
      }
      return _results;
    };

    return Apollo;

  })();

  window.apollo = new Apollo();

}).call(this);

(function() {
  var ResourceProvider;

  ResourceProvider = (function() {
    function ResourceProvider($resourceProvider) {
      this.$resourceProvider = $resourceProvider;
      this.$resourceProvider.defaults.stripTrailingSlashes = false;
    }

    return ResourceProvider;

  })();

  if (window.apInject == null) {
    window.apInject = {};
  }

  window.apInject.ResourceProvider = function(app) {
    return app.config(['$resourceProvider', ResourceProvider]);
  };

}).call(this);

(function() {
  var SCEDelegateProvider;

  SCEDelegateProvider = (function() {
    function SCEDelegateProvider($sceDelegateProvider) {
      this.$sceDelegateProvider = $sceDelegateProvider;
      this.$sceDelegateProvider.resourceUrlWhitelist(['self', "" + ap_base_uri + "/**"]);
    }

    return SCEDelegateProvider;

  })();

  if (window.apInject == null) {
    window.apInject = {};
  }

  window.apInject.SCEDelegateProvider = function(app) {
    return app.config(['$sceDelegateProvider', SCEDelegateProvider]);
  };

}).call(this);

(function() {
  var StateProvider;

  StateProvider = (function() {
    function StateProvider($stateProvider, $urlRouterProvider) {
      this.$stateProvider = $stateProvider;
      this.$urlRouterProvider = $urlRouterProvider;
      this.$stateProvider.state('container', {
        url: '/apollo',
        abstract: true,
        views: {
          'container': {
            controller: window.CMSControllers.CMSContainerCtrl,
            templateUrl: "" + window.ap_base_uri + "/ap-views/cms-container.html"
          }
        }
      }).state('container.view', {
        url: '/view',
        views: {
          'toolbar': {
            templateUrl: "" + window.ap_base_uri + "/ap-views/toolbar.html"
          }
        }
      }).state('container.view.modal', {
        url: '',
        abstract: true,
        onEnter: [
          '$modal', '$state', function($modal, $state) {
            return $modal.open({
              template: '<div class="modal-header">\n  <h3>{{page}}</h3>\n</div>\n<div class="modal-body">\n  <div ui-view="modal"></div>\n</div>\n<div class="modal-footer">\n  <button class="btn btn-warning" ng-click="close()">Close</button>\n</div>',
              size: 'lg',
              backdrop: 'static',
              controller: [
                '$scope', '$rootScope', '$modalInstance', function($scope, $rootScope, $modalInstance) {
                  this.$scope = $scope;
                  this.$rootScope = $rootScope;
                  this.$modalInstance = $modalInstance;
                  this.$scope.close = function() {
                    $state.go('container.view');
                    return $modalInstance.close();
                  };
                  return this.$rootScope.$on('$stateChangeSuccess', function(event, toState) {
                    if (toState.name.indexOf('modal') < 0) {
                      event.preventDefault;
                      return $modalInstance.close();
                    }
                  });
                }
              ]
            }).result["finally"](function() {
              return $state.go('container.view');
            });
          }
        ]
      }).state('container.view.modal.signup', {
        url: '/signup',
        views: {
          'modal@': {
            templateUrl: "" + window.ap_base_uri + "/ap-views/signup.html",
            controller: window.CMSControllers.CMSSignupCtrl
          }
        }
      }).state('container.view.modal.login', {
        url: '/login',
        views: {
          'modal@': {
            templateUrl: "" + window.ap_base_uri + "/ap-views/login.html",
            controller: window.CMSControllers.CMSLoginCtrl
          }
        }
      }).state('container.view.modal.forgotPassword', {
        url: '/forgot-password',
        views: {
          'modal@': {
            templateUrl: "" + window.ap_base_uri + "/ap-views/forgot-password.html",
            controller: window.CMSControllers.CMSForgotPasswordCtrl
          }
        }
      }).state('container.view.modal.manageEditors', {
        url: '/manage-editors',
        views: {
          'modal@': {
            templateUrl: "" + window.ap_base_uri + "/ap-views/manage-editors.html",
            controller: window.CMSControllers.CMSPendingCtrl
          }
        }
      }).state('container.view.modal.buildResources', {
        url: '/build-resources',
        views: {
          'modal@': {
            templateUrl: "" + window.ap_base_uri + "/ap-views/build-resources.html",
            controller: window.CMSControllers.CMSBuildResourcesCtrl
          }
        }
      }).state('container.view.modal.account', {
        url: '/account',
        views: {
          'modal@': {
            templateUrl: "" + window.ap_base_uri + "/ap-views/account.html",
            controller: window.CMSControllers.CMSAccountCtrl
          }
        }
      }).state('container.view.modal.account.notices', {
        url: '/notices',
        controller: window.CMSControllers.CMSNoticesCtrl
      }).state('container.view.modal.account.notices.balanceDue', {
        url: '/balance-due',
        views: {
          'modal@': {
            templateUrl: "" + window.ap_base_uri + "/ap-views/account-balance-due.html",
            controller: window.CMSControllers.CMSBalanceDueCtrl
          }
        }
      }).state('container.view.modal.account.notices.balanceOverdue', {
        url: '/balance-overdue',
        views: {
          'modal@': {
            templateUrl: "" + window.ap_base_uri + "/ap-views/account-balance-overdue.html",
            controller: window.CMSControllers.CMSBalanceOverdueCtrl
          }
        }
      }).state('container.view.modal.account.notices.planBuy', {
        url: '/plan/buy',
        views: {
          'modal@': {
            templateUrl: "" + window.ap_base_uri + "/ap-views/account-plan-buy.html",
            controller: window.CMSControllers.CMSPlanBuyCtrl
          }
        }
      }).state('container.view.modal.account.notices.planChange', {
        url: '/plan/change',
        views: {
          'modal@': {
            templateUrl: "" + window.ap_base_uri + "/ap-views/account-plan-change.html",
            controller: window.CMSControllers.CMSPlanChangeCtrl
          }
        }
      }).state('container.view.modal.account.notices.planCancel', {
        url: '/plan/cancel',
        views: {
          'modal@': {
            templateUrl: "" + window.ap_base_uri + "/ap-views/account-plan-cancel.html",
            controller: window.CMSControllers.CMSPlanCancelCtrl
          }
        }
      }).state('container.view.modal.account.notices.cardPay', {
        url: '/card/pay',
        views: {
          'modal@': {
            templateUrl: "" + window.ap_base_uri + "/ap-views/account-card-pay.html",
            controller: window.CMSControllers.CMSCardPayCtrl
          }
        }
      }).state('container.view.modal.account.notices.cardUpdate', {
        url: '/card/update',
        views: {
          'modal@': {
            templateUrl: "" + window.ap_base_uri + "/ap-views/account-card-update.html",
            controller: window.CMSControllers.CMSCardUpdateCtrl
          }
        }
      }).state('container.view.modal.account.notices.freetrialAlmostup', {
        url: '/freetrial/almostup',
        views: {
          'modal@': {
            templateUrl: "" + window.ap_base_uri + "/ap-views/account-freetrial-almostup.html",
            controller: window.CMSControllers.CMSFreetrialCtrl
          }
        }
      }).state('container.view.modal.account.notices.freetrialOver', {
        url: '/freetrial/over',
        views: {
          'modal@': {
            templateUrl: "" + window.ap_base_uri + "/ap-views/account-freetrial-over.html",
            controller: window.CMSControllers.CMSFreetrialCtrl
          }
        }
      }).state('container.view.modal.account.notices.freetrialStarted', {
        url: '/freetrial/started',
        views: {
          'modal@': {
            templateUrl: "" + window.ap_base_uri + "/ap-views/account-freetrial-started.html",
            controller: window.CMSControllers.CMSFreetrialCtrl
          }
        }
      }).state('container.view.modal.account.notices.accessDenied', {
        url: '/access/denied',
        views: {
          'modal@': {
            templateUrl: "" + window.ap_base_uri + "/ap-views/account-access-denied.html"
          }
        }
      }).state('container.view.modal.account.notices.storagelimitApproached', {
        url: '/storagelimit/approached',
        views: {
          'modal@': {
            templateUrl: "" + window.ap_base_uri + "/ap-views/account-storagelimit-approached.html"
          }
        }
      }).state('container.view.modal.account.notices.verify', {
        url: '/verify',
        views: {
          'modal@': {
            templateUrl: "" + window.ap_base_uri + "/ap-views/account-verify.html",
            controller: window.CMSControllers.CMSVerifyCtrl
          }
        }
      });
    }

    return StateProvider;

  })();

  if (window.apInject == null) {
    window.apInject = {};
  }

  window.apInject.StateProvider = function(app) {
    return app.config(['$stateProvider', '$urlRouterProvider', StateProvider]);
  };

}).call(this);

(function() {
  var CMSAccountCtrl;

  CMSAccountCtrl = (function() {
    function CMSAccountCtrl($scope) {
      this.$scope = $scope;
    }

    return CMSAccountCtrl;

  })();

  if (window.apInject == null) {
    window.apInject = {};
  }

  if (window.CMSControllers == null) {
    window.CMSControllers = {};
  }

  window.apInject.CMSAccountCtrl = function(app) {
    return app.controller('CMSAccountCtrl', ['$scope', CMSAccountCtrl]);
  };

  window.CMSControllers.CMSAccountCtrl = CMSAccountCtrl;

}).call(this);

(function() {
  var CMSBalanceOverdueCtrl;

  CMSBalanceOverdueCtrl = (function() {
    function CMSBalanceOverdueCtrl($scope) {
      this.$scope = $scope;
    }

    return CMSBalanceOverdueCtrl;

  })();

  if (window.apInject == null) {
    window.apInject = {};
  }

  if (window.CMSControllers == null) {
    window.CMSControllers = {};
  }

  window.apInject.CMSBalanceOverdueCtrl = function(app) {
    return app.controller('CMSBalanceOverdueCtrl', ['$scope', CMSBalanceOverdueCtrl]);
  };

  window.CMSControllers.CMSBalanceOverdueCtrl = CMSBalanceOverdueCtrl;

}).call(this);

(function() {
  var CMSBalanceDueCtrl;

  CMSBalanceDueCtrl = (function() {
    function CMSBalanceDueCtrl($scope) {
      this.$scope = $scope;
    }

    return CMSBalanceDueCtrl;

  })();

  if (window.apInject == null) {
    window.apInject = {};
  }

  if (window.CMSControllers == null) {
    window.CMSControllers = {};
  }

  window.apInject.CMSBalanceDueCtrl = function(app) {
    return app.controller('CMSBalanceDueCtrl', ['$scope', CMSBalanceDueCtrl]);
  };

  window.CMSControllers.CMSBalanceDueCtrl = CMSBalanceDueCtrl;

}).call(this);

(function() {
  var CMSBuildResourcesCtrl;

  CMSBuildResourcesCtrl = (function() {
    function CMSBuildResourcesCtrl($rootScope, $scope, $state, UserResource, APGlobalState) {
      var alert, createPage, createPageOnSignin, createProject, createProjectOnSignin, err, missingParameter, owner, page, project;
      this.$rootScope = $rootScope;
      this.$scope = $scope;
      this.$state = $state;
      this.UserResource = UserResource;
      this.APGlobalState = APGlobalState;
      owner = this.APGlobalState.get('owner');
      project = this.APGlobalState.get('project');
      page = this.APGlobalState.get('page');
      err = this.APGlobalState.get('getPageError');
      createProject = false;
      missingParameter = false;
      createPage = false;
      createPageOnSignin = this.APGlobalState.get('createPageOnSignin') ? true : false;
      createProjectOnSignin = this.APGlobalState.get('createProjectOnSignin') ? true : false;
      $scope.alerts = [];
      if (owner === void 0) {
        missingParameter = true;
        alert = {
          type: 'danger',
          msg: 'data-owner is missing from &lt;meta ...&gt; you cannot manage content unless you add this attribute. Example: &lt;meta data-owner="some_user_name" ...&gt;'
        };
        $scope.alerts.push(alert);
      }
      if (project === void 0) {
        missingParameter = true;
        alert = {
          type: 'danger',
          msg: 'data-project is missing from &lt;meta ...&gt; you cannot manage content unless you add this attribute. Example: &lt;meta data-project="example_project" ...&gt;'
        };
        $scope.alerts.push(alert);
      }
      if (page === void 0) {
        missingParameter = true;
        alert = {
          type: 'danger',
          msg: 'data-page is missing from &lt;meta ...&gt; you cannot manage content unless you add this attribute. Example: &lt;meta data-page="some_page" ...&gt;'
        };
        $scope.alerts.push(alert);
      }
      if (createPageOnSignin === true && !missingParameter) {
        createPage = true;
        alert = {
          type: 'alert',
          msg: "Do you want to create page " + page + "? You must create a page before managing content."
        };
        $scope.alerts.push(alert);
      }
      if (createProjectOnSignin === true && !missingParameter) {
        createProject = true;
        alert = {
          type: 'alert',
          msg: "Do you want to create project " + project + "? You must create a project before managing content."
        };
        $scope.alerts.push(alert);
      }
      if (!missingParameter && err) {
        alert = {
          type: 'danger',
          msg: "We had a serious error (" + err.status + "): " + err.statusText
        };
        $scope.alerts.push(alert);
      }
      $scope.missingParameter = missingParameter;
      $scope.createProjectBool = createProject;
      $scope.createPageBool = createPage;
      $scope.createProject = function() {
        if (parameterMissing) {
          throw new Error("Cannot create project: meta paramter missing");
        }
        return UserResource.createProject().then((function(_this) {
          return function(value) {
            $rootScope.$broadcast('page-save');
            return $state.go('^.account.notices');
          };
        })(this), function(reason) {});
      };
      $scope.createPage = function() {
        if (bctrl.parameterMissing) {
          throw new Error("Cannot create page: meta parameter missing");
        }
        return UserResource.createPage().then(function(value) {
          $rootScope.$broadcast('page-save');
          return $state.go('^.account.notices');
        }, function(reason) {});
      };
    }

    return CMSBuildResourcesCtrl;

  })();

  if (window.apInject == null) {
    window.apInject = {};
  }

  if (window.CMSControllers == null) {
    window.CMSControllers = {};
  }

  window.apInject.CMSBuildResourcesCtrl = function(app) {
    return app.controller('CMSLoginCtrl', ['$rootScope', '$scope', '$state', 'UserResource', 'APGlobalState', CMSBuildResourcesCtrl]);
  };

  window.CMSControllers.CMSBuildResourcesCtrl = CMSBuildResourcesCtrl;

}).call(this);

(function() {
  var CMSCardPayCtrl;

  CMSCardPayCtrl = (function() {
    function CMSCardPayCtrl($scope, $state, UserResource) {
      this.$scope = $scope;
      this.$state = $state;
      this.UserResource = UserResource;
      $scope.$parent.alert = null;
      $scope.alert = null;
      (function() {
        return UserResource.getOutstandingBills().then(function(value) {
          $scope.outstandingBills = value;
          return $scope.outstandingBills.totalDue = parseFloat(value.totalDue).toFixed(2);
        }, function(reason) {
          return $scope.alert = {
            msg: reason,
            type: 'danger'
          };
        });
      })();
      $scope.payCard = function(status, response) {
        var scope;
        scope = this;
        if (status > 299) {
          return this.alert = {
            msg: 'Invalid information',
            type: 'danger'
          };
        } else {
          return UserResource.payCard(response, this.name, this.email).then(function(value) {
            scope.alert = {
              msg: "You payment of $" + scope.outstandingBills.totalDue + " was successful. A\nconfirmation email has been sent to your account.",
              type: 'success'
            };
            return scope.balancePaid = true;
          }, function(reason) {
            return scope.alert = {
              msg: reason,
              type: 'danger'
            };
          });
        }
      };
    }

    return CMSCardPayCtrl;

  })();

  if (window.apInject == null) {
    window.apInject = {};
  }

  if (window.CMSControllers == null) {
    window.CMSControllers = {};
  }

  window.apInject.CMSCardPayCtrl = function(app) {
    return app.controller('CMSCardPayCtrl', ['$scope', '$state', 'UserResource', CMSCardPayCtrl]);
  };

  window.CMSControllers.CMSCardPayCtrl = CMSCardPayCtrl;

}).call(this);

(function() {
  var CMSCardUpdateCtrl;

  CMSCardUpdateCtrl = (function() {
    function CMSCardUpdateCtrl($scope, $state, UserResource) {
      this.$scope = $scope;
      this.$state = $state;
      this.UserResource = UserResource;
      $scope.$parent.alert = null;
      $scope.alert = null;
      $scope.updateCard = function(status, response) {
        var scope;
        scope = this;
        if (status > 299) {
          return this.alert = {
            msg: 'Invalid information',
            type: 'danger'
          };
        } else {
          return UserResource.updateCard(response, this.name, this.email).then(function(value) {
            scope.alert = {
              msg: 'Card update success!',
              type: 'success'
            };
            if ($state.includes('**.notices.**')) {
              scope.alert.msg += ' You must however still make a one time payment until automatic billing uses your updated card.';
              scope.$parent.alert = scope.alert;
              $state.go('^');
              return scope.$parent.notices();
            }
          }, function(reason) {
            return scope.alert = {
              msg: reason,
              type: 'danger'
            };
          });
        }
      };
    }

    return CMSCardUpdateCtrl;

  })();

  if (window.apInject == null) {
    window.apInject = {};
  }

  if (window.CMSControllers == null) {
    window.CMSControllers = {};
  }

  window.apInject.CMSCardUpdateCtrl = function(app) {
    return app.controller('CMSCardUpdateCtrl', ['$scope', '$state', 'UserResource', CMSCardUpdateCtrl]);
  };

  window.CMSControllers.CMSCardUpdateCtrl = CMSCardUpdateCtrl;

}).call(this);

(function() {
  var CMSContainerCtrl;

  CMSContainerCtrl = (function() {
    function CMSContainerCtrl($scope, CMSContainerMQ, APGlobalState) {
      this.$scope = $scope;
      this.CMSContainerMQ = CMSContainerMQ;
      this.APGlobalState = APGlobalState;
    }

    return CMSContainerCtrl;

  })();

  if (window.apInject == null) {
    window.apInject = {};
  }

  if (window.CMSControllers == null) {
    window.CMSControllers = {};
  }

  window.apInject.CMSContainerCtrl = function(app) {
    return app.controller('CMSContainerCtrl', ['$scope', 'CMSContainerMQ', 'APGlobalState', CMSContainerCtrl]);
  };

  window.CMSControllers.CMSContainerCtrl = CMSContainerCtrl;

}).call(this);

(function() {
  var CMSEditorLoginCtrl;

  CMSEditorLoginCtrl = (function() {
    function CMSEditorLoginCtrl($rootScope, $scope, $location, CMSContainerMQ) {
      this.$rootScope = $rootScope;
      this.$scope = $scope;
      this.$location = $location;
      this.$scope.showAdmin = true;
      this.$scope.$on('CMSEditorLoginCtrl-showAdmin', function(event, value) {
        return this.showAdmin = value;
      });
      this.$scope.login = function() {
        return CMSContainerMQ.get().openModal();
      };
    }

    return CMSEditorLoginCtrl;

  })();

  if (window.apInject == null) {
    window.apInject = {};
  }

  if (window.CMSControllers == null) {
    window.CMSControllers = {};
  }

  window.apInject.CMSEditorLoginCtrl = function(app) {
    return app.controller('CMSEditorLoginCtrl', ['$rootScope', '$scope', '$location', 'CMSContainerMQ', CMSEditorLoginCtrl]);
  };

  window.CMSControllers.CMSEditorLoginCtrl = CMSEditorLoginCtrl;

}).call(this);

(function() {
  var CMSForgotPasswordCtrl;

  CMSForgotPasswordCtrl = (function() {
    function CMSForgotPasswordCtrl($scope, $location) {
      this.$scope = $scope;
      this.$location = $location;
    }

    return CMSForgotPasswordCtrl;

  })();

  if (window.apInject == null) {
    window.apInject = {};
  }

  if (window.CMSControllers == null) {
    window.CMSControllers = {};
  }

  window.apInject.CMSForgotPasswordCtrl = function(app) {
    return app.controller('CMSForgotPasswordCtrl', ['$scope', '$location', CMSForgotPasswordCtrl]);
  };

  window.CMSControllers.CMSForgotPasswordCtrl = CMSForgotPasswordCtrl;

}).call(this);

(function() {
  var CMSLoginCtrl;

  CMSLoginCtrl = (function() {
    function CMSLoginCtrl($scope, $state, UserResource, APGlobalState) {
      this.$scope = $scope;
      this.$state = $state;
      this.UserResource = UserResource;
      this.APGlobalState = APGlobalState;
      $scope.$parent.page = "Login";
      $scope.login = (function(_this) {
        return function(username, password) {
          return _this.login(username, password);
        };
      })(this);
      $scope.alert = {};
    }

    CMSLoginCtrl.prototype.login = function(username, password) {
      var ctrl;
      ctrl = this;
      this.UserResource.login(username, password).then((function(_this) {
        return function(u) {
          var owner, page, project;
          _this.APGlobalState.set('cookie', u.cookie.split(';').shift());
          if (!u.success) {
            return _this.$scope.alert.error = u.errors[0];
          } else {
            owner = _this.APGlobalState.get('owner');
            project = _this.APGlobalState.get('project');
            page = _this.APGlobalState.get('page');
            if (owner === void 0 || project === void 0 || page === void 0) {
              ctrl.$state.go("^.buildResources");
              return;
            } else if (_this.APGlobalState.get('createPageOnSignin') || _this.APGlobalState.get('createProjectOnSignin')) {
              ctrl.$state.go("^.buildResources");
              return;
            } else if (_this.APGlobalState.get('getPageError') != null) {
              ctrl.$state.go("^.buildResources");
              return;
            }
            return ctrl.$state.go("^.account.notices");
          }
        };
      })(this), function(err) {
        return console.log(err);
      });
    };

    return CMSLoginCtrl;

  })();

  if (window.apInject == null) {
    window.apInject = {};
  }

  if (window.CMSControllers == null) {
    window.CMSControllers = {};
  }

  window.apInject.CMSLoginCtrl = function(app) {
    return app.controller('CMSLoginCtrl', ['$scope', '$state', 'UserResource', 'APGlobalState', CMSLoginCtrl]);
  };

  window.CMSControllers.CMSLoginCtrl = CMSLoginCtrl;

}).call(this);

(function() {
  var CMSNoticesCtrl;

  CMSNoticesCtrl = (function() {
    function CMSNoticesCtrl($scope, $rootScope, $state, $window, UserResource, APGlobalState) {
      var ctrl;
      this.$scope = $scope;
      this.$rootScope = $rootScope;
      this.$state = $state;
      this.$window = $window;
      this.UserResource = UserResource;
      this.APGlobalState = APGlobalState;
      ctrl = this;
      $scope.eventFnxs = {};
      $scope.data = {};
      $scope.notices = function(passthrough) {
        return ctrl.notices(passthrough);
      };
      $scope.verify = function(value, notices) {
        var scope;
        scope = this;
        this.eventFnxs['verify'] = function() {
          return scope.notices(true).then(function(notices) {
            if (!notices['verify']) {
              return ctrl["continue"](notices);
            }
          });
        };
        this.$parent.page = 'Verify';
        return $state.go('container.view.modal.account.notices.verify');
      };
      $scope.accessDenied = function(value, notices) {
        this.$parent.page = 'Access Denied';
        return $state.go('container.view.modal.account.notices.accessDenied');
      };
      $scope.freetrialAlmostDone = function(value, notices) {
        var scope;
        scope = this;
        this.noticeMessage = value.message;
        this.eventFnxs['continue'] = function() {
          scope.skipNotice.push('freeAlmostDone');
          return ctrl["continue"](notices);
        };
        this.$parent.page = 'Free Trial Almost Done';
        this.data.freetrialAlmostDone = true;
        return $state.go('container.view.modal.account.notices.freetrialAlmostup');
      };
      $scope.freetrialDone = function(value, notices) {
        var scope;
        scope = this;
        this.noticeMessage = value.message;
        this.eventFnxs['continue'] = function() {
          return scope.notices(true).then(function(notices) {
            if (!notices['freetrialDone']) {
              return ctrl["continue"](notices);
            }
          });
        };
        this.$parent.page = 'Free Trial Over';
        this.data.freetrialDone = true;
        return $state.go('container.view.modal.account.notices.freetrialOver');
      };
      $scope.overdue = function(value, notices) {
        var scope;
        scope = this;
        this.noticeMessage = value.message;
        this.eventFnxs['continue'] = function() {
          return scope.notices(true).then(function(notices) {
            if (!notices['overdue']) {
              return ctrl["continue"](notices);
            }
          });
        };
        this.$parent.page = 'Balance Overdue';
        this.data.overdue = true;
        return $state.go('container.view.modal.account.notices.balanceOverdue');
      };
      $scope.due = function(value, notices) {
        var scope;
        scope = this;
        this.noticeMessage = value.message;
        this.eventFnxs['continue'] = function() {
          scope.skipNotice.push('due');
          return ctrl["continue"](notices);
        };
        this.$parent.page = 'Balance Due';
        this.data.due = true;
        return $state.go('container.view.modal.account.notices.balanceDue');
      };
      (function() {
        return $scope.notices();
      })();
    }

    CMSNoticesCtrl.prototype["continue"] = function(notices) {
      var keys, value;
      keys = Object.keys(notices);
      if (keys.length > 0) {
        if (_.contains(this.$scope.skipNotice, keys[0])) {
          delete notices[keys[0]];
          this["continue"](notices);
          return;
        }
        value = notices[keys[0]];
        delete notices[keys[0]];
        return this.$scope[keys[0]](value, notices);
      } else {
        return this.showToolbar();
      }
    };

    CMSNoticesCtrl.prototype.notices = function(passthrough) {
      var ctrl, defer;
      if (passthrough == null) {
        passthrough = false;
      }
      defer = Q.defer();
      ctrl = this;
      this.UserResource.getNotices().then(function(data) {
        var notices;
        notices = data.notices;
        if (!passthrough) {
          return ctrl["continue"](notices);
        } else {
          return defer.resolve(notices);
        }
      }, function(error) {
        return console.log(error);
      });
      return defer.promise;
    };

    CMSNoticesCtrl.prototype.showToolbar = function() {
      this.$scope.$parent.$parent.$parent.$parent['edit_mode'] = true;
      this.$rootScope.$broadcast('edit_mode', true);
      this.APGlobalState.set('edit_mode', true);
      this.$window.scrollTo(0, 0);
      return this.$state.go('container.view');
    };

    return CMSNoticesCtrl;

  })();

  if (window.apInject == null) {
    window.apInject = {};
  }

  if (window.CMSControllers == null) {
    window.CMSControllers = {};
  }

  window.apInject.CMSNoticesCtrl = function(app) {
    return app.controller('CMSNoticesCtrl', ['$scope', '$rootScope', '$state', '$window', 'UserResource', 'APGlobalState', CMSNoticesCtrl]);
  };

  window.CMSControllers.CMSNoticesCtrl = CMSNoticesCtrl;

}).call(this);

(function() {
  var CMSPendingCtrl;

  CMSPendingCtrl = (function() {
    function CMSPendingCtrl($scope) {
      this.$scope = $scope;
    }

    return CMSPendingCtrl;

  })();

  if (window.apInject == null) {
    window.apInject = {};
  }

  if (window.CMSControllers == null) {
    window.CMSControllers = {};
  }

  window.apInject.CMSPendingCtrl = function(app) {
    return app.controller('CMSPendingCtrl', ['$scope', CMSPendingCtrl]);
  };

  window.CMSControllers.CMSPendingCtrl = CMSPendingCtrl;

}).call(this);

(function() {
  var CMSPlanBuyCtrl;

  CMSPlanBuyCtrl = (function() {
    function CMSPlanBuyCtrl($scope, $state, $http, UserResource) {
      this.$scope = $scope;
      this.$state = $state;
      this.$http = $http;
      this.UserResource = UserResource;
      (function() {
        return $http({
          method: 'GET',
          url: "" + window.ap_base_uri + "/caas/billing-plans"
        }).success(function(data, status, headers, config) {
          var plan, _i, _len, _results;
          _results = [];
          for (_i = 0, _len = data.length; _i < _len; _i++) {
            plan = data[_i];
            _results.push($scope.billingPlans[plan.name] = plan);
          }
          return _results;
        });
      })();
      this.$scope.buyPlan = function(status, response) {
        var scope;
        scope = this;
        if (status > 299) {
          return this.alert.buyPlan = {
            msg: 'Invalid information',
            type: 'danger'
          };
        } else {
          return UserResource.buyPlan(response, this.buyPlan.plan, this.buyPlan.term, this.name, this.email).then(function(value) {
            scope.alert = {
              msg: "Thank you! You have successfully registered. A confirmation of your plan purchased has been emailed to your account.",
              type: 'success'
            };
            if ($state.is('container.view.modal.account.notices')) {
              scope.$parent.alert = scope.alert;
              return $state.go('^');
            }
          }, function(reason) {
            return scope.alert = {
              msg: reason,
              type: 'danger'
            };
          });
        }
      };
    }

    return CMSPlanBuyCtrl;

  })();

  if (window.apInject == null) {
    window.apInject = {};
  }

  if (window.CMSControllers == null) {
    window.CMSControllers = {};
  }

  window.apInject.CMSPlanBuyCtrl = function(app) {
    return app.controller('CMSPlanBuyCtrl', ['$scope', '$state', '$http', 'UserResource', CMSPlanBuyCtrl]);
  };

  window.CMSControllers.CMSPlanBuyCtrl = CMSPlanBuyCtrl;

}).call(this);

(function() {
  var CMSPlanCancelCtrl;

  CMSPlanCancelCtrl = (function() {
    function CMSPlanCancelCtrl($scope) {
      this.$scope = $scope;
      this.$scope.cancelPlan = function() {
        var scope;
        scope = this;
        return UserResource.cancelPlan().then(function(value) {
          return scope.alert = {
            msg: value.message,
            type: 'success'
          };
        }, function(reason) {
          return scope.alert = {
            msg: reason,
            type: 'danger'
          };
        });
      };
    }

    return CMSPlanCancelCtrl;

  })();

  if (window.apInject == null) {
    window.apInject = {};
  }

  if (window.CMSControllers == null) {
    window.CMSControllers = {};
  }

  window.apInject.CMSPlanCancelCtrl = function(app) {
    return app.controller('CMSPlanCancelCtrl', ['$scope', 'UserResource', CMSPlanCancelCtrl]);
  };

  window.CMSControllers.CMSPlanCancelCtrl = CMSPlanCancelCtrl;

}).call(this);

(function() {
  var CMSPlanChangeCtrl;

  CMSPlanChangeCtrl = (function() {
    function CMSPlanChangeCtrl($scope, $state, UserResource) {
      this.$scope = $scope;
      this.$state = $state;
      this.UserResource = UserResource;
      (function() {
        return UserResource.getAllowedBillingPlans().then(function(value) {
          return $scope.allowedBillingPlans = value;
        }, function(reason) {
          return alert.msg;
        });
      })();
      $scope.setPlan = function(plan, term) {
        this.buyPlan.plan = plan;
        return this.buyPlan.term = term;
      };
      $scope.changePlan = function() {
        var scope;
        scope = this;
        return UserResource.changePlan(this.buyPlan.plan, this.buyPlan.term).then(function(value) {
          scope.alert = {
            msg: value,
            type: 'success'
          };
          if ($state.is('container.view.modal.account.notices')) {
            scope.$parent.alert = scope.alert;
            return $state.go('^');
          }
        }, function(reason) {
          return scope.alert = {
            msg: reason,
            type: 'danger'
          };
        });
      };
    }

    return CMSPlanChangeCtrl;

  })();

  if (window.apInject == null) {
    window.apInject = {};
  }

  if (window.CMSControllers == null) {
    window.CMSControllers = {};
  }

  window.apInject.CMSPlanChangeCtrl = function(app) {
    return app.controller('CMSPlanChangeCtrl', ['$scope', '$state', 'UserResource', CMSPlanChangeCtrl]);
  };

  window.CMSControllers.CMSPlanChangeCtrl = CMSPlanChangeCtrl;

}).call(this);

(function() {
  var CMSSignupCtrl;

  CMSSignupCtrl = (function() {
    function CMSSignupCtrl($scope, $rootScope, UserResource, APGlobalState) {
      this.$scope = $scope;
      this.$rootScope = $rootScope;
      this.APGlobalState = APGlobalState;
      $scope.signup = function(email, username, password) {
        return UserResource.signup(email, username, password).then((function(_this) {
          return function(u) {
            APGlobalState.set('cookie', u.cookie.split(';').shift());
            _this.alert = {};
            if (!u.success) {
              _this.alert.username = u.errfor.username;
              _this.alert.email = u.errfor.email;
              return _this.alert.password = u.errfor.password;
            } else {
              return $state.go('^.account.notices');
            }
          };
        })(this), function(err) {
          return console.log(err);
        });
      };
    }

    return CMSSignupCtrl;

  })();

  if (window.apInject == null) {
    window.apInject = {};
  }

  if (window.CMSControllers == null) {
    window.CMSControllers = {};
  }

  window.apInject.CMSSignupCtrl = function(app) {
    return app.controller('CMSSignupCtrl', ['$scope', '$rootScope', '$state', 'UserResource', 'APGlobalState', CMSSignupCtrl]);
  };

  window.CMSControllers.CMSSignupCtrl = CMSSignupCtrl;

}).call(this);

(function() {
  var CMSVerifyCtrl;

  CMSVerifyCtrl = (function() {
    function CMSVerifyCtrl($scope) {
      this.$scope = $scope;
    }

    return CMSVerifyCtrl;

  })();

  if (window.apInject == null) {
    window.apInject = {};
  }

  if (window.CMSControllers == null) {
    window.CMSControllers = {};
  }

  window.apInject.CMSVerifyCtrl = function(app) {
    return app.controller('CMSVerifyCtrl', ['$scope', CMSVerifyCtrl]);
  };

  window.CMSControllers.CMSVerifyCtrl = CMSVerifyCtrl;

}).call(this);

(function() {
  var APCtrlLoad,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  if (window.apInject == null) {
    window.apInject = {};
  }

  APCtrlLoad = (function() {
    function APCtrlLoad() {
      this.get = __bind(this.get, this);
      this.add = __bind(this.add, this);
      this.set = __bind(this.set, this);
      this.exec = __bind(this.exec, this);
      this.state = {};
    }

    APCtrlLoad.prototype.exec = function(ctrlName, ctrl) {
      var fxns;
      fxns = this.state[ctrlName];
      if (fxns instanceof Array) {
        while (fxns.length > 0) {
          ctrl[fxns[0]]();
          fxns = fxns.slice(1);
        }
      } else if (fxns != null) {
        ctrl[fxns]();
        fxns = null;
      }
      return delete this.state[ctrlName];
    };

    APCtrlLoad.prototype.set = function(key, value) {
      return this.state[key] = value;
    };

    APCtrlLoad.prototype.add = function(key, value) {
      if (this.state[key] != null) {
        if (this.state[key] instanceof Array) {
          return this.state[key].push(value);
        } else {
          throw new Error('key is not an array!');
        }
      } else {
        this.state[key] = [];
        return this.state[key].push(value);
      }
    };

    APCtrlLoad.prototype.get = function(key) {
      return this.state[key];
    };

    return APCtrlLoad;

  })();

  window.apInject.APCtrlLoad = function(app) {
    return app.service('APCtrlLoad', [APCtrlLoad]);
  };

}).call(this);

(function() {
  var APGlobalState,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  if (window.apInject == null) {
    window.apInject = {};
  }

  APGlobalState = (function() {
    function APGlobalState() {
      this.get = __bind(this.get, this);
      this.set = __bind(this.set, this);
      var meta, value, _i, _len;
      this.state = {};
      meta = document.getElementsByTagName('meta');
      for (_i = 0, _len = meta.length; _i < _len; _i++) {
        value = meta[_i];
        this.state['owner'] = value.getAttribute('data-owner') != null ? value.getAttribute('data-owner') : void 0;
        this.state['project'] = value.getAttribute('data-project') != null ? value.getAttribute('data-project') : void 0;
        this.state['page'] = value.getAttribute('data-page') != null ? value.getAttribute('data-page') : void 0;
      }
    }

    APGlobalState.prototype.set = function(key, value) {
      this.state[key] = value;
    };

    APGlobalState.prototype.get = function(key) {
      return this.state[key];
    };

    return APGlobalState;

  })();

  window.apInject.APGlobalState = function(app) {
    return app.service('APGlobalState', [APGlobalState]);
  };

}).call(this);

(function() {
  var CMSContainerMQ,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  CMSContainerMQ = (function() {
    function CMSContainerMQ() {
      this.get = __bind(this.get, this);
      this.set = __bind(this.set, this);
    }

    CMSContainerMQ.prototype.set = function(scope) {
      this.$scope = scope;
    };

    CMSContainerMQ.prototype.get = function() {
      return this.$scope;
    };

    return CMSContainerMQ;

  })();

  if (window.apInject == null) {
    window.apInject = {};
  }

  window.apInject.CMSContainerMQ = function(app) {
    return app.service('CMSContainerMQ', [CMSContainerMQ]);
  };

}).call(this);

(function() {
  var UserResource,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  if (window.apInject == null) {
    window.apInject = {};
  }

  UserResource = (function() {
    function UserResource($resource, $cookies, APGlobalState) {
      this.$resource = $resource;
      this.$cookies = $cookies;
      this.APGlobalState = APGlobalState;
      this.deleteBlock = __bind(this.deleteBlock, this);
      this.putBlock = __bind(this.putBlock, this);
      this.getBlock = __bind(this.getBlock, this);
      this.createPage = __bind(this.createPage, this);
      this.getPage = __bind(this.getPage, this);
      this.createProject = __bind(this.createProject, this);
      this.forgot = __bind(this.forgot, this);
      this.logout = __bind(this.logout, this);
      this.login = __bind(this.login, this);
      this.signup = __bind(this.signup, this);
      this.signupRes = this.$resource("" + window.ap_base_uri + "/signup/");
      this.loginRes = this.$resource("" + window.ap_base_uri + "/login/");
      this.forgotRes = this.$resource("" + window.ap_base_uri + "/login/forgot/");
      this.logoutRes = this.$resource("" + window.ap_base_uri + "/logout/");
      this.projectRes = this.$resource("" + window.ap_base_uri + "/caas/owner/:owner/project/:project");
      this.pageRes = this.$resource("" + window.ap_base_uri + "/caas/owner/:owner/project/:project/page/:page");
      this.blockRes = this.$resource("" + window.ap_base_uri + "/caas/owner/:owner/project/:project/page/:page/block/:block");
      this.cardRes = this.$resource("" + window.ap_base_uri + "/caas/account/card/:action");
      this.planRes = this.$resource("" + window.ap_base_uri + "/caas/account/plan/:action");
      this.accountRes = this.$resource("" + window.ap_base_uri + "/caas/account/:action");
      this.owner = this.APGlobalState.get('owner');
      this.project = this.APGlobalState.get('project');
      this.page = this.APGlobalState.get('page');
    }

    UserResource.prototype.signup = function(email, username, password) {
      var signupRes;
      signupRes = new this.signupRes();
      signupRes.email = email;
      signupRes.username = username;
      signupRes.password = password;
      return signupRes.$save();
    };

    UserResource.prototype.login = function(username, password) {
      var loginRes;
      loginRes = new this.loginRes();
      loginRes.username = username;
      loginRes.password = password;
      return loginRes.$save();
    };

    UserResource.prototype.logout = function() {
      var logoutRes;
      return logoutRes = this.logoutRes.get();
    };

    UserResource.prototype.forgot = function(email) {
      var forgotRes;
      forgotRes = new this.forgotRes();
      forgotRes.email = email;
      return forgotRes.$save();
    };

    UserResource.prototype.createProject = function(blocks) {
      var projectRes;
      projectRes = new this.projectRes();
      projectRes.apCookie = this.APGlobalState.get('cookie');
      projectRes.name = this.project;
      projectRes.pages = {};
      projectRes.pages[this.page] = {
        blocks: {}
      };
      return projectRes.$save({
        'owner': this.owner,
        'project': this.project
      });
    };

    UserResource.prototype.getPage = function(overload) {
      return this.pageRes.get({
        'owner': this.owner,
        'project': this.project,
        'page': this.page
      }, overload.success, overload.fail);
    };

    UserResource.prototype.createPage = function() {
      var pageRes;
      pageRes = new this.pageRes();
      pageRes.apCookie = this.APGlobalState.get('cookie');
      pageRes[this.page] = {
        blocks: {}
      };
      return pageRes.$save({
        'owner': this.owner,
        'project': this.project,
        'page': this.page
      });
    };

    UserResource.prototype.getBlock = function(block, overload) {
      return this.blockRes.get({
        'owner': this.owner,
        'project': this.project,
        'page': this.page,
        'block': block
      }, overload.success, overload.fail);
    };

    UserResource.prototype.putBlock = function(blockName, content) {
      var blockRes;
      blockRes = new this.blockRes;
      blockRes.apCookie = this.APGlobalState.get('cookie');
      blockRes[blockName] = {
        content: content
      };
      return blockRes.$save({
        'owner': this.owner,
        'project': this.project,
        'page': this.page,
        'block': blockName
      });
    };

    UserResource.prototype.deleteBlock = function(block) {
      var blockRes;
      blockRes = new this.blockRes;
      blockRes.apCookie = this.APGlobalState.get('cookie');
      return blockRes.$delete({
        'owner': this.owner,
        'project': this.project,
        'page': this.page,
        'block': block
      });
    };

    UserResource.prototype.buyPlan = function(card, plan, term, name, email) {
      var planRes;
      planRes = new this.planRes;
      planRes.apCookie = this.APGlobalState.get('cookie');
      planRes.card = card;
      planRes.plan = plan;
      planRes.term = term;
      planRes.name = name;
      planRes.email = email;
      return planRes.$save({
        'action': 'buy'
      });
    };

    UserResource.prototype.changePlan = function(plan, term) {
      var planRes;
      planRes = new this.planRes;
      planRes.apCookie = this.APGlobalState.get('cookie');
      planRes.plan = plan;
      planRes.term = term;
      return planRes.$save({
        'action': 'change'
      });
    };

    UserResource.prototype.getAllowedBillingPlans = function() {
      var planRes;
      planRes = new this.planRes;
      planRes.apCookie = this.APGlobalState.get('cookie');
      return planRes.$save({
        'action': 'allowedBillingPlans'
      });
    };

    UserResource.prototype.cancelPlan = function() {
      var planRes;
      planRes = new this.planRes;
      planRes.apCookie = this.APGlobalState.get('cookie');
      return planRes.$save({
        'action': 'cancel'
      });
    };

    UserResource.prototype.updateCard = function(card, name, email) {
      var cardRes;
      cardRes = new this.cardRes;
      cardRes.apCookie = this.APGlobalState.get('cookie');
      cardRes.card = card;
      cardRes.name = name;
      cardRes.email = email;
      return cardRes.$save({
        'action': 'update'
      });
    };

    UserResource.prototype.payCard = function(card, name, email) {
      var cardRes;
      cardRes = new this.cardRes;
      cardRes.apCookie = this.APGlobalState.get('cookie');
      cardRes.name = name;
      cardRes.email = email;
      cardRes.card = card;
      return cardRes.$save({
        'action': 'pay'
      });
    };

    UserResource.prototype.getOutstandingBills = function() {
      var cardRes;
      cardRes = new this.cardRes;
      cardRes.apCookie = this.APGlobalState.get('cookie');
      return cardRes.$save({
        'action': 'getOutstandingBills'
      });
    };

    UserResource.prototype.getNotices = function() {
      var noticeRes;
      noticeRes = new this.accountRes;
      noticeRes.apCookie = this.APGlobalState.get('cookie');
      noticeRes.project = this.project;
      noticeRes.owner = this.owner;
      return noticeRes.$save({
        'action': 'notices'
      });
    };

    return UserResource;

  })();

  window.apInject.UserResource = function(app) {
    return app.service('UserResource', ['$resource', '$cookies', 'APGlobalState', UserResource]);
  };

}).call(this);

(function() {
  if (window.apInject == null) {
    window.apInject = {};
  }

  window.apInject.APBlock = function(app) {
    return app.directive('apBlock', [
      '$compile', '$document', '$rootScope', '$http', 'UserResource', 'APGlobalState', function($compile, $document, $rootScope, $http, UserResource, APGlobalState) {
        return {
          priority: 0,
          replace: false,
          transclude: false,
          restrict: 'EAC',
          template: '<div ng-mouseleave=\'mouseleave()\' ng-mouseover=\'mouseover()\' ng-init=\'active = false\'>\n  <div ng-show=\'active\' ng-init=\'active = false\' class=\'editor\'>\n    <text-angular ng-model=\'htmlContent\'>\n    </text-angular>\n  </div>\n  <div ng-show=\'!active\' class=\'render\'>\n    <ap-render-html render=\'htmlContent\'>\n    </ap-render-html>\n  </div>\n</div>',
          scope: {
            classId: '@',
            blockId: '@',
            editor: '@'
          },
          link: function(scope, ele, attrs, controller) {
            var block, saveBlock;
            scope.htmlContent;
            if (APGlobalState.get('set-block-content') == null) {
              APGlobalState.set('set-block-content', {});
            }
            block = APGlobalState.get('set-block-content');
            block[scope.blockId] = function(content) {
              scope.htmlContent = content;
            };
            if (APGlobalState.get('get-block-content') == null) {
              APGlobalState.set('get-block-content', {});
            }
            block = APGlobalState.get('get-block-content');
            block[scope.blockId] = function(key) {
              return scope.htmlContent;
            };

            /* Set up event handlers */
            saveBlock = function() {
              return UserResource.putBlock(scope.blockId, scope.htmlContent);
            };
            $rootScope.$on('page-save', function() {
              return saveBlock();
            });
            $rootScope.$on("" + scope.blockId + "-save", function() {
              return saveBlock();
            });
            scope.htmlContent = scope.htmlContent != null ? scope.htmlContent : window.apBlocks[attrs.blockId];
            scope.mouseoverB = false;
            this.editMode = APGlobalState.get('edit_mode');
            if (this.editMode == null) {
              this.editMode = false;
            }
            angular.element(document).bind('mousedown', function() {
              if (scope.mouseoverB) {
                scope.active = true;
              } else {
                if (scope.active) {
                  saveBlock();
                }
                scope.active = false;
              }
              if (!scope.editMode) {
                scope.active = false;
              }
              scope.htmlContent = scope.htmlContent;
              scope.$apply();
            });
            scope.$on('edit_mode', function(event, value) {
              return scope.editMode = value;
            });
            scope.mouseleave = function() {
              this.removeBorder();
              return scope.mouseoverB = false;
            };
            scope.mouseover = function() {
              this.addBorder();
              return scope.mouseoverB = true;
            };
            scope.removeBorder = function() {
              ele.removeAttr('style');
            };
            scope.addBorder = (function(_this) {
              return function() {
                if (scope.editMode) {
                  ele.attr('style', 'border-width: 2px; border-style: solid; border-color: #AAAAFF;');
                }
              };
            })(this);
          }
        };
      }
    ]);
  };

}).call(this);

(function() {
  if (window.apInject == null) {
    window.apInject = {};
  }

  window.apInject.apRenderHtml = function(app) {
    return app.directive('apRenderHtml', [
      '$compile', function($compile) {
        return {
          priority: 0,
          replace: true,
          transclude: false,
          restrict: 'EAC',
          scope: {
            render: '=',
            show: '=',
            blockId: '='
          },
          link: function(scope, ele, attrs, controller) {
            scope.$watch('render', (function(_this) {
              return function(value) {
                ele.html(value);
                $compile(ele.contents())(scope);
              };
            })(this));
          }
        };
      }
    ]);
  };

}).call(this);

(function() {


}).call(this);
