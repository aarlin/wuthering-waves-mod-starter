"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PhantomTipsData =
		exports.WeaponTipsData =
		exports.CommonTipsData =
		exports.CommonTipsBaseData =
		exports.CommonTipsComponentUtil =
			void 0);
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
	StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	CommonComponentDefine_1 = require("../CommonComponentDefine"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class CommonTipsComponentUtil {
	static GetWeaponTipsDataByUniqueId(e) {
		var t = ModelManager_1.ModelManager.InventoryModel.GetAttributeItemData(e);
		if (t) {
			var a = t.GetConfig();
			if (2 === t.GetItemDataType()) return this.GetWeaponTipsData(a, e);
		}
	}
	static GetPhantomTipsDataByUniqueId(e) {
		var t = ModelManager_1.ModelManager.InventoryModel.GetAttributeItemData(e);
		if (t) {
			var a = t.GetConfig();
			if (3 === t.GetItemDataType()) return this.GetPhantomTipsData(a, e);
		}
	}
	static GetTipsDataByItemId(e) {
		var t,
			a =
				ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(
					e,
				);
		return 2 === a
			? ((t =
					ConfigManager_1.ConfigManager.InventoryConfig.GetWeaponItemConfig(e)),
				this.GetWeaponTipsData(t, e))
			: 3 === a
				? ((t =
						ConfigManager_1.ConfigManager.InventoryConfig.GetPhantomItemConfig(
							e,
						)),
					this.GetPhantomTipsData(t, e))
				: void 0;
	}
	static GetWeaponTipsDataByItemId(e) {
		if (
			(e = ConfigManager_1.ConfigManager.InventoryConfig.GetWeaponItemConfig(e))
		)
			return this.GetWeaponTipsData(e);
	}
	static GetPhantomTipsDataByItemId(e) {
		if (
			(e =
				ConfigManager_1.ConfigManager.InventoryConfig.GetPhantomItemConfig(e))
		)
			return this.GetPhantomTipsData(e);
	}
	static GetWeaponTipsData(e, t) {
		var a = new WeaponTipsData(),
			n = t
				? ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(t)
				: void 0,
			o = n
				? n.GetWeaponConfig()
				: ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponConfigByItemId(
						e.ItemId,
					),
			i = n ? n.GetBreachLevel() : 0,
			r = n ? n.GetResonanceLevel() : 1,
			l = n
				? n.GetBreachConfig()
				: ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponBreach(
						o.BreachId,
						i,
					),
			s = n ? n.GetLevel() : 1,
			g =
				((l = l.LevelLimit),
				ConfigManager_1.ConfigManager.TextConfig.GetTextById(
					"WeaponLevelUpLevelText",
				)),
			p = o.BreachId,
			d =
				((p =
					ModelManager_1.ModelManager.WeaponModel.GetWeaponBreachMaxLevel(p)),
				ModelManager_1.ModelManager.WeaponModel.GetCurveValue(
					o.FirstCurve,
					o.FirstPropId.Value,
					s,
					i,
				)),
			I =
				((d = {
					Id: o.FirstPropId.Id,
					IsRatio: o.FirstPropId.IsRatio,
					CurValue: d,
				}),
				ModelManager_1.ModelManager.WeaponModel.GetCurveValue(
					o.SecondCurve,
					o.SecondPropId.Value,
					s,
					i,
				));
		I = { Id: o.SecondPropId.Id, IsRatio: o.SecondPropId.IsRatio, CurValue: I };
		return (
			(a.IncId = t),
			(a.ConfigId = e.ItemId),
			(a.Name = e.WeaponName),
			(a.QualityId = e.QualityId),
			(a.ItemType = 2),
			(a.BgDescription = e.BgDescription),
			(a.LevelText = StringUtils_1.StringUtils.Format(
				g,
				s.toString(),
				l.toString(),
			)),
			(a.CurrentStar = i),
			(a.MaxStar = p),
			(a.Type = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponTypeName(
				o.WeaponType,
			)),
			a.AttributeList.push(d),
			a.AttributeList.push(I),
			(a.ResonanceLevel = r),
			n &&
				((a.EquippedId = n.GetRoleId()), 0 !== a.EquippedId) &&
				((t = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(
					a.EquippedId,
				)),
				(a.EquippedIcon = t.GetRoleConfig().RoleHeadIcon),
				(a.EquippedName = t.GetName())),
			a
		);
	}
	static GetPhantomTipsData(e, t) {
		var a = new PhantomTipsData(),
			n = ModelManager_1.ModelManager.PhantomBattleModel,
			o = t ? n.GetPhantomBattleData(t) : void 0,
			i = e.ItemId,
			r =
				ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomQualityByItemQuality(
					e.QualityId,
				).LevelLimit,
			l = o ? o.GetPhantomLevel() : 1,
			s = e.TypeDescription,
			g =
				((s = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(s)),
				(a.Name = e.MonsterName),
				(a.IncId = t),
				(a.ConfigId = i),
				(a.QualityId = e.QualityId),
				(a.ItemType = 9),
				ConfigManager_1.ConfigManager.TextConfig.GetTextById("LevelShow"));
		(a.LevelText = StringUtils_1.StringUtils.Format(g, l.toString())),
			(g =
				ConfigManager_1.ConfigManager.TextConfig.GetTextById("RoleMaxLevel02")),
			(g =
				((a.MaxLevelText = StringUtils_1.StringUtils.Format(g, r.toString())),
				(a.Level = l),
				(a.Type = s ?? ""),
				(a.PhantomId = e.MonsterId),
				ControllerHolder_1.ControllerHolder.PhantomBattleController.GetEquipRole(
					t,
				))) &&
				((a.EquippedId = g),
				(r = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(g)),
				(a.EquippedIcon = r.GetRoleConfig().RoleHeadIcon),
				(a.EquippedName = r.GetName())),
			(a.RarityId = "CalabashCatchGain_" + e.Rarity.toString()),
			(l = ConfigManager_1.ConfigManager.CommonConfig.GetElementConfig(
				e.ElementType[0],
			)),
			(s =
				((a.PropertyTexture = l.Icon),
				(a.PropertyId = e.ElementType[0]),
				n.GetPhantomInstanceByItemId(i)))
				? ((g = s.GetPhantomSkillInfoByLevel()),
					(a.MainSkillText = g.DescriptionEx),
					(r =
						ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSkillDescExBySkillIdAndQuality(
							g.Id,
							e.QualityId,
						)),
					(a.MainSkillParameter = r),
					(a.SkillIcon = s.PhantomItem.SkillIcon))
				: (n = (l =
						ConfigManager_1.ConfigManager
							.PhantomBattleConfig).GetPhantomItemById(i)) &&
					((g = n.SkillId),
					(r = l.GetPhantomSkillBySkillId(g)),
					(a.MainSkillText = r.DescriptionEx),
					(s =
						ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSkillDescExByPhantomSkillIdAndQuality(
							g,
							e.QualityId,
						)),
					(a.MainSkillParameter = s),
					(a.SkillIcon = n.SkillIcon)),
			(a.IsBreak = !1),
			(i = o?.GetPhantomMainProp());
		if (
			((a.IsMain =
				ControllerHolder_1.ControllerHolder.PhantomBattleController.CheckIsMain(
					t,
				)),
			i && 0 < i.length)
		)
			for (const e of i) {
				var p =
						ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomMainPropertyItemId(
							e.IDs,
						),
					d = !!(p =
						ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(
							p.PropId,
						)).IsPercent;
				a.MainAttributeList.push(
					new CommonComponentDefine_1.TipsAttributeData(p.Id, e.gkn, d),
				);
			}
		if (
			((l = o?.GetPhantomSubProp()),
			(a.IsSub =
				ControllerHolder_1.ControllerHolder.PhantomBattleController.CheckIsSub(
					t,
				)),
			l && 0 < l.length)
		) {
			a.IsUnlockSub = !0;
			for (const e of l) {
				var I =
					ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSubPropertyById(
						e.IDs,
					).AddType === CommonComponentDefine_1.RATIO;
				a.SubAttributeList.push(
					new CommonComponentDefine_1.TipsAttributeData(e.IDs, e.gkn, I),
				);
			}
		}
		return a;
	}
}
exports.CommonTipsComponentUtil = CommonTipsComponentUtil;
class CommonTipsBaseData {
	constructor() {
		(this.IncId = 0),
			(this.ConfigId = 0),
			(this.Name = ""),
			(this.QualityId = 0),
			(this.ItemType = 2),
			(this.BgDescription = ""),
			(this.LevelText = ""),
			(this.MaxLevelText = ""),
			(this.Type = ""),
			(this.EquippedId = 0),
			(this.EquippedIcon = ""),
			(this.EquippedName = "");
	}
}
class CommonTipsData extends (exports.CommonTipsBaseData = CommonTipsBaseData) {
	constructor() {
		super(...arguments),
			(this.CurrentStar = 0),
			(this.MaxStar = 0),
			(this.AttributeList = []);
	}
}
class WeaponTipsData extends (exports.CommonTipsData = CommonTipsData) {
	constructor() {
		super(...arguments), (this.ResonanceLevel = 0);
	}
}
exports.WeaponTipsData = WeaponTipsData;
class PhantomTipsData extends CommonTipsBaseData {
	constructor() {
		super(...arguments),
			(this.PhantomId = 0),
			(this.Level = 0),
			(this.RarityId = ""),
			(this.PropertyTexture = ""),
			(this.PropertyId = 0),
			(this.IsBreak = !1),
			(this.BreakAttributeList = []),
			(this.IsMain = !1),
			(this.MainAttributeList = []),
			(this.MainSkillText = ""),
			(this.MainSkillParameter = void 0),
			(this.SkillIcon = ""),
			(this.IsSub = !1),
			(this.SubAttributeList = []),
			(this.IsUnlockSub = !1),
			(this.UnlockSubTips = "");
	}
}
exports.PhantomTipsData = PhantomTipsData;
