"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RogueScoreUnit = void 0);
const UE = require("ue"),
	AudioSystem_1 = require("../../../../Core/Audio/AudioSystem"),
	CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
	Log_1 = require("../../../../Core/Common/Log"),
	Stats_1 = require("../../../../Core/Common/Stats"),
	Time_1 = require("../../../../Core/Common/Time"),
	ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
	CurveUtils_1 = require("../../../../Core/Utils/Curve/CurveUtils"),
	GlobalData_1 = require("../../../GlobalData"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
	HudUnitBase_1 = require("../HudUnitBase"),
	RogueScoreMachine_1 = require("./RogueScoreMachine"),
	filledAmount = new UE.FName("FilledAmount"),
	fillColor = new UE.FName("FillColor"),
	flowColorA = new UE.FName("FlowColorA"),
	flowColorB = new UE.FName("FlowColorB"),
	globalInt = new UE.FName("GlobalInt"),
	rgbSplitProgress = new UE.FName("RGBSplit_Progress"),
	UP_ANIM_TIME = 600,
	HALF_UP_ANIM_TIME = 0,
	UP_EFFECT_TIME = 100,
	scoreTexturePathList = [
		"/Game/Aki/UI/UIResources/UiFight/Image/T_FightScoreD.T_FightScoreD",
		"/Game/Aki/UI/UIResources/UiFight/Image/T_FightScoreC.T_FightScoreC",
		"/Game/Aki/UI/UIResources/UiFight/Image/T_FightScoreB.T_FightScoreB",
		"/Game/Aki/UI/UIResources/UiFight/Image/T_FightScoreA.T_FightScoreA",
		"/Game/Aki/UI/UIResources/UiFight/Image/T_FightScoreS.T_FightScoreS",
		"/Game/Aki/UI/UIResources/UiFight/Image/T_FightScoreSS.T_FightScoreSS",
	],
	scoreBgTexturePathList = [
		"/Game/Aki/UI/UIResources/UiFight/Image/T_FightScoreBgD.T_FightScoreBgD",
		"/Game/Aki/UI/UIResources/UiFight/Image/T_FightScoreBgC.T_FightScoreBgC",
		"/Game/Aki/UI/UIResources/UiFight/Image/T_FightScoreBgB.T_FightScoreBgB",
		"/Game/Aki/UI/UIResources/UiFight/Image/T_FightScoreBgA.T_FightScoreBgA",
		"/Game/Aki/UI/UIResources/UiFight/Image/T_FightScoreBgS.T_FightScoreBgS",
		"/Game/Aki/UI/UIResources/UiFight/Image/T_FightScoreBgSS.T_FightScoreBgSS",
	],
	fillColorList = [
		new UE.LinearColor(0.0118, 0.2588, 1, 0.5255),
		new UE.LinearColor(0.0118, 0.2588, 1, 0.5255),
		new UE.LinearColor(1, 0.2588, 0.5961, 0.5255),
		new UE.LinearColor(1, 0.2588, 0.5961, 0.5255),
		new UE.LinearColor(1, 0.5725, 0.1098, 0.651),
		new UE.LinearColor(1, 0.5725, 0.1098, 0.651),
	],
	flowColorListA = [
		new UE.LinearColor(0.451, 0.5922, 0.949, 1),
		new UE.LinearColor(0.451, 0.5922, 0.949, 1),
		new UE.LinearColor(1, 0.2824, 0.7098, 1),
		new UE.LinearColor(1, 0.2824, 0.7098, 1),
		new UE.LinearColor(1, 0.8588, 0.7451, 1),
		new UE.LinearColor(1, 0.8588, 0.7451, 1),
	],
	flowColorListB = [
		new UE.LinearColor(0.5686, 0.6196, 0.702, 0.0941),
		new UE.LinearColor(0.5686, 0.6196, 0.702, 0.0941),
		new UE.LinearColor(0.7255, 0.5451, 0.5451, 0.0941),
		new UE.LinearColor(0.7255, 0.5451, 0.5451, 0.0941),
		new UE.LinearColor(0.7255, 0.6471, 0.1882, 0.0941),
		new UE.LinearColor(0.7255, 0.6471, 0.1882, 0.0941),
	],
	scoreNiagaraPathList = [
		"/Game/Aki/Effect/UI/Niagaras/RouGe/PingFen/NS_Fx_LGUI_Rouge_CD.NS_Fx_LGUI_Rouge_CD",
		"/Game/Aki/Effect/UI/Niagaras/RouGe/PingFen/NS_Fx_LGUI_Rouge_AB.NS_Fx_LGUI_Rouge_AB",
		"/Game/Aki/Effect/UI/Niagaras/RouGe/PingFen/NS_Fx_LGUI_Rouge_S.NS_Fx_LGUI_Rouge_S",
		"/Game/Aki/Effect/UI/Niagaras/RouGe/PingFen/NS_Fx_LGUI_Rouge_S02.NS_Fx_LGUI_Rouge_S02",
	],
	SHADER_PATH =
		"/Game/Aki/Render/Shaders/UI/MPC_RGBSplitGlitch_FightScore.MPC_RGBSplitGlitch_FightScore",
	scoreNiagaraIndexList = [0, 0, 1, 1, 2, 3],
	sequenceNameList = [
		"StartD",
		"StartC",
		"StartB",
		"StartA",
		"StartS",
		"StartSS",
	],
	musicStateList = ["none", "d", "c", "b", "a", "s", "ss"];
class RogueScoreUnit extends HudUnitBase_1.HudUnitBase {
	constructor() {
		super(...arguments),
			(this.ayn = 0),
			(this.qxn = void 0),
			(this.uyn = new RogueScoreMachine_1.RogueScoreMachine()),
			(this.EPe = void 0),
			(this.cyn = void 0),
			(this.myn = void 0),
			(this.dyn = void 0),
			(this.Cyn = void 0),
			(this.gyn = void 0),
			(this.fyn = -1),
			(this.Gyt = []),
			(this.pyn = -1),
			(this.vyn = []),
			(this.Myn = []),
			(this.Syn = []),
			(this.Eyn = !1),
			(this.yyn = !1),
			(this.Iyn = CurveUtils_1.CurveUtils.DefaultPara),
			(this.Tyn = 0),
			(this.ort = void 0),
			(this.eDn = -1),
			(this.Lyn = (e, t) => {
				var i;
				if (
					this.ayn !== e &&
					((this.ayn = e),
					this.qxn !== t &&
						((s = this.qxn?.Level ?? 0),
						(i = void 0 !== this.qxn),
						(this.qxn = t),
						this.qxn
							? (this.Dyn(this.qxn.Level),
								this.Ryn(this.qxn.Level),
								this.Ayn(this.qxn.Level),
								this.Uyn(this.qxn.Level),
								this.Jzi(this.qxn.Level, this.qxn.Level > s),
								i && this.Pyn(this.qxn.Level))
							: (this.SetVisible(!1), this.Jzi(0, !1))),
					this.qxn)
				) {
					t = this.qxn.LowerUpperLimits[0];
					var s = this.qxn.LowerUpperLimits[1];
					let i = 0;
					(i = s === t ? 1 : ((i = (e - t) / (s - t)), Math.min(i, 1))),
						this.Unt(i);
				}
			}),
			(this.syn = () => {
				(this.yyn = !0),
					(this.Tyn = Time_1.Time.Now),
					(this.eDn = 100),
					this.tDn(1);
			});
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UITexture],
			[1, UE.UITexture],
			[2, UE.UINiagara],
			[3, UE.UIItem],
			[4, UE.UIItem],
			[5, UE.UIItem],
			[6, UE.UIItem],
			[7, UE.UIItem],
			[8, UE.UIItem],
		];
	}
	async OnCreateAsync() {
		var e = [];
		for (let t = 0; t < scoreTexturePathList.length; t++)
			e.push(this.xyn(scoreTexturePathList[t], t, this.vyn));
		for (let t = 0; t < scoreBgTexturePathList.length; t++)
			e.push(this.xyn(scoreBgTexturePathList[t], t, this.Myn));
		for (let t = 0; t < scoreNiagaraPathList.length; t++)
			e.push(this.wyn(scoreNiagaraPathList[t], t, this.Syn));
		e.push(this.iDn(SHADER_PATH)), await Promise.all(e);
	}
	async xyn(e, t, i) {
		const s = new CustomPromise_1.CustomPromise();
		return (
			ResourceSystem_1.ResourceSystem.LoadAsync(
				e,
				UE.Texture,
				(e) => {
					(i[t] = e), s.SetResult();
				},
				103,
			),
			s.Promise
		);
	}
	async wyn(e, t, i) {
		const s = new CustomPromise_1.CustomPromise();
		return (
			ResourceSystem_1.ResourceSystem.LoadAsync(
				e,
				UE.NiagaraSystem,
				(e) => {
					(i[t] = e), s.SetResult();
				},
				103,
			),
			s.Promise
		);
	}
	async iDn(e) {
		const t = new CustomPromise_1.CustomPromise();
		return (
			ResourceSystem_1.ResourceSystem.LoadAsync(
				e,
				UE.MaterialParameterCollection,
				(e) => {
					(this.ort = e), t.SetResult();
				},
				103,
			),
			t.Promise
		);
	}
	OnStart() {
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug("Battle", 18, "[RogueScoreUnit]OnStart"),
			(this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
			(this.cyn = this.GetTexture(0)),
			(this.myn = this.cyn
				.GetOwner()
				.GetComponentByClass(UE.UITextureTransitionComponent.StaticClass())),
			(this.dyn = this.GetTexture(1)),
			(this.Cyn = this.dyn
				.GetOwner()
				.GetComponentByClass(UE.UITextureTransitionComponent.StaticClass())),
			(this.gyn = this.GetUiNiagara(2));
		for (let t = 3; t <= 8; t++) {
			var e = this.GetItem(t);
			this.Gyt.push(e);
		}
		this.uyn.SetUpdateCallback(this.Lyn, this.syn);
	}
	OnBeforeDestroy() {
		this.EPe.Clear(), (this.EPe = void 0);
	}
	async OnShowAsyncImplementImplement() {
		(this.Eyn = !0),
			await this.EPe.PlaySequenceAsync(
				"Start",
				new CustomPromise_1.CustomPromise(),
			),
			(this.Eyn = !1);
	}
	async OnBeforeHideAsync() {
		await this.EPe.PlaySequenceAsync(
			"Close",
			new CustomPromise_1.CustomPromise(),
		);
	}
	UpdateScore(e, t) {
		(this.IsShowOrShowing || this.IsHideOrHiding) &&
			(Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"Battle",
					18,
					"肉鸽战斗评分UI更新",
					["score", e],
					["level", t?.Level],
				),
			this.uyn.UpdateTargetScore(e, t));
	}
	Dyn(e) {
		(e = this.vyn[e - 1]),
			this.cyn.SetTexture(e),
			this.myn?.SetAllStateTexture(e),
			this.cyn.SetSizeFromTexture();
	}
	Ryn(e) {
		var t = this.Myn[e - 1];
		this.dyn.SetTexture(t),
			this.Cyn?.SetAllStateTexture(t),
			this.dyn.SetSizeFromTexture(),
			this.dyn.SetCustomMaterialVectorParameter(
				fillColor,
				fillColorList[e - 1],
			),
			this.dyn.SetCustomMaterialVectorParameter(
				flowColorA,
				flowColorListA[e - 1],
			),
			this.dyn.SetCustomMaterialVectorParameter(
				flowColorB,
				flowColorListB[e - 1],
			);
	}
	Ayn(e) {
		e = scoreNiagaraIndexList[e - 1];
		this.fyn !== e &&
			((this.fyn = e),
			(e = this.Syn[e]),
			this.gyn.SetNiagaraSystem(e),
			this.gyn.ActivateSystem(!0));
	}
	Uyn(e) {
		(e -= 1),
			this.pyn !== e &&
				(0 <= this.pyn && this.Gyt[this.pyn].SetUIActive(!1),
				0 <= e && this.Gyt[e].SetUIActive(!0),
				(this.pyn = e));
	}
	Jzi(e, t) {
		(ModelManager_1.ModelManager.BattleScoreModel.RougeScoreMusicState.State =
			musicStateList[e]),
			t
				? AudioSystem_1.AudioSystem.PostEvent("play_ui_rogue_combo")
				: AudioSystem_1.AudioSystem.PostEvent("play_ui_rogue_combo_down");
	}
	Pyn(e) {
		this.Eyn || this.EPe.PlaySequencePurely(sequenceNameList[e - 1]);
	}
	Unt(e) {
		this.dyn.SetCustomMaterialScalarParameter(filledAmount, e);
	}
	tDn(e) {
		this.ort &&
			UE.KismetMaterialLibrary.SetScalarParameterValue(
				GlobalData_1.GlobalData.GameInstance.GetWorld(),
				this.ort,
				rgbSplitProgress,
				e,
			);
	}
	Tick(e) {
		if (this.GetVisible()) {
			if ((this.uyn.Tick(e), this.yyn)) {
				let e = Time_1.Time.Now - this.Tyn,
					i = (e >= 600 && ((e = 600), (this.yyn = !1)), 0);
				i = e < 0 ? e / 0 : (600 - e) / 600;
				var t = this.Iyn.GetCurrentValue(i);
				this.dyn.SetCustomMaterialScalarParameter(globalInt, 0.1 + 0.9 * t);
			}
			0 < this.eDn &&
				((this.eDn -= e),
				this.eDn <= 0
					? this.tDn(0)
					: ((t = this.Iyn.GetCurrentValue(this.eDn / 100)), this.tDn(t)));
		}
	}
}
(exports.RogueScoreUnit = RogueScoreUnit).ght = void 0;
