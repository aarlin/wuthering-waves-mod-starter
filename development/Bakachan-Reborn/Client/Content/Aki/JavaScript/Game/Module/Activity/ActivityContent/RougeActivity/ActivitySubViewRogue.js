"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ActivitySubViewRogue = void 0);
const UE = require("ue"),
	MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
	StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	UiManager_1 = require("../../../../Ui/UiManager"),
	ActivitySubViewBase_1 = require("../../View/SubView/ActivitySubViewBase"),
	ActivityDescriptionTypeA_1 = require("../UniversalComponents/Content/ActivityDescriptionTypeA"),
	ActivityRewardList_1 = require("../UniversalComponents/Content/ActivityRewardList"),
	ActivityFunctionalTypeA_1 = require("../UniversalComponents/Functional/ActivityFunctionalTypeA"),
	ActivityTitleTypeA_1 = require("../UniversalComponents/Title/ActivityTitleTypeA"),
	ActivityRogueController_1 = require("./ActivityRogueController");
class ActivitySubViewRogue extends ActivitySubViewBase_1.ActivitySubViewBase {
	constructor() {
		super(...arguments),
			(this.ActivityBaseData = void 0),
			(this.LNe = void 0),
			(this.DNe = void 0),
			(this.UNe = void 0),
			(this.ANe = void 0),
			(this.u2e = () => {
				var t = this.ActivityBaseData.GetPreGuideQuestFinishState(),
					e = this.ActivityBaseData.GetRogueActivityState();
				t || 0 !== e
					? ActivityRogueController_1.ActivityRogueController.ActivityFunctionExecute(
							this.ActivityBaseData.Id,
						)
					: ((t = this.ActivityBaseData.GetUnFinishPreGuideQuestId()),
						UiManager_1.UiManager.OpenView("QuestView", t),
						ModelManager_1.ModelManager.ActivityModel.SendActivityViewJumpClickLogData(
							this.ActivityBaseData,
							1,
						)),
					(this.ActivityBaseData.FunctionBtnRedDot = !1);
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
	OnSetData() {}
	async OnBeforeStartAsync() {
		var t = this.GetItem(0);
		(this.LNe = new ActivityTitleTypeA_1.ActivityTitleTypeA()),
			await this.LNe.CreateThenShowByActorAsync(t.GetOwner()),
			(t = this.GetItem(1)),
			(this.DNe = new ActivityDescriptionTypeA_1.ActivityDescriptionTypeA()),
			await this.DNe.CreateThenShowByActorAsync(t.GetOwner()),
			(t = this.GetItem(2)),
			(this.UNe = new ActivityRewardList_1.ActivityRewardList()),
			await this.UNe.CreateThenShowByActorAsync(t.GetOwner()),
			(t = this.GetItem(3));
		(this.ANe = new ActivityFunctionalTypeA_1.ActivityFunctionalTypeA()),
			await this.ANe.CreateThenShowByActorAsync(t.GetOwner());
	}
	OnStart() {
		var t,
			e = this.ActivityBaseData.LocalConfig,
			i = this.ActivityBaseData.GetExtraConfig();
		e &&
			i &&
			((i = e.DescTheme),
			(t = !StringUtils_1.StringUtils.IsEmpty(i)),
			this.LNe.SetSubTitleVisible(t),
			t && this.LNe.SetSubTitleByTextId(i),
			this.LNe.SetTitleByText(this.ActivityBaseData.GetTitle()),
			(t = e.Desc),
			this.DNe.SetContentByTextId(t),
			this.DNe.SetTitleVisible(!1),
			(i = this.ActivityBaseData.GetPreviewReward()),
			this.UNe.SetTitleByTextId("CollectActivity_reward"),
			this.UNe.InitGridLayout(this.UNe.InitCommonGridItem),
			this.UNe.RefreshItemLayout(i),
			this.ANe.FunctionButton?.BindCallback(this.u2e),
			(e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
				"CollectActivity_Button_ahead",
			)),
			this.ANe.FunctionButton.SetText(e),
			this.OnRefreshView());
	}
	OnRefreshView() {
		this.Xke(), this.FNe(), this.BNe();
	}
	OnTimer(t) {
		this.OnRefreshView();
	}
	BNe() {
		this.ANe?.SetFunctionRedDotVisible(this.ActivityBaseData.RedPointShowState);
	}
	FNe() {
		var t;
		0 === this.ActivityBaseData.GetRogueActivityState()
			? (([, t] = this.GetTimeVisibleAndRemainTime()),
				this.LNe.SetTimeTextByText(t))
			: this.LNe.SetTimeTextByTextId("Rogue_Function_End_Tip");
	}
	Xke() {
		var t,
			e = this.ActivityBaseData.GetExtraConfig();
		e &&
			((t = this.ActivityBaseData.IsUnLock()),
			(e = 0 === e.FunctionType),
			t
				? e
					? (this.ANe.FunctionButton?.SetUiActive(!1),
						this.ANe.SetPanelConditionVisible(!1))
					: ((t = this.ActivityBaseData.GetRogueActivityState()),
						this.ANe.FunctionButton?.SetUiActive(2 !== t),
						this.ANe.SetPanelConditionVisible(2 === t),
						this.ANe.SetLockTextByTextId("Rogue_Function_End_Tip"))
				: (this.ANe.FunctionButton?.SetUiActive(!1),
					(e = this.GetCurrentLockConditionText()),
					this.ANe.SetLockTextByTextId(e),
					this.ANe.SetPanelConditionVisible(!0)));
	}
}
exports.ActivitySubViewRogue = ActivitySubViewRogue;
