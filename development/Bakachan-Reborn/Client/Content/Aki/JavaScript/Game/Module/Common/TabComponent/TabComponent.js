"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TabComponent = void 0);
const UE = require("ue"),
	CommonDefine_1 = require("../../../../Core/Define/CommonDefine"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
	CommonTabItemBase_1 = require("./TabItem/CommonTabItemBase");
class TabComponent extends UiPanelBase_1.UiPanelBase {
	constructor(e, t, s, i) {
		super(),
			(this.ProxyCreate = t),
			(this.ToggleCallBack = s),
			(this.eGe = void 0),
			(this.NOe = CommonDefine_1.INVALID_VALUE),
			(this.wBt = void 0),
			(this.gRt = void 0),
			(this.Z3e = () => {
				var e = this.ProxyCreate(void 0, void 0);
				return (
					e.InitTabItem(),
					e.SetSelectedCallBack(this.cLt),
					e.SetCanExecuteChange(this.T7e),
					e
				);
			}),
			(this.cLt = (e) => {
				this.xBt(), (this.NOe = e), this.ToggleCallBack(e);
			}),
			(this.T7e = (e, t) =>
				!(this.NOe === e && !t) && (!this.gRt || this.gRt(e))),
			this.CreateThenShowByActor(e.GetOwner()),
			(this.wBt = i);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [[0, UE.UILayoutBase]];
	}
	OnStart() {
		var e = this.wBt ? this.wBt.GetOwner() : void 0;
		this.eGe = new GenericLayout_1.GenericLayout(
			this.GetLayoutBase(0),
			this.Z3e,
			e,
		);
	}
	OnBeforeDestroy() {
		this.wBt = void 0;
	}
	xBt() {
		var e;
		this.NOe !== CommonDefine_1.INVALID_VALUE &&
			(e = this.eGe.GetLayoutItemByKey(this.NOe)) &&
			e.SetForceSwitch(0);
	}
	RefreshTabItem(e, t) {
		this.NOe !== CommonDefine_1.INVALID_VALUE &&
			this.eGe.GetLayoutItemByIndex(this.NOe)?.SetForceSwitch(0),
			(this.NOe = CommonDefine_1.INVALID_VALUE),
			this.eGe.RefreshByData(e, t);
	}
	async RefreshTabItemAsync(e, t = !0) {
		t &&
			(this.NOe !== CommonDefine_1.INVALID_VALUE &&
				this.eGe.GetLayoutItemByIndex(this.NOe)?.SetForceSwitch(0),
			(this.NOe = CommonDefine_1.INVALID_VALUE)),
			await this.eGe.RefreshByDataAsync(e);
	}
	RefreshTabItemByLength(e, t) {
		var s = new Array();
		for (let t = 0; t < e; t++) {
			var i = new CommonTabItemBase_1.CommonTabItemData();
			(i.Index = t), s.push(i);
		}
		this.RefreshTabItem(s, t);
	}
	async RefreshTabItemByLengthAsync(e) {
		var t = new Array();
		for (let i = 0; i < e; i++) {
			var s = new CommonTabItemBase_1.CommonTabItemData();
			(s.Index = i), t.push(s);
		}
		await this.RefreshTabItemAsync(t);
	}
	ResetLastSelectTab() {
		var e = this.eGe.GetLayoutItemByKey(this.NOe);
		e && e.SetForceSwitch(0);
	}
	SelectToggleByIndex(e, t = !1) {
		t && (this.ResetLastSelectTab(), (this.NOe = CommonDefine_1.INVALID_VALUE)),
			e !== this.NOe &&
				(t = this.eGe.GetLayoutItemByKey(e)) &&
				t.SetForceSwitch(1, !0);
	}
	GetSelectedIndex() {
		return this.NOe;
	}
	GetTabItemByIndex(e) {
		return this.eGe.GetLayoutItemByKey(e);
	}
	GetTabItemMap() {
		return this.eGe.GetLayoutItemMap();
	}
	GetLayout() {
		return this.eGe;
	}
	SetCanChange(e) {
		this.gRt = e;
	}
}
exports.TabComponent = TabComponent;
