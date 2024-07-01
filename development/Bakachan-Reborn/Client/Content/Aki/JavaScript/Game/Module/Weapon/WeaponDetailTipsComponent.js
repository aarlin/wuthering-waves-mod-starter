"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.WeaponDetailTipsComponent = void 0);
const UE = require("ue"),
	Log_1 = require("../../../Core/Common/Log"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../Ui/Base/UiPanelBase"),
	AttributeItem_1 = require("../Common/AttributeItem"),
	ButtonItem_1 = require("../Common/Button/ButtonItem"),
	CommonEquippedItem_1 = require("../Common/CommonEquippedItem"),
	StarItem_1 = require("../RoleUi/View/StarItem"),
	GenericLayout_1 = require("../Util/Layout/GenericLayout"),
	LguiUtil_1 = require("../Util/LguiUtil"),
	WeaponInstance_1 = require("./WeaponInstance"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder");
class WeaponDetailTipsComponent extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.WeaponData = void 0),
			(this.ReplaceButtonItem = void 0),
			(this.CultureButtonItem = void 0),
			(this.CanShowEquip = !1),
			(this.yOo = void 0),
			(this.CanShowLock = !0),
			(this.StarLayout = void 0),
			(this.AttributeLayout = void 0),
			(this.IOo = (e) => {
				e = 1 !== e;
				var t = this.GetWeaponIncId();
				t <= 0 ||
					ControllerHolder_1.ControllerHolder.InventoryController.ItemLockRequest(
						t,
						e,
					);
			}),
			(this.sAt = () => new StarItem_1.StarItem()),
			(this.Flo = () => new AttributeItem_1.AttributeItem());
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UISprite],
			[1, UE.UIText],
			[2, UE.UIText],
			[3, UE.UIExtendToggle],
			[4, UE.UIHorizontalLayout],
			[5, UE.UIVerticalLayout],
			[6, UE.UIText],
			[7, UE.UIText],
			[8, UE.UIText],
			[9, UE.UIText],
			[10, UE.UIItem],
			[11, UE.UIItem],
			[12, UE.UIItem],
		]),
			(this.BtnBindInfo = [[3, this.IOo]]);
	}
	OnStart() {
		(this.ReplaceButtonItem = new ButtonItem_1.ButtonItem(this.GetItem(11))),
			(this.CultureButtonItem = new ButtonItem_1.ButtonItem(this.GetItem(12))),
			(this.StarLayout = new GenericLayout_1.GenericLayout(
				this.GetHorizontalLayout(4),
				this.sAt,
			)),
			(this.AttributeLayout = new GenericLayout_1.GenericLayout(
				this.GetVerticalLayout(5),
				this.Flo,
			)),
			(this.yOo = new CommonEquippedItem_1.CommonEquippedItem()),
			this.yOo.CreateThenShowByActor(this.GetItem(10).GetOwner());
	}
	SetCanShowEquip(e = !1) {
		(this.CanShowEquip = e),
			this.CanShowEquip || this.yOo?.SetIconRootItemState(!1);
	}
	SetCanShowLock(e) {
		this.CanShowLock = e;
	}
	jlo(e) {
		e = [
			{ PropId: e.FirstPropId, CurveId: e.FirstCurve },
			{ PropId: e.SecondPropId, CurveId: e.SecondCurve },
		];
		var t = this.WeaponData.GetLevel(),
			o = this.WeaponData.GetBreachLevel(),
			a = [];
		for (const r of e) {
			var i = r.PropId,
				n = ModelManager_1.ModelManager.WeaponModel.GetCurveValue(
					r.CurveId,
					i.Value,
					t,
					o,
				);
			i = { Id: i.Id, IsRatio: i.IsRatio, CurValue: n, BgActive: !0 };
			a.push(i);
		}
		this.AttributeLayout.RefreshByData(a);
	}
	kPt(e, t) {
		var o = new Array(t);
		for (let i = 0; i < t; ++i) {
			var a = {
				StarOnActive: i < e,
				StarOffActive: i >= e,
				StarNextActive: !1,
				StarLoopActive: !1,
				PlayLoopSequence: !1,
				PlayActivateSequence: !1,
			};
			o[i] = a;
		}
		this.StarLayout.RefreshByData(o);
	}
	vjt(e) {
		for (const t of ConfigManager_1.ConfigManager.MappingConfig.GetWeaponConfList())
			if (e === t.Value) {
				this.SetSpriteByPath(t.Icon, this.GetSprite(0), !1);
				break;
			}
	}
	UpdateComponent(e) {
		var t = (this.WeaponData = e).GetWeaponConfig(),
			o = e.GetLevel(),
			a = e.GetBreachLevel(),
			i = t.WeaponName,
			n = ModelManager_1.ModelManager.WeaponModel.GetWeaponBreachMaxLevel(
				t.BreachId,
			),
			r = e.GetBreachConfig(),
			s = e.GetResonanceLevel();
		LguiUtil_1.LguiUtil.SetLocalText(
			this.GetText(2),
			"LevelRichText",
			o,
			r.LevelLimit,
		),
			(o = ConfigManager_1.ConfigManager.ItemConfig.GetQualityConfig(
				t.QualityId,
			)),
			(r = UE.Color.FromHex(o.DropColor));
		(i =
			((o =
				(this.GetText(1).SetColor(r),
				this.GetText(1).ShowTextNew(i),
				this.vjt(t.WeaponType),
				this.jlo(t),
				this.kPt(a, n),
				LguiUtil_1.LguiUtil.SetLocalText(
					this.GetText(6),
					"WeaponResonanceItemLevelText",
					s,
				),
				LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(9), t.BgDescription),
				ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponResonanceConfig(
					t.ResonId,
					s,
				)))
				? (this.GetText(7).SetUIActive(!0),
					this.GetText(8).SetUIActive(!0),
					this.GetText(7).SetText(
						ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponResonanceDesc(
							o.Name,
						),
					),
					(r =
						ModelManager_1.ModelManager.WeaponModel.GetWeaponConfigDescParams(
							t,
							s,
						)),
					LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), t.Desc, ...r))
				: (this.GetText(7).SetUIActive(!1), this.GetText(8).SetUIActive(!1)),
			e)) instanceof WeaponInstance_1.WeaponInstance
			? (this.TOo(!0),
				this.LOo(!0),
				(a = i.GetIncId()),
				this.ReplaceButtonItem.SetData(a),
				this.CultureButtonItem.SetData(a),
				this.UpdateWeaponLock(i.IsLock()))
			: (this.TOo(!1), this.LOo(!1));
	}
	UpdateWeaponLock(e) {
		(e = e ? 0 : 1), this.GetExtendToggle(3).SetToggleState(e, !1);
	}
	SetReplaceFunction(e) {
		this.ReplaceButtonItem.SetFunction(e);
	}
	SetReplaceEnableClick(e) {
		this.ReplaceButtonItem.SetEnableClick(e);
	}
	SetCultureFunction(e) {
		this.CultureButtonItem.SetFunction(e);
	}
	UpdateEquip(e) {
		var t;
		this.CanShowEquip &&
			(t = this.WeaponData) instanceof WeaponInstance_1.WeaponInstance &&
			(0 === (t = t.GetRoleId())
				? (this.yOo.SetCurrentEquippedState(!1),
					this.yOo.SetIconRootItemState(!1),
					this.ReplaceButtonItem.SetEnableClick(!0))
				: (this.ReplaceButtonItem.SetEnableClick(t !== e),
					this.yOo.SetCurrentEquippedState(!0),
					this.yOo.SetIconRootItemState(!0),
					(e = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(t)),
					this.yOo.SetEquipIcon(e.GetRoleConfig().RoleHeadIcon),
					this.yOo.SetEquipText("WeaponTipsRoleText", e.GetName())));
	}
	GetWeaponIncId() {
		var e = this.WeaponData;
		return e instanceof WeaponInstance_1.WeaponInstance ? e.GetIncId() ?? 0 : 0;
	}
	TOo(e) {
		this.GetExtendToggle(3).RootUIComp.SetUIActive(e && this.CanShowLock);
	}
	LOo(e) {
		this.ReplaceButtonItem.SetActive(e), this.CultureButtonItem.SetActive(e);
	}
	GetGuideUiItemAndUiItemForShowEx(e) {
		if (!(e.length < 1)) {
			var t = this.GetGuideUiItem(e[1]);
			if (t) return [t, t];
		}
		Log_1.Log.CheckError() &&
			Log_1.Log.Error("Guide", 17, "武器详情界面聚焦引导的额外参数配置错误", [
				"configParams",
				e,
			]);
	}
}
exports.WeaponDetailTipsComponent = WeaponDetailTipsComponent;
