"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GameplayCueHideBone = void 0);
const FNameUtil_1 = require("../../../../../../../Core/Utils/FNameUtil"),
	GameplayCueBase_1 = require("./GameplayCueBase");
class GameplayCueHideBone extends GameplayCueBase_1.GameplayCueBase {
	OnCreate() {
		this.YXo(!0);
	}
	OnDestroy() {
		this.YXo(!1);
	}
	YXo(e) {
		var a = FNameUtil_1.FNameUtil.GetDynamicFName(this.CueConfig.Parameters[0]);
		let t = "1" === (this.CueConfig.Parameters[1] ?? "1");
		e || (t = !t),
			this.ActorInternal.Mesh.IsBoneHiddenByName(a) !== t &&
				(t
					? this.ActorInternal.Mesh.HideBoneByName(
							a,
							Number(this.CueConfig.Parameters[1]) ?? 0,
						)
					: this.ActorInternal.Mesh.UnHideBoneByName(a));
	}
}
exports.GameplayCueHideBone = GameplayCueHideBone;
