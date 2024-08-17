"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleSkillEffectItem = void 0);
const UE = require("ue"),
	MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
	StringBuilder_1 = require("../../../../../Core/Utils/StringBuilder"),
	StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class RoleSkillEffectItem extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(), this.CreateThenShowByActor(e.GetOwner());
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIText],
			[2, UE.UIText],
		];
	}
	UpdateItem(e, t) {
		var i =
				ConfigManager_1.ConfigManager.RoleSkillConfig.GetRoleSkillDescriptionConfigById(
					e.Id,
				),
			r = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(i.AttributeName);
		this.GetText(0).SetText(r),
			this.GetText(1).SetText(this.GetAttrValueStr(i, e)),
			this.GetText(2).SetText(this.GetAttrValueStr(i, t));
	}
	GetAttrValueStr(e, t) {
		let i = "";
		if (e.Description)
			i = StringUtils_1.StringUtils.Format(
				MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Description),
				...t.Desc,
			);
		else {
			var r = new StringBuilder_1.StringBuilder(),
				n = t.Desc.length;
			for (let e = 0; e < n; ++e) r.Append(t.Desc[e]);
			i = r.ToString();
		}
		return i;
	}
}
exports.RoleSkillEffectItem = RoleSkillEffectItem;
