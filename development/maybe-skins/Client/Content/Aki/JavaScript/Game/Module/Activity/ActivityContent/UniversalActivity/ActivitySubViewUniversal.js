"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ActivitySubViewUniversal = void 0);
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
	ActivityUniversalController_1 = require("./ActivityUniversalController");
class ActivitySubViewUniversal extends ActivitySubViewBase_1.ActivitySubViewBase {
	constructor() {
		super(...arguments),
			(this.ActivityBaseData = void 0),
			(this.LNe = void 0),
			(this.DNe = void 0),
			(this.UNe = void 0),
			(this.ANe = void 0),
			(this.u2e = () => {
				var t;
				this.ActivityBaseData.GetPreGuideQuestFinishState()
					? ActivityUniversalController_1.ActivityUniversalController.ActivityFunctionExecute(
							this.ActivityBaseData.Id,
						)
					: ((t = this.ActivityBaseData.GetUnFinishPreGuideQuestId()),
						UiManager_1.UiManager.OpenView("QuestView", t),
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
			(this.LNe.SetTitleByText(this.ActivityBaseData.GetTitle()),
			(i = e.DescTheme),
			(e = e.Desc),
			(t = !StringUtils_1.StringUtils.IsEmpty(i)),
			this.DNe.SetTitleVisible(t),
			t && this.DNe.SetTitleByTextId(i),
			this.DNe.SetContentByTextId(e),
			(t = this.ActivityBaseData.GetPreviewReward()),
			this.UNe.SetTitleByTextId("CollectActivity_reward"),
			this.UNe.InitGridLayout(this.UNe.InitCommonGridItem),
			this.UNe.RefreshItemLayout(t),
			this.ANe.FunctionButton?.BindCallback(this.u2e),
			(i = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
				"CollectActivity_Button_ahead",
			)),
			this.ANe.FunctionButton.SetText(i),
			this.OnRefreshView());
	}
	OnRefreshView() {
		this.Xke(), this.FNe();
	}
	FNe() {
		var [t, e] = this.GetTimeVisibleAndRemainTime();
		this.LNe.SetTimeTextVisible(t), t && this.LNe.SetTimeTextByText(e);
	}
	Xke() {
		var t,
			e,
			i = this.ActivityBaseData.GetExtraConfig();
		i &&
			((t = this.ActivityBaseData.IsUnLock()),
			(i = 0 === i.FunctionType),
			(e = this.ActivityBaseData.GetPreGuideQuestFinishState()),
			this.ANe.SetPanelConditionVisible(!t),
			t
				? this.ANe.FunctionButton?.SetUiActive(!i || !e)
				: this.ANe.FunctionButton?.SetUiActive(!1),
			t ||
				((i = this.GetCurrentLockConditionText()),
				this.ANe.SetLockTextByTextId(i)));
	}
}
exports.ActivitySubViewUniversal = ActivitySubViewUniversal;
