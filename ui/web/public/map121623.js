if (window.devicePixelRatio < 1.5) {
  window.devicePixelRatio = 1.5;
}

let scripts = document.getElementsByTagName("script");
let currentScript = scripts[scripts.length - 1];
currentScript.src = "https://cdn.apple-mapkit.com/mk/5.x.x/mapkit.core.js";
currentScript.setAttribute("data-callback", "initMap");
currentScript.setAttribute("data-libraries", "map,annotations");
currentScript.setAttribute(
  "data-initial-token",
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiIsImtpZCI6IjRXNjgzUDVHUkoifQ.eyJpc3MiOiJLN0E2VEhHWkQzIiwiaWF0IjoxNjg5MjA0ODg3LCJleHAiOjE3MjA3NDA4ODd9.RsfJ37xSpbRhnc_3gciS94dHNjvgZoF-W37nFgsAwDxVhp6zo6gyR_vXCa6qW55o-P9ZDoexVY81JhmgVBoDFw",
);
currentScript.setAttribute(
  "src",
  "https://cdn.apple-mapkit.com/mk/5.x.x/mapkit.core.js",
);

window.initMap = () => {
  let annotation = new mapkit.MarkerAnnotation(
    new mapkit.Coordinate(
      window.driveState[window.currentDriveState].latitude,
      window.driveState[window.currentDriveState].longitude,
    ),
    {
      color: "#000000",
      title: window.driveState[window.currentDriveState].title,
      selected: "true",
      glyphText: window.driveState[window.currentDriveState].glyphText,
    },
  );

  const intervalId = setInterval(() => {
    annotation.coordinate = new mapkit.Coordinate(
      window.driveState[window.currentDriveState].latitude,
      window.driveState[window.currentDriveState].longitude,
    );
    (annotation.glyphText =
      window.driveState[window.currentDriveState].glyphText),
      (annotation.title = window.driveState[window.currentDriveState].title);
  }, 10);

  function getMapSettings() {
    return {
      region: new mapkit.CoordinateRegion(
        new mapkit.Coordinate(
          window.driveState[window.currentDriveState].latitude,
          window.driveState[window.currentDriveState].longitude,
        ),

        new mapkit.CoordinateSpan(
          0.00050441895 * (window.innerHeight - 79),
          0.00030487805 * window.innerWidth,
        ),
      ),
      mapType: mapkit.Map.MapTypes.Hybrid,
    };
  }

  const { region, mapType } = getMapSettings();
  let map = new mapkit.Map("map-container", {
    region,
    mapType,
    loadPriority: mapkit.Map.LoadPriorities.LandCover,
    annotations: [annotation],
    showsMapTypeControl: false,
    showsCompass: mapkit.FeatureVisibility.Hidden,
    showsZoomControl: false,
  });

  window.addEventListener("resize", () => {
    setTimeout(() => {
      const { region, mapType } = getMapSettings();
      map.region = region;
      map.mapType = mapType;
    }, 0.00000000000000000000000000000000000000000000000000001);
  });

  window.destroyMap = () => {
    map.destroy();
    clearInterval(intervalId);
  };
};

/*! Copyright © 2015-2023 Apple Inc. All rights reserved. */ (() => {
  var e,
    t,
    r = {
      1207: (e, t, r) => {
        var i = r(6217),
          n = r(2221),
          o = r(6426),
          a = r(4891),
          s = r(7664),
          l = r(7104).sharedLogger,
          c = r(927),
          u = r(9728),
          h = r(1486),
          d = r(1135).MaxLoadingRequests;
        (d[h.Highest] *= 10),
          (d[h.High] *= 10),
          (d[h.Medium] *= 10),
          (d[h.Low] *= 10);
        var p = r(811),
          f = "https:",
          g = "https://cdn.apple-mapkit.com/ma/bootstrap",
          v = "2",
          m = 3e4,
          _ = {
            OK: 200,
            MULTIPLE_CHOICES: 300,
            BAD_REQUEST: 400,
            UNAUTHORIZED: 401,
            TOO_MANY_REQUESTS: 429,
          },
          y = [
            "language",
            "countryCode",
            "madabaBaseUrl",
            "authorizationCallback",
            "libraries",
            "logger",
            "_showMapsLogo",
            "bootstrapTimeout",
            "_showsTileInfo",
            "_distUrl",
            "_syrupUrl",
            "_previewLoCSR",
            "_forcedRenderingMode",
            "_proxyPrefixes",
          ],
          b = "R`ha\\aHe_";
        y.push(b);
        var E = { READY: 0, PENDING: 1, ERROR: 2, UNINITIALIZED: 3 },
          w = { Initialized: "Initialized", Refreshed: "Refreshed" },
          k = {
            BadRequest: "Bad Request",
            Unauthorized: "Unauthorized",
            TooManyRequests: "Too Many Requests",
            MalformedResponse: "Malformed Response",
            Timeout: "Timeout",
            NetworkError: "Network Error",
            Unknown: "Unknown",
          },
          x = "Bearer {{token}}",
          S = { Apple: "Apple", AutoNavi: "AutoNavi" };
        function I() {
          (this._jwtTokensToCheck = []), (this.componentVersions = {});
        }
        (I.ChangeStatus = w),
          (I.PROTOCOL = f),
          (I.TileProviders = S),
          (I.prototype = n.inheritPrototype(o.EventTarget, I, {
            HTTP: _,
            ErrorStatus: k,
            TileProviders: S,
            Events: {
              Initialized: "configuration-init",
              Changed: "configuration-change",
              Error: "error",
            },
            States: E,
            state: E.UNINITIALIZED,
            authorizationCallback: null,
            tileProvider: null,
            _countryCode: null,
            _showMapsLogo: !0,
            _madabaBaseUrl: null,
            customMadabaUrl: !1,
            _madabaDomains: null,
            _accessKey: null,
            _accessToken: null,
            _distUrl: null,
            _syrupUrl: null,
            apiBaseUrl: null,
            apiBaseUrlOverride: null,
            types: {},
            _acceptLanguage: null,
            _optionsLanguage: null,
            _bootstrapRequestParams: null,
            _showsTileInfo: !1,
            _messagePrefix: "[MapKit] ",
            nonce: "",
            scriptBaseUrl: null,
            get distUrl() {
              return this.scriptBaseUrl ? this.scriptBaseUrl : this._distUrl;
            },
            get buildTags() {
              var e = "";
              return (
                Object.keys(this.componentVersions).forEach(
                  (t) =>
                    (e += " (" + t + ": " + this.componentVersions[t] + ")"),
                ),
                e
              );
            },
            get _initMessagePrefix() {
              return this._messagePrefix + "mapkit.init(): ";
            },
            get proxyPrefixes() {
              return this._proxyPrefixes;
            },
            get withCredentials() {
              return (
                this.proxyPrefixes &&
                this.urlWithCredentials(this.proxyPrefixes[0])
              );
            },
            get distUrlWithCredentials() {
              return this._distUrl
                ? this.urlWithCredentials(this._distUrl)
                : !a.useLocalResources && this.withCredentials;
            },
            urlWithCredentials: function (e) {
              return /\bproxy\.geo\.apple\.com\b/.test(e);
            },
            init: function (e, t) {
              n.required(
                e,
                this._initMessagePrefix + "`options` object is required.",
                { checkNull: !0 },
              ).checkType(
                e,
                "object",
                this._initMessagePrefix + "`options` object is invalid.",
              );
              var r = {};
              if (
                (e.logger && l.appendLogger(e.logger),
                Object.keys(e).forEach((e) => {
                  var t = -1 !== y.indexOf(c.r(e));
                  t ||
                    -1 !== y.indexOf(e) ||
                    console.warn(
                      this._initMessagePrefix +
                        "ignoring invalid option: `" +
                        e +
                        "`.",
                    ),
                    t && (r[c.r(e)] = e);
                }),
                t ||
                  n
                    .required(
                      e.authorizationCallback,
                      this._initMessagePrefix +
                        "`options` is missing `authorizationCallback`.",
                      { checkNull: !0 },
                    )
                    .checkType(
                      e.authorizationCallback,
                      "function",
                      this._initMessagePrefix +
                        "`authorizationCallback` in `options` must be a function.",
                    ),
                e.language &&
                  (n.checkType(
                    e.language,
                    "string",
                    this._initMessagePrefix +
                      "`language` in `options` must be a string.",
                  ),
                  (this._optionsLanguage = e.language)),
                this._userInitializedInit)
              )
                console.warn(
                  this._initMessagePrefix + "already initialized; ignoring.",
                );
              else {
                t || (this._userInitializedInit = !0),
                  "_previewLoCSR" in e &&
                    e._previewLoCSR &&
                    (this._forcedRenderingMode = "HYBRID"),
                  "_forcedRenderingMode" in e &&
                    (this._forcedRenderingMode = e._forcedRenderingMode),
                  "_proxyPrefixes" in e &&
                    Array.isArray(e._proxyPrefixes) &&
                    (this._proxyPrefixes = e._proxyPrefixes),
                  "_distUrl" in e &&
                    (this.nonce || (this._distUrl = e._distUrl)),
                  "_syrupUrl" in e && (this._syrupUrl = e._syrupUrl),
                  r[b] && void 0 !== e[r[b]] && (this[b] = e[r[b]]);
                var i =
                  (this.state === E.UNINITIALIZED || this.state === E.ERROR) &&
                  e.authorizationCallback;
                i && (this.state = E.PENDING),
                  (this.authorizationCallback = e.authorizationCallback),
                  this.language
                    ? this._l10n && (this._l10n.localeId = this.language)
                    : (this.language = this._optionsLanguage),
                  "countryCode" in e && (this._countryCode = e.countryCode),
                  "_showMapsLogo" in e &&
                    (this._showMapsLogo = !!e._showMapsLogo),
                  e.bootstrapTimeout &&
                    (this._bootstrapTimeout = e.bootstrapTimeout),
                  e.madabaBaseUrl &&
                    ((this._madabaBaseUrl = e.madabaBaseUrl),
                    (this.customMadabaUrl = !0)),
                  e._showsTileInfo && (this._showsTileInfo = e._showsTileInfo),
                  i && this._loadFromServer(),
                  e &&
                    "object" == typeof e &&
                    "libraries" in e &&
                    s.load(e.libraries);
                var a = new o.Event(this.Events.Initialized);
                this.dispatchEvent(a);
              }
            },
            reloadFromServer: function () {
              this._loadFromServer();
            },
            get accessKey() {
              return this._accessKey;
            },
            get accessToken() {
              return this._accessToken;
            },
            accessKeyHasExpired: function () {
              this._loadFromServer(h.Highest);
            },
            get ready() {
              return this.state === E.READY;
            },
            get error() {
              return this.state === E.ERROR;
            },
            get language() {
              return this._language;
            },
            set language(e) {
              e !== this._language &&
                (e
                  ? (n.checkType(
                      e,
                      "string",
                      "[MapKit] `language` must be a string or `null`.",
                    ),
                    "zh" === e.toLowerCase() &&
                      (console.warn(
                        "[MapKit] `zh` is an ambiguous language ID. Please specify a script or reginal variant: `zh-Hans`, `zh-Hant`, or `zh-HK`.",
                      ),
                      this._countryCode && (e = "zh-" + this._countryCode)))
                  : (e = this._acceptLanguage || this._getClientLanguage()),
                (this._language = i.bestMatch(e, "en")),
                this.state !== E.UNINITIALIZED &&
                  this._l10n &&
                  (this._l10n.localeId = e));
            },
            get countryCode() {
              return this._countryCode;
            },
            set countryCode(e) {
              e !== this._countryCode &&
                (e &&
                  (n.checkType(
                    e,
                    "string",
                    "[MapKit] `countryCode` must be a string or `null`.",
                  ),
                  (e = e.toUpperCase())),
                (this._countryCode = e),
                this.ready && this._loadFromServer());
            },
            get isAutoNavi() {
              return (
                this.tileProvider === S.AutoNavi ||
                (this.state === E.PENDING && "CN" === this._countryCode)
              );
            },
            appendAuthOptions: function (e, t) {
              return (
                (t || this.accessToken) &&
                  (e.headers = {
                    Authorization: n.fillTemplate(x, {
                      token: t || this.accessToken,
                    }),
                  }),
                e
              );
            },
            setL10n: function (e) {
              (this._l10n = e),
                this.state !== E.UNINITIALIZED &&
                  (this._l10n.localeId = this.language);
            },
            loaderWillStart: function (e) {
              this.state = E.PENDING;
            },
            loaderDidSucceed: function (e, t) {
              this._requestDidLoad(t);
            },
            loaderDidFail: function (e, t) {
              this._parseError(e._xhr);
            },
            _loadFromServer: function (e) {
              this._bootstrapRequestParams = {
                apiVersion: v,
                countryCode: this._countryCode,
                mkjsVersion: a.version,
                poi: "1",
              };
              var t = g + "?" + n.toQueryString(this._bootstrapRequestParams);
              this.proxyPrefixes && (t = this.proxyPrefixes[0] + t);
              var r = {
                retry: !0,
                delay: 0,
                priority: e,
                timeout: this._bootstrapTimeout,
                withCredentials: this.withCredentials,
              };
              this.withCredentials &&
                /\bapple\.com\b/.test(this.proxyPrefixes[0]) &&
                !/\bapple\.com$/.test(window.location.hostname) &&
                console.warn(
                  "[MapKit] Request with credentials may fail if the page is not hosted on the same domain as the proxy.",
                ),
                p(this.authorizationCallback, null, [
                  (e) => {
                    this._checkJwtToken
                      ? this._checkJwtToken(e)
                      : this._jwtTokensToCheck.push(e),
                      this.appendAuthOptions(r, e),
                      this.accessToken &&
                        (r.headers["X-Maps-Access-Token"] = n.fillTemplate(x, {
                          token: this.accessToken,
                        })),
                      new u(t, this, r).schedule();
                  },
                ]);
            },
            _requestDidLoad: function (e) {
              if (!this._parseError(e))
                try {
                  var t = JSON.parse(e.responseText);
                  this._processLoadedData(t);
                } catch (e) {
                  this._loadFailed(
                    k.MalformedResponse,
                    "Initialization failed because of incorrect server-trigger response.",
                  );
                }
            },
            _resetReloadTimer: function (e) {
              clearTimeout(this._reloadTimerId),
                (this._reloadTimerId = setTimeout(() => {
                  delete this._reloadTimerId, this.accessKeyHasExpired();
                }, e));
            },
            _loadSucceeded: function (e) {
              setTimeout(() => {
                this.state = E.READY;
                var t = new o.Event(this.Events.Changed);
                (t.status = e ? w.Refreshed : w.Initialized),
                  this.dispatchEvent(t);
              }, 0);
            },
            _loadFailed: function (e, t) {
              console.error(this._messagePrefix + t),
                setTimeout(() => {
                  this.state = E.ERROR;
                  var r = new o.Event(this.Events.Error);
                  (r.status = e),
                    (r.message = this._messagePrefix + t),
                    this.dispatchEvent(r);
                }, 0);
            },
            _processLoadedData: function (e) {
              var t = !!this._accessToken;
              this._parseData(e),
                this.expiresInSeconds &&
                  this._resetReloadTimer(
                    this._adjustedExpirationInSeconds(this.expiresInSeconds),
                  ),
                this.language || (this.language = this._optionsLanguage),
                this._loadSucceeded(t);
            },
            _parseData: function (e) {
              var t;
              if (
                (e.apiBaseUrl,
                (this._countryCode =
                  "unknown" !== e.countryCode ? e.countryCode : null),
                this._countryCode &&
                  "zh" === this.language &&
                  (this.language = "zh-" + this._countryCode),
                (this.environment = e.environment),
                (this.apiBaseUrl = this.apiBaseUrlOverride || e.apiBaseUrl),
                this.proxyPrefixes &&
                  ((t = this.proxyPrefixes[this.proxyPrefixes.length - 1]),
                  (this.apiBaseUrl = t + this.apiBaseUrl)),
                e.analytics)
              ) {
                var r = e.analytics;
                this.proxyPrefixes &&
                  ((r.analyticsUrl = t + r.analyticsUrl),
                  (r.errorUrl = t + r.errorUrl)),
                  (this.analytics = r);
              }
              e.authInfo &&
                e.authInfo.team_id &&
                (this.teamId = e.authInfo.team_id),
                e.locationShiftUrl &&
                  (this.proxyPrefixes
                    ? (this.locationShiftUrl = t + e.locationShiftUrl)
                    : (this.locationShiftUrl = e.locationShiftUrl)),
                (this.expiresInSeconds = e.expiresInSeconds);
              var i = e.tileSources.some((e) => e.needsLocationShift);
              e.accessKey && (this._accessKey = e.accessKey),
                e.authInfo &&
                  e.authInfo.access_token &&
                  (this._accessToken = e.authInfo.access_token),
                (this.tileProvider = i
                  ? I.TileProviders.AutoNavi
                  : I.TileProviders.Apple),
                (this._acceptLanguage = this._parseAcceptLanguage(
                  e.acceptLanguage,
                )),
                (this._data = e),
                this._parseMapData && this._parseMapData();
            },
            _parseError: function (e) {
              var t,
                r,
                i = e.status;
              if (i >= _.OK && i < _.MULTIPLE_CHOICES) return !1;
              if (((this._userInitializedInit = !1), e.readyState !== e.DONE))
                (r = k.Timeout),
                  (t =
                    "Initialization failed because the request timed out after " +
                    this._bootstrapTimeout +
                    " ms.");
              else if (i === _.UNAUTHORIZED) {
                (r = k.Unauthorized),
                  (t =
                    "Initialization failed because the authorization token is invalid.");
                try {
                  var n = JSON.parse(e.responseText);
                  n.error &&
                    n.error.details &&
                    Array.isArray(n.error.details) &&
                    n.error.details.forEach(function (e) {
                      e &&
                        "ORIGIN_CHECK_FAILURE" === e.errorType &&
                        e.message &&
                        (t += " " + e.message);
                    });
                } catch (e) {
                  if ("SyntaxError" !== e.name) throw e;
                }
              } else
                i === _.TOO_MANY_REQUESTS
                  ? ((r = k.TooManyRequests),
                    (t =
                      "Initialization failed because the daily usage limit has exceeded."))
                  : 0 === i
                  ? ((r = k.NetworkError),
                    (t = "Initialization failed because of network error."))
                  : ((r = k.Unknown),
                    (t =
                      "Initialization failed because the server-trigger returned error " +
                      i +
                      " (" +
                      e.statusText +
                      ")."));
              return this._loadFailed(r, t), !0;
            },
            _getClientLanguage: function () {
              return window.navigator.languages
                ? window.navigator.languages[0]
                : window.navigator.language;
            },
            _parseAcceptLanguage: function (e) {
              var t = i.constructor.parseAcceptLanguage(e);
              return t && t[0].langTag ? t[0].langTag.tag : null;
            },
            _adjustedExpirationInSeconds: function (e) {
              return 1e3 * e - m;
            },
            _restore: function () {
              this._syrupUrl &&
                console.warn(
                  "[MapKit] mapkit.restore() cannot unset _syrupUrl.",
                ),
                this[b] &&
                  console.warn(
                    "[MapKit] mapkit.restore() cannot unset R`ha\\aHe_",
                  ),
                delete this._proxyPrefixes,
                delete this._forcedRenderingMode,
                delete this._userInitializedInit,
                (this._distUrl = null),
                (this.authorizationCallback = null),
                (this._acceptLanguage = null),
                (this._optionsLanguage = null),
                delete this._language,
                (this.apiBaseUrl = null),
                (this.apiBaseUrlOverride = null),
                (this.state = E.UNINITIALIZED),
                (this._listeners = {}),
                clearTimeout(this._reloadTimerId),
                delete this._reloadTimerId;
            },
            _debugInfo: function () {
              var e = {};
              return (
                [
                  "ready",
                  "state",
                  "_countryCode",
                  "tileProvider",
                  "apiBaseUrl",
                  "language",
                  "_acceptLanguage",
                  "_optionsLanguage",
                  "_getClientLanguage",
                  "types",
                ].forEach(function (t) {
                  e[t] = "function" == typeof this[t] ? this[t]() : this[t];
                }, this),
                e
              );
            },
          })),
          (e.exports = I);
      },
      3838: (e) => {
        function t(e) {
          if (e)
            return (
              (e.addEventListener = t.prototype.addEventListener),
              (e.removeEventListener = t.prototype.removeEventListener),
              (e.dispatchEvent = t.prototype.dispatchEvent),
              e
            );
        }
        function r(e) {
          (this.type = e),
            (this.target = null),
            (this.defaultPrevented = !1),
            (this._stoppedPropagation = !1);
        }
        (t.prototype = {
          constructor: t,
          addEventListener: function (e, t, r) {
            if (((r = r || null), !e)) return !1;
            if (!t) return !1;
            this._listeners || (this._listeners = {});
            var i = this._listeners[e];
            i || (i = this._listeners[e] = []);
            for (var n = 0; n < i.length; ++n)
              if (i[n].listener === t && i[n].thisObject === r) return !1;
            return i.push({ thisObject: r, listener: t }), !0;
          },
          removeEventListener: function (e, t, r) {
            if (
              ((e = e || null),
              (t = t || null),
              (r = r || null),
              !this._listeners)
            )
              return !1;
            if (!e) {
              for (e in this._listeners) this.removeEventListener(e, t, r);
              return !1;
            }
            var i = this._listeners[e];
            if (!i) return !1;
            for (var n = !1, o = i.length - 1; o >= 0; --o)
              if (
                (t && i[o].listener === t && i[o].thisObject === r) ||
                (!t && r && i[o].thisObject === r)
              ) {
                i.splice(o, 1), (n = !0);
                break;
              }
            return (
              i.length || delete this._listeners[e],
              Object.keys(this._listeners).length || delete this._listeners,
              n
            );
          },
          dispatchEvent: function (e) {
            if (
              ((e.target = this),
              !this._listeners ||
                !this._listeners[e.type] ||
                e._stoppedPropagation)
            )
              return !0;
            for (
              var t = this._listeners[e.type].slice(0), r = 0;
              r < t.length;
              ++r
            ) {
              var i = t[r].thisObject,
                n = t[r].listener;
              if (
                (i ||
                "function" == typeof n ||
                "function" != typeof n.handleEvent
                  ? n.call(i, e)
                  : n.handleEvent.call(n, e),
                e._stoppedPropagation)
              )
                break;
            }
            return !e.defaultPrevented;
          },
        }),
          (r.prototype = {
            constructor: r,
            stopPropagation: function () {
              this._stoppedPropagation = !0;
            },
            preventDefault: function () {
              this.defaultPrevented = !0;
            },
          }),
          (e.exports = { EventTarget: t, Event: r });
      },
      2221: (e) => {
        var t = Math.log(2),
          r = [
            /MSIE [5-9]\./,
            /Firefox\/[1-9]\./,
            /Firefox\/[1-2][0-9]\./,
            /Firefox\/3[0-1]\./,
            /Firefox\/[0-9]\./,
            /Firefox\/[1-2][0-9]\./,
            /Firefox\/3[0-6]\./,
            /Android [0-3]\./,
            /Android 4\.[0-3]\./,
          ],
          i = [
            /\(Macintosh; Intel Mac OS X 11_??\)*/,
            /\(Macintosh; Intel Mac OS X 10.9*\)*/,
            /\(Macintosh; Intel Mac OS X 10_9*\)*/,
            /\(Macintosh; Intel Mac OS X 10_??;*\)*/,
            /\(Macintosh; Intel Mac OS X 10.??;*\)*/,
            /\(Macintosh; Intel Mac OS X 10_??_*\)*/,
            /\(Macintosh; Intel Mac OS X 10.??.*\)*/,
            /\(Macintosh; Intel Mac OS X 10_??\)*/,
            /\(Macintosh; Intel Mac OS X 10.??\)*/,
            /iP(hone|od|ad)/,
          ],
          n = {
            KeyCodes: {
              Tab: 9,
              Enter: 13,
              Escape: 27,
              SpaceBar: 32,
              LeftArrow: 37,
              UpArrow: 38,
              RightArrow: 39,
              DownArrow: 40,
            },
            get iOSVersion() {
              if (/iP(hone|od|ad)/.test(navigator.platform)) {
                var e = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
                return [
                  parseInt(e[1], 10),
                  parseInt(e[2], 10),
                  parseInt(e[3] || 0, 10),
                ];
              }
              return null;
            },
            noop: function () {},
            isEdge: function () {
              return /Edge\//i.test(navigator.userAgent);
            },
            isIEAndNotEdge: function () {
              return /MSIE|Trident\//i.test(navigator.userAgent);
            },
            isNode: function () {
              return !1;
            },
            isUnsupportedBrowser: function (e) {
              return r.some(function (t) {
                return t.test(e);
              });
            },
            hasMapsApp: function (e) {
              return i.some(function (t) {
                return t.test(e);
              });
            },
            mod: function (e, t) {
              return e - t * Math.floor(e / t);
            },
            log2: function (e) {
              return Math.log(e) / t;
            },
            clamp: function (e, t, r) {
              return Math.max(t, Math.min(e, r));
            },
            inheritPrototype: function (e, t, r) {
              var i = { constructor: { enumerable: !0, value: t } };
              return (
                Object.keys(r).forEach(function (e) {
                  var t = Object.getOwnPropertyDescriptor(r, e);
                  t && (i[e] = t);
                }),
                Object.create(e.prototype, i)
              );
            },
            checkValueIsInEnum: function (e, t) {
              return Object.keys(t).some(function (r) {
                return t[r] === e;
              });
            },
            required: function (e, t, r) {
              if (
                ("checkNull" in (r = r || {}) || (r.checkNull = !0),
                void 0 === e || (r.checkNull && null === e))
              )
                throw new Error(t || "Missing parameter");
              return this;
            },
            checkType: function (e, t, r) {
              if (typeof e !== t)
                throw new TypeError(
                  r || "Expected `" + t + "` but got `" + typeof e + "`",
                );
              if ("number" === t && isNaN(e))
                throw new TypeError(r || "Expected `" + t + "` but got `NaN`");
              if ("object" === t && e instanceof Array)
                throw new TypeError(
                  r || "Expected a non-array object but got an array",
                );
              return this;
            },
            checkInstance: function (e, t, r) {
              if (!(e instanceof t))
                throw new Error(r || "Unexpected object instance");
              return this;
            },
            checkElement: function (e, t) {
              if (!this.isElement(e))
                throw new Error(t || "Expected an Element");
              return this;
            },
            checkArray: function (e, t) {
              if (!Array.isArray(e)) throw new Error(t || "Expected an array");
              return this;
            },
            checkOptions: function (e, t) {
              return (
                null != e
                  ? this.checkType(
                      e,
                      "object",
                      t ||
                        "[MapKit] The `options` parameter is not a valid object.",
                    )
                  : (e = {}),
                e
              );
            },
            isElement: function (e) {
              return (
                e instanceof window.Node &&
                e.nodeType === window.Node.ELEMENT_NODE
              );
            },
            get supportsLocalStorage() {
              if ("_supportsLocalStorage" in this)
                return this._supportsLocalStorage;
              this._supportsLocalStorage = !1;
              try {
                if (!window.localStorage) return !1;
                if (
                  "function" != typeof window.localStorage.setItem ||
                  "function" != typeof window.localStorage.getItem ||
                  "function" != typeof window.localStorage.removeItem
                )
                  return !1;
                var e = "storageTest";
                if (
                  (window.localStorage.setItem(e, e),
                  window.localStorage.getItem(e) !== e)
                )
                  return !1;
                window.localStorage.removeItem(e),
                  (this._supportsLocalStorage = !0);
              } catch (e) {
                return !1;
              }
              return this._supportsLocalStorage;
            },
            fillTemplate: function (e, t, r) {
              return e.replace(/{{(.*?)}}/g, function (e, i) {
                var n = t[i];
                if (r && null == n)
                  throw new Error(
                    "fillTemplate: Missing value for parameter: " + i,
                  );
                return n;
              });
            },
            generateSrcSetString: function (e) {
              var t = [];
              if (Array.isArray(e) && 3 === e.length)
                for (var r = 0; r < 3; r++) t.push(e[r] + " " + (r + 1) + "x");
              else
                for (var i = e, n = 1; n <= 3; n++)
                  t.push(this.fillTemplate(i, { scale: n }) + " " + n + "x");
              return t.join(", ");
            },
            xhr: function (e) {
              var t;
              return (
                (t = new XMLHttpRequest()).addEventListener("load", e),
                t.addEventListener("error", e),
                t.addEventListener("timeout", e),
                t
              );
            },
            parseURL: function (e) {
              var t = document.createElement("a");
              return (
                (t.href = e),
                t.protocol || (t.protocol = location.protocol),
                [
                  "href",
                  "protocol",
                  "hostname",
                  "port",
                  "pathname",
                  "search",
                  "hash",
                ].reduce(function (e, r) {
                  return (e[r] = t[r]), e;
                }, {})
              );
            },
            toQueryString: function (e, t) {
              return null === e || "object" != typeof e
                ? ""
                : (t || Object.keys(e))
                    .reduce(function (t, r) {
                      var i = e[r];
                      return (
                        i &&
                          t.push(
                            encodeURIComponent(r) + "=" + encodeURIComponent(i),
                          ),
                        t
                      );
                    }, [])
                    .join("&");
            },
            splitStringAtSubStringAndReplace: function (e) {
              var t = [],
                r = e.text.toLowerCase().indexOf(e.subString.toLowerCase());
              if (e.text && !(r < 0) && e.replaceSubString) {
                var i = e.text.substr(0, r);
                i && t.push(e.replacePre ? e.replacePre(i) : i);
                var n = e.text.substr(r, e.subString.length);
                t.push(e.replaceSubString(e.subString, n));
                var o = e.text.substr(r + e.subString.length);
                return o && t.push(e.replacePost ? e.replacePost(o) : o), t;
              }
            },
            isSameOrigin: function (e, t) {
              return (
                (e = this.parseURL(e)),
                (t = this.parseURL(t)),
                e.hostname === t.hostname && e.protocol === t.protocol
              );
            },
            capitalize: function (e) {
              return e ? e[0].toUpperCase() + e.substr(1).toLowerCase() : e;
            },
            generateSessionIdValue: function () {
              return Math.floor(1e15 * (9 * Math.random() + 1));
            },
            doNotTrack: function () {
              var e =
                window &&
                ((window.navigator &&
                  (navigator.doNotTrack || navigator.msDoNotTrack)) ||
                  window.doNotTrack);
              return "1" === e || "yes" === e;
            },
            supportsTouches: function () {
              return "ontouchmove" in document;
            },
            isSpaceKey: function (e) {
              return e.keyCode === this.KeyCodes.SpaceBar;
            },
            isEnterKey: function (e) {
              return e.keyCode === this.KeyCodes.Enter;
            },
            isTabKey: function (e) {
              return e.keyCode === this.KeyCodes.Tab;
            },
            isEscapeKey: function (e) {
              return e.keyCode === this.KeyCodes.Escape;
            },
            createCanvas: function () {
              return document.createElement("canvas");
            },
            atob: function (e) {
              return window.atob(e);
            },
          };
        e.exports = n;
      },
      3801: (e, t, r) => {
        var i = r(1135),
          n = r(2380);
        function o(e, t) {
          this.init(e, t);
        }
        (o.prototype = {
          constructor: o,
          get state() {
            return this._state;
          },
          schedule: function () {
            this._state || ((this._state = n.Waiting), i.schedule(this));
          },
          unschedule: function () {
            var e = !1;
            if (this._state === n.Waiting) e = i.unschedule(this);
            else {
              if (this._state !== n.Loading) return !1;
              i.loaderDidComplete(this), (e = !0);
            }
            return (
              (this._unscheduled = e),
              (this._state = n.Canceled),
              "function" == typeof this._delegate.loaderDidCancel &&
                this._delegate.loaderDidCancel(this),
              this._reset(),
              e
            );
          },
          loaderWillStart: function () {
            (this._state = n.Loading),
              "function" == typeof this._delegate.loaderWillStart &&
                this._delegate.loaderWillStart(this);
          },
          loaderDidSucceed: function (e) {
            (this._state = n.Succeeded),
              i.loaderDidComplete(this),
              "function" == typeof this._delegate.loaderDidSucceed &&
                this._delegate.loaderDidSucceed(this, e),
              this._reset();
          },
          loaderDidFail: function (e) {
            (this._state = n.Failed),
              i.loaderDidComplete(this),
              "function" == typeof this._delegate.loaderDidFail &&
                this._delegate.loaderDidFail(this, e),
              this._reset();
          },
          init: function (e, t) {
            (this._delegate = t),
              (this._state = n.Unscheduled),
              (this._retries = 0),
              (this._timeoutID = -1),
              (this.priority = e),
              (this._unscheduled = !1);
          },
          _reset: function () {
            clearTimeout(this._timeoutID);
          },
          _reload: function (e) {
            if ((this._retries++, this._retries < 3)) {
              var t = "number" == typeof this._delay ? this._delay : 1e4;
              this._timeoutID = setTimeout(this.loaderWillStart.bind(this), t);
            } else this.loaderDidFail(e);
          },
        }),
          (e.exports = o);
      },
      1135: (e, t, r) => {
        var i = r(1486),
          n = [];
        (n[i.Highest] = 12),
          (n[i.High] = 12),
          (n[i.Medium] = 4),
          (n[i.Low] = 1);
        var o = [],
          a = [];
        for (var s in i) (o[i[s]] = []), (a[i[s]] = 0);
        function l() {
          for (var e in i) {
            if (o[i[e]].length > 0) {
              if (a[i[e]] === n[i[e]]) break;
              return o[i[e]][0];
            }
            if (a[i[e]] > 0) break;
          }
          return null;
        }
        function c() {
          for (var e in i) if (o[i[e]].length > 0) return o[i[e]].shift(), !0;
          return !1;
        }
        function u() {
          for (var e = l(); e; )
            a[e.priority]++, c(), e.loaderWillStart(), (e = l());
        }
        e.exports = {
          schedule: function (e) {
            o[e.priority].push(e), u();
          },
          unschedule: function (e) {
            return (function (e) {
              for (var t in i) {
                var r = o[i[t]].indexOf(e);
                if (-1 !== r) return o[i[t]].splice(r, 1), !0;
              }
              return !1;
            })(e);
          },
          loaderDidComplete: function (e) {
            a[e.priority]--, u();
          },
          MaxLoadingRequests: n,
        };
      },
      1486: (e) => {
        e.exports = { Highest: 0, High: 1, Medium: 2, Low: 3 };
      },
      2380: (e) => {
        e.exports = {
          Unscheduled: 0,
          Waiting: 1,
          Loading: 2,
          Canceled: 3,
          Succeeded: 4,
          Failed: 5,
        };
      },
      9728: (e, t, r) => {
        var i = r(2221),
          n = r(3801),
          o = r(1486);
        function a(e, t, r) {
          var a = (r = r || {}).priority || o.Highest;
          n.call(this, a, t),
            (this._url = e),
            (this._method = r.method || "GET"),
            (this._retry = !0 === r.retry),
            (this._delay = r.delay),
            (this._headers = r.headers),
            (this._timeout = r.timeout),
            (this._withCredentials = r.withCredentials),
            i.isNode() && (this._origin = r.origin);
        }
        (a.prototype = i.inheritPrototype(n, a, {
          get xhrData() {
            return this._xhrData;
          },
          unschedule: function () {
            return (
              this._xhr && this._xhr.abort(), n.prototype.unschedule.call(this)
            );
          },
          loaderWillStart: function () {
            if (
              (n.prototype.loaderWillStart.call(this),
              (this._xhr = i.xhr(this)),
              this._xhr.open(this._method, this._url, !0),
              (this._xhr.timeout = this._timeout),
              (this._xhr.withCredentials = this._withCredentials),
              this._origin &&
                (this._xhr.setDisableHeaderCheck(!0),
                this._xhr.setRequestHeader("Origin", this._origin)),
              this._headers &&
                Object.keys(this._headers).forEach(function (e) {
                  this._xhr.setRequestHeader(e, this._headers[e]);
                }, this),
              "POST" === this._method && !this._xhrData)
            ) {
              if (
                ((this._xhrData = this._delegate.getDataToSend(this._xhr)),
                !this._xhrData)
              )
                return;
              0;
            }
            this._xhr.send(this._xhrData);
          },
          handleEvent: function (e) {
            "error" === e.type ||
            "timeout" === e.type ||
            200 !== e.target.status
              ? this._retry
                ? n.prototype._reload.call(this, e.target)
                : this.loaderDidFail(e.target)
              : "load" === e.type
              ? this.loaderDidSucceed(e.target)
              : console.log(
                  "Unhandled XHR event type:",
                  e.type,
                  " status:",
                  e.target.status,
                );
          },
        })),
          (e.exports = a);
      },
      6311: (e, t, r) => {
        "use strict";
        var i = r(2221);
        function n(e, t, r) {
          (this.language = e.toLowerCase()),
            t && (this.region = t.toUpperCase()),
            r && (this.script = i.capitalize(r));
        }
        (n.prototype = {
          constructor: n,
          get tag() {
            var e = this.language;
            return this.region
              ? e + "-" + this.region
              : this.script
              ? e + "-" + this.script
              : e;
          },
          toString: function () {
            var e = "{ language: " + this.language;
            return (
              this.region && (e += ", region: " + this.region),
              this.script && (e += ", script: " + this.script),
              e + " }"
            );
          },
        }),
          (n.parse = function (e) {
            var t, r, i;
            if (e && "string" == typeof e) {
              if (-1 !== e.indexOf("_"))
                return console.warn("Invalid character: '_'"), null;
              var o = e.split("-");
              if ((t = o[0]).length < 2 || t.length > 4)
                return console.warn("Invalid language:", e), null;
              if (!(o.length < 4))
                return (
                  console.warn(
                    "Don't know how to parse language tags with more than 3 parts:",
                    e,
                  ),
                  null
                );
              for (var a = 1; a < o.length; a++) {
                var s = o[a];
                if (4 === s.length) i = s;
                else {
                  if (!(s.length > 1 && s.length < 4))
                    return console.warn("Don't know how to parse:", e), null;
                  r = s;
                }
              }
              return new n(t, r, i);
            }
            return null;
          }),
          (e.exports = n);
      },
      7748: (e, t, r) => {
        "use strict";
        var i = r(6311);
        function n(e) {
          (this.supportMap = Object.create(null)),
            (this.delegate = e),
            this.delegate.supportedLocales.forEach(function (e) {
              !(function (e, t) {
                var r = e.language,
                  i = e.region,
                  n = e.script;
                t[r] || (t[r] = { regions: [], scripts: [] }),
                  i && t[r].regions.push(i),
                  n && t[r].scripts.push(n);
              })(i.parse(e), this.supportMap);
            }, this);
        }
        (n.prototype = {
          constructor: n,
          bestMatch: function (e, t) {
            var r = i.parse(e),
              n = null;
            if (r && this.delegate.localesMap) {
              var o = this.delegate.localesMap;
              o[r.tag]
                ? (r = i.parse(o[r.tag]))
                : o[r.language] && (r = i.parse(o[r.language]));
            }
            return (
              (t = t || null),
              r &&
                (n = (function (e, t, r) {
                  var n = e.language,
                    o = e.region,
                    a = e.script,
                    s = r[n];
                  if (!s) return null;
                  if (o) {
                    var l = s.regions.filter(function (t) {
                      return t.toUpperCase() === e.region.toUpperCase();
                    })[0];
                    if (l) return new i(n, l);
                    var c = t[n];
                    c &&
                      c[o.toUpperCase()] &&
                      (e.script = a = c[o.toUpperCase()]);
                  }
                  if (a) {
                    var u = s.scripts.filter(function (t) {
                      return t.toUpperCase() === e.script.toUpperCase();
                    })[0];
                    return new i(n, null, u);
                  }
                  return new i(n);
                })(r, this.delegate.regionToScriptMap, this.supportMap)),
              n ? n.tag : t
            );
          },
        }),
          (n.parseAcceptLanguage = function (e) {
            return e
              ? e
                  .split(",")
                  .map(function (e) {
                    if (!e) return null;
                    var t = e.split(";");
                    return {
                      langTag: i.parse(t[0]),
                      quality: t[1] ? parseFloat(t[1].split("=")[1]) : 1,
                    };
                  })
                  .filter(function (e) {
                    return !!e;
                  })
                  .sort(function (e, t) {
                    return t.quality - e.quality;
                  })
              : null;
          }),
          (e.exports = n);
      },
      927: (e) => {
        e.exports = {
          r: function (e) {
            return String.fromCharCode.apply(
              String,
              e.split("").map((e) => (e.codePointAt(0) + 242) % 255),
            );
          },
        };
      },
      811: (e) => {
        var t = "function" == typeof ErrorEvent;
        e.exports = function (e, r, i, n) {
          if (!t) return e.apply(r, i);
          try {
            return e.apply(r, i);
          } catch (e) {
            console.error(e);
            var o = new ErrorEvent("error", {
              message: e.message || e.toString() || "(Unknown error)",
              filename: e.fileName || e.stack || "(Unknown filename)",
              lineno: e.lineNumber,
              colno: e.columnNumber,
              error: e,
            });
            return window.dispatchEvent(o), n;
          }
        };
      },
      3024: (e, t, r) => {
        var i = r(7017),
          n = r(5869),
          o = r(6426),
          a = r(927);
        e.exports = function (e) {
          var t = (t, r) => e._chunkLoaded(t, r),
            s = {
              services: function (e) {
                Promise.all([
                  r.e(479),
                  r.e(666),
                  r.e(863),
                  r.e(106),
                  r.e(233),
                  r.e(993),
                  r.e(894),
                ])
                  .then(
                    function (i) {
                      t(r(1646), e);
                    }.bind(null, r),
                  )
                  .catch(r.oe);
              },
              "full-map": function (e) {
                Promise.all([
                  r.e(479),
                  r.e(666),
                  r.e(840),
                  r.e(863),
                  r.e(90),
                  r.e(842),
                  r.e(106),
                  r.e(415),
                  r.e(233),
                  r.e(559),
                  r.e(574),
                  r.e(614),
                  r.e(343),
                  r.e(15),
                  r.e(993),
                  r.e(277),
                  r.e(816),
                  r.e(843),
                ])
                  .then(
                    function (i) {
                      t(r(3849), e);
                    }.bind(null, r),
                  )
                  .catch(r.oe);
              },
              map: function (e) {
                Promise.all([
                  r.e(479),
                  r.e(666),
                  r.e(840),
                  r.e(863),
                  r.e(90),
                  r.e(842),
                ])
                  .then(
                    function (i) {
                      t(r(9348), e);
                    }.bind(null, r),
                  )
                  .catch(r.oe);
              },
              overlays: function (e) {
                Promise.all([
                  r.e(479),
                  r.e(666),
                  r.e(840),
                  r.e(863),
                  r.e(90),
                  r.e(842),
                  r.e(559),
                  r.e(614),
                  r.e(15),
                  r.e(277),
                ])
                  .then(
                    function (i) {
                      t(r(7537), e);
                    }.bind(null, r),
                  )
                  .catch(r.oe);
              },
              annotations: function (e) {
                Promise.all([
                  r.e(479),
                  r.e(666),
                  r.e(840),
                  r.e(863),
                  r.e(90),
                  r.e(842),
                  r.e(106),
                  r.e(415),
                  r.e(233),
                  r.e(559),
                  r.e(574),
                  r.e(614),
                  r.e(343),
                ])
                  .then(
                    function (i) {
                      t(r(2697), e);
                    }.bind(null, r),
                  )
                  .catch(r.oe);
              },
              geojson: function (e) {
                Promise.all([
                  r.e(479),
                  r.e(666),
                  r.e(840),
                  r.e(863),
                  r.e(90),
                  r.e(842),
                  r.e(106),
                  r.e(415),
                  r.e(559),
                  r.e(574),
                  r.e(15),
                  r.e(346),
                ])
                  .then(
                    function (i) {
                      t(r(4461), e);
                    }.bind(null, r),
                  )
                  .catch(r.oe);
              },
              "user-location": function (e) {
                Promise.all([
                  r.e(479),
                  r.e(666),
                  r.e(840),
                  r.e(863),
                  r.e(90),
                  r.e(842),
                  r.e(106),
                  r.e(415),
                  r.e(233),
                  r.e(559),
                  r.e(574),
                  r.e(614),
                  r.e(343),
                  r.e(15),
                  r.e(993),
                  r.e(277),
                  r.e(816),
                ])
                  .then(
                    function (i) {
                      t(r(2759), e);
                    }.bind(null, r),
                  )
                  .catch(r.oe);
              },
            },
            l = {
              legacy: function (e) {
                Promise.all([
                  r.e(479),
                  r.e(666),
                  r.e(840),
                  r.e(863),
                  r.e(90),
                  r.e(842),
                  r.e(106),
                  r.e(415),
                  r.e(170),
                ])
                  .then(
                    function (i) {
                      t(r(9398), e);
                    }.bind(null, r),
                  )
                  .catch(r.oe);
              },
              spi: function (e) {
                r.e(208)
                  .then(
                    function (i) {
                      t(r(7341), e);
                    }.bind(null, r),
                  )
                  .catch(r.oe);
              },
            },
            c = {
              "fXei\\VXf": function (e) {
                Promise.all([
                  r.e(479),
                  r.e(666),
                  r.e(863),
                  r.e(106),
                  r.e(233),
                  r.e(993),
                  r.e(894),
                  r.e(962),
                ])
                  .then(
                    function (i) {
                      t(r(8982), e);
                    }.bind(null, r),
                  )
                  .catch(r.oe);
              },
              "TaabgTg\\baf": function (e) {
                Promise.all([
                  r.e(479),
                  r.e(666),
                  r.e(840),
                  r.e(863),
                  r.e(90),
                  r.e(842),
                  r.e(106),
                  r.e(415),
                  r.e(233),
                  r.e(559),
                  r.e(574),
                  r.e(614),
                  r.e(343),
                  r.e(134),
                ])
                  .then(
                    function (i) {
                      t(r(6718), e);
                    }.bind(null, r),
                  )
                  .catch(r.oe);
              },
              "jXUZ_ _TlXef": function (e) {
                Promise.all([r.e(479), r.e(840), r.e(319)])
                  .then(
                    function (i) {
                      t(r(1406), e);
                    }.bind(null, r),
                  )
                  .catch(r.oe);
              },
              "_bb^ TebhaW": function (e) {
                Promise.all([
                  r.e(479),
                  r.e(666),
                  r.e(840),
                  r.e(90),
                  r.e(411),
                  r.e(101),
                ])
                  .then(
                    function (i) {
                      t(r(6522), e);
                    }.bind(null, r),
                  )
                  .catch(r.oe);
              },
            };
          (e.Libraries = Object.keys(s)),
            (e.loadedLibraries = []),
            (e.load = function (t) {
              if (("string" == typeof t && (t = [t]), !Array.isArray(t)))
                throw new Error(
                  "[MapKit] mapkit.load() expects an array of library names.",
                );
              var u = t.map(function (e) {
                var t = s[e] || l[e];
                if (
                  ("spi-" === e.substring(0, 4) && (t = c[a.r(e.substring(4))]),
                  !t)
                )
                  throw new Error("[MapKit] Unknown library: " + e);
                return t;
              });
              (r.p = function (e) {
                return i.createUrl(e, !0);
              }),
                (r.c = n.distUrlWithCredentials),
                (r.nc = n.nonce),
                (r.oe = function (r) {
                  console.error(
                    "[MapKit] Error loading libraries: " + t.join(", "),
                  );
                  var i = new o.Event(e.Events.LOAD_ERROR);
                  (i.libraryNames = t.slice()), e.dispatchEvent(i);
                });
              var h = u.length;
              u.forEach(function (r) {
                r(function () {
                  0 === --h &&
                    (t.forEach(function (t) {
                      -1 === e.loadedLibraries.indexOf(t) &&
                        e.loadedLibraries.push(t);
                    }),
                    e._dispatchLoadEndEvent(t));
                });
              }),
                (r.oe = void 0);
            });
        };
      },
      7664: (e, t, r) => {
        var i = r(6426),
          n = {
            Libraries: [],
            Events: {
              LOAD: "load",
              LOADEND: "loadend",
              LOAD_ERROR: "load-error",
            },
            jsModules: { mapkit: {} },
            _chunkLoaded: function (e, t) {
              Object.keys(e).forEach((t) => {
                "mapkit" !== t
                  ? (this.jsModules[t] = e[t])
                  : Object.keys(e.mapkit).forEach((t) => {
                      this.jsModules.mapkit[t] = e.mapkit[t];
                    });
              });
              var r = new i.Event(this.Events.LOAD);
              (r.jsModules = e), this.dispatchEvent(r), t && t();
            },
            _dispatchLoadEndEvent: function (e) {
              var t = new i.Event(this.Events.LOADEND);
              (t.libraryNames = e), this.dispatchEvent(t);
            },
          };
        i.EventTarget(n), (e.exports = n);
      },
      5869: (e, t, r) => {
        var i = r(1207);
        function n() {
          i.call(this);
        }
        (n.prototype = Object.create(i.prototype)),
          Object.defineProperty(n.prototype, "constructor", {
            enumerable: !0,
            writable: !0,
            value: n,
          });
        var o = new n();
        e.exports = o;
      },
      8717: (e, t, r) => {
        var i = r(4891),
          n = r(5869),
          o = r(6814),
          a = r(2221),
          s = r(7094),
          l = r(7664),
          c = r(3024),
          u = r(8947),
          h = r(7017);
        function d() {
          throw new TypeError("[MapKit] MapKit may not be constructed.");
        }
        var p = function (e) {
          var t = new o.Event(e.type);
          (t.status = e.status),
            e.message && (t.message = e.message),
            m.dispatchEvent(t);
        };
        d.prototype = a.inheritPrototype(o.EventTarget, d, {
          init: function (e) {
            n.init(e),
              n.addEventListener(n.Events.Changed, p),
              n.addEventListener(n.Events.Error, p);
          },
          get version() {
            return i.version;
          },
          get build() {
            return i.build + "" + s + n.buildTags;
          },
          get language() {
            return n.language;
          },
          set language(e) {
            n.language = e;
          },
          toString: function () {
            return ["MapKit JS", this.version, "(" + this.build + ")"].join(
              " ",
            );
          },
          get _tileProvider() {
            return n.tileProvider;
          },
          get _countryCode() {
            return n.countryCode;
          },
          set _countryCode(e) {
            n.countryCode = e;
          },
          _restore: function () {
            n._restore();
          },
          get _environment() {
            return n.environment;
          },
        });
        var f = [
            "importGeoJSON",
            "FeatureVisibility",
            "CoordinateRegion",
            "CoordinateSpan",
            "Coordinate",
            "BoundingRegion",
            "MapPoint",
            "MapRect",
            "MapSize",
            "Padding",
            "CameraZoomRange",
            "MapFeatureType",
            "Style",
            "LineGradient",
            "CircleOverlay",
            "PolylineOverlay",
            "PolygonOverlay",
            "Geocoder",
            "Search",
            "Directions",
            "PointsOfInterestSearch",
            "Map",
            "Annotation",
            "PinAnnotation",
            "ImageAnnotation",
            "MarkerAnnotation",
            "MapFeatureAnnotation",
            "TileOverlay",
            "PointOfInterestCategory",
            "PointOfInterestFilter",
          ],
          g = !1;
        c(l),
          l.addEventListener(l.Events.LOAD, function (e) {
            var t = e.jsModules;
            if (
              (t.mapkit &&
                Object.keys(t.mapkit).forEach(function (e) {
                  var r = f.indexOf(e);
                  -1 !== r
                    ? (delete d.prototype[e],
                      (d.prototype[e] = t.mapkit[e]),
                      f.splice(r, 1))
                    : e in d.prototype || (d.prototype[e] = t.mapkit[e]);
                }),
              t.MapInternal &&
                (delete d.prototype.maps,
                Object.defineProperty(d.prototype, "maps", {
                  get: function () {
                    return t.MapInternal.maps;
                  },
                  configurable: !0,
                })),
              t.PointOfInterestFilter &&
                (delete d.prototype.filterIncludingAllCategories,
                delete d.prototype.filterExcludingAllCategories,
                Object.defineProperties(d.prototype, {
                  filterIncludingAllCategories: {
                    get: function () {
                      return t.PointOfInterestFilter
                        .filterIncludingAllCategories;
                    },
                    configurable: !0,
                  },
                  filterExcludingAllCategories: {
                    get: function () {
                      return t.PointOfInterestFilter
                        .filterExcludingAllCategories;
                    },
                    configurable: !0,
                  },
                })),
              t.mapkitKey && (window.__mapkitDebugKey = t.mapkitKey),
              !g && l.jsModules.css && l.jsModules.utils)
            ) {
              var r = l.jsModules.utils.htmlElement("style", l.jsModules.css);
              (r.nonce = n.nonce), document.head.appendChild(r), (g = !0);
            }
          });
        var v = h.findScriptAndSetBasePath();
        v &&
          v.nonce &&
          ((n.nonce = v.nonce), (n.scriptBaseUrl = h.scriptBaseUrl)),
          window.mapkit &&
            window.mapkit.constructor &&
            window.mapkit.constructor.__l &&
            (d.prototype.constructor.__l = window.mapkit.constructor.__l),
          (d.prototype.Libraries = l.Libraries),
          Object.defineProperty(d.prototype, "loadedLibraries", {
            get: function () {
              return l.loadedLibraries.slice();
            },
          }),
          (d.prototype.load = function (e) {
            l.load(e);
          }),
          l.addEventListener(l.Events.LOAD_ERROR, function (e) {
            var t = new o.Event("load-error");
            (t.libraries = e.libraryNames), m.dispatchEvent(t);
          }),
          f
            .concat([
              "maps",
              "filterIncludingAllCategories",
              "filterExcludingAllCategories",
            ])
            .forEach(function (e) {
              Object.defineProperty(d.prototype, e, {
                get: function () {
                  throw new Error(
                    "[MapKit] mapkit." +
                      e +
                      " is not available until the required library is loaded.",
                  );
                },
                configurable: !0,
                enumerable: !0,
              });
            }),
          l.addEventListener(l.Events.LOADEND, function (e) {
            var t = new o.Event("load");
            (t.libraries = e.libraryNames), m.dispatchEvent(t);
          }),
          u(v),
          n.state !== n.States.UNINITIALIZED &&
            (n.addEventListener(n.Events.Changed, p),
            n.addEventListener(n.Events.Error, p));
        var m = Object.create(d.prototype);
        e.exports = m;
      },
      8947: (e, t, r) => {
        var i = r(5869),
          n = r(7664);
        e.exports = function (e) {
          if (e) {
            var t = e.dataset.callback,
              r = e.dataset.language,
              o = e.dataset.libraries,
              a = e.dataset.initialToken,
              s = e.dataset.distUrl,
              l = e.dataset.proxyPrefix,
              c = {};
            if (t || r || o || a || s || l) {
              r && (c.language = r);
              var u,
                h = !1;
              if (
                (o &&
                  ((u = o.split(",").map(function (e) {
                    return e.replace(/^\s+(.+?)\s+$/, "$1");
                  })),
                  (c.libraries = u),
                  (h = !0)),
                a &&
                  (c.authorizationCallback = function (e) {
                    e(a);
                  }),
                s && (c._distUrl = s),
                l && (c._proxyPrefixes = [l]),
                i.init(c, !0),
                t)
              ) {
                if (!h)
                  return void setTimeout(function () {
                    "function" == typeof window[t] && window[t]();
                  });
                n.addEventListener(n.Events.LOADEND, function e(r) {
                  r.libraryNames.join(",") === u.join(",") &&
                    (n.removeEventListener(n.Events.LOADEND, e),
                    setTimeout(function () {
                      "function" == typeof window[t] && window[t]();
                    }));
                });
              }
              var d = function () {
                document.removeEventListener("DOMContentLoaded", d),
                  setTimeout(function () {
                    i.authorizationCallback === c.authorizationCallback &&
                      console.warn(
                        "[MapKit] MapKit was initialized with a static authorization token. authorizationCallback is needed to refresh authorization later.",
                      );
                  }, 5e3);
              };
              a &&
                ("loading" === document.readyState
                  ? document.addEventListener("DOMContentLoaded", d)
                  : d());
            }
          }
        };
      },
      6217: (e, t, r) => {
        var i = new (r(7748))({
          supportedLocales: r(2602),
          regionToScriptMap: r(6260),
          localesMap: r(3120),
        });
        e.exports = i;
      },
      7104: (e) => {
        function t() {
          this.loggers = [];
        }
        (t.prototype = {
          constructor: t,
          appendLogger: function (e) {
            this.loggers.push(e);
          },
          _invoke: function (e, t) {
            if (this.loggers.length)
              for (const r of this.loggers) r[e] && r[e].apply(r, t);
            else
              ("error" !== e && "warn" !== e) || console[e].apply(console, t);
          },
          error: function () {
            this._invoke("error", Array.from(arguments));
          },
          warn: function () {
            this._invoke("warn", Array.from(arguments));
          },
          log: function () {
            this._invoke("log", Array.from(arguments));
          },
          info: function () {
            this._invoke("info", Array.from(arguments));
          },
          debug: function () {
            this._invoke("debug", Array.from(arguments));
          },
        }),
          (t.sharedLogger = new t()),
          (e.exports = t);
      },
      2367: (e) => {
        e.exports.U = Symbol();
      },
      6814: (e, t, r) => {
        var i = r(3838),
          n = r(811);
        function o() {}
        (o.prototype = Object.create(i.EventTarget.prototype)),
          (o.prototype.dispatchEvent = function (e) {
            return n(i.EventTarget.prototype.dispatchEvent, this, [e], !0);
          });
        var a = { EventTarget: o, Event: i.Event };
        e.exports = a;
      },
      6426: (e, t, r) => {
        var i = r(3838),
          n = { EventTarget: i.EventTarget, Event: i.Event };
        e.exports = n;
      },
      7017: (e, t, r) => {
        var i = r(4891),
          n = r(5869),
          o = /^.*(?=\/mapkit([.a-z-]*)\.js)/;
        function a(e) {
          var t = o.exec(e.src);
          return t ? t[0] : null;
        }
        var s = {
          _baseUrl: void 0,
          _versionSuffix: "",
          scriptBaseUrl: void 0,
          createUrl: function (e, t) {
            if (void 0 === this._baseUrl) {
              if (n.state === n.States.UNINITIALIZED && !t) return void 0;
              n.distUrl
                ? ((this._baseUrl = n.distUrl),
                  (this._versionSuffix = "?mkjsVersion=" + i.cdnVersion))
                : i.useLocalResources
                ? (void 0 === this.scriptBaseUrl &&
                    this.findScriptAndSetBasePath(),
                  (this._baseUrl = this.scriptBaseUrl),
                  (this._versionSuffix = "?mkjsVersion=" + i.cdnVersion))
                : n.proxyPrefixes
                ? (this._baseUrl =
                    n.proxyPrefixes[0] +
                    [i.cdnBase, "mk", i.cdnVersion].join("/"))
                : (this._baseUrl = [
                    "https:" + i.cdnBase,
                    "mk",
                    i.cdnVersion,
                  ].join("/"));
            }
            return (
              (e = (e && e.replace(/^\//, "")) || ""),
              [this._baseUrl, e].join("/") + this._versionSuffix
            );
          },
          createImageUrl: function (e) {
            return this.createUrl("images/" + e);
          },
          findScriptAndSetBasePath: function () {
            if (document.currentScript) {
              var e = a(document.currentScript);
              if (e) return (s.scriptBaseUrl = e), document.currentScript;
            }
            for (var t = document.scripts, r = 0, i = t.length; r < i; ++r) {
              var n = a(t[r]);
              if (null !== n) return (this.scriptBaseUrl = n), t[r];
            }
            return null;
          },
        };
        i.useLocalResources &&
          "undefined" != typeof window &&
          void 0 !== window.document &&
          s.findScriptAndSetBasePath(),
          n.addEventListener(n.Events.Initialized, function () {
            (s._baseUrl = void 0), (s._versionSuffix = "");
          }),
          (e.exports = s);
      },
      7094: (e) => {
        e.exports = "-core";
      },
      4891: (e) => {
        "use strict";
        e.exports = JSON.parse(
          '{"version":"5.76.90","build":"23.40-401","cdnBase":"//cdn.apple-mapkit.com","cdnVersion":"5.76.90"}',
        );
      },
      3120: (e) => {
        "use strict";
        e.exports = JSON.parse(
          '{"en-AU":"en-GB","en-IE":"en-GB","en-IN":"en-GB","en-NZ":"en-GB","en-SG":"en-GB","en-ZA":"en-GB","es-LA":"es-MX","es-XL":"es-MX","nn-NO":"nb-NO","no-NO":"nb-NO","vi-VI":"vi-VN","iw":"he-IL"}',
        );
      },
      6260: (e) => {
        "use strict";
        e.exports = JSON.parse('{"zh":{"CN":"Hans","HK":"Hant","TW":"Hant"}}');
      },
      2602: (e) => {
        "use strict";
        e.exports = JSON.parse(
          '["ar","ca","cs","da","de","el","en","en-AU","en-GB","es","es-MX","es-US","fi","fr","fr-CA","he","hi","hr","hu","id","it","ja","ko","ms","nb","nl","pl","pt","pt-PT","ro","ru","sk","sv","th","tr","uk","vi","zh-Hans","zh-Hant","zh-HK"]',
        );
      },
    },
    i = {};
  function n(e) {
    var t = i[e];
    if (void 0 !== t) return t.exports;
    var o = (i[e] = { exports: {} });
    return r[e].call(o.exports, o, o.exports, n), o.exports;
  }
  (n.m = r),
    (n.d = (e, t) => {
      for (var r in t)
        n.o(t, r) &&
          !n.o(e, r) &&
          Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
    }),
    (n.f = {}),
    (n.e = (e) =>
      Promise.all(Object.keys(n.f).reduce((t, r) => (n.f[r](e, t), t), []))),
    (n.u = (e) =>
      479 === e
        ? "libs/mapkit.core.3f86cd.js"
        : 666 === e
        ? "libs/mapkit.core.6f6772.js"
        : 863 === e
        ? "libs/mapkit.core.62decf.js"
        : 106 === e
        ? "libs/mapkit.core.cc6ab2.js"
        : 233 === e
        ? "libs/mapkit.core.9c471b.js"
        : 993 === e
        ? "libs/mapkit.core.e43534.js"
        : 894 === e
        ? "libs/mapkit.core.services.ea1493.js"
        : 840 === e
        ? "libs/mapkit.core.376a44.js"
        : 90 === e
        ? "libs/mapkit.core.36fbd8.js"
        : 842 === e
        ? "libs/mapkit.core.map.e577c9.js"
        : 415 === e
        ? "libs/mapkit.core.97b600.js"
        : 559 === e
        ? "libs/mapkit.core.a674f2.js"
        : 574 === e
        ? "libs/mapkit.core.f54f0f.js"
        : 614 === e
        ? "libs/mapkit.core.9a16d7.js"
        : 343 === e
        ? "libs/mapkit.core.annotations.46bf87.js"
        : 15 === e
        ? "libs/mapkit.core.7aefdf.js"
        : 277 === e
        ? "libs/mapkit.core.overlays.5e3336.js"
        : 816 === e
        ? "libs/mapkit.core.user-location.30b97d.js"
        : 843 === e
        ? "libs/mapkit.core.full-map.40a73e.js"
        : 346 === e
        ? "libs/mapkit.core.geojson.4ce760.js"
        : 170 === e
        ? "libs/mapkit.core.legacy.9b08e2.js"
        : 208 === e
        ? "libs/mapkit.core.spi.418284.js"
        : 962 === e
        ? "libs/mapkit.core.spi-unhuj6.45330a.js"
        : 134 === e
        ? "libs/mapkit.core.spi-avdwqh.09e70c.js"
        : 319 === e
        ? "libs/mapkit.core.spi-drejcy.be57f7.js"
        : 411 === e
        ? "libs/mapkit.core.6b649d.js"
        : 101 === e
        ? "libs/mapkit.core.spi-7my8sd.a21aea.js"
        : 572 === e
        ? "libs/mapkit.core.8a1f3f.js"
        : void 0),
    (n.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
    (e = {}),
    (t = "mapkit:"),
    (n.l = (r, i, o, a) => {
      if (e[r]) e[r].push(i);
      else {
        var s, l;
        if (void 0 !== o)
          for (
            var c = document.getElementsByTagName("script"), u = 0;
            u < c.length;
            u++
          ) {
            var h = c[u];
            if (
              h.getAttribute("src") == r ||
              h.getAttribute("data-webpack") == t + o
            ) {
              s = h;
              break;
            }
          }
        s ||
          ((l = !0),
          ((s = document.createElement("script")).charset = "utf-8"),
          (s.timeout = 120),
          n.nc && s.setAttribute("nonce", n.nc),
          s.setAttribute("data-webpack", t + o),
          (s.src = r),
          (s.crossOrigin = n.c ? "use-credentials" : "anonymous")),
          (e[r] = [i]);
        var d = (t, i) => {
            (s.onerror = s.onload = null), clearTimeout(p);
            var n = e[r];
            if (
              (delete e[r],
              s.parentNode && s.parentNode.removeChild(s),
              n && n.forEach((e) => e(i)),
              t)
            )
              return t(i);
          },
          p = setTimeout(
            d.bind(null, void 0, { type: "timeout", target: s }),
            12e4,
          );
        (s.onerror = d.bind(null, s.onerror)),
          (s.onload = d.bind(null, s.onload)),
          l && document.head.appendChild(s);
      }
    }),
    (n.r = (e) => {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (n.p = ""),
    (() => {
      var e = { 179: 0 };
      n.f.j = (t, r) => {
        var i = n.o(e, t) ? e[t] : void 0;
        if (0 !== i)
          if (i) r.push(i[2]);
          else {
            var o = new Promise((r, n) => (i = e[t] = [r, n]));
            r.push((i[2] = o));
            var a = n.p(n.u(t)),
              s = new Error();
            n.l(
              a,
              (r) => {
                if (n.o(e, t) && (0 !== (i = e[t]) && (e[t] = void 0), i)) {
                  var o = r && ("load" === r.type ? "missing" : r.type),
                    a = r && r.target && r.target.src;
                  (s.message =
                    "Loading chunk " + t + " failed.\n(" + o + ": " + a + ")"),
                    (s.name = "ChunkLoadError"),
                    (s.type = o),
                    (s.request = a),
                    i[1](s);
                }
              },
              "chunk-" + t,
              t,
            );
          }
      };
      var t = (t, r) => {
        var i,
          o,
          [a, s, l] = r,
          c = 0;
        if (a.some((t) => 0 !== e[t])) {
          for (i in s) n.o(s, i) && (n.m[i] = s[i]);
          if (l) l(n);
        }
        for (t && t(r); c < a.length; c++)
          (o = a[c]), n.o(e, o) && e[o] && e[o][0](), (e[o] = 0);
      };
      self.mapkit = self.mapkit || { constructor: {} };
      var r = (self.mapkit.constructor.__l = self.mapkit.constructor.__l || []);
      r.forEach(t.bind(null, 0)), (r.push = t.bind(null, r.push.bind(r)));
    })(),
    (() => {
      n(2367).U;
      window.mapkit &&
        window.mapkit.init &&
        console.warn(
          "[MapKit] Mapkit namespace already exists; did you import MapKit more than once?",
        ),
        (window.mapkit = n(8717));
    })();
})();
//# sourceMappingURL=https://mw-ci1-mapkitjs.geo.apple.com/admin/source-maps/5.76.90/source-maps/mapkit.core.min.js.map
