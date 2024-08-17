"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.Global = void 0);
const UE = require("ue"),
	TsBaseCharacter_1 = require("./Character/TsBaseCharacter"),
	EventDefine_1 = require("./Common/Event/EventDefine"),
	EventSystem_1 = require("./Common/Event/EventSystem"),
	GlobalData_1 = require("./GlobalData");
class Global {
	constructor() {}
	static get BaseCharacter() {
		return (
			(Global.pMe && Global.pMe.IsValid()) ||
				(GlobalData_1.GlobalData.GameInstance &&
					(Global.pMe = UE.GameplayStatics.GetPlayerCharacter(
						GlobalData_1.GlobalData.World,
						0,
					))),
			Global.pMe
		);
	}
	static set BaseCharacter(a) {
		Global.pMe = a;
	}
	static get CharacterController() {
		return (
			(Global.vMe && Global.vMe.IsValid()) ||
				(GlobalData_1.GlobalData.GameInstance &&
					(Global.vMe = UE.GameplayStatics.GetPlayerController(
						GlobalData_1.GlobalData.World,
						0,
					))),
			Global.vMe
		);
	}
	static get CharacterCameraManager() {
		return (
			(Global.MMe && Global.MMe.IsValid()) ||
				(GlobalData_1.GlobalData.GameInstance &&
					(Global.MMe = UE.GameplayStatics.GetPlayerCameraManager(
						GlobalData_1.GlobalData.World,
						0,
					))),
			Global.MMe
		);
	}
	static get PawnOrSpectator() {
		return (
			(Global.SMe && Global.MMe.IsValid()) ||
				(GlobalData_1.GlobalData.GameInstance &&
					(Global.SMe = UE.GameplayStatics.GetPlayerPawn(
						GlobalData_1.GlobalData.World,
						0,
					))),
			Global.SMe
		);
	}
	static get WorldEntityHelper() {
		return Global.WorldEntityHelperInner;
	}
	static set WorldEntityHelper(a) {
		Global.WorldEntityHelperInner = a;
	}
	static IsControlledCharacter(a) {
		return (
			a instanceof TsBaseCharacter_1.default && a.GetController() === this.vMe
		);
	}
	static InitEvent() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnChangeRole,
			Global.xie,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.BeforeLoadMap,
				Global.EMe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.AfterLoadMap,
				Global.yMe,
			);
	}
}
((exports.Global = Global).pMe = void 0),
	(Global.vMe = void 0),
	(Global.MMe = void 0),
	(Global.SMe = void 0),
	(Global.WorldEntityHelperInner = void 0),
	(Global.xie = () => {
		GlobalData_1.GlobalData.GameInstance &&
			((Global.vMe = UE.GameplayStatics.GetPlayerController(
				GlobalData_1.GlobalData.World,
				0,
			)),
			(Global.pMe = UE.GameplayStatics.GetPlayerCharacter(
				GlobalData_1.GlobalData.World,
				0,
			)),
			(Global.MMe = UE.GameplayStatics.GetPlayerCameraManager(
				GlobalData_1.GlobalData.World,
				0,
			)),
			(Global.SMe = UE.GameplayStatics.GetPlayerPawn(
				GlobalData_1.GlobalData.World,
				0,
			)));
	}),
	(Global.EMe = () => {
		(Global.vMe = void 0),
			(Global.pMe = void 0),
			(Global.MMe = void 0),
			(Global.SMe = void 0);
	}),
	(Global.yMe = () => {
		(Global.vMe = UE.GameplayStatics.GetPlayerController(
			GlobalData_1.GlobalData.World,
			0,
		)),
			(Global.MMe = UE.GameplayStatics.GetPlayerCameraManager(
				GlobalData_1.GlobalData.World,
				0,
			)),
			(Global.SMe = UE.GameplayStatics.GetPlayerPawn(
				GlobalData_1.GlobalData.World,
				0,
			));
	});
