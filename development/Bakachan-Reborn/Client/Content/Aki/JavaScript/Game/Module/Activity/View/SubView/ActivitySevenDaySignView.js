"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ActivitySevenDaySignView = void 0);
const UE = require("ue"),
	MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
	Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	UiManager_1 = require("../../../../Ui/UiManager"),
	RoleController_1 = require("../../../RoleUi/RoleController"),
	WeaponTrialData_1 = require("../../../Weapon/Data/WeaponTrialData"),
	ActivitySevenDaySignController_1 = require("../../ActivityContent/SevenDaySign/ActivitySevenDaySignController"),
	ActivitySevenDaySignDefine_1 = require("../../ActivityContent/SevenDaySign/ActivitySevenDaySignDefine"),
	ActivitySubViewBase_1 = require("./ActivitySubViewBase"),
	ITEM_START_INDEX = 4,
	SIGN_DAY_COUNT = 7;
class ActivitySevenDaySignView extends ActivitySubViewBase_1.ActivitySubViewBase {
	constructor() {
		super(...arguments),
			(this.g4e = void 0),
			(this.f4e = void 0),
			(this.IFe = (e) => {
				this.TFe(e)
					? ActivitySevenDaySignController_1.ActivitySevenDaySignController.GetRewardByDay(
							this.f4e.Id,
							e,
						)
					: e === this.f4e.GetImportantItemIndex() && this.p4e();
			}),
			(this.p4e = () => {
				var e =
					ConfigManager_1.ConfigManager.ActivitySevenDaySignConfig?.GetActivitySignById(
						this.f4e.Id,
					);
				switch (e.ImportantRewardType) {
					case 1:
						RoleController_1.RoleController.OpenRoleMainView(
							1,
							0,
							e.PreviewList,
						);
						break;
					case 2:
						var t = [];
						for (const n of e.PreviewList) {
							var i = new WeaponTrialData_1.WeaponTrialData();
							i.SetTrialId(n), t.push(i);
						}
						var n = { WeaponDataList: t, SelectedIndex: 0 };
						UiManager_1.UiManager.OpenView("WeaponPreviewView", n);
				}
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIText],
			[2, UE.UIText],
			[3, UE.UIButtonComponent],
			[4, UE.UIItem],
			[5, UE.UIItem],
			[6, UE.UIItem],
			[7, UE.UIItem],
			[8, UE.UIItem],
			[9, UE.UIItem],
			[10, UE.UIItem],
		]),
			(this.BtnBindInfo = [[3, this.p4e]]);
	}
	async OnBeforeStartAsync() {
		var e = [],
			t = ((this.g4e = []), this.f4e.GetImportantItemIndex());
		for (let n = 0; n < 7; n++) {
			let a;
			var i = this.GetItem(4 + n);
			0 <= t && t === n
				? ((a =
						new ActivitySevenDaySignDefine_1.ImportantRewardItem()).BigIconPath =
						this.f4e?.GetBigRewardIcon(this.f4e.Id) ?? "")
				: (a = new ActivitySevenDaySignDefine_1.NormalRewardItem()),
				this.g4e.push(a),
				(a.SkipDestroyActor = !0),
				(a.OnClickToGet = this.IFe),
				e.push(a.CreateThenShowByActorAsync(i.GetOwner()));
		}
		await Promise.all(e);
	}
	OnBeforeShow() {
		for (const e of this.g4e) this.AddChild(e);
	}
	OnSetData() {
		this.f4e = this.ActivityBaseData;
	}
	OnTimer(e) {
		var [t, i] = this.GetTimeVisibleAndRemainTime();
		this.GetText(1).SetUIActive(t), t && this.GetText(1).SetText(i);
	}
	OnBeforeDestroy() {
		for (const e of this.g4e) this.AddChild(e);
	}
	v4e() {
		return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
			this.f4e.LocalConfig.Desc,
		);
	}
	OnRefreshView() {
		this.GetText(0).SetText(this.f4e.GetTitle()),
			this.GetText(2).SetText(this.v4e()),
			this.jqe();
	}
	jqe() {
		this.OnTimer(1);
		for (let n = 0; n < 7; n++) {
			var e = this.f4e.GetRewardByDay(n),
				t = this.f4e.GetRewardStateByDay(n),
				i = ((e = e[0]), this.g4e[n]);
			i && i.RefreshByData(e, t, n);
		}
		var n = 0 !== this.f4e.GetImportantRewardType();
		this.GetButton(3)?.RootUIComp.SetUIActive(n),
			this.GetButton(3)?.RootUIComp.SetRaycastTarget(n);
	}
	TFe(e) {
		return this.f4e.GetRewardStateByDay(e) === Protocol_1.Aki.Protocol.D0s.j0s;
	}
}
exports.ActivitySevenDaySignView = ActivitySevenDaySignView;
