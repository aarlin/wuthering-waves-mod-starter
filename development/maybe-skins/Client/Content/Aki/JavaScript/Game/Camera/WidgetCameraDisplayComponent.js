"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (e, t, r, n) {
		var o,
			i = arguments.length,
			a =
				i < 3
					? t
					: null === n
						? (n = Object.getOwnPropertyDescriptor(t, r))
						: n;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			a = Reflect.decorate(e, t, r, n);
		else
			for (var s = e.length - 1; 0 <= s; s--)
				(o = e[s]) && (a = (i < 3 ? o(a) : 3 < i ? o(t, r, a) : o(t, r)) || a);
		return 3 < i && a && Object.defineProperty(t, r, a), a;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.WidgetCameraDisplayComponent = void 0);
const ActorSystem_1 = require("../../Core/Actor/ActorSystem"),
	EntityComponent_1 = require("../../Core/Entity/EntityComponent"),
	EventDefine_1 = require("../Common/Event/EventDefine"),
	EventSystem_1 = require("../Common/Event/EventSystem"),
	CameraController_1 = require("./CameraController"),
	RegisterComponent_1 = require("../../Core/Entity/RegisterComponent");
let WidgetCameraDisplayComponent = class extends EntityComponent_1.EntityComponent {
	constructor() {
		super(...arguments),
			(this.Vxr = void 0),
			(this.nye = () => {
				(this.Vxr = CameraController_1.CameraController.SpawnCineCamera()),
					2 === CameraController_1.CameraController.Model.CameraMode &&
						CameraController_1.CameraController.SetViewTarget(
							this.Vxr,
							"WidgetCamera.OnWorldDone",
						);
			}),
			(this.uMe = () => {
				this.Vxr &&
					(ActorSystem_1.ActorSystem.Put(this.Vxr), (this.Vxr = void 0));
			});
	}
	get CineCamera() {
		return this.Vxr;
	}
	OnInit() {
		return (
			(this.Vxr = CameraController_1.CameraController.SpawnCineCamera()),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.WorldDone,
				this.nye,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.ClearWorld,
				this.uMe,
			),
			!!this.Vxr
		);
	}
	OnClear() {
		return (
			this.Vxr &&
				(ActorSystem_1.ActorSystem.Put(this.Vxr), (this.Vxr = void 0)),
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
(WidgetCameraDisplayComponent = __decorate(
	[(0, RegisterComponent_1.RegisterComponent)(12)],
	WidgetCameraDisplayComponent,
)),
	(exports.WidgetCameraDisplayComponent = WidgetCameraDisplayComponent);
