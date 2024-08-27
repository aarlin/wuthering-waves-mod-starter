"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.CipherController = void 0;
const Protocol_1 = require("../../../Core/Define/Net/Protocol"),
    Net_1 = require("../../../Core/Net/Net"),
    ModelManager_1 = require("../../Manager/ModelManager"),
    UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
    ModManager_1 = require("../../Manager/ModManager"),
    UiManager_1 = require("../../Ui/UiManager");
class CipherController extends UiControllerBase_1.UiControllerBase {
    static OpenCipherView(e) {
        UiManager_1.UiManager.IsViewShow("CipherView") || (ModelManager_1.ModelManager.CipherModel.InitCipherConfig(e), UiManager_1.UiManager.OpenView("CipherView"));
        if (ModManager_1.ModManager.Settings.AutoPuzzle) {
            this.RequestCipherComplete();
        }
    }
    static RequestCipherComplete() {
        var e = Protocol_1.Aki.Protocol.TJn.create();
        e.z4n = ModelManager_1.ModelManager.CipherModel.GetCipherConfigId(), e.Z4n = Protocol_1.Aki.Protocol.t3s.Proto_Cipher, Net_1.Net.Call(5703, e, e => {})
    }
}
exports.CipherController = CipherController;
//# sourceMappingURL=CipherController.js.map