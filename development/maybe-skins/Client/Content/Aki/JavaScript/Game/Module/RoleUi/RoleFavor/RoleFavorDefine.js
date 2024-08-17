"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleFavorHintData =
		exports.RoleFavorLockItemData =
		exports.RoleFavorDescComponentData =
		exports.ContentItemData =
		exports.ClassifyItemData =
			void 0);
class ClassifyItemData {
	constructor(t, o, a, e) {
		(this.TitleTableId = t),
			(this.FavorTabType = o),
			(this.RoleId = a),
			(this.TypeParam = e);
	}
}
exports.ClassifyItemData = ClassifyItemData;
class ContentItemData {
	constructor(t, o, a, e) {
		(this.FavorTabType = t),
			(this.RoleId = o),
			(this.TypeParam = e),
			(this.Config = a);
	}
}
exports.ContentItemData = ContentItemData;
class RoleFavorDescComponentData {
	constructor(t, o) {
		(this.Title = t), (this.Desc = o);
	}
}
exports.RoleFavorDescComponentData = RoleFavorDescComponentData;
class RoleFavorLockItemData {
	constructor(t, o) {
		(this.IsLock = t), (this.Desc = o);
	}
}
exports.RoleFavorLockItemData = RoleFavorLockItemData;
class RoleFavorHintData {
	constructor(t, o) {
		(this.RoleConfig = t), (this.Exp = o);
	}
}
exports.RoleFavorHintData = RoleFavorHintData;
