"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MarkSelectComponent = void 0);
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
	LevelSequencePlayer_1 = require("../../../../Common/LevelSequencePlayer");
class MarkSelectComponent extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments), (this.xAe = void 0), (this.wTi = !1);
	}
	OnStart() {
		this.xAe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
	}
	SetActive(e) {
		this.RootItem.SetUIActive(e),
			this.wTi !== e && e && this.xAe.PlayLevelSequenceByName("xuanzhong");
	}
}
exports.MarkSelectComponent = MarkSelectComponent;
//# sourceMappingURL=MarkSelectComponent.js.map