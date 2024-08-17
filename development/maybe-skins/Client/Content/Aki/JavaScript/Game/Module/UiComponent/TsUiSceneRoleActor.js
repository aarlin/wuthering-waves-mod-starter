"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
	ActorSystem_1 = require("../../../Core/Actor/ActorSystem"),
	UiModelSystem_1 = require("../UiModel/UiModel/UiModelSystem"),
	Vector_1 = require("../../../Core/Utils/Math/Vector");
class TsUiSceneRoleActor extends UE.Actor {
	constructor() {
		super(...arguments),
			(this.Model = void 0),
			(this.RoleActorIndex = 0),
			(this.BeforeMoveOutPos = Vector_1.Vector.ZeroVector);
	}
	Init(e, t) {
		(this.RoleActorIndex = e),
			this.SetTickableWhenPaused(!0),
			this.SetActorTickEnabled(!0),
			UE.KuroRenderingRuntimeBPPluginBPLibrary.SetActorUISceneRendering(
				this,
				!0,
			),
			(this.Model = UiModelSystem_1.UiModelSystem.CreateUiModelByUseWay(
				t,
				this,
			)),
			this.Model?.Init(),
			this.Model?.Start(),
			this.SetPrimitiveEntityType(1);
	}
	ReceiveTick(e) {
		this.Model?.Tick(e);
	}
	GetRoleActorIndex() {
		return this.RoleActorIndex;
	}
	Destroy() {
		this.Model?.End(),
			this.Model?.Clear(),
			(this.Model = void 0),
			(this.RoleActorIndex = 0),
			ActorSystem_1.ActorSystem.Put(this);
	}
	IsShowUiWepaonEffect() {
		return !0;
	}
	SetMoveOutActor() {
		(this.BeforeMoveOutPos = this.K2_GetActorLocation()),
			this.K2_SetActorLocation(Vector_1.Vector.ZeroVector, !1, void 0, !1);
	}
	SetMoveInActor() {
		this.K2_SetActorLocation(this.BeforeMoveOutPos, !1, void 0, !1);
	}
}
exports.default = TsUiSceneRoleActor;
