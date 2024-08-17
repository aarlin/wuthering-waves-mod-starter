"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventMoveJigsawItem = void 0);
const IComponent_1 = require("../../../UniverseEditor/Interface/IComponent"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	SceneItemJigsawBaseComponent_1 = require("../../NewWorld/SceneItem/Jigsaw/SceneItemJigsawBaseComponent"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventMoveJigsawItem extends LevelGeneralBase_1.LevelEventBase {
	constructor() {
		super(...arguments), (this.Lo = void 0);
	}
	ExecuteNew(e, t) {
		e
			? ((this.Lo = e.Config),
				(e = []).push(this.Lo.ItemEntityId),
				e.push(this.Lo.FoundationEntityId),
				this.CreateWaitEntityTask(e))
			: this.FinishExecute(!1);
	}
	ExecuteWhenEntitiesReady() {
		var e = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
				this.Lo.ItemEntityId,
			),
			t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
				this.Lo.FoundationEntityId,
			),
			n = e.Entity.GetComponent(182);
		if (n)
			if (e && t) {
				var o = e.Entity.GetComponent(122),
					i = t.Entity.GetComponent(121);
				if (o && i) {
					var a = o.PutDownBase;
					if (a) {
						const e = a.Entity.GetComponent(145),
							t =
								e?.Config.Config.Type ??
								IComponent_1.EItemFoundation.BuildingBlock;
						a.OnPickUpItem(o, t, !1);
					}
					a = new SceneItemJigsawBaseComponent_1.JigsawIndex(
						this.Lo.Destination.RowIndex,
						this.Lo.Destination.ColumnIndex,
					);
					const s = t.Entity.GetComponent(145),
						r =
							s?.Config.Config.Type ??
							IComponent_1.EItemFoundation.BuildingBlock;
					i.OnPutDownItem(o, a, r, !1),
						(t = i.GetBlockLocationByIndex(a)),
						n.SetActorLocation(t.ToUeVector(), "LevelEventMoveJigsawItem"),
						(a = e.Entity.GetComponent(142)) && a.ForceSendPendingMoveInfos(),
						i.RequestMoveItem(o),
						i.CheckFinish();
				} else this.FinishExecute(!1);
			} else this.FinishExecute(!1);
	}
}
exports.LevelEventMoveJigsawItem = LevelEventMoveJigsawItem;
