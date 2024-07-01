"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.VisionSkinView = void 0);
const UE = require("ue"),
	MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
	PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem"),
	UiSceneManager_1 = require("../../../UiComponent/UiSceneManager"),
	UiModelUtil_1 = require("../../../UiModel/UiModelUtil"),
	LguiUtil_1 = require("../../../Util/LguiUtil"),
	LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView"),
	VisionSkinItem_1 = require("./VisionSkinItem");
class VisionSkinView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.lqe = void 0),
			(this.lHi = -1),
			(this.Vli = -1),
			(this.YHi = 0),
			(this.K6s = 0),
			(this.JHi = void 0),
			(this.zHi = void 0),
			(this.ZHi = !1),
			(this.i7i = void 0),
			(this.eji = void 0),
			(this.tji = 0),
			(this.iji = () => {
				(this.ZHi = !this.ZHi), this.GetItem(2).SetUIActive(this.ZHi);
			}),
			(this.oji = () => {
				var e =
					ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomItemById(
						this.YHi,
					);
				ControllerHolder_1.ControllerHolder.PhantomBattleController.PhantomSkinChangeRequest(
					this.lHi,
					0 < e?.ParentMonsterId ? this.YHi : 0,
					this.ZHi,
				),
					this.E7i();
			}),
			(this.Awe = () => {
				this.CloseMe();
			}),
			(this.rji = () => {
				ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
					this.YHi,
				);
			}),
			(this.nji = () => {
				var e = new VisionSkinItem_1.VisionSkinItem();
				return (
					e.SetClickToggleEvent(this.f9i),
					e.BindCanToggleExecuteChange(this.Eft),
					e
				);
			}),
			(this.f9i = (e, i) => {
				this.eji?.SetToggleStateForce(0), (this.eji = i);
				i =
					ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomItemById(
						e,
					);
				var t =
					(this.sji(
						!!i.ParentMonsterId &&
							!ModelManager_1.ModelManager.PhantomBattleModel.GetSkinIsUnlock(
								e,
							),
					),
					i.MonsterName);
				LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), t),
					this.tji ? this.aji(e !== this.tji) : this.aji(!!i.ParentMonsterId),
					this.u9i(e);
			}),
			(this.Eft = (e) => this.YHi !== e),
			(this.hji = () => {
				var e =
					ModelManager_1.ModelManager.PhantomBattleModel.GetMonsterSkinListByMonsterId(
						this.Vli,
					);
				if (e) {
					this.tji =
						ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(
							this.lHi,
						).SkinId;
					let i = 0;
					-1 === (i = this.tji ? e.indexOf(this.tji) : 0) && (i = 0),
						this.zHi?.SetCurrentEquipmentVisible(!1),
						(this.zHi = this.JHi?.UnsafeGetGridProxy(i)),
						this.zHi?.SetCurrentEquipmentVisible(!0),
						this.aji(!1);
				}
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIButtonComponent],
			[2, UE.UIItem],
			[3, UE.UIText],
			[4, UE.UIButtonComponent],
			[5, UE.UIText],
			[6, UE.UILoopScrollViewComponent],
			[7, UE.UIItem],
			[8, UE.UIItem],
			[9, UE.UIButtonComponent],
		]),
			(this.BtnBindInfo = [
				[1, this.iji],
				[4, this.oji],
				[9, this.rji],
			]);
	}
	OnStart() {
		(this.ZHi = !1),
			this.GetItem(2).SetUIActive(!1),
			(this.i7i = UiSceneManager_1.UiSceneManager.GetVisionSkeletalHandle()),
			(this.lHi = this.OpenParam);
		var e,
			i,
			t =
				ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(
					this.lHi,
				);
		t &&
			((this.Vli = t.GetConfig()?.MonsterId),
			(this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0))),
			this.lqe.SetCloseCallBack(this.Awe),
			this.lqe.SetTitleByTextIdAndArgNew("VisionSkinTitleText"),
			this.lqe.SetHelpBtnActive(!1),
			(e = t.GetSkinConfig().MonsterName),
			(i = t.GetConfig().MonsterName),
			(i = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(i)),
			LguiUtil_1.LguiUtil.SetLocalTextNew(
				this.GetText(3),
				"ChangeDefaultVisionSkinText",
				i,
			),
			LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), e),
			(this.JHi = new LoopScrollView_1.LoopScrollView(
				this.GetLoopScrollViewComponent(6),
				this.GetItem(7).GetOwner(),
				this.nji,
			)),
			(this.tji = t.SkinId));
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnVisionSkinEquip,
			this.hji,
		);
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnVisionSkinEquip,
			this.hji,
		);
	}
	OnBeforeShow() {
		const e =
			ModelManager_1.ModelManager.PhantomBattleModel.GetMonsterSkinListByMonsterId(
				this.Vli,
			);
		if (e) {
			let i = 0;
			-1 === (i = this.tji ? e.indexOf(this.tji) : 0) && (i = 0),
				this.JHi?.RefreshByData(e, !1, () => {
					this.JHi?.SelectGridProxy(i),
						(this.zHi = this.JHi?.UnsafeGetGridProxy(i)),
						(this.eji = this.zHi?.GetItemGridExtendToggle()),
						this.zHi?.SetCurrentEquipmentVisible(!0),
						(this.YHi = e[i]),
						(this.K6s = this.YHi);
				}),
				this.sji(!1),
				this.aji(!1);
		}
	}
	u9i(e) {
		this.YHi === e
			? this.E7i()
			: (this.y7i(),
				ControllerHolder_1.ControllerHolder.PhantomBattleController.SetMeshShow(
					e,
					() => {
						this.E7i();
					},
					this.i7i,
					!1,
				),
				(this.YHi = e));
	}
	E7i() {
		var e;
		this.i7i &&
			((e = this.i7i.Model),
			UiModelUtil_1.UiModelUtil.PlayEffectOnRoot(e, "VisionLevelUpEffect"),
			UiModelUtil_1.UiModelUtil.SetRenderingMaterial(
				e,
				"VisionStepupController",
			));
	}
	y7i() {
		UiSceneManager_1.UiSceneManager.HasVisionSkeletalHandle() ||
			UiSceneManager_1.UiSceneManager.InitVisionSkeletalHandle(),
			(this.i7i = UiSceneManager_1.UiSceneManager.GetVisionSkeletalHandle());
	}
	sji(e) {
		this.GetItem(8)?.SetUIActive(e),
			this.GetButton(9)?.RootUIComp.SetUIActive(e),
			this.GetButton(4)?.RootUIComp.SetUIActive(!e);
	}
	aji(e) {
		this.GetButton(4)?.SetSelfInteractive(e);
	}
	OnAfterDestroy() {
		EventSystem_1.EventSystem.Emit(
			EventDefine_1.EEventName.VisionSkinViewClose,
			this.YHi !== this.K6s,
		);
	}
}
exports.VisionSkinView = VisionSkinView;
