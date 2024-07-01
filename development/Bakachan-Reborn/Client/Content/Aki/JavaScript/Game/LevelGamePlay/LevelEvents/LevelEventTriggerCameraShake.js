"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventTriggerCameraShake = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	Log_1 = require("../../../Core/Common/Log"),
	CommonDefine_1 = require("../../../Core/Define/CommonDefine"),
	ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
	CameraController_1 = require("../../Camera/CameraController"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	CharacterController_1 = require("../../NewWorld/Character/CharacterController"),
	LevelGeneralBase_1 = require("../LevelGeneralBase"),
	MAX_SHAKE_DURATION = CommonDefine_1.SECOND_PER_MINUTE;
class LevelEventTriggerCameraShake extends LevelGeneralBase_1.LevelEventBase {
	ExecuteNew(e, r, a) {
		if (e) {
			const r = e.CameraShakeConfig;
			ResourceSystem_1.ResourceSystem.LoadAsync(
				e.CameraShakeBp + "_C",
				UE.Class,
				(e) => {
					var a, o;
					e?.IsValid() &&
						((a = (0, puerts_1.$ref)(void 0)),
						UE.KuroStaticLibrary.GetCameraShakeInfo(e, a)
							? 1 === (a = (0, puerts_1.$unref)(a)).Duration.Type ||
								a.Duration.Duration > MAX_SHAKE_DURATION
								? Log_1.Log.CheckError() &&
									Log_1.Log.Error(
										"LevelEvent",
										40,
										"振荡类型为无限或时长过长，取消振荡",
										["时长类型", a.Duration.Type],
										["时长", a.Duration.Duration],
										["限制最大时长", MAX_SHAKE_DURATION],
									)
								: "Constant" === r.Type
									? CameraController_1.CameraController.PlayCameraShake(
											e,
											CameraController_1.CameraController.Model.ShakeModify,
										)
									: "LinearOverRange" === r.Type &&
										(a =
											ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
												r.CenterEntityId,
											)) &&
										((o =
											CharacterController_1.CharacterController.GetActorComponent(
												a,
											)),
										(a = a.Entity.GetComponent(0)),
										(o = o?.ActorLocation ?? a.GetLocation()),
										CameraController_1.CameraController.PlayWorldCameraShake(
											e,
											o,
											r.MinRange,
											r.MaxRange,
											0,
											!1,
										))
							: Log_1.Log.CheckError() &&
								Log_1.Log.Error(
									"LevelEvent",
									40,
									"振荡时长检测失败，取消振荡",
									["CameraShakeClass", e],
								));
				},
			);
		}
	}
}
exports.LevelEventTriggerCameraShake = LevelEventTriggerCameraShake;
