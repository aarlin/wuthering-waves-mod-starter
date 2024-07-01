"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SimpleNpcLoadController = void 0);
const Queue_1 = require("../../../../../Core/Container/Queue"),
	ControllerBase_1 = require("../../../../../Core/Framework/ControllerBase"),
	ObjectUtils_1 = require("../../../../../Core/Utils/ObjectUtils"),
	ModelManager_1 = require("../../../../Manager/ModelManager");
class SimpleNpcLoadController extends ControllerBase_1.ControllerBase {
	static OnInit() {
		return (this.Mir = new Queue_1.Queue(256)), !0;
	}
	static OnLeaveLevel() {
		return !0;
	}
	static OnTick(e) {
		var r;
		ModelManager_1.ModelManager.GameModeModel.WorldDone &&
			0 !== this.Mir.Size &&
			((r = this.Mir.Pop()), ObjectUtils_1.ObjectUtils.IsValid(r)) &&
			r.Mesh &&
			(r.LoadModelByDA() && r.SetDefaultCollision(), r.StartFlowLogic());
	}
	static AddSimpleNpc(e) {
		this.Mir && this.Mir.Push(e);
	}
}
(exports.SimpleNpcLoadController = SimpleNpcLoadController).Mir = void 0;
