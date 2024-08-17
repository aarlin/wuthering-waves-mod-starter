"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PlotNodeItem = exports.HandBookQuestPlotItem = void 0);
const UE = require("ue"),
	PublicUtil_1 = require("../../Common/PublicUtil"),
	UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
class HandBookQuestPlotItem extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.PlotNodeItem = void 0),
			(this.OAn = void 0),
			(this.iPn = void 0);
	}
	async Init(t) {
		await super.CreateByActorAsync(t.GetOwner(), void 0, !0), await this.Wzt();
	}
	async Wzt() {
		(this.PlotNodeItem = new PlotNodeItem()),
			this.AddChild(this.PlotNodeItem),
			this.GetItem(0).SetUIActive(!1),
			await this.PlotNodeItem.CreateByActorAsync(this.GetItem(1).GetOwner()),
			this.PlotNodeItem.BindClickCallback(this.OAn);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
		];
	}
	GetUsingItem(t) {
		return this.GetItem(1).GetOwner();
	}
	Update(t, e) {
		this.PlotNodeItem.SetUiActive(!0),
			this.PlotNodeItem.Update(t.TidText, this.rPn(t.TidText));
	}
	GetNodeToggle() {
		return this.PlotNodeItem.GetNodeToggle();
	}
	SetToggleState(t) {
		this.PlotNodeItem.SetToggleState(t);
	}
	ClearItem() {
		this.Destroy();
	}
	BindClickCallback(t) {
		this.OAn = t;
	}
	rPn(t) {
		return !!this.iPn && this.iPn(t);
	}
	BindIsSelectFunction(t) {
		this.iPn = t;
	}
	GetTidText() {
		return this.PlotNodeItem?.GetTidText();
	}
	GetToggleItem() {
		return this.PlotNodeItem?.GetNodeToggle();
	}
}
exports.HandBookQuestPlotItem = HandBookQuestPlotItem;
class PlotNodeItem extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.OAn = void 0),
			(this.b5e = void 0),
			(this.os = ""),
			(this.OnClickExtendToggle = (t) => {
				1 === t && this.OAn && this.OAn(this.os, this.b5e);
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIExtendToggle],
			[1, UE.UIText],
			[2, UE.UIItem],
		]),
			(this.BtnBindInfo = [[0, this.OnClickExtendToggle]]);
	}
	OnStart() {
		(this.b5e = this.GetExtendToggle(0)), this.b5e.SetToggleState(0);
	}
	BindClickCallback(t) {
		this.OAn = t;
	}
	Update(t, e) {
		(this.os = t),
			(t = PublicUtil_1.PublicUtil.GetConfigTextByKey(t)
				.replace("{q_count}", "0")
				.replace("{q_countMax}", "-")),
			this.GetText(1)?.SetText(t),
			this.b5e?.SetToggleStateForce(e ? 1 : 0, !1, !1);
	}
	GetTidText() {
		return this.os;
	}
	SetToggleState(t) {
		this.b5e?.SetToggleStateForce(t, !1, !1);
	}
	GetNodeToggle() {
		return this.b5e;
	}
}
exports.PlotNodeItem = PlotNodeItem;
