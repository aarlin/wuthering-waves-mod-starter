"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SkillButtonUiController = void 0);
const Stats_1 = require("../../../Core/Common/Stats"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
	InputDistributeController_1 = require("../../Ui/InputDistribute/InputDistributeController"),
	InputMappingsDefine_1 = require("../../Ui/InputDistribute/InputMappingsDefine");
class SkillButtonUiController extends UiControllerBase_1.UiControllerBase {
	static OnInit() {
		return !0;
	}
	static OnClear() {
		return !0;
	}
	static OnAddEvents() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnChangeRole,
			this.xie,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnUpdateSceneTeam,
				this.kpe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnPlatformChanged,
				this.dKe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.RemoveEntity,
				this.zpe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnMultiSkillIdChanged,
				this.xEo,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnMultiSkillEnable,
				this.wEo,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnChangeSelectedExploreId,
				this.DYe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.CharSkillCountChanged,
				this.BEo,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.CharSkillRemainCdChanged,
				this.bEo,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnAimStateChanged,
				this.gZe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnActionKeyChanged,
				this.c_t,
			),
			ModelManager_1.ModelManager.PlatformModel?.IsMobile() ||
				(EventSystem_1.EventSystem.Add(
					EventDefine_1.EEventName.OpenView,
					this.UKe,
				),
				EventSystem_1.EventSystem.Add(
					EventDefine_1.EEventName.CloseView,
					this.$Ge,
				)),
			InputDistributeController_1.InputDistributeController.BindAction(
				InputMappingsDefine_1.actionMappings.组合主键,
				this.gze,
			);
	}
	static OnRemoveEvents() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnChangeRole,
			this.xie,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnUpdateSceneTeam,
				this.kpe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnPlatformChanged,
				this.dKe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.RemoveEntity,
				this.zpe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnMultiSkillIdChanged,
				this.xEo,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnMultiSkillEnable,
				this.wEo,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnChangeSelectedExploreId,
				this.DYe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.CharSkillCountChanged,
				this.BEo,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.CharSkillRemainCdChanged,
				this.bEo,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnAimStateChanged,
				this.gZe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnActionKeyChanged,
				this.c_t,
			),
			EventSystem_1.EventSystem.Has(
				EventDefine_1.EEventName.OpenView,
				this.UKe,
			) &&
				EventSystem_1.EventSystem.Remove(
					EventDefine_1.EEventName.OpenView,
					this.UKe,
				),
			EventSystem_1.EventSystem.Has(
				EventDefine_1.EEventName.CloseView,
				this.$Ge,
			) &&
				EventSystem_1.EventSystem.Remove(
					EventDefine_1.EEventName.CloseView,
					this.$Ge,
				),
			InputDistributeController_1.InputDistributeController.UnBindAction(
				InputMappingsDefine_1.actionMappings.组合主键,
				this.gze,
			);
	}
	static qEo(e, t = 4) {
		var n = 2 === ModelManager_1.ModelManager.PlatformModel.OperationType;
		ModelManager_1.ModelManager.SkillButtonUiModel.RefreshSkillButtonData(
			e,
			n,
			t,
		);
	}
	static GetRoleId(e) {
		var t;
		return (e = e.GetComponent(0))
			? ((e = e.GetRoleId()),
				(t = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e))
					? t.GetRoleId()
					: e)
			: 0;
	}
}
((exports.SkillButtonUiController = SkillButtonUiController).RKe = void 0),
	(SkillButtonUiController.xEo = (e, t, n) => {
		ModelManager_1.ModelManager.SkillButtonUiModel.ExecuteMultiSkillIdChanged(
			e,
			t,
			n,
		);
	}),
	(SkillButtonUiController.wEo = (e, t, n) => {
		ModelManager_1.ModelManager.SkillButtonUiModel.ExecuteMultiSkillEnable(
			e,
			t,
			n,
		);
	}),
	(SkillButtonUiController.xie = (e, t) => {
		SkillButtonUiController.qEo(e, 1);
	}),
	(SkillButtonUiController.kpe = () => {
		ModelManager_1.ModelManager.SkillButtonUiModel.CreateAllSkillButtonEntityData();
	}),
	(SkillButtonUiController.dKe = (e, t, n) => {
		var l = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
		l && SkillButtonUiController.qEo(l);
	}),
	(SkillButtonUiController.zpe = (e, t) => {
		ModelManager_1.ModelManager.SkillButtonUiModel.OnRemoveEntity(t);
	}),
	(SkillButtonUiController.DYe = () => {
		ModelManager_1.ModelManager.SkillButtonUiModel.RefreshSkillButtonExplorePhantomSkillId(
			7,
		);
	}),
	(SkillButtonUiController.BEo = (e) => {
		ModelManager_1.ModelManager.SkillButtonUiModel.OnSkillCdChanged(e);
	}),
	(SkillButtonUiController.bEo = (e) => {
		ModelManager_1.ModelManager.SkillButtonUiModel.OnSkillCdChanged(e);
	}),
	(SkillButtonUiController.gZe = () => {
		ModelManager_1.ModelManager.SkillButtonUiModel.OnAimStateChanged();
	}),
	(SkillButtonUiController.c_t = (e) => {
		ModelManager_1.ModelManager.SkillButtonUiModel.OnActionKeyChanged(e);
	}),
	(SkillButtonUiController.UKe = (e) => {
		"MenuView" === e &&
			ModelManager_1.ModelManager.SkillButtonUiModel.OnOpenMenuView();
	}),
	(SkillButtonUiController.$Ge = (e) => {
		"MenuView" === e &&
			ModelManager_1.ModelManager.SkillButtonUiModel.OnCloseMenuView();
	}),
	(SkillButtonUiController.gze = (e, t) => {
		(t = 0 === t),
			ModelManager_1.ModelManager.SkillButtonUiModel.GamepadData?.SetIsPressCombineButton(
				t,
			),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.BattleUiPressCombineButtonChanged,
				t,
			);
	});
