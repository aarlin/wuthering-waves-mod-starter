"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelGeneralModel = void 0);
const Log_1 = require("../../Core/Common/Log"),
	ActionTypeByType_1 = require("../../Core/Define/ConfigQuery/ActionTypeByType"),
	ModelBase_1 = require("../../Core/Framework/ModelBase"),
	IUtil_1 = require("../../UniverseEditor/Interface/IUtil"),
	GuaranteeActionCenter_1 = require("./Guarantee/GuaranteeActionCenter"),
	LevelConditionCenter_1 = require("./LevelConditions/LevelConditionCenter"),
	LevelEventCenter_1 = require("./LevelEvents/LevelEventCenter");
class LevelGeneralModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.CreatureGenAddTagList = void 0),
			(this.ActionTypeMap = void 0),
			(this.InteractionDebug = !1),
			(this.WUe = void 0),
			(this.KUe = void 0);
	}
	OnInit() {
		return (
			(this.CreatureGenAddTagList = new Map()),
			(this.ActionTypeMap = new Map()),
			(this.InteractionDebug = !1),
			(this.WUe = new Map()),
			(this.KUe = new Array()),
			LevelEventCenter_1.LevelEventCenter.RegistEvents(),
			LevelConditionCenter_1.LevelConditionCenter.RegistConditions(),
			GuaranteeActionCenter_1.GuaranteeActionCenter.RegGuaranteeActions(),
			!0
		);
	}
	OnClear() {
		return (
			(this.CreatureGenAddTagList = void 0),
			(this.InteractionDebug = !1),
			(this.WUe = void 0),
			!(this.KUe = void 0)
		);
	}
	GetActionTypeConfig(e) {
		var t = this.ActionTypeMap.get(e);
		return (
			t ||
			((t = ActionTypeByType_1.configActionTypeByType.GetConfig(e))
				? (this.ActionTypeMap.set(e, t), t)
				: void (
						Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"LevelEvent",
							7,
							"行为类型不存在，请检查行为类型表配置",
							["ActionType", e],
						)
					))
		);
	}
	AddTreeGuaranteeActionInfo(e, t) {
		this.WUe.has(e) || this.WUe.set(e, []), this.WUe.get(e).push(t);
	}
	PopTreeGuaranteeActionInfo(e, t) {
		var n = this.WUe.get(e);
		if (n)
			for (let i = n.length - 1; 0 <= i; i--) {
				var r = n[i];
				if (r.Name === t.Name && (0, IUtil_1.deepEquals)(r, t))
					return n.splice(i, 1), 0 === n.length && this.WUe.delete(e), r;
			}
	}
	HasTreeGuaranteeActionInfo(e, t, n) {
		return (
			0 !== n &&
			!!(e = this.WUe.get(e)) &&
			e.some((e) =>
				1 === n
					? e.Name === t.Name
					: e.Name === t.Name && (0, IUtil_1.deepEquals)(e, t),
			)
		);
	}
	RemoveTreeGuaranteeActionInfos(e) {
		var t = this.WUe.get(e);
		if ((this.WUe.delete(e), t)) return t;
	}
	ClearTreeGuaranteeActionInfosMap() {
		this.WUe.clear();
	}
	AddSceneGuaranteeActionInfo(e) {
		this.KUe.push(e);
	}
	PopSceneGuaranteeActionInfo(e) {
		var t = this.KUe;
		for (let r = t.length - 1; 0 <= r; r--) {
			var n = t[r];
			if (n.Name === e.Name && (0, IUtil_1.deepEquals)(n, e))
				return t.splice(r, 1), n;
		}
	}
	HasSceneGuaranteeActionInfo(e, t) {
		return (
			0 !== t &&
			this.KUe.some((n) =>
				1 === t
					? n.Name === e.Name
					: n.Name === e.Name && (0, IUtil_1.deepEquals)(n, e),
			)
		);
	}
	RemoveSceneGuaranteeActionInfos() {
		var e = this.KUe;
		return (this.KUe = new Array()), e;
	}
}
exports.LevelGeneralModel = LevelGeneralModel;
