"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.InstanceDungeonCostTip = exports.TipsListView = void 0);
const UE = require("ue"),
	UiComponentsAction_1 = require("../../../Ui/Base/UiComponentsAction"),
	GenericLayoutAdd_1 = require("../../Util/GenericLayoutAdd");
class TipsListView {
	constructor() {
		(this.xko = void 0),
			(this.OnInstanceRefresh = (t, e, i, o) => {
				var s = new InstanceDungeonCostTip();
				return s.SetRootActor(e.GetOwner(), !0), { Key: t, Value: s };
			});
	}
	Initialize(t) {
		this.xko = new GenericLayoutAdd_1.GenericLayoutAdd(
			t,
			this.OnInstanceRefresh,
		);
	}
	AddItemByKey(t) {
		var e = this.xko.GetLayoutItemByKey(t);
		return (
			e ||
				(this.xko.AddItemToLayout([t]),
				(e = this.xko.GetLayoutItemByKey(t)).SetStarVisible(!1),
				e.SetIconVisible(!1),
				e.SetLeftText(""),
				e.SetRightText("")),
			e
		);
	}
	Clear() {
		this.xko.ClearChildren();
	}
}
exports.TipsListView = TipsListView;
class InstanceDungeonCostTip extends UiComponentsAction_1.UiComponentsAction {
	constructor() {
		super(...arguments),
			(this.v2o = void 0),
			(this.M2o = () => {
				this.v2o?.();
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIText],
			[2, UE.UIButtonComponent],
			[3, UE.UITexture],
			[4, UE.UISprite],
		]),
			(this.BtnBindInfo = [[2, this.M2o]]);
	}
	SetClickHelpFunc(t) {
		this.v2o = t;
	}
	SetLeftText(t) {
		this.GetText(0).SetText(t);
	}
	SetRightText(t) {
		this.GetText(1).SetText(t);
	}
	SetHelpButtonVisible(t) {
		this.GetButton(2).RootUIComp.SetUIActive(t);
	}
	SetIconVisible(t) {
		this.GetTexture(3).SetUIActive(t);
	}
	SetStarVisible(t) {
		this.GetSprite(4).SetUIActive(t);
	}
	SetIconByPath(t) {
		this.GetTexture(3).SetUIActive(!0),
			this.SetTextureByPath(t, this.GetTexture(3));
	}
	SetIconByItemId(t) {
		this.GetTexture(3).SetUIActive(!0), this.SetItemIcon(this.GetTexture(3), t);
	}
}
exports.InstanceDungeonCostTip = InstanceDungeonCostTip;
