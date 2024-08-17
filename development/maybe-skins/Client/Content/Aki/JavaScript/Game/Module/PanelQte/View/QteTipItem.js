"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.QteTipItem = void 0);
const UE = require("ue"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	LguiUtil_1 = require("../../Util/LguiUtil");
class QteTipItem extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments), (this.WNi = "");
	}
	Init(e) {
		this.CreateThenShowByResourceIdAsync("UiItem_QteTips", e);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [[0, UE.UIText]];
	}
	OnStart() {
		this.WNi && this.Refresh(this.WNi);
	}
	Refresh(e) {
		(this.WNi = e),
			this.InAsyncLoading() ||
				LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e);
	}
}
exports.QteTipItem = QteTipItem;
