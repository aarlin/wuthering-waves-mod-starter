"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.OpenSystemFeed = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	FeedingAnimalById_1 = require("../../../../Core/Define/ConfigQuery/FeedingAnimalById"),
	EntitySystem_1 = require("../../../../Core/Entity/EntitySystem"),
	ObjectSystem_1 = require("../../../../Core/Object/ObjectSystem"),
	ItemDeliverController_1 = require("../../../Module/ItemDeliver/ItemDeliverController"),
	LevelGeneralContextDefine_1 = require("../../LevelGeneralContextDefine"),
	OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemFeed extends OpenSystemBase_1.OpenSystemBase {
	async ExecuteOpenView(e, t) {
		var n, r, i, o;
		return (
			t instanceof LevelGeneralContextDefine_1.EntityContext &&
			((o = EntitySystem_1.EntitySystem.Get(t.EntityId)),
			ObjectSystem_1.ObjectSystem.IsValid(o)
				? ((n = FeedingAnimalById_1.configFeedingAnimalById.GetConfig(
						e.BoardId,
					)),
					(r = new Array()),
					((i = {
						HandInType: "ItemIds",
						ItemIds: new Array(),
						Count: 1,
					}).ItemIds = i.ItemIds.concat(n.ItemIds)),
					r.push(i),
					(i = ""),
					(i = o.GetComponent(102)?.PawnName ?? ""),
					(o = o.GetComponent(154))
						? (o.InitFeedingAnimalConfig(n.ItemIds, n.GameplayTags),
							o.SetUiOpenPerformance(this.GetViewName(e), e.BoardId),
							ItemDeliverController_1.ItemDeliverController.OpenItemDeliverViewByHandInItem(
								r,
								i,
								void 0,
								void 0,
								t,
							))
						: (Log_1.Log.CheckError() &&
								Log_1.Log.Error(
									"Animal",
									51,
									"动物实体获取AnimalPerformComp失败",
									["EntityId", t.EntityId],
								),
							!1))
				: (Log_1.Log.CheckError() &&
						Log_1.Log.Error("Animal", 30, "无效的投喂动物对象", [
							"EntityId",
							t.EntityId,
						]),
					!1))
		);
	}
	GetViewName(e) {
		return "ItemDeliverView";
	}
}
exports.OpenSystemFeed = OpenSystemFeed;
