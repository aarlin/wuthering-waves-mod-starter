"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.OnlineHallSettingButton = void 0);
const UE = require("ue"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	LguiUtil_1 = require("../../Util/LguiUtil");
class OnlineHallSettingButton extends UiPanelBase_1.UiPanelBase {
	constructor(e, t) {
		super(),
			(this.A4e = void 0),
			(this.d4e = () => !this.A4e || this.A4e(this.S9)),
			(this.xGi = (e) => {
				1 === e && this.wGi && this.wGi(this.S9);
			}),
			(this.S9 = t),
			this.CreateThenShowByActor(e);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIExtendToggle],
			[1, UE.UIText],
		];
	}
	OnStart() {
		this.BGi(this.S9), this.Ore();
	}
	OnBeforeDestroy() {
		this.kre();
	}
	Ore() {
		this.GetExtendToggle(0).OnStateChange.Add(this.xGi);
	}
	kre() {
		this.GetExtendToggle(0).OnStateChange.Remove(this.xGi);
	}
	BindOnSettingButtonClickedCallback(e) {
		this.wGi = e;
	}
	BindCanToggleExecuteChange(e) {
		this.A4e = e;
	}
	SetSelected(e) {
		var t = this.GetExtendToggle(0);
		e ? t.SetToggleStateForce(1, !1) : t.SetToggleStateForce(0, !1);
	}
	BGi(e) {
		var t = this.GetText(1);
		e = "PermissionsSetting_" + e;
		LguiUtil_1.LguiUtil.SetLocalText(t, e),
			this.GetExtendToggle(0).CanExecuteChange.Bind(this.d4e);
	}
}
exports.OnlineHallSettingButton = OnlineHallSettingButton;
