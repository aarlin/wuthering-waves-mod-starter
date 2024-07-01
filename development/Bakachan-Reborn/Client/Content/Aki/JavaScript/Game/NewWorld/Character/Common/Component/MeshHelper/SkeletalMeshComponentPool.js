"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SkeletalMeshComponentPool = void 0);
const UE = require("ue"),
	MathUtils_1 = require("../../../../../../Core/Utils/MathUtils"),
	MeshComponentUtils_1 = require("./MeshComponentUtils"),
	SceneComponentPool_1 = require("./SceneComponentPool");
class SkeletalMeshComponentPool extends SceneComponentPool_1.SceneComponentPool {
	ActiveComponent(e) {
		e.SetHiddenInGame(!1), e.SetComponentTickEnabled(!0);
	}
	CleanComponent(e) {
		e.SetSkeletalMesh(void 0),
			e.SetAnimClass(void 0),
			e.SetHiddenInGame(!0),
			e.SetComponentTickEnabled(!1);
	}
	CreateComponent() {
		var e;
		if (this.CheckPoolRange())
			return (
				(e = this.ActorInternal.AddComponentByClass(
					UE.SkeletalMeshComponent.StaticClass(),
					!1,
					MathUtils_1.MathUtils.DefaultTransform,
					!1,
				)),
				MeshComponentUtils_1.MeshComponentUtils.RelativeAttachComponentOnSafe(
					e,
					this.AttachComponentInternal,
				),
				e
			);
	}
}
exports.SkeletalMeshComponentPool = SkeletalMeshComponentPool;
