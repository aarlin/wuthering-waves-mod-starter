"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FilterConfig = void 0);
const FilterById_1 = require("../../../../../../Core/Define/ConfigQuery/FilterById"),
	FilterRuleById_1 = require("../../../../../../Core/Define/ConfigQuery/FilterRuleById"),
	FilterSortGroupById_1 = require("../../../../../../Core/Define/ConfigQuery/FilterSortGroupById"),
	ConfigBase_1 = require("../../../../../../Core/Framework/ConfigBase");
class FilterConfig extends ConfigBase_1.ConfigBase {
	GetFilterConfig(e) {
		return FilterById_1.configFilterById.GetConfig(e);
	}
	GetFilterRuleConfig(e) {
		return FilterRuleById_1.configFilterRuleById.GetConfig(e);
	}
	GetFilterId(e) {
		return FilterSortGroupById_1.configFilterSortGroupById.GetConfig(e)
			.FilterId;
	}
}
exports.FilterConfig = FilterConfig;
