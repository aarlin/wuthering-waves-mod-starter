"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.KeySettingRowContainerItem = void 0);
const UE = require("ue"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	KeySettingRowKeyItem_1 = require("./KeySettingRowKeyItem"),
	KeySettingRowTypeItem_1 = require("./KeySettingRowTypeItem");
class KeySettingRowContainerItem extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.KeySettingRowData = void 0),
			(this.DAi = void 0),
			(this.RAi = void 0),
			(this.EAi = void 0),
			(this.s_i = void 0),
			(this.t_i = void 0),
			(this.i_i = void 0),
			(this.UAi = (e) => {
				this.s_i && this.s_i(this, e);
			}),
			(this.__i = () => {
				this.t_i && this.t_i(this.KeySettingRowData);
			}),
			(this.u_i = () => {
				this.i_i && this.i_i(this.KeySettingRowData);
			}),
			(this.LAi = (e, t) => {
				this.EAi && this.EAi(e, t, this);
			});
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIExtendToggle],
			[1, UE.UIItem],
			[2, UE.UIItem],
		];
	}
	OnStart() {
		var e = this.GetExtendToggle(0);
		e?.OnStateChange.Add(this.UAi),
			e?.OnHover.Add(this.__i),
			e?.OnUnHover.Add(this.u_i),
			this.SetActive(!0);
	}
	OnBeforeDestroy() {
		(this.KeySettingRowData = void 0),
			(this.DAi = void 0),
			(this.RAi = void 0),
			(this.EAi = void 0);
		var e = this.GetExtendToggle(0);
		e?.OnStateChange.Remove(this.UAi),
			e?.OnHover.Remove(this.__i),
			e?.OnUnHover.Remove(this.u_i);
	}
	BindOnToggleStateChanged(e) {
		this.s_i = e;
	}
	BindOnHover(e) {
		this.t_i = e;
	}
	BindOnUnHover(e) {
		this.i_i = e;
	}
	async Init(e) {
		await Promise.all([
			this.CreateByActorAsync(e.GetOwner(), void 0, !0),
			this.AAi(),
			this.PAi(),
		]);
	}
	ClearItem() {
		this.KeySettingRowData = void 0;
	}
	Update(e, t) {
		var i = ModelManager_1.ModelManager.MenuModel.KeySettingInputControllerType;
		switch ((this.KeySettingRowData = e).GetRowType()) {
			case 2:
				this.GetExtendToggle(0)?.SetSelfInteractive(!0),
					this.DAi.Refresh(e, i),
					this.GetItem(2).SetUIActive(!0),
					this.GetItem(1).SetUIActive(!1);
				break;
			case 1:
				this.GetExtendToggle(0)?.SetSelfInteractive(!1),
					this.RAi.Refresh(e),
					this.GetItem(2).SetUIActive(!1),
					this.GetItem(1).SetUIActive(!0);
		}
		this.SetSelected(!1), this.fRt(e.IsExpandDetail);
	}
	async PAi() {
		var e = this.GetItem(2)?.GetOwner();
		e &&
			((this.DAi = new KeySettingRowKeyItem_1.KeySettingRowKeyItem()),
			this.DAi.BindOnWaitInput(this.LAi),
			await this.DAi.CreateThenShowByActorAsync(e));
	}
	BindOnWaitInput(e) {
		this.EAi = e;
	}
	async AAi() {
		var e = this.GetItem(1)?.GetOwner();
		e &&
			((this.RAi = new KeySettingRowTypeItem_1.KeySettingRowTypeItem()),
			await this.RAi.CreateThenShowByActorAsync(e));
	}
	GetUsingItem(e) {
		switch (e.GetRowType()) {
			case 1:
				return this.GetItem(1).GetOwner();
			case 2:
				return this.GetItem(2).GetOwner();
			default:
				return;
		}
	}
	SetSelected(e) {
		this.DAi?.SetSelected(e);
	}
	SetDetailItemVisible(e) {
		this.DAi?.SetDetailItemVisible(e), this.fRt(e);
	}
	fRt(e) {
		this.GetExtendToggle(0)?.SetToggleState(e ? 1 : 0);
	}
}
exports.KeySettingRowContainerItem = KeySettingRowContainerItem;
