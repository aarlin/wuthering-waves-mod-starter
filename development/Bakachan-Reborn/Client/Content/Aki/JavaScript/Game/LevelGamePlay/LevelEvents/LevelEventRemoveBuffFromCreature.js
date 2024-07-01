"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventRemoveBuffFromCreature = void 0);
const UE = require("ue"),
	Log_1 = require("../../../Core/Common/Log"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventRemoveBuffFromCreature extends LevelGeneralBase_1.LevelEventBase {
	constructor() {
		super(...arguments), (this.gLe = void 0), (this.fLe = void 0);
	}
	Execute(e, t) {
		e.get("BuffId")
			? (e = e.get("CreatureGen"))
				? UE.KismetStringLibrary.Conv_StringToInt64(e) &&
					Log_1.Log.CheckError() &&
					Log_1.Log.Error("LevelEvent", 3, "该功能已废弃")
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Level",
						20,
						"LevelEventRemoveBuffFromCreature 事件CreatureGen为空",
					)
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Level",
					20,
					"LevelEventRemoveBuffFromCreature 事件Buffid为空",
				);
	}
	ExecuteNew(e, t) {
		if (e) {
			if (
				((this.gLe = e),
				(this.fLe = []),
				void 0 !== e.EntityId && this.fLe.push(e.EntityId),
				e.EntityIds?.length)
			)
				for (const t of e.EntityIds) this.fLe.push(t);
			this.CreateWaitEntityTask(this.fLe);
		} else
			Log_1.Log.CheckError() && Log_1.Log.Error("Event", 34, "参数类型错误"),
				this.FinishExecute(!1);
	}
	ExecuteWhenEntitiesReady() {
		for (const r of this.fLe) {
			var e = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(r);
			if (e?.IsInit) {
				var t = e.Entity.GetComponent(157);
				for (const e of this.gLe.BuffIds)
					t.RemoveBuff(BigInt(e), -1, "LevelEventRemoveBuffFromCreature");
			}
		}
		this.FinishExecute(!0);
	}
	ExecuteInGm(e, t) {
		if (e) {
			if (
				((this.gLe = e),
				(this.fLe = []),
				void 0 !== e.EntityId && this.fLe.push(e.EntityId),
				e.EntityIds?.length)
			)
				for (const t of e.EntityIds) this.fLe.push(t);
			this.ExecuteWhenEntitiesReady();
		} else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error("Event", 34, "执行行为时:参数类型错误", [
					"EventType",
					this.Type,
				]),
				this.FinishExecute(!1);
	}
}
exports.LevelEventRemoveBuffFromCreature = LevelEventRemoveBuffFromCreature;
