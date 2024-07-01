"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.DynamicTabConfig = void 0);
const ConfigCommon_1 = require("../../../Core/Config/ConfigCommon"),
	UiDynamicTabByChildViewName_1 = require("../../../Core/Define/ConfigQuery/UiDynamicTabByChildViewName"),
	UiDynamicTabById_1 = require("../../../Core/Define/ConfigQuery/UiDynamicTabById"),
	UiDynamicTabByParentViewName_1 = require("../../../Core/Define/ConfigQuery/UiDynamicTabByParentViewName"),
	ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class DynamicTabConfig extends ConfigBase_1.ConfigBase {
	constructor() {
		super(...arguments), (this.VFt = (i, e) => i.TabIndex - e.TabIndex);
	}
	GetViewTabList(i) {
		return (
			(i = ConfigCommon_1.ConfigCommon.ToList(
				UiDynamicTabByParentViewName_1.configUiDynamicTabByParentViewName.GetConfigList(
					i,
				),
			)).sort(this.VFt),
			i
		);
	}
	GetTabViewNameList(i) {
		var e = [];
		for (const a of this.GetViewTabList(i)) e.push(a.ChildViewName);
		return e;
	}
	GetViewTab(i) {
		return UiDynamicTabByChildViewName_1.configUiDynamicTabByChildViewName.GetConfig(
			i,
		);
	}
	GetTabViewConfById(i) {
		return UiDynamicTabById_1.configUiDynamicTabById.GetConfig(i);
	}
}
exports.DynamicTabConfig = DynamicTabConfig;
