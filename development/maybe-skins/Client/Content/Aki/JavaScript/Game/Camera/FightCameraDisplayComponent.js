"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (e, t, r, n) {
		var o,
			a = arguments.length,
			i =
				a < 3
					? t
					: null === n
						? (n = Object.getOwnPropertyDescriptor(t, r))
						: n;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			i = Reflect.decorate(e, t, r, n);
		else
			for (var s = e.length - 1; 0 <= s; s--)
				(o = e[s]) && (i = (a < 3 ? o(i) : 3 < a ? o(t, r, i) : o(t, r)) || i);
		return 3 < a && i && Object.defineProperty(t, r, i), i;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FightCameraDisplayComponent = void 0);
const ActorSystem_1 = require("../../Core/Actor/ActorSystem"),
	EntityComponent_1 = require("../../Core/Entity/EntityComponent"),
	RegisterComponent_1 = require("../../Core/Entity/RegisterComponent"),
	EventDefine_1 = require("../Common/Event/EventDefine"),
	EventSystem_1 = require("../Common/Event/EventSystem"),
	ModelManager_1 = require("../Manager/ModelManager"),
	CameraController_1 = require("./CameraController");
let FightCameraDisplayComponent = class extends EntityComponent_1.EntityComponent {
	constructor() {
		super(...arguments),
			(this.bPr = void 0),
			(this.nye = () => {
				ModelManager_1.ModelManager.SeamlessTravelModel.IsSeamlessTravel
					? CameraController_1.CameraController.ReturnLockOnCameraMode(0)
					: ((this.bPr =
							CameraController_1.CameraController.SpawnCameraActor()),
						0 === CameraController_1.CameraController.Model.CameraMode &&
							CameraController_1.CameraController.SetViewTarget(
								this.bPr,
								"FightCamera.OnWorldDone",
							));
			}),
			(this.uMe = () => {
				ModelManager_1.ModelManager.SeamlessTravelModel.IsSeamlessTravel
					? CameraController_1.CameraController.ReturnLockOnCameraMode(0)
					: this.bPr &&
						(ActorSystem_1.ActorSystem.Put(this.bPr), (this.bPr = void 0));
			});
	}
	get CameraActor() {
		return this.bPr;
	}
	OnInit() {
		return (
			(this.bPr = CameraController_1.CameraController.SpawnCameraActor()),
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
			this.bPr &&
				(ActorSystem_1.ActorSystem.Put(this.bPr), (this.bPr = void 0)),
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
		this.bPr?.IsValid() && (this.bPr.CustomTimeDilation = e);
	}
};
(FightCameraDisplayComponent = __decorate(
	[(0, RegisterComponent_1.RegisterComponent)(4)],
	FightCameraDisplayComponent,
)),
	(exports.FightCameraDisplayComponent = FightCameraDisplayComponent);
