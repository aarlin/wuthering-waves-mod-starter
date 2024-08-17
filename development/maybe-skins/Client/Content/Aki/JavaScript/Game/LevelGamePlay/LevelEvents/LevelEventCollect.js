"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventCollect = void 0);
const AudioController_1 = require("../../../Core/Audio/AudioController"),
	Log_1 = require("../../../Core/Common/Log"),
	IComponent_1 = require("../../../UniverseEditor/Interface/IComponent"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventCollect extends LevelGeneralBase_1.LevelEventBase {
	ExecuteNew(e, t) {
		let o;
		switch (t.Type) {
			case 1:
				o = t.EntityId;
				break;
			case 5:
				o = t.TriggerEntityId;
				break;
			default:
				return;
		}
		var n;
		o &&
			((n = ModelManager_1.ModelManager.CreatureModel?.GetEntityById(o))
				? (n = n.Entity?.GetComponent(0)) &&
					(n = n.GetPbEntityInitData()) &&
					(n = (0, IComponent_1.getComponent)(
						n.ComponentsData,
						"InteractAudioComponent",
					)) &&
					n.InteractEventConfig &&
					(n = n.InteractEventConfig.CollectAkEvent) &&
					((n =
						ConfigManager_1.ConfigManager.AudioConfig?.GetAudioPath(n)?.Path)
						? AudioController_1.AudioController.PostEvent(n, void 0)
						: Log_1.Log.CheckWarn() &&
							Log_1.Log.Warn(
								"Audio",
								7,
								"[Audio][LevelEventCollect]collect 未找到资源",
								["eventPath", n],
							))
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"LevelEvent",
						7,
						"LevelEventCollect行为执行时找不到实体",
						["EntityId", o],
					));
	}
}
exports.LevelEventCollect = LevelEventCollect;
