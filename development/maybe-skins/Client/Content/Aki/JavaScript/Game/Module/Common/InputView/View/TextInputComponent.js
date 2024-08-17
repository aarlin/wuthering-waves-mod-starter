"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TextInputComponent = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../../Core/Common/Log"),
	CommonDefine_1 = require("../../../../../Core/Define/CommonDefine"),
	Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
	TickSystem_1 = require("../../../../../Core/Tick/TickSystem"),
	StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
	UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
	LguiUtil_1 = require("../../../Util/LguiUtil"),
	CommonInputViewDefine_1 = require("../Model/CommonInputViewDefine");
class TextInputComponent extends UiPanelBase_1.UiPanelBase {
	constructor(t, e) {
		super(),
			(this.XUt = e),
			(this.DUt = 0),
			(this.j3 = CommonDefine_1.INVALID_VALUE),
			(this.Xje = 0),
			(this.RUt = void 0),
			(this.vUt = void 0),
			(this.$Ut = void 0),
			(this.zvt = CommonInputViewDefine_1.MAX_SINGLE_LENGTH),
			(this.Zvt = 0),
			(this.AUt = (t) => {
				t && 1 === this.DUt && this.ZFe(0);
			}),
			(this.xUt = () => {
				var t = this.vUt.GetText(),
					e = StringUtils_1.StringUtils.GetStringRealCount(t);
				e > this.zvt
					? (this.ZFe(2), (this.j3 = 0))
					: 0 === e && this.XUt.IsCheckNone
						? (this.ZFe(1), (this.j3 = 0))
						: e < this.Zvt
							? (this.ZFe(3), (this.j3 = 0))
							: this.XUt.ConfirmFunc?.(t).then(
									(t) => {
										this.IsDestroyOrDestroying ||
											(t ===
												Protocol_1.Aki.Protocol.lkn.Proto_ContainsDirtyWord &&
												this.ZFe(4),
											this.XUt.ResultFunc?.(
												t === Protocol_1.Aki.Protocol.lkn.Sys,
											));
									},
									() => {
										Log_1.Log.CheckError() &&
											Log_1.Log.Error(
												"UiCommon",
												11,
												"通用输入框执行出现未知错误",
											);
									},
								);
			}),
			(this.YUt = (t) => {
				StringUtils_1.StringUtils.GetStringRealCount(t) <= this.zvt
					? this.ZFe(0)
					: this.ZFe(2);
			}),
			(this.wUt = () => {
				this.GetItem(0).SetUIActive(!1),
					this.$Ut.SetSelfInteractive(!0),
					(this.j3 = CommonDefine_1.INVALID_VALUE);
			}),
			(this.BUt = () => {
				this.bUt("PrefabTextItem_Entertext_Text", 0);
			}),
			(this.qUt = () => {
				this.bUt(
					"PrefabTextItem_Textoverlength_Text",
					CommonDefine_1.INVALID_VALUE,
				),
					this.$Ut.SetSelfInteractive(!1);
			}),
			(this.GUt = () => {
				this.bUt("CDKey_TooShort", 0), this.$Ut.SetSelfInteractive(!1);
			}),
			(this.NUt = () => {
				this.bUt("PrefabTextItem_Textillegality_Text", 0);
			}),
			(this.r6 = (t) => {
				this.j3 !== CommonDefine_1.INVALID_VALUE &&
					((this.j3 += t),
					this.j3 >= CommonInputViewDefine_1.TIPS_DELAT_TIME) &&
					this.ZFe(0);
			}),
			this.CreateThenShowByActor(t.GetOwner());
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIText],
			[2, UE.UITextInputComponent],
			[3, UE.UIText],
			[4, UE.UIButtonComponent],
		]),
			(this.BtnBindInfo = [
				[2, this.AUt],
				[4, this.xUt],
			]);
	}
	ZFe(t) {
		t !== this.DUt && ((this.DUt = t), this.RUt[t]());
	}
	OnStart() {
		(this.RUt = {
			0: this.wUt,
			1: this.BUt,
			2: this.qUt,
			3: this.GUt,
			4: this.NUt,
			5: () => {},
			6: () => {},
		}),
			(this.$Ut = this.GetButton(4)),
			(this.vUt = this.GetInputText(2)),
			this.vUt.OnTextChange.Bind(this.YUt),
			this.vUt.SetText(this.XUt.InputText, !0),
			this.XUt.DefaultText && this.GetText(3).SetText(this.XUt.DefaultText),
			(this.Xje = TickSystem_1.TickSystem.Add(
				this.r6,
				"TextInputComponent",
				0,
				!0,
			).Id);
	}
	QUt() {
		this.vUt.OnTextChange.Unbind();
	}
	bUt(t, e) {
		this.GetItem(0).SetUIActive(!0);
		var i = this.GetText(1);
		LguiUtil_1.LguiUtil.SetLocalTextNew(i, t), (this.j3 = e);
	}
	OnBeforeDestroy() {
		this.QUt(), TickSystem_1.TickSystem.Remove(this.Xje);
	}
	ClearText() {
		this.vUt.SetText("");
	}
}
exports.TextInputComponent = TextInputComponent;
