"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SoundBoxMarkItemView = void 0);
const UE = require("ue"),
	EntitySystem_1 = require("../../../../../Core/Entity/EntitySystem"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ServerMarkItemView_1 = require("./ServerMarkItemView");
class SoundBoxMarkItemView extends ServerMarkItemView_1.ServerMarkItemView {
	constructor(e) {
		super(e), (this.GDi = void 0), (this.Lwn = !1);
	}
	async OnCreateAsync() {
		var e, t;
		!this.GDi &&
			((e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
				"UiItem_Mark_Radar_Effect",
			)),
			(e = await this.LoadPrefabAsync(e)),
			(this.GDi = e.GetComponentByClass(UE.UIItem.StaticClass())),
			(e = 2 === this.Holder.MapType),
			(t = this.GDi.GetChildComponent(0))) &&
			((t.bAdaptPosAndSizeChanged = e), (t.bResetNiagara = !0));
	}
	OnInitialize() {
		super.OnInitialize(),
			this.OnIconPathChanged(this.Holder.IconPath),
			this.GDi?.SetUIParent(this.GetRootItem());
	}
	OnSafeUpdate(e, t, i) {
		var r = this.Holder.GetSoundBoxEntityId();
		r &&
			((r = EntitySystem_1.EntitySystem.Get(r)),
			this.SwitchSleepState(void 0 === r));
	}
	SwitchSleepState(e) {
		this.Lwn !== e &&
			((this.Lwn = e)
				? (this.SetSpriteByPath(
						ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
							e ? "SP_MarkSleep" : "SP_MarkNormal",
						),
						this.GetSprite(2),
						!1,
					),
					this.GetSprite(2).SetUIActive(!0))
				: this.GetSprite(2).SetUIActive(!1));
	}
	GetInteractiveFlag() {
		return !1;
	}
	OnBeforeDestroy() {
		this.GDi &&
			UE.LGUIBPLibrary.DestroyActorWithHierarchy(this.GDi.GetOwner(), !0),
			(this.GDi = void 0),
			super.OnBeforeDestroy();
	}
}
exports.SoundBoxMarkItemView = SoundBoxMarkItemView;
