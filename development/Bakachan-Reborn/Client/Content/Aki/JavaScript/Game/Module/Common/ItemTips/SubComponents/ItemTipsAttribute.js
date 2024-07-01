"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TipsAttributeItem = void 0);
const UE = require("ue"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class TipsAttributeItem extends UiPanelBase_1.UiPanelBase {
	constructor(e, t) {
		super(), (this.Pe = t), this.CreateThenShowByActor(e.GetOwner());
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UISprite],
			[1, UE.UITexture],
			[2, UE.UIText],
			[3, UE.UIText],
		];
	}
	OnStart() {
		(this.GetSprite(0).useChangeColor = !this.Pe.IsMainAttribute),
			this.SetTextureByPath(this.Pe.IconPath, this.GetTexture(1)),
			this.GetText(2).ShowTextNew(this.Pe.Name),
			this.GetText(3).SetText(
				ModelManager_1.ModelManager.AttributeModel.GetFormatAttributeValueString(
					this.Pe.Id,
					this.Pe.Value,
					this.Pe.IsRatio,
				),
			);
	}
	OnBeforeDestroy() {
		this.Pe = void 0;
	}
}
exports.TipsAttributeItem = TipsAttributeItem;
