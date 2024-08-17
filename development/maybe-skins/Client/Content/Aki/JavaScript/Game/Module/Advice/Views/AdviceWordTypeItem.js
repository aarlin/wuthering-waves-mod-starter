"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AdviceWordTypeItem = void 0);
const UE = require("ue"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class AdviceWordTypeItem extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(),
			(this.K7e = 0),
			(this.b7e = () => {
				this.Og();
			}),
			(this.T7e = () =>
				ModelManager_1.ModelManager.AdviceModel.PreSelectSortTypeId !==
				this.K7e),
			(this.j7e = () => {
				ModelManager_1.ModelManager.AdviceModel.PreSelectSortTypeId !==
					this.K7e &&
					((ModelManager_1.ModelManager.AdviceModel.PreSelectSortTypeId =
						this.K7e),
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.OnClickAdviceSort,
					));
			}),
			this.CreateThenShowByActor(e.GetOwner());
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIExtendToggle],
			[1, UE.UITexture],
			[2, UE.UIItem],
			[3, UE.UIText],
			[4, UE.UIText],
			[5, UE.UIItem],
		];
	}
	OnStart() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnClickAdviceSort,
			this.b7e,
		);
		var e = this.GetExtendToggle(0);
		e.CanExecuteChange.Unbind(), e.CanExecuteChange.Bind(this.T7e);
	}
	UpdateItem(e) {
		this.GetExtendToggle(0).OnStateChange.Clear(),
			this.GetExtendToggle(0).OnStateChange.Add(this.j7e),
			(this.K7e = e),
			this.Og(),
			this.Q7e();
	}
	Og() {
		var e = this.GetExtendToggle(0).ToggleState,
			t =
				ModelManager_1.ModelManager.AdviceModel.PreSelectSortTypeId !== this.K7e
					? 0
					: 1;
		e !== t && this.GetExtendToggle(0).SetToggleStateForce(t, !1);
	}
	Q7e() {
		var e = ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceTypeText(
			this.K7e,
		);
		this.GetText(4).SetText(e);
	}
	OnBeforeDestroy() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnClickAdviceSort,
			this.b7e,
		);
	}
}
exports.AdviceWordTypeItem = AdviceWordTypeItem;
