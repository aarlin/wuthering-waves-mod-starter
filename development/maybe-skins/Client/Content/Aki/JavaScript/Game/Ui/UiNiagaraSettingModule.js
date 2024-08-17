"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiNiagaraSettingModule = void 0);
const UE = require("ue"),
	Log_1 = require("../../Core/Common/Log"),
	ResourceSystem_1 = require("../../Core/Resource/ResourceSystem"),
	GlobalData_1 = require("../GlobalData"),
	UiResourceLoadModule_1 = require("./UiResourceLoadModule");
class UiNiagaraSettingModule extends UiResourceLoadModule_1.UiResourceLoadModule {
	SetNiagaraByPathAsync(e, a, o = void 0) {
		GlobalData_1.GlobalData.World &&
			a &&
			a.IsValid() &&
			(this.CancelResource(a),
			(e = ResourceSystem_1.ResourceSystem.LoadAsync(
				e,
				UE.NiagaraSystem,
				(e, r) => {
					this.DeleteResourceHandle(a),
						a.IsValid() &&
							(e && e.IsValid()
								? (a.SetNiagaraSystem(e), o?.(!0))
								: (Log_1.Log.CheckError() &&
										Log_1.Log.Error(
											"UiImageSetting",
											38,
											`设置NiagaraSystem失败，Niagara资源加载失败，资源路径：${r}}`,
										),
									o?.(!1)));
				},
			)),
			this.SetResourceId(a, e));
	}
}
exports.UiNiagaraSettingModule = UiNiagaraSettingModule;
