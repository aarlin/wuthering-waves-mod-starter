"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LanguageLogic = void 0);
const LanguageSystem_1 = require("../../../../Core/Common/LanguageSystem"),
	Log_1 = require("../../../../Core/Common/Log"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	MenuController_1 = require("../MenuController"),
	MenuTool_1 = require("../MenuTool"),
	DropDownLogicBase_1 = require("./DropDownLogicBase");
class LanguageLogic extends DropDownLogicBase_1.DropDownLogicBase {
	constructor() {
		super(...arguments), (this._Ai = new Map());
	}
	GetDropDownDataList() {
		var e = [];
		this._Ai.clear();
		const n = new Map();
		var o = MenuController_1.MenuController.GetTargetConfig(51);
		for (const r of MenuTool_1.MenuTool.GetLanguageDefineData()) {
			var a = r.LanguageType,
				g =
					ConfigManager_1.ConfigManager.LanguageConfig.GetLanguageDefineById(a);
			g
				? (a !== o && !g.IsShow) || (e.push(r), n.set(a, g.SortId))
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"TextLanguageSearch",
						38,
						"设置系统语言定义不存在,请检查s.设置系统 LanguageDefine",
						["语言类型Id", a],
					);
		}
		e.sort(
			(e, o) => (
				(e = n.get(e.LanguageType)),
				(o = n.get(o.LanguageType)),
				void 0 === e || void 0 === o ? 0 : e - o
			),
		);
		for (let n = 0; n < e.length; n++) this._Ai.set(e[n].LanguageType, n);
		return e;
	}
	GetDataTextId(e, n) {
		return new LguiUtil_1.TableTextArgNew(
			n.MenuDataOptionsNameList[e.LanguageType],
		);
	}
	TriggerSelectChange(e, n) {
		MenuController_1.MenuController.GetTargetConfig(n.MenuDataFunctionId) !==
			e.LanguageType &&
			(MenuController_1.MenuController.NoticeChange(n.MenuDataFunctionId),
			MenuController_1.MenuController.SetTargetConfig(
				n.MenuDataFunctionId,
				e.LanguageType,
			),
			MenuController_1.MenuController.DoConfigFunction(n.MenuDataFunctionId),
			MenuController_1.MenuController.SaveLocalConfig(),
			(ModelManager_1.ModelManager.MenuModel.IsEdited = !0),
			Log_1.Log.CheckInfo()) &&
			Log_1.Log.Info(
				"TextLanguageSearch",
				11,
				"设置语言",
				["选择语言", MenuTool_1.MenuTool.GetLanguageCodeById(e.LanguageType)],
				["实际语言", LanguageSystem_1.LanguageSystem.PackageLanguage],
			);
	}
	GetDefaultIndex(e) {
		return (
			(e = MenuController_1.MenuController.GetTargetConfig(
				e.MenuDataFunctionId,
			)),
			this._Ai.get(e) ?? 0
		);
	}
}
exports.LanguageLogic = LanguageLogic;
