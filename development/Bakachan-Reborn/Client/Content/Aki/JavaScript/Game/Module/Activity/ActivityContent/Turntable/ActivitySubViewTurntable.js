"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ActivitySubViewTurntable = void 0);
const UE = require("ue"),
	CustomPromise_1 = require("../../../../../Core/Common/CustomPromise"),
	CommonDefine_1 = require("../../../../../Core/Define/CommonDefine"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	PublicUtil_1 = require("../../../../Common/PublicUtil"),
	TimeUtil_1 = require("../../../../Common/TimeUtil"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController"),
	GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
	ActivitySubViewBase_1 = require("../../View/SubView/ActivitySubViewBase"),
	ActivityFunctionalTypeA_1 = require("../UniversalComponents/Functional/ActivityFunctionalTypeA"),
	ActivityTitleTypeA_1 = require("../UniversalComponents/Title/ActivityTitleTypeA"),
	ActivityTurntableComponent_1 = require("./ActivityTurntableComponent"),
	ActivityTurntableController_1 = require("./ActivityTurntableController"),
	ActivityTurntableItem_1 = require("./ActivityTurntableItem"),
	titleIdNameList = [
		[1, 2, 3],
		[2, 1, 3],
		[3, 1, 2],
	];
class ActivitySubViewTurntable extends ActivitySubViewBase_1.ActivitySubViewBase {
	constructor() {
		super(...arguments),
			(this.ActivityTurntableData = void 0),
			(this.LNe = void 0),
			(this.SDn = void 0),
			(this.BIn = void 0),
			(this.bIn = void 0),
			(this.yBn = void 0),
			(this.qIn = void 0),
			(this.GIn = -1),
			(this.PNe = !1),
			(this.xNe = 0),
			(this.wNe = (t) => {
				t === this.ActivityTurntableData.Id && this.xbn();
			}),
			(this.NIn = () => {
				var t = new ActivityTurntableItem_1.ActivityTurntableToggleGroupItem();
				return (t.ToggleCallBack = this.pqe), t;
			}),
			(this.pqe = (t, e) => {
				e &&
					(0 <= this.GIn &&
						this.GIn !== t &&
						this.qIn.GetLayoutItemByIndex(this.GIn).SetToggleState(!1),
					this.OIn(t, this.GIn),
					this.EDn());
			}),
			(this.kIn = () => {
				this.ActivityTurntableData.GetActivityCurrencyCount() >=
					this.ActivityTurntableData.TurntableCostCount &&
					ActivityTurntableController_1.ActivityTurntableController.RequestTurntableRun(
						this.ActivityTurntableData.Id,
					);
			}),
			(this.IBn = []),
			(this.TBn = []),
			(this.FIn = (t) => {
				const e = this.ActivityTurntableData.GetCurrentRoundId(),
					i = this.GIn;
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.SetActivityViewState,
					!1,
					1,
					!0,
				),
					this.bIn.RunTurntableByRewardId(t, () => {
						ActivityTurntableController_1.ActivityTurntableController.ShowTurntableItemObtain(
							this.ActivityTurntableData.GetRunResult(),
							() => {
								EventSystem_1.EventSystem.Emit(
									EventDefine_1.EEventName.SetActivityViewState,
									!0,
									1,
									!0,
								),
									e !== i &&
										ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
											"TurntableActivity_Tips01",
										);
							},
						),
							this.VIn();
					});
			});
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
			[2, UE.UIItem],
			[3, UE.UIItem],
			[4, UE.UIHorizontalLayout],
			[6, UE.UIItem],
			[5, UE.UIItem],
			[7, UE.UIItem],
			[8, UE.UIItem],
			[9, UE.UISprite],
			[10, UE.UISprite],
			[11, UE.UISprite],
			[12, UE.UISprite],
			[13, UE.UISprite],
		];
	}
	OnSetData() {
		this.ActivityTurntableData = this.ActivityBaseData;
	}
	async OnBeforeStartAsync() {
		var t = this.GetItem(1);
		(this.LNe = new ActivityTitleTypeA_1.ActivityTitleTypeA()),
			await this.LNe.CreateThenShowByActorAsync(t.GetOwner()),
			(t = this.GetItem(3)),
			(this.BIn = new ActivityTurntableItem_1.ActivityTurntableQuestItem()),
			await this.BIn.CreateThenShowByActorAsync(t.GetOwner()),
			(t = this.GetItem(5)),
			(this.bIn =
				new ActivityTurntableComponent_1.ActivityTurntableComponent()),
			await this.bIn.CreateThenShowByActorAsync(t.GetOwner()),
			(t = this.GetItem(8)),
			(this.yBn =
				new ActivityTurntableComponent_1.ActivityTurntableComponent()),
			await this.yBn.CreateThenShowByActorAsync(t.GetOwner()),
			(t = this.GetItem(7));
		(this.SDn = new ActivityFunctionalTypeA_1.ActivityFunctionalTypeA()),
			await this.SDn.CreateThenShowByActorAsync(t.GetOwner()),
			(this.qIn = new GenericLayout_1.GenericLayout(
				this.GetHorizontalLayout(4),
				this.NIn,
			));
	}
	OnStart() {
		this.ActivityBaseData.LocalConfig &&
			(this.LNe.SetTitleByText(this.ActivityBaseData.GetTitle()),
			this.SDn.FunctionButton.BindCallback(this.kIn),
			this.SDn.SetFunctionRedDotVisible(!0),
			this.yBn.SetActive(!1),
			(this.yBn.Activate = !1),
			this.LBn());
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.TurntableStartRun,
			this.FIn,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.RefreshCommonActivityRedDot,
				this.wNe,
			);
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.TurntableStartRun,
			this.FIn,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.RefreshCommonActivityRedDot,
				this.wNe,
			);
	}
	OnRefreshView() {
		this.HIn(),
			this.VIn(),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.SetActivityViewCurrency,
				[this.ActivityTurntableData.TurntableCostConfigId],
			);
	}
	OnBeforeDestroy() {
		(this.IBn.length = 0), (this.TBn.length = 0);
	}
	OnTimer(t) {
		this.FNe();
	}
	xbn() {
		var t = this.ActivityTurntableData.IsHasNewQuestRedDot();
		this.BIn.SetRedDot(t);
	}
	HIn() {
		this.PNe = !1;
		var t = this.ActivityTurntableData.GetCurrentQuestProgress(),
			e = this.ActivityTurntableData.QuestList.length;
		if ((this.GetItem(2).SetUIActive(t < e), t !== e)) {
			this.BIn.SetTitle(
				"TurntableActivity_Progress",
				t.toString(),
				e.toString(),
			);
			var i = this.ActivityTurntableData.GetCurrentQuestIndex(),
				n =
					((t = this.ActivityTurntableData.QuestList[i]),
					(e = this.ActivityTurntableData.QuestStateMap.get(t)),
					ModelManager_1.ModelManager.QuestNewModel.GetQuestConfig(t)),
				s = n?.RewardId;
			if (
				0 !== s &&
				!((s = this.ActivityTurntableData.GetPreviewReward(s)).length < 1)
			) {
				let r = !1;
				switch (e.QuestState) {
					case 1:
					case 2:
						var a = n?.TidName;
						a = a ? PublicUtil_1.PublicUtil.GetConfigTextByKey(a) : "";
						this.BIn.SetTxt(a);
						break;
					case 3:
						(r = !0),
							(this.PNe = !0),
							(a = this.ActivityTurntableData.QuestList[i + 1]),
							(a = this.ActivityTurntableData.QuestStateMap.get(a)),
							(this.xNe = a.QuestUnlockStamp),
							this.FNe();
				}
				this.BIn.Refresh(r, s[0], t, this.ActivityTurntableData.Id), this.xbn();
			}
		}
	}
	FNe() {
		var [t, e] = this.GetTimeVisibleAndRemainTime();
		this.LNe.SetTimeTextVisible(t),
			t && this.LNe.SetTimeTextByText(e),
			this.PNe &&
				this.BIn.SetTxtById("TurntableActivity_TaskDesc", this.jIn(this.xNe));
	}
	jIn(t) {
		var e = TimeUtil_1.TimeUtil.GetServerTime();
		(t = Math.max(t - e, 1)), (e = this.jNe(t));
		return (
			TimeUtil_1.TimeUtil.GetCountDownDataFormat2(t, e[0], e[1])
				.CountDownText ?? ""
		);
	}
	jNe(t) {
		return t > CommonDefine_1.SECOND_PER_DAY
			? [3, 2]
			: t > CommonDefine_1.SECOND_PER_HOUR
				? [2, 1]
				: t > CommonDefine_1.SECOND_PER_MINUTE
					? [1, 0]
					: [0, 0];
	}
	EDn() {
		var t = this.ActivityTurntableData.GetCurrentRoundId() === this.GIn,
			e = this.ActivityTurntableData.IsRoundUnFinished(this.GIn),
			i = this.ActivityTurntableData.IsHasRewardRedDot();
		e
			? t
				? i
					? this.yDn()
					: this.IDn("TurntableActivity_ForbidTips01")
				: this.IDn("TurntableActivity_ForbidTips02")
			: this.TDn();
	}
	TDn() {
		this.SDn.FunctionButton.SetActive(!1),
			this.SDn.SetPanelConditionVisible(!1),
			this.SDn.SetActivatePanelConditionVisible(!0);
	}
	IDn(t) {
		this.SDn.FunctionButton.SetActive(!1),
			this.SDn.SetPanelConditionVisible(!0),
			this.SDn.SetLockTextByTextId(t),
			this.SDn.SetActivatePanelConditionVisible(!1);
	}
	yDn() {
		this.SDn.FunctionButton.SetActive(!0),
			this.SDn.SetPanelConditionVisible(!1),
			this.SDn.SetActivatePanelConditionVisible(!1);
	}
	VIn() {
		this.qIn.RefreshByData(this.ActivityTurntableData.RoundIdList, () => {
			var t = this.ActivityTurntableData.GetCurrentRoundId(),
				e = this.qIn.GetLayoutItemList();
			for (let s = 0; s < this.ActivityTurntableData.RoundIdList.length; s++) {
				var i = this.ActivityTurntableData.RoundIdList[s],
					n = this.ActivityTurntableData.IsRoundUnFinished(i);
				n = (e[s].SetToggleDisable(!n), i === t);
				e[s].SetToggleState(n, !1);
			}
			this.OIn(t, this.GIn, !1), this.EDn();
		});
	}
	LBn() {
		for (const i of titleIdNameList) {
			var t = [];
			for (const n of i) {
				var e = "SP_TurntableTitleRound" + n;
				e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e);
				t.push(e);
			}
			this.TBn.push(t);
		}
		for (const t of [
			[9, 0, !0],
			[10, 0, !1],
			[11, 1, !0],
			[12, 2, !0],
			[13, 0, !0],
		]) {
			var i = { Sprite: this.GetSprite(t[0]), Index: t[1], IsCurrent: t[2] };
			this.IBn.push(i);
		}
	}
	async mGe(t, e) {
		let i = 0;
		const n = new CustomPromise_1.CustomPromise();
		var s = () => {
			++i === this.IBn.length && n.SetResult();
		};
		for (const i of this.IBn) {
			var a = i.IsCurrent ? t : e;
			a = this.TBn[a][i.Index];
			this.SetSpriteByPath(a, i.Sprite, !1, void 0, s);
		}
		await n.Promise;
	}
	async OIn(t, e, i = !0) {
		this.GIn = t;
		var n =
			((i = i && 0 <= e) &&
				(await this.DBn(e, this.yBn),
				this.yBn.SetUiActive(!0),
				this.bIn.SetUiActive(!1)),
			[this.DBn(t, this.bIn), this.mGe(t, 0 <= e ? e : t)]);
		await Promise.all(n),
			i &&
				(await this.LevelSequencePlayer.PlaySequenceAsync(
					e < t ? "PageDown" : "PageUp",
					new CustomPromise_1.CustomPromise(),
					!0,
				));
	}
	async DBn(t, e) {
		var i = [];
		for (const e of this.ActivityTurntableData.RoundRewardIdMap.get(t)) {
			var n = this.ActivityTurntableData.AllRewardInfo.get(e);
			i.push(n);
		}
		await e.Refresh(i);
	}
	OnCommonViewStateChange(t) {
		this.LevelSequencePlayer.PlayLevelSequenceByName(
			t ? "TurnTableOut" : "TurnTableIn",
			!0,
		);
	}
}
exports.ActivitySubViewTurntable = ActivitySubViewTurntable;
