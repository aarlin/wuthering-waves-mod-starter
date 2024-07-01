"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
	ActorSystem_1 = require("../../../Core/Actor/ActorSystem"),
	ColorUtils_1 = require("../../Utils/ColorUtils"),
	TsSceneUiTag_1 = require("./TsSceneUiTag");
class TsSceneDecorativeUiActor extends TsSceneUiTag_1.default {
	constructor() {
		super(...arguments),
			(this.ShowDistance = 0),
			(this.IsFaceToCharacter = !1),
			(this.IsControlledInternal = !1),
			(this.InShowInternal = !1),
			(this.EditorUiActor = void 0);
	}
	set IsControlled(t) {
		this.IsControlledInternal = t;
	}
	get IsControlled() {
		return this.IsControlledInternal;
	}
	set InShow(t) {
		this.InShowInternal = t;
	}
	get InShow() {
		return this.InShowInternal;
	}
	Create3dUi() {}
	Destroy3dUi() {
		this.EditorUiActor &&
			(ActorSystem_1.ActorSystem.Put(this.EditorUiActor),
			(this.EditorUiActor = void 0));
	}
	DrawDistance() {
		UE.KismetSystemLibrary.DrawDebugSphere(
			this,
			this.K2_GetActorLocation(),
			this.ShowDistance,
			12,
			ColorUtils_1.ColorUtils.LinearRed,
			5,
		);
	}
	OnCanTick() {
		return (
			!this.IsControlled &&
			this.CalculateSquaredDistance() <= this.ShowDistance * this.ShowDistance
		);
	}
}
exports.default = TsSceneDecorativeUiActor;
