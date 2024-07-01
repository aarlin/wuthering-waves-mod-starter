"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventRestoreFromVision = void 0);
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
	Global_1 = require("../../Global"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventRestoreFromVision extends LevelGeneralBase_1.LevelEventBase {
	ExecuteNew(e, t, o) {
		if (e) {
			const t = Global_1.Global.BaseCharacter.CharacterActorComponent.Entity;
			if (((e = t?.GetComponent(33)), e && t)) {
				var n = t.GetComponent(47)?.FollowIds;
				if (n) {
					for (const e of n) {
						const t = EntitySystem_1.EntitySystem.Get(e);
						if (t) return void t.GetComponent(185)?.AddTag(-2042072030);
					}
					e.EndOwnerAndFollowSkills();
				}
			}
		}
	}
}
exports.LevelEventRestoreFromVision = LevelEventRestoreFromVision;
