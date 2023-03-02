// https://github.com/uBlock-user/uBO-Scriptlets/commit/3d1f48573749ac85b20031f78e0d5f7c7bb0f3af#
/// setCookie.js
/// alias sc.js
/// alias cs.js
// example.com##+js(cs, name, value, age)
(() => {
    'use strict';
    const cs = ev => {
        if (ev) {
            window.removeEventListener(ev.type, cs, true);
        }
        try {
            document.cookie = '{{1}}={{2}}; max-age={{3}}; secure; path=/;';
        } catch { }
    };
    if (document.readyState === 'loading') {
        window.addEventListener('DOMContentLoaded', cs, true);
    } else {
        cs();
    }
})();

// https://github.com/uBlock-user/uBO-Scriptlets/commit/3d1f48573749ac85b20031f78e0d5f7c7bb0f3af#
/// setLocalStorageItem.js
/// alias slsi.js
/// alias si.js
// example.com##+js(si, key, value)
(() => {
    'use strict';
    const key = '{{1}}';
    if ( key === '' || key === '{{1}}' ) { return; }
    const value = '{{2}}';
    if ( value === '' || value === '{{2}}' ) { return; }
    const setItem = ev => {
        if (ev) {
            window.removeEventListener(ev.type, setItem, true);
        }
        try {
            if (localStorage.getItem(key) !== null) { return; }
            localStorage.setItem(key, value);
        } catch { }
    };
    if (document.readyState === 'loading') {
        window.addEventListener('DOMContentLoaded', setItem, true); 
    } else {
        setItem();
    }
})();

// based on https://github.com/NanoAdblocker/NanoFilters/blob/master/NanoFilters/NanoResources.txt#L283
// You can optional set a timeout in milliseconds before it clicks.
// If not set, it will click directly.
// example.com##+js(ce, element)
// example.com##+js(ce, element, timeout)
/// click-element.js
/// alias ce.js
(() => {
    let selector = '{{1}}';
    if ( selector === '' || selector === '{{1}}' ) {
        return;
    }
    let msecs = '{{2}}';
    if ( msecs === '{{2}}' ) {
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
    setTimeout(function() {
        if ( document.readyState === 'interactive' ||
             document.readyState === 'complete' ) {
            click();
        } else {
            addEventListener('DOMContentLoaded', click);
        }
    }, timeout);
})();

// Taken from AdGuard
/// click-element-observer.js
/// alias ceo.js
// example.com##+js(ceo, element)
// example.com##+js(ceo, element, disconnectTimeout)
(() => {
    let a = '{{1}}';
    if ( a === '' || a === '{{1}}' ) {
        return;
    }
    let b = '{{2}}';
    if ( b === '{{2}}' ) {
        b = '';
    }
    let c = parseInt(b, 10);
    if ( isNaN(c) || isFinite(c) === false ) {
        c = 10000;
    }
    const d = new MutationObserver(function() {
        const e = document.querySelector(a);
        e&&(d.disconnect(),e.click())
    });
    d.observe(document,{ childList:!0, subtree:!0 }),
    setTimeout(function() {
        e.disconnect()
    }, c)
})();
