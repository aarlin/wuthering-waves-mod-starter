"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CommonTextItem = void 0);
const UE = require("ue"),
	GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
	LguiUtil_1 = require("../../Util/LguiUtil");
class CommonTextItem extends GridProxyAbstract_1.GridProxyAbstract {
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [[0, UE.UIText]];
	}
	SetTextByTextId(t, ...e) {
		LguiUtil_1.LguiUtil.SetLocalText(this.GetText(0), t, ...e);
	}
	Refresh(t, e, r) {
		this.SetTextByTextId(t.TextKey, ...t.Params);
	}
}
exports.CommonTextItem = CommonTextItem;
