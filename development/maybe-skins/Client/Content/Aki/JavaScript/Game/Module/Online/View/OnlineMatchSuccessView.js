"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.OnlineMatchSuccessView = void 0);
const UE = require("ue"),
	CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
	MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	TimeUtil_1 = require("../../../Common/TimeUtil"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
	InstanceDungeonEntranceController_1 = require("../../InstanceDungeon/InstanceDungeonEntranceController"),
	ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
	LguiUtil_1 = require("../../Util/LguiUtil");
class OnlineMatchSuccessView extends UiTickViewBase_1.UiTickViewBase {
	constructor() {
		super(...arguments),
			(this.EGi = -1),
			(this.yGi = -1),
			(this.Q2t = void 0),
			(this.pGi = void 0),
			(this.eNi = !0),
			(this.G$e = () => {
				var e =
					ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetMatchingState();
				3 === e
					? this.tNi()
					: (1 === e &&
							ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
								"MatchingOtherCancel",
							),
						this.CloseMe());
			}),
			(this.MGi = () => {
				InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.MatchConfirmRequest(
					!0,
				),
					(this.eNi = !1),
					this.tNi();
			}),
			(this.J9e = () => {
				InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.MatchConfirmRequest(
					!1,
				),
					ModelManager_1.ModelManager.InstanceDungeonModel.ResetData(),
					this.CloseMe();
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UITexture],
			[1, UE.UIText],
			[2, UE.UIButtonComponent],
			[3, UE.UIItem],
			[4, UE.UIItem],
			[5, UE.UIText],
			[6, UE.UISprite],
			[7, UE.UIText],
			[8, UE.UIButtonComponent],
			[9, UE.UIItem],
			[10, UE.UIItem],
		]),
			(this.BtnBindInfo = [
				[2, this.MGi],
				[8, this.J9e],
			]);
	}
	OnStart() {
		this.GetButton(8).GetRootComponent().SetUIActive(!0),
			(this.Q2t = this.GetText(5)),
			(this.pGi = this.GetSprite(6));
		var e = CommonParamById_1.configCommonParamById.GetIntConfig(
			"match_confirm_time_out_seconds",
		);
		(this.EGi = e),
			(this.yGi = e),
			this.GetItem(9).SetUIActive(!0),
			this.GetItem(10).SetUIActive(!1),
			this.Og();
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnMatchingChange,
			this.G$e,
		);
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnMatchingChange,
			this.G$e,
		);
	}
	OnTick(e) {
		this.eNi &&
			((this.EGi -= e * TimeUtil_1.TimeUtil.Millisecond),
			this.EGi <= 0
				? this.CloseMe()
				: (this.Q2t.SetText(TimeUtil_1.TimeUtil.GetCoolDown(this.EGi)),
					this.pGi.SetFillAmount(this.EGi / this.yGi)));
	}
	Og() {
		var e = this.GetItem(3),
			t = this.GetItem(4);
		e.SetUIActive(!0),
			t.SetUIActive(!1),
			(e = this.GetText(1)),
			LguiUtil_1.LguiUtil.SetLocalText(e, "MatchingSuccess"),
			(t = this.GetText(7)),
			(e =
				ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetMatchingId()),
			(e =
				MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
					ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e)
						.MapName,
				) ?? "");
		t.SetText(e),
			this.Q2t.SetText(TimeUtil_1.TimeUtil.GetCoolDown(this.EGi)),
			this.pGi.SetFillAmount(this.EGi / this.yGi);
	}
	tNi() {
		this.GetButton(8).GetRootComponent().SetUIActive(!1),
			this.GetButton(2).GetRootComponent().SetUIActive(!1);
		var e = this.GetText(1);
		LguiUtil_1.LguiUtil.SetLocalText(e, "MatchingTeleport"),
			this.GetText(7).SetUIActive(!1),
			this.Q2t.SetUIActive(!1),
			this.pGi.SetUIActive(!1);
	}
}
exports.OnlineMatchSuccessView = OnlineMatchSuccessView;
