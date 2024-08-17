"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoguelikeRandomEventView = void 0);
const UE = require("ue"),
	Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
	TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
	StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiComponentsAction_1 = require("../../../Ui/Base/UiComponentsAction"),
	UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
	UiManager_1 = require("../../../Ui/UiManager"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	RoguelikeDefine_1 = require("../Define/RoguelikeDefine"),
	RoguelikeController_1 = require("../RoguelikeController"),
	RogueSelectResult_1 = require("../Define/RogueSelectResult");
class RoguelikeRandomEventItem extends UiComponentsAction_1.UiComponentsAction {
	constructor() {
		super(...arguments),
			(this.Data = void 0),
			(this.OnClickEvent = () => {
				(ModelManager_1.ModelManager.RoguelikeModel.CurrentRogueGainEntry =
					this.Data),
					RoguelikeController_1.RoguelikeController.RogueChooseDataResultRequest(
						7,
					);
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIButtonComponent],
			[1, UE.UIText],
			[2, UE.UIText],
		]),
			(this.BtnBindInfo = [[0, this.OnClickEvent]]);
	}
	OnStart() {
		this.Refresh(this.Data);
	}
	SetButtonState(e) {
		this.GetButton(0).SetSelfInteractive(e);
	}
	Refresh(e) {
		this.Data = e;
		var t =
			ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueEventConfigById(
				e.ConfigId,
			);
		LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t?.Title ?? ""),
			LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), t?.TextId ?? ""),
			(t =
				ModelManager_1.ModelManager.RoguelikeModel.GetRoguelikeCurrency(
					RoguelikeDefine_1.INSIDE_CURRENCY_ID,
				) >= (e.Cost ?? 0));
		this.GetButton(0)?.SetSelfInteractive(t);
	}
}
class RoguelikeRandomEventView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.EventItemList = []),
			(this.EventActorList = []),
			(this.DelayShowTimerId = void 0),
			(this.RoguelikeChooseDataResult = (e, t, o, i, n) => {
				const r =
					ModelManager_1.ModelManager.RoguelikeModel?.GetRoguelikeChooseDataById(
						this.OpenParam.Index,
					);
				i === r?.Index &&
					RoguelikeController_1.RoguelikeController.CreateCloseViewCallBack(
						n,
						() => {
							var e = new RogueSelectResult_1.RogueSelectResult(
								ModelManager_1.ModelManager.RoguelikeModel.RogueInfo
									?.PhantomEntry,
								t,
								void 0,
								!1,
							);
							(e.CallBack = () => {
								this.UpdateEventList(r, !1);
							}),
								0 < e.GetNewUnlockAffixEntry().size
									? UiManager_1.UiManager.OpenView("CommonSelectResultView", e)
									: this.Zao(() => {
											this.UpdateEventList(r, !1);
										}) || this.UpdateEventList(r, !1);
						},
					)?.();
			});
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
		];
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.RoguelikeChooseDataResult,
			this.RoguelikeChooseDataResult,
		);
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.RoguelikeChooseDataResult,
			this.RoguelikeChooseDataResult,
		);
	}
	OnBeforeShow() {
		this.GetItem(0).SetUIActive(!1);
		const e =
			ModelManager_1.ModelManager.RoguelikeModel?.GetRoguelikeChooseDataById(
				this.OpenParam.Index,
			);
		this.Zao(() => {
			this.UpdateEventList(e);
		}) || this.UpdateEventList(e);
	}
	OnBeforeDestroy() {
		this.EventItemList.forEach((e) => {
			e.Destroy();
		}),
			void 0 !== this.DelayShowTimerId &&
				TimerSystem_1.TimerSystem.Remove(this.DelayShowTimerId),
			(this.EventItemList.length = 0),
			(this.EventActorList.length = 0);
	}
	UpdateEventList(e, t = !0) {
		var o =
				ConfigManager_1.ConfigManager.RoguelikeConfig?.GetRogueEventConfigById(
					e.EventId,
				),
			i = 0 === e.RogueGainEntryList.length;
		this.GetItem(0).SetUIActive(!1),
			i && !StringUtils_1.StringUtils.IsEmpty(o?.FlowListName)
				? ((i = { ViewName: this.Info?.Name, Position: 2 }),
					RoguelikeController_1.RoguelikeController.StartFlowForView(
						e.Index,
						o.FlowListName,
						o.FlowId,
						o.StateId,
						i,
					))
				: (StringUtils_1.StringUtils.IsEmpty(o?.FlowListName) ||
						(RoguelikeController_1.RoguelikeController.CurrentFlowListName ===
							o?.FlowListName &&
							RoguelikeController_1.RoguelikeController.CurrentStateId ===
								o?.StateId &&
							RoguelikeController_1.RoguelikeController.CurrentFlowId ===
								o?.FlowId) ||
						!t ||
						((i = { ViewName: this.Info?.Name, Position: 2 }),
						RoguelikeController_1.RoguelikeController.StartFlowForView(
							e.Index,
							o.FlowListName,
							o.FlowId,
							o.StateId,
							i,
						),
						1 !== o?.StateId)) &&
					(() => {
						var t,
							o =
								1 !== RoguelikeController_1.RoguelikeController.CurrentStateId;
						if (
							((RoguelikeController_1.RoguelikeController.CurrentFlowId = -1),
							(RoguelikeController_1.RoguelikeController.CurrentStateId = -1),
							(RoguelikeController_1.RoguelikeController.CurrentFlowListName =
								""),
							0 !== e.RogueGainEntryList.length)
						) {
							let i = !1;
							for (let o = 0; o < e.RogueGainEntryList.length; o++)
								this.EventItemList[o]
									? (this.EventActorList[o].SetUIActive(!0),
										this.EventItemList[o].Refresh(e.RogueGainEntryList[o]))
									: (this.EventActorList[o] ||
											((t = LguiUtil_1.LguiUtil.CopyItem(
												this.GetItem(1),
												this.GetItem(0),
											)),
											this.EventActorList.push(t)),
										((t = new RoguelikeRandomEventItem()).Data =
											e.RogueGainEntryList[o]),
										t
											.CreateThenShowByActorAsync(
												this.EventActorList[o].GetOwner(),
											)
											.then(() => {
												this.EventItemList[o].Refresh(e.RogueGainEntryList[o]),
													this.EventActorList[o].SetUIActive(!0);
											}),
										this.EventItemList.push(t)),
									(i = i || e.RogueGainEntryList[o].IsSelect);
							this.GetItem(1).SetUIActive(!1);
							for (
								let t = e.RogueGainEntryList.length;
								t < this.EventActorList.length;
								t++
							)
								this.EventActorList[t].SetUIActive(!1);
							i &&
								this.EventItemList.forEach((e) => {
									e.SetButtonState(!e.Data?.IsSelect);
								}),
								o
									? (void 0 !== this.DelayShowTimerId &&
											TimerSystem_1.TimerSystem.Remove(this.DelayShowTimerId),
										(this.DelayShowTimerId = TimerSystem_1.TimerSystem.Delay(
											() => {
												this.GetItem(0).SetUIActive(!0);
											},
											1e3,
										)))
									: this.GetItem(0).SetUIActive(!0);
						}
					})();
	}
	Zao(e) {
		var t =
			ModelManager_1.ModelManager.RoguelikeModel?.GetRoguelikeChooseDataById(
				Protocol_1.Aki.Protocol._3s.Proto_EventRoleBuffBindId,
			);
		return (
			void 0 !== t &&
			!t.IsSelect &&
			t.Layer === ModelManager_1.ModelManager.RoguelikeModel?.CurRoomCount &&
			((t.CallBack = e),
			UiManager_1.UiManager.OpenView("RoleBuffSelectView", t),
			!0)
		);
	}
}
exports.RoguelikeRandomEventView = RoguelikeRandomEventView;
