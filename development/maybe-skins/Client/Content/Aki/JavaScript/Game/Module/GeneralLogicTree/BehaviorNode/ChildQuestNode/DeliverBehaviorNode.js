"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.DeliverBehaviorNode = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	ItemDeliverController_1 = require("../../../ItemDeliver/ItemDeliverController"),
	ChildQuestNodeBase_1 = require("./ChildQuestNodeBase");
class DeliverBehaviorNode extends ChildQuestNodeBase_1.ChildQuestNodeBase {
	constructor() {
		super(...arguments),
			(this.FQt = 0),
			(this.VQt = void 0),
			(this.HQt = void 0),
			(this.jQt = void 0),
			(this.ts = ""),
			(this.HGe = void 0),
			(this.CanRepeat = !1),
			(this.PQt = []),
			(this.WQt = (e) => {
				if (this.VQt && this.VQt.Option.Guid === e)
					if (
						(e = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
							this.FQt,
						))
					) {
						let t = "";
						e && (t = e.Entity.GetComponent(102)?.PawnName ?? ""),
							this.HQt
								? ItemDeliverController_1.ItemDeliverController.OpenItemDeliverViewByHandInItem(
										this.HQt,
										t,
										this.HGe,
										this.ts,
										this.Context,
									)
								: this.jQt &&
									ItemDeliverController_1.ItemDeliverController.OpenItemDeliverViewByHandInGroup(
										this.jQt,
										t,
										this.HGe,
										this.ts,
										this.Context,
									);
					} else
						Log_1.Log.CheckError() &&
							Log_1.Log.Error("Quest", 8, "交付道具的NPC不存在", [
								"实体Id",
								this.FQt,
							]);
			});
	}
	get CorrelativeEntities() {
		return this.PQt;
	}
	OnCreate(e) {
		var t;
		return (
			!!super.OnCreate(e) &&
			"HandInItems" === (e = e.Condition).Type &&
			("Actions" !== (t = e.AddOption).Option.Type.Type
				? (Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Quest",
							19,
							"交付道具任务配置的交互类型错误，应配置行为序列类型的交互",
						),
					!1)
				: ((this.HQt = e.HandInItems.Items),
					(this.jQt = e.HandInItems.GroupConfig),
					(this.ts = e.HandInItems.TidDescText),
					(this.HGe = e.HandInItems.TidTitleText),
					(this.CanRepeat = e.HandInItems.RepeatItems),
					(this.FQt = t.EntityId),
					(this.VQt = t),
					(this.PQt = [t.EntityId]),
					!0))
		);
	}
	OnDestroy() {
		(this.VQt = void 0), (this.HQt = void 0), super.OnDestroy();
	}
	AddEventsOnChildQuestStart() {
		super.AddEventsOnChildQuestStart(),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.DynamicInteractServerResponse,
				this.WQt,
			);
	}
	RemoveEventsOnChildQuestEnd() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.DynamicInteractServerResponse,
			this.WQt,
		),
			super.RemoveEventsOnChildQuestEnd();
	}
}
exports.DeliverBehaviorNode = DeliverBehaviorNode;
