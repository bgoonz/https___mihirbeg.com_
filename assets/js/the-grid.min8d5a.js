/*!
 * The Grid – Responsive Grid Plugin
 * @author Themeone [http://theme-one.com/the-grid/]
 */
function throttle(t, e) {
  var i = 0;
  return function () {
    var o = Date.now();
    return o > i + e ? ((i = o), t.apply(this, arguments)) : void 0;
  };
}
function debounce(t, e) {
  "use strict";
  var i;
  return function () {
    function o() {
      t(), (i = null);
    }
    i && clearTimeout(i), setTimeout(o, e || 100);
  };
}
!(function (t) {
  function e() {}
  function i(t) {
    function i(e) {
      e.prototype.option ||
        (e.prototype.option = function (e) {
          t.isPlainObject(e) && (this.options = t.extend(!0, this.options, e));
        });
    }
    function n(e, i) {
      t.fn[e] = function (n) {
        if ("string" == typeof n) {
          for (
            var r = o.call(arguments, 1), a = 0, s = this.length;
            s > a;
            a++
          ) {
            var u = this[a],
              l = t.data(u, e);
            if (l && t.isFunction(l[n]) && "_" !== n.charAt(0)) {
              var d = l[n].apply(l, r);
              if (void 0 !== d) return d;
            }
          }
          return this;
        }
        return this.each(function () {
          var o = t.data(this, e);
          o
            ? (o.option(n), o._init())
            : ((o = new i(this, n)), t.data(this, e, o));
        });
      };
    }
    if (t) {
      "undefined" == typeof console ? e : function (t) {};
      return (
        (t.bridget = function (t, e) {
          i(e), n(t, e);
        }),
        t.bridget
      );
    }
  }
  var o = Array.prototype.slice;
  "function" == typeof define && define.amd
    ? define("jquery-bridget/jquery.bridget", ["jquery"], i)
    : i("object" == typeof exports ? require("jquery") : t.jQuery);
})(window),
  (function (t) {
    function e(e) {
      var i = t.event;
      return (i.target = i.target || i.srcElement || e), i;
    }
    var i = document.documentElement,
      o = function () {};
    i.addEventListener
      ? (o = function (t, e, i) {
          t.addEventListener(e, i, !1);
        })
      : i.attachEvent &&
        (o = function (t, i, o) {
          (t[i + o] = o.handleEvent
            ? function () {
                var i = e(t);
                o.handleEvent.call(o, i);
              }
            : function () {
                var i = e(t);
                o.call(t, i);
              }),
            t.attachEvent("on" + i, t[i + o]);
        });
    var n = function () {};
    i.removeEventListener
      ? (n = function (t, e, i) {
          t.removeEventListener(e, i, !1);
        })
      : i.detachEvent &&
        (n = function (t, e, i) {
          t.detachEvent("on" + e, t[e + i]);
          try {
            delete t[e + i];
          } catch (o) {
            t[e + i] = void 0;
          }
        });
    var r = { bind: o, unbind: n };
    "function" == typeof define && define.amd
      ? define("eventie/eventie", r)
      : "object" == typeof exports
      ? (module.exports = r)
      : (t.eventie = r);
  })(window),
  function () {
    "use strict";
    function t() {}
    function e(t, e) {
      for (var i = t.length; i--; ) if (t[i].listener === e) return i;
      return -1;
    }
    function i(t) {
      return function () {
        return this[t].apply(this, arguments);
      };
    }
    var o = t.prototype,
      n = this,
      r = n.EventEmitter;
    (o.getListeners = function (t) {
      var e,
        i,
        o = this._getEvents();
      if (t instanceof RegExp) {
        e = {};
        for (i in o) o.hasOwnProperty(i) && t.test(i) && (e[i] = o[i]);
      } else e = o[t] || (o[t] = []);
      return e;
    }),
      (o.flattenListeners = function (t) {
        var e,
          i = [];
        for (e = 0; e < t.length; e += 1) i.push(t[e].listener);
        return i;
      }),
      (o.getListenersAsObject = function (t) {
        var e,
          i = this.getListeners(t);
        return i instanceof Array && ((e = {}), (e[t] = i)), e || i;
      }),
      (o.addListener = function (t, i) {
        var o,
          n = this.getListenersAsObject(t),
          r = "object" == typeof i;
        for (o in n)
          n.hasOwnProperty(o) &&
            -1 === e(n[o], i) &&
            n[o].push(r ? i : { listener: i, once: !1 });
        return this;
      }),
      (o.on = i("addListener")),
      (o.addOnceListener = function (t, e) {
        return this.addListener(t, { listener: e, once: !0 });
      }),
      (o.once = i("addOnceListener")),
      (o.defineEvent = function (t) {
        return this.getListeners(t), this;
      }),
      (o.defineEvents = function (t) {
        for (var e = 0; e < t.length; e += 1) this.defineEvent(t[e]);
        return this;
      }),
      (o.removeListener = function (t, i) {
        var o,
          n,
          r = this.getListenersAsObject(t);
        for (n in r)
          r.hasOwnProperty(n) &&
            ((o = e(r[n], i)), -1 !== o && r[n].splice(o, 1));
        return this;
      }),
      (o.off = i("removeListener")),
      (o.addListeners = function (t, e) {
        return this.manipulateListeners(!1, t, e);
      }),
      (o.removeListeners = function (t, e) {
        return this.manipulateListeners(!0, t, e);
      }),
      (o.manipulateListeners = function (t, e, i) {
        var o,
          n,
          r = t ? this.removeListener : this.addListener,
          a = t ? this.removeListeners : this.addListeners;
        if ("object" != typeof e || e instanceof RegExp)
          for (o = i.length; o--; ) r.call(this, e, i[o]);
        else
          for (o in e)
            e.hasOwnProperty(o) &&
              (n = e[o]) &&
              ("function" == typeof n
                ? r.call(this, o, n)
                : a.call(this, o, n));
        return this;
      }),
      (o.removeEvent = function (t) {
        var e,
          i = typeof t,
          o = this._getEvents();
        if ("string" === i) delete o[t];
        else if (t instanceof RegExp)
          for (e in o) o.hasOwnProperty(e) && t.test(e) && delete o[e];
        else delete this._events;
        return this;
      }),
      (o.removeAllListeners = i("removeEvent")),
      (o.emitEvent = function (t, e) {
        var i,
          o,
          n,
          r,
          a = this.getListenersAsObject(t);
        for (n in a)
          if (a.hasOwnProperty(n))
            for (o = a[n].length; o--; )
              (i = a[n][o]),
                i.once === !0 && this.removeListener(t, i.listener),
                (r = i.listener.apply(this, e || [])),
                r === this._getOnceReturnValue() &&
                  this.removeListener(t, i.listener);
        return this;
      }),
      (o.trigger = i("emitEvent")),
      (o.emit = function (t) {
        var e = Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(t, e);
      }),
      (o.setOnceReturnValue = function (t) {
        return (this._onceReturnValue = t), this;
      }),
      (o._getOnceReturnValue = function () {
        return this.hasOwnProperty("_onceReturnValue")
          ? this._onceReturnValue
          : !0;
      }),
      (o._getEvents = function () {
        return this._events || (this._events = {});
      }),
      (t.noConflict = function () {
        return (n.EventEmitter = r), t;
      }),
      "function" == typeof define && define.amd
        ? define("eventEmitter/EventEmitter", [], function () {
            return t;
          })
        : "object" == typeof module && module.exports
        ? (module.exports = t)
        : (n.EventEmitter = t);
  }.call(this),
  (function (t) {
    function e(t) {
      if (t) {
        if ("string" == typeof o[t]) return t;
        t = t.charAt(0).toUpperCase() + t.slice(1);
        for (var e, n = 0, r = i.length; r > n; n++)
          if (((e = i[n] + t), "string" == typeof o[e])) return e;
      }
    }
    var i = "Webkit Moz ms Ms O".split(" "),
      o = document.documentElement.style;
    "function" == typeof define && define.amd
      ? define("get-style-property/get-style-property", [], function () {
          return e;
        })
      : "object" == typeof exports
      ? (module.exports = e)
      : (t.getStyleProperty = e);
  })(window),
  (function (t, e) {
    function i(t) {
      var e = parseFloat(t),
        i = -1 === t.indexOf("%") && !isNaN(e);
      return i && e;
    }
    function o() {}
    function n() {
      for (
        var t = {
            width: 0,
            height: 0,
            innerWidth: 0,
            innerHeight: 0,
            outerWidth: 0,
            outerHeight: 0,
          },
          e = 0,
          i = s.length;
        i > e;
        e++
      ) {
        var o = s[e];
        t[o] = 0;
      }
      return t;
    }
    function r(e) {
      function o() {
        if (!h) {
          h = !0;
          var o = t.getComputedStyle;
          if (
            ((l = (function () {
              var t = o
                ? function (t) {
                    return o(t, null);
                  }
                : function (t) {
                    return t.currentStyle;
                  };
              return function (e) {
                var i = t(e);
                return (
                  i ||
                    a(
                      "Style returned " +
                        i +
                        ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"
                    ),
                  i
                );
              };
            })()),
            (d = e("boxSizing")))
          ) {
            var n = document.createElement("div");
            (n.style.width = "200px"),
              (n.style.padding = "1px 2px 3px 4px"),
              (n.style.borderStyle = "solid"),
              (n.style.borderWidth = "1px 2px 3px 4px"),
              (n.style[d] = "border-box");
            var r = document.body || document.documentElement;
            r.appendChild(n);
            var s = l(n);
            (c = 200 === i(s.width)), r.removeChild(n);
          }
        }
      }
      function r(t) {
        if (
          (o(),
          "string" == typeof t && (t = document.querySelector(t)),
          t && "object" == typeof t && t.nodeType)
        ) {
          var e = l(t);
          if ("none" === e.display) return n();
          var r = {};
          (r.width = t.offsetWidth), (r.height = t.offsetHeight);
          for (
            var a = (r.isBorderBox = !(!d || !e[d] || "border-box" !== e[d])),
              h = 0,
              p = s.length;
            p > h;
            h++
          ) {
            var f = s[h],
              m = e[f];
            m = u(t, m);
            var g = parseFloat(m);
            r[f] = isNaN(g) ? 0 : g;
          }
          var y = r.paddingLeft + r.paddingRight,
            v = r.paddingTop + r.paddingBottom,
            _ = r.marginLeft + r.marginRight,
            w = r.marginTop + r.marginBottom,
            b = r.borderLeftWidth + r.borderRightWidth,
            T = r.borderTopWidth + r.borderBottomWidth,
            x = a && c,
            z = i(e.width);
          z !== !1 && (r.width = z + (x ? 0 : y + b));
          var C = i(e.height);
          return (
            C !== !1 && (r.height = C + (x ? 0 : v + T)),
            (r.innerWidth = r.width - (y + b)),
            (r.innerHeight = r.height - (v + T)),
            (r.outerWidth = r.width + _),
            (r.outerHeight = r.height + w),
            r
          );
        }
      }
      function u(e, i) {
        if (t.getComputedStyle || -1 === i.indexOf("%")) return i;
        var o = e.style,
          n = o.left,
          r = e.runtimeStyle,
          a = r && r.left;
        return (
          a && (r.left = e.currentStyle.left),
          (o.left = i),
          (i = o.pixelLeft),
          (o.left = n),
          a && (r.left = a),
          i
        );
      }
      var l,
        d,
        c,
        h = !1;
      return r;
    }
    var a =
        "undefined" == typeof console
          ? o
          : function (t) {
              console.error(t);
            },
      s = [
        "paddingLeft",
        "paddingRight",
        "paddingTop",
        "paddingBottom",
        "marginLeft",
        "marginRight",
        "marginTop",
        "marginBottom",
        "borderLeftWidth",
        "borderRightWidth",
        "borderTopWidth",
        "borderBottomWidth",
      ];
    "function" == typeof define && define.amd
      ? define(
          "get-size/get-size",
          ["get-style-property/get-style-property"],
          r
        )
      : "object" == typeof exports
      ? (module.exports = r(require("desandro-get-style-property")))
      : (t.getSize = r(t.getStyleProperty));
  })(window),
  (function (t) {
    function e(t) {
      "function" == typeof t && (e.isReady ? t() : a.push(t));
    }
    function i(t) {
      var i = "readystatechange" === t.type && "complete" !== r.readyState;
      e.isReady || i || o();
    }
    function o() {
      e.isReady = !0;
      for (var t = 0, i = a.length; i > t; t++) {
        var o = a[t];
        o();
      }
    }
    function n(n) {
      return (
        "complete" === r.readyState
          ? o()
          : (n.bind(r, "DOMContentLoaded", i),
            n.bind(r, "readystatechange", i),
            n.bind(t, "load", i)),
        e
      );
    }
    var r = t.document,
      a = [];
    (e.isReady = !1),
      "function" == typeof define && define.amd
        ? define("doc-ready/doc-ready", ["eventie/eventie"], n)
        : "object" == typeof exports
        ? (module.exports = n(require("eventie")))
        : (t.docReady = n(t.eventie));
  })(window),
  (function (t) {
    "use strict";
    function e(t, e) {
      return t[a](e);
    }
    function i(t) {
      if (!t.parentNode) {
        var e = document.createDocumentFragment();
        e.appendChild(t);
      }
    }
    function o(t, e) {
      i(t);
      for (
        var o = t.parentNode.querySelectorAll(e), n = 0, r = o.length;
        r > n;
        n++
      )
        if (o[n] === t) return !0;
      return !1;
    }
    function n(t, o) {
      return i(t), e(t, o);
    }
    var r,
      a = (function () {
        if (t.matches) return "matches";
        if (t.matchesSelector) return "matchesSelector";
        for (
          var e = ["webkit", "moz", "ms", "o"], i = 0, o = e.length;
          o > i;
          i++
        ) {
          var n = e[i],
            r = n + "MatchesSelector";
          if (t[r]) return r;
        }
      })();
    if (a) {
      var s = document.createElement("div"),
        u = e(s, "div");
      r = u ? e : n;
    } else r = o;
    "function" == typeof define && define.amd
      ? define("matches-selector/matches-selector", [], function () {
          return r;
        })
      : "object" == typeof exports
      ? (module.exports = r)
      : (window.matchesSelector = r);
  })(Element.prototype),
  (function (t, e) {
    "use strict";
    "function" == typeof define && define.amd
      ? define(
          "fizzy-ui-utils/utils",
          ["doc-ready/doc-ready", "matches-selector/matches-selector"],
          function (i, o) {
            return e(t, i, o);
          }
        )
      : "object" == typeof exports
      ? (module.exports = e(
          t,
          require("doc-ready"),
          require("desandro-matches-selector")
        ))
      : (t.fizzyUIUtils = e(t, t.docReady, t.matchesSelector));
  })(window, function (t, e, i) {
    var o = {};
    (o.extend = function (t, e) {
      for (var i in e) t[i] = e[i];
      return t;
    }),
      (o.modulo = function (t, e) {
        return ((t % e) + e) % e;
      });
    var n = Object.prototype.toString;
    (o.isArray = function (t) {
      return "[object Array]" == n.call(t);
    }),
      (o.makeArray = function (t) {
        var e = [];
        if (o.isArray(t)) e = t;
        else if (t && "number" == typeof t.length)
          for (var i = 0, n = t.length; n > i; i++) e.push(t[i]);
        else e.push(t);
        return e;
      }),
      (o.indexOf = Array.prototype.indexOf
        ? function (t, e) {
            return t.indexOf(e);
          }
        : function (t, e) {
            for (var i = 0, o = t.length; o > i; i++) if (t[i] === e) return i;
            return -1;
          }),
      (o.removeFrom = function (t, e) {
        var i = o.indexOf(t, e);
        -1 != i && t.splice(i, 1);
      }),
      (o.isElement =
        "function" == typeof HTMLElement || "object" == typeof HTMLElement
          ? function (t) {
              return t instanceof HTMLElement;
            }
          : function (t) {
              return (
                t &&
                "object" == typeof t &&
                1 == t.nodeType &&
                "string" == typeof t.nodeName
              );
            }),
      (o.setText = (function () {
        function t(t, i) {
          (e =
            e ||
            (void 0 !== document.documentElement.textContent
              ? "textContent"
              : "innerText")),
            (t[e] = i);
        }
        var e;
        return t;
      })()),
      (o.getParent = function (t, e) {
        for (; t != document.body; )
          if (((t = t.parentNode), i(t, e))) return t;
      }),
      (o.getQueryElement = function (t) {
        return "string" == typeof t ? document.querySelector(t) : t;
      }),
      (o.handleEvent = function (t) {
        var e = "on" + t.type;
        this[e] && this[e](t);
      }),
      (o.filterFindElements = function (t, e) {
        t = o.makeArray(t);
        for (var n = [], r = 0, a = t.length; a > r; r++) {
          var s = t[r];
          if (o.isElement(s))
            if (e) {
              i(s, e) && n.push(s);
              for (
                var u = s.querySelectorAll(e), l = 0, d = u.length;
                d > l;
                l++
              )
                n.push(u[l]);
            } else n.push(s);
        }
        return n;
      }),
      (o.debounceMethod = function (t, e, i) {
        var o = t.prototype[e],
          n = e + "Timeout";
        t.prototype[e] = function () {
          var t = this[n];
          t && clearTimeout(t);
          var e = arguments,
            r = this;
          this[n] = setTimeout(function () {
            o.apply(r, e), delete r[n];
          }, i || 100);
        };
      }),
      (o.toDashed = function (t) {
        return t
          .replace(/(.)([A-Z])/g, function (t, e, i) {
            return e + "-" + i;
          })
          .toLowerCase();
      });
    var r = t.console;
    return (
      (o.htmlInit = function (i, n) {
        e(function () {
          for (
            var e = o.toDashed(n),
              a = document.querySelectorAll(".js-" + e),
              s = "data-" + e + "-options",
              u = 0,
              l = a.length;
            l > u;
            u++
          ) {
            var d,
              c = a[u],
              h = c.getAttribute(s);
            try {
              d = h && JSON.parse(h);
            } catch (p) {
              r &&
                r.error(
                  "Error parsing " +
                    s +
                    " on " +
                    c.nodeName.toLowerCase() +
                    (c.id ? "#" + c.id : "") +
                    ": " +
                    p
                );
              continue;
            }
            var f = new i(c, d),
              m = t.jQuery;
            m && m.data(c, n, f);
          }
        });
      }),
      o
    );
  }),
  (function (t, e) {
    "use strict";
    "function" == typeof define && define.amd
      ? define(
          "outlayer/item",
          [
            "eventEmitter/EventEmitter",
            "get-size/get-size",
            "get-style-property/get-style-property",
            "fizzy-ui-utils/utils",
          ],
          function (i, o, n, r) {
            return e(t, i, o, n, r);
          }
        )
      : "object" == typeof exports
      ? (module.exports = e(
          t,
          require("wolfy87-eventemitter"),
          require("get-size"),
          require("desandro-get-style-property"),
          require("fizzy-ui-utils")
        ))
      : ((t.Outlayer = {}),
        (t.Outlayer.Item = e(
          t,
          t.EventEmitter,
          t.getSize,
          t.getStyleProperty,
          t.fizzyUIUtils
        )));
  })(window, function (t, e, i, o, n) {
    "use strict";
    function r(t) {
      for (var e in t) return !1;
      return (e = null), !0;
    }
    function a(t, e) {
      t &&
        ((this.element = t),
        (this.layout = e),
        (this.position = { x: 0, y: 0 }),
        this._create());
    }
    function s(t) {
      return t.replace(/([A-Z])/g, function (t) {
        return "-" + t.toLowerCase();
      });
    }
    var u = t.getComputedStyle,
      l = u
        ? function (t) {
            return u(t, null);
          }
        : function (t) {
            return t.currentStyle;
          },
      d = o("transition"),
      c = o("transform"),
      h = d && c,
      p = !!o("perspective"),
      f = {
        WebkitTransition: "webkitTransitionEnd",
        MozTransition: "transitionend",
        OTransition: "otransitionend",
        transition: "transitionend",
      }[d],
      m = [
        "transform",
        "transition",
        "transitionDuration",
        "transitionProperty",
      ],
      g = (function () {
        for (var t = {}, e = 0, i = m.length; i > e; e++) {
          var n = m[e],
            r = o(n);
          r && r !== n && (t[n] = r);
        }
        return t;
      })();
    n.extend(a.prototype, e.prototype),
      (a.prototype._create = function () {
        (this._transn = { ingProperties: {}, clean: {}, onEnd: {} }),
          this.css({ position: "absolute" });
      }),
      (a.prototype.handleEvent = function (t) {
        var e = "on" + t.type;
        this[e] && this[e](t);
      }),
      (a.prototype.getSize = function () {
        this.size = i(this.element);
      }),
      (a.prototype.css = function (t) {
        var e = this.element.style;
        for (var i in t) {
          var o = g[i] || i;
          e[o] = t[i];
        }
      }),
      (a.prototype.getPosition = function () {
        var t = l(this.element),
          e = this.layout.options,
          i = e.isOriginLeft,
          o = e.isOriginTop,
          n = t[i ? "left" : "right"],
          r = t[o ? "top" : "bottom"],
          a = this.layout.size,
          s =
            -1 != n.indexOf("%")
              ? (parseFloat(n) / 100) * a.width
              : parseInt(n, 10),
          u =
            -1 != r.indexOf("%")
              ? (parseFloat(r) / 100) * a.height
              : parseInt(r, 10);
        (s = isNaN(s) ? 0 : s),
          (u = isNaN(u) ? 0 : u),
          (s -= i ? a.paddingLeft : a.paddingRight),
          (u -= o ? a.paddingTop : a.paddingBottom),
          (this.position.x = s),
          (this.position.y = u);
      }),
      (a.prototype.layoutPosition = function () {
        var t = this.layout.size,
          e = this.layout.options,
          i = {},
          o = e.isOriginLeft ? "paddingLeft" : "paddingRight",
          n = e.isOriginLeft ? "left" : "right",
          r = e.isOriginLeft ? "right" : "left",
          a = this.position.x + t[o];
        (i[n] = this.getXValue(a)), (i[r] = "");
        var s = e.isOriginTop ? "paddingTop" : "paddingBottom",
          u = e.isOriginTop ? "top" : "bottom",
          l = e.isOriginTop ? "bottom" : "top",
          d = this.position.y + t[s];
        (i[u] = this.getYValue(d)),
          (i[l] = ""),
          this.css(i),
          this.emitEvent("layout", [this]);
      }),
      (a.prototype.getXValue = function (t) {
        var e = this.layout.options;
        return e.percentPosition && !e.isHorizontal
          ? (t / this.layout.size.width) * 100 + "%"
          : t + "px";
      }),
      (a.prototype.getYValue = function (t) {
        var e = this.layout.options;
        return e.percentPosition && e.isHorizontal
          ? (t / this.layout.size.height) * 100 + "%"
          : t + "px";
      }),
      (a.prototype._transitionTo = function (t, e) {
        this.getPosition();
        var i = this.position.x,
          o = this.position.y,
          n = parseInt(t, 10),
          r = parseInt(e, 10),
          a = n === this.position.x && r === this.position.y;
        if ((this.setPosition(t, e), a && !this.isTransitioning))
          return void this.layoutPosition();
        var s = t - i,
          u = e - o,
          l = {};
        (l.transform = this.getTranslate(s, u)),
          this.transition({
            to: l,
            onTransitionEnd: { transform: this.layoutPosition },
            isCleaning: !0,
          });
      }),
      (a.prototype.getTranslate = function (t, e) {
        var i = this.layout.options;
        return (
          (t = i.isOriginLeft ? t : -t),
          (e = i.isOriginTop ? e : -e),
          p
            ? "translate3d(" + t + "px, " + e + "px, 0)"
            : "translate(" + t + "px, " + e + "px)"
        );
      }),
      (a.prototype.goTo = function (t, e) {
        this.setPosition(t, e), this.layoutPosition();
      }),
      (a.prototype.moveTo = h ? a.prototype._transitionTo : a.prototype.goTo),
      (a.prototype.setPosition = function (t, e) {
        (this.position.x = parseInt(t, 10)),
          (this.position.y = parseInt(e, 10));
      }),
      (a.prototype._nonTransition = function (t) {
        this.css(t.to), t.isCleaning && this._removeStyles(t.to);
        for (var e in t.onTransitionEnd) t.onTransitionEnd[e].call(this);
      }),
      (a.prototype._transition = function (t) {
        if (!parseFloat(this.layout.options.transitionDuration))
          return void this._nonTransition(t);
        var e = this._transn;
        for (var i in t.onTransitionEnd) e.onEnd[i] = t.onTransitionEnd[i];
        for (i in t.to)
          (e.ingProperties[i] = !0), t.isCleaning && (e.clean[i] = !0);
        if (t.from) {
          this.css(t.from);
          var o = this.element.offsetHeight;
          o = null;
        }
        this.enableTransition(t.to),
          this.css(t.to),
          (this.isTransitioning = !0);
      });
    var y = "opacity," + s(g.transform || "transform");
    (a.prototype.enableTransition = function () {
      this.isTransitioning ||
        (this.css({
          transitionProperty: y,
          transitionDuration: this.layout.options.transitionDuration,
        }),
        this.element.addEventListener(f, this, !1));
    }),
      (a.prototype.transition =
        a.prototype[d ? "_transition" : "_nonTransition"]),
      (a.prototype.onwebkitTransitionEnd = function (t) {
        this.ontransitionend(t);
      }),
      (a.prototype.onotransitionend = function (t) {
        this.ontransitionend(t);
      });
    var v = {
      "-webkit-transform": "transform",
      "-moz-transform": "transform",
      "-o-transform": "transform",
    };
    (a.prototype.ontransitionend = function (t) {
      if (t.target === this.element) {
        var e = this._transn,
          i = v[t.propertyName] || t.propertyName;
        if (
          (delete e.ingProperties[i],
          r(e.ingProperties) && this.disableTransition(),
          i in e.clean &&
            ((this.element.style[t.propertyName] = ""), delete e.clean[i]),
          i in e.onEnd)
        ) {
          var o = e.onEnd[i];
          o.call(this), delete e.onEnd[i];
        }
        this.emitEvent("transitionEnd", [this]);
      }
    }),
      (a.prototype.disableTransition = function () {
        this.removeTransitionStyles(),
          this.element.removeEventListener(f, this, !1),
          (this.isTransitioning = !1);
      }),
      (a.prototype._removeStyles = function (t) {
        var e = {};
        for (var i in t) e[i] = "";
        this.css(e);
      });
    var _ = { transitionProperty: "", transitionDuration: "" };
    return (
      (a.prototype.removeTransitionStyles = function () {
        this.css(_);
      }),
      (a.prototype.removeElem = function () {
        this.element.parentNode.removeChild(this.element),
          this.css({ display: "" }),
          this.emitEvent("remove", [this]);
      }),
      (a.prototype.remove = function () {
        if (!d || !parseFloat(this.layout.options.transitionDuration))
          return void this.removeElem();
        var t = this;
        this.once("transitionEnd", function () {
          t.removeElem();
        }),
          this.hide();
      }),
      (a.prototype.reveal = function () {
        delete this.isHidden, this.css({ display: "" });
        var t = this.layout.options,
          e = {},
          i = this.getHideRevealTransitionEndProperty("visibleStyle");
        (e[i] = this.onRevealTransitionEnd),
          this.transition({
            from: t.hiddenStyle,
            to: t.visibleStyle,
            isCleaning: !0,
            onTransitionEnd: e,
          });
      }),
      (a.prototype.onRevealTransitionEnd = function () {
        this.isHidden || this.emitEvent("reveal");
      }),
      (a.prototype.getHideRevealTransitionEndProperty = function (t) {
        var e = this.layout.options[t];
        if (e.opacity) return "opacity";
        for (var i in e) return i;
      }),
      (a.prototype.hide = function () {
        (this.isHidden = !0), this.css({ display: "" });
        var t = this.layout.options,
          e = {},
          i = this.getHideRevealTransitionEndProperty("hiddenStyle");
        (e[i] = this.onHideTransitionEnd),
          this.transition({
            from: t.visibleStyle,
            to: t.hiddenStyle,
            isCleaning: !0,
            onTransitionEnd: e,
          });
      }),
      (a.prototype.onHideTransitionEnd = function () {
        this.isHidden &&
          (this.css({ display: "none" }), this.emitEvent("hide"));
      }),
      (a.prototype.destroy = function () {
        this.css({
          position: "",
          left: "",
          right: "",
          top: "",
          bottom: "",
          transition: "",
          transform: "",
        });
      }),
      a
    );
  }),
  (function (t, e) {
    "use strict";
    "function" == typeof define && define.amd
      ? define(
          "outlayer/outlayer",
          [
            "eventie/eventie",
            "eventEmitter/EventEmitter",
            "get-size/get-size",
            "fizzy-ui-utils/utils",
            "./item",
          ],
          function (i, o, n, r, a) {
            return e(t, i, o, n, r, a);
          }
        )
      : "object" == typeof exports
      ? (module.exports = e(
          t,
          require("eventie"),
          require("wolfy87-eventemitter"),
          require("get-size"),
          require("fizzy-ui-utils"),
          require("./item")
        ))
      : (t.Outlayer = e(
          t,
          t.eventie,
          t.EventEmitter,
          t.getSize,
          t.fizzyUIUtils,
          t.Outlayer.Item
        ));
  })(window, function (t, e, i, o, n, r) {
    "use strict";
    function a(t, e) {
      var i = n.getQueryElement(t);
      if (!i)
        return void (
          s &&
          s.error(
            "Bad element for " + this.constructor.namespace + ": " + (i || t)
          )
        );
      (this.element = i),
        u && (this.$element = u(this.element)),
        (this.options = n.extend({}, this.constructor.defaults)),
        this.option(e);
      var o = ++d;
      (this.element.outlayerGUID = o),
        (c[o] = this),
        this._create(),
        this.options.isInitLayout && this.layout();
    }
    var s = t.console,
      u = t.jQuery,
      l = function () {},
      d = 0,
      c = {};
    return (
      (a.namespace = "outlayer"),
      (a.Item = r),
      (a.defaults = {
        containerStyle: { position: "relative" },
        isInitLayout: !0,
        isOriginLeft: !0,
        isOriginTop: !0,
        isResizeBound: !0,
        isResizingContainer: !0,
        transitionDuration: "0.4s",
        hiddenStyle: { opacity: 0, transform: "scale(0.001)" },
        visibleStyle: { opacity: 1, transform: "scale(1)" },
      }),
      n.extend(a.prototype, i.prototype),
      (a.prototype.option = function (t) {
        n.extend(this.options, t);
      }),
      (a.prototype._create = function () {
        this.reloadItems(),
          n.extend(this.element.style, this.options.containerStyle),
          this.options.isResizeBound && this.bindResize();
      }),
      (a.prototype.reloadItems = function () {
        this.items = this._itemize(this.element.children);
      }),
      (a.prototype._itemize = function (t) {
        for (
          var e = this._filterFindItemElements(t),
            i = this.constructor.Item,
            o = [],
            n = 0,
            r = e.length;
          r > n;
          n++
        ) {
          var a = e[n],
            s = new i(a, this);
          o.push(s);
        }
        return o;
      }),
      (a.prototype._filterFindItemElements = function (t) {
        return n.filterFindElements(t, this.options.itemSelector);
      }),
      (a.prototype.getItemElements = function () {
        for (var t = [], e = 0, i = this.items.length; i > e; e++)
          t.push(this.items[e].element);
        return t;
      }),
      (a.prototype.layout = function () {
        this._resetLayout();
        var t =
          void 0 !== this.options.isLayoutInstant
            ? this.options.isLayoutInstant
            : !this._isLayoutInited;
        this.layoutItems(this.items, t), (this._isLayoutInited = !0);
      }),
      (a.prototype._init = a.prototype.layout),
      (a.prototype._resetLayout = function () {
        this.getSize();
      }),
      (a.prototype.getSize = function () {
        this.size = o(this.element);
      }),
      (a.prototype._getMeasurement = function (t, e) {
        var i,
          r = this.options[t];
        r
          ? ("string" == typeof r
              ? (i = this.element.querySelector(r))
              : n.isElement(r) && (i = r),
            (this[t] = i ? o(i)[e] : r))
          : (this[t] = 0);
      }),
      (a.prototype.layoutItems = function (t, e) {
        (t = this._getItemsForLayout(t)),
          this._layoutItems(t, e),
          this._postLayout();
      }),
      (a.prototype._getItemsForLayout = function (t) {
        for (var e = [], i = 0, o = t.length; o > i; i++) {
          var n = t[i];
          n.isIgnored || e.push(n);
        }
        return e;
      }),
      (a.prototype._layoutItems = function (t, e) {
        if ((this._emitCompleteOnItems("layout", t), t && t.length)) {
          for (var i = [], o = 0, n = t.length; n > o; o++) {
            var r = t[o],
              a = this._getItemLayoutPosition(r);
            (a.item = r), (a.isInstant = e || r.isLayoutInstant), i.push(a);
          }
          this._processLayoutQueue(i);
        }
      }),
      (a.prototype._getItemLayoutPosition = function () {
        return { x: 0, y: 0 };
      }),
      (a.prototype._processLayoutQueue = function (t) {
        for (var e = 0, i = t.length; i > e; e++) {
          var o = t[e];
          this._positionItem(o.item, o.x, o.y, o.isInstant);
        }
      }),
      (a.prototype._positionItem = function (t, e, i, o) {
        o ? t.goTo(e, i) : t.moveTo(e, i);
      }),
      (a.prototype._postLayout = function () {
        this.resizeContainer();
      }),
      (a.prototype.resizeContainer = function () {
        if (this.options.isResizingContainer) {
          var t = this._getContainerSize();
          t &&
            (this._setContainerMeasure(t.width, !0),
            this._setContainerMeasure(t.height, !1));
        }
      }),
      (a.prototype._getContainerSize = l),
      (a.prototype._setContainerMeasure = function (t, e) {
        if (void 0 !== t) {
          var i = this.size;
          i.isBorderBox &&
            (t += e
              ? i.paddingLeft +
                i.paddingRight +
                i.borderLeftWidth +
                i.borderRightWidth
              : i.paddingBottom +
                i.paddingTop +
                i.borderTopWidth +
                i.borderBottomWidth),
            (t = Math.max(t, 0)),
            (this.element.style[e ? "width" : "height"] = t + "px");
        }
      }),
      (a.prototype._emitCompleteOnItems = function (t, e) {
        function i() {
          n.dispatchEvent(t + "Complete", null, [e]);
        }
        function o() {
          a++, a === r && i();
        }
        var n = this,
          r = e.length;
        if (!e || !r) return void i();
        for (var a = 0, s = 0, u = e.length; u > s; s++) {
          var l = e[s];
          l.once(t, o);
        }
      }),
      (a.prototype.dispatchEvent = function (t, e, i) {
        var o = e ? [e].concat(i) : i;
        if ((this.emitEvent(t, o), u))
          if (((this.$element = this.$element || u(this.element)), e)) {
            var n = u.Event(e);
            (n.type = t), this.$element.trigger(n, i);
          } else this.$element.trigger(t, i);
      }),
      (a.prototype.ignore = function (t) {
        var e = this.getItem(t);
        e && (e.isIgnored = !0);
      }),
      (a.prototype.unignore = function (t) {
        var e = this.getItem(t);
        e && delete e.isIgnored;
      }),
      (a.prototype._find = function (t) {
        return t
          ? ("string" == typeof t && (t = this.element.querySelectorAll(t)),
            (t = n.makeArray(t)))
          : void 0;
      }),
      (a.prototype._getBoundingRect = function () {
        var t = this.element.getBoundingClientRect(),
          e = this.size;
        this._boundingRect = {
          left: t.left + e.paddingLeft + e.borderLeftWidth,
          top: t.top + e.paddingTop + e.borderTopWidth,
          right: t.right - (e.paddingRight + e.borderRightWidth),
          bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth),
        };
      }),
      (a.prototype._getElementOffset = function (t) {
        var e = t.getBoundingClientRect(),
          i = this._boundingRect,
          n = o(t),
          r = {
            left: e.left - i.left - n.marginLeft,
            top: e.top - i.top - n.marginTop,
            right: i.right - e.right - n.marginRight,
            bottom: i.bottom - e.bottom - n.marginBottom,
          };
        return r;
      }),
      (a.prototype.handleEvent = function (t) {
        var e = "on" + t.type;
        this[e] && this[e](t);
      }),
      (a.prototype.bindResize = function () {
        this.isResizeBound ||
          (e.bind(t, "resize", this), (this.isResizeBound = !0));
      }),
      (a.prototype.unbindResize = function () {
        this.isResizeBound && e.unbind(t, "resize", this),
          (this.isResizeBound = !1);
      }),
      (a.prototype.onresize = function () {
        function t() {
          e.resize(), delete e.resizeTimeout;
        }
        this.resizeTimeout && clearTimeout(this.resizeTimeout);
        var e = this;
        this.resizeTimeout = setTimeout(t, 100);
      }),
      (a.prototype.resize = function () {
        this.isResizeBound && this.needsResizeLayout() && this.layout();
      }),
      (a.prototype.needsResizeLayout = function () {
        var t = o(this.element),
          e = this.size && t;
        return e && t.innerWidth !== this.size.innerWidth;
      }),
      (a.prototype.addItems = function (t) {
        var e = this._itemize(t);
        return e.length && (this.items = this.items.concat(e)), e;
      }),
      (a.prototype.appended = function (t) {
        var e = this.addItems(t);
        e.length && (this.layoutItems(e, !0), this.reveal(e));
      }),
      (a.prototype.reveal = function (t) {
        this._emitCompleteOnItems("reveal", t);
        for (var e = t && t.length, i = 0; e && e > i; i++) {
          var o = t[i];
          o.reveal();
        }
      }),
      (a.prototype.hide = function (t) {
        this._emitCompleteOnItems("hide", t);
        for (var e = t && t.length, i = 0; e && e > i; i++) {
          var o = t[i];
          o.hide();
        }
      }),
      (a.prototype.revealItemElements = function (t) {
        var e = this.getItems(t);
        this.reveal(e);
      }),
      (a.prototype.hideItemElements = function (t) {
        var e = this.getItems(t);
        this.hide(e);
      }),
      (a.prototype.getItem = function (t) {
        for (var e = 0, i = this.items.length; i > e; e++) {
          var o = this.items[e];
          if (o.element === t) return o;
        }
      }),
      (a.prototype.getItems = function (t) {
        t = n.makeArray(t);
        for (var e = [], i = 0, o = t.length; o > i; i++) {
          var r = t[i],
            a = this.getItem(r);
          a && e.push(a);
        }
        return e;
      }),
      (a.prototype.remove = function (t) {
        var e = this.getItems(t);
        if ((this._emitCompleteOnItems("remove", e), e && e.length))
          for (var i = 0, o = e.length; o > i; i++) {
            var r = e[i];
            r.remove(), n.removeFrom(this.items, r);
          }
      }),
      (a.prototype.destroy = function () {
        var t = this.element.style;
        (t.height = ""), (t.position = ""), (t.width = "");
        for (var e = 0, i = this.items.length; i > e; e++) {
          var o = this.items[e];
          o.destroy();
        }
        this.unbindResize();
        var n = this.element.outlayerGUID;
        delete c[n],
          delete this.element.outlayerGUID,
          u && u.removeData(this.element, this.constructor.namespace);
      }),
      (a.data = function (t) {
        t = n.getQueryElement(t);
        var e = t && t.outlayerGUID;
        return e && c[e];
      }),
      (a.create = function (t, e) {
        function i() {
          a.apply(this, arguments);
        }
        return (
          Object.create
            ? (i.prototype = Object.create(a.prototype))
            : n.extend(i.prototype, a.prototype),
          (i.prototype.constructor = i),
          (i.defaults = n.extend({}, a.defaults)),
          n.extend(i.defaults, e),
          (i.prototype.settings = {}),
          (i.namespace = t),
          (i.data = a.data),
          (i.Item = function () {
            r.apply(this, arguments);
          }),
          (i.Item.prototype = new r()),
          n.htmlInit(i, t),
          u && u.bridget && u.bridget(t, i),
          i
        );
      }),
      (a.Item = r),
      a
    );
  }),
  (function (t, e) {
    "use strict";
    "function" == typeof define && define.amd
      ? define("TG_Layout/js/item", ["outlayer/outlayer"], e)
      : "object" == typeof exports
      ? (module.exports = e(require("outlayer")))
      : ((t.TG_Layout = t.TG_Layout || {}), (t.TG_Layout.Item = e(t.Outlayer)));
  })(window, function (t) {
    "use strict";
    function e() {
      t.Item.apply(this, arguments);
    }
    (e.prototype = new t.Item()),
      (e.prototype._create = function () {
        (this.id = this.layout.itemGUID++),
          t.Item.prototype._create.call(this),
          (this.sortData = {});
      }),
      (e.prototype.updateSortData = function () {
        if (!this.isIgnored) {
          (this.sortData.id = this.id),
            (this.sortData["original-order"] = this.id),
            (this.sortData.random = Math.random());
          var t = this.layout.options.getSortData,
            e = this.layout._sorters;
          for (var i in t) {
            var o = e[i];
            this.sortData[i] = o(this.element, this);
          }
        }
      });
    var i = e.prototype.destroy;
    return (
      (e.prototype.destroy = function () {
        i.apply(this, arguments), this.css({ display: "" });
      }),
      e
    );
  }),
  (function (t, e) {
    "use strict";
    "function" == typeof define && define.amd
      ? define(
          "TG_Layout/js/layout-mode",
          ["get-size/get-size", "outlayer/outlayer"],
          e
        )
      : "object" == typeof exports
      ? (module.exports = e(require("get-size"), require("outlayer")))
      : ((t.TG_Layout = t.TG_Layout || {}),
        (t.TG_Layout.LayoutMode = e(t.getSize, t.Outlayer)));
  })(window, function (t, e) {
    "use strict";
    function i(t) {
      (this.TG_Layout = t),
        t &&
          ((this.options = t.options[this.namespace]),
          (this.element = t.element),
          (this.items = t.filteredItems),
          (this.size = t.size));
    }
    return (
      (function () {
        function t(t) {
          return function () {
            return e.prototype[t].apply(this.TG_Layout, arguments);
          };
        }
        for (
          var o = [
              "_resetLayout",
              "_getItemLayoutPosition",
              "_getContainerSize",
              "_getElementOffset",
              "needsResizeLayout",
            ],
            n = 0,
            r = o.length;
          r > n;
          n++
        ) {
          var a = o[n];
          i.prototype[a] = t(a);
        }
      })(),
      (i.prototype.needsVerticalResizeLayout = function () {
        var e = t(this.TG_Layout.element),
          i = this.TG_Layout.size && e;
        return i && e.innerHeight != this.TG_Layout.size.innerHeight;
      }),
      (i.prototype._getMeasurement = function () {
        this.TG_Layout._getMeasurement.apply(this, arguments);
      }),
      (i.prototype.getColumnWidth = function () {
        this.getSegmentSize("column", "Width");
      }),
      (i.prototype.getRowHeight = function () {
        this.getSegmentSize("row", "Height");
      }),
      (i.prototype.getSegmentSize = function (t, e) {
        var i = t + e,
          o = "outer" + e;
        if ((this._getMeasurement(i, o), !this[i])) {
          var n = this.getFirstItemSize();
          this[i] = (n && n[o]) || this.TG_Layout.size["inner" + e];
        }
      }),
      (i.prototype.getFirstItemSize = function () {
        var e = this.TG_Layout.filteredItems[0];
        return e && e.element && t(e.element);
      }),
      (i.prototype.layout = function () {
        this.TG_Layout.layout.apply(this.TG_Layout, arguments);
      }),
      (i.prototype.getSize = function () {
        this.TG_Layout.getSize(), (this.size = this.TG_Layout.size);
      }),
      (i.modes = {}),
      (i.create = function (t, e) {
        function o() {
          i.apply(this, arguments);
        }
        return (
          (o.prototype = new i()),
          e && (o.options = e),
          (o.prototype.namespace = t),
          (i.modes[t] = o),
          o
        );
      }),
      i
    );
  }),
  (function (t, e) {
    "use strict";
    "function" == typeof define && define.amd
      ? define(
          "masonry/masonry",
          ["outlayer/outlayer", "get-size/get-size", "fizzy-ui-utils/utils"],
          e
        )
      : "object" == typeof exports
      ? (module.exports = e(
          require("outlayer"),
          require("get-size"),
          require("fizzy-ui-utils")
        ))
      : (t.Masonry = e(t.Outlayer, t.getSize, t.fizzyUIUtils));
  })(window, function (t, e, i) {
    var o = t.create("masonry");
    return (
      (o.prototype._resetLayout = function () {
        this.getSize(),
          this._getMeasurement("columnWidth", "outerWidth"),
          this._getMeasurement("gutter", "outerWidth"),
          this.measureColumns();
        var t = this.cols;
        for (this.colYs = []; t--; ) this.colYs.push(0);
        (this.x = 0), (this.y = 0), (this.maxY = 0);
      }),
      (o.prototype.measureColumns = function () {
        if ((this.getContainerWidth(), !this.columnWidth)) {
          var t = this.items[0],
            i = t && t.element;
          this.columnWidth = (i && e(i).outerWidth) || this.containerWidth;
        }
        var o = (this.columnWidth += this.gutter),
          n = this.containerWidth + this.gutter,
          r = n / o,
          a = o - (n % o),
          s = a && 1 > a ? "round" : "floor";
        (r = Math[s](r)), (this.cols = Math.max(r, 1));
      }),
      (o.prototype.getContainerWidth = function () {
        var t = this.options.isFitWidth
            ? this.element.parentNode
            : this.element,
          i = e(t);
        this.containerWidth = i && i.innerWidth;
      }),
      (o.prototype._getItemLayoutPosition = function (t) {
        t.getSize();
        var e = t.size.outerWidth % this.columnWidth,
          o = e && 1 > e ? "round" : "ceil",
          n = Math[o](t.size.outerWidth / this.columnWidth);
        n = Math.min(n, this.cols);
        var r = this._getColGroup(n),
          a = Math.min.apply(Math, r),
          s = i.indexOf(r, a);
        if (this.options.isFitRows) {
          var u = t.size.outerWidth + this.gutter,
            l = this.TG_Layout.size.innerWidth + this.gutter;
          0 !== this.x &&
            u + this.x > l &&
            ((this.x = 0), (this.y = this.maxY));
        } else (this.x = this.columnWidth * s), (this.y = a);
        var d = { x: this.x, y: this.y };
        this.options.isFitRows &&
          ((this.maxY = Math.max(
            this.maxY,
            this.y + t.size.outerHeight + this.gutter
          )),
          (this.x += u));
        for (
          var c = a + t.size.outerHeight + this.gutter,
            h = this.cols + 1 - r.length,
            p = 0;
          h > p;
          p++
        )
          this.colYs[s + p] = c;
        return d;
      }),
      (o.prototype._getColGroup = function (t) {
        if (2 > t) return this.colYs;
        for (var e = [], i = this.cols + 1 - t, o = 0; i > o; o++) {
          var n = this.colYs.slice(o, o + t);
          e[o] = Math.max.apply(Math, n);
        }
        return e;
      }),
      (o.prototype._getContainerSize = function () {
        this.maxY = this.options.isFitRows
          ? this.maxY
          : Math.max.apply(Math, this.colYs);
        var t = { height: this.maxY - this.gutter };
        return (
          this.options.isFitWidth && (t.width = this._getContainerFitWidth()), t
        );
      }),
      (o.prototype._getContainerFitWidth = function () {
        for (var t = 0, e = this.cols; --e && 0 === this.colYs[e]; ) t++;
        return (this.cols - t) * this.columnWidth - this.gutter;
      }),
      (o.prototype.needsResizeLayout = function () {
        var t = this.containerWidth;
        return this.getContainerWidth(), t !== this.containerWidth;
      }),
      o
    );
  }),
  (function (t, e) {
    "use strict";
    "function" == typeof define && define.amd
      ? define(
          "TG_Layout/js/layout-modes/masonry",
          ["../layout-mode", "masonry/masonry"],
          e
        )
      : "object" == typeof exports
      ? (module.exports = e(
          require("../layout-mode"),
          require("masonry-layout")
        ))
      : e(t.TG_Layout.LayoutMode, t.Masonry);
  })(window, function (t, e) {
    "use strict";
    function i(t, e) {
      for (var i in e) t[i] = e[i];
      return t;
    }
    var o = t.create("masonry"),
      n = o.prototype._getElementOffset,
      r = o.prototype.layout,
      a = o.prototype._getMeasurement;
    i(o.prototype, e.prototype),
      (o.prototype._getElementOffset = n),
      (o.prototype.layout = r),
      (o.prototype._getMeasurement = a);
    var s = o.prototype.measureColumns;
    return (
      (o.prototype.measureColumns = function () {
        (this.items = this.TG_Layout.filteredItems), s.call(this);
      }),
      o
    );
  }),
  (function (t, e) {
    "use strict";
    "function" == typeof define && define.amd
      ? define(
          [
            "outlayer/outlayer",
            "get-size/get-size",
            "matches-selector/matches-selector",
            "fizzy-ui-utils/utils",
            "TG_Layout/js/item",
            "TG_Layout/js/layout-mode",
            "TG_Layout/js/layout-modes/masonry",
          ],
          function (i, o, n, r, a, s) {
            return e(t, i, o, n, r, a, s);
          }
        )
      : "object" == typeof exports
      ? (module.exports = e(
          t,
          require("outlayer"),
          require("get-size"),
          require("desandro-matches-selector"),
          require("fizzy-ui-utils"),
          require("./item"),
          require("./layout-mode"),
          require("./layout-modes/masonry")
        ))
      : (t.TG_Layout = e(
          t,
          t.Outlayer,
          t.getSize,
          t.matchesSelector,
          t.fizzyUIUtils,
          t.TG_Layout.Item,
          t.TG_Layout.LayoutMode
        ));
  })(window, function (t, e, i, o, n, r, a) {
    function s(t, e) {
      return function (i, o) {
        for (var n = 0, r = t.length; r > n; n++) {
          var a = t[n],
            s = i.sortData[a],
            u = o.sortData[a];
          if (s > u || u > s) {
            var l = void 0 !== e[a] ? e[a] : e,
              d = l ? 1 : -1;
            return (s > u ? 1 : -1) * d;
          }
        }
        return 0;
      };
    }
    var u = t.jQuery,
      l = String.prototype.trim
        ? function (t) {
            return t.trim();
          }
        : function (t) {
            return t.replace(/^\s+|\s+$/g, "");
          },
      d = document.documentElement,
      c = d.textContent
        ? function (t) {
            return t.textContent;
          }
        : function (t) {
            return t.innerText;
          },
      h = e.create("TG_Layout", {
        layoutMode: "masonry",
        isJQueryFiltering: !0,
        sortAscending: !0,
      });
    (h.Item = r),
      (h.LayoutMode = a),
      (h.prototype._create = function () {
        (this.itemGUID = 0),
          (this._sorters = {}),
          this._getSorters(),
          e.prototype._create.call(this),
          (this.modes = {}),
          (this.filteredItems = this.items),
          (this.sortHistory = ["original-order"]);
        for (var t in a.modes) this._initLayoutMode(t);
      }),
      (h.prototype.reloadItems = function () {
        (this.itemGUID = 0), e.prototype.reloadItems.call(this);
      }),
      (h.prototype._itemize = function () {
        for (
          var t = e.prototype._itemize.apply(this, arguments),
            i = 0,
            o = t.length;
          o > i;
          i++
        ) {
          var n = t[i];
          n.id = this.itemGUID++;
        }
        return this._updateItemsSortData(t), t;
      }),
      (h.prototype._initLayoutMode = function (t) {
        var e = a.modes[t],
          i = this.options[t] || {};
        (this.options[t] = e.options ? n.extend(e.options, i) : i),
          (this.modes[t] = new e(this));
      }),
      (h.prototype.layout = function () {
        return !this._isLayoutInited && this.options.isInitLayout
          ? void this.arrange()
          : void this._layout();
      }),
      (h.prototype._layout = function () {
        var t = this._getIsInstant();
        this._resetLayout(),
          this.layoutItems(this.filteredItems, t),
          (this._isLayoutInited = !0);
      }),
      (h.prototype.arrange = function (t) {
        function e() {
          o.reveal(i.needReveal), o.hide(i.needHide);
        }
        this.option(t), this._getIsInstant();
        var i = this._filter(this.items);
        this.filteredItems = i.matches;
        var o = this;
        this._bindArrangeComplete(),
          this._isInstant ? this._noTransition(e) : e(),
          this._sort(),
          this._layout();
      }),
      (h.prototype._init = h.prototype.arrange),
      (h.prototype._getIsInstant = function () {
        var t =
          void 0 !== this.options.isLayoutInstant
            ? this.options.isLayoutInstant
            : !this._isLayoutInited;
        return (this._isInstant = t), t;
      }),
      (h.prototype._bindArrangeComplete = function () {
        function t() {
          e &&
            i &&
            o &&
            n.dispatchEvent("arrangeComplete", null, [n.filteredItems]);
        }
        var e,
          i,
          o,
          n = this;
        this.once("layoutComplete", function () {
          (e = !0), t();
        }),
          this.once("hideComplete", function () {
            (i = !0), t();
          }),
          this.once("revealComplete", function () {
            (o = !0), t();
          });
      }),
      (h.prototype._filter = function (t) {
        var e = this.options.filter;
        e = e || "*";
        for (
          var i = [],
            o = [],
            n = [],
            r = this._getFilterTest(e),
            a = 0,
            s = t.length;
          s > a;
          a++
        ) {
          var u = t[a];
          if (!u.isIgnored) {
            var l = r(u);
            l && i.push(u),
              l && u.isHidden ? o.push(u) : l || u.isHidden || n.push(u);
          }
        }
        return { matches: i, needReveal: o, needHide: n };
      }),
      (h.prototype._getFilterTest = function (t) {
        return u && this.options.isJQueryFiltering
          ? function (e) {
              return u(e.element).is(t);
            }
          : "function" == typeof t
          ? function (e) {
              return t(e.element);
            }
          : function (e) {
              return o(e.element, t);
            };
      }),
      (h.prototype.updateSortData = function (t) {
        var e;
        t ? ((t = n.makeArray(t)), (e = this.getItems(t))) : (e = this.items),
          this._getSorters(),
          this._updateItemsSortData(e);
      }),
      (h.prototype._getSorters = function () {
        var t = this.options.getSortData;
        for (var e in t) {
          var i = t[e];
          this._sorters[e] = p(i);
        }
      }),
      (h.prototype._updateItemsSortData = function (t) {
        for (var e = t && t.length, i = 0; e && e > i; i++) {
          var o = t[i];
          o.updateSortData();
        }
      });
    var p = (function () {
      function t(t) {
        if ("string" != typeof t) return t;
        var i = l(t).split(" "),
          o = i[0],
          n = o.match(/^\[(.+)\]$/),
          r = n && n[1],
          a = e(r, o),
          s = h.sortDataParsers[i[1]];
        return (t = s
          ? function (t) {
              return t && s(a(t));
            }
          : function (t) {
              return t && a(t);
            });
      }
      function e(t, e) {
        var i;
        return (i = t
          ? function (e) {
              return e.getAttribute(t);
            }
          : function (t) {
              var i = t.querySelector(e);
              return i && c(i);
            });
      }
      return t;
    })();
    return (
      (h.sortDataParsers = {
        parseInt: function (t) {
          return parseInt(t, 10);
        },
        parseFloat: function (t) {
          return parseFloat(t);
        },
      }),
      (h.prototype._sort = function () {
        var t = this.options.sortBy;
        if (t) {
          var e = [].concat.apply(t, this.sortHistory),
            i = s(e, this.options.sortAscending);
          this.filteredItems.sort(i),
            t != this.sortHistory[0] && this.sortHistory.unshift(t);
        }
      }),
      (h.prototype._mode = function () {
        var t = this.options.layoutMode,
          e = this.modes[t];
        if (!e) throw new Error("No layout mode: " + t);
        return (e.options = this.options[t]), e;
      }),
      (h.prototype._resetLayout = function () {
        e.prototype._resetLayout.call(this), this._mode()._resetLayout();
      }),
      (h.prototype._getItemLayoutPosition = function (t) {
        return this._mode()._getItemLayoutPosition(t);
      }),
      (h.prototype._getContainerSize = function () {
        return this._mode()._getContainerSize();
      }),
      (h.prototype.needsResizeLayout = function () {
        return this._mode().needsResizeLayout();
      }),
      (h.prototype.appended = function (t) {
        var e = this.addItems(t);
        if (e.length)
          if ("justified" == this.options.layoutMode) {
            var i = this._filter(e);
            this.hide(i.needHide),
              this.reveal(i.matches),
              (this.filteredItems = this.filteredItems.concat(i.matches)),
              this.layoutItems(i.matches, !0);
          } else {
            var o = this._filterRevealAdded(e);
            this.filteredItems = this.filteredItems.concat(o);
          }
      }),
      (h.prototype._filterRevealAdded = function (t) {
        var e = this._filter(t);
        return (
          this.hide(e.needHide),
          this.reveal(e.matches),
          this.layoutItems(e.matches, !0),
          e.matches
        );
      }),
      (h.prototype._noTransition = function (t) {
        var e = this.options.transitionDuration;
        this.options.transitionDuration = 0;
        var i = t.call(this);
        return (this.options.transitionDuration = e), i;
      }),
      (h.prototype.getFilteredItemElements = function () {
        for (var t = [], e = 0, i = this.filteredItems.length; i > e; e++)
          t.push(this.filteredItems[e].element);
        return t;
      }),
      h
    );
  }),
  (function (t) {
    function e(t) {
      return new RegExp("(^|\\s+)" + t + "(\\s+|$)");
    }
    function i(t, e) {
      var i = o(t, e) ? r : n;
      i(t, e);
    }
    var o, n, r;
    "classList" in document.documentElement
      ? ((o = function (t, e) {
          return t.classList.contains(e);
        }),
        (n = function (t, e) {
          t.classList.add(e);
        }),
        (r = function (t, e) {
          t.classList.remove(e);
        }))
      : ((o = function (t, i) {
          return e(i).test(t.className);
        }),
        (n = function (t, e) {
          o(t, e) || (t.className = t.className + " " + e);
        }),
        (r = function (t, i) {
          t.className = t.className.replace(e(i), " ");
        }));
    var a = {
      hasClass: o,
      addClass: n,
      removeClass: r,
      toggleClass: i,
      has: o,
      add: n,
      remove: r,
      toggle: i,
    };
    "function" == typeof define && define.amd
      ? define("classie/classie", a)
      : "object" == typeof exports
      ? (module.exports = a)
      : (t.classie = a);
  })(window),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define("packery/js/rect", e)
      : "object" == typeof exports
      ? (module.exports = e())
      : ((t.Packery = t.Packery || {}), (t.Packery.Rect = e()));
  })(window, function () {
    function t(e) {
      for (var i in t.defaults) this[i] = t.defaults[i];
      for (i in e) this[i] = e[i];
    }
    var e = (window.Packery = function () {});
    return (
      (e.Rect = t),
      (t.defaults = { x: 0, y: 0, width: 0, height: 0 }),
      (t.prototype.contains = function (t) {
        var e = t.width || 0,
          i = t.height || 0;
        return (
          this.x <= t.x &&
          this.y <= t.y &&
          this.x + this.width >= t.x + e &&
          this.y + this.height >= t.y + i
        );
      }),
      (t.prototype.overlaps = function (t) {
        var e = this.x + this.width,
          i = this.y + this.height,
          o = t.x + t.width,
          n = t.y + t.height;
        return this.x < o && e > t.x && this.y < n && i > t.y;
      }),
      (t.prototype.getMaximalFreeRects = function (e) {
        if (!this.overlaps(e)) return !1;
        var i,
          o = [],
          n = this.x + this.width,
          r = this.y + this.height,
          a = e.x + e.width,
          s = e.y + e.height;
        return (
          this.y < e.y &&
            ((i = new t({
              x: this.x,
              y: this.y,
              width: this.width,
              height: e.y - this.y,
            })),
            o.push(i)),
          n > a &&
            ((i = new t({
              x: a,
              y: this.y,
              width: n - a,
              height: this.height,
            })),
            o.push(i)),
          r > s &&
            ((i = new t({ x: this.x, y: s, width: this.width, height: r - s })),
            o.push(i)),
          this.x < e.x &&
            ((i = new t({
              x: this.x,
              y: this.y,
              width: e.x - this.x,
              height: this.height,
            })),
            o.push(i)),
          o
        );
      }),
      (t.prototype.canFit = function (t) {
        return this.width >= t.width && this.height >= t.height;
      }),
      t
    );
  }),
  (function (t, e) {
    if ("function" == typeof define && define.amd)
      define("packery/js/packer", ["./rect"], e);
    else if ("object" == typeof exports) module.exports = e(require("./rect"));
    else {
      var i = (t.Packery = t.Packery || {});
      i.Packer = e(i.Rect);
    }
  })(window, function (t) {
    function e(t, e, i) {
      (this.width = t || 0),
        (this.height = e || 0),
        (this.sortDirection = i || "downwardLeftToRight"),
        this.reset();
    }
    (e.prototype.reset = function () {
      (this.spaces = []), (this.newSpaces = []);
      var e = new t({ x: 0, y: 0, width: this.width, height: this.height });
      this.spaces.push(e),
        (this.sorter = i[this.sortDirection] || i.downwardLeftToRight);
    }),
      (e.prototype.pack = function (t) {
        for (var e = 0, i = this.spaces.length; i > e; e++) {
          var o = this.spaces[e];
          if (o.canFit(t)) {
            this.placeInSpace(t, o);
            break;
          }
        }
      }),
      (e.prototype.placeInSpace = function (t, e) {
        (t.x = e.x), (t.y = e.y), this.placed(t);
      }),
      (e.prototype.placed = function (t) {
        for (var e = [], i = 0, o = this.spaces.length; o > i; i++) {
          var n = this.spaces[i],
            r = n.getMaximalFreeRects(t);
          r ? e.push.apply(e, r) : e.push(n);
        }
        (this.spaces = e), this.mergeSortSpaces();
      }),
      (e.prototype.mergeSortSpaces = function () {
        e.mergeRects(this.spaces), this.spaces.sort(this.sorter);
      }),
      (e.prototype.addSpace = function (t) {
        this.spaces.push(t), this.mergeSortSpaces();
      }),
      (e.mergeRects = function (t) {
        for (var e = 0, i = t.length; i > e; e++) {
          var o = t[e];
          if (o) {
            var n = t.slice(0);
            n.splice(e, 1);
            for (var r = 0, a = 0, s = n.length; s > a; a++) {
              var u = n[a],
                l = e > a ? 0 : 1;
              o.contains(u) && (t.splice(a + l - r, 1), r++);
            }
          }
        }
        return t;
      });
    var i = {
      downwardLeftToRight: function (t, e) {
        return t.y - e.y || t.x - e.x;
      },
      rightwardTopToBottom: function (t, e) {
        return t.x - e.x || t.y - e.y;
      },
    };
    return e;
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define(
          "packery/js/item",
          [
            "get-style-property/get-style-property",
            "outlayer/outlayer",
            "./rect",
          ],
          e
        )
      : "object" == typeof exports
      ? (module.exports = e(
          require("desandro-get-style-property"),
          require("outlayer"),
          require("./rect")
        ))
      : (t.Packery.Item = e(t.getStyleProperty, t.Outlayer, t.Packery.Rect));
  })(window, function (t, e, i) {
    var o =
      (t("transform"),
      function () {
        e.Item.apply(this, arguments);
      });
    o.prototype = new e.Item();
    var n = o.prototype._create;
    return (
      (o.prototype._create = function () {
        n.call(this), (this.rect = new i()), (this.placeRect = new i());
      }),
      (o.prototype.positionPlaceRect = function (t, e, i) {
        (this.placeRect.x = this.getPlaceRectCoord(t, !0)),
          (this.placeRect.y = this.getPlaceRectCoord(e, !1, i));
      }),
      (o.prototype.getPlaceRectCoord = function (t, e, i) {
        var o = e ? "Width" : "Height",
          n = this.size["outer" + o],
          r = this.layout[e ? "columnWidth" : "rowHeight"],
          a = this.layout.size["inner" + o];
        e ||
          ((a = Math.max(a, this.layout.maxY)),
          this.layout.rowHeight || (a -= this.layout.gutter));
        var s;
        if (r) {
          (r += this.layout.gutter),
            (a += e ? this.layout.gutter : 0),
            (t = Math.round(t / r));
          var u;
          u = this.layout.options.isHorizontal
            ? e
              ? "ceil"
              : "floor"
            : e
            ? "floor"
            : "ceil";
          var l = Math[u](a / r);
          (l -= Math.ceil(n / r)), (s = l);
        } else s = a - n;
        return (t = i ? t : Math.min(t, s)), (t *= r || 1), Math.max(0, t);
      }),
      (o.prototype.copyPlaceRectPosition = function () {
        (this.rect.x = this.placeRect.x), (this.rect.y = this.placeRect.y);
      }),
      (o.prototype.removeElem = function () {
        this.element.parentNode.removeChild(this.element),
          this.layout.packer.addSpace(this.rect),
          this.emitEvent("remove", [this]);
      }),
      o
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define(
          "packery/js/packery",
          [
            "classie/classie",
            "get-size/get-size",
            "outlayer/outlayer",
            "./rect",
            "./packer",
            "./item",
          ],
          e
        )
      : "object" == typeof exports
      ? (module.exports = e(
          require("desandro-classie"),
          require("get-size"),
          require("outlayer"),
          require("./rect"),
          require("./packer"),
          require("./item")
        ))
      : (t.Packery = e(
          t.classie,
          t.getSize,
          t.Outlayer,
          t.Packery.Rect,
          t.Packery.Packer,
          t.Packery.Item
        ));
  })(window, function (t, e, i, o, n, r) {
    function a(t, e) {
      return t.position.y - e.position.y || t.position.x - e.position.x;
    }
    function s(t, e) {
      return t.position.x - e.position.x || t.position.y - e.position.y;
    }
    o.prototype.canFit = function (t) {
      return this.width >= t.width - 1 && this.height >= t.height - 1;
    };
    var u = i.create("packery");
    return (
      (u.Item = r),
      (u.prototype._create = function () {
        i.prototype._create.call(this), (this.packer = new n());
      }),
      (u.prototype._resetLayout = function () {
        this.getSize(), this._getMeasurements();
        var t = this.packer;
        this.options.isHorizontal
          ? ((t.width = Number.POSITIVE_INFINITY),
            (t.height = this.size.innerHeight + this.gutter),
            (t.sortDirection = "rightwardTopToBottom"))
          : ((t.width = this.size.innerWidth + this.gutter),
            (t.height = Number.POSITIVE_INFINITY),
            (t.sortDirection = "downwardLeftToRight")),
          t.reset(),
          (this.maxY = 0),
          (this.maxX = 0);
      }),
      (u.prototype._getMeasurements = function () {
        this._getMeasurement("columnWidth", "width"),
          this._getMeasurement("rowHeight", "height"),
          this._getMeasurement("gutter", "width");
      }),
      (u.prototype._getItemLayoutPosition = function (t) {
        return this._packItem(t), t.rect;
      }),
      (u.prototype._packItem = function (t) {
        this._setRectSize(t.element, t.rect),
          this.packer.pack(t.rect),
          this._setMaxXY(t.rect);
      }),
      (u.prototype._setMaxXY = function (t) {
        (this.maxX = Math.max(t.x + t.width, this.maxX)),
          (this.maxY = Math.max(t.y + t.height, this.maxY));
      }),
      (u.prototype._setRectSize = function (t, i) {
        var o = e(t),
          n = o.outerWidth,
          r = o.outerHeight;
        (n || r) &&
          ((n = this._applyGridGutter(n, this.columnWidth)),
          (r = this._applyGridGutter(r, this.rowHeight))),
          (i.width = Math.min(n, this.packer.width)),
          (i.height = Math.min(r, this.packer.height));
      }),
      (u.prototype._applyGridGutter = function (t, e) {
        if (!e) return t + this.gutter;
        e += this.gutter;
        var i = t % e,
          o = i && 1 > i ? "round" : "ceil";
        return (t = Math[o](t / e) * e);
      }),
      (u.prototype._getContainerSize = function () {
        return this.options.isHorizontal
          ? { width: this.maxX - this.gutter }
          : { height: this.maxY - this.gutter };
      }),
      (u.prototype.sortItemsByPosition = function () {
        var t = this.options.isHorizontal ? s : a;
        this.items.sort(t);
      }),
      (u.prototype.fit = function (t, e, i) {
        var o = this.getItem(t);
        o &&
          (this._getMeasurements(),
          o.getSize(),
          (o.isPlacing = !0),
          (e = void 0 === e ? o.rect.x : e),
          (i = void 0 === i ? o.rect.y : i),
          o.positionPlaceRect(e, i, !0),
          this._bindFitEvents(o),
          o.moveTo(o.placeRect.x, o.placeRect.y),
          this.layout(),
          this.unstamp(o.element),
          this.sortItemsByPosition(),
          (o.isPlacing = !1),
          o.copyPlaceRectPosition());
      }),
      (u.prototype._bindFitEvents = function (t) {
        function e() {
          o++, 2 == o && i.emitEvent("fitComplete", [t]);
        }
        var i = this,
          o = 0;
        t.on("layout", function () {
          return e(), !0;
        }),
          this.on("layoutComplete", function () {
            return e(), !0;
          });
      }),
      (u.prototype.resize = function () {
        var t = e(this.element),
          i = this.size && t,
          o = this.options.isHorizontal ? "innerHeight" : "innerWidth";
        (i && t[o] == this.size[o]) || this.layout();
      }),
      (u.Rect = o),
      (u.Packer = n),
      u
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define(
          [
            "TG_Layout/js/layout-mode",
            "packery/js/packery",
            "get-size/get-size",
          ],
          e
        )
      : "object" == typeof exports
      ? (module.exports = e(
          require("TG_Layout-layout/js/layout-mode"),
          require("packery"),
          require("get-size")
        ))
      : e(t.TG_Layout.LayoutMode, t.Packery, t.getSize);
  })(window, function (t, e, i) {
    function o(t, e) {
      for (var i in e) t[i] = e[i];
      return t;
    }
    var n = t.create("packery"),
      r = n.prototype._getElementOffset,
      a = n.prototype._getMeasurement;
    o(n.prototype, e.prototype),
      (n.prototype._getElementOffset = r),
      (n.prototype._getMeasurement = a);
    var s = n.prototype._resetLayout;
    n.prototype._resetLayout = function () {
      (this.packer = this.packer || new e.Packer()), s.apply(this, arguments);
    };
    var u = n.prototype._getItemLayoutPosition;
    return (
      (n.prototype._getItemLayoutPosition = function (t) {
        return (t.rect = t.rect || new e.Rect()), u.call(this, t);
      }),
      (n.prototype.needsResizeLayout = function () {
        var t = i(this.element),
          e = this.size && t,
          o = this.options.isHorizontal ? "innerHeight" : "innerWidth";
        return e && t[o] != this.size[o];
      }),
      n
    );
  }),
  (function (t) {
    "use strict";
    function e(t) {
      var e = t.create("horizontal");
      return (
        (e.prototype._resetLayout = function () {
          this.x = 0;
        }),
        (e.prototype._getItemLayoutPosition = function (t) {
          t.getSize(), this._getMeasurement("gutter", "width");
          var e = 0,
            i = this.x;
          return (this.x += t.size.outerWidth + this.gutter), { x: i, y: e };
        }),
        (e.prototype._getContainerSize = function () {
          return { width: this.x - this.gutter };
        }),
        (e.prototype.needsResizeLayout = function () {
          return this.needsVerticalResizeLayout();
        }),
        e
      );
    }
    "function" == typeof define && define.amd
      ? define(["TG_Layout/js/layout-mode"], e)
      : "object" == typeof exports
      ? (module.exports = e(require("TG_Layout-layout/js/layout-mode")))
      : e(t.TG_Layout.LayoutMode);
  })(window),
  (function (t) {
    "use strict";
    function e(t) {
      var e = t.create("justified");
      return (
        (e.prototype._resetLayout = function () {
          (this.justified_data = []),
            (this.prev_width = 0),
            (this.prev_top = 0),
            (this.max_width = 0),
            (this.count = 0),
            this._getMeasurement("gutter", "width"),
            this._getMeasurement("rowHeight", "height");
          var t = this.TG_Layout.size.innerWidth + this.gutter,
            e = this.TG_Layout.filteredItems;
          if (this.options.isHorizontal) this.row(e);
          else {
            var i = 0;
            t: for (; e.length > 0; ) {
              for (var o = 1; o < e.length + 1; ++o) {
                var n = e.slice(0, o),
                  r = this.getHeight(n, t);
                if (r < this.rowHeight) {
                  this.setHeight(n, r), i++, (e = e.slice(o));
                  continue t;
                }
              }
              this.setHeight(n, Math.min(this.rowHeight, r)), i++;
              break;
            }
            this.checkWidth();
          }
        }),
        (e.prototype.row = function (t) {
          for (
            var e = this.options.row, i = this.rowHeight, o = 0;
            o < t.length;
            ++o
          ) {
            var n = jQuery(t[o].element).find(this.options.image),
              r = n[0] ? this.getSize(n) : [],
              a = r.width ? Math.round((i * r.width) / r.height) : (16 * i) / 9,
              s = this.justified_data[o - e],
              u = s ? s.x + s.width + this.gutter : 0,
              l = s ? s.y : o * (i + this.gutter);
            this.justified_data.push({ width: a, height: i, x: u, y: l });
          }
        }),
        (e.prototype.getHeight = function (t, e) {
          e -= t.length * this.gutter;
          for (var i = 0, o = 0; o < t.length; ++o) {
            var n = jQuery(t[o].element).find(this.options.image),
              r = n[0] ? this.getSize(n) : [],
              a = r.width ? r.width : (16 * this.rowHeight) / 9,
              s = r.height ? r.height : this.rowHeight;
            i += a / s;
          }
          return e / i;
        }),
        (e.prototype.setHeight = function (t, e) {
          this.prev_width = 0;
          for (var i = 0; i < t.length; ++i) {
            var o = jQuery(t[i].element).find(this.options.image),
              e = Math.round(e),
              n = o[0] ? this.getSize(o) : [],
              r = n.width ? Math.round((e * n.width) / n.height) : (16 * e) / 9;
            this.justified_data.push({
              width: r,
              height: e,
              x: this.prev_width,
              y: this.prev_top,
            }),
              (this.prev_width += r + this.gutter);
          }
          this.prev_top += e + this.gutter;
        }),
        (e.prototype.getSize = function (t) {
          if (t[0].naturalWidth)
            var e = t[0] ? t[0].naturalWidth : null,
              i = t[0] ? t[0].naturalHeight : null;
          else {
            var o = new Image();
            o.src = t[0] ? t.attr("src") : null;
            var e = o ? o.width : null,
              i = o ? o.height : null;
          }
          return { width: e, height: i };
        }),
        (e.prototype.checkWidth = function () {
          for (
            var t = 0, e = this.justified_data.length, i = 0;
            i < this.justified_data.length;
            ++i
          )
            this.justified_data[i].y != t && this.adjustWidth(i - 1),
              (t = this.justified_data[i].y);
          var o = this.justified_data[e - 1];
          o &&
            o.x + o.width > this.TG_Layout.size.innerWidth &&
            this.adjustWidth(e - 1);
        }),
        (e.prototype.adjustWidth = function (t) {
          var e = this.justified_data[t].x,
            i = this.justified_data[t].width,
            o = this.TG_Layout.size.innerWidth - (e + i);
          this.justified_data[t].width = i + o;
        }),
        (e.prototype._getItemLayoutPosition = function (t) {
          if (!this.justified_data[this.count]) {
            (this.pcount = this.count), this._resetLayout();
            for (var e = 0; e < this.pcount; ++e) {
              jQuery(this.TG_Layout.filteredItems[e].element)
                .width(this.justified_data[e].width)
                .height(this.justified_data[e].height)
                .css("top", this.justified_data[e].y)
                .css("left", this.justified_data[e].x);
              var i = this.justified_data[e].x + this.justified_data[e].width;
              this.max_width = i > this.max_width ? i : this.max_width;
            }
            this.count = this.pcount;
          }
          (t.element.style.width =
            this.justified_data[this.count].width + "px"),
            (t.element.style.height =
              this.justified_data[this.count].height + "px");
          var o = {
              x: this.justified_data[this.count].x,
              y: this.justified_data[this.count].y,
            },
            i = o.x + this.justified_data[this.count].width;
          return (
            (this.max_width = i > this.max_width ? i : this.max_width),
            ++this.count,
            o
          );
        }),
        (e.prototype._getContainerSize = function () {
          return this.options.isHorizontal
            ? {
                width: this.max_width,
                height:
                  (this.rowHeight + this.gutter) * this.options.row -
                  this.gutter,
              }
            : { height: this.prev_top - this.gutter };
        }),
        (e.prototype.needsResizeLayout = function () {
          return this.max_width;
        }),
        e
      );
    }
    "function" == typeof define && define.amd
      ? define(["TG_Layout/js/TG_Layout-mode"], cellsByRowDefinition)
      : e(t.TG_Layout.LayoutMode);
  })(window),
  (function (t) {
    var e = TG_Layout.Item.prototype.reveal;
    TG_Layout.Item.prototype.reveal = function () {
      e.apply(this, arguments), t(this.element).removeClass("tg-item-hidden");
    };
    var i = TG_Layout.Item.prototype.hide;
    TG_Layout.Item.prototype.hide = function () {
      i.apply(this, arguments), t(this.element).addClass("tg-item-hidden");
    };
  })(jQuery),
  (function (t, e, i) {
    "use strict";
    function o(e, f, m) {
      function x(e) {
        var i = 0,
          o = bt.length,
          n = dt.data("TG_Layout"),
          r = n ? n.options[n.options.layoutMode].gutter.offsetWidth : 0;
        if (!n) return !1;
        if (
          ((ct = lt.width()),
          (gt = ft.width()),
          (ht = dt.outerWidth()),
          (bt.length = 0),
          (pt.start = 0),
          (pt.end = E(ht - ct, 0)),
          Et)
        ) {
          (i = xt.length), (Tt = dt.children(at.itemSelector)), (xt.length = 0);
          for (
            var a,
              s = l(dt, at.horizontal ? "paddingLeft" : "paddingTop"),
              u = l(dt, at.horizontal ? "paddingRight" : "paddingBottom"),
              c = "border-box" === t(Tt).css("boxSizing"),
              h = n.filteredItems,
              p = 0,
              f = 0,
              m = 0,
              g = [],
              y = [],
              v = 0;
            v < h.length;
            v++
          ) {
            var _ = parseFloat(getComputedStyle(h[v].element).width) + r,
              w = h[v].position.x;
            (m = w + _ > m ? w + _ : m), g.push(w);
          }
          g.push(m),
            g.sort(function (t, e) {
              return t - e;
            });
          for (var v = 1; v < g.length; v++) y.push(g[v] - g[v - 1]);
          (ht = 0),
            t(h).each(function (t, e) {
              var i = r / 2,
                o = r / 2,
                n = {};
              (n.el = e),
                (n.size = y[t]),
                (n.half = n.size / 2),
                (n.start = ht - i),
                (n.center = n.start - G(ct / 2 - n.size / 2)),
                (n.end = n.start - ct + n.size),
                t || (ht += s),
                (ht += n.size),
                at.horizontal || (o && i && t > 0 && (ht -= k(i, o))),
                t === f && ((n.end += u), (ht += u), (p = o)),
                n.size && (xt.push(n), (a = n));
            }),
            (dt[0].style[at.horizontal ? "width" : "height"] =
              (c ? ht : ht - s - u) + "px"),
            (ht -= p),
            xt.length
              ? ((pt.start = xt[0][Pt ? "center" : "start"]),
                (pt.end = Pt ? a.center : ht > ct ? a.end : pt.start))
              : (pt.start = pt.end = 0);
        }
        if (((pt.center = G(pt.end / 2 + pt.start / 2)), A(), !ut && ct > 0)) {
          var b = pt.start,
            T = "";
          if (Et)
            t.each(xt, function (t, e) {
              Pt
                ? bt.push(e.center)
                : e.start + e.size > b &&
                  b <= pt.end &&
                  ((b = e.start),
                  bt.push(
                    e.size < ct && "justified" === n.options.layoutMode
                      ? e.start + (e.size - ct) / 2
                      : e.start
                  ),
                  (b += ct),
                  b > pt.end && b < pt.end + ct && bt.push(pt.end));
            });
          else for (; b - ct < pt.end; ) bt.push(b), (b += ct);
          if (_t[0] && o !== bt.length) {
            for (var v = 0; v < bt.length; v++) T += at.pageBuilder.call(st, v);
            1 === bt.length && (T = null),
              (wt = _t.html(T).children()),
              wt.eq(zt.activePage).addClass(at.activeClass);
          }
        }
        if (
          ((zt.slideeSize = ht),
          (zt.frameSize = ct),
          (zt.sbSize = gt),
          (zt.handleSize = yt),
          Et)
        ) {
          e &&
            null != at.startAt &&
            st[Gt ? "toCenter" : "toStart"](at.startAt);
          var x = xt[zt.activeItem];
          M(Gt && x ? x.center : d(pt.dest, pt.start, pt.end));
        } else
          e
            ? null != at.startAt && M(at.startAt, 1)
            : M(d(pt.dest, pt.start, pt.end));
        ot("load");
      }
      function M(t, e, i) {
        if (Et && Nt.released && !i) {
          var o = q(t),
            n = t > pt.start && t < pt.end;
          Gt
            ? (n && (t = xt[o.centerItem].center),
              Pt && at.activateMiddle && activate(o.centerItem))
            : n && (t = xt[o.firstItem].start);
        }
        Nt.init && Nt.slidee && at.elasticBounds
          ? t > pt.end
            ? (t = pt.end + (t - pt.end) / 6)
            : t < pt.start && (t = pt.start + (t - pt.start) / 6)
          : (t = d(t, pt.start, pt.end)),
          (Ht.start = +new Date()),
          (Ht.time = 0),
          (Ht.from = pt.cur),
          (Ht.to = t),
          (Ht.delta = t - pt.cur),
          (Ht.tweesing = Nt.tweese || (Nt.init && !Nt.slidee)),
          (Ht.immediate =
            !Ht.tweesing && (e || (Nt.init && Nt.slidee) || !at.speed)),
          (Nt.tweese = 0),
          t !== pt.dest && ((pt.dest = t), ot("change"), Yt || R()),
          N(),
          A(),
          H(),
          D();
      }
      function R() {
        if (st.initialized) {
          if (!Yt) return (Yt = v(R)), void (Nt.released && ot("moveStart"));
          Ht.immediate
            ? (pt.cur = Ht.to)
            : Ht.tweesing
            ? ((Ht.tweeseDelta = Ht.to - pt.cur),
              S(Ht.tweeseDelta) < 0.1
                ? (pt.cur = Ht.to)
                : (pt.cur +=
                    Ht.tweeseDelta *
                    (Nt.released ? at.swingSpeed : at.syncSpeed)))
            : ((Ht.time = k(+new Date() - Ht.start, at.speed)),
              (pt.cur =
                Ht.from +
                Ht.delta *
                  t.easing[at.easing](
                    Ht.time / at.speed,
                    Ht.time,
                    0,
                    1,
                    at.speed
                  ))),
            Ht.to === pt.cur
              ? ((pt.cur = Ht.to), (Nt.tweese = Yt = 0))
              : (Yt = v(R)),
            ot("move"),
            ut ||
              (h
                ? (dt[0].style[h] =
                    p +
                    (at.horizontal ? "translateX" : "translateY") +
                    "(" +
                    -pt.cur +
                    "px)")
                : (dt[0].style[at.horizontal ? "left" : "top"] =
                    -G(pt.cur) + "px")),
            !Yt && Nt.released && ot("moveEnd");
        }
      }
      function D() {
        wt[0] &&
          At.page !== zt.activePage &&
          ((At.page = zt.activePage),
          wt
            .removeClass(at.activeClass)
            .eq(zt.activePage)
            .addClass(at.activeClass),
          ot("activePage", At.page));
      }
      function O() {
        (Ft.speed && pt.cur !== (Ft.speed > 0 ? pt.end : pt.start)) ||
          st.stop(),
          (Vt = Nt.init ? v(O) : 0),
          (Ft.now = +new Date()),
          (Ft.pos = pt.cur + ((Ft.now - Ft.lastTime) / 1e3) * Ft.speed),
          M(Nt.init ? Ft.pos : G(Ft.pos)),
          Nt.init || pt.cur !== pt.dest || ot("moveEnd"),
          (Ft.lastTime = Ft.now);
      }
      function W(t, e, o) {
        if (("boolean" === n(e) && ((o = e), (e = i)), e === i)) M(pt[t], o);
        else {
          if (Gt && "center" !== t) return;
          var r = st.getPos(e);
          r && M(r[t], o, !Gt);
        }
      }
      function B(t) {
        return null != t
          ? u(t)
            ? t >= 0 && t < xt.length
              ? t
              : -1
            : Tt.index(t)
          : -1;
      }
      function q(t) {
        t = d(u(t) ? t : pt.dest, pt.start, pt.end);
        var e = {},
          i = Pt ? 0 : ct / 2;
        if (!ut)
          for (var o = 0, n = bt.length; n > o; o++) {
            if (t >= pt.end || o === bt.length - 1) {
              e.activePage = bt.length - 1;
              break;
            }
            if (t <= bt[o] + i) {
              e.activePage = o;
              break;
            }
          }
        if (Et) {
          for (var r = !1, a = !1, s = !1, l = 0, c = xt.length; c > l; l++)
            if (
              (r === !1 && t <= xt[l].start + xt[l].half && (r = l),
              s === !1 && t <= xt[l].center + xt[l].half && (s = l),
              l === c - 1 || t <= xt[l].end + xt[l].half)
            ) {
              a = l;
              break;
            }
          (e.firstItem = u(r) ? r : 0),
            (e.centerItem = u(s) ? s : e.firstItem),
            (e.lastItem = u(a) ? a : e.centerItem);
        }
        return e;
      }
      function A(e) {
        t.extend(zt, q(e));
      }
      function H() {
        var t = pt.dest <= pt.start,
          e = pt.dest >= pt.end,
          i = (t ? 1 : 0) | (e ? 2 : 0);
        if (
          (At.slideePosState !== i &&
            ((At.slideePosState = i),
            Wt.is("button,input") && Wt.prop("disabled", t),
            Bt.is("button,input") && Bt.prop("disabled", e),
            Wt.add(Rt)[t ? "addClass" : "removeClass"](at.disabledClass),
            Bt.add(Mt)[e ? "addClass" : "removeClass"](at.disabledClass)),
          At.fwdbwdState !== i &&
            Nt.released &&
            ((At.fwdbwdState = i),
            Rt.is("button,input") && Rt.prop("disabled", t),
            Mt.is("button,input") && Mt.prop("disabled", e)),
          Et && null != zt.activeItem)
        ) {
          var o = 0 === zt.activeItem,
            n = zt.activeItem >= xt.length - 1,
            r = (o ? 1 : 0) | (n ? 2 : 0);
          At.itemsButtonState !== r &&
            ((At.itemsButtonState = r),
            Dt.is("button,input") && Dt.prop("disabled", o),
            Ot.is("button,input") && Ot.prop("disabled", n),
            Dt[o ? "addClass" : "removeClass"](at.disabledClass),
            Ot[n ? "addClass" : "removeClass"](at.disabledClass));
        }
      }
      function F(t, e) {
        for (var i = 0, o = qt[t].length; o > i; i++)
          if (qt[t][i] === e) return i;
        return -1;
      }
      function N() {
        Nt.released && !st.isPaused && st.resume();
      }
      function Y(t) {
        return (
          G((d(t, vt.start, vt.end) / vt.end) * (pt.end - pt.start)) + pt.start
        );
      }
      function Q() {
        (Nt.history[0] = Nt.history[1]),
          (Nt.history[1] = Nt.history[2]),
          (Nt.history[2] = Nt.history[3]),
          (Nt.history[3] = Nt.delta);
      }
      function X(t) {
        (Nt.released = 0), (Nt.source = t), (Nt.slidee = "slidee" === t);
      }
      function V(e) {
        var i = "touchstart" === e.type,
          o = e.data.source,
          n = "slidee" === o;
        Nt.init ||
          (!i && Z(e.target)) ||
          (("handle" !== o || (at.dragHandle && vt.start !== vt.end)) &&
            (!n || (i ? at.touchDragging : at.mouseDragging && e.which < 2)) &&
            (i || r(e),
            X(o),
            (Nt.init = 0),
            (Nt.$source = t(e.target)),
            (Nt.touch = i),
            (Nt.pointer = i ? e.originalEvent.touches[0] : e),
            (Nt.initX = Nt.pointer.pageX),
            (Nt.initY = Nt.pointer.pageY),
            (Nt.initPos = n ? pt.cur : vt.cur),
            (Nt.start = +new Date()),
            (Nt.time = 0),
            (Nt.path = 0),
            (Nt.delta = 0),
            (Nt.locked = 0),
            (Nt.history = [0, 0, 0, 0]),
            (Nt.pathToLock = n ? (i ? 30 : 10) : 0),
            _.on(i ? T : b, U),
            st.pause(1),
            (n ? dt : mt).addClass(at.draggedClass),
            ot("moveStart"),
            n && (Qt = setInterval(Q, 10))));
      }
      function U(t) {
        if (
          ((Nt.released = "mouseup" === t.type || "touchend" === t.type),
          (Nt.pointer = Nt.touch
            ? t.originalEvent[Nt.released ? "changedTouches" : "touches"][0]
            : t),
          (Nt.pathX = Nt.pointer.pageX - Nt.initX),
          (Nt.pathY = Nt.pointer.pageY - Nt.initY),
          (Nt.path = j(P(Nt.pathX, 2) + P(Nt.pathY, 2))),
          (Nt.delta = at.horizontal ? Nt.pathX : Nt.pathY),
          Nt.released || !(Nt.path < 1))
        ) {
          if (!Nt.init) {
            if (
              !(at.horizontal
                ? S(Nt.pathX) > S(Nt.pathY)
                : S(Nt.pathX) < S(Nt.pathY))
            )
              return $();
            Nt.init = 1;
          }
          r(t),
            !Nt.locked &&
              Nt.path > Nt.pathToLock &&
              Nt.slidee &&
              ((Nt.locked = 1), Nt.$source.on(z, a)),
            Nt.released &&
              ($(),
              at.releaseSwing &&
                Nt.slidee &&
                ((Nt.swing = ((Nt.delta - Nt.history[0]) / 40) * 300),
                (Nt.delta += Nt.swing),
                (Nt.tweese = S(Nt.swing) > 10))),
            M(Nt.slidee ? G(Nt.initPos - Nt.delta) : Y(Nt.initPos + Nt.delta));
        }
      }
      function $() {
        clearInterval(Qt),
          (Nt.released = !0),
          _.off(Nt.touch ? T : b, U),
          (Nt.slidee ? dt : mt).removeClass(at.draggedClass),
          setTimeout(function () {
            Nt.$source.off(z, a);
          }),
          pt.cur === pt.dest && Nt.init && ot("moveEnd"),
          st.resume(1),
          (Nt.init = 0);
      }
      function Z(e) {
        return ~t.inArray(e.nodeName, L) || t(e).is(at.interactive);
      }
      function J() {
        st.stop(), _.off("mouseup", J);
      }
      function K(t) {
        switch ((r(t), this)) {
          case Mt[0]:
          case Rt[0]:
            st.moveBy(Mt.is(this) ? at.moveBy : -at.moveBy), _.on("mouseup", J);
            break;
          case Dt[0]:
            st.prev();
            break;
          case Ot[0]:
            st.next();
            break;
          case Wt[0]:
            st.prevPage();
            break;
          case Bt[0]:
            st.nextPage();
        }
      }
      function tt(t) {
        if (at.keyboardNavBy)
          switch (t.which) {
            case at.horizontal ? 37 : 38:
              r(t), st["pages" === at.keyboardNavBy ? "prevPage" : "prev"]();
              break;
            case at.horizontal ? 39 : 40:
              r(t), st["pages" === at.keyboardNavBy ? "nextPage" : "next"]();
          }
      }
      function et() {
        this.parentNode === _t[0] && st.activatePage(wt.index(this));
      }
      function it(t) {
        at.pauseOnHover && st["mouseenter" === t.type ? "pause" : "resume"](2);
      }
      function ot(t, e) {
        if (qt[t]) {
          for (rt = qt[t].length, I.length = 0, nt = 0; rt > nt; nt++)
            I.push(qt[t][nt]);
          for (nt = 0; rt > nt; nt++) I[nt].call(st, t, e);
        }
      }
      var nt,
        rt,
        at = t.extend({}, o.defaults, f),
        st = this,
        ut = u(e),
        lt = t(e),
        dt = at.slidee ? t(at.slidee).eq(0) : lt.children().eq(0),
        ct = 0,
        ht = 0,
        pt = { start: 0, center: 0, end: 0, cur: 0, dest: 0 },
        ft = t(at.scrollBar).eq(0),
        mt = ft.children().eq(0),
        gt = 0,
        yt = 0,
        vt = { start: 0, end: 0, cur: 0 },
        _t = t(at.pagesBar),
        wt = 0,
        bt = [],
        Tt = 0,
        xt = [],
        zt = {
          firstItem: 0,
          lastItem: 0,
          centerItem: 0,
          activeItem: null,
          activePage: 0,
        },
        Ct = new c(lt[0]),
        Lt = new c(dt[0]),
        It = new c(ft[0]),
        St = new c(mt[0]),
        jt = "basic" === at.itemNav,
        Pt = "forceCentered" === at.itemNav,
        Gt = "centered" === at.itemNav || Pt,
        Et = !ut && (jt || Gt || Pt),
        kt =
          (at.scrollSource ? t(at.scrollSource) : lt,
          at.dragSource ? t(at.dragSource) : lt),
        Mt = t(at.forward),
        Rt = t(at.backward),
        Dt = t(at.prev),
        Ot = t(at.next),
        Wt = t(at.prevPage),
        Bt = t(at.nextPage),
        qt = {},
        At = {},
        Ht = {},
        Ft = {},
        Nt = { released: 1 },
        Yt = 0,
        Qt = 0,
        Xt = 0,
        Vt = 0;
      ut || (e = lt[0]),
        (st.initialized = 0),
        (st.frame = e),
        (st.slidee = dt[0]),
        (st.pos = pt),
        (st.rel = zt),
        (st.items = xt),
        (st.pages = bt),
        (st.isPaused = 0),
        (st.options = at),
        (st.dragging = Nt),
        (st.reload = function () {
          x();
        }),
        (st.getPos = function (t) {
          if (Et) {
            var e = B(t);
            return -1 !== e ? xt[e] : !1;
          }
          var i = dt.find(t).eq(0);
          if (i[0]) {
            var o = at.horizontal
                ? i.offset().left - dt.offset().left
                : i.offset().top - dt.offset().top,
              n = i[at.horizontal ? "outerWidth" : "outerHeight"]();
            return {
              start: o,
              center: o - ct / 2 + n / 2,
              end: o - ct + n,
              size: n,
            };
          }
          return !1;
        }),
        (st.moveBy = function (t) {
          (Ft.speed = t),
            !Nt.init &&
              Ft.speed &&
              pt.cur !== (Ft.speed > 0 ? pt.end : pt.start) &&
              ((Ft.lastTime = +new Date()),
              (Ft.startPos = pt.cur),
              X("button"),
              (Nt.init = 1),
              ot("moveStart"),
              y(Vt),
              O());
        }),
        (st.stop = function () {
          "button" === Nt.source && ((Nt.init = 0), (Nt.released = 1));
        }),
        (st.prev = function () {
          st.activate(null == zt.activeItem ? 0 : zt.activeItem - 1);
        }),
        (st.next = function () {
          st.activate(null == zt.activeItem ? 0 : zt.activeItem + 1);
        }),
        (st.prevPage = function () {
          st.activatePage(zt.activePage - 1);
        }),
        (st.nextPage = function () {
          st.activatePage(zt.activePage + 1);
        }),
        (st.slideBy = function (t, e) {
          t &&
            (Et
              ? st[Gt ? "toCenter" : "toStart"](
                  d(
                    (Gt ? zt.centerItem : zt.firstItem) + at.scrollBy * t,
                    0,
                    xt.length
                  )
                )
              : M(pt.dest + t, e));
        }),
        (st.slideTo = function (t, e) {
          M(t, e);
        }),
        (st.toStart = function (t, e) {
          W("start", t, e);
        }),
        (st.toEnd = function (t, e) {
          W("end", t, e);
        }),
        (st.toCenter = function (t, e) {
          W("center", t, e);
        }),
        (st.getIndex = B),
        (st.activatePage = function (t, e) {
          u(t) && M(bt[d(t, 0, bt.length - 1)], e);
        }),
        (st.resume = function (t) {
          at.cycleBy &&
            at.cycleInterval &&
            ("items" !== at.cycleBy || (xt[0] && null != zt.activeItem)) &&
            !(t < st.isPaused) &&
            ((st.isPaused = 0),
            Xt ? (Xt = clearTimeout(Xt)) : ot("resume"),
            (Xt = setTimeout(function () {
              switch ((ot("cycle"), at.cycleBy)) {
                case "items":
                  st.activate(
                    zt.activeItem >= xt.length - 1 ? 0 : zt.activeItem + 1
                  );
                  break;
                case "pages":
                  st.activatePage(
                    zt.activePage >= bt.length - 1 ? 0 : zt.activePage + 1
                  );
              }
            }, at.cycleInterval)));
        }),
        (st.pause = function (t) {
          t < st.isPaused ||
            ((st.isPaused = t || 100),
            Xt && ((Xt = clearTimeout(Xt)), ot("pause")));
        }),
        (st.toggle = function () {
          st[Xt ? "pause" : "resume"]();
        }),
        (st.on = function (t, e) {
          if ("object" === n(t))
            for (var i in t) t.hasOwnProperty(i) && st.on(i, t[i]);
          else if ("function" === n(e))
            for (var o = t.split(" "), r = 0, a = o.length; a > r; r++)
              (qt[o[r]] = qt[o[r]] || []),
                -1 === F(o[r], e) && qt[o[r]].push(e);
          else if ("array" === n(e))
            for (var s = 0, u = e.length; u > s; s++) st.on(t, e[s]);
        }),
        (st.init = function () {
          if (!st.initialized) {
            st.on(m);
            var t = ["overflow", "position"],
              e = [
                "position",
                "webkitTransform",
                "msTransform",
                "transform",
                "left",
                "top",
                "width",
                "height",
              ];
            Ct.save.apply(Ct, t),
              It.save.apply(It, t),
              Lt.save.apply(Lt, e),
              St.save.apply(St, e);
            var i = mt;
            return (
              ut ||
                ((i = i.add(dt)),
                lt.css("overflow", "hidden"),
                h ||
                  "static" !== lt.css("position") ||
                  lt.css("position", "relative")),
              h
                ? p && i.css(h, p)
                : ("static" === ft.css("position") &&
                    ft.css("position", "relative"),
                  i.css({ position: "absolute" })),
              at.forward && Mt.on(C, K),
              at.backward && Rt.on(C, K),
              at.prev && Dt.on(z, K),
              at.next && Ot.on(z, K),
              at.prevPage && Wt.on(z, K),
              at.nextPage && Bt.on(z, K),
              _t[0] &&
                at.activatePageOn &&
                _t.on(at.activatePageOn + "." + g, "*", et),
              kt.on(w, { source: "slidee" }, V),
              mt && mt.on(w, { source: "handle" }, V),
              _.on("keydown", tt),
              ut ||
                (lt.on("mouseenter." + g + " mouseleave." + g, it),
                lt.on("scroll." + g, s)),
              (st.initialized = 1),
              x(!0),
              at.cycleBy && !ut && st[at.startPaused ? "pause" : "resume"](),
              st
            );
          }
        });
    }
    function n(t) {
      return null == t
        ? String(t)
        : "object" == typeof t || "function" == typeof t
        ? Object.prototype.toString
            .call(t)
            .match(/\s([a-z]+)/i)[1]
            .toLowerCase() || "object"
        : typeof t;
    }
    function r(t, e) {
      t.preventDefault(), e && t.stopPropagation();
    }
    function a(e) {
      r(e, 1), t(this).off(e.type, a);
    }
    function s() {
      (this.scrollLeft = 0), (this.scrollTop = 0);
    }
    function u(t) {
      return !isNaN(parseFloat(t)) && isFinite(t);
    }
    function l(t, e) {
      return 0 | G(String(t.css(e)).replace(/[^\-0-9.]/g, ""));
    }
    function d(t, e, i) {
      return e > t ? e : t > i ? i : t;
    }
    function c(t) {
      var e = {};
      return (
        (e.style = {}),
        (e.save = function () {
          if (t && t.nodeType) {
            for (var i = 0; i < arguments.length; i++)
              e.style[arguments[i]] = t.style[arguments[i]];
            return e;
          }
        }),
        (e.restore = function () {
          if (t && t.nodeType) {
            for (var i in e.style)
              e.style.hasOwnProperty(i) && (t.style[i] = e.style[i]);
            return e;
          }
        }),
        e
      );
    }
    var h,
      p,
      f = "TG_Slider",
      m = "TG_Slider",
      g = f,
      y = e.cancelAnimationFrame || e.cancelRequestAnimationFrame,
      v = e.requestAnimationFrame,
      _ = t(document),
      w = "touchstart." + g + " mousedown." + g,
      b = "mousemove." + g + " mouseup." + g,
      T = "touchmove." + g + " touchend." + g,
      x =
        (document.implementation.hasFeature("Event.wheel", "3.0")
          ? "wheel."
          : "mousewheel.") + g,
      z = "click." + g,
      C = "mousedown." + g,
      L = ["INPUT", "SELECT", "BUTTON", "TEXTAREA"],
      I = [],
      S = Math.abs,
      j = Math.sqrt,
      P = Math.pow,
      G = Math.round,
      E = Math.max,
      k = Math.min,
      M = 0;
    _.on(x, function (t) {
      var e = t.originalEvent[g],
        i = +new Date();
      (!e || e.options.scrollHijack < i - M) && (M = i);
    }),
      (function (t) {
        function e(t) {
          var e = new Date().getTime(),
            o = Math.max(0, 16 - (e - i)),
            n = setTimeout(t, o);
          return (i = e), n;
        }
        v = t.requestAnimationFrame || t.webkitRequestAnimationFrame || e;
        var i = new Date().getTime(),
          o =
            t.cancelAnimationFrame ||
            t.webkitCancelAnimationFrame ||
            t.clearTimeout;
        y = function (e) {
          o.call(t, e);
        };
      })(window),
      (function () {
        function t(t) {
          for (var o = 0, n = e.length; n > o; o++) {
            var r = e[o] ? e[o] + t.charAt(0).toUpperCase() + t.slice(1) : t;
            if (null != i.style[r]) return r;
          }
        }
        var e = ["", "Webkit", "Moz", "ms", "O"],
          i = document.createElement("div");
        (h = t("transform")), (p = t("perspective") ? "translateZ(0) " : "");
      })(),
      (e[m] = o),
      (t.fn[f] = function (e, i) {
        var r, a;
        return (
          t.isPlainObject(e) ||
            (("string" === n(e) || e === !1) &&
              ((r = e === !1 ? "destroy" : e),
              (a = Array.prototype.slice.call(arguments, 1))),
            (e = {})),
          this.each(function (n, s) {
            var u = t.data(s, g);
            u || r
              ? u && r && u[r] && u[r].apply(u, a)
              : (u = t.data(s, g, new o(s, e, i).init()));
          })
        );
      });
  })(jQuery, window),
  jQuery.noConflict();
var The_Grid = {
    preview: "#tg-grid-preview-inner",
    wrapper: ".tg-grid-wrapper",
    slider: ".tg-grid-slider",
    grid: ".tg-grid-holder",
    loader: ".tg-grid-preloader",
    ajax: ".tg-ajax-button",
    ajaxMsg: ".tg-ajax-scroll-holder",
    sizer: ".tg-grid-sizer",
    gutter: ".tg-gutter-sizer",
    item: ".tg-item",
    itemImg: ".tg-item-image",
    gallery: ".tg-item-gallery-holder",
    tooltip: ".tg-filter-count",
    filterH: ".tg-filters-holder",
    filter: ".tg-filter, .tg-filters-holder select",
    search: ".tg-search",
    clear: ".tg-search-clear",
    sorter: ".tg-sorters-holder",
    sorterBy: ".tg-sorter li, select.tg-sorter",
    sortASC: ".tg-sorter-order",
    arrLeft: ".tg-left-arrow",
    arrRight: ".tg-right-arrow",
    bullets: ".tg-slider-bullets",
    pages: ".tg-page-ajax",
    sortData: {
      excerpt: "p",
      title: function (t) {
        return jQuery(t).data("title");
      },
      id: function (t) {
        return jQuery(t).data("id");
      },
      date: function (t) {
        return jQuery(t).data("date");
      },
      author: function (t) {
        return jQuery(t).data("author");
      },
      comment: function (t) {
        return jQuery(t).data("comment");
      },
      popular_post: function (t) {
        return jQuery(t).data("popular-post");
      },
      total_sales: function (t) {
        return jQuery(t).data("total-sales");
      },
      regular_price: function (t) {
        return jQuery(t).data("regular-price");
      },
      sale_price: function (t) {
        return jQuery(t).data("sale-price");
      },
      featured: function (t) {
        return jQuery(t).data("featured");
      },
      stock: function (t) {
        return jQuery(t).data("stock");
      },
      sku: function (t) {
        return jQuery(t).data("sku");
      },
    },
    defaults: {
      style: "grid",
      layout: "vertical",
      fitrows: !1,
      fullWidth: null,
      fullHeight: null,
      rtl: !0,
      filterComb: !1,
      filterLogic: "AND",
      filterLoad: "",
      sortByLoad: "",
      orderLoad: !1,
      row: 1,
      ratio: 1,
      gutters: [
        [9999, 0],
        [1200, 0],
        [980, 0],
        [768, 0],
        [480, 0],
        [320, 0],
      ],
      cols: [
        [9999, 4],
        [1200, 3],
        [980, 3],
        [768, 2],
        [480, 1],
        [320, 1],
      ],
      rows: [
        [9999, 240],
        [1200, 240],
        [980, 220],
        [768, 220],
        [480, 200],
        [320, 200],
      ],
      animation: [{ name: "None" }, { visible: "" }, { hidden: "" }],
      transition: 0,
      itemNav: null,
      swingSpeed: 500,
      cycleBy: null,
      cycle: 5e3,
      startAt: 0,
      ajaxMethod: null,
      ajaxDelay: 0,
      preloader: 0,
      itemDelay: 0,
      gallery: !1,
    },
  },
  tg_meta_data = tg_global_var.meta_data,
  tg_custom_sorter = {};
if (tg_meta_data)
  for (var i = 0; i < tg_meta_data.length; i++) {
    var tg_cmk = tg_meta_data[i].key;
    tg_cmk = tg_cmk.length && "_" == tg_cmk[0] ? tg_cmk.slice(1) : tg_cmk;
    var tg_cma = tg_cmk.replace(/\_/g, "-");
    !(function (t) {
      tg_custom_sorter[tg_cmk] = function (e) {
        return jQuery(e).data(t);
      };
    })(tg_cma);
  }
The_Grid.sortData = jQuery.extend({}, The_Grid.sortData, tg_custom_sorter);
var tg_debounce_resize = tg_global_var.debounce ? "debouncedresize" : "resize",
  tg_is_mobile = tg_global_var.is_mobile;
!(function (t) {
  "use strict";
  function e() {
    var e,
      i,
      o,
      n,
      r,
      a,
      s = window.navigator.userAgent.indexOf("Edge/"),
      u = "ontouchstart" in window || navigator.msMaxTouchPoints,
      l =
        "div:not(.tg-item-gallery-holder) > .tg-item-image, .tg-item-media-poster, .tg-item-audio-poster, .tg-item-gallery-holder",
      d = 0.4,
      c = 0;
    !u &&
      !t("body").hasClass("is-ie") &&
      0 > s &&
      t(document)
        .on("mousemove", ".tg-panZ", function (s) {
          (e = t(this)),
            (n = e.width()),
            (o = e.height()),
            (i = e.closest(".tg-item").offset());
          var u = Date.now();
          u > c + 80 &&
            ((c = u),
            window.requestAnimationFrame(function () {
              (r = 0.08 * -(s.pageX - i.left - n / 2) * d),
                (a = 0.08 * -(s.pageY - i.top - o / 2) * d),
                t(s.target)
                  .closest(".tg-item")
                  .find(l)
                  .css({
                    "-webkit-transform":
                      "matrix(1.08, 0, 0, 1.08," + r + "," + a + ")",
                    "-moz-transform":
                      "matrix(1.08, 0, 0, 1.08," + r + "," + a + ")",
                  });
            }));
        })
        .on("mouseleave", ".tg-panZ", function (e) {
          setTimeout(function () {
            t(e.target)
              .closest(".tg-item")
              .find(l)
              .css({ "-webkit-transform": "", "-moz-transform": "" });
          }, 80);
        });
  }
  function o() {
    function e(t, e) {
      var i = s.scrollTop || a.scrollTop,
        o = s.scrollLeft,
        n = t.pageX,
        r = t.pageY,
        u = e[0].getBoundingClientRect(),
        l = e[0].clientWidth || e[0].offsetWidth || e[0].scrollWidth,
        d = e[0].clientHeight || e[0].offsetHeight || e[0].scrollHeight,
        c = 320 / l,
        h = 0.52 - (n - u.left - o) / l,
        p = 0.52 - (r - u.top - i) / d,
        f = r - u.top - i - d / 2,
        m = n - u.left - o - l / 2,
        g = (h - m) * (0.07 * c),
        y = (f - p) * (0.1 * c),
        v = d > l ? (d / l) * 2 : 1,
        _ = 3 * l * v,
        w =
          "perspective(" +
          _ +
          "px) rotateX(" +
          y +
          "deg) rotateY(" +
          g +
          "deg) scale3d(1.03,1.03,1.03)";
      e.css(
        "transform",
        w +
          " translateX(" +
          2 * h * (2.5 / c) +
          "px) translateY(" +
          1 * p * (2.5 / c) +
          "px)"
      );
    }
    function i(t) {
      t.addClass("over");
    }
    function o(t) {
      t.removeClass("over"),
        setTimeout(function () {
          var e = t[0].clientWidth || t[0].offsetWidth || t[0].scrollWidth;
          t.css(
            "transform",
            "perspective(" +
              3 * e +
              "px) rotateX(0deg) rotateY(0deg) translateZ(0)"
          );
        }, 80);
    }
    var n = document,
      r = 0,
      a = n.getElementsByTagName("html")[0],
      s = n.getElementsByTagName("body")[0],
      u = "ontouchstart" in window || navigator.msMaxTouchPoints,
      l = t("body").hasClass("is-ie") ? 1 : 80;
    u ||
      t(document)
        .on("mousemove", ".tg-atv-anim", function (i) {
          var o = t(this),
            n = Date.now();
          n > r + l &&
            ((r = n),
            window.requestAnimationFrame(function () {
              e(i, o);
            }));
        })
        .on("mouseenter", ".tg-atv-anim", function (e) {
          i(t(this));
        })
        .on("mouseleave", ".tg-atv-anim", function (e) {
          o(t(this));
        });
  }
  t.fn.The_Grid = function (e) {
    return this.each(function () {
      function e(t) {
        var e = nt.not(".tg-item-hidden").length;
        t.length === e && P.reload();
      }
      function i(e) {
        for (var i = 0; i < t(e).length; i++)
          for (
            var o, n, r = t(e).eq(i), a = r.get(0).attributes, s = 0;
            s < a.length;
            s++
          )
            (o = a[s].name),
              (n = a[s].value),
              0 === o.indexOf("data-") &&
                "data-row" !== o &&
                "data-col" !== o &&
                (r.removeAttr(o), r.data(o.replace("data-", ""), n), s--);
      }
      function o(e) {
        if (!Y) return !1;
        var i;
        nt.removeClass("tg-item-index"),
          st.val(""),
          vt.filterComb
            ? ((i = []),
              (q =
                "*" === e.data("filter")
                  ? e.nextAll("[data-filter]").removeClass("tg-filter-active")
                  : e
                      .prevAll('[data-filter="*"]')
                      .removeClass("tg-filter-active")),
              (q =
                "*" === e.data("filter")
                  ? e.closest("select").find("option").prop("selected", !1)
                  : e
                      .closest("select")
                      .find('[data-filter="*"]')
                      .prop("selected", !0)),
              e.toggleClass("tg-filter-active"),
              $.find(".tg-filter-active").each(function () {
                "*" != t(this).data("filter") && i.push(t(this).data("filter"));
              }),
              (i = "AND" === vt.filterLogic ? n(i) : i.join(", ")))
            : ((i = e.data("filter")),
              at.removeClass("tg-filter-active"),
              e.addClass("tg-filter-active")),
          (q = !i && $.find('[data-filter="*"]').addClass("tg-filter-active")),
          r(),
          A.TG_Layout({ filter: i }),
          t.TG_Pause_Players();
      }
      function n(t) {
        var e = "";
        for (var i in t) t.hasOwnProperty(i) && (e += t[i]);
        return e;
      }
      function r() {
        rt.each(function (e, i) {
          var o = t(this).find(The_Grid.filter + ".tg-filter-active").length;
          q =
            0 === o &&
            t(this).find('[data-filter="*"]').addClass("tg-filter-active");
        });
      }
      function a(t) {
        return Y
          ? ((C = "none" === t.data("value") ? "" : t.data("value")),
            (L = t.text()),
            (F = ct.data("asc")),
            nt.removeClass("tg-item-index"),
            lt.find(".tg-dropdown-value").text(L),
            void A.TG_Layout({ sortAscending: F, sortBy: C }))
          : !1;
      }
      function s() {
        if (vt.fullWidth && 0 === Z.length) {
          $.css("left", 0);
          var e = parseInt($.css("margin-left")),
            i = parseInt($.css("margin-right")),
            o = $.offset().left - e;
          $.width(t(window).width() - (e + i)), $.css("left", -o);
        }
      }
      function u() {
        if (vt.gallery) {
          var e;
          d(),
            !The_Grid.galleryInt &&
              t(The_Grid.gallery).length > 0 &&
              (The_Grid.galleryInt = setInterval(function () {
                (I = Math.floor(Math.random() * H.length)),
                  (S = S === I && H.length > 0 ? l(H, I + 1) : I),
                  (e = t(The_Grid.gallery).eq(S)),
                  (j =
                    H.length > 0
                      ? l(H[S], e.find(".show").index() - 1 + 2)
                      : 0),
                  e.find(The_Grid.itemImg).removeClass("show"),
                  e.find(The_Grid.itemImg).eq(j).addClass("show");
              }, 3500));
        }
      }
      function l(t, e) {
        return (t.length + (e % t.length)) % t.length;
      }
      function d() {
        H = [];
        for (var e = t(The_Grid.gallery), i = 0; i < e.length; i++) {
          var o = t(e[i]).find(The_Grid.itemImg);
          H[i] = [];
          for (var n = 0; n < o.length; n++) H[i][n] = t(o[n]);
        }
      }
      function c() {
        for (var t = 0; t < at.length; t++) {
          var e = at.eq(t).data("filter"),
            i = mt.length > 0 ? ".tg-item-hidden" : null,
            o = "*" !== e ? A.find(e).not(i).length : nt.not(i).length;
          at.eq(t).find(The_Grid.tooltip).html(o),
            (q =
              at.eq(t).find("span:first-child").data("count") &&
              at.eq(t).find("span:first-child").data("tooltip", o)),
            (q =
              0 === o
                ? at.eq(t).removeClass("tg-show-filter")
                : at.eq(t).addClass("tg-show-filter"));
        }
      }
      function h() {
        if (tt.length > 0)
          if (
            ((N = tt.data("item-tt") ? tt.data("item-tt") - nt.length : 99999),
            0 >= N)
          )
            tt.addClass("tg-no-more"),
              tt.find("span").html(tt.data("no-more")),
              setTimeout(function () {
                tt.fadeOut(500);
              }, 3e3);
          else {
            var t = tt.data("button");
            q = tt.data("remain")
              ? tt.find("span").html(t + " (" + N + ")")
              : tt.find("span").html(t);
          }
      }
      function p() {
        var e,
          i = 0,
          o = A.data("TG_Layout");
        (q = 0 === mt.length ? K.remove() : K.hide()),
          $.removeClass("tg-grid-loading"),
          (x = o.filteredItems),
          x.length > 0
            ? (e = window.tgInterval(function () {
                A.closest("body").length > 0 &&
                  (t(x[i].element).removeClass("tg-item-reveal"),
                  (q = vt.itemDelay && A.TG_Layout("reveal", [x[i]])),
                  (i !== x.length - 1 && vt.itemDelay) ||
                    ((Y = !0),
                    nt.removeClass("tg-item-reveal"),
                    $.addClass("tg-grid-loaded"),
                    (q = !vt.itemDelay && A.TG_Layout("reveal", x)),
                    e.clear()),
                  i++);
              }, vt.itemDelay))
            : ((Y = !0),
              nt.removeClass("tg-item-reveal"),
              $.addClass("tg-grid-loaded"));
      }
      function f() {
        for (
          var e = "justified" !== vt.style ? vt.cols : vt.rows,
            i = m().width,
            o = 0,
            n = e.length;
          n > o && e[o][0] >= i;
          o++
        )
          (R = e[o][1]), (G = vt.gutters[o][1]);
        if ((ot.width(G), "justified" !== vt.style)) {
          var r = $.width();
          if (
            ((D = r / R - G),
            "vertical" === vt.layout &&
              (A.width(""),
              (W = (R - 1) * G),
              (D = (r - W) / R),
              (D = D % 1 !== 0 ? Math.ceil(D) : D),
              (B = R * D + W),
              A.css("left", -(B - A.width()) / 2 + "px"),
              A.width(B)),
            vt.fullHeight && "horizontal" === vt.layout)
          ) {
            var a = t("#wpadminbar").height();
            O =
              0 === Z.length
                ? (t(window).height() - a - G * (vt.row - 1)) / vt.row
                : Z.height() / vt.row;
          } else O = Math.round(D / vt.ratio);
        } else (O = R), it.height(O);
        q = "null" === vt.itemNav && J.css("padding", "0 " + G / 2 + "px");
      }
      function m() {
        if (0 === Z.length) {
          var t = window,
            e = "inner";
          return (
            "innerWidth" in window ||
              ((e = "client"), (t = document.documentElement || document.body)),
            { width: t[e + "Width"] }
          );
        }
        return { width: Z.width() };
      }
      function g() {
        if ("justified" !== vt.style) {
          it.width(D);
          for (var t = 0; t < nt.length; t++) {
            var e = nt.eq(t).data("col"),
              i = nt.eq(t).data("row");
            (i = "horizontal" === vt.layout && i > vt.row ? vt.row : i),
              1 === R
                ? ((E = D), (k = O))
                : e > R
                ? ((M = Math.round(R / (e / i))),
                  (M = 1 >= M ? 1 : M),
                  (E = R * D + (R - 1) * G),
                  (k = 1 === M ? O : M * O + (M - 1) * G))
                : ((E = e * D + (e - 1) * G), (k = i * O + (i - 1) * G)),
              nt.eq(t).width(E),
              (q = "grid" === vt.style ? nt.eq(t).height(k) : null);
          }
        }
      }
      function y() {
        if ("horizontal" === vt.layout) {
          var e;
          "masonry" === vt.style
            ? ($.removeClass("tg-grid-loading"),
              (e = Math.max.apply(
                null,
                nt
                  .map(function () {
                    return t(this).height();
                  })
                  .get()
              )),
              A.add(J).height(e))
            : ((e = O * vt.row + G * (vt.row - 1)), A.add(J).height(e));
        }
      }
      function v() {
        var t,
          e,
          o = !1;
        "horizontal" === vt.layout
          ? ((o = !0),
            (t = e =
              "grid" === vt.style
                ? "packery"
                : "justified" === vt.style
                ? "justified"
                : "horizontal"))
          : (t = e = "grid" === vt.style ? "packery" : vt.style);
        var n = {};
        (n[e] = {}),
          (n.hiddenStyle = {}),
          (n.visibleStyle = {}),
          (n.layoutMode = t),
          (n.filter = vt.filterLoad),
          "none" !== vt.sortByLoad && (n.sortBy = vt.sortByLoad),
          (n.sortAscending = vt.orderLoad),
          (n.isOriginLeft = vt.rtl),
          (n.itemSelector = The_Grid.item),
          (n[e].gutter = ot[0]),
          (n[e].rowHeight = it[0]),
          (n[e].columnWidth = it[0]),
          (n[e].isHorizontal = o),
          (n[e].isFitRows = vt.fitrows),
          (n[e].image = The_Grid.itemImg),
          (n[e].row = vt.row),
          (n[e].previewMode = Z),
          (n.hiddenStyle.opacity = 0),
          (n.visibleStyle.opacity = 1),
          (n.hiddenStyle.transform = vt.animation.hidden),
          (n.visibleStyle.transform = vt.animation.visible),
          (n.transitionDuration = vt.transition),
          (n.getSortData = The_Grid.sortData),
          A.TG_Layout(n),
          i(nt);
      }
      function _() {
        if ("horizontal" === vt.layout) {
          var e = A.data("TG_Layout"),
            i = e.filteredItems,
            o = (vt.startAt =
              vt.startAt - 1 > i.length ? i.length : vt.startAt);
          "forceCentered" === vt.itemNav &&
            0 === ft.length &&
            (ft = t(t('<div class="tg-slider-bullets"></div>'))
              .appendTo($)
              .hide()),
            (P = new TG_Slider(J, {
              itemSelector: ".tg-item:not(.tg-item-hidden)",
              cycleBy: vt.cycleBy,
              cycleInterval: vt.cycle,
              pauseOnHover: 1,
              itemNav: vt.itemNav,
              startAt: vt.startAt - 1,
              smart: 1,
              horizontal: 1,
              easing: "easeOutExpo",
              speed: 1e3,
              swingSpeed: vt.swingSpeed,
              releaseSwing: 1,
              mouseDragging: 1,
              touchDragging: 1,
              elasticBounds: 1,
              moveBy: E,
              syncSpeed: 0.8,
              keyboardNavBy: "pages",
              activeClass: "tg-active-item",
              disabledClass: "tg-disabled",
              draggedClass: "tg-slider-dragged",
              pageBuilder: function () {
                return "<li><span></span></li>";
              },
              pagesBar: ft,
              prevPage: ht,
              nextPage: pt,
              activatePageOn: "click",
            }).init()),
            J.data("slider", P).trigger("tg-slider-init"),
            "forceCentered" === vt.itemNav &&
              (t(i[o - 1].element).addClass("tg-active-item"),
              P.on("load activePage", function (o) {
                (o = this.rel.activePage),
                  (e = A.data("TG_Layout")),
                  (i = e.filteredItems),
                  nt.removeClass("tg-active-item"),
                  (q = i[o] && t(i[o].element).addClass("tg-active-item"));
              }));
        }
      }
      function w(e) {
        if (V && (3 == V.readyState || 2 == V.readyState || 1 == V.readyState))
          return !1;
        var o = {
          action: "the_grid_load_more",
          grid_nonce: tg_global_var.nonce,
          grid_name: e.data("name"),
          grid_page: X,
          grid_data: b(),
          grid_ajax: e.data("ajax"),
          main_query: tg_global_var.main_query,
        };
        V = t.ajax({
          url: tg_global_var.url,
          type: "post",
          datatype: "json",
          data: o,
          beforeSend: function () {
            (Q = !0),
              (X += 1),
              (q =
                tt.data("loading") &&
                !tt.hasClass("tg-no-more") &&
                tt.find("span").html(tt.data("loading"))),
              (q =
                t(et).length > 0 &&
                0 === tt.length &&
                t(et).addClass("tg-loading"));
          },
          success: function (o) {
            var n = o.success,
              r = o.message,
              a = o.content,
              s = o.ajax_data,
              l = !0;
            try {
              s = t.parseJSON(s);
            } catch (p) {
              l = !1;
            }
            if ((e.data("ajax", s), !n))
              return (
                tt.add(t(et)).add(mt).removeClass("tg-loading"),
                K.find("> div").html(r),
                tt.find("span").html(r),
                t(et).children("div").html(r),
                (X -= 1),
                !1
              );
            if (!a)
              return (
                tt.data("item-tt", -1),
                h(),
                t(et)
                  .children("div")
                  .html(t(et).children("div").data("no-more")),
                setTimeout(function () {
                  t(et).fadeOut(400);
                }, 1e3),
                (X -= 1),
                !1
              );
            var f = t(a);
            (q = 0 === mt.length && f.addClass("tg-item-index")),
              f.find(The_Grid.grid).length > 0 &&
                (f = f.find(The_Grid.item).removeClass("tg-item-reveal")),
              e.append(f),
              (nt = e.find(The_Grid.item)),
              f.hide(),
              g(),
              t.TG_media_init(),
              c(),
              d(),
              u(),
              T(),
              (f = t(
                t.grep(f, function (t) {
                  return "undefined" != typeof t.id;
                })
              ));
            var m = f.length - 1;
            f.the_grid_images_loaded({
              complete: function () {
                var n,
                  r = 0;
                K.hide(),
                  (q = o && t(et).removeClass("tg-loading")),
                  (q = "horizontal" === vt.layout && e.css("min-height", "")),
                  (q =
                    "masonry" === vt.style &&
                    "horizontal" === vt.layout &&
                    y()),
                  (n = window.tgInterval(function () {
                    if (e.closest("body").length > 0) {
                      if (
                        ((q = vt.ajaxDelay && e.TG_Layout("appended", f.eq(r))),
                        (q = "horizontal" === vt.layout && P.reload()),
                        m === r || !vt.ajaxDelay)
                      )
                        return (
                          c(),
                          h(),
                          (q = !vt.ajaxDelay && e.TG_Layout("appended", f)),
                          (q = "horizontal" === vt.layout && P.reload()),
                          mt.removeClass("tg-loading"),
                          (Q = !1),
                          n.clear(),
                          (q =
                            "undefined" != typeof FOOBOX &&
                            t.isFunction(FOOBOX.init) &&
                            FOOBOX.init()),
                          (q =
                            t().fancybox &&
                            t(".tg-item a.fancybox").fancybox()),
                          (q =
                            t().prettyPhoto &&
                            t('.tg-item  a[rel^="prettyPhoto"]').prettyPhoto()),
                          i(nt),
                          !1
                        );
                      r++;
                    }
                  }, vt.ajaxDelay));
              },
            });
          },
          error: function (t, e, i) {
            (X -= 1), console.error(t), console.error(e + " :: " + i);
          },
        });
      }
      function b() {
        return Z.length > 0
          ? new TG_metaData(t("#the_grid_metabox .tomb-row"))
          : void 0;
      }
      function T() {
        Z.length > 0 && TG_excludeItem();
      }
      var x,
        z,
        C,
        L,
        I,
        S,
        j,
        P,
        G,
        E,
        k,
        M,
        R,
        D,
        O,
        W,
        B,
        q,
        A = t(this),
        H = [],
        F = !0,
        N = !0,
        Y = !1,
        Q = !1,
        X = 1,
        V = null,
        U = A.closest(The_Grid.wrapper).attr("id"),
        $ =
          t('[id="' + U + '"]').length > 1
            ? A.closest(The_Grid.wrapper)
            : t("#" + U),
        Z = $.closest(The_Grid.preview),
        J = $.find(The_Grid.slider),
        K = $.find(The_Grid.loader),
        tt = $.find(The_Grid.ajax),
        et = $.find(The_Grid.ajaxMsg),
        it = $.find(The_Grid.sizer),
        ot = $.find(The_Grid.gutter),
        nt = $.find(The_Grid.item),
        rt = $.find(The_Grid.filterH),
        at = $.find(The_Grid.filter),
        st = $.find(The_Grid.search),
        ut = $.find(The_Grid.clear),
        lt = $.find(The_Grid.sorter),
        dt = $.find(The_Grid.sorterBy),
        ct = $.find(The_Grid.sortASC),
        ht = $.find(The_Grid.arrLeft),
        pt = $.find(The_Grid.arrRight),
        ft = $.find(The_Grid.bullets),
        mt = $.find(The_Grid.pages),
        gt = A.data(),
        yt = {
          style: gt.style && gt.style,
          layout: gt.layout && gt.layout,
          fitrows: gt.fitrows && gt.fitrows,
          fullWidth: gt.fullwidth && gt.fullwidth,
          fullHeight: gt.fullheight && gt.fullheight,
          rtl: gt.rtl && gt.rtl,
          filterComb: gt.filtercomb && gt.filtercomb,
          filterLogic: gt.filterlogic && gt.filterlogic,
          filterLoad: gt.filterload && gt.filterload,
          sortByLoad: gt.sortbyload && gt.sortbyload,
          orderLoad: gt.orderload && gt.orderload,
          row: gt.row && gt.row,
          ratio: gt.ratio && gt.ratio,
          gutters: gt.gutters && gt.gutters,
          cols: gt.cols && gt.cols,
          rows: gt.rows && gt.rows,
          animation: gt.animation && gt.animation,
          transition: gt.transition && gt.transition,
          itemNav: gt.slider && gt.slider.itemNav,
          swingSpeed: gt.slider && gt.slider.swingSpeed,
          cycleBy: gt.slider && gt.slider.cycleBy,
          cycle: gt.slider && gt.slider.cycle,
          startAt: gt.slider && gt.slider.startAt,
          ajaxMethod: gt.ajaxmethod && gt.ajaxmethod,
          ajaxDelay: gt.ajaxdelay && gt.ajaxdelay,
          preloader: gt.preloader && gt.preloader,
          itemDelay: gt.itemdelay && gt.itemdelay,
          gallery: gt.gallery && gt.gallery,
        },
        vt = t.extend({}, The_Grid.defaults, yt);
      vt.cols.sort(function (t, e) {
        return e[0] - t[0];
      }),
        vt.gutters.sort(function (t, e) {
          return e[0] - t[0];
        }),
        vt.rows.sort(function (t, e) {
          return e[0] - t[0];
        }),
        (vt.rtl = vt.rtl ? !1 : !0),
        (vt.ajaxDelay = mt.length > 0 ? vt.itemDelay : vt.ajaxDelay);
      for (
        var _t = t.map(gt, function (t, e) {
            return e;
          }),
          wt = 0;
        wt < _t.length;
        wt++
      )
        A.removeAttr("data-" + _t[wt]);
      s(),
        f(A),
        g(),
        u(),
        c(),
        "masonry" === vt.style ||
        "justified" === vt.style ||
        vt.preloader ||
        "horizontal" === vt.layout
          ? nt.the_grid_images_loaded({
              complete: function () {
                y(),
                  v(),
                  _(),
                  (q = vt.preloader && p()),
                  (q =
                    "horizontal" === vt.layout &&
                    A.TG_Layout("on", "arrangeComplete", function (t) {
                      e(t);
                    }));
              },
            })
          : (v(),
            _(),
            (q =
              "horizontal" === vt.layout &&
              A.TG_Layout("on", "arrangeComplete", function (t) {
                e(t);
              }))),
        (Y = !vt.preloader && !0),
        (q = Y && $.addClass("tg-grid-loaded")),
        at.on("click", function (e) {
          var i = t(this);
          i.is("select")
            ? at.one("change", function () {
                o(i.find("option:selected"));
              })
            : o(i);
        }),
        tg_is_mobile
          ? dt.on("change", function () {
              a(t(this).find("option:selected"));
            })
          : dt.on("click", function () {
              a(t(this));
            }),
        ct.on("click", function () {
          if (!Y) return !1;
          var e = t(this);
          (F = e.data("asc") === !0 ? !1 : !0),
            e.data("asc", F).attr("data-asc", F),
            nt.removeClass("tg-item-index"),
            A.TG_Layout({ sortAscending: F });
        });
      var bt = st.keyup(
        debounce(function () {
          if (!Y) return !1;
          var e = new RegExp(bt.val(), "gi");
          nt.removeClass("tg-item-index"),
            at.removeClass("tg-filter-active"),
            A.TG_Layout({
              filter: function () {
                var i = t(this),
                  o = e ? i.text().match(e) : !0,
                  n = z ? i.is(z) : !0;
                return (
                  t('.tg-filter[data-filter="*"]').addClass("tg-filter-active"),
                  o && n
                );
              },
            }),
            t.TG_Pause_Players();
        }, 200)
      );
      ut.on("click", function () {
        st.val("").trigger("keyup");
      }),
        t(window).on(tg_debounce_resize, function () {
          s(),
            f(),
            g(),
            y(),
            (q = Y && A.closest("body").length > 0 && A.TG_Layout("layout")),
            (q =
              "horizontal" === vt.layout &&
              A.TG_Layout("once", "layoutComplete", function (t) {
                e(t);
              }));
        }),
        mt.on("click", function (e) {
          e.preventDefault();
          var i = t(this);
          (X = i.data("page")),
            i.is(".tg-page-current") ||
              (V && (!V || 4 != V.readyState)) ||
              Q ||
              !Y ||
              (lt.find(".tg-dropdown-value").text(""),
              st.val(""),
              at.removeClass("tg-filter-active"),
              t('.tg-filter[data-filter="*"]').addClass("tg-filter-active"),
              mt.removeClass("tg-page-current").addClass("tg-loading"),
              i.addClass("tg-page-current"),
              t(".tg-item-hidden").addClass("tg-item-removed"),
              t.TG_media_destroy(A),
              A.css("min-height", 250)
                .TG_Layout("remove", nt)
                .TG_Layout({ filter: "*" }),
              A.contents().each(function () {
                q = 8 == this.nodeType ? t(this).remove() : null;
              }),
              K.show(),
              w(A));
        }),
        tt.on("click", function (t) {
          N && (t.preventDefault(), w(A));
        }),
        "on_scroll" == vt.ajaxMethod &&
          t(window).on("mousewheel resize scroll", function () {
            q =
              N &&
              $.length &&
              $[0].getBoundingClientRect().bottom < t(this).height() &&
              Y === !0 &&
              w(A);
          });
    });
  };
  var n = [];
  (t.fn.the_grid_images_loaded = function () {
    function e() {
      return a++, a >= s.length ? (r.complete.call(o), !1) : void 0;
    }
    var i,
      o = t(this),
      r = t.extend({ complete: function () {} }, arguments[0] || {}),
      a = 0,
      s = [];
    o.find("*").filter(function () {
      (i = t(this).css("background-image")),
        (i = /^url\((['"]?)(.*)\1\)$/.exec(i)),
        (i = i ? i[2] : null),
        (i = !i && t(this).is("img") ? t(this).attr("src") : i),
        (i =
          i &&
          (i.match(/\.(jpg|jpeg|png|bmp|gif|tif|tiff|jif|jfif)/g) ||
            i.indexOf("external.xx.fbcdn") >= 0 ||
            i.indexOf("drscdn.500px.org") >= 0)
            ? i
            : null),
        i && -1 == t.inArray(i, n) && (s.push(i), n.push(i));
    });
    for (var u = [], l = 0; l < s.length; l++)
      (u[l] = new Image()),
        (u[l].onload = e),
        (u[l].onerror = e),
        (u[l].onabort = e),
        (u[l].src = s[l]);
    return s.length ? void 0 : (r.complete.call(o), !1);
  }),
    t(document).ready(function () {
      function e(e) {
        if (e.data("list-DOM")) {
          var i = e.data("list-DOM").removeClass(n),
            o = setTimeout(function () {
              i.remove(), (i = null), e.data("list-DOM", i);
            }, 400);
          t(e.data("list-DOM")).data("list-timer", o);
        }
        return !1;
      }
      function i(e) {
        var i = e.parent().offset(),
          o = e.parent().height(),
          n =
            "relative" === t("body").css("position")
              ? t(window).scrollTop() + t("body")[0].getBoundingClientRect().top
              : null,
          r = parseInt(e.css("margin-bottom")),
          a = e.outerWidth(),
          s = i.left,
          u = i.top + o - n - r,
          l = [];
        return (l.top = u), (l.left = s), (l.width = a), l;
      }
      var o,
        n = "tg-dropdown-holder-animation";
      tg_is_mobile ||
        (t(document)
          .on("mouseenter", ".tg-dropdown-holder", function (e) {
            e.preventDefault(), e.stopPropagation();
            var r = t(this),
              a = t(r.data("list-DOM")).data("list-timer");
            if (a) return clearTimeout(a), r.data("list-DOM").addClass(n), !1;
            o = r.find("ul");
            var s = o
              .clone(!0)
              .addClass("tg-list-appended")
              .attr("style", "")
              .appendTo("body");
            r.add(s).data("list-DOM", s), s.data("filter-DOM", r);
            var u = i(r);
            o.hide(),
              s
                .css({
                  position: "absolute",
                  "z-index": 99999,
                  width: u.width,
                  top: u.top,
                  left: u.left,
                })
                .addClass(n);
          })
          .on("mouseleave", ".tg-dropdown-holder", function (i) {
            e(t(this));
          }),
        t(document)
          .on("mouseenter touchstart", ".tg-list-appended", function (e) {
            var i = t(this);
            return i.data("list-DOM")
              ? (clearTimeout(i.data("list-timer")),
                i.data("list-DOM").addClass(n),
                !1)
              : void 0;
          })
          .on("mouseleave touchend", ".tg-list-appended", function (i) {
            e(t(this));
          }),
        t(document).on("click touchstart", ".tg-list-appended li", function () {
          var e = t(this).closest("ul"),
            o = e.data("filter-DOM");
          o
            .find('[data-filter="' + t(this).data("filter") + '"]')
            .trigger("click"),
            o
              .find('[data-value="' + t(this).data("value") + '"]')
              .trigger("click"),
            e.width(o.outerWidth()),
            e.css("left", o.offset().left);
          var n = i(o);
          n.top !== e.position().top
            ? e.css("top", n.top)
            : (e.find("li").removeClass("tg-filter-active"),
              o.find(".tg-filter-active").each(function (i) {
                e.find("li").eq(t(this).index()).addClass("tg-filter-active");
              }));
        }));
    }),
    (t.fn.TG_ToolTip = function (e) {
      var i = "tooltip-DOM",
        o = "tooltip-timer";
      t(document)
        .on("mouseenter", t(this).selector, function () {
          var n = t(this);
          if (!n.data(e.data)) return !1;
          if (n.data(i))
            return (
              clearTimeout(n.data(o)),
              n.data(i).addClass(e.hoverClass.split(".").join("")),
              !1
            );
          var r = t(
            '<div class="' + e.appendClass.split(".").join("") + '"></div>'
          ).appendTo("body");
          n.data(i, r);
          var a = n.data(e.data),
            s = n.offset(),
            u =
              "relative" === t("body").css("position")
                ? t(window).scrollTop() +
                  t("body")[0].getBoundingClientRect().top
                : null,
            l = s.top - u,
            d = s.left,
            c = n.outerWidth(!0);
          r.html(a)
            .css({
              position: "absolute",
              "z-index": e.zindex,
              width: c,
              top: l + e.spacing - r.outerHeight(!0),
              left: d + c / 2,
            })
            .addClass(e.hoverClass.split(".").join(""));
        })
        .on("mouseleave", t(this).selector, function () {
          var n = t(this);
          if (!n.data(e.data) || !n.data(i)) return !1;
          var r = n.data(i).removeClass(e.hoverClass.split(".").join("")),
            a = setTimeout(function () {
              r.remove(), (r = null), n.data(i, r);
            }, 400);
          n.data(o, a);
        });
    }),
    t(document).ready(function () {
      t(".tg-filter-name").TG_ToolTip({
        data: "tooltip",
        zindex: 99999,
        place: "top",
        appendClass: ".tg-filter-tooltip",
        hoverClass: ".tg-tooltip-hover",
        spacing: -2,
      });
    });
  var r = "tg-media-init",
    a = ".tg-item",
    s = (function () {
      var t = 3,
        e = document.createElement("div"),
        i = e.getElementsByTagName("i");
      do e.innerHTML = "<!--[if gt IE " + ++t + "]><i></i><![endif]-->";
      while (i[0]);
      return t > 4 ? t : document.documentMode;
    })();
  s && t("body").addClass("is-ie"),
    (t.fn.TG_SoundCloud = function () {
      return this.each(function () {
        var e = t(this).closest(a),
          i = t(this).attr("src");
        if (!e.hasClass(r) && "about:blank" !== i) {
          var o = SC.Widget(t(this).attr("id"));
          o.bind(SC.Widget.Events.READY, function () {
            ((!o.getCurrentSound && tg_is_mobile) || !tg_is_mobile) && o.play(),
              t.TG_Media_Ready(e, o, "STD"),
              o.bind(SC.Widget.Events.PLAY, function () {
                t.TG_Media_Play(e);
              }),
              o.bind(SC.Widget.Events.PAUSE, function () {
                t.TG_Media_Pause(e);
              }),
              o.bind(SC.Widget.Events.FINISH, function () {
                t.TG_Media_Pause(e);
              });
          });
        }
      });
    });
  var u = {};
  (t.fn.TG_Youtube = function () {
    return this.each(function () {
      var e = t(this).closest(a),
        i = t(this).attr("src");
      if (!e.hasClass(r) && "about:blank" !== i) {
        var o = this.id;
        u[o] = new YT.Player(o, {
          events: {
            onReady: function (i) {
              tg_is_mobile || i.target.playVideo(),
                t.TG_Media_Ready(e, i.target, "YT");
            },
            onStateChange: function (i) {
              1 === i.data && t.TG_Media_Play(e),
                (2 === i.data || 0 === i.data) && t.TG_Media_Pause(e);
            },
          },
        });
      }
    });
  }),
    (t.fn.TG_Vimeo = function () {
      return this.each(function () {
        var e = t(this).closest(a),
          i = t(this).attr("src");
        if (
          (9 >= s && (t(this).remove(), e.find(".tg-media-button").remove()),
          !e.hasClass(r) && "about:blank" !== i)
        ) {
          t(this).attr("src", t(this).attr("src"));
          var o = $f(this);
          o.addEvent("ready", function () {
            tg_is_mobile || o.api("play"),
              t.TG_Media_Ready(e, o, "VM"),
              o.addEvent("play", function () {
                t.TG_Media_Play(e);
              }),
              o.addEvent("pause", function () {
                t.TG_Media_Pause(e);
              }),
              o.addEvent("finish", function () {
                t.TG_Media_Pause(e);
              });
          });
        }
      });
    }),
    (t.fn.TG_Wistia = function () {
      return this.each(function () {
        var e = t(this).closest(a),
          i = t(this).attr("src");
        e.hasClass(r) ||
          "about:blank" === i ||
          t(this).load(function () {
            var i = t(this)[0].wistiaApi,
              o = !1,
              n = !1,
              r = !1;
            t.TG_Media_Ready(e, i, "STD"),
              i &&
                (i.play(),
                i.bind("seek", function () {
                  n = !0;
                }),
                i.bind("heightchange", function () {
                  r = !0;
                }),
                i.bind("play", function () {
                  n === !1 && r === !1 && o && t.TG_Media_Play(e), (n = r = !1);
                }),
                i.bind("pause", function () {
                  n === !1 && r === !1 && t.TG_Media_Pause(e), (r = o = !0);
                }),
                i.bind("finish", function () {
                  t.TG_Media_Pause(e);
                }));
          });
      });
    }),
    (t.fn.TG_HTML_Player = function () {
      return this.each(function () {
        var e = t(this).closest(a);
        if (!e.hasClass(r)) {
          var i = t(this)[0];
          i.addEventListener &&
            (t.TG_Media_Ready(e, i, "STD"),
            i.addEventListener("play", function () {
              t.TG_Media_Play(e);
            }),
            i.addEventListener("pause", function () {
              t.TG_Media_Pause(e);
            }),
            i.addEventListener("ended", function () {
              t.TG_Media_Pause(e);
            }));
        }
      });
    }),
    (t.TG_Media_Ready = function (t, e, i) {
      t.data("pause-method", i).data("media-player", e).addClass(r);
    }),
    (t.TG_Media_Play = function (e) {
      e.hasClass("tg-force-play") || t.TG_Pause_Players(),
        e.addClass("tg-is-playing"),
        t(a).removeClass("tg-force-play");
    }),
    (t.TG_Media_Pause = function (t) {
      t.removeClass("tg-is-playing tg-force-play");
    }),
    t(document).on(
      "webkitfullscreenchange mozfullscreenchange fullscreenchange",
      function (e) {
        var i = t(e.target);
        t(".tg-item-media").removeClass("tg-item-media-fullscreen"),
          i &&
            i.hasClass("tg-item-media") &&
            i.addClass("tg-item-media-fullscreen");
      }
    ),
    t(document).on(
      "click",
      ".tg-item:not(.tg-media-init) .tg-item-button-play",
      function (e) {
        e.preventDefault();
        var i = t(this).closest(".tg-item"),
          o = i.find("iframe");
        o.attr("src", o.data("src")),
          t.TG_Pause_Players(),
          t.TG_media_init(),
          i.addClass("tg-force-play");
      }
    ),
    t(document).on(
      "click",
      ".tg-item.tg-media-init .tg-item-button-play",
      function (e) {
        e.preventDefault();
        var i = t(this).closest(".tg-item"),
          o = i.data("pause-method"),
          n = i.data("media-player");
        if (i.is(".tg-force-play, .tg-is-playing"))
          return t.TG_Pause_Players(), !1;
        if (n && i.hasClass(r))
          switch (
            (i.find(".tg-item-media").show(),
            t.TG_Pause_Players(),
            t(a).removeClass("tg-force-play tg-play-error"),
            i.addClass("tg-force-play"),
            o)
          ) {
            case "STD":
              ((!n.getCurrentSound && tg_is_mobile) || !tg_is_mobile) &&
                n.play();
              break;
            case "YT":
              n.playVideo();
              break;
            case "VM":
              n.api("play");
          }
      }
    ),
    (t.TG_Pause_Players = function () {
      t(".tg-item.tg-is-playing, .tg-item.tg-force-play").each(function () {
        var e = t(this),
          i = e.data("pause-method"),
          o = e.data("media-player");
        if (o && e.hasClass(r)) {
          switch (i) {
            case "STD":
              o.pause();
              break;
            case "YT":
              o.pauseVideo();
              break;
            case "VM":
              o.api("pause");
          }
          e.closest(a).removeClass("tg-is-playing tg-force-play");
        }
      });
    }),
    (t.TG_media_init = function () {
      var e,
        i,
        o,
        n,
        r,
        a = [
          { ID: "youtube", url: "//www.youtube.com/iframe_api" },
          { ID: "vimeo", url: "//f.vimeocdn.com/js/froogaloop2.min.js" },
          { ID: "soundcloud", url: "//w.soundcloud.com/player/api.js" },
          { ID: "wistia", url: "//fast.wistia.com/assets/external/E-v1.js" },
        ];
      if (
        (t(".g-ytsubscribe").length &&
          ((e = document.createElement("script")),
          (e.src = "https://apis.google.com/js/platform.js"),
          (e.id = "tg-youtube-subscribe-api"),
          (r = document.getElementsByTagName("script")[0]),
          r.parentNode.insertBefore(e, r)),
        0 === t(".tg-item-media").length)
      )
        return !1;
      i = {
        youtube: function () {
          "undefined" == typeof YT || 0 === YT.loaded
            ? (window.onYouTubeIframeAPIReady = function () {
                t('[data-api="1"].tg-item-youtube').TG_Youtube();
              })
            : t('[data-api="1"].tg-item-youtube').TG_Youtube();
        },
        vimeo: function () {
          t('[data-api="1"].tg-item-vimeo').TG_Vimeo();
        },
        soundcloud: function () {
          t('[data-api="1"].tg-item-soundcloud').TG_SoundCloud();
        },
        wistia: function () {
          t('[data-api="1"].tg-item-wistia').TG_Wistia();
        },
      };
      for (var s = 0; s < a.length; s++)
        (n = a[s].ID),
          t('[data-api="1"].tg-item-' + n).length > 0 &&
            ((o = a[s].url),
            0 === t("#tg-" + n + "-api").length
              ? ((e = document.createElement("script")),
                (e.src = a[s].url),
                (e.id = "tg-" + n + "-api"),
                (r = document.getElementsByTagName("script")[0]),
                r.parentNode.insertBefore(e, r),
                (function (t, e) {
                  t.onload = function () {
                    i[e]();
                  };
                })(e, n))
              : i[n]());
      t(document).ready(function () {
        t(".tg-item .tg-item-audio-player").attr("width", "100%"),
          t(".tg-item-video-player,.tg-item-audio-player").TG_HTML_Player(),
          tg_global_var.mediaelement &&
            (t(
              ".tg-item-video-player:not(.tg-mediaelement-init), .tg-item-audio-player:not(.tg-mediaelement-init)"
            ).mediaelementplayer({
              audioVolume: "vertical",
              videoVolume: "vertical",
              features: [
                "playpause",
                "current",
                "progress",
                "fullscreen",
                "volume",
                "duration",
              ],
              startVolume: 0.8,
            }),
            t(".tg-item-video-player, .tg-item-audio-player").addClass(
              "tg-mediaelement-init"
            ));
      });
    }),
    (t.TG_media_destroy = function (e) {
      var i = e ? e : t(".tg-item");
      i.find(".tg-item-vimeo").each(function () {
        var e = t(this),
          i = e.closest(a).data("media-player");
        i && (i.api("pause"), e.attr("src", "about:blank"));
      }),
        (e = e
          ? e.find(".tg-item video, .tg-item audio")
          : t(".tg-item video, .tg-item audio")),
        e.each(function () {
          var e = t(this),
            i = e.data("mediaelementplayer");
          e.closest(a).removeClass("tg-force-play tg-is-playing"),
            e.length &&
              (i
                ? ((i = e.data("mediaelementplayer")),
                  i.pause(),
                  i.setSrc("about:blank"),
                  e.children("source").prop("src", ""),
                  i.remove())
                : (e[0].pause(),
                  (e[0].src = "about:blank"),
                  e.children("source").prop("src", ""),
                  (e.remove().length = 0)));
        }),
        tg_global_var.mediaelement && (mejs.players = []);
    }),
    (t.TO_Lightbox = function () {
      function e() {
        var e = t(I).filter(":visible");
        for (z = e.length, i = 0; z > i; i++) {
          var o = e.eq(i);
          (L[i] = {}),
            (L[i].type = o.data("tolb-type")),
            (L[i].src = o.data("tolb-src")),
            (L[i].alt = o.data("tolb-alt")),
            (L[i].poster = o.data("tolb-poster")),
            o.data(W, i);
        }
        z > 1 ? t(R + "," + D).show() : t(R + "," + D).hide();
      }
      function o(e) {
        switch (
          (t(S).addClass(B + " " + A),
          (y = e.data(W)),
          (T = L[y].type),
          (_ = L[y].src),
          (w = L[y].alt),
          h(),
          T)
        ) {
          case "image":
            (b = t(
              '<img class="tolb-img" src="' + _ + '" alt="' + w + '"></img>'
            )),
              (v = new Image()),
              (v.onload = a),
              (v.onerror = a),
              (v.src = _);
            break;
          case "youtube":
            (_ =
              "//www.youtube.com/embed/" +
              _ +
              "?html5=1&controls=1&autohide=1&rel=0&showinfo=0&autoplay=" +
              F),
              (b = t(
                '<iframe class="tolb-video" src="' +
                  _ +
                  '" allowfullscreen></iframe>'
              )),
              u();
            break;
          case "vimeo":
            (_ =
              "//player.vimeo.com/video/" +
              _ +
              "?title=0&amp;byline=0&amp;portrait=0&amp;autoplay=" +
              F),
              (b = t(
                '<iframe class="tolb-video" src="' +
                  _ +
                  '" allowfullscreen></iframe>'
              )),
              u();
            break;
          case "wistia":
            (_ =
              "//fast.wistia.net/embed/iframe/" +
              _ +
              "?title=0&amp;byline=0&amp;portrait=0&amp;autoPlay=" +
              F),
              (b = t(
                '<iframe class="tolb-video" src="' +
                  _ +
                  '" allowfullscreen></iframe>'
              )),
              u();
            break;
          case "video":
            for (var i = "", o = 0; o < _.length; o++)
              i +=
                '<source src="' +
                _[o][0].source +
                '" type="video/' +
                _[o][0].type +
                '" width="100%" height="100%"></source>';
            (x = L[y].poster), (x = x ? ' poster="' + x + '"' : "");
            var n = F ? " autoplay" : "";
            (b = t(
              '<video class="tolb-video" controls' +
                x +
                n +
                ">" +
                i +
                "</video>"
            )),
              s();
        }
      }
      function n() {
        var e = t(S).find("iframe").not(b);
        e.length > 0
          ? e.attr("src", "about:blank").one("load", function () {
              r();
            })
          : r();
      }
      function r() {
        t(S).addClass(q),
          (m = "iframe" !== T ? t(P).html("") : t(P).find("*").not(b).remove()),
          (m = "image" !== T ? t(S).addClass(H) : t(S).removeClass(H)),
          (m = "iframe" !== T && t(P).append(b)),
          d(),
          c(),
          b.show(),
          t(S).removeClass(A);
      }
      function a() {
        n();
      }
      function s() {
        tg_is_mobile
          ? ((m = g && g.setSrc("about:blank")), n())
          : (b.one("loadeddata", function () {
              (m = g && g.setSrc("about:blank")),
                tg_global_var.mediaelement ? l() : n();
            }),
            b[0].addEventListener("error", function () {
              c(), t(S).removeClass(A);
            }));
      }
      function u() {
        (T = "iframe"),
          t(P).append(b.hide()),
          b.one("load", function () {
            n();
          });
      }
      function l() {
        b.mediaelementplayer({
          features: [
            "playpause",
            "stop",
            "loop",
            "current",
            "progress",
            "duration",
            "volume",
            "sourcechooser",
            "fullscreen",
          ],
          videoVolume: "horizontal",
          startVolume: 0.8,
          success: function (e, i) {
            (g = e),
              (b = t(i).closest(".mejs-container")),
              n(),
              g.addEventListener("ended", function () {
                b.find(".mejs-poster").show();
              });
          },
        });
      }
      function d() {
        t(E).css(
          "max-height",
          t(window).height() - 80 - t("#wpadminbar").height()
        );
      }
      function c() {
        t(k).text(w), t(M).text(y + 1 + "/" + z);
      }
      function h() {
        t(D).data(W, p(y - 1)), t(R).data(W, p(y + 1));
      }
      function p(t) {
        return (z + (t % z)) % z;
      }
      function f() {
        t(S).removeClass(B + " " + A + " " + q),
          setTimeout(function () {
            t(S).find("iframe").length > 0
              ? t(S)
                  .find("iframe")
                  .attr("src", "about:blank")
                  .one("load", function () {
                    t(P).html("");
                  })
              : t(P).html("");
          }, 300);
      }
      var m,
        g,
        y,
        v,
        _,
        w,
        b,
        T,
        x,
        z,
        C =
          '<div class="tolb-holder"><div class="tolb-loader"></div><div class="tolb-inner"><figure><div class="tolb-close tg-icon-close"></div><div class="tolb-content"></div><figcaption><div class="tolb-title"></div><div class="tolb-counter"></div></figcaption></figure></div><div class="tolb-prev"><i class="tg-icon-arrow-prev-thin"></i></div><div class="tolb-next"><i class="tg-icon-arrow-next-thin"></i></div></div>',
        L = [],
        I = "[data-tolb-src]:not(.tolb-disabled)",
        S = ".tolb-holder",
        j = ".tolb-inner",
        P = ".tolb-content",
        G = ".tolb-video",
        E = ".tolb-img",
        k = ".tolb-title",
        M = ".tolb-counter",
        R = ".tolb-next",
        D = ".tolb-prev",
        O = ".tolb-close",
        W = "tolb-index",
        B = "tolb-open",
        q = "tolb-ready",
        A = "tolb-loading",
        H = "tolb-iframe",
        F = tg_global_var.lightbox_autoplay;
      t(window).on("resize", function () {
        d();
      }),
        t(document).on("click", I, function (i) {
          return (
            i.preventDefault(),
            t.TG_Pause_Players(),
            t(G + "," + E).remove(),
            e(),
            o(t(this)),
            !1
          );
        }),
        t(document).on("click touchend", R + "," + D, function () {
          return o(t(this)), !1;
        }),
        t(document).on(
          "keydown",
          throttle(function (e) {
            t(S).hasClass(B) &&
              (37 == e.keyCode
                ? t(D).trigger("click")
                : 39 == e.keyCode
                ? t(R).trigger("click")
                : 27 == e.keyCode && f());
          }, 300)
        ),
        t(document).on("click touchend", j + "," + O, function (e) {
          return (
            e.stopPropagation(),
            (t(e.target).is(j) || t(e.target).is(O)) && f(),
            !1
          );
        }),
        t("body").append(t(C));
    }),
    t(document).on("click", "[data-tolb-id]", function (e) {
      e.preventDefault();
      var i = t(this).data("tolb-id");
      i && t("#" + i).trigger("click");
    }),
    e(),
    o(),
    t(document).on(
      "click",
      ".tg-social-share:not(.tg-social-disabled)",
      function (e) {
        e.preventDefault();
        var i = t(this)[0].href,
          o = Math.round(window.screenX + (window.outerWidth - 626) / 2),
          n = Math.round(window.screenY + (window.outerHeight - 436) / 2);
        return (
          i &&
            window.open(
              i,
              "tg_share",
              "status=0,resizable=1,location=1,toolbar=0,width=626,height=436,top=" +
                n +
                ",left=" +
                o
            ),
          !1
        );
      }
    ),
    t.TG_media_init(),
    t(document).ready(function () {
      t(".tg-grid-preloader-styles, .tg-grid-styles").removeAttr("scoped"),
        t(".tg-grid-holder").The_Grid(),
        t.TO_Lightbox();
    });
  var l,
    d,
    c,
    h = t.event;
  l = h.special.debouncedresize = {
    setup: function () {
      t(this).on("resize", l.handler);
    },
    teardown: function () {
      t(this).off("resize", l.handler);
    },
    handler: function (t, e) {
      var i = this,
        o = arguments,
        n = function () {
          (t.type = "debouncedresize"), h.dispatch.apply(i, o);
        };
      c && clearTimeout(c), (d = e ? n() : (c = setTimeout(n, l.threshold)));
    },
    threshold: 100,
  };
})(jQuery),
  (function () {
    for (
      var t = 0, e = ["webkit", "moz"], i = 0;
      i < e.length && !window.requestAnimationFrame;
      ++i
    )
      (window.requestAnimationFrame = window[e[i] + "RequestAnimationFrame"]),
        (window.cancelAnimationFrame =
          window[e[i] + "CancelAnimationFrame"] ||
          window[e[i] + "CancelRequestAnimationFrame"]);
    window.requestAnimationFrame ||
      (window.requestAnimationFrame = function (e, i) {
        var o = new Date().getTime(),
          n = Math.max(0, 16 - (o - t)),
          r = window.setTimeout(function () {
            e(o + n);
          }, n);
        return (t = o + n), r;
      }),
      window.cancelAnimationFrame ||
        (window.cancelAnimationFrame = function (t) {
          clearTimeout(t);
        });
  })(),
  (window.tgInterval = function (t, e) {
    var i,
      o = Date.now,
      n = window.requestAnimationFrame,
      r = o(),
      a = function () {
        o() - r < e || ((r += e), t()), i || n(a);
      };
    return (
      n(a),
      {
        clear: function () {
          i = 1;
        },
      }
    );
  }),
  tg_global_var.mediaelement_ex &&
    (!(function (t) {
      t.extend(mejs.MepDefaults, { sourcechooserText: "Source Chooser" }),
        t.extend(MediaElementPlayer.prototype, {
          buildsourcechooser: function (e, i, o, n) {
            var r = this;
            e.sourcechooserButton = t(
              '<div class="mejs-button mejs-sourcechooser-button"><button type="button" aria-controls="' +
                r.id +
                '" title="' +
                r.options.sourcechooserText +
                '" aria-label="' +
                r.options.sourcechooserText +
                '"></button><div class="mejs-sourcechooser-selector"><ul></ul></div></div>'
            )
              .appendTo(i)
              .delegate("input[type=checkbox]", "click", function () {
                var e = this.value;
                t(this)
                  .closest(".mejs-sourcechooser-selector")
                  .find("input")
                  .removeAttr("checked"),
                  t(this)
                    .closest(".mejs-sourcechooser-selector")
                    .find("label")
                    .removeClass("active"),
                  t(this).next("label").addClass("active"),
                  n.currentSrc != e &&
                    ((currentTime = n.currentTime),
                    (paused = n.paused),
                    n.setSrc(e),
                    n.load(),
                    n.addEventListener(
                      "loadedmetadata",
                      function () {
                        this.currentTime = currentTime;
                      },
                      !0
                    ),
                    n.addEventListener(
                      "canplay",
                      function () {
                        paused || this.play();
                      },
                      !0
                    ));
              });
            for (var a in n.children) {
              var s = n.children[a];
              "SOURCE" !== s.nodeName ||
                ("probably" != n.canPlayType(s.type) &&
                  "maybe" != n.canPlayType(s.type)) ||
                e.addSourceButton(s.src, s.title, s.type, n.src == s.src);
            }
          },
          addSourceButton: function (e, i, o, n) {
            var r = this;
            ("" === i || void 0 == i) && (i = e),
              (o = o.split("/")[1]),
              r.sourcechooserButton
                .find("ul")
                .append(
                  t(
                    '<li><input type="checkbox" name="' +
                      r.id +
                      '_sourcechooser" id="' +
                      r.id +
                      "_sourcechooser_" +
                      o +
                      '" value="' +
                      e +
                      '" ' +
                      (n ? 'checked="checked"' : "") +
                      ' /><label for="' +
                      r.id +
                      "_sourcechooser_" +
                      o +
                      '">' +
                      o +
                      "</label></li>"
                  )
                ),
              r.adjustSourcechooserBox();
          },
          adjustSourcechooserBox: function () {
            var t = this;
            t.sourcechooserButton
              .find(".mejs-sourcechooser-selector")
              .height(
                t.sourcechooserButton
                  .find(".mejs-sourcechooser-selector ul")
                  .outerHeight(!0)
              );
          },
        });
    })(mejs.$),
    (function (t) {
      t.extend(MediaElementPlayer.prototype, {
        buildloop: function (e, i) {
          var o = this,
            n = t(
              '<div class="mejs-button mejs-loop-button ' +
                (e.options.loop ? "mejs-loop-on" : "mejs-loop-off") +
                '"><button type="button" aria-controls="' +
                o.id +
                '" title="Toggle Loop" aria-label="Toggle Loop"></button></div>'
            )
              .appendTo(i)
              .click(function () {
                (e.options.loop = !e.options.loop),
                  e.options.loop
                    ? n.removeClass("mejs-loop-off").addClass("mejs-loop-on")
                    : n.removeClass("mejs-loop-on").addClass("mejs-loop-off");
              });
        },
      });
    })(mejs.$));
