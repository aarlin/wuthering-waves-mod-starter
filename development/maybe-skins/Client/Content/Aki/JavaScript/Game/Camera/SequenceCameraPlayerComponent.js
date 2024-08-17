"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (e, t, r, i) {
		var a,
			o = arguments.length,
			s =
				o < 3
					? t
					: null === i
						? (i = Object.getOwnPropertyDescriptor(t, r))
						: i;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			s = Reflect.decorate(e, t, r, i);
		else
			for (var n = e.length - 1; 0 <= n; n--)
				(a = e[n]) && (s = (o < 3 ? a(s) : 3 < o ? a(t, r, s) : a(t, r)) || s);
		return 3 < o && s && Object.defineProperty(t, r, s), s;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SequenceCameraPlayerComponent = void 0);
const UE = require("ue"),
	ActorSystem_1 = require("../../Core/Actor/ActorSystem"),
	Log_1 = require("../../Core/Common/Log"),
	QueryTypeDefine_1 = require("../../Core/Define/QueryTypeDefine"),
	EntityComponent_1 = require("../../Core/Entity/EntityComponent"),
	EntitySystem_1 = require("../../Core/Entity/EntitySystem"),
	RegisterComponent_1 = require("../../Core/Entity/RegisterComponent"),
	TimerSystem_1 = require("../../Core/Timer/TimerSystem"),
	FNameUtil_1 = require("../../Core/Utils/FNameUtil"),
	Vector_1 = require("../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../Core/Utils/MathUtils"),
	TraceElementCommon_1 = require("../../Core/Utils/TraceElementCommon"),
	TsBaseCharacter_1 = require("../Character/TsBaseCharacter"),
	EventDefine_1 = require("../Common/Event/EventDefine"),
	EventSystem_1 = require("../Common/Event/EventSystem"),
	GameQualitySettingsManager_1 = require("../GameQualitySettings/GameQualitySettingsManager"),
	GlobalData_1 = require("../GlobalData"),
	ModelManager_1 = require("../Manager/ModelManager"),
	CharacterNameDefines_1 = require("../NewWorld/Character/Common/CharacterNameDefines"),
	UiLayerType_1 = require("../Ui/Define/UiLayerType"),
	UiLayer_1 = require("../Ui/UiLayer"),
	ActorUtils_1 = require("../Utils/ActorUtils"),
	CameraController_1 = require("./CameraController"),
	CameraModel_1 = require("./CameraModel"),
	CameraUtility_1 = require("./CameraUtility"),
	PROFILE_KEY1 = "SequenceCameraPlayerComponent_CheckCameraLocation",
	PROFILE_KEY2 = "SequenceCameraPlayerComponent_ProcessHideShelterCharacter",
	SEQUENCE_CAMERA = new UE.FName("SequenceCamera"),
	ROLE_TAG = new UE.FName("Role"),
	RELATIVE_LENGTH = 1e4,
	LIMIT_DISTANCE = 200;
let SequenceCameraPlayerComponent = class extends EntityComponent_1.EntityComponent {
	constructor() {
		super(...arguments),
			(this.yxr = void 0),
			(this.mnr = UE.NewArray(UE.Actor)),
			(this.hzo = void 0),
			(this.Ixr = void 0),
			(this.Hxr = -0),
			(this.dUo = -0),
			(this.jxr = 1),
			(this.Wxr = 1),
			(this.Kxr = 1),
			(this.Qxr = -0),
			(this.Xxr = void 0),
			(this.rRe = void 0),
			(this.$xr = void 0),
			(this.Yxr = void 0),
			(this.Jxr = !1),
			(this.zxr = !1),
			(this.Zxr = 0),
			(this.GPe = UE.NewArray(UE.Actor)),
			(this.ewr = UE.NewArray(UE.Actor)),
			(this.twr = new Map()),
			(this.iwr = new Set()),
			(this.owr = void 0),
			(this.rwr = !1),
			(this.sir = void 0),
			(this.Tae = void 0),
			(this.nwr = void 0),
			(this.swr = void 0),
			(this.awr = void 0),
			(this.Lz = Vector_1.Vector.Create()),
			(this.olt = FNameUtil_1.FNameUtil.EMPTY),
			(this.hwr = FNameUtil_1.FNameUtil.EMPTY),
			(this.lwr = void 0),
			(this._wr = Vector_1.Vector.Create(1e4, 1e4, 1e4)),
			(this.uwr = !1),
			(this.cwr = 0),
			(this.mwr = !0),
			(this.Fse = void 0),
			(this.dwr = void 0),
			(this.Cwr = !1),
			(this.Wse = Vector_1.Vector.Create()),
			(this.gwr = Vector_1.Vector.Create()),
			(this.fwr = void 0),
			(this.pwr = Vector_1.Vector.Create()),
			(this.vwr = Vector_1.Vector.Create()),
			(this.Mwr = Vector_1.Vector.Create()),
			(this.I7 = Vector_1.Vector.Create());
	}
	SetPlayCameraSequenceEnabled(e) {
		this.mwr = e;
	}
	SetPawn(e) {
		e instanceof TsBaseCharacter_1.default && this.SetCharacter(e);
	}
	SetCharacter(e) {
		this.nwr?.IsValid() ? (this.nwr = e) : (this.Tae = e);
	}
	PlayCameraSequence(
		e,
		t,
		r,
		i,
		a,
		o,
		s,
		n,
		h,
		m = !1,
		l = !0,
		C = !0,
		c = !1,
	) {
		if (!this.mwr) return !1;
		if (this.Jxr) {
			if (!this.Swr(this.Tae, i)) return !1;
			this.StopSequence();
		}
		return (
			this.yxr.CineCamera.GetAttachParentActor() &&
				this.yxr.CineCamera.K2_DetachFromActor(),
			(this.uwr = h),
			s ? this._wr.FromUeVector(s) : this._wr.Set(1e4, 1e4, 1e4),
			(this.cwr = n),
			(this.nwr = this.Tae),
			(this.Tae = i),
			(this.hwr = o),
			(this.olt = a),
			FNameUtil_1.FNameUtil.IsEmpty(this.olt) ||
				(this.lwr?.IsValid() ||
					((this.lwr = ActorSystem_1.ActorSystem.Get(
						UE.Actor.StaticClass(),
						MathUtils_1.MathUtils.DefaultTransform,
					)),
					this.lwr.K2_GetRootComponent()) ||
					this.lwr.AddComponentByClass(
						UE.SceneComponent.StaticClass(),
						!1,
						this.lwr.GetTransform(),
						!1,
					),
				this.lwr.K2_AttachToComponent(this.Tae.Mesh, this.olt, 2, 2, 2, !1)),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.PlayCameraLevelSequence,
				e.CameraSequence,
				i,
			),
			this.Ewr(e, l, C),
			(h = this.h8e(m)),
			(this.rwr = t),
			(this.owr = r),
			h &&
				(EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.OnSequenceCameraStatus,
					!0,
				),
				UE.KismetSystemLibrary.ExecuteConsoleCommand(
					GlobalData_1.GlobalData.World,
					"r.SetNearClipPlane 1",
				),
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("Camera", 39, "进入Sequence相机，最小近裁面"),
				c) &&
				UE.KismetSystemLibrary.ExecuteConsoleCommand(
					GlobalData_1.GlobalData.World,
					"r.MotionBlur.Amount 0",
				),
			h
		);
	}
	StopSequence() {
		this.ywr();
	}
	SetBlendTime(e, t) {
		(this.Wxr = e), (this.Kxr = t);
	}
	GetCurrentLevelSequenceActor() {
		return this.Ixr;
	}
	GetIsInCinematic() {
		return this.Jxr;
	}
	ResetCameraRatioSetting() {
		var e,
			t = this.yxr?.CineCamera?.GetCineCameraComponent();
		t &&
			((e = t.GetDefaultFilmbackPresetName()) && t.SetFilmbackPresetByName(e),
			(t.bConstrainAspectRatio = !1));
	}
	OnStart() {
		return this.Iwr(), (this.yxr = this.Entity.GetComponent(9)), this.yxr.Valid;
	}
	Iwr() {
		(this.swr = UE.NewObject(UE.TraceSphereElement.StaticClass())),
			(this.swr.bIsSingle = !0),
			(this.swr.bIgnoreSelf = !0),
			this.swr.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.Camera),
			(this.awr = UE.NewObject(UE.TraceSphereElement.StaticClass())),
			(this.awr.bIsSingle = !1),
			(this.awr.bIgnoreSelf = !0),
			(this.awr.ActorsToIgnore = this.mnr),
			this.awr.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.Pawn),
			this.awr.AddObjectTypeQuery(
				QueryTypeDefine_1.KuroObjectTypeQuery.PawnPlayer,
			),
			this.awr.AddObjectTypeQuery(
				QueryTypeDefine_1.KuroObjectTypeQuery.PawnMonster,
			),
			(this.Fse = UE.NewObject(UE.TraceSphereElement.StaticClass())),
			(this.Fse.bIsSingle = !0),
			(this.Fse.bIgnoreSelf = !0),
			(this.Fse.bTraceComplex = !0),
			this.Fse.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.Camera),
			(this.dwr = UE.NewObject(UE.TraceSphereElement.StaticClass())),
			(this.dwr.bIsSingle = !0),
			(this.dwr.bIgnoreSelf = !0),
			(this.dwr.bTraceComplex = !0),
			this.uwr && ((this.dwr.DrawTime = 5), this.dwr.SetDrawDebugTrace(2)),
			this.dwr.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.Camera);
	}
	OnEnd() {
		if (((this.yxr = void 0), this.GPe.Empty(), this.Ixr)) {
			this.Ixr.SequencePlayer?.OnStop.Clear();
			const e = this.Ixr;
			TimerSystem_1.TimerSystem.Next(() => {
				ActorSystem_1.ActorSystem.Put(e);
			}),
				(this.Ixr = void 0);
		}
		return (
			(this.hzo = void 0),
			(this.Xxr = void 0),
			(this.rRe = void 0),
			(this.$xr = void 0),
			(this.Yxr = void 0),
			(this.Wxr = 1),
			(this.Kxr = 1),
			(this.Jxr = !1),
			this.zxr &&
				(ModelManager_1.ModelManager.BattleUiModel.ChildViewData.ShowBattleView(
					2,
				),
				UiLayer_1.UiLayer.SetLayerActive(UiLayerType_1.ELayerType.Float, !0),
				UiLayer_1.UiLayer.SetLayerActive(UiLayerType_1.ELayerType.Pop, !0),
				UiLayer_1.UiLayer.SetLayerActive(UiLayerType_1.ELayerType.Guide, !0),
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.OnCameraSequenceSetUiVisible,
					!0,
				)),
			!0
		);
	}
	OnAfterTick(e) {
		if (this.Ixr) {
			if (!this.Tae?.IsValid()) return void this.StopSequence();
			var t = this.Tae.GetEntityIdNoBlueprint();
			if (!t || !EntitySystem_1.EntitySystem.Get(t))
				return void this.StopSequence();
		}
		this.Xxr && this.rRe && this.$xr
			? (this.Twr(),
				this.Lwr(),
				(this.Hxr += e * MathUtils_1.MathUtils.MillisecondToSecond * this.jxr),
				this.Ixr.SequencePlayer.JumpToSeconds(this.Hxr),
				this.Dwr(),
				this.Rwr(),
				this.CheckCollision(),
				this.Hxr >= this.dUo
					? this.ywr()
					: this.zxr &&
						0 < this.Zxr &&
						this.Hxr >= this.Zxr &&
						(ModelManager_1.ModelManager.BattleUiModel.ChildViewData.ShowBattleView(
							2,
						),
						UiLayer_1.UiLayer.SetLayerActive(
							UiLayerType_1.ELayerType.Float,
							!0,
						),
						UiLayer_1.UiLayer.SetLayerActive(UiLayerType_1.ELayerType.Pop, !0),
						UiLayer_1.UiLayer.SetLayerActive(
							UiLayerType_1.ELayerType.Guide,
							!0,
						),
						EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.OnCameraSequenceSetUiVisible,
							!0,
						),
						(this.zxr = !1)))
			: this.Qxr &&
				((this.Qxr = Math.max(0, this.Qxr - e)), this.CheckCollision());
	}
	Lwr() {
		this.jxr =
			this.Tae?.GetEntityNoBlueprint()?.GetComponent(107)?.CurrentTimeScale ??
			1;
	}
	Awr() {
		return this.sir ?? CameraController_1.CameraController.GetCharacter();
	}
	Ewr(e, t = !0, r = !0) {
		if (
			((this.Wxr = e.BlendInTime),
			(this.Kxr = e.BlendOutTime),
			(this.hzo = e.CameraSequence),
			(this.zxr = e.IsHideHud),
			this.hzo)
		) {
			this.ResetCameraRatioSetting(),
				this.yxr?.CineCamera?.ResetSeqCineCamSetting();
			var i = new UE.MovieSceneSequencePlaybackSettings();
			(t =
				((i.bDisableMovementInput = t),
				(i.bDisableLookAtInput = r),
				(this.Ixr = ActorSystem_1.ActorSystem.Get(
					UE.LevelSequenceActor.StaticClass(),
					new UE.Transform(),
					void 0,
					!1,
				)),
				(this.Ixr.PlaybackSettings = i),
				this.Ixr.SetSequence(this.hzo),
				this.Ixr.SequencePlayer.GetStartTime())),
				(r =
					((this.Hxr =
						((t.Time.FrameNumber.Value + t.Time.SubFrame) *
							t.Rate.Denominator) /
						t.Rate.Numerator),
					this.Ixr.SequencePlayer.GetEndTime()));
			if (
				((this.dUo =
					((r.Time.FrameNumber.Value + r.Time.SubFrame) * r.Rate.Denominator) /
					r.Rate.Numerator),
				e.EnableSpecificSequenceTime &&
					(this.dUo = Math.min(this.dUo, e.SpecificSequenceTime)),
				(this.swr.WorldContextObject = GlobalData_1.GlobalData.World),
				(this.awr.WorldContextObject = GlobalData_1.GlobalData.World),
				this.Uwr(),
				this.zxr)
			) {
				this.Zxr = e.HideHudTime;
				var a = e.VisibleChild,
					o = a.Num();
				if (o <= 0)
					ModelManager_1.ModelManager.BattleUiModel.ChildViewData.HideBattleView(
						2,
					);
				else {
					var s = [];
					for (let e = 0; e < o; e++) s.push(a.Get(e));
					ModelManager_1.ModelManager.BattleUiModel.ChildViewData.HideBattleView(
						2,
						s,
					);
				}
				UiLayer_1.UiLayer.SetLayerActive(UiLayerType_1.ELayerType.Float, !1),
					UiLayer_1.UiLayer.SetLayerActive(UiLayerType_1.ELayerType.Pop, !1),
					UiLayer_1.UiLayer.SetLayerActive(UiLayerType_1.ELayerType.Guide, !1),
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.OnCameraSequenceSetUiVisible,
						!1,
					);
			}
		}
	}
	Uwr() {
		this.Ixr &&
			(this.GPe.Add(this.yxr.CineCamera),
			this.Ixr.SetBindingByTag(SEQUENCE_CAMERA, this.GPe, !1),
			this.GPe.Empty(),
			this.Tae) &&
			(this.ewr.Add(this.Tae),
			this.Ixr.SetBindingByTag(ROLE_TAG, this.ewr, !1),
			this.ewr.Empty());
	}
	h8e(e) {
		let t = !1;
		return (
			this.Pwr(e) || this.CheckSphereCollision() || !this.xwr()
				? this.ywr()
				: (this.wwr(), (t = !0)),
			t
		);
	}
	Pwr(e) {
		var t = UE.KuroStaticLibrary.GetSequenceTracksForObjectBindingID(
			this.Ixr,
			SEQUENCE_CAMERA,
		);
		if (
			!(t = UE.KuroStaticLibrary.GetTrackByClass(
				t,
				UE.MovieScene3DTransformTrack.StaticClass(),
			))
		)
			return !1;
		t = UE.KuroStaticLibrary.GetFirstLocationFromSeqTrack(t);
		var r = this.Awr();
		t = CameraUtility_1.CameraUtility.GetRootTransform(r).TransformPosition(t);
		return (e =
			((this.swr.Radius =
				CameraController_1.CameraController.FightCamera.LogicComponent.CollisionProbeSize),
			this.swr.ActorsToIgnore.Empty(),
			e &&
				this.swr.ActorsToIgnore.Add(
					CameraController_1.CameraController.GetCharacter(),
				),
			TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.swr, t),
			TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.swr, t),
			TraceElementCommon_1.TraceElementCommon.SphereTrace(
				this.swr,
				PROFILE_KEY1,
			))) && this.swr.HitResult?.Actors?.Get(0) === r
			? (Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn(
						"Camera",
						58,
						"Seq相机初始位置与角色碰撞，请检查Seq的相机初始位置",
					),
				!1)
			: e;
	}
	xwr() {
		if (!this.hzo) return !1;
		var e = this.Awr();
		if (!e) return !1;
		if (!this.Ixr) return !1;
		var t = e.CharacterActorComponent.Entity.GetComponent(160),
			r =
				(t.Valid && t.StopModelBuffer(),
				(this.Ixr.bOverrideInstanceData = !0),
				this.Ixr.DefaultInstanceData);
		return (
			!!r &&
			((this.Xxr = r),
			(this.$xr = CameraUtility_1.CameraUtility.GetRootTransform(e)),
			(this.Yxr = e?.CharacterActorComponent?.Entity?.GetComponent(36)),
			t.Valid
				? ((r = t.MainAnimInstance),
					UE.KuroStaticLibrary.IsObjectClassByName(
						r,
						CharacterNameDefines_1.CharacterNameDefines.ABP_BASEROLE,
					) && (this.rRe = r))
				: (this.rRe = void 0),
			this.Dwr(),
			(e = this.Ixr.SequencePlayer).Play(),
			e.SetPlayRate(0),
			e.Pause(),
			e.JumpToSeconds(this.Hxr),
			!0)
		);
	}
	ywr() {
		if (
			(this.rwr
				? CameraController_1.CameraController.FightCamera.LogicComponent.ResetArmLengthAndRotation(
						this.owr,
					)
				: CameraController_1.CameraController.FightCamera.LogicComponent.SetRotation(
						CameraController_1.CameraController.SequenceCamera.DisplayComponent.CineCamera.K2_GetActorRotation(),
					),
			CameraController_1.CameraController.FightCamera?.LogicComponent
				?.CameraCollision &&
				(CameraController_1.CameraController.FightCamera.LogicComponent.CameraCollision.IsNpcDitherEnable =
					!0),
			(this.uwr = !1),
			(this.Jxr = !1),
			this.zxr &&
				(ModelManager_1.ModelManager.BattleUiModel.ChildViewData.ShowBattleView(
					2,
				),
				UiLayer_1.UiLayer.SetLayerActive(UiLayerType_1.ELayerType.Float, !0),
				UiLayer_1.UiLayer.SetLayerActive(UiLayerType_1.ELayerType.Pop, !0),
				UiLayer_1.UiLayer.SetLayerActive(UiLayerType_1.ELayerType.Guide, !0),
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.OnCameraSequenceSetUiVisible,
					!0,
				),
				(this.zxr = !1)),
			CameraController_1.CameraController.ExitCameraMode(1, this.Kxr),
			(this.Qxr = this.Kxr),
			this.Ixr)
		) {
			this.Ixr.SequencePlayer.Stop(),
				(this.Ixr.PlaybackSettings.bDisableMovementInput = !1),
				(this.Ixr.PlaybackSettings.bDisableLookAtInput = !1);
			const e = this.Ixr;
			TimerSystem_1.TimerSystem.Next(() => {
				ActorSystem_1.ActorSystem.Put(e);
			}),
				(this.Ixr = void 0);
		}
		for (var [e, t] of ((this.hzo = void 0),
		this.Tae?.IsValid() &&
			this.Tae.CharRenderingComponent?.OnFinalizedLevelSequence(),
		(this.Xxr = void 0),
		(this.rRe = void 0),
		(this.$xr = void 0),
		(this.sir = void 0),
		this.twr))
			e.IsValid() && e.CharacterActorComponent?.EnableActor(t);
		FNameUtil_1.FNameUtil.IsEmpty(this.olt) ||
			(this.lwr?.IsValid() && this.lwr.K2_DetachFromActor(1, 1, 1)),
			(this.olt = FNameUtil_1.FNameUtil.EMPTY),
			this.twr.clear(),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnSequenceCameraStatus,
				!1,
			),
			UE.KismetSystemLibrary.ExecuteConsoleCommand(
				GlobalData_1.GlobalData.World,
				"r.SetNearClipPlane 10",
			),
			GameQualitySettingsManager_1.GameQualitySettingsManager.Get()
				?.GetCurrentQualityInfo()
				?.ApplyMotionBlur(),
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("Camera", 39, "退出Sequence相机，正常近裁面");
	}
	Twr() {
		this.Yxr.HasDeltaBaseMovementData &&
			(this.$xr.AddToTranslation(this.Yxr.DeltaBaseMovementOffset),
			this.$xr.ConcatenateRotation(this.Yxr.DeltaBaseMovementQuat));
	}
	Rwr() {
		this.Awr()
			.GetEntityNoBlueprint()
			.GetComponent(160)
			.GetCameraPosition(this.Lz),
			this.gwr.DeepCopy(this.yxr.CineCamera.K2_GetActorLocation()),
			(this.awr.WorldContextObject = GlobalData_1.GlobalData.World),
			(this.awr.ActorsToIgnore = this.mnr),
			TraceElementCommon_1.TraceElementCommon.SetStartLocation(
				this.awr,
				this.Lz,
			),
			TraceElementCommon_1.TraceElementCommon.SetEndLocation(
				this.awr,
				this.gwr,
			),
			(this.awr.Radius =
				CameraController_1.CameraController.FightCamera.LogicComponent.CollisionProbeSize),
			this.iwr.clear();
		var e,
			t,
			r = TraceElementCommon_1.TraceElementCommon.SphereTrace(
				this.awr,
				PROFILE_KEY2,
			),
			i = this.awr.HitResult;
		let a;
		if (r && i.bBlockingHit) {
			var o = i.GetHitCount();
			TraceElementCommon_1.TraceElementCommon.GetHitLocation(
				this.awr.HitResult,
				0,
				this.Wse,
			);
			for (let e = 0; e < o; e++) {
				var s = i.Actors.Get(e);
				s instanceof TsBaseCharacter_1.default &&
					((a = ActorUtils_1.ActorUtils.GetEntityByActor(s)?.Entity)
						?.GetComponent(185)
						?.HasTag(1922109466) ||
						(this.Wse.Set(
							i.LocationX_Array.Get(e),
							i.LocationY_Array.Get(e),
							i.LocationZ_Array.Get(e),
						),
						Vector_1.Vector.Dist(this.Wse, this.gwr) > 200) ||
						this.iwr.add(s));
			}
		}
		for ([e, t] of this.twr)
			(a = ActorUtils_1.ActorUtils.GetEntityByActor(e)?.Entity),
				e.CharacterActorComponent?.EnableActor(t);
		this.twr.clear();
		for (const e of this.iwr)
			this.twr.has(e) ||
				(e.CharacterActorComponent?.Valid &&
					this.twr.set(
						e,
						e.CharacterActorComponent.DisableActor(
							"[SequenceCameraPlayerComponent.ProcessHideShelterCharacter]",
						),
					));
	}
	Dwr() {
		var e;
		FNameUtil_1.FNameUtil.IsEmpty(this.olt)
			? ((e = this.Bwr(this.$xr)), (this.Xxr.TransformOrigin = e))
			: this.lwr?.IsValid() &&
				((this.Xxr.TransformOriginActor = this.lwr), this.yxr?.CineCamera) &&
				((e = this.yxr.CineCamera.K2_GetActorLocation()),
				this.yxr.CineCamera.K2_SetActorLocation(e, !1, void 0, !1));
	}
	Swr(e, t) {
		return !(
			!t?.IsValid() ||
			(e?.IsValid() &&
				e !== t &&
				((e = e.GetEntityNoBlueprint()?.GetComponent(0)),
				(t = t.GetEntityNoBlueprint()?.GetComponent(0)),
				!e?.IsRole() || !t?.IsMonster()))
		);
	}
	wwr() {
		this.mnr.Empty(),
			this.mnr.Add(CameraController_1.CameraController.GetCharacter()),
			this.sir && this.mnr.Add(this.sir),
			CameraController_1.CameraController.EnterCameraMode(1, this.Wxr, 0),
			CameraController_1.CameraController.FightCamera?.LogicComponent
				?.CameraCollision &&
				(CameraController_1.CameraController.FightCamera.LogicComponent.CameraCollision.IsNpcDitherEnable =
					!1),
			(this.Jxr = !0);
	}
	Bwr(e) {
		return new UE.Transform(
			e.GetRotation(),
			e.GetTranslation(),
			e.GetScale3D(),
		);
	}
	OnChangeTimeDilation(e) {}
	CheckCollision() {
		var e;
		this.Tae?.IsValid() &&
			((this.Fse.WorldContextObject = GlobalData_1.GlobalData.World),
			FNameUtil_1.FNameUtil.IsEmpty(this.hwr)
				? ((e = this.Tae.GetEntityNoBlueprint().GetComponent(160)),
					(this.fwr = e.GetCameraTransform()))
				: (this.fwr = this.GetBoneTransform(this.hwr)),
			this.fwr?.IsValid()
				? (this.mnr.Empty(),
					this.mnr.Add(CameraController_1.CameraController.GetCharacter()),
					(this.Fse.ActorsToIgnore = this.mnr),
					TraceElementCommon_1.TraceElementCommon.SetStartLocation(
						this.Fse,
						this.fwr.GetLocation(),
					),
					this.gwr.DeepCopy(this.yxr.CineCamera.K2_GetActorLocation()),
					TraceElementCommon_1.TraceElementCommon.SetEndLocation(
						this.Fse,
						this.gwr,
					),
					(this.Fse.Radius = 3),
					(this.Cwr = TraceElementCommon_1.TraceElementCommon.SphereTrace(
						this.Fse,
						PROFILE_KEY2,
					)),
					this.Cwr &&
						(TraceElementCommon_1.TraceElementCommon.GetHitLocation(
							this.Fse.HitResult,
							0,
							this.Wse,
						),
						this.yxr.CineCamera.K2_SetActorLocation(
							this.Wse.ToUeVector(),
							!1,
							void 0,
							!1,
						)))
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Character",
						23,
						"CheckCollision  SocketTransform 不存在",
					));
	}
	CheckSphereCollision() {
		if (0 === this.cwr) return !1;
		this.dwr.WorldContextObject = GlobalData_1.GlobalData.World;
		var e = this.Tae.GetEntityNoBlueprint().GetComponent(160);
		return (
			(this.fwr = e.GetCameraTransform()),
			e.GetCameraPosition(this.pwr),
			this.vwr.DeepCopy(this.Tae.CharacterActorComponent.ActorForwardProxy),
			this.vwr.Multiply(this._wr.X, this.vwr),
			this.Mwr.DeepCopy(Vector_1.Vector.OneVectorProxy),
			this.Mwr.Multiply(this._wr.Y, this.Mwr),
			this.I7.DeepCopy(Vector_1.Vector.UpVectorProxy),
			this.I7.Multiply(this._wr.Z, this.I7),
			this.pwr.Addition(this.vwr, this.pwr),
			this.pwr.Addition(this.Mwr, this.pwr),
			this.pwr.Addition(this.I7, this.pwr),
			this.mnr.Empty(),
			this.mnr.Add(CameraController_1.CameraController.GetCharacter()),
			(this.dwr.ActorsToIgnore = this.mnr),
			TraceElementCommon_1.TraceElementCommon.SetStartLocation(
				this.dwr,
				this.pwr,
			),
			TraceElementCommon_1.TraceElementCommon.SetEndLocation(
				this.dwr,
				this.pwr,
			),
			(this.dwr.Radius = this.cwr),
			TraceElementCommon_1.TraceElementCommon.SphereTrace(
				this.dwr,
				PROFILE_KEY2,
			)
		);
	}
	GetBoneTransform(e) {
		var t = this.Tae;
		if (-1 !== t.Mesh.GetAllSocketNames().FindIndex(e))
			return t.Mesh.GetSocketTransform(e, 0);
	}
	DrawCube(e, t, r) {
		var i, a, o;
		e &&
			((r = new UE.LinearColor(r, r, r, r)),
			(o = e.GetLocation()),
			(i = new UE.Vector(10, 10, 10)),
			(i = new UE.Vector(0.5 * i.X, 0.5 * i.Y, 0.5 * i.Z)),
			(a = e.Rotator()),
			UE.KismetSystemLibrary.DrawDebugBox(
				GlobalData_1.GlobalData.World,
				o,
				i,
				r,
				a,
				t,
				30,
			),
			(o = UE.KismetMathLibrary.TransformLocation(
				e,
				new UE.Vector(0.5, 0.5, 0.5),
			)),
			(i = UE.KismetMathLibrary.TransformLocation(
				e,
				new UE.Vector(-0.5, -0.5, -0.5),
			)),
			UE.KismetSystemLibrary.DrawDebugLine(
				GlobalData_1.GlobalData.World,
				o,
				i,
				r,
				t,
				15,
			),
			(a = UE.KismetMathLibrary.TransformLocation(
				e,
				new UE.Vector(0.5, -0.5, 0.5),
			)),
			(o = UE.KismetMathLibrary.TransformLocation(
				e,
				new UE.Vector(-0.5, 0.5, 0.5),
			)),
			UE.KismetSystemLibrary.DrawDebugLine(
				GlobalData_1.GlobalData.World,
				a,
				o,
				r,
				t,
				15,
			));
	}
	SaveSeqCamera() {
		var e = new CameraModel_1.SeqCameraThings();
		return (
			(e.CameraLocation = this.yxr.CineCamera.K2_GetActorLocation()),
			(e.CameraRotation = this.yxr.CineCamera.K2_GetActorRotation()),
			(e.OriginRootTransform = this.$xr),
			(e.ConstrainAspectRatio = this.yxr.CineCamera["Constrain Aspect Ratio"]),
			(e.CurrentAperture = this.yxr.CineCamera["Current Aperture"]),
			(e.CurrentFocalLength = this.yxr.CineCamera["Current Focal Length"]),
			(e.FocusSettings = this.yxr.CineCamera["Focus Settings"]),
			(e.LensSettings = this.yxr.CineCamera["Lens Settings"]),
			(e.FieldOfView =
				this.yxr.CineCamera.GetCineCameraComponent().FieldOfView),
			e
		);
	}
};
(SequenceCameraPlayerComponent = __decorate(
	[(0, RegisterComponent_1.RegisterComponent)(10)],
	SequenceCameraPlayerComponent,
)),
	(exports.SequenceCameraPlayerComponent = SequenceCameraPlayerComponent);
