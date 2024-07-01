"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TriggerVolumeModel = void 0);
const ModelBase_1 = require("../../../../Core/Framework/ModelBase");
class TriggerVolumeModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments), (this.$nr = void 0);
	}
	OnInit() {
		return (this.$nr = new Map()), !0;
	}
	AddTriggerVolume(e, r, t) {
		let o = this.$nr.get(e);
		o || ((o = new Map()), this.$nr.set(e, o)), o.set(r, t);
	}
	RemoveTriggerVolume(e, r) {
		(e = this.$nr.get(e)) && e.delete(r);
	}
	GetTriggerVolume(e, r) {
		if ((e = this.$nr.get(e))) return e.get(r);
	}
	OnClear() {
		return !(this.$nr = void 0);
	}
}
exports.TriggerVolumeModel = TriggerVolumeModel;
