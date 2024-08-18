"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.FunctionView = void 0;
const UE = require("ue"),
    Log_1 = require("../../../../Core/Common/Log"),
    BackgroundCardById_1 = require("../../../../Core/Define/ConfigQuery/BackgroundCardById"),
    PlayerExpByPlayerLevel_1 = require("../../../../Core/Define/ConfigQuery/PlayerExpByPlayerLevel"),
    Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
    EventDefine_1 = require("../../../Common/Event/EventDefine"),
    EventSystem_1 = require("../../../Common/Event/EventSystem"),
    ConfigManager_1 = require("../../../Manager/ConfigManager"),
    ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
    ModelManager_1 = require("../../../Manager/ModelManager"),
    RedDotController_1 = require("../../../RedDot/RedDotController"),
    UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
    UiManager_1 = require("../../../Ui/UiManager"),
    NoCircleAttachView_1 = require("../../AutoAttach/NoCircleAttachView"),
    CommonInputViewController_1 = require("../../Common/InputView/Controller/CommonInputViewController"),
    ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine"),
    LguiUtil_1 = require("../../Util/LguiUtil"),
    WorldLevelController_1 = require("../../WorldLevel/WorldLevelController"),
    ModManager_1 = require("../../../Manager/ModManager"),
    FunctionController_1 = require("../FunctionController"),
    FunctionAttachItemGrid_1 = require("./FunctionAttachItemGrid"),
    FunctionBottomButtonItem_1 = require("./FunctionBottomButtonItem"),
    FunctionTabLayout_1 = require("./FunctionTabLayout");
class FunctionView extends UiViewBase_1.UiViewBase {
    constructor() {
        super(...arguments), this.ovt = void 0, this.B7t = void 0, this.G7t = void 0, this.N7t = void 0, this.O7t = void 0, this.k7t = void 0, this.F7t = void 0, this.V7t = void 0, this.H7t = new Map, this.ypt = new Array, this.j7t = void 0, this.W7t = () => {
            this.CloseMe()
        }, this.K7t = () => {
            ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowReturnLoginConfirmBox()
        }, this.Q7t = () => {
            ControllerHolder_1.ControllerHolder.KuroSdkController.OpenNotice()
        }, this.X7t = () => {
            FunctionController_1.FunctionController.OpenFunctionRelateView(10020)
        }, this.$7t = () => {
            WorldLevelController_1.WorldLevelController.OpenWorldLevelInfoView()
        }, this.Y7t = () => {
            UiManager_1.UiManager.OpenView("TimeOfDaySecondView")
        }, this.J7t = () => {
            FunctionController_1.FunctionController.OpenFunctionRelateView(10019)
        }, this.z7t = () => {
            // here
            ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("CopiedMyUid"), UE.LGUIBPLibrary.ClipBoardCopy(ModManager_1.ModManager.Settings.Uid);
        }, this.Z7t = () => {
            FunctionController_1.FunctionController.OpenFunctionRelateView(10049)
        }, this.eHt = () => {
            ModelManager_1.ModelManager.FunctionModel.IsOpen(10060) && UiManager_1.UiManager.OpenView("PersonalRootView", ModelManager_1.ModelManager.PersonalModel.GetPersonalInfoData()), ModelManager_1.ModelManager.PersonalModel.TryHidePersonalTip()
        }, this.tHt = () => {
            UiManager_1.UiManager.OpenView("PersonalOptionView")
        }, this.iHt = () => {
            CommonInputViewController_1.CommonInputViewController.OpenPersonalSignInputView()
        }, this.oHt = () => {
            CommonInputViewController_1.CommonInputViewController.OpenSetRoleNameInputView()
        }, this.rHt = () => {
            var t;
            this.ovt.MovingState() || this.ovt.GetCurrentSelectIndex() <= 0 || (t = this.ovt.GetCurrentSelectIndex() - 1, this.ovt.AttachToIndex(t, !1))
        }, this.nHt = () => {
            var t;
            this.ovt.MovingState() || this.ovt.GetCurrentSelectIndex() >= this.ovt.GetDataLength() || (t = this.ovt.GetCurrentSelectIndex() + 1, this.ovt.AttachToIndex(t, !1))
        }, this.jjs = () => {
            if (ModelManager_1.ModelManager.GameModeModel.IsMulti) {
                let t = void 0;
                (t = ModelManager_1.ModelManager.OnlineModel.GetIsMyTeam()?new ConfirmBoxDefine_1.ConfirmBoxDataNew(100) : new ConfirmBoxDefine_1.ConfirmBoxDataNew(78)).FunctionMap.set(2, () => {
                    ControllerHolder_1.ControllerHolder.OnlineController.LeaveWorldTeamRequest(ModelManager_1.ModelManager.FunctionModel.PlayerId), this.CloseMe()
                }), ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(t)
            }
        }, this.sHt = () => {
            this.N7t.SetUIActive(!1), this.G7t.SetUIActive(!1)
        }, this.aHt = () => {
            this.hHt()
        }, this.$At = () => {
            this.r9t()
        }, this.XAt = () => {
            var t = ModelManager_1.ModelManager.FunctionModel.GetPlayerName();
            t && this.GetText(0).SetText(t)
        }, this.lHt = () => {
            this._Ht()
        }, this.uHt = () => {
            this.cHt()
        }, this.mHt = () => {
            var t, e = ModelManager_1.ModelManager.PersonalModel.GetBirthday(),
                i = this.GetText(26);
            0 === e?LguiUtil_1.LguiUtil.SetLocalText(i, "BirthDay", "--", "--") : (t = Math.floor(e / 100), e = e % 100, LguiUtil_1.LguiUtil.SetLocalText(i, "BirthDay", t, e))
        }, this.dHt = t => {
            this.BNe(t), this.B7t.SetToggleSelectByIndex(t)
        }, this.CHt = (t, e, i) => {
            t = new FunctionAttachItemGrid_1.FunctionAttachItemGrid(t);
            return t.SetNeedAnim(0 === e), this.H7t.set(e, t), t
        }
    }
    OnRegisterComponent() {
        this.ComponentRegisterInfos = [
            [0, UE.UIText],
            [1, UE.UIText],
            [2, UE.UIText],
            [3, UE.UIButtonComponent],
            [4, UE.UIText],
            [5, UE.UIText],
            [6, UE.UIButtonComponent],
            [7, UE.UIButtonComponent],
            [8, UE.UIButtonComponent],
            [9, UE.UISprite],
            [10, UE.UIItem],
            [11, UE.UITexture],
            [12, UE.UIButtonComponent],
            [13, UE.UIButtonComponent],
            [14, UE.UIButtonComponent],
            [15, UE.UIButtonComponent],
            [16, UE.UIButtonComponent],
            [17, UE.UIButtonComponent],
            [18, UE.UIItem],
            [19, UE.UIItem],
            [20, UE.UIButtonComponent],
            [21, UE.UIButtonComponent],
            [22, UE.UIButtonComponent],
            [23, UE.UITexture],
            [24, UE.UIButtonComponent],
            [25, UE.UIText],
            [26, UE.UIText],
            [27, UE.UIButtonComponent],
            [28, UE.UIItem],
            [29, UE.UIItem],
            [30, UE.UIGridLayout],
            [31, UE.UIItem],
            [32, UE.UIButtonComponent],
            [33, UE.UISprite],
            [34, UE.UIItem],
            [35, UE.UIItem]
        ], this.BtnBindInfo = [
            [6, this.W7t],
            [7, this.K7t],
            [8, this.X7t],
            [3, this.$7t],
            [12, this.Y7t],
            [13, this.J7t],
            [14, this.z7t],
            [15, this.Q7t],
            [20, this.Z7t],
            [21, this.eHt],
            [22, this.tHt],
            [24, this.iHt],
            [27, this.oHt],
            [17, this.rHt],
            [16, this.nHt],
            [32, this.jjs]
        ]
    }
    OnStart() {
        this.G7t = this.GetButton(17).RootUIComp, this.N7t = this.GetButton(16).RootUIComp, this.O7t = this.GetItem(19), this.k7t = this.GetItem(18), this.B7t = new FunctionTabLayout_1.FunctionTabLayout(this.GetItem(28)), this.ovt = new NoCircleAttachView_1.NoCircleAttachView(this.GetItem(10).GetOwner());
        var t = this.GetItem(29),
            t = (t.SetUIActive(!1), this.ovt.CreateItems(t.GetOwner(), 0, this.CHt), this.ovt.SetDragBeginCallback(this.sHt), this.ovt.SetMoveMultiFactor(50), this.F7t = new FunctionBottomButtonItem_1.FunctionBottomButtonItem(this.GetButton(8).RootUIComp, "FunctionMail"), this.V7t = new FunctionBottomButtonItem_1.FunctionBottomButtonItem(this.GetButton(15).RootUIComp, "FunctionNotice"), ModelManager_1.ModelManager.FunctionModel.IsOpen(10060)),
            t = (this.GetButton(21).RootUIComp.SetRaycastTarget(t), this.gHt(), this.Wjs(), this.ovt.GetCurrentSelectIndex());
        this.BNe(t), this.B7t.SetToggleSelectByIndex(t)
    }
    OnAddEventListener() {
        EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CurWorldLevelChange, this.aHt), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSignChange, this.$At), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnNameChange, this.XAt), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnHeadIconChange, this.lHt), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnCardChange, this.uHt), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnBirthChange, this.mHt), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.FunctionGridSelected, this.dHt), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnFunctionViewShow)
    }
    OnRemoveEventListener() {
        EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CurWorldLevelChange, this.aHt), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSignChange, this.$At), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnNameChange, this.XAt), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnHeadIconChange, this.lHt), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnCardChange, this.uHt), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnBirthChange, this.mHt), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.FunctionGridSelected, this.dHt)
    }
    BNe(t) {
        this.G7t.SetUIActive(0 < t), this.N7t.SetUIActive(t < this.ovt.GetDataLength() - 1), this.O7t.SetUIActive(this.fHt(t)), this.k7t.SetUIActive(this.pHt(t))
    }
    fHt(i) {
        var r = [];
        for (let t = 0, e = i; t < e; ++t) r.push(...this.ypt[t]);
        for (const e of r) {
            var t = ModelManager_1.ModelManager.FunctionModel.GetFunctionItemRedDotName(e);
            if (t) {
                t = ModelManager_1.ModelManager.RedDotModel.GetRedDot(t);
                if (t && t.IsRedDotActive()) return !0
            }
        }
        return !1
    }
    pHt(i) {
        var r = [];
        for (let t = i + 1, e = this.ypt.length; t < e; ++t) r.push(...this.ypt[t]);
        for (const e of r) {
            var t = ModelManager_1.ModelManager.FunctionModel.GetFunctionItemRedDotName(e);
            if (t) {
                t = ModelManager_1.ModelManager.RedDotModel.GetRedDot(t);
                if (t && t.IsRedDotActive()) return !0
            }
        }
        return !1
    }
    OnBeforeShow() {
        this.vHt(), this.MHt(), this.K8e()
    }
    OnAfterShow() {
        this.EHt()
    }
    OnAfterHide() {
        this.Ovt()
    }
    OnBeforeDestroy() {
        for (const t of this.ovt.GetItems()) this.AddChild(t);
        this.B7t.Destroy(), this.F7t.Destroy(), this.V7t.Destroy()
    }
    K8e() {
        this.F7t.BindRedDot(), this.V7t.BindRedDot(), RedDotController_1.RedDotController.BindRedDot("PersonalCard", this.GetItem(34))
    }
    Ovt() {
        this.F7t.UnBindRedDot(), this.V7t.UnBindRedDot(), RedDotController_1.RedDotController.UnBindGivenUi("PersonalCard", this.GetItem(34))
    }
    vHt() {
        this.K7e(), this.SHt(), this.hHt(), this._Ht(), this.cHt(), this.r9t(), this.yHt()
    }
    K7e() {
        var t = ModelManager_1.ModelManager.FunctionModel.GetPlayerName();
        this.GetText(0).SetText(t)
    }
    SHt() {
        var t, e = ModelManager_1.ModelManager.FunctionModel.GetPlayerLevel(),
        // here
            e = (LguiUtil_1.LguiUtil.SetLocalText(this.GetText(4), "PlayerLevelNum", e), LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), "UserId", ModManager_1.ModManager.Settings.Uid), PlayerExpByPlayerLevel_1.configPlayerExpByPlayerLevel.GetConfig(e));
        e?.PlayerExp && (t = ModelManager_1.ModelManager.FunctionModel.GetPlayerExp(), LguiUtil_1.LguiUtil.SetLocalText(this.GetText(5), "ExpText", t, e.PlayerExp), this.GetSprite(9).SetFillAmount(t / e.PlayerExp))
    }
    hHt() {
        LguiUtil_1.LguiUtil.SetLocalText(this.GetText(2), "WorldLevelNum", ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel)
    }
    _Ht() {
        var t = ModelManager_1.ModelManager.PlayerInfoModel.GetNumberPropById(4);
        const e = this.GetTexture(11);
        e.SetUIActive(!1), this.SetRoleIcon("", e, t, void 0, () => {
            e.SetUIActive(!0)
        });
        t = ModelManager_1.ModelManager.PersonalModel.CheckCanShowPersonalTip();
        this.GetItem(35).SetUIActive(t)
    }
    cHt() {
        var t = ModelManager_1.ModelManager.PersonalModel.GetCurCardId();
        t && (t = BackgroundCardById_1.configBackgroundCardById.GetConfig(t)) && this.SetTextureByPath(t.FunctionViewCardPath, this.GetTexture(23))
    }
    r9t() {
        var t = ModelManager_1.ModelManager.PersonalModel.GetSignature(),
            e = this.GetText(25);
        t?e.SetText(t) : LguiUtil_1.LguiUtil.SetLocalText(e, "ClickToSetSign")
    }
    yHt() {
        var t, e = ModelManager_1.ModelManager.PersonalModel.GetBirthday(),
            i = this.GetText(26);
        0 === e?LguiUtil_1.LguiUtil.SetLocalText(i, "BirthDay", "--", "--") : (t = Math.floor(e / 100), e = e % 100, LguiUtil_1.LguiUtil.SetLocalText(i, "BirthDay", t, e))
    }
    IHt(t) {
        var e = this.GetItem(31),
            i = e.GetStretchRight();
        e.SetStretchRight(i + t)
    }
    gHt() {
        this.j7t = this.THt(), this.IHt(this.j7t.OffsetWidth);
        var t = ModelManager_1.ModelManager.FunctionModel.GetShowFunctionIdList(),
            e = t.length;
        this.ypt = [];
        let i = 0;
        for (; e > i + this.j7t.TotalGridNumber;) this.ypt.push(t.slice(i, i + this.j7t.TotalGridNumber)), i += this.j7t.TotalGridNumber;
        this.ypt.push(t.slice(i, e));
        var r = Math.ceil(e / this.j7t.TotalGridNumber);
        this.B7t.RefreshTab(r), this.ovt.SetBoundDistance(0), this.ovt.ReloadView(r, this.ypt)
    }
    LHt(i) {
        var r = this.ypt;
        let n = -1;
        for (let t = 0, e = r.length; t < e; ++t) r[t].includes(i) && (n = t);
        return n
    }
    Wjs() {
        var t, e = this.GetButton(32)?.RootUIComp;
        ModelManager_1.ModelManager.GameModeModel.IsMulti?(e?.SetUIActive(!0), t = ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamListById(ModelManager_1.ModelManager.FunctionModel.PlayerId)?.PingState, this.pOi(t)) : e?.SetUIActive(!1)
    }
    pOi(t) {
        var e, i = this.GetSprite(33);
        i.SetUIActive(!0), t === Protocol_1.Aki.Protocol.Y8s.Proto_UNKNOWN?(e = ConfigManager_1.ConfigManager.UiResourceConfig?.GetResourcePath("SP_SignalUnknown"), this.SetSpriteByPath(e, i, !1)) : t === Protocol_1.Aki.Protocol.Y8s.Proto_GREAT?(e = ConfigManager_1.ConfigManager.UiResourceConfig?.GetResourcePath("SP_SignalGreat"), this.SetSpriteByPath(e, i, !1)) : t === Protocol_1.Aki.Protocol.Y8s.Proto_GOOD?(e = ConfigManager_1.ConfigManager.UiResourceConfig?.GetResourcePath("SP_SignalGood"), this.SetSpriteByPath(e, i, !1)) : t === Protocol_1.Aki.Protocol.Y8s.Proto_POOR && (e = ConfigManager_1.ConfigManager.UiResourceConfig?.GetResourcePath("SP_SignalPoor"), this.SetSpriteByPath(e, i, !1))
    }
    GetGuideUiItemAndUiItemForShowEx(t) {
        if (1 < t.length || isNaN(Number(t[0]))) Log_1.Log.CheckError() && Log_1.Log.Error("Guide", 17, "功能菜单聚焦引导的ExtraParam配置错误", ["configParams", t]);
        else {
            var t = Number(t[0]),
                e = this.LHt(t);
            if (-1 === e) Log_1.Log.CheckError() && Log_1.Log.Error("Guide", 17, "功能菜单聚焦引导的ExtraParam配置错误, 检查functionId", ["functionId", t]);
            else {
                this.ovt.AttachToIndex(e, !0);
                e = this.H7t.get(e);
                if (e) {
                    e = e.GetFunctionItem(t);
                    if (e.GetActive()) {
                        e = e.GetButtonItem();
                        if (e) return [e, e]
                    }
                } else Log_1.Log.CheckError() && Log_1.Log.Error("Guide", 17, "功能菜单聚焦引导的ExtraParam配置错误, 检查functionId", ["functionId", t])
            }
        }
    }
    MHt() {
        this.GetButton(8).SetSelfInteractive(ModelManager_1.ModelManager.FunctionModel.IsOpen(10020)), this.GetButton(12).SetSelfInteractive(ModelManager_1.ModelManager.FunctionModel.IsOpen(10018)), this.GetButton(13).SetSelfInteractive(ModelManager_1.ModelManager.FunctionModel.IsOpen(10019)), this.GetButton(15).SetSelfInteractive(ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk()), this.GetButton(20).SetSelfInteractive(ModelManager_1.ModelManager.FunctionModel.IsOpen(10049))
    }
    EHt() {
        Log_1.Log.CheckInfo() && Log_1.Log.Info("Functional", 11, "功能开启界面Start阶段计算数据输出", ["剩余宽度", this.j7t.OffsetWidth], ["显示数量", this.j7t.TotalGridNumber]);
        var t = this.THt();
        Log_1.Log.CheckInfo() && Log_1.Log.Info("Functional", 11, "功能开启界面AfterShow阶段计算数据输出", ["剩余宽度", t.OffsetWidth], ["显示数量", t.TotalGridNumber])
    }
    THt() {
        var t = this.GetItem(29),
            e = this.GetGridLayout(30),
            i = e.GetCellSize(),
            r = e.GetSpacing(),
            e = e.GetPadding(),
            n = t.GetWidth(),
            t = t.GetHeight(),
            o = (n - e.Left - e.Right) % (i.X + r.X),
            s = o >= i.X?1 : 0,
            n = Math.floor((n - e.Left - e.Right) / (i.X + r.X)) + s,
            s = (t - e.Top - e.Bottom) % (i.Y + r.Y) > i.Y?1 : 0;
        return {
            TotalGridNumber: n * (Math.floor((t - e.Top - e.Bottom) / (i.Y + r.Y)) + s),
            OffsetWidth: o >= i.X?o - i.X : o + r.X
        }
    }
}
exports.FunctionView = FunctionView;
//# sourceMappingURL=FunctionView.js.map