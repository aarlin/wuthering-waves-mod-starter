"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventToggleAirWall = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventToggleAirWall extends LevelGeneralBase_1.LevelEventBase {
	ExecuteNew(e, o, r) {
		e
			? o
				? (o = EntitySystem_1.EntitySystem.Get(o.EntityId))?.Valid
					? o.GetComponent(182)?.Owner
						? (o = o.GetComponent(147)) && o.HandleAirWall(e)
						: Log_1.Log.CheckError() &&
							Log_1.Log.Error("LevelEvent", 7, "状态控制actor不存在")
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error("LevelEvent", 7, "状态控制entity不存在")
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"LevelEvent",
						7,
						"此LevelEvent只能配置在SceneActorRefComponent中",
					)
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error("LevelEvent", 7, "参数类型错误");
	}
}
exports.LevelEventToggleAirWall = LevelEventToggleAirWall;
