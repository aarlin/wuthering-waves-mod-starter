"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FlowActionUtils = exports.WAIT_ENTITY_TIME = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent"),
	Global_1 = require("../../../Global"),
	ModelManager_1 = require("../../../Manager/ModelManager");
exports.WAIT_ENTITY_TIME = 2e4;
class FlowActionUtils {
	static CheckEntityInAoi(o) {
		if (
			ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(o)?.IsInit
		)
			return !0;
		var e = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(o);
		if (e)
			if (e.Transform) {
				var r,
					t,
					a = (0, IComponent_1.getComponent)(
						e.ComponentsData,
						"BaseInfoComponent",
					);
				if (a) {
					if (Global_1.Global.BaseCharacter?.CharacterActorComponent?.Valid)
						return (
							(r = IComponent_1.aoiXyLayerValues[a.AoiLayer]),
							(a = IComponent_1.aoizLayerValues[a.AoiZRadius]),
							(t = Vector_1.Vector.Create()).FromConfigVector(e.Transform.Pos),
							(e =
								Global_1.Global.BaseCharacter.CharacterActorComponent
									.ActorLocationProxy),
							Vector_1.Vector.Dist2D(t, e) < r &&
								(a < 0 || Math.abs(t.Z - e.Z) < a)
						);
					Log_1.Log.CheckWarn() &&
						Log_1.Log.Warn("Entity", 27, "当前角色未准备好");
				} else
					Log_1.Log.CheckError() &&
						Log_1.Log.Error("Entity", 27, "找不到BaseInfoComp，检查实体模板", [
							"pbDataId",
							o,
						]);
			} else
				Log_1.Log.CheckError() &&
					Log_1.Log.Error("Entity", 27, "Entity坐标未配置", ["pbDataId", o]);
		else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error("Entity", 27, "找不到EntityData，实体不存在", [
					"pbDataId",
					o,
				]);
	}
}
exports.FlowActionUtils = FlowActionUtils;
