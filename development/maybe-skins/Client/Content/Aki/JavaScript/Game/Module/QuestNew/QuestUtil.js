"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.QuestUtil = void 0);
const ue_1 = require("ue"),
	Vector_1 = require("../../../Core/Utils/Math/Vector"),
	ObjectUtils_1 = require("../../../Core/Utils/ObjectUtils"),
	GeneralLogicTreeUtil_1 = require("../GeneralLogicTree/GeneralLogicTreeUtil"),
	MapDefine_1 = require("../Map/MapDefine"),
	LguiUtil_1 = require("../Util/LguiUtil"),
	ConfigManager_1 = require("../../Manager/ConfigManager");
class QuestUtil {
	static SetTrackDistanceText(e, t) {
		if (!ObjectUtils_1.ObjectUtils.IsValid(e)) return !1;
		if (!t) return !1;
		var r = GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetPlayerLocation();
		if (!r) return !1;
		let i = 0;
		(i =
			t instanceof Vector_1.Vector
				? Vector_1.Vector.Dist(t, r) * MapDefine_1.FLOAT_0_01
				: ue_1.Vector.Dist(t, r.ToUeVector()) * MapDefine_1.FLOAT_0_01),
			(i = Math.round(i)),
			(r = r.Z - t.Z);
		let o = i.toString();
		return (
			(o =
				300 < r
					? `<texture=${ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("T_YellowArrowDown")}/>` +
						i
					: r < -300
						? i.toString()
						: `<texture=${ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("T_YellowArrowUp")}/>` +
							i),
			LguiUtil_1.LguiUtil.SetLocalText(e, "Meter", o),
			!0
		);
	}
}
exports.QuestUtil = QuestUtil;
