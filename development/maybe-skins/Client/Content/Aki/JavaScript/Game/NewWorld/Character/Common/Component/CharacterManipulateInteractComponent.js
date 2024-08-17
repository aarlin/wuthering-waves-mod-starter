"use strict";
var CharacterManipulateInteractComponent_1,
	__decorate =
		(this && this.__decorate) ||
		function (t, e, r, i) {
			var o,
				n = arguments.length,
				a =
					n < 3
						? e
						: null === i
							? (i = Object.getOwnPropertyDescriptor(e, r))
							: i;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
				a = Reflect.decorate(t, e, r, i);
			else
				for (var s = t.length - 1; 0 <= s; s--)
					(o = t[s]) &&
						(a = (n < 3 ? o(a) : 3 < n ? o(e, r, a) : o(e, r)) || a);
			return 3 < n && a && Object.defineProperty(e, r, a), a;
		};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CharacterManipulateInteractComponent = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../../Core/Common/Log"),
	CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById"),
	Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
	QueryTypeDefine_1 = require("../../../../../Core/Define/QueryTypeDefine"),
	EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
	RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
	Net_1 = require("../../../../../Core/Net/Net"),
	TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
	Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
	TraceElementCommon_1 = require("../../../../../Core/Utils/TraceElementCommon"),
	CameraController_1 = require("../../../../Camera/CameraController"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	EffectContext_1 = require("../../../../Effect/EffectContext/EffectContext"),
	EffectSystem_1 = require("../../../../Effect/EffectSystem"),
	Global_1 = require("../../../../Global"),
	GlobalData_1 = require("../../../../GlobalData"),
	ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	CharacterBuffIds_1 = require("./Abilities/CharacterBuffIds"),
	PROFILE_KEY = "CharacterManipulateInteractComponent_RefreshTarget",
	MANIPULATE_VISION_ID = 1003,
	SPHERE_TRACE_RADIUS = 1;
let CharacterManipulateInteractComponent =
	(CharacterManipulateInteractComponent_1 = class extends (
		EntityComponent_1.EntityComponent
	) {
		constructor() {
			super(...arguments),
				(this.Hte = void 0),
				(this.Lie = void 0),
				(this.zJo = void 0),
				(this.SIe = void 0),
				(this.CHr = new Set()),
				(this.doi = void 0),
				(this.Nnr = void 0),
				(this.gHr = void 0),
				(this.fHr = void 0),
				(this.pHr = !0),
				(this.vHr = !0),
				(this.Hnt = void 0),
				(this.EHr = void 0),
				(this.hwn = void 0),
				(this.yHr = !1),
				(this.IHr = void 0),
				(this.THr = void 0),
				(this.DHr = (t, e) => {
					this.THr = e ? this.gHr : void 0;
				});
		}
		set RHr(t) {
			this.AHr(void 0 !== t && this.pHr),
				(this.gHr === t && this.vHr === this.pHr) ||
					(EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.OnManipulateSwitchToNewTarget,
						void 0 !== t && this.pHr,
						t?.Entity,
						!1,
					),
					this.gHr?.ChangeManipulateInteractPointState(0),
					(this.gHr = t),
					(this.vHr = this.pHr),
					this.gHr?.ChangeManipulateInteractPointState(this.pHr ? 1 : 2)),
				(this.pHr = !0);
		}
		get RHr() {
			return this.gHr;
		}
		OnStart() {
			return (
				(this.Hte = this.Entity.GetComponent(3)),
				(this.Lie = this.Entity.GetComponent(185)),
				(this.zJo = this.Entity.GetComponent(157)),
				(this.SIe = this.Entity.GetComponent(0)),
				(this.doi =
					CameraController_1.CameraController.FightCamera.GetComponent(5)),
				(this.Hnt = CommonParamById_1.configCommonParamById.GetStringConfig(
					"ManipulateInteractEffectPath",
				)),
				(this.hwn = ModelManager_1.ModelManager.ManipulateInteractModel),
				this.InitTraceInfo(),
				this.dde(),
				!0
			);
		}
		OnTick(t) {
			this.UHr(-581520176, 0 < this.hwn.InRangePoints.size),
				this.PHr()
					? this.xHr()
					: (this.wHr(),
						this.Lie.HasTag(-581520176) && this.UHr(-1734324611, !0));
		}
		xHr() {
			if (this.hwn.InRangePoints.size <= 0)
				(this.RHr = void 0), this.UHr(-1734324611, !1);
			else {
				this.CHr.clear(),
					TraceElementCommon_1.TraceElementCommon.SetStartLocation(
						this.Nnr,
						this.Hte.ActorLocation,
					);
				for (const t of this.hwn.InRangePoints)
					t.IsLocked ||
						(t.CheckCondition()
							? this.CHr.add(t)
							: this.RHr === t && this.wHr());
				let e,
					r = MathUtils_1.MathUtils.MaxFloat;
				for (const i of this.CHr) {
					var t = Vector_1.Vector.DistSquared(
						i.Location,
						this.Hte.ActorLocationProxy,
					);
					t < r && ((e = i), (r = t));
				}
				if (e && this.ProjectWorldLocationToScreenPosition(e.Location))
					return (
						TraceElementCommon_1.TraceElementCommon.SetEndLocation(
							this.Nnr,
							e.Location.ToUeVector(),
						),
						TraceElementCommon_1.TraceElementCommon.SphereTrace(
							this.Nnr,
							PROFILE_KEY,
						) && (this.pHr = !1),
						this.UHr(-1734324611, !this.pHr),
						this.UHr(-611134292, this.pHr),
						void (this.RHr = e)
					);
				this.RHr = void 0;
			}
		}
		ProjectWorldLocationToScreenPosition(t) {
			return this.doi.CheckPositionInScreen(
				t,
				this.doi.CameraAdjustController.CheckInScreenMinX,
				this.doi.CameraAdjustController.CheckInScreenMaxX,
				this.doi.CameraAdjustController.CheckInScreenMinY,
				this.doi.CameraAdjustController.CheckInScreenMaxY,
			);
		}
		PHr() {
			return !(
				Global_1.Global.BaseCharacter !== this.Hte.Actor ||
				(CharacterManipulateInteractComponent_1.BHr
					? this.Lie.HasTag(283451623) ||
						!this.Lie.HasTag(-1898186757) ||
						ModelManager_1.ModelManager.SceneTeamModel.IsPhantomTeam
					: (ModelManager_1.ModelManager.RouletteModel.UnlockExploreSkillDataMap.has(
							1003,
						) && (CharacterManipulateInteractComponent_1.BHr = !0),
						1))
			);
		}
		wHr() {
			this.RHr = void 0;
		}
		InitTraceInfo() {
			(this.Nnr = UE.NewObject(UE.TraceSphereElement.StaticClass())),
				(this.Nnr.WorldContextObject = this.Hte.Owner),
				(this.Nnr.bIsSingle = !0),
				(this.Nnr.bIgnoreSelf = !0),
				this.Nnr.SetTraceTypeQuery(
					QueryTypeDefine_1.KuroTraceTypeQuery.Visible,
				),
				(this.Nnr.Radius = 1);
		}
		dde() {
			this.Lie?.Valid &&
				(this.IHr = this.Lie?.ListenForTagAddOrRemove(-182189170, this.DHr));
		}
		Cde() {
			this.IHr && this.IHr.EndTask();
		}
		AHr(t) {
			t
				? this.Lie.HasTag(-611134292) || this.Lie.AddTag(-611134292)
				: this.Lie.HasTag(-611134292) && this.Lie.RemoveTag(-611134292);
		}
		OnClear() {
			return (this.Hte = void 0), (this.Lie = void 0), this.Cde(), !0;
		}
		StartInteract() {
			if (!this.vHr) return !1;
			if (!this.THr?.Valid && !this.gHr?.Valid)
				return (
					Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Character",
							32,
							"[CharacterManipulateInteractComponent.StartInteract] 当前没有选中任何目标",
						),
					!1
				);
			if (this.yHr)
				return (
					Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Character",
							32,
							"[CharacterManipulateInteractComponent.StartInteract] 当前角色已经在拉取巨物中",
						),
					!1
				);
			(this.yHr = !0),
				this.Lie.AddTag(-1408007765),
				(this.fHr = this.THr ?? this.gHr),
				this.fHr?.ChangeManipulateInteractPointState(3);
			var t = this.Hte.CreatureData.GetRoleConfig().RoleBody;
			return (
				(this.EHr =
					"MaleXL" === t
						? CharacterBuffIds_1.buffId.ManipulateInteractBuffIdMaleX
						: CharacterBuffIds_1.buffId.ManipulateInteractBuffId),
				this.zJo.AddBuff(this.EHr, {
					InstigatorId: this.SIe.GetCreatureDataId(),
					Level: 1,
					Reason: "[CharacterManipulateInteractComponent]",
				}),
				!0
			);
		}
		EndInteract() {
			(this.yHr = !1),
				this.Lie.RemoveTag(-1408007765),
				this.NKt(),
				this.EHr &&
					TimerSystem_1.TimerSystem.Delay(() => {
						this.zJo &&
							this.EHr &&
							(this.zJo.RemoveBuff(
								this.EHr,
								-1,
								"[CharacterManipulateInteractComponent]",
							),
							(this.EHr = void 0));
					}, 200),
				this.fHr?.ChangeManipulateInteractPointState(0),
				this.bHr();
		}
		NKt() {
			var t,
				e = this.fHr?.Entity.GetComponent(1)?.ActorTransform;
			e &&
				(t = this.Hte?.ActorLocation) &&
				(e.SetRotation(
					new UE.Quat(
						UE.KismetMathLibrary.FindLookAtRotation(t, e.GetLocation()),
					),
				),
				EffectSystem_1.EffectSystem.SpawnEffect(
					GlobalData_1.GlobalData.World,
					e,
					this.Hnt,
					"[CharacterManipulateInteractComponent.SpawnEffect]",
					new EffectContext_1.EffectContext(this.Entity.Id),
				));
		}
		bHr() {
			var t,
				e = this.fHr?.CreatureDataId;
			void 0 !== e &&
				(((t = Protocol_1.Aki.Protocol.pJn.create()).rkn =
					MathUtils_1.MathUtils.NumberToLong(e)),
				Net_1.Net.Call(7307, t, (t) => {
					(this.fHr = void 0),
						t.Kms !== Protocol_1.Aki.Protocol.lkn.Sys &&
							ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
								t.Kms,
								3259,
							);
				}));
		}
		GetTargetLocation() {
			return this.fHr?.Location ?? this.RHr.Location;
		}
		UHr(t, e) {
			!this.Lie.HasTag(t) && e
				? this.Lie.AddTag(t)
				: this.Lie.HasTag(t) && !e && this.Lie.RemoveTag(t);
		}
		ClearTarget() {
			this.RHr = void 0;
		}
	});
(CharacterManipulateInteractComponent.BHr = !1),
	(CharacterManipulateInteractComponent =
		CharacterManipulateInteractComponent_1 =
			__decorate(
				[(0, RegisterComponent_1.RegisterComponent)(56)],
				CharacterManipulateInteractComponent,
			)),
	(exports.CharacterManipulateInteractComponent =
		CharacterManipulateInteractComponent);
