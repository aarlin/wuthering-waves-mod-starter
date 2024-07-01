"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CommonBossStateView = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../../Core/Common/Log"),
	CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById"),
	Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
	ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
	PublicUtil_1 = require("../../../../Common/PublicUtil"),
	GlobalData_1 = require("../../../../GlobalData"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
	LguiUtil_1 = require("../../../Util/LguiUtil"),
	BattleUiDefine_1 = require("../../BattleUiDefine"),
	BuffItem_1 = require("../BuffItem"),
	HpBufferStateMachine_1 = require("../HeadState/HpBufferStateMachine"),
	RageBufferStateMachine_1 = require("../HeadState/RageBufferStateMachine"),
	VisibleAnimMachine_1 = require("../State/VisibleAnimMachine"),
	BossStateViewBase_1 = require("./BossStateViewBase"),
	FallDownPercentMachine_1 = require("./FallDownPercentMachine");
var EAttributeId = Protocol_1.Aki.Protocol.KBs;
const rgbSplitProgress = new UE.FName("RGBSplit_Progress"),
	FALL_DOWN_DISAPPEAR_PERCENT = 0.9,
	FALL_DOWN_DISAPPEAR_TAIL_COUNT_FACTOR = 10,
	SHOW_VIEW_ANIM_TIME = 667,
	CLOSE_VIEW_ANIM_TIME = 167,
	TOUGH_ANIM_TIME = 250,
	fallDownAttributeId = EAttributeId.Proto_ParalysisTime,
	fallDownMaxAttributeId = EAttributeId.Proto_ParalysisTimeMax;
class CommonBossStateView extends BossStateViewBase_1.BossStateViewBase {
	constructor() {
		super(...arguments),
			(this.EPe = void 0),
			(this.jot = void 0),
			(this.Wot = void 0),
			(this.Kot = void 0),
			(this.Qot = -0),
			(this.Xot = 1),
			(this.$ot = 1),
			(this.Yot = !1),
			(this.Jot = new Map()),
			(this.zot = []),
			(this.Zot = []),
			(this.ert = new HpBufferStateMachine_1.HpBufferStateMachine()),
			(this.trt = new FallDownPercentMachine_1.FallDownPercentMachine()),
			(this.irt = new RageBufferStateMachine_1.RageBufferStateMachine()),
			(this.ort = void 0),
			(this.rrt = -1),
			(this.nrt = -0),
			(this.srt = 0),
			(this.art = 0),
			(this.hrt = !1),
			(this.lrt = !1),
			(this._rt = !1),
			(this.urt = !0),
			(this.crt = !0),
			(this.mrt = !1),
			(this.drt = !1),
			(this.Crt = 0),
			(this.grt = 0),
			(this.frt = !1),
			(this.OnBossHeathChanged = (t, e, i) => {
				this.prt(!0);
			}),
			(this.OnBossMaxHealthChanged = (t, e, i) => {
				this.prt();
			}),
			(this.OnVulnerabilityActivated = (t, e) => {
				this.drt = e;
				var i = this.GetSprite(21);
				i.SetUIActive(e),
					this.drt
						? (([e] = this.GetHpAndShieldPercent()),
							i.SetFillAmount(e),
							this.jot.Play())
						: this.jot.Stop();
			}),
			(this.OnLevelChanged = (t, e, i) => {
				this.vrt();
			}),
			(this.Mrt = (t) => {
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("Battle", 18, "狂暴条刷新", ["visible", t]),
					this.GetItem(11).SetUIActive(t),
					t && this.GetItem(11).SetAlpha(1);
			}),
			(this.Srt = (t) => {
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("Battle", 18, "播放狂暴条动画", ["visible", t]),
					t ? this.Ert(27) : this.Ert(30);
			}),
			(this.yrt = (t) => {
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("Battle", 18, "停止狂暴条动画", ["visible", t]),
					t ? this.Irt(27) : this.Irt(30);
			}),
			(this.Trt = (t, e, i) => {
				var s;
				t <= e
					? this.Lrt()
					: ((s = this.GetSprite(20)).SetUIActive(!0),
						s.SetStretchRight(this.art * (1 - t)),
						s.SetStretchLeft(this.art * e),
						i && this.Ert(28));
			}),
			(this.Drt = (t, e) => {
				var i;
				t <= e
					? this.Rrt()
					: ((i = this.GetItem(22)).SetUIActive(!0),
						i.SetStretchRight(this.art * (1 - t)),
						i.SetStretchLeft(this.art * e),
						this.GetUiNiagara(23).ActivateSystem(!0),
						this.Ert(26));
			}),
			(this.Urt = () => {
				this.Ert(31);
			}),
			(this.Art = new Map()),
			(this.Prt = (t) => {
				t || this.Hide();
			}),
			(this.xrt = (t) => {
				t
					? this.EPe.PlaySequencePurely("ShowView")
					: this.EPe.PlaySequencePurely("CloseView");
			}),
			(this.wrt = (t) => {
				this.EPe.StopCurrentSequence();
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIText],
			[2, UE.UIItem],
			[3, UE.UISprite],
			[4, UE.UISprite],
			[5, UE.UIItem],
			[6, UE.UIItem],
			[7, UE.UISprite],
			[8, UE.UIItem],
			[9, UE.UISprite],
			[10, UE.UISprite],
			[11, UE.UIItem],
			[12, UE.UINiagara],
			[13, UE.UIItem],
			[14, UE.UIItem],
			[15, UE.UIItem],
			[16, UE.UIItem],
			[17, UE.UIItem],
			[18, UE.UISprite],
			[19, UE.UINiagara],
			[20, UE.UISprite],
			[21, UE.UISprite],
			[22, UE.UIItem],
			[23, UE.UINiagara],
			[24, UE.UINiagara],
			[25, UE.UIItem],
			[26, UE.UIItem],
			[27, UE.UIItem],
			[28, UE.UIItem],
			[29, UE.UIItem],
			[30, UE.UIItem],
			[31, UE.UIItem],
		]),
			(this.nrt =
				CommonParamById_1.configCommonParamById.GetIntConfig(
					"HitEffectDuration",
				));
	}
	OnStart() {
		(this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
			this.Brt(),
			(this.Qot =
				CommonParamById_1.configCommonParamById.GetIntConfig(
					"HitLargeBufferPercent",
				) / 1e4),
			(this.Wot = new VisibleAnimMachine_1.VisibleAnimMachine()),
			this.Wot.InitCallback(this.Prt, this.xrt, this.wrt),
			this.Wot.InitVisible(!1),
			(this.Kot = new VisibleAnimMachine_1.VisibleAnimMachine()),
			this.Kot.InitCallback(this.Mrt, this.Srt, this.yrt);
	}
	OnBeforeDestroy() {
		this.EPe.Clear(),
			(this.EPe = void 0),
			this.Wot.Reset(),
			(this.Wot = void 0),
			this.Kot.Reset(),
			(this.Kot = void 0);
	}
	OnActivate() {
		super.OnActivate(),
			(this.lrt = this.HasFallDownTag),
			(this.hrt = this.GetItem(11).bIsUIActive),
			(this.crt = this.GetItem(2).bIsUIActive),
			(this._rt = this.GetSprite(18).bIsUIActive),
			this.Kot.InitVisible(this.hrt),
			this.vrt(),
			this.brt(),
			this.qrt(),
			this.prt(),
			this.Grt(),
			this.Nrt(),
			this.Ort(),
			this.krt(),
			this.Frt(),
			this.Vrt(),
			this.irt.SetUpdateCallback(this.Trt, this.Drt, this.Urt),
			this.Wot.SetVisible(!0, 667);
	}
	OnDeactivate() {
		super.OnDeactivate(),
			this.Hrt(),
			this.Lrt(),
			this.Rrt(),
			this.irt.Reset(),
			this.jrt(),
			this.Wrt(),
			(this.lrt = !1),
			this.Kot?.Reset();
	}
	Initialize(t) {
		super.Initialize(t),
			(t = this.GetSprite(21)),
			(this.jot = t
				.GetOwner()
				.GetComponentByClass(UE.LGUIPlayTweenComponent.StaticClass())),
			(this.srt = this.GetItem(8).GetParentAsUIItem().GetWidth()),
			(this.art = this.GetSprite(20).GetParentAsUIItem().GetWidth()),
			ResourceSystem_1.ResourceSystem.LoadAsync(
				"/LGUI/MPC_UIShader.MPC_UIShader",
				UE.MaterialParameterCollection,
				(t) => {
					this.ort = t;
				},
				103,
			),
			(this.lrt = this.HasFallDownTag);
	}
	OnBossShieldChanged(t) {
		this.prt(!0);
	}
	OnFallDownVisibleChanged(t) {
		t
			? (Log_1.Log.CheckInfo() && Log_1.Log.Info("Battle", 18, "进入倒地状态"),
				this.irt.GetHit(0, this.$ot),
				this.Krt(),
				this.Qrt(!0))
			: (Log_1.Log.CheckInfo() && Log_1.Log.Info("Battle", 18, "退入倒地状态"),
				this.Qrt(!1));
	}
	OnBossHardnessChanged(t) {
		this.krt();
	}
	OnBossLanguageChange() {
		this.brt();
	}
	OnBossStateChange() {
		this.Nrt(!0), this.Ort();
	}
	Tick(t) {
		var e;
		this.frt &&
			((e = this.ert.UpdatePercent(t)) < 0
				? this.Hrt()
				: e <= 1 && this.Xrt(e)),
			this.irt.Update(t),
			this.Krt(t),
			this.rrt > this.nrt && (this.$rt(0), (this.rrt = -1)),
			0 <= this.rrt && (this.rrt += t);
		for (const e of this.Jot.values()) e.Tick(t);
		for (let e = this.zot.length - 1; 0 <= e; e--) {
			var i = this.zot[e];
			i.TickHiding(t) || (this.zot.splice(e, 1), this.Zot.push(i));
		}
		super.Tick(t);
	}
	ChangeBuff(t, e, i) {
		e ? this.Yrt(t, i, !0) : this.Jrt(i, !0);
	}
	Yrt(t, e, i = !1) {
		if (!this.Jot.has(e)) {
			let s = this.zrt();
			(s = s || this.Zrt()), this.ent(s, t, e, i);
		}
	}
	Zrt() {
		var t = this.GetItem(13);
		return new BuffItem_1.BuffItem(t);
	}
	ent(t, e, i, s = !1) {
		var r = this.Jot.size,
			h = this.GetEntity().CheckGetComponent(157)?.GetBuffByHandle(i);
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
		for (const t of this.Jot.values()) t.DestroyCompatible();
		this.Jot.clear();
		for (const t of this.zot) t.Deactivate(), t.DestroyCompatible();
		this.zot.length = 0;
		for (const t of this.Zot) t.DestroyCompatible();
		this.Zot.length = 0;
	}
	prt(t = !1) {
		var [e, i] = this.GetHpAndShieldPercent();
		this.int(e), this.ont(i), t ? this.rnt(e) : this.Hrt(), (this.Xot = e);
	}
	rnt(t) {
		var e;
		t < this.Xot &&
			((e = this.ert.IsOriginState()),
			this.ert.GetHit(t, this.Xot),
			e && !this.ert.IsOriginState() && this.Xrt(this.Xot),
			(this.frt = !0),
			this.Xot - t < this.Qot
				? this.Ert(25)
				: (this.Ert(26), (this.rrt = 0), this.$rt(1)));
	}
	$rt(t) {
		this.ort &&
			UE.KismetMaterialLibrary.SetScalarParameterValue(
				GlobalData_1.GlobalData.GameInstance.GetWorld(),
				this.ort,
				rgbSplitProgress,
				t,
			);
	}
	Hrt() {
		this.GetItem(8).SetUIActive(!1), this.ert.Reset(), (this.frt = !1);
	}
	int(t) {
		this.GetSprite(7).SetFillAmount(t),
			this.drt && this.GetSprite(21).SetFillAmount(t);
	}
	Xrt(t) {
		var e = this.srt * this.Xot,
			i =
				((e = (t = this.srt * t) - e),
				(t = t - (this.srt + e) / 2),
				this.GetItem(8));
		i.SetAnchorOffsetX(t),
			i.SetWidth(e),
			i.SetUIActive(!0),
			this.GetSprite(9).SetAnchorOffsetX(-t);
	}
	ont(t) {
		var e = this.GetSprite(10);
		0 < t ? (e.SetFillAmount(t), e.SetUIActive(!0)) : e.SetUIActive(!1);
	}
	Vrt() {
		if ((this.Wrt(), this.IsValid()))
			for (const e of this.GetEntity().GetComponent(19).GetAllCurrentCueRef()) {
				var t = e.CueConfig;
				t.CueType === BattleUiDefine_1.UI_EFFECT_CUE_TYPE &&
					this.Yrt(t, e.ActiveHandleId);
			}
	}
	vrt() {
		var t, e;
		this.IsValid() &&
			(t = this.GetText(0)) &&
			(1 === this.GetMonsterConfig()?.BossStateInfoShowType
				? t.SetText("")
				: (e = this.GetMonsterConfig()?.TidLevelText)
					? ((e = PublicUtil_1.PublicUtil.GetConfigTextByKey(e)),
						LguiUtil_1.LguiUtil.SetLocalText(t, "LevelShow", e))
					: ((e = this.GetCurrentAttributeValueById(EAttributeId.Proto_Lv)),
						LguiUtil_1.LguiUtil.SetLocalText(t, "LevelShow", e)));
	}
	qrt() {
		var t, e;
		this.IsValid() &&
			((e = this.GetCurrentAttributeValueById(EAttributeId.Proto_Lv)),
			(t = this.GetText(0)),
			(e = ConfigManager_1.ConfigManager.BattleUiConfig.GetThreadColor(e, 1)),
			(e = UE.Color.FromHex(e)),
			t.SetColor(e),
			this.GetText(1).SetColor(e));
	}
	brt() {
		var t, e, i;
		this.IsValid() &&
			((t = PublicUtil_1.PublicUtil.GetConfigTextByKey(
				this.GetBaseInfo().TidName,
			)),
			(e = PublicUtil_1.PublicUtil.GetConfigTextByKey(
				this.GetMonsterConfig().TidBossSubTitle,
			)),
			(i = this.GetText(1))) &&
			i.SetText(t + e);
	}
	Ort() {
		var t = this.lrt || this.urt;
		this.hrt !== t && ((this.hrt = t), this.Kot.SetVisible(t, 250));
	}
	krt() {
		var t;
		this.IsValid() &&
			this.HardnessAttributeId === EAttributeId.Proto_Rage &&
			((t =
				this.GetCurrentAttributeValueById(this.HardnessAttributeId) /
				this.GetCurrentAttributeValueById(this.MaxHardnessAttributeId)),
			this.nnt(t),
			this.snt(t),
			(this.$ot = t));
	}
	nnt(t) {
		this.GetSprite(4).SetFillAmount(t), this.irt.GetHit(t, this.$ot);
	}
	snt(t) {
		t < 1
			? (this.Yot = !1)
			: this.Yot ||
				(this.urt
					? ((this.mrt = !1),
						(this.Yot = !0),
						(t = this.GetUiNiagara(12)).IsUIActiveSelf()
							? t.ActivateSystem(!0)
							: t.SetUIActive(!0),
						this.Frt())
					: (this.mrt = !0));
	}
	jrt() {
		var t = this.GetUiNiagara(12);
		t.IsUIActiveSelf() && t.SetUIActive(!1);
	}
	Nrt(t = !1) {
		this.ant(),
			this.crt !== this.urt &&
				((this.crt = this.urt),
				this.GetSprite(4).SetUIActive(this.crt),
				t || (this.crt && this.mrt)) &&
				this.krt();
	}
	ant() {
		this.lrt || this.HardnessAttributeId !== EAttributeId.Proto_Rage
			? (this.urt = !1)
			: (this.urt = !0);
	}
	Lrt() {
		this.GetSprite(20).SetUIActive(!1);
	}
	Rrt() {
		this.GetItem(22).SetUIActive(!1);
	}
	Frt() {}
	Qrt(t) {
		(this.lrt = t), this.Grt(), this.Nrt(!t), this.Ort();
	}
	Grt() {
		this.lrt !== this._rt &&
			((this._rt = this.lrt),
			this.GetSprite(18).SetUIActive(this._rt),
			this._rt ? this.Ert(29) : this.Irt(29));
	}
	Krt(t = 0) {
		if (this.lrt) {
			var e = this.GetCurrentAttributeValueById(fallDownAttributeId),
				i = this.GetCurrentAttributeValueById(fallDownMaxAttributeId);
			if (
				0 <=
					(e =
						(this.trt.SetTargetPercent(1 - e / i),
						0 < t && this.trt.Update(t),
						this.trt.GetCurPercent())) &&
				e <= 1
			) {
				(i = this.GetSprite(18)),
					this.Crt || (this.Crt = this.GetItem(17).GetWidth()),
					i.SetStretchRight(this.Crt * e);
				let t = 1;
				e > 0.9 && (t = 10 * (1 - e)),
					this.grt !== t &&
						((this.grt = t),
						this.GetUiNiagara(19).SetNiagaraVarFloat("Count", t));
			}
		}
	}
	Brt() {
		this.hnt(25),
			this.hnt(26),
			this.hnt(27),
			this.hnt(28),
			this.hnt(29),
			this.hnt(30),
			this.hnt(31);
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
	HideWithAnim() {
		this.Wot.SetVisible(!1, 167);
	}
	GetResourceId() {
		return "UiItem_BossState_Prefab";
	}
}
exports.CommonBossStateView = CommonBossStateView;
