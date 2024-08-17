"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.monsterSortFunc =
		exports.silentAreasSortFunc =
		exports.AdventureGuideController =
		exports.REMAINFLUSHTIME =
		exports.RECEIVED_COUNT =
		exports.LOWLEVELTEXTID =
		exports.MIDLEVELTEXTID =
		exports.HIGHLEVELTEXTID =
		exports.DETECT =
		exports.UNDISCOVERED =
		exports.DOING =
		exports.LVLUNKNOWNTEXT =
		exports.UNKNOWNTEXT =
		exports.LEVELTEXT =
			void 0);
const Log_1 = require("../../../Core/Common/Log"),
	MapMarkByMarkId_1 = require("../../../Core/Define/ConfigQuery/MapMarkByMarkId"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	Net_1 = require("../../../Core/Net/Net"),
	Vector_1 = require("../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	TimeUtil_1 = require("../../Common/TimeUtil"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
	InputManager_1 = require("../../Ui/Input/InputManager"),
	UiManager_1 = require("../../Ui/UiManager"),
	InventoryGiftController_1 = require("../Inventory/InventoryGiftController"),
	MapController_1 = require("../Map/Controller/MapController"),
	MapDefine_1 = require("../Map/MapDefine"),
	ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController"),
	WorldMapController_1 = require("../WorldMap/WorldMapController"),
	MAX_INT32_NUMBER =
		((exports.LEVELTEXT = "LevelText"),
		(exports.UNKNOWNTEXT = "Unknown"),
		(exports.LVLUNKNOWNTEXT = "LvlUnknown"),
		2147483647),
	MAX_INT64_NUMBER = MathUtils_1.MathUtils.BigIntToLong(0x7fffffffffffffffn),
	DUNGEON_LOCKED = "DungeonLocked";
(exports.DOING = "Doing"),
	(exports.UNDISCOVERED = "UnDiscovered"),
	(exports.DETECT = "Detect"),
	(exports.HIGHLEVELTEXTID = 3),
	(exports.MIDLEVELTEXTID = 2),
	(exports.LOWLEVELTEXTID = 1),
	(exports.RECEIVED_COUNT = "ReceivedCount"),
	(exports.REMAINFLUSHTIME = "FlushTimeRemain");
class AdventureGuideController extends UiControllerBase_1.UiControllerBase {
	static OnInit() {
		return (
			InputManager_1.InputManager.RegisterOpenViewFunc(
				"AdventureGuideView",
				AdventureGuideController.OpenGuideView,
			),
			!0
		);
	}
	static OnAddEvents() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnLoadingNetDataDone,
			this.w4e,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.RemoveMapMark,
				this.B4e,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.TrackMapMark,
				this.OnTrackMapMark,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.WorldDone,
				this.b4e,
			);
	}
	static OnRemoveEvents() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnLoadingNetDataDone,
			this.w4e,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.RemoveMapMark,
				this.B4e,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.TrackMapMark,
				this.OnTrackMapMark,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.WorldDone,
				this.b4e,
			);
	}
	static EmitRedDotFirstAwardEvent(e) {
		var n =
			ModelManager_1.ModelManager.AdventureGuideModel.GetSilentAreaDetectData(
				e,
			);
		n &&
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.RedDotSilentFirstAwardCategory,
				n.Conf.Secondary,
			),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.RedDotSilentFirstAwardResult,
				e,
			);
	}
	static OnRegisterNetEvent() {
		Net_1.Net.Register(19085, this.q4e),
			Net_1.Net.Register(12360, this.G4e),
			Net_1.Net.Register(19970, this.N4e),
			Net_1.Net.Register(10757, this.O4e),
			Net_1.Net.Register(1171, this.k4e),
			Net_1.Net.Register(23429, this.F4e);
	}
	static OnUnRegisterNetEvent() {
		Net_1.Net.UnRegister(19085),
			Net_1.Net.UnRegister(12360),
			Net_1.Net.UnRegister(19970),
			Net_1.Net.UnRegister(10757),
			Net_1.Net.UnRegister(1171),
			Net_1.Net.UnRegister(23429);
	}
	static OnAddOpenViewCheckFunction() {
		UiManager_1.UiManager.AddOpenViewCheckFunction(
			"AdventureGuideView",
			AdventureGuideController.V4e,
			"AdventureGuideController.CanOpenView",
		);
	}
	static OnRemoveOpenViewCheckFunction() {
		UiManager_1.UiManager.RemoveOpenViewCheckFunction(
			"AdventureGuideView",
			AdventureGuideController.V4e,
		);
	}
	static RequestForAdventureManual() {
		var e = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
		e = Protocol_1.Aki.Protocol.J$n.create({ aFn: e });
		Net_1.Net.Call(11381, e, AdventureGuideController.H4e);
	}
	static j4e(e, n) {
		ModelManager_1.ModelManager.MapModel.RemoveMapMark(e, n);
	}
	static RequestForAdventureManualData(e) {
		var n = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
		n = Protocol_1.Aki.Protocol.V$n.create({ aFn: n });
		Net_1.Net.Call(27679, n, AdventureGuideController.W4e);
	}
	static async RequestForAdventureReward(e) {
		(e = Protocol_1.Aki.Protocol.H$n.create({ Ekn: e })),
			(e = await Net_1.Net.CallAsync(24758, e)),
			AdventureGuideController.K4e(e);
	}
	static async GetDetectionLabelInfoRequest() {
		var e = Protocol_1.Aki.Protocol.Rjn.create({});
		e = await Net_1.Net.CallAsync(22461, e);
		AdventureGuideController.Q4e(e);
	}
	static RequestForDetection(e, n, t) {
		this.HardCode(e, t) ||
			(Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"AdventureGuide",
					5,
					"发送探测请求到后端 DetectionRequest",
					["type", Protocol_1.Aki.Protocol.d3n[e]],
					["confId", t],
				),
			(e = Protocol_1.Aki.Protocol.Q$n.create({ d3n: e, C3n: n, g3n: t })),
			Net_1.Net.Call(24831, e, AdventureGuideController.X4e));
	}
	static HardCode(e, n) {
		return (
			AdventureGuideController.StopTrackCurDetectingDungeon(),
			AdventureGuideController.StopTrackCurDetectingMonster(),
			AdventureGuideController.StopTrackCurDetectingSilentArea(),
			!1
		);
	}
	static $4e() {
		var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
		if (e && (e = e.Entity.GetComponent(3))) return e.ActorLocationProxy;
	}
	static StopTrackCurDetectingMonster() {
		var e =
			ModelManager_1.ModelManager.AdventureGuideModel.GetDetectingMonsterMarkId();
		e && this.j4e(7, e),
			ModelManager_1.ModelManager.AdventureGuideModel.GetIsFromManualDetect() &&
				ModelManager_1.ModelManager.AdventureGuideModel.CleanCurTrackingMonster();
	}
	static Y4e(e, n) {
		if (
			(Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("AdventureGuide", 5, "找到下一个距离最近的怪物", [
					"探测Id",
					e,
				]),
			e !==
				ModelManager_1.ModelManager.AdventureGuideModel.GetPendingMonsterConfId())
		)
			Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn("AdventureGuide", 10, "pending列表与探测目标不一致");
		else {
			let a,
				d = MAX_INT32_NUMBER,
				i = MAX_INT64_NUMBER;
			var t, r;
			for (const e of ModelManager_1.ModelManager.AdventureGuideModel.GetMonsterPendingList().values()) {
				var o = MathUtils_1.MathUtils.LongToBigInt(e.RefreshTime);
				Number(o) - TimeUtil_1.TimeUtil.GetServerTime() <= 0 &&
					((o = { X: e.PositionX, Y: e.PositionY, Z: e.PositionZ }),
					(o = Vector_1.Vector.Create(o)),
					(o = Vector_1.Vector.Dist(n, o)) < d) &&
					((d = o), (a = e.Id)),
					MathUtils_1.MathUtils.LongToBigInt(e.RefreshTime) <
						MathUtils_1.MathUtils.LongToBigInt(i) && (i = e.RefreshTime);
			}
			void 0 !== a
				? (Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug(
							"AdventureGuide",
							5,
							"找到距离最近的怪物发起探测",
							["探测Id", e],
							["实体id", a],
							["refreshtime", i],
						),
					(t = {
						C3n: e,
						Ikn: Protocol_1.Aki.Protocol.d3n.Proto_NormalMonster,
						Ekn: a,
					}),
					((r = Protocol_1.Aki.Protocol.Mjn.create()).f3n = t),
					Net_1.Net.Call(23417, r, AdventureGuideController.J4e))
				: (Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug(
							"AdventureGuide",
							5,
							"没有找到距离最近怪物，结束探测",
							["探测Id", e],
						),
					ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
						"CannotFindTarget",
					),
					ModelManager_1.ModelManager.AdventureGuideModel.SetDetectingMonsterRefreshTime(
						e,
						i,
					),
					this.StopTrackCurDetectingMonster(),
					this.CancelDetectingRequest(),
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("AdventureGuide", 10, "剩余刷新时间", [
							"MathUtils.LongToBigInt(minRefreshTime)",
							MathUtils_1.MathUtils.LongToBigInt(i),
						]));
		}
	}
	static CancelDetectingRequest() {
		var e = Protocol_1.Aki.Protocol.Mjn.create();
		(e.p3n = !0), Net_1.Net.Call(23417, e, () => {});
	}
	static NormalMonsterManualInfoRequest(e) {
		(e = Protocol_1.Aki.Protocol.Tjn.create({ C3n: e })),
			Net_1.Net.Call(22146, e, AdventureGuideController.z4e);
	}
	static StopTrackCurDetectingDungeon() {
		var e =
			ModelManager_1.ModelManager.AdventureGuideModel.GetDetectingDungeonMarkId();
		this.Z4e(6, e) && this.j4e(6, e),
			ModelManager_1.ModelManager.AdventureGuideModel.GetIsFromManualDetect() &&
				ModelManager_1.ModelManager.AdventureGuideModel.CleanCurTrackingDungeon();
	}
	static e5e(e, n) {
		if (
			e !==
			ModelManager_1.ModelManager.AdventureGuideModel.GetPendingDungeonConfId()
		)
			Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn("AdventureGuide", 10, "探测目标与Pending列表不一致");
		else {
			let o,
				a = MAX_INT32_NUMBER;
			var t;
			for (const e of ModelManager_1.ModelManager.AdventureGuideModel.GetDungeonPendingList().values()) {
				var r = { X: e.PositionX, Y: e.PositionY, Z: e.PositionZ };
				r = Vector_1.Vector.Create(r);
				(r = Vector_1.Vector.Dist(n, r)) < a && ((o = e.Id), (a = r));
			}
			void 0 !== o
				? ((e = {
						C3n: e,
						Ikn: Protocol_1.Aki.Protocol.d3n.Proto_Dungeon,
						Ekn: o,
					}),
					((t = Protocol_1.Aki.Protocol.Mjn.create()).f3n = e),
					Net_1.Net.Call(23417, t, AdventureGuideController.J4e))
				: ((e =
						ConfigManager_1.ConfigManager.TextConfig.GetTextById(
							DUNGEON_LOCKED,
						)),
					ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(e),
					this.StopTrackCurDetectingDungeon(),
					this.CancelDetectingRequest());
		}
	}
	static StopTrackCurDetectingSilentArea() {
		var e =
				ModelManager_1.ModelManager.AdventureGuideModel.GetDetectingSilentAreaMarkId(),
			n =
				ModelManager_1.ModelManager.AdventureGuideModel.GetDetectingSlientAreaMarkType();
		this.Z4e(n, e) && this.j4e(n, e),
			ModelManager_1.ModelManager.AdventureGuideModel.GetIsFromManualDetect() &&
				ModelManager_1.ModelManager.AdventureGuideModel.CleanCurTrackingSilentArea();
	}
	static RequestSilentFirstAward(e, n) {
		var t = Protocol_1.Aki.Protocol.Z$n.create();
		(t.Ekn = e),
			Net_1.Net.Call(3127, t, (t) => {
				if (t.lkn !== Protocol_1.Aki.Protocol.lkn.Sys)
					ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
						t.lkn,
						5685,
					);
				else {
					var r = [];
					for (const e of ConfigManager_1.ConfigManager.AdventureModuleConfig.GetDropShowInfo(
						n,
					).entries())
						r.push([{ IncId: 0, ItemId: e[0] }, e[1]]);
					InventoryGiftController_1.InventoryGiftController.ShowRewardViewWithList(
						r,
					),
						ModelManager_1.ModelManager.AdventureGuideModel.UpdateSilentFirstAwards(
							e,
							!0,
						),
						EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.RedDotSilentFirstAward,
						),
						AdventureGuideController.EmitRedDotFirstAwardEvent(e);
				}
			});
	}
	static t5e(e, n) {
		if (
			e !==
			ModelManager_1.ModelManager.AdventureGuideModel.GetPendingSilentAreaConfId()
		)
			Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn("AdventureGuide", 10, "探测目标与Pending列表不一致");
		else {
			let o,
				a = MAX_INT32_NUMBER,
				d = !0;
			var t;
			for (const e of ModelManager_1.ModelManager.AdventureGuideModel.GetSilentAreaPendingList().values()) {
				var r = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayInfo(
					e.Id,
				);
				r =
					((d = d && (r?.IsClose || !r)),
					MathUtils_1.MathUtils.LongToBigInt(e.RefreshTime));
				Number(r) <= TimeUtil_1.TimeUtil.GetServerTime() &&
					((r = Vector_1.Vector.Create(e.PositionX, e.PositionY, e.PositionZ)),
					(r = Vector_1.Vector.Dist(n, r)) < a) &&
					((o = e.Id), (a = r));
			}
			void 0 !== o
				? ((e = {
						C3n: e,
						Ikn: Protocol_1.Aki.Protocol.d3n.Proto_SilentArea,
						Ekn: o,
					}),
					((t = Protocol_1.Aki.Protocol.Mjn.create()).f3n = e),
					Net_1.Net.Call(23417, t, AdventureGuideController.J4e))
				: d ||
					(ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
						"SilentCountDown",
					),
					this.StopTrackCurDetectingSilentArea(),
					this.CancelDetectingRequest());
		}
	}
	static RequestForChapterReward(e) {
		(e = Protocol_1.Aki.Protocol.W$n.create({ v3n: e })),
			Net_1.Net.Call(23683, e, AdventureGuideController.i5e);
	}
	static o5e(e) {
		var n =
			ModelManager_1.ModelManager.AdventureGuideModel.GetCurDetectingMonsterConfId();
		n !== e[0].C3n
			? Log_1.Log.CheckError() &&
				Log_1.Log.Error("AdventureGuide", 10, "更新的追踪目标与现有目标不一致")
			: (ModelManager_1.ModelManager.AdventureGuideModel.UpdatePendingMonsterList(
					e,
					n,
				),
				0 ===
				ModelManager_1.ModelManager.AdventureGuideModel.GetMonsterPendingList()
					.size
					? ((ModelManager_1.ModelManager.AdventureGuideModel.GetMonsterDetectData(
							ModelManager_1.ModelManager.AdventureGuideModel.GetPendingMonsterConfId(),
						).RefreshTime = MAX_INT32_NUMBER),
						AdventureGuideController.StopTrackCurDetectingMonster(),
						AdventureGuideController.CancelDetectingRequest())
					: e[0].Ekn ===
							ModelManager_1.ModelManager.AdventureGuideModel.GetDetectingMonsterId() &&
						AdventureGuideController.Y4e(n, AdventureGuideController.$4e()));
	}
	static r5e(e) {
		var n =
			ModelManager_1.ModelManager.AdventureGuideModel.GetCurDetectingDungeonConfId();
		n !== e[0].C3n
			? Log_1.Log.CheckError() &&
				Log_1.Log.Error("AdventureGuide", 10, "更新的追踪目标与现有目标不一致")
			: (ModelManager_1.ModelManager.AdventureGuideModel.UpdatePendingDungeonList(
					e,
					n,
				),
				0 ===
				ModelManager_1.ModelManager.AdventureGuideModel.GetDungeonPendingList()
					.size
					? (AdventureGuideController.StopTrackCurDetectingDungeon(),
						AdventureGuideController.CancelDetectingRequest(),
						Log_1.Log.CheckWarn() &&
							Log_1.Log.Warn("AdventureGuide", 10, "Pending列表为空，等待刷新"))
					: e[0].Ekn ===
							ModelManager_1.ModelManager.AdventureGuideModel.GetDetectingDungeonId() &&
						AdventureGuideController.e5e(n, AdventureGuideController.$4e()));
	}
	static n5e(e) {
		var n =
			ModelManager_1.ModelManager.AdventureGuideModel.GetCurDetectingSilentAreaConfId();
		n !== e[0].C3n
			? Log_1.Log.CheckError() &&
				Log_1.Log.Error("AdventureGuide", 10, "更新的追踪目标与现有目标不一致")
			: (ModelManager_1.ModelManager.AdventureGuideModel.UpdatePendingSilentAreaList(
					e,
					n,
				),
				0 ===
				ModelManager_1.ModelManager.AdventureGuideModel.GetSilentAreaPendingList()
					.size
					? (AdventureGuideController.StopTrackCurDetectingSilentArea(),
						AdventureGuideController.CancelDetectingRequest(),
						Log_1.Log.CheckWarn() &&
							Log_1.Log.Warn("AdventureGuide", 10, "Pending列表为空，等待刷新"))
					: e[0].Ekn ===
							ModelManager_1.ModelManager.AdventureGuideModel.GetDetectingSilentAreaId() &&
						AdventureGuideController.t5e(n, AdventureGuideController.$4e()));
	}
	static GetValidMonsterEntityIdsOfDetectConf(e) {
		let n =
			ModelManager_1.ModelManager.CreatureModel.GetAllEntityIdOfBlueprintType(
				e.BlueprintType,
			);
		return n.filter(
			(e) =>
				!ModelManager_1.ModelManager.AdventureGuideModel.GetAllCulledMonsters().has(
					e,
				),
		);
	}
	static Z4e(e, n, t = !1) {
		return !(
			!n ||
			!e ||
			(!ModelManager_1.ModelManager.MapModel.IsMarkIdExist(e, n) &&
				(t ||
					(this.j4e(e, n),
					Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"AdventureGuide",
							5,
							"该地图标记Id不存在, 让策划去检查 k.开拓探测 配置表",
							["探测类型EMarkType", e],
							["错误id", n],
						)),
				1))
		);
	}
	static s5e(e, n, t, r, o) {
		e = { X: e.PositionX, Y: e.PositionY, Z: e.PositionZ };
		let a = n;
		return (
			t ||
				((t = new MapDefine_1.DynamicMarkCreateInfo(
					Vector_1.Vector.Create(e),
					n,
					r,
					void 0,
					void 0,
					!0,
				)),
				(a = ModelManager_1.ModelManager.MapModel.CreateMapMark(t))),
			o && MapController_1.MapController.RequestTrackMapMark(r, a, o),
			a
		);
	}
	static GetDungeonData(e) {
		if (
			((e =
				ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetConfig(e)
					.InstanceDungeonList[0]),
			(e =
				ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
					e,
				).EnterControlId))
		)
			return ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetInstanceData(
				e,
			);
	}
	static GetFirstDungeonConf(e) {
		return (
			(e =
				ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetConfig(e)
					.InstanceDungeonList[0]),
			ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e)
		);
	}
	static GetDungeonMaxCount(e) {
		e =
			ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetConfig(e)
				.InstanceDungeonList[0];
		return (e =
			ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e)) &&
			e.EnterControlId &&
			(e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetCountConfig(
				e.EnterControlId,
			))
			? e.EnterCount
			: 0;
	}
	static JumpToTargetView(e, n = void 0, t = void 0) {
		AdventureGuideController.OpenGuideView(e, n, t);
	}
	static GetMarkAreaText(e) {
		var n, t, r;
		return (e = MapMarkByMarkId_1.configMapMarkByMarkId.GetConfig(e))
			.EntityConfigId
			? ((r = ModelManager_1.ModelManager.WorldMapModel.GetEntityAreaId(
					e.EntityConfigId,
				)),
				(n = ConfigManager_1.ConfigManager.AreaConfig.GetAreaInfo(r))
					? ((t = ConfigManager_1.ConfigManager.AreaConfig.GetAreaLocalName(
							n.Title,
						)),
						(r = ConfigManager_1.ConfigManager.AreaConfig.GetParentAreaId(r)),
						(r = ConfigManager_1.ConfigManager.AreaConfig.GetAreaInfo(r)),
						(r = ConfigManager_1.ConfigManager.AreaConfig.GetAreaLocalName(
							r.Title,
						)),
						ConfigManager_1.ConfigManager.InfluenceConfig.GetCountryTitle(
							n.CountryId,
						) +
							`-${r}-` +
							t)
					: "")
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"AdventureGuide",
						5,
						"地图标记配置缺乏实体id, 无法显示对应的区域文本",
						["markId", e.MarkId],
					),
				"");
	}
	static GetShowSilentAreasList(e, n) {
		0 ===
			ModelManager_1.ModelManager.AdventureGuideModel
				.DetectionSilentAreasDataList.length &&
			ModelManager_1.ModelManager.AdventureGuideModel.InitAllDetectSilentAreasList();
		var t = new Array();
		return (
			void 0 === e && void 0 === n
				? ModelManager_1.ModelManager.AdventureGuideModel.GetShowSilentAreasList(
						t,
					)
				: void 0 !== e
					? ModelManager_1.ModelManager.AdventureGuideModel.GetShowSilentAreasList(
							t,
							e,
						)
					: void 0 !== n &&
						ModelManager_1.ModelManager.AdventureGuideModel.GetShowSilentAreasList(
							t,
							void 0,
							n,
						),
			t
		);
	}
	static CheckIsAdventureGuideHasRedDot() {
		return (
			AdventureGuideController.CheckCanGetTaskAward() ||
			AdventureGuideController.CheckCanGetFirstAward() ||
			AdventureGuideController.CheckCanGetDailyActivityAward()
		);
	}
	static CheckCanGetDailyActivityAward() {
		return ModelManager_1.ModelManager.DailyActivityModel.CheckIsRewardWaitTake();
	}
	static CheckCanGetFirstAward() {
		return !1;
	}
	static CheckCanGetFirstAwardById(e) {
		return !1;
	}
	static CheckCanGetFirstAwardByTypeId(e) {
		return !1;
	}
	static CheckCanGetTaskAward() {
		if (!ModelManager_1.ModelManager.FunctionModel.IsOpen(10023001)) return !1;
		var e = ModelManager_1.ModelManager.AdventureGuideModel.GetNowChapter();
		if (
			!(n = ModelManager_1.ModelManager.AdventureGuideModel.GetChapterTasks(e))
		)
			return !1;
		for (const e of n)
			if (e.Status === Protocol_1.Aki.Protocol.bBs.Proto_Finish) return !0;
		var n = ModelManager_1.ModelManager.AdventureGuideModel.GetChapterProgress(
				ModelManager_1.ModelManager.AdventureGuideModel.GetNowChapter(),
			),
			t = ModelManager_1.ModelManager.AdventureGuideModel.GetReceivedChapter();
		return n.Received === n.Total && e !== t;
	}
}
(exports.AdventureGuideController = AdventureGuideController),
	((_a = AdventureGuideController).B4e = (e, n) => {
		switch (e) {
			case 7:
				n ===
					ModelManager_1.ModelManager.AdventureGuideModel.GetDetectingMonsterMarkId() &&
					ModelManager_1.ModelManager.AdventureGuideModel.CleanCurTrackingMonster();
				break;
			case 6:
				n ===
					ModelManager_1.ModelManager.AdventureGuideModel.GetDetectingDungeonMarkId() &&
					ModelManager_1.ModelManager.AdventureGuideModel.CleanCurTrackingDungeon();
				break;
			case 19:
				n ===
					ModelManager_1.ModelManager.AdventureGuideModel.GetDetectingSilentAreaMarkId() &&
					ModelManager_1.ModelManager.AdventureGuideModel.CleanCurTrackingSilentArea();
		}
	}),
	(AdventureGuideController.OnTrackMapMark = (e, n, t) => {
		if (!t) {
			let t = !1;
			switch (e) {
				case 7:
					n ===
					ModelManager_1.ModelManager.AdventureGuideModel.GetDetectingMonsterMarkId()
						? (ModelManager_1.ModelManager.AdventureGuideModel.CleanCurTrackingMonster(),
							(t = !0))
						: n ===
								ModelManager_1.ModelManager.AdventureGuideModel.GetDetectingSilentAreaMarkId() &&
							(ModelManager_1.ModelManager.AdventureGuideModel.CleanCurTrackingSilentArea(),
							(t = !0));
					break;
				case 6:
					n ===
						ModelManager_1.ModelManager.AdventureGuideModel.GetDetectingDungeonMarkId() &&
						(ModelManager_1.ModelManager.AdventureGuideModel.CleanCurTrackingDungeon(),
						(t = !0));
					break;
				case 19:
					n ===
						ModelManager_1.ModelManager.AdventureGuideModel.GetDetectingSilentAreaMarkId() &&
						(ModelManager_1.ModelManager.AdventureGuideModel.CleanCurTrackingSilentArea(),
						(t = !0));
			}
			t && _a.CancelDetectingRequest();
		}
	}),
	(AdventureGuideController.V4e = (e) =>
		!!ModelManager_1.ModelManager.FunctionModel.IsOpen(10023) ||
		(ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
			"NoJumpTo",
		),
		!1)),
	(AdventureGuideController.OpenGuideView = (e, n = void 0, t = void 0) => {
		AdventureGuideController.RequestForAdventureManual(),
			UiManager_1.UiManager.IsViewShow("AdventureGuideView")
				? EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.ChangeChildView,
						e ?? "DailyActivityTabView",
						n,
					)
				: UiManager_1.UiManager.OpenView("AdventureGuideView", [e, n], t);
	}),
	(AdventureGuideController.w4e = () => {
		ModelManager_1.ModelManager.AdventureGuideModel.InitDetectionData();
	}),
	(AdventureGuideController.b4e = () => {
		EventSystem_1.EventSystem.Emit(
			EventDefine_1.EEventName.RedDotAdventureManualUpdate,
		);
	}),
	(AdventureGuideController.q4e = (e) => {
		for (const n of e.ggs) {
			ModelManager_1.ModelManager.AdventureGuideModel.SetNowChapter(n.hgs),
				ModelManager_1.ModelManager.AdventureGuideModel.SetReceivedChapter(
					n.lgs,
				);
			for (const e of n.ags)
				ModelManager_1.ModelManager.AdventureGuideModel.SetTaskById(
					e.Ekn,
					e.ckn,
					e.sgs,
				),
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.AdventureTaskStateChange,
						e.Ekn,
					);
		}
		EventSystem_1.EventSystem.Emit(
			EventDefine_1.EEventName.RedDotAdventureManualUpdate,
		);
	}),
	(AdventureGuideController.G4e = (e) => {
		ModelManager_1.ModelManager.AdventureGuideModel.HandleMonsterDetectLockStatus(
			e.pgs,
		);
	}),
	(AdventureGuideController.H4e = (e) => {
		ModelManager_1.ModelManager.AdventureGuideModel.UpdateByAdventureManualResponse(
			e,
		),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.RedDotAdventureManualUpdate,
			),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.RedDotSilentFirstAward,
			);
	}),
	(AdventureGuideController.W4e = (e) => {}),
	(AdventureGuideController.K4e = (e) => {
		e.Kms !== Protocol_1.Aki.Protocol.lkn.Sys
			? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
					e.Kms,
					23844,
				)
			: (Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("AdventureGuide", 5, "拾音辑录任务领奖返回", [
						"id",
						e.Ekn,
					]),
				(ModelManager_1.ModelManager.AdventureGuideModel.GetTaskRecordById(
					e.Ekn,
				).Status = Protocol_1.Aki.Protocol.bBs.Proto_Received),
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.AdventureTaskStateChange,
					e.Ekn,
				),
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("AdventureGuide", 5, "拾音辑录任务领奖红点刷新", [
						"id",
						e.Ekn,
					]),
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.RedDotAdventureManualUpdate,
				));
	}),
	(AdventureGuideController.Q4e = (e) => {
		for (const n of e?.Igs?.Egs)
			ModelManager_1.ModelManager.AdventureGuideModel?.GuideTypeUnLockMap.set(
				n,
				!0,
			);
		for (const n of e?.Igs?.ygs)
			ModelManager_1.ModelManager.AdventureGuideModel?.TypeUnLockMap.set(n, !0);
	}),
	(AdventureGuideController.X4e = (e) => {
		if (
			(Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"AdventureGuide",
					5,
					"收到探测请求响应消息 DetectionResponse",
				),
			e.Kms !== Protocol_1.Aki.Protocol.lkn.Sys)
		)
			ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
				e.Kms,
				29635,
			);
		else {
			var n = AdventureGuideController.$4e();
			switch (e.fgs[0]?.Ikn) {
				case Protocol_1.Aki.Protocol.d3n.Proto_NormalMonster:
					ModelManager_1.ModelManager.AdventureGuideModel.UpdatePendingMonsterList(
						e.fgs,
						e.g3n,
					),
						AdventureGuideController.Y4e(e.g3n, n);
					break;
				case Protocol_1.Aki.Protocol.d3n.Proto_Dungeon:
					ModelManager_1.ModelManager.AdventureGuideModel.UpdatePendingDungeonList(
						e.fgs,
						e.g3n,
					),
						AdventureGuideController.e5e(e.g3n, n);
					break;
				case Protocol_1.Aki.Protocol.d3n.Proto_SilentArea:
					ModelManager_1.ModelManager.AdventureGuideModel.UpdatePendingSilentAreaList(
						e.fgs,
						e.g3n,
					),
						AdventureGuideController.t5e(e.g3n, n);
			}
		}
	}),
	(AdventureGuideController.z4e = (e) => {
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug(
				"AdventureGuide",
				8,
				"普通怪物探测面板信息 DetectionResponse",
			),
			e.Kms !== Protocol_1.Aki.Protocol.lkn.Sys &&
				ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
					e.Kms,
					5732,
				),
			0 !== e.fgs.length &&
				ModelManager_1.ModelManager.AdventureGuideModel.SetDetectingMonsterRefreshTime(
					e.fgs[0].C3n,
					e.fgs[0].cgs,
				);
	}),
	(AdventureGuideController.O4e = (e) => {
		e &&
			(ModelManager_1.ModelManager.AdventureGuideModel.UpdateSilentFirstAwards(
				e.Ekn,
			),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.RedDotSilentFirstAward,
			),
			AdventureGuideController.EmitRedDotFirstAwardEvent(e.Ekn));
	}),
	(AdventureGuideController.k4e = (e) => {
		if (e)
			for (const n of e.Egs)
				ModelManager_1.ModelManager.AdventureGuideModel?.GuideTypeUnLockMap.set(
					n,
					!0,
				);
	}),
	(AdventureGuideController.F4e = (e) => {
		if (e)
			for (const n of e.ygs)
				ModelManager_1.ModelManager.AdventureGuideModel?.TypeUnLockMap.set(
					n,
					!0,
				);
	}),
	(AdventureGuideController.i5e = (e) => {
		e.Kms !== Protocol_1.Aki.Protocol.lkn.Sys
			? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
					e.Kms,
					14427,
				)
			: (EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.ChapterRewardReceived,
					e.v3n,
				),
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.RedDotAdventureManualUpdate,
				));
	}),
	(AdventureGuideController.N4e = (e) => {
		switch (e.fgs[0].Ikn) {
			case Protocol_1.Aki.Protocol.d3n.Proto_NormalMonster:
				var n = Protocol_1.Aki.Protocol.yjn.create({ xFn: e.fgs });
				Net_1.Net.Call(6214, n, (e) => {
					AdventureGuideController.o5e(e.fgs);
				});
				break;
			case Protocol_1.Aki.Protocol.d3n.Proto_SilentArea:
				AdventureGuideController.n5e(e.fgs);
				break;
			case Protocol_1.Aki.Protocol.d3n.Proto_Dungeon:
				AdventureGuideController.r5e(e.fgs);
		}
	}),
	(AdventureGuideController.J4e = (e) => {
		if (
			(AdventureGuideController.StopTrackCurDetectingDungeon(),
			AdventureGuideController.StopTrackCurDetectingMonster(),
			AdventureGuideController.StopTrackCurDetectingSilentArea(),
			e.Kms !== Protocol_1.Aki.Protocol.lkn.Sys)
		)
			return e.f3n.Ekn ===
				ModelManager_1.ModelManager.AdventureGuideModel.GetDetectingSilentAreaId()
				? void 0
				: void ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
						e.Kms,
						8872,
					);
		var n = e.f3n.Ekn,
			t = e.f3n.C3n;
		let r,
			o = 0,
			a = 6;
		switch ((e = e.f3n.Ikn)) {
			case Protocol_1.Aki.Protocol.d3n.Proto_NormalMonster:
				{
					AdventureGuideController.j4e(
						7,
						ModelManager_1.ModelManager.AdventureGuideModel.GetDetectingMonsterMarkId(),
					),
						ModelManager_1.ModelManager.AdventureGuideModel.GetCurDetectingMonsterConfId() !==
						t
							? ModelManager_1.ModelManager.AdventureGuideModel.SetCurDetectingMonsterConfId(
									t,
								)
							: Log_1.Log.CheckInfo() &&
								Log_1.Log.Info("AdventureGuide", 10, "追踪目标改变"),
						(r =
							ModelManager_1.ModelManager.AdventureGuideModel.GetMonsterPendingList().get(
								n,
							));
					var d =
						ModelManager_1.ModelManager.AdventureGuideModel.GetMonsterDetectData(
							t,
						);
					let e = !1;
					var i =
						7 ==
						(a = AdventureGuideController.Z4e(19, d.Conf.MarkId, !0)
							? ((e = !0), 19)
							: AdventureGuideController.Z4e(6, d.Conf.MarkId, !0)
								? ((e = !0), 6)
								: 7);
					(o = AdventureGuideController.s5e(r, d.Conf.MarkId, e, a, i)),
						ModelManager_1.ModelManager.AdventureGuideModel.SetCurDetectingMonsterMarkId(
							o,
						),
						ModelManager_1.ModelManager.AdventureGuideModel.SetDetectingMonsterId(
							n,
						);
				}
				break;
			case Protocol_1.Aki.Protocol.d3n.Proto_Dungeon:
				ModelManager_1.ModelManager.AdventureGuideModel.GetCurDetectingDungeonConfId() !==
					t &&
					ModelManager_1.ModelManager.AdventureGuideModel.SetCurDetectingDungeonConfId(
						t,
					),
					(r =
						ModelManager_1.ModelManager.AdventureGuideModel.GetDungeonPendingList().get(
							n,
						)),
					(d =
						ModelManager_1.ModelManager.AdventureGuideModel.GetSoundAreaDetectData(
							t,
						)),
					(i =
						ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetConfig(
							d.Conf.DungeonId,
						)),
					AdventureGuideController.Z4e(6, i.MarkId) &&
						((a = 6),
						(o = AdventureGuideController.s5e(r, i.MarkId, !0, a, !1)),
						ModelManager_1.ModelManager.AdventureGuideModel.SetDetectingDungeonMarkId(
							o,
						),
						ModelManager_1.ModelManager.AdventureGuideModel.SetDetectingDungeonId(
							n,
						));
				break;
			case Protocol_1.Aki.Protocol.d3n.Proto_SilentArea:
				ModelManager_1.ModelManager.AdventureGuideModel.GetCurDetectingSilentAreaConfId() !==
					t &&
					ModelManager_1.ModelManager.AdventureGuideModel.SetCurDetectingSilentAreaConfId(
						t,
					),
					(r =
						ModelManager_1.ModelManager.AdventureGuideModel.GetSilentAreaPendingList().get(
							n,
						)),
					(d =
						ModelManager_1.ModelManager.AdventureGuideModel.GetSilentAreaDetectData(
							t,
						)),
					(a = (i = AdventureGuideController.Z4e(19, d.Conf.MarkId)) ? 19 : 7),
					(o = AdventureGuideController.s5e(r, d.Conf.MarkId, i, a, !i)),
					ModelManager_1.ModelManager.AdventureGuideModel.SetDetectingSilentAreaMarkId(
						o,
						a,
					),
					ModelManager_1.ModelManager.AdventureGuideModel.SetDetectingSilentAreaId(
						n,
					);
		}
		EventSystem_1.EventSystem.Emit(
			EventDefine_1.EEventName.DetectSuccess,
			t,
			e,
		),
			ModelManager_1.ModelManager.AdventureGuideModel.GetIsFromManualDetect() &&
				(ModelManager_1.ModelManager.AdventureGuideModel.SetFromManualDetect(
					!1,
				),
				(e = { MarkId: o, MarkType: a, OpenAreaId: 0, IsNotFocusTween: !0 }),
				WorldMapController_1.WorldMapController.OpenView(2, !1, e));
	});
const silentAreasSortFunc = (e, n) =>
		e.Conf.DangerType !== n.Conf.DangerType
			? n.Conf.DangerType - e.Conf.DangerType
			: e.Conf.Secondary !== n.Conf.Secondary
				? n.Conf.Secondary - e.Conf.Secondary
				: e.Conf.Id - n.Conf.Id,
	monsterSortFunc =
		((exports.silentAreasSortFunc = silentAreasSortFunc),
		(e, n) =>
			e.Conf.DangerType !== n.Conf.DangerType
				? n.Conf.DangerType - e.Conf.DangerType
				: e.Conf.TypeDescription2 !== n.Conf.TypeDescription2
					? n.Conf.TypeDescription2 - e.Conf.TypeDescription2
					: n.Conf.Id - e.Conf.Id);
exports.monsterSortFunc = monsterSortFunc;
