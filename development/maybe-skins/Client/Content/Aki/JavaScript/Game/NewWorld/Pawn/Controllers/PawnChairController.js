"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PawnChairController = exports.SubEntityInteractLogicController =
		void 0);
const puerts_1 = require("puerts"),
	Log_1 = require("../../../../Core/Common/Log"),
	Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	ModelManager_1 = require("../../../Manager/ModelManager");
class SubEntityInteractLogicController {
	constructor(t) {
		(this.MasterEntity = void 0),
			(this.Entity = void 0),
			(this.CreatureDataComp = void 0),
			(this.InteractComp = void 0),
			(this.CreatureDataComp = t),
			(this.Entity = t.Entity),
			(this.InteractComp =
				this.Entity.GetComponent(178)?.GetInteractController());
	}
	Possess(t, e = 0) {
		return !0;
	}
	UnPossess(t) {
		return !0;
	}
	IsPossessed() {
		return void 0 !== this.MasterEntity;
	}
	IsPossessedBy(t) {
		return void 0 !== this.MasterEntity && this.MasterEntity === t;
	}
	Dispose() {
		(this.MasterEntity = void 0),
			(this.Entity = void 0),
			(this.CreatureDataComp = void 0),
			(this.InteractComp = void 0);
	}
}
class PawnChairController extends (exports.SubEntityInteractLogicController =
	SubEntityInteractLogicController) {
	constructor() {
		super(...arguments), (this.mor = 40), (this.dor = void 0);
	}
	Possess(t, e) {
		return (this.MasterEntity = t), !0;
	}
	GetInteractPoint() {
		var t = this.Entity.GetComponent(1),
			e = Vector_1.Vector.Create(),
			r = Vector_1.Vector.Create(),
			o = Vector_1.Vector.Create(t.ActorRightProxy);
		t = Vector_1.Vector.Create(t.ActorLocationProxy);
		return o.Normalize(), o.Multiply(this.mor, r), t.Addition(r, e), e;
	}
	GetForwardDirection() {
		return this.Entity.GetComponent(1).ActorRightProxy;
	}
	Cor(t) {
		if (this.dor && this.MasterEntity) {
			var e,
				r = this.MasterEntity.GetComponent(2),
				o =
					(r.Actor.CapsuleComponent.SetCollisionResponseToChannel(2, t ? 0 : 2),
					(0, puerts_1.$ref)(void 0)),
				n = (this.dor.Owner.GetAttachedActors(o), (0, puerts_1.$unref)(o)),
				i = n.Num();
			0 === i &&
				((o = this.CreatureDataComp.GetPbDataId()),
				(e = this.dor.CreatureData.GetPbDataId()),
				Log_1.Log.CheckWarn()) &&
				Log_1.Log.Warn(
					"AI",
					51,
					"[PawnChairController] Scene Interaction Loaded UnComplete!",
					["itemPbDataId", o],
					["OwnerPbDataId", e],
				);
			for (let e = 0; e < i; ++e) {
				var a = n.Get(e),
					s = (0, puerts_1.$ref)(void 0),
					C = (a.GetAttachedActors(s), (0, puerts_1.$unref)(s)),
					d = C.Num();
				for (let e = 0; e < d; ++e)
					r.Actor.CapsuleComponent.IgnoreActorWhenMoving(C.Get(e), t);
			}
		}
	}
	ResetCollision() {
		this.Entity.GetComponent(182) && this.Cor(!1);
	}
	IgnoreCollision() {
		this.Entity.GetComponent(182) && this.Cor(!0);
	}
	IsSceneInteractionLoadCompleted() {
		var t = this.Entity.GetComponent(182);
		if (!t) return !1;
		var e = this.CreatureDataComp.GetPbDataId();
		const r = ModelManager_1.ModelManager.CreatureModel.GetOwnerEntity(e);
		if (
			(r &&
				(e =
					ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(r)) &&
				(this.dor = e.Entity.GetComponent(182)),
			this.dor || (this.dor = t),
			!this.dor.Owner)
		)
			return !1;
		if (
			((e = (0, puerts_1.$ref)(void 0)),
			this.dor.Owner.GetAttachedActors(e),
			0 !== (0, puerts_1.$unref)(e).Num())
		)
			return !0;
		{
			t = this.CreatureDataComp.GetPbDataId();
			const e = this.dor.CreatureData.GetPbDataId();
			return (
				Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn(
						"AI",
						51,
						"[PawnChairController] Scene Interaction Loaded UnComplete!",
						["itemPbDataId", t],
						["OwnerPbDataId", e],
					),
				!1
			);
		}
	}
}
exports.PawnChairController = PawnChairController;
