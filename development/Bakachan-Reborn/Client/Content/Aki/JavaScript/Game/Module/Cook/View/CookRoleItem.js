"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CookRoleItem = void 0);
const UE = require("ue"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	SmallItemGrid_1 = require("../../Common/SmallItemGrid/SmallItemGrid"),
	GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
	CookController_1 = require("../CookController");
class CookRoleItem extends GridProxyAbstract_1.GridProxyAbstract {
	constructor() {
		super(...arguments),
			(this.dqt = void 0),
			(this.Wgt = void 0),
			(this.Xgt = void 0),
			(this.Kyt = (t) => {
				this.Wgt && this.Wgt(this.dqt.RoleId);
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIExtendToggle],
			[1, UE.UIText],
			[2, UE.UIText],
			[3, UE.UIItem],
		]),
			(this.BtnBindInfo = [[0, this.Kyt]]);
	}
	OnStart() {
		(this.Xgt = new SmallItemGrid_1.SmallItemGrid()),
			this.Xgt.Initialize(this.GetItem(3).GetOwner());
	}
	Refresh(t, e, o) {
		(t = {
			Type: 2,
			Data: (this.dqt = t),
			ItemConfigId: t.RoleId,
			IsCookUp: t.IsBuff,
		}),
			this.Xgt.Apply(t),
			this.Ije(),
			this.nGt(),
			this.IVe(e, !1),
			this.GetText(2).OnSelfLanguageChange.Bind(() => {
				this.nGt();
			});
	}
	Clear() {
		this.GetText(2).OnSelfLanguageChange.Unbind();
	}
	OnBeforeDestroy() {
		this.Xgt.Destroy(), (this.Xgt = void 0);
	}
	nGt() {
		var t;
		CookController_1.CookController.CheckIsBuff(
			this.dqt.RoleId,
			this.dqt.ItemId,
		)
			? ((t = CookController_1.CookController.GetCookInfoText(this.dqt.RoleId)),
				this.GetText(2).SetText(t))
			: ((t =
					ConfigManager_1.ConfigManager.TextConfig.GetTextById(
						"DefaultHelperText",
					)),
				this.GetText(2).SetText(t));
	}
	Ije() {
		this.GetText(1).SetText(this.dqt.RoleName);
	}
	BindOnClickedCallback(t) {
		this.Wgt = t;
	}
	OnSelected(t) {
		this.IVe(!0);
	}
	OnDeselected(t) {
		this.IVe(!1);
	}
	IVe(t, e = !0) {
		var o = this.GetExtendToggle(0);
		t ? o.SetToggleState(1, e) : o.SetToggleState(0, !1);
	}
}
exports.CookRoleItem = CookRoleItem;
