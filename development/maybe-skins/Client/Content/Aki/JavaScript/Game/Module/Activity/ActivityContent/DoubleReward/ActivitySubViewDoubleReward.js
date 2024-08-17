"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ActivitySubViewDoubleReward = void 0);
const UE = require("ue"),
	StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	LguiUtil_1 = require("../../../Util/LguiUtil"),
	ActivitySubViewBase_1 = require("../../View/SubView/ActivitySubViewBase"),
	ActivityDescriptionTypeA_1 = require("../UniversalComponents/Content/ActivityDescriptionTypeA"),
	ActivityTitleTypeA_1 = require("../UniversalComponents/Title/ActivityTitleTypeA");
class ActivitySubViewDoubleReward extends ActivitySubViewBase_1.ActivitySubViewBase {
	constructor() {
		super(...arguments),
			(this.ActivityBaseData = void 0),
			(this.LNe = void 0),
			(this.DNe = void 0),
			(this.IOe = () => {
				this.ActivityBaseData.JumpToDungeon();
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
			[2, UE.UIText],
			[3, UE.UIButtonComponent],
			[4, UE.UIItem],
			[5, UE.UIItem],
			[6, UE.UIText],
		]),
			(this.BtnBindInfo = [[3, this.IOe]]);
	}
	OnSetData() {}
	async OnBeforeStartAsync() {
		var t = this.GetItem(0),
			e =
				((this.LNe = new ActivityTitleTypeA_1.ActivityTitleTypeA()),
				this.GetItem(1));
		(this.DNe = new ActivityDescriptionTypeA_1.ActivityDescriptionTypeA()),
			await Promise.all([
				this.DNe.CreateThenShowByActorAsync(e.GetOwner()),
				this.LNe.CreateThenShowByActorAsync(t.GetOwner()),
			]);
	}
	OnStart() {
		var t,
			e,
			i = this.ActivityBaseData.LocalConfig;
		i &&
			(this.LNe.SetTitleByText(this.ActivityBaseData.GetTitle()),
			(t = i.DescTheme),
			(i = i.Desc),
			(e = !StringUtils_1.StringUtils.IsEmpty(t)),
			this.DNe.SetTitleVisible(e),
			e && this.DNe.SetTitleByTextId(t),
			this.DNe.SetContentByTextId(i),
			this.OnRefreshView());
	}
	OnTimer(t) {
		this.FNe();
	}
	OnRefreshView() {
		var t = this.ActivityBaseData.GetNumTxtAndParam(),
			e = this.ActivityBaseData.IsUnLock();
		this.GetButton(3)?.RootUIComp.SetUIActive(
			e && ModelManager_1.ModelManager.FunctionModel.IsOpen(10023004),
		),
			LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), t[0], t[1], t[2]),
			this.GetItem(4).SetUIActive(e),
			this.GetItem(5).SetUIActive(!e),
			e ||
				((t = this.GetCurrentLockConditionText()),
				LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), t)),
			this.FNe(),
			this.ActivityBaseData.ReadDailyRedDot();
	}
	FNe() {
		var [t, e] = this.GetTimeVisibleAndRemainTime();
		this.LNe.SetTimeTextVisible(t), t && this.LNe.SetTimeTextByText(e);
	}
}
exports.ActivitySubViewDoubleReward = ActivitySubViewDoubleReward;
