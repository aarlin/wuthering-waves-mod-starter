"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SmallItemGrid = void 0);
const UE = require("ue"),
	StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	ItemGridBase_1 = require("../ItemGridBase/ItemGridBase"),
	SmallItemGridCookUpComponent_1 = require("./SmallItemGridComponent/SmallItemGridCookUpComponent"),
	SmallItemGridCoolDownComponent_1 = require("./SmallItemGridComponent/SmallItemGridCoolDownComponent"),
	SmallItemGridCurrentEquipmentComponent_1 = require("./SmallItemGridComponent/SmallItemGridCurrentEquipmentComponent"),
	SmallItemGridDisableComponent_1 = require("./SmallItemGridComponent/SmallItemGridDisableComponent"),
	SmallItemGridElementComponent_1 = require("./SmallItemGridComponent/SmallItemGridElementComponent"),
	SmallItemGridEmptySlotComponent_1 = require("./SmallItemGridComponent/SmallItemGridEmptySlotComponent"),
	SmallItemGridFirstRewardComponent_1 = require("./SmallItemGridComponent/SmallItemGridFirstRewardComponent"),
	SmallItemGridLockBlackComponent_1 = require("./SmallItemGridComponent/SmallItemGridLockBlackComponent"),
	SmallItemGridLockComponent_1 = require("./SmallItemGridComponent/SmallItemGridLockComponent"),
	SmallItemGridNewFlagComponent_1 = require("./SmallItemGridComponent/SmallItemGridNewFlagComponent"),
	SmallItemGridNotFoundComponent_1 = require("./SmallItemGridComponent/SmallItemGridNotFoundComponent"),
	SmallItemGridReceivableComponent_1 = require("./SmallItemGridComponent/SmallItemGridReceivableComponent"),
	SmallItemGridReceivedComponent_1 = require("./SmallItemGridComponent/SmallItemGridReceivedComponent"),
	SmallItemGridSelectedFlagComponent_1 = require("./SmallItemGridComponent/SmallItemGridSelectedFlagComponent"),
	SmallItemGridVisionRoleHeadComponent_1 = require("./SmallItemGridComponent/SmallItemGridVisionRoleHeadComponent"),
	TRIAL_ROLE_ID = 1e4;
class SmallItemGrid extends ItemGridBase_1.ItemGridBase {
	constructor() {
		super(...arguments),
			(this.IsSelected = !1),
			(this.IsForceSelected = !1),
			(this.txt = 0),
			(this.oxt = void 0),
			(this.OnClickedEmptySlotButton = () => {
				var e;
				this.oxt &&
					((e = { SmallItemGrid: this, Data: this.Data }), this.oxt(e));
			});
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UISprite],
			[1, UE.UITexture],
			[2, UE.UIItem],
			[3, UE.UIText],
			[4, UE.UISprite],
			[5, UE.UIItem],
			[6, UE.UIItem],
			[7, UE.UIExtendToggle],
		];
	}
	OnSetBottomAdditionItem() {
		return this.GetItem(5);
	}
	OnSetTopAdditionItem() {
		return this.GetItem(6);
	}
	GetItemGridExtendToggle() {
		return this.GetExtendToggle(7);
	}
	Apply(e) {
		this.ClearVisibleComponent(),
			this.ClearComponentList(),
			1 === e.Type && this.ApplyEmptySmallItemGrid(e),
			4 === e.Type && this.ApplyPropSmallItemGrid(e),
			3 === e.Type && this.ApplyPhantomSmallItemGrid(e),
			2 === e.Type && this.ApplyCharacterSmallItemGrid(e),
			this.RefreshComponentVisible(),
			this.RefreshComponentHierarchyIndex();
	}
	ApplyEmptySmallItemGrid(e) {
		this.SetEmptySlotVisible(!0),
			this.IIt(void 0),
			this._xt(void 0),
			this.SetBottomTextVisible(!1),
			this.SetExtendToggleEnable(!1),
			this.SetElement(void 0);
	}
	ApplyPropSmallItemGrid(e) {
		var t = e.IsLockVisible,
			i = e.IsReceivableVisible,
			o = e.IsReceivedVisible,
			l = e.IsNewVisible,
			m = e.IsNotFoundVisible,
			n = e.CoolDownTime,
			r = e.IsDisable;
		this.SetIsDisable(r),
			this.SetLockVisible(t),
			this.SetReceivableVisible(i),
			this.SetReceivedVisible(o),
			this.SetNewFlagVisible(l),
			this.SetNotFoundVisible(m),
			this.SetCoolDown(n),
			this.gBt(e);
	}
	ApplyPhantomSmallItemGrid(e) {
		var t = e.IsLockVisible,
			i = e.IsLockVisibleBlack,
			o = e.IsReceivableVisible,
			l = e.IsReceivedVisible,
			m = e.IsNewVisible,
			n = e.IsNotFoundVisible,
			r = e.IsSelectedFlag,
			s = e.VisionRoleHeadInfo;
		this.SetLockVisible(t),
			this.SetLockBlackVisible(i),
			this.SetReceivableVisible(o),
			this.SetReceivedVisible(l),
			this.SetNewFlagVisible(m),
			this.SetNotFoundVisible(n),
			this.SetSelectedFlagVisible(r),
			this.SetVisionRoleHead(s),
			this.fBt(e);
	}
	ApplyCharacterSmallItemGrid(e) {
		var t = e.IsLockVisible,
			i = e.IsReceivableVisible,
			o = e.IsReceivedVisible,
			l = e.IsSelectedFlag,
			m = e.IsCookUp ?? !1;
		this.SetLockVisible(t),
			this.SetReceivableVisible(i),
			this.SetReceivedVisible(o),
			this.SetSelectedFlagVisible(l),
			this.pBt(m),
			this.SetElement(e.ElementId),
			this.vBt(e);
	}
	gBt(e) {
		var t,
			i = e.ItemConfigId,
			o = e.BottomTextId,
			l = e.BottomText,
			m = e.BottomTextParameter,
			n = e.IsQualityHidden,
			r = ((this.Data = e.Data), this.GetSprite(0));
		e.IconPath
			? ((t = this.GetTexture(1)), this.SetTextureByPath(e.IconPath, t))
			: this.IIt(i),
			n
				? r.SetUIActive(!1)
				: (0 < e.QualityId
						? this.SetQualityIconById(r, e.QualityId, void 0, e.QualityType)
						: 0 === e.QualityId
							? ((t =
									ModelManager_1.ModelManager.SmallItemGridModel
										.DefaultQualitySpritePath),
								this.SetSpriteByPath(t, r, !1))
							: this._xt(i),
					r.SetUIActive(!0)),
			(n =
				!StringUtils_1.StringUtils.IsEmpty(o) ||
				!StringUtils_1.StringUtils.IsEmpty(l));
		this.SetBottomTextVisible(n),
			n && (this.SetBottomTextId(o, m), this.SetBottomText(l)),
			this.SetExtendToggleEnable(!0);
	}
	SetElement(e) {
		this.RefreshComponent(
			SmallItemGridElementComponent_1.SmallItemGridElementComponent,
			void 0 !== e,
			e,
		);
	}
	fBt(e) {
		var t = e.ItemConfigId,
			i = e.BottomTextId,
			o = e.BottomText,
			l = e.BottomTextParameter,
			m = e.MonsterId,
			n = e.QualityIconResourceId,
			r = e.IsQualityHidden,
			s = e.IconHidden;
		(this.Data = e.Data),
			s ? this.GetTexture(1)?.SetUIActive(!1) : m ? this.dxt(m) : this.IIt(t),
			(e = this.GetSprite(0)),
			r ? e.SetUIActive(!1) : void 0 !== n ? this.Cxt(n) : this._xt(t),
			(s =
				!StringUtils_1.StringUtils.IsEmpty(i) ||
				!StringUtils_1.StringUtils.IsEmpty(o));
		this.SetBottomTextVisible(s),
			s && (this.SetBottomTextId(i, l), this.SetBottomText(o)),
			this.SetExtendToggleEnable(!0);
	}
	vBt(e) {
		let t = e.ItemConfigId;
		var i = e.BottomTextId,
			o = e.BottomText,
			l = e.BottomTextParameter,
			m = e.IsQualityHidden,
			n = ((this.Data = e.Data), this.GetTexture(1)),
			r = (r =
				(t > 1e4 &&
					(t = (r =
						ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfig(t))
						.ParentId),
				ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(t)))
				.RoleHeadIconBig;
		this.SetRoleIcon(r, n, t),
			n.SetUIActive(!0),
			(r = this.GetSprite(0)),
			m
				? r.SetUIActive(!1)
				: (0 < e.QualityId
						? this.SetQualityIconById(r, e.QualityId, void 0, e.QualityType)
						: 0 === e.QualityId
							? ((n =
									ModelManager_1.ModelManager.SmallItemGridModel
										.DefaultQualitySpritePath),
								this.SetSpriteByPath(n, r, !1))
							: this._xt(t),
					r.SetUIActive(!0)),
			(m =
				!StringUtils_1.StringUtils.IsEmpty(i) ||
				!StringUtils_1.StringUtils.IsEmpty(o));
		this.SetBottomTextVisible(m),
			m && (this.SetBottomTextId(i, l), this.SetBottomText(o)),
			this.SetExtendToggleEnable(!0);
	}
	SetLockVisible(e) {
		this.RefreshComponent(
			SmallItemGridLockComponent_1.SmallItemGridLockComponent,
			e,
			e,
		);
	}
	SetLockBlackVisible(e) {
		this.RefreshComponent(
			SmallItemGridLockBlackComponent_1.SmallItemGridLockBlackComponent,
			e,
			e,
		);
	}
	SetCurrentEquipmentVisible(e) {
		this.RefreshComponent(
			SmallItemGridCurrentEquipmentComponent_1.SmallItemGridCurrentEquipmentComponent,
			e,
			e,
		);
	}
	SetReceivableVisible(e) {
		this.RefreshComponent(
			SmallItemGridReceivableComponent_1.SmallItemGridReceivableComponent,
			e,
			e,
		);
	}
	SetReceivedVisible(e) {
		this.RefreshComponent(
			SmallItemGridReceivedComponent_1.SmallItemGridReceivedComponent,
			e,
			e,
		);
	}
	SetSelectedFlagVisible(e) {
		this.RefreshComponent(
			SmallItemGridSelectedFlagComponent_1.SmallItemGridSelectedFlagComponent,
			e,
			e,
		);
	}
	pBt(e) {
		this.RefreshComponent(
			SmallItemGridCookUpComponent_1.SmallItemGridCookUpComponent,
			e,
			e,
		);
	}
	SetFirstRewardVisible(e) {
		this.RefreshComponent(
			SmallItemGridFirstRewardComponent_1.SmallItemGridFirstRewardComponent,
			e,
			e,
		);
	}
	IIt(e) {
		var t = this.GetTexture(1);
		void 0 === e
			? t.SetUIActive(!1)
			: (this.SetItemIcon(t, e), t.SetUIActive(!0));
	}
	dxt(e) {
		var t = this.GetTexture(1);
		void 0 === e
			? t.SetUIActive(!1)
			: ((e =
					ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterIcon(e)),
				this.SetTextureByPath(e, t),
				t.SetUIActive(!0));
	}
	SetVisionRoleHead(e) {
		this.RefreshComponent(
			SmallItemGridVisionRoleHeadComponent_1.SmallItemGridVisionRoleHeadComponent,
			void 0 !== e,
			e,
		);
	}
	_xt(e) {
		var t = this.GetSprite(0);
		void 0 === e
			? t.SetUIActive(!1)
			: (this.txt !== e &&
					((this.txt = e), this.SetItemQualityIcon(t, e, void 0)),
				t.SetUIActive(!0));
	}
	SetCoolDown(e, t) {
		(t = { CoolDown: e, TotalCdTime: t }),
			this.RefreshComponent(
				SmallItemGridCoolDownComponent_1.SmallItemGridCoolDownComponent,
				void 0 !== e && 0 < e,
				t,
			);
	}
	SetEmptySlotVisible(e) {
		var t = this.RefreshComponent(
			SmallItemGridEmptySlotComponent_1.SmallItemGridEmptySlotComponent,
			e,
			e,
		);
		t &&
			(e
				? t.BindEmptySlotButtonCallback(this.OnClickedEmptySlotButton)
				: t.UnBindEmptySlotButtonCallback());
	}
	SetNewFlagVisible(e) {
		this.RefreshComponent(
			SmallItemGridNewFlagComponent_1.SmallItemGridNewFlagComponent,
			e,
			e,
		);
	}
	SetNotFoundVisible(e) {
		this.RefreshComponent(
			SmallItemGridNotFoundComponent_1.SmallItemGridNotFoundComponent,
			e,
			e,
		);
	}
	Cxt(e) {
		var t = this.GetSprite(0);
		void 0 === e ||
		((e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e)),
		StringUtils_1.StringUtils.IsEmpty(e))
			? t.SetUIActive(!1)
			: (this.SetSpriteByPath(e, t, !0), t.SetUIActive(!0));
	}
	SetBottomTextVisible(e) {
		var t = this.GetSprite(4),
			i = this.GetText(3);
		t.IsUIActiveSelf() !== e && t.SetUIActive(e),
			i.IsUIActiveSelf() !== e && i.SetUIActive(e);
	}
	SetIsDisable(e) {
		this.RefreshComponent(
			SmallItemGridDisableComponent_1.SmallItemGridDisableComponent,
			e,
			e,
		);
	}
	SetDisableComponentColor(e, t = !0) {
		(t = this.RefreshComponent(
			SmallItemGridDisableComponent_1.SmallItemGridDisableComponent,
			!1,
			t,
		)) &&
			t.GetAsync().then((t) => {
				t.SetSpriteColor(e);
			});
	}
	SetBottomTextId(e, t) {
		var i = this.GetText(3);
		StringUtils_1.StringUtils.IsEmpty(e) ||
			(t
				? LguiUtil_1.LguiUtil.SetLocalTextNew(i, e, ...t)
				: LguiUtil_1.LguiUtil.SetLocalTextNew(i, e));
	}
	SetBottomText(e) {
		var t = this.GetText(3);
		StringUtils_1.StringUtils.IsEmpty(e) || t.SetText(e);
	}
	SetBottomTextColor(e) {
		this.GetText(3).SetColor(UE.Color.FromHex(e));
	}
	SetSelected(e, t = !1) {
		var i = this.GetExtendToggle(7);
		e
			? t
				? i.SetToggleStateForce(1, !1)
				: i.SetToggleState(1, !1)
			: t
				? i.SetToggleStateForce(0, !1)
				: i.SetToggleState(0, !1),
			(this.IsSelected = e),
			(this.IsForceSelected = t);
	}
}
exports.SmallItemGrid = SmallItemGrid;
