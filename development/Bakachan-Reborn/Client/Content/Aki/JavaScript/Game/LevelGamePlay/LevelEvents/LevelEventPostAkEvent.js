"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventPostAkEvent = void 0);
const AudioSystem_1 = require("../../../Core/Audio/AudioSystem"),
	Log_1 = require("../../../Core/Common/Log"),
	IAction_1 = require("../../../UniverseEditor/Interface/IAction"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventPostAkEvent extends LevelGeneralBase_1.LevelEventBase {
	ExecuteNew(e, o) {
		var t, n;
		e
			? e.EventConfig.Type === IAction_1.EPostAkEvent.Global
				? ((t = (0, AudioSystem_1.parseAudioEventPath)(e.EventConfig.AkEvent)),
					AudioSystem_1.AudioSystem.PostEvent(t),
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("Audio", 57, "[Game.Action] PostEvent", [
							"Event",
							t,
						]))
				: e.EventConfig.Type === IAction_1.EPostAkEvent.Target &&
					((t = e.EventConfig.EntityId),
					(n = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(t))
						? (n = n.Entity.GetComponent(1)?.Owner)?.IsValid()
							? ((e = (0, AudioSystem_1.parseAudioEventPath)(
									e.EventConfig.AkEvent,
								)),
								AudioSystem_1.AudioSystem.PostEvent(e, n),
								Log_1.Log.CheckInfo() &&
									Log_1.Log.Info(
										"Audio",
										57,
										"[Game.Action] PostEvent",
										["Event", e],
										["Actor", n],
									))
							: Log_1.Log.CheckError() &&
								Log_1.Log.Error(
									"Event",
									34,
									"未能获取到该实体对应的有效Actor",
									["entityId", t],
								)
						: Log_1.Log.CheckError() &&
							Log_1.Log.Error("Event", 34, "实体不存在", ["entityId", t]))
			: Log_1.Log.CheckError() && Log_1.Log.Error("Event", 34, "参数配置错误");
	}
}
exports.LevelEventPostAkEvent = LevelEventPostAkEvent;
