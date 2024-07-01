"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FlowActionSetEntityVisible = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	WaitEntityTask_1 = require("../../../World/Define/WaitEntityTask"),
	FlowActionUtils_1 = require("../Flow/FlowActionUtils"),
	FlowActionServerAction_1 = require("./FlowActionServerAction");
class FlowActionSetEntityVisible extends FlowActionServerAction_1.FlowActionServerAction {
	constructor() {
		super(...arguments),
			(this.Task = void 0),
			(this.QXi = (t) => {
				this.Task = void 0;
				var e = this.ActionInfo.Params,
					i =
						(t ||
							ControllerHolder_1.ControllerHolder.FlowController.LogError(
								"加载实体失败",
							),
						new Array());
				for (const t of e.EntityIds) {
					var o =
						ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(t);
					o
						? ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(
								o.Entity,
								e.Visible,
								"FlowActionSetEntityVisible.OnEntityReady",
							)
						: i.push(t);
				}
				0 < i.length &&
					(ControllerHolder_1.ControllerHolder.FlowController.LogError(
						"实体未下发，联系服务端检查配置",
						["ids", i],
					),
					e.Visible || this.RequestServerAction(!1)),
					this.FinishExecute(!0);
			});
	}
	OnExecute() {
		if (this.ActionInfo.Params) {
			var t = this.ActionInfo.Params;
			if (t.EntityIds?.length) {
				let e = !1;
				for (const i of t.EntityIds)
					FlowActionUtils_1.FlowActionUtils.CheckEntityInAoi(i) ||
						(Log_1.Log.CheckWarn() &&
							Log_1.Log.Warn(
								"Plot",
								27,
								"剧情中显隐实体过远，请检查配置",
								["pbDataId", i],
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
							t.Visible,
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
exports.FlowActionSetEntityVisible = FlowActionSetEntityVisible;
