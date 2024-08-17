"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GameplayCueMagnitude = void 0);
const Log_1 = require("../../../../../../../Core/Common/Log"),
	GameplayTagUtils_1 = require("../../../../../../../Core/Utils/GameplayTagUtils"),
	MathUtils_1 = require("../../../../../../../Core/Utils/MathUtils"),
	CharacterAttributeTypes_1 = require("../CharacterAttributeTypes"),
	GameplayCueBase_1 = require("./GameplayCueBase");
class GameplayCueMagnitude extends GameplayCueBase_1.GameplayCueBase {
	constructor() {
		super(...arguments),
			(this.ZXo = !1),
			(this.e$o = void 0),
			(this.$te = void 0),
			(this.Xte = void 0),
			(this.elt = void 0),
			(this.t$o = void 0),
			(this.one = 0),
			(this.rne = 0),
			(this.Xe = 0),
			(this.i$o = 0),
			(this.mEo = (t, e, i) => {
				t === this.t$o ? (this.rne = e) : (this.Xe = e), this.o$o(this.Xe);
			}),
			(this.r$o = (t) => {
				this.o$o(t);
			});
	}
	OnInit() {
		var t = this.Entity;
		(this.$te = t.CheckGetComponent(156)),
			(this.elt = t.CheckGetComponent(157)),
			(this.Xte = t.CheckGetComponent(185)),
			(this.one = this.CueConfig.Min),
			(this.rne = this.CueConfig.Max);
	}
	OnTick(t) {
		super.OnTick(t),
			this.i$o && ((t = this.n$o()), this.o$o(t, !1), t || (this.i$o = 0));
	}
	OnCreate() {
		this.UseMagnitude() && (this.ZXo = this.s$o());
	}
	OnDestroy() {
		this.ZXo && this.a$o();
	}
	OnSetMagnitude(t) {}
	UseMagnitude() {
		return 0 !== this.CueConfig.Magni && !this.IsInstant;
	}
	s$o() {
		let t = 0;
		switch (this.CueConfig.Magni) {
			case 1:
				if (!this.Ii(this.CueConfig.AttrId, "属性Id没填！")) return !1;
				(this.t$o = CharacterAttributeTypes_1.attributeIdsWithMax.get(
					this.CueConfig.AttrId,
				)),
					this.CueConfig.bListenAttr &&
						(this.$te.AddListener(
							this.CueConfig.AttrId,
							this.mEo,
							"GameplayCueMagnitude",
						),
						this.t$o) &&
						this.$te.AddListener(this.t$o, this.mEo, "GameplayCueMagnitudeMax"),
					(t = this.$te.GetCurrentValue(this.CueConfig.AttrId)),
					this.t$o && (this.rne = this.$te.GetCurrentValue(this.t$o));
				break;
			case 2:
				if (!this.Ii(this.CueConfig.Tag, "Tag没填！")) return !1;
				var e = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(
					this.CueConfig.Tag,
				);
				this.CueConfig.bListenAttr &&
					(this.e$o = this.Xte.ListenForTagAnyCountChanged(e, this.r$o)),
					(t = this.Xte.GetTagCountById(e));
				break;
			case 3:
				t = this.elt.GetBuffByHandle(this.ActiveHandleId)?.Level ?? 1;
				break;
			case 4:
				this.CueConfig.bListenAttr && (this.i$o = this.ActiveHandleId),
					(t = this.n$o());
				break;
			default:
				return !1;
		}
		return this.o$o(t);
	}
	a$o() {
		switch (this.CueConfig.Magni) {
			case 1:
				this.CueConfig.bListenAttr &&
					(this.$te.RemoveListener(this.CueConfig.AttrId, this.mEo),
					this.t$o) &&
					this.$te.RemoveListener(this.t$o, this.mEo);
				break;
			case 2:
				this.CueConfig.bListenAttr &&
					this.e$o &&
					(this.e$o.EndTask(), (this.e$o = void 0));
				break;
			case 3:
				break;
			case 4:
				this.CueConfig.bListenAttr && (this.i$o = 0);
		}
	}
	o$o(t, e = !0) {
		return (
			!!this.Ii(this.rne >= this.one, "Buff特效表Min>Max！有问题") &&
			((this.Xe = t),
			(t = this.h$o()),
			e &&
				Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"Battle",
					29,
					"Buff特效幅度",
					["HandleID", this.ActiveHandleId],
					["BuffId", this.BuffId],
					["CueId:", this.CueConfig.Id],
					["EntityId", this.Entity.Id],
					["Value", t],
				),
			this.OnSetMagnitude(t),
			!0)
		);
	}
	h$o() {
		return this.one === this.rne
			? 0
			: (MathUtils_1.MathUtils.Clamp(this.Xe, this.one, this.rne) - this.one) /
					(this.rne - this.one);
	}
	Ii(t, e) {
		return (
			!!t ||
			(Log_1.Log.CheckError() &&
				Log_1.Log.Error("Battle", 29, e, ["CueId:", this.CueConfig.Id]),
			!1)
		);
	}
	n$o() {
		var t =
				this.elt.GetBuffByHandle(this.ActiveHandleId)?.GetRemainDuration() ?? 0,
			e = this.elt.GetBuffByHandle(this.ActiveHandleId)?.Duration ?? 1;
		return 0 < e ? t / e : 0;
	}
}
exports.GameplayCueMagnitude = GameplayCueMagnitude;
