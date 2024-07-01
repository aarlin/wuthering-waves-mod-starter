"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BattlePassRewardGridItem =
		exports.BattlePassRewardItem =
		exports.BattlePassRewardData =
			void 0);
const UE = require("ue"),
	Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
	GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
	BattlePassController_1 = require("./../BattlePassController"),
	BattlePassSmallGridItem_1 = require("./BattlePassSmallGridItem"),
	ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
class BattlePassRewardData {
	constructor(e) {
		(this.FreeRewardItem = []),
			(this.PayRewardItem = []),
			(this.Level = 0),
			(this.Level = e);
	}
	IsThisType(e) {
		for (const t of this.FreeRewardItem) if (t.ItemType === e) return !0;
		for (const t of this.PayRewardItem) if (t.ItemType === e) return !0;
		return !1;
	}
	GetItemCount(e, t) {
		if (e === Protocol_1.Aki.Protocol.b2s.Proto_Free) {
			return this.GetFreeRewardItem(t).Item[1];
		}
		return this.GetPayRewardItem(t).Item[1];
	}
	GetFreeRewardItem(e) {
		for (const t of this.FreeRewardItem) if (t.Item[0].ItemId === e) return t;
	}
	GetPayRewardItem(e) {
		for (const t of this.PayRewardItem) if (t.Item[0].ItemId === e) return t;
	}
}
exports.BattlePassRewardData = BattlePassRewardData;
class BattlePassRewardItem {
	constructor(e, t, r = 0) {
		(this.Item = void 0),
			(this.ItemType = void 0),
			(this.Item = [{ IncId: 0, ItemId: e }, t]),
			(this.ItemType = r);
	}
}
exports.BattlePassRewardItem = BattlePassRewardItem;
class BattlePassRewardGridItem extends GridProxyAbstract_1.GridProxyAbstract {
	constructor() {
		super(...arguments),
			(this.cki = []),
			(this.jIt = void 0),
			(this.mki = (e) => {
				(e = e.Data[0].ItemId),
					this.jbe(
						this.jIt.FreeRewardItem[0].ItemType,
						e,
						Protocol_1.Aki.Protocol.b2s.Proto_Free,
					);
			}),
			(this.dki = (e) => {
				(e = e.Data[0].ItemId),
					this.jbe(
						this.jIt.PayRewardItem[0].ItemType,
						e,
						Protocol_1.Aki.Protocol.b2s.Proto_Pay,
					);
			}),
			(this.Cki = (e) => {
				(e = e.Data[0].ItemId),
					this.jbe(
						this.jIt.PayRewardItem[1].ItemType,
						e,
						Protocol_1.Aki.Protocol.b2s.Proto_Pay,
					);
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIItem],
			[2, UE.UIItem],
			[3, UE.UIItem],
		]),
			(this.BtnBindInfo = []);
	}
	jbe(e, t, r) {
		1 === e
			? BattlePassController_1.BattlePassController.RequestTakeBattlePassReward(
					r,
					this.jIt.Level,
					t,
					this.GridIndex,
				)
			: ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
					t,
				);
	}
	OnStart() {
		var e;
		(e =
			((e =
				((e =
					new BattlePassSmallGridItem_1.BattlePassSmallGridItem()).Initialize(
					this.GetItem(1).GetOwner(),
				),
				e.BindOnExtendToggleClicked(this.mki),
				this.cki.push(e),
				new BattlePassSmallGridItem_1.BattlePassSmallGridItem())).Initialize(
				this.GetItem(2).GetOwner(),
			),
			e.BindOnExtendToggleClicked(this.dki),
			this.cki.push(e),
			new BattlePassSmallGridItem_1.BattlePassSmallGridItem())).Initialize(
			this.GetItem(3).GetOwner(),
		),
			e.BindOnExtendToggleClicked(this.Cki),
			this.cki.push(e);
	}
	gki(e, t, r) {
		e.SetReceivedVisible(2 === t),
			e.SetLockVisible(0 === t),
			e.SetReceivableVisible(1 === t);
	}
	Refresh(e, t, r) {
		if (
			((this.jIt = e),
			this.GetText(0).SetText(e.Level.toString()),
			1 === e.FreeRewardItem.length)
		) {
			var i = this.cki[0];
			i.SetActive(!0),
				i.Refresh(e.FreeRewardItem[0].Item),
				this.gki(i, e.FreeRewardItem[0].ItemType, 0);
		} else this.cki[0].SetActive(!1);
		var s;
		2 === e.PayRewardItem.length
			? ((i = this.cki[1]),
				(s = this.cki[2]),
				i.SetActive(!0),
				s.SetActive(!0),
				i.Refresh(e.PayRewardItem[0].Item),
				s.Refresh(e.PayRewardItem[1].Item),
				this.gki(i, e.PayRewardItem[0].ItemType, 1),
				this.gki(s, e.PayRewardItem[1].ItemType, 2))
			: 1 === e.PayRewardItem.length
				? (this.cki[1].SetActive(!0),
					this.cki[2].SetActive(!1),
					this.cki[1].Refresh(e.PayRewardItem[0].Item),
					this.gki(this.cki[1], e.PayRewardItem[0].ItemType, 1))
				: (this.cki[1].SetActive(!1), this.cki[2].SetActive(!1));
	}
}
exports.BattlePassRewardGridItem = BattlePassRewardGridItem;
