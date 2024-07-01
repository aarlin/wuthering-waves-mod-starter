"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GuideTutorialPagePanel = void 0);
const UE = require("ue"),
	StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	GuideDescribeNew_1 = require("./GuideDescribeNew");
class GuideTutorialPagePanel extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(), (this.pzt = void 0), (this.EPe = void 0);
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
		(this.pzt = new GuideDescribeNew_1.GuideDescribeNew(this.GetText(2))),
			(this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(
				this.GetRootItem(),
			)),
			this.GetTexture(3).SetUIActive(!1);
	}
	OnBeforeDestroy() {
		this.EPe.Clear(), (this.EPe = void 0);
	}
	Init(e) {
		this.SetRootActor(e.GetOwner(), !0),
			(this.pzt = new GuideDescribeNew_1.GuideDescribeNew(this.GetText(2)));
	}
	RefreshPage(e) {
		e &&
			(StringUtils_1.StringUtils.IsEmpty(e.SubTitle)
				? this.GetItem(0).SetUIActive(!1)
				: (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.SubTitle),
					this.GetItem(0).SetUIActive(!0)),
			StringUtils_1.StringUtils.IsEmpty(e.Pic) ||
				this.SetTextureByPath(e.Pic, this.GetTexture(3), void 0, () => {
					this.GetTexture(3).SetUIActive(!0);
				}),
			this.GetText(2).SetUIActive(!0),
			this.pzt.SetUpText(e.Content, ...e.Button));
	}
	PlayAnime(e) {
		this.EPe.PlayLevelSequenceByName(e ? "Show" : "Hide");
	}
}
exports.GuideTutorialPagePanel = GuideTutorialPagePanel;
