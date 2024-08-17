"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CameraAimHandle = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	CameraAimUnit_1 = require("../HudUnit/CameraAimUnit"),
	HudUnitHandleBase_1 = require("./HudUnitHandleBase");
class CameraAimHandle extends HudUnitHandleBase_1.HudUnitHandleBase {
	constructor() {
		super(...arguments),
			(this.vii = void 0),
			(this.Mii = void 0),
			(this.Sii = (i, e, t) => {
				if (i && 0 === e) {
					if ((this.Mii !== t && (this.Mii = t), !this.vii))
						return void this.Eii();
					if (this.vii.ResourceId !== this.Mii)
						return this.yii(), void this.Eii();
				}
				this.vii && this.vii.SetVisible(i, e);
			});
	}
	OnDestroyed() {
		(this.Mii = void 0), this.yii();
	}
	OnAddEvents() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.SetCameraAimVisible,
			this.Sii,
		);
	}
	OnRemoveEvents() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.SetCameraAimVisible,
			this.Sii,
		);
	}
	Eii() {
		this.Mii &&
			0 !== this.Mii.length &&
			((this.vii = this.NewHudUnitWithReturn(
				CameraAimUnit_1.CameraAimUnit,
				this.Mii,
				!0,
				() => {
					this.Mii !== this.vii?.ResourceId && this.yii();
				},
			)),
			this.vii.SetVisible(!0, 0));
	}
	yii() {
		this.vii && (this.DestroyHudUnit(this.vii), (this.vii = void 0));
	}
}
exports.CameraAimHandle = CameraAimHandle;
