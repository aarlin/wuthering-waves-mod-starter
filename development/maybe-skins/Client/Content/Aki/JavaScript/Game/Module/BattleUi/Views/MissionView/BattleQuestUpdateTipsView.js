"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BattleQuestUpdateTipsView = void 0);
const ue_1 = require("ue"),
	Log_1 = require("../../../../../Core/Common/Log"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	InputDistributeController_1 = require("../../../../Ui/InputDistribute/InputDistributeController"),
	InputMappingsDefine_1 = require("../../../../Ui/InputDistribute/InputMappingsDefine"),
	UiManager_1 = require("../../../../Ui/UiManager"),
	GeneralLogicTreeController_1 = require("../../../GeneralLogicTree/GeneralLogicTreeController"),
	QuestController_1 = require("../../../QuestNew/Controller/QuestController"),
	BattleChildView_1 = require("../BattleChildView/BattleChildView"),
	CombineKeyItem_1 = require("../KeyItem/CombineKeyItem");
class BattleQuestUpdateTipsView extends BattleChildView_1.BattleChildView {
	constructor() {
		super(...arguments),
			(this.xet = void 0),
			(this.w_t = void 0),
			(this.B_t = 0),
			(this.b_t = 0),
			(this.q_t = !1),
			(this.F_t = !1),
			(this.hAn = !1),
			(this.lAn = !1),
			(this.Q_t = () => {
				this.w_t &&
					(Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"Quest",
							19,
							"BattleQuestUpdateTipsView:UpdateQuestName",
							["QuestName", this.w_t.QuestName],
						),
					this.GetText(0).SetText(this.w_t.QuestName));
			}),
			(this.X_t = () => {
				if (this.w_t) {
					var e = this.w_t.TrackTextConfig?.MainTitle;
					let t = "";
					void 0 !== e
						? (Log_1.Log.CheckInfo() &&
								Log_1.Log.Info(
									"Quest",
									19,
									"BattleQuestUpdateTipsView:UpdateNodeDescribe",
									["curMainTitle", e],
								),
							(t =
								GeneralLogicTreeController_1.GeneralLogicTreeController.GetTitleText(
									this.w_t.TreeIncId,
									e,
								)))
						: (e =
								GeneralLogicTreeController_1.GeneralLogicTreeController.GetNodeTrackText(
									this.w_t.TreeIncId,
									this.b_t,
								)) && (t = e),
						Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"Quest",
								19,
								"BattleQuestUpdateTipsView:UpdateNodeDescribe",
								["describe", t],
							),
						this.GetText(1).SetText(t);
				}
			}),
			(this.bMe = (e, t) => {
				1 === t && this.$_t();
			}),
			(this.$_t = () => {
				!this.F_t &&
					this.B_t &&
					this.b_t &&
					((this.F_t = !0),
					this.lAn ||
						(EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.QuestUpdateTipsClickTrack,
						),
						(this.lAn = !0)),
					QuestController_1.QuestNewController.RequestTrackQuest(
						this.B_t,
						!0,
						1,
						0,
						() => {
							this.F_t = !1;
						},
					));
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, ue_1.UIText],
			[1, ue_1.UIText],
			[2, ue_1.UISprite],
			[3, ue_1.UIButtonComponent],
			[4, ue_1.UIItem],
		]),
			ModelManager_1.ModelManager.PlatformModel.IsMobile() ||
				this.ComponentRegisterInfos.push([5, ue_1.UIItem]),
			(this.BtnBindInfo = [[3, this.$_t]]);
	}
	OnStart() {
		this.GetText(0).OnSelfLanguageChange.Bind(this.Q_t),
			this.GetText(1).OnSelfLanguageChange.Bind(this.X_t),
			this.GetItem(4).SetUIActive(!0);
	}
	async InitializeAsync(e) {
		var t;
		ModelManager_1.ModelManager.PlatformModel.IsMobile() ||
			((t = this.GetItem(5)),
			(this.xet = new CombineKeyItem_1.CombineKeyItem()),
			await this.xet.CreateThenShowByActorAsync(t.GetOwner()),
			this.xet.RefreshAction(InputMappingsDefine_1.actionMappings.任务追踪));
	}
	OnBeforeDestroy() {
		this.GetText(0).OnSelfLanguageChange.Unbind(),
			this.GetText(1).OnSelfLanguageChange.Unbind();
	}
	OnPanelShow() {}
	OnPanelHide() {}
	OnBeforePlayShowSequence(e) {
		this.UpdateData(e),
			InputDistributeController_1.InputDistributeController.UnBindAction(
				InputMappingsDefine_1.actionMappings.任务追踪,
				this.bMe,
			),
			InputDistributeController_1.InputDistributeController.BindAction(
				InputMappingsDefine_1.actionMappings.任务追踪,
				this.bMe,
			);
	}
	OnBeforePlayHideSequence() {
		InputDistributeController_1.InputDistributeController.UnBindAction(
			InputMappingsDefine_1.actionMappings.任务追踪,
			this.bMe,
		),
			(this.hAn = !0);
	}
	OnAfterPlayHideSequence() {
		(this.hAn = !1),
			this.lAn ||
				QuestController_1.QuestNewController.TryChangeTrackedQuest(
					ModelManager_1.ModelManager.QuestNewModel.CurShowUpdateTipsQuest,
				),
			(ModelManager_1.ModelManager.QuestNewModel.CurShowUpdateTipsQuest =
				void 0);
	}
	UpdateData(e) {
		(ModelManager_1.ModelManager.QuestNewModel.CurShowUpdateTipsQuest =
			e.ShowBridge.TreeConfigId),
			(this.lAn = !1),
			this.RefreshUi(e),
			(this.q_t = e.ShowBridge.IsNewQuest),
			this._An();
	}
	RefreshUi(e) {
		(this.b_t = e.NodeId),
			(this.w_t = e.ShowBridge),
			(this.B_t = this.w_t.TreeConfigId),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Quest", 19, "BattleQuestUpdateTipsView:RefreshUi", [
					"TreeConfigId",
					this.B_t,
				]),
			this.Dnt(),
			this.Q_t(),
			this.X_t();
	}
	Dnt() {
		var e,
			t = this.w_t?.TrackIconConfigId;
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("Quest", 19, "BattleQuestUpdateTipsView:SetIcon", [
				"Id",
				t,
			]),
			t &&
				((t = ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestTypeMark(t)),
				(e = this.GetSprite(2)),
				this.SetSpriteByPath(t, e, !1));
	}
	_An() {
		EventSystem_1.EventSystem.Emit(
			EventDefine_1.EEventName.MissionUpdate,
			this.w_t,
		),
			this.w_t &&
				this.q_t &&
				ConfigManager_1.ConfigManager.QuestNewConfig.GetNewTipsShowTime(
					this.w_t.QuestType,
				) &&
				UiManager_1.UiManager.OpenView("NewMissionTips", this.w_t.TreeConfigId);
	}
	IsClosing() {
		return this.hAn;
	}
}
exports.BattleQuestUpdateTipsView = BattleQuestUpdateTipsView;
