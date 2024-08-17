"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoguelikeSkillDetail = void 0);
const UE = require("ue"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	RoleLevelUpSuccessController_1 = require("../../RoleUi/RoleLevel/RoleLevelUpSuccessController"),
	ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	RoguelikeDefine_1 = require("../Define/RoguelikeDefine"),
	RoguelikeController_1 = require("../RoguelikeController");
class RoguelikeSkillDetail extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.Data = void 0),
			(this.Dho = () => {
				var e =
						ModelManager_1.ModelManager.InventoryModel?.GetItemCountByConfigId(
							RoguelikeDefine_1.SKILL_POINT_ID,
						),
					t =
						ModelManager_1.ModelManager.RoguelikeModel.RoguelikeSkillDataMap.get(
							this.Data.Id,
						);
				if (e < (this.Data?.Consule[t] ?? 0))
					ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
						"Roguelike_Skill_Point_Not_Enough",
					);
				else {
					const e = this.Data;
					RoguelikeController_1.RoguelikeController.RoguelikeTalentLevelUpRequest(
						this.Data.Id,
					).then(() => {
						this.Refresh(this.Data);
						var t =
							ConfigManager_1.ConfigManager.RoguelikeConfig?.GetRogueTalentTreeDescConfig(
								e.Describe,
							);
						t = {
							Title: "Text_ResonanceUnlockSuccess_Text",
							TextList: [{ TextId: t.BaseDesc, Params: t.Args.map(String) }],
						};
						RoleLevelUpSuccessController_1.RoleLevelUpSuccessController.OpenSuccessEffectView(
							t,
						);
					});
				}
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[3, UE.UIText],
			[4, UE.UIText],
			[6, UE.UIText],
			[7, UE.UIText],
			[9, UE.UIButtonComponent],
			[8, UE.UIText],
			[1, UE.UISprite],
			[2, UE.UIItem],
			[5, UE.UIItem],
			[10, UE.UIText],
			[11, UE.UIItem],
			[12, UE.UITexture],
			[13, UE.UIItem],
			[14, UE.UIItem],
			[15, UE.UIText],
			[16, UE.UIItem],
		]),
			(this.BtnBindInfo = [[9, this.Dho]]);
	}
	OnStart() {}
	Refresh(e) {
		this.Data = e;
		var t =
				ModelManager_1.ModelManager.RoguelikeModel.RoguelikeSkillDataMap.get(
					e.Id,
				),
			i =
				ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueTalentTreeDescConfig(
					e.Describe,
				),
			o = t >= e.Consule.length,
			l =
				((i =
					(this.SetSpriteByPath(i.TalentIcon, this.GetSprite(1), !1),
					LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), i.TalentName),
					LguiUtil_1.LguiUtil.SetLocalTextNew(
						this.GetText(3),
						"Text_LevelNumber_Text",
						t,
					),
					LguiUtil_1.LguiUtil.SetLocalTextNew(
						this.GetText(4),
						i.BaseDesc,
						i.Args[t],
					),
					LguiUtil_1.LguiUtil.SetLocalTextNew(
						this.GetText(6),
						"Text_LevelNumber_Text",
						t + 1,
					),
					LguiUtil_1.LguiUtil.SetLocalTextNew(
						this.GetText(7),
						i.BaseDesc,
						i.Args[o ? t : t + 1],
					),
					ModelManager_1.ModelManager.RoguelikeModel.GetParamConfigBySeasonId())),
				ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueCurrencyConfig(
					i.SkillPoint,
				)),
			n =
				((i = ModelManager_1.ModelManager.RoguelikeModel.GetRoguelikeCurrency(
					i.SkillPoint,
				)),
				(i = (e = e.Consule[t]) <= i),
				this.GetText(8));
		n.SetText(e?.toString()),
			i
				? n.SetChangeColor(!1, n.changeColor)
				: n.SetChangeColor(!0, n.changeColor),
			this.SetTextureByPath(l.IconSmall, this.GetTexture(12)),
			this.UpdateDetail(t, o);
	}
	UpdateDetail(e, t) {
		e < 0
			? (this.GetItem(2).SetUIActive(!1),
				this.GetItem(5).SetUIActive(!1),
				this.GetItem(16).SetUIActive(!1),
				this.GetButton(9).RootUIComp.SetUIActive(!1),
				this.GetItem(14).SetUIActive(!0),
				this.GetItem(13).SetUIActive(!1))
			: 0 === e
				? (this.GetItem(2).SetUIActive(!1),
					this.GetItem(5).SetUIActive(!1),
					this.GetItem(16).SetUIActive(!0),
					this.GetButton(9).RootUIComp.SetUIActive(!0),
					this.GetItem(14).SetUIActive(!1),
					this.GetItem(13).SetUIActive(!1))
				: (this.GetItem(2).SetUIActive(!t),
					this.GetItem(5).SetUIActive(!t),
					this.GetItem(16).SetUIActive(!t),
					this.GetButton(9).RootUIComp.SetUIActive(!t),
					this.GetItem(14).SetUIActive(!1),
					this.GetItem(13).SetUIActive(t));
	}
}
exports.RoguelikeSkillDetail = RoguelikeSkillDetail;
