"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.InstanceDungeonEntranceConfig = exports.EInstanceEntranceFlowType =
		void 0);
const Log_1 = require("../../../Core/Common/Log"),
	InstanceDungeonEntranceAll_1 = require("../../../Core/Define/ConfigQuery/InstanceDungeonEntranceAll"),
	InstanceDungeonEntranceById_1 = require("../../../Core/Define/ConfigQuery/InstanceDungeonEntranceById"),
	ConfigBase_1 = require("../../../Core/Framework/ConfigBase"),
	InstanceDungeonEntranceFlowNormal_1 = require("./Define/InstanceDungeonEntranceFlowNormal"),
	InstanceDungeonEntranceFlowRoguelike_1 = require("./Define/InstanceDungeonEntranceFlowRoguelike"),
	InstanceDungeonEntranceFlowSkipEditFormation_1 = require("./Define/InstanceDungeonEntranceFlowSkipEditFormation");
var EInstanceEntranceFlowType;
!(function (n) {
	(n[(n.Normal = 1)] = "Normal"),
		(n[(n.SkipEditFormation = 2)] = "SkipEditFormation"),
		(n[(n.SingleTimeTower = 3)] = "SingleTimeTower"),
		(n[(n.CycleTower = 4)] = "CycleTower"),
		(n[(n.NewTower = 5)] = "NewTower"),
		(n[(n.Roguelike = 6)] = "Roguelike"),
		(n[(n.BossRush = 7)] = "BossRush");
})(
	(EInstanceEntranceFlowType =
		exports.EInstanceEntranceFlowType ||
		(exports.EInstanceEntranceFlowType = {})),
);
class InstanceDungeonEntranceConfig extends ConfigBase_1.ConfigBase {
	constructor() {
		super(...arguments), (this.hai = new Map()), (this.lai = void 0);
	}
	OnInit() {
		return (
			this.hai.set(
				EInstanceEntranceFlowType.Normal,
				new InstanceDungeonEntranceFlowNormal_1.InstanceDungeonEntranceFlowNormal(),
			),
			this.hai.set(
				EInstanceEntranceFlowType.SkipEditFormation,
				new InstanceDungeonEntranceFlowSkipEditFormation_1.InstanceDungeonEntranceFlowSkipEditFormation(),
			),
			this.hai.set(
				EInstanceEntranceFlowType.Roguelike,
				new InstanceDungeonEntranceFlowRoguelike_1.InstanceDungeonEntranceFlowRoguelike(),
			),
			!0
		);
	}
	GetConfig(n) {
		var e =
			InstanceDungeonEntranceById_1.configInstanceDungeonEntranceById.GetConfig(
				n,
			);
		if (e) return e;
		Log_1.Log.CheckError() &&
			Log_1.Log.Error("InstanceDungeon", 17, "获取副本入口配置错误", ["id", n]);
	}
	GetInstanceDungeonEntranceFlowId(n) {
		let e = this.GetConfig(n)?.FlowId;
		return (
			e ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error("InstanceDungeon", 17, "获取副本入口流程错误", [
						"flowId",
						e,
					]),
				(e = EInstanceEntranceFlowType.Normal)),
			e
		);
	}
	GetInstanceDungeonEntranceFlow(n) {
		let e = this.GetConfig(n)?.FlowId;
		return (
			e ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error("InstanceDungeon", 17, "获取副本入口流程错误", [
						"flowId",
						e,
					]),
				(e = EInstanceEntranceFlowType.Normal)),
			this.hai.get(e)
		);
	}
	GetEntranceIdByMarkId(n) {
		if (!this.lai) {
			this.lai = new Map();
			for (const n of InstanceDungeonEntranceAll_1.configInstanceDungeonEntranceAll.GetConfigList())
				n.MarkId && this.lai.set(n.MarkId, n.Id);
		}
		return this.lai.get(n) ?? 0;
	}
	CheckMarkIdLinkDungeonEntrance(n) {
		return 0 < this.GetEntranceIdByMarkId(n);
	}
	CheckMarkIdIsTowerEntrance(n) {
		return (
			!!(n = this.lai.get(n)) &&
			((n = this.GetConfig(n))?.FlowId ===
				EInstanceEntranceFlowType.CycleTower ||
				n?.FlowId === EInstanceEntranceFlowType.SingleTimeTower ||
				n?.FlowId === EInstanceEntranceFlowType.NewTower)
		);
	}
	CheckMarkIdIsRoguelike(n) {
		return (
			!!(n = this.lai.get(n)) &&
			this.GetConfig(n)?.FlowId === EInstanceEntranceFlowType.Roguelike
		);
	}
}
exports.InstanceDungeonEntranceConfig = InstanceDungeonEntranceConfig;
