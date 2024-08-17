"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SceneItemHitUtils = void 0);
const EntitySystem_1 = require("../../../../Core/Entity/EntitySystem"),
	Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent"),
	Global_1 = require("../../../Global"),
	DROP_ATTACK_VALID_RANGE = 28900;
class SceneItemHitUtils {
	static CheckHitDataMatchBulletType(t, e, a) {
		switch (t.Type) {
			case IComponent_1.EHitBulletType.OnlyDropAttack:
				return SceneItemHitUtils.CheckHitDataMatchOnlyDropAttack(t, e, a);
			case IComponent_1.EHitBulletType.CrystalBulletAttack:
				return SceneItemHitUtils.CheckHitDataMatchCrystalAttack(t, e, a);
			case IComponent_1.EHitBulletType.PlayerAttack:
				return SceneItemHitUtils.CheckHitDataMatchPlayerAttack(t, e, a);
			case IComponent_1.EHitBulletType.FixedBulletId:
				return SceneItemHitUtils.CheckHitDataMatchFixedBulletId(t, e, a);
			default:
				return !0;
		}
	}
	static CheckHitDataMatchOnlyDropAttack(t, e, a) {
		return !(
			!e.ReBulletData.Logic.PresentTagIds.includes(1994027462) ||
			((e = Global_1.Global.BaseCharacter?.CharacterActorComponent),
			(a = a.GetComponent(1)),
			!e) ||
			!a ||
			Vector_1.Vector.DistSquared2D(
				a.ActorLocationProxy,
				e.ActorLocationProxy,
			) > 28900
		);
	}
	static CheckHitDataMatchCrystalAttack(t, e, a) {
		return !!e.ReBulletData.Logic.PresentTagIds.includes(-1590436469);
	}
	static CheckHitDataMatchPlayerAttack(t, e, a) {
		var c;
		return (
			!!e.Attacker?.Valid &&
			!!(
				(c = e.Attacker?.GetComponent(0))?.IsRole() ||
				c?.IsVision() ||
				((c = e.Attacker?.GetComponent(47)?.RoleId) &&
					EntitySystem_1.EntitySystem.GetComponent(c, 0)?.IsRole())
			)
		);
	}
	static CheckHitDataMatchFixedBulletId(t, e, a) {
		return !(
			!e.Attacker?.Valid ||
			(t.BulletId?.length && !t.BulletId.includes(e.BulletId))
		);
	}
}
exports.SceneItemHitUtils = SceneItemHitUtils;
