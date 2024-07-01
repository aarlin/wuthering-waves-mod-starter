"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RewardExploreTargetReachedList = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	RewardExploreTargetReached_1 = require("./RewardExploreTargetReached");
class RewardExploreTargetReachedList extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this._0i = void 0),
			(this.u0i = void 0),
			(this.Ygi = []);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
		];
	}
	OnStart() {
		(this.u0i = this.GetItem(0)),
			(this._0i = this.GetItem(1)),
			this._0i.SetUIActive(!1);
	}
	OnBeforeDestroy() {
		(this.u0i = void 0), (this._0i = void 0), this.c0i();
	}
	SetBarList(e) {
		this.c0i();
		var t = this.GetItem(0);
		if (e && 0 !== e.length) {
			for (const t of e) this.C0i(t);
			t.SetUIActive(!0);
		} else t.SetUIActive(!1);
	}
	C0i(e) {
		var t = LguiUtil_1.LguiUtil.DuplicateActor(this._0i.GetOwner(), this.u0i);
		(t = new RewardExploreTargetReached_1.RewardExploreTargetReached(
			t,
		)).Refresh(e),
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("Test", 5, e?.DescriptionTextId),
			t.SetActive(!0),
			this.Ygi.push(t);
	}
	c0i() {
		for (const e of this.Ygi) e.Destroy();
		this.Ygi.length = 0;
	}
}
exports.RewardExploreTargetReachedList = RewardExploreTargetReachedList;
