"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SkipInterfaceModel = void 0);
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
	ModelBase_1 = require("../../../Core/Framework/ModelBase");
class SkipInterfaceModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.ResetToBattleViewCount = 0),
			(this.ContainerLimitCount = 3);
	}
	OnInit() {
		return (
			(this.ResetToBattleViewCount =
				CommonParamById_1.configCommonParamById.GetIntConfig(
					"ResetToBattleViewCount",
				)),
			!0
		);
	}
}
exports.SkipInterfaceModel = SkipInterfaceModel;
