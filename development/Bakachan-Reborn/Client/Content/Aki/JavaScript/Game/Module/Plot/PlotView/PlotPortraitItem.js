"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PlotPortraitItem = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	AudioController_1 = require("../../../../Core/Audio/AudioController"),
	CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
	Log_1 = require("../../../../Core/Common/Log"),
	MonsterDisplayById_1 = require("../../../../Core/Define/ConfigQuery/MonsterDisplayById"),
	SpeakerById_1 = require("../../../../Core/Define/ConfigQuery/SpeakerById"),
	ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	ObjectUtils_1 = require("../../../../Core/Utils/ObjectUtils"),
	StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	PublicUtil_1 = require("../../../Common/PublicUtil"),
	Global_1 = require("../../../Global"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	UiLayer_1 = require("../../../Ui/UiLayer"),
	LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
	PlotController_1 = require("../PlotController"),
	VELOCITY_FOLLOW = 0.01,
	ARM_LENGTH_MIN = 100,
	ARM_LENGTH_MAX = 350,
	HORI_DEC_RATIO = 4,
	HORI_INC_RATIO = 0.3,
	SCALE_RATIO = 0.002,
	VO_RTPC_VALUE_MIN = -48,
	VO_RTPC_VALUE_MAX = 0,
	AUDIO_GROUP_NAME = "phone_call";
class PlotPortraitItem extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.wJi = void 0),
			(this.Xje = 0),
			(this.BJi = void 0),
			(this.bJi = void 0),
			(this.qJi = 0),
			(this.zzt = 0),
			(this.GJi = void 0),
			(this.NJi = void 0),
			(this.OJi = !1),
			(this.EPe = void 0),
			(this.kJi = new AudioController_1.PlayResult()),
			(this.wk = void 0),
			(this.he = void 0),
			(this.FJi = void 0),
			(this.VJi = new Map([
				[0, "call_01"],
				[1, "call_02"],
				[2, "call_03"],
				[3, "call_04"],
			])),
			(this.HJi = new Map([
				[0, "Start01"],
				[1, "Start01"],
				[2, "Start02"],
				[3, "Start03"],
			])),
			(this.OnTick = (t) => {
				this.jJi() &&
					((this.zzt += t),
					this.zzt < this.qJi ||
						((this.zzt = 0), this.WJi(), this.KJi(t), this.QJi(), this.XJi()));
			});
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UITexture],
			[2, UE.UIItem],
			[3, UE.UIItem],
			[4, UE.UIItem],
			[5, UE.UIItem],
			[6, UE.UIItem],
			[7, UE.UIItem],
			[8, UE.UINiagara],
			[9, UE.UIItem],
			[10, UE.UIItem],
			[11, UE.UITexture],
			[12, UE.UINiagara],
			[13, UE.UIText],
			[14, UE.UIText],
			[15, UE.UINiagara],
		];
	}
	async OpenAsync(t, e) {
		(this.wJi = e),
			await this.CreateThenShowByResourceIdAsync(
				"UiItem_PlotCall_Prefab",
				t,
				!0,
			);
	}
	async CloseAsync() {
		await this.HideAsync(), await this.DestroyAsync();
	}
	async SwitchAsync(t) {}
	async OnCreateAsync() {
		const t = new CustomPromise_1.CustomPromise();
		if (0 === this.wJi.Type) {
			const e = this.wJi,
				i = SpeakerById_1.configSpeakerById.GetConfig(e.WhoId);
			StringUtils_1.StringUtils.IsEmpty(i?.HeadIconAsset)
				? Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn("Plot", 27, "对话人不存在或头像未配置", [
						"id",
						e.WhoId,
					])
				: ((this.he = PublicUtil_1.PublicUtil.GetConfigIdByTable(0, i.Id)),
					ResourceSystem_1.ResourceSystem.LoadAsync(
						i.HeadIconAsset,
						UE.Texture,
						(s) => {
							ObjectUtils_1.ObjectUtils.IsValid(s) ||
								(Log_1.Log.CheckWarn() &&
									Log_1.Log.Warn(
										"Plot",
										27,
										"对话人头像资源为空",
										["id", e.WhoId],
										["path", i.HeadIconAsset],
									)),
								(this.wk = s),
								t.SetResult();
						},
					),
					await t.Promise);
		} else if (5 === this.wJi.Type) {
			const e = this.wJi,
				i = MonsterDisplayById_1.configMonsterDisplayById.GetConfig(
					e.MonsterDisplayId,
				);
			StringUtils_1.StringUtils.IsEmpty(i?.MonsterPileIconAsset)
				? ((this.FJi = PublicUtil_1.PublicUtil.GetConfigIdByTable(3, i.Id)),
					(this.he = PublicUtil_1.PublicUtil.GetConfigIdByTable(2, i.Id)),
					ResourceSystem_1.ResourceSystem.LoadAsync(
						i.MonsterPileIconAsset,
						UE.Texture,
						(s) => {
							ObjectUtils_1.ObjectUtils.IsValid(s) ||
								(Log_1.Log.CheckWarn() &&
									Log_1.Log.Warn(
										"Plot",
										19,
										"怪物半身像资源为空",
										["id", e.MonsterDisplayId],
										["path", i.MonsterPileIconAsset],
									)),
								(this.wk = s),
								t.SetResult();
						},
					),
					await t.Promise)
				: Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn("Plot", 27, "怪物显示不存在或未配置", [
						"id",
						[e.MonsterDisplayId],
					]);
		} else {
			var e, i;
			1 === this.wJi.Type &&
				((e = this.wJi),
				(i = SpeakerById_1.configSpeakerById.GetConfig(e.WhoId))
					? (this.he = PublicUtil_1.PublicUtil.GetConfigIdByTable(0, i.Id))
					: Log_1.Log.CheckWarn() &&
						Log_1.Log.Warn("Plot", 27, "对话人不存在", ["id", e.WhoId]));
		}
	}
	OnStart() {
		this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
	}
	OnBeforeShow() {
		switch (
			(this.$Ji(),
			(this.Xje = PlotController_1.PlotController.AddTick(this.OnTick)),
			this.wJi.Type)
		) {
			case 0:
				this.YJi();
				break;
			case 1:
				this.JJi();
				break;
			case 2:
				this.zJi();
				break;
			case 3:
				this.ZJi();
				break;
			case 5:
				this.ezi();
		}
	}
	async OnShowAsyncImplementImplement() {
		this.OJi = !0;
		var t = new CustomPromise_1.CustomPromise(),
			e =
				(0 !== this.kJi.PlayingIds.length &&
					AudioController_1.AudioController.StopEvent(this.kJi, !0),
				AudioController_1.AudioController.SetSwitch(
					"phone_call",
					this.VJi.get(this.wJi.Type),
					this.RootActor,
				),
				AudioController_1.AudioController.PostEventByUi(
					ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig
						.CallShowAudioEvent,
					this.kJi,
				),
				this.HJi.get(this.wJi.Type));
		e && (await this.EPe.PlaySequenceAsync(e, t));
	}
	async OnHideAsyncImplementImplement() {
		AudioController_1.AudioController.PostEventByUi(
			ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig.CallHideAudioEvent,
			this.kJi,
		);
		var t = new CustomPromise_1.CustomPromise();
		await this.EPe.PlaySequenceAsync("Close", t), (this.OJi = !1);
	}
	OnAfterHide() {
		PlotController_1.PlotController.RemoveTick(this.Xje);
	}
	OnBeforeDestroy() {
		this.EPe.Clear(),
			(this.EPe = void 0),
			(this.wk = void 0),
			(this.he = void 0),
			(this.FJi = void 0),
			(this.zzt = 0),
			(this.Xje = 0);
	}
	YJi() {
		this.GetItem(10).SetUIActive(!0),
			this.GetItem(3).SetUIActive(!0),
			this.GetItem(4).SetUIActive(!0),
			this.GetItem(2).SetUIActive(!0),
			this.GetText(0).ShowTextNew(this.he ?? StringUtils_1.EMPTY_STRING);
		var t = this.GetTexture(1),
			e = this.GetUiNiagara(8);
		t.SetTexture(this.wk),
			e.SetNiagaraEmitterCustomTexture("head_portrait_01", "Mask", this.wk),
			e.SetNiagaraEmitterCustomTexture("head_portrait_02", "Mask", this.wk),
			e.SetNiagaraEmitterCustomTexture("head_portrait_03", "Mask", this.wk),
			e.SetNiagaraVarFloat("Size X", t.Width),
			e.SetNiagaraVarFloat("Size Y", t.Height);
	}
	JJi() {
		this.GetItem(10).SetUIActive(!0),
			this.GetItem(3).SetUIActive(!0),
			this.GetItem(5).SetUIActive(!0),
			this.GetText(0).ShowTextNew(this.he ?? StringUtils_1.EMPTY_STRING);
	}
	zJi() {
		this.GetItem(10).SetUIActive(!0),
			this.GetItem(6).SetUIActive(!0),
			this.GetItem(2).SetUIActive(!0);
	}
	ZJi() {
		this.GetItem(10).SetUIActive(!0),
			this.GetItem(7).SetUIActive(!0),
			this.GetItem(2).SetUIActive(!0);
	}
	ezi() {
		this.GetItem(9).SetUIActive(!0), this.GetTexture(11).SetTexture(this.wk);
		var t = this.GetUiNiagara(12);
		t.SetNiagaraEmitterCustomTexture("Frame001", "BaseTexture", this.wk),
			t.SetNiagaraEmitterCustomTexture(
				"Frame001",
				"BackgroundTexture",
				this.wk,
			),
			this.GetText(13).ShowTextNew(this.he ?? StringUtils_1.EMPTY_STRING),
			this.GetText(14).ShowTextNew(this.FJi ?? StringUtils_1.EMPTY_STRING);
	}
	$Ji() {
		this.GetItem(2).SetUIActive(!1),
			this.GetItem(4).SetUIActive(!1),
			this.GetItem(5).SetUIActive(!1),
			this.GetItem(3).SetUIActive(!1),
			this.GetItem(6).SetUIActive(!1),
			this.GetItem(7).SetUIActive(!1),
			this.GetItem(9).SetUIActive(!1),
			this.GetItem(10).SetUIActive(!1);
	}
	WJi() {
		var t = Global_1.Global.BaseCharacter.K2_GetActorLocation(),
			e = (0, puerts_1.$ref)(void 0),
			i =
				((e =
					(UE.GameplayStatics.ProjectWorldToScreen(
						Global_1.Global.CharacterController,
						t,
						e,
						!0,
					),
					(0, puerts_1.$unref)(e))),
				UiLayer_1.UiLayer.UiRootItem.GetCanvasScaler());
		(i =
			((this.BJi = i.ConvertPositionFromViewportToLGUICanvas(e)),
			(this.BJi.Y = UiLayer_1.UiLayer.UiRootItem.Height / 2),
			ModelManager_1.ModelManager.CameraModel.CameraLocation)) &&
			((e =
				Math.pow(i.X - t.X, 2) +
				Math.pow(i.Y - t.Y, 2) +
				Math.pow(i.Z - t.Z, 2)),
			(e = Math.sqrt(e)) < 100
				? (this.BJi.X -= 4 * (100 - e))
				: e > 350 &&
					((this.BJi.X += 0.3 * (e - 350)),
					(i = MathUtils_1.MathUtils.Clamp(1 - 0.002 * (e - 350), 0.5, 1)),
					this.bJi ? this.bJi.Set(i, i, i) : (this.bJi = new UE.Vector(i))));
	}
	KJi(t) {
		var e = this.RootItem.GetAnchorOffset(),
			i =
				((t = MathUtils_1.MathUtils.Clamp(0.01 * t, 0, 1)),
				MathUtils_1.MathUtils.Lerp(e.X, this.BJi.X, t));
		e = MathUtils_1.MathUtils.Lerp(e.Y, this.BJi.Y, t);
		this.RootItem.SetAnchorOffsetX(i), this.RootItem.SetAnchorOffsetY(e);
	}
	QJi() {
		this.bJi && this.RootItem.SetUIItemScale(this.bJi);
	}
	XJi() {}
	jJi() {
		return (
			this.OJi && this.GetActive() && void 0 !== Global_1.Global.BaseCharacter
		);
	}
}
exports.PlotPortraitItem = PlotPortraitItem;
