"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CameraModel = exports.SeqCameraThings = void 0);
const UE = require("ue"),
	Time_1 = require("../../Core/Common/Time"),
	EntitySystem_1 = require("../../Core/Entity/EntitySystem"),
	ModelBase_1 = require("../../Core/Framework/ModelBase"),
	Rotator_1 = require("../../Core/Utils/Math/Rotator"),
	Vector_1 = require("../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../Core/Utils/MathUtils"),
	EventDefine_1 = require("../Common/Event/EventDefine"),
	EventSystem_1 = require("../Common/Event/EventSystem"),
	GameQualitySettingsManager_1 = require("../GameQualitySettings/GameQualitySettingsManager"),
	FightCamera_1 = require("./FightCamera"),
	OrbitalCamera_1 = require("./OrbitalCamera"),
	SceneCamera_1 = require("./SceneCamera"),
	SequenceCamera_1 = require("./SequenceCamera"),
	WidgetCamera_1 = require("./WidgetCamera"),
	CAMERA_TICK_PRIORITY = -100,
	CAMERA_DEFAULT_SENSITIVITY = 50,
	CAMERA_MAX_SENSITIVITY = 100,
	CAMERA_MIN_SENSITIVITY = 0,
	CAMERA_DEFAULT_SENSITIVITY_MODIFIER = 1,
	CAMERA_MAX_SENSITIVITY_MODIFIER = 2,
	CAMERA_MIN_SENSITIVITY_MODIFIER = 0.5,
	MOTION_BLUR_DEFAULT_VALUE = 50,
	MOTION_BLUR_MAX_VALUE = 100,
	MOTION_BLUR_MIN_VALUE = 0,
	MOTION_BLUR_DEFAULT_MODIFIER = 0.25,
	MOTION_BLUR_MAX_MODIFIER = 0.4,
	MOTION_BLUR_MIN_MODIFIER = 0.1,
	CAMERA_DEFAULT_REVERSE = !1,
	CAMERA_ADDITION_ARM_LENGTH_VALUE_MAX = 100,
	CAMERA_ADDITION_ARM_LENGTH_VALUE_DEFAULT = 50,
	CAMERA_ADDITION_ARM_LENGTH_VALUE_MIN = 0,
	CAMERA_SHAKE_MODIFIER_MIN = 0,
	CAMERA_SHAKE_MODIFIER_MAX = 2;
class SeqCameraThings {
	constructor() {
		(this.CameraLocation = Vector_1.Vector.Create().ToUeVector()),
			(this.CameraRotation = Rotator_1.Rotator.Create().ToUeRotator()),
			(this.CameraScale = Vector_1.Vector.Create().ToUeVector()),
			(this.OriginRootTransform = void 0),
			(this.ConstrainAspectRatio = !1),
			(this.CurrentAperture = 0),
			(this.CurrentFocalLength = 0),
			(this.FocusSettings = void 0),
			(this.LensSettings = void 0),
			(this.FieldOfView = 0);
	}
}
exports.SeqCameraThings = SeqCameraThings;
class CameraModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.AimAssistDebugDraw = !1),
			(this.CameraDebugToolEnabled = !1),
			(this.CameraDebugToolDrawCameraCollision = !1),
			(this.CameraDebugToolDrawSpringArm = !1),
			(this.CameraDebugToolDrawFocusTargetLine = !1),
			(this.CameraDebugToolDrawSpringArmEdgeRange = !1),
			(this.CameraDebugToolDrawLockCameraMoveLine = !1),
			(this.CameraDebugToolDrawSettlementCamera = !1),
			(this.CurrentCameraActor = void 0),
			(this.CameraLocation = Vector_1.Vector.Create()),
			(this.CameraRotator = Rotator_1.Rotator.Create()),
			(this.CameraTransform = void 0),
			(this.CameraDitherStartHideDistance = 0),
			(this.NextFindStartHideDistanceTime = 0),
			(this.dhe = void 0),
			(this.Che = void 0),
			(this.ghe = 0),
			(this.fhe = void 0),
			(this.phe = void 0),
			(this.vhe = void 0),
			(this.Mhe = void 0),
			(this.She = new Array()),
			(this.Ehe = new Array()),
			(this.yhe = new Array()),
			(this.Ihe = !1),
			(this.The = void 0),
			(this.Lhe = 1),
			(this.Dhe = 1),
			(this.Rhe = 50),
			(this.Uhe = 50),
			(this.Ahe = 50),
			(this.Phe = 50),
			(this.xhe = false),
			(this.whe = false),
			(this.Bhe = false),
			(this.bhe = false),
			(this.qhe = !0),
			(this.Ghe = 50),
			(this.IsEnableResetFocus = !0),
			(this.IsEnableSidestepCamera = !0),
			(this.IsEnableSoftLockCamera = !0),
			(this.CameraSettingFightAdditionArmLength = 50),
			(this.CameraSettingNormalAdditionArmLength = 50),
			(this.Nhe = void 0),
			(this.Ohe = !0);
	}
	get CameraBaseYawSensitivityInputModifier() {
		var t =
			(t = this.Rhe) < 50
				? MathUtils_1.MathUtils.RangeClamp(t, 0, 50, 0.5, 1)
				: MathUtils_1.MathUtils.RangeClamp(t, 50, 100, 1, 2);
		return this.xhe ? -t : t;
	}
	get CameraBasePitchSensitivityInputModifier() {
		var t =
			(t = this.Uhe) < 50
				? MathUtils_1.MathUtils.RangeClamp(t, 0, 50, 0.5, 1)
				: MathUtils_1.MathUtils.RangeClamp(t, 50, 100, 1, 2);
		return this.whe ? -t : t;
	}
	get CameraAimingYawSensitivityInputModifier() {
		var t =
			(t = this.Ahe) < 50
				? MathUtils_1.MathUtils.RangeClamp(t, 0, 50, 0.5, 1)
				: MathUtils_1.MathUtils.RangeClamp(t, 50, 100, 1, 2);
		return this.Bhe ? -t : t;
	}
	get CameraAimingPitchSensitivityInputModifier() {
		var t =
			(t = this.Phe) < 50
				? MathUtils_1.MathUtils.RangeClamp(t, 0, 50, 0.5, 1)
				: MathUtils_1.MathUtils.RangeClamp(t, 50, 100, 1, 2);
		return this.bhe ? -t : t;
	}
	get IsCameraResetPitch() {
		return this.qhe;
	}
	get MotionBlurModifier() {
		return this.Ghe < 50
			? MathUtils_1.MathUtils.RangeClamp(this.Ghe, 0, 50, 0.1, 0.25)
			: MathUtils_1.MathUtils.RangeClamp(this.Ghe, 50, 100, 0.25, 0.4);
	}
	get CameraSettingArmLengthPercentage() {
		return this.FightCamera.LogicComponent.ContainsTag(1996802261)
			? MathUtils_1.MathUtils.RangeClamp(
					this.CameraSettingFightAdditionArmLength,
					0,
					100,
					0,
					1,
				)
			: MathUtils_1.MathUtils.RangeClamp(
					this.CameraSettingNormalAdditionArmLength,
					0,
					100,
					0,
					1,
				);
	}
	get AimAssistMode() {
		return this.Dhe;
	}
	get FightCamera() {
		return this.dhe;
	}
	get SequenceCamera() {
		return this.Che;
	}
	get CurSeqCameraIndex() {
		return this.ghe;
	}
	get WidgetCamera() {
		return this.fhe;
	}
	get SceneCamera() {
		return this.phe;
	}
	get OrbitalCamera() {
		return this.vhe;
	}
	get CameraMode() {
		return this.Mhe;
	}
	get ShakeModify() {
		return this.Lhe;
	}
	get FightCameraFinalDistance() {
		return this.FightCamera?.LogicComponent?.FinalCameraDistance ?? 0;
	}
	SetCameraShakeModify(t) {
		this.Lhe = MathUtils_1.MathUtils.Clamp(t, 0, 2);
	}
	SetCameraMode(t) {
		EventSystem_1.EventSystem.Emit(
			EventDefine_1.EEventName.CameraModeChanged,
			t,
			this.Mhe,
		),
			(this.Mhe = t);
	}
	SetAimAssistMode(t) {
		this.Dhe = t;
	}
	SetIsCameraResetPitch(t) {
		this.qhe = t;
	}
	SetCameraBaseYawSensitivity(t) {
		this.Rhe = MathUtils_1.MathUtils.Clamp(t, 0, 100);
	}
	SetCameraBasePitchSensitivity(t) {
		this.Uhe = MathUtils_1.MathUtils.Clamp(t, 0, 100);
	}
	SetCameraAimingYawSensitivity(t) {
		this.Ahe = MathUtils_1.MathUtils.Clamp(t, 0, 100);
	}
	SetCameraAimingPitchSensitivity(t) {
		this.Phe = MathUtils_1.MathUtils.Clamp(t, 0, 100);
	}
	SetCameraBaseYawReverse(t) {
		this.xhe = t;
	}
	SetCameraBasePitchReverse(t) {
		this.whe = t;
	}
	SetCameraAimingYawReverse(t) {
		this.Bhe = t;
	}
	SetCameraAimingPitchReverse(t) {
		this.bhe = t;
	}
	SetMotionBlurValue(t) {
		(this.Ghe = MathUtils_1.MathUtils.Clamp(t, 0, 100)),
			GameQualitySettingsManager_1.GameQualitySettingsManager.Get()
				.GetCurrentQualityInfo()
				.ApplyMotionBlur();
	}
	get Blending() {
		return this.Ihe;
	}
	SetBlending(t) {
		this.Ihe = t;
	}
	get BlendTimerId() {
		return this.The;
	}
	SetBlendTimerId(t) {
		this.The = t;
	}
	EnableMode(t) {
		this.She[t] = !0;
	}
	DisableMode(t) {
		this.She[t] = !1;
	}
	IsModeEnabled(t) {
		return this.She[t];
	}
	GetNextMode() {
		for (const t of this.Ehe) if (this.She[t]) return t;
		return 0;
	}
	IsInHigherMode(t) {
		return this.yhe[this.CameraMode] > this.yhe[t];
	}
	SetAimAssistEnable(t) {
		this.Ohe = t;
	}
	GetAimAssistEnable() {
		return this.Ohe;
	}
	OnInit() {
		(this.Che = EntitySystem_1.EntitySystem.Create(
			SequenceCamera_1.SequenceCamera,
			-100,
		)),
			EntitySystem_1.EntitySystem.Init(this.Che),
			EntitySystem_1.EntitySystem.Start(this.Che),
			EntitySystem_1.EntitySystem.Activate(this.Che),
			this.Che.SetTimeDilation(Time_1.Time.TimeDilation),
			(this.dhe = EntitySystem_1.EntitySystem.Create(
				FightCamera_1.FightCamera,
				-100,
			)),
			EntitySystem_1.EntitySystem.Init(this.dhe),
			EntitySystem_1.EntitySystem.Start(this.dhe),
			EntitySystem_1.EntitySystem.Activate(this.dhe),
			this.dhe.SetTimeDilation(Time_1.Time.TimeDilation),
			(this.fhe = EntitySystem_1.EntitySystem.Create(
				WidgetCamera_1.WidgetCamera,
				-100,
			)),
			EntitySystem_1.EntitySystem.Init(this.fhe),
			EntitySystem_1.EntitySystem.Start(this.fhe),
			EntitySystem_1.EntitySystem.Activate(this.fhe),
			this.fhe.SetTimeDilation(Time_1.Time.TimeDilation),
			(this.phe = EntitySystem_1.EntitySystem.Create(
				SceneCamera_1.SceneCamera,
				-100,
			)),
			EntitySystem_1.EntitySystem.Init(this.phe),
			EntitySystem_1.EntitySystem.Start(this.phe),
			EntitySystem_1.EntitySystem.Activate(this.phe),
			this.phe.SetTimeDilation(Time_1.Time.TimeDilation),
			(this.vhe = EntitySystem_1.EntitySystem.Create(
				OrbitalCamera_1.OrbitalCamera,
				-100,
			)),
			EntitySystem_1.EntitySystem.Init(this.vhe),
			EntitySystem_1.EntitySystem.Start(this.vhe),
			EntitySystem_1.EntitySystem.Activate(this.vhe),
			this.vhe.SetTimeDilation(Time_1.Time.TimeDilation),
			(this.CameraTransform = new UE.Transform());
		for (let t = 0; t < 5; ++t) this.She.push(!1), this.yhe.push(0);
		(this.She[0] = !0),
			this.Ehe.push(1),
			this.Ehe.push(2),
			this.Ehe.push(3),
			this.Ehe.push(4),
			this.Ehe.push(0);
		for (let t = 0; t < this.Ehe.length; ++t)
			this.yhe[this.Ehe[t]] = this.Ehe.length - t;
		return (
			(this.Nhe = void 0),
			this.dhe.Valid &&
				this.Che.Valid &&
				this.fhe.Valid &&
				this.phe.Valid &&
				this.vhe.Valid
		);
	}
	OnClear() {
		var t = EntitySystem_1.EntitySystem.Destroy(this.dhe);
		return (
			(this.dhe = void 0),
			(t &&= EntitySystem_1.EntitySystem.Destroy(this.Che)),
			(this.Che = void 0),
			(t &&= EntitySystem_1.EntitySystem.Destroy(this.fhe)),
			(this.fhe = void 0),
			(t &&= EntitySystem_1.EntitySystem.Destroy(this.phe)),
			(this.phe = void 0),
			(t &&= EntitySystem_1.EntitySystem.Destroy(this.vhe)),
			(this.vhe = void 0),
			(this.CameraTransform = void 0),
			(this.Nhe = void 0),
			t
		);
	}
	SaveSeqCamera() {
		this.Nhe = this.SequenceCamera?.PlayerComponent?.SaveSeqCamera();
	}
	GetSavedSeqCameraThings() {
		return this.Nhe;
	}
	IsToLockOnCameraMode() {
		return 0 === this.CameraMode;
	}
	IsToSceneCameraMode() {
		return 3 === this.CameraMode;
	}
}
exports.CameraModel = CameraModel;
