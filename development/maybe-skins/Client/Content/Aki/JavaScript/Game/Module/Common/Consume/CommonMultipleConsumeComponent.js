"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CommonMultipleConsumeFunction =
		exports.CommonMultipleConsumeComponent =
			void 0);
const UE = require("ue"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView"),
	UiComponentUtil_1 = require("../../Util/UiComponentUtil"),
	ButtonItem_1 = require("../Button/ButtonItem"),
	CommonConditionFilterComponent_1 = require("./CommonConditionFilterComponent"),
	ConsumeItem_1 = require("./ConsumeItem");
class CommonMultipleConsumeComponent extends UiPanelBase_1.UiPanelBase {
	constructor(t, e, o = !0, i = void 0) {
		super(),
			(this.ConsumeFunction = e),
			(this.NeedConditionFilter = o),
			(this.BelongView = i),
			(this.StrengthItem = void 0),
			(this.LoopScrollView = void 0),
			(this.ConsumeList = []),
			(this.CommonConditionFilterComponent = void 0),
			(this.MaxCount = 0),
			(this.EnoughMoney = !0),
			(this.QualityId = 0),
			(this.QIt = !0),
			(this.XIt = "WeaponLevelUpText"),
			(this.$It = void 0),
			(this.YIt = () => {
				this.ConsumeFunction.AutoFunction &&
					this.ConsumeFunction.AutoFunction(this.QualityId);
			}),
			(this.JIt = () => {
				this.CommonConditionFilterComponent.UpdateComponent(this.QualityId);
			}),
			(this.zIt = (t, e) => {
				(this.QualityId = t),
					this.GetText(10).ShowTextNew(e),
					this.$It && this.$It(t);
			}),
			(this.sGe = () => {
				var t = new ConsumeItem_1.ConsumeItem(void 0, this.BelongView);
				return (
					t.SetButtonFunction(this.ConsumeFunction.MaterialItemFunction), t
				);
			}),
			(this.Xqe = (t) => this.ConsumeList[t]),
			this.CreateThenShowByActor(t.GetOwner());
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UITexture],
			[1, UE.UIText],
			[2, UE.UITexture],
			[3, UE.UIText],
			[4, UE.UILoopScrollViewComponent],
			[5, UE.UIButtonComponent],
			[6, UE.UIText],
			[7, UE.UIItem],
			[8, UE.UIItem],
			[9, UE.UIButtonComponent],
			[10, UE.UIText],
			[11, UE.UIItem],
			[12, UE.UIItem],
			[13, UE.UIItem],
			[14, UE.UIItem],
		]),
			(this.BtnBindInfo = [
				[5, this.YIt],
				[9, this.JIt],
			]);
	}
	OnStart() {
		(this.StrengthItem = new ButtonItem_1.ButtonItem(this.GetItem(7))),
			this.StrengthItem.SetFunction(this.ConsumeFunction.StrengthFunction);
		var t = this.GetLoopScrollViewComponent(4),
			e = this.GetItem(8).GetOwner();
		(this.LoopScrollView = new LoopScrollView_1.LoopScrollView(t, e, this.sGe)),
			this.GetButton(9).RootUIComp.SetUIActive(this.NeedConditionFilter),
			this.NeedConditionFilter &&
				((this.CommonConditionFilterComponent =
					new CommonConditionFilterComponent_1.CommonConditionFilterComponent(
						this.GetItem(11),
						this.zIt,
					)),
				this.CommonConditionFilterComponent.RefreshQualityList(
					ConfigManager_1.ConfigManager.CommonConfig.GetItemQualityList(),
				),
				this.CommonConditionFilterComponent.SetActive(!1)),
			(this.MaxCount =
				ConfigManager_1.ConfigManager.WeaponConfig.GetMaterialItemMaxCount());
	}
	RefreshConditionFilter(t, e) {
		(this.QualityId = t), this.GetText(10).ShowTextNew(e);
	}
	OnBeforeDestroy() {
		this.StrengthItem &&
			(this.StrengthItem.Destroy(), (this.StrengthItem = void 0)),
			this.CommonConditionFilterComponent &&
				(this.CommonConditionFilterComponent.Destroy(),
				(this.CommonConditionFilterComponent = void 0));
	}
	UpdateComponent(t, e, o) {
		this.SetMaxState(!1),
			(this.ConsumeList = o),
			this.LoopScrollView.ReloadProxyData(this.Xqe, this.MaxCount),
			LguiUtil_1.LguiUtil.SetLocalText(
				this.GetText(6),
				"WeaponMaterialLengthText",
				o.length,
				this.MaxCount,
			);
		o = this.GetText(1);
		var i = this.GetText(3);
		t = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerMoney(t);
		this.EnoughMoney = UiComponentUtil_1.UiComponentUtil.SetMoneyState(
			o,
			i,
			e,
			t,
		);
	}
	SetMaxState(t) {
		this.GetItem(12).SetUIActive(!t),
			this.QIt && this.GetItem(13).SetUIActive(!t),
			this.SetStrengthItemEnable(!t),
			t
				? this.SetStrengthItemText("LevelUpMax")
				: this.SetStrengthItemText(this.XIt);
	}
	SetStrengthItemText(t) {
		this.StrengthItem.SetLocalText(t);
	}
	SetStrengthTextCode(t) {
		this.XIt = t;
	}
	SetStrengthItemEnable(t) {
		this.StrengthItem.SetEnableClick(t);
	}
	GetConsumeListSize() {
		return this.ConsumeList.length;
	}
	GetEnoughMoney() {
		return this.EnoughMoney;
	}
	SetIsNeedShowMaterial(t) {
		this.QIt = t;
	}
	ShowMaterialItem(t) {
		this.GetItem(13).SetUIActive(t);
	}
	ShowConditionViewItem(t) {
		this.GetItem(11).SetUIActive(t);
	}
	SetIsNeedShowTitleLayout(t) {
		this.GetItem(14).SetUIActive(t);
	}
	SetMaxCount(t) {
		this.MaxCount = t;
	}
	SetConsumeTexture(t) {
		this.SetItemIcon(this.GetTexture(0), t),
			this.SetItemIcon(this.GetTexture(2), t);
	}
	GetSelfLoopScroll() {
		return this.LoopScrollView;
	}
	SetConditionFilterFunction(t) {
		this.$It = t;
	}
}
exports.CommonMultipleConsumeComponent = CommonMultipleConsumeComponent;
class CommonMultipleConsumeFunction {
	constructor() {
		(this.AutoFunction = void 0),
			(this.DeleteSelectFunction = void 0),
			(this.MaterialItemFunction = void 0),
			(this.StrengthFunction = void 0),
			(this.ReduceItemFunction = void 0),
			(this.ItemClickFunction = void 0);
	}
}
exports.CommonMultipleConsumeFunction = CommonMultipleConsumeFunction;
