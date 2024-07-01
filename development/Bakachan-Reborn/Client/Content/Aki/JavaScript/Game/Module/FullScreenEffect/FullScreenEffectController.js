"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FullScreenEffectController = void 0);
const PriorityQueue_1 = require("../../../Core/Container/PriorityQueue"),
	UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
	FullScreenEffectView_1 = require("./FullScreenEffectView");
class FullScreenEffectController extends UiControllerBase_1.UiControllerBase {
	static async BeginEffect(t, e) {
		var i;
		this.b8t.has(t) ||
			(await (i = new FullScreenEffectView_1.FullScreenEffectView()).Init(t, e),
			this.b8t.add(t),
			this.q8t
				? e >= this.q8t.Priority
					? (this.q8t.SetEffectVisibility(!1, !0),
						this.G8t.Push(this.q8t),
						(this.q8t = i).SetEffectVisibility(!0, !0))
					: (i.SetEffectVisibility(!1, !1), this.G8t.Push(i))
				: ((this.q8t = i), this.q8t.SetEffectVisibility(!0, !0)));
	}
	static EndEffect(t) {
		t === this.q8t.Path
			? this.q8t.DeActive()
			: this.b8t.has(t) && this.b8t.delete(t);
	}
	static EndCurView() {
		var t;
		this.q8t &&
			(this.b8t.delete(this.q8t.Path),
			this.q8t.SetEffectVisibility(!1, !0),
			this.q8t.Destroy(),
			(this.q8t = void 0),
			(t = this.N8t())) &&
			((this.q8t = t), this.q8t.SetEffectVisibility(!0, !0));
	}
	static OnClear() {
		for (
			this.b8t.clear(),
				this.q8t && (this.q8t.SetEffectVisibility(!1, !0), this.q8t.Destroy());
			!this.G8t.Empty;
		)
			this.G8t.Pop().Destroy();
		return !0;
	}
	static N8t() {
		for (; !this.G8t.Empty; ) {
			var t = this.G8t.Pop();
			if (this.b8t.has(t.Path) && (this.b8t.delete(t.Path), t.IsEffectPlay()))
				return t;
			t.Destroy();
		}
	}
}
((exports.FullScreenEffectController = FullScreenEffectController).q8t =
	void 0),
	(FullScreenEffectController.b8t = new Set()),
	(FullScreenEffectController.G8t = new PriorityQueue_1.PriorityQueue(
		FullScreenEffectView_1.FullScreenEffectView.Compare,
	));
