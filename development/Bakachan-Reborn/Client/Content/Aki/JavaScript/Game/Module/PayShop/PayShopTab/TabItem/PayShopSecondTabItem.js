"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PayShopSecondTabItem = void 0);
const UE = require("ue"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class PayShopSecondTabItem extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(),
			(this.TabId = 0),
			(this.IsSelected = !1),
			(this.ToggleFunction = void 0),
			(this.Toggle = void 0),
			(this.x4e = (e) => {
				1 === e && ((this.IsSelected = !0), this.ToggleFunction?.(this.TabId));
			}),
			(this.T7e = () => {
				var e = this.Toggle.GetToggleState();
				return !this.IsSelected || 1 !== e;
			}),
			this.CreateThenShowByActor(e.GetOwner());
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[2, UE.UIExtendToggle],
			[0, UE.UIText],
		]),
			(this.BtnBindInfo = [[2, this.x4e]]);
	}
	OnStart() {
		(this.Toggle = this.GetExtendToggle(2)),
			this.Toggle.CanExecuteChange.Bind(this.T7e),
			this.SetToggleState(!1);
	}
	OnBeforeDestroy() {
		this.SetToggleState(!1), this.Toggle.CanExecuteChange.Unbind();
	}
	SetName(e, t) {
		(this.TabId = t),
			(e = ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopTabConfig(
				e,
				t,
			)),
			this.GetText(0).ShowTextNew(e.Name);
	}
	SetToggleFunction(e) {
		this.ToggleFunction = e;
	}
	SetToggleState(e) {
		(this.IsSelected = e), this.Toggle.SetToggleState(e ? 1 : 0, !1);
	}
}
exports.PayShopSecondTabItem = PayShopSecondTabItem;
