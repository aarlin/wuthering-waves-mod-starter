"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ModManager = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Info_1 = require("../../Core/Common/Info"),
  Log_1 = require("../../Core/Common/Log"),
  InputSettings_1 = require("../../InputSettings/InputSettings"),
  TeleportController_1 = require("../../Module/Teleport/TeleportController"),//传送
  CreatureController_1 = require("../../World/Controller/CreatureController"),//add
  ConfirmBoxController_1 = require("../../Module/ConfirmBox/ConfirmBoxController"),
  ConfirmBoxDefine_1 = require("../../Module/ConfirmBox/ConfirmBoxDefine"),
  ScrollingTipsController_1 = require("../../Module/ScrollingTips/ScrollingTipsController"),
  MapController_1 = require("../../Module/Map/Controller/MapController"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  CharacterController_1 = require('../../NewWorld/Character/CharacterController'),
  WeatherController_1 = require("../../Module/Weather/WeatherController");//
  

  //Log_1 = require("../../Core/Common/Log"),
 // Protocol_1 = require("../../Core/Define/Net/Protocol");
class ModManager{
    //functions  // download link： https://github.com/Gktwo/wuwa-mod
    static Settings = {
      GodMode : true ,
      HitMultiplier : true,
      AutoPickTreasure : true,
      AntiDither : true,
      AutoAbsorb : true,
      NoCD : true,
      InfiniteStamina : true,
      killAura : false,
      PerceptionRange : true,
      Weather : false,
      WeatherType : 1,
      MarkTp : true,
      CustomTp : false,
      playerSpeedValue :3,
      PlayerSpeed :false,


      Uid : "QQ群:746634670 | Github:https://github.com/Gktwo/wuwa-mod | Discord:https://discord.gg/QYu59wctHT",

    };
    // OnStart() {
    //   this.AddKey("ShowMenu","k");
    //   this.AddToggle("GodMode","p");
    // }
    // OnTick(){/cant use
    //       //add my code
    // if(this.listenKey("ShowMenu","k"))
    //   {
    //     this.ShowMenu();
    //   }//done

    //   this.listenMod('GodMode',"p");//done
    //   //ModManager_1.ModManager.listenMod('HitMultiplier',"6");//done    
    // //  ModManager_1.ModManager.listenMod('AutoPickTreasure',"Numpad2");//done
    // //  //ModManager_1.ModManager.listenMod('AntiDither',"f4");//done
    // //  ModManager_1.ModManager.listenMod('AutoAbsorb',"Numpad3");//done
    // //  //ModManager_1.ModManager.listenMod('InfiniteStamina',"f7");
    // //  ModManager_1.ModManager.listenMod('killAura',"Numpad4");//done
    // // ModManager_1.ModManager.listenMod('PerceptionRange',"Numpad5");
    // //  if(ModManager_1.ModManager.listenMod('Weather',"Numpad6")){
    // //   ModManager_1.ModManager.ChangWeather(ModManager_1.ModManager.Settings.WeatherType)
    // //  }
    //  //ModManager_1.ModManager.listenKey('PlayerSpeed',"Numpad7");
    // //  if(ModManager_1.ModManager.listenKey("MarkTp","t")){
    // //   ModManager_1.ModManager.MarkTp();
    // //  }//done
    //  //ModManager_1.ModManager.listenMod('CustomTp',"Numpad7");
    //  //ModManager_1.ModManager.listenKey('Previous',"PageUp");
    //  //ModManager_1.ModManager.listenKey('Next',"PageDown");
    // }

    static AddToggle(desc,key){
      InputSettings_1.InputSettings.AddActionMapping(desc,key); 
    }
    static AddKey(desc,key){
      InputSettings_1.InputSettings.AddActionMapping(desc,key); 
    }

    static Toggle(func){   
      if (this.Settings.hasOwnProperty(func)) {
        this.Settings[func] = !this.Settings[func];
    }}

    static listenMod(func,key){
      if(InputSettings_1.InputSettings.IsInputKeyDown(key)===true)
        {
          this.ShowTip("Toggle");
          if (this.Settings.hasOwnProperty(func)) {
            this.Settings[func] = !this.Settings[func];
                  
          }
    
        }
       // return false ;
    }
    static listenKey(desc,key){
      //this.ShowTip("Toggle");
      return InputSettings_1.InputSettings.IsInputKeyDown(key);

    }
    static SetUid(uid){
     //TODO

    }

    static TPtest()
    {    
      TeleportController_1.TeleportController.TeleportToPositionNoLoading(
        new UE.Vector(0, 0, 0),
        new UE.Rotator(0, 0, 0),
        "comment/message"
      );
    }
    static TpNoloadingTo(x,y,z)
    {
      TeleportController_1.TeleportController.TeleportToPositionNoLoading(
        new UE.Vector(x, y, z),
        new UE.Rotator(0, 0, 0),
        "comment/message"
      );
    }


    static MonsterBoom(entity,Delay){
      CreatureController_1.CreatureController.MonsterBoomRequest(entity,Delay)
    }

    static ChangWeather(weatherID){
      WeatherController_1.WeatherController.TestChangeWeather(weatherID)
      //1.sunny 2.Cloudy 3.ThunderRain 4.Snow 5.rain
    }

    static ShowConfirmBox(string,title){//封号那个窗口
      var newBox = new ConfirmBoxDefine_1.ConfirmBoxDataNew(50);
      newBox.SetTextArgs(string);
      newBox.SetTitle(title);
      ConfirmBoxController_1.ConfirmBoxController.ShowConfirmBoxNew(newBox);
    }

    static ShowTip(string){
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(string)
    }
//MENU
    // static getSettingName(value) {
    //     let keys = Object.keys(this.Settings);
    //     for(let i = 0; i < keys.length; i++) {
    //         if(this.Settings[keys[i]] === value) {
    //             return keys[i];
    //         }
    //     }
    //     return null;
    // }
    static FuncState(func,string){
      if(func)
        return string+" : ON |" ;
      else
        return string+" : OFF |" ;
    }

    static ShowMenu(){//封号那个窗口
      var newBox = new ConfirmBoxDefine_1.ConfirmBoxDataNew(50);
      var state = 
      this.FuncState(this.Settings.GodMode,"GodMode F5")+
      this.FuncState(this.Settings.HitMultiplier,"HitMultiplier F6")+
      this.FuncState(this.Settings.AutoPickTreasure,"AutoPickTreasure F7")+
      //this.FuncState(this.Settings.AntiDither,"AntiDither")+
      this.FuncState(this.Settings.AutoAbsorb,"AutoAbsorb F8" )+
      this.FuncState(this.Settings.killAura,"killAura F9")+
      this.FuncState(this.Settings.PerceptionRange,"PerceptionRange F10")+
      this.FuncState(this.Settings.NoCD,"NoCD F11" )+
      this.FuncState(this.Settings.PlayerSpeed,"PlayerSpeed F12" )
      //this.FuncState(this.Settings.NoCD,"NoCD")
      //this.FuncState(this.Settings.MarkTp,"MarkTp")+
      //this.FuncState(this.Settings.CustomTp,"CustomTp")+
      //this.FuncState(this.Settings.InfiniteStamina,"InfiniteStamina")



      newBox.SetTextArgs(state);
      newBox.SetTitle("KUNMODS STATE");
      ConfirmBoxController_1.ConfirmBoxController.ShowConfirmBoxNew(newBox);
    }
    static MarkTp(){
      var r = ModelManager_1.ModelManager.MapModel.GetCurTrackMark();
      var i = ModelManager_1.ModelManager.MapModel.GetMark(r[0], r[1]);
      var targetX = i.TrackTarget.X;
      var targetY = i.TrackTarget.Y;
      var v = MapController_1.MapController.GetMarkPosition(targetX, targetY);
      if(v.Z==0)
        v.Z = 300
      if(v.X==0&&v.Y==0)
        return;
      this.TpNoloadingTo(v.X * 100, v.Y * 100, v.Z * 100)

    }

    static SetPlayerSpeed(value)
    {
      CharacterController_1.CharacterController.SetTimeDilation(value)     
    }

    static CustomTp(){

    }




}
exports.ModManager = ModManager;
