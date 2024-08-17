"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AccessPathPcView = void 0);
const UE = require("ue"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
	UiManager_1 = require("../../../Ui/UiManager"),
	AccessPathPcButton_1 = require("./AccessPathPcButton");
class AccessPathPcView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.xci = []),
			(this.wci = () => {}),
			(this.Bci = () => {
				UiManager_1.UiManager.CloseView("AccessPathPcView");
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIButtonComponent],
			[2, UE.UIButtonComponent],
			[3, UE.UISprite],
			[4, UE.UIItem],
			[5, UE.UISprite],
			[6, UE.UIItem],
			[7, UE.UISprite],
			[8, UE.UIItem],
			[9, UE.UISprite],
			[10, UE.UIItem],
			[11, UE.UISprite],
			[12, UE.UIItem],
			[13, UE.UISprite],
			[14, UE.UIItem],
			[15, UE.UISprite],
			[16, UE.UIItem],
			[17, UE.UISprite],
			[18, UE.UIItem],
		]),
			(this.BtnBindInfo = [
				[1, this.wci],
				[2, this.Bci],
			]);
	}
	OnStart() {
		this.bci(), this.qci(), this.AddEvents();
	}
	OnBeforeDestroy() {
		for (const e of this.xci) e.Destroy();
		(this.xci.length = 0), this.RemoveEvents();
	}
	AddEvents() {}
	RemoveEvents() {}
	qci() {
		var e = ModelManager_1.ModelManager.InventoryModel.GetSelectedItemData()
				.GetItemDataBase()
				.GetItemAccess(),
			t = this.GetItem(0);
		for (const s of e) {
			var i = new AccessPathPcButton_1.AccessPathPcButton(t, s);
			this.xci.push(i);
		}
	}
	bci() {
		var e = ModelManager_1.ModelManager.PlatformModel.IsPc();
		this.Gci(e);
	}
	Gci(e) {
		var t = this.GetSprite(3),
			i = this.GetItem(4),
			s = this.GetSprite(5),
			c = this.GetItem(6),
			U = this.GetSprite(7),
			r = this.GetItem(8),
			I = this.GetSprite(9),
			a = this.GetItem(10),
			o = this.GetSprite(11),
			n = this.GetItem(12),
			h = this.GetSprite(13),
			S = this.GetItem(14),
			v = this.GetSprite(15),
			m = this.GetItem(16),
			A = this.GetSprite(17),
			p = this.GetItem(18);
		t.SetUIActive(e),
			i.SetUIActive(!e),
			s.SetUIActive(e),
			c.SetUIActive(!e),
			U.SetUIActive(e),
			r.SetUIActive(!e),
			I.SetUIActive(e),
			a.SetUIActive(!e),
			o.SetUIActive(e),
			n.SetUIActive(!e),
			h.SetUIActive(e),
			S.SetUIActive(!e),
			v.SetUIActive(e),
			m.SetUIActive(!e),
			A.SetUIActive(e),
			p.SetUIActive(!e);
	}
}
exports.AccessPathPcView = AccessPathPcView;
