"use strict";
var _a;
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.WaterMaskView = void 0;
const UE = require("ue"),
    Info_1 = require("../../../Core/Common/Info"),
    MathUtils_1 = require("../../../Core/Utils/MathUtils"),
    EventDefine_1 = require("../../Common/Event/EventDefine"),
    EventSystem_1 = require("../../Common/Event/EventSystem"),
    ModelManager_1 = require("../../Manager/ModelManager"),
    UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
    UiLayerType_1 = require("../../Ui/Define/UiLayerType"),
    UiLayer_1 = require("../../Ui/UiLayer");
class WaterMaskView extends UiControllerBase_1.UiControllerBase {
    static CanOpenView() {
        return !1
    }
    static OnAddEvents() {
        EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnGetPlayerBasicInfo, this.vOo), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SetResolution, this.MOo), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BackLoginView, this.EOo)
    }
    static OnRemoveEvents() {
        EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnGetPlayerBasicInfo, this.vOo), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SetResolution, this.MOo), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BackLoginView, this.EOo)
    }
}
exports.WaterMaskView = WaterMaskView, (_a = WaterMaskView).SOo = void 0, WaterMaskView.yOo = 300, WaterMaskView.IOo = 300, WaterMaskView.TOo = 30, WaterMaskView.LOo = .09, WaterMaskView.vFt = 40, WaterMaskView.vOo = () => {
    void 0 !== _a.SOo && _a.EOo();
    var e = UiLayer_1.UiLayer.GetLayerRootUiItem(UiLayerType_1.ELayerType.WaterMask),
        t = (_a.SOo = UE.KuroActorManager.SpawnActor(Info_1.Info.World, UE.UIContainerActor.StaticClass(), MathUtils_1.MathUtils.DefaultTransform, void 0), _a.SOo.RootComponent),
        e = (t.SetDisplayName("WaterMaskContainer"), UE.KuroStaticLibrary.SetActorPermanent(_a.SOo, !0, !0), _a.SOo.K2_AttachRootComponentTo(e), t.GetRootCanvas().GetOwner().RootComponent),
        i = e.widget.width % _a.yOo / 2,
        r = e.widget.height % _a.IOo / 2,
        n = e.widget.width / 2,
        _ = e.widget.height / 2,
        s = Math.ceil(e.widget.width / _a.yOo),
        o = Math.ceil(e.widget.height / _a.IOo),
        v = ModelManager_1.ModelManager.FunctionModel.PlayerId.toString();
    for (let a = 0; a < s; a++)
        for (let e = 0; e < o; e++) {
            var E = UE.KuroActorManager.SpawnActor(Info_1.Info.World, UE.UITextActor.StaticClass(), MathUtils_1.MathUtils.DefaultTransform, void 0),
                U = E.RootComponent,
                U = (E.K2_AttachRootComponentTo(t), U.SetDisplayName("WaterMaskText"), E.GetComponentByClass(UE.UIText.StaticClass()));
            U.SetFontSize(_a.vFt), U.SetOverflowType(0), U.SetAlpha(_a.LOo), U.SetFont(UE.LGUIFontData.GetDefaultFont()), U.SetText(v), U.SetUIRelativeLocation(new UE.Vector(a * _a.yOo - n + i, e * _a.IOo - _ + r, 0)), U.SetUIRelativeRotation(new UE.Rotator(0, _a.TOo, 0)), UE.KuroStaticLibrary.SetActorPermanent(E, !0, !0)
        }
}, WaterMaskView.EOo = () => {
    void 0 !== _a.SOo && (_a.SOo.K2_DestroyActor(), _a.SOo = void 0)
}, WaterMaskView.MOo = () => {
    _a.EOo(), _a.vOo()
};
//# sourceMappingURL=WaterMaskController.js.map