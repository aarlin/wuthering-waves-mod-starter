"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GamepadItemBase = void 0);
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class GamepadItemBase extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments), (this.pAi = new Map()), (this.vAi = new Map());
	}
	AddKeySprite(e, t) {
		this.pAi.set(e, t);
	}
	SetKeysEnable(e) {
		for (var [t, s] of this.vAi) e.includes(t) || s.SetUIActive(!1);
		for (const t of e) this.SetKeySpriteVisible(t, !0);
	}
	SetAllKeyDisable() {
		for (const e of this.vAi.values()) e.SetUIActive(!1);
	}
	SetKeySpriteVisible(e, t) {
		var s = this.pAi.get(e);
		s && (s.SetUIActive(t), t ? this.vAi.set(e, s) : this.vAi.delete(e));
	}
	OnBeforeDestroy() {
		this.pAi.clear(), this.vAi.clear();
	}
}
exports.GamepadItemBase = GamepadItemBase;
