"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ChatExpressionItem = void 0);
const UE = require("ue"),
	GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class ChatExpressionItem extends GridProxyAbstract_1.GridProxyAbstract {
	constructor() {
		super(...arguments),
			(this.C8e = 0),
			(this.x$e = void 0),
			(this.K9e = () => {
				this.x$e && this.x$e(this.C8e);
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIButtonComponent],
			[1, UE.UIText],
			[2, UE.UITexture],
		]),
			(this.BtnBindInfo = [[0, this.K9e]]);
	}
	Refresh(e, t, s) {
		this.C8e = e.Id;
		var i = e.ExpressionTexturePath;
		const r = this.GetTexture(2);
		r.SetUIActive(!1),
			this.SetTextureByPath(i, r, void 0, () => {
				r.SetUIActive(!0);
			}),
			(i = e.Name),
			this.GetText(1).ShowTextNew(i);
	}
	BindOnClicked(e) {
		this.x$e = e;
	}
}
exports.ChatExpressionItem = ChatExpressionItem;
