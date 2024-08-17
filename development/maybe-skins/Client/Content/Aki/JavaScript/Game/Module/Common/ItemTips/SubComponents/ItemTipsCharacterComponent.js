"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ItemTipsCharacterComponent = void 0);
const UE = require("ue"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	LguiUtil_1 = require("../../../Util/LguiUtil"),
	ItemTipsBaseSubComponent_1 = require("./ItemTipsBaseSubComponent");
class ItemTipsCharacterComponent extends ItemTipsBaseSubComponent_1.TipsBaseSubComponent {
	constructor(e) {
		super(e),
			(this.Pe = void 0),
			this.CreateThenShowByResourceIdAsync("UiItem_TipsRole", e);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UITexture],
			[2, UE.UIText],
			[3, UE.UIItem],
		];
	}
	OnStart() {
		this.GetItem(3).SetUIActive(!1);
	}
	OnBeforeDestroy() {
		this.Pe &&
			((this.Pe = void 0),
			ModelManager_1.ModelManager.ItemTipsModel.SetCurrentItemTipsData(void 0));
	}
	Refresh(e) {
		var t = () => {
			(this.Pe = e),
				ModelManager_1.ModelManager.ItemTipsModel.SetCurrentItemTipsData(e);
			var t = e.GetElementConfig(),
				o = this.GetTexture(1);
			this.SetElementIcon(t.Icon, o, t.Id),
				o.SetColor(UE.Color.FromHex(t.ElementColor)),
				LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), t.Name),
				LguiUtil_1.LguiUtil.SetLocalTextNew(
					this.GetText(2),
					e.GetRoleIntroduction(),
				);
		};
		this.InAsyncLoading() ? this.OperationMap.set("Refresh", t) : t();
	}
}
exports.ItemTipsCharacterComponent = ItemTipsCharacterComponent;
