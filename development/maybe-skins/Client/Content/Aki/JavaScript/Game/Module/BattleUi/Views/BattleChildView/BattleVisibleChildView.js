"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BattleVisibleChildView = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	VisibleStateUtil_1 = require("../../VisibleStateUtil"),
	BattleChildView_1 = require("./BattleChildView");
class BattleVisibleChildView extends BattleChildView_1.BattleChildView {
	constructor() {
		super(...arguments),
			(this.ChildViewData = void 0),
			(this.ChildType = 0),
			(this.BaseVisible = !1),
			(this.IsEnable = !1),
			(this.InnerVisibleState = 0),
			(this.j$e = () => {
				this.W$e();
			});
	}
	InitChildType(i = 0) {
		(this.ChildType = i),
			(this.ChildViewData =
				ModelManager_1.ModelManager.BattleUiModel.ChildViewData),
			(this.BaseVisible = this.ChildViewData.GetChildVisible(i)),
			(this.InnerVisibleState = 1),
			this.ChildViewData.AddCallback(i, this.j$e);
	}
	ShowBattleVisibleChildView() {
		(this.IsEnable = !0), this.K$e(0, !0);
		var i = this.GetVisible();
		this.SetActive(i), i && this.OnShowBattleChildView();
	}
	HideBattleVisibleChildView() {
		this.IsEnable = !1;
		var i = this.GetVisible();
		this.K$e(0, !1),
			this.SetActive(this.GetVisible()),
			i && this.OnHideBattleChildView();
	}
	Reset() {
		this.K$e(0, !1),
			this.ChildViewData &&
				(this.ChildViewData.RemoveCallback(this.ChildType, this.j$e),
				(this.ChildViewData = void 0)),
			super.Reset();
	}
	SetActive(i) {
		this.GetVisible() !== i
			? Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Battle",
					18,
					"战斗子界面不要直接调用SetActive, 请调用SetVisible",
				)
			: super.SetActive(i);
	}
	W$e() {
		var i = this.GetVisible();
		(this.BaseVisible = this.ChildViewData.GetChildVisible(this.ChildType)),
			this.Q$e(i);
	}
	SetVisible(i, e) {
		var t = this.GetVisible();
		this.K$e(i, e), this.Q$e(t);
	}
	Q$e(i) {
		this.IsEnable &&
			i !== (i = this.GetVisible()) &&
			(this.SetActive(i),
			i ? this.OnShowBattleChildView() : this.OnHideBattleChildView());
	}
	K$e(i, e) {
		this.InnerVisibleState = VisibleStateUtil_1.VisibleStateUtil.SetVisible(
			this.InnerVisibleState,
			e,
			i,
		);
	}
	GetVisible() {
		return this.BaseVisible && 0 === this.InnerVisibleState;
	}
	OnShowBattleChildView() {}
	OnHideBattleChildView() {}
}
exports.BattleVisibleChildView = BattleVisibleChildView;
