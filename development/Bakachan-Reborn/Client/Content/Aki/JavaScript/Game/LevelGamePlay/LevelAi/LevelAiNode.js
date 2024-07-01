"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelAiNode = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	LevelAiDefines_1 = require("./LevelAiDefines");
class LevelAiNode {
	constructor() {
		(this._A = ++LevelAiNode.MIe),
			(this.SIe = void 0),
			(this.EIe = void 0),
			(this.Description = "");
	}
	Serialize(e, i, t) {
		(this.EIe = e), (this.SIe = i), (this.Description = t);
	}
	get CreatureDataComponent() {
		return this.SIe;
	}
	get CharacterPlanComponent() {
		return this.EIe;
	}
	PrintDescription(e, ...i) {
		LevelAiDefines_1.LEVEL_AI_DEBUG_MODE &&
			Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug(
				"LevelAi",
				30,
				e,
				["Uid", this._A],
				["Node", this.constructor.name],
				["Owner", this.SIe?.GetPbDataId()],
				["Description", this.Description],
				...i,
			);
	}
}
(exports.LevelAiNode = LevelAiNode).MIe = 0;
