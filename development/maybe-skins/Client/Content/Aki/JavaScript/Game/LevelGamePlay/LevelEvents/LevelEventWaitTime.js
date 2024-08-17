"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventWaitTime = void 0);
const CommonDefine_1 = require("../../../Core/Define/CommonDefine"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventWaitTime extends LevelGeneralBase_1.LevelEventBase {
	constructor() {
		super(...arguments), (this.oUe = -0), (this.VLn = !1);
	}
	ExecuteInGm(e, t) {
		this.FinishExecute(!0);
	}
	Execute(e, t) {
		(t && e && ((t = e.get("Time")), (this.oUe = parseFloat(t)), this.oUe)) ||
			this.FinishExecute(!1);
	}
	ExecuteNew(e, t) {
		(this.oUe = e.Time * CommonDefine_1.MILLIONSECOND_PER_SECOND),
			e.BanInput &&
				((this.VLn = !0),
				(ModelManager_1.ModelManager.GeneralLogicTreeModel.DisableInput = !0),
				ControllerHolder_1.ControllerHolder.InputDistributeController.RefreshInputTag()),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.ForceReleaseInput,
				"LevelEventWait",
			),
			this.oUe ||
				(this.VLn &&
					((ModelManager_1.ModelManager.GeneralLogicTreeModel.DisableInput =
						!1),
					ControllerHolder_1.ControllerHolder.InputDistributeController.RefreshInputTag(),
					(this.VLn = !1)),
				this.FinishExecute(!1));
	}
	OnTick(e) {
		(this.oUe -= e),
			this.oUe < 0 &&
				(this.VLn &&
					((ModelManager_1.ModelManager.GeneralLogicTreeModel.DisableInput =
						!1),
					ControllerHolder_1.ControllerHolder.InputDistributeController.RefreshInputTag(),
					(this.VLn = !1)),
				this.FinishExecute(!0));
	}
	OnReset() {
		(this.VLn = !1), (this.oUe = 0);
	}
}
exports.LevelEventWaitTime = LevelEventWaitTime;
