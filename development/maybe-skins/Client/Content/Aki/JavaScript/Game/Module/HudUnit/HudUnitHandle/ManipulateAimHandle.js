"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ManipulateAimHandle = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ManipulateAimUnit_1 = require("../HudUnit/ManipulateAimUnit"),
	HudUnitHandleBase_1 = require("./HudUnitHandleBase");
class ManipulateAimHandle extends HudUnitHandleBase_1.HudUnitHandleBase {
	constructor() {
		super(...arguments),
			(this.Kii = void 0),
			(this.Qii = void 0),
			(this.Xii = void 0),
			(this.$ii = void 0),
			(this.Yii = !1),
			(this.Mii = void 0),
			(this.Jii = (i, t, e) => {
				i || this.Qii || this.Kii?.PlayCloseAnim();
			}),
			(this.zii = (i, t) => {
				(this.Mii = t),
					this.Kii
						? this.Kii.ResourceId !== this.Mii
							? (this.Zii(), this.eoi())
							: (this.toi(), this.ioi(), this.Kii.PlayStartAnim())
						: this.eoi();
			}),
			(this.ooi = (i, t) => {
				i &&
					((this.Qii = i.GetComponent(3)),
					(this.Xii = this.Qii?.Actor.Mesh),
					(this.$ii = t?.PartSocketName),
					(this.Yii = t?.IsWeakness),
					this.Kii
						? this.Kii.ResourceId !== this.Mii
							? (this.Zii(), this.eoi())
							: (this.toi(), this.ioi())
						: this.eoi());
			}),
			(this.roi = () => {
				(this.Qii = void 0),
					(this.Xii = void 0),
					(this.$ii = void 0),
					this.Kii?.SetTargetAimVisible(!1);
			}),
			(this.noi = () => {
				(this.Qii = void 0),
					(this.Xii = void 0),
					(this.$ii = void 0),
					(this.Mii = void 0),
					this.Kii?.PlayCloseAnim();
			});
	}
	OnDestroyed() {
		this.Zii(),
			(this.Kii = void 0),
			(this.Qii = void 0),
			(this.Xii = void 0),
			(this.$ii = void 0);
	}
	OnTick(i) {
		this.toi();
	}
	OnAddEvents() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnManipulateSwitchToNewTarget,
			this.Jii,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnManipulateStartChanting,
				this.zii,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.ManipulateStartLockCastTarget,
				this.ooi,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.ManipulateEndLockCastTarget,
				this.roi,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.HiddenManipulateUI,
				this.noi,
			);
	}
	OnRemoveEvents() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnManipulateSwitchToNewTarget,
			this.Jii,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnManipulateStartChanting,
				this.zii,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.ManipulateStartLockCastTarget,
				this.ooi,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.ManipulateEndLockCastTarget,
				this.roi,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.HiddenManipulateUI,
				this.noi,
			);
	}
	eoi() {
		this.Mii &&
			0 !== this.Mii.length &&
			((this.Kii = this.NewHudUnitWithReturn(
				ManipulateAimUnit_1.ManipulateAimUnit,
				this.Mii,
				!0,
				() => {
					this.Mii !== this.Kii?.ResourceId
						? this.Zii()
						: (this.Kii?.SetCloseAnimCallback(() => {
								this.Zii();
							}),
							this.toi(),
							this.ioi());
				},
			)),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.SetCameraAimVisible,
				!1,
				1,
			));
	}
	Zii() {
		this.Kii &&
			(this.DestroyHudUnit(this.Kii),
			(this.Kii = void 0),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.SetCameraAimVisible,
				!0,
				1,
			));
	}
	toi() {
		var i;
		this.Kii &&
			!this.Kii.InAsyncLoading() &&
			((i = this.soi()) && (i = this.ProjectWorldToScreen(i))
				? (this.Kii.SetTargetItemOffset(i.X, i.Y),
					this.Kii.SetTargetAimVisible(!0))
				: this.Kii.SetTargetAimVisible(!1));
	}
	ioi() {
		!this.Kii || this.Kii.InAsyncLoading() || this.Kii.SetIsWeakness(this.Yii);
	}
	soi() {
		if (this.Qii)
			return this.Xii && this.$ii && this.Xii.DoesSocketExist(this.$ii)
				? this.Xii.GetSocketLocation(this.$ii)
				: this.Qii.ActorLocation;
	}
}
exports.ManipulateAimHandle = ManipulateAimHandle;
