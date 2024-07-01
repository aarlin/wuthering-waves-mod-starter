"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ActivitySubViewBeginnerBook = void 0);
const UE = require("ue"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
	ActivityManager_1 = require("../../ActivityManager"),
	ActivitySubViewBase_1 = require("../../View/SubView/ActivitySubViewBase"),
	ActivityBeginnerTargetItem_1 = require("./ActivityBeginnerTargetItem");
class ActivitySubViewBeginnerBook extends ActivitySubViewBase_1.ActivitySubViewBase {
	constructor() {
		super(...arguments),
			(this.mNe = void 0),
			(this.dNe = !0),
			(this.CNe = void 0),
			(this.gNe = void 0),
			(this.sGe = () =>
				new ActivityBeginnerTargetItem_1.ActivityBeginnerTargetItem());
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIText],
			[2, UE.UIVerticalLayout],
			[3, UE.UIItem],
			[4, UE.UIItem],
			[5, UE.UIItem],
		];
	}
	OnSetData() {
		this.CNe = this.ActivityBaseData;
	}
	OnStart() {
		this.GetText(0).SetText(this.CNe.GetTitle()),
			(this.gNe = new GenericLayout_1.GenericLayout(
				this.GetVerticalLayout(2),
				this.sGe,
				this.GetItem(3).GetOwner(),
			));
		var e = 0 === ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender();
		this.GetItem(4)?.SetUIActive(e),
			this.GetItem(5)?.SetUIActive(!e),
			(this.mNe = this.GetText(1)),
			(this.dNe = 0 !== this.CNe.EndShowTime),
			this.mNe.SetUIActive(0 !== this.CNe.EndShowTime),
			this.fNe();
	}
	async OnBeforeShowSelfAsync() {
		await ActivityManager_1.ActivityManager.GetActivityController(
			this.CNe.Type,
		).NewJourneyRequest();
	}
	OnRefreshView() {
		this.gNe?.RefreshByData(this.CNe.AllBeginnerTargetList, () => {
			var e = this.gNe?.GetLayoutItemList(),
				t = this.ActivityBaseData;
			for (const i of e)
				i.SetEnableJump(t.GetEnableJump(i.DataId)),
					i.SetFinish(t.GetFinishState(i.DataId));
		});
	}
	pNe(e) {
		this.dNe !== e && ((this.dNe = e), this.mNe.SetUIActive(e));
	}
	fNe() {
		var [e, t] = this.GetTimeVisibleAndRemainTime();
		this.pNe(e), e && this.mNe.SetText(t);
	}
	OnTimer(e) {
		this.fNe();
	}
}
exports.ActivitySubViewBeginnerBook = ActivitySubViewBeginnerBook;
