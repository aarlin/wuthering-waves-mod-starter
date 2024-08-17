"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.EntityHeadIconItem = void 0);
const ModelManager_1 = require("../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class EntityHeadIconItem extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.EntityId = 0),
			(this.EntityHandle = void 0),
			(this.PawnHeadInfoComponent = void 0),
			(this.HeadDialogVisible = !1);
	}
	InitEntityId(e) {
		(this.EntityId = e),
			(this.EntityHandle =
				ModelManager_1.ModelManager.CharacterModel?.GetHandle(e)),
			(this.PawnHeadInfoComponent =
				this.EntityHandle?.Entity?.GetComponent(70));
	}
	Update() {
		this.RefreshAlpha();
	}
	RefreshAlpha() {
		var e;
		this.RootItem &&
			(e = this.GetHeadDialogVisible()) !== this.HeadDialogVisible &&
			((this.HeadDialogVisible = e), this.RootItem.SetAlpha(e ? 0.2 : 1));
	}
	GetHeadDialogVisible() {
		return (
			!!this.EntityHandle?.Valid &&
			(this.PawnHeadInfoComponent?.IsDialogTextActive() ?? !1)
		);
	}
}
exports.EntityHeadIconItem = EntityHeadIconItem;
