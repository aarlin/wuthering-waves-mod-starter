"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BulletActionAfterInit = void 0);
const UE = require("ue"),
	Info_1 = require("../../../../Core/Common/Info"),
	Log_1 = require("../../../../Core/Common/Log"),
	Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	CombatMessage_1 = require("../../../Module/CombatMessage/CombatMessage"),
	BulletConstant_1 = require("../BulletConstant"),
	BulletActionBase_1 = require("./BulletActionBase");
class BulletActionAfterInit extends BulletActionBase_1.BulletActionBase {
	OnExecute() {
		var e,
			t,
			a,
			l,
			o = this.BulletInfo,
			n = o.BulletDataMain.Execution.SendGameplayEventTagToAttackerOnStart,
			r =
				(n &&
					n.TagName !== StringUtils_1.NONE_STRING &&
					(r = o.AttackerActorComp?.Actor)?.IsValid() &&
					(((e = new UE.GameplayEventData()).OptionalObject = o.Actor),
					UE.AbilitySystemBlueprintLibrary.SendGameplayEventToActor(r, n, e)),
				Info_1.Info.IsBuildDevelopmentOrDebug &&
					EventSystem_1.EventSystem.EmitWithTarget(
						o.Attacker,
						EventDefine_1.EEventName.BulletCreate,
						o,
					),
				(o.IsInit = !0),
				o.ActionLogicComponent.OnAfterInit(),
				{
					y4n: o.BulletEntityId,
					aFn: ModelManager_1.ModelManager.CreatureModel.GetPlayerId(),
				});
		ModelManager_1.ModelManager.BulletModel.RegisterBullet(r, o.BulletEntityId),
			(o.PreContextId = o.BulletInitParams.FromRemote
				? 0n
				: o.BulletInitParams.ContextId),
			(o.ContextId = o.BulletInitParams.FromRemote
				? o.BulletInitParams.ContextId
				: ModelManager_1.ModelManager.CombatMessageModel.GenMessageId()),
			o.BulletInitParams.FromRemote
				? BulletConstant_1.BulletConstant.OpenCreateLog &&
					Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("Bullet", 18, "创建被同步子弹", [
						"bulletRowName",
						o.BulletRowName,
					])
				: ((n = 1 !== o.BulletInitParams.SyncType),
					(e = ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(
						o.TargetId,
					)),
					(t = o.GetActorLocation()),
					(a = o.MoveInfo.BeginSpeedRotator),
					((l = Protocol_1.Aki.Protocol.H2n.create()).E4n = r),
					(l.wVn = MathUtils_1.MathUtils.NumberToLong(Number(o.BulletRowName))),
					(l.vkn = o.BulletInitParams.SkillId),
					(l.$kn = t),
					(l.D3n = a),
					(l.bVn = ModelManager_1.ModelManager.BulletModel.GetBulletHandleById(
						o.BulletInitParams.ParentId,
					)),
					(l.qVn = MathUtils_1.MathUtils.NumberToLong(
						ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(
							o.BulletInitParams.BaseTransformId,
						),
					)),
					(l.GVn = MathUtils_1.MathUtils.NumberToLong(
						ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(
							o.BulletInitParams.BaseVelocityId,
						),
					)),
					(l.L4n = MathUtils_1.MathUtils.NumberToLong(e)),
					(l.OVn = n),
					(l.NVn = o.BulletInitParams.DtType),
					(l.kVn = o.RandomPosOffset),
					(l.FVn = o.RandomInitSpeedOffset),
					CombatMessage_1.CombatNet.Call(
						7976,
						o.Attacker,
						l,
						(e) => {},
						o.PreContextId,
						o.ContextId,
					),
					BulletConstant_1.BulletConstant.OpenCreateLog &&
						(n
							? Log_1.Log.CheckDebug() &&
								Log_1.Log.Debug("Bullet", 18, "创建本地子弹", [
									"bulletRowName",
									o.BulletRowName,
								])
							: Log_1.Log.CheckDebug() &&
								Log_1.Log.Debug(
									"Bullet",
									18,
									"创建同步子弹",
									["bulletRowName", o.BulletRowName],
									["skillId", o.BulletInitParams.SkillId],
									["handleId", r.y4n],
									["playerId", r.aFn],
									["Location", t],
									["Rotation", a],
									["TargetId", e],
								)));
	}
}
exports.BulletActionAfterInit = BulletActionAfterInit;
