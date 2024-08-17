"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiCameraSequence = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	CameraController_1 = require("../../Camera/CameraController"),
	GlobalData_1 = require("../../GlobalData"),
	UiLayerType_1 = require("../../Ui/Define/UiLayerType"),
	UiLayer_1 = require("../../Ui/UiLayer"),
	BlackScreenView_1 = require("./View/BlackScreenView"),
	BLACK_TEXTURE_TAG = new UE.FName("BlackTexture"),
	UI_CAMERA = new UE.FName("UiCamera"),
	FIGHT_CAMERA = new UE.FName("FightCamera");
class UiCameraSequence {
	constructor() {
		(this.Bkt = void 0),
			(this.BRo = void 0),
			(this.bRo = void 0),
			(this.qRo = []),
			(this.GRo = !1),
			(this.NRo = void 0),
			(this.ORo = void 0),
			(this.jRo = () => {
				this.WRo();
			});
	}
	InitializeUiCameraSequence(e) {
		(this.Bkt = this.QRo(e)),
			(this.Bkt.bOverrideInstanceData = !1),
			(this.BRo = this.Bkt.DefaultInstanceData),
			this.VRo(this.Bkt);
	}
	PlayUiCameraSequence(e = 1, t = !1, i = !0) {
		this.Bkt &&
			((this.GRo = i),
			(i = this.Bkt.SequencePlayer).SetPlayRate(e),
			i.OnFinished.Add(this.jRo),
			t ? i.PlayReverse() : i.Play());
	}
	Pause() {
		var e;
		this.Bkt?.IsValid() &&
			(e = this.Bkt.SequencePlayer)?.IsValid() &&
			e.Pause();
	}
	Continue() {
		var e;
		this.Bkt?.IsValid() &&
			(e = this.Bkt.SequencePlayer)?.IsValid() &&
			e.IsPaused() &&
			e.Play();
	}
	DestroyUiCameraSequence(e = !0) {
		this.XRo(),
			this.$Ro(),
			e && this.DestroyBlackScreenView(),
			(this.qRo.length = 0),
			(this.NRo = void 0),
			(this.ORo = void 0);
	}
	WRo() {
		for (const e of this.qRo) e(this);
		this.DestroyUiCameraSequence(this.GRo);
	}
	XRo() {
		this.Bkt && this.Bkt.SequencePlayer.Stop();
	}
	$Ro() {
		this.Bkt && (this.Bkt.SetShouldLatentDestroy(!0), (this.Bkt = void 0));
	}
	ExecuteUiCameraSequenceEvent(e) {
		this.NRo && this.ORo === e && this.NRo();
	}
	SetTransformOrigin(e) {
		this.BRo &&
			((this.Bkt.bOverrideInstanceData = !0), (this.BRo.TransformOrigin = e));
	}
	SetTransformOriginActor(e) {
		this.BRo &&
			((this.Bkt.bOverrideInstanceData = !0),
			(this.BRo.TransformOriginActor = e));
	}
	AddUiCameraSequenceEvent(e, t) {
		(this.ORo = e), (this.NRo = t);
	}
	AddUiCameraSequenceFinishedCallback(e) {
		e && this.qRo.push(e);
	}
	QRo(e) {
		var t = (0, puerts_1.$ref)(void 0);
		return (e =
			(UE.LevelSequencePlayer.CreateLevelSequencePlayer(
				GlobalData_1.GlobalData.World,
				e,
				new UE.MovieSceneSequencePlaybackSettings(),
				t,
			),
			(0, puerts_1.$unref)(t)));
	}
	VRo(e) {
		e.ResetBindings();
		var t,
			i = e.GetSequence();
		i.HasBindingTag(BLACK_TEXTURE_TAG, !0) &&
			this.YRo().then(
				(t) => {
					(t = t.GetBlackScreenTextureActor()),
						e.AddBindingByTag(BLACK_TEXTURE_TAG, t);
				},
				() => {},
			),
			i.HasBindingTag(UI_CAMERA, !0) &&
				((t =
					CameraController_1.CameraController.WidgetCamera.GetComponent(
						12,
					).CineCamera),
				e.AddBindingByTag(UI_CAMERA, t)),
			i.HasBindingTag(FIGHT_CAMERA, !0) &&
				((t =
					CameraController_1.CameraController.FightCamera.GetComponent(
						4,
					).CameraActor),
				e.AddBindingByTag(FIGHT_CAMERA, t));
	}
	async YRo() {
		var e;
		return (
			this.bRo ||
				((e = UiLayer_1.UiLayer.GetLayerRootUiItem(
					UiLayerType_1.ELayerType.Pop,
				)),
				(this.bRo = new BlackScreenView_1.BlackScreenView()),
				await this.bRo.CreateThenShowByResourceIdAsync(
					"UiView_BlackScreen_Prefab",
					e,
				)),
			this.bRo
		);
	}
	DestroyBlackScreenView() {
		this.bRo && (this.bRo.Destroy(), (this.bRo = void 0));
	}
}
exports.UiCameraSequence = UiCameraSequence;
