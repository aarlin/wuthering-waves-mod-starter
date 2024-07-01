"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.DailyAdventureTaskItem = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../../Core/Common/Log"),
	MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
	StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
	GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
	LguiUtil_1 = require("../../../Util/LguiUtil"),
	ActivityDailyAdventureController_1 = require("./ActivityDailyAdventureController"),
	DailyAdventureSmallGridItem_1 = require("./DailyAdventureSmallGridItem"),
	DailyAdventureTaskController_1 = require("./DailyAdventureTaskController"),
	NORMAL_BG_ALPHA = 1,
	CLAMIED_BG_ALPHA = 0.5;
class DailyAdventureTaskItem extends GridProxyAbstract_1.GridProxyAbstract {
	constructor() {
		super(...arguments),
			(this.Pe = void 0),
			(this.gOe = void 0),
			(this.TaskJumpType = 1),
			(this.TaskJumpParams = []),
			(this.aOe = (e) => {
				this.Pe &&
					(0 !== this.Pe.TaskState
						? ((e = e.Data),
							ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
								e.Item[0].ItemId,
							))
						: ActivityDailyAdventureController_1.ActivityDailyAdventureController.RequestTaskReward(
								this.Pe.TaskId,
							));
			}),
			(this.fOe = () => {
				this.Pe &&
					1 === this.Pe.TaskState &&
					DailyAdventureTaskController_1.DailyAdventureTaskController.TrackTaskByType(
						this.TaskJumpType,
						this.TaskJumpParams,
					);
			}),
			(this.pOe = () => {
				this.Pe &&
					0 === this.Pe.TaskState &&
					ActivityDailyAdventureController_1.ActivityDailyAdventureController.RequestTaskReward(
						this.Pe.TaskId,
					);
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIButtonComponent],
			[1, UE.UIItem],
			[2, UE.UISprite],
			[3, UE.UIText],
			[4, UE.UIText],
			[5, UE.UIButtonComponent],
			[6, UE.UISprite],
			[7, UE.UIItem],
		]),
			(this.BtnBindInfo = [
				[5, this.fOe],
				[0, this.pOe],
			]);
	}
	async OnBeforeStartAsync() {
		await this.rOe(this.GetItem(1).GetOwner());
	}
	async rOe(e) {
		var t = new DailyAdventureSmallGridItem_1.DailyAdventureSmallGridItem();
		t.BindOnExtendToggleClicked(this.aOe),
			await t.CreateThenShowByActorAsync(e),
			(this.gOe = t);
	}
	Refresh(e, t, i) {
		this.Pe = e;
		var r =
			ConfigManager_1.ConfigManager.ActivityDailyAdventureConfig.GetDailyAdventureTaskConfig(
				e.TaskId,
			);
		if (r) {
			var s,
				a,
				o = r.TaskFunc,
				n =
					(1 <= o.length && (this.TaskJumpType = Number(o[0])),
					2 <= o.length &&
						((this.TaskJumpParams = o.slice(1)), 2 === this.TaskJumpType) &&
						this.TaskJumpParams.push(
							ActivityDailyAdventureController_1.ActivityDailyAdventureController.GetDefaultMapMarkId().toString(),
						),
					[]);
			for ([s, a] of r.TaskReward) {
				var l = [{ IncId: 0, ItemId: s }, a];
				n.push(l);
			}
			1 !== n.length
				? Log_1.Log.CheckError() &&
					Log_1.Log.Error("Activity", 38, "[日常探险活动] 任务奖励配置不正确", [
						"TaskId",
						this.Pe.TaskId,
					])
				: ((o = { Item: n[0], HasClaimed: 2 === this.Pe.TaskState }),
					this.gOe.Refresh(o),
					this.gOe.SetReceivableVisible(0 === this.Pe.TaskState),
					this.gOe.SetLockVisible(1 === this.Pe.TaskState),
					(o = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
						r.TaskTitle,
					)),
					LguiUtil_1.LguiUtil.SetLocalTextNew(
						this.GetText(3),
						"Text_ActivityTaskProgress_Text",
						o,
						this.Pe.CurrentProgress.toString(),
						this.Pe.TargetProgress.toString(),
					),
					(o = !StringUtils_1.StringUtils.IsEmpty(r.TaskDescription)),
					this.GetText(4).SetUIActive(o),
					o &&
						LguiUtil_1.LguiUtil.SetLocalTextNew(
							this.GetText(4),
							r.TaskDescription,
						),
					this._Oe(e.TaskState));
		}
	}
	_Oe(e) {
		switch (e) {
			case 1:
				var t = 1 !== this.TaskJumpType;
				this.GetButton(5).RootUIComp.SetUIActive(t),
					this.GetItem(7).SetUIActive(!t),
					this.uOe(!1),
					this.vOe(!1),
					this.GetSprite(6).SetAlpha(1);
				break;
			case 0:
				this.GetButton(5).RootUIComp.SetUIActive(!1),
					this.GetItem(7).SetUIActive(!1),
					this.uOe(!0),
					this.vOe(!0),
					this.GetSprite(6).SetAlpha(1);
				break;
			case 2:
				this.GetButton(5).RootUIComp.SetUIActive(!1),
					this.GetItem(7).SetUIActive(!1),
					this.uOe(!1),
					this.vOe(!1),
					this.GetSprite(6).SetAlpha(0.5);
		}
	}
	uOe(e) {
		this.GetText(3).SetChangeColor(e, this.GetText(3).changeColor);
	}
	vOe(e) {
		this.GetSprite(2).SetChangeColor(e, this.GetSprite(2).changeColor);
	}
}
exports.DailyAdventureTaskItem = DailyAdventureTaskItem;
