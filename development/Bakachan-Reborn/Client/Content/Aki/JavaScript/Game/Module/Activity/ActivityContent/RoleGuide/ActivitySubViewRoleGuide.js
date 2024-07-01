"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ActivitySubViewRoleGuide = void 0);
const UE = require("ue"),
	MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
	StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	UiManager_1 = require("../../../../Ui/UiManager"),
	RoleController_1 = require("../../../RoleUi/RoleController"),
	ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController"),
	ActivitySubViewBase_1 = require("../../View/SubView/ActivitySubViewBase"),
	ActivityRoleDescribeComponent_1 = require("../UniversalComponents/ActivityRoleDescribeComponent"),
	ActivitySmallItemGrid_1 = require("../UniversalComponents/ActivitySmallItemGrid"),
	ActivityDescriptionTypeB_1 = require("../UniversalComponents/Content/ActivityDescriptionTypeB"),
	ActivityRewardList_1 = require("../UniversalComponents/Content/ActivityRewardList"),
	ActivityFunctionalTypeA_1 = require("../UniversalComponents/Functional/ActivityFunctionalTypeA"),
	ActivityTitleTypeA_1 = require("../UniversalComponents/Title/ActivityTitleTypeA");
class ActivitySubViewRoleGuide extends ActivitySubViewBase_1.ActivitySubViewBase {
	constructor() {
		super(...arguments),
			(this.ActivityBaseData = void 0),
			(this.LNe = void 0),
			(this.DNe = void 0),
			(this.UNe = void 0),
			(this.Dke = void 0),
			(this.ANe = void 0),
			(this.Rke = () => new ActivitySmallItemGrid_1.ActivitySmallItemGrid()),
			(this.Uke = () => {
				var e = this.ActivityBaseData.ShowQuestId;
				2 === ModelManager_1.ModelManager.QuestNewModel.GetQuestState(e)
					? UiManager_1.UiManager.OpenView("QuestView", e)
					: ((e = this.ActivityBaseData.RoleGuideConfig.ShowQuestGetWay),
						StringUtils_1.StringUtils.IsEmpty(e) ||
							((e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e)),
							StringUtils_1.StringUtils.IsEmpty(e)) ||
							ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(
								e,
							));
			}),
			(this.Ake = () => {
				var e = this.ActivityBaseData.RoleQuestId;
				2 === ModelManager_1.ModelManager.QuestNewModel.GetQuestState(e) &&
					UiManager_1.UiManager.OpenView("QuestView", e);
			}),
			(this.Pke = () => {
				var e = [this.ActivityBaseData.RoleTrialId];
				RoleController_1.RoleController.OpenRoleMainView(1, 0, e);
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
			[2, UE.UIItem],
			[3, UE.UIItem],
			[4, UE.UIItem],
			[5, UE.UIItem],
			[6, UE.UIItem],
			[7, UE.UIText],
			[8, UE.UIButtonComponent],
			[9, UE.UIItem],
			[10, UE.UIButtonComponent],
		]),
			(this.BtnBindInfo = [
				[8, this.Uke],
				[10, this.Pke],
			]);
	}
	OnSetData() {}
	async OnBeforeStartAsync() {
		var e = this.GetItem(0),
			t =
				((e =
					((this.LNe = new ActivityTitleTypeA_1.ActivityTitleTypeA()),
					await this.LNe.CreateThenShowByActorAsync(e.GetOwner()),
					this.GetItem(1))),
				(e =
					((this.DNe =
						new ActivityDescriptionTypeB_1.ActivityDescriptionTypeB()),
					await this.DNe.CreateThenShowByActorAsync(e.GetOwner()),
					this.GetItem(2))),
				(e =
					((this.UNe = new ActivityRewardList_1.ActivityRewardList()),
					await this.UNe.CreateThenShowByActorAsync(e.GetOwner()),
					this.GetItem(4))),
				(e =
					((this.Dke =
						new ActivityRoleDescribeComponent_1.ActivityRoleDescribeComponent()),
					await this.Dke.CreateThenShowByActorAsync(e.GetOwner()),
					this.GetItem(3))),
				(e =
					((this.ANe = new ActivityFunctionalTypeA_1.ActivityFunctionalTypeA()),
					await this.ANe.CreateThenShowByActorAsync(e.GetOwner()),
					this.GetItem(9))),
				this.ActivityBaseData.GetRoleResourcePath());
		StringUtils_1.StringUtils.IsEmpty(t) || (await this.LoadPrefabAsync(t, e));
	}
	OnStart() {
		var e = this.ActivityBaseData.LocalConfig;
		this.LNe.SetTitleByText(this.ActivityBaseData.GetTitle()),
			this.DNe.SetContentVisible(!StringUtils_1.StringUtils.IsEmpty(e?.Desc)),
			e?.Desc && this.DNe.SetContentByTextId(e.Desc),
			this.DNe.SetTitleVisible(
				!StringUtils_1.StringUtils.IsEmpty(e?.DescTheme),
			),
			e?.DescTheme && this.DNe.SetTitleByTextId(e.DescTheme),
			this.UNe.SetTitleByTextId("Activity_RoleGuideActivity_RewardDesc"),
			this.UNe.InitGridLayout(this.Rke),
			this.ANe.FunctionButton.BindCallback(this.Ake),
			(e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
				"CollectActivity_Button_ahead",
			));
		this.ANe.FunctionButton.SetText(e),
			this.Dke.Update(this.ActivityBaseData.RoleId),
			this.OnRefreshView();
	}
	OnRefreshView() {
		this.FNe(), this.xke(), this.jqe(), this._Oe();
	}
	OnTimer(e) {
		this.FNe();
	}
	FNe() {
		var [e, t] = this.GetTimeVisibleAndRemainTime();
		this.LNe.SetTimeTextVisible(e), e && this.LNe.SetTimeTextByText(t);
	}
	xke() {
		var e,
			t = this.ActivityBaseData?.ShowQuestId;
		t
			? ((t = 3 !== ModelManager_1.ModelManager.QuestNewModel.GetQuestState(t)),
				(e = ModelManager_1.ModelManager.QuestNewModel.GetQuestState(
					this.ActivityBaseData.RoleQuestId,
				)),
				(t = t && !(3 === e)),
				this.GetItem(6).SetUIActive(t),
				t &&
					((e = this.ActivityBaseData.RoleGuideConfig.ShowQuestTips),
					(t = !StringUtils_1.StringUtils.IsEmpty(e)),
					this.GetText(7).SetUIActive(t),
					t) &&
					this.GetText(7).ShowTextNew(e))
			: this.GetItem(6).SetUIActive(!1);
	}
	jqe() {
		var e =
				3 ===
				ModelManager_1.ModelManager.QuestNewModel.GetQuestState(
					this.ActivityBaseData.RoleQuestId,
				),
			t = [];
		for (const s of this.ActivityBaseData.GetPreviewReward()) {
			var i = { Item: s, HasClaimed: e };
			t.push(i);
		}
		this.UNe.RefreshItemLayout(t);
	}
	_Oe() {
		var e,
			t = ModelManager_1.ModelManager.QuestNewModel.GetQuestState(
				this.ActivityBaseData.RoleQuestId,
			),
			i = this.ActivityBaseData.IsUnLock();
		t = 3 === t;
		i ||
			((e = this.GetCurrentLockConditionText()),
			this.ANe.SetLockTextByTextId(e)),
			this.ANe.SetPanelConditionVisible(!i),
			this.ANe.FunctionButton.SetActive(i && !t),
			this.GetItem(5)?.SetUIActive(i && t);
	}
}
exports.ActivitySubViewRoleGuide = ActivitySubViewRoleGuide;
