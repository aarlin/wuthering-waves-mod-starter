"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AdviceCreateWordBtnItem = void 0);
const UE = require("ue"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	UiManager_1 = require("../../../Ui/UiManager"),
	LguiUtil_1 = require("../../Util/LguiUtil");
class AdviceCreateWordBtnItem extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(),
			(this.S9 = 0),
			(this.Xy = 0),
			(this.YP = () => {
				0 === this.S9
					? (this.b9e(), UiManager_1.UiManager.OpenView("AdviceSortWordView"))
					: (this.w9e(), UiManager_1.UiManager.OpenView("AdviceWordView"));
			}),
			this.CreateThenShowByActor(e.GetOwner());
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIButtonComponent],
			[1, UE.UIText],
		]),
			(this.BtnBindInfo = [[0, this.YP]]);
	}
	SetType(e) {
		this.S9 = e;
	}
	SetIndex(e) {
		this.Xy = e;
	}
	b9e() {
		var e,
			t = ModelManager_1.ModelManager.AdviceModel,
			r = t.CurrentWordMap.get(this.Xy);
		void 0 !== r && 0 < r
			? ((e = ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceWordType(r)),
				(t.CurrentSelectSortTypeId = e),
				(t.CurrentSelectSortWordId = r))
			: ((e =
					ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceWordTypeConfigs()[0]
						.Id),
				(t.CurrentSelectSortTypeId = e),
				(t.CurrentSelectSortWordId = -1)),
			(t.CurrentSelectWordIndex = this.Xy);
	}
	w9e() {
		var e = ModelManager_1.ModelManager.AdviceModel;
		(e.CurrentChangeWordType = 1),
			(e.CurrentSelectWordId = e.CurrentConjunctionId);
	}
	RefreshView() {
		this.q9e();
	}
	q9e() {
		var e;
		0 === this.S9
			? 0 <
				(e = ModelManager_1.ModelManager.AdviceModel.CurrentWordMap.get(
					this.Xy,
				))
				? ((e =
						ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceWordText(e)),
					this.GetText(1).SetText(e))
				: LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), "ChangeWord")
			: 0 < (e = ModelManager_1.ModelManager.AdviceModel.CurrentConjunctionId)
				? ((e =
						ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceConjunctionText(
							e,
						)),
					this.GetText(1).SetText(e))
				: LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), "ChangeWord");
	}
}
exports.AdviceCreateWordBtnItem = AdviceCreateWordBtnItem;
