"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelGamePlayController = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	Log_1 = require("../../Core/Common/Log"),
	Time_1 = require("../../Core/Common/Time"),
	Protocol_1 = require("../../Core/Define/Net/Protocol"),
	EntitySystem_1 = require("../../Core/Entity/EntitySystem"),
	ControllerBase_1 = require("../../Core/Framework/ControllerBase"),
	Net_1 = require("../../Core/Net/Net"),
	MathUtils_1 = require("../../Core/Utils/MathUtils"),
	EventDefine_1 = require("../Common/Event/EventDefine"),
	EventSystem_1 = require("../Common/Event/EventSystem"),
	Global_1 = require("../Global"),
	ConfigManager_1 = require("../Manager/ConfigManager"),
	ControllerHolder_1 = require("../Manager/ControllerHolder"),
	ModelManager_1 = require("../Manager/ModelManager"),
	CombatMessage_1 = require("../Module/CombatMessage/CombatMessage"),
	EntityHandle_1 = require("../NewWorld/Character/EntityHandle"),
	SceneInteractionManager_1 = require("../Render/Scene/Interaction/SceneInteractionManager"),
	SHOW_FAKE_ERROR_CODE_TIPS_INTERVAL = 1e3;
class LevelGamePlayController extends ControllerBase_1.ControllerBase {
	static HandleScanResponse(e) {
		return !(
			!e ||
			!UE.KuroStaticLibrary.IsImplementInterface(
				e.GetClass(),
				UE.BPI_CreatureInterface_C.StaticClass(),
			) ||
			!(e = EntitySystem_1.EntitySystem.Get(e.GetEntityId())) ||
			(e.GetComponent(71)?.StartProcess(),
			e.GetComponent(59)?.ShowScanEffect(),
			0)
		);
	}
	static HandleClearAllScanEffect() {}
	static MultiplayerLimitTypeCheck(e, t = !0) {
		if (!ModelManager_1.ModelManager.GameModeModel.IsMulti) return !0;
		switch (e) {
			case 2:
				return t && LevelGamePlayController.ShowFakeErrorCodeTips(), !1;
			case 0:
				var o =
					ModelManager_1.ModelManager.PlayerInfoModel.GetId() ===
					ModelManager_1.ModelManager.CreatureModel.GetWorldOwner();
				return !o && t && LevelGamePlayController.ShowFakeErrorCodeTips(), o;
			case 1:
				return !0;
			default:
				return (
					Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Level",
							7,
							"[MultiplayerCommonCheck] 不支持的联机限制类型",
						),
					!1
				);
		}
	}
	static ShowFakeErrorCodeTips() {
		var e;
		Time_1.Time.Now - this.lUe < 1e3 ||
			((this.lUe = Time_1.Time.Now),
			(e =
				ConfigManager_1.ConfigManager.ErrorCodeConfig.GetTextByErrorId(600064)),
			ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByItsType(
				9,
				void 0,
				void 0,
				[e],
			));
	}
	static OnInit() {
		return (
			Net_1.Net.Register(10783, LevelGamePlayController._Ue),
			Net_1.Net.Register(28324, LevelGamePlayController.uUe),
			Net_1.Net.Register(25613, LevelGamePlayController.cUe),
			Net_1.Net.Register(23017, LevelGamePlayController.mUe),
			Net_1.Net.Register(16711, LevelGamePlayController.dUe),
			Net_1.Net.Register(14787, (e) => {
				this.OnEnableNearbyTrackingNotify(e);
			}),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnSceneItemVisionCaptureAdd,
				this.CUe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnSceneItemVisionCaptureRemove,
				this.gUe,
			),
			(this.fUe = new Map()),
			!0
		);
	}
	static OnClear() {
		return (
			Net_1.Net.UnRegister(10783),
			Net_1.Net.UnRegister(28324),
			Net_1.Net.UnRegister(25613),
			Net_1.Net.UnRegister(23017),
			Net_1.Net.UnRegister(16711),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnSceneItemVisionCaptureAdd,
				this.CUe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnSceneItemVisionCaptureRemove,
				this.gUe,
			),
			!(this.fUe = void 0)
		);
	}
	static ThrowDamageChangeRequest(e, t) {
		var o = Protocol_1.Aki.Protocol.L_s.create();
		(o.rkn = MathUtils_1.MathUtils.NumberToLong(
			ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(e),
		)),
			(o.kkn = MathUtils_1.MathUtils.BigIntToLong(t)),
			Net_1.Net.Call(14943, o, (e) => {
				switch (e.lkn) {
					case Protocol_1.Aki.Protocol.lkn.Sys:
					case Protocol_1.Aki.Protocol.lkn.Proto_ErrThrowDamageEntityNotExit:
					case Protocol_1.Aki.Protocol.lkn
						.Proto_ErrThrowDamageReqEntityIsAlreadyDead:
						break;
					default:
						ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
							e.lkn,
							13248,
						);
				}
			});
	}
	static ManipulatableBeCastOrDrop2Server(e, t) {
		var o = Protocol_1.Aki.Protocol.A1s.create();
		(o.rkn = MathUtils_1.MathUtils.NumberToLong(
			ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(e),
		)),
			(o.Fkn = t ? 1 : 2),
			Net_1.Net.Call(13519, o, (e) => {
				switch (e.lkn) {
					case Protocol_1.Aki.Protocol.lkn.Sys:
					case Protocol_1.Aki.Protocol.lkn.Proto_ErrBeControlledEntityNotExist:
						break;
					default:
						ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
							e.lkn,
							13248,
						);
				}
			});
	}
	static async GetRewardTreasureBoxRequest(e) {
		if (this.fUe?.get(e)) return !1;
		this.fUe.set(e, !0);
		var t =
			(((t = Protocol_1.Aki.Protocol.P_s.create()).rkn =
				MathUtils_1.MathUtils.NumberToLong(
					ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(e),
				)),
			await Net_1.Net.CallAsync(23912, t));
		return (
			this.fUe.delete(e),
			!!t &&
				(t.lkn !== Protocol_1.Aki.Protocol.lkn.Sys
					? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
							t.lkn,
							29891,
						),
						!1)
					: (EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.OpenTreasureBox,
						),
						!0))
		);
	}
	static ElevatorStateChangeRequest(e, t, o, r) {
		var a = Protocol_1.Aki.Protocol.jXn.create();
		(a.rkn = MathUtils_1.MathUtils.NumberToLong(
			ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(e),
		)),
			(a.Vkn = t),
			(a.ckn = o),
			Net_1.Net.Call(11463, a, (e) => {
				if ((r(), e))
					switch (e.lkn) {
						case Protocol_1.Aki.Protocol.lkn.Sys:
						case Protocol_1.Aki.Protocol.lkn.Proto_ErrElevatorLocked:
							break;
						default:
							ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
								e.lkn,
								8677,
							);
					}
			});
	}
	static OnManipulatableItemExitAreaInternal(e, t, o = 0, r = !1) {
		if (e) {
			let s;
			var a,
				n,
				l,
				i = (s =
					e instanceof EntityHandle_1.EntityHandle ? e.Entity : e).GetComponent(
					182,
				);
			i.IsMoveAutonomousProxy &&
				((n = new UE.Transform()),
				(l = (0, puerts_1.$ref)(void 0)),
				(a = (0, puerts_1.$ref)(void 0)),
				SceneInteractionManager_1.SceneInteractionManager.Get()
					.GetMainCollisionActor(i.GetSceneInteractionLevelHandleId())
					.GetActorBounds(!1, l, a),
				n.SetLocation((0, puerts_1.$unref)(l)),
				(i = s.GetComponent(140)),
				(a = t ?? "ResetPositionTip"),
				ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
					a,
				),
				i
					? (r
							? i.ResetItemLocationAndRotation(o, !0)
							: i.ResetItemLocationAndRotation(),
						(n = Global_1.Global.BaseCharacter) &&
							((l = n.CharacterActorComponent.Entity.GetComponent(55)),
							e.Id === l.GetHoldingEntity()?.Id) &&
							l.StopManipualte())
					: Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug(
							"Character",
							32,
							"[Manipulate] 服务器返回的Entity没有SceneItemManipulatableComponent",
						));
		} else
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"Character",
					32,
					"[Manipulate] 服务器返回的Id找不到对应的Entity",
				);
	}
	static EntityFollowTrackRequest(e, t) {
		var o = Protocol_1.Aki.Protocol.O1s.create();
		(o.rkn = MathUtils_1.MathUtils.NumberToLong(e)),
			Net_1.Net.Call(10581, o, t);
	}
	static EntityBuffProducerRequest(e, t) {
		var o = Protocol_1.Aki.Protocol.lYn.create();
		(o.Hkn = MathUtils_1.MathUtils.NumberToLong(e)),
			Net_1.Net.Call(10490, o, t);
	}
	static ShootTargetHitGearStateChangeRequest(e, t) {
		var o = Protocol_1.Aki.Protocol.I_s.create();
		(o.rkn = MathUtils_1.MathUtils.NumberToLong(
			ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(e),
		)),
			Net_1.Net.Call(24031, o, t);
	}
	static OnEnableNearbyTrackingNotify(e) {
		if (ModelManager_1.ModelManager.CreatureModel.GetInstanceId() === e.Rkn)
			for (const o of e.jkn) {
				var t =
					ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(o);
				t && (t = t.Entity.GetComponent(144)) && (t.EnableTracking = !1);
			}
	}
	static EntityAdsorbRequest(e, t) {
		var o = Protocol_1.Aki.Protocol.NYn.create();
		(o.rkn = e), Net_1.Net.Call(5811, o, t);
	}
	static RequestChairSit(e, t, o) {
		var r = Protocol_1.Aki.Protocol.t_s.create();
		(e =
			((r.rkn = MathUtils_1.MathUtils.NumberToLong(e)),
			(r.Wkn = t),
			Global_1.Global.BaseCharacter?.CharacterActorComponent.Entity.GetComponent(
				0,
			).GetCreatureDataId())) &&
			(r.Kkn = CombatMessage_1.CombatNet.CreateCombatCommon(e)),
			(r.Qkn = o),
			Net_1.Net.Call(2325, r, (e) => {
				Global_1.Global.BaseCharacter.CharacterActorComponent?.Entity.GetComponent(
					26,
				)?.OnResponseSit(t, e.lkn);
			});
	}
}
((exports.LevelGamePlayController = LevelGamePlayController).fUe = void 0),
	(LevelGamePlayController.lUe = 0),
	(LevelGamePlayController.cUe = (e) => {}),
	(LevelGamePlayController.uUe = (e) => {
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug(
				"World",
				18,
				"服务端通知耐久度变化",
				["CreatureDataId", e.rkn],
				["耐久度", e.pxs],
			);
		var t,
			o,
			r = ModelManager_1.ModelManager.CreatureModel.GetEntity(
				MathUtils_1.MathUtils.LongToNumber(e.rkn),
			);
		r?.Valid &&
			((t = r.Entity.GetComponent(0)),
			(e = e.pxs),
			(o = t.GetDurabilityValue()),
			t.SetDurabilityValue(e),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnAnySceneItemDurabilityChange,
				r,
				e,
				o,
			));
	}),
	(LevelGamePlayController._Ue = (e) => {
		var t = MathUtils_1.MathUtils.LongToNumber(e.Ekn);
		(t = ModelManager_1.ModelManager.CreatureModel.GetEntity(t)) &&
			(t.Entity.GetComponent(0).UpdateEntityCommonTags(e.Ggs),
			t.Entity.GetComponent(177).SyncTagsFromServer(e.Ggs));
	}),
	(LevelGamePlayController.dUe = (e) => {
		var t = MathUtils_1.MathUtils.LongToNumber(e.rkn);
		(t = ModelManager_1.ModelManager.CreatureModel.GetEntity(t))
			? (t = t.Entity.GetComponent(123)) && t.SetTargetFloor(e.$kn)
			: Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn("SceneItem", 36, "OnElevatorMoveNotify No Entity", [
					"id",
					e.rkn,
				]);
	}),
	(LevelGamePlayController.mUe = (e) => {
		(e = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e.rkn)),
			LevelGamePlayController.OnManipulatableItemExitAreaInternal(e, void 0);
	}),
	(LevelGamePlayController.CUe = (e, t) => {
		ModelManager_1.ModelManager.VisionCaptureModel?.AddVisionCapture(e, t);
	}),
	(LevelGamePlayController.gUe = (e) => {
		ModelManager_1.ModelManager.VisionCaptureModel?.RemoveVisionCapture(e);
	});
