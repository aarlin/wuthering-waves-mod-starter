"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PanelQteContext = void 0);
const UE = require("ue"),
	ModelManager_1 = require("../../Manager/ModelManager");
class PanelQteContext {
	constructor() {
		(this.Source = void 0),
			(this.QteId = 0),
			(this.QteHandleId = 0),
			(this.SourceMeshComp = void 0),
			(this.SourceBuffId = void 0),
			(this.SourceBuffHandleId = 0),
			(this.SourceActor = void 0),
			(this.IsInitSourceEntity = !1),
			(this.SourceEntityHandle = void 0),
			(this.Config = void 0),
			(this.PreMessageId = void 0),
			(this.Success = !1);
	}
	GetSourceEntity() {
		if (this.IsInitSourceEntity)
			return this.SourceEntityHandle?.Valid
				? this.SourceEntityHandle.Entity
				: void (this.SourceEntityHandle = void 0);
		if (
			((this.IsInitSourceEntity = !0),
			this.SourceActor &&
				UE.KuroStaticLibrary.IsImplementInterface(
					this.SourceActor.GetClass(),
					UE.BPI_CreatureInterface_C.StaticClass(),
				))
		) {
			var t = this.SourceActor.GetEntityId();
			if (void 0 !== t)
				return (
					(this.SourceEntityHandle =
						ModelManager_1.ModelManager.CharacterModel.GetHandle(t)),
					this.SourceEntityHandle?.Entity
				);
		}
	}
}
exports.PanelQteContext = PanelQteContext;
