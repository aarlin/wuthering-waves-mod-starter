"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventEnterOrbitalCamera = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	Vector_1 = require("../../../Core/Utils/Math/Vector"),
	CameraController_1 = require("../../Camera/CameraController"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventEnterOrbitalCamera extends LevelGeneralBase_1.LevelEventBase {
	constructor() {
		super(...arguments),
			(this.gDe = Vector_1.Vector.Create()),
			(this.fDe = Vector_1.Vector.Create());
	}
	ExecuteNew(e, r) {
		var t;
		e
			? ((e = e.Option),
				(t = ModelManager_1.ModelManager.CreatureModel.GetEntityData(
					e.BegEntity,
				)?.Transform?.Pos)
					? (this.gDe.Set(t.X, t.Y, t.Z),
						(t = ModelManager_1.ModelManager.CreatureModel.GetEntityData(
							e.EndEntity,
						)?.Transform?.Pos)
							? (this.fDe.Set(t.X, t.Y, t.Z),
								CameraController_1.CameraController.OrbitalCamera.PlayerComponent.PlayCameraOrbitalPath(
									e.LevelSequence,
									this.gDe,
									this.fDe,
									e.BlendInTime,
									e.BlendOutTime,
								))
							: Log_1.Log.CheckError() &&
								Log_1.Log.Error("LevelEvent", 6, "EnterOrbitalCamera 缺少终点"))
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error("LevelEvent", 6, "EnterOrbitalCamera 缺少起点"))
			: this.FinishExecute(!1);
	}
	OnUpdateGuarantee() {
		EventSystem_1.EventSystem.Emit(
			EventDefine_1.EEventName.AddGuaranteeAction,
			this.Type,
			this.BaseContext,
			{ Name: "ExitOrbitalCamera" },
		);
	}
}
exports.LevelEventEnterOrbitalCamera = LevelEventEnterOrbitalCamera;
