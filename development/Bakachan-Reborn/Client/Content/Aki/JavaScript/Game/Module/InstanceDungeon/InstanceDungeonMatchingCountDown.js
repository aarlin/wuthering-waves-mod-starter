"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.InstanceDungeonMatchingCountDown = void 0);
const UE = require("ue"),
	Log_1 = require("../../../Core/Common/Log"),
	TimeUtil_1 = require("../../Common/TimeUtil"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../Ui/Base/UiPanelBase"),
	UiManager_1 = require("../../Ui/UiManager"),
	LevelSequencePlayer_1 = require("../Common/LevelSequencePlayer"),
	InstanceDungeonEntranceController_1 = require("./InstanceDungeonEntranceController");
class InstanceDungeonMatchingCountDown extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(),
			(this.EPe = void 0),
			(this.yli = void 0),
			(this.Ili = void 0),
			(this.Tli = void 0),
			(this.n1i = () => {
				var e;
				"Close" === this.Tli
					? Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug(
							"InstanceDungeon",
							28,
							"当前正在播放Close动画，不响应点击事件",
						)
					: 3 !==
							(e =
								ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetMatchingState()) &&
						2 !== e &&
						(this.PlayAnimation("Close"), this.yli) &&
						this.yli();
			}),
			(this.aut = (e) => {
				("Close" !== e && "Finish" !== e) || this.SetUiActive(!1),
					this.Ili?.(e);
			}),
			(this.Dli = () => {
				(UiManager_1.UiManager.IsViewShow("InstanceDungeonEntranceView") ||
					UiManager_1.UiManager.IsViewShow("OnlineWorldHallView") ||
					UiManager_1.UiManager.IsViewShow("EditBattleTeamView")) &&
					this.GetText(1).SetText(
						TimeUtil_1.TimeUtil.GetTimeString(
							ModelManager_1.ModelManager.InstanceDungeonEntranceModel
								.MatchingTime,
						),
					);
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIText],
			[2, UE.UIButtonComponent],
		]),
			(this.BtnBindInfo = [[2, this.n1i]]);
	}
	OnStart() {
		(this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
			this.EPe.BindSequenceCloseEvent(this.aut);
	}
	OnBeforeShow() {
		ModelManager_1.ModelManager.GameModeModel.IsMulti
			? ModelManager_1.ModelManager.OnlineModel.GetIsMyTeam() ||
				this.GetButton(2).RootUIComp.SetUIActive(!1)
			: this.GetButton(2).RootUIComp.SetUIActive(
					!ModelManager_1.ModelManager.InstanceDungeonModel.GetMatchTeamInfo() ||
						ModelManager_1.ModelManager.InstanceDungeonModel.IsMatchTeamHost(),
				);
	}
	PlayAnimation(e) {
		this.Tli !== e &&
			(this.SetUiActive(!0),
			this.EPe.StopCurrentSequence(),
			this.EPe.PlayLevelSequenceByName(e),
			(this.Tli = e));
	}
	OnBeforeDestroy() {
		(this.yli = void 0), this.EPe?.Clear(), (this.EPe = void 0);
	}
	StartTimer() {
		var e = ModelManager_1.ModelManager.InstanceDungeonEntranceModel;
		this.GetText(1).SetText(TimeUtil_1.TimeUtil.GetTimeString(e.MatchingTime)),
			this.GetText(0).ShowTextNew(
				ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
					e.GetMatchingId(),
				).MapName,
			),
			InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.StartMatchTimer(
				this.Dli,
			),
			"AutoLoop" === this.EPe.GetCurrentSequence()
				? this.EPe.ReplaySequenceByKey("AutoLoop")
				: this.EPe.PlayLevelSequenceByName("AutoLoop");
	}
	BindOnStopTimer(e) {
		ModelManager_1.ModelManager.InstanceDungeonEntranceModel.OnStopTimer = e;
	}
	BindOnClickBtnCancelMatching(e) {
		this.yli = e;
	}
	BindOnAfterCloseAnimation(e) {
		this.Ili = e;
	}
	BindOnStopHandle(e) {
		ModelManager_1.ModelManager.InstanceDungeonEntranceModel.OnStopHandle = e;
	}
	SetMatchingTime(e) {
		ModelManager_1.ModelManager.InstanceDungeonEntranceModel.MatchingTime = e;
	}
}
exports.InstanceDungeonMatchingCountDown = InstanceDungeonMatchingCountDown;
