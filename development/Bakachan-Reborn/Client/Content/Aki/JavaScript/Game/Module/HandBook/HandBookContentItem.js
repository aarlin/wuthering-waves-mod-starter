"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.HandBookContentItem = void 0);
const UE = require("ue"),
	UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
class HandBookContentItem extends UiPanelBase_1.UiPanelBase {
	constructor(t, e) {
		super(),
			(this.HandBookContentItemData = t),
			this.CreateThenShowByActor(e.GetOwner());
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIText],
		];
	}
	OnStart() {
		var t;
		this.HandBookContentItemData &&
			((t = this.GetText(0)),
			this.HandBookContentItemData.Title
				? (t.SetUIActive(!0), t.SetText(this.HandBookContentItemData.Title))
				: t.SetUIActive(!1),
			(t = this.GetText(1)),
			this.HandBookContentItemData.Desc
				? (t.SetUIActive(!0), t.SetText(this.HandBookContentItemData.Desc))
				: t.SetUIActive(!1));
	}
	OnBeforeDestroy() {}
}
exports.HandBookContentItem = HandBookContentItem;
