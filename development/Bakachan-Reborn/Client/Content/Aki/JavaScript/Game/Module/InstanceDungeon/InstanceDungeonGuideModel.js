"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.InstanceDungeonGuideModel = void 0);
const ModelBase_1 = require("../../../Core/Framework/ModelBase"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager");
class InstanceDungeonGuideModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments), (this.hli = 0), (this.lli = 0);
	}
	GetCurrentInstanceDungeonGuideType() {
		return this.hli;
	}
	GetCurrentInstanceDungeonGuideValue() {
		return this.lli;
	}
	RefreshCurrentDungeonGuide() {
		var e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetGuide(
			ModelManager_1.ModelManager.CreatureModel.GetInstanceId(),
		);
		e && ((this.hli = e[0]), (this.lli = e[1])),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.DungeonGuideChange,
			);
	}
	GetHaveGuide() {
		return 0 !== this.hli;
	}
}
exports.InstanceDungeonGuideModel = InstanceDungeonGuideModel;
