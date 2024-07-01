"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ReachAreaBehaviorNode = void 0);
const Rotator_1 = require("../../../../../Core/Utils/Math/Rotator"),
	Transform_1 = require("../../../../../Core/Utils/Math/Transform"),
	Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
	IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent"),
	ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	SceneTeamController_1 = require("../../../SceneTeam/SceneTeamController"),
	GeneralLogicTreeUtil_1 = require("../../GeneralLogicTreeUtil"),
	TickBehaviorNode_1 = require("./TickBehaviorNode");
class ReachAreaBehaviorNode extends TickBehaviorNode_1.TickBehaviorNode {
	constructor() {
		super(...arguments),
			(this.lXt = void 0),
			(this._Xt = -0),
			(this.E0 = 0),
			(this.uXt = !1),
			(this.cXt = Vector_1.Vector.Create()),
			(this.mXt = "Box"),
			(this.aXt = []),
			(this.EffectPathKey = void 0),
			(this.ConditionGrop = void 0),
			(this.wY = 0),
			(this.dXt = void 0),
			(this.CXt = void 0),
			(this.gXt = Vector_1.Vector.Create()),
			(this.fXt = void 0),
			(this.pXt = 0),
			(this.vXt = 0),
			(this.OnAfterSubmit = (e) => {
				this.uXt = !1;
			});
	}
	get CorrelativeEntities() {}
	OnCreate(e) {
		if (!super.OnCreate(e)) return !1;
		if ("ReachArea" !== (e = e.Condition).Type) return !1;
		(this.IntervalTime = 500),
			(this.E0 = e.EntityId),
			(this.aXt = e.MatchRoleOption),
			(this.ConditionGrop = e.PreConditions),
			(this.EffectPathKey = e.EffectPath);
		var t =
			void 0 !== e.RangeEntityId
				? ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(
						e.RangeEntityId,
					)
				: void 0;
		if (t) {
			this._Xt = e.Range;
			var r = (0, IComponent_1.getComponent)(
					t.ComponentsData,
					"RangeComponent",
				),
				i = ((this.mXt = r.Shape.Type), t.Transform.Pos);
			switch (r.Shape.Type) {
				case "Sphere":
					var o = r.Shape.Center;
					(this.lXt = Vector_1.Vector.Create(
						i.X + (o?.X ?? 0),
						i.Y + (o?.Y ?? 0),
						i.Z + (o?.Z ?? 0),
					)),
						(this._Xt = r.Shape.Radius);
					break;
				case "Box":
					o = t.Transform.Rot;
					var a = r.Shape.Center,
						s = r.Shape.Size,
						n = r.Shape.Rotator;
					(o = Rotator_1.Rotator.Create(
						o?.Y ?? 0 + (n?.Y ?? 0),
						o?.Z ?? 0 + (n?.Z ?? 0),
						o?.X ?? 0 + (n?.X ?? 0),
					).Quaternion()),
						(n = Vector_1.Vector.Create(
							i.X + (a?.X ?? 0),
							i.Y + (a?.Y ?? 0),
							i.Z + (a?.Z ?? 0),
						)),
						(a = Transform_1.Transform.Create(o, n, Vector_1.Vector.OneVector));
					(this.lXt = n),
						(this.dXt = Vector_1.Vector.Create(s.X ?? 0, s.Y ?? 0, s.Z ?? 0)),
						(this.CXt = a);
					break;
				case "Cylinder":
					(o = r.Shape.Center),
						(this.fXt = Vector_1.Vector.Create(
							i.X ?? 0 + (o?.X ?? 0),
							i.Y + (o?.Y ?? 0),
							i.Z + (o?.Z ?? 0),
						)),
						(this.pXt = r.Shape.Radius),
						(this.vXt = r.Shape.Height);
			}
		} else
			(this.lXt = Vector_1.Vector.Create(e.Pos.X, e.Pos.Y, e.Pos.Z)),
				(this._Xt = e.Range),
				(this.mXt = "Sphere");
		return !0;
	}
	OnDestroy() {
		super.OnDestroy();
	}
	OnTick() {
		this.wY++,
			ModelManager_1.ModelManager.TeleportModel.IsTeleport ||
				this.uXt ||
				(!this.Blackboard.IsTracking && this.wY % 2 != 0) ||
				ModelManager_1.ModelManager.SceneTeamModel.IsAllDid() ||
				(this.MXt() && this.SubmitNode());
	}
	MXt() {
		if (this.aXt && 0 < this.aXt.length) {
			if (
				!SceneTeamController_1.SceneTeamController.IsMatchRoleOption(this.aXt)
			)
				return !1;
		} else if (ModelManager_1.ModelManager.SceneTeamModel.IsPhantomTeam)
			return !1;
		if (
			this.ConditionGrop &&
			!ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckConditionNew(
				this.ConditionGrop,
				void 0,
			)
		)
			return !1;
		if (this.E0) {
			var e = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
				this.E0,
			);
			if (!e) return !1;
			this.cXt.DeepCopy(e.Entity.GetComponent(1).ActorLocationProxy);
		} else {
			if (
				!(e = GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetPlayerLocation())
			)
				return !1;
			this.cXt.DeepCopy(e);
		}
		if (!this.cXt) return !1;
		let t = !1;
		switch (this.mXt) {
			case "Sphere":
				this.lXt &&
					(t = Vector_1.Vector.Distance(this.cXt, this.lXt) < this._Xt);
				break;
			case "Box":
				this.CXt?.InverseTransformPosition(this.cXt, this.gXt),
					(t =
						this.gXt.X > -this.dXt.X &&
						this.gXt.X < this.dXt.X &&
						this.gXt.Y > -this.dXt.Y &&
						this.gXt.Y < this.dXt.Y &&
						this.gXt.Z > -this.dXt.Z &&
						this.gXt.Z < this.dXt.Z);
				break;
			case "Cylinder":
				var r;
				!this.fXt ||
					Vector_1.Vector.Dist2D(this.cXt, this.fXt) > this.pXt ||
					(t =
						(r = this.cXt.Z - this.fXt.Z) <= this.vXt / 2 &&
						r >= -this.vXt / 2);
		}
		return t;
	}
	OnBeforeSubmit() {
		this.uXt = !0;
	}
	GetTargetPosition() {
		return this.lXt;
	}
}
exports.ReachAreaBehaviorNode = ReachAreaBehaviorNode;
