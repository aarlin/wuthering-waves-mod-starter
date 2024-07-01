"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RouletteComponentBase =
		exports.exploreRouletteMap =
		exports.functionRouletteMap =
			void 0);
const UE = require("ue"),
	InputKeyDisplayData_1 = require("../../../InputSettings/InputKeyDisplayData"),
	InputSettings_1 = require("../../../InputSettings/InputSettings"),
	InputSettingsManager_1 = require("../../../InputSettings/InputSettingsManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	RouletteDefine_1 = require("../Data/RouletteDefine"),
	RouletteGridData_1 = require("../RouletteGrid/RouletteGridData");
(exports.functionRouletteMap = [
	[[1], 11, 1],
	[[2], 4, 1],
	[[3], 5, 1],
	[[4], 6, 1],
	[[5], 7, 1],
	[[6], 8, 1],
	[[7], 9, 1],
	[[8], 10, 1],
]),
	(exports.exploreRouletteMap = [
		[[2], 4, 0],
		[[3], 5, 0],
		[[4], 6, 0],
		[[5], 7, 0],
		[[6], 8, 0],
		[[7], 9, 0],
		[[1, 8], 12, 2],
	]);
class RouletteComponentBase extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.InputControllerType = 0),
			(this.Ego = void 0),
			(this.Angle = -1),
			(this.AreaIndex = 0),
			(this.cie = new UE.Rotator(0, 0, 0)),
			(this.CurrentGridIndex = -1),
			(this.CurrentEquipGridIndex = -1),
			(this.IsEmptyChoose = !0),
			(this.RouletteGridList = []),
			(this.AreaIndexToGridIndex = new Map()),
			(this.ToggleEventList = []),
			(this.gUn = new InputKeyDisplayData_1.InputKeyDisplayData());
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIText],
			[2, UE.UIItem],
			[3, UE.UIItem],
			[4, UE.UIItem],
			[5, UE.UIItem],
			[6, UE.UIItem],
			[7, UE.UIItem],
			[8, UE.UIItem],
			[9, UE.UIItem],
			[10, UE.UIItem],
			[11, UE.UIItem],
			[12, UE.UIItem],
		];
	}
	OnStart() {
		this.GetItem(2).SetUIActive(!1),
			this.GetItem(3).SetUIActive(!1),
			(this.Ego = this.GetItem(2));
	}
	OnBeforeDestroy() {
		(this.Ego = void 0),
			(this.cie = void 0),
			this.ygo(),
			this.AreaIndexToGridIndex.clear(),
			(this.AreaIndexToGridIndex = void 0),
			(this.ToggleEventList = []);
	}
	Reset() {
		this.Refresh(0, -1), this.RefreshRouletteComponent();
	}
	Igo() {
		this.ygo();
		var e = this.GetRouletteInfoMap();
		let t = 0;
		var i = new Map([
			[0, 0],
			[1, 0],
			[2, 0],
		]);
		for (const h of e) {
			for (const e of h[0]) this.AreaIndexToGridIndex.set(e, t);
			var r,
				n = h[1],
				s = h[2],
				o = i.get(s),
				a =
					((n =
						(((r = ModelManager_1.ModelManager.RouletteModel.CreateGridData(
							o,
							s,
						)).GridIndex = t),
						(r.DataIndex = o),
						(r.GridType = s),
						this.GetItem(n))),
					new RouletteGridData_1.rouletteGridGenerator[s]());
			n = (a.SetRootActor(n.GetOwner(), !0), this.GridDataDecorator(r));
			(r = (a.RefreshGrid(n), this.IsCurrentEquippedId(n))) &&
				(this.CurrentEquipGridIndex = n.GridIndex),
				a.SetGridEquipped(r),
				this.InitGridEvent(a),
				this.RouletteGridList.push(a),
				i.set(s, o + 1),
				t++;
		}
	}
	GetRouletteInfoMap() {}
	InitGridEvent(e) {
		for (const t of this.ToggleEventList) e.AddToggleStateChangeEvent(t);
	}
	GridDataDecorator(e) {
		return (e.State = this.JudgeGridStateByData(e.Id, e.GridType)), e;
	}
	AddAllGridToggleEvent(e) {
		this.ToggleEventList.push(e);
	}
	AddAllGridToggleCanExecuteChangeEvent(e) {
		for (const t of this.RouletteGridList) t.BindOnCanToggleExecuteChange(e);
	}
	IsCurrentEquippedId(e) {
		return !1;
	}
	JudgeGridStateByData(e, t) {
		return 1;
	}
	ygo() {
		for (const e of this.RouletteGridList)
			e.SetGridEquipped(!1), e.SetGridToggleState(!1);
		this.RouletteGridList = [];
	}
	RefreshCurrentGridIndex(e) {
		(this.AreaIndex = e),
			(e = this.AreaIndexToGridIndex.get(this.AreaIndex)),
			(this.CurrentGridIndex = e ?? -1);
	}
	OnEmitCurrentGridSelectOn(e) {
		this.GetCurrentGrid()?.SelectOnGrid(!0);
	}
	GetCurrentGrid() {
		if (-1 !== this.CurrentGridIndex)
			return this.RouletteGridList[this.CurrentGridIndex];
	}
	SetAllGridToggleSelfInteractive(e) {
		for (const t of this.RouletteGridList) t.SetToggleSelfInteractive(e);
	}
	EmitCurrentGridSelectOn(e) {
		this.OnEmitCurrentGridSelectOn(e);
	}
	GetCurrentIndexAndAngle() {
		return [this.AreaIndex, this.Angle];
	}
	RefreshRouletteComponent() {
		this.RefreshCurrentShowName(), this.RefreshTips();
	}
	Refresh(e, t) {
		var i, r, n;
		void 0 !== e &&
			this.AreaIndex !== e &&
			((i = 0 === this.AreaIndex),
			(r = 0 === e),
			(n =
				(this.AreaIndexToGridIndex.get(this.AreaIndex) ?? -1) !==
				(this.AreaIndexToGridIndex.get(e) ?? -1)),
			(this.IsEmptyChoose = r),
			!i && n && this.SetCurrentToggleState(!1),
			this.RefreshCurrentGridIndex(e),
			!r && n && this.SetCurrentToggleState(!0),
			this.RefreshCurrentShowName(),
			(i || r) && this.SetRingVisible(!r),
			this.RefreshTips()),
			void 0 !== t &&
				this.Angle !== t &&
				((this.Angle = t), this.IsEmptyChoose || this.Tgo(this.Angle));
	}
	SetCurrentToggleState(e) {}
	Tgo(e) {
		(this.cie.Yaw = e), this.Ego.SetUIRelativeRotation(this.cie);
	}
	SetRingVisible(e) {
		this.Ego.SetUIActive(e);
	}
	RefreshCurrentShowName() {
		var e =
			this.GetCurrentGrid()?.Data?.Name ?? RouletteDefine_1.ROULETTE_TEXT_EMPTY;
		this.RefreshName(e);
	}
	RefreshName(e) {
		this.GetText(0).ShowTextNew(e);
	}
	SetNameVisible(e) {
		this.GetText(0).SetUIActive(e);
	}
	RefreshTips() {}
	RefreshTipsByText(e, t = !1) {
		var i;
		void 0 !== e &&
			((i = this.GetText(1)),
			LguiUtil_1.LguiUtil.SetLocalTextNew(i, e, this.I7s(t)));
	}
	I7s(e) {
		return e &&
			InputSettingsManager_1.InputSettingsManager.GetActionKeyDisplayData(
				this.gUn,
				InputMappingsDefine_1.actionMappings.幻象探索选择界面,
			) &&
			(e = this.gUn.GetDisplayKeyNameList()) &&
			0 !== e.length
			? `<texture=${InputSettings_1.InputSettings.GetKeyIconPath(e[0])}>`
			: "";
	}
	SetTipsActive(e) {
		this.GetText(1).SetUIActive(e);
	}
	RefreshRouletteType() {
		this.RefreshRouletteItem(),
			(this.CurrentGridIndex = -1),
			this.Reset(),
			this.Igo();
	}
	RefreshRouletteItem() {}
	RefreshRoulettePlatformType(e) {
		this.Reset();
	}
	RefreshRouletteInputType(e) {
		(this.InputControllerType = e), this.Reset();
	}
}
exports.RouletteComponentBase = RouletteComponentBase;
