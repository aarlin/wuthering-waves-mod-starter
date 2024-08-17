"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ParallaxBehaviorNode = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	CommonDefine_1 = require("../../../../../Core/Define/CommonDefine"),
	EntitySystem_1 = require("../../../../../Core/Entity/EntitySystem"),
	MathCommon_1 = require("../../../../../Core/Utils/Math/MathCommon"),
	Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
	Vector2D_1 = require("../../../../../Core/Utils/Math/Vector2D"),
	Global_1 = require("../../../../Global"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	TickBehaviorNode_1 = require("./TickBehaviorNode"),
	EMISSION_PARAM_NAME = "E_Action_EmissionColor";
class ParallaxBehaviorNode extends TickBehaviorNode_1.TickBehaviorNode {
	constructor() {
		super(...arguments),
			(this.eXt = void 0),
			(this.tXt = void 0),
			(this.iXt = Vector2D_1.Vector2D.Create()),
			(this.oXt = Vector2D_1.Vector2D.Create()),
			(this.Lo = void 0),
			(this.$Bn = -0),
			(this.rXt = !1),
			(this.nXt = void 0);
	}
	OnCreate(t) {
		var o;
		return (
			!!super.OnCreate(t) &&
			"ParallaxAlign" === (o = t.Condition).Type &&
			((this.Lo = o), !!this.Lo) &&
			((this.eXt = Vector_1.Vector.Create(
				this.Lo.SourcePos.X,
				this.Lo.SourcePos.Y,
				this.Lo.SourcePos.Z,
			)),
			(this.tXt = Vector_1.Vector.Create(
				this.Lo.TargetPos.X,
				this.Lo.TargetPos.Y,
				this.Lo.TargetPos.Z,
			)),
			super.OnCreate(t))
		);
	}
	OnStart(t) {
		var o;
		(this.rXt = !1),
			this.Lo.BallEntity &&
				(o = ModelManager_1.ModelManager.CreatureModel?.GetEntityIdByPbDataId(
					this.Lo.BallEntity,
				)) &&
				(this.nXt = EntitySystem_1.EntitySystem.GetComponent(o, 182)),
			super.OnStart(t);
	}
	OnEnd(t) {
		(this.rXt = !0), super.OnEnd(t);
	}
	OnTick(t) {
		var o, e, r, i, a, s, n;
		this.rXt ||
			((o = (0, puerts_1.$ref)(void 0)),
			!UE.GameplayStatics.ProjectWorldToScreen(
				Global_1.Global.CharacterController,
				this.eXt.ToUeVector(),
				o,
				!1,
			) ||
			(this.iXt.FromUeVector2D((0, puerts_1.$unref)(o)),
			!UE.GameplayStatics.ProjectWorldToScreen(
				Global_1.Global.CharacterController,
				this.tXt.ToUeVector(),
				o,
				!1,
			)) ||
			(this.oXt.FromUeVector2D((0, puerts_1.$unref)(o)),
			!this.nXt &&
				this.Lo.BallEntity &&
				(o = ModelManager_1.ModelManager.CreatureModel?.GetEntityIdByPbDataId(
					this.Lo.BallEntity,
				)) &&
				(this.nXt = EntitySystem_1.EntitySystem.GetComponent(o, 182)),
			(o = Global_1.Global.CharacterController),
			(e = (0, puerts_1.$ref)(void 0)),
			(r = (0, puerts_1.$ref)(void 0)),
			o.GetViewportSize(e, r),
			(o = Math.max(
				Math.abs(this.iXt.X - this.oXt.X) / (0, puerts_1.$unref)(e),
				Math.abs(this.iXt.Y - this.oXt.Y) / (0, puerts_1.$unref)(r),
			)),
			this.nXt &&
				((e = MathCommon_1.MathCommon.Clamp(
					(o - this.Lo.ErrorRange) /
						(this.Lo.BrightnessAdjustRange - this.Lo.ErrorRange),
					0,
					1,
				)),
				(r = this.Lo.DefaultBrightness || 0),
				this.Lo.FinalColor
					? ((n =
							MathCommon_1.MathCommon.Lerp(
								r * this.Lo.FinalColor.R,
								this.Lo.FinalColor.R,
								1 - e,
							) / 255),
						(i =
							MathCommon_1.MathCommon.Lerp(
								r * this.Lo.FinalColor.G,
								this.Lo.FinalColor.G,
								1 - e,
							) / 255),
						(a =
							MathCommon_1.MathCommon.Lerp(
								r * this.Lo.FinalColor.B,
								this.Lo.FinalColor.B,
								1 - e,
							) / 255),
						(s = MathCommon_1.MathCommon.Lerp(
							r * this.Lo.FinalColor.A,
							this.Lo.FinalColor.A,
							1 - e,
						)),
						this.nXt.UpdateInteractionMaterialColorParam(
							EMISSION_PARAM_NAME,
							n,
							i,
							a,
							s,
						))
					: ((n = MathCommon_1.MathCommon.Lerp(r, 1, 1 - e)),
						this.nXt.UpdateInteractionMaterialColorParam(
							EMISSION_PARAM_NAME,
							n,
							n,
							n,
						))),
			o > this.Lo.ErrorRange)
				? (this.$Bn = 0)
				: ((this.$Bn += t),
					(!this.Lo.FixationTime ||
						this.$Bn >=
							this.Lo.FixationTime * CommonDefine_1.MILLIONSECOND_PER_SECOND) &&
						(this.SubmitNode(), (this.rXt = !0))));
	}
}
exports.ParallaxBehaviorNode = ParallaxBehaviorNode;
