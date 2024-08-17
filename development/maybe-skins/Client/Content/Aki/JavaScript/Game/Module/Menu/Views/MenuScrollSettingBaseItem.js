"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MenuScrollSettingBaseItem = void 0);
const ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class MenuScrollSettingBaseItem extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.FireSaveMenuChange = (e) => {}),
			(this.PlaySequenceByName = (e) => {}),
			(this.wqe = void 0);
	}
	Initialize(e, t, r) {
		(this.FireSaveMenuChange = t),
			(this.PlaySequenceByName = r),
			(this.wqe = e);
	}
	async Init() {
		await this.CreateByActorAsync(this.wqe.GetOwner(), void 0, !0);
	}
	OnRegisterComponent() {}
	OnStart() {}
	OnBeforeDestroy() {
		this.Clear();
	}
	ClearItem() {
		this.Destroy();
	}
	Clear() {
		this.OnClear();
	}
	OnClear() {}
	async ClearAsync() {}
	OnRemoveEvents() {}
	PlaySequenceFromName(e) {}
	GetItemClickLimit(e) {
		return (
			!e.GetSelfInteractive() &&
			(ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
				"NotModify",
			),
			!0)
		);
	}
}
exports.MenuScrollSettingBaseItem = MenuScrollSettingBaseItem;
