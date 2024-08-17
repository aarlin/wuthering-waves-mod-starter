"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TowerRecommendItem = void 0);
const UE = require("ue"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiManager_1 = require("../../../Ui/UiManager"),
	MediumItemGrid_1 = require("../../Common/MediumItemGrid/MediumItemGrid"),
	EditBattleTeamController_1 = require("../../EditBattleTeam/EditBattleTeamController"),
	GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
	GenericLayoutNew_1 = require("../../Util/Layout/GenericLayoutNew"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	PERCENT = 0.01;
class TowerRecommendItem extends GridProxyAbstract_1.GridProxyAbstract {
	constructor() {
		super(),
			(this.Nke = void 0),
			(this.rDo = void 0),
			(this.Hke = (e, t, o) => {
				var r = new MediumItemGrid_1.MediumItemGrid();
				r.Initialize(t.GetOwner()),
					(t = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e.l3n)),
					(t = {
						Type: 2,
						ItemConfigId: e.l3n,
						BottomTextId: "Text_LevelShow_Text",
						BottomTextParameter: [e.r3n],
						ElementId: t.ElementId,
						IsDisable: !this.nDo(e),
					});
				return r.Apply(t), { Key: o, Value: r };
			}),
			(this.sDo = () => {
				EditBattleTeamController_1.EditBattleTeamController.SetEditBattleTeamByRoleId(
					this.rDo,
				),
					UiManager_1.UiManager.CloseView("TowerRecommendView");
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIButtonComponent],
			[1, UE.UIInteractionGroup],
			[2, UE.UIText],
			[3, UE.UIText],
			[4, UE.UIHorizontalLayout],
		]),
			(this.BtnBindInfo = [[0, this.sDo]]);
	}
	OnStart() {
		this.rDo = [];
	}
	Refresh(e, t, o) {
		this.GetText(2).SetText("" + (o + 1)),
			LguiUtil_1.LguiUtil.SetLocalTextNew(
				this.GetText(3),
				"Text_ExplorationDegree_Text",
				MathUtils_1.MathUtils.GetFloatPointFloorString(0.01 * e.obs, 2),
			),
			(this.Nke = new GenericLayoutNew_1.GenericLayoutNew(
				this.GetHorizontalLayout(4),
				this.Hke,
			));
		var r = [];
		for (const t of e.SVn) r.push(t);
		r.sort((e, t) => {
			var o, r;
			return e.r3n === t.r3n
				? (o = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(
						e.l3n,
					).QualityId) ===
					(r = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(
						t.l3n,
					).QualityId)
					? t.l3n - e.l3n
					: r - o
				: t.r3n - e.r3n;
		}),
			this.Nke.RebuildLayoutByDataNew(r);
	}
	nDo(e) {
		if (((e = e.l3n), ModelManager_1.ModelManager.RoleModel.IsMainRole(e))) {
			var t = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerRoleId();
			if (
				ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e)?.ElementId !==
				ModelManager_1.ModelManager.RoleModel.GetRoleDataById(
					t,
				)?.GetElementInfo()?.Id
			)
				return this.GetInteractionGroup(1).SetInteractable(!1), !1;
			this.rDo.push(t);
		} else {
			if (!ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e))
				return this.GetInteractionGroup(1).SetInteractable(!1), !1;
			this.rDo.push(e);
		}
		return !0;
	}
	OnBeforeDestroy() {
		(this.rDo.length = 0), (this.Nke = void 0);
	}
}
exports.TowerRecommendItem = TowerRecommendItem;
