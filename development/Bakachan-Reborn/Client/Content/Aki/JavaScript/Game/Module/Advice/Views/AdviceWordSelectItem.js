"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AdviceWordSelectItem = void 0);
const UE = require("ue"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class AdviceWordSelectItem extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(),
			(this.X7e = 0),
			(this.S9 = 0),
			(this.aHe = () => {
				this.Og();
			}),
			(this.jbe = () => {
				(ModelManager_1.ModelManager.AdviceModel.CurrentPreSelectWordId =
					this.X7e),
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.OnClickAdviceWord,
					);
			}),
			this.CreateThenShowByActor(e.GetOwner());
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIExtendToggle],
			[1, UE.UIText],
			[2, UE.UIItem],
		]),
			(this.BtnBindInfo = [[0, this.jbe]]);
	}
	OnStart() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnClickAdviceWord,
			this.aHe,
		);
	}
	Update(e, t) {
		(this.X7e = e), (this.S9 = t), this.Og(), this.hke();
	}
	W9e() {
		var e = this.GetExtendToggle(0).ToggleState;
		this.X7e === ModelManager_1.ModelManager.AdviceModel.CurrentPreSelectWordId
			? 1 !== e && this.GetExtendToggle(0).SetToggleStateForce(1, !1)
			: 0 !== e && this.GetExtendToggle(0).SetToggleStateForce(0, !1);
	}
	hke() {
		if (0 === this.S9) {
			let e = ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceSentenceText(
				this.X7e,
			);
			(e = e.replace("{}", "_")), this.GetText(1).SetText(e);
		} else {
			var e =
				ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceConjunctionText(
					this.X7e,
				);
			this.GetText(1).SetText(e);
		}
	}
	Og() {
		var e =
			this.X7e === ModelManager_1.ModelManager.AdviceModel.CurrentSelectWordId;
		this.GetItem(2).SetUIActive(e), this.W9e();
	}
	OnBeforeDestroy() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnClickAdviceWord,
			this.aHe,
		);
	}
}
exports.AdviceWordSelectItem = AdviceWordSelectItem;
