"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GenericPromptConfig = void 0);
const UE = require("ue"),
	GenericPromptByTipsId_1 = require("../../../Core/Define/ConfigQuery/GenericPromptByTipsId"),
	GenericPromptTypesByTypeId_1 = require("../../../Core/Define/ConfigQuery/GenericPromptTypesByTypeId"),
	ConfigBase_1 = require("../../../Core/Framework/ConfigBase"),
	LguiUtil_1 = require("../Util/LguiUtil");
class GenericPromptConfig extends ConfigBase_1.ConfigBase {
	GetPromptTypeMainTextObj(e) {
		return new LguiUtil_1.TableTextArgNew(
			this.GetPromptTypeInfo(e).GeneralText,
		);
	}
	GetPromptTypeMainTextColor(e) {
		if ((e = this.GetPromptTypeInfo(e).TextColor)) return UE.Color.FromHex(e);
	}
	GetPromptTypeExtraTextObj(e) {
		return new LguiUtil_1.TableTextArgNew(
			this.GetPromptTypeInfo(e).GeneralExtraText,
		);
	}
	GetPromptMainTextObj(e) {
		return new LguiUtil_1.TableTextArgNew(this.GetPromptInfo(e).TipsText);
	}
	GetPromptExtraTextObj(e) {
		return new LguiUtil_1.TableTextArgNew(this.GetPromptInfo(e).ExtraText);
	}
	GetPromptInfo(e) {
		return GenericPromptByTipsId_1.configGenericPromptByTipsId.GetConfig(
			e.toString(),
		);
	}
	GetPromptInfoByRawId(e) {
		return GenericPromptByTipsId_1.configGenericPromptByTipsId.GetConfig(e);
	}
	GetPromptMainTextObjByRawId(e) {
		return new LguiUtil_1.TableTextArgNew(
			this.GetPromptInfoByRawId(e).TipsText,
		);
	}
	GetPromptTypeInfo(e) {
		return GenericPromptTypesByTypeId_1.configGenericPromptTypesByTypeId.GetConfig(
			e,
		);
	}
	GetPriority(e) {
		var t;
		return e.PromptId && 0 !== (t = this.GetPromptInfo(e.PromptId).Priority)
			? t
			: this.GetPromptTypeInfo(e.TypeId).Priority;
	}
}
exports.GenericPromptConfig = GenericPromptConfig;
