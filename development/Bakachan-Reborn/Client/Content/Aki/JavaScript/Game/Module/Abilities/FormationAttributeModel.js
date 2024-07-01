"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FormationAttributeModel = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	Time_1 = require("../../../Core/Common/Time"),
	CommonDefine_1 = require("../../../Core/Define/CommonDefine"),
	FormationPropertyAll_1 = require("../../../Core/Define/ConfigQuery/FormationPropertyAll"),
	FormationPropertyById_1 = require("../../../Core/Define/ConfigQuery/FormationPropertyById"),
	ModelBase_1 = require("../../../Core/Framework/ModelBase"),
	GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils"),
	FormationAttributeController_1 = require("./FormationAttributeController");
class FormationAttributeModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.pK = new Map()),
			(this.zBe = new Map()),
			(this.BoundsLockerMap = new Map());
	}
	GetConfig(e) {
		var t,
			r = this.pK.get(e);
		return (
			r ||
				((r = {
					RawConfig: (t =
						FormationPropertyById_1.configFormationPropertyById.GetConfig(e)),
					ForbidIncreaseTags: (t.MarkTag ?? []).map((e) =>
						GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e),
					),
					ForbidDecreaseTags: (t.ResistTag ?? []).map((e) =>
						GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e),
					),
				}),
				this.pK.set(e, r)),
			r
		);
	}
	OnInit() {
		var e = Time_1.Time.WorldTime;
		for (const t of FormationPropertyAll_1.configFormationPropertyAll.GetConfigList())
			this.zBe.set(t.Id, {
				Max: t.InitMax,
				BaseMax: t.InitMax,
				Value: t.InitValue,
				Speed: t.InitRecoveryRate,
				BaseSpeed: t.InitRecoveryRate,
				Timestamp: e,
			});
		return !0;
	}
	OnClear() {
		return this.pK.clear(), this.zBe.clear(), !0;
	}
	GetValue(e) {
		var t,
			r,
			a = this.GetData(e);
		return a
			? ((r = this.GetPredictedServerStopTime() - a.Timestamp),
				0 === (t = a.Speed) || r <= 0
					? a.Value
					: ((r = r * CommonDefine_1.SECOND_PER_MILLIONSECOND * t),
						this.ClampValue(e, a.Value + r, 0, a.Max)))
			: 0;
	}
	GetMax(e) {
		return this.GetData(e)?.Max ?? 0;
	}
	GetBaseMax(e) {
		return this.GetData(e)?.BaseMax ?? 0;
	}
	GetBaseRate(e) {
		return this.GetData(e)?.BaseSpeed ?? 0;
	}
	GetSpeed(e) {
		return this.GetData(e)?.Speed ?? 0;
	}
	GetData(e) {
		var t = this.zBe.get(e);
		if (t) return t;
		Log_1.Log.CheckError() &&
			Log_1.Log.Error("CombatInfo", 20, "尝试读取不存在的队伍属性。", [
				"typeId",
				e,
			]);
	}
	SetData(e, t, r, a, o, i) {
		(e = this.GetData(e)) &&
			((e.Max = t),
			(e.BaseMax = r),
			(e.Value = a),
			(e.Speed = o),
			(e.Timestamp = i));
	}
	SetSpeed(e, t) {
		var r = this.GetData(e);
		r &&
			((e = this.GetValue(e)),
			(r.Timestamp = this.GetPredictedServerStopTime()),
			(r.Value = e),
			(r.Speed = t));
	}
	SetValue(e, t) {
		var r = this.GetData(e);
		r &&
			((r.Timestamp = this.GetPredictedServerStopTime()),
			(r.Value = this.ClampValue(e, t, 0, r.Max)));
	}
	SetMax(e, t) {
		var r = this.zBe.get(e);
		r &&
			((e = this.GetValue(e)),
			(r.Timestamp = this.GetPredictedServerStopTime()),
			(r.Value = Math.min(e, t)),
			(r.Max = t));
	}
	ClampValue(e, t, r, a) {
		let o = t,
			i = r,
			s = a;
		var n;
		if ((t = this.BoundsLockerMap.get(e)))
			for (const e of t.values())
				e.LockLowerBounds &&
					((n = e.LowerPercent * a + e.LowerOffset), (i = Math.max(i ?? n, n))),
					e.LockUpperBounds &&
						((n = e.UpperPercent * a + e.UpperOffset),
						(s = Math.min(s ?? n, n)));
		return (
			void 0 !== s && (o = Math.min(s, o)), void 0 !== i ? Math.max(i, o) : o
		);
	}
	AddBoundsLocker(e, t, r) {
		this.SetValue(e, this.GetValue(e));
		let a = this.BoundsLockerMap.get(e);
		return (
			a || this.BoundsLockerMap.set(e, (a = new Map())),
			a.has(r) &&
				Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Battle",
					20,
					"重复添加队伍属性锁",
					["attrId", e],
					["handle", r],
				),
			a.set(r, t),
			this.SetValue(e, this.GetValue(e)),
			r
		);
	}
	RemoveBoundsLocker(e, t) {
		this.SetValue(e, this.GetValue(e));
		var r = this.BoundsLockerMap.get(e);
		return !(!r || !r.delete(t) || (this.SetValue(e, this.GetValue(e)), 0));
	}
	GetPredictedServerStopTime() {
		return Number(
			FormationAttributeController_1.FormationAttributeController.GetPredictedServerStopTime(),
		);
	}
}
exports.FormationAttributeModel = FormationAttributeModel;
