"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LordChallengeResultView = void 0);
const UE = require("ue"),
	CommonDefine_1 = require("../../../../Core/Define/CommonDefine"),
	MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
	TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
	TimeUtil_1 = require("../../../Common/TimeUtil"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	SUCCESS_OUTLINE_COLOR = "C48B29FF",
	SUCCESS_TEX =
		"/Game/Aki/UI/UIResources/Common/Image/IconForceLogo/T_Logo_10_UI.T_Logo_10_UI",
	FAIL_OUTLINE_COLOR = "B33100FF",
	FAIL_TEX =
		"/Game/Aki/UI/UIResources/Common/Image/IconForceLogo/T_Logo_10_UI.T_Logo_10_UI",
	CLOSE_BUTTON_KEY = -1;
class LordChallengeResultView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.w2e = void 0),
			(this.B2e = void 0),
			(this.ButtonMap = void 0),
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
		const e = [];
		var t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
				"ConfirmBox_41_ButtonText_0",
			),
			i =
				((t = this.k2e(this.GetItem(5), -1, t, this.q2e)),
				(t =
					(e.push(t),
					this.B2e.ButtonList.forEach((t, i) => {
						(i = this.k2e(this.GetItem(5), i, t.Title, t.ClickFunc)), e.push(i);
					}),
					await Promise.all(e),
					this.ButtonMap.get(-1))),
				MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
					"Text_InstanceDungeonLeftTimeToAutoLeave_Text",
					this.B2e.AutoCloseTime.toString(),
				));
		t.SetFloatText(i);
	}
	async k2e(e, t, i, s) {
		var o = this.GetItem(5),
			n = this.GetItem(4);
		(o = LguiUtil_1.LguiUtil.DuplicateActor(o.GetOwner(), n)),
			(n = new Button());
		this.ButtonMap.set(t, n),
			await n.InitializeAsync(o, s),
			n.SetActive(!0),
			n.SetBtnText(i);
	}
	OnStart() {
		this.B2e = this.OpenParam;
	}
	OnBeforeShow() {
		this.O2e(), this.Q2e(), this.$2e(), this.N2e();
	}
	F2e() {
		TimerSystem_1.TimerSystem.Has(this.w2e) &&
			TimerSystem_1.TimerSystem.Remove(this.w2e),
			(this.w2e = void 0);
	}
	N2e() {
		let e = this.B2e.AutoCloseTime + 1;
		this.w2e = TimerSystem_1.TimerSystem.Forever(() => {
			var t;
			e <= 0
				? (TimerSystem_1.TimerSystem.Remove(this.w2e), this.q2e())
				: ((t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
						"Text_InstanceDungeonLeftTimeToAutoLeave_Text",
						(e--).toString(),
					)),
					this.ButtonMap.get(-1).SetFloatText(t));
		}, CommonDefine_1.MILLIONSECOND_PER_SECOND);
	}
	$2e() {
		var e = void 0 !== this.B2e.PassTime;
		this.GetText(13)?.SetUIActive(e),
			e &&
				((e = TimeUtil_1.TimeUtil.GetTimeString(this.B2e.PassTime)),
				this.GetText(10).SetText(e));
	}
	Q2e() {
		var e = void 0 !== this.B2e?.Score;
		this.GetItem(12)?.SetUIActive(e),
			e &&
				(this.GetText(8).SetText(this.B2e.Score.toString()),
				this.GetItem(9).SetUIActive(this.B2e?.IsNewRecord ?? !1));
	}
	OnBeforeDestroy() {
		this.F2e();
	}
	O2e() {
		var e = 0 === this.B2e?.Result,
			t =
				(this.GetItem(12).SetUIActive(e),
				this.GetItem(13).SetUIActive(e),
				this.GetText(14).SetUIActive(!e),
				this.GetTexture(2)),
			i = e ? SUCCESS_TEX : FAIL_TEX,
			s = e ? "C48B29FF" : "B33100FF";
		e = e
			? "GenericPromptTypes_3_GeneralText"
			: "GenericPromptTypes_4_GeneralText";
		(i =
			(t.SetColor(UE.Color.FromHex(s)),
			this.SetTextureByPath(i, t),
			this.GetText(1))).SetColor(UE.Color.FromHex(s)),
			i.ShowTextNew(e);
	}
}
exports.LordChallengeResultView = LordChallengeResultView;
class Button extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.c2e = void 0),
			(this.m2e = () => {
				this.c2e?.();
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIItem],
			[2, UE.UIText],
			[3, UE.UIButtonComponent],
		]),
			(this.BtnBindInfo = [[3, this.m2e]]);
	}
	OnBeforeShow() {
		this.GetText(0).SetText(""), this.GetText(2).SetText("");
	}
	async InitializeAsync(e, t) {
		(this.c2e = t), await this.CreateByActorAsync(e);
	}
	SetFloatText(e) {
		this.GetText(2).SetUIActive(!0), this.GetText(2).SetText(e);
	}
	SetBtnText(e) {
		this.GetText(0).SetText(e);
	}
}
