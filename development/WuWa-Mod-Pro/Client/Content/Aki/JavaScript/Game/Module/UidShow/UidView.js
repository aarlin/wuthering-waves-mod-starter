"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UidView = void 0);
const UE = require("ue"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiViewBase_1 = require("../../Ui/Base/UiViewBase"),
  ModManager_1 = require("../../Manager/ModManager"),
  LguiUtil_1 = require("../Util/LguiUtil");
class UidView extends UiViewBase_1.UiViewBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  OnStart() {
    //const uidtext ="QQ群:746634670 | https://github.com/Gktwo/wuwa-mod"
//f5到f12 8个键
     ModManager_1.ModManager.AddToggle("GodMode","f5");
     ModManager_1.ModManager.AddToggle("HitMultiplier","f6");
    ModManager_1.ModManager.AddToggle("AutoPickTreasure","f7");//done
    // ModManager_1.ModManager.AddToggle("AntiDither","f8");//done
     ModManager_1.ModManager.AddToggle("AutoAbsorb","f8");//done
    // ModManager_1.ModManager.AddToggle("InfiniteStamina","f10");
      ModManager_1.ModManager.AddToggle("killAura","f9");
      
     ModManager_1.ModManager.AddToggle("PerceptionRange","f10");//done
    //  ModManager_1.ModManager.AddToggle("Weather","Numpad6");//done
    ModManager_1.ModManager.AddToggle("NoCD","f11");
      ModManager_1.ModManager.AddKey("ShowMenu","k");

      ModManager_1.ModManager.AddKey("PlayerSpeed","f12");
     //ModManager_1.ModManager.AddKey("MarkTp","t");//done


     //ModManager_1.ModManager.AddToggle("MarkTp","t");//done
    const uidtext = ModManager_1.ModManager.Settings.Uid;
    LguiUtil_1.LguiUtil.SetLocalText(
      this.GetText(0),
      "FriendMyUid",
      uidtext
    );
  }
}
exports.UidView = UidView;
//# sourceMappingURL=UidView.js.map

