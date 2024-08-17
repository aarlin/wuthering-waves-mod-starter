"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.StarItem = void 0);
const UE = require("ue"),
	LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
	GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class StarItem extends GridProxyAbstract_1.GridProxyAbstract {
	constructor() {
		super(...arguments), (this.EPe = void 0);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
			[2, UE.UIItem],
			[3, UE.UINiagara],
			[4, UE.UIItem],
		];
	}
	OnStart() {
		(this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
			this.SetImgStarLoopItemActive(!1);
	}
	SetActive(e) {
		this.RootItem.SetUIActive(e);
	}
	Refresh(e, t, i) {
		this.SetImgStarOnActive(e.StarOnActive),
			this.SetImgStarOffActive(e.StarOffActive),
			this.SetImgStarNextActive(e.StarNextActive),
			this.SetImgStarLoopItemActive(e.StarLoopActive),
			e.PlayActivateSequence && this.PlayActiveSequence(),
			e.PlayLoopSequence && this.PlayAutoLoopSequence();
	}
	SetImgStarOnActive(e) {
		this.GetItem(0).SetUIActive(e);
	}
	SetImgStarOffActive(e) {
		this.GetItem(1).SetUIActive(e);
	}
	SetImgStarNextActive(e) {
		this.GetItem(2).SetUIActive(e);
	}
	SetImgStarLoopItemActive(e) {
		this.GetItem(4).SetUIActive(e);
	}
	PlayAutoLoopSequence() {
		this.EPe?.PlayLevelSequenceByName("AutoLoop");
	}
	PlayActiveSequence() {
		this.SetImgStarOnActive(!0),
			this.SetImgStarOffActive(!1),
			this.EPe?.PlayLevelSequenceByName("Active");
	}
}
exports.StarItem = StarItem;
