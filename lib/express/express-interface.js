"use strict";
//#region --- Express Like interfaces
//        --- These allow us to write express compatible code without actually having to import express
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiMethod = void 0;
//#endregion
//#region --- Route Configuration
var ApiMethod;
(function (ApiMethod) {
    ApiMethod["GET"] = "get";
    ApiMethod["POST"] = "post";
})(ApiMethod || (exports.ApiMethod = ApiMethod = {}));
//#endregion
