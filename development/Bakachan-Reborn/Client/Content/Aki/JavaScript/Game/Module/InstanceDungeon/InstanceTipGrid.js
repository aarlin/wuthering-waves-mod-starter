"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.InstanceTipGrid = void 0);
const ue_1 = require("ue"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	ActivityDoubleRewardController_1 = require("../Activity/ActivityContent/DoubleReward/ActivityDoubleRewardController"),
	CommonItemSmallItemGrid_1 = require("../Common/ItemGrid/CommonItemSmallItemGrid"),
	GridProxyAbstract_1 = require("../Util/Grid/GridProxyAbstract"),
	LguiUtil_1 = require("../Util/LguiUtil");
class InstanceTipGrid extends GridProxyAbstract_1.GridProxyAbstract {
	constructor() {
		super(...arguments),
			(this.NUe = 0),
			(this.sOe = void 0),
			(this.s1i = !0),
			(this.a1i = !1),
			(this.h1i = []);
	}
	Initialize(e) {
		this.CreateThenShowByActor(e.GetOwner());
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, ue_1.UIText],
			[1, ue_1.UIItem],
			[2, ue_1.UIItem],
			[3, ue_1.UIButtonComponent],
			[4, ue_1.UIItem],
		];
	}
	OnBeforeDestroy() {
		for (const e of this.h1i) e.Destroy();
		this.h1i.length = 0;
	}
	Refresh(e) {
		e && (this.NUe = e), this.Yhi(), this.l1i(), this._1i();
	}
	ClearGrid() {
		for (const e of this.h1i) e.Destroy();
		this.h1i.length = 0;
	}
	Yhi() {
		var e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
				this.NUe,
			),
			t =
				((e =
					ActivityDoubleRewardController_1.ActivityDoubleRewardController.GetDungeonUpActivity(
						e.CustomTypes,
					)),
				this.GetItem(4).SetUIActive(void 0 !== e),
				ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetInstanceRewardId(
					this.NUe,
				)),
			i =
				((e =
					ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetExchangeRewardPreviewRewardList(
						t,
					)),
				(this.sOe = e),
				(this.a1i = this.sOe && 0 < this.sOe.length),
				this.GetItem(2).GetOwner()),
			r = this.GetItem(1);
		let n = 0;
		var o = ModelManager_1.ModelManager.ExchangeRewardModel.IsFinishInstance(
			this.NUe,
		);
		for (const e of this.sOe) {
			let s = this.h1i[n++];
			s ||
				((s =
					new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid()).Initialize(
					LguiUtil_1.LguiUtil.DuplicateActor(i, r),
				),
				this.h1i.push(s)),
				s.Refresh(e),
				t || s.SetReceivedVisible(o),
				s.SetActive(!0);
		}
		for (let e = this.sOe.length; e < this.h1i.length; ++e)
			this.h1i[e].SetActive(!1);
		this.GetItem(2).SetUIActive(!1);
	}
	l1i() {
		this.RootItem.SetUIActive(this.a1i && this.s1i);
	}
	_1i() {
		var e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
			this.NUe,
		);
		LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e.MapName);
	}
}
exports.InstanceTipGrid = InstanceTipGrid;
