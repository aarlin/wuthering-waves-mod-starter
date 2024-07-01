"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MeshComponentUtils = void 0);
const FNameUtil_1 = require("../../../../../../Core/Utils/FNameUtil");
class MeshComponentUtils {
	static RelativeAttachComponent(e, t, n = FNameUtil_1.FNameUtil.EMPTY) {
		e.K2_AttachToComponent(t, n, 0, 0, 0, !0);
	}
	static RelativeAttachComponentOnSafe(e, t, n = FNameUtil_1.FNameUtil.EMPTY) {
		return (
			t !== e.GetAttachParent() &&
			(MeshComponentUtils.RelativeAttachComponent(e, t, n), !0)
		);
	}
	static HideBone(e, t, n) {
		(t = FNameUtil_1.FNameUtil.GetDynamicFName(t)),
			FNameUtil_1.FNameUtil.IsEmpty(e.GetParentBone(t))
				? e.SetHiddenInGame(n)
				: e.IsBoneHiddenByName(t) !== n &&
					(n ? e.HideBoneByName(t, 0) : e.UnHideBoneByName(t));
	}
}
exports.MeshComponentUtils = MeshComponentUtils;
