"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SpecialEnergyBarBase = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../../Core/Common/Log"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
	BattleUiControl_1 = require("../../BattleUiControl"),
	VisibleStateUtil_1 = require("../../VisibleStateUtil"),
	SpecialEnergyBarKeyItem_1 = require("./SpecialEnergyBarKeyItem"),
	SpecialEnergyBarNumItem_1 = require("./SpecialEnergyBarNumItem"),
	SpecialEnergyBarPercentMachine_1 = require("./SpecialEnergyBarPercentMachine"),
	CustomPromise_1 = require("../../../../../Core/Common/CustomPromise"),
	ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
class SpecialEnergyBarBase extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.NeedOverrideDestroy = !0),
			(this.Destroyed = !1),
			(this.PrefabPath = ""),
			(this.RoleData = void 0),
			(this.Config = void 0),
			(this.AttributeComponent = void 0),
			(this.TagComponent = void 0),
			(this.BuffComponent = void 0),
			(this.TagTaskList = []),
			(this.HasKeyEnableTag = !1),
			(this.NiagaraList = []),
			(this.NeedInitKeyItem = !0),
			(this.KeyItem = void 0),
			(this.NeedInitNumItem = !1),
			(this.NumItem = void 0),
			(this.PercentMachine =
				new SpecialEnergyBarPercentMachine_1.SpecialEnergyBarPercentMachine()),
			(this.T$e = new Map()),
			(this.VisibleState = 0),
			(this.smt = (e, t, i) => {
				this.OnAttributeChanged();
			}),
			(this.amt = (e, t, i) => {
				this.OnMaxAttributeChanged();
			}),
			(this.OnKeyEnableTagChanged = (e, t) => {
				(this.HasKeyEnableTag = t), this.OnKeyEnableChanged();
			});
	}
	async InitByPathAsync(e, t) {
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug("Battle", 18, "加载特殊能量条", ["path", t]),
			(this.PrefabPath = t),
			(t = await BattleUiControl_1.BattleUiControl.Pool.LoadActor(t, e)),
			this.Destroyed
				? BattleUiControl_1.BattleUiControl.Pool.RecycleSingleActor(t)
				: (await this.CreateByActorAsync(t),
					this.AddEvents(),
					this.RefreshVisible());
	}
	InitData(e, t, i = !0) {
		(this.NeedInitKeyItem = i),
			!this.Destroyed &&
				e &&
				(this.RoleData &&
					(Log_1.Log.CheckError() &&
						Log_1.Log.Error("Battle", 18, "能量条设置了多次角色的数据"),
					this.R$e(),
					this.U$e()),
				(this.RoleData = e),
				(this.Config = t),
				(this.AttributeComponent = this.RoleData.AttributeComponent),
				(this.TagComponent = this.RoleData.GameplayTagComponent),
				(this.BuffComponent = this.RoleData.BuffComponent),
				this.PercentMachine.Init(this.GetTargetAttributePercent()),
				this.OnInitData(),
				this.InitKeyEnableTag());
	}
	OnInitData() {}
	AddEvents() {
		this.ListenForAttributeChanged(this.Config.AttributeId, this.smt),
			this.ListenForAttributeChanged(this.Config.MaxAttributeId, this.amt);
	}
	RemoveEvents() {
		this.RemoveListenAttributeChanged(this.Config.AttributeId, this.smt),
			this.RemoveListenAttributeChanged(this.Config.MaxAttributeId, this.amt);
	}
	SetVisible(e, t = 0) {
		(this.VisibleState = VisibleStateUtil_1.VisibleStateUtil.SetVisible(
			this.VisibleState,
			e,
			t,
		)),
			this.RefreshVisible();
	}
	RefreshVisible() {
		var e;
		this.InAsyncLoading() ||
			this.IsRegister ||
			((e = 0 === this.VisibleState)
				? this.IsShowOrShowing || this.Show()
				: this.IsShowOrShowing && this.Hide(),
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"Battle",
					18,
					"改变特殊能量条显隐",
					["visible", e],
					["entityId", this.RoleData.EntityHandle?.Id],
				));
	}
	DestroyOverride() {
		return (
			(this.Destroyed = !0),
			!this.NeedOverrideDestroy &&
				(this.InAsyncLoading() ||
					(BattleUiControl_1.BattleUiControl.Pool.RecycleActorByPath(
						this.PrefabPath,
						this.RootActor,
						!0,
					),
					(this.RootActor = void 0),
					(this.RootItem = void 0)),
				!0)
		);
	}
	OnBeforeDestroy() {
		this.InAsyncLoading() || this.RemoveEvents(),
			this.R$e(),
			this.U$e(),
			(this.RoleData = void 0),
			(this.AttributeComponent = void 0),
			(this.TagComponent = void 0),
			(this.BuffComponent = void 0);
	}
	GetEntityId() {
		return this.RoleData?.EntityHandle?.Id;
	}
	Tick(e) {
		this.PercentMachine.Update(e) && this.OnBarPercentChanged();
	}
	OnAttributeChanged() {
		this.PercentMachine.SetTargetPercent(this.GetTargetAttributePercent()),
			this.OnBarPercentChanged();
	}
	OnMaxAttributeChanged() {
		this.PercentMachine.SetTargetPercent(this.GetTargetAttributePercent()),
			this.OnBarPercentChanged();
	}
	OnBarPercentChanged() {}
	ListenForAttributeChanged(e, t) {
		var i = this.RoleData?.AttributeComponent;
		i && (i.AddListener(e, t), this.T$e.set(e, t));
	}
	RemoveListenAttributeChanged(e, t) {
		var i = this.AttributeComponent;
		i && (i.RemoveListener(e, t), this.T$e.delete(e));
	}
	R$e() {
		var e = this.AttributeComponent;
		if (e) {
			for (var [t, i] of this.T$e) e.RemoveListener(t, i);
			this.T$e.clear();
		}
	}
	ListenForTagCountChanged(e, t) {
		var i = this.TagComponent;
		i && ((i = i.ListenForTagAnyCountChanged(e, t)), this.TagTaskList.push(i));
	}
	U$e() {
		if (this.TagTaskList) {
			for (const e of this.TagTaskList) e.EndTask();
			this.TagTaskList.length = 0;
		}
	}
	ListenForTagAddOrRemoveChanged(e, t) {
		var i = this.TagComponent;
		i && ((i = i.ListenForTagAddOrRemove(e, t)), this.TagTaskList.push(i));
	}
	GetBuffCountByBuffId(e) {
		return this.BuffComponent.GetBuffTotalStackById(e);
	}
	async LoadEffects() {
		if (this.Config) {
			var e = [],
				t = this.Config.NiagaraPathList.length;
			for (let a = 0; a < t; a++) {
				var i = this.Config.NiagaraPathList[a];
				e.push(this.wyn(i, a, this.NiagaraList));
			}
			await Promise.all(e);
		}
	}
	async wyn(e, t, i) {
		const a = new CustomPromise_1.CustomPromise();
		return (
			ResourceSystem_1.ResourceSystem.LoadAsync(
				e,
				UE.NiagaraSystem,
				(e) => {
					(i[t] = e), a.SetResult();
				},
				103,
			),
			a.Promise
		);
	}
	async InitKeyItem(e) {
		!this.NeedInitKeyItem ||
			ModelManager_1.ModelManager.PlatformModel.IsMobile() ||
			((this.KeyItem = new SpecialEnergyBarKeyItem_1.SpecialEnergyBarKeyItem()),
			this.KeyItem.SetConfig(this.Config),
			await this.KeyItem.CreateThenShowByResourceIdAsync(
				"UiItem_EnergyBarHotKey",
				e,
			));
	}
	async InitNumItem(e) {
		this.NeedInitNumItem &&
			((this.NumItem = new SpecialEnergyBarNumItem_1.SpecialEnergyBarNumItem()),
			await this.NumItem.CreateThenShowByResourceIdAsync(
				"UiItem_EnergyBarTxtNum",
				e,
			));
	}
	InitKeyEnableTag() {
		var e = this.Config.KeyEnableTagId;
		0 !== e &&
			((this.HasKeyEnableTag = this.TagComponent?.HasTag(e) ?? !1),
			this.ListenForTagAddOrRemoveChanged(e, this.OnKeyEnableTagChanged));
	}
	GetTargetAttributePercent() {
		var e = this.AttributeComponent.GetCurrentValue(this.Config.AttributeId),
			t = this.AttributeComponent.GetCurrentValue(this.Config.MaxAttributeId);
		return 0 < t ? e / t : 0;
	}
	GetKeyEnable() {
		return !(
			this.PercentMachine.GetCurPercent() < this.Config.DisableKeyOnPercent ||
			(0 !== this.Config.KeyEnableTagId && !this.HasKeyEnableTag)
		);
	}
	OnKeyEnableChanged() {}
	OnChangeVisibleByTagChange(e) {}
}
exports.SpecialEnergyBarBase = SpecialEnergyBarBase;
