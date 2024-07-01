"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BattleUiControl = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	Stats_1 = require("../../../Core/Common/Stats"),
	ObjectSystem_1 = require("../../../Core/Object/ObjectSystem"),
	CameraController_1 = require("../../Camera/CameraController"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	LocalStorage_1 = require("../../Common/LocalStorage"),
	LocalStorageDefine_1 = require("../../Common/LocalStorageDefine"),
	InputSettingsManager_1 = require("../../InputSettings/InputSettingsManager"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
	UiLayerType_1 = require("../../Ui/Define/UiLayerType"),
	InputDistributeController_1 = require("../../Ui/InputDistribute/InputDistributeController"),
	InputMappingsDefine_1 = require("../../Ui/InputDistribute/InputMappingsDefine"),
	UiLayer_1 = require("../../Ui/UiLayer"),
	UiManager_1 = require("../../Ui/UiManager"),
	DamageUiManager_1 = require("../DamageUi/DamageUiManager"),
	SceneTeamController_1 = require("../SceneTeam/SceneTeamController"),
	BattleUiModel_1 = require("./BattleUiModel"),
	BattleUiPool_1 = require("./BattleUiPool");
class BattleUiControl extends UiControllerBase_1.UiControllerBase {
	static OnClear() {
		return this.Pool.Clear(), !0;
	}
	static OnLeaveLevel() {
		return (
			UiManager_1.UiManager.IsViewOpen("BattleView") &&
				UiManager_1.UiManager.CloseView("BattleView"),
			this.Pool.Clear(),
			!0
		);
	}
	static OnAddEvents() {
		EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, this.nye),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnChangeRole,
				this.xie,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.AddEntity,
				this.GUe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.RemoveEntity,
				this.zpe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.RoleLevelUp,
				this.mKe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnPlatformChanged,
				this.dKe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnFunctionOpenSet,
				this.CKe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnFunctionOpenUpdate,
				this.gKe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnRevive,
				this.fKe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.CharOnBuffAddUIPrefab,
				this.pKe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnUpdateSceneTeam,
				this.tje,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnRefreshOnlineTeamList,
				this.tje,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnChangeWalkOrRun,
				this.vKe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.SetImageQuality,
				this.MKe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.SetResolution,
				this.MKe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.SetDisplayMode,
				this.MKe,
			);
		var e =
			ModelManager_1.ModelManager.BattleUiModel.ExploreModeData.GetActionNames();
		InputDistributeController_1.InputDistributeController.BindActions(
			e,
			this.bMe,
		),
			(e =
				ModelManager_1.ModelManager.BattleUiModel.FormationPanelData.GetActionNames());
		InputDistributeController_1.InputDistributeController.BindActions(
			e,
			this.$yn,
		),
			ModelManager_1.ModelManager.BattleUiModel.ChildViewData.AddCallback(
				0,
				this.SKe,
			),
			ModelManager_1.ModelManager.BattleUiModel.ChildViewData.AddCallback(
				18,
				this.EKe,
			);
	}
	static OnRemoveEvents() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.WorldDone,
			this.nye,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnChangeRole,
				this.xie,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.AddEntity,
				this.GUe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.RemoveEntity,
				this.zpe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.RoleLevelUp,
				this.mKe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnPlatformChanged,
				this.dKe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnFunctionOpenSet,
				this.CKe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnFunctionOpenUpdate,
				this.gKe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnRevive,
				this.fKe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.CharOnBuffAddUIPrefab,
				this.pKe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnUpdateSceneTeam,
				this.tje,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnRefreshOnlineTeamList,
				this.tje,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnChangeWalkOrRun,
				this.vKe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.SetImageQuality,
				this.MKe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.SetResolution,
				this.MKe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.SetDisplayMode,
				this.MKe,
			);
		var e =
			ModelManager_1.ModelManager.BattleUiModel.ExploreModeData.GetActionNames();
		InputDistributeController_1.InputDistributeController.UnBindActions(
			e,
			this.bMe,
		),
			(e =
				ModelManager_1.ModelManager.BattleUiModel.FormationPanelData.GetActionNames());
		InputDistributeController_1.InputDistributeController.UnBindActions(
			e,
			this.$yn,
		),
			ModelManager_1.ModelManager.BattleUiModel.ChildViewData.RemoveCallback(
				0,
				this.SKe,
			),
			ModelManager_1.ModelManager.BattleUiModel.ChildViewData.RemoveCallback(
				18,
				this.EKe,
			);
	}
	static async PreloadBattleViewFromLoading() {
		return (
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("Battle", 18, "battleView preload start"),
			await this.Pool.Init(),
			await ModelManager_1.ModelManager.BattleUiModel.Preload(),
			(BattleUiControl.yKe =
				await UiManager_1.UiManager.PreOpenViewAsync("BattleView")),
			DamageUiManager_1.DamageUiManager.PreloadDamageView(),
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("Battle", 18, "battleView preload end"),
			!0
		);
	}
	static async OpenBattleViewFromLoading() {
		return (
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("Battle", 18, "battleView open start"),
			(await UiManager_1.UiManager.OpenViewAfterPreOpenedAsync(
				BattleUiControl.yKe,
			)) || (await UiManager_1.UiManager.OpenViewAsync("BattleView")),
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("Battle", 18, "battleView open end"),
			!0
		);
	}
	static IKe() {
		EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ShowHUD);
	}
	static TKe() {
		EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.HideHUD);
	}
	static AddFullScreenEffect(e, t) {
		return ModelManager_1.ModelManager.BattleUiModel.AddFullScreenEffect(e, t);
	}
	static RemoveFullScreenEffect(e) {
		ModelManager_1.ModelManager.BattleUiModel.RemoveFullScreenEffect(e);
	}
	static RemoveFullScreenEffectByUniqueId(e) {
		ModelManager_1.ModelManager.BattleUiModel.RemoveFullScreenEffectByUniqueId(
			e,
		);
	}
	static SetBattleViewVisible(e) {
		!this.LKe.delete(e) ||
			0 < this.LKe.size ||
			ModelManager_1.ModelManager.BattleUiModel.ChildViewData.ShowBattleView(9);
	}
	static SetBattleViewDisable() {
		return (
			ModelManager_1.ModelManager.BattleUiModel.ChildViewData.HideBattleView(9),
			this.DKe++,
			this.LKe.add(this.DKe),
			this.DKe
		);
	}
	static FocusToTargetLocation(e) {
		var t =
				ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity.GetComponent(
					3,
				).ActorLocationProxy,
			n = ModelManager_1.ModelManager.BattleUiModel;
		CameraController_1.CameraController.FightCamera.LogicComponent.PlayCameraRotatorWithCurve(
			t,
			e,
			n.CursorCameraRotatorOffset,
			n.CursorCameraRotationTime,
		);
	}
	static ResetFocus() {
		var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
		e?.Valid && e.Entity.GetComponent(29).ResetFocus();
	}
}
(exports.BattleUiControl = BattleUiControl),
	((_a = BattleUiControl).RKe = void 0),
	(BattleUiControl.Model = BattleUiModel_1.BattleUiModel),
	(BattleUiControl.Pool = new BattleUiPool_1.BattleUiPool()),
	(BattleUiControl.DKe = 0),
	(BattleUiControl.LKe = new Set()),
	(BattleUiControl.nye = () => {
		ModelManager_1.ModelManager.BattleUiModel.OnWorldDone();
	}),
	(BattleUiControl.xie = (e, t) => {
		ModelManager_1.ModelManager.BattleUiModel.OnChangeRole(e, t);
	}),
	(BattleUiControl.GUe = (e, t) => {
		ModelManager_1.ModelManager.BattleUiModel.OnAddEntity(t);
	}),
	(BattleUiControl.zpe = (e, t) => {
		ModelManager_1.ModelManager.BattleUiModel.OnRemoveEntity(t);
	}),
	(BattleUiControl.fKe = (e) => {
		ObjectSystem_1.ObjectSystem.IsValid(e) &&
			ModelManager_1.ModelManager.BattleUiModel.TryBroadcastRevive(e.Id);
	}),
	(BattleUiControl.mKe = (e, t, n) => {
		ModelManager_1.ModelManager.BattleUiModel.TryBroadcastRoleLevelUpData(
			e,
			t,
			n,
		);
	}),
	(BattleUiControl.dKe = (e, t, n, a) => {
		t !== n &&
			UiManager_1.UiManager.IsViewOpen("BattleView") &&
			UiManager_1.UiManager.CloseView("BattleView", () => {
				UiManager_1.UiManager.OpenView("BattleView");
			});
	}),
	(BattleUiControl.CKe = (e, t) => {
		(10016 !== e && !t) ||
			(Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Battle",
					8,
					"当唤鸣者招募处解锁状态登录设置时，广播红点时间检查红点",
				),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnFirstOpenShopChanged,
			));
	}),
	(BattleUiControl.gKe = (e, t) => {
		(10016 !== e && !t) ||
			(LocalStorage_1.LocalStorage.SetPlayer(
				LocalStorageDefine_1.ELocalStoragePlayerKey.FirstOpenShop,
				!0,
			),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnFirstOpenShopChanged,
			));
	}),
	(BattleUiControl.pKe = (e, t, n) => {
		var a = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
		a?.Valid &&
			a.Id === e &&
			((a = t.Id),
			n
				? (e = BattleUiControl.AddFullScreenEffect(t.Path, a)) &&
					((n = UiLayer_1.UiLayer.UiRootItem),
					e.SetFloatParameter("Sprite_X", n.Width),
					e.SetFloatParameter("Sprite_Y", n.Height))
				: BattleUiControl.RemoveFullScreenEffectByUniqueId(a));
	}),
	(BattleUiControl.tje = () => {
		ModelManager_1.ModelManager.BattleUiModel.OnFormationLoaded();
	}),
	(BattleUiControl.vKe = (e, t) => {
		ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Valid &&
			!ModelManager_1.ModelManager.PlatformModel.IsMobile() &&
			1 !== ModelManager_1.ModelManager.PlatformModel.InputController &&
			e !== t &&
			((e = InputSettingsManager_1.InputSettingsManager.GetActionBinding(
				InputMappingsDefine_1.actionMappings.走跑切换,
			)
				?.GetCurrentPlatformKey()
				?.GetKeyIconPath()),
			t
				? ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
						"ChangeWalk",
						`<texture=${e}/>`,
					)
				: ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
						"ChangeRun",
						`<texture=${e}/>`,
					));
	}),
	(BattleUiControl.MKe = () => {
		ModelManager_1.ModelManager.BattleUiModel.UpdateViewPortSize();
	}),
	(BattleUiControl.bMe = (e, t) => {
		ModelManager_1.ModelManager.BattleUiModel.ExploreModeData.InputAction(
			e,
			0 === t,
		);
	}),
	(BattleUiControl.$yn = (e, t) => {
		if (0 === t) {
			let n = -1;
			switch (e) {
				case InputMappingsDefine_1.actionMappings.切换角色1:
					n = 1;
					break;
				case InputMappingsDefine_1.actionMappings.切换角色2:
					n = 2;
					break;
				case InputMappingsDefine_1.actionMappings.切换角色3:
					n = 3;
					break;
				case InputMappingsDefine_1.actionMappings.切换角色4:
					n = 4;
			}
			n < 0 ||
				((t =
					ModelManager_1.ModelManager.BattleUiModel.FormationPanelData?.GetItemData(
						n,
					)?.CreatureDataId ?? 0),
				SceneTeamController_1.SceneTeamController.TryChangeRoleOrQte(t));
		}
	}),
	(BattleUiControl.yKe = void 0),
	(BattleUiControl.SKe = () => {
		ModelManager_1.ModelManager.BattleUiModel.ChildViewData.GetChildVisible(0)
			? _a.IKe()
			: _a.TKe();
	}),
	(BattleUiControl.EKe = () => {
		var e =
			ModelManager_1.ModelManager.BattleUiModel.ChildViewData.GetChildVisible(
				18,
			);
		UiLayer_1.UiLayer.GetFloatUnit(
			UiLayerType_1.ELayerType.BattleFloat,
			0,
		).SetUIActive(e),
			UiLayer_1.UiLayer.GetFloatUnit(
				UiLayerType_1.ELayerType.BattleFloat,
				1,
			).SetUIActive(e);
	});
