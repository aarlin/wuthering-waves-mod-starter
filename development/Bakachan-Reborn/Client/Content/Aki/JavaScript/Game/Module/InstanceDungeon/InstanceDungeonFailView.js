"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.InstanceDungeonFailView = void 0);
const UE = require("ue"),
	CommonDefine_1 = require("../../../Core/Define/CommonDefine"),
	TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	UiViewBase_1 = require("../../Ui/Base/UiViewBase"),
	UiManager_1 = require("../../Ui/UiManager"),
	TrainingView_1 = require("../TrainingDegree/TrainingView"),
	LguiUtil_1 = require("../Util/LguiUtil"),
	InstanceDungeonEntranceController_1 = require("./InstanceDungeonEntranceController");
class InstanceDungeonFailView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.NUe = 0),
			(this.w2e = void 0),
			(this.Z2t = void 0),
			(this.q2e = () => {
				this.rli();
			}),
			(this.nli = () => {
				this.F2e(),
					InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.RestartInstanceDungeon().finally(
						() => {
							UiManager_1.UiManager.IsViewShow(this.Info.Name) &&
								this.CloseMe();
						},
					);
			});
	}
	get Khi() {
		return this.NUe
			? ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(this.NUe)
			: void 0;
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIButtonComponent],
			[2, UE.UIButtonComponent],
			[3, UE.UIText],
			[4, UE.UIVerticalLayout],
		]),
			(this.BtnBindInfo = [
				[1, this.q2e],
				[2, this.nli],
			]);
	}
	OnStart() {
		(this.NUe =
			ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId),
			UiManager_1.UiManager.IsViewShow("ReviveView") &&
				UiManager_1.UiManager.CloseView("ReviveView"),
			this.h7e(),
			this.N2e(),
			(this.Z2t = new TrainingView_1.TrainingView()),
			this.Z2t.Show(this.GetVerticalLayout(4)),
			this.SetButtonUiActive(2, !1);
	}
	OnBeforeDestroy() {
		this.Z2t && this.Z2t.Clear(), (this.Z2t = void 0), this.F2e();
	}
	h7e() {
		this.GetText(0).ShowTextNew(this.Khi.FailTips);
	}
	N2e() {
		let e = this.Khi.AutoLeaveTime;
		this.w2e = TimerSystem_1.TimerSystem.Loop(
			() => {
				e <= 0
					? this.rli()
					: LguiUtil_1.LguiUtil.SetLocalText(
							this.GetText(3),
							"InstanceDungeonLeftTimeToAutoLeave",
							e--,
						);
			},
			CommonDefine_1.MILLIONSECOND_PER_SECOND,
			e + 1,
		);
	}
	F2e() {
		TimerSystem_1.TimerSystem.Has(this.w2e) &&
			TimerSystem_1.TimerSystem.Remove(this.w2e),
			(this.w2e = void 0);
	}
	rli() {
		this.F2e(),
			InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.LeaveInstanceDungeon().finally(
				() => {
					UiManager_1.UiManager.IsViewShow(this.Info.Name) && this.CloseMe();
				},
			);
	}
}
exports.InstanceDungeonFailView = InstanceDungeonFailView;
