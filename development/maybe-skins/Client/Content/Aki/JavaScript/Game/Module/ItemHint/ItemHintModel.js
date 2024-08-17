"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ItemHintModel =
		exports.ItemRewardData =
		exports.MainInterfaceData =
		exports.InsideInterfaceData =
		exports.InterfaceDataUnit =
			void 0);
const Log_1 = require("../../../Core/Common/Log"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	ModelBase_1 = require("../../../Core/Framework/ModelBase"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ItemHintDefines_1 = require("./Data/ItemHintDefines"),
	HIGH_QUALITY = 4;
class InterfaceDataUnit {
	constructor(t) {
		(this.Index = 0),
			(this.Mode = 0),
			(this.WaitList = new Array()),
			(this.Index = t);
	}
	GetMaxCount() {
		let t = 1;
		return (
			0 === this.Mode
				? (t = ConfigManager_1.ConfigManager.RewardConfig.GetLowModeCount())
				: 1 === this.Mode &&
					(t = ConfigManager_1.ConfigManager.RewardConfig.GetFastModeCount()),
			t
		);
	}
	GetAddItemTime() {
		let t = 0;
		return (
			0 === this.Mode
				? (t =
						ConfigManager_1.ConfigManager.RewardConfig.GetLowModeNextAddItemTime())
				: 1 === this.Mode &&
					(t =
						ConfigManager_1.ConfigManager.RewardConfig.GetFastModeNextAddItemTime()),
			t
		);
	}
}
exports.InterfaceDataUnit = InterfaceDataUnit;
class InsideInterfaceData {
	constructor() {
		(this.KZt = 0), (this.FCi = void 0), (this.VCi = new Array());
	}
	Clear() {
		(this.KZt = 0), (this.VCi = new Array());
	}
	IsEmpty() {
		return !this.FCi || this.FCi.WaitList.length <= 0;
	}
	ShiftFirstData() {
		if (this.FCi) return this.FCi.WaitList.shift();
	}
	GetMaxCount() {
		return this.FCi
			? this.FCi.GetMaxCount()
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error("ItemHint", 9, "里列表当前单元无效!"),
				0);
	}
	GetAddItemTime() {
		return this.FCi
			? this.FCi.GetAddItemTime()
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error("ItemHint", 9, "里列表当前单元无效!"),
				0);
	}
	PostBattleViewOpen() {
		this.HCi(), this.jCi();
	}
	HCi() {
		this.KZt++;
	}
	jCi() {
		for (const t of this.VCi) t.Mode = 1;
	}
	ShiftFirstUnit() {
		this.FCi
			? (0 < this.FCi.WaitList.length &&
					Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn(
						"ItemHint",
						9,
						"里列表关闭时, 还有数据在队列中未开始播放!",
					),
				this.VCi.shift(),
				(this.FCi = void 0),
				this.WCi())
			: Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("ItemHint", 11, "里列表关闭时没有数据可以拿");
	}
	InsertItemRewardInfo(t) {
		var e = this.KCi();
		for (const r of t) {
			var i,
				a = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
					r.Ekn,
				);
			a &&
				a.ShowInBag &&
				(((i = new ItemHintDefines_1.ItemRewardInfo()).ItemCount = r.I5n),
				(i.ItemId = r.Ekn),
				(i.Quality = a.QualityId),
				e.WaitList.push(i));
		}
		this.WCi();
	}
	WCi() {
		!this.FCi && 0 < this.VCi.length && (this.FCi = this.VCi[0]);
	}
	KCi() {
		for (const t of this.VCi) if (t.Index === this.KZt) return t;
		const t = new InterfaceDataUnit(this.KZt);
		return this.VCi.push(t), t;
	}
}
exports.InsideInterfaceData = InsideInterfaceData;
class MainInterfaceData {
	constructor() {
		this.WaitList = new Array();
	}
	InsertItemRewardInfo(t) {
		for (const a of t) {
			var e,
				i = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
					a.Ekn,
				);
			i &&
				i.ShowInBag &&
				(((e = new ItemHintDefines_1.ItemRewardInfo()).ItemCount = a.I5n),
				(e.ItemId = a.Ekn),
				(e.Quality = i.QualityId),
				this.WaitList.push(e));
		}
		this.WaitList.sort((t, e) => e.Quality - t.Quality);
	}
	AddItemRewardInfo(t) {
		this.WaitList.push(t);
	}
	SortWaitList() {
		this.WaitList.sort((t, e) => e.Quality - t.Quality);
	}
	Clear() {}
}
exports.MainInterfaceData = MainInterfaceData;
class ItemRewardData {
	constructor() {
		this.ItemReward = void 0;
	}
}
exports.ItemRewardData = ItemRewardData;
class ItemHintModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.QCi = new MainInterfaceData()),
			(this.XCi = new MainInterfaceData()),
			(this.$Ci = new Array()),
			(this.YCi = new Array()),
			(this.JCi = !1);
	}
	get Visibility() {
		return this.JCi;
	}
	set Visibility(t) {
		this.JCi = t;
	}
	OnInit() {
		return (this.JCi = !0);
	}
	OnClear() {
		return this.QCi.Clear(), this.XCi.Clear(), (this.$Ci = new Array()), !0;
	}
	AddItemRewardList(t) {
		var e = new ItemRewardData();
		(e.ItemReward = t), this.$Ci.push(e);
	}
	AddAchievementItemRewardList(t) {
		var e = new ItemRewardData();
		(e.ItemReward = t), this.YCi.push(e);
	}
	AddItemRewardTest() {
		var t,
			e = Protocol_1.Aki.Protocol.lts.create();
		((t =
			(((t = Protocol_1.Aki.Protocol.Zks.create()).I5n = 1),
			(t.G3n = 21010014),
			(t.r6n = 3),
			e.Y5n.push(t),
			new ItemRewardData())).ItemReward = e),
			this.$Ci.push(t);
	}
	ShiftItemRewardListFirst() {
		return this.$Ci.shift();
	}
	ShiftAchievementItemRewardListFirst() {
		return this.YCi.shift();
	}
	PeekItemRewardListFirst() {
		return this.$Ci[0];
	}
	CleanItemRewardList() {
		this.$Ci = new Array();
	}
	get IsItemRewardListEmpty() {
		return this.$Ci.length <= 0;
	}
	get IsAchievementItemRewardListEmpty() {
		return this.YCi.length <= 0;
	}
	MainInterfaceInsertItemRewardInfo(t) {
		for (const a of t) {
			var e,
				i = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
					a.Ekn,
				);
			i &&
				i.ShowInBag &&
				(((e = new ItemHintDefines_1.ItemRewardInfo()).ItemCount = a.I5n),
				(e.ItemId = a.Ekn),
				(e.Quality = i.QualityId),
				(9 === i.ItemType || e.Quality >= 4
					? this.XCi
					: this.QCi
				).AddItemRewardInfo(e));
		}
		this.QCi.SortWaitList(), this.XCi.SortWaitList();
	}
	get IsMainInterfaceDataEmpty() {
		return this.QCi.WaitList.length <= 0;
	}
	get IsPriorInterfaceDataEmpty() {
		return this.XCi.WaitList.length <= 0;
	}
	ShiftMainInterfaceData() {
		return this.QCi.WaitList.shift();
	}
	ShiftPriorInterfaceData() {
		return this.XCi.WaitList.shift();
	}
}
exports.ItemHintModel = ItemHintModel;
