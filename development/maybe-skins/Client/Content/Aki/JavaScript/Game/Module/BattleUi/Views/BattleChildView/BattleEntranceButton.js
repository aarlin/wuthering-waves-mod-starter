"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BattleEntranceButton = void 0);
const UE = require("ue"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	RedDotController_1 = require("../../../../RedDot/RedDotController"),
	BattleVisibleChildView_1 = require("./BattleVisibleChildView");
class BattleEntranceButton extends BattleVisibleChildView_1.BattleVisibleChildView {
	constructor() {
		super(...arguments),
			(this.x$e = void 0),
			(this.QFe = void 0),
			(this.FunctionType = void 0),
			(this.HideInGamepad = void 0),
			(this.HideByRoleConfig = void 0),
			(this.w$e = void 0),
			(this.B$e = () => {
				this.x$e && this.x$e();
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIButtonComponent],
			[1, UE.UIItem],
		]),
			(this.BtnBindInfo = [[0, this.B$e]]);
	}
	Initialize(e) {
		var t;
		super.Initialize(),
			e &&
				((this.HideInGamepad = e.HideInGamepad),
				(this.HideByRoleConfig = e.HideByRoleConfig),
				(t = e.RedDotName) &&
					((this.QFe = t),
					RedDotController_1.RedDotController.BindRedDot(t, this.GetItem(1))),
				this.InitChildType(e.ChildType),
				(t = e.FunctionType)) &&
				((this.FunctionType = t),
				this.SetFunctionOpen(
					t,
					ModelManager_1.ModelManager.FunctionModel.IsOpen(this.FunctionType),
				));
	}
	Reset() {
		this.QFe &&
			(RedDotController_1.RedDotController.UnBindRedDot(this.QFe),
			(this.QFe = void 0)),
			(this.x$e = void 0),
			super.Reset();
	}
	SetFunctionOpen(e, t) {
		e === this.FunctionType &&
			(this.SetVisible(1, t), this.SetOtherHide(this.w$e?.() ?? !1));
	}
	SetGetOtherHideCallCall(e) {
		this.w$e = e;
	}
	SetGamepadHide(e) {
		this.HideInGamepad && this.SetVisible(2, !e);
	}
	SetOtherHide(e) {
		this.SetVisible(4, !e);
	}
	SetGmHide(e) {
		this.SetVisible(3, !e);
	}
	BindOnClicked(e) {
		this.x$e = e;
	}
}
exports.BattleEntranceButton = BattleEntranceButton;
