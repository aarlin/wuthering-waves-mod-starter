"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.DamageUiController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
	ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	GlobalData_1 = require("../../GlobalData"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	UiLayer_1 = require("../../Ui/UiLayer"),
	BattleUiDefine_1 = require("../BattleUi/BattleUiDefine"),
	DamageUiManager_1 = require("./DamageUiManager");
class DamageUiController extends ControllerBase_1.ControllerBase {
	static OnInit() {
		return DamageUiManager_1.DamageUiManager.Initialize(), this.AddEvents(), !0;
	}
	static OnClear() {
		return (
			this.RemoveEvents(),
			DamageUiManager_1.DamageUiManager.Clear(),
			DamageUiManager_1.DamageUiManager.ClearDamageViewData(),
			!0
		);
	}
	static OnLeaveLevel() {
		return DamageUiManager_1.DamageUiManager.OnLeaveLevel(), !0;
	}
	static OnTick(e) {
		DamageUiManager_1.DamageUiManager.Tick(e);
	}
	static AddEvents() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnUpdateSceneTeam,
			this.tje,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnChangeRole,
				this.o7e,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnRoleGoDown,
				this.bkt,
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
				EventDefine_1.EEventName.WorldDone,
				this.nye,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.CharOnBuffAddUIDamage,
				this.qkt,
			),
			GlobalData_1.GlobalData.IsPlayInEditor &&
				EventSystem_1.EventSystem.Add(
					EventDefine_1.EEventName.OnPlatformChanged,
					this.Gkt,
				),
			ModelManager_1.ModelManager.BattleUiModel.ChildViewData.AddCallback(
				16,
				this.j$e,
			);
	}
	static RemoveEvents() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnUpdateSceneTeam,
			this.tje,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnChangeRole,
				this.o7e,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnRoleGoDown,
				this.bkt,
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
				EventDefine_1.EEventName.WorldDone,
				this.nye,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.CharOnBuffAddUIDamage,
				this.qkt,
			),
			GlobalData_1.GlobalData.IsPlayInEditor &&
				EventSystem_1.EventSystem.Remove(
					EventDefine_1.EEventName.OnPlatformChanged,
					this.Gkt,
				),
			ModelManager_1.ModelManager.BattleUiModel.ChildViewData.RemoveCallback(
				16,
				this.j$e,
			);
	}
	static eXe(e) {
		EventSystem_1.EventSystem.HasWithTarget(
			e,
			EventDefine_1.EEventName.CharBeDamage,
			this.Nkt,
		) ||
			EventSystem_1.EventSystem.AddWithTarget(
				e,
				EventDefine_1.EEventName.CharBeDamage,
				this.Nkt,
			);
	}
	static tXe(e) {
		EventSystem_1.EventSystem.HasWithTarget(
			e,
			EventDefine_1.EEventName.CharBeDamage,
			this.Nkt,
		) &&
			EventSystem_1.EventSystem.RemoveWithTarget(
				e,
				EventDefine_1.EEventName.CharBeDamage,
				this.Nkt,
			);
	}
}
((exports.DamageUiController = DamageUiController).nye = () => {
	DamageUiManager_1.DamageUiManager.PreloadSequence();
}),
	(DamageUiController.tje = () => {
		var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
		e && DamageUiController.eXe(e.Entity);
	}),
	(DamageUiController.o7e = () => {
		var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
		e && DamageUiController.eXe(e.Entity);
	}),
	(DamageUiController.bkt = (e) => {
		(e = EntitySystem_1.EntitySystem.Get(e)) && DamageUiController.tXe(e);
	}),
	(DamageUiController.GUe = (e, t, a) => {
		DamageUiController.eXe(t.Entity);
	}),
	(DamageUiController.zpe = (e, t) => {
		DamageUiController.tXe(t.Entity);
	}),
	(DamageUiController.Nkt = (e, t, a, n, i, r, m) => {
		switch (n.CalculateType) {
			case 0:
				ModelManager_1.ModelManager.BattleUiModel.ExploreModeData.BeHit(t),
					DamageUiManager_1.DamageUiManager.ApplyDamage(
						a,
						n.Element,
						m,
						t,
						i.IsCritical,
						!1,
						n.DamageTextType,
						i.IsImmune ? BattleUiDefine_1.IMMUNITY_DAMAGE_TEXT : "",
					);
				break;
			case 1:
				var o = t.GetComponent(3);
				DamageUiManager_1.DamageUiManager.ApplyDamage(
					-a,
					0,
					o.ActorLocation,
					t,
					!1,
					!0,
					n.DamageTextType,
				);
		}
	}),
	(DamageUiController.qkt = (e, t, a) => {
		a &&
			((e = (a = EntitySystem_1.EntitySystem.Get(e)).GetComponent(3)),
			DamageUiManager_1.DamageUiManager.ApplyDamage(
				-1,
				0,
				e.ActorLocation,
				a,
				!1,
				!0,
				Number(t.Parameters[0]),
				t.Parameters[1],
			));
	}),
	(DamageUiController.Gkt = () => {
		DamageUiManager_1.DamageUiManager.OnEditorPlatformChanged();
	}),
	(DamageUiController.j$e = () => {
		var e = UiLayer_1.UiLayer.GetBattleViewUnit(0),
			t =
				ModelManager_1.ModelManager.BattleUiModel.ChildViewData.GetChildVisible(
					16,
				);
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug("Battle", 18, "设置伤害数字可见性", ["visible", t]),
			e.SetUIActive(t);
	});
