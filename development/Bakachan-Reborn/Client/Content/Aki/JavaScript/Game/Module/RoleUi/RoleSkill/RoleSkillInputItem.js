"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleSkillInputItem = void 0);
const UE = require("ue"),
	MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
	StringBuilder_1 = require("../../../../Core/Utils/StringBuilder"),
	StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	InputKeyDisplayData_1 = require("../../../InputSettings/InputKeyDisplayData"),
	InputSettings_1 = require("../../../InputSettings/InputSettings"),
	InputSettingsManager_1 = require("../../../InputSettings/InputSettingsManager"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	KeyUtil_1 = require("../../Util/KeyUtil"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	RoleSkillTreeSkillSpriteItem_1 = require("./RoleSkillTreeSkillSpriteItem");
class RoleSkillInputItem extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(), (this.Rco = 0), this.CreateThenShowByActor(e.GetOwner());
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIItem],
		];
	}
	Update(e) {
		(this.Rco = e), this.Refresh();
	}
	Refresh() {
		var e,
			t = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillInputConfigById(
				this.Rco,
			);
		t &&
			((e = ModelManager_1.ModelManager.PlatformModel).IsPc()
				? this.HandlePcInputText(t)
				: e.IsMobile()
					? this.HandleMobileInputText(t)
					: e.IsGamepad() && this.HandleGamepadInputText(t));
	}
	HandlePcInputText(e) {
		var t = [],
			i = e.InputArray.length;
		for (let I = 0; I < i; I++) {
			var n = e.InputArray[I],
				r = (n = KeyUtil_1.KeyUtil.GetPcKeyNameByAction(
					n,
					ModelManager_1.ModelManager.PlatformModel.PlatformType,
				))[0],
				l = n[1],
				a = new StringBuilder_1.StringBuilder(),
				o = ConfigManager_1.ConfigManager.BattleUiConfig,
				g = r.length,
				s = l.length,
				u = g + s;
			for (let e = 0; e < u; e++) {
				var p = e < g ? r[e] : l[e - g];
				(p = o.GetPcKeyConfig(p)).KeyIconPath &&
					(a.Append("<texture="), a.Append(p.KeyIconPath), a.Append("/>")),
					e === g - 1 && 0 < s ? a.Append("/") : e < u - 1 && a.Append("+");
			}
			t.push(a.ToString());
		}
		LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e.Description, ...t);
	}
	HandleGamepadInputText(e) {
		var t = [];
		const i = e.InputArray.length;
		for (let g = 0; g < i; g++) {
			var n = e.InputArray[g],
				r = new InputKeyDisplayData_1.InputKeyDisplayData();
			if (
				InputSettingsManager_1.InputSettingsManager.GetActionKeyDisplayData(
					r,
					n,
				)
			) {
				var l = r.GetDisplayKeyNameList();
				if (l) {
					var a = new StringBuilder_1.StringBuilder();
					const e = l.length;
					for (let t = 0; t < e; t++) {
						var o = l[t];
						o = InputSettings_1.InputSettings.GetKeyIconPath(o);
						StringUtils_1.StringUtils.IsEmpty(o) || a.Append(`<texture=${o}>`),
							t < e - 1 && a.Append("+");
					}
					t.push(a.ToString());
				}
			}
		}
		LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e.Description, ...t);
	}
	HandleMobileInputText(e) {
		var t = e.SkillArray,
			i = [],
			n = [],
			r = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
				"UiItem_RoleSkillIcon",
			),
			l = new RegExp("{[0-9]+}", "g"),
			a = (e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
				e.Description,
			)).match(l);
		if (a) {
			const g = [];
			for (let e = 0; e < a.length; e++) {
				var o = a[e];
				o = parseInt(o.substring(1, o.length - 1));
				i.push(`<snidx=${e}/>`), n.push(r), g.push(t[o]);
			}
			(l = StringUtils_1.StringUtils.FormatStaticBuilder(e, ...i)),
				LguiUtil_1.LguiUtil.LoadAndSetText(this.GetText(0), l, n, (e) => {
					for (let i = 0; i < e.length; i++) {
						var t = e[i];
						new RoleSkillTreeSkillSpriteItem_1.RoleSkillTreeSkillSpriteItem(
							t,
						).Update(g[i]);
					}
				});
		} else this.GetText(0).SetText(e);
	}
	SetBgActive(e) {
		var t = this.GetItem(1);
		t?.SetChangeColor(!e, t.changeColor);
	}
}
exports.RoleSkillInputItem = RoleSkillInputItem;
