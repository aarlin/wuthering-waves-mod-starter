"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleTagSmallIconItem = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class RoleTagSmallIconItem extends GridProxyAbstract_1.GridProxyAbstract {
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [[0, UE.UISprite]];
	}
	Refresh(e, o, r) {
		var t = ConfigManager_1.ConfigManager.RoleConfig.GetRoleTagConfig(e);
		void 0 === t
			? Log_1.Log.CheckError() &&
				Log_1.Log.Error("Role", 59, "RoleTagSmallIconItem无效tagId", [
					"TagId",
					e,
				])
			: ((e = this.GetSprite(0)),
				this.SetActive(!1),
				this.SetSpriteByPath(t.TagIcon, e, !1, void 0, () => {
					this.SetActive(!0);
				}));
	}
}
exports.RoleTagSmallIconItem = RoleTagSmallIconItem;
