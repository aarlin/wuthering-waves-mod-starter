"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const puerts_1 = require("puerts"),
	UE = require("ue"),
	EntitySystem_1 = require("../../../../../../Core/Entity/EntitySystem"),
	FNameUtil_1 = require("../../../../../../Core/Utils/FNameUtil"),
	EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../../Common/Event/EventSystem");
class TsMediaBlueprintFunctionLibrary extends UE.BlueprintFunctionLibrary {
	static GetAffectedByP1orP3(t) {
		return !(t = EntitySystem_1.EntitySystem.GetComponent(t, 40)) || t.IsP1;
	}
	static PostAkEventByTs(t, e, n, i, o, s) {
		(t = EntitySystem_1.EntitySystem.GetComponent(t, 40)) &&
			((o = (0, puerts_1.$unref)(o)), t.PostAkEvent(e, n, i, o, s));
	}
	static PostAkEventByTsWithoutData(t, e, n, i, o, s) {
		return (t = EntitySystem_1.EntitySystem.GetComponent(t, 40))
			? t.PostAkEvent(e, n, i, (0, puerts_1.$unref)(o), s)
			: -1;
	}
	static SetDebug(t, e) {
		(t = EntitySystem_1.EntitySystem.GetComponent(t, 40)) && t.SetDebug(e);
	}
	static GetAkComponentBySocketName(t, e) {
		if ((t = EntitySystem_1.EntitySystem.GetComponent(t, 40)))
			return t.GetAkComponentBySocketName(
				FNameUtil_1.FNameUtil.GetDynamicFName(e),
			);
	}
	static SetFootSwitch(t, e) {
		(t = EntitySystem_1.EntitySystem.GetComponent(t, 40)) && (t.FootSwitch = e);
	}
	static GetFootSwitch(t) {
		return (t = EntitySystem_1.EntitySystem.GetComponent(t, 40))
			? t.FootSwitch
			: "";
	}
	static GetWaterDepth(t) {
		return (t = EntitySystem_1.EntitySystem.GetComponent(t, 40))
			? t.WaterDepth
			: 0;
	}
	static PostRoleAudioEvent(t, e) {
		EntitySystem_1.EntitySystem.GetComponent(t, 40)?.PostAudioEvent(e);
	}
	static EmitFootOnTheGroundEvent() {
		EventSystem_1.EventSystem.Emit(
			EventDefine_1.EEventName.OnCharFootOnTheGround,
		);
	}
}
exports.default = TsMediaBlueprintFunctionLibrary;
