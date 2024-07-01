"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SceneItemManipulableDrawState = void 0);
const UE = require("ue"),
	FNameUtil_1 = require("../../../../Core/Utils/FNameUtil"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	Global_1 = require("../../../Global"),
	SceneItemManipulableBaseState_1 = require("./SceneItemManipulableBaseState");
class SceneItemManipulableDrawState extends SceneItemManipulableBaseState_1.SceneItemManipulableBaseState {
	constructor(e, t, i) {
		super(e),
			(this.M$i = void 0),
			(this.onr = void 0),
			(this.rnr = void 0),
			(this.inr = void 0),
			(this.M$i = t),
			(this.inr = i),
			(this.StateType = "BeDrawing");
	}
	SetEnterCallback(e) {
		this.EnterCallback = e;
	}
	OnEnter() {
		(this.SceneItem.NeedRemoveControllerId = !0),
			this.SceneItem.ActivatedOutlet?.Valid &&
				(this.SceneItem.MatchSequence &&
					((this.SceneItem.PlayingMatchSequence = !0),
					this.SceneItem.PlayMatchSequence(() => {
						this.nnr(),
							(this.SceneItem.PlayingMatchSequence = !1),
							(this.SceneItem.MatchSequence = void 0);
					}, !0)),
				this.SceneItem.ActivatedOutlet.OnPickUpItem(this.SceneItem.Entity)),
			void 0 === this.SceneItem.MatchSequence && this.nnr(),
			FNameUtil_1.FNameUtil.IsNothing(
				this.SceneItem.ManipulateBaseConfig.吸取状态碰撞预设,
			) ||
				this.SceneItem.ActorComp.GetPrimitiveComponent().SetCollisionProfileName(
					this.SceneItem.ManipulateBaseConfig.吸取状态碰撞预设,
				);
	}
	nnr() {
		this.SceneItem.ActivatedOutlet?.Valid &&
			this.SceneItem.ClearAttachOutletInfo(),
			this.StartCameraShake(this.M$i),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.AddSubCameraTag,
				this.inr,
			),
			(this.SceneItem.ActorComp.PhysicsMode = 0),
			(this.Timer = 0),
			(this.onr = this.SceneItem.GetDrawStartLocation().ToUeVector()),
			(this.rnr = this.SceneItem.ActorComp.ActorRotation),
			this.EnterCallback && this.EnterCallback();
	}
	OnTick(e) {
		return (
			this.SceneItem.PlayingMatchSequence ||
				((this.Timer += e),
				(e = this.snr()),
				this.SceneItem.ActorComp.SetActorLocationAndRotation(
					e.Loc,
					e.Rot,
					"[ManipulableDrawState.Tick]",
					!0,
				)),
			!0
		);
	}
	OnExit() {
		this.StopCameraShake(),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.RemoveSubCameraTag,
				this.inr,
			);
	}
	snr() {
		var e = this.SceneItem.ManipulateBaseConfig;
		let t = 1,
			i = 1;
		this.Timer < e.对齐时间 &&
			((t = MathUtils_1.MathUtils.Clamp(this.Timer / e.对齐时间, 0, 1)),
			(t = UE.KismetMathLibrary.Ease(0, 1, t, 5))),
			this.Timer < e.吸取时间 &&
				((i = MathUtils_1.MathUtils.Clamp(
					(this.Timer - e.吸取延迟) / (e.吸取时间 - e.吸取延迟),
					0,
					1,
				)),
				(i = UE.KismetMathLibrary.Ease(0, 1, i, 7)));
		var a = new UE.Vector(this.onr.X, this.onr.Y, this.onr.Z),
			n =
				((e = ((a.Z += e.牵引高度 * t), this.rnr)),
				this.SceneItem.UsingAssistantHoldOffset
					? this.SceneItem.ConfigAssistantHoldOffset
					: this.SceneItem.ConfigHoldOffset);
		n = (r =
			Global_1.Global.BaseCharacter.CharacterActorComponent
				.ActorTransform).TransformPositionNoScale(n);
		let s = UE.KismetMathLibrary.ComposeRotators(
			this.SceneItem.ConfigHoldRotator,
			r.Rotator(),
		);
		var r = this.SceneItem.Entity.GetComponent(122);
		r?.Valid &&
			((r = new UE.Rotator(0, -r.Rotation, 0)),
			(s = UE.KismetMathLibrary.ComposeRotators(r, s)));
		let o = n,
			m = s;
		return (
			i < 1 &&
				((o = UE.KismetMathLibrary.VLerp(a, n, i)),
				(m = UE.KismetMathLibrary.RLerp(e, s, i, !0))),
			{ Loc: o, Rot: m }
		);
	}
}
exports.SceneItemManipulableDrawState = SceneItemManipulableDrawState;
