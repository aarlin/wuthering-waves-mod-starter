"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventOpenSimpleGameplay = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
	TsInteractionUtils_1 = require("../../Module/Interaction/TsInteractionUtils"),
	SignalDecodeController_1 = require("../../Module/SignalDecode/SignalDecodeController"),
	UiManager_1 = require("../../Ui/UiManager"),
	CipherController_1 = require("../Cipher/CipherController"),
	LevelGeneralBase_1 = require("../LevelGeneralBase"),
	LevelGeneralNetworks_1 = require("../LevelGeneralNetworks"),
	SignalDeviceController_1 = require("../SignalDeviceControl/SignalDeviceController");
class LevelEventOpenSimpleGameplay extends LevelGeneralBase_1.LevelEventBase {
	constructor() {
		super(...arguments),
			(this.VDe = void 0),
			(this.E0 = -1),
			(this.HDe = () => {
				this.VDe &&
					LevelGeneralNetworks_1.LevelGeneralNetworks.RequestEntitySendEvent(
						this.E0,
						this.VDe,
					);
			});
	}
	ExecuteNew(e, i) {
		var r = e;
		if (r) {
			var n = i;
			if (n)
				switch (r.GameplayConfig.Type) {
					case "Cipher":
						TsInteractionUtils_1.TsInteractionUtils.RegisterOpenViewName(
							"CipherView",
						),
							this.jDe(r.GameplayConfig.CipherId);
						break;
					case "SignalBreak":
						TsInteractionUtils_1.TsInteractionUtils.RegisterOpenViewName(
							"SignalDecodeView",
						),
							UiManager_1.UiManager.OpenView(
								"SignalDecodeView",
								r.GameplayConfig.SignalBreakId,
							);
						break;
					case "SundialPuzzle":
						TsInteractionUtils_1.TsInteractionUtils.RegisterOpenViewName(
							"SundialControlView",
						),
							UiManager_1.UiManager.OpenView("SundialControlView");
						break;
					case "SignalDevice":
						this.VDe = r.FinishSendSelfEvent;
						var t = EntitySystem_1.EntitySystem.Get(n.EntityId);
						(this.E0 = t.GetComponent(0).GetCreatureDataId()),
							TsInteractionUtils_1.TsInteractionUtils.RegisterOpenViewName(
								"SignalDeviceView",
							),
							SignalDeviceController_1.SignalDeviceController.OpenGameplay(
								r.GameplayConfig.Config,
								this.HDe,
							);
						break;
					case "MorseCode":
						TsInteractionUtils_1.TsInteractionUtils.RegisterOpenViewName(
							"SignalDecodeView",
						),
							SignalDecodeController_1.SignalDecodeController.Open(
								r.GameplayConfig.MorseCodeId,
							);
				}
			else
				Log_1.Log.CheckError() && Log_1.Log.Error("Event", 30, "上下文不合法");
		} else Log_1.Log.CheckError() && Log_1.Log.Error("Event", 30, "参数不合法");
	}
	jDe(e) {
		CipherController_1.CipherController.OpenCipherView(e);
	}
}
exports.LevelEventOpenSimpleGameplay = LevelEventOpenSimpleGameplay;
