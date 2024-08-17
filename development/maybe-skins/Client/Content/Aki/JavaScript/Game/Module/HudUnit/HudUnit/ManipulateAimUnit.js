"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ManipulateAimUnit = void 0);
const UE = require("ue"),
	TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
	HudUnitBase_1 = require("../HudUnitBase"),
	CLOSE_ANIM_TIME = 200;
class ManipulateAimUnit extends HudUnitBase_1.HudUnitBase {
	constructor() {
		super(...arguments),
			(this.Kei = void 0),
			(this.Qei = void 0),
			(this.Xei = !1),
			(this.znt = void 0),
			(this.$ei = void 0),
			(this.dce = !1),
			(this.Yei = !1),
			(this.ist = () => {
				(this.znt = void 0), this.$ei?.();
			});
	}
	OnRegisterComponent() {
		"UiView_Sight" === this.ResourceId && (this.Xei = !0),
			(this.ComponentRegisterInfos = [
				[0, UE.UIItem],
				[1, UE.UIItem],
			]),
			this.Xei
				? (this.ComponentRegisterInfos = [
						[0, UE.UIItem],
						[1, UE.UIItem],
						[2, UE.UIItem],
						[3, UE.UIItem],
						[4, UE.UIItem],
						[5, UE.UIItem],
						[6, UE.UIItem],
					])
				: (this.ComponentRegisterInfos = [
						[0, UE.UIItem],
						[1, UE.UIItem],
					]);
	}
	OnStart() {
		(this.Kei = this.GetItem(0)),
			(this.Qei = this.GetItem(1)),
			(this.Yei = !1),
			this.Kei.SetUIActive(!1),
			this.Brt(),
			this.PlayStartAnim();
	}
	OnBeforeDestroy() {
		(this.Kei = void 0),
			(this.Qei = void 0),
			(this.$ei = void 0),
			super.OnBeforeDestroy();
	}
	SetTargetItemOffset(i, e) {
		this.Kei && (this.Kei.SetAnchorOffsetX(i), this.Kei.SetAnchorOffsetY(e));
	}
	SetTargetAimVisible(i) {
		this.Kei &&
			this.Yei !== i &&
			((this.Yei = i),
			this.Xei
				? i
					? (this.Kei.SetUIActive(i),
						this.PlayStartAimAnim(),
						this.PlayLoopAimAnim())
					: (this.StopLoopAimAnim(), this.PlayCloseAimAnim())
				: this.Kei.SetUIActive(i));
	}
	SetIsWeakness(i) {
		this.Qei && this.Qei.IsUIActiveSelf() !== i && this.Qei.SetUIActive(i);
	}
	Brt() {
		this.Xei &&
			(this.InitTweenAnim(2),
			this.InitTweenAnim(3),
			this.InitTweenAnim(4),
			this.InitTweenAnim(5),
			this.InitTweenAnim(6));
	}
	PlayStartAnim() {
		(this.dce = !0), this.StopCloseAnim(), this.PlayTweenAnim(2);
	}
	PlayCloseAnim() {
		this.dce &&
			((this.dce = !1),
			this.Jei(),
			this.InAsyncLoading()
				? this.$ei?.()
				: ((this.znt = TimerSystem_1.TimerSystem.Delay(this.ist, 200)),
					this.PlayTweenAnim(3)));
	}
	StopCloseAnim() {
		this.Jei(), this.StopTweenAnim(3);
	}
	Jei() {
		this.znt &&
			(TimerSystem_1.TimerSystem.Remove(this.znt), (this.znt = void 0));
	}
	SetCloseAnimCallback(i) {
		this.$ei = i;
	}
	PlayStartAimAnim() {
		this.dce && this.PlayTweenAnim(4);
	}
	PlayCloseAimAnim() {
		this.dce && this.PlayTweenAnim(5);
	}
	PlayLoopAimAnim() {
		this.dce && this.PlayTweenAnim(6);
	}
	StopLoopAimAnim() {
		this.dce && this.StopTweenAnim(6);
	}
	PlayTweenAnim(i) {
		this.Xei && super.PlayTweenAnim(i);
	}
	StopTweenAnim(i) {
		this.Xei && super.StopTweenAnim(i);
	}
}
exports.ManipulateAimUnit = ManipulateAimUnit;
