"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleAudioData = void 0);
const ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	RoleModuleDataBase_1 = require("./RoleModuleDataBase");
class RoleAnimAudioData {
	constructor(e, o) {
		(this.CanInterrupt = e), (this.AudioPath = o);
	}
}
class RoleAudioData extends RoleModuleDataBase_1.RoleModuleDataBase {
	constructor(e) {
		super(e), (this.Xlo = new Map()), this.$lo();
	}
	$lo() {
		var e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleAudioMap(
			this.RoleId,
		);
		if (e)
			for (const a of e) {
				var o = new RoleAnimAudioData(a.CanInterrupt, a.AudioPath);
				this.Xlo.set(a.ActionName, o);
			}
	}
	GetAudioPathByName(e) {
		if (this.Xlo) return this.Xlo.get(e);
	}
}
exports.RoleAudioData = RoleAudioData;
