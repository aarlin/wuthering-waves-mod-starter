"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LguiUtil = exports.TableTextArgNew = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
	Log_1 = require("../../../Core/Common/Log"),
	Stats_1 = require("../../../Core/Common/Stats"),
	ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
	Vector2D_1 = require("../../../Core/Utils/Math/Vector2D"),
	StringUtils_1 = require("../../../Core/Utils/StringUtils"),
	GlobalData_1 = require("../../GlobalData"),
	InputSettingsManager_1 = require("../../InputSettings/InputSettingsManager"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	PC_KEY_ID = "PcKeyId=",
	GAMEPAD_KEY_ID = "GamepadKeyId=",
	ACTION_ID_KEY = "ActionId=",
	SKILL_ID_KEY = "SkillId=",
	ROLE_ID_KEY = "RoleId=",
	EXPLORE_ID_KEY = "ExploreId=",
	PHANTOM_ID_KEY = "PhantomId=",
	ICON_ID_KEY = "IconId=",
	PC_KEY_ID_MATCH = "PcKeyId=[0-9]+",
	GAMEPAD_KEY_ID_MATCH = "GamepadKeyId=[0-9]+",
	ACTION_ID_MATCH = "ActionId=[0-9]+",
	SKILL_ID_MATCH = "SkillId=[0-9]+",
	ROLE_ID_MATCH = "RoleId=[0-9]+",
	EXPLORE_ID_MATCH = "ExploreId=[0-9]+",
	PHANTOM_ID_MATCH = "PhantomId=[0-9]+",
	ICON_ID_MATCH = "IconId=[0-9]+",
	pcKeyFormatRegex = new RegExp(`{<${PC_KEY_ID_MATCH}>}`, "g"),
	gamepadFormatRegex = new RegExp(`{<${GAMEPAD_KEY_ID_MATCH}>}`, "g"),
	actionFormatRegex = new RegExp(`{<${ACTION_ID_MATCH}>}`, "g"),
	skillFormatRegex = new RegExp(
		`{<${ACTION_ID_MATCH}><${SKILL_ID_MATCH}>}`,
		"g",
	),
	dtSkillFormatRegex = new RegExp(
		`{<${ACTION_ID_MATCH}><${ROLE_ID_MATCH}><${SKILL_ID_MATCH}>}`,
		"g",
	),
	exploreFormatRegex = new RegExp(
		`{<${ACTION_ID_MATCH}><${EXPLORE_ID_MATCH}>}`,
		"g",
	),
	phantomFormatRegex = new RegExp(
		`{<${ACTION_ID_MATCH}><${PHANTOM_ID_MATCH}>}`,
		"g",
	),
	iconFormatRegex = new RegExp(`{<${ICON_ID_MATCH}>}`, "g"),
	pcKeyIdFormatRegex = new RegExp("PcKeyId=[0-9]+", "g"),
	gamepadIdFormatRegex = new RegExp("GamepadKeyId=[0-9]+", "g"),
	actionIdFormatRegex = new RegExp("ActionId=[0-9]+", "g"),
	skillIdFormatRegex = new RegExp("SkillId=[0-9]+", "g"),
	exploreIdFormatRegex = new RegExp("ExploreId=[0-9]+", "g"),
	phantomIdFormatRegex = new RegExp("PhantomId=[0-9]+", "g"),
	iconIdFormatRegex = new RegExp("IconId=[0-9]+", "g");
class TableTextArgNew {
	constructor(e, ...t) {
		(this.TextKey = e), (this.Params = t);
	}
}
exports.TableTextArgNew = TableTextArgNew;
class LguiUtil {
	static async LoadPrefabByResourceIdAsync(
		e,
		t,
		o = GlobalData_1.GlobalData.World,
	) {
		return (
			(e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e)),
			LguiUtil.LoadPrefabByAsync(e, t, o)
		);
	}
	static async LoadPrefabByAsync(e, t, o = GlobalData_1.GlobalData.World) {
		const r = new CustomPromise_1.CustomPromise();
		return (
			ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.PrefabAsset, (e, a) => {
				(e = UE.LGUIBPLibrary.LoadPrefabWithAsset(o, e, t)), r.SetResult(e);
			}),
			r.Promise
		);
	}
	static CopyItem(e, t) {
		return this.DuplicateActor(e.GetOwner(), t).GetComponentByClass(
			UE.UIItem.StaticClass(),
		);
	}
	static DuplicateActor(e, t) {
		return Stats_1.Stat.Enable, UE.LGUIBPLibrary.DuplicateActor(e, t);
	}
	static SetLocalText(e, t, ...o) {
		(t = ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(t)),
			this.SetLocalTextNew(e, t, ...o);
	}
	static SetLocalTextNew(e, t, ...o) {
		e &&
			(e.Clear(),
			o.forEach((t) => {
				"number" == typeof t
					? Number.isInteger(t)
						? e.AddIntArgs(t)
						: e.AddFloatArgs(t)
					: t instanceof TableTextArgNew
						? e.AddFormatTableInfoNew(t.TextKey)
						: e.AddStringArgs(t);
			}),
			e.ShowTextNew(t));
	}
	static ReplaceWildCard(e) {
		var t;
		e?.IsValid()
			? e.GetRichText()
				? ((t = e.GetText()),
					(t = LguiUtil.ConvertToPcKeyIconRichText(t)),
					(t = LguiUtil.ConvertToGamepadKeyIconRichText(t)),
					(t = LguiUtil.ConvertToActionIconRichText(t)),
					(t = LguiUtil.ConvertToDataTableSkillIconRichText(t)),
					(t = LguiUtil.ConvertToSkillIconRichText(t)),
					(t = LguiUtil.ConvertToToExploreIconRichText(t)),
					(t = LguiUtil.ConvertToToPhantomIconRichText(t)),
					(t = LguiUtil.ConvertToToPlatformIconRichText(t)),
					e.SetText(t))
				: Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn(
						"LguiUtil",
						8,
						"替换富文本图标失败，因为此文本不是富文本",
						["uiText", e.GetText()],
					)
			: Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn("LguiUtil", 8, "替换富文本时，UiText已经失效");
	}
	static ConvertToPcKeyIconRichText(e) {
		var t = e.match(pcKeyFormatRegex);
		if (!t) return e;
		let o = e;
		for (const e of t) {
			var r = this.Oqo(e, pcKeyIdFormatRegex);
			o = this.kqo(o, e, r);
		}
		return o;
	}
	static ConvertToGamepadKeyIconRichText(e) {
		var t = e.match(gamepadFormatRegex);
		if (!t) return e;
		let o = e;
		for (const a of t) {
			var r = this.Oqo(a, gamepadIdFormatRegex);
			o = this.Fqo(e, a, r);
		}
		return o;
	}
	static ConvertToActionIconRichText(e) {
		var t = e.match(actionFormatRegex);
		if (!t) return e;
		let o = e;
		for (const e of t) {
			var r = this.Oqo(e, actionIdFormatRegex),
				a = `{<ActionId=${r}>}`;
			o = this.Vqo(o, a, r);
		}
		return o;
	}
	static ConvertToDataTableSkillIconRichText(e) {
		var t = e.match(dtSkillFormatRegex);
		if (!t) return e;
		var o = ModelManager_1.ModelManager.PlatformModel.IsMobile();
		let r = e;
		for (const e of t) {
			var a = this.Oqo(e, actionIdFormatRegex);
			o || (r = this.Vqo(r, e, a));
		}
		return r;
	}
	static ConvertToSkillIconRichText(e) {
		var t = e.match(skillFormatRegex);
		if (!t) return e;
		var o = ModelManager_1.ModelManager.PlatformModel.IsMobile();
		let r = e;
		for (const e of t) {
			var a = this.Oqo(e, actionIdFormatRegex),
				i = this.Oqo(e, skillIdFormatRegex);
			r = o ? this.Hqo(r, e, i) : this.Vqo(r, e, a);
		}
		return r;
	}
	static ConvertToToExploreIconRichText(e) {
		var t = e.match(exploreFormatRegex);
		if (!t) return e;
		var o = ModelManager_1.ModelManager.PlatformModel.IsMobile();
		let r = e;
		for (const e of t) {
			var a = this.Oqo(e, actionIdFormatRegex),
				i = this.Oqo(e, exploreIdFormatRegex);
			r = o ? this.jqo(r, e, i) : this.Vqo(r, e, a);
		}
		return r;
	}
	static ConvertToToPhantomIconRichText(e) {
		var t = e.match(phantomFormatRegex);
		if (!t) return e;
		var o = ModelManager_1.ModelManager.PlatformModel.IsMobile();
		let r = e;
		for (const e of t) {
			var a = this.Oqo(e, actionIdFormatRegex),
				i = this.Oqo(e, phantomIdFormatRegex);
			r = o ? this.Wqo(r, e, i) : this.Vqo(r, e, a);
		}
		return r;
	}
	static ConvertToToPlatformIconRichText(e) {
		var t = e.match(iconFormatRegex);
		if (!t) return e;
		let o = e;
		for (const e of t) {
			var r = this.Oqo(e, iconIdFormatRegex);
			o = this.Kqo(o, e, r);
		}
		return o;
	}
	static kqo(e, t, o) {
		var r =
			ConfigManager_1.ConfigManager.InputSettingsConfig.GetPcKeyConfigById(o);
		if (r) {
			if (((r = r.KeyIconPath), !StringUtils_1.StringUtils.IsEmpty(r)))
				return e.replace(t, `<texture=${r}>`);
			Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn("LguiUtil", 8, "按键配置了空的图标路径", ["pcKeyId", o]);
		} else
			Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn("LguiUtil", 8, "找不到对应Pc按键配置", ["pcKeyId", o]);
	}
	static Fqo(e, t, o) {
		var r =
			ConfigManager_1.ConfigManager.InputSettingsConfig.GetGamepadKeyConfigById(
				o,
			);
		if (r) {
			if (((r = r.KeyIconPath), !StringUtils_1.StringUtils.IsEmpty(r)))
				return e.replace(t, `<texture=${r}>`);
			Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn("LguiUtil", 8, "按键配置了空的图标路径", [
					"gamepadKeyId",
					o,
				]);
		} else
			Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn("LguiUtil", 8, "找不到对应Gamepad按键配置", [
					"pcKeyId",
					o,
				]);
	}
	static Hqo(e, t, o) {
		if (
			(r = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillConfigById(o))
		) {
			var r,
				a = `<texture=${(r = r.Icon)}>`;
			if (!StringUtils_1.StringUtils.IsEmpty(r)) return e.replace(t, a);
			Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn("LguiUtil", 8, "技能配置了空的图标路径", ["skillId", o]);
		} else
			Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn("LguiUtil", 8, "找不到对应技能", ["skillId", o]);
	}
	static Vqo(e, t, o) {
		var r =
			InputSettingsManager_1.InputSettingsManager.GetActionBindingByConfigId(o);
		if (r) {
			if (
				((r =
					InputSettingsManager_1.InputSettingsManager.CheckGetActionKeyIconPath(
						r,
					)),
				!StringUtils_1.StringUtils.IsEmpty(r))
			)
				return e.replace(t, `<texture=${r}>`);
			Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn("LguiUtil", 8, "Action配置了空的图标路径", [
					"actionId",
					o,
				]);
		} else
			Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn("LguiUtil", 8, "找不到对应ActionBinding", [
					"actionId",
					o,
				]);
	}
	static jqo(e, t, o) {
		var r =
			ModelManager_1.ModelManager.RouletteModel.GetExploreDataBySkillId(o);
		if (r) {
			if (((r = r.BattleViewIcon), !StringUtils_1.StringUtils.IsEmpty(r)))
				return e.replace(t, `<texture=${r}>`);
			Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn("LguiUtil", 8, "探索幻象图标路径为空", ["phantomId", o]);
		} else
			Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn("LguiUtil", 8, "找不到对应探索幻象", ["phantomId", o]);
	}
	static Wqo(e, t, o) {
		var r =
			ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomInstanceByItemId(
				o,
			);
		if (r)
			if ((r = r.GetPhantomSkillInfoByLevel())) {
				if (((r = r.BattleViewIcon), !StringUtils_1.StringUtils.IsEmpty(r)))
					return e.replace(t, `<texture=${r}>`);
				Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn("LguiUtil", 8, "战斗幻象图标路径为空", [
						"phantomId",
						o,
					]);
			} else
				Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn("LguiUtil", 8, "找不到对应战斗幻象技能", [
						"phantomId",
						o,
					]);
		else
			Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn("LguiUtil", 8, "找不到对应战斗幻象", ["phantomId", o]);
	}
	static Kqo(e, t, o) {
		var r =
			ConfigManager_1.ConfigManager.InputSettingsConfig.GetPlatformIconConfig(
				o,
			);
		if (r) {
			let a = r.IconPath;
			if (
				(ModelManager_1.ModelManager.PlatformModel.IsMobile() &&
					(a = r.MobileIconPath),
				!StringUtils_1.StringUtils.IsEmpty(a))
			)
				return (r = `<texture=${a}>`), e.replace(t, r);
			Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn("LguiUtil", 8, "多端图标路径为空", ["iconId", o]);
		} else
			Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn("LguiUtil", 8, "找不到对应多端平台图标配置", [
					"iconId",
					o,
				]);
	}
	static Oqo(e, t) {
		if ((e = e.match(t)[0])) return (t = e.split("=")[1]), Number(t);
	}
	static GetActorFullPath(e) {
		var t = (0, puerts_1.$ref)("");
		return (
			UE.LGUIBPLibrary.GetFullPathOfActor(GlobalData_1.GlobalData.World, e, t),
			(0, puerts_1.$unref)(t)
		);
	}
	static ScreenShot(e, t) {
		return UE.BlueprintPathsLibrary.ProjectUserDir() + e;
	}
	static ResetShot() {}
	static ClearAttachChildren(e) {
		for (let t = e.AttachChildren.Num() - 1; 0 <= t; t--)
			UE.LGUIBPLibrary.DeleteActor(e.AttachChildren.Get(t).GetOwner());
	}
	static LoadAndSetText(e, t, o, r) {
		LguiUtil.ClearAttachChildren(e);
		const a = new Array(o.length),
			i = new Array(o.length);
		let n = 0;
		o.forEach((g, l) => {
			ResourceSystem_1.ResourceSystem.LoadAsync(g, UE.PrefabAsset, (g, c) => {
				(i[l] = g),
					(++n >= o.length || n >= o.length) &&
						(i.forEach((t, o) => {
							var r = (t = UE.LGUIBPLibrary.LoadPrefabWithAsset(
								GlobalData_1.GlobalData.World,
								t,
								e,
							)).GetComponentByClass(UE.UIItem.StaticClass());
							r && (r.SetPivot(Vector2D_1.Vector2D.ZeroVector), (a[o] = t));
						}),
						e.SetText(t),
						r) &&
						r(a);
			});
		});
	}
	static SetActorIsPermanent(e, t, o) {
		e
			? e.IsValid()
				? UE.KuroStaticLibrary.SetActorPermanent(e, t, o)
				: Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn("LguiUtil", 11, "无缝切换传入Actor异常,Actor IsValid")
			: Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn("LguiUtil", 11, "无缝切换传入Actor异常,Actor为空");
	}
	static GetChildActorByHierarchyIndex(e, t = 0) {
		if ((e = e.GetUIItem())) return e.GetAttachUIChild(t)?.GetOwner();
	}
	static GetComponentsRegistry(e) {
		return e?.GetComponentByClass(UE.LGUIComponentsRegistry.StaticClass());
	}
}
exports.LguiUtil = LguiUtil;
