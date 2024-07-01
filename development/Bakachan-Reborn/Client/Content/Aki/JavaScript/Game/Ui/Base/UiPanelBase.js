"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiPanelBase = void 0);
const UE = require("ue"),
	AudioSystem_1 = require("../../../Core/Audio/AudioSystem"),
	Log_1 = require("../../../Core/Common/Log"),
	Macro_1 = require("../../../Core/Preprocessor/Macro"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	LguiUtil_1 = require("../../Module/Util/LguiUtil"),
	UiActorPool_1 = require("../UiActorPool"),
	UiImageSettingModule_1 = require("../UiImageSettingModule"),
	UiNiagaraSettingModule_1 = require("../UiNiagaraSettingModule"),
	UiPrefabLoadModule_1 = require("../UiPrefabLoadModule"),
	ComponentAction_1 = require("./ComponentAction"),
	UiBehaviorBase_1 = require("./UiBehaviorBase");
class UiPanelBase extends ComponentAction_1.ComponentAction {
	constructor() {
		super(),
			(this.RootItem = void 0),
			(this.RootActor = void 0),
			(this.k1r = void 0),
			(this.NPo = void 0),
			(this.ParentUiItem = void 0),
			(this.UsePool = !1),
			(this.SkipDestroyActor = !1),
			(this.F1r = !1),
			(this.OpenParam = void 0),
			(this.V1r = ""),
			(this.H1r = []),
			(this.u9 = []),
			(this.Parent = void 0),
			(this.j1r = new Map()),
			(this.ComponentRegisterInfos = []),
			(this.BtnBindInfo = []),
			(this.W1r = void 0),
			(this.UiPoolActorNew = void 0),
			(this.K1r = () => {
				this.IsDestroyOrDestroying ||
					(Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug(
							"UiComponent",
							17,
							"创建对象没有执行Destroy, 进行自动Destroy",
							["Ts类名", this.constructor.name],
						),
					this.Destroy());
			}),
			(this.PostClickAudioEvent = (t) => {
				(t = (0, AudioSystem_1.parseAudioEventPath)(t)) &&
					AudioSystem_1.AudioSystem.PostEvent(t);
			}),
			(this.Q1r = new UiImageSettingModule_1.UiImageSettingModule()),
			(this.X1r = new UiNiagaraSettingModule_1.UiNiagaraSettingModule()),
			(this.bQe = new UiPrefabLoadModule_1.UiPrefabLoadModule()),
			(this.OnSequenceEvent = (t, e) => {});
	}
	OnRegisterComponent() {}
	OnBeforeCreate() {}
	async OnCreateAsync() {}
	async OnBeforeStartAsync() {}
	OnStart() {}
	OnBeforeShow() {}
	OnAfterShow() {}
	async OnBeforeHideAsync() {}
	OnBeforeHide() {}
	OnAfterHide() {}
	OnBeforeDestroy() {}
	OnAfterDestroy() {}
	OnBeforeCreateImplement() {}
	async OnCreateAsyncImplementImplement() {}
	OnAfterCreateImplement() {}
	OnStartImplement() {}
	async OnBeforeShowAsyncImplement() {}
	OnBeforeShowImplement() {}
	OnAfterShowImplement() {}
	async OnShowAsyncImplementImplement() {}
	async OnHideAsyncImplementImplement() {}
	async OnDestroyAsyncImplementImplement() {}
	OnBeforeHideImplement() {}
	OnAfterHideImplement() {}
	OnBeforeDestroyImplement() {}
	OnAfterDestroyImplement() {}
	async OnCreateAsyncImplement() {
		this.OnBeforeCreateImplement(), this.OnBeforeCreate();
		let t = !0;
		return (
			await Promise.all([
				this.$1r(),
				this.OnCreateAsyncImplementImplement(),
				this.OnCreateAsync(),
				...this.H1r.map(async (t) => t.CreateAsync()),
				...this.u9.map(async (t) => t.CreateAsync()),
			]).catch((e) => {
				e instanceof Error
					? Log_1.Log.CheckError() &&
						Log_1.Log.ErrorWithStack(
							"UiCore",
							17,
							"[OnCreateAsyncImplement] 加载失败",
							e,
							["component", this.constructor.name],
							["error", e.message],
						)
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"UiCore",
							17,
							"[OnCreateAsyncImplement] 加载异常",
							["component", this.constructor.name],
							["error", e],
						),
					(t = !1);
			}),
			this.OnAfterCreateImplement(),
			t
		);
	}
	async OnStartAsyncImplement() {
		await this.OnBeforeStartAsync(),
			this.OnStartImplement(),
			this.OnStart(),
			await Promise.all([
				...this.H1r.map(async (t) => t.StartAsync()),
				...this.u9.map(async (t) => t.StartAsync()),
			]);
	}
	OnStartImplementCompatible() {
		this.OnStartImplement(),
			this.OnStart(),
			this.H1r.forEach((t) => {
				t.StartCompatible();
			}),
			this.u9.forEach((t) => {
				t.StartCompatible();
			});
	}
	async OnShowAsyncImplement() {
		await this.OnBeforeShowAsyncImplement(),
			this.OnBeforeShowImplement(),
			this.OnBeforeShow(),
			this.SetUiActive(!0),
			await Promise.all([
				this.OnShowAsyncImplementImplement(),
				...this.H1r.map(async (t) => t.ShowAsync()),
				...this.u9.map(async (t) => t.ShowAsync()),
			]),
			this.OnAfterShowImplement(),
			this.OnAfterShow();
	}
	OnShowAsyncImplementImplementCompatible() {}
	OnShowImplementCompatible() {
		this.OnBeforeShowImplement(),
			this.OnBeforeShow(),
			this.SetUiActive(!0),
			this.OnShowAsyncImplementImplementCompatible(),
			this.H1r.forEach((t) => {
				t.ShowCompatible();
			}),
			this.u9.forEach((t) => {
				t.ShowCompatible();
			}),
			this.OnAfterShowImplement(),
			this.OnAfterShow();
	}
	async OnHideAsyncImplement() {
		await this.OnBeforeHideAsync(),
			this.OnBeforeHide(),
			this.OnBeforeHideImplement(),
			await Promise.all([
				...this.H1r.map(async (t) => t.HideAsync()),
				...this.u9.map(async (t) => t.HideAsync()),
				this.OnHideAsyncImplementImplement(),
			]),
			this.WaitToDestroy || this.SetUiActive(!1),
			this.OnAfterHide(),
			this.OnAfterHideImplement();
	}
	OnHideAsyncImplementImplementCompatible() {}
	OnHideImplementCompatible() {
		this.OnBeforeHide(),
			this.OnBeforeHideImplement(),
			this.H1r.forEach((t) => {
				t.HideCompatible();
			}),
			this.u9.forEach((t) => {
				t.HideCompatible();
			}),
			this.OnHideAsyncImplementImplementCompatible(),
			this.SetUiActive(!1),
			this.OnAfterHide(),
			this.OnAfterHideImplement();
	}
	async OnDestroyAsyncImplement() {
		this.OnBeforeDestroy(),
			this.OnBeforeDestroyImplement(),
			await Promise.all([
				...this.H1r.map(async (t) => t.DestroyAsync()),
				...this.u9.map(async (t) => t.CloseMeAsync()),
			]),
			await this.OnDestroyAsyncImplementImplement(),
			this.Y1r(),
			this.OnAfterDestroy(),
			this.OnAfterDestroyImplement();
	}
	OnDestroyAsyncImplementImplementCompatible() {}
	OnDestroyImplementCompatible() {
		this.OnBeforeDestroy(),
			this.OnBeforeDestroyImplement(),
			this.H1r.forEach((t) => {
				t.DestroyCompatible();
			}),
			[...this.u9].forEach((t) => {
				t.DestroyCompatible();
			}),
			this.OnDestroyAsyncImplementImplementCompatible(),
			this.Y1r(),
			this.OnAfterDestroy(),
			this.OnAfterDestroyImplement();
	}
	SetRootActorLoadInfoByPath(t, e, i = !1, n = !1) {
		(this.V1r = t), (this.ParentUiItem = e), (this.UsePool = i), (this.F1r = n);
	}
	SetRootActorLoadInfo(t, e, i = !1, n = !1) {
		(this.V1r =
			ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t)),
			(this.ParentUiItem = e),
			(this.UsePool = i),
			(this.F1r = n);
	}
	async CreateThenShowByResourceIdAsync(t, e, i = !1) {
		(t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t)),
			await this.CreateThenShowByPathAsync(t, e, i);
	}
	async CreateByResourceIdAsync(t, e, i = !1) {
		(t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t)),
			await this.CreateByPathAsync(t, e, i);
	}
	async CreateByPathAsync(t, e, i = !1) {
		await this.OnlyCreateByPathAsync(t, e, i), await this.StartAsync();
	}
	async OnlyCreateByPathAsync(t, e, i = !1) {
		this.SetRootActorLoadInfoByPath(t, e, i), await this.CreateAsync();
	}
	async CreateThenShowByPathAsync(t, e, i = !1) {
		await this.CreateByPathAsync(t, e, i), await this.ShowAsync();
	}
	async CreateThenShowByActorAsync(t, e = void 0, i = !1) {
		await this.CreateByActorAsync(t, e, i), await this.ShowAsync();
	}
	async CreateByActorAsync(t, e = void 0, i = !1) {
		await this.OnlyCreateByActorAsync(t, e, i), await this.StartAsync();
	}
	async OnlyCreateByActorAsync(t, e = void 0, i = !1) {
		(this.UsePool = i),
			void 0 !== e && (this.OpenParam = e),
			this.oL(t),
			await this.CreateAsync();
	}
	SetActive(t) {
		t
			? this.IsShowOrShowing || this.Show()
			: this.IsHideOrHiding || this.Hide();
	}
	GetActive() {
		return !!this.RootItem?.IsValid() && this.RootItem.IsUIActiveSelf();
	}
	IsUiActiveInHierarchy() {
		return !!this.RootItem?.IsValid() && this.RootItem.IsUIActiveInHierarchy();
	}
	SetUiActive(t) {
		this.RootItem?.IsValid() && this.RootItem.SetUIActive(t);
	}
	InAsyncLoading() {
		return this.IsCreating;
	}
	async $1r() {
		var t = this.V1r;
		if (t) {
			let e;
			(e = this.UsePool
				? ((this.UiPoolActorNew = await UiActorPool_1.UiActorPool.GetAsync(
						t,
						this.ParentUiItem,
					)),
					UiActorPool_1.UiActorPool.SetKeepWhileCleaning(t, this.F1r),
					this.UiPoolActorNew.Actor)
				: await this.LoadPrefabAsync(t, this.ParentUiItem)).IsValid() &&
				(this.IsDestroy &&
					Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"UiCore",
						11,
						"当前Actor创建完成,界面已经处于销毁状态",
						["path", t],
					),
				this.oL(e));
		}
	}
	oL(t) {
		return t?.IsValid()
			? ((this.k1r = t),
				(this.NPo = this.k1r.GetComponentByClass(UE.UIItem.StaticClass())),
				this.J1r(),
				this.z1r(),
				this.BindOnClickEvents(),
				this.SetUiActive(!1),
				this.k1r.OnDestroyed.Add(this.K1r),
				!0)
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"UiCore",
						17,
						"[SetActor] actor is not UIBaseActor",
						["uiActor", t],
						["path", LguiUtil_1.LguiUtil.GetActorFullPath(t)],
					),
				!1);
	}
	J1r() {
		this.OnRegisterComponent(),
			(this.RootActor = this.Z1r() ?? this.k1r),
			(this.RootItem = this.RootActor.GetComponentByClass(
				UE.UIItem.StaticClass(),
			));
	}
	Z1r() {
		var t = this.k1r;
		let e = LguiUtil_1.LguiUtil.GetComponentsRegistry(t),
			i = t;
		if (
			(e ||
				!(i = LguiUtil_1.LguiUtil.GetChildActorByHierarchyIndex(t)) ||
				(e = LguiUtil_1.LguiUtil.GetComponentsRegistry(i)) ||
				((i = LguiUtil_1.LguiUtil.GetChildActorByHierarchyIndex(i)) &&
					(e = LguiUtil_1.LguiUtil.GetComponentsRegistry(i))),
			e)
		) {
			var n = e.Components.Num();
			for (const t of this.ComponentRegisterInfos) {
				var o = t[0];
				n <= o ||
					((o = e.Components.Get(o)?.GetComponentByClass(t[1].StaticClass()))
						? (this.j1r.set(t[0], [t[1], o]), this.e_r(t[1], o))
						: Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"UiCore",
								17,
								"[FindInitedComponentRegistryActor]请该UI负责人和程序检查以下路径的LGUIComponentsRegistry组件, 检查是否缺失以下类型的组件",
								["节点全路径为", LguiUtil_1.LguiUtil.GetActorFullPath(i)],
								["缺失组件的索引为", t[0]],
								["缺失的组件类型为", t[1].StaticClass().GetName()],
							));
			}
			return i;
		}
	}
	DestroyOverride() {
		return !1;
	}
	Y1r() {
		this.UnBindOnClickEvents(),
			this.t_r(),
			this.i_r(),
			this.ClearUiPrefabLoadModule(),
			this.j1r.clear(),
			(this.BtnBindInfo.length = 0),
			(this.u9.length = 0),
			this.o_r(),
			(this.H1r.length = 0),
			(this.OpenParam = void 0),
			this.r_r();
	}
	r_r() {
		this.SkipDestroyActor ||
			(this.RootActor?.OnDestroyed.Remove(this.K1r),
			this.DestroyOverride() ||
				(this.UsePool
					? this.n_r()
					: this.k1r?.IsValid() &&
						UE.LGUIBPLibrary.DestroyActorWithHierarchy(this.k1r, !0)),
			(this.k1r = void 0),
			(this.RootActor = void 0),
			(this.RootItem = void 0));
	}
	GetRootItem() {
		return this.RootItem;
	}
	GetRootActor() {
		return this.RootActor;
	}
	GetOriginalActor() {
		return this.k1r;
	}
	GetOriginalItem() {
		return this.NPo;
	}
	GetClosePromiseImplement() {}
	n_r() {
		UiActorPool_1.UiActorPool.RecycleAsync(this.UiPoolActorNew, this.V1r),
			(this.UiPoolActorNew = void 0);
	}
	e_r(t, e) {
		var i;
		(t === UE.UIButtonComponent || t === UE.UIExtendToggle) &&
			((i = e).OnPostAudioEvent.Bind((t) => {
				this.PostClickAudioEvent(t);
			}),
			i.OnPostAudioStateEvent.Bind((t, e) => {
				this.PostClickAudioEvent(e);
			}));
	}
	t_r() {
		for (var [t, e] of this.j1r.values()) {
			var i;
			(t === UE.UIButtonComponent || t === UE.UIExtendToggle) &&
				((i = e).OnPostAudioEvent.Unbind(), i.OnPostAudioStateEvent.Unbind());
		}
	}
	BindOnClickEvents() {
		for (const t of this.BtnBindInfo)
			this.j1r.has(t[0])
				? this.BindOnClickEvent(t[0], t[1])
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"UiComponent",
						21,
						"检查BtnBindInfo中的项是否没有在ComponentsRegisterInfo中注册",
					);
	}
	BindOnClickEvent(t, e) {
		(t = this.j1r.get(t)) &&
			(t[0] === UE.UIButtonComponent
				? t[1].OnClickCallBack.Bind(e)
				: t[0] === UE.UIToggleComponent
					? t[1].OnToggleEvent.Bind(e)
					: t[0] === UE.UIExtendToggle
						? t[1].OnStateChange.Add(e)
						: t[0] === UE.UISliderComponent
							? t[1].OnValueChangeCb.Bind(e)
							: t[0] === UE.UITextInputComponent &&
								t[1].OnInputActivateDelegate.Bind(e));
	}
	UnBindOnClickEvents() {
		for (const t of this.BtnBindInfo) this.UnBindOnClickEvent(t[0]);
	}
	UnBindOnClickEvent(t) {
		var e;
		(t = this.j1r.get(t)) &&
			(t[0] === UE.UIButtonComponent
				? t[1].OnClickCallBack.Unbind()
				: t[0] === UE.UIToggleComponent
					? t[1].OnToggleEvent.Unbind()
					: t[0] === UE.UIExtendToggle
						? ((e = t[1]).OnStateChange.Clear(), e.CanExecuteChange.Unbind())
						: t[0] === UE.UISliderComponent
							? t[1].OnValueChangeCb.Unbind()
							: t[0] === UE.UITextInputComponent &&
								t[1].OnInputActivateDelegate.Unbind());
	}
	GetButton(t) {
		if ((t = this.j1r.get(t)) && t[0] === UE.UIButtonComponent) return t[1];
	}
	GetItem(t) {
		if ((t = this.j1r.get(t)) && t[0] === UE.UIItem) return t[1];
	}
	GetInteractionGroup(t) {
		if ((t = this.j1r.get(t)) && t[0] === UE.UIInteractionGroup) return t[1];
	}
	GetText(t) {
		if ((t = this.j1r.get(t)) && t[0] === UE.UIText) return t[1];
	}
	GetSprite(t) {
		if ((t = this.j1r.get(t)) && t[0] === UE.UISprite) return t[1];
	}
	GetTexture(t) {
		if ((t = this.j1r.get(t)) && t[0] === UE.UITexture) return t[1];
	}
	GetSlider(t) {
		if ((t = this.j1r.get(t)) && t[0] === UE.UISliderComponent) return t[1];
	}
	GetToggle(t) {
		if ((t = this.j1r.get(t)) && t[0] === UE.UIToggleComponent) return t[1];
	}
	GetExtendToggle(t) {
		if ((t = this.j1r.get(t)) && t[0] === UE.UIExtendToggle) return t[1];
	}
	GetExtendToggleGroup(t) {
		if ((t = this.j1r.get(t)) && t[0] === UE.UIExtendToggleGroup) return t[1];
	}
	GetScrollViewWithScrollbar(t) {
		if ((t = this.j1r.get(t)) && t[0] === UE.UIScrollViewWithScrollbarComponent)
			return t[1];
	}
	GetUIDynScrollViewComponent(t) {
		if ((t = this.j1r.get(t)) && t[0] === UE.UIDynScrollViewComponent)
			return t[1];
	}
	GetScrollScrollbar(t) {
		if ((t = this.j1r.get(t)) && t[0] === UE.UIScrollbarComponent) return t[1];
	}
	GetScrollView(t) {
		if ((t = this.j1r.get(t)) && t[0] === UE.UIScrollViewComponent) return t[1];
	}
	GetLoopScrollViewComponent(t) {
		if ((t = this.j1r.get(t)) && t[0] === UE.UILoopScrollViewComponent)
			return t[1];
	}
	GetDropdown(t) {
		if ((t = this.j1r.get(t)) && t[0] === UE.UIDropdownComponent) return t[1];
	}
	GetInputText(t) {
		if ((t = this.j1r.get(t)) && t[0] === UE.UITextInputComponent) return t[1];
	}
	GetDraggable(t) {
		if ((t = this.j1r.get(t)) && t[0] === UE.UIDraggableComponent) return t[1];
	}
	GetUiNiagara(t) {
		if ((t = this.j1r.get(t)) && t[0] === UE.UINiagara) return t[1];
	}
	GetVerticalLayout(t) {
		if ((t = this.j1r.get(t)) && t[0] === UE.UIVerticalLayout) return t[1];
	}
	GetHorizontalLayout(t) {
		if ((t = this.j1r.get(t)) && t[0] === UE.UIHorizontalLayout) return t[1];
	}
	GetMultiTemplateLayout(t) {
		if ((t = this.j1r.get(t)) && t[0] === UE.UIMultiTemplateLayout) return t[1];
	}
	GetGridLayout(t) {
		if ((t = this.j1r.get(t)) && t[0] === UE.UIGridLayout) return t[1];
	}
	GetLayoutBase(t) {
		if ((t = this.j1r.get(t)) && t[0] === UE.UILayoutBase) return t[1];
	}
	GetUITextTransition(t) {
		if ((t = this.j1r.get(t)) && t[0] === UE.UITextTransition) return t[1];
	}
	GetUiTextureTransitionComponent(t) {
		if ((t = this.j1r.get(t)) && t[0] === UE.UITextureTransitionComponent)
			return t[1];
	}
	GetUiSpriteTransition(t) {
		if ((t = this.j1r.get(t)) && t[0] === UE.UISpriteTransition) return t[1];
	}
	GetUiExtendToggleSpriteTransition(t) {
		if ((t = this.j1r.get(t)) && t[0] === UE.UIExtendToggleSpriteTransition)
			return t[1];
	}
	GetUiExtendToggleTextureTransition(t) {
		if ((t = this.j1r.get(t)) && t[0] === UE.UIExtendToggleTextureTransition)
			return t[1];
	}
	z1r() {
		this.W1r = this.GetRootActor()?.GetComponentByClass(
			UE.GuideHookRegistry.StaticClass(),
		);
	}
	GetGuideUiItem(t) {
		if (this.W1r && (t = this.W1r.GuideHookComponents.Get(t)))
			return t.GetUIItem();
	}
	GetGuideUiItemAndUiItemForShowEx(t) {
		Log_1.Log.CheckError() &&
			Log_1.Log.Error(
				"Guide",
				17,
				"引导步骤已配置的聚焦界面未实现GetGuideUiItemEx函数",
			);
	}
	GetGuideScrollViewToLock() {}
	SetButtonUiActive(t, e) {
		(t = this.GetButton(t))
			? t.GetRootComponent().SetUIActive(e)
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"UiCommon",
					17,
					"设置Button可见性错误，Button组件为空！",
				);
	}
	SetSpriteByPath(t, e, i, n = void 0, o = void 0) {
		n
			? this.Q1r.SetSpriteByPathSync(t, e, i, n, o)
			: this.Q1r.SetSpriteByPathAsync(t, e, i, o);
	}
	SetTextureByPath(t, e, i = void 0, n = void 0) {
		i
			? this.Q1r.SetTextureByPathSync(t, e, i, n)
			: this.Q1r.SetTextureByPathAsync(t, e, n);
	}
	SetItemIcon(t, e, i = void 0, n = void 0) {
		i
			? this.Q1r.SetItemIconSync(t, e, i, n)
			: this.Q1r.SetItemIconAsync(t, e, n);
	}
	SetQualityIconById(t, e, i = void 0, n = "BackgroundSprite", o = void 0) {
		i
			? this.Q1r.SetQualityIconByIdSync(t, e, i, n, o)
			: this.Q1r.SetQualityIconByIdAsync(t, e, n, o);
	}
	SetItemQualityIcon(t, e, i = void 0, n = "BackgroundSprite", o = void 0) {
		i
			? this.Q1r.SetItemQualityIconSync(t, e, i, n, o)
			: this.Q1r.SetItemQualityIconAsync(t, e, n, o);
	}
	SetRoleIcon(t, e, i, n = void 0, o) {
		n
			? this.Q1r.SetRoleIconSync(t, e, i, n, o)
			: this.Q1r.SetRoleIconAsync(t, e, i, o);
	}
	SetElementIcon(t, e, i, n = void 0) {
		n
			? this.Q1r.SetElementIconSync(t, e, i, n)
			: this.Q1r.SetElementIcon(t, e, i);
	}
	SetMonsterIcon(t, e, i, n = void 0) {
		n
			? this.Q1r.SetMonsterIconSync(t, e, i, n)
			: this.Q1r.SetMonsterIconAsync(t, e, i);
	}
	SetDungeonEntranceIconSync(t, e, i, n = void 0) {
		n
			? this.Q1r.SetDungeonEntranceIconSync(t, e, i, n)
			: this.Q1r.SetDungeonEntranceIconAsync(t, e, i);
	}
	SetNiagaraTextureByPath(t, e, i, n, o = void 0, r = void 0) {
		o
			? this.Q1r.SetNiagaraTextureSync(t, e, i, n, o, r)
			: this.Q1r.SetNiagaraTextureAsync(t, e, i, n, r);
	}
	SetNiagaraSystemByPath(t, e, i = void 0) {
		this.X1r.SetNiagaraByPathAsync(t, e, i);
	}
	i_r() {
		this.Q1r.Clear(), this.X1r.Clear();
	}
	async LoadPrefabAsync(t, e) {
		return this.bQe.LoadPrefabAsync(t, e);
	}
	ClearUiPrefabLoadModule() {
		this.bQe.Clear();
	}
	AddUiBehavior(t) {
		this.AddUiBehaviorProxy(new UiBehaviorBase_1.UiBehaviorBaseProxy(t));
	}
	AddUiBehaviorProxy(t) {
		this.H1r.push(t);
	}
	AddChild(t) {
		this.u9.push(t), (t.Parent = this);
	}
	o_r() {
		var t;
		!this.Parent ||
			(t = this.Parent?.u9.indexOf(this)) < 0 ||
			(this.Parent.u9.splice(t, 1), (this.Parent = void 0));
	}
	GetLastChild() {
		var t = this.u9.length;
		if (0 !== t) return this.u9[t - 1];
	}
	Register() {}
	Begin() {}
	OnBegin(t = 0) {}
	OnChangeComponentActiveState(t) {}
	OnRegister() {}
	OnCreate() {}
	OnShow() {}
	OnHide() {}
	OnPrepareHide(t = 0) {}
	OnEnd() {}
	OnDestroy() {}
	OnStartSequenceFinish() {}
	OnPlayCloseSequence() {
		return !1;
	}
	OnStackShow() {}
	OnShowSequenceFinish() {}
	OnActiveSequenceFinish() {}
	OnCheckLoadSceneCondition() {
		return !0;
	}
	OnCheckReleaseSceneCondition() {
		return !0;
	}
	Start() {}
	End() {}
	InitParam() {}
	InitComponentsData() {}
	OnClearComponentsData() {}
	Create() {}
	ClearComponentsData() {
		return this.Destroy(), !0;
	}
	async ConstructorAsync(t, e, i = !1) {
		return this.CreateThenShowByResourceIdAsync(t, e, i);
	}
	get ComponentsRegisterInfo() {
		return this.ComponentRegisterInfos;
	}
	set ComponentsRegisterInfo(t) {
		this.ComponentRegisterInfos = t;
	}
	SetRootActor(t, e = !0) {
		e ? this.CreateThenShowByActor(t) : this.CreateByActor(t);
	}
	CreateThenShowByActor(t, e = void 0) {
		void 0 !== e && (this.OpenParam = e),
			this.oL(t),
			this.StartCompatible(),
			this.ShowCompatible();
	}
	CreateByActor(t, e = void 0) {
		void 0 !== e && (this.OpenParam = e), this.oL(t), this.StartCompatible();
	}
}
exports.UiPanelBase = UiPanelBase;
