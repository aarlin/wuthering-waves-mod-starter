"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TsSkeletalObserver = void 0);
const UE = require("ue"),
	ActorSystem_1 = require("../../../Core/Actor/ActorSystem"),
	UiModelSystem_1 = require("../UiModel/UiModel/UiModelSystem");
class TsSkeletalObserver extends UE.Actor {
	constructor() {
		super(...arguments), (this.Model = void 0);
	}
	Init(e) {
		this.SetTickableWhenPaused(!0),
			UE.KuroRenderingRuntimeBPPluginBPLibrary.SetActorUISceneRendering(
				this,
				!0,
			),
			(this.Model = UiModelSystem_1.UiModelSystem.CreateUiModelByUseWay(
				e,
				this,
			)),
			this.Model?.Init(),
			this.Model?.Start();
	}
	ReceiveTick(e) {
		this.Model?.Tick(e);
	}
	Destroy() {
		this.Model?.End(),
			this.Model?.Clear(),
			(this.Model = void 0),
			ActorSystem_1.ActorSystem.Put(this);
	}
}
(exports.TsSkeletalObserver = TsSkeletalObserver),
	(exports.default = TsSkeletalObserver);
