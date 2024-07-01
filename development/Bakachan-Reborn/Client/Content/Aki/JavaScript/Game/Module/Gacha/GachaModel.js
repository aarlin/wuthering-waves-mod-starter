"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GachaModel =
		exports.GachaContentInfo =
		exports.GachaResult =
			void 0);
const UE = require("ue"),
	CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
	Log_1 = require("../../../Core/Common/Log"),
	ModelBase_1 = require("../../../Core/Framework/ModelBase"),
	ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
	BaseConfigController_1 = require("../../../Launcher/BaseConfig/BaseConfigController"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	LocalStorage_1 = require("../../Common/LocalStorage"),
	LocalStorageDefine_1 = require("../../Common/LocalStorageDefine"),
	TimeUtil_1 = require("../../Common/TimeUtil"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	UiModelResourcesManager_1 = require("../UiComponent/UiModelResourcesManager"),
	GachaController_1 = require("./GachaController"),
	GachaDefine_1 = require("./GachaDefine"),
	ProtoGachaInfo_1 = require("./ProtoGachaInfo");
class GachaResult {
	constructor() {
		(this.u5n = void 0),
			(this.p5n = []),
			(this.IsNew = !0),
			(this.v5n = []),
			(this.M5n = void 0);
	}
}
exports.GachaResult = GachaResult;
class GachaContentInfo {
	constructor() {
		(this.title = ""), (this.explain = ""), (this.detail = "");
	}
}
exports.GachaContentInfo = GachaContentInfo;
class GachaModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.Mjt = void 0),
			(this.Sjt = 0),
			(this.Ejt = void 0),
			(this.yjt = void 0),
			(this.Ijt = void 0),
			(this.Tjt = !0),
			(this.Ljt = ""),
			(this.Djt = void 0),
			(this.Rjt = []),
			(this.Ujt = new Map()),
			(this.Ajt = []);
	}
	static IsLimit(e) {
		return 0 !== e.BeginTime || 0 !== e.EndTime;
	}
	static IsValid(e) {
		var o;
		return (
			!GachaModel.IsLimit(e) ||
			((o = TimeUtil_1.TimeUtil.GetServerTime()) >= e.BeginTime &&
				(o < e.EndTime || 0 === e.EndTime))
		);
	}
	GetCachedGachaInfo() {
		return this.Djt.shift();
	}
	CacheGachaInfo(e) {
		this.Djt.push(e);
	}
	set RecordId(e) {
		this.Ljt = e;
	}
	get RecordId() {
		return this.Ljt;
	}
	get CanCloseView() {
		return this.Tjt;
	}
	set CanCloseView(e) {
		this.Tjt = e;
	}
	get TodayResultCount() {
		return this.Sjt;
	}
	set TodayResultCount(e) {
		this.Sjt = e;
	}
	get GachaInfoArray() {
		return this.Mjt;
	}
	get CurGachaResult() {
		return this.Ejt;
	}
	set CurGachaResult(e) {
		this.Ejt = e;
		var o = new Map();
		for (const e of this.Ejt) {
			var a = e?.u5n?.G3n,
				t = e?.u5n?.g5n;
			o.set(a, (o.get(a) ?? 0) + t);
		}
		for (const e of this.Ejt) {
			var r = e?.u5n?.G3n,
				n = ConfigManager_1.ConfigManager.GachaConfig.GetRoleInfoById(r);
			n
				? (e.IsNew = GachaController_1.GachaController.IsNewRole(n.Id))
				: (n =
							LocalStorage_1.LocalStorage.GetPlayer(
								LocalStorageDefine_1.ELocalStoragePlayerKey.GachaWeaponRecord,
							) ?? []).includes(r)
					? (e.IsNew = !1)
					: ((e.IsNew = !0),
						n.push(r),
						LocalStorage_1.LocalStorage.SetPlayer(
							LocalStorageDefine_1.ELocalStoragePlayerKey.GachaWeaponRecord,
							n,
						));
		}
	}
	GetGachaInfoByResourceId(e) {
		for (const o of this.Mjt) if (o.ResourcesId === e) return o;
	}
	OnInit() {
		return (this.Djt = []), !0;
	}
	OnClear() {
		return (
			(this.CanCloseView = !0),
			(this.Mjt = void 0),
			(this.Ejt = void 0),
			(this.yjt = void 0),
			(this.Ijt = void 0),
			(this.Djt.length = 0),
			!(this.Djt = void 0)
		);
	}
	InitGachaInfoMap(e) {
		this.Mjt = [];
		for (const o of e) this.Mjt.push(new ProtoGachaInfo_1.ProtoGachaInfo(o));
		this.Mjt.sort((e, o) => e.Sort - o.Sort);
	}
	CheckGachaValid(e) {
		return GachaModel.IsValid(e);
	}
	GetValidGachaList() {
		var e,
			o = [];
		for (const a of ModelManager_1.ModelManager.GachaModel.GachaInfoArray)
			ModelManager_1.ModelManager.GachaModel.CheckGachaValid(a) &&
				(e =
					0 < (e = a.UsePoolId) ? a.GetPoolInfo(e) : a.GetFirstValidPool()) &&
				o.push(new GachaDefine_1.GachaPoolData(a, e));
		return o;
	}
	CheckCountIsEnough(e, o) {
		return 0 < e.DailyLimitTimes && e.TodayTimes + o > e.DailyLimitTimes
			? [!1, 69]
			: 0 < e.TotalLimitTimes && e.TotalTimes + o > e.TotalLimitTimes
				? [!1, 129]
				: 0 <= this.Sjt && o > this.Sjt
					? [!1, 130]
					: [!0, void 0];
	}
	IsTotalTimesZero(e) {
		return 0 < e.TotalLimitTimes && e.TotalTimes >= e.TotalLimitTimes;
	}
	GetGachaInfo(e) {
		for (const o of this.GachaInfoArray) if (o.Id === e) return o;
	}
	RecordGachaInfo(e) {
		return (
			!this.Ijt.has(e.Id) &&
			(this.Ijt.add(e.Id),
			this.yjt.push(e.Id),
			LocalStorage_1.LocalStorage.SetPlayer(
				LocalStorageDefine_1.ELocalStoragePlayerKey.GachaPoolOpenRecord,
				this.yjt,
			),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnOpenGachaChanged,
			),
			!0)
		);
	}
	InitGachaPoolOpenRecord() {
		(this.yjt =
			LocalStorage_1.LocalStorage.GetPlayer(
				LocalStorageDefine_1.ELocalStoragePlayerKey.GachaPoolOpenRecord,
			) ?? []),
			(this.Ijt = new Set());
		for (const e of this.yjt) this.Ijt.add(e);
	}
	UpdateCount(e, o) {
		this.Sjt -= o;
		for (const a of this.GachaInfoArray)
			if (a.Id === e) {
				(a.TodayTimes += o), (a.TotalTimes += o);
				break;
			}
	}
	CheckNewGachaPool() {
		if (
			(Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn("Gacha", 9, "当前打开过的卡池", [
					"GachaPoolOpenRecord",
					this.yjt,
				]),
			this.GachaInfoArray)
		)
			for (const e of this.GachaInfoArray) if (!this.Ijt.has(e.Id)) return !0;
		return !1;
	}
	CheckNewGachaPoolById(e) {
		return !this.Ijt.has(e);
	}
	async PreloadGachaSequence(e) {
		var o = [];
		for (const a of e) o.push(this.PreloadGachaSequenceOne(a));
		await Promise.all(o);
	}
	GetLoadedSequence(e) {
		return this.Ujt.get(e);
	}
	async PreloadGachaSequenceOne(e) {
		var o = ConfigManager_1.ConfigManager.GachaConfig.GetGachaTextureInfo(e);
		const a =
				ConfigManager_1.ConfigManager.GachaConfig.GetGachaSequenceConfigById(
					o.ShowSequence,
				),
			t = new CustomPromise_1.CustomPromise();
		(o = ResourceSystem_1.ResourceSystem.LoadAsync(
			a.SequencePath,
			UE.LevelSequence,
			(e) => {
				this.Ujt.set(a.SequencePath, e),
					UE.KuroSequenceRuntimeFunctionLibrary.HandleSeqTexStreaming(e, !0),
					t.SetResult(!0);
			},
			102,
		)),
			this.Rjt.push(o),
			await t.Promise,
			(o = ConfigManager_1.ConfigManager.GachaConfig.GetItemIdType(e));
		const r = new CustomPromise_1.CustomPromise();
		2 === o &&
			((o =
				UiModelResourcesManager_1.UiModelResourcesManager.GetWeaponResourcesPath(
					e,
				)),
			(e =
				UiModelResourcesManager_1.UiModelResourcesManager.LoadUiModelResources(
					o,
					() => {
						r.SetResult(!0);
					},
				)),
			this.Ajt.push(e),
			await r.Promise);
	}
	ReleaseLoadGachaSequence() {
		for (const e of this.Rjt)
			ResourceSystem_1.ResourceSystem.CancelAsyncLoad(e);
		for (const e of this.Ajt)
			UiModelResourcesManager_1.UiModelResourcesManager.CancelUiModelResourceLoad(
				e,
			);
		this.Ujt.forEach((e) => {
			UE.KuroSequenceRuntimeFunctionLibrary.HandleSeqTexStreaming(e, !0);
		}),
			this.Ujt.clear();
	}
	IsRolePool(e) {
		return 1 === e || 4 === e || 2 === e || 6 === e;
	}
	GetGachaQuality(e) {
		let o = 0;
		switch (ConfigManager_1.ConfigManager.GachaConfig.GetItemIdType(e)) {
			case 1:
				o =
					ConfigManager_1.ConfigManager.GachaConfig.GetRoleInfoById(
						e,
					).QualityId;
				break;
			case 2:
				o =
					ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponConfigByItemId(
						e,
					).QualityId;
				break;
			default:
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Gacha",
						44,
						"抽卡获得物品的类型错误，必须是角色或武器",
						["itemId", e],
					);
		}
		return o;
	}
	GetGachaRecordUrlPrefix() {
		var e =
				ControllerHolder_1.ControllerHolder.KuroSdkController.GetIfGlobalSdk(),
			o = BaseConfigController_1.BaseConfigController.GetGachaUrl();
		return e && void 0 !== o.GachaGlobalRecord
			? o.GachaGlobalRecord
			: o.GachaRecord;
	}
	GetGachaPoolUrlPrefix() {
		var e =
				ControllerHolder_1.ControllerHolder.KuroSdkController.GetIfGlobalSdk(),
			o = BaseConfigController_1.BaseConfigController.GetGachaUrl();
		return e && void 0 !== o.GachaPoolGlobalDetail
			? o.GachaPoolGlobalDetail
			: o.GachaPoolDetail;
	}
	GetServerArea() {
		return ControllerHolder_1.ControllerHolder.KuroSdkController.GetIfGlobalSdk()
			? "global"
			: "cn";
	}
}
exports.GachaModel = GachaModel;
