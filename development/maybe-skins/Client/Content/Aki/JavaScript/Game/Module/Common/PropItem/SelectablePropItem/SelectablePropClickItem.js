"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SelectablePropClickItem = exports.RoleHead = void 0);
const UE = require("ue"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
	SelectablePropItemBase_1 = require("./SelectablePropItemBase");
class RoleHead extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(),
			(this.Ewt = this.CreateThenShowByResourceIdAsync(
				"UiItem_ItemRole",
				e,
				!0,
			));
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [[0, UE.UITexture]]),
			(this.BtnBindInfo = []);
	}
	OnStart() {
		var e = this.GetRootItem();
		e.SetAnchorAlign(1, 1),
			e.SetPivot(new UE.Vector2D(0, 1)),
			e.SetUIRelativeLocation(new UE.Vector(11, -13, 0));
	}
	async Update(e) {
		var t;
		await this.Ewt,
			0 === e.RoleId
				? this.SetActive(!1)
				: (this.SetActive(!0),
					(t = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(
						e.RoleId,
					)),
					this.SetRoleIcon(t.RoleHeadIcon, this.GetTexture(0), e.RoleId));
	}
}
exports.RoleHead = RoleHead;
class SelectablePropClickItem extends SelectablePropItemBase_1.SelectablePropItemBase {
	constructor(e = 1, t = !1) {
		super(e),
			(this.U4e = void 0),
			(this.ywt = void 0),
			(this.Iwt = !1),
			(this.Twt = void 0),
			(this.IsSelectableProp = !0),
			(this.OnToggleClick = (e) => {
				1 === e &&
					this.ScrollViewDelegate?.SelectGridProxy(
						this.GridIndex,
						this.DisplayIndex,
						!0,
					);
			}),
			(this.T7e = () => {
				var e = this.ywt?.(this.PropData.IncId, this.Iwt) ?? !1;
				return (this.Iwt = !1), e;
			}),
			(this.Lwt = t);
	}
	OnStart() {
		this.GetControlItem()?.SetUIActive(!1),
			this.GetSelectItem()?.SetUIActive(!1),
			this.GetSelectableToggle().CanExecuteChange.Bind(this.T7e),
			this.Lwt && (this.Twt = new RoleHead(this.GetRootItem()));
	}
	SetToggleStateForce(e, t = !1) {
		var o = this.GetSelectableToggle();
		o && (e !== o.GetToggleState() && (this.Iwt = !0), o.SetToggleState(e, t));
	}
	OnBeforeDestroy() {
		this.GetSelectableToggle()?.CanExecuteChange.Unbind(),
			this.Twt?.Destroy(),
			(this.Twt = void 0);
	}
	OnRefresh(e, t) {
		this.SetToggleStateForce(e ? 1 : 0),
			this.ShowDefaultDownText(),
			this.RefreshRightDownLockSprite(this.PropData.GetIsLock()),
			this.Twt?.Update(this.PropData);
	}
	OnSelected(e) {
		e &&
			(this.SetToggleStateForce(1),
			this.SetRoleIconState(),
			this.U4e?.(this.PropData.IncId));
	}
	OnDeselected(e) {
		e && (this.SetToggleStateForce(0), this.SetRoleIconState());
	}
	SetToggleFunction(e) {
		this.U4e = e;
	}
	SetCanExecuteChange(e) {
		this.ywt = e;
	}
	GetPropData() {
		return this.PropData;
	}
}
exports.SelectablePropClickItem = SelectablePropClickItem;
