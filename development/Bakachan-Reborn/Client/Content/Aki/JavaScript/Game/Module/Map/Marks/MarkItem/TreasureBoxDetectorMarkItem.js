"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TreasureBoxDetectorMarkItem = void 0);
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	TreasureBoxDetectorMarkItemView_1 = require("../MarkItemView/TreasureBoxDetectorMarkItemView"),
	ServerMarkItem_1 = require("./ServerMarkItem");
class TreasureBoxDetectorMarkItem extends ServerMarkItem_1.ServerMarkItem {
	constructor(e, r, t, a) {
		super(e, r, t, a), (this.TeleportId = 0), (this.NLi = !1);
	}
	get MarkType() {
		return 17;
	}
	get IsNewCustomMarkItem() {
		return this.NLi;
	}
	Initialize() {
		super.Initialize();
		var e = this.ServerMarkInfo;
		this.SetTrackData(e.TrackTarget),
			this.SetConfigId(this.ConfigId),
			this.UpdateTrackState();
	}
	OnCreateView() {
		this.InnerView =
			new TreasureBoxDetectorMarkItemView_1.TreasureBoxDetectorMarkItemView(
				this,
			);
	}
	SetConfigId(e) {
		(this.ServerMarkInfo.MarkConfigId = e), this.OnSetConfigId(e);
	}
	OnSetConfigId(e) {
		(e =
			ConfigManager_1.ConfigManager.MapConfig.GetTreasureBoxDetectorMarkConfig(
				e,
			)),
			this.OnAfterSetConfigId(e);
	}
	SetIsNew(e) {
		this.NLi = e;
	}
	GetTitleText() {
		var e =
			ConfigManager_1.ConfigManager.MapConfig.GetTreasureBoxDetectorMarkConfig(
				this.ConfigId,
			);
		return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.MarkTitle);
	}
	GetDescText() {
		var e =
			ConfigManager_1.ConfigManager.MapConfig.GetTreasureBoxDetectorMarkConfig(
				this.ConfigId,
			);
		return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.MarkDesc);
	}
}
exports.TreasureBoxDetectorMarkItem = TreasureBoxDetectorMarkItem;
