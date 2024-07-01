"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (e, o, n, t) {
		var r,
			i = arguments.length,
			a =
				i < 3
					? o
					: null === t
						? (t = Object.getOwnPropertyDescriptor(o, n))
						: t;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			a = Reflect.decorate(e, o, n, t);
		else
			for (var d = e.length - 1; 0 <= d; d--)
				(r = e[d]) && (a = (i < 3 ? r(a) : 3 < i ? r(o, n, a) : r(o, n)) || a);
		return 3 < i && a && Object.defineProperty(o, n, a), a;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiRoleLoadComponent = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine"),
	UiModelLoadComponent_1 = require("../Common/UiModelLoadComponent");
let UiRoleLoadComponent = class extends UiModelLoadComponent_1.UiModelLoadComponent {
	constructor() {
		super(...arguments), (this.VBr = void 0);
	}
	OnInit() {
		super.OnInit(), (this.VBr = this.Owner.CheckGetComponent(11));
	}
	OnEnd() {
		super.OnEnd();
	}
	LoadModelByRoleDataId(e, o = !1, n) {
		e === this.VBr.RoleDataId
			? Log_1.Log.CheckError() &&
				Log_1.Log.Error("Character", 44, "重复加载角色", ["RoleDataId", e])
			: (this.VBr.SetRoleDataId(e),
				(this.LoadFinishCallBack = n),
				this.LoadModel(o));
	}
	LoadModelByRoleConfigId(e, o = !1, n) {
		e === this.VBr.RoleConfigId
			? Log_1.Log.CheckError() &&
				Log_1.Log.Error("Character", 44, "重复加载角色", ["RoleConfigId", e])
			: (this.VBr.SetRoleConfigId(e),
				(this.LoadFinishCallBack = n),
				this.LoadModel(o));
	}
	GetAnimClassPath() {
		return ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(
			this.VBr.RoleConfigId,
		).UiScenePerformanceABP;
	}
};
(UiRoleLoadComponent = __decorate(
	[(0, UiModelComponentDefine_1.RegisterUiModelComponent)(12)],
	UiRoleLoadComponent,
)),
	(exports.UiRoleLoadComponent = UiRoleLoadComponent);
