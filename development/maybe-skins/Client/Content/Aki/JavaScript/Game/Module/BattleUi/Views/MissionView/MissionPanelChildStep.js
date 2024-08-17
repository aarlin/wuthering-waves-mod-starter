"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MissionPanelChildStep = void 0);
const ue_1 = require("ue"),
	StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
	IQuest_1 = require("../../../../../UniverseEditor/Interface/IQuest"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
	TreeStepWithStatus_1 = require("../../../GeneralLogicTree/View/TreeStep/TreeStepWithStatus"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem");
class MissionPanelChildStep extends TreeStepWithStatus_1.TreeStepWithStatus {
	constructor() {
		super(),
			(this.Lut = void 0),
			(this.Dut = void 0),
			(this.Rut = void 0),
			(this.LevelSequencePlayer = void 0),
			(this.Uut = void 0),
			(this.Aut = void 0),
			(this.xut = IQuest_1.EQuestScheduleType.None),
			(this.G_t = 0),
			(this.gAn = void 0),
			(this.ZPt = (e) => {
				"Start" === e && this.SetActive(!0);
			}),
			(this.aut = (e) => {
				switch (e) {
					case "Success":
						this.DescribeTextComp?.SetColor(this.Uut);
						break;
					case "Fail":
						this.DescribeTextComp?.SetColor(this.Aut);
						break;
					case "Start":
						this.hut();
						break;
					case "Close":
						this.SetActive(!1), this.gAn ? this.gAn() : this.hut();
				}
			}),
			(this.Lut = ue_1.Color.FromHex("ECE5D8FF")),
			(this.Dut = ue_1.Color.FromHex("ADADADFF")),
			(this.Rut = ue_1.Color.FromHex("C9F797FF"));
	}
	OnRegisterComponent() {
		super.OnRegisterComponent(),
			this.ComponentRegisterInfos.push([5, ue_1.UIItem]);
	}
	OnStart() {
		super.OnStart(),
			(this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(
				this.RootItem,
			)),
			this.LevelSequencePlayer.BindSequenceStartEvent(this.ZPt),
			this.LevelSequencePlayer.BindSequenceCloseEvent(this.aut),
			this.GetItem(5)?.SetUIActive(!1);
	}
	DisableUi(e) {
		this.SetUiActive(e), e || this.GetItem(5)?.SetAlpha(0);
	}
	wut() {
		var e = this.Config.QuestScheduleType;
		if (this.xut !== e.Type)
			switch (((this.xut = e.Type), e.Type)) {
				case IQuest_1.EQuestScheduleType.ChildQuestCompleted:
					(this.Uut = this.Rut), (this.Aut = this.Dut);
					var t =
							ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
								"SP_MissionState",
							),
						i =
							ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
								"SP_MissionComplete",
							),
						s =
							ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
								"SP_MissionLose",
							);
					this.SetSpriteByPath(t, this.StepStatusNode, !0),
						this.SetSpriteByPath(i, this.StepSuccess, !0),
						this.SetSpriteByPath(s, this.StepLose, !0);
					break;
				case IQuest_1.EQuestScheduleType.Condition:
				case IQuest_1.EQuestScheduleType.TimeLeft: {
					let u;
					e.Type,
						IQuest_1.EQuestScheduleType.Condition,
						(u = e),
						(this.Uut = this.Lut),
						(this.Aut = this.Dut),
						(t =
							1 === u.IconType ? "SP_DailyTowerStarBg" : "SP_ComStateOffline"),
						(i =
							ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
								t,
							)),
						this.SetSpriteByPath(i, this.StepStatusNode, !0),
						(s = 1 === u.IconType ? "SP_DailyTowerStar" : "SP_ComStateOnline"),
						(t =
							ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
								s,
							)),
						this.SetSpriteByPath(t, this.StepSuccess, !0),
						this.SetSpriteByPath(i, this.StepLose, !0);
					break;
				}
			}
	}
	UpdateStepInfo() {
		this.wut();
		var e = super.UpdateStepInfo();
		return (
			this.StepSuccess?.IsUIActiveInHierarchy()
				? this.DescribeTextComp.SetColor(this.Uut)
				: this.StepLose?.IsUIActiveInHierarchy()
					? this.DescribeTextComp.SetColor(this.Aut)
					: this.DescribeTextComp.SetColor(this.Lut),
			e
		);
	}
	OnSuccessNodeActive(e) {
		if (e)
			switch (this.xut) {
				case IQuest_1.EQuestScheduleType.ChildQuestCompleted:
					this.LevelSequencePlayer.PlayLevelSequenceByName("Success");
					break;
				case IQuest_1.EQuestScheduleType.TimeLeft:
				case IQuest_1.EQuestScheduleType.Condition:
					this.aut("Success");
			}
	}
	OnLoseNodeActive(e) {
		if (e)
			switch (this.xut) {
				case IQuest_1.EQuestScheduleType.ChildQuestCompleted:
					this.LevelSequencePlayer.PlayLevelSequenceByName("Fail");
					break;
				case IQuest_1.EQuestScheduleType.TimeLeft:
				case IQuest_1.EQuestScheduleType.Condition:
					this.aut("Fail");
			}
	}
	OnStepDescribeUpdate(e) {
		(e = StringUtils_1.StringUtils.IsBlank(e)),
			this.GetItem(5)?.SetUIActive(!e);
	}
	PlayStartSequence(e) {
		(this.G_t = e),
			this.LevelSequencePlayer.StopCurrentSequence(!0, !0),
			this.LevelSequencePlayer?.PlayLevelSequenceByName("Start");
		e =
			"Disabled" !== ModelManager_1.ModelManager.AutoRunModel.GetAutoRunMode();
		var t = this.fAn();
		(!e && t) || this.LevelSequencePlayer.StopCurrentSequence(!0, !0);
	}
	PlayCloseSequence(e, t) {
		return (
			(this.G_t = e),
			this.LevelSequencePlayer.StopCurrentSequence(!0, !0),
			this.LevelSequencePlayer?.PlayLevelSequenceByName("Close"),
			(this.gAn = t),
			(e =
				"Disabled" !==
				ModelManager_1.ModelManager.AutoRunModel.GetAutoRunMode()),
			(t = this.fAn()),
			!((!e && t) || (this.LevelSequencePlayer.StopCurrentSequence(!0, !0), 0))
		);
	}
	fAn() {
		return void 0 !== this.Config;
	}
	hut() {
		this.G_t &&
			(EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.MissionPanelProcessEnd,
				this.G_t,
			),
			(this.G_t = 0));
	}
}
exports.MissionPanelChildStep = MissionPanelChildStep;
