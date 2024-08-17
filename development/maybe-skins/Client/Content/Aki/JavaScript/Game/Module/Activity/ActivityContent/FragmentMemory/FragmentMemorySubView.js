"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FragmentMemorySubView = void 0);
const UE = require("ue"),
	MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
	TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
	StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	UiLayer_1 = require("../../../../Ui/UiLayer"),
	UiManager_1 = require("../../../../Ui/UiManager"),
	ButtonItem_1 = require("../../../Common/Button/ButtonItem"),
	FragmentMemoryData_1 = require("../../../FragmentMemory/FragmentMemoryData"),
	ActivitySubViewBase_1 = require("../../View/SubView/ActivitySubViewBase"),
	ActivityDescriptionTypeA_1 = require("../UniversalComponents/Content/ActivityDescriptionTypeA"),
	ActivityRewardList_1 = require("../UniversalComponents/Content/ActivityRewardList"),
	ActivityFunctionalTypeA_1 = require("../UniversalComponents/Functional/ActivityFunctionalTypeA"),
	ActivityTitleTypeA_1 = require("../UniversalComponents/Title/ActivityTitleTypeA"),
	HIDEVIEW01DELAY = 600,
	HIDEVIEWDELAY = 600,
	FRAGMENTMEMORYMASK = "FragmentMemoryMask",
	START01 = "Start01";
class FragmentMemorySubView extends ActivitySubViewBase_1.ActivitySubViewBase {
	constructor() {
		super(...arguments),
			(this.LNe = void 0),
			(this.DNe = void 0),
			(this.UNe = void 0),
			(this.ANe = void 0),
			(this.pUn = void 0),
			(this.vUn = void 0),
			(this.MUn = () => {
				if (this.ActivityBaseData.GetPreGuideQuestFinishState()) {
					var e =
						ConfigManager_1.ConfigManager.FragmentMemoryConfig.GetPhotoMemoryActivityById(
							this.ActivityBaseData.Id,
						);
					const t =
						ModelManager_1.ModelManager.FragmentMemoryModel.GetTopicDataById(
							e.TopicId,
						);
					this.LevelSequencePlayer?.PlaySequencePurely("HideView01"),
						UiLayer_1.UiLayer.SetShowMaskLayer(FRAGMENTMEMORYMASK, !0),
						TimerSystem_1.TimerSystem.Delay(() => {
							ModelManager_1.ModelManager.FragmentMemoryModel.MemoryFragmentMainViewTryPlayAnimation =
								"Start02";
							var e = new FragmentMemoryData_1.FragmentMemoryMainViewOpenData();
							(e.FragmentMemoryTopicData = t),
								UiManager_1.UiManager.OpenView("MemoryFragmentMainView", e),
								UiLayer_1.UiLayer.SetShowMaskLayer(FRAGMENTMEMORYMASK, !1);
						}, 600);
				} else
					(e = this.ActivityBaseData.GetUnFinishPreGuideQuestId()),
						UiManager_1.UiManager.OpenView("QuestView", e),
						ModelManager_1.ModelManager.ActivityModel.SendActivityViewJumpClickLogData(
							this.ActivityBaseData,
							1,
						);
			}),
			(this.SUn = () => {
				const e =
					ConfigManager_1.ConfigManager.FragmentMemoryConfig.GetPhotoMemoryActivityById(
						this.ActivityBaseData.Id,
					);
				this.LevelSequencePlayer?.PlaySequencePurely("HideView02"),
					UiLayer_1.UiLayer.SetShowMaskLayer(FRAGMENTMEMORYMASK, !0),
					TimerSystem_1.TimerSystem.Delay(() => {
						UiManager_1.UiManager.OpenView("MemoryDetailView", e?.TopicId),
							UiLayer_1.UiLayer.SetShowMaskLayer(FRAGMENTMEMORYMASK, !1);
					}, 600);
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
	async OnBeforeStartAsync() {
		var e = this.GetItem(0),
			t =
				((this.LNe = new ActivityTitleTypeA_1.ActivityTitleTypeA()),
				this.GetItem(1)),
			i =
				((this.DNe = new ActivityDescriptionTypeA_1.ActivityDescriptionTypeA()),
				this.GetItem(2)),
			n =
				((this.UNe = new ActivityRewardList_1.ActivityRewardList()),
				this.GetItem(3));
		(this.ANe = new ActivityFunctionalTypeA_1.ActivityFunctionalTypeA()),
			await Promise.all([
				this.LNe.CreateThenShowByActorAsync(e.GetOwner()),
				this.DNe.CreateThenShowByActorAsync(t.GetOwner()),
				this.UNe.CreateThenShowByActorAsync(i.GetOwner()),
				this.ANe.CreateThenShowByActorAsync(n.GetOwner()),
			]),
			this.UNe.InitGridLayout(this.UNe.InitCommonGridItem),
			(this.pUn = new ButtonItem_1.ButtonItem(this.GetItem(4))),
			(this.vUn = new ButtonItem_1.ButtonItem(this.GetItem(5))),
			this.pUn.SetFunction(this.MUn),
			this.vUn.SetFunction(this.SUn);
	}
	OnSequenceClose(e) {}
	OnStart() {}
	OnBeforeShow() {
		this.x6e(), this.Jwn();
	}
	OnBeforeHide() {
		(ModelManager_1.ModelManager.FragmentMemoryModel.ActivitySubViewTryPlayAnimation =
			""),
			this.ILn();
	}
	OnRefreshView() {
		this.ActivityBaseData.LocalConfig &&
			(this.Pqe(),
			this.mGe(),
			this.jqe(),
			this.VNe(),
			this._Oe(),
			this.ZGe(),
			this.$wn(),
			this.Ywn(),
			this.Jwn(),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.RefreshCommonActivityRedDot,
				this.ActivityBaseData.Id,
			));
	}
	Jwn() {
		StringUtils_1.StringUtils.IsEmpty(
			ModelManager_1.ModelManager.FragmentMemoryModel
				.ActivitySubViewTryPlayAnimation,
		)
			? this.LevelSequencePlayer?.GetCurrentSequence() === START01
				? (this.LevelSequencePlayer?.StopSequenceByKey(START01),
					this.LevelSequencePlayer?.ReplaySequenceByKey(START01))
				: this.LevelSequencePlayer?.PlaySequencePurely(START01)
			: (this.LevelSequencePlayer?.PlaySequencePurely(
					ModelManager_1.ModelManager.FragmentMemoryModel
						.ActivitySubViewTryPlayAnimation,
				),
				(ModelManager_1.ModelManager.FragmentMemoryModel.ActivitySubViewTryPlayAnimation =
					""));
	}
	x6e() {
		this.pUn?.UnBindRedDot(), this.pUn?.BindRedDot("FragmentMemoryEntrance");
	}
	ILn() {
		this.pUn?.UnBindRedDot();
	}
	_Oe() {
		var e = this.ActivityBaseData.IsUnLock();
		this.ANe.SetPanelConditionVisible(!e),
			e ||
				this.ANe.SetLockTextByText(
					MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
						this.GetCurrentLockConditionText(),
					),
				);
	}
	ZGe() {
		var e = this.ActivityBaseData.IsUnLock();
		this.pUn.SetActive(e), this.vUn.SetActive(e);
	}
	mGe() {
		this.LNe.SetTitleByText(this.ActivityBaseData.GetTitle());
		var [e, t] = this.GetTimeVisibleAndRemainTime();
		this.LNe.SetTimeTextVisible(e), e && this.LNe.SetTimeTextByText(t);
	}
	OnTimer(e) {
		this.mGe();
	}
	Pqe() {
		var e = (t = this.ActivityBaseData.LocalConfig).DescTheme,
			t = t.Desc,
			i = !StringUtils_1.StringUtils.IsEmpty(e);
		this.DNe.SetTitleVisible(i),
			i && this.DNe.SetTitleByTextId(e),
			this.DNe.SetContentByTextId(t);
	}
	jqe() {
		var e = this.ActivityBaseData.GetPreviewReward();
		this.UNe.SetTitleByTextId("FragmentMemoryCollectReward"),
			this.UNe.RefreshItemLayout(e);
	}
	VNe() {
		var e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
			"FragmentMemoryEnterText",
		);
		this.ANe.FunctionButton.SetText(e);
	}
	$wn() {
		var e = this.ActivityBaseData.IsUnLock();
		this.pUn?.SetActive(e);
	}
	Ywn() {
		var e = this.ActivityBaseData.GetPreGuideQuestFinishState(),
			t = this.ActivityBaseData.IsUnLock();
		this.vUn?.SetActive(t && e);
	}
}
exports.FragmentMemorySubView = FragmentMemorySubView;
