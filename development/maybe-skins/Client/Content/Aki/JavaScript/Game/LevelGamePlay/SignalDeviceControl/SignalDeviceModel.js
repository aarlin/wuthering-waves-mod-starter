"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SignalDeviceModel = exports.ROWNUM = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	ModelBase_1 = require("../../../Core/Framework/ModelBase"),
	Net_1 = require("../../../Core/Net/Net"),
	TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
	Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
	IAction_1 = require("../../../UniverseEditor/Interface/IAction"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	TimeUtil_1 = require("../../Common/TimeUtil"),
	UiManager_1 = require("../../Ui/UiManager"),
	SignalDeviceController_1 = require("./SignalDeviceController");
exports.ROWNUM = 5;
class SignalDeviceModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.GridNum = exports.ROWNUM * exports.ROWNUM),
			(this.uPe = []),
			(this.cPe = []),
			(this.CurrentColor = IAction_1.EPieceColorType.White),
			(this.CacheRotator = Rotator_1.Rotator.Create(0, 0, 0)),
			(this.RotateMap = new Map([
				[0, 0],
				[4, -90],
				[3, 90],
				[1, 180],
				[2, 0],
			]));
	}
	InitData(e) {
		this.uPe = new Array(this.GridNum);
		for (let t = 0; t < this.GridNum; t++)
			this.uPe[t] = { IsFinished: !1, Color: e[t].Color };
		this.mPe();
	}
	ResetData() {
		for (const e of this.uPe) e.IsFinished = !1;
		this.mPe(),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnSignalDeviceReset,
			);
	}
	IsGridFinished(e) {
		return this.uPe[e]?.IsFinished;
	}
	GetGridColor(e) {
		return this.uPe[e]?.Color;
	}
	LinkingStart(e, t) {
		(this.CurrentColor = t), (this.cPe = [e]);
	}
	Linking(e) {
		var t = this.cPe[this.cPe.length - 1];
		!this.cPe.includes(e) && 0 !== this.NeighboringType(t, e) && this.dPe(e)
			? (this.cPe.push(e),
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.OnSignalDeviceLinking,
					!0,
					t,
					this.uPe[t].Color === this.CurrentColor,
					e,
					this.uPe[e].Color === this.CurrentColor,
				),
				this.uPe[e].Color === this.CurrentColor && this.CheckLinking(e))
			: 1 < this.cPe.length && this.cPe.indexOf(e) === this.cPe.length - 2
				? (this.cPe.pop(),
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.OnSignalDeviceLinking,
						!1,
						t,
						this.uPe[t].Color === this.CurrentColor,
						e,
						this.uPe[e].Color === this.CurrentColor,
					))
				: Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("Temp", 36, "Linking Fail", ["index", e]);
	}
	NeighboringType(e, t) {
		var i = e - t;
		if (
			(-1 == i && t % exports.ROWNUM == 0) ||
			(1 == i && e % exports.ROWNUM == 0)
		)
			return 0;
		switch (i) {
			case 1:
				return 1;
			case -1:
				return 2;
			case exports.ROWNUM:
				return 3;
			case -exports.ROWNUM:
				return 4;
			default:
				return 0;
		}
	}
	dPe(e) {
		return (
			(this.uPe[e].Color === IAction_1.EPieceColorType.White &&
				!this.uPe[e].IsFinished) ||
			this.uPe[e].Color === this.CurrentColor
		);
	}
	CheckLinking(e) {
		var t;
		0 !== this.cPe.length &&
			((t = this.cPe[this.cPe.length - 1]),
			this.GetGridColor(t) !== this.CurrentColor || 1 === this.cPe.length
				? this.CancelCurrentLinking()
				: this.MarkCurrentLinking());
	}
	MarkCurrentLinking() {
		EventSystem_1.EventSystem.Emit(
			EventDefine_1.EEventName.OnSignalDeviceLinkingCheck,
			!0,
			Array.from(this.cPe),
		);
		for (const e of this.cPe) this.uPe[e].IsFinished = !0;
		this.mPe(), this.CPe() && this.SDe();
	}
	CancelCurrentLinking() {
		EventSystem_1.EventSystem.Emit(
			EventDefine_1.EEventName.OnSignalDeviceLinkingCheck,
			!1,
			Array.from(this.cPe),
		),
			this.mPe();
	}
	CPe() {
		for (const e of this.uPe)
			if (e.Color !== IAction_1.EPieceColorType.White && !e.IsFinished)
				return !1;
		return !0;
	}
	SDe() {
		EventSystem_1.EventSystem.Emit(
			EventDefine_1.EEventName.OnSignalDeviceFinish,
		),
			TimerSystem_1.TimerSystem.Delay(() => {
				var e = Protocol_1.Aki.Protocol.UKn.create();
				(e.ykn = "0"),
					(e.Ikn = Protocol_1.Aki.Protocol.dqs.Proto_SignalDevice),
					Net_1.Net.Call(19172, e, (e) => {
						e.uvs === Protocol_1.Aki.Protocol.lkn.Sys &&
							(this.gPe(),
							SignalDeviceController_1.SignalDeviceController.CallFinishCallback(),
							UiManager_1.UiManager.CloseView("SignalDeviceView"));
					});
			}, 1.7 * TimeUtil_1.TimeUtil.InverseMillisecond);
	}
	gPe() {
		(this.uPe.length = 0), this.mPe();
	}
	mPe() {
		(this.cPe.length = 0),
			(this.CurrentColor = IAction_1.EPieceColorType.White);
	}
}
exports.SignalDeviceModel = SignalDeviceModel;
