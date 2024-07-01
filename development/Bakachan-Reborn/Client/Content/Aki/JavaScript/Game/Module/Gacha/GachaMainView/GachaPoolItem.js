"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GachaPoolItem = void 0);
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
class GachaPoolItem extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(),
			(this.GachaPoolData = void 0),
			(this.GachaViewInfo = void 0),
			(this.GachaType = void 0),
			(this.LevelSequencePlayer = void 0),
			(this.GachaType = e);
	}
	OnStart() {
		this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(
			this.GetRootItem(),
		);
	}
	async PlayStartSeqAsync() {
		await this.LevelSequencePlayer?.PlaySequenceAsync(
			"Start",
			new CustomPromise_1.CustomPromise(),
			!0,
		);
	}
	PlaySwitchSeq() {
		"Switch" === this.LevelSequencePlayer.GetCurrentSequence()
			? this.LevelSequencePlayer.ReplaySequenceByKey("Switch")
			: this.LevelSequencePlayer.PlayLevelSequenceByName("Switch");
	}
	async PlaySwitchSeqAsync() {
		await this.LevelSequencePlayer?.PlaySequenceAsync(
			"Switch",
			new CustomPromise_1.CustomPromise(),
		);
	}
	Update(e) {
		(this.GachaPoolData = e),
			this.GachaPoolData &&
				((e = this.GachaPoolData.PoolInfo.Id),
				(this.GachaViewInfo =
					ConfigManager_1.ConfigManager.GachaConfig.GetGachaViewInfo(e)),
				this.Refresh());
	}
	Refresh() {}
}
exports.GachaPoolItem = GachaPoolItem;
