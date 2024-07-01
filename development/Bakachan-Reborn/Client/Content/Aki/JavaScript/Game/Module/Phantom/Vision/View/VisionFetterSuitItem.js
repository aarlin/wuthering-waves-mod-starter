"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.VisionFetterSuitItem = void 0);
const UE = require("ue"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
class VisionFetterSuitItem extends GridProxyAbstract_1.GridProxyAbstract {
	constructor(t) {
		super(),
			(this.wqe = void 0),
			(this.Pe = void 0),
			(this.OnItemClick = void 0),
			(this.wqe = t);
	}
	async Init() {
		await this.CreateByActorAsync(this.wqe.GetOwner());
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UISprite],
			[1, UE.UITexture],
		]),
			this.OnItemClick &&
				(this.ComponentRegisterInfos.push([2, UE.UIButtonComponent]),
				(this.BtnBindInfo = [
					[
						2,
						() => {
							this.OnItemClick?.(this.Pe.Id);
						},
					],
				]));
	}
	Update(t) {
		this.Pe = t;
		let e = "",
			i = "";
		(i = t
			? ((e = t.FetterElementColor), t.FetterElementPath)
			: ((e =
					ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionFetterDefaultColor()),
				ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionFetterDefaultTexture())),
			(t = UE.Color.FromHex(e)),
			this.GetSprite(0).SetColor(t),
			this.SetTextureByPath(i, this.GetTexture(1));
	}
	Refresh(t, e, i) {
		this.Update(t);
	}
}
exports.VisionFetterSuitItem = VisionFetterSuitItem;
