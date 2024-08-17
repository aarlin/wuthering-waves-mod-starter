"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleGaitStatic = void 0);
const CommonParamById_1 = require("../../../../../../Core/Define/ConfigCommon/CommonParamById"),
	WALK_TO_RUN_RATE = 0.3;
class RoleGaitStatic {
	static Init() {
		RoleGaitStatic.IsInit ||
			((RoleGaitStatic.MovementStatusGapValue =
				CommonParamById_1.configCommonParamById.GetFloatConfig(
					"Move_Status_GapValue_GamePad",
				)),
			(RoleGaitStatic.MovementStatusGapValueSquare =
				RoleGaitStatic.MovementStatusGapValue *
				RoleGaitStatic.MovementStatusGapValue),
			(RoleGaitStatic.IsInit = !0));
	}
	static SetWalkOrRunRateForRocker(t) {
		RoleGaitStatic.Etr = t;
	}
	static GetWalkOrRunRate() {
		return RoleGaitStatic.Etr;
	}
}
((exports.RoleGaitStatic = RoleGaitStatic).MovementStatusGapValue = 0),
	(RoleGaitStatic.MovementStatusGapValueSquare = 0),
	(RoleGaitStatic.IsInit = !1),
	(RoleGaitStatic.Etr = 0.3);
