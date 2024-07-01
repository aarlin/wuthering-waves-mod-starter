"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MediumItemGrid = void 0);
const UE = require("ue"),
	StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	ItemGridBase_1 = require("../ItemGridBase/ItemGridBase"),
	MediumItemGridBuffIconComponent_1 = require("./MediumItemGridComponent/MediumItemGridBuffIconComponent"),
	MediumItemGridCheckTickComponent_1 = require("./MediumItemGridComponent/MediumItemGridCheckTickComponent"),
	MediumItemGridCoolDownComponent_1 = require("./MediumItemGridComponent/MediumItemGridCoolDownComponent"),
	MediumItemGridCostComponent_1 = require("./MediumItemGridComponent/MediumItemGridCostComponent"),
	MediumItemGridDevelopRewardComponent_1 = require("./MediumItemGridComponent/MediumItemGridDevelopRewardComponent"),
	MediumItemGridDisableComponent_1 = require("./MediumItemGridComponent/MediumItemGridDisableComponent"),
	MediumItemGridElementComponent_1 = require("./MediumItemGridComponent/MediumItemGridElementComponent"),
	MediumItemGridEmptySlotComponent_1 = require("./MediumItemGridComponent/MediumItemGridEmptySlotComponent"),
	MediumItemGridLevelAndLockComponent_1 = require("./MediumItemGridComponent/MediumItemGridLevelAndLockComponent"),
	MediumItemGridMainVisionComponent_1 = require("./MediumItemGridComponent/MediumItemGridMainVisionComponent"),
	MediumItemGridNewFlagComponent_1 = require("./MediumItemGridComponent/MediumItemGridNewFlagComponent"),
	MediumItemGridPhantomLockComponent_1 = require("./MediumItemGridComponent/MediumItemGridPhantomLockComponent"),
	MediumItemGridProhibitComponent_1 = require("./MediumItemGridComponent/MediumItemGridProhibitComponent"),
	MediumItemGridReceivedComponent_1 = require("./MediumItemGridComponent/MediumItemGridReceivedComponent"),
	MediumItemGridRecommendComponent_1 = require("./MediumItemGridComponent/MediumItemGridRecommendComponent"),
	MediumItemGridRedDotComponent_1 = require("./MediumItemGridComponent/MediumItemGridRedDotComponent"),
	MediumItemGridReduceButtonComponent_1 = require("./MediumItemGridComponent/MediumItemGridReduceButtonComponent"),
	MediumItemGridRoleHeadComponent_1 = require("./MediumItemGridComponent/MediumItemGridRoleHeadComponent"),
	MediumItemGridSortHighlightIndexComponent_1 = require("./MediumItemGridComponent/MediumItemGridSortHighlightIndexComponent"),
	MediumItemGridSortIndexComponent_1 = require("./MediumItemGridComponent/MediumItemGridSortIndexComponent"),
	MediumItemGridSpriteIconComponent_1 = require("./MediumItemGridComponent/MediumItemGridSpriteIconComponent"),
	MediumItemGridTeamIconComponent_1 = require("./MediumItemGridComponent/MediumItemGridTeamIconComponent"),
	MediumItemGridTimeFlagComponent_1 = require("./MediumItemGridComponent/MediumItemGridTimeFlagComponent"),
	MediumItemGridVisionFetterComponent_1 = require("./MediumItemGridComponent/MediumItemGridVisionFetterComponent"),
	MediumItemGridVisionRoleHeadComponent_1 = require("./MediumItemGridComponent/MediumItemGridVisionRoleHeadComponent"),
	MediumItemGridVisionSlotComponent_1 = require("./MediumItemGridComponent/MediumItemGridVisionSlotComponent"),
	TRIAL_ROLE_ID = 1e4;
class MediumItemGrid extends ItemGridBase_1.ItemGridBase {
	constructor() {
		super(...arguments),
			(this.ext = 0),
			(this.txt = 0),
			(this.ixt = void 0),
			(this.oxt = void 0),
			(this.rxt = void 0),
			(this.nxt = (e) => {
				this.rxt && this.rxt(e, this, this.Data);
			}),
			(this.OnClickedReduceButton = () => {
				var e;
				this.ixt &&
					((e = { MediumItemGrid: this, Data: this.Data }), this.ixt(e));
			}),
			(this.OnClickedEmptySlotButton = () => {
				var e;
				this.oxt &&
					((e = { MediumItemGrid: this, Data: this.Data }), this.oxt(e));
			});
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UISprite],
			[1, UE.UITexture],
			[2, UE.UIText],
			[3, UE.UISprite],
			[4, UE.UIItem],
			[5, UE.UIItem],
			[6, UE.UIExtendToggle],
		];
	}
	OnSetBottomAdditionItem() {
		return this.GetItem(5);
	}
	OnSetTopAdditionItem() {
		return this.GetItem(4);
	}
	UnBindComponentEvents() {
		this.UnBindReduceButtonCallback(),
			this.UnBindEmptySlotButtonCallback(),
			this.UnBindReduceLongPress();
	}
	Apply(e) {
		this.ClearVisibleComponent(),
			this.ClearComponentList(),
			1 === e.Type && this.sxt(e),
			4 === e.Type && this.axt(e),
			3 === e.Type && this.hxt(e),
			2 === e.Type && this.lxt(e),
			this.RefreshComponentVisible(),
			this.RefreshComponentHierarchyIndex();
	}
	sxt(e) {
		(this.Data = e.Data),
			this.SetEmptySlotVisible(!0),
			this.IIt(void 0),
			this._xt(void 0),
			this.uxt(!1),
			this.cxt(!1),
			this.SetExtendToggleEnable(!0),
			this.ApplyEmptyDisplay(e);
	}
	axt(e) {
		var t = e.StarLevel,
			i = e.IsNewVisible,
			o = e.BuffIconType,
			n = e.IsRedDotVisible,
			m = e.IsLockVisible,
			d = e.Level,
			r = e.IsLevelTextUseChangeColor,
			s = e.CoolDown,
			I = e.TotalCoolDown,
			l = e.IsProhibit,
			p = e.ReduceButtonInfo,
			u = e.IsCheckTick,
			h = e.IsTimeFlagVisible,
			C = e.IsReceivedFlagVisible,
			a = e.RoleHeadInfo,
			S = e.SortIndex,
			G = e.IsDisable,
			M = e.IsMainVisionVisible,
			c = e.VisionFetterGroupId,
			g = e.VisionRoleHeadInfo,
			x =
				3 ===
				ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(
					e.ItemConfigId,
				);
		this.SetStartLevel(t),
			this.SetBuffSprite(o),
			this.SetRedDotVisible(n),
			this.SetLevelAndLock(d, m, r, x),
			this.SetCoolDown(s, I),
			this.SetIsProhibit(l),
			this.SetReduceButton(p),
			this.SetCheckTickVisible(u),
			this.SetTimeFlagVisible(h),
			this.SetReceivedFlagVisible(C),
			this.SetRoleHead(a),
			this.SetSortIndex(S),
			this.SetIsDisable(G),
			this.SetIsMainVision(M),
			this.SetNewVisible(!n && i),
			this.SetVisionFetterGroup(c),
			this.SetVisionRoleHead(g),
			this.ApplyPropBaseDisplay(e);
	}
	hxt(e) {
		var t = e.StarLevel,
			i = e.IsMainVisionVisible,
			o = e.RoleHeadInfo,
			n = e.IsNewVisible,
			m = e.IsLockVisible,
			d = e.IsPhantomLock,
			r = e.DevelopRewardInfo,
			s = e.IsRedDotVisible,
			I = e.Level,
			l = e.IsLevelTextUseChangeColor,
			p = e.FetterGroupId,
			u = e.VisionRoleHeadInfo;
		this.SetStartLevel(t),
			this.SetRedDotVisible(s),
			this.SetIsMainVision(i),
			this.SetRoleHead(o),
			this.SetLevelAndLock(I, m, l, !0),
			this.SetIsPhantomLock(d),
			this.SetDevelopRewardInfo(r),
			this.SetNewVisible(n),
			this.SetVisionFetterGroup(p),
			this.SetVisionRoleHead(u),
			this.ApplyPhantomBaseDisplay(e);
	}
	lxt(e) {
		this.SetElement(e.ElementId),
			this.SetSortIndex(e.Index, e.HighlightIndex),
			this.SetTeamIcon(e.IsInTeam),
			this.SetRecommendVisible(e.IsRecommendVisible),
			this.SetIsDisable(e.IsDisable),
			this.SetTrialRoleVisible(e.IsTrialRoleVisible),
			this.SetLevelAndLock(e.Level, e.IsShowLock, e.IsLevelTextUseChangeColor),
			this.SetNewVisible(e.IsNewVisible),
			this.mxt(e.IsShowCost, e.ItemConfigId),
			this.ApplyCharacterBaseDisplay(e);
	}
	SetBuffSprite(e) {
		this.RefreshComponent(
			MediumItemGridBuffIconComponent_1.MediumItemGridBuffIconComponent,
			void 0 !== e && 0 !== e,
			e,
		);
	}
	SetLevelAndLock(e, t, i, o) {
		(i = {
			Level: e,
			IsLockVisible: t,
			IsLevelUseChangeColor: i,
			IsUseVision: o,
		}),
			this.RefreshComponent(
				MediumItemGridLevelAndLockComponent_1.MediumItemGridLevelAndLockComponent,
				void 0 !== e || t,
				i,
			);
	}
	SetRedDotVisible(e) {
		this.RefreshComponent(
			MediumItemGridRedDotComponent_1.MediumItemGridRedDotComponent,
			e,
			e,
		);
	}
	SetNewVisible(e) {
		this.RefreshComponent(
			MediumItemGridNewFlagComponent_1.MediumItemGridNewFlagComponent,
			e,
			e,
		);
	}
	SetStartLevel(e) {}
	SetRoleHead(e) {
		this.RefreshComponent(
			MediumItemGridRoleHeadComponent_1.MediumItemGridRoleHeadComponent,
			void 0 !== e && 0 < e.RoleConfigId,
			e,
		);
	}
	SetVisionRoleHead(e) {
		this.RefreshComponent(
			MediumItemGridVisionRoleHeadComponent_1.MediumItemGridVisionRoleHeadComponent,
			void 0 !== e && 0 < e.RoleConfigId,
			e,
		);
	}
	SetVisionSlotState(e) {
		this.RefreshComponent(
			MediumItemGridVisionSlotComponent_1.MediumItemGridVisionSlotComponent,
			void 0 !== e && 0 < e.length,
			e,
		);
	}
	SetIsPhantomLock(e) {
		this.RefreshComponent(
			MediumItemGridPhantomLockComponent_1.MediumItemGridPhantomLockComponent,
			e,
			e,
		);
	}
	SetDevelopRewardInfo(e) {
		this.RefreshComponent(
			MediumItemGridDevelopRewardComponent_1.MediumItemGridDevelopRewardComponent,
			void 0 !== e,
			e,
		);
	}
	SetIsMainVision(e) {
		this.RefreshComponent(
			MediumItemGridMainVisionComponent_1.MediumItemGridMainVisionComponent,
			e,
			e,
		);
	}
	SetCoolDown(e, t) {
		(t = { CoolDown: e, TotalCdTime: t }),
			this.RefreshComponent(
				MediumItemGridCoolDownComponent_1.MediumItemGridCoolDownComponent,
				void 0 !== e && 0 < e,
				t,
			);
	}
	SetIsProhibit(e) {
		this.RefreshComponent(
			MediumItemGridProhibitComponent_1.MediumItemGridProhibitComponent,
			e,
			e,
		);
	}
	SetReduceButton(e) {
		var t = e?.IsVisible;
		(e = this.RefreshComponent(
			MediumItemGridReduceButtonComponent_1.MediumItemGridReduceButtonComponent,
			t,
			e,
		)) &&
			(t
				? (e.BindReduceButtonCallback(this.OnClickedReduceButton),
					e.BindLongPressCallback(this.nxt))
				: (e.UnBindReduceButtonCallback(), e.UnBindLongPressCallback()));
	}
	SetSortIndex(e, t = !1) {
		t
			? this.RefreshComponent(
					MediumItemGridSortHighlightIndexComponent_1.MediumItemGridSortHighlightIndexComponent,
					void 0 !== e,
					e,
				)
			: this.RefreshComponent(
					MediumItemGridSortIndexComponent_1.MediumItemGridSortIndexComponent,
					void 0 !== e,
					e,
				);
	}
	SetTeamIcon(e) {
		this.RefreshComponent(
			MediumItemGridTeamIconComponent_1.MediumItemGridTeamIconComponent,
			void 0 !== e,
			e,
		);
	}
	BindReduceLongPress(e) {
		this.rxt = e;
	}
	UnBindReduceLongPress() {
		this.rxt = void 0;
	}
	SetCheckTickVisible(e) {
		var t = { IsCheckTick: e };
		this.RefreshComponent(
			MediumItemGridCheckTickComponent_1.MediumItemGridCheckTickComponent,
			e,
			t,
		);
	}
	SetCheckTickPerformance(e, t, i, o) {
		(t = { IsCheckTick: e, HexColor: t, Alpha: i, TickHexColor: o }),
			this.RefreshComponent(
				MediumItemGridCheckTickComponent_1.MediumItemGridCheckTickComponent,
				e,
				t,
			);
	}
	SetTimeFlagVisible(e) {
		this.RefreshComponent(
			MediumItemGridTimeFlagComponent_1.MediumItemGridTimeFlagComponent,
			e,
			e,
		);
	}
	SetReceivedFlagVisible(e) {
		this.RefreshComponent(
			MediumItemGridReceivedComponent_1.MediumItemGridReceivedComponent,
			e,
			e,
		);
	}
	SetEmptySlotVisible(e) {
		var t = this.RefreshComponent(
			MediumItemGridEmptySlotComponent_1.MediumItemGridEmptySlotComponent,
			e,
			e,
		);
		t &&
			(e
				? t.BindEmptySlotButtonCallback(this.OnClickedEmptySlotButton)
				: t.UnBindEmptySlotButtonCallback());
	}
	uxt(e) {
		this.GetSprite(3).SetUIActive(e);
	}
	SetElement(e) {
		this.RefreshComponent(
			MediumItemGridElementComponent_1.MediumItemGridElementComponent,
			void 0 !== e,
			e,
		);
	}
	SetRecommendVisible(e) {
		this.RefreshComponent(
			MediumItemGridRecommendComponent_1.MediumItemGridRecommendComponent,
			e,
			e,
		);
	}
	SetIsDisable(e) {
		this.RefreshComponent(
			MediumItemGridDisableComponent_1.MediumItemGridDisableComponent,
			e,
			e,
		);
	}
	SetVisionFetterGroup(e) {
		this.RefreshComponent(
			MediumItemGridVisionFetterComponent_1.MediumItemGridVisionFetterComponent,
			void 0 !== e && 0 < e,
			e,
		);
	}
	IsDisable() {
		var e = this.GetItemGridComponent(
			MediumItemGridDisableComponent_1.MediumItemGridDisableComponent,
		);
		return !!e && e.GetActive();
	}
	SetTrialRoleVisible(e) {
		this.RefreshComponent(
			MediumItemGridTimeFlagComponent_1.MediumItemGridTimeFlagComponent,
			e,
			e,
		);
	}
	SetIconSprite(e) {
		this.RefreshComponent(
			MediumItemGridSpriteIconComponent_1.MediumItemGridSpriteIconComponent,
			void 0 !== e && "" !== e,
			e,
		);
	}
	ApplyEmptyDisplay(e) {
		var t = e.BottomTextId,
			i = e.BottomText,
			o =
				((e = e.BottomTextParameter),
				!StringUtils_1.StringUtils.IsEmpty(t) ||
					!StringUtils_1.StringUtils.IsEmpty(i));
		this.cxt(o), o && (this.SetBottomTextId(t, e), this.SetBottomText(i));
	}
	ApplyPropBaseDisplay(e) {
		var t = e.ItemConfigId,
			i = e.BottomTextId,
			o = e.BottomText,
			n = e.BottomTextParameter,
			m = e.SpriteIconPath,
			d =
				((this.Data = e.Data),
				e.IconPath
					? ((d = this.GetTexture(1)),
						this.SetTextureByPath(e.IconPath, d),
						d?.SetUIActive(!0))
					: this.IIt(t),
				this.SetIconSprite(m),
				e.QualityId
					? this.SetQualityIconById(
							this.GetSprite(0),
							e.QualityId,
							void 0,
							e.QualityType,
						)
					: this._xt(t),
				!StringUtils_1.StringUtils.IsEmpty(i) ||
					!StringUtils_1.StringUtils.IsEmpty(o));
		this.cxt(d),
			d && (this.SetBottomTextId(i, n), this.SetBottomText(o)),
			this.SetExtendToggleEnable(!0),
			this.uxt(!0);
	}
	ApplyPhantomBaseDisplay(e) {
		var t = e.ItemConfigId,
			i = e.BottomTextId,
			o = e.BottomText,
			n = e.BottomTextParameter,
			m = e.MonsterId,
			d = e.QualityIconResourceId;
		(this.Data = e.Data),
			m ? this.dxt(m) : this.IIt(t),
			void 0 !== d
				? this.Cxt(d)
				: e.QualityId
					? this.SetQualityIconById(
							this.GetSprite(0),
							e.QualityId,
							void 0,
							e.QualityType,
						)
					: this._xt(t),
			(m =
				!StringUtils_1.StringUtils.IsEmpty(i) ||
				!StringUtils_1.StringUtils.IsEmpty(o));
		this.cxt(m),
			m && (this.SetBottomTextId(i, n), this.SetBottomText(o)),
			this.SetExtendToggleEnable(!0),
			this.uxt(!0);
	}
	ApplyCharacterBaseDisplay(e) {
		let t = e.ItemConfigId;
		var i = e.BottomTextId,
			o = e.BottomText,
			n = e.BottomTextParameter,
			m =
				((e = ((this.Data = e.Data), this.GetTexture(1))),
				(m =
					(t > 1e4 &&
						(t = (m =
							ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfig(t))
							.ParentId),
					ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(t)))
					.RoleHeadIconLarge);
		this.SetRoleIcon(m, e, t),
			this._xt(t),
			e?.SetUIActive(!0),
			(m =
				!StringUtils_1.StringUtils.IsEmpty(i) ||
				!StringUtils_1.StringUtils.IsEmpty(o));
		this.cxt(m),
			m && (this.SetBottomTextId(i, n), this.SetBottomText(o)),
			this.SetExtendToggleEnable(!0),
			this.uxt(!0);
	}
	IIt(e) {
		var t = this.GetTexture(1);
		void 0 === e
			? t.SetUIActive(!1)
			: (this.ext !== e && ((this.ext = e), this.SetItemIcon(t, e)),
				t.SetUIActive(!0));
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
	_xt(e) {
		var t = this.GetSprite(0);
		void 0 === e
			? t.SetUIActive(!1)
			: (this.txt !== e &&
					((this.txt = e),
					this.SetItemQualityIcon(
						t,
						e,
						void 0,
						"MediumItemGridQualitySpritePath",
					)),
				t.SetUIActive(!0));
	}
	Cxt(e) {
		var t = this.GetSprite(0);
		void 0 === e ||
		((e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e)),
		StringUtils_1.StringUtils.IsEmpty(e))
			? t.SetUIActive(!1)
			: (this.SetSpriteByPath(e, t, !0), t.SetUIActive(!0));
	}
	cxt(e) {
		var t = this.GetText(2);
		t.IsUIActiveSelf() !== e && t.SetUIActive(e);
	}
	SetBottomTextId(e, t) {
		var i = this.GetText(2);
		StringUtils_1.StringUtils.IsEmpty(e) ||
			(t
				? LguiUtil_1.LguiUtil.SetLocalTextNew(i, e, ...t)
				: LguiUtil_1.LguiUtil.SetLocalTextNew(i, e));
	}
	SetBottomText(e) {
		var t = this.GetText(2);
		StringUtils_1.StringUtils.IsEmpty(e) || t.SetText(e);
	}
	BindReduceButtonCallback(e, t) {
		this.ixt = e;
	}
	UnBindReduceButtonCallback() {
		this.ixt = void 0;
	}
	BindEmptySlotButtonCallback(e) {
		this.oxt = e;
	}
	UnBindEmptySlotButtonCallback() {
		this.oxt = void 0;
	}
	GetItemGridExtendToggle() {
		return this.GetExtendToggle(6);
	}
	mxt(e, t) {
		this.RefreshComponent(
			MediumItemGridCostComponent_1.MediumItemGridCostComponent,
			e,
			t,
		);
	}
	SetBottomTextColor(e) {
		this.GetText(2).SetColor(UE.Color.FromHex(e));
	}
}
exports.MediumItemGrid = MediumItemGrid;
