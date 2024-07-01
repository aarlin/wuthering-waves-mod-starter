"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AdviceCreateWordItem = void 0);
const UE = require("ue"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	AdviceCreateWordBtnItem_1 = require("./AdviceCreateWordBtnItem");
class AdviceCreateWordItem extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(),
			(this.Xy = 0),
			(this.G9e = new Array()),
			(this.N9e = void 0),
			(this.O9e = void 0),
			this.CreateThenShowByActor(e.GetOwner());
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIItem],
			[2, UE.UIItem],
		];
	}
	OnStart() {
		this.k9e(),
			this.F9e(),
			this.V9e(),
			this.GetItem(1).SetUIActive(!1),
			this.GetText(0).SetUIActive(!1);
	}
	k9e() {
		for (let t = 0; t < 2; t++) {
			var e = LguiUtil_1.LguiUtil.CopyItem(this.GetText(0), this.RootItem);
			this.G9e.push(e);
		}
	}
	F9e() {
		var e = this.GetItem(1);
		(e = LguiUtil_1.LguiUtil.CopyItem(e, this.RootItem)),
			(e = new AdviceCreateWordBtnItem_1.AdviceCreateWordBtnItem(e));
		(this.N9e = e), this.N9e.SetType(1);
	}
	V9e() {
		var e = this.GetItem(1);
		(e = LguiUtil_1.LguiUtil.CopyItem(e, this.RootItem)),
			(e = new AdviceCreateWordBtnItem_1.AdviceCreateWordBtnItem(e));
		(this.O9e = e), this.O9e.SetType(0);
	}
	SetIndex(e) {
		(this.Xy = e), this.N9e.SetIndex(e), this.O9e.SetIndex(e);
	}
	RefreshView() {
		this.O8e(), this.q9e();
	}
	O8e() {
		const e = this.GetItem(2);
		this.G9e.forEach((t) => {
			t.SetUIActive(!1), t.SetUIParent(e);
		}),
			this.N9e.GetRootItem().SetUIParent(e),
			this.O9e.GetRootItem().SetUIParent(e),
			this.N9e.GetRootItem().SetUIActive(!1),
			this.O9e.GetRootItem().SetUIActive(!1);
	}
	q9e() {
		var e = ModelManager_1.ModelManager.AdviceModel.CurrentSentenceWordMap.get(
			this.Xy,
		);
		if (!(e <= 0)) {
			0 < this.Xy &&
				(this.N9e.GetRootItem().SetUIParent(this.RootItem),
				this.N9e.GetRootItem().SetUIActive(!0),
				this.N9e.RefreshView());
			var t =
				ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceSentenceText(
					e,
				).split("{}");
			for (let e = 0; e < t.length; e++)
				this.G9e[e].SetText(t[e]),
					this.G9e[e].SetUIParent(this.RootItem),
					e + 1 < t.length &&
						(this.O9e.GetRootItem().SetUIParent(this.RootItem),
						this.O9e.GetRootItem().SetUIActive(!0),
						this.O9e.RefreshView()),
					this.G9e[e].SetUIActive(!0);
		}
	}
}
exports.AdviceCreateWordItem = AdviceCreateWordItem;
