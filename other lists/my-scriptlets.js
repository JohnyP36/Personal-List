// THIS MAY NOT BE NEEDED ANYMORE, because of https://github.com/gorhill/uBlock/commit/27a54c084556f657522b06484d2e28b21e1fac5a
// https://github.com/uBlock-user/uBO-Scriptlets/commit/3d1f48573749ac85b20031f78e0d5f7c7bb0f3af#
/// setCookie.js
/// alias sc.js
/// alias cs.js
// name and value are required, the others are options
// example.com##+js(cs, name=value; max-age=604800000; domain=example.com; path=/; SameSite=Strict; secure;
(() => {
    'use strict';
    const cs = ev => {
        if (ev) { window.removeEventListener(ev.type, cs, true); }
        try {
            var data = '{{1}}';
            document.cookie = data;
        } catch { }
    };
    if ( document.readyState === 'loading' ) {
        window.addEventListener('DOMContentLoaded', cs, true);
    } else {
        cs();
    }
})();

// https://github.com/uBlock-user/uBO-Scriptlets/blob/master/scriptlets.js
/// setLocalStorageItem.js
/// alias slsi.js
/// alias sli.js
// example.com##+js(sli, key, value)
(() => {
    'use strict';
    const key = '{{1}}';
        if ( key === '' || key === '{{1}}' ) { return; }
        const keys = key.split(/\s*\|\s*/);
        const value = '{{2}}';
        const behavior = '{{3}}';
        const setItem = () => {
            let timer = undefined;
            try {
                for (const keyName of keys) {
                    if (localStorage.getItem(keyName) === value) { break; }
                    localStorage.setItem(keyName, value);
                 }
            } catch { }
        };
        const mutationHandler = mutations => {
            if ( timer !== undefined ) { return; }
            let skip = true;
            for ( let i = 0; i < mutations.length && skip; i++ ) {
                const { type, addedNodes, removedNodes } = mutations[i];
                if ( type === 'attributes' ) { skip = false; }
                for ( let j = 0; j < addedNodes.length && skip; j++ ) {
                    if ( addedNodes[j].nodeType === 1 ) { skip = false; break; }
                }
                for ( let j = 0; j < removedNodes.length && skip; j++ ) {
                    if ( removedNodes[j].nodeType === 1 ) { skip = false; break; }
                }
            }
            if ( skip ) { return; }
            timer = self.requestIdleCallback(setItem, { timeout: 10 });
        };
        const start = ( ) => {
            setItem();
            if ( /\bloop\b/.test(behavior) === false ) { return; }
            const observer = new MutationObserver(mutationHandler);
            observer.observe(document.documentElement, {
                attributes: true,
                childList: true,
                subtree: true,
            });
        };
        if ( document.readyState !== 'complete' && /\bcomplete\b/.test(behavior) ) {
            self.addEventListener('load', start, { once: true });
        } else if ( document.readyState === 'loading' ) {
            self.addEventListener('DOMContentLoaded', start, { once: true });
        } else {
            start();
    }
})();

// https://github.com/uBlock-user/uBO-Scriptlets/blob/master/scriptlets.js#L3
/// remove-shadowroot-elem.js
/// alias rsre.js
// example.com##+js(rsre, [selector])
function removeShadowRootElem(  
	selector = '' 
) {
	  if ( selector === '' ) { return; }
	  const queryShadowRootElement = (shadowRootElement, rootElement) => {
		if (!rootElement) {
		    return queryShadowRootElement(shadowRootElement, document.documentElement);
		}
		const els = rootElement.querySelectorAll(shadowRootElement);
		for (const el of els) { if (el) { return el; } }
		const probes = rootElement.querySelectorAll('*');
		for (const probe of probes) {
		     if (probe.shadowRoot) {
			 const shadowElement = queryShadowRootElement(shadowRootElement, probe.shadowRoot);
			 if (shadowElement) { return shadowElement; }
		     }
		}
		return null;
	  };
	  const rmshadowelem = () => {
		try {
			const elem = queryShadowRootElement(selector);
			if (elem) { elem.remove(); }
		} catch { }
	  };
	  const observer = new MutationObserver(rmshadowelem);
	  observer.observe(document.documentElement, { attributes: true, childList: true, subtree: true, });
	  if ( document.readyState === "complete" ) { self.setTimeout(observer.disconnect(), 67);  }
}

// based on https://github.com/NanoAdblocker/NanoFilters/blob/master/NanoFilters/NanoResources.txt#L283
/// click-element.js
/// alias ce.js
// [required] 1: element to click; 
// [optional] 2: url should match given token; 3: timeout, if not set, it will click directly.
// example.com##+js(ce, element)
// example.com##+js(ce, element, href, timeout)
// example.com##+js(ce, element, , timeout)
(() => {
    let selector = '{{1}}';
    if ( selector === '' || selector === '{{1}}' ) {
        return;
    }
    let href = '{{2}}';
    if ( href === ''  || href === '{{2}}' ) {
        href = '';
    }
    let msecs = '{{3}}';
    if ( msecs === '{{3}}' ) {
        msecs = '';
    }
    let timeout = parseInt(msecs, 10);
    if ( isNaN(timeout) || isFinite(timeout) === false ) {
        timeout = 0;
    }
    var click = function() {
        var elements = document.querySelectorAll(selector);
        for ( var element of elements ) {
            element.click();
        }
    };
    if (window.location.href.indexOf(href) !== -1 ) {
        setTimeout(function() {
            if ( document.readyState === 'interactive' ||
                 document.readyState === 'complete' ) {
                click();
            } else {
                addEventListener('DOMContentLoaded', click);
            }
        }, timeout);
    }
})();

// Taken from AdGuard
/// click-element-observer.js
/// alias ceo.js
// [required] 1: element to click;
// [optional] 2: url should match given token; 3: disconnectTimeout.
// example.com##+js(ceo, element)
// example.com##+js(ceo, element, href, disconnectTimeout)
// example.com##+js(ceo, element, , disconnectTimeout)
(() => {
    let aelem = '{{1}}';
    if ( aelem === '' || aelem === '{{1}}' ) {
        return;
    }
    let bhref = '{{2}}';
    if ( bhref === ''  || bhref === '{{2}}' ) {
        bhref = '';
    }
    let dmsecs = '{{3}}';
    if ( dmsecs === '{{3}}' ) {
        dmsecs = '';
    }
    let etimeout = parseInt(dmsecs, 10);
    if ( isNaN(etimeout) || isFinite(etimeout) === false ) {
        etimeout = 10000;
    }
    if ( window.location.href.indexOf(bhref) !== -1 ) {
        const o = new MutationObserver(function() {
            const e = document.querySelector(aelem);
            e && (o.disconnect(), e.click())
        });
        o.observe(document,{ childList:!0, subtree:!0 }),
        setTimeout(function() {
            o.disconnect()
        }, etimeout)
    }
})();
