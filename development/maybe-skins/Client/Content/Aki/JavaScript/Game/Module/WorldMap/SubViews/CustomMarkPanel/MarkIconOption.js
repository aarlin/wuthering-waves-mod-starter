"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MarkIconOption = void 0);
const UE = require("ue"),
	GlobalData_1 = require("../../../../GlobalData"),
	UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class MarkIconOption extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(), (this.Config = void 0), (this.Dko = void 0);
	}
	Initialize(e, t, o) {
		GlobalData_1.GlobalData.World &&
			((this.Dko = t),
			(t = e.GetOwner()),
			e.SetUIActive(!0),
			this.CreateThenShowByActor(t),
			(this.Config = o),
			this.SetSpriteByPath(this.Config.MarkPic, this.GetSprite(0), !1),
			this.RootItem.SetRaycastTarget(!0));
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UISprite],
			[1, UE.UIExtendToggle],
		];
	}
	OnStart() {
		this.GetExtendToggle(1).SetToggleGroup(this.Dko.GetOwner()),
			(this.GetExtendToggle(1).bLockStateOnSelect = !0);
	}
	SetOnclick(e) {
		var t = this.GetExtendToggle(1);
		t.OnStateChange.Clear(), t.OnStateChange.Add(e);
	}
	SetToggleChecked() {
		this.GetExtendToggle(1).SetToggleState(1, !0);
	}
	OnBeforeDestroy() {
		this.GetExtendToggle(1).OnStateChange.Clear();
	}
}
exports.MarkIconOption = MarkIconOption;
