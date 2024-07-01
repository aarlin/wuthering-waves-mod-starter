"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleSkillInputPanel = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	FormationDataController_1 = require("../../Abilities/FormationDataController"),
	ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine"),
	InstanceDungeonController_1 = require("../../InstanceDungeon/InstanceDungeonController"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	GenericScrollView_1 = require("../../Util/ScrollView/GenericScrollView"),
	RoleSkillInputItem_1 = require("./RoleSkillInputItem");
class RoleSkillInputPanel extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.zke = 0),
			(this.Zke = void 0),
			(this.Uco = void 0),
			(this.t2e = (e, o, t) => (
				(o = new RoleSkillInputItem_1.RoleSkillInputItem(o)).Update(e),
				o.SetBgActive(t % 2 == 0),
				{ Key: t, Value: o }
			)),
			(this.Aco = () => {
				if (
					ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()
				)
					ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
						"RoleGuideNotice01",
					);
				else if (
					FormationDataController_1.FormationDataController.GlobalIsInFight
				)
					ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
						"RoleGuideNotice06",
					);
				else if (ModelManager_1.ModelManager.GameModeModel.IsMulti)
					ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
						"RoleGuideNotice05",
					);
				else {
					var e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(
							this.zke,
						),
						o = ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(e.Name);
					const t = e.RoleGuide;
					0 === t
						? ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
								"RoleGuideNotice02",
								o,
							)
						: ((e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(94)).SetTextArgs(
								o,
							),
							e.FunctionMap.set(2, () => {
								var e =
									ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
										t,
									).FightFormationId;
								e =
									ConfigManager_1.ConfigManager.EditBattleTeamConfig.GetFightFormationConfig(
										e,
									)?.AutoRole;
								if (0 < (e?.length ?? 0)) {
									var o = new Array();
									for (const t of e)
										o.push(
											ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleIdConfigByGroupId(
												t,
											),
										);
									InstanceDungeonController_1.InstanceDungeonController.PrewarTeamFightRequest(
										t,
										o,
									);
								} else
									Log_1.Log.CheckError() &&
										Log_1.Log.Error("Role", 44, "未配置出战人物");
							}),
							ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
								e,
							));
				}
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIScrollViewWithScrollbarComponent],
			[1, UE.UITexture],
			[2, UE.UIText],
			[3, UE.UIText],
			[4, UE.UIItem],
			[5, UE.UIButtonComponent],
		]),
			(this.BtnBindInfo = [[5, this.Aco]]);
	}
	OnStart() {
		(this.Zke = new GenericScrollView_1.GenericScrollView(
			this.GetScrollViewWithScrollbar(0),
			this.t2e,
		)),
			(this.Uco = []),
			this.Uco.push(this.GetText(2)),
			this.Uco.push(this.GetText(3));
	}
	RefreshUi(e) {
		this.zke = e;
		e = ModelManager_1.ModelManager.RoleModel?.GetRoleDataById(e);
		var o =
			ConfigManager_1.ConfigManager.RoleSkillConfig.GetRoleSkillInputConfigById(
				e.GetRoleId(),
			);
		if (o) {
			var t = o.SkillInputIdList;
			this.Zke.RefreshByData(t);
			const l = this.GetTexture(1);
			l.SetUIActive(!1),
				this.SetTextureByPath(o.Icon, this.GetTexture(1), void 0, () => {
					l.SetUIActive(!0);
				}),
				this.GetItem(4).SetUIActive(void 0 !== e);
			var r = o.DescList;
			for (let e = 0; e < this.Uco.length; e++) {
				var n = this.Uco[e];
				e < r.length
					? (n.SetUIActive(!0), LguiUtil_1.LguiUtil.SetLocalTextNew(n, r[e]))
					: n.SetUIActive(!1);
			}
			(t = e.IsTrialRole()),
				(o = ModelManager_1.ModelManager.FunctionModel.IsShow(10043)),
				(e = ModelManager_1.ModelManager.FunctionModel.IsOpen(10043)),
				o && e
					? this.GetItem(4).SetUIActive(!t)
					: this.GetItem(4).SetUIActive(!1);
		}
	}
}
exports.RoleSkillInputPanel = RoleSkillInputPanel;
