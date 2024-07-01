"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ScrollingTipsController = void 0);
const ConfigManager_1 = require("../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
	LguiUtil_1 = require("../Util/LguiUtil");
class ScrollingTipsController extends UiControllerBase_1.UiControllerBase {
	static ShowTipsById(e, ...r) {
		(e = ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(e)),
			(e = new LguiUtil_1.TableTextArgNew(e)),
			ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByItsType(
				9,
				e,
				void 0,
				r,
			);
	}
	static ShowTipsByText(e) {
		ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByItsType(
			9,
			void 0,
			void 0,
			[e],
		);
	}
	static ShowTipsByTextId(e, ...r) {
		(e = new LguiUtil_1.TableTextArgNew(e)),
			ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByItsType(
				9,
				e,
				void 0,
				r,
			);
	}
}
exports.ScrollingTipsController = ScrollingTipsController;
