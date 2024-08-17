"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventSwitchLevels = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
	Vector_1 = require("../../../Core/Utils/Math/Vector"),
	IAction_1 = require("../../../UniverseEditor/Interface/IAction"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventSwitchLevels extends LevelGeneralBase_1.LevelEventBase {
	constructor() {
		super(...arguments),
			(this.WRe = (e) => {
				e && this.FinishExecute(!0);
			});
	}
	ExecuteNew(e, r) {
		if (e) {
			var o = e;
			switch (o.Type) {
				case IAction_1.ESwitchSubLevelsType.Directly:
					this.KRe(o);
					break;
				case IAction_1.ESwitchSubLevelsType.Preload:
					this.QRe(o);
			}
		}
	}
	QRe(e) {
		ModelManager_1.ModelManager.AutoRunModel.IsInLogicTreeGmMode()
			? this.FinishExecute(!0)
			: ControllerHolder_1.ControllerHolder.GameModeController.PreloadSubLevel(
					e.PreloadLevels,
				).then(() => {
					this.FinishExecute(!0);
				});
	}
	KRe(e) {
		let r, o;
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
					(r = Vector_1.Vector.Create(t.X ?? 0, t.Y ?? 0, t.Z ?? 0)),
				l.Transform.Rot)) &&
				(o = Rotator_1.Rotator.Create(t.Y ?? 0, t.Z ?? 0, t.X ?? 0));
		}
		if (ModelManager_1.ModelManager.AutoRunModel.IsInLogicTreeGmMode()) {
			if (ModelManager_1.ModelManager.AutoRunModel.ShouldFastSkip)
				return void this.WRe(!0);
			(r = void 0), (o = void 0);
		}
		ControllerHolder_1.ControllerHolder.GameModeController.ChangeSubLevel(
			e.UnloadLevels,
			e.LoadLevels,
			0,
			r,
			o,
			this.WRe,
		);
	}
}
exports.LevelEventSwitchLevels = LevelEventSwitchLevels;
