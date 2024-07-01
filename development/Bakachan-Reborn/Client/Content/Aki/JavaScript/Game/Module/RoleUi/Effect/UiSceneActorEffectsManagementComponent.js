"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiSceneActorEffectsManagementComponent = void 0);
const UE = require("ue"),
	EffectContext_1 = require("../../../Effect/EffectContext/EffectContext"),
	EffectSystem_1 = require("../../../Effect/EffectSystem"),
	GlobalData_1 = require("../../../GlobalData"),
	CharacterNameDefines_1 = require("../../../NewWorld/Character/Common/CharacterNameDefines"),
	EffectUtil_1 = require("../../../Utils/EffectUtil");
class UiSceneActorEffectsManagementComponent {
	constructor() {
		(this.Clo = new Array()),
			(this.glo = new UE.Transform(
				new UE.Rotator(0, 0, 0),
				new UE.Vector(0, 0, 0),
				new UE.Vector(1, 1, 1),
			)),
			(this.flo = CharacterNameDefines_1.CharacterNameDefines.ROOT);
	}
	PlayEffect(e, t, f, c, a) {
		return (
			(e = EffectUtil_1.EffectUtil.GetEffectPath(e)),
			this.PlayEffectByPath(e, t, f, c, a)
		);
	}
	PlayEffectByPath(e, t, f, c, a) {
		(f = EffectSystem_1.EffectSystem.SpawnEffect(
			GlobalData_1.GlobalData.World,
			f ?? this.glo,
			e,
			"[RoleAnimStateEffectManager.PlayEffect]",
			new EffectContext_1.EffectContext(void 0, t),
			1,
			void 0,
			a,
		)),
			EffectSystem_1.EffectSystem.IsValid(f) && this.Clo.push(f);
		let o = c;
		return (
			(o = o || this.flo),
			EffectSystem_1.EffectSystem.IsValid(f) &&
				EffectSystem_1.EffectSystem.GetEffectActor(f)?.K2_AttachToComponent(
					t,
					o,
					0,
					0,
					0,
					!1,
				),
			f
		);
	}
	PlayEffectList(e, t, f, c) {
		if (e)
			for (let o = 0; o < e.Num(); o++) {
				var a = e.Get(o);
				this.PlayEffectByPath(a.ToAssetPathName(), t, f, c);
			}
	}
	AttachEffect(e) {
		this.Clo.push(e);
	}
	DestroyEffect() {
		this.Clo &&
			0 !== this.Clo.length &&
			(this.Clo.forEach((e) => {
				EffectSystem_1.EffectSystem.StopEffectById(
					e,
					"[RoleAnimStateEffectManager.RecycleEffect]",
					!0,
				);
			}),
			(this.Clo.length = 0));
	}
	StopEffect(e) {
		EffectSystem_1.EffectSystem.StopEffectById(
			e,
			"[RoleAnimStateEffectManager.StopEffect]",
			!0,
		);
	}
}
exports.UiSceneActorEffectsManagementComponent =
	UiSceneActorEffectsManagementComponent;
