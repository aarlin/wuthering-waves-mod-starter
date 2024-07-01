"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BulletActionAttachActor = void 0);
const BulletActionBase_1 = require("./BulletActionBase");
class BulletActionAttachActor extends BulletActionBase_1.BulletActionBase {
	OnExecute() {
		var t = this.ActionInfo;
		t.IsParentActor
			? (this.BulletInfo.Actor.K2_AttachToActor(
					t.Actor,
					t.SocketName,
					t.LocationRule,
					t.RotationRule,
					t.ScaleRule,
					t.WeldSimulatedBodies,
				),
				(this.BulletInfo.ActorComponent.NeedDetach = !0))
			: (t.Actor.K2_AttachToActor(
					this.BulletInfo.Actor,
					t.SocketName,
					t.LocationRule,
					t.RotationRule,
					t.ScaleRule,
					t.WeldSimulatedBodies,
				),
				this.BulletInfo.ActorComponent.ChildrenAttached.push(t.Actor));
	}
}
exports.BulletActionAttachActor = BulletActionAttachActor;
