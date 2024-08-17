"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GameModeModel = void 0);
const UE = require("ue"),
	ActorSystem_1 = require("../../../Core/Actor/ActorSystem"),
	Log_1 = require("../../../Core/Common/Log"),
	LogProfiler_1 = require("../../../Core/Common/LogProfiler"),
	InstanceDungeonById_1 = require("../../../Core/Define/ConfigQuery/InstanceDungeonById"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	ModelBase_1 = require("../../../Core/Framework/ModelBase"),
	TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
	FNameUtil_1 = require("../../../Core/Utils/FNameUtil"),
	Vector_1 = require("../../../Core/Utils/Math/Vector"),
	GlobalData_1 = require("../../GlobalData"),
	GameModePromise_1 = require("../Define/GameModePromise"),
	LoadLevelDefine_1 = require("../Define/LoadLevelDefine"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	WorldDefine_1 = require("../Define/WorldDefine");
class GameModeModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.IsSilentLogin = !1),
			(this.kvr = !1),
			(this.Fvr = void 0),
			(this.Vvr = void 0),
			(this.Hvr = !1),
			(this.jvr = !1),
			(this.Wvr = !1),
			(this.Kvr = !1),
			(this.Qvr = ""),
			(this.Xvr = new Array()),
			(this.u9s = void 0),
			(this.$vr = void 0),
			(this.Yvr = void 0),
			(this.Jvr = 0),
			(this.zvr = 0),
			(this.Zvr = void 0),
			(this.eMr = !1),
			(this.tMr = !1),
			(this.Yyo = !1),
			(this.iMr = !1),
			(this.oMr = void 0),
			(this.rMr = !1),
			(this.nMr = !1),
			(this.ShowCenterTextFlow = void 0),
			(this.sMr = !1),
			(this.PreloadLevelMap = new Map()),
			(this.ForceDisableGamePaused = !1),
			(this.GamePausedReasons = new Set()),
			(this.SubLevelMap = new Map()),
			(this.UnloadLevelMap = new Map()),
			(this.DataLayerSet = new Set()),
			(this.MaterialParameterCollectionMap = new Map()),
			(this.aMr = void 0),
			(this.hMr = 0),
			(this.LoadWorldProfiler = new LogProfiler_1.LogProfiler("加载世界")),
			(this.OpenLoadingProfiler =
				this.LoadWorldProfiler.CreateChild("打开Loading")),
			(this.OpenLevelProfiler =
				this.LoadWorldProfiler.CreateChild("加载主Level")),
			(this.PreloadProfiler =
				this.LoadWorldProfiler.CreateChild("Preload阶段")),
			(this.PreloadApplyMaterialParameterCollectionProfiler =
				this.PreloadProfiler.CreateChild("应用MPC")),
			(this.PreloadCommonAndEntityProfiler = this.PreloadProfiler.CreateChild(
				"预加载公共资源、实体资源",
			)),
			(this.PreloadControllerProfiler = this.PreloadProfiler.CreateChild(
				"预加载Controller资源",
			)),
			(this.PreloadCommonProfiler =
				this.PreloadCommonAndEntityProfiler.CreateChild("预加载公共资源")),
			(this.PreloadEntitiesProfiler =
				this.PreloadCommonAndEntityProfiler.CreateChild("预加载实体")),
			(this.LoadSubLevelProfiler =
				this.LoadWorldProfiler.CreateChild("加载子Level")),
			(this.LoadDataLayerProfiler =
				this.LoadWorldProfiler.CreateChild("加载DataLayer")),
			(this.CheckVoxelStreamingSourceProfiler =
				this.LoadWorldProfiler.CreateChild("等待体素流送")),
			(this.CheckStreamingSourceProfiler =
				this.LoadWorldProfiler.CreateChild("等待场景流送")),
			(this.CreateEntitiesProfiler =
				this.LoadWorldProfiler.CreateChild("创建实体")),
			(this.WaitRenderAssetsProfiler =
				this.LoadWorldProfiler.CreateChild("等待渲染资源")),
			(this.OpenBattleViewProfiler =
				this.LoadWorldProfiler.CreateChild("打开主界面")),
			(this.OpenPlotViewProfiler =
				this.LoadWorldProfiler.CreateChild("打开剧情界面")),
			(this.CloseLoadingProfiler =
				this.LoadWorldProfiler.CreateChild("关闭Loading界面")),
			(this.lMr = void 0),
			(this._Mr = void 0),
			(this.uMr = void 0),
			(this.cMr = void 0),
			(this.sAr = void 0),
			(this.mMr = void 0),
			(this.tIo = void 0),
			(this.k6s = void 0),
			(this.fMr = void 0),
			(this.pMr = void 0),
			(this.vMr = void 0),
			(this.tIn = void 0),
			(this.MMr = void 0),
			(this.SMr = void 0),
			(this.EMr = void 0),
			(this.FPn = void 0),
			(this.yMr = void 0),
			(this.IMr = void 0),
			(this.TMr = !1);
	}
	get JoinSceneInfo() {
		return this.aMr;
	}
	set JoinSceneInfo(e) {
		this.aMr = e;
	}
	get LoadingPhase() {
		return this.hMr;
	}
	set LoadingPhase(e) {
		this.hMr = e;
	}
	get Loading() {
		return 1 < this.hMr;
	}
	get HasGameModeData() {
		return this.kvr;
	}
	set HasGameModeData(e) {
		this.kvr = e;
	}
	get Mode() {
		return this.Fvr;
	}
	set Mode(e) {
		this.Fvr = e;
	}
	get MapPath() {
		return this.Qvr;
	}
	set MapPath(e) {
		this.Qvr = e;
	}
	AddLoadMapHandle(e) {
		this.Vvr || (this.Vvr = new Map());
		var r = this.Vvr.get(e);
		return (
			r ? this.Vvr.set(e, ++r) : this.Vvr.set(e, 1),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"World",
					3,
					"添加LoadMapHandle",
					["添加的Handle", e],
					["Size", this.Vvr.size],
				),
			!0
		);
	}
	RemoveLoadMapHandle(e) {
		var r;
		return this.Vvr?.has(e)
			? ((r = this.Vvr.get(e)),
				--r ? this.Vvr.set(e, r) : this.Vvr.delete(e),
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"World",
						3,
						"删除LoadMapHandle",
						["删除的Handle", e],
						["Size", this.Vvr.size],
					),
				!0)
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"World",
						3,
						"删除LoadManHandle失败",
						["Handle", e],
						["Size", this.Vvr?.size],
					),
				!1);
	}
	get MapDone() {
		return !!this.Vvr && 0 === this.Vvr.size;
	}
	get NavMeshDone() {
		return this.Hvr;
	}
	set NavMeshDone(e) {
		this.Hvr = e;
	}
	get WorldDone() {
		return this.jvr;
	}
	set WorldDone(e) {
		this.jvr = e;
	}
	get WorldDoneAndLoadingClosed() {
		return this.Wvr;
	}
	set WorldDoneAndLoadingClosed(e) {
		this.Wvr = e;
	}
	get PlayerStarts() {
		return this.Xvr;
	}
	get MapConfig() {
		return this.Yvr;
	}
	set MapConfig(e) {
		this.Yvr = e;
	}
	get InstanceDungeon() {
		return InstanceDungeonById_1.configInstanceDungeonById.GetConfig(this.Jvr);
	}
	SetInstanceDungeon(e) {
		this.Jvr = e;
	}
	get MapId() {
		return this.zvr;
	}
	set MapId(e) {
		this.zvr = e;
	}
	get InstanceType() {
		return this.Zvr;
	}
	set InstanceType(e) {
		this.Zvr = e;
	}
	get IsMulti() {
		return this.eMr;
	}
	set IsMulti(e) {
		this.eMr = e;
	}
	get ChangeModeState() {
		return this.Kvr;
	}
	set ChangeModeState(e) {
		this.Kvr = e;
	}
	get PlayTravelMp4() {
		return this.iMr;
	}
	set PlayTravelMp4(e) {
		this.iMr = e;
	}
	get TravelMp4Path() {
		return this.oMr;
	}
	set TravelMp4Path(e) {
		this.oMr = e;
	}
	get UseShowCenterText() {
		return this.nMr;
	}
	set UseShowCenterText(e) {
		this.nMr = e;
	}
	get TravelMp4Playing() {
		return this.rMr;
	}
	set TravelMp4Playing(e) {
		this.rMr = e;
	}
	get DataLayerSwitching() {
		return this.sMr;
	}
	set DataLayerSwitching(e) {
		this.sMr = e;
	}
	AddPlayerStart(e) {
		this.Xvr.push(e);
	}
	ClearPlayerStart() {
		this.Xvr.length = 0;
	}
	get VoxelStreamingSource() {
		return this.u9s;
	}
	get StreamingSource() {
		return this.$vr;
	}
	get UseWorldPartition() {
		return this.tMr;
	}
	set UseWorldPartition(e) {
		this.tMr = e;
	}
	get IsTeleport() {
		return this.Yyo;
	}
	set IsTeleport(e) {
		this.Yyo = e;
	}
	get BornLocation() {
		return this.lMr;
	}
	get BornRotator() {
		return this._Mr;
	}
	get RoleLocation() {
		return this.uMr;
	}
	static c9s(e, r, t) {
		var o = ActorSystem_1.ActorSystem.Get(UE.Actor.StaticClass(), e),
			i =
				(o.AddComponentByClass(
					UE.SceneComponent.StaticClass(),
					!1,
					MathUtils_1.MathUtils.DefaultTransform,
					!1,
				),
				o.K2_SetActorLocation(e.GetLocation(), !1, void 0, !1),
				o.AddComponentByClass(
					UE.WorldPartitionStreamingSourceComponent.StaticClass(),
					!1,
					MathUtils_1.MathUtils.DefaultTransform,
					!1,
				));
		if (((i.TargetBehavior = r), t)) for (const e of t) i.TargetGrids.Add(e);
		return i.DisableStreamingSource(), o;
	}
	InitStreamingSources() {
		var e = new UE.Transform(
				this.BornRotator,
				this.BornLocation,
				new UE.Vector(1, 1, 1),
			),
			r = [WorldDefine_1.VOXEL_GRID_NAME];
		(this.u9s = GameModeModel.c9s(e, 0, r)),
			(this.$vr = GameModeModel.c9s(e, 1, r)),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Level",
					7,
					"StreamingSource出生信息",
					["Location", this.BornLocation],
					["Rotation", this.BornRotator],
				);
	}
	SetBornInfo(e, r) {
		(this.lMr = e ? new UE.Vector(e.X, e.Y, e.Z) : void 0),
			(this.uMr = e ? Vector_1.Vector.Create(e) : void 0),
			(this._Mr = r ? new UE.Rotator(r.Pitch, r.Yaw, r.Roll) : void 0);
	}
	UpdateBornLocation(e) {
		this.uMr.Set(e.X, e.Y, e.Z);
	}
	AddSubLevel(e) {
		var r;
		if (!this.SubLevelMap.has(e))
			return (
				(r = new LoadLevelDefine_1.SubLevel(e)), this.SubLevelMap.set(e, r), r
			);
		Log_1.Log.CheckError() &&
			Log_1.Log.Error(
				"World",
				3,
				"[GameModeModel.AddSubLevel] 重复添加子关卡。",
				["Path", e],
			);
	}
	AddSubLevelInstance(e) {
		return this.SubLevelMap.has(e.Path)
			? (Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"World",
						3,
						"[GameModeModel.AddSubLevelInstance] 重复添加子关卡。",
						["Path", e.Path],
					),
				!1)
			: ((e.IsPreload = !1), this.SubLevelMap.set(e.Path, e), !0);
	}
	AddPreloadSubLevel(e) {
		if (this.PreloadLevelMap.has(e))
			Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"World",
					3,
					"[GameModeModel.AddPreloadSubLevel] 重复添加预加载的Level，因为存在于this.PreloadLevelMap中",
					["Path", e],
				);
		else {
			var r;
			if (!this.SubLevelMap.has(e))
				return (
					(r = new LoadLevelDefine_1.SubLevel(e)),
					this.PreloadLevelMap.set(e, r),
					r
				);
			Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"World",
					3,
					"[GameModeModel.AddPreloadSubLevel] 重复添加预加载Level，因为存在于SubLevelMap中",
					["Path", e],
				);
		}
	}
	RemovePreloadSubLevel(e) {
		return this.PreloadLevelMap.delete(e);
	}
	GetPreloadSubLevel(e) {
		return this.PreloadLevelMap.get(e);
	}
	async RemoveSubLevel(e) {
		var r, t, o;
		return this.SubLevelMap.has(e)
			? ((r = this.SubLevelMap.get(e)),
				this.SubLevelMap.delete(e),
				(r.LoadType = 3),
				(r.UnLoadPromise = new GameModePromise_1.GameModePromise()),
				(t = FNameUtil_1.FNameUtil.GetDynamicFName(e)),
				(t =
					GlobalData_1.GlobalData.GameInstance.场景加载通知器.UnloadStreamLevel(
						t,
						!0,
					)),
				(o = this.UnloadLevelMap.size),
				this.UnloadLevelMap.set(t, r),
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"World",
						3,
						"切换子关卡:卸载子关卡。",
						["Path", e],
						["LinkId", t],
						["需要释放数量(前)", o],
						["需要释放数量(后)", this.UnloadLevelMap.size],
					),
				r.UnLoadPromise.Promise)
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"World",
						3,
						"[GameModeModel.RemoveSubLevel]不存在子关卡，删除子关卡失败。",
						["Path", e],
					),
				!1);
	}
	AddDataLayer(e) {
		return this.DataLayerSet.has(e)
			? (Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug(
						"World",
						30,
						"[GameModeModel.AddDataLayer] 重复添加DataLayer。",
						["Path", e],
					),
				!1)
			: (this.DataLayerSet.add(e), !0);
	}
	RemoveDataLayer(e) {
		return this.DataLayerSet.has(e)
			? (this.DataLayerSet.delete(e), !0)
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"World",
						30,
						"[GameModeModel.RemoveDataLayer] 删除不存在的DataLayer。",
						["Path", e],
					),
				!1);
	}
	get BeginLoadMapPromise() {
		return this.cMr;
	}
	get AfterJoinSceneNotifyPromise() {
		return this.sAr;
	}
	get OpenLevelPromise() {
		return this.mMr;
	}
	get StreamingCompleted() {
		return this.tIo;
	}
	get VoxelStreamingCompleted() {
		return this.k6s;
	}
	get LoadMultiFormationPromise() {
		return this.fMr;
	}
	set LoadMultiFormationPromise(e) {
		this.fMr = e;
	}
	get PreloadPromise() {
		return this.pMr;
	}
	get ApplyMaterialParameterCollectionPromise() {
		return this.vMr;
	}
	get ChangeSceneModeEndNotifyPromise() {
		return this.tIn;
	}
	get CheckStreamingCompletedTimerId() {
		return this.MMr;
	}
	set CheckStreamingCompletedTimerId(e) {
		this.MMr = e;
	}
	get CheckSpecialStreamingCompletedTimerId() {
		return this.SMr;
	}
	set CheckSpecialStreamingCompletedTimerId(e) {
		this.SMr = e;
	}
	get CheckRenderAssetsStreamingCompletedTimerId() {
		return this.EMr;
	}
	set CheckRenderAssetsStreamingCompletedTimerId(e) {
		this.EMr = e;
	}
	get CheckRenderAssetsTimeoutId() {
		return this.FPn;
	}
	set CheckRenderAssetsTimeoutId(e) {
		this.FPn = e;
	}
	get VideoStartPromise() {
		return this.yMr;
	}
	get VideoEndPromise() {
		return this.IMr;
	}
	get RenderAssetDone() {
		return this.TMr;
	}
	set RenderAssetDone(e) {
		this.TMr = e;
	}
	CreatePromise() {
		(this.cMr = new GameModePromise_1.GameModePromise()),
			(this.sAr = new GameModePromise_1.GameModePromise()),
			(this.mMr = new GameModePromise_1.GameModePromise()),
			(this.tIo = new GameModePromise_1.GameModePromise()),
			(this.k6s = new GameModePromise_1.GameModePromise()),
			(this.pMr = new GameModePromise_1.GameModePromise()),
			(this.yMr = new GameModePromise_1.GameModePromise()),
			(this.IMr = new GameModePromise_1.GameModePromise()),
			(this.vMr = new GameModePromise_1.GameModePromise());
	}
	ResetPromise() {
		(this.cMr = void 0),
			(this.sAr = void 0),
			(this.mMr = void 0),
			(this.tIo = void 0),
			(this.k6s = void 0),
			(this.pMr = void 0),
			(this.fMr = void 0),
			(this.yMr = void 0),
			(this.IMr = void 0),
			(this.vMr = void 0);
	}
	CreateChangeModePromise() {
		this.tIn = new GameModePromise_1.GameModePromise();
	}
	ResetChangeModePromise() {
		this.tIn = void 0;
	}
	LMr() {
		this.tMr &&
			(this.$vr?.IsValid() &&
				(ActorSystem_1.ActorSystem.Put(this.$vr), (this.$vr = void 0)),
			this.u9s?.IsValid()) &&
			(ActorSystem_1.ActorSystem.Put(this.u9s), (this.u9s = void 0));
	}
	OnLeaveLevel() {
		var e,
			r,
			t = new Array();
		for ([e] of this.PreloadLevelMap) t.push(e);
		for ([r] of this.SubLevelMap) t.push(r);
		for (const e of t) this.RemoveSubLevel(e);
		return (
			(t.length = 0),
			this.DataLayerSet.clear(),
			this.MaterialParameterCollectionMap.clear(),
			this.LMr(),
			void 0 !== this.CheckStreamingCompletedTimerId &&
				(TimerSystem_1.TimerSystem.Remove(this.CheckStreamingCompletedTimerId),
				(this.CheckStreamingCompletedTimerId = void 0)),
			(this.Vvr = void 0),
			(this.Hvr = !1),
			(this.jvr = !1),
			(this.Wvr = !1),
			(this.Qvr = ""),
			(this.zvr = 0),
			(this.eMr = !1),
			(this.Zvr = Protocol_1.Aki.Protocol.sOs.Proto_NoneInstance),
			(this.Yvr = void 0),
			(this.Jvr = 0),
			(this.tMr = !1),
			(this.Yyo = !1),
			(this.RenderAssetDone = !1),
			this.ResetPromise(),
			(this.MMr = void 0),
			(this.SMr = void 0),
			(this.EMr = void 0),
			!(this.FPn = void 0)
		);
	}
	OnChangeMode() {
		return this.ResetPromise(), !0;
	}
}
exports.GameModeModel = GameModeModel;
