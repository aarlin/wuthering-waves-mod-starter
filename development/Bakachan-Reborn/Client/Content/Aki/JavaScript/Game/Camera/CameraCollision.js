"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CameraCollision = void 0);
const UE = require("ue"),
	Log_1 = require("../../Core/Common/Log"),
	QueryTypeDefine_1 = require("../../Core/Define/QueryTypeDefine"),
	Vector_1 = require("../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../Core/Utils/MathUtils"),
	TraceElementCommon_1 = require("../../Core/Utils/TraceElementCommon"),
	TsBaseCharacter_1 = require("../Character/TsBaseCharacter"),
	GlobalData_1 = require("../GlobalData"),
	ModelManager_1 = require("../Manager/ModelManager"),
	MIN_DITHER = 0.01,
	MAX_VALUE = 9999999,
	PROBE_RATIO = 4,
	PLAYER_COLLISION_RADUIS = 20,
	PROFILE_KEY1 = "FightCameraLogicComponent_CheckCollision_Camera",
	PROFILE_KEY2 = "FightCameraLogicComponent_CheckCollision_Npc",
	PROFILE_KEY3 =
		"FightCameraLogicComponent_CheckCollision_Camera_Caught_PlayerLocation",
	PROFILE_KEY4 = "FightCameraLogicComponent_CheckCollision_Player";
class CameraCollision {
	constructor() {
		(this.Hh = void 0),
			(this.Tae = void 0),
			(this.Lae = void 0),
			(this.Fse = void 0),
			(this.Hse = void 0),
			(this.jse = void 0),
			(this.Dae = void 0),
			(this.Rae = void 0),
			(this._ae = Vector_1.Vector.Create()),
			(this.uae = Vector_1.Vector.Create()),
			(this.Uae = Vector_1.Vector.Create()),
			(this.Aae = Vector_1.Vector.Create()),
			(this.Pae = Vector_1.Vector.Create()),
			(this.xae = Vector_1.Vector.Create()),
			(this.wae = Vector_1.Vector.Create()),
			(this.Bae = Vector_1.Vector.Create()),
			(this.bae = Vector_1.Vector.Create()),
			(this.Lz = Vector_1.Vector.Create()),
			(this.qae = 0),
			(this.Gae = 0),
			(this.Nae = 0),
			(this.Oae = !1),
			(this.kae = !1),
			(this.IsLeftCollision = !1),
			(this.IsRightCollision = !1),
			(this.IsOpenBlend = !0),
			(this.CurrentBlendState = 0),
			(this.Fae = 0),
			(this.Vae = 0),
			(this.Hae = 0),
			(this.jae = 0),
			(this.Wae = 0),
			(this.IsNpcDitherEnable = !0),
			(this.IsPlayerXRayEnable = !0),
			(this.Kae = new Set()),
			(this.Qae = new Map());
	}
	Init(e) {
		this.Hh = e;
	}
	InitTraceElements() {
		(this.Fse = UE.NewObject(UE.TraceSphereElement.StaticClass())),
			(this.Fse.bIsSingle = !1),
			(this.Fse.bTraceComplex = !1),
			(this.Fse.bIgnoreSelf = !0),
			this.Fse.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.Camera),
			(this.jse = UE.NewObject(UE.TraceSphereElement.StaticClass())),
			(this.jse.bIsSingle = !0),
			(this.jse.bTraceComplex = !1),
			(this.jse.bIgnoreSelf = !0),
			this.jse.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.Camera),
			(this.Hse = UE.NewObject(UE.TraceSphereElement.StaticClass())),
			(this.Hse.bIsSingle = !0),
			(this.Hse.bTraceComplex = !1),
			(this.Hse.bIgnoreSelf = !0),
			this.Hse.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.Camera),
			(this.Dae = UE.NewObject(UE.TraceSphereElement.StaticClass())),
			(this.Dae.bIsSingle = !1),
			(this.Dae.bTraceComplex = !1),
			(this.Dae.bIgnoreSelf = !0),
			this.Dae.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.Pawn),
			this.Dae.AddObjectTypeQuery(
				QueryTypeDefine_1.KuroObjectTypeQuery.PawnMonster,
			),
			this.Dae.AddObjectTypeQuery(
				QueryTypeDefine_1.KuroObjectTypeQuery.PawnPlayer,
			),
			(this.Rae = UE.NewObject(UE.TraceSphereElement.StaticClass())),
			(this.Rae.bIsSingle = !1),
			(this.Rae.bTraceComplex = !1),
			(this.Rae.bIgnoreSelf = !0),
			this.Rae.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.Pawn),
			this.Rae.AddObjectTypeQuery(
				QueryTypeDefine_1.KuroObjectTypeQuery.PawnMonster,
			),
			this.Rae.AddObjectTypeQuery(
				QueryTypeDefine_1.KuroObjectTypeQuery.PawnPlayer,
			);
	}
	SetDrawDebugEnable(e) {
		e
			? (this.Fse.SetDrawDebugTrace(1),
				(this.Fse.DrawTime = 5),
				this.jse.SetDrawDebugTrace(1),
				(this.jse.DrawTime = 5),
				this.Hse.SetDrawDebugTrace(1),
				(this.Hse.DrawTime = 5),
				this.Dae.SetDrawDebugTrace(1),
				(this.Dae.DrawTime = 5),
				this.Rae.SetDrawDebugTrace(0),
				(this.Rae.DrawTime = 5))
			: (this.Fse.SetDrawDebugTrace(0),
				(this.Fse.DrawTime = 0),
				this.jse.SetDrawDebugTrace(0),
				(this.jse.DrawTime = 0),
				this.Hse.SetDrawDebugTrace(0),
				(this.Hse.DrawTime = 0),
				this.Dae.SetDrawDebugTrace(0),
				(this.Dae.DrawTime = 0),
				this.Rae.SetDrawDebugTrace(0),
				(this.Rae.DrawTime = 0));
	}
	SetCharacter(e) {
		(this.Tae = e),
			this.Fse.ActorsToIgnore.Add(e),
			this.jse.ActorsToIgnore.Add(e),
			this.Hse.ActorsToIgnore.Add(e),
			this.Dae.ActorsToIgnore.Add(e),
			this.Rae.ActorsToIgnore.Add(e),
			(this.Lae = e?.CharacterActorComponent?.Entity?.GetComponent(66));
	}
	SetCameraConfig(e) {
		this.Wae = e * e * 4;
	}
	Clear() {
		this.Fse && (this.Fse.Dispose(), (this.Fse = void 0)),
			this.Hse && (this.Hse.Dispose(), (this.Hse = void 0)),
			this.jse && (this.jse.Dispose(), (this.jse = void 0)),
			this.Dae && (this.Dae.Dispose(), (this.Dae = void 0)),
			this.Rae && (this.Rae.Dispose(), (this.Rae = void 0)),
			(this.Oae = !1),
			(this.kae = !1),
			(this.IsLeftCollision = !1),
			(this.IsRightCollision = !1),
			this.Kae.clear();
	}
	ResetBlendData() {
		this.CurrentBlendState = 0;
	}
	CheckCollision(e, t, i) {
		return (
			this.Pae.DeepCopy(t),
			this.pae(),
			this.Xae(e, t),
			this.$ae(e, t),
			this.Yae(),
			this.Jae(e, t),
			this.zae(e, t, i),
			this.Zae(t),
			this.ehe(e),
			this.Pae
		);
	}
	Xae(e, t) {
		this._ae.DeepCopy(e),
			this.uae.DeepCopy(t),
			(this.Fse.WorldContextObject = GlobalData_1.GlobalData.World),
			(this.Fse.Radius = this.Hh.CurrentCollisionSize),
			this.Lae &&
				(this._ae.Z = Math.max(
					this._ae.Z,
					this.Lae.GetWaterLocation().Z +
						this.Hh.CollisionAdditionalHeightInWater,
				)),
			TraceElementCommon_1.TraceElementCommon.SetStartLocation(
				this.Fse,
				this._ae,
			),
			TraceElementCommon_1.TraceElementCommon.SetEndLocation(
				this.Fse,
				this.uae,
			),
			(this.Oae = !1),
			TraceElementCommon_1.TraceElementCommon.SphereTrace(
				this.Fse,
				PROFILE_KEY1,
			) &&
				((this.Nae = this.the(this._ae, this.uae, this.Fse.HitResult)),
				0 <= this.Nae) &&
				(TraceElementCommon_1.TraceElementCommon.GetHitLocation(
					this.Fse.HitResult,
					this.Nae,
					this.Pae,
				),
				(this.Oae = !0));
	}
	Yae() {
		var e;
		(this.kae = !1),
			this.Oae &&
				(e = this.Fse.HitResult?.Components?.Get(this.Nae))?.IsValid() &&
				2 ===
					e.GetCollisionResponseToChannel(
						QueryTypeDefine_1.KuroCollisionChannel.Water,
					) &&
				((this.Pae.Z = Math.max(
					this.Pae.Z,
					this.Pae.Z +
						this.Hh.CollisionProbeSize +
						MathUtils_1.MathUtils.KindaSmallNumber,
				)),
				(this.kae = !0));
	}
	$ae(e, t) {
		var i;
		this.Oae &&
			(e.Subtraction(t, this.Uae),
			this.Uae.Normalize(),
			(i = (this.Hh.CheckWidth + this.Fae) / Vector_1.Vector.Dist(t, this.Pae)),
			(i = Vector_1.Vector.Dist(t, e) * i),
			this.Uae.CrossProduct(Vector_1.Vector.DownVectorProxy, this.Aae),
			this.Aae.MultiplyEqual(i),
			e.Addition(this.Aae, this._ae),
			this.jse.HitResult?.Clear(),
			(this.jse.WorldContextObject = GlobalData_1.GlobalData.World),
			(this.jse.Radius = this.Hh.CheckCollisionProbeSize),
			this._ae.DeepCopy(this.ihe(this._ae, this.Uae, -this.jse.Radius)),
			this.uae.DeepCopy(t),
			TraceElementCommon_1.TraceElementCommon.SetStartLocation(
				this.jse,
				this._ae,
			),
			TraceElementCommon_1.TraceElementCommon.SetEndLocation(
				this.jse,
				this.uae,
			),
			(this.IsRightCollision =
				TraceElementCommon_1.TraceElementCommon.SphereTrace(
					this.jse,
					PROFILE_KEY1,
				)),
			this.IsRightCollision ||
				(TraceElementCommon_1.TraceElementCommon.SetStartLocation(
					this.jse,
					this.uae,
				),
				TraceElementCommon_1.TraceElementCommon.SetEndLocation(
					this.jse,
					this._ae,
				),
				(this.IsRightCollision =
					TraceElementCommon_1.TraceElementCommon.SphereTrace(
						this.jse,
						PROFILE_KEY1,
					))),
			this.Aae.UnaryNegation(this.Aae),
			e.Addition(this.Aae, this._ae),
			this.Hse.HitResult?.Clear(),
			(this.Hse.WorldContextObject = GlobalData_1.GlobalData.World),
			(this.Hse.Radius = this.Hh.CheckCollisionProbeSize),
			this._ae.DeepCopy(this.ihe(this._ae, this.Uae, -this.Hse.Radius)),
			TraceElementCommon_1.TraceElementCommon.SetStartLocation(
				this.Hse,
				this._ae,
			),
			TraceElementCommon_1.TraceElementCommon.SetEndLocation(
				this.Hse,
				this.uae,
			),
			(this.IsLeftCollision =
				TraceElementCommon_1.TraceElementCommon.SphereTrace(
					this.Hse,
					PROFILE_KEY1,
				)),
			this.IsLeftCollision ||
				(TraceElementCommon_1.TraceElementCommon.SetStartLocation(
					this.Hse,
					this.uae,
				),
				TraceElementCommon_1.TraceElementCommon.SetEndLocation(
					this.Hse,
					this._ae,
				),
				(this.IsLeftCollision =
					TraceElementCommon_1.TraceElementCommon.SphereTrace(
						this.Hse,
						PROFILE_KEY1,
					))));
	}
	Jae(e, t) {
		if (this.IsOpenBlend) {
			if (!this.ohe())
				switch (this.CurrentBlendState) {
					case 0:
						this.Oae &&
							(this.IsLeftCollision || this.IsRightCollision) &&
							(e.Subtraction(this.Hh.CameraLocation, this.wae),
							e.Subtraction(this.Pae, this.Bae),
							(this.qae = this.wae.Size()),
							(this.Gae = this.Bae.Size()),
							(this.CurrentBlendState = 1));
						break;
					case 1:
						if (this.Oae && this.IsLeftCollision && this.IsRightCollision)
							this.CurrentBlendState = 2;
						else if (
							this.Oae &&
							(this.IsLeftCollision || this.IsRightCollision)
						) {
							if (
								(e.Subtraction(this.Hh.CameraLocation, this.wae),
								e.Subtraction(this.Pae, this.Bae),
								(this.qae = this.wae.Size()),
								(this.Gae = this.Bae.Size()),
								this.rhe(e, t, this.qae))
							)
								return void this.ResetBlendData();
							this.qae <= this.Gae && (this.CurrentBlendState = 2);
						} else
							this.Oae
								? (this.CurrentBlendState = 1)
								: (this.CurrentBlendState = 3);
						break;
					case 3:
						if (this.Oae && (this.IsLeftCollision || this.IsRightCollision))
							this.CurrentBlendState = 1;
						else {
							if (
								(e.Subtraction(this.Hh.CameraLocation, this.wae),
								e.Subtraction(t, this.Bae),
								(this.qae = this.wae.Size()),
								(this.Gae = this.Bae.Size()),
								this.rhe(e, t, this.qae))
							)
								return void this.ResetBlendData();
							(this.qae >= this.Gae || this.qae >= this.Hh.MaxArmLength) &&
								(this.CurrentBlendState = 0);
						}
						break;
					case 2:
						this.Oae ||
							this.IsLeftCollision ||
							this.IsRightCollision ||
							(e.Subtraction(this.Hh.CameraLocation, this.wae),
							e.Subtraction(t, this.Bae),
							(this.qae = this.wae.Size()),
							(this.Gae = this.Bae.Size()),
							(this.CurrentBlendState = 3));
				}
		} else this.CurrentBlendState = this.Oae ? 2 : 0;
	}
	zae(e, t, i) {
		switch (this.CurrentBlendState) {
			case 1:
				var a = this.qae - this.Hh.InSpeed * i;
				a = Math.max(this.Gae, a);
				t.Subtraction(e, this.Uae),
					this.Uae.Normalize(),
					this.Uae.Multiply(a, this.bae),
					e.Addition(this.bae, this.Pae);
				break;
			case 3:
				(a = this.qae + this.Hh.OutSpeed * i),
					(a = Math.min(this.Gae, a)),
					(a = Math.min(this.Hh.MaxArmLength, a)),
					t.Subtraction(e, this.Uae),
					this.Uae.Normalize(),
					this.Uae.Multiply(a, this.bae),
					e.Addition(this.bae, this.Pae);
				break;
			case 0:
				this.kae || this.Pae.DeepCopy(t);
		}
	}
	Zae(e) {
		if (this.IsNpcDitherEnable) {
			this.nhe(),
				this.she(),
				this.Dae.HitResult?.Clear(),
				(this.Dae.WorldContextObject = GlobalData_1.GlobalData.World),
				(this.Dae.Radius = this.Vae),
				TraceElementCommon_1.TraceElementCommon.SetStartLocation(
					this.Dae,
					this.Pae,
				),
				TraceElementCommon_1.TraceElementCommon.SetEndLocation(
					this.Dae,
					this.xae,
				);
			var t = TraceElementCommon_1.TraceElementCommon.SphereTrace(
					this.Dae,
					PROFILE_KEY2,
				),
				i = this.Dae.HitResult.GetHitCount();
			if (t)
				for (var [a, s] of (this.ahe(this.Dae.HitResult), this.Qae))
					this.hhe(a)
						? (a.SetDitherEffect(1, 1),
							Log_1.Log.CheckDebug() &&
								Log_1.Log.Debug(
									"Camera",
									58,
									`[NPC Dither] 存在忽略Tag,恢复Npc'${a?.GetName()}'Dither`,
								))
						: (a.SetDitherEffect(this.lhe(a, s), 1),
							(s = this.Kae.has(a)) && this.Kae.delete(a),
							this.Kae.add(a),
							s ||
								(Log_1.Log.CheckDebug() &&
									Log_1.Log.Debug("Camera", 58, "[NPC Dither] 应用Npc Dither", [
										"actor?.GetName()",
										a?.GetName(),
									])));
			var o = this.Kae.values();
			for (let e = 0; e < this.Kae.size - i; e++) {
				var h = o.next();
				h.value &&
					h.value instanceof TsBaseCharacter_1.default &&
					h.value.IsValid() &&
					(h.value.SetDitherEffect(1, 1), Log_1.Log.CheckDebug()) &&
					Log_1.Log.Debug(
						"Camera",
						58,
						`[NPC Dither] 恢复Npc'${h.value?.GetName()}'Dither`,
					),
					this.Kae.delete(h.value);
			}
		} else
			0 < this.Kae.size &&
				(this.Kae.forEach((e) => {
					e?.IsValid() &&
						(e.SetDitherEffect(1, 1), Log_1.Log.CheckDebug()) &&
						Log_1.Log.Debug(
							"Camera",
							58,
							`[NPC Dither] 禁用Npc虚化时恢复Npc'${e?.GetName()}'Dither`,
						);
				}),
				this.Kae.clear());
	}
	ehe(e) {
		this.IsPlayerXRayEnable &&
		(this.Rae.HitResult?.Clear(),
		(this.Rae.WorldContextObject = GlobalData_1.GlobalData.World),
		(this.Rae.Radius = 20),
		TraceElementCommon_1.TraceElementCommon.SetStartLocation(
			this.Rae,
			this.Pae,
		),
		TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.Rae, e),
		TraceElementCommon_1.TraceElementCommon.SphereTrace(
			this.Rae,
			PROFILE_KEY4,
		)) &&
		this._he(this.Rae.HitResult)
			? this.Tae?.CharacterActorComponent?.SetActorXRayState(!0)
			: this.Tae?.CharacterActorComponent?.SetActorXRayState(!1);
	}
	ResetAllNpcDither() {
		for (const e of this.Kae) {
			if (!e?.IsValid()) return;
			e.SetDitherEffect(1, 1);
		}
		this.Kae.clear();
	}
	pae() {
		var e;
		this.Hh.NearCollisionProbeSize <= this.Hh.CollisionProbeSize
			? Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Character",
					58,
					"CollisionSize数据错误:NearCollisionProbeSize <= this.CollisionProbeSize",
					["CollisionProbeSize", this.Hh.CollisionProbeSize],
					["NearCollisionProbeSize", this.Hh.NearCollisionProbeSize],
				)
			: ((this.Fae =
					this.Hh.NearCollisionProbeSize - this.Hh.CollisionProbeSize),
				(e = MathUtils_1.MathUtils.Clamp(
					this.Hh.CameraInputController.InputSpeedPercentage /
						this.Hh.CollisionSizePercentage,
					0,
					1,
				)),
				(this.Hh.CurrentCollisionSize =
					this.Fae * e + this.Hh.CollisionProbeSize),
				(this.Hh.CurrentCollisionSize = MathUtils_1.MathUtils.Clamp(
					this.Hh.CurrentCollisionSize,
					this.Hh.CurrentCollisionSize,
					this.Hh.NearCollisionProbeSize,
				)),
				0 !== this.CurrentBlendState &&
					(this.Hh.CurrentCollisionSize = this.Hh.NearCollisionProbeSize));
	}
	ihe(e, t, i) {
		return t.Multiply(i, this.Lz), e.Addition(this.Lz, this.Lz), this.Lz;
	}
	ohe() {
		return 0 !== this.Hh.CameraDialogueController.State
			? ((this.CurrentBlendState = this.Oae ? 2 : 0), !0)
			: !!ModelManager_1.ModelManager.GameModeModel.IsSilentLogin &&
					!(this.CurrentBlendState = 0);
	}
	rhe(e, t, i) {
		return e.Subtraction(t, this.Lz).SizeSquared() < i * i;
	}
	hhe(e) {
		return !!e.GetEntityNoBlueprint()?.GetComponent(185)?.HasTag(-1151151013);
	}
	nhe() {
		var e, t;
		(MathUtils_1.MathUtils.IsNearlyEqual(
			this.Hae,
			ModelManager_1.ModelManager.CameraModel.CameraDitherStartHideDistance,
		) &&
			MathUtils_1.MathUtils.IsNearlyEqual(this.jae, this.Hh.Fov)) ||
			((this.Hae =
				ModelManager_1.ModelManager.CameraModel.CameraDitherStartHideDistance),
			(this.jae = this.Hh.Fov),
			(e = this.Hae),
			(t = this.Hh.CameraActor.CameraComponent.AspectRatio),
			(t = MathUtils_1.MathUtils.VerticalFovToHorizontally(this.Hh.Fov, t)),
			(t = Math.sin((t / 2) * MathUtils_1.MathUtils.DegToRad) * e * 2),
			(this.Vae = MathUtils_1.MathUtils.GetTriangleCircumradius(e, e, t)));
	}
	she() {
		this.Hh.CameraForward.Normalize(),
			this.Hh.CameraForward.Multiply(this.Vae, this.Lz),
			this.Pae.Addition(this.Lz, this.xae);
	}
	ahe(e) {
		var t = e.GetHitCount();
		this.Qae.clear();
		for (let s = 0; s < t; ++s) {
			var i,
				a = e.Actors.Get(s);
			a &&
				a instanceof UE.Object &&
				a.IsValid() &&
				a.IsA(UE.TsBaseCharacter_C.StaticClass()) &&
				(a.GetEntityNoBlueprint()?.GetComponent(0)?.GetModelConfig()
					?.主角蓝透 ||
					(TraceElementCommon_1.TraceElementCommon.GetImpactPoint(
						e,
						s,
						this.Lz,
					),
					(this.Qae.get(a) ?? 9999999) <=
						(i = Vector_1.Vector.Dist(this.Lz, this.Pae))) ||
					this.Qae.set(a, i));
		}
	}
	lhe(e, t) {
		if (!e?.IsValid() || !e.CapsuleComponent) return 1;
		let i = this.Hh.CompleteHideDistance,
			a = this.Hh.StartHideDistance,
			s = this.Hh.StartDitherValue;
		return (
			e.CapsuleComponent.GetCollisionObjectType() ===
				QueryTypeDefine_1.KuroCollisionChannel.PawnMonster &&
				(e = e.GetEntityNoBlueprint()?.GetComponent(3)) &&
				((i = e.CompleteHideDistance),
				(a = e.StartHideDistance),
				(s = e.StartDitherValue)),
			MathUtils_1.MathUtils.RangeClamp(t, i, a, 0.01, s)
		);
	}
	the(e, t, i) {
		if (e.Z > t.Z) return 0;
		let a = -1,
			s = 9999999;
		var o = i.GetHitCount();
		for (let t = 0; t < o; ++t) {
			var h,
				r = this.Fse.HitResult?.Components?.Get(t);
			r?.IsValid() &&
				(TraceElementCommon_1.TraceElementCommon.GetImpactPoint(i, t, this.Lz),
				(h = Vector_1.Vector.DistSquared(this.Lz, e)),
				(2 ===
					r.GetCollisionResponseToChannel(
						QueryTypeDefine_1.KuroCollisionChannel.Water,
					) &&
					h <= this.Wae) ||
					(h < s && ((s = h), (a = t))));
		}
		return a;
	}
	_he(e) {
		var t = e.GetHitCount();
		for (let a = 0; a < t; ++a) {
			var i = e.Actors.Get(a);
			if (
				i &&
				i instanceof UE.Object &&
				i.IsValid() &&
				i.IsA(UE.TsBaseCharacter_C.StaticClass()) &&
				i.GetEntityNoBlueprint()?.GetComponent(0)?.GetModelConfig()?.主角蓝透
			)
				return !0;
		}
		return !1;
	}
	TraceCheckPlayerLocation(e, t, i) {
		return (
			(this.Fse.WorldContextObject = GlobalData_1.GlobalData.World),
			(this.Fse.Radius = this.Hh.CurrentCollisionSize),
			TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.Fse, e),
			TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.Fse, t),
			!!TraceElementCommon_1.TraceElementCommon.SphereTrace(
				this.Fse,
				PROFILE_KEY3,
			) &&
				(TraceElementCommon_1.TraceElementCommon.GetHitLocation(
					this.Fse.HitResult,
					0,
					i,
				),
				!0)
		);
	}
}
exports.CameraCollision = CameraCollision;
