"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BossRushSubView = void 0);
const UE = require("ue"),
	MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
	StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	UiManager_1 = require("../../../../Ui/UiManager"),
	DifficultUnlockTipView_1 = require("../../../InstanceDungeon/DifficultUnlockTipView"),
	WorldMapController_1 = require("../../../WorldMap/WorldMapController"),
	ActivitySubViewBase_1 = require("../../View/SubView/ActivitySubViewBase"),
	ActivityDescriptionTypeA_1 = require("../UniversalComponents/Content/ActivityDescriptionTypeA"),
	ActivityRewardList_1 = require("../UniversalComponents/Content/ActivityRewardList"),
	ActivityFunctionalArea_1 = require("../UniversalComponents/Functional/ActivityFunctionalArea"),
	ActivityTitleTypeA_1 = require("../UniversalComponents/Title/ActivityTitleTypeA");
class BossRushSubView extends ActivitySubViewBase_1.ActivitySubViewBase {
	constructor() {
		super(...arguments),
			(this.CPr = void 0),
			(this.LNe = void 0),
			(this.DNe = void 0),
			(this.UNe = void 0),
			(this.ANe = void 0),
			(this.yLn = () => {
				this.BNe();
			}),
			(this.uke = () => {
				this.CPr.RebuildData(),
					UiManager_1.UiManager.OpenView(
						"ActivityRewardPopUpView",
						this.CPr.GetRewardViewData(),
					);
			}),
			(this.u2e = () => {
				var e;
				this.ActivityBaseData.GetPreGuideQuestFinishState()
					? ((e = {
							MarkId:
								ConfigManager_1.ConfigManager.BossRushConfig.GetBossRushMarkByActivityId(
									this.ActivityBaseData.Id,
								),
							MarkType: 0,
							OpenAreaId: 0,
						}),
						WorldMapController_1.WorldMapController.OpenView(2, !1, e))
					: ((e = this.ActivityBaseData.GetUnFinishPreGuideQuestId()),
						UiManager_1.UiManager.OpenView("QuestView", e),
						ModelManager_1.ModelManager.ActivityModel.SendActivityViewJumpClickLogData(
							this.ActivityBaseData,
							1,
						));
			});
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
			[2, UE.UIItem],
			[3, UE.UIItem],
		];
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.BossRushDataUpdate,
			this.yLn,
		);
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.BossRushDataUpdate,
			this.yLn,
		);
	}
	async OnBeforeStartAsync() {
		var e = this.GetItem(0),
			t =
				((this.LNe = new ActivityTitleTypeA_1.ActivityTitleTypeA()),
				this.GetItem(1)),
			i =
				((this.DNe = new ActivityDescriptionTypeA_1.ActivityDescriptionTypeA()),
				this.GetItem(2)),
			s =
				((this.UNe = new ActivityRewardList_1.ActivityRewardList()),
				this.GetItem(3));
		(this.ANe = new ActivityFunctionalArea_1.ActivityFunctionalArea()),
			await Promise.all([
				this.LNe.CreateThenShowByActorAsync(e.GetOwner()),
				this.DNe.CreateThenShowByActorAsync(t.GetOwner()),
				this.UNe.CreateThenShowByActorAsync(i.GetOwner()),
				this.ANe.CreateThenShowByActorAsync(s.GetOwner()),
			]),
			this.UNe.InitGridLayout(this.UNe.InitCommonGridItem),
			this.ANe.FunctionButton.SetFunction(this.u2e),
			this.ANe.SetRewardButtonFunction(this.uke);
	}
	OnStart() {
		this.CPr = this.ActivityBaseData;
	}
	OnBeforeShow() {
		this.x6e();
	}
	OnBeforeHide() {
		this.ILn();
	}
	OnRefreshView() {
		this.ActivityBaseData.LocalConfig &&
			(this.Pqe(),
			this.mGe(),
			this.jqe(),
			this.VNe(),
			this.BNe(),
			this._Oe(),
			this.pPr());
	}
	x6e() {
		this.ANe.BindRewardRedDot("BossRushReward", this.CPr.Id);
	}
	ILn() {
		this.ANe.UnbindRewardRedDotById("BossRushReward", this.CPr.Id);
	}
	pPr() {
		var e;
		this.CPr.GetNewUnlockState() &&
			(this.CPr.CacheNewUnlock(),
			((e = new DifficultUnlockTipView_1.DifficultUnlockTipsData()).Text =
				"BossRushUnlockTips"),
			UiManager_1.UiManager.OpenView("DifficultUnlockTipView", e));
	}
	_Oe() {
		var e = this.ActivityBaseData.IsUnLock();
		this.ANe.SetPanelConditionVisible(!e),
			e || this.ANe.SetLockTextByText(this.GetCurrentLockConditionText()),
			this.GetItem(3)?.SetUIActive(e);
	}
	mGe() {
		this.LNe.SetTitleByText(this.ActivityBaseData.GetTitle());
		var [e, t] = this.GetTimeVisibleAndRemainTime();
		this.LNe.SetTimeTextVisible(e), e && this.LNe.SetTimeTextByText(t);
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
		this.UNe.SetTitleByTextId("BossRushCollectReward"),
			this.UNe.RefreshItemLayout(e);
	}
	OnTimer(e) {
		super.OnTimer(e), this.mGe();
	}
	VNe() {
		var e =
			MultiTextLang_1.configMultiTextLang.GetLocalTextNew("BossRushEnterText");
		this.ANe.FunctionButton.SetText(e);
	}
	BNe() {
		var e = this.CPr.EntranceRedDot(),
			t = this.CPr.GetPreGuideQuestFinishState();
		this.ANe.FunctionButton.SetRedDotVisible(t && e);
	}
}
exports.BossRushSubView = BossRushSubView;
