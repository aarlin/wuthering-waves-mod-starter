"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AdviceSentenceSelectItem = void 0);
const UE = require("ue"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	LguiUtil_1 = require("../../Util/LguiUtil");
class AdviceSentenceSelectItem extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(),
			(this.K7e = void 0),
			(this.T7e = () =>
				ModelManager_1.ModelManager.AdviceModel.CurrentSentenceSelectIndex !==
				this.K7e),
			(this.j7e = () => {
				ModelManager_1.ModelManager.AdviceModel.CurrentSentenceSelectIndex !==
					this.K7e &&
					((ModelManager_1.ModelManager.AdviceModel.CurrentSentenceSelectIndex =
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
				ModelManager_1.ModelManager.AdviceModel.CurrentSentenceSelectIndex !==
				this.K7e
					? 0
					: 1;
		e !== t && this.GetExtendToggle(0).SetToggleStateForce(t, !1);
	}
	Q7e() {
		let e = "";
		(e = 0 === this.K7e ? "AdviceFirstSentence" : "AdviceSecondSentence"),
			LguiUtil_1.LguiUtil.SetLocalText(this.GetText(4), e);
	}
	OnBeforeDestroy() {}
}
exports.AdviceSentenceSelectItem = AdviceSentenceSelectItem;
