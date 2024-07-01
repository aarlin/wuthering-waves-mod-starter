"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.EntityMarkItem = void 0);
const Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	EntityMarkItemView_1 = require("../MarkItemView/EntityMarkItemView"),
	ConfigMarkItem_1 = require("./ConfigMarkItem");
class EntityMarkItem extends ConfigMarkItem_1.ConfigMarkItem {
	constructor(e, t, r, a, i, n) {
		super(e, t, r, i, n, 1), (this.TrackTarget = a);
	}
	OnCreateView() {
		this.InnerView = new EntityMarkItemView_1.EntityMarkItemView(this);
	}
	InitPosition(e) {
		this.TrackTarget ||
			(e.EntityConfigId
				? this.SetTrackData(e.EntityConfigId)
				: e.MarkVector &&
					this.SetTrackData(Vector_1.Vector.Create(e.MarkVector))),
			this.UpdateTrackState();
	}
	CheckCanShowView() {
		return (
			("number" != typeof this.TrackTarget ||
				!!ModelManager_1.ModelManager.CreatureModel.CheckEntityVisible(
					this.TrackTarget,
				)) &&
			super.CheckCanShowView()
		);
	}
}
exports.EntityMarkItem = EntityMarkItem;
