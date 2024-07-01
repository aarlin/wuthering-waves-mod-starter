"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleResetComponent =
		exports.RoleZoomComponent =
		exports.RoleTurnComponent =
		exports.RoleLookUpComponent =
		exports.RoleInteractComponentBase =
			void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	HotKeyComponent_1 = require("./HotKeyComponent");
class RoleInteractComponentBase extends HotKeyComponent_1.HotKeyComponent {
	OnRefreshSelfHotKeyState(e) {
		this.SetVisibleMode(2, !0);
	}
}
class RoleLookUpComponent extends (exports.RoleInteractComponentBase =
	RoleInteractComponentBase) {
	OnInputAxis(e, o) {
		EventSystem_1.EventSystem.Emit(
			EventDefine_1.EEventName.NavigationTriggerRoleLookUp,
			o,
		);
	}
}
exports.RoleLookUpComponent = RoleLookUpComponent;
class RoleTurnComponent extends RoleInteractComponentBase {
	OnInputAxis(e, o) {
		EventSystem_1.EventSystem.Emit(
			EventDefine_1.EEventName.NavigationTriggerRoleTurn,
			o,
		);
	}
}
exports.RoleTurnComponent = RoleTurnComponent;
class RoleZoomComponent extends RoleInteractComponentBase {
	OnInputAxis(e, o) {
		EventSystem_1.EventSystem.Emit(
			EventDefine_1.EEventName.NavigationTriggerRoleZoom,
			e,
			o,
		);
	}
}
exports.RoleZoomComponent = RoleZoomComponent;
class RoleResetComponent extends RoleInteractComponentBase {
	OnPress(e) {
		EventSystem_1.EventSystem.Emit(
			EventDefine_1.EEventName.NavigationTriggerRoleReset,
		);
	}
}
exports.RoleResetComponent = RoleResetComponent;
