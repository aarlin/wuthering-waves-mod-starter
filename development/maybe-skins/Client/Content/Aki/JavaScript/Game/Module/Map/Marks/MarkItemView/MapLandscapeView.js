"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LandscapeMarkView = void 0);
const UE = require("ue"),
	MarkEffectByMarkId_1 = require("../../../../../Core/Define/ConfigQuery/MarkEffectByMarkId"),
	MarkItemView_1 = require("./MarkItemView");
class LandscapeMarkView extends MarkItemView_1.MarkItemView {
	constructor(e) {
		super(e), (this.gDi = void 0);
	}
	OnInitialize() {
		super.OnInitialize(), this.fDi();
	}
	GetInteractiveFlag() {
		return !1;
	}
	async fDi() {
		var e = MarkEffectByMarkId_1.configMarkEffectByMarkId.GetConfig(
			this.Holder.MarkId,
		);
		e &&
			((e = await this.LoadPrefabAsync(e.EffectResourcePath, this.RootItem)),
			(this.gDi = e.GetComponentByClass(UE.UIItem.StaticClass())));
	}
	OnBeforeDestroy() {
		this.gDi &&
			UE.LGUIBPLibrary.DestroyActorWithHierarchy(this.gDi.GetOwner(), !0),
			super.OnBeforeDestroy();
	}
}
exports.LandscapeMarkView = LandscapeMarkView;
