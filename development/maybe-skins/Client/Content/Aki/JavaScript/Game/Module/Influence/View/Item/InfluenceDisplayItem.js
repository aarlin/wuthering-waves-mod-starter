"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.InfluenceDisplayItem = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../../Core/Common/Log"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	RedDotController_1 = require("../../../../RedDot/RedDotController"),
	UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
	UiManager_1 = require("../../../../Ui/UiManager"),
	ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController"),
	LguiUtil_1 = require("../../../Util/LguiUtil");
class InfluenceDisplayItem extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(),
			(this.yGe = void 0),
			(this.Ini = 0),
			(this.Tni = 0),
			(this.U4e = void 0),
			(this.Xy = 0),
			(this.T7e = () => {
				var e = this.IsUnLock();
				return (
					e ||
						ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
							"InfluenceLockTips",
						),
					e
				);
			}),
			(this.Lni = (e) => {
				1 === e ? this.SetActiveToggleState() : this.Dni(),
					this.U4e?.(e, this.Xy);
			}),
			this.CreateThenShowByActor(e.GetOwner());
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIText],
			[2, UE.UIExtendToggle],
			[5, UE.UIItem],
			[4, UE.UISprite],
			[3, UE.UIItem],
			[6, UE.UIItem],
			[7, UE.UIItem],
			[8, UE.UIItem],
			[10, UE.UIItem],
			[9, UE.UITexture],
		]),
			(this.BtnBindInfo = [[2, this.Lni]]);
	}
	OnStart() {
		this.GetExtendToggle(2).CanExecuteChange.Bind(this.T7e),
			(this.yGe = new ContentItem(this.GetItem(8))),
			this.yGe.SetActive(!1);
	}
	OnBeforeDestroy() {
		var e = this.GetExtendToggle(2);
		e.SetToggleState(0),
			e.CanExecuteChange.Unbind(),
			this.Dpt(),
			this.yGe.Destroy(),
			(this.yGe = void 0);
	}
	UpdateItem(e, t) {
		this.Tni = e;
		var i =
			ModelManager_1.ModelManager.InfluenceReputationModel.GetInfluenceInstance(
				e,
			);
		i && (this.Ini = i.Relation), this.Rni(e, t), this.x6e();
	}
	SetToggleState(e, t = !1) {
		this.GetExtendToggle(2).SetToggleState(e, t);
	}
	SetToggleFunction(e) {
		this.U4e = e;
	}
	SetIndex(e) {
		this.Xy = e;
	}
	SetActiveToggleState() {
		this.yGe.SetActive(!0),
			this.yGe.BindRedDot(),
			this.GetItem(10).SetUIActive(!1);
	}
	SetDisActiveToggleState() {
		this.SetToggleState(0), this.Dni();
	}
	Dni() {
		this.yGe.SetActive(!1), this.x6e();
	}
	Rni(e, t) {
		var i = this.GetText(0),
			n = this.GetText(1),
			o = this.GetTexture(9);
		this.GetItem(5).SetUIActive(1 === this.Ini),
			this.GetItem(3).SetUIActive(2 === this.Ini),
			this.GetItem(6).SetUIActive(3 === this.Ini),
			this.GetItem(7).SetUIActive(0 === this.Ini),
			0 === this.Ini
				? (i.SetUIActive(!1),
					o.SetUIActive(!1),
					LguiUtil_1.LguiUtil.SetLocalText(n, "InfluenceLockName"))
				: ((i =
						ConfigManager_1.ConfigManager.InfluenceConfig.GetInfluenceConfig(
							e,
						)),
					(n = this.GetText(0)),
					i.ExtraDesc
						? (n.SetUIActive(!0),
							LguiUtil_1.LguiUtil.SetLocalTextNew(n, i.ExtraDesc))
						: n.SetUIActive(!1),
					LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), i.Title),
					this.yGe.UpdateItem(e, t, this.Ini),
					2 === this.Ini &&
						((n =
							ModelManager_1.ModelManager.InfluenceReputationModel.GetReputationProgress(
								e,
							)),
						this.GetSprite(4).SetFillAmount(n.Current / n.Max)),
					o.SetUIActive(!0),
					this.SetTextureByPath(i.Logo, o));
	}
	x6e() {
		RedDotController_1.RedDotController.BindRedDot(
			"InfluenceReward",
			this.GetItem(10),
			void 0,
			this.Tni,
		);
	}
	Dpt() {
		RedDotController_1.RedDotController.UnBindRedDot("InfluenceReward");
	}
	IsUnLock() {
		return 0 !== this.Ini;
	}
}
exports.InfluenceDisplayItem = InfluenceDisplayItem;
class ContentItem extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(),
			(this.Tni = 0),
			(this.z4t = 0),
			(this.xUt = () => {
				var e = { InfluenceId: this.Tni, CountryId: this.z4t };
				UiManager_1.UiManager.OpenView("ReputationDetailsView", e);
			}),
			this.CreateThenShowByActor(e.GetOwner());
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIButtonComponent],
			[2, UE.UIItem],
			[3, UE.UIText],
		]),
			(this.BtnBindInfo = [[1, this.xUt]]);
	}
	UpdateItem(e, t, i) {
		(this.Tni = e), (this.z4t = t), this.Uni(), this.Rni(i);
	}
	Rni(e) {
		var t = this.GetButton(1),
			i = this.GetText(3);
		1 === e
			? (t.RootUIComp.SetUIActive(!1),
				i.SetUIActive(!0),
				LguiUtil_1.LguiUtil.SetLocalText(i, "InfluenceBelongTips"))
			: 3 === e
				? (t.RootUIComp.SetUIActive(!1),
					i.SetUIActive(!0),
					LguiUtil_1.LguiUtil.SetLocalText(i, "InfluenceHostilityTips"))
				: 2 === e
					? (t.RootUIComp.SetUIActive(!0), i.SetUIActive(!1))
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error("InfluenceReputation", 11, "出现未知关系类型", [
							"Relation",
							e,
						]);
	}
	Uni() {
		var e = ConfigManager_1.ConfigManager.InfluenceConfig.GetInfluenceConfig(
			this.Tni,
		);
		LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e.Introduction);
	}
	BindRedDot() {
		RedDotController_1.RedDotController.BindRedDot(
			"InfluenceReward",
			this.GetItem(2),
			void 0,
			this.Tni,
		);
	}
}
