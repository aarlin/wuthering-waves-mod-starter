"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GameplayCueCameraEffect = void 0);
const UE = require("ue"),
	ResourceSystem_1 = require("../../../../../../../Core/Resource/ResourceSystem"),
	ScreenEffectSystem_1 = require("../../../../../../Render/Effect/ScreenEffectSystem/ScreenEffectSystem"),
	GameplayCueBase_1 = require("./GameplayCueBase");
class GameplayCueCameraEffect extends GameplayCueBase_1.GameplayCueBase {
	constructor() {
		super(...arguments), (this.Vnt = void 0);
	}
	OnCreate() {
		this.CueConfig.Path &&
			this.Entity.GetComponent(3).IsAutonomousProxy &&
			ResourceSystem_1.ResourceSystem.LoadAsync(
				this.CueConfig.Path,
				UE.EffectScreenPlayData_C,
				(e) => {
					this.IsActive &&
						((this.Vnt = e),
						ScreenEffectSystem_1.ScreenEffectSystem.GetInstance().PlayScreenEffect(
							e,
						));
				},
			);
	}
	OnDestroy() {
		this.Vnt &&
			(ScreenEffectSystem_1.ScreenEffectSystem.GetInstance().EndScreenEffect(
				this.Vnt,
			),
			(this.Vnt = void 0));
	}
	OnEnable() {
		this.Create();
	}
	OnDisable() {
		this.Destroy();
	}
}
exports.GameplayCueCameraEffect = GameplayCueCameraEffect;
