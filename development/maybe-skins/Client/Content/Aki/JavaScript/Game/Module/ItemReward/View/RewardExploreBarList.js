"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RewardExploreBarList = void 0);
const UE = require("ue"),
	StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	TrainingItem_1 = require("../../TrainingDegree/TrainingItem"),
	LguiUtil_1 = require("../../Util/LguiUtil");
class RewardExploreBarList extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this._0i = void 0),
			(this.u0i = void 0),
			(this.Ygi = []);
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
		]),
			(this.BtnBindInfo = []);
	}
	OnStart() {
		(this.u0i = this.GetItem(0)),
			(this._0i = this.GetItem(1)),
			this._0i.SetUIActive(!1);
	}
	OnBeforeDestroy() {
		(this.u0i = void 0), (this._0i = void 0), this.c0i();
	}
	Refresh(i, t) {
		var e = !StringUtils_1.StringUtils.IsEmpty(i);
		e && this.LBt(i), this.m0i(e), this.d0i(t);
	}
	d0i(i) {
		this.c0i();
		var t = this.GetItem(0);
		if (i && 0 !== i.length) {
			for (const t of i) this.C0i(t);
			t.SetUIActive(!0);
		} else t.SetUIActive(!1);
	}
	LBt(i) {}
	m0i(i) {}
	C0i(i) {
		var t = LguiUtil_1.LguiUtil.CopyItem(this._0i, this.u0i);
		(t = new TrainingItem_1.TrainingItem(t)).SetData(i.TrainingData),
			t.SetActive(!0),
			this.Ygi.push(t);
	}
	c0i() {
		for (const i of this.Ygi) i.Destroy();
		this.Ygi.length = 0;
	}
}
exports.RewardExploreBarList = RewardExploreBarList;
