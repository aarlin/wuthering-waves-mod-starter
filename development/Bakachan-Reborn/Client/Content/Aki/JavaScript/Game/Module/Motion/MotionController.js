"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MotionController = void 0);
const Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
	Net_1 = require("../../../Core/Net/Net"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager");
class MotionController extends ControllerBase_1.ControllerBase {
	static OnInit() {
		return this.OnAddEvents(), this.OnRegisterNetEvent(), !0;
	}
	static OnClear() {
		return this.OnRemoveEvents(), this.OnUnRegisterNetEvent(), !0;
	}
	static OnAddEvents() {}
	static OnRemoveEvents() {}
	static OnRegisterNetEvent() {
		Net_1.Net.Register(15672, MotionController.hbi),
			Net_1.Net.Register(13882, MotionController.lbi),
			Net_1.Net.Register(11219, MotionController._bi),
			Net_1.Net.Register(5529, MotionController.ubi);
	}
	static OnUnRegisterNetEvent() {
		Net_1.Net.UnRegister(15672),
			Net_1.Net.UnRegister(13882),
			Net_1.Net.UnRegister(11219),
			Net_1.Net.UnRegister(5529);
	}
}
((exports.MotionController = MotionController).RequestUnlockMotion = (e, o) => {
	var t = new Protocol_1.Aki.Protocol.jJn();
	(t.l3n = e),
		(t.Z6n = o),
		Net_1.Net.Call(25015, t, (e) => {
			e.X5n !== Protocol_1.Aki.Protocol.lkn.Sys
				? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
						e.X5n,
						3375,
					)
				: ModelManager_1.ModelManager.MotionModel.OnMotionUnlock(e.l3n, e.Z6n);
		});
}),
	(MotionController.hbi = (e) => {
		ModelManager_1.ModelManager.MotionModel.OnNewMotionCanUnlock(e.l3n, e.DLs);
	}),
	(MotionController.lbi = (e) => {
		ModelManager_1.ModelManager.MotionModel.OnRoleMotionActive(e);
	}),
	(MotionController._bi = (e) => {
		ModelManager_1.ModelManager.MotionModel.OnGetAllRoleMotionInfo(e);
	}),
	(MotionController.ubi = (e) => {
		ModelManager_1.ModelManager.MotionModel.OnMotionFinishCondition(e);
	});
