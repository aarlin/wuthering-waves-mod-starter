"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (e, t, o, n) {
		var i,
			r = arguments.length,
			d =
				r < 3
					? t
					: null === n
						? (n = Object.getOwnPropertyDescriptor(t, o))
						: n;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			d = Reflect.decorate(e, t, o, n);
		else
			for (var a = e.length - 1; 0 <= a; a--)
				(i = e[a]) && (d = (r < 3 ? i(d) : 3 < r ? i(t, o, d) : i(t, o)) || d);
		return 3 < r && d && Object.defineProperty(t, o, d), d;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiModelLoadingIconComponent = void 0);
const EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	UiLayerType_1 = require("../../../../Ui/Define/UiLayerType"),
	UiLayer_1 = require("../../../../Ui/UiLayer"),
	RoleModelLoadingItem_1 = require("../../../RoleUi/Component/RoleModelLoadingItem"),
	UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine"),
	UiModelComponentBase_1 = require("../UiModelComponentBase");
let UiModelLoadingIconComponent = class extends UiModelComponentBase_1.UiModelComponentBase {
	constructor() {
		super(...arguments),
			(this.LoadingItem = void 0),
			(this.IBr = () => {
				this.LoadingItem.SetLoadingActive(!0);
			}),
			(this.uBr = () => {
				this.LoadingItem.SetLoadingActive(!1);
			});
	}
	OnInit() {
		(this.LoadingItem = new RoleModelLoadingItem_1.RoleModelLoadingItem()),
			this.LoadingItem.CreateByResourceIdAsync(
				"UiItem_Loading_Prefab",
				UiLayer_1.UiLayer.GetLayerRootUiItem(UiLayerType_1.ELayerType.Pop),
			);
	}
	OnStart() {
		EventSystem_1.EventSystem.AddWithTarget(
			this.Owner,
			EventDefine_1.EEventName.BeforeUiModelLoadStart,
			this.IBr,
		),
			EventSystem_1.EventSystem.AddWithTarget(
				this.Owner,
				EventDefine_1.EEventName.OnUiModelLoadComplete,
				this.uBr,
			);
	}
	OnEnd() {
		EventSystem_1.EventSystem.RemoveWithTarget(
			this.Owner,
			EventDefine_1.EEventName.BeforeUiModelLoadStart,
			this.IBr,
		),
			EventSystem_1.EventSystem.RemoveWithTarget(
				this.Owner,
				EventDefine_1.EEventName.OnUiModelLoadComplete,
				this.uBr,
			),
			this.LoadingItem.Destroy();
	}
	SetLoadingOpen(e) {
		this.LoadingItem.SetLoadingOpen(e);
	}
};
(UiModelLoadingIconComponent = __decorate(
	[(0, UiModelComponentDefine_1.RegisterUiModelComponent)(3)],
	UiModelLoadingIconComponent,
)),
	(exports.UiModelLoadingIconComponent = UiModelLoadingIconComponent);
