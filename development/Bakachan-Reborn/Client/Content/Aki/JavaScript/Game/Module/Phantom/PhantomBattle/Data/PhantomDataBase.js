"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PhantomDataBase =
		exports.VisionSubPropData =
		exports.VisionSubPropViewData =
		exports.VisionSlotData =
		exports.VisionFetterData =
			void 0);
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById"),
	MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
	StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	AttributeModel_1 = require("../../../Attribute/AttributeModel"),
	CommonComponentDefine_1 = require("../../../Common/CommonComponentDefine"),
	ItemDefines_1 = require("../../../Item/Data/ItemDefines"),
	RoleLevelUpSuccessController_1 = require("../../../RoleUi/RoleLevel/RoleLevelUpSuccessController"),
	AttrListScrollData_1 = require("../../../RoleUi/View/ViewData/AttrListScrollData"),
	VisionAttributeItemTwo_1 = require("../../Vision/View/VisionAttributeItemTwo");
class VisionFetterData {
	constructor() {
		(this.FetterGroupId = 0),
			(this.FetterId = 0),
			(this.NeedActiveNum = 0),
			(this.ActiveFetterGroupNum = 0),
			(this.ActiveState = !1),
			(this.NewAdd = !1);
	}
}
exports.VisionFetterData = VisionFetterData;
class VisionSlotData {
	constructor() {
		this.SlotState = 0;
	}
}
exports.VisionSlotData = VisionSlotData;
class VisionSubPropViewData {
	constructor() {
		(this.Data = void 0),
			(this.SourceView = ""),
			(this.IfPreCache = !1),
			(this.CurrentVisionData = void 0);
	}
}
exports.VisionSubPropViewData = VisionSubPropViewData;
class VisionSubPropData {
	constructor(t, e) {
		(this.B5i = 0),
			(this.Pe = void 0),
			(this.SlotState = 0),
			(this.PhantomSubProp = void 0),
			(this.B5i = t),
			(this.Pe = e);
	}
	GetSubPropName() {
		var t =
			ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSubPropertyById(
				this.PhantomSubProp.IDs,
			).PropId;
		t =
			ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(t);
		return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.Name) ?? "";
	}
	GetSlotIndex() {
		return this.B5i;
	}
	GetLevelUpViewName() {
		var t;
		return 0 === this.SlotState
			? ((t =
					MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
						"LevelUpAndIdentify",
					) ?? ""),
				StringUtils_1.StringUtils.Format(t, this.GetUnlockLevel().toString()))
			: 1 === this.SlotState
				? MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
						"WaitForIdentify",
					) ?? ""
				: 3 === this.SlotState
					? this.GetSubPropName()
					: 2 === this.SlotState
						? ((t =
								MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
									"LevelUpAndIdentify",
								) ?? ""),
							StringUtils_1.StringUtils.Format(
								t,
								this.GetUnlockLevel().toString(),
							))
						: 5 === this.SlotState || 4 === this.SlotState
							? MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
									"CurrentIdentifyUnlockText",
								) ?? ""
							: "";
	}
	GetAttributeValueString() {
		var t =
				ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSubPropertyById(
					this.PhantomSubProp.IDs,
				),
			e = t.AddType === CommonComponentDefine_1.RATIO,
			a = AttributeModel_1.TipsDataTool.GetPropRatioValue(
				this.PhantomSubProp.gkn,
				e,
			);
		return ModelManager_1.ModelManager.AttributeModel.GetFormatAttributeValueString(
			t.PropId,
			a,
			e,
		);
	}
	GetUnlockLevel() {
		var t = this.Pe.GetQuality();
		return (t =
			ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSlotUnlockLevel(
				t,
			)).length > this.B5i
			? t[this.B5i]
			: 0;
	}
}
exports.VisionSubPropData = VisionSubPropData;
class PhantomDataBase {
	constructor() {
		(this.PhantomMainProp = []),
			(this.PhantomSubProp = []),
			(this.PhantomLevel = 0),
			(this.PhantomExp = 0),
			(this.ItemId = 0),
			(this.FuncValue = 0),
			(this.SuspendSlot = void 0),
			(this.b5i = 0),
			(this.FetterGroupId = 0),
			(this.q5i = 0);
	}
	SetPhantomLevel(t) {
		this.PhantomLevel = t;
	}
	static GenerateLocalUniqueId(t, e) {
		return 10 * t * -1 - e;
	}
	SetIncId(t) {
		this.b5i = t;
	}
	GetPhantomLevel() {
		return this.PhantomLevel;
	}
	IsMax() {
		return (
			this.PhantomLevel >=
			ControllerHolder_1.ControllerHolder.PhantomBattleController.GetMaxLevel(
				this.b5i,
			)
		);
	}
	SetPhantomExp(t) {
		this.PhantomExp = t;
	}
	CurrentPhantomInstance() {
		return this.GetPhantomInstance();
	}
	GetCurrentSuspendSlotData() {
		return this.SuspendSlot;
	}
	GetFetterGroupId() {
		return this.FetterGroupId;
	}
	GetEatFullExp() {
		var t = CommonParamById_1.configCommonParamById.GetIntConfig(
			"PhantomExpReturnRatio",
		);
		return Math.floor((this.GetFullExp() * t) / 1e3);
	}
	GetFullExp() {
		if (0 === this.GetPhantomLevel()) return this.PhantomExp;
		let t = 0;
		for (let e = 1; e <= this.GetPhantomLevel(); e++)
			t +=
				ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomLevelExpByGroupIdAndLevel(
					this.CurrentPhantomInstance().PhantomItem.LevelUpGroupId,
					e,
				);
		return t + this.PhantomExp;
	}
	GetExp() {
		return this.PhantomExp;
	}
	UpdateData(t) {
		(this.b5i = t.Q5n ?? 0),
			(this.FuncValue = t.gDs ?? 0),
			(this.PhantomLevel = t.fDs ?? 0),
			(this.PhantomExp = t.vDs ?? 0),
			(this.PhantomMainProp = t.pDs ?? []),
			(this.PhantomSubProp = t.MDs ?? []),
			(this.FetterGroupId = t.SDs ?? 0),
			(this.q5i = t.u8n ?? 0);
	}
	SetMainProp(t) {
		this.PhantomMainProp = t;
	}
	SetSubProp(t) {
		this.PhantomMainProp = t;
	}
	GetIncrId() {
		return this.b5i;
	}
	OnFunctionValueChange(t) {
		this.FuncValue = t;
	}
	GetSuspendAttributeData() {
		var t = this.SuspendSlot.EDs;
		const e = new Array();
		return (
			t.forEach((t) => {
				var a =
						ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSubPropertyById(
							t.IDs,
						),
					o =
						ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(
							t.IDs,
						),
					n = a.AddType === CommonComponentDefine_1.RATIO;
				t = AttributeModel_1.TipsDataTool.GetPropRatioValue(t.gkn, n);
				e.push(
					new AttrListScrollData_1.AttrListScrollData(
						a.PropId,
						0,
						t,
						o.Priority,
						n,
						1,
					),
				);
			}),
			e
		);
	}
	GetSlotIndexAttributeData(t, e) {
		var a, o, n, r;
		if (this.GetSlotIndexDataEx(t))
			return (
				(t = this.GetSlotIndexDataEx(t)),
				(a = new Array()),
				(o =
					ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSubPropertyById(
						t.IDs,
					)),
				(n =
					ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(
						t.IDs,
					)),
				(r = o.AddType === CommonComponentDefine_1.RATIO),
				(t = AttributeModel_1.TipsDataTool.GetPropRatioValue(t.gkn, r)),
				a.push(
					new AttrListScrollData_1.AttrListScrollData(
						o.PropId,
						0,
						t,
						n.Priority,
						r,
						e,
					),
				),
				a
			);
	}
	GetIfActivePersonalSkill() {
		return 0 < (2 & this.FuncValue);
	}
	GetEquipRoleId() {
		return (
			ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomEquipOnRoleId(
				this.GetIncrId(),
			) ?? 0
		);
	}
	GetEquipRoleIndex() {
		var t = this.GetEquipRoleId();
		return 0 < t &&
			(t =
				ModelManager_1.ModelManager.PhantomBattleModel.GetBattleDataById(
					t,
				).GetIncrIdList()).includes(this.GetIncrId())
			? t.indexOf(this.GetIncrId())
			: -1;
	}
	GetNameColor() {
		return ConfigManager_1.ConfigManager.ItemConfig.GetQualityConfig(
			this.GetQuality(),
		).DropColor;
	}
	G5i(t, e) {
		var a,
			o,
			n =
				ModelManager_1.ModelManager.PhantomBattleModel.GetBattleDataById(
					e,
				).GetIncrIdList();
		return (
			-1 === t ||
				(a =
					ModelManager_1.ModelManager.PhantomBattleModel.GetBattleDataById(
						e,
					).GetIndexPhantomId(t)) === (o = this.GetIncrId()) ||
				((n = Array.from(
					ModelManager_1.ModelManager.PhantomBattleModel.GetBattleDataById(
						e,
					).GetIncrIdList(),
				)),
				0 === a
					? (this.GetEquipRoleId() === e && (n[this.GetEquipRoleIndex()] = 0),
						(n[t] = o))
					: a !== o &&
						(this.GetEquipRoleId() === e &&
							(n[this.GetEquipRoleIndex()] = n[t]),
						(n[t] = o))),
			n
		);
	}
	static CalculateFetterByPhantomBattleData(t) {
		var e = t.length,
			a = new Map(),
			o = new Map();
		for (let l = 0; l < e; l++) {
			var n = t[l];
			if (n) {
				var r,
					i = n.GetFetterGroupId();
				let t = o.get(i);
				(t = t || new Array()).includes(n.GetMonsterId()) ||
					((r = a.get(i) ?? 0), a.set(i, r + 1), t.push(n.GetMonsterId())),
					o.set(i, t);
			}
		}
		return a;
	}
	IfEquipSameNameMonsterOnRole(t, e, a) {
		t = this.G5i(t, e);
		const o = new Array();
		return (
			t.forEach((t) => {
				(t =
					ModelManager_1.ModelManager.PhantomBattleModel?.GetPhantomDataBase(
						t,
					)),
					t && o.push(t.GetMonsterId());
			}),
			(e = new Set(o)),
			o.length !== e.size
		);
	}
	GetPreviewShowFetterList(t, e) {
		const a = new Array();
		var o =
				ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFetterGroupFetterDataById(
					this.FetterGroupId,
				),
			n = this.G5i(t, e);
		const r =
			ModelManager_1.ModelManager.PhantomBattleModel.GetRoleFetterData(e);
		var i = n.length,
			l = new Array();
		for (let t = 0; t < i; t++) {
			var s =
				ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(
					n[t],
				);
			s && l.push(s);
		}
		const h = PhantomDataBase.CalculateFetterByPhantomBattleData(l),
			u = r.length;
		return (
			o.forEach((t, e) => {
				var o = new VisionFetterData(),
					n =
						((o.FetterGroupId = this.FetterGroupId),
						(o.FetterId = t),
						(o.NeedActiveNum = e),
						(o.ActiveFetterGroupNum = h.get(this.FetterGroupId) ?? 0),
						(o.ActiveState = h.get(this.FetterGroupId) >= e),
						h.get(this.FetterGroupId) >= e);
				let i = !1;
				for (let e = 0; e < u; e++)
					if (r[e].FetterId === t && r[e].ActiveState !== n && n) {
						i = !0;
						break;
					}
				i && (o.NewAdd = !0), a.push(o);
			}),
			a
		);
	}
	GetPreviewCurrentShowFetterList() {
		return new Array();
	}
	GetShowFetterList(t, e) {
		const a = new Array();
		return (
			-1 !== t &&
				(this.GetAddFetterList(t, e).forEach((t) => {
					var e = new VisionAttributeItemTwo_1.VisionAttributeVariantTwoData();
					(e.FetterId = t), (e.State = 2), a.push(e);
				}),
				this.GetDelFetterList(t, e).forEach((t) => {
					var e = new VisionAttributeItemTwo_1.VisionAttributeVariantTwoData();
					(e.FetterId = t), (e.State = 1), a.push(e);
				})),
			this.GetCanActiveFetterList().forEach((t) => {
				var e;
				this.N5i(a, t) ||
					(((e =
						new VisionAttributeItemTwo_1.VisionAttributeVariantTwoData()).FetterId =
						t),
					(e.State = 0),
					a.push(e));
			}),
			a
		);
	}
	N5i(t, e) {
		for (let a = t.length - 1; 0 <= a; a--) if (t[a].FetterId === e) return !0;
		return !1;
	}
	GetCanActiveFetterList() {
		return ModelManager_1.ModelManager.PhantomBattleModel.GetTargetCanActiveFettersList(
			this.GetIncrId(),
		);
	}
	GetDelFetterList(t, e) {
		return ModelManager_1.ModelManager.PhantomBattleModel.GetPreviewFettersDel(
			this,
			t,
			e,
		);
	}
	GetAddFetterList(t, e) {
		return ModelManager_1.ModelManager.PhantomBattleModel.GetPreviewFetterAdd(
			this,
			t,
			e,
		);
	}
	GetFetterGroupConfig() {
		return ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFetterGroupById(
			this.GetFetterGroupId(),
		);
	}
	GetIfLock() {
		return 0 < (1 & this.FuncValue);
	}
	GetCost() {
		var t = this.GetConfig().Rarity;
		return ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomRareConfig(
			t,
		).Cost;
	}
	GetRareConfig() {
		var t = this.GetConfig().Rarity;
		return ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomRareConfig(
			t,
		);
	}
	GetNewSubPropSuccessData(t) {
		t = t.length;
		var e = this.PhantomSubProp.length,
			a = this.GetSubPropShowAttributeList(1),
			o = new Array();
		for (let n = t; n < e; n++)
			(a[n].AddValue = a[n].BaseValue), (a[n].BaseValue = 0), o.push(a[n]);
		const n = new Array();
		return (
			o.forEach((t) => {
				((t =
					RoleLevelUpSuccessController_1.RoleLevelUpSuccessController.ConvertsAttrListScrollDataToAttributeInfo(
						t,
					)).ShowArrow = !1),
					(t.PreText = ""),
					n.push(t);
			}),
			{
				Title: "IdentifySuccess",
				WiderScrollView: !1,
				AttributeInfo: n,
				IsShowArrow: !1,
			}
		);
	}
	GetSlotIndexDataEx(t) {
		var e = this.PhantomSubProp;
		if (e.length > t) return e[t];
	}
	GetMaxSubPropCount() {
		var t = this.GetQuality();
		return ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSlotUnlockLevel(
			t,
		).length;
	}
	GetSubPropIdentifyPreviewData(t, e) {
		var a = this.GetLevelSubPropData(t);
		let o = 0;
		var n = a.length;
		for (let t = 0; t < n; t++)
			1 === a[t].SlotState && 0 < e - o && ((a[t].SlotState = 5), o++);
		return a;
	}
	GetLevelSubPropPreviewData(t, e) {
		var a = this.GetLevelSubPropData(t),
			o = this.GetLevelSubPropData(e),
			n = o.length;
		for (let t = 0; t < n; t++)
			0 !== o[t].SlotState && 0 === a[t].SlotState && (o[t].SlotState = 2);
		return o;
	}
	GetEquipmentViewPreviewData() {
		var t = this.GetLevelSubPropData(this.GetPhantomLevel()),
			e = t.length,
			a = new Array();
		let o = 0;
		for (let n = 0; n < e; n++)
			3 === t[n].SlotState && a.push(t[n]),
				1 === t[n].SlotState && 0 === o && (a.push(t[n]), (o += 1));
		return a;
	}
	GetIdentifyCostItemId() {
		return ItemDefines_1.EItemId.Gold;
	}
	GetIdentifyCostItemValue() {
		return ConfigManager_1.ConfigManager.PhantomBattleConfig.GetQualityIdentifyCost(
			this.GetQuality(),
		);
	}
	GetCurrentIdentifyCost() {
		var t = this.GetQuality();
		return ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomIdentifyCost(
			t,
		);
	}
	GetCurrentSubPropLockCount() {
		var t = this.GetLevelSubPropData(this.GetPhantomLevel());
		let e = 0;
		return (
			t.forEach((t) => {
				0 === t.SlotState && e++;
			}),
			e
		);
	}
	GetIfHaveEnoughIdentifyGold(t) {
		t = this.GetIdentifyCostItemValue() * t;
		var e =
			ModelManager_1.ModelManager.InventoryModel.GetItemDataBaseByConfigId(
				this.GetIdentifyCostItemId(),
			);
		let a = 0;
		return 0 <= (a = 0 < e.length ? e[0].GetCount() : a) - t;
	}
	GetIfHaveEnoughIdentifyConsumeItem(t) {
		t = this.GetCurrentIdentifyCostValue() * t;
		var e =
			ModelManager_1.ModelManager.InventoryModel.GetItemDataBaseByConfigId(
				this.GetCurrentIdentifyCostId(),
			);
		let a = 0;
		return 0 <= (a = 0 < e.length ? e[0].GetCount() : a) - t;
	}
	GetNextIdentifyLevel() {
		let t = 0;
		for (const e of this.GetLevelSubPropData(this.GetPhantomLevel()))
			if (0 === e.SlotState) {
				t = e.GetUnlockLevel();
				break;
			}
		return t;
	}
	GetCurrentIdentifyCostId() {
		var t = this.GetCurrentIdentifyCost();
		let e = 0;
		return (
			t.forEach((t, a) => {
				e = a;
			}),
			e
		);
	}
	GetCurrentIdentifyCostValue() {
		var t = this.GetCurrentIdentifyCost();
		let e = 0;
		return (
			t.forEach((t, a) => {
				e = t;
			}),
			e
		);
	}
	GetCurrentCanIdentifyCount() {
		var t = this.GetLevelSubPropData(this.GetPhantomLevel());
		let e = 0,
			a =
				(t.forEach((t) => {
					1 === t.SlotState && e++;
				}),
				e);
		return (
			this.GetCurrentIdentifyCost().forEach((t, e) => {
				let o = 0;
				(o =
					0 <
					(e =
						ModelManager_1.ModelManager.InventoryModel.GetItemDataBaseByConfigId(
							e,
						)).length
						? Math.floor(e[0].GetCount() / t)
						: o) < a && (a = o);
			}),
			a
		);
	}
	GetLevelUnlockSubPropSlotCount(t) {
		var e = this.GetMaxSubPropCount();
		let a = 0;
		for (let o = 0; o < e; o++) t >= this.GetSubPropUnlockLevel(o) && a++;
		return a;
	}
	GetLevelSubPropData(t) {
		var e = this.GetMaxSubPropCount(),
			a = new Array();
		for (let r = 0; r < e; r++) {
			var o,
				n = new VisionSubPropData(r, this);
			t >= this.GetSubPropUnlockLevel(r)
				? (o = this.GetSlotIndexDataEx(r))
					? ((n.SlotState = 3), (n.PhantomSubProp = o))
					: (n.SlotState = 1)
				: (n.SlotState = 0),
				a.push(n);
		}
		return a;
	}
	GetIfHaveLockSubProp() {
		let t = !1;
		for (const e of this.GetLevelSubPropData(this.GetPhantomLevel()))
			if (0 === e.SlotState) {
				t = !0;
				break;
			}
		return t;
	}
	GetIfHaveUnIdentifySubProp() {
		let t = !1;
		for (const e of this.GetLevelSubPropData(this.GetPhantomLevel()))
			if (1 === e.SlotState) {
				t = !0;
				break;
			}
		return t;
	}
	GetSubPropUnlockLevel(t) {
		var e = this.GetQuality();
		return (e =
			ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSlotUnlockLevel(
				e,
			)).length >= t
			? e[t]
			: 9999;
	}
	GetMaxSlotCount() {
		const t = this.GetLevelLimit();
		var e = CommonParamById_1.configCommonParamById.GetIntArrayConfig(
			"PhantomSlotUnlockLevel",
		);
		let a = 0;
		return (
			e.forEach((e) => {
				t >= e && a++;
			}),
			a
		);
	}
	GetSlotUnlockLevel(t) {
		var e = CommonParamById_1.configCommonParamById.GetIntArrayConfig(
			"PhantomSlotUnlockLevel",
		);
		return e.length >= t ? e[t] : 9999;
	}
	GetSlotLockState(t) {
		return this.GetPhantomLevel() < this.GetSlotUnlockLevel(t);
	}
	GetIdentifyBackRadio() {
		return (
			CommonParamById_1.configCommonParamById.GetIntConfig(
				"PhantomIdentifyReturnRatio",
			) / 1e3
		);
	}
	GetCurrentIdentifyNum() {
		return this.PhantomSubProp.length;
	}
	GetIdentifyBackItem() {
		var t = this.GetCurrentIdentifyCostValue(),
			e = this.GetCurrentIdentifyCostId(),
			a = this.GetCurrentIdentifyNum(),
			o = new Map();
		return (
			0 < (t = Math.floor(t * a * this.GetIdentifyBackRadio())) && o.set(e, t),
			o
		);
	}
	GetLevelSlotData(t) {
		var e = this.GetMaxSlotCount(),
			a = new Array();
		if (!(1 <= e && t < this.GetSlotUnlockLevel(0)))
			for (let n = 0; n < e; n++) {
				var o = new VisionSlotData();
				t >= this.GetSlotUnlockLevel(n)
					? this.GetSlotIndexDataEx(n)
						? (o.SlotState = 3)
						: (o.SlotState = 1)
					: (o.SlotState = 0),
					a.push(o);
			}
		return a;
	}
	GetCurrentSlotData() {
		return this.GetLevelSlotData(this.GetPhantomLevel());
	}
	GetPreviewSlotData(t) {
		var e,
			a = this.GetCurrentSlotData(),
			o = this.GetLevelSlotData(t),
			n = o.length;
		for (let r = 0; r < n; r++)
			0 === a.length
				? ((e = this.GetSlotUnlockLevel(r)), (o[r].SlotState = e <= t ? 2 : 0))
				: a.length > r &&
					a[r].SlotState !== o[r].SlotState &&
					(o[r].SlotState = 2);
		return o;
	}
	GetCurrentSkillId() {
		return this.GetPhantomInstance().PhantomItem.SkillId;
	}
	GetSkillDescExParam(t) {
		return ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSkillDescExBySkillIdAndQuality(
			t,
			this.GetQuality(),
		);
	}
	GetNormalSkillDesc() {
		var t = this.GetPhantomInstance();
		if (
			(t =
				ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSkillBySkillId(
					t.PhantomItem.SkillId,
				))
		)
			return {
				MainSkillText: t.DescriptionEx,
				MainSkillParameter: this.GetSkillDescExParam(t.Id),
				MainSkillIcon: t.BattleViewIcon,
			};
	}
	GetNormalSkillConfig() {
		var t = this.GetPhantomInstance();
		return ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSkillBySkillId(
			t.PhantomItem.SkillId,
		);
	}
	GetNormalSkillId() {
		return this.GetPhantomInstance().PhantomItem.SkillId;
	}
	GetPersonalSkillId() {
		return 0;
	}
	GetPhantomInstance() {
		var t = this.SkinId;
		return t
			? ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomInstanceByItemId(
					t,
				)
			: ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomInstanceByItemId(
					this.GetConfigId(),
				);
	}
	GetLevelUpPreviewData(t) {
		const e = new Array();
		t = this.GetMainPropValueMapInTargetLevel(t);
		const a = new Map();
		return (
			this.PhantomMainProp.forEach((t) => {
				a.set(t.IDs, t.gkn);
			}),
			t.forEach((t, o) => {
				var n = a.has(o) ? a.get(o) : 0,
					r =
						((o =
							ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomMainPropertyItemId(
								o,
							)),
						ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(
							o.PropId,
						)),
					i = o.AddType === CommonComponentDefine_1.RATIO;
				(n = AttributeModel_1.TipsDataTool.GetPropRatioValue(n, i)),
					(t = AttributeModel_1.TipsDataTool.GetPropRatioValue(t, i));
				e.push(
					new AttrListScrollData_1.AttrListScrollData(
						o.PropId,
						n,
						t,
						r.Priority,
						i,
						1,
					),
				);
			}),
			e
		);
	}
	GetPhantomMainProp() {
		return this.PhantomMainProp;
	}
	GetMainPropValueMapInTargetLevel(t) {
		var e = new Map();
		for (const n of this.GetPhantomMainProp()) {
			var a =
					ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomMainPropertyItemId(
						n.IDs,
					),
				o =
					ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomGrowthValueByGrowthIdAndLevel(
						a.GrowthId,
						t,
					);
			a = AttributeModel_1.TipsDataTool.GetAttributeValue(
				a.StandardProperty,
				o,
				!1,
			);
			e.set(n.IDs, Math.floor(a));
		}
		return e;
	}
	GetPhantomSubProp() {
		return this.PhantomSubProp;
	}
	SetConfigId(t) {
		this.ItemId = t;
	}
	SetSkinId(t) {
		this.q5i = t;
	}
	get SkinId() {
		return this.q5i;
	}
	GetConfigId(t = !1) {
		var e = this.SkinId;
		return t && e ? e : this.ItemId;
	}
	GetConfig() {
		return ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomItemById(
			this.ItemId,
		);
	}
	GetSkinConfig() {
		var t = this.SkinId;
		return t
			? ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomItemById(t)
			: this.GetConfig();
	}
	GetMonsterConfig() {
		return ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterInfoConfig(
			this.GetMonsterId(),
		);
	}
	GetLevelLimit() {
		return ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomQualityByItemQuality(
			this.GetQuality(),
		).LevelLimit;
	}
	GetQuality() {
		return this.GetConfig()?.QualityId;
	}
	GetMonsterId(t = !1) {
		return (t && this.SkinId ? this.GetSkinConfig() : this.GetConfig())
			?.MonsterId;
	}
	GetMonsterName() {
		return (this.SkinId ? this.GetSkinConfig() : this.GetConfig())?.MonsterName;
	}
	GetMainPropShowAttributeList(t) {
		var e = new Array();
		const a = new Map();
		this.PhantomMainProp.forEach((t) => {
			a.set(t.IDs, t.gkn);
		});
		var o = Array.from(a.keys()),
			n = o.length;
		for (let s = 0; s < n; s++) {
			var r =
					ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomMainPropertyItemId(
						o[s],
					),
				i =
					ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(
						r.PropId,
					),
				l = AttributeModel_1.TipsDataTool.GetPropRatioValue(
					a.get(o[s]),
					r.AddType === CommonComponentDefine_1.RATIO,
				);
			e.push(
				new AttrListScrollData_1.AttrListScrollData(
					r.PropId,
					l,
					0,
					i.Priority,
					r.AddType === CommonComponentDefine_1.RATIO,
					t,
				),
			);
		}
		return e;
	}
	GetSubPropShowAttributeList(t) {
		const e = new Array();
		return (
			this.PhantomSubProp.forEach((a) => {
				var o =
						ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(
							a.IDs,
						),
					n =
						ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSubPropertyById(
							a.IDs,
						),
					r = n.AddType === CommonComponentDefine_1.RATIO;
				a = AttributeModel_1.TipsDataTool.GetPropRatioValue(a.gkn, r);
				e.push(
					new AttrListScrollData_1.AttrListScrollData(
						n.PropId,
						a,
						0,
						o.Priority,
						n.AddType === CommonComponentDefine_1.RATIO,
						t,
					),
				);
			}),
			e
		);
	}
	GetPropShowAttributeList(t) {
		var e = new Array();
		const a = new Map(),
			o =
				(this.PhantomMainProp.forEach((t) => {
					a.set(t.IDs, t.gkn);
				}),
				new Map());
		this.PhantomSubProp.forEach((t) => {
			o.set(t.IDs, t.gkn), a.has(t.IDs) || a.set(t.IDs, 0);
		});
		var n = Array.from(a.keys()),
			r = n.length;
		for (let l = 0; l < r; l++) {
			var i =
				ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(
					n[l],
				);
			e.push(
				new AttrListScrollData_1.AttrListScrollData(
					n[l],
					a.get(n[l]),
					o.get(n[l]) ?? 0,
					i.Priority,
					!1,
					t,
				),
			);
		}
		return e;
	}
	static GetPropValue(t, e) {
		return t.Value;
	}
}
exports.PhantomDataBase = PhantomDataBase;
