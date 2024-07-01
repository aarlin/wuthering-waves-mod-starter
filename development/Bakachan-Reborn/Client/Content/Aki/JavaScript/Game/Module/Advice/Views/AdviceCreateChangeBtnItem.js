"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AdviceCreateChangeBtnItem = void 0);
const UE = require("ue"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	UiManager_1 = require("../../../Ui/UiManager"),
	LguiUtil_1 = require("../../Util/LguiUtil");
class AdviceCreateChangeBtnItem extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(),
			(this.Xy = -0),
			(this.X8e = () => {
				this.w9e(), UiManager_1.UiManager.OpenView("AdviceWordView");
			}),
			this.CreateThenShowByActor(e.GetOwner());
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIButtonComponent],
			[1, UE.UIText],
			[2, UE.UIItem],
		]),
			(this.BtnBindInfo = [[0, this.X8e]]);
	}
	w9e() {
		var e = ModelManager_1.ModelManager.AdviceModel,
			t =
				((e.CurrentChangeWordType = 0), e.CurrentSentenceWordMap.get(this.Xy));
		(e.CurrentSelectWordId = t), (e.CurrentPreSelectSentenceIndex = this.Xy);
	}
	SetIndex(e) {
		this.Xy = e;
	}
	UpdateCurrentLineMode(e) {
		this.B9e(e);
	}
	B9e(e) {
		0 === e
			? LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), "ChangeOneLineWord")
			: 0 === this.Xy
				? LguiUtil_1.LguiUtil.SetLocalText(
						this.GetText(1),
						"ChangeFirstLineWord",
					)
				: LguiUtil_1.LguiUtil.SetLocalText(
						this.GetText(1),
						"ChangeLastLineWord",
					);
	}
}
exports.AdviceCreateChangeBtnItem = AdviceCreateChangeBtnItem;
