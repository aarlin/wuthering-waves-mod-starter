"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FlowActionChangeEntitySelfState = void 0);
const GameplayTagUtils_1 = require("../../../../Core/Utils/GameplayTagUtils"),
	LevelGeneralCommons_1 = require("../../../LevelGamePlay/LevelGeneralCommons"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	FlowActionBase_1 = require("./FlowActionBase");
class FlowActionChangeEntitySelfState extends FlowActionBase_1.FlowActionBase {
	OnExecute() {
		var e = this.ActionInfo.Params;
		e = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e.EntityState);
		let t;
		switch (this.Context.Context.Type) {
			case 1:
				t = this.Context.Context.EntityId;
				break;
			case 5:
				t = this.Context.Context.TriggerEntityId;
				break;
			default:
				return;
		}
		var a = ModelManager_1.ModelManager.CreatureModel.GetEntityById(t);
		a?.IsInit &&
			e &&
			LevelGeneralCommons_1.LevelGeneralCommons.PrechangeStateTag(
				ModelManager_1.ModelManager.CreatureModel.GetPbDataIdByEntity(a),
				e,
				"ShowInPlotSequence",
			);
	}
}
exports.FlowActionChangeEntitySelfState = FlowActionChangeEntitySelfState;
