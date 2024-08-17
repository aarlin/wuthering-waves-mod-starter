"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ShopButton = void 0);
const UE = require("ue"),
	CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
	LocalStorage_1 = require("../../../Common/LocalStorage"),
	LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine"),
	RedDotController_1 = require("../../../RedDot/RedDotController"),
	ShopController_1 = require("../../Shop/ShopController"),
	BattleChildView_1 = require("./BattleChildView/BattleChildView");
class ShopButton extends BattleChildView_1.BattleChildView {
	constructor() {
		super(...arguments),
			(this.Dct = () => {
				var e =
					CommonParamById_1.configCommonParamById.GetIntConfig(
						"BattleViewShopId",
					);
				void 0 !== e &&
					(ShopController_1.ShopController.OpenShop(e),
					LocalStorage_1.LocalStorage.SetPlayer(
						LocalStorageDefine_1.ELocalStoragePlayerKey.FirstOpenShop,
						!1,
					));
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIButtonComponent],
			[1, UE.UIItem],
		]),
			(this.BtnBindInfo = [[0, this.Dct]]);
	}
	Initialize(e) {
		super.Initialize(e),
			RedDotController_1.RedDotController.BindRedDot(
				"BattleViewShopButton",
				this.GetItem(1),
			);
	}
	Reset() {
		RedDotController_1.RedDotController.UnBindRedDot("BattleViewShopButton"),
			super.Reset();
	}
}
exports.ShopButton = ShopButton;
