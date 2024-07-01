"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SceneItemUtility = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	LevelGeneralContextDefine_1 = require("../../../LevelGamePlay/LevelGeneralContextDefine"),
	LevelGeneralController_1 = require("../../../LevelGamePlay/LevelGeneralController"),
	LevelGeneralNetworks_1 = require("../../../LevelGamePlay/LevelGeneralNetworks"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	WaitEntityTask_1 = require("../../../World/Define/WaitEntityTask"),
	CharacterController_1 = require("../../Character/CharacterController"),
	TsBaseItem_1 = require("../BaseItem/TsBaseItem");
class SceneItemUtility {
	static GetBaseItemActor(e) {
		if (
			(e = CharacterController_1.CharacterController.GetActorByEntity(e)) &&
			e instanceof TsBaseItem_1.default
		)
			return e;
	}
	static HandleTriggerStateActionByServerNotify(e, t, n) {
		LevelGeneralController_1.LevelGeneralController.LevelEventLogOpen &&
			Log_1.Log.CheckInfo() &&
			Log_1.Log.Info(
				"LevelEvent",
				7,
				"执行EntityTriggerAction，等待创建Entity",
				["CreatureDataId", t],
				["PlayerId", e.aFn],
				["SessionId", e.Ykn],
				["StartIndex", e.hFn],
				["EndIndex", e.Wms],
			);
		const r = () => {
			var r,
				a,
				o = ModelManager_1.ModelManager.CreatureModel.GetEntity(t);
			o &&
				(o = o.Entity.GetComponent(75)) &&
				(r = o.Actions) &&
				((a = ModelManager_1.ModelManager.CreatureModel.GetEntity(n)) ||
					(Log_1.Log.CheckWarn() &&
						Log_1.Log.Warn(
							"LevelEvent",
							40,
							"执行EntityTriggerAction，未找到otherEntity，仍然触发行为",
						)),
				LevelGeneralController_1.LevelGeneralController.LevelEventLogOpen &&
					Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"LevelEvent",
						7,
						"执行EntityTriggerAction，Entity创建完毕",
						["CreatureDataId", t],
						["otherCreatureDataId", n],
						["PlayerId", e.aFn],
						["SessionId", e.Ykn],
						["StartIndex", e.hFn],
						["EndIndex", e.Wms],
					),
				LevelGeneralController_1.LevelGeneralController.ExecuteActionsByServerNotify(
					r,
					o.CreateTriggerContext(a?.Id ?? 0),
					e.aFn,
					e.Ykn,
					e.hFn,
					e.Wms,
				));
		};
		WaitEntityTask_1.WaitEntityTask.Create(t, (e) => {
			e && WaitEntityTask_1.WaitEntityTask.Create(n, r);
		});
	}
	static HandleExitTriggerStateActionByServerNotify(e, t, n) {
		LevelGeneralController_1.LevelGeneralController.LevelEventLogOpen &&
			Log_1.Log.CheckInfo() &&
			Log_1.Log.Info(
				"LevelEvent",
				7,
				"执行EntityTriggerAction，等待创建Entity",
				["CreatureDataId", t],
				["CreatureDataId", t],
				["PlayerId", e.aFn],
				["SessionId", e.Ykn],
				["StartIndex", e.hFn],
				["EndIndex", e.Wms],
			);
		const r = () => {
			var r,
				a,
				o = ModelManager_1.ModelManager.CreatureModel.GetEntity(t);
			o &&
				(o = o.Entity.GetComponent(75)) &&
				(r = o.ExitActions) &&
				((a = ModelManager_1.ModelManager.CreatureModel.GetEntity(n)) ||
					(Log_1.Log.CheckWarn() &&
						Log_1.Log.Warn(
							"LevelEvent",
							40,
							"执行EntityTriggerAction，未找到otherEntity，仍然触发行为",
						)),
				LevelGeneralController_1.LevelGeneralController.LevelEventLogOpen &&
					Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"LevelEvent",
						7,
						"执行EntityTriggerAction，Entity创建完毕",
						["CreatureDataId", t],
						["PlayerId", e.aFn],
						["SessionId", e.Ykn],
						["StartIndex", e.hFn],
						["EndIndex", e.Wms],
					),
				LevelGeneralController_1.LevelGeneralController.ExecuteActionsByServerNotify(
					r,
					o.CreateTriggerContext(a?.Id ?? 0),
					e.aFn,
					e.Ykn,
					e.hFn,
					e.Wms,
				));
		};
		WaitEntityTask_1.WaitEntityTask.Create(t, (e) => {
			e && WaitEntityTask_1.WaitEntityTask.Create(n, r);
		});
	}
	static HandleSceneItemStateActionByServerNotify(e, t, n) {
		LevelGeneralController_1.LevelGeneralController.LevelEventLogOpen &&
			Log_1.Log.CheckInfo() &&
			Log_1.Log.Info(
				"LevelEvent",
				7,
				"执行EntityStateChangeAction，等待创建Entity",
				["CreatureDataId", t],
				["PlayerId", e.aFn],
				["SessionId", e.Ykn],
				["StartIndex", e.hFn],
				["EndIndex", e.Wms],
			),
			WaitEntityTask_1.WaitEntityTask.Create(
				t,
				(r) => {
					var a;
					r &&
						(r = ModelManager_1.ModelManager.CreatureModel.GetEntity(t)) &&
						(a = r.Entity.GetComponent(117)) &&
						a.BehaviorMap &&
						(a = a.BehaviorMap.get(n)) &&
						(LevelGeneralController_1.LevelGeneralController
							.LevelEventLogOpen &&
							Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"LevelEvent",
								7,
								"执行EntityStateChangeAction，Entity创建完毕",
								["CreatureDataId", t],
								["PlayerId", e.aFn],
								["SessionId", e.Ykn],
								["StartIndex", e.hFn],
								["EndIndex", e.Wms],
							),
						LevelGeneralController_1.LevelGeneralController.ExecuteActionsByServerNotify(
							a,
							LevelGeneralContextDefine_1.EntityContext.Create(r.Id),
							e.aFn,
							e.Ykn,
							e.hFn,
							e.Wms,
						));
				},
				!1,
				LevelGeneralNetworks_1.WAIT_ENTITY_ERROR_TIME,
				!0,
				!0,
			);
	}
	static HandleExploreInteractActionByServerNotify(e, t) {
		WaitEntityTask_1.WaitEntityTask.Create(
			t,
			(n) => {
				var r;
				n &&
					(n = ModelManager_1.ModelManager.CreatureModel.GetEntity(t)) &&
					(r = n.Entity.GetComponent(134)) &&
					(r = r.InteractActions) &&
					((n = LevelGeneralContextDefine_1.EntityContext.Create(n.Id)),
					LevelGeneralController_1.LevelGeneralController.ExecuteActionsByServerNotify(
						r,
						n,
						e.aFn,
						e.Ykn,
						e.hFn,
						e.Wms,
					));
			},
			!1,
			LevelGeneralNetworks_1.WAIT_ENTITY_ERROR_TIME,
			!0,
			!0,
		);
	}
	static HandleSceneItemDestructibleActionByServerNotify(e, t) {
		WaitEntityTask_1.WaitEntityTask.Create(
			t,
			(n) => {
				var r;
				n &&
					(n = ModelManager_1.ModelManager.CreatureModel.GetEntity(t)) &&
					(r = n.Entity.GetComponent(90)) &&
					(r = r.DeadActions) &&
					((n = LevelGeneralContextDefine_1.EntityContext.Create(n.Id)),
					LevelGeneralController_1.LevelGeneralController.ExecuteActionsByServerNotify(
						r,
						n,
						e.aFn,
						e.Ykn,
						e.hFn,
						e.Wms,
					));
			},
			!1,
			LevelGeneralNetworks_1.WAIT_ENTITY_ERROR_TIME,
			!0,
			!0,
		);
	}
	static HandleTimeTrackControlActionByServerNotify(e, t, n) {
		WaitEntityTask_1.WaitEntityTask.Create(
			t,
			(r) => {
				var a;
				r &&
					(r = ModelManager_1.ModelManager.CreatureModel.GetEntity(t)) &&
					(a = r.Entity.GetComponent(118)) &&
					(a = a.GetTargetActions(n)) &&
					LevelGeneralController_1.LevelGeneralController.ExecuteActionsByServerNotify(
						a,
						LevelGeneralContextDefine_1.EntityContext.Create(r.Id),
						e.aFn,
						e.Ykn,
						e.hFn,
						e.Wms,
					);
			},
			!1,
			LevelGeneralNetworks_1.WAIT_ENTITY_ERROR_TIME,
			!0,
			!0,
		);
	}
	static HandleLifeCycleStageActionByServerNotify(e, t, n) {
		WaitEntityTask_1.WaitEntityTask.Create(
			t,
			(r) => {
				var a;
				r &&
					(r = ModelManager_1.ModelManager.CreatureModel.GetEntity(t)) &&
					(a = r.Entity.GetComponent(117)) &&
					(a = a.GetLifeCycleStageActions(n)) &&
					LevelGeneralController_1.LevelGeneralController.ExecuteActionsByServerNotify(
						a,
						LevelGeneralContextDefine_1.EntityContext.Create(r.Id),
						e.aFn,
						e.Ykn,
						e.hFn,
						e.Wms,
					);
			},
			!1,
			LevelGeneralNetworks_1.WAIT_ENTITY_ERROR_TIME,
			!0,
			!0,
		);
	}
	static HandleBeamReceiveActionByServerNotify(e, t, n) {
		WaitEntityTask_1.WaitEntityTask.Create(
			t,
			(r) => {
				var a;
				r &&
					(r = ModelManager_1.ModelManager.CreatureModel.GetEntity(t)) &&
					(a = r.Entity.GetComponent(190)) &&
					(a = a.GetBeamReceiveActions(n)) &&
					LevelGeneralController_1.LevelGeneralController.ExecuteActionsByServerNotify(
						a,
						LevelGeneralContextDefine_1.EntityContext.Create(r.Id),
						e.aFn,
						e.Ykn,
						e.hFn,
						e.Wms,
					);
			},
			!1,
			LevelGeneralNetworks_1.WAIT_ENTITY_ERROR_TIME,
			!0,
			!0,
		);
	}
	static HandleSceneItemStateChangeConditionActionByServerNotify(e, t, n, r) {
		WaitEntityTask_1.WaitEntityTask.Create(
			t,
			(a) => {
				var o;
				a &&
					(a = ModelManager_1.ModelManager.CreatureModel.GetEntity(t)) &&
					(o = a.Entity.GetComponent(117)) &&
					(o = o.StateConfig?.StateChangeBehaviors) &&
					(o = o[n].ConditionAction) &&
					((o = o[r].Action),
					LevelGeneralController_1.LevelGeneralController.ExecuteActionsByServerNotify(
						o,
						LevelGeneralContextDefine_1.EntityContext.Create(a.Id),
						e.aFn,
						e.Ykn,
						e.hFn,
						e.Wms,
					));
			},
			!1,
			LevelGeneralNetworks_1.WAIT_ENTITY_ERROR_TIME,
			!0,
			!0,
		);
	}
}
exports.SceneItemUtility = SceneItemUtility;
