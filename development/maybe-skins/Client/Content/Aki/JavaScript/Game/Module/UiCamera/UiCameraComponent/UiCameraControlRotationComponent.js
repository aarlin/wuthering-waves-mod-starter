"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiCameraControlRotationComponent = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	MathCommon_1 = require("../../../../Core/Utils/Math/MathCommon"),
	Rotator_1 = require("../../../../Core/Utils/Math/Rotator"),
	Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiCameraComponent_1 = require("./UiCameraComponent"),
	UiCameraPostEffectComponent_1 = require("./UiCameraPostEffectComponent");
class VirtualCamera {
	constructor() {
		(this.ArmLength = 0),
			(this.MinArmLength = 0),
			(this.MaxArmLength = 0),
			(this.YawLimitMin = 0),
			(this.YawLimitMax = 0),
			(this.PitchLimitMin = 0),
			(this.PitchLimitMax = 0),
			(this.HeightOffset = 0),
			(this.ArmHeight = 0),
			(this.Aperture = 0),
			(this.LookCenterLocation = Vector_1.Vector.Create()),
			(this.DefaultLookCenterLocation = Vector_1.Vector.Create()),
			(this.ArmRotation = Rotator_1.Rotator.Create());
	}
	DeepCopy(t) {
		(this.ArmLength = t.ArmLength),
			(this.MinArmLength = t.MinArmLength),
			(this.MaxArmLength = t.MaxArmLength),
			(this.YawLimitMin = t.YawLimitMin),
			(this.YawLimitMax = t.YawLimitMax),
			(this.PitchLimitMin = t.PitchLimitMin),
			(this.PitchLimitMax = t.PitchLimitMax),
			(this.HeightOffset = t.HeightOffset),
			(this.ArmHeight = t.ArmHeight),
			(this.Aperture = t.Aperture),
			this.LookCenterLocation.DeepCopy(t.LookCenterLocation),
			this.DefaultLookCenterLocation.DeepCopy(t.DefaultLookCenterLocation),
			this.ArmRotation.DeepCopy(t.ArmRotation);
	}
}
class UiCameraControlRotationComponent extends UiCameraComponent_1.UiCameraComponent {
	constructor() {
		super(...arguments),
			(this.DefaultCamera = new VirtualCamera()),
			(this.LastCamera = new VirtualCamera()),
			(this.CurrentCamera = new VirtualCamera()),
			(this.DesiredCamera = new VirtualCamera()),
			(this.TempLookCenterLocation = Vector_1.Vector.Create()),
			(this.TempCameraForward = Vector_1.Vector.Create()),
			(this.TempCameraVector = Vector_1.Vector.Create()),
			(this.TempCameraLocation = Vector_1.Vector.Create()),
			(this.TempSourceLocation = Vector_1.Vector.Create()),
			(this.oRo = -0),
			(this.rRo = -0),
			(this.nRo = -0),
			(this.sRo = -0),
			(this.aRo = -0),
			(this.hRo = -0),
			(this.lRo = -0),
			(this._Ro = -0),
			(this.uRo = -0),
			(this.cRo = -0),
			(this.mRo = -0),
			(this.dRo = -0),
			(this.CRo = -0),
			(this.gRo = 0),
			(this.fRo = 0),
			(this.pRo = 0),
			(this.vRo = -0),
			(this.MRo = !1),
			(this.SRo = -0),
			(this.ERo = -0),
			(this.yRo = void 0),
			(this.IRo = !1),
			(this.TRo = !1),
			(this.LRo = !1),
			(this.DRo = !1);
	}
	OnActivate() {
		this.EnableTick();
	}
	OnDeactivate() {
		this.RemoveTick();
	}
	InitDataByConfig(t) {
		this.InitData(
			t.倍化手柄输入倍率,
			t.移动端旋转输入倍率,
			t.移动端缩放输入倍率,
			t.镜头Yaw灵敏度系数,
			t.镜头Pitch灵敏度系数,
			t.镜头缩放灵敏度系数,
			t.最小臂长,
			t.最大臂长,
			t.Pitch限制Min,
			t.Pitch限制Max,
			t.相机相对角色的最低高度,
			t.最大臂长时的光圈,
			t.最小臂长时的光圈,
		);
	}
	InitData(t, e, i, a, o, r, h, s, m, n, C, R, L) {
		(this.oRo = t),
			(this.rRo = e),
			(this.nRo = i),
			(this.sRo = a),
			(this.aRo = o),
			(this.hRo = r),
			(this.lRo = C),
			((t = this.DesiredCamera).MinArmLength = h),
			(t.MaxArmLength = s),
			(t.PitchLimitMin = m),
			(t.PitchLimitMax = n),
			(this.dRo = R),
			(this.CRo = L);
	}
	UpdateData(t, e, i, a, o) {
		var r,
			h,
			s = this.GetCameraStructure();
		s &&
			((r = s.GetActorLocation()),
			(h = s.GetSpringRelativeRotation()),
			this.DesiredCamera.ArmRotation.DeepCopy(h),
			this.DesiredCamera.DefaultLookCenterLocation.DeepCopy(r),
			this.TempSourceLocation.DeepCopy(t),
			this.TempCameraLocation.DeepCopy(r),
			(t = Vector_1.Vector.Dist2D(
				this.TempSourceLocation,
				this.TempCameraLocation,
			)),
			(r = h.Pitch),
			(h = MathCommon_1.MathCommon.WrapAngle(r)),
			(r = MathCommon_1.MathCommon.DegreeToRadian(h)),
			(h = t * Math.tan(r) + this.TempCameraLocation.Z),
			(this.TempLookCenterLocation.X = this.TempSourceLocation.X),
			(this.TempLookCenterLocation.Y = this.TempSourceLocation.Y),
			(this.TempLookCenterLocation.Z = h),
			this.DesiredCamera.LookCenterLocation.DeepCopy(
				this.TempLookCenterLocation,
			),
			(this.DesiredCamera.ArmLength = s.GetSpringArmLength()),
			(this.vRo = s.GetSpringArmLength()),
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"UiCamera",
					44,
					"UiCameraControlRotationComponent初始化",
					["初始臂长", this.vRo],
				),
			(this.DesiredCamera.ArmHeight =
				this.TempLookCenterLocation.Z - this.TempSourceLocation.Z - this.lRo),
			(this._Ro = e),
			(this.uRo = i),
			(this.mRo = a),
			(this.cRo = o),
			(this.DesiredCamera.HeightOffset = 0),
			this.DefaultCamera.DeepCopy(this.DesiredCamera),
			this.CurrentCamera.DeepCopy(this.DesiredCamera));
	}
	OnTick(t) {
		this.MRo || this.RRo(t),
			this.uxr(),
			this.URo(),
			this.ARo(),
			this.PRo(t),
			this.xRo();
	}
	wRo() {
		(this.gRo = 0), (this.fRo = 0), (this.pRo = 0);
	}
	RRo(t) {
		let e = this.gRo,
			i = this.fRo,
			a = this.pRo;
		this.wRo(),
			ModelManager_1.ModelManager.PlatformModel.IsGamepad()
				? ((e *= this.oRo), (i *= this.oRo))
				: ModelManager_1.ModelManager.PlatformModel.IsMobile() &&
					((e *= this.rRo), (i *= this.rRo), (a *= this.nRo)),
			(e = e * this.sRo * t),
			(i = i * this.aRo * t),
			(a = a * this.hRo * t),
			MathUtils_1.MathUtils.IsNearlyZero(e) ||
				(this.DesiredCamera.ArmRotation.Yaw += e),
			MathUtils_1.MathUtils.IsNearlyZero(i) ||
				(this.DesiredCamera.ArmRotation.Pitch += i),
			MathUtils_1.MathUtils.IsNearlyZero(a) ||
				(this.DesiredCamera.ArmLength += a);
	}
	uxr() {
		var t = this.DesiredCamera.ArmRotation.Yaw;
		this.DesiredCamera.ArmRotation.Yaw = t = 180 < (t %= 360) ? t - 360 : t;
	}
	URo() {
		var t = this.DesiredCamera.ArmRotation.Pitch;
		t = 180 < (t %= 360) ? t - 360 : t;
		(t = MathUtils_1.MathUtils.Clamp(
			t,
			this.DesiredCamera.PitchLimitMin,
			this.DesiredCamera.PitchLimitMax,
		)),
			(this.DesiredCamera.ArmRotation.Pitch = t);
	}
	ARo() {
		this.DesiredCamera.ArmLength = MathUtils_1.MathUtils.Clamp(
			this.DesiredCamera.ArmLength,
			this.DesiredCamera.MinArmLength,
			this.DesiredCamera.MaxArmLength,
		);
	}
	StartFade(t, e, i, a, o, r) {
		this.LastCamera.DeepCopy(this.CurrentCamera),
			(this.IRo = i),
			(this.TRo = a),
			(this.LRo = o),
			(this.DRo = r),
			(this.MRo = !0),
			(this.SRo = t),
			(this.ERo = 0),
			(this.yRo = e);
	}
	PRo(t) {
		this.MRo && this.yRo
			? ((this.ERo += t),
				this.ERo >= this.SRo
					? ((this.MRo = !1),
						(this.yRo = void 0),
						this.CurrentCamera.DeepCopy(this.DesiredCamera))
					: ((t = this.yRo.GetFloatValue(this.ERo / this.SRo)),
						this.IRo &&
							(this.CurrentCamera.ArmLength = MathUtils_1.MathUtils.Lerp(
								this.LastCamera.ArmLength,
								this.DesiredCamera.ArmLength,
								t,
							)),
						this.TRo &&
							(this.CurrentCamera.ArmRotation.Pitch =
								MathUtils_1.MathUtils.Lerp(
									this.LastCamera.ArmRotation.Pitch,
									this.DesiredCamera.ArmRotation.Pitch,
									t,
								)),
						this.LRo &&
							(this.CurrentCamera.ArmRotation.Yaw = MathUtils_1.MathUtils.Lerp(
								this.LastCamera.ArmRotation.Yaw,
								this.DesiredCamera.ArmRotation.Yaw,
								t,
							)),
						this.DRo &&
							(this.CurrentCamera.ArmRotation.Roll = MathUtils_1.MathUtils.Lerp(
								this.LastCamera.ArmRotation.Roll,
								this.DesiredCamera.ArmRotation.Roll,
								t,
							))))
			: this.CurrentCamera.DeepCopy(this.DesiredCamera);
	}
	xRo() {
		var t = this.CurrentCamera.ArmRotation,
			e =
				(this.TempLookCenterLocation.DeepCopy(
					this.CurrentCamera.LookCenterLocation,
				),
				this.TempLookCenterLocation);
		let i = this.CurrentCamera.ArmLength;
		var a = this.CurrentCamera.ArmRotation.Pitch;
		0 < a &&
			!MathUtils_1.MathUtils.IsNearlyZero(a) &&
			((a = MathCommon_1.MathCommon.WrapAngle(a)),
			(a = MathCommon_1.MathCommon.DegreeToRadian(a)),
			(a = Math.abs(this.CurrentCamera.ArmHeight / Math.sin(a))),
			(a = MathUtils_1.MathUtils.Clamp(
				a,
				this.CurrentCamera.MinArmLength,
				this.CurrentCamera.MaxArmLength,
			)),
			(i = MathUtils_1.MathUtils.Clamp(i, this.CurrentCamera.MinArmLength, a))),
			t
				.Quaternion()
				.RotateVector(
					Vector_1.Vector.ForwardVectorProxy,
					this.TempCameraForward,
				),
			this.TempCameraForward.Multiply(-i, this.TempCameraVector),
			e.Addition(this.TempCameraVector, this.TempCameraLocation),
			this.UpdateHeightOffset(i),
			this.UpdateAperture(i),
			(a = this.CurrentCamera.DefaultLookCenterLocation),
			(this.TempCameraLocation.Z = a.Z + this.CurrentCamera.HeightOffset),
			(e = e.Z - this.CurrentCamera.ArmHeight),
			this.TempCameraLocation.Z < e && (this.TempCameraLocation.Z = e),
			(this.TempCameraLocation.X = a.X),
			(this.TempCameraLocation.Y = a.Y),
			(e = this.GetCameraStructure()) &&
				(e.SetSprintArmRelativeRotation(t.ToUeRotator()),
				e.SetSpringArmLength(i),
				e.SetActorLocation(this.TempCameraLocation.ToUeVector()));
	}
	UpdateHeightOffset(t) {
		t < this.vRo
			? (this.CurrentCamera.HeightOffset = MathUtils_1.MathUtils.RangeClamp(
					t,
					this.cRo,
					this.vRo,
					this.uRo,
					0,
				))
			: (this.CurrentCamera.HeightOffset = MathUtils_1.MathUtils.RangeClamp(
					t,
					this.vRo,
					this.mRo,
					0,
					this._Ro,
				));
	}
	UpdateAperture(t) {
		(this.CurrentCamera.Aperture = MathUtils_1.MathUtils.RangeClamp(
			t,
			this.cRo,
			this.mRo,
			this.CRo,
			this.dRo,
		)),
			this.OwnerUiCamera.GetUiCameraComponent(
				UiCameraPostEffectComponent_1.UiCameraPostEffectComponent,
			)?.SetCameraAperture(this.CurrentCamera.Aperture);
	}
	AddZoomInput(t) {
		this.pRo = t;
	}
	AddYawInput(t) {
		this.gRo = t;
	}
	AddPitchInput(t) {
		this.fRo = t;
	}
	DoMoveForward(t, e, i) {
		(this.DesiredCamera.ArmLength = this.DesiredCamera.ArmLength - t),
			this.StartFade(e, i, !0, !1, !1, !1);
	}
	SetArmLength(t) {
		this.DesiredCamera.ArmLength = t;
	}
	SetArmRotation(t, e, i) {
		(this.DesiredCamera.ArmRotation.Pitch = t),
			(this.DesiredCamera.ArmRotation.Yaw = e),
			(this.DesiredCamera.ArmRotation.Roll = i);
	}
	SetArmRotationByDefaultCamera() {
		var t = this.DefaultCamera.ArmRotation;
		this.SetArmRotation(t.Pitch, t.Yaw, t.Roll);
	}
}
exports.UiCameraControlRotationComponent = UiCameraControlRotationComponent;
