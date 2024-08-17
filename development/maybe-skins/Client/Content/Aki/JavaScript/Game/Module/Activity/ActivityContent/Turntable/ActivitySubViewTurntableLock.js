"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ActivitySubViewTurntableLock = void 0);
const UE = require("ue"),
	StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
	UiManager_1 = require("../../../../Ui/UiManager"),
	ActivitySubViewBase_1 = require("../../View/SubView/ActivitySubViewBase"),
	ActivityDescriptionTypeA_1 = require("../UniversalComponents/Content/ActivityDescriptionTypeA"),
	ActivityRewardList_1 = require("../UniversalComponents/Content/ActivityRewardList"),
	ActivityFunctionalTypeA_1 = require("../UniversalComponents/Functional/ActivityFunctionalTypeA"),
	ActivityTitleTypeA_1 = require("../UniversalComponents/Title/ActivityTitleTypeA");
class ActivitySubViewTurntableLock extends ActivitySubViewBase_1.ActivitySubViewBase {
	constructor() {
		super(...arguments),
			(this.ActivityTurntableData = void 0),
			(this.LNe = void 0),
			(this.DNe = void 0),
			(this.UNe = void 0),
			(this.ANe = void 0),
			(this.u2e = () => {
				var t;
				this.ActivityBaseData.GetPreGuideQuestFinishState() ||
					((t = this.ActivityBaseData.GetUnFinishPreGuideQuestId()),
					this.ActivityTurntableData.SavePreQuestRedDot(t),
					UiManager_1.UiManager.OpenView("QuestView", t));
			});
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
			[2, UE.UIItem],
			[3, UE.UIItem],
			[4, UE.UIItem],
		];
	}
	OnSetData() {
		this.ActivityTurntableData = this.ActivityBaseData;
	}
	async OnBeforeStartAsync() {
		var t = this.GetItem(1);
		(this.LNe = new ActivityTitleTypeA_1.ActivityTitleTypeA()),
			await this.LNe.CreateThenShowByActorAsync(t.GetOwner()),
			(t = this.GetItem(2)),
			(this.DNe = new ActivityDescriptionTypeA_1.ActivityDescriptionTypeA()),
			await this.DNe.CreateThenShowByActorAsync(t.GetOwner()),
			(t = this.GetItem(3)),
			(this.UNe = new ActivityRewardList_1.ActivityRewardList()),
			await this.UNe.CreateThenShowByActorAsync(t.GetOwner()),
			(t = this.GetItem(4));
		(this.ANe = new ActivityFunctionalTypeA_1.ActivityFunctionalTypeA()),
			await this.ANe.CreateThenShowByActorAsync(t.GetOwner());
	}
	OnStart() {
		var t,
			e,
			i = this.ActivityBaseData.LocalConfig;
		i &&
			(this.LNe.SetTitleByText(this.ActivityBaseData.GetTitle()),
			(t = i.DescTheme),
			(i = i.Desc),
			(e = !StringUtils_1.StringUtils.IsEmpty(t)),
			this.DNe.SetTitleVisible(e),
			e && this.DNe.SetTitleByTextId(t),
			this.DNe.SetContentByTextId(i),
			(e = this.ActivityBaseData.GetPreviewReward()),
			this.UNe.SetTitleByTextId("CollectActivity_reward"),
			this.UNe.InitGridLayout(this.UNe.InitCommonGridItem),
			this.UNe.RefreshItemLayout(e),
			this.ANe.FunctionButton?.BindCallback(this.u2e),
			this.ANe.FunctionButton.RefreshText("CollectActivity_Button_ahead"));
	}
	OnRefreshView() {
		this.FNe(), this.Xke(), this.BNe();
	}
	OnTimer(t) {
		this.FNe();
	}
	Xke() {
		var t = this.ActivityBaseData.IsUnLock();
		this.ANe.FunctionButton?.SetUiActive(t),
			this.ANe.SetPanelConditionVisible(!t),
			t ||
				(this.ANe.FunctionButton?.SetUiActive(!1),
				(t = this.GetCurrentLockConditionText()),
				this.ANe.SetLockTextByTextId(t));
	}
	FNe() {
		var [t, e] = this.GetTimeVisibleAndRemainTime();
		this.LNe.SetTimeTextVisible(t), t && this.LNe.SetTimeTextByText(e);
	}
	BNe() {
		var t = this.ActivityTurntableData.IsHasPreQuestRedDot();
		this.ANe.SetFunctionRedDotVisible(t);
	}
}
exports.ActivitySubViewTurntableLock = ActivitySubViewTurntableLock;
