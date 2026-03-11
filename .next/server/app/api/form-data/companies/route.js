"use strict";
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
exports.id = "app/api/form-data/companies/route";
exports.ids = ["app/api/form-data/companies/route"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "../../client/components/action-async-storage.external":
/*!*******************************************************************************!*\
  !*** external "next/dist/client/components/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/action-async-storage.external.js");

/***/ }),

/***/ "../../client/components/request-async-storage.external":
/*!********************************************************************************!*\
  !*** external "next/dist/client/components/request-async-storage.external.js" ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/request-async-storage.external.js");

/***/ }),

/***/ "../../client/components/static-generation-async-storage.external":
/*!******************************************************************************************!*\
  !*** external "next/dist/client/components/static-generation-async-storage.external.js" ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/static-generation-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "node:crypto":
/*!******************************!*\
  !*** external "node:crypto" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("node:crypto");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fform-data%2Fcompanies%2Froute&page=%2Fapi%2Fform-data%2Fcompanies%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fform-data%2Fcompanies%2Froute.ts&appDir=C%3A%5CUsers%5CUser%5CDocuments%5Ctrae_projects%5Codoo_18_new%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CUser%5CDocuments%5Ctrae_projects%5Codoo_18_new&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fform-data%2Fcompanies%2Froute&page=%2Fapi%2Fform-data%2Fcompanies%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fform-data%2Fcompanies%2Froute.ts&appDir=C%3A%5CUsers%5CUser%5CDocuments%5Ctrae_projects%5Codoo_18_new%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CUser%5CDocuments%5Ctrae_projects%5Codoo_18_new&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_User_Documents_trae_projects_odoo_18_new_src_app_api_form_data_companies_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/app/api/form-data/companies/route.ts */ \"(rsc)/./src/app/api/form-data/companies/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/form-data/companies/route\",\n        pathname: \"/api/form-data/companies\",\n        filename: \"route\",\n        bundlePath: \"app/api/form-data/companies/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\User\\\\Documents\\\\trae_projects\\\\odoo_18_new\\\\src\\\\app\\\\api\\\\form-data\\\\companies\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_User_Documents_trae_projects_odoo_18_new_src_app_api_form_data_companies_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/form-data/companies/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZmb3JtLWRhdGElMkZjb21wYW5pZXMlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmZvcm0tZGF0YSUyRmNvbXBhbmllcyUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmZvcm0tZGF0YSUyRmNvbXBhbmllcyUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNVc2VyJTVDRG9jdW1lbnRzJTVDdHJhZV9wcm9qZWN0cyU1Q29kb29fMThfbmV3JTVDc3JjJTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1DJTNBJTVDVXNlcnMlNUNVc2VyJTVDRG9jdW1lbnRzJTVDdHJhZV9wcm9qZWN0cyU1Q29kb29fMThfbmV3JmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBc0c7QUFDdkM7QUFDYztBQUNxRDtBQUNsSTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsZ0hBQW1CO0FBQzNDO0FBQ0EsY0FBYyx5RUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLGlFQUFpRTtBQUN6RTtBQUNBO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ3VIOztBQUV2SCIsInNvdXJjZXMiOlsid2VicGFjazovL29kb29fMThfbmV3Lz8wYTVkIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIkM6XFxcXFVzZXJzXFxcXFVzZXJcXFxcRG9jdW1lbnRzXFxcXHRyYWVfcHJvamVjdHNcXFxcb2Rvb18xOF9uZXdcXFxcc3JjXFxcXGFwcFxcXFxhcGlcXFxcZm9ybS1kYXRhXFxcXGNvbXBhbmllc1xcXFxyb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvZm9ybS1kYXRhL2NvbXBhbmllcy9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL2Zvcm0tZGF0YS9jb21wYW5pZXNcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2Zvcm0tZGF0YS9jb21wYW5pZXMvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJDOlxcXFxVc2Vyc1xcXFxVc2VyXFxcXERvY3VtZW50c1xcXFx0cmFlX3Byb2plY3RzXFxcXG9kb29fMThfbmV3XFxcXHNyY1xcXFxhcHBcXFxcYXBpXFxcXGZvcm0tZGF0YVxcXFxjb21wYW5pZXNcXFxccm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5jb25zdCBvcmlnaW5hbFBhdGhuYW1lID0gXCIvYXBpL2Zvcm0tZGF0YS9jb21wYW5pZXMvcm91dGVcIjtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgc2VydmVySG9va3MsXG4gICAgICAgIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgb3JpZ2luYWxQYXRobmFtZSwgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fform-data%2Fcompanies%2Froute&page=%2Fapi%2Fform-data%2Fcompanies%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fform-data%2Fcompanies%2Froute.ts&appDir=C%3A%5CUsers%5CUser%5CDocuments%5Ctrae_projects%5Codoo_18_new%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CUser%5CDocuments%5Ctrae_projects%5Codoo_18_new&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./src/app/api/form-data/companies/route.ts":
/*!**************************************************!*\
  !*** ./src/app/api/form-data/companies/route.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./src/lib/prisma.ts\");\n/* harmony import */ var iron_session__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! iron-session */ \"(rsc)/./node_modules/iron-session/dist/index.js\");\n/* harmony import */ var next_headers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/headers */ \"(rsc)/./node_modules/next/dist/api/headers.js\");\n/* harmony import */ var _lib_session__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/session */ \"(rsc)/./src/lib/session.ts\");\n\n\n\n\nasync function GET() {\n    const session = await (0,iron_session__WEBPACK_IMPORTED_MODULE_3__.getIronSession)((0,next_headers__WEBPACK_IMPORTED_MODULE_1__.cookies)(), _lib_session__WEBPACK_IMPORTED_MODULE_2__.sessionOptions);\n    if (!session.user) {\n        return new Response(JSON.stringify({\n            success: false,\n            message: \"Unauthorized\"\n        }), {\n            status: 401\n        });\n    }\n    const isAdmin = session.user.username === \"admin\";\n    try {\n        let companies;\n        if (isAdmin) {\n            // Admin gets all active companies\n            companies = await _lib_prisma__WEBPACK_IMPORTED_MODULE_0__.prisma.mst_company.findMany({\n                where: {\n                    Status: \"Active\"\n                },\n                orderBy: {\n                    Name: \"asc\"\n                }\n            });\n        } else {\n            // Non-admin gets only their allowed companies\n            if (session.user.companyIds && session.user.companyIds.length > 0) {\n                companies = await _lib_prisma__WEBPACK_IMPORTED_MODULE_0__.prisma.mst_company.findMany({\n                    where: {\n                        ID: {\n                            in: session.user.companyIds\n                        },\n                        Status: \"Active\"\n                    },\n                    orderBy: {\n                        Name: \"asc\"\n                    }\n                });\n            } else {\n                // If non-admin has no companies assigned, return an empty array\n                companies = [];\n            }\n        }\n        console.log(`[API /form-data/companies] isAdmin: ${isAdmin}, Companies found: ${companies.length}`);\n        return new Response(JSON.stringify({\n            success: true,\n            data: companies\n        }), {\n            status: 200\n        });\n    } catch (error) {\n        return new Response(JSON.stringify({\n            success: false,\n            message: error.message\n        }), {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvYXBwL2FwaS9mb3JtLWRhdGEvY29tcGFuaWVzL3JvdXRlLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQXNDO0FBQ1E7QUFDUDtBQUNRO0FBS3hDLGVBQWVJO0lBQ3BCLE1BQU1DLFVBQVUsTUFBTUosNERBQWNBLENBQWNDLHFEQUFPQSxJQUFJQyx3REFBY0E7SUFFM0UsSUFBSSxDQUFDRSxRQUFRQyxJQUFJLEVBQUU7UUFDakIsT0FBTyxJQUFJQyxTQUFTQyxLQUFLQyxTQUFTLENBQUM7WUFBRUMsU0FBUztZQUFPQyxTQUFTO1FBQWUsSUFBSTtZQUFFQyxRQUFRO1FBQUk7SUFDakc7SUFFQSxNQUFNQyxVQUFVUixRQUFRQyxJQUFJLENBQUNRLFFBQVEsS0FBSztJQUUxQyxJQUFJO1FBQ0YsSUFBSUM7UUFDSixJQUFJRixTQUFTO1lBQ1gsa0NBQWtDO1lBQ2xDRSxZQUFZLE1BQU1mLCtDQUFNQSxDQUFDZ0IsV0FBVyxDQUFDQyxRQUFRLENBQUM7Z0JBQzVDQyxPQUFPO29CQUFFQyxRQUFRO2dCQUFTO2dCQUMxQkMsU0FBUztvQkFBRUMsTUFBTTtnQkFBTTtZQUN6QjtRQUNGLE9BQU87WUFDTCw4Q0FBOEM7WUFDOUMsSUFBSWhCLFFBQVFDLElBQUksQ0FBQ2dCLFVBQVUsSUFBSWpCLFFBQVFDLElBQUksQ0FBQ2dCLFVBQVUsQ0FBQ0MsTUFBTSxHQUFHLEdBQUc7Z0JBQ2pFUixZQUFZLE1BQU1mLCtDQUFNQSxDQUFDZ0IsV0FBVyxDQUFDQyxRQUFRLENBQUM7b0JBQzVDQyxPQUFPO3dCQUNMTSxJQUFJOzRCQUFFQyxJQUFJcEIsUUFBUUMsSUFBSSxDQUFDZ0IsVUFBVTt3QkFBQzt3QkFDbENILFFBQVE7b0JBQ1Y7b0JBQ0FDLFNBQVM7d0JBQUVDLE1BQU07b0JBQU07Z0JBQ3pCO1lBQ0YsT0FBTztnQkFDTCxnRUFBZ0U7Z0JBQ2hFTixZQUFZLEVBQUU7WUFDaEI7UUFDRjtRQUVBVyxRQUFRQyxHQUFHLENBQUMsQ0FBQyxvQ0FBb0MsRUFBRWQsUUFBUSxtQkFBbUIsRUFBRUUsVUFBVVEsTUFBTSxDQUFDLENBQUM7UUFFbEcsT0FBTyxJQUFJaEIsU0FBU0MsS0FBS0MsU0FBUyxDQUFDO1lBQUVDLFNBQVM7WUFBTWtCLE1BQU1iO1FBQVUsSUFBSTtZQUFFSCxRQUFRO1FBQUk7SUFDeEYsRUFBRSxPQUFPaUIsT0FBWTtRQUNuQixPQUFPLElBQUl0QixTQUFTQyxLQUFLQyxTQUFTLENBQUM7WUFBRUMsU0FBUztZQUFPQyxTQUFTa0IsTUFBTWxCLE9BQU87UUFBQyxJQUFJO1lBQUVDLFFBQVE7UUFBSTtJQUNoRztBQUNGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb2Rvb18xOF9uZXcvLi9zcmMvYXBwL2FwaS9mb3JtLWRhdGEvY29tcGFuaWVzL3JvdXRlLnRzPzM4OTUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcHJpc21hIH0gZnJvbSBcIkAvbGliL3ByaXNtYVwiO1xuaW1wb3J0IHsgZ2V0SXJvblNlc3Npb24gfSBmcm9tIFwiaXJvbi1zZXNzaW9uXCI7XG5pbXBvcnQgeyBjb29raWVzIH0gZnJvbSBcIm5leHQvaGVhZGVyc1wiO1xuaW1wb3J0IHsgc2Vzc2lvbk9wdGlvbnMgfSBmcm9tIFwiQC9saWIvc2Vzc2lvblwiO1xuaW1wb3J0IHsgU2Vzc2lvbkRhdGEgfSBmcm9tIFwiQC90eXBlcy9pcm9uLXNlc3Npb25cIjtcblxuaW1wb3J0IHsgbXN0X2NvbXBhbnkgfSBmcm9tICdAcHJpc21hL2NsaWVudCc7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBHRVQoKSB7XG4gIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBnZXRJcm9uU2Vzc2lvbjxTZXNzaW9uRGF0YT4oY29va2llcygpLCBzZXNzaW9uT3B0aW9ucyk7XG5cbiAgaWYgKCFzZXNzaW9uLnVzZXIpIHtcbiAgICByZXR1cm4gbmV3IFJlc3BvbnNlKEpTT04uc3RyaW5naWZ5KHsgc3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6IFwiVW5hdXRob3JpemVkXCIgfSksIHsgc3RhdHVzOiA0MDEgfSk7XG4gIH1cblxuICBjb25zdCBpc0FkbWluID0gc2Vzc2lvbi51c2VyLnVzZXJuYW1lID09PSAnYWRtaW4nO1xuXG4gIHRyeSB7XG4gICAgbGV0IGNvbXBhbmllczogbXN0X2NvbXBhbnlbXTtcbiAgICBpZiAoaXNBZG1pbikge1xuICAgICAgLy8gQWRtaW4gZ2V0cyBhbGwgYWN0aXZlIGNvbXBhbmllc1xuICAgICAgY29tcGFuaWVzID0gYXdhaXQgcHJpc21hLm1zdF9jb21wYW55LmZpbmRNYW55KHtcbiAgICAgICAgd2hlcmU6IHsgU3RhdHVzOiBcIkFjdGl2ZVwiIH0sXG4gICAgICAgIG9yZGVyQnk6IHsgTmFtZTogXCJhc2NcIiB9LFxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIE5vbi1hZG1pbiBnZXRzIG9ubHkgdGhlaXIgYWxsb3dlZCBjb21wYW5pZXNcbiAgICAgIGlmIChzZXNzaW9uLnVzZXIuY29tcGFueUlkcyAmJiBzZXNzaW9uLnVzZXIuY29tcGFueUlkcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbXBhbmllcyA9IGF3YWl0IHByaXNtYS5tc3RfY29tcGFueS5maW5kTWFueSh7XG4gICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgIElEOiB7IGluOiBzZXNzaW9uLnVzZXIuY29tcGFueUlkcyB9LFxuICAgICAgICAgICAgU3RhdHVzOiBcIkFjdGl2ZVwiLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgb3JkZXJCeTogeyBOYW1lOiBcImFzY1wiIH0sXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gSWYgbm9uLWFkbWluIGhhcyBubyBjb21wYW5pZXMgYXNzaWduZWQsIHJldHVybiBhbiBlbXB0eSBhcnJheVxuICAgICAgICBjb21wYW5pZXMgPSBbXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zb2xlLmxvZyhgW0FQSSAvZm9ybS1kYXRhL2NvbXBhbmllc10gaXNBZG1pbjogJHtpc0FkbWlufSwgQ29tcGFuaWVzIGZvdW5kOiAke2NvbXBhbmllcy5sZW5ndGh9YCk7XG5cbiAgICByZXR1cm4gbmV3IFJlc3BvbnNlKEpTT04uc3RyaW5naWZ5KHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogY29tcGFuaWVzIH0pLCB7IHN0YXR1czogMjAwIH0pO1xuICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgcmV0dXJuIG5ldyBSZXNwb25zZShKU09OLnN0cmluZ2lmeSh7IHN1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiBlcnJvci5tZXNzYWdlIH0pLCB7IHN0YXR1czogNTAwIH0pO1xuICB9XG59XG4iXSwibmFtZXMiOlsicHJpc21hIiwiZ2V0SXJvblNlc3Npb24iLCJjb29raWVzIiwic2Vzc2lvbk9wdGlvbnMiLCJHRVQiLCJzZXNzaW9uIiwidXNlciIsIlJlc3BvbnNlIiwiSlNPTiIsInN0cmluZ2lmeSIsInN1Y2Nlc3MiLCJtZXNzYWdlIiwic3RhdHVzIiwiaXNBZG1pbiIsInVzZXJuYW1lIiwiY29tcGFuaWVzIiwibXN0X2NvbXBhbnkiLCJmaW5kTWFueSIsIndoZXJlIiwiU3RhdHVzIiwib3JkZXJCeSIsIk5hbWUiLCJjb21wYW55SWRzIiwibGVuZ3RoIiwiSUQiLCJpbiIsImNvbnNvbGUiLCJsb2ciLCJkYXRhIiwiZXJyb3IiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./src/app/api/form-data/companies/route.ts\n");

/***/ }),

/***/ "(rsc)/./src/lib/prisma.ts":
/*!***************************!*\
  !*** ./src/lib/prisma.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   prisma: () => (/* binding */ prisma)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst globalForPrisma = global;\nconst prisma = globalForPrisma.prisma || new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient({\n    log: [\n        \"query\"\n    ]\n});\nif (true) globalForPrisma.prisma = prisma;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvbGliL3ByaXNtYS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBOEM7QUFFOUMsTUFBTUMsa0JBQWtCQztBQUVqQixNQUFNQyxTQUNYRixnQkFBZ0JFLE1BQU0sSUFDdEIsSUFBSUgsd0RBQVlBLENBQUM7SUFDZkksS0FBSztRQUFDO0tBQVE7QUFDaEIsR0FBRztBQUVMLElBQUlDLElBQXFDLEVBQUVKLGdCQUFnQkUsTUFBTSxHQUFHQSIsInNvdXJjZXMiOlsid2VicGFjazovL29kb29fMThfbmV3Ly4vc3JjL2xpYi9wcmlzbWEudHM/MDFkNyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcmlzbWFDbGllbnQgfSBmcm9tIFwiQHByaXNtYS9jbGllbnRcIjtcblxuY29uc3QgZ2xvYmFsRm9yUHJpc21hID0gZ2xvYmFsIGFzIHVua25vd24gYXMgeyBwcmlzbWE6IFByaXNtYUNsaWVudCB9O1xuXG5leHBvcnQgY29uc3QgcHJpc21hID1cbiAgZ2xvYmFsRm9yUHJpc21hLnByaXNtYSB8fFxuICBuZXcgUHJpc21hQ2xpZW50KHtcbiAgICBsb2c6IFtcInF1ZXJ5XCJdLFxuICB9KTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgZ2xvYmFsRm9yUHJpc21hLnByaXNtYSA9IHByaXNtYTtcbiJdLCJuYW1lcyI6WyJQcmlzbWFDbGllbnQiLCJnbG9iYWxGb3JQcmlzbWEiLCJnbG9iYWwiLCJwcmlzbWEiLCJsb2ciLCJwcm9jZXNzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./src/lib/prisma.ts\n");

/***/ }),

/***/ "(rsc)/./src/lib/session.ts":
/*!****************************!*\
  !*** ./src/lib/session.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   sessionOptions: () => (/* binding */ sessionOptions)\n/* harmony export */ });\nconst sessionOptions = {\n    password: process.env.SECRET_COOKIE_PASSWORD,\n    cookieName: \"odoo_auth_session\",\n    cookieOptions: {\n        secure: \"development\" === \"production\"\n    }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvbGliL3Nlc3Npb24udHMiLCJtYXBwaW5ncyI6Ijs7OztBQUVPLE1BQU1BLGlCQUFpQztJQUM1Q0MsVUFBVUMsUUFBUUMsR0FBRyxDQUFDQyxzQkFBc0I7SUFDNUNDLFlBQVk7SUFDWkMsZUFBZTtRQUNiQyxRQUFRTCxrQkFBeUI7SUFDbkM7QUFDRixFQUFFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb2Rvb18xOF9uZXcvLi9zcmMvbGliL3Nlc3Npb24udHM/OGRmOSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTZXNzaW9uT3B0aW9ucyB9IGZyb20gXCJpcm9uLXNlc3Npb25cIjtcblxuZXhwb3J0IGNvbnN0IHNlc3Npb25PcHRpb25zOiBTZXNzaW9uT3B0aW9ucyA9IHtcbiAgcGFzc3dvcmQ6IHByb2Nlc3MuZW52LlNFQ1JFVF9DT09LSUVfUEFTU1dPUkQgYXMgc3RyaW5nLFxuICBjb29raWVOYW1lOiBcIm9kb29fYXV0aF9zZXNzaW9uXCIsXG4gIGNvb2tpZU9wdGlvbnM6IHtcbiAgICBzZWN1cmU6IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSBcInByb2R1Y3Rpb25cIixcbiAgfSxcbn07XG4iXSwibmFtZXMiOlsic2Vzc2lvbk9wdGlvbnMiLCJwYXNzd29yZCIsInByb2Nlc3MiLCJlbnYiLCJTRUNSRVRfQ09PS0lFX1BBU1NXT1JEIiwiY29va2llTmFtZSIsImNvb2tpZU9wdGlvbnMiLCJzZWN1cmUiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./src/lib/session.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/iron-webcrypto","vendor-chunks/iron-session","vendor-chunks/cookie","vendor-chunks/uncrypto"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fform-data%2Fcompanies%2Froute&page=%2Fapi%2Fform-data%2Fcompanies%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fform-data%2Fcompanies%2Froute.ts&appDir=C%3A%5CUsers%5CUser%5CDocuments%5Ctrae_projects%5Codoo_18_new%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CUser%5CDocuments%5Ctrae_projects%5Codoo_18_new&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();