"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ComposeModel = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
	ModelBase_1 = require("../../../../Core/Framework/ModelBase"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine"),
	TimeUtil_1 = require("../../../Common/TimeUtil"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	ComposeController_1 = require("./ComposeController");
class ComposeModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.Wbt = -1),
			(this.CurrentInteractCreatureDataLongId = void 0),
			(this.nIi = 0),
			(this.LastExp = 0),
			(this.ComposeEnterFlow = void 0),
			(this.ComposeSuccessFlow = void 0),
			(this.ComposeFailFlow = void 0),
			(this.sIi = 1),
			(this.aIi = []),
			(this.hIi = void 0),
			(this.lIi = void 0),
			(this._Ii = (e, t) =>
				e.IsPurification === t.IsPurification
					? e.IsUnlock === t.IsUnlock
						? t.ItemId - e.ItemId
						: t.IsUnlock - e.IsUnlock
					: t.IsPurification - e.IsPurification),
			(this.uIi = 0),
			(this.cIi = void 0),
			(this.mIi = void 0),
			(this.dIi = void 0),
			(this.CIi = 0),
			(this.gIi = void 0),
			(this.fIi = (e, t) =>
				e.IsBuff === t.IsBuff ? e.RoleId - t.RoleId : e.IsBuff ? -1 : 1);
	}
	SaveLimitRefreshTime(e) {
		this.Wbt =
			MathUtils_1.MathUtils.LongToNumber(e) * TimeUtil_1.TimeUtil.Millisecond;
	}
	GetRefreshLimitTime() {
		var e;
		if (0 !== this.Wbt)
			return (
				(e = TimeUtil_1.TimeUtil.GetServerTime()),
				TimeUtil_1.TimeUtil.GetRemainTimeDataFormat(this.Wbt - e).CountDownText
			);
	}
	GetRefreshLimitTimeValue() {
		var e;
		return this.Wbt <= 0
			? 1
			: ((e = TimeUtil_1.TimeUtil.GetServerTime()),
				TimeUtil_1.TimeUtil.GetRemainTimeDataFormat(this.Wbt - e)
					.RemainingTime);
	}
	OnInit() {
		return (
			(this.ComposeEnterFlow = {
				StateId: CommonParamById_1.configCommonParamById.GetIntConfig(
					"ComposeEnterStateId",
				),
				FlowListName: CommonParamById_1.configCommonParamById.GetStringConfig(
					"ComposeEnterFlowListName",
				),
				FlowId:
					CommonParamById_1.configCommonParamById.GetIntConfig(
						"ComposeEnterFlowId",
					),
			}),
			(this.ComposeSuccessFlow = {
				StateId: CommonParamById_1.configCommonParamById.GetIntConfig(
					"ComposeSuccessStateId",
				),
				FlowListName: CommonParamById_1.configCommonParamById.GetStringConfig(
					"ComposeSuccessFlowListName",
				),
				FlowId: CommonParamById_1.configCommonParamById.GetIntConfig(
					"ComposeSuccessFlowId",
				),
			}),
			(this.ComposeFailFlow = {
				StateId:
					CommonParamById_1.configCommonParamById.GetIntConfig(
						"ComposeFailStateId",
					),
				FlowListName: CommonParamById_1.configCommonParamById.GetStringConfig(
					"ComposeFailFlowListName",
				),
				FlowId:
					CommonParamById_1.configCommonParamById.GetIntConfig(
						"ComposeFailFlowId",
					),
			}),
			!0
		);
	}
	OnClear() {
		return (
			(this.ComposeEnterFlow = void 0),
			(this.ComposeSuccessFlow = void 0),
			(this.ComposeFailFlow = void 0),
			this.ClearComposeRoleItemDataList(),
			!0
		);
	}
	set CurrentComposeViewType(e) {
		this.nIi = e;
	}
	get CurrentComposeViewType() {
		return this.nIi;
	}
	set CurrentComposeListType(e) {
		this.sIi = e;
	}
	get CurrentComposeListType() {
		return this.sIi;
	}
	CreateComposeDataList(e) {
		this.CreateReagentProductionDataList(e),
			this.CreateStructureDataList(e),
			this.UpdatePurificationDataList(e, !1);
	}
	UpdateComposeDataList(e) {
		this.UpdateReagentProductionDataList(e),
			this.UpdateStructureDataList(e),
			this.UpdatePurificationDataList(e, !0);
	}
	UpdateComposeByServerConfig(e) {
		for (const a of e) {
			var t =
					MathUtils_1.MathUtils.LongToNumber(a.$Ts) *
					TimeUtil_1.TimeUtil.Millisecond,
				o =
					MathUtils_1.MathUtils.LongToNumber(a.HTs) *
					TimeUtil_1.TimeUtil.Millisecond,
				i = this.aIi.findIndex((e) => e.ItemId === a.Ekn);
			-1 !== i &&
				((0 == t && 0 == o) || TimeUtil_1.TimeUtil.IsInTimeSpan(t, o)
					? ((this.aIi[i].ExistStartTime = t), (this.aIi[i].ExistEndTime = o))
					: this.aIi.splice(i, 1));
		}
	}
	HideComposeDataList(e) {
		this.HideStructureDataList(e);
	}
	CreateReagentProductionDataList(e) {
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug("Compose", 50, "初始化药剂制造相关数据列表"),
			this.aIi || (this.aIi = new Array()),
			(this.aIi.length = 0);
		var t,
			o =
				ConfigManager_1.ConfigManager.ComposeConfig.GetComposeListByType(1) ??
				[],
			i = new Map();
		for (const e of o) {
			var a = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(e.ItemId);
			a = {
				MainType: 1,
				SubType: 0,
				UniqueId: 0,
				ItemId: e.Id,
				ComposeCount: 0,
				IsNew: ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(
					LocalStorageDefine_1.ELocalStoragePlayerKey.ComposeLevelKey,
					e.Id,
				),
				LastRoleId: 0,
				IsCompose: 0,
				Quality: a.QualityId,
				EffectType: e.TypeId,
				ExistStartTime: 0,
				ExistEndTime: 0,
				MadeCountInLimitTime: 0,
				TotalMakeCountInLimitTime: e.LimitCount,
				IsUnlock: 0,
			};
			this.aIi.push(a), i.set(e.Id, a);
		}
		for (const o of e)
			1 ===
				ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(
					o.Ekn,
				).FormulaType &&
				i.has(o.Ekn) &&
				(((t = i.get(o.Ekn)).ItemId = o.Ekn),
				(t.ComposeCount = o.I5n ?? 0),
				(t.IsNew = ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(
					LocalStorageDefine_1.ELocalStoragePlayerKey.ComposeLevelKey,
					o.Ekn,
				)),
				(t.LastRoleId = o.NTs ?? 0),
				(t.ExistStartTime =
					MathUtils_1.MathUtils.LongToNumber(o.$Ts) *
					TimeUtil_1.TimeUtil.Millisecond),
				(t.ExistEndTime =
					MathUtils_1.MathUtils.LongToNumber(o.HTs) *
					TimeUtil_1.TimeUtil.Millisecond),
				(t.MadeCountInLimitTime = o.Gxs),
				(t.TotalMakeCountInLimitTime = o.FTs),
				(t.IsUnlock = 1),
				(t.IsCompose = this.CheckCanReagentProduction(t.ItemId) ? 1 : 0));
	}
	UpdateReagentProductionDataList(e) {
		let t = !1;
		for (const n of e) {
			var o,
				i = ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(
					n.Ekn,
				);
			if (1 === i.FormulaType) {
				let e = !1;
				for (const o of this.aIi)
					if (n.Ekn === o.ItemId) {
						var a = 1 === o.IsUnlock;
						(o.ComposeCount = n.I5n ?? 0),
							(o.MadeCountInLimitTime = n.Gxs ?? 0),
							(o.IsCompose = this.CheckCanReagentProduction(n.Ekn) ? 1 : 0),
							(o.IsUnlock = 1),
							(e = !0),
							a || (t = !0);
						break;
					}
				e ||
					((i =
						ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(
							n.Ekn,
						)),
					(o = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(i.ItemId)),
					(o = {
						MainType: 1,
						SubType: 0,
						UniqueId: 0,
						ItemId: n.Ekn,
						ComposeCount: n.I5n ?? 0,
						IsNew: !0,
						LastRoleId: n.NTs ?? 0,
						IsCompose: 0,
						Quality: o.QualityId,
						EffectType: i.TypeId,
						ExistStartTime:
							MathUtils_1.MathUtils.LongToNumber(n.$Ts) *
							TimeUtil_1.TimeUtil.Millisecond,
						ExistEndTime:
							MathUtils_1.MathUtils.LongToNumber(n.HTs) *
							TimeUtil_1.TimeUtil.Millisecond,
						MadeCountInLimitTime: n.Gxs,
						TotalMakeCountInLimitTime: n.FTs,
						IsUnlock: 1,
					}),
					(t = !0),
					ModelManager_1.ModelManager.NewFlagModel.AddNewFlag(
						LocalStorageDefine_1.ELocalStoragePlayerKey.ComposeLevelKey,
						n.Ekn,
					),
					this.aIi.push(o),
					(o.IsCompose = this.CheckCanReagentProduction(o.ItemId) ? 1 : 0));
			}
		}
		t &&
			ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
				"FormulaLearned",
			);
	}
	UnlockReagentProductionData(e) {
		var t =
			ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(e);
		if (1 === t.FormulaType) {
			let e = 0;
			for (
				;
				e < this.aIi.length &&
				(35 !== this.aIi[e].SubType || this.aIi[e].ItemId !== t.FormulaItemId);
				e++
			);
			this.aIi.splice(e, 1);
		}
	}
	GetReagentProductionDataList() {
		return this.aIi;
	}
	GetReagentProductionDataById(e) {
		for (const t of this.aIi) if (e === t.ItemId) return t;
	}
	GetReagentProductionRoleId(e) {
		return (
			(e = this.GetReagentProductionDataById(e)),
			e?.LastRoleId
				? e.LastRoleId
				: ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerRoleId()
		);
	}
	CheckCanReagentProduction(e) {
		return this.pIi(this.GetReagentProductionDataById(e));
	}
	CheckCanPurification(e) {
		return this.pIi(this.GetPurificationDataById(e));
	}
	CheckCanStructure(e) {
		return this.pIi(this.GetStructureDataById(e));
	}
	pIi(e) {
		return (
			this.CheckUnlock(e) &&
			this.CheckLimitCount(e) &&
			this.CheckCoinEnough(e.ItemId) &&
			this.CheckComposeMaterialEnough(e.ItemId)
		);
	}
	CheckCoinEnough(e) {
		return (
			(e =
				ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(e)),
			ModelManager_1.ModelManager.InventoryModel.CheckIsCoinEnough(
				ComposeController_1.ComposeController.ComposeCoinId,
				e.ConsumeItems,
			)
		);
	}
	CheckLimitCount(e) {
		return (
			e.TotalMakeCountInLimitTime <= 0 ||
			e.MadeCountInLimitTime < e.TotalMakeCountInLimitTime
		);
	}
	CheckUnlock(e) {
		return 0 < e.IsUnlock;
	}
	CheckComposeMaterialEnough(e) {
		for (const o of ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(
			e,
		).ConsumeItems) {
			var t = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
				o.ItemId,
			);
			if (o.Count > t) return !1;
		}
		return !0;
	}
	CreateStructureDataList(e) {
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug("Compose", 50, "初始化构造数据相关数据列表"),
			this.hIi || (this.hIi = new Array()),
			(this.hIi.length = 0);
		var t,
			o =
				ConfigManager_1.ConfigManager.ComposeConfig.GetComposeListByType(2) ??
				[],
			i = new Map();
		for (const e of o)
			e.FormulaItemId <= 0 ||
				((t = ConfigManager_1.ConfigManager.ItemConfig?.GetConfig(e.ItemId)),
				(t = {
					MainType: 2,
					SubType: 37,
					ItemId: e.Id,
					StructureCount: 0,
					IsNew: !1,
					LastRoleId: 0,
					IsStructure: 0,
					Quality: t.QualityId,
					ExistStartTime: 0,
					ExistEndTime: 0,
					MadeCountInLimitTime: 0,
					TotalMakeCountInLimitTime: 0,
					IsUnlock: 0,
				}),
				i.set(t.ItemId, t),
				this.hIi.push(t));
		for (const t of e) {
			var a =
				ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(
					t.Ekn,
				);
			if (2 === a.FormulaType) {
				let e;
				(a = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(a.ItemId)),
					i.has(t.Ekn)
						? (((e = i.get(t.Ekn)).StructureCount = t.I5n),
							(e.IsNew = ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(
								LocalStorageDefine_1.ELocalStoragePlayerKey.ComposeLevelKey,
								t.Ekn,
							)),
							(e.LastRoleId = t.NTs),
							(e.IsStructure = 0),
							(e.ExistStartTime =
								MathUtils_1.MathUtils.LongToNumber(t.$Ts) *
								TimeUtil_1.TimeUtil.Millisecond),
							(e.ExistEndTime =
								MathUtils_1.MathUtils.LongToNumber(t.HTs) *
								TimeUtil_1.TimeUtil.Millisecond),
							(e.MadeCountInLimitTime = t.Gxs),
							(e.TotalMakeCountInLimitTime = t.FTs),
							(e.IsUnlock = 1))
						: ((e = {
								MainType: 2,
								SubType: 0,
								ItemId: t.Ekn,
								StructureCount: t.I5n ?? 0,
								IsNew: ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(
									LocalStorageDefine_1.ELocalStoragePlayerKey.ComposeLevelKey,
									t.Ekn,
								),
								LastRoleId: t.NTs ?? 0,
								IsStructure: 0,
								Quality: a.QualityId,
								ExistStartTime:
									MathUtils_1.MathUtils.LongToNumber(t.$Ts) *
									TimeUtil_1.TimeUtil.Millisecond,
								ExistEndTime:
									MathUtils_1.MathUtils.LongToNumber(t.HTs) *
									TimeUtil_1.TimeUtil.Millisecond,
								MadeCountInLimitTime: t.Gxs,
								TotalMakeCountInLimitTime: t.FTs,
								IsUnlock: 1,
							}),
							this.hIi.push(e)),
					(e.IsStructure = this.CheckCanStructure(e.ItemId) ? 1 : 0);
			}
		}
	}
	UpdateStructureDataList(e) {
		for (const o of e) {
			var t =
				ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(
					o.Ekn,
				);
			if (2 === t.FormulaType) {
				let e = !1,
					i = !1;
				for (const t of this.hIi)
					if (o.Ekn === t.ItemId) {
						(t.StructureCount = o.I5n ?? 0),
							(t.MadeCountInLimitTime = o.Gxs ?? 0),
							(e = !0),
							(i = !t.IsUnlock),
							(t.IsUnlock = 1),
							(t.IsStructure = this.CheckCanStructure(o.Ekn) ? 1 : 0);
						break;
					}
				(!i && e) ||
					(ModelManager_1.ModelManager.NewFlagModel.AddNewFlag(
						LocalStorageDefine_1.ELocalStoragePlayerKey.ComposeLevelKey,
						o.Ekn,
					),
					ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
						"FormulaLearned",
					)),
					e ||
						((t = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(t.ItemId)),
						(t = {
							MainType: 2,
							SubType: 0,
							ItemId: o.Ekn,
							StructureCount: o.I5n ?? 0,
							IsNew: !0,
							LastRoleId: o.NTs ?? 0,
							IsStructure: 0,
							Quality: t.QualityId,
							ExistStartTime:
								MathUtils_1.MathUtils.LongToNumber(o.$Ts) *
								TimeUtil_1.TimeUtil.Millisecond,
							ExistEndTime:
								MathUtils_1.MathUtils.LongToNumber(o.HTs) *
								TimeUtil_1.TimeUtil.Millisecond,
							MadeCountInLimitTime: o.Gxs,
							TotalMakeCountInLimitTime: o.FTs,
							IsUnlock: 1,
						}),
						this.hIi.push(t),
						(t.IsStructure = this.CheckCanStructure(t.ItemId) ? 1 : 0));
			}
		}
	}
	UnlockStructureData(e) {
		var t =
			ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(e);
		if (2 === t.FormulaType) {
			let e = 0;
			for (
				;
				e < this.hIi.length &&
				(37 !== this.hIi[e].SubType || this.hIi[e].ItemId !== t.FormulaItemId);
				e++
			);
			this.hIi.splice(e, 1);
		}
	}
	HideStructureDataList(e) {
		for (const t of e) {
			if (
				2 ===
				ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(t)
					.FormulaType
			) {
				let e = 0;
				for (; e < this.hIi.length && this.hIi[e].ItemId !== t; e++);
				this.hIi.splice(e, 1);
			}
		}
	}
	GetStructureDataList() {
		return this.hIi;
	}
	GetStructureDataById(e) {
		for (const t of this.hIi) if (e === t.ItemId) return t;
	}
	GetStructureRoleId(e) {
		return (e = this.GetStructureDataById(e)) && e.LastRoleId
			? e.LastRoleId
			: ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerRoleId();
	}
	CreatePurificationDataList() {
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug("Compose", 50, "初始化纯化数据相关数据列表"),
			this.lIi || (this.lIi = new Array());
		for (const t of ConfigManager_1.ConfigManager.ComposeConfig.GetComposeListByType(
			3,
		)) {
			var e = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(t.ItemId);
			e = {
				MainType: 3,
				ItemId: t.Id,
				IsUnlock: 0,
				IsNew: ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(
					LocalStorageDefine_1.ELocalStoragePlayerKey.ComposeLevelKey,
					t.Id,
				),
				IsPurification: 0,
				Quality: e.QualityId,
				LastRoleId: 0,
				ExistStartTime: 0,
				ExistEndTime: 0,
				MadeCountInLimitTime: 0,
				TotalMakeCountInLimitTime: 0,
			};
			this.lIi.push(e),
				(e.IsPurification = this.CheckCanPurification(e.ItemId) ? 1 : 0);
		}
		this.lIi.sort(this._Ii);
	}
	UpdatePurificationDataList(e, t) {
		for (const o of e) {
			if (
				3 ===
				ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(
					o.Ekn,
				).FormulaType
			)
				for (const e of this.lIi)
					if (o.Ekn === e.ItemId) {
						(e.IsUnlock = 1),
							(e.LastRoleId = o.NTs ?? 0),
							(e.ExistStartTime =
								MathUtils_1.MathUtils.LongToNumber(o.$Ts) *
								TimeUtil_1.TimeUtil.Millisecond),
							(e.ExistEndTime =
								MathUtils_1.MathUtils.LongToNumber(o.HTs) *
								TimeUtil_1.TimeUtil.Millisecond),
							(e.MadeCountInLimitTime = o.Gxs),
							(e.TotalMakeCountInLimitTime = o.FTs),
							t &&
								0 === o.NTs &&
								((e.IsNew = t),
								ModelManager_1.ModelManager.NewFlagModel.AddNewFlag(
									LocalStorageDefine_1.ELocalStoragePlayerKey.ComposeLevelKey,
									o.Ekn,
								),
								ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
									"FormulaLearned",
								)),
							(e.IsPurification = this.CheckCanPurification(o.Ekn) ? 1 : 0);
						break;
					}
		}
	}
	GetPurificationDataList() {
		return this.lIi;
	}
	GetPurificationDataById(e) {
		for (const t of this.lIi) if (e === t.ItemId) return t;
	}
	GetPurificationRoleId(e) {
		return (
			(e = this.GetPurificationDataById(e)),
			e?.LastRoleId
				? e.LastRoleId
				: ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerRoleId()
		);
	}
	set SelectedComposeLevel(e) {
		this.uIi = e;
	}
	get SelectedComposeLevel() {
		return this.uIi;
	}
	CreateComposeLevelInfo(e) {
		this.UpdateComposeInfo(e), (this.cIi = new Map());
		for (const e of ConfigManager_1.ConfigManager.ComposeConfig.GetComposeLevel())
			this.cIi.set(e.Id, e);
	}
	UpdateComposeInfo(e) {
		let t = 0;
		this.mIi &&
			((this.LastExp = this.mIi.TotalProficiency),
			(t = e.qxs - this.mIi.TotalProficiency)),
			(this.mIi = { ComposeLevel: e.r3n, TotalProficiency: e.qxs, AddExp: t });
	}
	GetComposeInfo() {
		return this.mIi;
	}
	CleanAddExp() {
		this.mIi.AddExp = 0;
	}
	GetComposeLevelByLevel(e) {
		return this.cIi.get(e);
	}
	GetComposeMaxLevel() {
		return this.cIi.size;
	}
	GetSumExpByLevel(e) {
		var t = this.GetComposeMaxLevel();
		let o = e + 1;
		return o > t && (o = t), this.GetComposeLevelByLevel(o).Completeness;
	}
	GetDropIdByLevel(e) {
		return (
			(e += 1),
			this.GetComposeMaxLevel() < e
				? -1
				: this.GetComposeLevelByLevel(e).DropIds
		);
	}
	GetComposeMaterialList(e) {
		var t = new Array();
		for (const o of ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(
			e,
		).ConsumeItems)
			t.push({ G3n: o.ItemId, k4n: o.Count, m3n: !0 });
		return t;
	}
	UpdateComposeItemList(e) {
		this.dIi || (this.dIi = new Array()), (this.dIi.length = 0);
		for (const t of e) this.dIi.push({ ItemId: t.G3n, ItemNum: t.k4n });
	}
	GetComposeItemList() {
		return this.dIi;
	}
	GetComposeText(e) {
		return (
			(e =
				ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(e)),
			ConfigManager_1.ConfigManager.ComposeConfig.GetLocalText(e.Name)
		);
	}
	GetComposeId(e) {
		return ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(
			e,
		).ItemId;
	}
	set CurrentComposeRoleId(e) {
		this.CIi = e;
	}
	get CurrentComposeRoleId() {
		return this.CIi;
	}
	UpdateHelpRoleItemDataList() {
		this.gIi || (this.gIi = new Array()), (this.gIi.length = 0);
		for (const e of ModelManager_1.ModelManager.RoleModel.GetRoleList())
			this.gIi.push({
				RoleId: e.GetRoleId(),
				RoleName: e.GetRoleRealName(),
				RoleIcon: e.GetRoleConfig().RoleHeadIcon,
				IsBuff: !1,
				ItemId: 0,
			});
	}
	ClearComposeRoleItemDataList() {
		this.gIi = void 0;
	}
	GetHelpRoleItemDataList(e) {
		this.gIi || this.UpdateHelpRoleItemDataList();
		for (const t of this.gIi)
			(t.ItemId = e),
				(t.IsBuff = ComposeController_1.ComposeController.CheckIsBuff(
					t.RoleId,
					e,
				));
		return this.gIi.sort(this.fIi);
	}
}
exports.ComposeModel = ComposeModel;
