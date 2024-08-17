"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.HelpGuidePage = void 0);
const UE = require("ue"),
	StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
class HelpGuidePage extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments), (this.EPe = void 0);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIText],
			[2, UE.UIText],
			[3, UE.UITexture],
		];
	}
	OnStart() {
		(this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(
			this.GetRootItem(),
		)),
			this.GetTexture(3).SetUIActive(!1),
			this.GetText(2).SetUIActive(!1),
			this.GetItem(0).SetUIActive(!1);
	}
	OnBeforeDestroy() {
		this.EPe.Clear(), (this.EPe = void 0);
	}
	RefreshPage(e) {
		var t;
		e &&
			((t = !StringUtils_1.StringUtils.IsEmpty(e.Picture)),
			this.GetTexture(3).SetUIActive(t),
			t &&
				this.SetTextureByPath(e.Picture, this.GetTexture(3), void 0, () => {
					this.GetTexture(3).SetUIActive(!0);
				}),
			(t = !StringUtils_1.StringUtils.IsEmpty(e.Content)),
			this.GetText(2).SetUIActive(t),
			t) &&
			this.GetText(2).ShowTextNew(e.Content);
	}
	PlayAnime(e) {
		this.EPe.PlayLevelSequenceByName(e ? "Show" : "Hide");
	}
}
exports.HelpGuidePage = HelpGuidePage;
