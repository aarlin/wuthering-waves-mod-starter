"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelConditionRangeSphere = void 0);
const Vector_1 = require("../../../Core/Utils/Math/Vector"),
	Global_1 = require("../../Global"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionRangeSphere extends LevelGeneralBase_1.LevelConditionBase {
	CheckNew(e, r) {
		var o, t;
		return (
			!!e &&
			((o = Vector_1.Vector.Create(
				e.Center.X ?? 0,
				e.Center.Y ?? 0,
				e.Center.Z ?? 0,
			)),
			void 0 !==
				(t =
					Global_1.Global.BaseCharacter?.CharacterActorComponent
						?.ActorLocationProxy)) &&
			Vector_1.Vector.DistSquared(o, t) <= Math.pow(e.Radius, 2)
		);
	}
}
exports.LevelConditionRangeSphere = LevelConditionRangeSphere;
