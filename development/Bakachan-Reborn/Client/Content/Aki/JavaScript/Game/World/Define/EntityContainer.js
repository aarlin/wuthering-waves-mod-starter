"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.EntityContainer = void 0);
const Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	CustomMap_1 = require("./CustomMap");
class EntityContainer {
	constructor() {
		(this.EntityMap = new CustomMap_1.CustomMap()),
			(this.EntityIdMap = new Map()),
			(this.PbDataIdMap = new Map());
	}
	AddEntity(t, e) {
		return (
			!this.EntityMap.Contains(t) &&
			(this.EntityMap.Set(t, e), this.EntityIdMap.set(e.Id, t), !0)
		);
	}
	RemoveEntity(t) {
		var e = this.EntityMap.Get(t);
		return (
			!!e &&
			(this.EntityMap.Remove(t),
			this.EntityIdMap.delete(e.Id),
			e.ConfigType === Protocol_1.Aki.Protocol.USs.r3n &&
				this.PbDataIdMap.delete(e.PbDataId),
			!0)
		);
	}
	GetEntity(t) {
		return this.EntityMap.Get(t);
	}
	ExistEntity(t) {
		return this.EntityMap.Contains(t);
	}
	GetEntityById(t) {
		return (t = this.EntityIdMap.get(t)), this.EntityMap.Get(t ?? 0);
	}
	GetEntityByPbDataId(t) {
		return (t = this.PbDataIdMap.get(t)), this.EntityMap.Get(t);
	}
	CheckSetPrefabEntity(t) {
		(t = t.Entity.GetComponent(0)).GetEntityConfigType() ===
			Protocol_1.Aki.Protocol.USs.r3n &&
			this.PbDataIdMap.set(t.GetPbDataId(), t.GetCreatureDataId());
	}
	GetCreatureDataIdByPbDataId(t) {
		return this.PbDataIdMap.get(t);
	}
	PopEntity() {
		var t = this.EntityMap.GetByIndex(0);
		if (t) return this.RemoveEntity(t.CreatureDataId), t;
	}
	GetAllEntities() {
		return this.EntityMap.GetItems();
	}
	Size() {
		return this.EntityMap.Size();
	}
	Clear() {
		this.EntityMap.Clear(), this.EntityIdMap.clear(), this.PbDataIdMap.clear();
	}
}
exports.EntityContainer = EntityContainer;
