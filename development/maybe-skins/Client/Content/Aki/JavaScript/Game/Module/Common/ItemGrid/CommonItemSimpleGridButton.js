"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CommonItemSimpleGridButton = void 0);
const UE = require("ue"),
	CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
	GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class CommonItemSimpleGridButton extends GridProxyAbstract_1.GridProxyAbstract {
	constructor(t = void 0) {
		super(),
			(this.PIt = 0),
			(this.JUt = "ShowCount"),
			(this.xIt = void 0),
			(this.wIt = (t) => {
				ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
					t,
				);
			}),
			(this.j7e = () => {
				this.wIt && this.wIt(this.PIt);
			}),
			t && this.CreateThenShowByActor(t);
	}
	get ItemId() {
		return this.PIt;
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[4, UE.UIButtonComponent],
			[1, UE.UITexture],
			[0, UE.UISprite],
			[2, UE.UIText],
			[3, UE.UIItem],
			[5, UE.UISprite],
			[6, UE.UISprite],
			[7, UE.UIItem],
			[8, UE.UISprite],
		]),
			(this.BtnBindInfo = [[4, this.j7e]]);
	}
	OnStart() {}
	OnBeforeDestroy() {}
	qIt() {
		var t = this.GetTexture(1);
		this.SetItemIcon(t, this.PIt, this.xIt), (t = this.GetSprite(0));
		this.SetItemQualityIcon(t, this.PIt, this.xIt, "BackgroundSprite");
	}
	Refresh(t, e, i) {
		var o = t[0];
		t = t[1];
		this.RefreshItem(o.ItemId, t);
	}
	SetQualityActive(t) {
		this.GetSprite(0).SetUIActive(t);
	}
	SetCanReceiveActive(t) {
		this.GetSprite(5).SetUIActive(t);
	}
	SetLockReceiveActive(t) {
		this.GetSprite(6).SetUIActive(t);
	}
	SetReceivedActive(t) {
		this.GetItem(7).SetUIActive(t);
	}
	SetBelongViewName(t) {
		this.xIt = t;
	}
	RefreshItem(t, e = 0) {
		(this.PIt = t), this.qIt(), this.SetCount(e);
	}
	BindClickCallback(t) {
		this.wIt = t;
	}
	SetCount(t = 0) {
		t
			? (LguiUtil_1.LguiUtil.SetLocalText(this.GetCountText(), this.JUt, t),
				this.GetCountItem().SetUIActive(!0))
			: this.GetCountItem().SetUIActive(!1);
	}
	GetCountText() {
		return this.GetText(2);
	}
	GetCountItem() {
		return this.GetItem(3);
	}
	SetCountTextId(t) {
		this.JUt = t;
	}
	async RefreshItemAsync(t, e = 0) {
		(this.PIt = t), await this.NIt(), this.SetCount(e);
	}
	async NIt() {
		const t = new CustomPromise_1.CustomPromise(),
			e =
				(this.SetItemIcon(this.GetTexture(1), this.PIt, void 0, () => {
					t.SetResult(void 0);
				}),
				await t.Promise,
				new CustomPromise_1.CustomPromise());
		this.SetItemQualityIcon(
			this.GetSprite(0),
			this.PIt,
			void 0,
			"BackgroundSprite",
			() => {
				e.SetResult(void 0);
			},
		),
			await e.Promise;
	}
}
exports.CommonItemSimpleGridButton = CommonItemSimpleGridButton;
