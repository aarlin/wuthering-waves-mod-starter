"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GuaranteeController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	LevelGeneralContextDefine_1 = require("../LevelGeneralContextDefine"),
	GuaranteeActionCenter_1 = require("./GuaranteeActionCenter");
class GuaranteeController extends ControllerBase_1.ControllerBase {
	static OnInit() {
		return (
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.AddGuaranteeAction,
				this.rIe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.RemGuaranteeAction,
				this.nIe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.GeneralLogicTreeRemove,
				this.sIe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.ClearWorld,
				this.ExecSceneGuaranteeActions,
			),
			!0
		);
	}
	static OnClear() {
		return (
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.AddGuaranteeAction,
				this.rIe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.RemGuaranteeAction,
				this.nIe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.GeneralLogicTreeRemove,
				this.sIe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.ClearWorld,
				this.ExecSceneGuaranteeActions,
			),
			!0
		);
	}
	static ExecuteActions(e, n) {
		if (n)
			for (const a of e) {
				var t = a.Name,
					o =
						GuaranteeActionCenter_1.GuaranteeActionCenter.GetGuaranteeAction(t);
				o &&
					(Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"LevelEvent",
							40,
							"执行保底行为：",
							["actionName", t],
							["ActionInfo", a],
						),
					o.Execute(a, n));
			}
	}
}
(exports.GuaranteeController = GuaranteeController),
	((_a = GuaranteeController).ExecSceneGuaranteeActions = () => {
		var e =
			ModelManager_1.ModelManager.LevelGeneralModel?.RemoveSceneGuaranteeActionInfos();
		ModelManager_1.ModelManager.LevelGeneralModel?.ClearTreeGuaranteeActionInfosMap(),
			e &&
				0 < e.length &&
				((e = e.reverse()),
				_a.ExecuteActions(
					e,
					LevelGeneralContextDefine_1.GuaranteeContext.Create(),
				),
				Log_1.Log.CheckInfo()) &&
				Log_1.Log.Info("LevelEvent", 40, "场景保底行为已全部完成", [
					"保底行为列表",
					e,
				]);
	}),
	(GuaranteeController.sIe = (e) => {
		var n =
			ModelManager_1.ModelManager.LevelGeneralModel?.RemoveTreeGuaranteeActionInfos(
				e,
			);
		n &&
			0 < n.length &&
			((n = n.reverse()).forEach((e) => {
				ModelManager_1.ModelManager.LevelGeneralModel.PopSceneGuaranteeActionInfo(
					e,
				);
			}),
			_a.ExecuteActions(
				n,
				LevelGeneralContextDefine_1.GuaranteeContext.Create(),
			),
			Log_1.Log.CheckInfo()) &&
			Log_1.Log.Info(
				"LevelEvent",
				40,
				"树保底行为已全部完成",
				["treeIncId", e],
				["保底行为列表", n],
			);
	}),
	(GuaranteeController.rIe = (e, n, t) => {
		_a.aIe(e, n, !0, t);
	}),
	(GuaranteeController.nIe = (e, n, t) => {
		_a.aIe(e, n, !1, t);
	}),
	(GuaranteeController.aIe = (e, n, t, o) => {
		if (n && 7 !== n.Type && o && o.Name) {
			var a = GuaranteeActionCenter_1.GuaranteeActionCenter.GetActionFilterMode(
					o.Name,
				),
				r = ModelManager_1.ModelManager.LevelGeneralModel;
			let c;
			switch (n?.Type) {
				case 4:
					var l =
						ModelManager_1.ModelManager.InstanceDungeonModel.GetInstanceDungeonInfo();
					c = l?.TreeId;
					break;
				case 3:
					(l =
						ModelManager_1.ModelManager.LevelPlayModel.GetProcessingLevelPlayInfo(
							n.LevelPlayId,
						)),
						(c = l?.TreeId);
					break;
				case 6:
					n.BtType !== Protocol_1.Aki.Protocol.NCs.Proto_BtTypeQuest &&
						(c = n.TreeIncId);
			}
			c &&
				c !== BigInt(0) &&
				(t
					? r.HasTreeGuaranteeActionInfo(c, o, a) ||
						(r.AddTreeGuaranteeActionInfo(c, o),
						Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"LevelEvent",
								40,
								"添加行为树保底行为：" + o.Name,
								["触发行为", e],
								["ActionInfo", o],
								["treeIncId", c],
							))
					: (r.PopTreeGuaranteeActionInfo(c, o),
						Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"LevelEvent",
								40,
								"移除行为树保底行为：" + o.Name,
								["触发行为", e],
								["ActionInfo", o],
								["treeIncId", c],
							))),
				t
					? r.HasSceneGuaranteeActionInfo(o, a) ||
						(r.AddSceneGuaranteeActionInfo(o),
						Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"LevelEvent",
								40,
								"添加场景保底行为：" + o.Name,
								["触发行为", e],
								["ActionInfo", o],
							))
					: (r.PopSceneGuaranteeActionInfo(o),
						Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"LevelEvent",
								40,
								"移除场景保底行为：" + o.Name,
								["触发行为", e],
								["ActionInfo", o],
							));
		}
	});
