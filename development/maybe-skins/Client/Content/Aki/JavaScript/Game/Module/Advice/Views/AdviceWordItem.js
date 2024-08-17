"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AdviceWordItem = void 0);
const UE = require("ue"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class AdviceWordItem extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(),
			(this.X7e = 0),
			(this.$7e = () => {
				this.Og(), this.W9e();
			}),
			(this.T7e = () =>
				ModelManager_1.ModelManager.AdviceModel.PreSelectSortWordId !==
				this.X7e),
			(this.j7e = () => {
				ModelManager_1.ModelManager.AdviceModel.PreSelectSortWordId !==
					this.X7e &&
					((ModelManager_1.ModelManager.AdviceModel.PreSelectSortWordId =
						this.X7e),
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.OnClickAdviceSortWord,
					));
			}),
			this.CreateThenShowByActor(e.GetOwner());
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIExtendToggle],
			[1, UE.UIText],
			[2, UE.UIItem],
		]),
			(this.BtnBindInfo = [[0, this.j7e]]);
	}
	OnStart() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnClickAdviceSortWord,
			this.$7e,
		);
		var e = this.GetExtendToggle(0);
		e.CanExecuteChange.Unbind(), e.CanExecuteChange.Bind(this.T7e);
	}
	UpdateItem(e) {
		(this.X7e = e), this.Og(), this.Q7e(), this.W9e();
	}
	Og() {
		var e =
			ModelManager_1.ModelManager.AdviceModel.CurrentSelectSortWordId ===
			this.X7e;
		this.GetItem(2).SetUIActive(e);
	}
	Q7e() {
		var e = ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceWordText(
			this.X7e,
		);
		this.GetText(1).SetText(e);
	}
	W9e() {
		var e = this.GetExtendToggle(0).ToggleState,
			t =
				this.X7e === ModelManager_1.ModelManager.AdviceModel.PreSelectSortWordId
					? 1
					: 0;
		e !== t && this.GetExtendToggle(0).SetToggleStateForce(t, !1);
	}
	OnBeforeDestroy() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnClickAdviceSortWord,
			this.$7e,
		);
	}
}
exports.AdviceWordItem = AdviceWordItem;
