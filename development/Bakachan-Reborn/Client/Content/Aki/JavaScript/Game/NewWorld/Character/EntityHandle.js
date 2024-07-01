"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.EntityHandle = void 0);
const ModelManager_1 = require("../../Manager/ModelManager");
class EntityHandle {
	constructor(t) {
		(this.Entity = t),
			(this.Id = 0),
			(this.CreatureDataId = 0),
			(this.PbDataId = 0),
			(this.ConfigType = 0),
			(this.Index = 0),
			(this.Priority = 100),
			(this.Id = t.Id),
			(this.Index = t.Index);
	}
	get Valid() {
		return ModelManager_1.ModelManager.CharacterModel.IsValid(this.Id);
	}
	get IsInit() {
		return !!this.Valid && this.Entity.IsInit;
	}
}
exports.EntityHandle = EntityHandle;
