"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.InstanceDungeonGrid = void 0);
const UE = require("ue"),
	Log_1 = require("../../../Core/Common/Log"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	TimeUtil_1 = require("../../Common/TimeUtil"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../Ui/Base/UiPanelBase"),
	LguiUtil_1 = require("../Util/LguiUtil");
class InstanceDungeonGrid extends UiPanelBase_1.UiPanelBase {
	constructor(e, t) {
		super(),
			(this.NUe = 0),
			(this.sli = (e) => {}),
			(this.kqe = (e) => {
				1 === e && this.sli(this.NUe);
			}),
			(this.NUe = e),
			this.CreateThenShowByActor(t.GetOwner());
	}
	get ClickCallback() {
		return this.sli;
	}
	set ClickCallback(e) {
		this.sli = e;
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIText],
			[2, UE.UIExtendToggle],
			[3, UE.UIItem],
			[4, UE.UIItem],
			[5, UE.UIText],
			[6, UE.UIItem],
			[7, UE.UIItem],
			[8, UE.UIText],
			[9, UE.UIText],
			[10, UE.UIItem],
		]),
			(this.BtnBindInfo = [[2, this.kqe]]);
	}
	OnStart() {
		this.GetItem(4).SetUIActive(!1);
		var e = this.GetText(1),
			t = this.GetItem(10);
		ModelManager_1.ModelManager.InstanceDungeonEntranceModel.CheckInstanceCanChallenge(
			this.NUe,
		)
			? (e.SetUIActive(!0), t.SetUIActive(!1))
			: (e.SetUIActive(!1), t.SetUIActive(!0));
	}
	OnBeforeDestroy() {}
	ShowTitle(e) {
		this.GetItem(4).SetUIActive(!0),
			(e =
				ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetTitleConfig(
					e,
				)) &&
				LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), e.CommonText),
			(e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
				this.NUe,
			).EnterControlId),
			(e =
				ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetInstanceData(
					e,
				)),
			e?.LimitChallengedTimes
				? (this.GetItem(6).SetUIActive(!0),
					this.GetText(8).SetUIActive(!0),
					this.GetText(8).SetText(
						e.LeftChallengedTimes + "/" + e.LimitChallengedTimes,
					))
				: (this.GetItem(6).SetUIActive(!1), this.GetText(8).SetUIActive(!1)),
			(e =
				ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetInstanceResetTime(
					this.NUe,
				));
		let t = MathUtils_1.MathUtils.LongToBigInt(e ?? 0);
		t <= 0 &&
			(t = MathUtils_1.MathUtils.LongToBigInt(
				ModelManager_1.ModelManager.InstanceDungeonEntranceModel
					.EntranceEndTime,
			));
		e = Number(t) - TimeUtil_1.TimeUtil.GetServerTime();
		0 < t && 0 < e
			? (this.GetItem(7).SetUIActive(!0),
				(e = TimeUtil_1.TimeUtil.CalculateRemainingTime(e)),
				LguiUtil_1.LguiUtil.SetLocalText(
					this.GetText(9),
					e.TextId,
					e.TimeValue,
				))
			: this.GetItem(7).SetUIActive(!1);
	}
	SetSelected(e, t = !1) {
		t
			? this.GetExtendToggle(2).SetToggleStateForce(e ? 1 : 0, !1, !0)
			: this.GetExtendToggle(2).SetToggleState(e ? 1 : 0, !1);
	}
	OnDeselected(e) {
		this.SetSelected(!1, e);
	}
	Refresh() {
		this.UpdateView(this.NUe);
	}
	UpdateView(e) {
		var t;
		e
			? (this.GetText(0).ShowTextNew(
					ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e)
						.MapName,
				),
				(t =
					ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetRecommendLevel(
						e,
						ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel,
					)),
				LguiUtil_1.LguiUtil.SetLocalText(
					this.GetText(1),
					"InstanceDungeonRecommendLevel",
					t,
				),
				this.GetItem(3).SetUIActive(
					!ModelManager_1.ModelManager.InstanceDungeonEntranceModel.CheckInstanceUnlock(
						e,
					),
				))
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"InstanceDungeon",
					17,
					"副本格子视图刷新失败，instanceId非法",
				);
	}
}
exports.InstanceDungeonGrid = InstanceDungeonGrid;
