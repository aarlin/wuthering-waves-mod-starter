"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiCameraSequenceComponent = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
	ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
	CameraController_1 = require("../../../Camera/CameraController"),
	GlobalData_1 = require("../../../GlobalData"),
	UiLayerType_1 = require("../../../Ui/Define/UiLayerType"),
	UiLayer_1 = require("../../../Ui/UiLayer"),
	BlackScreenView_1 = require("../../UiCameraAnimation/View/BlackScreenView"),
	UiCameraComponent_1 = require("./UiCameraComponent"),
	BLACK_TEXTURE_TAG = new UE.FName("BlackTexture"),
	UI_CAMERA = new UE.FName("UiCamera"),
	FIGHT_CAMERA = new UE.FName("FightCamera");
class UiCameraSequenceComponent extends UiCameraComponent_1.UiCameraComponent {
	constructor() {
		super(...arguments),
			(this.Bkt = void 0),
			(this.BRo = void 0),
			(this.bRo = void 0),
			(this.qRo = []),
			(this.GRo = !1),
			(this.NRo = void 0),
			(this.ORo = void 0),
			(this.FBi = 0),
			(this.kRo = void 0),
			(this.FRo = () => {
				this.VRo(this.Bkt), this.kRo.SetResult();
			}),
			(this.HRo = () => {
				this.VRo(this.Bkt), this.kRo.SetResult();
			}),
			(this.jRo = () => {
				this.WRo();
			}),
			(this.KRo = () => {
				this.GRo && this.DestroyBlackScreenView();
			});
	}
	OnDestroy() {
		this.DestroyUiCameraSequence();
	}
	PlayUiCameraSequence(e, t = 1, i = !1, s = !0, a) {
		(this.Bkt = this.QRo(e)),
			this.Bkt &&
				((this.Bkt.bOverrideInstanceData = !1),
				(this.BRo = this.Bkt.DefaultInstanceData),
				this.Bkt.SetTickableWhenPaused(!0),
				this.SetTransformOriginActor(a),
				(this.GRo = s),
				(e = this.Bkt.SequencePlayer).SetPlayRate(t),
				e.OnFinished.Add(this.jRo),
				e.OnStop.Add(this.KRo),
				e.OnPlay.Add(this.FRo),
				e.OnPlayReverse.Add(this.HRo),
				i ? e.PlayReverse() : e.Play());
	}
	async LoadAndPlayUiCameraSequence(e, t, i, s) {
		if (UE.KismetSystemLibrary.IsValidSoftObjectReference(e))
			return (
				this.XRo(!0, 1),
				(this.kRo = new CustomPromise_1.CustomPromise()),
				(this.FBi = ResourceSystem_1.ResourceSystem.LoadAsync(
					e.ToAssetPathName(),
					UE.LevelSequence,
					(e) => {
						this.PlayUiCameraSequence(e, t, i, !0, s);
					},
				)),
				this.kRo.Promise
			);
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
	DestroyUiCameraSequence(e = !0, t = 0) {
		this.XRo(e, t), this.$Ro();
	}
	WRo() {
		for (const e of this.qRo) e();
		this.DestroyUiCameraSequence(this.GRo);
	}
	XRo(e = !0, t = 0) {
		var i;
		this.Bkt &&
			((i = this.Bkt.SequencePlayer),
			0 !== t && (i.PlaybackSettings.bRestoreState = 2 === t),
			i.Stop()),
			e && this.DestroyBlackScreenView(),
			0 !== this.FBi &&
				(ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.FBi),
				(this.FBi = 0));
	}
	$Ro() {
		this.Bkt?.SetShouldLatentDestroy(!0),
			(this.Bkt = void 0),
			(this.qRo.length = 0),
			(this.NRo = void 0),
			(this.ORo = void 0);
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
		return (
			(t =
				(UE.LevelSequencePlayer.CreateLevelSequencePlayer(
					GlobalData_1.GlobalData.World,
					e,
					new UE.MovieSceneSequencePlaybackSettings(),
					t,
				),
				(0, puerts_1.$unref)(t))).SetSequence(e),
			t
		);
	}
	VRo(e) {
		e.ResetBindings();
		var t = e.GetSequence();
		t.HasBindingTag(BLACK_TEXTURE_TAG, !0) &&
			this.YRo().then(
				(t) => {
					(t = t.GetBlackScreenTextureActor()),
						e.AddBindingByTag(BLACK_TEXTURE_TAG, t);
				},
				() => {},
			),
			t.HasBindingTag(UI_CAMERA, !0) &&
				e.AddBindingByTag(UI_CAMERA, this.CameraActor),
			t.HasBindingTag(FIGHT_CAMERA, !0) &&
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
exports.UiCameraSequenceComponent = UiCameraSequenceComponent;
