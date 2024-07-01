"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventCharacterMove = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	Vector_1 = require("../../../Core/Utils/Math/Vector"),
	IAction_1 = require("../../../UniverseEditor/Interface/IAction"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	Global_1 = require("../../Global"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	TeleportController_1 = require("../../Module/Teleport/TeleportController"),
	CharacterUnifiedStateTypes_1 = require("../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes"),
	InputDistributeController_1 = require("../../Ui/InputDistribute/InputDistributeController"),
	LevelGeneralBase_1 = require("../LevelGeneralBase"),
	LevelGeneralContextDefine_1 = require("../LevelGeneralContextDefine"),
	MAX_EXCUTE_TIME_SEC = 10;
class LevelEventCharacterMove extends LevelGeneralBase_1.LevelEventBase {
	constructor() {
		super(...arguments),
			(this.$Le = void 0),
			(this.YLe = !1),
			(this.JLe = void 0),
			(this.zLe = void 0),
			(this.ZLe = (e) => {
				LevelEventCharacterMove.eDe(e, this.$Le, this.YLe, this.zLe, () => {
					this.FinishExecute(!0);
				});
			});
	}
	ExecuteNew(e, t, r) {
		if (e) {
			var o = e;
			e =
				((this.zLe = Vector_1.Vector.Create(
					o.Pos.X ?? 0,
					o.Pos.Y ?? 0,
					o.Pos.Z ?? 0,
				)),
				{ Index: 0, Position: this.zLe });
			switch (
				((this.JLe = {
					Points: [e],
					Navigation: o.MoveType === IAction_1.ECharacterMoveToPointType.Walk,
					IsFly: !1,
					DebugMode: !0,
					Loop: !1,
					Callback: this.IsAsync ? void 0 : this.ZLe,
					ReturnFalseWhenNavigationFailed: !1,
					ReturnTimeoutFailed: 10,
				}),
				o.Target.Type)
			) {
				case "Player":
					if (this.tDe()) break;
					return void this.FinishExecute(!1);
				case "Target":
					if (
						((this.$Le =
							ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(
								o.Target.EntityId,
							)),
						this.iDe())
					)
						break;
					return void this.FinishExecute(!1);
				case "Triggered":
					if (this.oDe(t)) break;
					return void this.FinishExecute(!1);
				default:
					return (
						Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"LevelEvent",
								40,
								"[LevelEventCharacterMove] 不支持的目标类型",
							),
						void this.FinishExecute(!1)
					);
			}
			this.IsAsync && this.FinishExecute(!0);
		} else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"LevelEvent",
					40,
					"[LevelEventCharacterMove] 参数不合法",
				),
				this.FinishExecute(!1);
	}
	tDe() {
		if (
			((this.YLe = !0),
			(this.$Le = ModelManager_1.ModelManager.CharacterModel?.GetHandleByEntity(
				Global_1.Global.BaseCharacter?.GetEntityNoBlueprint(),
			)),
			!this.$Le?.Valid)
		)
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"LevelEvent",
						40,
						"[LevelEventCharacterMove] 找不到玩家目标",
					),
				!1
			);
		var e = this.$Le.Entity.GetComponent(161);
		if (
			(e.IsMovingToLocation() && e.MoveToLocationEnd(1),
			LevelEventCharacterMove.rDe(!1),
			this.IsAsync)
		) {
			const e = this.$Le,
				t = this.zLe;
			this.JLe.Callback = (r) => {
				LevelEventCharacterMove.eDe(r, e, !0, t);
			};
		}
		return e.MoveAlongPath(this.JLe), !0;
	}
	iDe() {
		if (!this.$Le?.Valid)
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"LevelEvent",
						40,
						"[LevelEventCharacterMove] 找不到有效目标实体",
					),
				!1
			);
		var e = this.$Le.Entity.GetComponent(161);
		if (!this.$Le.Entity.GetComponent(0)?.IsCharacter() || !e)
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"LevelEvent",
						40,
						"[LevelEventCharacterMove] 目标实体非可移动角色",
					),
				!1
			);
		if (
			this.$Le.Entity.Id ===
			Global_1.Global.BaseCharacter?.GetEntityIdNoBlueprint()
		)
			return this.tDe();
		if ((e.IsMovingToLocation() && e.MoveToLocationEnd(1), this.IsAsync)) {
			const e = this.$Le,
				t = this.zLe;
			this.JLe.Callback = (r) => {
				LevelEventCharacterMove.eDe(r, e, !1, t);
			};
		}
		return e.MoveAlongPath(this.JLe), !0;
	}
	oDe(e) {
		return e instanceof LevelGeneralContextDefine_1.TriggerContext &&
			e.OtherEntityId
			? ((this.$Le = ModelManager_1.ModelManager.CreatureModel?.GetEntityById(
					e.OtherEntityId,
				)),
				this.iDe())
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"LevelEvent",
						40,
						"[LevelEventCharacterMove] context数据异常",
					),
				!1);
	}
	static rDe(e) {
		var t,
			r,
			o,
			n,
			i,
			a = Global_1.Global.BaseCharacter?.GetEntityNoBlueprint();
		a?.Valid &&
			((t = a.GetComponent(158)),
			(r = a.GetComponent(33)),
			(o = a.GetComponent(3)),
			(n = a.GetComponent(52)),
			(i = a.GetComponent(185)),
			(a = a.GetComponent(161)),
			e
				? (a?.StopMove(!1),
					a?.ResetMaxSpeed(t?.MoveState),
					o?.ClearInput(),
					n?.ClearMoveVectorCache(),
					n?.SetActive(!0),
					i?.RemoveTag(-1697149502),
					i?.RemoveTag(-541178966),
					i?.RemoveTag(-542518289),
					i?.RemoveTag(-2140742267),
					i?.RemoveTag(-1013832153))
				: (EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.ForceReleaseInput,
						"LevelEventCharacterMove",
					),
					t?.DirectionState ===
						CharacterUnifiedStateTypes_1.ECharDirectionState.AimDirection &&
						t?.ExitAimStatus(),
					r?.CurrentSkill && r.EndOwnerAndFollowSkills(),
					o?.ClearInput(),
					n?.ClearMoveVectorCache(),
					n?.SetActive(!1),
					i?.AddTag(-1697149502),
					i?.AddTag(-541178966),
					i?.AddTag(-542518289),
					i?.AddTag(-2140742267),
					i?.AddTag(-1013832153)),
			InputDistributeController_1.InputDistributeController.RefreshInputTag());
	}
}
(exports.LevelEventCharacterMove = LevelEventCharacterMove).eDe = (
	e,
	t,
	r,
	o,
	n,
) => {
	1 !== e
		? ((e = t?.Entity?.GetComponent(3)),
			r
				? TeleportController_1.TeleportController.TeleportToPositionNoLoading(
						o.ToUeVector(),
						e?.ActorRotation,
						"[LevelEventCharacterMove] 移动失败或超时，传送到目标位置",
					).finally(() => {
						LevelEventCharacterMove.rDe(!0), n?.();
					})
				: (e?.TeleportAndFindStandLocation(o), n?.()))
		: (r && LevelEventCharacterMove.rDe(!0), n?.());
};
