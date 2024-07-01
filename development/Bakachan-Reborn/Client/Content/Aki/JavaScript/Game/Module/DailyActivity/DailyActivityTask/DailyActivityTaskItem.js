"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.DailyActivityTaskItem = exports.DailyActiveTaskData = void 0);
const UE = require("ue"),
	MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	DailyActivityController_1 = require("../DailyActivityController"),
	DailyActivityTaskController_1 = require("./DailyActivityTaskController");
class DailyActiveTaskData {
	constructor() {
		(this.RewardItemList = []),
			(this.TaskId = 0),
			(this.TaskState = 2),
			(this.CurrentProgress = 0),
			(this.TargetProgress = 0),
			(this.Sort = 0),
			(this.IsFunctionUnlock = !1);
	}
}
exports.DailyActiveTaskData = DailyActiveTaskData;
class DailyActivityTaskItem extends GridProxyAbstract_1.GridProxyAbstract {
	constructor() {
		super(...arguments),
			(this.BOe = 0),
			(this.jOt = 1),
			(this.WOt = []),
			(this.KOt = !1),
			(this.QOt = 0),
			(this.XOt = () => {
				this.BOe &&
					DailyActivityController_1.DailyActivityController.RequestDailyActivityTaskReward(
						[this.BOe],
					);
			}),
			(this.$Ot = () => {
				this.BOe &&
					(this.KOt
						? DailyActivityTaskController_1.DailyActiveTaskController.TrackTaskByType(
								this.jOt,
								this.WOt,
							)
						: ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
								"FunctionDisable",
							));
			}),
			(this.jbe = () => {
				this.BOe &&
					this.QOt &&
					ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
						this.QOt,
					);
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIText],
			[2, UE.UIText],
			[3, UE.UIItem],
			[4, UE.UIButtonComponent],
			[5, UE.UIButtonComponent],
			[6, UE.UIButtonComponent],
			[7, UE.UIItem],
			[8, UE.UIText],
		]),
			(this.BtnBindInfo = [
				[4, this.jbe],
				[5, this.$Ot],
				[6, this.XOt],
			]);
	}
	OnStart() {}
	OnBeforeDestroy() {}
	IsNormalTaskJumpType() {
		return 1 === this.jOt;
	}
	Refresh(t, e, i) {
		(this.BOe = t.TaskId),
			(this.KOt = t.IsFunctionUnlock),
			this.GetText(1).SetText(
				t.CurrentProgress.toString() + "/" + t.TargetProgress.toString(),
			);
		var r =
				ConfigManager_1.ConfigManager.DailyActivityConfig.GetActivityTaskConfigById(
					this.BOe,
				),
			o = r.TaskName,
			s = [],
			a =
				(2 !== r.UpdateType ||
					(a = ModelManager_1.ModelManager.DailyActivityModel.AreaId) <= 0 ||
					((a = ConfigManager_1.ConfigManager.AreaConfig.GetAreaInfo(a)) &&
						(a = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
							a.Title,
						)) &&
						s.push(a)),
				LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), o, ...s),
				r.TaskFunc);
		1 <= a.length && (this.jOt = Number(a[0])),
			2 <= a.length && (this.WOt = a.slice(1)),
			6 === this.jOt &&
				(this.WOt = [
					ModelManager_1.ModelManager.DailyActivityModel.AreaId.toString(),
				]),
			(o = t.RewardItemList[0]);
		switch (
			((this.QOt = o[0].ItemId),
			this.GetText(8).SetText("+" + o[1].toString()),
			t.TaskState)
		) {
			case 2:
				var n = this.IsNormalTaskJumpType();
				this.GetText(2).SetUIActive(n),
					this.GetButton(5).RootUIComp.SetUIActive(!n),
					this.GetButton(6).RootUIComp.SetUIActive(!1),
					this.GetItem(3).SetUIActive(!1),
					this.GetItem(7).SetUIActive(!1);
				break;
			case 1:
				this.GetText(2).SetUIActive(!1),
					this.GetButton(5).RootUIComp.SetUIActive(!1),
					this.GetButton(6).RootUIComp.SetUIActive(!0),
					this.GetItem(3).SetUIActive(!1),
					this.GetItem(7).SetUIActive(!1);
				break;
			case 3:
				this.GetText(2).SetUIActive(!1),
					this.GetButton(5).RootUIComp.SetUIActive(!1),
					this.GetButton(6).RootUIComp.SetUIActive(!1),
					this.GetItem(3).SetUIActive(!0),
					this.GetItem(7).SetUIActive(!0);
		}
	}
}
exports.DailyActivityTaskItem = DailyActivityTaskItem;
