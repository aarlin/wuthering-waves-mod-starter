"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UpWeaponGachaPoolItem = void 0);
const UE = require("ue"),
	Queue_1 = require("../../../../Core/Container/Queue"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	GachaPoolItem_1 = require("./GachaPoolItem"),
	WeaponDescribeComponent_1 = require("./WeaponDescribeComponent");
class UpWeaponGachaPoolItem extends GachaPoolItem_1.GachaPoolItem {
	constructor() {
		super(...arguments),
			(this.mjt = void 0),
			(this.djt = new Map()),
			(this.Cjt = void 0),
			(this.gjt = new Queue_1.Queue()),
			(this.pHt = !1);
	}
	get RHt() {
		return this.pHt;
	}
	UHt() {
		this.pHt = !0;
	}
	O0t() {
		var t;
		(this.pHt = !1), 0 !== this.gjt.Size && (t = this.gjt.Pop()) && this.fjt(t);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
			[2, UE.UITexture],
		];
	}
	async OnBeforeStartAsync() {
		(this.mjt = new WeaponDescribeComponent_1.WeaponDescribeComponent()),
			await this.mjt.CreateThenShowByActorAsync(this.GetItem(1).GetOwner());
	}
	Refresh() {
		var t;
		this.GachaViewInfo && ((t = this.GachaViewInfo.ShowIdList[0]), this.fjt(t));
	}
	fjt(t) {
		this.RHt
			? this.gjt.Push(t)
			: (this.UHt(),
				this.pjt(t).finally(() => {
					this.O0t();
				}));
	}
	async pjt(t) {
		var e, i;
		this.IsDestroyOrDestroying ||
			(this.mjt.Update(t),
			(t = UE.Color.FromHex(this.GachaViewInfo.ThemeColor)),
			this.GetTexture(2).SetColor(t),
			(t = this.GetItem(0)),
			(e = this.GachaViewInfo.WeaponPrefabPath),
			(i = this.djt.get(e)) && i === this.Cjt) ||
			(this.Cjt?.SetUIActive(!1),
			i
				? (i.SetUIActive(!0), (this.Cjt = i))
				: ((i = (
						await LguiUtil_1.LguiUtil.LoadPrefabByAsync(e, t)
					).GetComponentByClass(UE.UIItem.StaticClass())).SetUIActive(!0),
					(this.Cjt = i),
					this.djt.set(e, i)));
	}
}
exports.UpWeaponGachaPoolItem = UpWeaponGachaPoolItem;
