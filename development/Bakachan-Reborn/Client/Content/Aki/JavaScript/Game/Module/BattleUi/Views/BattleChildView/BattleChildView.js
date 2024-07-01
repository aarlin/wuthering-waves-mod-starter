"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BattleChildView = void 0);
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class BattleChildView extends UiPanelBase_1.UiPanelBase {
	async NewByResourceId(e, t, i = !1, a) {
		(this.OpenParam = a),
			await this.CreateThenShowByResourceIdAsync(t, e, i),
			this.Initialize(this.OpenParam),
			await this.InitializeAsync(this.OpenParam);
	}
	async NewByRootActorAsync(e, t) {
		(this.OpenParam = t),
			await this.CreateByActorAsync(e, t),
			this.Initialize(this.OpenParam),
			await this.InitializeAsync(this.OpenParam);
	}
	Initialize(e) {}
	async InitializeAsync(e) {}
	Reset() {}
	OnAfterShowImplement() {
		this.OnShowBattleChildView();
	}
	OnBeforeHideImplement() {
		this.OnHideBattleChildView();
	}
	OnShowBattleChildView() {}
	OnHideBattleChildView() {}
	OnBeforeDestroyImplementImplement() {}
	OnBeforeDestroyImplement() {
		this.OnBeforeDestroyImplementImplement(), this.Reset();
	}
}
exports.BattleChildView = BattleChildView;
