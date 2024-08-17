"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (e, t, n, o) {
		var i,
			s = arguments.length,
			r =
				s < 3
					? t
					: null === o
						? (o = Object.getOwnPropertyDescriptor(t, n))
						: o;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			r = Reflect.decorate(e, t, n, o);
		else
			for (var d = e.length - 1; 0 <= d; d--)
				(i = e[d]) && (r = (s < 3 ? i(r) : 3 < s ? i(t, n, r) : i(t, n)) || r);
		return 3 < s && r && Object.defineProperty(t, n, r), r;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiModelTagComponent = void 0);
const EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	UiTagComponent_1 = require("../../../UiComponent/UiTagComponent"),
	UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine"),
	UiModelComponentBase_1 = require("../UiModelComponentBase");
let UiModelTagComponent = class extends UiModelComponentBase_1.UiModelComponentBase {
	constructor() {
		super(...arguments),
			(this.Xte = new UiTagComponent_1.UiTagComponent()),
			(this.SBr = void 0),
			(this.OnAnsBegin = (e) => {
				this.AddTagById(e.TagId);
			}),
			(this.OnAnsEnd = (e) => {
				this.ReduceTagById(e.TagId);
			}),
			(this.xBr = (e, t) => {
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.ShowRoleElementChangePreviewEffect,
					t,
				);
			}),
			(this.wBr = (e, t) => {
				var n = this.Owner.CheckGetComponent(17);
				t ? n?.PlayLightSequence() : n?.StopLightSequence();
			});
	}
	OnInit() {
		this.SBr = this.Owner.CheckGetComponent(6);
	}
	OnStart() {
		this.SBr?.RegisterAnsTrigger(
			"UiTagAnsContext",
			this.OnAnsBegin,
			this.OnAnsEnd,
		),
			this.Xte.AddListener(348713373, this.xBr),
			this.Xte.AddListener(-1371920538, this.wBr);
	}
	OnEnd() {
		this.Xte.RemoveListener(348713373, this.xBr),
			this.Xte.RemoveListener(-1371920538, this.wBr);
	}
	OnClear() {
		this.Xte.RemoveAllTag();
	}
	AddTagById(e, ...t) {
		this.Xte.AddTagById(e, ...t);
	}
	ReduceTagById(e, ...t) {
		this.Xte.ReduceTagById(e, ...t);
	}
	ContainsTagById(e) {
		return this.Xte.ContainsTagById(e);
	}
};
(UiModelTagComponent = __decorate(
	[(0, UiModelComponentDefine_1.RegisterUiModelComponent)(7)],
	UiModelTagComponent,
)),
	(exports.UiModelTagComponent = UiModelTagComponent);
