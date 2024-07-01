"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FlowActionDestroyEntity = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	WaitEntityTask_1 = require("../../../World/Define/WaitEntityTask"),
	FlowActionUtils_1 = require("../Flow/FlowActionUtils"),
	FlowActionServerAction_1 = require("./FlowActionServerAction");
class FlowActionDestroyEntity extends FlowActionServerAction_1.FlowActionServerAction {
	constructor() {
		super(...arguments),
			(this.Task = void 0),
			(this.QXi = (t) => {
				this.Task = void 0;
				var e = this.ActionInfo.Params;
				t ||
					ControllerHolder_1.ControllerHolder.FlowController.LogError(
						"加载实体失败",
					);
				let o = !1;
				for (const t of e.EntityIds) {
					var n =
						ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(t);
					if (n) {
						var i = n.Entity.GetComponent(0).GetPbEntityInitData(),
							r = n.Entity.GetComponent(117);
						let t = !1;
						i &&
							((i = (0, IComponent_1.getComponent)(
								i?.ComponentsData,
								"SceneItemLifeCycleComponent",
							)),
							(t = Boolean(r && i?.DestroyStageConfig.PerformDuration))),
							t
								? (n.Entity.GetComponent(177)?.RemoveServerTagByIdLocal(
										-1152559349,
										"[SceneItemStateComponent]ForceHandleDestroyState",
									),
									n.Entity.GetComponent(177)?.AddServerTagByIdLocal(
										-1278190765,
										"[SceneItemStateComponent]ForceHandleDestroyState",
									),
									r.HandleDestroyState())
								: ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(
										n.Entity,
										!1,
										"FlowActionDestroyEntity.OnEntityReady",
									);
					} else
						Log_1.Log.CheckWarn() &&
							Log_1.Log.Warn("Plot", 27, "实体未下发，联系服务端检查配置", [
								"ids",
								t,
							]),
							(o = !0);
				}
				o && this.RequestServerAction(!1), this.FinishExecute(!0);
			});
	}
	OnExecute() {
		if (this.ActionInfo.Params) {
			var t = this.ActionInfo.Params;
			if (t.EntityIds?.length) {
				let e = !1;
				for (const o of t.EntityIds)
					FlowActionUtils_1.FlowActionUtils.CheckEntityInAoi(o) ||
						(Log_1.Log.CheckWarn() &&
							Log_1.Log.Warn(
								"Plot",
								27,
								"剧情中销毁实体过远，请检查配置",
								["pbDataId", o],
								["flow", this.Context.FormatId],
								["id", this.ActionInfo.ActionId],
							),
						(e = !0));
				e
					? (this.RequestServerAction(!1), this.FinishExecute(!0))
					: (this.Task = WaitEntityTask_1.WaitEntityTask.CreateWithPbDataId(
							t.EntityIds,
							this.QXi,
							!0,
							FlowActionUtils_1.WAIT_ENTITY_TIME,
						));
			} else this.FinishExecute(!0);
		} else this.FinishExecute(!0);
	}
	OnBackgroundExecute() {
		this.OnExecute();
	}
	OnInterruptExecute() {
		this.Task?.Cancel(), (this.Task = void 0), this.FinishExecute(!0);
	}
}
exports.FlowActionDestroyEntity = FlowActionDestroyEntity;
