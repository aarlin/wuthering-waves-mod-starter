"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventPrompt = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
	GameplayViewDefine_1 = require("../../../Game/Module/LevelPlay/GameplayView/GameplayViewDefine"),
	IAction_1 = require("../../../UniverseEditor/Interface/IAction"),
	PublicUtil_1 = require("../../Common/PublicUtil"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	GenericPromptController_1 = require("../../Module/GenericPrompt/GenericPromptController"),
	LguiUtil_1 = require("../../Module/Util/LguiUtil"),
	UiManager_1 = require("../../Ui/UiManager"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventPrompt extends LevelGeneralBase_1.LevelEventBase {
	Execute(e, o) {
		var r;
		e &&
			((e = Number(e.get("TipId"))),
			isNaN(e)
				? Log_1.Log.CheckError() &&
					Log_1.Log.Error("Event", 17, "Prompt参数只能是纯数字，不合法", [
						"promptId",
						e,
					])
				: ((r =
						ConfigManager_1.ConfigManager.GenericPromptConfig.GetPromptInfo(
							e,
						).TypeId),
					ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByItsType(
						r,
						void 0,
						void 0,
						void 0,
						void 0,
						e,
					)));
	}
	ExecuteNew(e, o) {
		var r = e;
		if (r) {
			if (
				3 === o.Type &&
				(o = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayConfig(
					o.LevelPlayId,
				)) &&
				"Hang" === o.OnlineType &&
				ModelManager_1.ModelManager.GameModeModel.IsMulti
			)
				return;
			var i = r.TipOption;
			if (i) {
				let e,
					o,
					r,
					a = 0;
				switch (i.Type) {
					case IAction_1.ECommonTipType.TipId:
						(r = i.Id),
							(a =
								ConfigManager_1.ConfigManager.GenericPromptConfig.GetPromptInfo(
									r,
								).TypeId),
							(e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
								ConfigManager_1.ConfigManager.GenericPromptConfig.GetPromptInfo(
									r,
								).TipsText,
							));
						break;
					case IAction_1.ECommonTipType.ChallengeFail:
						(e = i.TidMainText), (a = 4);
						break;
					case IAction_1.ECommonTipType.ChallengeCondition:
						(e = i.TidMainText), (o = i.TidSubText), (a = 0);
						break;
					case IAction_1.ECommonTipType.ChallengeSuccess:
						(e = i.TidMainText), (a = 3);
						break;
					case IAction_1.ECommonTipType.GeneralFloatingTip:
						(e = i.TidMainText), (a = 9);
						break;
					case IAction_1.ECommonTipType.MissionComplete:
						(e = i.TidMainText), (o = i.TidSubText), (a = 7);
						break;
					case IAction_1.ECommonTipType.ReachChallenge:
						(e = i.TidMainText), (a = 5);
						break;
					case IAction_1.ECommonTipType.TriggerDelegation:
						(e = i.TidMainText), (o = i.TidSubText), (a = 6);
						break;
					case IAction_1.ECommonTipType.PrepareCountdown:
						a = 13;
						break;
					case IAction_1.ECommonTipType.EnterInRange:
						return (t = i.TidText)
							? (((n =
									new GameplayViewDefine_1.GameplayEnterViewData()).InfoId =
									"GameplayEnter"),
								(n.TitleId = t),
								void UiManager_1.UiManager.OpenView("GameplayEnterView", n))
							: void 0;
					case IAction_1.ECommonTipType.FirstComplete:
						var n, t;
						return (t = i.TidText)
							? (((n =
									new GameplayViewDefine_1.GameplayFirstPassViewData()).InfoId =
									"GameplayFirstPass"),
								(n.TitleId = t),
								void UiManager_1.UiManager.OpenView("GameplayFirstPassView", n))
							: void 0;
					case IAction_1.ECommonTipType.RemainStarWarning:
						return (
							(t = i.WarningText),
							void GenericPromptController_1.GenericPromptController.ShowPromptByItsType(
								18,
								new LguiUtil_1.TableTextArgNew(t),
							)
						);
					default:
						return;
				}
				(e = e && PublicUtil_1.PublicUtil.GetConfigTextByKey(e)),
					(o = o && PublicUtil_1.PublicUtil.GetConfigTextByKey(o)),
					ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByItsType(
						a,
						void 0,
						void 0,
						[e],
						[o],
						r,
					);
			} else
				(o = e.GeneralTextId),
					(r =
						ConfigManager_1.ConfigManager.GenericPromptConfig.GetPromptInfo(
							o,
						).TypeId),
					ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByItsType(
						r,
						void 0,
						void 0,
						void 0,
						void 0,
						o,
					);
		}
	}
}
exports.LevelEventPrompt = LevelEventPrompt;
