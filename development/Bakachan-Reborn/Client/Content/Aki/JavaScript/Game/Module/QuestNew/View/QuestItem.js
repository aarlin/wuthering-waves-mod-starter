"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.QuestItem = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
	FunctionConditionByFunctionId_1 = require("../../../../Core/Define/ConfigQuery/FunctionConditionByFunctionId"),
	MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
	StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	TimeUtil_1 = require("../../../Common/TimeUtil"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	RedDotController_1 = require("../../../RedDot/RedDotController"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	GeneralLogicTreeController_1 = require("../../GeneralLogicTree/GeneralLogicTreeController"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	TickInterval = 1e3;
class QuestItem extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(),
			(this.QuestId = 0),
			(this.TreeId = BigInt(0)),
			(this.QuestType = 0),
			(this.Nwn = !1),
			(this.e8 = 0),
			(this.vro = void 0),
			(this.Iro = void 0),
			(this.vro = e);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UISprite],
			[1, UE.UISprite],
			[2, UE.UIText],
			[3, UE.UIText],
			[4, UE.UIExtendToggle],
			[5, UE.UISprite],
			[6, UE.UIItem],
			[7, UE.UIItem],
			[8, UE.UITexture],
			[9, UE.UISprite],
			[10, UE.UIText],
		];
	}
	OnStart() {
		(this.Iro = this.GetItem(7)
			.GetOwner()
			.GetComponentByClass(UE.UIExtendToggleSpriteTransition.StaticClass())),
			this.Iro.SetEnable(!1),
			this.GetItem(7).SetColor(
				this.Iro.TransitionState.CheckedHoverState.Color,
			),
			this.GetExtendToggle(4)?.SetToggleState(0);
	}
	OnTick(e) {
		this.QuestId &&
			(this.e8 > 1e3 && ((this.e8 -= 1e3), this.kwn(this.QuestId, !0)),
			(this.e8 += e));
	}
	UpdateItem(e, t) {
		(this.QuestId = e),
			(this.QuestType = t),
			this.Mro(),
			this.UpdateTrackIconActive(),
			(e = ModelManager_1.ModelManager.QuestNewModel.GetQuest(this.QuestId))
				? ((this.TreeId = e.TreeId ?? BigInt(0)),
					this.Tro(e),
					this.Lro(),
					this.Dro(e),
					this.Q_t(e),
					this.Rro(e),
					this.UpdateFunctionIcon(e),
					this.Uro(e),
					RedDotController_1.RedDotController.BindRedDot(
						"QuestViewItem",
						this.GetItem(6),
						void 0,
						this.QuestId,
					))
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error("Quest", 19, "任务界面任务Item更新时找不到任务", [
						"任务Id",
						this.QuestId,
					]);
	}
	SetActiveItem(e) {
		this.SetActive(e),
			e || RedDotController_1.RedDotController.UnBindRedDot("QuestViewItem");
	}
	Tro(e) {
		e = ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestTypeColor(e.Type);
		var t = this.GetSprite(5);
		StringUtils_1.StringUtils.IsEmpty(e)
			? t.SetUIActive(!1)
			: (t.SetUIActive(!0), t.SetColor(UE.Color.FromHex(e)));
	}
	Lro() {
		var e = ModelManager_1.ModelManager.QuestNewModel.GetQuestLockIconPath(
				this.QuestId,
			),
			t = this.GetSprite(1);
		StringUtils_1.StringUtils.IsEmpty(e) ||
		ModelManager_1.ModelManager.QuestNewModel.GetCurTrackedQuest()?.Id ===
			this.QuestId
			? t.SetUIActive(!1)
			: (this.SetSpriteByPath(e, t, !0), t.SetUIActive(!0));
	}
	Dro(e) {
		this.SetSpriteByPath(
			ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestTypeMark(
				e.QuestMarkId,
			),
			this.GetSprite(0),
			!1,
		);
	}
	UpdateTrackIconActive() {
		var e = this.GetExtendToggle(4).ToggleState;
		this.Aro(e),
			this.GetSprite(0).SetUIActive(
				this.QuestId ===
					ModelManager_1.ModelManager.QuestNewModel.GetCurTrackedQuest()?.Id,
			);
	}
	Mro() {
		this.GetExtendToggle(4).OnStateChange.Add((e) => {
			1 === e && this.vro(this.QuestId);
		});
	}
	Q_t(e) {
		this.GetText(2).SetText(e.Name);
	}
	Rro(e) {
		var t,
			i = this.GetText(3);
		!e.IsSuspend() &&
		(t = e.GetCurrentActiveChildQuestNode()) &&
		GeneralLogicTreeController_1.GeneralLogicTreeController.IsShowNodeTrackDistance(
			e.TreeId,
			t.NodeId,
		) &&
		((t = e.GetTrackDistance(t.NodeId)), !e.IsInTrackRange()) &&
		t
			? (LguiUtil_1.LguiUtil.SetLocalText(i, "Meter", t), i.SetUIActive(!0))
			: i.SetUIActive(!1);
	}
	UpdateFunctionIcon(e) {
		var t = this.GetTexture(8),
			i = this.GetSprite(9);
		(e &&
		7 === e.Type &&
		e.FunctionId &&
		(e =
			FunctionConditionByFunctionId_1.configFunctionConditionByFunctionId.GetConfig(
				e.FunctionId,
			))
			? StringUtils_1.StringUtils.IsBlank(e.Icon)
				? StringUtils_1.StringUtils.IsBlank(e.IconSprite)
					? (t.SetUIActive(!1), i)
					: (this.SetSpriteByPath(e.IconSprite, i, !1), i.SetUIActive(!0), t)
				: (this.SetTextureByPath(e.Icon, t), t.SetUIActive(!0), i)
			: (t.SetUIActive(!1), i)
		).SetUIActive(!1);
	}
	Uro(e) {
		this.Nwn = !1;
		var t = e.IsQuestCanPreShow(),
			i = e.IsSuspend() ?? !1,
			o = e.IsQuestHasRecommendPreQuest() ?? !1,
			n = e.HasRefOccupiedEntity() ?? !1,
			r = this.GetText(10),
			s = ModelManager_1.ModelManager.QuestNewModel.GetQuestBindingActivityId(
				e.Id,
			);
		if (t || i || o || n || s) {
			r.SetUIActive(!0);
			let a = "",
				d = "";
			if (i)
				(a = e.GetSuspendText()?.split("，")[0]),
					r.SetText(a),
					(d =
						CommonParamById_1.configCommonParamById.GetStringConfig(
							"TaskUnableColor",
						) ?? "");
			else if (n)
				(a = e.GetRefOccupiedEntityText()?.split("，")[0]),
					r.SetText(a),
					(d =
						CommonParamById_1.configCommonParamById.GetStringConfig(
							"TaskUnableColor",
						) ?? "");
			else if (t)
				(a =
					ModelManager_1.ModelManager.QuestNewModel.GetShowQuestConditionDescribe(
						e.Id,
					)),
					r.SetText(a),
					(d =
						CommonParamById_1.configCommonParamById.GetStringConfig(
							"TaskUnableColor",
						) ?? "");
			else if (o) {
				s = e.GetRecommendPreQuest();
				let t = "";
				s?.length &&
					(t =
						ModelManager_1.ModelManager.QuestNewModel.GetQuest(s[0])?.Name ??
						""),
					LguiUtil_1.LguiUtil.SetLocalText(r, "QuestRecommendTip", t),
					(d =
						CommonParamById_1.configCommonParamById.GetStringConfig(
							"TaskRemindColor",
						) ?? "");
			} else
				(this.Nwn = !0),
					this.kwn(e.Id, !1),
					(d =
						CommonParamById_1.configCommonParamById.GetStringConfig(
							"TaskCountDownColor",
						) ?? "");
			(i = UE.Color.FromHex(d)), r.SetColor(i);
		} else r.SetUIActive(!1);
	}
	kwn(e, t) {
		var i, o, n, r;
		this.Nwn &&
			(ModelManager_1.ModelManager.QuestNewModel.GetQuest(this.QuestId)
				? ((i = this.GetText(10)),
					(n =
						ModelManager_1.ModelManager.QuestNewModel.GetQuestBindingActivityId(
							e,
						)),
					(n = ModelManager_1.ModelManager.ActivityModel.GetActivityById(n)) &&
					n.LocalConfig?.IfShowQuestLeftTime &&
					(o = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
						"ActivityRemainingTime",
					))
						? n.CheckIfInOpenTime()
							? n.EndOpenTime
								? ((r = TimeUtil_1.TimeUtil.GetServerTime()),
									(n = n.EndOpenTime - r),
									(r =
										ModelManager_1.ModelManager.QuestNewModel.GetActivityGuideQuestRemainTimeText(
											n,
											o,
										)),
									i.SetText(r))
								: i.SetUIActive(!1)
							: t &&
								(EventSystem_1.EventSystem.Emit(
									EventDefine_1.EEventName.ActivityQuestCountdownEnd,
									e,
								),
								(this.Nwn = !1))
						: i.SetUIActive(!1))
				: t &&
					(EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.ActivityQuestCountdownEnd,
						e,
					),
					(this.Nwn = !1)));
	}
	SetSelected(e) {
		var t = e ? 1 : 0;
		this.GetExtendToggle(4).SetToggleState(t, !1), e && this.Pro(), this.Aro(t);
	}
	Aro(e) {
		var t = this.GetItem(7);
		1 === e
			? (this.QuestId !==
				ModelManager_1.ModelManager.QuestNewModel.GetCurTrackedQuest()?.Id
					? t.SetUIActive(!0)
					: t.SetUIActive(!1),
				(e = this.GetSprite(1)),
				t?.GetParentAsUIItem()?.SetUIActive(!e.bIsUIActive))
			: t.SetUIActive(!1);
	}
	SetNotAllowNoneSelect() {
		var e = this.GetExtendToggle(4);
		e.RootUIComp.SetRaycastTarget(1 !== e.ToggleState);
	}
	Pro() {
		EventSystem_1.EventSystem.Emit(
			EventDefine_1.EEventName.UpdateQuestDetails,
			this.QuestId,
			!0,
		);
	}
	GetTaskToggleItem() {
		return this.GetExtendToggle(4).RootUIComp;
	}
	OnBeforeDestroy() {}
}
exports.QuestItem = QuestItem;
