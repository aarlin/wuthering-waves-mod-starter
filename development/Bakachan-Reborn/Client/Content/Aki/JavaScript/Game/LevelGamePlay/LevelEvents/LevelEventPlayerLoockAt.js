"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventPlayerLoockAt = void 0);
const Vector_1 = require("../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	CameraBlueprintFunctionLibrary_1 = require("../../Camera/CameraBlueprintFunctionLibrary"),
	Global_1 = require("../../Global"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventPlayerLoockAt extends LevelGeneralBase_1.LevelEventBase {
	Execute(e, t) {
		var a = parseFloat(e.get("PosX")),
			r = parseFloat(e.get("PosY")),
			o = parseFloat(e.get("PosZ"));
		(e = "false" !== e.get("CameraMove")?.toLowerCase()),
			(a = Vector_1.Vector.Create(a, r, o));
		(r = Global_1.Global.BaseCharacter) &&
			((o = r.CharacterActorComponent),
			(r = Vector_1.Vector.Create()),
			a.Subtraction(o.ActorLocationProxy, r),
			(Math.abs(r.X) < MathUtils_1.MathUtils.SmallNumber &&
				Math.abs(r.Y) < MathUtils_1.MathUtils.SmallNumber) ||
				((r.Z = 0),
				(a = r.ToUeVector().Rotation()),
				o.SetActorRotation(a, "LevelEventPlayerLoockAt", !1),
				o.SetInputRotator(a),
				e && CameraBlueprintFunctionLibrary_1.default.SetCameraRotation(a)));
	}
	ExecuteNew(e, t) {
		var a, r, o;
		e &&
			((o = e.Pos.X),
			(r = e.Pos.Y),
			(a = e.Pos.Z),
			(e = e.CameraMove),
			(o = Vector_1.Vector.Create(o ?? 0, r ?? 0, a ?? 0)),
			(r = Global_1.Global.BaseCharacter)) &&
			((a = r.CharacterActorComponent),
			(r = Vector_1.Vector.Create()),
			o.Subtraction(a.ActorLocationProxy, r),
			(Math.abs(r.X) < MathUtils_1.MathUtils.SmallNumber &&
				Math.abs(r.Y) < MathUtils_1.MathUtils.SmallNumber) ||
				((r.Z = 0),
				(o = r.ToUeVector().Rotation()),
				a.SetActorRotation(o, "LevelEventPlayerLoockAt", !1),
				a.SetInputRotator(o),
				e && CameraBlueprintFunctionLibrary_1.default.SetCameraRotation(o)));
	}
	ExecuteInGm(e, t) {
		this.FinishExecute(!0);
	}
}
exports.LevelEventPlayerLoockAt = LevelEventPlayerLoockAt;
