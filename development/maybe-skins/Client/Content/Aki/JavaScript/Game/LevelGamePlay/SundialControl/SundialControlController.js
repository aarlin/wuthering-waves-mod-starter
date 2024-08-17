"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SundialControlController = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	ActorSystem_1 = require("../../../Core/Actor/ActorSystem"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	Net_1 = require("../../../Core/Net/Net"),
	ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
	TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
	Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
	Vector_1 = require("../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	GlobalData_1 = require("../../GlobalData"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	SceneInteractionLevel_1 = require("../../Render/Scene/Item/SceneInteractionLevel"),
	UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
	UiManager_1 = require("../../Ui/UiManager"),
	SEQ_PATH =
		"/Game/Aki/Scene/InteractionLevel/Animation/Sundial/TPrefab_SM_Sundial_Finish.TPrefab_SM_Sundial_Finish",
	leftTag = new UE.FName("Left"),
	rightTag = new UE.FName("Right"),
	rollTag = new UE.FName("Roll"),
	decalTag = new UE.FName("Decal");
class SundialControlController extends UiControllerBase_1.UiControllerBase {
	static GenerateModel(e) {
		var t = GlobalData_1.GlobalData.World;
		let o =
			ModelManager_1.ModelManager.SundialControlModel.ModelConfig.场景交互物.AssetPathName?.toString();
		o.includes(".") && (o = o.split(".")[0]);
		var n = (0, puerts_1.$ref)(!1);
		t = UE.LevelStreamingDynamic.LoadLevelInstance(
			t,
			o,
			Vector_1.Vector.ZeroVector,
			Rotator_1.Rotator.ZeroRotator,
			n,
		);
		(0, puerts_1.$unref)(n) &&
			t &&
			((this.Ixe = new SceneInteractionLevel_1.SceneInteractionLevel()),
			this.Ixe.Init(
				t,
				o,
				Vector_1.Vector.ZeroVector,
				Rotator_1.Rotator.ZeroRotator,
				-1,
				0,
				() => {
					this.Txe(e);
				},
				!0,
			));
	}
	static Txe(e) {
		this.Ixe.MainActor.K2_SetActorLocation(
			ModelManager_1.ModelManager.SundialControlModel.TargetLocation,
			!1,
			void 0,
			!1,
		),
			this.Ixe.MainActor.K2_SetActorRotation(
				ModelManager_1.ModelManager.SundialControlModel.TargetRotation,
				!1,
			),
			ModelManager_1.ModelManager.SundialControlModel.InitRingActors(this.Ixe),
			e(),
			this.Ixe.PlaySceneEffect(3);
	}
	static OnAddEvents() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnSundialRingChangeShine,
			this.Lxe,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnSundialRingSwitch,
				this.Dxe,
			);
	}
	static OnRemoveEvents() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnSundialRingChangeShine,
			this.Lxe,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnSundialRingSwitch,
				this.Dxe,
			);
	}
	static DestroyModel() {
		this.Ixe &&
			(this.Ixe.Destroy(),
			(this.Ixe = void 0),
			ModelManager_1.ModelManager.SundialControlModel.ClearCacheActor());
	}
	static SwitchCurrentRing() {
		this.Rxe ||
			ModelManager_1.ModelManager.SundialControlModel.ChangeCurrentRingIndex();
	}
	static SetOnFinishCallback(e) {
		this.Uxe = e;
	}
	static StartRotate(e) {
		this.Rxe ||
			((this.Rxe = !0),
			(this.Axe = e),
			ModelManager_1.ModelManager.SundialControlModel.SimpleAddCurRingSocket());
	}
	static OnTick(e) {
		this.Rxe &&
			ModelManager_1.ModelManager.SundialControlModel.RotateCurrentRing(e) &&
			((this.Rxe = !1), this.Axe) &&
			(ModelManager_1.ModelManager.SundialControlModel.UpdateTips(),
			this.Axe(),
			(this.Axe = void 0));
	}
	static ResetAll() {
		ModelManager_1.ModelManager.SundialControlModel.ResetAll();
	}
	static PlayFinishAnimation() {
		this.Uxe && this.Uxe(),
			this.Ixe.EndSceneEffect(3),
			this.Ixe.EndSceneEffect(4),
			this.Ixe.PlaySceneEffect(2);
		const e = ActorSystem_1.ActorSystem.Get(
			UE.LevelSequenceActor.StaticClass(),
			MathUtils_1.MathUtils.DefaultTransform,
			void 0,
			!1,
		);
		ResourceSystem_1.ResourceSystem.LoadAsync(
			SEQ_PATH,
			UE.LevelSequence,
			(t) => {
				t?.IsValid()
					? (e.SetActorTickEnabled(!0),
						e.SetSequence(t),
						(t = SundialControlController.Ixe.GetActorByKey("Left")),
						e.AddBindingByTag(leftTag, t),
						(t = SundialControlController.Ixe.GetActorByKey("Right")),
						e.AddBindingByTag(rightTag, t),
						(t = SundialControlController.Ixe.GetActorByKey("Roll")),
						e.AddBindingByTag(rollTag, t),
						(t = SundialControlController.Ixe.GetActorByKey("Decal")),
						e.AddBindingByTag(decalTag, t),
						e.SequencePlayer.SetPlayRate(1),
						e.SequencePlayer.OnFinished.Add(() => {
							TimerSystem_1.TimerSystem.Delay(() => {
								SundialControlController.SDe(),
									ActorSystem_1.ActorSystem.Put(e);
							}, 500);
						}),
						e.SequencePlayer.Play())
					: SundialControlController.SDe();
			},
		);
	}
	static SDe(e = "MainQuest") {
		var t = Protocol_1.Aki.Protocol.UKn.create();
		(t.ykn = e),
			(t.Ikn = Protocol_1.Aki.Protocol.dqs.Proto_SundialPuzzle),
			Net_1.Net.Call(19172, t, (e) => {
				e.uvs === Protocol_1.Aki.Protocol.lkn.Sys &&
					UiManager_1.UiManager.CloseView("SundialControlView");
			});
	}
	static UpdateViewTips() {
		ModelManager_1.ModelManager.SundialControlModel.UpdateTips();
	}
	static GetMainActor() {
		return this.Ixe?.MainActor;
	}
}
(exports.SundialControlController = SundialControlController),
	((_a = SundialControlController).Ixe = void 0),
	(SundialControlController.Rxe = !1),
	(SundialControlController.Axe = void 0),
	(SundialControlController.Uxe = void 0),
	(SundialControlController.Lxe = (e, t) => {
		let o;
		switch (e) {
			case 0:
				o = 0;
				break;
			case 1:
				o = 1;
		}
		void 0 !== o && (t ? _a.Ixe.PlaySceneEffect(o) : _a.Ixe.EndSceneEffect(o));
	}),
	(SundialControlController.Dxe = (e) => {
		_a.Ixe.EndSceneEffect(0 === e ? 4 : 3),
			_a.Ixe.PlaySceneEffect(0 === e ? 3 : 4);
	});
