"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PortalController = void 0);
const UE = require("ue"),
	ActorSystem_1 = require("../../../../Core/Actor/ActorSystem"),
	ControllerBase_1 = require("../../../../Core/Framework/ControllerBase"),
	ModelManager_1 = require("../../../Manager/ModelManager");
class PortalController extends ControllerBase_1.ControllerBase {
	static RegisterPair(e, r, o, a, t) {
		var l;
		ModelManager_1.ModelManager.PortalModel?.GetPortal(e) ||
			((l = new UE.Transform()).SetLocation(r.GetLocation()),
			(l = ActorSystem_1.ActorSystem.Spawn(
				UE.BP_Portal_C.StaticClass(),
				l,
				a,
			)).SetPortal1Transform(r, a.GetTransform()),
			l.SetPortal2Transform(o, t.GetTransform()),
			l.EnablePortal1Rendering(),
			l.EnablePortal2Rendering(),
			ModelManager_1.ModelManager.PortalModel?.AddPortalPair(e, l));
	}
	static UnRegisterPair(e) {
		var r = ModelManager_1.ModelManager.PortalModel?.GetPortal(e);
		r &&
			(r.DisablePortal1Rendering(),
			r.DisablePortal2Rendering(),
			ModelManager_1.ModelManager.PortalModel?.RemovePortalPair(e),
			ActorSystem_1.ActorSystem.Put(r));
	}
}
exports.PortalController = PortalController;
