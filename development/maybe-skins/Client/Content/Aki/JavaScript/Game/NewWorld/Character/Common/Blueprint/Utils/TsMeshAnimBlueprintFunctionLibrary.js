"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const puerts_1 = require("puerts"),
	UE = require("ue"),
	Log_1 = require("../../../../../../Core/Common/Log"),
	Protocol_1 = require("../../../../../../Core/Define/Net/Protocol"),
	EntitySystem_1 = require("../../../../../../Core/Entity/EntitySystem"),
	FNameUtil_1 = require("../../../../../../Core/Utils/FNameUtil"),
	TsBaseCharacter_1 = require("../../../../../Character/TsBaseCharacter"),
	EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
	GlobalData_1 = require("../../../../../GlobalData"),
	ModelManager_1 = require("../../../../../Manager/ModelManager"),
	VoxelUtils_1 = require("../../../../../Utils/VoxelUtils");
class TsMeshAnimBlueprintFunctionLibrary extends UE.BlueprintFunctionLibrary {
	static MainAnimInstance(t) {
		return EntitySystem_1.EntitySystem.GetComponent(t, 160)?.MainAnimInstance;
	}
	static GetSightDirect(t) {
		return EntitySystem_1.EntitySystem.GetComponent(t, 35)?.GetSightDirect();
	}
	static GetHulu(t) {
		return EntitySystem_1.EntitySystem.GetComponent(t, 69)?.Hulu;
	}
	static GetBattleIdleTime(t) {
		return EntitySystem_1.EntitySystem.GetComponent(t, 160)?.BattleIdleEndTime;
	}
	static EnterBattleIdle(t) {
		EntitySystem_1.EntitySystem.GetComponent(t, 160)?.EnterBattleIdle();
	}
	static SetTransformWithModelBuffer(t, e, n) {
		EntitySystem_1.EntitySystem.GetComponent(
			t,
			160,
		)?.SetTransformWithModelBuffer(e, n);
	}
	static SetSightDirectEnable(t, e) {
		(t = EntitySystem_1.EntitySystem.GetComponent(t, 35)) &&
			(t.EnableSightDirect = e);
	}
	static HideWeaponsWhenHideBones(t, e, n) {
		EntitySystem_1.EntitySystem.GetComponent(t, 69)?.HideWeaponsWhenHideBones(
			e,
			n,
		);
	}
	static ChangeWeaponHangState(t, e, n, o, i) {
		EntitySystem_1.EntitySystem.GetComponent(t, 69)?.ChangeWeaponHangState(
			e,
			(0, puerts_1.$unref)(o),
			(0, puerts_1.$unref)(i),
			n,
		);
	}
	static GetCurrentWeaponHangState(t) {
		return EntitySystem_1.EntitySystem.GetComponent(t, 69)?.BPr;
	}
	static GetIsCurrentWeaponHideEffectPlaying(t) {
		return (
			EntitySystem_1.EntitySystem.GetComponent(
				t,
				69,
			)?.IsCurrentWeaponHideEffectPlaying() ?? !1
		);
	}
	static ChangeWeapon(t, e) {
		EntitySystem_1.EntitySystem.GetComponent(
			t,
			69,
		)?.ChangeWeaponByWeaponSocketItem(e);
	}
	static GetRandomStandActionIndex(t) {
		return EntitySystem_1.EntitySystem.GetComponent(
			t,
			160,
		)?.GetRandomStandActionIndex();
	}
	static HideWeapon(t, e, n, o, i = !1) {
		EntitySystem_1.EntitySystem.GetComponent(t, 69)?.HideWeapon(
			n,
			e,
			o,
			!1,
			i ? 1 : 0,
		);
	}
	static HideHulu(t, e) {
		EntitySystem_1.EntitySystem.GetComponent(t, 69)?.SetHuluHidden(e);
	}
	static ChangeMeshAnim(t, e, n) {
		EntitySystem_1.EntitySystem.GetComponent(t, 3)?.ChangeMeshAnim(e, n);
	}
	static GetDegMovementSlope(t) {
		return EntitySystem_1.EntitySystem.GetComponent(t, 160)?.DegMovementSlope;
	}
	static GetRoleFootStepState(t) {
		var e = (t = EntitySystem_1.EntitySystem.GetComponent(
			t,
			0,
		)).GetEntityType();
		if (
			e === Protocol_1.Aki.Protocol.wks.Proto_Player &&
			((e = t.GetPlayerId()),
			(e = ModelManager_1.ModelManager.PlayerInfoModel.GetId() === e),
			(t = t.GetRoleId()),
			(t = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(t, e)) &&
				(e = t.GetRoleConfig()))
		)
			return e.FootStepState;
	}
	static SetIkMeshOffset(t, e) {
		(t = EntitySystem_1.EntitySystem.GetComponent(t, 160)) &&
			(t.IkMeshOffset = e);
	}
	static GetWeaponBreachLevel(t) {
		return (t = EntitySystem_1.EntitySystem.GetComponent(t, 69))
			? t.GetWeaponBreachLevel()
			: -1;
	}
	static UpdateAnimInfoMeshAnim(t, e) {
		var n,
			o,
			i = EntitySystem_1.EntitySystem.GetComponent(t, 160);
		i?.Valid &&
			((n = i.AnimLogicParamsSetter),
			(o = i.BattleIdleEndTime),
			n.BattleIdleTime !== o &&
				((n.BattleIdleTime = o), (e.BattleIdleTimeRef = o)),
			(o = i.DegMovementSlope),
			n.DegMovementSlope !== o &&
				((n.DegMovementSlope = o), (e.DegMovementSlopeRef = o)),
			(o = i.GetTsSightDirect()),
			n.SightDirect.Equals(o) ||
				(n.SightDirect.DeepCopy(o), (e.SightDirectRef = o.ToUeVector())),
			(i = EntitySystem_1.EntitySystem.GetComponent(
				t,
				61,
			).GetRagRollQuitState()),
			n.RagQuitState !== i) &&
			((n.RagQuitState = i), (e.RagQuitStateRef = i));
	}
	static UpdateAnimInfoMeshAnimRoleNpc(t, e) {
		var n, o;
		t = EntitySystem_1.EntitySystem.GetComponent(t, 160);
		t?.Valid &&
			((n = t.AnimLogicParamsSetter),
			(o = t.DegMovementSlope),
			n.DegMovementSlope !== o &&
				((n.DegMovementSlope = o), (e.DegMovementSlopeRef = o)),
			(o = t.GetTsSightDirect()),
			n.SightDirect.Equals(o) ||
				(n.SightDirect.DeepCopy(o), (e.SightDirectRef = o.ToUeVector())),
			(o = t.GetTsLookAt()),
			n.LookAt.Equals(o) ||
				(n.LookAt.DeepCopy(o), (e.LookAtRef = o.ToUeVector2D())),
			n.EnableBlendSpaceLookAt !== t.EnableBlendSpaceLookAt) &&
			((n.EnableBlendSpaceLookAt = t.EnableBlendSpaceLookAt),
			(e.EnableBlendSpaceLookAtRef = t.EnableBlendSpaceLookAt));
	}
	static UpdateFootstepAudioEvent(t, e, n) {
		var o = n.碰撞信息;
		if (
			(n["状态-地面-Sprint"] || o.bBlockingHit) &&
			((t = EntitySystem_1.EntitySystem.GetComponent(t, 3)), t?.Valid)
		) {
			var i = t.Owner;
			if (
				i instanceof TsBaseCharacter_1.default &&
				(EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.OnCharFootOnTheGround,
				),
				(t = t.Entity.GetComponent(40)),
				t?.Valid)
			) {
				var a = t.GetAkComponentBySocketName(
					FNameUtil_1.FNameUtil.GetDynamicFName("hitcase"),
				);
				if (a?.IsValid()) {
					o = i.CharRenderingComponent.GetInWater()
						? n.缓存角色位置
						: o.Location;
					let r = "";
					if (i.CharRenderingComponent.GetInWater())
						UE.AkGameplayStatics.SetRTPCValue(
							void 0,
							t.WaterDepth,
							0,
							void 0,
							FNameUtil_1.FNameUtil.NONE,
						),
							(r = "WaterSurface");
					else {
						if (((i = GlobalData_1.GlobalData.World), !i?.IsValid())) return;
						r = UE.KuroVoxelSystem.GetMtlNameByID(
							VoxelUtils_1.VoxelUtils.GetVoxelInfo(i, o).MtlID,
						);
					}
					a.SetSwitch(void 0, "FootStep_Ground_Texture", r),
						(t.FootSwitch = r),
						a.SetSwitch(
							void 0,
							"FootStep_Shoes",
							TsMeshAnimBlueprintFunctionLibrary.GetRoleFootStepState(e),
						),
						n["状态-地面-Walk"] || n["状态-跑停-WalkStop"]
							? a.PostAkEvent(n.WalkAkAudioEvent, 0, void 0, "")
							: n["状态-地面-Run"] || n["状态-跑停-RunStop"]
								? a.PostAkEvent(n.RunAkAudioEvent, 0, void 0, "")
								: n["状态-地面-Sprint"] || n["状态-跑停-SprintStop"]
									? a.PostAkEvent(n.SprintAkAudioEvent, 0, void 0, "")
									: a.PostAkEvent(n.FallbackAkAudioEvent, 0, void 0, "");
				}
			}
		}
	}
	static ChangeTickOverlap(t, e) {
		EntitySystem_1.EntitySystem.GetComponent(t, 99).SetTakeOverTick(e);
	}
	static AnimTurnLog(t) {
		var e = EntitySystem_1.EntitySystem.GetComponent(t, 3);
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info(
				"Test",
				6,
				"AnimTurn 1058338",
				["EntityId", t],
				["CurrentFacing", e.ActorRotationProxy],
				["InputFace", e.InputRotatorProxy],
			);
	}
	static IsNpcTurning(t) {
		return !!EntitySystem_1.EntitySystem.GetComponent(t, 163)?.IsTurning;
	}
}
exports.default = TsMeshAnimBlueprintFunctionLibrary;
