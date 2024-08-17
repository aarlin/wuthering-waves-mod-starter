"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TsParkourCheckPoint = void 0);
const UE = require("ue"),
	Log_1 = require("../../../Core/Common/Log"),
	GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils"),
	StringUtils_1 = require("../../../Core/Utils/StringUtils"),
	EffectContext_1 = require("../../Effect/EffectContext/EffectContext"),
	EffectSystem_1 = require("../../Effect/EffectSystem"),
	Global_1 = require("../../Global"),
	RoleTriggerController_1 = require("../../NewWorld/Character/Role/RoleTriggerController"),
	ParkourController_1 = require("./ParkourController"),
	PARKOUR_CHECK_POINT_PRESET = new UE.FName("ParkourCheckPoint");
class TsParkourCheckPoint extends UE.Actor {
	constructor() {
		super(...arguments),
			(this.SphereComponent = void 0),
			(this.CheckPointIndex = 0),
			(this.IndexInGroup = 0),
			(this.ParkourId = 0),
			(this.CheckTag = ""),
			(this.DestroyEffectModelBasePath = ""),
			(this.EffectViewHandler = 0),
			(this.EventRegistered = !1);
	}
	ReceiveBeginPlay() {
		this.FindComponents(),
			this.SphereComponent.SetCollisionProfileName(PARKOUR_CHECK_POINT_PRESET),
			(this.SphereComponent.bKuroPassiveCollisionUpdateOverlapsWhenEnterOverlap =
				!0),
			(this.SphereComponent.bKuroPassiveCollision = !0),
			this.RegisterEvents();
	}
	ReceiveEndPlay() {
		this.RemoveEvents(),
			this.EffectViewHandler &&
				(EffectSystem_1.EffectSystem.StopEffectById(
					this.EffectViewHandler,
					"[TsParkourCheckPoint.ReceiveEndPlay]",
					!1,
				),
				(this.EffectViewHandler = 0)),
			StringUtils_1.StringUtils.IsEmpty(this.DestroyEffectModelBasePath) ||
				EffectSystem_1.EffectSystem.SpawnUnloopedEffect(
					this,
					this.GetTransform(),
					this.DestroyEffectModelBasePath,
					"[TsParkourCheckPoint.ReceiveEndPlay]",
				);
	}
	SetDetectSphere(e) {
		this.SphereComponent.SetSphereRadius(e, !0);
	}
	GenerateFx(e) {
		(e = UE.KismetSystemLibrary.GetPathName(e)),
			(this.EffectViewHandler = EffectSystem_1.EffectSystem.SpawnEffect(
				this,
				this.GetTransform(),
				e,
				"[TsParkourCheckPoint.GenerateFx]",
				new EffectContext_1.EffectContext(void 0, this),
			)),
			EffectSystem_1.EffectSystem.IsValid(this.EffectViewHandler) ||
				(this.EffectViewHandler = 0);
	}
	GenerateFxByPath(e) {
		(this.EffectViewHandler = EffectSystem_1.EffectSystem.SpawnEffect(
			this,
			this.GetTransform(),
			e,
			"[TsParkourCheckPoint.GenerateFxByPath]",
			new EffectContext_1.EffectContext(void 0, this),
		)),
			EffectSystem_1.EffectSystem.IsValid(this.EffectViewHandler) ||
				(this.EffectViewHandler = 0);
	}
	FindComponents() {
		this.SphereComponent ||
			(this.SphereComponent = this.GetComponentByClass(
				UE.SphereComponent.StaticClass(),
			));
	}
	RegisterEvents() {
		this.EventRegistered ||
			(this.SphereComponent.OnComponentBeginOverlapNoGcAlloc.Add((e, t, o) => {
				this.OnCollisionEnter(t);
			}),
			this.SphereComponent.OnComponentEndOverlap.Add((e, t, o, r) => {
				this.OnCollisionExit(t);
			}),
			(this.EventRegistered = !0));
	}
	RemoveEvents() {
		this.SphereComponent &&
			(this.SphereComponent.OnComponentBeginOverlapNoGcAlloc.Clear(),
			this.SphereComponent.OnComponentEndOverlap.Clear()),
			(this.EventRegistered = !1);
	}
	OnCollisionEnter(e) {
		if (
			ParkourController_1.ParkourController.MatchParkourRoleConfig(
				this.ParkourId,
			) &&
			e === RoleTriggerController_1.RoleTriggerController.GetMyRoleTrigger()
		) {
			if (
				(Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"Level",
						7,
						"[ParkourCheckPoint]检测到玩家",
						["ParkourId", this.ParkourId],
						["Index", this.CheckPointIndex],
					),
				!StringUtils_1.StringUtils.IsEmpty(this.CheckTag) &&
					((e = Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity),
					e &&
						(e = e.GetComponent(185)) &&
						!e.HasTag(
							GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(this.CheckTag),
						)))
			)
				return;
			void 0 !== this.ParkourId &&
				ParkourController_1.ParkourController.HandleParkourPoint(
					this.ParkourId,
					this.CheckPointIndex,
					this.IndexInGroup,
				);
		}
	}
	OnCollisionExit(e) {}
}
(exports.TsParkourCheckPoint = TsParkourCheckPoint),
	(exports.default = TsParkourCheckPoint);
