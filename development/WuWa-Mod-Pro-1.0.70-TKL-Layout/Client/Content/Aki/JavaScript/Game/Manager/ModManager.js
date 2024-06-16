"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ModManager = void 0);
const puerts_1 = require("puerts"), //一个格子跳到game下
  UE = require("ue"),
  CharacterController_1 = require("../NewWorld/Character/CharacterController"),
  ConfirmBoxController_1 = require("../Module/ConfirmBox/ConfirmBoxController"),
  ConfirmBoxDefine_1 = require("../Module/ConfirmBox/ConfirmBoxDefine"),
  CreatureController_1 = require("../World/Controller/CreatureController"), //add
  InputController_1 = require("../Input/InputController"),
  InputSettings_1 = require("../InputSettings/InputSettings"),
  MapController_1 = require("../Module/Map/Controller/MapController"),
  ModCustomTp_1 = require("./ModFuncs/ModCustomTp"),
  ModDebugger_1 = require("./ModFuncs/ModDebugger"),
  ModelManager_1 = require("./ModelManager"),
  ModUtils_1 = require("./ModFuncs/ModUtils"),
  ScrollingTipsController_1 = require("../Module/ScrollingTips/ScrollingTipsController"),
  TeleportController_1 = require("../Module/Teleport/TeleportController"), //传送
  WeatherController_1 = require("../Module/Weather/WeatherController");

class ModManager {
  static Settings = {
    GodMode: false,
    HitMultiplier: false,
    Hitcount: 15,
    AutoPickTreasure: false,
    AntiDither: false,
    AutoAbsorb: false,
    NoCD: false,
    InfiniteStamina: false,
    killAura: false,
    PerceptionRange: false,
    perceptionRangeValue: 100,
    Weather: false,
    WeatherType: 1,
    MarkTp: false,
    CustomTp: false,
    playerSpeedValue: 3,
    PlayerSpeed: false,
    ShowMenu: false,
    AutoLoot: false,
    HideDamage: false,
    shopCount: 1,
    AutoDestroy: false,
    AlwaysCrit: false,

    UIDChanger: false,
    Uid: "000000001",
    freeCheetos: 0,
  };

  static buttonMappings = [
    { name: "ShowMenu", key: "Home", toggle: false },
    { name: "GodMode", key: "F5", toggle: true },
    { name: "HitMultiplier", key: "F6", toggle: true },
    { name: "AutoPickTreasure", key: "F7", toggle: true },
    { name: "AutoAbsorb", key: "F8", toggle: true },
    { name: "killAura", key: "F9", toggle: true },
    { name: "PerceptionRange", key: "F10", toggle: true },
    { name: "NoCD", key: "F11", toggle: true },
    { name: "PlayerSpeed", key: "F12", toggle: true },
    { name: "CustomTp", key: "Insert", toggle: true },
    { name: "infAura", key: "End", toggle: true },
    { name: "ShopMultiplier", key: "Semicolon", toggle: false },
    { name: "UIDChanger", key: "Apostrophe", toggle: false },
    { name: "AutoLoot", key: "Comma", toggle: true },
    { name: "AutoDestroy", key: "Period", toggle: true },
    { name: "HideDamage", key: "Slash", toggle: true },
    { name: "AlwaysCrit", key: "Backslash", toggle: true },
  ];

  static ModStart() {
    ModDebugger_1.ModDebugger.TestMethod();
    for (const buttonMapping of this.buttonMappings) {
      if (buttonMapping.toggle) {
        this.AddToggle(buttonMapping.name, buttonMapping.key);
      } else {
        this.AddKey(buttonMapping.name, buttonMapping.key);
      }
    }
  }

  static listenModsToggle() {
    if (this.listenKey("ShowMenu", "Home")) {
      this.ShowMenu();
    }

    this.listenMod('GodMode', "F5");
    this.listenMod('AutoPickTreasure', "F7");
    this.listenMod('AutoAbsorb', "F8");
    this.listenMod('killAura', "F9");
    this.listenMod('infAura', "End");
    this.listenMod('NoCD', "F11");
    this.listenMod('AutoLoot', "Comma");
    this.listenMod('AutoDestroy', "Period");
    this.listenMod("HideDamage", "Slash");
    this.listenMod("AlwaysCrit", "Backslash");

    if (this.listenMod("HitMultiplier", "F6", "HitMultiplier")) {
      if (this.Settings.HitMultiplier) {
        ModUtils_1.ModUtils.KuroSingleInputBox({
          title: "HitMultiplier: Please enter hit count",
          customFunc: async (string) => {
            var count = ModUtils_1.ModUtils.StringToInt(string);
            if (count !== "error") {
              this.Settings.Hitcount = count;
            }
          },
          inputText: this.Settings.Hitcount.toString(),
          defaultText: "Please enter hit count",
          isCheckNone: true,
          needFunctionButton: false,
        });
      }
    }

    if (this.listenMod('PerceptionRange', "F10")) {
      if (this.Settings.PerceptionRange) {
        ModUtils_1.ModUtils.KuroSingleInputBox({
          title: "Perception Range Value" + " | Current: " + this.Settings.perceptionRangeValue,
          customFunc: async (string) => {
            var count = ModUtils_1.ModUtils.StringToInt(string);
            if (count !== "error") {
              this.ShowTip("Set PerceptionRange to " + count);
              this.Settings.perceptionRangeValue = count;
            }
          },
          inputText: this.Settings.perceptionRangeValue.toString(),
          defaultText: "Enter a number...",
          isCheckNone: false,
          needFunctionButton: false
        })
      }
    }

    if (this.listenKey('ShopMultiplier', "Semicolon")) {
      ModUtils_1.ModUtils.KuroSingleInputBox({
        title: "Shop Multiplier Value" + " | Current: " + this.Settings.shopCount,
        customFunc: async (string) => {
          var count = ModUtils_1.ModUtils.StringToInt(string);
          if (count !== "error") {
            this.ShowTip("Set ShopMultiplier to " + count);
            this.Settings.shopCount = count;
          }
        },
        inputText: this.Settings.shopCount.toString(),
        defaultText: "Enter a number...",
        isCheckNone: false,
        needFunctionButton: false
      })
    }

    if (this.listenKey('UIDChanger', "Apostrophe")) {
      this.Settings.UIDChanger = true;
      if (this.Settings.UIDChanger) {
        UiManager_1.UiManager.OpenView("CommonSingleInputView", {
          Title: "UID Changer",
          CustomFunc: async (string) => {
            this.Settings.Uid = string;
            this.ShowTip("UID Changed to " + string);
            UiManager_1.UiManager.CloseView("UidView");
            UiManager_1.UiManager.OpenView("UidView");
          },
          InputText: this.Settings.Uid,
          DefaultText: "UID",
          IsCheckNone: true,
          NeedFunctionButton: false,
        });
      }
    }

    if (this.listenMod("PlayerSpeed", "F12", "PlayerSpeed")) {
      if (this.Settings.PlayerSpeed) {
        this.SetPlayerSpeed(3);
      } else {
        this.SetPlayerSpeed(1);
      }
    }
    if (this.listenMod("CustomTp", "Insert", "CustomTp")) {
      if (this.Settings.CustomTp) {
        this.AddKey("PreviousFile", "PageUp");
        this.AddKey("NextFile", "PageDown");
        this.AddKey("PreviousPos", "Up");
        this.AddKey("NextPos", "Down");
        this.AddKey("ShowTpState", "Delete");
        ModCustomTp_1.ModCustomTp.CustomTpEnable();
      } else {
        this.RemoveKey("PreviousFile", "PageUp");
        this.RemoveKey("NextFile", "PageDown");
        this.RemoveKey("Previous", "Up");
        this.RemoveKey("Next", "Down");
        this.RemoveKey("ShowTpState", "Delete");
        ModCustomTp_1.ModCustomTp.CustomTpDisable();
      }
    }
    if (this.Settings.CustomTp) {
      if (this.listenKey("ShowTpState", "Delete")) {
        ModCustomTp_1.ModCustomTp.ShowCtpState();
      }
      if (this.listenKey("PreviousFile", "PageUp")) {
        ModCustomTp_1.ModCustomTp.SubFile();
      }
      if (this.listenKey("NextFile", "PageDown")) {
        ModCustomTp_1.ModCustomTp.AddFile();
      }
      if (this.listenKey("PreviousPos", "Up")) {
        ModCustomTp_1.ModCustomTp.SubPos();
        ModCustomTp_1.ModCustomTp.GoTp();
      }
      if (this.listenKey("NextPos", "Down")) {
        ModCustomTp_1.ModCustomTp.AddPos();
        ModCustomTp_1.ModCustomTp.GoTp();
      }
    }

    ModDebugger_1.ModDebugger.EnableDebug();
    if (ModDebugger_1.ModDebugger.Setting.EnableDebug) {
      ModDebugger_1.ModDebugger.ListenDebug();
    }
  }

  static AddToggle(desc, key) {
    InputSettings_1.InputSettings.AddActionMapping(desc, key);
  }
  static RemoveToggle(desc, key) {
    InputSettings_1.InputSettings.RemoveActionMapping(desc, key);
  }
  static AddKey(desc, key) {
    InputSettings_1.InputSettings.AddActionMapping(desc, key);
  }
  static RemoveKey(desc, key) {
    InputSettings_1.InputSettings.RemoveActionMapping(desc, key);
  }
  static ShowFuncStateTip(func, string) {
    var info = "Unknown";
    if (this.Settings.hasOwnProperty(func)) var state = this.Settings[func];
    if (state) {
      info = string + " | " + "ON";
      this.ShowTip(info);
    } else {
      info = string + " | " + "OFF";
      this.ShowTip(info);
    }
  }

  static Toggle(func) {
    if (this.Settings.hasOwnProperty(func)) {
      this.Settings[func] = !this.Settings[func];
    }
  }

  static listenMod(func, key) {
    if (InputController_1.InputController.IsMyKeyUp(key)) {
      if (this.Settings.hasOwnProperty(func)) {
        this.Settings[func] = !this.Settings[func];
        this.ShowTip("Toggle " + func + " : " + (this.Settings[func] ? "ON" : "OFF"));
      }
      return true;
    }
    return false;
  }

  static listenKey(desc, key) {
    return InputController_1.InputController.IsMyKeyUp(key);
  }

  static TPtest() {
    TeleportController_1.TeleportController.TeleportToPositionNoLoading(
      new UE.Vector(0, 0, 0),
      new UE.Rotator(0, 0, 0),
      "comment/message",
    );
  }
  static TpNoloadingTo(x, y, z) {
    TeleportController_1.TeleportController.TeleportToPositionNoLoading(
      new UE.Vector(x, y, z),
      new UE.Rotator(0, 0, 0),
      "comment/message",
    );
  }

  static TpNoloadingTo2(tppos) {
    TeleportController_1.TeleportController.TeleportToPositionNoLoading(
      tppos,
      new UE.Rotator(0, 0, 0),
      "comment/message",
    );
  }

  static MonsterBoom(entity, Delay) {
    CreatureController_1.CreatureController.MonsterBoomRequest(entity, Delay);
  }

  static ChangeWeather(weatherID) {
    WeatherController_1.WeatherController.TestChangeWeather(weatherID);
    //1.sunny 2.Cloudy 3.ThunderRain 4.Snow 5.rain
  }

  static ShowConfirmBox(title, string, id) {
    //封号那个窗口
    const confirmBox = new ConfirmBoxDefine_1.ConfirmBoxDataNew(id);
    confirmBox.SetTextArgs(string);
    confirmBox.SetTitle(title);
    ConfirmBoxController_1.ConfirmBoxController.ShowConfirmBoxNew(confirmBox);
  }

  static ShowTip(string) {
    ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(string);
  }

  static FuncState(cheatToggleSetting, cheatName) {
    return cheatToggleSetting ? `${cheatName} : <color=green>ON</color>` : `${cheatName} : <color=red>OFF</color>`
  }

  static ShowOverlayMenu() {

  }

  static ShowMenu() {
    //类似封号那个窗口
    const newConfirmBox = new ConfirmBoxDefine_1.ConfirmBoxDataNew(50);

    const cheatToggleStates = [
      this.FuncState(this.Settings.GodMode, "GodMode[F5]"),
      this.FuncState(this.Settings.HitMultiplier, "HitMultiplier[F6]"),
      this.FuncState(this.Settings.AutoPickTreasure, "AutoPickTreasure[F7]"),
      this.FuncState(this.Settings.AutoAbsorb, "AutoAbsorb[F8]"),
      this.FuncState(this.Settings.killAura, "killAura[F9]"),
      this.FuncState(this.Settings.PerceptionRange, "PerceptionRange[F10]"),
      this.FuncState(this.Settings.NoCD, "NoCD[F11]"),
      this.FuncState(this.Settings.PlayerSpeed, "PlayerSpeed[F12]"),
      this.FuncState(this.Settings.CustomTp, "CustomTp[Ins]"),
      this.FuncState(this.Settings.infAura, "infAura[End]"),
      this.FuncState(this.Settings.AutoLoot, "AutoLoot[Comma]"),
      this.FuncState(this.Settings.AutoDestroy, "AutoDestroy[Period]"),
      this.FuncState(this.Settings.HideDamage, "HideDamage[Slash]"),
      "ShopMultiplier[Semicolon] | UIDChanger[Apostrophe]"
    ];

    const mergedCheatToggleStates = cheatToggleStates.join(' ');

    newConfirmBox.SetTextArgs(mergedCheatToggleStates);
    newConfirmBox.SetTitle("[NotKunMods] DisableAntiCheat : <color=green>ON</color> ");
    ConfirmBoxController_1.ConfirmBoxController.ShowConfirmBoxNew(newConfirmBox);
  }
  static MarkTp() {
    var r = ModelManager_1.ModelManager.MapModel.GetCurTrackMark();
    var i = ModelManager_1.ModelManager.MapModel.GetMark(r[0], r[1]);
    var targetX = i.TrackTarget.X;
    var targetY = i.TrackTarget.Y;
    var v = MapController_1.MapController.GetMarkPosition(targetX, targetY);
    if (v.Z == 0) v.Z = 300;
    if (v.X == 0 && v.Y == 0) return;
    this.TpNoloadingTo(v.X * 100, v.Y * 100, v.Z * 100);
  }
  static GetEntityList() {
    return ModelManager_1.ModelManager.CreatureModel.GetAllEntities();
  }

  static SpawnEntity() { }

  static SetPlayerSpeed(value) {
    CharacterController_1.CharacterController.SetTimeDilation(value);
  }
  //自定义传送

  static ChangeUid() {
    UiManager_1.UiManager.OpenView("CommonSingleInputView", {
      Title: "UID Changer",
      CustomFunc: async (string) => {
        this.Settings.Uid = string;
        this.ShowTip("UID Changed to " + string);
        UiManager_1.UiManager.CloseView("UidView");
        UiManager_1.UiManager.OpenView("UidView");
      },
      InputText: this.Settings.Uid,
      DefaultText: "UID",
      IsCheckNone: true,
      NeedFunctionButton: false,
    });
  }
}
exports.ModManager = ModManager;
