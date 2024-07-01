"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FunctionViewPanelHandle = void 0);
const ModelManager_1 = require("../../../../Manager/ModelManager"),
	UiNavigationNewController_1 = require("../UiNavigationNewController"),
	SpecialPanelHandleBase_1 = require("./SpecialPanelHandleBase");
class FunctionViewPanelHandle extends SpecialPanelHandleBase_1.SpecialPanelHandleBase {
	constructor() {
		super(...arguments),
			(this.Zxo = new Set()),
			(this.ewo = new Map()),
			(this.two = new Set()),
			(this.iwo = 1);
	}
	OnDefaultNavigationListenerList(e) {}
	OnGetLoopOrLayoutListener(e) {
		return e;
	}
	AddNavigationListener(e) {
		var t;
		this.two.add(e),
			this.Zxo.has(e.LayoutActor) ||
				((t = (t = e.LayoutActor.GetUIItem().GetParentAsUIItem())
					.GetParentAsUIItem()
					.UIChildren.FindIndex(t)),
				this.Zxo.add(e.LayoutActor),
				this.ewo.set(t, e),
				1 === t && this.owo(t, e));
	}
	owo(e, t) {
		(this.iwo = e),
			this.SetNavigationGroupDefaultListener(t),
			(this.DefaultNavigationListener = []),
			this.DefaultNavigationListener.push(t);
	}
	rwo(e) {
		var t,
			i = this.ewo.get(e);
		i &&
			((t =
				UiNavigationNewController_1.UiNavigationNewController.GetCurrentNavigationFocusListener()) &&
			this.two.has(t)
				? (this.owo(e, i),
					UiNavigationNewController_1.UiNavigationNewController.MarkViewHandleRefreshNavigationDirty(),
					ModelManager_1.ModelManager.UiNavigationModel.SetCursorActiveDelayTime(
						350,
					))
				: this.owo(e, i));
	}
	FindNextFocusListener() {
		this.rwo(this.iwo + 1);
	}
	FindPrevFocusListener() {
		this.rwo(this.iwo - 1);
	}
}
exports.FunctionViewPanelHandle = FunctionViewPanelHandle;
