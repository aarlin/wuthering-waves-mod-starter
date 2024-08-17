"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RouletteAssemblyView = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
	PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem"),
	ButtonItem_1 = require("../../Common/Button/ButtonItem"),
	SortEntrance_1 = require("../../Common/FilterSort/Sort/View/SortEntrance"),
	ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine"),
	SkipTaskManager_1 = require("../../SkipInterface/SkipTaskManager"),
	LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView"),
	RouletteDefine_1 = require("../Data/RouletteDefine"),
	RouletteComponentAssembly_1 = require("../RouletteComponent/RouletteComponentAssembly"),
	RouletteController_1 = require("../RouletteController"),
	RouletteInputManager_1 = require("../RouletteInputManager"),
	RouletteAssemblyGridItem_1 = require("./RouletteAssemblyGridItem"),
	RouletteAssemblyTips_1 = require("./RouletteAssemblyTips");
class RouletteAssemblyView extends UiTickViewBase_1.UiTickViewBase {
	constructor() {
		super(...arguments),
			(this.v0o = 0),
			(this.oPi = 0),
			(this.M0o = 0),
			(this.S0o = void 0),
			(this.E0o = void 0),
			(this.y0o = void 0),
			(this.I0o = 1),
			(this.ToggleLeft = void 0),
			(this.ToggleRight = void 0),
			(this.T0o = void 0),
			(this.L0o = void 0),
			(this.D0o = void 0),
			(this.R0o = void 0),
			(this.U0o = 0),
			(this.A0o = void 0),
			(this.lqe = void 0),
			(this.P0o = void 0),
			(this.hft = void 0),
			(this.RNt = !0),
			(this.x0o = () => {
				var e = 0 === this.w0o ? 1 : 0;
				this.w0o = e;
			}),
			(this.dKe = (e, t, o) => {
				var i = this.B0o();
				this.oPi !== i &&
					(Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"Phantom",
							38,
							"检测到输入设备变化,切换装配界面表现",
							["新输入类型", i],
						),
					this.b0o(i));
			}),
			(this.q0o = (e) => {
				var t = this.T0o?.GridIndex;
				(this.T0o = e),
					void 0 !== t &&
						t !== this.T0o.GridIndex &&
						this.S0o.GetGridByIndex(t)?.SetGridToggleState(!1),
					this.S0o.SetCurrentGridByData(e),
					(this.w0o = 1);
			}),
			(this.G0o = (e, t) =>
				!this.T0o ||
				1 !== t ||
				((t = this.T0o.GridIndex === e.GridIndex),
				1 === this.oPi && t && this.x0o(),
				!t)),
			(this.TempKeepSelect = !1),
			(this.z9e = () => {
				var e = new RouletteAssemblyGridItem_1.RouletteAssemblyGridItem();
				return (
					e.BindOnExtendToggleStateChanged(this.N0o),
					e.BindOnCanExecuteChange(this.OBt),
					e
				);
			}),
			(this.N0o = (e) => {
				var t = e.State;
				e = e.Data;
				(this.L0o = e),
					1 === t &&
						(this.y0o.DeselectCurrentGridProxy(),
						this.y0o.SelectGridProxy(e.Index),
						this.O0o(),
						this.RefreshTips());
			}),
			(this.OBt = (e, t, o) => !this.L0o || 1 !== o || this.L0o.Id !== e.Id),
			(this.qft = () => {
				var e = this.L0o,
					t = ModelManager_1.ModelManager.RouletteModel.CopyRouletteData(
						this.T0o,
					),
					o = 2 === e.State;
				switch (((t.ShowIndex = !0), e.State)) {
					case 2:
						(t.Id = 0),
							(t.Name = void 0),
							(t.State = 2),
							0 === e.GridType
								? ModelManager_1.ModelManager.RouletteModel.SendExploreToolEquipLogData(
										e.Id,
										0,
									)
								: 2 === e.GridType &&
									ModelManager_1.ModelManager.RouletteModel.SendExploreToolEquipLogData(
										3001,
										0,
										e.Id,
									);
						break;
					case 0:
						(t.Id = e.Id),
							(t.State = 1),
							0 === e.GridType
								? (0 !== (i = this.T0o.Id) &&
										ModelManager_1.ModelManager.RouletteModel.SendExploreToolEquipLogData(
											i,
											0,
										),
									ModelManager_1.ModelManager.RouletteModel.SendExploreToolEquipLogData(
										e.Id,
										1,
									))
								: 2 === e.GridType &&
									(0 !== (i = this.T0o.Id) &&
										ModelManager_1.ModelManager.RouletteModel.SendExploreToolEquipLogData(
											3001,
											0,
											i,
										),
									ModelManager_1.ModelManager.RouletteModel.SendExploreToolEquipLogData(
										3001,
										1,
										e.Id,
									));
						break;
					case 1: {
						(t.Id = e.Id), (t.State = 1);
						var i = this.S0o.GetGridByValidId(e.Id),
							s = i.Data;
						(s.Id = this.T0o.Id),
							0 === this.T0o.Id && (s.State = 2),
							i.RefreshGrid(s);
						const o = s.DataIndex;
						this.k0o(o, s);
						break;
					}
				}
				this.S0o.RefreshCurrentGridData(t);
				const r = this.T0o.DataIndex;
				this.k0o(r, t), (this.T0o = t), this.Mni(o), this.O0o(), this.F0o();
			}),
			(this.V0o = (e, t) => {
				var o = e;
				let i = 0;
				if (this.TempKeepSelect)
					(i = this.y0o.GetSelectedGridIndex()), (this.TempKeepSelect = !1);
				else for (let e = 0; e < o.length; e++) 2 === o[e].State && (i = e);
				this.H0o(i, o);
			}),
			(this.j0o = (e) => {
				this.Ozt(1, e);
			}),
			(this.W0o = (e) => {
				this.Ozt(13, e);
			}),
			(this.K0o = () => {
				this.Q0o();
			}),
			(this.X0o = () => {
				this.$0o() ? this.Y0o() : this.CloseMe();
			}),
			(this.F0o = () => {
				var e, t, o;
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("Phantom", 38, "保存当前轮盘数据"),
					this.$0o() &&
						((e = this.R0o.get(0)),
						(t = this.R0o.get(1)),
						(o = this.R0o.get(2)),
						RouletteController_1.RouletteController.SaveRouletteDataRequest(
							e,
							t,
							o[0],
							!1,
						));
			}),
			(this.OnDefaultButtonClick = () => {
				this.w0o = 0;
				var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(55);
				e.FunctionMap.set(1, () => {
					ControllerHolder_1.ControllerHolder.ConfirmBoxController.CloseConfirmBoxView(),
						this.E0o.ActivateInput(!0);
				}),
					e.FunctionMap.set(2, () => {
						this.J0o(),
							ControllerHolder_1.ControllerHolder.ConfirmBoxController.CloseConfirmBoxView(),
							this.E0o.ActivateInput(!0);
					}),
					e.SetCloseFunction(() => {
						this.E0o.ActivateInput(!0);
					}),
					this.E0o.ActivateInput(!1),
					ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
						e,
					);
			});
	}
	OnRegisterComponent() {
		(this.v0o = ModelManager_1.ModelManager.PlatformModel.OperationType),
			(this.ComponentRegisterInfos = [
				[0, UE.UIItem],
				[1, UE.UIItem],
				[2, UE.UIItem],
				[3, UE.UIExtendToggle],
				[4, UE.UIExtendToggle],
				[5, UE.UILoopScrollViewComponent],
				[6, UE.UIItem],
				[7, UE.UIItem],
				[8, UE.UIItem],
				[9, UE.UIItem],
				[10, UE.UIItem],
			]),
			(this.BtnBindInfo = [
				[3, this.j0o],
				[4, this.W0o],
			]);
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnPlatformChanged,
			this.dKe,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnRouletteItemSelect,
				this.q0o,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnRouletteSaveDataChange,
				this.K0o,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnRouletteItemUnlock,
				this.x0o,
			);
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnPlatformChanged,
			this.dKe,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnRouletteItemSelect,
				this.q0o,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnRouletteSaveDataChange,
				this.K0o,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnRouletteItemUnlock,
				this.x0o,
			);
	}
	async OnBeforeStartAsync() {
		(this.P0o = new RouletteAssemblyTips_1.RouletteAssemblyTips()),
			await this.P0o.CreateByActorAsync(this.GetItem(8).GetOwner()),
			this.P0o.SetActive(!1);
	}
	OnStart() {
		var e = this.OpenParam;
		(this.M0o = e.RouletteType ?? 0),
			(this.oPi = this.B0o()),
			(this.A0o = new ButtonItem_1.ButtonItem(this.GetItem(7))),
			this.A0o.SetFunction(this.qft),
			this.A0o.SetActive(!1),
			(this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0))),
			(e =
				0 === this.M0o
					? "Text_ExploreToolsTitle_Text"
					: "Text_FuncToolsTitle_Text"),
			this.lqe.SetTitleLocalText(e),
			this.lqe.SetCloseCallBack(this.X0o),
			(this.ToggleLeft = this.GetExtendToggle(3)),
			this.ToggleLeft.CanExecuteChange.Bind(() =>
				this.z0o(this.ToggleLeft.ToggleState, 1),
			),
			(this.ToggleRight = this.GetExtendToggle(4)),
			this.ToggleRight.CanExecuteChange.Bind(() =>
				this.z0o(this.ToggleRight.ToggleState, 13),
			),
			this.GetItem(9).SetUIActive(!1),
			(this.hft = new SortEntrance_1.SortEntrance(this.GetItem(10), this.V0o)),
			this.hft.SetActive(!1),
			this.Z0o(),
			this.efo(),
			(e = this.GetItem(1));
		0 === this.M0o
			? (this.S0o =
					new RouletteComponentAssembly_1.RouletteComponentAssemblyExplore())
			: (this.S0o =
					new RouletteComponentAssembly_1.RouletteComponentAssemblyFunction()),
			this.S0o.SetRootActor(e.GetOwner(), !0),
			this.tfo(),
			this.ifo(),
			this.ofo(),
			this.S0o.SetAllGridToggleSelfInteractive(!0),
			this.S0o.AddAllGridToggleCanExecuteChangeEvent(this.G0o),
			this.rfo(),
			(this.w0o = 0),
			this.Q0o();
	}
	OnBeforeHide() {
		this.nfo();
	}
	OnBeforeDestroy() {
		this.S0o && (this.S0o.Destroy(), (this.S0o = void 0)),
			this.E0o && (this.E0o.Destroy(), (this.E0o = void 0)),
			this.y0o && (this.y0o.ClearGridProxies(), (this.y0o = void 0)),
			(this.T0o = void 0),
			this.D0o && this.D0o.clear(),
			this.R0o && this.R0o.clear(),
			this.P0o.Destroy(),
			this.A0o.Destroy(),
			this.lqe.Destroy(),
			this.hft.Destroy(),
			this.hft.ClearComponentsData(),
			(this.ToggleLeft = void 0),
			(this.ToggleRight = void 0);
	}
	OnBeforeShow() {
		this.RNt && (this.sfo(), (this.RNt = !1));
	}
	OnTick(e) {
		var [e, t] = this.E0o.Tick(e);
		this.S0o.Refresh(e, t);
	}
	get w0o() {
		return this.U0o;
	}
	set w0o(e) {
		switch ((this.U0o = e)) {
			case 0:
				switch ((this.S0o.SetTipsActive(!0), this.oPi)) {
					case 2:
						this.S0o.RefreshTipsByText("Text_ExploreToolsChooseMobile_Text"),
							this.S0o.SetNameVisible(!1),
							this.S0o.SetRingVisible(!1);
						break;
					case 1:
						this.S0o.RefreshTipsByText("Text_ExploreToolsChoosePC_Text"),
							this.S0o.SetRingVisible(!0);
						break;
					case 0:
						this.S0o.RefreshTipsByText("Text_ExploreToolsChoosePC_Text"),
							this.S0o.SetRingVisible(!1);
				}
				this.E0o.ActivateInput(!0);
				break;
			case 1:
				this.S0o.SetTipsActive(!1),
					this.S0o.SetRingVisible(!1),
					2 === this.oPi && this.S0o.SetNameVisible(!0),
					this.E0o.ActivateInput(!1),
					this.afo(),
					this.Mni(),
					this.O0o();
		}
	}
	GetGuideUiItemAndUiItemForShowEx(e) {
		var t;
		if (1 === e.length || isNaN(Number(e[0])))
			return (
				(t = Number(e[0])),
				(t = this.y0o?.GetGridAndScrollToByJudge(t, (e, t) => e === t.Id))
					? [t, t]
					: void 0
			);
		Log_1.Log.CheckError() &&
			Log_1.Log.Error("Guide", 54, "聚焦引导extraParam项配置有误", [
				"configParams",
				e,
			]);
	}
	ofo() {
		this.S0o.RefreshRouletteType();
	}
	ifo() {
		this.S0o.RefreshRoulettePlatformType(this.v0o);
	}
	tfo() {
		this.S0o.RefreshRouletteInputType(this.oPi);
	}
	b0o(e) {
		(this.oPi = e), this.tfo(), this.rfo(), (this.w0o = 0), this.sfo();
	}
	B0o() {
		let e;
		return (
			ModelManager_1.ModelManager.PlatformModel.IsGamepad()
				? (e = 1)
				: ModelManager_1.ModelManager.PlatformModel.IsPc()
					? (e = 0)
					: ModelManager_1.ModelManager.PlatformModel.IsMobile() && (e = 2),
			e
		);
	}
	rfo() {
		this.E0o?.Destroy(), (this.E0o = void 0);
		var e = this.GetItem(1).GetLGUISpaceAbsolutePosition();
		e = RouletteInputManager_1.AngleCalculator.ConvertLguiPosToScreenPos(
			e.X,
			e.Y,
		);
		(this.E0o = new RouletteInputManager_1.rouletteInputManager[this.oPi](
			e,
			0,
		)),
			this.E0o.BindEvent(),
			this.E0o.OnInit(),
			this.E0o.SetIsNeedEmpty(!1);
	}
	sfo() {
		this.S0o.Reset();
		var e = this.OpenParam.SelectGridIndex ?? 0;
		this.S0o.GetGridByIndex(e).SetGridToggleState(!0),
			1 === this.oPi ? (this.w0o = 0) : (this.w0o = 1);
	}
	$0o() {
		return this.hfo() || this.lfo() || this._fo();
	}
	CheckIsRouletteDataDefault() {
		return 0 === this.M0o
			? this.R0o.get(0).toString() ===
					ModelManager_1.ModelManager.RouletteModel.GetDefaultExploreSkillIdList().toString()
			: this.R0o.get(1).toString() ===
					ModelManager_1.ModelManager.RouletteModel.GetDefaultFunctionIdList().toString();
	}
	hfo() {
		return (
			this.R0o.get(0).toString() !==
			ModelManager_1.ModelManager.RouletteModel.ExploreSkillIdList.toString()
		);
	}
	lfo() {
		return (
			this.R0o.get(1).toString() !==
			ModelManager_1.ModelManager.RouletteModel.CurrentFunctionIdList.toString()
		);
	}
	_fo() {
		return (
			this.R0o.get(2).toString() !==
			[ModelManager_1.ModelManager.RouletteModel.CurrentEquipItemId].toString()
		);
	}
	Z0o() {
		(this.D0o =
			ModelManager_1.ModelManager.RouletteModel.CreateAssemblyGridData()),
			(this.R0o =
				ModelManager_1.ModelManager.RouletteModel.CreateTempAssemblyData());
	}
	ufo() {
		this.D0o && this.D0o.clear(),
			(this.D0o =
				ModelManager_1.ModelManager.RouletteModel.CreateAssemblyGridData());
		var e = this.R0o.get(2);
		this.R0o && this.R0o.clear(),
			(this.R0o =
				ModelManager_1.ModelManager.RouletteModel.CreateDefaultAssemblyData(e));
	}
	efo() {
		this.y0o = new LoopScrollView_1.LoopScrollView(
			this.GetLoopScrollViewComponent(5),
			this.GetItem(6).GetOwner(),
			this.z9e,
		);
	}
	cfo(e) {
		return (e = this.S0o.GetGridByValidId(e.Id)) ? e.Data.GridIndex + 1 : 0;
	}
	Mni(e = !1) {
		if (this.T0o) {
			var t = this.T0o.GridType,
				o = this.D0o.get(t),
				i = [];
			for (let e = 0; e < o.length; e++) {
				var s = o[e];
				(2 === t && o[e].ItemType !== this.I0o) ||
					((s.State = this.mfo(o[e], this.T0o)),
					(s.RelativeIndex = this.cfo(o[e])),
					i.push(s));
			}
			(this.TempKeepSelect = e), this.RefreshItemFilterSort(30, i);
		} else
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Phantom", 38, "未收到选中轮盘格子数据,无法刷新");
	}
	H0o(e, t) {
		(this.L0o = void 0),
			this.y0o.DeselectCurrentGridProxy(),
			this.GetLoopScrollViewComponent(5).RootUIComp.SetUIActive(0 < t.length),
			this.GetItem(9).SetUIActive(t.length <= 0),
			0 < t.length
				? (this.y0o.ReloadData(t),
					this.y0o.IsGridDisplaying(e) || this.y0o.ScrollToGridIndex(e),
					this.y0o.SelectGridProxy(e, !0))
				: (1 === this.oPi && (this.w0o = 0),
					this.P0o.SetActive(!1),
					this.O0o());
	}
	mfo(e, t) {
		let o = 0;
		return (
			this.R0o.get(t.GridType).includes(e.Id) && (o = 1), e.Id === t.Id ? 2 : o
		);
	}
	O0o() {
		if (this.L0o) {
			let e;
			switch (this.L0o.State) {
				case 2:
					e = "Text_PhantomTakeOff_Text";
					break;
				case 1:
					e = "Text_PhantomReplace_Text";
					break;
				case 0:
					e = "Text_PhantomPutOn_Text";
			}
			this.A0o.SetShowText(e), this.A0o.SetActive(!0);
		} else this.A0o.SetActive(!1);
	}
	k0o(e, t) {
		var o = this.R0o.get(t.GridType);
		0 <= e && e < o.length && (this.R0o.get(t.GridType)[e] = t.Id);
	}
	RefreshItemFilterSort(e, t) {
		this.hft.UpdateData(e, t), this.hft.SetActive(!1);
	}
	RefreshTips() {
		let e;
		switch (this.L0o.GridType) {
			case 1:
				return void this.P0o.SetActive(!1);
			case 0:
				this.P0o.SetActive(!0), (e = this.dfo(this.L0o));
				break;
			case 2:
				this.P0o.SetActive(!0), (e = this.Cfo(this.L0o));
		}
		this.P0o.Refresh(e);
	}
	dfo(e) {
		var t = new RouletteDefine_1.AssemblyTipsData(),
			o = ConfigManager_1.ConfigManager.RouletteConfig.GetExploreConfigById(
				e.Id,
			);
		(t.GridType = 0),
			(t.GridId = e.Id),
			(t.TextMain = o.CurrentSkillInfo),
			(t.IsIconTexture = !1),
			(t.IconPath = o.BackGround),
			(t.HelpId = o?.HelpId ?? 0),
			(t.Title = e.Name),
			(t.CanSetItemNum =
				ModelManager_1.ModelManager.RouletteModel.GetExploreSkillShowSetNumById(
					e.Id,
				)),
			(t.NeedItemMap = o.Cost);
		const i = [];
		return (
			o.Authorization.forEach((e, t) => {
				i.push(e);
			}),
			(t.Authorization = i),
			t
		);
	}
	Cfo(e) {
		var t = new RouletteDefine_1.AssemblyTipsData(),
			o = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(e.Id);
		if (
			((t.GridType = 2),
			(t.GridId = e.Id),
			(t.BgQuality = o.QualityId),
			(t.Title = e.Name),
			(t.TextMain = o.AttributesDescription),
			(t.TextSub = o.BgDescription),
			o.ItemAccess && 0 < o.ItemAccess?.length)
		)
			for (const e of o.ItemAccess) {
				var i = ConfigManager_1.ConfigManager.GetWayConfig.GetConfigById(e);
				i &&
					((i = {
						Id: e,
						Type: i?.Type,
						Text: i?.Description,
						SortIndex: i?.SortIndex,
						Function: () => {
							SkipTaskManager_1.SkipTaskManager.RunByConfigId(e);
						},
					}),
					t.GetWayData.push(i));
			}
		return t;
	}
	afo() {
		if (this.T0o) {
			var e = 2 === this.T0o.GridType;
			if ((this.GetItem(2).SetUIActive(e), e)) {
				let t = this.I0o;
				0 !== (e = this.T0o.Id) &&
					((t =
						ControllerHolder_1.ControllerHolder.SpecialItemController.IsSpecialItem(
							e,
						)
							? 13
							: 1),
					(this.I0o = t)),
					(1 === t ? this.ToggleLeft : this.ToggleRight).SetToggleState(1);
			}
		} else
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Phantom", 38, "未收到选中轮盘格子数据,无法刷新");
	}
	z0o(e, t) {
		return !e || this.I0o !== t;
	}
	Ozt(e, t) {
		1 === t &&
			this.I0o !== e &&
			((this.I0o = e),
			(1 === this.I0o ? this.ToggleRight : this.ToggleLeft).SetToggleState(0),
			this.Mni());
	}
	Q0o() {
		this.O0o();
	}
	nfo() {
		var e = 0 !== ModelManager_1.ModelManager.RouletteModel.CurrentEquipItemId,
			t = ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId,
			o = this.OpenParam;
		3002 === t && e
			? RouletteController_1.RouletteController.ExploreSkillSetRequest(3001)
			: void 0 === (t = o.EndSwitchSkillId) ||
				(3001 === t && !e) ||
				RouletteController_1.RouletteController.ExploreSkillSetRequest(t);
	}
	Y0o() {
		this.w0o = 0;
		var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(58);
		(e.IsEscViewTriggerCallBack = !1),
			e.FunctionMap.set(1, () => {
				this.CloseMe();
			}),
			e.FunctionMap.set(2, () => {
				this.F0o(), this.CloseMe();
			}),
			e.SetCloseFunction(() => {
				this.E0o.ActivateInput(!0);
			}),
			this.E0o.ActivateInput(!1),
			ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
				e,
			);
	}
	J0o() {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("Phantom", 38, "恢复轮盘为默认状态"),
			this.S0o.ResetAllGridDefault(),
			this.ufo(),
			this.Mni(),
			this.Q0o(),
			(this.w0o = 0);
	}
}
exports.RouletteAssemblyView = RouletteAssemblyView;
