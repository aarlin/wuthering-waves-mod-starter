"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoguelikeModel = void 0);
const Time_1 = require("../../../Core/Common/Time"),
	ModelBase_1 = require("../../../Core/Framework/ModelBase"),
	StateRef_1 = require("../../../Core/Utils/Audio/StateRef"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	LocalStorage_1 = require("../../Common/LocalStorage"),
	LocalStorageDefine_1 = require("../../Common/LocalStorageDefine"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	ActivityRogueController_1 = require("../Activity/ActivityContent/RougeActivity/ActivityRogueController"),
	AdventureDefine_1 = require("../AdventureGuide/AdventureDefine"),
	RoguelikeChooseData_1 = require("./Define/RoguelikeChooseData"),
	RoguelikeDefine_1 = require("./Define/RoguelikeDefine");
class RoguelikeModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.xso = void 0),
			(this.wso = 0),
			(this.Bso = void 0),
			(this.bso = 0),
			(this.qso = 0),
			(this.Gso = void 0),
			(this.Nso = new StateRef_1.StateRef("game_rogue_room_type", "none")),
			(this.Oso = void 0),
			(this.kso = new Map()),
			(this.Fso = new Map()),
			(this.Vso = new Map()),
			(this.TempCountdown = void 0),
			(this.ShowRewardList = void 0),
			(this.CurrSeasonData = void 0),
			(this.CurDungeonId = void 0),
			(this.Hso = 0),
			(this.SelectSkillId = 0);
	}
	OnInit() {
		return !0;
	}
	OnClear() {
		return this.kso.clear(), !(this.xso = void 0);
	}
	get EditFormationRoleList() {
		return this.Oso;
	}
	set EditFormationRoleList(e) {
		this.Oso = e;
	}
	get CurIndex() {
		return this.wso;
	}
	set CurIndex(e) {
		this.wso = e;
	}
	get CurrentRogueGainEntry() {
		return this.Bso;
	}
	set CurrentRogueGainEntry(e) {
		this.Bso = e;
	}
	get RogueInfo() {
		return this.xso;
	}
	set RogueInfo(e) {
		this.xso = e;
	}
	get CurRoomCount() {
		return this.bso;
	}
	set CurRoomCount(e) {
		this.bso = e;
	}
	get TotalRoomCount() {
		return this.qso;
	}
	set TotalRoomCount(e) {
		this.qso = e;
	}
	get CurRoomType() {
		return this.Gso;
	}
	set CurRoomType(e) {
		this.Gso = e;
	}
	get CurRoomMusicState() {
		return this.Nso.State;
	}
	set CurRoomMusicState(e) {
		this.Nso.State = e ?? "none";
	}
	get RoguelikeSkillDataMap() {
		return this.Fso;
	}
	get RoguelikeCurrencyDictMap() {
		return this.Vso;
	}
	SetRoguelikeSkillData(e, o) {
		this.Fso.set(e, o);
	}
	SetRoguelikeCurrency(e, o) {
		this.Vso.set(e, o);
	}
	UpdateRoguelikeCurrency(e, o) {
		var t = this.GetRoguelikeCurrency(e);
		this.Vso.set(e, t + o),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnPlayerCurrencyChange,
				e,
			);
	}
	GetRoguelikeCurrency(e) {
		return this.Vso.get(e) ?? 0;
	}
	UpdateDescModel(e) {
		(this.Hso = e ? 0 : 1),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.RoguelikeDataUpdate,
			);
	}
	GetDescModel() {
		return this.Hso;
	}
	SetRoguelikeChooseData(e) {
		for (const o of e)
			this.kso.set(o.Akn, new RoguelikeChooseData_1.RoguelikeChooseData(o));
	}
	GetRoguelikeChooseDataById(e) {
		return this.kso.get(e);
	}
	GetSortElementInfoArrayMap(e = void 0) {
		var o,
			t,
			n,
			r = new Map();
		for ([o, t] of this.RogueInfo.ElementDict) 9 !== o && r.set(o, t);
		if (e)
			for (var [i, a] of e) 9 !== i && ((n = r.get(i) ?? 0), r.set(i, n + a));
		var s,
			u,
			g = new Array(),
			l = new Map();
		for ([s, u] of r) {
			var C = new RoguelikeDefine_1.ElementInfo(Number(s), u);
			e && (C.IsPreview = 0 < (e.get(s) ?? 0)),
				g.push(C),
				l.set(C.ElementId, C);
		}
		return g.sort((e, o) => o.Count - e.Count), [g, l];
	}
	CheckInRoguelike() {
		return (
			ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
				ModelManager_1.ModelManager.CreatureModel.GetInstanceId(),
			)?.InstSubType === AdventureDefine_1.EDungeonSubType.Roguelike &&
			ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()
		);
	}
	CheckIsGuideDungeon() {
		var e = ModelManager_1.ModelManager.GameModeModel.InstanceDungeon,
			o = this.GetParamConfigBySeasonId();
		return !(!o || !e || !o.GuideInstArray) && o.GuideInstArray.includes(e.Id);
	}
	CheckIsGuideDungeonFinish() {
		return (
			ActivityRogueController_1.ActivityRogueController.GetCurrentActivityData()?.GetPreGuideQuestFinishState() ??
			!1
		);
	}
	CheckHasCanUnlockSkill() {
		let e = !1;
		const o = this.GetRoguelikeCurrency(RoguelikeDefine_1.SKILL_POINT_ID);
		return (
			this.RoguelikeSkillDataMap.forEach((t, n) => {
				0 === t &&
					(
						ConfigManager_1.ConfigManager.RoguelikeConfig?.GetRogueTalentTreeById(
							n,
						)
					).Consule[0] <= o &&
					(e = !0);
			}),
			e && this.CheckIsGuideDungeonFinish()
		);
	}
	CheckRoguelikeShopRedDot() {
		var e,
			o,
			t,
			n =
				ActivityRogueController_1.ActivityRogueController.GetCurrentActivityData();
		return (
			!!n &&
			!!(e = ModelManager_1.ModelManager.RoguelikeModel.CurrSeasonData) &&
			!!(e =
				ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueSeasonConfigById(
					e.F8n,
				)) &&
			((n = n.GetRogueActivityState()),
			ActivityRogueController_1.ActivityRogueController.RefreshActivityRedDot(),
			(o = ModelManager_1.ModelManager.PayShopModel.GetPayShopTabIdList(
				e.ShopId,
			)),
			(e = ModelManager_1.ModelManager.PayShopModel.GetPayShopTabData(
				e.ShopId,
				o[0],
			)),
			0 === n
				? !LocalStorage_1.LocalStorage.GetPlayer(
						LocalStorageDefine_1.ELocalStoragePlayerKey.RoguelikeShopRecord,
					) &&
					this.CheckIsGuideDungeonFinish() &&
					0 < e.length
				: 1 === n &&
					((o =
						LocalStorage_1.LocalStorage.GetPlayer(
							LocalStorageDefine_1.ELocalStoragePlayerKey
								.RoguelikeShopNextTimeStamp,
						) ?? 0),
					(n = Time_1.Time.ServerTimeStamp),
					(t =
						ModelManager_1.ModelManager.InventoryModel?.GetItemCountByConfigId(
							RoguelikeDefine_1.OUTSIDE_CURRENCY_ID,
						) ?? 0),
					o < n) &&
					0 < t &&
					0 < e.length)
		);
	}
	GetRoguelikeAchievementRedDot() {
		var e = ModelManager_1.ModelManager.RoguelikeModel.CurrSeasonData;
		return (
			void 0 !== e &&
			((e =
				ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueSeasonConfigById(
					e.F8n,
				)),
			ModelManager_1.ModelManager.AchievementModel.GetCategoryRedPointState(
				e.Achievement,
			)) &&
			this.CheckIsGuideDungeonFinish()
		);
	}
	GetNextCanUnlockSkillId() {
		let e = 0;
		for (var [o, t] of this.RoguelikeSkillDataMap) {
			if (0 === t) {
				e = o;
				break;
			}
			0 === e && (e = o);
		}
		return e;
	}
	CheckRogueIsOpen() {
		return (
			ModelManager_1.ModelManager.FunctionModel.IsOpen(110056) &&
			void 0 !==
				ActivityRogueController_1.ActivityRogueController.GetCurrentActivityData() &&
			2 !==
				ActivityRogueController_1.ActivityRogueController.GetCurrentActivityData().GetRogueActivityState()
		);
	}
	GetParamConfigBySeasonId(e = void 0) {
		return e
			? ConfigManager_1.ConfigManager.RoguelikeConfig?.GetRogueParamConfig(e)
			: this.CurrSeasonData
				? ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueParamConfig(
						this.CurrSeasonData.F8n,
					)
				: ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueParamConfig();
	}
}
exports.RoguelikeModel = RoguelikeModel;
