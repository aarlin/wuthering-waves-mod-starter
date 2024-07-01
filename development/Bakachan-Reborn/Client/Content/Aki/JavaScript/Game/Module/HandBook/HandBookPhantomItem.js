"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.HandBookPhantomItem = void 0);
const UE = require("ue"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../Ui/Base/UiPanelBase"),
	HandBookCommonItem_1 = require("../HandBook/HandBookCommonItem"),
	HandBookDefine_1 = require("../HandBook/HandBookDefine");
class HandBookPhantomItem extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.jZt = void 0),
			(this.kzt = void 0),
			(this.Gzt = void 0),
			(this.Ozt = (e) => {
				this.Gzt && this.Gzt(this.kzt, 0);
			});
	}
	Initialize(e, t) {
		(this.kzt = e), t && this.CreateThenShowByActor(t.GetOwner());
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIText],
			[2, UE.UIText],
			[3, UE.UIText],
		];
	}
	OnStart() {
		(this.jZt = new HandBookCommonItem_1.HandBookCommonItem()),
			this.jZt.Initialize(this.GetItem(0).GetOwner());
		var e = this.kzt.Config,
			t = new HandBookDefine_1.HandBookCommonItemData(),
			o =
				void 0 ===
				(n = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(
					1,
					e.MonsterId,
				)),
			n = void 0 !== n && !n.IsRead;
		(t.Icon = e.Icon),
			(t.IsLock = o),
			(t.IsNew = n),
			this.jZt.Refresh(t, !1, 0),
			this.jZt.BindOnExtendToggleClicked(this.Ozt),
			this.jZt.SetNewFlagVisible(!1),
			(n = this.GetText(1));
		this.GetText(3).SetUIActive(!1),
			o
				? ((t =
						ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
							"Unknown",
						)),
					n.ShowTextNew(t))
				: n.ShowTextNew(e.MonsterName);
	}
	BindToggleCallback(e) {
		this.Gzt = e;
	}
	SetToggleStateForce(e, t = 0) {
		this.jZt.SetSelected(1 === e);
	}
	OnSelected(e) {
		this.jZt.OnSelected(e);
	}
	OnBeforeDestroy() {
		(this.jZt = void 0), (this.kzt = void 0), (this.Gzt = void 0);
	}
}
exports.HandBookPhantomItem = HandBookPhantomItem;
