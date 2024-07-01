"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MingSuView = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	MingSuController_1 = require("../MingSuController"),
	MingSuDefine_1 = require("../MingSuDefine"),
	CollectItemViewBase_1 = require("./CollectItemViewBase"),
	CollectSmallItemGrid_1 = require("./CollectSmallItemGrid");
class MingSuView extends CollectItemViewBase_1.CollectItemViewBase {
	constructor() {
		super(...arguments),
			(this.NBi = void 0),
			(this.kBi = 0),
			(this.FBi = void 0),
			(this.VBi = void 0),
			(this.KBi = !1),
			(this.mkt = () => {
				var e = new CollectSmallItemGrid_1.CollectSmallItemGrid();
				return (
					e.BindOnExtendToggleRelease(this.QBi),
					e.BindOnCanExecuteChange(() => !1),
					e
				);
			}),
			(this.QBi = (e) => {
				e.MediumItemGrid.IsHover &&
					((e = e.Data),
					ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
						e.ItemInfo.Id,
					));
			}),
			(this.zBi = () => {
				--this.CurrentShowLevel,
					this.pO(),
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"MingSuTi",
							8,
							"当前等级: " +
								this.CurrentShowLevel.toString() +
								" left " +
								ModelManager_1.ModelManager.MingSuModel.GetTargetDragonPoolMaxLevelById(
									this.PoolConfigId,
								).toString(),
						);
			}),
			(this.ZBi = () => {
				(this.CurrentShowLevel += 1),
					this.pO(),
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"MingSuTi",
							8,
							"当前等级: " +
								this.CurrentShowLevel.toString() +
								" right " +
								ModelManager_1.ModelManager.MingSuModel.GetTargetDragonPoolMaxLevelById(
									this.PoolConfigId,
								).toString(),
						);
			}),
			(this.ebi = () => {
				var e, t;
				this.KBi ||
					((t = (e =
						ModelManager_1.ModelManager
							.MingSuModel).GetTargetDragonPoolLevelById(this.PoolConfigId)),
					this.CurrentShowLevel === t + 1
						? e.CheckUp(this.PoolConfigId)
							? ((e.MingSuLastLevel = e.GetTargetDragonPoolLevelById(
									this.PoolConfigId,
								)),
								e.CanLevelUp(this.PoolConfigId) && (this.KBi = !0),
								MingSuController_1.MingSuController.SendHandInMingSuRequest(
									this.PoolConfigId,
								),
								Log_1.Log.CheckInfo() &&
									Log_1.Log.Info("MingSuTi", 8, "可以升级"))
							: (EventSystem_1.EventSystem.Emit(
									EventDefine_1.EEventName.OnSubmitItemFail,
								),
								Log_1.Log.CheckInfo() &&
									Log_1.Log.Info("MingSuTi", 8, "不可升级!!!!"))
						: this.$Bi());
			}),
			(this.tbi = () => {
				ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
					MingSuDefine_1.MING_SU_ITEM_CONFIG_ID,
				);
			}),
			(this.ACt = () => {
				this.CloseMe();
			});
	}
	OnRegisterComponent() {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("MingSuTi", 8, "创建鸣素体界面!!!!"),
			this.ibi();
	}
	OnBegined() {
		this.ChildPopView?.PopItem.OverrideBackBtnCallBack(() => {}), this.h7e();
	}
	OnAfterShow() {
		this.UiViewSequence.PlaySequencePurely("Show");
	}
	OnEnded() {
		this.FBi &&
			(ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.FBi),
			(this.FBi = void 0)),
			(this.VBi = void 0);
	}
	ibi() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIButtonComponent],
			[1, UE.UIButtonComponent],
			[2, UE.UISprite],
			[3, UE.UIText],
			[4, UE.UIText],
			[5, UE.UIScrollViewWithScrollbarComponent],
			[6, UE.UIItem],
			[7, UE.UIText],
			[8, UE.UIButtonComponent],
			[9, UE.UIText],
			[10, UE.UIItem],
			[11, UE.UIText],
			[12, UE.UIButtonComponent],
			[13, UE.UIButtonComponent],
		]),
			(this.BtnBindInfo = [
				[0, this.zBi],
				[1, this.ZBi],
				[8, this.ebi],
				[12, this.tbi],
				[13, this.ACt],
			]);
	}
	h7e() {
		(this.VBi = this.GetSprite(2)), this.pO();
	}
	obi(e) {
		var t = this.GetText(3),
			i =
				ModelManager_1.ModelManager.MingSuModel.GetTargetDragonPoolMaxLevelById(
					this.PoolConfigId,
				);
		let o = e;
		o > i && (o = i),
			LguiUtil_1.LguiUtil.SetLocalTextNew(t, "MingSuLevelText", o),
			(this.CurrentShowLevel = o),
			(ModelManager_1.ModelManager.MingSuModel.CurrentPreviewLevel =
				this.CurrentShowLevel);
	}
	rbi() {
		var e = this.GetButton(0),
			t = this.GetButton(1);
		(1 === this.CurrentShowLevel
			? (e.SetSelfInteractive(!1), t)
			: (this.CurrentShowLevel ===
				ModelManager_1.ModelManager.MingSuModel.GetTargetDragonPoolMaxLevelById(
					this.PoolConfigId,
				)
					? t.SetSelfInteractive(!1)
					: t.SetSelfInteractive(!0),
				e)
		).SetSelfInteractive(!0);
	}
	nbi() {
		var e = ModelManager_1.ModelManager.MingSuModel,
			t = e.GetTargetDragonPoolLevelById(this.PoolConfigId),
			i = e.GetTargetDragonPoolMaxLevelById(this.PoolConfigId),
			o = this.GetText(4);
		if (
			this.CurrentShowLevel === t + 1 ||
			(this.CurrentShowLevel === t && this.CurrentShowLevel === i)
		) {
			let l = t;
			(this.kBi = 1),
				2 === e.GetTargetDragonPoolActiveById(this.PoolConfigId) &&
					(this.kBi = 0),
				t === i && --l;
			i = e.GetTargetDragonPoolLevelNeedCoreById(this.PoolConfigId, l);
			let r = 0;
			var n =
				(r = (n = 2 === e.GetTargetDragonPoolActiveById(this.PoolConfigId))
					? i
					: e.GetTargetDragonPoolCoreCountById(this.PoolConfigId)) / i;
			this.VBi.SetFillAmount(n), o.SetText(r + "/" + i);
		} else
			this.CurrentShowLevel <= t
				? ((this.kBi = 0),
					(n = e.GetTargetDragonPoolLevelNeedCoreById(
						this.PoolConfigId,
						this.CurrentShowLevel - 1,
					)),
					o.SetText(n + "/" + n),
					this.VBi.SetFillAmount(1))
				: this.CurrentShowLevel > t + 1 &&
					((this.kBi = 2),
					(i = e.GetTargetDragonPoolLevelNeedCoreById(
						this.PoolConfigId,
						this.CurrentShowLevel - 1,
					)),
					o.SetText("0/" + i),
					this.VBi.SetFillAmount(0));
	}
	jqe() {
		var e =
				ModelManager_1.ModelManager.MingSuModel.GetTargetDragonPoolLevelRewardById(
					this.PoolConfigId,
					this.CurrentShowLevel - 1,
				),
			t = this.GetScrollViewWithScrollbar(5);
		this.NBi ||
			(this.NBi = new GenericLayout_1.GenericLayout(
				t.GetContent().GetComponentByClass(UE.UILayoutBase.StaticClass()),
				this.mkt,
			)),
			this.NBi.RefreshByData(e);
	}
	sbi() {
		var e = this.GetText(7);
		2 ===
			ModelManager_1.ModelManager.MingSuModel.GetTargetDragonPoolActiveById(
				this.PoolConfigId,
			) && (this.kBi = 3),
			1 === this.kBi
				? e.SetUIActive(!1)
				: 0 === this.kBi
					? (LguiUtil_1.LguiUtil.SetLocalTextNew(e, "MingSuDoneTips"),
						e.SetUIActive(!0))
					: 2 === this.kBi
						? (LguiUtil_1.LguiUtil.SetLocalTextNew(e, "MingSuNotDoneTips"),
							e.SetUIActive(!0))
						: 3 === this.kBi &&
							(LguiUtil_1.LguiUtil.SetLocalTextNew(e, "MingSuDoneTips"),
							e.SetUIActive(!0));
	}
	abi() {
		var e = this.GetText(9),
			t =
				2 ===
				ModelManager_1.ModelManager.MingSuModel.GetTargetDragonPoolActiveById(
					this.PoolConfigId,
				);
		this.GetItem(10).SetUIActive(!t),
			t ||
				((t =
					ModelManager_1.ModelManager.MingSuModel.GetTargetDragonPoolLevelById(
						this.PoolConfigId,
					)),
				this.CurrentShowLevel === t + 1
					? LguiUtil_1.LguiUtil.SetLocalText(e, "MingSuTi_Text3")
					: LguiUtil_1.LguiUtil.SetLocalText(e, "MingSuTi_Text4"));
	}
	JBi() {
		var e = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
			MingSuDefine_1.MING_SU_ITEM_CONFIG_ID,
		);
		this.GetText(11).SetText(e.toString());
	}
	$Bi() {
		var e =
				ModelManager_1.ModelManager.MingSuModel.GetTargetDragonPoolMaxLevelById(
					this.PoolConfigId,
				),
			t = ModelManager_1.ModelManager.MingSuModel.GetTargetDragonPoolLevelById(
				this.PoolConfigId,
			);
		(this.CurrentShowLevel = t === e ? t : t + 1), this.pO();
	}
	pO() {
		this.obi(this.CurrentShowLevel),
			this.rbi(),
			this.nbi(),
			this.jqe(),
			this.sbi(),
			this.abi(),
			this.JBi();
	}
	OnUpdateDragonPoolView() {
		this.$Bi();
	}
	OnSubmitItemLevelUp() {
		this.SetActive(!1),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.HangPlotViewHud,
				!0,
			);
	}
	OnSubmitItemLevelMax() {
		this.SetActive(!1),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.HangPlotViewHud,
				!0,
			);
	}
	OnSubmitItemLevelUpSequencePlayFail() {
		(this.KBi = !1),
			this.SetActive(!0),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.HangPlotViewHud,
				!1,
			);
	}
	OnCollectItemCountChanged(e) {
		this.JBi();
	}
	OnCloseRewardView() {
		this.SetActive(!0),
			(this.KBi = !1),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.HangPlotViewHud,
				!1,
			);
	}
}
exports.MingSuView = MingSuView;
