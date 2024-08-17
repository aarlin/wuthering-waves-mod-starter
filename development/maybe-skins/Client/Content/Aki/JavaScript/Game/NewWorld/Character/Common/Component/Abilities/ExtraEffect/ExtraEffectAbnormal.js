"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AbnormalDark =
		exports.AbnormalLight =
		exports.AbnormalWind =
		exports.AbnormalFire =
		exports.AbnormalIce =
		exports.AbnormalThunder =
			void 0);
const ActiveBuffConfigs_1 = require("../Buff/ActiveBuffConfigs"),
	CharacterAttributeTypes_1 = require("../CharacterAttributeTypes"),
	ExtraEffectBase_1 = require("./ExtraEffectBase");
class AbnormalThunder extends ExtraEffectBase_1.BuffEffect {
	constructor() {
		super(...arguments),
			(this.VKo = 0),
			(this.HKo = 0),
			(this.jKo = new Array()),
			(this.WKo = new Map());
	}
	InitParameters(e) {
		if (((this.jKo.length = 0), e.ExtraEffectParameters)) {
			for (const r of e.ExtraEffectParameters[0]?.split("|") ?? []) {
				var t = r.trim().split("#");
				this.jKo.push(t.map((e) => Number(e.trim())));
			}
			for (const t of e.ExtraEffectParameters[1]?.split("|") ?? []) {
				var r = t.trim().split("#");
				this.WKo.set(Number(r[0].trim()), BigInt(r[1].trim()));
			}
		}
	}
	OnPeriodCallback() {}
	OnExecute() {}
	OnCreated() {
		this.RefreshModifier(this.Buff?.StackCount ?? 0),
			this.RefreshCue(this.Buff?.StackCount ?? 0);
	}
	OnRemoved() {
		this.ClearModifier(), this.ClearCue();
	}
	OnStackIncreased(e, t, r) {
		this.RefreshModifier(e), this.RefreshCue(e);
	}
	OnStackDecreased(e, t, r) {
		this.RefreshModifier(e), this.RefreshCue(e);
	}
	ClearModifier() {
		var e = this.ExactOwnerEntity?.GetComponent(155);
		this.VKo &&
			(e?.RemoveModifier(
				CharacterAttributeTypes_1.EAttributeId.Proto_Atk,
				this.VKo,
			),
			(this.VKo = 0));
	}
	ClearCue() {
		var e = this.ExactOwnerEntity?.GetComponent(187);
		this.HKo && (e?.RemoveBuffByHandle(this.HKo), (this.HKo = 0));
	}
	RefreshModifier(e) {
		this.ClearModifier();
		var t = this.ExactOwnerEntity?.GetComponent(155);
		if (t) {
			let a = 0;
			for (let t = this.jKo.length - 1; 0 <= t; t--) {
				var [r, i] = this.jKo[t];
				if (r <= e) {
					a = i;
					break;
				}
			}
			this.VKo = t.AddModifier(
				CharacterAttributeTypes_1.EAttributeId.Proto_Atk,
				{
					Type: 2,
					Value1: a,
					Value2: 0,
					SourceAttributeId: CharacterAttributeTypes_1.EAttributeId.R4n,
					SourceCalculationType: 0,
					SourceEntity:
						this.Buff?.InstigatorId ?? ActiveBuffConfigs_1.NULL_INSTIGATOR_ID,
				},
			);
		}
	}
	RefreshCue(e) {
		this.ClearCue();
		var t = this.ExactOwnerEntity?.GetComponent(187);
		if (t) {
			let a;
			for (var [r, i] of this.WKo)
				if (e >= r) {
					a = i;
					break;
				}
			void 0 !== a &&
				(this.HKo = t.AddGameplayCue([a], -1, "AddByAbnormalThunder"));
		}
	}
}
exports.AbnormalThunder = AbnormalThunder;
class AbnormalIce extends ExtraEffectBase_1.BuffEffect {
	constructor() {
		super(...arguments), (this.VKo = 0), (this.KKo = new Array());
	}
	InitParameters(e) {
		if (((this.KKo.length = 0), e.ExtraEffectParameters))
			for (const r of e.ExtraEffectParameters[0]?.split("|") ?? []) {
				var t = r.trim().split("#");
				this.KKo.push(t.map((e) => Number(e.trim())));
			}
	}
	OnExecute() {}
	OnCreated() {
		this.RefreshModifier(this.Buff?.StackCount ?? 0);
	}
	OnRemoved() {
		this.ClearModifier();
	}
	OnStackIncreased(e, t, r) {
		this.RefreshModifier(e);
	}
	OnStackDecreased(e, t, r) {
		this.RefreshModifier(e);
	}
	ClearModifier() {
		var e = this.ExactOwnerEntity?.GetComponent(155);
		this.VKo &&
			(e?.RemoveModifier(CharacterAttributeTypes_1.EAttributeId.R4n, this.VKo),
			(this.VKo = 0));
	}
	RefreshModifier(e) {
		this.ClearModifier();
		var t = this.ExactOwnerEntity?.GetComponent(155);
		if (t) {
			let a = 0;
			for (let t = this.KKo.length - 1; 0 <= t; t--) {
				var [r, i] = this.KKo[t];
				if (r <= e) {
					a = i;
					break;
				}
			}
			this.VKo = t.AddModifier(CharacterAttributeTypes_1.EAttributeId.R4n, {
				Type: 2,
				Value1: a - CharacterAttributeTypes_1.PER_TEN_THOUSAND,
				Value2: 0,
				SourceAttributeId: CharacterAttributeTypes_1.EAttributeId.R4n,
				SourceCalculationType: 0,
				SourceEntity:
					this.Buff?.InstigatorId ?? ActiveBuffConfigs_1.NULL_INSTIGATOR_ID,
			});
		}
	}
}
exports.AbnormalIce = AbnormalIce;
class AbnormalFire extends ExtraEffectBase_1.BuffEffect {
	OnExecute() {}
	OnPeriodCallback() {}
}
exports.AbnormalFire = AbnormalFire;
class AbnormalWind extends ExtraEffectBase_1.BuffEffect {
	OnExecute() {}
	OnPeriodCallback() {}
}
exports.AbnormalWind = AbnormalWind;
class AbnormalLight extends ExtraEffectBase_1.BuffEffect {
	OnExecute() {}
	OnPeriodCallback() {}
}
exports.AbnormalLight = AbnormalLight;
class AbnormalDark extends ExtraEffectBase_1.BuffEffect {
	OnExecute() {}
	OnPeriodCallback() {}
}
exports.AbnormalDark = AbnormalDark;
