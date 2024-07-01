"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FlowLaunchCenter = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	LevelGeneralContextDefine_1 = require("../../../LevelGamePlay/LevelGeneralContextDefine"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiLayerType_1 = require("../../../Ui/Define/UiLayerType"),
	UiManager_1 = require("../../../Ui/UiManager"),
	UiModel_1 = require("../../../Ui/UiModel"),
	ControllerAssistantBase_1 = require("../../GeneralLogicTree/ControllerAssistant/ControllerAssistantBase"),
	PlotData_1 = require("../PlotData"),
	FlowController_1 = require("./FlowController"),
	FlowData_1 = require("./FlowData");
class FlowLaunchCenter extends ControllerAssistantBase_1.ControllerAssistantBase {
	constructor() {
		super(...arguments),
			(this.oXi = !1),
			(this.rXi = 0),
			(this.pCo = new Array()),
			(this.MAn = 7),
			(this.StartPlotNetworkPending = () => {
				var e;
				ModelManager_1.ModelManager.PlotModel.IsInPlot ||
					(0 !== ModelManager_1.ModelManager.PlotModel.PlotPendingList.length &&
						((e = ModelManager_1.ModelManager.PlotModel.PlotPendingList[0]),
						this.sXi(e)
							? (ModelManager_1.ModelManager.PlotModel.PlotPendingList.shift(),
								Log_1.Log.CheckInfo() &&
									Log_1.Log.Info(
										"Plot",
										27,
										"开始缓存的剧情",
										["FlowIncId", e.FlowIncId],
										["FlowListName", e.FlowListName],
										["FlowId", e.FlowId],
										["StateID", e.StateId],
									),
								this.aXi(e))
							: (this.oXi = !0)));
			}),
			(this.SAn = (e, o) =>
				!ModelManager_1.ModelManager.LoadingModel.IsLoading ||
				(o.FadeBegin &&
					(Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("Plot", 27, "Loading期间准备播剧情，提前打开黑幕"),
					ControllerHolder_1.ControllerHolder.LevelLoadingController.OpenLoading(
						0,
						3,
						void 0,
						0,
						o.FadeBegin,
						!1,
						!1,
					),
					(o.FadeBegin = void 0)),
				!1)),
			(this.nXi = new Set(["BattleView", "PlotView", "PlotSubtitleView"])),
			(this.EAn = (e, o) =>
				o.UiParam?.ViewName
					? !!UiManager_1.UiManager.IsViewShow(o.UiParam.ViewName) ||
						(!!o.CanBeAbandoned &&
							((o.IsBreakdown = !0),
							Log_1.Log.CheckInfo() &&
								Log_1.Log.Info(
									"Plot",
									27,
									"剧情检查条件不通过，且允许被舍弃，丢了",
									["incId", o.FlowIncId],
									["flowListName", o.FlowListName],
									["flowId", o.FlowId],
									["stateId", o.StateId],
								),
							!0))
					: !!(o = UiModel_1.UiModel.GetTopView(UiLayerType_1.ELayerType.Normal)
							?.Info?.Name) &&
						!!this.nXi.has(o) &&
						UiManager_1.UiManager.IsViewShow(o)),
			(this.yAn = (e, o) =>
				!ModelManager_1.ModelManager.TeleportModel.IsTeleport),
			(this.IAn = (e, o) =>
				!ModelManager_1.ModelManager.SceneTeamModel.IsAllDid()),
			(this.TAn = (e, o) => {
				var t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentTeamItem;
				return !!t && !t.IsDead();
			}),
			(this.LAn = (e, o) =>
				ModelManager_1.ModelManager.SceneTeamModel.IsTeamReady),
			(this.DAn = (e, o) =>
				!(
					("LevelC" === o.PlotLevel || o.IsWaitAnim) &&
					(this.rXi >
					ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig.WaitCalmTime
						? (this.rXi = 0)
						: (o =
									ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity.CheckGetComponent(
										185,
									))?.Valid
							? o.HasTag(-1371021686)
								? ((this.rXi += e), 1)
								: (this.rXi = 0)
							: (Log_1.Log.CheckDebug() &&
									Log_1.Log.Debug(
										"Plot",
										27,
										"开始剧情检查人物站立时拿不到BaseTagComponent",
									),
								(this.rXi = 0)))
				));
	}
	OnDestroy() {}
	OnInit() {
		this.pCo.push([0, "场景未加载完", this.SAn]),
			this.pCo.push([1, "界面检查不通过", this.EAn]),
			this.pCo.push([2, "传送未完成", this.yAn]),
			this.pCo.push([3, "死亡或者队伍没人", this.IAn]),
			this.pCo.push([4, "当前角色死亡", this.TAn]),
			this.pCo.push([5, "编队未准备好", this.LAn]),
			this.pCo.push([6, "人物动作还没回正", this.DAn]),
			this.pCo.forEach((e, o) => {
				e[0] !== o &&
					Log_1.Log.CheckError() &&
					Log_1.Log.Error("Plot", 27, "剧情开始检查队列顺序错误", ["index", o]);
			});
	}
	StartFlow(
		e,
		o,
		t,
		n = void 0,
		l = FlowController_1.LOCAL_FLOWINCID,
		r = !1,
		a = !1,
		i,
		d = !1,
		s = !1,
		g,
	) {
		var M,
			L,
			I = ConfigManager_1.ConfigManager.FlowConfig.GetFlowStateActions(e, o, t);
		return I
			? ((l = r ? l : FlowLaunchCenter.hXi--),
				(n = n ? LevelGeneralContextDefine_1.GeneralContext.Copy(n) : void 0),
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"Plot",
						18,
						"StartFlow",
						["FLowIncId", l],
						["FlowListName", e],
						["FlowId", o],
						["StateId", t],
					),
				EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnStartFlow),
				(M = ConfigManager_1.ConfigManager.FlowConfig.GetFlowStateKeepMusic(
					e,
					o,
					t,
				)),
				(L = PlotData_1.PlotInfo.Create()).Init(
					r,
					l,
					e,
					o,
					t,
					I,
					M,
					n,
					a,
					i,
					d,
					s,
					g,
				),
				this.sXi(L)
					? this.aXi(L)
					: (ModelManager_1.ModelManager.PlotModel.PendingPlot(L),
						(this.oXi = !0),
						ControllerHolder_1.ControllerHolder.FlowController.CheckDisableInput(
							L.PlotLevel,
						)),
				l)
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Level",
						27,
						"[StartFlow] 无法找到对应剧情的状态",
						["FlowListName", e],
						["FlowId", o],
						["FlowId", o],
						["StateId", t],
					),
				0);
	}
	Tick(e) {
		var o;
		this.oXi &&
			((o =
				0 <= ModelManager_1.ModelManager.PlotModel.PlotPendingList.length
					? ModelManager_1.ModelManager.PlotModel.PlotPendingList[0]
					: void 0)
				? this.sXi(o, e) &&
					(ModelManager_1.ModelManager.PlotModel.PlotPendingList.shift(),
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"Plot",
							27,
							"开始缓存的剧情",
							["FlowIncId", o.FlowIncId],
							["FlowListName", o.FlowListName],
							["FlowId", o.FlowId],
							["StateID", o.StateId],
						),
					this.aXi(o),
					(this.oXi = !1))
				: (this.oXi = !1));
	}
	sXi(e, o = 0) {
		if (!e.IsBreakdown) {
			if (7 !== this.MAn && !this.pCo[this.MAn][2](o, e)) return !1;
			for (const t of this.pCo)
				if (t[0] !== this.MAn && !t[2](o, e))
					return (
						(this.MAn = t[0]),
						Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"Plot",
								27,
								"剧情开始检查不通过",
								["reason", t[1]],
								["IncId", e.FlowIncId],
							),
						!1
					);
		}
		return (this.MAn = 7), !0;
	}
	aXi(e) {
		if (
			(ModelManager_1.ModelManager.PlotModel.IsInInteraction &&
				(Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("Plot", 18, "交互中进剧情，直接结束交互"),
				ControllerHolder_1.ControllerHolder.PlotController.EndInteraction(!0)),
			ModelManager_1.ModelManager.PlotModel.CheckCanPlayNow(e))
		) {
			ControllerHolder_1.ControllerHolder.PlotController.OnStartPlotNetwork(e);
			const o = FlowData_1.FlowContext.Create();
			o.Init(
				e.IsServerNotify,
				e.FlowListName,
				e.FlowIncId,
				e.FlowId,
				e.StateId,
				ModelManager_1.ModelManager.AutoRunModel.IsInLogicTreeGmMode() ||
					ModelManager_1.ModelManager.PlotModel.IsMuteAllPlot ||
					e.IsBackground,
				e.IsBreakdown,
				e.Context,
				e.IsAsync,
				e.UiParam,
				e.Pos,
			),
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug(
						"Plot",
						27,
						"剧情行为组开始",
						["id", o.FormatId],
						["num", e.StateActions.length],
					),
				ControllerHolder_1.ControllerHolder.FlowController.ExecuteActions(
					e.StateActions,
					o,
					() => {
						ControllerHolder_1.ControllerHolder.PlotController.OnEndPlotNetwork(),
							Log_1.Log.CheckInfo() &&
								Log_1.Log.Info(
									"Plot",
									27,
									"EndFlow",
									["incId", o.FlowIncId],
									["id", o.FormatId],
									["IsSkip", o.IsBackground],
								),
							o.Recycle(),
							this.StartPlotNetworkPending();
					},
				),
				e.Recycle();
		}
	}
}
(exports.FlowLaunchCenter = FlowLaunchCenter).hXi = -1;
