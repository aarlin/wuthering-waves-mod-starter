"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.WorldModel =
		exports.WorldEnvironmentInfo =
		exports.MOBILE_CSM_DISTANCE_OUTCAVE =
		exports.MOBILE_CSM_DISTANCE_INCAVE =
			void 0);
const Queue_1 = require("../../../Core/Container/Queue"),
	ModelBase_1 = require("../../../Core/Framework/ModelBase"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	DEFAULT_ENVIRONMENTTYPE = 255;
(exports.MOBILE_CSM_DISTANCE_INCAVE = 2e4),
	(exports.MOBILE_CSM_DISTANCE_OUTCAVE = 8e3);
class WorldEnvironmentInfo {
	constructor() {
		(this.S9 = 255),
			(this.FMr = ""),
			(this.VMr = ""),
			(this.un = 6),
			(this.RGn = 1);
	}
	get DataLayerType() {
		return this.FMr;
	}
	get SubDataLayerType() {
		return this.VMr;
	}
	get LoadType() {
		return this.un;
	}
	get CaveMode() {
		return this.RGn;
	}
	IsEqual(e) {
		return this.S9 === e;
	}
	IsEnCloseEnvironment() {
		return 0 === this.S9 || 1 === this.S9;
	}
	get EnvType() {
		return this.S9;
	}
	SetInfo(e) {
		switch (e.EnvType) {
			case 0:
				(this.FMr = "DataLayerRuntime_EncloseSpace"),
					(this.VMr = "DataLayerRuntime_EncloseSpaceSub"),
					(this.RGn = 2);
				break;
			case 2:
				(this.FMr = "DataLayerRuntime_EncloseSpace"),
					(this.VMr = "DataLayerRuntime_EncloseSpaceSub"),
					(this.RGn = 3);
				break;
			case 1:
				(this.FMr = "DataLayerRuntime_EncloseSpaceRoom"),
					(this.VMr = "DataLayerRuntime_EncloseSpaceSubRoom"),
					(this.RGn = 2);
				break;
			default:
				this.RGn = 1;
		}
		(this.un = e.StreamingType), (this.S9 = e.EnvType);
	}
	ResetInfo() {
		this.S9 = 255;
	}
}
exports.WorldEnvironmentInfo = WorldEnvironmentInfo;
class WorldModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.TickIntervalSchedulers = new Array()),
			(this.HMr = void 0),
			(this.b4e = !1),
			(this.jMr = !1),
			(this.ChangeSchedulerLastType = 0),
			(this.ChangeSchedulerDeltaFrameCount = 0),
			(this.CurrentSchedulerDelta = 0),
			(this.WMr = new Map()),
			(this.DestroyActorQueue = new Queue_1.Queue()),
			(this.ActorsToIgnoreSet = new Set()),
			(this.CurEnvironmentInfo = new WorldEnvironmentInfo()),
			(this.IsEnableEnvironmentDetecting = !0);
	}
	get ControlPlayerLastLocation() {
		return ModelManager_1.ModelManager.WorldModel.HMr;
	}
	set ControlPlayerLastLocation(e) {
		this.HMr = e;
	}
	get WorldStateMap() {
		return this.WMr;
	}
	set WorldStateMap(e) {
		this.WMr = e;
	}
	UpdateWorldState(e) {
		for (const n of Object.keys(e)) {
			var t = e[n],
				r = Number(MathUtils_1.MathUtils.LongToBigInt(t.BMs));
			switch (n) {
				case "DefaultState":
				case "NpcWorldState":
					this.WMr.set(n, r);
			}
		}
	}
	GetMapDone() {
		return this.jMr;
	}
	SetMapDone(e) {
		this.jMr = e;
	}
	GetWorldDone() {
		return this.b4e;
	}
	SetWorldDone(e) {
		this.b4e = e;
	}
	static AddTsSimpleInteractItem(e) {
		let t = this.KMr.get(e.TypeId);
		t || ((t = new Set()), this.KMr.set(e.TypeId, t)), t.add(e);
	}
	static RemoveTsSimpleInteractItem(e) {
		var t = this.KMr.get(e.TypeId);
		t && t.delete(e);
	}
	static GetTsSimpleInteractItemById(e) {
		return this.KMr.get(e);
	}
	AddDestroyActor(e, t, r) {
		r?.IsValid() && this.DestroyActorQueue.Push([e, t, r]);
	}
	PopDestroyActor() {
		if (0 !== this.DestroyActorQueue.Size) return this.DestroyActorQueue.Pop();
	}
	AddIgnore(e) {
		!e?.IsValid() ||
			this.ActorsToIgnoreSet.has(e) ||
			this.ActorsToIgnoreSet.add(e);
	}
	RemoveIgnore(e) {
		return !!e?.IsValid() && this.ActorsToIgnoreSet.delete(e);
	}
	ClearIgnore() {
		this.ActorsToIgnoreSet.clear();
	}
	HandleEnvironmentUpdate(e) {
		let t = 0;
		if (!this.CurEnvironmentInfo.IsEqual(e.EnvType)) {
			switch (this.CurEnvironmentInfo.EnvType) {
				case 255:
					2 === e.EnvType && (t = 1),
						(0 !== e.EnvType && 1 !== e.EnvType) || (t = 5);
					break;
				case 2:
					255 === e.EnvType && (t = 4),
						(0 !== e.EnvType && 1 !== e.EnvType) || (t = 3);
					break;
				case 0:
				case 1:
					255 === e.EnvType && (t = 6), 2 === e.EnvType && (t = 2);
			}
			this.CurEnvironmentInfo.SetInfo(e);
		}
		return t;
	}
}
((exports.WorldModel = WorldModel).IsStandalone = !1),
	(WorldModel.KMr = new Map());
