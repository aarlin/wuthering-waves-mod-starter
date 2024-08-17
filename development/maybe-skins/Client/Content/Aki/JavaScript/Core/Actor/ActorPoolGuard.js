"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ActorPoolGuard = void 0);
const UE = require("ue");
class ActorPoolGuard {
	static CleanActorBeforeEnPool(e, o) {
		if (o) o(e);
		else if (e instanceof UE.LevelSequenceActor) this.ClearSequenceActor(e);
		else {
			e.K2_SetActorTransform(new UE.Transform(), !1, void 0, !0),
				UE.KuroActorManager.ClearAcquiredComponents(e),
				UE.KuroActorManager.ResetDelegates(e),
				e.K2_DetachFromActor(),
				e.SetActorHiddenInGame(!0);
			var r = e.K2_GetComponentsByClass(UE.ActorComponent.StaticClass());
			for (let e = 0; e < r.Num(); e++)
				UE.KuroActorManager.UnregisterComponent(r.Get(e));
			e.SetActorTickEnabled(!1), e.SetActorEnableCollision(!1);
		}
		return !0;
	}
	static PrepareActorBeforeDePool(e) {
		return (
			!!UE.KuroActorManager.ResetActorToDefault(e) &&
			(e.SetActorEnableCollision(!0), UE.KuroActorManager.ResetUberGraph(e), !0)
		);
	}
	static ClearSequenceActor(e) {
		var o;
		(e.PlaybackSettings = new UE.MovieSceneSequencePlaybackSettings()),
			e.ResetBindings(),
			e.SequencePlayer.OnFinished.Clear(),
			e.SequencePlayer.OnPlay.Clear(),
			e.SequencePlayer.OnStop.Clear(),
			e.SequencePlayer.OnPause.Clear(),
			e.SequencePlayer.OnPlayReverse.Clear(),
			e.SequencePlayer.OnCameraCut.Clear(),
			e.bOverrideInstanceData &&
				(((o = e.DefaultInstanceData).TransformOrigin = new UE.Transform()),
				(o.TransformOriginActor = void 0),
				(e.bOverrideInstanceData = !1)),
			e.SetSequence(UE.KuroActorManager.GetDummySequence());
	}
}
exports.ActorPoolGuard = ActorPoolGuard;
//# sourceMappingURL=ActorPoolGuard.js.map
