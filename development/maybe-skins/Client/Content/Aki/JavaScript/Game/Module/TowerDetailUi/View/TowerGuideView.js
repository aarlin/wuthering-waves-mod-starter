"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TowerGuideView = void 0);
const UE = require("ue"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
	LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	TowerGuidePanel_1 = require("./TowerGuidePanel");
class TowerGuideView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.EPe = void 0),
			(this.ACt = () => {
				this.CloseMe(),
					this.EPe?.StopCurrentSequence(!1, !0),
					this.EPe?.PlayLevelSequenceByName("Close");
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UISprite],
			[1, UE.UIText],
			[2, UE.UIButtonComponent],
			[3, UE.UIItem],
			[4, UE.UIItem],
			[5, UE.UIHorizontalLayout],
			[6, UE.UIItem],
			[7, UE.UIButtonComponent],
			[8, UE.UIButtonComponent],
			[9, UE.UIItem],
			[10, UE.UIItem],
			[11, UE.UIItem],
			[12, UE.UIItem],
			[14, UE.UIItem],
		]),
			(this.BtnBindInfo = [[2, this.ACt]]);
	}
	OnStart() {
		this.GetItem(14).SetUIActive(!1),
			(this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
			this.GetItem(4)?.SetUIActive(!1),
			new TowerGuidePanel_1.TowerGuidePanel().CreateThenShowByActorAsync(
				this.GetItem(3).GetOwner(),
			),
			LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "TowerGuideTitle"),
			this.EPe?.StopCurrentSequence(!1, !0),
			this.EPe?.PlayLevelSequenceByName("StartAtOnce");
	}
	OnAfterDestroy() {
		EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnTowerGuideClose);
	}
}
exports.TowerGuideView = TowerGuideView;
