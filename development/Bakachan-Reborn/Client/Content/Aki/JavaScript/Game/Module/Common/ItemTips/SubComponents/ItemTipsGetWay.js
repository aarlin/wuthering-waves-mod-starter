"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TipsGetWayItem = exports.TipsGetWayPanel = void 0);
const UE = require("ue"),
	UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
	GenericLayoutNew_1 = require("../../../Util/Layout/GenericLayoutNew");
class TipsGetWayPanel extends UiPanelBase_1.UiPanelBase {
	constructor(t) {
		super(),
			(this.vPt = void 0),
			(this.MPt = void 0),
			(this.SPt = (t, e, s) => ({ Key: s, Value: new TipsGetWayItem(e, t) })),
			this.CreateThenShowByActor(t.GetOwner());
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIVerticalLayout],
			[1, UE.UIItem],
		];
	}
	OnStart() {
		this.MPt = new GenericLayoutNew_1.GenericLayoutNew(
			this.GetVerticalLayout(0),
			this.SPt,
		);
	}
	OnBeforeDestroy() {
		this.vPt = [];
	}
	Refresh(t) {
		t.sort((t, e) => {
			var s = t.SortIndex,
				i = e.SortIndex;
			return s === i ? e.Id - t.Id : i - s;
		}),
			(this.vPt = t),
			this.MPt.RebuildLayoutByDataNew(this.vPt),
			this.SetActive(0 !== this.vPt.length);
	}
}
exports.TipsGetWayPanel = TipsGetWayPanel;
class TipsGetWayItem extends UiPanelBase_1.UiPanelBase {
	constructor(t, e) {
		super(),
			(this.Qyt = void 0),
			(this.EPt = () => {
				this.Qyt && this.Qyt();
			}),
			(this.Pe = e),
			this.CreateThenShowByActor(t.GetOwner());
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIButtonComponent],
			[1, UE.UIButtonComponent],
			[2, UE.UIText],
			[3, UE.UIText],
		]),
			(this.BtnBindInfo = [
				[0, this.EPt],
				[1, this.EPt],
			]);
	}
	OnStart() {
		switch (((this.Qyt = this.Pe.Function), this.Pe.Type)) {
			case 2:
				this.GetButton(0).RootUIComp.SetUIActive(!0),
					this.GetButton(1).RootUIComp.SetUIActive(!1),
					this.GetText(2).ShowTextNew(this.Pe.Text);
				break;
			case 1:
				this.GetButton(0).RootUIComp.SetUIActive(!1),
					this.GetButton(1).RootUIComp.SetUIActive(!0),
					this.GetText(3).ShowTextNew(this.Pe.Text);
		}
	}
	OnBeforeDestroy() {
		(this.Pe = void 0), (this.Qyt = void 0);
	}
}
exports.TipsGetWayItem = TipsGetWayItem;
