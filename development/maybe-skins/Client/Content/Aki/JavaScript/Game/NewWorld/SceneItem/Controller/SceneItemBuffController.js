"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SceneItemBuffController = void 0);
const Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
	ControllerBase_1 = require("../../../../Core/Framework/ControllerBase"),
	Net_1 = require("../../../../Core/Net/Net"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	ModelManager_1 = require("../../../Manager/ModelManager");
class SceneItemBuffController extends ControllerBase_1.ControllerBase {
	static BuffOperate(e, r, t) {
		e = ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(e);
		var o = Protocol_1.Aki.Protocol.uYn.create();
		(o.g7n = MathUtils_1.MathUtils.NumberToLong(e)),
			(o.f7n = r),
			Net_1.Net.Call(14739, o, (e) => {
				let r = !1;
				e.lkn === Protocol_1.Aki.Protocol.lkn.Sys && (r = !0);
				var o = MathUtils_1.MathUtils.LongToNumber(e.g7n);
				ModelManager_1.ModelManager.CreatureModel.GetEntity(o)?.IsInit &&
					t &&
					t(e.f7n, r);
			});
	}
}
exports.SceneItemBuffController = SceneItemBuffController;
