"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.isUndefined =
		exports.isSymbol =
		exports.isString =
		exports.isPromise =
		exports.isObject =
		exports.isNumber =
		exports.isFunction =
		exports.isError =
		exports.isDate =
		exports.isBoolean =
		exports.isAsyncFunction =
		exports.isArray =
			void 0);
const checkType = (e) => (s) =>
		Object.prototype.toString.call(s).slice(8, -1).toLowerCase() ===
		e.toLowerCase(),
	isNumber = checkType("Number"),
	isArray = ((exports.isNumber = isNumber), checkType("Array")),
	isBoolean = ((exports.isArray = isArray), checkType("Boolean")),
	isAsyncFunction =
		((exports.isBoolean = isBoolean), checkType("AsyncFunction")),
	isPromise =
		((exports.isAsyncFunction = isAsyncFunction), checkType("Promise")),
	isObject = ((exports.isPromise = isPromise), checkType("Object")),
	isUndefined = ((exports.isObject = isObject), checkType("Undefined")),
	isString = ((exports.isUndefined = isUndefined), checkType("String")),
	isSymbol = ((exports.isString = isString), checkType("Symbol")),
	isDate = ((exports.isSymbol = isSymbol), checkType("Date")),
	isError = ((exports.isDate = isDate), checkType("Error")),
	isFunction = ((exports.isError = isError), (e) => "function" == typeof e);
exports.isFunction = isFunction;
