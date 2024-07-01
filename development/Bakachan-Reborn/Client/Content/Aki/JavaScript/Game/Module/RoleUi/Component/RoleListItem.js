"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleListItem = exports.RoleListItemData = void 0);
const UE = require("ue"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	RedDotController_1 = require("../../../RedDot/RedDotController"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class RoleListItemData {
	constructor() {
		(this.RoleDataId = 0), (this.NeedShowTrial = !0), (this.NeedRedDot = !1);
	}
}
exports.RoleListItemData = RoleListItemData;
const ROLE_MAX_POSITION = 4;
class RoleListItem extends GridProxyAbstract_1.GridProxyAbstract {
	constructor() {
		super(...arguments),
			(this.DataId = 0),
			(this.RoleIconItem = void 0),
			(this.ToggleCallBack = void 0),
			(this.CanToggleExecuteChange = void 0),
			(this.Yke = () => {
				this.ToggleCallBack && this.ToggleCallBack(this.GridIndex);
			}),
			(this.CanToggleExecuteChangeInternal = () =>
				!this.CanToggleExecuteChange ||
				this.CanToggleExecuteChange(this.GridIndex));
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIExtendToggle],
			[1, UE.UIItem],
			[2, UE.UIItem],
			[3, UE.UISprite],
			[4, UE.UIItem],
			[5, UE.UIItem],
			[6, UE.UIItem],
		]),
			(this.BtnBindInfo = [[0, this.Yke]]);
	}
	async OnBeforeStartAsync() {
		var e = this.GetItem(1);
		(this.RoleIconItem = new RoleIconItem()),
			await this.RoleIconItem.CreateThenShowByActorAsync(e.GetOwner());
	}
	OnStart() {
		var e = this.GetExtendToggle(0);
		e &&
			(e.CanExecuteChange.Unbind(),
			e.CanExecuteChange.Bind(this.CanToggleExecuteChangeInternal));
	}
	_lo(e, t = !0) {
		this.RoleIconItem.Refresh(e),
			t
				? this.GetItem(4).SetUIActive(e.IsTrialRole())
				: this.GetItem(4).SetUIActive(!1);
	}
	ulo(e) {
		var t = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems(!0);
		let o,
			i = 1;
		for (let n = 0; n < t.length; n++) {
			var a = t[n];
			a.GetConfigId === e && ((o = a), (i = n + 1));
		}
		var n = void 0 !== o;
		this.GetItem(2).SetUIActive(n),
			this.GetItem(5).SetUIActive(n),
			n &&
				((n = Math.min(i, 4)),
				(n = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
					"SP_RoleFormationPosition" + n,
				)),
				this.SetSpriteByPath(n, this.GetSprite(3), !1));
	}
	GetRedDotItem() {
		return this.GetItem(6);
	}
	SetToggleState(e, t = !1) {
		var o = this.GetExtendToggle(0);
		t ? o.SetToggleStateForce(e) : o.SetToggleState(e);
	}
	Refresh(e, t, o) {
		this.DataId = e.RoleDataId;
		var i = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(this.DataId);
		this._lo(i, e.NeedShowTrial),
			this.ulo(this.DataId),
			e.NeedRedDot
				? RedDotController_1.RedDotController.BindRedDot(
						"RoleSystemRoleList",
						this.GetRedDotItem(),
						void 0,
						this.DataId,
					)
				: this.GetRedDotItem().SetUIActive(!1),
			t ? this.OnSelected(!1) : this.OnDeselected(!1);
	}
	OnSelected(e) {
		this.SetToggleState(1, !0);
	}
	OnDeselected(e) {
		this.SetToggleState(0, !0);
	}
	GetToggleForGuide() {
		return this.GetExtendToggle(0);
	}
}
exports.RoleListItem = RoleListItem;
class RoleIconItem extends UiPanelBase_1.UiPanelBase {
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UITexture],
			[1, UE.UISprite],
			[2, UE.UISprite],
			[3, UE.UISprite],
		];
	}
	Refresh(e) {
		this.SetRoleIcon(
			e.GetRoleConfig().RoleHeadIconBig,
			this.GetTexture(0),
			e.GetRoleId(),
			"RoleRootView",
		),
			this.Jke(e.GetRoleConfig().QualityId);
	}
	Jke(e) {
		var t = this.GetSprite(1),
			o = this.GetSprite(2),
			i = this.GetSprite(3),
			a = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
				"SP_RoleIconBgUnCheckedUnHover" + e,
			);
		this.SetSpriteByPath(a, i, !1),
			(a = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
				"SP_RoleIconBgUnCheckedHover" + e,
			)),
			this.SetSpriteByPath(a, o, !1),
			(i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
				"SP_RoleIconBgChecked" + e,
			));
		this.SetSpriteByPath(i, t, !1);
	}
}
