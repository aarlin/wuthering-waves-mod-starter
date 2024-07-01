"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.HeadStateCommonParam = void 0);
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
class HeadStateCommonParam {
	constructor() {
		(this.OutMonsterHalfHeight = 0),
			(this.OutTopMargin = 0),
			(this.OutHorizontalMargin = 0),
			(this.DrawHeadStateSocket = !1);
	}
	Init() {
		(this.OutMonsterHalfHeight =
			CommonParamById_1.configCommonParamById.GetFloatConfig(
				"HeadStateOutMonsterHeight",
			) / 2),
			(this.OutTopMargin =
				CommonParamById_1.configCommonParamById.GetFloatConfig(
					"HeadStateOutTopMargin",
				)),
			(this.OutHorizontalMargin =
				CommonParamById_1.configCommonParamById.GetFloatConfig(
					"HeadStateOutHorizontalMargin",
				)),
			(this.DrawHeadStateSocket = !1);
	}
}
exports.HeadStateCommonParam = HeadStateCommonParam;
