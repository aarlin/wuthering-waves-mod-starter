"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BattleTowerButton = void 0);
const UE = require("ue"),
	TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	BattleEntranceButton_1 = require("./BattleEntranceButton");
class BattleTowerButton extends BattleEntranceButton_1.BattleEntranceButton {
	constructor() {
		super(...arguments),
			(this.H$e = () => {
				this.GetUiNiagara(2)?.SetNiagaraUIActive(!1, !0),
					this.GetUiNiagara(3)?.SetNiagaraUIActive(!1, !0),
					TimerSystem_1.TimerSystem.Next(() => {
						this.GetUiNiagara(2)?.SetNiagaraUIActive(!0, !0),
							this.GetUiNiagara(3)?.SetNiagaraUIActive(!0, !0);
					});
			});
	}
	OnRegisterComponent() {
		super.OnRegisterComponent(),
			this.ComponentRegisterInfos.push([2, UE.UINiagara], [3, UE.UINiagara]);
	}
	AddEvents() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnTowerGuideClose,
			this.H$e,
		);
	}
	RemoveEvents() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnTowerGuideClose,
			this.H$e,
		);
	}
	Initialize(e) {
		super.Initialize(e), this.AddEvents();
	}
	Reset() {
		this.RemoveEvents(), super.Reset();
	}
}
exports.BattleTowerButton = BattleTowerButton;
