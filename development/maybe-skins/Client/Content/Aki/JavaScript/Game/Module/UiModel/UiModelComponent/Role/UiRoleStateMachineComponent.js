"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (e, t, n, o) {
		var i,
			r = arguments.length,
			s =
				r < 3
					? t
					: null === o
						? (o = Object.getOwnPropertyDescriptor(t, n))
						: o;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			s = Reflect.decorate(e, t, n, o);
		else
			for (var a = e.length - 1; 0 <= a; a--)
				(i = e[a]) && (s = (r < 3 ? i(s) : 3 < r ? i(t, n, s) : i(t, n)) || s);
		return 3 < r && s && Object.defineProperty(t, n, s), s;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiRoleStateMachineComponent = void 0);
const EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine"),
	UiModelComponentBase_1 = require("../UiModelComponentBase");
let UiRoleStateMachineComponent = class extends UiModelComponentBase_1.UiModelComponentBase {
	constructor() {
		super(...arguments),
			(this.Qwr = void 0),
			(this.nXt = void 0),
			(this.Fmo = 0),
			(this.HBr = !1),
			(this.jBr = !1),
			(this.WBr = !1),
			(this.OnRoleMeshLoadComplete = () => {
				this.KBr(), this.m8();
			});
	}
	OnInit() {
		(this.Qwr = this.Owner.CheckGetComponent(0)),
			(this.nXt = this.Owner.CheckGetComponent(1));
	}
	OnStart() {
		EventSystem_1.EventSystem.AddWithTarget(
			this.Owner,
			EventDefine_1.EEventName.OnUiModelLoadComplete,
			this.OnRoleMeshLoadComplete,
		);
	}
	OnEnd() {
		EventSystem_1.EventSystem.RemoveWithTarget(
			this.Owner,
			EventDefine_1.EEventName.OnUiModelLoadComplete,
			this.OnRoleMeshLoadComplete,
		);
	}
	SetState(e, t = !1, n = !1, o = !1) {
		(this.Fmo = e), (this.HBr = t), (this.WBr = n), (this.jBr = o), this.m8();
	}
	m8() {
		var e;
		2 === this.Qwr.GetModelLoadState() &&
			((e = this.nXt.MainMeshComponent),
			this.nXt
				.GetAnimInstanceFromSkeletalMesh(e)
				?.SetState(this.Fmo, this.HBr, this.WBr, this.jBr));
	}
	KBr() {
		var e = this.nXt.MainMeshComponent,
			t =
				((e = this.nXt.GetAnimInstanceFromSkeletalMesh(e)),
				ConfigManager_1.ConfigManager.RoleConfig.GetRolePerformanceDelayTime());
		e?.SetPerformDelay(t);
	}
};
(UiRoleStateMachineComponent = __decorate(
	[(0, UiModelComponentDefine_1.RegisterUiModelComponent)(13)],
	UiRoleStateMachineComponent,
)),
	(exports.UiRoleStateMachineComponent = UiRoleStateMachineComponent);
