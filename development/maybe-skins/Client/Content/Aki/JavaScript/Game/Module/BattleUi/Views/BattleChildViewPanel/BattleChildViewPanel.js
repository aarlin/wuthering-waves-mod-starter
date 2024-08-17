"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BattleChildViewPanel = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class BattleChildViewPanel extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.X$e = []),
			(this.jQe = []),
			(this.ChildViewData = void 0),
			(this.ChildType = 0),
			(this.Visible = !1),
			(this.IsEnable = !1),
			(this.IsShowOnce = !1),
			(this.j$e = () => {
				var e = this.Visible;
				(this.Visible = this.ChildViewData.GetChildVisible(this.ChildType)),
					this.Q$e(e);
			});
	}
	async InitializeAsync() {}
	InitializeTemp() {}
	async OnBeforeStartAsync() {
		void 0 !== this.OpenParam && (this.ChildType = this.OpenParam),
			(this.ChildViewData =
				ModelManager_1.ModelManager.BattleUiModel.ChildViewData),
			this.InitializeTemp(),
			await this.InitializeAsync(),
			this.IsDestroyOrDestroying ||
				((this.Visible = this.ChildViewData.GetChildVisible(this.ChildType)),
				this.ChildViewData.AddCallback(this.ChildType, this.j$e),
				this.AddEvents());
	}
	ShowBattleChildViewPanel() {
		(this.IsEnable = !0),
			this.K$e(0, !0),
			this.SetActive(this.Visible),
			this.Visible && this.$$e();
	}
	HideBattleChildViewPanel() {
		this.IsEnable = !1;
		var e = this.Visible;
		this.K$e(0, !1),
			this.SetActive(this.Visible),
			e && this.OnHideBattleChildViewPanel();
	}
	Reset() {
		this.K$e(0, !1),
			this.Y$e(),
			this.RemoveEvents(),
			this.ClearAllTagSignificantChangedCallback(),
			this.ChildViewData &&
				(this.ChildViewData.RemoveCallback(this.ChildType, this.j$e),
				(this.ChildViewData = void 0));
	}
	SetActive(e) {
		this.Visible !== e
			? Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Battle",
					18,
					"战斗子界面不要直接调用SetActive, 请调用SetVisible",
				)
			: super.SetActive(e);
	}
	GetVisible() {
		return this.Visible;
	}
	SetVisible(e, i) {
		var t = this.Visible;
		this.K$e(e, i), this.Q$e(t);
	}
	Q$e(e) {
		this.IsEnable &&
			e !== (e = this.GetVisible()) &&
			(this.SetActive(e), e ? this.$$e() : this.OnHideBattleChildViewPanel());
	}
	K$e(e, i) {
		0 !== this.ChildType &&
			(this.Visible = this.ChildViewData.SetChildVisible(
				e,
				this.ChildType,
				i,
				!1,
			));
	}
	$$e() {
		this.IsShowOnce
			? this.OnShowBattleChildViewPanel(!1)
			: ((this.IsShowOnce = !0), this.OnShowBattleChildViewPanel(!0));
	}
	OnShowBattleChildViewPanel(e) {}
	OnHideBattleChildViewPanel() {}
	OnTickBattleChildViewPanel(e) {}
	OnAfterTickBattleChildViewPanel(e) {}
	AddEvents() {}
	RemoveEvents() {}
	async NewStaticChildViewAsync(e, i, t) {
		return (
			(i = new i()), await i.NewByRootActorAsync(e, t), this.X$e.push(i), i
		);
	}
	Y$e() {
		for (const e of this.X$e) e && e.DestroyCompatible();
		this.X$e.length = 0;
	}
	async NewDynamicChildViewByResourceId(e, i, t, s = !1, a) {
		t = new t();
		try {
			await t.NewByResourceId(e, i, s, a);
		} catch (e) {
			e instanceof Error
				? Log_1.Log.CheckError() &&
					Log_1.Log.ErrorWithStack(
						"UiCommon",
						18,
						"战斗界面子界面创建失败",
						e,
						["资源名", i],
						["错误", e.message],
					)
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"UiCommon",
						18,
						"战斗界面子界面创建失败",
						["资源名", i],
						["错误", e],
					);
		}
		return t;
	}
	NewDynamicChildViewByResourceIdWithCallback(e, i, t, s = !1, a, h) {
		const l = new t();
		try {
			l.NewByResourceId(e, i, s, h).then(
				() => {
					a && a(l);
				},
				() => {},
			);
		} catch (e) {
			e instanceof Error
				? Log_1.Log.CheckError() &&
					Log_1.Log.ErrorWithStack(
						"UiCommon",
						18,
						"战斗界面子界面创建失败",
						e,
						["资源名", i],
						["错误", e.message],
					)
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"UiCommon",
						18,
						"战斗界面子界面创建失败",
						["资源名", i],
						["错误", e],
					);
		}
		return l;
	}
	async NewDynamicChildViewAsync(e, i, t) {
		return (i = new i()), await i.NewByRootActorAsync(e, t), i;
	}
	GetOperationType() {
		return ModelManager_1.ModelManager.PlatformModel.OperationType;
	}
	ListenForTagSignificantChanged(e, i, t) {
		(e = e.Entity.GetComponent(185)) &&
			((e = e.ListenForTagAddOrRemove(i, t)), this.jQe.push(e));
	}
	ClearAllTagSignificantChangedCallback() {
		if (this.jQe) {
			for (const e of this.jQe) e.EndTask();
			this.jQe.length = 0;
		}
	}
	ContainsTag(e, i) {
		return !!(e = e.Entity.GetComponent(185)) && e.HasTag(i);
	}
	GetItem(e) {
		return super.GetItem(e);
	}
	GetUiActorForGuide() {}
}
exports.BattleChildViewPanel = BattleChildViewPanel;
