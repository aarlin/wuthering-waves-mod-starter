"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiNavigationViewManager = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	TickSystem_1 = require("../../../../Core/Tick/TickSystem"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiNavigationDefine_1 = require("./UiNavigationDefine"),
	UiNavigationGlobalData_1 = require("./UiNavigationGlobalData"),
	UiNavigationLogic_1 = require("./UiNavigationLogic"),
	UiNavigationViewHandle_1 = require("./UiNavigationViewHandle");
class UiNavigationViewManager {
	static Initialize() {
		this.dde(), this.agt();
	}
	static Clear() {
		this.Cde(), this._gt();
	}
	static agt() {
		this.Xje = TickSystem_1.TickSystem.Add(
			UiNavigationViewManager.Tick,
			"UiNavigationViewManager",
			3,
			!0,
		).Id;
	}
	static _gt() {
		this.Xje !== TickSystem_1.TickSystem.InvalidId &&
			TickSystem_1.TickSystem.Remove(this.Xje);
	}
	static dde() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.NavigationViewCreate,
			this.GBo,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.NavigationViewDestroy,
				this.NBo,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.ResetNavigationListener,
				this.OBo,
			);
	}
	static Cde() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.NavigationViewCreate,
			this.GBo,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.NavigationViewDestroy,
				this.NBo,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.ResetNavigationListener,
				this.OBo,
			);
	}
	static kBo(i, e) {
		if (e.ViewName !== UiNavigationDefine_1.POP_TAG)
			UiNavigationViewManager.FBo(i, e);
		else {
			var a = UE.LGUIBPLibrary.GetComponentsInChildren(
				e.GetOwner(),
				UE.TsUiNavigationPanelConfig_C.StaticClass(),
				!1,
			);
			if (a.Num() <= 0) UiNavigationViewManager.FBo(i, e);
			else
				for (let o = a.Num() - 1; 0 <= o; --o) {
					var t = a.Get(o);
					if (t.Independent && t.ViewName === UiNavigationDefine_1.POP_TAG) {
						UiNavigationViewManager.VBo(t)
							? UiNavigationViewManager.FBo(i, e)
							: UiNavigationViewManager.HBo.set([i, e], t);
						break;
					}
				}
		}
	}
	static jBo(i, e) {
		var a = new UiNavigationViewHandle_1.UiNavigationViewHandle(i, e);
		a.AddPanelConfig(i, e), this.WBo.set(i, a), this.uBo.set(i, a);
	}
	static VBo(i) {
		for (const e of this.WBo.values()) if (e.MainPanel === i) return !0;
		return !1;
	}
	static KBo(i, e) {
		let a;
		for (const i of this.WBo.values()) i.ViewName === e.ViewName && (a = i);
		a && (a.AddPanelConfig(i, e), this.uBo.set(i, a));
	}
	static FBo(i, e) {
		UiNavigationGlobalData_1.UiNavigationGlobalData.NeedCalculateCurrentPanel
			? this.QBo.set(i, e)
			: this.KBo(i, e);
	}
	static XBo(i) {
		var e = this.uBo.get(i);
		return !!e && (this.uBo.delete(i), e.DeletePanelConfig(i), i === e.TagId);
	}
	static $Bo(i) {
		var e = this.WBo.get(i);
		if (e) {
			this.WBo.delete(i);
			for (const i of e.GetPanelConfigMap().keys()) this.uBo.delete(i);
			return e.ClearPanelConfig(), !0;
		}
		return !1;
	}
	static YBo(i) {
		this.JBo
			? this.JBo.TagId === i &&
				(Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"UiNavigation",
						11,
						"当前导航面板销毁,将导航对象置为空",
					),
				UiNavigationLogic_1.UiNavigationLogic.UpdateNavigationListener(void 0),
				(this.JBo = void 0))
			: (Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"UiNavigation",
						11,
						"当前导航面板不存在,将导航对象置为空",
					),
				UiNavigationLogic_1.UiNavigationLogic.UpdateNavigationListener(void 0));
	}
	static MarkCalculateCurrentPanelDirty() {
		UiNavigationGlobalData_1.UiNavigationGlobalData.NeedCalculateCurrentPanel =
			!0;
	}
	static zBo() {
		UiNavigationGlobalData_1.UiNavigationGlobalData.NeedCalculateCurrentPanel &&
			((UiNavigationGlobalData_1.UiNavigationGlobalData.NeedCalculateCurrentPanel =
				!1),
			this.ZBo());
	}
	static ebo(i, e) {
		return (i = i.GetDepth()), (e = e.GetDepth()), -1 !== i && -1 !== e;
	}
	static ZBo() {
		if (this.WBo.size <= 0)
			(this.JBo = void 0),
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"UiNavigation",
						11,
						"当前没有导航面板,将导航对象置为空",
					),
				UiNavigationLogic_1.UiNavigationLogic.UpdateNavigationListener(void 0);
		else {
			let i,
				e = !0;
			for (const a of this.WBo.values())
				if (a.GetIsActive() && a.GetIsUsable())
					if (i) {
						if (!this.ebo(a, i)) {
							e = !1;
							break;
						}
						a.GetDepth() > i.GetDepth() ? (i = a) : a.SetIsInController(!1);
					} else i = a;
			e
				? this.JBo !== i &&
					(Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("UiNavigation", 11, "查找当前导航界面句柄", [
							"名字",
							i?.ViewName,
						]),
					this.JBo?.SetIsInController(!1),
					i?.SetIsInController(!0),
					i?.ResetStateIfNullFocus(),
					(this.JBo = i))
				: this.MarkCalculateCurrentPanelDirty();
		}
	}
	static tbo() {
		this.JBo && this.JBo.FindDefaultNavigation();
	}
	static ibo() {
		UiNavigationGlobalData_1.UiNavigationGlobalData.NeedRefreshCurrentPanel &&
			((UiNavigationGlobalData_1.UiNavigationGlobalData.NeedRefreshCurrentPanel =
				!1),
			this.JBo) &&
			(this.JBo.HasAnyPanelActive()
				? this.JBo.FindAddPanelConfigNavigation()
				: this.MarkCalculateCurrentPanelDirty());
	}
	static obo() {
		if (!(this.QBo.size <= 0)) {
			for (var [i, e] of this.QBo) this.KBo(i, e);
			this.QBo.clear();
		}
	}
	static rbo() {
		if (!(this.HBo.size <= 0) && this.JBo) {
			var i,
				e,
				a = [];
			for ([i, e] of this.HBo)
				e === this.JBo.MainPanel && (a.push(i), this.FBo(i[0], i[1]));
			for (const i of a) this.HBo.delete(i);
		}
	}
	static nbo() {
		this.JBo && this.JBo.TickViewHandle();
	}
	static GetCurrentViewHandle() {
		return this.JBo;
	}
	static RefreshCurrentHotKey() {
		this.JBo && this.JBo.MarkRefreshHotKeyDirty();
	}
	static RefreshCurrentHotKeyTextId() {
		this.JBo && this.JBo.MarkRefreshHotKeyTextIdDirty();
	}
}
(exports.UiNavigationViewManager = UiNavigationViewManager),
	((_a = UiNavigationViewManager).JBo = void 0),
	(UiNavigationViewManager.WBo = new Map()),
	(UiNavigationViewManager.uBo = new Map()),
	(UiNavigationViewManager.QBo = new Map()),
	(UiNavigationViewManager.HBo = new Map()),
	(UiNavigationViewManager.Xje = TickSystem_1.TickSystem.InvalidId),
	(UiNavigationViewManager.Tick = () => {
		UiNavigationViewManager.ibo(),
			UiNavigationViewManager.nbo(),
			UiNavigationViewManager.zBo(),
			UiNavigationViewManager.obo(),
			UiNavigationViewManager.rbo(),
			UiNavigationViewManager.tbo();
	}),
	(UiNavigationViewManager.GBo = (i, e) => {
		(e = e.GetComponentByClass(UE.TsUiNavigationPanelConfig_C.StaticClass())) &&
			(ModelManager_1.ModelManager.PlatformModel.IsMobile()
				? Log_1.Log.CheckError() &&
					Log_1.Log.Error("UiNavigation", 11, "移动端出现PC配置", [
						"ViewName",
						e.ViewName,
					])
				: e.Independent
					? (UiNavigationViewManager.jBo(i, e),
						UiNavigationViewManager.MarkCalculateCurrentPanelDirty())
					: _a.kBo(i, e));
	}),
	(UiNavigationViewManager.NBo = (i, e) => {
		e &&
			UiNavigationViewManager.XBo(i) &&
			(UiNavigationViewManager.$Bo(i),
			UiNavigationViewManager.YBo(i),
			UiNavigationViewManager.MarkCalculateCurrentPanelDirty());
	}),
	(UiNavigationViewManager.OBo = () => {
		_a.JBo &&
			(_a.JBo.ResetNavigationListener(),
			ModelManager_1.ModelManager.UiNavigationModel.MarkMoveInstantly());
	});
