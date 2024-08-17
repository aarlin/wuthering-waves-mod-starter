"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RouletteGridFunction = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	RouletteController_1 = require("../RouletteController"),
	RouletteGridBase_1 = require("./RouletteGridBase");
class RouletteGridFunction extends RouletteGridBase_1.RouletteGridBase {
	Init() {
		var e;
		this.IsDataValid() &&
			((e = ModelManager_1.ModelManager.RouletteModel.UnlockFunctionDataMap.get(
				this.Data.Id,
			)) ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Phantom",
						38,
						"[FuncMenuWheel]功能轮盘功能格子对应FuncId不存在或未解锁",
						["FuncId", this.Data.Id],
					)),
			(this.Data.Name = e.FuncName),
			e.FuncMenuIconPath.includes("Atlas")
				? ((this.IsIconTexture = !1), this.LoadSpriteIcon(e.FuncMenuIconPath))
				: ((this.IsIconTexture = !0),
					this.LoadTextureIcon(e.FuncMenuIconPath))),
			1 === this.Data.State && this.IsForbiddenState() && (this.Data.State = 0);
	}
	IsForbiddenState() {
		return !1;
	}
	OnSelect(e) {
		e &&
			this.IsDataValid() &&
			RouletteController_1.RouletteController.FunctionOpenRequest(this.Data.Id);
	}
}
exports.RouletteGridFunction = RouletteGridFunction;
