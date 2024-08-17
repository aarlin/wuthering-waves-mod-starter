"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MarkSelectComponent = void 0);
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
	LevelSequencePlayer_1 = require("../../../../Common/LevelSequencePlayer");
class MarkSelectComponent extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments), (this.EPe = void 0), (this.mDi = !1);
	}
	OnStart() {
		this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
	}
	SetActive(e) {
		this.RootItem.SetUIActive(e),
			this.mDi !== e && e && this.EPe.PlayLevelSequenceByName("xuanzhong"),
			this.mDi === e || e || this.EPe.PlayLevelSequenceByName("Close");
	}
}
exports.MarkSelectComponent = MarkSelectComponent;
