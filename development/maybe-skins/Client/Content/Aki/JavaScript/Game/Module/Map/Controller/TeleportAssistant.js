"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TeleportAssistant = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
	Net_1 = require("../../../../Core/Net/Net"),
	StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	ControllerAssistantBase_1 = require("../../GeneralLogicTree/ControllerAssistant/ControllerAssistantBase"),
	LevelLoadingController_1 = require("../../LevelLoading/LevelLoadingController"),
	ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
	WorldMapController_1 = require("../../WorldMap/WorldMapController"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
	GM_UNLOCK_ALL_TELEPORT = "activateteleport 0";
class TeleportAssistant extends ControllerAssistantBase_1.ControllerAssistantBase {
	constructor() {
		super(...arguments),
			(this._Li = void 0),
			(this.uLi = ""),
			(this.cLi = 0),
			(this.mLi = !1),
			(this.xK = !1),
			(this.dLi = (e) => {
				ModelManager_1.ModelManager.MapModel.UnlockTeleports(e.j4n),
					(ModelManager_1.ModelManager.GameModeModel.IsMulti &&
						ModelManager_1.ModelManager.PlayerInfoModel.GetId() !==
							ModelManager_1.ModelManager.CreatureModel.GetWorldOwner()) ||
						this.CLi(e.j4n);
			}),
			(this.gLi = () => {
				LevelLoadingController_1.LevelLoadingController.CloseLoading(
					0,
					() => {
						EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.BlackScreenFadeOnPlotToWorldMap,
						);
					},
					1,
				);
			}),
			(this.YHe = (e) => {
				e.FlowListName === this.uLi &&
					e.FlowId === this.cLi &&
					((this.xK = !1),
					1 === this._Li.Type
						? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
								"TeleporterUnlockBig",
							)
						: ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
								"TeleporterUnlock",
							),
					Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug("Plot", 39, "Close PlotView And Open WorldMapView"),
					(e = { MarkType: 0, MarkId: 0, OpenAreaId: this._Li.FogId }),
					EventSystem_1.EventSystem.Once(
						EventDefine_1.EEventName.WorldMapViewOpened,
						this.gLi,
					),
					WorldMapController_1.WorldMapController.OpenView(2, !1, e),
					(this.uLi = void 0),
					(this.cLi = void 0));
			}),
			(this.fLi = (e) => {
				"activateteleport 0" === e.toLowerCase() && (this.mLi = !0);
			});
	}
	OnDestroy() {
		(this._Li = void 0),
			(this.uLi = void 0),
			(this.cLi = void 0),
			(this.mLi = void 0),
			(this.xK = void 0);
	}
	OnRegisterNetEvent() {
		Net_1.Net.Register(29743, this.dLi);
	}
	OnUnRegisterNetEvent() {
		Net_1.Net.UnRegister(29743);
	}
	OnAddEvents() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.PlotNetworkEnd,
			this.YHe,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnExecuteServerGm,
				this.fLi,
			);
	}
	OnRemoveEvents() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.PlotNetworkEnd,
			this.YHe,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnExecuteServerGm,
				this.fLi,
			);
	}
	CLi(e) {
		var o;
		this.mLi ||
			this.xK ||
			(e &&
				0 !== e.length &&
				(e = ConfigManager_1.ConfigManager.MapConfig.GetTeleportConfigById(
					e[0],
				)) &&
				!StringUtils_1.StringUtils.IsEmpty(e.Plot) &&
				2 < (o = e.Plot.split(",")).length &&
				((this.uLi = o[0]),
				(this.cLi = Number(o[1])),
				(o = Number(o[2])),
				(this._Li = e),
				(this.xK = !0),
				ControllerHolder_1.ControllerHolder.FlowController.StartFlow(
					this.uLi,
					this.cLi,
					o,
				)));
	}
	async RequestTeleportData() {
		var e = Protocol_1.Aki.Protocol._us.create();
		(e = await Net_1.Net.CallAsync(2779, e)) &&
			(e.X5n !== Protocol_1.Aki.Protocol.lkn.Sys
				? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
						e.X5n,
						2541,
					)
				: ModelManager_1.ModelManager.MapModel.UnlockTeleports(e.j4n, !0));
	}
	RequestUnlockTeleport(e) {
		var o = Protocol_1.Aki.Protocol.mus.create({ Ekn: e });
		Net_1.Net.Call(20281, o, (o) => {
			o.lkn !== Protocol_1.Aki.Protocol.lkn.Sys
				? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
						o.lkn,
						25541,
					)
				: ModelManager_1.ModelManager.MapModel.UnlockTeleport(e);
		});
	}
}
exports.TeleportAssistant = TeleportAssistant;
