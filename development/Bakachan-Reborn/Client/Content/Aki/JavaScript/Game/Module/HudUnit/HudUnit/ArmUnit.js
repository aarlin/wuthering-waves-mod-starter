"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AimUnit = void 0);
const UE = require("ue"),
	TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
	LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
	HudUnitBase_1 = require("../HudUnitBase"),
	CLOSE_ANIM_TIME = 200,
	MAX_BYTE = 255;
class AimUnit extends HudUnitBase_1.HudUnitBase {
	constructor() {
		super(...arguments),
			(this.Tei = 0),
			(this.Lei = !1),
			(this.Dei = void 0),
			(this.Rei = !1),
			(this.EPe = void 0),
			(this.Uei = void 0);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UISprite],
			[2, UE.UISprite],
			[3, UE.UISprite],
			[4, UE.UISprite],
			[5, UE.UISprite],
			[6, UE.UISprite],
			[7, UE.UISprite],
			[8, UE.UISprite],
			[9, UE.UISprite],
			[10, UE.UISprite],
			[11, UE.UISprite],
		];
	}
	OnStart() {
		(this.Dei = [
			this.GetSprite(1),
			this.GetSprite(2),
			this.GetSprite(3),
			this.GetSprite(4),
			this.GetSprite(5),
			this.GetSprite(6),
			this.GetSprite(7),
			this.GetSprite(8),
			this.GetSprite(9),
			this.GetSprite(10),
			this.GetSprite(11),
		]),
			(this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem));
	}
	OnBeforeDestroy() {
		this.EPe?.Clear(), (this.EPe = void 0), this.Aei();
	}
	SetTargetVisible(e, i) {
		(this.Lei = e),
			this.Aei(),
			i || e || !this.GetActive() || 0 === this.Tei
				? (e && (this.EPe.StopCurrentSequence(), this.GetItem(0).SetAlpha(1)),
					this.SetVisible(e))
				: this.SetAimStatus(0);
	}
	GetTargetVisible() {
		return this.Lei;
	}
	SetAimStatus(e) {
		if (this.Tei !== e) {
			switch (e) {
				case 0:
					this.Pei();
					break;
				case 1:
					this.xei();
					break;
				case 2:
					this.wei();
					break;
				case 3:
					this.Bei();
			}
			this.Tei = e;
		}
	}
	xei() {
		this.bei(!1),
			this.qei(!1),
			3 === this.Tei
				? this.Gei("Change", !0)
				: 0 === this.Tei && this.Gei("Start1");
	}
	wei() {
		this.bei(!0),
			this.qei(!1),
			3 === this.Tei
				? this.Gei("Change", !0)
				: 0 === this.Tei && this.Gei("Start1");
	}
	Bei() {
		this.bei(!0),
			this.qei(!0),
			2 === this.Tei || 1 === this.Tei
				? this.Gei("Change")
				: 0 === this.Tei && this.Gei("Start2");
	}
	Pei() {
		this.Gei("close"), this.Nei();
	}
	Gei(e, i = !1) {
		this.Aei(),
			this.EPe.StopCurrentSequence(),
			this.EPe.PlaySequencePurely(e, !1, i);
	}
	SetActive(e) {
		(e && !this.Lei) || super.SetActive(e);
	}
	Nei() {
		this.Uei = TimerSystem_1.TimerSystem.Delay(() => {
			this.SetActive(!1), (this.Uei = void 0);
		}, 200);
	}
	Aei() {
		this.Uei &&
			(TimerSystem_1.TimerSystem.Remove(this.Uei), (this.Uei = void 0));
	}
	bei(e) {
		if (void 0 === this.Rei || this.Rei !== e) {
			this.Rei = e;
			var i = this.Rei ? AimUnit.Oei : AimUnit.kei;
			for (const e of this.Dei) e.SetColor(i);
		}
	}
	qei(e) {
		this.GetSprite(6).SetAlpha(e ? 0 : 1),
			this.GetSprite(7).SetAlpha(e ? 0 : 1),
			this.GetSprite(8).SetAlpha(e ? 1 : 0),
			this.GetSprite(9).SetAlpha(e ? 1 : 0);
	}
}
((exports.AimUnit = AimUnit).kei = new UE.Color(255, 255, 255, 255)),
	(AimUnit.Oei = new UE.Color(255, 0, 0, 255));
