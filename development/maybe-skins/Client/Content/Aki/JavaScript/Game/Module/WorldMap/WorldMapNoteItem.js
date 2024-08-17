"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.WorldMapNoteItem = void 0);
const UE = require("ue"),
	MapNoteById_1 = require("../../../Core/Define/ConfigQuery/MapNoteById"),
	UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
class WorldMapNoteItem extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(),
			(this.hdt = 0),
			(this.wIt = void 0),
			(this.Kyt = () => {
				this.wIt(this.hdt);
			}),
			e.SetUIActive(!0),
			this.CreateThenShowByActor(e.GetOwner());
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UISprite],
			[1, UE.UIText],
			[2, UE.UIButtonComponent],
		]),
			(this.BtnBindInfo = [[2, this.Kyt]]);
	}
	OnStart() {}
	OnBeforeDestroy() {}
	UpdateNoteItem(e, t, o) {
		var i = this.GetSprite(0);
		(e = MapNoteById_1.configMapNoteById.GetConfig(e)),
			this.SetSpriteByPath(e.Icon, i, !0),
			(i = this.GetText(1)),
			(e = e.Desc);
		i.ShowTextNew(e), (this.hdt = o), (this.wIt = t);
	}
}
exports.WorldMapNoteItem = WorldMapNoteItem;
