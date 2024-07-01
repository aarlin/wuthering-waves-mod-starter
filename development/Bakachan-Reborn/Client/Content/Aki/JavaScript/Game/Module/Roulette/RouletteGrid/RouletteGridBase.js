"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RouletteGridBase = void 0);
const UE = require("ue"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	UiNavigationNewController_1 = require("../../UiNavigation/New/UiNavigationNewController");
class RouletteGridBase extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.Data = void 0),
			(this.Toggle = void 0),
			(this.IsIconTexture = !1),
			(this.aXe = !1),
			(this.A4e = void 0),
			(this.d4e = () =>
				!this.A4e || this.A4e(this.Data, this.Toggle.GetToggleState())),
			(this.wgo = (t) => {
				1 === t &&
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.OnRouletteItemSelect,
						this.Data,
					);
			}),
			(this.Bgo = (t) => {
				this.SetGridEquipped(1 === t);
			});
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIExtendToggle],
			[1, UE.UIItem],
			[2, UE.UITexture],
			[3, UE.UIItem],
			[4, UE.UIItem],
			[5, UE.UIExtendToggleSpriteTransition],
			[6, UE.UISprite],
			[7, UE.UIItem],
			[8, UE.UIItem],
			[9, UE.UIText],
			[10, UE.UIText],
		];
	}
	OnStart() {
		(this.IsIconTexture = !1), (this.aXe = !1);
		var t = this.GetUiExtendToggleSpriteTransition(5),
			e = this.GetTexture(2);
		t.RootUIComp.SetUIActive(!1),
			e.SetUIActive(!1),
			(this.Toggle = this.GetExtendToggle(0)),
			this.Toggle.SetToggleState(0),
			this.Toggle.CanExecuteChange.Bind(this.d4e),
			this.SetGridEquipped(!1);
	}
	OnBeforeDestroy() {
		(this.Data = void 0),
			this.Toggle.CanExecuteChange.Unbind(),
			(this.Toggle = void 0);
	}
	Init() {}
	IsDataValid() {
		return void 0 !== this.Data.Id && 0 !== this.Data.Id;
	}
	RefreshGrid(t) {
		(this.Data = t), this.Init(), this.bgo(t.State);
	}
	GetIconItem() {
		return this.IsIconTexture
			? this.GetTexture(2)
			: this.GetUiExtendToggleSpriteTransition(5).RootUIComp;
	}
	LoadSpriteIcon(t) {
		this.GetTexture(2).SetUIActive(!1), (this.aXe = !0);
		const e = this.GetUiExtendToggleSpriteTransition(5),
			i = this.GetSprite(6);
		this.SetSpriteByPath(t, i, !0, void 0, () => {
			(this.aXe = !1),
				e.SetAllStateSprite(i.GetSprite()),
				this.GetIconItem().SetUIActive(1 === this.Data.State);
		});
	}
	LoadTextureIcon(t) {
		this.GetUiExtendToggleSpriteTransition(5).RootUIComp.SetUIActive(!1),
			(this.aXe = !0);
		var e = this.GetTexture(2);
		this.SetTextureByPath(t, e, void 0, () => {
			(this.aXe = !1), this.GetIconItem().SetUIActive(1 === this.Data.State);
		});
	}
	LoadIconByItemId(t) {
		this.aXe = !0;
		var e = this.GetTexture(2);
		this.SetItemIcon(e, t, void 0, () => {
			(this.aXe = !1), this.GetIconItem().SetUIActive(1 === this.Data.State);
		});
	}
	bgo(t) {
		var e;
		4 === (this.Data.State = t)
			? this.SetActive(!1)
			: (this.GetItem(1).SetUIActive(2 === t),
				this.GetItem(4).SetUIActive(0 === t),
				this.SetToggleSelfInteractive(0 !== t),
				(e = this.Data.ShowIndex),
				this.GetItem(8).SetUIActive(e),
				this.GetText(9).SetUIActive(e),
				(e = (this.Data.GridIndex + 1).toString()),
				this.GetText(9).SetText(e),
				this.GetText(10).SetUIActive(this.Data.ShowNum),
				this.Data.ShowNum &&
					this.GetText(10).SetText(this.Data.DataNum.toString()),
				this.aXe || this.GetIconItem().SetUIActive(1 === t));
	}
	SetGridEquipped(t) {
		this.GetItem(3).SetUIActive(t);
	}
	BindOnCanToggleExecuteChange(t) {
		this.A4e = t;
	}
	AddToggleStateChangeEvent(t) {
		this.Toggle.OnStateChange.Add(t);
	}
	SetGridToggleChangeEvent() {
		this.AddToggleStateChangeEvent(this.wgo),
			this.AddToggleStateChangeEvent(this.Bgo);
	}
	SetToggleSelfInteractive(t) {
		this.Toggle.SetSelfInteractive(t);
	}
	SetGridToggleState(t) {
		this.Toggle.SetToggleState(t ? 1 : 0, !0);
	}
	SetGridToggleNavigation(t) {
		t &&
			UiNavigationNewController_1.UiNavigationNewController.SetNavigationFocusForView(
				this.RootItem,
			);
	}
	SelectOnGrid(t) {
		this.OnSelect(t);
	}
	OnSelect(t) {}
}
exports.RouletteGridBase = RouletteGridBase;
