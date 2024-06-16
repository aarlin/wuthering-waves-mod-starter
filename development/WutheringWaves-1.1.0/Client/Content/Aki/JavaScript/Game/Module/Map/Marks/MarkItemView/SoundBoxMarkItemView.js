"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SoundBoxMarkItemView = void 0);
const UE = require("ue"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ServerMarkItemView_1 = require("./ServerMarkItemView");
class SoundBoxMarkItemView extends ServerMarkItemView_1.ServerMarkItemView {
	constructor(e) {
		super(e), (this.rLi = void 0);
	}
	async OnCreateAsync() {
		var e, r;
		!this.rLi &&
			((e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
				"UiItem_Mark_Radar_Effect",
			)),
			(e = await this.LoadPrefabAsync(e)),
			(this.rLi = e.GetComponentByClass(UE.UIItem.StaticClass())),
			(e = 2 === this.Holder.MapType),
			(r = this.rLi.GetChildComponent(0))) &&
			((r.bAdaptPosAndSizeChanged = e), (r.bResetNiagara = !0));
	}
	OnInitialize() {
		super.OnInitialize(),
			this.OnIconPathChanged(this.Holder.IconPath),
			this.rLi?.SetUIParent(this.GetRootItem());
	}
	GetInteractiveFlag() {
		return !1;
	}
	OnBeforeDestroy() {
		this.rLi &&
			UE.LGUIBPLibrary.DestroyActorWithHierarchy(this.rLi.GetOwner(), !0),
			(this.rLi = void 0),
			super.OnBeforeDestroy();
	}
}
exports.SoundBoxMarkItemView = SoundBoxMarkItemView;
//# sourceMappingURL=SoundBoxMarkItemView.js.map
