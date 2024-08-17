"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LockCursorUnit = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
	HudUnitBase_1 = require("../HudUnitBase");
class LockCursorUnit extends HudUnitBase_1.HudUnitBase {
	constructor() {
		super(...arguments),
			(this.Fei = -1),
			(this.Cce = -0),
			(this.yPt = 0),
			(this.EPe = void 0),
			(this.Vei = !1);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
			[2, UE.UIItem],
			[3, UE.UISprite],
			[4, UE.UISprite],
			[5, UE.UIItem],
		];
	}
	OnStart() {
		this.RootItem.SetAnchorAlign(2, 2),
			this.GetItem(1).SetUIActive(!0),
			this.GetItem(2).SetUIActive(!1),
			this.GetItem(5).SetUIActive(!1),
			this.SetBarPercent(1),
			(this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem));
	}
	Tick(e) {
		var t;
		this.Fei < 0 ||
			(this.Cce > this.Fei
				? this.SetBarPercent(1)
				: ((t = this.Cce / this.Fei), this.SetBarPercent(t), (this.Cce += e)));
	}
	OnBeforeDestroy() {
		this.EPe.Clear(), (this.EPe = void 0);
	}
	Activate() {
		this.SetVisible(!0, 0);
	}
	Deactivate() {
		this.T_o(0), this.SetVisible(!1, 0);
	}
	SetActive(e) {
		e || this.DeactivateUnlockTimeDown(), super.SetActive(e);
	}
	ActivateUnlockTimeDown(e) {
		(this.Fei = e),
			(this.Cce = 0),
			this.GetItem(1).SetUIActive(!1),
			this.RefreshManualLockVisible();
	}
	DeactivateUnlockTimeDown() {
		(this.Fei = -1),
			(this.Cce = 0),
			this.GetItem(1).SetUIActive(!0),
			this.RefreshManualLockVisible(),
			this.SetBarPercent(1);
	}
	UpdateShowTargetState(e) {
		(e = e?.Entity?.GetComponent(185)),
			(this.Vei = e?.HasTag(-625862347) ?? !1),
			this.SetVisible(!this.Vei, 2);
	}
	RefreshManualLockVisible() {
		var e =
			ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity.GetComponent(
				185,
			);
		let t = 3;
		this.Vei
			? ((t = 0), this.Hei(!1, !1))
			: e.HasTag(-1150819426)
				? ((t = 1), this.Hei(!0, !0))
				: ((e = e.HasTag(1260125908)) && (t = 2), this.Hei(e, !1)),
			this.T_o(t),
			this.jei(!this.Vei),
			this.GetItem(1).SetUIActive(!this.Vei),
			this.GetSprite(4).SetUIActive(!this.Vei);
	}
	T_o(e) {
		e !== this.yPt &&
			(Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("Battle", 18, "[LockCursorUnit]UpdateLockState", [
					"",
					e,
				]),
			0 === this.yPt
				? (this.Ouo(), 2 === e && this.tbn())
				: 2 === this.yPt && this.ibn(),
			(this.yPt = e));
	}
	Hei(e, t) {
		var i = this.GetItem(2),
			s = this.GetItem(5);
		t
			? (i.IsUIActiveSelf() !== e && i.SetUIActive(e),
				s.IsUIActiveSelf() && s.SetUIActive(!1))
			: (i.IsUIActiveSelf() && i.SetUIActive(!1),
				s.IsUIActiveSelf() !== e && s.SetUIActive(e));
	}
	jei(e) {
		var t = this.GetSprite(3);
		t.IsUIActiveSelf() !== e && t.SetUIActive(e);
	}
	SetBarPercent(e) {
		this.GetSprite(3).SetFillAmount(e);
	}
	GetUnlockTimeDown() {
		return this.Fei;
	}
	Ouo() {
		this.EPe.PlaySequencePurely("Start");
	}
	tbn() {
		this.EPe.PlaySequencePurely("Lock");
	}
	ibn() {
		this.EPe.PlaySequencePurely("Unlock");
	}
}
exports.LockCursorUnit = LockCursorUnit;
