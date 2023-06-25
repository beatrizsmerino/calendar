/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";


})();

// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
(() => {
/**
 * @file componentsSprites
 * @author Beatriz Sopeña Merino <beatrizsmerino@gmail.com>
 * @copyright (2020)
 */



/**
 * @function getContentFile
 * @description Gets the content of a file as text, through an asynchronous request.
 */

async function getContentFile(urlFile) {
	const data = await fetch(urlFile);
	const content = await data.text();

	return content;
}


/**
 * @function insertSprites
 * @description Insert the svg icons of the `sprite` at the end of the `body` in all html files.
 * This sprite is located in the path `images/icons/sprites.svg` and is created with gulp.
 */

async function insertSprites() {
	const urlFile = 'images/icons/sprites.svg';
	const className = 'sprite';
	const contentBody = document.querySelector('body');
	const contentSprites = document.createElement('div');

	try {
		const data = await getContentFile(urlFile);
		contentSprites.setAttribute('class', className);
		contentBody.appendChild(contentSprites);
		contentSprites.insertAdjacentHTML('beforeend', data);
	} catch (error) {
		console.log('Error:', error);
	}
}

document.addEventListener("DOMContentLoaded", function () {
	insertSprites();
});

})();

// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
(() => {
/**
 * @file layoutsHeader
 * @author Beatriz Sopeña Merino <beatrizsmerino@gmail.com>
 * @copyright (2020)
 */



/**
 * @function toggleNav
 * @description Controls the opening and closing of the navigation located in the `header`.
 * Clicking the navigation button shows or hides the menu, and prevents the animation from being applied when the window is resized beyond a certain limit.
 */

async function toggleNav() {
	const nav = document.querySelector('#headerNav');
	const navButton = document.querySelector('#headerNavButton');

	navButton.addEventListener('click', function () {
		nav.classList.add("is-animate");
		nav.classList.toggle("is-open");
	});

	window.addEventListener('resize', function () {
		const maxWidth = 786;
		if (window.innerWidth > maxWidth) {
			nav.classList.remove("is-animate");
		}
	});
}

document.addEventListener("DOMContentLoaded", async function () {
	await toggleNav();
});

})();

// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
(() => {
/**
 * @file layoutsFooter
 * @author Beatriz Sopeña Merino <beatrizsmerino@gmail.com>
 * @copyright (2023)
 */



/**
 * @function insertYearToCopyright
 * @description Gets the current year and inserts it in the `copyright` located in the `footer`.
 * This ensures that the year is updated dynamically without the need to modify the code manually each year.
 */

async function insertYearToCopyright() {
	const currentDate = new Date();
	const currentYear = currentDate.getFullYear();
	const content = document.querySelector("#currentYear");

	content.innerHTML = currentYear;
}


document.addEventListener("DOMContentLoaded", async function () {
	await insertYearToCopyright();
});

})();

// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";

;// CONCATENATED MODULE: ./node_modules/perfect-scrollbar/dist/perfect-scrollbar.esm.js
/*!
 * perfect-scrollbar v1.5.3
 * Copyright 2021 Hyunje Jun, MDBootstrap and Contributors
 * Licensed under MIT
 */

function get(element) {
  return getComputedStyle(element);
}

function set(element, obj) {
  for (var key in obj) {
    var val = obj[key];
    if (typeof val === 'number') {
      val = val + "px";
    }
    element.style[key] = val;
  }
  return element;
}

function div(className) {
  var div = document.createElement('div');
  div.className = className;
  return div;
}

var elMatches =
  typeof Element !== 'undefined' &&
  (Element.prototype.matches ||
    Element.prototype.webkitMatchesSelector ||
    Element.prototype.mozMatchesSelector ||
    Element.prototype.msMatchesSelector);

function matches(element, query) {
  if (!elMatches) {
    throw new Error('No element matching method supported');
  }

  return elMatches.call(element, query);
}

function remove(element) {
  if (element.remove) {
    element.remove();
  } else {
    if (element.parentNode) {
      element.parentNode.removeChild(element);
    }
  }
}

function queryChildren(element, selector) {
  return Array.prototype.filter.call(element.children, function (child) { return matches(child, selector); }
  );
}

var cls = {
  main: 'ps',
  rtl: 'ps__rtl',
  element: {
    thumb: function (x) { return ("ps__thumb-" + x); },
    rail: function (x) { return ("ps__rail-" + x); },
    consuming: 'ps__child--consume',
  },
  state: {
    focus: 'ps--focus',
    clicking: 'ps--clicking',
    active: function (x) { return ("ps--active-" + x); },
    scrolling: function (x) { return ("ps--scrolling-" + x); },
  },
};

/*
 * Helper methods
 */
var scrollingClassTimeout = { x: null, y: null };

function addScrollingClass(i, x) {
  var classList = i.element.classList;
  var className = cls.state.scrolling(x);

  if (classList.contains(className)) {
    clearTimeout(scrollingClassTimeout[x]);
  } else {
    classList.add(className);
  }
}

function removeScrollingClass(i, x) {
  scrollingClassTimeout[x] = setTimeout(
    function () { return i.isAlive && i.element.classList.remove(cls.state.scrolling(x)); },
    i.settings.scrollingThreshold
  );
}

function setScrollingClassInstantly(i, x) {
  addScrollingClass(i, x);
  removeScrollingClass(i, x);
}

var EventElement = function EventElement(element) {
  this.element = element;
  this.handlers = {};
};

var prototypeAccessors = { isEmpty: { configurable: true } };

EventElement.prototype.bind = function bind (eventName, handler) {
  if (typeof this.handlers[eventName] === 'undefined') {
    this.handlers[eventName] = [];
  }
  this.handlers[eventName].push(handler);
  this.element.addEventListener(eventName, handler, false);
};

EventElement.prototype.unbind = function unbind (eventName, target) {
    var this$1 = this;

  this.handlers[eventName] = this.handlers[eventName].filter(function (handler) {
    if (target && handler !== target) {
      return true;
    }
    this$1.element.removeEventListener(eventName, handler, false);
    return false;
  });
};

EventElement.prototype.unbindAll = function unbindAll () {
  for (var name in this.handlers) {
    this.unbind(name);
  }
};

prototypeAccessors.isEmpty.get = function () {
    var this$1 = this;

  return Object.keys(this.handlers).every(
    function (key) { return this$1.handlers[key].length === 0; }
  );
};

Object.defineProperties( EventElement.prototype, prototypeAccessors );

var EventManager = function EventManager() {
  this.eventElements = [];
};

EventManager.prototype.eventElement = function eventElement (element) {
  var ee = this.eventElements.filter(function (ee) { return ee.element === element; })[0];
  if (!ee) {
    ee = new EventElement(element);
    this.eventElements.push(ee);
  }
  return ee;
};

EventManager.prototype.bind = function bind (element, eventName, handler) {
  this.eventElement(element).bind(eventName, handler);
};

EventManager.prototype.unbind = function unbind (element, eventName, handler) {
  var ee = this.eventElement(element);
  ee.unbind(eventName, handler);

  if (ee.isEmpty) {
    // remove
    this.eventElements.splice(this.eventElements.indexOf(ee), 1);
  }
};

EventManager.prototype.unbindAll = function unbindAll () {
  this.eventElements.forEach(function (e) { return e.unbindAll(); });
  this.eventElements = [];
};

EventManager.prototype.once = function once (element, eventName, handler) {
  var ee = this.eventElement(element);
  var onceHandler = function (evt) {
    ee.unbind(eventName, onceHandler);
    handler(evt);
  };
  ee.bind(eventName, onceHandler);
};

function createEvent(name) {
  if (typeof window.CustomEvent === 'function') {
    return new CustomEvent(name);
  } else {
    var evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(name, false, false, undefined);
    return evt;
  }
}

function processScrollDiff(
  i,
  axis,
  diff,
  useScrollingClass,
  forceFireReachEvent
) {
  if ( useScrollingClass === void 0 ) useScrollingClass = true;
  if ( forceFireReachEvent === void 0 ) forceFireReachEvent = false;

  var fields;
  if (axis === 'top') {
    fields = [
      'contentHeight',
      'containerHeight',
      'scrollTop',
      'y',
      'up',
      'down' ];
  } else if (axis === 'left') {
    fields = [
      'contentWidth',
      'containerWidth',
      'scrollLeft',
      'x',
      'left',
      'right' ];
  } else {
    throw new Error('A proper axis should be provided');
  }

  processScrollDiff$1(i, diff, fields, useScrollingClass, forceFireReachEvent);
}

function processScrollDiff$1(
  i,
  diff,
  ref,
  useScrollingClass,
  forceFireReachEvent
) {
  var contentHeight = ref[0];
  var containerHeight = ref[1];
  var scrollTop = ref[2];
  var y = ref[3];
  var up = ref[4];
  var down = ref[5];
  if ( useScrollingClass === void 0 ) useScrollingClass = true;
  if ( forceFireReachEvent === void 0 ) forceFireReachEvent = false;

  var element = i.element;

  // reset reach
  i.reach[y] = null;

  // 1 for subpixel rounding
  if (element[scrollTop] < 1) {
    i.reach[y] = 'start';
  }

  // 1 for subpixel rounding
  if (element[scrollTop] > i[contentHeight] - i[containerHeight] - 1) {
    i.reach[y] = 'end';
  }

  if (diff) {
    element.dispatchEvent(createEvent(("ps-scroll-" + y)));

    if (diff < 0) {
      element.dispatchEvent(createEvent(("ps-scroll-" + up)));
    } else if (diff > 0) {
      element.dispatchEvent(createEvent(("ps-scroll-" + down)));
    }

    if (useScrollingClass) {
      setScrollingClassInstantly(i, y);
    }
  }

  if (i.reach[y] && (diff || forceFireReachEvent)) {
    element.dispatchEvent(createEvent(("ps-" + y + "-reach-" + (i.reach[y]))));
  }
}

function toInt(x) {
  return parseInt(x, 10) || 0;
}

function isEditable(el) {
  return (
    matches(el, 'input,[contenteditable]') ||
    matches(el, 'select,[contenteditable]') ||
    matches(el, 'textarea,[contenteditable]') ||
    matches(el, 'button,[contenteditable]')
  );
}

function perfect_scrollbar_esm_outerWidth(element) {
  var styles = get(element);
  return (
    toInt(styles.width) +
    toInt(styles.paddingLeft) +
    toInt(styles.paddingRight) +
    toInt(styles.borderLeftWidth) +
    toInt(styles.borderRightWidth)
  );
}

var env = {
  isWebKit:
    typeof document !== 'undefined' &&
    'WebkitAppearance' in document.documentElement.style,
  supportsTouch:
    typeof window !== 'undefined' &&
    ('ontouchstart' in window ||
      ('maxTouchPoints' in window.navigator &&
        window.navigator.maxTouchPoints > 0) ||
      (window.DocumentTouch && document instanceof window.DocumentTouch)),
  supportsIePointer:
    typeof navigator !== 'undefined' && navigator.msMaxTouchPoints,
  isChrome:
    typeof navigator !== 'undefined' &&
    /Chrome/i.test(navigator && navigator.userAgent),
};

function updateGeometry(i) {
  var element = i.element;
  var roundedScrollTop = Math.floor(element.scrollTop);
  var rect = element.getBoundingClientRect();

  i.containerWidth = Math.round(rect.width);
  i.containerHeight = Math.round(rect.height);

  i.contentWidth = element.scrollWidth;
  i.contentHeight = element.scrollHeight;

  if (!element.contains(i.scrollbarXRail)) {
    // clean up and append
    queryChildren(element, cls.element.rail('x')).forEach(function (el) { return remove(el); }
    );
    element.appendChild(i.scrollbarXRail);
  }
  if (!element.contains(i.scrollbarYRail)) {
    // clean up and append
    queryChildren(element, cls.element.rail('y')).forEach(function (el) { return remove(el); }
    );
    element.appendChild(i.scrollbarYRail);
  }

  if (
    !i.settings.suppressScrollX &&
    i.containerWidth + i.settings.scrollXMarginOffset < i.contentWidth
  ) {
    i.scrollbarXActive = true;
    i.railXWidth = i.containerWidth - i.railXMarginWidth;
    i.railXRatio = i.containerWidth / i.railXWidth;
    i.scrollbarXWidth = getThumbSize(
      i,
      toInt((i.railXWidth * i.containerWidth) / i.contentWidth)
    );
    i.scrollbarXLeft = toInt(
      ((i.negativeScrollAdjustment + element.scrollLeft) *
        (i.railXWidth - i.scrollbarXWidth)) /
        (i.contentWidth - i.containerWidth)
    );
  } else {
    i.scrollbarXActive = false;
  }

  if (
    !i.settings.suppressScrollY &&
    i.containerHeight + i.settings.scrollYMarginOffset < i.contentHeight
  ) {
    i.scrollbarYActive = true;
    i.railYHeight = i.containerHeight - i.railYMarginHeight;
    i.railYRatio = i.containerHeight / i.railYHeight;
    i.scrollbarYHeight = getThumbSize(
      i,
      toInt((i.railYHeight * i.containerHeight) / i.contentHeight)
    );
    i.scrollbarYTop = toInt(
      (roundedScrollTop * (i.railYHeight - i.scrollbarYHeight)) /
        (i.contentHeight - i.containerHeight)
    );
  } else {
    i.scrollbarYActive = false;
  }

  if (i.scrollbarXLeft >= i.railXWidth - i.scrollbarXWidth) {
    i.scrollbarXLeft = i.railXWidth - i.scrollbarXWidth;
  }
  if (i.scrollbarYTop >= i.railYHeight - i.scrollbarYHeight) {
    i.scrollbarYTop = i.railYHeight - i.scrollbarYHeight;
  }

  updateCss(element, i);

  if (i.scrollbarXActive) {
    element.classList.add(cls.state.active('x'));
  } else {
    element.classList.remove(cls.state.active('x'));
    i.scrollbarXWidth = 0;
    i.scrollbarXLeft = 0;
    element.scrollLeft = i.isRtl === true ? i.contentWidth : 0;
  }
  if (i.scrollbarYActive) {
    element.classList.add(cls.state.active('y'));
  } else {
    element.classList.remove(cls.state.active('y'));
    i.scrollbarYHeight = 0;
    i.scrollbarYTop = 0;
    element.scrollTop = 0;
  }
}

function getThumbSize(i, thumbSize) {
  if (i.settings.minScrollbarLength) {
    thumbSize = Math.max(thumbSize, i.settings.minScrollbarLength);
  }
  if (i.settings.maxScrollbarLength) {
    thumbSize = Math.min(thumbSize, i.settings.maxScrollbarLength);
  }
  return thumbSize;
}

function updateCss(element, i) {
  var xRailOffset = { width: i.railXWidth };
  var roundedScrollTop = Math.floor(element.scrollTop);

  if (i.isRtl) {
    xRailOffset.left =
      i.negativeScrollAdjustment +
      element.scrollLeft +
      i.containerWidth -
      i.contentWidth;
  } else {
    xRailOffset.left = element.scrollLeft;
  }
  if (i.isScrollbarXUsingBottom) {
    xRailOffset.bottom = i.scrollbarXBottom - roundedScrollTop;
  } else {
    xRailOffset.top = i.scrollbarXTop + roundedScrollTop;
  }
  set(i.scrollbarXRail, xRailOffset);

  var yRailOffset = { top: roundedScrollTop, height: i.railYHeight };
  if (i.isScrollbarYUsingRight) {
    if (i.isRtl) {
      yRailOffset.right =
        i.contentWidth -
        (i.negativeScrollAdjustment + element.scrollLeft) -
        i.scrollbarYRight -
        i.scrollbarYOuterWidth -
        9;
    } else {
      yRailOffset.right = i.scrollbarYRight - element.scrollLeft;
    }
  } else {
    if (i.isRtl) {
      yRailOffset.left =
        i.negativeScrollAdjustment +
        element.scrollLeft +
        i.containerWidth * 2 -
        i.contentWidth -
        i.scrollbarYLeft -
        i.scrollbarYOuterWidth;
    } else {
      yRailOffset.left = i.scrollbarYLeft + element.scrollLeft;
    }
  }
  set(i.scrollbarYRail, yRailOffset);

  set(i.scrollbarX, {
    left: i.scrollbarXLeft,
    width: i.scrollbarXWidth - i.railBorderXWidth,
  });
  set(i.scrollbarY, {
    top: i.scrollbarYTop,
    height: i.scrollbarYHeight - i.railBorderYWidth,
  });
}

function clickRail(i) {
  var element = i.element;

  i.event.bind(i.scrollbarY, 'mousedown', function (e) { return e.stopPropagation(); });
  i.event.bind(i.scrollbarYRail, 'mousedown', function (e) {
    var positionTop =
      e.pageY -
      window.pageYOffset -
      i.scrollbarYRail.getBoundingClientRect().top;
    var direction = positionTop > i.scrollbarYTop ? 1 : -1;

    i.element.scrollTop += direction * i.containerHeight;
    updateGeometry(i);

    e.stopPropagation();
  });

  i.event.bind(i.scrollbarX, 'mousedown', function (e) { return e.stopPropagation(); });
  i.event.bind(i.scrollbarXRail, 'mousedown', function (e) {
    var positionLeft =
      e.pageX -
      window.pageXOffset -
      i.scrollbarXRail.getBoundingClientRect().left;
    var direction = positionLeft > i.scrollbarXLeft ? 1 : -1;

    i.element.scrollLeft += direction * i.containerWidth;
    updateGeometry(i);

    e.stopPropagation();
  });
}

function dragThumb(i) {
  bindMouseScrollHandler(i, [
    'containerWidth',
    'contentWidth',
    'pageX',
    'railXWidth',
    'scrollbarX',
    'scrollbarXWidth',
    'scrollLeft',
    'x',
    'scrollbarXRail' ]);
  bindMouseScrollHandler(i, [
    'containerHeight',
    'contentHeight',
    'pageY',
    'railYHeight',
    'scrollbarY',
    'scrollbarYHeight',
    'scrollTop',
    'y',
    'scrollbarYRail' ]);
}

function bindMouseScrollHandler(
  i,
  ref
) {
  var containerHeight = ref[0];
  var contentHeight = ref[1];
  var pageY = ref[2];
  var railYHeight = ref[3];
  var scrollbarY = ref[4];
  var scrollbarYHeight = ref[5];
  var scrollTop = ref[6];
  var y = ref[7];
  var scrollbarYRail = ref[8];

  var element = i.element;

  var startingScrollTop = null;
  var startingMousePageY = null;
  var scrollBy = null;

  function mouseMoveHandler(e) {
    if (e.touches && e.touches[0]) {
      e[pageY] = e.touches[0].pageY;
    }
    element[scrollTop] =
      startingScrollTop + scrollBy * (e[pageY] - startingMousePageY);
    addScrollingClass(i, y);
    updateGeometry(i);

    e.stopPropagation();
    if (e.type.startsWith('touch') && e.changedTouches.length > 1) {
      e.preventDefault();
    }
  }

  function mouseUpHandler() {
    removeScrollingClass(i, y);
    i[scrollbarYRail].classList.remove(cls.state.clicking);
    i.event.unbind(i.ownerDocument, 'mousemove', mouseMoveHandler);
  }

  function bindMoves(e, touchMode) {
    startingScrollTop = element[scrollTop];
    if (touchMode && e.touches) {
      e[pageY] = e.touches[0].pageY;
    }
    startingMousePageY = e[pageY];
    scrollBy =
      (i[contentHeight] - i[containerHeight]) /
      (i[railYHeight] - i[scrollbarYHeight]);
    if (!touchMode) {
      i.event.bind(i.ownerDocument, 'mousemove', mouseMoveHandler);
      i.event.once(i.ownerDocument, 'mouseup', mouseUpHandler);
      e.preventDefault();
    } else {
      i.event.bind(i.ownerDocument, 'touchmove', mouseMoveHandler);
    }

    i[scrollbarYRail].classList.add(cls.state.clicking);

    e.stopPropagation();
  }

  i.event.bind(i[scrollbarY], 'mousedown', function (e) {
    bindMoves(e);
  });
  i.event.bind(i[scrollbarY], 'touchstart', function (e) {
    bindMoves(e, true);
  });
}

function keyboard(i) {
  var element = i.element;

  var elementHovered = function () { return matches(element, ':hover'); };
  var scrollbarFocused = function () { return matches(i.scrollbarX, ':focus') || matches(i.scrollbarY, ':focus'); };

  function shouldPreventDefault(deltaX, deltaY) {
    var scrollTop = Math.floor(element.scrollTop);
    if (deltaX === 0) {
      if (!i.scrollbarYActive) {
        return false;
      }
      if (
        (scrollTop === 0 && deltaY > 0) ||
        (scrollTop >= i.contentHeight - i.containerHeight && deltaY < 0)
      ) {
        return !i.settings.wheelPropagation;
      }
    }

    var scrollLeft = element.scrollLeft;
    if (deltaY === 0) {
      if (!i.scrollbarXActive) {
        return false;
      }
      if (
        (scrollLeft === 0 && deltaX < 0) ||
        (scrollLeft >= i.contentWidth - i.containerWidth && deltaX > 0)
      ) {
        return !i.settings.wheelPropagation;
      }
    }
    return true;
  }

  i.event.bind(i.ownerDocument, 'keydown', function (e) {
    if (
      (e.isDefaultPrevented && e.isDefaultPrevented()) ||
      e.defaultPrevented
    ) {
      return;
    }

    if (!elementHovered() && !scrollbarFocused()) {
      return;
    }

    var activeElement = document.activeElement
      ? document.activeElement
      : i.ownerDocument.activeElement;
    if (activeElement) {
      if (activeElement.tagName === 'IFRAME') {
        activeElement = activeElement.contentDocument.activeElement;
      } else {
        // go deeper if element is a webcomponent
        while (activeElement.shadowRoot) {
          activeElement = activeElement.shadowRoot.activeElement;
        }
      }
      if (isEditable(activeElement)) {
        return;
      }
    }

    var deltaX = 0;
    var deltaY = 0;

    switch (e.which) {
      case 37: // left
        if (e.metaKey) {
          deltaX = -i.contentWidth;
        } else if (e.altKey) {
          deltaX = -i.containerWidth;
        } else {
          deltaX = -30;
        }
        break;
      case 38: // up
        if (e.metaKey) {
          deltaY = i.contentHeight;
        } else if (e.altKey) {
          deltaY = i.containerHeight;
        } else {
          deltaY = 30;
        }
        break;
      case 39: // right
        if (e.metaKey) {
          deltaX = i.contentWidth;
        } else if (e.altKey) {
          deltaX = i.containerWidth;
        } else {
          deltaX = 30;
        }
        break;
      case 40: // down
        if (e.metaKey) {
          deltaY = -i.contentHeight;
        } else if (e.altKey) {
          deltaY = -i.containerHeight;
        } else {
          deltaY = -30;
        }
        break;
      case 32: // space bar
        if (e.shiftKey) {
          deltaY = i.containerHeight;
        } else {
          deltaY = -i.containerHeight;
        }
        break;
      case 33: // page up
        deltaY = i.containerHeight;
        break;
      case 34: // page down
        deltaY = -i.containerHeight;
        break;
      case 36: // home
        deltaY = i.contentHeight;
        break;
      case 35: // end
        deltaY = -i.contentHeight;
        break;
      default:
        return;
    }

    if (i.settings.suppressScrollX && deltaX !== 0) {
      return;
    }
    if (i.settings.suppressScrollY && deltaY !== 0) {
      return;
    }

    element.scrollTop -= deltaY;
    element.scrollLeft += deltaX;
    updateGeometry(i);

    if (shouldPreventDefault(deltaX, deltaY)) {
      e.preventDefault();
    }
  });
}

function wheel(i) {
  var element = i.element;

  function shouldPreventDefault(deltaX, deltaY) {
    var roundedScrollTop = Math.floor(element.scrollTop);
    var isTop = element.scrollTop === 0;
    var isBottom =
      roundedScrollTop + element.offsetHeight === element.scrollHeight;
    var isLeft = element.scrollLeft === 0;
    var isRight =
      element.scrollLeft + element.offsetWidth === element.scrollWidth;

    var hitsBound;

    // pick axis with primary direction
    if (Math.abs(deltaY) > Math.abs(deltaX)) {
      hitsBound = isTop || isBottom;
    } else {
      hitsBound = isLeft || isRight;
    }

    return hitsBound ? !i.settings.wheelPropagation : true;
  }

  function getDeltaFromEvent(e) {
    var deltaX = e.deltaX;
    var deltaY = -1 * e.deltaY;

    if (typeof deltaX === 'undefined' || typeof deltaY === 'undefined') {
      // OS X Safari
      deltaX = (-1 * e.wheelDeltaX) / 6;
      deltaY = e.wheelDeltaY / 6;
    }

    if (e.deltaMode && e.deltaMode === 1) {
      // Firefox in deltaMode 1: Line scrolling
      deltaX *= 10;
      deltaY *= 10;
    }

    if (deltaX !== deltaX && deltaY !== deltaY /* NaN checks */) {
      // IE in some mouse drivers
      deltaX = 0;
      deltaY = e.wheelDelta;
    }

    if (e.shiftKey) {
      // reverse axis with shift key
      return [-deltaY, -deltaX];
    }
    return [deltaX, deltaY];
  }

  function shouldBeConsumedByChild(target, deltaX, deltaY) {
    // FIXME: this is a workaround for <select> issue in FF and IE #571
    if (!env.isWebKit && element.querySelector('select:focus')) {
      return true;
    }

    if (!element.contains(target)) {
      return false;
    }

    var cursor = target;

    while (cursor && cursor !== element) {
      if (cursor.classList.contains(cls.element.consuming)) {
        return true;
      }

      var style = get(cursor);

      // if deltaY && vertical scrollable
      if (deltaY && style.overflowY.match(/(scroll|auto)/)) {
        var maxScrollTop = cursor.scrollHeight - cursor.clientHeight;
        if (maxScrollTop > 0) {
          if (
            (cursor.scrollTop > 0 && deltaY < 0) ||
            (cursor.scrollTop < maxScrollTop && deltaY > 0)
          ) {
            return true;
          }
        }
      }
      // if deltaX && horizontal scrollable
      if (deltaX && style.overflowX.match(/(scroll|auto)/)) {
        var maxScrollLeft = cursor.scrollWidth - cursor.clientWidth;
        if (maxScrollLeft > 0) {
          if (
            (cursor.scrollLeft > 0 && deltaX < 0) ||
            (cursor.scrollLeft < maxScrollLeft && deltaX > 0)
          ) {
            return true;
          }
        }
      }

      cursor = cursor.parentNode;
    }

    return false;
  }

  function mousewheelHandler(e) {
    var ref = getDeltaFromEvent(e);
    var deltaX = ref[0];
    var deltaY = ref[1];

    if (shouldBeConsumedByChild(e.target, deltaX, deltaY)) {
      return;
    }

    var shouldPrevent = false;
    if (!i.settings.useBothWheelAxes) {
      // deltaX will only be used for horizontal scrolling and deltaY will
      // only be used for vertical scrolling - this is the default
      element.scrollTop -= deltaY * i.settings.wheelSpeed;
      element.scrollLeft += deltaX * i.settings.wheelSpeed;
    } else if (i.scrollbarYActive && !i.scrollbarXActive) {
      // only vertical scrollbar is active and useBothWheelAxes option is
      // active, so let's scroll vertical bar using both mouse wheel axes
      if (deltaY) {
        element.scrollTop -= deltaY * i.settings.wheelSpeed;
      } else {
        element.scrollTop += deltaX * i.settings.wheelSpeed;
      }
      shouldPrevent = true;
    } else if (i.scrollbarXActive && !i.scrollbarYActive) {
      // useBothWheelAxes and only horizontal bar is active, so use both
      // wheel axes for horizontal bar
      if (deltaX) {
        element.scrollLeft += deltaX * i.settings.wheelSpeed;
      } else {
        element.scrollLeft -= deltaY * i.settings.wheelSpeed;
      }
      shouldPrevent = true;
    }

    updateGeometry(i);

    shouldPrevent = shouldPrevent || shouldPreventDefault(deltaX, deltaY);
    if (shouldPrevent && !e.ctrlKey) {
      e.stopPropagation();
      e.preventDefault();
    }
  }

  if (typeof window.onwheel !== 'undefined') {
    i.event.bind(element, 'wheel', mousewheelHandler);
  } else if (typeof window.onmousewheel !== 'undefined') {
    i.event.bind(element, 'mousewheel', mousewheelHandler);
  }
}

function touch(i) {
  if (!env.supportsTouch && !env.supportsIePointer) {
    return;
  }

  var element = i.element;

  function shouldPrevent(deltaX, deltaY) {
    var scrollTop = Math.floor(element.scrollTop);
    var scrollLeft = element.scrollLeft;
    var magnitudeX = Math.abs(deltaX);
    var magnitudeY = Math.abs(deltaY);

    if (magnitudeY > magnitudeX) {
      // user is perhaps trying to swipe up/down the page

      if (
        (deltaY < 0 && scrollTop === i.contentHeight - i.containerHeight) ||
        (deltaY > 0 && scrollTop === 0)
      ) {
        // set prevent for mobile Chrome refresh
        return window.scrollY === 0 && deltaY > 0 && env.isChrome;
      }
    } else if (magnitudeX > magnitudeY) {
      // user is perhaps trying to swipe left/right across the page

      if (
        (deltaX < 0 && scrollLeft === i.contentWidth - i.containerWidth) ||
        (deltaX > 0 && scrollLeft === 0)
      ) {
        return true;
      }
    }

    return true;
  }

  function applyTouchMove(differenceX, differenceY) {
    element.scrollTop -= differenceY;
    element.scrollLeft -= differenceX;

    updateGeometry(i);
  }

  var startOffset = {};
  var startTime = 0;
  var speed = {};
  var easingLoop = null;

  function getTouch(e) {
    if (e.targetTouches) {
      return e.targetTouches[0];
    } else {
      // Maybe IE pointer
      return e;
    }
  }

  function shouldHandle(e) {
    if (e.pointerType && e.pointerType === 'pen' && e.buttons === 0) {
      return false;
    }
    if (e.targetTouches && e.targetTouches.length === 1) {
      return true;
    }
    if (
      e.pointerType &&
      e.pointerType !== 'mouse' &&
      e.pointerType !== e.MSPOINTER_TYPE_MOUSE
    ) {
      return true;
    }
    return false;
  }

  function touchStart(e) {
    if (!shouldHandle(e)) {
      return;
    }

    var touch = getTouch(e);

    startOffset.pageX = touch.pageX;
    startOffset.pageY = touch.pageY;

    startTime = new Date().getTime();

    if (easingLoop !== null) {
      clearInterval(easingLoop);
    }
  }

  function shouldBeConsumedByChild(target, deltaX, deltaY) {
    if (!element.contains(target)) {
      return false;
    }

    var cursor = target;

    while (cursor && cursor !== element) {
      if (cursor.classList.contains(cls.element.consuming)) {
        return true;
      }

      var style = get(cursor);

      // if deltaY && vertical scrollable
      if (deltaY && style.overflowY.match(/(scroll|auto)/)) {
        var maxScrollTop = cursor.scrollHeight - cursor.clientHeight;
        if (maxScrollTop > 0) {
          if (
            (cursor.scrollTop > 0 && deltaY < 0) ||
            (cursor.scrollTop < maxScrollTop && deltaY > 0)
          ) {
            return true;
          }
        }
      }
      // if deltaX && horizontal scrollable
      if (deltaX && style.overflowX.match(/(scroll|auto)/)) {
        var maxScrollLeft = cursor.scrollWidth - cursor.clientWidth;
        if (maxScrollLeft > 0) {
          if (
            (cursor.scrollLeft > 0 && deltaX < 0) ||
            (cursor.scrollLeft < maxScrollLeft && deltaX > 0)
          ) {
            return true;
          }
        }
      }

      cursor = cursor.parentNode;
    }

    return false;
  }

  function touchMove(e) {
    if (shouldHandle(e)) {
      var touch = getTouch(e);

      var currentOffset = { pageX: touch.pageX, pageY: touch.pageY };

      var differenceX = currentOffset.pageX - startOffset.pageX;
      var differenceY = currentOffset.pageY - startOffset.pageY;

      if (shouldBeConsumedByChild(e.target, differenceX, differenceY)) {
        return;
      }

      applyTouchMove(differenceX, differenceY);
      startOffset = currentOffset;

      var currentTime = new Date().getTime();

      var timeGap = currentTime - startTime;
      if (timeGap > 0) {
        speed.x = differenceX / timeGap;
        speed.y = differenceY / timeGap;
        startTime = currentTime;
      }

      if (shouldPrevent(differenceX, differenceY)) {
        e.preventDefault();
      }
    }
  }
  function touchEnd() {
    if (i.settings.swipeEasing) {
      clearInterval(easingLoop);
      easingLoop = setInterval(function() {
        if (i.isInitialized) {
          clearInterval(easingLoop);
          return;
        }

        if (!speed.x && !speed.y) {
          clearInterval(easingLoop);
          return;
        }

        if (Math.abs(speed.x) < 0.01 && Math.abs(speed.y) < 0.01) {
          clearInterval(easingLoop);
          return;
        }

        if (!i.element) {
          clearInterval(easingLoop);
          return;
        }

        applyTouchMove(speed.x * 30, speed.y * 30);

        speed.x *= 0.8;
        speed.y *= 0.8;
      }, 10);
    }
  }

  if (env.supportsTouch) {
    i.event.bind(element, 'touchstart', touchStart);
    i.event.bind(element, 'touchmove', touchMove);
    i.event.bind(element, 'touchend', touchEnd);
  } else if (env.supportsIePointer) {
    if (window.PointerEvent) {
      i.event.bind(element, 'pointerdown', touchStart);
      i.event.bind(element, 'pointermove', touchMove);
      i.event.bind(element, 'pointerup', touchEnd);
    } else if (window.MSPointerEvent) {
      i.event.bind(element, 'MSPointerDown', touchStart);
      i.event.bind(element, 'MSPointerMove', touchMove);
      i.event.bind(element, 'MSPointerUp', touchEnd);
    }
  }
}

var defaultSettings = function () { return ({
  handlers: ['click-rail', 'drag-thumb', 'keyboard', 'wheel', 'touch'],
  maxScrollbarLength: null,
  minScrollbarLength: null,
  scrollingThreshold: 1000,
  scrollXMarginOffset: 0,
  scrollYMarginOffset: 0,
  suppressScrollX: false,
  suppressScrollY: false,
  swipeEasing: true,
  useBothWheelAxes: false,
  wheelPropagation: true,
  wheelSpeed: 1,
}); };

var handlers = {
  'click-rail': clickRail,
  'drag-thumb': dragThumb,
  keyboard: keyboard,
  wheel: wheel,
  touch: touch,
};

var PerfectScrollbar = function PerfectScrollbar(element, userSettings) {
  var this$1 = this;
  if ( userSettings === void 0 ) userSettings = {};

  if (typeof element === 'string') {
    element = document.querySelector(element);
  }

  if (!element || !element.nodeName) {
    throw new Error('no element is specified to initialize PerfectScrollbar');
  }

  this.element = element;

  element.classList.add(cls.main);

  this.settings = defaultSettings();
  for (var key in userSettings) {
    this.settings[key] = userSettings[key];
  }

  this.containerWidth = null;
  this.containerHeight = null;
  this.contentWidth = null;
  this.contentHeight = null;

  var focus = function () { return element.classList.add(cls.state.focus); };
  var blur = function () { return element.classList.remove(cls.state.focus); };

  this.isRtl = get(element).direction === 'rtl';
  if (this.isRtl === true) {
    element.classList.add(cls.rtl);
  }
  this.isNegativeScroll = (function () {
    var originalScrollLeft = element.scrollLeft;
    var result = null;
    element.scrollLeft = -1;
    result = element.scrollLeft < 0;
    element.scrollLeft = originalScrollLeft;
    return result;
  })();
  this.negativeScrollAdjustment = this.isNegativeScroll
    ? element.scrollWidth - element.clientWidth
    : 0;
  this.event = new EventManager();
  this.ownerDocument = element.ownerDocument || document;

  this.scrollbarXRail = div(cls.element.rail('x'));
  element.appendChild(this.scrollbarXRail);
  this.scrollbarX = div(cls.element.thumb('x'));
  this.scrollbarXRail.appendChild(this.scrollbarX);
  this.scrollbarX.setAttribute('tabindex', 0);
  this.event.bind(this.scrollbarX, 'focus', focus);
  this.event.bind(this.scrollbarX, 'blur', blur);
  this.scrollbarXActive = null;
  this.scrollbarXWidth = null;
  this.scrollbarXLeft = null;
  var railXStyle = get(this.scrollbarXRail);
  this.scrollbarXBottom = parseInt(railXStyle.bottom, 10);
  if (isNaN(this.scrollbarXBottom)) {
    this.isScrollbarXUsingBottom = false;
    this.scrollbarXTop = toInt(railXStyle.top);
  } else {
    this.isScrollbarXUsingBottom = true;
  }
  this.railBorderXWidth =
    toInt(railXStyle.borderLeftWidth) + toInt(railXStyle.borderRightWidth);
  // Set rail to display:block to calculate margins
  set(this.scrollbarXRail, { display: 'block' });
  this.railXMarginWidth =
    toInt(railXStyle.marginLeft) + toInt(railXStyle.marginRight);
  set(this.scrollbarXRail, { display: '' });
  this.railXWidth = null;
  this.railXRatio = null;

  this.scrollbarYRail = div(cls.element.rail('y'));
  element.appendChild(this.scrollbarYRail);
  this.scrollbarY = div(cls.element.thumb('y'));
  this.scrollbarYRail.appendChild(this.scrollbarY);
  this.scrollbarY.setAttribute('tabindex', 0);
  this.event.bind(this.scrollbarY, 'focus', focus);
  this.event.bind(this.scrollbarY, 'blur', blur);
  this.scrollbarYActive = null;
  this.scrollbarYHeight = null;
  this.scrollbarYTop = null;
  var railYStyle = get(this.scrollbarYRail);
  this.scrollbarYRight = parseInt(railYStyle.right, 10);
  if (isNaN(this.scrollbarYRight)) {
    this.isScrollbarYUsingRight = false;
    this.scrollbarYLeft = toInt(railYStyle.left);
  } else {
    this.isScrollbarYUsingRight = true;
  }
  this.scrollbarYOuterWidth = this.isRtl ? perfect_scrollbar_esm_outerWidth(this.scrollbarY) : null;
  this.railBorderYWidth =
    toInt(railYStyle.borderTopWidth) + toInt(railYStyle.borderBottomWidth);
  set(this.scrollbarYRail, { display: 'block' });
  this.railYMarginHeight =
    toInt(railYStyle.marginTop) + toInt(railYStyle.marginBottom);
  set(this.scrollbarYRail, { display: '' });
  this.railYHeight = null;
  this.railYRatio = null;

  this.reach = {
    x:
      element.scrollLeft <= 0
        ? 'start'
        : element.scrollLeft >= this.contentWidth - this.containerWidth
        ? 'end'
        : null,
    y:
      element.scrollTop <= 0
        ? 'start'
        : element.scrollTop >= this.contentHeight - this.containerHeight
        ? 'end'
        : null,
  };

  this.isAlive = true;

  this.settings.handlers.forEach(function (handlerName) { return handlers[handlerName](this$1); });

  this.lastScrollTop = Math.floor(element.scrollTop); // for onScroll only
  this.lastScrollLeft = element.scrollLeft; // for onScroll only
  this.event.bind(this.element, 'scroll', function (e) { return this$1.onScroll(e); });
  updateGeometry(this);
};

PerfectScrollbar.prototype.update = function update () {
  if (!this.isAlive) {
    return;
  }

  // Recalcuate negative scrollLeft adjustment
  this.negativeScrollAdjustment = this.isNegativeScroll
    ? this.element.scrollWidth - this.element.clientWidth
    : 0;

  // Recalculate rail margins
  set(this.scrollbarXRail, { display: 'block' });
  set(this.scrollbarYRail, { display: 'block' });
  this.railXMarginWidth =
    toInt(get(this.scrollbarXRail).marginLeft) +
    toInt(get(this.scrollbarXRail).marginRight);
  this.railYMarginHeight =
    toInt(get(this.scrollbarYRail).marginTop) +
    toInt(get(this.scrollbarYRail).marginBottom);

  // Hide scrollbars not to affect scrollWidth and scrollHeight
  set(this.scrollbarXRail, { display: 'none' });
  set(this.scrollbarYRail, { display: 'none' });

  updateGeometry(this);

  processScrollDiff(this, 'top', 0, false, true);
  processScrollDiff(this, 'left', 0, false, true);

  set(this.scrollbarXRail, { display: '' });
  set(this.scrollbarYRail, { display: '' });
};

PerfectScrollbar.prototype.onScroll = function onScroll (e) {
  if (!this.isAlive) {
    return;
  }

  updateGeometry(this);
  processScrollDiff(this, 'top', this.element.scrollTop - this.lastScrollTop);
  processScrollDiff(
    this,
    'left',
    this.element.scrollLeft - this.lastScrollLeft
  );

  this.lastScrollTop = Math.floor(this.element.scrollTop);
  this.lastScrollLeft = this.element.scrollLeft;
};

PerfectScrollbar.prototype.destroy = function destroy () {
  if (!this.isAlive) {
    return;
  }

  this.event.unbindAll();
  remove(this.scrollbarX);
  remove(this.scrollbarY);
  remove(this.scrollbarXRail);
  remove(this.scrollbarYRail);
  this.removePsClasses();

  // unset elements
  this.element = null;
  this.scrollbarX = null;
  this.scrollbarY = null;
  this.scrollbarXRail = null;
  this.scrollbarYRail = null;

  this.isAlive = false;
};

PerfectScrollbar.prototype.removePsClasses = function removePsClasses () {
  this.element.className = this.element.className
    .split(' ')
    .filter(function (name) { return !name.match(/^ps([-_].+|)$/); })
    .join(' ');
};

/* harmony default export */ const perfect_scrollbar_esm = (PerfectScrollbar);
//# sourceMappingURL=perfect-scrollbar.esm.js.map

;// CONCATENATED MODULE: ./src/js/pages/_pages-calendar-1.js
/**
 * @file pagesCalendar1
 * @author Beatriz Sopeña Merino <beatrizsmerino@gmail.com>
 * @copyright (2023)
 */





document.addEventListener("DOMContentLoaded", async function () {
	const pageCalendar1 = document
		.querySelector("html")
		.classList.contains("page-calendar-1");

	if (pageCalendar1) {
		const settings = {
			languages: [
				{
					value: "en",
					text: "English",
					selected: true,
				},
				{
					value: "fr",
					text: "French",
					selected: false,
				},
				{
					value: "de",
					text: "German",
					selected: false,
				},
				{
					value: "es",
					text: "Spanish",
					selected: false,
				},
			],
			months: {
				en: [
					"January",
					"February",
					"March",
					"April",
					"May",
					"June",
					"July",
					"August",
					"September",
					"October",
					"November",
					"December",
				],
				fr: [
					"Janvier",
					"Février",
					"Mars",
					"Avril",
					"Mai",
					"Juin",
					"Juillet",
					"Août",
					"Septembre",
					"Octobre",
					"Novembre",
					"Décembre",
				],
				de: [
					"Januar",
					"Februar",
					"März",
					"April",
					"Mai",
					"Juni",
					"Juli",
					"August",
					"September",
					"Oktober",
					"November",
					"Dezember",
				],
				es: [
					"Enero",
					"Febrero",
					"Marzo",
					"Abril",
					"Mayo",
					"Junio",
					"Julio",
					"Agosto",
					"Septiembre",
					"Octubre",
					"Noviembre",
					"Diciembre",
				],
			},
			weeks: {
				en: [
					{
						value: 1,
						text: "Monday",
						selected: false,
					},
					{
						value: 2,
						text: "Tuesday",
						selected: false,
					},
					{
						value: 3,
						text: "Wednesday",
						selected: false,
					},
					{
						value: 4,
						text: "Thursday",
						selected: false,
					},
					{
						value: 5,
						text: "Friday",
						selected: false,
					},
					{
						value: 6,
						text: "Saturday",
						selected: false,
					},
					{
						value: 7,
						text: "Sunday",
						selected: true,
					},
				],
				fr: [
					{
						value: 1,
						text: "Lundi",
						selected: false,
					},
					{
						value: 2,
						text: "Mardi",
						selected: false,
					},
					{
						value: 3,
						text: "Mercredi",
						selected: false,
					},
					{
						value: 4,
						text: "Jeudi",
						selected: false,
					},
					{
						value: 5,
						text: "Vendredi",
						selected: false,
					},
					{
						value: 6,
						text: "Samedi",
						selected: false,
					},
					{
						value: 7,
						text: "Dimanche",
						selected: true,
					},
				],
				de: [
					{
						value: 1,
						text: "Montag",
						selected: false,
					},
					{
						value: 2,
						text: "Dienstag",
						selected: false,
					},
					{
						value: 3,
						text: "Mittwoch",
						selected: false,
					},
					{
						value: 4,
						text: "Donnerstag",
						selected: false,
					},
					{
						value: 5,
						text: "Freitag",
						selected: false,
					},
					{
						value: 6,
						text: "Samstag",
						selected: false,
					},
					{
						value: 7,
						text: "Sonntag",
						selected: true,
					},
				],
				es: [
					{
						value: 1,
						text: "Lunes",
						selected: false,
					},
					{
						value: 2,
						text: "Martes",
						selected: false,
					},
					{
						value: 3,
						text: "Miércoles",
						selected: false,
					},
					{
						value: 4,
						text: "Jueves",
						selected: false,
					},
					{
						value: 5,
						text: "Viernes",
						selected: false,
					},
					{
						value: 6,
						text: "Sábado",
						selected: false,
					},
					{
						value: 7,
						text: "Domingo",
						selected: true,
					},
				],
			},
			firstDayOfWeek: async () => {
				const filteredWeeks = Object.entries(settings.weeks).reduce(
					(filteredWeeks, [language, weeks]) => ({
						...filteredWeeks,
						[language]: weeks.filter((week) => [1, 7].includes(week.value)),
					}),
					{}
				);
				return filteredWeeks;
			},
			scrollbar: null,
			showOneMonth: true,
		};

		async function getCurrentYear() {
			const date = new Date();
			const year = date.getFullYear();

			return year;
		}

		async function getCurrentMonth() {
			const date = new Date();
			const month = date.getMonth();

			return month;
		}

		async function getCurrentDay() {
			const date = new Date();
			const day = date.getDate();

			return day;
		}

		async function getDayOfYear(year, day) {
			const dateDay = new Date(year, 0);
			const dayOfYear = new Date(dateDay.setDate(day));

			return dayOfYear;
		}

		async function getFormattedDate(year, month, day) {
			const yyyy = String(year);
			const mm = String(month + 1).padStart(2, "0"); // January is 0!
			const dd = String(day).padStart(2, "0");
			const yearMonthDay = `${yyyy}-${mm}-${dd}`;

			return yearMonthDay;
		}

		async function getToday() {
			const year = await getCurrentYear();
			const month = await getCurrentMonth();
			const day = await getCurrentDay();
			const today = await getFormattedDate(year, month, day);

			return today;
		}

		async function getFirstLetters(string, length) {
			const substring = string.slice(0, length);

			return substring;
		}

		async function scrollbarToggle(action) {
			const container = document.querySelector('.scrollbar');

			if (container) {
				switch (action) {
					case 'create':
						settings.scrollbar = new perfect_scrollbar_esm(container, {
							wheelSpeed: 2,
							wheelPropagation: true,
							minScrollbarLength: 20,
						});
						break;
					case 'update':
						if (settings.scrollbar !== null) {
							settings.scrollbar.update();
						}
						break;
					case 'remove':
						if (settings.scrollbar !== null) {
							settings.scrollbar.destroy();
							settings.scrollbar = null;
						}
						break;
					default:
						console.log("Invalid action");
				}
			}
		}

		async function scrollbarSmooth(element, targetPosition, duration) {
			const startPosition = element.scrollLeft;
			const distance = targetPosition - startPosition;
			const startTime = performance.now();

			async function scrollAnimation() {
				const currentTime = performance.now();
				const animationDuration = currentTime - startTime;
				const scrollProgress = Math.min(animationDuration / duration, 1);
				element.scrollLeft = startPosition + distance * scrollProgress;

				if (animationDuration < duration) {
					await new Promise((resolve) => requestAnimationFrame(resolve));
					await scrollAnimation();
				}
			}

			await scrollAnimation();
		}

		async function calendarGetWeeks(numLetters) {
			const weekList = await calendarFirstDayOfWeekSort();

			for (const key in weekList) {
				const day = weekList[key];
				day.abbreviation = await getFirstLetters(day.text, numLetters);
			}

			return weekList;
		}

		async function calendarSetDays(startDay) {
			const thisYear = await getCurrentYear();
			let week = 0;

			for (let day = 1; day < 366; day++) {
				const dayOfYear = await getDayOfYear(thisYear, day);
				const dateDay = dayOfYear.getDate();
				const dateMonth = dayOfYear.getMonth();
				let dateWeek = dayOfYear.getDay();
				const isWeekend = (dateWeek === 6) || (dateWeek === 0); // 6 = Saturday, 0 = Sunday

				if (dateDay == 1) {
					week = 0;
				}

				// Adjust day of week if needed
				if (startDay === 1) {
					dateWeek = (dateWeek + 6) % 7; // Shift Sunday from 0 to 6
				}

				// Insert days in the calendar
				const calendarTableList = document.querySelectorAll(".calendar__table");
				const tableDays = calendarTableList[dateMonth].children[2].children[week].children[dateWeek];
				tableDays.innerHTML = `<span class="calendar__number">${dateDay}</span><span class="calendar__circle"></span>`;

				const yearMonthDay = await getFormattedDate(thisYear, dateMonth, dateDay);
				tableDays.dataset.time = yearMonthDay;

				const today = await getToday();
				if (tableDays.dataset.time == today) {
					tableDays.classList.add("calendar__today");
				}

				if (isWeekend) {
					tableDays.classList.add("calendar__weekend");
				}

				if (dateWeek == 6) {
					week++;
				}
			}
		}

		async function calendarSetWidth() {
			const calendar = document.querySelector("#calendar");
			const calendarMonth = document.querySelector(".calendar__month");
			const calendarMonthWidth = calendarMonth.clientWidth;

			if (calendar.classList.contains("is-show-months")) {
				calendar.style.width = `auto`;
			} else {
				calendar.style.width = `${calendarMonthWidth}px`;
			}
		}

		async function calendarRemoveStructure() {
			const calendar = document.querySelector("#calendar");
			calendar.innerHTML = "";
		}

		async function calendarCreateStructure(monthList, weekList) {
			async function calendarYearCreate() {
				const calendarYear = document.createElement("div");
				calendarYear.className = "calendar__year";
				calendarYear.innerText = await getCurrentYear();
				document.getElementById("calendar").appendChild(calendarYear);
			}

			async function calendarInnerCreate() {
				const calendarInner = document.createElement("div");
				calendarInner.className = "calendar__inner scrollbar";
				document.getElementById("calendar").appendChild(calendarInner);
			}

			async function calendarMonthCreate() {
				const calendarInner = document.querySelector(".calendar__inner");
				const calendarMonth = document.createElement("DIV");
				calendarMonth.className = "calendar__month";
				calendarInner.appendChild(calendarMonth);
			}

			async function calendarTableCreate() {
				const calendarMonthList = document.querySelectorAll(".calendar__month");
				const calendarTable = document.createElement("TABLE");
				calendarTable.className = "calendar__table";
				[...calendarMonthList].map((item) =>
					item.appendChild(calendarTable)
				);
			}

			async function calendarCaptionCreate() {
				const calendarTableList = document.querySelectorAll(".calendar__table");
				const calendarCaption = document.createElement("CAPTION");
				calendarCaption.className = "calendar__caption";
				[...calendarTableList].map((item) =>
					item.appendChild(calendarCaption)
				);
			}

			async function calendarTitleCreate(monthList, month) {
				const calendarCaptionList = document.querySelectorAll(".calendar__caption");
				const calendarTitle = document.createElement("DIV");
				calendarTitle.className = "calendar__title";
				calendarTitle.innerText = monthList[month];
				[...calendarCaptionList].map((item) =>
					item.appendChild(calendarTitle)
				);
			}

			async function calendarHeaderCreate() {
				const calendarTableList = document.querySelectorAll(".calendar__table");
				const calendarHeader = document.createElement("THEAD");
				calendarHeader.className = "calendar__header";
				[...calendarTableList].map((item) => item.appendChild(calendarHeader));
			}

			async function calendarRowCreate(contain) {
				const calendarRow = document.createElement("TR");
				calendarRow.className = "calendar__row";
				[...contain].map((item) => item.appendChild(calendarRow));
			}

			async function calendarWeekCreate(weekList, week) {
				const calendarRowList = document.querySelectorAll(".calendar__header .calendar__row");
				const calendarWeek = document.createElement("TH");

				calendarWeek.className = "calendar__cell calendar__week";
				calendarWeek.innerText = weekList[week].abbreviation;
				calendarWeek.title = weekList[week].text;
				[...calendarRowList].map((item) => item.appendChild(calendarWeek));
			}

			async function calendarBodyCreate() {
				const calendarTableList = document.querySelectorAll(".calendar__table");
				const calendarBody = document.createElement("TBODY");
				calendarBody.className = "calendar__body";
				[...calendarTableList].map((item) =>
					item.appendChild(calendarBody)
				);
			}

			async function calendarDayCreate() {
				const calendarRowList = document.querySelectorAll(".calendar__row");
				const calendarDay = document.createElement("TD");
				calendarDay.className = "calendar__cell calendar__day";
				calendarDay.innerText = "";
				[...calendarRowList].map((item) => item.appendChild(calendarDay));
			}

			async function calendarAllMonthsCreate() {
				for (let month = 0; month <= 11; month++) {
					await calendarMonthCreate();
					await calendarTableCreate();
					await calendarCaptionCreate();
					await calendarTitleCreate(monthList, month);
					await calendarHeaderCreate();

					const calendarHeaderList = document.querySelectorAll(".calendar__header");
					await calendarRowCreate(calendarHeaderList);

					for (let week = 0; week < 7; week++) {
						await calendarWeekCreate(weekList, week);
					}

					await calendarBodyCreate();

					for (let row = 0; row < 6; row++) {
						const calendarBodyList = document.querySelectorAll(".calendar__body");
						await calendarRowCreate(calendarBodyList);

						for (let day = 0; day < 7; day++) {
							await calendarDayCreate();
						}
					}
				}
			}

			await calendarYearCreate();
			await calendarInnerCreate();
			await calendarAllMonthsCreate();
		}

		async function calendarMoveScrollToday() {
			const header = document.querySelector(".header");
			const calendarInner = document.querySelector(".calendar__inner");
			const calendarMonthList = document.querySelectorAll(".calendar__month");
			const currentMonth = await getCurrentMonth();

			let positionScroll = 0;
			if (settings.showOneMonth) {
				for (let month = 0; month < currentMonth; month++) {
					const style =
						calendarMonthList[month].currentStyle ||
						window.getComputedStyle(calendarMonthList[month]);
					positionScroll +=
						parseFloat(calendarMonthList[month].offsetWidth) +
						parseFloat(style.marginRight);
				}

				await scrollbarSmooth(calendarInner, positionScroll, 500);
			} else {
				positionScroll = calendarMonthList[currentMonth].offsetTop - header.offsetHeight;
				window.scrollTo({ top: positionScroll, behavior: 'smooth' });
			}
		}

		async function calendarShowAllMonths() {
			const calendar = document.querySelector("#calendar");
			const buttonShowMonths = document.querySelector("#buttonShowMonths");
			const buttonShowToday = document.querySelector("#buttonShowToday");

			buttonShowMonths.classList.toggle("is-change-text");
			calendar.classList.toggle("is-show-months");
			settings.showOneMonth = !settings.showOneMonth;

			await calendarSetWidth();

			if (calendar.classList.contains("is-show-months")) {
				await scrollbarToggle("remove");
			} else {
				await scrollbarToggle("create");
			}

			await buttonShowToday.click();
		}

		async function calendarGeneratePDF() {
			const originalTitle = document.title;
			const today = await getToday();
			const currentTitle = `Calendar-${today}`;

			async function waitForPrintWindowClosed() {
				while (window.matchMedia('print').matches) {
					await new Promise(resolve => setTimeout(resolve, 1000));
				}
				document.title = originalTitle;
				await calendarCreate();
			}

			document.title = currentTitle;
			await calendarCreate(1);
			window.print();
			await waitForPrintWindowClosed();
		}

		async function calendarFirstDayOfWeekSort() {
			const languageSelected = await calendarLanguageGetSelected();
			const weeksLanguageSelected = await settings.weeks[languageSelected.value];
			const firstDayOfWeekSelected = (await calendarFirstDayOfWeekGetSelected()).value;

			await weeksLanguageSelected.sort((a, b) => a.value - b.value);

			const weekSelected = weeksLanguageSelected.find((week) => week.value === firstDayOfWeekSelected);
			const weekStart = weeksLanguageSelected.filter((week) => week.value > firstDayOfWeekSelected);
			const weekEnd = weeksLanguageSelected.filter((week) => week.value < firstDayOfWeekSelected);

			const weeksOrdered = [weekSelected, ...weekStart, ...weekEnd];

			return weeksOrdered;
		}

		async function calendarFirstDayOfWeekGetSelected() {
			const languageSelected = await calendarLanguageGetSelected();
			const filteredWeeks = await settings.firstDayOfWeek();
			const firstDayOfWeek = filteredWeeks[languageSelected.value];
			const selectedDay = firstDayOfWeek.find((item) => item.selected);

			return selectedDay;
		}

		async function calendarFirstDayOfWeekCreateStructure() {
			const select = document.querySelector("#selectFirstDayOfWeek");
			const optionList = select.querySelectorAll("option");
			const languageSelected = await calendarLanguageGetSelected();
			const filteredWeeks = await settings.firstDayOfWeek();
			const firstDayOfWeekList = filteredWeeks[languageSelected.value];

			optionList.forEach((item, index) => {
				if (index !== 0) {
					item.remove();
				}
			});

			firstDayOfWeekList.forEach((item) => {
				const option = document.createElement("option");
				option.value = item.value;
				option.innerText = item.text;
				select.appendChild(option);
			});
		}

		async function calendarFirstDayOfWeekUpdateStructure() {
			const select = document.querySelector("#selectFirstDayOfWeek");
			const firstOption = select.querySelectorAll("option")[0];
			const firstDayOfWeekSelected = await calendarFirstDayOfWeekGetSelected();

			firstOption.value = firstDayOfWeekSelected.value;
			firstOption.innerText = `First day of week: ${firstDayOfWeekSelected.text}`;
			select.value = firstDayOfWeekSelected.value;
		}

		async function calendarFirstDayOfWeekChange(firstDayOfWeekChanged) {
			const languageSelected = await calendarLanguageGetSelected();
			const firstDayOfWeek = parseInt(firstDayOfWeekChanged.value);
			const firstDayOfWeekList = await settings.firstDayOfWeek()[languageSelected.value];

			firstDayOfWeekList.forEach(
				(item) => (item.selected = item.value === firstDayOfWeek)
			);

			await calendarFirstDayOfWeekUpdateStructure();
			await calendarCreate();
		}

		async function calendarLanguageGetSelected() {
			const languageSelected = settings.languages.find((item) => item.selected);

			return languageSelected;
		}

		async function calendarLanguageCreateStructure() {
			const select = document.querySelector("#selectLanguage");

			if (select.querySelectorAll("option").length === 1) {
				settings.languages.forEach((item) => {
					const option = document.createElement("option");
					option.value = item.value;
					option.innerText = item.text;
					select.appendChild(option);
				});
			}
		}

		async function calendarLanguageUpdateStructure() {
			const select = document.querySelector("#selectLanguage");
			const firstOption = select.querySelectorAll("option")[0];
			const languageSelected = await calendarLanguageGetSelected();

			firstOption.value = languageSelected.value;
			firstOption.innerText = `Language: ${languageSelected.text}`;
			select.value = languageSelected.value;
		}

		async function calendarLanguageChange(languageChanged) {
			const selectedValue = languageChanged.value;
			const languageList = settings.languages;
			languageList.forEach((item) => (item.selected = item.value === selectedValue));
			await calendarLanguageUpdateStructure();
			await calendarCreate();
		}

		async function calendarCreate(numLetters = 3) {
			const languageSelected = await calendarLanguageGetSelected();
			const firstDayOfWeekSelected = await calendarFirstDayOfWeekGetSelected();
			const monthList = await settings.months[languageSelected.value];
			const weekList = await calendarGetWeeks(numLetters);

			await calendarRemoveStructure();
			await calendarCreateStructure(monthList, weekList);
			await calendarSetDays(firstDayOfWeekSelected.value);
			await calendarSetWidth();
			await scrollbarToggle("create");
			await calendarMoveScrollToday();
			await calendarFirstDayOfWeekCreateStructure();
			await calendarLanguageCreateStructure();
		}

		async function calendarEvents() {
			const buttonShowToday = document.querySelector("#buttonShowToday");
			const buttonShowMonths = document.querySelector("#buttonShowMonths");
			const buttonPrint = document.querySelector("#buttonPrint");
			const selectLanguage = document.querySelector("#selectLanguage");
			const selectFirstDayOfWeek = document.querySelector("#selectFirstDayOfWeek");

			buttonShowToday.addEventListener("click", async function () {
				await calendarMoveScrollToday();
			});

			buttonShowMonths.addEventListener("click", async function () {
				await calendarShowAllMonths();
			});

			buttonPrint.addEventListener("click", async function () {
				await calendarGeneratePDF();
			});

			selectLanguage.addEventListener("change", async function () {
				await calendarLanguageChange(this);
				await calendarFirstDayOfWeekChange(selectFirstDayOfWeek);
			});

			selectFirstDayOfWeek.addEventListener("change", async function () {
				await calendarFirstDayOfWeekChange(this);
			});

			window.addEventListener("resize", async function () {
				await calendarSetWidth();
			});
		}

		async function calendarInit() {
			await calendarCreate();
			await calendarEvents();
		}

		await calendarInit();
	}
});

})();

// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
(() => {
/**
 * @file pagesCalendar2
 * @author Beatriz Sopeña Merino <beatrizsmerino@gmail.com>
 * @copyright (2023)
 */



document.addEventListener("DOMContentLoaded", function () {
	const pageCalendar2 = document
		.querySelector("html")
		.classList.contains("page-calendar-2");

	if (pageCalendar2) {
		const settings = {
			months: [
				"Enero",
				"Febrero",
				"Marzo",
				"Abril",
				"Mayo",
				"Junio",
				"Julio",
				"Agosto",
				"Septiembre",
				"Octubre",
				"Noviembre",
				"Diciembre",
			],
			weeks: [
				"Lunes",
				"Martes",
				"Miércoles",
				"Jueves",
				"Viernes",
				"Sábado",
				"Domingo",
			],
		};

		function getCurrentYear() {
			const date = new Date();
			return date.getFullYear();
		}

		function getCurrentMonth() {
			const date = new Date();

			// January is 0!
			return date.getMonth() + 1;
		}

		function getCurrentDay() {
			const date = new Date();
			return date.getDate();
		}

		function getFormattedDate(year, month, day) {
			const yyyy = String(year);
			const mm = String(month).padStart(2, "0");
			const dd = String(day).padStart(2, "0");
			const yearMonthDay = `${yyyy}-${mm}-${dd}`;
			return yearMonthDay;
		}

		function getToday() {
			const today = getFormattedDate(
				getCurrentYear(),
				getCurrentMonth(),
				getCurrentDay()
			);
			return today;
		}

		function getFirstLetters(words, length) {
			const wordsFormatted = words.map((item) => item.slice(0, length));
			return wordsFormatted;
		}

		function calendarInnerCreate() {
			const calendar = document.getElementById("calendar");
			const calendarInner = document.createElement("div");
			calendarInner.className = "calendar__inner";
			calendar.appendChild(calendarInner);
		}

		function calendarMonthCreate() {
			const calendarInner = document.querySelector(".calendar__inner");
			const calendarMonth = document.createElement("DIV");
			calendarMonth.className = "calendar__month";
			calendarInner.appendChild(calendarMonth);
		}

		function calendarTableCreate() {
			const calendarMonth = document.querySelectorAll(".calendar__month");
			const calendarTable = document.createElement("TABLE");
			calendarTable.className = "calendar__table";
			[...calendarMonth].map((item) => item.appendChild(calendarTable));
		}

		function calendarHeaderCreate() {
			const calendarTable = document.querySelectorAll(".calendar__table");
			const calendarHeader = document.createElement("THEAD");
			calendarHeader.className = "calendar__header";
			[...calendarTable].map((item) => item.appendChild(calendarHeader));
		}

		function calendarCaptionCreate() {
			const calendarTable = document.querySelectorAll(".calendar__table");
			const calendarCaption = document.createElement("CAPTION");
			calendarCaption.className = "calendar__caption";
			[...calendarTable].map((item) => item.appendChild(calendarCaption));
		}

		function calendarRowCreate(contain) {
			const calendarRow = document.createElement("TR");
			calendarRow.className = "calendar__row";
			[...contain].map((item) => item.appendChild(calendarRow));
		}

		function calendarWeekCreate() {
			const weekList = settings.weeks;
			const weekListFormatted = getFirstLetters(weekList, 3);
			for (let week = 0; week < 7; week++) {
				const calendarRow = document.querySelectorAll(".calendar__header .calendar__row");
				const calendarWeek = document.createElement("TH");
				calendarWeek.className = "calendar__cell calendar__week";
				calendarWeek.innerText = weekListFormatted[week];
				[...calendarRow].map((item) => item.appendChild(calendarWeek));
			}
		}

		function calendarBodyCreate() {
			const calendarTable = document.querySelectorAll(".calendar__table");
			const calendarBody = document.createElement("TBODY");
			calendarBody.className = "calendar__body";
			[...calendarTable].map((item) => item.appendChild(calendarBody));
		}

		function calendarDayCreate(year, month, day) {
			const calendarDay = document.createElement("TD");

			if (getToday() === getFormattedDate(year, month, day)) {
				calendarDay.className = "calendar__cell calendar__day calendar__today";
			} else {
				calendarDay.className = "calendar__cell calendar__day";
			}

			if (day != 0) {
				const yearMonthDay = getFormattedDate(year, month, day);
				calendarDay.setAttribute("data-time", yearMonthDay);
				calendarDay.innerHTML = `<span>${day}</span>`;
			}

			return calendarDay.outerHTML;
		}

		function calendarAllDaysCreate(year, month) {
			var now = new Date(year, month - 1, 1);
			var last = new Date(year, month, 0);
			var firstDayOfWeek = now.getDay() == 0 ? 7 : now.getDay();
			var lastDayOfMonth = last.getDate();
			var day = 0;
			var result = '<tr class="calendar__row">';
			var lastCell = firstDayOfWeek + lastDayOfMonth;

			// Created loop up to 42, which is the maximum number of values that can be present.
			// 6 columns of 7 days
			for (var i = 1; i <= 42; i++) {
				if (i == firstDayOfWeek) {
					// Determine on which day it starts
					day = 1;
				}

				if (i < firstDayOfWeek || i >= lastCell) {
					let emptyCell = calendarDayCreate("00", "00", "00");
					result += emptyCell;
				} else {
					// Show the day
					if (
						day == getCurrentDay() &&
						month == getCurrentMonth() &&
						year == getCurrentYear()
					) {
						let todayCell = calendarDayCreate(year, month, day);
						result += todayCell;
					} else {
						let dayCell = calendarDayCreate(year, month, day);
						result += dayCell;
					}
					day++;
				}
				if (i % 7 == 0) {
					if (day > lastDayOfMonth) break;
					result += '</tr><tr class="calendar__row">';
				}
			}
			result += "</tr>";

			document.querySelector(".calendar__body").innerHTML = result;
		}

		function calendarSetWeekend() {
			const weekendSaturdays = document.querySelectorAll(
				".calendar__body .calendar__row .calendar__cell:nth-child(6)"
			);

			const weekendSundays = document.querySelectorAll(
				".calendar__body .calendar__row .calendar__cell:nth-child(7)"
			);

			[...weekendSaturdays, ...weekendSundays].map((item) => {
				if (item.childNodes.length) {
					item.classList.add("calendar__weekend");
				}
			});
		}

		function calendarRemoveStructure() {
			const calendar = document.querySelector("#calendar");
			calendar.innerHTML = "";
		}

		function calendarCreateStructure() {
			calendarInnerCreate();
			calendarMonthCreate();
			calendarTableCreate();
			calendarCaptionCreate();
			calendarHeaderCreate();
			calendarRowCreate(document.querySelectorAll(".calendar__header"));
			calendarWeekCreate();
			calendarBodyCreate();
		}

		function calendarButtonsPrevAndNext(year, month) {
			year = parseInt(year);
			month = parseInt(month);

			// Calculate the next month and year
			let nextMonth = (month + 1 > 12) ? 1 : month + 1;
			let nextYear = (month + 1 > 12) ? year + 1 : year;

			// Calculate the previous month and year
			let prevMonth = (month - 1 < 1) ? 12 : month - 1;
			let prevYear = (month - 1 < 1) ? year - 1 : year;

			let captionTemplate = `
					<div class="calendar__title">
						<span class='calendar__year-name'>
							${year}
						</span>
						<span class='calendar__month-name'>
							${settings.months[month - 1]}
						</span>
					</div>
					<nav class="calendar__navigation">
						<ul class="list">
							<li class="list__item">
								<a class="calendar__button-prev button button--line-black" date-year="${prevYear}" date-month="${prevMonth}"'>
									<i class="icon">
										<svg class="icon__svg">
											<use class="icon__use" href="#icon-chevron-left" />
										</svg>
									</i>
								</a>
							</li>
							<li class="list__item">
								<a class="calendar__button-next button button--line-black" date-year="${nextYear}" date-month="${nextMonth}"'>
									<i class="icon">
										<svg class="icon__svg">
											<use class="icon__use" href="#icon-chevron-right" />
										</svg>
									</i>
								</a>
							</li>
						</ul>
					</nav>
				`;

			document.querySelector(".calendar__caption").innerHTML = captionTemplate;

			let buttonPrev = document.querySelectorAll(".calendar__button-prev");
			let buttonNext = document.querySelectorAll(".calendar__button-next");

			[...buttonPrev, ...buttonNext].map((item) =>
				item.addEventListener("click", function () {
					let year = this.getAttribute("date-year");
					let month = this.getAttribute("date-month");
					calendarCreate(year, month);
				})
			);
		}

		function calendarCreate(year, month) {
			calendarRemoveStructure();
			calendarCreateStructure();
			calendarButtonsPrevAndNext(year, month);
			calendarAllDaysCreate(year, month);
			calendarSetWeekend();
		}

		function calendarEvents() {
			let buttonToday = document.getElementById("goToday");
			let buttonNextYear = document.getElementById("goNextYear");
			let buttonLastYear = document.getElementById("goLastYear");

			buttonToday.addEventListener("click", function () {
				calendarCreate(getCurrentYear(), getCurrentMonth());
			});

			buttonNextYear.addEventListener("click", function () {
				calendarCreate(getCurrentYear() + 1, getCurrentMonth());
			});

			buttonLastYear.addEventListener("click", function () {
				calendarCreate(getCurrentYear() - 1, getCurrentMonth());
			});
		}

		calendarCreate(getCurrentYear(), getCurrentMonth());
		calendarEvents();
	}
});

})();

// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
(() => {
/**
 * @file pagesCalendar3
 * @author Beatriz Sopeña Merino <beatrizsmerino@gmail.com>
 * @copyright (2023)
 */



document.addEventListener("DOMContentLoaded", function () {
	const pageCalendar2 = document
		.querySelector("html")
		.classList.contains("page-calendar-3");

	if (pageCalendar2) {
		const settings = {
			months: [
				"Enero",
				"Febrero",
				"Marzo",
				"Abril",
				"Mayo",
				"Junio",
				"Julio",
				"Agosto",
				"Septiembre",
				"Octubre",
				"Noviembre",
				"Diciembre",
			],
			weeks: [
				"Lunes",
				"Martes",
				"Miércoles",
				"Jueves",
				"Viernes",
				"Sábado",
				"Domingo",
			],
		};

		function getCurrentYear() {
			const date = new Date();
			return date.getFullYear();
		}

		function getCurrentMonth() {
			const date = new Date();

			// January is 0!
			return date.getMonth() + 1;
		}

		function getCurrentDay() {
			const date = new Date();
			return date.getDate();
		}

		function getFormattedDate(year, month, day) {
			const yyyy = String(year);
			const mm = String(month).padStart(2, "0");
			const dd = String(day).padStart(2, "0");
			const yearMonthDay = `${yyyy}-${mm}-${dd}`;
			return yearMonthDay;
		}

		function getToday() {
			const today = getFormattedDate(
				getCurrentYear(),
				getCurrentMonth(),
				getCurrentDay()
			);
			return today;
		}

		function getFirstLetters(words, length) {
			const wordsFormatted = words.map((item) => item.slice(0, length));
			return wordsFormatted;
		}

		function calendarInnerCreate() {
			const calendar = document.getElementById("calendar");
			const calendarInner = document.createElement("div");
			calendarInner.className = "calendar__inner";
			calendar.appendChild(calendarInner);
		}

		function calendarMonthCreate() {
			const calendarInner = document.querySelector(".calendar__inner");
			const calendarMonth = document.createElement("DIV");
			calendarMonth.className = "calendar__month";
			calendarInner.appendChild(calendarMonth);
		}

		function calendarTableCreate() {
			const calendarMonth = document.querySelectorAll(".calendar__month");
			const calendarTable = document.createElement("TABLE");
			calendarTable.className = "calendar__table";
			[...calendarMonth].map((item) => item.appendChild(calendarTable));
		}

		function calendarHeaderCreate() {
			const calendarTable = document.querySelectorAll(".calendar__table");
			const calendarHeader = document.createElement("THEAD");
			calendarHeader.className = "calendar__header";
			[...calendarTable].map((item) => item.appendChild(calendarHeader));
		}

		function calendarCaptionCreate() {
			const calendarTable = document.querySelectorAll(".calendar__table");
			const calendarCaption = document.createElement("CAPTION");
			calendarCaption.className = "calendar__caption";
			[...calendarTable].map((item) => item.appendChild(calendarCaption));
		}

		function calendarRowCreate(contain) {
			const calendarRow = document.createElement("TR");
			calendarRow.className = "calendar__row";
			[...contain].map((item) => item.appendChild(calendarRow));
		}

		function calendarWeekCreate() {
			const weekList = settings.weeks;
			const weekListFormatted = getFirstLetters(weekList, 3);
			for (let week = 0; week < 7; week++) {
				const calendarRow = document.querySelectorAll(".calendar__header .calendar__row");
				const calendarWeek = document.createElement("TH");
				calendarWeek.className = "calendar__cell calendar__week";
				calendarWeek.innerText = weekListFormatted[week];
				[...calendarRow].map((item) => item.appendChild(calendarWeek));
			}
		}

		function calendarBodyCreate() {
			const calendarTable = document.querySelectorAll(".calendar__table");
			const calendarBody = document.createElement("TBODY");
			calendarBody.className = "calendar__body";
			[...calendarTable].map((item) => item.appendChild(calendarBody));
		}

		function calendarDayCreate(year, month, day) {
			const calendarDay = document.createElement("TD");

			if (getToday() === getFormattedDate(year, month, day)) {
				calendarDay.className = "calendar__cell calendar__day calendar__today";
			} else {
				calendarDay.className = "calendar__cell calendar__day";
			}

			if (day != 0) {
				const yearMonthDay = getFormattedDate(year, month, day);
				calendarDay.innerHTML = `
						<button class="calendar__day-button button button--icon" data-time="${yearMonthDay}">
							${day}
						</button>
					`;
			}

			return calendarDay.outerHTML;
		}

		function calendarAllDaysCreate(year, month) {
			var now = new Date(year, month - 1, 1);
			var last = new Date(year, month, 0);
			var firstDayOfWeek = now.getDay() == 0 ? 7 : now.getDay();
			var lastDayOfMonth = last.getDate();
			var day = 0;
			var result = '<tr class="calendar__row">';
			var lastCell = firstDayOfWeek + lastDayOfMonth;

			// Created loop up to 42, which is the maximum number of values that can be present.
			// 6 columns of 7 days
			for (var i = 1; i <= 42; i++) {
				if (i == firstDayOfWeek) {
					// Determine on which day it starts
					day = 1;
				}

				if (i < firstDayOfWeek || i >= lastCell) {
					let emptyCell = calendarDayCreate("00", "00", "00");
					result += emptyCell;
				} else {
					// Show the day
					if (
						day == getCurrentDay() &&
						month == getCurrentMonth() &&
						year == getCurrentYear()
					) {
						let todayCell = calendarDayCreate(year, month, day);
						result += todayCell;
					} else {
						let dayCell = calendarDayCreate(year, month, day);
						result += dayCell;
					}
					day++;
				}
				if (i % 7 == 0) {
					if (day > lastDayOfMonth) break;
					result += '</tr><tr class="calendar__row">';
				}
			}
			result += "</tr>";

			document.querySelector(".calendar__body").innerHTML = result;
		}

		function calendarSetWeekend() {
			const weekendSaturdays = document.querySelectorAll(
				".calendar__body .calendar__row .calendar__cell:nth-child(6)"
			);

			const weekendSundays = document.querySelectorAll(
				".calendar__body .calendar__row .calendar__cell:nth-child(7)"
			);

			[...weekendSaturdays, ...weekendSundays].map((item) => {
				if (item.childNodes.length) {
					item.classList.add("calendar__weekend");
				}
			});
		}

		function calendarSetHeight() {
			const calendar = document.querySelector(".calendar");
			const calendarCaption = document.querySelector(".calendar__caption");
			const calendarHeader = document.querySelector(".calendar__header");
			const calendarRow = document.querySelector(".calendar__body .calendar__row");
			// the table has margins between each row -> (2 * 7)
			const calendarHeight = calendarCaption.clientHeight + calendarHeader.clientHeight + (2 * 7) + calendarRow.clientHeight * 6;
			calendar.style.height = `${calendarHeight}px`;
		}

		function calendarRemoveStructure() {
			const calendar = document.querySelector("#calendar");
			calendar.innerHTML = "";
		}

		function calendarCreateStructure() {
			calendarInnerCreate();
			calendarMonthCreate();
			calendarTableCreate();
			calendarCaptionCreate();
			calendarHeaderCreate();
			calendarRowCreate(document.querySelectorAll(".calendar__header"));
			calendarWeekCreate();
			calendarBodyCreate();
		}

		function calendarSelectDay() {
			const calendarDayButton = document.querySelectorAll('.calendar__day-button');
			[...calendarDayButton].map(item => item.addEventListener('click', function () {
				let theDataTime = {
					dateTime: this.getAttribute('data-time')
				};

				calendarModalCreate(theDataTime);
			}));
		}

		function calendarButtonsPrevAndNext(year, month) {
			year = parseInt(year);
			month = parseInt(month);

			// Calculate the next month and year
			let nextMonth = (month + 1 > 12) ? 1 : month + 1;
			let nextYear = (month + 1 > 12) ? year + 1 : year;

			// Calculate the previous month and year
			let prevMonth = (month - 1 < 1) ? 12 : month - 1;
			let prevYear = (month - 1 < 1) ? year - 1 : year;

			let captionTemplate = `
					<nav class="calendar__navigation">
						<ul class="list">
							<li class="list__item">
								<a class="calendar__button-prev button button--line-black" date-year="${prevYear}" date-month="${prevMonth}"'>
									<i class="icon">
										<svg class="icon__svg">
											<use class="icon__use" href="#icon-chevron-left" />
										</svg>
									</i>
								</a>
							</li>
							<li class="list__item">
								<div class="calendar__title">
									<span class='calendar__month-name'>
										${settings.months[month - 1]}
									</span>
									<span class='calendar__year-name'>
										${year}
									</span>
								</div>
							</li>
							<li class="list__item">
								<a class="calendar__button-next button button--line-black" date-year="${nextYear}" date-month="${nextMonth}"'>
									<i class="icon">
										<svg class="icon__svg">
											<use class="icon__use" href="#icon-chevron-right" />
										</svg>
									</i>
								</a>
							</li>
						</ul>
					</nav>
				`;

			document.querySelector(".calendar__caption").innerHTML = captionTemplate;

			let buttonPrev = document.querySelectorAll(".calendar__button-prev");
			let buttonNext = document.querySelectorAll(".calendar__button-next");

			[...buttonPrev, ...buttonNext].map((item) =>
				item.addEventListener("click", function () {
					let year = this.getAttribute("date-year");
					let month = this.getAttribute("date-month");
					calendarCreate(year, month);
				})
			);
		}

		function calendarCreate(year, month) {
			calendarRemoveStructure();
			calendarCreateStructure();
			calendarButtonsPrevAndNext(year, month);
			calendarAllDaysCreate(year, month);
			calendarSetHeight();
			calendarSetWeekend();
			calendarSelectDay();
		}

		function calendarModalCreate(data) {
			const calendarTemplate = `
				<div class="modal">
					<div class="modal__box">
						<div class="modal__inner">
							<button class="modal__button-close button button--icon">
								<i class="icon">
									<svg class="icon__svg">
										<use class="icon__use" href="#icon-cross" />
									</svg>
								</i>
							</button>

							<div class="modal__content">
								${data.dateTime}
							</div>
						</div>
					</div>
				</div>
				`;

			const modalTemplate = document.createRange().createContextualFragment(calendarTemplate);
			document.querySelector('body').appendChild(modalTemplate);

			setTimeout(function () {
				document.querySelector('.modal').classList.add('is-show');
			}, 100);

			document.querySelector('.modal__button-close').addEventListener('click', function () {
				document.querySelector('.modal').classList.remove('is-show');

				setTimeout(function () {
					document.querySelector('.modal').remove();
				}, 1000);
			});
		}

		calendarCreate(getCurrentYear(), getCurrentMonth());
	}
});

})();

/******/ })()
;