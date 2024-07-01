"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiModelResourcesManager = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	Log_1 = require("../../../Core/Common/Log"),
	ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
	ModelUtil_1 = require("../../../Core/Utils/ModelUtil"),
	GlobalData_1 = require("../../GlobalData"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	EffectUtil_1 = require("../../Utils/EffectUtil");
class UiModelResourcesManager {
	static get CPo() {
		return UiModelResourcesManager.gPo++;
	}
	static LoadUiModelResources(e, o) {
		if (!e || 0 === e.length)
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"UiModelResourcesManager",
						11,
						"加载资源内容为空,检查一下传进来的数据",
					),
				o?.(1),
				0
			);
		const a = [],
			s = [],
			r = UiModelResourcesManager.CPo,
			t = new Map();
		ResourceSystem_1.ResourceSystem.SetLoadModeInLoading(
			GlobalData_1.GlobalData.World,
			"UiModelResourcesManager.LoadUiModelResources",
		),
			UiModelResourcesManager.fPo.set(r, []);
		for (const n of e) {
			var l = ResourceSystem_1.ResourceSystem.LoadAsync(
				n,
				UE.Object,
				(l, n) => {
					l && (a.push(n), t.set(n, l)),
						s.push(n),
						s.length === e.length &&
							(UiModelResourcesManager.fPo.delete(r),
							a.length !== s.length ? o?.(3) : o?.(2, t),
							ResourceSystem_1.ResourceSystem.SetLoadModeInGame(
								GlobalData_1.GlobalData.World,
								"UiModelResourcesManager.LoadUiModelResources",
							));
				},
			);
			UiModelResourcesManager.fPo.has(r) &&
				UiModelResourcesManager.fPo.get(r).push(l);
		}
		return r;
	}
	static LoadUiRoleAllResourceByRoleConfigId(e, o) {
		var a = [];
		return (
			a.push(...UiModelResourcesManager.GetRoleResourcesPath(e)),
			a.push(
				EffectUtil_1.EffectUtil.GetEffectPath("ChangeRoleMaterialController"),
			),
			UiModelResourcesManager.LoadUiModelResources(a, o)
		);
	}
	static CancelUiModelResourceLoad(e) {
		if (e !== UiModelResourcesManager.InvalidValue) {
			var o = UiModelResourcesManager.fPo.get(e);
			if (o) {
				for (const e of o) ResourceSystem_1.ResourceSystem.CancelAsyncLoad(e);
				ResourceSystem_1.ResourceSystem.SetLoadModeInGame(
					GlobalData_1.GlobalData.World,
					"UiModelResourcesManager.LoadUiModelResources",
				);
			}
		}
	}
	static GetRoleResourcesPath(e) {
		var o = [],
			a =
				((e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e)),
				ModelUtil_1.ModelUtil.GetModelConfig(e.UiMeshId)),
			s =
				(o.push(a.网格体.ToAssetPathName()),
				o.push(e.UiScenePerformanceABP),
				a.子网格体);
		if (s) for (let e = 0; e < s.Num(); e++) o.push(s.Get(e).ToAssetPathName());
		return o;
	}
	static GetWeaponResourcesPath(e) {
		var o = [];
		for (const r of ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponConfigByItemId(
			e,
		).Models) {
			var a,
				s = ModelUtil_1.ModelUtil.GetModelConfig(r);
			(a =
				((a = s.网格体.ToAssetPathName()) && o.push(a),
				s.动画蓝图.ToAssetPathName())) && o.push(a);
		}
		return o;
	}
	static GetHuluResourcesPath(e) {
		var o,
			a = [];
		return (
			(o =
				((o = (e =
					ModelUtil_1.ModelUtil.GetModelConfig(e)).网格体.ToAssetPathName()) &&
					a.push(o),
				e.动画蓝图.ToAssetPathName())) && a.push(o),
			a
		);
	}
	static LoadMeshesComponentsBundleStreaming(e, o, a) {
		return UE.KuroMeshTextureFunctionLibrary.ForceMeshesBundleStreamingInAllMips(
			e,
			o,
			(0, puerts_1.toManualReleaseDelegate)(a),
		);
	}
	static ReleaseMeshesComponentsBundleStreaming(e) {
		UE.KuroMeshTextureFunctionLibrary.StopMeshesBundleStreamingInAllMips(e);
	}
}
((exports.UiModelResourcesManager = UiModelResourcesManager).fPo = new Map()),
	(UiModelResourcesManager.gPo = 0),
	(UiModelResourcesManager.InvalidValue = 0),
	(UiModelResourcesManager.StreamingInvalidValue = -1);
