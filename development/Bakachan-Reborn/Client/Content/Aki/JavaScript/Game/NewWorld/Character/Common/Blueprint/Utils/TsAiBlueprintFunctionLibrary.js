"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const puerts_1 = require("puerts"),
	UE = require("ue"),
	Log_1 = require("../../../../../../Core/Common/Log"),
	EntitySystem_1 = require("../../../../../../Core/Entity/EntitySystem"),
	Vector_1 = require("../../../../../../Core/Utils/Math/Vector"),
	Global_1 = require("../../../../../Global"),
	ModelManager_1 = require("../../../../../Manager/ModelManager");
class TsAiBlueprintFunctionLibrary extends UE.BlueprintFunctionLibrary {
	static GetQuestState(t, e) {
		return (e = ModelManager_1.ModelManager.QuestNewModel.GetQuest(e))
			? e.Status
			: 4;
	}
	static GetDistanceByPlayer(t) {
		var e = Global_1.Global.BaseCharacter;
		return e && (t = EntitySystem_1.EntitySystem.GetComponent(t, 3))?.Valid
			? ((t = t.ActorLocationProxy),
				(e = e.CharacterActorComponent.ActorLocationProxy),
				Vector_1.Vector.Dist(t, e))
			: Number.MAX_VALUE;
	}
	static CheckPlayerGameplayTag(t, e) {
		var n = Global_1.Global.BaseCharacter;
		return (
			!!n &&
			!!(n = n.CharacterActorComponent.Entity.GetComponent(185)) &&
			n.HasTag(e?.TagId)
		);
	}
	static RestartBehaviorTree(t) {
		(t = EntitySystem_1.EntitySystem.GetComponent(t, 38)) &&
			t.RestartBehaviorTree();
	}
	static SetAiEnabled(t, e, n) {
		(t = EntitySystem_1.EntitySystem.GetComponent(t, 38)) &&
			((n = "EcologicalBridge_" + n), e ? t.EnableAi(n) : t.DisableAi(n));
	}
	static NeedCheckPlayerImpact(t) {
		return (
			!!(t = EntitySystem_1.EntitySystem.GetComponent(t, 38)) &&
			!!(t = t.TsAiController.AiController.NpcDecision) &&
			t.CheckPlayerImpact
		);
	}
	static NeedCheckPlayerAttack(t) {
		return TsAiBlueprintFunctionLibrary.NeedCheckPlayerAttackNoBlueprint(t);
	}
	static NeedCheckPlayerAttackNoBlueprint(t) {
		return (
			!!(t = EntitySystem_1.EntitySystem.GetComponent(t, 38)) &&
			!!(t = t.TsAiController.AiController.NpcDecision) &&
			t.CheckPlayerAttack
		);
	}
	static UpdateInteractionComponent(t) {
		(t = EntitySystem_1.EntitySystem.GetComponent(t, 103)) && t.ForceUpdate();
	}
	static OnPlayerAttack(t) {
		(t = EntitySystem_1.EntitySystem.GetComponent(t, 168)) &&
			t.OnPlayerAttack();
	}
	static OnPlayerImpact(t) {
		(t = EntitySystem_1.EntitySystem.GetComponent(t, 168)) &&
			t.OnPlayerImpact();
	}
	static OnPlayerAttackBegin(t) {
		(t = EntitySystem_1.EntitySystem.GetComponent(t, 168)) &&
			t.OnPlayerAttackBegin();
	}
	static OnPlayerImpactBegin(t) {
		(t = EntitySystem_1.EntitySystem.GetComponent(t, 168)) &&
			t.OnPlayerImpactBegin();
	}
	static OnPlayerAttackEnd(t) {
		(t = EntitySystem_1.EntitySystem.GetComponent(t, 168)) &&
			t.OnPlayerAttackEnd();
	}
	static OnPlayerImpactEnd(t) {
		(t = EntitySystem_1.EntitySystem.GetComponent(t, 168)) &&
			t.OnPlayerImpactEnd();
	}
	static UpdateNpcPerformData(t, e, n, o, r) {
		(t = EntitySystem_1.EntitySystem.GetComponent(t, 168)) &&
			((0, puerts_1.$set)(e, t.IsBeingAttacked),
			(0, puerts_1.$set)(n, t.IsBeingImpacted),
			(0, puerts_1.$set)(o, t.CollisionDirection),
			(0, puerts_1.$set)(r, t.CollisionStrength));
	}
	static IsAiDriver(t) {
		return (
			!!(t = EntitySystem_1.EntitySystem.GetComponent(t, 38)) && t.IsAiDriver
		);
	}
	static GetRoleActor(t) {
		return EntitySystem_1.EntitySystem.GetComponent(t, 47)?.GetRoleActor();
	}
	static SetFollowData(t, e, n) {
		EntitySystem_1.EntitySystem.GetComponent(t, 47)?.SetFollowData(e, n);
	}
	static GetFollowActor(t) {
		return EntitySystem_1.EntitySystem.GetComponent(t, 47)?.GetFollowActor();
	}
	static Reset(t, e) {
		EntitySystem_1.EntitySystem.GetComponent(t, 47)?.Reset(e);
	}
	static GetToRoleDistance(t) {
		return EntitySystem_1.EntitySystem.GetComponent(t, 47)?.GetToRoleDistance();
	}
	static GetSummonType(t) {
		return EntitySystem_1.EntitySystem.GetComponent(t, 47)?.SummonType;
	}
	static TsLogInfo(t) {
		Log_1.Log.CheckInfo() && Log_1.Log.Info("AI", 6, t);
	}
}
exports.default = TsAiBlueprintFunctionLibrary;
