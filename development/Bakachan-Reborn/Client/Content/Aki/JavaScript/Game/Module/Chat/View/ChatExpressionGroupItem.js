"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ChatExpressionGroupItem = void 0);
const UE = require("ue"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class ChatExpressionGroupItem extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(),
			(this.Q9e = 0),
			(this.x$e = void 0),
			(this.YMt = (e) => {
				1 === e && this.x$e && this.x$e(this.Q9e);
			}),
			this.CreateThenShowByActor(e);
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UITexture],
			[1, UE.UIExtendToggle],
		]),
			(this.BtnBindInfo = [[1, this.YMt]]);
	}
	Refresh(e) {
		(this.Q9e = e.Id), (e = e.GroupTexturePath);
		const t = this.GetTexture(0);
		t.SetUIActive(!1),
			this.SetTextureByPath(e, t, void 0, () => {
				t.SetUIActive(!0);
			});
	}
	SetState(e, t = !1) {
		this.GetExtendToggle(1).SetToggleState(e, t);
	}
	BindOnClicked(e) {
		this.x$e = e;
	}
}
exports.ChatExpressionGroupItem = ChatExpressionGroupItem;
