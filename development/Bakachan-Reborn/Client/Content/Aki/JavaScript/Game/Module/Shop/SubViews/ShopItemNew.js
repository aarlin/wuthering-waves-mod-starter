"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ShopItemNew = void 0);
const UE = require("ue"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
	LguiUtil_1 = require("../../Util/LguiUtil");
class ShopItemNew extends GridProxyAbstract_1.GridProxyAbstract {
	constructor() {
		super(...arguments),
			(this.ItemInfo = void 0),
			(this.j7e = () => {
				(ModelManager_1.ModelManager.ShopModel.OpenItemInfo = this.ItemInfo),
					EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OpenItemInfo);
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UISprite],
			[1, UE.UITexture],
			[2, UE.UIText],
			[3, UE.UIItem],
			[4, UE.UIExtendToggle],
			[10, UE.UISprite],
			[11, UE.UISprite],
		]),
			(this.BtnBindInfo = [[4, this.j7e]]);
	}
	UpdateItem(e) {
		e &&
			(this.RootItem.SetAsLastHierarchy(),
			(this.ItemInfo = e),
			this.SetItemQualityIcon(this.GetSprite(0), this.ItemInfo.ItemId),
			this.SetItemIcon(this.GetTexture(1), this.ItemInfo.ItemId),
			(e = this.ItemInfo.ItemInfo),
			LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), e.Name),
			this.GetSprite(10).SetUIActive(this.ItemInfo.IsSoldOut()),
			this.GetSprite(11).SetUIActive(this.ItemInfo.IsLocked));
	}
	OnSelected(e) {
		e && this.j7e();
	}
	Refresh(e, t, i) {
		this.UpdateItem(e);
	}
}
exports.ShopItemNew = ShopItemNew;
