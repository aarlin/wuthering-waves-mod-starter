"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.WorldLevelModel = void 0);
const ModelBase_1 = require("../../../Core/Framework/ModelBase"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../Manager/ConfigManager");
class WorldLevelModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.uko = 0),
			(this.cko = 0),
			(this.LastChangeWorldLevelTimeStamp = 0),
			(this.mko = 0),
			(this.WorldLevelChangeTarget = 0);
	}
	get WorldLevelMultilingualText() {
		return (
			ConfigManager_1.ConfigManager.TextConfig.GetTextById("WorldLevel") ?? ""
		);
	}
	get CurWorldLevel() {
		return this.cko;
	}
	set CurWorldLevel(e) {
		this.cko !== e &&
			((this.cko = e),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.CurWorldLevelChange,
			));
	}
	get OriginWorldLevel() {
		return this.uko;
	}
	set OriginWorldLevel(e) {
		var t = e > this.uko;
		(this.uko = e),
			t &&
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.OriginWorldLevelUp,
				);
	}
	get Sex() {
		return this.mko;
	}
	set Sex(e) {
		this.mko = e;
	}
	OnInit() {
		return !(this.LastChangeWorldLevelTimeStamp = 0);
	}
	OnClear() {
		return !0;
	}
}
exports.WorldLevelModel = WorldLevelModel;
