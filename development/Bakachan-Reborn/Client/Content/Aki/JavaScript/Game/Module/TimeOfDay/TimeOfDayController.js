"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TimeOfDayController = void 0);
const ue_1 = require("ue"),
	AudioSystem_1 = require("../../../Core/Audio/AudioSystem"),
	Log_1 = require("../../../Core/Common/Log"),
	Time_1 = require("../../../Core/Common/Time"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	Net_1 = require("../../../Core/Net/Net"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	Global_1 = require("../../Global"),
	GlobalData_1 = require("../../GlobalData"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
	UiManager_1 = require("../../Ui/UiManager"),
	ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController"),
	TimeOfDayDefine_1 = require("./TimeOfDayDefine"),
	TimeOfDayModel_1 = require("./TimeOfDayModel"),
	SENDTIMEGAP = 2e3;
class TimeOfDayController extends UiControllerBase_1.UiControllerBase {
	static OnAddEvents() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.EnterGameSuccess,
			this.hIo,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.PauseGame,
				this.dze,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.LoginSuccess,
				this.gEe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.BeforeLoadMap,
				this.I$i,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.WorldDone,
				this.Uje,
			);
	}
	static OnRemoveEvents() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.EnterGameSuccess,
			this.hIo,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.PauseGame,
				this.dze,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.LoginSuccess,
				this.gEe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.BeforeLoadMap,
				this.I$i,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.WorldDone,
				this.Uje,
			);
	}
	static OnRegisterNetEvent() {
		Net_1.Net.Register(17004, TimeOfDayController.lIo),
			Net_1.Net.Register(29427, TimeOfDayController._Io),
			Net_1.Net.Register(17344, TimeOfDayController.uIo);
	}
	static OnUnRegisterNetEvent() {
		Net_1.Net.UnRegister(17004), Net_1.Net.UnRegister(29427);
	}
	static OnTick(e) {
		!TimeOfDayController.cIo ||
			!TimeOfDayController.mIo ||
			TimeOfDayController.dIo ||
			TimeOfDayController.CIo ||
			ModelManager_1.ModelManager.TimeOfDayModel.TimeRunLockState ||
			((this.gIo += e), this.fIo(this.gIo), (this.gIo = 0));
	}
	static fIo(e) {
		var o = ModelManager_1.ModelManager.GameModeModel.IsMulti
			? 1
			: ModelManager_1.ModelManager.TimeOfDayModel.TimeScale;
		(e = TimeOfDayModel_1.TodDayTime.ConvertFromRealTimeSecond(
			(e / TimeOfDayDefine_1.TOD_MILLIONSECOND_PER_SECOND) * o,
		)) <= 0 ||
			this.pIo(ModelManager_1.ModelManager.TimeOfDayModel.GameTime.Second + e);
	}
	static vIo() {
		if (!Global_1.Global.BaseCharacter)
			return (
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("TimeOfDay", 28, "时间找不到角色"),
				!1
			);
		if (ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance())
			return (
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("TimeOfDay", 28, "时间在副本"),
				!1
			);
		if (ModelManager_1.ModelManager.GameModeModel.IsMulti)
			return (
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("TimeOfDay", 28, "时间在联机"),
				!1
			);
		for (const e of ConfigManager_1.ConfigManager.TimeOfDayConfig.GetBanGamePlayTags())
			if (
				e &&
				Global_1.Global.BaseCharacter.CharacterActorComponent?.Entity?.GetComponent(
					185,
				)?.HasTag(e.TagId)
			)
				return (
					Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug("TimeOfDay", 28, "时间在BanTag"),
					!1
				);
		return (
			!ModelManager_1.ModelManager.TimeOfDayModel.TimeRunLockState ||
			(Log_1.Log.CheckDebug() && Log_1.Log.Debug("TimeOfDay", 27, "时间被锁定"),
			!1)
		);
	}
	static pIo(e, o = !0) {
		let a = e;
		for (; a > TimeOfDayDefine_1.TOD_SECOND_PER_DAY; )
			a -= TimeOfDayDefine_1.TOD_SECOND_PER_DAY;
		(ModelManager_1.ModelManager.TimeOfDayModel.GameTime.Second = a),
			this.SyncGlobalGameTime(a),
			this.MIo(a),
			EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TodTimeChange),
			o &&
				!ModelManager_1.ModelManager.TimeOfDayModel.TimeSynLockState &&
				this.SIo(e);
	}
	static SIo(e) {
		let o = e;
		o > TimeOfDayDefine_1.TOD_SECOND_PER_DAY && (o = 0);
		var a = ModelManager_1.ModelManager.TimeOfDayModel.GameTime.DayState;
		(a =
			((((a =
				(this.EIo !== a &&
					((this.EIo = a),
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.DayStateChange,
					)),
				Time_1.Time.Now - this.yIo)) > 2e3 &&
				o - this.IIo > TimeOfDayDefine_1.TOD_SECOND_PER_MINUTE) ||
				this.IIo > o) &&
				this.SyncServerGameTime(o),
			Math.floor(e / TimeOfDayDefine_1.TOD_SECOND_PER_HOUR))) < this.TIo &&
			((e = Math.floor(
				(e - a * TimeOfDayDefine_1.TOD_SECOND_PER_HOUR) /
					TimeOfDayDefine_1.TOD_MINUTE_PER_HOUR,
			)),
			this.LIo(1, a, e, Protocol_1.Aki.Protocol.pOs.Proto_TimeFlowAuto)),
			(this.TIo = a);
	}
	static SyncServerGameTime(e) {
		var o, a;
		!GlobalData_1.GlobalData.World ||
			(ModelManager_1.ModelManager.GameModeModel.IsMulti &&
				!ModelManager_1.ModelManager.CreatureModel.IsMyWorld()) ||
			((o = Math.floor(e / TimeOfDayDefine_1.TOD_SECOND_PER_HOUR)),
			(a = Math.floor(
				(e - o * TimeOfDayDefine_1.TOD_SECOND_PER_HOUR) /
					TimeOfDayDefine_1.TOD_MINUTE_PER_HOUR,
			)),
			this.LIo(0, o, a, Protocol_1.Aki.Protocol.pOs.Proto_TimeFlowAuto),
			(this.IIo = e),
			(this.yIo = Time_1.Time.Now));
	}
	static SyncGlobalGameTime(e) {
		!this.IsSyncToEngine ||
			(GlobalData_1.GlobalData.World &&
				!ModelManager_1.ModelManager.LoginModel.HasLoginPromise() &&
				ue_1.KuroRenderingRuntimeBPPluginBPLibrary.SetGlobalGITime(
					GlobalData_1.GlobalData.World,
					TimeOfDayModel_1.TodDayTime.ConvertToHour(e),
				));
	}
	static MIo(e) {
		var o;
		GlobalData_1.GlobalData.World &&
			((o = TimeOfDayController.DIo - e) > TimeOfDayController.RIo ||
				o < -TimeOfDayController.RIo) &&
			(AudioSystem_1.AudioSystem.SetRtpcValue(
				"time_game",
				TimeOfDayModel_1.TodDayTime.ConvertToHour(e),
			),
			(TimeOfDayController.DIo = e));
	}
	static ChangeTimeScale(e) {
		ModelManager_1.ModelManager.TimeOfDayModel.TimeScale = e;
	}
	static PauseTime() {
		ModelManager_1.ModelManager.TimeOfDayModel.TimeScale = 0;
	}
	static ResumeTimeScale(e = !0) {
		ModelManager_1.ModelManager.TimeOfDayModel.TimeScale = e
			? 1
			: ModelManager_1.ModelManager.TimeOfDayModel.OldTimeScale;
	}
	static ForcePauseTime() {
		TimeOfDayController.PauseTime(),
			(ModelManager_1.ModelManager.TimeOfDayModel.FreezeTimeScale = !0);
	}
	static ForceResumeTime() {
		(ModelManager_1.ModelManager.TimeOfDayModel.FreezeTimeScale = !1),
			TimeOfDayController.ResumeTimeScale();
	}
	static OnAddOpenViewCheckFunction() {
		UiManager_1.UiManager.AddOpenViewCheckFunction(
			"TimeOfDaySecondView",
			TimeOfDayController.V4e,
			"TimeOfDayController.CanOpenView",
		);
	}
	static OnRemoveOpenViewCheckFunction() {
		UiManager_1.UiManager.RemoveOpenViewCheckFunction(
			"TimeOfDaySecondView",
			TimeOfDayController.V4e,
		);
	}
	static SyncSceneTime(e, o, a) {
		if (
			(ModelManager_1.ModelManager.TimeOfDayModel.SetPassSceneTime(
				ModelManager_1.ModelManager.TimeOfDayModel.GameTime.Second,
			),
			void 0 !== e && void 0 !== o)
		) {
			e =
				e *
					TimeOfDayDefine_1.TOD_SECOND_PER_MINUTE *
					TimeOfDayDefine_1.TOD_MINUTE_PER_HOUR +
				TimeOfDayModel_1.TodDayTime.ConvertFromMinute(o);
			let t = 0;
			ModelManager_1.ModelManager.GameModeModel.IsMulti &&
				(t = TimeOfDayModel_1.TodDayTime.ConvertFromRealTimeSecond(
					Number(
						MathUtils_1.MathUtils.LongToBigInt(a) /
							BigInt(TimeOfDayDefine_1.TOD_MILLIONSECOND_PER_SECOND),
					) * ModelManager_1.ModelManager.TimeOfDayModel.TimeScale,
				)),
				(TimeOfDayController.cIo = !0),
				this.pIo(e + t, !1);
		}
	}
	static AdjustTime(e, o, a = 0) {
		var t, i;
		!GlobalData_1.GlobalData.World ||
			(ModelManager_1.ModelManager.GameModeModel.IsMulti &&
				!ModelManager_1.ModelManager.CreatureModel.IsMyWorld()) ||
			(ModelManager_1.ModelManager.TimeOfDayModel.CacheTimeRecords(),
			(t = Math.floor(e / TimeOfDayDefine_1.TOD_SECOND_PER_HOUR)),
			(i = Math.floor(
				(e - t * TimeOfDayDefine_1.TOD_SECOND_PER_HOUR) /
					TimeOfDayDefine_1.TOD_MINUTE_PER_HOUR,
			)),
			this.LIo(a, t, i, o),
			this.pIo(e, !1),
			(this.IIo = e),
			(this.TIo = t),
			EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.AdjustTime));
	}
	static LIo(e, o, a, t) {
		var i;
		!GlobalData_1.GlobalData.World ||
			(ModelManager_1.ModelManager.GameModeModel.IsMulti &&
				!ModelManager_1.ModelManager.CreatureModel.IsMyWorld()) ||
			(((i = Protocol_1.Aki.Protocol.Kls.create()).fVn = o),
			(i.pVn = a),
			(i.V5n = t),
			(i.vVn = e),
			Net_1.Net.Call(4988, i, (e) => {
				e &&
					(e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys
						? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
								e.lkn,
								21012,
							)
						: ModelManager_1.ModelManager.TimeOfDayModel.SetCurrentDay(e.Bys));
			}));
	}
	static CheckInMinuteSpan(e, o) {
		return (
			(e = [e, o]),
			(o = ModelManager_1.ModelManager.TimeOfDayModel.GameTime.Minute),
			TimeOfDayModel_1.TodDayTime.CheckInMinuteSpan(o, e)
		);
	}
	static AdjustTimeByMinute(e, o) {
		this.AdjustTime(TimeOfDayModel_1.TodDayTime.ConvertFromMinute(e), o);
	}
	static SetUiAnimFlag(e) {
		TimeOfDayController.CIo = e;
	}
	static OnClear() {
		return !0;
	}
}
(exports.TimeOfDayController = TimeOfDayController),
	((_a = TimeOfDayController).IsSyncToEngine = !0),
	(TimeOfDayController.gIo = 0),
	(TimeOfDayController.EIo = 4),
	(TimeOfDayController.DIo = 0),
	(TimeOfDayController.IIo = 0),
	(TimeOfDayController.yIo = 0),
	(TimeOfDayController.TIo = 0),
	(TimeOfDayController.mIo = !1),
	(TimeOfDayController.dIo = !1),
	(TimeOfDayController.CIo = !1),
	(TimeOfDayController.cIo = !1),
	(TimeOfDayController.RIo = 0.1 * TimeOfDayDefine_1.TOD_SECOND_PER_HOUR),
	(TimeOfDayController.hIo = () => {
		TimeOfDayController.mIo = !0;
	}),
	(TimeOfDayController.I$i = () => {
		TimeOfDayController.dIo = !0;
	}),
	(TimeOfDayController.Uje = () => {
		(TimeOfDayController.dIo = !1),
			TimeOfDayController.SyncGlobalGameTime(
				ModelManager_1.ModelManager.TimeOfDayModel.GameTime.Second,
			);
	}),
	(TimeOfDayController.dze = (e) => {
		1 === e
			? TimeOfDayController.PauseTime()
			: 0 === e && TimeOfDayController.ResumeTimeScale();
	}),
	(TimeOfDayController.gEe = (e) => {
		ModelManager_1.ModelManager.TimeOfDayModel.PlayerAccount = e;
	}),
	(TimeOfDayController.V4e = (e) =>
		!!_a.vIo() ||
		(ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
			"TimeOfDayCantOpenView",
		),
		!1)),
	(TimeOfDayController.lIo = (e) => {
		ModelManager_1.ModelManager.TimeOfDayModel.SetCurrentDay(e.Bys);
	}),
	(TimeOfDayController._Io = (e) => {
		(e = e.rys), TimeOfDayController.SyncSceneTime(e.fVn, e.pVn, e.Cys);
	}),
	(TimeOfDayController.uIo = (e) => {
		e.mvs === Protocol_1.Aki.Protocol.cqs.h3n
			? ((ModelManager_1.ModelManager.TimeOfDayModel.TimeRunLockState = !0),
				(ModelManager_1.ModelManager.TimeOfDayModel.TimeSynLockState = !0))
			: ((ModelManager_1.ModelManager.TimeOfDayModel.TimeRunLockState = !1),
				(ModelManager_1.ModelManager.TimeOfDayModel.TimeSynLockState = !1));
	});
