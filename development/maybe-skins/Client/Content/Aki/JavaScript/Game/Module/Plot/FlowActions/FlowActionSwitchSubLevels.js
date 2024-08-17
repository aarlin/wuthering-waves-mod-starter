"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FlowActionSwitchSubLevels = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	Rotator_1 = require("../../../../Core/Utils/Math/Rotator"),
	Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	IAction_1 = require("../../../../UniverseEditor/Interface/IAction"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	FlowActionServerAction_1 = require("./FlowActionServerAction");
class FlowActionSwitchSubLevels extends FlowActionServerAction_1.FlowActionServerAction {
	constructor() {
		super(...arguments),
			(this.WRe = (e) => {
				e && this.FinishExecute(!0);
			});
	}
	OnExecute() {
		var e = this.ActionInfo.Params;
		if (e)
			switch (e.Type) {
				case IAction_1.ESwitchSubLevelsType.Directly:
					this.KRe(e);
					break;
				case IAction_1.ESwitchSubLevelsType.Preload:
					this.QRe(e);
			}
	}
	QRe(e) {
		ModelManager_1.ModelManager.AutoRunModel.IsInLogicTreeGmMode() ||
			ControllerHolder_1.ControllerHolder.GameModeController.PreloadSubLevel(
				e.PreloadLevels,
			),
			this.FinishExecute(!0);
	}
	KRe(e) {
		let o, r;
		if (e.TeleportEntityId) {
			var t,
				l = ModelManager_1.ModelManager.CreatureModel.GetEntityData(
					e.TeleportEntityId,
				);
			if (!l)
				return void (
					Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"LevelEvent",
						3,
						"[CreatureController.SceneSubLevelsChangedNotify] 要传送的TeleportEntityId不存在。",
						["TeleportEntityId", e.TeleportEntityId],
					)
				);
			(t =
				((t = l.Transform.Pos) &&
					(o = Vector_1.Vector.Create(t.X ?? 0, t.Y ?? 0, t.Z ?? 0)),
				l.Transform.Rot)) &&
				(r = Rotator_1.Rotator.Create(t.Y ?? 0, t.Z ?? 0, t.X ?? 0));
		}
		if (ModelManager_1.ModelManager.AutoRunModel.IsInLogicTreeGmMode()) {
			if (ModelManager_1.ModelManager.AutoRunModel.ShouldFastSkip)
				return void this.WRe(!0);
			(o = void 0), (r = void 0);
		}
		ControllerHolder_1.ControllerHolder.GameModeController.ChangeSubLevel(
			e.UnloadLevels,
			e.LoadLevels,
			0,
			o,
			r,
			this.WRe,
		);
	}
	OnBackgroundExecute() {
		this.OnExecute();
	}
}
exports.FlowActionSwitchSubLevels = FlowActionSwitchSubLevels;
