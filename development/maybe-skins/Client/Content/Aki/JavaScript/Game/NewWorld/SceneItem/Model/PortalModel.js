"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PortalModel = void 0);
const ModelBase_1 = require("../../../../Core/Framework/ModelBase");
class PortalModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments), (this.Vnr = void 0);
	}
	OnInit() {
		return (this.Vnr = new Map()), !0;
	}
	AddPortalPair(e, r) {
		this.Vnr.has(e) || this.Vnr.set(e, r);
	}
	RemovePortalPair(e) {
		this.Vnr.delete(e);
	}
	GetPortal(e) {
		return this.Vnr.get(e);
	}
	OnClear() {
		return !(this.Vnr = void 0);
	}
}
exports.PortalModel = PortalModel;
