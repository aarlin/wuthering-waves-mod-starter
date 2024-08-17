"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AiStateMachineStateMeshVisible = void 0);
const UE = require("ue"),
	ObjectUtils_1 = require("../../../../Core/Utils/ObjectUtils"),
	AiStateMachine_1 = require("../AiStateMachine"),
	AiStateMachineState_1 = require("./AiStateMachineState");
class AiStateMachineStateMeshVisible extends AiStateMachineState_1.AiStateMachineState {
	constructor() {
		super(...arguments),
			(this.Tag = void 0),
			(this.Visible = !1),
			(this.PropagateToChildren = !1),
			(this.MeshComponentsCache = void 0);
	}
	OnInit(e) {
		return (
			(this.Tag = new UE.FName(e.BindMeshVisible.Tag)),
			(this.Visible = e.BindMeshVisible.Visible),
			(this.PropagateToChildren = e.BindMeshVisible.PropagateToChildren),
			!0
		);
	}
	xne() {
		var e;
		this.MeshComponentsCache ||
			((e = this.Node.ActorComponent.Actor.GetComponentsByTag(
				UE.SkeletalMeshComponent.StaticClass(),
				this.Tag,
			)),
			(this.MeshComponentsCache = (0, ObjectUtils_1.ueArrayToArray)(e)));
	}
	OnActivate(e, t) {
		if ((this.xne(), this.MeshComponentsCache))
			for (const e of this.MeshComponentsCache)
				e.SetHiddenInGame(!this.Visible, this.PropagateToChildren);
	}
	OnDeactivate(e, t) {
		if ((this.xne(), this.MeshComponentsCache))
			for (const e of this.MeshComponentsCache)
				e.SetHiddenInGame(this.Visible, this.PropagateToChildren);
	}
	ToString(e, t = 0) {
		(0, AiStateMachine_1.appendDepthSpace)(e, t);
	}
}
exports.AiStateMachineStateMeshVisible = AiStateMachineStateMeshVisible;
