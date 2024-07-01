"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventAdjustTodTime = void 0);
const Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	TimeOfDayController_1 = require("../../Module/TimeOfDay/TimeOfDayController"),
	TimeOfDayModel_1 = require("../../Module/TimeOfDay/TimeOfDayModel"),
	UiManager_1 = require("../../Ui/UiManager"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventAdjustTodTime extends LevelGeneralBase_1.LevelEventBase {
	ExecuteNew(e, t, i) {
		if (e) {
			const t = TimeOfDayModel_1.TodDayTime.ConvertFromHourMinute(
				e.Hour,
				e.Min,
			);
			t < 0
				? this.FinishExecute(!1)
				: e.ShowUi
					? (EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.ResetToBattleView,
						),
						UiManager_1.UiManager.OpenView(
							"TimeOfDaySecondView",
							void 0,
							() => {
								EventSystem_1.EventSystem.Emit(
									EventDefine_1.EEventName.AdjustTimeInAnim,
									ModelManager_1.ModelManager.TimeOfDayModel.GameTime.Second,
									t,
									() => {
										this.FinishExecute(!0);
									},
								);
							},
						))
					: (TimeOfDayController_1.TimeOfDayController.AdjustTime(
							t,
							Protocol_1.Aki.Protocol.pOs.Proto_LevelPlayAuto,
						),
						this.FinishExecute(!0));
		} else this.FinishExecute(!1);
	}
}
exports.LevelEventAdjustTodTime = LevelEventAdjustTodTime;
