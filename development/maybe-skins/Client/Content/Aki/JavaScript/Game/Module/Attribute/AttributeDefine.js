"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AttributeValueData =
		exports.TEN_THOUSANDTH_RATIO =
		exports.GREEN_ATTRIBUTE_INTERNAL =
			void 0),
	(exports.GREEN_ATTRIBUTE_INTERNAL = 1e4),
	(exports.TEN_THOUSANDTH_RATIO = 1e4);
class AttributeValueData {
	constructor(t, e, s) {
		(this.AttributeId = 0),
			(this.AttributeValue = 0),
			(this.IsRatio = !1),
			(this.AttributeId = t),
			(this.AttributeValue = e),
			(this.IsRatio = s);
	}
}
exports.AttributeValueData = AttributeValueData;
