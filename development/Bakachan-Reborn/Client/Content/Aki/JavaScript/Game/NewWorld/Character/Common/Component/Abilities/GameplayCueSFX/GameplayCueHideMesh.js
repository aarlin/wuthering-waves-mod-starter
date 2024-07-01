"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GameplayCueHideMesh = void 0);
const UE = require("ue"),
	GameplayCueBase_1 = require("./GameplayCueBase");
class GameplayCueHideMesh extends GameplayCueBase_1.GameplayCueBase {
	OnCreate() {
		this.JXo(!0);
	}
	OnDestroy() {
		this.JXo(!1);
	}
	JXo(e) {
		var a = this.ActorInternal.K2_GetComponentsByClass(
			UE.MeshComponent.StaticClass(),
		);
		for (let r = 0; r < a.Num(); r++) {
			var s = a.Get(r);
			if (
				s instanceof UE.MeshComponent &&
				s.GetName() === this.CueConfig.Parameters[0]
			) {
				let a = "1" === (this.CueConfig.Parameters[1] ?? "1");
				e || (a = !a);
				var t = "1" === (this.CueConfig.Parameters[2] ?? "1");
				s.SetHiddenInGame(a, t);
			}
		}
	}
}
exports.GameplayCueHideMesh = GameplayCueHideMesh;
