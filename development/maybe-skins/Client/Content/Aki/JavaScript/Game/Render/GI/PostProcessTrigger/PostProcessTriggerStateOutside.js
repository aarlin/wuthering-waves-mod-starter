"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const PostProcessTriggerStateBase_1 = require("./PostProcessTriggerStateBase");
class PostProcessTriggerStateOutside extends PostProcessTriggerStateBase_1.default {
	OnEnter(e) {
		this.Owner.GetPostProcessComponent().BlendWeight = 0;
	}
}
exports.default = PostProcessTriggerStateOutside;
