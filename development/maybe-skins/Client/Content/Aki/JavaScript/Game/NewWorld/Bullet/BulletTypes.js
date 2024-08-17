"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.KuroHitResultCache = exports.HitInformation = void 0);
const UE = require("ue"),
	Stats_1 = require("../../../Core/Common/Stats"),
	FNameUtil_1 = require("../../../Core/Utils/FNameUtil"),
	Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
	Vector_1 = require("../../../Core/Utils/Math/Vector"),
	CharacterController_1 = require("../Character/CharacterController"),
	BulletDataMain_1 = require("./BulletConf/BulletDataMain");
class HitInformation {
	constructor(t, e, r, i, a, o, s, n, h, l, c, u, C = -1, m = -1) {
		(this.HitPosition = Vector_1.Vector.Create()),
			(this.HitEffectRotation = Rotator_1.Rotator.Create()),
			(this.CalculateType = -1),
			n ? this.HitPosition.FromUeVector(n) : this.HitPosition.Reset(),
			a
				? this.HitEffectRotation.FromUeRotator(a)
				: this.HitEffectRotation.Reset(),
			(this.Target = e),
			(this.HitPart = s),
			(this.BulletId = i),
			(this.SkillLevel = h),
			(this.Attacker = t),
			(this.IsShaking = o),
			(this.HitEffect = r),
			(this.ReBulletData = l),
			(this.BulletDataPreset = u),
			(this.BulletEntityId = C),
			(this.BulletRowName = c),
			(this.CalculateType = m);
	}
	static FromUeHitInformation(t) {
		return new HitInformation(
			CharacterController_1.CharacterController.GetEntityByUeTsBaseCharacter(
				t.攻击者,
			),
			CharacterController_1.CharacterController.GetEntityByUeTsBaseCharacter(
				t.受击者,
			),
			t.被击效果,
			t.子弹ID,
			t.受击特效旋转,
			t.是否震动,
			t.受击部位,
			t.受击位置,
			t.技能等级,
			new BulletDataMain_1.BulletDataMain(t.重构子弹数据, ""),
			t.子弹表ID,
			t.子弹逻辑预设,
			void 0,
			t.伤害类型,
		);
	}
	ToUeHitInformation() {
		return new UE.SHitInformation(
			CharacterController_1.CharacterController.GetUeTsBaseCharacterByEntity(
				this.Attacker,
			),
			CharacterController_1.CharacterController.GetUeTsBaseCharacterByEntity(
				this.Target,
			),
			this.HitEffect,
			this.BulletId,
			this.HitPosition.ToUeVector(),
			this.HitEffectRotation.ToUeRotator(),
			this.IsShaking,
			this.HitPart,
			this.HitPosition.ToUeVector(),
			this.SkillLevel,
			this.ReBulletData.Data,
			this.BulletDataPreset,
			this.BulletRowName,
			this.CalculateType,
		);
	}
}
exports.HitInformation = HitInformation;
class KuroHitResultCache {
	constructor() {
		(this.HitCount = 0),
			(this.Actors = new Array()),
			(this.BoneNameArray = new Array()),
			(this.Components = new Array()),
			(this.ImpactPointX = new Array()),
			(this.ImpactPointY = new Array()),
			(this.ImpactPointZ = new Array());
	}
	Append(t) {
		var e = t.GetHitCount(),
			r = ((this.HitCount += e), t.Actors),
			i = t.BoneNameArray,
			a = t.Components,
			o = t.ImpactPointX_Array,
			s = t.ImpactPointY_Array,
			n = t.ImpactPointZ_Array;
		for (let t = 0; t < e; t++)
			this.Actors.push(r.Get(t)),
				this.BoneNameArray.push(
					FNameUtil_1.FNameUtil.GetDynamicFName(i.Get(t)),
				),
				this.Components.push(a.Get(t)),
				this.ImpactPointX.push(o.Get(t)),
				this.ImpactPointY.push(s.Get(t)),
				this.ImpactPointZ.push(n.Get(t));
	}
}
(exports.KuroHitResultCache = KuroHitResultCache).y7o = void 0;
