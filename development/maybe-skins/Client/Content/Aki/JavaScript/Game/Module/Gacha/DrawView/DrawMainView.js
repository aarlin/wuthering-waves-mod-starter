"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.DrawMainView = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	ActorSystem_1 = require("../../../../Core/Actor/ActorSystem"),
	CommonDefine_1 = require("../../../../Core/Define/CommonDefine"),
	ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
	TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
	FNameUtil_1 = require("../../../../Core/Utils/FNameUtil"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	ObjectUtils_1 = require("../../../../Core/Utils/ObjectUtils"),
	CameraController_1 = require("../../../Camera/CameraController"),
	Global_1 = require("../../../Global"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiManager_1 = require("../../../Ui/UiManager"),
	LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
	GachaController_1 = require("../GachaController"),
	GachaSceneView_1 = require("../GachaUiSceneManager/GachaSceneView");
class DrawMainView extends GachaSceneView_1.GachaSceneView {
	constructor() {
		super(...arguments),
			(this.D7t = void 0),
			(this.R7t = void 0),
			(this.U7t = ""),
			(this.A7t = void 0),
			(this.P7t = void 0),
			(this.Xe = 0),
			(this.x7t = 0),
			(this.w7t = 0),
			(this.B7t = 0),
			(this.b7t = void 0),
			(this.q7t = 0),
			(this.G7t = void 0),
			(this.N7t = new UE.Vector2D()),
			(this.O7t = 0),
			(this.k7t = !1),
			(this.SlideCurve = void 0),
			(this.F7t = 0),
			(this.V7t = 0),
			(this.H7t = !1),
			(this.j7t = !1),
			(this.W7t = !1),
			(this.K7t = 0),
			(this.Q7t = !1),
			(this.X7t = !1),
			(this.EPe = void 0),
			(this.$7t = () => {
				(this.W7t = !0), this.H7t && this.ShowNextView();
			}),
			(this.OnDragBeginCallBack = (e) => {
				(this.b7t = e.pointerPosition),
					(this.V7t = this.F7t),
					(this.Q7t = !0),
					(this.K7t = 0),
					this.EPe.PlayLevelSequenceByName("DrawTipsHide"),
					(this.X7t = !1);
			}),
			(this.OnDragCallBack = (e) => {
				if (
					((this.N7t.X = e.pointerPosition.X),
					(this.N7t.Y = e.pointerPosition.Y),
					(e = (e.pointerPosition.X - this.b7t.X) / this.O7t),
					(this.Xe = this.SlideCurve.GetFloatValue(e + this.V7t)),
					(this.F7t = MathUtils_1.MathUtils.Clamp(e + this.V7t, 0, 1)),
					this.Xe > this.x7t)
				) {
					if (this.k7t) return;
					(this.k7t = !0), this.PlayShowSequence();
				}
				(e = MathUtils_1.MathUtils.Clamp(
					(this.Xe - this.B7t) / (this.q7t - this.B7t),
					0,
					1,
				)),
					this.P7t?.TSUpdateParameters(this.Xe, e, this.N7t);
			}),
			(this.OnDragEndCallBack = (e) => {
				this.Q7t = !1;
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIDraggableComponent],
			[1, UE.UIButtonComponent],
		]),
			(this.BtnBindInfo = [[1, this.$7t]]);
	}
	OnAfterOpenUiScene() {
		this.A7t = CameraController_1.CameraController.Model.CurrentCameraActor;
		var e = ModelManager_1.ModelManager.GachaModel.CurGachaResult.length;
		let t = 1;
		ModelManager_1.ModelManager.GachaModel.CurGachaResult.forEach((e, i) => {
			(e =
				ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
					e.u5n.G3n,
				)?.QualityId ?? 0) > t && (t = e);
		});
		e =
			ConfigManager_1.ConfigManager.GachaConfig.GetGachaEffectConfigByTimesAndQuality(
				e,
				t,
			);
		var i = (0, puerts_1.$ref)(0),
			a = (0, puerts_1.$ref)(0);
		Global_1.Global.CharacterController.GetViewportSize(i, a),
			(this.P7t = UE.KuroCollectActorComponent.GetActorWithTag(
				FNameUtil_1.FNameUtil.GetDynamicFName("GachaBP"),
				0,
			)),
			(i = (0, puerts_1.$unref)(i)),
			(a = (0, puerts_1.$unref)(a));
		CameraController_1.CameraController.SetViewTarget(
			this.P7t.SceneCameraActor,
			"OnAfterOpenUi",
		),
			(this.P7t["Gacha Result"] = t),
			(this.w7t = e.DefaultProcess),
			(this.Xe = 0),
			(this.B7t = e.ChangeColorProcess),
			(this.q7t = e.CompleteChangeColorProcess),
			(this.x7t = e.PlaySequenceProcess),
			this.P7t.TSInitParameters(
				new UE.Vector2D(i, a),
				i * this.w7t,
				this.G7t,
				t,
			),
			ResourceSystem_1.ResourceSystem.LoadAsync(
				e.SlideCurveAssetPath,
				UE.CurveFloat,
				(e) => {
					(this.SlideCurve = e),
						(e = this.GetDraggable(0)).OnPointerDragCallBack.Bind(
							this.OnDragCallBack,
						),
						e.OnPointerBeginDragCallBack.Bind(this.OnDragBeginCallBack),
						e.OnPointerEndDragCallBack.Bind(this.OnDragEndCallBack);
				},
			),
			GachaController_1.GachaController.PreloadGachaResultResource((e) => {
				(this.H7t = !0), (this.j7t || this.W7t) && this.ShowNextView();
			});
	}
	InitLevelSequence() {
		var e = ModelManager_1.ModelManager.GachaModel.CurGachaResult.length;
		let t = 1;
		ModelManager_1.ModelManager.GachaModel.CurGachaResult.forEach((e, i) => {
			(e =
				ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
					e.u5n.G3n,
				)?.QualityId ?? 0) > t && (t = e);
		}),
			(e =
				ConfigManager_1.ConfigManager.GachaConfig.GetGachaEffectConfigByTimesAndQuality(
					e,
					t,
				)),
			(this.U7t = e.FinalShowSequencePath),
			(this.G7t = new UE.LinearColor(
				e.FinalColor.R,
				e.FinalColor.G,
				e.FinalColor.B,
				e.FinalColor.A,
			)),
			ResourceSystem_1.ResourceSystem.LoadAsync(
				this.U7t,
				UE.LevelSequence,
				(e) => {
					var t;
					ObjectUtils_1.ObjectUtils.IsValid(e) &&
						(((t = new UE.MovieSceneSequencePlaybackSettings()).bRestoreState =
							!0),
						(this.D7t = ActorSystem_1.ActorSystem.Get(
							UE.LevelSequenceActor.StaticClass(),
							MathUtils_1.MathUtils.DefaultTransform,
							void 0,
							!1,
						)),
						(this.D7t.PlaybackSettings = t),
						this.D7t.SetSequence(e),
						this.R7t.OnFinished.Add(() => {
							(this.j7t = !0), this.H7t && this.ShowNextView();
						}));
				},
			);
	}
	OnStart() {
		this.InitLevelSequence(),
			(this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem));
		var e = (0, puerts_1.$ref)(0),
			t = (0, puerts_1.$ref)(0);
		Global_1.Global.CharacterController.GetViewportSize(e, t),
			(this.O7t = (0, puerts_1.$unref)(e));
	}
	OnBeforeDestroy() {
		TimerSystem_1.TimerSystem.Next(() => {
			ActorSystem_1.ActorSystem.Put(this.D7t);
		}),
			(this.D7t = void 0),
			this.EPe.Clear();
	}
	OnTick(e) {
		this.P7t?.SceneCameraActor.IsValid() &&
			ModelManager_1.ModelManager.CameraModel.CurrentCameraActor !==
				this.P7t.SceneCameraActor &&
			!this.k7t &&
			CameraController_1.CameraController.SetViewTarget(
				this.P7t.SceneCameraActor,
				"DrawMainView.OnTick",
			),
			this.Q7t ||
				this.X7t ||
				this.k7t ||
				((this.K7t += e),
				this.K7t >= 2 * CommonDefine_1.MILLIONSECOND_PER_SECOND &&
					(this.EPe.PlayLevelSequenceByName("DrawTipsShow"), (this.X7t = !0)));
	}
	PlayShowSequence() {
		this.P7t.SetActorHiddenInGame(!0),
			this.GetButton(1).RootUIComp?.SetUIActive(!0),
			this.GetDraggable(0)
				.GetOwner()
				.GetComponentByClass(UE.UIItem.StaticClass())
				.SetUIActive(!1),
			this.D7t?.SequencePlayer.Play();
	}
	ShowNextView() {
		this.R7t?.Stop(),
			CameraController_1.CameraController.SetViewTarget(
				this.A7t,
				"ShowNextView",
			),
			this.CloseMe(),
			UiManager_1.UiManager.OpenView("GachaScanView");
	}
}
exports.DrawMainView = DrawMainView;
