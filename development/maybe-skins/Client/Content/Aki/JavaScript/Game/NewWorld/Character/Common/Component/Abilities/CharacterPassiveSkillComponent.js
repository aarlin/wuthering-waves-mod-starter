"use strict";
var ESkillAction,
	__decorate =
		(this && this.__decorate) ||
		function (e, t, i, o) {
			var r,
				l = arguments.length,
				s =
					l < 3
						? t
						: null === o
							? (o = Object.getOwnPropertyDescriptor(t, i))
							: o;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
				s = Reflect.decorate(e, t, i, o);
			else
				for (var n = e.length - 1; 0 <= n; n--)
					(r = e[n]) &&
						(s = (l < 3 ? r(s) : 3 < l ? r(t, i, s) : r(t, i)) || s);
			return 3 < l && s && Object.defineProperty(t, i, s), s;
		};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CharacterPassiveSkillComponent = void 0);
const Log_1 = require("../../../../../../Core/Common/Log"),
	PassiveSkillById_1 = require("../../../../../../Core/Define/ConfigQuery/PassiveSkillById"),
	Entity_1 = require("../../../../../../Core/Entity/Entity"),
	EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent"),
	RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent"),
	MathUtils_1 = require("../../../../../../Core/Utils/MathUtils"),
	ModelManager_1 = require("../../../../../Manager/ModelManager"),
	CombatMessage_1 = require("../../../../../Module/CombatMessage/CombatMessage"),
	SkillMessageController_1 = require("../../../../../Module/CombatMessage/SkillMessageController"),
	CombatDebugController_1 = require("../../../../../Utils/CombatDebugController"),
	BulletController_1 = require("../../../../Bullet/BulletController");
!(function (e) {
	(e[(e.AddBullet = 1)] = "AddBullet"),
		(e[(e.RemoveBullet = 2)] = "RemoveBullet"),
		(e[(e.AddBuff = 3)] = "AddBuff"),
		(e[(e.RemoveBuff = 4)] = "RemoveBuff"),
		(e[(e.StartSkill = 5)] = "StartSkill");
})((ESkillAction = ESkillAction || {}));
let CharacterPassiveSkillComponent = class extends EntityComponent_1.EntityComponent {
	constructor() {
		super(...arguments),
			(this.ikr = void 0),
			(this.okr = void 0),
			(this.rkr = void 0),
			(this.nkr = new Map()),
			(this.LockMap = new Set());
	}
	OnInit() {
		return (
			(this.ikr = this.Entity.CheckGetComponent(25)),
			(this.okr = this.Entity.CheckGetComponent(157)),
			(this.rkr = this.Entity.GetComponent(186)),
			!0
		);
	}
	OnStart() {
		return !0;
	}
	OnActivate() {
		var e = this.Entity.GetComponent(0).ComponentDataMap.get("vps")?.vps?.IMs;
		if (e)
			for (const t of e)
				this.LearnPassiveSkill(MathUtils_1.MathUtils.LongToBigInt(t.vkn), {
					CombatMessageId: MathUtils_1.MathUtils.LongToBigInt(t.r4n.s4n),
				});
		return !0;
	}
	OnClear() {
		for (const e of this.nkr.keys()) this.ForgetPassiveSkill(e);
		return !0;
	}
	OnTick(e) {
		this.LockMap.clear();
	}
	GetAllPassiveSkills() {
		return [...this.nkr.values()];
	}
	HasSkill(e) {
		return this.nkr.has(e);
	}
	LearnPassiveSkill(e, t = void 0) {
		if (this.HasSkill(e)) return !1;
		const i = PassiveSkillById_1.configPassiveSkillById.GetConfig(e);
		if (!i)
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Battle",
						20,
						"被动技能配置不存在",
						["owner", this.Entity.Id],
						["skillId", e],
					),
				!1
			);
		if (!i.TriggerType)
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Battle",
						20,
						"被动技能配置错误，缺少触发类型",
						["owner", this.Entity.Id],
						["skillId", e],
					),
				!1
			);
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info(
				"Battle",
				20,
				"角色添加被动技能",
				["owner", this.Entity.Id],
				["skillId", e],
			);
		var o = this.ikr.AddTrigger(
			{
				Type: i.TriggerType,
				Preset: i.TriggerPreset,
				Params: i.TriggerParams,
				Formula: i.TriggerFormula,
			},
			(t, o) => {
				let r = this.Entity;
				var l = i.InstigatorType;
				(r = l ? t?.[l] ?? o?.[l] : r) && r instanceof Entity_1.Entity
					? this.ExecuteAction(e, r)
					: CombatDebugController_1.CombatDebugController.CombatError(
							"PassiveSkill",
							this.Entity,
							"被动技能目标非法",
							["targetKey", l],
							["skillId", e],
						);
			},
		);
		return (
			i.IsDefaultActivated && this.ikr.SetTriggerActive(o, !0),
			this.nkr.set(e, {
				SkillId: e,
				TriggerHandle: o,
				Actions: this.ParseActions(i),
				TargetKey: i.InstigatorType,
				CombatMessageId: t?.CombatMessageId,
			}),
			this.rkr?.InitPassiveSkill(i),
			this.OnPassiveSkillAdded(e, t),
			!0
		);
	}
	ForgetPassiveSkill(e, t = !1) {
		var i = this.nkr.get(e);
		void 0 !== i &&
			(Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Battle",
					20,
					"角色失去被动技能",
					["owner", this.Entity.Id],
					["skillId", e],
				),
			this.ikr.RemoveTrigger(i.TriggerHandle),
			this.nkr.delete(e),
			this.OnPassiveSkillRemoved(e, t));
	}
	SetPassiveSkillActive(e, t) {
		void 0 !== (e = this.nkr.get(e)) &&
			e.TriggerHandle &&
			0 < e.TriggerHandle &&
			this.ikr.SetTriggerActive(e.TriggerHandle, t);
	}
	ParseActions(e) {
		var t = [],
			i = this.ParseAction(e.SkillAction, e.SkillActionParams);
		void 0 !== i && t.push(i);
		for (const i of e.SubSkillAction) {
			var o = PassiveSkillById_1.configPassiveSkillById.GetConfig(i);
			void 0 !== (o = this.ParseAction(o.SkillAction, o.SkillActionParams)) &&
				t.push(o);
		}
		return t;
	}
	ParseAction(e, t) {
		var i = ESkillAction[e];
		if (void 0 !== i)
			switch (i) {
				case ESkillAction.AddBullet:
					return { Action: i, BulletRowNames: t.map((e) => e.trim()) };
				case ESkillAction.RemoveBullet:
					return {
						Action: i,
						BulletRowNames: t[0].split("#").map((e) => e.trim()),
						SummonChild: "1" === t[1]?.trim(),
					};
				case ESkillAction.AddBuff:
					return { Action: i, BuffId: t.map((e) => BigInt(e)) };
				case ESkillAction.RemoveBuff: {
					const e = {
						Action: i,
						BuffId: new Array(t.length),
						StackCount: new Array(t.length),
					};
					return (
						t.forEach((t, i) => {
							var [t, o] = t.split("#");
							(e.BuffId[i] = BigInt(t)), (e.StackCount[i] = Number(o ?? -1));
						}),
						e
					);
				}
				case ESkillAction.StartSkill:
					return { Action: i, SkillId: Number(t[0]) };
				default:
					return;
			}
	}
	ExecuteAction(e, t) {
		if (this.okr.HasBuffAuthority() && !this.rkr?.IsPassiveSkillInCd(e))
			if (this.LockMap.has(e))
				CombatDebugController_1.CombatDebugController.CombatError(
					"PassiveSkill",
					this.Entity,
					"被动技能在同一次调用栈中重复触发，需要检查技能配置",
					["skillId", e],
					[
						"desc",
						PassiveSkillById_1.configPassiveSkillById.GetConfig(e)?.SkillDesc ??
							"",
					],
					["current executing skill ids", [...this.LockMap]],
				);
			else {
				var i = this.nkr.get(e);
				if (void 0 !== i) {
					this.rkr?.StartPassiveCd(e), this.LockMap.add(e);
					for (const u of i.Actions)
						switch (u.Action) {
							case ESkillAction.AddBullet:
								var o = t?.GetComponent(1)?.ActorTransform;
								if (o)
									for (const e of u.BulletRowNames)
										BulletController_1.BulletController.CreateBulletCustomTarget(
											this.Entity,
											e,
											o,
											{},
											i.CombatMessageId,
										);
								else
									CombatDebugController_1.CombatDebugController.CombatError(
										"PassiveSkill",
										this.Entity,
										"被动技能目标没有ActorTransform",
										["skillId", e],
										["targetEntity", t?.Id],
									);
								break;
							case ESkillAction.RemoveBullet:
								var r =
									ModelManager_1.ModelManager.BulletModel?.GetBulletSetByAttacker(
										this.Entity.Id,
									);
								if (void 0 !== r) {
									var l = new Array(),
										s = u.SummonChild;
									for (const e of r) {
										var n = e.GetBulletInfo();
										u.BulletRowNames.includes(n.BulletRowName) &&
											l.push(n.BulletEntityId);
									}
									for (const e of l)
										BulletController_1.BulletController.DestroyBullet(e, s, 3);
								}
								break;
							case ESkillAction.AddBuff:
								var a = t.GetComponent(157),
									k = `被动技能${e}添加`;
								for (const e of u.BuffId)
									a.AddBuff(e, {
										InstigatorId: this.okr.CreatureDataId,
										PreMessageId: i.CombatMessageId,
										Reason: k,
									});
								break;
							case ESkillAction.RemoveBuff:
								var c = t.GetComponent(157),
									d = `被动技能${e}移除`;
								for (let e = 0; e < u.BuffId.length; e++) {
									var g = u.StackCount[e] ?? -1;
									c.RemoveBuff(u.BuffId[e], g, d);
								}
								break;
							case ESkillAction.StartSkill:
								(r = t.CheckGetComponent(33)) &&
									r.BeginSkill(u.SkillId, {
										ContextId: i.CombatMessageId,
										Context: "PassiveSkillComponent.ExecuteAction",
									});
						}
					this.LockMap.delete(e);
				}
			}
	}
	OnPassiveSkillAdded(e, t = void 0) {
		t &&
			t.NeedBroadcast &&
			((t = t.Buff?.MessageId),
			(t =
				SkillMessageController_1.SkillMessageController.PassiveSkillAddRequest(
					this.Entity,
					e,
					t,
				)),
			(this.nkr.get(e).CombatMessageId = t));
	}
	OnPassiveSkillRemoved(e, t) {
		t &&
			SkillMessageController_1.SkillMessageController.PassiveSkillRemoveRequest(
				this.Entity,
				e,
			);
	}
	static PassiveSkillAddNotify(e, t) {
		var i = e?.GetComponent(23);
		for (const e of t.IMs)
			i?.LearnPassiveSkill(MathUtils_1.MathUtils.LongToBigInt(e.vkn), {
				CombatMessageId: MathUtils_1.MathUtils.LongToBigInt(e.r4n.s4n),
			});
	}
	static PassiveSkillRemoveNotify(e, t) {
		var i = e?.GetComponent(23);
		for (const e of t.OIs)
			i?.ForgetPassiveSkill(MathUtils_1.MathUtils.LongToBigInt(e));
	}
};
__decorate(
	[CombatMessage_1.CombatNet.Listen("F2n", !1)],
	CharacterPassiveSkillComponent,
	"PassiveSkillAddNotify",
	null,
),
	__decorate(
		[CombatMessage_1.CombatNet.Listen("V2n", !1)],
		CharacterPassiveSkillComponent,
		"PassiveSkillRemoveNotify",
		null,
	),
	(CharacterPassiveSkillComponent = __decorate(
		[(0, RegisterComponent_1.RegisterComponent)(23)],
		CharacterPassiveSkillComponent,
	)),
	(exports.CharacterPassiveSkillComponent = CharacterPassiveSkillComponent);
