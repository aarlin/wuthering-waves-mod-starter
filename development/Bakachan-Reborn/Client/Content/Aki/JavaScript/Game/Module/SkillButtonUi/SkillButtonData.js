"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SkillButtonData = exports.controlVisionTagId = void 0);
const UE = require("ue"),
	CommonDefine_1 = require("../../../Core/Define/CommonDefine"),
	FNameUtil_1 = require("../../../Core/Utils/FNameUtil"),
	GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils"),
	StringUtils_1 = require("../../../Core/Utils/StringUtils"),
	TimeUtil_1 = require("../../Common/TimeUtil"),
	InputEnums_1 = require("../../Input/InputEnums"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	ItemDefines_1 = require("../Item/Data/ItemDefines"),
	PhantomUtil_1 = require("../Phantom/PhantomUtil"),
	KeyUtil_1 = require("../Util/KeyUtil");
exports.controlVisionTagId = 1427742187;
class SkillButtonData {
	constructor() {
		(this.Mne = 0),
			(this.sDe = void 0),
			(this.Config = void 0),
			(this.Gco = 0),
			(this.fSo = 0),
			(this.SkillIdTagMap = new Map()),
			(this.RO = InputEnums_1.EInputAction.None),
			(this.pSo = 0),
			(this.ZMe = ""),
			(this.vSo = []),
			(this.goi = []),
			(this.MSo = new Map()),
			(this.SSo = []),
			(this.DynamicEffectTagIdMap = new Map()),
			(this.DynamicEffectId = 0),
			(this.SkillIconTagIds = void 0),
			(this.AttributeIdTagMap = new Map()),
			(this.AttributeId = 0),
			(this.MaxAttributeId = 0),
			(this.ESo = !1),
			(this.RoleConfig = void 0),
			(this.bnt = void 0),
			(this.HSe = ""),
			(this.ySo = ""),
			(this.ISo = void 0),
			(this.TSo = void 0),
			(this.LSo = !1),
			(this.DSo = void 0),
			(this.RSo = void 0),
			(this.USo = void 0),
			(this.ASo = !1),
			(this.Bnt = void 0),
			(this.zht = void 0),
			(this.PSo = void 0),
			(this.$te = void 0),
			(this.xSo = void 0),
			(this.g_t = 0),
			(this.wSo = !1),
			(this.BSo = ""),
			(this.SkillIconName = ""),
			(this.bSo = void 0),
			(this.qSo = ""),
			(this.dit = void 0),
			(this.hfo = !1),
			(this.GSo = !0);
	}
	get NSo() {
		return this.ASo;
	}
	set NSo(t) {
		this.ASo = t;
	}
	Refresh(t, i) {
		var e, o, s, n;
		t = (this.sDe = t).Entity;
		for ([e, o] of ((this.Mne = i.Id),
		(this.Config = i),
		(this.fSo = i.SkillId),
		this.SkillIdTagMap.clear(),
		i.SkillIdTagMap))
			this.SkillIdTagMap.set(
				GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e),
				o,
			);
		for ([s, n] of ((this.RO = i.ActionType),
		(this.pSo = i.ButtonType),
		(this.ZMe = InputEnums_1.EInputAction[this.RO]),
		this.DynamicEffectTagIdMap.clear(),
		this.Config.DynamicEffectTagMap))
			this.DynamicEffectTagIdMap.set(
				GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(s),
				n,
			);
		this.SkillIconTagIds = [];
		for (const t of this.Config.SkillIconTags)
			this.SkillIconTagIds.push(
				GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(t),
			);
		if (
			((this.AttributeId = i.AttributeId),
			(this.MaxAttributeId = i.MaxAttributeId),
			0 < i.AttributeIdTagMap.size)
		)
			for (var [a, r] of (this.AttributeIdTagMap.set(0, [
				this.AttributeId,
				this.MaxAttributeId,
			]),
			i.AttributeIdTagMap))
				this.AttributeIdTagMap.set(
					GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(a),
					r.ArrayInt,
				);
		(this.ESo = i.IsLongPressControlCamera),
			(this.RSo = t.GetComponent(33)),
			(this.USo = t.GetComponent(186)),
			(this.Bnt = t.GetComponent(185)),
			(this.zht = t.GetComponent(0)),
			(this.PSo = t.GetComponent(52)),
			(this.$te = t.GetComponent(156)),
			(this.xSo = t.GetComponent(34)),
			this.OSo(i),
			this.RefreshSkillId(),
			this.RefreshAttributeId(),
			this.SetExploreSkillChange(!1),
			this.pci(),
			this.kSo(),
			this.RefreshDynamicEffect(),
			this.RefreshIsEnable(),
			this.RefreshIsVisible(),
			this.RefreshSkillTexturePath(),
			this.RefreshFrameSpriteColor(),
			this.FSo(),
			this.VSo(),
			this.RefreshLongPressTime();
	}
	Reset() {
		(this.Mne = void 0),
			(this.sDe = void 0),
			(this.Config = void 0),
			(this.fSo = void 0),
			(this.SkillIdTagMap = void 0),
			(this.RO = void 0),
			(this.ZMe = void 0),
			(this.AttributeIdTagMap = void 0),
			(this.AttributeId = void 0),
			(this.MaxAttributeId = void 0),
			(this.ESo = void 0),
			(this.RSo = void 0),
			(this.USo = void 0),
			(this.Bnt = void 0),
			(this.zht = void 0),
			(this.PSo = void 0),
			(this.$te = void 0),
			(this.RoleConfig = void 0),
			(this.HSe = void 0),
			(this.ySo = void 0),
			(this.ISo = void 0),
			(this.TSo = void 0),
			(this.LSo = void 0),
			(this.DSo = void 0),
			(this.hfo = !1),
			(this.GSo = !0);
	}
	OSo(t) {
		(this.vSo.length = 0),
			(this.goi.length = 0),
			this.MSo.clear(),
			(this.SSo.length = 0);
		for (const i of t.EnableTags)
			this.vSo.push(GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(i));
		for (const i of t.DisableTags)
			this.goi.push(GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(i));
		for (var [i, e] of t.DisableSkillIdTags)
			if (e) {
				var o = new Set();
				for (const t of e.ArrayInt) o.add(t);
				this.MSo.set(GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(i), o);
			}
		for (const i of t.HiddenTags)
			this.SSo.push(GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(i));
		(t = SkillButtonData.GetCommonDisableTagIdByButtonType(this.pSo)) &&
			this.goi.push(t),
			this.goi.push(1008164187),
			(t = SkillButtonData.GetCommonHiddenTagIdByButtonType(this.pSo)) &&
				this.SSo.push(t);
	}
	static GetCommonDisableTagIdByButtonType(t) {
		return SkillButtonData.HSo.get(t);
	}
	static GetCommonHiddenTagIdByButtonType(t) {
		return SkillButtonData.jSo.get(t);
	}
	GetConfig() {
		return this.Config;
	}
	GetEnableTagIds() {
		return this.vSo;
	}
	GetDisableTagIds() {
		return this.goi;
	}
	GetDisableSkillIdTagIds() {
		return this.MSo;
	}
	GetHiddenTagIds() {
		return this.SSo;
	}
	GetConfigId() {
		return this.Mne;
	}
	IsCdVisible() {
		return this.Config.IsCdVisible;
	}
	GetMaxAttributeBurstEffectId() {
		return this.Config.MaxAttributeBurstEffectId;
	}
	GetMaxAttributeBurstEffectConfig() {
		var t = this.Config.MaxAttributeBurstEffectId;
		return ConfigManager_1.ConfigManager.SkillButtonConfig.GetSkillButtonEffectConfig(
			t,
		);
	}
	WSo() {
		var t;
		return (
			this.bnt ||
				((t = this.RoleConfig.ElementId),
				(this.bnt =
					ConfigManager_1.ConfigManager.BattleUiConfig.GetElementConfig(t))),
			this.bnt
		);
	}
	GetCdCompletedEffectId() {
		return this.Config.CdCompletedEffectId;
	}
	GetCdCompletedEffectConfig() {
		var t = this.Config.CdCompletedEffectId;
		return ConfigManager_1.ConfigManager.SkillButtonConfig.GetSkillButtonEffectConfig(
			t,
		);
	}
	GetDynamicEffectConfig() {
		if (0 !== this.DynamicEffectId)
			return ConfigManager_1.ConfigManager.SkillButtonConfig.GetSkillButtonEffectConfig(
				this.DynamicEffectId,
			);
	}
	RefreshDynamicEffect() {
		for (var [t, i] of this.DynamicEffectTagIdMap)
			if (this.gSo(t)) return void (this.DynamicEffectId = i);
		this.DynamicEffectId = 0;
	}
	GetActionType() {
		return this.RO;
	}
	GetButtonType() {
		return this.pSo;
	}
	GetEntityHandle() {
		return this.sDe;
	}
	GetEntityId() {
		return this.sDe.Entity.Id;
	}
	GetSkillId() {
		return this.Gco;
	}
	GetSkillConfig() {
		return this.ISo;
	}
	GetSkillTexturePath() {
		return this.BSo;
	}
	GetActionName() {
		return this.ZMe;
	}
	IsEnable() {
		return this.NSo;
	}
	IsVisible() {
		return this.wSo;
	}
	HasAttribute() {
		return 0 !== this.AttributeId && 0 !== this.MaxAttributeId;
	}
	GetAttribute() {
		return this.$te.GetCurrentValue(this.AttributeId);
	}
	GetMaxAttribute() {
		return this.$te.GetCurrentValue(this.MaxAttributeId);
	}
	GetMaxAttributeColor() {
		return this.bSo;
	}
	GetMaxAttributeEffectPath() {
		return this.qSo;
	}
	GetFrameSpriteColor() {
		return this.dit;
	}
	GetIsLongPressControlCamera() {
		return this.ESo;
	}
	GetLongPressTime() {
		return this.g_t;
	}
	GetMultiSkillInfo() {
		return (
			this.DSo ||
			(this.LSo
				? ((this.DSo = this.USo.GetMultiSkillInfo(this.Gco)), this.DSo)
				: void 0)
		);
	}
	IsMultiStageSkill() {
		return this.LSo;
	}
	GetMultiSkillTexturePath() {
		if (9 === this.pSo) return this.BSo;
		var t = this.GetMultiSkillInfo();
		return t && 0 !== t.NextSkillId
			? (t = this.FindSkillConfig(t.NextSkillId)) &&
				(t = t.SkillIcon) &&
				((t = t.AssetPathName), !FNameUtil_1.FNameUtil.IsNothing(t))
				? t.toString()
				: void 0
			: this.BSo;
	}
	RefreshVisionMultiSkillInfo(t, i) {
		if (this.DSo !== t) {
			if (
				i !==
				ModelManager_1.ModelManager.CreatureModel.GetEntity(
					this.zht.VisionSkillServerEntityId,
				)?.Id
			)
				return !1;
			(this.LSo = !0), (this.DSo = t);
		}
		return !0;
	}
	GetSkillRemainingCoolDown() {
		return this.TSo ? this.TSo.CurRemainingCd : 0;
	}
	GetGroupSkillCdInfo() {
		return this.TSo;
	}
	RefreshSkillId() {
		var t,
			i,
			e = this.Gco;
		for ([t, i] of this.SkillIdTagMap)
			if (this.gSo(t))
				return (this.Gco = i), void (e !== this.Gco && this.tlo());
		(this.Gco = this.fSo), this.KSo(), this.QSo(), e !== this.Gco && this.tlo();
	}
	tlo() {
		this.Gco
			? ((this.ISo = this.RSo.GetSkillInfo(this.Gco)),
				(this.TSo = this.USo.GetGroupSkillCdInfo(this.Gco)),
				(this.LSo = !!this.ISo && 1 < this.ISo.CooldownConfig.SectionCount))
			: ((this.ISo = void 0), (this.TSo = void 0), (this.LSo = !1)),
			(this.DSo = void 0);
	}
	RefreshSkillIdByTag(t) {
		(t = this.SkillIdTagMap.get(t)) !== this.Gco &&
			((this.Gco = t), this.tlo());
	}
	KSo() {
		if (this.RO === InputEnums_1.EInputAction.幻象2) {
			let i;
			if (
				(i = this.Bnt.HasTag(exports.controlVisionTagId)
					? this.xSo.GetVisionSkillInformation(3)?.vkn
					: this.xSo.GetVisionId())
			) {
				var t =
					ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSkillBySkillId(
						i,
					);
				if (t)
					return (
						(this.Gco = t.SkillGroupId),
						(this.BSo = t.BattleViewIcon),
						(this.SkillIconName = void 0),
						void (this.GSo =
							PhantomUtil_1.PhantomUtil.GetVisionData(i)?.空中能否释放 ?? !0)
					);
			}
			(this.Gco = void 0),
				(this.BSo = void 0),
				(this.SkillIconName = void 0),
				(this.GSo = !0);
		}
	}
	QSo() {
		var t;
		this.RO === InputEnums_1.EInputAction.幻象1 &&
			((t = ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId)
				? ((t = PhantomUtil_1.PhantomUtil.GetVisionData(t)),
					this.SetExploreSkillChange(this.Gco !== t.技能ID),
					(this.Gco = t.技能ID))
				: void 0 !== this.Gco &&
					(this.SetExploreSkillChange(!0), (this.Gco = void 0)));
	}
	GetExploreSkillChange() {
		return this.hfo;
	}
	SetExploreSkillChange(t) {
		this.hfo = t;
	}
	GetIsVisionEnableInAir() {
		return this.GSo;
	}
	RefreshAttributeId() {
		if (!(this.AttributeIdTagMap.size <= 0)) {
			for (var [t, i] of this.AttributeIdTagMap)
				if (this.gSo(t))
					return (this.AttributeId = i[0]), void (this.MaxAttributeId = i[1]);
			var e = this.AttributeIdTagMap.get(0);
			(this.AttributeId = e[0]), (this.MaxAttributeId = e[1]);
		}
	}
	pci() {
		this.zht && (this.RoleConfig = this.zht.GetRoleConfig());
	}
	RefreshSkillTexturePathBySkillIconTag(t) {
		var i;
		return (
			!!(t =
				ConfigManager_1.ConfigManager.SkillButtonConfig.GetSkillIconConfigByTag(
					t,
				)) &&
			((i = t.IconPath),
			(this.SkillIconName = t.Name),
			!StringUtils_1.StringUtils.IsEmpty(i)) &&
			((this.BSo = i), !0)
		);
	}
	RefreshSkillTexturePath() {
		if (this.SkillIconTagIds && 0 < this.SkillIconTagIds.length)
			for (const i of this.SkillIconTagIds)
				if (this.gSo(i)) {
					var t = GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(i);
					if (this.RefreshSkillTexturePathBySkillIconTag(t)) return;
				}
		var i;
		if (
			((this.SkillIconName = void 0),
			this.RO === InputEnums_1.EInputAction.幻象1)
		) {
			if ((i = this.XSo())) return void (this.BSo = i);
		} else if (this.RO === InputEnums_1.EInputAction.幻象2) return;
		(i = this.GetSkillConfig()) &&
		(i = i.SkillIcon) &&
		((i = i.AssetPathName), !FNameUtil_1.FNameUtil.IsNothing(i))
			? (this.BSo = i.toString())
			: (this.BSo = void 0);
	}
	FSo() {
		var t = this.WSo().SkillEffectColor;
		this.bSo = new UE.LinearColor(UE.Color.FromHex(t));
	}
	VSo() {
		var t = this.WSo();
		this.qSo = t.SkillButtonEffectPath;
	}
	RefreshFrameSpriteColor() {
		var t;
		this.HasAttribute()
			? ((t = this.WSo()), (this.dit = UE.Color.FromHex(t.UltimateSkillColor)))
			: (this.dit = void 0);
	}
	RefreshIsEnable() {
		for (const t of this.vSo) if (this.gSo(t)) return void (this.NSo = !0);
		if (this.HasAttribute() && this.GetAttribute() < this.GetMaxAttribute())
			this.NSo = !1;
		else {
			for (const t of this.goi) if (this.gSo(t)) return void (this.NSo = !1);
			if (this.Gco)
				for (var [t, i] of this.MSo)
					if (this.gSo(t) && i.has(this.Gco)) return void (this.NSo = !1);
			if (this.LSo) {
				var e = this.GetMultiSkillInfo();
				if (e && 0 !== e.NextSkillId)
					return void (this.NSo = e.RemainingStartTime <= 0);
			}
			(this.IsUseItem &&
				(this.IsEquippedItemBanReqUse() || this.IsSkillInItemUseCd())) ||
			!(e = this.GetGroupSkillCdInfo()) ||
			e.RemainingCount <= 0 ||
			(this.RO === InputEnums_1.EInputAction.幻象2 &&
				!this.GSo &&
				this.gSo(40422668))
				? (this.NSo = !1)
				: (this.NSo = !0);
		}
	}
	SetEnable(t) {
		this.NSo = t;
	}
	RefreshIsVisible(t = !0) {
		if (t)
			for (const t of this.SSo) if (this.gSo(t)) return void (this.wSo = !1);
		this.wSo = !0;
	}
	SetVisible(t) {
		this.wSo = t;
	}
	kSo() {
		var t, i, e;
		if (
			this.ZMe &&
			((this.HSe = KeyUtil_1.KeyUtil.GetKeyName(
				this.ZMe,
				ModelManager_1.ModelManager.PlatformModel.PlatformType,
			)),
			this.HSe)
		)
			return (
				(t = ModelManager_1.ModelManager.PlatformModel),
				(i = ConfigManager_1.ConfigManager.BattleUiConfig),
				t.IsPc()
					? (e = i.GetPcKeyConfig(this.HSe))
						? void (this.ySo = e.KeyIconPath)
						: void (this.ySo = void 0)
					: t.IsGamepad() && (e = i.GetGamePadKeyConfig(this.HSe))
						? void (this.ySo = e.KeyIconPath)
						: void (this.ySo = void 0)
			);
		this.ySo = void 0;
	}
	RefreshLongPressTime() {
		var t = this.GetActionType();
		(t = this.PSo.GetHoldConfig(t))
			? ((t = t[1]),
				(this.g_t =
					t <= 0
						? this.Config.LongPressTime /
							CommonDefine_1.MILLIONSECOND_PER_SECOND
						: t))
			: (this.g_t =
					this.Config.LongPressTime / CommonDefine_1.MILLIONSECOND_PER_SECOND);
	}
	GetKeySpritePath() {
		return this.ySo;
	}
	XSo() {
		return ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillIcon;
	}
	FindSkillConfig(t) {
		if (t) return this.RSo.GetSkillInfo(t);
	}
	gSo(t) {
		return !!this.Bnt && this.Bnt.HasTag(t);
	}
	get IsUseItem() {
		return (
			this.RO === InputEnums_1.EInputAction.幻象1 &&
			ModelManager_1.ModelManager.RouletteModel.IsEquipItemSelectOn
		);
	}
	IsSkillInItemUseCd() {
		return (
			this.RO === InputEnums_1.EInputAction.幻象1 &&
			(this.IsSkillInItemUseBuffCd() || this.IsSkillInItemUseSkillCd())
		);
	}
	IsEquippedItemBanReqUse() {
		return (
			!!this.IsUseItem &&
			ModelManager_1.ModelManager.RouletteModel.IsEquippedItemBanReqUse()
		);
	}
	IsSkillInItemUseBuffCd() {
		return (
			!!this.IsUseItem &&
			ModelManager_1.ModelManager.RouletteModel.IsEquipItemInBuffCd()
		);
	}
	GetEquippedItemUsingBuffCd() {
		var t, i;
		return this.IsUseItem
			? ((t = ModelManager_1.ModelManager.RouletteModel.CurrentEquipItemId),
				[
					(i =
						ModelManager_1.ModelManager.BuffItemModel).GetBuffItemRemainCdTime(
						t,
					),
					i.GetBuffItemTotalCdTime(t),
				])
			: [0, 0];
	}
	IsSkillInItemUseSkillCd() {
		if (this.IsUseItem) {
			var t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(
				ModelManager_1.ModelManager.RouletteModel.CurrentEquipItemId,
			)?.Parameters.get(ItemDefines_1.EItemFunctionType.UseExploreSkill);
			if (t)
				return (
					0 <
					this.USo.GetGroupSkillCdInfo(t)?.CurRemainingCd -
						TimeUtil_1.TimeUtil.TimeDeviation
				);
		}
		return !1;
	}
	GetEquippedItemUsingSkillCd() {
		if (this.IsUseItem) {
			var t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(
				ModelManager_1.ModelManager.RouletteModel.CurrentEquipItemId,
			)?.Parameters.get(ItemDefines_1.EItemFunctionType.UseExploreSkill);
			if (t)
				return [
					(t = this.USo.GetGroupSkillCdInfo(t)).CurRemainingCd,
					t.CurMaxCd,
				];
		}
		return [0, 0];
	}
}
((exports.SkillButtonData = SkillButtonData).HSo = new Map([
	[4, -542518289],
	[6, -541178966],
	[8, -732810197],
	[5, 581080458],
	[7, -1802431900],
	[1, -469423249],
	[2, 766688429],
	[9, -1752099043],
	[10, 581080458],
	[11, -542518289],
])),
	(SkillButtonData.jSo = new Map([
		[4, -1823030825],
		[6, -1949137153],
		[8, -800147974],
		[5, 1381320300],
		[7, -2112257652],
		[1, -571871026],
		[9, 1725229954],
		[10, 1381320300],
		[11, -1823030825],
	]));
