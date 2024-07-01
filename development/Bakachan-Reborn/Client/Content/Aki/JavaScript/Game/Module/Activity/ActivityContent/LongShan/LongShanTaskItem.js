"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LongShanTaskItem = void 0);
const UE = require("ue"),
	LongShanTaskById_1 = require("../../../../../Core/Define/ConfigQuery/LongShanTaskById"),
	CommonItemSmallItemGrid_1 = require("../../../Common/ItemGrid/CommonItemSmallItemGrid"),
	SkipTaskManager_1 = require("../../../SkipInterface/SkipTaskManager"),
	GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
	LguiUtil_1 = require("../../../Util/LguiUtil"),
	GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew"),
	ActivityLongShanController_1 = require("./ActivityLongShanController");
class LongShanTaskItem extends GridProxyAbstract_1.GridProxyAbstract {
	constructor() {
		super(...arguments),
			(this.BOe = 0),
			(this.bOe = void 0),
			(this.JGe = () =>
				new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid()),
			(this.IOe = () => {
				var e = LongShanTaskById_1.configLongShanTaskById.GetConfig(this.BOe);
				SkipTaskManager_1.SkipTaskManager.RunByConfigId(e.JumpId);
			}),
			(this.qOe = () => {
				ActivityLongShanController_1.ActivityLongShanController.TakeTaskReward(
					this.BOe,
				);
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIButtonComponent],
			[1, UE.UIButtonComponent],
			[2, UE.UIItem],
			[3, UE.UIItem],
			[4, UE.UIText],
			[5, UE.UIText],
			[6, UE.UIScrollViewWithScrollbarComponent],
		]),
			(this.BtnBindInfo = [
				[0, this.IOe],
				[1, this.qOe],
			]);
	}
	OnStart() {
		this.bOe = new GenericScrollViewNew_1.GenericScrollViewNew(
			this.GetScrollViewWithScrollbar(6),
			this.JGe,
		);
	}
	Refresh(e, t, i) {
		this.BOe = e.Ekn;
		var o = LongShanTaskById_1.configLongShanTaskById.GetConfig(this.BOe),
			n = [];
		for (const e of o.TaskReward) {
			var r = [{ IncId: 0, ItemId: e[0] }, e[1]];
			n.push(r);
		}
		this.bOe.RefreshByData(n),
			this.GetButton(1).RootUIComp.SetUIActive(e.$0s && !e.H0s),
			this.GetItem(3).SetUIActive(e.H0s),
			this.GetItem(2).SetUIActive(!e.$0s && 0 === o.JumpId),
			this.GetButton(0).RootUIComp.SetUIActive(!e.$0s && 0 < o.JumpId),
			LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), o.TaskName),
			LguiUtil_1.LguiUtil.SetLocalTextNew(
				this.GetText(5),
				"LongShanStage_Progress",
				e.k0s,
				e.s3n,
			);
	}
}
exports.LongShanTaskItem = LongShanTaskItem;
