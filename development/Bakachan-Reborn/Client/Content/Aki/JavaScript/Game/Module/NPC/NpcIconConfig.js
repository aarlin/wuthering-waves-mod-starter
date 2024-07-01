"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.NpcIconConfig = void 0);
const UE = require("ue"),
	Log_1 = require("../../../Core/Common/Log"),
	CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
	NpcHeadInfoById_1 = require("../../../Core/Define/ConfigQuery/NpcHeadInfoById"),
	ConfigBase_1 = require("../../../Core/Framework/ConfigBase"),
	ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
	NpcIconDefine_1 = require("./NpcIconDefine");
class NpcIconConfig extends ConfigBase_1.ConfigBase {
	constructor() {
		super(...arguments),
			(this.pqi = new Map()),
			(this.zat = void 0),
			(this.vqi = void 0),
			(this.Mqi = ""),
			(this.Sqi = 0),
			(this.Eqi = 0),
			(this.yqi = 0),
			(this.Iqi = 0),
			(this.Tqi = 0),
			(this.Lqi = 0);
	}
	get NpcIconHeadInfoLimitMinDistanceSquared() {
		return this.yqi;
	}
	get NpcIconHeadInfoLimitMaxDistanceSquared() {
		return this.Tqi;
	}
	OnInit() {
		return (
			this.GetNpcIconHeadInfoLimitMinDistance(),
			this.GetNpcIconHeadInfoLimitMaxDistance(),
			!0
		);
	}
	GetHeadStateScaleValue(i) {
		return (
			this.zat ||
				(this.zat = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
					NpcIconDefine_1.HEADSTATE_SCALE_CURVE_PATH,
					UE.CurveFloat,
				)),
			this.zat ? this.zat.GetFloatValue(i) : 1
		);
	}
	GetDialogScaleValue(i) {
		return (
			this.vqi ||
				(this.vqi = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
					NpcIconDefine_1.DIALOG_SCALE_CURVE_PATH,
					UE.CurveFloat,
				)),
			this.vqi ? this.vqi.GetFloatValue(i) : 1
		);
	}
	GetNpcIconSocketName() {
		return (
			this.Mqi ||
				(this.Mqi =
					CommonParamById_1.configCommonParamById.GetStringConfig(
						"npcicon_socketname",
					)),
			this.Mqi
		);
	}
	GetNpcIconLocationOffsetZ() {
		return (
			this.Sqi ||
				(this.Sqi = CommonParamById_1.configCommonParamById.GetIntConfig(
					"npcicon_location_offsetz",
				)),
			this.Sqi
		);
	}
	GetNpcIconHeadInfoLimitMinDistance() {
		return (
			this.Eqi ||
				((this.Eqi = CommonParamById_1.configCommonParamById.GetIntConfig(
					"npc_headinfo_limit_min_distance",
				)),
				(this.yqi = this.Eqi * this.Eqi)),
			this.Eqi
		);
	}
	GetNpcIconHeadInfoLimitMaxDistance() {
		return (
			this.Iqi ||
				((this.Iqi = CommonParamById_1.configCommonParamById.GetIntConfig(
					"npc_headinfo_limit_max_distance",
				)),
				(this.Tqi = this.Iqi * this.Iqi)),
			this.Iqi
		);
	}
	GetNpcIconHeadInfoNameLimitDistance() {
		return (
			this.Lqi ||
				(this.Lqi = CommonParamById_1.configCommonParamById.GetIntConfig(
					"npc_headinfo_name_limit_distance",
				)),
			this.Lqi
		);
	}
	GetNpcHeadInfo(i) {
		var e = NpcHeadInfoById_1.configNpcHeadInfoById.GetConfig(i);
		return (
			e ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Test",
						11,
						"查找不到对应的NPC头顶信息数据，检查一下NPC头顶信息表格",
						["ID", i],
					)),
			e
		);
	}
	OnClear() {
		return (
			this.pqi.clear(),
			(this.Mqi = void 0),
			(this.Sqi = void 0),
			(this.Eqi = void 0),
			(this.Iqi = void 0),
			(this.Lqi = void 0),
			(this.zat = void 0),
			!(this.vqi = void 0)
		);
	}
}
exports.NpcIconConfig = NpcIconConfig;
