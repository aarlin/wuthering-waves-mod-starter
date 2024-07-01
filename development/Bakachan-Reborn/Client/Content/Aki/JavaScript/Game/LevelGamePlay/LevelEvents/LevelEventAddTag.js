"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventAddTag = void 0);
const FNameUtil_1 = require("../../../Core/Utils/FNameUtil"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventAddTag extends LevelGeneralBase_1.LevelEventBase {
	Execute(e, a) {
		var t;
		a &&
			e &&
			((e = e.get("Tag")), (t = FNameUtil_1.FNameUtil.GetDynamicFName(e)), e) &&
			t &&
			!a.Tags.Contains(t) &&
			a.Tags.Add(t);
	}
}
exports.LevelEventAddTag = LevelEventAddTag;
