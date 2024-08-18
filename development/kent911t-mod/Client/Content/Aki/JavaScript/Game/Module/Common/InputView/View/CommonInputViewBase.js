"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.CommonInputViewBase = void 0;
const puerts_1 = require("puerts"),
    UE = require("ue"),
    Log_1 = require("../../../../../Core/Common/Log"),
    CommonDefine_1 = require("../../../../../Core/Define/CommonDefine"),
    MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
    Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
    StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
    EventDefine_1 = require("../../../../Common/Event/EventDefine"),
    EventSystem_1 = require("../../../../Common/Event/EventSystem"),
    ConfigManager_1 = require("../../../../Manager/ConfigManager"),
    UiTickViewBase_1 = require("../../../../Ui/Base/UiTickViewBase"),
    CdKeyInputController_1 = require("../../../CdKey/CdKeyInputController"),
    ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController"),
    LguiUtil_1 = require("../../../Util/LguiUtil"),
    ButtonAndSpriteItem_1 = require("../../Button/ButtonAndSpriteItem"),
    CommonInputViewDefine_1 = require("../Model/CommonInputViewDefine");
class CommonInputViewBase extends UiTickViewBase_1.UiTickViewBase {
    constructor() {
        super(...arguments), this.InputData = void 0, this.PAt = void 0, this.j3 = CommonDefine_1.INVALID_VALUE, this.xAt = void 0, this.ConfirmButton = void 0, this.InputText = void 0, this.wAt = void 0, this.BAt = t => {
            t && 1 === this.PAt && this.RefreshTips(0)
        }, this.bAt = () => {
            this.CloseMe()
        }, this.qAt = () => {
            var t = this.InputText.GetText();
            this.ExecuteInputConfirm(t)
        }, this.GAt = () => {
            this.SetTipsVisible(!1), this.ConfirmButton.SetSelfInteractive(!0), this.j3 = CommonDefine_1.INVALID_VALUE
        }, this.NAt = () => {
            this.OAt("PrefabTextItem_Entertext_Text", 0)
        }, this.kAt = () => {}, this.FAt = () => {
            this.OAt("CDKey_TooShort", 0), this.ConfirmButton.SetSelfInteractive(!1)
        }, this.VAt = () => {
            this.OAt("PrefabTextItem_Textillegality_Text", 0)
        }, this.CdKeyErrorText = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("CDKey_Error"), this.HAt = () => {
            this.jAt(this.CdKeyErrorText, 0), this.ConfirmButton.SetSelfInteractive(!1)
        }, this.WAt = () => {
            var t = CdKeyInputController_1.CdKeyInputController.GetCdKeyUseCd().toString();
            this.OAt("CDKey_CDtime", 0, t), this.ConfirmButton.SetSelfInteractive(!1)
        }, this.KAt = () => {
            this.InputText.SetText("", !0)
        }, this.QAt = () => {
            var t = (0, puerts_1.$ref)("");
            UE.LGUIBPLibrary.ClipBoardPaste(t), t = (0, puerts_1.$unref)(t), StringUtils_1.StringUtils.IsEmpty(t) || this.InputText.SetText(t, !0)
        }, this.XAt = () => {
            var t = ConfigManager_1.ConfigManager.TextConfig.GetTextById("SetNameSuccess");
            ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(t)
        }, this.$At = () => {
            var t = ConfigManager_1.ConfigManager.TextConfig.GetTextById("SetSignSuccess");
            ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(t)
        }, this.OnTextChange = t => {
            this.SetClearOrPaste(), StringUtils_1.StringUtils.GetStringRealCount(t) <= this.GetMaxLimit()?this.RefreshTips(0) : this.RefreshTips(2), this.RefreshDuplicateName(t)
        }
    }
    OnRegisterComponent() {
        this.ComponentRegisterInfos = [
            [0, UE.UIText],
            [1, UE.UIItem],
            [2, UE.UIText],
            [3, UE.UIButtonComponent],
            [4, UE.UIButtonComponent],
            [5, UE.UITextInputComponent],
            [6, UE.UIText],
            [7, UE.UIItem],
            [8, UE.UIText]
        ], this.BtnBindInfo = [
            [5, this.BAt],
            [3, this.bAt],
            [4, this.qAt]
        ]
    }
    ExtraConfirmCheck(t, e) {
        return !0
    }
    ExecuteInputConfirm(t) {
        this.InputData?.CustomFunc?this.InputData.CustomFunc?.(t).then((() => this.CloseMe())) : this.InputData.ConfirmFunc?.(t).then((t => {
            t === Protocol_1.Aki.Protocol.O4n.Proto_ContainsDirtyWord?this.RefreshTips(4) : this.CloseMe()
        }), (() => {
            Log_1.Log.CheckError() && Log_1.Log.Error("UiCommon", 11, "通用输入框执行出现未知错误")
        }))
    }
    OnBeforeCreate() {
        this.InputData = this.OpenParam, this.xAt = {
            0: this.GAt,
            1: this.NAt,
            2: this.kAt,
            3: this.FAt,
            4: this.VAt,
            5: this.HAt,
            6: this.WAt
        }
    }
    OAt(t, e, ...i) {
        this.SetTipsVisible(!0);
        var n = this.GetText(2);
        LguiUtil_1.LguiUtil.SetLocalTextNew(n, t, i), this.j3 = e
    }
    jAt(t, e) {
        this.SetTipsVisible(!0), this.GetText(2).SetText(t), this.j3 = e
    }
    SetBottomTipsTextAndColor(t, e) {
        var i = this.GetText(8);
        LguiUtil_1.LguiUtil.SetLocalTextNew(i, t), i.SetColor(e)
    }
    SetBottomTipsShowState(t) {
        this.GetText(8).SetUIActive(t)
    }
    OnBeforeShow() {
        this.YAt(), this.mGe(), this.RefreshTips(0), this.InitExtraParam()
    }
    SetClearOrPaste() {
        "" === this.InputText.GetText()?(this.wAt.RefreshSprite("SP_Paste"), this.wAt.BindCallback(this.QAt)) : (this.wAt.RefreshSprite("SP_Clear"), this.wAt.BindCallback(this.KAt))
    }
    OnAddEventListener() {
        EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnNameChange, this.XAt), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSignChange, this.$At)
    }
    OnRemoveEventListener() {
        EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnNameChange, this.XAt), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSignChange, this.$At)
    }
    OnTick(t) {
        this.j3 !== CommonDefine_1.INVALID_VALUE && (this.j3 += t, this.j3 >= CommonInputViewDefine_1.TIPS_DELAT_TIME) && this.RefreshTips(0)
    }
    OnBeforeDestroy() {
        this.JAt(), this.wAt = void 0, this.InputText = void 0, this.ConfirmButton = void 0
    }
    YAt() {
        this.wAt = new ButtonAndSpriteItem_1.ButtonAndSpriteItem(this.GetItem(7)), this.GetItem(7).SetUIActive(this.InputData.NeedFunctionButton), this.ConfirmButton = this.GetButton(4), this.InputText = this.GetInputText(5), this.InputText.bAllowMultiLine = this.IsAllowMultiLine(), this.InputText.OnTextChange.Bind(this.OnTextChange), this.InputText.SetText(this.InputData.InputText, !0), this.GetText(6).SetText(this.InputData.DefaultText), this.SetClearOrPaste(), this.SetTipsVisible(!1), this.SetBottomTipsShowState(!1)
    }
    SetTipsVisible(t) {
        this.GetItem(1).SetUIActive(t)
    }
    InitExtraParam() {}
    JAt() {
        this.InputText.OnTextChange.Unbind()
    }
    mGe() {
        this.InputData?.Title?this.GetText(0).SetText(this.InputData.Title) : LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), this.InputData.TitleTextArgs.TextKey, ...this.InputData.TitleTextArgs.Params)
    }
    RefreshTips(t) {
        t !== this.PAt && (this.PAt = t, this.xAt[t]())
    }
    RefreshDuplicateName(t) {}
    GetMinLimit() {
        return 0
    }
}
exports.CommonInputViewBase = CommonInputViewBase;