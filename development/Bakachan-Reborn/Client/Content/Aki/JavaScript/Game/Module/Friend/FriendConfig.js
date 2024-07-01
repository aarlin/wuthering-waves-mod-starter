"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FriendConfig = void 0);
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
	FriendFilterAll_1 = require("../../../Core/Define/ConfigQuery/FriendFilterAll"),
	HeadIconById_1 = require("../../../Core/Define/ConfigQuery/HeadIconById"),
	PersonalTipsByFunctionId_1 = require("../../../Core/Define/ConfigQuery/PersonalTipsByFunctionId"),
	PersonalTipsById_1 = require("../../../Core/Define/ConfigQuery/PersonalTipsById"),
	ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class FriendConfig extends ConfigBase_1.ConfigBase {
	constructor() {
		super(...arguments),
			(this.DVt = (e, n) => (
				(e = PersonalTipsById_1.configPersonalTipsById.GetConfig(e)),
				(n = PersonalTipsById_1.configPersonalTipsById.GetConfig(n)),
				e.Sort - n.Sort
			));
	}
	GetAllFilterConfigDuplicate() {
		var e = FriendFilterAll_1.configFriendFilterAll.GetConfigList();
		if (e) {
			var n = [];
			for (const i of e) n.push(i);
			return n;
		}
		return [];
	}
	GetHeadIconPath(e) {
		if ((e = HeadIconById_1.configHeadIconById.GetConfig(e))) return e.IconPath;
	}
	GetFriendLimitByViewType(e) {
		let n = "";
		switch (e) {
			case 1:
				n = "friend_list_limit";
				break;
			case 2:
				n = "friend_apply_list_limit";
				break;
			case 3:
				n = "RecentlyTeamLimit";
		}
		return CommonParamById_1.configCommonParamById.GetIntConfig(n);
	}
	GetProcessViewFunctionList() {
		var e =
			PersonalTipsByFunctionId_1.configPersonalTipsByFunctionId.GetConfigList(
				1,
			);
		const n = new Array();
		return (
			e.forEach((e) => {
				n.push(e.Id);
			}),
			n.sort(this.DVt),
			n
		);
	}
	GetDefaultBackgroundCardId() {
		return CommonParamById_1.configCommonParamById.GetIntConfig(
			"default_background_card",
		);
	}
}
exports.FriendConfig = FriendConfig;
