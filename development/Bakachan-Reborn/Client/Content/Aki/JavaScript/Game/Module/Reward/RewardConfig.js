"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RewardConfig = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
	DropPackageById_1 = require("../../../Core/Define/ConfigQuery/DropPackageById"),
	DropShowPlanById_1 = require("../../../Core/Define/ConfigQuery/DropShowPlanById"),
	ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class RewardConfig extends ConfigBase_1.ConfigBase {
	constructor() {
		super(...arguments),
			(this.lso = void 0),
			(this._so = void 0),
			(this.uso = void 0),
			(this.cso = void 0),
			(this.mso = void 0),
			(this.dso = void 0),
			(this.Cso = void 0),
			(this.gso = void 0),
			(this.fso = void 0),
			(this.pso = void 0),
			(this.vso = void 0),
			(this.Mso = void 0);
	}
	GetDropPackage(o) {
		return DropPackageById_1.configDropPackageById.GetConfig(o);
	}
	GetDropPackagePreview(o) {
		if ((o = DropPackageById_1.configDropPackageById.GetConfig(o)))
			return o.DropPreview;
	}
	GetDropShowPlan(o) {
		return DropShowPlanById_1.configDropShowPlanById.GetConfig(o);
	}
	GetSpeed() {
		return (
			this.lso ||
				(this.lso =
					CommonParamById_1.configCommonParamById.GetIntConfig(
						"adsorption_speed",
					)),
			this.lso
		);
	}
	GetMaxAdsorption() {
		return (
			this._so ||
				(this._so =
					CommonParamById_1.configCommonParamById.GetIntConfig(
						"adsorption_time",
					)),
			this._so
		);
	}
	GetHeightProtect() {
		return (
			this.uso ||
				(this.uso = CommonParamById_1.configCommonParamById.GetIntConfig(
					"drop_height_protect",
				)),
			this.uso
		);
	}
	GetRestitution() {
		return (
			this.cso ||
				(this.cso = CommonParamById_1.configCommonParamById.GetFloatConfig(
					"drop_bounce_coefficient",
				)),
			this.cso
		);
	}
	GetFriction() {
		return (
			this.mso ||
				(this.mso =
					CommonParamById_1.configCommonParamById.GetFloatConfig(
						"drop_friction",
					)),
			this.mso
		);
	}
	GetDropItemPickUpRange() {
		return (
			this.dso ||
				(this.dso = CommonParamById_1.configCommonParamById.GetIntConfig(
					"drop_item_pickup_range",
				)),
			this.dso
		);
	}
	GetPickUpInBagRange() {
		return (
			this.Cso ||
				(this.Cso = CommonParamById_1.configCommonParamById.GetIntConfig(
					"drop_pickup_in_bag_range",
				)),
			this.Cso
		);
	}
	GetDropItemAcceleration() {
		return (
			this.gso ||
				(this.gso = CommonParamById_1.configCommonParamById.GetIntConfig(
					"adsorption_acceleration",
				)),
			this.gso
		);
	}
	GetFallToGroundSpeed() {
		return (
			this.fso ||
				(this.fso = CommonParamById_1.configCommonParamById.GetIntConfig(
					"drop_fall_ground_speed",
				)),
			this.fso
		);
	}
	GetDropChestOffsetZ() {
		return (
			this.pso ||
				(this.pso = CommonParamById_1.configCommonParamById.GetIntConfig(
					"drop_chest_zaxis_offset",
				)),
			this.pso
		);
	}
	GetDropBornRadius() {
		return (
			this.vso ||
				(this.vso =
					CommonParamById_1.configCommonParamById.GetIntConfig(
						"drop_born_radius",
					)),
			this.vso
		);
	}
	GetDropRotationProtectTime() {
		return (
			this.Mso ||
				(this.Mso = CommonParamById_1.configCommonParamById.GetIntConfig(
					"drop_lock_rotation_time",
				)),
			this.Mso
		);
	}
	GetMergedDropPackagePreviewItemList(o) {
		var t = [];
		if (o)
			for (const e of o) {
				var r = this.GetDropPackage(e)?.DropPreview;
				if (r)
					for (const o of r) {
						var i = [{ IncId: 0, ItemId: o[0] }, o[1]];
						t.push(i);
					}
			}
		return t;
	}
	GetLowModeCount() {
		var o = CommonParamById_1.configCommonParamById.GetIntConfig(
			"into_bag_list_low_count",
		);
		return (
			void 0 === o &&
				Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Reward",
					9,
					'慢速模式最大数量无法找到, 请检测c.参数字段"into_bag_list_low_count"',
				),
			0 <= o ? o : 1
		);
	}
	GetFastModeCount() {
		var o = CommonParamById_1.configCommonParamById.GetIntConfig(
			"into_bag_list_fast_count",
		);
		return (
			void 0 === o &&
				Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Reward",
					9,
					'快速模式最大数量无法找到, 请检测c.参数字段"into_bag_list_fast_count"',
				),
			0 <= o ? o : 1
		);
	}
	GetLowModeNextAddItemTime() {
		var o = CommonParamById_1.configCommonParamById.GetIntConfig(
			"into_bag_next_item_low_time",
		);
		return (
			void 0 === o &&
				Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Reward",
					9,
					'慢速模式下一个物品进包时间无法找到, 请检测c.参数字段"into_bag_next_item_low_time"',
				),
			0 <= o ? o : 1
		);
	}
	GetFastModeNextAddItemTime() {
		var o = CommonParamById_1.configCommonParamById.GetIntConfig(
			"into_bag_next_item_fast_time",
		);
		return (
			void 0 === o &&
				Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Reward",
					9,
					'快速模式下一个物品进包时间无法找到, 请检测c.参数字段"into_bag_next_item_fast_time"',
				),
			0 <= o ? o : 1
		);
	}
	GetIntoBagMaxCount() {
		var o =
			CommonParamById_1.configCommonParamById.GetIntConfig(
				"item_list_max_size",
			);
		return (
			void 0 === o &&
				Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Reward",
					9,
					'外入包列表最大数量无法找到, 请检测c.参数字段"item_list_max_size"',
				),
			0 <= o ? o : 1
		);
	}
	GetShowTime() {
		var o =
			CommonParamById_1.configCommonParamById.GetIntConfig(
				"into_bag_show_time",
			);
		return (
			void 0 === o &&
				Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Reward",
					9,
					'入包每个物品的显示时间无法找到, 请检测c.参数字段"into_bag_show_time"',
				),
			0 <= o ? o : 3e3
		);
	}
	GetNextItemTime() {
		var o = CommonParamById_1.configCommonParamById.GetIntConfig(
			"into_bag_next_item_time",
		);
		return (
			void 0 === o &&
				Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Reward",
					9,
					'下一个物品添加进来的时间无法找到, 请检测c.参数字段"into_bag_next_item_time"',
				),
			0 <= o ? o : 300
		);
	}
	GetSliderTime() {
		var o = CommonParamById_1.configCommonParamById.GetIntConfig(
			"into_bag_slide_time",
		);
		return (
			void 0 === o &&
				Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Reward",
					9,
					'上滑时间无法找到, 请检测c.参数字段"into_bag_slide_time"',
				),
			0 <= o ? o : 200
		);
	}
	OnClear() {
		return (
			(this.lso = void 0),
			(this._so = void 0),
			(this.uso = void 0),
			(this.cso = void 0),
			(this.mso = void 0),
			(this.dso = void 0),
			(this.Cso = void 0),
			(this.gso = void 0),
			(this.fso = void 0),
			(this.pso = void 0),
			!(this.vso = void 0)
		);
	}
}
exports.RewardConfig = RewardConfig;
