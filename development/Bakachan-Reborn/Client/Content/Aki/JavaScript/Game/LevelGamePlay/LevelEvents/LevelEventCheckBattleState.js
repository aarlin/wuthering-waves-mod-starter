"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventCheckBattleState = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils"),
	IAction_1 = require("../../../UniverseEditor/Interface/IAction"),
	TimeUtil_1 = require("../../Common/TimeUtil"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventCheckBattleState extends LevelGeneralBase_1.LevelEventBase {
	constructor() {
		super(...arguments),
			(this.nDe = !1),
			(this.sDe = void 0),
			(this.aDe = void 0),
			(this.hDe = void 0),
			(this.lDe = void 0),
			(this.j6 = 5),
			(this._De = 0),
			(this.uDe = -0);
	}
	ExecuteInGm(e, t) {
		this.FinishExecute(!0);
	}
	ExecuteNew(e, t) {
		(this.nDe = !1),
			e
				? ((this.aDe = e.StateOption),
					this.aDe && this.aDe.TagOption
						? ((this.lDe = this.aDe.TagOption),
							this.CreateWaitEntityTask(this.aDe.EntityId))
						: (Log_1.Log.CheckError() &&
								Log_1.Log.Error("LevelEvent", 34, "StateOption不合法"),
							this.FinishExecute(!1)))
				: (Log_1.Log.CheckError() &&
						Log_1.Log.Error("LevelEvent", 34, "参数不合法"),
					this.FinishExecute(!1));
	}
	ExecuteWhenEntitiesReady() {
		(this.uDe = this.aDe.MaxWaitTime * TimeUtil_1.TimeUtil.InverseMillisecond),
			(this.sDe = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
				this.aDe.EntityId,
			)),
			(this.hDe = this.aDe.Type);
	}
	OnTick(e) {
		this.uDe && ((this.uDe -= e), this.uDe <= 0) && this.FinishExecute(!0),
			(this._De += 1),
			this._De < this.j6 ||
				((this._De = 0),
				this.hDe === IAction_1.EDetectBattleConditionType.DetectBattleTag &&
					(this.nDe = this.cDe()),
				this.nDe && this.FinishExecute(!0));
	}
	cDe() {
		var e;
		return this.sDe?.Valid
			? ((e = this.lDe.Type),
				this.sDe.Entity.GetComponent(185)?.HasTag(
					GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e),
				))
			: (Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"LevelEvent",
						34,
						"目标实体不存在，action视为执行成功",
						["EntityId", this.aDe.EntityId],
					),
				!0);
	}
	Release() {
		super.Release(), (this.sDe = void 0);
	}
}
exports.LevelEventCheckBattleState = LevelEventCheckBattleState;
