"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.EditFormationTabItem = void 0);
const UE = require("ue"),
	RedDotController_1 = require("../../../../RedDot/RedDotController"),
	CommonTabItemBase_1 = require("./CommonTabItemBase");
class EditFormationTabItem extends CommonTabItemBase_1.CommonTabItemBase {
	constructor() {
		super(...arguments),
			(this.QFe = void 0),
			(this.x4e = (t) => {
				1 === t && this.SelectedCallBack(this.GridIndex);
			}),
			(this.RefreshTransition = () => {
				var t = this.GetUiExtendToggleSpriteTransition(3);
				t && t.SetAllStateSprite(this.GetSprite(0).GetSprite());
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UISprite],
			[1, UE.UIExtendToggle],
			[2, UE.UIItem],
			[3, UE.UIExtendToggleSpriteTransition],
			[4, UE.UIItem],
		]),
			(this.BtnBindInfo = [[1, this.x4e]]);
	}
	OnStart() {
		super.OnStart(),
			this.GetExtendToggle(1).SetToggleState(0),
			this.GetItem(2).SetUIActive(!1);
	}
	OnBeforeDestroy() {
		this.UnBindRedDot();
	}
	ShowTeamBattleTips() {
		this.GetItem(4).SetUIActive(!0);
	}
	OnRefresh(t, e, o) {
		this.UpdateTabIcon(t.Data?.GetIcon());
	}
	OnUpdateTabIcon(t) {
		this.SetSpriteByPath(
			t,
			this.GetSprite(0),
			!1,
			void 0,
			this.RefreshTransition,
		);
	}
	OnSetToggleState(t, e) {
		this.GetExtendToggle(1).SetToggleState(t, e);
	}
	GetTabToggle() {
		return this.GetExtendToggle(1);
	}
	BindRedDot(t, e = 0) {
		(this.QFe = t),
			this.QFe &&
				RedDotController_1.RedDotController.BindRedDot(
					t,
					this.GetItem(2),
					void 0,
					e,
				);
	}
	UnBindRedDot() {
		this.QFe &&
			(RedDotController_1.RedDotController.UnBindRedDot(this.QFe),
			(this.QFe = void 0));
	}
}
exports.EditFormationTabItem = EditFormationTabItem;
