"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.DropDownLogicCreator = void 0);
const LanguageLogic_1 = require("./LanguageLogic");
class DropDownLogicCreator {
	static GetDropDownLogic(o) {
		return this.lAi.get(o);
	}
}
(exports.DropDownLogicCreator = DropDownLogicCreator).lAi = new Map([
	[51, new LanguageLogic_1.LanguageLogic()],
]);
