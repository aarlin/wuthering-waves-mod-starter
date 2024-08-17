"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiPopFrameViewRegisterCenter = void 0);
const FullScreenViewItem_1 = require("../Ui/Common/FullScreenViewItem"),
	InteractSystemViewItem_1 = require("../Ui/Common/InteractSystemViewItem"),
	NpcSystemViewItem_1 = require("../Ui/Common/NpcSystemViewItem"),
	PopupTypeBigItem_1 = require("../Ui/Common/PopupTypeBigItem"),
	PopupTypeLargeItem_1 = require("../Ui/Common/PopupTypeLargeItem"),
	PopupTypeMiddleItem_1 = require("../Ui/Common/PopupTypeMiddleItem"),
	PopupTypeSmallItem_1 = require("../Ui/Common/PopupTypeSmallItem"),
	UiPopFrameViewStorage_1 = require("../Ui/UiPopFrameViewStorage"),
	uiPopFrameViewCtorMap = {
		1: ["UiView_PopupB", PopupTypeBigItem_1.PopupTypeBigItem],
		4: ["UiView_PopupL", PopupTypeLargeItem_1.PopupTypeLargeItem],
		3: ["UiView_PopupM", PopupTypeMiddleItem_1.PopupTypeMiddleItem],
		2: ["UiView_PopupS", PopupTypeSmallItem_1.PopupTypeSmallItem],
		5: ["UiView_PopupL1", NpcSystemViewItem_1.NpcSystemViewItem],
		6: ["UiView_PopupL2", InteractSystemViewItem_1.InteractSystemViewItem],
		7: ["UiView_PopupFullScreen", FullScreenViewItem_1.FullScreenViewItem],
	};
class UiPopFrameViewRegisterCenter {
	static Init() {
		for (const i in uiPopFrameViewCtorMap) {
			var e = Number(i);
			UiPopFrameViewStorage_1.UiPopFrameViewStorage.RegisterUiBehaviourPop(
				e,
				uiPopFrameViewCtorMap[e],
			);
		}
	}
}
exports.UiPopFrameViewRegisterCenter = UiPopFrameViewRegisterCenter;
