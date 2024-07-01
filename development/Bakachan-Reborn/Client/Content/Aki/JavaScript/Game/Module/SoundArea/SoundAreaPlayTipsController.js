"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SoundAreaPlayTipsController = void 0);
const SoundAreaPlayInfoById_1 = require("../../../Core/Define/ConfigQuery/SoundAreaPlayInfoById"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	LocalStorage_1 = require("../../Common/LocalStorage"),
	LocalStorageDefine_1 = require("../../Common/LocalStorageDefine"),
	UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
	UiManager_1 = require("../../Ui/UiManager");
class SoundAreaPlayTipsController extends UiControllerBase_1.UiControllerBase {
	static async OpenSoundAreaPlayTips(e) {
		var o = SoundAreaPlayInfoById_1.configSoundAreaPlayInfoById.GetConfig(e);
		return (
			!(
				o?.MaxCount &&
				((
					LocalStorage_1.LocalStorage.GetPlayer(
						LocalStorageDefine_1.ELocalStoragePlayerKey.SilentTips,
					) ?? new Map()
				).get(e) ?? 0) >= o?.MaxCount
			) &&
			(UiManager_1.UiManager.IsViewShow("SoundAreaPlayTips")
				? (EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.SilentTipsRefresh,
						e,
					),
					!0)
				: void 0 !==
					(await UiManager_1.UiManager.OpenViewAsync("SoundAreaPlayTips", e)))
		);
	}
}
exports.SoundAreaPlayTipsController = SoundAreaPlayTipsController;
