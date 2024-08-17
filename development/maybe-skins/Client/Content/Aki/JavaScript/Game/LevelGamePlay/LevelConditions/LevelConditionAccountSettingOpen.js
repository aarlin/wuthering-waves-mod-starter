"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelConditionAccountSettingOpen = void 0);
const ChannelController_1 = require("../../Module/Channel/ChannelController"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionAccountSettingOpen extends LevelGeneralBase_1.LevelConditionBase {
	Check(e, n) {
		return (
			!!e.LimitParams &&
			void 0 !== (e = Number(e.LimitParams.get("Id"))) &&
			ChannelController_1.ChannelController.CheckAccountSettingOpen(e)
		);
	}
}
exports.LevelConditionAccountSettingOpen = LevelConditionAccountSettingOpen;
