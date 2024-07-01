"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.HotKeyTypeCreator = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	HotKeyViewDefine_1 = require("../../HotKeyViewDefine"),
	MultiHotKeyType_1 = require("./MultiHotKeyType"),
	NormalHotKeyType_1 = require("./NormalHotKeyType");
class HotKeyTypeCreator {
	static async CreateHotKeyType(e, o, t) {
		var r, y;
		return o < HotKeyViewDefine_1.ID_SEGMENT
			? ((r = new NormalHotKeyType_1.NormalHotKeyType()).SetIsMultiKeyItem(t),
				await r.CreateThenShowByActorAsync(e, [o]),
				r)
			: 0 ===
					(r =
						ConfigManager_1.ConfigManager.UiNavigationConfig.GetHotKeyTypeConfig(
							o,
						)).Type
				? ((y = new MultiHotKeyType_1.MultiHotKeyType()).SetIsMultiKeyItem(t),
					await y.CreateThenShowByActorAsync(e, r.HotKeyList),
					y)
				: void (
						Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"UiNavigation",
							11,
							"快捷键类型不存在!代码未进行注册",
							["Type", o],
						)
					);
	}
}
exports.HotKeyTypeCreator = HotKeyTypeCreator;
