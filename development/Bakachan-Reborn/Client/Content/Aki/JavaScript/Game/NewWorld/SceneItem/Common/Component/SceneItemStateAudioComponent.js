"use strict";
var SceneItemStateAudioComponent_1,
	__decorate =
		(this && this.__decorate) ||
		function (t, e, n, o) {
			var i,
				s = arguments.length,
				a =
					s < 3
						? e
						: null === o
							? (o = Object.getOwnPropertyDescriptor(e, n))
							: o;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
				a = Reflect.decorate(t, e, n, o);
			else
				for (var r = t.length - 1; 0 <= r; r--)
					(i = t[r]) &&
						(a = (s < 3 ? i(a) : 3 < s ? i(e, n, a) : i(e, n)) || a);
			return 3 < s && a && Object.defineProperty(e, n, a), a;
		};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SceneItemStateAudioComponent = void 0);
const UE = require("ue"),
	AudioController_1 = require("../../../../../Core/Audio/AudioController"),
	AudioModel_1 = require("../../../../../Core/Audio/AudioModel"),
	AudioSystem_1 = require("../../../../../Core/Audio/AudioSystem"),
	Log_1 = require("../../../../../Core/Common/Log"),
	EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
	RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
	GameplayTagUtils_1 = require("../../../../../Core/Utils/GameplayTagUtils"),
	Rotator_1 = require("../../../../../Core/Utils/Math/Rotator"),
	Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
	IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	AudioUtils_1 = require("../../../../Utils/AudioUtils");
let SceneItemStateAudioComponent =
	(SceneItemStateAudioComponent_1 = class extends (
		EntityComponent_1.EntityComponent
	) {
		constructor() {
			super(...arguments),
				(this.SIe = void 0),
				(this.Ben = void 0),
				(this.lsn = void 0),
				(this.Hen = void 0),
				(this.i_n = !1),
				(this.o_n = void 0),
				(this.r_n = IComponent_1.EAudioRangeType.AOI),
				(this.n_n = void 0),
				(this.s_n = void 0),
				(this.a_n = void 0),
				(this.h_n = void 0),
				(this.l_n = void 0),
				(this.__n = void 0),
				(this.u_n = void 0),
				(this.c_n = 0),
				(this.m_n = 0),
				(this.d_n = (t) => {
					if (!this.i_n && t) {
						var e = this.s_n.get(this.c_n);
						e && this.C_n(e, 0);
					} else if (this.i_n && !t) {
						let t = !1;
						(e = this.s_n.get(this.c_n)) && ((t = !0), this.C_n(e, 1)),
							this.n_n.Type !== IComponent_1.EAkEventType.Box ||
								t ||
								this.C_n(void 0, 1),
							(e = this.h_n.get(this.c_n)) && this.g_n(e);
					}
					this.i_n = t;
				}),
				(this.Rni = (t, e) => {
					if (this.c_n !== t) {
						var n = this.s_n.get(t),
							o = this.h_n.get(this.c_n);
						if ((o && this.g_n(o), (this.c_n = t), n))
							switch (this.r_n) {
								case IComponent_1.EAudioRangeType.AOI:
									this.C_n(n, 2);
									break;
								case IComponent_1.EAudioRangeType.RangeComp:
								case IComponent_1.EAudioRangeType.SceneActorRefComp:
									this.i_n && this.C_n(n, 2);
							}
					}
				}),
				(this.f_n = (t, e) => {
					if (
						(Log_1.Log.CheckDebug() &&
							Log_1.Log.Debug(
								"Audio",
								40,
								"[StateAudioComp] [疑难杂症] AkEvent回调",
								["PbDataId", this.SIe?.GetPbDataId()],
								["CallbackType", t],
							),
						2 === t && ((t = e), t?.Label))
					) {
						let n;
						Log_1.Log.CheckDebug() &&
							Log_1.Log.Debug(
								"Audio",
								40,
								"[StateAudioComp] [疑难杂症] 解析AkEvent回调",
								["PbDataId", this.SIe?.GetPbDataId()],
								["Label", t.Label],
							);
						try {
							n = JSON.parse(t.Label);
						} catch (e) {
							return void (
								Log_1.Log.CheckDebug() &&
								Log_1.Log.Debug(
									"Audio",
									40,
									"[StateAudioComp] [疑难杂症] AkEvent回调解析失败",
									["PbDataId", this.SIe?.GetPbDataId()],
									["Label", t.Label],
								)
							);
						}
						"SoundTrackingEffectNotify" === n?.MarkerType &&
							"Start" === n.Action &&
							EventSystem_1.EventSystem.EmitWithTarget(
								this.Entity,
								EventDefine_1.EEventName.PlaySoundTrackEffect,
								n.Length,
							);
					}
				});
		}
		static get Dependencies() {
			return [182, 0];
		}
		OnInitData(t) {
			t = t.GetParam(SceneItemStateAudioComponent_1)[0];
			return (
				(this.o_n = t),
				(this.SIe = this.Entity.GetComponent(0)),
				(this.r_n = this.o_n.AudioRangeType),
				(this.n_n = this.o_n.AkEventType),
				!(!this.r_n || !this.n_n) ||
					((t = this.SIe.GetPbDataId()),
					Log_1.Log.CheckError() &&
						Log_1.Log.Error("Entity", 40, "组件配置参数缺失", ["entityId", t]),
					!1)
			);
		}
		OnStart() {
			var t;
			if (((this.Ben = this.Entity.GetComponent(117)), !this.Ben))
				return (
					(t = this.SIe.GetPbDataId()),
					Log_1.Log.CheckError() &&
						Log_1.Log.Error("Entity", 40, "StateComponent不存在", [
							"entityId",
							t,
						]),
					!1
				);
			switch (
				((this.c_n = this.Ben.StateTagId),
				this.n_n.Type === IComponent_1.EAkEventType.Box && this.p_n(this.n_n),
				this.v_n(),
				this.r_n)
			) {
				case IComponent_1.EAudioRangeType.RangeComp:
					if (((this.lsn = this.Entity.GetComponent(74)), !this.lsn))
						return (
							Log_1.Log.CheckError() &&
								Log_1.Log.Error(
									"Entity",
									40,
									"SceneItemReferenceComponent不存在",
									["entityConfigId", this.SIe.GetPbDataId()],
								),
							!1
						);
					this.lsn.AddOnPlayerOverlapCallback(this.d_n);
					break;
				case IComponent_1.EAudioRangeType.AOI:
					this.M_n(!0);
					break;
				case IComponent_1.EAudioRangeType.SceneActorRefComp:
					if (((this.Hen = this.Entity.GetComponent(147)), !this.Hen))
						return (
							Log_1.Log.CheckError() &&
								Log_1.Log.Error(
									"Entity",
									40,
									"SceneItemReferenceComponent不存在",
									["entityConfigId", this.SIe.GetPbDataId()],
								),
							!1
						);
					this.Hen.AddOnPlayerOverlapCallback(this.d_n);
			}
			return (
				EventSystem_1.EventSystem.AddWithTarget(
					this.Entity,
					EventDefine_1.EEventName.OnSceneItemStateChange,
					this.Rni,
				),
				!0
			);
		}
		OnEnd() {
			switch (
				(EventSystem_1.EventSystem.HasWithTarget(
					this.Entity,
					EventDefine_1.EEventName.OnSceneItemStateChange,
					this.Rni,
				) &&
					EventSystem_1.EventSystem.RemoveWithTarget(
						this.Entity,
						EventDefine_1.EEventName.OnSceneItemStateChange,
						this.Rni,
					),
				this.r_n)
			) {
				case IComponent_1.EAudioRangeType.RangeComp:
					this.lsn &&
						(this.lsn.RemoveOnPlayerOverlapCallback(this.d_n),
						(this.lsn = void 0)),
						this.i_n && this.d_n(!1);
					break;
				case IComponent_1.EAudioRangeType.AOI:
					this.Ben && this.M_n(!1);
					break;
				case IComponent_1.EAudioRangeType.SceneActorRefComp:
					this.Hen &&
						(this.Hen.RemoveOnPlayerOverlapCallback(this.d_n),
						(this.Hen = void 0)),
						this.i_n && this.d_n(!1);
			}
			return !0;
		}
		OnClear() {
			return !0;
		}
		v_n() {
			(this.s_n = new Map()), (this.a_n = new Map()), (this.h_n = new Map());
			for (const e of this.o_n.Config ?? []) {
				var t = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e.State);
				t &&
					(e.AkEvent && this.s_n.set(t, e.AkEvent),
					e.LeaveAkEvent && this.a_n.set(t, e.LeaveAkEvent),
					e.AudioFade) &&
					this.h_n.set(t, e.AudioFade);
			}
		}
		S_n() {
			var t;
			this.l_n?.IsValid() ||
				((t = this.Entity?.GetComponent(182)?.Owner)?.IsValid()
					? (this.l_n = t.AddComponentByClass(
							UE.AkComponent.StaticClass(),
							!1,
							MathUtils_1.MathUtils.DefaultTransform,
							!1,
						))
					: (this.l_n = void 0));
		}
		C_n(t, e) {
			if (this.n_n.Type === IComponent_1.EAkEventType.Point)
				this.n_n.PointIds?.length ? this.E_n(t) : this.y_n(t);
			else if (this.n_n.Type === IComponent_1.EAkEventType.Box) {
				switch (e) {
					case 0:
					case 2:
						this.u_n = t;
						break;
					case 1:
						this.u_n = void 0;
				}
				AudioUtils_1.AudioUtils.HandleAudioBoxUpdate(this.__n, e);
			} else
				this.n_n.Type === IComponent_1.EAkEventType.Default &&
					t &&
					this.I_n(t, e);
		}
		I_n(t, e) {
			var n;
			this.n_n.Type === IComponent_1.EAkEventType.Default && t
				? (n = this.Entity?.GetComponent(182)?.Owner)?.IsValid()
					? ((t = (0, AudioSystem_1.parseAudioEventPath)(t)),
						(this.m_n = AudioSystem_1.AudioSystem.PostEvent(t, n)))
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"SceneItem",
							7,
							"[PostDefaultAkEvent]未能获取到该实体对应的有效Actor",
							["PbDataId", this.SIe?.GetPbDataId()],
						)
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error("SceneItem", 7, "[PostDefaultAkEvent]Path为空", [
						"PbDataId",
						this.SIe?.GetPbDataId(),
					]);
		}
		y_n(t) {
			var e = this.n_n;
			this.n_n.Type !== IComponent_1.EAkEventType.Point ||
				e.PointIds?.length ||
				((e = this.Entity?.GetComponent(182)?.Owner)?.IsValid() &&
					((t = (0, AudioSystem_1.parseAudioEventPath)(t)),
					(this.m_n = AudioSystem_1.AudioSystem.PostEvent(t, e, {
						StopWhenOwnerDestroyed: !0,
						CallbackMask: 4,
						CallbackHandler: this.f_n,
					}))));
		}
		E_n(t) {
			var e = this.n_n;
			if (
				this.n_n.Type === IComponent_1.EAkEventType.Point &&
				e.PointIds?.length
			) {
				if (!this.l_n?.IsValid() && (this.S_n(), !this.l_n?.IsValid()))
					return (
						(a = this.SIe.GetPbDataId()),
						void (
							Log_1.Log.CheckError() &&
							Log_1.Log.Error("Entity", 40, "AkComponent创建失败", [
								"entityId",
								a,
							])
						)
					);
				var n = UE.NewArray(UE.Transform);
				for (const t of e.PointIds) {
					let e;
					if (
						(s =
							ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(t))
					)
						e =
							s.Entity.GetComponent(1)?.ActorTransform ??
							s.Entity.GetComponent(0)?.GetTransform();
					else {
						if (
							!(s = ModelManager_1.ModelManager.CreatureModel.GetEntityData(t))
						)
							return void (
								Log_1.Log.CheckError() &&
								Log_1.Log.Error("Audio", 40, "多点音源位置实体不存在", [
									"entityId",
									t,
								])
							);
						var o, i, s;
						(s = s.Transform) &&
							((o = Vector_1.Vector.Create(
								s.Pos?.X ?? 0,
								s.Pos?.Y ?? 0,
								s.Pos?.Z ?? 0,
							)),
							(i = Rotator_1.Rotator.Create(
								s.Rot?.X ?? 0,
								s.Rot?.Y ?? 0,
								s.Rot?.Z ?? 0,
							)),
							(s = Vector_1.Vector.Create(
								s.Scale?.X ?? 0,
								s.Scale?.Y ?? 0,
								s.Scale?.Z ?? 0,
							)),
							(e = new UE.Transform(
								i.ToUeRotator(),
								o.ToUeVector(),
								s.ToUeVector(),
							)));
					}
					if (!e?.IsValid())
						return void (
							Log_1.Log.CheckDebug() &&
							Log_1.Log.Debug(
								"Audio",
								34,
								"未能获取到多点音源位置实体的有效Transform",
								["entityId", t],
							)
						);
					n.Add(e);
				}
				this.l_n.SetStopWhenOwnerDestroyed(!0),
					AudioController_1.AudioController.SetMultiplePositions(this.l_n, n);
				var a = (0, AudioSystem_1.parseAudioEventPath)(t);
				this.m_n = AudioSystem_1.AudioSystem.PostEvent(a, this.l_n);
			}
		}
		M_n(t) {
			if (t) (t = this.s_n.get(this.c_n)) && this.C_n(t, 0);
			else {
				let e = !1;
				(t = this.s_n.get(this.c_n)) && ((e = !0), this.C_n(t, 1)),
					this.n_n.Type !== IComponent_1.EAkEventType.Box ||
						e ||
						this.C_n(void 0, 1),
					(t = this.h_n.get(this.c_n)) && this.g_n(t);
			}
		}
		g_n(t) {
			var e;
			this.m_n &&
				t.FadeCurve &&
				t.FadeDuration &&
				((e = t.FadeCurve),
				AudioSystem_1.AudioSystem.ExecuteAction(this.m_n, 0, {
					TransitionDuration: t.FadeDuration,
					TransitionFadeCurve: e,
				}));
		}
		p_n(t) {
			var e = t.Priority;
			let n;
			var o = this.SIe?.GetPbDataId();
			switch (t.AudioType) {
				case IComponent_1.EAudioType.AudioAMB:
					n = "AudioAMB";
					break;
				case IComponent_1.EAudioType.AudioBGM:
					n = "AudioBGM";
			}
			n
				? (this.__n = new AudioModel_1.AudioBox(e, o, n))
				: Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn(
						"Entity",
						7,
						"[AudioBox]音频盒子类型未配置，请检查对应实体配置",
						["EntityConfigId", this.SIe?.GetPbDataId()],
					);
		}
		PostAudioBoxEvent() {
			this.u_n
				? (Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug(
							"Audio",
							40,
							"[AudioBox] 播放音频盒子",
							["PbDataId", this.SIe?.GetPbDataId()],
							["AkEventPath", this.u_n],
						),
					AudioController_1.AudioController.PostEvent(
						this.u_n,
						void 0,
						void 0,
						void 0,
						void 0,
						void 0,
						!0,
					))
				: Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug(
						"Audio",
						40,
						"[AudioBox] 播放音频盒子失败, 缺少对应的AkEventPath配置",
						["PbDataId", this.SIe?.GetPbDataId()],
					);
		}
	});
(SceneItemStateAudioComponent = SceneItemStateAudioComponent_1 =
	__decorate(
		[(0, RegisterComponent_1.RegisterComponent)(116)],
		SceneItemStateAudioComponent,
	)),
	(exports.SceneItemStateAudioComponent = SceneItemStateAudioComponent);
