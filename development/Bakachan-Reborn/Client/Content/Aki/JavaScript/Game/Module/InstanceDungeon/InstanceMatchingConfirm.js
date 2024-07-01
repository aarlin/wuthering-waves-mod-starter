"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.InstanceMatchingConfirm = void 0);
const UE = require("ue"),
	CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
	MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
	TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	TimeUtil_1 = require("../../Common/TimeUtil"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	UiViewBase_1 = require("../../Ui/Base/UiViewBase"),
	LguiUtil_1 = require("../Util/LguiUtil"),
	InstanceDungeonEntranceController_1 = require("./InstanceDungeonEntranceController"),
	ONE_SECONDS = 1e3;
class InstanceMatchingConfirm extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.r1i = 0),
			(this.j3 = void 0),
			(this.G$e = () => {
				switch (
					ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetMatchingState()
				) {
					case 3:
						this.ShowWaitState();
						break;
					case 0:
					case 1:
					case 4:
						this.CloseMe();
				}
			}),
			(this.TDe = () => {
				2 !==
					ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetMatchingState() &&
				void 0 !== this.j3
					? (TimerSystem_1.TimerSystem.Remove(this.j3), (this.j3 = void 0))
					: LguiUtil_1.LguiUtil.SetLocalText(
							this.GetText(0),
							"MatchingCoolDown",
							TimeUtil_1.TimeUtil.GetCoolDown(this.r1i--),
						);
			}),
			(this.n1i = () => {
				InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.MatchConfirmRequest(
					!1,
				),
					ModelManager_1.ModelManager.InstanceDungeonModel.ResetData();
			}),
			(this.Lli = () => {
				InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.MatchConfirmRequest(
					!0,
				),
					this.ShowWaitState();
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[1, UE.UIText],
			[0, UE.UIText],
			[2, UE.UIButtonComponent],
			[3, UE.UIButtonComponent],
			[4, UE.UIItem],
		]),
			(this.BtnBindInfo = [
				[2, this.n1i],
				[3, this.Lli],
			]);
	}
	OnStart() {
		this.ShowConfirmState(
			MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
				ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
					ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetMatchingId(),
				).MapName,
			),
		),
			this.ChildPopView?.PopItem?.OverrideBackBtnCallBack(() => {
				InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.MatchConfirmRequest(
					!1,
				),
					ModelManager_1.ModelManager.InstanceDungeonModel.ResetData(),
					this.CloseMe();
			});
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnMatchingChange,
			this.G$e,
		);
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnMatchingChange,
			this.G$e,
		);
	}
	OnBeforeDestroy() {
		void 0 !== this.j3 && TimerSystem_1.TimerSystem.Remove(this.j3),
			(this.j3 = void 0),
			(this.r1i = 0);
	}
	ShowConfirmState(e) {
		(this.r1i = CommonParamById_1.configCommonParamById.GetIntConfig(
			"match_confirm_time_out_seconds",
		)),
			LguiUtil_1.LguiUtil.SetLocalText(
				this.GetText(0),
				"MatchingCoolDown",
				(this.r1i--).toString(),
			),
			LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), "MatchingContext", e),
			this.GetText(0)?.SetUIActive(!0),
			this.GetButton(2).GetRootComponent().SetUIActive(!0),
			this.GetButton(3).GetRootComponent().SetUIActive(!0),
			this.GetItem(4).SetUIActive(!1),
			void 0 !== this.j3 &&
				(TimerSystem_1.TimerSystem.Remove(this.j3), (this.j3 = void 0)),
			(this.j3 = TimerSystem_1.TimerSystem.Forever(this.TDe, 1e3));
	}
	ShowWaitState() {
		this.GetText(0)?.SetUIActive(!1),
			this.GetButton(2).GetRootComponent().SetUIActive(!1),
			this.GetButton(3).GetRootComponent().SetUIActive(!1),
			this.GetItem(4).SetUIActive(!0),
			this.ChildPopView?.PopItem.SetMaskResponsibleState(!1),
			this.ChildPopView?.PopItem.SetBackBtnShowState(!1);
	}
}
exports.InstanceMatchingConfirm = InstanceMatchingConfirm;
