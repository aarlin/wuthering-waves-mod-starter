"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CommonSearchComponent = void 0);
const UE = require("ue"),
	StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class CommonSearchComponent extends UiPanelBase_1.UiPanelBase {
	constructor(t, e, i) {
		super(),
			(this.SearchFunction = e),
			(this.ClearFunction = i),
			(this.vUt = void 0),
			(this.MUt = void 0),
			(this.SUt = void 0),
			(this.EUt = (t) => {
				t && this.vUt.ActivateInputText();
			}),
			(this.yUt = () => {
				var t = this.vUt.GetText();
				this.SearchFunction?.(t), this.IUt(!1), (this.TUt = !0);
			}),
			(this.LUt = () => {
				this.ResetSearch(!0);
			}),
			(this.ZGe = (t) => {
				StringUtils_1.StringUtils.IsEmpty(t)
					? (this.IUt(!0),
						this.MUt.SetSelfInteractive(!1),
						this.ClearFunction?.())
					: (this.TUt && this.IUt(!0), this.MUt.SetSelfInteractive(!0));
			}),
			(this.TUt = !1),
			this.CreateThenShowByActor(t.GetOwner());
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UITextInputComponent],
			[1, UE.UIButtonComponent],
			[2, UE.UIButtonComponent],
		]),
			(this.BtnBindInfo = [
				[0, this.EUt],
				[1, this.yUt],
				[2, this.LUt],
			]);
	}
	OnStart() {
		(this.MUt = this.GetButton(1)),
			(this.SUt = this.GetButton(2)),
			(this.vUt = this.GetInputText(0)),
			this.vUt.OnTextChange.Bind(this.ZGe),
			this.vUt.OnTextSubmit.Bind(this.yUt),
			this.ResetSearch(!1),
			this.IUt(!0),
			this.MUt.SetSelfInteractive(!1);
	}
	OnBeforeDestroy() {
		(this.vUt = void 0), (this.MUt = void 0), (this.SUt = void 0);
	}
	IUt(t) {
		this.MUt.RootUIComp.SetUIActive(t),
			this.SUt.RootUIComp.SetUIActive(!t),
			(this.TUt = !t);
	}
	ResetSearch(t) {
		this.vUt.SetText("", t);
	}
}
exports.CommonSearchComponent = CommonSearchComponent;
