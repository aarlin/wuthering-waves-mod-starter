"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MemoryFragmentMainView = void 0);
const UE = require("ue"),
	Log_1 = require("../../../Core/Common/Log"),
	Vector_1 = require("../../../Core/Utils/Math/Vector"),
	StringUtils_1 = require("../../../Core/Utils/StringUtils"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	GlobalData_1 = require("../../GlobalData"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	RedDotController_1 = require("../../RedDot/RedDotController"),
	UiBlurLogic_1 = require("../../Ui/Base/UiBlur/UiBlurLogic"),
	UiTickViewBase_1 = require("../../Ui/Base/UiTickViewBase"),
	PopupCaptionItem_1 = require("../../Ui/Common/PopupCaptionItem"),
	UiManager_1 = require("../../Ui/UiManager"),
	LevelSequencePlayer_1 = require("../Common/LevelSequencePlayer"),
	LoopScrollSmallItemGrid_1 = require("../Common/SmallItemGrid/LoopScrollSmallItemGrid"),
	MapDefine_1 = require("../Map/MapDefine"),
	PhotographController_1 = require("../Photograph/PhotographController"),
	GridProxyAbstract_1 = require("../Util/Grid/GridProxyAbstract"),
	GenericLayout_1 = require("../Util/Layout/GenericLayout"),
	LguiUtil_1 = require("../Util/LguiUtil"),
	LoopScrollView_1 = require("../Util/ScrollView/LoopScrollView"),
	WorldMapController_1 = require("../WorldMap/WorldMapController"),
	FragmentMemoryController_1 = require("./FragmentMemoryController");
class MemoryFragmentMainView extends UiTickViewBase_1.UiTickViewBase {
	constructor() {
		super(...arguments),
			(this.ixn = void 0),
			(this.lqe = void 0),
			(this.xqe = void 0),
			(this.q8i = 0),
			(this.DFe = void 0),
			(this.rxn = !1),
			(this.oxn = !1),
			(this.EPe = void 0),
			(this.mGn = 0),
			(this.zwn = () => {
				var e = this.xqe.GetDisplayGridStartIndex(),
					t = this.ixn.GetCollectDataList();
				let i = 0;
				for (let r = 0; r < e; r++) t[r].GetIfCanGetReward() && (i = r);
				this.xqe?.ScrollToGridIndex(i);
				var r = i !== this.q8i;
				(this.q8i = i), this.Og(), r && this.hFe();
			}),
			(this.dGn = () => {
				ModelManager_1.ModelManager.FragmentMemoryModel.TryRemoveCurrentTrackEntity(),
					(this.mGn = 0);
				var e = this.hxn().GetTraceEntityId(),
					t = this.hxn().GetTraceMarkId();
				e =
					ModelManager_1.ModelManager.CreatureModel.GetEntityData(e)?.Transform
						?.Pos;
				e
					? ((e = new MapDefine_1.DynamicMarkCreateInfo(
							Vector_1.Vector.Create(e.X ?? 0, e.Y ?? 0, e.Z ?? 0),
							t,
							7,
							void 0,
							void 0,
							!0,
						)),
						0 === this.mGn &&
							(this.mGn =
								ModelManager_1.ModelManager.MapModel.CreateMapMark(e)),
						(t = { MarkId: this.mGn, MarkType: 7 }),
						WorldMapController_1.WorldMapController.OpenView(2, !1, t),
						(ModelManager_1.ModelManager.FragmentMemoryModel.CurrentTrackMapMarkId =
							this.mGn),
						(ModelManager_1.ModelManager.FragmentMemoryModel.CurrentTrackFragmentId =
							this.hxn().GetId()))
					: Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("FragmentMemory", 28, "没有找到实体");
			}),
			(this.Zwn = () => {
				var e = this.xqe.GetDisplayGridEndIndex(),
					t = this.ixn.GetCollectDataList();
				let i = e;
				var r = t.length;
				for (let n = e; n <= r - 1; n++)
					if (t[n].GetIfCanGetReward()) {
						i = n;
						break;
					}
				this.xqe?.ScrollToGridIndex(i),
					(e = i !== this.q8i),
					(this.q8i = i),
					this.Og(),
					e && this.hFe();
			}),
			(this.nxn = () => {
				(this.ixn =
					ModelManager_1.ModelManager.FragmentMemoryModel.GetTopicDataById(
						this.ixn.GetId(),
					)),
					this.Og();
			}),
			(this.sxn = () => {
				(this.ixn =
					ModelManager_1.ModelManager.FragmentMemoryModel.GetTopicDataById(
						this.ixn.GetId(),
					)),
					this.Og();
			}),
			(this.axn = () => {
				var e = this.hxn();
				FragmentMemoryController_1.FragmentMemoryController.RequestMemoryReward(
					[e.GetId()],
				);
			}),
			(this.lxn = () => {
				PhotographController_1.PhotographController.ScreenShot({
					ScreenShot: !0,
					IsHiddenBattleView: !1,
					HandBookPhotoData: void 0,
					GachaData: void 0,
					FragmentMemory: this.hxn(),
				});
			}),
			(this._xn = () => {
				UiManager_1.UiManager.OpenView("FragmentedCluesView", this.hxn());
			}),
			(this.fvt = () => new GridItem()),
			(this.uxn = () => new TabItem()),
			(this.i2e = () => {
				this.CloseMe();
			}),
			(this.cxn = () => this.q8i),
			(this.mxn = (e) => {
				var t = e !== this.q8i;
				(this.q8i = e), this.Og(!0), t && this.hFe();
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UITexture],
			[2, UE.UILoopScrollViewComponent],
			[3, UE.UIItem],
			[4, UE.UIText],
			[5, UE.UIText],
			[6, UE.UIText],
			[7, UE.UIText],
			[8, UE.UIScrollViewWithScrollbarComponent],
			[9, UE.UIButtonComponent],
			[10, UE.UIItem],
			[11, UE.UIItem],
			[12, UE.UIItem],
			[13, UE.UIButtonComponent],
			[14, UE.UIButtonComponent],
			[15, UE.UIButtonComponent],
			[16, UE.UIButtonComponent],
			[17, UE.UIButtonComponent],
		]),
			(this.BtnBindInfo = [
				[9, this.axn],
				[13, this.lxn],
				[14, this._xn],
				[15, this.zwn],
				[16, this.Zwn],
				[17, this.dGn],
			]);
	}
	OnStart() {
		(this.DFe = new GenericLayout_1.GenericLayout(
			this.GetScrollViewWithScrollbar(8)
				.GetContent()
				.GetComponentByClass(UE.UILayoutBase.StaticClass()),
			this.fvt,
		)),
			(this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0))),
			this.lqe.SetCloseCallBack(this.i2e),
			this.lqe.SetHelpBtnActive(!1),
			(this.xqe = new LoopScrollView_1.LoopScrollView(
				this.GetLoopScrollViewComponent(2),
				this.GetItem(3).GetOwner(),
				this.uxn,
			)),
			this.GetButton(15)?.RootUIComp.SetUIActive(!1),
			this.GetButton(16)?.RootUIComp.SetUIActive(!1),
			(this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem));
		var e = this.OpenParam;
		if (((this.ixn = e.FragmentMemoryTopicData), 0 < e.CurrentSelectId)) {
			var t = this.ixn.GetCollectDataList();
			for (let i = 0; i < t.length; i++)
				if (t[i].GetId() === e.CurrentSelectId) {
					this.q8i = i;
					break;
				}
		}
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnFragmentMemoryCollectUpdate,
			this.sxn,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnFragmentMemoryDataUpdate,
				this.nxn,
			);
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnFragmentMemoryCollectUpdate,
			this.sxn,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnFragmentMemoryDataUpdate,
				this.nxn,
			);
	}
	OnAfterHide() {
		UE.LGUIBPLibrary.ResetGlobalBlurUIItem(
			GlobalData_1.GlobalData.GameInstance.GetWorld(),
		);
	}
	hxn() {
		return this.ixn.GetCollectDataList()[this.q8i];
	}
	OnBeforeShow() {
		this.lqe?.SetTitleByTextIdAndArgNew(this.ixn.GetConfig().Title),
			this.Og(),
			this.Nqe(),
			this.Ebn(),
			0 < this.q8i && this.xqe?.ScrollToGridIndex(this.q8i);
	}
	Ebn() {
		StringUtils_1.StringUtils.IsEmpty(
			ModelManager_1.ModelManager.FragmentMemoryModel
				.MemoryFragmentMainViewTryPlayAnimation,
		) ||
			(this.EPe?.PlaySequencePurely(
				ModelManager_1.ModelManager.FragmentMemoryModel
					.MemoryFragmentMainViewTryPlayAnimation,
			),
			(ModelManager_1.ModelManager.FragmentMemoryModel.MemoryFragmentMainViewTryPlayAnimation =
				""));
	}
	OnAfterShow() {
		this._wn();
	}
	Og(e = !1) {
		this.Mni(e),
			this.GFe(),
			this.mGe(),
			this.Aqe(),
			this.Pqe(),
			this.dxn(),
			this.k5e(),
			this.Cxn(),
			this.kIt(),
			this.CWi(),
			this.gxn(),
			this.HFi(),
			this._wn();
	}
	_wn() {
		this.hxn()?.GetIfUnlock()
			? UE.LGUIBPLibrary.ResetGlobalBlurUIItem(
					GlobalData_1.GlobalData.GameInstance.GetWorld(),
				)
			: UiBlurLogic_1.UiBlurLogic.SetNormalUiRenderAfterBlur(this);
	}
	Nqe() {
		LguiUtil_1.LguiUtil.SetLocalTextNew(
			this.GetText(4),
			"FragmentCollectProgress",
			this.ixn.GetFinishCollectNum(),
			this.ixn.GetMemoryCollectNum(),
		);
	}
	Mni(e = !1) {
		var t = this.ixn.GetCollectDataList();
		const i = [];
		for (const n of t) {
			var r = new TabItemData();
			(r.FragmentCollectData = n),
				(r.TabCallBack = this.mxn),
				(r.GetCurrentSelectTabIndex = this.cxn),
				(r.NeedSwitchAnimation = e),
				i.push(r);
		}
		this.xqe?.RefreshByData(i, !1, () => {
			i.forEach((e) => {
				e.NeedSwitchAnimation = !1;
			});
		});
	}
	GFe() {
		var e = this.hxn(),
			t = [];
		for (const r of e.GetPreviewReward()) {
			var i = new GridItemData();
			(i.Data = r), (i.GetRewardState = e.GetIfGetReward()), t.push(i);
		}
		this.DFe?.RefreshByData(t);
	}
	hFe() {
		"Switch" === this.EPe?.GetCurrentSequence()
			? this.EPe?.ReplaySequenceByKey("Switch")
			: this.EPe?.PlayLevelSequenceByName("Switch");
	}
	mGe() {
		var e,
			t = this.hxn();
		void 0 !== t &&
			((e = this.GetText(5)),
			LguiUtil_1.LguiUtil.SetLocalTextNew(e, t.GetTitle()));
	}
	Pqe() {
		var e,
			t = this.hxn();
		void 0 !== t &&
			((e = this.GetText(7))?.SetUIActive(!0),
			t.GetIfUnlock()
				? LguiUtil_1.LguiUtil.SetLocalTextNew(e, t.GetDesc())
				: LguiUtil_1.LguiUtil.SetLocalTextNew(e, t.GetTipsDesc()));
	}
	Aqe() {
		var e,
			t = this.hxn();
		void 0 !== t &&
			((e = this.GetTexture(1)),
			this.SetTextureByPath(t.GetBgResource(), e, "MemoryFragmentMainView"),
			e?.SetChangeColor(!t.GetIfUnlock(), e.changeColor));
	}
	dxn() {
		var e = this.hxn();
		void 0 !== e &&
			this.GetButton(9)?.RootUIComp.SetUIActive(
				!e.GetIfGetReward() && e.GetIfUnlock(),
			);
	}
	k5e() {
		var e = this.hxn();
		void 0 !== e && this.GetItem(10)?.SetUIActive(e.GetIfGetReward());
	}
	Cxn() {
		var e = this.hxn();
		if (void 0 !== e) {
			var t = !e.GetIfGetReward() && !e.GetIfUnlock();
			let i = !1;
			t && 0 < e.GetTraceEntityId() && (i = !0),
				this.GetItem(11)?.SetUIActive(t && !i),
				this.GetButton(17)?.RootUIComp.SetUIActive(t && i);
		}
	}
	kIt() {
		var e = this.hxn();
		void 0 !== e && this.GetItem(12)?.SetUIActive(!e.GetIfUnlock());
	}
	CWi() {
		var e = this.hxn();
		void 0 !== e && this.GetButton(13)?.RootUIComp.SetUIActive(e.GetIfUnlock());
	}
	OnTick(e) {
		var t = this.xqe.GetDisplayGridStartIndex(),
			i = this.xqe.GetDisplayGridEndIndex(),
			r = this.ixn.GetCollectDataList();
		let n = !1;
		for (let e = 0; e < t; e++)
			if (r[e].GetIfCanGetReward()) {
				n = !0;
				break;
			}
		this.rxn !== n &&
			(this.GetButton(15)?.RootUIComp.SetUIActive(n), (this.rxn = n));
		let o = !1;
		var a = r.length;
		for (let e = i; e <= a - 1; e++)
			if (r[e].GetIfCanGetReward() && e !== i) {
				o = !0;
				break;
			}
		this.oxn !== o &&
			(this.GetButton(16)?.RootUIComp.SetUIActive(o), (this.oxn = o));
	}
	HFi() {
		var e = this.hxn();
		void 0 !== e &&
			this.GetButton(14)?.RootUIComp.SetUIActive(
				!e.GetIfUnlock() && 0 < e.GetClueId(),
			);
	}
	gxn() {
		var e = this.hxn();
		void 0 === e
			? this.GetText(6).SetText("")
			: LguiUtil_1.LguiUtil.SetLocalTextNew(
					this.GetText(6),
					"FragmentMemoryCollectTime",
					e.GetTimeText(),
				);
	}
	OnBeforeHide() {
		ModelManager_1.ModelManager.FragmentMemoryModel.ActivitySubViewTryPlayAnimation =
			"ShowView01";
	}
}
exports.MemoryFragmentMainView = MemoryFragmentMainView;
class TabItemData {
	constructor() {
		(this.FragmentCollectData = void 0),
			(this.TabCallBack = () => {}),
			(this.GetCurrentSelectTabIndex = () => 0),
			(this.NeedSwitchAnimation = !1);
	}
}
class TabItem extends GridProxyAbstract_1.GridProxyAbstract {
	constructor() {
		super(...arguments),
			(this.Pe = void 0),
			(this.EPe = void 0),
			(this.$Gn = !1),
			(this.fxn = () => {
				this.Pe.TabCallBack(this.GridIndex);
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIExtendToggle],
			[1, UE.UIText],
			[2, UE.UIText],
			[3, UE.UIItem],
			[4, UE.UIItem],
			[5, UE.UIItem],
			[6, UE.UIItem],
			[7, UE.UIText],
		]),
			(this.BtnBindInfo = [[0, this.fxn]]);
	}
	XGn() {
		return (
			void 0 === this.EPe &&
				(this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(
					this.RootItem,
				)),
			this.EPe
		);
	}
	Refresh(e, t, i) {
		this.Pe = e;
		var r = this.GridIndex === e.GetCurrentSelectTabIndex(),
			n = r ? 1 : 0;
		this.GetExtendToggle(0)?.SetToggleState(n),
			LguiUtil_1.LguiUtil.SetLocalTextNew(
				this.GetText(7),
				e.FragmentCollectData.GetTitle(),
			),
			LguiUtil_1.LguiUtil.SetLocalTextNew(
				this.GetText(2),
				e.FragmentCollectData.GetTitle(),
			),
			this.GetItem(3)?.SetUIActive(e.FragmentCollectData.GetIfGetReward()),
			this.BNe(),
			this.pxn(),
			this.h8i(),
			this.vPn(),
			this.$Gn !== r && this.YGn(n),
			(this.$Gn = r);
	}
	YGn(e) {
		var t;
		e = 1 === e ? "Select" : "Unselect";
		this.Pe?.NeedSwitchAnimation
			? (t = this.XGn()).GetCurrentSequence() === e
				? t?.ReplaySequenceByKey(e)
				: t?.PlaySequencePurely(e)
			: ((t = this.XGn())?.StopSequenceByKey("Select", !1, !1),
				t?.PlaySequencePurely(e),
				t.StopSequenceByKey(e, !1, !0));
	}
	vPn() {
		var e;
		this.Pe.FragmentCollectData.GetIfUnlock()
			? ((e = (this.GridIndex + 1).toString().padStart(2, "0")),
				this.GetText(1)?.SetText(e))
			: this.GetText(1)?.SetText("");
	}
	pxn() {
		var e = this.Pe.FragmentCollectData.GetIfUnlock();
		this.GetItem(5)?.SetUIActive(e);
	}
	h8i() {
		var e = !this.Pe.FragmentCollectData.GetIfUnlock();
		this.GetItem(6)?.SetUIActive(e);
	}
	BNe() {
		RedDotController_1.RedDotController.UnBindGivenUi(
			"FragmentMemoryReward",
			this.GetItem(4),
			this.Pe.FragmentCollectData.GetId(),
		),
			RedDotController_1.RedDotController.BindRedDot(
				"FragmentMemoryReward",
				this.GetItem(4),
				void 0,
				this.Pe.FragmentCollectData.GetId(),
			);
	}
}
class GridItemData {
	constructor() {
		(this.Data = void 0), (this.GetRewardState = !1);
	}
}
class GridItem extends LoopScrollSmallItemGrid_1.LoopScrollSmallItemGrid {
	constructor() {
		super(...arguments), (this.Mne = 0);
	}
	OnRefresh(e, t, i) {
		this.Refresh(e);
	}
	OnCanExecuteChange() {
		return !1;
	}
	OnExtendToggleClicked() {
		ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
			this.Mne,
		);
	}
	Refresh(e) {
		var t, i;
		e?.Data &&
			((i = e.Data[0]),
			(t = e.Data[1]),
			(this.Mne = i.ItemId),
			(i = e.GetRewardState),
			(e = {
				Data: e,
				Type: 4,
				ItemConfigId: this.Mne,
				BottomText: 0 < t ? "" + t : "",
				IsReceivedVisible: i,
			}),
			this.Apply(e));
	}
}
