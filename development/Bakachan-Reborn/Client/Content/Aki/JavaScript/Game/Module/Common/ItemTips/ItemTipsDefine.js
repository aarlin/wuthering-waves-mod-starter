"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TipsCharacterData =
		exports.TipsVisionData =
		exports.TipsWeaponData =
		exports.TipsMaterialData =
		exports.ItemTipsData =
			void 0);
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
	PhantomRarityByRare_1 = require("../../../../Core/Define/ConfigQuery/PhantomRarityByRare"),
	StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	TimeUtil_1 = require("../../../Common/TimeUtil"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	VisionDetailDescComponent_1 = require("../../Phantom/Vision/View/VisionDetailDescComponent"),
	VisionDetailInfoComponent_1 = require("../../Phantom/Vision/View/VisionDetailInfoComponent"),
	SkipTaskManager_1 = require("../../SkipInterface/SkipTaskManager"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class ItemTipsData {
	constructor(e, t) {
		(this.ItemType = 0),
			(this.GetWayData = void 0),
			(this.LimitTimeTxt = void 0),
			(this.CanClickLockButton = (e) => !0);
		var a = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(e),
			i =
				((this.IncId = t || 0),
				(this.ConfigId = e),
				(this.Title = a.Name),
				(this.QualityId = a.QualityId),
				[]);
		if (a.ItemAccess && 0 < a.ItemAccess?.length)
			for (const e of a.ItemAccess) {
				var n = ConfigManager_1.ConfigManager.GetWayConfig.GetConfigById(e);
				n &&
					((n = {
						Id: e,
						Type: n?.Type,
						Text: n?.Description,
						SortIndex: n?.SortIndex,
						Function: () => {
							SkipTaskManager_1.SkipTaskManager.RunByConfigId(e);
						},
					}),
					i.push(n));
			}
		this.GetWayData = i;
	}
}
class TipsMaterialData extends (exports.ItemTipsData = ItemTipsData) {
	constructor(e, t) {
		super(e, t), (this.FunctionSpritePath = void 0), (this.ItemType = 0);
		var a = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(e),
			i =
				((this.MaterialType = a.TypeDescription),
				(this.FunctionSpritePath = this.lPt(a?.ItemBuffType)),
				ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
					e,
					t,
				));
		(this.Num = i),
			(this.TxtEffect = a.AttributesDescription),
			(this.TxtDescription = a.BgDescription),
			(i = ModelManager_1.ModelManager.InventoryModel.GetCommonItemData(e, t));
		i?.IsLimitTimeItem() &&
			((a = i.GetEndTime()),
			(e = TimeUtil_1.TimeUtil.GetDataFromTimeStamp(
				a * TimeUtil_1.TimeUtil.Millisecond,
			)),
			(t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
				"Text_ItemExpired_text",
			)),
			(this.LimitTimeTxt = StringUtils_1.StringUtils.Format(
				t,
				e.Month,
				e.Day,
				e.Hour + ":" + e.Minute,
			)));
	}
	lPt(e) {
		var t = ModelManager_1.ModelManager.MediumItemGridModel;
		switch (e) {
			case 0:
				break;
			case 1:
				return t.AttackBuffSpritePath;
			case 2:
				return t.DefenseBuffSpritePath;
			case 3:
				return t.RestoreHealthBuffSpritePath;
			case 4:
				return t.RechargeBuffSpritePath;
			case 5:
				return t.ResurrectionBuffSpritePath;
		}
	}
}
exports.TipsMaterialData = TipsMaterialData;
class TipsWeaponData extends ItemTipsData {
	constructor(e, t) {
		super(e, t),
			(this.WeaponType = ""),
			(this.WeaponLevel = 0),
			(this.WeaponLimitLevel = 0),
			(this.BreachLevel = 0),
			(this.BreachMaxLevel = 0),
			(this.WeaponStage = 0),
			(this.WeaponSkillName = ""),
			(this.WeaponEffect = ""),
			(this.WeaponEffectParam = void 0),
			(this.WeaponDescription = ""),
			(this.AttributeData = void 0),
			(this.IsEquip = !1),
			(this.EquippedId = void 0);
		var a,
			i,
			n,
			o,
			r,
			s = ModelManager_1.ModelManager.InventoryModel.GetAttributeItemData(t);
		void 0 !==
			(s = t
				? s.GetConfig()
				: ConfigManager_1.ConfigManager.InventoryConfig.GetWeaponItemConfig(
						e,
					)) &&
			((t = (e = t
				? ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(t)
				: void 0)
				? e.GetWeaponConfig()
				: ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponConfigByItemId(
						s.ItemId,
					)),
			(s = e ? e.GetBreachLevel() : 0),
			(o = e ? e.GetResonanceLevel() : 1),
			(a = e
				? e.GetBreachConfig()
				: ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponBreach(
						t.BreachId,
						s,
					)),
			(n = t.BreachId),
			(i = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponResonanceConfig(
				t.ResonId,
				o,
			)),
			(this.ItemType = 1),
			(this.WeaponType =
				ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponTypeName(
					t.WeaponType,
				)),
			(r = e ? e.GetLevel() : 1),
			(a = a.LevelLimit),
			(this.WeaponLevel = r),
			(this.WeaponLimitLevel = a),
			(this.BreachLevel = s),
			(a = ModelManager_1.ModelManager.WeaponModel.GetWeaponBreachMaxLevel(n)),
			(this.BreachMaxLevel = a),
			(this.WeaponStage = o),
			(this.WeaponSkillName = i.Name),
			(this.WeaponEffect = t.Desc),
			(n = ModelManager_1.ModelManager.WeaponModel.GetWeaponConfigDescParams(
				t,
				o,
			)),
			(this.WeaponEffectParam = n),
			(this.WeaponDescription = t.AttributesDescription),
			(a = []),
			(i = t.FirstPropId.Id),
			(o =
				ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(
					i,
				)),
			(n = ModelManager_1.ModelManager.WeaponModel.GetCurveValue(
				t.FirstCurve,
				t.FirstPropId.Value,
				r,
				s,
			)),
			(i = {
				Id: i,
				IsMainAttribute: !0,
				Name: o.Name,
				IconPath: o.Icon,
				Value: n,
				IsRatio: t.FirstPropId.IsRatio,
			}),
			(n = t.SecondPropId.Id),
			(o =
				ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(
					n,
				)),
			(r = ModelManager_1.ModelManager.WeaponModel.GetCurveValue(
				t.SecondCurve,
				t.SecondPropId.Value,
				r,
				s,
			)),
			(s = {
				Id: n,
				IsMainAttribute: !0,
				Name: o.Name,
				IconPath: o.Icon,
				Value: r,
				IsRatio: t.SecondPropId.IsRatio,
			}),
			a.push(i),
			a.push(s),
			(this.AttributeData = a),
			e) &&
			((this.EquippedId = e.GetRoleId()),
			(this.IsEquip = 0 !== this.EquippedId));
	}
}
exports.TipsWeaponData = TipsWeaponData;
class TipsVisionData extends ItemTipsData {
	constructor(e, t) {
		super(e, t),
			(this.VisionId = 0),
			(this.VisionType = ""),
			(this.Cost = 0),
			(this.UpgradeLevel = ""),
			(this.MainSkillText = ""),
			(this.MainSkillParams = void 0),
			(this.SkillUniqueText = void 0),
			(this.SkillUniqueTextParam = void 0),
			(this.SkillUniqueRoleId = void 0),
			(this.AttributeData = void 0),
			(this.IsEquip = !1),
			(this.EquippedId = void 0),
			(this.VisionDetailInfoComponentData = void 0);
		var a = ModelManager_1.ModelManager.InventoryModel.GetAttributeItemData(t);
		e = ConfigManager_1.ConfigManager.InventoryConfig.GetPhantomItemConfig(e);
		if (void 0 !== (a = t ? a.GetConfig() : e)) {
			var i = ModelManager_1.ModelManager.PhantomBattleModel,
				n = (i = t ? i.GetPhantomBattleData(t) : void 0)
					? i.GetPhantomLevel()
					: 0,
				o = i ? i.GetQuality() : 1;
			(a = ((this.ItemType = 2), (this.VisionId = a.MonsterId), a.Rarity)),
				(a =
					((this.VisionType =
						PhantomRarityByRare_1.configPhantomRarityByRare.GetConfig(a).Desc),
					(this.Cost =
						ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomRareConfig(
							a,
						).Cost),
					ConfigManager_1.ConfigManager.TextConfig.GetTextById("VisionLevel")));
			this.UpgradeLevel = StringUtils_1.StringUtils.Format(a, n.toString());
			const p = new VisionDetailInfoComponent_1.VisionDetailInfoComponentData();
			a = ConfigManager_1.ConfigManager.PhantomBattleConfig;
			var r =
				(e &&
					!i &&
					((e = e.SkillId),
					(g = a.GetPhantomSkillBySkillId(e)),
					(this.MainSkillText = g.DescriptionEx),
					(this.MainSkillParams =
						a.GetPhantomSkillDescExByPhantomSkillIdAndQuality(e, o)),
					VisionDetailDescComponent_1.VisionDetailDesc.ConvertVisionSkillDescToDescData(
						g,
						n,
						!0,
						!0,
						o,
					).forEach((e) => {
						p.AddDescData(e);
					})),
				[]);
			a = i?.GetMainPropShowAttributeList(1);
			if (void 0 !== a)
				for (const e of a) {
					var s =
						ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(
							e.Id,
						);
					s = {
						Id: e.Id,
						IsMainAttribute: !0,
						Name: s.Name,
						IconPath: s.Icon,
						Value: e.BaseValue,
						IsRatio: e.IsRatio,
					};
					r.push(s);
				}
			if (((e = i?.GetSubPropShowAttributeList(1)), void 0 !== e))
				for (const t of e) {
					var l =
						ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(
							t.Id,
						);
					l = {
						Id: t.Id,
						IsMainAttribute: !1,
						Name: l.Name,
						IconPath: l.Icon,
						Value: t.BaseValue,
						IsRatio: t.IsRatio,
					};
					r.push(l);
				}
			this.AttributeData = r;
			var g =
				ControllerHolder_1.ControllerHolder.PhantomBattleController.GetEquipRole(
					t,
				);
			n =
				(g && ((this.EquippedId = g), (this.IsEquip = 0 !== this.EquippedId)),
				(p.DataBase = i)?.GetPreviewShowFetterList(-1, 0));
			i &&
				VisionDetailDescComponent_1.VisionDetailDesc.ConvertVisionSkillDescToDescData(
					i?.GetNormalSkillConfig(),
					i.GetPhantomLevel(),
					!0,
					!0,
					o,
				).forEach((e) => {
					p.AddDescData(e);
				}),
				n &&
					VisionDetailDescComponent_1.VisionDetailDesc.ConvertVisionFetterDataToDetailDescData(
						n,
						!1,
					).forEach((e) => {
						p.AddDescData(e);
					}),
				(this.VisionDetailInfoComponentData = p);
		}
	}
}
exports.TipsVisionData = TipsVisionData;
class TipsCharacterData extends ItemTipsData {
	constructor(e, t) {
		super(e, t),
			(this._Pt = ""),
			(this.bnt = void 0),
			(this.uPt = ""),
			(this.cPt = ""),
			(this.ItemType = 3);
		let a = (t = ConfigManager_1.ConfigManager.RoleConfig).GetRoleConfig(e);
		(t = (a = 0 < (e = a.ParentId) ? t.GetRoleConfig(e) : a).ElementId),
			(this._Pt = a.Name),
			(this.bnt =
				ConfigManager_1.ConfigManager.ElementInfoConfig.GetElementInfo(t)),
			(this.uPt = a.RoleHeadIconBig),
			(this.cPt = a.Introduction);
	}
	GetRoleName() {
		return this._Pt;
	}
	GetElementConfig() {
		return this.bnt;
	}
	GetHeadTexutePath() {
		return this.uPt;
	}
	GetRoleIntroduction() {
		return this.cPt;
	}
}
exports.TipsCharacterData = TipsCharacterData;
