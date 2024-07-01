"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FlowActionSetPlotMode = void 0);
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
	Log_1 = require("../../../../Core/Common/Log"),
	Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	Global_1 = require("../../../Global"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiManager_1 = require("../../../Ui/UiManager"),
	LevelLoadingController_1 = require("../../LevelLoading/LevelLoadingController"),
	FlowNetworks_1 = require("../Flow/FlowNetworks"),
	PlotController_1 = require("../PlotController"),
	FlowActionBase_1 = require("./FlowActionBase"),
	GUARANTEED_WAIT_TIME = 3e3,
	DEFAULT_FADE_DURATION = 0.5,
	SAFE_DISTANCE_SQAURED = 3e3;
class FlowActionSetPlotMode extends FlowActionBase_1.FlowActionBase {
	constructor() {
		super(...arguments),
			(this.zXi = !1),
			(this.ZXi = void 0),
			(this.e$i = -1),
			(this.t$i = 0),
			(this.i$i = void 0),
			(this.S4s = void 0),
			(this.o$i = (e) => {
				ModelManager_1.ModelManager.InteractionModel.IsInteractionTurning &&
				this.t$i < 3e3
					? (this.t$i += e)
					: (Log_1.Log.CheckDebug() &&
							Log_1.Log.Debug("Plot", 27, "C级剧情等待交互转身-结束", [
								"waitTime",
								this.t$i,
							]),
						ControllerHolder_1.ControllerHolder.PlotController.RemoveTick(
							this.e$i,
						),
						(this.t$i = 0),
						(this.e$i = -1),
						this.ZXi.SetResult(),
						(this.ZXi = void 0));
			}),
			(this.uht = () => {
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("Plot", 27, "剧情前保底传送 -结束");
				var e = this.S4s;
				(this.S4s = void 0), e.SetResult();
			});
	}
	OnExecute() {
		this.zXi = this.Context.HasAdjustCamera;
		var e = this.ActionInfo.Params;
		ModelManager_1.ModelManager.PlotModel.PlotConfig.SetMode(e),
			ModelManager_1.ModelManager.PlotModel.ApplyPlotConfig(this.zXi),
			(this.i$i = e.FastFadeIn),
			(this.Context.IsWaitRenderData = !e.NoUiEnterAnimation),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Plot",
					27,
					"SetPlotMode",
					["Level", e.Mode],
					["ChangeRole", e.IsSwitchMainRole],
					["DisableAutoFadeOut", e.DisableAutoFadeOut],
				),
			this.Context?.UiParam?.ViewName &&
			!UiManager_1.UiManager.IsViewShow(this.Context.UiParam.ViewName)
				? (Log_1.Log.CheckWarn() &&
						Log_1.Log.Warn(
							"Plot",
							27,
							"剧情界面所依赖的界面未打开，本段剧情跳过",
							["ViewName", this.Context.UiParam.ViewName],
						),
					(this.Context.IsBackground = !0),
					this.FinishExecute(!0))
				: Promise.all([
						this.r$i(),
						this.n$i(),
						this.s$i(),
						this.a$i(),
						this.E4s(),
					]).finally(() => {
						this.FinishExecute(!0);
					});
	}
	async r$i() {
		ModelManager_1.ModelManager.PlotModel.PlotConfig.ShouldSwitchMainRole &&
			(await ModelManager_1.ModelManager.SceneTeamModel.LoadTeamPromise
				?.Promise);
	}
	async n$i() {
		const e = new CustomPromise_1.CustomPromise();
		PlotController_1.PlotController.OpenCurrentPlotView((o) => {
			o ||
				ControllerHolder_1.ControllerHolder.FlowController.LogError(
					"剧情打开界面失败",
				),
				e.SetResult();
		}, this.Context.UiParam),
			await e.Promise;
	}
	async a$i() {
		this.i$i &&
			((ModelManager_1.ModelManager.PlotModel.IsFadeIn = !0),
			await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(
				0,
				3,
				void 0 !== this.i$i?.Ease?.Duration ? this.i$i.Ease.Duration : 0.5,
				this.i$i.ScreenType,
			));
	}
	async s$i() {
		"LevelC" === ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel &&
			ModelManager_1.ModelManager.InteractionModel.IsInteractionTurning &&
			(Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("Plot", 27, "C级剧情等待交互转身-开始"),
			(this.ZXi = new CustomPromise_1.CustomPromise()),
			(this.t$i = 0),
			(this.e$i = ControllerHolder_1.ControllerHolder.PlotController.AddTick(
				this.o$i,
			)),
			await this.ZXi.Promise);
	}
	async E4s() {
		var e,
			o =
				Global_1.Global.BaseCharacter?.CharacterActorComponent
					?.ActorLocationProxy;
		this.Context?.Pos
			? ((e = Vector_1.Vector.Dist(o, this.Context.Pos)),
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"Plot",
						27,
						"剧情坐标检查",
						["dist", e],
						["cur", o],
						["target", this.Context.Pos],
					),
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("Plot", 27, "剧情前保底传送 -开始"),
				e > 3e3 &&
					((this.S4s = new CustomPromise_1.CustomPromise()),
					FlowNetworks_1.FlowNetworks.RequestSafeTeleport(
						this.Context.FlowIncId,
						(e) => {
							e
								? EventSystem_1.EventSystem.Once(
										EventDefine_1.EEventName.TeleportComplete,
										this.uht,
									)
								: this.S4s.SetResult();
						},
					),
					await this.S4s.Promise))
			: Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Plot", 27, "无剧情保底坐标点", ["curPos", o]);
	}
	OnInterruptExecute() {}
	OnBackgroundExecute() {
		var e = this.ActionInfo.Params;
		ModelManager_1.ModelManager.PlotModel.PlotConfig.SetMode(e),
			ModelManager_1.ModelManager.PlotModel.ApplyPlotConfig(this.zXi),
			(ModelManager_1.ModelManager.PlotModel.IsFadeIn =
				void 0 !== e.FastFadeIn),
			this.FinishExecute(!0);
	}
}
exports.FlowActionSetPlotMode = FlowActionSetPlotMode;
