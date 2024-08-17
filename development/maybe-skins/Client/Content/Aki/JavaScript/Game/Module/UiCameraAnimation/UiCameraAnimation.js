"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiCameraAnimation = void 0);
const UE = require("ue"),
	CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
	Log_1 = require("../../../Core/Common/Log"),
	ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
	Vector_1 = require("../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	StringUtils_1 = require("../../../Core/Utils/StringUtils"),
	TimeUtil_1 = require("../../Common/TimeUtil"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	UiCameraAnimationManager_1 = require("./UiCameraAnimationManager");
class UiCameraAnimation {
	constructor() {
		(this.oUo = void 0),
			(this.rUo = void 0),
			(this.nUo = 0),
			(this.I1e = void 0),
			(this.sUo = void 0),
			(this.qae = void 0),
			(this.aUo = void 0),
			(this.hUo = void 0),
			(this.lUo = void 0),
			(this._Uo = void 0),
			(this.uUo = -0),
			(this.cUo = void 0),
			(this.mUo = new Map()),
			(this.dUo = -0),
			(this.CUo = void 0),
			(this.gUo = void 0),
			(this.fUo = void 0),
			(this.pUo = void 0),
			(this.vUo = () => {
				this.MUo();
			});
	}
	async AsyncPlayUiCameraAnimation(t, i, o) {
		return this.SUo(), this.PlayUiCameraAnimation(t, i, o), this.EUo().Promise;
	}
	SUo() {
		this.CUo || (this.CUo = new CustomPromise_1.CustomPromise());
	}
	EUo() {
		return this.CUo;
	}
	async WaitCameraAnimationFinished() {
		return this.SUo(), this.EUo().Promise;
	}
	PlayUiCameraAnimation(t, i, o) {
		this.ResetUiCameraBlendAnimation(),
			i.CanApplyAnimationHandle()
				? this.yUo(t, o, i)
					? (Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"CameraAnimation",
								8,
								"播放界面摄像机动画------开始",
								["fromHandleName", t.ToString()],
								["toHandleName", i.ToString()],
								["blendDataName", o],
								["timeLength", this.dUo],
							),
						this.oUo.Deactivate(),
						UiCameraAnimationManager_1.UiCameraAnimationManager.UiCameraSpringStructure.SetCameraActorRelativeLocation(
							Vector_1.Vector.ZeroVector,
						),
						this.oUo.SetWidgetCameraAttachToAnimationActor(),
						this.dUo <= 0
							? (Log_1.Log.CheckInfo() &&
									Log_1.Log.Info(
										"CameraAnimation",
										8,
										"播放界面摄像机动画时间<=0，会立马结束动画",
										["timeLength", this.dUo],
									),
								this.IUo())
							: (this.TUo(),
								this.LUo(
									this.rUo.LevelSequence,
									this.rUo.PlayRate,
									this.rUo.bReverse,
								)))
					: Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"CameraAnimation",
							8,
							"刷新动画数据失败",
							["fromHandleName", t.ToString()],
							["toHandleName", i.ToString()],
							["blendDataName", o],
						)
				: Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"CameraAnimation",
						8,
						"无法播放镜头动画：原因是找不到对应插槽或骨骼模型为空",
						["toHandleData", i.ToString()],
					);
	}
	yUo(t, i, o) {
		return (
			(this.gUo = t),
			(this.fUo = o),
			(this.oUo =
				UiCameraAnimationManager_1.UiCameraAnimationManager.GetCurrentCameraHandle()),
			(this.rUo =
				ConfigManager_1.ConfigManager.UiCameraAnimationConfig.GetUiCameraAnimationBlendData(
					i,
				)),
			!!(this.oUo && this.rUo && this.gUo) &&
				((t =
					UiCameraAnimationManager_1.UiCameraAnimationManager
						.UiCameraSpringStructure),
				(o =
					UiCameraAnimationManager_1.UiCameraAnimationManager
						.UiCameraPostEffectComponent),
				this.DUo(
					t.GetActorLocation(),
					t.GetActorRotation(),
					t.GetSpringArmLength(),
					t.GetSpringRelativeLocation(),
					t.GetSpringRelativeRotation(),
					o.GetFieldOfView(),
					o.GetManualFocusDistance(),
					o.GetCurrentAperture(),
					o.GetPostProcessBlendWeight(),
					this.rUo.Time,
				),
				!0)
		);
	}
	DUo(t, i, o, e, a, s, r, n, U, h) {
		(this.I1e = t),
			(this.sUo = i),
			(this.qae = o),
			(this.aUo = e),
			(this.hUo = a),
			(this.lUo = s),
			(this._Uo = r),
			(this.uUo = n),
			(this.cUo = U),
			(this.dUo = h);
	}
	StopUiCameraAnimation() {
		var t;
		this.fUo &&
			(Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"CameraAnimation",
					8,
					"播放界面摄像机动画------停止",
					["fromHandleName", this.gUo?.ToString()],
					["toHandleName", this.fUo?.ToString()],
				),
			this.CUo &&
				((t = {
					FinishType: 1,
					FromHandleData: this.gUo,
					ToHandleData: this.fUo,
				}),
				this.CUo.SetResult(t),
				(this.CUo = void 0)),
			this.MUo(!0, 1),
			this.ResetUiCameraBlendAnimation());
	}
	IUo() {
		var t;
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info(
				"CameraAnimation",
				8,
				"播放界面摄像机动画------完成",
				["fromHandleName", this.gUo.ToString()],
				["toHandleName", this.fUo?.ToString()],
			),
			this.CUo &&
				((t = {
					FinishType: 0,
					FromHandleData: this.gUo,
					ToHandleData: this.fUo,
				}),
				this.CUo.SetResult(t),
				(this.CUo = void 0)),
			this.MUo(),
			this.ResetUiCameraBlendAnimation();
	}
	ResetUiCameraBlendAnimation() {
		(this.rUo = void 0),
			(this.oUo = void 0),
			(this.gUo = void 0),
			(this.fUo = void 0),
			(this.I1e = void 0),
			(this.sUo = void 0),
			(this.qae = void 0),
			(this.aUo = void 0),
			(this.hUo = void 0),
			(this.lUo = void 0),
			(this._Uo = void 0),
			(this.cUo = void 0),
			(this.nUo = 0),
			(this.dUo = 0),
			(this.pUo = void 0),
			this.mUo.clear();
	}
	LUo(t, i, o) {
		var e;
		UE.KismetSystemLibrary.IsValidSoftObjectReference(t) &&
			(this.MUo(!0, 1),
			(e =
				UiCameraAnimationManager_1.UiCameraAnimationManager
					.UiCameraSequenceComponent).AddUiCameraSequenceFinishedCallback(
				this.vUo,
			),
			e.LoadAndPlayUiCameraSequence(t, i, o));
	}
	MUo(t = !0, i = 0) {
		UiCameraAnimationManager_1.UiCameraAnimationManager.UiCameraSequenceComponent?.DestroyUiCameraSequence(
			t,
			i,
		);
	}
	Tick(t) {
		this.rUo &&
			this.oUo &&
			((this.nUo += t / TimeUtil_1.TimeUtil.InverseMillisecond),
			this.nUo >= this.dUo
				? this.IUo()
				: this.fUo &&
					((t = this.fUo.GetUiCameraAnimationConfig()),
					this.RUo(t.LocationType),
					this.UUo(),
					this.AUo(this.fUo.GetTargetArmLength()),
					this.PUo(this.fUo.GetTargetArmOffsetLocation()),
					this.xUo(this.fUo.GetTargetArmOffsetRotation()),
					this.wUo(this.fUo.GetTargetFieldOfView()),
					this.BUo(this.fUo.GetTargetFocalDistance()),
					this.bUo(this.fUo.GetTargetAperture()),
					this.qUo(this.fUo.GetTargetPostProcessBlendWeight())));
	}
	IsPlaying() {
		return this.nUo < this.dUo;
	}
	RUo(t) {
		var i = this.fUo.GetTargetLocation();
		i && this.GUo(i, 0 !== t);
	}
	UUo() {
		var t = this.fUo.GetTargetRotation();
		t && this.NUo(t);
	}
	GUo(t, i) {
		var o = this.OUo(1);
		void 0 !== o &&
			((t = UE.KismetMathLibrary.VLerp(this.I1e, t, o)),
			i
				? this.oUo.SetUiCameraAnimationRelativeLocation(t)
				: this.oUo.SetUiCameraAnimationLocation(t));
	}
	NUo(t) {
		var i = this.OUo(2);
		i &&
			((t = UE.KismetMathLibrary.RLerp(this.sUo, t, i, !0)),
			this.oUo.SetUiCameraAnimationRotation(t));
	}
	AUo(t) {
		var i = this.OUo(3);
		i &&
			((t = MathUtils_1.MathUtils.Lerp(this.qae, t, i)),
			this.oUo.SetSpringArmLength(t));
	}
	PUo(t) {
		var i = this.OUo(4);
		i &&
			((t = UE.KismetMathLibrary.VLerp(this.aUo, t, i)),
			this.oUo.SetSpringArmRelativeLocation(t));
	}
	xUo(t) {
		var i = this.OUo(5);
		i &&
			((t = UE.KismetMathLibrary.RLerp(this.hUo, t, i, !0)),
			this.oUo.SetSprintArmRelativeRotation(t));
	}
	wUo(t) {
		var i = this.OUo(6);
		i &&
			((t = MathUtils_1.MathUtils.Lerp(this.lUo, t, i)),
			this.oUo.SetCameraFieldOfView(t));
	}
	BUo(t) {
		var i = this.OUo(7);
		i &&
			((t = MathUtils_1.MathUtils.Lerp(this._Uo, t, i)),
			this.oUo.SetCameraFocalDistance(t));
	}
	bUo(t) {
		var i = this.OUo(9);
		i &&
			((t = MathUtils_1.MathUtils.Lerp(this.uUo, t, i)),
			this.oUo.SetCameraAperture(t));
	}
	qUo(t) {
		var i = this.OUo(8);
		i &&
			((t = MathUtils_1.MathUtils.Lerp(this.cUo, t, i)),
			this.oUo.SetCameraPostProcessBlendWeight(t));
	}
	OUo(t) {
		return this.GetCurveFloatValue(t, this.nUo);
	}
	TUo() {
		var t;
		if (
			(this.pUo?.IsValid() ||
				((t = this.rUo?.CommonCurve),
				UE.KismetSystemLibrary.IsValidSoftObjectReference(t) &&
					((t = t.ToAssetPathName()),
					StringUtils_1.StringUtils.IsEmpty(t) ||
						ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.CurveFloat, (t) => {
							this.pUo = t;
						}))),
			this.mUo.size <= 0)
		) {
			var i = this.rUo?.CurveMap,
				o = i.GetMaxIndex();
			for (let t = 0; t < o; t++) {
				const o = i.GetKey(t).valueOf();
				var e = i.Get(o);
				UE.KismetSystemLibrary.IsValidSoftObjectReference(e) &&
					((e = e.ToAssetPathName()),
					StringUtils_1.StringUtils.IsEmpty(e) ||
						ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.CurveFloat, (t) => {
							this.mUo.set(o, t);
						}));
			}
		}
	}
	GetCurveFloat(t) {
		return (t = this.mUo.get(t)) || this.pUo;
	}
	GetCurveFloatValue(t, i) {
		return i > this.GetTimeLength
			? 1
			: (t = this.GetCurveFloat(t))
				? ((t = t.GetFloatValue(i)), Math.min(t, 1))
				: void 0;
	}
	get GetTimeLength() {
		return this.dUo;
	}
}
exports.UiCameraAnimation = UiCameraAnimation;
