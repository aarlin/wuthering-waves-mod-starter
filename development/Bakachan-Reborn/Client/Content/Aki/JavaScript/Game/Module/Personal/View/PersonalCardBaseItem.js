"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PersonalCardBaseItem = void 0);
const UE = require("ue"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class PersonalCardBaseItem extends UiPanelBase_1.UiPanelBase {
	constructor(e, t) {
		super(),
			(this.OnToggleCallBack = void 0),
			(this.kqe = () => {
				this.OnToggleCallBack && this.OnToggleCallBack(this.CardConfig);
			}),
			(this.CardConfig = t),
			this.CreateThenShowByActor(e.GetOwner());
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UITexture],
			[1, UE.UIItem],
			[2, UE.UIExtendToggle],
		]),
			(this.BtnBindInfo = [[2, this.kqe]]);
	}
	OnStart() {
		this.SetTextureByPath(this.CardConfig.CardPath, this.GetTexture(0)),
			this.GetItem(1).SetUIActive(!1);
	}
	SetToggleCallBack(e) {
		this.OnToggleCallBack = e;
	}
	SetToggleState(e) {
		this.GetExtendToggle(2).SetToggleState(e);
	}
	RefreshRedDot() {
		var e = ModelManager_1.ModelManager.PersonalModel.GetCardUnlockList(),
			t = e.length,
			a = this.GetItem(1);
		a.SetUIActive(!1);
		for (let s = 0; s < t; s++) {
			var r = e[s];
			if (r.CardId === this.CardConfig.Id && !r.IsRead) {
				a.SetUIActive(!0);
				break;
			}
		}
	}
	GetConfig() {
		return this.CardConfig;
	}
}
exports.PersonalCardBaseItem = PersonalCardBaseItem;
