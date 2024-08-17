"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ActivitySubViewLongShan = void 0);
const UE = require("ue"),
	CustomPromise_1 = require("../../../../../Core/Common/CustomPromise"),
	LongShanStageById_1 = require("../../../../../Core/Define/ConfigQuery/LongShanStageById"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	UiManager_1 = require("../../../../Ui/UiManager"),
	ActivitySubViewBase_1 = require("../../View/SubView/ActivitySubViewBase"),
	ActivitySubViewGeneralInfo_1 = require("../../View/SubView/ActivitySubViewGeneralInfo"),
	ActivityLongShanController_1 = require("./ActivityLongShanController"),
	LongShanStageItem_1 = require("./LongShanStageItem");
class ActivitySubViewLongShan extends ActivitySubViewBase_1.ActivitySubViewBase {
	constructor() {
		super(...arguments),
			(this.ActivityBaseData = void 0),
			(this.CommonInfoPanel = void 0),
			(this.StageItems = void 0),
			(this.SGn = !1),
			(this.UOe = () => {
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.SetActivityViewState,
					!1,
					0,
				);
			}),
			(this.AOe = () => {
				this.StageItems?.forEach((e) => {
					e.RefreshState();
				}),
					this.GetButton(3).RootUIComp.SetUIActive(
						0 <=
							this.ActivityBaseData.StageIds.findIndex(
								(e) => void 0 === this.ActivityBaseData.GetStageInfoById(e),
							),
					),
					this.BNe();
			}),
			(this.POe = () => {
				if (this.ActivityBaseData && this.ActivityBaseData.StageIds) {
					let t;
					for (const i of this.ActivityBaseData.StageIds)
						if (!this.ActivityBaseData?.GetStageInfoById(i)) {
							var e = LongShanStageById_1.configLongShanStageById.GetConfig(i);
							t = e?.QuestionId;
							break;
						}
					UiManager_1.UiManager.OpenView("QuestView", t);
				}
			}),
			(this.wOe = (e) => {
				ActivityLongShanController_1.ActivityLongShanController.GetActivityData().GetStageInfoById(
					e,
				)
					? ((this.SGn = !0), UiManager_1.UiManager.OpenView("LongShanView", e))
					: ActivityLongShanController_1.ActivityLongShanController.ShowUnlockTip(
							e,
						);
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIText],
			[2, UE.UIItem],
			[3, UE.UIButtonComponent],
			[4, UE.UIItem],
			[5, UE.UIItem],
			[6, UE.UIItem],
			[7, UE.UIItem],
			[8, UE.UIItem],
		]),
			(this.BtnBindInfo = [[3, this.POe]]);
	}
	OnSetData() {}
	async OnBeforeStartAsync() {
		(this.CommonInfoPanel =
			new ActivitySubViewGeneralInfo_1.ActivitySubViewGeneralInfo()),
			this.CommonInfoPanel.SetData(this.ActivityBaseData),
			this.AddChild(this.CommonInfoPanel);
		var e = [
			this.CommonInfoPanel.OnlyCreateByActorAsync(this.GetItem(2).GetOwner()),
		];
		this.StageItems = [];
		for (const i of this.ActivityBaseData.StageIds) {
			var t = new LongShanStageItem_1.LongShanStageItem(i);
			(t.OnClickStageDetail = this.wOe),
				this.AddChild(t),
				e.push(
					t.OnlyCreateByActorAsync(
						this.GetItem(4 + this.StageItems.length).GetOwner(),
					),
				),
				this.StageItems.push(t);
		}
		await Promise.all(e);
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.LongShanUpdate,
			this.AOe,
		);
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.LongShanUpdate,
			this.AOe,
		);
	}
	OnStart() {
		this.FNe();
	}
	OnBeforeShow() {
		this.CommonInfoPanel?.SetBtnText("LongShanStage_Join"),
			this.CommonInfoPanel?.SetClickFunc(this.UOe),
			this.BNe();
	}
	async OnBeforeHideSelfAsync() {
		this.SGn &&
			(await this.LevelSequencePlayer.PlaySequenceAsync(
				"TransOut",
				new CustomPromise_1.CustomPromise(),
				!0,
			));
	}
	OnTimer(e) {
		this.FNe();
	}
	OnRefreshView() {
		this.FNe(),
			this.CommonInfoPanel?.OnRefreshView(),
			this.AOe(),
			this.SGn &&
				(this.LevelSequencePlayer.PlayLevelSequenceByName("TransIn", !0),
				(this.SGn = !1));
	}
	OnCommonViewStateChange(e) {
		this.PlaySubViewSequence(e ? "SwitchOut" : "SwitchIn", !0);
	}
	OnSequenceStart(e) {
		"Start" === e || "SwitchOut" === e
			? this.Bxn(!1)
			: "SwitchIn" === e && this.Bxn(!0);
	}
	Bxn(e) {
		if ((this.GetButton(3)?.SetSelfInteractive(e), this.StageItems))
			for (const t of this.StageItems) t.SetButtonInteractive(e);
	}
	FNe() {
		var [e, t] = this.GetTimeVisibleAndRemainTime();
		this.GetText(1).SetUIActive(e), e && this.GetText(1).SetText(t);
	}
	BNe() {
		var e =
			ActivityLongShanController_1.ActivityLongShanController.GetActivityData().CheckAnyStageRed();
		this.CommonInfoPanel?.SetFunctionRedDotVisible(e);
	}
}
exports.ActivitySubViewLongShan = ActivitySubViewLongShan;
