"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AreaAssistant = void 0);
const Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
	Net_1 = require("../../../../Core/Net/Net"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	ControllerAssistantBase_1 = require("../../GeneralLogicTree/ControllerAssistant/ControllerAssistantBase");
class AreaAssistant extends ControllerAssistantBase_1.ControllerAssistantBase {
	constructor() {
		super(...arguments),
			(this.BTi = (e) => {
				ModelManager_1.ModelManager.MapModel.SetUnlockMultiMapIds(e.KAs);
			}),
			(this.bTi = (e) => {
				ModelManager_1.ModelManager.MapModel.SetUnlockMapBlockIds(e.QAs);
			}),
			(this.qTi = (e) => {
				ModelManager_1.ModelManager.MapModel.SetUnlockMultiMapIds(e.KAs),
					ModelManager_1.ModelManager.MapModel.SetUnlockMapBlockIds(e.QAs);
			}),
			(this.GTi = (e) => {
				ModelManager_1.ModelManager.MapModel.AddUnlockedAreas(e.FAs);
			});
	}
	OnDestroy() {}
	OnRegisterNetEvent() {
		Net_1.Net.Register(8967, this.GTi),
			Net_1.Net.Register(4931, this.qTi),
			Net_1.Net.Register(28470, this.bTi),
			Net_1.Net.Register(11602, this.BTi);
	}
	OnUnRegisterNetEvent() {
		Net_1.Net.UnRegister(8967),
			Net_1.Net.UnRegister(4931),
			Net_1.Net.UnRegister(28470),
			Net_1.Net.UnRegister(11602);
	}
	async RequestUnlockedAreaInfo() {
		var e = Protocol_1.Aki.Protocol.jis.create();
		(e = await Net_1.Net.CallAsync(8960, e)) &&
			(e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys
				? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
						e.lkn,
						14831,
					)
				: ModelManager_1.ModelManager.MapModel.FullUpdateUnlockedAreas(e.FAs));
	}
}
exports.AreaAssistant = AreaAssistant;
