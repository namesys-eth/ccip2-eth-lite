/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./pages/_app.tsx":
/*!************************!*\
  !*** ./pages/_app.tsx ***!
  \************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.css */ \"./pages/index.css\");\n/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_index_css__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _rainbow_me_rainbowkit_styles_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @rainbow-me/rainbowkit/styles.css */ \"./node_modules/@rainbow-me/rainbowkit/dist/index.css\");\n/* harmony import */ var _rainbow_me_rainbowkit_styles_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_rainbow_me_rainbowkit_styles_css__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _rainbow_me_rainbowkit__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @rainbow-me/rainbowkit */ \"@rainbow-me/rainbowkit\");\n/* harmony import */ var wagmi_providers_alchemy__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! wagmi/providers/alchemy */ \"wagmi/providers/alchemy\");\n/* harmony import */ var wagmi_providers_public__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! wagmi/providers/public */ \"wagmi/providers/public\");\n/* harmony import */ var wagmi_chains__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! wagmi/chains */ \"wagmi/chains\");\n/* harmony import */ var wagmi__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! wagmi */ \"wagmi\");\n/* harmony import */ var react_device_detect__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-device-detect */ \"react-device-detect\");\n/* harmony import */ var react_device_detect__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_device_detect__WEBPACK_IMPORTED_MODULE_9__);\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_rainbow_me_rainbowkit__WEBPACK_IMPORTED_MODULE_4__, wagmi_providers_alchemy__WEBPACK_IMPORTED_MODULE_5__, wagmi_providers_public__WEBPACK_IMPORTED_MODULE_6__, wagmi_chains__WEBPACK_IMPORTED_MODULE_7__, wagmi__WEBPACK_IMPORTED_MODULE_8__]);\n([_rainbow_me_rainbowkit__WEBPACK_IMPORTED_MODULE_4__, wagmi_providers_alchemy__WEBPACK_IMPORTED_MODULE_5__, wagmi_providers_public__WEBPACK_IMPORTED_MODULE_6__, wagmi_chains__WEBPACK_IMPORTED_MODULE_7__, wagmi__WEBPACK_IMPORTED_MODULE_8__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\n\n\n\n\n\n\n\n\n\nlet rainbowFont = \"\";\nif (react_device_detect__WEBPACK_IMPORTED_MODULE_9__.isMobile) {\n    rainbowFont = \"Spotnik\";\n} else {\n    rainbowFont = \"Spotnik\";\n}\nconst customTheme = {\n    blurs: {\n        modalOverlay: \"\"\n    },\n    colors: {\n        accentColor: \"linear-gradient(112deg, rgba(190,95,65,1) 0%, rgba(191,41,36,1) 48%, rgba(203,111,0,1) 100%)\",\n        accentColorForeground: \"white\",\n        actionButtonBorder: \"white\",\n        actionButtonBorderMobile: \"white\",\n        actionButtonSecondaryBackground: \"linear-gradient(112deg, rgba(190,95,65,1) 0%, rgba(191,41,36,1) 48%, rgba(203,111,0,1) 100%)\",\n        closeButton: \"black\",\n        closeButtonBackground: \"linear-gradient(112deg, rgba(198,127,105,1) 0%, rgba(218,85,81,1) 48%, rgba(212,160,99,1) 100%)\",\n        connectButtonBackground: \"linear-gradient(112deg, rgba(190,95,65,1) 0%, rgba(191,41,36,1) 48%, rgba(203,111,0,1) 100%)\",\n        connectButtonBackgroundError: \"red\",\n        connectButtonInnerBackground: \"linear-gradient(153deg, rgba(190,95,65,1) 0%, rgba(152,33,30,1) 48%, rgba(203,111,0,1) 100%)\",\n        connectButtonText: \"white\",\n        connectButtonTextError: \"white\",\n        connectionIndicator: \"white\",\n        downloadBottomCardBackground: \"none\",\n        downloadTopCardBackground: \"none\",\n        error: \"red\",\n        generalBorder: \"rgb(255, 255, 255, 0.75)\",\n        generalBorderDim: \"rgb(255, 255, 255, 0.25)\",\n        menuItemBackground: \"linear-gradient(112deg, rgba(190,95,65,1) 0%, rgba(191,41,36,1) 48%, rgba(203,111,0,1) 100%)\",\n        modalBackdrop: \"none\",\n        modalBackground: \"linear-gradient(42deg, rgba(125,90,78,1) 0%, rgba(97,53,38,1) 100%)\",\n        modalBorder: \"white\",\n        modalText: \"white\",\n        modalTextDim: \"white\",\n        modalTextSecondary: \"white\",\n        profileAction: \"rgb(0, 0, 0, 0.5)\",\n        profileActionHover: \"linear-gradient(112deg, rgba(190,95,65,1) 0%, rgba(191,41,36,1) 48%, rgba(203,111,0,1) 100%)\",\n        profileForeground: \"rgb(0, 0, 0, 0.5)\",\n        selectedOptionBorder: \"white\",\n        standby: \"white\"\n    },\n    fonts: {\n        body: `${rainbowFont}`\n    },\n    radii: {\n        actionButton: \"4px\",\n        connectButton: \"6px\",\n        menuButton: \"6px\",\n        modal: \"6px\",\n        modalMobile: \"6px\"\n    },\n    shadows: {\n        connectButton: \"\",\n        dialog: \"\",\n        profileDetailsAction: \"\",\n        selectedOption: \"\",\n        selectedWallet: \"\",\n        walletLogo: \"\"\n    }\n};\nconst { chains, publicClient } = (0,wagmi__WEBPACK_IMPORTED_MODULE_8__.configureChains)([\n     true ? wagmi_chains__WEBPACK_IMPORTED_MODULE_7__.goerli : 0\n], [\n    (0,wagmi_providers_alchemy__WEBPACK_IMPORTED_MODULE_5__.alchemyProvider)({\n        apiKey: ( true ? \"UaFrPLamMm7GQFPc2-XRadQq7jU7uP9R\" : 0) || 0\n    }),\n    (0,wagmi_providers_public__WEBPACK_IMPORTED_MODULE_6__.publicProvider)()\n]);\nconst projectId = \"58107e13d36d52fd554cd1ece3258891\" || 0;\nconst { connectors } = (0,_rainbow_me_rainbowkit__WEBPACK_IMPORTED_MODULE_4__.getDefaultWallets)({\n    appName: \"NameSysLite\",\n    projectId,\n    chains\n});\nconst appInfo = {\n    appName: \"NameSys Lite Client\"\n};\nconst wagmiConfig = (0,wagmi__WEBPACK_IMPORTED_MODULE_8__.createConfig)({\n    autoConnect: true,\n    connectors,\n    publicClient\n});\nfunction MyApp({ Component, pageProps }) {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(wagmi__WEBPACK_IMPORTED_MODULE_8__.WagmiConfig, {\n        config: wagmiConfig,\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_rainbow_me_rainbowkit__WEBPACK_IMPORTED_MODULE_4__.RainbowKitProvider, {\n            modalSize: react_device_detect__WEBPACK_IMPORTED_MODULE_9__.isMobile ? \"compact\" : \"wide\",\n            appInfo: appInfo,\n            chains: chains,\n            theme: customTheme,\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                ...pageProps\n            }, void 0, false, {\n                fileName: \"/Users/sshmatrix/Idee/sshmatrix/Buidl/namesys-eth/ccip2-eth-lite/pages/_app.tsx\",\n                lineNumber: 121,\n                columnNumber: 11\n            }, this)\n        }, void 0, false, {\n            fileName: \"/Users/sshmatrix/Idee/sshmatrix/Buidl/namesys-eth/ccip2-eth-lite/pages/_app.tsx\",\n            lineNumber: 115,\n            columnNumber: 9\n        }, this)\n    }, void 0, false, {\n        fileName: \"/Users/sshmatrix/Idee/sshmatrix/Buidl/namesys-eth/ccip2-eth-lite/pages/_app.tsx\",\n        lineNumber: 114,\n        columnNumber: 7\n    }, this);\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyApp);\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fYXBwLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUF5QjtBQUNMO0FBQ3NCO0FBS1g7QUFJMEI7QUFDRjtBQUlsQztBQUM2QztBQUNwQjtBQUU5QyxJQUFJVyxjQUFjO0FBQ2xCLElBQUlELHlEQUFRQSxFQUFFO0lBQ1pDLGNBQWM7QUFDaEIsT0FBTztJQUNMQSxjQUFjO0FBQ2hCO0FBRUEsTUFBTUMsY0FBcUI7SUFDekJDLE9BQU87UUFDTEMsY0FBYztJQUNoQjtJQUNBQyxRQUFRO1FBQ05DLGFBQWE7UUFDYkMsdUJBQXVCO1FBQ3ZCQyxvQkFBb0I7UUFDcEJDLDBCQUEwQjtRQUMxQkMsaUNBQWlDO1FBQ2pDQyxhQUFhO1FBQ2JDLHVCQUF1QjtRQUN2QkMseUJBQXlCO1FBQ3pCQyw4QkFBOEI7UUFDOUJDLDhCQUE4QjtRQUM5QkMsbUJBQW1CO1FBQ25CQyx3QkFBd0I7UUFDeEJDLHFCQUFxQjtRQUNyQkMsOEJBQThCO1FBQzlCQywyQkFBMkI7UUFDM0JDLE9BQU87UUFDUEMsZUFBZTtRQUNmQyxrQkFBa0I7UUFDbEJDLG9CQUFvQjtRQUNwQkMsZUFBZTtRQUNmQyxpQkFBaUI7UUFDakJDLGFBQWE7UUFDYkMsV0FBVztRQUNYQyxjQUFjO1FBQ2RDLG9CQUFvQjtRQUNwQkMsZUFBZTtRQUNmQyxvQkFBb0I7UUFDcEJDLG1CQUFtQjtRQUNuQkMsc0JBQXNCO1FBQ3RCQyxTQUFTO0lBQ1g7SUFDQUMsT0FBTztRQUNMQyxNQUFNLENBQUMsRUFBRXBDLFlBQVksQ0FBQztJQUN4QjtJQUNBcUMsT0FBTztRQUNMQyxjQUFjO1FBQ2RDLGVBQWU7UUFDZkMsWUFBWTtRQUNaQyxPQUFPO1FBQ1BDLGFBQWE7SUFDZjtJQUNBQyxTQUFTO1FBQ1BKLGVBQWU7UUFDZkssUUFBUTtRQUNSQyxzQkFBc0I7UUFDdEJDLGdCQUFnQjtRQUNoQkMsZ0JBQWdCO1FBQ2hCQyxZQUFZO0lBQ2Q7QUFDRjtBQUVBLE1BQU0sRUFBRUMsTUFBTSxFQUFFQyxZQUFZLEVBQUUsR0FBR3RELHNEQUFlQSxDQUM5QztJQUNFdUQsS0FBb0MsR0FBV3hELGdEQUFNQSxHQUFHRCxDQUFPQTtDQUNoRSxFQUNEO0lBQ0VGLHdFQUFlQSxDQUFDO1FBQUU4RCxRQUFRLENBQUNILEtBQW9DLEdBQVdBLGtDQUF5QyxHQUFHQSxDQUEwQyxLQUFLO0lBQUU7SUFDdksxRCxzRUFBY0E7Q0FDZjtBQUdILE1BQU1nRSxZQUFZTixrQ0FBaUQsSUFBSTtBQUN2RSxNQUFNLEVBQUVRLFVBQVUsRUFBRSxHQUFHcEUseUVBQWlCQSxDQUFDO0lBQ3ZDcUUsU0FBUztJQUNUSDtJQUNBUjtBQUNGO0FBRUEsTUFBTVksVUFBVTtJQUNkRCxTQUFTO0FBQ1g7QUFFQSxNQUFNRSxjQUFjakUsbURBQVlBLENBQUM7SUFDL0JrRSxhQUFhO0lBQ2JKO0lBQ0FUO0FBQ0Y7QUFFQSxTQUFTYyxNQUFNLEVBQUVDLFNBQVMsRUFBRUMsU0FBUyxFQUFZO0lBRS9DLHFCQUNJLDhEQUFDcEUsOENBQVdBO1FBQUNxRSxRQUFRTDtrQkFDbkIsNEVBQUN4RSxzRUFBa0JBO1lBQ2pCOEUsV0FBV3JFLHlEQUFRQSxHQUFHLFlBQVk7WUFDbEM4RCxTQUFTQTtZQUNUWixRQUFRQTtZQUNSb0IsT0FBT3BFO3NCQUVQLDRFQUFDZ0U7Z0JBQVcsR0FBR0MsU0FBUzs7Ozs7Ozs7Ozs7Ozs7OztBQUlsQztBQUVBLGlFQUFlRixLQUFLQSxFQUFBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY2NpcDItZXRoLWxpdGUvLi9wYWdlcy9fYXBwLnRzeD8yZmJlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCAnLi9pbmRleC5jc3MnXG5pbXBvcnQgJ0ByYWluYm93LW1lL3JhaW5ib3draXQvc3R5bGVzLmNzcydcbmltcG9ydCB0eXBlIHsgQXBwUHJvcHMgfSBmcm9tICduZXh0L2FwcCdcbmltcG9ydCB7XG4gIFJhaW5ib3dLaXRQcm92aWRlcixcbiAgZ2V0RGVmYXVsdFdhbGxldHNcbn0gZnJvbSAnQHJhaW5ib3ctbWUvcmFpbmJvd2tpdCdcbmltcG9ydCB0eXBlIHtcbiAgVGhlbWVcbn0gZnJvbSAnQHJhaW5ib3ctbWUvcmFpbmJvd2tpdCdcbmltcG9ydCB7IGFsY2hlbXlQcm92aWRlciB9IGZyb20gJ3dhZ21pL3Byb3ZpZGVycy9hbGNoZW15J1xuaW1wb3J0IHsgcHVibGljUHJvdmlkZXIgfSBmcm9tICd3YWdtaS9wcm92aWRlcnMvcHVibGljJ1xuaW1wb3J0IHtcbiAgbWFpbm5ldCxcbiAgZ29lcmxpXG59IGZyb20gJ3dhZ21pL2NoYWlucydcbmltcG9ydCB7IGNvbmZpZ3VyZUNoYWlucywgY3JlYXRlQ29uZmlnLCBXYWdtaUNvbmZpZyB9IGZyb20gJ3dhZ21pJ1xuaW1wb3J0IHsgaXNNb2JpbGUgfSBmcm9tICdyZWFjdC1kZXZpY2UtZGV0ZWN0J1xuXG5sZXQgcmFpbmJvd0ZvbnQgPSAnJ1xuaWYgKGlzTW9iaWxlKSB7XG4gIHJhaW5ib3dGb250ID0gJ1Nwb3RuaWsnXG59IGVsc2Uge1xuICByYWluYm93Rm9udCA9ICdTcG90bmlrJ1xufVxuXG5jb25zdCBjdXN0b21UaGVtZTogVGhlbWUgPSB7XG4gIGJsdXJzOiB7XG4gICAgbW9kYWxPdmVybGF5OiAnJyxcbiAgfSxcbiAgY29sb3JzOiB7XG4gICAgYWNjZW50Q29sb3I6ICdsaW5lYXItZ3JhZGllbnQoMTEyZGVnLCByZ2JhKDE5MCw5NSw2NSwxKSAwJSwgcmdiYSgxOTEsNDEsMzYsMSkgNDglLCByZ2JhKDIwMywxMTEsMCwxKSAxMDAlKScsXG4gICAgYWNjZW50Q29sb3JGb3JlZ3JvdW5kOiAnd2hpdGUnLFxuICAgIGFjdGlvbkJ1dHRvbkJvcmRlcjogJ3doaXRlJyxcbiAgICBhY3Rpb25CdXR0b25Cb3JkZXJNb2JpbGU6ICd3aGl0ZScsXG4gICAgYWN0aW9uQnV0dG9uU2Vjb25kYXJ5QmFja2dyb3VuZDogJ2xpbmVhci1ncmFkaWVudCgxMTJkZWcsIHJnYmEoMTkwLDk1LDY1LDEpIDAlLCByZ2JhKDE5MSw0MSwzNiwxKSA0OCUsIHJnYmEoMjAzLDExMSwwLDEpIDEwMCUpJyxcbiAgICBjbG9zZUJ1dHRvbjogJ2JsYWNrJyxcbiAgICBjbG9zZUJ1dHRvbkJhY2tncm91bmQ6ICdsaW5lYXItZ3JhZGllbnQoMTEyZGVnLCByZ2JhKDE5OCwxMjcsMTA1LDEpIDAlLCByZ2JhKDIxOCw4NSw4MSwxKSA0OCUsIHJnYmEoMjEyLDE2MCw5OSwxKSAxMDAlKScsXG4gICAgY29ubmVjdEJ1dHRvbkJhY2tncm91bmQ6ICdsaW5lYXItZ3JhZGllbnQoMTEyZGVnLCByZ2JhKDE5MCw5NSw2NSwxKSAwJSwgcmdiYSgxOTEsNDEsMzYsMSkgNDglLCByZ2JhKDIwMywxMTEsMCwxKSAxMDAlKScsXG4gICAgY29ubmVjdEJ1dHRvbkJhY2tncm91bmRFcnJvcjogJ3JlZCcsXG4gICAgY29ubmVjdEJ1dHRvbklubmVyQmFja2dyb3VuZDogJ2xpbmVhci1ncmFkaWVudCgxNTNkZWcsIHJnYmEoMTkwLDk1LDY1LDEpIDAlLCByZ2JhKDE1MiwzMywzMCwxKSA0OCUsIHJnYmEoMjAzLDExMSwwLDEpIDEwMCUpJyxcbiAgICBjb25uZWN0QnV0dG9uVGV4dDogJ3doaXRlJyxcbiAgICBjb25uZWN0QnV0dG9uVGV4dEVycm9yOiAnd2hpdGUnLFxuICAgIGNvbm5lY3Rpb25JbmRpY2F0b3I6ICd3aGl0ZScsXG4gICAgZG93bmxvYWRCb3R0b21DYXJkQmFja2dyb3VuZDogJ25vbmUnLFxuICAgIGRvd25sb2FkVG9wQ2FyZEJhY2tncm91bmQ6ICdub25lJyxcbiAgICBlcnJvcjogJ3JlZCcsXG4gICAgZ2VuZXJhbEJvcmRlcjogJ3JnYigyNTUsIDI1NSwgMjU1LCAwLjc1KScsXG4gICAgZ2VuZXJhbEJvcmRlckRpbTogJ3JnYigyNTUsIDI1NSwgMjU1LCAwLjI1KScsXG4gICAgbWVudUl0ZW1CYWNrZ3JvdW5kOiAnbGluZWFyLWdyYWRpZW50KDExMmRlZywgcmdiYSgxOTAsOTUsNjUsMSkgMCUsIHJnYmEoMTkxLDQxLDM2LDEpIDQ4JSwgcmdiYSgyMDMsMTExLDAsMSkgMTAwJSknLFxuICAgIG1vZGFsQmFja2Ryb3A6ICdub25lJyxcbiAgICBtb2RhbEJhY2tncm91bmQ6ICdsaW5lYXItZ3JhZGllbnQoNDJkZWcsIHJnYmEoMTI1LDkwLDc4LDEpIDAlLCByZ2JhKDk3LDUzLDM4LDEpIDEwMCUpJyxcbiAgICBtb2RhbEJvcmRlcjogJ3doaXRlJyxcbiAgICBtb2RhbFRleHQ6ICd3aGl0ZScsXG4gICAgbW9kYWxUZXh0RGltOiAnd2hpdGUnLFxuICAgIG1vZGFsVGV4dFNlY29uZGFyeTogJ3doaXRlJyxcbiAgICBwcm9maWxlQWN0aW9uOiAncmdiKDAsIDAsIDAsIDAuNSknLFxuICAgIHByb2ZpbGVBY3Rpb25Ib3ZlcjogJ2xpbmVhci1ncmFkaWVudCgxMTJkZWcsIHJnYmEoMTkwLDk1LDY1LDEpIDAlLCByZ2JhKDE5MSw0MSwzNiwxKSA0OCUsIHJnYmEoMjAzLDExMSwwLDEpIDEwMCUpJyxcbiAgICBwcm9maWxlRm9yZWdyb3VuZDogJ3JnYigwLCAwLCAwLCAwLjUpJyxcbiAgICBzZWxlY3RlZE9wdGlvbkJvcmRlcjogJ3doaXRlJyxcbiAgICBzdGFuZGJ5OiAnd2hpdGUnLFxuICB9LFxuICBmb250czoge1xuICAgIGJvZHk6IGAke3JhaW5ib3dGb250fWAsXG4gIH0sXG4gIHJhZGlpOiB7XG4gICAgYWN0aW9uQnV0dG9uOiAnNHB4JyxcbiAgICBjb25uZWN0QnV0dG9uOiAnNnB4JyxcbiAgICBtZW51QnV0dG9uOiAnNnB4JyxcbiAgICBtb2RhbDogJzZweCcsXG4gICAgbW9kYWxNb2JpbGU6ICc2cHgnLFxuICB9LFxuICBzaGFkb3dzOiB7XG4gICAgY29ubmVjdEJ1dHRvbjogJycsXG4gICAgZGlhbG9nOiAnJyxcbiAgICBwcm9maWxlRGV0YWlsc0FjdGlvbjogJycsXG4gICAgc2VsZWN0ZWRPcHRpb246ICcnLFxuICAgIHNlbGVjdGVkV2FsbGV0OiAnJyxcbiAgICB3YWxsZXRMb2dvOiAnJyxcbiAgfVxufVxuXG5jb25zdCB7IGNoYWlucywgcHVibGljQ2xpZW50IH0gPSBjb25maWd1cmVDaGFpbnMoXG4gIFtcbiAgICBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19ORVRXT1JLID09PSAnZ29lcmxpJyA/IGdvZXJsaSA6IG1haW5uZXRcbiAgXSxcbiAgW1xuICAgIGFsY2hlbXlQcm92aWRlcih7IGFwaUtleTogKHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX05FVFdPUksgPT09ICdnb2VybGknID8gcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfQUxDSEVNWV9JRF9HT0VSTEkgOiBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19BTENIRU1ZX0lEX01BSU5ORVQpIHx8ICcnfSksXG4gICAgcHVibGljUHJvdmlkZXIoKVxuICBdXG4pXG5cbmNvbnN0IHByb2plY3RJZCA9IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX1dBTExFVF9DT05ORUNUX1BST0pFQ1RfSUQgfHwgJydcbmNvbnN0IHsgY29ubmVjdG9ycyB9ID0gZ2V0RGVmYXVsdFdhbGxldHMoe1xuICBhcHBOYW1lOiAnTmFtZVN5c0xpdGUnLFxuICBwcm9qZWN0SWQsXG4gIGNoYWlucyxcbn0pXG5cbmNvbnN0IGFwcEluZm8gPSB7XG4gIGFwcE5hbWU6ICdOYW1lU3lzIExpdGUgQ2xpZW50Jyxcbn1cblxuY29uc3Qgd2FnbWlDb25maWcgPSBjcmVhdGVDb25maWcoe1xuICBhdXRvQ29ubmVjdDogdHJ1ZSxcbiAgY29ubmVjdG9ycyxcbiAgcHVibGljQ2xpZW50XG59KVxuXG5mdW5jdGlvbiBNeUFwcCh7IENvbXBvbmVudCwgcGFnZVByb3BzIH06IEFwcFByb3BzKSB7XG5cbiAgcmV0dXJuIChcbiAgICAgIDxXYWdtaUNvbmZpZyBjb25maWc9e3dhZ21pQ29uZmlnfT5cbiAgICAgICAgPFJhaW5ib3dLaXRQcm92aWRlclxuICAgICAgICAgIG1vZGFsU2l6ZT17aXNNb2JpbGUgPyBcImNvbXBhY3RcIiA6IFwid2lkZVwifVxuICAgICAgICAgIGFwcEluZm89e2FwcEluZm99XG4gICAgICAgICAgY2hhaW5zPXtjaGFpbnN9XG4gICAgICAgICAgdGhlbWU9e2N1c3RvbVRoZW1lfVxuICAgICAgICA+ICBcbiAgICAgICAgICA8Q29tcG9uZW50IHsuLi5wYWdlUHJvcHN9IC8+XG4gICAgICAgIDwvUmFpbmJvd0tpdFByb3ZpZGVyPlxuICAgICAgPC9XYWdtaUNvbmZpZz5cbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBNeUFwcFxuIl0sIm5hbWVzIjpbIlJlYWN0IiwiUmFpbmJvd0tpdFByb3ZpZGVyIiwiZ2V0RGVmYXVsdFdhbGxldHMiLCJhbGNoZW15UHJvdmlkZXIiLCJwdWJsaWNQcm92aWRlciIsIm1haW5uZXQiLCJnb2VybGkiLCJjb25maWd1cmVDaGFpbnMiLCJjcmVhdGVDb25maWciLCJXYWdtaUNvbmZpZyIsImlzTW9iaWxlIiwicmFpbmJvd0ZvbnQiLCJjdXN0b21UaGVtZSIsImJsdXJzIiwibW9kYWxPdmVybGF5IiwiY29sb3JzIiwiYWNjZW50Q29sb3IiLCJhY2NlbnRDb2xvckZvcmVncm91bmQiLCJhY3Rpb25CdXR0b25Cb3JkZXIiLCJhY3Rpb25CdXR0b25Cb3JkZXJNb2JpbGUiLCJhY3Rpb25CdXR0b25TZWNvbmRhcnlCYWNrZ3JvdW5kIiwiY2xvc2VCdXR0b24iLCJjbG9zZUJ1dHRvbkJhY2tncm91bmQiLCJjb25uZWN0QnV0dG9uQmFja2dyb3VuZCIsImNvbm5lY3RCdXR0b25CYWNrZ3JvdW5kRXJyb3IiLCJjb25uZWN0QnV0dG9uSW5uZXJCYWNrZ3JvdW5kIiwiY29ubmVjdEJ1dHRvblRleHQiLCJjb25uZWN0QnV0dG9uVGV4dEVycm9yIiwiY29ubmVjdGlvbkluZGljYXRvciIsImRvd25sb2FkQm90dG9tQ2FyZEJhY2tncm91bmQiLCJkb3dubG9hZFRvcENhcmRCYWNrZ3JvdW5kIiwiZXJyb3IiLCJnZW5lcmFsQm9yZGVyIiwiZ2VuZXJhbEJvcmRlckRpbSIsIm1lbnVJdGVtQmFja2dyb3VuZCIsIm1vZGFsQmFja2Ryb3AiLCJtb2RhbEJhY2tncm91bmQiLCJtb2RhbEJvcmRlciIsIm1vZGFsVGV4dCIsIm1vZGFsVGV4dERpbSIsIm1vZGFsVGV4dFNlY29uZGFyeSIsInByb2ZpbGVBY3Rpb24iLCJwcm9maWxlQWN0aW9uSG92ZXIiLCJwcm9maWxlRm9yZWdyb3VuZCIsInNlbGVjdGVkT3B0aW9uQm9yZGVyIiwic3RhbmRieSIsImZvbnRzIiwiYm9keSIsInJhZGlpIiwiYWN0aW9uQnV0dG9uIiwiY29ubmVjdEJ1dHRvbiIsIm1lbnVCdXR0b24iLCJtb2RhbCIsIm1vZGFsTW9iaWxlIiwic2hhZG93cyIsImRpYWxvZyIsInByb2ZpbGVEZXRhaWxzQWN0aW9uIiwic2VsZWN0ZWRPcHRpb24iLCJzZWxlY3RlZFdhbGxldCIsIndhbGxldExvZ28iLCJjaGFpbnMiLCJwdWJsaWNDbGllbnQiLCJwcm9jZXNzIiwiZW52IiwiTkVYVF9QVUJMSUNfTkVUV09SSyIsImFwaUtleSIsIk5FWFRfUFVCTElDX0FMQ0hFTVlfSURfR09FUkxJIiwiTkVYVF9QVUJMSUNfQUxDSEVNWV9JRF9NQUlOTkVUIiwicHJvamVjdElkIiwiTkVYVF9QVUJMSUNfV0FMTEVUX0NPTk5FQ1RfUFJPSkVDVF9JRCIsImNvbm5lY3RvcnMiLCJhcHBOYW1lIiwiYXBwSW5mbyIsIndhZ21pQ29uZmlnIiwiYXV0b0Nvbm5lY3QiLCJNeUFwcCIsIkNvbXBvbmVudCIsInBhZ2VQcm9wcyIsImNvbmZpZyIsIm1vZGFsU2l6ZSIsInRoZW1lIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/_app.tsx\n");

/***/ }),

/***/ "./pages/index.css":
/*!*************************!*\
  !*** ./pages/index.css ***!
  \*************************/
/***/ (() => {



/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react-device-detect":
/*!**************************************!*\
  !*** external "react-device-detect" ***!
  \**************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react-device-detect");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "@rainbow-me/rainbowkit":
/*!*****************************************!*\
  !*** external "@rainbow-me/rainbowkit" ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@rainbow-me/rainbowkit");;

/***/ }),

/***/ "wagmi":
/*!************************!*\
  !*** external "wagmi" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = import("wagmi");;

/***/ }),

/***/ "wagmi/chains":
/*!*******************************!*\
  !*** external "wagmi/chains" ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = import("wagmi/chains");;

/***/ }),

/***/ "wagmi/providers/alchemy":
/*!******************************************!*\
  !*** external "wagmi/providers/alchemy" ***!
  \******************************************/
/***/ ((module) => {

"use strict";
module.exports = import("wagmi/providers/alchemy");;

/***/ }),

/***/ "wagmi/providers/public":
/*!*****************************************!*\
  !*** external "wagmi/providers/public" ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = import("wagmi/providers/public");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/@rainbow-me"], () => (__webpack_exec__("./pages/_app.tsx")));
module.exports = __webpack_exports__;

})();