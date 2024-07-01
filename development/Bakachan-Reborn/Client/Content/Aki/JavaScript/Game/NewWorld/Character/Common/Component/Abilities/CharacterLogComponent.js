"use strict";
var CharacterLogComponent_1,
	__decorate =
		(this && this.__decorate) ||
		function (e, t, r, a) {
			var o,
				n = arguments.length,
				i =
					n < 3
						? t
						: null === a
							? (a = Object.getOwnPropertyDescriptor(t, r))
							: a;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
				i = Reflect.decorate(e, t, r, a);
			else
				for (var s = e.length - 1; 0 <= s; s--)
					(o = e[s]) &&
						(i = (n < 3 ? o(i) : 3 < n ? o(t, r, i) : o(t, r)) || i);
			return 3 < n && i && Object.defineProperty(t, r, i), i;
		};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CharacterLogComponent = void 0);
const Log_1 = require("../../../../../../Core/Common/Log"),
	Stats_1 = require("../../../../../../Core/Common/Stats"),
	Protocol_1 = require("../../../../../../Core/Define/Net/Protocol"),
	EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent"),
	EntitySystem_1 = require("../../../../../../Core/Entity/EntitySystem"),
	RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent"),
	EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
	TimeUtil_1 = require("../../../../../Common/TimeUtil"),
	ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../../../Manager/ModelManager"),
	LogReportDefine_1 = require("../../../../../Module/LogReport/LogReportDefine"),
	LogController_1 = require("../../../../../World/Controller/LogController"),
	CharacterAttributeTypes_1 = require("./CharacterAttributeTypes"),
	CharacterDamageCalculations_1 = require("./CharacterDamageCalculations"),
	CharacterUnifiedStateTypes_1 = require("./CharacterUnifiedStateTypes"),
	ATK_RATIO = 1.4,
	SKILLLEVEL_CONST = 0.111111,
	RESONANT_CONST = 0.041667;
let CharacterLogComponent = (CharacterLogComponent_1 = class extends (
	EntityComponent_1.EntityComponent
) {
	constructor() {
		super(...arguments),
			(this.sNr = void 0),
			(this.aNr = []),
			(this.OnAggroChanged = (e, t) => {
				var r, a, o;
				ModelManager_1.ModelManager.GameModeModel.IsMulti ||
					((r = t.CharActorComp.Entity.Id),
					(t = t.CharActorComp.Entity),
					(a = CharacterLogComponent_1.hNr),
					(o = CharacterLogComponent_1.lNr),
					this.rje(r)
						? e
							? (a.add(r),
								CharacterLogComponent_1._Nr.set(r, this.uNr(r)),
								o.has(r) ||
									(((e = CharacterLogComponent_1.cNr(r)).i_monster_level =
										t
											.GetComponent(156)
											?.GetCurrentValue(
												CharacterAttributeTypes_1.EAttributeId.Proto_Lv,
											) ?? 0),
									(t = t.GetComponent(3)?.ActorLocationProxy),
									(e.f_pos_x = t.X),
									(e.f_pos_y = t.Y),
									(e.f_pos_z = t.Z),
									(e.InitTime = TimeUtil_1.TimeUtil.GetServerTime())),
								o.add(r))
							: (CharacterLogComponent_1.mNr.add(r), a.delete(r))
						: a.delete(r));
			}),
			(this.dNr = (e, t) => {
				CharacterLogComponent_1.CNr() && (CharacterLogComponent_1.gNr += e),
					t && (this.fNr = 2);
			}),
			(this.pNr = (e) => {
				e && (this.fNr = 3);
			}),
			(this.vNr = (e, t, r) => {
				if (CharacterLogComponent_1.CNr()) {
					switch (r) {
						case 6:
						case 11:
							(CharacterLogComponent_1.MNr += 1),
								(CharacterLogComponent_1.SNr.i_acc_dodge_times += 1);
							break;
						case 7:
							(CharacterLogComponent_1.ENr += 1),
								(CharacterLogComponent_1.SNr.i_dodge_succ_times += 1);
							break;
						case 4:
							CharacterLogComponent_1.yNr += 1;
					}
					var a = this.Entity.GetComponent(0);
					if (a.IsRole()) {
						var o = CharacterLogComponent_1.INr(this.Entity.Id, t),
							n =
								(o.use_count++,
								(o.skill_type = r),
								CharacterLogComponent_1.TNr(this.Entity.Id));
						switch (r) {
							case 6:
							case 11:
								n.i_acc_dodge_times += 1;
								break;
							case 7:
								n.i_dodge_succ_times += 1;
						}
					} else
						a.IsMonster() &&
							CharacterLogComponent_1.LNr(this.Entity.Id, Number(t))
								.use_count++;
					(o = this.Entity.Id.toFixed() + "-" + t),
						CharacterLogComponent_1.DNr.set(o, !1);
				}
			}),
			(this.RNr = (e, t) => {
				CharacterLogComponent_1.CNr() &&
					(CharacterLogComponent_1.TNr(this.Entity.Id).i_bullet_rebound_times++,
					CharacterLogComponent_1.cNr(e.Id).i_bullet_rebound_times++,
					CharacterLogComponent_1.LNr(e.Id, t).bullet_rebound_times++,
					CharacterLogComponent_1.ANr++,
					CharacterLogComponent_1.SNr.i_bullet_rebound_times++);
			}),
			(this.UNr = (e, t, r) => {
				CharacterLogComponent_1.CNr() &&
					r < t &&
					(CharacterLogComponent_1.TNr(this.Entity.Id).l_acc_element += t - r);
			}),
			(this.PNr = (e, t, r) => {
				CharacterLogComponent_1.CNr() &&
					e === CharacterAttributeTypes_1.EAttributeId.Proto_Energy &&
					r < t &&
					(((e = CharacterLogComponent_1.TNr(this.Entity.Id)).l_acc_energy +=
						t - r),
					t >=
						this.Entity.GetComponent(156).GetCurrentValue(
							CharacterAttributeTypes_1.EAttributeId.Proto_EnergyMax,
						) -
							Number.EPSILON) &&
					e.i_full_energy_times++;
			}),
			(this.hUe = () => {
				this.Entity.GetComponent(158)?.IsInFightState() &&
					CharacterLogComponent_1.xNr();
			}),
			(this.EYe = (e, t) => {
				this.Entity.GetComponent(158)?.IsInFightState() &&
					CharacterLogComponent_1.xNr();
			}),
			(this.wNr = () => {
				CharacterLogComponent_1.CNr() &&
					(this.Entity.GetComponent(0).IsRole() &&
						((CharacterLogComponent_1.BNr += 1),
						(CharacterLogComponent_1.TNr(this.Entity.Id).i_revive_times += 1)),
					CharacterLogComponent_1.SNr.i_revive_times++);
			}),
			(this.bNr = (e, t, r) => {
				(r -= t) <= 0 ||
					((t = CharacterLogComponent_1.cNr(this.Entity.Id)) &&
						((t.l_acc_rage += r),
						this.Entity.GetComponent(51)?.IsTriggerCounterAttack) &&
						(t.l_acc_rage_counter += r));
			}),
			(this.fNr = 0),
			(this.qNr = (e, t) => {
				CharacterLogComponent_1.CNr() &&
					t &&
					CharacterLogComponent_1.cNr(this.Entity.Id).i_paralysis_times++;
			});
	}
	OnStart() {
		return (
			CharacterLogComponent_1.GNr ||
				((CharacterLogComponent_1.GNr = !0),
				EventSystem_1.EventSystem.Add(
					EventDefine_1.EEventName.OnBattleStateChanged,
					CharacterLogComponent_1.NNr,
				),
				EventSystem_1.EventSystem.Add(
					EventDefine_1.EEventName.OnChangeRole,
					CharacterLogComponent_1.ONr,
				),
				EventSystem_1.EventSystem.Add(
					EventDefine_1.EEventName.CharRecordTeamDeath,
					CharacterLogComponent_1.kNr,
				),
				EventSystem_1.EventSystem.Add(
					EventDefine_1.EEventName.CharOnRoleDead,
					CharacterLogComponent_1.FNr,
				),
				EventSystem_1.EventSystem.Add(
					EventDefine_1.EEventName.WorldDone,
					CharacterLogComponent_1.VNr,
				),
				EventSystem_1.EventSystem.Add(
					EventDefine_1.EEventName.LeaveInstanceDungeon,
					CharacterLogComponent_1.HNr,
				),
				EventSystem_1.EventSystem.Add(
					EventDefine_1.EEventName.TriggerUiTimeDilation,
					CharacterLogComponent_1.jNr,
				),
				EventSystem_1.EventSystem.Add(
					EventDefine_1.EEventName.OnInstResultNotify,
					CharacterLogComponent_1.WNr,
				),
				EventSystem_1.EventSystem.Add(
					EventDefine_1.EEventName.OnTowerChallengeChangeTeamNotify,
					CharacterLogComponent_1.KNr,
				)),
			this.QNr(),
			!0
		);
	}
	OnEnd() {
		return this.XNr(), !0;
	}
	QNr() {
		EventSystem_1.EventSystem.AddWithTarget(
			this.Entity,
			EventDefine_1.EEventName.AiHateAddOrRemove,
			this.OnAggroChanged,
		),
			(this.sNr = this.Entity.CheckGetComponent(185).ListenForTagAddOrRemove(
				1922078392,
				this.qNr,
			)),
			EventSystem_1.EventSystem.AddWithTarget(
				this.Entity,
				EventDefine_1.EEventName.CharRecordOperate,
				this.vNr,
			);
		var e = this.Entity.GetComponent(0);
		e.IsRole()
			? (EventSystem_1.EventSystem.AddWithTarget(
					this.Entity,
					EventDefine_1.EEventName.CharOnFallInjure,
					this.dNr,
				),
				EventSystem_1.EventSystem.AddWithTarget(
					this.Entity,
					EventDefine_1.EEventName.CharOnRoleDrownInjure,
					this.pNr,
				),
				EventSystem_1.EventSystem.AddWithTarget(
					this.Entity,
					EventDefine_1.EEventName.CharOnRevive,
					this.wNr,
				),
				EventSystem_1.EventSystem.AddWithTarget(
					this.Entity,
					EventDefine_1.EEventName.BulletRebound,
					this.RNr,
				),
				EventSystem_1.EventSystem.AddWithTarget(
					this.Entity,
					EventDefine_1.EEventName.CharOnElementEnergyChanged,
					this.UNr,
				),
				EventSystem_1.EventSystem.AddWithTarget(
					this.Entity,
					EventDefine_1.EEventName.CharOnEnergyChanged,
					this.PNr,
				),
				EventSystem_1.EventSystem.AddWithTarget(
					this.Entity,
					EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged,
					this.hUe,
				),
				this.aNr.push(
					this.Entity.CheckGetComponent(185).ListenForTagAddOrRemove(
						-1371021686,
						this.EYe,
					),
				),
				this.aNr.push(
					this.Entity.CheckGetComponent(185).ListenForTagAddOrRemove(
						-1800191060,
						this.EYe,
					),
				),
				this.aNr.push(
					this.Entity.CheckGetComponent(185).ListenForTagAddOrRemove(
						-1221493771,
						this.EYe,
					),
				))
			: e.IsMonster() &&
				this.Entity.GetComponent(156)?.AddListener(
					CharacterAttributeTypes_1.EAttributeId.Proto_Rage,
					this.bNr,
				);
	}
	XNr() {
		EventSystem_1.EventSystem.RemoveWithTarget(
			this.Entity,
			EventDefine_1.EEventName.AiHateAddOrRemove,
			this.OnAggroChanged,
		),
			this.sNr.EndTask(),
			EventSystem_1.EventSystem.RemoveWithTarget(
				this.Entity,
				EventDefine_1.EEventName.CharRecordOperate,
				this.vNr,
			);
		var e = this.Entity.GetComponent(0);
		if (e.IsRole()) {
			EventSystem_1.EventSystem.RemoveWithTarget(
				this.Entity,
				EventDefine_1.EEventName.CharOnFallInjure,
				this.dNr,
			),
				EventSystem_1.EventSystem.RemoveWithTarget(
					this.Entity,
					EventDefine_1.EEventName.CharOnRoleDrownInjure,
					this.pNr,
				),
				EventSystem_1.EventSystem.RemoveWithTarget(
					this.Entity,
					EventDefine_1.EEventName.CharOnRevive,
					this.wNr,
				),
				EventSystem_1.EventSystem.RemoveWithTarget(
					this.Entity,
					EventDefine_1.EEventName.BulletRebound,
					this.RNr,
				),
				EventSystem_1.EventSystem.RemoveWithTarget(
					this.Entity,
					EventDefine_1.EEventName.CharOnElementEnergyChanged,
					this.UNr,
				),
				EventSystem_1.EventSystem.RemoveWithTarget(
					this.Entity,
					EventDefine_1.EEventName.CharOnEnergyChanged,
					this.PNr,
				),
				EventSystem_1.EventSystem.RemoveWithTarget(
					this.Entity,
					EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged,
					this.hUe,
				);
			for (const e of this.aNr) e.EndTask();
			this.aNr.length = 0;
		} else if (e.IsMonster()) {
			this.Entity.GetComponent(156)?.RemoveListener(
				CharacterAttributeTypes_1.EAttributeId.Proto_Rage,
				this.bNr,
			);
			for (const e of this.aNr) e.EndTask();
			this.aNr.length = 0;
		}
	}
	static CNr() {
		return (
			!ModelManager_1.ModelManager.GameModeModel.IsMulti &&
			!this.$Nr() &&
			0 < this.c9
		);
	}
	static $Nr() {
		var e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
			ModelManager_1.ModelManager.CreatureModel.GetInstanceId(),
		).FightFormationId;
		return (
			0 <
			(ConfigManager_1.ConfigManager.EditBattleTeamConfig.GetFightFormationConfig(
				e,
			)?.TrialRole?.length ?? 0)
		);
	}
	uNr(e) {
		var t;
		if ((e = EntitySystem_1.EntitySystem.Get(e)))
			return (
				(t = new LogReportDefine_1.MonsterInfoLogData(void 0)),
				(e = e.GetComponent(0)),
				(t.pbdata_id = e.GetPbDataId()),
				(t.config_type = e.GetEntityConfigType()),
				t
			);
	}
	rje(e) {
		return (
			!!(e = EntitySystem_1.EntitySystem.Get(e)) &&
			"Monster" ===
				(e.GetComponent(3)?.CreatureData).GetBaseInfo()?.Category.MainType
		);
	}
	YNr() {
		var e = this.Entity.GetComponent(185);
		return e.HasTag(-1800191060) || e.HasTag(-1221493771)
			? 7
			: e.HasTag(-1371021686)
				? 6
				: void 0;
	}
	JNr() {
		switch (this.Entity.GetComponent(158).MoveState) {
			case CharacterUnifiedStateTypes_1.ECharMoveState.Walk:
			case CharacterUnifiedStateTypes_1.ECharMoveState.WalkStop:
			case CharacterUnifiedStateTypes_1.ECharMoveState.Run:
			case CharacterUnifiedStateTypes_1.ECharMoveState.RunStop:
			case CharacterUnifiedStateTypes_1.ECharMoveState.Sprint:
			case CharacterUnifiedStateTypes_1.ECharMoveState.SprintStop:
			case CharacterUnifiedStateTypes_1.ECharMoveState.LandRoll:
				return 1;
			case CharacterUnifiedStateTypes_1.ECharMoveState.NormalClimb:
			case CharacterUnifiedStateTypes_1.ECharMoveState.FastClimb:
				return 4;
			case CharacterUnifiedStateTypes_1.ECharMoveState.FastSwim:
			case CharacterUnifiedStateTypes_1.ECharMoveState.NormalSwim:
				return 2;
			case CharacterUnifiedStateTypes_1.ECharMoveState.Glide:
				return 3;
			case CharacterUnifiedStateTypes_1.ECharMoveState.Captured:
			case CharacterUnifiedStateTypes_1.ECharMoveState.HeavyKnock:
			case CharacterUnifiedStateTypes_1.ECharMoveState.KnockDown:
			case CharacterUnifiedStateTypes_1.ECharMoveState.KnockUp:
			case CharacterUnifiedStateTypes_1.ECharMoveState.Parry:
				return 5;
			default:
				return 0;
		}
	}
	static zNr() {
		if (void 0 === this.CurrentEntity)
			for (const e of this.ZNr.values())
				if (e.Entity.GetComponent(158)?.IsInFightState()) {
					this.CurrentEntity = e;
					break;
				}
		var e, t;
		return this.CurrentEntity
			? void 0 !== (t = (e = this.CurrentEntity.Entity.GetComponent(21))?.YNr())
				? t
				: e?.JNr() ?? 0
			: 0;
	}
	static eOr() {
		var e =
				(((e = this.tOr).i_move_duration = 0),
				(e.i_swim_duration = 0),
				(e.i_glide_duration = 0),
				(e.i_climb_duration = 0),
				(e.i_behit_duration = 0),
				(e.i_skill_duration = 0),
				(e.i_dash_duration = 0),
				(e.i_other_duration = 0),
				this.zNr()),
			t = TimeUtil_1.TimeUtil.GetServerTime();
		this.iOr = { State: e, StartTime: t };
	}
	static xNr() {
		var e = TimeUtil_1.TimeUtil.GetServerTime(),
			t = this.zNr(),
			r = this.tOr;
		if (void 0 === this.iOr)
			(this.iOr = { State: t, StartTime: e }),
				0 < this.oOr && (r.i_other_duration += e - this.oOr);
		else {
			var a = this.iOr,
				o = this.SNr,
				n = e - a.StartTime;
			switch (a.State) {
				case 1:
					(r.i_move_duration += n), (o.i_move_duration += n);
					break;
				case 2:
					(r.i_swim_duration += n), (o.i_swim_duration += n);
					break;
				case 3:
					(r.i_glide_duration += n), (o.i_glide_duration += n);
					break;
				case 4:
					(r.i_climb_duration += n), (o.i_climb_duration += n);
					break;
				case 5:
					(r.i_behit_duration += n), (o.i_behit_duration += n);
					break;
				case 6:
					(r.i_skill_duration += n), (o.i_skill_duration += n);
					break;
				case 7:
					(r.i_dash_duration += n), (o.i_dash_duration += n);
					break;
				default:
					(r.i_other_duration += n), (o.i_other_duration += n);
			}
			(a.State = t), (a.StartTime = e);
		}
	}
	static rOr(e) {
		return e?.Valid && (e = e.GetComponent(0))?.Valid ? e.GetRoleId() : -1;
	}
	static get ZNr() {
		return ModelManager_1.ModelManager.SceneTeamModel.GetTeamEntities(!0);
	}
	static nOr() {
		(this.c9 = 0),
			(this.sOr = 0),
			(this.BNr = 0),
			(this.aOr = 0),
			(this.gNr = 0),
			(this.hOr = 0),
			(this.lOr = 0),
			(this._Or = 0),
			(this.uOr = 0),
			(this.MNr = 0),
			(this.ENr = 0),
			(this.cOr = 0),
			(this.mOr = 0),
			(this.dOr = 0),
			(this.yNr = 0),
			(this.oOr = 0),
			(this.COr = 0),
			(this.gOr = 0),
			(this.ANr = 0),
			(this.iOr = void 0),
			(this.tOr.s_monster_hate.length = 0),
			(this.tOr.s_death_monster.length = 0),
			(this.tOr.s_run_monster.length = 0),
			(this.tOr.s_team_character.length = 0),
			(this.tOr.s_team_hp_per.length = 0),
			(this.tOr.i_move_duration = 0),
			(this.tOr.i_swim_duration = 0),
			(this.tOr.i_glide_duration = 0),
			(this.tOr.i_climb_duration = 0),
			(this.tOr.i_behit_duration = 0),
			(this.tOr.i_skill_duration = 0),
			(this.tOr.i_dash_duration = 0),
			(this.tOr.i_other_duration = 0),
			this.hNr.clear(),
			this.lNr.clear(),
			this.fOr.clear(),
			this.mNr.clear(),
			this._Nr.clear(),
			this.DNr.clear();
	}
	static TNr(e) {
		let t = this.pOr.get(e);
		return (
			t ||
				(EntitySystem_1.EntitySystem.Get(e)?.GetComponent(0)?.GetRoleId()
					? (t = this.vOr(e)) && this.pOr.set(e, t)
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error("Battle", 20, "无法获取entity的config Id", [
							"entityId",
							e,
						])),
			t
		);
	}
	static MOr() {
		var e = this.ZNr,
			t = new Array();
		for (const a of e) {
			var r = this.TNr(a.Id);
			t.push(r.i_role_id);
		}
		return t.toString();
	}
	static INr(e, t) {
		var r = e.toFixed() + "-" + t.toFixed();
		let a = this.SOr.get(r);
		if (!a) {
			(a = new LogReportDefine_1.RoleSkillRecord(t)), this.SOr.set(r, a);
			let o = this.EOr.get(e),
				n =
					(o || ((o = new Array()), this.EOr.set(e, o)),
					o.push(a),
					this.yOr.get(e));
			n ||
				((t = this.rOr(EntitySystem_1.EntitySystem.Get(e))),
				(r = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(t)),
				((n = this.IOr()
					? new LogReportDefine_1.InstRoleSkillReportLog(
							ModelManager_1.ModelManager.InstanceDungeonEntranceModel
								.InstanceId,
							ModelManager_1.ModelManager.CreatureModel.GetSceneId(),
						)
					: new LogReportDefine_1.RoleSkillReportLog()).s_battle_id =
					(ModelManager_1.ModelManager.PlayerInfoModel.GetId()?.toString() ??
						"0") +
					"_" +
					String(this.c9)),
				(n.i_role_id = t),
				(n.i_role_level = r.GetLevelData()?.GetLevel()),
				(n.i_role_quality = r.GetQualityConfig().Id),
				this.yOr.set(e, n));
		}
		return a;
	}
	static cNr(e) {
		let t = this.TOr.get(e);
		var r, a;
		return (
			t ||
				((a = EntitySystem_1.EntitySystem.Get(e)) &&
					((r = a.GetComponent(0)),
					((t = this.IOr()
						? new LogReportDefine_1.InstMonsterStateRecord(
								r.GetPbDataId(),
								r.EntityPbModelConfigId,
								ModelManager_1.ModelManager.InstanceDungeonEntranceModel
									.InstanceId,
								ModelManager_1.ModelManager.CreatureModel.GetSceneId(),
							)
						: new LogReportDefine_1.MonsterStateRecord(
								r.GetPbDataId(),
								r.EntityPbModelConfigId,
							)).s_battle_id =
						(ModelManager_1.ModelManager.PlayerInfoModel.GetId()?.toString() ??
							"0") +
						"_" +
						String(this.c9)),
					(t.i_monster_score = this.LOr(e)),
					(r = a.GetComponent(0).GetPbDataId()),
					"Quest" ===
					(a = ModelManager_1.ModelManager.CreatureModel.GetEntityOwner(
						ModelManager_1.ModelManager.GameModeModel.MapConfig.MapId,
						r,
					))?.Type
						? (t.i_from_quest = a.QuestId)
						: "LevelPlay" === a?.Type && (t.i_from_play = a.LevelPlayId),
					this.TOr.set(e, t))),
			t
		);
	}
	static LNr(e, t) {
		var r = e.toFixed() + "-" + t.toFixed();
		let a = this.DOr.get(r);
		if (!a) {
			(a = new LogReportDefine_1.MonsterSkillRecord(t)), this.DOr.set(r, a);
			let o = this.ROr.get(e),
				n =
					(o || ((o = new Array()), this.ROr.set(e, o)),
					o.push(a),
					this.AOr.get(e));
			n ||
				((r = (t = EntitySystem_1.EntitySystem.Get(e)).GetComponent(0)),
				((n = this.IOr()
					? new LogReportDefine_1.InstMonsterSkillReportLog(
							r.GetPbDataId(),
							r.EntityPbModelConfigId,
							ModelManager_1.ModelManager.InstanceDungeonEntranceModel
								.InstanceId,
							ModelManager_1.ModelManager.CreatureModel.GetSceneId(),
						)
					: new LogReportDefine_1.MonsterSkillReportLog(
							r.GetPbDataId(),
							r.EntityPbModelConfigId,
						)).s_battle_id =
					(ModelManager_1.ModelManager.PlayerInfoModel.GetId()?.toString() ??
						"0") +
					"_" +
					String(this.c9)),
				(n.i_monster_level =
					t
						.GetComponent(156)
						?.GetCurrentValue(
							CharacterAttributeTypes_1.EAttributeId.Proto_Lv,
						) ?? 0),
				this.AOr.set(e, n));
		}
		return a;
	}
	static UOr() {
		if (
			!(
				0 < this.c9 ||
				this.IOr() ||
				((this.c9 = Math.floor(TimeUtil_1.TimeUtil.GetServerTime())),
				this.c9 <= 0)
			)
		) {
			var e = (t =
					ModelManager_1.ModelManager.SceneTeamModel
						.GetCurrentEntity).Entity.GetComponent(3),
				t =
					((this.oOr = TimeUtil_1.TimeUtil.GetServerTime()),
					this.eOr(),
					t?.Valid &&
						(((t = this.TNr(t.Id)).LastGoToBattleTimePoint =
							TimeUtil_1.TimeUtil.GetServerTime()),
						t.i_enter_times++),
					this.ZNr),
				r = new Array(),
				a = new Array();
			for (const e of t) {
				var o = this.TNr(e.Id),
					n = e.Entity.GetComponent(156);
				((o.i_begin_hp = n.GetCurrentValue(
					CharacterAttributeTypes_1.EAttributeId.Proto_Life,
				)),
				(o.i_hp_max = n.GetCurrentValue(
					CharacterAttributeTypes_1.EAttributeId.Tkn,
				)),
				(o.i_enter_battle_score = this.xOr(e.Id)),
				r.push(o.i_role_id),
				a.push(Math.round((o.i_begin_hp / o.i_hp_max) * 1e4)),
				e.Entity.GetComponent(79)).RoleElementEnergy >=
					CharacterAttributeTypes_1.ELEMENT_POWER_MAX &&
					o.i_full_element_times++,
					n.GetCurrentValue(
						CharacterAttributeTypes_1.EAttributeId.Proto_Energy,
					) >=
						n.GetCurrentValue(
							CharacterAttributeTypes_1.EAttributeId.Proto_EnergyMax,
						) && o.i_full_energy_times++;
			}
			(this.wOr.i_area_id =
				ModelManager_1.ModelManager.AreaModel.AreaInfo.AreaId),
				(this.wOr.f_x = e.ActorLocationProxy.X),
				(this.wOr.f_y = e.ActorLocationProxy.Y),
				(this.wOr.f_z = e.ActorLocationProxy.Z),
				(this.wOr.s_battle_id =
					(ModelManager_1.ModelManager.PlayerInfoModel.GetId()?.toString() ??
						"0") +
					"_" +
					String(this.c9)),
				(this.wOr.s_team_character = r),
				(this.wOr.s_team_hp_per = a),
				0 < this.c9
					? LogController_1.LogController.LogBattleStartPush(this.wOr)
					: Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug("Battle", 4, "战斗ID不合法", [
							"battle_id",
							this.c9,
						]);
		}
	}
	static BOr() {
		if (
			!ModelManager_1.ModelManager.GameModeModel.IsMulti &&
			0 !== this.c9 &&
			!this.IOr()
		) {
			var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity,
				[t, r] = this.qOr(e.Entity);
			const a = this.tOr;
			(a.i_area_id = ModelManager_1.ModelManager.AreaModel.AreaInfo.AreaId),
				(e = e.Entity.GetComponent(3).ActorLocationProxy),
				(a.f_x = e.X),
				(a.f_y = e.Y),
				(a.f_z = e.Z),
				(a.s_team_character = t),
				(a.s_team_hp_per = r),
				(a.s_battle_id =
					(ModelManager_1.ModelManager.PlayerInfoModel.GetId()?.toString() ??
						"0") +
					"_" +
					String(this.c9));
			const o = this._Nr;
			this.lNr.forEach((e) => {
				a.s_monster_hate.push(o.get(e));
			}),
				this.fOr.forEach((e) => {
					a.s_death_monster.push(
						new LogReportDefine_1.MonsterInfoLogData(o.get(e)),
					);
				}),
				this.lNr.forEach((e) => {
					this.fOr.has(e) ||
						a.s_run_monster.push(
							new LogReportDefine_1.MonsterInfoLogData(o.get(e)),
						);
				}),
				(e = a.s_run_monster.length);
			let n = this.COr;
			n !== Protocol_1.Aki.Protocol.qOs.Proto_Death &&
				(0 === e
					? (n = Protocol_1.Aki.Protocol.qOs.Proto_AllKill)
					: e < this.lNr.size
						? (n = Protocol_1.Aki.Protocol.qOs.Hfs)
						: e === this.lNr.size &&
							(n = Protocol_1.Aki.Protocol.qOs.Proto_Run)),
				(a.i_result = n),
				(a.i_death_role_count = this.sOr),
				(a.i_revive_times = this.BNr),
				(a.l_acc_damage = this.hOr),
				(a.l_acc_shield_damage = this.lOr),
				(a.l_acc_self_damage = this.aOr),
				(a.l_acc_skill_heal = this._Or),
				(a.l_acc_item_heal = this.uOr),
				(a.i_stop_times = this.cOr),
				(a.i_damage_max = this.mOr),
				(a.i_acc_dodge_times = this.MNr),
				(a.i_dodge_succ_times = this.ENr),
				(a.i_non_character_damage = this.gNr),
				(a.i_non_character_shield_damage = 0),
				(a.i_change_character_times = this.dOr),
				(a.i_qte_times = this.yNr),
				(a.i_cost_time = TimeUtil_1.TimeUtil.GetServerTime() - this.oOr),
				(a.i_counter_attack_times = this.gOr),
				(a.i_bullet_rebound_times = this.ANr),
				this.xNr(),
				a.i_cost_time <= 0 || a.s_monster_hate.length <= 0
					? Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug("Battle", 4, "战斗时长为0,或者历史仇恨为0", [
							"Data",
							a,
						])
					: LogController_1.LogController.LogBattleEndPush(a, !0),
				this.GOr(),
				this.NOr(),
				this.OOr(),
				this.kOr(),
				this.FOr(),
				this.nOr();
		}
	}
	static GOr() {
		for (const e of this.pOr.values())
			LogController_1.LogController.LogSingleCharacterStatusPush(e, !0);
		this.pOr.clear();
	}
	static NOr() {
		for (const t of this.TOr.values()) {
			t.i_acc_time <= 0 &&
				(t.i_acc_time = TimeUtil_1.TimeUtil.GetServerTime() - t.InitTime);
			var e = t.l_acc_rage;
			(t.l_acc_rage_other =
				e - t.l_acc_rage_normal - t.l_acc_rage_counter - t.l_acc_rage_vision),
				LogController_1.LogController.LogSingleMonsterStatusPush(t, !0);
		}
		this.TOr.clear();
	}
	static OOr() {
		for (const e of this.yOr.entries())
			LogController_1.LogController.LogRoleSkillReportPush(
				e[1],
				this.EOr.get(e[0]),
				!0,
			);
		this.EOr.clear(), this.SOr.clear(), this.yOr.clear();
	}
	static kOr() {
		if (0 < this.VOr.size) {
			let e;
			this.IOr()
				? (e = new LogReportDefine_1.InstReactionLogRecord(
						ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId,
						ModelManager_1.ModelManager.CreatureModel.GetSceneId(),
					))
				: ((e = new LogReportDefine_1.ReactionLogRecord()).s_battle_id =
						(ModelManager_1.ModelManager.PlayerInfoModel.GetId()?.toString() ??
							"0") +
						"_" +
						String(this.c9)),
				LogController_1.LogController.LogDoubleBallReport(e, this.VOr, !0);
		}
		this.VOr.clear(), this.HOr.clear();
	}
	static jOr() {
		this.WOr.Clear(),
			this.SNr.Clear(),
			(this.WOr.i_start_time = TimeUtil_1.TimeUtil.GetServerTime()),
			(this.WOr.i_inst_id =
				ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId),
			(this.WOr.s_fight_id =
				ModelManager_1.ModelManager.CreatureModel.GetSceneId()),
			(this.WOr.s_fight_roles = this.MOr()),
			(this.WOr.i_area_index = this.KOr),
			LogController_1.LogController.LogInstFightStartPush(this.WOr);
	}
	static QOr() {
		(this.SNr.i_inst_id =
			ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId),
			(this.SNr.s_fight_id =
				ModelManager_1.ModelManager.CreatureModel.GetSceneId()),
			this.qOr(
				ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity,
			),
			(this.SNr.i_fight_use_time +=
				TimeUtil_1.TimeUtil.GetServerTime() - this.oOr),
			(this.SNr.i_inst_use_time =
				TimeUtil_1.TimeUtil.GetServerTime() - this.WOr.i_start_time),
			(this.SNr.s_fight_roles = this.MOr()),
			(this.SNr.i_area_index = this.KOr),
			this.GOr(),
			this.NOr(),
			this.OOr(),
			this.kOr(),
			this.FOr(),
			this.nOr(),
			LogController_1.LogController.LogInstFightEndPush(this.SNr),
			this.WOr.Clear(),
			this.SNr.Clear();
	}
	static FOr() {
		for (const e of this.AOr.entries())
			LogController_1.LogController.LogMonsterSkillReportPush(
				e[1],
				this.ROr.get(e[0]),
				!0,
			);
		this.DOr.clear(), this.ROr.clear(), this.AOr.clear();
	}
	static XOr(e) {
		var t = new Map(),
			r =
				((e = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(e, {
					ParamType: 1,
				}).GetConfigId),
				ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e));
		for (const e of r.GetSkillData().GetSkillList()) {
			var a = r.GetSkillData().GetSkillLevel(e.Id);
			t.set(e.Id, a);
		}
		return Object.fromEntries(t);
	}
	static $Or(e) {
		const t = new Array();
		return (
			ModelManager_1.ModelManager.PhantomBattleModel.GetBattleDataById(e)
				.GetIncrIdList()
				.forEach((e, r) => {
					var a;
					e &&
						((a = new Array()),
						(e =
							ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(
								e,
							)),
						a.push(e.GetConfigId()),
						a.push(e.GetPhantomLevel()),
						a.push(r),
						t.push(a));
				}),
			t
		);
	}
	static xOr(e) {
		var t = 0,
			r = (a = EntitySystem_1.EntitySystem.Get(e)).GetComponent(156),
			a = a.GetComponent(79),
			o =
				((a = CharacterDamageCalculations_1.Calculation.GetElementDamageBonus(
					r.TakeSnapshot(),
					a.RoleElementType,
				)),
				(e = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(e, {
					ParamType: 1,
				}).GetConfigId),
				ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e)),
			n =
				((t =
					1.4 *
					(e = r.GetCurrentValue(
						CharacterAttributeTypes_1.EAttributeId.Proto_Atk,
					))),
				(e = r.GetCurrentValue(
					CharacterAttributeTypes_1.EAttributeId.Proto_Crit,
				)),
				r.GetCurrentValue(
					CharacterAttributeTypes_1.EAttributeId.Proto_CritDamage,
				));
		(t *=
			(e / CharacterAttributeTypes_1.PER_TEN_THOUSAND) *
				(n / CharacterAttributeTypes_1.PER_TEN_THOUSAND) +
			(1 - e / CharacterAttributeTypes_1.PER_TEN_THOUSAND)),
			(n = r.GetCurrentValue(
				CharacterAttributeTypes_1.EAttributeId.Proto_DamageChange,
			)),
			(t *=
				1 +
				n / CharacterAttributeTypes_1.PER_TEN_THOUSAND +
				a / CharacterAttributeTypes_1.PER_TEN_THOUSAND),
			(e = o.GetSkillData().GetSkillList());
		let i = 0,
			s = 0;
		for (const t of e) {
			var _ = o.GetSkillData().GetSkillLevel(t.Id);
			i < _ ? (i = _) : s < _ && (s = _);
		}
		return (
			(t *= 1 + 0.111111 * ((i + s) / 2 - 1)) *
			(1 + 0.041667 * o.GetResonanceData().GetResonantChainGroupIndex())
		);
	}
	static vOr(e) {
		var t =
				ModelManager_1.ModelManager.CreatureModel.GetEntityById(e)
					?.Entity?.GetComponent(0)
					?.GetRoleId() ?? 0,
			r = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(e, {
				ParamType: 1,
			});
		if (r) {
			let a;
			return (
				((a = this.IOr()
					? new LogReportDefine_1.InstRoleStateRecord(
							t,
							ModelManager_1.ModelManager.InstanceDungeonEntranceModel
								.InstanceId,
							ModelManager_1.ModelManager.CreatureModel.GetSceneId(),
						)
					: new LogReportDefine_1.RoleStateRecord(t)).s_battle_id =
					(ModelManager_1.ModelManager.PlayerInfoModel.GetId()?.toString() ??
						"0") +
					"_" +
					String(this.c9)),
				(t = r.GetConfigId),
				(r = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(t)),
				(a.i_role_level = r.GetLevelData().GetLevel()),
				(a.i_role_quality = r.GetQualityConfig().Id),
				(a.i_role_reson = r.GetResonanceData().GetResonantChainGroupIndex()),
				(r =
					ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByRoleDataId(t)),
				(a.i_weapon_id = r.GetItemId()),
				(a.i_weapon_type = r.GetItemConfig().WeaponType),
				(a.i_weapon_quality = r.GetItemConfig().QualityId),
				(a.i_weapon_level = r.GetLevel()),
				(r =
					ControllerHolder_1.ControllerHolder.PhantomBattleController.GetEquipByIndex(
						t,
						0,
					)),
				(r =
					ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(
						r,
					)) &&
					((a.i_vision_skill_id = r.GetConfigId()),
					(a.i_vision_skill_level = r.GetPhantomLevel())),
				(a.s_role_skill = this.XOr(e)),
				(a.s_phantom_battle_data = this.$Or(t)),
				(a.s_phantom_fetter_list = [
					...ModelManager_1.ModelManager.PhantomBattleModel.GetTargetRoleFetterList(
						t,
					),
				]),
				a
			);
		}
	}
	static LOr(e) {
		var t =
			((e =
				EntitySystem_1.EntitySystem.Get(e).GetComponent(156)).GetCurrentValue(
				CharacterAttributeTypes_1.EAttributeId.Proto_DamageResistancePhys,
			) +
				e.GetCurrentValue(
					CharacterAttributeTypes_1.EAttributeId.Proto_DamageResistanceElement1,
				) +
				e.GetCurrentValue(
					CharacterAttributeTypes_1.EAttributeId.Proto_DamageResistanceElement2,
				) +
				e.GetCurrentValue(
					CharacterAttributeTypes_1.EAttributeId.Proto_DamageResistanceElement3,
				) +
				e.GetCurrentValue(
					CharacterAttributeTypes_1.EAttributeId.Proto_DamageResistanceElement4,
				) +
				e.GetCurrentValue(
					CharacterAttributeTypes_1.EAttributeId.Proto_DamageResistanceElement5,
				) +
				e.GetCurrentValue(
					CharacterAttributeTypes_1.EAttributeId.Proto_DamageResistanceElement6,
				)) /
			7 /
			CharacterAttributeTypes_1.PER_TEN_THOUSAND;
		e =
			e.GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.Tkn) /
			(1 - t) /
			0.5;
		let r = 0;
		for (const e of this.ZNr) {
			var a = this.TNr(e.Id);
			a.i_enter_battle_score > r && (r = a.i_enter_battle_score);
		}
		return e / r;
	}
	static IOr() {
		return 0 < this.WOr.i_start_time;
	}
	static qOr(e) {
		e?.Valid &&
			0 !== (e = this.TNr(e.Id)).LastGoToBattleTimePoint &&
			(e.i_acc_time +=
				TimeUtil_1.TimeUtil.GetServerTime() - e.LastGoToBattleTimePoint);
		e = this.ZNr;
		var t = new Array(),
			r = new Array();
		for (const n of e) {
			var a = this.TNr(n.Id),
				o = n.Entity.GetComponent(156);
			(a.i_end_hp = o.GetCurrentValue(
				CharacterAttributeTypes_1.EAttributeId.Proto_Life,
			)),
				(a.i_hp_max = o.GetCurrentValue(
					CharacterAttributeTypes_1.EAttributeId.Tkn,
				)),
				t.push(a.i_role_id),
				r.push(Math.round((a.i_end_hp / a.i_hp_max) * 1e4));
		}
		return [t, r];
	}
});
(CharacterLogComponent.GNr = !1),
	(CharacterLogComponent.NNr = (e) => {
		e ? CharacterLogComponent_1.UOr() : CharacterLogComponent_1.BOr();
	}),
	(CharacterLogComponent.VNr = () => {
		1 < ModelManager_1.ModelManager.GameModeModel.InstanceType &&
			!ModelManager_1.ModelManager.GameModeModel.IsMulti &&
			((CharacterLogComponent_1.KOr = 0), CharacterLogComponent_1.jOr());
	}),
	(CharacterLogComponent.HNr = () => {
		1 < ModelManager_1.ModelManager.GameModeModel.InstanceType &&
			!ModelManager_1.ModelManager.GameModeModel.IsMulti &&
			(CharacterLogComponent_1.QOr(), (CharacterLogComponent_1.KOr = 0));
	}),
	(CharacterLogComponent.jNr = () => {
		ModelManager_1.ModelManager.GameModeModel.IsMulti ||
			((CharacterLogComponent_1.cOr += 1),
			(CharacterLogComponent_1.SNr.i_stop_times += 1));
	}),
	(CharacterLogComponent.iOr = void 0),
	(CharacterLogComponent.CurrentEntity = void 0),
	(CharacterLogComponent.ONr = (e, t) => {
		(CharacterLogComponent_1.CurrentEntity = e),
			CharacterLogComponent_1.CNr() &&
				((CharacterLogComponent_1.dOr += 1),
				(e = CharacterLogComponent_1.TNr(e?.Id)) &&
					((e.LastGoToBattleTimePoint = TimeUtil_1.TimeUtil.GetServerTime()),
					e.i_enter_times++),
				(e = CharacterLogComponent_1.TNr(t?.Id ?? 0)) &&
					((e.i_leave_times += 1),
					0 !== e.LastGoToBattleTimePoint
						? (e.i_acc_time +=
								TimeUtil_1.TimeUtil.GetServerTime() - e.LastGoToBattleTimePoint)
						: (e.LastGoToBattleTimePoint =
								TimeUtil_1.TimeUtil.GetServerTime())),
				CharacterLogComponent_1.xNr());
	}),
	(CharacterLogComponent.kNr = () => {
		CharacterLogComponent_1.CNr() &&
			((CharacterLogComponent_1.COr = Protocol_1.Aki.Protocol.qOs.Proto_Death),
			CharacterLogComponent_1.NNr(!1));
	}),
	(CharacterLogComponent.c9 = 0),
	(CharacterLogComponent.sOr = 0),
	(CharacterLogComponent.BNr = 0),
	(CharacterLogComponent.aOr = 0),
	(CharacterLogComponent.gNr = 0),
	(CharacterLogComponent.lOr = 0),
	(CharacterLogComponent.hOr = 0),
	(CharacterLogComponent._Or = 0),
	(CharacterLogComponent.uOr = 0),
	(CharacterLogComponent.MNr = 0),
	(CharacterLogComponent.ENr = 0),
	(CharacterLogComponent.cOr = 0),
	(CharacterLogComponent.mOr = 0),
	(CharacterLogComponent.dOr = 0),
	(CharacterLogComponent.yNr = 0),
	(CharacterLogComponent.oOr = 0),
	(CharacterLogComponent.COr = 0),
	(CharacterLogComponent.gOr = 0),
	(CharacterLogComponent.ANr = 0),
	(CharacterLogComponent.hNr = new Set()),
	(CharacterLogComponent.lNr = new Set()),
	(CharacterLogComponent.fOr = new Set()),
	(CharacterLogComponent.mNr = new Set()),
	(CharacterLogComponent._Nr = new Map()),
	(CharacterLogComponent.DNr = new Map()),
	(CharacterLogComponent.WOr = new LogReportDefine_1.InstFightStartRecord()),
	(CharacterLogComponent.SNr = new LogReportDefine_1.InstFightEndRecord()),
	(CharacterLogComponent.KOr = 0),
	(CharacterLogComponent.pOr = new Map()),
	(CharacterLogComponent.SOr = new Map()),
	(CharacterLogComponent.EOr = new Map()),
	(CharacterLogComponent.yOr = new Map()),
	(CharacterLogComponent.TOr = new Map()),
	(CharacterLogComponent.DOr = new Map()),
	(CharacterLogComponent.ROr = new Map()),
	(CharacterLogComponent.AOr = new Map()),
	(CharacterLogComponent.VOr = new Map()),
	(CharacterLogComponent.HOr = new Map()),
	(CharacterLogComponent.wOr = new LogReportDefine_1.BattleStartLogData()),
	(CharacterLogComponent.POr = void 0),
	(CharacterLogComponent.tOr = new LogReportDefine_1.BattleEndLogData()),
	(CharacterLogComponent.bOr = void 0),
	(CharacterLogComponent.FNr = (e) => {
		var t;
		ModelManager_1.ModelManager.GameModeModel.IsMulti ||
			ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() ||
			((e = EntitySystem_1.EntitySystem.Get(e))?.GetComponent(0)?.IsRole() &&
				((t = CharacterLogComponent_1.rOr(e)), (e = e.GetComponent(21)), t) &&
				(LogController_1.LogController.LogCharacterDeathPush(t, e.fNr, !0),
				(e.fNr = 0)),
			CharacterLogComponent_1.SNr.i_death_role_count++);
	}),
	(CharacterLogComponent.WNr = (e) => {
		e.U0s && (CharacterLogComponent_1.SNr.i_result = Number(e.U0s)),
			e.V5n && (CharacterLogComponent_1.SNr.i_reason = e.V5n);
	}),
	(CharacterLogComponent.KNr = () => {
		1 < ModelManager_1.ModelManager.GameModeModel.InstanceType &&
			!ModelManager_1.ModelManager.GameModeModel.IsMulti &&
			(CharacterLogComponent_1.KOr++,
			CharacterLogComponent_1.QOr(),
			CharacterLogComponent_1.jOr());
	}),
	(CharacterLogComponent = CharacterLogComponent_1 =
		__decorate(
			[(0, RegisterComponent_1.RegisterComponent)(21)],
			CharacterLogComponent,
		)),
	(exports.CharacterLogComponent = CharacterLogComponent);
