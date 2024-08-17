"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiModel = void 0);
const Stack_1 = require("../../Core/Container/Stack"),
	UiLayerType_1 = require("./Define/UiLayerType");
class UiModel {
	static GetTopView(e) {
		switch (e) {
			case UiLayerType_1.ELayerType.Normal:
				return UiModel.NormalStack.Peek();
			case UiLayerType_1.ELayerType.Pop:
				return 0 < UiModel.PopList.length
					? UiModel.PopList[UiModel.PopList.length - 1]
					: void 0;
			case UiLayerType_1.ELayerType.HUD:
				return Array.from(UiModel.HudMap.values())[UiModel.HudMap.size - 1];
			default:
				return;
		}
	}
	static AddNpcIconViewUnit(e) {
		this.rCr.has(e) || this.rCr.add(e);
	}
	static RemoveNpcIconViewUnit(e) {
		this.rCr.has(e) && this.rCr.delete(e);
	}
	static SetNpcIconViewListShowState(e) {
		this.rCr.forEach((i) => {
			i.GetRootItem().SetUIActive(e);
		});
	}
}
((exports.UiModel = UiModel).HudMap = new Map()),
	(UiModel.NormalStack = new Stack_1.Stack()),
	(UiModel.PopList = []),
	(UiModel.FloatQueueMap = new Map()),
	(UiModel.ShowViewMap = new Map()),
	(UiModel.HideViewMap = new Map()),
	(UiModel.GuideList = []),
	(UiModel.LoadingMap = new Map()),
	(UiModel.DebugMap = new Map()),
	(UiModel.NetWorkList = []),
	(UiModel.rCr = new Set()),
	(UiModel.ResetToViewWhiteSet = new Set(["ReviveView"])),
	(UiModel.IsInMainView = !1),
	(UiModel.InNormalQueue = !1);
