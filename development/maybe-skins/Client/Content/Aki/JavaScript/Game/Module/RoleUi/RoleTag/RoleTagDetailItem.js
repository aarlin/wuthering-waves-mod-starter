"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleTagDetailItem = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
	LguiUtil_1 = require("../../Util/LguiUtil");
class RoleTagDetailItem extends GridProxyAbstract_1.GridProxyAbstract {
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UISprite],
			[2, UE.UIText],
			[3, UE.UIText],
		];
	}
	Refresh(e, t, i) {
		var r = ConfigManager_1.ConfigManager.RoleConfig.GetRoleTagConfig(e);
		void 0 === r
			? Log_1.Log.CheckError() &&
				Log_1.Log.Error("Role", 59, "RoleTagSmallIconItem无效tagId", [
					"TagId",
					e,
				])
			: (this.GetItem(0).SetUIActive(i % 2 == 0),
				(e = this.GetSprite(1)),
				this.SetSpriteByPath(r.TagIcon, e, !1),
				LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), r.TagName),
				LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), r.TagDesc));
	}
}
exports.RoleTagDetailItem = RoleTagDetailItem;
