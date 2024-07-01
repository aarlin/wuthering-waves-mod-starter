"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BattleQuestButton = void 0);
const ue_1 = require("ue"),
	BattleEntranceButton_1 = require("./BattleEntranceButton"),
	LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	LguiUtil_1 = require("../../../Util/LguiUtil"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	MissionUpgradeIn = "MissionUpgradeIn",
	MissionUpgradeOut = "MissionUpgradeOut";
class BattleQuestButton extends BattleEntranceButton_1.BattleEntranceButton {
	constructor() {
		super(...arguments),
			(this.SequencePlayer = void 0),
			(this.w_t = void 0),
			(this.ZPt = (e) => {
				if (e === MissionUpgradeIn) this.GetItem(2)?.SetUIActive(!0);
			}),
			(this.aut = (e) => {
				switch (e) {
					case MissionUpgradeIn:
						this.SequencePlayer.PlayLevelSequenceByName(MissionUpgradeOut),
							"Disabled" !==
								ModelManager_1.ModelManager.AutoRunModel.GetAutoRunMode() &&
								this.SequencePlayer.StopCurrentSequence(!0, !0);
						break;
					case MissionUpgradeOut:
						EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.MissionUpdateAnimEnd,
							this.w_t,
						);
				}
			}),
			(this.tAn = (e) => {
				this.w_t = e;
				var t = this.GetText(3);
				(e =
					(e.IsNewQuest
						? LguiUtil_1.LguiUtil.SetLocalText(t, "QuestUpdateNewQuestTips")
						: LguiUtil_1.LguiUtil.SetLocalText(t, "QuestUpdateNewGoalTips"),
					this.SequencePlayer.StopCurrentSequence(!0, !0),
					this.SequencePlayer.PlayLevelSequenceByName(MissionUpgradeIn),
					"Disabled" !==
						ModelManager_1.ModelManager.AutoRunModel.GetAutoRunMode())) &&
					this.SequencePlayer.StopCurrentSequence(!0, !0);
			});
	}
	OnRegisterComponent() {
		super.OnRegisterComponent(),
			this.ComponentRegisterInfos.push([2, ue_1.UIItem]),
			this.ComponentRegisterInfos.push([3, ue_1.UIText]);
	}
	Initialize(e) {
		super.Initialize(e),
			(this.SequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(
				this.RootItem,
			)),
			this.SequencePlayer.BindSequenceStartEvent(this.ZPt),
			this.SequencePlayer.BindSequenceCloseEvent(this.aut),
			this.AddEvents();
	}
	Reset() {
		this.RemoveEvents(), super.Reset();
	}
	OnShowBattleChildView() {
		super.OnShowBattleChildView(),
			this.SequencePlayer.GetCurrentSequence() &&
				this.SequencePlayer.ResumeSequence();
	}
	OnHideBattleChildView() {
		super.OnHideBattleChildView(),
			this.SequencePlayer.GetCurrentSequence() &&
				this.SequencePlayer.PauseSequence();
	}
	AddEvents() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.MissionUpdate,
			this.tAn,
		);
	}
	RemoveEvents() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.MissionUpdate,
			this.tAn,
		);
	}
}
exports.BattleQuestButton = BattleQuestButton;
