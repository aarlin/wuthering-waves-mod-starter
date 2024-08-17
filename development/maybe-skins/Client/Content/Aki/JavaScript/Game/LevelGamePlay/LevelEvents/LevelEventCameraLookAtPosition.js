"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventCameraLookAtPosition = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	CommonDefine_1 = require("../../../Core/Define/CommonDefine"),
	TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
	Vector_1 = require("../../../Core/Utils/Math/Vector"),
	StringUtils_1 = require("../../../Core/Utils/StringUtils"),
	CameraController_1 = require("../../Camera/CameraController"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	InputDistributeController_1 = require("../../Ui/InputDistribute/InputDistributeController"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventCameraLookAtPosition extends LevelGeneralBase_1.LevelEventBase {
	constructor() {
		super(...arguments),
			(this.LLe = Vector_1.Vector.Create()),
			(this.dae = Vector_1.Vector.Create()),
			(this.pLe = "CameraLookAtPosition Ban Input");
	}
	Execute(e, t) {
		var a, i, o, r, n, s;
		e
			? ((s = parseFloat(e.get("X"))),
				(a = parseFloat(e.get("Y"))),
				(i = parseFloat(e.get("Z"))),
				(o = parseFloat(e.get("FadeInTime"))),
				(r = parseFloat(e.get("StayTime"))),
				(n = parseFloat(e.get("FadeOutTime"))),
				(e = e.get("LockCameraInput") === StringUtils_1.ONE_STRING),
				isNaN(s) || isNaN(a) || isNaN(i) || isNaN(o) || isNaN(r) || isNaN(n)
					? (Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"Camera",
								15,
								"关卡事件[LevelEventCameraLookAtPosition]参数非法",
								["x", s],
								["y", a],
								["z", i],
								["fadeInTime", o],
								["stayTime", r],
								["fadeOutTime", n],
							),
						this.FinishExecute(!1))
					: (this.LLe.Set(s, a, i),
						CameraController_1.CameraController.FightCamera.LogicComponent.ApplyCameraGuide(
							this.LLe,
							o,
							r,
							n,
							e,
							void 0,
							-1,
						),
						this.IsWaitEnd
							? ((s = o + r + n + 0.5),
								TimerSystem_1.TimerSystem.Delay(() => {
									this.FinishExecute(!0);
								}, s * CommonDefine_1.MILLIONSECOND_PER_SECOND))
							: this.FinishExecute(!0)))
			: this.FinishExecute(!1);
	}
	ExecuteNew(e, t) {
		const a = e;
		if (a) {
			e = a.Pos.X ?? 0;
			var i = a.Pos.Y ?? 0,
				o = a.Pos.Z ?? 0,
				r = a.FadeInTime,
				n = a.StayTime,
				s = a.FadeOutTime,
				l = a.CameraPos?.X,
				m = a.CameraPos?.Y,
				C = a.CameraPos?.Z,
				u = a.Fov;
			if (isNaN(e) || isNaN(i) || isNaN(o) || isNaN(r) || isNaN(n) || isNaN(s))
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Camera",
						15,
						"关卡事件[LevelEventCameraLookAtPosition]参数非法",
						["x", e],
						["y", i],
						["z", o],
						["fadeInTime", r],
						["stayTime", n],
						["fadeOutTime", s],
						["endPositionX", l],
						["endPositionY", m],
						["endPositionZ", C],
						["fov", u],
					),
					this.FinishExecute(!1);
			else {
				let t;
				a.BanInput &&
					((ModelManager_1.ModelManager.GeneralLogicTreeModel.DisableInput =
						!0),
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.ForceReleaseInput,
						this.pLe,
					)),
					a.HideUi &&
						ModelManager_1.ModelManager.BattleUiModel.ChildViewData.HideBattleView(
							1,
						),
					this.LLe.Set(e, i, o),
					a.CameraPos
						? (t = this.dae).Set(a.CameraPos.X, a.CameraPos.Y, a.CameraPos.Z)
						: (t = void 0),
					CameraController_1.CameraController.FightCamera.LogicComponent.ExitSequenceDialogue(),
					CameraController_1.CameraController.FightCamera.LogicComponent.ApplyCameraGuide(
						this.LLe,
						r,
						n,
						s,
						a.LockCamera ?? !1,
						t,
						a.Fov,
					),
					this.IsAsync
						? (a.BanInput &&
								((ModelManager_1.ModelManager.GeneralLogicTreeModel.DisableInput =
									!1),
								InputDistributeController_1.InputDistributeController.RefreshInputTag()),
							a.HideUi &&
								ModelManager_1.ModelManager.BattleUiModel.ChildViewData.ShowBattleView(
									1,
								),
							this.FinishExecute(!0))
						: ((l = r + n + s),
							TimerSystem_1.TimerSystem.Delay(() => {
								a.BanInput &&
									((ModelManager_1.ModelManager.GeneralLogicTreeModel.DisableInput =
										!1),
									InputDistributeController_1.InputDistributeController.RefreshInputTag()),
									a.HideUi &&
										ModelManager_1.ModelManager.BattleUiModel.ChildViewData.ShowBattleView(
											1,
										),
									this.FinishExecute(!0);
							}, l * CommonDefine_1.MILLIONSECOND_PER_SECOND));
			}
		} else this.FinishExecute(!1);
	}
	ExecuteInGm(e, t) {
		this.FinishExecute(!0);
	}
}
exports.LevelEventCameraLookAtPosition = LevelEventCameraLookAtPosition;
