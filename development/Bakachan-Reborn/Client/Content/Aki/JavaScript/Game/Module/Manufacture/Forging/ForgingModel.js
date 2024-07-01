"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ForgingModel = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
	ModelBase_1 = require("../../../../Core/Framework/ModelBase"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine"),
	TimeUtil_1 = require("../../../Common/TimeUtil"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	ForgingController_1 = require("./ForgingController");
class ForgingModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.Wbt = -1),
			(this.CurrentInteractCreatureDataLongId = void 0),
			(this.nTi = 0),
			(this.ForgingEnterFlow = void 0),
			(this.ForgingSuccessFlow = void 0),
			(this.ForgingFailFlow = void 0),
			(this.sTi = void 0),
			(this.i8s = new Map()),
			(this.aTi = void 0),
			(this.hTi = 0),
			(this.lTi = void 0),
			(this.fIi = (e, i) =>
				e.IsBuff === i.IsBuff ? e.RoleId - i.RoleId : e.IsBuff ? -1 : 1);
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
			(this.ForgingEnterFlow = {
				StateId: CommonParamById_1.configCommonParamById.GetIntConfig(
					"ForgingEnterStateId",
				),
				FlowListName: CommonParamById_1.configCommonParamById.GetStringConfig(
					"ForgingEnterFlowListName",
				),
				FlowId:
					CommonParamById_1.configCommonParamById.GetIntConfig(
						"ForgingEnterFlowId",
					),
			}),
			(this.ForgingSuccessFlow = {
				StateId: CommonParamById_1.configCommonParamById.GetIntConfig(
					"ForgingSuccessStateId",
				),
				FlowListName: CommonParamById_1.configCommonParamById.GetStringConfig(
					"ForgingSuccessFlowListName",
				),
				FlowId: CommonParamById_1.configCommonParamById.GetIntConfig(
					"ForgingSuccessFlowId",
				),
			}),
			(this.ForgingFailFlow = {
				StateId:
					CommonParamById_1.configCommonParamById.GetIntConfig(
						"ForgingFailStateId",
					),
				FlowListName: CommonParamById_1.configCommonParamById.GetStringConfig(
					"ForgingFailFlowListName",
				),
				FlowId:
					CommonParamById_1.configCommonParamById.GetIntConfig(
						"ForgingFailFlowId",
					),
			}),
			!0
		);
	}
	OnClear() {
		return (
			(this.ForgingEnterFlow = void 0),
			(this.ForgingSuccessFlow = void 0),
			!(this.ForgingFailFlow = void 0)
		);
	}
	set CurrentForgingViewType(e) {
		this.nTi = e;
	}
	get CurrentForgingViewType() {
		return this.nTi;
	}
	CreateForgingDataList() {
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug("Forging", 50, "初始化锻造数据相关数据列表"),
			this.sTi || (this.sTi = new Array()),
			(this.sTi.length = 0);
		for (const t of ConfigManager_1.ConfigManager.ForgingConfig.GetForgeList()) {
			var e = t.Id,
				i = ConfigManager_1.ConfigManager.ForgingConfig.GetForgeFormulaById(e),
				o = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponConfigByItemId(
					i.ItemId,
				);
			i = {
				MainType: 0,
				ItemId: e,
				IsUnlock: 0,
				FormulaItemId: i.FormulaItemId,
				UniqueId: 0,
				IsNew: ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(
					LocalStorageDefine_1.ELocalStoragePlayerKey.ForgingLevelKey,
					e,
				),
				IsForging: 0,
				Quality: o.QualityId,
				LastRoleId: 0,
				WeaponType: o.WeaponType,
				ExistStartTime: 0,
				ExistEndTime: 0,
				MadeCountInLimitTime: 0,
				TotalMakeCountInLimitTime: 0,
			};
			this.sTi.push(i),
				this.i8s.set(e, i),
				(i.IsForging = this.CheckCanForging(e) ? 1 : 0);
		}
	}
	r8s(e) {
		var i = this.sTi.findIndex((i) => i.ItemId === e);
		this.sTi.splice(i, 1), this.i8s.delete(e);
	}
	CheckCanForging(e) {
		return (
			(e = this.GetForgingDataById(e)),
			this.CheckUnlock(e) &&
				this.CheckLimitCount(e) &&
				this.CheckCoinEnough(e.ItemId) &&
				this.CheckMaterialEnough(e.ItemId)
		);
	}
	CheckCoinEnough(e) {
		return (
			(e = ConfigManager_1.ConfigManager.ForgingConfig.GetForgeFormulaById(e)),
			ModelManager_1.ModelManager.InventoryModel.CheckIsCoinEnough(
				ForgingController_1.ForgingController.ForgingCostId,
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
	CheckMaterialEnough(e) {
		for (const o of ConfigManager_1.ConfigManager.ForgingConfig.GetForgeFormulaById(
			e,
		).ConsumeItems) {
			var i = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
				o.ItemId,
			);
			if (o.Count > i) return !1;
		}
		return !0;
	}
	UpdateForgingDataList(e) {
		for (const t of e) {
			var i = t.Ekn,
				o = this.GetForgingDataById(i);
			o &&
				((o.LastRoleId = t.NTs ?? 0),
				(o.ExistStartTime =
					MathUtils_1.MathUtils.LongToNumber(t.$Ts) *
					TimeUtil_1.TimeUtil.Millisecond),
				(o.ExistEndTime =
					MathUtils_1.MathUtils.LongToNumber(t.HTs) *
					TimeUtil_1.TimeUtil.Millisecond),
				(o.MadeCountInLimitTime = t.ZLs),
				(o.TotalMakeCountInLimitTime = t.FTs),
				(o.IsUnlock = 1),
				(o.IsForging = this.CheckCanForging(i) ? 1 : 0));
		}
	}
	UpdateForgingByServerConfig(e) {
		for (const r of e) {
			var i =
					MathUtils_1.MathUtils.LongToNumber(r.$Ts) *
					TimeUtil_1.TimeUtil.Millisecond,
				o =
					MathUtils_1.MathUtils.LongToNumber(r.HTs) *
					TimeUtil_1.TimeUtil.Millisecond,
				t = r.Ekn,
				n = this.GetForgingDataById(t);
			n &&
				((0 == i && 0 == o) || TimeUtil_1.TimeUtil.IsInTimeSpan(i, o)
					? ((n.ExistStartTime = i), (n.ExistEndTime = o))
					: this.r8s(t));
		}
	}
	GetForgingDataList() {
		return this.sTi;
	}
	GetForgingDataById(e) {
		return this.i8s.get(e);
	}
	GetForgingRoleId(e) {
		return (
			(e = this.GetForgingDataById(e)),
			e?.LastRoleId
				? e.LastRoleId
				: ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerRoleId()
		);
	}
	GetForgingMaterialList(e) {
		var i = new Array();
		for (const o of ConfigManager_1.ConfigManager.ForgingConfig.GetForgeFormulaById(
			e,
		).ConsumeItems)
			i.push({ G3n: o.ItemId, k4n: o.Count, m3n: !0 });
		return i;
	}
	UpdateForgingItemList(e) {
		this.aTi || (this.aTi = new Array()), (this.aTi.length = 0);
		for (const i of e) this.aTi.push({ ItemId: i.G3n, ItemNum: i.k4n });
	}
	GetForgingItemList() {
		return this.aTi;
	}
	set CurrentForgingRoleId(e) {
		this.hTi = e;
	}
	get CurrentForgingRoleId() {
		return this.hTi;
	}
	UpdateHelpRoleItemDataList() {
		this.lTi || (this.lTi = new Array()), (this.lTi.length = 0);
		for (const e of ModelManager_1.ModelManager.RoleModel.GetRoleList())
			this.lTi.push({
				RoleId: e.GetRoleId(),
				RoleName: e.GetRoleRealName(),
				RoleIcon: e.GetRoleConfig().RoleHeadIcon,
				IsBuff: !1,
				ItemId: 0,
			});
	}
	GetHelpRoleItemDataList(e) {
		this.lTi || this.UpdateHelpRoleItemDataList();
		for (const i of this.lTi)
			(i.ItemId = e),
				(i.IsBuff = ForgingController_1.ForgingController.CheckIsBuff(
					i.RoleId,
					e,
				));
		return this.lTi.sort(this.fIi);
	}
}
exports.ForgingModel = ForgingModel;
