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
			EventDefine_1.EEventName.OnFormationLoadCompleted,
			this.DTe,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnChangeRole,
				this.L8e,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnRoleGoDown,
				this.GNt,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.AddEntity,
				this.$Re,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.RemoveEntity,
				this.fpe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.WorldDone,
				this.MSe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.CharOnBuffAddUIDamage,
				this.NNt,
			),
			GlobalData_1.GlobalData.IsPlayInEditor &&
				EventSystem_1.EventSystem.Add(
					EventDefine_1.EEventName.OnPlatformChanged,
					this.ONt,
				),
			ModelManager_1.ModelManager.BattleUiModel.ChildViewData.AddCallback(
				16,
				this.e$e,
			);
	}
	static RemoveEvents() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnFormationLoadCompleted,
			this.DTe,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnChangeRole,
				this.L8e,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnRoleGoDown,
				this.GNt,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.AddEntity,
				this.$Re,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.RemoveEntity,
				this.fpe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.WorldDone,
				this.MSe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.CharOnBuffAddUIDamage,
				this.NNt,
			),
			GlobalData_1.GlobalData.IsPlayInEditor &&
				EventSystem_1.EventSystem.Remove(
					EventDefine_1.EEventName.OnPlatformChanged,
					this.ONt,
				),
			ModelManager_1.ModelManager.BattleUiModel.ChildViewData.RemoveCallback(
				16,
				this.e$e,
			);
	}
	static uKe(e) {
		EventSystem_1.EventSystem.HasWithTarget(
			e,
			EventDefine_1.EEventName.CharBeDamage,
			this.kNt,
		) ||
			EventSystem_1.EventSystem.AddWithTarget(
				e,
				EventDefine_1.EEventName.CharBeDamage,
				this.kNt,
			);
	}
	static cKe(e) {
		EventSystem_1.EventSystem.HasWithTarget(
			e,
			EventDefine_1.EEventName.CharBeDamage,
			this.kNt,
		) &&
			EventSystem_1.EventSystem.RemoveWithTarget(
				e,
				EventDefine_1.EEventName.CharBeDamage,
				this.kNt,
			);
	}
}
((exports.DamageUiController = DamageUiController).MSe = () => {
	DamageUiManager_1.DamageUiManager.PreloadSequence();
}),
	(DamageUiController.DTe = () => {
		var e = ModelManager_1.ModelManager.FormationModel.GetCurrentEntity;
		DamageUiController.uKe(e.Entity);
	}),
	(DamageUiController.L8e = () => {
		var e = ModelManager_1.ModelManager.FormationModel.GetCurrentEntity;
		DamageUiController.uKe(e.Entity);
	}),
	(DamageUiController.GNt = (e) => {
		e = EntitySystem_1.EntitySystem.Get(e);
		e && DamageUiController.cKe(e);
	}),
	(DamageUiController.$Re = (e, t, a) => {
		DamageUiController.uKe(t.Entity);
	}),
	(DamageUiController.fpe = (e, t) => {
		DamageUiController.cKe(t.Entity);
	}),
	(DamageUiController.kNt = (e, t, a, n, i, r, _) => {
		switch (n.CalculateType) {
			case 0:
				ModelManager_1.ModelManager.BattleUiModel.ExploreModeData.BeHit(t),
					DamageUiManager_1.DamageUiManager.ApplyDamage(
						a,
						n.Element,
						_,
						t,
						i.IsCritical,
						!1,
						n.DamageTextType,
						i.IsImmune ? BattleUiDefine_1.IMMUNITY_DAMAGE_TEXT : "",
					);
				break;
			case 1:
				var s = t.GetComponent(3);
				DamageUiManager_1.DamageUiManager.ApplyDamage(
					-a,
					0,
					s.ActorLocation,
					t,
					!1,
					!0,
					n.DamageTextType,
				);
		}
	}),
	(DamageUiController.NNt = (e, t, a) => {
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
	(DamageUiController.ONt = () => {
		DamageUiManager_1.DamageUiManager.OnEditorPlatformChanged();
	}),
	(DamageUiController.e$e = () => {
		var e = UiLayer_1.UiLayer.GetBattleViewUnit(0),
			t =
				ModelManager_1.ModelManager.BattleUiModel.ChildViewData.GetChildVisible(
					16,
				);
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug("Battle", 18, "设置伤害数字可见性", ["visible", t]),
			e.SetUIActive(t);
	});
//# sourceMappingURL=DamageUiController.js.map
