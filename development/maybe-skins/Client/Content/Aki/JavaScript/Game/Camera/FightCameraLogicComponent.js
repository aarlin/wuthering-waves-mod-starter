"use strict";
var FightCameraLogicComponent_1,
	__decorate =
		(this && this.__decorate) ||
		function (t, e, r, a) {
			var i,
				o = arguments.length,
				s =
					o < 3
						? e
						: null === a
							? (a = Object.getOwnPropertyDescriptor(e, r))
							: a;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
				s = Reflect.decorate(t, e, r, a);
			else
				for (var n = t.length - 1; 0 <= n; n--)
					(i = t[n]) &&
						(s = (o < 3 ? i(s) : 3 < o ? i(e, r, s) : i(e, r)) || s);
			return 3 < o && s && Object.defineProperty(e, r, s), s;
		};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FightCameraLogicComponent =
		exports.VirtualCamera =
		exports.CLEAN_TARGET_SPEED_THRESHOLD =
			void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	Log_1 = require("../../Core/Common/Log"),
	Time_1 = require("../../Core/Common/Time"),
	CommonParamById_1 = require("../../Core/Define/ConfigCommon/CommonParamById"),
	EntityComponent_1 = require("../../Core/Entity/EntityComponent"),
	EntitySystem_1 = require("../../Core/Entity/EntitySystem"),
	RegisterComponent_1 = require("../../Core/Entity/RegisterComponent"),
	Macro_1 = require("../../Core/Preprocessor/Macro"),
	ResourceSystem_1 = require("../../Core/Resource/ResourceSystem"),
	CurveUtils_1 = require("../../Core/Utils/Curve/CurveUtils"),
	FNameUtil_1 = require("../../Core/Utils/FNameUtil"),
	MathCommon_1 = require("../../Core/Utils/Math/MathCommon"),
	Quat_1 = require("../../Core/Utils/Math/Quat"),
	Rotator_1 = require("../../Core/Utils/Math/Rotator"),
	Vector_1 = require("../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../Core/Utils/MathUtils"),
	TsBaseCharacter_1 = require("../Character/TsBaseCharacter"),
	EventDefine_1 = require("../Common/Event/EventDefine"),
	EventSystem_1 = require("../Common/Event/EventSystem"),
	Global_1 = require("../Global"),
	GlobalData_1 = require("../GlobalData"),
	ModelManager_1 = require("../Manager/ModelManager"),
	PhotographController_1 = require("../Module/Photograph/PhotographController"),
	PlatformController_1 = require("../Module/Platform/PlatformController"),
	CharacterNameDefines_1 = require("../NewWorld/Character/Common/CharacterNameDefines"),
	RenderUtil_1 = require("../Render/Utils/RenderUtil"),
	ColorUtils_1 = require("../Utils/ColorUtils"),
	CameraCollision_1 = require("./CameraCollision"),
	CameraController_1 = require("./CameraController"),
	CameraUtility_1 = require("./CameraUtility"),
	CameraAdjustController_1 = require("./FightCameraController/CameraAdjustController"),
	CameraAutoController_1 = require("./FightCameraController/CameraAutoController"),
	CameraClimbController_1 = require("./FightCameraController/CameraClimbController"),
	CameraConfigController_1 = require("./FightCameraController/CameraConfigController"),
	CameraDialogueController_1 = require("./FightCameraController/CameraDialogueController"),
	CameraExploreController_1 = require("./FightCameraController/CameraExploreController"),
	CameraFixedController_1 = require("./FightCameraController/CameraFixedController"),
	CameraFocusController_1 = require("./FightCameraController/CameraFocusController"),
	CameraGuideController_1 = require("./FightCameraController/CameraGuideController"),
	CameraHookController_1 = require("./FightCameraController/CameraHookController"),
	CameraInputController_1 = require("./FightCameraController/CameraInputController"),
	CameraModifyController_1 = require("./FightCameraController/CameraModifyController"),
	CameraRotatorController_1 = require("./FightCameraController/CameraRotatorController"),
	CameraSidestepController_1 = require("./FightCameraController/CameraSidestepController"),
	CameraSpecialGameplayController_1 = require("./FightCameraController/CameraSpecialGameplayController"),
	CameraSplineMoveController_1 = require("./FightCameraController/CameraSplineMoveController"),
	SettlementCamera_1 = require("./SettlementCamera"),
	CONFIG_PATH =
		"/Game/Aki/Data/Camera/DA_FightcameraConfig.DA_FightCameraConfig",
	MOBILE_CONFIG_PATH =
		"/Game/Aki/Data/Camera/DA_FightCameraConfig_Mobile.DA_FightCameraConfig_Mobile",
	CAMERA_LOCATION_NEARLY_DISTANCE = 1,
	LOOK_AT_FORWARD_DISTANCE = 1e3,
	RESET_FOCUS_ROTATION_TIME = 0.2,
	MAX_TARGET_HAS_BLOCK_TIME = 1e3,
	SHOW_TARGET_VALID_TIME = 100,
	BREAK_BLEND_OUT_TIME = 0.2,
	LANDSCAPE_LOD_SCALE_FOV = 80,
	POINT_SIZE = 20,
	LINELEHGTH = 2e3,
	LINE_SIZE = 5,
	CIRCLE_SEGMENT = 48;
exports.CLEAN_TARGET_SPEED_THRESHOLD = 70;
class VirtualCamera {
	constructor() {
		(this.ArmOffset = Vector_1.Vector.Create()),
			(this.ArmLength = 0),
			(this.MinArmLength = 0),
			(this.MaxArmLength = 0),
			(this.YawLimitMin = 0),
			(this.YawLimitMax = 0),
			(this.PitchLimitMin = 0),
			(this.PitchLimitMax = 0),
			(this.LookDownOffsetZ = 0),
			(this.LookUpOffsetZ = 0),
			(this.CameraOffset = Vector_1.Vector.Create()),
			(this.Fov = 0),
			(this.ArmLocation = Vector_1.Vector.Create()),
			(this.ArmRotation = Rotator_1.Rotator.Create()),
			(this.ZoomModifier = 1),
			(this.WorldYawMin = 0),
			(this.WorldYawMax = 0);
	}
	ClearObject() {
		return !0;
	}
}
exports.VirtualCamera = VirtualCamera;
let FightCameraLogicComponent = (FightCameraLogicComponent_1 = class extends (
	EntityComponent_1.EntityComponent
) {
	constructor() {
		super(...arguments),
			(this.ArmLength = 0),
			(this.ArmOffsetX = 0),
			(this.ArmOffsetY = 0),
			(this.ArmOffsetZ = 0),
			(this.MinArmLength = 0),
			(this.MaxArmLength = 0),
			(this.CameraOffsetX = 0),
			(this.CameraOffsetY = 0),
			(this.CameraOffsetZ = 0),
			(this.Fov = 0),
			(this.CameraLocationFadeTime = 0),
			(this.CollisionProbeSize = 0),
			(this.NearCollisionProbeSize = 0),
			(this.CurrentCollisionSize = 0),
			(this.CheckCollisionProbeSize = 0),
			(this.CheckWidth = 0),
			(this.CollisionAdditionalHeightInWater = 0),
			(this.DefaultPitchHorizontalOffset = 0),
			(this.DefaultPitchVerticalOffset = 0),
			(this.DefaultPitchInRangeMin = 0),
			(this.DefaultPitchInRangeCenter = 0),
			(this.DefaultPitchInRangeMax = 0),
			(this.DefaultPitchOutRangeMin = 0),
			(this.DefaultPitchOutRangeCenter = 0),
			(this.DefaultPitchOutRangeMax = 0),
			(this.FloatUpArmLengthMin = 0),
			(this.FloatUpArmLengthMax = 0),
			(this.MaxDistance = 0),
			(this.InSpeed = 0),
			(this.OutSpeed = 0),
			(this.CenterCollisionSize = 0),
			(this.CollisionSizePercentage = 0),
			(this.StartHideDistance = 0),
			(this.CompleteHideDistance = 0),
			(this.StartHidePitch = 0),
			(this.CompleteHidePitch = 0),
			(this.StartDitherValue = 0),
			(this.YawLimitMin = 0),
			(this.YawLimitMax = 0),
			(this.PitchLimitMin = 0),
			(this.PitchLimitMax = 0),
			(this.LookDownOffsetZ = 0),
			(this.LookUpOffsetZ = 0),
			(this.ArmCenterUpSpeedMin = 0),
			(this.ArmCenterUpSpeedMax = 0),
			(this.ArmCenterUpEdgeMin = 0),
			(this.ArmCenterUpEdgeMax = 0),
			(this.ArmCenterUpCurve = void 0),
			(this.ArmCenterForwardSpeedMin = 0),
			(this.ArmCenterForwardSpeedMax = 0),
			(this.ArmCenterForwardEdgeMin = 0),
			(this.ArmCenterForwardEdgeMax = 0),
			(this.ArmCenterForwardCurve = void 0),
			(this.ArmCenterRightSpeedMin = 0),
			(this.ArmCenterRightSpeedMax = 0),
			(this.ArmCenterRightEdgeMin = 0),
			(this.ArmCenterRightEdgeMax = 0),
			(this.ArmCenterRightCurve = void 0),
			(this.InitialCameraPitch = 0),
			(this.CameraRotateToTargetMinAlpha = 0),
			(this.CameraRotateToTargetMaxAlpha = 0),
			(this.CameraRotateToTargetCurve = void 0),
			(this.IsDisableResetFocus = 0),
			(this.AdditionPitchMax = 0),
			(this.AdditionPitchMin = 0),
			(this.AdditionPitchDeltaHeight = 0),
			(this.AdditionPitchCurve = void 0),
			(this.WorldYawMin = 0),
			(this.WorldYawMax = 0),
			(this.Character = void 0),
			(this.CharacterController = void 0),
			(this.qPr = !1),
			(this.CharacterEntityHandle = void 0),
			(this.GPr = void 0),
			(this.TargetEntity = void 0),
			(this.NPr = void 0),
			(this.TargetSocketName = void 0),
			(this.OPr = void 0),
			(this.IsFollowing = !0),
			(this.ArmLocationFadeElapseTime = -0),
			(this.PlayerRotator = Rotator_1.Rotator.Create()),
			(this.PlayerLocation = Vector_1.Vector.Create()),
			(this.TargetLocation = Vector_1.Vector.Create()),
			(this.TmpArmLocation = Vector_1.Vector.Create()),
			(this.kPr = !1),
			(this.FPr = -0),
			(this.Fading = !1),
			(this.IRo = !1),
			(this.FadeArmRotationPitch = !1),
			(this.FadeArmRotationYaw = !1),
			(this.FadeArmRotationRoll = !1),
			(this.VPr = !1),
			(this.HPr = !1),
			(this.jPr = !1),
			(this.SRo = -0),
			(this.yRo = void 0),
			(this.IsUniqueFade = !1),
			(this.ERo = -0),
			(this.CurrentCamera = new VirtualCamera()),
			(this.CameraLocation = Vector_1.Vector.Create()),
			(this.CameraForward = Vector_1.Vector.Create()),
			(this.LastCamera = new VirtualCamera()),
			(this.DesiredCamera = new VirtualCamera()),
			(this.DebugDesiredCameraProps = new Map()),
			(this.DebugCurrentCameraProps = new Map()),
			(this.DebugLogicComponentsProps = new Map()),
			(this.DebugControllersProps = new Map()),
			(this.DebugControllerModifications = new Map()),
			(this.DebugCameraPropsRaw = void 0),
			(this.CameraConfigController =
				new CameraConfigController_1.CameraConfigController(this)),
			(this.CameraFocusController =
				new CameraFocusController_1.CameraFocusController(this)),
			(this.CameraInputController =
				new CameraInputController_1.CameraInputController(this)),
			(this.CameraModifyController =
				new CameraModifyController_1.CameraModifyController(this)),
			(this.CameraAdjustController =
				new CameraAdjustController_1.CameraAdjustController(this)),
			(this.CameraSidestepController =
				new CameraSidestepController_1.CameraSidestepController(this)),
			(this.CameraAutoController =
				new CameraAutoController_1.CameraAutoController(this)),
			(this.CameraGuideController =
				new CameraGuideController_1.CameraGuideController(this)),
			(this.CameraRunningController =
				new CameraExploreController_1.CameraExploreController(this)),
			(this.CameraRotatorController =
				new CameraRotatorController_1.CameraRotatorController(this)),
			(this.CameraDialogueController =
				new CameraDialogueController_1.CameraDialogueController(this)),
			(this.CameraFixedController =
				new CameraFixedController_1.CameraFixedController(this)),
			(this.CameraClimbController =
				new CameraClimbController_1.CameraClimbController(this)),
			(this.CameraHookController =
				new CameraHookController_1.CameraHookController(this)),
			(this.CameraSplineMoveController =
				new CameraSplineMoveController_1.CameraSplineMoveController(this)),
			(this.CameraSpecialGameplayController =
				new CameraSpecialGameplayController_1.CameraSpecialGameplayController(
					this,
				)),
			(this.WPr = [
				this.CameraConfigController,
				this.CameraModifyController,
				this.CameraInputController,
				this.CameraFocusController,
				this.CameraHookController,
				this.CameraDialogueController,
				this.CameraFixedController,
				this.CameraGuideController,
				this.CameraAdjustController,
				this.CameraSidestepController,
				this.CameraAutoController,
				this.CameraRunningController,
				this.CameraClimbController,
				this.CameraSplineMoveController,
				this.CameraRotatorController,
				this.CameraSpecialGameplayController,
			]),
			(this.CameraRotation = Rotator_1.Rotator.Create()),
			(this.IsModifiedArmLocation = !1),
			(this.IsModifiedArmLength = !1),
			(this.IsModifiedZoomModifier = !1),
			(this.IsModifiedArmRotation = !1),
			(this.IsModifiedCameraOffset = !1),
			(this.IsModifiedFov = !1),
			(this.KPr = 0),
			(this.ele = void 0),
			(this.QPr = Vector_1.Vector.Create()),
			(this.TempVector = Vector_1.Vector.Create()),
			(this.TempVector2 = Vector_1.Vector.Create()),
			(this.TempQuat = Quat_1.Quat.Create()),
			(this.TempDesireLocation = Vector_1.Vector.Create()),
			(this.XPr = !0),
			(this.Initialized = !1),
			(this.CameraConfig = void 0),
			(this.DefaultConfigs = new Map()),
			(this.DefaultCurveConfigs = new Map()),
			(this.$ = new Map()),
			(this.C1e = new Map()),
			(this.CameraCollision = void 0),
			(this.SettlementCamera = void 0),
			(this.CurrentArmCenterForwardEdgeMin = 0),
			(this.CurrentArmCenterForwardEdgeMax = 0),
			(this.CurrentArmCenterRightEdgeMin = 0),
			(this.CurrentArmCenterRightEdgeMax = 0),
			(this.CurrentArmCenterUpEdgeMin = 0),
			(this.CurrentArmCenterUpEdgeMax = 0),
			(this.Jyn = 0),
			(this.zyn = 0),
			(this.$Pr = 0),
			(this.YPr = !1),
			(this.JPr = Vector_1.Vector.Create(0, 0, 0)),
			(this.zPr = Rotator_1.Rotator.Create(0, 0, 0)),
			(this.fti = (0, puerts_1.$ref)(void 0)),
			(this.ZPr = (0, puerts_1.$ref)(0)),
			(this.exr = (0, puerts_1.$ref)(0)),
			(this.txr = (t, e) => {
				ModelManager_1.ModelManager.CreatureModel.GetEntityById(t.Id) ===
					this.CharacterEntityHandle && (this.CharacterController = e);
			}),
			(this.ixr = (t, e) => {
				ModelManager_1.ModelManager.CreatureModel.GetEntityById(t.Id) ===
					this.CharacterEntityHandle && (this.CharacterController = void 0);
			}),
			(this.cae = Vector_1.Vector.Create()),
			(this.oxr = Vector_1.Vector.Create()),
			(this.uht = () => {
				this.ResetFightCameraLogic(), this.ResetInitialCameraRotation();
			}),
			(this.nye = () => {
				this.ResetFightCameraLogic(!1), this.ResetInitialCameraRotation();
			}),
			(this.rxr = (t) => {
				t || this.ResetFightCameraLogic(!1);
			});
	}
	get IsTargetLocationValid() {
		return !this.TargetLocation.ContainsNaN();
	}
	get CameraActor() {
		return this.ele.CameraActor;
	}
	get FinalCameraDistance() {
		return this.$Pr;
	}
	GetArmLengthWithSetting(t) {
		return MathUtils_1.MathUtils.Lerp(
			t.ArmLength,
			t.MaxArmLength,
			ModelManager_1.ModelManager.CameraModel.CameraSettingArmLengthPercentage,
		);
	}
	GetArmLengthWithSettingAndZoom(t, e = !0) {
		var r = this.GetArmLengthWithSetting(t) * t.ZoomModifier;
		return e
			? MathUtils_1.MathUtils.Clamp(r, t.MinArmLength, t.MaxArmLength)
			: r;
	}
	static TArrayToArray(t) {
		if (!t) return [];
		var e = [],
			r = t.Num();
		for (let a = 0; a < r; a++) e.push(t.Get(a));
		return e;
	}
	static TMapToMap(t) {
		if (!(t.Num() < 0)) {
			var e = new Map();
			for (let a = 0; a < t.Num(); a++) {
				var r = t.GetKey(a);
				e.set(r, t.Get(r));
			}
			return e;
		}
	}
	static TMapToCurveMap(t) {
		if (!(t.Num() < 0)) {
			var e = new Map();
			for (let a = 0; a < t.Num(); a++) {
				var r = t.GetKey(a);
				e.set(r, CurveUtils_1.CurveUtils.CreateCurveByStruct(t.Get(r)));
			}
			return e;
		}
	}
	SetConfigMap(t, e) {
		this.$.set(t, e);
	}
	SetCurveConfigMap(t, e) {
		this.C1e.set(t, e);
	}
	f1e(t, e) {
		this[t] = e;
	}
	p1e(t, e) {
		this[t] = e;
	}
	SetConfigs(t, e) {
		if (t) {
			for (var [r, a] of t) (r = this.$.get(r)), this.f1e(r, a);
			for (var [i, o] of this.$)
				void 0 === this[o] &&
					(Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Camera",
							6,
							"CameraDefault缺少配置",
							["key", i],
							["value", o],
						),
					this.f1e(o, 1));
			(0 <= this.ArmCenterForwardEdgeMin ||
				0 <= this.ArmCenterRightEdgeMin ||
				0 <= this.ArmCenterUpEdgeMin ||
				this.ArmCenterForwardEdgeMax <= 0 ||
				this.ArmCenterRightEdgeMax <= 0 ||
				this.ArmCenterUpEdgeMax <= 0) &&
				Log_1.Log.CheckError() &&
				Log_1.Log.Error("Camera", 6, "CameraDefault配置上下界有误");
		}
		if (e) {
			for (var [s, n] of e) (s = this.C1e.get(s)), this.p1e(s, n);
			for (var [h, C] of this.C1e)
				void 0 === this[C] &&
					(Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Camera",
							6,
							"CameraDefault缺少曲线配置",
							["key", h],
							["value", C],
						),
					this.p1e(C, CurveUtils_1.CurveUtils.CreateCurve(0)));
		}
	}
	ResetDefaultConfig() {
		this.SetConfigs(this.DefaultConfigs, this.DefaultCurveConfigs);
	}
	ApplyConfig() {
		(this.DesiredCamera.ArmLength = this.ArmLength),
			(this.DesiredCamera.MinArmLength = this.MinArmLength),
			(this.DesiredCamera.MaxArmLength = this.MaxArmLength),
			(this.DesiredCamera.YawLimitMin = this.YawLimitMin),
			(this.DesiredCamera.YawLimitMax = this.YawLimitMax),
			(this.DesiredCamera.PitchLimitMin = this.PitchLimitMin),
			(this.DesiredCamera.PitchLimitMax = this.PitchLimitMax),
			(this.DesiredCamera.LookDownOffsetZ = this.LookDownOffsetZ),
			(this.DesiredCamera.LookUpOffsetZ = this.LookUpOffsetZ),
			(this.DesiredCamera.CameraOffset.X = this.CameraOffsetX),
			(this.DesiredCamera.CameraOffset.Y = this.CameraOffsetY),
			(this.DesiredCamera.CameraOffset.Z = this.CameraOffsetZ),
			(this.DesiredCamera.ArmOffset.X = this.ArmOffsetX),
			(this.DesiredCamera.ArmOffset.Y = this.ArmOffsetY),
			(this.DesiredCamera.ArmOffset.Z = this.ArmOffsetZ),
			(this.DesiredCamera.Fov = this.Fov),
			(this.DesiredCamera.WorldYawMin = this.WorldYawMin),
			(this.DesiredCamera.WorldYawMax = this.WorldYawMax),
			this.Initialized ||
				(this.CopyVirtualCamera(this.CurrentCamera, this.DesiredCamera),
				(this.Initialized = !0)),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.UpdateCameraInfo,
				this.CharacterEntityHandle.Id,
			);
	}
	OnInit() {
		return (
			this.SetConfigMap(1, "ArmLength"),
			this.SetConfigMap(2, "MinArmLength"),
			this.SetConfigMap(3, "MaxArmLength"),
			this.SetConfigMap(6, "CameraOffsetX"),
			this.SetConfigMap(7, "CameraOffsetY"),
			this.SetConfigMap(8, "CameraOffsetZ"),
			this.SetConfigMap(62, "ArmOffsetX"),
			this.SetConfigMap(63, "ArmOffsetY"),
			this.SetConfigMap(64, "ArmOffsetZ"),
			this.SetConfigMap(5, "Fov"),
			this.SetConfigMap(35, "MaxDistance"),
			this.SetConfigMap(36, "InSpeed"),
			this.SetConfigMap(37, "OutSpeed"),
			this.SetConfigMap(39, "CenterCollisionSize"),
			this.SetConfigMap(38, "CollisionSizePercentage"),
			this.SetConfigMap(9, "CameraLocationFadeTime"),
			this.SetConfigMap(11, "CollisionProbeSize"),
			this.SetConfigMap(32, "NearCollisionProbeSize"),
			this.SetConfigMap(30, "CheckCollisionProbeSize"),
			this.SetConfigMap(31, "CheckWidth"),
			this.SetConfigMap(10, "CollisionAdditionalHeightInWater"),
			this.SetConfigMap(12, "DefaultPitchHorizontalOffset"),
			this.SetConfigMap(13, "DefaultPitchVerticalOffset"),
			this.SetConfigMap(14, "DefaultPitchInRangeMin"),
			this.SetConfigMap(15, "DefaultPitchInRangeCenter"),
			this.SetConfigMap(16, "DefaultPitchInRangeMax"),
			this.SetConfigMap(17, "DefaultPitchOutRangeMin"),
			this.SetConfigMap(18, "DefaultPitchOutRangeCenter"),
			this.SetConfigMap(19, "DefaultPitchOutRangeMax"),
			this.SetConfigMap(24, "FloatUpArmLengthMin"),
			this.SetConfigMap(25, "FloatUpArmLengthMax"),
			this.SetConfigMap(40, "StartHideDistance"),
			this.SetConfigMap(41, "CompleteHideDistance"),
			this.SetConfigMap(42, "StartHidePitch"),
			this.SetConfigMap(43, "CompleteHidePitch"),
			this.SetConfigMap(44, "StartDitherValue"),
			this.SetConfigMap(33, "YawLimitMin"),
			this.SetConfigMap(34, "YawLimitMax"),
			this.SetConfigMap(45, "PitchLimitMin"),
			this.SetConfigMap(46, "PitchLimitMax"),
			this.SetConfigMap(20, "ArmCenterUpSpeedMin"),
			this.SetConfigMap(21, "ArmCenterUpSpeedMax"),
			this.SetConfigMap(22, "ArmCenterUpEdgeMin"),
			this.SetConfigMap(23, "ArmCenterUpEdgeMax"),
			this.SetCurveConfigMap(23, "ArmCenterUpCurve"),
			this.SetConfigMap(26, "ArmCenterForwardSpeedMin"),
			this.SetConfigMap(27, "ArmCenterForwardSpeedMax"),
			this.SetConfigMap(28, "ArmCenterForwardEdgeMin"),
			this.SetConfigMap(29, "ArmCenterForwardEdgeMax"),
			this.SetCurveConfigMap(29, "ArmCenterForwardCurve"),
			this.SetConfigMap(47, "ArmCenterRightSpeedMin"),
			this.SetConfigMap(48, "ArmCenterRightSpeedMax"),
			this.SetConfigMap(49, "ArmCenterRightEdgeMin"),
			this.SetConfigMap(50, "ArmCenterRightEdgeMax"),
			this.SetCurveConfigMap(50, "ArmCenterRightCurve"),
			this.SetConfigMap(51, "LookDownOffsetZ"),
			this.SetConfigMap(52, "LookUpOffsetZ"),
			this.SetConfigMap(54, "CameraRotateToTargetMaxAlpha"),
			this.SetConfigMap(53, "CameraRotateToTargetMinAlpha"),
			this.SetCurveConfigMap(55, "CameraRotateToTargetCurve"),
			this.SetConfigMap(56, "IsDisableResetFocus"),
			this.SetConfigMap(57, "AdditionPitchMin"),
			this.SetConfigMap(58, "AdditionPitchMax"),
			this.SetConfigMap(59, "AdditionPitchDeltaHeight"),
			this.SetCurveConfigMap(59, "AdditionPitchCurve"),
			this.SetConfigMap(60, "WorldYawMin"),
			this.SetConfigMap(61, "WorldYawMax"),
			(this.InitialCameraPitch =
				CommonParamById_1.configCommonParamById.GetFloatConfig(
					"InitialCameraPitch",
				)),
			(this.CameraCollision = new CameraCollision_1.CameraCollision()),
			this.CameraCollision.Init(this),
			(this.SettlementCamera = new SettlementCamera_1.SettlementCamera()),
			this.SettlementCamera.Init(this),
			this.AddUnResetProperty(
				"LastCamera",
				"DesiredCamera",
				"CameraConfigController",
				"CameraFocusController",
				"CameraInputController",
				"CameraModifyController",
				"CameraAdjustController",
				"CameraSidestepController",
				"CameraAutoController",
				"CameraGuideController",
				"CameraRunningController",
				"CameraRotatorController",
				"CameraDialogueController",
				"CameraFixedController",
				"CameraClimbController",
				"CameraHookController",
				"CameraSplineMoveController",
				"CameraCollision",
				"SettlementCamera",
			),
			!0
		);
	}
	LoadConfig() {
		this.ele = this.Entity.GetComponent(4);
		var t = PlatformController_1.PlatformController.IsMobile()
			? MOBILE_CONFIG_PATH
			: CONFIG_PATH;
		ResourceSystem_1.ResourceSystem.LoadAsync(
			t,
			UE.BP_FightCameraConfig_C,
			(t) => {
				(this.CameraConfig = t),
					(this.DefaultConfigs = FightCameraLogicComponent_1.TMapToMap(t.基础)),
					(this.DefaultCurveConfigs =
						FightCameraLogicComponent_1.TMapToCurveMap(t.基础曲线配置)),
					this.CameraFocusController.SetDefaultConfigs(
						t.锁定镜头,
						t.锁定镜头曲线配置,
					),
					this.CameraInputController.SetDefaultConfigs(
						t.镜头输入,
						t.镜头输入曲线配置,
					),
					this.CameraModifyController.SetDefaultConfigs(
						t.Modify镜头,
						t.Modify镜头曲线配置,
					),
					this.CameraAdjustController.SetDefaultConfigs(
						t.技能修正,
						t.技能修正曲线配置,
					),
					this.CameraSidestepController.SetDefaultConfigs(
						t.移动自动镜头,
						t.移动自动镜头曲线配置,
					),
					this.CameraAutoController.SetDefaultConfigs(
						t.自动镜头,
						t.自动镜头曲线配置,
					),
					this.CameraGuideController.SetDefaultConfigs(
						t.引导镜头,
						t.引导镜头曲线配置,
					),
					this.CameraRunningController.SetDefaultConfigs(
						t.跑图镜头,
						t.跑图镜头曲线配置,
					),
					this.CameraDialogueController.SetDefaultConfigs(
						t.对话镜头,
						t.对话镜头曲线配置,
					),
					this.CameraFixedController.SetDefaultConfigs(
						t.对话镜头,
						t.对话镜头曲线配置,
					),
					this.CameraClimbController.SetDefaultConfigs(
						t.攀爬镜头,
						t.攀爬镜头曲线配置,
					),
					this.CameraModifyController.SetSettlementModifier(t.结算镜头),
					this.CameraCollision?.SetCameraConfig(t.基础.Get(11));
			},
		);
	}
	ApplyCameraModify(
		t,
		e,
		r,
		a,
		i,
		o,
		s = 0.2,
		n = void 0,
		h = void 0,
		C = void 0,
		l = "",
		m = void 0,
	) {
		this.CameraModifyController.ApplyCameraModify(
			t,
			e,
			r,
			a,
			s,
			i,
			o,
			n,
			h,
			C,
			l,
			m,
		);
	}
	ApplyCameraGuide(t, e, r, a, i, o, s) {
		this.CameraGuideController.ApplyCameraGuide(t, e, r, a, i, o, s);
	}
	ApplyCameraHook(t) {
		this.CameraHookController.ApplyCameraHook(t);
	}
	ExitCameraHook(t = !0) {
		this.CameraHookController.ExitCameraHook(t);
	}
	ExitCameraGuide() {
		this.CameraGuideController.ExitCameraGuide();
	}
	ApplyDepthOfField(t, e, r, a) {
		var i = this.CameraActor?.CameraComponent?.PostProcessSettings;
		i &&
			(void 0 !== t &&
				((i.bOverride_DepthOfFieldFstop = !0), (i.DepthOfFieldFstop = t)),
			void 0 !== e
				? ((i.bOverride_DepthOfFieldFocalDistance = !0),
					(i.DepthOfFieldFocalDistance = e))
				: ((i.bOverride_DepthOfFieldFocalDistance = !0), (this.YPr = !0)),
			void 0 !== r &&
				((i.bOverride_DepthOfFieldDepthBlurAmount = !0),
				(i.DepthOfFieldDepthBlurAmount = r)),
			void 0 !== a) &&
			((i.bOverride_DepthOfFieldDepthBlurRadius = !0),
			(i.DepthOfFieldDepthBlurRadius = a));
	}
	ApplyRadialBlur(t, e, r, a, i, o) {
		var s = this.CameraActor?.CameraComponent?.PostProcessSettings;
		s &&
			(void 0 !== t
				? ((s.bOverride_KuroRadialBlurIntensity = !0),
					(s.KuroRadialBlurIntensity = t))
				: (s.bOverride_KuroRadialBlurIntensity = !1),
			void 0 !== e
				? ((s.bOverride_KuroRadialBlurCenter = !0),
					(s.KuroRadialBlurCenter = e))
				: (s.bOverride_KuroRadialBlurCenter = !1),
			void 0 !== r
				? ((s.bOverride_KuroRadialBlurRadius = !0),
					(s.KuroRadialBlurRadius = r))
				: (s.bOverride_KuroRadialBlurRadius = !1),
			void 0 !== a
				? ((s.bOverride_KuroRadialBlurHardness = !0),
					(s.KuroRadialBlurHardness = a))
				: (s.bOverride_KuroRadialBlurHardness = !1),
			void 0 !== i
				? ((s.bOverride_KuroRadialBlurPassNumber = !0),
					(s.KuroRadialBlurPassNumber = i))
				: (s.bOverride_KuroRadialBlurPassNumber = !1),
			void 0 !== o
				? ((s.bOverride_KuroRadialBlurSampleNumber = !0),
					(s.KuroRadialBlurSampleNumber = o))
				: (s.bOverride_KuroRadialBlurSampleNumber = !1));
	}
	ExitDepthOfField() {
		var t = this.CameraActor?.CameraComponent?.PostProcessSettings;
		t &&
			((t.bOverride_DepthOfFieldFstop = !1),
			(t.bOverride_DepthOfFieldFocalDistance = !1),
			(t.bOverride_DepthOfFieldDepthBlurAmount = !1),
			(t.bOverride_DepthOfFieldDepthBlurRadius = !1)),
			(this.YPr = !1);
	}
	ExitRadialBlur() {
		var t = this.CameraActor?.CameraComponent?.PostProcessSettings;
		t &&
			((t.bOverride_KuroRadialBlurIntensity = !1),
			(t.bOverride_KuroRadialBlurCenter = !1),
			(t.bOverride_KuroRadialBlurRadius = !1),
			(t.bOverride_KuroRadialBlurHardness = !1),
			(t.bOverride_KuroRadialBlurPassNumber = !1),
			(t.bOverride_KuroRadialBlurSampleNumber = !1));
	}
	ApplyCameraSpline(t, e, r, a) {
		this.CameraSplineMoveController.ApplyCameraSpline(t, e, r, a);
	}
	ExitCameraSpline() {
		this.CameraSplineMoveController.EndCameraSpline();
	}
	EnterCameraExplore(t, e, r, a, i, o, s) {
		this.CameraRunningController.EnterCameraExplore(t, e, r, a, i, o, s);
	}
	ExitCameraExplore(t) {
		this.CameraRunningController.ExitCameraExplore(t);
	}
	EnterSequenceDialogue(t, e = !1) {
		this.qPr && this.CameraDialogueController.EnterSequenceDialogue(t, e);
	}
	AdjustDialogueCamera(t, e, r, a) {
		this.CameraDialogueController.AdjustDialogueParams(t, e, r, a);
	}
	ExitSequenceDialogue() {
		this.CameraDialogueController.ExitSequenceDialogue();
	}
	SetRotation(t) {
		this.DesiredCamera.ArmRotation.DeepCopy(t),
			this.CurrentCamera.ArmRotation.DeepCopy(t),
			this.SetRotationInternal(t),
			this.CurrentCamera.ArmRotation.Quaternion().RotateVector(
				Vector_1.Vector.ForwardVectorProxy,
				this.CameraForward,
			);
	}
	SetPawn(t) {
		t instanceof TsBaseCharacter_1.default
			? this.SetCharacter(t)
			: t?.IsValid() || this.SetCharacter(void 0);
	}
	SetCharacter(t) {
		(this.Character = t)
			? ((this.qPr = this.Character?.IsValid() ?? !1),
				this.CameraCollision.SetCharacter(t),
				(this.CharacterEntityHandle =
					ModelManager_1.ModelManager.CreatureModel.GetEntityById(
						this.Character.EntityId,
					)),
				(this.CharacterController =
					this.CharacterEntityHandle?.Entity?.GetComponent(
						52,
					)?.CharacterController),
				(this.GPr = this.CharacterEntityHandle?.Entity?.GetComponent(185)),
				this.Character.SetDitherEffect(1, 1),
				(t = this.CharacterEntityHandle.Entity.GetComponent(0).GetRoleConfig()),
				(this.KPr = t.CameraFloatHeight),
				(this.ContainsTag(1674960297) || this.GetUsingGoBattle()) &&
					this.ResetArmLocation(!0, this.CameraLocationFadeTime))
			: ((this.qPr = !1),
				(this.CharacterEntityHandle = void 0),
				(this.GPr = void 0),
				(this.CharacterController = void 0)),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.CameraCharacterChanged,
				this.CharacterEntityHandle,
			);
	}
	nxr(t) {
		CameraUtility_1.CameraUtility.GetSocketLocation(
			void 0,
			this.TargetSocketName,
			t,
			this.TargetEntity,
		);
	}
	ResetArmLengthAndRotation(t) {
		this.qPr &&
			((this.DesiredCamera.ArmLength = this.ArmLength),
			this.SetRotation(
				CameraUtility_1.CameraUtility.GetCameraDefaultFocusUeRotator().op_Addition(
					t,
				),
			));
	}
	ResetInitialCameraRotation() {
		(this.CameraRotation.Pitch = this.InitialCameraPitch),
			this.SetRotation(this.CameraRotation.ToUeRotator());
	}
	GetCharacter() {
		return this.Character;
	}
	CopyVirtualCamera(t, e, r = !1) {
		(t.ArmLength = e.ArmLength),
			(t.MinArmLength = e.MinArmLength),
			(t.MaxArmLength = e.MaxArmLength),
			t.ArmLength < MathUtils_1.MathUtils.SmallNumber &&
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error("Camera", 6, "ArmLength is Zero"),
				(t.ArmLength = 1)),
			t.MinArmLength < MathUtils_1.MathUtils.SmallNumber &&
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error("Camera", 6, "MinArmLength is Zero"),
				(t.MinArmLength = 1)),
			t.MaxArmLength < MathUtils_1.MathUtils.SmallNumber &&
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error("Camera", 6, "MaxArmLength is Zero"),
				(t.MaxArmLength = 1)),
			r && this.Character && this.QRn(e.YawLimitMin, e.YawLimitMax)
				? ((r = Math.abs(
						MathUtils_1.MathUtils.WrapAngle(
							e.ArmRotation.Yaw -
								this.Character.CharacterActorComponent.ActorRotationProxy.Yaw,
						),
					)),
					(t.YawLimitMin = -Math.abs(r)),
					(t.YawLimitMax = Math.abs(r)))
				: ((t.YawLimitMin = e.YawLimitMin), (t.YawLimitMax = e.YawLimitMax)),
			(t.PitchLimitMin = e.PitchLimitMin),
			(t.PitchLimitMax = e.PitchLimitMax),
			(t.LookDownOffsetZ = e.LookDownOffsetZ),
			(t.LookUpOffsetZ = e.LookUpOffsetZ),
			(t.WorldYawMin = e.WorldYawMin),
			(t.WorldYawMax = e.WorldYawMax),
			t.ArmOffset.DeepCopy(e.ArmOffset),
			t.CameraOffset.DeepCopy(e.CameraOffset),
			t.ArmLocation.DeepCopy(e.ArmLocation),
			t.ArmRotation.DeepCopy(e.ArmRotation),
			(t.Fov = e.Fov),
			t.Fov < MathUtils_1.MathUtils.SmallNumber &&
				(Log_1.Log.CheckError() && Log_1.Log.Error("Camera", 6, "Fov is Zero"),
				(t.Fov = 1)),
			(t.ZoomModifier = e.ZoomModifier),
			t.ZoomModifier < MathUtils_1.MathUtils.SmallNumber &&
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error("Camera", 58, "ZoomModifier is Zero"),
				(t.ZoomModifier = 1));
	}
	StartFade(t, e, r, a, i, o, s, n, h, C) {
		(this.CurrentCamera.ArmRotation.Pitch =
			MathUtils_1.MathUtils.StandardizingPitch(
				this.CurrentCamera.ArmRotation.Pitch,
			)),
			this.CopyVirtualCamera(this.LastCamera, this.CurrentCamera, !0),
			(this.IRo = r),
			(this.FadeArmRotationPitch = a),
			(this.FadeArmRotationYaw = i),
			(this.FadeArmRotationRoll = o),
			(this.VPr = s),
			(this.HPr = n),
			(this.jPr = h),
			(this.Fading = !0),
			(this.SRo = t),
			(this.ERo = 0),
			(this.yRo = e),
			(this.IsUniqueFade = C),
			0 < this.SRo &&
				!this.yRo &&
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error("Camera", 6, "No Fade Curve."),
				(this.yRo = CurveUtils_1.CurveUtils.CreateCurve(0)));
	}
	ResetArmLocation(t, e = 0) {
		t &&
			((this.kPr = !0), (this.FPr = e), (this.ArmLocationFadeElapseTime = 0));
	}
	SetArmLocation(t) {
		this.IsModifiedArmLocation ||
			(this.DesiredCamera.ArmLocation.DeepCopy(t),
			(this.IsModifiedArmLocation = !0));
	}
	OnStart() {
		this.LoadConfig(),
			this.CameraCollision.InitTraceElements(),
			(this.CurrentCollisionSize = 0),
			(this.Jyn = UE.KismetSystemLibrary.GetConsoleVariableFloatValue(
				"r.LandscapeReverseLODScaleFactor",
			)),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.TeleportComplete,
				this.uht,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.WorldDone,
				this.nye,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnSequenceCameraStatus,
				this.rxr,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.CharPossessed,
				this.txr,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.CharUnpossessed,
				this.ixr,
			);
		for (const t of this.WPr) t.OnStart();
		return !0;
	}
	OnEnd() {
		this.CameraCollision.Clear(),
			this.SettlementCamera.Clear(),
			(this.CameraConfig = void 0),
			(this.ele = void 0),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.TeleportComplete,
				this.uht,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.WorldDone,
				this.nye,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnSequenceCameraStatus,
				this.rxr,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.CharPossessed,
				this.txr,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.CharUnpossessed,
				this.ixr,
			);
		for (const t of this.WPr) t.OnEnd();
		return !0;
	}
	OnTick(t) {
		(this.qPr = this.Character?.IsValid() ?? !1),
			this.CameraActor?.IsValid() &&
				this.qPr &&
				(0 !== ModelManager_1.ModelManager.CameraModel.CameraMode
					? (PhotographController_1.PhotographController.IsOpenPhotograph() ||
							this.Character.SetDitherEffect(1, 1),
						this.CameraCollision?.ResetAllNpcDither())
					: ((t *= MathUtils_1.MathUtils.MillisecondToSecond),
						this.sxr(),
						this.PlayerRotator.FromUeRotator(
							this.Character.CharacterActorComponent.ActorRotationProxy,
						),
						this.RefreshPlayerLocation(),
						this.axr(),
						this.hxr(t),
						this.lxr() &&
							(this.DesiredCamera.ArmLength = MathUtils_1.MathUtils.Clamp(
								this.DesiredCamera.ArmLength,
								this.DesiredCamera.MinArmLength,
								this.DesiredCamera.MaxArmLength,
							)),
						this._xr(t),
						this.URo(),
						this.uxr(),
						this.PRo(t),
						this.cxr(t),
						(this.zyn = this.CameraActor.CameraComponent.FieldOfView),
						(this.CameraActor.CameraComponent.FieldOfView =
							this.CurrentCamera.Fov),
						this.mxr(),
						this.dxr(),
						this.Zyn()));
	}
	hxr(t) {
		for (const e of this.WPr) e.Update(t);
	}
	lxr() {
		return !(
			this.CameraModifyController?.ModifySettings?.IsModifiedArmLength ||
			this.CameraModifyController?.ModifyArmLength ||
			(this.CameraModifyController.IsModifyFadeOut &&
				this.CameraModifyController?.ModifyFadeOutData?.ModifyArmLength)
		);
	}
	GetConfigMapValue(t) {
		return String(this.$.get(t));
	}
	axr() {
		(this.IsModifiedArmLocation = !1),
			(this.IsModifiedArmLength = !1),
			(this.IsModifiedZoomModifier = !1),
			(this.IsModifiedArmRotation = !1),
			(this.IsModifiedCameraOffset = !1),
			(this.IsModifiedFov = !1);
	}
	pxr(t, e, r, a, i, o, s, n) {
		var h = t - e;
		(s = Math.abs(h) / ((s - o) / 2)),
			(o = MathUtils_1.MathUtils.Lerp(a, i, n.GetCurrentValue(s)) * r);
		return h < 0
			? MathUtils_1.MathUtils.Clamp(t + o, t, e)
			: MathUtils_1.MathUtils.Clamp(t - o, e, t);
	}
	vxr(t, e, r, a, i, o, s, n) {
		var h = t - e;
		if (h < 0) {
			const s = MathUtils_1.MathUtils.Lerp(a, i, n.GetCurrentValue(h / o)) * r;
			return MathUtils_1.MathUtils.Clamp(t + s, e + o, e);
		}
		const C = MathUtils_1.MathUtils.Lerp(a, i, n.GetCurrentValue(h / s)) * r;
		return MathUtils_1.MathUtils.Clamp(t - C, e, e + s);
	}
	_xr(t) {
		var e, r, a, i, o, s;
		this.IsFollowing &&
			(this.TempVector.DeepCopy(this.CameraForward),
			(this.TempVector.Z = 0),
			this.TempVector.Normalize() ||
				(this.CameraRotation.Quaternion(this.TempQuat),
				this.TempQuat.RotateVector(
					Vector_1.Vector.UpVectorProxy,
					this.TempVector,
				),
				(this.TempVector.Z = 0),
				this.TempVector.Normalize()),
			this.TempVector2.Set(this.TempVector.Y, -this.TempVector.X, 0),
			(o = this.PlayerLocation.DotProduct(this.TempVector)),
			(s = this.PlayerLocation.DotProduct(this.TempVector2)),
			(e = this.PlayerLocation.Z),
			(r = this.TmpArmLocation.DotProduct(this.TempVector)),
			(a = this.TmpArmLocation.DotProduct(this.TempVector2)),
			(i = this.TmpArmLocation.Z),
			(this.CurrentArmCenterForwardEdgeMin = this.pxr(
				this.CurrentArmCenterForwardEdgeMin,
				this.ArmCenterForwardEdgeMin,
				t,
				this.ArmCenterForwardSpeedMin,
				this.ArmCenterForwardSpeedMax,
				this.ArmCenterForwardEdgeMin,
				this.ArmCenterForwardEdgeMax,
				this.ArmCenterForwardCurve,
			)),
			(this.CurrentArmCenterForwardEdgeMax = this.pxr(
				this.CurrentArmCenterForwardEdgeMax,
				this.ArmCenterForwardEdgeMax,
				t,
				this.ArmCenterForwardSpeedMin,
				this.ArmCenterForwardSpeedMax,
				this.ArmCenterForwardEdgeMin,
				this.ArmCenterForwardEdgeMax,
				this.ArmCenterForwardCurve,
			)),
			(this.CurrentArmCenterRightEdgeMin = this.pxr(
				this.CurrentArmCenterRightEdgeMin,
				this.ArmCenterRightEdgeMin,
				t,
				this.ArmCenterRightSpeedMin,
				this.ArmCenterRightSpeedMax,
				this.ArmCenterRightEdgeMin,
				this.ArmCenterRightEdgeMax,
				this.ArmCenterRightCurve,
			)),
			(this.CurrentArmCenterRightEdgeMax = this.pxr(
				this.CurrentArmCenterRightEdgeMax,
				this.ArmCenterRightEdgeMax,
				t,
				this.ArmCenterRightSpeedMin,
				this.ArmCenterRightSpeedMax,
				this.ArmCenterRightEdgeMin,
				this.ArmCenterRightEdgeMax,
				this.ArmCenterRightCurve,
			)),
			(this.CurrentArmCenterUpEdgeMin = this.pxr(
				this.CurrentArmCenterUpEdgeMin,
				this.ArmCenterUpEdgeMin,
				t,
				this.ArmCenterUpSpeedMin,
				this.ArmCenterUpSpeedMax,
				this.ArmCenterUpEdgeMin,
				this.ArmCenterUpEdgeMax,
				this.ArmCenterUpCurve,
			)),
			(this.CurrentArmCenterUpEdgeMax = this.pxr(
				this.CurrentArmCenterUpEdgeMax,
				this.ArmCenterUpEdgeMax,
				t,
				this.ArmCenterUpSpeedMin,
				this.ArmCenterUpSpeedMax,
				this.ArmCenterUpEdgeMin,
				this.ArmCenterUpEdgeMax,
				this.ArmCenterUpCurve,
			)),
			(r = this.vxr(
				r,
				o,
				t,
				this.ArmCenterForwardSpeedMin,
				this.ArmCenterForwardSpeedMax,
				this.CurrentArmCenterForwardEdgeMin,
				this.CurrentArmCenterForwardEdgeMax,
				this.ArmCenterForwardCurve,
			)),
			(a = this.vxr(
				a,
				s,
				t,
				this.ArmCenterRightSpeedMin,
				this.ArmCenterRightSpeedMax,
				this.CurrentArmCenterRightEdgeMin,
				this.CurrentArmCenterRightEdgeMax,
				this.ArmCenterRightCurve,
			)),
			(i = this.vxr(
				i,
				e,
				t,
				this.ArmCenterUpSpeedMin,
				this.ArmCenterUpSpeedMax,
				this.CurrentArmCenterUpEdgeMin,
				this.CurrentArmCenterUpEdgeMax,
				this.ArmCenterUpCurve,
			)),
			this.TempVector.MultiplyEqual(r),
			this.TempVector2.MultiplyEqual(a),
			this.TempVector.Addition(this.TempVector2, this.TmpArmLocation),
			(this.TmpArmLocation.Z = i)),
			this.IsModifiedArmLocation ||
				(this.kPr
					? (this.oxr.Reset(),
						this.DesiredCamera.ArmLocation.Subtraction(
							this.TmpArmLocation,
							this.oxr,
						),
						this.oxr.GetAbsMax() < 1
							? (this.DesiredCamera.ArmLocation.DeepCopy(this.TmpArmLocation),
								(this.kPr = !1))
							: ((this.ArmLocationFadeElapseTime += t),
								(o = this.FPr - this.ArmLocationFadeElapseTime) <
								MathUtils_1.MathUtils.KindaSmallNumber
									? ((this.kPr = !1),
										this.DesiredCamera.ArmLocation.DeepCopy(
											this.TmpArmLocation,
										))
									: ((s = this.oxr.MultiplyEqual(-t / o)),
										this.DesiredCamera.ArmLocation.AdditionEqual(s))))
					: this.DesiredCamera.ArmLocation.DeepCopy(this.TmpArmLocation));
	}
	Mxr(t) {
		return MathUtils_1.MathUtils.RangeClamp(
			t,
			this.FloatUpArmLengthMax,
			this.FloatUpArmLengthMin,
			0,
			this.KPr,
		);
	}
	PRo(t) {
		this.Fading
			? ((this.ERo += t),
				this.ERo >= this.SRo
					? ((this.Fading = !1),
						this.CopyVirtualCamera(this.CurrentCamera, this.DesiredCamera))
					: (this.CurrentCamera.ArmLocation.DeepCopy(
							this.DesiredCamera.ArmLocation,
						),
						(this.CurrentCamera.ZoomModifier = this.DesiredCamera.ZoomModifier),
						(t = this.yRo.GetCurrentValue(this.ERo / this.SRo)),
						this.IRo && !this.IsModifiedArmLength
							? (this.CurrentCamera.ArmLength = MathUtils_1.MathUtils.Lerp(
									this.LastCamera.ArmLength,
									this.DesiredCamera.ArmLength,
									t,
								))
							: ((this.IRo = !1),
								(this.CurrentCamera.ArmLength = this.DesiredCamera.ArmLength)),
						(this.CurrentCamera.MinArmLength = MathUtils_1.MathUtils.Lerp(
							this.LastCamera.MinArmLength,
							this.DesiredCamera.MinArmLength,
							t,
						)),
						(this.CurrentCamera.MaxArmLength = MathUtils_1.MathUtils.Lerp(
							this.LastCamera.MaxArmLength,
							this.DesiredCamera.MaxArmLength,
							t,
						)),
						(this.CurrentCamera.YawLimitMin = MathUtils_1.MathUtils.Lerp(
							this.LastCamera.YawLimitMin,
							this.DesiredCamera.YawLimitMin,
							t,
						)),
						(this.CurrentCamera.YawLimitMax = MathUtils_1.MathUtils.Lerp(
							this.LastCamera.YawLimitMax,
							this.DesiredCamera.YawLimitMax,
							t,
						)),
						(this.CurrentCamera.PitchLimitMin = MathUtils_1.MathUtils.Lerp(
							this.LastCamera.PitchLimitMin,
							this.DesiredCamera.PitchLimitMin,
							t,
						)),
						(this.CurrentCamera.PitchLimitMax = MathUtils_1.MathUtils.Lerp(
							this.LastCamera.PitchLimitMax,
							this.DesiredCamera.PitchLimitMax,
							t,
						)),
						(this.CurrentCamera.LookDownOffsetZ = MathUtils_1.MathUtils.Lerp(
							this.LastCamera.LookDownOffsetZ,
							this.DesiredCamera.LookDownOffsetZ,
							t,
						)),
						(this.CurrentCamera.LookUpOffsetZ = MathUtils_1.MathUtils.Lerp(
							this.LastCamera.LookUpOffsetZ,
							this.DesiredCamera.LookUpOffsetZ,
							t,
						)),
						(this.CurrentCamera.WorldYawMin = MathUtils_1.MathUtils.Lerp(
							this.LastCamera.WorldYawMin,
							this.DesiredCamera.WorldYawMin,
							t,
						)),
						(this.CurrentCamera.WorldYawMax = MathUtils_1.MathUtils.Lerp(
							this.LastCamera.WorldYawMax,
							this.DesiredCamera.WorldYawMax,
							t,
						)),
						this.VPr
							? Vector_1.Vector.Lerp(
									this.LastCamera.ArmOffset,
									this.DesiredCamera.ArmOffset,
									t,
									this.CurrentCamera.ArmOffset,
								)
							: ((this.VPr = !1),
								this.CurrentCamera.ArmOffset.DeepCopy(
									this.DesiredCamera.ArmOffset,
								)),
						this.HPr
							? Vector_1.Vector.Lerp(
									this.LastCamera.CameraOffset,
									this.DesiredCamera.CameraOffset,
									t,
									this.CurrentCamera.CameraOffset,
								)
							: ((this.HPr = !1),
								this.CurrentCamera.CameraOffset.DeepCopy(
									this.DesiredCamera.CameraOffset,
								)),
						this.FadeArmRotationPitch
							? (this.CurrentCamera.ArmRotation.Pitch =
									MathUtils_1.MathUtils.Lerp(
										this.LastCamera.ArmRotation.Pitch,
										this.DesiredCamera.ArmRotation.Pitch,
										t,
									))
							: (this.CurrentCamera.ArmRotation.Pitch =
									this.DesiredCamera.ArmRotation.Pitch),
						this.FadeArmRotationYaw
							? (this.CurrentCamera.ArmRotation.Yaw =
									MathUtils_1.MathUtils.Lerp(
										this.LastCamera.ArmRotation.Yaw,
										this.DesiredCamera.ArmRotation.Yaw,
										t,
									))
							: (this.CurrentCamera.ArmRotation.Yaw =
									this.DesiredCamera.ArmRotation.Yaw),
						this.FadeArmRotationRoll
							? (this.CurrentCamera.ArmRotation.Roll =
									MathUtils_1.MathUtils.Lerp(
										this.LastCamera.ArmRotation.Roll,
										this.DesiredCamera.ArmRotation.Roll,
										t,
									))
							: (this.CurrentCamera.ArmRotation.Roll =
									this.DesiredCamera.ArmRotation.Roll),
						this.jPr && !this.IsModifiedFov
							? (this.CurrentCamera.Fov = MathUtils_1.MathUtils.Lerp(
									this.LastCamera.Fov,
									this.DesiredCamera.Fov,
									t,
								))
							: ((this.jPr = !1),
								(this.CurrentCamera.Fov = this.DesiredCamera.Fov))))
			: this.CopyVirtualCamera(this.CurrentCamera, this.DesiredCamera);
	}
	cxr(t) {
		if (this.qPr) {
			let i = 0;
			(i =
				this.CameraModifyController.IsModified ||
				this.CameraModifyController.IsModifyFadeOut
					? this.GetArmLengthWithSettingAndZoom(this.DesiredCamera, !1)
					: this.GetArmLengthWithSettingAndZoom(this.CurrentCamera, !0)),
				(i += this.CameraAutoController.CurrentAutoCameraArmLengthAddition);
			var e = this.CurrentCamera.ArmRotation,
				r =
					(this.CameraModifyController.IsModified ||
						this.CameraModifyController.IsModifyFadeOut ||
						(e.Roll = 0),
					(i += this.CameraGuideController.CurrentCameraArmLengthAddition),
					this.Mxr(i)),
				a = (this.cae.DeepCopy(this.CurrentCamera.ArmLocation), this.cae);
			(r =
				(a.AdditionEqual(this.CameraAutoController.CurrentAutoCameraArmOffset),
				a.AdditionEqual(this.CameraGuideController.CurrentCameraArmOffset),
				a.AdditionEqual(this.CurrentCamera.ArmOffset),
				(a.Z += r),
				e.Quaternion())).RotateVector(
				Vector_1.Vector.ForwardVectorProxy,
				this.CameraForward,
			),
				this.CurrentCamera.ArmRotation.Vector(this.QPr),
				this.CameraForward.Multiply(-i, this.QPr),
				a.Addition(this.QPr, this.TempDesireLocation),
				this.TempVector.DeepCopy(this.CurrentCamera.CameraOffset),
				void 0 !== this.CameraFocusController.AddCameraOffsetY &&
					(this.TempVector.Y += this.CameraFocusController.AddCameraOffsetY),
				r.RotateVector(this.TempVector, this.QPr),
				this.TempDesireLocation.AdditionEqual(this.QPr),
				this.CameraLocation.DeepCopy(
					this.CameraCollision.CheckCollision(
						this.PlayerLocation,
						this.TempDesireLocation,
						t,
					),
				),
				this.SetRotationInternal(e),
				this.CameraLocation.ContainsNaN()
					? Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Camera",
							58,
							"CameraLocation Contains NaN: " + this.CameraLocation.ToString(),
						)
					: this.CameraActor.K2_SetActorLocationAndRotation(
							this.CameraLocation.ToUeVector(),
							e.ToUeRotator(),
							!0,
							void 0,
							!1,
						),
				this.CameraLocation.Subtraction(this.PlayerLocation, this.TempVector),
				(this.$Pr = this.TempVector.Size());
		} else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error("Character", 23, "Character 不存在");
	}
	URo() {
		let t = this.DesiredCamera.ArmRotation.Pitch,
			e =
				((t = 180 < (t %= 360) ? t - 360 : t),
				(t = MathUtils_1.MathUtils.Clamp(
					t,
					this.CurrentCamera.PitchLimitMin,
					this.CurrentCamera.PitchLimitMax,
				)),
				(this.DesiredCamera.ArmRotation.Pitch = t < 0 ? t + 360 : t),
				this.CurrentCamera.PitchLimitMax),
			r = this.DesiredCamera.LookUpOffsetZ;
		t < 0 &&
			((t = Math.abs(t)),
			(e = Math.abs(this.CurrentCamera.PitchLimitMin)),
			(r = this.DesiredCamera.LookDownOffsetZ));
		var a = MathUtils_1.MathUtils.RangeClamp(t, 0, e, 0, r);
		this.DesiredCamera.ArmLocation.Z += a;
	}
	uxr() {
		var t = this.CurrentCamera.YawLimitMin,
			e = this.CurrentCamera.YawLimitMax,
			r = (e - t) % 360;
		if (
			MathUtils_1.MathUtils.IsNearlyZero(r) ||
			MathUtils_1.MathUtils.IsNearlyEqual(r, 360)
		)
			this.DesiredCamera.ArmRotation.Yaw = MathUtils_1.MathUtils.Clamp(
				MathUtils_1.MathUtils.WrapAngle(this.DesiredCamera.ArmRotation.Yaw),
				this.CurrentCamera.WorldYawMin,
				this.CurrentCamera.WorldYawMax,
			);
		else {
			(r = MathUtils_1.MathUtils.WrapAngle(
				this.Character.CharacterActorComponent.ActorRotationProxy.Yaw,
			)),
				(t = MathUtils_1.MathUtils.WrapAngle(r + t)),
				(r = MathUtils_1.MathUtils.WrapAngle(r + e)),
				(e = MathUtils_1.MathUtils.WrapAngle(
					this.DesiredCamera.ArmRotation.Yaw,
				));
			let a = 0,
				i = 0;
			if (t < r && (r < e || e < t))
				(a = MathUtils_1.MathUtils.WrapAngle(0.5 * (t + r))),
					(i = MathUtils_1.MathUtils.WrapAngle(e < a ? t : r));
			else {
				if (!(r < t && r < e && e < t)) return;
				(a = MathUtils_1.MathUtils.WrapAngle(0.5 * (r + t))),
					(i = MathUtils_1.MathUtils.WrapAngle(e > a ? t : r));
			}
			this.DesiredCamera.ArmRotation.Yaw = MathUtils_1.MathUtils.Clamp(
				i,
				this.CurrentCamera.WorldYawMin,
				this.CurrentCamera.WorldYawMax,
			);
		}
	}
	QRn(t, e) {
		return (
			!MathUtils_1.MathUtils.IsNearlyEqual(t, -MathUtils_1.PI_DEG) ||
			!MathUtils_1.MathUtils.IsNearlyEqual(e, MathUtils_1.PI_DEG)
		);
	}
	DrawCube(t, e, r) {
		var a, i, o;
		t &&
			((r = new UE.LinearColor(r, r, r, r)),
			(o = t.GetLocation()),
			(a = new UE.Vector(10, 10, 10)),
			(a = new UE.Vector(0.5 * a.X, 0.5 * a.Y, 0.5 * a.Z)),
			(i = t.Rotator()),
			UE.KismetSystemLibrary.DrawDebugBox(
				GlobalData_1.GlobalData.World,
				o,
				a,
				r,
				i,
				e,
				30,
			),
			(o = UE.KismetMathLibrary.TransformLocation(
				t,
				new UE.Vector(0.5, 0.5, 0.5),
			)),
			(a = UE.KismetMathLibrary.TransformLocation(
				t,
				new UE.Vector(-0.5, -0.5, -0.5),
			)),
			UE.KismetSystemLibrary.DrawDebugLine(
				GlobalData_1.GlobalData.World,
				o,
				a,
				r,
				e,
				15,
			),
			(i = UE.KismetMathLibrary.TransformLocation(
				t,
				new UE.Vector(0.5, -0.5, 0.5),
			)),
			(o = UE.KismetMathLibrary.TransformLocation(
				t,
				new UE.Vector(-0.5, 0.5, 0.5),
			)),
			UE.KismetSystemLibrary.DrawDebugLine(
				GlobalData_1.GlobalData.World,
				i,
				o,
				r,
				e,
				15,
			));
	}
	sxr() {
		var t, e, r;
		this.qPr &&
			(t = this.CharacterEntityHandle?.Entity?.GetComponent(29))?.Valid &&
			(this.GPr?.HasTag(428837378)
				? this.TargetEntity &&
					(this.CameraInputController.SetAimAssistTarget(
						this.TargetEntity,
						this.TargetSocketName,
					),
					(this.TargetEntity = void 0),
					(this.TargetSocketName = void 0),
					(this.NPr = void 0),
					t.ExitLockDirection())
				: ((e = t?.GetTargetInfo()),
					(r = this.GPr?.HasAnyTag([-1150819426, 1260125908])),
					e?.ShowTarget?.Valid &&
						(r || e.LastSetTime + 100 > Time_1.Time.WorldTime) &&
						((this.TargetEntity = e?.ShowTarget),
						(this.TargetSocketName = FNameUtil_1.FNameUtil.GetDynamicFName(
							e.SocketName,
						)),
						(this.NPr = this.TargetEntity.Entity.GetComponent(185))),
					e?.ShowTarget?.Valid
						? this.TargetEntity &&
							this.Exr(t, r) &&
							((this.TargetEntity = void 0),
							(this.TargetSocketName = void 0),
							(this.NPr = void 0),
							t.SetShowTarget(void 0))
						: ((this.TargetEntity = void 0),
							(this.TargetSocketName = void 0),
							(this.NPr = void 0))));
	}
	Exr(t, e) {
		if (!this.TargetEntity.Valid || !this.TargetEntity.Entity.Active) return !0;
		var r = this.TargetEntity.Entity.GetComponent(1),
			a = this.CharacterEntityHandle.Entity.GetComponent(3);
		if (!r?.Valid || !a?.Valid) return !0;
		if (e) this.nxr(this.TargetLocation);
		else {
			if (((e = this.GPr), e?.Valid)) {
				if (e.HasTag(504239013)) return !0;
				if (!this.NPr?.HasTag(-336338240) && t.SpeedUpCleanTarget()) return !0;
			}
			if (
				((e = this.CharacterEntityHandle.Entity.GetComponent(52)),
				e?.Valid && this.CameraFocusController.ShouldSoftUnlock())
			)
				return !0;
			if (
				(this.nxr(this.TargetLocation),
				this.IsTargetLocationValid &&
					t.TraceDetectBlock(
						a.ActorLocationProxy,
						this.TargetLocation,
						r.Owner,
					))
			)
				if (this.OPr) {
					if (this.OPr < Time_1.Time.Now) return !0;
				} else this.OPr = Time_1.Time.Now + 1e3;
			else this.OPr = void 0;
		}
		return !1;
	}
	SetInputEnable(t, e) {
		this.CameraInputController.SetInputEnable(t, e);
	}
	RefreshPlayerLocation() {
		var t;
		this.xXe(this.PlayerLocation),
			this.ContainsTag(-648310348) &&
				(t = this.CharacterEntityHandle?.Entity.GetComponent(47)) &&
				(t = EntitySystem_1.EntitySystem.GetComponent(t.RoleId, 1)) &&
				this.CameraCollision.TraceCheckPlayerLocation(
					t.ActorLocationProxy,
					this.PlayerLocation,
					this.PlayerLocation,
				);
	}
	xXe(t) {
		this.CharacterEntityHandle?.Entity.GetComponent(160).GetCameraPosition(t),
			this.Character?.Mesh &&
				(this.TempVector.FromUeVector(
					this.Character.Mesh.GetSocketLocation(
						CharacterNameDefines_1.CharacterNameDefines.ROOT,
					),
				),
				t.AdditionEqual(this.TempVector),
				this.TempVector2.FromUeVector(
					this.Character.Mesh.K2_GetComponentLocation(),
				),
				t.SubtractionEqual(this.TempVector2));
	}
	CheckPositionInScreen(t, e, r, a, i) {
		var o = Global_1.Global.CharacterController;
		return (
			!!UE.GameplayStatics.ProjectWorldToScreen(
				o,
				t.ToUeVector(),
				this.fti,
				!1,
			) &&
			((o = (0, puerts_1.$unref)(this.fti)),
			this.GetScreenPositionIsInRange(o, e, r, a, i))
		);
	}
	GetScreenPositionIsInRange(t, e, r, a, i) {
		Global_1.Global.CharacterController.GetViewportSize(this.ZPr, this.exr);
		var o = (0, puerts_1.$unref)(this.ZPr),
			s = (0, puerts_1.$unref)(this.exr);
		return t.X > o * e && t.X < o * r && t.Y > s * a && t.Y < s * i;
	}
	AdjustPitch(t) {
		var e = t.Size2D() + this.DefaultPitchHorizontalOffset;
		t = t.Z + this.DefaultPitchVerticalOffset;
		let r = Math.atan2(t, e) * MathUtils_1.MathUtils.RadToDeg;
		return (
			(r =
				r < this.DefaultPitchInRangeCenter
					? MathUtils_1.MathUtils.RangeClamp(
							r,
							this.DefaultPitchInRangeMin,
							this.DefaultPitchInRangeCenter,
							this.DefaultPitchOutRangeMin,
							this.DefaultPitchOutRangeCenter,
						)
					: MathUtils_1.MathUtils.RangeClamp(
							r,
							this.DefaultPitchInRangeCenter,
							this.DefaultPitchInRangeMax,
							this.DefaultPitchOutRangeCenter,
							this.DefaultPitchOutRangeMax,
						)),
			this.TargetEntity?.Valid &&
				(t = this.TargetEntity.Entity.GetComponent(3)) &&
				((e = this.Character.CharacterActorComponent.FloorLocation),
				(t = t.FloorLocation.Z - e.Z) < 0) &&
				(r += MathUtils_1.MathUtils.Lerp(
					this.AdditionPitchMax,
					this.AdditionPitchMin,
					this.AdditionPitchCurve.GetCurrentValue(
						Math.abs(t) / this.AdditionPitchDeltaHeight,
					),
				)),
			r
		);
	}
	ContainsTag(t) {
		return !!this.qPr && this.GPr.HasTag(t);
	}
	ContainsAnyTag(t) {
		return !!this.qPr && this.GPr.HasAnyTag(t);
	}
	GetUsingGoBattle() {
		return (
			!!this.qPr &&
			this.CharacterEntityHandle.Entity.GetComponent(81).GoBattleSkill
		);
	}
	TargetContainsTag(t) {
		return this.NPr?.HasTag(t) ?? !1;
	}
	SetRotationInternal(t) {
		this.CameraRotation.DeepCopy(t),
			this.qPr &&
				this.CharacterController?.SetControlRotation(
					this.CameraRotation.ToUeRotator(),
				);
	}
	SetIsDitherEffectEnable(t) {
		this.XPr = t;
	}
	mxr() {
		if (
			this.qPr &&
			this.Character.CharacterActorComponent?.Active &&
			1 !== ModelManager_1.ModelManager.CameraModel.CameraMode &&
			!this.GPr?.HasTag(-2100129479) &&
			this.XPr
		) {
			this.xXe(this.PlayerLocation);
			var t = Vector_1.Vector.Dist(this.PlayerLocation, this.CameraLocation);
			let e = 1;
			t < this.StartHideDistance &&
				(e = MathUtils_1.MathUtils.RangeClamp(
					t,
					this.StartHideDistance,
					this.CompleteHideDistance,
					this.StartDitherValue,
					0.01,
				));
			let r = 1;
			(t = MathUtils_1.MathUtils.WrapAngle(
				this.CurrentCamera.ArmRotation.Pitch,
			)) > this.StartHidePitch &&
				(r = MathUtils_1.MathUtils.RangeClamp(
					t,
					this.StartHidePitch,
					this.CompleteHidePitch,
					this.StartDitherValue,
					0.01,
				)),
				(t = Math.min(e, r)),
				this.Character.SetDitherEffect(t, 1);
		}
	}
	dxr() {
		var t;
		this.YPr &&
			(t = this.CameraActor?.CameraComponent?.PostProcessSettings) &&
			(t.DepthOfFieldFocalDistance = Vector_1.Vector.Dist(
				this.PlayerLocation,
				this.CameraLocation,
			));
	}
	Zyn() {
		var t;
		(this.zyn < 80 && this.CurrentCamera.Fov < 80) ||
			(this.zyn >= 80 && this.CurrentCamera.Fov >= 80) ||
			((t = this.CurrentCamera.Fov >= 80 ? 0 : this.Jyn),
			UE.KismetSystemLibrary.ExecuteConsoleCommand(
				GlobalData_1.GlobalData.World,
				"r.LandscapeReverseLODScaleFactor " + t,
			));
	}
	OpenFocusInputController(t, e, r, a) {
		this.CameraFocusController.InitFocusData(t, e, r, a);
	}
	ResetFightCameraLogic(t = !0) {
		this.xXe(this.PlayerLocation),
			this.CurrentCamera.ArmLocation.DeepCopy(this.PlayerLocation),
			this.TmpArmLocation.DeepCopy(this.PlayerLocation),
			this.CameraCollision.ResetBlendData(),
			this.CameraConfigController.CheckIfInAdjustCamera() &&
				t &&
				this.RestoreCameraFromAdjust();
	}
	PlaySettlementCamera() {
		this.SettlementCamera.PlaySettlementCamera();
	}
	PlayCameraRotator(t, e, r, a) {
		this.CameraRotatorController.PlayCameraRotator(t, e, r, a);
	}
	PlayCameraRotatorWithCurve(t, e, r, a, i = void 0) {
		this.CameraRotatorController.PlayCameraRotatorWithCurve(
			t,
			e,
			r,
			a,
			this.CameraRotateToTargetMinAlpha,
			this.CameraRotateToTargetMaxAlpha,
			i || this.CameraRotateToTargetCurve,
		);
	}
	PlayCameraEulerRotator(t, e) {
		this.CameraRotatorController.PlayCameraEulerRotator(t, e);
	}
	PlayCameraEulerRotatorWithCurve(t, e, r = void 0) {
		this.CameraRotatorController.PlayCameraEulerRotatorWithCurve(
			t,
			e,
			this.CameraRotateToTargetMinAlpha,
			this.CameraRotateToTargetMaxAlpha,
			r || this.CameraRotateToTargetCurve,
		);
	}
	ResetFocus() {
		var t = (e = this.Entity.GetComponent(3)).ActorLocationProxy,
			e = e.ActorForwardProxy;
		(this.JPr.X = t.X + 1e3 * e.X),
			(this.JPr.Y = t.Y + 1e3 * e.Y),
			(this.JPr.Z = t.Z + 1e3 * e.Z),
			this.PlayCameraRotatorWithCurve(t, this.JPr, this.zPr, 0.2);
	}
	EnterSpecialGameplayCamera(t) {
		return (
			this.CameraSpecialGameplayController.EnterSpecialGameplayController(t),
			this.CameraSpecialGameplayController.CameraActor
		);
	}
	ExitSpecialGameplayCamera() {
		this.CameraSpecialGameplayController.ExitSpecialGameplayController();
	}
	RestoreCameraFromAdjust(t) {
		Log_1.Log.CheckInfo() && Log_1.Log.Info("Camera", 46, "Adjust相机恢复"),
			this.CameraConfigController.DisableHookConfig(t),
			RenderUtil_1.RenderUtil.EnableVelocityScreenSizeCull(),
			this.ExitCameraSpline(),
			this.ExitDepthOfField(),
			CameraController_1.CameraController.SequenceCamera.PlayerComponent.SetPlayCameraSequenceEnabled(
				!0,
			),
			CameraController_1.CameraController.SceneCamera.PlayerComponent.ExitFixSceneSubCamera(),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.SetCameraAimVisible,
				!1,
				0,
			),
			ModelManager_1.ModelManager.InteractionModel.RecoverInteractFromLock();
	}
});
(FightCameraLogicComponent = FightCameraLogicComponent_1 =
	__decorate(
		[(0, RegisterComponent_1.RegisterComponent)(5)],
		FightCameraLogicComponent,
	)),
	(exports.FightCameraLogicComponent = FightCameraLogicComponent);
