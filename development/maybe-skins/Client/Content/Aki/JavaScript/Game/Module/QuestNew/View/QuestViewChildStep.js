"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.QuestViewChildStep = void 0);
const ue_1 = require("ue"),
	TreeStepWithStatus_1 = require("../../GeneralLogicTree/View/TreeStep/TreeStepWithStatus");
class QuestViewChildStep extends TreeStepWithStatus_1.TreeStepWithStatus {
	OnRegisterComponent() {
		super.OnRegisterComponent(),
			this.ComponentRegisterInfos.push([5, ue_1.UISprite]);
	}
	OnStart() {
		super.OnStart();
	}
	UpdateStepInfo() {
		var e = super.UpdateStepInfo();
		return this.GetSprite(5)?.SetUIActive(!e), e;
	}
	IsShowNodeStatus() {
		return !0;
	}
}
exports.QuestViewChildStep = QuestViewChildStep;
