"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LogController = void 0);
const Json_1 = require("../../../Core/Common/Json"),
	Log_1 = require("../../../Core/Common/Log"),
	Stats_1 = require("../../../Core/Common/Stats"),
	Time_1 = require("../../../Core/Common/Time"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
	Net_1 = require("../../../Core/Net/Net"),
	TickSystem_1 = require("../../../Core/Tick/TickSystem"),
	Global_1 = require("../../Global"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	FormationDataController_1 = require("../../Module/Abilities/FormationDataController"),
	LogReportController_1 = require("../../Module/LogReport/LogReportController"),
	LogReportDefine_1 = require("../../Module/LogReport/LogReportDefine"),
	CharacterGasDebugComponent_1 = require("../../NewWorld/Character/Common/Component/Abilities/CharacterGasDebugComponent"),
	LOG_SWITCH = !1,
	FRAMING_LOG_NUM = 20;
class DebugInfo extends Json_1.JsonObjBase {
	constructor(o, e, r, t, a, l, n, i, g, s, C) {
		super(),
			(this.场景模式 = o),
			(this.是否场景主 = e),
			(this.场景号 = r),
			(this.时间流速 = t),
			(this.玩家Id = a),
			(this.玩家位置 = l),
			(this.是否联机 = n),
			(this.编队玩家 = i),
			(this.队伍buff = g),
			(this.队伍属性 = s),
			(this.编队角色 = C);
	}
}
class LogController extends ControllerBase_1.ControllerBase {
	static OnInit() {
		return Net_1.Net.Register(27316, this.oTn), !0;
	}
	static OnClear() {
		return Net_1.Net.UnRegister(27316), !0;
	}
	static O0r(o) {
		LogController.k0r === TickSystem_1.TickSystem.InvalidId &&
			(LogController.k0r = TickSystem_1.TickSystem.Add(
				LogController.F0r,
				"LogReportFraming",
				2,
			).Id),
			this.V0r.push(o);
	}
	static LogBattleStartPush(o, e = !1) {
		e ? this.O0r(o) : LogReportController_1.LogReportController.LogReport(o);
	}
	static LogBattleEndPush(o, e = !1) {
		e ? this.O0r(o) : LogReportController_1.LogReportController.LogReport(o);
	}
	static LogSingleCharacterStatusPush(o, e = !1) {
		e ? this.O0r(o) : LogReportController_1.LogReportController.LogReport(o);
	}
	static LogSingleMonsterStatusPush(o, e = !1) {
		e ? this.O0r(o) : LogReportController_1.LogReportController.LogReport(o);
	}
	static LogCharacterDeathPush(o, e, r = !1) {
		var t,
			a = new LogReportDefine_1.DeathRecord();
		(a.i_area_id = ModelManager_1.ModelManager.AreaModel.AreaInfo.AreaId),
			(a.i_area_level = ModelManager_1.ModelManager.AreaModel.AreaInfo.Level),
			Global_1.Global.BaseCharacter
				? ((t = Global_1.Global.BaseCharacter.K2_GetActorLocation()),
					(a.f_x = t.X),
					(a.f_y = t.Y),
					(a.f_z = t.Z),
					(a.i_death_reason = e),
					(a.i_death_role_id = o),
					r
						? this.O0r(a)
						: LogReportController_1.LogReportController.LogReport(a))
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Battle",
						4,
						"日志上报-单机大世界死亡，当前不存在Global.BaseCharacter",
						["roleId", o],
					);
	}
	static LogRoleSkillReportPush(o, e, r = !1) {
		(o.s_reports = Json_1.Json.Stringify(e)),
			r ? this.O0r(o) : LogReportController_1.LogReportController.LogReport(o);
	}
	static LogMonsterSkillReportPush(o, e, r = !1) {
		(o.s_reports = Json_1.Json.Stringify(e)),
			r ? this.O0r(o) : LogReportController_1.LogReportController.LogReport(o);
	}
	static LogDoubleBallReport(o, e, r = !1) {
		(o.s_reports = Json_1.Json.Stringify(Array.from(e.values()))),
			r ? this.O0r(o) : LogReportController_1.LogReportController.LogReport(o);
	}
	static LogTriggerBuffDamagePush(o) {
		var e = new LogReportDefine_1.TriggerBuffDamageRecord();
		(e.i_area_id = o.AreaId.toString()),
			(e.s_buff_id = o.BuffId.toString()),
			(e.f_time = o.TimeStamp.toFixed(2)),
			(e.f_player_pos_x = o.Location.X.toFixed(2)),
			(e.f_player_pos_y = o.Location.Y.toFixed(2)),
			(e.f_player_pos_z = o.Location.Z.toFixed(2)),
			(e.i_damage = o.Damage.toString()),
			LogReportController_1.LogReportController.LogReport(e);
	}
	static LogElevatorUsedPush(o) {
		LogReportController_1.LogReportController.LogReport(o);
	}
	static LogInstFightStartPush(o) {
		LogReportController_1.LogReportController.LogReport(o);
	}
	static LogInstFightEndPush(o) {
		LogReportController_1.LogReportController.LogReport(o);
	}
	static OutputDebugInfo() {
		var o = new DebugInfo(
			Protocol_1.Aki.Protocol.sOs[
				ModelManager_1.ModelManager.GameModeModel.InstanceType
			],
			ModelManager_1.ModelManager.OnlineModel.GetIsMyTeam(),
			ModelManager_1.ModelManager.GameModeModel.InstanceDungeon.MapConfigId,
			Time_1.Time.TimeDilation,
			ModelManager_1.ModelManager.CreatureModel.GetPlayerId(),
			[
				Global_1.Global.BaseCharacter.CharacterActorComponent.ActorLocationProxy.X.toFixed(
					2,
				),
				Global_1.Global.BaseCharacter.CharacterActorComponent.ActorLocationProxy.Y.toFixed(
					2,
				),
				Global_1.Global.BaseCharacter.CharacterActorComponent.ActorLocationProxy.Z.toFixed(
					2,
				),
			],
			ModelManager_1.ModelManager.GameModeModel.IsMulti,
			ModelManager_1.ModelManager.OnlineModel.GetAllWorldTeamPlayer(),
			FormationDataController_1.FormationDataController.GetPlayerEntity(
				ModelManager_1.ModelManager.CreatureModel.GetPlayerId(),
			)
				.GetComponent(180)
				.GetAllBuffs()
				.map((o) => String(o.Id)),
			CharacterGasDebugComponent_1.CharacterGasDebugComponent.GetFormationAttributeDebugStrings()
				.replace(/\n/g, ",")
				.replace(/\s/g, ""),
			ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems().map((o) => ({
				EntityHandleId: o.EntityHandle?.Id,
				ConfigId: o.GetConfigId,
				IsMyRole: o.IsMyRole(),
				IsControl: o.IsControl(),
				IsDead: o.IsDead(),
			})),
		);
		let e = Json_1.Json.Stringify(o);
		return (
			ModelManager_1.ModelManager.CreatureModel.GetAllEntities().forEach(
				(o) => {
					var r,
						t,
						a,
						l = o.Entity?.GetComponent(3),
						n = o.Entity?.GetComponent(187);
					l &&
						n &&
						((r = o.Entity?.GetComponent(0)),
						(t = o.Entity?.GetComponent(185)),
						(a = o.Entity?.GetComponent(89)),
						(e +=
							`\n***********\n实体信息: EntityHandleId: ${o.Id}, CreatureDataId: ${r?.GetCreatureDataId()}, PbDataId: ${r?.GetPbDataId()}, Type: ${r?.GetEntityType()}, 位置: ${[l?.ActorLocationProxy.X.toFixed(2), l?.ActorLocationProxy.Y.toFixed(2), l?.ActorLocationProxy.Z.toFixed(2)]}, IsInFighting: ${a?.IsInFighting}\nBuff信息: ${n?.GetAllBuffs().map((o) => o.Id)}\nTag信息: ` +
							t?.TagContainer.GetExactTagsDebugString()
								.replace(/\n/g, ",")
								.replace(/\s/g, "")));
				},
			),
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("Battle", 29, "本地打印关键信息快照:\n" + e),
			e
		);
	}
	static RequestOutputDebugInfo() {
		var o = new Protocol_1.Aki.Protocol.Debug.NXn();
		(o.X7n = LogController.OutputDebugInfo()),
			Net_1.Net.Call(20558, o, (o) => {
				o &&
					Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("Log", 38, "[Debug]服务器端战斗状态信息打印");
			});
	}
}
((exports.LogController = LogController).k0r =
	TickSystem_1.TickSystem.InvalidId),
	(LogController.V0r = new Array()),
	(LogController.H0r = 20),
	(LogController.j0r = void 0),
	(LogController.F0r = () => {
		var o = LogController.H0r;
		let e = 0,
			r = LogController.V0r.shift();
		for (; e < o && r; )
			LogReportController_1.LogReportController.LogReport(r),
				(e += 1),
				(r = LogController.V0r.shift());
		0 === LogController.V0r.length &&
			(TickSystem_1.TickSystem.Remove(LogController.k0r),
			(LogController.k0r = TickSystem_1.TickSystem.InvalidId));
	}),
	(LogController.oTn = (o) => {
		LogController.RequestOutputDebugInfo();
	});
