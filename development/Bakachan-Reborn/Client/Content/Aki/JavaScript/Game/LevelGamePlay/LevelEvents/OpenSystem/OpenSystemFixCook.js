"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.OpenSystemFixCook = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	EntitySystem_1 = require("../../../../Core/Entity/EntitySystem"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	CookController_1 = require("../../../Module/Cook/CookController"),
	OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemFixCook extends OpenSystemBase_1.OpenSystemBase {
	async ExecuteOpenView(e, o) {
		return e.BoardId
			? (CookController_1.CookController.SetCurrentFixId(e.BoardId),
				1 === o.Type &&
					((o = EntitySystem_1.EntitySystem.Get(o.EntityId)),
					(o = MathUtils_1.MathUtils.NumberToLong(
						o?.GetComponent(0).GetCreatureDataId(),
					)),
					CookController_1.CookController.SetCurrentEntityId(o)),
				CookController_1.CookController.ShowFixCookView())
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error("Level", 8, "打开厨具修复参数有误", [
						"BoardId",
						e.BoardId,
					]),
				!1);
	}
	GetViewName(e) {
		return "CookPopFixView";
	}
}
exports.OpenSystemFixCook = OpenSystemFixCook;
