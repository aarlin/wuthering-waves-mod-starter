"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.InfoDisplayModel = void 0);
const ModelBase_1 = require("../../../../Core/Framework/ModelBase"),
	TimeOfDayDefine_1 = require("../../TimeOfDay/TimeOfDayDefine");
class InfoDisplayModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments), (this.kni = 0), (this.Fni = "");
	}
	CurrentInformationId() {
		return this.kni;
	}
	SetCurrentOpenInformationId(e) {
		this.kni = e;
	}
	CurrentCurrentInformationTexture() {
		return this.Fni;
	}
	SetCurrentOpenInformationTexture(e) {
		this.Fni = e;
	}
	static ConvertToHourMinuteString(e) {
		var r = Math.floor(e / TimeOfDayDefine_1.TOD_SECOND_PER_MINUTE);
		e = Math.floor(e - r * TimeOfDayDefine_1.TOD_SECOND_PER_MINUTE);
		return ("0" + r).slice(-2) + ":" + ("0" + e).slice(-2);
	}
}
exports.InfoDisplayModel = InfoDisplayModel;
