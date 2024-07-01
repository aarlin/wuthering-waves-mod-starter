"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AdviceAllViewShowContent = void 0);
const UE = require("ue"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class AdviceAllViewShowContent extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(),
			(this.hke = () => {
				1 === ModelManager_1.ModelManager.AdviceModel.CurrentLineModel
					? (this.GetText(8).SetUIActive(!0),
						this.GetText(8).SetText(
							ModelManager_1.ModelManager.AdviceModel.GetSecondLineText(),
						))
					: this.GetText(8).SetUIActive(!1);
				var e = ModelManager_1.ModelManager.AdviceModel.GetFirstLineText();
				this.GetText(4).SetText(e);
			}),
			(this.P9e = () => {
				var e = ModelManager_1.ModelManager.AdviceModel.CurrentExpressionId;
				0 < e
					? (this.GetTexture(1).SetUIActive(!0),
						(e =
							ConfigManager_1.ConfigManager.ChatConfig.GetExpressionConfig(e)),
						this.SetTextureByPath(e.ExpressionTexturePath, this.GetTexture(1)))
					: this.GetTexture(1).SetUIActive(!1);
			}),
			this.CreateThenShowByActor(e.GetOwner());
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UITexture],
			[2, UE.UIText],
			[3, UE.UIVerticalLayout],
			[4, UE.UIText],
			[5, UE.UIText],
			[6, UE.UIExtendToggle],
			[7, UE.UIExtendToggle],
			[8, UE.UIText],
		];
	}
	OnStart() {
		this.GetExtendToggle(6).RootUIComp.SetUIActive(!1),
			this.GetExtendToggle(7).RootUIComp.SetUIActive(!1),
			this.GetText(5).SetUIActive(!1),
			this.GetText(8).SetUIActive(!1),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnSelectAdviceExpression,
				this.P9e,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnSelectAdviceWord,
				this.hke,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnChangeAdviceWord,
				this.hke,
			),
			this.x9e(),
			this.P9e(),
			this.hke();
	}
	x9e() {
		var e = ModelManager_1.ModelManager.FunctionModel.GetPlayerName();
		this.GetText(2).SetText(e);
	}
	RefreshView() {
		this.hke();
	}
	OnBeforeDestroy() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnSelectAdviceExpression,
			this.P9e,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnSelectAdviceWord,
				this.hke,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnChangeAdviceWord,
				this.hke,
			);
	}
}
exports.AdviceAllViewShowContent = AdviceAllViewShowContent;
