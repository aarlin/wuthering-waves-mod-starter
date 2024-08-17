"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MarkChildIconComponent = void 0);
const UE = require("ue"),
	StringUtils_1 = require("../../../../../../Core/Utils/StringUtils"),
	UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
class MarkChildIconComponent extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments), (this.n8 = void 0);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [[0, UE.UISprite]];
	}
	OnStart() {
		this.GetSprite(0).SetUIActive(!1);
	}
	set Icon(e) {
		!e || StringUtils_1.StringUtils.IsEmpty(e)
			? this.GetSprite(0).SetUIActive(!1)
			: (this.GetSprite(0).SetUIActive(!0),
				(this.n8 = e),
				this.SetSpriteByPath(e, this.GetSprite(0), !1));
	}
	get Icon() {
		return this.n8;
	}
}
exports.MarkChildIconComponent = MarkChildIconComponent;
