"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GachaController = void 0);
const LanguageSystem_1 = require("../../../Core/Common/LanguageSystem"),
	Log_1 = require("../../../Core/Common/Log"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	Net_1 = require("../../../Core/Net/Net"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	TimeUtil_1 = require("../../Common/TimeUtil"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
	InputManager_1 = require("../../Ui/Input/InputManager"),
	UiManager_1 = require("../../Ui/UiManager"),
	ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine"),
	UiModelResourcesManager_1 = require("../UiComponent/UiModelResourcesManager"),
	GachaDefine_1 = require("./GachaDefine"),
	GachaModel_1 = require("./GachaModel"),
	HULU_BASE_ID = 2e7,
	HULU_PARTY_ID = 1e5;
class GachaController extends UiControllerBase_1.UiControllerBase {
	static OnInit() {
		return (
			InputManager_1.InputManager.RegisterOpenViewFunc(
				"GachaMainView",
				GachaController.Y7t,
			),
			!0
		);
	}
	static OnAddEvents() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnFunctionOpenSet,
			this.J7t,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnFunctionOpenUpdate,
				this.J7t,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.CrossDay,
				this.z7t,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.AfterCloseGachaScene,
				this.OnAfterCloseGachaScent,
			);
	}
	static OnRemoveEvents() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnFunctionOpenSet,
			this.J7t,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnFunctionOpenUpdate,
				this.J7t,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.CrossDay,
				this.z7t,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.AfterCloseGachaScene,
				this.OnAfterCloseGachaScent,
			);
	}
	static OnRegisterNetEvent() {
		Net_1.Net.Register(10183, GachaController.OnGachaResultNotify);
	}
	static OnUnRegisterNetEvent() {
		Net_1.Net.UnRegister(10183);
	}
	static CanCloseView() {
		return (
			!!ModelManager_1.ModelManager.GachaModel.CanCloseView ||
			(EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.CloseGachaSceneView,
			),
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("Gacha", 28, "GachaController关闭GachaScene"),
			!1)
		);
	}
	static GachaHistoryRequest(e) {}
	static IsNewRole(e) {
		var a = !GachaController.Z7t.has(e);
		return a && GachaController.Z7t.add(e), a;
	}
	static async GachaRequest(e, a) {
		var o, n;
		((n = Protocol_1.Aki.Protocol.YZn.create()).c5n = e),
			(n.m5n = a),
			ModelManager_1.ModelManager.RoleModel.GetRoleList().forEach((e) => {
				e && GachaController.Z7t.add(e.GetDataId());
			}),
			(n = await Net_1.Net.CallAsync(8315, n)) &&
				(n.lkn === Protocol_1.Aki.Protocol.lkn.Proto_ErrGachaIsNotInOpenTime
					? ((o = new ConfirmBoxDefine_1.ConfirmBoxDataNew(67)),
						ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
							o,
						),
						this.z7t())
					: n.lkn !== Protocol_1.Aki.Protocol.lkn.Sys
						? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
								n.lkn,
								15058,
							)
						: (ModelManager_1.ModelManager.GachaModel.UpdateCount(e, a),
							(ModelManager_1.ModelManager.GachaModel.CurGachaResult = n.ARs),
							UiManager_1.UiManager.OpenView("DrawMainView")));
	}
	static GachaInfoRequest(e, a = 0) {
		var o = TimeUtil_1.TimeUtil.GetServerTime() - this.eHt;
		(this.eHt = TimeUtil_1.TimeUtil.GetServerTime()),
			o < this.tHt
				? e &&
					!UiManager_1.UiManager.IsViewOpen("GachaMainView") &&
					UiManager_1.UiManager.OpenView("GachaMainView")
				: (((o = Protocol_1.Aki.Protocol.QZn.create()).d5n =
						LanguageSystem_1.LanguageSystem.GetLanguageDefineByCode(
							LanguageSystem_1.LanguageSystem.PackageLanguage,
						).LanguageType),
					Net_1.Net.Call(12776, o, (a) => {
						a
							? a.lkn !== Protocol_1.Aki.Protocol.lkn.Sys
								? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
										a.lkn,
										20889,
									)
								: ModelManager_1.ModelManager.LoadingModel?.IsLoading
									? Log_1.Log.CheckInfo() &&
										Log_1.Log.Info(
											"Gacha",
											35,
											"[GachaController.GachaInfoRequest] 在Loading中,打开抽卡界面取消",
										)
									: (Log_1.Log.CheckDebug() &&
											Log_1.Log.Debug("Gacha", 35, "抽卡服务端数据:", [
												"Result",
												JSON.stringify(a),
											]),
										ModelManager_1.ModelManager.GachaModel.InitGachaInfoMap(
											a.LRs,
										),
										(ModelManager_1.ModelManager.GachaModel.TodayResultCount =
											a.RRs),
										(ModelManager_1.ModelManager.GachaModel.RecordId = a.DRs),
										EventSystem_1.EventSystem.Emit(
											EventDefine_1.EEventName.RefreshGachaMainView,
										),
										EventSystem_1.EventSystem.Emit(
											EventDefine_1.EEventName.OnOpenGachaChanged,
										),
										e &&
											!UiManager_1.UiManager.IsViewOpen("GachaMainView") &&
											UiManager_1.UiManager.OpenView("GachaMainView"))
							: Log_1.Log.CheckError() &&
								Log_1.Log.Error("Gacha", 9, "请求抽奖数据失败");
					}));
	}
	static GachaUsePoolRequest(e, a) {
		var o = Protocol_1.Aki.Protocol.ZZn.create();
		(o.c5n = e),
			(o.C5n = a),
			Net_1.Net.Call(8527, o, (o) => {
				o
					? o.lkn !== Protocol_1.Aki.Protocol.lkn.Sys
						? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
								o.lkn,
								11845,
							)
						: (o = ModelManager_1.ModelManager.GachaModel.GetGachaInfo(e))
							? ((o.UsePoolId = a),
								EventSystem_1.EventSystem.Emit(
									EventDefine_1.EEventName.GachaPoolSelectResponse,
									e,
									a,
								))
							: Log_1.Log.CheckError() &&
								Log_1.Log.Error("Gacha", 44, "卡池设置失败")
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error("Gacha", 44, "选择卡池失败");
			});
	}
	static PreloadGachaResultResource(e) {
		const a = [],
			o = new Map();
		ModelManager_1.ModelManager.GachaModel.CurGachaResult.forEach((e, n) => {
			var r = e.u5n.G3n;
			let t;
			switch (ConfigManager_1.ConfigManager.GachaConfig.GetItemIdType(r)) {
				case 1:
					var i = ConfigManager_1.ConfigManager.GachaConfig.GetRoleInfoById(r),
						l =
							(o.get(r) ||
								(o.set(r, !0),
								a.push(
									...UiModelResourcesManager_1.UiModelResourcesManager.GetRoleResourcesPath(
										i.Id,
									),
								)),
							ModelManager_1.ModelManager.WeaponModel.GetWeaponIdByRoleDataId(
								i.Id,
							));
					l =
						((t =
							UiModelResourcesManager_1.UiModelResourcesManager.GetWeaponResourcesPath(
								l,
							)),
						o.get(r) || (o.set(r, !0), a.push(...t)),
						ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(i.Id));
					a.push(
						...UiModelResourcesManager_1.UiModelResourcesManager.GetHuluResourcesPath(
							1e5 * l.PartyId + 2e7 + 1,
						),
					);
					break;
				case 2:
					(t =
						UiModelResourcesManager_1.UiModelResourcesManager.GetWeaponResourcesPath(
							r,
						)),
						o.get(r) || (o.set(r, !0), a.push(...t));
			}
		}),
			UiModelResourcesManager_1.UiModelResourcesManager.LoadUiModelResources(
				a,
				e,
			);
	}
	static CommonShowRoleResult(e, a, o) {
		var n, r, t;
		1 ===
			ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(
				e,
			) &&
			((n = new Array()),
			(r = new GachaModel_1.GachaResult()),
			((t = new Protocol_1.Aki.Protocol.u5n()).G3n = e),
			(t.g5n = 1),
			(r.u5n = t),
			n.push(r),
			(e = {
				SkipOnLoadResourceFinish: a,
				ResultViewHideExtraReward: o,
				IsOnlyShowGold: !1,
			}),
			UiManager_1.UiManager.IsViewOpen("DrawMainView")
				? ModelManager_1.ModelManager.GachaModel.CacheGachaInfo({
						ResultViewData: e,
						GachaResult: n,
					})
				: ((ModelManager_1.ModelManager.GachaModel.CurGachaResult = n),
					e.SkipOnLoadResourceFinish
						? UiManager_1.UiManager.OpenView("GachaScanView", e)
						: UiManager_1.UiManager.OpenView("DrawMainView", e)));
	}
}
((exports.GachaController = GachaController).Z7t = new Set()),
	(GachaController.Y7t = () => {
		GachaController.OpenGachaMainView(!0);
	}),
	(GachaController.OnGachaResultNotify = (e) => {
		(ModelManager_1.ModelManager.GachaModel.CurGachaResult = e.ARs),
			UiManager_1.UiManager.OpenView("DrawMainView");
	}),
	(GachaController.J7t = (e, a) => {
		10009 === e &&
			a &&
			(ModelManager_1.ModelManager.GachaModel.InitGachaPoolOpenRecord(),
			GachaController.GachaInfoRequest(!1));
	}),
	(GachaController.z7t = () => {
		UiManager_1.UiManager.IsViewOpen("GachaMainView") &&
			GachaController.GachaInfoRequest(!1);
	}),
	(GachaController.OpenGachaMainView = (e = !1) => {
		ModelManager_1.ModelManager.FunctionModel.IsOpen(10009)
			? GachaController.GachaInfoRequest(!0, e)
			: Log_1.Log.CheckError() && Log_1.Log.Error("Gacha", 9, "抽奖未开启");
	}),
	(GachaController.eHt = 0),
	(GachaController.tHt = 1),
	(GachaController.OnAfterCloseGachaScent = () => {
		var e = ModelManager_1.ModelManager.GachaModel.GetCachedGachaInfo();
		e &&
			((ModelManager_1.ModelManager.GachaModel.CurGachaResult = e.GachaResult),
			UiManager_1.UiManager.OpenView("DrawMainView", e.ResultViewData));
	}),
	(GachaController.OpenGachaSelectionView = (e) => {
		var a;
		UiManager_1.UiManager.IsViewOpen("GachaSelectionView")
			? EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.GachaSelectionViewRefresh,
					e,
				)
			: (((a = new GachaDefine_1.GachaSelectionViewData()).GachaInfo = e),
				UiManager_1.UiManager.OpenView("GachaSelectionView", a));
	});
