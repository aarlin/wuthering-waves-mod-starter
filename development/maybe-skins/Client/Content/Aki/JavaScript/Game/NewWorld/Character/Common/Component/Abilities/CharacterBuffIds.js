"use strict";
function checkBuffInSpecialList(e) {
	if (exports.specialIgnoreBuff.includes(e)) return !0;
	if (exports.specialIgnoreGaBuff.includes(e)) return !0;
	let n = Object.values(exports.gameplayAbilityVisionBuffId);
	return (
		!!n.includes(e) ||
		!!(n = Object.values(exports.fillElementBuffId)).includes(e) ||
		!!(n = Object.values(exports.buffId)).includes(e)
	);
}
function checkBulletInSpecialList(e) {
	return !!exports.specialIgnoreBullet.includes(e);
}
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.checkBulletInSpecialList =
		exports.specialIgnoreBullet =
		exports.specialBulletToSkillIdMap =
		exports.checkBuffInSpecialList =
		exports.specialIgnoreBuff =
		exports.specialIgnoreGaBuff =
		exports.specialBuffToSkillIdMap =
		exports.gameplayAbilityVisionBuffId =
		exports.fillElementBuffId =
		exports.buffId =
			void 0),
	(exports.buffId = {
		AfterDrownRecoverStrength: BigInt(1105),
		OverrideLifeToZero: BigInt(1108),
		SprintCost: BigInt(1201),
		FastClimbCost: BigInt(1205),
		GlideCost: BigInt(1206),
		DrownPunishment: BigInt(1208),
		GlideCoolDown: BigInt(1212),
		AirStrengthDecreaseRetain: BigInt(3009),
		AirStrengthRecoverForbidden: BigInt(3010),
		WaterClimbStrengthForbidden: BigInt(3011),
		SkillStrengthForbidden: BigInt(3015),
		WeakTimeCommon: BigInt(3022),
		EmptyStrengthPunish: BigInt(3023),
		ToughRecoverDelay: BigInt(3024),
		ConsumeQte: BigInt(3026),
		ElementClean: BigInt(3027),
		ActivateMultiQte: BigInt(3028),
		ActivateQte: BigInt(3029),
		WaitRemoveQteInvincible: BigInt(3030),
		QteUsable: BigInt(3032),
		QteInvincible: BigInt(3033),
		QteCd: BigInt(3034),
		CounterInvincibleCommon: BigInt(3036),
		StoryInvincibleCommon: BigInt(3037),
		Invisible: BigInt(3072),
		FallImmune: BigInt(3098),
		OnStage: BigInt(3111),
		GoBattleInvincible: BigInt(3051),
		GoDown: BigInt(1101006002),
		VisionControl: BigInt(9100000020002),
		QteAssistCd: BigInt(900000000012),
		ElevatorBuff: BigInt(640003011),
		IgnoreHateBuff: BigInt(1103100015),
		StealthIgnoreHateBuff: BigInt(70000049),
		ChangeRoleBuff: BigInt(70000049),
		ManipulateInteractBuffId: BigInt(640003012),
		ManipulateInteractBuffIdMaleX: BigInt(640003013),
	}),
	(exports.fillElementBuffId = {
		Ice: BigInt(1002001100),
		Fire: BigInt(1002002100),
		Thunder: BigInt(1002003100),
		Wind: BigInt(1002004100),
		Light: BigInt(1002005100),
		Dark: BigInt(1002006100),
	}),
	(exports.gameplayAbilityVisionBuffId = {
		RoleSummonBuffId: 1900000014n,
		VisionSummonBuffId: 1900000015n,
		RoleHideBuffId: 1900000019n,
		VisionAppearBuffId: 1900000017n,
		RoleAppearBuffId: 1900000020n,
		DamageReductionBuffId: 2100000003n,
		MaterialCueId: 19000000181n,
		MorphParticleCueId: 19000000182n,
		SummonParticleCueId: 19000000162n,
	}),
	(exports.specialBuffToSkillIdMap = new Map([
		[1202002005n, 120261],
		[1103200007n, 11030012],
		[1404500003n, 1404200],
		[1404500007n, 1404307],
		[1403032004n, 1403030],
		[1403020061n, 1403050],
	])),
	(exports.specialIgnoreGaBuff = [1404500005n, 1103200005n]),
	(exports.specialIgnoreBuff = [
		5003001003n,
		1204n,
		1211n,
		1210n,
		1209n,
		3124n,
		1403081001n,
		640003009n,
		640003010n,
		1101009002n,
		80014011n,
		621030203n,
		621030207n,
		80003009n,
		80003002n,
		70000003n,
		5008001002n,
	]),
	(exports.checkBuffInSpecialList = checkBuffInSpecialList),
	(exports.specialBulletToSkillIdMap = new Map([
		["77042000004", 77042034],
		["1103000013", 1103e4],
		["1104015010", 1104017],
		["1403021001", 1403012],
		["28000701", 280007050],
		["28000702", 280007051],
	])),
	(exports.specialIgnoreBullet = ["4000000003", "210000004", "80004012001"]),
	(exports.checkBulletInSpecialList = checkBulletInSpecialList);
