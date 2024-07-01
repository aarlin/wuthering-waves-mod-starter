"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PlotTimeOfDay = void 0);
const Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
	TimeUtil_1 = require("../../Common/TimeUtil"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	TimeOfDayController_1 = require("../TimeOfDay/TimeOfDayController"),
	TimeOfDayDefine_1 = require("../TimeOfDay/TimeOfDayDefine"),
	TimeOfDayModel_1 = require("../TimeOfDay/TimeOfDayModel");
class PlotTimeOfDay {
	constructor() {
		(this.cJi = !1),
			(this.mJi = !1),
			(this.Uk = !1),
			(this.dJi = 0),
			(this.CJi = 0),
			(this.gJi = !1),
			(this.fJi = !1),
			(this.IRe = void 0);
	}
	OnPlotStart(e) {
		this.mJi ||
			((this.mJi = e) &&
				((this.cJi = !0),
				(this.gJi =
					ModelManager_1.ModelManager.TimeOfDayModel.TimeRunLockState),
				(this.fJi =
					ModelManager_1.ModelManager.TimeOfDayModel.TimeSynLockState),
				(ModelManager_1.ModelManager.TimeOfDayModel.TimeRunLockState = !0),
				(ModelManager_1.ModelManager.TimeOfDayModel.TimeSynLockState = !0),
				(this.dJi =
					ModelManager_1.ModelManager.TimeOfDayModel.GameTime.Second)));
	}
	OnSeqStart() {
		this.pJi(),
			(this.CJi = ModelManager_1.ModelManager.TimeOfDayModel.GameTime.Second),
			(this.Uk = !1);
	}
	OnSeqEnd() {
		this.pJi(),
			(ModelManager_1.ModelManager.TimeOfDayModel.TimeRunLockState = this.cJi),
			this.Uk &&
				0 !== this.CJi &&
				this.CJi !==
					ModelManager_1.ModelManager.TimeOfDayModel.GameTime.Second &&
				TimeOfDayController_1.TimeOfDayController.AdjustTime(
					this.CJi,
					Protocol_1.Aki.Protocol.pOs.Proto_LevelPlayAuto,
				),
			(this.Uk = !1),
			(this.CJi = 0);
	}
	OnPlotEnd() {
		this.mJi &&
			((ModelManager_1.ModelManager.TimeOfDayModel.TimeRunLockState = this.gJi),
			(ModelManager_1.ModelManager.TimeOfDayModel.TimeSynLockState = this.fJi),
			this.gJi &&
				0 !== this.dJi &&
				this.dJi !==
					ModelManager_1.ModelManager.TimeOfDayModel.GameTime.Second &&
				TimeOfDayController_1.TimeOfDayController.AdjustTime(
					this.dJi,
					Protocol_1.Aki.Protocol.pOs.Proto_LevelPlayAuto,
				),
			(this.dJi = 0),
			(this.mJi = !1),
			(this.cJi = !1));
	}
	PauseTime() {
		this.cJi ||
			((ModelManager_1.ModelManager.TimeOfDayModel.TimeRunLockState = !0),
			(this.cJi = !0));
	}
	ResumeTime() {
		this.cJi &&
			((ModelManager_1.ModelManager.TimeOfDayModel.TimeRunLockState = !1),
			(this.cJi = !1));
	}
	SetTime(e) {
		TimeOfDayController_1.TimeOfDayController.AdjustTime(
			e,
			Protocol_1.Aki.Protocol.pOs.Proto_LevelPlayAuto,
		);
	}
	SetTimeDuration(e, i, o, t) {
		this.pJi(), (this.Uk = e);
		let a = i;
		if ((a > TimeOfDayDefine_1.TOD_SECOND_PER_DAY && (a = 0), t <= 0))
			TimeOfDayController_1.TimeOfDayController.AdjustTime(
				a,
				Protocol_1.Aki.Protocol.pOs.Proto_LevelPlayAuto,
			);
		else {
			let i = o;
			(i = i > TimeOfDayDefine_1.TOD_SECOND_PER_DAY ? 0 : i) < a &&
				(i += TimeOfDayDefine_1.TOD_SECOND_PER_DAY);
			let l = 1;
			0 < (e = TimeOfDayModel_1.TodDayTime.ConvertFromRealTimeSecond(t)) &&
				(l = (i - a) / e),
				(ModelManager_1.ModelManager.TimeOfDayModel.TimeRunLockState = !1),
				TimeOfDayController_1.TimeOfDayController.AdjustTime(
					a,
					Protocol_1.Aki.Protocol.pOs.Proto_LevelPlayAuto,
				),
				TimeOfDayController_1.TimeOfDayController.ChangeTimeScale(l),
				(this.IRe = TimerSystem_1.TimerSystem.Delay(() => {
					TimeOfDayController_1.TimeOfDayController.AdjustTime(
						o,
						Protocol_1.Aki.Protocol.pOs.Proto_LevelPlayAuto,
					),
						(this.IRe = void 0),
						TimeOfDayController_1.TimeOfDayController.ResumeTimeScale(),
						(ModelManager_1.ModelManager.TimeOfDayModel.TimeRunLockState =
							this.cJi);
				}, t * TimeUtil_1.TimeUtil.InverseMillisecond));
		}
	}
	pJi() {
		this.IRe &&
			(TimerSystem_1.TimerSystem.Has(this.IRe) &&
				TimerSystem_1.TimerSystem.Remove(this.IRe),
			TimeOfDayController_1.TimeOfDayController.ResumeTimeScale(),
			(this.IRe = void 0));
	}
}
exports.PlotTimeOfDay = PlotTimeOfDay;
