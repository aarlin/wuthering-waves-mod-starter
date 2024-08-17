"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ConsumeItemData = exports.ConsumeItem = void 0);
const UE = require("ue"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
	ConsumeItemUtil_1 = require("./ConsumeItemUtil");
class ConsumeItem extends GridProxyAbstract_1.GridProxyAbstract {
	constructor(t = void 0, e = void 0) {
		super(),
			(this.BelongView = e),
			(this.Data = void 0),
			(this.ButtonFunction = void 0),
			(this.j7e = () => {
				this.ButtonFunction &&
					this.ButtonFunction(this.Data?.IncId, this.Data?.ItemId);
			}),
			t && this.CreateThenShowByActor(t.GetOwner());
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UISprite],
			[1, UE.UIItem],
			[2, UE.UIItem],
			[3, UE.UISprite],
			[4, UE.UITexture],
			[5, UE.UISprite],
			[6, UE.UIText],
			[7, UE.UIItem],
			[8, UE.UIText],
			[9, UE.UIButtonComponent],
		]),
			(this.BtnBindInfo = [[9, this.j7e]]);
	}
	SetIconState() {
		var t = ModelManager_1.ModelManager.InventoryModel.GetItemDataBase(
				this.Data,
			)[0],
			e = this.GetTexture(4);
		this.SetItemIcon(e, t.GetConfigId(), this.BelongView),
			(e = this.GetSprite(5)),
			this.SetItemQualityIcon(e, t.GetConfigId(), this.BelongView),
			(e = this.GetText(6)),
			(t = this.GetItem(7)),
			this.Data.ResonanceLevel
				? (t.SetUIActive(!0), e.SetText(this.Data.ResonanceLevel.toString()))
				: t.SetUIActive(!1),
			(e = this.GetSprite(3));
		this.Data.ChipPath
			? (e.SetUIActive(!0), this.SetSpriteByPath(this.Data.ChipPath, e, !1))
			: e.SetUIActive(!1);
	}
	Refresh(t, e, i) {
		let s;
		t && (s = ConsumeItemUtil_1.ConsumeItemUtil.GetConsumeItemData(t[0], t[1])),
			this.UpdateItem(s);
	}
	UpdateItem(t) {
		var e = this.GetItem(1),
			i = this.GetItem(2);
		t
			? ((this.Data = t),
				this.SetIconState(),
				e.SetUIActive(!1),
				i.SetUIActive(!0),
				this.GetText(8).SetText(this.Data.BottomText))
			: ((this.Data = t), e.SetUIActive(!0), i.SetUIActive(!1));
	}
	SetButtonFunction(t) {
		this.ButtonFunction = t;
	}
}
exports.ConsumeItem = ConsumeItem;
class ConsumeItemData {
	constructor() {
		(this.IncId = 0),
			(this.ItemId = 0),
			(this.BottomText = ""),
			(this.ResonanceLevel = 0),
			(this.ChipPath = "");
	}
}
exports.ConsumeItemData = ConsumeItemData;
