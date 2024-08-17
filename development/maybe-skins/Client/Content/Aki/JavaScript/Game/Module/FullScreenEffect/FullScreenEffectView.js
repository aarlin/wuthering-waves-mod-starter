"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FullScreenEffectView = void 0);
const UE = require("ue"),
	ActorSystem_1 = require("../../../Core/Actor/ActorSystem"),
	CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
	TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
	UiLayerType_1 = require("../../Ui/Define/UiLayerType"),
	LguiResourceManager_1 = require("../../Ui/LguiResourceManager"),
	UiLayer_1 = require("../../Ui/UiLayer"),
	DELAY_TIME = 100;
class FullScreenEffectView {
	constructor() {
		(this.RootItem = void 0),
			(this.RootActor = void 0),
			(this.Priority = 0),
			(this.Path = ""),
			(this.O8t = !0),
			(this.k8t = void 0),
			(this.F8t = new Set()),
			(this.hJ = 0),
			(this.V8t = () => {
				this.F8t.clear();
			});
	}
	async Init(e, t) {
		const r = new CustomPromise_1.CustomPromise();
		return (
			(this.hJ =
				LguiResourceManager_1.LguiResourceManager.LoadPrefabByResourceId(
					this.Path,
					UiLayer_1.UiLayer.GetLayerRootUiItem(UiLayerType_1.ELayerType.Pop),
					(e) => {
						this.H8t(e), r.SetResult(void 0);
					},
				)),
			(this.Priority = t),
			(this.Path = e),
			r.Promise
		);
	}
	SetEffectVisibility(e, t) {
		t &&
			(e
				? (this.k8t = TimerSystem_1.TimerSystem.Delay(this.V8t, 100))
				: this.j8t()),
			this.O8t !== e && (this.RootItem.SetIsUIActive(e), (this.O8t = e));
	}
	H8t(e) {
		var t = e.GetComponentByClass(UE.UIItem.StaticClass());
		(this.RootActor = e), (this.RootItem = t);
	}
	Destroy() {
		LguiResourceManager_1.LguiResourceManager.CancelLoadPrefab(this.hJ),
			this.F8t.clear(),
			ActorSystem_1.ActorSystem.Put(this.RootActor);
	}
	j8t() {
		TimerSystem_1.TimerSystem.Has(this.k8t) &&
			TimerSystem_1.TimerSystem.Remove(this.k8t),
			this.F8t.clear(),
			(this.k8t = void 0);
	}
	DeActive() {
		var e = UE.LGUIBPLibrary.GetComponentsInChildren(
			this.RootActor,
			UE.UINiagara.StaticClass(),
			!1,
		);
		for (let r = 0; r < e.Num(); r++) {
			var t = e.Get(r);
			t && t.DeactivateSystem();
		}
	}
	IsEffectPlay() {
		var e = UE.LGUIBPLibrary.GetComponentsInChildren(
			this.RootActor,
			UE.UINiagara.StaticClass(),
			!1,
		);
		for (let t = 0; t < e.Num(); t++) if (e.Get(t)) return !0;
		return !1;
	}
}
(exports.FullScreenEffectView = FullScreenEffectView).Compare = (e, t) =>
	t.Priority - e.Priority;
