"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
	CommonDefine_1 = require("../../../../../Core/Define/CommonDefine"),
	ItemMaterialManager_1 = require("./ItemMaterialManager");
class ItemMaterialDebugActor extends UE.KuroEffectActor {
	constructor() {
		super(...arguments),
			(this.GlobalNum = 0),
			(this.Actor = void 0),
			(this.SimpleScalarNameTest = void 0),
			(this.SimpleScalarValueTest = 0),
			(this.SimpleVectorNameTest = void 0),
			(this.SimpleVectorValueTest = void 0),
			(this.GlobalMaterialData = void 0),
			(this.MaterialData = void 0),
			(this.ActorMaterialControllerNum = 0),
			(this.GlobalItemMaterialController = void 0),
			(this.Controllers = []);
	}
	EditorTick(e) {
		ItemMaterialManager_1.ItemMaterialManager.Tick(
			e * CommonDefine_1.MILLIONSECOND_PER_SECOND,
		),
			this.SimpleMaterialControllerUpdate();
	}
	DisableAllActorData() {
		ItemMaterialManager_1.ItemMaterialManager.DisableAllActorData();
	}
	DisableActorData() {
		ItemMaterialManager_1.ItemMaterialManager.DisableActorData(
			this.ActorMaterialControllerNum,
		);
	}
	EnableActorData() {
		this.Controllers || (this.Controllers = []),
			this.Actor &&
				this.MaterialData &&
				ItemMaterialManager_1.ItemMaterialManager.AddMaterialData(
					this.Actor,
					this.MaterialData,
				);
	}
	SimpleMaterialControllerDisable() {
		ItemMaterialManager_1.ItemMaterialManager.DisableSimpleMaterialController(
			this.ActorMaterialControllerNum,
		);
	}
	SimpleMaterialControllerUpdate() {
		var e, a;
		this.Actor &&
			this.SimpleScalarNameTest &&
			this.SimpleScalarValueTest &&
			this.SimpleVectorNameTest &&
			this.SimpleVectorValueTest &&
			((e = new Map()),
			(a = new Map()),
			e.set(this.SimpleScalarNameTest, this.SimpleScalarValueTest),
			a.set(this.SimpleVectorNameTest, this.SimpleVectorValueTest),
			ItemMaterialManager_1.ItemMaterialManager.AddSimpleMaterialController(
				this.Actor,
				e,
				a,
			));
	}
}
exports.default = ItemMaterialDebugActor;
