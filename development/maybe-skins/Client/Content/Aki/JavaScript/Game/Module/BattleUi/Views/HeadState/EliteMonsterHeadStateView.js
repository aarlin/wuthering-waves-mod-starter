"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.EliteMonsterHeadStateView = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../../Core/Common/Log"),
	CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById"),
	Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
	LguiUtil_1 = require("../../../Util/LguiUtil"),
	BattleUiDefine_1 = require("../../BattleUiDefine"),
	BuffItem_1 = require("../BuffItem"),
	VisibleAnimMachine_1 = require("../State/VisibleAnimMachine"),
	HeadStateViewBase_1 = require("./HeadStateViewBase"),
	RageBufferStateMachine_1 = require("./RageBufferStateMachine");
var EAttributeId = Protocol_1.Aki.Protocol.Bks;
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
	SCALE_TOLERATION = 0.003,
	FALL_DOWN_DISAPPEAR_PERCENT = 0.8,
	FALL_DOWN_DISAPPEAR_TAIL_COUNT_FACTOR = 5,
	TOUGH_ANIM_TIME = 250,
	fallDownAttributeId = EAttributeId.Proto_ParalysisTime,
	fallDownMaxAttributeId = EAttributeId.Proto_ParalysisTimeMax;
class EliteMonsterHeadStateView extends HeadStateViewBase_1.HeadStateViewBase {
	constructor() {
		super(...arguments),
			(this.EPe = void 0),
			(this.Kot = void 0),
			(this.Qot = 0),
			(this.Yot = !1),
			(this.Jot = new Map()),
			(this.zot = []),
			(this.Zot = []),
			(this.Vht = new RageBufferStateMachine_1.RageBufferStateMachine()),
			(this.Hht = 1),
			(this.srt = 0),
			(this.art = 1),
			(this.hrt = !0),
			(this.lrt = !1),
			(this._rt = !1),
			(this.urt = !0),
			(this.crt = !0),
			(this.mrt = !1),
			(this.drt = !1),
			(this.Crt = 0),
			(this.grt = 0),
			(this.OnFallDownVisibleChange = () => {
				this.HeadStateData.HasFallDownTag
					? (this.Vht.GetHit(0, this.Hht), this.Krt(), this.Qrt(!0))
					: this.Qrt(!1);
			}),
			(this.OnAddOrRemoveBuff = (t, e, i, s) => {
				this.HeadStateData.GetEntityId() === t &&
					e.CueType === BattleUiDefine_1.UI_EFFECT_CUE_TYPE &&
					(i ? this.Yrt(e, s, !0) : this.Jrt(s, !0));
			}),
			(this.OnShieldChanged = (t) => {
				this.RefreshHpAndShield(!0);
			}),
			(this.OnHardnessHideChanged = (t) => {
				this.Nrt(), this.Ort();
			}),
			(this.OnHardnessChanged = (t, e, i) => {
				t === this.HardnessAttributeId && this.krt();
			}),
			(this.VulnerabilityActivated = (t) => {
				this.drt = t;
				var e = this.GetSprite(15);
				e.SetUIActive(t),
					this.drt
						? (([t] = this.GetHpAndShieldPercent()),
							e.SetFillAmount(t),
							this.EPe.PlaySequencePurely("Flicker"))
						: this.EPe.StopSequenceByKey("Flicker");
			}),
			(this.OnLevelChanged = (t, e, i) => {
				this.Lht();
			}),
			(this.OnRoleLevelChange = (t, e, i) => {
				this.Lht();
			}),
			(this.OnChangeTeam = () => {
				this.Lht();
			}),
			(this.Mrt = (t) => {
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("Battle", 18, "狂暴条刷新", ["visible", t]),
					this.GetItem(8).SetUIActive(t);
			}),
			(this.Srt = (t) => {
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("Battle", 18, "播放狂暴条动画", ["visible", t]),
					t ? this.Ert(21) : this.Ert(24);
			}),
			(this.yrt = (t) => {
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("Battle", 18, "停止狂暴条动画", ["visible", t]),
					t ? this.Irt(21) : this.Irt(24);
			}),
			(this.Trt = (t, e, i) => {
				var s;
				t <= e
					? this.Lrt()
					: ((s = this.GetSprite(14)).SetUIActive(!0),
						s.SetStretchRight(this.art * (1 - t)),
						s.SetStretchLeft(this.art * e),
						i && this.Ert(22));
			}),
			(this.Drt = (t, e) => {
				this.Ert(20);
			}),
			(this.Urt = () => {
				var t = this.GetUiNiagara(18);
				t.bIsUIActive || t.SetUIActive(!0), t.ActivateSystem(!0);
			}),
			(this.Art = new Map());
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UISprite],
			[1, UE.UISprite],
			[2, UE.UISprite],
			[3, UE.UISprite],
			[4, UE.UIText],
			[5, UE.UIItem],
			[6, UE.UINiagara],
			[7, UE.UIItem],
			[8, UE.UIItem],
			[9, UE.UIItem],
			[10, UE.UISprite],
			[11, UE.UIItem],
			[12, UE.UISprite],
			[13, UE.UINiagara],
			[14, UE.UISprite],
			[15, UE.UISprite],
			[16, UE.UIItem],
			[17, UE.UINiagara],
			[18, UE.UINiagara],
			[19, UE.UIItem],
			[20, UE.UIItem],
			[21, UE.UIItem],
			[22, UE.UIItem],
			[23, UE.UIItem],
			[24, UE.UIItem],
		]),
			(this.ScaleToleration = 0.003);
	}
	ActiveBattleHeadState(t) {
		super.ActiveBattleHeadState(t),
			(this.hrt = this.GetItem(8).bIsUIActive),
			(this.crt = this.GetItem(5).bIsUIActive),
			(this._rt = this.GetSprite(12).bIsUIActive),
			(this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
			this.Kot.InitVisible(this.hrt),
			this.GetItem(8).SetAlpha(1),
			this.jht(),
			this.RefreshHpAndShield(),
			this.Lht(),
			this.RefreshHeadStateRotation(),
			this.Dht(),
			this.Rht(),
			this.Uht(),
			this.Grt(),
			this.Nrt(),
			this.Ort(),
			this.krt(),
			this.Frt(),
			this.Vrt(),
			this.Aht();
	}
	OnStart() {
		this.Brt(),
			(this.Qot =
				CommonParamById_1.configCommonParamById.GetIntConfig(
					"HitLargeBufferPercent",
				) / 1e4),
			this.Vht.SetUpdateCallback(this.Trt, this.Drt, this.Urt),
			(this.srt = this.GetSprite(2).GetParentAsUIItem().GetWidth()),
			(this.art = this.GetSprite(14).GetParentAsUIItem().GetWidth()),
			(this.Kot = new VisibleAnimMachine_1.VisibleAnimMachine()),
			this.Kot.InitCallback(this.Mrt, this.Srt, this.yrt);
	}
	OnBeforeDestroy() {
		this.EPe.Clear(),
			(this.EPe = void 0),
			this.Lrt(),
			this.Frt(),
			this.Vht.Reset(),
			this.Kot.Reset(),
			(this.Kot = void 0);
	}
	ResetBattleHeadState() {
		this.Wrt(), super.ResetBattleHeadState();
	}
	GetResourceId() {
		return "UiItem_EliteMonsterState_Prefab";
	}
	OnRefresh(t, e, i) {
		super.OnRefresh(t, e, i),
			this.Dht(),
			this.Rht(),
			this.Uht(),
			this.Pht(i),
			this.Vht.Update(i),
			this.Krt();
	}
	Yrt(t, e, i = !1) {
		if (!this.Jot.has(e)) {
			let s = this.zrt();
			(s = s || this.Zrt()), this.ent(s, t, e, i);
		}
	}
	Zrt() {
		var t = this.GetItem(9);
		return new BuffItem_1.BuffItem(t);
	}
	ent(t, e, i, s = !1) {
		var r = this.Jot.size,
			h = this.HeadStateData.GetBuff(i);
		t.Activate(e, h, s),
			t.GetRootItem().SetHierarchyIndex(r),
			this.Jot.set(i, t);
	}
	Jrt(t, e = !1) {
		var i = this.tnt(t);
		i &&
			(this.Jot.delete(t),
			(e
				? (i.DeactivateWithCloseAnim(), this.zot)
				: (i.Deactivate(), this.Zot)
			).push(i));
	}
	zrt() {
		var t;
		if (!(this.Zot.length < 1))
			return (t = this.Zot[0]), this.Zot.splice(0, 1), t;
	}
	tnt(t) {
		return this.Jot.get(t);
	}
	Wrt() {
		for (const t of this.Jot.values()) t.Destroy();
		this.Jot.clear();
		for (const t of this.zot) t.Deactivate(), t.Destroy();
		this.zot.length = 0;
		for (const t of this.Zot) t.Destroy();
		this.Zot.length = 0;
	}
	Vrt() {
		if ((this.Wrt(), this.HeadStateData))
			for (const e of this.HeadStateData.GetAllCurrentCueRef()) {
				var t = e.CueConfig;
				t.CueType === BattleUiDefine_1.UI_EFFECT_CUE_TYPE &&
					this.Yrt(t, e.ActiveHandleId);
			}
	}
	Dht() {
		var t = this.IsDetailVisible();
		this.GetItem(7).SetUIActive(t);
	}
	Rht() {
		var t = this.IsLevelTextVisible();
		this.GetText(4).SetUIActive(t);
	}
	Uht() {
		var t = this.IsBuffVisible();
		this.GetItem(9).SetUIActive(t);
	}
	Pht(t) {
		if (this.IsBuffVisible()) {
			for (const e of this.Jot.values()) e.Tick(t);
			for (let i = this.zot.length - 1; 0 <= i; i--) {
				var e = this.zot[i];
				e.TickHiding(t) || (this.zot.splice(i, 1), this.Zot.push(e));
			}
		}
	}
	OnEliteStateChange() {
		this.Nrt(), this.Ort();
	}
	jht() {
		var t = this.HeadStateData.ActorComponent;
		(0, RegisterComponent_1.isComponentInstance)(t, 3) &&
			t.HalfHeight > this.HeadStateData.CommonParam.OutMonsterHalfHeight &&
			(this.NeedCorrectionOutside = !0);
	}
	RefreshHpAndShield(t = !1) {
		var [e, i] = this.GetHpAndShieldPercent();
		this.int(e),
			this.ont(i),
			t
				? (e < this.CurrentBarPercent &&
						(this.CurrentBarPercent - e < this.Qot
							? this.Ert(19)
							: this.Ert(20)),
					this.PlayBarAnimation(e))
				: this.StopBarLerpAnimation();
	}
	OnBeginBarAnimation(t) {
		this.Xrt(t);
	}
	StopBarLerpAnimation() {
		super.StopBarLerpAnimation(), this.GetSprite(1).SetUIActive(!1);
	}
	OnLerpBarBufferPercent(t) {
		this.Xrt(t);
	}
	int(t) {
		this.GetSprite(0).SetFillAmount(t),
			this.drt && this.GetSprite(15).SetFillAmount(t);
	}
	Xrt(t) {
		var e;
		(e =
			((e = this.GetSprite(1)).SetFillAmount(t),
			e.SetUIActive(!0),
			this.GetSprite(2))).SetStretchLeft(this.srt * this.CurrentBarPercent - 2),
			e.SetStretchRight(this.srt * (1 - t) - 2);
	}
	ont(t) {
		var e = this.GetSprite(3);
		0 < t ? (e.SetFillAmount(t), e.SetUIActive(!0)) : e.SetUIActive(!1);
	}
	OnHardnessAttributeChanged() {
		super.OnHardnessAttributeChanged(), this.krt();
	}
	OnHealthChanged(t) {
		this.HeadStateData.GetEntityId() === t && this.RefreshHpAndShield(!0);
	}
	Lht() {
		var t, e, i;
		this.HeadStateData &&
			((t = this.GetLevel()),
			(e = this.GetText(4)),
			(i = ConfigManager_1.ConfigManager.BattleUiConfig.GetThreadColor(
				t,
				this.HeadStateData.Camp,
			)),
			e.SetColor(UE.Color.FromHex(i)),
			LguiUtil_1.LguiUtil.SetLocalText(e, "LevelShow", t));
	}
	Ort() {
		var t = this.lrt || this.urt;
		this.hrt !== t &&
			((this.hrt = t), this.Kot.SetVisible(t, 250), t) &&
			this.GetItem(8).SetAlpha(1);
	}
	krt() {
		var t, e, i;
		this.HardnessAttributeId === EAttributeId.Proto_Rage &&
			((t = this.HeadStateData.GetAttributeCurrentValueById(
				this.MaxHardnessAttributeId,
			)),
			(i =
				(e = this.HeadStateData.GetAttributeCurrentValueById(
					this.HardnessAttributeId,
				)) / t),
			this.GetSprite(10).SetFillAmount(i),
			this.Vht.GetHit(i, this.Hht),
			(this.Hht = e / t),
			this.snt(i));
	}
	snt(t) {
		t < 1
			? (this.Yot = !1)
			: this.Yot ||
				(this.urt
					? ((this.mrt = !1),
						(this.Yot = !0),
						this.GetUiNiagara(6).ActivateSystem(!0),
						this.Frt())
					: (this.mrt = !0));
	}
	Nrt() {
		this.ant(),
			this.crt !== this.urt &&
				((this.crt = this.urt),
				this.GetItem(5).SetUIActive(this.crt),
				this.crt) &&
				this.mrt &&
				this.krt();
	}
	ant() {
		var t;
		this.lrt ||
		this.HardnessAttributeId !== EAttributeId.Proto_Rage ||
		this.HeadStateData.ContainsTagById(1261361093)
			? (this.urt = !1)
			: ((t = this.HeadStateData.GetAttributeCurrentValueById(
					this.MaxHardnessAttributeId,
				)),
				(this.urt = !(t <= 0)));
	}
	Lrt() {
		this.GetSprite(14).SetUIActive(!1);
	}
	Frt() {
		var t = this.GetUiNiagara(18);
		t.bIsUIActive && t.SetUIActive(!1);
	}
	Qrt(t) {
		(this.lrt = t), this.Grt(), this.Nrt(), this.Ort();
	}
	Grt() {
		this.lrt !== this._rt &&
			((this._rt = this.lrt),
			this.GetSprite(12).SetUIActive(this._rt),
			this._rt ? this.Ert(23) : this.Irt(23));
	}
	Krt() {
		if (this.lrt) {
			var t =
				1 -
				this.HeadStateData.GetAttributeCurrentValueById(fallDownAttributeId) /
					this.HeadStateData.GetAttributeCurrentValueById(
						fallDownMaxAttributeId,
					);
			if (0 <= t && t <= 1) {
				var e = this.GetSprite(12);
				this.Crt || (this.Crt = this.GetItem(11).GetWidth()),
					e.SetStretchRight(this.Crt * t);
				let i = 1;
				t > 0.8 && (i = 5 * (1 - t)),
					this.grt !== i &&
						((this.grt = i),
						this.GetUiNiagara(13).SetNiagaraVarFloat("Count", i));
			}
		}
	}
	Aht() {
		var t = this.GetHpColor();
		t && ((t = UE.Color.FromHex(t)), this.GetSprite(0).SetColor(t));
	}
	Brt() {
		this.hnt(19),
			this.hnt(20),
			this.hnt(21),
			this.hnt(22),
			this.hnt(23),
			this.hnt(24);
	}
	hnt(t) {
		var e = [],
			i = this.GetItem(t)
				.GetOwner()
				.K2_GetComponentsByClass(UE.LGUIPlayTweenComponent.StaticClass()),
			s = i.Num();
		for (let t = 0; t < s; t++) e.push(i.Get(t));
		this.Art.set(t, e);
	}
	Ert(t) {
		if ((t = this.Art.get(t))) for (const e of t) e.Play();
	}
	Irt(t) {
		if ((t = this.Art.get(t))) for (const e of t) e.Stop();
	}
}
exports.EliteMonsterHeadStateView = EliteMonsterHeadStateView;
