"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const puerts_1 = require("puerts"),
	UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	GameplayTagUtils_1 = require("../../../../Core/Utils/GameplayTagUtils"),
	TsBaseCharacter_1 = require("../../../Character/TsBaseCharacter"),
	SkeletalMeshEffectContext_1 = require("../../../Effect/EffectContext/SkeletalMeshEffectContext"),
	EffectSystem_1 = require("../../../Effect/EffectSystem"),
	GlobalData_1 = require("../../../GlobalData"),
	UiEffectAnsContext_1 = require("../../../Module/UiModel/UiModelComponent/Common/UiModelAns/UiAnimNotifyStateContext/UiEffectAnsContext"),
	RenderConfig_1 = require("../../Config/RenderConfig");
class AnimNotifyStateEffectParams {
	constructor(t, e) {
		(this.EffectHandle = t), (this.UiEffectAnsContext = e);
	}
}
class AnimNotifyStateEffect extends UE.KuroEffectMakerANS {
	constructor() {
		super(...arguments),
			(this.NeedAnyTag = !1),
			(this.PlayNeedTags = void 0),
			(this.EffectDataAssetRef = void 0),
			(this.AutoDetachTime = -0),
			(this.SocketName = void 0),
			(this.UseSocketTransform = !1),
			(this.UseClipboardTransform = !1),
			(this.DetachWhenSkillEnd = !1),
			(this.IsWeaponEffect = !1),
			(this.WhenSkillEnd = 0),
			(this.FasterStop = !0),
			(this.RecycleWhenEnd = !1),
			(this.AlwaysLoop = !1),
			(this.PlayOnEnd = !1),
			(this.WithOutTag = void 0),
			(this.ParamsMap = new Map()),
			(this.IsInited = !1),
			(this.LastMeshComp = void 0);
	}
	K2_ValidateAssets() {
		return !0;
	}
	Init() {
		this.IsInited || ((this.ParamsMap = new Map()), (this.IsInited = !0));
	}
	K2_NotifyBegin(t, e, a) {
		this.Init();
		var i = (this.LastMeshComp = t).GetOwner();
		if (
			i?.IsA(UE.TsUiSceneRoleActor_C.StaticClass()) ||
			i?.IsA(UE.TsSkeletalObserver_C.StaticClass())
		) {
			if (t.IsComponentTickEnabled()) {
				var n = new UiEffectAnsContext_1.UiEffectAnsContext(
					this.EffectDataAssetRef.ToAssetPathName(),
					t,
					this.SocketName,
					this.Attached,
					this.AttachLocationOnly,
					this.Location,
					this.Rotation,
					this.Scale,
					this.PlayOnEnd,
				);
				let e;
				(i?.IsA(UE.TsUiSceneRoleActor_C.StaticClass()),
				(e = i.Model.CheckGetComponent(6))).AddAns("UiEffectAnsContext", n),
					this.ParamsMap.set(t, new AnimNotifyStateEffectParams(void 0, n));
			}
		} else if (!this.PlayOnEnd) {
			if (this.ParamsMap.has(t)) return !1;
			if (!(i = this.SpawnEffectInternal(t, e))) return !1;
			this.ParamsMap.set(t, new AnimNotifyStateEffectParams(i, void 0));
		}
		return !0;
	}
	SpawnEffectInternal(t, e) {
		var a = t.GetOwner();
		if (a instanceof TsBaseCharacter_1.default && !this.GameplayTagsCheck(a))
			return (
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug(
						"RenderEffect",
						51,
						"AnimNotifyStateEffect：特效GameplayTag检查失败",
						["meshComp", t?.GetName()],
						["outer", t.GetOwner()?.GetName()],
						["animation", e?.GetName()],
					),
				0
			);
		let i,
			n =
				(((i =
					(a = t.GetOwner()) instanceof TsBaseCharacter_1.default &&
					a.CharacterActorComponent?.Entity
						? new SkeletalMeshEffectContext_1.SkeletalMeshEffectContext(
								a.CharacterActorComponent?.Entity.Id,
							)
						: new SkeletalMeshEffectContext_1.SkeletalMeshEffectContext(
								void 0,
							)).SkeletalMeshComp = t),
				(i.SourceObject = a),
				(i.CreateFromType = 1),
				a?.ActorHasTag(AnimNotifyStateEffect.TagFlagNoNiagara) &&
					(i.PlayFlag |= 1),
				3);
		return (
			a instanceof TsBaseCharacter_1.default &&
				a.CharacterActorComponent?.Entity?.GetComponent(33) &&
				(n = 0),
			(GlobalData_1.GlobalData.IsUiSceneOpen ||
				a.Tags.Contains(RenderConfig_1.RenderConfig.UIName)) &&
				(n = 1),
			EffectSystem_1.EffectSystem.InitializeWithPreview(!1),
			(e = EffectSystem_1.EffectSystem.SpawnEffect(
				a,
				new UE.Transform(),
				this.EffectDataAssetRef.ToAssetPathName(),
				"[AnimNotifyStateEffect.SpawnEffectInternal]",
				i,
				n,
				(t) => {
					EffectSystem_1.EffectSystem.SetEffectNotRecord(t, !0);
				},
			)),
			e && EffectSystem_1.EffectSystem.IsValid(e)
				? (this.AttachEffectToSkill(a, e),
					this.AttachEffectToWeapon(t, a, e),
					this.SetupTransform(EffectSystem_1.EffectSystem.GetEffectActor(e), t),
					EffectSystem_1.EffectSystem.ForceCheckPendingInit(e),
					e)
				: 0
		);
	}
	AttachEffectToSkill(t, e) {
		if (
			t instanceof TsBaseCharacter_1.default &&
			((t = t.CharacterActorComponent?.Entity?.GetComponent(33)), t)
		) {
			let a = 0;
			(!this.DetachWhenSkillEnd && 0 === this.WhenSkillEnd) ||
				(this.DetachWhenSkillEnd && 0 === this.WhenSkillEnd
					? (a = 2)
					: this.DetachWhenSkillEnd || 0 !== this.WhenSkillEnd
						? this.DetachWhenSkillEnd && 1 === this.WhenSkillEnd
							? (a = 3)
							: this.DetachWhenSkillEnd && 2 === this.WhenSkillEnd
								? (a = 4)
								: this.DetachWhenSkillEnd || 1 !== this.WhenSkillEnd
									? this.DetachWhenSkillEnd ||
										2 !== this.WhenSkillEnd ||
										(a = 6)
									: (a = 5)
						: (a = 1)),
				t.AttachEffectToSkill(e, a, this.SocketName, -1);
		}
	}
	AttachEffectToWeapon(t, e, a) {
		if (
			this.IsWeaponEffect &&
			e instanceof TsBaseCharacter_1.default &&
			((e = e.CharacterActorComponent?.Entity?.GetComponent(69)), e?.Valid)
		)
			for (const i of e.GetWeaponMesh().CharacterWeapons)
				i.Mesh === t && i.AddBuffEffect(a);
	}
	K2_NotifyTick(t, e, a) {
		if (
			this.Attached &&
			this.AttachLocationOnly &&
			this.SocketName !== AnimNotifyStateEffect.NameNone
		) {
			var i = this.ParamsMap.get(t)?.EffectHandle;
			if (!i || !EffectSystem_1.EffectSystem.IsValid(i)) return !0;
			(i = EffectSystem_1.EffectSystem.GetEffectActor(i)),
				(t = t.GetSocketTransform(this.SocketName, 0)),
				i.K2_SetActorLocation(
					t.TransformPosition(this.Location),
					!1,
					void 0,
					!1,
				);
		}
		return !0;
	}
	K2_NotifyEnd(t, e) {
		var a = t.GetOwner();
		if (
			a?.IsA(UE.TsUiSceneRoleActor_C.StaticClass()) ||
			a?.IsA(UE.TsSkeletalObserver_C.StaticClass())
		) {
			const e = this.ParamsMap.get(t);
			if (e && e.UiEffectAnsContext) {
				a?.IsA(UE.TsUiSceneRoleActor_C.StaticClass());
				var i = a.Model;
				if (i)
					return (
						i
							.CheckGetComponent(6)
							.ReduceAns("UiEffectAnsContext", e.UiEffectAnsContext),
						this.ParamsMap.delete(t),
						!0
					);
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"RenderEffect",
						26,
						"AnimNotifyStateEffect未成对，model为空",
					);
			} else
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"RenderEffect",
						44,
						"AnimNotifyStateEffect未成对，UiEffectAnsContext为空",
					);
			return !1;
		}
		if (
			this.PlayOnEnd &&
			a instanceof TsBaseCharacter_1.default &&
			!a.CharacterActorComponent?.Entity?.GetComponent(185)?.HasAnyTag(
				GameplayTagUtils_1.GameplayTagUtils.ConvertFromUeContainer(
					this.WithOutTag,
				),
			)
		)
			return 0 !== this.SpawnEffectInternal(t, e);
		const n = this.ParamsMap.get(t);
		return (
			!!n &&
			(this.ParamsMap.delete(t),
			n.EffectHandle &&
				EffectSystem_1.EffectSystem.StopEffectById(
					n.EffectHandle,
					`[动画:${e.GetName()}，AnimNotifyStateEffect.K2_NotifyEnd]`,
					this.FasterStop,
				),
			!0)
		);
	}
	GameplayTagsCheck(t) {
		var e = t.CharacterActorComponent?.Entity?.GetComponent(185);
		if (e) {
			var a = this.PlayNeedTags.Num();
			if (this.NeedAnyTag) {
				for (let t = 0; t < a; t++) {
					var i = this.PlayNeedTags.GetKey(t),
						n = this.PlayNeedTags.Get(i);
					if (e.HasTag(i.TagId) === n) return !0;
				}
				return !1;
			}
			for (let t = 0; t < a; t++) {
				var s = this.PlayNeedTags.GetKey(t),
					o = this.PlayNeedTags.Get(s);
				if (e.HasTag(s.TagId) !== o) return !1;
			}
		}
		return !0;
	}
	K2_PostChangeProperty(t) {
		if (t.op_Equality(RenderConfig_1.RenderConfig.UseSocketTransform2))
			(this.UseSocketTransform = !1),
				this.LastMeshComp &&
					((e = this.LastMeshComp.GetSocketTransform(this.SocketName, 3)),
					(this.Location = e.GetLocation()),
					(this.Rotation = e.GetRotation().Rotator()),
					(this.Scale = e.GetScale3D()));
		else if (
			t.op_Equality(RenderConfig_1.RenderConfig.UseClipboardTransform2)
		) {
			const n = ((this.UseClipboardTransform = !1), puerts_1.$ref)("");
			UE.KuroRenderingRuntimeBPPluginBPLibrary.ClipboardPaste_EditorOnly(n);
			var e = (t) => {
					var e = (0, puerts_1.$unref)(n),
						a = e.indexOf(t, -1);
					if (0 <= a) {
						var i = e.indexOf(")", a);
						if (0 <= i) return e.substring(a + t.length, i);
					}
					return "";
				},
				a = ((t = e("Translation=(")), (0, puerts_1.$ref)(this.Location)),
				i = (0, puerts_1.$ref)(!1);
			(t =
				(UE.KismetStringLibrary.Conv_StringToVector(t, a, i),
				(0, puerts_1.$unref)(i) && (this.Location = (0, puerts_1.$unref)(a)),
				e("Rotation=("))),
				(a = (0, puerts_1.$ref)(this.Rotation)),
				(t =
					(UE.KismetStringLibrary.Conv_StringToRotator(t, a, i),
					(0, puerts_1.$unref)(i) && (this.Rotation = (0, puerts_1.$unref)(a)),
					e("Scale3D=("))),
				(a = (0, puerts_1.$ref)(this.Scale));
			UE.KismetStringLibrary.Conv_StringToVector(t, a, i),
				(0, puerts_1.$unref)(i) && (this.Scale = (0, puerts_1.$unref)(a));
		}
		return !0;
	}
	GetNotifyName() {
		var t = this.EffectDataAssetRef.ToAssetPathName();
		return t ? UE.BlueprintPathsLibrary.GetBaseFilename(t, !0) : "特效数据状态";
	}
	SetupTransform(t, e) {
		var a, i;
		this.Attached &&
		!this.AttachLocationOnly &&
		this.SocketName !== AnimNotifyStateEffect.NameNone
			? (t.K2_AttachToComponent(e, this.SocketName, 0, 0, 0, !1),
				(a = new UE.Transform(this.Rotation, this.Location, this.Scale)),
				(i = (0, puerts_1.$ref)(new UE.HitResult())),
				t.K2_SetActorRelativeTransform(a, !1, i, !0))
			: ((a = e.GetSocketTransform(this.SocketName, 0)),
				(i = (0, puerts_1.$ref)(new UE.HitResult())),
				t.K2_SetActorLocationAndRotation(
					a.TransformPosition(this.Location),
					a.TransformRotation(this.Rotation.Quaternion()).Rotator(),
					!1,
					i,
					!0,
				),
				t.SetActorScale3D(this.Scale));
	}
}
(AnimNotifyStateEffect.NameNone = new UE.FName("None")),
	(AnimNotifyStateEffect.TagFlagNoNiagara = new UE.FName("NoNiagara")),
	(exports.default = AnimNotifyStateEffect);
