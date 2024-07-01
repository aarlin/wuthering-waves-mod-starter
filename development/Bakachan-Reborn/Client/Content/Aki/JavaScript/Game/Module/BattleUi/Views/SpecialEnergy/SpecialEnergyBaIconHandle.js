"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SpecialEnergyBaIconHandle = void 0);
const UE = require("ue"),
	ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
class SpecialEnergyBaIconHandle {
	constructor() {
		(this.imt = void 0),
			(this.omt = ResourceSystem_1.ResourceSystem.InvalidId),
			(this.rmt = !1),
			(this.nmt = void 0);
	}
	Init(e) {
		this.imt = e;
	}
	SetIcon(e) {
		for (const e of this.imt) e.SetUIActive(!1);
		e &&
			(this.omt = ResourceSystem_1.ResourceSystem.LoadAsync(
				e,
				UE.LGUISpriteData_BaseObject,
				(e) => {
					if (((this.omt = ResourceSystem_1.ResourceSystem.InvalidId), e))
						for (const t of this.imt) t.SetUIActive(!0), t.SetSprite(e);
				},
				103,
			));
	}
	PlayEndAnim(e) {
		if (this.rmt !== e)
			if (((this.rmt = e), this.hnt(), e)) for (const e of this.nmt) e.Play();
			else {
				for (const e of this.nmt) e.Stop();
				for (const e of this.imt) e.SetAlpha(1);
			}
	}
	hnt() {
		if (!this.nmt) {
			this.nmt = [];
			for (const t of this.imt) {
				var e = t
					.GetOwner()
					.GetComponentByClass(UE.LGUIPlayTweenComponent.StaticClass());
				this.nmt.push(e);
			}
		}
	}
	OnBeforeDestroy() {
		this.PlayEndAnim(!1),
			this.omt !== ResourceSystem_1.ResourceSystem.InvalidId &&
				(ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.omt),
				(this.omt = ResourceSystem_1.ResourceSystem.InvalidId));
	}
}
exports.SpecialEnergyBaIconHandle = SpecialEnergyBaIconHandle;
