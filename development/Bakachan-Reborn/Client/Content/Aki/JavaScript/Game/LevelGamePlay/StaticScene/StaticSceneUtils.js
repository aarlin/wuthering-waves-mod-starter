"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.StaticSceneUtils = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	ModelManager_1 = require("../../Manager/ModelManager");
class StaticSceneUtils {
	static GetActorRefByPbDataId(e) {
		if (e) {
			var t = ModelManager_1.ModelManager.CreatureModel.GetActorRefData();
			if (t) {
				var o = (a = ModelManager_1.ModelManager.GameModeModel.MapPath).split(
						"/",
					),
					a = a + "." + o[o.length - 1];
				o = e;
				if ((e = t.get(a)))
					return (
						(t = e.get(o)) ||
							(Log_1.Log.CheckDebug() &&
								Log_1.Log.Debug(
									"SceneItem",
									7,
									"[StaticSceneUtils]无actor引用",
									["levelPath", a],
									["pbDataId", o],
								)),
						t
					);
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("Level", 7, "[StaticSceneUtils]未读到对应Level配置", [
						"levelPath",
						a,
					]);
			} else
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Level",
						7,
						"[StaticSceneUtils]ActorRefConfig配置文件读取失败",
					);
		}
	}
}
exports.StaticSceneUtils = StaticSceneUtils;
