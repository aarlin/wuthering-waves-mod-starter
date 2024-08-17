"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoguelikeUnlockTips = void 0);
const UE = require("ue"),
	UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
	LguiUtil_1 = require("../../Util/LguiUtil");
class RoguelikeUnlockTips extends UiViewBase_1.UiViewBase {
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [[0, UE.UIText]];
	}
	OnBeforeShow() {
		LguiUtil_1.LguiUtil.SetLocalTextNew(
			this.GetText(0),
			"LordGymUnLock",
			this.OpenParam,
		);
	}
	OnAfterPlayStartSequence() {
		this.CloseMe();
	}
}
exports.RoguelikeUnlockTips = RoguelikeUnlockTips;
