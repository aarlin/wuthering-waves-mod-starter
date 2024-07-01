"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UnopenedAreaPullback = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	Net_1 = require("../../../Core/Net/Net"),
	TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
	Vector_1 = require("../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	Global_1 = require("../../Global"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	CharacterUnifiedStateTypes_1 = require("../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes"),
	SceneEffectStateManager_1 = require("../../Render/Effect/PostProcess/SceneEffectStateManager"),
	InputDistributeController_1 = require("../../Ui/InputDistribute/InputDistributeController"),
	UiManager_1 = require("../../Ui/UiManager"),
	DISTANCE_FACOR = 100,
	TOLERANCE_DISTANCE = 5,
	TELEPORT_DELAY_TIME = 2e4,
	END_DISTANCE = 250,
	TIPS_NAME = "NotOpenArea";
class UnopenedAreaPullback {
	constructor() {
		(this.pLe = "Input Limited Action"),
			(this.rBe = 500),
			(this.nBe = !1),
			(this.sBe = !1),
			(this.aBe = !1),
			(this.hBe = !1),
			(this.lBe = void 0),
			(this._Be = Vector_1.Vector.Create()),
			(this.uBe = Vector_1.Vector.Create()),
			(this.jye = Vector_1.Vector.Create()),
			(this.RTe = Vector_1.Vector.Create()),
			(this.Hte = void 0),
			(this.cBe = void 0),
			(this.mBe = void 0),
			(this.dBe = void 0),
			(this.xie = (e, t) => {
				this.hBe &&
					(this.CBe(e), this.sBe) &&
					(t?.Valid &&
						(t.Entity.GetComponent(161).StopMoveToLocation(), this.gBe(t, !1)),
					this.gBe(e, !0),
					this.fBe(e));
			});
	}
	Tick(e) {
		var t, o;
		this.hBe &&
			this.dBe?.Valid &&
			!ModelManager_1.ModelManager.TeleportModel.IsTeleport &&
			((t = Vector_1.Vector.Dist2D(this._Be, this.Hte.ActorLocationProxy)),
			this.aBe &&
				((o = MathUtils_1.MathUtils.SafeDivide(t, this.rBe)),
				(o = MathUtils_1.MathUtils.Clamp(o, 0, 1)),
				SceneEffectStateManager_1.default.SetSceneEffectState(0, o)),
			!this.sBe && t > this.rBe
				? (this.pBe(), this.vBe())
				: this.sBe && t < 250 && this.MBe() && this.SBe());
	}
	MBe() {
		return (
			!!ModelManager_1.ModelManager.MapModel.IsInMapPolygon(
				this.Hte.ActorLocationProxy,
			) ||
			(this.jye.DeepCopy(this.Hte.ActorLocationProxy),
			this.jye.Subtraction(this._Be, this.jye),
			(this.jye.Z = 0),
			this.RTe.DeepCopy(this.uBe),
			(this.RTe.Z = 0),
			this.RTe.DotProduct(this.jye) < 0)
		);
	}
	pBe() {
		var e =
			ControllerHolder_1.ControllerHolder.GenericPromptController.GetViewNameByPromptId(
				TIPS_NAME,
			);
		e &&
			!UiManager_1.UiManager.IsViewOpen(e) &&
			ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
				TIPS_NAME,
			);
	}
	vBe() {
		(this.sBe = !0),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Map", 43, "开始执行拉回移动操作,禁用玩家输入"),
			this.EBe(!0),
			this.yBe(!1),
			this.IBe(),
			this.fBe(this.dBe);
	}
	SBe() {
		(this.sBe = !1),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Map", 43, "退出拉回移动操作,恢复玩家控制"),
			this.EBe(!1),
			this.yBe(!0),
			this.TBe(this.dBe);
	}
	Clear() {
		return (
			EventSystem_1.EventSystem.Has(
				EventDefine_1.EEventName.OnChangeRole,
				this.xie,
			) &&
				EventSystem_1.EventSystem.Remove(
					EventDefine_1.EEventName.OnChangeRole,
					this.xie,
				),
			!0
		);
	}
	OnEnterUnopenedArea() {
		this.hBe ||
			(EventSystem_1.EventSystem.Has(
				EventDefine_1.EEventName.OnChangeRole,
				this.xie,
			) ||
				EventSystem_1.EventSystem.Add(
					EventDefine_1.EEventName.OnChangeRole,
					this.xie,
				),
			(this.hBe = !0),
			(this.lBe = void 0),
			this.CBe(),
			this._Be.DeepCopy(
				ModelManager_1.ModelManager.MapModel.GetLastSafeLocation(),
			),
			this.LBe(!0),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Map", 43, "--------进入了未开放区域--------", [
					"EnterLoc",
					this._Be,
				]));
	}
	OnExitUnopenedArea() {
		this.hBe &&
			(EventSystem_1.EventSystem.Has(
				EventDefine_1.EEventName.OnChangeRole,
				this.xie,
			) &&
				EventSystem_1.EventSystem.Remove(
					EventDefine_1.EEventName.OnChangeRole,
					this.xie,
				),
			(this.hBe = !1),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Map", 43, "- - - - 离开了未开放区域- - - - "),
			this.LBe(!1),
			this.sBe) &&
			this.SBe();
	}
	fBe(e) {
		this.DBe(e);
		e = e.Entity.GetComponent(161);
		var t = { Index: 0, Position: this._Be };
		e.MoveAlongPath({
			Points: t,
			Navigation: !1,
			IsFly: !1,
			DebugMode: !0,
			Loop: !1,
			Callback: (e) => {
				this.sBe && this.SBe();
			},
			ReturnFalseWhenNavigationFailed: !1,
		});
	}
	DBe(e) {
		e.Entity?.CheckGetComponent(158)?.PositionState ===
			CharacterUnifiedStateTypes_1.ECharPositionState.Climb &&
			e.Entity?.GetComponent(31)?.ClimbPress(!0);
	}
	RBe() {
		ModelManager_1.ModelManager.SceneTeamModel.IsAllDid() ||
			(this.sBe && this.SBe(),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Map", 43, "在未开放区域待太久，开始传送"),
			this.UBe());
	}
	UBe() {
		Net_1.Net.Call(14379, Protocol_1.Aki.Protocol.Mus.create(), (e) => {
			e.lkn !==
				Protocol_1.Aki.Protocol.lkn.Proto_ErrPlayerIsTeleportCanNotDoTeleport &&
				e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys &&
				ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
					e.lkn,
					19586,
				);
		});
	}
	TBe(e) {
		var t;
		(t =
			((t = e.Entity.GetComponent(161)).StopMove(!1),
			t.MoveToLocationEnd(1),
			e.Entity.GetComponent(52))).ClearMoveVectorCache(),
			t.SetActive(!0),
			this.gBe(e, !1),
			InputDistributeController_1.InputDistributeController.RefreshInputTag();
	}
	IBe() {
		EventSystem_1.EventSystem.Emit(
			EventDefine_1.EEventName.ForceReleaseInput,
			this.pLe,
		),
			this.mBe.DirectionState ===
			CharacterUnifiedStateTypes_1.ECharDirectionState.AimDirection
				? this.mBe.ExitAimStatus()
				: this.mBe.SetDirectionState(this.mBe.DirectionState),
			this.cBe &&
				this.cBe.CurrentSkill &&
				(this.cBe.EndOwnerAndFollowSkills(),
				this.ABe(this.dBe.Entity.GetComponent(36), 0, 0)),
			this.Hte.ClearInput();
		var e = this.dBe.Entity.GetComponent(52);
		e.ClearMoveVectorCache(),
			e.SetActive(!1),
			this.gBe(this.dBe, !0),
			InputDistributeController_1.InputDistributeController.RefreshInputTag();
	}
	CBe(e) {
		e && e.Valid
			? (this.dBe = e)
			: (this.dBe = ModelManager_1.ModelManager.CreatureModel.GetEntityById(
					Global_1.Global.BaseCharacter.EntityId,
				)),
			(this.Hte = this.dBe.Entity.GetComponent(3)),
			(this.cBe = this.dBe.Entity.GetComponent(33)),
			(this.mBe = this.dBe.Entity.GetComponent(158));
	}
	ABe(e, t, o) {
		var i = e.Entity.GetComponent(185);
		0 === t || i?.HasTag(-2100129479)
			? e.CharacterMovement.SetMovementMode(1, o)
			: e.CharacterMovement.SetMovementMode(t, o);
	}
	yBe(e) {
		e &&
			this.nBe &&
			(ModelManager_1.ModelManager.BattleUiModel.ChildViewData.ShowBattleView(
				11,
			),
			(this.nBe = !1)),
			e ||
				this.nBe ||
				(ModelManager_1.ModelManager.BattleUiModel.ChildViewData.HideBattleView(
					11,
					[18],
				),
				(this.nBe = !0));
	}
	LBe(e) {
		(this.aBe = e) ||
			SceneEffectStateManager_1.default.SetSceneEffectState(0, 0);
	}
	EBe(e) {
		e
			? this.lBe ||
				(Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("Map", 43, "开启定时器传送", ["Time", 2e4]),
				(this.lBe = TimerSystem_1.TimerSystem.Delay(() => {
					this.RBe(), (this.lBe = void 0);
				}, 2e4)))
			: (this.lBe &&
					TimerSystem_1.TimerSystem.Has(this.lBe) &&
					(Log_1.Log.CheckInfo() && Log_1.Log.Info("Map", 43, "移除定时器传送"),
					TimerSystem_1.TimerSystem.Remove(this.lBe)),
				(this.lBe = void 0));
	}
	gBe(e, t) {
		var o;
		e &&
			e.Valid &&
			(t &&
				((o = e.Entity.GetComponent(185))?.AddTag(-1697149502),
				o?.AddTag(-541178966),
				o?.AddTag(-542518289)),
			t ||
				((o = e.Entity.GetComponent(185))?.RemoveTag(-1697149502),
				o?.RemoveTag(-541178966),
				o?.RemoveTag(-542518289)));
	}
	get GetInPullback() {
		return this.sBe;
	}
}
exports.UnopenedAreaPullback = UnopenedAreaPullback;
