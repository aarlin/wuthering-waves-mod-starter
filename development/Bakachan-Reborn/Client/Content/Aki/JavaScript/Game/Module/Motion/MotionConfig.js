"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MotionConfig = void 0);
const MotionById_1 = require("../../../Core/Define/ConfigQuery/MotionById"),
	MotionByRoleId_1 = require("../../../Core/Define/ConfigQuery/MotionByRoleId"),
	MotionByRoleIdAndType_1 = require("../../../Core/Define/ConfigQuery/MotionByRoleIdAndType"),
	MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
	ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class MotionConfig extends ConfigBase_1.ConfigBase {
	GetMotionConfig(o) {
		return MotionById_1.configMotionById.GetConfig(o);
	}
	GetMotionConfigsByRoleId(o) {
		return MotionByRoleId_1.configMotionByRoleId.GetConfigList(o);
	}
	GetRoleMotionByType(o, t) {
		return MotionByRoleIdAndType_1.configMotionByRoleIdAndType.GetConfigList(
			o,
			t,
		);
	}
	GetMotionTitle(o) {
		if ((o = this.GetMotionConfig(o)))
			return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(o?.Title);
	}
	GetMotionContent(o) {
		if ((o = this.GetMotionConfig(o)))
			return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(o?.Content);
	}
	GetMotionUnLockConditionGroup(o) {
		return this.GetMotionConfig(o)?.CondGroupId;
	}
	GetMotionRoleId(o) {
		return this.GetMotionConfig(o)?.RoleId;
	}
	GetMotionType(o) {
		return this.GetMotionConfig(o)?.Type;
	}
	GetMotionSort(o) {
		return this.GetMotionConfig(o)?.Sort;
	}
	GetMotionImg(o) {
		return this.GetMotionConfig(o)?.MotionImg;
	}
	GetMotionAnimation(o) {
		return this.GetMotionConfig(o)?.AniMontage;
	}
}
exports.MotionConfig = MotionConfig;
