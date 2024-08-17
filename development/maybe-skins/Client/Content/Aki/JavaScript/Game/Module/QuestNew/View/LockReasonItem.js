"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LockReasonItem = void 0);
const UE = require("ue"),
	MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	UiManager_1 = require("../../../Ui/UiManager");
class LockReasonItem extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(),
			(this.cro = ""),
			(this.mro = ""),
			(this.Gct = BigInt(0)),
			(this.YP = () => {
				var e =
					ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(
						this.Gct,
					);
				e &&
					(EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.OnNavigationQuest,
						e.TreeConfigId,
					),
					UiManager_1.UiManager.CloseView("QuestLockPreview"));
			}),
			(this.cro = e.QuestName),
			(this.mro =
				ConfigManager_1.ConfigManager.QuestNewConfig.GetOccupationResourceName(
					e.ResourceName,
				)),
			(this.Gct = e.TreeIncId);
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIText],
			[2, UE.UIButtonComponent],
		]),
			(this.BtnBindInfo = [[2, this.YP]]);
	}
	OnStart() {
		this.UpdateItem();
	}
	UpdateItem() {
		this.GetText(0)?.SetText(this.cro);
		var e =
			MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Text_OccupiedRole") +
			":" +
			this.mro;
		this.GetText(1)?.SetText(e);
	}
}
exports.LockReasonItem = LockReasonItem;
