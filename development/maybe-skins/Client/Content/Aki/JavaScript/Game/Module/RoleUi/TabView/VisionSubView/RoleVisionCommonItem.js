"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleVisionCommonItem = void 0);
const ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class RoleVisionCommonItem extends UiPanelBase_1.UiPanelBase {
	constructor(e, t, n, i = !1) {
		super(),
			(this.AnimationState = !1),
			(this.CurrentIndex = void 0),
			(this.CurrentData = void 0),
			(this.RoleId = 0),
			(this.ShowType = 0),
			(this.wqe = void 0),
			(this.NeedRedDot = !1),
			(this.OnDragItemDragBegin = () => {
				this.OnDragBegin();
			}),
			(this.OnDragItemDragEnd = () => {
				this.OnDragEnd();
			}),
			(this.OnClickVision = () => {}),
			(this.OnUnOverlay = () => {
				this.OnItemUnOverlay();
			}),
			(this.OnOverlay = () => {
				this.OnItemOverlay();
			}),
			(this.OnScrollToScrollView = () => {
				this.OnScrollToScrollViewEvent();
			}),
			(this.OnRemoveFromScrollView = () => {
				this.OnRemoveFromScrollViewEvent();
			}),
			(this.CurrentIndex = t),
			(this.wqe = e),
			(this.RoleId = n),
			(this.NeedRedDot = i);
	}
	async Init() {
		await this.CreateByActorAsync(this.wqe.GetOwner()), this.SetUiActive(!0);
	}
	OnDragBegin() {}
	OnDragEnd() {}
	SetShowType(e) {
		this.ShowType = e;
	}
	ResetPosition() {
		this.OnResetPosition();
	}
	OnResetPosition() {}
	SetAnimationState(e) {
		(this.AnimationState = e), this.OnChangeAnimationState();
	}
	OnChangeAnimationState() {}
	GetCurrentIndex() {
		return this.CurrentIndex;
	}
	GetCurrentData() {
		return this.CurrentData;
	}
	SetAniLightState(e) {}
	UpdateItem(e) {
		(this.CurrentData = e),
			this.bdo(e),
			this.Kbe(e),
			this.Pqt(e),
			this.OnUpdateItem(e);
	}
	Kbe(e) {
		this.GetVisionTextureComponent().SetUIActive(void 0 !== e),
			e &&
				((e = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
					e.GetConfigId(!0),
				)),
				this.SetTextureByPath(
					e.IconMiddle,
					this.GetVisionTextureComponent(),
					"VisionEquipmentView",
				));
	}
	Pqt(e) {
		this.GetVisionQualitySprite().SetUIActive(void 0 !== e);
	}
	PlaySequence(e) {
		this.OnPlaySequence(e);
	}
	OnPlaySequence(e) {}
	bdo(e) {}
	SetSelected() {
		this.OnSelected();
	}
	OnSelected() {}
	SetUnSelected() {
		this.OnUnSelected();
	}
	OnUnSelected() {}
	OnUpdateItem(e) {}
	OnItemUnOverlay() {}
	OnScrollToScrollViewEvent() {}
	OnRemoveFromScrollViewEvent() {}
	OnItemOverlay() {}
	OnBeforeDestroy() {
		this.OnBeforeClearComponent();
	}
	SetToggleState(e, t = !1, n = !1) {
		this.GetSelectToggle().ToggleState !== e &&
			this.GetSelectToggle().SetToggleStateForce(e, t, n);
	}
	OnBeforeClearComponent() {}
}
exports.RoleVisionCommonItem = RoleVisionCommonItem;
