"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FragmentedCluesView = void 0);
const UE = require("ue"),
	UiViewBase_1 = require("../../Ui/Base/UiViewBase"),
	GridProxyAbstract_1 = require("../Util/Grid/GridProxyAbstract"),
	GenericLayout_1 = require("../Util/Layout/GenericLayout"),
	LguiUtil_1 = require("../Util/LguiUtil");
class FragmentedCluesView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.wUn = void 0),
			(this.BUn = void 0),
			(this.bUn = void 0),
			(this.iwo = 0),
			(this.qUn = 0),
			(this.GUn = () => {
				this.OUn(), this.iwo--, this.iwo < 0 && (this.iwo = 0), this.Og();
			}),
			(this.NUn = () => {
				this.OUn(),
					this.iwo++,
					this.iwo > this.qUn - 1 && (this.iwo = this.qUn - 1),
					this.Og();
			}),
			(this.kUn = () => new MemoryPageDot());
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIHorizontalLayout],
			[1, UE.UITexture],
			[2, UE.UIText],
			[3, UE.UIText],
			[4, UE.UIButtonComponent],
			[5, UE.UIButtonComponent],
		]),
			(this.BtnBindInfo = [
				[4, this.GUn],
				[5, this.NUn],
			]);
	}
	OUn() {
		this.wUn[this.iwo] = !1;
	}
	OnStart() {
		this.bUn = new GenericLayout_1.GenericLayout(
			this.GetHorizontalLayout(0),
			this.kUn,
		);
	}
	OnBeforeShow() {
		(this.BUn = this.OpenParam), (this.wUn = []);
		var t = this.BUn.GetClueContent().length;
		for (let e = 0; e < t; e++) this.wUn?.push(!1);
		(this.qUn = this.wUn.length),
			(this.iwo = 0),
			(this.wUn[this.iwo] = !0),
			this.Og();
	}
	Og() {
		this.FUn(), this.Aqe(), this.C4e(), this.d0o(), this.VUn(), this.HUn();
	}
	jUn(t) {
		return this.BUn.GetClueContent()[t].Texture;
	}
	WUn(t) {
		return this.BUn.GetClueContent()[t].Desc;
	}
	C4e() {
		LguiUtil_1.LguiUtil.SetLocalTextNew(
			this.GetText(3),
			this.BUn.GetClueEntrance().Title,
		);
	}
	d0o() {
		LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), this.WUn(this.iwo));
	}
	VUn() {
		var t = this.iwo < this.qUn - 1;
		this.GetButton(5)?.SetSelfInteractive(t);
	}
	HUn() {
		var t = 0 < this.iwo;
		this.GetButton(4)?.SetSelfInteractive(t);
	}
	Aqe() {
		var t = this.jUn(this.iwo);
		this.SetTextureByPath(t, this.GetTexture(1));
	}
	FUn() {
		(this.wUn[this.iwo] = !0), this.bUn.RefreshByData(this.wUn);
	}
}
exports.FragmentedCluesView = FragmentedCluesView;
class MemoryPageDot extends GridProxyAbstract_1.GridProxyAbstract {
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [[0, UE.UIItem]];
	}
	Refresh(t, e, i) {
		this.GetItem(0)?.SetUIActive(t);
	}
}
