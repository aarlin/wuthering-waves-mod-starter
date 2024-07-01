"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ActivityRunCycleItem = void 0);
const UE = require("ue"),
	StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	RedDotController_1 = require("../../../../RedDot/RedDotController"),
	UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
	ROME_ICON_PATH =
		"/Game/Aki/UI/UIResources/Common/Atlas/SP_ComRomeText_0{0}.SP_ComRomeText_0{1}";
class ActivityRunCycleItem extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.ScrollViewDelegate = void 0),
			(this.GridIndex = 0),
			(this.DisplayIndex = 0),
			(this.p2e = 0),
			(this.v2e = void 0),
			(this.M2e = !1),
			(this.jbe = (e) => {
				1 === e &&
					this.ScrollViewDelegate.SelectGridProxy(
						this.GridIndex,
						this.DisplayIndex,
						!0,
					),
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.OnClickActivityRunChallenge,
						this,
					);
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIExtendToggle],
			[1, UE.UIText],
			[2, UE.UISprite],
			[3, UE.UISprite],
			[4, UE.UIItem],
			[5, UE.UIItem],
			[6, UE.UIItem],
			[7, UE.UISprite],
			[8, UE.UISprite],
			[9, UE.UIItem],
			[10, UE.UIItem],
			[11, UE.UITexture],
		]),
			(this.BtnBindInfo = [[0, this.jbe]]);
	}
	TryBindRedDot() {
		this.M2e ||
			((this.M2e = !0),
			RedDotController_1.RedDotController.BindRedDot(
				"ActivityRun",
				this.GetItem(10),
				void 0,
				this.p2e,
			),
			RedDotController_1.RedDotController.BindRedDot(
				"ActivityRun",
				this.GetItem(6),
				void 0,
				this.p2e,
			));
	}
	OnStart() {
		this.GetExtendToggle(0).SetToggleState(0, !1);
	}
	OnBeforeDestroy() {
		RedDotController_1.RedDotController.UnBindGivenUi(
			"ActivityRun",
			this.GetItem(10),
			this.p2e,
		),
			RedDotController_1.RedDotController.UnBindGivenUi(
				"ActivityRun",
				this.GetItem(6),
				this.p2e,
			),
			this.GetSprite(7).SetSprite(void 0);
	}
	Og() {
		(this.v2e = ModelManager_1.ModelManager.ActivityRunModel.GetActivityRunData(
			this.p2e,
		)),
			this.SetTextureByPath(
				this.v2e.GetBackgroundTexturePath(),
				this.GetTexture(11),
			),
			this.mGe(),
			this.S2e(),
			this.E2e();
	}
	mGe() {
		this.GetText(1).SetText(this.v2e.GetTitle());
	}
	S2e() {
		this.GetSprite(3).SetUIActive(this.v2e.GetIfRewardAllFinished()),
			this.GetSprite(8).SetUIActive(this.v2e.GetIfRewardAllFinished()),
			this.GetSprite(2).SetUIActive(!1);
		var e = (this.GridIndex + 1).toString();
		this.SetSpriteByPath(
			StringUtils_1.StringUtils.Format(ROME_ICON_PATH, e, e),
			this.GetSprite(7),
			!1,
		);
	}
	E2e() {
		this.GetItem(9).SetUIActive(!this.v2e.GetIsShow()),
			this.GetItem(5).SetUIActive(!this.v2e.GetIsShow()),
			this.GetItem(4).SetUIActive(!this.v2e.GetIsShow());
	}
	Refresh(e, t, i) {
		(this.p2e = e), this.TryBindRedDot(), this.Og();
	}
	Clear() {}
	OnSelected(e) {
		this.GetExtendToggle(0).SetToggleState(1, e),
			(ModelManager_1.ModelManager.ActivityRunModel.CurrentSelectChallengeId =
				this.p2e),
			(e = ModelManager_1.ModelManager.ActivityModel.GetActivityById(
				this.v2e.GetActivityId(),
			)) &&
				(e.SetActivityContentIndex(this.GridIndex),
				this.v2e.GetIsShow() &&
					this.v2e.GetChallengeNewLocalRedPoint() &&
					this.v2e.SetChallengeLocalRedPointState(!1),
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.OnSelectActivityRunChallengeItem,
				));
	}
	OnDeselected(e) {
		this.GetExtendToggle(0).SetToggleState(0, e);
	}
	GetKey(e, t) {
		return this.GridIndex;
	}
}
exports.ActivityRunCycleItem = ActivityRunCycleItem;
