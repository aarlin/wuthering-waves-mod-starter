"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	TsBaseCharacter_1 = require("../../../Character/TsBaseCharacter"),
	EffectContext_1 = require("../../../Effect/EffectContext/EffectContext"),
	EffectSystem_1 = require("../../../Effect/EffectSystem");
class AnimNotifyStateTrail extends UE.KuroAnimNotifyState {
	constructor() {
		super(...arguments),
			(this.TrailingConfigData = void 0),
			(this.UseWeapon = !1),
			(this.WeaponCaseIndex = 0),
			(this.Handle = 0);
	}
	K2_ValidateAssets() {
		return !0;
	}
	K2_NotifyBegin(e, t, r) {
		if (((this.Handle = 0), !e))
			return (
				Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn("RenderEffect", 26, "拖尾特效传入空参数", ["动画", t]),
				!1
			);
		if (!this.TrailingConfigData)
			return (
				Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn("RenderEffect", 26, "拖尾特效缺失配置", [
						"动画",
						t.GetName(),
					]),
				!1
			);
		let f = e;
		if (this.UseWeapon) {
			var a = "WeaponCase" + this.WeaponCaseIndex,
				n = e
					.GetOwner()
					.K2_GetComponentsByClass(UE.SkeletalMeshComponent.StaticClass());
			let t = !1;
			for (let e = 0; e < n.Num(); e++)
				if (n.Get(e).GetName() === a) {
					(f = n.Get(e)), (t = !0);
					break;
				}
			if (!t)
				return (
					Log_1.Log.CheckError() &&
						Log_1.Log.Error("Render", 26, "AnimNotifyStateTrail未找到武器"),
					!1
				);
		}
		t = f.GetOwner();
		var o = new EffectContext_1.EffectContext(void 0);
		return (
			t instanceof TsBaseCharacter_1.default &&
				t.CharacterActorComponent?.Entity &&
				(o.EntityId = t.CharacterActorComponent?.Entity.Id),
			(o.SourceObject = f.GetOwner()),
			(this.Handle = EffectSystem_1.EffectSystem.SpawnEffect(
				t,
				e.K2_GetComponentToWorld(),
				this.TrailingConfigData.ToAssetPathName(),
				"[AnimNotifyStateTrail.K2_NotifyBegin]",
				o,
				3,
				void 0,
				(e, t) => {
					5 === e && EffectSystem_1.EffectSystem.SetupEffectTrailSpec(t, f);
				},
			)),
			!!EffectSystem_1.EffectSystem.IsValid(this.Handle) &&
				(EffectSystem_1.EffectSystem.SetEffectNotRecord(this.Handle, !0), !0)
		);
	}
	K2_NotifyEnd(e, t) {
		return !(
			!EffectSystem_1.EffectSystem.IsValid(this.Handle) ||
			(EffectSystem_1.EffectSystem.StopEffectById(
				this.Handle,
				"AnimNotifyTrail: K2_NotifyEnd",
				!1,
			),
			(this.Handle = 0))
		);
	}
}
exports.default = AnimNotifyStateTrail;
