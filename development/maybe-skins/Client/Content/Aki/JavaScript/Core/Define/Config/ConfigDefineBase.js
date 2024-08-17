"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.createTypeInfo = exports.ConfigBase = void 0);
class ConfigBase {
	constructor() {
		this.RowId = 0;
	}
}
function createTypeInfo(e, r, o, t, s) {
	const a = new Array(),
		n = new Array();
	return (
		t.forEach((e) => {
			e = { Name: e[0], Type: e[1] };
			a.push(e);
		}),
		s.forEach((e) => {
			e = { Name: e[0], Type: e[1] };
			n.push(e);
		}),
		{ Name: e, ExcelFileName: r, Ctor: o, ConfigKey: a, DeserializeKey: n }
	);
}
(exports.ConfigBase = ConfigBase), (exports.createTypeInfo = createTypeInfo);
//# sourceMappingURL=ConfigDefineBase.js.map
