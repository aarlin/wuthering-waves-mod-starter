"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.InputMultiKeyItemGroup = void 0);
const UE = require("ue"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	InputKeyDefine_1 = require("./InputKeyDefine"),
	InputMultiKeyItem_1 = require("./InputMultiKeyItem");
class InputMultiKeyItemGroup extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.CUt = void 0),
			(this.gUt = void 0),
			(this.vq = !1),
			(this.fUt = void 0),
			(this.dKe = (t, e, i, n) => {
				t !== n && this.fUt && this.pUt(this.fUt);
			});
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIItem],
			[2, UE.UIItem],
		];
	}
	async OnBeforeStartAsync() {
		(this.CUt = new InputMultiKeyItem_1.InputMultiKeyItem(!1)),
			(this.gUt = new InputMultiKeyItem_1.InputMultiKeyItem(!1)),
			await Promise.all([
				this.CUt.CreateThenShowByActorAsync(this.GetItem(1).GetOwner(), !0),
				this.gUt.CreateThenShowByActorAsync(this.GetItem(2).GetOwner(), !0),
			]);
	}
	OnStart() {}
	OnBeforeDestroy() {
		(this.CUt = void 0), (this.CUt = void 0);
	}
	OnBeforeShow() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnPlatformChanged,
			this.dKe,
		),
			this.fUt && this.pUt(this.fUt);
	}
	OnAfterHide() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnPlatformChanged,
			this.dKe,
		);
	}
	Refresh(t) {
		(this.fUt = t), this.pUt(t);
	}
	pUt(t) {
		var e = t.SingleActionOrAxisKeyItem,
			i = t.DoubleActionOrAxisKeyItem,
			n = ((t = t.LinkString), this.GetText(0));
		this.CUt?.RefreshByActionOrAxis(e),
			this.CUt?.SetActive(!0),
			i
				? (this.gUt?.RefreshByActionOrAxis(i),
					this.gUt?.SetActive(!0),
					n.SetText(t ?? "/"),
					n.SetUIActive(!0))
				: (this.gUt?.SetActive(!1), n.SetUIActive(!1));
	}
	SetEnable(t, e = !1) {
		(this.vq === t && !e) ||
			(t
				? this.RootItem.SetAlpha(1)
				: this.RootItem.SetAlpha(InputKeyDefine_1.DISABLE_ALPHA),
			(this.vq = t));
	}
}
exports.InputMultiKeyItemGroup = InputMultiKeyItemGroup;
