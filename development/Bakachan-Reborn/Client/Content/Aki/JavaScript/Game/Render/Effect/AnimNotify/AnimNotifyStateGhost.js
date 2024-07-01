"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
	TsBaseCharacter_1 = require("../../../Character/TsBaseCharacter"),
	EffectRuntimeGhostEffectContext_1 = require("../../../Effect/EffectContext/EffectRuntimeGhostEffectContext"),
	EffectSystem_1 = require("../../../Effect/EffectSystem");
class AnimNotifyStateGhost extends UE.KuroAnimNotifyState {
	constructor() {
		super(...arguments),
			(this.EffectDataAssetRef = void 0),
			(this.SpawnRate = -0),
			(this.UseSpawnRate = !0),
			(this.SpawnInterval = -0),
			(this.GhostLifeTime = -0),
			(this.EffectHandleMap = void 0);
	}
	GetNotifyName() {
		return "角色残影";
	}
	K2_ValidateAssets() {
		return !0;
	}
	K2_NotifyBegin(t, e, f) {
		this.EffectHandleMap || (this.EffectHandleMap = new Map()),
			EffectSystem_1.EffectSystem.InitializeWithPreview(!1);
		var s = t.GetOwner(),
			a = new EffectRuntimeGhostEffectContext_1.EffectRuntimeGhostEffectContext(
				void 0,
			);
		return (
			s instanceof TsBaseCharacter_1.default &&
				s.CharacterActorComponent?.Entity &&
				(a.EntityId = s.CharacterActorComponent?.Entity.Id),
			(a.SkeletalMeshComp = t),
			(a.SpawnRate = this.SpawnRate),
			(a.UseSpawnRate = this.UseSpawnRate),
			(a.SpawnInterval = this.SpawnInterval),
			(a.GhostLifeTime = this.GhostLifeTime),
			(a.SourceObject = s),
			(s = EffectSystem_1.EffectSystem.SpawnEffect(
				s,
				new UE.Transform(
					new UE.Rotator(),
					s.K2_GetActorLocation(),
					new UE.Vector(1, 1, 1),
				),
				this.EffectDataAssetRef.ToAssetPathName(),
				"[AnimNotifyStateGhost.K2_NotifyBegin]",
				a,
				0,
			)) &&
				EffectSystem_1.EffectSystem.IsValid(s) &&
				(EffectSystem_1.EffectSystem.SetEffectNotRecord(s, !0),
				this.EffectHandleMap.set(t, s)),
			!1
		);
	}
	K2_NotifyEnd(t, e) {
		var f = this.EffectHandleMap.get(t);
		return (
			f &&
				EffectSystem_1.EffectSystem.IsValid(f) &&
				EffectSystem_1.EffectSystem.StopEffectById(
					f,
					"[AnimNotifyStateGhost.K2_NotifyEnd]",
					!1,
				),
			this.EffectHandleMap.delete(t),
			!0
		);
	}
}
exports.default = AnimNotifyStateGhost;
