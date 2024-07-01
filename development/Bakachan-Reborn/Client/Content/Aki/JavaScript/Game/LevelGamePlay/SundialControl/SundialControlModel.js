"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SundialControlModel = void 0);
const UE = require("ue"),
	AudioController_1 = require("../../../Core/Audio/AudioController"),
	GlobalConfigFromCsvByName_1 = require("../../../Core/Define/ConfigQuery/GlobalConfigFromCsvByName"),
	ModelBase_1 = require("../../../Core/Framework/ModelBase"),
	DataTableUtil_1 = require("../../../Core/Utils/DataTableUtil"),
	MathCommon_1 = require("../../../Core/Utils/Math/MathCommon"),
	CameraController_1 = require("../../Camera/CameraController"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	TimeUtil_1 = require("../../Common/TimeUtil"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	SundialControlController_1 = require("./SundialControlController"),
	finalSocket = [5, 2],
	SUNDIAL_MODEL_CONFIG_ID = "518056",
	RING_ONE = "Ring_1",
	RING_TWO = "Ring_2",
	AK_ROTATING_1 = "play_amb_interact_sundial_outer_circle_loop",
	AK_STOP_ROTATING_1 = "play_amb_interact_sundial_outer_circle_stuck",
	AK_ROTATING_2 = "play_amb_interact_sundial_inner_circle_loop",
	AK_STOP_ROTATING_2 = "play_amb_interact_sundial_inner_circle_stuck",
	AK_SHOW_SHINE = "play_amb_interact_sundial_activate",
	AK_HIDE_SHINE = "play_amb_interact_sundial_deactivate",
	AK_FINISH = "play_amb_interact_sundial_finish";
class RotatingRing {
	constructor(e, t, i) {
		(this.RingActor = e),
			(this.SimpleRotateAngle = t),
			(this.TotalSocket = 360 / t),
			(this.CurSocket = 0),
			(this.IsShine = !1),
			(this.RotateSpeed = i),
			(e = this.RingActor.RootComponent.RelativeRotation),
			(this.InitYaw = e.Yaw);
	}
}
class SundialControlModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.Pxe = void 0),
			(this.xxe = !1),
			(this.wxe = void 0),
			(this.Bxe = void 0),
			(this.bxe = []),
			(this.qxe = 0),
			(this.Gxe = 0);
	}
	get ModelConfig() {
		return (
			this.Pxe ||
				(this.Pxe = DataTableUtil_1.DataTableUtil.GetDataTableRowFromName(
					0,
					"518056",
				)),
			this.Pxe
		);
	}
	get TargetLocation() {
		return this.xxe || this.Nxe(), this.wxe;
	}
	get TargetRotation() {
		return this.xxe || this.Nxe(), this.Bxe;
	}
	Nxe() {
		var e;
		this.xxe ||
			((this.xxe = !0),
			(e =
				CameraController_1.CameraController.WidgetCamera.DisplayComponent
					.CineCamera),
			(this.wxe = e.K2_GetActorLocation()),
			(this.Bxe = e.K2_GetActorRotation()),
			(e = this.Bxe.Vector()).Normalize(MathCommon_1.MathCommon.SmallNumber),
			(this.wxe = this.wxe.op_Addition(e.op_Multiply(200))));
	}
	InitRingActors(e) {
		this.bxe = [];
		let t = 0,
			i = 0;
		var o;
		(o =
			((o =
				((o =
					GlobalConfigFromCsvByName_1.configGlobalConfigFromCsvByName.GetConfig(
						"SundialGamePlay.AngularSpeed1",
					)) && (t = parseFloat(o.Value)),
				(o =
					GlobalConfigFromCsvByName_1.configGlobalConfigFromCsvByName.GetConfig(
						"SundialGamePlay.AngularSpeed2",
					)) && (i = parseFloat(o.Value)),
				new RotatingRing(e.GetActorByKey("Ring_1"), 30, t))) &&
				this.bxe.push(o),
			new RotatingRing(e.GetActorByKey("Ring_2"), 90, i))) && this.bxe.push(o),
			(this.qxe = 0);
	}
	ChangeCurrentRingIndex(e = 1) {
		(this.qxe = (this.qxe + e) % this.bxe.length),
			this.UpdateTips(),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnSundialRingSwitch,
				this.qxe,
			);
	}
	SimpleAddCurRingSocket(e = 1) {
		var t = this.bxe[this.qxe];
		(e =
			((t.CurSocket = (t.CurSocket + e) % t.TotalSocket),
			ConfigManager_1.ConfigManager.AudioConfig?.GetAudioPath(
				0 === this.qxe ? AK_ROTATING_1 : AK_ROTATING_2,
			)?.Path)) &&
			AudioController_1.AudioController.PostEvent(
				e,
				SundialControlController_1.SundialControlController.GetMainActor(),
			);
	}
	RotateCurrentRing(e) {
		var t = this.bxe[this.qxe],
			i = t.RingActor.RootComponent;
		if (i) {
			var o = t.RotateSpeed;
			let n = e * TimeUtil_1.TimeUtil.Millisecond * o,
				a = ((this.Gxe += n), !1);
			if (
				(this.Gxe > t.SimpleRotateAngle &&
					((n -= this.Gxe - t.SimpleRotateAngle), (a = !0)),
				i.K2_AddRelativeRotation(new UE.Rotator(0, n, 0), !1, void 0, !1),
				a)
			)
				return (
					(e = ConfigManager_1.ConfigManager.AudioConfig?.GetAudioPath(
						0 === this.qxe ? AK_STOP_ROTATING_1 : AK_STOP_ROTATING_2,
					)?.Path) &&
						AudioController_1.AudioController.PostEvent(
							e,
							SundialControlController_1.SundialControlController.GetMainActor(),
						),
					(this.Gxe = 0),
					this.Oxe(),
					this.kxe(),
					!0
				);
		}
		return !1;
	}
	ClearCacheActor() {
		this.xxe && ((this.xxe = !1), (this.wxe = void 0), (this.Bxe = void 0)),
			this.bxe && 0 < this.bxe.length && (this.bxe = []);
	}
	ResetAll() {
		for (let o = (this.qxe = 0); o < this.bxe.length; o++) {
			var e = this.bxe[o],
				t = e.RingActor.RootComponent,
				i = t.RelativeRotation;
			(i.Yaw = e.InitYaw),
				t.K2_SetRelativeRotation(i, !1, void 0, !1),
				(e.IsShine = !1),
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.OnSundialRingChangeShine,
					o,
					!1,
				),
				(e.CurSocket = 0);
		}
		EventSystem_1.EventSystem.Emit(
			EventDefine_1.EEventName.OnSundialRingSwitch,
			0,
		);
	}
	Oxe() {
		for (let t = 0; t < this.bxe.length; t++) {
			var e;
			this.bxe[t].IsShine
				? this.bxe[t].CurSocket !== finalSocket[t] &&
					((this.bxe[t].IsShine = !1),
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.OnSundialRingChangeShine,
						t,
						!1,
					),
					(e =
						ConfigManager_1.ConfigManager.AudioConfig?.GetAudioPath(
							AK_HIDE_SHINE,
						)?.Path)) &&
					AudioController_1.AudioController.PostEvent(
						e,
						SundialControlController_1.SundialControlController.GetMainActor(),
					)
				: this.bxe[t].CurSocket === finalSocket[t] &&
					((this.bxe[t].IsShine = !0),
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.OnSundialRingChangeShine,
						t,
						!0,
					),
					(e =
						ConfigManager_1.ConfigManager.AudioConfig?.GetAudioPath(
							AK_SHOW_SHINE,
						)?.Path)) &&
					AudioController_1.AudioController.PostEvent(
						e,
						SundialControlController_1.SundialControlController.GetMainActor(),
					);
		}
	}
	kxe() {
		for (let e = 0; e < this.bxe.length; e++)
			if (this.bxe[e].CurSocket !== finalSocket[e]) return;
		var e =
			ConfigManager_1.ConfigManager.AudioConfig?.GetAudioPath(AK_FINISH)?.Path;
		e &&
			AudioController_1.AudioController.PostEvent(
				e,
				SundialControlController_1.SundialControlController.GetMainActor(),
			),
			SundialControlController_1.SundialControlController.PlayFinishAnimation();
	}
	UpdateTips() {
		EventSystem_1.EventSystem.Emit(
			EventDefine_1.EEventName.OnNeedUpdateSundialTips,
			this.qxe,
			this.bxe[this.qxe].CurSocket,
		);
	}
}
exports.SundialControlModel = SundialControlModel;
