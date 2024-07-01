"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ChangeActionRowView = void 0);
const UE = require("ue"),
	InputSettingsManager_1 = require("../../../InputSettings/InputSettingsManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	LguiUtil_1 = require("../../Util/LguiUtil");
class ChangeActionRowView extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.uAi = void 0),
			(this.IsRevert = !1),
			(this.EVe = void 0),
			(this.OCt = (e) => {
				1 === e && this.EVe && this.EVe(this, this.IsRevert);
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[1, UE.UIText],
			[2, UE.UIText],
			[0, UE.UIExtendToggle],
		]),
			(this.BtnBindInfo = [[0, this.OCt]]);
	}
	OnBeforeDestroy() {
		this.uAi = void 0;
	}
	Refresh(e, t, i) {
		(this.uAi = e), (this.IsRevert = i);
		var n = (e = this.uAi.BothActionName)[0],
			s =
				((e = e[1]),
				(n = InputSettingsManager_1.InputSettingsManager.GetActionBinding(n)),
				(e = InputSettingsManager_1.InputSettingsManager.GetActionBinding(e)),
				[]),
			o = [];
		n.GetKeyNameList(s),
			e.GetKeyNameList(o),
			(n = s[this.uAi.GetKeyIndex(t)]),
			(e = o[this.uAi.GetKeyIndex(t)]),
			(s = this.uAi.GetSettingName()),
			LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), s),
			(o = i ? [e, n] : [n, e]),
			(s = this.uAi.GetKeyNameRichTextByKeyNameList(t, o, "/"));
		this.GetText(2)?.SetText(s);
	}
	BindOnSelected(e) {
		this.EVe = e;
	}
	SetSelected(e) {
		e
			? this.GetExtendToggle(0)?.SetToggleState(1)
			: this.GetExtendToggle(0)?.SetToggleState(0);
	}
}
exports.ChangeActionRowView = ChangeActionRowView;
