"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MergeMonsterHeadStateView = void 0);
const UE = require("ue"),
	CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById"),
	ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
	PublicUtil_1 = require("../../../../Common/PublicUtil"),
	GlobalData_1 = require("../../../../GlobalData"),
	LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
	BattleChildView_1 = require("../BattleChildView/BattleChildView"),
	HpBufferStateMachine_1 = require("../HeadState/HpBufferStateMachine"),
	VisibleAnimMachine_1 = require("../State/VisibleAnimMachine"),
	rgbSplitProgress = new UE.FName("RGBSplit_Progress"),
	SHOW_VIEW_ANIM_TIME = 667,
	CLOSE_VIEW_ANIM_TIME = 167;
class MergeMonsterHeadStateView extends BattleChildView_1.BattleChildView {
	constructor() {
		super(...arguments),
			(this.Info = void 0),
			(this.EPe = void 0),
			(this.Wot = void 0),
			(this.Qot = -0),
			(this.Xot = 1),
			(this.ert = new HpBufferStateMachine_1.HpBufferStateMachine()),
			(this.ort = void 0),
			(this.rrt = -1),
			(this.nrt = -0),
			(this.srt = 0),
			(this.frt = !1),
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
			this.cnt();
		var t = UE.Color.FromHex("ED601BFF");
		this.GetText(1).SetColor(t);
	}
	cnt() {
		this.GetSprite(10).SetUIActive(!1), this.GetItem(11).SetUIActive(!1);
	}
	OnBeforeDestroy() {
		this.EPe.Clear(),
			(this.EPe = void 0),
			this.Wot.Reset(),
			(this.Wot = void 0);
	}
	OnBeforeShow() {
		this.mnt(), this.Wot.SetVisible(!0, 667);
	}
	Refresh(t) {
		(this.Info = t),
			this.IsShowOrShowing && (void 0 === t ? this.Hrt() : this.mnt());
	}
	mnt() {
		this.vrt(), this.dnt(), this.Cnt();
	}
	Initialize(t) {
		super.Initialize(t),
			(this.srt = this.GetItem(8).GetParentAsUIItem().GetWidth()),
			ResourceSystem_1.ResourceSystem.LoadAsync(
				"/LGUI/MPC_UIShader.MPC_UIShader",
				UE.MaterialParameterCollection,
				(t) => {
					this.ort = t;
				},
				103,
			);
	}
	OnHealthChanged() {
		this.Cnt(!0);
	}
	OnLanguageChange() {
		this.dnt();
	}
	Tick(t) {
		var e;
		this.IsShowOrShowing &&
			(this.frt &&
				((e = this.ert.UpdatePercent(t)) < 0
					? this.Hrt()
					: e <= 1 && this.Xrt(e)),
			this.rrt > this.nrt && (this.$rt(0), (this.rrt = -1)),
			0 <= this.rrt) &&
			(this.rrt += t);
	}
	Cnt(t = !1) {
		var e;
		this.Info.TotalHpMax <= 0 ||
			((e = this.Info.TotalHp / this.Info.TotalHpMax),
			this.int(e),
			t ? this.rnt(e) : this.Hrt(),
			(this.Xot = e));
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
		this.GetSprite(7).SetFillAmount(t);
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
	vrt() {
		var t = this.GetText(0);
		t && t.SetUIActive(!1);
	}
	dnt() {
		var t = this.Info.MonsterGroupName,
			e = this.GetText(1);
		t
			? e.SetText(PublicUtil_1.PublicUtil.GetConfigTextByKey(t))
			: e.SetText("");
	}
	Brt() {
		this.hnt(25), this.hnt(26);
	}
	hnt(t) {
		var e = [],
			i = this.GetItem(t)
				.GetOwner()
				.K2_GetComponentsByClass(UE.LGUIPlayTweenComponent.StaticClass()),
			r = i.Num();
		for (let t = 0; t < r; t++) e.push(i.Get(t));
		this.Art.set(t, e);
	}
	Ert(t) {
		if ((t = this.Art.get(t))) for (const e of t) e.Play();
	}
	HideWithAnim() {
		this.Wot.SetVisible(!1, 167);
	}
	GetResourceId() {
		return "UiItem_BossState_Prefab";
	}
}
exports.MergeMonsterHeadStateView = MergeMonsterHeadStateView;
