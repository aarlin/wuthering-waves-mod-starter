"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CombatScriptHelper = void 0);
const AnimHelp_1 = require("./AnimHelp"),
	CombatDebugScript_1 = require("./CombatDebugScript");
class CombatScriptHelper extends CombatDebugScript_1.CombatScriptHelperBase {
	OnInit() {
		this.CombatScripts.push(new AnimHelp_1.AnimHelp());
	}
}
exports.CombatScriptHelper = CombatScriptHelper;
