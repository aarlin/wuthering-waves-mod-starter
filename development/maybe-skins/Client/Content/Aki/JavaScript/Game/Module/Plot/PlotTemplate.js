"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PlotTemplate = void 0);
const UE = require("ue"),
	CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
	Log_1 = require("../../../Core/Common/Log"),
	Time_1 = require("../../../Core/Common/Time"),
	CommonDefine_1 = require("../../../Core/Define/CommonDefine"),
	PlotAudioById_1 = require("../../../Core/Define/ConfigQuery/PlotAudioById"),
	QueryTypeDefine_1 = require("../../../Core/Define/QueryTypeDefine"),
	EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
	RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent"),
	ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
	TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
	MathCommon_1 = require("../../../Core/Utils/Math/MathCommon"),
	Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
	Transform_1 = require("../../../Core/Utils/Math/Transform"),
	Vector_1 = require("../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	ObjectUtils_1 = require("../../../Core/Utils/ObjectUtils"),
	StringUtils_1 = require("../../../Core/Utils/StringUtils"),
	TraceElementCommon_1 = require("../../../Core/Utils/TraceElementCommon"),
	IAction_1 = require("../../../UniverseEditor/Interface/IAction"),
	AiContollerLibrary_1 = require("../../AI/Controller/AiContollerLibrary"),
	CameraController_1 = require("../../Camera/CameraController"),
	TimeUtil_1 = require("../../Common/TimeUtil"),
	GlobalData_1 = require("../../GlobalData"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	CharacterNameDefines_1 = require("../../NewWorld/Character/Common/CharacterNameDefines"),
	NpcFacialExpressionController_1 = require("../../NewWorld/Character/Npc/Logics/NpcFacialExpressionController"),
	WaitEntityTask_1 = require("../../World/Define/WaitEntityTask"),
	TeleportController_1 = require("../Teleport/TeleportController"),
	MovingShotManager_1 = require("./MovingShotManager"),
	PlotAudioModel_1 = require("./PlotAudioModel"),
	SequenceDefine_1 = require("./Sequence/SequenceDefine"),
	PLAYER_UNUSED_INDEX = -1,
	PLAYER_USED_ID = -1,
	ACTOR_EMPTY_INDEX = -1,
	FIX_TELEPORT_TRACE_DOWN = -1e3,
	PROFILE_KEY = "PlotTemplate_GroundCheckModify",
	ACTOR_NUM_MAX = 10,
	WAIT_ENTITY_TIME = 3e4,
	DITHER_RATE_PER_SECOND = 0.33,
	WAIT_TURING_TIME = 1500,
	BEGIN_WAIT_TIME = 800,
	CAMERA_FILMBACK_SENSOR_WIDTH = 23.76,
	CAMERA_FILMBACK_SENSOR_HEIGHT = 13.365,
	MONTAGE_BLEND_OUT_TIME = 0.5,
	DEFAULT_CAMERA_BASE = 140.19,
	DEFAULT_CAMERA_BASE_HEAD = 135.96,
	MAX_POS_DIST_SQ = 1e6;
class ActorData {
	constructor() {
		(this.Valid = !1),
			(this.PbDataId = 0),
			(this.EntityId = 0),
			(this.TalkerId = 0),
			(this.Pos = { X: 0, Y: 0, Z: 0, A: 0 }),
			(this.Visible = !1),
			(this.MontageLooping = !1),
			(this.MontageKeeping = !1),
			(this.BodyMontage = void 0),
			(this.BodyMontagePath = void 0),
			(this.OverlayMontageLooping = !1),
			(this.OverlayMontageKeeping = !1),
			(this.OverlayMontage = void 0),
			(this.OverlayMontagePath = void 0),
			(this.FaceMontage = void 0),
			(this.MouseMontageLoadingId = ResourceSystem_1.ResourceSystem.InvalidId),
			(this.FaceChangeManager = void 0),
			(this.OriginPos = { X: 0, Y: 0, Z: 0, A: 0 }),
			(this.IsPosReset = !1),
			(this.OriginEnableLookAt = !1),
			(this.OriginEnableAi = !1),
			(this.OriginMoveSync = !1),
			(this.OriginMoveMode = void 0),
			(this.TurningTimer = void 0),
			(this.LookLocked = !1),
			(this.ResetFacialExpressionCallback = (e, t) => {
				(e?.IsValid() && e !== this.BodyMontage) ||
					this.FaceChangeManager?.ResetFacialExpression();
			});
	}
	Reset() {
		(this.Valid = !1),
			(this.PbDataId = 0),
			(this.EntityId = 0),
			(this.TalkerId = 0),
			(this.Visible = !0),
			(this.MontageLooping = !1),
			(this.MontageKeeping = !1),
			(this.BodyMontage = void 0),
			(this.BodyMontagePath = void 0),
			(this.FaceMontage = void 0),
			(this.MouseMontageLoadingId = ResourceSystem_1.ResourceSystem.InvalidId),
			(this.OverlayMontageLooping = !1),
			(this.OverlayMontageKeeping = !1),
			(this.OverlayMontage = void 0),
			(this.OverlayMontagePath = void 0),
			(this.FaceChangeManager = void 0),
			(this.Pos.X = 0),
			(this.Pos.Y = 0),
			(this.Pos.Z = 0),
			(this.Pos.A = 0),
			(this.OriginPos.X = 0),
			(this.OriginPos.Y = 0),
			(this.OriginPos.Z = 0),
			(this.OriginPos.A = 0),
			(this.IsPosReset = !1),
			(this.OriginEnableLookAt = !1),
			(this.OriginEnableAi = !1),
			(this.OriginMoveSync = !1),
			(this.OriginMoveMode = void 0),
			(this.TurningTimer = void 0),
			(this.LookLocked = !1);
	}
	IsPlayer() {
		return -1 === this.PbDataId;
	}
}
class ShowActorParam {
	constructor() {
		(this.Visible = !1), (this.UseEffect = !1);
	}
}
class DelayActionManager {
	constructor() {
		(this.FVs = new Set()), (this.VVs = new Map());
	}
	DelayAction(e, t, i, o) {
		if (o)
			(o = TimerSystem_1.TimerSystem.Delay(() => {
				var t = this.VVs.get(e)[1];
				this.VVs.delete(e), t();
			}, t)),
				this.VVs.has(e) && this.VVs.get(e)[0].Remove(),
				this.VVs.set(e, [o, i]);
		else {
			const e = TimerSystem_1.TimerSystem.Delay(() => {
				this.FVs.delete(e), i();
			}, t);
			this.FVs.add(e);
		}
	}
	CleanAction(e = 0) {
		this.FVs.forEach((e) => e.Remove()),
			this.FVs.clear(),
			this.VVs.forEach((e) => {
				var t = e[0];
				e = e[1];
				t.Remove(), e();
			}),
			this.VVs.clear();
	}
}
class PlotTemplate {
	constructor() {
		(this.rYi = void 0),
			(this.nx = void 0),
			(this.nYi = !1),
			(this.sYi = Transform_1.Transform.Create()),
			(this.aYi = 0),
			(this.hYi = void 0),
			(this.lYi = new Map()),
			(this.tYi = new Map()),
			(this._Yi = new Set()),
			(this.uYi = new Set()),
			(this.cYi = new ShowActorParam()),
			(this.mYi = -1),
			(this.dYi = ""),
			(this.CYi = void 0),
			(this.gYi = -1),
			(this.vYi = 0),
			(this.uoe = void 0),
			(this.SYi = new RegExp(/(?<=station)\d/)),
			(this.EYi = new RegExp(/_CU|_MS|_FS|_RFS/)),
			(this.yYi = !1),
			(this.IYi = 0),
			(this.TYi = 0),
			(this.LYi = !1),
			(this.DYi = !1),
			(this.Vqn = -1),
			(this.Hqn = void 0),
			(this.xYt = void 0),
			(this.t4s = 0),
			(this.RYi = new MovingShotManager_1.MovingShotManager()),
			(this.HVs = new DelayActionManager());
	}
	get IsInTemplate() {
		return this.nYi;
	}
	get UYi() {
		if (!this.hYi) {
			this.hYi = new Array();
			for (let t = 0; t < 10; t++) {
				var e = new ActorData();
				this.hYi.push(e);
			}
		}
		return this.hYi;
	}
	get MinWaitingTime() {
		return this.IsInTemplate ? TimeUtil_1.TimeUtil.SetTimeSecond(this.IYi) : 0;
	}
	StartTemplateNew(e, t, i) {
		(this.nYi = !0),
			(this.yYi = e.UseFreeCamera),
			(this.IYi = 0),
			(this.nx = t),
			(this.DYi = !0),
			(this.LYi = !0);
		var o = new Array();
		for (const t of e.Actors) o.push(t.EntityId);
		this.AYi(o, () => {
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("Plot", 27, "等待模板演出实体完成"),
				this.yYi ||
					(ModelManager_1.ModelManager.CameraModel.SequenceCamera.DisplayComponent.CineCamera.ResetSeqCineCamSetting(),
					ModelManager_1.ModelManager.PlotModel.SwitchCameraMode(3),
					(this.TYi = UE.KismetSystemLibrary.GetConsoleVariableFloatValue(
						"r.MotionBlur.Amount",
					)),
					UE.KismetSystemLibrary.ExecuteConsoleCommand(
						GlobalData_1.GlobalData.World,
						"r.MotionBlur.Amount 0",
					)),
				this.PYi(e.Actors),
				(this.CYi = new Array()),
				this.yYi &&
					this.UYi.forEach((e, t) => {
						e.Valid && this.CYi.push({ Index: t });
					}),
				this.xYi(e.Actors, i);
		});
	}
	PYi(e) {
		this.lYi.clear();
		for (let s = 0; s < 10; s++) {
			var t,
				i,
				o,
				a,
				n,
				r = this.UYi[s];
			r.Reset(),
				s >= e.length ||
					((t =
						s === this.gYi
							? ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity
							: ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
									e[s].EntityId,
								)),
					this.v5s(t)
						? (i = t.Entity.GetComponent(3))
							? (ModelManager_1.ModelManager.WorldModel.AddIgnore(i.Actor),
								i.ClearInput(),
								(o = t.Entity.GetComponent(33))?.Valid &&
									o.StopAllSkills("PlotTemplate.ControlActor"),
								(o = t.Entity.GetComponent(36))?.Valid &&
									(o.CharacterMovement &&
										(o.CharacterMovement.Velocity = Vector_1.Vector.ZeroVector),
									i.ResetCachedVelocityTime()),
								(a = t.Entity.GetComponent(160))?.Valid &&
									a.SetSightTargetItem(void 0),
								(n = t.Entity.GetComponent(57))?.Valid &&
									((r.OriginMoveSync = n.GetEnableMovementSync()),
									r.OriginMoveSync) &&
									n.SetEnableMovementSync(!1),
								(r.Valid = !0),
								(r.EntityId = t.Id),
								(r.PbDataId = e[s].EntityId),
								(r.TalkerId = e[s].TalkerId),
								(r.OriginPos.X = i.ActorLocationProxy.X),
								(r.OriginPos.Y = i.ActorLocationProxy.Y),
								(r.OriginPos.Z = i.ActorLocationProxy.Z),
								(r.OriginPos.A = i.ActorRotationProxy.Yaw),
								Object.assign(r.Pos, r.OriginPos),
								(r.IsPosReset = e[s].IsResetPosition),
								(r.OriginEnableLookAt = !1),
								(r.Visible = !0),
								(r.OriginMoveMode = o.CharacterMovement.MovementMode),
								r.IsPlayer() ||
									(r.FaceChangeManager =
										new NpcFacialExpressionController_1.NpcFacialExpressionController(
											t.Id,
										)),
								-1 !== r.TalkerId
									? (this.lYi.has(r.TalkerId) &&
											Log_1.Log.CheckWarn() &&
											Log_1.Log.Warn(
												"Plot",
												27,
												"重复的对话人，请策划检查配置",
											),
										this.lYi.set(r.TalkerId, r))
									: Log_1.Log.CheckWarn() &&
										Log_1.Log.Warn(
											"Plot",
											27,
											"未配置说话人，口型和自动看向功能不生效",
											["演员位", s],
										),
								s === this.gYi
									? (i.Entity.GetComponent(69).HideWeapon(-1, !0, !1),
										i.Actor.CharRenderingComponent?.ResetAllRenderingState())
									: ((n = t.Entity.GetComponent(168))?.Valid &&
											((r.OriginEnableLookAt = n.OpenLookAt),
											n.SetLookAtPlayerEnabled(!1),
											n.OnNpcInPlot(!0)),
										(n = t.Entity?.GetComponent(38))?.Valid &&
											((r.OriginEnableAi = n.IsAiDriver && n.IsEnabled()),
											r.OriginEnableAi) &&
											n.DisableAi("Plot Control Ai"),
										o.CharacterMovement.SetMovementMode(1),
										a.SetBlendSpaceLookAt(!0)),
								Log_1.Log.CheckDebug() &&
									Log_1.Log.Debug(
										"Plot",
										27,
										"演员信息",
										["index", s],
										["actor", i.Actor.GetName()],
										["entityId", r.EntityId],
										[
											"pbDataId",
											-1 === r.PbDataId
												? i.CreatureData.GetPbDataId()
												: r.PbDataId,
										],
									))
							: Log_1.Log.CheckWarn() &&
								Log_1.Log.Warn("Plot", 27, "实体类型错误", [
									"PbDataId",
									e[s].EntityId,
								])
						: Log_1.Log.CheckWarn() &&
							Log_1.Log.Warn("Plot", 27, "模板演出拿不到演员", [
								"PbDataId",
								e[s].EntityId,
							]));
		}
	}
	v5s(e) {
		return (
			!!e?.Valid &&
			!(
				!e?.IsInit ||
				!e?.Entity?.Active ||
				!(e = e.Entity.GetComponent(0)) ||
				e.GetRemoveState()
			)
		);
	}
	xYi(e, t) {
		this.nx.IsBackground && t();
		var i = new Array();
		for (let t = 0; t < e.length; t++) {
			var o,
				a,
				n = e[t],
				r = this.UYi[t];
			r.Valid
				? ((o = n.InitialState?.InitialMontage) &&
						((a = r.IsPlayer()
							? this.wYi(o.MontageId.MontageId)
							: o.MontageId.MontageId),
						(o = o.MontageId.IsAbp
							? ModelManager_1.ModelManager.PlotModel.GetAbpMontageConfig(a)
							: ModelManager_1.ModelManager.PlotModel.GetMontageConfig(a))
							? i.push(this.BYi(r, o.ActionMontage))
							: ControllerHolder_1.ControllerHolder.FlowController.LogError(
									"初始化演员蒙太奇时找不到资源",
									["id", a],
								)),
					(o = n.InitialState?.InitialLookAt) &&
						((a = EntitySystem_1.EntitySystem.Get(r.EntityId).GetComponent(
							160,
						)),
						this.bYi(a, o, r)))
				: Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn("Plot", 27, "初始化演员失败", [
						"EntityId",
						n.EntityId,
					]);
		}
		const s = new CustomPromise_1.CustomPromise();
		i.push(s.Promise),
			TimerSystem_1.TimerSystem.Delay(() => {
				s.SetResult();
			}, 800),
			Promise.all(i).finally(t);
	}
	async BYi(e, t) {
		const i = new CustomPromise_1.CustomPromise();
		return (
			this.qYi(t, (t) => {
				var o;
				ObjectUtils_1.ObjectUtils.IsValid(t) &&
					((o = EntitySystem_1.EntitySystem.Get(e.EntityId).GetComponent(
						160,
					).MainAnimInstance).Montage_IsPlaying(t) || o.Montage_Play(t),
					o.Montage_SetNextSection(
						CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION,
						CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION,
						t,
					),
					o.Montage_JumpToSection(
						CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION,
						t,
					),
					(e.BodyMontage = t),
					(e.MontageLooping = !0),
					(e.MontageKeeping = !0)),
					i.SetResult();
			}),
			i.Promise
		);
	}
	async SetTemplateNew(e) {
		if (!this.yYi && e && this.IsInTemplate) {
			var t, i;
			this.GYi(e.TemplateMode.CameraId),
				e.TargetPos &&
					(this.NYi(e.TargetPos),
					(i = Vector_1.Vector.Create(
						e.TargetPos.X,
						e.TargetPos.Y,
						e.TargetPos.Z,
					)),
					(t = Rotator_1.Rotator.Create(0, e.TargetPos.A, 0)),
					this.sYi.SetRotation(t.Quaternion()),
					this.sYi.SetLocation(i),
					this.sYi.SetScale3D(Vector_1.Vector.OneVectorProxy),
					(this.aYi = e.TargetPos.A));
			let o = !1;
			e.ActorIndexArray && ((o = !0), (this.CYi = e.ActorIndexArray)),
				this.CYi
					? ((t = e.CameraPosAndRot
							? Transform_1.Transform.Create(
									Rotator_1.Rotator.Create(
										e.CameraPosAndRot.CameraRotate.Y,
										e.CameraPosAndRot.CameraRotate.Z,
										e.CameraPosAndRot.CameraRotate.X,
									).Quaternion(),
									Vector_1.Vector.Create(
										e.CameraPosAndRot.CameraOffset.X,
										e.CameraPosAndRot.CameraOffset.Y,
										e.CameraPosAndRot.CameraOffset.Z,
									),
									Vector_1.Vector.OneVectorProxy,
								)
							: void 0),
						(i = this.OYi(o)),
						this.kYi(),
						this.FYi(t),
						this.PlayCameraAnimCompatible(e.CameraAnim),
						await i)
					: ControllerHolder_1.ControllerHolder.FlowController.LogError(
							"没有演员列表啊，前面也没有",
						);
		}
	}
	GYi(e) {
		var t;
		(this.rYi = ModelManager_1.ModelManager.PlotModel.GetPlotTemplateConfig(e)),
			this.rYi
				? (Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug("Plot", 27, "演出模板", [
							"TemplateName",
							this.rYi.Name,
						]),
					(t = this.SYi.exec(this.rYi.Name)),
					(this.mYi = null !== t && 0 < t.length ? parseInt(t[0]) - 1 : -1),
					(t = this.EYi.exec(this.rYi.Name)),
					(this.dYi = null !== t && 0 < t.length ? t[0] : "UNDEFINED"))
				: ControllerHolder_1.ControllerHolder.FlowController.LogError(
						"C级演出模板配置读取失败",
						["Id", e],
					);
	}
	async OYi(e) {
		let t;
		var i = this.rYi.ActorDataArray,
			o = Vector_1.Vector.Create(0, 0, 0),
			a = Vector_1.Vector.Create(0, 0, 0),
			n = new UE.Vector(0, 0, 0),
			r = new UE.Rotator(0, 0, 0),
			s = ((this.vYi = 0), Time_1.Time.Frame);
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug("Plot", 27, "剧情切镜飘带处理 -关闭", ["frame", s]),
			UE.KismetSystemLibrary.ExecuteConsoleCommand(
				GlobalData_1.GlobalData.World,
				"r.Kuro.DisableKawaiiSimulate 1",
			);
		for (
			let s = 0;
			s < i.length && !(s >= this.CYi.length || s >= this.UYi.length);
			s++
		) {
			var l = this.CYi[s];
			if (!(-1 === l.Index || l.Index >= this.UYi.length)) {
				var g = this.UYi[l.Index];
				if (g.Valid)
					if (g.Valid) {
						var h = EntitySystem_1.EntitySystem.Get(g.EntityId)?.GetComponent(
							3,
						);
						if (h) {
							e && l.Offset
								? (this.NYi(l.Offset),
									(n.X = l.Offset.X),
									(n.Y = l.Offset.Y),
									(n.Z = l.Offset.Z),
									(r.Yaw = ((l.Offset.A + 180) % 360) - 180),
									a.FromUeVector(n))
								: ((m = i[s]),
									o.Set(m.X, m.Y, 0),
									this.sYi.TransformPosition(o, a),
									n.Set(a.X, a.Y, a.Z),
									(r.Yaw = ((m.A + this.aYi + 180) % 360) - 180));
							var m = n.Z,
								c = (this.VYi(n, h), n.Z - m),
								d =
									((n.Z +=
										h.Actor.CapsuleComponent.GetScaledCapsuleHalfHeight()),
									this.HYi(g.Pos, n.X, n.Y, n.Z, r.Yaw));
							if (
								((g.Pos.X = n.X),
								(g.Pos.Y = n.Y),
								(g.Pos.Z = n.Z),
								(g.Pos.A = r.Yaw),
								!this.nx.IsBackground)
							)
								if (
									(s === this.mYi &&
										(Log_1.Log.CheckDebug() &&
											Log_1.Log.Debug("Plot", 27, "演员位", [
												"station",
												this.mYi,
											]),
										(this.vYi = c)),
									d)
								)
									Log_1.Log.CheckDebug() &&
										Log_1.Log.Debug("Plot", 27, "位置相同，略了", [
											"id",
											g.PbDataId,
										]);
								else {
									if (g.IsPlayer()) {
										if (this.jYi(g.OriginPos, g.Pos)) {
											t =
												TeleportController_1.TeleportController.TeleportToPositionNoLoading(
													n,
													r,
													"剧情演出.SetupTemplateActor",
												);
											continue;
										}
										h.Actor.CharacterMovement?.SetMovementMode(
											h.Actor.CharacterMovement?.DefaultLandMovementMode,
										);
									}
									h.FixBornLocation("剧情演出.SetupTemplateActor", !0, a, !1),
										h.SetActorRotation(r, "剧情演出.SetupTemplateActor", !1),
										h.SetInputRotator(r);
								}
						} else
							Log_1.Log.CheckWarn() &&
								Log_1.Log.Warn(
									"Plot",
									27,
									"无法获取实体CharacterActorComponent",
									["PbDataId", g.PbDataId],
								);
					} else
						Log_1.Log.CheckWarn() &&
							Log_1.Log.Warn("Plot", 27, "演员无效", ["演员位置", l.Index]);
			}
		}
		return (
			void 0 !== t && (await t),
			(this.Hqn = new CustomPromise_1.CustomPromise()),
			(this.Vqn = s + 3),
			await this.Hqn.Promise,
			!0
		);
	}
	jqn() {
		var e;
		!this.Hqn ||
			(e = Time_1.Time.Frame) < this.Vqn ||
			(Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("Plot", 27, "剧情切镜飘带处理 -开启", ["curFrame", e]),
			UE.KismetSystemLibrary.ExecuteConsoleCommand(
				GlobalData_1.GlobalData.World,
				"r.Kuro.DisableKawaiiSimulate 0",
			),
			(e = this.Hqn),
			(this.Vqn = -1),
			(this.Hqn = void 0),
			e.SetResult());
	}
	HYi(e, t, i, o, a) {
		return (
			MathUtils_1.MathUtils.IsNearlyEqual(e.X, t, 1) &&
			MathUtils_1.MathUtils.IsNearlyEqual(e.Y, i, 1) &&
			MathUtils_1.MathUtils.IsNearlyEqual(e.Z, o, 1) &&
			MathUtils_1.MathUtils.IsNearlyEqual(e.A, a, 1)
		);
	}
	jYi(e, t) {
		return (
			(e = Vector_1.Vector.Create(e)),
			(t = Vector_1.Vector.Create(t)),
			Vector_1.Vector.DistSquared(e, t) > 1e6
		);
	}
	FYi(e) {
		if (!this.nx.IsBackground) {
			this.RYi.Stop();
			var t = this.rYi.CameraData;
			let a = e;
			if (!a) {
				e = Vector_1.Vector.Create(t.Pos.X, t.Pos.Y, t.Pos.Z);
				var i = Rotator_1.Rotator.Create(t.Rot.Y, t.Rot.Z, t.Rot.X);
				if (
					("_CU" === this.dYi || "_MS" === this.dYi) &&
					0 <= this.mYi &&
					this.mYi < this.CYi.length
				) {
					var o = this.CYi[this.mYi].Index;
					if (-1 !== o) {
						o = this.UYi[o];
						let t =
							EntitySystem_1.EntitySystem.Get(o.EntityId)
								?.GetComponent(3)
								?.Actor.Mesh.GetSocketTransform(PlotTemplate.WYi, 2)
								?.GetLocation().Z ?? 140.19;
						0 === t
							? ((t =
									EntitySystem_1.EntitySystem.Get(o.EntityId)
										?.GetComponent(3)
										?.Actor.Mesh.GetSocketTransform(PlotTemplate.KYi, 2)
										?.GetLocation().Z ?? 135.96),
								(this.vYi += 0 !== t ? t - 135.96 : 0))
							: (this.vYi += t - 140.19),
							(e.Z += this.vYi),
							Log_1.Log.CheckDebug() &&
								Log_1.Log.Debug("Plot", 27, "CU、MS相机自动调整", [
									"Offset",
									this.vYi,
								]);
					}
				}
				(o = Transform_1.Transform.Create(
					i.Quaternion(),
					e,
					Vector_1.Vector.OneVectorProxy,
				)),
					(a = Transform_1.Transform.Create()),
					o.ComposeTransforms(this.sYi, a);
			}
			(e = (i =
				CameraController_1.CameraController.SequenceCamera.GetComponent(
					9,
				).CineCamera).CameraComponent),
				ObjectUtils_1.ObjectUtils.IsValid(i) &&
					(i.K2_SetActorTransform(a.ToUeTransform(), !1, void 0, !0),
					t.Aperture && (e.CurrentAperture = t.Aperture),
					t.FocalLength && (e.CurrentFocalLength = t.FocalLength),
					t.FocusDistance &&
						(e.FocusSettings.ManualFocusDistance = t.FocusDistance),
					(e.Filmback.SensorWidth = 23.76),
					(e.Filmback.SensorHeight = 13.365),
					this.QYi());
		}
	}
	QYi() {
		for (const e of this.UYi)
			e.Valid &&
				e.Visible &&
				EntitySystem_1.EntitySystem.Get(e.EntityId)
					?.GetComponent(160)
					?.StartForceDisableAnimOptimization(3);
	}
	async EndTemplateNew(e) {
		this.IsInTemplate &&
			(this.RYi.Stop(),
			this.yYi ||
				(ModelManager_1.ModelManager.PlotModel.SwitchCameraMode(1),
				CameraController_1.CameraController.FightCamera.LogicComponent.ResetArmLengthAndRotation(
					ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig.PlotTemplateCameraExitRotation.ToUeRotator(),
				),
				UE.KismetSystemLibrary.ExecuteConsoleCommand(
					GlobalData_1.GlobalData.World,
					"r.MotionBlur.Amount " + this.TYi,
				)),
			await this.Lc(e),
			this.HVs.CleanAction(!1),
			this._Yi.forEach((e) => {
				TimerSystem_1.TimerSystem.Remove(e);
			}),
			this._Yi.clear(),
			this.uYi.forEach((e) => {
				TimerSystem_1.TimerSystem.Remove(e);
			}),
			this.uYi.clear(),
			this.tYi.clear(),
			(this.vYi = 0),
			(this.rYi = void 0),
			this.sYi.Reset(),
			(this.aYi = 0),
			(this.gYi = -1),
			(this.nYi = !1),
			(this.IYi = 0),
			UE.KismetSystemLibrary.ExecuteConsoleCommand(
				GlobalData_1.GlobalData.World,
				"r.Kuro.DisableKawaiiSimulate 0",
			));
	}
	async Lc(e) {
		var t = [];
		for (let s = 0; s < this.UYi.length; s++) {
			var i,
				o,
				a,
				n,
				r = this.UYi[s];
			r.Valid &&
				((o = (i = EntitySystem_1.EntitySystem.Get(r.EntityId))?.GetComponent(
					3,
				))
					? (o.ClearInput(),
						r.IsPlayer() || r.FaceChangeManager.ResetFacialExpression(),
						ModelManager_1.ModelManager.WorldModel.RemoveIgnore(o.Actor),
						r.Visible ||
							ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(
								i,
								!0,
								"[PlotTemplate.ReleaseActor] 恢复模板演出实体显隐",
							),
						r.MouseMontageLoadingId !==
							ResourceSystem_1.ResourceSystem.InvalidId &&
							(ResourceSystem_1.ResourceSystem.CancelAsyncLoad(
								r.MouseMontageLoadingId,
							),
							(r.MouseMontageLoadingId =
								ResourceSystem_1.ResourceSystem.InvalidId)),
						(a = (n = i.GetComponent(160))?.MainAnimInstance),
						ObjectUtils_1.ObjectUtils.IsValid(a) &&
							(a.OnMontageEnded.Remove(r.ResetFacialExpressionCallback),
							a.Montage_Stop(0.5),
							n.ResetSightLimit(),
							n.SetSightTargetItem(void 0)),
						(a = i.GetComponent(57))?.Valid &&
							r.OriginMoveSync &&
							a.SetEnableMovementSync(!0),
						void 0 !== r.TurningTimer &&
							TimerSystem_1.TimerSystem.Remove(r.TurningTimer),
						s === this.gYi
							? o.Actor.CharRenderingComponent?.ResetAllRenderingState()
							: ((a = i?.GetComponent(38))?.Valid &&
									r.OriginEnableAi &&
									a.EnableAi("Plot Control Ai"),
								(a = i.GetComponent(168))?.Valid &&
									(r.OriginEnableLookAt && a.SetLookAtPlayerEnabled(!0),
									a.OnNpcInPlot(!1)),
								(a = i.GetComponent(36))?.Valid &&
									a.CharacterMovement.SetMovementMode(r.OriginMoveMode),
								n.SetBlendSpaceLookAt(!1),
								(a = i.GetComponent(0).GetModelConfig()),
								(ObjectUtils_1.ObjectUtils.SoftObjectPathIsValid(a.DA) &&
									!StringUtils_1.StringUtils.IsEmpty(
										a.DA.AssetPathName?.toString(),
									) &&
									"None" !== a.DA.AssetPathName?.toString()) ||
									((n = o.SkeletalMesh.SkeletalMesh),
									UE.KuroMeshTextureFunctionLibrary.HandleSkeletalMeshComponentStreaming(
										n,
										!1,
									))),
						t.push(this.XYi(r, e?.IsResetPosition)),
						r.Reset())
					: Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug(
							"Plot",
							27,
							"模板结束时无法获取实体CharacterActorComponent",
							["EntityId", r.EntityId],
							["PbDataId", r.PbDataId],
						));
		}
		await Promise.all(t);
	}
	async XYi(e, t = !1) {
		if (!ModelManager_1.ModelManager.AutoRunModel.IsInLogicTreeGmMode()) {
			var i = new UE.Vector(0, 0, 0),
				o = new UE.Rotator(0, 0, 0);
			let a = !1;
			t && e.IsPosReset
				? ((o.Yaw = e.OriginPos.A),
					i.Set(e.OriginPos.X, e.OriginPos.Y, e.OriginPos.Z),
					(a = !0))
				: this.nx.IsBackground &&
					((o.Yaw = e.Pos.A), i.Set(e.Pos.X, e.Pos.Y, e.Pos.Z), (a = !0)),
				a &&
					((t = EntitySystem_1.EntitySystem.Get(e.EntityId).GetComponent(3)),
					this.yYi
						? t.SetInputRotator(o)
						: e.IsPlayer()
							? await TeleportController_1.TeleportController.TeleportToPositionNoLoading(
									i,
									o,
									"模板演出结束设置位置",
								)
							: (t.SetActorRotation(o, "模板演出结束设置位置", !1),
								t.SetInputRotator(o),
								t.SetActorLocation(i, "模板演出结束设置位置", !1)));
		}
	}
	AYi(e, t) {
		const i = new Array();
		this.gYi = -1;
		for (const t of e) -1 !== t ? i.push(t) : (this.gYi = e.indexOf(t));
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug("Plot", 18, "剧情加载等待-npc-开始", ["", i]),
			WaitEntityTask_1.WaitEntityTask.CreateWithPbDataId(
				i,
				(e) => {
					Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug("Plot", 18, "剧情加载等待-npc-完成", ["result", e]),
						this.xyn(i, t);
				},
				!0,
				3e4,
			);
	}
	xyn(e, t) {
		const i = new Map();
		for (const t of e) {
			var o = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(t);
			if (o?.IsInit) {
				var a = o.Entity.GetComponent(0)?.GetModelConfig();
				if (a) {
					if (
						ObjectUtils_1.ObjectUtils.SoftObjectPathIsValid(a.DA) &&
						((a = a.DA.AssetPathName?.toString()), a?.length && "None" !== a)
					)
						continue;
					(a = o.Entity.GetComponent(3)?.SkeletalMesh?.SkeletalMesh),
						ObjectUtils_1.ObjectUtils.IsValid(a) && i.set(a, !1);
				}
			}
		}
		0 === i.size
			? t()
			: (Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("Plot", 27, "剧情加载等待 npc纹理流送 开始", [
						"size",
						i.size,
					]),
				(this.t4s = 0),
				(this.xYt = TimerSystem_1.TimerSystem.Forever(() => {
					this.t4s++;
					let e = !0;
					for (var [o, a] of i)
						a ||
							(UE.KuroMeshTextureFunctionLibrary.IsSkeletalMeshComponentStreamingComplete(
								o,
							)
								? i.set(o, !0)
								: (e = !1));
					(e || 15 < this.t4s) &&
						(Log_1.Log.CheckInfo() &&
							Log_1.Log.Info("Plot", 27, "剧情加载等待 npc纹理流送 完成", [
								"checkTimes",
								this.t4s,
							]),
						(this.t4s = 0),
						this.xYt?.Remove(),
						(this.xYt = void 0),
						t());
				}, 200)));
	}
	NYi(e) {
		return !(
			!e ||
			((e.A = e.A ?? 0),
			(e.X = e.X ?? 0),
			(e.Y = e.Y ?? 0),
			(e.Z = e.Z ?? 0),
			void 0 === e.A) ||
			void 0 === e.X ||
			void 0 === e.Y ||
			void 0 === e.Z ||
			isNaN(e.A) ||
			isNaN(e.X) ||
			isNaN(e.Y) ||
			isNaN(e.Z)
		);
	}
	PlayCameraAnimCompatible(e) {
		e &&
			!this.nx.IsBackground &&
			this.RYi.Play({
				Type: IAction_1.EShowTalkCameraMotionType.Preset,
				CamShake: {
					CameraShakeBp:
						ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig
							.TemplateCameraShakePath,
				},
			});
	}
	async HandleTemplateShowTalk(e) {
		var t;
		this.IsInTemplate &&
			((this.IYi = 0),
			this.DYi ? (this.DYi = !1) : (this.LYi = !1),
			e.CameraData &&
				Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn("Plot", 27, "旧演出模板已废弃"),
			(t = this.SetTemplateNew(e.FlowTemplate)),
			this.ZYi(e),
			await t,
			this.$Yi(e.WhoId, e.ActorTurnToArray),
			this.nx.IsBackground ||
				(this.YYi(e.WhoId, e.ActorLookAtArray),
				this.JYi(e.ActorMontageArray),
				this.zYi(e)));
	}
	ZYi(e) {
		let t;
		switch (e.Type) {
			case "Talk":
			case "Option":
				t = e.CameraMotion;
		}
		t && this.RYi.Play(t);
	}
	YYi(e, t) {
		this.HVs.CleanAction();
		var i,
			o = this.lYi.get(e);
		const a = o?.Valid
				? EntitySystem_1.EntitySystem.Get(o.EntityId)?.GetComponent(3)
				: void 0,
			n =
				(a?.Valid ||
					(Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug(
							"Plot",
							27,
							"说话人未在模板内，可能会导致演员看向错误",
						)),
				new Map());
		t?.forEach((e) => {
			var t;
			n.has(e.ActorIndex)
				? ((t = n.get(e.ActorIndex)).push(e),
					t.sort((e, t) => (e.DelayTime ?? 0) - (t.DelayTime ?? 0)))
				: ((t = new Array()).push(e), n.set(e.ActorIndex, t));
		});
		for (const e of this.UYi)
			!e.Valid ||
				e.Visible ||
				e.LookLocked ||
				((i = EntitySystem_1.EntitySystem.Get(e.EntityId)?.GetComponent(160))
					?.Valid &&
					(i.ResetSightLimit(), i.SetSightTargetItem(void 0)));
		for (const e of this.CYi)
			if (-1 !== e.Index) {
				var r,
					s = this.UYi[e.Index];
				if (s.Valid) {
					const t = EntitySystem_1.EntitySystem.Get(s.EntityId)?.GetComponent(
						160,
					);
					t?.Valid &&
						((r = s.LookLocked),
						(n.has(e.Index) && this.jVs(t, n.get(e.Index), s, o)) ||
							r ||
							("_CU" === this.dYi && e === this.CYi[this.mYi]
								? (t.ResetSightLimit(), t.SetSightTargetItem(void 0))
								: s.Visible &&
									s.Valid &&
									(o?.Visible && o?.Valid
										? s === o
											? t.GetSightTargetPoint() ||
												this.eJi(t.GetSightTargetItem()) ||
												(t.ResetSightLimit(), t.SetSightTargetItem(void 0))
											: ((r =
													ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig
														.PlotTemplateLookAtDelay),
												(r = MathUtils_1.MathUtils.GetRandomRange(r[0], r[1])),
												this.HVs.DelayAction(
													s.EntityId,
													r,
													() => {
														t.ResetSightLimit(), t.SetSightTargetItem(a);
													},
													!1,
												))
										: (t.ResetSightLimit(), t.SetSightTargetItem(void 0)))));
				}
			}
	}
	jVs(e, t, i, o) {
		const a = t.length - 1;
		if (a < 0) return !1;
		let n = !1;
		return (
			t.forEach((t, r) => {
				(n ||=
					(t.DelayTime ?? 0) * CommonDefine_1.MILLIONSECOND_PER_SECOND <
					TimerSystem_1.MIN_TIME),
					this.bYi(e, t.Target, i, o, t.DelayTime, r === a);
			}),
			n
		);
	}
	bYi(e, t, i, o, a = 0, n) {
		let r,
			s = !1;
		switch (t.Type) {
			case 3: {
				var l = t;
				const i = Vector_1.Vector.Create(
					l.Pos.X ?? 0,
					l.Pos.Y ?? 0,
					l.Pos.Z ?? 0,
				);
				(s = l.Lock ?? !1),
					(r = () => {
						e.SetSightLimit([-90, 90], [-90, 90]), e.SetSightTargetPoint(i);
					});
				break;
			}
			case 2:
				l = t;
				var g = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
					l.EntityId,
				);
				if (g?.IsInit) {
					const t = g.Entity.GetComponent(3) ?? g.Entity.GetComponent(182);
					(s = l.Lock ?? !1),
						(r = () => {
							e.ResetSightLimit(), e.SetSightTargetItem(t);
						});
				} else
					Log_1.Log.CheckWarn() &&
						Log_1.Log.Warn("Plot", 27, "看向的实体不存在", [
							"pbdataid",
							l.EntityId,
						]);
				break;
			case 1:
				(s = t.Lock ?? !1),
					(r = () => {
						e.ResetSightLimit(), e.SetSightTargetItem(void 0);
					});
				break;
			case 4: {
				g = t;
				const i =
					ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity.GetComponent(
						3,
					);
				(s = g.Lock ?? !1),
					(r = () => {
						e.ResetSightLimit(), e.SetSightTargetItem(i);
					});
				break;
			}
			case 0:
			case 5: {
				let t;
				o &&
					i !== o &&
					(t = EntitySystem_1.EntitySystem.Get(o.EntityId)?.GetComponent(3)),
					(s = !1),
					(r = () => {
						e.ResetSightLimit(), e.SetSightTargetItem(t);
					});
				break;
			}
		}
		(i.LookLocked = s),
			(a = (a ?? 0) * CommonDefine_1.MILLIONSECOND_PER_SECOND) >
			TimerSystem_1.MIN_TIME
				? this.HVs.DelayAction(i.EntityId, a, r, s)
				: r?.();
	}
	eJi(e) {
		if (!e) return !1;
		if ((0, RegisterComponent_1.isComponentInstance)(e, 3))
			for (const t of this.UYi)
				if (
					!t.Visible &&
					t.Valid &&
					EntitySystem_1.EntitySystem.Get(t.EntityId)?.GetComponent(3) === e
				)
					return !1;
		return !0;
	}
	JYi(e) {
		this._Yi.forEach((e) => {
			TimerSystem_1.TimerSystem.Remove(e);
		}),
			this._Yi.clear();
		for (const e of this.UYi)
			(e.BodyMontagePath = void 0), (e.OverlayMontagePath = void 0);
		if (e)
			for (const i of e)
				if (!(i.ActorIndex < 0 || i.ActorIndex >= 10)) {
					const e = this.UYi[i.ActorIndex];
					if (e.Valid && e.Visible)
						if (i.EndLoopingMontage)
							(e.MontageKeeping = !1), (e.OverlayMontageKeeping = !1);
						else {
							var t = i.DelayTime
								? TimeUtil_1.TimeUtil.SetTimeMillisecond(i.DelayTime)
								: 0;
							if (t <= TimerSystem_1.MIN_TIME) this.tJi(e, i, !1);
							else {
								const o = TimerSystem_1.TimerSystem.Delay(() => {
									this.tJi(e, i, !0), this._Yi.delete(o);
								}, t);
								this._Yi.add(o);
							}
							if (i.OverlayMontage)
								if (
									(t = i.OverlayMontage?.DelayTime
										? TimeUtil_1.TimeUtil.SetTimeMillisecond(
												i.OverlayMontage.DelayTime,
											)
										: 0) <= TimerSystem_1.MIN_TIME
								)
									this.iJi(e, i, !1);
								else {
									const o = TimerSystem_1.TimerSystem.Delay(() => {
										this.iJi(e, i, !0), this._Yi.delete(o);
									}, t);
									this._Yi.add(o);
								}
						}
				}
		for (const e of this.UYi)
			e.Valid &&
				e.Visible &&
				(this.oJi(e),
				this.rJi(e),
				this.qYi(e.BodyMontagePath, (t) => {
					this.nJi(e, t);
				}),
				this.qYi(e.OverlayMontagePath, (t) => {
					this.sJi(e, t);
				}));
	}
	iJi(e, t, i) {
		if (void 0 !== t.OverlayMontage?.MontageId.MontageId)
			if (void 0 !== e.TurningTimer)
				Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn("Plot", 27, "试图在转身期间播放蒙太奇，已阻止");
			else {
				var o =
					t.ActorIndex === this.gYi
						? this.wYi(t.OverlayMontage.MontageId.MontageId)
						: t.OverlayMontage.MontageId.MontageId;
				let a;
				(a = t.OverlayMontage.MontageId.IsAbp
					? ModelManager_1.ModelManager.PlotModel.GetOverlayAbpMontageConfig(o)
					: ModelManager_1.ModelManager.PlotModel.GetMontageConfig(o))
					? (Log_1.Log.CheckDebug() &&
							Log_1.Log.Debug(
								"Plot",
								27,
								"模板演出蒙太奇播放",
								["演员", e.PbDataId],
								["蒙太奇", a],
							),
						(e.OverlayMontagePath = a.ActionMontage),
						(e.OverlayMontageLooping = t.OverlayMontage.IsLoop ?? !1),
						(e.OverlayMontageKeeping = t.OverlayMontage.KeepPose ?? !1),
						i &&
							(this.rJi(e),
							this.qYi(e.OverlayMontagePath, (t) => {
								this.sJi(e, t);
							})))
					: Log_1.Log.CheckWarn() &&
						Log_1.Log.Warn("Plot", 27, "模板蒙太奇库中没有该资源", ["Id", o]);
			}
	}
	tJi(e, t, i) {
		if (void 0 !== t.MontageId)
			if (void 0 !== e.TurningTimer)
				Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn("Plot", 27, "试图在转身期间播放蒙太奇，已阻止");
			else {
				var o = t.ActorIndex === this.gYi ? this.wYi(t.MontageId) : t.MontageId;
				let a;
				(a = t.IsAbpMontage
					? ModelManager_1.ModelManager.PlotModel.GetAbpMontageConfig(o)
					: ModelManager_1.ModelManager.PlotModel.GetMontageConfig(o))
					? (Log_1.Log.CheckDebug() &&
							Log_1.Log.Debug(
								"Plot",
								27,
								"模板演出蒙太奇播放",
								["演员", e.PbDataId],
								["蒙太奇", a],
							),
						(e.BodyMontagePath = a.ActionMontage),
						(e.MontageLooping = t.IsLoop ?? !1),
						(e.MontageKeeping = t.KeepPose ?? !1),
						e.FaceChangeManager?.InitFaceExpressionData(t.FaceExpressionId),
						i &&
							(this.oJi(e),
							this.qYi(e.BodyMontagePath, (t) => {
								this.nJi(e, t);
							})))
					: Log_1.Log.CheckWarn() &&
						Log_1.Log.Warn("Plot", 27, "模板蒙太奇库中没有该资源", ["Id", o]);
			}
	}
	wYi(e) {
		return 1 === ModelManager_1.ModelManager.PlayerInfoModel?.GetPlayerGender()
			? e + 1
			: e;
	}
	qYi(e, t) {
		var i;
		!e || StringUtils_1.StringUtils.IsEmpty(e)
			? t(void 0)
			: ((i = this.tYi.get(e)),
				ObjectUtils_1.ObjectUtils.IsValid(i)
					? t(i)
					: ResourceSystem_1.ResourceSystem.LoadAsync(
							e,
							UE.AnimMontage,
							(i) => {
								this.IsInTemplate && (this.tYi.set(e, i), t(i));
							},
						));
	}
	oJi(e) {
		var t,
			i = EntitySystem_1.EntitySystem.Get(e.EntityId)?.GetComponent(
				160,
			)?.MainAnimInstance;
		ObjectUtils_1.ObjectUtils.IsValid(i) &&
			(this.LYi && !e.MontageKeeping
				? i.Montage_SetNextSection(
						CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION,
						CharacterNameDefines_1.CharacterNameDefines.END_SECTION,
					)
				: (ObjectUtils_1.ObjectUtils.IsValid(e.BodyMontage) &&
					i.Montage_IsPlaying(e.BodyMontage)
						? StringUtils_1.StringUtils.IsEmpty(e.BodyMontagePath)
							? e.MontageKeeping ||
								(!(t = i.Montage_GetCurrentSection(e.BodyMontage)).op_Equality(
									CharacterNameDefines_1.CharacterNameDefines.START_SECTION,
								) &&
									!t.op_Equality(
										CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION,
									)) ||
								i.Montage_SetNextSection(
									t,
									CharacterNameDefines_1.CharacterNameDefines.END_SECTION,
									e.BodyMontage,
								)
							: e.BodyMontage !== this.tYi.get(e.BodyMontagePath) &&
								(i.Montage_Stop(0.5, e.BodyMontage), (e.BodyMontage = void 0))
						: (e.BodyMontage = void 0),
					e.MontageKeeping ||
						(i.OnMontageEnded.Remove(e.ResetFacialExpressionCallback),
						e.FaceChangeManager?.ResetFacialExpression())));
	}
	rJi(e) {
		var t,
			i = EntitySystem_1.EntitySystem.Get(e.EntityId)?.GetComponent(
				160,
			)?.MainAnimInstance;
		ObjectUtils_1.ObjectUtils.IsValid(i) &&
			(ObjectUtils_1.ObjectUtils.IsValid(e.OverlayMontage) &&
			i.Montage_IsPlaying(e.OverlayMontage)
				? StringUtils_1.StringUtils.IsEmpty(e.OverlayMontagePath)
					? e.OverlayMontageKeeping ||
						(!(t = i.Montage_GetCurrentSection(e.OverlayMontage)).op_Equality(
							CharacterNameDefines_1.CharacterNameDefines.START_SECTION,
						) &&
							!t.op_Equality(
								CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION,
							)) ||
						i.Montage_SetNextSection(
							t,
							CharacterNameDefines_1.CharacterNameDefines.END_SECTION,
							e.OverlayMontage,
						)
					: e.OverlayMontage !== this.tYi.get(e.OverlayMontagePath) &&
						(i.Montage_Stop(0.5, e.OverlayMontage), (e.OverlayMontage = void 0))
				: (e.OverlayMontage = void 0));
	}
	nJi(e, t, i = 1) {
		var o;
		ObjectUtils_1.ObjectUtils.IsValid(t) &&
			this.IsInTemplate &&
			((o = EntitySystem_1.EntitySystem.Get(e.EntityId)?.GetComponent(
				160,
			)?.MainAnimInstance),
			ObjectUtils_1.ObjectUtils.IsValid(o)) &&
			(this.tYi.get(e.BodyMontagePath) !== t
				? Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn("Plot", 27, "异步加载完的蒙太奇过期了")
				: ((e.BodyMontagePath = void 0),
					(o.Montage_IsPlaying(t) &&
						!o
							.Montage_GetCurrentSection(t)
							.op_Equality(
								CharacterNameDefines_1.CharacterNameDefines.END_SECTION,
							)) ||
						(this.LYi &&
							(UE.KuroStaticLibrary.StopAllMontagesBySlotName(
								o,
								CharacterNameDefines_1.CharacterNameDefines.DEFAULT_SLOT,
								0.5,
							),
							UE.KuroStaticLibrary.StopAllMontagesBySlotName(
								o,
								CharacterNameDefines_1.CharacterNameDefines.SEQUENCE_SLOT,
								0.5,
							)),
						o.OnMontageEnded.Add(e.ResetFacialExpressionCallback),
						o.Montage_Play(t, i, 0, 0, !1)),
					(e.BodyMontage = t),
					e.MontageLooping
						? o.Montage_SetNextSection(
								CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION,
								CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION,
								t,
							)
						: o.Montage_SetNextSection(
								CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION,
								CharacterNameDefines_1.CharacterNameDefines.END_SECTION,
								t,
							),
					e.FaceChangeManager?.ChangeFacialExpression()));
	}
	sJi(e, t, i = 1) {
		var o;
		ObjectUtils_1.ObjectUtils.IsValid(t) &&
			this.IsInTemplate &&
			((o = EntitySystem_1.EntitySystem.Get(e.EntityId)?.GetComponent(
				160,
			)?.MainAnimInstance),
			ObjectUtils_1.ObjectUtils.IsValid(o)) &&
			(this.tYi.get(e.OverlayMontagePath) !== t
				? Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn("Plot", 27, "异步加载完的蒙太奇过期了")
				: ((e.OverlayMontagePath = void 0),
					(o.Montage_IsPlaying(t) &&
						!o
							.Montage_GetCurrentSection(t)
							.op_Equality(
								CharacterNameDefines_1.CharacterNameDefines.END_SECTION,
							)) ||
						o.Montage_Play(t, i, 0, 0, !1),
					(e.OverlayMontage = t),
					e.OverlayMontageLooping
						? o.Montage_SetNextSection(
								CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION,
								CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION,
								t,
							)
						: o.Montage_SetNextSection(
								CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION,
								CharacterNameDefines_1.CharacterNameDefines.END_SECTION,
								t,
							)));
	}
	koe() {
		(this.uoe = UE.NewObject(UE.TraceLineElement.StaticClass())),
			(this.uoe.bIsSingle = !0),
			(this.uoe.bIgnoreSelf = !0),
			this.uoe.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.IkGround);
	}
	VYi(e, t) {
		this.uoe || this.koe();
		var i = (o = t.Actor).CapsuleComponent,
			o =
				((this.uoe.WorldContextObject = o),
				this.uoe.SetStartLocation(
					e.X,
					e.Y,
					e.Z + 2 * i.GetScaledCapsuleHalfHeight(),
				),
				this.uoe.SetEndLocation(e.X, e.Y, this.uoe.StartZ + -1e3),
				TraceElementCommon_1.TraceElementCommon.LineTrace(
					this.uoe,
					PROFILE_KEY,
				)),
			a = this.uoe.HitResult;
		if (o && a.bBlockingHit) {
			var n = a.Actors.Num();
			let i,
				o = 0;
			for (let e = 0; e < n; e++)
				if (
					((i = a.Actors.Get(e)),
					ObjectUtils_1.ObjectUtils.IsValid(i) &&
						!i.IsA(UE.Character.StaticClass()))
				) {
					o = e;
					break;
				}
			(e.Z = a.LocationZ_Array.Get(o)),
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug(
						"Plot",
						27,
						"实体剧情内修正地面",
						["FixedActor", t.CreatureData.GetPbDataId()],
						["Location", e],
						["HitActor", i.GetName()],
					);
		}
		this.uoe.WorldContextObject = void 0;
	}
	kYi() {
		if (this.UYi && this.CYi) {
			const e = new Map();
			this.CYi.forEach((t) => {
				-1 !== t.Index && e.set(t.Index, t);
			}),
				this.UYi.forEach((t, i) => {
					t.Valid &&
						((this.cYi.Visible = e.has(i)),
						(this.cYi.UseEffect = !1),
						t.Visible !== this.cYi.Visible) &&
						((t.Visible = this.cYi.Visible), this.aJi(t, this.cYi));
				});
		}
	}
	aJi(e, t) {
		e = EntitySystem_1.EntitySystem.Get(e.EntityId);
		var i = e?.GetComponent(3);
		i?.Valid && t
			? t.Visible
				? (ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(
						e,
						!0,
						"[PlotTemplate.ShowActor] 显示模板剧情实体",
					),
					t.UseEffect &&
						i.Actor.DitherEffectController.EnterAppearEffect(0.33, 1, !0))
				: (ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(
						e,
						!1,
						"[PlotTemplate.ShowActor] 隐藏演出的实体",
					),
					(e = e.GetComponent(160))?.Valid &&
						e.MainAnimInstance.Montage_Stop(0),
					t.UseEffect &&
						i.Actor.DitherEffectController.EnterDisappearEffect(0.33, 1))
			: Log_1.Log.CheckWarn() && Log_1.Log.Warn("Plot", 27, "显隐实体出错");
	}
	SetActorName(e) {
		e.ActorIndex >= this.UYi.length ||
			e.ActorIndex < 0 ||
			this.lYi.set(e.Talker, this.UYi[e.ActorIndex]);
	}
	zYi(e) {
		for (const e of this.UYi)
			e.Valid &&
				(e.MouseMontageLoadingId !==
					ResourceSystem_1.ResourceSystem.InvalidId &&
					(ResourceSystem_1.ResourceSystem.CancelAsyncLoad(
						e.MouseMontageLoadingId,
					),
					(e.MouseMontageLoadingId =
						ResourceSystem_1.ResourceSystem.InvalidId)),
				EntitySystem_1.EntitySystem.Get(e.EntityId)
					?.GetComponent(160)
					?.MainAnimInstance?.StopSlotAnimation(
						0,
						SequenceDefine_1.ABP_Mouth_Slot_Name,
					));
		if (
			e.PlayVoice &&
			e.WhoId &&
			(!e || "Talk" === e.Type) &&
			!StringUtils_1.StringUtils.IsEmpty(e.TidTalk)
		) {
			var t = e;
			if ("InnerVoice" !== t.Style?.Type) {
				const i = this.lYi.get(e.WhoId);
				if (i?.Valid && i?.Visible) {
					const o = EntitySystem_1.EntitySystem.Get(i.EntityId)?.GetComponent(
						160,
					)?.MainAnimInstance;
					o
						? ((t = PlotAudioById_1.configPlotAudioById.GetConfig(e.TidTalk)),
							(t = PlotAudioModel_1.PlotAudioModel.GetAudioMouthAnimName([
								t.IsCheckSex,
								t.FileName,
							])),
							(i.MouseMontageLoadingId =
								ResourceSystem_1.ResourceSystem.LoadAsync(
									t,
									UE.AnimSequence,
									(t) => {
										(i.MouseMontageLoadingId =
											ResourceSystem_1.ResourceSystem.InvalidId),
											o.PlaySlotAnimationAsDynamicMontage(
												t,
												SequenceDefine_1.ABP_Mouth_Slot_Name,
												0,
												0,
												1,
												1,
												-1,
												0,
												!1,
											),
											Log_1.Log.CheckDebug() &&
												Log_1.Log.Debug(
													"Plot",
													39,
													"MouthAnim 播放口型",
													["Key", e.TidTalk],
													["Asset", t?.GetName()],
													["ABP", o.GetName()],
												);
									},
								)))
						: Log_1.Log.CheckWarn() &&
							Log_1.Log.Warn("Plot", 27, "播放嘴型时拿不到AnimInst", [
								"EntityId",
								i.EntityId,
							]);
				}
			}
		}
	}
	$Yi(e, t) {
		if (
			(this.uYi.forEach((e) => {
				TimerSystem_1.TimerSystem.Remove(e);
			}),
			t && 0 !== t.length)
		)
			for (const r of t)
				if (!(r.ActorIndex > this.UYi.length)) {
					const t = this.UYi[r.ActorIndex];
					if (t.Valid && t.Visible) {
						let s;
						switch (r.Target.Type) {
							case 2:
								var i = r.Target;
								s = this.tL(i.EntityId);
								break;
							case 3:
								(i = r.Target),
									(s = Vector_1.Vector.Create(i.Pos.X, i.Pos.Y, i.Pos.Z));
								break;
							case 0:
								var o = this.lYi.get(e);
								if (!o?.Valid) {
									Log_1.Log.CheckWarn() &&
										Log_1.Log.Warn("Plot", 27, "说话人未在模板内，转向失败");
									continue;
								}
								(o = EntitySystem_1.EntitySystem.Get(o.EntityId)?.GetComponent(
									3,
								)),
									o && (s = Vector_1.Vector.Create(o.ActorLocationProxy));
								break;
							case 4:
								(o =
									ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity?.GetComponent(
										3,
									)),
									o && (s = Vector_1.Vector.Create(o.ActorLocationProxy));
						}
						if (s)
							if (this.nx.IsBackground) {
								var a = Vector_1.Vector.Create(),
									n = EntitySystem_1.EntitySystem.Get(t.EntityId)?.GetComponent(
										3,
									);
								s.Subtraction(n.ActorLocationProxy, a),
									(t.Pos.A =
										a.HeadingAngle() * MathCommon_1.MathCommon.RadToDeg);
							} else {
								if (
									(n = r.DelayTime
										? TimeUtil_1.TimeUtil.SetTimeMillisecond(r.DelayTime)
										: 0) < TimerSystem_1.MIN_TIME
								)
									this.hJi(t, s);
								else {
									const e = TimerSystem_1.TimerSystem.Delay(() => {
										this.hJi(t, s), this.uYi.delete(e);
									}, n);
									this.uYi.add(e);
								}
								this.IYi < n + 1500 && (this.IYi = n + 1500);
							}
					}
				}
	}
	tL(e) {
		var t =
			ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
				e,
			)?.Entity?.GetComponent(3);
		return t
			? Vector_1.Vector.Create(t.ActorLocationProxy)
			: (t = ModelManager_1.ModelManager.CreatureModel.GetEntityData(e))
				? Vector_1.Vector.Create(
						t.Transform.Pos.X,
						t.Transform.Pos.Y,
						t.Transform.Pos.Z,
					)
				: void 0;
	}
	hJi(e, t) {
		var i, o, a;
		void 0 !== e.TurningTimer
			? Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn("Plot", 27, "多次触发转身！！！！注意表现")
			: (i = (o = EntitySystem_1.EntitySystem.Get(e.EntityId))?.GetComponent(3))
					?.Valid &&
				((o = o?.GetComponent(160)),
				i.ClearInput(),
				o.MainAnimInstance.Montage_Stop(0),
				(e.TurningTimer = TimerSystem_1.TimerSystem.Delay(() => {
					e.TurningTimer = void 0;
				}, 1500)),
				-1 !== e.PbDataId
					? AiContollerLibrary_1.AiControllerLibrary.TurnToTarget(i, t, 0)
					: ((o = MathUtils_1.MathUtils.CommonTempRotator),
						(a = MathUtils_1.MathUtils.CommonTempVector),
						t.Subtraction(i.ActorLocationProxy, a),
						a.Normalize(),
						(o.Roll = 0),
						(o.Pitch = 0),
						(o.Yaw = MathUtils_1.MathUtils.GetAngleByVector2D(a)),
						i.SetInputRotator(o)));
	}
	SetTemplatePlayerTransform(e) {
		var t;
		-1 !== this.gYi &&
			(((t = this.UYi[this.gYi]).Pos.X = e.X ?? 0),
			(t.Pos.Y = e.Y ?? 0),
			(t.Pos.Z = e.Z ?? 0),
			(t.Pos.A = e.A ?? 0));
	}
	OnTick(e) {
		this.IsInTemplate && (this.RYi.OnTick(e), this.jqn());
	}
}
((exports.PlotTemplate = PlotTemplate).WYi = new UE.FName(
	"Bip001_Pupil_Bone01_L",
)),
	(PlotTemplate.KYi = new UE.FName("Bip001Head"));
