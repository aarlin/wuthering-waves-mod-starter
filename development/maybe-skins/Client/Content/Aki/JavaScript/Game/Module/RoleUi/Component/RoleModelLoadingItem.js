"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleModelLoadingItem = void 0);
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class RoleModelLoadingItem extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments), (this.clo = !0), (this.TDe = void 0), (this.R2e = !0);
	}
	OnStart() {
		this.mlo();
	}
	OnBeforeDestroy() {
		this.dlo();
	}
	dlo() {
		void 0 !== this.TDe &&
			(TimerSystem_1.TimerSystem.Remove(this.TDe), (this.TDe = void 0));
	}
	mlo() {
		this.SetActive(this.clo && this.R2e);
	}
	SetLoadingOpen(e) {
		this.R2e = e;
	}
	SetLoadingActive(e) {
		this.clo !== e &&
			((this.clo = e)
				? (this.TDe = TimerSystem_1.TimerSystem.Delay(() => {
						this.dlo(), this.mlo();
					}, 300))
				: (this.dlo(), this.mlo()));
	}
}
exports.RoleModelLoadingItem = RoleModelLoadingItem;
