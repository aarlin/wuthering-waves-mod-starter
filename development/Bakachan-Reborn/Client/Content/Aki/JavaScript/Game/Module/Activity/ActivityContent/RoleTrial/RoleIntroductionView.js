"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleIntroductionView = void 0);
const UE = require("ue"),
	MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
	StringBuilder_1 = require("../../../../../Core/Utils/StringBuilder"),
	StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
	BigElementItem_1 = require("../../../Common/BigElementItem"),
	RoleSkillInputItem_1 = require("../../../RoleUi/RoleSkill/RoleSkillInputItem"),
	SimpleGenericLayout_1 = require("../../../Util/Layout/SimpleGenericLayout"),
	GenericScrollView_1 = require("../../../Util/ScrollView/GenericScrollView");
class RoleIntroductionView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.zke = 0),
			(this.Zke = void 0),
			(this.$be = void 0),
			(this.e2e = void 0),
			(this.t2e = (e, t, i) => (
				(t = new RoleSkillInputItem_1.RoleSkillInputItem(t)).Update(e),
				t.SetBgActive(i % 2 == 0),
				{ Key: i, Value: t }
			)),
			(this.i2e = () => {
				this.CloseMe();
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIButtonComponent],
			[1, UE.UITexture],
			[2, UE.UIHorizontalLayout],
			[3, UE.UIText],
			[4, UE.UIItem],
			[5, UE.UITexture],
			[6, UE.UIText],
			[7, UE.UIScrollViewWithScrollbarComponent],
			[8, UE.UIText],
			[9, UE.UIItem],
		]),
			(this.BtnBindInfo = [[0, this.i2e]]);
	}
	async OnBeforeStartAsync() {
		this.e2e = new BigElementItem_1.BigElementItem();
		var e = this.GetItem(4);
		await this.e2e.CreateByActorAsync(e.GetOwner());
	}
	OnStart() {
		(this.Zke = new GenericScrollView_1.GenericScrollView(
			this.GetScrollViewWithScrollbar(7),
			this.t2e,
		)),
			(this.$be = new SimpleGenericLayout_1.SimpleGenericLayout(
				this.GetHorizontalLayout(2),
			)),
			(this.zke = this.OpenParam),
			this.Refresh();
	}
	Refresh() {
		var e =
				ConfigManager_1.ConfigManager.RoleSkillConfig.GetRoleSkillInputConfigById(
					this.zke,
				),
			t = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(this.zke);
		if (e && t) {
			const n = this.GetTexture(1),
				o =
					(n.SetUIActive(!1),
					this.SetRoleIcon(t.FormationRoleCard, n, this.zke, void 0, () => {
						n.SetUIActive(!0);
					}),
					this.GetText(3).ShowTextNew(t.Name),
					this.e2e.Refresh(t.ElementId),
					this.e2e.SetUiActive(!0),
					this.$be.RebuildLayout(t.QualityId),
					this.GetTexture(5));
			o.SetUIActive(!1),
				this.SetTextureByPath(e.Icon, o, void 0, () => {
					o.SetUIActive(!0);
				});
			t = e.DescList;
			var i = new StringBuilder_1.StringBuilder();
			for (const e of t)
				i.Append(MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e)),
					i.Append("\n");
			i.RemoveLast(1),
				this.GetText(6).SetText(i.ToString()),
				(t = e.SkillInputIdList),
				this.Zke.RefreshByData(t),
				(e =
					ConfigManager_1.ConfigManager.ActivityRoleTrialConfig.GetRoleTrialInfoConfigByRoleId(
						this.zke,
					)) &&
					(StringUtils_1.StringUtils.IsEmpty(e?.InstanceText)
						? this.GetItem(9).SetUIActive(!1)
						: (this.GetText(8).ShowTextNew(e.InstanceText),
							this.GetItem(9).SetUIActive(!0)));
		}
	}
	OnBeforeDestroy() {
		this.Zke.ClearChildren();
	}
}
exports.RoleIntroductionView = RoleIntroductionView;
