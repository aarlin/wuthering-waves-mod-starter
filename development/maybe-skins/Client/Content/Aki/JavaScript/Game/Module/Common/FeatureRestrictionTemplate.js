"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FeatureRestrictionTemplate = void 0);
const ConfigManager_1 = require("../../Manager/ConfigManager");
class FeatureRestrictionTemplate {
	constructor(t, e = 0) {
		(this.Yqn = 0),
			(this.Jqn = 0),
			(this.zqn = 2),
			(this.Zqn = 0),
			(this.zqn = t),
			(this.Zqn = e);
	}
	eGn(t) {
		this.Yqn = this.Yqn | t;
	}
	tGn(t, e) {
		return (t & e) === e;
	}
	iGn() {
		let t = 0;
		return (
			ConfigManager_1.ConfigManager.CommonConfig?.GetPioneerFlag() && (t |= 8),
			t
		);
	}
	rGn() {
		return 0;
	}
	Check() {
		switch (this.Zqn) {
			case 1:
				return !0;
			case 2:
				return !1;
		}
		switch (this.zqn) {
			case 0:
				return this.tGn(this.iGn(), this.Yqn);
			case 1:
				return this.tGn(this.rGn(), this.Jqn);
			case 2:
				return this.tGn(this.iGn(), this.Yqn) && this.tGn(this.rGn(), this.Jqn);
			default:
				return !1;
		}
	}
	static get TemplateForPioneerClient() {
		var t;
		return (
			FeatureRestrictionTemplate.oGn ||
			((t = new FeatureRestrictionTemplate(0)).eGn(8),
			(FeatureRestrictionTemplate.oGn = t))
		);
	}
}
(exports.FeatureRestrictionTemplate = FeatureRestrictionTemplate).oGn = void 0;
