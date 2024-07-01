"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
	Global_1 = require("../../../Global"),
	BlackboardController_1 = require("../../../World/Controller/BlackboardController"),
	TsAiController_1 = require("../../Controller/TsAiController"),
	NRARER_PLAYER_INT_ID = "NearerPlayerIntId";
class TsServiceSimpleSense extends UE.BTService_BlueprintBase {
	constructor() {
		super(...arguments),
			(this.SenseRadius = void 0),
			(this.IsEnter = !1),
			(this.IsInit = !1),
			(this.MinRangeSquared = 0),
			(this.MaxRangeSquared = 0),
			(this.IsSetNearerPlayerId = !1);
	}
	ReceiveTickAI(e, r, t) {
		if (e instanceof TsAiController_1.default) {
			var a = Global_1.Global.BaseCharacter;
			if (a && (e = e.AiController) && (e = e.CharActorComp)) {
				var l = (e = e.Entity).GetComponent(106);
				if (l) {
					this.IsInit ||
						((this.IsInit = !0),
						(i = this.SenseRadius.LowerBound.Value),
						(o = this.SenseRadius.UpperBound.Value),
						(this.MinRangeSquared = i * i),
						(this.MaxRangeSquared = o * o),
						l.SetLogicRange(o));
					var o,
						i = l.PlayerDistSquared;
					let r = 0;
					i > this.MaxRangeSquared
						? ((r = 0), this.IsEnter && (this.IsEnter = !1))
						: i > this.MinRangeSquared
							? (r = this.IsEnter ? a.CharacterActorComponent.Entity.Id : 0)
							: ((r = a.CharacterActorComponent.Entity.Id),
								this.IsEnter || (this.IsEnter = !0)),
						0 === r
							? this.IsSetNearerPlayerId &&
								((this.IsSetNearerPlayerId = !1),
								BlackboardController_1.BlackboardController.RemoveValueByEntity(
									e.Id,
									"NearerPlayerId",
								))
							: (BlackboardController_1.BlackboardController.SetEntityIdByEntity(
									e.Id,
									"NearerPlayerId",
									r,
								),
								(this.IsSetNearerPlayerId = !0)),
						BlackboardController_1.BlackboardController.SetIntValueByEntity(
							e.Id,
							"NearerPlayerIntId",
							r,
						);
				}
			}
		}
	}
}
exports.default = TsServiceSimpleSense;
