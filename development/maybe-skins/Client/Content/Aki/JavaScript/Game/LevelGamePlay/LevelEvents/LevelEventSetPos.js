"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventSetPos = void 0);
const UE = require("ue"),
	Log_1 = require("../../../Core/Common/Log"),
	Global_1 = require("../../Global"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventSetPos extends LevelGeneralBase_1.LevelEventBase {
	constructor() {
		super(...arguments),
			(this.kRe = new UE.Vector()),
			(this.cie = new UE.Rotator());
	}
	Execute(e, t) {
		if (e) {
			var o,
				r = e.get("xPos"),
				s = e.get("yPos"),
				a = e.get("zPos"),
				l = e.get("Target");
			e = e.get("zRotate");
			if (r && s && a && l) {
				if (
					(this.kRe.Set(parseFloat(r), parseFloat(s), parseFloat(a)),
					e && (this.cie.Roll = parseFloat(e)),
					"Player" === l)
				)
					return (o = Global_1.Global.BaseCharacter)
						? ((o = o.CharacterActorComponent),
							void (e
								? o.SetActorLocationAndRotation(
										this.kRe,
										this.cie,
										"关卡事件{LevelEventSetPos}.处理主角传送",
										!1,
									)
								: o.SetActorLocation(
										this.kRe,
										"关卡事件{LevelEventSetPos}.处理主角传送",
										!1,
									)))
						: void 0;
				"Trigger" === l &&
					t &&
					(e
						? t.K2_SetActorLocationAndRotation(
								this.kRe,
								this.cie,
								!1,
								void 0,
								!1,
							)
						: t.K2_SetActorLocation(this.kRe, !1, void 0, !1));
			} else
				Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn(
						"Level",
						7,
						"[LevelGeneralController.SetPos] 传送参数不全，事件失败",
						["xPos", r],
						["yPos", s],
						["zPos", a],
						["tTarget", l],
					);
		}
	}
}
exports.LevelEventSetPos = LevelEventSetPos;
