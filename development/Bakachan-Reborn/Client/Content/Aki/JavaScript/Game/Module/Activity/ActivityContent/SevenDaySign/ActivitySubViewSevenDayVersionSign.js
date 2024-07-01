"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ActivitySubViewSevenDayVersionSign = void 0);
const UE = require("ue"),
	Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
	ActivitySubViewBase_1 = require("../../View/SubView/ActivitySubViewBase"),
	ActivityTitleTypeA_1 = require("../UniversalComponents/Title/ActivityTitleTypeA"),
	ActivitySevenDaySignController_1 = require("./ActivitySevenDaySignController"),
	ActivitySevenDaySignDefine_1 = require("./ActivitySevenDaySignDefine"),
	SIGN_DAY_COUNT = 7;
class ActivitySubViewSevenDayVersionSign extends ActivitySubViewBase_1.ActivitySubViewBase {
	constructor() {
		super(...arguments),
			(this.LNe = void 0),
			(this.ItemList = void 0),
			(this.ActivitySignData = void 0),
			(this.IFe = (e) => {
				this.TFe(e) &&
					ActivitySevenDaySignController_1.ActivitySevenDaySignController.GetRewardByDay(
						this.ActivitySignData.Id,
						e,
					);
			});
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
			[2, UE.UIItem],
			[3, UE.UIItem],
			[4, UE.UIItem],
			[5, UE.UIItem],
			[6, UE.UIItem],
			[7, UE.UIItem],
		];
	}
	OnSetData() {
		this.ActivitySignData = this.ActivityBaseData;
	}
	async OnBeforeStartAsync() {
		var e = this.GetItem(0),
			t =
				((this.LNe = new ActivityTitleTypeA_1.ActivityTitleTypeA()),
				await this.LNe.CreateThenShowByActorAsync(e.GetOwner()),
				(this.ItemList = []),
				[]);
		for (const e of [1, 2, 3, 4, 5, 6, 7]) {
			var i = this.GetItem(e),
				n = new ActivitySevenDaySignDefine_1.VersionSignRewardItem();
			this.ItemList.push(n),
				(n.OnClickToGet = this.IFe),
				t.push(n.CreateThenShowByActorAsync(i.GetOwner()));
		}
		await Promise.all(t);
	}
	OnStart() {
		this.LNe.SetTitleByText(this.ActivityBaseData.GetTitle());
	}
	OnRefreshView() {
		this.jqe();
	}
	OnTimer(e) {
		this.FNe();
	}
	jqe() {
		for (let n = 0; n < 7; n++) {
			var e,
				t = this.ActivitySignData.GetRewardByDay(n),
				i = this.ActivitySignData.GetRewardStateByDay(n);
			void 0 === i ||
				void 0 === t ||
				t.length <= 0 ||
				((e = this.ItemList[n]) && e.RefreshByData(t[0], i, n));
		}
	}
	FNe() {
		var [e, t] = this.GetTimeVisibleAndRemainTime();
		this.LNe.SetTimeTextVisible(e), e && this.LNe.SetTimeTextByText(t);
	}
	TFe(e) {
		return (
			this.ActivitySignData.GetRewardStateByDay(e) ===
			Protocol_1.Aki.Protocol.D0s.j0s
		);
	}
}
exports.ActivitySubViewSevenDayVersionSign = ActivitySubViewSevenDayVersionSign;
