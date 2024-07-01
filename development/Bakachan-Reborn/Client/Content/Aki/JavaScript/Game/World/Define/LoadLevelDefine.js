"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SubLevel = void 0);
const GameModePromise_1 = require("./GameModePromise");
class SubLevel {
	constructor(e) {
		(this.Path = e),
			(this.LoadType = 0),
			(this.Level = void 0),
			(this.LinkId = 0),
			(this.LoadPromise = void 0),
			(this.UnLoadPromise = void 0),
			(this.IsPreload = !1),
			(this.LoadPromise = new GameModePromise_1.GameModePromise());
	}
}
exports.SubLevel = SubLevel;
