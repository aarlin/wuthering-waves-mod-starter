"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.HandBookFetterItem = void 0);
const UE = require("ue"),
	GridProxyAbstract_1 = require("../Util/Grid/GridProxyAbstract"),
	GenericLayoutNew_1 = require("../Util/Layout/GenericLayoutNew"),
	HandBookCommonItem_1 = require("./HandBookCommonItem");
class HandBookFetterItem extends GridProxyAbstract_1.GridProxyAbstract {
	constructor() {
		super(...arguments),
			(this.PhantomFetter = void 0),
			(this.HandBookCommonItemDataList = []),
			(this.ContentGenericLayout = void 0),
			(this.LZt = 0),
			(this.FetterToggleFunction = void 0),
			(this.GZt = (t) => {
				this.FetterToggleFunction && 1 === t && this.FetterToggleFunction(this);
			}),
			(this.GetPhantomFetter = () => this.PhantomFetter),
			(this.NZt = (t, e, o) => {
				var i = new HandBookCommonItem_1.HandBookCommonItem();
				return (
					i.Initialize(e.GetOwner()),
					i.Refresh(t, !1, 0),
					i.SetToggleInteractive(!1),
					{ Key: o, Value: i }
				);
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIExtendToggle],
			[1, UE.UITexture],
			[2, UE.UIItem],
			[4, UE.UIText],
			[3, UE.UIText],
			[5, UE.UISprite],
			[6, UE.UIHorizontalLayout],
		]),
			(this.BtnBindInfo = [[0, this.GZt]]);
	}
	Refresh(t, e, o) {
		(this.PhantomFetter = t),
			(this.LZt = o),
			this.GetTexture(1).SetUIActive(!1),
			this.GetItem(2).SetUIActive(!1),
			this.GetText(3).SetUIActive(!1),
			this.GetSprite(5).SetUIActive(!1),
			this.GetText(4).ShowTextNew(this.PhantomFetter.Name),
			this.ContentGenericLayout && this.ContentGenericLayout.ClearChildren(),
			(this.ContentGenericLayout = new GenericLayoutNew_1.GenericLayoutNew(
				this.GetHorizontalLayout(6),
				this.NZt,
			)),
			(this.HandBookCommonItemDataList = []),
			this.ContentGenericLayout.RebuildLayoutByDataNew(
				this.HandBookCommonItemDataList,
			),
			this.OZt(e);
	}
	GetGirdIndex() {
		return this.LZt;
	}
	BindFetterToggleCallback(t) {
		this.FetterToggleFunction = t;
	}
	OZt(t) {
		var e = this.GetExtendToggle(0);
		t ? e.SetToggleState(1, !1) : e.SetToggleState(0, !1);
	}
	OnDeselected(t) {
		this.OZt(!1);
	}
	SetToggleStateForce(t, e = !1) {
		this.GetExtendToggle(0).SetToggleState(t, e);
	}
	OnSelected(t) {
		t && (this.SetToggleStateForce(1), this.GZt(1));
	}
	OnBeforeDestroy() {
		(this.PhantomFetter = void 0),
			(this.HandBookCommonItemDataList = []),
			this.ContentGenericLayout &&
				(this.ContentGenericLayout.ClearChildren(),
				(this.ContentGenericLayout = void 0)),
			(this.FetterToggleFunction = void 0);
	}
}
exports.HandBookFetterItem = HandBookFetterItem;
