"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const puerts_1 = require("puerts"),
	UE = require("ue"),
	AudioController_1 = require("../../../Core/Audio/AudioController"),
	Info_1 = require("../../../Core/Common/Info"),
	Log_1 = require("../../../Core/Common/Log"),
	QueryTypeDefine_1 = require("../../../Core/Define/QueryTypeDefine"),
	TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
	TsBaseCharacter_1 = require("../../Character/TsBaseCharacter"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	Global_1 = require("../../Global"),
	GlobalData_1 = require("../../GlobalData"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	AreaController_1 = require("../../Module/Area/AreaController"),
	RoleTriggerController_1 = require("../Character/Role/RoleTriggerController"),
	TsBaseItem_1 = require("../SceneItem/BaseItem/TsBaseItem"),
	KuroTriggerType = QueryTypeDefine_1.KuroCollisionChannel.KuroTrigger,
	AREA_CD = 500;
class TsTriggerVolume extends UE.KuroEffectActor {
	constructor() {
		super(...arguments),
			(this.TriggerItem = void 0),
			(this.TriggerItems = void 0),
			(this.TriggerType = 0),
			(this.TriggerGroup = 0),
			(this.TriggerId = -0),
			(this.ConditionGroupId = ""),
			(this.EventGroupId = ""),
			(this.ExitEventGroupId = ""),
			(this.IsPlayer = !1),
			(this.TriggerItemEffectData = void 0),
			(this.NotScale = !1),
			(this.IgnoreBullet = !1),
			(this.HitCd = 0),
			(this.HitEffectData = void 0),
			(this.HitDataName = ""),
			(this.IsBlockCamera = !0),
			(this.AreaId = 0),
			(this.IsAutoTriggerEffect = !1),
			(this.EffectCd = 0),
			(this.ToleranceDistance = 5),
			(this.EnterAkEvent = void 0),
			(this.ExitAkEvent = void 0),
			(this.IsChangeFootStep = !0),
			(this.FootStepMaterialId = 0),
			(this.IsAreaEnterHanlde = !1),
			(this.IsAreaLeaveHanlde = !1),
			(this.AreaEnterCdId = void 0),
			(this.AreaLeaveCdId = void 0),
			(this.CountInTrigger = 0),
			(this.BuffIds = void 0),
			(this.IsRemoveBuffIds = !1),
			(this.BuffTimerId = void 0),
			(this.PropsIds = void 0),
			(this.AddBuffType = void 0),
			(this.HandleWorldDone = void 0);
	}
	ReceiveBeginPlay() {
		this.SetActorTickEnabled(!1), this.InitTriggerItem(this.TriggerItem);
		for (let e = 0; e < this.TriggerItems.Num(); e++)
			this.InitTriggerItem(this.TriggerItems.Get(e));
		(this.HandleWorldDone = () => {
			this.OnWorldDone();
		}),
			ModelManager_1.ModelManager.GameModeModel?.WorldDone
				? this.OnWorldDone()
				: (GlobalData_1.GlobalData.BpEventManager.WorldDoneNotify.Remove(
						this.HandleWorldDone,
					),
					GlobalData_1.GlobalData.BpEventManager.WorldDoneNotify.Add(
						this.HandleWorldDone,
					)),
			this.TriggerGroup &&
				this.TriggerId &&
				ModelManager_1.ModelManager.TriggerVolumeModel.AddTriggerVolume(
					this.TriggerGroup,
					this.TriggerId,
					this,
				),
			this.AreaId &&
				((this.IsAreaEnterHanlde = !0),
				(this.IsAreaLeaveHanlde = !0),
				(this.AreaEnterCdId = void 0),
				ModelManager_1.ModelManager.AreaModel.AddArea(this.AreaId, this)),
			this.AddBuff();
	}
	OnWorldDone() {
		this.AreaId &&
			this.SetEnable(
				ModelManager_1.ModelManager.AreaModel.GetAreaState(this.AreaId),
			),
			this.RegistEvents(this.TriggerItem);
		for (let e = 0; e < this.TriggerItems.Num(); e++)
			this.RegistEvents(this.TriggerItems.Get(e));
	}
	InitTriggerItem(e) {
		e &&
			4 === this.TriggerType &&
			e.BrushComponent.SetCollisionObjectType(KuroTriggerType);
	}
	ReceiveEndPlay() {
		this.RemoveEvents(this.TriggerItem);
		for (let e = 0; e < this.TriggerItems.Num(); e++)
			this.RemoveEvents(this.TriggerItems.Get(e));
		this.TriggerGroup &&
			this.TriggerId &&
			ModelManager_1.ModelManager.TriggerVolumeModel?.RemoveTriggerVolume(
				this.TriggerGroup,
				this.TriggerId,
			),
			this.AreaId &&
				((this.AreaLeaveCdId = void 0),
				(this.IsAreaEnterHanlde = !0),
				ModelManager_1.ModelManager.AreaModel?.RemoveArea(this.AreaId),
				TimerSystem_1.TimerSystem.Has(this.AreaEnterCdId) &&
					TimerSystem_1.TimerSystem.Remove(this.AreaEnterCdId),
				TimerSystem_1.TimerSystem.Has(this.AreaLeaveCdId)) &&
				TimerSystem_1.TimerSystem.Remove(this.AreaLeaveCdId);
	}
	ReceiveTick(e) {}
	RegistEvents(e) {
		if (((this.CountInTrigger = 0), e?.IsValid())) {
			var r = (0, puerts_1.$ref)(void 0),
				t = (e.GetOverlappingActors(r), (0, puerts_1.$unref)(r));
			if (0 < t?.Num())
				for (let e = 0, r = t.Num(); e < r; e++) {
					var i = t.Get(e);
					this.OnCollisionEnterFunc(i, void 0);
				}
			e.OnActorBeginOverlap.Add((e, r) => {
				this.OnCollisionEnterFunc(r, e);
			}),
				e.OnActorEndOverlap.Add((e, r) => {
					this.OnCollisionExitFunc(r, e);
				});
		}
	}
	RemoveEvents(e) {
		e &&
			(e.OnActorBeginOverlap.Clear(),
			e.OnActorEndOverlap.Clear(),
			e.OnActorHit.Clear()),
			GlobalData_1.GlobalData.BpEventManager.WorldDoneNotify.Remove(
				this.HandleWorldDone,
			);
	}
	OnCollisionEnterFunc(e, r) {
		this.CheckCondition(e) &&
			(this.CountInTrigger++,
			this.AreaId && 1 === this.CountInTrigger && this.HandleAreaEnter(e, r),
			Global_1.Global.BaseCharacter) &&
			this.EnterAkEvent &&
			this.PostAkEvent(e, this.EnterAkEvent);
	}
	OnCollisionExitFunc(e, r) {
		this.CheckBeginOverlapRoleTrigger(e) &&
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnTriggerVolumeExit,
				this,
			),
			this.CheckCondition(e) &&
				(this.CountInTrigger--,
				this.AreaId &&
					this.CountInTrigger <= 0 &&
					(this.HandleAreaLeave(e, r), (this.CountInTrigger = 0)),
				this.ExitAkEvent) &&
				this.PostAkEvent(e, this.ExitAkEvent);
	}
	CheckCondition(e) {
		return (
			!!e?.IsValid() &&
			(this.IsPlayer ||
			1 === this.TriggerType ||
			this.EnterAkEvent ||
			this.ExitAkEvent
				? this.CheckBeginOverlapRoleTrigger(e) || !1
				: e instanceof TsBaseCharacter_1.default ||
					e instanceof TsBaseItem_1.default)
		);
	}
	SetEnable(e) {
		this.TriggerItem && this.TriggerItem.SetActorEnableCollision(e);
		for (let r = 0; r < this.TriggerItems.Num(); r++)
			this.TriggerItems.Get(r)?.SetActorEnableCollision(e);
	}
	HandleAreaEnter(e, r) {
		e === RoleTriggerController_1.RoleTriggerController.GetMyRoleTrigger() &&
			this.IsAreaEnterHanlde &&
			((this.IsAreaEnterHanlde = !1),
			(this.AreaEnterCdId = TimerSystem_1.TimerSystem.Delay(() => {
				this.IsAreaEnterHanlde = !0;
			}, 500)),
			Info_1.Info.IsPlayInEditor &&
				Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Area",
					7,
					"[AreaController.EnterOverlap_TstriggerVolume] 进入区域",
					["EnterArea", this.AreaId],
					["VolumeName", r?.GetActorLabel()],
				),
			AreaController_1.AreaController.BeginOverlap(this.AreaId));
	}
	HandleAreaLeave(e, r) {
		e === RoleTriggerController_1.RoleTriggerController.GetMyRoleTrigger() &&
			this.IsAreaLeaveHanlde &&
			((this.IsAreaLeaveHanlde = !1),
			(this.AreaLeaveCdId = TimerSystem_1.TimerSystem.Delay(() => {
				this.IsAreaLeaveHanlde = !0;
			}, 500)),
			Info_1.Info.IsPlayInEditor &&
				Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Area",
					7,
					"[AreaController.EndOverlap_TstriggerVolume] 离开区域",
					["LeaveArea", this.AreaId],
					["VolumeName", r?.GetActorLabel()],
				),
			AreaController_1.AreaController.EndOverlap(this.AreaId));
	}
	ToggleArea(e) {
		this.SetEnable(e);
	}
	PostAkEvent(e, r) {
		e === RoleTriggerController_1.RoleTriggerController.GetMyRoleTrigger() &&
			((e = UE.KismetSystemLibrary.GetPathName(r)),
			AudioController_1.AudioController.PostEvent(e, void 0));
	}
	AddBuff() {
		this.BuffIds?.IsValidIndex(0) &&
			(this.AddBuffInner(this.BuffIds.Get(0)),
			this.TryReportSelfBuffDamageLog());
	}
	CheckBeginOverlapRoleTrigger(e) {
		return (
			e === RoleTriggerController_1.RoleTriggerController.GetMyRoleTrigger()
		);
	}
	AddBuffInner(e) {}
	TryReportSelfBuffDamageLog() {}
}
exports.default = TsTriggerVolume;
