"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.EditFormationController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	Net_1 = require("../../../Core/Net/Net"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
	UiManager_1 = require("../../Ui/UiManager"),
	RoleController_1 = require("../RoleUi/RoleController"),
	ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController");
class EditFormationController extends UiControllerBase_1.UiControllerBase {
	static OnAddEvents() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnLoadingNetDataDone,
			this.w4e,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnChangeRole,
				this.xie,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.CloseView,
				this.$Ge,
			);
	}
	static OnRemoveEvents() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnLoadingNetDataDone,
			this.w4e,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnChangeRole,
				this.xie,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.CloseView,
				this.$Ge,
			);
	}
	static OnRegisterNetEvent() {
		Net_1.Net.Register(12661, EditFormationController.t4t);
	}
	static OnUnRegisterNetEvent() {
		Net_1.Net.UnRegister(12661);
	}
	static OnAddOpenViewCheckFunction() {
		UiManager_1.UiManager.AddOpenViewCheckFunction(
			"EditFormationView",
			EditFormationController.CanOpenView,
			EditFormationController.name,
		);
	}
	static OnRemoveOpenViewCheckFunction() {
		UiManager_1.UiManager.RemoveOpenViewCheckFunction(
			"EditFormationView",
			EditFormationController.CanOpenView,
		);
	}
	static RefreshMainRoleInfo() {
		ModelManager_1.ModelManager.EditFormationModel.ChangeEditedMainRole();
	}
	static GetFormationDataRequest() {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("Formation", 49, "请求所有编队数据");
		var o = new Protocol_1.Aki.Protocol.jzn();
		Net_1.Net.Call(13807, o, (o) => {});
	}
	static async EditFormationRequest(o) {
		var e,
			t,
			n = new Array(),
			r = ModelManager_1.ModelManager.EditFormationModel;
		for ([e, t] of r.GetAllEditingFormation()) {
			var i = e === o;
			if (!(i && t.length <= 0)) {
				if (e === r.GetCurrentFormationId) {
					var a = r.GetFormationData(e)?.GetRoleIdList;
					if (a && a.length === t.length) {
						let o = !0;
						for (let e = 0; e < a.length; e++)
							if (a[e] !== t[e]) {
								o = !1;
								break;
							}
						if (o) {
							Log_1.Log.CheckInfo() &&
								Log_1.Log.Info("Formation", 49, "更新单机编队，新旧编队相同");
							continue;
						}
					}
				}
				let o = 0 < t.length ? t[0] : 0;
				if (i) {
					var l = r.GetCurrentFormationData,
						g = l.GetCurrentRolePosition;
					if (
						((o = l.GetCurrentRoleConfigId),
						t.includes(o) || (o = g <= t.length ? t[g - 1] : t[0]),
						r.IsRoleDead(o))
					)
						for (const e of t)
							if (e !== o && !r.IsRoleDead(e)) {
								o = e;
								break;
							}
				}
				((l = new Protocol_1.Aki.Protocol.Iks()).$4n = e),
					(l.X4n = i),
					(l.xkn = t),
					(l.Y4n = o),
					n.push(l);
			}
		}
		var d = new Protocol_1.Aki.Protocol.kzn();
		(d.J4n = n),
			ModelManager_1.ModelManager.SceneTeamModel.RefreshLastTransform(),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Formation", 49, "更新单机编队", ["formations", n]),
			await Net_1.Net.CallAsync(13164, d);
	}
	static async UpdateFormationRequest(o, e, t, n) {
		var r = new Protocol_1.Aki.Protocol.Iks();
		return (
			void 0 !==
			(e =
				(((o =
					((r.$4n = o),
					(r.X4n = e),
					(r.xkn = t),
					(r.Y4n = n),
					new Protocol_1.Aki.Protocol.kzn())).J4n = [r]),
				ModelManager_1.ModelManager.SceneTeamModel.RefreshLastTransform(),
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("Formation", 49, "更新单机编队", ["formation", r]),
				await Net_1.Net.CallAsync(13164, o)))
		);
	}
	static async UpdateFightRoleRequest() {
		var o = ModelManager_1.ModelManager.EditFormationModel,
			e = o.GetEditingRoleIdList(-1);
		if (!(e.length <= 0)) {
			var t = o.GetCurrentFormationData.GetCurrentRolePosition;
			let n = o.GetEditingRoleId(-1, t);
			if (!n || o.IsRoleDead(n))
				for (const t of e)
					if (t !== n && !o.IsRoleDead(t)) {
						n = t;
						break;
					}
			n
				? (((t = new Protocol_1.Aki.Protocol.Vzn()).z4n = n),
					(t.xkn = e),
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("Formation", 49, "更新联机编队", ["massage", t]),
					ModelManager_1.ModelManager.SceneTeamModel.RefreshLastTransform(),
					await Net_1.Net.CallAsync(28496, t))
				: Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn("Formation", 49, "更新联机编队，找不到当前角色");
		}
	}
}
(exports.EditFormationController = EditFormationController),
	((_a = EditFormationController).i4t = "EditBattleTeamForbitState"),
	(EditFormationController.o4t = void 0),
	(EditFormationController.CanOpenView = (o) => {
		var e, t, n;
		return ModelManager_1.ModelManager.FunctionModel.IsOpen(10007)
			? (e = ModelManager_1.ModelManager.SceneTeamModel).IsPhantomTeam
				? (Log_1.Log.CheckWarn() &&
						Log_1.Log.Warn(
							"Formation",
							32,
							"打开编队按钮时，当前编队为声骸编队，无法打开",
						),
					ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
						"PhantomFormationEnterFormationTip",
					),
					!1)
				: (e = e.GetCurrentEntity)?.Valid
					? (n = e.Entity.GetComponent(185))?.Valid
						? (t = e.Entity.GetComponent(157))?.Valid
							? RoleController_1.RoleController.IsInRoleTrial()
								? (Log_1.Log.CheckInfo() &&
										Log_1.Log.Info(
											"Formation",
											5,
											"打开编队按钮时，有试用角色无法打开",
										),
									ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
										EditFormationController.i4t,
									),
									ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
										"TrialRoleTeamLimit",
									),
									!1)
								: n.HasTag(855966206)
									? (Log_1.Log.CheckInfo() &&
											Log_1.Log.Info(
												"Formation",
												5,
												"打开编队按钮时，当前角色正在水中",
											),
										ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
											EditFormationController.i4t,
										),
										!1)
									: n.HasTag(191377386)
										? (Log_1.Log.CheckInfo() &&
												Log_1.Log.Info(
													"Formation",
													5,
													"打开编队按钮时，当前角色正在播放溺水",
												),
											ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
												EditFormationController.i4t,
											),
											!1)
										: n.HasTag(40422668)
											? (Log_1.Log.CheckInfo() &&
													Log_1.Log.Info(
														"Formation",
														5,
														"打开编队按钮时，当前角色处于空中",
													),
												ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
													EditFormationController.i4t,
												),
												!1)
											: n.HasTag(1996802261)
												? (Log_1.Log.CheckInfo() &&
														Log_1.Log.Info(
															"Formation",
															5,
															"打开编队按钮时，当前角色在战斗中",
														),
													ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
														"ForbiddenActionInFight",
													),
													!1)
												: n.HasTag(-1697149502)
													? (Log_1.Log.CheckInfo() &&
															Log_1.Log.Info(
																"Formation",
																7,
																"打开编队按钮时，当前角色不能切人",
															),
														ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
															EditFormationController.i4t,
														),
														!1)
													: 0 < t.GetBuffTotalStackById(BigInt("90003001"))
														? (Log_1.Log.CheckInfo() &&
																Log_1.Log.Info(
																	"Formation",
																	36,
																	"打开编队按钮时，当前角色在电梯中",
																),
															ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
																EditFormationController.i4t,
															),
															!1)
														: !(
																(n = e.Entity.GetComponent(68)) &&
																0 < n.WalkOnWaterStage &&
																(Log_1.Log.CheckInfo() &&
																	Log_1.Log.Info(
																		"Formation",
																		37,
																		"打开编队按钮时，当前角色在水面上行走",
																	),
																ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
																	EditFormationController.i4t,
																),
																1)
															)
							: (Log_1.Log.CheckWarn() &&
									Log_1.Log.Warn(
										"Formation",
										5,
										"打开编队按钮时，当前实体的 CharacterBuffComponent 不存在",
									),
								!1)
						: (Log_1.Log.CheckWarn() &&
								Log_1.Log.Warn(
									"Formation",
									5,
									"打开编队按钮时，当前实体的 TagComponent 不存在",
								),
							!1)
					: (Log_1.Log.CheckWarn() &&
							Log_1.Log.Warn("Formation", 5, "打开编队按钮时，当前实体不存在"),
						!1)
			: (Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn("Formation", 5, "打开编队按钮时，未满足开启条件"),
				!1);
	}),
	(EditFormationController.w4e = () => {
		EditFormationController.GetFormationDataRequest();
	}),
	(EditFormationController.xie = () => {
		var o =
			ModelManager_1.ModelManager.SceneTeamModel.GetCurrentTeamItem
				?.GetConfigId;
		o &&
			ModelManager_1.ModelManager.EditFormationModel.GetCurrentFormationData?.SetCurrentRole(
				o,
			);
	}),
	(EditFormationController.$Ge = (o) => {
		"EditFormationView" === o &&
			EditFormationController.o4t &&
			((o = EditFormationController.o4t.HLs),
			ModelManager_1.ModelManager.EditFormationModel.UpdatePlayerFormations(o),
			(EditFormationController.o4t = void 0));
	}),
	(EditFormationController.t4t = (o) => {
		var e = o.HLs;
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("Formation", 49, "更新背包编队", ["formations", e]),
			ModelManager_1.ModelManager.OnlineModel.RefreshWorldTeamRoleInfo(e),
			ModelManager_1.ModelManager.GameModeModel.IsMulti &&
			UiManager_1.UiManager.IsViewOpen("EditFormationView")
				? (Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"Formation",
							49,
							"更新背包编队时联机打开界面中，进行缓存",
						),
					(_a.o4t = o))
				: ModelManager_1.ModelManager.EditFormationModel.UpdatePlayerFormations(
						e,
					);
	});
