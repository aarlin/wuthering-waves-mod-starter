"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CharacterWeaponMesh = exports.CharacterWeapon = void 0);
const UE = require("ue"),
	FNameUtil_1 = require("../../../../../../Core/Utils/FNameUtil"),
	SkeletalMeshEffectContext_1 = require("../../../../../Effect/EffectContext/SkeletalMeshEffectContext"),
	EffectSystem_1 = require("../../../../../Effect/EffectSystem"),
	SkeletalMeshComponentPool_1 = require("../MeshHelper/SkeletalMeshComponentPool"),
	WeaponMeshVisibleHelper_1 = require("./WeaponMeshVisibleHelper"),
	WEAPON_HIDDEN_EFFECT =
		"/Game/Aki/Effect/EffectGroup/Common/DA_Fx_Group_WeaponEnd.DA_Fx_Group_WeaponEnd";
class CharacterWeapon {
	constructor(e, t, s, f = void 0) {
		(this.Index = e),
			(this.Mesh = t),
			(this.HideEffectMode = s),
			(this.EntityId = f),
			(this.NormalSocket = void 0),
			(this.BattleSocket = void 0),
			(this.BattleEffectId = void 0),
			(this.LerpStartTransform = void 0),
			(this.LerpEndTransform = void 0),
			(this.WeaponHidden = !1),
			(this.WeaponHideEffect = 0),
			(this.WeaponBuffEffects = new Set()),
			(this.VisibleHelper =
				new WeaponMeshVisibleHelper_1.WeaponMeshVisibleHelper(this));
	}
	Destroy() {
		this.ReleaseHideEffect();
	}
	ReleaseHideEffect() {
		EffectSystem_1.EffectSystem.IsValid(this.WeaponHideEffect) &&
			(EffectSystem_1.EffectSystem.StopEffectById(
				this.WeaponHideEffect,
				"[CharacterWeapon.Destroy]",
				!0,
			),
			(this.WeaponHideEffect = 0));
	}
	ShowHideEffect() {
		var e,
			t = this.Mesh.GetSocketTransform(FNameUtil_1.FNameUtil.EMPTY, 0);
		EffectSystem_1.EffectSystem.IsValid(this.WeaponHideEffect) ||
			(((e = new SkeletalMeshEffectContext_1.SkeletalMeshEffectContext(
				this.EntityId,
			)).SkeletalMeshComp = this.Mesh),
			(this.WeaponHideEffect = EffectSystem_1.EffectSystem.SpawnEffect(
				this.Mesh,
				t,
				WEAPON_HIDDEN_EFFECT,
				"[CharacterWeapon.ShowHideEffect]",
				e,
			))),
			EffectSystem_1.EffectSystem.IsValid(this.WeaponHideEffect)
				? ((e = EffectSystem_1.EffectSystem.GetEffectActor(
						this.WeaponHideEffect,
					)).K2_AttachToComponent(
						this.Mesh,
						FNameUtil_1.FNameUtil.EMPTY,
						0,
						0,
						0,
						!1,
					),
					e.K2_SetActorTransform(t, !1, void 0, !0))
				: (this.WeaponHideEffect = 0);
	}
	SetBuffEffectsHiddenInGame(e) {
		for (const s of this.WeaponBuffEffects) {
			var t;
			EffectSystem_1.EffectSystem.IsValid(s)
				? (t = EffectSystem_1.EffectSystem.GetEffectActor(s)) instanceof
						UE.Actor &&
					t?.IsValid() &&
					t.bHidden !== e &&
					t.SetActorHiddenInGame(e)
				: this.WeaponBuffEffects.delete(s);
		}
	}
	AddBuffEffect(e) {
		this.WeaponBuffEffects.add(e),
			this.WeaponHidden &&
				(e = EffectSystem_1.EffectSystem.GetEffectActor(e))?.IsValid() &&
				e.SetActorHiddenInGame(!0);
	}
	RemoveBuffEffect(e) {
		this.WeaponBuffEffects.delete(e);
	}
}
exports.CharacterWeapon = CharacterWeapon;
const WEAPON_POOL_MAX_SIZE = 3;
class CharacterWeaponMesh {
	constructor() {
		(this.cZo = new Array()), (this.mZo = void 0), (this.OC = void 0);
	}
	Init(e, t, s, f) {
		if (
			((this.mZo = new SkeletalMeshComponentPool_1.SkeletalMeshComponentPool()),
			this.mZo.Init(3, t, s, e, f),
			(this.OC = s),
			0 !== e.length)
		) {
			let t = 0;
			for (const f of e)
				this.cZo.push(
					new CharacterWeapon(t, f, s.WeaponHideEffect, this.OC.EntityId),
				),
					t++;
		}
		return !0;
	}
	Destroy() {
		for (const e of this.cZo) e.Destroy();
		this.cZo.splice(0, this.cZo.length), (this.mZo = void 0);
	}
	ChangeCharacterWeapons(e) {
		var t = this.cZo.length;
		if (e > 3) return [];
		var s = this.mZo?.GetComponents(e);
		if (!s) return [];
		if (e < t) {
			this.cZo.splice(e, t - e);
			for (let t = 0; t < e; ++t) this.cZo[t].Mesh = s[t];
		} else if (t < e) {
			var f = e - t;
			for (let e = 0; e < t; ++e) this.cZo[e].Mesh = s[e];
			for (let e = 0; e < f; ++e)
				this.cZo.push(
					new CharacterWeapon(
						e + t,
						s[e + t],
						this.OC.WeaponHideEffect,
						this.OC.EntityId,
					),
				);
		}
		return this.cZo;
	}
	get CharacterWeapons() {
		return this.cZo;
	}
	Clean() {
		this.ChangeCharacterWeapons(0);
	}
	ShrinkPool() {
		this.mZo.Shrink();
	}
	GetUsedLength() {
		return this.mZo.GetUsedLength();
	}
}
exports.CharacterWeaponMesh = CharacterWeaponMesh;
