"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ManufactureView = void 0);
const UE = require("ue"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	UiLayerType_1 = require("../../../Ui/Define/UiLayerType"),
	UiLayer_1 = require("../../../Ui/UiLayer"),
	CommonCountPanel_1 = require("../../Common/CommonCountPanel"),
	UiNavigationView_1 = require("../../UiNavigation/UiNavigationView"),
	GenericLayoutNew_1 = require("../../Util/Layout/GenericLayoutNew"),
	CommonItemView_1 = require("./CommonItemView"),
	CommonManager_1 = require("./CommonManager");
class ManufactureView extends UiNavigationView_1.UiNavigationView {
	constructor() {
		super(...arguments),
			(this.iNt = void 0),
			(this.Nyi = void 0),
			(this.DNt = void 0),
			(this.LNt = void 0),
			(this.RNt = !0),
			(this.gIt = 0),
			(this.t6 = 1),
			(this.rNt = (t, e, i) => (
				(e = new CommonItemView_1.MaterialItem(e)).Update(t),
				e.BindOnClickedCallback(this.PNt),
				{ Key: i, Value: e }
			)),
			(this.xNt = () =>
				CommonManager_1.CommonManager.GetMaxCreateCount(this.gIt)),
			(this.yqt = (t) => {
				(this.t6 = t), this.Iqt();
			}),
			(this.bl = () => {
				this.GetActive() &&
					(CommonManager_1.CommonManager.SetCurrentRoleId(
						CommonManager_1.CommonManager.GetManufactureRoleId(this.gIt),
					),
					(this.t6 = 1),
					this.hke(),
					this.wNt(),
					this.Oyi(),
					this.bNt(),
					this.rFe(),
					this.qNt());
			}),
			(this.kyi = () => {
				this.Oyi();
			}),
			(this.Fyi = () => {
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.OpenHelpRole,
					this.gIt,
				);
			}),
			(this.dIt = () => {
				CommonManager_1.CommonManager.SendManufacture(this.gIt, this.t6);
			}),
			(this.eGt = () => {
				ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
					"MaterialShort",
				);
			}),
			(this.PNt = (t) => {
				ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
					t.G3n,
				);
			}),
			(this.Vyi = () => {}),
			(this.Hyi = () => {});
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
				[6, this.eGt],
			]);
	}
	OnStart() {
		(this.Nyi = new OpenHelpRoleButton(this.GetItem(4))),
			this.Nyi.BindOnCallback(this.Fyi),
			(this.iNt = new GenericLayoutNew_1.GenericLayoutNew(
				this.GetHorizontalLayout(2),
				this.rNt,
			)),
			CommonManager_1.CommonManager.CheckShowAmountItem()
				? (this.GetItem(5).SetUIActive(!0),
					(this.DNt = new AmountItem(this.GetItem(5))),
					this.DNt.BindGetMaxCallback(this.xNt),
					this.DNt.BindSetSumCallback(this.yqt))
				: this.GetItem(5).SetUIActive(!1),
			(this.LNt = new IconItem(this.GetItem(1)));
	}
	OnBeforeDestroy() {
		this.Cde(),
			this.iNt.ClearChildren(),
			(this.iNt = void 0),
			(this.DNt = void 0);
	}
	dde() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.ComposeSuccess,
			this.Hyi,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.ComposeSuccess,
				this.bl,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.ForgingSuccess,
				this.Vyi,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.ForgingSuccess,
				this.bl,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.CloseHelpRole,
				this.kyi,
			);
	}
	Cde() {
		this.RNt ||
			(EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.ComposeSuccess,
				this.Hyi,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.ComposeSuccess,
				this.bl,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.ForgingSuccess,
				this.Vyi,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.ForgingSuccess,
				this.bl,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.CloseHelpRole,
				this.kyi,
			));
	}
	HideView(t) {
		this.SetActive(!t),
			t ||
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.SwitchViewType,
					2,
				);
	}
	ShowView(t) {
		EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SwitchViewType, 2),
			this.SetActive(!0),
			this.RNt && (this.dde(), (this.RNt = !1)),
			(this.gIt = t),
			this.bl();
	}
	hke() {
		var t = CommonManager_1.CommonManager.GetCommonManufactureText(this.gIt);
		this.GetText(0).SetText(t);
	}
	wNt() {
		var t = CommonManager_1.CommonManager.GetCommonManufactureId(this.gIt);
		this.LNt.SetIcon(t), this.LNt.SetQuality(t);
	}
	Oyi() {
		CommonManager_1.CommonManager.CheckShowRoleView()
			? (this.Nyi.SetActive(!0),
				this.Nyi.RefreshIcon(),
				this.Nyi.RefreshRedDot(this.gIt))
			: this.Nyi.SetActive(!1);
	}
	bNt() {
		this.iNt.RebuildLayoutByDataNew(
			CommonManager_1.CommonManager.GetManufactureMaterialList(this.gIt),
		);
	}
	Iqt() {
		for (const t of this.iNt.GetLayoutItemMap().values())
			t.RefreshNeed(this.t6);
	}
	rFe() {
		var t = this.GetButton(3)
				.GetOwner()
				.GetComponentByClass(UE.UIInteractionGroup.StaticClass()),
			e = this.GetButton(6).GetOwner(),
			i = CommonManager_1.CommonManager.CheckCanManufacture(this.gIt);
		t.SetInteractable(i), e.GetUIItem().SetUIActive(!i);
	}
	qNt() {
		this.DNt && (this.DNt.ResetSum(), this.DNt.RefreshAddAndDelButton());
	}
	GetGuideUiItemAndUiItemForShowEx(t) {
		if ((t = this.GetGuideUiItem(t[1]))) return [t, t];
	}
}
exports.ManufactureView = ManufactureView;
class OpenHelpRoleButton extends UiPanelBase_1.UiPanelBase {
	constructor(t) {
		super(),
			(this.yVe = void 0),
			(this.jyi = () => {
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
			(this.BtnBindInfo = [[0, this.jyi]]);
	}
	RefreshIcon() {
		var t = CommonManager_1.CommonManager.GetCurrentRoleId(),
			e = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(t);
		this.SetRoleIcon(e.GetRoleConfig().RoleHeadIcon, this.GetTexture(1), t);
	}
	RefreshRedDot(t) {
		var e = CommonManager_1.CommonManager.GetCurrentRoleId();
		this.GetItem(2).SetUIActive(
			CommonManager_1.CommonManager.CheckIsBuffEx(e, t),
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
			(this.Wyi = () => {
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
				[2, this.Wyi],
			]);
	}
	async YNt() {
		(this.WNt = new CommonCountPanel_1.CommonItemCountPanel()),
			await this.WNt.CreateThenShowByResourceIdAsync(
				"UiItem_ShopCountPanel_Prefab",
				UiLayer_1.UiLayer.GetLayerRootUiItem(UiLayerType_1.ELayerType.Normal),
			),
			this.WNt.SetConfirmFunction(this.KNt);
	}
	OnStart() {
		this.GetText(3).SetText(this.VNt.toString());
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
class IconItem extends UiPanelBase_1.UiPanelBase {
	constructor(t) {
		super(), this.CreateThenShowByActor(t.GetOwner());
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[3, UE.UITexture],
			[4, UE.UISprite],
		];
	}
	SetIcon(t) {
		this.SetItemIcon(this.GetTexture(3), t);
	}
	SetQuality(t) {
		this.SetItemQualityIcon(this.GetSprite(4), t);
	}
}
