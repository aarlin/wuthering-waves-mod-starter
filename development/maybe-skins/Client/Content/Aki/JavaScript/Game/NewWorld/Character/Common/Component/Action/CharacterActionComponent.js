"use strict";
var CharacterActionComponent_1,
	__decorate =
		(this && this.__decorate) ||
		function (t, e, o, i) {
			var r,
				n = arguments.length,
				a =
					n < 3
						? e
						: null === i
							? (i = Object.getOwnPropertyDescriptor(e, o))
							: i;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
				a = Reflect.decorate(t, e, o, i);
			else
				for (var s = t.length - 1; 0 <= s; s--)
					(r = t[s]) &&
						(a = (n < 3 ? r(a) : 3 < n ? r(e, o, a) : r(e, o)) || a);
			return 3 < n && a && Object.defineProperty(e, o, a), a;
		};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CharacterActionComponent = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	Log_1 = require("../../../../../../Core/Common/Log"),
	CommonParamById_1 = require("../../../../../../Core/Define/ConfigCommon/CommonParamById"),
	Protocol_1 = require("../../../../../../Core/Define/Net/Protocol"),
	QueryTypeDefine_1 = require("../../../../../../Core/Define/QueryTypeDefine"),
	EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent"),
	RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent"),
	Rotator_1 = require("../../../../../../Core/Utils/Math/Rotator"),
	Vector_1 = require("../../../../../../Core/Utils/Math/Vector"),
	Vector2D_1 = require("../../../../../../Core/Utils/Math/Vector2D"),
	MathUtils_1 = require("../../../../../../Core/Utils/MathUtils"),
	IAction_1 = require("../../../../../../UniverseEditor/Interface/IAction"),
	CameraController_1 = require("../../../../../Camera/CameraController"),
	EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
	Global_1 = require("../../../../../Global"),
	InputController_1 = require("../../../../../Input/InputController"),
	LevelGamePlayController_1 = require("../../../../../LevelGamePlay/LevelGamePlayController"),
	ModelManager_1 = require("../../../../../Manager/ModelManager"),
	FOURTY_FIVE = 45,
	ZERO_EIGHT = 0.8,
	FIVETY = 50,
	ONE_HUNDRED_FOURTY = 140,
	TWO_HUNDRED_TWENTY = 220,
	COLLISION_RADIUS_IN = 15,
	COLLISION_RADIUS_OUT = 50,
	COLLISION_RESET_ANGLE = 91,
	DEFAULT_CATAPULT_TIME = 0.6,
	DEFAULT_CATAPULT_GRAVITY = 1960,
	CATAPULT_SKILL_ID = 400102,
	SUPER_CATAPULT_SKILL_ID = 400107,
	BOUNCE_SKILL_ID = 400104,
	MAX_ANIM_STATE_CHANGE_COUNT = 600;
let CharacterActionComponent = (CharacterActionComponent_1 = class extends (
	EntityComponent_1.EntityComponent
) {
	constructor() {
		super(...arguments),
			(this.mBe = void 0),
			(this.Lie = void 0),
			(this.Hte = void 0),
			(this.Gce = void 0),
			(this.cBe = void 0),
			(this.OriginCapsuleHalfHeight = 0),
			(this.OriginCapsuleRadius = 0),
			(this.IsSitDownInternal = !1),
			(this.IsStandingUp = !1),
			(this.Chair = void 0),
			(this.EnterSitDownIndex = 0),
			(this.LeaveSitDownIndex = 0),
			(this.IsUseCatapultUpAnim = !1),
			(this.w2r = void 0),
			(this.B2r = void 0),
			(this.cz = Vector_1.Vector.Create()),
			(this.fz = Vector_1.Vector.Create()),
			(this.cie = Rotator_1.Rotator.Create()),
			(this.b2r = void 0),
			(this.q2r = void 0),
			(this.pZo = new Array()),
			(this.G2r = !1),
			(this.N2r = void 0),
			(this.O2r = void 0),
			(this.gU = !1),
			(this.Giant = void 0),
			(this.k2r = !1),
			(this.F2r = Vector_1.Vector.Create()),
			(this.V2r = (t, e) => {
				e || this.LeaveSitDownAction();
			}),
			(this.Moi = (t, e) => {
				e &&
					this.IsSitDown &&
					this.PreLeaveSitDownAction("OnDisableTagChanged " + t);
			}),
			(this.H2r = () => {
				this.IsSitDown && this.PreLeaveSitDownAction("TeleportStart");
			}),
			(this.j2r = (t) => {
				this.IsSitDown &&
					"LevelD" !== t.PlotLevel &&
					this.PreLeaveSitDownAction("PlotNetworkStart");
			}),
			(this.W2r = (t) => {
				var e;
				this.Hte.IsAutonomousProxy &&
					t?.Valid &&
					((e = this.Entity.GetComponent(26)),
					(t = t.GetComponent(26)),
					e.SetIsSitDown(t.IsSitDown, "RoleOnStateInherit"),
					t.Chair) &&
					((e.G2r = t.G2r),
					(e.Chair = t.Chair),
					e.CalculateChairDir(),
					(t.G2r || t.IsStandingUp) && (t.ResetCollision(), e.FTe()),
					t.IsSitDown) &&
					(e.EnterSitDownAction(t.Chair),
					e.DoSitDownAction(),
					t.ResetCollision());
			}),
			(this.K2r = (t, e) => {
				var o, i;
				this.Chair &&
					((o = this.Chair.GetComponent(0)?.GetCreatureDataId()),
					(i = Protocol_1.Aki.Protocol.nNn.create()),
					t &&
						((i.f9n = t), i.f9n.length > 600) &&
						Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Interaction",
							20,
							"RequestSitDownAction同步数据过大",
							["States", i.f9n],
						),
					e && (i.p9n = e),
					LevelGamePlayController_1.LevelGamePlayController.RequestChairSit(
						o,
						this.IsSitDown,
						i,
					));
			}),
			(this.Q2r = (t, e) => {
				e || (this.Gce.JumpUpRate = 1);
			});
	}
	get IsSitDown() {
		return this.IsSitDownInternal;
	}
	SetIsSitDown(t, e) {
		this.IsSitDownInternal !== t &&
			((this.IsSitDownInternal = t), Log_1.Log.CheckInfo()) &&
			Log_1.Log.Info(
				"Character",
				37,
				"SetIsSitDown",
				["isSitDown", t],
				["reason", e],
			);
	}
	static get Dependencies() {
		return [3, 158, 185];
	}
	OnStart() {
		return (
			(this.Hte = this.Entity.CheckGetComponent(3)),
			(this.OriginCapsuleRadius = this.Hte.Radius),
			(this.OriginCapsuleHalfHeight = this.Hte.HalfHeight),
			(this.mBe = this.Entity.GetComponent(158)),
			(this.Gce = this.Entity.GetComponent(161)),
			(this.cBe = this.Entity.GetComponent(33)),
			!!this.mBe &&
				((this.Lie = this.Entity.GetComponent(185)), !!this.Lie) &&
				(this.SetIsSitDown(!1, "OnStart"),
				(this.Chair = void 0),
				(this.Giant = void 0),
				(this.G2r = !1),
				(this.gU = !1),
				(this.q2r = this.Lie.ListenForTagAddOrRemove(-451106150, this.Q2r)),
				!0)
		);
	}
	OnActivate() {
		if (this.Hte.IsAutonomousProxy && !this.gU) {
			if (
				((this.b2r = this.Lie.ListenForTagAddOrRemove(-2104691392, this.V2r)),
				this.Lie?.Valid)
			)
				for (const t of CharacterActionComponent_1.X2r)
					this.pZo.push(this.Lie.ListenForTagAddOrRemove(t, this.Moi));
			EventSystem_1.EventSystem.AddWithTarget(
				this.Entity,
				EventDefine_1.EEventName.RoleOnStateInherit,
				this.W2r,
			),
				EventSystem_1.EventSystem.Add(
					EventDefine_1.EEventName.TeleportStart,
					this.H2r,
				),
				EventSystem_1.EventSystem.Add(
					EventDefine_1.EEventName.PlotNetworkStart,
					this.j2r,
				),
				(this.gU = !0);
		}
	}
	OnEnd() {
		if (this.gU) {
			this.IsSitDown && this.PreLeaveSitDownAction("OnEnd"),
				this.b2r.EndTask(),
				(this.b2r = void 0),
				this.q2r.EndTask(),
				(this.q2r = void 0);
			for (const t of this.pZo) t.EndTask();
			(this.pZo.length = 0),
				EventSystem_1.EventSystem.RemoveWithTarget(
					this.Entity,
					EventDefine_1.EEventName.RoleOnStateInherit,
					this.W2r,
				),
				EventSystem_1.EventSystem.Remove(
					EventDefine_1.EEventName.TeleportStart,
					this.H2r,
				),
				EventSystem_1.EventSystem.Remove(
					EventDefine_1.EEventName.PlotNetworkStart,
					this.j2r,
				);
		}
		return !0;
	}
	OnTick() {
		var t, e, o;
		this.Hte.IsAutonomousProxy &&
			(this.IsSitDown &&
				this.Lie.HasTag(30322312) &&
				this.Gce.HasMoveInput &&
				this.PreLeaveSitDownAction("HasMoveInput"),
			this.G2r &&
				((o = this.Chair.GetComponent(182).ActorLocationProxy),
				(t = this.Hte.ActorLocationProxy),
				(e = this.Hte.ActorForwardProxy),
				(t = Vector2D_1.Vector2D.Create(t.X - o.X, t.Y - o.Y).DotProduct(
					this.N2r,
				)),
				(o = Vector2D_1.Vector2D.Create(e.X, e.Y)).Normalize(),
				(e =
					Math.acos(this.O2r.DotProduct(o)) * MathUtils_1.MathUtils.RadToDeg),
				t < 15 || (t > 50 && this.Gce.HasMoveInput) || Math.abs(e) > 91) &&
				this.ResetCollision(),
			this.k2r) &&
			this.Hte.ActorRotationProxy.Equals2(this.Hte.InputRotator) &&
			((this.k2r = !1),
			this.Lie.AddTag(1190560501),
			(o = this.Entity.GetComponent(52)),
			InputController_1.InputController.AddInputHandler(o),
			CameraController_1.CameraController.SetInputEnable(
				Global_1.Global.BaseCharacter,
				!0,
			));
	}
	HTe(t, e) {
		var o = t.Entity.GetComponent(0)?.GetPbDataId() ?? 0;
		let i;
		i =
			(o = ModelManager_1.ModelManager.CreatureModel.GetOwnerEntity(o)) &&
			(o = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(o))
				?.Valid
				? o.Entity.GetComponent(182)
				: t;
		o = (0, puerts_1.$ref)(void 0);
		var r = (i.Owner.GetAttachedActors(o), (0, puerts_1.$unref)(o)),
			n = r.Num();
		for (let t = 0; t < n; ++t) {
			var a = r.Get(t),
				s = (0, puerts_1.$ref)(void 0),
				h = (a.GetAttachedActors(s), (0, puerts_1.$unref)(s)),
				c = h.Num();
			for (let t = 0; t < c; ++t)
				this.Hte.Actor.CapsuleComponent.IgnoreActorWhenMoving(h.Get(t), e);
		}
	}
	ResetCollision() {
		this.G2r = !1;
		var t = this.Chair.GetComponent(182);
		this.HTe(t, !1),
			this.Hte.Actor.CapsuleComponent.SetCollisionResponseToChannel(2, 2),
			(this.Chair = void 0);
	}
	GetSitDownState() {
		return this.IsSitDown;
	}
	EnterSitDownAction(t) {
		return (
			!this.Lie.HasAnyTag([-1446183172, -1371021686]) &&
			(this.cBe.StopAllSkills("CharacterActionComponent.EnterSitDownAction"),
			(this.EnterSitDownIndex = this.IsChairCanInteract(t) - 1),
			this.SetIsSitDown(!0, "角色进入坐下动作"),
			(this.G2r = !1),
			(this.Chair = t),
			this.$2r(),
			!0)
		);
	}
	$2r() {
		this.K2r(void 0, void 0);
	}
	OnResponseSit(t, e) {
		0 !== e && this.SetIsSitDown(!t, "服务器返回错误");
	}
	DoSitDownAction() {
		var t, e;
		this.Chair &&
			(this.cz.Reset(),
			this.Gce.SetForceSpeed(this.cz),
			(t = this.Chair.GetComponent(182)),
			(e = this.Chair.GetComponent(178)),
			this.cz.DeepCopy(e.GetInteractPoint()),
			(this.cz.Z += this.OriginCapsuleHalfHeight),
			this.cie.DeepCopy(t.ActorRotationProxy),
			(this.cie.Yaw += 90),
			this.Hte.SetInputRotator(this.cie),
			this.Hte.SetActorLocationAndRotation(
				this.cz.ToUeVector(),
				this.cie.ToUeRotator(),
				"角色坐下",
				!1,
			),
			CameraController_1.CameraController.FightCamera.GetComponent(
				5,
			).ResetArmLocation(!0, 0.5),
			this.FTe());
	}
	FTe() {
		this.HTe(this.Chair.GetComponent(182), !0),
			this.Hte.Actor.CapsuleComponent.SetCollisionResponseToChannel(2, 0);
	}
	PreLeaveSitDownAction(t = "") {
		this.SetIsSitDown(!1, t),
			(this.IsStandingUp = !0),
			this.Y2r(),
			this.K2r(void 0, void 0);
	}
	Y2r() {
		var t;
		this.Chair &&
			(this.Hte.Actor.CharacterMovement.SetMovementMode(1),
			this.cz.DeepCopy(this.Hte.InputDirectProxy),
			this.cz.Normalize(),
			(t = this.Chair.GetComponent(178).GetInteractController().SectorRange),
			this.cz.DotProduct(this.Hte.ActorForwardProxy) > 0.8
				? (this.LeaveSitDownIndex = 0)
				: (this.cz.CrossProduct(this.Hte.ActorForwardProxy, this.fz),
					0 <= this.fz.Z
						? t.Begin < -45
							? (this.LeaveSitDownIndex = 1)
							: (this.LeaveSitDownIndex = 0)
						: t.End > 45
							? (this.LeaveSitDownIndex = 2)
							: (this.LeaveSitDownIndex = 0)));
	}
	LeaveSitDownAction() {
		(this.IsStandingUp = !1),
			this.Chair &&
				this.Hte.IsAutonomousProxy &&
				((this.G2r = !0), this.CalculateChairDir());
	}
	CalculateChairDir() {
		var t, e, o;
		this.Chair &&
			this.Hte &&
			((t = this.Chair.GetComponent(182).ActorLocationProxy),
			(e = this.Hte.ActorLocationProxy),
			(o = this.Hte.ActorForwardProxy),
			(this.N2r = Vector2D_1.Vector2D.Create(e.X - t.X, e.Y - t.Y)),
			this.N2r.Normalize(),
			(this.O2r = Vector2D_1.Vector2D.Create(o.X, o.Y)),
			this.O2r.Normalize());
	}
	IsChairCanInteract(t) {
		if (!(t = t.GetComponent(182))) return 0;
		this.Hte.ActorLocationProxy.Subtraction(t.ActorLocationProxy, this.cz),
			(this.cz.Z = 0),
			this.cz.Normalize();
		var e = this.cz.DotProduct(t.ActorRightProxy);
		let o = Math.acos(e) * MathUtils_1.MathUtils.RadToDeg;
		return (
			this.cz.CrossProduct(t.ActorRightProxy, this.fz),
			this.fz.Z < 0 && (o *= -1),
			o >= -50 && o <= 50
				? 1
				: o >= 50 && o <= 140
					? 2
					: o >= -140 && o <= -50
						? 3
						: (o < 0 && (o += MathUtils_1.PI_DEG_DOUBLE),
							o >= 140 && o <= 220 ? 4 : 0)
		);
	}
	StartCatapult(t, e) {
		var o, i, r, n, a, s, h;
		t &&
			e.Param &&
			(h = this.Entity.GetComponent(30)) &&
			(o = this.Entity.GetComponent(33)) &&
			((r = (i = e.Type === IAction_1.ELeisureInteract.SuperCatapult)
				? 400107
				: 400102),
			o.BeginSkill(r, { Context: "CharacterActionComponent.StartCatapult" })) &&
			((n = (t = t.GetComponent(1)).ActorLocationProxy),
			(t = t.ActorQuatProxy),
			(a = e.Param.Time ?? 0.6),
			(s = e.Param.Gravity ?? 1960),
			CharacterActionComponent_1.Lz.FromConfigVector(e.Param.P1),
			t.RotateVector(
				CharacterActionComponent_1.Lz,
				CharacterActionComponent_1.Lz,
			),
			CharacterActionComponent_1.Lz.AdditionEqual(n),
			CharacterActionComponent_1.Tz.FromConfigVector(e.Param.P2),
			t.RotateVector(
				CharacterActionComponent_1.Tz,
				CharacterActionComponent_1.Tz,
			),
			CharacterActionComponent_1.Tz.AdditionEqual(n),
			h.SetConfig(
				a,
				n,
				CharacterActionComponent_1.Lz,
				CharacterActionComponent_1.Tz,
				void 0,
				s,
				void 0,
				i,
			),
			(e = Vector_1.Vector.Create(
				CharacterActionComponent_1.Lz,
			)).SubtractionEqual(n),
			e.Normalize(),
			(t = Vector_1.Vector.Create(0, 0, 1)),
			(h = MathUtils_1.MathUtils.DotProduct(t, e)),
			(this.IsUseCatapultUpAnim =
				h > Math.cos((this.J2r() / 2 / 180) * Math.PI)),
			this.F2r.DeepCopy(CharacterActionComponent_1.Tz),
			o.BeginSkill(r, { Context: "CharacterActionComponent.StartCatapult" }));
	}
	EndCatapult() {}
	StartBounce(t) {
		var e,
			o,
			i = this.Entity.GetComponent(30);
		i &&
			(e = this.Entity.GetComponent(33)) &&
			e.BeginSkill(400104, {
				Context: "CharacterActionComponent.StartBounce",
			}) &&
			((o = (e = this.Entity.GetComponent(1)).ActorLocationProxy),
			CharacterActionComponent_1.Lz.DeepCopy(o),
			(CharacterActionComponent_1.Lz.Z += t.Height),
			i.SetConfig(
				t.Time ?? 2,
				o,
				CharacterActionComponent_1.Lz,
				CharacterActionComponent_1.Lz,
				t.MotionCurve,
				0,
				e.ActorRotationProxy,
			),
			(this.IsUseCatapultUpAnim = !1));
	}
	EndBounce() {
		var t = this.Entity.GetComponent(33);
		!t ||
			(void 0 !== (t = t.CurrentSkill) && 400104 !== t.SkillId) ||
			((t = this.Entity.GetComponent(161)).SetForceSpeed(
				Vector_1.Vector.ZeroVectorProxy,
			),
			t.CharacterMovement.SetMovementMode(3));
	}
	GetInteractionTargetLocation() {
		return this.F2r;
	}
	get ExecutionTrace() {
		return (
			this.B2r ||
				((this.B2r = UE.NewObject(UE.TraceLineElement.StaticClass())),
				(this.B2r.WorldContextObject = this.Hte.Owner),
				(this.B2r.bIgnoreSelf = !0),
				(this.B2r.bIsSingle = !0),
				this.B2r.SetTraceTypeQuery(
					QueryTypeDefine_1.KuroTraceTypeQuery.Visible,
				),
				this.B2r.SetDrawDebugTrace(0)),
			this.B2r
		);
	}
	PlayCustomCommonSkill(t) {
		this.cBe?.CheckIsLoaded() &&
			this.cBe.BeginSkill(t, {
				Context: "CharacterActionComponent.PlayCustomCommonSkill",
			});
	}
	J2r() {
		return (
			this.w2r ||
				(this.w2r =
					CommonParamById_1.configCommonParamById.GetFloatConfig(
						"CatapultAnimAngle",
					)),
			this.w2r
		);
	}
});
(CharacterActionComponent.X2r = [
	-1371021686, -1503953470, 1008164187, 1996624497,
]),
	(CharacterActionComponent.Lz = Vector_1.Vector.Create()),
	(CharacterActionComponent.Tz = Vector_1.Vector.Create()),
	(CharacterActionComponent = CharacterActionComponent_1 =
		__decorate(
			[(0, RegisterComponent_1.RegisterComponent)(26)],
			CharacterActionComponent,
		)),
	(exports.CharacterActionComponent = CharacterActionComponent);
