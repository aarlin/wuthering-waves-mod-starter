"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MenuScrollSettingTitleItem = void 0);
const UE = require("ue"),
	LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
	MenuScrollSettingBaseItem_1 = require("./MenuScrollSettingBaseItem");
class MenuScrollSettingTitleItem extends MenuScrollSettingBaseItem_1.MenuScrollSettingBaseItem {
	constructor() {
		super(...arguments), (this.Pe = void 0), (this.Gft = void 0);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UISprite],
			[1, UE.UIText],
		];
	}
	OnStart() {
		void 0 === this.Gft &&
			(this.Gft = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem));
	}
	OnBeforeDestroy() {
		this.Gft && (this.Gft = void 0), this.Pe && (this.Pe = void 0);
	}
	Update(e) {
		(this.Pe = e), this.mGe();
	}
	mGe() {
		this.SetSpriteByPath(this.Pe.MenuDataSubImage, this.GetSprite(0), !1),
			this.GetText(1).ShowTextNew(this.Pe.MenuDataSubName ?? "");
	}
	PlaySequenceFromName(e) {
		this.Gft?.PlayLevelSequenceByName(e);
	}
	SetInteractionActive(e) {}
}
exports.MenuScrollSettingTitleItem = MenuScrollSettingTitleItem;
