"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ActivitySubViewCollection = void 0);
const UE = require("ue"),
	CommonDefine_1 = require("../../../../../Core/Define/CommonDefine"),
	MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
	StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	PublicUtil_1 = require("../../../../Common/PublicUtil"),
	TimeUtil_1 = require("../../../../Common/TimeUtil"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	UiManager_1 = require("../../../../Ui/UiManager"),
	LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
	QuestController_1 = require("../../../QuestNew/Controller/QuestController"),
	ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController"),
	WorldMapController_1 = require("../../../WorldMap/WorldMapController"),
	ActivitySubViewBase_1 = require("../../View/SubView/ActivitySubViewBase"),
	ActivityDescriptionTypeA_1 = require("../UniversalComponents/Content/ActivityDescriptionTypeA"),
	ActivityProgressComponent_1 = require("../UniversalComponents/Content/ActivityProgressComponent"),
	ActivityRewardList_1 = require("../UniversalComponents/Content/ActivityRewardList"),
	ActivityFunctionalArea_1 = require("../UniversalComponents/Functional/ActivityFunctionalArea"),
	ActivityTitleTypeA_1 = require("../UniversalComponents/Title/ActivityTitleTypeA");
class ActivitySubViewCollection extends ActivitySubViewBase_1.ActivitySubViewBase {
	constructor() {
		super(...arguments),
			(this.ActivityBaseData = void 0),
			(this.LNe = void 0),
			(this.DNe = void 0),
			(this.RNe = void 0),
			(this.UNe = void 0),
			(this.ANe = void 0),
			(this.PNe = !1),
			(this.xNe = 0),
			(this.wNe = (e) => {
				e === this.ActivityBaseData.Id && this.BNe();
			}),
			(this.DEe = (e) => {
				this.ActivityBaseData.QuestStateMap.get(e) &&
					(this.bNe(), this.qNe(), this.GNe());
			}),
			(this.NNe = () => {
				var e = this.ActivityBaseData.GetAllRewardQuestDataList();
				UiManager_1.UiManager.OpenView("ActivityRewardPopUpView", e);
			}),
			(this.ONe = () => {
				switch (this.ActivityBaseData.GetProgressState()) {
					case 0: {
						const t = this.ActivityBaseData.GetUnFinishPreGuideQuestId();
						var e = () => {
							var e = {
								MarkId:
									ModelManager_1.ModelManager.QuestNewModel.TryGetMapMarkIdByQuestId(
										t,
									),
								MarkType: 12,
								OpenAreaId: 0,
							};
							WorldMapController_1.WorldMapController.OpenView(2, !1, e);
						};
						if (!ModelManager_1.ModelManager.QuestNewModel.IsTrackingQuest(t)) {
							QuestController_1.QuestNewController.RequestTrackQuest(
								t,
								!0,
								2,
								0,
								e,
							);
							break;
						}
						e();
						break;
					}
					case 1:
						var [e] = this.ActivityBaseData.GetCurrentProgress();
						(e = {
							MarkId:
								ConfigManager_1.ConfigManager.ActivityCollectionConfig.GetActivityCollectionConfig(
									e + 1,
								).MarkId,
							MarkType: 0,
							OpenAreaId: 0,
						}),
							(e =
								(WorldMapController_1.WorldMapController.OpenView(2, !1, e),
								this.ActivityBaseData.GetCurrentProgressQuestId()));
						ModelManager_1.ModelManager.ActivityModel.SaveActivityData(
							this.ActivityBaseData.Id,
							e,
							0,
							0,
							0,
						),
							EventSystem_1.EventSystem.Emit(
								EventDefine_1.EEventName.RefreshCommonActivityRedDot,
								this.ActivityBaseData.Id,
							);
						break;
					case 2:
						(e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
							"CollectActivity_prompt_finish",
						)),
							ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(
								e,
							);
				}
			});
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
			[2, UE.UIItem],
			[3, UE.UIItem],
			[4, UE.UIItem],
			[5, UE.UIItem],
		];
	}
	OnSetData() {}
	async OnBeforeStartAsync() {
		var e = this.GetItem(0);
		(this.LNe = new ActivityTitleTypeA_1.ActivityTitleTypeA()),
			await this.LNe.CreateThenShowByActorAsync(e.GetOwner()),
			(e = this.GetItem(1)),
			(this.DNe = new ActivityDescriptionTypeA_1.ActivityDescriptionTypeA()),
			await this.DNe.CreateThenShowByActorAsync(e.GetOwner()),
			(e = this.GetItem(2)),
			(this.RNe = new ActivityProgressComponent_1.ActivityProgressComponents()),
			await this.RNe.CreateThenShowByActorAsync(e.GetOwner()),
			(e = this.GetItem(3)),
			(this.UNe = new ActivityRewardList_1.ActivityRewardList()),
			await this.UNe.CreateThenShowByActorAsync(e.GetOwner()),
			(e = this.GetItem(4));
		(this.ANe = new ActivityFunctionalArea_1.ActivityFunctionalArea()),
			await this.ANe.CreateThenShowByActorAsync(e.GetOwner()),
			(this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(
				this.GetItem(5),
			));
	}
	OnStart() {
		this.LNe.SetTitleByText(this.ActivityBaseData.GetTitle()),
			this.DNe.SetUiActive(!1),
			this.kNe(),
			this.OnRefreshView();
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnQuestStateChange,
			this.DEe,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.RefreshCommonActivityRedDot,
				this.wNe,
			);
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnQuestStateChange,
			this.DEe,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.RefreshCommonActivityRedDot,
				this.wNe,
			);
	}
	OnRefreshView() {
		this.bNe(), this.FNe(), this.qNe(), this.VNe(), this.BNe(), this.GNe();
	}
	GNe() {
		var e;
		this.ActivityBaseData.IsHasNewQuestRedDot() &&
			((e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
				"CollectionAtivity_NewQuest",
			)),
			ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(e));
	}
	OnTimer(e) {
		this.FNe();
	}
	bNe() {
		this.ActivityBaseData.RefreshRewardData();
	}
	FNe() {
		var [e, t] = this.GetTimeVisibleAndRemainTime();
		this.LNe.SetTimeTextVisible(e),
			e && this.LNe.SetTimeTextByText(t),
			this.PNe &&
				this.RNe?.SetDescriptionByTextId(
					"CollectionAtivity_AcceptQuestTime",
					this.HNe(this.xNe),
				);
	}
	qNe() {
		var [e] = this.ActivityBaseData.GetCurrentProgress(),
			t = this.ActivityBaseData.GetTotalProgress(),
			i = this.ActivityBaseData.GetCurrentProgressQuestId(),
			s = ModelManager_1.ModelManager.QuestNewModel.GetQuestConfig(i)?.TidName,
			n = s ? PublicUtil_1.PublicUtil.GetConfigTextByKey(s) : "";
		this.RNe?.SetProgressPercent(e / t),
			(s =
				MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
					"Text_ItemShow_Text",
				));
		switch (
			(this.RNe?.SetProgressTextByText(
				StringUtils_1.StringUtils.Format(s, e.toString(), t.toString()),
			),
			this.RNe?.SetTitleByTextId("CollectActivity_schedule"),
			this.ActivityBaseData.GetProgressState())
		) {
			case 0:
				var r = this.ActivityBaseData.GetPreShowGuideQuestName();
				this.RNe?.SetDescriptionByText(r);
				break;
			case 1:
				var a;
				(r = this.ActivityBaseData.QuestStateMap.get(i)) &&
					((a = r.QuestUnlockStamp - TimeUtil_1.TimeUtil.GetServerTime()),
					2 === r.QuestState || a < 0
						? (this.RNe?.SetDescriptionByText(n), (this.PNe = !1))
						: ((this.xNe = r.QuestUnlockStamp),
							this.RNe?.SetDescriptionByTextId(
								"CollectionAtivity_AcceptQuestTime",
								this.HNe(this.xNe),
							),
							(this.PNe = !0)));
				break;
			case 2:
				this.RNe?.SetDescriptionByTextId("CollectActivity_state_finish");
		}
	}
	HNe(e) {
		var t = TimeUtil_1.TimeUtil.GetServerTime();
		(e = Math.max(e - t, TimeUtil_1.TimeUtil.Minute)), (t = this.jNe(e));
		return (
			TimeUtil_1.TimeUtil.GetCountDownDataFormat2(e, t[0], t[1])
				.CountDownText ?? ""
		);
	}
	jNe(e) {
		return e > CommonDefine_1.SECOND_PER_DAY
			? [3, 2]
			: e > CommonDefine_1.SECOND_PER_HOUR
				? [2, 2]
				: [1, 1];
	}
	kNe() {
		var e = this.ActivityBaseData.GetPreviewReward();
		this.UNe.SetTitleByTextId("CollectActivity_reward"),
			this.UNe.InitGridLayout(this.UNe.InitCommonGridItem),
			this.UNe.RefreshItemLayout(e);
	}
	VNe() {
		var e,
			t = this.ActivityBaseData.IsUnLock();
		this.ANe.SetPanelConditionVisible(!t),
			t ||
				((e = this.GetCurrentLockConditionText()),
				this.ANe.SetLockTextByTextId(e)),
			this.ANe.SetRewardButtonVisible(t),
			t && this.ANe.SetRewardButtonFunction(this.NNe),
			this.ANe.FunctionButton.SetUiActive(t),
			t &&
				((e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
					"CollectActivity_Button_ahead",
				)),
				this.ANe.FunctionButton.SetText(e),
				this.ANe.FunctionButton.SetFunction(this.ONe));
	}
	BNe() {
		var e = this.ActivityBaseData.IsHasRewardRedPoint();
		this.ANe.SetRewardRedDotVisible(e),
			(e = this.ActivityBaseData.IsHasNewQuestRedDot());
		this.ANe.FunctionButton.SetRedDotVisible(e);
	}
	PlaySubViewSequence(e) {
		this.WNe();
	}
	WNe() {
		var [e] = this.ActivityBaseData.GetCurrentProgress(),
			e = "Shape0" + e;
		this.LevelSequencePlayer.GetCurrentSequence() === e
			? this.LevelSequencePlayer.ReplaySequenceByKey(e)
			: this.LevelSequencePlayer.PlayLevelSequenceByName(e, !1);
	}
}
exports.ActivitySubViewCollection = ActivitySubViewCollection;
