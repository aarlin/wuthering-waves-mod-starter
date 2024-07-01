"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FlowActionChangeEntityState = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	GameplayTagUtils_1 = require("../../../../Core/Utils/GameplayTagUtils"),
	IAction_1 = require("../../../../UniverseEditor/Interface/IAction"),
	LevelGeneralCommons_1 = require("../../../LevelGamePlay/LevelGeneralCommons"),
	WaitEntityTask_1 = require("../../../World/Define/WaitEntityTask"),
	FlowActionBase_1 = require("./FlowActionBase");
class FlowActionChangeEntityState extends FlowActionBase_1.FlowActionBase {
	OnExecute() {
		const e = this.ActionInfo.Params;
		let t;
		switch (e.Type) {
			case IAction_1.EChangeEntityState.Directly:
				var a = e;
				t = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(a.State);
			case IAction_1.EChangeEntityState.Loop:
		}
		t &&
			WaitEntityTask_1.WaitEntityTask.CreateWithPbDataId(
				e.EntityId,
				(a) => {
					a
						? (LevelGeneralCommons_1.LevelGeneralCommons.PrechangeStateTag(
								e.EntityId,
								t,
								"ShowInPlotSequence",
							),
							this.FinishExecute(!0))
						: (Log_1.Log.CheckError() &&
								Log_1.Log.Error(
									"Level",
									32,
									"[ChangePerformanceTag] 等待Entity加载超时",
									["pbDataId", e.EntityId],
								),
							this.FinishExecute(!1));
				},
				!0,
			);
	}
}
exports.FlowActionChangeEntityState = FlowActionChangeEntityState;
