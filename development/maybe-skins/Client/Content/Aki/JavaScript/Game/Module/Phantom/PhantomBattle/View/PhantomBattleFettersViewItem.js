"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.VisionDetailMonsterItem =
		exports.VisionDetailMonsterItemData =
		exports.PhantomBattleFettersViewItem =
			void 0);
const UE = require("ue"),
	CustomPromise_1 = require("../../../../../Core/Common/CustomPromise"),
	Log_1 = require("../../../../../Core/Common/Log"),
	MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
	FilterEntrance_1 = require("../../../Common/FilterSort/Filter/View/FilterEntrance"),
	SortEntrance_1 = require("../../../Common/FilterSort/Sort/View/SortEntrance"),
	LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
	LoopScrollSmallItemGrid_1 = require("../../../Common/SmallItemGrid/LoopScrollSmallItemGrid"),
	UiSceneManager_1 = require("../../../UiComponent/UiSceneManager"),
	UiModelUtil_1 = require("../../../UiModel/UiModelUtil"),
	GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
	LguiUtil_1 = require("../../../Util/LguiUtil"),
	LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView"),
	PhantomBattleItemView_1 = require("./PhantomBattleItemView");
class PhantomBattleFettersViewItem extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.e6i = 14),
			(this.t6i = void 0),
			(this.i6i = void 0),
			(this.aft = void 0),
			(this.hft = void 0),
			(this.eGe = void 0),
			(this.Hli = void 0),
			(this.EPe = void 0),
			(this.o6i = 0),
			(this.r6i = 0),
			(this.n6i = !1),
			(this.OnFastFilter = void 0),
			(this.s6i = () => new VisionDetailMonsterItem()),
			(this.sGe = () => new VisionFetterDescItem()),
			(this.z9e = () => {
				var e = new PhantomBattleItemView_1.PhantomFettersItem();
				return e.BindOnItemButtonClickedCallback(this.UIt), e;
			}),
			(this.bpt = (e) => {
				(this.i6i = e), this.Mni(), this.a6i(e);
			}),
			(this.Mni = () => {
				if (this.i6i)
					if (
						(this.t6i.DeselectCurrentGridProxy(),
						this.t6i.ReloadData(this.i6i),
						0 === this.r6i)
					)
						this.t6i.SelectGridProxy(0), this.t6i.RefreshGridProxy(0);
					else {
						let t = 0;
						var e = this.i6i.length;
						for (let i = 0; i < e; i++)
							if (this.i6i[i].Id === this.r6i) {
								t = i;
								break;
							}
						this.t6i.ScrollToGridIndex(t, !0),
							this.t6i.SelectGridProxy(t),
							this.t6i.RefreshGridProxy(t);
					}
				else
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("Phantom", 28, "没有羁绊幻象");
			}),
			(this.UIt = (e) => {
				this.t6i.DeselectCurrentGridProxy();
				var t = this.i6i.indexOf(e);
				this.t6i.IsGridDisplaying(t) &&
					(this.h6i(e),
					this.t6i.SelectGridProxy(t),
					this.t6i.RefreshGridProxy(t));
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UILoopScrollViewComponent],
			[1, UE.UIItem],
			[2, UE.UIText],
			[3, UE.UIVerticalLayout],
			[4, UE.UIText],
			[5, UE.UIButtonComponent],
			[6, UE.UIItem],
			[7, UE.UIItem],
			[8, UE.UIItem],
			[9, UE.UIGridLayout],
			[10, UE.UIText],
		]),
			this.OnFastFilter && (this.BtnBindInfo = [[5, this.OnFastFilter]]);
	}
	OnStart() {
		(this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(
			this.GetRootItem(),
		)),
			(this.t6i = new LoopScrollView_1.LoopScrollView(
				this.GetLoopScrollViewComponent(0),
				this.GetItem(1).GetOwner(),
				this.z9e,
			)),
			(this.aft = new FilterEntrance_1.FilterEntrance(
				this.GetItem(6),
				this.bpt,
			)),
			(this.hft = new SortEntrance_1.SortEntrance(this.GetItem(7), this.bpt)),
			(this.eGe = new GenericLayout_1.GenericLayout(
				this.GetVerticalLayout(3),
				this.sGe,
			)),
			(this.Hli = new GenericLayout_1.GenericLayout(
				this.GetGridLayout(9),
				this.s6i,
			)),
			this.aft.SetUiActive(
				!ModelManager_1.ModelManager.CalabashModel.OnlyShowBattleFettersTab,
			),
			this.hft.SetUiActive(
				!ModelManager_1.ModelManager.CalabashModel.OnlyShowBattleFettersTab,
			);
	}
	async PlayStartSequence() {
		var e = new CustomPromise_1.CustomPromise();
		await this.EPe.PlaySequenceAsync("Start", e);
	}
	async PlayHideSequence() {
		var e = new CustomPromise_1.CustomPromise();
		await this.EPe.PlaySequenceAsync("Close", e);
	}
	OnBeforeShow() {
		var e;
		UiSceneManager_1.UiSceneManager.HasVisionSkeletalHandle() &&
			((e =
				UiSceneManager_1.UiSceneManager.GetVisionSkeletalHandle().Model?.CheckGetComponent(
					0,
				)),
			(this.n6i = e?.GetVisible() ?? !1),
			e?.SetVisible(!1)),
			this.l6i();
	}
	l6i() {
		var e =
			ModelManager_1.ModelManager.CalabashModel.GetPhantomFetterGroupList();
		this.aft.UpdateData(this.e6i, e), this.hft.UpdateData(this.e6i, e);
	}
	a6i(e) {
		this.GetItem(8).SetUIActive(0 < e.length),
			this.GetButton(5).RootUIComp.SetUIActive(
				0 < e.length && void 0 !== this.OnFastFilter,
			);
	}
	_6i(e) {
		var t = new Array(),
			i = e.length;
		for (let o = 0; o < i; o++) t.push(new VisionDetailMonsterItemData(e[o]));
		var o =
			((o = 0 < i) && this.Hli.RefreshByData(t),
			this.GetGridLayout(9).RootUIComp.SetUIActive(o),
			ModelManager_1.ModelManager.PhantomBattleModel.GetMonsterFindCountByMonsterIdArray(
				e,
			));
		this.GetText(10).SetText(o + "/" + e.length);
	}
	SelectByFetterId(e) {
		var t = this.i6i.findIndex((t) => t.Id === e);
		0 < t && (this.t6i.ScrollToGridIndex(t, !0), this.t6i.SelectGridProxy(t));
	}
	h6i(e) {
		(this.o6i = e.Id),
			this.C4e(e.FetterGroupName),
			this.nOe(e.FetterMap),
			this.u6i(e.FetterGroupDesc),
			(e =
				ModelManager_1.ModelManager.PhantomBattleModel.GetFetterGroupMonsterIdArray(
					this.o6i,
				)),
			(e = Array.from(e)),
			this._6i(e);
	}
	C4e(e) {
		this.GetText(2).ShowTextNew(e);
	}
	nOe(e) {
		const t = new Array();
		e.forEach((e, i) => {
			var o = new DescData();
			(o.Key = i), (o.Value = e), t.push(o);
		}),
			this.eGe.RefreshByData(t, void 0, !0),
			"Switch" === this.EPe?.GetCurrentSequence()
				? this.EPe?.ReplaySequenceByKey("Switch")
				: (this.EPe?.StopCurrentSequence(),
					this.EPe?.PlayLevelSequenceByName("Switch"));
	}
	u6i(e) {
		this.GetText(4).ShowTextNew(e);
	}
	GetCurrentSelectGroupId() {
		return this.o6i;
	}
	OnBeforeDestroy() {
		var e;
		(ModelManager_1.ModelManager.PhantomBattleModel.CurrentSelectedFetter =
			void 0),
			UiSceneManager_1.UiSceneManager.HasVisionSkeletalHandle() &&
				(e =
					UiSceneManager_1.UiSceneManager.GetVisionSkeletalHandle()?.Model) &&
				UiModelUtil_1.UiModelUtil.SetVisible(e, this.n6i),
			this.t6i && (this.t6i.ClearGridProxies(), (this.t6i = void 0));
	}
}
exports.PhantomBattleFettersViewItem = PhantomBattleFettersViewItem;
class DescData {
	constructor() {
		(this.Key = 0), (this.Value = 0);
	}
}
class VisionFetterDescItem extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.ScrollViewDelegate = void 0),
			(this.GridIndex = 0),
			(this.DisplayIndex = 0);
	}
	Refresh(e, t, i) {
		this.Update(e);
	}
	Clear() {
		this.OnClear();
	}
	OnClear() {}
	OnSelected(e) {}
	OnDeselected(e) {}
	GetKey(e, t) {
		return this.GridIndex;
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIText],
		];
	}
	Update(e) {
		var t = e.Value;
		this.L4e(t), this.C4e(t, e.Key);
	}
	C4e(e, t) {
		(e =
			ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomFetterById(
				e,
			)),
			(e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Name)),
			this.GetText(0).SetText(e ?? ""),
			LguiUtil_1.LguiUtil.SetLocalTextNew(
				this.GetText(0),
				"VisionFetterDetailViewName",
				e,
				t.toString(),
			);
	}
	L4e(e) {
		(e =
			ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomFetterById(
				e,
			)),
			LguiUtil_1.LguiUtil.SetLocalTextNew(
				this.GetText(1),
				e.EffectDescription,
				...e.EffectDescriptionParam,
			);
	}
}
class VisionDetailMonsterItemData {
	constructor(e = 0, t = 0) {
		(this.MonsterId = e), (this.QualityId = t);
	}
}
exports.VisionDetailMonsterItemData = VisionDetailMonsterItemData;
class VisionDetailMonsterItem extends LoopScrollSmallItemGrid_1.LoopScrollSmallItemGrid {
	constructor() {
		super(...arguments),
			(this.c6i = 0),
			(this.c2e = () => {}),
			(this.m6i = () => {
				ModelManager_1.ModelManager.FunctionModel.IsOpen(10023)
					? ControllerHolder_1.ControllerHolder.AdventureGuideController.JumpToTargetView(
							"MonsterDetectView",
							ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashDevelopRewardByMonsterId(
								this.c6i,
							)?.MonsterProbeId,
						)
					: ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
							"NoJumpTo",
						);
			});
	}
	OnStart() {
		this.BindOnExtendToggleClicked(this.c2e);
	}
	OnExtendToggleClicked() {
		this.m6i();
	}
	OnExtendToggleStateChanged(e) {
		this.SetSelected(!1, !1);
	}
	OnRefresh(e, t, i) {
		this.Refresh(e);
	}
	Refresh(e) {
		this.c6i = e.MonsterId;
		var t = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(
				1,
				this.c6i,
			),
			i = ModelManager_1.ModelManager.RoleModel.GetCurSelectMainRoleInstance(),
			o = i?.GetPhantomData()?.GetDataMap();
		let r = 0;
		if (o)
			for (var [, a] of o)
				if (a?.GetConfig().MonsterId === this.c6i) {
					r = i?.GetRoleId();
					break;
				}
		if (
			(o =
				ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashDevelopRewardByMonsterId(
					this.c6i,
				))
		) {
			let i;
			(t = void 0 !== t),
				0 < e.QualityId &&
					(i = (n =
						ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomItemIdArrayByMonsterId(
							this.c6i,
						))[e.QualityId - 1]);
			var n = {
				Data: e,
				Type: 3,
				ItemConfigId: i,
				BottomText: "",
				IsNotFoundVisible: !t,
				MonsterId: o.MonsterInfoId,
				IconHidden: !t,
			};
			(n.VisionRoleHeadInfo = r), this.Apply(n);
		}
	}
}
exports.VisionDetailMonsterItem = VisionDetailMonsterItem;
