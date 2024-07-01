"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ChangeActionTipsView = void 0);
const UE = require("ue"),
	UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
	ChangeActionRowView_1 = require("./ChangeActionRowView");
class ChangeActionTipsView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.Xqt = void 0),
			(this.uAi = void 0),
			(this.cAi = void 0),
			(this.mAi = void 0),
			(this.dAi = !1),
			(this.CAi = () => {
				this.Xqt && this.Xqt(this.dAi), this.CloseMe();
			}),
			(this.gAi = () => {
				this.CloseMe();
			}),
			(this.fAi = (i, e) => {
				this.cAi.SetSelected(this.cAi.IsRevert === e),
					this.mAi.SetSelected(this.mAi.IsRevert === e),
					(this.dAi = e);
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIButtonComponent],
			[1, UE.UIButtonComponent],
			[2, UE.UIItem],
			[3, UE.UIItem],
		]),
			(this.BtnBindInfo = [
				[0, this.CAi],
				[1, this.gAi],
			]);
	}
	async OnBeforeStartAsync() {
		(this.cAi = new ChangeActionRowView_1.ChangeActionRowView()),
			(this.mAi = new ChangeActionRowView_1.ChangeActionRowView()),
			this.cAi.BindOnSelected(this.fAi),
			this.mAi.BindOnSelected(this.fAi);
		var i = this.cAi.CreateByActorAsync(this.GetItem(2).GetOwner()),
			e = this.mAi.CreateByActorAsync(this.GetItem(3).GetOwner());
		await Promise.all([i, e]);
	}
	OnStart() {
		var i = this.OpenParam,
			e = i.InputControllerType;
		(this.Xqt = i.OnConfirmCallback),
			(this.uAi = i.KeySettingRowData),
			this.cAi?.Refresh(this.uAi, e, !1),
			this.mAi?.Refresh(this.uAi, e, !0),
			this.cAi?.SetSelected(!0),
			this.cAi?.SetActive(!0),
			this.mAi?.SetActive(!0);
	}
	OnBeforeDestroy() {
		(this.cAi = void 0), (this.mAi = void 0), (this.Xqt = void 0);
	}
}
exports.ChangeActionTipsView = ChangeActionTipsView;
