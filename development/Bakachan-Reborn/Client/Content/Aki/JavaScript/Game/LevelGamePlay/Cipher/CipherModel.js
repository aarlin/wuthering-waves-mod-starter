"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CipherModel = void 0);
const UE = require("ue"),
	CipherGameplayById_1 = require("../../../Core/Define/ConfigQuery/CipherGameplayById"),
	ModelBase_1 = require("../../../Core/Framework/ModelBase"),
	LEN = 4,
	INVLID = -1;
class CipherModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.Pye = ""),
			(this.xye = void 0),
			(this.wye = void 0),
			(this.Bye = void 0);
	}
	InitCipherConfig(e) {
		if (((this.Pye = e), this.GetCipherConfig(e))) {
			this.xye || (this.xye = new Array()),
				this.wye || (this.wye = new Array()),
				this.Bye || (this.Bye = new Map()),
				(this.xye.length = 0),
				(this.wye.length = 0),
				this.Bye.clear();
			var t = this.GetCipherConfig(e).Password.toString().padStart(4, "0");
			for (let e = 0; e < 4; e++) {
				var i = UE.KismetStringLibrary.Conv_StringToInt(t[e]);
				this.xye.push(i), this.wye.push(-1), this.Bye.set(i, !1);
			}
		}
	}
	GetCipherConfig(e) {
		return CipherGameplayById_1.configCipherGameplayById.GetConfig(e);
	}
	IsPasswordCorrect() {
		for (let e = 0; e < 4; e++) this.Bye.set(e, this.xye[e] === this.wye[e]);
		for (let e = 0; e < 4; e++) if (!this.Bye.get(e)) return !1;
		return !0;
	}
	GetCheckResultByIndex(e) {
		return this.Bye.get(e) ?? !1;
	}
	SetCurPassword(e, t) {
		e >= this.wye.length || (this.wye[e] = t);
	}
	GetCipherConfigId() {
		return this.Pye;
	}
}
exports.CipherModel = CipherModel;
