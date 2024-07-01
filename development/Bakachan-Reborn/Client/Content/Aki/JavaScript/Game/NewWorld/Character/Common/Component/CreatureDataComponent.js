"use strict";
var CreatureDataComponent_1,
	__decorate =
		(this && this.__decorate) ||
		function (t, e, r, o) {
			var i,
				n = arguments.length,
				s =
					n < 3
						? e
						: null === o
							? (o = Object.getOwnPropertyDescriptor(e, r))
							: o;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
				s = Reflect.decorate(t, e, r, o);
			else
				for (var a = t.length - 1; 0 <= a; a--)
					(i = t[a]) &&
						(s = (n < 3 ? i(s) : 3 < n ? i(e, r, s) : i(e, r)) || s);
			return 3 < n && s && Object.defineProperty(e, r, s), s;
		};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CreatureDataComponent = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../../Core/Common/Log"),
	Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
	EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
	RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
	Net_1 = require("../../../../../Core/Net/Net"),
	DataTableUtil_1 = require("../../../../../Core/Utils/DataTableUtil"),
	FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil"),
	GameplayTagUtils_1 = require("../../../../../Core/Utils/GameplayTagUtils"),
	Rotator_1 = require("../../../../../Core/Utils/Math/Rotator"),
	Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
	IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	AdviceData_1 = require("../../../../Module/Advice/AdviceData"),
	BlackboardMap_1 = require("../../../../World/Define/BlackboardMap"),
	CreateEntityData_1 = require("../../CreateEntityData");
let CreatureDataComponent = (CreatureDataComponent_1 = class extends (
	EntityComponent_1.EntityComponent
) {
	constructor() {
		super(...arguments),
			(this.Xfo = 0),
			(this.j8 = 0),
			(this.fye = void 0),
			(this.zke = 0),
			(this.fie = Protocol_1.Aki.Protocol.HBs.Proto_Monster),
			(this.mXr = 0),
			(this.dXr = Protocol_1.Aki.Protocol.USs.Proto_OldEntity),
			(this.E0 = 0),
			(this.CXr = void 0),
			(this.gXr = 0),
			(this.fXr = 0),
			(this.pXr = 0),
			(this.vXr = 0),
			(this.MXr = void 0),
			(this.Yre = void 0),
			(this.SXr = new Array()),
			(this.mKt = new Set()),
			(this.yne = !1),
			(this.EXr = !1),
			(this.LivingStatus = void 0),
			(this.yXr = 0),
			(this.EntityCommonTags = new Set()),
			(this.RelationId = 0),
			(this.PbRelationMatchCfgIndex = -1),
			(this.ControllerId = 0),
			(this.PbDynAttachEntityConfigId = 0),
			(this.PbDynAttachEntityActorKey = ""),
			(this.PbDynAttachRefActorKey = ""),
			(this.PbDynAttachRelPos = Vector_1.Vector.Create()),
			(this.PbDynAttachRelRot = Rotator_1.Rotator.Create()),
			(this.IsShowingHandFx = !1),
			(this.AutonomousId = 0),
			(this.OccupiedGridInfo = new Map()),
			(this.DynamicGridInfo = []),
			(this.IXr = 0),
			(this.TXr = void 0),
			(this.LXr = ""),
			(this.DXr = 0),
			(this.qne = void 0),
			(this.RXr = void 0),
			(this.AXr = 0),
			(this.UXr = void 0),
			(this.ou = !1),
			(this.PXr = void 0),
			(this.xXr = void 0),
			(this.PbInRangeEntityCreatureDataIds = void 0),
			(this.PbInRangePlayerIds = void 0),
			(this.wDe = 0),
			(this.vH = 0),
			(this.wXr = !1),
			(this.BXr = void 0),
			(this.bXr = !1),
			(this.qXr = ""),
			(this.vZo = void 0),
			(this.GXr = 0),
			(this.NXr = void 0),
			(this.OXr = !1),
			(this.kXr = void 0),
			(this.FXr = void 0),
			(this.VXr = void 0),
			(this.E4r = void 0),
			(this.ComponentDataMap = new Map()),
			(this.HXr = !1),
			(this.Dne = !1),
			(this.jXr = void 0),
			(this.IsConcealed = !1),
			(this.SummonType = Protocol_1.Aki.Protocol.Oqs.Proto_ESummonTypeDefault),
			(this.WXr = void 0),
			(this.KXr = 0),
			(this.QXr = 0),
			(this.XXr = new Array()),
			(this.$Xr = new Array()),
			(this.KTn = new Map()),
			(this.ComponentsKey = 0n),
			(this.YXr = -1n);
	}
	OnEnd() {
		return (
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.RemoveCreatureDataComponentCache,
				this.E0,
			),
			!0
		);
	}
	OnInitData(t) {
		var e,
			r = t,
			o = r.ComponentsKey;
		return r instanceof CreateEntityData_1.CreateEntityData
			? ((r = r.EntityData),
				(this.E0 = this.Entity.Id),
				(this.ComponentsKey = o),
				(o = ModelManager_1.ModelManager.CharacterModel.GetHandleByEntity(
					this.Entity,
				)),
				(e = t.CreatureDataId),
				this.SetCreatureDataId(e),
				(o.CreatureDataId = e),
				this.SetPbDataId(r.R5n),
				(o.PbDataId = r.R5n),
				this.SetPrefabId(r.ivs),
				this.SetEntityConfigType(r.mVn),
				(o.ConfigType = r.mVn),
				this.SetComponentKey(t.ComponentsKey),
				(this.BXr = t.PbEntityInitData),
				(this.qXr = t.PbModelConfigId ?? ""),
				(this.IsConcealed = t.IsConcealed),
				this.SetPbDataByProtocol(r),
				(this.Yre = new BlackboardMap_1.BlackboardMap()),
				(this.IsConcealed = t.IsConcealed),
				this.w9s(),
				!0)
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Entity",
						3,
						"[CreatureDataComponent.OnCreate] createEntityData无效。",
					),
				!1);
	}
	get ModelBlueprintPath() {
		return this.LXr;
	}
	get IsPosAbnormal() {
		return this.wXr;
	}
	SetPosAbnormal(t) {
		this.wXr = t;
	}
	get EntityPbModelConfigId() {
		return this.qXr;
	}
	get LiftFloor() {
		return this.GXr;
	}
	get IsPlotPlayerOwned() {
		return (
			!!this.NXr &&
			this.NXr === ModelManager_1.ModelManager.CreatureModel.GetPlayerId()
		);
	}
	ClearPlotPlayerInfo() {
		(this.NXr = void 0), (this.OXr = !1);
	}
	get IsConcomitantEntity() {
		return [
			Protocol_1.Aki.Protocol.Oqs.Proto_ESummonTypeConcomitantVision,
			Protocol_1.Aki.Protocol.Oqs.Proto_ESummonTypeConcomitantCustom,
		].includes(this.SummonType);
	}
	get VisionControlCreatureDataId() {
		return this.KXr;
	}
	set VisionControlCreatureDataId(t) {
		this.KXr = t;
	}
	get VisionSkillServerEntityId() {
		return this.QXr;
	}
	set VisionSkillServerEntityId(t) {
		this.QXr = t;
	}
	get CustomServerEntityIds() {
		return this.XXr;
	}
	get SummonEntityIds() {
		return this.$Xr;
	}
	set SummonEntityIds(t) {
		this.$Xr = t;
	}
	get ServerStartLocation() {
		return this.WXr;
	}
	GetEntityVar(t) {
		return this.KTn.get(t);
	}
	SetMovementByProtocol(t) {
		void 0 === this.MXr && (this.MXr = Protocol_1.Aki.Protocol.L3n.create()),
			(this.MXr.A3n = t.A3n),
			(this.MXr.s7n = t.s7n),
			(this.MXr.$kn = t.$kn),
			(this.MXr.D3n = t.D3n),
			(this.MXr.a7n = t.a7n),
			(this.MXr.h7n = t.h7n),
			(this.MXr.r5n = t.r5n);
	}
	SetCreatureDataId(t) {
		this.Xfo = t;
	}
	GetCreatureDataId() {
		return this.Xfo;
	}
	GetPlayerId() {
		return this.j8;
	}
	SetPlayerId(t) {
		this.j8 = t;
	}
	GetOwnerId() {
		return this.fye;
	}
	SetOwnerId(t) {
		this.fye = t;
	}
	GetRoleId() {
		return this.zke;
	}
	SetRoleId(t) {
		this.zke = t;
	}
	GetTrackingIsEnable() {
		return this.bXr;
	}
	GetEntityCamp() {
		if (void 0 !== this.UXr) return this.UXr;
		if (this.GetPbEntityInitData()) {
			var t = this.GetBaseInfo()?.Camp;
			if (void 0 !== t) return t;
		}
		return (
			Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Character",
					29,
					"[清理CDT_EntityConfig]该实体没有对应的Pb表信息Camp",
					["CreatureDataId", this.GetCreatureDataId()],
					["TidName", this.GetBaseInfo()?.TidName],
					["PbDataId", this.GetPbDataId()],
				),
			0
		);
	}
	GetRoleConfig() {
		return (
			this.CXr ||
				(this.CXr = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(
					this.zke,
				)),
			this.CXr
		);
	}
	GetEntityType() {
		return this.fie;
	}
	IsRole() {
		return this.fie === Protocol_1.Aki.Protocol.HBs.Proto_Player;
	}
	IsMonster() {
		return this.fie === Protocol_1.Aki.Protocol.HBs.Proto_Monster;
	}
	IsNpc() {
		return this.fie === Protocol_1.Aki.Protocol.HBs.Proto_Npc;
	}
	IsVision() {
		return this.fie === Protocol_1.Aki.Protocol.HBs.Proto_Vision;
	}
	IsSceneItem() {
		return this.fie === Protocol_1.Aki.Protocol.HBs.Proto_SceneItem;
	}
	IsAnimal() {
		return this.fie === Protocol_1.Aki.Protocol.HBs.Proto_Animal;
	}
	IsCustom() {
		return this.fie === Protocol_1.Aki.Protocol.HBs.Proto_Custom;
	}
	IsCharacter() {
		return (
			this.IsRole() ||
			this.IsMonster() ||
			this.IsNpc() ||
			this.IsVision() ||
			this.IsAnimal()
		);
	}
	GetSubEntityType() {
		return this.mXr;
	}
	SetEntityType(t) {
		this.fie = t;
	}
	SetSubEntityType(t) {
		this.mXr = t;
	}
	GetEntityConfigType() {
		return this.dXr;
	}
	SetEntityConfigType(t) {
		this.dXr = t;
	}
	GetLife() {
		return 0;
	}
	GetMaxLife() {
		return 0;
	}
	GetHardnessModeId() {
		return this.gXr;
	}
	SetAiWeaponId(t) {
		this.yXr = t;
	}
	GetAiWeaponId() {
		return this.yXr;
	}
	SetDurabilityValue(t) {
		(this.DXr = t),
			EventSystem_1.EventSystem.EmitWithTarget(
				this.Entity,
				EventDefine_1.EEventName.OnSceneItemDurabilityChange,
				t,
			);
	}
	GetDurabilityValue() {
		return this.DXr;
	}
	SetHardnessModeId(t) {
		this.gXr = t;
	}
	JXr(t) {
		(this.kXr = new AdviceData_1.AdviceEntityData()), this.kXr.Phrase(t);
	}
	GetAdviceInfo() {
		return this.kXr;
	}
	SetSummonerId(t) {
		this.fXr = t;
	}
	GetSummonerId() {
		return this.fXr;
	}
	SetSummonerPlayerId(t) {
		this.pXr = t;
	}
	GetSummonerPlayerId() {
		return this.pXr;
	}
	SetSummonsVersion(t) {
		this.vXr = t;
	}
	GetSummonsVersion() {
		return this.vXr;
	}
	GetMovementInfo() {
		return this.MXr;
	}
	SetMovementInfo(t) {
		this.MXr = t;
	}
	GetLocation() {
		var t, e, r;
		return this.MXr?.$kn
			? ((t = (r = this.MXr.$kn).X || 0),
				(e = r.Y || 0),
				(r = r.Z || 0),
				new UE.Vector(t, e, r))
			: Vector_1.Vector.ZeroVector;
	}
	SetLocation(t) {
		this.MXr || (this.MXr = Protocol_1.Aki.Protocol.L3n.create()),
			this.MXr.$kn || (this.MXr.$kn = Protocol_1.Aki.Protocol.VBs.create()),
			(this.MXr.$kn.X = t.X ?? 0),
			(this.MXr.$kn.Y = t.Y ?? 0),
			(this.MXr.$kn.Z = t.Z ?? 0),
			(t = this.MXr.$kn),
			(this.WXr = Vector_1.Vector.Create(t.X, t.Y, t.Z));
	}
	GetRotation() {
		var t, e, r;
		return this.MXr?.D3n
			? ((t = (r = this.MXr.D3n).Pitch || 0),
				(e = r.Yaw || 0),
				(r = r.Roll || 0),
				new UE.Rotator(t, e, r))
			: new UE.Rotator(0, 0, 0);
	}
	SetRotation(t) {
		this.MXr || (this.MXr = Protocol_1.Aki.Protocol.L3n.create()),
			this.MXr.D3n || (this.MXr.D3n = Protocol_1.Aki.Protocol.iws.create()),
			(this.MXr.D3n.Pitch = t.Pitch),
			(this.MXr.D3n.Roll = t.Roll),
			(this.MXr.D3n.Yaw = t.Yaw);
	}
	GetTransform() {
		var t = this.GetLocation(),
			e = this.GetRotation();
		return UE.KismetMathLibrary.MakeTransform(t, e, Vector_1.Vector.OneVector);
	}
	GetBlackboard() {
		return this.Yre;
	}
	SetBlackboardsByProtocol(t) {
		if (void 0 !== t) for (const e of t) this.SetBlackboardByProtocol(e);
	}
	SetBlackboardByProtocol(t) {
		void 0 !== t &&
			(t = BlackboardMap_1.BlackboardParam.CreateByProtocol(t)) &&
			this.Yre.SetValue(t.GetKey(), t);
	}
	GetBlackboardByKey(t) {
		return this.Yre.GetValue(t);
	}
	SetBlackboard(t, e) {
		void 0 !== e && this.Yre.SetValue(t, e);
	}
	RemoveBlackboard(t) {
		return this.Yre.RemoveValue(t);
	}
	GetPublicTags() {
		return this.SXr;
	}
	SetPublicTags(t) {
		this.SXr.length = 0;
		for (const e of t)
			this.AddPublicTags(e), this.mKt.has(e) || this.mKt.add(e);
	}
	AddPublicTags(t) {
		this.ContainsPublicTag(t) ||
			(this.SXr.push(t), this.mKt.has(t)) ||
			this.mKt.add(t);
	}
	RemovePublicTag(t) {
		for (let e = 0; e < this.SXr.length; ++e)
			if (this.SXr[e] === t)
				return this.SXr.splice(e, 1), this.mKt.delete(t), !0;
		return !1;
	}
	ClearPublicTags() {
		this.SXr.length = 0;
	}
	ContainsPublicTag(t) {
		for (const e of this.SXr) if (e === t) return !0;
		return !1;
	}
	ContainsTag(t) {
		return this.mKt.has(t);
	}
	GetVisible() {
		return (!this.NXr || !this.OXr) && this.yne;
	}
	SetVisible(t) {
		this.yne = t;
	}
	GetComponentKey() {
		return this.YXr;
	}
	SetComponentKey(t) {
		this.YXr = t;
	}
	GetIsStaticInit() {
		return this.EXr;
	}
	SetIsStaticInit(t) {
		this.EXr = t;
	}
	SetEntityCommonTags(t) {
		this.EntityCommonTags.clear();
		for (const e of t) this.EntityCommonTags.add(e);
	}
	UpdateEntityCommonTags(t) {
		if (0 !== t.length)
			for (const e of t)
				this.EntityCommonTags.has(e.Ukn)
					? e.y9n || this.EntityCommonTags.delete(e.Ukn)
					: e.y9n && this.EntityCommonTags.add(e.Ukn);
	}
	SetModelConfig(t) {
		var e;
		this.IXr !== t &&
			((this.IXr = t),
			(e = DataTableUtil_1.DataTableUtil.GetDataTableRowFromName(
				0,
				t.toString(),
			))
				? (this.TXr = e)
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error("Character", 6, "模型配置不存在", [
						"ModelConfigId",
						t,
					]));
	}
	GetModelId() {
		let t = 0;
		var e;
		return (
			this.GetEntityType() === Protocol_1.Aki.Protocol.HBs.Proto_Player
				? (t = (e = this.GetRoleConfig()) ? e.MeshId : 0)
				: (e = this.GetPbModelConfig())
					? (t = e.ModelId)
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Character",
							29,
							"[清理CDT_EntityConfig]该实体没有对应的Pb表信息",
							["CreatureDataId", this.GetCreatureDataId()],
							["TidName", this.GetBaseInfo()?.TidName],
							["PbDataId", this.GetPbDataId()],
						),
			t
		);
	}
	GetModelConfig() {
		if (!this.TXr) {
			let t;
			(t = this.BXr
				? (0, IComponent_1.getComponent)(
						this.BXr.ComponentsData,
						"ModelComponent",
					)
				: t)
				? this.zXr(t.ModelType)
				: (this.TXr = DataTableUtil_1.DataTableUtil.GetDataTableRowFromName(
						0,
						this.GetModelId().toString(),
					));
		}
		return this.TXr;
	}
	zXr(t) {
		switch (t.Type) {
			case "LevelPrefab":
				(this.TXr = new UE.SModelConfig()),
					(this.LXr = IComponent_1.levelPrefabBpPathConfig[t.BlueprintPath]),
					(this.TXr.场景交互物 = new UE.SoftObjectPath(
						FNameUtil_1.FNameUtil.GetDynamicFName(t.PrefabPath),
						"",
					));
				for (const e of t.PrefabStateList)
					this.TXr.场景交互物状态列表.Add(
						GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(e.LevelTag),
						e.SceneInteractionState,
					);
				for (const e of t.EffectStateList)
					this.TXr.场景交互物特效列表.Add(
						GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(e.LevelTag),
						e.SceneInteractionEffectState,
					);
				break;
			case "ModelId":
				this.SetModelConfig(t.ModelId);
		}
	}
	GetEntityPropertyConfig() {
		if (this.E4r) return this.E4r;
		let t = "";
		this.fie === Protocol_1.Aki.Protocol.HBs.Proto_Player
			? (t = (e = this.GetRoleConfig()).EntityProperty.toString())
			: (e = this.GetBaseInfo())?.EntityPropertyId
				? (t = e.EntityPropertyId.toString())
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Character",
						29,
						"[清理CDT_EntityConfig]该实体没有对应的Pb表信息EntityPropertyId",
						["CreatureDataId", this.GetCreatureDataId()],
						["TidName", e?.TidName],
						["PbDataId", this.GetPbDataId()],
					);
		var e = DataTableUtil_1.DataTableUtil.GetDataTableRowFromName(1, t);
		if (e) return (this.E4r = e), this.E4r;
		Log_1.Log.CheckError() &&
			Log_1.Log.Error(
				"Character",
				3,
				"[CreatureController.LoadActorByTypeAndId] 不存在实体配置表。",
				["roleName", t],
			);
	}
	GetRemoveState() {
		return this.ou;
	}
	SetRemoveState(t) {
		this.ou = t;
	}
	SetInitLocation(t) {
		this.qne = t;
	}
	GetInitLocation() {
		return this.qne;
	}
	GetInitLinearVelocity() {
		return this.RXr;
	}
	GetInitCharacterState() {
		return this.AXr;
	}
	Reset() {
		this.ClearPublicTags(),
			this.mKt.clear(),
			this.SetHardnessModeId(0),
			this.SetPlayerId(0),
			this.SetVisible(!1),
			this.Yre.Clear(),
			(this.xXr = void 0),
			(this.fie = Protocol_1.Aki.Protocol.HBs.Proto_Player),
			(this.TXr = void 0);
	}
	SetPbDataId(t) {
		this.wDe = t;
	}
	GetPbDataId() {
		return this.wDe;
	}
	SetPrefabId(t) {
		this.vH = t;
	}
	GetPrefabId() {
		return this.vH;
	}
	GetMonsterMatchType() {
		if (this.BXr) {
			var t = this.GetBaseInfo();
			if (t) return t.Category.MonsterMatchType;
			Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Entity",
					3,
					"[CreatureData.GetMonsterMatchType] 实体的BaseInfoComponent空。",
					["PbDataId", this.wDe],
				);
		}
	}
	SetPbDataByProtocol(t) {
		var e = t;
		if (
			((this.wDe = e.R5n),
			(this.vH = e.ivs),
			(this.wXr = e.wvs),
			this.dXr === Protocol_1.Aki.Protocol.USs.Proto_Character)
		)
			this.SetRoleId(t.R5n);
		else {
			if (!this.BXr)
				return (
					Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Entity",
							3,
							"[CreatureDataComponent.SetPbDataByProtocol] PbEntityInitData数据为空。",
							["PbDataId", this.wDe],
						),
					!1
				);
			if (!this.BXr.ComponentsData)
				return (
					Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Entity",
							3,
							"[CreatureDataComponent.SetPbDataByProtocol] ComponentsData",
							["PbDataId", this.wDe],
						),
					!1
				);
			var r = this.GetBaseInfo();
			if (!r)
				return (
					Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Entity",
							3,
							"[CreatureData.SetPbDataByProtocol] 实体的BaseInfoComponent空。",
							["PbDataId", this.wDe],
						),
					!1
				);
			r.Category?.EntityPlotBindingType &&
				this.AddPublicTags(r.Category.EntityPlotBindingType);
		}
		return (
			this.SetEntityType(e.cVn),
			this.SetSubEntityType(e.bvs),
			this.SetPlayerId(e.aFn),
			this.SetVisible(e.d4n),
			(this.LivingStatus = e.Rvs),
			(r = e.M3n),
			this.SetLocation(r),
			this.SetRotation(e.S3n),
			this.SetDurabilityValue(e.Avs),
			(this.qne = t.Lvs),
			(this.RXr = t.Uvs),
			(this.AXr = t.Pvs),
			"number" == typeof t.Bvs && (this.UXr = t.Bvs),
			this.ZXr(e.Dvs),
			!0
		);
	}
	ZXr(t) {
		this.ComponentDataMap.clear();
		for (const o of t) {
			var e = o.Mqs;
			switch ((this.ComponentDataMap.set(e, o), e)) {
				case "qvs":
					this.SetHardnessModeId(o.qvs.l7n);
					break;
				case "Gvs":
					this.SetEntityCommonTags(o.Gvs.Nps);
					break;
				case "$vs":
					this.SetBlackboardsByProtocol(o.$vs.Yps);
					break;
				case "Xvs":
					this.bXr = o.Xvs.eMs;
					break;
				case "kvs":
					this.SetSummonerId(MathUtils_1.MathUtils.LongToNumber(o.kvs._7n)),
						this.SetSummonerPlayerId(o.kvs.aFn),
						(this.SummonType = o.kvs.Ikn);
					break;
				case "Zvs":
					this.JXr(o.Zvs);
					break;
				case "eps":
					this.GXr = o.eps.$kn ?? 1;
					break;
				case "rps":
					(this.RelationId = o.rps.uMs),
						(this.PbRelationMatchCfgIndex = o.rps.cMs - 1),
						(this.ControllerId = MathUtils_1.MathUtils.LongToNumber(o.rps._Ms)),
						(this.IsShowingHandFx = o.rps.zkn);
					break;
				case "Lps":
					this.AutonomousId = MathUtils_1.MathUtils.LongToNumber(o.Lps.lMs);
					break;
				case "ops":
					(this.VisionSkillServerEntityId = MathUtils_1.MathUtils.LongToNumber(
						o.ops.CFn,
					)),
						(this.XXr.length = 0);
					for (const t of o.ops.CMs)
						this.XXr.push(MathUtils_1.MathUtils.LongToNumber(t));
					this.VisionControlCreatureDataId = MathUtils_1.MathUtils.LongToNumber(
						o.ops.gMs,
					);
					break;
				case "hps":
					for (const t of o.hps.vMs) this.OccupiedGridInfo.set(t.PSs, t);
					for (const t of o.hps.pMs) this.DynamicGridInfo.push(t);
					break;
				case "gps":
					(this.PbInRangeEntityCreatureDataIds = o.gps.xps.flatMap((t) =>
						MathUtils_1.MathUtils.LongToNumber(t),
					)),
						(this.PbInRangePlayerIds = o.gps.wps);
					break;
				case "Mps":
					var r = o.Mps;
					(this.PbDynAttachEntityConfigId = r.dMs),
						(this.PbDynAttachEntityActorKey = r.mMs),
						(this.PbDynAttachRefActorKey = r.LFn),
						this.PbDynAttachRelPos.Set(
							r.MFn?.X ?? 0,
							r.MFn?.Y ?? 0,
							r.MFn?.Z ?? 0,
						),
						this.PbDynAttachRelRot.Set(
							r.SFn?.Pitch ?? 0,
							r.SFn?.Yaw ?? 0,
							r.SFn?.Roll ?? 0,
						);
					break;
				case "Sps":
					(r = o.Sps?.Ofs), r && this.sKt(r);
			}
		}
	}
	GetPbEntityInitData() {
		return this.BXr;
	}
	GetPbModelConfig() {
		if (this.qXr && 0 !== this.qXr.length)
			return (
				this.vZo ||
					(this.vZo = ModelManager_1.ModelManager.CreatureModel.GetEntityModel(
						this.qXr,
					)),
				this.vZo
			);
	}
	GetLoading() {
		return this.Dne;
	}
	SetLoading(t) {
		this.Dne = t;
	}
	GetPreloadFinished() {
		return this.HXr;
	}
	SetPreloadFinished(t) {
		this.HXr = t;
	}
	GetEntityCommonTags() {
		return this.EntityCommonTags;
	}
	SetLivingStatus(t) {
		this.LivingStatus = t;
	}
	GetLivingStatus() {
		return this.LivingStatus;
	}
	SetEnterComponent(t) {
		this.jXr = t;
	}
	GetEntityEnterComponentState() {
		return this.jXr;
	}
	GetBaseInfo() {
		return (
			this.FXr ||
			(this.BXr
				? ((this.FXr = (0, IComponent_1.getComponent)(
						this.BXr.ComponentsData,
						"BaseInfoComponent",
					)),
					this.FXr)
				: void 0)
		);
	}
	GetMonsterComponent() {
		if (this.BXr)
			return (0, IComponent_1.getComponent)(
				this.BXr.ComponentsData,
				"MonsterComponent",
			);
	}
	GetAttributeComponent() {
		if (this.BXr)
			return (0, IComponent_1.getComponent)(
				this.BXr.ComponentsData,
				"AttributeComponent",
			);
	}
	GetVisionComponent() {
		if (this.BXr)
			return (0, IComponent_1.getComponent)(
				this.BXr.ComponentsData,
				"VisionComponent",
			);
	}
	GetEntityOnlineInteractType() {
		if (this.GetPbEntityInitData()) {
			var t = this.GetBaseInfo()?.OnlineInteractType;
			if (void 0 !== t) return t;
		}
		return 1;
	}
	GetFightInterConfig() {
		return (
			this.VXr ||
			(this.BXr
				? ((this.VXr = (0, IComponent_1.getComponent)(
						this.BXr.ComponentsData,
						"FightInteractComponent",
					)),
					this.VXr)
				: void 0)
		);
	}
	GetModelComponent() {
		if (this.BXr)
			return (0, IComponent_1.getComponent)(
				this.BXr.ComponentsData,
				"ModelComponent",
			);
	}
	RequestPosAbnormal() {
		this.wXr = !0;
		var t = Protocol_1.Aki.Protocol.OYn.create();
		(t.rkn = MathUtils_1.MathUtils.NumberToLong(this.Xfo)),
			(t.u7n = !0),
			Net_1.Net.Call(5545, t, () => {});
	}
	IsRealMonster() {
		var t = this.fie === Protocol_1.Aki.Protocol.HBs.Proto_Monster,
			e = void 0 === this.GetMonsterComponent(),
			r = 0 === this.GetMonsterComponent()?.FightConfigId;
		return t && !e && !r;
	}
	GetAwakedEntities() {
		return (
			this.PXr ||
				((this.PXr = []),
				this.BXr &&
					this.BXr.Children &&
					0 < this.BXr.Children.length &&
					this.BXr.Children.forEach((t) => {
						this.e$r(t) && this.PXr.push(this.t$r(t));
					})),
			this.PXr
		);
	}
	t$r(t) {
		var e;
		return CreatureDataComponent_1.i$r.has(t)
			? CreatureDataComponent_1.i$r.get(t)
			: ((e = t.split("_")),
				(e = parseInt(e[2])),
				CreatureDataComponent_1.i$r.set(t, e),
				e);
	}
	e$r(t) {
		return "e" === t.split("_")[0];
	}
	AddDependenceEntity(t, e) {
		if ((this.xXr || (this.xXr = new Array()), 0 === e)) {
			if (t === this.Xfo)
				return void (
					Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Entity",
						3,
						"不能把自己添加到依赖实体",
						["IdType", e],
						["CreatureDataId", t],
					)
				);
		} else if (2 === e && t === this.Entity.Id)
			return void (
				Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Entity",
					3,
					"不能把自己添加到依赖实体",
					["IdType", e],
					["EntityId", t],
				)
			);
		this.xXr.push([t, e]);
	}
	GetDependenceEntities() {
		return this.xXr;
	}
	sKt(t) {
		for (const r of Object.keys(t)) {
			var e = t[r];
			this.KTn.set(r, e);
		}
	}
	UpdateVar(t, e) {
		this.KTn.set(t, e);
	}
	w9s() {
		this.CustomServerEntityIds.forEach((t) => {
			this.AddDependenceEntity(t, 0);
		}),
			this.VisionSkillServerEntityId &&
				this.AddDependenceEntity(this.VisionSkillServerEntityId, 0),
			this.VisionControlCreatureDataId &&
				this.AddDependenceEntity(this.VisionControlCreatureDataId, 0);
	}
});
(CreatureDataComponent.i$r = new Map()),
	(CreatureDataComponent = CreatureDataComponent_1 =
		__decorate(
			[(0, RegisterComponent_1.RegisterComponent)(0)],
			CreatureDataComponent,
		)),
	(exports.CreatureDataComponent = CreatureDataComponent);
