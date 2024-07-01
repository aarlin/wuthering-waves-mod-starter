"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiManager = void 0);
const ue_1 = require("ue"),
	CustomPromise_1 = require("../../Core/Common/CustomPromise"),
	Log_1 = require("../../Core/Common/Log"),
	Stats_1 = require("../../Core/Common/Stats"),
	EventDefine_1 = require("../Common/Event/EventDefine"),
	EventSystem_1 = require("../Common/Event/EventSystem"),
	GlobalData_1 = require("../GlobalData"),
	UiCameraAnimationManager_1 = require("../Module/UiCameraAnimation/UiCameraAnimationManager"),
	UiSceneManager_1 = require("../Module/UiComponent/UiSceneManager"),
	NavigationRegisterCenter_1 = require("../Module/UiNavigation/New/NavigationRegisterCenter"),
	UiNavigationViewManager_1 = require("../Module/UiNavigation/New/UiNavigationViewManager"),
	LguiUtil_1 = require("../Module/Util/LguiUtil"),
	UiPopFrameView_1 = require("./Base/UiPopFrameView"),
	UiViewFloatContainer_1 = require("./Container/Float/UiViewFloatContainer"),
	UiViewListContainer_1 = require("./Container/UiViewListContainer"),
	UiViewSetContainer_1 = require("./Container/UiViewSetContainer"),
	UiViewStackContainer_1 = require("./Container/UiViewStackContainer"),
	UiConfig_1 = require("./Define/UiConfig"),
	UiLayerType_1 = require("./Define/UiLayerType"),
	LguiEventSystemManager_1 = require("./LguiEventSystem/LguiEventSystemManager"),
	UiActorPool_1 = require("./UiActorPool"),
	UIGlobalMaterialParam_1 = require("./UIGlobalMaterialParam"),
	UiLayer_1 = require("./UiLayer"),
	UiModel_1 = require("./UiModel");
class UiManager {
	static get IsInited() {
		return 2 === UiManager.Ife;
	}
	static OpenView(e, r = void 0, i) {
		EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OpenViewBegined, e),
			UiManager.OpenViewAsync(e, r).then(
				(r) => {
					void 0 !== r
						? (i?.(!0, r),
							Log_1.Log.CheckInfo() &&
								Log_1.Log.Info(
									"UiCore",
									17,
									"[OpenView]流程执行成功",
									["ViewName", e],
									["ViewId", r],
								))
						: (i?.(!1, 0),
							EventSystem_1.EventSystem.Emit(
								EventDefine_1.EEventName.OpenViewFail,
								e,
							),
							Log_1.Log.CheckInfo() &&
								Log_1.Log.Info("UiCore", 17, "[OpenView]流程执行失败", [
									"ViewName",
									e,
								]));
				},
				(r) => {
					r instanceof Error
						? Log_1.Log.CheckError() &&
							Log_1.Log.ErrorWithStack(
								"UiCore",
								17,
								"[OpenView]流程执行异常",
								r,
								["error", r.message],
								["ViewName", e],
							)
						: Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"UiCore",
								17,
								"[OpenView]流程执行异常",
								["ViewName", e],
								["error", r],
							),
						i?.(!1, 0),
						EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.OpenViewFail,
							e,
						);
				},
			);
	}
	static async OpenViewAsync(e, r = void 0) {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("UiCore", 17, "[OpenViewAsync]请求打开界面", [
				"界面名称",
				e,
			]);
		var i = !!r && r?.IsMultipleView;
		if (UiManager.V4e(e, i, r)) {
			if ((i = UiManager.Gdr(e)))
				return (
					(i.OpenParam = r),
					(i.OpenPromise = new CustomPromise_1.CustomPromise()),
					await Promise.all([
						UiManager.Ndr.get(i.Info.Type).OpenViewAsync(i),
						i.OpenPromise.Promise,
					]),
					(i.OpenPromise = void 0),
					i.TryEmitInterruptOpExitView(),
					i.GetViewId()
				);
			Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"UiCore",
					17,
					"[OpenViewAsync]打开界面失败, 注册界面失败",
					["name", e],
				);
		} else
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"UiCore",
					17,
					"[OpenViewAsync]打开界面失败, 不满足界面打开条件",
					["界面名称", e],
				);
	}
	static CloseView(e, r) {
		UiManager.CloseViewAsync(e).then(
			() => {
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("UiCore", 17, "[CloseView]流程执行成功", [
						"ViewName",
						e,
					]),
					r?.(!0);
			},
			(i) => {
				i instanceof Error
					? Log_1.Log.CheckError() &&
						Log_1.Log.ErrorWithStack(
							"UiCore",
							17,
							"[CloseView]流程执行异常",
							i,
							["error", i.message],
							["ViewName", e],
						)
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"UiCore",
							17,
							"[CloseView]流程执行异常",
							["ViewName", e],
							["error", i],
						),
					r?.(!1);
			},
		);
	}
	static async CloseViewAsync(e) {
		var r = this.Fur.get(e);
		if (!r)
			return (
				Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn(
						"UiCore",
						17,
						"[CloseViewAsync]关闭界面失败, 界面不存在",
						["界面名称", e],
					),
				!1
			);
		const i = [];
		return (
			r.forEach((e) => i.push(UiManager.CloseViewImplementAsync(e))),
			(await Promise.all(i)).every((e) => e)
		);
	}
	static CloseViewById(e, r) {
		UiManager.CloseViewByIdAsync(e).then(
			() => {
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("UiCore", 17, "[CloseViewById]流程执行成功", [
						"viewId",
						e,
					]),
					r?.(!0);
			},
			(i) => {
				i instanceof Error
					? Log_1.Log.CheckError() &&
						Log_1.Log.ErrorWithStack(
							"UiCore",
							17,
							"[CloseViewById]流程执行异常",
							i,
							["error", i.message],
							["viewId", e],
						)
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"UiCore",
							17,
							"[CloseViewById]流程执行异常",
							["viewId", e],
							["error", i],
						),
					r?.(!1);
			},
		);
	}
	static async CloseViewByIdAsync(e) {
		var r = this.Odr.get(e);
		return r
			? UiManager.CloseViewImplementAsync(r)
			: (Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn(
						"UiCore",
						17,
						"[CloseViewByIdAsync]关闭界面失败, 界面不存在",
						["viewId", e],
					),
				!1);
	}
	static async CloseViewImplementAsync(e) {
		var r = e.Info;
		return (
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"UiCore",
					17,
					"[CloseViewAsync]请求关闭界面",
					["界面名称", r.Name],
					["ViewId", e.GetViewId()],
				),
			e.OpenPromise && e.OpenPromise.SetResult(void 0),
			e.ClosePromise || (e.ClosePromise = new CustomPromise_1.CustomPromise()),
			await UiManager.Ndr.get(r.Type).CloseViewAsync(e),
			await e.ClosePromise?.Promise,
			(e.ClosePromise = void 0),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"UiCore",
					17,
					"[CloseViewAsync]关闭界面成功",
					["界面名称", r.Name],
					["ViewId", e.GetViewId()],
				),
			!0
		);
	}
	static CloseAndOpenView(e, r, i = void 0, o) {
		UiManager.CloseAndOpenViewAsync(e, r, i).then(
			() => {
				o?.(!0);
			},
			(i) => {
				i instanceof Error
					? Log_1.Log.CheckError() &&
						Log_1.Log.ErrorWithStack(
							"UiCore",
							17,
							"[CloseAndOpenView]流程执行异常",
							i,
							["error", i.message],
							["closeViewName", e],
							["openViewName", r],
						)
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"UiCore",
							17,
							"[CloseAndOpenView]流程执行异常",
							["closeViewName", e],
							["openViewName", r],
							["error", i],
						),
					o?.(!1),
					o?.(!1);
			},
		);
	}
	static async CloseAndOpenViewAsync(e, r, i) {
		var o, a;
		return UiConfig_1.UiConfig.TryGetViewInfo(r).Type !==
			UiLayerType_1.ELayerType.Normal
			? (Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"UiCore",
						17,
						"[CloseAndOpenViewAsync]非栈容器的界面不允许使用该接口",
					),
				!1)
			: (o = UiManager.kdr(e))
				? ((a = !!i && i?.IsMultipleView),
					UiManager.V4e(r, a, i)
						? (((a = UiManager.Gdr(r)).OpenParam = i),
							await UiManager.Ndr.get(
								UiLayerType_1.ELayerType.Normal,
							).CloseAndOpenNewAsync(o, a),
							Log_1.Log.CheckInfo() &&
								Log_1.Log.Info(
									"UiCore",
									17,
									"[CloseAndOpenView]流程执行成功",
									["closeViewName", e],
									["openViewName", r],
								),
							!0)
						: (Log_1.Log.CheckInfo() &&
								Log_1.Log.Info(
									"UiCore",
									17,
									"[CloseAndOpenView]流程执行失败, 不满足界面打开条件",
									["closeViewName", e],
									["openViewName", r],
								),
							!1))
				: (Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"UiCore",
							17,
							"[CloseAndOpenViewAsync]未找到待关闭界面",
							["closeViewName", e],
						),
					!1);
	}
	static async PreOpenViewAsync(e) {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("UiCore", 17, "[OpenViewAsync]请求预打开界面", [
				"界面名称",
				e,
			]);
		var r = UiManager.Gdr(e);
		if (r)
			return (
				r.OnPreOpen(),
				UiManager.Fdr.set(r.GetViewId(), r),
				await UiManager.Ndr.get(r.Info.Type).PreOpenViewAsync(r),
				r.GetViewId()
			);
		Log_1.Log.CheckError() &&
			Log_1.Log.Error(
				"UiCore",
				17,
				"[OpenViewAsync]打开界面失败, 注册界面失败",
				["name", e],
			);
	}
	static async OpenViewAfterPreOpenedAsync(e, r) {
		var i,
			o,
			a = UiManager.Fdr.get(e);
		return !(
			!a ||
			((i = a.Info.Name),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"UiCore",
					17,
					"[OpenViewAfterPreOpenedAsync](已预打开过)请求打开界面",
					["界面名称", i],
				),
			(o = !!r && r?.IsMultipleView),
			UiManager.V4e(i, o, r)
				? ((a.OpenParam = r),
					(a.OpenPromise = new CustomPromise_1.CustomPromise()),
					UiManager.RemovePreOpenView(e),
					await Promise.all([
						UiManager.Ndr.get(a.Info.Type).OpenViewAfterPreOpenedAsync(a),
						a.OpenPromise.Promise,
					]),
					(a.OpenPromise = void 0))
				: (Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"UiCore",
							17,
							"[OpenViewAfterPreOpenedAsync](已预打开过)打开界面失败, 不满足界面打开条件",
							["界面名称", i],
						),
					1))
		);
	}
	static RemovePreOpenView(e) {
		UiManager.Fdr.delete(e);
	}
	static wRn() {
		for (const e of UiManager.Fdr.values())
			try {
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"UiCore",
						11,
						"[Clear] 尝试执行销毁的界面",
						["Name", e.constructor.name],
						["ComponentId", e.ComponentId],
					),
					e.OnOpenAfterPreOpened(),
					e.ClearAsync();
			} catch (e) {
				e instanceof Error
					? Log_1.Log.CheckError() &&
						Log_1.Log.ErrorWithStack(
							"UiCore",
							11,
							"界面同步关闭异常,业务变量可能未初始化完成,需要关注",
							e,
							["error", e.message],
						)
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"UiCore",
							11,
							"界面同步关闭异常,业务变量可能未初始化完成,需要关注",
							["error", e],
						);
			}
		UiManager.Fdr.clear();
	}
	static IsViewShow(e) {
		if ((e = UiManager.Fur.get(e)))
			for (const r of e) {
				if (r.IsPreOpening) return !1;
				if (r.IsShowOrShowing) return !0;
			}
		return !1;
	}
	static IsViewOpen(e) {
		if ((e = UiManager.Fur.get(e)))
			for (const r of e) {
				if (r.IsPreOpening) return !1;
				if (r.WaitToDestroy) return !1;
				if (!r.IsDestroyOrDestroying && !r.IsHideOrHiding) return !0;
			}
		return !1;
	}
	static IsViewCreating(e) {
		if ((e = UiManager.Fur.get(e)))
			for (const r of e) if (r.IsCreating) return !0;
		return !1;
	}
	static IsViewDestroying(e) {
		if ((e = UiManager.Fur.get(e)))
			for (const r of e) if (r.IsDestroying) return !0;
		return !1;
	}
	static Vdr() {
		UiManager.Ndr.clear(),
			UiManager.Ndr.set(
				UiLayerType_1.ELayerType.HUD,
				new UiViewSetContainer_1.UiViewSetContainer(UiModel_1.UiModel.HudMap),
			);
		var e = new UiViewStackContainer_1.UiViewStackContainer(
			UiModel_1.UiModel.NormalStack,
		);
		UiManager.Ndr.set(UiLayerType_1.ELayerType.Normal, e),
			UiManager.Ndr.set(UiLayerType_1.ELayerType.CG, e),
			UiManager.Ndr.set(
				UiLayerType_1.ELayerType.Pop,
				new UiViewListContainer_1.UiViewListContainer(
					UiModel_1.UiModel.PopList,
				),
			),
			UiManager.Ndr.set(
				UiLayerType_1.ELayerType.Float,
				new UiViewFloatContainer_1.UiViewFloatContainer(
					UiModel_1.UiModel.FloatQueueMap,
					UiModel_1.UiModel.ShowViewMap,
					UiModel_1.UiModel.HideViewMap,
				),
			),
			UiManager.Ndr.set(
				UiLayerType_1.ELayerType.Guide,
				new UiViewListContainer_1.UiViewListContainer(
					UiModel_1.UiModel.GuideList,
				),
			),
			UiManager.Ndr.set(
				UiLayerType_1.ELayerType.Loading,
				new UiViewSetContainer_1.UiViewSetContainer(
					UiModel_1.UiModel.LoadingMap,
				),
			),
			UiManager.Ndr.set(
				UiLayerType_1.ELayerType.NetWork,
				new UiViewListContainer_1.UiViewListContainer(
					UiModel_1.UiModel.NetWorkList,
				),
			),
			ue_1.KuroStaticLibrary.IsBuildShipping() ||
				UiManager.Ndr.set(
					UiLayerType_1.ELayerType.Debug,
					new UiViewSetContainer_1.UiViewSetContainer(
						UiModel_1.UiModel.DebugMap,
					),
				);
	}
	static dde() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.ResetToBattleView,
			UiManager.Hdr,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.ExitNormalQueueState,
				UiManager.jdr,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.ActiveBattleView,
				UiManager.Wdr,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.DisActiveBattleView,
				UiManager.Kdr,
			);
	}
	static ResetToBattleView(e) {
		UiManager.Ndr.get(UiLayerType_1.ELayerType.Pop).CloseAllView(),
			UiManager.NormalResetToView("BattleView", e);
	}
	static NormalResetToView(e, r) {
		UiManager.NormalResetToViewAsync(e).then(
			() => {
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("UiCore", 17, "[NormalResetToView]流程执行成功", [
						"ViewName",
						e,
					]),
					r?.(!0);
			},
			(i) => {
				i instanceof Error
					? Log_1.Log.CheckError() &&
						Log_1.Log.ErrorWithStack(
							"UiCore",
							17,
							"[NormalResetToView]流程执行异常",
							i,
							["error", i.message],
							["ViewName", e],
						)
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"UiCore",
							17,
							"[NormalResetToView]流程执行异常",
							["ViewName", e],
							["error", i],
						),
					r?.(!1);
			},
		);
	}
	static async NormalResetToViewAsync(e) {
		var r = UiManager.Ndr.get(UiLayerType_1.ELayerType.Normal),
			i = UiManager.kdr(e);
		i
			? (Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("UiCore", 17, "[NormalResetToView]重置到界面", [
						"viewName",
						e,
					]),
				await r.ResetToViewAsync(i))
			: Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn("UiCore", 17, "未找到待重置界面", ["viewName", e]);
	}
	static CloseHistoryRingView(e, r) {
		UiManager.CloseHistoryRingViewAsync(e).then(
			() => {
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("UiCore", 17, "[CloseHistoryRingView]流程执行成功", [
						"ViewName",
						e,
					]),
					r?.(!0);
			},
			(i) => {
				i instanceof Error
					? Log_1.Log.CheckError() &&
						Log_1.Log.ErrorWithStack(
							"UiCore",
							17,
							"[CloseHistoryRingView]流程执行异常",
							i,
							["error", i.message],
							["ViewName", e],
						)
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"UiCore",
							17,
							"[CloseHistoryRingView]流程执行异常",
							["ViewName", e],
							["error", i],
						),
					r?.(!1);
			},
		);
	}
	static async CloseHistoryRingViewAsync(e) {
		var r = UiManager.Ndr.get(UiLayerType_1.ELayerType.Normal);
		void 0 !== r && (await r.CloseHistoryRingViewAsync(e));
	}
	static AddTickView(e) {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("UiCore", 17, "[AddTickView] 添加界面Tick", [
				"name",
				e.constructor.name,
			]),
			UiManager.Qdr.add(e);
	}
	static RemoveTickView(e) {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("UiCore", 17, "[RemoveTickView] 移除界面Tick", [
				"name",
				e.constructor.name,
			]),
			UiManager.Qdr.delete(e);
	}
	static Gdr(e) {
		var r,
			i = UiConfig_1.UiConfig.TryGetViewInfo(e);
		if (i)
			return (
				(r = new i.Ctor(i)).InitRootActorLoadInfo(),
				0 < i.CommonPopBg &&
					((i = new UiPopFrameView_1.UiPopFrameView(i)),
					(r.ChildPopView = i),
					r.AddChild(i)),
				UiManager.Xdr(r),
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.CreateViewInstance,
					r,
				),
				r
			);
		Log_1.Log.CheckError() &&
			Log_1.Log.Error("UiCore", 17, "界面信息viewInfo获取失败", ["name", e]);
	}
	static $dr() {
		UiManager.Ndr.get(UiLayerType_1.ELayerType.Float).StartWaitingNormalView();
	}
	static kdr(e) {
		if ((e = this.Fur.get(e)) && 0 !== e.size)
			for (const r of e.values()) return r;
	}
	static async Initialize() {
		GlobalData_1.GlobalData.World
			? 0 === UiManager.Ife &&
				((UiManager.Ife = 1),
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("UiCore", 17, "[Initialize]初始化UiManager"),
				NavigationRegisterCenter_1.NavigationRegisterCenter.Init(),
				await Promise.all([
					UiLayer_1.UiLayer.Initialize(),
					LguiEventSystemManager_1.LguiEventSystemManager.Initialize(),
				]),
				await UiActorPool_1.UiActorPool.Init(),
				UiManager.Vdr(),
				UiNavigationViewManager_1.UiNavigationViewManager.Initialize(),
				UIGlobalMaterialParam_1.UiGlobalMaterialParam.Init(),
				UiManager.dde(),
				EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.UiManagerInit),
				(UiManager.Ife = 2))
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error("UiCore", 17, "游戏世界不存在");
	}
	static LockOpen() {
		LguiUtil_1.LguiUtil.SetActorIsPermanent(UiLayer_1.UiLayer.UiRoot, !0, !0),
			(UiManager.Ydr = !0),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("UiCore", 17, "[UIManager.UnLockOpen] 禁止打开界面");
	}
	static UnLockOpen() {
		(UiManager.Ydr = !1),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("UiCore", 17, "[UIManager.UnLockOpen] 恢复打开界面");
	}
	static get IsLockOpen() {
		return UiManager.Ydr;
	}
	static async ClearAsync() {
		for (var [e, r] of (Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("UiCore", 17, "[UIManager.ClearAsync] 清理UIManager 开始"),
		UiManager.Ndr))
			0 < (e & UiLayerType_1.NORMAL_CONTAINER_TYPE) || r.ClearContainer();
		var i = [];
		for (const e of UiManager.Odr.values())
			e.Info?.IsPermanent ||
				0 < (e.Info.Type & UiLayerType_1.NORMAL_CONTAINER_TYPE) ||
				(Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"UiCore",
						11,
						"[UIManager.ClearAsync] 需要等待销毁的界面-非stack容器",
						["Name", e.constructor.name],
						["ComponentId", e.ComponentId],
					),
				i.push(e.DeadPromise?.Promise));
		await Promise.all(i),
			UiManager.wRn(),
			UiManager.Ndr.get(UiLayerType_1.ELayerType.Normal)?.ClearContainer();
		var o = [];
		for (const e of UiManager.Odr.values())
			e.Info?.IsPermanent ||
				(e.Info.Type & UiLayerType_1.NORMAL_CONTAINER_TYPE) <= 0 ||
				(Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"UiCore",
						11,
						"[UIManager.ClearAsync] 需要等待销毁的界面-stack容器",
						["Name", e.constructor.name],
						["ComponentId", e.ComponentId],
					),
				o.push(e.DeadPromise?.Promise));
		await Promise.all(o),
			UiActorPool_1.UiActorPool.ClearPool(),
			UiSceneManager_1.UiSceneManager.Clear();
		try {
			UiCameraAnimationManager_1.UiCameraAnimationManager.ClearDisplay();
		} catch (e) {
			e instanceof Error
				? Log_1.Log.CheckError() &&
					Log_1.Log.ErrorWithStack(
						"Game",
						3,
						"[Game.LeaveLevel] 调用UiCameraAnimationManager.ResetUiCameraAnimationManager异常。",
						e,
						["error", e.message],
					)
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Game",
						3,
						"[Game.LeaveLevel] 调用UiCameraAnimationManager.ResetUiCameraAnimationManager异常。",
						["error", e],
					);
		}
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("UiCore", 17, "[UIManager.ClearAsync] 清理UIManager 完成");
	}
	static Tick(e) {
		for (const r of this.Qdr) r.Tick(e);
		UiActorPool_1.UiActorPool.Tick(e);
	}
	static AfterTick(e) {
		for (const r of this.Qdr) r.AfterTick(e);
	}
	static V4e(e, r = !1, i = void 0) {
		if (
			GlobalData_1.GlobalData.IsSceneClearing &&
			!UiConfig_1.UiConfig.CanOpenWhileClearSceneViewNameSet.has(e)
		)
			return (
				Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn(
						"UiCore",
						17,
						"[CanOpenView] 退出场景清理时不允许打开UI界面",
						["ViewName", e],
					),
				!1
			);
		if (UiManager.Ydr)
			return (
				Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn(
						"UiCore",
						17,
						"[CanOpenView] 无缝加载期间不允许打开UI界面",
						["ViewName", e],
					),
				!1
			);
		var o = UiConfig_1.UiConfig.TryGetViewInfo(e);
		if (!o)
			return (
				Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn("UiCore", 17, "[CanOpenView] 界面配置不存在", [
						"ViewName",
						e,
					]),
				!1
			);
		if (
			!(0 < (o.Type & UiLayerType_1.MULTIPLE_VIEW_TYPE)) &&
			!r &&
			UiManager.IsViewOpen(e)
		)
			return (
				Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn("UiCore", 17, "[CanOpenView] 界面重复打开", [
						"ViewName",
						e,
					]),
				!1
			);
		if (o.ScenePointTag)
			return (
				Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn(
						"UiCore",
						17,
						"[CanOpenView] ScenePointTag不允许配置",
						["ViewName", e],
					),
				!1
			);
		if (0 < o.BeObstructView.length)
			for (const r of o.BeObstructView)
				if (UiManager.IsViewShow(r))
					return (
						Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"UiCore",
								17,
								"[CanOpenView] 检测到表格配置了界面互斥",
								["ViewName", e],
								["ViewOpenCheck", r],
							),
						!1
					);
		return UiManager.Jdr(e, !1, i)
			? !!UiManager.Jdr(e, !0, i) ||
					(Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"UiCore",
							17,
							"[CanOpenView] 外部注册的全局界面OpenView检查函数不通过",
							["viewName", e],
						),
					!1)
			: (Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"UiCore",
						17,
						"[CanOpenView] 外部注册的单个界面OpenView检查函数不通过",
						["viewName", e],
					),
				!1);
	}
	static AddOpenViewCheckFunction(e, r, i) {
		let o = UiManager.zdr.get(e);
		o || ((o = new Map()), UiManager.zdr.set(e, o)), o.set(r, i);
	}
	static RemoveOpenViewCheckFunction(e, r) {
		var i = UiManager.zdr.get(e);
		i && (i.delete(r), 0 === i.size) && UiManager.zdr.delete(e);
	}
	static Jdr(e, r = !1, i = void 0) {
		if ((r = UiManager.zdr.get(r ? "All" : e)) && 0 < r.size)
			for (var [o, a] of r)
				if (!o(e, i))
					return (
						Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"UiCore",
								17,
								"外部注册的OpenView检查函数不通过",
								["viewName", e],
								["reason", a],
							),
						!1
					);
		return !0;
	}
	static GetViewByName(e) {
		return UiManager.kdr(e);
	}
	static GetView(e) {
		return this.Odr.get(e);
	}
	static Xdr(e) {
		UiManager.Odr.set(e.GetViewId(), e);
		var r = e.Info.Name;
		let i = UiManager.Fur.get(r);
		i || ((i = new Set()), UiManager.Fur.set(r, i)), i.add(e);
	}
	static RemoveView(e) {
		var r,
			i = UiManager.Odr.get(e);
		i &&
			(UiManager.Odr.delete(e),
			(e = i.Info.Name),
			(r = UiManager.Fur.get(e))) &&
			(r.delete(i), r.size || UiManager.Fur.delete(e));
	}
}
((exports.UiManager = UiManager).Ife = 0),
	(UiManager.Ndr = new Map()),
	(UiManager.zdr = new Map()),
	(UiManager.MBo = void 0),
	(UiManager.Odr = new Map()),
	(UiManager.Fur = new Map()),
	(UiManager.Qdr = new Set()),
	(UiManager.Fdr = new Map()),
	(UiManager.Hdr = () => {
		Log_1.Log.CheckInfo() && Log_1.Log.Info("UiCore", 17, "重置回到主界面"),
			UiManager.Ndr.get(UiLayerType_1.ELayerType.Pop).CloseAllView(),
			UiManager.NormalResetToView("BattleView");
	}),
	(UiManager.jdr = () => {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("UiCore", 17, "退出队列状态,重置回到主界面"),
			UiManager.$dr();
	}),
	(UiManager.Wdr = () => {
		(UiModel_1.UiModel.IsInMainView = !0),
			UiManager.Ndr.get(UiLayerType_1.ELayerType.Float).ShowFloatTips();
	}),
	(UiManager.Kdr = () => {
		(UiModel_1.UiModel.IsInMainView = !1),
			UiManager.Ndr.get(UiLayerType_1.ELayerType.Float).HideFloatTips();
	}),
	(UiManager.Ydr = !1);
