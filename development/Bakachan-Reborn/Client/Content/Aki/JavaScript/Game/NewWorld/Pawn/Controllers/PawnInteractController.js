"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PawnInteractController = exports.InteractEntity = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	Time_1 = require("../../../../Core/Common/Time"),
	Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
	RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
	MathCommon_1 = require("../../../../Core/Utils/Math/MathCommon"),
	Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	TraceElementCommon_1 = require("../../../../Core/Utils/TraceElementCommon"),
	IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	PublicUtil_1 = require("../../../Common/PublicUtil"),
	Global_1 = require("../../../Global"),
	LevelGameplayActionsDefine_1 = require("../../../LevelGamePlay/LevelGameplayActionsDefine"),
	LevelGeneralContextDefine_1 = require("../../../LevelGamePlay/LevelGeneralContextDefine"),
	LevelGeneralContextUtil_1 = require("../../../LevelGamePlay/LevelGeneralContextUtil"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	ChildQuestNodeBase_1 = require("../../../Module/GeneralLogicTree/BehaviorNode/ChildQuestNode/ChildQuestNodeBase"),
	GeneralLogicTreeUtil_1 = require("../../../Module/GeneralLogicTree/GeneralLogicTreeUtil"),
	TsInteractionUtils_1 = require("../../../Module/Interaction/TsInteractionUtils"),
	PlotController_1 = require("../../../Module/Plot/PlotController"),
	SceneTeamController_1 = require("../../../Module/SceneTeam/SceneTeamController"),
	InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController"),
	UiManager_1 = require("../../../Ui/UiManager"),
	WorldFunctionLibrary_1 = require("../../../World/Bridge/WorldFunctionLibrary"),
	ModManager_1 = require("../../../Manager/ModManager"),
	DEFAULT_INTERACT_RANGE = 300,
	PROFILE_DETECT_VISIBLE_BLOCK = "PawnInteractController_DetectVisibleBlock",
	DETECT_VISIBLE_BLOCK_HEIGHT_OFFSET = 10,
	EXECUTION_MAX_HEIGHT_DIFF = 50;
class InteractEntity {
	constructor(t) {
		(this.IsAdvice = !1),
			(this.Jh = void 0),
			(this.Hte = void 0),
			(this.EntityId = void 0),
			(this.InteractRange = -0),
			(this.c_i = 0),
			(this.gor = -100),
			(this.por = -9999),
			(this.DirectOptionInstanceIds = []),
			(this.DirectOptionNames = []),
			(this.Jh = t),
			(this.EntityId = t?.Id),
			(this.IsAdvice = void 0 !== t.GetComponent(0).GetAdviceInfo()),
			(this.Hte = t.GetComponent(1)),
			(this.DirectOptionInstanceIds = new Array()),
			(this.DirectOptionNames = new Array());
	}
	get Priority() {
		var t, e;
		return this.Jh
			? (this.IsAdvice &&
					((e = this.Hte.ActorLocationProxy),
					(t =
						Global_1.Global.BaseCharacter.CharacterActorComponent
							.ActorLocationProxy),
					(e = Vector_1.Vector.Distance(e, t)),
					(this.c_i =
						MathCommon_1.MathCommon.Clamp(e / this.InteractRange, 0, 1) *
						this.gor)),
				this.c_i)
			: this.por;
	}
	GetEntity() {
		return this.Jh;
	}
}
exports.InteractEntity = InteractEntity;
class PawnInteractController {
	constructor(t) {
		(this.Hte = void 0),
			(this.vor = void 0),
			(this.Mor = void 0),
			(this.Sor = void 0),
			(this.Eor = void 0),
			(this.yor = void 0),
			(this.Ior = void 0),
			(this.Tor = ""),
			(this.Lor = ModManager_1.ModManager.Settings.PerceptionRange ? 9e6 : 300),
			(this.Dor = -1),
			(this.SectorRange = void 0),
			(this.LocationOffset = void 0),
			(this.Ror = -0),
			(this.Uor = "Option"),
			(this.IsTurnAround = !1),
			(this.IsTurnRecoveryImmediately = !1),
			(this.IsWaitTurnComplete = !1),
			(this.InteractIcon = "Dialog"),
			(this.PreTalkConfigs = void 0),
			(this.PlayerInteractiveRange = void 0),
			(this.IsPlayerTurnAround = !1),
			(this.NUe = 0),
			(this.Aor = 0),
			(this.Por = 0),
			(this.InteractEntity = void 0),
			(this.wor = void 0),
			(this.Bor = Vector_1.Vector.Create()),
			(this.aXt = void 0),
			(this.TempDirectOptionInstances = new Array()),
			(this.PreDirectOptionInstances = new Array()),
			(this.OnInteractionUpdate = void 0),
			(this.OnInteractActionEnd = void 0),
			(this.InteractEntity = new InteractEntity(t.Entity)),
			(this.vor = t),
			(this.Hte = t.Entity.GetComponent(1)),
			this.qor(),
			(this.InteractEntity.InteractRange = ModManager_1.ModManager.Settings
				.PerceptionRange
				? 9e6
				: 300);
	}
	Dispose() {
		(this.Hte = void 0),
			(this.vor = void 0),
			(this.Mor = void 0),
			(this.Eor = void 0),
			(this.yor = void 0),
			(this.Sor = void 0),
			(this.wor = void 0),
			(this.Ior = void 0),
			(this.PlayerInteractiveRange = void 0),
			(this.PreTalkConfigs = void 0),
			(this.SectorRange = void 0),
			(this.OnInteractionUpdate = void 0),
			(this.OnInteractActionEnd = void 0);
	}
	get DefaultShowOption() {
		var t = this.GetInteractiveOption();
		return this.HasDynamicOption && "Direct" === t?.DoIntactType && t.TidContent
			? PublicUtil_1.PublicUtil.GetConfigTextByKey(t.TidContent)
			: StringUtils_1.StringUtils.IsEmpty(this.Tor)
				? void 0
				: PublicUtil_1.PublicUtil.GetConfigTextByKey(this.Tor);
	}
	GetInteractType() {
		return this.Uor;
	}
	qor() {
		var t = this.Hte.CreatureData,
			e = t.GetPbEntityInitData();
		if (e) {
			(this.Mor = new Array()),
				(this.Eor = new Array()),
				(this.yor = new Array()),
				(this.Sor = new Array());
			var o = (0, IComponent_1.getComponent)(
				e.ComponentsData,
				"InteractComponent",
			);
			if (o) {
				if (
					((this.PreTalkConfigs = o.PreFlow),
					o.Range && (this.Lor = o.Range),
					o.ExitRange && (this.Dor = o.ExitRange),
					o.SectorRange && (this.SectorRange = o.SectorRange),
					o.SectorRangeFromPlayerToEntity)
				)
					switch (o.SectorRangeFromPlayerToEntity.Type) {
						case IComponent_1.EInteractPlayerDiractionType.LeisureInteraction:
							this.PlayerInteractiveRange = o.SectorRangeFromPlayerToEntity;
						case IComponent_1.EInteractPlayerDiractionType.Npc:
					}
				if (
					(o.InteractPointOffset &&
						(this.LocationOffset = Vector_1.Vector.Create(
							o.InteractPointOffset.X || 0,
							o.InteractPointOffset.Y,
							o.InteractPointOffset.Z,
						)),
					o.TidContent && (this.Tor = o.TidContent),
					(this.Uor = o.DoIntactType),
					o.TurnAroundType)
				) {
					switch (o.TurnAroundType) {
						case IComponent_1.EInteractTurnAround.FaceEachOther:
						case IComponent_1.EInteractTurnAround
							.FaceEachOtherWithRecoveryImmediately:
							(this.IsTurnAround = !0),
								(this.IsPlayerTurnAround = !0),
								o.IsWaitForTurnAroundComplete && (this.IsWaitTurnComplete = !0);
							break;
						case IComponent_1.EInteractTurnAround.PlayerTurnToInteractor:
							this.IsPlayerTurnAround = !0;
					}
					o.TurnAroundType ===
						IComponent_1.EInteractTurnAround
							.FaceEachOtherWithRecoveryImmediately &&
						(this.IsTurnRecoveryImmediately = !0);
				}
				(this.aXt = o.MatchRoleOption), this.Gor(o);
			} else this.Ror = this.Lor;
			(e = t.ComponentDataMap.get("tps")?.tps),
				this.Nor(e, o?.RandomInteract, t.GetPbDataId()),
				this.Oor(e),
				e && this.vor.SetServerLockInteract(e.hMs, "Init Interact Controller"),
				this.kor();
		} else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Interaction",
					7,
					"[PawnInteractComponent.OnStart] 交互组件初始化失败",
					["CreatureGenID:", t.GetOwnerId()],
					["PbDataId:", t.GetPbDataId()],
				);
	}
	Oor(t) {
		if (t?.sMs)
			for (const r of t.sMs) {
				var e = ModelManager_1.ModelManager.InteractionModel.GetDynamicConfig(
						r.gFn,
					),
					o =
						LevelGeneralContextUtil_1.LevelGeneralContextUtil.CreateByServerContext(
							r.Hms,
						);
				this.AddDynamicInteractOption(e, o, r.nMs, !1);
			}
	}
	ClearDirectOptions() {
		this.InteractEntity &&
			((this.InteractEntity.DirectOptionInstanceIds.length = 0),
			(this.InteractEntity.DirectOptionNames.length = 0));
	}
	UpdateDirectOptions(t = !0, e = !1) {
		if (
			this.Mor &&
			this.Hte &&
			this.Hte.Owner && this.InteractEntity &&
			((this.TempDirectOptionInstances.length = 0),
			(this.InteractEntity.DirectOptionInstanceIds.length = 0),
			(this.InteractEntity.DirectOptionNames.length = 0),
			!this.HasDynamicOption)
		) {
			for (const t of this.Mor)
				t.Disabled ||
					"Direct" !== t.DoIntactType ||
					(e && "Flow" !== t.Type.Type) ||
					(1 !== t.CustomOptionType &&
						this.For(t) &&
						(this.TempDirectOptionInstances.push(t),
						this.InteractEntity.DirectOptionInstanceIds.push(t.InstanceId),
						this.InteractEntity.DirectOptionNames.push(t.TidContent)));
			if (t) {
				let t = !1;
				if (
					this.PreDirectOptionInstances.length ===
					this.TempDirectOptionInstances.length
				) {
					for (let e = 0; e < this.TempDirectOptionInstances.length; e++)
						if (
							this.TempDirectOptionInstances[e] !==
							this.PreDirectOptionInstances[e]
						) {
							t = !0;
							break;
						}
				} else t = !0;
				if (t) {
					TsInteractionUtils_1.TsInteractionUtils.UpdateInteractHintView(),
						(this.PreDirectOptionInstances.length = 0);
					for (const t of this.TempDirectOptionInstances)
						this.PreDirectOptionInstances.push(t);
				}
			}
		}
	}
	Nor(t, e, o) {
		if (t && t.aMs && t.aMs.length)
			if (e)
				for (const o of t.aMs) {
					var r = e.Options[o].Option;
					((r = this.Vor(r, 2)).RandomOptionIndex = o), this.Mor.push(r);
				}
			else
				Log_1.Log.CheckError() &&
					Log_1.Log.Error("Interaction", 19, "找不到随机交互组件的配置", [
						"实体配置Id",
						o,
					]);
	}
	Gor(t) {
		if (
			(t.InteractIcon
				? (this.InteractIcon = t.InteractIcon)
				: t.InteractDefaultIcon
					? (this.InteractIcon = t.InteractDefaultIcon)
					: (this.InteractIcon = "Dialog"),
			0 < t.Options?.length)
		)
			for (let o = 0, r = t.Options.length; o < r; o++) {
				var e = this.Vor(t.Options[o], 0);
				this.Mor.push(e);
			}
	}
	kor() {
		this.Hor(),
			this.jor(),
			(this.Sor.length = 0),
			this.OnInteractionUpdate && this.OnInteractionUpdate(),
			this.vor && this.vor.UpdateInteractRange();
	}
	IsInSectorRange() {
		if (!this.SectorRange) return !0;
		var t = MathCommon_1.MathCommon.WrapAngle(this.SectorRange.Begin),
			e = MathCommon_1.MathCommon.WrapAngle(this.SectorRange.End),
			o = Global_1.Global.BaseCharacter?.CharacterActorComponent;
		if (o) {
			let i;
			var r =
					((i =
						(r = this.Hte.CreatureData.GetEntityType()) ===
						Protocol_1.Aki.Protocol.HBs.Proto_SceneItem
							? this.Hte.ActorRightProxy
							: this.Hte.ActorForwardProxy),
					PawnInteractController.cz),
				n = PawnInteractController.fz;
			o =
				(o.ActorLocationProxy.Subtraction(this.GetInteractPoint(), r),
				(r.Z = 0),
				r.Normalize(),
				r.DotProduct(i));
			let a = Math.acos(o) * MathUtils_1.MathUtils.RadToDeg;
			if (
				(r.CrossProduct(i, n),
				0 < n.Z && (a *= -1),
				(a = MathCommon_1.MathCommon.WrapAngle(a)),
				e < t)
			) {
				if (a > t || a < e) return !0;
			} else if (a > t && a < e) return !0;
		}
		return !1;
	}
	IsInPlayerInteractiveRange() {
		var t = Global_1.Global.BaseCharacter?.CharacterActorComponent;
		if (!t) return !1;
		if (!this.PlayerInteractiveRange) return !0;
		if (
			this.PlayerInteractiveRange.Begin === -MathUtils_1.PI_DEG &&
			this.PlayerInteractiveRange.End === MathUtils_1.PI_DEG
		)
			return !0;
		var e = PawnInteractController.cz,
			o = PawnInteractController.fz,
			r =
				((t =
					(e.FromUeVector(this.Hte.ActorLocationProxy),
					e.SubtractionEqual(t.ActorLocationProxy),
					(e.Z = 0),
					e.Normalize(),
					t.ActorForwardProxy)),
				e.DotProduct(t));
		let n = Math.acos(r) * MathUtils_1.MathUtils.RadToDeg;
		return (
			e.CrossProduct(t, o),
			0 < o.Z && (n *= -1),
			n > this.PlayerInteractiveRange.Begin &&
				n < this.PlayerInteractiveRange.End
		);
	}
	IsMatchRoleOption() {
		return !this.aXt || this.aXt?.length <= 0
			? !ModelManager_1.ModelManager.SceneTeamModel.IsPhantomTeam
			: SceneTeamController_1.SceneTeamController.IsMatchRoleOption(this.aXt);
	}
	GetInteractPoint() {
		this.Bor.DeepCopy(this.Hte.ActorLocationProxy);
		var t = PawnInteractController.cz,
			e = this.LocationOffset;
		return (
			!e ||
				(0 === e.X && 0 === e.Y && 0 === e.Z) ||
				(0 !== e.X &&
					(this.Hte.ActorForwardProxy.Multiply(e.X, t),
					this.Bor.AdditionEqual(t)),
				0 !== e.Y &&
					(this.Hte.ActorRightProxy.Multiply(e.Y, t),
					this.Bor.AdditionEqual(t)),
				0 !== e.Z &&
					(this.Hte.ActorUpProxy.Multiply(e.Z, t), this.Bor.AdditionEqual(t))),
			this.Bor
		);
	}
	Hor() {
		if (((this.Ror = this.Lor), this.Mor))
			for (const t of this.Mor) t.Range > this.Ror && (this.Ror = t.Range);
	}
	jor() {
		this.Mor &&
			0 !== this.Mor.length &&
			((this.Ior = this.Mor[0]), (this.wor = void 0));
	}
	GetInteractiveOption(t = !1) {
		if (this.Por === Time_1.Time.Frame && this.wor) return this.wor;
		if (this.Hte && this.Hte.Owner) {
			var e = this.Mor;
			if (e) {
				this.wor = void 0;
				for (let r = e.length - 1; -1 < r; r--) {
					var o = e[r];
					if (!o.Disabled && (!t || "Flow" === o.Type.Type) && this.For(o)) {
						this.wor = o;
						break;
					}
				}
				return (this.Por = Time_1.Time.Frame), this.wor;
			}
		}
	}
	Vor(t, e, o, r = 0, n = 0) {
		var i = t.Range || this.Lor;
		let a = this.Uor;
		t.DoIntactType && (a = t.DoIntactType);
		var s = new LevelGameplayActionsDefine_1.CommonInteractOption();
		return s.Init(++this.NUe, t, o, i, a, e, r, n), s;
	}
	AddDynamicInteractOption(t, e, o, r = !0) {
		if (!this.Mor) return -1;
		let n = 0,
			i = 0;
		return (
			e &&
				(e instanceof LevelGeneralContextDefine_1.QuestContext
					? ((i = 1), (n = e.QuestId))
					: e instanceof LevelGeneralContextDefine_1.GeneralLogicTreeContext &&
						e.BtType === Protocol_1.Aki.Protocol.NCs.Proto_BtTypeQuest &&
						((i = 1), (n = e.TreeConfigId))),
			((t = this.Vor(t, 1, e, 0, i)).OptionContentId = n),
			void 0 !== o && (t.TidContent = o),
			this.Mor.push(t),
			this.Eor.push(t),
			1 === i && (this.yor.push(t), this.Wor()),
			e &&
				((o = this.Kor(t.Context)),
				this.ChangeOptionDisabled(t.InstanceId, !o)),
			r && this.kor(),
			t.InstanceId
		);
	}
	Wor() {
		this.yor.sort(
			(t, e) => (
				(t = ModelManager_1.ModelManager.QuestNewModel.GetQuest(
					t.OptionContentId,
				)),
				(e = ModelManager_1.ModelManager.QuestNewModel.GetQuest(
					e.OptionContentId,
				)),
				t && e
					? t.Type !== e.Type
						? t.Type - e.Type
						: t.ChapterId !== e.ChapterId
							? t.ChapterId - e.ChapterId
							: t.Id - e.Id
					: -1
			),
		);
	}
	RemoveDynamicInteractOption(t) {
		if (!this.Mor) return !1;
		let e = !1;
		for (let r = this.Eor.length - 1; -1 < r; r--) {
			var o = this.Eor[r];
			if (o.Guid === t) {
				(e = 1 === o.ContentType), this.Eor.splice(r, 1);
				break;
			}
		}
		if (e)
			for (let e = this.yor.length - 1; -1 < e; e--)
				if (this.yor[e].Guid === t) {
					this.yor.splice(e, 1);
					break;
				}
		let r = !1;
		for (let e = this.Mor.length - 1; -1 < e; e--)
			if (this.Mor[e].Guid === t) {
				(r = !0), this.Mor.splice(e, 1)[0].Dispose();
				break;
			}
		return r && this.kor(), r;
	}
	AddClientInteractOption(t, e, o = "Option", r, n, i = 0, a) {
		var s =
			((t =
				(((s = new LevelGameplayActionsDefine_1.CommonActionInfo()).Params = t),
				new Array())).push(s),
			new LevelGameplayActionsDefine_1.CommonInteractActions());
		return (
			((t =
				((s.Actions = t),
				new LevelGameplayActionsDefine_1.CommonInteractOption())).Type = s),
			(t.Condition = e),
			(t.DoIntactType = o),
			r && (t.Range = r),
			n && (t.TidContent = n),
			a && (this.LocationOffset = a),
			this.Mor
				? ((s = this.Vor(t, 3, void 0, i)),
					this.Mor.push(s),
					this.kor(),
					s.InstanceId)
				: -1
		);
	}
	RemoveClientInteractOption(t) {
		if (!this.Mor) return !1;
		let e = !1;
		for (let o = this.Mor.length - 1; -1 < o; o--)
			if (this.Mor[o].InstanceId === t) {
				(e = !0), this.Mor.splice(o, 1)[0].Dispose();
				break;
			}
		return e && this.kor(), e;
	}
	OnChangeModeFinish() {
		if (this.Mor)
			for (const e of this.Mor) {
				var t;
				e.Context &&
					1 === e.OptionType &&
					((t = this.Kor(e.Context)),
					this.ChangeOptionDisabled(e.InstanceId, !t));
			}
	}
	ChangeOptionText(t, e) {
		var o;
		this.Mor && (o = this.Mor.find((e) => e.Guid === t)) && (o.TidContent = e);
	}
	ChangeOptionDisabled(t, e) {
		var o;
		this.Mor &&
			(o = this.Mor.find((e) => e.InstanceId === t)) &&
			(o.Disabled = e);
	}
	ChangeInteractOption(t) {
		this.Ior = t;
	}
	get CurrentInteractOption() {
		return this.Ior;
	}
	get Options() {
		if (this.Sor && this.Mor)
			for (let e = (this.Sor.length = 0), o = this.Mor.length; e < o; e++) {
				var t = this.Mor[e];
				t.Disabled || this.Sor.push(t);
			}
		return this.Sor;
	}
	get ShowOptions() {
		var t = new Array();
		for (const e of this.yor)
			StringUtils_1.StringUtils.IsEmpty(e.TidContent) ||
				e.Disabled ||
				"Option" !== e.DoIntactType ||
				(this.For(e) && t.push(e));
		for (let o = 0, r = this.Mor.length; o < r; o++) {
			var e = this.Mor[o];
			StringUtils_1.StringUtils.IsEmpty(e.TidContent) ||
				e.Disabled ||
				"Option" !== e.DoIntactType ||
				1 === e.ContentType ||
				(this.For(e) && t.push(e));
		}
		return t.push(void 0), t;
	}
	get HasDynamicOption() {
		return 0 < this.Eor.length;
	}
	get Owner() {
		return this.Hte?.Owner;
	}
	get EntityId() {
		return this.Hte?.Entity?.Id;
	}
	get CreatureData() {
		return this.Hte?.CreatureData;
	}
	HasInteractOptions() {
		return void 0 !== this.Mor?.length && 0 < this.Mor?.length;
	}
	get InteractRange() {
		return this.Ror;
	}
	get InteractExitRange() {
		return -1 === this.Dor ? this.Ror : this.Dor;
	}
	GetAutoTriggerOption() {
		if (this.Mor)
			for (let e = 0, o = this.Mor.length; e < o; e++) {
				var t = this.Mor[e];
				if ("Auto" === t.DoIntactType && this.For(t)) return t;
			}
	}
	InteractOption(t = 0) {
		t >= this.Mor.length ||
			(!(t = this.Mor[t]).Disabled &&
				this.For(t) &&
				(PlotController_1.PlotController.EndInteraction("Flow" === t.Type.Type),
				TsInteractionUtils_1.TsInteractionUtils.HandleInteractionOptionNew(
					t,
					this,
				)));
	}
	For(t) {
		if (
			!ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckConditionNew(
				t.Condition,
				this.Hte.Owner,
				LevelGeneralContextDefine_1.EntityContext.Create(this.Hte.Entity.Id),
			)
		)
			return !1;
		if (3 === t.OptionType && 1 === t.CustomOptionType && (t = this.Hte)) {
			var e =
				ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity?.GetComponent(
					3,
				);
			if (
				e &&
				((e = e.ActorLocationProxy.Z - e.HalfHeight),
				(t = t.ActorLocationProxy.Z - t.HalfHeight),
				Math.abs(e - t) > 50 || this.Qor())
			)
				return !1;
		}
		return !0;
	}
	Qor() {
		var t,
			e = (o =
				ModelManager_1.ModelManager.SceneTeamModel
					.GetCurrentEntity).Entity.GetComponent(3),
			o = o.Entity.GetComponent(26)?.ExecutionTrace;
		return o
			? (TraceElementCommon_1.TraceElementCommon.SetStartLocation(
					o,
					e.ActorLocationProxy,
				),
				TraceElementCommon_1.TraceElementCommon.SetEndLocation(
					o,
					this.Hte.ActorLocationProxy,
				),
				!!TraceElementCommon_1.TraceElementCommon.LineTrace(
					o,
					PROFILE_DETECT_VISIBLE_BLOCK,
				) &&
					((t = PawnInteractController.cz),
					e.ActorUpProxy.Multiply(e.HalfHeight - 10, t),
					e.ActorLocationProxy.Addition(t, t),
					TraceElementCommon_1.TraceElementCommon.SetStartLocation(o, t),
					(0, RegisterComponent_1.isComponentInstance)(this.Hte, 3)
						? ((e = PawnInteractController.fz),
							this.Hte.ActorUpProxy.Multiply(this.Hte.HalfHeight - 10, e),
							this.Hte.ActorLocationProxy.Addition(e, e),
							TraceElementCommon_1.TraceElementCommon.SetEndLocation(o, e))
						: TraceElementCommon_1.TraceElementCommon.SetEndLocation(
								o,
								this.Hte.ActorLocationProxy,
							),
					!!TraceElementCommon_1.TraceElementCommon.LineTrace(
						o,
						PROFILE_DETECT_VISIBLE_BLOCK,
					)))
			: (Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn("Interaction", 37, "ExecutionTrace is undefined"),
				!1);
	}
	HandlePreInterativeLogic() {
		this.PreTalkConfigs;
	}
	RecordInteraction() {
		this.Aor++;
	}
	HasDynamicOptionType(t) {
		for (const r of this.Eor)
			if (6 === r.Context.Type) {
				var e = r.Context.TreeConfigId,
					o = ModelManager_1.ModelManager.QuestNewModel.GetQuest(e)?.GetNode(
						r.Context.NodeId,
					);
				if (o && o instanceof ChildQuestNodeBase_1.ChildQuestNodeBase)
					for (const e of t) if (o.ChildQuestType === e) return !0;
			}
		return !1;
	}
	HasDynamicOptionTask() {
		for (const t of this.Eor)
			if (6 === t.Context.Type) return 0 === t.Context.NodeId;
		return !1;
	}
	CheckInteractCount(t, e) {
		switch (e) {
			case 0:
				return this.Aor === t;
			case 1:
				return this.Aor !== t;
			case 2:
				return this.Aor < t;
			case 3:
				return this.Aor <= t;
			case 4:
				return this.Aor > t;
			case 5:
				return this.Aor >= t;
		}
		return !1;
	}
	GetPbDataId() {
		return this.Hte.CreatureData.GetPbDataId();
	}
	GetOptionByIndex(t) {
		if (this.Mor) {
			var e = t + 1;
			for (const t of this.Mor) if (t.InstanceId === e) return t;
		}
	}
	GetOptionByInstanceId(t) {
		if (this.Mor) for (const e of this.Mor) if (e.InstanceId === t) return e;
	}
	GetOptionByGuid(t) {
		if (t && this.Mor) for (const e of this.Mor) if (e.Guid === t) return e;
	}
	HandleInteractRequest() {
		this.vor?.Valid &&
			(WorldFunctionLibrary_1.default.GetEntityTypeByEntity(
				this.vor.Entity.Id,
			) === Protocol_1.Aki.Protocol.HBs.Proto_Npc &&
				this.vor.Entity.GetComponent(36)?.MoveToLocationLogic?.PushMoveInfo(),
			this.vor.SetInteractionState(!1, "发送交互请求"),
			InputDistributeController_1.InputDistributeController.RefreshInputTag()),
			this.OnInteractActionEnd && this.OnInteractActionEnd();
	}
	HandleInteractResponse(t, e) {
		this.vor?.Valid &&
			(this.vor.SetServerLockInteract(e, "Interaction Response"),
			this.vor.SetInteractionState(!0, "接收交互应答")),
			t !== Protocol_1.Aki.Protocol.lkn.Sys
				? (Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("Interaction", 37, "交互失败", ["errorCode", t]),
					this.vor.SetServerLockInteract(!1, "交互失败"),
					t !== Protocol_1.Aki.Protocol.lkn.Proto_ErrSceneEntityNotExist &&
						t !== Protocol_1.Aki.Protocol.lkn.Proto_ErrInteractRange &&
						t !== Protocol_1.Aki.Protocol.lkn.Proto_ErrInteractCd &&
						t !== Protocol_1.Aki.Protocol.lkn.Proto_ErrPreCondition &&
						t !==
							Protocol_1.Aki.Protocol.lkn.Proto_ErrInteractOptionGuidInvalid &&
						ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
							t,
							18507,
						),
					!ModelManager_1.ModelManager.PlotModel.IsInPlot &&
						UiManager_1.UiManager.IsViewShow("PlotView") &&
						PlotController_1.PlotController.EndInteraction(!1, !0))
				: ((e = this.Hte?.Entity?.GetComponent(125)) && e.CloseAllCollisions(),
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.OnInteractDropItemSuccess,
					));
	}
	HandleInteractClientAction() {
		this.vor?.Valid &&
			(this.vor.SetInteractionState(!1, "执行纯客户端行为"),
			InputDistributeController_1.InputDistributeController.RefreshInputTag());
	}
	FinishInteractClientAction() {
		this.vor?.Valid &&
			(this.vor.SetInteractionState(!0, "完成纯客户端行为"),
			InputDistributeController_1.InputDistributeController.RefreshInputTag());
	}
	Kor(t) {
		if (!t) return !0;
		let e = !0;
		switch (t.Type) {
			case 2:
				var o = ModelManager_1.ModelManager.QuestNewModel.GetQuest(t.QuestId);
				o && (e = o.IsInteractValid);
				break;
			case 3:
				(o =
					ModelManager_1.ModelManager.LevelPlayModel.GetProcessingLevelPlayInfo(
						t.LevelPlayId,
					)) && (e = o.IsInteractValid);
				break;
			case 6:
				(o = GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetLogicTreeContainer(
					t.BtType,
					t.TreeConfigId,
				)) && (e = o.IsInteractValid);
		}
		return e;
	}
	GetInteractionDebugInfos() {
		if (this.Mor && 0 < this.Mor?.length) {
			let e = "";
			for (const o of this.Mor) {
				e =
					(e =
						(e =
							(e = e + "选项: " + (o.TidContent || "空名字") + "\t\t") +
							"交互选项类型: " +
							LevelGameplayActionsDefine_1.optionTypeLogString[o.OptionType] +
							"\t\t") +
						"交互类型: " +
						o.DoIntactType +
						"\t\t") +
					"Enable: " +
					!o.Disabled +
					"\t\t";
				var t = this.For(o);
				if (((e += "满足开启条件: " + t), !t))
					for (const t of o.Condition.Conditions)
						e = (e += "\n") + "Condition: " + JSON.stringify(t);
				1 === o.OptionType &&
					(e = (e += "\nContext:\n") + JSON.stringify(o.Context)),
					(e += "\n\n");
			}
			return e;
		}
		return "无";
	}
}
((exports.PawnInteractController = PawnInteractController).cz =
	Vector_1.Vector.Create()),
	(PawnInteractController.fz = Vector_1.Vector.Create());
