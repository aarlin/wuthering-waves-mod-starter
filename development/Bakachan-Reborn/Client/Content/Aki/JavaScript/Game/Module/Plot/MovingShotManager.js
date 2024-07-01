"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MovingShotManager = void 0);
const UE = require("ue"),
	ActorSystem_1 = require("../../../Core/Actor/ActorSystem"),
	Log_1 = require("../../../Core/Common/Log"),
	ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
	Quat_1 = require("../../../Core/Utils/Math/Quat"),
	Transform_1 = require("../../../Core/Utils/Math/Transform"),
	Vector_1 = require("../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	ObjectUtils_1 = require("../../../Core/Utils/ObjectUtils"),
	StringUtils_1 = require("../../../Core/Utils/StringUtils"),
	IAction_1 = require("../../../UniverseEditor/Interface/IAction"),
	PublicUtil_1 = require("../../Common/PublicUtil"),
	TimeUtil_1 = require("../../Common/TimeUtil"),
	Global_1 = require("../../Global"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	SequenceDefine_1 = require("./Sequence/SequenceDefine");
class CameraSequencePlayer {
	constructor() {
		(this.u$i = void 0),
			(this.c$i = ResourceSystem_1.ResourceSystem.InvalidId),
			(this.sye = !1),
			(this.m$i = !1),
			(this.d$i = (e) => {
				var t, i;
				(this.c$i = ResourceSystem_1.ResourceSystem.InvalidId),
					e &&
						ObjectUtils_1.ObjectUtils.IsValid(e) &&
						((t = ActorSystem_1.ActorSystem.Spawn(
							UE.LevelSequenceActor.StaticClass(),
							new UE.Transform(),
							void 0,
						)),
						(this.u$i = t),
						this.u$i.SetSequence(e),
						this.m$i &&
							((e =
								ControllerHolder_1.ControllerHolder.CameraController.SequenceCamera.DisplayComponent.CineCamera.GetTransform()),
							(this.u$i.bOverrideInstanceData = !0),
							(this.u$i.DefaultInstanceData.TransformOrigin = e)),
						(e = UE.NewArray(UE.Actor)),
						(i =
							ModelManager_1.ModelManager.CameraModel.SequenceCamera
								.DisplayComponent.CineCamera),
						e.Add(i),
						i.ResetSeqCineCamSetting(),
						this.u$i.SetBindingByTag(SequenceDefine_1.CAMERA_TAG, e, !1, !0),
						t.SequencePlayer.OnStop.Add(this.C$i),
						t.SequencePlayer.Play());
			}),
			(this.C$i = () => {
				this.Stop();
			});
	}
	Play(e, t) {
		this.sye && this.Stop(),
			(this.sye = !0),
			(this.m$i = t),
			(this.c$i = ResourceSystem_1.ResourceSystem.LoadAsync(
				e,
				UE.LevelSequence,
				this.d$i,
			));
	}
	Stop() {
		this.sye &&
			((this.sye = !1),
			this.c$i !== ResourceSystem_1.ResourceSystem.InvalidId &&
				(ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.c$i),
				(this.c$i = ResourceSystem_1.ResourceSystem.InvalidId)),
			this.u$i &&
				(this.u$i.SequencePlayer.OnStop.Clear(),
				this.u$i.SequencePlayer.Stop(),
				this.u$i.ResetBindings(),
				ActorSystem_1.ActorSystem.Put(this.u$i)),
			(this.u$i = void 0));
	}
}
class CameraCurvePlayer {
	constructor() {
		(this.g$i = void 0),
			(this.fDe = void 0),
			(this.f$i = Transform_1.Transform.Create()),
			(this.p$i = 0),
			(this.zzt = 0),
			(this.sye = !1);
	}
	Play(e) {
		this.sye && this.Stop(),
			(this.sye = !0),
			(this.g$i = PublicUtil_1.PublicUtil.CreateTransformFromConfig(
				e.Start.Pos,
				e.Start.Rot,
				Vector_1.Vector.OneVectorProxy,
			)),
			(this.fDe = PublicUtil_1.PublicUtil.CreateTransformFromConfig(
				e.End.Pos,
				e.End.Rot,
				Vector_1.Vector.OneVectorProxy,
			)),
			(this.p$i = e.Duration * TimeUtil_1.TimeUtil.InverseMillisecond),
			this.f$i.SetScale3D(Vector_1.Vector.OneVectorProxy),
			ControllerHolder_1.ControllerHolder.CameraController.SequenceCamera.DisplayComponent.CineCamera.K2_SetActorTransform(
				this.g$i.ToUeTransform(),
				!1,
				void 0,
				!0,
			);
	}
	Stop() {
		this.sye &&
			((this.zzt = 0),
			(this.p$i = 0),
			(this.g$i = void 0),
			(this.fDe = void 0),
			this.f$i.Reset(),
			(this.sye = !1));
	}
	OnTick(e) {
		var t, i, r;
		this.sye &&
			((t =
				ControllerHolder_1.ControllerHolder.CameraController.SequenceCamera
					.DisplayComponent.CineCamera),
			(this.zzt += e),
			this.zzt > this.p$i
				? (t.K2_SetActorTransform(this.fDe.ToUeTransform(), !1, void 0, !0),
					this.Stop())
				: ((e = this.zzt / this.p$i),
					(e = MathUtils_1.MathUtils.GetCubicValue(e)),
					(i = this.f$i.GetLocation()),
					(r = this.f$i.GetRotation()),
					Vector_1.Vector.Lerp(
						this.g$i.GetLocation(),
						this.fDe.GetLocation(),
						e,
						i,
					),
					Quat_1.Quat.Slerp(
						this.g$i.GetRotation(),
						this.fDe.GetRotation(),
						e,
						r,
					),
					t.K2_SetActorTransform(this.f$i.ToUeTransform(), !1, void 0, !0)));
	}
}
class CameraShakePlayer {
	constructor() {
		(this.v$i = ResourceSystem_1.ResourceSystem.InvalidId),
			(this.M$i = void 0),
			(this.sye = !1);
	}
	Play(e) {
		this.sye && this.Stop(),
			(this.sye = !0),
			(this.v$i = ResourceSystem_1.ResourceSystem.LoadAsync(
				e.CameraShakeBp + "_C",
				UE.Class,
				(e) => {
					(this.v$i = ResourceSystem_1.ResourceSystem.InvalidId),
						e?.IsValid() &&
							(this.M$i =
								Global_1.Global.CharacterCameraManager.StartMatineeCameraShake(
									e,
								));
				},
			));
	}
	Stop() {
		this.sye &&
			((this.sye = !1),
			this.v$i !== ResourceSystem_1.ResourceSystem.InvalidId &&
				(ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.v$i),
				(this.v$i = ResourceSystem_1.ResourceSystem.InvalidId)),
			this.M$i) &&
			(Global_1.Global.CharacterCameraManager.StopCameraShake(this.M$i),
			(this.M$i = void 0));
	}
}
class MovingShotManager {
	constructor() {
		(this.Gft = new CameraSequencePlayer()),
			(this.S$i = new CameraCurvePlayer()),
			(this.E$i = new CameraShakePlayer());
	}
	Play(e) {
		switch ((this.Stop(), e.Type)) {
			case IAction_1.EShowTalkCameraMotionType.Preset:
				var t = e;
				StringUtils_1.StringUtils.IsEmpty(t.Sequence) ||
					this.Gft.Play(t.Sequence, !0),
					t.CamShake && this.E$i.Play(t.CamShake),
					Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug(
							"Plot",
							27,
							"剧情预设运镜开始",
							["path", t.Sequence],
							["shake", t.CamShake?.CameraShakeBp],
						);
				break;
			case IAction_1.EShowTalkCameraMotionType.Tween:
				(t = e),
					this.S$i.Play(t),
					t.CamShake && this.E$i.Play(t.CamShake),
					Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug("Plot", 27, "剧情插值运镜开始", [
							"shake",
							t.CamShake?.CameraShakeBp,
						]);
		}
	}
	Stop() {
		this.Gft.Stop(), this.S$i.Stop(), this.E$i.Stop();
	}
	OnTick(e) {
		this.S$i.OnTick(e);
	}
}
exports.MovingShotManager = MovingShotManager;
