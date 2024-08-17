"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TipsWeaponComponent = void 0);
const UE = require("ue"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	StarItem_1 = require("../../../RoleUi/View/StarItem"),
	GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
	GenericLayoutNew_1 = require("../../../Util/Layout/GenericLayoutNew"),
	LguiUtil_1 = require("../../../Util/LguiUtil"),
	ItemTipsAttribute_1 = require("./ItemTipsAttribute"),
	ItemTipsBaseSubComponent_1 = require("./ItemTipsBaseSubComponent"),
	ItemTipsGetWay_1 = require("./ItemTipsGetWay"),
	ItemTipsLockButton_1 = require("./ItemTipsLockButton");
class TipsWeaponComponent extends ItemTipsBaseSubComponent_1.TipsBaseSubComponent {
	constructor(t) {
		super(t),
			(this.Pe = void 0),
			(this.UPt = void 0),
			(this.LPt = void 0),
			(this.APt = void 0),
			(this.StarLayout = void 0),
			(this.tpt = (t, e, i) => ({
				Key: i,
				Value: new ItemTipsAttribute_1.TipsAttributeItem(e, t),
			})),
			(this.sAt = () => new StarItem_1.StarItem()),
			this.CreateThenShowByResourceIdAsync("UiItem_TipsWeapon", t);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIText],
			[2, UE.UIText],
			[3, UE.UIHorizontalLayout],
			[4, UE.UIItem],
			[5, UE.UIItem],
			[6, UE.UIVerticalLayout],
			[7, UE.UIItem],
			[8, UE.UIText],
			[9, UE.UIText],
			[10, UE.UIText],
			[11, UE.UIText],
			[12, UE.UIItem],
			[13, UE.UIItem],
			[14, UE.UIText],
			[15, UE.UIItem],
			[16, UE.UITexture],
			[17, UE.UIText],
		];
	}
	OnStart() {
		var t = this.GetItem(5);
		(this.UPt = new ItemTipsLockButton_1.TipsLockButton(t)),
			(this.APt = new GenericLayoutNew_1.GenericLayoutNew(
				this.GetVerticalLayout(6),
				this.tpt,
			)),
			(t = this.GetItem(12));
		(this.LPt = new ItemTipsGetWay_1.TipsGetWayPanel(t)),
			(this.StarLayout = new GenericLayout_1.GenericLayout(
				this.GetHorizontalLayout(3),
				this.sAt,
			));
	}
	OnBeforeDestroy() {
		this.Pe &&
			((this.Pe = void 0),
			ModelManager_1.ModelManager.ItemTipsModel.SetCurrentItemTipsData(void 0));
	}
	Refresh(t) {
		var e = () => {
			var t = this.Pe;
			this.GetText(0).SetText(t.WeaponType),
				this.GetText(1).SetText(t.WeaponLevel.toString() + "/"),
				this.GetText(2).SetText(t.WeaponLimitLevel.toString()),
				this.kPt(t.BreachLevel, t.BreachMaxLevel),
				t.IncId && this.UPt.Refresh(t.IncId, t.CanClickLockButton),
				this.UPt.SetUiActive(0 < t.IncId),
				this.APt.RebuildLayoutByDataNew(t.AttributeData),
				LguiUtil_1.LguiUtil.SetLocalTextNew(
					this.GetText(8),
					"Text_WeaponResonanceItemLevelText_Text",
					t.WeaponStage,
				),
				LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(9), t.WeaponSkillName),
				LguiUtil_1.LguiUtil.SetLocalTextNew(
					this.GetText(10),
					t.WeaponEffect,
					...t.WeaponEffectParam,
				),
				LguiUtil_1.LguiUtil.SetLocalTextNew(
					this.GetText(11),
					t.WeaponDescription,
				),
				this.DPt(t.GetWayData),
				this.RPt(t.LimitTimeTxt),
				this.BPt(t.IsEquip, t.EquippedId);
		};
		(this.Pe = t),
			ModelManager_1.ModelManager.ItemTipsModel.SetCurrentItemTipsData(t),
			this.InAsyncLoading() ? this.OperationMap.set("Refresh", e) : e();
	}
	kPt(t, e) {
		var i = new Array(e);
		for (let a = 0; a < e; ++a) {
			var o = {
				StarOnActive: a < t,
				StarOffActive: a >= t,
				StarNextActive: !1,
				StarLoopActive: !1,
				PlayLoopSequence: !1,
				PlayActivateSequence: !1,
			};
			i[a] = o;
		}
		this.StarLayout.RefreshByData(i);
	}
	DPt(t) {
		this.GetItem(12).SetUIActive(0 !== t.length), t && this.LPt.Refresh(t);
	}
	RPt(t) {
		this.GetItem(13).SetUIActive(void 0 !== t),
			t && this.GetText(14).ShowTextNew(t);
	}
	BPt(t, e = void 0) {
		this.GetItem(15).SetUIActive(t),
			t &&
				void 0 !== e &&
				((t = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e)),
				this.SetRoleIcon(
					t.GetRoleConfig().RoleHeadIcon,
					this.GetTexture(16),
					e,
				),
				LguiUtil_1.LguiUtil.SetLocalTextNew(
					this.GetText(17),
					"VisionEquipping",
					t.GetName(),
				));
	}
	SetLockButtonShow(t) {
		var e = () => {
			this.GetItem(5).SetUIActive(t);
		};
		this.InAsyncLoading() ? this.OperationMap.set("SetLockButtonShow", e) : e();
	}
}
exports.TipsWeaponComponent = TipsWeaponComponent;
