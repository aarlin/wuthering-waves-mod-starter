"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.HudUnitPositionUtil = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D"),
	Global_1 = require("../../../Global"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	PlatformController_1 = require("../../Platform/PlatformController");
class HudUnitPositionUtil {
	constructor() {
		(this.PHs = new Vector2D_1.Vector2D(1, -1)),
			(this._Xe = (0, puerts_1.$ref)(void 0));
	}
	ProjectWorldToScreen(e, r) {
		return (
			!!UE.GameplayStatics.ProjectWorldToScreen(
				Global_1.Global.CharacterController,
				e,
				this._Xe,
			) &&
			((e = (0, puerts_1.$unref)(this._Xe)),
			r.Set(e.X, e.Y),
			(e = ModelManager_1.ModelManager.BattleUiModel),
			PlatformController_1.PlatformController.IsPc() && e.UpdateViewPortSize(),
			r
				.MultiplyEqual(e.ScreenPositionScale)
				.AdditionEqual(e.ScreenPositionOffset)
				.MultiplyEqual(this.PHs),
			!0)
		);
	}
}
exports.HudUnitPositionUtil = HudUnitPositionUtil;
