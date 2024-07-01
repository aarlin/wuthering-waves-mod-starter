"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.OnlineMultipleApplyView = void 0);
const UE = require("ue"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
	UiManager_1 = require("../../../Ui/UiManager"),
	LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView"),
	OnlineMultipleApplyItem_1 = require("./OnlineMultipleApplyItem");
class OnlineMultipleApplyView extends UiTickViewBase_1.UiTickViewBase {
	constructor() {
		super(...arguments),
			(this.bGi = void 0),
			(this.oNi = () =>
				new OnlineMultipleApplyItem_1.OnlineMultipleApplyItem()),
			(this.rNi = () => {
				var e = ModelManager_1.ModelManager.OnlineModel.GetCurrentApplyList();
				e.length <= 0 &&
					UiManager_1.UiManager.CloseView("OnlineMultipleApplyView"),
					this.bGi.ReloadData(e);
			});
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UILoopScrollViewComponent],
			[1, UE.UIItem],
		];
	}
	OnStart() {
		this.nNi();
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnRefreshApply,
			this.rNi,
		);
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnRefreshApply,
			this.rNi,
		);
	}
	OnTick(e) {
		if (!(this.bGi.IZt < 0)) {
			var i = this.bGi.GetDisplayGridNum();
			for (let e = this.bGi.IZt; e < i; e++)
				this.bGi.UnsafeGetGridProxy(e)?.UpdateCountDownProgressBar();
		}
	}
	OnBeforeDestroy() {
		this.bGi && this.bGi.ClearGridProxies(), (this.bGi = void 0);
	}
	RefreshLoopScrollView() {
		this.bGi.ReloadData(
			ModelManager_1.ModelManager.OnlineModel.GetCurrentApplyList(),
		);
	}
	nNi() {
		var e = this.GetLoopScrollViewComponent(0),
			i = this.GetItem(1).GetOwner();
		(this.bGi = new LoopScrollView_1.LoopScrollView(e, i, this.oNi)),
			this.RefreshLoopScrollView();
	}
}
exports.OnlineMultipleApplyView = OnlineMultipleApplyView;
