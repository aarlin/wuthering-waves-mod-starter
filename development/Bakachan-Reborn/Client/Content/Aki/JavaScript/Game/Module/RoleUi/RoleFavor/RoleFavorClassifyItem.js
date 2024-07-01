"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleFavorClassifyItem = exports.initContentItem = void 0);
const UE = require("ue"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	GenericLayoutNew_1 = require("../../Util/Layout/GenericLayoutNew"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	RoleFavorContentItem_1 = require("./RoleFavorContentItem"),
	RoleFavorDefine_1 = require("./RoleFavorDefine"),
	RoleFavorUtil_1 = require("./RoleFavorUtil"),
	initContentItem = (e, o, t) => ({
		Key: t,
		Value: new RoleFavorContentItem_1.RoleFavorContentItem(e, o),
	});
exports.initContentItem = initContentItem;
class RoleFavorClassifyItem extends UiPanelBase_1.UiPanelBase {
	constructor(e, o) {
		super(),
			(this.ContentGenericLayout = void 0),
			(this.C1o = []),
			(this.g1o = () => {
				this.C1o = this.f1o();
			}),
			(this.p1o = e),
			this.CreateThenShowByActor(o.GetOwner());
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIVerticalLayout],
			[1, UE.UIText],
		];
	}
	OnStart() {
		var e = this.GetText(1);
		LguiUtil_1.LguiUtil.SetLocalText(e, this.p1o.TitleTableId),
			this.g1o(),
			(this.ContentGenericLayout = new GenericLayoutNew_1.GenericLayoutNew(
				this.GetVerticalLayout(0),
				exports.initContentItem,
			)),
			this.ContentGenericLayout.RebuildLayoutByDataNew(this.C1o);
	}
	OnBeforeDestroy() {
		(this.p1o = void 0), (this.C1o = []);
	}
	f1o() {
		if (RoleFavorUtil_1.RoleFavorUtil.IsRoleInfo(this.p1o)) return this.v1o();
		var e = [],
			o = this.p1o.RoleId,
			t = this.p1o.TypeParam,
			i = this.p1o.FavorTabType;
		let n;
		switch (this.p1o.FavorTabType) {
			case 2:
				n = ConfigManager_1.ConfigManager.MotionConfig.GetRoleMotionByType(
					o,
					t,
				);
				break;
			case 1:
				n =
					ConfigManager_1.ConfigManager.RoleFavorConfig.GetFavorStoryConfig(o);
				break;
			case 3:
				n =
					ConfigManager_1.ConfigManager.RoleFavorConfig.GetFavorGoodsConfig(o);
				break;
			case 0:
				n = ConfigManager_1.ConfigManager.RoleFavorConfig.GetFavorWordConfig(
					o,
					t,
				);
		}
		var a = n.length;
		for (let s = 0; s < a; s++) {
			var r = n[s];
			r = new RoleFavorDefine_1.ContentItemData(i, o, r, t);
			e.push(r);
		}
		return e;
	}
	v1o() {
		var e = [],
			o = this.M1o(1),
			t = this.M1o(2);
		return e.push(o, t), e;
	}
	M1o(e) {
		var o = this.p1o.RoleId,
			t =
				ConfigManager_1.ConfigManager.RoleFavorConfig.GetFavorRoleInfoConfig(o);
		return new RoleFavorDefine_1.ContentItemData(1, o, t, e);
	}
}
exports.RoleFavorClassifyItem = RoleFavorClassifyItem;
