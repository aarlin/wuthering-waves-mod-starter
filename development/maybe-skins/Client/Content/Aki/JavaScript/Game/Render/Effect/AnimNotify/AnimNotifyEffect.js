"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const puerts_1 = require("puerts"),
	UE = require("ue"),
	Info_1 = require("../../../../Core/Common/Info"),
	Log_1 = require("../../../../Core/Common/Log"),
	Stats_1 = require("../../../../Core/Common/Stats"),
	QueryTypeDefine_1 = require("../../../../Core/Define/QueryTypeDefine"),
	Quat_1 = require("../../../../Core/Utils/Math/Quat"),
	Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	TraceElementCommon_1 = require("../../../../Core/Utils/TraceElementCommon"),
	TsBaseCharacter_1 = require("../../../Character/TsBaseCharacter"),
	SkeletalMeshEffectContext_1 = require("../../../Effect/EffectContext/SkeletalMeshEffectContext"),
	EffectSystem_1 = require("../../../Effect/EffectSystem"),
	GlobalData_1 = require("../../../GlobalData"),
	ColorUtils_1 = require("../../../Utils/ColorUtils"),
	RenderConfig_1 = require("../../Config/RenderConfig"),
	DISTANCE_EFFECT_ON_FLOOR = 1,
	DISTANCE_FOOT_TO_EFFECT = 10,
	DETECT_DEPTH = 100,
	PROFILE_KEY = "AnimNotifyEffect";
class AnimNotifyEffect extends UE.KuroEffectMakerAN {
	constructor() {
		super(...arguments),
			(this.NeedAnyTag = !1),
			(this.PlayNeedTags = void 0),
			(this.EffectDataAssetRef = void 0),
			(this.LocationType = 0),
			(this.RightOrLeftFoot = !0),
			(this.DebugTrace = !1),
			(this.SocketName = void 0),
			(this.UseSocketTransform = !1),
			(this.TraceFrom = void 0),
			(this.TraceTo = void 0),
			(this.UseClipboardTransform = !1),
			(this.DetachWhenSkillEnd = !1),
			(this.WhenSkillEnd = 0),
			(this.WhenSkillEndEnableTime = 0),
			(this.LastSkeletalMesh = void 0);
	}
	K2_ValidateAssets() {
		return !0;
	}
	K2_Notify(t, e) {
		this.LastSkeletalMesh = t;
		var o = this.LastSkeletalMesh.GetOwner(),
			i = this.EffectDataAssetRef.ToAssetPathName();
		if (!i?.length)
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"RenderEffect",
						3,
						"特效路径无效",
						["meshComp", t?.GetName()],
						["outer", o?.GetName()],
						["animation", e?.GetName()],
					),
				!1
			);
		if (
			!Info_1.Info.IsInCg() &&
			o instanceof TsBaseCharacter_1.default &&
			!this.GameplayTagsCheck(o)
		)
			return (
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug(
						"RenderEffect",
						51,
						"AnimNotifyEffect: 特效GameplayTag检查失败",
						["meshComp", t?.GetName()],
						["outer", o?.GetName()],
						["animation", e?.GetName()],
					),
				!1
			);
		EffectSystem_1.EffectSystem.InitializeWithPreview(!1);
		let r = 3,
			n =
				(o instanceof TsBaseCharacter_1.default &&
					o.CharacterActorComponent?.Entity?.GetComponent(33) &&
					(r = 0),
				void (
					(GlobalData_1.GlobalData.IsUiSceneOpen ||
						o.Tags.Contains(RenderConfig_1.RenderConfig.UIName)) &&
					(r = 1)
				));
		return (
			((n =
				o instanceof TsBaseCharacter_1.default &&
				o.CharacterActorComponent?.Entity
					? new SkeletalMeshEffectContext_1.SkeletalMeshEffectContext(
							o.CharacterActorComponent?.Entity.Id,
						)
					: new SkeletalMeshEffectContext_1.SkeletalMeshEffectContext(
							void 0,
						)).SkeletalMeshComp = t),
			(n.SourceObject = o),
			(n.CreateFromType = 1),
			o?.ActorHasTag(AnimNotifyEffect.TagFlagNoNiagara) && (n.PlayFlag |= 1),
			(e = EffectSystem_1.EffectSystem.SpawnUnloopedEffect(
				o,
				new UE.Transform(),
				i,
				"[AnimNotifyEffect.K2_Notify]",
				n,
				r,
				(t) => {
					EffectSystem_1.EffectSystem.SetEffectNotRecord(t, !0);
				},
			)),
			!(
				!e ||
				!EffectSystem_1.EffectSystem.IsValid(e) ||
				(this.AttachEffectToSkill(o, e),
				this.SetupTransform(EffectSystem_1.EffectSystem.GetEffectActor(e), o),
				EffectSystem_1.EffectSystem.ForceCheckPendingInit(e),
				0)
			)
		);
	}
	GameplayTagsCheck(t) {
		var e = t.CharacterActorComponent?.Entity?.GetComponent(185);
		if (e) {
			var o = this.PlayNeedTags.Num();
			if (this.NeedAnyTag) {
				for (let t = 0; t < o; t++) {
					var i = this.PlayNeedTags.GetKey(t),
						r = this.PlayNeedTags.Get(i);
					if (e.HasTag(i.TagId) === r) return !0;
				}
				return !1;
			}
			for (let t = 0; t < o; t++) {
				var n = this.PlayNeedTags.GetKey(t),
					a = this.PlayNeedTags.Get(n);
				if (e.HasTag(n.TagId) !== a) return !1;
			}
		}
		return !0;
	}
	AttachEffectToSkill(t, e) {
		if (
			t instanceof TsBaseCharacter_1.default &&
			((t = t.CharacterActorComponent?.Entity?.GetComponent(33)), t)
		) {
			let o = 0;
			(!this.DetachWhenSkillEnd && 0 === this.WhenSkillEnd) ||
				(this.DetachWhenSkillEnd && 0 === this.WhenSkillEnd
					? (o = 2)
					: this.DetachWhenSkillEnd || 0 !== this.WhenSkillEnd
						? this.DetachWhenSkillEnd && 1 === this.WhenSkillEnd
							? (o = 3)
							: this.DetachWhenSkillEnd && 2 === this.WhenSkillEnd
								? (o = 4)
								: this.DetachWhenSkillEnd || 1 !== this.WhenSkillEnd
									? this.DetachWhenSkillEnd ||
										2 !== this.WhenSkillEnd ||
										(o = 6)
									: (o = 5)
						: (o = 1)),
				t.AttachEffectToSkill(
					e,
					o,
					this.SocketName,
					this.WhenSkillEndEnableTime,
				);
		}
	}
	K2_PostChangeProperty(t) {
		if (t.op_Equality(RenderConfig_1.RenderConfig.UseSocketTransform))
			(this.UseSocketTransform = !1),
				this.LastSkeletalMesh &&
					((e = this.LastSkeletalMesh.GetSocketTransform(this.SocketName, 3)),
					(this.Location = e.GetLocation()),
					(this.Rotation = e.GetRotation().Rotator()),
					(this.Scale = e.GetScale3D()));
		else if (t.op_Equality(RenderConfig_1.RenderConfig.UseClipboardTransform)) {
			const r = ((this.UseClipboardTransform = !1), puerts_1.$ref)("");
			UE.KuroRenderingRuntimeBPPluginBPLibrary.ClipboardPaste_EditorOnly(r);
			var e = (t) => {
					var e = (0, puerts_1.$unref)(r),
						o = e.indexOf(t, -1);
					if (0 <= o) {
						var i = e.indexOf(")", o);
						if (0 <= i) return e.substring(o + t.length, i);
					}
					return "";
				},
				o = ((t = e("Translation=(")), (0, puerts_1.$ref)(this.Location)),
				i = (0, puerts_1.$ref)(!1);
			(t =
				(UE.KismetStringLibrary.Conv_StringToVector(t, o, i),
				(0, puerts_1.$unref)(i) && (this.Location = (0, puerts_1.$unref)(o)),
				e("Rotation=("))),
				(o = (0, puerts_1.$ref)(this.Rotation)),
				(t =
					(UE.KismetStringLibrary.Conv_StringToRotator(t, o, i),
					(0, puerts_1.$unref)(i) && (this.Rotation = (0, puerts_1.$unref)(o)),
					e("Scale3D=("))),
				(o = (0, puerts_1.$ref)(this.Scale));
			UE.KismetStringLibrary.Conv_StringToVector(t, o, i),
				(0, puerts_1.$unref)(i) && (this.Scale = (0, puerts_1.$unref)(o));
		}
		return !0;
	}
	GetNotifyName() {
		var t = this.EffectDataAssetRef.ToAssetPathName();
		return t ? UE.BlueprintPathsLibrary.GetBaseFilename(t, !0) : "特效数据通知";
	}
	SetupTransform(t, e) {
		switch (this.LocationType) {
			case 0:
				this.Attached && this.SocketName !== AnimNotifyEffect.NameNone
					? (t.K2_AttachToComponent(
							this.LastSkeletalMesh,
							this.SocketName,
							0,
							0,
							0,
							!1,
						),
						(o = new UE.Transform(this.Rotation, this.Location, this.Scale)),
						t.K2_SetActorRelativeTransform(o, !1, void 0, !0))
					: ((o = this.LastSkeletalMesh.GetSocketTransform(this.SocketName, 0)),
						t.K2_SetActorLocationAndRotation(
							o.TransformPosition(this.Location),
							o.TransformRotation(this.Rotation.Quaternion()).Rotator(),
							!1,
							void 0,
							!0,
						),
						t.SetActorScale3D(this.Scale));
				break;
			case 1:
				var o = new UE.Transform(this.Rotation, this.Location, this.Scale);
				e instanceof TsBaseCharacter_1.default
					? this.TraceDetectClimbStep(e, o)
					: (AnimNotifyEffect.TmpVector || AnimNotifyEffect.InitTraceInfo(),
						AnimNotifyEffect.TmpVector.FromUeVector(
							this.LastSkeletalMesh.GetRightVector(),
						),
						AnimNotifyEffect.SocketLocation.FromUeVector(
							this.LastSkeletalMesh.GetSocketLocation(
								this.RightOrLeftFoot
									? AnimNotifyEffect.SocketNameRightFoot
									: AnimNotifyEffect.SocketNameLeftFoot,
							),
						),
						((i = AnimNotifyEffect.LineTrace).WorldContextObject = e),
						TraceElementCommon_1.TraceElementCommon.SetStartLocation(
							i,
							AnimNotifyEffect.SocketLocation,
						),
						AnimNotifyEffect.TmpVector.MultiplyEqual(100),
						AnimNotifyEffect.TmpVector.AdditionEqual(
							AnimNotifyEffect.SocketLocation,
						),
						TraceElementCommon_1.TraceElementCommon.SetEndLocation(
							i,
							AnimNotifyEffect.TmpVector,
						),
						i.SetDrawDebugTrace(this.DebugTrace ? 2 : 0),
						TraceElementCommon_1.TraceElementCommon.LineTrace(i, PROFILE_KEY) &&
							(TraceElementCommon_1.TraceElementCommon.GetImpactPoint(
								i.HitResult,
								0,
								AnimNotifyEffect.TmpVector,
							),
							TraceElementCommon_1.TraceElementCommon.GetImpactNormal(
								i.HitResult,
								0,
								AnimNotifyEffect.TmpVector2,
							),
							AnimNotifyEffect.TmpVector2.Multiply(
								1,
								AnimNotifyEffect.TmpVector3,
							),
							AnimNotifyEffect.TmpVector3.AdditionEqual(
								AnimNotifyEffect.TmpVector,
							),
							o.SetLocation(AnimNotifyEffect.TmpVector3.ToUeVector()),
							MathUtils_1.MathUtils.LookRotationUpFirst(
								Vector_1.Vector.UpVectorProxy,
								AnimNotifyEffect.TmpVector2,
								AnimNotifyEffect.TmpQuat,
							),
							o.SetRotation(AnimNotifyEffect.TmpQuat.ToUeQuat()))),
					t.K2_SetActorTransform(o, !1, void 0, !1);
				break;
			case 2:
				AnimNotifyEffect.TmpVector || AnimNotifyEffect.InitTraceInfo();
				o = (i = this.LastSkeletalMesh.GetSocketTransform(
					this.SocketName,
					0,
				)).TransformPosition(this.TraceFrom);
				var i = i.TransformPosition(this.TraceTo),
					r = AnimNotifyEffect.LineTrace;
				(o =
					((r.WorldContextObject = e),
					TraceElementCommon_1.TraceElementCommon.SetStartLocation(r, o),
					TraceElementCommon_1.TraceElementCommon.SetEndLocation(r, i),
					r.SetDrawDebugTrace(this.DebugTrace ? 2 : 0),
					TraceElementCommon_1.TraceElementCommon.LineTrace(r, PROFILE_KEY))) &&
					(TraceElementCommon_1.TraceElementCommon.GetImpactPoint(
						r.HitResult,
						0,
						AnimNotifyEffect.TmpVector,
					),
					TraceElementCommon_1.TraceElementCommon.GetImpactNormal(
						r.HitResult,
						0,
						AnimNotifyEffect.TmpVector2,
					),
					AnimNotifyEffect.TmpVector4.FromUeVector(e.GetActorRightVector()),
					AnimNotifyEffect.TmpVector2.CrossProduct(
						AnimNotifyEffect.TmpVector4,
						AnimNotifyEffect.TmpVector3,
					),
					(i = UE.KismetMathLibrary.MakeRotFromZX(
						AnimNotifyEffect.TmpVector2.ToUeVector(),
						AnimNotifyEffect.TmpVector3.ToUeVector(),
					)),
					t.K2_SetActorLocationAndRotation(
						AnimNotifyEffect.TmpVector.ToUeVector(),
						i,
						!1,
						void 0,
						!0,
					),
					(o = new UE.Transform(this.Rotation, this.Location, this.Scale)),
					t.K2_AddActorLocalTransform(o, !1, void 0, !0));
		}
	}
	static InitTraceInfo() {
		(this.TmpVector = Vector_1.Vector.Create()),
			(this.TmpVector2 = Vector_1.Vector.Create()),
			(this.TmpVector3 = Vector_1.Vector.Create()),
			(this.TmpVector4 = Vector_1.Vector.Create()),
			(this.TmpQuat = Quat_1.Quat.Create()),
			(this.SocketLocation = Vector_1.Vector.Create()),
			(this.SocketNameLeftFoot = new UE.FName("Bip001LFoot")),
			(this.SocketNameRightFoot = new UE.FName("Bip001RFoot"));
		var t = UE.NewObject(UE.TraceLineElement.StaticClass());
		(t.bIsSingle = !0),
			(t.bIgnoreSelf = !0),
			(t.bTraceComplex = !0),
			(t.DrawTime = 5),
			t.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.IkGround),
			TraceElementCommon_1.TraceElementCommon.SetTraceColor(
				t,
				ColorUtils_1.ColorUtils.LinearGreen,
			),
			TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(
				t,
				ColorUtils_1.ColorUtils.LinearRed,
			),
			(this.LineTrace = t);
	}
	TraceDetectClimbStep(t, e) {
		AnimNotifyEffect.TmpVector || AnimNotifyEffect.InitTraceInfo();
		var o = AnimNotifyEffect.LineTrace,
			i = t.Mesh;
		return (i =
			((o.WorldContextObject = t),
			AnimNotifyEffect.SocketLocation.FromUeVector(
				i.GetSocketLocation(
					this.RightOrLeftFoot
						? AnimNotifyEffect.SocketNameRightFoot
						: AnimNotifyEffect.SocketNameLeftFoot,
				),
			),
			TraceElementCommon_1.TraceElementCommon.SetStartLocation(
				o,
				AnimNotifyEffect.SocketLocation,
			),
			t.CharacterActorComponent.ActorForwardProxy.Multiply(
				100,
				AnimNotifyEffect.TmpVector,
			),
			AnimNotifyEffect.TmpVector.AdditionEqual(AnimNotifyEffect.SocketLocation),
			TraceElementCommon_1.TraceElementCommon.SetEndLocation(
				o,
				AnimNotifyEffect.TmpVector,
			),
			o.SetDrawDebugTrace(this.DebugTrace ? 2 : 0),
			TraceElementCommon_1.TraceElementCommon.LineTrace(o, PROFILE_KEY)))
			? (TraceElementCommon_1.TraceElementCommon.GetHitLocation(
					o.HitResult,
					0,
					AnimNotifyEffect.TmpVector2,
				),
				TraceElementCommon_1.TraceElementCommon.GetImpactNormal(
					o.HitResult,
					0,
					AnimNotifyEffect.TmpVector3,
				),
				MathUtils_1.MathUtils.LookRotationUpFirst(
					Vector_1.Vector.UpVectorProxy,
					AnimNotifyEffect.TmpVector3,
					AnimNotifyEffect.TmpQuat,
				),
				e.SetRotation(AnimNotifyEffect.TmpQuat.ToUeQuat()),
				AnimNotifyEffect.TmpVector3.MultiplyEqual(AnimNotifyEffect.TmpVector3),
				AnimNotifyEffect.TmpVector2.AdditionEqual(AnimNotifyEffect.TmpVector3),
				e.SetLocation(AnimNotifyEffect.TmpVector2.ToUeVector()),
				!0)
			: (MathUtils_1.MathUtils.LookRotationUpFirst(
					Vector_1.Vector.UpVectorProxy,
					t.CharacterActorComponent.ActorForwardProxy,
					AnimNotifyEffect.TmpQuat,
				),
				e.SetRotation(AnimNotifyEffect.TmpQuat.ToUeQuat()),
				t.CharacterActorComponent.ActorForwardProxy.Multiply(
					10,
					AnimNotifyEffect.TmpVector3,
				),
				AnimNotifyEffect.SocketLocation.Addition(
					AnimNotifyEffect.TmpVector3,
					AnimNotifyEffect.TmpVector2,
				),
				e.SetLocation(AnimNotifyEffect.TmpVector2.ToUeVector()),
				!1);
	}
}
(AnimNotifyEffect.TmpVector = void 0),
	(AnimNotifyEffect.TmpVector2 = void 0),
	(AnimNotifyEffect.TmpVector3 = void 0),
	(AnimNotifyEffect.TmpVector4 = void 0),
	(AnimNotifyEffect.TmpQuat = void 0),
	(AnimNotifyEffect.SocketLocation = void 0),
	(AnimNotifyEffect.SocketNameLeftFoot = void 0),
	(AnimNotifyEffect.SocketNameRightFoot = void 0),
	(AnimNotifyEffect.LineTrace = void 0),
	(AnimNotifyEffect.NotifyStat = void 0),
	(AnimNotifyEffect.CreateEffectContextStat = void 0),
	(AnimNotifyEffect.SpawnEffectStat = void 0),
	(AnimNotifyEffect.AttachEffectToSkillStat = void 0),
	(AnimNotifyEffect.SetupTransformStat = void 0),
	(AnimNotifyEffect.NameNone = new UE.FName("None")),
	(AnimNotifyEffect.TagFlagNoNiagara = new UE.FName("NoNiagara")),
	(exports.default = AnimNotifyEffect);
