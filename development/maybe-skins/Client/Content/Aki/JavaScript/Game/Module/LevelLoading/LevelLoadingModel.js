"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelLoadingModel = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	ModelBase_1 = require("../../../Core/Framework/ModelBase"),
	ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
	GlobalData_1 = require("../../GlobalData");
class LevelLoadingModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.CameraFadeShowPromise = void 0),
			(this.CameraFadeHidePromise = void 0),
			(this.Mfi = void 0),
			(this.Sfi = void 0),
			(this.Efi = !1);
	}
	get IsLoading() {
		return this.Efi;
	}
	OnInit() {
		return (this.Mfi = new Map()), (this.Sfi = new Map()), !0;
	}
	OnClear() {
		return (
			this.Mfi?.clear(),
			(this.Mfi = void 0),
			this.Sfi?.clear(),
			!(this.Sfi = void 0)
		);
	}
	SetLoadingState(e) {
		var o;
		this.Efi !== e &&
			((o = "LoadingMode[Fade]"),
			(this.Efi = e)
				? (Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("Loading", 7, "LevelLoading:LoadingModeEnable"),
					ResourceSystem_1.ResourceSystem.SetLoadModeInLoading(
						GlobalData_1.GlobalData.World,
						o,
					))
				: (this.yfi(),
					this.ClearLoadingPerforms(),
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("Loading", 7, "LevelLoading:LoadingModeDisable"),
					ResourceSystem_1.ResourceSystem.SetLoadModeInGame(
						GlobalData_1.GlobalData.World,
						o,
					)));
	}
	AddLoadingReason(e, o) {
		this.Mfi.set(e, o),
			this.AddLoadingPerform(o),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Loading", 19, "LevelLoading:AddLoadingReason", [
					"reason",
					e,
				]);
	}
	RemoveLoadingReason(e) {
		var o = this.GetPerformByReason(e);
		this.Mfi.delete(e),
			this.RemoveLoadingPerform(o),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Loading", 19, "LevelLoading:RemoveLoadingReason", [
					"reason",
					e,
				]);
	}
	AddLoadingPerform(e) {
		var o = this.Sfi.get(e) ?? 0;
		this.Sfi.set(e, ++o),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Loading",
					19,
					"LevelLoading:AddLoadingPerform",
					["perform", e],
					["count", o],
				);
	}
	RemoveLoadingPerform(e) {
		var o = this.Sfi.get(e);
		o &&
			(this.Sfi.set(e, --o), o <= 0) &&
			(this.Sfi.delete(e), Log_1.Log.CheckInfo()) &&
			Log_1.Log.Info("Loading", 19, "LevelLoading:RemoveLoadingPerform", [
				"perform",
				e,
			]);
	}
	GetPerformByReason(e) {
		return this.Mfi.get(e);
	}
	yfi() {
		this.Mfi.clear(),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Loading", 19, "LevelLoading:ClearLoadingReason");
	}
	ClearLoadingPerforms() {
		this.Sfi.clear(),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Loading", 19, "LevelLoading:ClearLoadingPerforms");
	}
	CheckLoadingPerformsEmpty() {
		return 0 === this.Sfi.size;
	}
	CheckCanDoClose(e) {
		return !!this.IsLoading && !this.Sfi.get(e);
	}
	FinishCameraShowPromise() {
		this.CameraFadeShowPromise?.SetResult(),
			(this.CameraFadeShowPromise = void 0);
	}
	FinishCameraHidePromise() {
		this.CameraFadeHidePromise?.SetResult(),
			(this.CameraFadeHidePromise = void 0);
	}
}
exports.LevelLoadingModel = LevelLoadingModel;
