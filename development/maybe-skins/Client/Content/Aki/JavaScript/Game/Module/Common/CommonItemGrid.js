"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CommonItemGrid = void 0);
const UE = require("ue"),
	CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
	StringUtils_1 = require("../../../Core/Utils/StringUtils"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	GridProxyAbstract_1 = require("../Util/Grid/GridProxyAbstract"),
	LguiUtil_1 = require("../Util/LguiUtil"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder");
class CommonItemGrid extends GridProxyAbstract_1.GridProxyAbstract {
	constructor(t = void 0) {
		super(),
			(this.PIt = 0),
			(this.xIt = void 0),
			(this.wIt = (t) => {
				ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
					t,
				);
			}),
			(this.BIt = (t) => {
				t === this.PIt && this.GetExtendToggle(0).SetToggleState(0, !1);
			}),
			(this.x4e = (t) => {
				this.wIt && 1 === t && this.wIt(this.PIt);
			}),
			t && this.CreateThenShowByActor(t);
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIExtendToggle],
			[1, UE.UIItem],
			[2, UE.UIItem],
			[3, UE.UITexture],
			[4, UE.UISprite],
			[5, UE.UIItem],
			[6, UE.UITexture],
			[7, UE.UISprite],
			[8, UE.UIText],
			[9, UE.UIItem],
			[10, UE.UIText],
			[11, UE.UITexture],
			[12, UE.UIItem],
			[13, UE.UIItem],
		]),
			(this.BtnBindInfo = [[0, this.x4e]]);
	}
	OnStart() {
		this.h7e(),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.CloseItemTips,
				this.BIt,
			);
	}
	OnBeforeDestroy() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.CloseItemTips,
			this.BIt,
		);
	}
	h7e() {
		this.SetEmpty(!1), this.SetLock(!1), this.SetRoleHead(), this.bIt();
	}
	qIt() {
		this.SetItemIcon(this.GetTexture(3), this.PIt, this.xIt),
			this.SetItemQualityIcon(this.GetSprite(4), this.PIt, this.xIt);
	}
	Refresh(t, e, i) {
		var s = t[0];
		t = t[1];
		this.RefreshItem(s.ItemId, t);
	}
	SetQualityActive(t) {
		this.GetSprite(4).SetUIActive(t);
	}
	SetBelongViewName(t) {
		this.xIt = t;
	}
	RefreshItem(t, e = 0) {
		(this.PIt = t), this.qIt(), this.GIt(e);
	}
	BindClickCallback(t) {
		this.wIt = t;
	}
	GIt(t = 0) {
		t
			? (LguiUtil_1.LguiUtil.SetLocalText(this.GetText(10), "ShowCount", t),
				this.GetItem(12).SetUIActive(!0))
			: this.GetItem(12).SetUIActive(!1);
	}
	SetRoleHead(t) {
		var e = this.GetTexture(6),
			i = this.GetSprite(7);
		StringUtils_1.StringUtils.IsEmpty(t)
			? (e.SetUIActive(!1), i.SetUIActive(!1))
			: (e.SetUIActive(!0), i.SetUIActive(!0), this.SetTextureByPath(t, e));
	}
	bIt(t = 0) {
		t
			? (this.GetText(8).SetText(t.toFixed(0)), this.GetItem(9).SetUIActive(!0))
			: this.GetItem(9).SetUIActive(!1);
	}
	SetMask(t) {
		this.GetTexture(11).SetUIActive(t);
	}
	SetEmpty(t) {
		this.GetItem(2).SetUIActive(t), this.GetItem(1).SetUIActive(!t);
	}
	SetLock(t) {
		this.GetItem(5).SetUIActive(t);
	}
	SetReceived(t) {
		this.GetItem(13).SetUIActive(t);
	}
	SetCountTextVisible(t) {
		this.GetItem(12).SetUIActive(t);
	}
	async RefreshItemAsync(t, e = 0) {
		(this.PIt = t), await this.NIt(), this.GIt(e);
	}
	async NIt() {
		const t = new CustomPromise_1.CustomPromise(),
			e =
				(this.GetTexture(3).SetUIActive(!1),
				this.SetItemIcon(this.GetTexture(3), this.PIt, this.xIt, () => {
					t.SetResult(void 0), this.GetTexture(3)?.SetUIActive(!0);
				}),
				await t.Promise,
				new CustomPromise_1.CustomPromise());
		this.SetItemQualityIcon(
			this.GetSprite(4),
			this.PIt,
			this.xIt,
			"BackgroundSprite",
			() => {
				e.SetResult(void 0);
			},
		),
			await e.Promise;
	}
}
exports.CommonItemGrid = CommonItemGrid;
