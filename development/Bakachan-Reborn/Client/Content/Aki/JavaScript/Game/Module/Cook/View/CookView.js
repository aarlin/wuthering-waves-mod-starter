"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CookView = void 0);
const UE = require("ue"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	UiLayerType_1 = require("../../../Ui/Define/UiLayerType"),
	UiLayer_1 = require("../../../Ui/UiLayer"),
	UiManager_1 = require("../../../Ui/UiManager"),
	CommonCountPanel_1 = require("../../Common/CommonCountPanel"),
	UiNavigationView_1 = require("../../UiNavigation/UiNavigationView"),
	GenericLayoutNew_1 = require("../../Util/Layout/GenericLayoutNew"),
	CookController_1 = require("../CookController"),
	CookModel_1 = require("../CookModel"),
	CookItemView_1 = require("./CookItemView");
class CookView extends UiNavigationView_1.UiNavigationView {
	constructor() {
		super(...arguments),
			(this.iNt = void 0),
			(this.TNt = void 0),
			(this.LNt = void 0),
			(this.DNt = void 0),
			(this.RNt = !0),
			(this.gIt = 0),
			(this.zke = 0),
			(this.t6 = 1),
			(this.UNt = void 0),
			(this.ANt = void 0),
			(this.rNt = (t, e, o) => (
				(e = new CookItemView_1.MaterialItem(e)).Update(t, o),
				e.BindOnClickedCallback(this.PNt),
				{ Key: o, Value: e }
			)),
			(this.xNt = () =>
				CookController_1.CookController.GetMaxCreateCount(
					this.gIt,
					ModelManager_1.ModelManager.CookModel.CurrentCookListType,
				)),
			(this.yqt = (t) => {
				(this.t6 = t), this.Iqt();
			}),
			(this.bl = () => {
				this.GetActive() &&
					(0 === ModelManager_1.ModelManager.CookModel.CurrentCookListType
						? ((this.zke = ModelManager_1.ModelManager.CookModel.GetCookRoleId(
								this.gIt,
							)),
							(ModelManager_1.ModelManager.CookModel.CurrentCookRoleId =
								this.zke),
							(this.UNt =
								ConfigManager_1.ConfigManager.CookConfig.GetCookFormulaById(
									this.gIt,
								)))
						: (this.ANt =
								ConfigManager_1.ConfigManager.CookConfig.GetCookProcessedById(
									this.gIt,
								)),
					(this.t6 = 1),
					this.hke(),
					this.wNt(),
					this.BNt(),
					this.bNt(),
					this.rFe(),
					this.qNt());
			}),
			(this.GNt = () => {
				(this.zke = ModelManager_1.ModelManager.CookModel.CurrentCookRoleId),
					this.BNt();
			}),
			(this.NNt = () => {
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.OpenCookRole,
					this.gIt,
				);
			}),
			(this.dIt = () => {
				0 === ModelManager_1.ModelManager.CookModel.CurrentCookListType
					? (ModelManager_1.ModelManager.CookModel.CleanAddExp(),
						CookController_1.CookController.SendCookFoodRequest(
							this.gIt,
							this.zke,
							this.t6,
						))
					: CookController_1.CookController.SendFoodProcessRequest(
							this.gIt,
							ModelManager_1.ModelManager.CookModel.GetTmpMachiningItemList(),
							this.t6,
						);
			}),
			(this.sNt = () => {
				ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
					"MaterialShort",
				);
			}),
			(this.PNt = (t) => {
				ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
					t.G3n,
				);
			}),
			(this.ONt = () => {
				this.bl();
			}),
			(this.kNt = () => {
				var t;
				this.GetActive() &&
					(((t = new CookModel_1.CookRewardPopData()).CookRewardPopType = 2),
					UiManager_1.UiManager.OpenView("CookSuccessView", t));
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIItem],
			[2, UE.UIHorizontalLayout],
			[3, UE.UIButtonComponent],
			[4, UE.UIItem],
			[5, UE.UIItem],
			[6, UE.UIButtonComponent],
		]),
			(this.BtnBindInfo = [
				[3, this.dIt],
				[6, this.sNt],
			]);
	}
	OnStart() {
		(this.TNt = new OpenCookRoleButton(this.GetItem(4))),
			this.TNt.BindOnCallback(this.NNt),
			(this.iNt = new GenericLayoutNew_1.GenericLayoutNew(
				this.GetHorizontalLayout(2),
				this.rNt,
			)),
			(this.DNt = new AmountItem(this.GetItem(5))),
			this.DNt.BindGetMaxCallback(this.xNt),
			this.DNt.BindSetSumCallback(this.yqt),
			(this.LNt = new CookItemView_1.IconItem(this.GetItem(1)));
	}
	OnBeforeDestroy() {
		this.Cde(),
			this.iNt.ClearChildren(),
			(this.iNt = void 0),
			(this.DNt = void 0);
	}
	dde() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.CookSuccess,
			this.ONt,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.MachiningSuccess,
				this.kNt,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.MachiningSuccess,
				this.bl,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.CloseCookRole,
				this.GNt,
			);
	}
	Cde() {
		this.RNt ||
			(EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.CookSuccess,
				this.ONt,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.MachiningSuccess,
				this.kNt,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.MachiningSuccess,
				this.bl,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.CloseCookRole,
				this.GNt,
			));
	}
	HideView(t) {
		this.SetActive(!t),
			t || (ModelManager_1.ModelManager.CookModel.CurrentCookViewType = 3);
	}
	ShowView(t) {
		(ModelManager_1.ModelManager.CookModel.CurrentCookViewType = 3),
			this.SetActive(!0),
			this.RNt && (this.dde(), (this.RNt = !1)),
			(this.gIt = t),
			this.bl();
	}
	hke() {
		let t;
		(t = (
			0 === ModelManager_1.ModelManager.CookModel.CurrentCookListType
				? this.UNt
				: this.ANt
		).Name),
			this.GetText(0).ShowTextNew(t);
	}
	wNt() {
		let t;
		(t =
			0 === ModelManager_1.ModelManager.CookModel.CurrentCookListType
				? this.UNt.FoodItemId
				: this.ANt.FinalItemId),
			this.LNt.SetIcon(t),
			this.LNt.SetQuality(t);
	}
	BNt() {
		0 === ModelManager_1.ModelManager.CookModel.CurrentCookListType
			? (this.TNt.SetActive(!0),
				this.TNt.RefreshIcon(this.zke),
				this.TNt.RefreshRedDot(this.zke, this.gIt))
			: this.TNt.SetActive(!1);
	}
	bNt() {
		var t = ModelManager_1.ModelManager.CookModel.GetCookMaterialList(
			this.gIt,
			ModelManager_1.ModelManager.CookModel.CurrentCookListType,
		);
		this.iNt.RebuildLayoutByDataNew(t);
	}
	Iqt() {
		for (const t of this.iNt.GetLayoutItemMap().values())
			t.RefreshNeed(this.t6);
	}
	rFe() {
		var t,
			e = this.GetButton(3)
				.GetOwner()
				.GetComponentByClass(UE.UIInteractionGroup.StaticClass()),
			o = this.GetButton(6).GetOwner();
		0 === ModelManager_1.ModelManager.CookModel.CurrentCookListType
			? ((t = CookController_1.CookController.CheckCanCook(this.gIt)),
				e.SetInteractable(t),
				o.GetUIItem().SetUIActive(!t))
			: ((t = CookController_1.CookController.CheckCanProcessed(this.gIt)),
				e.SetInteractable(t),
				o.GetUIItem().SetUIActive(!t));
	}
	qNt() {
		this.DNt.ResetSum(), this.DNt.RefreshAddAndDelButton();
	}
	GetGuideUiItemAndUiItemForShowEx(t) {
		if ((t = this.GetGuideUiItem(t[1]))) return [t, t];
	}
}
exports.CookView = CookView;
class OpenCookRoleButton extends UiPanelBase_1.UiPanelBase {
	constructor(t) {
		super(),
			(this.yVe = void 0),
			(this.FNt = () => {
				this.yVe && this.yVe();
			}),
			this.CreateThenShowByActor(t.GetOwner());
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIButtonComponent],
			[1, UE.UITexture],
			[2, UE.UIItem],
		]),
			(this.BtnBindInfo = [[0, this.FNt]]);
	}
	RefreshIcon(t) {
		var e = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(t);
		this.SetRoleIcon(e.GetRoleConfig().RoleHeadIcon, this.GetTexture(1), t);
	}
	RefreshRedDot(t, e) {
		this.GetItem(2).SetUIActive(
			CookController_1.CookController.CheckIsBuffEx(t, e),
		);
	}
	BindOnCallback(t) {
		this.yVe = t;
	}
}
class AmountItem extends UiPanelBase_1.UiPanelBase {
	constructor(t) {
		super(),
			(this.VNt = 1),
			(this.HNt = void 0),
			(this.jNt = void 0),
			(this.WNt = void 0),
			(this.KNt = (t) => {
				var e = this.QNt();
				(this.VNt = e < t ? e : t),
					this.VNt < 1 && (this.VNt = 1),
					this.jNt && this.jNt(this.VNt),
					this.GetText(3).SetText(this.VNt.toString()),
					this.RefreshAddAndDelButton();
			}),
			(this._o = () => {
				(this.VNt += 1),
					this.jNt && this.jNt(this.VNt),
					this.RefreshAddAndDelButton(),
					this.GetText(3).SetText(this.VNt.toString());
			}),
			(this.CIt = () => {
				--this.VNt,
					this.jNt && this.jNt(this.VNt),
					this.RefreshAddAndDelButton(),
					this.GetText(3).SetText(this.VNt.toString());
			}),
			(this.XNt = () => {
				this.$Nt();
			}),
			this.CreateThenShowByActor(t.GetOwner());
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIButtonComponent],
			[1, UE.UIButtonComponent],
			[2, UE.UIButtonComponent],
			[3, UE.UIText],
		]),
			(this.BtnBindInfo = [
				[0, this._o],
				[1, this.CIt],
				[2, this.XNt],
			]);
	}
	OnStart() {
		this.GetText(3).SetText(this.VNt.toString());
	}
	async YNt() {
		(this.WNt = new CommonCountPanel_1.CommonItemCountPanel()),
			await this.WNt.CreateThenShowByResourceIdAsync(
				"UiItem_ShopCountPanel_Prefab",
				UiLayer_1.UiLayer.GetLayerRootUiItem(UiLayerType_1.ELayerType.Normal),
			),
			this.WNt.SetConfirmFunction(this.KNt);
	}
	ResetSum() {
		(this.VNt = 1), this.GetText(3).SetText(this.VNt.toString());
	}
	RefreshAddAndDelButton() {
		this.GetButton(1)
			.GetOwner()
			.GetComponentByClass(UE.UIInteractionGroup.StaticClass())
			.SetInteractable(1 !== this.VNt),
			this.GetButton(0)
				.GetOwner()
				.GetComponentByClass(UE.UIInteractionGroup.StaticClass())
				.SetInteractable(this.VNt < this.QNt());
	}
	BindGetMaxCallback(t) {
		this.HNt = t;
	}
	BindSetSumCallback(t) {
		this.jNt = t;
	}
	QNt() {
		if (this.HNt) {
			var t = this.HNt();
			if (0 !== t) return t;
		}
		return 1;
	}
	async $Nt() {
		this.WNt || (await this.YNt()), this.WNt.PlayStartSequence(this.VNt);
		var t =
			ConfigManager_1.ConfigManager.TextConfig.GetTextById("CookInputCount");
		this.WNt.SetTitleText(t);
	}
}
