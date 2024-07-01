"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiViewFloatContainer = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	UiModel_1 = require("../../UiModel"),
	UiViewContainer_1 = require("../UiViewContainer"),
	FloatQueue_1 = require("./FloatQueue");
class UiViewFloatContainer extends UiViewContainer_1.UiViewContainer {
	constructor(e, o, r) {
		super(),
			(this.Iur = new Map()),
			(this.Tur = new Map()),
			(this.Lur = new Map()),
			(this.Iur = e),
			(this.Tur = o),
			(this.Lur = r);
	}
	async OpenViewAsync(e) {
		var o = ConfigManager_1.ConfigManager.UiViewConfig.GetUiFloatConfig(
			e.Info.Name,
		);
		this.Dur(o, e) || (await this.OpenViewImplementAsync(e));
	}
	async CloseViewAsync(e) {
		var o = e.Info.Name,
			r = ConfigManager_1.ConfigManager.UiViewConfig.GetUiFloatConfig(o),
			i = StringUtils_1.StringUtils.IsEmpty(r.Area) ? o : r.Area,
			t = e.GetViewId();
		(await this.Rur(i, r.OnlyShowInMain, o, t)) ||
			this.Uur(i, o, t) ||
			(this.Iur.get(i)?.Delete(o, t)
				? (e.ClosePromise?.SetResult(void 0),
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"UiFloatContainer",
							11,
							"界面关闭成功,队列中关闭",
							["区域", i],
							["当前界面", o],
						))
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"UiFloatContainer",
						11,
						"界面关闭失败",
						["区域", i],
						["当前界面", o],
					));
	}
	async Rur(e, o, r, i) {
		var t = this.Tur.get(e);
		return (
			!!t &&
			!!this.Aur(t, r, i) &&
			((await this.$Oe(e, t)) &&
				(this.Pur(o)
					? this.Lur.get(e)?.GetViewId() === i
						? this.Lur.delete(e)
						: Log_1.Log.CheckWarn() &&
							Log_1.Log.Warn(
								"UiFloatContainer",
								11,
								"[HideViewMap.delete]可能存在同个界面执行多次关闭,业务需要关注",
								["区域", e],
								["界面", r],
							)
					: this.Tur.get(e)?.GetViewId() === i
						? this.xur(e)
						: Log_1.Log.CheckWarn() &&
							Log_1.Log.Warn(
								"UiFloatContainer",
								11,
								"[HandleNextViewFromQueue]可能存在同个界面执行多次关闭,业务需要关注",
								["区域", e],
								["界面", r],
							)),
			!0)
		);
	}
	Uur(e, o, r) {
		var i = this.Lur.get(e);
		return (
			!!i &&
			!!this.Aur(i, o, r) &&
			(i.Destroy(),
			this.Lur.delete(e),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"UiFloatContainer",
					11,
					"界面关闭成功,隐藏中关闭",
					["区域", e],
					["当前界面", o],
				),
			!0)
		);
	}
	Aur(e, o, r) {
		return (
			!(e.Info.Name !== o || (r && e.GetViewId() !== r)) ||
			(Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"UiFloatContainer",
					11,
					"界面检查失败",
					["view.Info.Name", e.Info.Name],
					["name", o],
					["view.GetViewId()", e.GetViewId()],
					["viewId", r],
				),
			!1)
		);
	}
	async $Oe(e, o) {
		return (
			!!(await this.CloseViewImplementAsync(o)) &&
			(Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"UiFloatContainer",
					11,
					"界面关闭成功,显示中关闭",
					["区域", e],
					["当前界面", o.Info.Name],
				),
			!0)
		);
	}
	Pur(e) {
		return e && !UiModel_1.UiModel.IsInMainView;
	}
	wur(e) {
		return !(!e.IsWaitNormal || !UiModel_1.UiModel.InNormalQueue);
	}
	xur(e) {
		var o = this.Bur(e);
		o &&
			(Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"UiFloatContainer",
					11,
					"从队列中获取要显示的界面",
					["区域", e],
					["界面", o.Info.Name],
				),
			this.OpenViewImplementAsync(o));
	}
	Bur(e) {
		var o = this.Iur.get(e);
		if (o) {
			var r = o.Pop(UiModel_1.UiModel.IsInMainView);
			if (r)
				return (
					o.Size <= 0 && this.Iur.delete(e),
					this.Tur.set(e, r.ViewBase),
					r.ViewBase
				);
		}
		this.Tur.delete(e);
	}
	Dur(e, o) {
		var r = StringUtils_1.StringUtils.IsEmpty(e.Area) ? o.Info.Name : e.Area;
		if (this.Tur.has(r) || this.Pur(e.OnlyShowInMain) || this.wur(e)) {
			let i = this.Iur.get(r);
			return (
				i || ((i = new FloatQueue_1.FloatViewQueue()), this.Iur.set(r, i)),
				i.Push(o, e.Priority, e.OnlyShowInMain),
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"UiFloatContainer",
						11,
						"界面添加到区域队列中",
						["区域", r],
						["界面", o.Info.Name],
					),
				!0
			);
		}
		return (
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"UiFloatContainer",
					11,
					"界面直接在区域中显示",
					["区域", r],
					["界面", o.Info.Name],
				),
			this.Tur.set(r, o),
			!1
		);
	}
	ClearContainer() {
		for (const e of this.Iur.values()) e.Clear();
		var e,
			o,
			r,
			i,
			t = [];
		for ([e, o] of this.Tur)
			(o.IsExistInLeaveLevel = !0),
				o.Info.IsPermanent ||
					(this.TryCatchViewDestroyCompatible(o), t.push(e));
		for (const e of t) this.Tur.delete(e);
		for ([r, i] of ((t.length = 0), this.Lur))
			(i.IsExistInLeaveLevel = !0),
				i.Info.IsPermanent ||
					(this.TryCatchViewDestroyCompatible(i), t.push(r));
		for (const e of t) this.Lur.delete(e);
	}
	ShowFloatTips() {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("UiFloatContainer", 11, "主界面显示"),
			this.bur(),
			this.qur();
	}
	HideFloatTips() {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("UiFloatContainer", 11, "主界面隐藏"),
			this.Gur();
	}
	StartWaitingNormalView() {
		for (const e of Array.from(this.Iur.keys())) this.Tur.has(e) || this.xur(e);
	}
	bur() {
		for (const r of Array.from(this.Lur.keys())) {
			var e = this.Lur.get(r),
				o = (this.Lur.delete(r), this.Tur.get(r));
			this.Tur.set(r, e), this.Nur(e, !0), o && this.$Oe(r, o);
		}
	}
	qur() {
		for (const e of Array.from(this.Iur.keys())) this.Tur.get(e) || this.xur(e);
	}
	Gur() {
		for (const r of Array.from(this.Tur.keys())) {
			var e = this.Tur.get(r),
				o = ConfigManager_1.ConfigManager.UiViewConfig.GetUiFloatConfig(
					e.Info.Name,
				);
			this.Pur(o.OnlyShowInMain) &&
				(this.Lur.set(r, e), this.Tur.delete(r), this.xur(r), this.Nur(e, !1));
		}
	}
	Nur(e, o) {
		e.OpenPromise?.IsPending()
			? (e.SetLoadingFinishOperation(() => {
					this.Our(e, o);
				}),
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"UiFloatContainer",
						11,
						"界面在打开中",
						["view", e.Info.Name],
						["bActive", o],
					))
			: this.Our(e, o);
	}
	Our(e, o) {
		o
			? (Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"UiFloatContainer",
						11,
						"界面唤醒界面动画",
						["view", e.Info.Name],
						["bActive", o],
					),
				e.SetActive(!0))
			: (Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"UiFloatContainer",
						11,
						"界面暂停界面动画",
						["view", e.Info.Name],
						["bActive", o],
					),
				e.SetActive(!1));
	}
	async PreOpenViewAsync(e) {
		return (
			Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"UiCore",
					17,
					"此类型容器不支持预打开界面",
					["name", e.Info.Name],
					["type", e.Info.Type],
				),
			Promise.resolve()
		);
	}
	async OpenViewAfterPreOpenedAsync(e) {
		return (
			Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"UiCore",
					17,
					"此类型容器不支持预打开界面",
					["name", e.Info.Name],
					["type", e.Info.Type],
				),
			Promise.reject(TypeError("此类型容器不支持预打开界面"))
		);
	}
}
exports.UiViewFloatContainer = UiViewFloatContainer;
