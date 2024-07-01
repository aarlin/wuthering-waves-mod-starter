"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MoveTriggerController = void 0);
const UE = require("ue"),
	ActorSystem_1 = require("../../../Core/Actor/ActorSystem"),
	ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
	TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	TsBaseCharacter_1 = require("../../Character/TsBaseCharacter"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem");
class MoveTriggerController extends ControllerBase_1.ControllerBase {
	static OnClear() {
		return (
			MoveTriggerController.ClearController(),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.WorldDone,
				MoveTriggerController.nye,
			),
			!0
		);
	}
	static OnInit() {
		return (
			UE.KuroMoveTriggerController.UnRegisterController(),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.WorldDone,
				MoveTriggerController.nye,
			),
			!0
		);
	}
	static nye() {
		MoveTriggerController.ClearController(),
			(MoveTriggerController.Mbi = ActorSystem_1.ActorSystem.Get(
				UE.KuroMoveTriggerController.StaticClass(),
				MathUtils_1.MathUtils.DefaultTransform,
			)),
			MoveTriggerController.Mbi &&
				(UE.KuroMoveTriggerController.RegisterController(
					MoveTriggerController.Mbi,
				),
				MoveTriggerController.Mbi.Callback.Add((e) => {
					for (let t = 0; t < e.Num(); ++t) {
						var r = e.Get(t);
						if (
							r.Actor instanceof TsBaseCharacter_1.default &&
							r.Actor?.IsValid()
						) {
							var o = r.Actor?.CharacterActorComponent?.Entity;
							if (o?.Valid && 0 === r.Area) {
								const e = o.GetComponent(66);
								r.EnterOverlap
									? e?.Valid &&
										(e.InSwimTriggerCount++, e.LogSwimTriggerCount())
									: e?.Valid &&
										0 < e.InSwimTriggerCount &&
										(e.IsRole
											? TimerSystem_1.TimerSystem.Delay(() => {
													e?.Valid &&
														0 < e.InSwimTriggerCount &&
														(e.InSwimTriggerCount--, e.LogSwimTriggerCount());
												}, 1e3)
											: (e.InSwimTriggerCount--, e.LogSwimTriggerCount()));
							}
						}
					}
				}),
				MoveTriggerController.Mbi.InitAllTriggers());
	}
	static LeaveLevel() {
		return MoveTriggerController.ClearController(), !0;
	}
	static ClearController() {
		MoveTriggerController.Mbi &&
			ActorSystem_1.ActorSystem.Put(MoveTriggerController.Mbi),
			UE.KuroMoveTriggerController.UnRegisterController(),
			(MoveTriggerController.Mbi = void 0);
	}
}
(exports.MoveTriggerController = MoveTriggerController).Mbi = void 0;
