"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PingView = void 0);
const UE = require("ue"),
	NetworkDefine_1 = require("../../../Launcher/NetworkDefine"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	UiViewBase_1 = require("../../Ui/Base/UiViewBase"),
	LguiUtil_1 = require("../Util/LguiUtil"),
	GOODPING = 100,
	MIDDLEPING = 200,
	LOOPPING = 500,
	BADCOLOR = "FF1F1EFF",
	MIDDLECOLOR = "FFD12FFF",
	GOODCOLOR = "30D82DFF";
class PingView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.NWt = ""),
			(this.OWt = !1),
			(this.kWt = -9999),
			(this.FWt = 0),
			(this.VWt = (e) => {
				var t;
				Math.abs(e - this.kWt) < this.FWt ||
					((t = (this.kWt = e) > 500) !== this.OWt &&
						(this.GetSprite(0).SetUIActive(!t),
						this.GetItem(1).SetUIActive(t),
						this.HWt(t),
						(this.OWt = t)),
					(t = this.jWt(e)),
					this.NWt !== t[0] &&
						(this.SetSpriteByPath(t[0], this.GetSprite(0), !1),
						(this.NWt = t[0]),
						this.GetText(2).SetColor(UE.Color.FromHex(t[1]))),
					LguiUtil_1.LguiUtil.SetLocalText(
						this.GetText(2),
						"PingStr",
						e.toString(),
					));
			});
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UISprite],
			[1, UE.UIItem],
			[2, UE.UIText],
		];
	}
	OnStart() {
		this.GetItem(1).SetUIActive(!1),
			(this.OWt = !1),
			(this.FWt =
				ConfigManager_1.ConfigManager.CommonConfig.GetPingUnChangeValue());
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnCheckGamePing,
			this.VWt,
		);
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnCheckGamePing,
			this.VWt,
		);
	}
	OnAfterShow() {
		this.VWt(ModelManager_1.ModelManager.GamePingModel.CurrentPing);
	}
	HWt(e) {
		e
			? this.UiViewSequence.PlaySequencePurely("Loop")
			: this.UiViewSequence.StopSequenceByKey("Loop");
	}
	jWt(e) {
		return e <= 100
			? [this.WWt(), GOODCOLOR]
			: e > 100 && e <= 200
				? [this.KWt(), "FFD12FFF"]
				: [this.QWt(), BADCOLOR];
	}
	WWt() {
		return 3 !== ModelManager_1.ModelManager.PlatformModel.PlatformType &&
			UE.KuroLauncherLibrary.GetNetworkConnectionType() ===
				NetworkDefine_1.ENetworkType.WiFi
			? ConfigManager_1.ConfigManager.CommonConfig.GetNetGoodSpriteMobile()
			: ConfigManager_1.ConfigManager.CommonConfig.GetNetGoodSprite();
	}
	KWt() {
		return 3 !== ModelManager_1.ModelManager.PlatformModel.PlatformType &&
			UE.KuroLauncherLibrary.GetNetworkConnectionType() ===
				NetworkDefine_1.ENetworkType.WiFi
			? ConfigManager_1.ConfigManager.CommonConfig.GetNetMiddleSpriteMobile()
			: ConfigManager_1.ConfigManager.CommonConfig.GetNetMiddleSprite();
	}
	QWt() {
		return 3 !== ModelManager_1.ModelManager.PlatformModel.PlatformType &&
			UE.KuroLauncherLibrary.GetNetworkConnectionType() ===
				NetworkDefine_1.ENetworkType.WiFi
			? ConfigManager_1.ConfigManager.CommonConfig.GetNetBadSpriteMobile()
			: ConfigManager_1.ConfigManager.CommonConfig.GetNetBadSprite();
	}
}
exports.PingView = PingView;
