"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.DamageViewData = void 0);
const UE = require("ue"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils");
class DamageViewData {
	constructor() {
		(this.Mne = 0),
			(this.e2t = void 0),
			(this.t2t = 0),
			(this.i2t = 0),
			(this.o2t = 0),
			(this.r2t = 0),
			(this.n2t = void 0),
			(this.s2t = void 0),
			(this.a2t = void 0),
			(this.h2t = void 0),
			(this.l2t = "");
	}
	Initialize(t) {
		(this.Mne = t.Id),
			(this.e2t = t),
			(this.l2t = t.CritNiagaraPath),
			(this.t2t = t.MinDeviationX),
			(this.i2t = t.MinDeviationY),
			(this.o2t = t.MaxDeviationX),
			(this.r2t = t.MaxDeviationX),
			(this.n2t = UE.Color.FromHex(t.TextColor)),
			(this.s2t = UE.Color.FromHex(t.CritTextColor)),
			(this.a2t = UE.Color.FromHex(t.StrokeColor)),
			(this.h2t = UE.Color.FromHex(t.CritStrokeColor));
	}
	GetConfigId() {
		return this.Mne;
	}
	GetRandomOffsetX() {
		return MathUtils_1.MathUtils.GetRandomFloatNumber(this.t2t, this.o2t);
	}
	GetRandomOffsetY() {
		return MathUtils_1.MathUtils.GetRandomFloatNumber(this.i2t, this.r2t);
	}
	GetTextColor() {
		return this.n2t;
	}
	GetCriticalTextColor() {
		return this.s2t;
	}
	GetStrokeColor() {
		return this.a2t;
	}
	GetCriticalStrokeColor() {
		return this.h2t;
	}
	GetCriticalNiagaraPath() {
		return this.l2t;
	}
	GetSequencePath(t, e, i) {
		return i
			? this.e2t.DamageTextSequence
			: t
				? e
					? this.e2t.OwnCriticalDamageSequence
					: this.e2t.OwnDamageSequence
				: e
					? this.e2t.MonsterCriticalDamageSequence
					: this.e2t.MonsterDamageSequence;
	}
}
exports.DamageViewData = DamageViewData;
