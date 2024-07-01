"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (t, e, o, a) {
		var r,
			n = arguments.length,
			i =
				n < 3
					? e
					: null === a
						? (a = Object.getOwnPropertyDescriptor(e, o))
						: a;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			i = Reflect.decorate(t, e, o, a);
		else
			for (var s = t.length - 1; 0 <= s; s--)
				(r = t[s]) && (i = (n < 3 ? r(i) : 3 < n ? r(e, o, i) : r(e, o)) || i);
		return 3 < n && i && Object.defineProperty(e, o, i), i;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BaseCharacterComponent = void 0);
const UE = require("ue"),
	ActorSystem_1 = require("../../../../../Core/Actor/ActorSystem"),
	Log_1 = require("../../../../../Core/Common/Log"),
	Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
	RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
	ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
	MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
	ObjectUtils_1 = require("../../../../../Core/Utils/ObjectUtils"),
	StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
	TraceElementCommon_1 = require("../../../../../Core/Utils/TraceElementCommon"),
	IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent"),
	TsBaseCharacter_1 = require("../../../../Character/TsBaseCharacter"),
	GlobalData_1 = require("../../../../GlobalData"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	RenderConfig_1 = require("../../../../Render/Config/RenderConfig"),
	ActorUtils_1 = require("../../../../Utils/ActorUtils"),
	CombineMeshTool_1 = require("../../../Character/Common/Blueprint/Utils/CombineMeshTool"),
	BaseActorComponent_1 = require("../../../Common/Component/BaseActorComponent"),
	CustomMovementDefine_1 = require("./Move/CustomMovementDefine"),
	PROFILE_KEY = "CharacterActorComponent_FixBornLocation",
	DITHER_RATE_PER_SECOND = 0.33,
	FIX_LOCATION_TOLERANCE = 2;
let BaseCharacterComponent = class extends BaseActorComponent_1.BaseActorComponent {
	constructor() {
		super(...arguments),
			(this.SubEntityType = 0),
			(this.EntityType = Protocol_1.Aki.Protocol.HBs.Proto_Npc),
			(this.RadiusInternal = 0),
			(this.HalfHeightInternal = 0),
			(this.DefaultRadiusInternal = 0),
			(this.DefaultHalfHeightInternal = 0),
			(this.ModelResPath = ""),
			(this.ClassDefaultObject = void 0),
			(this.HolographicEffectActor = void 0),
			(this.SimpleMatControlComponentInternal = void 0),
			(this.IsInitSimpleMatController = !1),
			(this.Qxn = !1),
			(this.mHs = !1);
	}
	get IsNpcOutShowRange() {
		return this.mHs;
	}
	get SimpleMatControlComponent() {
		if (!this.IsInitSimpleMatController) {
			this.IsInitSimpleMatController = !0;
			var t = this.Actor.AddComponentByClass(
				UE.BP_NPCMaterialController_C.StaticClass(),
				!1,
				MathUtils_1.MathUtils.DefaultTransform,
				!1,
			);
			if (!t?.IsValid()) return;
			this.SimpleMatControlComponentInternal = t;
		}
		return this.SimpleMatControlComponentInternal;
	}
	get Actor() {
		return this.ActorInternal;
	}
	get SkeletalMesh() {
		return this.Actor.Mesh;
	}
	get ScaledRadius() {
		return this.RadiusInternal * this.ActorScaleProxy.X;
	}
	get Radius() {
		return this.RadiusInternal;
	}
	get ScaledHalfHeight() {
		return this.HalfHeightInternal * this.ActorScaleProxy.Z;
	}
	get HalfHeight() {
		return this.HalfHeightInternal;
	}
	TrySetNpcDither(t = 0) {
		var e, o, a, r, n;
		this.EntityType === Protocol_1.Aki.Protocol.HBs.Proto_Npc &&
			(e = this.Actor?.DitherEffectController) &&
			((o = UE.KuroEffectLibrary.GetNpcDisappearDistance()),
			(a = e.CurrentDitherValue),
			(r = e.IsInAutoAnimationValue),
			(n = e.DitherSpeedRateValue),
			o <= (t = 0 !== t ? t : this.Entity.DistanceWithCamera) &&
			0 < a &&
			(!r || 0 < n)
				? (this.SetNpcShowState(!1, "TrySetNpcDither"),
					e.EnterDisappearEffect(1, 1, !1),
					this.Entity.GetComponent(70)?.EnableHeadInfo(!1))
				: t < o &&
					a < 1 &&
					(!r || n <= 0) &&
					(this.SetNpcShowState(!0, "TrySetNpcDither"),
					e.EnterAppearEffect(1, 1, !1),
					this.Entity.GetComponent(70)?.EnableHeadInfo(!0)));
	}
	ApplySimpleMaterialEffect(t) {
		"" !== t &&
			"None" !== t &&
			this.SimpleMatControlComponent?.IsValid() &&
			ResourceSystem_1.ResourceSystem.LoadAsync(
				t,
				UE.PD_HolographicEffect_C,
				(e) => {
					this.Actor?.IsValid() &&
						this.SimpleMatControlComponent?.IsValid() &&
						(e?.IsValid()
							? ((this.SimpleMatControlComponent.DATA = e),
								this.SimpleMatControlComponent.StartEffect())
							: Log_1.Log.CheckError() &&
								Log_1.Log.Error(
									"NPC",
									51,
									"[BaseCharacterComp.ApplySimpleMaterialEffect] 加载DA失败",
									["EffectPath", t],
									["PbDataId", this.CreatureData.GetPbDataId()],
								));
				},
			);
	}
	RemoveSimpleMaterialEffect() {
		this.SimpleMatControlComponent?.IsValid() &&
			this.SimpleMatControlComponent.EndEffect();
	}
	iFr() {
		var t = this.CreatureData.GetPbEntityInitData();
		t &&
			(t = (0, IComponent_1.getComponent)(
				t.ComponentsData,
				"EntityVisibleComponent",
			)) &&
			t.UseHolographicEffect &&
			this.LoadAndSetHolographicEffect();
	}
	LoadAndSetHolographicEffect() {
		if (!this.HolographicEffectActor?.IsValid()) {
			var t = this.CreatureData.GetModelConfig()?.DA.AssetPathName?.toString();
			if (t?.length && "None" !== t)
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug(
						"NPC",
						51,
						"[BaseCharacterComp.LoadAndSetHolographicEffect] 无法为拼装NPC实体添加投影效果",
						["CombineDaPath", t],
						["PbDataId", this.CreatureData.GetPbDataId()],
					);
			else {
				const t = RenderConfig_1.RenderConfig.HolographicPath;
				ResourceSystem_1.ResourceSystem.LoadAsync(
					t,
					UE.PD_CharacterControllerDataGroup_C,
					(e) => {
						var o, a, r;
						this.Actor?.IsValid() &&
							(e?.IsValid()
								? (a = (o = this.Owner.K2_GetComponentsByClass(
										UE.SkeletalMeshComponent.StaticClass(),
									)).Num())
									? ((this.HolographicEffectActor =
											ActorSystem_1.ActorSystem.Get(
												UE.BP_MaterialControllerRenderActor_C.StaticClass(),
												this.Actor.GetOwner().GetTransform(),
											)),
										(r =
											this.HolographicEffectActor).CharRenderingComponent.Init(
											7,
										),
										r.CharRenderingComponent.AddComponentByCase(0, o.Get(0)),
										r.CharRenderingComponent.AddMaterialControllerDataGroup(e))
									: Log_1.Log.CheckWarn() &&
										Log_1.Log.Warn(
											"NPC",
											51,
											"[BaseCharacterComp.LoadAndSetHolographicEffect] 尝试添加投影效果时找不到实体MeshComp",
											["EffectPath", t],
											["PbDataId", this.CreatureData.GetPbDataId()],
											["SkeletalCompNum", a],
										)
								: Log_1.Log.CheckError() &&
									Log_1.Log.Error(
										"NPC",
										51,
										"[BaseCharacterComp.LoadAndSetHolographicEffect] 无法找到投影材质效果DA",
										["EffectPath", t],
										["PbDataId", this.CreatureData.GetPbDataId()],
									));
					},
				);
			}
		}
	}
	SetNpcBornEffect() {
		this.iFr();
	}
	SetNpcBornMaterial() {
		var t;
		this.Owner.IsA(UE.BP_BaseNPC_C.StaticClass()) &&
			(t = this.Owner)?.BornEffect &&
			"" !== (t = t.BornEffect.AssetPathName.toString()) &&
			"None" !== t &&
			this.ApplySimpleMaterialEffect(t);
	}
	SetCamp(t) {
		var e = this.Entity.GetComponent(0);
		(e?.GetEntityType() !== Protocol_1.Aki.Protocol.HBs.Proto_Npc &&
			e?.GetEntityType() !== Protocol_1.Aki.Protocol.HBs.Proto_Monster &&
			e?.GetEntityType() !== Protocol_1.Aki.Protocol.HBs.Proto_Vision) ||
			(((e = e?.GetEntityCamp()) || 0 === e) &&
				t instanceof TsBaseCharacter_1.default &&
				(t.Camp = e));
	}
	PendingToDestroy() {
		if (
			this.EntityType === Protocol_1.Aki.Protocol.HBs.Proto_Npc &&
			2 === this.SubEntityType
		)
			this.Actor.DitherEffectController?.EnterDisappearEffect(0.33, 1);
		else {
			var t = this.Entity.GetComponent(0)?.GetPbEntityInitData();
			if (!t) return !1;
			if (
				!(t = (0, IComponent_1.getComponent)(
					t.ComponentsData,
					"EntityVisibleComponent",
				)) ||
				!t.UseFadeEffect
			)
				return !1;
			this.EntityType === Protocol_1.Aki.Protocol.HBs.Proto_Npc &&
				this.CreatureData.GetVisible() &&
				this.Actor.DitherEffectController?.EnterDisappearEffect(0.33, 1);
		}
		return !0;
	}
	FixActorLocation(
		t,
		e = !0,
		o = void 0,
		a = "unknown.FixActorLocation",
		r = !0,
		n = !1,
	) {
		if (!this.Actor.CapsuleComponent?.IsValid())
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Entity",
						3,
						"[CharacterActorComponent.FixBornLocation] capsule为空。",
						["CreatureDataId", this.CreatureDataInternal.GetCreatureDataId()],
						["PbDataId", this.CreatureDataInternal.GetPbDataId()],
						["Context", a],
					),
				[!1, void 0]
			);
		o = o ?? this.ActorLocationProxy;
		var i = ModelManager_1.ModelManager.TraceElementModel.CommonStartLocation;
		(n =
			(n
				? i.Set(o.X, o.Y, o.Z + this.ScaledRadius)
				: i.Set(o.X, o.Y, o.Z + this.ScaledHalfHeight),
			ModelManager_1.ModelManager.TraceElementModel.CommonEndLocation)).Set(
			o.X,
			o.Y,
			o.Z + t,
		);
		let s = this.FixBornLocationInternal(o, i, n, !1, e, a);
		return (
			!s &&
				r &&
				((i.Z = i.Z + this.ScaledHalfHeight - this.ScaledRadius),
				(s = this.FixBornLocationInternal(o, i, n, !0, e, a))),
			s
		);
	}
	FixBornLocationInternal(
		t,
		e,
		o,
		a,
		r = !0,
		n = "unknown.FixBornLocationInternal",
	) {
		r &&
			Log_1.Log.CheckInfo() &&
			Log_1.Log.Info(
				"Entity",
				3,
				"[CharacterActorComponent.FixBornLocation] 实体地面修正:前",
				["CreatureDataId", this.CreatureDataInternal.GetCreatureDataId()],
				["PbDataId", this.CreatureDataInternal.GetPbDataId()],
				["K2_GetActorLocation", this.Actor.K2_GetActorLocation()],
				["ActorLocationProxy", t],
				["InitLocation", this.CreatureDataInternal.GetInitLocation()],
				["射线开始位置", e],
				["射线结束位置", o],
				["Context", n],
			);
		let i = !1;
		switch (this.Actor.CharacterMovement.MovementMode) {
			case 1:
			case 2:
			case 0:
			case 3:
				break;
			case 6:
				this.Actor.CharacterMovement.CustomMovementMode !==
					CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_SLIDE &&
					this.Actor.CharacterMovement.CustomMovementMode !==
						CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_SKI &&
					(i = !0);
				break;
			default:
				i = !0;
		}
		if (i)
			return (
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"Entity",
						3,
						"[CharacterActorComponent.FixBornLocation] 实体地面修正:无需修正",
						["CreatureDataId", this.CreatureDataInternal.GetCreatureDataId()],
						["PbDataId", this.CreatureDataInternal.GetPbDataId()],
						["MovementMode", this.Actor.CharacterMovement.MovementMode],
						["Context", n],
					),
				[!0, t]
			);
		var s = ModelManager_1.ModelManager.TraceElementModel.GetActorTrace();
		(s.WorldContextObject = this.Actor),
			(s.Radius = this.ScaledRadius),
			TraceElementCommon_1.TraceElementCommon.SetStartLocation(s, e),
			TraceElementCommon_1.TraceElementCommon.SetEndLocation(s, o),
			s.ActorsToIgnore.Empty();
		for (const t of ModelManager_1.ModelManager.WorldModel.ActorsToIgnoreSet)
			s.ActorsToIgnore.Add(t);
		t = TraceElementCommon_1.TraceElementCommon.ShapeTrace(
			this.Actor.CapsuleComponent,
			s,
			PROFILE_KEY,
			PROFILE_KEY,
		);
		var l = s.HitResult;
		if (
			(Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Entity",
					3,
					"[CharacterActorComponent.FixBornLocation] 实体地面修正:检测地面结果",
					["CreatureDataId", this.CreatureDataInternal.GetCreatureDataId()],
					["PbDataId", this.CreatureDataInternal.GetPbDataId()],
					["isHit", t],
					["hitResult.bBlockingHit", l.bBlockingHit],
					["allowStartPenetrating", a],
					["hitResult.bStartPenetrating", l.bStartPenetrating],
					["Context", n],
				),
			t && l.bBlockingHit)
		) {
			if (!a && l.bStartPenetrating) return [!1, void 0];
			var c = ModelManager_1.ModelManager.TraceElementModel.CommonHitLocation;
			let t = "";
			var C = l.Actors.Num();
			let i = -1,
				s = "";
			TraceElementCommon_1.TraceElementCommon.GetHitLocation(l, 0, c);
			for (let e = 0; e < C; ++e) {
				var h = l.Actors.Get(e);
				if (
					h?.IsValid() &&
					((t += h.GetName() + ", "), !h.IsA(UE.Character.StaticClass()))
				) {
					(i = e),
						(s = h.GetName()),
						TraceElementCommon_1.TraceElementCommon.GetHitLocation(l, e, c);
					break;
				}
			}
			return (
				(c.Z += this.ScaledHalfHeight - this.ScaledRadius),
				(c.Z += 2),
				r &&
					Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"Entity",
						3,
						"[CharacterActorComponent.FixBornLocation] 实体地面修正:射线碰到地面",
						["CreatureDataId", this.CreatureDataInternal.GetCreatureDataId()],
						["PbDataId", this.CreatureDataInternal.GetPbDataId()],
						["Actors", t],
						["HitLocationIndex", i],
						["HitLocationName", s],
						["经过修正的位置", c],
						["Context", n],
					),
				this.Qxn ||
					((this.Qxn = !0),
					(e = this.Entity.GetComponent(160)) &&
						((o = e.GetMeshTransform().GetLocation()),
						MathUtils_1.MathUtils.CommonTempVector.Set(0, 0, -2),
						e.AddModelLocation(MathUtils_1.MathUtils.CommonTempVector),
						Log_1.Log.CheckInfo()) &&
						Log_1.Log.Info(
							"Entity",
							51,
							"[CharacterActorComponent.FixBornLocation] 实体地面修正:模型位置修正",
							["CreatureDataId", this.CreatureDataInternal.GetCreatureDataId()],
							["PbDataId", this.CreatureDataInternal.GetPbDataId()],
							["OrigMeshLocation", o],
							["FixMeshLocation", e.GetMeshTransform().GetLocation()],
							["Context", n],
						)),
				ModelManager_1.ModelManager.TraceElementModel.ClearActorTrace(),
				[!0, c]
			);
		}
		return (
			ModelManager_1.ModelManager.TraceElementModel.ClearActorTrace(),
			[!1, void 0]
		);
	}
	InitActorNew(t) {
		var e,
			o = this.CreatureDataInternal,
			a = o.GetTransform(),
			r = void 0,
			n =
				(this.CreatureDataInternal.SetModelConfig(t),
				this.oFr(),
				this.CreatureDataInternal.GetModelConfig());
		if (n) {
			if ((r = ActorUtils_1.ActorUtils.LoadActorByModelConfig(n, a))?.IsValid())
				return (
					(a = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
						n.蓝图.ToAssetPathName(),
						UE.Class,
					)),
					(this.ClassDefaultObject = UE.KuroStaticLibrary.GetDefaultObject(a)),
					ObjectUtils_1.ObjectUtils.SoftObjectPathIsValid(n.DA)
						? ((a = n.DA.AssetPathName?.toString())?.length &&
								"None" !== a &&
								(a = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
									n.DA.AssetPathName?.toString(),
									UE.PD_NpcSetupData_C,
								))?.IsValid() &&
								r instanceof TsBaseCharacter_1.default &&
								((e = r.Mesh.GetRelativeTransform()),
								CombineMeshTool_1.CombineMeshTool.LoadDaConfig(r, e, r.Mesh, a),
								3 === r.RenderType) &&
								r.CharRenderingComponent.UpdateNpcDitherComponent(),
							(e = n.动画蓝图.Get()) &&
								r instanceof TsBaseCharacter_1.default &&
								r.Mesh.SetAnimClass(e))
						: r instanceof TsBaseCharacter_1.default &&
							ActorUtils_1.ActorUtils.LoadAndChangeMeshAnim(
								r.Mesh,
								n.网格体,
								n.动画蓝图,
							),
					GlobalData_1.GlobalData.IsPlayInEditor &&
						(a = this.CreatureDataInternal.GetPbDataId()) &&
						r.Tags.Add(new UE.FName("PbDataId:" + a)),
					r
				);
		} else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Character",
					7,
					"[CharacterActorComponent.OnInit] 缺少ModelConfig配置",
					["CreatureDataId", o.GetCreatureDataId()],
					["ModelId", t],
				);
	}
	InitSizeInternal() {
		(this.RadiusInternal = this.Actor.CapsuleComponent.CapsuleRadius),
			(this.HalfHeightInternal = this.Actor.CapsuleComponent.CapsuleHalfHeight),
			(this.DefaultRadiusInternal = this.RadiusInternal),
			(this.DefaultHalfHeightInternal = this.HalfHeightInternal);
	}
	oFr() {
		if (
			this.CreatureDataInternal.GetEntityType() ===
			Protocol_1.Aki.Protocol.HBs.Proto_Npc
		) {
			var t = this.CreatureDataInternal.GetModelConfig();
			if (t && (t = UE.KismetSystemLibrary.GetPathName(t.蓝图.Get()))) {
				let e = t.substr(0, t.lastIndexOf(StringUtils_1.SLASH_STRING));
				(e = e.substr(0, e.lastIndexOf(StringUtils_1.SLASH_STRING))),
					(t = new Array()).push(e),
					t.push("/Montage"),
					(this.ModelResPath = t.join(StringUtils_1.EMPTY_STRING));
			}
		}
	}
	OnClear() {
		return (
			!!super.OnClear() &&
			(this.SimpleMatControlComponentInternal?.IsValid() &&
				this.SimpleMatControlComponent.K2_DestroyComponent(this.Actor),
			this.HolographicEffectActor?.IsValid() &&
				ActorSystem_1.ActorSystem.Put(this.HolographicEffectActor),
			!0)
		);
	}
	SetNpcShowState(t, e) {
		this.mHs === t &&
			((this.mHs = !t), Log_1.Log.CheckInfo()) &&
			Log_1.Log.Info(
				"NPC",
				51,
				"NPC显示状态更新",
				["PbDataId", this.CreatureData.GetPbDataId()],
				["CreatureDataId", this.CreatureData.GetCreatureDataId()],
				["IsShow", t],
				["reason", e],
			);
	}
};
(BaseCharacterComponent = __decorate(
	[(0, RegisterComponent_1.RegisterComponent)(2)],
	BaseCharacterComponent,
)),
	(exports.BaseCharacterComponent = BaseCharacterComponent);
