"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (t, e, i, n) {
		var o,
			r = arguments.length,
			s =
				r < 3
					? e
					: null === n
						? (n = Object.getOwnPropertyDescriptor(e, i))
						: n;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			s = Reflect.decorate(t, e, i, n);
		else
			for (var a = t.length - 1; 0 <= a; a--)
				(o = t[a]) && (s = (r < 3 ? o(s) : 3 < r ? o(e, i, s) : o(e, i)) || s);
		return 3 < r && s && Object.defineProperty(e, i, s), s;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CharacterVisionComponent = void 0);
const UE = require("ue"),
	EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent"),
	RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent"),
	EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
	PhantomUtil_1 = require("../../../../../Module/Phantom/PhantomUtil"),
	CharacterAbilityComponent_1 = require("../Abilities/CharacterAbilityComponent"),
	GameplayAbilityVisionControl_1 = require("./GA/GameplayAbilityVisionControl"),
	GameplayAbilityVisionExplore_1 = require("./GA/GameplayAbilityVisionExplore"),
	GameplayAbilityVisionMorph_1 = require("./GA/GameplayAbilityVisionMorph"),
	GameplayAbilityVisionSummon_1 = require("./GA/GameplayAbilityVisionSummon"),
	visionTypes = {
		0: GameplayAbilityVisionSummon_1.GameplayAbilityVisionSummon,
		1: GameplayAbilityVisionMorph_1.GameplayAbilityVisionMorph,
		2: GameplayAbilityVisionExplore_1.GameplayAbilityVisionExplore,
		3: GameplayAbilityVisionControl_1.GameplayAbilityVisionControl,
	};
let CharacterVisionComponent = class extends EntityComponent_1.EntityComponent {
	constructor() {
		super(...arguments),
			(this.Ren = new Map()),
			(this.Aen = new Map()),
			(this.Uen = 0),
			(this.Pen = 0),
			(this.xen = void 0),
			(this.rQt = !1),
			(this.Gfr = () => {
				PhantomUtil_1.PhantomUtil.SetVisionEnable(this.Entity, !1);
			});
	}
	OnStart() {
		var t = this.Entity.GetComponent(0);
		(this.Pen = t.VisionSkillServerEntityId),
			this.xen
				? (this.wen(this.xen), (this.xen = void 0))
				: (t = t.ComponentDataMap.get("Fvs")?.Fvs?.Wps) && this.wen(t);
		for (const t of Object.keys(visionTypes))
			this.Aen.set(Number(t), visionTypes[Number(t)].Create(this));
		return (
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.TeleportStart,
				this.Gfr,
			),
			(this.rQt = !0)
		);
	}
	OnEnd() {
		for (const t of this.Aen.values()) t.Destroy();
		return (
			this.Ren.clear(),
			this.Aen.clear(),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.TeleportStart,
				this.Gfr,
			),
			!0
		);
	}
	OnTick(t) {
		for (const e of this.Aen.values()) e.Tick(t);
	}
	SetVisionSkillInformationList(t, e) {
		var i = this.Pen;
		if (((this.Pen = e), this.rQt)) {
			if ((this.wen(t), this.Pen !== i))
				for (const t of this.Aen.values()) t.OnVisionChanged();
		} else this.xen = t;
	}
	wen(t) {
		if ((this.Ren.clear(), (this.Uen = 0), t)) {
			var e = this.Entity.GetComponent(186);
			for (const n of t) {
				var i = PhantomUtil_1.PhantomUtil.GetVisionData(n.vkn);
				i &&
					(this.Ren.set(i.类型, n), [0, 1].includes(i.类型)) &&
					(e.ModifyCdInfo(
						PhantomUtil_1.PhantomUtil.GetSkillGroupId(n.vkn),
						PhantomUtil_1.PhantomUtil.GetSkillCd(n.vkn),
					),
					(this.Uen = n.vkn));
			}
		}
	}
	GetVisionIdList() {
		var t = UE.NewArray(UE.BuiltinInt);
		for (const e of this.Ren.values()) t.Add(e.vkn);
		return t;
	}
	GetVisionLevelList() {
		var t = UE.NewArray(UE.BuiltinInt);
		for (const e of this.Ren.values()) t.Add(e.rSs);
		return t;
	}
	GetVisionLevelByBuffId(t) {
		for (const e of this.Ren.values())
			if (
				0 < e.rSs &&
				PhantomUtil_1.PhantomUtil.GetSkillBuffIds(e.vkn).includes(t)
			)
				return e.rSs;
		return CharacterAbilityComponent_1.DEFAULT_SOURCE_SKILL_LEVEL_NOT_FOUND;
	}
	GetVisionLevelByDamageId(t) {
		for (const e of this.Ren.values())
			if (
				0 < e.rSs &&
				PhantomUtil_1.PhantomUtil.GetSkillSettleIds(e.vkn).includes(t)
			)
				return e.rSs;
		return CharacterAbilityComponent_1.DEFAULT_SOURCE_SKILL_LEVEL_NOT_FOUND;
	}
	GetVisionData(t) {
		if ([...this.Ren.values()].some((e) => e.vkn === t))
			return PhantomUtil_1.PhantomUtil.GetVisionData(t);
	}
	ActivateAbilityVision(t) {
		return this.Aen.get(t).ActivateAbility();
	}
	EndAbilityVision(t) {
		return this.Aen.get(t).EndAbility();
	}
	GetVisionId() {
		return this.Uen;
	}
	GetVisionSkillInformation(t) {
		return this.Ren.get(t);
	}
	ExitMultiSkillStateOfMorphVision() {
		var t = this.Aen.get(1);
		t && t.ExitMultiSkillState();
	}
	OnGoDown() {
		var t = this.Aen.get(1);
		t && t.OnGoDown();
	}
	SetKeepMultiSkillState(t, e) {
		var i = this.Aen.get(1);
		i && i.SetKeepMultiSkillState(t, e);
	}
	SetEnableAttackInputActionOfMorphVision(t) {
		var e = this.Aen.get(1);
		e && e.SetEnableAttackInputAction(t);
	}
	CanSummonerStartNextMultiSkill() {
		var t = this.Aen.get(1);
		return !!t && t.CanSummonerStartNextMultiSkill();
	}
};
(CharacterVisionComponent = __decorate(
	[(0, RegisterComponent_1.RegisterComponent)(34)],
	CharacterVisionComponent,
)),
	(exports.CharacterVisionComponent = CharacterVisionComponent);
