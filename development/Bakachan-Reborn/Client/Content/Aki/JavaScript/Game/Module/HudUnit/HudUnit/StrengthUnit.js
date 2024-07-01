"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.StrengthUnit = void 0);
const UE = require("ue"),
	Stats_1 = require("../../../../Core/Common/Stats"),
	CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
	TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
	Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	HudUnitBase_1 = require("../HudUnitBase"),
	HudUnitUtils_1 = require("../Utils/HudUnitUtils"),
	PRELOAD_SINGLE_STRENGTH_ITEM_COUNT = 5,
	PRELOAD_SINGLE_TEMPORARY_STRENGTH_ITEM_COUNT = 1,
	MAX_DELTA_TIME = 200,
	MIN_DELTA_OFFSET = 0.5,
	TEMPORARY_STRENGTH_LERP_TIME = 300,
	CLOSE_ANIM_TIME = 250,
	FULL_ANIM_TIME = 300,
	TEMP_CLOSE_ANIM_TIME = 330;
class StrengthUnit extends HudUnitBase_1.HudUnitBase {
	constructor() {
		super(...arguments),
			(this.xHs = new Vector2D_1.Vector2D()),
			(this.mti = !0),
			(this.BuffType = 0),
			(this.dti = []),
			(this.Cti = []),
			(this.gti = new UE.Rotator(0, 0, 0)),
			(this.EntityHandle = void 0),
			(this.ActorComponent = void 0),
			(this.vti = 0),
			(this.Mti = 0),
			(this.Xte = void 0),
			(this.Sti = 0),
			(this.Eti = 1),
			(this.yti = 0),
			(this.Iti = 0),
			(this.Tti = 0),
			(this.Lti = 0),
			(this.Dti = !1),
			(this.IsStarted = !1),
			(this.Rti = 0),
			(this.Uti = 0),
			(this.Ati = 0),
			(this.Pti = 0),
			(this.xti = void 0),
			(this.wti = void 0),
			(this.Bti = void 0);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
			[2, UE.UIItem],
			[3, UE.UIItem],
			[4, UE.UIItem],
			[5, UE.UIItem],
			[6, UE.UIItem],
			[7, UE.UISprite],
			[8, UE.UISprite],
			[9, UE.UISprite],
			[10, UE.UIItem],
			[11, UE.UIItem],
			[12, UE.UIItem],
			[13, UE.UIItem],
			[14, UE.UIItem],
			[15, UE.UIItem],
			[16, UE.UIItem],
			[17, UE.UIItem],
			[18, UE.UIItem],
			[19, UE.UIItem],
			[20, UE.UIItem],
		];
	}
	OnStart() {
		this.RootItem.SetAnchorAlign(2, 2);
		for (let t = 0; t < 5; t++) this.bti(0 === t);
		for (let t = 0; t < 1; t++) this.qti(0 === t);
		(this.Sti = CommonParamById_1.configCommonParamById.GetIntConfig(
			"SingleStrengthValue",
		)),
			(this.Eti = CommonParamById_1.configCommonParamById.GetIntConfig(
				"MaxSingleStrengthItemCount",
			)),
			(this.yti = CommonParamById_1.configCommonParamById.GetIntConfig(
				"SingleTemporaryStrengthValue",
			)),
			(this.Tti = 0),
			(this.Lti = 0),
			this.SetVisible(!1),
			this.Brt();
	}
	OnBeforeDestroy() {
		(this.EntityHandle = void 0),
			(this.ActorComponent = void 0),
			(this.Xte = void 0),
			(this.Dti = !1),
			(this.IsStarted = !1),
			this.Gti(),
			this.Nti(),
			this.Oti(),
			super.OnBeforeDestroy();
	}
	SetNormal(t) {
		var i, e;
		this.mti !== t &&
			((this.mti = t),
			(i = this.GetItem(0)),
			(e = this.GetItem(1)),
			i.IsUIActiveSelf() === t && i.SetUIActive(!t),
			i.IsUIActiveSelf() !== t) &&
			e.SetUIActive(t);
	}
	SetBuff(t) {
		if (this.BuffType !== t) {
			this.BuffType = t;
			var i = this.GetItem(4),
				e = this.GetItem(5);
			switch (t) {
				case 0:
					i.IsUIActiveSelf() && i.SetUIActive(!1),
						e.IsUIActiveSelf() && e.SetUIActive(!1);
					break;
				case 1:
					i.IsUIActiveSelf() || i.SetUIActive(!0),
						e.IsUIActiveSelf() && e.SetUIActive(!1);
					break;
				case 2:
					i.IsUIActiveSelf() && i.SetUIActive(!1),
						e.IsUIActiveSelf() || e.SetUIActive(!0);
			}
		}
	}
	SetEnable(t) {
		var i = this.GetItem(6);
		i.IsUIActiveSelf() === t && i.SetUIActive(!t);
	}
	SetNone(t) {
		var i = this.GetItem(2);
		i.IsUIActiveSelf() !== t && i.SetUIActive(t);
	}
	SetStrengthPercent(t, i) {
		this.vti !== t &&
			((this.vti = t),
			this.GetSprite(8).SetFillAmount(t / i),
			this.GetSprite(7).SetFillAmount(t / i),
			this.kti(i));
	}
	RefreshSingleStrengthItemRotation(t) {
		let i = Math.floor(t / this.Sti);
		var e = 360 / (i = i > this.Eti ? this.Eti : i);
		let s = 0;
		for (let t = 0; t < i; t++) {
			let i = this.Fti(t);
			(i = i || this.bti()),
				(this.gti.Yaw = s),
				i.SetUIRelativeRotation(this.gti),
				(s += e);
		}
	}
	kti(t) {
		let i = Math.floor(t / this.Sti);
		i > this.Eti && (i = this.Eti);
		for (let t = 0; t < this.dti.length; t++) {
			var e = this.dti[t],
				s = t < i;
			e.IsUIActiveSelf() !== s && e.SetUIActive(s);
		}
	}
	bti(t = !1) {
		var i = this.GetItem(11),
			e = this.GetItem(10);
		let s;
		return (
			(s = t
				? e
				: LguiUtil_1.LguiUtil.DuplicateActor(
						e.GetOwner(),
						i,
					).GetComponentByClass(UE.UIItem.StaticClass())),
			this.dti.push(s),
			s
		);
	}
	Fti(t) {
		return this.dti[t];
	}
	RefreshBuffState() {
		this.Xte.HasTag(334800376)
			? this.SetBuff(1)
			: this.Xte.HasTag(-951946659) && this.SetBuff(2);
	}
	RefreshEnableState() {
		var t = this.Xte.HasTag(64400505);
		this.SetEnable(!t);
	}
	SetTemporaryVisible(t) {
		var i = this.GetItem(3);
		i.IsUIActiveSelf() !== t && i.SetUIActive(t);
	}
	PlayTemporaryAnim(t) {
		this.Dti !== t &&
			((this.Dti = t)
				? (this.StopTemporaryCloseAnim(), this.PlayTemporaryStartAnim())
				: (this.StopTemporaryStartAnim(), this.PlayTemporaryCloseAnim()));
	}
	SetTemporaryStrengthPercent(t, i) {
		this.Mti !== t &&
			((this.Lti = t / i),
			(this.Mti = t),
			this.RefreshSingleTemporaryStrengthItemVisible(i));
	}
	RefreshSingleTemporaryStrengthItemRotation(t) {
		let i = Math.floor(t / this.yti);
		var e = 360 / (i = i > this.Eti ? this.Eti : i);
		let s = 0;
		for (let t = 0; t < i; t++) {
			let i = this.Vti(t);
			(i = i || this.qti()),
				(this.gti.Yaw = s),
				i.SetUIRelativeRotation(this.gti),
				(s += e);
		}
	}
	RefreshSingleTemporaryStrengthItemVisible(t) {
		let i = Math.floor(t / this.yti);
		i > this.Eti && (i = this.Eti);
		for (let t = 0; t < this.Cti.length; t++) {
			var e = this.Cti[t],
				s = t < i;
			e.IsUIActiveSelf() !== s && e.SetUIActive(s);
		}
	}
	qti(t = !1) {
		var i = this.GetItem(13),
			e = this.GetItem(12);
		let s;
		return (
			(s = t
				? e
				: LguiUtil_1.LguiUtil.DuplicateActor(
						e.GetOwner(),
						i,
					).GetComponentByClass(UE.UIItem.StaticClass())),
			this.Cti.push(s),
			s
		);
	}
	Hti(t) {
		var i;
		this.GetActive() &&
			this.Tti !== this.Lti &&
			((i = this.GetSprite(9)),
			(this.Iti += t),
			(this.Tti = MathUtils_1.MathUtils.Lerp(
				this.Tti,
				this.Lti,
				this.Iti / 300,
			)),
			i.SetFillAmount(this.Tti),
			this.Iti >= 300) &&
			(this.Iti = 0);
	}
	Vti(t) {
		return this.Cti[t];
	}
	RefreshEntity(t) {
		t
			? ((this.EntityHandle = t.EntityHandle),
				(this.ActorComponent = t.EntityHandle.Entity.GetComponent(3)),
				(this.Xte = t.GameplayTagComponent))
			: ((this.EntityHandle = void 0),
				(this.ActorComponent = void 0),
				(this.Xte = void 0));
	}
	Tick(t) {
		this.RefreshTargetPosition(t), this.Hti(t);
	}
	RefreshTargetPosition(t) {
		var i, e;
		this.GetActive() &&
			this.ActorComponent &&
			this.ActorComponent.Actor?.IsValid() &&
			((i = this.ActorComponent.ActorLocation),
			HudUnitUtils_1.HudUnitUtils.PositionUtil.ProjectWorldToScreen(
				i,
				this.xHs,
			)) &&
			((i = this.xHs.X),
			(e = this.xHs.Y),
			(this.Ati = this.jti(t, i, this.Rti, this.Ati)),
			(this.Pti = this.jti(t, e, this.Uti, this.Pti)),
			(i = this.Ati * t),
			(e = this.Pti * t),
			(i < 0.5 && i > -0.5 && e < 0.5 && e > -0.5) ||
				((this.Rti += i),
				(this.Uti += e),
				this.SetAnchorOffset(this.Rti, this.Uti)));
	}
	jti(t, i, e, s) {
		let h = i - e,
			r = !1;
		if ((h < 0 && ((h = -h), (r = !0)), h < 1)) return 0;
		let n = 0;
		return (
			(n = t >= 200 ? h / t : h / 200),
			r && (n = -n),
			MathUtils_1.MathUtils.Lerp(s, n, 0.5)
		);
	}
	Brt() {
		this.InitTweenAnim(14),
			this.InitTweenAnim(15),
			this.InitTweenAnim(16),
			this.InitTweenAnim(17),
			this.InitTweenAnim(18),
			this.InitTweenAnim(19),
			this.InitTweenAnim(20);
	}
	PlayFullAnim() {
		this.PlayTweenAnim(16),
			this.Nti(),
			(this.wti = TimerSystem_1.TimerSystem.Delay(
				() => {
					(this.wti = void 0),
						this.PlayCloseAnim(),
						this.GetItem(3).IsUIActiveSelf() && this.PlayTemporaryCloseAnim();
				},
				300,
				StrengthUnit.Wti,
			)),
			(this.Dti = !1),
			(this.IsStarted = !1);
	}
	Kti() {
		this.Nti(), this.StopTweenAnim(16);
	}
	Nti() {
		this.wti &&
			(TimerSystem_1.TimerSystem.Remove(this.wti), (this.wti = void 0));
	}
	PlayStartAnim() {
		this.IsStarted ||
			(this.Kti(), this.Qti(), this.PlayTweenAnim(14), (this.IsStarted = !0));
	}
	PlayNoneAnim() {
		this.PlayTweenAnim(17);
	}
	StopNoneAnim() {
		this.StopTweenAnim(17);
	}
	PlayCloseAnim() {
		this.PlayTweenAnim(15),
			this.Gti(),
			(this.xti = TimerSystem_1.TimerSystem.Delay(
				() => {
					(this.xti = void 0), this.SetVisible(!1);
				},
				250,
				StrengthUnit.Xti,
			)),
			(this.IsStarted = !1);
	}
	Qti() {
		this.Gti(), this.StopTweenAnim(15);
	}
	Gti() {
		this.xti &&
			(TimerSystem_1.TimerSystem.Remove(this.xti), (this.xti = void 0));
	}
	PlayTemporaryStartAnim() {
		this.PlayTweenAnim(19);
	}
	StopTemporaryStartAnim() {
		this.StopTweenAnim(19);
	}
	PlayTemporaryCloseAnim() {
		this.PlayTweenAnim(20),
			this.Oti(),
			(this.Bti = TimerSystem_1.TimerSystem.Delay(
				() => {
					(this.Bti = void 0), this.SetTemporaryVisible(!1), (this.Dti = !1);
				},
				330,
				StrengthUnit.$ti,
			));
	}
	StopTemporaryCloseAnim() {
		this.Oti(), this.StopTweenAnim(20);
	}
	Oti() {
		this.Bti &&
			(TimerSystem_1.TimerSystem.Remove(this.Bti), (this.Bti = void 0));
	}
	PlayPickUpAnim() {
		this.PlayTweenAnim(18);
	}
}
((exports.StrengthUnit = StrengthUnit).Xti = void 0),
	(StrengthUnit.Wti = void 0),
	(StrengthUnit.$ti = void 0);
