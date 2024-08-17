"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UpRoleGachaPoolItem = void 0);
const UE = require("ue"),
	GachaPoolItem_1 = require("./GachaPoolItem"),
	RoleDescribeComponent_1 = require("./RoleDescribeComponent");
class UpRoleGachaPoolItem extends GachaPoolItem_1.GachaPoolItem {
	constructor() {
		super(...arguments), (this.mjt = void 0);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UITexture],
			[2, UE.UITexture],
			[1, UE.UIItem],
			[3, UE.UITexture],
		];
	}
	async OnBeforeStartAsync() {
		(this.mjt = new RoleDescribeComponent_1.RoleDescribeComponent()),
			await this.mjt.CreateThenShowByActorAsync(this.GetItem(1).GetOwner());
	}
	Refresh() {
		if (this.GachaViewInfo) {
			var e = this.GachaViewInfo.ShowIdList[0];
			this.mjt.Update(e, 6 !== this.GachaType);
			const t = this.GetTexture(0);
			this.SetTextureByPath(
				this.GachaViewInfo.ContentTexturePath,
				t,
				void 0,
				() => {
					t.SetSizeFromTexture();
				},
			),
				(e = UE.Color.FromHex(this.GachaViewInfo.ThemeColor)),
				this.GetTexture(3).SetColor(e);
			const o = this.GetTexture(2);
			this.SetTextureByPath(
				this.GachaViewInfo.ContentTextureBgPath,
				o,
				void 0,
				() => {
					o.SetSizeFromTexture();
				},
			);
		}
	}
}
exports.UpRoleGachaPoolItem = UpRoleGachaPoolItem;
