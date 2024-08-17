"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
	Vector_1 = require("../../../Core/Utils/Math/Vector"),
	CameraController_1 = require("../../Camera/CameraController"),
	Global_1 = require("../../Global");
class TsSceneUiTag extends UE.Actor {
	constructor() {
		super(...arguments),
			(this.SceneUiTag = ""),
			(this.CalculateCamera = !1),
			(this.BindUiTagArray = void 0);
	}
	ReceiveBeginPlay() {}
	ReceiveEndPlay() {}
	CalculateSquaredDistance() {
		if (!CameraController_1.CameraController.Model) return 0;
		let e;
		if (this.CalculateCamera) {
			const r = CameraController_1.CameraController.Model;
			if (!r) return 0;
			e = r.CameraTransform;
		} else {
			var r = Global_1.Global.BaseCharacter;
			if (!r) return 0;
			e = r.GetTransform();
		}
		return Vector_1.Vector.Create(
			e.InverseTransformPositionNoScale(this.K2_GetActorLocation()),
		).SizeSquared();
	}
	CanTick() {
		return this.OnCanTick();
	}
	OnCanTick() {
		return !1;
	}
}
exports.default = TsSceneUiTag;
