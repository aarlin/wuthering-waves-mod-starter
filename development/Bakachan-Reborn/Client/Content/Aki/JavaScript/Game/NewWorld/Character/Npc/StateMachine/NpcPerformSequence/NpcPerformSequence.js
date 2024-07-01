"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.NpcPerformSequence = void 0);
const UE = require("ue"),
	ActorSystem_1 = require("../../../../../../Core/Actor/ActorSystem"),
	Log_1 = require("../../../../../../Core/Common/Log"),
	ResourceSystem_1 = require("../../../../../../Core/Resource/ResourceSystem"),
	TimerSystem_1 = require("../../../../../../Core/Timer/TimerSystem"),
	CameraController_1 = require("../../../../../Camera/CameraController"),
	EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
	sequenceCameraTag = new UE.FName("SequenceCamera");
class NpcPerformSequence {
	constructor() {
		(this.Ver = ""),
			(this.FBi = void 0),
			(this.EPe = void 0),
			(this.ker = void 0),
			(this.BRo = void 0),
			(this.Fer = void 0),
			(this.xBn = () => {
				this.$ne(), this.PBn();
			}),
			(this.STo = () => {
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"NPC",
						8,
						"[CollectionItemDisplay]Npc表现Sequence播放完成",
						["SequenceName", this.EPe?.Sequence?.GetName()],
					),
					this.$ne();
			});
	}
	Destroy() {
		this.EPe?.IsValid() && this.EPe.IsPlaying()
			? (Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"NPC",
						8,
						"[CollectionItemDisplay]开始销毁Npc表现Sequence时，Sequence仍在播放，等播放完成后销毁",
					),
				this.EPe.OnFinished.Clear(),
				this.EPe.OnFinished.Add(this.xBn))
			: (Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"NPC",
						8,
						"[CollectionItemDisplay]开始销毁Npc表现Sequence",
					),
				this.PBn());
	}
	PBn() {
		if (
			(this.FBi &&
				(ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.FBi),
				(this.FBi = void 0)),
			this.EPe?.IsValid() &&
				(this.EPe.Stop(), this.EPe.OnFinished.Clear(), (this.EPe = void 0)),
			this.ker?.IsValid())
		) {
			const e = this.ker;
			TimerSystem_1.TimerSystem.Next(() => {
				ActorSystem_1.ActorSystem.Put(e);
			}),
				(this.ker = void 0);
		}
		(this.BRo = void 0),
			(this.Fer = void 0),
			CameraController_1.CameraController.ExitCameraMode(1, 0);
	}
	SetTransformOriginEntity(e) {
		(e = e.GetComponent(1).Owner), this.SetTransformOriginActor(e);
	}
	SetTransformOriginActor(e) {
		this.BRo &&
			((this.ker.bOverrideInstanceData = !0),
			(this.BRo.TransformOriginActor = e));
	}
	Load(e, t) {
		this.Ver === e && this.IsValid()
			? t && t()
			: ((this.Ver = e),
				(this.FBi = ResourceSystem_1.ResourceSystem.LoadAsync(
					this.Ver,
					UE.LevelSequence,
					(e) => {
						this.Her(e), t && t();
					},
				)));
	}
	Play(e) {
		var t;
		this.IsValid()
			? (this.IsPlaying() &&
					(Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"NPC",
							8,
							"[CollectionItemDisplay]尝试播放Npc表现Sequence时，Sequence正在播放中,停止后重新播放",
						),
					this.Iit()),
				(t =
					CameraController_1.CameraController.SequenceCamera.DisplayComponent
						.CineCamera).ResetSeqCineCamSetting(),
				this.AddBindingByTag(sequenceCameraTag, t),
				CameraController_1.CameraController.EnterCameraMode(1, 0),
				this.jer(e),
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.OnPlayNpcPerformSequence,
				))
			: Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"NPC",
					8,
					"[CollectionItemDisplay]尝试播放Npc表现Sequence时，LevelSequencePlayer为空或不可用",
				);
	}
	AddBindingByTag(e, t) {
		this.ker.AddBindingByTag(e, t, !1, !0);
	}
	Her(e) {
		(this.ker = ActorSystem_1.ActorSystem.Get(
			UE.LevelSequenceActor.StaticClass(),
			new UE.Transform(),
			void 0,
			!1,
		)),
			this.ker.SetSequence(e),
			(this.EPe = this.ker.SequencePlayer),
			(this.BRo = this.ker.DefaultInstanceData);
	}
	jer(e) {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info(
				"NPC",
				8,
				"[CollectionItemDisplay]开始播放Npc表现Sequence",
				["SequenceName", this.EPe?.Sequence?.GetName()],
			),
			(this.Fer = e),
			this.EPe.OnFinished.Add(this.STo),
			this.EPe.Play();
	}
	Stop() {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("NPC", 8, "[CollectionItemDisplay]Npc表现Sequence被停止"),
			this.Iit();
	}
	Iit() {
		CameraController_1.CameraController.ExitCameraMode(1, 0),
			this.EPe?.IsValid() && this.EPe.Stop();
	}
	Pause() {
		this.EPe?.IsValid() && this.EPe.Pause();
	}
	Continue() {
		this.EPe?.IsValid() && this.EPe.Play();
	}
	IsPlaying() {
		return !!this.EPe?.IsValid() && this.EPe.IsPlaying();
	}
	IsValid() {
		return this.EPe?.IsValid() ?? !1;
	}
	$ne() {
		CameraController_1.CameraController.ExitCameraMode(1, 0),
			this.Fer && this.Fer(),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnNpcPerformSequenceFinished,
			);
	}
}
exports.NpcPerformSequence = NpcPerformSequence;
