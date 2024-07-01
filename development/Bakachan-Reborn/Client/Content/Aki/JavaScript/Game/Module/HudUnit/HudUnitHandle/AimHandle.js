"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AimHandle = void 0);
const UE = require("ue"),
	Stats_1 = require("../../../../Core/Common/Stats"),
	Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
	Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	TraceElementCommon_1 = require("../../../../Core/Utils/TraceElementCommon"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	Global_1 = require("../../../Global"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	CharacterUnifiedStateTypes_1 = require("../../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes"),
	ActorUtils_1 = require("../../../Utils/ActorUtils"),
	ArmUnit_1 = require("../HudUnit/ArmUnit"),
	HudUnitHandleBase_1 = require("./HudUnitHandleBase"),
	MAX_AIM_DISTANCE = 5e3,
	aimTagId = -1058855731,
	PROFILE_AIM_TRACE = "ProfileAimTrace";
class AimHandle extends HudUnitHandleBase_1.HudUnitHandleBase {
	constructor() {
		super(...arguments),
			(this.rii = !1),
			(this.nii = void 0),
			(this.sii = Vector_1.Vector.Create()),
			(this.aii = Vector_1.Vector.Create()),
			(this.hii = void 0),
			(this.lii = !1),
			(this._ii = !1),
			(this.o7e = () => {
				this.uii();
			}),
			(this.cii = () => {
				this.mii(), this.dii();
			});
	}
	OnInitialize() {
		super.OnInitialize(), this.uii();
	}
	OnAddEvents() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnChangeRole,
			this.o7e,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnAimStateChanged,
				this.cii,
			);
	}
	OnRemoveEvents() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnChangeRole,
			this.o7e,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnAimStateChanged,
				this.cii,
			);
	}
	OnTick(i) {
		this.dii();
	}
	OnShowHud() {
		super.OnShowHud(), this.mii(), this.dii();
	}
	mii() {
		if (this.nii && this.lii) {
			var i = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
			if (i?.Valid) {
				let e =
					i.Entity.GetComponent(158).DirectionState ===
					CharacterUnifiedStateTypes_1.ECharDirectionState.AimDirection;
				!e && this._ii && (e = i.Entity.GetComponent(185).HasTag(aimTagId)),
					this.nii.SetTargetVisible(e, !1);
			} else this.nii.SetTargetVisible(!1, !0);
		}
	}
	dii() {
		if (this.nii && this.nii.GetTargetVisible() && this.nii.GetActive()) {
			var i = this.Cii();
			if (i) {
				var e = i.Actors,
					t = e.Num();
				if (!(t <= 0)) {
					var n = i.Components;
					for (let i = 0; i < t; i++) {
						var o = e.Get(i);
						if (!o?.IsValid()) return void this.nii.SetAimStatus(1);
						if (!(o = ActorUtils_1.ActorUtils.GetEntityByActor(o, !1)))
							return void this.nii.SetAimStatus(1);
						var r = o.Entity.GetComponent(0),
							s = r?.GetEntityType();
						if (s === Protocol_1.Aki.Protocol.HBs.Proto_Npc)
							return void this.nii.SetAimStatus(1);
						if (
							s === Protocol_1.Aki.Protocol.HBs.Proto_SceneItem ||
							s === Protocol_1.Aki.Protocol.HBs.Proto_Animal
						)
							return void (this.gii(r.GetBaseInfo().Camp)
								? this.nii.SetAimStatus(1)
								: this.nii.SetAimStatus(2));
						if (s !== Protocol_1.Aki.Protocol.HBs.Proto_Monster)
							return void this.nii.SetAimStatus(1);
						if (
							((s = n.Get(i)),
							s?.IsValid() && "CollisionCylinder" !== (s = s.GetName()))
						)
							return this.gii(r.GetBaseInfo().Camp)
								? void this.nii.SetAimStatus(1)
								: o.Entity.GetComponent(58)?.IsWeakness(s)
									? void this.nii.SetAimStatus(3)
									: void this.nii.SetAimStatus(2);
					}
				}
			}
			this.nii.SetAimStatus(1);
		}
	}
	gii(i) {
		return 0 === i || 2 === i || 4 === i;
	}
	uii() {
		this.lii = !1;
		var i = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
		i?.Valid &&
		(i = i.Entity.GetComponent(0)) &&
		((i = i.GetRoleConfig()),
		(this._ii = 2 === i.RoleType),
		i.IsAim || this._ii)
			? ((this.lii = !0), this.fii())
			: this.pii();
	}
	fii() {
		this.nii
			? (this.mii(), this.dii())
			: this.rii ||
				((this.rii = !0),
				this.NewHudUnit(ArmUnit_1.AimUnit, "UiItem_Aim")
					.then((i) => {
						(this.nii = i),
							this.lii
								? (this.mii(), this.dii())
								: this.nii.SetTargetVisible(!1, !0);
					})
					.finally(() => {
						this.rii = !1;
					}));
	}
	pii() {
		this.nii && this.nii.SetTargetVisible(!1, !0);
	}
	Cii() {
		var i = Global_1.Global.CharacterCameraManager,
			e = this.sii,
			t = this.aii;
		if (
			(i =
				(e.FromUeVector(i.GetCameraLocation()),
				t.FromUeVector(i.GetActorForwardVector()),
				t.MultiplyEqual(5e3),
				t.AdditionEqual(e),
				(this.hii =
					this.hii ??
					ModelManager_1.ModelManager.BulletModel.NewTraceElement(
						UE.TraceLineElement.StaticClass(),
						ModelManager_1.ModelManager.BulletModel.ObjectTypeTakeAim,
					)),
				TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.hii, e),
				TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.hii, t),
				TraceElementCommon_1.TraceElementCommon.LineTrace(
					this.hii,
					"ProfileAimTrace",
				)))
		)
			return this.hii.HitResult;
	}
}
(exports.AimHandle = AimHandle).ght = void 0;
