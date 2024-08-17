"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiTabViewBase = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	PerformanceController_1 = require("../../../Core/Performance/PerformanceController"),
	TickSystem_1 = require("../../../Core/Tick/TickSystem"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	UiPanelBase_1 = require("./UiPanelBase"),
	UiViewSequence_1 = require("./UiViewSequence");
class UiTabViewBase extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.Xje = TickSystem_1.TickSystem.InvalidId),
			(this.Params = void 0),
			(this.c_r = new Map()),
			(this.OperationList = []),
			(this.ExtraParams = void 0),
			(this.UiViewSequence = void 0),
			(this.m_r = void 0),
			(this.d_r = (e) => {
				var i = PerformanceController_1.PerformanceController.StartMonitor(
					"UiTabViewBase.TickHandler",
				);
				this.OnTickUiTabViewBase(e),
					PerformanceController_1.PerformanceController.EndMonitor(i);
			});
	}
	SetTabViewName(e) {
		this.m_r = e;
	}
	OnBeforeShowImplement() {
		this.Xje === TickSystem_1.TickSystem.InvalidId &&
			(this.Xje = TickSystem_1.TickSystem.Add(
				this.d_r,
				"TabViewTick",
				0,
				!0,
			).Id),
			this.AddEventListener();
	}
	OnAfterHideImplement() {
		this.Xje !== TickSystem_1.TickSystem.InvalidId &&
			(TickSystem_1.TickSystem.Remove(this.Xje),
			(this.Xje = TickSystem_1.TickSystem.InvalidId)),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.CloseTabView,
				this.m_r,
			),
			this.RemoveEventListener();
	}
	AddEventListener() {}
	RemoveEventListener() {}
	OnBeforeCreateImplement() {
		(this.UiViewSequence = new UiViewSequence_1.UiBehaviorLevelSequence(this)),
			this.AddUiBehavior(this.UiViewSequence);
	}
	OnStartImplement() {
		this.C_r(), this.OnInitBehaviour();
		var e = this.OperationList.length;
		for (let i = 0; i < e; i++) (0, this.OperationList[i])();
		(this.OperationList = []), this.g_r();
	}
	AddUiTabViewBehavior(e) {
		let i = this.c_r.get(e);
		return (
			i
				? Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"UiTabModule",
						11,
						"功能模块添加重复,查看是否重复添加",
					)
				: ((i = new e()), this.c_r.set(e, i)),
			i
		);
	}
	GetTabBehavior(e) {
		if ((e = this.c_r.get(e))) return e;
	}
	OnAfterShowImplement() {
		EventSystem_1.EventSystem.Emit(
			EventDefine_1.EEventName.OpenTabView,
			this.m_r,
			this,
		);
	}
	C_r() {
		for (const e of this.c_r.values()) e.Init();
	}
	g_r() {
		for (const e of this.c_r.values()) e.Begin();
	}
	f_r() {
		for (const e of this.c_r.values()) e.ShowFromView();
	}
	p_r() {
		for (const e of this.c_r.values()) e.ShowFromToggle();
	}
	v_r() {
		for (const e of this.c_r.values()) e.Hide();
	}
	M_r() {
		for (const e of this.c_r.values()) e.Destroy();
	}
	OnInitBehaviour() {}
	OnHideUiTabViewBase(e) {}
	OnTickUiTabViewBase(e) {}
	OnShowUiTabViewFromToggle() {}
	OnShowUiTabViewFromView() {}
	ShowUiTabViewFromToggle() {
		this.Show(), this.OnShowUiTabViewFromToggle(), this.p_r();
	}
	ShowUiTabViewFromView() {
		this.Show(), this.OnShowUiTabViewFromView(), this.f_r();
	}
	HideUiTabView(e) {
		this.Hide(), this.OnHideUiTabViewBase(e), this.v_r();
	}
	OnBeforeDestroyImplement() {
		this.M_r();
	}
	SetParams(e) {
		this.Params = e;
	}
	SetExtraParams(e) {
		this.ExtraParams = e;
	}
	GetViewName() {
		return this.m_r;
	}
	CancelAsyncLoad() {
		this.ClearUiPrefabLoadModule();
	}
}
exports.UiTabViewBase = UiTabViewBase;
