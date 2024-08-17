"use strict";
var CharacterSkillComponent_1,
	__decorate =
		(this && this.__decorate) ||
		function (t, e, i, o) {
			var r,
				l = arguments.length,
				n =
					l < 3
						? e
						: null === o
							? (o = Object.getOwnPropertyDescriptor(e, i))
							: o;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
				n = Reflect.decorate(t, e, i, o);
			else
				for (var a = t.length - 1; 0 <= a; a--)
					(r = t[a]) &&
						(n = (l < 3 ? r(n) : 3 < l ? r(e, i, n) : r(e, i)) || n);
			return 3 < l && n && Object.defineProperty(e, i, n), n;
		};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CharacterSkillComponent = exports.SKILL_GROUP_MAIN = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	Log_1 = require("../../../../../../Core/Common/Log"),
	Stats_1 = require("../../../../../../Core/Common/Stats"),
	CommonParamById_1 = require("../../../../../../Core/Define/ConfigCommon/CommonParamById"),
	Protocol_1 = require("../../../../../../Core/Define/Net/Protocol"),
	Entity_1 = require("../../../../../../Core/Entity/Entity"),
	EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent"),
	EntitySystem_1 = require("../../../../../../Core/Entity/EntitySystem"),
	RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent"),
	ResourceSystem_1 = require("../../../../../../Core/Resource/ResourceSystem"),
	TimerSystem_1 = require("../../../../../../Core/Timer/TimerSystem"),
	DataTableUtil_1 = require("../../../../../../Core/Utils/DataTableUtil"),
	FNameUtil_1 = require("../../../../../../Core/Utils/FNameUtil"),
	Rotator_1 = require("../../../../../../Core/Utils/Math/Rotator"),
	Transform_1 = require("../../../../../../Core/Utils/Math/Transform"),
	Vector_1 = require("../../../../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../../../../Core/Utils/MathUtils"),
	EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
	EffectSystem_1 = require("../../../../../Effect/EffectSystem"),
	Global_1 = require("../../../../../Global"),
	GlobalData_1 = require("../../../../../GlobalData"),
	ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../../../Manager/ModelManager"),
	FormationAttributeController_1 = require("../../../../../Module/Abilities/FormationAttributeController"),
	SkillMessageController_1 = require("../../../../../Module/CombatMessage/SkillMessageController"),
	PhantomUtil_1 = require("../../../../../Module/Phantom/PhantomUtil"),
	SceneTeamController_1 = require("../../../../../Module/SceneTeam/SceneTeamController"),
	PreloadDefine_1 = require("../../../../../Preload/PreloadDefine"),
	ActorUtils_1 = require("../../../../../Utils/ActorUtils"),
	CombatDebugController_1 = require("../../../../../Utils/CombatDebugController"),
	BlackboardController_1 = require("../../../../../World/Controller/BlackboardController"),
	CharacterAbilityComponent_1 = require("../Abilities/CharacterAbilityComponent"),
	CharacterBuffIds_1 = require("../Abilities/CharacterBuffIds"),
	CharacterUnifiedStateTypes_1 = require("../Abilities/CharacterUnifiedStateTypes"),
	CustomMovementDefine_1 = require("../Move/CustomMovementDefine"),
	Skill_1 = require("./Skill"),
	SkillBehaviorAction_1 = require("./SkillBehavior/SkillBehaviorAction"),
	SkillBehaviorCondition_1 = require("./SkillBehavior/SkillBehaviorCondition");
var EAttributeId = Protocol_1.Aki.Protocol.Bks;
const ROLLING_GROUNDED_RECOVER_TIME = 600,
	DEFAULT_CD_TIME = -1,
	HIT_CASE_SOCKET_NAME = "HitCase",
	SKILL_GROUP_INDEX = ((exports.SKILL_GROUP_MAIN = 1), 0),
	interruptTag = -242791826;
class AnimNotifyStateSkillRotateStyle {
	constructor() {
		(this.IsUseAnsRotateOffset = !1),
			(this.AnsRotateOffset = Rotator_1.Rotator.Create()),
			(this.PauseRotateThreshold = 0),
			(this.ResumeRotateThreshold = 0),
			(this.IsPaused = !1);
	}
	Reset() {
		(this.IsUseAnsRotateOffset = !1),
			this.AnsRotateOffset.Reset(),
			(this.PauseRotateThreshold = 0),
			(this.ResumeRotateThreshold = 0),
			(this.IsPaused = !1);
	}
}
class SkillRotateTarget {
	constructor() {
		(this.Target = void 0), (this.Type = 0);
	}
}
let CharacterSkillComponent = (CharacterSkillComponent_1 = class extends (
	EntityComponent_1.EntityComponent
) {
	constructor() {
		super(...arguments),
			(this.nZr = void 0),
			(this.sZr = void 0),
			(this.aZr = void 0),
			(this.hZr = void 0),
			(this.lZr = void 0),
			(this._Zr = void 0),
			(this.uZr = void 0),
			(this.cZr = void 0),
			(this.mZr = void 0),
			(this.dZr = void 0),
			(this.CZr = void 0),
			(this.gZr = void 0),
			(this.fZr = void 0),
			(this.pZr = void 0),
			(this.vZr = void 0),
			(this.MZr = void 0),
			(this.SZr = void 0),
			(this.EZr = void 0),
			(this.yZr = void 0),
			(this.IZr = void 0),
			(this.TZr = void 0),
			(this.LZr = !1),
			(this.LoadedSkills = new Map()),
			(this.DZr = new Map()),
			(this.RZr = new Set()),
			(this.AZr = void 0),
			(this.UZr = void 0),
			(this.DtSkillInfoExtra = void 0),
			(this.DtBulletInfo = void 0),
			(this.DtBulletInfoExtra = void 0),
			(this.DtHitEffect = void 0),
			(this.DtHitEffectExtra = void 0),
			(this.SIe = void 0),
			(this.eZr = void 0),
			(this.Lie = void 0),
			(this.zJo = void 0),
			(this.Szo = void 0),
			(this.Hte = void 0),
			(this.Gce = void 0),
			(this.PZr = void 0),
			(this.xZr = void 0),
			(this.wZr = void 0),
			(this.mBe = void 0),
			(this.bre = void 0),
			(this.OHr = void 0),
			(this.BZr = void 0),
			(this.FightStateComp = void 0),
			(this.StateMachineComp = void 0),
			(this.Dxr = Vector_1.Vector.Create()),
			(this.Lz = Vector_1.Vector.Create()),
			(this.Gue = Rotator_1.Rotator.Create()),
			(this.Z_e = Transform_1.Transform.Create()),
			(this.bZr = (t) => {
				this.SkillTarget?.Id === t.Id && (this.SkillTarget = void 0);
			}),
			(this.Gfr = () => {
				this.StopAllSkills("CharacterSkillComponent.OnTeleportStart");
			}),
			(this.qZr = () => {
				this.StopGroup1Skill("受击打断技能");
			}),
			(this.OnSwitchControl = (t) => {
				for (var [e, i] of this.LoadedSkills)
					i.Active &&
						(CombatDebugController_1.CombatDebugController.CombatInfo(
							"Skill",
							this.Entity,
							"切换控制权，结束当前技能",
							["技能Id", e],
						),
						i.IsSimulated
							? this.SimulateEndSkill(e)
							: this.EndSkill(e, "CharacterSkillComponent.OnSwitchControl"));
			}),
			(this.GZr = () => {
				var t = this.Entity.GetComponent(33);
				t.Valid &&
					!this.Lie.HasTag(-1371021686) &&
					(CombatDebugController_1.CombatDebugController.CombatInfo(
						"Skill",
						this.Entity,
						"疑难杂症debug日志，RollingGroundedDelay",
					),
					(t.IsMainSkillReadyEnd = !0)),
					(this.NZr = void 0);
			}),
			(this.NZr = void 0),
			(this.OZr = !1),
			(this.IsMainSkillReadyEnd = !0),
			(this.SkillTarget = void 0),
			(this.SkillTargetSocket = ""),
			(this.kZr = (t) => {
				var e = this.CurrentSkill;
				e &&
					e.SkillInfo.SkillTarget.HateOrLockOnChanged &&
					((this.SkillTarget =
						ModelManager_1.ModelManager.CharacterModel.GetHandle(t)),
					(this.SkillTargetSocket = ""));
			}),
			(this.v$r = (t) => {
				this.SkillTarget?.Id === t && this.xDn();
			}),
			(this.zpe = (t, e) => {
				this.SkillTarget === e && this.xDn();
			}),
			(this.W3r = (t) => {
				(t = t.GetComponent(33)),
					(this.SkillTarget = t.SkillTarget),
					(this.SkillTargetSocket = t.SkillTargetSocket);
			}),
			(this.FZr = !1),
			(this.VZr = void 0),
			(this.HZr = 0),
			(this.jZr = void 0),
			(this.WZr = !1),
			(this.IgnoreSocketName = new Set()),
			(this.KZr = new Map()),
			(this.QZr = 0),
			(this.XZr = 0),
			(this.$Zr = 0),
			(this.PendingAnIndex = -1),
			(this.wxn = new Map());
	}
	get CurrentSkill() {
		return this.DZr.get(exports.SKILL_GROUP_MAIN)?.[SKILL_GROUP_INDEX];
	}
	get DtSkillInfo() {
		return this.UZr;
	}
	set DtSkillInfo(t) {
		this.UZr = t;
	}
	GetSkillInfo(t) {
		if (this.UZr && 0 !== t) {
			if (!GlobalData_1.GlobalData.IsPlayInEditor)
				if ((e = this.LoadedSkills.get(t))) return e.SkillInfo;
			var e = t.toString();
			let o = DataTableUtil_1.DataTableUtil.GetDataTableRow(this.UZr, e);
			if (
				!(o =
					!o && this.DtSkillInfoExtra
						? DataTableUtil_1.DataTableUtil.GetDataTableRow(
								this.DtSkillInfoExtra,
								e,
							)
						: o)
			) {
				let t;
				var i = this.SIe.GetEntityType();
				i === Protocol_1.Aki.Protocol.HBs.Proto_Player
					? (t =
							ConfigManager_1.ConfigManager.WorldConfig.GetRoleCommonSkillInfo())
					: i === Protocol_1.Aki.Protocol.HBs.Proto_Monster
						? (t =
								ConfigManager_1.ConfigManager.WorldConfig.GetMonsterCommonSkillInfo())
						: i === Protocol_1.Aki.Protocol.HBs.Proto_Vision &&
							(t =
								ConfigManager_1.ConfigManager.WorldConfig.GetVisionCommonSkillInfo()),
					t && (o = DataTableUtil_1.DataTableUtil.GetDataTableRow(t, e));
			}
			return (
				o ||
					this.SIe.CustomServerEntityIds.forEach((e) => {
						(e = ModelManager_1.ModelManager.CreatureModel.GetEntity(e)) &&
							(o = e.Entity?.GetComponent(33)?.GetSkillInfo(t));
					}),
				o ||
					((i = ModelManager_1.ModelManager.CreatureModel.GetEntity(
						this.SIe.VisionSkillServerEntityId,
					)) &&
						(o = i.Entity?.GetComponent(33)?.GetSkillInfo(t))),
				o ||
					(this.SIe.VisionControlCreatureDataId &&
						(e = ModelManager_1.ModelManager.CreatureModel.GetEntity(
							this.SIe.VisionControlCreatureDataId,
						)) &&
						(o = e.Entity?.GetComponent(33)?.GetSkillInfo(t))),
				o
			);
		}
	}
	GetSkill(t) {
		return this.LoadedSkills.get(t);
	}
	GetSkillMap() {
		return this.LoadedSkills;
	}
	GetPriority(t) {
		if (this.CheckIsLoaded()) {
			var e = this.GetSkillInfo(t);
			if (e) return e.InterruptLevel;
			Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn(
					"Character",
					23,
					"没有该技能的打断等级",
					["玩家id:", this.Entity.Id],
					["skillID：", t],
				);
		}
		return -1;
	}
	OnInitData() {
		return (
			(this.VZr = new AnimNotifyStateSkillRotateStyle()),
			(this.jZr = new SkillRotateTarget()),
			CharacterSkillComponent_1.YZr ||
				((CharacterSkillComponent_1.JZr =
					CommonParamById_1.configCommonParamById.GetIntConfig(
						"jump_priority",
					)),
				(CharacterSkillComponent_1.zZr =
					CommonParamById_1.configCommonParamById.GetIntConfig("fly_priority")),
				(CharacterSkillComponent_1.YZr = !0)),
			(this.SIe = this.Entity.CheckGetComponent(0)),
			(this.Hte = this.Entity.CheckGetComponent(3)),
			!0
		);
	}
	OnStart() {
		return (
			this.ZZr(),
			this.een(),
			(this.LZr = !0),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.CharOnEndPlay,
				this.bZr,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.CharOnRoleDead,
				this.v$r,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.RemoveEntity,
				this.zpe,
			),
			EventSystem_1.EventSystem.AddWithTarget(
				this.Entity,
				EventDefine_1.EEventName.TeleportStartEntity,
				this.Gfr,
			),
			EventSystem_1.EventSystem.AddWithTarget(
				this.Entity,
				EventDefine_1.EEventName.CharBeHitAnim,
				this.qZr,
			),
			EventSystem_1.EventSystem.AddWithTarget(
				this.Entity,
				EventDefine_1.EEventName.CharSwitchControl,
				this.OnSwitchControl,
			),
			EventSystem_1.EventSystem.AddWithTarget(
				this.Entity,
				EventDefine_1.EEventName.AiHateTargetChanged,
				this.kZr,
			),
			EventSystem_1.EventSystem.AddWithTarget(
				this.Entity,
				EventDefine_1.EEventName.RoleOnStateInherit,
				this.W3r,
			),
			!0
		);
	}
	OnInit() {
		return (
			(this.eZr = this.Entity.CheckGetComponent(156)),
			(this.zJo = this.Entity.CheckGetComponent(157)),
			(this.Lie = this.Entity.CheckGetComponent(185)),
			(this.Szo = this.Entity.CheckGetComponent(17)),
			(this.mBe = this.Entity.CheckGetComponent(158)),
			(this.Gce = this.Entity.GetComponent(161)),
			(this.PZr = this.Entity.GetComponent(16)),
			(this.xZr = this.Entity.GetComponent(29)),
			(this.bre = this.Entity.GetComponent(38)),
			(this.wZr = this.Entity.GetComponent(83)),
			(this.OHr = this.Entity.GetComponent(107)),
			(this.BZr = this.Entity.GetComponent(186)),
			(this.FightStateComp = this.Entity.GetComponent(46)),
			(this.StateMachineComp = this.Entity.GetComponent(65)),
			!0
		);
	}
	OnDisable(t) {
		this.Entity.IsInit && this.StopAllSkills(t);
	}
	CheckIsLoaded() {
		return (
			this.LZr ||
				CombatDebugController_1.CombatDebugController.CombatInfo(
					"Skill",
					this.Entity,
					"SkillComponent没有加载完成",
				),
			this.LZr
		);
	}
	ZZr() {
		var t;
		PreloadDefine_1.PreloadSetting.UseNewPreload
			? (t = this.SIe.GetEntityType()) ===
				Protocol_1.Aki.Protocol.HBs.Proto_Player
				? this.ten()
				: t === Protocol_1.Aki.Protocol.HBs.Proto_Vision
					? this.ien()
					: t === Protocol_1.Aki.Protocol.HBs.Proto_Monster && this.oen()
			: this.ren();
	}
	ten() {
		const t = (0, puerts_1.$ref)(void 0),
			e =
				(UE.DataTableFunctionLibrary.GetDataTableRowNames(this.UZr, t),
				(0, puerts_1.$unref)(t));
		for (let t = 0; t < e.Num(); t++) {
			var i = Number(e.Get(t).toString()),
				o = this.GetSkillInfo(i);
			o &&
				(0 === o.SkillLoadType
					? this.nen(i, -1)
					: this.BZr?.InitSkillCdBySkillInfo(i, o));
		}
		let r;
		var l = this.Hte.CreatureData.GetVisionComponent();
		l &&
			(l = PhantomUtil_1.PhantomUtil.GetVisionData(l.VisionId)) &&
			(r = l.类型);
		for (const t of ConfigManager_1.ConfigManager.WorldConfig.GetRoleCommonSkillRowNames()) {
			var n = Number(t),
				a = this.GetSkillInfo(n);
			a &&
				((3 === a.SkillLoadType && 1 === Number(r)) ||
				(2 === a.SkillLoadType && 0 === Number(r))
					? this.nen(n, -1)
					: this.BZr?.InitSkillCdBySkillInfo(n, a));
		}
		if (this.DtSkillInfoExtra) {
			const t = (0, puerts_1.$ref)(void 0),
				e =
					(UE.DataTableFunctionLibrary.GetDataTableRowNames(
						this.DtSkillInfoExtra,
						t,
					),
					(0, puerts_1.$unref)(t));
			for (let t = 0; t < e.Num(); t++) {
				var s = Number(e.Get(t).toString()),
					h = this.GetSkillInfo(s);
				h &&
					(0 === h.SkillLoadType
						? this.nen(s, -1)
						: this.BZr?.InitSkillCdBySkillInfo(s, h));
			}
		}
	}
	ren() {
		var t =
				ControllerHolder_1.ControllerHolder.PreloadController.GetCurCharacterLoadType(),
			e = UE.KismetSystemLibrary.Conv_ClassToSoftClassReference(
				this.Hte.Actor.GetClass(),
			),
			i =
				((e = UE.KismetSystemLibrary.Conv_SoftClassReferenceToString(e)),
				ConfigManager_1.ConfigManager.WorldConfig.GetCharacterFightInfo(e));
		i ||
			CombatDebugController_1.CombatDebugController.CombatWarn(
				"Skill",
				this.Entity,
				"SkillComponent中找不到FightInfo信息",
			);
		const o = i?.SkillDataTable?.ToAssetPathName(),
			r =
				(o &&
					0 < o.length &&
					"None" !== o &&
					((h = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
						o,
						UE.DataTable,
					)) ||
						CombatDebugController_1.CombatDebugController.CombatWarn(
							"Skill",
							this.Entity,
							"SkillComponent中找不到技能表",
							["ActorPath", e],
							["技能表Path", o],
						),
					(this.UZr = h)),
				(0, puerts_1.$ref)(void 0)),
			l =
				(UE.DataTableFunctionLibrary.GetDataTableRowNames(this.UZr, r),
				(0, puerts_1.$unref)(r));
		for (let t = 0; t < l.Num(); t++) {
			var n = Number(l.Get(t).toString()),
				a = this.GetSkillInfo(n);
			a && 0 === a.SkillLoadType && this.nen(n, -1);
		}
		let s;
		var h;
		(e = this.Hte.CreatureData.GetVisionComponent()) &&
			(h = PhantomUtil_1.PhantomUtil.GetVisionData(e.VisionId)) &&
			(s = h.类型);
		let S = [];
		switch (this.SIe.GetEntityType()) {
			case Protocol_1.Aki.Protocol.HBs.Proto_Player:
				S =
					ConfigManager_1.ConfigManager.WorldConfig.GetRoleCommonSkillRowNames();
				break;
			case Protocol_1.Aki.Protocol.HBs.Proto_Vision:
				S =
					ConfigManager_1.ConfigManager.WorldConfig.GetVisionCommonSkillRowNames();
				break;
			case Protocol_1.Aki.Protocol.HBs.Proto_Monster:
				S =
					ConfigManager_1.ConfigManager.WorldConfig.GetMonsterCommonSkillRowNames();
		}
		for (const t of S) {
			var C = Number(t),
				d = this.GetSkillInfo(C);
			d &&
				((3 === d.SkillLoadType && 1 === Number(s)) ||
					(2 === d.SkillLoadType && 0 === Number(s)) ||
					0 === d.SkillLoadType) &&
				this.nen(C, -1);
		}
		const m = i?.BulletDataTable.ToAssetPathName(),
			k =
				(m &&
					0 < m.length &&
					"None" !== m &&
					((e = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
						m,
						UE.DataTable,
					)),
					(this.DtBulletInfo = e)),
				i?.HitEffectTable.ToAssetPathName());
		if (
			(k && 0 < k.length && "None" !== k
				? ((h = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
						k,
						UE.DataTable,
					)),
					(this.DtHitEffect = h))
				: (this.DtHitEffect = this.Hte.Actor.DtHitEffect),
			0 !== t)
		) {
			const o = i?.SkillDataTableMap.Get(t)?.ToAssetPathName();
			o &&
				0 < o.length &&
				"None" !== o &&
				((e = ResourceSystem_1.ResourceSystem.GetLoadedAsset(o, UE.DataTable)),
				(this.DtSkillInfoExtra = e));
			const r = (0, puerts_1.$ref)(void 0),
				l =
					(UE.DataTableFunctionLibrary.GetDataTableRowNames(
						this.DtSkillInfoExtra,
						r,
					),
					(0, puerts_1.$unref)(r));
			for (let t = 0; t < l.Num(); t++) {
				var u = Number(l.Get(t).toString()),
					g = this.GetSkillInfo(u);
				g && 0 === g.SkillLoadType && this.nen(u, -1);
			}
			const n = i?.BulletDataTableMap.Get(t)?.ToAssetPathName(),
				a =
					(n &&
						0 < n.length &&
						"None" !== n &&
						((h = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
							n,
							UE.DataTable,
						)),
						(this.DtBulletInfoExtra = h)),
					i?.HitEffectTableMap.Get(t)?.ToAssetPathName());
			a &&
				0 < a.length &&
				"None" !== a &&
				((e = ResourceSystem_1.ResourceSystem.GetLoadedAsset(a, UE.DataTable)),
				(this.DtHitEffectExtra = e));
		}
	}
	ien() {
		var t = (0, puerts_1.$ref)(void 0),
			e =
				(UE.DataTableFunctionLibrary.GetDataTableRowNames(this.UZr, t),
				(0, puerts_1.$unref)(t));
		for (let t = 0; t < e.Num(); t++) {
			var i = Number(e.Get(t).toString()),
				o = this.GetSkillInfo(i);
			o && 0 === o.SkillLoadType && this.nen(i, -1);
		}
		for (const t of ConfigManager_1.ConfigManager.WorldConfig.GetVisionCommonSkillRowNames()) {
			var r = Number(t),
				l = this.GetSkillInfo(r);
			l && 0 === l.SkillLoadType && this.nen(r, -1);
		}
	}
	oen() {}
	nen(t, e) {
		var i = this.GetSkillInfo(t);
		if (i)
			if (this.LoadedSkills.has(t))
				CombatDebugController_1.CombatDebugController.CombatInfo(
					"Skill",
					this.Entity,
					"LoadSkill失败，重复加载技能",
					["技能Id", t],
				);
			else
				try {
					var o = new Skill_1.Skill();
					(o.Initialize(t, i, this),
					this.BZr && (o.GroupSkillCdInfo = this.BZr.InitSkillCd(o)),
					this.LoadedSkills.get(t)) ||
						(this.LoadedSkills.set(t, o),
						this.KZr.set(i.SkillName.toString(), o));
				} catch (e) {
					e instanceof Error
						? CombatDebugController_1.CombatDebugController.CombatErrorWithStack(
								"Skill",
								this.Entity,
								"加载技能异常",
								e,
								["skillId", t],
								["skillId", i?.SkillName],
								["error", e.message],
							)
						: CombatDebugController_1.CombatDebugController.CombatError(
								"Skill",
								this.Entity,
								"加载技能异常",
								["skillId", t],
								["skillId", i?.SkillName],
								["error", e],
							);
				}
		else
			CombatDebugController_1.CombatDebugController.CombatError(
				"Skill",
				this.Entity,
				"LoadSkill失败，找不到技能配置数据",
				["技能Id", t],
			);
	}
	een() {
		ConfigManager_1.ConfigManager.BulletConfig.PreloadBulletData(this.Entity);
	}
	OnActivate() {
		var t,
			e,
			i = this.Entity.GetComponent(0).ComponentDataMap.get("pps")?.pps;
		if (!this.Hte.IsAutonomousProxy && i?.RMs)
			for (const o of i.RMs)
				o.T4n?.vkn &&
					((t = MathUtils_1.MathUtils.LongToNumber(o.T4n.L4n)),
					(e = MathUtils_1.MathUtils.LongToBigInt(o.s4n)),
					this.SimulatedBeginSkill(
						o.T4n.vkn,
						t,
						o.T4n.D4n,
						0.001 * o.T4n.Skn,
					)) &&
					(SkillMessageController_1.SkillMessageController.AddSkillMessageId(e),
					0 <= o.M4n) &&
					this.SimulatePlayMontage(o.T4n.vkn, o.M4n, o.R4n, o.LMs, o.TMs / 1e3);
		return !0;
	}
	OnChangeTimeDilation(t) {
		var e = this.OHr.CurrentTimeScale;
		for (const i of this.GetAllActivatedSkill()) i.SetTimeDilation(e, t);
	}
	OnEnd() {
		if (
			(EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.CharOnEndPlay,
				this.bZr,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.CharOnRoleDead,
				this.v$r,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.RemoveEntity,
				this.zpe,
			),
			EventSystem_1.EventSystem.RemoveWithTarget(
				this.Entity,
				EventDefine_1.EEventName.TeleportStartEntity,
				this.Gfr,
			),
			EventSystem_1.EventSystem.RemoveWithTarget(
				this.Entity,
				EventDefine_1.EEventName.CharBeHitAnim,
				this.qZr,
			),
			EventSystem_1.EventSystem.RemoveWithTarget(
				this.Entity,
				EventDefine_1.EEventName.CharSwitchControl,
				this.OnSwitchControl,
			),
			EventSystem_1.EventSystem.RemoveWithTarget(
				this.Entity,
				EventDefine_1.EEventName.AiHateTargetChanged,
				this.kZr,
			),
			EventSystem_1.EventSystem.RemoveWithTarget(
				this.Entity,
				EventDefine_1.EEventName.RoleOnStateInherit,
				this.W3r,
			),
			this.IgnoreSocketName.clear(),
			this.VZr.Reset(),
			this.LoadedSkills)
		)
			for (const t of this.LoadedSkills.values()) t.Clear();
		return (
			this.LoadedSkills.clear(),
			(this.OZr = !1),
			(this.IsMainSkillReadyEnd = !0),
			(this.FZr = !1),
			(this.WZr = !1),
			(this.QZr = 0),
			(this.XZr = 0),
			(this.HZr = 0),
			(this.$Zr = 0),
			(this.LZr = !1),
			void 0 !== this.NZr &&
				(TimerSystem_1.TimerSystem.Remove(this.NZr), (this.NZr = void 0)),
			!0
		);
	}
	OnClear() {
		return !0;
	}
	AttachEffectToSkill(t, e, i, o) {
		var r, l;
		this.CheckIsLoaded() &&
			(r = this.CurrentSkill) &&
			((l = this.OHr.CurrentTimeScale),
			EffectSystem_1.EffectSystem.SetTimeScale(t, l * this.TimeDilation),
			r.AttachEffect(t, e, i, o));
	}
	sen(t) {
		let e = 1;
		return (
			0 === (t = t.SkillInfo).SkillGenre
				? (e =
						1e-4 * this.eZr.GetCurrentValue(EAttributeId.Proto_AutoAttackSpeed))
				: 1 === t.SkillGenre &&
					(e =
						1e-4 *
						this.eZr.GetCurrentValue(EAttributeId.Proto_CastAttackSpeed)),
			e <= 0 ? 1 : e
		);
	}
	PlaySkillMontage(t, e, i, o, r) {
		var l = this.CurrentSkill;
		return l
			? l.IsSimulated
				? (CombatDebugController_1.CombatDebugController.CombatError(
						"Skill",
						this.Entity,
						"播放技能蒙太奇时，当前技能是模拟技能",
						["montageIndex", e],
					),
					!1)
				: (!t || !this.Lie.HasTag(-1503953470)) &&
					(this.mBe.ExitHitState("播放技能蒙太奇"),
					(t = this.sen(l)),
					(r = l.PlayMontage(e, t, i, o, r)) &&
						SkillMessageController_1.SkillMessageController.MontageRequest(
							this.Entity,
							1,
							l.SkillId?.toString(),
							this.SkillTarget?.Id ?? 0,
							e,
							t,
							i,
							o,
							l.CombatMessageId,
							l.MontageContextId,
						),
					r)
			: (CombatDebugController_1.CombatDebugController.CombatError(
					"Skill",
					this.Entity,
					"播放技能蒙太奇时，当前技能不存在",
					["montageIndex", e],
				),
				!1);
	}
	EndOwnerAndFollowSkills() {
		this.StopAllSkills("CharacterSkillComponent.EndOwnerAndFollowSkills");
		var t = this.Entity.GetComponent(47)?.FollowIds;
		if (t)
			for (const i of t) {
				var e = EntitySystem_1.EntitySystem.Get(i)?.GetComponent(33);
				e && e.StopAllSkills("CharacterSkillComponent.EndOwnerAndFollowSkills");
			}
	}
	StopAllSkills(t) {
		if (this.CheckIsLoaded())
			for (const e of this.GetAllActivatedSkill()) this.aen(e, t);
	}
	StopGroup1Skill(t) {
		var e;
		this.CheckIsLoaded() && (e = this.CurrentSkill) && this.aen(e, t);
	}
	EndSkill(t, e) {
		this.CheckIsLoaded() &&
			(t = this.LoadedSkills.get(t))?.Active &&
			this.hen(t, e);
	}
	len(t, e, i) {
		var o = t.SkillInfo.GroupId,
			r = t.SkillInfo.InterruptLevel;
		return this._en(o, r, e, i, t);
	}
	CheckJumpCanInterrupt() {
		return this._en(exports.SKILL_GROUP_MAIN, CharacterSkillComponent_1.JZr);
	}
	CheckGlideCanInterrupt() {
		return this._en(exports.SKILL_GROUP_MAIN, CharacterSkillComponent_1.zZr);
	}
	_en(t, e, i = [], o = [], r) {
		let l = !0;
		if (t === exports.SKILL_GROUP_MAIN) {
			var n,
				a,
				s,
				h = this.CurrentSkill;
			h &&
				((S = (n = h.SkillInfo).InterruptLevel < e),
				(a = n.InterruptLevel === e && this.OZr),
				(s = this.IsMainSkillReadyEnd),
				S || a || s
					? i.push(h)
					: ((l = !1),
						o.push(n.InterruptLevel.toString()),
						o.push(e.toString()),
						o.push(this.OZr.toString()),
						o.push(this.IsMainSkillReadyEnd.toString())));
		} else {
			var S = this.DZr.get(t);
			if (S)
				for (const t of S) {
					if (this.IsSkillInCd(t.SkillId)) {
						(l = !1), o.push(`技能${t.SkillId}处于CD中`);
						break;
					}
					t === r && i.push(t);
				}
		}
		return l || (i.length = 0), l;
	}
	aen(t, e) {
		t?.Active &&
			(t.IsSimulated
				? this.SimulateEndSkill(t.SkillId)
				: (EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.CharInterruptSkill,
						this.Entity.Id,
						t.SkillId,
					),
					this.hen(t, e)));
	}
	hen(t, e) {
		CombatDebugController_1.CombatDebugController.CombatInfo(
			"Skill",
			this.Entity,
			"CharacterSkillComponent.RequestEndSkill",
			["结束技能ID", t.SkillId],
			["结束技能名称", t.SkillName],
			["Reason", e],
			["CanInterrupt", this.OZr],
			["ReadyEnd", this.IsMainSkillReadyEnd],
			["InterruptLevel", t.SkillInfo.InterruptLevel],
		),
			this.BZr?.ResetMultiSkills(t.SkillId),
			this.BZr?.ResetCdDelayTime(t.SkillId),
			1 === (e = t.SkillInfo.SkillMode)
				? t.ActiveAbility?.IsValid()
					? t.ActiveAbility.K2_EndAbility()
					: CombatDebugController_1.CombatDebugController.CombatError(
							"Skill",
							this.Entity,
							"[CharacterSkillComponent.RequestEndSkill]技能结束失败，找不到GA（判断一下是否被动GA，如果是，不能主动执行）",
							["技能ID", t.SkillId],
							["技能名称", t.SkillName],
						)
				: 0 === e && t.RequestStopMontage();
	}
	IsSkillGenreForbidden(t) {
		switch (t.SkillGenre) {
			case 0:
				return this.Lie.HasTag(866007727);
			case 1:
				return this.Lie.HasTag(443489183);
			case 2:
				return this.Lie.HasTag(495657548);
			case 3:
				return this.Lie.HasTag(-592555498);
			case 4:
			case 5:
			case 8:
				break;
			case 6:
				return this.Lie.HasTag(-1390464883);
			case 7:
				return this.Lie.HasTag(1072084846);
			case 9:
				return this.Lie.HasTag(1195493782);
			case 10:
				return this.Lie.HasTag(283451623);
			case 11:
				return this.Lie.HasTag(-1936884442);
		}
		return !1;
	}
	uen(t, e) {
		var i,
			o = t.SkillInfo;
		return this.Hte.IsAutonomousProxy || o.AutonomouslyBySimulate
			? this.Lie.HasTag(-1388400236)
				? "角色处于不可控制状态"
				: this.Lie.HasTag(1008164187)
					? "角色处于死亡状态"
					: this.PZr?.IsFrozen()
						? "角色处于冰冻状态"
						: this.IsSkillGenreForbidden(o)
							? "该类别技能被临时禁止"
							: 8 === o.SkillGenre
								? "不能主动调用被动技能"
								: t.AbilityClass &&
										t.AbilityClass.IsChildOf(UE.Ga_Passive_C.StaticClass())
									? "策划可能误把被动GA放在普攻0技能组里"
									: this.IsSkillInCd(t.SkillId)
										? "技能处于CD中"
										: 0 !== o.StrengthCost &&
												FormationAttributeController_1.FormationAttributeController.GetValue(
													1,
												) <= 1
											? "体力不足"
											: this.BZr?.IsMultiSkill(t.SkillInfo) &&
													!this.BZr.CanStartMultiSkill(t)
												? "多段技能启动失败"
												: ((o = this.SIe.GetEntityType()),
													(i =
														this.bre?.AiController?.IsWaitingSwitchControl()),
													o === Protocol_1.Aki.Protocol.HBs.Proto_Monster &&
													!t.SkillInfo.AutonomouslyBySimulate &&
													i
														? "在等待切换控制权期间，不允许释放普通技能"
														: this.len(t, e, (o = []))
															? ""
															: "技能打断失败[" + o.join(",") + "]")
			: "非主控无权限释放技能";
	}
	cen(t) {
		var e;
		return (
			!this.LoadedSkills.has(t) &&
				PreloadDefine_1.PreloadSetting.UseNewPreload &&
				((e = this.Entity.GetComponent(194)).LoadSkillAsync(t),
				e.FlushSkill(t),
				this.nen(t, -1),
				CombatDebugController_1.CombatDebugController.CombatInfo(
					"Skill",
					this.Entity,
					"CharacterSkillComponent.赋予技能",
					["技能Id", t],
				)),
			this.LoadedSkills.get(t)
		);
	}
	BeginSkill(t, e = {}) {
		if (!this.CheckIsLoaded()) return !1;
		const i = this.cen(t);
		if (!i)
			return (
				CombatDebugController_1.CombatDebugController.CombatError(
					"Skill",
					this.Entity,
					"BeginSkill使用了不存在的技能",
					["技能Id", t],
				),
				!1
			);
		CombatDebugController_1.CombatDebugController.CombatInfo(
			"Skill",
			this.Entity,
			"CharacterSkillComponent.BeginSkill",
			["技能Id", t],
			["技能名", i.SkillName],
			["上下文", e.Context],
		);
		var o = [];
		if ((r = this.uen(i, o)))
			return (
				CombatDebugController_1.CombatDebugController.CombatInfo(
					"Skill",
					this.Entity,
					"CharacterSkillComponent.CheckSkillCanBegin条件不满足",
					["技能Id", t],
					["技能名", i.SkillName],
					["当前技能", this.CurrentSkill?.SkillId],
					["当前技能名", this.CurrentSkill?.SkillName],
					["原因", r],
				),
				!1
			);
		o.forEach((t) => {
			this.aen(t, "开始新技能");
		});
		var r = this.GetSkillInfo(t),
			l =
				((o = this.Hte?.IsAutonomousProxy ?? !1),
				this.StateMachineComp?.StateMachineGroup?.IsCurrentTaskSkill(t));
		if (this.FightStateComp && r.GroupId === exports.SKILL_GROUP_MAIN && !l) {
			if (!(l = this.FightStateComp.TrySwitchSkillState(i.SkillInfo, !0)))
				return (
					CombatDebugController_1.CombatDebugController.CombatInfo(
						"Skill",
						this.Entity,
						"技能释放失败，状态不满足",
						["技能Id", t],
						["技能名", i.SkillName],
					),
					!1
				);
			i.FightStateHandle = l;
		} else i.FightStateHandle = 0;
		if (
			(this.men(e.Target, e.SocketName, r.SkillTarget),
			(i.PreContextId = e.ContextId),
			EventSystem_1.EventSystem.EmitWithTarget(
				this.Entity,
				EventDefine_1.EEventName.CharBeforeSkillWithTarget,
				t,
				o,
			),
			1 === (l = r.SkillMode))
		) {
			if (
				((this.AZr = i),
				CombatDebugController_1.CombatDebugController.CombatDebug(
					"Skill",
					this.Entity,
					"GASkill TryActivateAbilityByClass",
					["技能Id", t],
					["技能名", i.SkillName],
					["GaClass", i.AbilityClass?.GetName()],
				),
				!this.Szo.TryActivateAbilityByClass(i.AbilityClass, !0))
			)
				return (
					CombatDebugController_1.CombatDebugController.CombatError(
						"Skill",
						this.Entity,
						"执行GA失败!:",
						["技能Id:", i.SkillId],
						["技能名", i.SkillName],
						["GaClass:", i.AbilityClass?.GetName()],
					),
					(this.AZr = void 0),
					(this.SkillTarget = void 0),
					(this.SkillTargetSocket = ""),
					!1
				);
		} else
			0 === l &&
				(this.den(i),
				i.HasMontages
					? (CombatDebugController_1.CombatDebugController.CombatDebug(
							"Skill",
							this.Entity,
							"SimpleSkill PlaySkillMontage",
							["技能Id", i.SkillId],
							["技能名", i.SkillName],
						),
						this.PlaySkillMontage(!1, 0, "", 0, () => {
							CombatDebugController_1.CombatDebugController.CombatDebug(
								"Skill",
								this.Entity,
								"PlaySkillMontage onCompleted",
								["技能Id", i.SkillId],
								["技能名", i.SkillName],
							),
								this.DoSkillEnd(i);
						}))
					: (CombatDebugController_1.CombatDebugController.CombatInfo(
							"Skill",
							this.Entity,
							"SimpleSkill No Montage",
							["技能Id", i.SkillId],
							["技能名", i.SkillName],
						),
						this.DoSkillEnd(i)));
		return (
			r.AutonomouslyBySimulate &&
				this.Hte.SetMoveControlled(!0, r.MoveControllerTime, "特殊技能"),
			(e = this.Entity.Id),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.CharUseSkill,
				e,
				i.SkillId,
				o,
			),
			SceneTeamController_1.SceneTeamController.EmitEvent(
				this.Entity,
				EventDefine_1.EEventName.CharUseSkill,
				e,
				i.SkillId,
				o,
			),
			EventSystem_1.EventSystem.EmitWithTarget(
				this.Entity,
				EventDefine_1.EEventName.CharRecordOperate,
				this.SkillTarget,
				i.SkillId,
				r.SkillGenre,
			),
			this.zJo?.TriggerEvents(2, this.zJo, {
				SkillId: Number(i.SkillId),
				SkillGenre: r.SkillGenre,
			}),
			!0
		);
	}
	Cen(t, e) {
		return (
			!this.eZr.IsDeathInternal ||
			(Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn(
					"Battle",
					20,
					"[CBT2临时处理]角色处于死亡中，暂不接受远端通知释放技能。",
					["skillId", t.SkillId],
					["entity", this.Entity.toString()],
				),
			!1)
		);
	}
	SimulatedBeginSkill(t, e, i = !1, o = 0, r = BigInt(0)) {
		var l = this.cen(t);
		if (!l)
			return (
				CombatDebugController_1.CombatDebugController.CombatError(
					"Skill",
					this.Entity,
					"远端释放不存在的技能",
					["技能Id", t],
				),
				!1
			);
		if (
			l.AbilityClass &&
			l.AbilityClass.IsChildOf(UE.Ga_Passive_C.StaticClass())
		)
			return (
				CombatDebugController_1.CombatDebugController.CombatWarn(
					"Skill",
					this.Entity,
					"被动技能不模拟",
					["技能Id", t],
				),
				!1
			);
		if (
			(l.Active &&
				l.IsSimulated &&
				CombatDebugController_1.CombatDebugController.CombatWarn(
					"Skill",
					this.Entity,
					"重复释放远端技能",
					["技能Id", t],
				),
			!this.Cen(l, i))
		)
			return !1;
		var n = l.SkillInfo,
			a = this.StateMachineComp?.StateMachineGroup?.IsCurrentTaskSkill(t);
		if (
			this.FightStateComp &&
			l.SkillInfo.GroupId === exports.SKILL_GROUP_MAIN &&
			!a
		) {
			if (!(a = this.FightStateComp.TrySwitchSkillState(l.SkillInfo, !1)))
				return !1;
			l.FightStateHandle = a;
		} else l.FightStateHandle = 0;
		return (
			CombatDebugController_1.CombatDebugController.CombatInfo(
				"Skill",
				this.Entity,
				"执行远端技能",
				["技能Id", t],
				["技能名", l.SkillName],
				["特殊技能", i],
				["打断等级", n.InterruptLevel],
			),
			i &&
				(this.CurrentSkill && this.aen(this.CurrentSkill, "远端特殊技能"),
				this.Hte.SetMoveControlled(!1, o, "远端特殊技能")),
			this.Entity.GetComponent(158).ExitHitState("远端释放技能"),
			this.gen(n.GroupId, l),
			l.SimulatedBeginSkill(r),
			(this.IsMainSkillReadyEnd = !1),
			(this.SkillTarget =
				ModelManager_1.ModelManager.CreatureModel.GetEntity(e)),
			!0
		);
	}
	SimulateEndSkill(t) {
		var e = this.LoadedSkills.get(t);
		e
			? e.Active && e.IsSimulated
				? (CombatDebugController_1.CombatDebugController.CombatInfo(
						"Skill",
						this.Entity,
						"结束远端技能",
						["技能Id", t],
						["技能名", e.SkillName],
					),
					this.fen(e.SkillInfo.GroupId, e),
					e.EndSkill(),
					(this.IsMainSkillReadyEnd = !1),
					e.SkillInfo.AutonomouslyBySimulate &&
						this.Hte.ResetMoveControlled("模拟端结束特殊技能"),
					SceneTeamController_1.SceneTeamController.EmitEvent(
						this.Entity,
						EventDefine_1.EEventName.OnSkillEnd,
						this.Entity.Id,
						e.SkillId,
					),
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.OnSkillEnd,
						this.Entity.Id,
						t,
					))
				: CombatDebugController_1.CombatDebugController.CombatWarn(
						"Skill",
						this.Entity,
						"结束远端技能失败，技能未激活或非模拟执行",
						["技能Id", t],
						["技能名", e.SkillName],
					)
			: CombatDebugController_1.CombatDebugController.CombatError(
					"Skill",
					this.Entity,
					"远端结束不存在的技能",
					["技能Id", t],
				);
	}
	OnActivateAbility(t, e) {
		if (t.IsA(UE.Ga_Passive_C.StaticClass())) {
			const e = this.wxn.get(t.GetClass());
			return (
				e
					? (((o = t).当前技能数据名 = e.toString()), (o.SkillId = e))
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Battle",
							36,
							"被动GA没找到skillId",
							["skillId", e],
							["ga", t.GetName()],
						),
				-1
			);
		}
		if (!this.AZr)
			return (
				CombatDebugController_1.CombatDebugController.CombatError(
					"Skill",
					this.Entity,
					"GA已启动，但没有找到对应技能",
					["GA", t.GetName()],
				),
				-1
			);
		CombatDebugController_1.CombatDebugController.CombatDebug(
			"Skill",
			this.Entity,
			"CharacterSkillComponent.OnActivateAbility",
			["技能Id", this.AZr.SkillId],
			["GA", t.GetName()],
		),
			(this.AZr.ActiveAbility = t);
		const i = this.AZr.SkillId;
		var o;
		return (
			t.IsA(UE.GA_Base_C.StaticClass()) &&
				(((o = t).当前技能数据 = this.AZr.SkillInfo),
				(o.当前技能数据名 = this.AZr.SkillId.toString()),
				(o.SkillId = i)),
			this.den(this.AZr),
			(this.AZr = void 0),
			i
		);
	}
	OnEndAbility(t, e) {
		for (const e of this.GetAllActivatedSkill())
			if (e.ActiveAbility === t) return void this.DoSkillEnd(e);
		CombatDebugController_1.CombatDebugController.CombatWarn(
			"Skill",
			this.Entity,
			"[CharacterSkillComponent.OnEndAbility]GA已结束，但没有找到对应技能",
			["GA", t.GetName()],
		);
	}
	men(t, e, i) {
		t
			? ((this.SkillTarget =
					t instanceof Entity_1.Entity
						? ModelManager_1.ModelManager.CharacterModel.GetHandleByEntity(t)
						: ActorUtils_1.ActorUtils.GetEntityByActor(t)),
				(this.SkillTargetSocket = e ?? ""))
			: this.xZr?.Valid
				? this.SelectTargetAndSetShow(i)
				: (this.bre?.Valid
						? (this.SkillTarget =
								this.bre.AiController.AiHateList.GetCurrentTarget())
						: (this.SkillTarget = void 0),
					(this.SkillTargetSocket = ""));
	}
	SelectTargetAndSetShow(t) {
		this.xZr?.Valid &&
			(this.xZr.SelectSoftLockTarget(
				t.LockOnConfigId,
				t.SkillTargetDirection,
				t.SkillTargetPriority,
				t.ShowTarget,
			),
			(this.SkillTarget = this.xZr.GetCurrentTarget()),
			(this.SkillTargetSocket = this.xZr.GetCurrentTargetSocketName()));
	}
	den(t) {
		if (!this.RZr.has(t.SkillId)) {
			this.RZr.add(t.SkillId),
				CombatDebugController_1.CombatDebugController.CombatDebug(
					"Skill",
					this.Entity,
					"CharacterSkillComponent.DoSkillBegin",
					["技能Id", t.SkillId],
					["技能名", t.SkillName],
				);
			var e = this.GetSkillInfo(t.SkillId),
				i =
					(t.BeginSkill(),
					this.gen(e.GroupId, t),
					SkillMessageController_1.SkillMessageController.UseSkillRequest(
						this.Entity,
						t,
						this.SkillTarget?.Id ?? 0,
					),
					this.pen(t),
					this.BZr?.IsMultiSkill(t.SkillInfo) &&
						this.BZr.StartMultiSkill(t, !1),
					this.BZr?.StartCd(t.SkillId),
					0 < Math.abs(e.StrengthCost) &&
						FormationAttributeController_1.FormationAttributeController.AddValue(
							1,
							e.StrengthCost,
						),
					this.GetSkillLevelBySkillInfoId(t.SkillId));
			if (
				(e.GroupId === exports.SKILL_GROUP_MAIN &&
					(this.IsMainSkillReadyEnd = !1),
				t.BeginSkillBuffAndTag(i),
				this.mBe.ExitHitState("释放技能"),
				t.HasAnimTag || this.mBe.ExitAimStatus(),
				this.xZr?.Valid)
			)
				switch (e.SkillTarget.SkillTargetDirection) {
					case 0:
						this.SkillTarget?.Valid ? this.ven() : this.Men();
						break;
					case 1:
						this.Men();
						break;
					case 3:
						this.Sen();
				}
			if (
				(e.WalkOffLedge && this.Gce.SetWalkOffLedgeRecord(!1),
				exports.SKILL_GROUP_MAIN === e.GroupId)
			)
				switch (
					(this.Gce &&
						6 === this.Gce.CharacterMovement.MovementMode &&
						((i = this.Gce.CharacterMovement.CustomMovementMode) ===
						CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_GLIDE
							? (e = this.Entity.GetComponent(50)).Valid && e.ExitGlideState()
							: i === CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_SOAR &&
								(e = this.Entity.GetComponent(50)).Valid &&
								e.ExitSoarState()),
					(i = this.mBe.MoveState))
				) {
					case CharacterUnifiedStateTypes_1.ECharMoveState.Sprint:
						this.Lie.HasTag(-1800191060) ||
							(this.Lie.RemoveTag(388142570),
							this.zJo.RemoveBuffByTag(388142570, `技能${t.SkillId}结束移动`),
							this.mBe.SetMoveState(
								CharacterUnifiedStateTypes_1.ECharMoveState.Run,
							));
						break;
					case CharacterUnifiedStateTypes_1.ECharMoveState.WalkStop:
					case CharacterUnifiedStateTypes_1.ECharMoveState.RunStop:
					case CharacterUnifiedStateTypes_1.ECharMoveState.SprintStop:
						this.mBe.SetMoveState(
							CharacterUnifiedStateTypes_1.ECharMoveState.Stand,
						);
				}
			(this.Gce.CharacterMovement.OverrideTerminalVelocity = 99999),
				this.Gce.SetFallingHorizontalMaxSpeed(99999),
				this.RZr.delete(t.SkillId);
		}
	}
	DoSkillEnd(t) {
		var e;
		this.RZr.has(t.SkillId) ||
			(this.RZr.add(t.SkillId),
			CombatDebugController_1.CombatDebugController.CombatInfo(
				"Skill",
				this.Entity,
				"CharacterSkillComponent.DoSkillEnd",
				["技能Id", t.SkillId],
				["技能名", t.SkillName],
			),
			(e = t.SkillInfo),
			this.Een(t),
			e.GroupId === exports.SKILL_GROUP_MAIN &&
				((this.OZr = !1), (this.IsMainSkillReadyEnd = !0), (this.$Zr = 0)),
			e.WalkOffLedge && this.Gce.SetWalkOffLedgeRecord(!0),
			(this.Gce.CharacterMovement.OverrideTerminalVelocity = 0),
			this.Gce.ClearFallingHorizontalMaxSpeed(),
			this.fen(e.GroupId, t),
			t.EndSkill(),
			this.zJo.HasBuffAuthority() &&
				this.zJo.RemoveBuff(CharacterBuffIds_1.buffId.GoDown, -1, "技能结束"),
			this.Lie.HasTag(-242791826) && this.Lie.RemoveTag(-242791826),
			SkillMessageController_1.SkillMessageController.EndSkillRequest(
				this.Entity,
				t.SkillId,
			),
			SceneTeamController_1.SceneTeamController.EmitEvent(
				this.Entity,
				EventDefine_1.EEventName.OnSkillEnd,
				this.Entity.Id,
				t.SkillId,
			),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnSkillEnd,
				this.Entity.Id,
				t.SkillId,
			),
			this.zJo?.TriggerEvents(3, this.zJo, {
				SkillId: Number(t.SkillId),
				SkillGenre: e.SkillGenre,
			}),
			this.RZr.delete(t.SkillId));
	}
	PlaySkillMontage2Server(t, e, i, o, r) {
		(t = this.LoadedSkills.get(t)) &&
			(ModelManager_1.ModelManager.CombatMessageModel.RemoveCombatContext(
				t.MontageContextId,
			),
			(t.MontageContextId =
				ModelManager_1.ModelManager.CombatMessageModel.CreateMontageContext(
					t.SkillId,
					e,
				)),
			SkillMessageController_1.SkillMessageController.MontageRequest(
				this.Entity,
				1,
				t.SkillId?.toString(),
				this.SkillTarget?.Id ?? 0,
				e,
				i,
				o,
				r,
				t.CombatMessageId,
				t.MontageContextId,
			));
	}
	EndSkillMontage(t, e) {
		var i,
			o = this.LoadedSkills.get(t);
		o &&
			(i = ModelManager_1.ModelManager.CombatMessageModel.GetCombatContext(
				o.MontageContextId,
			)?.v4n) &&
			i.vkn === t &&
			i.M4n === e &&
			(ModelManager_1.ModelManager.CombatMessageModel.RemoveCombatContext(
				o.MontageContextId,
			),
			(o.MontageContextId = void 0));
	}
	SimulatePlayMontage(t, e = 0, i = 1, o = "", r = 0) {
		(t = this.LoadedSkills.get(t)) && t.PlayMontage(e, i, o, r);
	}
	RollingGrounded() {
		var t = this.Entity.GetComponent(33);
		t.Valid &&
			((t.IsMainSkillReadyEnd = !1),
			(this.NZr = TimerSystem_1.TimerSystem.Delay(this.GZr, 600))),
			this.mBe.PositionState ===
				CharacterUnifiedStateTypes_1.ECharPositionState.Ground &&
				this.mBe.SetMoveState(
					CharacterUnifiedStateTypes_1.ECharMoveState.LandRoll,
				);
	}
	IsSkillInCd(t) {
		return !!this.BZr && this.BZr.IsSkillInCd(t);
	}
	GetCurrentMontageCorrespondingSkillId() {
		var t,
			e,
			i = this.Szo?.GetCurrentWaitAndPlayedMontageCorrespondingGa();
		for ([t, e] of this.LoadedSkills)
			if (e.Active && e.ActiveAbility === i) return t;
		return (
			Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn("Character", 23, "不存在该GA的技能", [
					"玩家id",
					this.Entity.Id,
				]),
			0
		);
	}
	get SkillAcceptInput() {
		return this.OZr;
	}
	SetSkillAcceptInput(t) {
		(this.OZr = t),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.SkillAcceptChanged,
				this.CurrentSkill?.SkillId ?? 0,
				this.OZr,
			);
	}
	xDn() {
		var t = this.CurrentSkill;
		t &&
			(t.SkillInfo.SkillTarget.TargetDied
				? (this.xZr?.Valid &&
						this.SelectTargetAndSetShow(t.SkillInfo.SkillTarget),
					this.bre?.Valid &&
						(t = this.bre.AiController.AiHateList.GetCurrentTarget()) &&
						t.Id !== this.SkillTarget?.Id &&
						(this.SkillTarget =
							ModelManager_1.ModelManager.CharacterModel.GetHandleByEntity(
								t.Entity,
							)))
				: ((this.SkillTarget = void 0), (this.SkillTargetSocket = "")));
	}
	GetTargetTransform() {
		if (
			(t = this.SkillTarget.Entity.GetComponent(0).GetEntityType()) !==
				Protocol_1.Aki.Protocol.HBs.Proto_Player &&
			t !== Protocol_1.Aki.Protocol.HBs.Proto_Npc &&
			t !== Protocol_1.Aki.Protocol.HBs.Proto_Monster &&
			t !== Protocol_1.Aki.Protocol.HBs.Proto_Vision
		)
			return this.SkillTarget.Entity.GetComponent(1).ActorTransform;
		{
			let o = this.SkillTargetSocket;
			o = o || "HitCase";
			var t,
				e = (t = this.SkillTarget.Entity.GetComponent(3)).Actor.Mesh,
				i = FNameUtil_1.FNameUtil.GetDynamicFName(o);
			return e?.DoesSocketExist(i)
				? e.GetSocketTransform(i, 0)
				: t.ActorTransform;
		}
	}
	GetTargetDistance() {
		var t;
		return this.SkillTarget && (t = this.GetTargetTransform())
			? (this.Lz.FromUeVector(t.GetLocation()),
				Vector_1.Vector.Dist(this.Hte.ActorLocationProxy, this.Lz))
			: -1;
	}
	SetSkillCanRotate(t) {
		(this.FZr = t) || this.VZr.Reset();
	}
	SetSkillRotateSpeed(t) {
		this.HZr = t;
	}
	SetRotateTarget(t, e) {
		(this.jZr.Target = t), (this.jZr.Type = e);
	}
	SetSkillRotateToTarget(t, e, i, o = 0, r = 0) {
		(this.WZr = t),
			(this.VZr.IsUseAnsRotateOffset = e),
			(this.VZr.AnsRotateOffset.Yaw = -MathUtils_1.MathUtils.Clamp(
				i,
				-MathUtils_1.PI_DEG,
				MathUtils_1.PI_DEG,
			)),
			(this.VZr.PauseRotateThreshold = o),
			(this.VZr.ResumeRotateThreshold = r);
	}
	SetIgnoreSocketName(t) {
		this.IgnoreSocketName.add(t.toString());
	}
	DeleteIgnoreSocketName(t) {
		this.IgnoreSocketName.delete(t.toString());
	}
	Men() {
		this.Hte.IsAutonomousProxy &&
			this.IsHasInputDir() &&
			(this.Gue.FromUeRotator(this.yen()),
			this.Z_e.Set(
				this.Hte.ActorLocationProxy,
				this.Gue.Quaternion(),
				this.Hte.ActorScaleProxy,
			),
			this.Hte.SetActorTransform(
				this.Z_e.ToUeTransform(),
				"释放技能.转向输入方向",
				!1,
				1,
			));
	}
	IsHasInputDir() {
		var t;
		return (
			!!this.CheckIsLoaded() &&
			((t = this.Hte.InputDirectProxy), 0 < Math.abs(t.X) || 0 < Math.abs(t.Y))
		);
	}
	Sen() {
		this.Gue.FromUeRotator(
			Global_1.Global.CharacterCameraManager.GetCameraRotation(),
		),
			this.Gue.Vector(this.Lz),
			MathUtils_1.MathUtils.LookRotationUpFirst(
				this.Lz,
				Vector_1.Vector.UpVectorProxy,
				this.Gue,
			),
			this.Z_e.Set(
				this.Hte.ActorLocationProxy,
				this.Gue.Quaternion(),
				this.Hte.ActorScaleProxy,
			),
			this.Hte.SetActorTransform(
				this.Z_e.ToUeTransform(),
				"释放技能.转向摄像机方向",
				!1,
				1,
			);
	}
	ven() {
		this.SkillTarget &&
			(this.Lz.FromUeVector(this.GetTargetTransform().GetLocation()),
			this.Lz.SubtractionEqual(this.Hte.ActorLocationProxy),
			MathUtils_1.MathUtils.LookRotationUpFirst(
				this.Lz,
				Vector_1.Vector.UpVectorProxy,
				this.Gue,
			),
			this.Hte.SetActorRotation(
				this.Gue.ToUeRotator(),
				"释放技能.转向技能目标",
				!1,
			));
	}
	yen() {
		return this.Hte.InputRotator;
	}
	UpdateAllSkillRotator(t) {
		if (!this.CheckIsLoaded() || !this.Gce) return !1;
		if (this.Lie.HasTag(504239013)) return !1;
		if (!this.FZr) return !1;
		if (!this.Hte.IsMoveAutonomousProxy) return !1;
		var e = Math.abs(this.HZr);
		if (this.WZr) {
			var i = this.Ien();
			if (!i) return !1;
			MathUtils_1.MathUtils.LookRotationUpFirst(
				i,
				Vector_1.Vector.UpVectorProxy,
				this.Gue,
			),
				this.Gce.SmoothCharacterRotation(
					this.Gue,
					e,
					t,
					!1,
					"Skill.UpdateAllSkillRotator",
				);
		} else
			this.Gce.SmoothCharacterRotation(
				this.yen(),
				e,
				t,
				!1,
				"Skill.UpdateAllSkillRotator",
			);
		return !0;
	}
	Ien() {
		var t = this.Hte.ActorLocationProxy;
		switch (this.jZr.Type) {
			case 0:
				return this.SkillTarget
					? ((e = this.SkillTarget.Entity.CheckGetComponent(1)), this.Den(e, t))
					: void 0;
			case 1:
				var e = this.jZr.Target;
				return this.Dxr.DeepCopy(e), this.Dxr.SubtractionEqual(t), this.Dxr;
			case 2:
				e = this.jZr.Target;
				return this.Dxr.DeepCopy(e), this.Dxr;
			case 3:
			case 6: {
				let i;
				return (i =
					3 === this.jZr.Type
						? BlackboardController_1.BlackboardController.GetEntityIdByEntity(
								this.Entity.Id,
								this.jZr.Target,
							)
						: BlackboardController_1.BlackboardController.GetIntValueByEntity(
								this.Entity.Id,
								this.jZr.Target,
							))
					? ((e = EntitySystem_1.EntitySystem.Get(i).CheckGetComponent(1)),
						this.Dxr.DeepCopy(e.ActorLocationProxy),
						this.Dxr.SubtractionEqual(t),
						this.Dxr)
					: void 0;
			}
			case 4:
				return (e =
					BlackboardController_1.BlackboardController.GetVectorValueByEntity(
						this.Entity.Id,
						this.jZr.Target,
					))
					? (this.Dxr.DeepCopy(e), this.Dxr.SubtractionEqual(t), this.Dxr)
					: void 0;
			case 5:
				return (e =
					BlackboardController_1.BlackboardController.GetVectorValueByEntity(
						this.Entity.Id,
						this.jZr.Target,
					))
					? (this.Dxr.DeepCopy(e), this.Dxr)
					: void 0;
			default:
				return;
		}
	}
	Den(t, e) {
		var i = this.CurrentSkill;
		let o;
		return (
			(o = i ? this.GetTargetTransform() : o)
				? this.Dxr.FromUeVector(o.GetLocation())
				: this.Dxr.DeepCopy(t.ActorLocationProxy),
			this.Dxr.SubtractionEqual(e),
			this.Dxr.Normalize(),
			this.VZr.IsUseAnsRotateOffset &&
				0 !== this.VZr.AnsRotateOffset.Yaw &&
				((this.Dxr.Z = 0),
				this.VZr.AnsRotateOffset.Quaternion().RotateVector(this.Dxr, this.Dxr)),
			(i = this.Hte.ActorForwardProxy),
			(t = Math.abs(MathUtils_1.MathUtils.GetAngleByVectorDot(this.Dxr, i))),
			this.VZr.IsPaused
				? 0 < this.VZr.ResumeRotateThreshold &&
					(t < this.VZr.ResumeRotateThreshold
						? this.Dxr.DeepCopy(i)
						: (this.VZr.IsPaused = !1))
				: 0 < this.VZr.PauseRotateThreshold &&
					t < this.VZr.PauseRotateThreshold &&
					((this.VZr.IsPaused = !0), this.Dxr.DeepCopy(i)),
			this.Dxr
		);
	}
	GetPointTransform(t) {
		var e;
		return this.CheckIsLoaded() && (e = this.Hte.Actor.Mesh)?.DoesSocketExist(t)
			? e.GetSocketTransform(t, 0)
			: void 0;
	}
	GetSkillByName(t) {
		return this.KZr.get(t);
	}
	get SkillElevationAngle() {
		return this.QZr;
	}
	SetSkillElevationAngle(t) {
		this.QZr = t;
	}
	get LastActivateSkillTime() {
		return this.XZr;
	}
	SetLastActivateSkillTime(t) {
		this.XZr = t;
	}
	get CurrentPriority() {
		return this.$Zr;
	}
	SetCurrentPriority(t) {
		this.$Zr = t;
	}
	HasAbility(t) {
		return !!this.CheckIsLoaded() && this.LoadedSkills.has(t);
	}
	SetSkillPriority(t, e) {
		this.CheckIsLoaded() &&
			(t = this.LoadedSkills.get(t))?.Active &&
			t.SetSkillPriority(e);
	}
	CallAnimBreakPoint() {
		this.CheckIsLoaded() &&
			(this.Lie.HasTag(-242791826) || this.Lie.AddTag(-242791826),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.CharAnimBreakPoint,
				this.Entity.Id,
			));
	}
	GetActivePriority(t) {
		return this.CheckIsLoaded() && (t = this.LoadedSkills.get(t))?.Active
			? t.SkillInfo.InterruptLevel
			: -1;
	}
	GetSkillMontageInstance(t, e) {
		if (this.CheckIsLoaded() && (t = this.LoadedSkills.get(t)))
			return t.GetMontageByIndex(e);
	}
	IsCanUseSkill(t) {
		var e;
		return (
			!!this.CheckIsLoaded() &&
			!(
				!(e = this.GetSkillInfo(t)) ||
				this.IsSkillInCd(t) ||
				!this._en(e.GroupId, e.InterruptLevel) ||
				this.IsSkillGenreForbidden(e)
			)
		);
	}
	ResetRoleGrowComponent(t) {
		this.wZr || (this.wZr = t);
	}
	GetSkillLevelBySkillInfoId(t) {
		return this.wZr
			? this.wZr.GetSkillLevelBySkillInfoId(t)
			: CharacterAbilityComponent_1.DEFAULT_SOURCE_SKILL_LEVEL;
	}
	GetSkillIdWithGroupId(t) {
		return this.DZr.get(t)?.[SKILL_GROUP_INDEX]?.SkillId ?? 0;
	}
	pen(t) {
		var e = { Entity: this.Entity, SkillComponent: this, Skill: t },
			i = this.GetSkillInfo(t.SkillId);
		for (let t = 0; t < i.SkillBehaviorGroup.Num(); t++) {
			var o = i.SkillBehaviorGroup.Get(t);
			if (
				SkillBehaviorCondition_1.SkillBehaviorCondition.Satisfy(
					o.SkillBehaviorConditionGroup,
					e,
				)
			) {
				SkillBehaviorAction_1.SkillBehaviorAction.Begin(
					o.SkillBehaviorActionGroup,
					e,
				);
				break;
			}
		}
	}
	Een(t) {
		SkillBehaviorAction_1.SkillBehaviorAction.End(t);
	}
	gen(t, e) {
		let i = this.DZr.get(t);
		i || ((i = []), this.DZr.set(t, i)), i.includes(e) || i.push(e);
	}
	fen(t, e) {
		(t = this.DZr.get(t)) && -1 !== (e = t.indexOf(e)) && t.splice(e, 1);
	}
	*GetAllActivatedSkill() {
		for (const t of this.DZr.values()) for (const e of t.values()) yield e;
	}
	SetCurSkillAnIndex(t) {
		this.PendingAnIndex = t;
	}
	SetGaPassiveClassToSkillMap(t, e) {
		this.wxn.get(t)
			? Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Character",
					36,
					"GaPassiveClass重复，多个Skill使用了同一个GA",
				)
			: this.wxn.set(t, e);
	}
	GiveSkillDebug(t) {
		var e;
		this.LoadedSkills.has(t) ||
			(PreloadDefine_1.PreloadSetting.UseNewPreload &&
				((e = this.Entity.GetComponent(194)).LoadSkillAsync(t),
				e.FlushSkill(t)),
			this.nen(t, -1));
	}
});
(CharacterSkillComponent.YZr = !1),
	(CharacterSkillComponent.JZr = 0),
	(CharacterSkillComponent.zZr = 0),
	(CharacterSkillComponent = CharacterSkillComponent_1 =
		__decorate(
			[(0, RegisterComponent_1.RegisterComponent)(33)],
			CharacterSkillComponent,
		)),
	(exports.CharacterSkillComponent = CharacterSkillComponent);
