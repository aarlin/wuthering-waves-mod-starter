"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ActivityLongShanController = void 0);
const LongShanStageById_1 = require("../../../../../Core/Define/ConfigQuery/LongShanStageById"),
	Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
	Net_1 = require("../../../../../Core/Net/Net"),
	LevelGeneralCommons_1 = require("../../../../LevelGamePlay/LevelGeneralCommons"),
	ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	UiManager_1 = require("../../../../Ui/UiManager"),
	LguiUtil_1 = require("../../../Util/LguiUtil"),
	ActivityControllerBase_1 = require("../../ActivityControllerBase"),
	ActivityLongShanData_1 = require("./ActivityLongShanData"),
	ActivitySubViewLongShan_1 = require("./ActivitySubViewLongShan");
class ActivityLongShanController extends ActivityControllerBase_1.ActivityControllerBase {
	constructor() {
		super(...arguments),
			(this.TOe = (e) => {
				ActivityLongShanController.GetActivityData().UpdateStage(e.W0s);
			});
	}
	OnGetIsOpeningActivityRelativeView() {
		return !1;
	}
	OnOpenView(e) {}
	OnGetActivityResource(e) {
		return "UiItem_LongshanMain";
	}
	OnCreateSubPageComponent(e) {
		return new ActivitySubViewLongShan_1.ActivitySubViewLongShan();
	}
	OnCreateActivityData(e) {
		return (
			(ActivityLongShanController.LOe = e.Ekn),
			new ActivityLongShanData_1.ActivityLongShanData()
		);
	}
	OnInit() {
		return (ActivityLongShanController.DOe = []), !0;
	}
	OnRegisterNetEvent() {
		Net_1.Net.Register(28238, this.TOe);
	}
	OnUnRegisterNetEvent() {
		Net_1.Net.UnRegister(28238);
	}
	static GetActivityData() {
		return ModelManager_1.ModelManager.ActivityModel.GetActivityById(
			ActivityLongShanController.LOe,
		);
	}
	static ShowUnlockTip(e) {
		(e = LongShanStageById_1.configLongShanStageById.GetConfig(e)),
			(e = LevelGeneralCommons_1.LevelGeneralCommons.GetConditionGroupHintText(
				e.OpenConditionId,
			)),
			ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByItsType(
				9,
				new LguiUtil_1.TableTextArgNew(e),
			);
	}
	static TakeTaskReward(e) {
		var t;
		this.DOe.includes(e) ||
			(this.DOe.push(e),
			((t = Protocol_1.Aki.Protocol.Eds.create()).XFn = [e]),
			Net_1.Net.Call(18553, t, (t) => {
				t && this.DOe.splice(this.DOe.indexOf(e), 1);
			}));
	}
	OnActivityFirstUnlock(e) {
		UiManager_1.UiManager.OpenView("LongShanUnlockView");
	}
}
((exports.ActivityLongShanController = ActivityLongShanController).LOe = 0),
	(ActivityLongShanController.DOe = []);
