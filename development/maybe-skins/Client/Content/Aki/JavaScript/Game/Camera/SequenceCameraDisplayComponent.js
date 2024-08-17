"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (e, t, r, n) {
		var o,
			a = arguments.length,
			C =
				a < 3
					? t
					: null === n
						? (n = Object.getOwnPropertyDescriptor(t, r))
						: n;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			C = Reflect.decorate(e, t, r, n);
		else
			for (var m = e.length - 1; 0 <= m; m--)
				(o = e[m]) && (C = (a < 3 ? o(C) : 3 < a ? o(t, r, C) : o(t, r)) || C);
		return 3 < a && C && Object.defineProperty(t, r, C), C;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SequenceCameraDisplayComponent = void 0);
const ActorSystem_1 = require("../../Core/Actor/ActorSystem"),
	Log_1 = require("../../Core/Common/Log"),
	EntityComponent_1 = require("../../Core/Entity/EntityComponent"),
	EventDefine_1 = require("../Common/Event/EventDefine"),
	EventSystem_1 = require("../Common/Event/EventSystem"),
	CameraController_1 = require("./CameraController"),
	RegisterComponent_1 = require("../../Core/Entity/RegisterComponent");
let SequenceCameraDisplayComponent = class extends EntityComponent_1.EntityComponent {
	constructor() {
		super(...arguments),
			(this.Vxr = void 0),
			(this.nye = () => {
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("Camera", 58, "[SequenceCamera] Spawn OnWorldDone"),
					(this.Vxr = CameraController_1.CameraController.SpawnCineCamera()),
					1 === CameraController_1.CameraController.Model.CameraMode &&
						CameraController_1.CameraController.SetViewTarget(
							this.Vxr,
							"SequenceCamera.OnWorldDone",
						);
			}),
			(this.uMe = () => {
				this.Vxr &&
					(Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug(
							"Camera",
							58,
							"[SequenceCamera] Clear OnClearWorld",
						),
					ActorSystem_1.ActorSystem.Put(this.Vxr),
					(this.Vxr = void 0));
			});
	}
	get CineCamera() {
		return (
			this.Vxr?.IsValid() ||
				((this.Vxr = CameraController_1.CameraController.SpawnCineCamera()),
				Log_1.Log.CheckError() &&
					Log_1.Log.Error("Camera", 58, "[SequenceCamera] 保底生成CineCamera")),
			this.Vxr
		);
	}
	OnInit() {
		return (
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("Camera", 58, "[SequenceCamera] Spawn OnInit"),
			(this.Vxr = CameraController_1.CameraController.SpawnCineCamera()),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.WorldDone,
				this.nye,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.ClearWorld,
				this.uMe,
			),
			!0
		);
	}
	OnClear() {
		return (
			this.Vxr &&
				(Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("Camera", 58, "[SequenceCamera] Clear OnClear"),
				ActorSystem_1.ActorSystem.Put(this.Vxr),
				(this.Vxr = void 0)),
			EventSystem_1.EventSystem.Has(
				EventDefine_1.EEventName.WorldDone,
				this.nye,
			) &&
				EventSystem_1.EventSystem.Remove(
					EventDefine_1.EEventName.WorldDone,
					this.nye,
				),
			EventSystem_1.EventSystem.Has(
				EventDefine_1.EEventName.ClearWorld,
				this.uMe,
			) &&
				EventSystem_1.EventSystem.Remove(
					EventDefine_1.EEventName.ClearWorld,
					this.uMe,
				),
			!0
		);
	}
	OnChangeTimeDilation(e) {
		this.Vxr?.IsValid() && (this.Vxr.CustomTimeDilation = e);
	}
};
(SequenceCameraDisplayComponent = __decorate(
	[(0, RegisterComponent_1.RegisterComponent)(9)],
	SequenceCameraDisplayComponent,
)),
	(exports.SequenceCameraDisplayComponent = SequenceCameraDisplayComponent);
