"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CommonItemCountPanel = void 0);
const UE = require("ue"),
	UiPanelBase_1 = require("../../Ui/Base/UiPanelBase"),
	LevelSequencePlayer_1 = require("./LevelSequencePlayer"),
	MAX_DIGIT = 4,
	MAX_NUMBER = "9999",
	KEYCOUNT = 9;
class CommonItemCountPanel extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this._It = ""),
			(this.uIt = void 0),
			(this.cIt = void 0),
			(this.EPe = void 0),
			(this.lut = (t) => {
				"Close" === t && this.SetActive(!1);
			}),
			(this.mIt = () => {
				this.PlayCloseSequence();
			}),
			(this.dIt = () => {
				this.cIt?.(parseInt(this.t6)), this.PlayCloseSequence();
			}),
			(this.CIt = () => {
				this.t6 = this.t6.substr(0, this.t6.length - 1);
			});
	}
	get t6() {
		return this._It;
	}
	set t6(t) {
		(this._It = t),
			this.GetText(0).SetText(this._It),
			this.GetInteractionGroup(4).SetInteractable(0 < this._It.length);
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIButtonComponent],
			[2, UE.UIButtonComponent],
			[3, UE.UIButtonComponent],
			[4, UE.UIInteractionGroup],
			[5, UE.UIButtonComponent],
			[6, UE.UIButtonComponent],
			[7, UE.UIButtonComponent],
			[8, UE.UIButtonComponent],
			[9, UE.UIButtonComponent],
			[10, UE.UIButtonComponent],
			[11, UE.UIButtonComponent],
			[12, UE.UIButtonComponent],
			[13, UE.UIButtonComponent],
			[14, UE.UIButtonComponent],
			[15, UE.UIText],
		]),
			(this.BtnBindInfo = [
				[1, this.mIt],
				[3, this.dIt],
				[2, this.CIt],
			]);
	}
	OnStart() {
		this.uIt = [];
		for (let e = 0; e <= 9; e++) {
			var t = this.GetButton(5 + e);
			this.uIt.push(t);
		}
		for (let t = 0; t <= 9; t++)
			this.uIt[t].OnClickCallBack.Bind(() => {
				this.t6.length < 4 ? (this.t6 += t) : (this.t6 = "9999");
			});
		(this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
			this.EPe.BindSequenceCloseEvent(this.lut);
	}
	OnBeforeDestroy() {
		this.EPe.Clear(), (this.EPe = void 0);
		for (const t of this.uIt) t.OnClickCallBack.Unbind();
	}
	UpdateView(t) {
		(this.t6 = t.toString()),
			this.RootItem.SetUIActive(!0),
			this.RootItem.SetAsLastHierarchy();
	}
	SetTitleText(t) {
		this.GetText(15).SetText(t);
	}
	PlayStartSequence(t) {
		this.SetActive(!0),
			this.EPe.PlayLevelSequenceByName("Start"),
			this.UpdateView(t);
	}
	PlayCloseSequence() {
		this.EPe.PlayLevelSequenceByName("Close");
	}
	SetConfirmFunction(t) {
		this.cIt = t;
	}
}
exports.CommonItemCountPanel = CommonItemCountPanel;
