"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CommonTabItem = void 0);
const UE = require("ue"),
	RedDotController_1 = require("../../../../RedDot/RedDotController"),
	CommonTabItemBase_1 = require("./CommonTabItemBase");
class CommonTabItem extends CommonTabItemBase_1.CommonTabItemBase {
	constructor() {
		super(...arguments),
			(this.GBt = void 0),
			(this.QFe = void 0),
			(this.x4e = (e) => {
				1 === e && this.SelectedCallBack(this.GridIndex);
			}),
			(this.RefreshTransition = () => {
				var e = this.GetUiExtendToggleSpriteTransition(3);
				e && e.SetAllStateSprite(this.GetSprite(0).GetSprite());
			}),
			(this.SetOnUndeterminedClick = (e) => {
				this.GBt = e;
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UISprite],
			[1, UE.UIExtendToggle],
			[2, UE.UIItem],
			[3, UE.UIExtendToggleSpriteTransition],
		]),
			(this.BtnBindInfo = [[1, this.x4e]]);
	}
	OnStart() {
		super.OnStart(),
			this.GetExtendToggle(1).SetToggleState(0),
			this.GetExtendToggle(1).OnUndeterminedClicked.Add(() => {
				this.GBt?.();
			}),
			this.GetItem(2).SetUIActive(!1);
	}
	OnBeforeDestroy() {
		this.UnBindRedDot();
	}
	OnRefresh(e, t, o) {
		this.UpdateTabIcon(e.Data?.GetIcon() ?? ""),
			this.UnBindRedDot(),
			e.RedDotName && this.BindRedDot(e.RedDotName, e.RedDotUid);
	}
	OnSelected(e) {
		this.SelectedCallBack(this.GridIndex);
	}
	OnUpdateTabIcon(e) {
		this.SetSpriteByPath(
			e,
			this.GetSprite(0),
			!1,
			void 0,
			this.RefreshTransition,
		);
	}
	SetToggleStateForce(e, t) {
		this.GetExtendToggle(1).SetToggleStateForce(e, t);
	}
	SetCanClickWhenDisable(e) {
		this.GetExtendToggle(1).SetCanClickWhenDisable(e);
	}
	OnSetToggleState(e, t) {
		this.GetExtendToggle(1).SetToggleState(e, t);
	}
	GetTabToggle() {
		return this.GetExtendToggle(1);
	}
	BindRedDot(e, t = 0) {
		(this.QFe = e),
			this.QFe &&
				RedDotController_1.RedDotController.BindRedDot(
					e,
					this.GetItem(2),
					void 0,
					t,
				);
	}
	UnBindRedDot() {
		this.QFe &&
			(RedDotController_1.RedDotController.UnBindRedDot(this.QFe),
			(this.QFe = void 0));
	}
	GetIconSprite() {
		return this.GetSprite(0);
	}
	OnClear() {
		this.UnBindRedDot();
	}
}
exports.CommonTabItem = CommonTabItem;
