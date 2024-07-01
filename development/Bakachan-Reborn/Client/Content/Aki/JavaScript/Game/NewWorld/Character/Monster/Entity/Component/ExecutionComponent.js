"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (e, t, n, o) {
		var r,
			a = arguments.length,
			i =
				a < 3
					? t
					: null === o
						? (o = Object.getOwnPropertyDescriptor(t, n))
						: o;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			i = Reflect.decorate(e, t, n, o);
		else
			for (var l = e.length - 1; 0 <= l; l--)
				(r = e[l]) && (i = (a < 3 ? r(i) : 3 < a ? r(t, n, i) : r(t, n)) || i);
		return 3 < a && i && Object.defineProperty(t, n, i), i;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ExecutionComponent = void 0);
const Log_1 = require("../../../../../../Core/Common/Log"),
	ExecutionConfById_1 = require("../../../../../../Core/Define/ConfigQuery/ExecutionConfById"),
	MonsterBattleConfById_1 = require("../../../../../../Core/Define/ConfigQuery/MonsterBattleConfById"),
	EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent"),
	RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent"),
	GameplayTagUtils_1 = require("../../../../../../Core/Utils/GameplayTagUtils"),
	CodeDefineLevelConditionInfo_1 = require("../../../../../LevelGamePlay/LevelConditions/CodeDefineLevelConditionInfo"),
	LevelGameplayActionsDefine_1 = require("../../../../../LevelGamePlay/LevelGameplayActionsDefine"),
	ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../../../Manager/ModelManager"),
	SceneTeamController_1 = require("../../../../../Module/SceneTeam/SceneTeamController"),
	ScrollingTipsController_1 = require("../../../../../Module/ScrollingTips/ScrollingTipsController"),
	CharacterBuffIds_1 = require("../../../Common/Component/Abilities/CharacterBuffIds"),
	MAX_CHARACTERID = 9999;
let ExecutionComponent = class extends EntityComponent_1.EntityComponent {
	constructor() {
		super(...arguments),
			(this.jtn = void 0),
			(this.Wtn = void 0),
			(this.SJi = void 0),
			(this.Ktn = void 0),
			(this.Qtn = (e, t) => {
				var n = this.Entity.GetComponent(178);
				n
					? ((this.SJi = n.GetInteractController()),
						this.SJi
							? t
								? this.Xtn()
									? this.$tn()
									: Log_1.Log.CheckDebug() &&
										Log_1.Log.Debug("Battle", 4, "队伍内没有符合处决条件的角色")
								: this.Wtn &&
									(this.SJi.RemoveClientInteractOption(this.Wtn),
									(this.Wtn = void 0))
							: Log_1.Log.CheckError() &&
								Log_1.Log.Error("Battle", 4, "Can not find interactController"))
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Battle",
							4,
							"Can not find PawnInteractNewComponent",
						);
			});
	}
	OnStart() {
		return !0;
	}
	OnActivate() {
		var e = this.Entity.GetComponent(185),
			t = this.Entity.GetComponent(0),
			n = t.GetMonsterComponent().FightConfigId;
		(this.Ktn =
			MonsterBattleConfById_1.configMonsterBattleConfById.GetConfig(n)),
			(this.jtn = e.ListenForTagAddOrRemove(-121513115, this.Qtn)),
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"Battle",
					4,
					"处决组件初始化完成",
					["EntityId", this.Entity.Id],
					["CreatureDataId", t.GetCreatureDataId()],
					["PbDataId", t.GetPbDataId()],
					["ExecutionId", this.Ktn.ExecutionId],
				);
	}
	Ytn() {
		var e =
			ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity.GetComponent(
				0,
			)?.GetPbDataId();
		for (const r of this.Ktn.ExecutionId) {
			var t = ExecutionConfById_1.configExecutionConfById.GetConfig(r);
			if (t) {
				if (t.ExecutionRoleId === e || this.Jtn(e, t.ExecutionRoleId)) return t;
				for (const e of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems()) {
					var n = e.GetConfigId;
					if (
						n > 9999 &&
						(n =
							ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfig(n)) &&
						n.ParentId === t.ExecutionRoleId
					)
						return t;
				}
				if (
					ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerRoleId() ===
					t.ExecutionRoleId
				) {
					var o = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(
						t.ExecutionRoleId,
						{ ParamType: 0 },
					)?.GetCreatureDataId();
					if (o && 0 < o) return t;
				}
			} else
				Log_1.Log.CheckError() &&
					Log_1.Log.Error("Battle", 4, "Execution can not find ExecutionConf", [
						"ExecutionId",
						r,
					]);
		}
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug("Battle", 4, "不存在合适的处决配置项", [
				"MonsterBattleConfigId",
				this.Ktn.Id,
			]);
	}
	$tn() {
		var e,
			t,
			n = new LevelGameplayActionsDefine_1.ActionExecution(),
			o = this.Ytn(),
			r = new CodeDefineLevelConditionInfo_1.LevelConditionGroup();
		r.Type = 0;
		for (const n of o.LimitExecutionTags)
			n &&
				0 !== n.length &&
				(e = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(n)) &&
				(((t =
					new CodeDefineLevelConditionInfo_1.LevelConditionCheckCharacterTagInfo()).TagId =
					e),
				(t.IsContain = !1),
				r.Conditions.push(t));
		this.Wtn = this.SJi.AddClientInteractOption(
			n,
			r,
			"Direct",
			this.Ktn.ExecutionRadius,
			void 0,
			1,
		);
	}
	Xtn() {
		var e = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems();
		for (const o of this.Ktn.ExecutionId) {
			var t = ExecutionConfById_1.configExecutionConfById.GetConfig(o);
			if (t) {
				if (
					ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(
						t.ExecutionRoleId,
						{ ParamType: 0 },
					)?.GetCreatureDataId()
				)
					return !0;
				for (const o of e) {
					var n = o.GetConfigId;
					if (
						n > 9999 &&
						(n =
							ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfig(n)) &&
						n.ParentId === t.ExecutionRoleId
					)
						return !0;
				}
			} else
				Log_1.Log.CheckError() &&
					Log_1.Log.Error("Battle", 4, "Execution can not find ExecutionConf", [
						"ExecutionId",
						o,
					]);
		}
		return !1;
	}
	OnEnd() {
		return this.jtn?.EndTask(), !0;
	}
	StartExecution() {
		let e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
		var t = e.Entity.GetComponent(0)?.GetPbDataId();
		let n = !1;
		for (const l of this.Ktn.ExecutionId) {
			var o = ExecutionConfById_1.configExecutionConfById.GetConfig(l);
			if (o) {
				if (o.ExecutionRoleId === t || this.Jtn(t, o.ExecutionRoleId)) {
					if (
						!this.ztn(
							ModelManager_1.ModelManager.SceneTeamModel.GetCurrentTeamItem.GetCreatureDataId(),
						)
					)
						return;
					this.Ztn(e.Entity, o), (n = !0);
					break;
				}
				var r = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(
					o.ExecutionRoleId,
					{ ParamType: 0 },
				)?.GetCreatureDataId();
				if (r) {
					if (!this.ztn(r)) return;
					SceneTeamController_1.SceneTeamController.RequestChangeRole(
						r,
						!1,
						!0,
					),
						(e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity),
						this.ein(e.Entity),
						this.Ztn(e.Entity, o) ||
							this.tin(
								ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity
									.Entity,
							),
						(n = !0);
					break;
				}
				for (const t of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems()) {
					var a = t.GetConfigId;
					if (a > 9999) {
						var i =
							ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfig(a);
						if (i && i.ParentId === o.ExecutionRoleId) {
							if (
								((i = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(
									a,
									{ ParamType: 0 },
								)?.GetCreatureDataId()),
								!this.ztn(i))
							)
								return;
							let t = !1;
							(e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity),
								ModelManager_1.ModelManager.SceneTeamModel.GetCurrentTeamItem.GetCreatureDataId() !==
									i &&
									(SceneTeamController_1.SceneTeamController.RequestChangeRole(
										i,
										!1,
										!0,
									),
									(e =
										ModelManager_1.ModelManager.SceneTeamModel
											.GetCurrentEntity),
									this.ein(e.Entity),
									(t = !0)),
								!this.Ztn(e.Entity, o) &&
									t &&
									this.tin(
										ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity
											.Entity,
									),
								(n = !0);
							break;
						}
					}
				}
			} else
				Log_1.Log.CheckError() &&
					Log_1.Log.Error("Battle", 4, "Execution can not find ExecutionConf", [
						"ExecutionId",
						l,
					]);
		}
		n ||
			(Log_1.Log.CheckError() &&
				Log_1.Log.Error("Battle", 4, "Execution can not find execution role", [
					"MonsterBattleConfigId",
					this.Ktn.Id,
				]));
	}
	Jtn(e, t) {
		return !(
			t <= 9999 ||
			!(t = ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfig(t)) ||
			t.ParentId !== e
		);
	}
	ztn(e) {
		var t = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(e, {
			ParamType: 3,
		});
		return t?.IsMyRole()
			? !t.IsDead() ||
					(ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
						"Execution_Error_Die",
					),
					Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug("Battle", 4, "Execution character is dead!", [
							"CreatureDataId",
							e,
						]),
					!1)
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error("Battle", 4, "Execution character is not Player!", [
						"CreatureDataId",
						e,
					]),
				!1);
	}
	Ztn(e, t) {
		return (
			(t = e
				.GetComponent(33)
				?.BeginSkill(t.ExecutionSkillId, {
					Context: "ExecutionComponent.UseExecutionSkill",
				})),
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"Battle",
					4,
					"触发处决技能！",
					["触发者", e.Id],
					["处决对象", this.Entity.Id],
					["是否成功执行", t],
				),
			t ?? !1
		);
	}
	ein(e) {
		(e = e.GetComponent(157)),
			e?.AddBuff(CharacterBuffIds_1.buffId.ChangeRoleBuff, {
				InstigatorId: e?.CreatureDataId,
				Reason: "处决换人",
			});
	}
	tin(e) {
		e.GetComponent(157)?.RemoveBuff(
			CharacterBuffIds_1.buffId.ChangeRoleBuff,
			-1,
			"处决换人失败",
		);
	}
};
(ExecutionComponent = __decorate(
	[(0, RegisterComponent_1.RegisterComponent)(76)],
	ExecutionComponent,
)),
	(exports.ExecutionComponent = ExecutionComponent);
