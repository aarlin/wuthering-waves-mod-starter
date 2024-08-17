"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SceneInteractionModel = void 0);
const UE = require("ue"),
	EntitySystem_1 = require("../../../../Core/Entity/EntitySystem"),
	ModelBase_1 = require("../../../../Core/Framework/ModelBase"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	ActorUtils_1 = require("../../../Utils/ActorUtils"),
	CharacterNameDefines_1 = require("../../Character/Common/CharacterNameDefines");
class SceneInteractionModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments), (this.jnr = !1);
	}
	GetEntityByBaseItem(e) {
		return (
			this.jnr ||
				((this.jnr = !0),
				UE.KuroLevelPlayLibrary.RegisterBaseItemInfo(
					UE.BP_BaseItem_C.StaticClass(),
					"EntityId",
				)),
			(e = UE.KuroLevelPlayLibrary.GetEntityIdByBaseItem(e)),
			ModelManager_1.ModelManager.CreatureModel?.GetEntityById(e)
		);
	}
	GetEntityByActor(e, t = !1) {
		if ((e = this.GetBaseItemByActor(e, t)))
			return ActorUtils_1.ActorUtils.GetEntityByActor(e);
	}
	GetBaseItemByActor(e, t = !1) {
		if (e?.IsValid()) {
			let r = e.GetOwner();
			if (void 0 === r) {
				if (t) return;
				if (void 0 === (r = this.Wnr(e))) return;
			}
			return UE.KuroStaticLibrary.IsObjectClassByName(
				r,
				CharacterNameDefines_1.CharacterNameDefines.BP_BASEITEM,
			)
				? r
				: t
					? void 0
					: this.Wnr(e);
		}
	}
	Wnr(e) {
		let t = e;
		for (
			;
			t &&
			!UE.KuroStaticLibrary.IsImplementInterface(
				t.GetClass(),
				UE.BPI_CreatureInterface_C.StaticClass(),
			);
		)
			t = t.GetAttachParentActor();
		if (t && ((e = t), EntitySystem_1.EntitySystem.Get(e.GetEntityId())?.Valid))
			return t;
	}
}
exports.SceneInteractionModel = SceneInteractionModel;
