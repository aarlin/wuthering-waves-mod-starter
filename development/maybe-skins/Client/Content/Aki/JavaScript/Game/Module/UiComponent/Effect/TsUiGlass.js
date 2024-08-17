"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	GlobalData_1 = require("../../../GlobalData");
class TsUiGlass extends UE.LGUIBehaviour {
	constructor() {
		super(...arguments),
			(this.EventListenState = !1),
			(this.SetState = !1),
			(this.OnCloseViewCall = void 0);
	}
	OnEnableBP() {
		TsUiGlass.CurrentGlassItemSet ||
			(TsUiGlass.CurrentGlassItemSet = new Set()),
			this.SetUnderItemGlassState(!0),
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("UiCommon", 28, "创建 TsUiGlass"),
			this.RefreshGlassShowState(),
			(this.OnCloseViewCall = () => {
				this.RefreshGlassShowState();
			}),
			this.ListenEvent();
	}
	CheckItemRecursively(e, t) {
		var s = e.GetAttachUIChildren();
		for (let e = 0, r = s.Num(); e < r; ++e) {
			var a = s.Get(e),
				l = a.GetOwner().GetComponentByClass(UE.UIBaseRenderable.StaticClass());
			l && this.TrySetItemState(l, t), this.CheckItemRecursively(a, t);
		}
	}
	SetUnderItemGlassState(e) {
		var t;
		this.SetState !== e &&
			((this.SetState = e),
			(t = this.GetOwner().GetComponentByClass(UE.UIItem.StaticClass())),
			this.CheckItemRecursively(t, e));
	}
	TrySetItemState(e, t) {
		t
			? (TsUiGlass.CurrentGlassItemSet.has(e) ||
					TsUiGlass.CurrentGlassItemSet.add(e),
				e.SetUIRenderAfterBlurPartial(!0),
				e.SetUIRenderAfterBlur(!0))
			: (TsUiGlass.CurrentGlassItemSet.delete(e),
				e.SetUIRenderAfterBlurPartial(!1),
				e.SetUIRenderAfterBlur(!1));
	}
	ListenEvent() {
		this.EventListenState ||
			(EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.CloseView,
				this.OnCloseViewCall,
			),
			(this.EventListenState = !0));
	}
	RemoveEvent() {
		this.EventListenState &&
			(EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.CloseView,
				this.OnCloseViewCall,
			),
			(this.EventListenState = !1));
	}
	RefreshGlassShowState() {
		!(
			0 <
			UE.LGUIManagerActor.GetGlobalUiBlurIndex(GlobalData_1.GlobalData.World)
		) && 0 < TsUiGlass.CurrentGlassItemSet.size
			? this.OpenPartialBlur()
			: this.ClosePartialBlur();
	}
	OpenPartialBlur() {
		TsUiGlass.GlassShowState ||
			((TsUiGlass.GlassShowState = !0),
			UE.KismetSystemLibrary.ExecuteConsoleCommand(
				GlobalData_1.GlobalData.World,
				"r.kuro.LGUIBlurTexture.save 1",
			));
	}
	ClosePartialBlur() {
		TsUiGlass.GlassShowState &&
			((TsUiGlass.GlassShowState = !1),
			UE.KismetSystemLibrary.ExecuteConsoleCommand(
				GlobalData_1.GlobalData.World,
				"r.kuro.LGUIBlurTexture.save 0",
			));
	}
	OnDisableBP() {
		Log_1.Log.CheckDebug() && Log_1.Log.Debug("UiCommon", 28, "销毁TsUiGlass"),
			this.SetUnderItemGlassState(!1),
			this.RefreshGlassShowState(),
			this.RemoveEvent();
	}
	OnDestroyBP() {
		Log_1.Log.CheckDebug() && Log_1.Log.Debug("UiCommon", 28, "销毁TsUiGlass"),
			this.SetUnderItemGlassState(!1),
			this.RefreshGlassShowState(),
			this.RemoveEvent(),
			0 === TsUiGlass.CurrentGlassItemSet.size &&
				UE.LGUIBPLibrary.FreeUnusedResourcesInRenderTargetPool();
	}
}
(TsUiGlass.GlassShowState = !1), (exports.default = TsUiGlass);
