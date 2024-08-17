"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GamePlayerInfo = void 0);
class GamePlayerInfo {
	constructor() {
		(this.PlayerId = 0),
			(this.PlayerPosition = ""),
			(this.CameraPosition = ""),
			(this.CameraRotation = ""),
			(this.IsFight = !1),
			(this.EntityCount = 0),
			(this.ActorCount = 0);
	}
}
exports.GamePlayerInfo = GamePlayerInfo;
