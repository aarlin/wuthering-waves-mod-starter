"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AiStateMachineGroup = void 0);
const Time_1 = require("../../../Core/Common/Time"),
	AiBaseById_1 = require("../../../Core/Define/ConfigQuery/AiBaseById"),
	AiStateMachineConfigById_1 = require("../../../Core/Define/ConfigQuery/AiStateMachineConfigById"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	Net_1 = require("../../../Core/Net/Net"),
	StringBuilder_1 = require("../../../Core/Utils/StringBuilder"),
	IComponent_1 = require("../../../UniverseEditor/Interface/IComponent"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	CombatMessage_1 = require("../../Module/CombatMessage/CombatMessage"),
	PreloadDefine_1 = require("../../Preload/PreloadDefine"),
	CombatDebugController_1 = require("../../Utils/CombatDebugController"),
	FrequencyMonitor_1 = require("../../Utils/FrequencyMonitor"),
	AiStateMachine_1 = require("./AiStateMachine"),
	AiStateMachineTaskSkill_1 = require("./Task/AiStateMachineTaskSkill");
class AiStateMachineGroup {
	constructor(e) {
		(this.Kre = 0),
			(this.Qre = 0),
			(this.Xre = 0),
			(this.$re = 0),
			(this.Entity = void 0),
			(this.StateMachineComp = void 0),
			(this.ActorComp = void 0),
			(this.Yre = void 0),
			(this.Jre = void 0),
			(this.NodeMap = void 0),
			(this.NodeMapByName = void 0),
			(this.NodeDataMap = void 0),
			(this.NodeReferenceMap = void 0),
			(this.NodeOverrideMap = void 0),
			(this.StateMachines = void 0),
			(this.StateMachineMap = void 0),
			(this.SwitchStateFrequencyMonitor = void 0),
			(this.Inited = !1),
			(this.StateMachinesActivated = !1),
			(this.ForceDisableAnimOptimization = !0),
			(this.zre = void 0),
			(this.ErrorMessage = void 0),
			(this.OnDeath = () => {
				if (this.StateMachinesActivated) {
					for (const e of this.StateMachines) e.Activated && e.Exit();
					this.StateMachinesActivated = !1;
				}
			}),
			(this.Zre = (e, t) => {
				if (0 < this.zre.size)
					for (const e of this.zre) {
						if (
							e.Task instanceof
								AiStateMachineTaskSkill_1.AiStateMachineTaskSkill &&
							e.Task.SkillId === t
						)
							break;
						CombatDebugController_1.CombatDebugController.CombatWarn(
							"StateMachineNew",
							this.Entity,
							"主状态激活时，不应该释放其他技能",
							["主状态节点", e.Name],
							["技能Id", t],
						);
						break;
					}
			}),
			(this.ene = (e, t) => {
				if (this.StateMachines?.length)
					for (const e of this.StateMachines)
						e.CurrentLeafNode.OnCharSkillEnd(t);
			}),
			(this.tne = 0),
			(this.zre = new Set()),
			e &&
				((this.Entity = e.Entity),
				(this.StateMachineComp = e),
				(this.ActorComp = e.Entity.GetComponent(3)),
				(e = e.Entity.GetComponent(0)),
				(this.SwitchStateFrequencyMonitor =
					new FrequencyMonitor_1.FrequencyMonitor(1, 10, "状态机切换", [
						"PbDataId",
						e.GetPbDataId(),
					])),
				EventSystem_1.EventSystem.AddWithTarget(
					this.Entity,
					EventDefine_1.EEventName.CharOnRoleDeadTargetSelf,
					this.OnDeath,
				),
				EventSystem_1.EventSystem.AddWithTarget(
					this.Entity,
					EventDefine_1.EEventName.OnSkillEnd,
					this.ene,
				),
				EventSystem_1.EventSystem.AddWithTarget(
					this.Entity,
					EventDefine_1.EEventName.CharUseSkill,
					this.Zre,
				));
	}
	SetCurrentTaskNode(e) {
		if ((this.zre.add(e), 1 < this.zre.size)) {
			const e = new Array();
			this.zre.forEach((t) => {
				e.push(t.Name);
			}),
				CombatDebugController_1.CombatDebugController.CombatWarn(
					"StateMachineNew",
					this.Entity,
					"多个主状态节点激活，请保持主状态节点激活唯一",
					["已激活主状态节点", e.join(", ")],
				);
		}
	}
	RemoveCurrentTaskNode(e) {
		this.zre.delete(e);
	}
	IsCurrentTaskSkill(e) {
		if (this.zre)
			for (const t of this.zre)
				if (
					t.Task instanceof AiStateMachineTaskSkill_1.AiStateMachineTaskSkill &&
					t.Task.SkillId === e
				)
					return !0;
		return !1;
	}
	PushErrorMessage(e) {
		CombatDebugController_1.CombatDebugController.CombatError(
			"StateMachineNew",
			this.Entity,
			e,
		),
			this.ErrorMessage ||
				(this.ErrorMessage = new StringBuilder_1.StringBuilder()),
			this.ErrorMessage.Append(e),
			this.ErrorMessage.Append("\n");
	}
	GetNodeData(e) {
		var t = this.NodeOverrideMap.get(e);
		return void 0 === t ? this.NodeDataMap.get(e) : this.NodeDataMap.get(t);
	}
	GetBlackboard(e) {
		return this.Yre.get(e);
	}
	GetCustomBlackboard(e) {
		return this.Jre?.get(e);
	}
	RegisterNode(e) {
		var t;
		this.NodeMap.set(e.Uuid, e),
			e.IsReferenceNode ||
				(this.NodeMapByName.set(e.Name, e),
				e.IsOverrideNode &&
					((t = e.OverrideNodeUuid),
					(t = this.NodeDataMap.get(t)),
					this.NodeMapByName.set(t.Name, e)));
	}
	InitFsmJson() {
		var e = (this.Entity?.GetComponent(0)).GetPbEntityInitData();
		let t = 0;
		var i, o;
		e = (t =
			e?.ComponentsData &&
			(e = (0, IComponent_1.getComponent)(e.ComponentsData, "AiComponent"))
				?.AiId &&
			!e.Disabled
				? e.AiId
				: t)
			? AiBaseById_1.configAiBaseById.GetConfig(t)
			: void 0;
		return (
			e?.StateMachine &&
				(i =
					AiStateMachineConfigById_1.configAiStateMachineConfigById.GetConfig(
						e.StateMachine,
					))?.StateMachineJson &&
				((i = JSON.parse(i.StateMachineJson)),
				((o = this.Entity.GetComponent(65)).StateMachineName = e.StateMachine),
				(o.StateMachineJsonObject = i)),
			!0
		);
	}
	OnActivate() {
		PreloadDefine_1.PreloadSetting.UseNewPreload && this.InitFsmJson();
		var e = this.StateMachineComp.StateMachineJsonObject,
			t = ConfigManager_1.ConfigManager.AiConfig.CommonStateMachineJsonObject;
		if (t && e) {
			(this.Kre = t.Version),
				(this.Qre = e.Version),
				(this.NodeDataMap = new Map()),
				(this.NodeReferenceMap = new Map()),
				(this.NodeOverrideMap = new Map());
			for (const e of t.Nodes)
				this.NodeDataMap.set(e.Uuid, e),
					e.ReferenceUuid && this.NodeReferenceMap.set(e.Uuid, e.ReferenceUuid);
			for (const t of e.Nodes) this.NodeDataMap.set(t.Uuid, t);
			for (const t of e.Nodes)
				t.OverrideCommonUuid &&
					this.NodeOverrideMap.set(t.OverrideCommonUuid, t.Uuid),
					t.ReferenceUuid && this.NodeReferenceMap.set(t.Uuid, t.ReferenceUuid);
			(this.StateMachines = []),
				(this.NodeMap = new Map()),
				(this.NodeMapByName = new Map()),
				(this.StateMachineMap = new Map()),
				(this.Yre = new Map()),
				(this.Jre = new Map());
			for (const t of e.StateMachines) {
				let e = this.GetNodeData(t);
				if (!(e = e.ReferenceUuid ? this.GetNodeData(e.ReferenceUuid) : e))
					return void CombatDebugController_1.CombatDebugController.CombatError(
						"StateMachineNew",
						this.Entity,
						"状态机初始化失败，不存在状态机",
						["stateMachineId", t],
					);
				var i = new AiStateMachine_1.AiStateMachineBase(this, void 0, e);
				i.IsReferenceNode || this.StateMachines.push(i);
			}
			for (const e of this.NodeReferenceMap.values()) {
				const t = this.NodeMap.get(e);
				this.StateMachines.find((e) => e === t) || this.StateMachines.push(t);
			}
			CombatDebugController_1.CombatDebugController.CombatInfo(
				"StateMachineNew",
				this.Entity,
				"初始化状态机-成功",
			),
				(this.Inited = !0),
				this.StartStateMachines(),
				this.ActorComp.IsAutonomousProxy && this.OnControl();
		}
	}
	StartStateMachines() {
		var e = this.Entity.GetComponent(0).ComponentDataMap.get("aps")?.aps;
		if (e?.mSs && 0 < e.mSs.length) {
			if (
				((this.Xre = Number(e.gSs)),
				(this.$re = Number(e.CSs)),
				this.Qre !== this.$re &&
					CombatDebugController_1.CombatDebugController.CombatWarn(
						"StateMachineNew",
						this.Entity,
						"实体状态机与服务器版本不一致",
						["客户端", this.Qre],
						["服务器", this.$re],
					),
				this.Kre !== this.Xre &&
					CombatDebugController_1.CombatDebugController.CombatWarn(
						"StateMachineNew",
						this.Entity,
						"公共状态机与服务器版本不一致",
						["客户端", this.Kre],
						["服务器", this.Xre],
					),
				this.Inited)
			) {
				if (e.fSs) for (const t of e.fSs) this.Yre.set(t.Ckn, t.gkn);
				if (e.vSs?.MSs)
					for (const t of e.vSs.MSs)
						CombatDebugController_1.CombatDebugController.CombatWarn(
							"StateMachineNew",
							this.Entity,
							"初始化黑板值",
							["Key", t.Ckn],
							["Value", t.gkn],
						),
							this.Jre.set(t.Ckn, t.gkn);
				for (const t of e.mSs) this.StartState(t.ukn, t.cSs, t.dSs);
				this.StateMachinesActivated = !0;
			}
		} else
			CombatDebugController_1.CombatDebugController.CombatError(
				"StateMachineNew",
				this.Entity,
				"状态机初始化失败，服务器实体没有相关初始状态",
			);
	}
	HandleBlackboard(e) {
		if (
			(CombatDebugController_1.CombatDebugController.CombatInfo(
				"StateMachineNew",
				this.Entity,
				"HandleBlackboard",
			),
			e.pSs)
		)
			for (const t of e.pSs)
				CombatDebugController_1.CombatDebugController.CombatInfo(
					"StateMachineNew",
					this.Entity,
					"set",
					["key", t.Ckn],
					["value", t.gkn],
				),
					this.Yre.set(t.Ckn, t.gkn);
	}
	HandleCustomBlackboard(e) {
		if (
			(CombatDebugController_1.CombatDebugController.CombatInfo(
				"StateMachineNew",
				this.Entity,
				"HandleCustomBlackboard",
			),
			e.vSs?.MSs)
		)
			for (const t of e.vSs.MSs)
				CombatDebugController_1.CombatDebugController.CombatInfo(
					"StateMachineNew",
					this.Entity,
					"set",
					["key", t.Ckn],
					["value", t.gkn],
				),
					this.Jre.set(t.Ckn, t.gkn);
	}
	Clear() {
		if (this.StateMachines) for (const e of this.StateMachines) e.Clear();
		EventSystem_1.EventSystem.RemoveWithTarget(
			this.Entity,
			EventDefine_1.EEventName.CharOnRoleDeadTargetSelf,
			this.OnDeath,
		),
			EventSystem_1.EventSystem.RemoveWithTarget(
				this.Entity,
				EventDefine_1.EEventName.OnSkillEnd,
				this.ene,
			),
			EventSystem_1.EventSystem.RemoveWithTarget(
				this.Entity,
				EventDefine_1.EEventName.CharUseSkill,
				this.Zre,
			),
			(this.SwitchStateFrequencyMonitor = void 0),
			(this.StateMachinesActivated = !1),
			(this.Entity = void 0),
			(this.StateMachineComp = void 0),
			(this.ActorComp = void 0),
			(this.Yre = void 0),
			(this.Jre = void 0),
			(this.NodeMap = void 0),
			(this.NodeMapByName = void 0),
			(this.NodeDataMap = void 0),
			(this.NodeReferenceMap = void 0),
			(this.StateMachines = void 0),
			(this.StateMachineMap = void 0),
			(this.ErrorMessage = void 0),
			(this.zre = void 0);
	}
	OnTick(e) {
		if (this.StateMachinesActivated)
			for (const t of this.StateMachines) t.Activated && t.Tick(e);
	}
	GetNodeByUuid(e) {
		var t;
		if (this.NodeMap)
			return void 0 === (t = this.NodeOverrideMap.get(e))
				? this.NodeMap.get(e)
				: this.NodeMap.get(t);
	}
	GetNodeByName(e) {
		if (this.NodeMapByName) return this.NodeMapByName.get(e);
	}
	RequestServerDebugInfo() {
		Time_1.Time.NowSeconds < this.tne + 1 ||
			(Net_1.Net.Call(
				15100,
				Protocol_1.Aki.Protocol.eYn.create({
					rkn: this.ActorComp.CreatureData.GetCreatureDataId(),
				}),
				(e) => {
					this.HandleEntityFsmGroupInfo(e);
				},
			),
			(this.tne = Time_1.Time.NowSeconds));
	}
	BlackboardToString() {
		if (this.Jre) {
			var e,
				t,
				i = new StringBuilder_1.StringBuilder("状态机黑板值\n");
			for ([e, t] of (i.Append(
				"-------------------------------------------------------------\n",
			),
			this.Jre))
				i.Append(`[${e}]: ${t}\n`);
			return (
				i.Append(
					"-------------------------------------------------------------\n",
				),
				i.ToString()
			);
		}
		return "";
	}
	ToString(e = 0, t) {
		var i = new StringBuilder_1.StringBuilder();
		if (
			(i.Append(`------[${this.StateMachineComp.StateMachineName}]------\n`),
			this.Qre !== this.$re &&
				i.Append(
					`>>> 警告，实体状态机与服务器版本不一致 <<<\n客户端:${this.Qre}\n服务端:${this.$re}\n`,
				),
			this.Kre !== this.Xre &&
				i.Append(
					`>>> 警告，公共状态机与服务器版本不一致 <<<\n客户端:${this.Kre}\n服务端:${this.Xre}\n`,
				),
			this.ErrorMessage &&
				i.Append(`>>> 状态机初始化失败 <<<\n${this.ErrorMessage.ToString()}\n`),
			!this.Inited)
		)
			return (
				i.Append(
					">>> 状态机未初始化，客户端无状态机配置 <<<\n请检查Ai基础.xlsx是否正确配置",
				),
				[i.ToString(), ""]
			);
		var o = new StringBuilder_1.StringBuilder();
		this.StateMachinesActivated
			? i.Append(">>> 状态机已启动 <<<\n")
			: i.Append(">>> 状态机未启动 <<<\n服务器状态机配置错误或者怪物已死亡\n"),
			i.Append(this.BlackboardToString()),
			o.Append(
				"(第一个客户端结果，第二个服务器结果，第三个客户端/服务器条件)\n",
			);
		for (const e of this.StateMachines)
			i.Append(
				"-------------------------------------------------------------\n",
			),
				e.ToString(i, o),
				i.Append(
					"-------------------------------------------------------------\n",
				);
		return [i.ToString(), o.ToString()];
	}
	StartState(e, t, i) {
		var o = this.GetNodeByUuid(t);
		o
			? o.Activated ||
				(CombatDebugController_1.CombatDebugController.CombatWarn(
					"StateMachineNew",
					this.Entity,
					`设置初始状态，激活状态 [${o.Name}|${o.Uuid}]`,
				),
				o.Start(!1, i),
				this.ActorComp.IsAutonomousProxy &&
					(((o = Protocol_1.Aki.Protocol.TNn.create()).ukn = e),
					(o.ckn = t),
					CombatMessage_1.CombatNet.Call(28719, this.Entity, o)))
			: CombatDebugController_1.CombatDebugController.CombatWarn(
					"StateMachineNew",
					this.Entity,
					`设置初始状态失败，目标节点不存在 [${t}]`,
				);
	}
	HandleSwitch(e, t, i, o) {
		var a = this.GetNodeByUuid(e),
			n = this.GetNodeByUuid(i);
		n
			? a.WaitSwitchState
				? ((a.RemoteSwitchPending = i),
					(a.RemoteSwitchMessageId = o),
					CombatDebugController_1.CombatDebugController.CombatWarn(
						"StateMachineNew",
						this.Entity,
						`远端切换状态，目前处于等待切换结果状态，[${n.Name}|${n.Uuid}]`,
					))
				: n.Activated
					? CombatDebugController_1.CombatDebugController.CombatWarn(
							"StateMachineNew",
							this.Entity,
							`远端切换状态，状态已激活 [${n.Name}|${n.Uuid}]`,
						)
					: (CombatDebugController_1.CombatDebugController.CombatWarn(
							"StateMachineNew",
							this.Entity,
							`远端切换状态，root[${a.Name}|${a.Uuid}] 激活节点[${n.Name}|${n.Uuid}]`,
						),
						(a.CurrentMessageIdCache = o),
						n.ForceActive(),
						(a.CurrentMessageIdCache = void 0),
						this.ActorComp.IsAutonomousProxy &&
							(((o = Protocol_1.Aki.Protocol.TNn.create()).ukn = e),
							(o.ckn = i),
							CombatMessage_1.CombatNet.Call(28719, this.Entity, o)))
			: CombatDebugController_1.CombatDebugController.CombatWarn(
					"StateMachineNew",
					this.Entity,
					`远端切换状态失败，目标节点不存在 [${i}]`,
				);
	}
	HandleChangeStateConfirm(e, t) {
		var i = this.GetNodeByUuid(t);
		i
			? i.Activated
				? i.SetExecutedAction()
				: CombatDebugController_1.CombatDebugController.CombatWarn(
						"StateMachineNew",
						this.Entity,
						`远端修改状态确认通知，该状态机未激活 [${i.Name}|${i.Uuid}]`,
					)
			: CombatDebugController_1.CombatDebugController.CombatWarn(
					"StateMachineNew",
					this.Entity,
					`远端确认切换状态失败，目标节点不存在 [${t}]`,
				);
	}
	HandleEntityFsmGroupInfo(e) {
		if (e.SSs)
			for (const t of e.SSs)
				for (const e of t.ESs)
					this.GetNodeByUuid(e.xCs)?.HandleServerDebugInfo(e);
	}
	ResetStateMachine(e, t) {
		if (
			(CombatDebugController_1.CombatDebugController.CombatInfo(
				"StateMachineNew",
				this.Entity,
				"状态机重置",
			),
			e?.mSs && 0 < e.mSs.length)
		) {
			if (
				((this.Xre = Number(e.gSs)), (this.$re = Number(e.CSs)), this.Inited)
			) {
				for (const a of e.mSs) {
					var i = this.GetNodeByUuid(a.ukn),
						o = this.GetNodeByUuid(a.cSs);
					if (!o)
						return void CombatDebugController_1.CombatDebugController.CombatError(
							"StateMachineNew",
							this.Entity,
							"状态机重置失败，目标状态不存在",
							["fsmId", a.ukn],
							["fsmId", a.cSs],
						);
					CombatDebugController_1.CombatDebugController.CombatWarn(
						"StateMachineNew",
						this.Entity,
						"状态机重置状态",
						["fsmId", a.ukn],
						["stateId", a.cSs],
					),
						(i.CurrentMessageIdCache = t),
						o.ForceActive(),
						(i.CurrentMessageIdCache = void 0);
				}
				this.StateMachinesActivated = !0;
			}
		} else
			CombatDebugController_1.CombatDebugController.CombatError(
				"StateMachineNew",
				this.Entity,
				"状态机重置失败，服务器实体没有相关初始状态",
			);
	}
	OnControl() {
		if (this.StateMachinesActivated)
			for (const e of this.StateMachines) e.OnControl();
	}
}
exports.AiStateMachineGroup = AiStateMachineGroup;
