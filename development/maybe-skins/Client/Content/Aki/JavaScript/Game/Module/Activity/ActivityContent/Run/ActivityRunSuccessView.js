"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ActivityRunSuccessView = void 0);
const UE = require("ue"),
	CommonDefine_1 = require("../../../../../Core/Define/CommonDefine"),
	TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
	TimeUtil_1 = require("../../../../Common/TimeUtil"),
	UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
	LguiUtil_1 = require("../../../Util/LguiUtil"),
	ActivityParkourButton_1 = require("./ActivityParkourButton"),
	ActivityRunController_1 = require("./ActivityRunController"),
	LEAVETIME = 30,
	SUCCESS_OUTLINE_COLOR = "CC9548FF",
	TARGET_ICON_PATH =
		"/Game/Aki/UI/UIResources/Common/Image/IconForceLogo/T_Logo_10_UI.T_Logo_10_UI";
class ActivityRunSuccessView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.w2e = void 0),
			(this.B2e = void 0),
			(this.ButtonMap = void 0),
			(this.b2e = () => {
				ActivityRunController_1.ActivityRunController.RequestTransToParkourChallenge(
					this.B2e.CurrentChallengeId,
				);
			}),
			(this.q2e = () => {
				this.CloseMe();
			});
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[1, UE.UIText],
			[2, UE.UITexture],
			[4, UE.UIItem],
			[5, UE.UIItem],
			[8, UE.UIText],
			[9, UE.UIItem],
			[10, UE.UIText],
			[11, UE.UIText],
			[12, UE.UIItem],
			[13, UE.UIItem],
			[14, UE.UIText],
		];
	}
	async OnBeforeStartAsync() {
		(this.ButtonMap = new Map()), await this.G2e();
	}
	async G2e() {
		this.GetItem(5)?.SetUIActive(!1);
		var e = this.k2e(this.GetItem(5), 0, this.q2e),
			t = this.k2e(this.GetItem(5), 1, this.b2e);
		await Promise.all([e, t]),
			(e = this.ButtonMap.get(0)),
			(t = this.ButtonMap.get(1));
		e.SetBtnText("Leave"),
			e.SetFloatText("InstanceDungeonLeftTimeToAutoLeave", (30).toString()),
			t.SetBtnText("ChallengeAgain");
	}
	async k2e(e, t, i) {
		var s = this.GetItem(5),
			r = this.GetItem(4);
		(s = LguiUtil_1.LguiUtil.DuplicateActor(s.GetOwner(), r)),
			(r = new ActivityParkourButton_1.ActivityParkourButton());
		this.ButtonMap.set(t, r), await r.InitializeAsync(s, i), r.SetActive(!0);
	}
	OnStart() {
		this.B2e = this.OpenParam;
	}
	OnBeforeShow() {
		this.O2e(), this.Q2e(), this.X2e(), this.$2e(), this.N2e();
	}
	F2e() {
		TimerSystem_1.TimerSystem.Has(this.w2e) &&
			TimerSystem_1.TimerSystem.Remove(this.w2e),
			(this.w2e = void 0);
	}
	N2e() {
		let e = 31;
		this.w2e = TimerSystem_1.TimerSystem.Forever(() => {
			e <= 0
				? (TimerSystem_1.TimerSystem.Remove(this.w2e), this.q2e())
				: this.ButtonMap.get(0).SetFloatText(
						"InstanceDungeonLeftTimeToAutoLeave",
						(e--).toString(),
					);
		}, CommonDefine_1.MILLIONSECOND_PER_SECOND);
	}
	$2e() {
		var e = TimeUtil_1.TimeUtil.GetTimeString(this.B2e.CurrentTime);
		this.GetText(10).SetText(e);
	}
	OnBeforeDestroy() {
		this.F2e();
	}
	X2e() {
		this.GetItem(9).SetUIActive(this.B2e.IfNewRecord);
	}
	O2e() {
		var e;
		this.GetItem(12).SetUIActive(!0),
			this.GetItem(13).SetUIActive(!0),
			this.GetText(14).SetUIActive(!1),
			(e =
				((e = this.GetTexture(2)).SetColor(UE.Color.FromHex("CC9548FF")),
				this.SetTextureByPath(TARGET_ICON_PATH, e),
				this.GetText(1))).SetColor(UE.Color.FromHex("FFFFFFFF")),
			e.ShowTextNew("GenericPromptTypes_3_GeneralText");
	}
	Q2e() {
		this.GetText(8).SetText(this.B2e.CurrentScore.toString());
	}
}
exports.ActivityRunSuccessView = ActivityRunSuccessView;
