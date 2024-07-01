"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (e, t, o, n) {
		var i,
			r = arguments.length,
			a =
				r < 3
					? t
					: null === n
						? (n = Object.getOwnPropertyDescriptor(t, o))
						: n;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			a = Reflect.decorate(e, t, o, n);
		else
			for (var l = e.length - 1; 0 <= l; l--)
				(i = e[l]) && (a = (r < 3 ? i(a) : 3 < r ? i(t, o, a) : i(t, o)) || a);
		return 3 < r && a && Object.defineProperty(t, o, a), a;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AiWeaponMovementComponent = void 0);
const UE = require("ue"),
	QueryTypeDefine_1 = require("../../../../Core/Define/QueryTypeDefine"),
	EntityComponent_1 = require("../../../../Core/Entity/EntityComponent"),
	RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
	FNameUtil_1 = require("../../../../Core/Utils/FNameUtil"),
	Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	TraceElementCommon_1 = require("../../../../Core/Utils/TraceElementCommon"),
	IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent"),
	Global_1 = require("../../../Global"),
	GlobalData_1 = require("../../../GlobalData"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	ColorUtils_1 = require("../../../Utils/ColorUtils"),
	COLLISION_PROFILE_NAME = new UE.FName("DropItem"),
	GROUND_MAX_XY_VEL_SQUARED = 4,
	GROUND_MAX_Z_VEL = 2,
	MAX_DROP_HEIGHT = 1e4,
	ON_WATER_MAX_DIST = 5;
let AiWeaponMovementComponent = class extends EntityComponent_1.EntityComponent {
	constructor() {
		super(...arguments),
			(this.Hte = void 0),
			(this.SIe = void 0),
			(this.EnableMovement = void 0),
			(this.lln = 1),
			(this._ln = -0),
			(this.Cji = void 0);
	}
	OnInitData() {
		(this.SIe = this.Entity.GetComponent(0)), (this._ln = 0.01);
		var e = this.SIe.GetPbEntityInitData();
		e = (0, IComponent_1.getComponent)(e.ComponentsData, "WeaponComponent");
		return (
			e?.WeaponId &&
				((e = ModelManager_1.ModelManager.AiWeaponModel.GetStaticWeaponConfig(
					e.WeaponId,
				)),
				(this._ln = e.Mass)),
			(this.EnableMovement = !0),
			!(this.lln = 0)
		);
	}
	OnStart() {
		return (
			(this.Hte = this.Entity.GetComponent(182)),
			ModelManager_1.ModelManager.GameModeModel.IsMulti ||
				this.Entity.GetComponent(142)?.TryDisable(
					"[AiWeaponMovementComponent.OnStart]",
				),
			!0
		);
	}
	OnTick(e) {
		this.EnableMovement && this.UpdateMovement(e);
	}
	UpdateMovement(e) {
		switch (
			(this.Hte.SetActorLocation(this.Hte.StaticMesh.K2_GetComponentLocation()),
			this.lln)
		) {
			case 0:
				this.UpdateItemBorn(e);
				break;
			case 1:
				this.UpdateItemFall(e);
				break;
			case 2:
				this.UpdateItemStay(e);
		}
	}
	UpdateItemBorn(e) {
		var t = MathUtils_1.MathUtils.CommonTempVector;
		t.FromConfigVector(
			this.SIe.GetInitLinearVelocity() ?? Vector_1.Vector.ZeroVector,
		),
			t.IsNearlyZero() ? (this.lln = 2) : (this.uln(), (this.lln = 1));
	}
	UpdateItemFall(e) {
		(this.cln() || this.mln() || this.dln()) &&
			((this.lln = 2),
			this.Cln(),
			ModelManager_1.ModelManager.GameModeModel.IsMulti ||
				this.Entity.GetComponent(142)?.ForceSendPendingMoveInfos());
	}
	UpdateItemStay(e) {
		this.EnableMovement = !1;
	}
	uln() {
		var e,
			t = this.Hte.StaticMesh,
			o =
				(t.SetCollisionProfileName(COLLISION_PROFILE_NAME),
				t.SetCollisionEnabled(2),
				t.SetSimulatePhysics(!0),
				0 <= this._ln &&
					t.SetMassOverrideInKg(FNameUtil_1.FNameUtil.NONE, this._ln, !0),
				t.SetEnableGravity(!0),
				t.SetConstraintMode(6),
				t.SetUseCCD(!0),
				MathUtils_1.MathUtils.CommonTempVector);
		o.FromConfigVector(
			this.SIe.GetInitLinearVelocity() ?? Vector_1.Vector.ZeroVector,
		),
			o.SizeSquared2D() <= 4 &&
				((e = Vector_1.Vector.Create()),
				o.GetSignVector(e),
				e.MultiplyEqual(Math.sqrt(5)),
				(e.Z = 0),
				o.AdditionEqual(e)),
			t.SetPhysicsLinearVelocity(o.ToUeVector());
	}
	Cln() {
		var e = this.Hte.StaticMesh;
		e.SetCollisionEnabled(0),
			e.SetSimulatePhysics(!1),
			e.SetEnableGravity(!1),
			e.SetPhysicsLinearVelocity(Vector_1.Vector.ZeroVector),
			e.SetPhysicsAngularVelocity(Vector_1.Vector.ZeroVector),
			e.SetConstraintMode(0),
			e.SetUseCCD(!1);
	}
	gln() {
		this.Cji || (this.Cji = UE.NewObject(UE.TraceLineElement.StaticClass())),
			(this.Cji.WorldContextObject = GlobalData_1.GlobalData.World),
			(this.Cji.bIsSingle = !0),
			(this.Cji.bIgnoreSelf = !0),
			this.Cji.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.Water),
			this.Cji.SetDrawDebugTrace(2),
			(this.Cji.DrawTime = 5),
			TraceElementCommon_1.TraceElementCommon.SetTraceColor(
				this.Cji,
				ColorUtils_1.ColorUtils.LinearGreen,
			),
			TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(
				this.Cji,
				ColorUtils_1.ColorUtils.LinearRed,
			);
	}
	fln(e) {
		this.gln();
		var t = this.Hte.ActorLocationProxy;
		e =
			(t =
				(this.Cji.SetStartLocation(t.X, t.Y, t.Z),
				this.Cji.SetEndLocation(t.X, t.Y, t.Z + e),
				TraceElementCommon_1.TraceElementCommon.LineTrace(
					this.Cji,
					"AiWeaponMovementComponent.TraceHitWater",
				))) && !!this.Cji.HitResult?.bBlockingHit;
		return this.Cji.ClearCacheData(), e;
	}
	cln() {
		var e;
		return (
			!(0 < this.Hte.StaticMesh.GetComponentVelocity().Z) &&
			((e = (e = this.SIe.GetInitLocation())
				? this.Hte.ActorLocationProxy.Z - e.Z
				: 0),
			Math.abs(e) > 1e4 ||
				((e = (e =
					Global_1.Global.BaseCharacter?.CharacterActorComponent.ActorLocation)
					? this.Hte.ActorLocationProxy.Z - e.Z
					: 0),
				Math.abs(e) > 1e4))
		);
	}
	mln() {
		var e = this.Hte.StaticMesh.GetComponentVelocity();
		return e.Z <= 0 && Math.abs(e.Z) <= 2 && e.SizeSquared2D() <= 4;
	}
	dln() {
		return !!(
			this.Hte.StaticMesh.GetComponentVelocity().Z <= 0 && this.fln(-5)
		);
	}
};
(AiWeaponMovementComponent = __decorate(
	[(0, RegisterComponent_1.RegisterComponent)(108)],
	AiWeaponMovementComponent,
)),
	(exports.AiWeaponMovementComponent = AiWeaponMovementComponent);
