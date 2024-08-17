"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleElementItem = void 0);
const UE = require("ue"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class RoleElementItem extends GridProxyAbstract_1.GridProxyAbstract {
	constructor() {
		super(...arguments),
			(this.plo = void 0),
			(this.vlo = void 0),
			(this.OnToggleCallback = void 0),
			(this.CanToggleChange = void 0);
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UITexture],
			[1, UE.UITexture],
			[2, UE.UIText],
			[3, UE.UIExtendToggle],
			[4, UE.UIItem],
		]),
			(this.BtnBindInfo = [
				[
					3,
					() => {
						this.OnToggleCallback?.(this.GridIndex);
					},
				],
			]);
	}
	OnStart() {
		this.GetExtendToggle(3)?.CanExecuteChange.Bind(
			() => !this.CanToggleChange || this.CanToggleChange(this.GridIndex),
		);
	}
	Update(e) {
		this.vlo = e;
		e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(
			this.vlo.Id,
		).ElementId;
		var t = ConfigManager_1.ConfigManager.ElementInfoConfig.GetElementInfo(e);
		this.GetText(2).ShowTextNew(t.Name),
			this.SetElementIcon("", this.GetTexture(1), e),
			this.SetTextureByPath(t.ElementChangeTexture, this.GetTexture(0)),
			this.RefreshState();
	}
	Refresh(e, t, n) {
		(this.vlo = e), this.Update(e);
	}
	RefreshState() {
		var e = this.vlo.Id;
		e = this.plo.GetCurSelectRoleId() === e;
		this.GetItem(4).SetUIActive(e);
	}
	OnSelected(e) {
		this.GetExtendToggle(3)?.SetToggleState(1);
	}
	OnDeselected(e) {
		this.GetExtendToggle(3)?.SetToggleState(0);
	}
	SetRoleViewAgent(e) {
		this.plo = e;
	}
}
exports.RoleElementItem = RoleElementItem;
