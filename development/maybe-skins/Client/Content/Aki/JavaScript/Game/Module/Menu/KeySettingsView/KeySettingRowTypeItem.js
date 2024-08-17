"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.KeySettingRowTypeItem = void 0);
const UE = require("ue"),
	StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	LguiUtil_1 = require("../../Util/LguiUtil");
class KeySettingRowTypeItem extends UiPanelBase_1.UiPanelBase {
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UISprite],
			[1, UE.UIText],
		];
	}
	Refresh(e) {
		var t, i, s;
		1 === e.GetRowType() &&
			((s = e.KeyTypeIconSpritePath),
			(t = this.GetSprite(0)),
			(i = this.GetText(1)),
			StringUtils_1.StringUtils.IsEmpty(s)
				? t.SetUIActive(!1)
				: (this.SetSpriteByPath(e.KeyTypeIconSpritePath, t, !1),
					t.SetUIActive(!0)),
			(s = e.KeyTypeName),
			StringUtils_1.StringUtils.IsEmpty(s)
				? i.SetUIActive(!1)
				: (LguiUtil_1.LguiUtil.SetLocalTextNew(i, s), i.SetUIActive(!0)));
	}
}
exports.KeySettingRowTypeItem = KeySettingRowTypeItem;
