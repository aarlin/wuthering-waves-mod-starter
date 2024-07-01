"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SelectablePropItemProxy = void 0);
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
class SelectablePropItemProxy extends GridProxyAbstract_1.GridProxyAbstract {
	InstanceOfSelectableProp(e) {
		return !0 === e.IsSelectableProp;
	}
}
exports.SelectablePropItemProxy = SelectablePropItemProxy;
