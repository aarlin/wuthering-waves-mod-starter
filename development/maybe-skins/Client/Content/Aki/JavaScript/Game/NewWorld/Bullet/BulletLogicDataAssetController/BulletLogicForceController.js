"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BulletLogicForceController = void 0);
const GameplayTagUtils_1 = require("../../../../Core/Utils/GameplayTagUtils"),
	Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	CharacterUnifiedStateTypes_1 = require("../../Character/Common/Component/Abilities/CharacterUnifiedStateTypes"),
	CustomMovementDefine_1 = require("../../Character/Common/Component/Move/CustomMovementDefine"),
	BulletLogicController_1 = require("./BulletLogicController"),
	WEIGHT_COEFFICIENT = 14,
	TOLERANCE = 1e-5,
	FORCE_DAMPING_RATIO = 0.5,
	MOVE_TIME = 0.1,
	FORCE_RATIO = 5e3,
	MIN_WEIGHT = 50,
	LENGTH_CONVERSION = 100;
class BulletLogicForceController extends BulletLogicController_1.BulletLogicController {
	constructor(t, o) {
		super(t, o),
			(this.v9o = !1),
			(this.M9o = void 0),
			(this.S9o = !1),
			(this.E9o = new Set()),
			(this.y9o = new Set()),
			(this.I9o = Vector_1.Vector.Create()),
			(this.u9o = t),
			(this._9o = o.GetBulletInfo()),
			(this.T9o = o.GetComponent(152)),
			(this.L9o = new Map()),
			(this.D9o = new Map()),
			(this.NeedTick = !0),
			(this.v9o = this.u9o.ConstantForce),
			(this.S9o = this.u9o.IsLaunching),
			(this.R9o = 0 < this.LogicController.WorkHaveTag.GameplayTags.Num());
	}
	OnInit() {
		this.U9o();
	}
	U9o() {
		this.v9o &&
			((this.M9o = Vector_1.Vector.Create(
				this.u9o.TowardsBullet
					? this.T9o.ActorUpProxy
					: Vector_1.Vector.UpVector,
			)),
			this.M9o.MultiplyEqual(this.u9o.ForceBase));
	}
	Update(t) {
		super.Update(t), this.A9o();
	}
	BulletLogicAction() {
		this.u9o.ConstantForce && this.A9o();
	}
	A9o() {
		var t,
			o,
			e = GameplayTagUtils_1.GameplayTagUtils.ConvertFromUeContainer(
				this.LogicController.WorkHaveTag,
			);
		if (this.v9o)
			for ([o] of (this.S9o ||
				((t = this.E9o),
				(this.E9o = this.y9o),
				(this.y9o = t),
				this.E9o.clear()),
			this._9o.CollisionInfo.CharacterEntityMap))
				!o || (this.R9o && !o.GetComponent(185).HasAnyTag(e)) || this.P9o(o);
		else
			for (var [i] of this._9o.CollisionInfo.CharacterEntityMap)
				!i || (this.R9o && !i.GetComponent(185).HasAnyTag(e)) || this.x9o(i);
	}
	x9o(t) {
		var o,
			e,
			i,
			r = t.GetComponent(161);
		!r?.Valid ||
			r.CharacterWeight > this.u9o.LimitWeight ||
			((i = t.GetComponent(3).ActorLocationProxy),
			(o = Vector_1.Vector.Dist(this.T9o.ActorLocationProxy, i)) >
				this.u9o.OuterRadius) ||
			o < this.u9o.InnerRadius ||
			this.u9o.OuterRadius <= 0 ||
			((e = Math.max(50, r.CharacterWeight) - 14),
			(o =
				((Math.exp(
					(-o / this.u9o.OuterRadius) * this.u9o.ForceDampingRatio * 0.5,
				) *
					this.u9o.ForceBase *
					5e3) /
					(e * e)) *
				100),
			(e = Vector_1.Vector.Create(this.T9o.ActorLocation)).SubtractionEqual(i),
			e.Normalize(1e-5),
			e.MultiplyEqual(o),
			(i = this.L9o.get(t)),
			(i = r.SetAddMoveWorld(e.ToUeVector(), 0.1, void 0, i)),
			this.L9o.set(t, i));
	}
	P9o(t) {
		var o = t.GetComponent(158),
			e = t.GetComponent(161);
		if (o?.Valid && e?.Valid) {
			let i = CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_GLIDE;
			if (this.S9o)
				(o.PositionState ===
					CharacterUnifiedStateTypes_1.ECharPositionState.Air &&
					o.MoveState === CharacterUnifiedStateTypes_1.ECharMoveState.Other) ||
					e.CharacterMovement.SetMovementMode(3),
					(i = void 0);
			else {
				if (o.MoveState !== CharacterUnifiedStateTypes_1.ECharMoveState.Glide)
					return void this.E9o.add(t);
				this.y9o.has(t) && e.SetForceSpeed(Vector_1.Vector.ZeroVectorProxy);
			}
			let r = this.L9o.get(t);
			(o = t.GetComponent(3)),
				(o =
					this.T9o.ActorLocationProxy.Z +
					this._9o.Size.Z -
					o.ActorLocation.Z -
					o.ScaledHalfHeight);
			if (this.u9o.HaveTopArea && o < this.u9o.TopAreaHeight)
				0 < o &&
					(this.I9o.Set(0, 0, -e.CharacterMovement.Velocity.Z),
					(r = e.SetAddMoveWorld(
						this.I9o.ToUeVector(),
						0.1,
						this.u9o.ContinueTimeCurve ?? void 0,
						r,
					)),
					this.L9o.set(t, r));
			else {
				let s = 0;
				this.u9o.TowardsBullet
					? ((s = this.u9o.ContinueTime),
						this.I9o.Set(0, 0, 230),
						(o = this.u9o.IsResetOnLast
							? BulletLogicForceController.w9o.get(this.u9o.Group)
							: this.D9o.get(t)),
						(o = e.SetAddMoveWorld(this.I9o.ToUeVector(), s, void 0, o, i)),
						this.u9o.IsResetOnLast
							? BulletLogicForceController.w9o.set(this.u9o.Group, o)
							: this.D9o.set(t, o))
					: (s = 0.1),
					(r = this.u9o.IsResetOnLast
						? BulletLogicForceController.B9o.get(this.u9o.Group)
						: this.L9o.get(t)),
					(r = e.SetAddMoveWorld(
						this.M9o.ToUeVector(),
						s,
						this.u9o.ContinueTimeCurve ?? void 0,
						r,
						i,
					)),
					this.u9o.IsResetOnLast
						? BulletLogicForceController.B9o.set(this.u9o.Group, r)
						: this.L9o.set(t, r);
			}
		}
	}
}
((exports.BulletLogicForceController = BulletLogicForceController).B9o =
	new Map()),
	(BulletLogicForceController.w9o = new Map());
