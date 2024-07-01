"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FIXED =
		exports.RATIO =
		exports.NurturePropItemData =
		exports.TipsAttributeData =
		exports.MINLEVEL =
		exports.PHANTOMTYPEALPHA =
		exports.UNPHANTOMTYPEALPHA =
		exports.WEAPONMATERIAL_ITEMTYPE =
		exports.WEAPON_ITEMTYPE =
			void 0),
	(exports.WEAPON_ITEMTYPE = 2),
	(exports.WEAPONMATERIAL_ITEMTYPE = 4),
	(exports.UNPHANTOMTYPEALPHA = 0.5),
	(exports.PHANTOMTYPEALPHA = 1),
	(exports.MINLEVEL = 5);
class TipsAttributeData {
	constructor(t, e, s) {
		(this.Value = 0),
			(this.IsRatio = !1),
			(this.Id = t),
			(this.Value = e),
			(this.IsRatio = s);
	}
}
exports.TipsAttributeData = TipsAttributeData;
class NurturePropItemData {
	constructor() {
		(this.Id = 0),
			(this.Count = 0),
			(this.ItemType = 2),
			(this.BottomText = ""),
			(this.TopText = ""),
			(this.RoleId = 0),
			(this.IsSingle = !1),
			(this.HoleId = void 0);
	}
}
(exports.NurturePropItemData = NurturePropItemData),
	(exports.RATIO = 2),
	(exports.FIXED = 1);
