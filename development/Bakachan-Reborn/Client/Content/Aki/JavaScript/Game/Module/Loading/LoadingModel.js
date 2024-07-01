"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LoadingModel = void 0);
const Queue_1 = require("../../../Core/Container/Queue"),
	ModelBase_1 = require("../../../Core/Framework/ModelBase"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	LoadingController_1 = require("./LoadingController");
class LoadingModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.ScreenEffect = void 0),
			(this.TargetTeleportId = 0),
			(this.Tpi = 0),
			(this.Lpi = !0),
			(this.Efi = !1),
			(this.Speed = 0),
			(this.SpeedRate = 1),
			(this.ReachHandleQueue = new Queue_1.Queue()),
			(this.CurrentProgress = 0),
			(this.NextProgress = 0),
			(this.Dpi = !1),
			(this.Rpi = !1);
	}
	get TipTime() {
		return (
			this.Tpi ||
				(this.Tpi =
					ConfigManager_1.ConfigManager.LoadingConfig.GetLoadingTipsTime()),
			this.Tpi
		);
	}
	get IsShowUidView() {
		return this.Lpi;
	}
	set IsShowUidView(e) {
		e !== this.Lpi &&
			((this.Lpi = e),
			LoadingController_1.LoadingController.UpdateUidViewShow());
	}
	get IsLoading() {
		return this.Efi;
	}
	SetIsLoading(e) {
		this.Efi !== e &&
			((this.Efi = e)
				? EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.OnStartLoadingState,
					)
				: EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.OnFinishLoadingState,
					));
	}
	get IsLoadingView() {
		return this.Dpi;
	}
	SetIsLoadingView(e) {
		this.Dpi !== e &&
			((this.Dpi = e)
				? EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.OnOpenLoadingView,
					)
				: EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.OnCloseLoadingView,
					));
	}
	SetIsLoginToWorld(e) {
		this.Rpi = e;
	}
	GetIsLoginToWorld() {
		var e = this.Rpi;
		return (this.Rpi = !1), e;
	}
	OnClear() {
		return (this.Efi = !1), (this.Dpi = !1), this.ReachHandleQueue.Clear(), !0;
	}
}
exports.LoadingModel = LoadingModel;
