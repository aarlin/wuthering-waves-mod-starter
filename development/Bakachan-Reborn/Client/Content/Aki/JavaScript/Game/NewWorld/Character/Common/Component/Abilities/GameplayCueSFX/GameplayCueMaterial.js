"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GameplayCueMaterial = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../../../../Core/Common/Log"),
	ResourceSystem_1 = require("../../../../../../../Core/Resource/ResourceSystem"),
	EventDefine_1 = require("../../../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../../../Common/Event/EventSystem"),
	GameplayCueMagnitude_1 = require("./GameplayCueMagnitude");
class GameplayCueMaterial extends GameplayCueMagnitude_1.GameplayCueMagnitude {
	constructor() {
		super(...arguments),
			(this.rWt = 0),
			(this._$o = 0),
			(this.u$o = (e) => {
				if (e === this.rWt) {
					switch (this._$o) {
						case 1:
							EventSystem_1.EventSystem.RemoveWithTarget(
								this.ActorInternal.CharRenderingComponent,
								EventDefine_1.EEventName.OnRemoveMaterialController,
								this.u$o,
							);
							break;
						case 2:
							EventSystem_1.EventSystem.RemoveWithTarget(
								this.ActorInternal.CharRenderingComponent,
								EventDefine_1.EEventName.OnRemoveMaterialControllerGroup,
								this.u$o,
							);
					}
					this.EndCallback?.();
				}
			});
	}
	OnInit() {
		super.OnInit();
	}
	OnTick(e) {}
	OnCreate() {
		ResourceSystem_1.ResourceSystem.LoadAsync(
			this.CueConfig.Path,
			UE.Object,
			(e) => {
				if (
					(this.BeginCallback?.(),
					this.ActorInternal?.IsValid() && this.IsActive)
				) {
					switch (this.c$o(e)) {
						case 1:
							(this._$o = 1),
								(this.rWt =
									this.ActorInternal.CharRenderingComponent.AddMaterialControllerData(
										e,
									));
							break;
						case 2:
							(this._$o = 2),
								(this.rWt =
									this.ActorInternal.CharRenderingComponent.AddMaterialControllerDataGroup(
										e,
									));
							break;
						case 0:
							(this._$o = 0),
								Log_1.Log.CheckError() &&
									Log_1.Log.Error(
										"Battle",
										29,
										"附加材质类型错误:",
										["Buff特效Id", this.CueConfig.Id],
										["材质路径", this.CueConfig.Path],
									);
					}
					this.DXo(), super.OnCreate();
				}
			},
		);
	}
	OnDestroy() {
		switch ((super.OnDestroy(), this._$o)) {
			case 1:
				this.ActorInternal.CharRenderingComponent.RemoveMaterialControllerDataWithEnding(
					this.rWt,
				);
				break;
			case 2:
				this.ActorInternal.CharRenderingComponent.RemoveMaterialControllerDataGroupWithEnding(
					this.rWt,
				);
		}
	}
	OnSetMagnitude(e) {
		this.ActorInternal.CharRenderingComponent.SetEffectProgress(e, this.rWt);
	}
	c$o(e) {
		return e instanceof UE.PD_CharacterControllerData_C
			? 1
			: e instanceof UE.PD_CharacterControllerDataGroup_C
				? 2
				: 0;
	}
	DXo() {
		if (this.EndCallback)
			switch (this._$o) {
				case 1:
					EventSystem_1.EventSystem.AddWithTarget(
						this.ActorInternal.CharRenderingComponent,
						EventDefine_1.EEventName.OnRemoveMaterialController,
						this.u$o,
					);
					break;
				case 2:
					EventSystem_1.EventSystem.AddWithTarget(
						this.ActorInternal.CharRenderingComponent,
						EventDefine_1.EEventName.OnRemoveMaterialControllerGroup,
						this.u$o,
					);
			}
	}
}
exports.GameplayCueMaterial = GameplayCueMaterial;
