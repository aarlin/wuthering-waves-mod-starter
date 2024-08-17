"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelLoadingController = void 0);
const CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
	Log_1 = require("../../../Core/Common/Log"),
	ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	UiManager_1 = require("../../Ui/UiManager"),
	LoadingController_1 = require("../Loading/LoadingController"),
	WorldMapController_1 = require("../WorldMap/WorldMapController"),
	CameraFadeLoading_1 = require("./CameraFadeLoading");
class PendingProcess {
	constructor(e) {
		(this.ProcessType = e),
			(this.ProcessId = 0),
			(this.ProcessId = ++PendingProcess.Id);
	}
}
PendingProcess.Id = 0;
class OpenLoadingProcess extends PendingProcess {
	constructor(e, o, n, ...a) {
		super(0),
			(this.Reason = 0),
			(this.Perform = void 0),
			(this.Callback = void 0),
			(this.Params = void 0),
			(this.Reason = e),
			(this.Perform = o),
			(this.Callback = n),
			(this.Params = a);
	}
}
class CloseLoadingProcess extends PendingProcess {
	constructor(e, o, n) {
		super(1),
			(this.Reason = 0),
			(this.Callback = void 0),
			(this.Duration = 0),
			(this.Reason = e),
			(this.Callback = o),
			(this.Duration = n ?? 1);
	}
}
class LevelLoadingController extends ControllerBase_1.ControllerBase {
	static OnInit() {
		return (
			(LevelLoadingController.CameraFade =
				new CameraFadeLoading_1.CameraFadeLoading()),
			(LevelLoadingController.U$t = []),
			!0
		);
	}
	static OnClear() {
		return (
			(LevelLoadingController.CameraFade = void 0),
			!(LevelLoadingController.U$t = void 0)
		);
	}
	static OnTick(e) {
		if (
			LevelLoadingController.U$t &&
			0 !== LevelLoadingController.U$t.length &&
			!LevelLoadingController.bze
		)
			switch (
				((LevelLoadingController.bze = LevelLoadingController.U$t[0]),
				LevelLoadingController.bze.ProcessType)
			) {
				case 0:
					LevelLoadingController.hfi(
						LevelLoadingController.bze.Reason,
						LevelLoadingController.bze.Perform,
						...LevelLoadingController.bze.Params,
					).finally(LevelLoadingController.bze.Callback);
					break;
				case 1:
					LevelLoadingController.lfi(
						LevelLoadingController.bze.Reason,
						LevelLoadingController.bze.Duration,
					).finally(LevelLoadingController.bze.Callback);
			}
	}
	static OpenLoading(e, o, n, ...a) {
		LevelLoadingController.U$t.push(
			new OpenLoadingProcess(
				e,
				o,
				() => {
					LevelLoadingController.HDe(), n?.();
				},
				...a,
			),
		);
	}
	static CloseLoading(e, o, n) {
		LevelLoadingController.U$t.push(
			new CloseLoadingProcess(
				e,
				() => {
					LevelLoadingController.HDe(), o?.();
				},
				n,
			),
		);
	}
	static async WaitOpenLoading(e, o, ...n) {
		const a = new CustomPromise_1.CustomPromise();
		LevelLoadingController.U$t.push(
			new OpenLoadingProcess(
				e,
				o,
				() => {
					LevelLoadingController.HDe(), a.SetResult();
				},
				...n,
			),
		),
			await a.Promise;
	}
	static async WaitCloseLoading(e, o) {
		const n = new CustomPromise_1.CustomPromise();
		LevelLoadingController.U$t.push(
			new CloseLoadingProcess(
				e,
				() => {
					LevelLoadingController.HDe(), n.SetResult();
				},
				o,
			),
		),
			await n.Promise;
	}
	static async hfi(e, o, ...n) {
		var a = ModelManager_1.ModelManager.LevelLoadingModel;
		if (void 0 === a.GetPerformByReason(e)) {
			if (
				(a.SetLoadingState(!0),
				a.AddLoadingReason(e, o),
				16 === e &&
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.LevelLoadingLockTimeDilation,
					),
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("Loading", 19, "LevelLoading:打开流程开始", [
						"perfrom",
						o,
					]),
				!LevelLoadingController._fi(o))
			)
				switch (o) {
					case 1:
						await this.ufi();
						break;
					case 2:
						await this.cfi();
						break;
					case 3:
						await this.mfi(...n);
						break;
					case 0:
						await this.dfi();
				}
			ControllerHolder_1.ControllerHolder.WorldController.ManuallyGarbageCollection(
				4,
			),
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("Loading", 19, "LevelLoading:打开流程结束", [
						"perfrom",
						o,
					]);
		}
		return !0;
	}
	static async ufi() {
		const e = new CustomPromise_1.CustomPromise();
		LoadingController_1.LoadingController.OpenLoadingView(void 0, () => {
			e.SetResult(!0), WorldMapController_1.WorldMapController.CloseWorldMap();
		}),
			await e.Promise;
	}
	static async cfi() {
		const e = new CustomPromise_1.CustomPromise();
		LoadingController_1.LoadingController.OpenFadeLoadingView(() => {
			e.SetResult(!0), WorldMapController_1.WorldMapController.CloseWorldMap();
		}),
			await e.Promise;
	}
	static async mfi(e, o, n, a, i) {
		const r = new CustomPromise_1.CustomPromise();
		this.CameraFade.EnterInterlude(e, n, a, i, o, () => {
			r.SetResult(!0);
		}),
			await r.Promise;
	}
	static async dfi() {
		const e = new CustomPromise_1.CustomPromise();
		LoadingController_1.LoadingController.OpenVideoCenterView(() => {
			e.SetResult(!0), WorldMapController_1.WorldMapController.CloseWorldMap();
		}),
			await e.Promise;
	}
	static _fi(e) {
		let o = !1;
		switch (e) {
			case 1:
				o = UiManager_1.UiManager.IsViewOpen("LoadingView");
				break;
			case 2:
				o = UiManager_1.UiManager.IsViewOpen("FadeLoadingView");
				break;
			case 3:
				o = this.CameraFade.IsInFade();
				break;
			case 0:
				o = UiManager_1.UiManager.IsViewOpen("PlotTransitionView");
		}
		return o;
	}
	static async lfi(e, o) {
		var n = ModelManager_1.ModelManager.LevelLoadingModel,
			a = n.GetPerformByReason(e);
		n.RemoveLoadingReason(e),
			n.CheckCanDoClose(a) &&
				(Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("Loading", 19, "LevelLoading:关闭流程开始"),
				await LevelLoadingController.Cfi(a, o),
				n.CheckLoadingPerformsEmpty() &&
					(n.SetLoadingState(!1), 16 === e) &&
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.LevelLoadingUnlockDilation,
					),
				Log_1.Log.CheckInfo()) &&
				Log_1.Log.Info("Loading", 19, "LevelLoading:关闭流程结束");
	}
	static async Cfi(e, o) {
		if (LevelLoadingController._fi(e))
			switch (e) {
				case 1:
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("Loading", 19, "LevelLoading:关闭Loading界面(开始)"),
						await this.gfi(),
						Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"Loading",
								19,
								"LevelLoading:关闭Loading界面(完成)",
							);
					break;
				case 2:
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("Loading", 19, "LevelLoading:关闭黑幕Loading(开始)"),
						await this.ffi(),
						Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"Loading",
								19,
								"LevelLoading:关闭黑幕Loading(完成)",
							);
					break;
				case 3:
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("Loading", 19, "LevelLoading:相机淡出(开始)"),
						await this.pfi(o),
						Log_1.Log.CheckInfo() &&
							Log_1.Log.Info("Loading", 19, "LevelLoading:相机淡出(完成)");
					break;
				case 0:
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"Loading",
							19,
							"LevelLoading:关闭黑底白字Loading(开始)",
						),
						await this.vfi(),
						Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"Loading",
								19,
								"LevelLoading:关闭黑底白字Loading(完成)",
							);
			}
	}
	static async gfi() {
		await LoadingController_1.LoadingController.CloseLoadingView();
	}
	static async ffi() {
		const e = new CustomPromise_1.CustomPromise();
		LoadingController_1.LoadingController.CloseFadeLoadingView(() => {
			e.SetResult(!0);
		}),
			await e.Promise;
	}
	static async pfi(e) {
		const o = new CustomPromise_1.CustomPromise();
		this.CameraFade.ExitInterlude(e, () => {
			o.SetResult(!0);
		}),
			await o.Promise;
	}
	static async vfi() {
		const e = new CustomPromise_1.CustomPromise();
		LoadingController_1.LoadingController.CloseVideoCenterView(() => {
			e.SetResult(!0);
		}),
			await e.Promise;
	}
	static CloseAllBlackScreenLoading() {
		LevelLoadingController.CloseLoading(0),
			LevelLoadingController.CloseLoading(3),
			LevelLoadingController.CloseLoading(9),
			LevelLoadingController.CloseLoading(1),
			ModelManager_1.ModelManager.LevelLoadingModel.FinishCameraShowPromise();
	}
}
((exports.LevelLoadingController =
	LevelLoadingController).IsTickEvenPausedInternal = !0),
	(LevelLoadingController.CameraFade = void 0),
	(LevelLoadingController.U$t = void 0),
	(LevelLoadingController.bze = void 0),
	(LevelLoadingController.HDe = () => {
		LevelLoadingController.U$t.shift(), (LevelLoadingController.bze = void 0);
	});
