"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CostContentItemContext =
		exports.RoleBreakPreviewContext =
		exports.RoleBreakPreviewViewModel =
			void 0);
const ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	ItemDefines_1 = require("../../Item/Data/ItemDefines"),
	CostMediumItemGrid_1 = require("../RoleBreach/CostMediumItemGrid"),
	RoleBreakPreviewView_1 = require("./RoleBreakPreviewView");
class RoleBreakPreviewViewModel {
	constructor() {
		(this.eLn = void 0),
			(this.tLn = void 0),
			(this.iLn = void 0),
			(this.oLn = -1),
			(this.CreateLevelLayoutGrid = () =>
				new RoleBreakPreviewView_1.LevelLayoutGrid(this)),
			(this.xRn = (e) => {
				var t = e.Data;
				ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
					t.ItemId,
				),
					e.MediumItemGrid.SetSelected(!0, !0);
			}),
			(this.CreateItemLayoutGrid = () => {
				var e = new CostMediumItemGrid_1.CostMediumItemGrid();
				return e.BindOnExtendToggleClicked(this.xRn), e;
			});
	}
	Dispose() {
		(this.oLn = -1), this.UnbindView(), this.UnbindCostContentItem();
	}
	get CachedRoleInstance() {
		return this.iLn;
	}
	set CachedRoleInstance(e) {
		(this.iLn && e) || (this.iLn = e);
	}
	get ChosenLevel() {
		return this.oLn;
	}
	set ChosenLevel(e) {
		var t = this.CachedRoleInstance.GetLevelData().GetMaxBreachLevel();
		let n = e;
		n < 1 ? (n = 1) : n > t && (n = t),
			(this.oLn = n),
			(this.eLn.ChosenLevel = n),
			(this.tLn.ChosenLevel = n);
	}
	BindView(e) {
		this.eLn = new RoleBreakPreviewContext(this, e);
	}
	UnbindView() {
		this.eLn?.Dispose(), (this.eLn = void 0);
	}
	BindCostContentItem(e) {
		this.tLn = new CostContentItemContext(this, e);
	}
	UnbindCostContentItem() {
		this.tLn?.Dispose(), (this.tLn = void 0);
	}
	HandleViewOnStart() {
		var e = this.CachedRoleInstance.GetLevelData().GetBreachLevel();
		this.ChosenLevel = e + 1;
	}
	HandleCostContentItemOnStart() {
		var e = this.CachedRoleInstance.GetLevelData();
		this.tLn.ChosenLevel = e.GetBreachLevel();
	}
	HandleViewClosePromise(e) {
		e.then(() => {
			this.CachedRoleInstance = void 0;
		}).catch(() => {});
	}
	HandleItemOnClickToggle(e) {
		this.ChosenLevel = e + 1;
	}
	HandleClickLeft() {
		this.ChosenLevel = this.ChosenLevel - 1;
	}
	HandleClickRight() {
		this.ChosenLevel = this.ChosenLevel + 1;
	}
	BuildLevelLayoutData(e) {
		var t = [],
			n = this.CachedRoleInstance.GetLevelData(),
			s = n.GetBreachLevel();
		for (let i = 0; i < n.GetMaxBreachLevel(); i++) {
			var o = i + 1;
			t.push({ IsChosen: o === e, IsAvailable: i < s, LevelContent: o });
		}
		return t;
	}
	BuildItemLayoutData(e) {
		var t,
			n,
			s = this.CachedRoleInstance.GetLevelData(),
			o = s.GetBreachLevel() >= e,
			i = [];
		for ([t, n] of s.GetBreachConfig(e).BreachConsume)
			t !== ItemDefines_1.EItemId.Gold &&
				i.push({
					ItemId: t,
					Count: n,
					IncId: 0,
					SelectedCount: o
						? 0
						: ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
								t,
							),
					OnlyTextFlag: o,
				});
		return i;
	}
	BuildCostContentItemData(e) {
		var t, n;
		let s = 0;
		for ([t, n] of this.CachedRoleInstance.GetLevelData().GetBreachConfig(e)
			.BreachConsume)
			if (t === ItemDefines_1.EItemId.Gold) {
				s = n;
				break;
			}
		return { CostNum: s, CostType: ItemDefines_1.EItemId.Gold };
	}
}
exports.RoleBreakPreviewViewModel = RoleBreakPreviewViewModel;
class RoleBreakPreviewContext {
	constructor(e, t) {
		(this.rLn = void 0),
			(this.nLn = void 0),
			(this.sLn = -1),
			(this.aLn = []),
			(this.hLn = void 0),
			(this.oLn = -1),
			(this.rLn = e),
			(this.nLn = t);
	}
	Dispose() {}
	get LevelContent() {
		return this.sLn;
	}
	set LevelContent(e) {
		(this.sLn = e), this.nLn.RefreshLevelContent(e);
	}
	get LevelLayout() {
		return this.aLn;
	}
	set LevelLayout(e) {
		(this.aLn = e), this.nLn.RefreshLevelLayout(e);
	}
	get ItemLayout() {
		return this.hLn;
	}
	set ItemLayout(e) {
		(this.hLn = e) && this.nLn.RefreshItemLayout(e);
	}
	get ChosenLevel() {
		return this.oLn;
	}
	set ChosenLevel(e) {
		this.oLn = e;
		var t = (s = this.rLn.CachedRoleInstance.GetLevelData()).GetBreachLevel(),
			n = s.GetMaxBreachLevel(),
			s = s.GetBreachConfig(e).MaxLevel;
		e <= t
			? (this.nLn.RefreshLevelContentItem(!1), this.nLn.RefreshHasBrokenTip(!0))
			: (this.nLn.RefreshLevelContentItem(!0),
				this.nLn.RefreshHasBrokenTip(!1),
				(this.LevelContent = s)),
			this.nLn.RefreshLeftButton(1 !== e),
			this.nLn.RefreshRightButton(e !== n),
			(this.LevelLayout = this.rLn.BuildLevelLayoutData(e)),
			(this.ItemLayout = this.rLn.BuildItemLayoutData(e));
	}
}
exports.RoleBreakPreviewContext = RoleBreakPreviewContext;
class CostContentItemContext {
	constructor(e, t) {
		(this.rLn = void 0),
			(this.lLn = void 0),
			(this._Ln = 0),
			(this.uLn = ItemDefines_1.EItemId.Gold),
			(this.oLn = -1),
			(this.rLn = e),
			(this.lLn = t);
	}
	Dispose() {}
	get CostNumber() {
		return this._Ln;
	}
	set CostNumber(e) {
		(this._Ln = e), this.lLn.RefreshCostNumber(e.toString());
	}
	get MoneyIcon() {
		return this.uLn;
	}
	set MoneyIcon(e) {
		(this.uLn = e), this.lLn.RefreshMoneyIcon(e);
	}
	get ChosenLevel() {
		return this.oLn;
	}
	set ChosenLevel(e) {
		(this.oLn = e),
			(e = this.rLn.BuildCostContentItemData(e))
				? ((this.CostNumber = e.CostNum),
					(this.MoneyIcon = e.CostType),
					this.lLn.Show())
				: this.lLn.Hide();
	}
}
exports.CostContentItemContext = CostContentItemContext;
