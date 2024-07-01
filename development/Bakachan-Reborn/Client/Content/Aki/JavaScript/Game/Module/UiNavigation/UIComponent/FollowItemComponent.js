"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FollowItemComponent = void 0);
const HotKeyComponent_1 = require("./HotKeyComponent");
class FollowItemComponent extends HotKeyComponent_1.HotKeyComponent {
	constructor() {
		super(...arguments),
			(this.ResetFollowItem = () => {}),
			(this.FollowItem = (o, e) => {}),
			(this.OnInteractionHintChangeItemCountEvent = (o) => {});
	}
	OnInputAxis(o, e) {}
}
exports.FollowItemComponent = FollowItemComponent;
