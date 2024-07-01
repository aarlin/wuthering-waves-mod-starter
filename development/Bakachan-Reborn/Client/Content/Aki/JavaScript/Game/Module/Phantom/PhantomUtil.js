"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PhantomUtil = void 0);
const Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	DataTableUtil_1 = require("../../../Core/Utils/DataTableUtil"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager");
var ESummonType = Protocol_1.Aki.Protocol.Oqs;
const ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	PHANTOMSKILLIDSTART = 2e5,
	VISION_MORPH_SKILL_ID = 200001,
	VISION_MORPH_MULTI_SKILL_ID = 200003;
class PhantomUtil {
	static GetEntityVisionSkillId(e, t) {
		return 200001 === (t = this.GetSkillGroupId(t)) &&
			((e = ModelManager_1.ModelManager.CharacterModel?.GetHandle(e)),
			e?.Valid && e.Entity.GetComponent(34)?.CanSummonerStartNextMultiSkill())
			? 200003
			: t;
	}
	static GetSkillGroupId(e) {
		return e >= 2e5
			? ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSkillBySkillId(
					e,
				).SkillGroupId
			: (e =
						ConfigManager_1.ConfigManager.RouletteConfig.GetExploreConfigById(
							e,
						))
				? e.SkillGroupId
				: 0;
	}
	static GetSkillCd(e) {
		return e < 2e5 ||
			!(e =
				ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSkillBySkillId(
					e,
				))
			? -1
			: e.SkillCD;
	}
	static GetSkillBuffIds(e) {
		return e < 2e5 ||
			!(e =
				ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSkillBySkillId(
					e,
				))
			? []
			: e.BuffIds;
	}
	static GetSkillSettleIds(e) {
		return e < 2e5 ||
			!(e =
				ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSkillBySkillId(
					e,
				))
			? []
			: e.SettleIds;
	}
	static GetVisionData(e) {
		return DataTableUtil_1.DataTableUtil.GetDataTableRowFromName(
			17,
			e.toString(),
		);
	}
	static GetSummonedEntity(e, t, o = 0) {
		var n = e.GetComponent(0);
		let a = 0;
		switch (t) {
			case ESummonType.Proto_ESummonTypeConcomitantCustom:
				var r = n.CustomServerEntityIds;
				if (o > r.length - 1) return;
				a = r[o];
				break;
			case ESummonType.Proto_ESummonTypeConcomitantVision:
				a = n.VisionSkillServerEntityId;
				break;
			case ESummonType.Proto_ESummonTypeConcomitantPhantomRole:
				a = n.VisionControlCreatureDataId ?? 0;
		}
		return ModelManager_1.ModelManager.CreatureModel.GetEntity(a);
	}
	static SetVisionEnable(e, t) {
		0 < (e = e.GetComponent(0).VisionSkillServerEntityId) &&
			(e = ModelManager_1.ModelManager.CreatureModel.GetEntity(e)) &&
			ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(
				e.Entity,
				t,
				"PhantomUtil.SetVisionEnable",
				!0,
			);
	}
}
exports.PhantomUtil = PhantomUtil;
