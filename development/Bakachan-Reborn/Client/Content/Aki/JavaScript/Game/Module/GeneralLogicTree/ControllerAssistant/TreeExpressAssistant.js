"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TreeExpressAssistant = void 0);
const Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	IQuest_1 = require("../../../../UniverseEditor/Interface/IQuest"),
	IVar_1 = require("../../../../UniverseEditor/Interface/IVar"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	PublicUtil_1 = require("../../../Common/PublicUtil"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	ControllerAssistantBase_1 = require("./ControllerAssistantBase"),
	ONE_HUNDRED = 100;
class TreeExpressAssistant extends ControllerAssistantBase_1.ControllerAssistantBase {
	constructor() {
		super(...arguments),
			(this.Vze = (e, t) => {
				e &&
					e.BtType &&
					e.TreeIncId &&
					this.ApplyOccupyTreeExpression(e.BtType, e.TreeIncId, e.ShowByCustom);
			}),
			(this.a$t = (e) => {
				e &&
					e.BtType &&
					e.TreeIncId &&
					this.ApplyOccupyTreeExpression(e.BtType, e.TreeIncId, e.ShowByCustom);
			});
	}
	OnDestroy() {}
	OnAddEvents() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.GeneralLogicTreeStartShowTrackText,
			this.Vze,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.GeneralLogicTreeUpdateShowTrackText,
				this.a$t,
			);
	}
	OnRemoveEvents() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.GeneralLogicTreeStartShowTrackText,
			this.Vze,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.GeneralLogicTreeUpdateShowTrackText,
				this.a$t,
			);
	}
	IsShowNodeStatus(e) {
		let t = !1;
		if (e)
			switch (e.QuestScheduleType.Type) {
				case IQuest_1.EQuestScheduleType.ChildQuestCompleted:
					t = e.QuestScheduleType.ShowComplete;
					break;
				case IQuest_1.EQuestScheduleType.TimeLeft:
				case IQuest_1.EQuestScheduleType.Condition:
					t = !0;
			}
		return t;
	}
	GetTitleTrackNodeId(e) {
		let t = 0;
		return e &&
			e.QuestScheduleType.Type ===
				IQuest_1.EQuestScheduleType.ChildQuestCompleted
			? e.QuestScheduleType.ChildQuestId
			: t;
	}
	IsShowTrackDistance(e, t) {
		let r = !1;
		return t &&
			t.QuestScheduleType.Type ===
				IQuest_1.EQuestScheduleType.ChildQuestCompleted
			? !!this.IsShowNodeTrackDistance(e, t.QuestScheduleType.ChildQuestId) &&
					t.QuestScheduleType.ShowTracking
			: r;
	}
	IsShowNodeTrackDistance(e, t) {
		return (
			!!(e =
				ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(e)) &&
			e.GetNode(t)?.ContainTag(0)
		);
	}
	GetTitleText(e, t) {
		let r = "";
		if (t)
			switch (t.QuestScheduleType.Type) {
				case IQuest_1.EQuestScheduleType.None:
					r = PublicUtil_1.PublicUtil.GetConfigTextByKey(t.TidTitle);
					break;
				case IQuest_1.EQuestScheduleType.ChildQuestCompleted:
					var o = t.QuestScheduleType;
					r = this.GetNodeTrackText(e, o.ChildQuestId, t.TidTitle, o.Vars);
					break;
				case IQuest_1.EQuestScheduleType.Condition:
				case IQuest_1.EQuestScheduleType.TimeLeft:
					r = PublicUtil_1.PublicUtil.GetConfigTextByKey(t.TidTitle);
					break;
				case IQuest_1.EQuestScheduleType.EntityHP:
					(o = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
						t.QuestScheduleType.EntityId,
					)) &&
						(o = o.Entity.GetComponent(156)) &&
						((l = o.GetCurrentValue(Protocol_1.Aki.Protocol.KBs.Proto_Life)),
						(o = o.GetCurrentValue(Protocol_1.Aki.Protocol.KBs.Tkn)),
						(l = Math.floor((l / o) * 100)),
						(r = (r = PublicUtil_1.PublicUtil.GetConfigTextByKey(
							t.TidTitle,
						)).replace("{q_count}", l + "%")));
					break;
				case IQuest_1.EQuestScheduleType.ChildQuestCompletedCount: {
					var a =
						ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(
							e,
						);
					if (!a) break;
					o = PublicUtil_1.PublicUtil.GetConfigTextByKey(t.TidTitle);
					var l = t.QuestScheduleType.AssociatedChildQuestIds,
						s = l.length;
					let i = 0;
					for (const e of l) a.GetNode(e)?.IsSuccess && i++;
					r = `${o}(${i}/${s})`;
					break;
				}
				case IQuest_1.EQuestScheduleType.Score:
					(r = PublicUtil_1.PublicUtil.GetConfigTextByKey(t.TidTitle)),
						(l = this.lOn(
							ModelManager_1.ModelManager.ScoreModel.GetCurrentScore()?.toString(),
						)),
						(r = (r = r.replace("{currentScore}", "" + l)).replace(
							"{targetScore}",
							"" + ModelManager_1.ModelManager.ScoreModel.GetTargetScore(),
						));
					break;
				case IQuest_1.EQuestScheduleType.TowerChallengeTitle:
					ModelManager_1.ModelManager.TowerModel.CheckInTower() &&
						(r = ModelManager_1.ModelManager.TowerModel.GetCurrentFloorName());
					break;
				case IQuest_1.EQuestScheduleType.Var:
					(o =
						ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(
							e,
						)) &&
						(("Int" !== (l = (s = t.QuestScheduleType).Var.Type) &&
							"Float" !== l &&
							"String" !== l &&
							"Boolean" !== l) ||
							((l = this.h$t(o, s.Var)),
							(r = (r = PublicUtil_1.PublicUtil.GetConfigTextByKey(
								t.TidTitle,
							)).replace("{q_count}", l))));
					break;
				case IQuest_1.EQuestScheduleType.MultiVar:
					(o =
						ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(
							e,
						)) &&
						((s = t.QuestScheduleType.Vars),
						(r = PublicUtil_1.PublicUtil.GetConfigTextByKey(t.TidTitle)),
						(r = this.l$t(o, r, s)));
			}
		return r;
	}
	lOn(e) {
		let t = "";
		if (e)
			for (let o = 0; o < e.length; o++) {
				var r = e[o];
				t += `<texture=${(r = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("T_Num" + r))}/>`;
			}
		return t;
	}
	l$t(e, t, r) {
		if (r && 0 !== r.length)
			for (const a of r) {
				var o;
				("Self" !== a.Source && "Other" !== a.Source) ||
					((o = this.h$t(e, a)),
					void 0 !== a && (t = t.replace(`{${a.Name}}`, o)));
			}
		return t;
	}
	h$t(e, t) {
		var r = t.Source,
			o = t.Type;
		if ("Constant" === r) return String(t.Value);
		if ("Self" === r || "Other" === r) {
			var a = e.GetTreeVarByKey(t.Name);
			if (void 0 === a) return "";
			if (a.xMs === (0, IVar_1.getVarConfigIndex)(o))
				switch (o) {
					case "Boolean":
						return String(a.bMs);
					case "Int":
						return String(MathUtils_1.MathUtils.LongToNumber(a.BMs));
					case "Float":
						return String(a.GMs);
					case "String":
						return a.qMs ?? "";
				}
		}
		return "";
	}
	GetNodeTrackText(e, t, r, o) {
		if (
			!(e =
				ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(e))
		)
			return "";
		var a = e.GetNode(t);
		if (!a) return "";
		var l = r ?? a.TrackTextConfig;
		if (void 0 === l || 0 === l.length) return "";
		let s;
		switch (a.TrackTextRule) {
			case 0:
				s = PublicUtil_1.PublicUtil.GetConfigTextByKey(l);
				break;
			case 1:
				var i = PublicUtil_1.PublicUtil.GetConfigTextByKey(l),
					n = a.GetProgress() ?? "0",
					u = a.GetProgressMax() ?? "0";
				s = i.replace("{q_count}", n).replace("{q_countMax}", u);
				break;
			case 2:
				(i = PublicUtil_1.PublicUtil.GetConfigTextByKey(l)),
					(s = a.GetCustomTrackText(i));
		}
		return (s = s && this.l$t(e, s, o)) ?? "";
	}
	ApplyOccupyTreeExpression(e, t, r) {
		switch (e) {
			case Protocol_1.Aki.Protocol.NCs.Proto_BtTypeQuest:
				break;
			case Protocol_1.Aki.Protocol.NCs.Proto_BtTypeInst:
			case Protocol_1.Aki.Protocol.NCs.Proto_BtTypeLevelPlay:
				r && this._$t(t);
		}
	}
	_$t(e) {
		ModelManager_1.ModelManager.GeneralLogicTreeModel.ApplyExpressionOccupation(
			e,
		);
	}
	TryReleaseExpressionOccupation(e) {
		ModelManager_1.ModelManager.GeneralLogicTreeModel.TryReleaseExpressionOccupation(
			e,
		);
	}
}
exports.TreeExpressAssistant = TreeExpressAssistant;
