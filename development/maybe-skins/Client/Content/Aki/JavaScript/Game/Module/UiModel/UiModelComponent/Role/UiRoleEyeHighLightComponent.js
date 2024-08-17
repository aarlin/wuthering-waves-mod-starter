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
	(exports.UiRoleEyeHighLightComponent = void 0);
const UE = require("ue"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine"),
	UiModelComponentBase_1 = require("../UiModelComponentBase");
let UiRoleEyeHighLightComponent = class extends UiModelComponentBase_1.UiModelComponentBase {
	constructor() {
		super(...arguments),
			(this.nXt = void 0),
			(this.OnRoleMeshLoadComplete = () => {
				this.DisableEyeHighLight();
			});
	}
	OnInit() {
		this.nXt = this.Owner.CheckGetComponent(1);
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
	DisableEyeHighLight() {
		var e = [new UE.FName("MI_Eyes"), new UE.FName("MI_Eye")],
			t = new UE.FName("LightDisableSwitch"),
			n = this.nXt.MainMeshComponent;
		this.qBr(n, e, t);
	}
	qBr(e, t, n) {
		for (const r of t) {
			var o,
				i = e.GetMaterialIndex(r);
			i < 0 ||
				((o = e.GetMaterial(i)),
				e.CreateDynamicMaterialInstance(i, o)?.SetScalarParameterValue(n, 0));
		}
	}
};
(UiRoleEyeHighLightComponent = __decorate(
	[(0, UiModelComponentDefine_1.RegisterUiModelComponent)(16)],
	UiRoleEyeHighLightComponent,
)),
	(exports.UiRoleEyeHighLightComponent = UiRoleEyeHighLightComponent);
