"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RouletteComponentAssemblyFunction =
		exports.RouletteComponentAssemblyExplore =
		exports.RouletteComponentAssembly =
			void 0);
const ModelManager_1 = require("../../../Manager/ModelManager"),
	RouletteComponent_1 = require("./RouletteComponent");
class RouletteComponentAssembly extends RouletteComponent_1.RouletteComponentBase {
	IsCurrentEquippedId(e) {
		return !1;
	}
	JudgeGridStateByData(e, t) {
		return void 0 !== e && 0 !== e ? 1 : 2;
	}
	SetCurrentToggleState(e) {
		this.GetCurrentGrid()?.SetGridToggleNavigation(e);
	}
	InitGridEvent(e) {
		super.InitGridEvent(e), e.SetGridToggleChangeEvent();
	}
	GridDataDecorator(e) {
		return (
			(e.State = this.JudgeGridStateByData(e.Id, e.GridType)),
			(e.ShowIndex = !0),
			e
		);
	}
	Lgo(e, t) {
		switch (t) {
			case 0:
				var o =
					ModelManager_1.ModelManager.RouletteModel.GetDefaultExploreSkillIdList();
				return e > o.length ? void 0 : o[e];
			case 1:
				return e >
					(o =
						ModelManager_1.ModelManager.RouletteModel.GetDefaultFunctionIdList())
						.length
					? void 0
					: o[e];
			case 2:
				return;
		}
	}
	ResetAllGridDefault() {
		for (const o of this.RouletteGridList) {
			o.SetGridEquipped(!1), o.SetGridToggleState(!1);
			var e = o.Data,
				t = ((e.Name = void 0), this.Lgo(e.DataIndex, e.GridType));
			(e.Id = t ?? e.Id),
				(e.State = this.JudgeGridStateByData(e.Id, e.GridType)),
				o.RefreshGrid(e);
		}
	}
	GetGridByValidId(e) {
		if (0 !== e && void 0 !== e)
			for (const t of this.RouletteGridList) if (t.Data.Id === e) return t;
	}
	SetCurrentGridByData(e) {
		(this.CurrentGridIndex = e.GridIndex), this.RefreshRouletteComponent();
	}
	RefreshCurrentGridData(e) {
		this.GetCurrentGrid()?.RefreshGrid(e), this.RefreshRouletteComponent();
	}
	GetGridByIndex(e) {
		if (!(e < 0 || e >= this.RouletteGridList.length))
			return this.RouletteGridList[e];
	}
	SetAllGridDeselect() {
		for (const e of this.RouletteGridList) e.SetGridToggleState(!1);
	}
}
class RouletteComponentAssemblyExplore extends (exports.RouletteComponentAssembly =
	RouletteComponentAssembly) {
	GetRouletteInfoMap() {
		return RouletteComponent_1.exploreRouletteMap;
	}
	RefreshRouletteItem() {
		this.GetItem(10).SetUIActive(!1),
			this.GetItem(11).SetUIActive(!1),
			this.GetItem(12).SetUIActive(!0);
	}
}
exports.RouletteComponentAssemblyExplore = RouletteComponentAssemblyExplore;
class RouletteComponentAssemblyFunction extends RouletteComponentAssembly {
	GetRouletteInfoMap() {
		return RouletteComponent_1.functionRouletteMap;
	}
	RefreshRouletteItem() {
		this.GetItem(10).SetUIActive(!0),
			this.GetItem(11).SetUIActive(!0),
			this.GetItem(12).SetUIActive(!1);
	}
}
exports.RouletteComponentAssemblyFunction = RouletteComponentAssemblyFunction;
