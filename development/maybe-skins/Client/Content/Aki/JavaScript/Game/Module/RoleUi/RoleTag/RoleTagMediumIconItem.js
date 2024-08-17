"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleTagMediumIconItem = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
	LguiUtil_1 = require("../../Util/LguiUtil");
class RoleTagMediumIconItem extends GridProxyAbstract_1.GridProxyAbstract {
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UISprite],
			[1, UE.UIText],
			[2, UE.UISprite],
		];
	}
	Refresh(e, o, r) {
		var t,
			i = ConfigManager_1.ConfigManager.RoleConfig.GetRoleTagConfig(e);
		void 0 === i
			? Log_1.Log.CheckError() &&
				Log_1.Log.Error("Role", 59, "RoleTagMediumIconItem无效tagId", [
					"TagId",
					e,
				])
			: ((e = this.GetSprite(2)),
				(t = this.GetText(1)),
				this.SetSpriteByPath(i.TagIcon, e, !1),
				LguiUtil_1.LguiUtil.SetLocalTextNew(t, i.TagName),
				(i = UE.Color.FromHex(i.TagNameColor)),
				this.GetSprite(0).SetColor(i),
				e.SetColor(i),
				t.SetColor(i));
	}
}
exports.RoleTagMediumIconItem = RoleTagMediumIconItem;
