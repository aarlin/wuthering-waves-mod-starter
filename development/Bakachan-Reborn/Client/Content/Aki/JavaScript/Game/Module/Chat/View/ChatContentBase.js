"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ChatContentBase = void 0);
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class ChatContentBase extends UiPanelBase_1.UiPanelBase {
	constructor(e, t, s, a) {
		super(),
			(this.ChatContentData = s),
			(this.$Mt = a),
			this.CreateThenShowByResourceIdAsync(e, t, !0).then(
				() => {
					this.$Mt && this.$Mt(this);
				},
				() => {},
			);
	}
}
exports.ChatContentBase = ChatContentBase;
