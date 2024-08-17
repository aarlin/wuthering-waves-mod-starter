"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AdviceItem = void 0);
const UE = require("ue"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine"),
	AdviceController_1 = require("../AdviceController"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class AdviceItem extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(),
			(this.S8e = void 0),
			(this.S7e = (e) => {
				e === this.S8e.GetAdviceId() && this.Og();
			}),
			(this.E7e = () => {
				var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(92);
				e.FunctionMap.set(2, () => {
					AdviceController_1.AdviceController.RequestDeleteAdvice(
						this.S8e.GetAdviceId(),
					);
				}),
					ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
						e,
					);
			}),
			this.CreateThenShowByActor(e.GetOwner());
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIButtonComponent],
			[1, UE.UIText],
			[2, UE.UIText],
			[3, UE.UIText],
			[4, UE.UITexture],
			[5, UE.UISprite],
		]),
			(this.BtnBindInfo = [[0, this.E7e]]);
	}
	OnStart() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnModifyAdviceSuccess,
			this.S7e,
		);
	}
	Update(e) {
		(this.S8e = e), this.Og();
	}
	Og() {
		this.hke(), this.v7e(), this.u7e(), this.y7e();
	}
	hke() {
		this.GetText(1).SetText(this.S8e.GetAdviceShowText());
	}
	v7e() {
		var e,
			t = 0 < this.S8e.GetAdviceExpressionId();
		t &&
			((e = ConfigManager_1.ConfigManager.ChatConfig.GetExpressionConfig(
				this.S8e.GetAdviceExpressionId(),
			)),
			this.SetTextureByPath(e.ExpressionTexturePath, this.GetTexture(4))),
			this.GetSprite(5).SetUIActive(!t),
			this.GetTexture(4).SetUIActive(t);
	}
	u7e() {
		var e = this.S8e.GetVote();
		this.GetText(2).SetText(e.toString());
	}
	y7e() {
		var e = this.S8e.GetAreaId();
		(e = ConfigManager_1.ConfigManager.AreaConfig.GetAreaInfo(e)),
			(e = ConfigManager_1.ConfigManager.AreaConfig.GetAreaLocalName(e.Title));
		this.GetText(3).SetText(e);
	}
	OnBeforeDestroy() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnModifyAdviceSuccess,
			this.S7e,
		);
	}
}
exports.AdviceItem = AdviceItem;
