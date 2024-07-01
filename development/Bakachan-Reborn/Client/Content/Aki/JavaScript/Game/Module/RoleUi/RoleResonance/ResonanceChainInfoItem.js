"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ResonanceChainInfoItem = void 0);
const UE = require("ue"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	ButtonItem_1 = require("../../Common/Button/ButtonItem"),
	LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
	MediumItemGrid_1 = require("../../Common/MediumItemGrid/MediumItemGrid"),
	ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	RoleController_1 = require("../RoleController"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class ResonanceChainInfoItem extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(),
			(this.zke = 0),
			(this.Buo = void 0),
			(this.p8t = void 0),
			(this.buo = void 0),
			(this.Gft = void 0),
			(this.quo = () => {
				var e =
					ConfigManager_1.ConfigManager.RoleResonanceConfig.GetRoleResonanceById(
						this.Buo,
					);
				if (e) {
					let t = !0;
					e.ActivateConsume.forEach((e, o) => {
						(o =
							ModelManager_1.ModelManager.InventoryModel.GetCommonItemCount(o)),
							(t = t && e <= o);
					}),
						t
							? RoleController_1.RoleController.SendResonanceUnlockRequest(
									this.zke,
								)
							: ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
									"ResonanceItemNotEnough",
								);
				}
			}),
			(this.Mft = () => {
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.OnRoleInternalViewQuit,
				);
			}),
			(this.LoadPromise = this.CreateThenShowByResourceIdAsync(
				"UIItem_ResonanceChainInfo",
				e,
			));
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIScrollViewWithScrollbarComponent],
			[2, UE.UIText],
			[3, UE.UIItem],
			[4, UE.UIItem],
			[10, UE.UIItem],
			[5, UE.UIItem],
			[6, UE.UIItem],
			[7, UE.UIItem],
			[8, UE.UIText],
			[9, UE.UIButtonComponent],
		]),
			(this.BtnBindInfo = [[9, this.Mft]]);
	}
	OnStart() {
		(this.p8t = new ButtonItem_1.ButtonItem(this.GetItem(5))),
			this.p8t.SetFunction(this.quo),
			(this.buo = new MediumItemGrid_1.MediumItemGrid()),
			this.buo.Initialize(this.GetItem(4).GetOwner()),
			(this.Gft = new LevelSequencePlayer_1.LevelSequencePlayer(
				this.GetRootItem(),
			));
	}
	async ShowItem() {
		await this.LoadPromise,
			this.Gft.StopCurrentSequence(),
			this.Gft.PlayLevelSequenceByName("Start");
	}
	async HideItem() {
		await this.LoadPromise,
			this.Gft.StopCurrentSequence(),
			this.Gft.PlayLevelSequenceByName("Close");
	}
	async Refresh(e = !1) {
		await this.LoadPromise;
		var t,
			o =
				ConfigManager_1.ConfigManager.RoleResonanceConfig.GetRoleResonanceById(
					this.Buo,
				);
		o &&
			((t = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(this.zke)),
			(t = ModelManager_1.ModelManager.RoleModel.GetRoleResonanceState(
				t,
				o.GroupIndex,
			)),
			this.GetItem(5).SetUIActive(1 === t && !e),
			this.GetItem(6).SetUIActive(2 === t && !e),
			this.GetItem(7).SetUIActive(0 === t && !e),
			this.buo.GetRootItem().SetUIActive(2 !== t && !e),
			this.GetItem(10).SetUIActive(2 !== t && !e),
			this.GetText(0).ShowTextNew(o.NodeName),
			LguiUtil_1.LguiUtil.SetLocalTextNew(
				this.GetText(2),
				o.AttributesDescription,
				...o.AttributesDescriptionParams,
			),
			this.GetText(8).ShowTextNew(o.BgDescription),
			(t =
				ModelManager_1.ModelManager.RoleModel.RedDotResonanceTabHoleCondition(
					this.zke,
					o.GroupIndex,
				)),
			this.p8t.SetRedDotVisible(t),
			e ||
				o.ActivateConsume.forEach((e, t) => {
					var o = { Type: 4, ItemConfigId: t },
						n =
							ModelManager_1.ModelManager.InventoryModel.GetCommonItemCount(t);
					(o.BottomTextId = "Text_ItemEnoughText_Text"),
						n < e && (o.BottomTextId = "Text_ItemNotEnoughText_Text"),
						(o.BottomTextParameter = [n, e]),
						this.buo.Apply(o),
						this.buo.BindOnCanExecuteChange(() => !1),
						this.buo.BindOnExtendToggleClicked(() => {
							ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
								t,
							);
						});
				}));
	}
	Update(e, t, o = !1) {
		(this.zke = e), (this.Buo = t), this.Refresh(o);
	}
	GetResonanceId() {
		return this.Buo;
	}
	GetUiItemForGuide() {
		return this.p8t
			?.GetBtn()
			?.GetOwner()
			.GetComponentByClass(UE.UIItem.StaticClass());
	}
}
exports.ResonanceChainInfoItem = ResonanceChainInfoItem;
