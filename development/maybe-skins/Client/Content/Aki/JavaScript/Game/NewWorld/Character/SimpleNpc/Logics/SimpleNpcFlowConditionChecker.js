"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SimpleNpcFlowConditionChecker = void 0);
const ModelManager_1 = require("../../../../Manager/ModelManager");
class SimpleNpcFlowConditionChecker {
	static GetFlowActorIndex(e) {
		switch (e) {
			case 140:
				return 0;
			case 141:
				return 1;
			case 142:
				return 2;
			case 143:
				return 3;
			case 144:
				return 4;
			case 145:
				return 5;
			case 146:
				return 6;
			case 147:
				return 7;
			case 148:
				return 8;
			case 149:
				return 9;
		}
		return -1;
	}
	static CheckCondition(e) {
		switch (e.CheckType) {
			case 1:
				return this.eir(e.CheckValue);
			case 2:
				return this.tir(e.CheckValue);
			case 3:
				return this.iir(0);
			case 4:
				return this.iir(1);
			case 5:
				return this.iir(2);
			case 6:
				return this.iir(3);
			case 7:
				return this.oir(e.CheckValue);
			case 8:
				return this.rir(e.CheckValue);
		}
		return !0;
	}
	static eir(e) {
		return !0;
	}
	static tir(e) {
		return !0;
	}
	static iir(e) {
		return ModelManager_1.ModelManager.TimeOfDayModel.GameTime.DayState === e;
	}
	static oir(e) {
		return (
			0 === e ||
			2 === ModelManager_1.ModelManager.QuestNewModel.GetQuestState(e)
		);
	}
	static rir(e) {
		return (
			0 === e || ModelManager_1.ModelManager.QuestNewModel.CheckQuestFinished(e)
		);
	}
	static CheckFirstEnter(e) {
		return !this.nir.has(e);
	}
	static SetFirstEnter(e) {
		this.nir.add(e);
	}
}
(exports.SimpleNpcFlowConditionChecker = SimpleNpcFlowConditionChecker).nir =
	new Set();
