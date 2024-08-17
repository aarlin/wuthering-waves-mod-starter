"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiViewStackContainer = void 0);
const CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
	Log_1 = require("../../../Core/Common/Log"),
	DoublyList_1 = require("../../../Core/Container/DoublyList"),
	Stack_1 = require("../../../Core/Container/Stack"),
	StringUtils_1 = require("../../../Core/Utils/StringUtils"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	BlackScreenController_1 = require("../../Module/BlackScreen/BlackScreenController"),
	UiCameraAnimationController_1 = require("../../Module/UiCameraAnimation/UiCameraAnimationController"),
	UiViewPending_1 = require("../Base/UiViewPending"),
	UiManager_1 = require("../UiManager"),
	UiModel_1 = require("../UiModel"),
	UiViewContainer_1 = require("./UiViewContainer");
class UiViewStackContainer extends UiViewContainer_1.UiViewContainer {
	constructor(e) {
		super(),
			(this.v9 = void 0),
			(this.Fur = new Map()),
			(this.pHt = !1),
			(this.Vur = new Array()),
			(this.Hur = new DoublyList_1.default(void 0)),
			(this.jur = new Map()),
			(this.v9 = e);
	}
	get RHt() {
		return this.pHt;
	}
	UHt() {
		this.pHt = !0;
	}
	O0t(e = !0) {
		(this.pHt = !1), e && this.Wur();
	}
	Kur(e) {
		this.v9.Push(e);
		var o = e.Info.Name;
		let i = this.Fur.get(o);
		i || ((i = new Set()), this.Fur.set(o, i)), i.add(e);
	}
	Qur() {
		var e,
			o,
			i = this.v9.Pop();
		if (void 0 !== i)
			return (
				(e = i.Info.Name),
				(o = this.Fur.get(e)) &&
					(o.delete(i), o.size <= 0) &&
					this.Fur.delete(e),
				i
			);
	}
	yur(e) {
		var o = e.Info.Name,
			i = this.Fur.get(o);
		return (
			i && (i.delete(e), i.size <= 0) && this.Fur.delete(o), this.v9.Delete(e)
		);
	}
	async Wur() {
		if (this.Vur.length) {
			var e = this.Vur.shift();
			switch (
				(Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"UiCore",
						17,
						"[ProcessViewPending]执行已缓存的界面操作",
						["界面", e.View.Info.Name],
						["操作类型", e.PendingType],
					),
				e.PendingType)
			) {
				case 0:
					await this.OpenViewAfterPreOpenedAsync(e.View);
					break;
				case 1:
					await this.OpenViewAsync(e.View);
					break;
				case 2:
					await this.CloseViewAsync(e.View);
					break;
				case 3:
					this.UHt(), await this.Cfi(e.View), this.O0t();
					break;
				case 4:
					await this.ResetToViewAsync(e.View);
			}
		}
	}
	async OpenViewAsync(e) {
		if (this.RHt) this.Xur(e, 1);
		else {
			var o = this.v9.Peek();
			if (e.IsQueueView) {
				if (o?.IsQueueView) return this.$ur(e), void this.Wur();
				if (UiModel_1.UiModel.InNormalQueue)
					return this.$ur(e), void this.Wur();
			}
			this.UHt(),
				this.IsIgnoreOpenViewMask(e) || this.OpenViewMask.SetMask(!0),
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.StackPreOpenView,
					e.Info.Name,
				),
				this.Kur(e),
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("UiCore", 17, "OpenViewAsync 入栈", [
						"ViewName",
						e.Info.Name,
					]),
				await this.Yur(e, o),
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.StackOpenView,
					e.GetViewId(),
					o?.Info,
				),
				this.IsIgnoreOpenViewMask(e) || this.OpenViewMask.SetMask(!1),
				this.O0t();
		}
	}
	async PreOpenViewAsync(e) {
		(await e.CreateAsync()) ||
			(Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn("UiCore", 17, "[PreOpenViewAsync] CreateAsync failed", [
					"ViewName",
					e.Info.Name,
				]));
	}
	async OpenViewAfterPreOpenedAsync(e) {
		if (this.RHt) this.Xur(e, 0);
		else {
			var o = this.v9.Peek();
			if (e.IsQueueView) {
				if (o?.IsQueueView) return void this.$ur(e);
				if (UiModel_1.UiModel.InNormalQueue) return void this.$ur(e);
			}
			this.UHt(),
				this.IsIgnoreOpenViewMask(e) || this.OpenViewMask.SetMask(!0),
				e.OnOpenAfterPreOpened(),
				this.Kur(e),
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("UiCore", 17, "OpenViewAfterPreOpenedAsync 入栈", [
						"ViewName",
						e.Info.Name,
					]),
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.OpenView,
					e.Info.Name,
					e.GetViewId(),
				),
				await e.StartAsync(),
				o?.Hide(),
				await e.ShowAsync(),
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.StackOpenView,
					e.GetViewId(),
					o?.Info,
				),
				this.IsIgnoreOpenViewMask(e) || this.OpenViewMask.SetMask(!1),
				this.O0t();
		}
	}
	async Yur(e, o) {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info(
				"UiCore",
				11,
				"OpenViewImplement 界面打开开始",
				["ViewName", e.Info?.Name],
				["path", e.Info.UiPath],
			),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OpenView,
				e.Info.Name,
				e.GetViewId(),
			);
		var i = o?.Info.ScenePath;
		(i =
			((i =
				(i &&
					e.Info.ScenePath === i &&
					((e.SkipLoadScene = !0),
					(e.SceneLoaded = !0),
					(o.SkipReleaseScene = !0)),
				e.WillLoadScene())) &&
				(await BlackScreenController_1.BlackScreenController.AddBlackScreenAsync(
					"Start",
					e.Info.Name,
				)),
			ConfigManager_1.ConfigManager.UiViewConfig.GetUiShowConfig(e.Info.Name)))
			.StartBlackScreen &&
			!StringUtils_1.StringUtils.IsBlank(i.StartBlackScreen.ShowAnimName) &&
			(await BlackScreenController_1.BlackScreenController.AddBlackScreenAsync(
				i.StartBlackScreen.ShowAnimName,
				e.Info.Name,
			)),
			(await e.CreateAsync())
				? (Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("UiCore", 17, "OpenViewImplement 界面Start", [
							"ViewName",
							e.Info?.Name,
						]),
					await e.StartAsync(),
					i.StartBlackScreen &&
						!StringUtils_1.StringUtils.IsBlank(
							i.StartBlackScreen.HideAnimName,
						) &&
						BlackScreenController_1.BlackScreenController.RemoveBlackScreen(
							i.StartBlackScreen.HideAnimName,
							e.Info.Name,
						),
					o?.WillReleaseScene()
						? (await BlackScreenController_1.BlackScreenController.AddBlackScreenAsync(
								"Start",
								e.Info.Name,
							),
							Log_1.Log.CheckInfo() &&
								Log_1.Log.Info("UiCore", 17, "OpenViewImplement 上个界面Hide", [
									"LastViewName",
									o?.Info?.Name,
								]),
							await o.HideAsync(),
							BlackScreenController_1.BlackScreenController.RemoveBlackScreen(
								"Close",
								e.Info.Name,
							),
							UiCameraAnimationController_1.UiCameraAnimationController.PushCameraHandle(
								e.Info.Name,
								e.GetViewId(),
								!1,
							),
							Log_1.Log.CheckInfo() &&
								Log_1.Log.Info("UiCore", 17, "OpenViewImplement 界面Show", [
									"ViewName",
									e.Info?.Name,
								]),
							await e.ShowAsync())
						: (UiCameraAnimationController_1.UiCameraAnimationController.PushCameraHandle(
								e.Info.Name,
								e.GetViewId(),
							),
							Log_1.Log.CheckInfo() &&
								Log_1.Log.Info(
									"UiCore",
									17,
									"OpenViewImplement 界面Show,上个界面Hide",
									["ViewName", e.Info?.Name],
									["LastViewName", o?.Info?.Name],
								),
							await Promise.all([o?.HideAsync(), e.ShowAsync()])),
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("UiCore", 11, "界面打开完成", [
							"path",
							e.Info.UiPath,
						]))
				: Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn(
						"UiCore",
						11,
						"[OpenStackViewAsync] CreateAsync failed",
						["ViewName", e.Info.Name],
					);
	}
	async Jur() {
		var e;
		this.UHt(),
			0 < this.jur.size
				? ((e = this.Hur.GetHeadNode().Next),
					this.Kur(e.Element),
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("UiCore", 17, "OpenNextQueueViewInternal 入栈", [
							"ViewName",
							e.Element.Info.Name,
						]),
					await this.Yur(e.Element, void 0),
					this.zur(e))
				: (e = this.v9.Peek()) && e.IsHideOrHiding && (await e.ShowAsync()),
			this.O0t();
	}
	async CloseViewAsync(e) {
		this.RHt
			? this.Xur(e, 2)
			: UiModel_1.UiModel.InNormalQueue
				? (this.UHt(), await this.Cfi(e), this.O0t(!1), this.Jur())
				: (this.UHt(), await this.Cfi(e, !0), this.O0t());
	}
	async CloseAndOpenNewAsync(e, o) {
		this.RHt
			? o.IsQueueView
				? (this.Xur(e, 2), this.$ur(o))
				: (this.Xur(e, 3), this.Xur(o, 1))
			: (this.UHt(),
				await this.Cfi(e),
				this.Kur(o),
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("UiCore", 17, "CloseAndOpenNewAsync 入栈", [
						"ViewName",
						o.Info.Name,
					]),
				await this.Yur(o, void 0),
				this.O0t());
	}
	async ResetToViewAsync(e) {
		if (this.RHt) this.Xur(e, 4);
		else {
			var o = new Array();
			for (const e of this.Vur)
				UiModel_1.UiModel.ResetToViewWhiteSet.has(e.View.Info.Name)
					? o.push(e)
					: 1 === e.PendingType && e.View.Destroy();
			if (((this.Vur = o), UiModel_1.UiModel.InNormalQueue)) this.Xur(e, 4);
			else {
				this.UHt();
				var i = e.Info.Name;
				let o;
				for (var n, t = new Stack_1.Stack(); 0 < this.v9.Size; ) {
					const e = this.v9.Peek();
					if (i === e.Info.Name) break;
					UiModel_1.UiModel.ResetToViewWhiteSet.has(e.Info.Name)
						? (t.Push(e), this.Qur())
						: e.IsShowOrShowing
							? await this.Cfi(e)
							: (await e.DestroyAsync(),
								this.Qur(),
								e &&
									((n = this.v9.Peek()),
									EventSystem_1.EventSystem.Emit(
										EventDefine_1.EEventName.StackCloseView,
										e.GetViewId(),
										e.Info.Name,
										n?.Info,
									)));
				}
				for (
					Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("UiCore", 17, "ResetToViewAsync 清栈");
					0 < t.Size;
				) {
					var a = t.Pop();
					this.Kur(a);
				}
				this.v9.Empty ||
					((o = this.v9.Peek()).IsShowOrShowing || (await o.ShowAsync()),
					"BattleView" === o.Info.Name &&
						EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.ResetModuleByResetToBattleView,
						),
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("UiCore", 17, "重置回到界面成功", [
							"ViewName",
							o.Info.Name,
						])),
					this.O0t();
			}
		}
	}
	async Cfi(e, o = !1) {
		var i =
			((i = this.jur.get(e)) && this.zur(i),
			this.Vur.findIndex((o) => o.View === e && 1 === o.PendingType));
		0 <= i && this.Vur.splice(i, 1);
		let n = !0;
		if (e === this.v9.Peek()) {
			this.Qur();
			const n = this.v9.Peek();
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("UiCore", 17, "CloseViewImplement 出栈", [
					"ViewName",
					e.Info.Name,
				]),
				(i = n?.Info.ScenePath),
				i &&
					e.Info.ScenePath === i &&
					((e.SkipReleaseScene = !0), (n.SkipLoadScene = !0));
			const a = ConfigManager_1.ConfigManager.UiViewConfig.GetUiShowConfig(
					e.Info.Name,
				),
				r = n?.WillLoadScene(),
				s = e.WillReleaseScene(),
				l =
					a.CloseBlackScreen &&
					!StringUtils_1.StringUtils.IsBlank(a.CloseBlackScreen.ShowAnimName),
				m = async () => {
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("UiCore", 17, "CloseViewImplement 界面Destroy", [
							"ViewName",
							e.Info?.Name,
						]),
						await e.DestroyAsync();
				},
				c = async () => {
					e.IsShowOrShowing &&
						((e.LastHide = !0),
						Log_1.Log.CheckInfo() &&
							Log_1.Log.Info("UiCore", 17, "CloseViewImplement 界面Hide", [
								"ViewName",
								e.Info?.Name,
							]),
						await e.HideAsync());
				};
			i = async () => {
				await c(), await m();
			};
			var t = async () => {
				o &&
					n &&
					(Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("UiCore", 17, "CloseViewImplement 下个界面Show", [
							"NextViewName",
							n.Info?.Name,
						]),
					await n.ShowAsync());
			};
			r || s || l
				? o
					? (await Promise.all([
							(async () => {
								l
									? await BlackScreenController_1.BlackScreenController.AddBlackScreenAsync(
											a.CloseBlackScreen.ShowAnimName,
											e.Info.Name,
										)
									: s
										? await BlackScreenController_1.BlackScreenController.AddBlackScreenAsync(
												"Start",
												e.Info.Name,
											)
										: r &&
											(await BlackScreenController_1.BlackScreenController.AddBlackScreenAsync(
												"Start",
												n.Info.Name,
											));
							})(),
							i(),
						]),
						Log_1.Log.CheckDebug() &&
							Log_1.Log.Debug("UiCore", 17, "#######黑屏+销毁", [
								"ViewName",
								e.Info.Name,
							]),
						UiCameraAnimationController_1.UiCameraAnimationController.PopCameraHandle(
							e.Info.Name,
							n?.Info,
							e.GetViewId(),
						),
						Log_1.Log.CheckDebug() &&
							Log_1.Log.Debug("UiCore", 17, "#######镜头Pop", [
								"ViewName",
								e.Info.Name,
							]),
						n &&
							((n.ShowPromise = new CustomPromise_1.CustomPromise()),
							r &&
								((n.LoadScenePromise = new CustomPromise_1.CustomPromise()),
								(n.SkipRemoveBlackScreen = !0)),
							t(),
							await n?.LoadScenePromise?.Promise,
							(n.SkipRemoveBlackScreen = !1),
							Log_1.Log.CheckDebug() &&
								Log_1.Log.Debug("UiCore", 17, "#######加载场景", [
									"ViewName",
									e.Info.Name,
								]),
							UiCameraAnimationController_1.UiCameraAnimationController.PushCameraHandle(
								n.Info.Name,
								n.GetViewId(),
								!1,
							),
							Log_1.Log.CheckDebug() &&
								Log_1.Log.Debug("UiCore", 17, "#######镜头Push", [
									"ViewName",
									e.Info.Name,
								]),
							l
								? BlackScreenController_1.BlackScreenController.RemoveBlackScreen(
										a.CloseBlackScreen.HideAnimName,
										e.Info.Name,
									)
								: s
									? BlackScreenController_1.BlackScreenController.RemoveBlackScreen(
											"Close",
											e.Info.Name,
										)
									: r &&
										BlackScreenController_1.BlackScreenController.RemoveBlackScreen(
											"Close",
											n.Info.Name,
										),
							Log_1.Log.CheckDebug() &&
								Log_1.Log.Debug("UiCore", 17, "#######黑屏移除", [
									"ViewName",
									e.Info.Name,
								]),
							await !(o && n && (await n.ShowPromise?.Promise)),
							Log_1.Log.CheckDebug()) &&
							Log_1.Log.Debug("UiCore", 17, "#######界面显示", [
								"ViewName",
								n?.Info.Name,
							]))
					: (await i(),
						UiCameraAnimationController_1.UiCameraAnimationController.PopCameraHandle(
							e.Info.Name,
							void 0,
							e.GetViewId(),
							!0,
						),
						Log_1.Log.CheckDebug() &&
							Log_1.Log.Debug("UiCore", 17, "#######销毁", [
								"ViewName",
								e.Info.Name,
							]))
				: (UiCameraAnimationController_1.UiCameraAnimationController.PopCameraHandle(
						e.Info.Name,
						n?.Info,
						e.GetViewId(),
					),
					n &&
						UiCameraAnimationController_1.UiCameraAnimationController.PushCameraHandle(
							n.Info.Name,
							n.GetViewId(),
						),
					await Promise.all([i(), t()]));
		} else
			this.yur(e)
				? Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("UiCore", 17, "CloseViewImplement 删除", [
						"ViewName",
						e.Info.Name,
					])
				: (Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"UiCore",
							17,
							"CloseViewImplement 删除界面不在栈内",
							["ViewName", e.Info.Name],
						),
					(n = !1)),
				UiCameraAnimationController_1.UiCameraAnimationController.PopCameraHandle(
					e.Info.Name,
					void 0,
					e.GetViewId(),
					!1,
				),
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("UiCore", 17, "CloseViewImplement 界面Destroy", [
						"ViewName",
						e.Info?.Name,
					]),
				await e.DestroyAsync();
		n &&
			(Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"UiCore",
					17,
					"CloseViewImplement 界面关闭完成",
					["ViewName", e.Info?.Name],
					["path", e.Info.UiPath],
				),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.StackCloseView,
				e.GetViewId(),
				e.Info.Name,
				this.v9.Peek()?.Info,
			));
	}
	async CloseHistoryRingViewAsync(e) {
		if (this.Zur(e)) {
			var o = new Array();
			let e = 0;
			var i = [];
			for (const o of this.v9)
				0 === e || e === this.v9.Size - 1 || i.push(o), e++;
			for (const e of i) o.push(this.CloseViewAsync(e));
			await Promise.all(o);
		}
	}
	Zur(e) {
		return this.Fur.has(e);
	}
	ClearContainer() {
		var e = [];
		for (const i of this.jur.values()) {
			var o = i.Element;
			(o.IsExistInLeaveLevel = !0),
				o.Info.IsPermanent ||
					(this.TryCatchViewDestroyCompatible(o),
					this.Hur.Remove(i),
					e.push(o));
		}
		for (const o of e) this.jur.delete(o);
		for (let e = this.Vur.length - 1; 0 <= e; --e) {
			var i = this.Vur[e].View;
			(i.IsExistInLeaveLevel = !0),
				i.Info.IsPermanent ||
					(this.TryCatchViewDestroyCompatible(i), this.Vur.pop());
		}
		e.length = 0;
		for (const o of this.v9)
			(o.IsExistInLeaveLevel = !0),
				o.Info.IsPermanent ||
					(this.TryCatchViewDestroyCompatible(o), e.push(o));
		for (const o of e) this.yur(o);
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("UiCore", 17, "ClearContainer 清栈");
	}
	Xur(e, o) {
		var i = new UiViewPending_1.UiViewPending(e, o);
		if (0 < this.Vur.length) {
			var n = this.Vur[this.Vur.length - 1];
			if (n.Equal(i))
				return void (
					Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn("UiCore", 17, "界面缓存操做重复", [
						"ViewName",
						e.Info.Name,
					])
				);
			if (n.IsPairWith(i))
				return (
					this.Vur.pop(),
					UiManager_1.UiManager.RemoveView(e.GetViewId()),
					void (
						Log_1.Log.CheckWarn() &&
						Log_1.Log.Warn("UiCore", 17, "界面缓存操作成对, 自动移除上一个", [
							"ViewName",
							e.Info.Name,
						])
					)
				);
		}
		this.Vur.push(i),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"UiCore",
					17,
					"缓存界面操作",
					["界面", e.Info.Name],
					["操作类型", o],
				);
	}
	zur(e) {
		e &&
			(this.Hur.Remove(e), this.jur.delete(e.Element), 0 === this.jur.size) &&
			((UiModel_1.UiModel.InNormalQueue = !1),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.ExitNormalQueueState,
			));
	}
	$ur(e) {
		let o;
		var i = this.Hur.Find(
			(o) => !o.Element || e.Info.SortIndex < o.Element.Info.SortIndex,
		);
		(o = i.Pre ? this.Hur.Insert(e, i.Pre) : this.Hur.AddTail(e)),
			this.jur.set(e, o),
			(UiModel_1.UiModel.InNormalQueue = !0),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("UiCore", 17, "缓存界面进入等待队列", [
					"ViewName",
					e.Info.Name,
				]);
	}
}
exports.UiViewStackContainer = UiViewStackContainer;
