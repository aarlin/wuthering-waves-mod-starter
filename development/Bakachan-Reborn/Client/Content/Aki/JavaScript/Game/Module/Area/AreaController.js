"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AreaController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	Net_1 = require("../../../Core/Net/Net"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	UnopenedAreaController_1 = require("../../LevelGamePlay/UnopenedArea/UnopenedAreaController"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
	AreaAtmosphere_1 = require("./AreaAtmosphere"),
	AreaAudio_1 = require("./AreaAudio");
class AreaController extends UiControllerBase_1.UiControllerBase {
	static OnInit() {
		return (
			AreaController.cje ||
				((AreaController.cje = new AreaAudio_1.AreaAudio()),
				AreaController.cje.Init()),
			AreaController.mje ||
				(AreaController.mje = new AreaAtmosphere_1.AreaAtmosphere()),
			this.RegisterNetEvent(),
			this.RegisterEvents(),
			!0
		);
	}
	static OnClear() {
		return (
			AreaController.cje && AreaController.cje.Destroy(),
			AreaController.mje && AreaController.mje.Destroy(),
			this.UnRegisterNetEvent(),
			this.UnRegisterEvents(),
			!0
		);
	}
	static OnTick(e) {
		AreaController.mje && AreaController.mje.OnTick(e);
	}
	static RegisterNetEvent() {
		Net_1.Net.Register(28768, this.dje);
	}
	static UnRegisterNetEvent() {
		Net_1.Net.UnRegister(28768);
	}
	static RegisterEvents() {
		EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.InitArea, this.Cje);
	}
	static UnRegisterEvents() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.InitArea,
			this.Cje,
		);
	}
	static BeginOverlap(e, r = !1) {
		if (e === this.gje())
			(ModelManager_1.ModelManager.AreaModel.AreaInfo &&
				ModelManager_1.ModelManager.AreaModel.AreaInfo.AreaId === e) ||
				ModelManager_1.ModelManager.AreaModel.SetAreaInfo(e),
				r
					? ModelManager_1.ModelManager.AreaModel.SetAreaName(e, !0)
					: EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ChangeArea);
		else {
			r = Protocol_1.Aki.Protocol.tWn.create({ Ekn: e });
			const o = this.gje();
			Net_1.Net.Call(19485, r, (e) => {
				e &&
					(e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys
						? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
								e.lkn,
								11769,
							)
						: ModelManager_1.ModelManager.AreaModel.AreaInfo?.AreaId !==
								e.Ekn &&
							(Log_1.Log.CheckInfo() &&
								Log_1.Log.Info(
									"Area",
									7,
									"[AreaController.BeginOverlap] 进入区域",
									["CurArea", o],
									["EnterArea", e.Ekn],
								),
							ModelManager_1.ModelManager.AreaModel.SetAreaName(e.Ekn)));
			});
		}
	}
	static EndOverlap(e) {
		if (0 !== e && 1 !== e) {
			const o = ConfigManager_1.ConfigManager.AreaConfig.GetParentAreaId(
				this.gje(),
			);
			var r;
			1 !== o &&
				o !== this.gje() &&
				((r = Protocol_1.Aki.Protocol.tWn.create({ Ekn: o })),
				Net_1.Net.Call(19485, r, (r) => {
					r &&
						(r.lkn !== Protocol_1.Aki.Protocol.lkn.Sys
							? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
									r.lkn,
									11769,
								)
							: (ModelManager_1.ModelManager.AreaModel.SetAreaInfo(o),
								EventSystem_1.EventSystem.Emit(
									EventDefine_1.EEventName.ChangeArea,
								),
								Log_1.Log.CheckInfo() &&
									Log_1.Log.Info(
										"Area",
										7,
										"[AreaController.EndOverlap] 离开区域",
										["LeaveArea", e],
										["EnterArea", o],
									)));
				}));
		}
	}
	static RequestChangeAreaState(e, r) {}
	static gje() {
		return ModelManager_1.ModelManager.PlayerInfoModel.GetNumberPropById(6);
	}
}
((exports.AreaController = AreaController).Cje = (e) => {
	ModelManager_1.ModelManager.AreaModel.InitAreaStates(e),
		UnopenedAreaController_1.UnopenedAreaController.AreaCheckInit(e);
}),
	(AreaController.dje = (e) => {
		e ||
			(Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn(
					"Area",
					7,
					"[AreaController.AreaStatesChangeNotify] Notify Info Error",
				)),
			ModelManager_1.ModelManager.AreaModel.ToggleAreaState(
				e.uys.wFn,
				e.uys.ckn,
			),
			UnopenedAreaController_1.UnopenedAreaController.AreaCheckStatesChange(e);
	});
