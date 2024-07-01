"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiImageSettingModule = void 0);
const UE = require("ue"),
	Log_1 = require("../../Core/Common/Log"),
	ResourceSystem_1 = require("../../Core/Resource/ResourceSystem"),
	GlobalData_1 = require("../GlobalData"),
	ConfigManager_1 = require("../Manager/ConfigManager"),
	UiConfig_1 = require("./Define/UiConfig"),
	UiResourceLoadModule_1 = require("./UiResourceLoadModule");
class UiImageSettingModule extends UiResourceLoadModule_1.UiResourceLoadModule {
	SetSpriteByPathSync(e, t, o, r, n = void 0) {
		GlobalData_1.GlobalData.World &&
			t &&
			t.IsValid() &&
			(UiConfig_1.UiConfig.TryGetViewInfo(r)?.LoadAsync
				? (Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"UiImageSetting",
							11,
							"该界面不允许同步加载,Sprite改为异步加载",
							["ViewName", r],
						),
					this.SetSpriteByPathAsync(e, t, o, n))
				: (Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug("UiImageSetting", 11, "同步设置Sprite接口", [
							"ViewName",
							r,
						]),
					(n = ResourceSystem_1.ResourceSystem.Load(
						e,
						UE.LGUISpriteData_BaseObject,
					)),
					t.SetSprite(n, o)));
	}
	SetSpriteByPathAsync(e, t, o, r = void 0) {
		GlobalData_1.GlobalData.World &&
			t &&
			t.IsValid() &&
			(this.CancelResource(t),
			(e = ResourceSystem_1.ResourceSystem.LoadAsync(
				e,
				UE.LGUISpriteData_BaseObject,
				(e, n) => {
					this.DeleteResourceHandle(t),
						t.IsValid() &&
							(e && e.IsValid()
								? (t.SetSprite(e, o), r?.(!0))
								: (Log_1.Log.CheckError() &&
										Log_1.Log.Error(
											"UiImageSetting",
											11,
											"设置Sprite失败，图片加载失败",
											["图片路径", n],
										),
									r?.(!1)));
				},
				102,
			)),
			this.SetResourceId(t, e));
	}
	SetItemQualityIconSync(e, t, o, r = "BackgroundSprite", n = void 0) {
		(t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(t)),
			this.SetQualityIconByIdSync(e, t.QualityId, o, r, n);
	}
	SetItemQualityIconAsync(e, t, o = "BackgroundSprite", r = void 0) {
		(t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(t)),
			this.SetQualityIconByIdAsync(e, t.QualityId, o, r);
	}
	cdr(e, t, o) {
		t = ConfigManager_1.ConfigManager.CommonConfig.GetItemQualityById(t);
		return 0 === (e = e.ComponentTags).Num()
			? t[o]
			: ((o = e.Get(0).toString()),
				"string" !=
				typeof t[
					(e =
						ConfigManager_1.ConfigManager.ComponentConfig.GetQualityConfigParam(
							o,
						))
				]
					? (Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"UiImageSetting",
								11,
								"配置的表格字段查询到的资源路径不是字符串类型",
								["配置的表格字段", o],
							),
						"")
					: t[e]);
	}
	SetQualityIconByIdSync(e, t, o, r = "BackgroundSprite", n = void 0) {
		(t = this.cdr(e, t, r)), this.SetSpriteByPathSync(t, e, !1, o, n);
	}
	SetQualityIconByIdAsync(e, t, o = "BackgroundSprite", r = void 0) {
		(t = this.cdr(e, t, o)), this.SetSpriteByPathAsync(t, e, !1, r);
	}
	SetTextureByPathSync(e, t, o, r = void 0) {
		GlobalData_1.GlobalData.World &&
			t &&
			t.IsValid() &&
			(UiConfig_1.UiConfig.TryGetViewInfo(o)?.LoadAsync
				? (Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"UiImageSetting",
							11,
							"该界面不允许同步加载,Texture改为异步加载",
							["ViewName", o],
						),
					this.SetTextureByPathAsync(e, t, r))
				: (Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug("UiImageSetting", 11, "同步设置Texture接口", [
							"ViewName",
							o,
						]),
					(r = ResourceSystem_1.ResourceSystem.Load(e, UE.Texture)),
					t.SetTexture(r)));
	}
	SetTextureByPathAsync(e, t, o = void 0) {
		GlobalData_1.GlobalData.World &&
			t &&
			t.IsValid() &&
			(this.CancelResource(t),
			(e = ResourceSystem_1.ResourceSystem.LoadAsync(
				e,
				UE.Texture,
				(e, r) => {
					this.DeleteResourceHandle(t),
						t.IsValid() &&
							(e && e.IsValid()
								? (t.SetTexture(e), o?.(!0))
								: (Log_1.Log.CheckError() &&
										Log_1.Log.Error(
											"UiImageSetting",
											11,
											"设置Texture失败，图片加载失败",
											["图片路径", r],
										),
									o?.(!1)));
				},
				102,
			)),
			this.SetResourceId(t, e));
	}
	mdr(e, t) {
		var o;
		t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(t);
		return 0 === (e = e.ComponentTags).Num()
			? t.Icon
			: ((e = e.Get(0).toString()),
				"string" !=
				typeof t[
					(o =
						ConfigManager_1.ConfigManager.ComponentConfig.GetItemConfigParam(e))
				]
					? (Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"UiImageSetting",
								11,
								"配置的表格字段查询到的资源路径不是字符串类型",
								["配置的表格字段", e],
							),
						"")
					: t[o]);
	}
	SetItemIconSync(e, t, o, r = void 0) {
		(t = this.mdr(e, t)), this.SetTextureByPathSync(t, e, o, r);
	}
	SetItemIconAsync(e, t, o = void 0) {
		(t = this.mdr(e, t)), this.SetTextureByPathAsync(t, e, o);
	}
	ddr(e, t, o) {
		return 0 === (t = t.ComponentTags).Num()
			? e
			: ((e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(o)),
				(o = t.Get(0).toString()),
				"string" !=
				typeof e[
					(t =
						ConfigManager_1.ConfigManager.ComponentConfig.GetRoleConfigParam(o))
				]
					? (Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"UiImageSetting",
								11,
								"配置的表格字段查询到的资源路径不是字符串类型",
								["配置的表格字段", o],
							),
						"")
					: e[t]);
	}
	SetRoleIconSync(e, t, o, r, n) {
		(e = this.ddr(e, t, o)), this.SetTextureByPathSync(e, t, r, n);
	}
	SetRoleIconAsync(e, t, o, r) {
		(e = this.ddr(e, t, o)), this.SetTextureByPathAsync(e, t, r);
	}
	Cdr(e, t, o) {
		return 0 === (t = t.ComponentTags).Num()
			? e
			: ((e =
					ConfigManager_1.ConfigManager.ElementInfoConfig.GetElementInfo(o)),
				(o = t.Get(0).toString()),
				"string" !=
				typeof e[
					(t =
						ConfigManager_1.ConfigManager.ComponentConfig.GetElementConfigParam(
							o,
						))
				]
					? (Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"UiImageSetting",
								11,
								"配置的表格字段查询到的资源路径不是字符串类型",
								["配置的表格字段", o],
							),
						"")
					: e[t]);
	}
	SetElementIconSync(e, t, o, r) {
		(e = this.Cdr(e, t, o)), this.SetTextureByPathSync(e, t, r);
	}
	SetElementIcon(e, t, o) {
		(e = this.Cdr(e, t, o)), this.SetTextureByPathAsync(e, t);
	}
	gdr(e, t, o) {
		var r;
		return 0 !== (t = t.ComponentTags).Num() && o
			? ((o =
					ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterInfoConfig(
						o,
					)),
				(t = t.Get(0).toString()),
				"string" !=
				typeof o[
					(r =
						ConfigManager_1.ConfigManager.ComponentConfig.GetMonsterConfigParam(
							t,
						))
				]
					? (Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"LguiUtil",
								11,
								"配置的表格字段查询到的资源路径不是字符串类型",
								["配置的表格字段", t],
							),
						"")
					: o[r])
			: e;
	}
	SetMonsterIconSync(e, t, o, r) {
		(e = this.gdr(e, t, o)), this.SetTextureByPathSync(e, t, r);
	}
	SetMonsterIconAsync(e, t, o) {
		(e = this.gdr(e, t, o)), this.SetTextureByPathAsync(e, t);
	}
	fdr(e, t, o) {
		var r;
		return 0 !== (t = t.ComponentTags).Num() && o
			? ((o =
					ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetConfig(
						o,
					)),
				(t = t.Get(0).toString()),
				"string" !=
				typeof o[
					(r =
						ConfigManager_1.ConfigManager.ComponentConfig.GetDungeonEntranceConfigParam(
							t,
						))
				]
					? (Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"LguiUtil",
								11,
								"配置的表格字段查询到的资源路径不是字符串类型",
								["配置的表格字段", t],
							),
						"")
					: o[r])
			: e;
	}
	SetDungeonEntranceIconSync(e, t, o, r) {
		(e = this.fdr(e, t, o)), this.SetTextureByPathSync(e, t, r);
	}
	SetDungeonEntranceIconAsync(e, t, o) {
		(e = this.fdr(e, t, o)), this.SetTextureByPathAsync(e, t);
	}
	SetNiagaraTextureAsync(e, t, o, r, n) {
		GlobalData_1.GlobalData.World &&
			t &&
			t.IsValid() &&
			(this.CancelResource(t),
			(e = ResourceSystem_1.ResourceSystem.LoadAsync(
				e,
				UE.Texture,
				(e, a) => {
					this.DeleteResourceHandle(t),
						t.IsValid() &&
							(e && e.IsValid()
								? (t.SetNiagaraEmitterCustomTexture(o, r, e), n?.(!0))
								: (Log_1.Log.CheckError() &&
										Log_1.Log.Error(
											"UiImageSetting",
											11,
											"设置Texture失败，图片加载失败",
											["图片路径", a],
										),
									n?.(!1)));
				},
				102,
			)),
			this.SetResourceId(t, e));
	}
	SetNiagaraTextureSync(e, t, o, r, n, a = void 0) {
		GlobalData_1.GlobalData.World &&
			t &&
			t.IsValid() &&
			(UiConfig_1.UiConfig.TryGetViewInfo(n)?.LoadAsync
				? (Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"UiImageSetting",
							11,
							"该界面不允许同步加载,Texture改为异步加载",
							["ViewName", n],
						),
					this.SetNiagaraTextureAsync(e, t, o, r, a))
				: (Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug("UiImageSetting", 11, "同步设置Texture接口", [
							"ViewName",
							n,
						]),
					(a = ResourceSystem_1.ResourceSystem.Load(e, UE.Texture)),
					t.SetNiagaraEmitterCustomTexture(o, r, a)));
	}
}
exports.UiImageSettingModule = UiImageSettingModule;
