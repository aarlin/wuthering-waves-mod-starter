"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.VisionIdentifyItem = void 0);
const UE = require("ue"),
	CustomPromise_1 = require("../../../../../Core/Common/CustomPromise"),
	TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	UiManager_1 = require("../../../../Ui/UiManager"),
	LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
	GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
	NORMALCOLOR = "EBE5D7FF",
	GREENCOLOR = "63FF9CFF",
	WHITECOLOR = "FFFFFFFF",
	GRAYCOLOR = "ADADADFF";
class VisionIdentifyItem extends GridProxyAbstract_1.GridProxyAbstract {
	constructor() {
		super(...arguments),
			(this.L7i = ""),
			(this.Y6i = void 0),
			(this.bPe = void 0),
			(this.R7i = void 0),
			(this.Wpt = void 0),
			(this.nqe = () => {
				UiManager_1.UiManager.IsViewShow("VisionIntensifyView")
					? EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.OnClickVisionIntensifyItemJump,
						)
					: this.Wpt &&
						UiManager_1.UiManager.OpenView(
							"VisionIntensifyView",
							this.Wpt.GetIncrId(),
							() => {
								EventSystem_1.EventSystem.Emit(
									EventDefine_1.EEventName.OnClickVisionIntensifyItemJump,
								);
							},
						);
			});
	}
	Refresh(t, e, i) {
		t && this.Update(t, t.SourceView);
	}
	GetKey(t, e) {
		return this.GridIndex;
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIText],
			[2, UE.UIItem],
			[3, UE.UIItem],
			[4, UE.UIText],
			[5, UE.UIButtonComponent],
			[6, UE.UITextTransition],
			[7, UE.UISpriteTransition],
			[8, UE.UITextTransition],
		]),
			(this.BtnBindInfo = [[5, this.nqe]]);
	}
	OnStart() {
		this.bPe = new LevelSequencePlayer_1.LevelSequencePlayer(
			this.GetRootItem(),
		);
	}
	async PlaySequenceAndUpdate(t, e) {
		(this.R7i = new CustomPromise_1.CustomPromise()),
			0 < t
				? TimerSystem_1.TimerSystem.Delay(() => {
						this.bPe?.PlaySequencePurely("Update");
					}, t)
				: this.bPe?.PlaySequencePurely("Update"),
			TimerSystem_1.TimerSystem.Delay(() => {
				this.R7i?.SetResult();
			}, t + e),
			await this.R7i.Promise,
			(t = this.Y6i) &&
				(this.U7i(t),
				this.A7i(t),
				this.P7i(t),
				this.x7i(t),
				this.wxt(t),
				this.w7i(t));
	}
	Update(t, e) {
		var i = t.Data;
		(this.L7i = e),
			(this.Wpt = t.CurrentVisionData),
			(this.Y6i = i),
			t.IfPreCache ||
				(this.U7i(i),
				this.A7i(i),
				this.P7i(i),
				this.x7i(i),
				this.wxt(i),
				this.w7i(i));
	}
	x7i(t) {
		this.GetButton(5).RootUIComp.SetRaycastTarget(
			1 === t.SlotState && this.B7i(),
		),
			this.GetItem(2).SetUIActive(1 === t.SlotState && this.B7i());
	}
	Rh(t) {
		let e = "";
		return (
			0 === t.SlotState
				? (e = GRAYCOLOR)
				: 1 === t.SlotState
					? (e = this.B7i() ? "63FF9CFF" : "FFFFFFFF")
					: 3 === t.SlotState
						? (e = "EBE5D7FF")
						: 2 === t.SlotState
							? (e = "FFFFFFFF")
							: (5 !== t.SlotState && 4 !== t.SlotState) || (e = "63FF9CFF"),
			e
		);
	}
	U7i(t) {
		(t = UE.Color.FromHex(this.Rh(t))),
			this.GetText(0).SetColor(t),
			this.GetText(4).SetColor(t),
			this.GetItem(2).SetColor(t);
	}
	w7i(t) {
		var e;
		t = UE.Color.FromHex(this.Rh(t));
		((e =
			(((e =
				(((e =
					this.GetUiSpriteTransition(
						7,
					).TransitionInfo).HighlightedTransition.Color = t),
				(e.NormalTransition.Color = t),
				(e.DisabledTransition.Color = t),
				this.GetUITextTransition(6)
					.TransitionInfo)).HighlightedTransition.FontColor = t),
			(e.DisabledTransition.FontColor = t),
			(e.NormalTransition.FontColor = t),
			this.GetUITextTransition(8)
				.TransitionInfo)).HighlightedTransition.FontColor = t),
			(e.DisabledTransition.FontColor = t),
			(e.NormalTransition.FontColor = t);
	}
	A7i(t) {
		this.GetText(0).SetText(t.GetLevelUpViewName());
	}
	P7i(t) {
		var e = 3 === t.SlotState;
		this.GetText(1).SetUIActive(e),
			e && this.GetText(1).SetText(t.GetAttributeValueString());
	}
	B7i() {
		return (
			"VisionLevelUpView" === this.L7i || "VisionEquipmentView" === this.L7i
		);
	}
	wxt(t) {
		this.GetItem(3).SetUIActive(1 === t.SlotState && this.B7i());
	}
}
exports.VisionIdentifyItem = VisionIdentifyItem;
