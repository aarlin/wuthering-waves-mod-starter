"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoguelikeSkillView = void 0);
const UE = require("ue"),
	ConfigCommon_1 = require("../../../../Core/Config/ConfigCommon"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
	PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem"),
	UiManager_1 = require("../../../Ui/UiManager"),
	GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew"),
	RoguelikeDefine_1 = require("../Define/RoguelikeDefine"),
	RoguelikeSkillDetail_1 = require("./RoguelikeSkillDetail"),
	RoguelikeSkillGridPanel_1 = require("./RoguelikeSkillGridPanel");
class RoguelikeSkillView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.SkillTreeConfigList = new Array()),
			(this.SkillGridList = []),
			(this.CaptionItem = void 0),
			(this.CurSelectNode = void 0),
			(this.SkillDetailPanel = void 0),
			(this.ScrollView = void 0),
			(this.SelectColumn = 0),
			(this.ExecuteCount = 1),
			(this.CreateGridPanel = () =>
				new RoguelikeSkillGridPanel_1.RoguelikeSkillGridPanel()),
			(this.OnSkillLevelUp = (e) => {
				this.ScrollView?.GetScrollItemList().forEach((e) => {
					e.NodeMap.forEach((e) => {
						e.Refresh(),
							this.CaptionItem.SetCurrencyItemList([
								RoguelikeDefine_1.SKILL_POINT_ID,
							]);
					});
				});
			}),
			(this.OnBtnMaskClick = () => {
				this.GetButton(6)
					.GetOwner()
					.GetComponentByClass(UE.UIItem.StaticClass())
					.SetUIActive(!1),
					this.SkillDetailPanel.SetActive(!1),
					this.CurSelectNode.SetToggleState(0);
			}),
			(this.OnBtnSkillOverViewClick = () => {
				UiManager_1.UiManager.OpenView("RoguelikeSkillOverView");
			}),
			(this.OnSelectSkill = (e) => {
				this.CurSelectNode && this.CurSelectNode.SetToggleState(0),
					(ModelManager_1.ModelManager.RoguelikeModel.SelectSkillId =
						e.Data.Id),
					(this.CurSelectNode = e),
					this.CurSelectNode.SetToggleState(1),
					-1 === this.SelectColumn &&
						this.ScrollView?.ScrollTo(e.GridPanelItem),
					this.SkillDetailPanel.Refresh(e.Data),
					this.SkillDetailPanel.SetActive(!0);
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
			[2, UE.UIButtonComponent],
			[3, UE.UIScrollViewWithScrollbarComponent],
			[4, UE.UIItem],
			[5, UE.UIItem],
			[6, UE.UIButtonComponent],
		]),
			(this.BtnBindInfo = [
				[2, this.OnBtnSkillOverViewClick],
				[6, this.OnBtnMaskClick],
			]);
	}
	async OnBeforeStartAsync() {
		(this.SkillDetailPanel = new RoguelikeSkillDetail_1.RoguelikeSkillDetail()),
			await this.SkillDetailPanel.CreateThenShowByActorAsync(
				this.GetItem(1).GetOwner(),
			),
			(this.ScrollView = new GenericScrollViewNew_1.GenericScrollViewNew(
				this.GetScrollViewWithScrollbar(3),
				this.CreateGridPanel,
				this.GetItem(5).GetOwner(),
			)),
			this.BuildSkillTreeConfig(),
			await this.ScrollView.RefreshByDataAsync(this.SkillTreeConfigList);
	}
	OnStart() {
		(this.CaptionItem = new PopupCaptionItem_1.PopupCaptionItem(
			this.GetItem(0),
		)),
			this.CaptionItem.SetCloseCallBack(() => {
				UiManager_1.UiManager.CloseView(this.Info.Name);
			}),
			this.ScrollView.BindLateUpdate((e) => {
				var i;
				0 < this.SelectColumn &&
					2 === this.ExecuteCount &&
					((i = this.ScrollView.GetItemByIndex(this.SelectColumn)),
					this.ScrollView?.ScrollTo(i),
					(this.SelectColumn = -1),
					this.ScrollView.UnBindLateUpdate()),
					this.ExecuteCount++;
			}),
			this.CaptionItem?.SetCurrencyItemList([RoguelikeDefine_1.SKILL_POINT_ID]);
	}
	OnBeforeDestroy() {
		this.ScrollView?.UnBindLateUpdate();
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.RoguelikeSelectSkill,
			this.OnSelectSkill,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.RoguelikeTalentLevelUp,
				this.OnSkillLevelUp,
			);
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.RoguelikeSelectSkill,
			this.OnSelectSkill,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.RoguelikeTalentLevelUp,
				this.OnSkillLevelUp,
			);
	}
	BuildSkillTreeConfig() {
		const e = this.OpenParam;
		let i = ConfigCommon_1.ConfigCommon.ToList(
			ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueTalentTreeConfig(),
		);
		(i = i?.filter((i) => i.SeasonId === e))?.sort(
			(e, i) => e.Column - i.Column,
		);
		for (const e of i)
			this.SkillTreeConfigList[e.Column] ||
				(this.SkillTreeConfigList[e.Column] = new Array()),
				0 ===
					ModelManager_1.ModelManager.RoguelikeModel.RoguelikeSkillDataMap.get(
						e.Id,
					) &&
					e.Column > this.SelectColumn &&
					(this.SelectColumn = e.Column),
				this.SkillTreeConfigList[e.Column].push(e);
		for (const e of this.SkillTreeConfigList) e?.sort((e, i) => e.Row - i.Row);
		ModelManager_1.ModelManager.RoguelikeModel.SelectSkillId =
			ModelManager_1.ModelManager.RoguelikeModel.GetNextCanUnlockSkillId();
	}
}
exports.RoguelikeSkillView = RoguelikeSkillView;
