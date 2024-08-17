"use strict";
var SceneItemBeamCastComponent_1,
	__decorate =
		(this && this.__decorate) ||
		function (t, e, i, n) {
			var o,
				s = arguments.length,
				r =
					s < 3
						? e
						: null === n
							? (n = Object.getOwnPropertyDescriptor(e, i))
							: n;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
				r = Reflect.decorate(t, e, i, n);
			else
				for (var a = t.length - 1; 0 <= a; a--)
					(o = t[a]) &&
						(r = (s < 3 ? o(r) : 3 < s ? o(e, i, r) : o(e, i)) || r);
			return 3 < s && r && Object.defineProperty(e, i, r), r;
		};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SceneItemBeamCastComponent = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	ActorSystem_1 = require("../../../Core/Actor/ActorSystem"),
	Log_1 = require("../../../Core/Common/Log"),
	Time_1 = require("../../../Core/Common/Time"),
	QueryTypeDefine_1 = require("../../../Core/Define/QueryTypeDefine"),
	EntityComponent_1 = require("../../../Core/Entity/EntityComponent"),
	RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent"),
	GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils"),
	Vector_1 = require("../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	TraceElementCommon_1 = require("../../../Core/Utils/TraceElementCommon"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	EffectSystem_1 = require("../../Effect/EffectSystem"),
	Global_1 = require("../../Global"),
	GlobalData_1 = require("../../GlobalData"),
	LevelGamePlayController_1 = require("../../LevelGamePlay/LevelGamePlayController"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	SceneInteractionManager_1 = require("../../Render/Scene/Interaction/SceneInteractionManager"),
	ColorUtils_1 = require("../../Utils/ColorUtils"),
	RoleTriggerController_1 = require("../Character/Role/RoleTriggerController"),
	UPDATE_INTERVAL_MS = 100;
let SceneItemBeamCastComponent = (SceneItemBeamCastComponent_1 = class extends (
	EntityComponent_1.EntityComponent
) {
	constructor() {
		super(...arguments),
			(this.Lo = void 0),
			(this.SIe = void 0),
			(this.ktn = void 0),
			(this.mBe = void 0),
			(this.Lie = void 0),
			(this.Hte = void 0),
			(this.Hmn = void 0),
			(this.jmn = Time_1.Time.WorldTime),
			(this.Wmn = -0),
			(this.Kmn = void 0),
			(this.Cji = void 0),
			(this.Qmn = Vector_1.Vector.Create()),
			(this.Xmn = Vector_1.Vector.Create()),
			(this.$mn = -0),
			(this.Ymn = Vector_1.Vector.Create()),
			(this.Jmn = Vector_1.Vector.Create()),
			(this.zmn = -0),
			(this.Zmn = void 0),
			(this.edn = void 0),
			(this.tdn = void 0),
			(this.idn = void 0),
			(this.odn = void 0),
			(this.GDn = void 0),
			(this.Usi = !1),
			(this.Qnn = () => {
				(this.Usi = !0),
					this.mBe.IsInState(0) || this.G_n(),
					EventSystem_1.EventSystem.AddWithTarget(
						this.Entity,
						EventDefine_1.EEventName.OnSceneItemStateChange,
						this.G_n,
					);
			}),
			(this.G_n = () => {
				this.rdn();
			}),
			(this.ndn = (t, e) => {
				var i = this.Ntn(e);
				(i && i.Id === this.Entity.Id) ||
					(t ? this.Kmn.add(e) : this.Kmn.delete(e), this.rdn());
			});
	}
	OnInitData(t) {
		return (
			(this.SIe = this.Entity.GetComponent(0)),
			(t = t.GetParam(SceneItemBeamCastComponent_1)[0])
				? ((this.Lo = t),
					!!(t = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(
						this.Lo.TargetState,
					)) &&
						((this.Wmn = t),
						(this.$mn = this.Lo.Range.Height),
						(t = this.Lo.Range.Center),
						this.Qmn.FromConfigVector(t),
						this.Xmn.FromConfigVector(t),
						(this.Qmn.Z -= this.Lo.Range.Height / 2 - this.Lo.Range.Radius),
						(this.Xmn.Z += this.Lo.Range.Height / 2 - this.Lo.Range.Radius),
						this.Ymn.FromConfigVector(t),
						this.Jmn.FromConfigVector(t),
						(this.Ymn.Z -= this.Lo.Range.Height / 2),
						(this.Jmn.Z = this.Ymn.Z),
						(this.idn = UE.NewArray(UE.Vector)),
						this.idn.Add(this.Ymn.ToUeVector()),
						this.idn.Add(this.Jmn.ToUeVector()),
						!0))
				: (Log_1.Log.CheckError() &&
						Log_1.Log.Error("SceneItem", 40, "[BeamCastComp] 组件配置缺失", [
							"PbDataId",
							this.SIe?.GetPbDataId(),
						]),
					!1)
		);
	}
	OnStart() {
		return (
			(this.ktn = this.Entity.GetComponent(74)),
			(this.mBe = this.Entity.GetComponent(117)),
			(this.Hte = this.Entity.GetComponent(182)),
			(this.Lie = this.Entity.GetComponent(177)),
			this.ktn && this.mBe && this.Hte && this.Lie
				? ((this.Kmn = new Set()),
					this.ktn.AddOnActorOverlapCallback(this.ndn),
					!0)
				: (Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"SceneItem",
							40,
							"[BeamCastComp] 组件缺失",
							["PbDataId", this.SIe?.GetPbDataId()],
							["RangeComponent", !!this.ktn],
							["SceneItemStateComponent", !!this.mBe],
							["SceneItemActorComponent", !!this.Hte],
							["EntityCommonTagComponent", !!this.Lie],
						),
					!1)
		);
	}
	OnActivate() {
		this.sdn("[BeamCastComp] 初始停止Tick"),
			this.Hte.GetIsSceneInteractionLoadCompleted()
				? this.Qnn()
				: EventSystem_1.EventSystem.AddWithTarget(
						this.Entity,
						EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
						this.Qnn,
					);
	}
	OnEnd() {
		return (
			this.ktn?.RemoveOnActorOverlapCallback(this.ndn),
			EventSystem_1.EventSystem.HasWithTarget(
				this.Entity,
				EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
				this.Qnn,
			) &&
				EventSystem_1.EventSystem.RemoveWithTarget(
					this.Entity,
					EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
					this.Qnn,
				),
			EventSystem_1.EventSystem.HasWithTarget(
				this.Entity,
				EventDefine_1.EEventName.OnSceneItemStateChange,
				this.G_n,
			) &&
				EventSystem_1.EventSystem.RemoveWithTarget(
					this.Entity,
					EventDefine_1.EEventName.OnSceneItemStateChange,
					this.G_n,
				),
			this.odn &&
				EffectSystem_1.EffectSystem.IsValid(this.odn) &&
				EffectSystem_1.EffectSystem.StopEffectById(
					this.odn,
					"[BeamCastComp.OnEnd]",
					!0,
				),
			this.GDn &&
				EffectSystem_1.EffectSystem.IsValid(this.GDn) &&
				EffectSystem_1.EffectSystem.StopEffectById(
					this.GDn,
					"[BeamCastComp.OnEnd]",
					!0,
				),
			this.edn?.IsValid() &&
				(this.edn.K2_DetachFromActor(),
				ActorSystem_1.ActorSystem.Put(this.edn),
				(this.edn = void 0),
				(this.tdn = void 0)),
			(this.Kmn = void 0),
			!(this.Cji = void 0)
		);
	}
	OnTick(t) {
		!this.adn() ||
			this.Kmn.size < 0 ||
			(Time_1.Time.WorldTime - this.jmn > 100 &&
				((this.jmn = Time_1.Time.WorldTime), this.hdn()));
	}
	rdn() {
		this.adn()
			? (this.ldn(),
				this.Kmn.size < 0
					? this.sdn("[BeamCastComp] 范围内无Actor，停止Tick")
					: this._dn())
			: (this.udn(),
				this.NDn(),
				this.sdn("[BeamCastComp] 不在活跃状态，停止Tick"));
	}
	adn() {
		return this.Usi && this.Lie.HasTag(this.Wmn);
	}
	mdn() {
		return void 0 === this.Hmn;
	}
	_dn() {
		this.mdn() ||
			(this.Enable(this.Hmn, "SceneItemBeamCastComponent.EnableTraceTick"),
			(this.Hmn = void 0));
	}
	sdn(t) {
		this.mdn() && (this.Hmn = this.Disable(t));
	}
	uJr() {
		if (!this.Cji) {
			(this.Cji = UE.NewObject(UE.TraceBoxElement.StaticClass())),
				(this.Cji.bIsSingle = !0),
				this.Cji.ActorsToIgnore.Empty();
			var t =
				SceneInteractionManager_1.SceneInteractionManager.Get().GetSceneInteractionAllActorsInLevel(
					this.Hte.GetSceneInteractionLevelHandleId(),
				);
			for (let e = 0; e < t.Num(); e++) this.Cji.ActorsToIgnore.Add(t.Get(e));
			(this.Cji.bIgnoreSelf = !0),
				this.Cji.SetBoxHalfSize(
					this.Lo.Range.Radius,
					this.Lo.Range.Radius,
					this.Lo.Range.Radius,
				);
			var e =
				((e = UE.NewArray(UE.BuiltinByte)).Add(
					QueryTypeDefine_1.KuroObjectTypeQuery.WorldStatic,
				),
				e.Add(QueryTypeDefine_1.KuroObjectTypeQuery.WorldDynamic),
				e.Add(QueryTypeDefine_1.KuroObjectTypeQuery.PawnMonster),
				(0, puerts_1.$ref)(e));
			this.Cji.SetObjectTypesQuery(e);
		}
		(this.Cji.WorldContextObject = this.Hte.Owner),
			TraceElementCommon_1.TraceElementCommon.SetBoxOrientation(
				this.Cji,
				this.Hte.ActorRotationProxy,
			),
			(e = MathUtils_1.MathUtils.CommonTempVector),
			MathUtils_1.MathUtils.TransformPosition(
				this.Hte.ActorLocationProxy,
				this.Hte.ActorRotationProxy,
				this.Hte.ActorScaleProxy,
				this.Qmn,
				e,
			),
			TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.Cji, e),
			(e = MathUtils_1.MathUtils.CommonTempVector),
			MathUtils_1.MathUtils.TransformPosition(
				this.Hte.ActorLocationProxy,
				this.Hte.ActorRotationProxy,
				this.Hte.ActorScaleProxy,
				this.Xmn,
				e,
			),
			TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.Cji, e);
	}
	hdn() {
		this.uJr();
		let t,
			e = this.$mn;
		var i = TraceElementCommon_1.TraceElementCommon.BoxTrace(
				this.Cji,
				"[BeamCastComp.TraceAndUpdate]",
			),
			n = this.Cji.HitResult;
		if (i && n?.bBlockingHit)
			for (let i = 0; i < n.GetHitCount(); ++i) {
				var o = n.ImpactPointX_Array.Get(i),
					s = n.ImpactPointY_Array.Get(i),
					r = n.ImpactPointZ_Array.Get(i);
				(o = Vector_1.Vector.Create(o, s, r)),
					(s = MathUtils_1.MathUtils.CommonTempVector);
				(r =
					(MathUtils_1.MathUtils.InverseTransformPosition(
						this.Hte.ActorLocationProxy,
						this.Hte.ActorRotationProxy,
						this.Hte.ActorScaleProxy,
						o,
						s,
					),
					s.Z - this.Ymn.Z)) < 0 ||
					r > e ||
					!(o = n.Actors.Get(i))?.IsValid() ||
					((s = this.Ntn(o)) && s.Id === this.Entity.Id) ||
					((e = r), (t = o));
			}
		this.ddn(t, e), this.Cji.ClearCacheData();
	}
	ddn(t, e) {
		this.Cdn(e), this.gdn(), this.ODn();
		(e = this.SIe.GetEntityOnlineInteractType()),
			(e =
				LevelGamePlayController_1.LevelGamePlayController.MultiplayerLimitTypeCheck(
					e,
					!1,
				));
		var i,
			n = ModelManager_1.ModelManager.CreatureModel.GetEntityById(
				this.Entity.Id,
			);
		t = this.Ntn(t);
		!this.Zmn?.Valid ||
			(t && t.Id === this.Zmn.Id) ||
			((i = this.Zmn.Entity),
			(this.Zmn = void 0),
			e &&
				EventSystem_1.EventSystem.EmitWithTarget(
					i,
					EventDefine_1.EEventName.BeamCastStop,
					n,
				)),
			t?.Valid &&
				!this.Zmn &&
				((i = t.Entity), (this.Zmn = t), e) &&
				EventSystem_1.EventSystem.EmitWithTarget(
					i,
					EventDefine_1.EEventName.BeamCastStart,
					n,
				);
	}
	Cdn(t) {
		(this.zmn = MathUtils_1.MathUtils.Clamp(t, 0, this.$mn)),
			(this.Jmn.Z = this.Ymn.Z + this.zmn);
	}
	ldn() {
		if (!this.edn?.IsValid()) {
			if (
				((this.edn = ActorSystem_1.ActorSystem.Get(
					UE.BP_BasePathLine_C.StaticClass(),
					this.Hte.Owner.GetTransform(),
				)),
				!this.edn?.IsValid())
			)
				return void (
					Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"SceneItem",
						40,
						"[BeamCastComp] BeamSplineActor创建失败",
						["PbDataId", this.SIe?.GetPbDataId()],
					)
				);
			this.edn.K2_AttachToActor(this.Hte.Owner, void 0, 2, 2, 2, !1),
				(this.tdn = this.edn.GetComponentByClass(
					UE.SplineComponent.StaticClass(),
				)),
				this.tdn.ClearSplinePoints();
		}
		var t = this.Lo.EffectPath;
		if (!this.odn || !EffectSystem_1.EffectSystem.IsValid(this.odn)) {
			if (
				((this.odn = EffectSystem_1.EffectSystem.SpawnEffect(
					GlobalData_1.GlobalData.World,
					this.edn.GetTransform(),
					t,
					"[BeamCastComp.CastBeam]",
				)),
				!EffectSystem_1.EffectSystem.IsValid(this.odn))
			)
				return void (
					Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"SceneItem",
						40,
						"[BeamCastComp] BeamEffect创建失败",
						["PbDataId", this.SIe?.GetPbDataId()],
					)
				);
			EffectSystem_1.EffectSystem.GetEffectActor(this.odn).K2_AttachToActor(
				this.edn,
				void 0,
				2,
				2,
				2,
				!1,
			);
		}
		(this.jmn = Time_1.Time.WorldTime), this.hdn();
	}
	udn() {
		this.odn &&
			EffectSystem_1.EffectSystem.IsValid(this.odn) &&
			EffectSystem_1.EffectSystem.StopEffectById(
				this.odn,
				"[BeamCastComp.StopBeam]",
				!0,
			),
			this.ddn(void 0, 0);
	}
	$rt() {
		var t, e, i, n;
		!this.Hte?.Owner ||
			!(t = this.Lo.HitEffectPath) ||
			(this.GDn && EffectSystem_1.EffectSystem.IsValid(this.GDn)) ||
			((i = (e = this.Hte.ActorTransform).TransformPosition(
				this.Jmn.ToUeVector(),
			)),
			(n = MathUtils_1.MathUtils.CommonTempQuat),
			Vector_1.Vector.UpVectorProxy.ToOrientationQuat(n),
			(n = e.TransformRotation(n.ToUeQuat())),
			(n = new UE.Transform(n, i, e.GetScale3D())),
			(this.GDn = EffectSystem_1.EffectSystem.SpawnEffect(
				GlobalData_1.GlobalData.World,
				n,
				t,
				"[BeamCastComp.UpdateHitEffect]",
			)),
			EffectSystem_1.EffectSystem.IsValid(this.GDn)
				? EffectSystem_1.EffectSystem.GetEffectActor(this.GDn).K2_AttachToActor(
						this.Hte.Owner,
						void 0,
						1,
						1,
						1,
						!1,
					)
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error("SceneItem", 40, "[BeamCastComp] HitEffect创建失败", [
						"PbDataId",
						this.SIe?.GetPbDataId(),
					]));
	}
	NDn() {
		this.GDn &&
			EffectSystem_1.EffectSystem.IsValid(this.GDn) &&
			EffectSystem_1.EffectSystem.StopEffectById(
				this.GDn,
				"[BeamCastComp.StopHitEffect]",
				!0,
			);
	}
	gdn() {
		this.edn?.IsValid() &&
			(this.odn &&
				EffectSystem_1.EffectSystem.SetEffectIgnoreVisibilityOptimize(
					this.odn,
					0 < this.zmn,
				),
			this.idn.Empty(),
			this.idn.Add(this.Ymn.ToUeVector()),
			this.idn.Add(this.Jmn.ToUeVector()),
			this.tdn.SetSplinePoints(this.idn, 0, !0));
	}
	ODn() {
		var t, e;
		this.Hte?.Owner?.IsValid() &&
			(this.zmn >= this.$mn
				? this.NDn()
				: (this.$rt(),
					this.GDn &&
						EffectSystem_1.EffectSystem.IsValid(this.GDn) &&
						((t = EffectSystem_1.EffectSystem.GetEffectActor(this.GDn)),
						(e = MathUtils_1.MathUtils.CommonTempRotator).Set(90, 0, 0),
						t?.K2_SetActorRelativeLocation(
							this.Jmn.ToUeVector(),
							!1,
							void 0,
							!1,
						),
						t?.K2_SetActorRelativeRotation(e.ToUeRotator(), !1, void 0, !1))));
	}
	Ntn(t) {
		if (t?.IsValid())
			return t ===
				RoleTriggerController_1.RoleTriggerController.GetMyRoleTrigger()
				? ModelManager_1.ModelManager.CreatureModel.GetEntityById(
						Global_1.Global.BaseCharacter.EntityId,
					)
				: ModelManager_1.ModelManager.CreatureModel.GetEntityByChildActor(t);
	}
	ToggleDebugMode(t) {
		this.Cji &&
			(t &&
				((this.Cji.DrawTime = 0.5),
				TraceElementCommon_1.TraceElementCommon.SetTraceColor(
					this.Cji,
					ColorUtils_1.ColorUtils.LinearGreen,
				),
				TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(
					this.Cji,
					ColorUtils_1.ColorUtils.LinearRed,
				)),
			this.Cji.SetDrawDebugTrace(t ? 2 : 0));
	}
});
(SceneItemBeamCastComponent = SceneItemBeamCastComponent_1 =
	__decorate(
		[(0, RegisterComponent_1.RegisterComponent)(192)],
		SceneItemBeamCastComponent,
	)),
	(exports.SceneItemBeamCastComponent = SceneItemBeamCastComponent);
