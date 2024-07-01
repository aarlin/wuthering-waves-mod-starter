"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.QuestHintView = void 0);
const UE = require("ue"),
	UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
	UiManager_1 = require("../../../Ui/UiManager");
class QuestHintView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.WFt = () => {
				this.Ero();
			});
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIText],
			[2, UE.UISprite],
			[3, UE.UIText],
		];
	}
	OnStart() {
		this.UiViewSequence.AddSequenceFinishEvent("PopUp", this.WFt);
	}
	OnAfterShow() {
		this.ibi(), this.UiViewSequence.PlaySequence("PopUp");
	}
	Ero() {
		UiManager_1.UiManager.CloseView("QuestHintView");
	}
	ibi() {
		this.yro(!1), this.RootItem.SetAnchorOffsetX(0);
	}
	yro(e) {
		this.GetText(3).SetUIActive(e), this.GetSprite(2).SetUIActive(e);
	}
}
exports.QuestHintView = QuestHintView;
