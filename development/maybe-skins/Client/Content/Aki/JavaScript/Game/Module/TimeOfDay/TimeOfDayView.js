"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TimeOfDayView = void 0);
const ue_1 = require("ue"),
	Log_1 = require("../../../Core/Common/Log"),
	CommonDefine_1 = require("../../../Core/Define/CommonDefine"),
	CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
	Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
	Vector_1 = require("../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	GlobalData_1 = require("../../GlobalData"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	UiTickViewBase_1 = require("../../Ui/Base/UiTickViewBase"),
	UiLayer_1 = require("../../Ui/UiLayer"),
	UiCameraAnimationManager_1 = require("../UiCameraAnimation/UiCameraAnimationManager"),
	TimeOfDayController_1 = require("./TimeOfDayController"),
	TimeOfDayDefine_1 = require("./TimeOfDayDefine"),
	TimeOfDayModel_1 = require("./TimeOfDayModel"),
	TodTimeAdjustingAnimation_1 = require("./TodTimeAdjustingAnimation");
class UiItemSwitcher {
	constructor(e, t) {
		(this.NIo = t), (this.OIo = e);
	}
	SwitchTo(e) {
		this.NIo.SetUIActive(e), this.OIo.SetUIActive(!e);
	}
}
class TodTimeAdjustingClock {
	constructor() {
		(this.StartSecond = -1), (this.ToSecond = -1);
	}
	get DeltaSecond() {
		return this.ToSecond - this.StartSecond;
	}
	get DeltaMinute() {
		return (
			Math.floor(this.ToSecond / TimeOfDayDefine_1.TOD_MINUTE_PER_HOUR) -
			Math.floor(this.StartSecond / TimeOfDayDefine_1.TOD_MINUTE_PER_HOUR)
		);
	}
	get DeltaSecondOneDay() {
		return TimeOfDayModel_1.TodDayTime.ConvertToOneDaySecond(this.DeltaSecond);
	}
	get DeltaDayOneDay() {
		return TimeOfDayModel_1.TodDayTime.ConvertToDay(this.DeltaSecondOneDay);
	}
	get ToSecondOneDay() {
		return TimeOfDayModel_1.TodDayTime.ConvertToOneDaySecond(this.ToSecond);
	}
	get StartSecondOneDay() {
		return TimeOfDayModel_1.TodDayTime.ConvertToOneDaySecond(this.StartSecond);
	}
	get IsAdjusting() {
		return 0 <= this.StartSecond;
	}
	get IsTomorrow() {
		return this.ToSecond >= TimeOfDayDefine_1.TOD_SECOND_PER_DAY;
	}
	get DayTextId() {
		switch (Math.floor(this.ToSecond / TimeOfDayDefine_1.TOD_SECOND_PER_DAY)) {
			case 2:
				return ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
					"TimeOfDayPlusTwoDay",
				);
			case 1:
				return ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
					"TimeOfDayTomorrow",
				);
			default:
				return ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
					"TimeOfDayToday",
				);
		}
	}
	get IsAdjustingMoreThanOneDay() {
		return this.DeltaSecond >= TimeOfDayDefine_1.TOD_SECOND_PER_DAY;
	}
	get IsAdjustingMoreThanMinLimit() {
		return this.DeltaMinute >= TimeOfDayDefine_1.TOD_MIN_ADJUST_MINUTE;
	}
	get IsAdjustingToMaxLimit() {
		return (
			this.DeltaSecond >=
			TimeOfDayDefine_1.TOD_MAX_ADJUST_DAY *
				TimeOfDayDefine_1.TOD_SECOND_PER_DAY
		);
	}
	Start() {
		(this.StartSecond =
			ModelManager_1.ModelManager.TimeOfDayModel.GameTime.Second),
			(this.ToSecond = this.StartSecond);
	}
	Reset() {
		(this.StartSecond = -1), (this.ToSecond = -1);
	}
	AdjustToSecond(e, t) {
		if (!e || isNaN(e)) return [!1, 0];
		if (!this.IsAdjusting) return [!1, 0];
		let o = 0;
		if (t) {
			if (
				(o = this.ToSecond + e) >
				this.StartSecond +
					TimeOfDayDefine_1.TOD_MAX_ADJUST_DAY *
						TimeOfDayDefine_1.TOD_SECOND_PER_DAY
			)
				return [
					!1,
					this.StartSecond +
						TimeOfDayDefine_1.TOD_MAX_ADJUST_DAY *
							TimeOfDayDefine_1.TOD_SECOND_PER_DAY -
						this.ToSecond,
				];
		} else if ((o = this.ToSecond - e) < this.StartSecond)
			return [!1, this.ToSecond - this.StartSecond];
		return (this.ToSecond = o), [!0, 0];
	}
	AdjustStartSecond(e) {
		e &&
			!isNaN(e) &&
			this.IsAdjusting &&
			((this.StartSecond = e), this.StartSecond > this.ToSecond) &&
			(this.StartSecond = this.ToSecond);
	}
	DebugPrint() {
		Log_1.Log.CheckWarn() &&
			Log_1.Log.Warn(
				"TimeOfDay",
				17,
				"TodTimeAdjustingClock",
				["this.StartSecond", this.StartSecond],
				["this.ToSecond", this.ToSecond],
			);
	}
}
class TimeOfDayView extends UiTickViewBase_1.UiTickViewBase {
	constructor() {
		super(...arguments),
			(this.kIo = Vector_1.Vector.Create()),
			(this.FIo = Vector_1.Vector.Create()),
			(this.gme = Vector_1.Vector.Create()),
			(this.fz = Vector_1.Vector.Create()),
			(this.VIo = Vector_1.Vector.Create()),
			(this.HIo = Rotator_1.Rotator.Create()),
			(this.jIo = Rotator_1.Rotator.Create(0, 0, 180)),
			(this.WIo = new Map()),
			(this.KIo = void 0),
			(this.QIo = void 0),
			(this.XIo = void 0),
			(this.$Io = void 0),
			(this.NFt = void 0),
			(this.YIo = () => {
				if (!this.QIo.IsAdjusting) {
					var e =
						ModelManager_1.ModelManager.TimeOfDayModel.GameTime
							.HourMinuteString;
					this.GetText(0).SetText(e), this.GetText(4).SetText(e);
					const t =
						ModelManager_1.ModelManager.TimeOfDayModel.GameTime.DayState;
					this.WIo.forEach((e, o) => {
						e.SwitchTo(o === t);
					}),
						(this.HIo.Yaw = this.JIo(
							ModelManager_1.ModelManager.TimeOfDayModel.GameTime.Second,
						)),
						this.GetTexture(16).SetUIRelativeRotation(this.HIo.ToUeRotator()),
						this.GetItem(17).SetUIRelativeRotation(this.HIo.ToUeRotator()),
						this.GetItem(25).SetUIRelativeRotation(this.HIo.ToUeRotator()),
						this.GetItem(18).SetUIRelativeRotation(this.jIo.ToUeRotator()),
						this.GetItem(19).SetUIRelativeRotation(this.jIo.ToUeRotator());
				}
			}),
			(this.zIo = (e) => {
				this.QIo.IsAdjusting ||
					(this.QIo.Start(),
					this.kIo.DeepCopy(e.pointerPosition),
					this.FIo.DeepCopy(e.pointerPosition),
					(this.jIo.Yaw = this.JIo(this.QIo.StartSecond)),
					this.GetItem(19).SetUIRelativeRotation(this.jIo.ToUeRotator()),
					this.GetItem(18).SetUIRelativeRotation(this.jIo.ToUeRotator()),
					this.GetTexture(2).SetFillDirectionFlip(!1),
					this.GetTexture(3).SetFillDirectionFlip(!1));
			}),
			(this.ZIo = (e) => {
				var t, o;
				this.FIo.IsZero() || this.kIo.IsZero()
					? (this.FIo.DeepCopy(e.pointerPosition),
						this.kIo.DeepCopy(e.pointerPosition))
					: ((e = Vector_1.Vector.Create(e.pointerPosition)),
						(t = this.eTo(this.FIo, e)),
						(o = this.tTo(this.FIo, e)),
						(o = this.iTo(o)),
						(o = this.QIo.AdjustToSecond(o, t))[0]
							? this.FIo.DeepCopy(e)
							: o[1] &&
								(this.QIo.AdjustToSecond(o[1], t), this.FIo.DeepCopy(this.kIo)),
						this.oTo());
			}),
			(this.rTo = (e) => {
				this.FIo.DeepCopy(Vector_1.Vector.ZeroVectorProxy),
					this.kIo.DeepCopy(Vector_1.Vector.ZeroVectorProxy);
			}),
			(this.nTo = (e, t) => {
				t &&
					(this.kIo.DeepCopy(Vector_1.Vector.ZeroVectorProxy),
					this.FIo.DeepCopy(Vector_1.Vector.ZeroVectorProxy),
					(t = ue_1.LGUIBPLibrary.GetUIItemPositionInViewPort(
						GlobalData_1.GlobalData.World,
						this.GetItem(17),
					)),
					(this.KIo = Vector_1.Vector.Create(t.X, t.Y, 0)));
			}),
			(this.Lli = () => {
				TimeOfDayController_1.TimeOfDayController.AdjustTime(
					this.QIo.ToSecond,
					Protocol_1.Aki.Protocol.pOs.Proto_PlayerOperate,
				),
					TimeOfDayController_1.TimeOfDayController.PauseTime(),
					UiLayer_1.UiLayer.SetShowNormalMaskLayer(!0),
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"Test",
							8,
							"OnClickBtnConfirm:" +
								ModelManager_1.ModelManager.CameraModel.CurrentCameraActor.GetName(),
						);
				var e = CommonParamById_1.configCommonParamById.GetIntConfig(
						"TimeCameraSettingName",
					),
					t = CommonParamById_1.configCommonParamById.GetIntConfig(
						"TimeCameraBlendDataName",
					);
				(this.NFt =
					UiCameraAnimationManager_1.UiCameraAnimationManager.PlayCameraAnimationFromCurrent(
						e.toString(),
						t.toString(),
					)),
					(t =
						ConfigManager_1.ConfigManager.UiCameraAnimationConfig.GetUiCameraAnimationConfig(
							e.toString(),
						));
				this.sTo(),
					(this.$Io = TimerSystem_1.TimerSystem.Delay(() => {
						this.aTo(), this.XIo.Play(this.QIo.StartSecond, this.QIo.ToSecond);
					}, CommonDefine_1.MILLIONSECOND_PER_SECOND * t.BlendInTime));
			}),
			(this.xhi = () => {
				this.CloseMe();
			}),
			(this.aTo = () => {
				(this.jIo.Yaw = this.JIo(this.QIo.ToSecond)),
					this.GetTexture(2).SetFillDirectionFlip(!0),
					this.GetTexture(3).SetFillDirectionFlip(!0),
					this.GetItem(18).SetUIRelativeRotation(this.jIo.ToUeRotator()),
					this.GetItem(19).SetUIRelativeRotation(this.jIo.ToUeRotator()),
					this.GetItem(23).SetUIActive(!1),
					this.GetItem(24).SetUIActive(!1);
			}),
			(this.hTo = (e) => {
				this.QIo.AdjustStartSecond(e);
				var t,
					o = this.QIo.StartSecondOneDay;
				this.QIo.IsAdjustingMoreThanOneDay
					? (this.GetTexture(2).SetFillAmount(1),
						(t = this.QIo.IsAdjustingToMaxLimit ? 1 : this.QIo.DeltaDayOneDay),
						this.GetTexture(3).SetFillAmount(t))
					: (this.GetTexture(2).SetFillAmount(this.QIo.DeltaDayOneDay),
						this.GetTexture(3).SetFillAmount(0));
				const i = TimeOfDayModel_1.TodDayTime.ConvertToDayState(o);
				this.WIo.forEach((e, t) => {
					e.SwitchTo(t === i);
				}),
					(this.HIo.Yaw = this.JIo(o)),
					this.GetTexture(16).SetUIRelativeRotation(this.HIo.ToUeRotator()),
					this.GetText(0).SetText(
						TimeOfDayModel_1.TodDayTime.ConvertToHourMinuteString(o),
					),
					TimeOfDayController_1.TimeOfDayController.SyncGlobalGameTime(
						TimeOfDayModel_1.TodDayTime.ConvertToOneDaySecond(e),
					);
			}),
			(this.lTo = () => {
				UiLayer_1.UiLayer.SetShowNormalMaskLayer(!1);
				var e = CommonParamById_1.configCommonParamById.GetIntConfig(
					"TimeCameraBlendDataName",
				);
				UiCameraAnimationManager_1.UiCameraAnimationManager.PlayCameraAnimationFromCurrent(
					this.NFt.GetHandleName(),
					e.toString(),
				),
					TimeOfDayController_1.TimeOfDayController.ResumeTimeScale(),
					this.QIo.Reset(),
					this.O8e();
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, ue_1.UIText],
			[1, ue_1.UIButtonComponent],
			[15, ue_1.UIButtonComponent],
			[2, ue_1.UITexture],
			[3, ue_1.UITexture],
			[4, ue_1.UIText],
			[5, ue_1.UIText],
			[6, ue_1.UIItem],
			[7, ue_1.UIItem],
			[8, ue_1.UIItem],
			[9, ue_1.UIItem],
			[10, ue_1.UIItem],
			[11, ue_1.UIItem],
			[12, ue_1.UIItem],
			[13, ue_1.UIItem],
			[14, ue_1.UIDraggableComponent],
			[16, ue_1.UITexture],
			[17, ue_1.UIItem],
			[18, ue_1.UIItem],
			[19, ue_1.UIItem],
			[20, ue_1.UIItem],
			[21, ue_1.UIText],
			[22, ue_1.UIInteractionGroup],
			[23, ue_1.UIItem],
			[24, ue_1.UIItem],
			[25, ue_1.UIItem],
		]),
			(this.BtnBindInfo = [
				[1, this.Lli],
				[15, this.xhi],
			]);
	}
	OnStart() {
		this.WIo.set(0, new UiItemSwitcher(this.GetItem(6), this.GetItem(7))),
			this.WIo.set(1, new UiItemSwitcher(this.GetItem(8), this.GetItem(9))),
			this.WIo.set(2, new UiItemSwitcher(this.GetItem(10), this.GetItem(11))),
			this.WIo.set(3, new UiItemSwitcher(this.GetItem(12), this.GetItem(13)));
		var e = ue_1.LGUIBPLibrary.GetUIItemPositionInViewPort(
			GlobalData_1.GlobalData.World,
			this.GetItem(17),
		);
		(this.KIo = Vector_1.Vector.Create(e.X, e.Y, 0)),
			(this.QIo = new TodTimeAdjustingClock()),
			(this.XIo = new TodTimeAdjustingAnimation_1.TodTimeAdjustingAnimation(
				ConfigManager_1.ConfigManager.TimeOfDayConfig.GetMaxV(),
				ConfigManager_1.ConfigManager.TimeOfDayConfig.GetA(),
				this.hTo,
				this.lTo,
			)),
			this.O8e(),
			this.YIo();
	}
	OnBeforeDestroy() {
		this.QIo.Reset(), this.XIo.Stop(), this.sTo();
	}
	OnTick(e) {
		this.XIo?.Tick(e);
	}
	OnAddEventListener() {
		var e = this.GetDraggable(14);
		e.OnPointerBeginDragCallBack.Bind((e) => {
			this.zIo(e);
		}),
			e.OnPointerDragCallBack.Bind((e) => {
				this.ZIo(e);
			}),
			e.OnPointerEndDragCallBack.Bind((e) => {
				this.rTo(e);
			}),
			e.OnUIDimensionsChangedCallBack.Bind((e, t) => {
				this.nTo(e, t);
			}),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.TodTimeChange,
				this.YIo,
			);
	}
	OnRemoveEventListener() {
		var e = this.GetDraggable(14);
		e.OnPointerBeginDragCallBack.Unbind(),
			e.OnPointerDragCallBack.Unbind(),
			e.OnPointerEndDragCallBack.Unbind(),
			e.OnUIDimensionsChangedCallBack.Unbind(),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.TodTimeChange,
				this.YIo,
			);
	}
	sTo() {
		TimerSystem_1.TimerSystem.Has(this.$Io) &&
			TimerSystem_1.TimerSystem.Remove(this.$Io),
			(this.$Io = void 0);
	}
	O8e() {
		this.GetTexture(2).SetFillAmount(0),
			this.GetTexture(3).SetFillAmount(0),
			this.GetItem(18).SetUIActive(!0),
			this.GetItem(19).SetUIActive(!0),
			this.GetItem(23).SetUIActive(!0),
			this.GetItem(24).SetUIActive(!0),
			this._To(!1),
			this.GetText(5).ShowTextNew(this.QIo.DayTextId);
	}
	oTo() {
		var e;
		this.QIo.IsAdjustingMoreThanOneDay
			? (this.GetTexture(2).SetFillAmount(1),
				(e = this.QIo.IsAdjustingToMaxLimit ? 1 : this.QIo.DeltaDayOneDay),
				this.GetTexture(3).SetFillAmount(e))
			: (this.GetTexture(2).SetFillAmount(this.QIo.DeltaDayOneDay),
				this.GetTexture(3).SetFillAmount(0)),
			this.GetText(5).ShowTextNew(this.QIo.DayTextId),
			this._To(this.QIo.IsAdjustingMoreThanMinLimit),
			(this.HIo.Yaw = this.JIo(this.QIo.ToSecondOneDay)),
			this.GetItem(17).SetUIRelativeRotation(this.HIo.ToUeRotator()),
			this.GetItem(25).SetUIRelativeRotation(this.HIo.ToUeRotator()),
			this.GetText(4).SetText(
				TimeOfDayModel_1.TodDayTime.ConvertToHourMinuteString(
					this.QIo.ToSecondOneDay,
				),
			);
	}
	_To(e) {
		this.GetInteractionGroup(22).SetInteractable(e),
			(e = e ? "TimeOfDayConfirmTextOn" : "TimeOfDayConfirmTextOff"),
			this.GetText(21).ShowTextNew(
				ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(e),
			);
	}
	JIo(e) {
		return (
			(-TimeOfDayModel_1.TodDayTime.ConvertToOneDaySecond(e) /
				TimeOfDayDefine_1.TOD_SECOND_PER_DAY) *
			TimeOfDayDefine_1.TOD_CIRCLE_ANGLE
		);
	}
	iTo(e) {
		return (
			(e / TimeOfDayDefine_1.TOD_CIRCLE_ANGLE) *
			TimeOfDayDefine_1.TOD_SECOND_PER_DAY
		);
	}
	tTo(e, t) {
		e.Subtraction(this.KIo, this.gme),
			t.Subtraction(this.KIo, this.fz),
			(t = this.gme.CosineAngle2D(this.fz));
		let o = Math.acos(t) * MathUtils_1.MathUtils.RadToDeg;
		return e.X < 0 ? TimeOfDayDefine_1.TOD_CIRCLE_ANGLE - o : o;
	}
	eTo(e, t) {
		return (
			e.Subtraction(this.KIo, this.gme),
			t.Subtraction(this.KIo, this.fz),
			Vector_1.Vector.CrossProduct(this.gme, this.fz, this.VIo),
			0 < this.VIo.Z
		);
	}
}
exports.TimeOfDayView = TimeOfDayView;
