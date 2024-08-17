"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FormationDataController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
	ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	PlayerEntity_1 = require("../../NewWorld/Player/PlayerEntity");
class FormationDataController extends ControllerBase_1.ControllerBase {
	static get Model() {
		return ModelManager_1.ModelManager.FormationDataModel;
	}
	static OnTick(t) {
		this.ZBe(), this.Model?.RefreshOnLandPosition();
	}
	static OnLeaveLevel() {
		return this.NotifyInFight(!1), !0;
	}
	static get GlobalIsInFight() {
		return this.wK;
	}
	static set GlobalIsInFight(t) {
		this.wK = t;
	}
	static SetTimeDilation(t) {
		for (const e of this.ebe.values()) e.IsInit && e.SetTimeDilation(t);
	}
	static CreatePlayerEntity(t) {
		var e = EntitySystem_1.EntitySystem.Create(
			PlayerEntity_1.PlayerEntity,
			void 0,
			{ PlayerId: t },
		);
		if (e)
			return (
				EntitySystem_1.EntitySystem.Init(e),
				EntitySystem_1.EntitySystem.Start(e),
				EntitySystem_1.EntitySystem.Activate(e),
				this.ebe.set(t, e),
				e
			);
	}
	static GetPlayerEntity(t) {
		return this.ebe.get(t);
	}
	static RefreshPlayerEntities(t) {
		for (const t of this.ebe.values())
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Character", 20, "清除编队实体", [
					"PlayerId",
					t.PlayerId,
				]),
				EntitySystem_1.EntitySystem.Destroy(t);
		this.ebe.clear();
		for (const e of t)
			this.CreatePlayerEntity(e.aFn)
				?.GetComponent(180)
				?.AddInitPlayerBuff(e.jEs);
	}
	static MarkAggroDirty() {
		this.tbe = !0;
	}
	static ZBe() {
		if (this.tbe) {
			this.tbe = !1;
			var t =
				ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity?.GetComponent(
					158,
				)?.GetAggroSet();
			const o = this.Model.PlayerAggroSet;
			(this.ibe.length = 0),
				(this.bie.length = 0),
				t?.forEach((t) => {
					o.has(t) || this.ibe.push(t);
				});
			for (const e of o.values()) t?.has(e) || this.bie.push(e);
			for (const t of this.ibe) this.Model.PlayerAggroSet.add(t);
			for (const t of this.bie) this.Model.PlayerAggroSet.delete(t);
			for (const t of this.ibe) {
				EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAggroAdd, t);
				var e = EntitySystem_1.EntitySystem.Get(t)
					?.GetComponent(0)
					?.GetBaseInfo();
				!e ||
					(3 !== (e = e.Category.MonsterMatchType) && 2 !== e) ||
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.OnBossFight,
						t,
					);
			}
			for (const t of this.bie)
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.OnAggroRemoved,
					t,
				);
		}
	}
	static NotifyInFight(t) {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("Battle", 25, "NotifyInFight: " + t),
			FormationDataController.wK !== t &&
				((FormationDataController.wK = t),
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.OnBattleStateChanged,
					t,
				));
	}
	static AddPlayerTag(t, e) {
		var o = this.GetPlayerEntity(t)?.GetComponent(181);
		o
			? o?.AddTag(e)
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error("Battle", 20, "找不到对应的PlayerTag组件", [
					"PlayerId",
					t,
				]);
	}
	static RemovePlayerTag(t, e) {
		var o = this.GetPlayerEntity(t)?.GetComponent(181);
		o
			? o?.RemoveTag(e)
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error("Battle", 20, "找不到对应的PlayerTag组件", [
					"PlayerId",
					t,
				]);
	}
	static GetPlayerTagCount(t, e) {
		var o = this.GetPlayerEntity(t)?.GetComponent(181);
		return o
			? o?.GetTagCountById(e) ?? 0
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error("Battle", 20, "找不到对应的PlayerTag组件", [
						"PlayerId",
						t,
					]),
				0);
	}
	static HasPlayerTag(t, e) {
		var o = this.GetPlayerEntity(t)?.GetComponent(181);
		return o
			? o?.HasTag(e) ?? !1
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error("Battle", 20, "找不到对应的PlayerTag组件", [
						"PlayerId",
						t,
					]),
				!1);
	}
}
((exports.FormationDataController = FormationDataController).ebe = new Map()),
	(FormationDataController.ibe = []),
	(FormationDataController.bie = []),
	(FormationDataController.tbe = !1),
	(FormationDataController.wK = !1);
